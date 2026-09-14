'use strict';

const crypto = require('node:crypto');

const SOURCE_KINDS = Object.freeze({
  CANONICAL_DOCUMENT_REVISION: 'CANONICAL_DOCUMENT_REVISION',
  DERIVED_ARTIFACT: 'DERIVED_ARTIFACT',
});

const OPERATION_STATUS = Object.freeze({
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  DEADLINE_EXCEEDED: 'DEADLINE_EXCEEDED',
  RESOURCE_LIMIT_EXCEEDED: 'RESOURCE_LIMIT_EXCEEDED',
  UNSUPPORTED: 'UNSUPPORTED',
  INPUT_REJECTED: 'INPUT_REJECTED',
  PROVIDER_UNAVAILABLE: 'PROVIDER_UNAVAILABLE',
  PARTIAL_NOT_PUBLISHED: 'PARTIAL_NOT_PUBLISHED',
});

const DISPOSITIONS = Object.freeze({
  CONFIRMED_PDF: 'CONFIRMED_PDF',
  AMBIGUOUS_CONTENT_IDENTITY: 'AMBIGUOUS_CONTENT_IDENTITY',
  NOT_PDF: 'NOT_PDF',
  UNSUPPORTED_OR_UNCERTAIN: 'UNSUPPORTED_OR_UNCERTAIN',
});

const COMPLETENESS = Object.freeze({
  COMPLETE: 'COMPLETE_FOR_ADMISSION_POLICY',
  INCOMPLETE: 'INCOMPLETE_REQUIRED_EVIDENCE',
  UNAVAILABLE: 'REQUIRED_EVIDENCE_UNAVAILABLE',
  CONFLICTING: 'CONFLICTING_REQUIRED_EVIDENCE',
  INVALIDATED: 'INPUT_IDENTITY_INVALIDATED',
});

const CONFLICT_IMPACTS = Object.freeze({
  NONE: 'NONE',
  AMBIGUOUS: DISPOSITIONS.AMBIGUOUS_CONTENT_IDENTITY,
  INVALIDATED: COMPLETENESS.INVALIDATED,
});

const DETERMINISTIC_RESULTS = new Set(['MATCH', 'NO_MATCH', 'UNAVAILABLE', 'ERROR']);
const CLASSIFIER_STATES = new Set([
  'CLASSIFIER_NOT_CONFIGURED',
  'CLASSIFIER_UNAVAILABLE',
  'CLASSIFIER_EXECUTION_FAILED',
  'CLASSIFIER_UNSUPPORTED_INPUT',
  'CLASSIFIER_LOW_CONFIDENCE',
  'CLASSIFIER_RESULT_AVAILABLE',
]);
const STRUCTURAL_STATES = new Set([
  'STRUCTURAL_INSPECTION_NOT_CONFIGURED',
  'STRUCTURAL_INSPECTION_UNAVAILABLE',
  'STRUCTURAL_INSPECTION_EXECUTION_FAILED',
  'STRUCTURAL_INSPECTION_INPUT_REJECTED',
  'STRUCTURAL_INSPECTION_PASSWORD_REQUIRED',
  'STRUCTURAL_INSPECTION_ENCRYPTION_UNSUPPORTED',
  'STRUCTURAL_INSPECTION_RESOURCE_LIMIT_EXCEEDED',
  'STRUCTURAL_INSPECTION_DEADLINE_EXCEEDED',
  'STRUCTURAL_INSPECTION_CANCELLED',
  'STRUCTURAL_INSPECTION_COMPLETE',
]);
const STRUCTURAL_RESULTS = new Set([
  'PDF_STRUCTURE_ACCEPTED',
  'PDF_STRUCTURE_REJECTED',
  'PDF_STRUCTURE_UNSUPPORTED_OR_UNCERTAIN',
]);
const CONFLICT_CLASSES = new Set([
  'DECLARED_VS_DETERMINISTIC_MISMATCH',
  'DECLARED_VS_CLASSIFIER_MISMATCH',
  'DECLARED_VS_STRUCTURAL_MISMATCH',
  'DETERMINISTIC_VS_CLASSIFIER_MISMATCH',
  'DETERMINISTIC_VS_STRUCTURAL_MISMATCH',
  'CLASSIFIER_VS_STRUCTURAL_MISMATCH',
  'POLYGLOT_OR_MIXED_CONTENT_INDICATOR',
  'INPUT_IDENTITY_CHANGED',
  'DERIVED_ARTIFACT_IDENTITY_MISMATCH',
]);
const IDENTITY_CONFLICT_CLASSES = new Set([
  'INPUT_IDENTITY_CHANGED',
  'DERIVED_ARTIFACT_IDENTITY_MISMATCH',
]);
const POLICY_REJECTION_DISPOSITIONS = new Set([
  DISPOSITIONS.NOT_PDF,
  DISPOSITIONS.UNSUPPORTED_OR_UNCERTAIN,
]);

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value) && !Buffer.isBuffer(value);
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

