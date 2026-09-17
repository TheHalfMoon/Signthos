'use strict';

const crypto = require('node:crypto');
const { types: utilTypes } = require('node:util');

const EXPECTED_OPTION_KEYS = Object.freeze([
  'bytes',
  'wasmBinary',
  'initPdfium',
  'pageIndex',
  'widgetIndex',
  'value',
]);

const MAX_FILL_CHARS = 500;
const FORMTYPE_ACRO_FORM = 1;
const SUBTYPE_WIDGET = 20;

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

function isFillableValue(value) {
  if (typeof value !== 'string' || value.length < 1 || value.length > MAX_FILL_CHARS) return false;
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    // Printable ASCII without PDF string-literal metacharacters: the
    // /V-literal proof needs the value to persist verbatim.
    if (code < 0x20 || code > 0x7e || code === 0x28 || code === 0x29 || code === 0x5c) return false;
  }
  return true;
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
  requiredFunction(module, 'FPDF_GetFormType');
  requiredFunction(module, 'PDFiumExt_OpenFormFillInfo');
  requiredFunction(module, 'PDFiumExt_InitFormFillEnvironment');
  requiredFunction(module, 'FPDF_LoadPage');
  requiredFunction(module, 'FPDF_ClosePage');
  requiredFunction(module, 'FORM_OnAfterLoadPage');
  requiredFunction(module, 'FPDFPage_GetAnnotCount');
  requiredFunction(module, 'FPDFPage_GetAnnot');
  requiredFunction(module, 'FPDFAnnot_GetSubtype');
  requiredFunction(module, 'FPDFPage_CloseAnnot');
  requiredFunction(module, 'FORM_SetFocusedAnnot');
  requiredFunction(module, 'FORM_OnChar');
  requiredFunction(module, 'FORM_ForceToKillFocus');
  requiredFunction(module, 'FORM_OnBeforeClosePage');
  requiredFunction(module, 'PDFiumExt_ExitFormFillEnvironment');
  requiredFunction(module, 'PDFiumExt_CloseFormFillInfo');
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
  if (!Number.isSafeInteger(entries.widgetIndex) || entries.widgetIndex < 0) {
    throw new TypeError('widgetIndex must be a safe integer >= 0');
  }
  if (!isFillableValue(entries.value)) {
    throw new TypeError('value must be 1..500 printable ASCII characters without ( ) \\');
  }
  return entries;
}

