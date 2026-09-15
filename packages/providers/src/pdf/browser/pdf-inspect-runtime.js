'use strict';

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

async function inspectPdfWithLocalWasm({ bytes, wasmBinary, initPdfium }) {
  if (!isByteView(bytes)) throw new TypeError('bytes must be a non-empty Uint8Array');
  if (!isByteView(wasmBinary)) throw new TypeError('wasmBinary must be a non-empty Uint8Array');
  if (typeof initPdfium !== 'function') throw new TypeError('initPdfium must be a function');

  const inputSnapshot = copyByteView(bytes);
  const wasmSnapshot = copyByteView(wasmBinary);
  let module = null;
  let libraryInitialized = false;
  let allocationPointer = null;
  let documentHandle = null;
  let result = null;
  let primaryError = null;

  try {
    module = validateRuntimeSurface(await initPdfium(Object.freeze({ wasmBinary })));
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
      result = Object.freeze({ openSucceeded: true, pageCount });
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
    cleanupErrors.push(new Error('source bytes changed during PDFium inspection'));
  }
  if (!byteViewEquals(wasmBinary, wasmSnapshot)) {
    cleanupErrors.push(new Error('WASM bytes changed during PDFium inspection'));
  }

  if (primaryError && cleanupErrors.length > 0) {
    throw new AggregateError([primaryError, ...cleanupErrors], 'PDFium inspection and cleanup failed');
  }
  if (primaryError) throw primaryError;
  if (cleanupErrors.length > 0) {
    throw new AggregateError(cleanupErrors, 'PDFium cleanup failed');
  }
  if (!result) throw new Error('PDFium inspection produced no result');
  return result;
}

module.exports = Object.freeze({ inspectPdfWithLocalWasm });