function deepCopy(value) {
  if (Array.isArray(value)) return value.map(deepCopy);
  if (isPlainObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, deepCopy(item)]));
  }
  return value;
}

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const item of Object.values(value)) deepFreeze(item);
  return value;
}

function frozenCopy(value) {
  return deepFreeze(deepCopy(value));
}

function exactByteIdentity(bytes) {
  if (!Buffer.isBuffer(bytes)) throw new TypeError('bytes must be a Buffer');
  return Object.freeze({
    inputExactBytesDigest: Object.freeze({
      algorithm: 'sha256',
      value: crypto.createHash('sha256').update(bytes).digest('hex'),
    }),
    byteLength: bytes.length,
  });
}

function validDigest(digest) {
  return isPlainObject(digest)
    && digest.algorithm === 'sha256'
    && typeof digest.value === 'string'
    && /^[0-9a-f]{64}$/.test(digest.value);
}

function validateSourceBinding(binding) {
  if (!isPlainObject(binding) || !Object.values(SOURCE_KINDS).includes(binding.sourceKind)) return false;
  if (!validDigest(binding.inputExactBytesDigest)) return false;
  if (!Number.isSafeInteger(binding.byteLength) || binding.byteLength < 0) return false;
  if (binding.sourceKind === SOURCE_KINDS.CANONICAL_DOCUMENT_REVISION) {
    return nonEmptyString(binding.documentId)
      && nonEmptyString(binding.inputRevisionId)
      && binding.derivedArtifactRef === undefined
      && binding.parentOperationRef === undefined;
  }
  return nonEmptyString(binding.derivedArtifactRef)
    && nonEmptyString(binding.parentOperationRef)
    && binding.documentId === undefined
    && binding.inputRevisionId === undefined;
}

function createContentInputBinding(bytes, source) {
  const identity = exactByteIdentity(bytes);
  const candidate = { ...deepCopy(source), ...identity };
  if (!validateSourceBinding(candidate)) {
    throw new TypeError('source must define one valid canonical-revision or derived-artifact binding');
  }
  return deepFreeze(candidate);
}

function validatePolicy(policy) {
  return isPlainObject(policy)
    && nonEmptyString(policy.policyId)
    && nonEmptyString(policy.policyVersion)
    && policy.structuralEvidenceRequired === true
    && policy.classifierRequired === false
    && policy.deterministicObservationsRequired === false
    && POLICY_REJECTION_DISPOSITIONS.has(policy.structuralRejectionDisposition);
}

function bindingState(expected, evidence) {
  if (!isPlainObject(evidence)
      || !validDigest(evidence.inputExactBytesDigest)
      || !Number.isSafeInteger(evidence.byteLength)
      || evidence.byteLength < 0) {
    return 'INVALID';
  }
  if (evidence.inputExactBytesDigest.algorithm !== expected.inputExactBytesDigest.algorithm
      || evidence.inputExactBytesDigest.value !== expected.inputExactBytesDigest.value
      || evidence.byteLength !== expected.byteLength) {
    return 'MISMATCH';
  }
  return 'MATCH';
}

function validateDeterministicObservation(item) {
  return isPlainObject(item)
    && nonEmptyString(item.observationRuleId)
    && nonEmptyString(item.observationRuleVersion)
    && DETERMINISTIC_RESULTS.has(item.result);
}

function validateClassifierEvidence(item) {
  return isPlainObject(item) && CLASSIFIER_STATES.has(item.state);
}

function validateStructuralEvidence(item) {
  if (!isPlainObject(item) || !STRUCTURAL_STATES.has(item.state)) return false;
  const hasResult = Object.prototype.hasOwnProperty.call(item, 'structuralIdentityResult');
  if (item.state === 'STRUCTURAL_INSPECTION_COMPLETE') {
    return hasResult && STRUCTURAL_RESULTS.has(item.structuralIdentityResult);
  }
  return !hasResult;
}

function validateConflict(item) {
  if (!isPlainObject(item)
      || !CONFLICT_CLASSES.has(item.conflictClass)
      || !Object.values(CONFLICT_IMPACTS).includes(item.dispositionImpact)
      || !Array.isArray(item.evidenceRefs)
      || item.evidenceRefs.some((ref) => !nonEmptyString(ref))) {
    return false;
  }
  const identityConflict = IDENTITY_CONFLICT_CLASSES.has(item.conflictClass);
  if (identityConflict && item.dispositionImpact !== CONFLICT_IMPACTS.INVALIDATED) return false;
  if (!identityConflict && item.dispositionImpact === CONFLICT_IMPACTS.INVALIDATED) return false;
  if (item.conflictClass === 'POLYGLOT_OR_MIXED_CONTENT_INDICATOR'
      && item.dispositionImpact !== CONFLICT_IMPACTS.AMBIGUOUS) return false;
  return true;
}

