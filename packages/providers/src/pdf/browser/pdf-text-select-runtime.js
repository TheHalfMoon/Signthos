'use strict';

const { types: utilTypes } = require('node:util');

const MAX_PDFIUM_INT = 0x7fffffff;
const MAX_WASM32_SIZE = 0xffffffff;

function isByteView(value) {
  return !utilTypes.isProxy(value) && value instanceof Uint8Array && value.byteLength > 0;
}

function copyByteView(value) {
  const copy = new Uint8Array(value.byteLength);
  copy.set(new Uint8Array(value.buffer, value.byteOffset, value.byteLength));
  return copy;
}

function byteViewEquals(value, expected) {
  if (!isByteView(value) || value.byteLength !== expected.byteLength) return false;
  const current = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  for (let index = 0; index < current.length; index += 1) {
    if (current[index] !== expected[index]) return false;
  }
  return true;
}

function requiredFunction(value, name) {
  if (typeof value?.[name] !== 'function') {
    throw new TypeError(`PDFium runtime surface is missing ${name}`);
  }
}

function validateRuntimeSurface(module) {
  if (!module || typeof module !== 'object') {
    throw new TypeError('PDFium initializer must return an object');
  }
  requiredFunction(module, 'PDFiumExt_Init');
  requiredFunction(module, 'FPDF_LoadMemDocument');
  requiredFunction(module, 'FPDF_GetLastError');
  requiredFunction(module, 'FPDF_GetPageCount');
  requiredFunction(module, 'FPDF_LoadPage');
  requiredFunction(module, 'FPDF_GetPageWidthF');
  requiredFunction(module, 'FPDF_GetPageHeightF');
  requiredFunction(module, 'FPDFText_LoadPage');
  requiredFunction(module, 'FPDFText_CountChars');
  requiredFunction(module, 'FPDFText_GetText');
  requiredFunction(module, 'FPDFText_HasUnicodeMapError');
  requiredFunction(module, 'FPDFText_CountRects');
  requiredFunction(module, 'FPDFText_GetRect');
  requiredFunction(module, 'FPDFText_ClosePage');
  requiredFunction(module, 'FPDF_ClosePage');
  requiredFunction(module, 'FPDF_CloseDocument');
  requiredFunction(module, 'FPDF_DestroyLibrary');

  const pdfium = module.pdfium;
  if (!pdfium || typeof pdfium !== 'object' || !(pdfium.HEAPU8 instanceof Uint8Array)) {
    throw new TypeError('PDFium runtime surface is missing pdfium.HEAPU8');
  }
  if (!pdfium.wasmExports || typeof pdfium.wasmExports !== 'object') {
    throw new TypeError('PDFium runtime surface is missing pdfium.wasmExports');
  }
  requiredFunction(pdfium.wasmExports, 'malloc');
  requiredFunction(pdfium.wasmExports, 'free');
  return module;
}

function cleanupFailure(label, error) {
  const message = error instanceof Error ? error.message : String(error);
  return new Error(`${label} failed: ${message}`);
}

const RECT_SLOT_BYTES = 32;

