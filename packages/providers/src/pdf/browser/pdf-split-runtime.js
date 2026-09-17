'use strict';

const crypto = require('node:crypto');
const { types: utilTypes } = require('node:util');

const EXPECTED_OPTION_KEYS = Object.freeze([
  'bytes',
  'wasmBinary',
  'initPdfium',
  'pageRanges',
]);

const MAX_RANGES = 32;

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

function readIndexArray(value) {
  if (!Array.isArray(value) || utilTypes.isProxy(value)) return null;
  if (value.length < 1) return null;
  const indices = new Array(value.length);
  for (let index = 0; index < value.length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, index);
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, 'value')) return null;
    const entry = descriptor.value;
    if (!Number.isSafeInteger(entry) || entry < 0) return null;
    indices[index] = entry;
  }
  return indices;
}

function readPageRanges(value) {
  if (!Array.isArray(value) || utilTypes.isProxy(value)) return null;
  if (value.length < 1 || value.length > MAX_RANGES) return null;
  const ranges = new Array(value.length);
  for (let index = 0; index < value.length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, index);
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, 'value')) return null;
    const indices = readIndexArray(descriptor.value);
    if (!indices) return null;
    ranges[index] = indices;
  }
  return ranges;
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
  requiredFunction(module, 'FPDF_CreateNewDocument');
  requiredFunction(module, 'FPDF_ImportPagesByIndex');
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
  const bytesEntry = readOwnData(options, 'bytes');
  const wasmEntry = readOwnData(options, 'wasmBinary');
  const initEntry = readOwnData(options, 'initPdfium');
  const rangesEntry = readOwnData(options, 'pageRanges');
  if (!bytesEntry || !wasmEntry || !initEntry || !rangesEntry) {
    throw new TypeError('options fields must be plain data values');
  }
  const { data: bytes } = bytesEntry;
  const { data: wasmBinary } = wasmEntry;
  const { data: initPdfium } = initEntry;
  if (!isByteView(bytes)) throw new TypeError('bytes must be a non-empty Uint8Array');
  if (!isByteView(wasmBinary)) throw new TypeError('wasmBinary must be a non-empty Uint8Array');
  if (typeof initPdfium !== 'function') throw new TypeError('initPdfium must be a function');
  const pageRanges = readPageRanges(rangesEntry.data);
  if (!pageRanges) {
    throw new TypeError('pageRanges must be a non-empty array of index arrays');
  }
  return { bytes, wasmBinary, initPdfium, pageRanges };
}

function assertInRangeSubset(indices, pageCount, label) {
  if (indices.length < 1 || indices.length > pageCount) {
    throw new Error(`pageRanges entry must list at least one in-range source page (${label})`);
  }
  const seen = new Set();
  for (const entry of indices) {
    if (entry >= pageCount || seen.has(entry)) {
      throw new Error(`pageRanges entry must list distinct in-range source pages (${label})`);
    }
    seen.add(entry);
  }
}