function failureResult(base, operationStatus, evidenceCompleteness, failureClass) {
  const result = { ...base, operationStatus, evidenceCompleteness };
  if (failureClass) result.failureClass = failureClass;
  return deepFreeze(result);
}

function structuralFailure(state) {
  switch (state) {
    case undefined:
    case 'STRUCTURAL_INSPECTION_NOT_CONFIGURED':
    case 'STRUCTURAL_INSPECTION_UNAVAILABLE':
      return [OPERATION_STATUS.PROVIDER_UNAVAILABLE, COMPLETENESS.UNAVAILABLE, 'PDF_ADMISSION_REQUIRED_EVIDENCE_UNAVAILABLE'];
    case 'STRUCTURAL_INSPECTION_EXECUTION_FAILED':
      return [OPERATION_STATUS.FAILED, COMPLETENESS.UNAVAILABLE, 'PDF_ADMISSION_REQUIRED_EVIDENCE_UNAVAILABLE'];
    case 'STRUCTURAL_INSPECTION_INPUT_REJECTED':
    case 'STRUCTURAL_INSPECTION_PASSWORD_REQUIRED':
      return [OPERATION_STATUS.INPUT_REJECTED, COMPLETENESS.INCOMPLETE, undefined];
    case 'STRUCTURAL_INSPECTION_ENCRYPTION_UNSUPPORTED':
      return [OPERATION_STATUS.UNSUPPORTED, COMPLETENESS.INCOMPLETE, undefined];
    case 'STRUCTURAL_INSPECTION_RESOURCE_LIMIT_EXCEEDED':
      return [OPERATION_STATUS.RESOURCE_LIMIT_EXCEEDED, COMPLETENESS.INCOMPLETE, undefined];
    case 'STRUCTURAL_INSPECTION_DEADLINE_EXCEEDED':
      return [OPERATION_STATUS.DEADLINE_EXCEEDED, COMPLETENESS.INCOMPLETE, undefined];
    case 'STRUCTURAL_INSPECTION_CANCELLED':
      return [OPERATION_STATUS.CANCELLED, COMPLETENESS.INCOMPLETE, undefined];
    default:
      return [OPERATION_STATUS.FAILED, COMPLETENESS.INCOMPLETE, undefined];
  }
}

function dispositionFrom(structuralResult, policy) {
  switch (structuralResult) {
    case 'PDF_STRUCTURE_ACCEPTED':
      return DISPOSITIONS.CONFIRMED_PDF;
    case 'PDF_STRUCTURE_REJECTED':
      return policy.structuralRejectionDisposition;
    case 'PDF_STRUCTURE_UNSUPPORTED_OR_UNCERTAIN':
      return DISPOSITIONS.UNSUPPORTED_OR_UNCERTAIN;
    default:
      throw new TypeError('unreachable structural result');
  }
}