function extractBoundedText(module, textPageHandle, startIndex, extractCount) {
  if (extractCount === 0) return '';
  if (!Number.isSafeInteger(extractCount) || extractCount < 0 || extractCount > MAX_PDFIUM_INT) {
    throw new Error('PDFium returned an unsupported character count');
  }
  const outputUnits = extractCount + 1;
  const outputBytes = outputUnits * 2;
  if (
    !Number.isSafeInteger(outputUnits) ||
    !Number.isSafeInteger(outputBytes) ||
    outputBytes > MAX_WASM32_SIZE
  ) {
    throw new Error('PDFium text buffer size exceeds allocation bounds');
  }
  const outputPointer = module.pdfium.wasmExports.malloc(outputBytes);
  if (!Number.isSafeInteger(outputPointer) || outputPointer <= 0) {
    throw new Error('PDFium text buffer allocation failed');
  }
  let text = '';
  let extractionError = null;
  try {
    if (outputPointer + outputBytes > module.pdfium.HEAPU8.length) {
      throw new Error('PDFium text buffer exceeds HEAPU8');
    }
    const written = module.FPDFText_GetText(textPageHandle, startIndex, extractCount, outputPointer);
    if (!Number.isSafeInteger(written) || written < 1 || written > outputUnits) {
      throw new Error('PDFium returned an invalid text length');
    }
    const textBytes = (written - 1) * 2;
    if (outputPointer + textBytes > module.pdfium.HEAPU8.length) {
      throw new Error('PDFium returned text outside HEAPU8');
    }
    text = Buffer.from(
      module.pdfium.HEAPU8.subarray(outputPointer, outputPointer + textBytes),
    ).toString('utf16le');
  } catch (error) {
    extractionError = error;
  }
  try {
    module.pdfium.wasmExports.free(outputPointer);
  } catch (error) {
    const cleanupError = cleanupFailure('text free', error);
    if (extractionError) {
      throw new AggregateError(
        [extractionError, cleanupError],
        'PDFium text extraction and text cleanup failed',
      );
    }
    throw cleanupError;
  }
  if (extractionError) throw extractionError;
  return text;
}

function readUnicodeMapError(module, textPageHandle, startIndex, extractCount) {
  let unicodeMapError = false;
  for (let charIndex = 0; charIndex < extractCount; charIndex += 1) {
    const charMapError = module.FPDFText_HasUnicodeMapError(textPageHandle, startIndex + charIndex);
    if (charMapError === 1) {
      unicodeMapError = true;
    } else if (charMapError !== 0) {
      throw new Error('PDFium returned an invalid unicode-map error flag');
    }
  }
  return unicodeMapError;
}

function readSelectionRects(module, textPageHandle, startIndex, selectCount, maxRects) {
  if (selectCount === 0) return { rects: Object.freeze([]), rectCount: 0, rectsTruncated: false };
  const rectTotal = module.FPDFText_CountRects(textPageHandle, startIndex, selectCount);
  if (!Number.isSafeInteger(rectTotal) || rectTotal < 0 || rectTotal > MAX_PDFIUM_INT) {
    throw new Error('PDFium returned an invalid rectangle count');
  }
  const rectsTruncated = rectTotal > maxRects;
  const shownRects = rectsTruncated ? maxRects : rectTotal;
  if (shownRects === 0) return { rects: Object.freeze([]), rectCount: rectTotal, rectsTruncated };
  const slotPointer = module.pdfium.wasmExports.malloc(RECT_SLOT_BYTES);
  if (!Number.isSafeInteger(slotPointer) || slotPointer <= 0) {
    throw new Error('PDFium rect buffer allocation failed');
  }
  if (slotPointer + RECT_SLOT_BYTES > module.pdfium.HEAPU8.length) {
    throw new Error('PDFium rect buffer exceeds HEAPU8');
  }
  const rects = [];
  let rectError = null;
  try {
    for (let rectIndex = 0; rectIndex < shownRects; rectIndex += 1) {
      const rectOk = module.FPDFText_GetRect(
        textPageHandle,
        rectIndex,
        slotPointer,
        slotPointer + 8,
        slotPointer + 16,
        slotPointer + 24,
      );
      if (rectOk !== true) {
        throw new Error('PDFium text rectangle query failed');
      }
      const heapBytes = new Uint8Array(
        module.pdfium.HEAPU8.buffer,
        module.pdfium.HEAPU8.byteOffset,
        module.pdfium.HEAPU8.byteLength,
      );
      if (slotPointer + RECT_SLOT_BYTES > heapBytes.length) {
        throw new Error('PDFium rect buffer left HEAPU8');
      }
      const slotView = new DataView(
        heapBytes.buffer,
        heapBytes.byteOffset + slotPointer,
        RECT_SLOT_BYTES,
      );
      const left = slotView.getFloat64(0, true);
      const top = slotView.getFloat64(8, true);
      const right = slotView.getFloat64(16, true);
      const bottom = slotView.getFloat64(24, true);
      if (
        !Number.isFinite(left) ||
        !Number.isFinite(top) ||
        !Number.isFinite(right) ||
        !Number.isFinite(bottom) ||
        left > right
      ) {
        throw new Error('PDFium returned an invalid text rectangle');
      }
      rects.push(Object.freeze({ left, top, right, bottom }));
    }
  } catch (error) {
    rectError = error;
  }
  try {
    module.pdfium.wasmExports.free(slotPointer);
  } catch (error) {
    const cleanupError = cleanupFailure('rect free', error);
    if (rectError) {
      throw new AggregateError(
        [rectError, cleanupError],
        'PDFium text selection and rect cleanup failed',
      );
    }
    throw cleanupError;
  }
  if (rectError) throw rectError;
  return { rects: Object.freeze(rects), rectCount: rectTotal, rectsTruncated };
}

