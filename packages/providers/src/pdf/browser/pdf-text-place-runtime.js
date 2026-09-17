'use strict';

const crypto = require('node:crypto');
const { types: utilTypes } = require('node:util');

const EXPECTED_OPTION_KEYS = Object.freeze([
  'bytes',
  'wasmBinary',
  'initPdfium',
  'pageIndex',
  'text',
  'x',
  'y',
  'fontSize',
]);

const PLACEMENT_FONT = 'Helvetica';
const MAX_TEXT_CHARS = 500;
const MAX_COORDINATE = 1000000;
const MAX_FONT_SIZE = 1000;

const PROVIDER_PACKAGE = '@embedpdf/pdfium';
const PROVIDER_VERSION = '2.15.0';
const EXPECTED_WASM_BYTE_LENGTH = 4633788;
const EXPECTED_WASM_SHA256 = 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8';

const MAX_INPUT_BYTES = 64 * 1024 * 1024;
const MAX_OUTPUT_BYTES = 64 * 1024 * 1024;

function isByteView(value) {
  return value instanceof Uint8Array && value.byteLength > 0;
}

function copyByteView(value) {
  const copy = new Uint8Array(value.byteLength);
  copy.set(new Uint8Array(value.buffer, value.byteOffset, value.byteLength));
  return copy;
}

function byteViewEquals(value, expected) {
  if (!(value instanceof Uint8Array) || value.byteLength !== expected.byteLength) return false;
  const current = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  for (let index = 0; index < current.length; index += 1) {
    if (current[index] !== expected[index]) return false;
  }
  return true;
}

function isStrictObject(value) {
  if (!value || typeof value !== 'object') return false;
  if (utilTypes.isProxy(value)) return false;
  if (Array.isArray(value)) return false;
  if (Buffer.isBuffer(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function readOwnData(value, key) {
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, 'value')) return undefined;
  return { present: true, data: descriptor.value };
}

function isPlaceableText(value) {
  if (typeof value !== 'string' || value.length < 1 || value.length > MAX_TEXT_CHARS) return false;
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code < 0x20 || code > 0x7e) return false;
  }
  return true;
}

function isPlacementCoordinate(value) {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= MAX_COORDINATE;
}