function evaluateAdmission(input) {
  if (!isPlainObject(input) || !Buffer.isBuffer(input.bytes)) {
    throw new TypeError('evaluateAdmission requires an object containing Buffer bytes');
  }

  const deterministicObservations = input.deterministicObservations === undefined
    ? []
    : input.deterministicObservations;
  const conflicts = input.conflicts === undefined ? [] : input.conflicts;
  const classifierEvidence = input.classifierEvidence === undefined ? null : input.classifierEvidence;
  const structuralEvidence = input.structuralEvidence === undefined ? null : input.structuralEvidence;
  const declaredIdentity = input.declaredIdentity === undefined ? {} : input.declaredIdentity;
  const inputBinding = isPlainObject(input.inputBinding) ? frozenCopy(input.inputBinding) : input.inputBinding;
  const policy = isPlainObject(input.policy) ? frozenCopy(input.policy) : input.policy;
  const observedInputIdentity = exactByteIdentity(input.bytes);

  const base = {
    policy: isPlainObject(policy) ? policy : undefined,
    inputBinding: isPlainObject(inputBinding) ? inputBinding : undefined,
    observedInputIdentity,
    declaredIdentity: isPlainObject(declaredIdentity) ? frozenCopy(declaredIdentity) : declaredIdentity,
    deterministicObservations: Array.isArray(deterministicObservations) ? frozenCopy(deterministicObservations) : deterministicObservations,
    classifierEvidence: isPlainObject(classifierEvidence) ? frozenCopy(classifierEvidence) : classifierEvidence,
    structuralInspectionEvidence: isPlainObject(structuralEvidence) ? frozenCopy(structuralEvidence) : structuralEvidence,
    conflicts: Array.isArray(conflicts) ? frozenCopy(conflicts) : conflicts,
  };

  if (!Array.isArray(deterministicObservations)
      || !Array.isArray(conflicts)
      || !isPlainObject(declaredIdentity)
      || (classifierEvidence !== null && !isPlainObject(classifierEvidence))
      || (structuralEvidence !== null && !isPlainObject(structuralEvidence))) {
    return failureResult(base, OPERATION_STATUS.FAILED, COMPLETENESS.INCOMPLETE, 'PDF_ADMISSION_INVALID_EVIDENCE');
  }

  if (!validatePolicy(policy)) {
    return failureResult(base, OPERATION_STATUS.FAILED, COMPLETENESS.INCOMPLETE, 'PDF_ADMISSION_INVALID_POLICY');
  }
  if (!validateSourceBinding(inputBinding)) {
    return failureResult(base, OPERATION_STATUS.FAILED, COMPLETENESS.INCOMPLETE, 'PDF_ADMISSION_INVALID_INPUT_BINDING');
  }
  if (bindingState(observedInputIdentity, inputBinding) !== 'MATCH') {
    return failureResult(base, OPERATION_STATUS.FAILED, COMPLETENESS.INVALIDATED, 'PDF_INPUT_IDENTITY_CHANGED_DURING_ADMISSION');
  }

  if (!deterministicObservations.every(validateDeterministicObservation)
      || (classifierEvidence && !validateClassifierEvidence(classifierEvidence))
      || (structuralEvidence && !validateStructuralEvidence(structuralEvidence))
      || !conflicts.every(validateConflict)) {
    return failureResult(base, OPERATION_STATUS.FAILED, COMPLETENESS.INCOMPLETE, 'PDF_ADMISSION_INVALID_EVIDENCE');
  }

  const evidenceItems = [
    ...deterministicObservations,
    classifierEvidence,
    structuralEvidence,
    ...conflicts,
  ].filter(Boolean);
  const states = evidenceItems.map((item) => bindingState(observedInputIdentity, item));
  if (states.includes('INVALID')) {
    return failureResult(base, OPERATION_STATUS.FAILED, COMPLETENESS.INCOMPLETE, 'PDF_ADMISSION_INVALID_EVIDENCE_BINDING');
  }
  if (states.includes('MISMATCH')) {
    return failureResult(base, OPERATION_STATUS.FAILED, COMPLETENESS.INVALIDATED, 'PDF_INPUT_IDENTITY_CHANGED_DURING_ADMISSION');
  }

  if (conflicts.some((item) => item.dispositionImpact === CONFLICT_IMPACTS.INVALIDATED)) {
    return failureResult(base, OPERATION_STATUS.FAILED, COMPLETENESS.INVALIDATED, 'PDF_INPUT_IDENTITY_CHANGED_DURING_ADMISSION');
  }

  if (!structuralEvidence || structuralEvidence.state !== 'STRUCTURAL_INSPECTION_COMPLETE') {
    const [status, completeness, failureClass] = structuralFailure(structuralEvidence?.state);
    return failureResult(base, status, completeness, failureClass);
  }

  const materialConflict = conflicts.some((item) => item.dispositionImpact === CONFLICT_IMPACTS.AMBIGUOUS);
  const result = {
    ...base,
    operationStatus: OPERATION_STATUS.SUCCEEDED,
    evidenceCompleteness: materialConflict ? COMPLETENESS.CONFLICTING : COMPLETENESS.COMPLETE,
    admissionDisposition: materialConflict
      ? DISPOSITIONS.AMBIGUOUS_CONTENT_IDENTITY
      : dispositionFrom(structuralEvidence.structuralIdentityResult, policy),
  };
  return deepFreeze(result);
}

module.exports = Object.freeze({
  CLASSIFIER_STATES: Object.freeze([...CLASSIFIER_STATES]),
  COMPLETENESS,
  CONFLICT_CLASSES: Object.freeze([...CONFLICT_CLASSES]),
  CONFLICT_IMPACTS,
  DETERMINISTIC_RESULTS: Object.freeze([...DETERMINISTIC_RESULTS]),
  DISPOSITIONS,
  OPERATION_STATUS,
  SOURCE_KINDS,
  STRUCTURAL_RESULTS: Object.freeze([...STRUCTURAL_RESULTS]),
  STRUCTURAL_STATES: Object.freeze([...STRUCTURAL_STATES]),
  createContentInputBinding,
  evaluateAdmission,
  exactByteIdentity,
});
