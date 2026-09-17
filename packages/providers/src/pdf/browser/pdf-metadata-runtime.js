'use strict';

const { types: utilTypes } = require('node:util');

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
  requiredFunction(module, 'FPDF_GetMetaText');
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

const INFO_TAGS = Object.freeze([
  ['Title', 'title'],
  ['Author', 'author'],
  ['Subject', 'subject'],
  ['Keywords', 'keywords'],
  ['Creator', 'creator'],
  ['Producer', 'producer'],
  ['CreationDate', 'creationDate'],
  ['ModDate', 'modDate'],
]);

function readInfoTag(module, documentHandle, tag) {
  const need = module.FPDF_GetMetaText(documentHandle, tag, 0, 0);
  if (!Number.isSafeInteger(need) || need < 0) {
    throw new Error(`PDFium returned an invalid metadata length for ${tag}`);
  }
  if (need <= 2) return null;
  if (need > MAX_WASM32_SIZE) {
    throw new Error('PDFium metadata buffer size exceeds allocation bounds');
  }
  const valuePointer = module.pdfium.wasmExports.malloc(need);
  if (!Number.isSafeInteger(valuePointer) || valuePointer <= 0) {
    throw new Error('PDFium metadata buffer allocation failed');
  }
  let value = null;
  let readError = null;
  try {
    if (valuePointer + need > module.pdfium.HEAPU8.length) {
      throw new Error('PDFium metadata buffer exceeds HEAPU8');
    }
    const written = module.FPDF_GetMetaText(documentHandle, tag, valuePointer, need);
    if (!Number.isSafeInteger(written) || written <= 2 || written > need) {
      throw new Error('PDFium returned an inconsistent metadata length');
    }
    value = Buffer.from(
      module.pdfium.HEAPU8.subarray(valuePointer, valuePointer + written - 2),
    ).toString('utf16le');
  } catch (error) {
    readError = error;
  }
  try {
    module.pdfium.wasmExports.free(valuePointer);
  } catch (error) {
    const cleanupError = cleanupFailure('metadata free', error);
    if (readError) {
      throw new AggregateError(
        [readError, cleanupError],
        'PDFium metadata read and metadata cleanup failed',
      );
    }
    throw cleanupError;
  }
  if (readError) throw readError;
  return value;
}

async function readPdfMetadataWithLocalWasm({
  bytes,
  wasmBinary,
  initPdfium,
}) {
  if (!isByteView(bytes)) throw new TypeError('bytes must be a non-empty Uint8Array');
  if (!isByteView(wasmBinary)) throw new TypeError('wasmBinary must be a non-empty Uint8Array');
  if (typeof initPdfium !== 'function') throw new TypeError('initPdfium must be a function');

  const inputSnapshot = copyByteView(bytes);
  const wasmSnapshot = copyByteView(wasmBinary);
  const runtimeWasmBinary = copyByteView(wasmBinary);
  let module = null;
  let libraryInitialized = false;
  let allocationPointer = null;
  let documentHandle = null;
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
      const metadata = {};
      for (const [tag, key] of INFO_TAGS) {
        metadata[key] = readInfoTag(module, documentHandle, tag);
      }
      result = Object.freeze({
        openSucceeded: true,
        metadata: Object.freeze(metadata),
      });
    }
  } catch (error) {
    primaryError = error;
  }

  const cleanupErrors = [];
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

module.exports = Object.freeze({ readPdfMetadataWithLocalWasm });
