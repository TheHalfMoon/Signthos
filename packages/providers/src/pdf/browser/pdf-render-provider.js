'use strict';

const crypto = require('node:crypto');
const { types: utilTypes } = require('node:util');
const {
  SOURCE_KINDS,
  createContentInputBinding,
  exactByteIdentity,
} = require('../../content-identity-admission');
const { PDFIUM_PROVIDER } = require('./pdfium-structural-evidence');

const ABSENT = Symbol('ABSENT');

const CAPABILITY_REF = Object.freeze({
  capabilityCode: 'PDF_RENDER_V1',
  capabilityVersion: '1',
});

const PROVIDER_DESCRIPTOR = Object.freeze({
  providerId: 'signthos.pdf.browser.embedpdf-v2.15.0-pdfium',
  providerKind: 'BROWSER',
  locality: 'LOCAL_ONLY',
  providerCandidateId: 'embedpdf-v2.15.0-pdfium-browser',
  capabilityContractVersion: 'signthos.provider-capability.v1',
  declaredCapabilities: Object.freeze([CAPABILITY_REF]),
  implementationVersionEvidence: Object.freeze({
    packageIdentity: PDFIUM_PROVIDER.packageIdentity,
    version: PDFIUM_PROVIDER.providerVersion,
    embedpdfSourceCommit: PDFIUM_PROVIDER.embedpdfSourceCommit,
    pdfiumSubmoduleRevision: PDFIUM_PROVIDER.pdfiumSubmoduleRevision,
    wasmSha256: PDFIUM_PROVIDER.wasmSha256,
  }),
});

const PROVIDER_CAPABILITY_VERSION = 'signthos.pdf.render.v1';

const AVAILABILITY = Object.freeze({
  AVAILABLE: 'AVAILABLE',
  UNAVAILABLE: 'UNAVAILABLE',
  UNKNOWN: 'UNKNOWN',
});

const OUTCOME = Object.freeze({
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  TIMED_OUT: 'TIMED_OUT',
  RESOURCE_LIMIT_EXCEEDED: 'RESOURCE_LIMIT_EXCEEDED',
});

const STABLE_ERROR = Object.freeze({
  INVALID_INPUT: 'INVALID_INPUT',
  UNSUPPORTED_CAPABILITY: 'UNSUPPORTED_CAPABILITY',
  UNAVAILABLE: 'UNAVAILABLE',
  MALFORMED_UNTRUSTED_DOCUMENT: 'MALFORMED_UNTRUSTED_DOCUMENT',
  CANCELLED: 'CANCELLED',
  TIMEOUT: 'TIMEOUT',
  RESOURCE_LIMIT_EXCEEDED: 'RESOURCE_LIMIT_EXCEEDED',
});

const RETRY_CATEGORY = Object.freeze({
  DO_NOT_RETRY_UNCHANGED: 'DO_NOT_RETRY_UNCHANGED',
  RETRY_MAY_SUCCEED: 'RETRY_MAY_SUCCEED',
  RETRY_REQUIRES_CHANGED_INPUT_OR_STATE: 'RETRY_REQUIRES_CHANGED_INPUT_OR_STATE',
});

const REQUEST_KEYS = Object.freeze([
  'operationId',
  'capabilityRef',
  'documentId',
  'inputRevisionId',
  'inputExactBytesDigest',
  'inputByteLength',
  'providerId',
  'providerCapabilityVersion',
  'resourceBudgetRef',
  'capabilityParameters',
]);

const CAPABILITY_PARAMETER_KEYS = Object.freeze(['pageIndex', 'maxPixels']);

const ACCEPTED_RENDER_KEYS = Object.freeze([
  'openSucceeded',
  'pageIndex',
  'pageCount',
  'width',
  'height',
  'pixelFormat',
  'bytesPerPixel',
  'stride',
  'pixels',
]);

const REJECTED_RENDER_KEYS = Object.freeze(['openSucceeded', 'pdfiumLastError']);

const PIXEL_FORMAT_BGRA = 'BGRA';
const BYTES_PER_PIXEL_BGRA = 4;

const PDFIUM_FORMAT_ERROR = Object.freeze({
  code: 3,
  constant: 'FPDF_ERR_FORMAT',
  meaning: 'File not in PDF format or corrupted',
});

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const child of Object.values(value)) deepFreeze(child);
  return Object.freeze(value);
}

