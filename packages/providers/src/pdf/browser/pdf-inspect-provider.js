'use strict';

const { types: utilTypes } = require('node:util');
const {
  SOURCE_KINDS,
  createContentInputBinding,
  exactByteIdentity,
} = require('../../content-identity-admission');
const { PDFIUM_PROVIDER } = require('./pdfium-structural-evidence');

const ABSENT = Symbol('ABSENT');

const CAPABILITY_REF = Object.freeze({
  capabilityCode: 'PDF_INSPECT_V1',
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

const PROVIDER_CAPABILITY_VERSION = 'signthos.pdf.inspect.v1';

const AVAILABILITY = Object.freeze({
  AVAILABLE: 'AVAILABLE',
  UNAVAILABLE: 'UNAVAILABLE',
  UNKNOWN: 'UNKNOWN',
});

const OUTCOME = Object.freeze({
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
});

const STABLE_ERROR = Object.freeze({
  INVALID_INPUT: 'INVALID_INPUT',
  UNSUPPORTED_CAPABILITY: 'UNSUPPORTED_CAPABILITY',
  UNAVAILABLE: 'UNAVAILABLE',
  MALFORMED_UNTRUSTED_DOCUMENT: 'MALFORMED_UNTRUSTED_DOCUMENT',
});

const RETRY_CATEGORY = Object.freeze({
  DO_NOT_RETRY_UNCHANGED: 'DO_NOT_RETRY_UNCHANGED',
  RETRY_MAY_SUCCEED: 'RETRY_MAY_SUCCEED',
  RETRY_REQUIRES_CHANGED_INPUT_OR_STATE: 'RETRY_REQUIRES_CHANGED_INPUT_OR_STATE',
});

const UNSUPPORTED_INSPECT_OBSERVATIONS = Object.freeze([
  'pageBoxes',
  'pageRotations',
  'encryptionState',
  'metadataPresence',
  'formPresence',
  'attachmentPresence',
  'activeContentIndicators',
]);

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

const ACCEPTED_STRUCTURAL_KEYS = Object.freeze([
  'providerId',
  'providerVersionEvidence',
  'providerCapabilityVersion',
  'inputExactBytesDigest',
  'byteLength',
  'state',
  'structuralIdentityResult',
  'providerObservation',
]);

const REJECTED_STRUCTURAL_KEYS = Object.freeze([
  'providerId',
  'providerVersionEvidence',
  'providerCapabilityVersion',
  'inputExactBytesDigest',
  'byteLength',
  'state',
  'providerObservation',
]);

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
  if (!exactOwnKeys(capabilityParameters, [])) return null;

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

function validateVersionEvidence(value) {
  return exactOwnKeys(value, [
    'packageIdentity',
    'version',
    'embedpdfSourceCommit',
    'pdfiumSubmoduleRevision',
    'wasmSha256',
  ])
    && ownString(value, 'packageIdentity') === PDFIUM_PROVIDER.packageIdentity
    && ownString(value, 'version') === PDFIUM_PROVIDER.providerVersion
    && ownString(value, 'embedpdfSourceCommit') === PDFIUM_PROVIDER.embedpdfSourceCommit
    && ownString(value, 'pdfiumSubmoduleRevision') === PDFIUM_PROVIDER.pdfiumSubmoduleRevision
    && ownString(value, 'wasmSha256') === PDFIUM_PROVIDER.wasmSha256;
}

function structuralBindingMatches(base, evidence) {
  if (!isPlainObject(evidence)) return false;
  const digest = ownData(evidence, 'inputExactBytesDigest');
  const byteLength = ownData(evidence, 'byteLength');
  const version = ownData(evidence, 'providerVersionEvidence');
  return exactDigest(digest, base.identity.inputExactBytesDigest)
    && byteLength === base.identity.byteLength
    && ownString(evidence, 'providerId') === PDFIUM_PROVIDER.providerId
    && ownString(evidence, 'providerCapabilityVersion') === PDFIUM_PROVIDER.providerCapabilityVersion
    && validateVersionEvidence(version);
}

function classifyStructuralEvidence(base, evidence) {
  if (!structuralBindingMatches(base, evidence)) return { kind: 'BINDING_INVALID' };

  const state = ownString(evidence, 'state');
  const providerObservation = ownData(evidence, 'providerObservation');
  if (!isPlainObject(providerObservation)) return { kind: 'SHAPE_INVALID' };

  if (state === 'STRUCTURAL_INSPECTION_COMPLETE') {
    if (!exactOwnKeys(evidence, ACCEPTED_STRUCTURAL_KEYS)) return { kind: 'SHAPE_INVALID' };
    if (ownData(evidence, 'structuralIdentityResult') !== 'PDF_STRUCTURE_ACCEPTED') {
      return { kind: 'SHAPE_INVALID' };
    }
    if (!exactOwnKeys(providerObservation, ['openSucceeded', 'pageCount'])) {
      return { kind: 'SHAPE_INVALID' };
    }
    const openSucceeded = ownData(providerObservation, 'openSucceeded');
    const pageCount = ownData(providerObservation, 'pageCount');
    if (openSucceeded !== true || !Number.isSafeInteger(pageCount) || pageCount < 0) {
      return { kind: 'SHAPE_INVALID' };
    }
    return { kind: 'ACCEPTED', pageCount };
  }

  if (state === 'STRUCTURAL_INSPECTION_INPUT_REJECTED') {
    if (!exactOwnKeys(evidence, REJECTED_STRUCTURAL_KEYS)) return { kind: 'SHAPE_INVALID' };
    if (!exactOwnKeys(providerObservation, [
      'openSucceeded',
      'pdfiumLastError',
      'pdfiumErrorConstant',
      'pdfiumErrorMeaning',
    ])) return { kind: 'SHAPE_INVALID' };
    const openSucceeded = ownData(providerObservation, 'openSucceeded');
    const pdfiumLastError = ownData(providerObservation, 'pdfiumLastError');
    const pdfiumErrorConstant = ownString(providerObservation, 'pdfiumErrorConstant');
    const pdfiumErrorMeaning = ownString(providerObservation, 'pdfiumErrorMeaning');
    if (openSucceeded !== false
        || pdfiumLastError !== 3
        || pdfiumErrorConstant !== 'FPDF_ERR_FORMAT'
        || pdfiumErrorMeaning !== 'File not in PDF format or corrupted') {
      return { kind: 'SHAPE_INVALID' };
    }
    return {
      kind: 'INPUT_REJECTED',
      providerDiagnostics: deepFreeze({
        providerErrorCode: 3,
        providerErrorConstant: 'FPDF_ERR_FORMAT',
        providerErrorMeaning: 'File not in PDF format or corrupted',
      }),
    };
  }

  return { kind: 'SHAPE_INVALID' };
}

function composePdfInspectResult({
  bytes,
  request,
  availability,
  structuralEvidence,
  terminalOutcomeEvidence = null,
}) {
  const base = requestBase(bytes, request);
  if (!base) return invalidRequestFallback(bytes, request, 'invalid_input.pdf_inspect_request');

  if (!exactCapabilityRef(base.capabilityRef)
      || base.providerCapabilityVersion !== PROVIDER_CAPABILITY_VERSION) {
    return failed(base, stableError(
      STABLE_ERROR.UNSUPPORTED_CAPABILITY,
      'unsupported_capability.pdf_inspect_v1',
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
      'unavailable.pdf_inspect_provider',
      RETRY_CATEGORY.RETRY_MAY_SUCCEED,
    ));
  }

  // This pure semantic unit owns no runtime terminal-evidence schema. It must never
  // ignore cancellation/timeout/resource-limit evidence and then publish success.
  if (terminalOutcomeEvidence !== null && terminalOutcomeEvidence !== undefined) {
    return failed(base, stableError(
      STABLE_ERROR.INVALID_INPUT,
      'invalid_input.runtime_terminal_evidence_not_qualified',
    ));
  }

  const structural = classifyStructuralEvidence(base, structuralEvidence);
  if (structural.kind === 'BINDING_INVALID') {
    return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.structural_evidence_binding'));
  }
  if (structural.kind === 'SHAPE_INVALID') {
    return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.structural_evidence_shape'));
  }

  if (structural.kind === 'ACCEPTED') {
    return deepFreeze({
      ...baseResult(base),
      outcome: OUTCOME.SUCCEEDED,
      observations: {
        pageCount: structural.pageCount,
        warnings: [],
        unsupportedObservations: [...UNSUPPORTED_INSPECT_OBSERVATIONS],
      },
    });
  }

  if (structural.kind === 'INPUT_REJECTED') {
    return failed(
      base,
      stableError(
        STABLE_ERROR.MALFORMED_UNTRUSTED_DOCUMENT,
        'malformed_untrusted_document.pdfium_format_or_corruption',
        RETRY_CATEGORY.RETRY_REQUIRES_CHANGED_INPUT_OR_STATE,
      ),
      structural.providerDiagnostics,
    );
  }

  return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.structural_evidence_state'));
}

module.exports = Object.freeze({
  AVAILABILITY,
  CAPABILITY_REF,
  OUTCOME,
  PROVIDER_CAPABILITY_VERSION,
  PROVIDER_DESCRIPTOR,
  RETRY_CATEGORY,
  STABLE_ERROR,
  UNSUPPORTED_INSPECT_OBSERVATIONS,
  composePdfInspectResult,
});
