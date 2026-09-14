'use strict';

const { exactByteIdentity } = require('../../content-identity-admission');

const PDFIUM_PROVIDER = Object.freeze({
  providerId: '@embedpdf/pdfium',
  providerVersion: '2.15.0',
  packageIdentity: '@embedpdf/pdfium@2.15.0',
  providerCapabilityVersion: 'signthos.pdfium.structural-open.v1',
  embedpdfSourceCommit: '2cf7df3b594dfe46de2d85e6973ff50ea447a1ed',
  pdfiumSubmoduleRevision: 'cb29e78f2ba00c9298714d5f4a8bf7765f1e802f',
  wasmSha256: 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8',
});

const PDFIUM_FORMAT_ERROR = Object.freeze({
  code: 3,
  constant: 'FPDF_ERR_FORMAT',
  meaning: 'File not in PDF format or corrupted',
});

function isPlainObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Buffer.isBuffer(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function hasOwn(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function ownDataProperty(value, key) {
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  if (!descriptor || !hasOwn(descriptor, 'value')) return null;
  return descriptor;
}

function frozenProviderVersionEvidence() {
  return Object.freeze({
    packageIdentity: PDFIUM_PROVIDER.packageIdentity,
    version: PDFIUM_PROVIDER.providerVersion,
    embedpdfSourceCommit: PDFIUM_PROVIDER.embedpdfSourceCommit,
    pdfiumSubmoduleRevision: PDFIUM_PROVIDER.pdfiumSubmoduleRevision,
    wasmSha256: PDFIUM_PROVIDER.wasmSha256,
  });
}

function baseEvidence(bytes) {
  const identity = exactByteIdentity(bytes);
  return {
    providerId: PDFIUM_PROVIDER.providerId,
    providerVersionEvidence: frozenProviderVersionEvidence(),
    providerCapabilityVersion: PDFIUM_PROVIDER.providerCapabilityVersion,
    inputExactBytesDigest: identity.inputExactBytesDigest,
    byteLength: identity.byteLength,
  };
}

function mapPdfiumStructuralObservation(bytes, rawObservation) {
  if (!Buffer.isBuffer(bytes)) throw new TypeError('bytes must be a Buffer');
  if (!isPlainObject(rawObservation)) throw new TypeError('rawObservation must be a plain object');
  const openSucceededDescriptor = ownDataProperty(rawObservation, 'openSucceeded');
  if (!openSucceededDescriptor || typeof openSucceededDescriptor.value !== 'boolean') {
    throw new TypeError('rawObservation.openSucceeded must be an own boolean data property');
  }
  const openSucceeded = openSucceededDescriptor.value;

  const base = baseEvidence(bytes);

  if (openSucceeded) {
    const pageCountDescriptor = ownDataProperty(rawObservation, 'pageCount');
    const pageCount = pageCountDescriptor?.value;
    if (!pageCountDescriptor || !Number.isSafeInteger(pageCount) || pageCount < 0) {
      throw new TypeError('successful PDFium open requires an own nonnegative safe-integer pageCount data property');
    }
    if ('pdfiumLastError' in rawObservation) {
      throw new TypeError('successful PDFium open must not carry pdfiumLastError');
    }
    return Object.freeze({
      ...base,
      state: 'STRUCTURAL_INSPECTION_COMPLETE',
      structuralIdentityResult: 'PDF_STRUCTURE_ACCEPTED',
      providerObservation: Object.freeze({
        openSucceeded: true,
        pageCount,
      }),
    });
  }

  if ('pageCount' in rawObservation) {
    throw new TypeError('failed PDFium open must not carry pageCount');
  }
  const pdfiumLastErrorDescriptor = ownDataProperty(rawObservation, 'pdfiumLastError');
  if (!pdfiumLastErrorDescriptor || pdfiumLastErrorDescriptor.value !== PDFIUM_FORMAT_ERROR.code) {
    throw new TypeError('PDFium observation is not qualified for structural mapping');
  }

  return Object.freeze({
    ...base,
    state: 'STRUCTURAL_INSPECTION_INPUT_REJECTED',
    providerObservation: Object.freeze({
      openSucceeded: false,
      pdfiumLastError: PDFIUM_FORMAT_ERROR.code,
      pdfiumErrorConstant: PDFIUM_FORMAT_ERROR.constant,
      pdfiumErrorMeaning: PDFIUM_FORMAT_ERROR.meaning,
    }),
  });
}

module.exports = Object.freeze({
  PDFIUM_FORMAT_ERROR,
  PDFIUM_PROVIDER,
  mapPdfiumStructuralObservation,
});