function sha256Hex(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
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
  requiredFunction(module, 'FPDF_GetSignatureCount');
  requiredFunction(module, 'FPDFText_LoadStandardFont');
  requiredFunction(module, 'FPDFPageObj_CreateTextObj');
  requiredFunction(module, 'FPDFText_SetText');
  requiredFunction(module, 'FPDFPageObj_Transform');
  requiredFunction(module, 'FPDF_LoadPage');
  requiredFunction(module, 'FPDF_ClosePage');
  requiredFunction(module, 'FPDFPage_InsertObject');
  requiredFunction(module, 'FPDFPage_GenerateContent');
  requiredFunction(module, 'FPDFPageObj_Destroy');
  requiredFunction(module, 'PDFiumExt_OpenFileWriter');
  requiredFunction(module, 'PDFiumExt_SaveAsCopy');
  requiredFunction(module, 'PDFiumExt_GetFileWriterSize');
  requiredFunction(module, 'PDFiumExt_GetFileWriterData');
  requiredFunction(module, 'PDFiumExt_CloseFileWriter');
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

function readValidatedOptions(options) {
  if (!isStrictObject(options)) {
    throw new TypeError('options must be a plain object');
  }
  const actualKeys = Reflect.ownKeys(options);
  if (actualKeys.length !== EXPECTED_OPTION_KEYS.length
      || actualKeys.some((key) => typeof key !== 'string' || !EXPECTED_OPTION_KEYS.includes(key))) {
    throw new TypeError('options has unknown or missing fields');
  }
  const entries = {};
  for (const key of EXPECTED_OPTION_KEYS) {
    const entry = readOwnData(options, key);
    if (!entry) throw new TypeError('options fields must be plain data values');
    entries[key] = entry.data;
  }
  if (!isByteView(entries.bytes)) throw new TypeError('bytes must be a non-empty Uint8Array');
  if (!isByteView(entries.wasmBinary)) throw new TypeError('wasmBinary must be a non-empty Uint8Array');
  if (typeof entries.initPdfium !== 'function') throw new TypeError('initPdfium must be a function');
  if (!Number.isSafeInteger(entries.pageIndex) || entries.pageIndex < 0) {
    throw new TypeError('pageIndex must be a safe integer >= 0');
  }
  if (!isPlaceableText(entries.text)) {
    throw new TypeError('text must be 1..500 printable ASCII characters');
  }
  if (!isPlacementCoordinate(entries.x) || !isPlacementCoordinate(entries.y)) {
    throw new TypeError('x and y must be finite coordinates within bounds');
  }
  if (typeof entries.fontSize !== 'number' || !Number.isFinite(entries.fontSize)
      || entries.fontSize <= 0 || entries.fontSize > MAX_FONT_SIZE) {
    throw new TypeError('fontSize must be a finite size within bounds');
  }
  return entries;
}

async function placePdfTextWithLocalWasm(options) {
  const {
    bytes, wasmBinary, initPdfium, pageIndex, text, x, y, fontSize,
  } = readValidatedOptions(options);
  if (bytes.byteLength > MAX_INPUT_BYTES) {
    throw new Error('PDF input exceeds the text-place resource budget');
  }

  const inputSnapshot = copyByteView(bytes);
  const wasmSnapshot = copyByteView(wasmBinary);
  const runtimeWasmBinary = copyByteView(wasmBinary);
  const inputDigest = sha256Hex(inputSnapshot);
  let module = null;
  let libraryInitialized = false;
  let allocationPointer = null;
  let documentHandle = null;
  let pageHandle = null;
  let textObjectHandle = null;
  let textInserted = false;
  let textBufferPointer = null;
  let writerHandle = null;
  let outputAllocationPointer = null;
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
    const heapLength = module.pdfium.HEAPU8.length;

    const mallocChecked = (length, label) => {
      const pointer = module.pdfium.wasmExports.malloc(length);
      if (!Number.isSafeInteger(pointer) || pointer <= 0) {
        throw new Error(`PDFium allocation failed (${label})`);
      }
      const end = pointer + length;
      if (!Number.isSafeInteger(end) || end > heapLength) {
        throw new Error(`PDFium allocation exceeds HEAPU8 (${label})`);
      }
      return pointer;
    };

    allocationPointer = mallocChecked(inputSnapshot.byteLength, 'input');
    module.pdfium.HEAPU8.set(inputSnapshot, allocationPointer);

    const loadedDocumentHandle = module.FPDF_LoadMemDocument(allocationPointer, inputSnapshot.byteLength, '');
    if (loadedDocumentHandle === 0) {
      const pdfiumLastError = module.FPDF_GetLastError();
      if (!Number.isSafeInteger(pdfiumLastError) || pdfiumLastError < 0) {
        throw new Error('PDFium returned an invalid last-error code');
      }
      throw new Error(`PDFium could not open the input document (last-error ${pdfiumLastError})`);
    }
    if (!Number.isSafeInteger(loadedDocumentHandle) || loadedDocumentHandle <= 0) {
      throw new Error('PDFium returned an invalid document handle');
    }
    documentHandle = loadedDocumentHandle;

    const pageCount = module.FPDF_GetPageCount(documentHandle);
    if (!Number.isSafeInteger(pageCount) || pageCount < 0) {
      throw new Error('PDFium returned an invalid page count');
    }
    if (pageIndex >= pageCount) {
      throw new Error('pageIndex is out of range for this document');
    }

    const signatureCount = module.FPDF_GetSignatureCount(documentHandle);
    if (!Number.isSafeInteger(signatureCount) || signatureCount < 0) {
      throw new Error('PDFium returned an invalid signature count');
    }

    const fontHandle = module.FPDFText_LoadStandardFont(documentHandle, PLACEMENT_FONT);
    if (!Number.isSafeInteger(fontHandle) || fontHandle <= 0) {
      throw new Error('PDFium returned an invalid font handle');
    }
    const createdTextHandle = module.FPDFPageObj_CreateTextObj(documentHandle, fontHandle, fontSize);
    if (!Number.isSafeInteger(createdTextHandle) || createdTextHandle <= 0) {
      throw new Error('PDFium returned an invalid text object handle');
    }
    textObjectHandle = createdTextHandle;

    const textByteLength = (text.length + 1) * 2;
    textBufferPointer = mallocChecked(textByteLength, 'text');
    const heap = module.pdfium.HEAPU8;
    for (let charIndex = 0; charIndex < text.length; charIndex += 1) {
      const code = text.charCodeAt(charIndex);
      heap[textBufferPointer + charIndex * 2] = code & 0xff;
      heap[textBufferPointer + charIndex * 2 + 1] = (code >> 8) & 0xff;
    }
    heap[textBufferPointer + text.length * 2] = 0;
    heap[textBufferPointer + text.length * 2 + 1] = 0;
    const setTextStatus = module.FPDFText_SetText(textObjectHandle, textBufferPointer);
    try {
      module.pdfium.wasmExports.free(textBufferPointer);
    } finally {
      textBufferPointer = null;
    }
    if (!setTextStatus) {
      throw new Error('PDFium text content was not accepted');
    }
    module.FPDFPageObj_Transform(textObjectHandle, 1, 0, 0, 1, x, y);

    const loadedPageHandle = module.FPDF_LoadPage(documentHandle, pageIndex);
    if (!Number.isSafeInteger(loadedPageHandle) || loadedPageHandle <= 0) {
      throw new Error('PDFium returned an invalid page handle');
    }
    pageHandle = loadedPageHandle;
    module.FPDFPage_InsertObject(pageHandle, textObjectHandle);
    textInserted = true;
    const generateStatus = module.FPDFPage_GenerateContent(pageHandle);
    try {
      module.FPDF_ClosePage(pageHandle);
    } finally {
      pageHandle = null;
    }
    if (!generateStatus) {
      throw new Error('PDFium content generation did not complete');
    }

    const outputSignatureCount = module.FPDF_GetSignatureCount(documentHandle);
    if (!Number.isSafeInteger(outputSignatureCount) || outputSignatureCount < 0) {
      throw new Error('PDFium returned an invalid output signature count');
    }

    const openedWriter = module.PDFiumExt_OpenFileWriter();
    if (!Number.isSafeInteger(openedWriter) || openedWriter <= 0) {
      throw new Error('PDFium file-writer allocation failed');
    }
    writerHandle = openedWriter;
    const saveStatus = module.PDFiumExt_SaveAsCopy(documentHandle, writerHandle);
    if (!saveStatus) {
      throw new Error('PDFium save did not complete');
    }
    const writerSize = module.PDFiumExt_GetFileWriterSize(writerHandle);
    if (!Number.isSafeInteger(writerSize) || writerSize <= 0) {
      throw new Error('PDFium save produced no bytes');
    }
    if (writerSize > MAX_OUTPUT_BYTES) {
      throw new Error('PDF output exceeds the text-place resource budget');
    }
    outputAllocationPointer = mallocChecked(writerSize, 'output');
    const copiedBytes = module.PDFiumExt_GetFileWriterData(writerHandle, outputAllocationPointer, writerSize);
    if (copiedBytes !== writerSize) {
      throw new Error('PDFium save readout is incomplete');
    }
    const outputBytes = new Uint8Array(
      module.pdfium.HEAPU8.slice(outputAllocationPointer, outputAllocationPointer + writerSize),
    );
    result = Object.freeze({
      succeeded: true,
      inputByteLength: inputSnapshot.byteLength,
      inputDigest: Object.freeze({ algorithm: 'sha256', value: inputDigest }),
      pageIndex,
      placedText: text,
      placement: Object.freeze({ x, y, fontSize, font: PLACEMENT_FONT }),
      pageCount,
      signatureCount,
      outputSignatureCount,
      signatureStructurePresent: signatureCount > 0,
      outputBytes,
      outputByteLength: outputBytes.byteLength,
      outputDigest: Object.freeze({ algorithm: 'sha256', value: sha256Hex(outputBytes) }),
      providerIdentity: Object.freeze({
        package: PROVIDER_PACKAGE,
        version: PROVIDER_VERSION,
        wasmByteLength: EXPECTED_WASM_BYTE_LENGTH,
        wasmDigest: EXPECTED_WASM_SHA256,
      }),
    });
  } catch (error) {
    primaryError = error;
    result = null;
  }

  const cleanupErrors = [];
  if (writerHandle) {
    try {
      module.PDFiumExt_CloseFileWriter(writerHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('PDFiumExt_CloseFileWriter', error));
    } finally {
      writerHandle = null;
    }
  }
  if (outputAllocationPointer !== null) {
    try {
      module.pdfium.wasmExports.free(outputAllocationPointer);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('free', error));
    } finally {
      outputAllocationPointer = null;
    }
  }
  if (textBufferPointer !== null) {
    try {
      module.pdfium.wasmExports.free(textBufferPointer);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('free', error));
    } finally {
      textBufferPointer = null;
    }
  }
  if (textObjectHandle && !textInserted) {
    try {
      module.FPDFPageObj_Destroy(textObjectHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('FPDFPageObj_Destroy', error));
    } finally {
      textObjectHandle = null;
    }
  }
  if (pageHandle) {
    try {
      module.FPDF_ClosePage(pageHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('FPDF_ClosePage', error));
    } finally {
      pageHandle = null;
    }
  }
  if (documentHandle) {
    try {
      module.FPDF_CloseDocument(documentHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('FPDF_CloseDocument', error));
    } finally {
      documentHandle = null;
    }
  }
  if (allocationPointer !== null) {
    try {
      module.pdfium.wasmExports.free(allocationPointer);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('free', error));
    } finally {
      allocationPointer = null;
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
    cleanupErrors.push(new Error('source bytes changed during PDFium text placement'));
  }
  if (!byteViewEquals(wasmBinary, wasmSnapshot)) {
    cleanupErrors.push(new Error('caller WASM bytes changed during PDFium text placement'));
  }
  if (!byteViewEquals(runtimeWasmBinary, wasmSnapshot)) {
    cleanupErrors.push(new Error('runtime WASM bytes changed during PDFium text placement'));
  }

  if (primaryError && cleanupErrors.length > 0) {
    throw new AggregateError([primaryError, ...cleanupErrors], 'PDFium text placement and cleanup failed');
  }
  if (primaryError) throw primaryError;
  if (cleanupErrors.length > 0) {
    throw new AggregateError(cleanupErrors, 'PDFium cleanup failed');
  }
  if (!result) throw new Error('PDFium text placement produced no result');
  return result;
}

module.exports = Object.freeze({
  placePdfTextWithLocalWasm,
  TEXT_PLACE_RESOURCE_BUDGETS: Object.freeze({
    maxInputBytes: MAX_INPUT_BYTES,
    maxOutputBytes: MAX_OUTPUT_BYTES,
    maxTextChars: MAX_TEXT_CHARS,
  }),
});