async function selectPdfPageTextWithLocalWasm({
  bytes,
  wasmBinary,
  initPdfium,
  pageIndex,
  startIndex,
  selectCount,
  maxRects,
}) {
  if (!isByteView(bytes)) throw new TypeError('bytes must be a non-empty Uint8Array');
  if (!isByteView(wasmBinary)) throw new TypeError('wasmBinary must be a non-empty Uint8Array');
  if (typeof initPdfium !== 'function') throw new TypeError('initPdfium must be a function');
  if (!Number.isSafeInteger(pageIndex) || pageIndex < 0) {
    throw new TypeError('pageIndex must be a non-negative safe integer');
  }
  if (!Number.isSafeInteger(startIndex) || startIndex < 0) {
    throw new TypeError('startIndex must be a non-negative safe integer');
  }
  if (!Number.isSafeInteger(selectCount) || selectCount < 0 || selectCount > MAX_PDFIUM_INT) {
    throw new TypeError('selectCount must be a PDFium int character count');
  }
  if (!Number.isSafeInteger(maxRects) || maxRects < 1 || maxRects > MAX_PDFIUM_INT) {
    throw new TypeError('maxRects must be a positive PDFium int');
  }

  const inputSnapshot = copyByteView(bytes);
  const wasmSnapshot = copyByteView(wasmBinary);
  const runtimeWasmBinary = copyByteView(wasmBinary);
  let module = null;
  let libraryInitialized = false;
  let allocationPointer = null;
  let documentHandle = null;
  let pageHandle = null;
  let textPageHandle = null;
  let result = null;
  let primaryError = null;

  try {
    const initializerOptions = { wasmBinary: runtimeWasmBinary };
    const initializedModule = await initPdfium(initializerOptions);
    if (initializerOptions.wasmBinary !== runtimeWasmBinary) {
      throw new Error('PDFium initializer replaced runtime WASM bytes');
    }
    module = validateRuntimeSurface(initializedModule);
    module.PDFiumExt_Init();
    libraryInitialized = true;

    const allocatedPointer = module.pdfium.wasmExports.malloc(inputSnapshot.byteLength);
    if (!Number.isSafeInteger(allocatedPointer) || allocatedPointer <= 0) {
      throw new Error('PDFium input allocation failed');
    }
    const allocationEnd = allocatedPointer + inputSnapshot.byteLength;
    if (!Number.isSafeInteger(allocationEnd) || allocationEnd > module.pdfium.HEAPU8.length) {
      throw new Error('PDFium input allocation exceeds HEAPU8');
    }
    allocationPointer = allocatedPointer;
    module.pdfium.HEAPU8.set(inputSnapshot, allocationPointer);

    const loadedDocumentHandle = module.FPDF_LoadMemDocument(allocationPointer, inputSnapshot.byteLength, '');
    if (loadedDocumentHandle === 0) {
      const pdfiumLastError = module.FPDF_GetLastError();
      if (!Number.isSafeInteger(pdfiumLastError) || pdfiumLastError < 0) {
        throw new Error('PDFium returned an invalid last-error code');
      }
      result = Object.freeze({ openSucceeded: false, pdfiumLastError });
    } else {
      if (!Number.isSafeInteger(loadedDocumentHandle) || loadedDocumentHandle <= 0) {
        throw new Error('PDFium returned an invalid document handle');
      }
      documentHandle = loadedDocumentHandle;
      const pageCount = module.FPDF_GetPageCount(documentHandle);
      if (!Number.isSafeInteger(pageCount) || pageCount < 0) {
        throw new Error('PDFium returned an invalid page count');
      }
      if (pageIndex >= pageCount) {
        throw new RangeError('pageIndex exceeds the loaded document page count');
      }
      const loadedPageHandle = module.FPDF_LoadPage(documentHandle, pageIndex);
      if (!Number.isSafeInteger(loadedPageHandle) || loadedPageHandle <= 0) {
        throw new Error('PDFium returned an invalid page handle');
      }
      pageHandle = loadedPageHandle;

      const loadedTextPageHandle = module.FPDFText_LoadPage(pageHandle);
      if (!Number.isSafeInteger(loadedTextPageHandle) || loadedTextPageHandle <= 0) {
        throw new Error('PDFium text page loading failed');
      }
      textPageHandle = loadedTextPageHandle;

      const charCount = module.FPDFText_CountChars(textPageHandle);
      if (!Number.isSafeInteger(charCount) || charCount < 0 || charCount > MAX_PDFIUM_INT) {
        throw new Error('PDFium returned an invalid character count');
      }
      const selectionEnd = startIndex + selectCount;
      if (startIndex > charCount || !Number.isSafeInteger(selectionEnd) || selectionEnd > charCount) {
        throw new RangeError('selection range exceeds the loaded text page character count');
      }
      const text = extractBoundedText(module, textPageHandle, startIndex, selectCount);
      const unicodeMapError = readUnicodeMapError(module, textPageHandle, startIndex, selectCount);
      const {
        rects,
        rectCount,
        rectsTruncated,
      } = readSelectionRects(module, textPageHandle, startIndex, selectCount, maxRects);
      result = Object.freeze({
        openSucceeded: true,
        pageIndex,
        pageCount,
        charCount,
        startIndex,
        selectCount,
        rectCount,
        rectsTruncated,
        unicodeMapError,
        text,
        rects,
      });
    }
  } catch (error) {
    primaryError = error;
  }

  const cleanupErrors = [];
  if (textPageHandle) {
    try {
      module.FPDFText_ClosePage(textPageHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('FPDFText_ClosePage', error));
    }
  }
  if (pageHandle) {
    try {
      module.FPDF_ClosePage(pageHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('FPDF_ClosePage', error));
    }
  }
  if (documentHandle) {
    try {
      module.FPDF_CloseDocument(documentHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('FPDF_CloseDocument', error));
    }
  }
  if (allocationPointer !== null) {
    try {
      module.pdfium.wasmExports.free(allocationPointer);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('free', error));
    }
  }
  if (libraryInitialized) {
    try {
      module.FPDF_DestroyLibrary();
    } catch (error) {
      cleanupErrors.push(cleanupFailure('FPDF_DestroyLibrary', error));
    }
  }

  if (!byteViewEquals(bytes, inputSnapshot)) {
    cleanupErrors.push(new Error('source bytes changed during PDFium text extraction'));
  }
  if (!byteViewEquals(wasmBinary, wasmSnapshot)) {
    cleanupErrors.push(new Error('caller WASM bytes changed during PDFium text extraction'));
  }
  if (!byteViewEquals(runtimeWasmBinary, wasmSnapshot)) {
    cleanupErrors.push(new Error('runtime WASM bytes changed during PDFium text extraction'));
  }

  if (primaryError && cleanupErrors.length > 0) {
    throw new AggregateError([primaryError, ...cleanupErrors], 'PDFium text extraction and cleanup failed');
  }
  if (primaryError) throw primaryError;
  if (cleanupErrors.length > 0) {
    throw new AggregateError(cleanupErrors, 'PDFium text extraction cleanup failed');
  }
  if (!result) throw new Error('PDFium text extraction produced no result');
  return result;
}

module.exports = Object.freeze({ selectPdfPageTextWithLocalWasm });