function isPlainObject(value) {
  if (!value || typeof value !== 'object') return false;
  if (utilTypes.isProxy(value)) return false;
  if (Array.isArray(value) || Buffer.isBuffer(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function ownData(value, key) {
  if (!isPlainObject(value)) return ABSENT;
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, 'value')) return ABSENT;
  return descriptor.value;
}

function ownString(value, key) {
  const field = ownData(value, key);
  return typeof field === 'string' && field.trim().length > 0 ? field : null;
}

function exactOwnKeys(value, expectedKeys) {
  if (!isPlainObject(value)) return false;
  const actual = Reflect.ownKeys(value);
  if (actual.some((key) => typeof key !== 'string')) return false;
  if (actual.length !== expectedKeys.length) return false;
  const expected = new Set(expectedKeys);
  return actual.every((key) => expected.has(key));
}

function exactDigest(value, expected) {
  return exactOwnKeys(value, ['algorithm', 'value'])
    && ownString(value, 'algorithm') === expected.algorithm
    && ownString(value, 'value') === expected.value;
}

function exactCapabilityRef(value) {
  return exactOwnKeys(value, ['capabilityCode', 'capabilityVersion'])
    && ownString(value, 'capabilityCode') === CAPABILITY_REF.capabilityCode
    && ownString(value, 'capabilityVersion') === CAPABILITY_REF.capabilityVersion;
}

function stableError(errorClass, errorCode, retryCategory = RETRY_CATEGORY.DO_NOT_RETRY_UNCHANGED) {
  return deepFreeze({ errorClass, errorCode, retryCategory });
}

function requestBase(bytes, request) {
  if (!Buffer.isBuffer(bytes) || !exactOwnKeys(request, REQUEST_KEYS)) return null;

  const operationId = ownString(request, 'operationId');
  const documentId = ownString(request, 'documentId');
  const inputRevisionId = ownString(request, 'inputRevisionId');
  const providerId = ownString(request, 'providerId');
  const providerCapabilityVersion = ownString(request, 'providerCapabilityVersion');
  const resourceBudgetRef = ownString(request, 'resourceBudgetRef');
  const inputByteLength = ownData(request, 'inputByteLength');
  const capabilityRef = ownData(request, 'capabilityRef');
  const inputExactBytesDigest = ownData(request, 'inputExactBytesDigest');
  const capabilityParameters = ownData(request, 'capabilityParameters');

  if (!operationId || !documentId || !inputRevisionId || !providerId
      || !providerCapabilityVersion || !resourceBudgetRef) return null;
  if (!Number.isSafeInteger(inputByteLength) || inputByteLength < 0) return null;
  if (!isPlainObject(capabilityRef)) return null;
  const capabilityCode = ownString(capabilityRef, 'capabilityCode');
  const capabilityVersion = ownString(capabilityRef, 'capabilityVersion');
  if (!capabilityCode || !capabilityVersion) return null;
  if (!exactOwnKeys(capabilityParameters, CAPABILITY_PARAMETER_KEYS)) return null;
  const pageIndex = ownData(capabilityParameters, 'pageIndex');
  const maxPixels = ownData(capabilityParameters, 'maxPixels');
  if (!Number.isSafeInteger(pageIndex) || pageIndex < 0) return null;
  if (!Number.isSafeInteger(maxPixels) || maxPixels < 1) return null;

  const identity = exactByteIdentity(bytes);
  if (inputByteLength !== identity.byteLength) return null;
  if (!exactDigest(inputExactBytesDigest, identity.inputExactBytesDigest)) return null;

  let inputBinding;
  try {
    inputBinding = createContentInputBinding(bytes, {
      sourceKind: SOURCE_KINDS.CANONICAL_DOCUMENT_REVISION,
      documentId,
      inputRevisionId,
    });
  } catch {
    return null;
  }

  return deepFreeze({
    operationId,
    documentId,
    inputRevisionId,
    providerId,
    providerCapabilityVersion,
    resourceBudgetRef,
    capabilityRef: Object.freeze({ capabilityCode, capabilityVersion }),
    capabilityParameters: Object.freeze({ pageIndex, maxPixels }),
    inputBinding,
    identity,
  });
}

function baseResult(base) {
  return {
    operationId: base.operationId,
    capabilityRef: CAPABILITY_REF,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerKind: PROVIDER_DESCRIPTOR.providerKind,
    locality: PROVIDER_DESCRIPTOR.locality,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    providerVersionEvidence: PROVIDER_DESCRIPTOR.implementationVersionEvidence,
    documentId: base.documentId,
    inputRevisionId: base.inputRevisionId,
    inputExactBytesDigest: base.identity.inputExactBytesDigest,
    inputByteLength: base.identity.byteLength,
    effectClass: 'READ_ONLY',
    resourceBudgetRef: base.resourceBudgetRef,
    newCanonicalRevisionCreated: false,
  };
}

function failed(base, error, providerDiagnostics) {
  const result = { ...baseResult(base), outcome: OUTCOME.FAILED, stableError: error };
  if (providerDiagnostics !== undefined) result.providerDiagnostics = providerDiagnostics;
  return deepFreeze(result);
}

function invalidRequestFallback(bytes, request, errorCode) {
  const identity = Buffer.isBuffer(bytes) ? exactByteIdentity(bytes) : null;
  const operationId = isPlainObject(request) ? ownString(request, 'operationId') : null;
  return deepFreeze({
    operationId,
    capabilityRef: CAPABILITY_REF,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerKind: PROVIDER_DESCRIPTOR.providerKind,
    locality: PROVIDER_DESCRIPTOR.locality,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    effectClass: 'READ_ONLY',
    ...(identity ? { inputExactBytesDigest: identity.inputExactBytesDigest, inputByteLength: identity.byteLength } : {}),
    outcome: OUTCOME.FAILED,
    newCanonicalRevisionCreated: false,
    stableError: stableError(STABLE_ERROR.INVALID_INPUT, errorCode),
  });
}

function classifyRenderEvidence(base, evidence) {
  if (!isPlainObject(evidence)) return { kind: 'SHAPE_INVALID' };
  const openSucceeded = ownData(evidence, 'openSucceeded');
  if (typeof openSucceeded !== 'boolean') return { kind: 'SHAPE_INVALID' };

  if (openSucceeded === true) {
    if (!exactOwnKeys(evidence, ACCEPTED_RENDER_KEYS)) return { kind: 'SHAPE_INVALID' };
    const pageIndex = ownData(evidence, 'pageIndex');
    const pageCount = ownData(evidence, 'pageCount');
    const width = ownData(evidence, 'width');
    const height = ownData(evidence, 'height');
    const pixelFormat = ownData(evidence, 'pixelFormat');
    const bytesPerPixel = ownData(evidence, 'bytesPerPixel');
    const stride = ownData(evidence, 'stride');
    const pixels = ownData(evidence, 'pixels');

    if (!Number.isSafeInteger(pageIndex) || pageIndex < 0) return { kind: 'SHAPE_INVALID' };
    if (!Number.isSafeInteger(pageCount) || pageCount < 0) return { kind: 'SHAPE_INVALID' };
    if (pageIndex !== base.capabilityParameters.pageIndex) return { kind: 'BINDING_INVALID' };
    if (pageIndex >= pageCount) return { kind: 'SHAPE_INVALID' };
    if (!Number.isSafeInteger(width) || width < 1) return { kind: 'SHAPE_INVALID' };
    if (!Number.isSafeInteger(height) || height < 1) return { kind: 'SHAPE_INVALID' };
    if (pixelFormat !== PIXEL_FORMAT_BGRA) return { kind: 'SHAPE_INVALID' };
    if (bytesPerPixel !== BYTES_PER_PIXEL_BGRA) return { kind: 'SHAPE_INVALID' };
    if (!Number.isSafeInteger(stride) || stride < 1) return { kind: 'SHAPE_INVALID' };
    const rowBytes = width * BYTES_PER_PIXEL_BGRA;
    if (!Number.isSafeInteger(rowBytes) || stride < rowBytes) return { kind: 'SHAPE_INVALID' };
    const pixelCount = width * height;
    if (!Number.isSafeInteger(pixelCount) || pixelCount < 1) return { kind: 'SHAPE_INVALID' };
    if (pixelCount > base.capabilityParameters.maxPixels) return { kind: 'SHAPE_INVALID' };
    if (utilTypes.isProxy(pixels) || !Buffer.isBuffer(pixels)) return { kind: 'SHAPE_INVALID' };
    const pixelByteLength = stride * height;
    if (!Number.isSafeInteger(pixelByteLength) || pixels.byteLength !== pixelByteLength) {
      return { kind: 'SHAPE_INVALID' };
    }
    return {
      kind: 'ACCEPTED',
      pageIndex,
      pageCount,
      width,
      height,
      stride,
      pixels,
    };
  }

  if (!exactOwnKeys(evidence, REJECTED_RENDER_KEYS)) return { kind: 'SHAPE_INVALID' };
  const pdfiumLastError = ownData(evidence, 'pdfiumLastError');
  if (pdfiumLastError !== PDFIUM_FORMAT_ERROR.code) return { kind: 'SHAPE_INVALID' };
  return {
    kind: 'INPUT_REJECTED',
    providerDiagnostics: deepFreeze({
      providerErrorCode: PDFIUM_FORMAT_ERROR.code,
      providerErrorConstant: PDFIUM_FORMAT_ERROR.constant,
      providerErrorMeaning: PDFIUM_FORMAT_ERROR.meaning,
    }),
  };
}

function composePdfRenderResult({
  bytes,
  request,
  availability,
  renderEvidence,
}) {
  const base = requestBase(bytes, request);
  if (!base) return invalidRequestFallback(bytes, request, 'invalid_input.pdf_render_request');

  if (!exactCapabilityRef(base.capabilityRef)
      || base.providerCapabilityVersion !== PROVIDER_CAPABILITY_VERSION) {
    return failed(base, stableError(
      STABLE_ERROR.UNSUPPORTED_CAPABILITY,
      'unsupported_capability.pdf_render_v1',
    ));
  }

  if (base.providerId !== PROVIDER_DESCRIPTOR.providerId) {
    return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.provider_mismatch'));
  }

  if (availability !== AVAILABILITY.AVAILABLE) {
    if (availability !== AVAILABILITY.UNAVAILABLE && availability !== AVAILABILITY.UNKNOWN) {
      return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.availability_state'));
    }
    return failed(base, stableError(
      STABLE_ERROR.UNAVAILABLE,
      'unavailable.pdf_render_provider',
      RETRY_CATEGORY.RETRY_MAY_SUCCEED,
    ));
  }

  const render = classifyRenderEvidence(base, renderEvidence);
  if (render.kind === 'BINDING_INVALID') {
    return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.render_evidence_binding'));
  }
  if (render.kind === 'SHAPE_INVALID') {
    return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.render_evidence_shape'));
  }

  if (render.kind === 'ACCEPTED') {
    const pixelDigest = Object.freeze({
      algorithm: 'sha256',
      value: crypto.createHash('sha256').update(render.pixels).digest('hex'),
    });
    return deepFreeze({
      ...baseResult(base),
      outcome: OUTCOME.SUCCEEDED,
      observations: {
        pageIndex: render.pageIndex,
        pageCount: render.pageCount,
        width: render.width,
        height: render.height,
        pixelFormat: PIXEL_FORMAT_BGRA,
        bytesPerPixel: BYTES_PER_PIXEL_BGRA,
        stride: render.stride,
        pixelByteLength: render.stride * render.height,
        pixelDigest,
        warnings: [],
      },
    });
  }

  if (render.kind === 'INPUT_REJECTED') {
    return failed(
      base,
      stableError(
        STABLE_ERROR.MALFORMED_UNTRUSTED_DOCUMENT,
        'malformed_untrusted_document.pdfium_format_or_corruption',
        RETRY_CATEGORY.RETRY_REQUIRES_CHANGED_INPUT_OR_STATE,
      ),
      render.providerDiagnostics,
    );
  }

  return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.render_evidence_shape'));
}

module.exports = Object.freeze({
  AVAILABILITY,
  CAPABILITY_REF,
  OUTCOME,
  PROVIDER_CAPABILITY_VERSION,
  PROVIDER_DESCRIPTOR,
  RETRY_CATEGORY,
  STABLE_ERROR,
  composePdfRenderResult,
});
