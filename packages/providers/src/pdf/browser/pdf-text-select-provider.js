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
  capabilityCode: 'PDF_TEXT_SELECT_V1',
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

const PROVIDER_CAPABILITY_VERSION = 'signthos.pdf.text.select.v1';

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

const TERMINAL_EVIDENCE_SCHEMA = 'signthos.pdf.text.select.runtime-terminal.v1';

const TERMINAL_OUTCOME = Object.freeze({
  CANCELLED: 'CANCELLED',
  TIMED_OUT: 'TIMED_OUT',
  RESOURCE_LIMIT_EXCEEDED: 'RESOURCE_LIMIT_EXCEEDED',
});

const TERMINAL_EVIDENCE_KEYS = Object.freeze([
  'schema',
  'terminalOutcome',
  'providerId',
  'providerCapabilityVersion',
  'inputExactBytesDigest',
  'byteLength',
  'resourceBudgetRef',
  'runtimeEvidenceRef',
  'partialOutputDiscarded',
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

const CAPABILITY_PARAMETER_KEYS = Object.freeze(['pageIndex', 'startIndex', 'selectCount', 'maxRects']);

const ACCEPTED_SELECT_KEYS = Object.freeze([
  'openSucceeded',
  'pageIndex',
  'pageCount',
  'charCount',
  'startIndex',
  'selectCount',
  'rectCount',
  'rectsTruncated',
  'unicodeMapError',
  'text',
  'rects',
]);

const REJECTED_SELECT_KEYS = Object.freeze(['openSucceeded', 'pdfiumLastError']);

const RECT_KEYS = Object.freeze(['left', 'top', 'right', 'bottom']);

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
  const startIndex = ownData(capabilityParameters, 'startIndex');
  const selectCount = ownData(capabilityParameters, 'selectCount');
  const maxRects = ownData(capabilityParameters, 'maxRects');
  if (!Number.isSafeInteger(pageIndex) || pageIndex < 0) return null;
  if (!Number.isSafeInteger(startIndex) || startIndex < 0) return null;
  if (!Number.isSafeInteger(selectCount) || selectCount < 0) return null;
  if (!Number.isSafeInteger(maxRects) || maxRects < 1) return null;

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
    capabilityParameters: Object.freeze({ pageIndex, startIndex, selectCount, maxRects }),
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

function validRect(value) {
  if (!isPlainObject(value) || !exactOwnKeys(value, RECT_KEYS)) return false;
  const left = ownData(value, 'left');
  const top = ownData(value, 'top');
  const right = ownData(value, 'right');
  const bottom = ownData(value, 'bottom');
  return Number.isFinite(left) && Number.isFinite(top)
    && Number.isFinite(right) && Number.isFinite(bottom)
    && left <= right;
}

function classifySelectEvidence(base, evidence) {
  if (!isPlainObject(evidence)) return { kind: 'SHAPE_INVALID' };
  const openSucceeded = ownData(evidence, 'openSucceeded');
  if (typeof openSucceeded !== 'boolean') return { kind: 'SHAPE_INVALID' };

  if (openSucceeded === true) {
    if (!exactOwnKeys(evidence, ACCEPTED_SELECT_KEYS)) return { kind: 'SHAPE_INVALID' };
    const pageIndex = ownData(evidence, 'pageIndex');
    const pageCount = ownData(evidence, 'pageCount');
    const charCount = ownData(evidence, 'charCount');
    const startIndex = ownData(evidence, 'startIndex');
    const selectCount = ownData(evidence, 'selectCount');
    const rectCount = ownData(evidence, 'rectCount');
    const rectsTruncated = ownData(evidence, 'rectsTruncated');
    const unicodeMapError = ownData(evidence, 'unicodeMapError');
    const text = ownData(evidence, 'text');
    const rects = ownData(evidence, 'rects');
    const maxRects = base.capabilityParameters.maxRects;

    if (!Number.isSafeInteger(pageIndex) || pageIndex < 0) return { kind: 'SHAPE_INVALID' };
    if (!Number.isSafeInteger(pageCount) || pageCount < 0) return { kind: 'SHAPE_INVALID' };
    if (pageIndex !== base.capabilityParameters.pageIndex) return { kind: 'BINDING_INVALID' };
    if (pageIndex >= pageCount) return { kind: 'SHAPE_INVALID' };
    if (!Number.isSafeInteger(charCount) || charCount < 0) return { kind: 'SHAPE_INVALID' };
    if (!Number.isSafeInteger(startIndex) || startIndex < 0) return { kind: 'SHAPE_INVALID' };
    if (!Number.isSafeInteger(selectCount) || selectCount < 0) return { kind: 'SHAPE_INVALID' };
    if (startIndex !== base.capabilityParameters.startIndex) return { kind: 'BINDING_INVALID' };
    if (selectCount !== base.capabilityParameters.selectCount) return { kind: 'BINDING_INVALID' };
    const selectionEnd = startIndex + selectCount;
    if (!Number.isSafeInteger(selectionEnd) || selectionEnd > charCount) return { kind: 'SHAPE_INVALID' };
    if (!Number.isSafeInteger(rectCount) || rectCount < 0) return { kind: 'SHAPE_INVALID' };
    if (typeof rectsTruncated !== 'boolean') return { kind: 'SHAPE_INVALID' };
    if (typeof unicodeMapError !== 'boolean') return { kind: 'SHAPE_INVALID' };
    if (typeof text !== 'string') return { kind: 'SHAPE_INVALID' };
    if (text.length !== selectCount) return { kind: 'SHAPE_INVALID' };
    if (rectsTruncated !== (rectCount > maxRects)) return { kind: 'SHAPE_INVALID' };
    if (!Array.isArray(rects) || utilTypes.isProxy(rects)) return { kind: 'SHAPE_INVALID' };
    const expectedRects = rectsTruncated ? maxRects : rectCount;
    if (rects.length !== expectedRects) return { kind: 'SHAPE_INVALID' };
    if (!rects.every(validRect)) return { kind: 'SHAPE_INVALID' };
    return {
      kind: 'ACCEPTED',
      pageIndex,
      pageCount,
      charCount,
      startIndex,
      selectCount,
      rectCount,
      rectsTruncated,
      unicodeMapError,
      text,
      rects: rects.map((rect) => ({
        left: ownData(rect, 'left'),
        top: ownData(rect, 'top'),
        right: ownData(rect, 'right'),
        bottom: ownData(rect, 'bottom'),
      })),
    };
  }

  if (!exactOwnKeys(evidence, REJECTED_SELECT_KEYS)) return { kind: 'SHAPE_INVALID' };
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

function classifyTerminalOutcomeEvidence(base, evidence) {
  if (!exactOwnKeys(evidence, TERMINAL_EVIDENCE_KEYS)) return { kind: 'INVALID' };

  const schema = ownString(evidence, 'schema');
  const terminalOutcome = ownString(evidence, 'terminalOutcome');
  const providerId = ownString(evidence, 'providerId');
  const providerCapabilityVersion = ownString(evidence, 'providerCapabilityVersion');
  const inputExactBytesDigest = ownData(evidence, 'inputExactBytesDigest');
  const byteLength = ownData(evidence, 'byteLength');
  const resourceBudgetRef = ownString(evidence, 'resourceBudgetRef');
  const runtimeEvidenceRef = ownString(evidence, 'runtimeEvidenceRef');
  const partialOutputDiscarded = ownData(evidence, 'partialOutputDiscarded');

  if (schema !== TERMINAL_EVIDENCE_SCHEMA
      || !Object.values(TERMINAL_OUTCOME).includes(terminalOutcome)
      || providerId !== PROVIDER_DESCRIPTOR.providerId
      || providerCapabilityVersion !== PROVIDER_CAPABILITY_VERSION
      || !exactDigest(inputExactBytesDigest, base.identity.inputExactBytesDigest)
      || byteLength !== base.identity.byteLength
      || resourceBudgetRef !== base.resourceBudgetRef
      || !runtimeEvidenceRef
      || partialOutputDiscarded !== true) {
    return { kind: 'INVALID' };
  }

  return { kind: 'VALID', terminalOutcome, runtimeEvidenceRef };
}

function terminalResult(base, terminal) {
  const semantics = {
    [TERMINAL_OUTCOME.CANCELLED]: {
      errorClass: STABLE_ERROR.CANCELLED,
      errorCode: 'cancelled.pdf_text_select_runtime',
      retryCategory: RETRY_CATEGORY.RETRY_MAY_SUCCEED,
    },
    [TERMINAL_OUTCOME.TIMED_OUT]: {
      errorClass: STABLE_ERROR.TIMEOUT,
      errorCode: 'timeout.pdf_text_select_runtime',
      retryCategory: RETRY_CATEGORY.RETRY_REQUIRES_CHANGED_INPUT_OR_STATE,
    },
    [TERMINAL_OUTCOME.RESOURCE_LIMIT_EXCEEDED]: {
      errorClass: STABLE_ERROR.RESOURCE_LIMIT_EXCEEDED,
      errorCode: 'resource_limit_exceeded.pdf_text_select_runtime',
      retryCategory: RETRY_CATEGORY.RETRY_REQUIRES_CHANGED_INPUT_OR_STATE,
    },
  }[terminal.terminalOutcome];

  return deepFreeze({
    ...baseResult(base),
    outcome: terminal.terminalOutcome,
    stableError: stableError(semantics.errorClass, semantics.errorCode, semantics.retryCategory),
    runtimeTerminalEvidence: {
      schema: TERMINAL_EVIDENCE_SCHEMA,
      runtimeEvidenceRef: terminal.runtimeEvidenceRef,
      partialOutputDiscarded: true,
    },
  });
}

function composePdfTextSelectResult({
  bytes,
  request,
  availability,
  textEvidence,
  terminalOutcomeEvidence = null,
}) {
  const base = requestBase(bytes, request);
  if (!base) return invalidRequestFallback(bytes, request, 'invalid_input.pdf_text_select_request');

  if (!exactCapabilityRef(base.capabilityRef)
      || base.providerCapabilityVersion !== PROVIDER_CAPABILITY_VERSION) {
    return failed(base, stableError(
      STABLE_ERROR.UNSUPPORTED_CAPABILITY,
      'unsupported_capability.pdf_text_select_v1',
    ));
  }

  if (base.providerId !== PROVIDER_DESCRIPTOR.providerId) {
    return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.provider_mismatch'));
  }

  if (terminalOutcomeEvidence !== null && terminalOutcomeEvidence !== undefined) {
    if (availability !== AVAILABILITY.AVAILABLE) {
      return failed(base, stableError(
        STABLE_ERROR.INVALID_INPUT,
        'invalid_input.runtime_terminal_availability_conflict',
      ));
    }
    if (textEvidence !== null && textEvidence !== undefined) {
      return failed(base, stableError(
        STABLE_ERROR.INVALID_INPUT,
        'invalid_input.runtime_terminal_evidence_conflict',
      ));
    }
    const terminal = classifyTerminalOutcomeEvidence(base, terminalOutcomeEvidence);
    if (terminal.kind !== 'VALID') {
      return failed(base, stableError(
        STABLE_ERROR.INVALID_INPUT,
        'invalid_input.runtime_terminal_evidence',
      ));
    }
    return terminalResult(base, terminal);
  }

  if (availability !== AVAILABILITY.AVAILABLE) {
    if (availability !== AVAILABILITY.UNAVAILABLE && availability !== AVAILABILITY.UNKNOWN) {
      return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.availability_state'));
    }
    return failed(base, stableError(
      STABLE_ERROR.UNAVAILABLE,
      'unavailable.pdf_text_select_provider',
      RETRY_CATEGORY.RETRY_MAY_SUCCEED,
    ));
  }

  const selection = classifySelectEvidence(base, textEvidence);
  if (selection.kind === 'BINDING_INVALID') {
    return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.text_select_evidence_binding'));
  }
  if (selection.kind === 'SHAPE_INVALID') {
    return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.text_select_evidence_shape'));
  }

  if (selection.kind === 'ACCEPTED') {
    const textDigest = Object.freeze({
      algorithm: 'sha256',
      value: crypto.createHash('sha256').update(selection.text, 'utf8').digest('hex'),
    });
    return deepFreeze({
      ...baseResult(base),
      outcome: OUTCOME.SUCCEEDED,
      observations: {
        pageIndex: selection.pageIndex,
        pageCount: selection.pageCount,
        charCount: selection.charCount,
        startIndex: selection.startIndex,
        selectCount: selection.selectCount,
        rectCount: selection.rectCount,
        rectsTruncated: selection.rectsTruncated,
        unicodeMapError: selection.unicodeMapError,
        textLength: selection.text.length,
        textDigest,
        rects: selection.rects,
        warnings: [],
      },
    });
  }

  if (selection.kind === 'INPUT_REJECTED') {
    return failed(
      base,
      stableError(
        STABLE_ERROR.MALFORMED_UNTRUSTED_DOCUMENT,
        'malformed_untrusted_document.pdfium_format_or_corruption',
        RETRY_CATEGORY.RETRY_REQUIRES_CHANGED_INPUT_OR_STATE,
      ),
      selection.providerDiagnostics,
    );
  }

  return failed(base, stableError(STABLE_ERROR.INVALID_INPUT, 'invalid_input.text_select_evidence_shape'));
}

module.exports = Object.freeze({
  AVAILABILITY,
  CAPABILITY_REF,
  OUTCOME,
  PROVIDER_CAPABILITY_VERSION,
  PROVIDER_DESCRIPTOR,
  RETRY_CATEGORY,
  STABLE_ERROR,
  TERMINAL_EVIDENCE_SCHEMA,
  TERMINAL_OUTCOME,
  composePdfTextSelectResult,
});
