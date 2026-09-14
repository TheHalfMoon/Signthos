'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { exactByteIdentity } = require('../src/content-identity-admission');
const { mapPdfiumStructuralObservation, PDFIUM_PROVIDER } = require('../src/pdf/browser/pdfium-structural-evidence');
const { AVAILABILITY, STATUS, evaluatePdfInspectV1 } = require('../src/pdf/browser/pdf-inspect-provider');

const bytes = Buffer.from('%PDF-1.7\nsemantic-only-test\n%%EOF\n', 'utf8');
const identity = exactByteIdentity(bytes);
function request(overrides = {}) {
  return { operationId: 'op:1', documentId: 'doc:1', inputRevisionId: 'rev:1', capabilityCode: 'PDF_INSPECT_V1', capabilityVersion: 1, providerId: PDFIUM_PROVIDER.providerId, providerKind: 'BROWSER', locality: 'LOCAL_ONLY', inputExactBytesDigest: identity.inputExactBytesDigest, byteLength: identity.byteLength, ...overrides };
}
function successEvidence(input = bytes) { return mapPdfiumStructuralObservation(input, { openSucceeded: true, pageCount: 3 }); }
function rejectedEvidence(input = bytes) { return mapPdfiumStructuralObservation(input, { openSucceeded: false, pdfiumLastError: 3 }); }

test('accepted structural evidence maps to bounded read-only inspect success', () => {
  const req = request(); const evidence = successEvidence(); const beforeReq = JSON.stringify(req); const beforeEvidence = JSON.stringify(evidence); const beforeBytes = Buffer.from(bytes);
  const result = evaluatePdfInspectV1({ bytes, request: req, structuralEvidence: evidence, availability: AVAILABILITY.AVAILABLE });
  assert.equal(result.status, STATUS.SUCCEEDED); assert.equal(result.observation.pageCount, 3); assert.equal(result.observation.encrypted, 'UNKNOWN'); assert.equal(result.observation.metadata, 'UNSUPPORTED');
  assert.equal(result.operationId, 'op:1'); assert.equal(result.documentId, 'doc:1'); assert.equal(result.inputRevisionId, 'rev:1'); assert.deepEqual(result.inputExactBytesDigest, identity.inputExactBytesDigest);
  assert.equal(JSON.stringify(req), beforeReq); assert.equal(JSON.stringify(evidence), beforeEvidence); assert.deepEqual(bytes, beforeBytes); assert.equal(Object.hasOwn(result, 'outputRevisionId'), false);
});

test('qualified format rejection maps to malformed document failure without NOT_PDF assertion', () => {
  const result = evaluatePdfInspectV1({ bytes, request: request(), structuralEvidence: rejectedEvidence(), availability: AVAILABILITY.AVAILABLE });
  assert.equal(result.status, STATUS.FAILED); assert.equal(result.errorClass, 'MALFORMED_UNTRUSTED_DOCUMENT'); assert.equal(result.diagnosticEvidence.pdfiumLastError, 3); assert.equal(Object.hasOwn(result, 'structuralIdentityResult'), false);
});

test('unsupported capability/version fail closed', () => {
  for (const req of [request({ capabilityCode: 'PDF_TEXT_SEARCH_V1' }), request({ capabilityVersion: 2 })]) {
    const result = evaluatePdfInspectV1({ bytes, request: req, structuralEvidence: successEvidence(), availability: AVAILABILITY.AVAILABLE });
    assert.equal(result.status, STATUS.UNSUPPORTED_CAPABILITY); assert.equal(result.errorClass, 'UNSUPPORTED_CAPABILITY');
  }
});

test('unavailable or unknown runtime never falls back to success', () => {
  for (const availability of [AVAILABILITY.UNAVAILABLE, AVAILABILITY.UNKNOWN]) {
    const result = evaluatePdfInspectV1({ bytes, request: request(), structuralEvidence: successEvidence(), availability });
    assert.equal(result.status, STATUS.UNAVAILABLE); assert.equal(result.errorClass, 'UNAVAILABLE');
  }
});

test('request identity and provider contract mismatches fail closed', () => {
  const cases = [request({ inputExactBytesDigest: 'sha256:bad' }), request({ byteLength: 1 }), request({ providerId: 'other' }), request({ providerKind: 'SERVER' }), request({ locality: 'NETWORK_ALLOWED' }), request({ operationId: '' })];
  for (const req of cases) assert.equal(evaluatePdfInspectV1({ bytes, request: req, structuralEvidence: successEvidence(), availability: AVAILABILITY.AVAILABLE }).status, STATUS.INVALID_INPUT);
});

test('structural evidence for different bytes cannot publish success', () => {
  const other = Buffer.from('%PDF-1.7\nother\n%%EOF\n');
  const result = evaluatePdfInspectV1({ bytes, request: request(), structuralEvidence: successEvidence(other), availability: AVAILABILITY.AVAILABLE });
  assert.equal(result.status, STATUS.INVALID_INPUT); assert.equal(Object.hasOwn(result, 'observation'), false);
});

test('malformed evidence and accessor-backed request fields fail closed without invoking getters', () => {
  assert.equal(evaluatePdfInspectV1({ bytes, request: request(), structuralEvidence: {}, availability: AVAILABILITY.AVAILABLE }).status, STATUS.INVALID_INPUT);
  let calls = 0; const req = request(); Object.defineProperty(req, 'operationId', { enumerable: true, get() { calls += 1; return 'op:evil'; } });
  const result = evaluatePdfInspectV1({ bytes, request: req, structuralEvidence: successEvidence(), availability: AVAILABILITY.AVAILABLE });
  assert.equal(result.status, STATUS.INVALID_INPUT); assert.equal(calls, 0);
});
