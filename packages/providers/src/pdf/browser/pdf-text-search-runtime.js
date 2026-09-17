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
  requiredFunction(module, 'FPDFText_FindStart');
  requiredFunction(module, 'FPDFText_FindNext');
  requiredFunction(module, 'FPDFText_GetSchCount');
  requiredFunction(module, 'FPDFText_GetSchResultIndex');
  requiredFunction(module, 'FPDFText_FindClose');
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

function collectFindMatches(module, findHandle, charCount, maxMatches) {
  const matches = [];
  for (;;) {
    if (matches.length >= maxMatches) break;
    const hasMore = module.FPDFText_FindNext(findHandle);
    if (hasMore !== true && hasMore !== false) {
      throw new Error('PDFium returned an invalid find-next flag');
    }
    if (!hasMore) break;
    const matchLength = module.FPDFText_GetSchCount(findHandle);
    if (!Number.isSafeInteger(matchLength) || matchLength < 1 || matchLength > MAX_PDFIUM_INT) {
      throw new Error('PDFium returned an invalid match length');
    }
    const matchIndex = module.FPDFText_GetSchResultIndex(findHandle);
    if (!Number.isSafeInteger(matchIndex) || matchIndex < 0 || matchIndex > MAX_PDFIUM_INT) {
      throw new Error('PDFium returned an invalid match index');
    }
    const matchEnd = matchIndex + matchLength;
    if (!Number.isSafeInteger(matchEnd) || matchEnd > charCount) {
      throw new Error('PDFium returned an out-of-range search match');
    }
    matches.push(Object.freeze({ index: matchIndex, length: matchLength }));
  }
  let matchesTruncated = false;
  if (matches.length >= maxMatches) {
    const overflow = module.FPDFText_FindNext(findHandle);
    if (overflow !== true && overflow !== false) {
      throw new Error('PDFium returned an invalid find-next flag');
    }
    matchesTruncated = overflow === true;
  }
  return { matches: Object.freeze(matches), matchesTruncated };
}

async function searchPdfPageTextWithLocalWasm({
  bytes,
  wasmBinary,
  initPdfium,
  pageIndex,
  query,
  maxMatches,
}) {
  if (!isByteView(bytes)) throw new TypeError('bytes must be a non-empty Uint8Array');
  if (!isByteView(wasmBinary)) throw new TypeError('wasmBinary must be a non-empty Uint8Array');
  if (typeof initPdfium !== 'function') throw new TypeError('initPdfium must be a function');
  if (!Number.isSafeInteger(pageIndex) || pageIndex < 0) {
    throw new TypeError('pageIndex must be a non-negative safe integer');
  }
  if (typeof query !== 'string' || query.length < 1 || query.length > MAX_PDFIUM_INT) {
    throw new TypeError('query must be a non-empty string within PDFium int units');
  }
  if (!Number.isSafeInteger(maxMatches) || maxMatches < 1 || maxMatches > MAX_PDFIUM_INT) {
    throw new TypeError('maxMatches must be a positive PDFium int');
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
  let queryPointer = null;
  let findHandle = null;
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
    allocationPointer = allocatedPointer;
    const allocationEnd = allocatedPointer + inputSnapshot.byteLength;
    if (!Number.isSafeInteger(allocationEnd) || allocationEnd > module.pdfium.HEAPU8.length) {
      throw new Error('PDFium input allocation exceeds HEAPU8');
    }
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
      const queryUnits = query.length + 1;
      const queryBytes = queryUnits * 2;
      if (
        !Number.isSafeInteger(queryUnits) ||
        !Number.isSafeInteger(queryBytes) ||
        queryBytes > MAX_WASM32_SIZE
      ) {
        throw new Error('PDFium query buffer size exceeds allocation bounds');
      }
      const allocatedQueryPointer = module.pdfium.wasmExports.malloc(queryBytes);
      if (!Number.isSafeInteger(allocatedQueryPointer) || allocatedQueryPointer <= 0) {
        throw new Error('PDFium query buffer allocation failed');
      }
      queryPointer = allocatedQueryPointer;
      if (queryPointer + queryBytes > module.pdfium.HEAPU8.length) {
        throw new Error('PDFium query buffer exceeds HEAPU8');
      }
      module.pdfium.HEAPU8.set(Buffer.from(`${query}\0`, 'utf16le'), queryPointer);

      const loadedFindHandle = module.FPDFText_FindStart(textPageHandle, queryPointer, 0, 0);
      if (!Number.isSafeInteger(loadedFindHandle) || loadedFindHandle <= 0) {
        throw new Error('PDFium text search initialization failed');
      }
      findHandle = loadedFindHandle;

      const { matches, matchesTruncated } = collectFindMatches(
        module,
        findHandle,
        charCount,
        maxMatches,
      );
      result = Object.freeze({
        openSucceeded: true,
        pageIndex,
        pageCount,
        charCount,
        queryLength: query.length,
        matchCount: matches.length,
        matchesTruncated,
        matches,
      });
    }
  } catch (error) {
    primaryError = error;
  }

  const cleanupErrors = [];
  if (findHandle) {
    try {
      module.FPDFText_FindClose(findHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('FPDFText_FindClose', error));
    }
  }
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
  if (queryPointer !== null) {
    try {
      module.pdfium.wasmExports.free(queryPointer);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('query free', error));
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

module.exports = Object.freeze({ searchPdfPageTextWithLocalWasm });