async function fillPdfFormTextWithLocalWasm(options) {
  const {
    bytes, wasmBinary, initPdfium, pageIndex, widgetIndex, value,
  } = readValidatedOptions(options);
  if (bytes.byteLength > MAX_INPUT_BYTES) {
    throw new Error('PDF input exceeds the form-fill resource budget');
  }

  const inputSnapshot = copyByteView(bytes);
  const wasmSnapshot = copyByteView(wasmBinary);
  const runtimeWasmBinary = copyByteView(wasmBinary);
  const inputDigest = sha256Hex(inputSnapshot);
  let module = null;
  let libraryInitialized = false;
  let allocationPointer = null;
  let documentHandle = null;
  let formFillInfoHandle = null;
  let formHandle = null;
  let pageHandle = null;
  let pageFormLoaded = false;
  const annotHandles = [];
  let targetAnnotHandle = null;
  let writerHandle = null;
  let outputAllocationPointer = null;
  let result = null;
  let primaryError = null;

  const closeAnnotSlot = (slot) => {
    const handle = annotHandles[slot];
    if (handle) {
      module.FPDFPage_CloseAnnot(handle);
      annotHandles[slot] = null;
      if (targetAnnotHandle === handle) targetAnnotHandle = null;
    }
  };

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

    const formType = module.FPDF_GetFormType(documentHandle);
    if (formType !== FORMTYPE_ACRO_FORM) {
      throw new Error('document has no AcroForm form to fill');
    }

    const signatureCount = module.FPDF_GetSignatureCount(documentHandle);
    if (!Number.isSafeInteger(signatureCount) || signatureCount < 0) {
      throw new Error('PDFium returned an invalid signature count');
    }
    if (signatureCount !== 0) {
      throw new Error('signed documents are not fill targets');
    }

    const pageCount = module.FPDF_GetPageCount(documentHandle);
    if (!Number.isSafeInteger(pageCount) || pageCount < 0) {
      throw new Error('PDFium returned an invalid page count');
    }
    if (pageIndex >= pageCount) {
      throw new Error('pageIndex is out of range for this document');
    }

    const openedFormFillInfo = module.PDFiumExt_OpenFormFillInfo();
    if (!Number.isSafeInteger(openedFormFillInfo) || openedFormFillInfo <= 0) {
      throw new Error('PDFium form-fill info allocation failed');
    }
    formFillInfoHandle = openedFormFillInfo;
    const initializedFormHandle = module.PDFiumExt_InitFormFillEnvironment(documentHandle, formFillInfoHandle);
    if (!Number.isSafeInteger(initializedFormHandle) || initializedFormHandle <= 0) {
      throw new Error('PDFium form-fill environment failed to initialize');
    }
    formHandle = initializedFormHandle;

    const loadedPageHandle = module.FPDF_LoadPage(documentHandle, pageIndex);
    if (!Number.isSafeInteger(loadedPageHandle) || loadedPageHandle <= 0) {
      throw new Error('PDFium returned an invalid page handle');
    }
    pageHandle = loadedPageHandle;
    module.FORM_OnAfterLoadPage(pageHandle, formHandle);
    pageFormLoaded = true;

    const annotCount = module.FPDFPage_GetAnnotCount(pageHandle);
    if (!Number.isSafeInteger(annotCount) || annotCount < 0) {
      throw new Error('PDFium returned an invalid annotation count');
    }
    let widgetsSeen = 0;
    for (let annotIndex = 0; annotIndex < annotCount; annotIndex += 1) {
      const annotHandle = module.FPDFPage_GetAnnot(pageHandle, annotIndex);
      if (!Number.isSafeInteger(annotHandle) || annotHandle <= 0) {
        throw new Error('PDFium returned an invalid annotation handle');
      }
      const slot = annotHandles.length;
      annotHandles.push(annotHandle);
      const subtype = module.FPDFAnnot_GetSubtype(annotHandle);
      if (subtype === SUBTYPE_WIDGET) {
        if (widgetsSeen === widgetIndex) {
          targetAnnotHandle = annotHandle;
        } else {
          closeAnnotSlot(slot);
        }
        widgetsSeen += 1;
      } else {
        closeAnnotSlot(slot);
      }
    }
    if (!targetAnnotHandle) {
      throw new Error('no widget annotation at widgetIndex on this page');
    }

    const focusStatus = module.FORM_SetFocusedAnnot(formHandle, targetAnnotHandle);
    if (!focusStatus) {
      throw new Error('PDFium form field did not accept focus');
    }
    for (let charIndex = 0; charIndex < value.length; charIndex += 1) {
      const charStatus = module.FORM_OnChar(formHandle, pageHandle, value.charCodeAt(charIndex), 0);
      if (!charStatus) {
        throw new Error('PDFium character input was not accepted');
      }
    }
    const killFocusStatus = module.FORM_ForceToKillFocus(formHandle);
    if (!killFocusStatus) {
      throw new Error('PDFium form field did not release focus');
    }
    const targetSlot = annotHandles.indexOf(targetAnnotHandle);
    closeAnnotSlot(targetSlot);
    module.FORM_OnBeforeClosePage(pageHandle, formHandle);
    pageFormLoaded = false;
    try {
      module.FPDF_ClosePage(pageHandle);
    } finally {
      pageHandle = null;
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
      throw new Error('PDF output exceeds the form-fill resource budget');
    }
    outputAllocationPointer = mallocChecked(writerSize, 'output');
    const copiedBytes = module.PDFiumExt_GetFileWriterData(writerHandle, outputAllocationPointer, writerSize);
    if (copiedBytes !== writerSize) {
      throw new Error('PDFium save readout is incomplete');
    }
    const outputBytes = new Uint8Array(
      module.pdfium.HEAPU8.slice(outputAllocationPointer, outputAllocationPointer + writerSize),
    );
    // PDFium serializes the value as /V(value) (no separator observed
    // first-hand); the spaced form is accepted as the same PDF object.
    const outputLatin1 = Buffer.from(outputBytes).toString('latin1');
    if (!outputLatin1.includes(`/V(${value})`) && !outputLatin1.includes(`/V (${value})`)) {
      throw new Error('PDFium fill proof is absent from the saved output');
    }
    result = Object.freeze({
      succeeded: true,
      inputByteLength: inputSnapshot.byteLength,
      inputDigest: Object.freeze({ algorithm: 'sha256', value: inputDigest }),
      pageIndex,
      widgetIndex,
      filledValue: value,
      pageCount,
      signatureCount,
      outputSignatureCount,
      signatureStructurePresent: false,
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
  for (let slot = 0; slot < annotHandles.length; slot += 1) {
    if (annotHandles[slot]) {
      try {
        module.FPDFPage_CloseAnnot(annotHandles[slot]);
      } catch (error) {
        cleanupErrors.push(cleanupFailure('FPDFPage_CloseAnnot', error));
      } finally {
        annotHandles[slot] = null;
      }
    }
  }
  targetAnnotHandle = null;
  if (pageHandle) {
    try {
      if (pageFormLoaded && formHandle) {
        try {
          module.FORM_OnBeforeClosePage(pageHandle, formHandle);
        } catch (error) {
          cleanupErrors.push(cleanupFailure('FORM_OnBeforeClosePage', error));
        } finally {
          pageFormLoaded = false;
        }
      }
      module.FPDF_ClosePage(pageHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('FPDF_ClosePage', error));
    } finally {
      pageHandle = null;
    }
  }
  if (formHandle) {
    try {
      module.PDFiumExt_ExitFormFillEnvironment(formHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('PDFiumExt_ExitFormFillEnvironment', error));
    } finally {
      formHandle = null;
    }
  }
  if (formFillInfoHandle) {
    try {
      module.PDFiumExt_CloseFormFillInfo(formFillInfoHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('PDFiumExt_CloseFormFillInfo', error));
    } finally {
      formFillInfoHandle = null;
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
    } finally {
      libraryInitialized = false;
    }
  }

  if (!byteViewEquals(bytes, inputSnapshot)) {
    cleanupErrors.push(new Error('source bytes changed during PDFium form fill'));
  }
  if (!byteViewEquals(wasmBinary, wasmSnapshot)) {
    cleanupErrors.push(new Error('caller WASM bytes changed during PDFium form fill'));
  }
  if (!byteViewEquals(runtimeWasmBinary, wasmSnapshot)) {
    cleanupErrors.push(new Error('runtime WASM bytes changed during PDFium form fill'));
  }

  if (primaryError && cleanupErrors.length > 0) {
    throw new AggregateError([primaryError, ...cleanupErrors], 'PDFium form fill and cleanup failed');
  }
  if (primaryError) throw primaryError;
  if (cleanupErrors.length > 0) {
    throw new AggregateError(cleanupErrors, 'PDFium cleanup failed');
  }
  if (!result) throw new Error('PDFium form fill produced no result');
  return result;
}

module.exports = Object.freeze({
  fillPdfFormTextWithLocalWasm,
  FORM_FILL_RESOURCE_BUDGETS: Object.freeze({
    maxInputBytes: MAX_INPUT_BYTES,
    maxOutputBytes: MAX_OUTPUT_BYTES,
    maxFillChars: MAX_FILL_CHARS,
  }),
});
