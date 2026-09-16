'use strict';

const { types: utilTypes } = require('node:util');

const FPDFBITMAP_BGRA = 4;
const BYTES_PER_PIXEL_BGRA = 4;
const RENDER_ROTATE_NONE = 0;
const RENDER_FLAGS_NONE = 0;

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
  requiredFunction(module, 'FPDFBitmap_CreateEx');
  requiredFunction(module, 'FPDF_RenderPageBitmap');
  requiredFunction(module, 'FPDFBitmap_GetBuffer');
  requiredFunction(module, 'FPDFBitmap_GetStride');
  requiredFunction(module, 'FPDFBitmap_Destroy');
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

function validPageSize(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function thumbnailDimensions(pageWidth, pageHeight, thumbMaxDimension) {
  const longest = Math.max(pageWidth, pageHeight);
  const scale = longest <= thumbMaxDimension ? 1 : thumbMaxDimension / longest;
  const width = Math.max(1, Math.floor(pageWidth * scale));
  const height = Math.max(1, Math.floor(pageHeight * scale));
  return { width, height };
}

async function renderPdfThumbnailWithLocalWasm({
  bytes,
  wasmBinary,
  initPdfium,
  pageIndex,
  maxPixels,
  thumbMaxDimension,
}) {
  if (!isByteView(bytes)) throw new TypeError('bytes must be a non-empty Uint8Array');
  if (!isByteView(wasmBinary)) throw new TypeError('wasmBinary must be a non-empty Uint8Array');
  if (typeof initPdfium !== 'function') throw new TypeError('initPdfium must be a function');
  if (!Number.isSafeInteger(pageIndex) || pageIndex < 0) {
    throw new TypeError('pageIndex must be a non-negative safe integer');
  }
  if (!Number.isSafeInteger(maxPixels) || maxPixels < 1) {
    throw new TypeError('maxPixels must be a positive safe integer');
  }
  if (!Number.isSafeInteger(thumbMaxDimension) || thumbMaxDimension < 1) {
    throw new TypeError('thumbMaxDimension must be a positive safe integer');
  }

  const inputSnapshot = copyByteView(bytes);
  const wasmSnapshot = copyByteView(wasmBinary);
  const runtimeWasmBinary = copyByteView(wasmBinary);
  let module = null;
  let libraryInitialized = false;
  let allocationPointer = null;
  let documentHandle = null;
  let pageHandle = null;
  let bitmapHandle = null;
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

      const pageWidthF = module.FPDF_GetPageWidthF(pageHandle);
      const pageHeightF = module.FPDF_GetPageHeightF(pageHandle);
      if (!validPageSize(pageWidthF) || !validPageSize(pageHeightF)) {
        throw new Error('PDFium returned an invalid page size');
      }
      const pageWidth = Math.ceil(pageWidthF);
      const pageHeight = Math.ceil(pageHeightF);
      if (!Number.isSafeInteger(pageWidth) || pageWidth < 1
          || !Number.isSafeInteger(pageHeight) || pageHeight < 1) {
        throw new Error('PDFium page size is not renderable');
      }
      const { width, height } = thumbnailDimensions(pageWidth, pageHeight, thumbMaxDimension);
      if (!Number.isSafeInteger(width) || width < 1 || width > thumbMaxDimension
          || !Number.isSafeInteger(height) || height < 1 || height > thumbMaxDimension) {
        throw new Error('PDFium thumbnail size is not renderable');
      }
      if (width * height > maxPixels) {
        throw new RangeError('PDFium thumbnail size exceeds the caller pixel budget');
      }

      const createdBitmapHandle = module.FPDFBitmap_CreateEx(
        width,
        height,
        FPDFBITMAP_BGRA,
        0,
        0,
      );
      if (!Number.isSafeInteger(createdBitmapHandle) || createdBitmapHandle <= 0) {
        throw new Error('PDFium bitmap creation failed');
      }
      bitmapHandle = createdBitmapHandle;

      module.FPDF_RenderPageBitmap(
        bitmapHandle,
        pageHandle,
        0,
        0,
        width,
        height,
        RENDER_ROTATE_NONE,
        RENDER_FLAGS_NONE,
      );

      const stride = module.FPDFBitmap_GetStride(bitmapHandle);
      const bufferPointer = module.FPDFBitmap_GetBuffer(bitmapHandle);
      const pixelByteLength = stride * height;
      if (!Number.isSafeInteger(stride) || stride < width * BYTES_PER_PIXEL_BGRA
          || !Number.isSafeInteger(bufferPointer) || bufferPointer <= 0
          || !Number.isSafeInteger(pixelByteLength)
          || bufferPointer + pixelByteLength > module.pdfium.HEAPU8.length) {
        throw new Error('PDFium returned an invalid bitmap buffer');
      }
      const pixels = Buffer.from(
        module.pdfium.HEAPU8.subarray(bufferPointer, bufferPointer + pixelByteLength),
      );
      result = Object.freeze({
        openSucceeded: true,
        pageIndex,
        pageCount,
        width,
        height,
        pixelFormat: 'BGRA',
        bytesPerPixel: BYTES_PER_PIXEL_BGRA,
        stride,
        pixels,
      });
    }
  } catch (error) {
    primaryError = error;
  }

  const cleanupErrors = [];
  if (bitmapHandle) {
    try {
      module.FPDFBitmap_Destroy(bitmapHandle);
    } catch (error) {
      cleanupErrors.push(cleanupFailure('FPDFBitmap_Destroy', error));
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
    cleanupErrors.push(new Error('source bytes changed during PDFium thumbnail render'));
  }
  if (!byteViewEquals(wasmBinary, wasmSnapshot)) {
    cleanupErrors.push(new Error('caller WASM bytes changed during PDFium thumbnail render'));
  }
  if (!byteViewEquals(runtimeWasmBinary, wasmSnapshot)) {
    cleanupErrors.push(new Error('runtime WASM bytes changed during PDFium thumbnail render'));
  }

  if (primaryError && cleanupErrors.length > 0) {
    throw new AggregateError([primaryError, ...cleanupErrors], 'PDFium thumbnail render and cleanup failed');
  }
  if (primaryError) throw primaryError;
  if (cleanupErrors.length > 0) {
    throw new AggregateError(cleanupErrors, 'PDFium thumbnail render cleanup failed');
  }
  if (!result) throw new Error('PDFium thumbnail render produced no result');
  return result;
}

module.exports = Object.freeze({ renderPdfThumbnailWithLocalWasm });
