'use strict';

const { exactByteIdentity } = require('../../content-identity-admission');
const { PDFIUM_PROVIDER } = require('./pdfium-structural-evidence');

const CONTRACT = Object.freeze({ capabilityCode: 'PDF_INSPECT_V1', capabilityVersion: 1, effectClass: 'READ_ONLY', providerKind: 'BROWSER', locality: 'LOCAL_ONLY' });
const AVAILABILITY = Object.freeze({ AVAILABLE: 'AVAILABLE', UNAVAILABLE: 'UNAVAILABLE', UNKNOWN: 'UNKNOWN' });
const STATUS = Object.freeze({ SUCCEEDED: 'SUCCEEDED', FAILED: 'FAILED', UNSUPPORTED_CAPABILITY: 'UNSUPPORTED_CAPABILITY', UNAVAILABLE: 'UNAVAILABLE', INVALID_INPUT: 'INVALID_INPUT' });

function isPlainObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Buffer.isBuffer(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
function ownValue(value, key) {
  const d = Object.getOwnPropertyDescriptor(value, key);
  return d && Object.prototype.hasOwnProperty.call(d, 'value') ? d.value : undefined;
}
function sameDigest(a, b) { return isPlainObject(a) && isPlainObject(b) && ownValue(a, 'algorithm') === ownValue(b, 'algorithm') && ownValue(a, 'value') === ownValue(b, 'value'); }
function frozenResult(base, fields) { return Object.freeze({ ...base, ...fields }); }
function invalid(base) { return frozenResult(base, { status: STATUS.INVALID_INPUT, errorClass: 'INVALID_INPUT' }); }

function evaluatePdfInspectV1({ bytes, request, structuralEvidence, availability = AVAILABILITY.UNKNOWN }) {
  if (!Buffer.isBuffer(bytes) || !isPlainObject(request)) {
    return Object.freeze({ status: STATUS.INVALID_INPUT, errorClass: 'INVALID_INPUT' });
  }
  const operationId = ownValue(request, 'operationId');
  const documentId = ownValue(request, 'documentId');
  const inputRevisionId = ownValue(request, 'inputRevisionId');
  const capabilityCode = ownValue(request, 'capabilityCode');
  const capabilityVersion = ownValue(request, 'capabilityVersion');
  const providerId = ownValue(request, 'providerId');
  const providerKind = ownValue(request, 'providerKind');
  const locality = ownValue(request, 'locality');
  const requestDigest = ownValue(request, 'inputExactBytesDigest');
  const requestLength = ownValue(request, 'byteLength');
  const identity = exactByteIdentity(bytes);
  const base = { operationId, documentId, inputRevisionId, capabilityCode, capabilityVersion, providerId, providerKind, locality, effectClass: CONTRACT.effectClass, inputExactBytesDigest: identity.inputExactBytesDigest, byteLength: identity.byteLength };

  if (![operationId, documentId, inputRevisionId].every((v) => typeof v === 'string' && v.length > 0)) return invalid(base);
  if (capabilityCode !== CONTRACT.capabilityCode || capabilityVersion !== CONTRACT.capabilityVersion) {
    return frozenResult(base, { status: STATUS.UNSUPPORTED_CAPABILITY, errorClass: 'UNSUPPORTED_CAPABILITY' });
  }
  if (providerId !== PDFIUM_PROVIDER.providerId || providerKind !== CONTRACT.providerKind || locality !== CONTRACT.locality) return invalid(base);
  if (!sameDigest(requestDigest, identity.inputExactBytesDigest) || requestLength !== identity.byteLength) return invalid(base);
  if (!Object.values(AVAILABILITY).includes(availability)) return invalid(base);
  if (availability !== AVAILABILITY.AVAILABLE) return frozenResult(base, { status: STATUS.UNAVAILABLE, errorClass: 'UNAVAILABLE', availability });
  if (!isPlainObject(structuralEvidence)) return invalid(base);

  const evidenceDigest = ownValue(structuralEvidence, 'inputExactBytesDigest');
  const evidenceLength = ownValue(structuralEvidence, 'byteLength');
  const evidenceProviderId = ownValue(structuralEvidence, 'providerId');
  const state = ownValue(structuralEvidence, 'state');
  if (!sameDigest(evidenceDigest, identity.inputExactBytesDigest) || evidenceLength !== identity.byteLength || evidenceProviderId !== PDFIUM_PROVIDER.providerId) return invalid(base);

  if (state === 'STRUCTURAL_INSPECTION_COMPLETE' && ownValue(structuralEvidence, 'structuralIdentityResult') === 'PDF_STRUCTURE_ACCEPTED') {
    const observation = ownValue(structuralEvidence, 'providerObservation');
    if (!isPlainObject(observation) || ownValue(observation, 'openSucceeded') !== true) return invalid(base);
    const pageCount = ownValue(observation, 'pageCount');
    if (!Number.isSafeInteger(pageCount) || pageCount < 0) return invalid(base);
    return frozenResult(base, { status: STATUS.SUCCEEDED, availability, observation: Object.freeze({ pageCount, encrypted: 'UNKNOWN', hasForms: 'UNKNOWN', hasSignatures: 'UNKNOWN', metadata: 'UNSUPPORTED' }), providerVersionEvidence: ownValue(structuralEvidence, 'providerVersionEvidence') });
  }

  if (state === 'STRUCTURAL_INSPECTION_INPUT_REJECTED') {
    const observation = ownValue(structuralEvidence, 'providerObservation');
    if (!isPlainObject(observation) || ownValue(observation, 'openSucceeded') !== false || ownValue(observation, 'pdfiumLastError') !== 3) return invalid(base);
    return frozenResult(base, { status: STATUS.FAILED, availability, errorClass: 'MALFORMED_UNTRUSTED_DOCUMENT', diagnosticEvidence: Object.freeze({ pdfiumLastError: 3, pdfiumErrorConstant: ownValue(observation, 'pdfiumErrorConstant') }) });
  }

  return invalid(base);
}

module.exports = Object.freeze({ AVAILABILITY, CONTRACT, STATUS, evaluatePdfInspectV1 });