async function splitPdfDocumentWithLocalWasm(options) {
  const {
    bytes, wasmBinary, initPdfium, pageRanges,
  } = readValidatedOptions(options);
  if (bytes.byteLength > MAX_INPUT_BYTES) {
    throw new Error('PDF input exceeds the split resource budget');
  }
  const frozenRanges = Object.freeze(pageRanges.map((range) => Object.freeze(range.slice())));

  const inputSnapshot = copyByteView(bytes);
  const wasmSnapshot = copyByteView(wasmBinary);
  const runtimeWasmBinary = copyByteView(wasmBinary);
  const inputDigest = sha256Hex(inputSnapshot);
  let module = null;
  let libraryInitialized = false;
  let allocationPointer = null;
  let sourceHandle = null;
  const openTargets = [];
  let indexPointer = null;
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

    const allocatedPointer = module.pdfium.wasmExports.malloc(inputSnapshot.byteLength);
    if (!Number.isSafeInteger(allocatedPointer) || allocatedPointer <= 0) {
      throw new Error('PDFium input allocation failed');
    }
    const allocationEnd = allocatedPointer + inputSnapshot.byteLength;
    if (!Number.isSafeInteger(allocationEnd) || allocationEnd > heapLength) {
      throw new Error('PDFium input allocation exceeds HEAPU8');
    }
    allocationPointer = allocatedPointer;
    module.pdfium.HEAPU8.set(inputSnapshot, allocationPointer);

    const loadedSourceHandle = module.FPDF_LoadMemDocument(allocationPointer, inputSnapshot.byteLength, '');
    if (loadedSourceHandle === 0) {
      const pdfiumLastError = module.FPDF_GetLastError();
      if (!Number.isSafeInteger(pdfiumLastError) || pdfiumLastError < 0) {
        throw new Error('PDFium returned an invalid last-error code');
      }
      throw new Error(`PDFium could not open the input document (last-error ${pdfiumLastError})`);
    }
    if (!Number.isSafeInteger(loadedSourceHandle) || loadedSourceHandle <= 0) {
      throw new Error('PDFium returned an invalid document handle');
    }
    sourceHandle = loadedSourceHandle;

    const pageCount = module.FPDF_GetPageCount(sourceHandle);
    if (!Number.isSafeInteger(pageCount) || pageCount < 0) {
      throw new Error('PDFium returned an invalid page count');
    }
    const signatureCount = module.FPDF_GetSignatureCount(sourceHandle);
    if (!Number.isSafeInteger(signatureCount) || signatureCount < 0) {
      throw new Error('PDFium returned an invalid signature count');
    }
    frozenRanges.forEach((range, rangeIndex) => {
      assertInRangeSubset(range, pageCount, `range ${rangeIndex}`);
    });

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

    const outputs = [];
    for (let rangeIndex = 0; rangeIndex < frozenRanges.length; rangeIndex += 1) {
      const label = `range ${rangeIndex}`;
      const indices = frozenRanges[rangeIndex];
      const createdTargetHandle = module.FPDF_CreateNewDocument();
      if (!Number.isSafeInteger(createdTargetHandle) || createdTargetHandle <= 0) {
        throw new Error(`PDFium returned an invalid target document handle (${label})`);
      }
      openTargets.push(createdTargetHandle);
      const indexByteLength = indices.length * 4;
      indexPointer = mallocChecked(indexByteLength, `index ${label}`);
      const indexView = new DataView(
        module.pdfium.HEAPU8.buffer, module.pdfium.HEAPU8.byteOffset + indexPointer, indexByteLength,
      );
      for (let orderIndex = 0; orderIndex < indices.length; orderIndex += 1) {
        indexView.setInt32(orderIndex * 4, indices[orderIndex], true);
      }
      const importStatus = module.FPDF_ImportPagesByIndex(
        createdTargetHandle, sourceHandle, indexPointer, indices.length, 0,
      );
      try {
        module.pdfium.wasmExports.free(indexPointer);
      } finally {
        indexPointer = null;
      }
      if (!importStatus) {
        throw new Error(`PDFium page import did not complete (${label})`);
      }
      const importedPageCount = module.FPDF_GetPageCount(createdTargetHandle);
      if (importedPageCount !== indices.length) {
        throw new Error(`PDFium imported page count mismatch (${label})`);
      }
      const outputSignatureCount = module.FPDF_GetSignatureCount(createdTargetHandle);
      if (!Number.isSafeInteger(outputSignatureCount) || outputSignatureCount < 0) {
        throw new Error(`PDFium returned an invalid output signature count (${label})`);
      }
      const openedWriter = module.PDFiumExt_OpenFileWriter();
      if (!Number.isSafeInteger(openedWriter) || openedWriter <= 0) {
        throw new Error(`PDFium file-writer allocation failed (${label})`);
      }
      writerHandle = openedWriter;
      const saveStatus = module.PDFiumExt_SaveAsCopy(createdTargetHandle, writerHandle);
      if (!saveStatus) {
        throw new Error(`PDFium save did not complete (${label})`);
      }
      const writerSize = module.PDFiumExt_GetFileWriterSize(writerHandle);
      if (!Number.isSafeInteger(writerSize) || writerSize <= 0) {
        throw new Error(`PDFium save produced no bytes (${label})`);
      }
      if (writerSize > MAX_OUTPUT_BYTES) {
        throw new Error(`PDF output exceeds the split resource budget (${label})`);
      }
      outputAllocationPointer = mallocChecked(writerSize, `output ${label}`);
      const copiedBytes = module.PDFiumExt_GetFileWriterData(
        writerHandle, outputAllocationPointer, writerSize,
      );
      if (copiedBytes !== writerSize) {
        throw new Error(`PDFium save readout is incomplete (${label})`);
      }
      const outputBytes = new Uint8Array(
        module.pdfium.HEAPU8.slice(outputAllocationPointer, outputAllocationPointer + writerSize),
      );
      try {
        module.pdfium.wasmExports.free(outputAllocationPointer);
      } finally {
        outputAllocationPointer = null;
      }
      try {
        module.PDFiumExt_CloseFileWriter(writerHandle);
      } finally {
        writerHandle = null;
      }
      outputs.push(Object.freeze({
        pageIndices: indices,
        pageCount: indices.length,
        outputSignatureCount,
        outputBytes,
        outputByteLength: outputBytes.byteLength,
        outputDigest: Object.freeze({ algorithm: 'sha256', value: sha256Hex(outputBytes) }),
      }));
    }
    result = Object.freeze({
      succeeded: true,
      inputByteLength: inputSnapshot.byteLength,
      inputDigest: Object.freeze({ algorithm: 'sha256', value: inputDigest }),
      pageCount,
      signatureCount,
      signatureStructurePresent: signatureCount > 0,
      outputs: Object.freeze(outputs),
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
  if (indexPointer !== null) {
    try {
      module.pdfium.wasmExports.free(indexPointer);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('free', error));
    } finally {
      indexPointer = null;
    }
  }
  while (openTargets.length > 0) {
    const targetHandle = openTargets.pop();
    try {
      module.FPDF_CloseDocument(targetHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('FPDF_CloseDocument', error));
    }
  }
  if (sourceHandle) {
    try {
      module.FPDF_CloseDocument(sourceHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('FPDF_CloseDocument', error));
    } finally {
      sourceHandle = null;
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
    cleanupErrors.push(new Error('source bytes changed during PDFium split'));
  }
  if (!byteViewEquals(wasmBinary, wasmSnapshot)) {
    cleanupErrors.push(new Error('caller WASM bytes changed during PDFium split'));
  }
  if (!byteViewEquals(runtimeWasmBinary, wasmSnapshot)) {
    cleanupErrors.push(new Error('runtime WASM bytes changed during PDFium split'));
  }

  if (primaryError && cleanupErrors.length > 0) {
    throw new AggregateError([primaryError, ...cleanupErrors], 'PDFium split and cleanup failed');
  }
  if (primaryError) throw primaryError;
  if (cleanupErrors.length > 0) {
    throw new AggregateError(cleanupErrors, 'PDFium cleanup failed');
  }
  if (!result) throw new Error('PDFium split produced no result');
  return result;
}

module.exports = Object.freeze({
  splitPdfDocumentWithLocalWasm,
  SPLIT_RESOURCE_BUDGETS: Object.freeze({
    maxInputBytes: MAX_INPUT_BYTES,
    maxOutputBytes: MAX_OUTPUT_BYTES,
    maxRanges: MAX_RANGES,
  }),
});
