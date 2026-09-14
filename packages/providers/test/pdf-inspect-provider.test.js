'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { exactByteIdentity } = require('../src/content-identity-admission');
const {
  PDFIUM_PROVIDER,
  mapPdfiumStructuralObservation,
} = require('../src/pdf/browser/pdfium-structural-evidence');
const {
  AVAILABILITY,
  CAPABILITY_REF,
  OUTCOME,
  PROVIDER_CAPABILITY_VERSION,
  PROVIDER_DESCRIPTOR,
  STABLE_ERROR,
  TERMINAL_EVIDENCE_SCHEMA,
  TERMINAL_OUTCOME,
  UNSUPPORTED_INSPECT_OBSERVATIONS,
  composePdfInspectResult,
} = require('../src/pdf/browser/pdf-inspect-provider');

const root = path.resolve(__dirname, '../../..');
const fixtureRoot = path.join(root, 'specs/004-local-pdf-core/fixtures/admission');
const manifest = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'manifest.json'), 'utf8'));

function record(id) {
  const value = manifest.records.find((item) => item.fixtureId === id);
  assert.ok(value, `missing fixture ${id}`);
  return value;
}

function bytesFor(item) {
  return fs.readFileSync(path.join(root, item.repositoryPath));
}

function requestFor(item, bytes = bytesFor(item), overrides = {}) {
  const identity = exactByteIdentity(bytes);
  return {
    operationId: `inspect:${item.fixtureId}`,
    capabilityRef: { ...CAPABILITY_REF },
    documentId: `document:${item.fixtureId}`,
    inputRevisionId: `revision:${item.fixtureId}`,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    inputByteLength: identity.byteLength,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    resourceBudgetRef: 'budget:pdf-inspect-v1:test',
    capabilityParameters: {},
    ...overrides,
  };
}

function structuralFor(item, raw, bytes = bytesFor(item)) {
  return mapPdfiumStructuralObservation(bytes, raw);
}

function inspect(item, raw, overrides = {}) {
  const bytes = overrides.bytes ?? bytesFor(item);
  const structuralEvidence = overrides.structuralEvidence ?? structuralFor(item, raw, bytes);
  return composePdfInspectResult({
    bytes,
    request: overrides.request ?? requestFor(item, bytes),
    availability: overrides.availability ?? AVAILABILITY.AVAILABLE,
    structuralEvidence,
  });
}

function assertExactBinding(item, result) {
  assert.deepEqual(result.inputExactBytesDigest, item.exactBytesDigest);
  assert.equal(result.inputByteLength, item.byteLength);
}

function terminalEvidenceFor(item, bytes = bytesFor(item), request = requestFor(item, bytes), overrides = {}) {
  const identity = exactByteIdentity(bytes);
  return {
    schema: TERMINAL_EVIDENCE_SCHEMA,
    terminalOutcome: TERMINAL_OUTCOME.CANCELLED,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    byteLength: identity.byteLength,
    resourceBudgetRef: request.resourceBudgetRef,
    runtimeEvidenceRef: `runtime-evidence:${item.fixtureId}`,
    partialOutputDiscarded: true,
    ...overrides,
  };
}

test('provider descriptor freezes the exact browser-local inspect capability', () => {
  assert.equal(PROVIDER_DESCRIPTOR.providerId, 'signthos.pdf.browser.embedpdf-v2.15.0-pdfium');
  assert.equal(PROVIDER_DESCRIPTOR.providerKind, 'BROWSER');
  assert.equal(PROVIDER_DESCRIPTOR.locality, 'LOCAL_ONLY');
  assert.equal(PROVIDER_DESCRIPTOR.providerCandidateId, 'embedpdf-v2.15.0-pdfium-browser');
  assert.equal(PROVIDER_DESCRIPTOR.capabilityContractVersion, 'signthos.provider-capability.v1');
  assert.deepEqual(PROVIDER_DESCRIPTOR.declaredCapabilities, [CAPABILITY_REF]);
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.packageIdentity, '@embedpdf/pdfium@2.15.0');
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.version, '2.15.0');
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.embedpdfSourceCommit, PDFIUM_PROVIDER.embedpdfSourceCommit);
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.pdfiumSubmoduleRevision, PDFIUM_PROVIDER.pdfiumSubmoduleRevision);
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.wasmSha256, PDFIUM_PROVIDER.wasmSha256);
  assert.equal(PROVIDER_CAPABILITY_VERSION, 'signthos.pdf.inspect.v1');
  assert.ok(Object.isFrozen(PROVIDER_DESCRIPTOR));
  assert.ok(Object.isFrozen(PROVIDER_DESCRIPTOR.declaredCapabilities));
});

for (const id of [
  'admission-seed-ordinary-minimal-v1',
  'admission-seed-trailing-inert-bytes-v1',
]) {
  test(`${id} composes accepted structural evidence into bounded PDF_INSPECT_V1 success`, () => {
    const item = record(id);
    const result = inspect(item, { openSucceeded: true, pageCount: 1 });
    assert.equal(result.outcome, OUTCOME.SUCCEEDED);
    assert.equal(result.capabilityRef.capabilityCode, 'PDF_INSPECT_V1');
    assert.equal(result.capabilityRef.capabilityVersion, '1');
    assert.equal(result.effectClass, 'READ_ONLY');
    assert.equal(result.locality, 'LOCAL_ONLY');
    assert.equal(result.providerKind, 'BROWSER');
    assert.equal(result.observations.pageCount, 1);
    assert.deepEqual(result.observations.warnings, []);
    assert.deepEqual(result.observations.unsupportedObservations, UNSUPPORTED_INSPECT_OBSERVATIONS);
    assert.equal(result.newCanonicalRevisionCreated, false);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'stableError'), false);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'exactOutputRevisionIds'), false);
    assertExactBinding(item, result);
  });
}

for (const id of [
  'admission-seed-declared-pdf-nonpdf-v1',
  'admission-seed-truncated-pdf-like-v1',
]) {
  test(`${id} normalizes qualified PDFium format rejection to malformed-untrusted-document failure`, () => {
    const item = record(id);
    const result = inspect(item, { openSucceeded: false, pdfiumLastError: 3 });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.MALFORMED_UNTRUSTED_DOCUMENT);
    assert.equal(result.stableError.errorCode, 'malformed_untrusted_document.pdfium_format_or_corruption');
    assert.equal(result.stableError.retryCategory, 'RETRY_REQUIRES_CHANGED_INPUT_OR_STATE');
    assert.deepEqual(result.providerDiagnostics, {
      providerErrorCode: 3,
      providerErrorConstant: 'FPDF_ERR_FORMAT',
      providerErrorMeaning: 'File not in PDF format or corrupted',
    });
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
    assert.equal(result.newCanonicalRevisionCreated, false);
    assertExactBinding(item, result);
  });
}

test('capability code or semantic version mismatch fails as unsupported capability', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes);
  for (const capabilityRef of [
    { capabilityCode: 'PDF_PAGE_RENDER_V1', capabilityVersion: '1' },
    { capabilityCode: 'PDF_INSPECT_V1', capabilityVersion: '2' },
  ]) {
    const result = composePdfInspectResult({
      bytes,
      request: requestFor(item, bytes, { capabilityRef }),
      availability: AVAILABILITY.AVAILABLE,
      structuralEvidence: evidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.UNSUPPORTED_CAPABILITY);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('provider capability-version mismatch is unsupported but provider identity mismatch is invalid input', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes);
  const unsupported = composePdfInspectResult({
    bytes,
    request: requestFor(item, bytes, { providerCapabilityVersion: 'signthos.pdf.inspect.v2' }),
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: evidence,
  });
  assert.equal(unsupported.stableError.errorClass, STABLE_ERROR.UNSUPPORTED_CAPABILITY);

  const wrongProvider = composePdfInspectResult({
    bytes,
    request: requestFor(item, bytes, { providerId: 'provider:other' }),
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: evidence,
  });
  assert.equal(wrongProvider.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(wrongProvider.stableError.errorCode, 'invalid_input.provider_mismatch');
});

test('UNAVAILABLE and UNKNOWN availability fail closed without structural publication or network fallback', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  for (const availability of [AVAILABILITY.UNAVAILABLE, AVAILABILITY.UNKNOWN]) {
    const result = composePdfInspectResult({
      bytes,
      request: requestFor(item, bytes),
      availability,
      structuralEvidence: null,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.UNAVAILABLE);
    assert.equal(result.stableError.retryCategory, 'RETRY_MAY_SUCCEED');
    assert.equal(result.locality, 'LOCAL_ONLY');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('unknown availability value is invalid input rather than silently available', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = composePdfInspectResult({
    bytes: bytesFor(item),
    request: requestFor(item),
    availability: 'AVAILABLE_WITH_FALLBACK',
    structuralEvidence: null,
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.availability_state');
});

test('request exact-byte digest or length mismatch fails before provider success', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes);
  const badDigest = requestFor(item, bytes, {
    inputExactBytesDigest: { algorithm: 'sha256', value: '0'.repeat(64) },
  });
  const badLength = requestFor(item, bytes, { inputByteLength: bytes.length + 1 });
  for (const request of [badDigest, badLength]) {
    const result = composePdfInspectResult({ bytes, request, availability: AVAILABILITY.AVAILABLE, structuralEvidence: evidence });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('structural evidence bound to different bytes fails closed', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const other = record('admission-seed-trailing-inert-bytes-v1');
  const bytes = bytesFor(item);
  const wrongEvidence = structuralFor(other, { openSucceeded: true, pageCount: 1 });
  const result = composePdfInspectResult({
    bytes,
    request: requestFor(item, bytes),
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: wrongEvidence,
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.structural_evidence_binding');
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
});

test('missing or malformed structural evidence fails closed when provider is available', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  for (const structuralEvidence of [null, {}, { state: 'STRUCTURAL_INSPECTION_COMPLETE' }]) {
    const result = composePdfInspectResult({
      bytes,
      request: requestFor(item, bytes),
      availability: AVAILABILITY.AVAILABLE,
      structuralEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('structural provider identity or capability evidence mismatch fails closed', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes);
  for (const override of [
    { providerId: '@embedpdf/pdfium-other' },
    { providerCapabilityVersion: 'signthos.pdfium.structural-open.v2' },
    { providerVersionEvidence: { ...evidence.providerVersionEvidence, version: '2.15.1' } },
  ]) {
    const changed = { ...evidence, ...override };
    const result = composePdfInspectResult({
      bytes,
      request: requestFor(item, bytes),
      availability: AVAILABILITY.AVAILABLE,
      structuralEvidence: changed,
    });
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.structural_evidence_binding');
  }
});

test('contradictory accepted structural observation fails closed', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes);
  for (const providerObservation of [
    { openSucceeded: false, pageCount: 1 },
    { openSucceeded: true, pageCount: -1 },
    { openSucceeded: true, pageCount: 1.5 },
  ]) {
    const changed = { ...evidence, providerObservation };
    const result = composePdfInspectResult({
      bytes,
      request: requestFor(item, bytes),
      availability: AVAILABILITY.AVAILABLE,
      structuralEvidence: changed,
    });
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.structural_evidence_shape');
  }
});

test('contradictory input-rejected provider observation fails closed', () => {
  const item = record('admission-seed-truncated-pdf-like-v1');
  const bytes = bytesFor(item);
  const evidence = structuralFor(item, { openSucceeded: false, pdfiumLastError: 3 }, bytes);
  for (const providerObservation of [
    { openSucceeded: true, pdfiumLastError: 3, pdfiumErrorConstant: 'FPDF_ERR_FORMAT' },
    { openSucceeded: false, pdfiumLastError: 4, pdfiumErrorConstant: 'FPDF_ERR_FORMAT' },
    { openSucceeded: false, pdfiumLastError: 3, pdfiumErrorConstant: 'OTHER' },
  ]) {
    const changed = { ...evidence, providerObservation };
    const result = composePdfInspectResult({
      bytes,
      request: requestFor(item, bytes),
      availability: AVAILABILITY.AVAILABLE,
      structuralEvidence: changed,
    });
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  }
});

test('request custom prototypes and accessor fields fail closed without invoking getters', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes);
  let getterCalls = 0;

  const custom = Object.create({ operationId: 'inherited' });
  Object.assign(custom, requestFor(item, bytes));
  assert.equal(composePdfInspectResult({ bytes, request: custom, availability: AVAILABILITY.AVAILABLE, structuralEvidence: evidence }).stableError.errorClass, STABLE_ERROR.INVALID_INPUT);

  const accessor = requestFor(item, bytes);
  Object.defineProperty(accessor, 'operationId', {
    configurable: true,
    enumerable: true,
    get() { getterCalls += 1; return 'getter-operation'; },
  });
  const result = composePdfInspectResult({ bytes, request: accessor, availability: AVAILABILITY.AVAILABLE, structuralEvidence: evidence });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(getterCalls, 0);
});

test('digest and capability nested accessors fail closed without getter execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes);
  let getterCalls = 0;

  const digest = {};
  Object.defineProperty(digest, 'algorithm', { enumerable: true, get() { getterCalls += 1; return 'sha256'; } });
  digest.value = item.exactBytesDigest.value;
  const digestResult = composePdfInspectResult({
    bytes,
    request: requestFor(item, bytes, { inputExactBytesDigest: digest }),
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: evidence,
  });
  assert.equal(digestResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);

  const capabilityRef = {};
  Object.defineProperty(capabilityRef, 'capabilityCode', { enumerable: true, get() { getterCalls += 1; return 'PDF_INSPECT_V1'; } });
  capabilityRef.capabilityVersion = '1';
  const capabilityResult = composePdfInspectResult({
    bytes,
    request: requestFor(item, bytes, { capabilityRef }),
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: evidence,
  });
  assert.equal(capabilityResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(getterCalls, 0);
});

test('non-empty inspect capability parameters fail closed rather than creating a vendor option bag', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = composePdfInspectResult({
    bytes: bytesFor(item),
    request: requestFor(item, undefined, { capabilityParameters: { vendorMode: 'repair' } }),
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: null,
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
});

test('semantic composition is read-only with respect to bytes, request, and structural evidence', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const bytesBefore = Buffer.from(bytes);
  const request = requestFor(item, bytes);
  const requestBefore = JSON.stringify(request);
  const requestCapabilityWasFrozen = Object.isFrozen(request.capabilityRef);
  const requestDigestWasFrozen = Object.isFrozen(request.inputExactBytesDigest);
  const evidence = structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes);
  const evidenceBefore = JSON.stringify(evidence);
  const result = composePdfInspectResult({ bytes, request, availability: AVAILABILITY.AVAILABLE, structuralEvidence: evidence });
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.deepEqual(bytes, bytesBefore);
  assert.equal(JSON.stringify(request), requestBefore);
  assert.equal(Object.isFrozen(request.capabilityRef), requestCapabilityWasFrozen);
  assert.equal(Object.isFrozen(request.inputExactBytesDigest), requestDigestWasFrozen);
  assert.equal(JSON.stringify(evidence), evidenceBefore);
});

test('successful result remains deeply frozen and contains no signature or safety claim', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = inspect(item, { openSucceeded: true, pageCount: 1 });
  assert.ok(Object.isFrozen(result));
  assert.ok(Object.isFrozen(result.observations));
  assert.ok(Object.isFrozen(result.observations.unsupportedObservations));
  for (const key of ['signatureValid', 'redactionSafe', 'pdfConformant', 'nonPolyglot', 'malwareFree']) {
    assert.equal(Object.prototype.hasOwnProperty.call(result, key), false);
    assert.equal(Object.prototype.hasOwnProperty.call(result.observations, key), false);
  }
});

test('every canonical fixture result preserves exact input identity and creates no revision', () => {
  for (const item of manifest.records) {
    const rejected = item.fixtureId.includes('declared-pdf-nonpdf') || item.fixtureId.includes('truncated-pdf-like');
    const raw = rejected ? { openSucceeded: false, pdfiumLastError: 3 } : { openSucceeded: true, pageCount: 1 };
    const result = inspect(item, raw);
    assertExactBinding(item, result);
    assert.equal(result.newCanonicalRevisionCreated, false);
    assert.equal(result.documentId, `document:${item.fixtureId}`);
    assert.equal(result.inputRevisionId, `revision:${item.fixtureId}`);
  }
});

test('non-buffer bytes and invalid canonical revision identifiers fail as INVALID_INPUT without throwing', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const nonBuffer = composePdfInspectResult({
    bytes: 'not-bytes',
    request: requestFor(item),
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: null,
  });
  assert.equal(nonBuffer.outcome, OUTCOME.FAILED);
  assert.equal(nonBuffer.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(Object.prototype.hasOwnProperty.call(nonBuffer, 'observations'), false);

  const bytes = bytesFor(item);
  for (const override of [{ documentId: '   ' }, { inputRevisionId: '   ' }]) {
    const result = composePdfInspectResult({
      bytes,
      request: requestFor(item, bytes, override),
      availability: AVAILABILITY.AVAILABLE,
      structuralEvidence: structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('unknown top-level request fields fail closed instead of becoming hidden provider options', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  request.remoteFallbackUrl = 'https://example.invalid/document.pdf';
  const result = composePdfInspectResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes),
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  assert.equal(result.locality, 'LOCAL_ONLY');
});

test('qualified runtime terminal evidence maps to distinct fail-closed terminal outcomes', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  const cases = [
    [TERMINAL_OUTCOME.CANCELLED, OUTCOME.CANCELLED, STABLE_ERROR.CANCELLED, 'cancelled.pdf_inspect_runtime', 'RETRY_MAY_SUCCEED'],
    [TERMINAL_OUTCOME.TIMED_OUT, OUTCOME.TIMED_OUT, STABLE_ERROR.TIMEOUT, 'timeout.pdf_inspect_runtime', 'RETRY_REQUIRES_CHANGED_INPUT_OR_STATE'],
    [TERMINAL_OUTCOME.RESOURCE_LIMIT_EXCEEDED, OUTCOME.RESOURCE_LIMIT_EXCEEDED, STABLE_ERROR.RESOURCE_LIMIT_EXCEEDED, 'resource_limit_exceeded.pdf_inspect_runtime', 'RETRY_REQUIRES_CHANGED_INPUT_OR_STATE'],
  ];

  for (const [terminalOutcome, outcome, errorClass, errorCode, retryCategory] of cases) {
    const terminalOutcomeEvidence = terminalEvidenceFor(item, bytes, request, { terminalOutcome });
    const result = composePdfInspectResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      structuralEvidence: null,
      terminalOutcomeEvidence,
    });
    assert.equal(result.outcome, outcome);
    assert.equal(result.stableError.errorClass, errorClass);
    assert.equal(result.stableError.errorCode, errorCode);
    assert.equal(result.stableError.retryCategory, retryCategory);
    assert.equal(result.runtimeTerminalEvidence.schema, TERMINAL_EVIDENCE_SCHEMA);
    assert.equal(result.runtimeTerminalEvidence.runtimeEvidenceRef, terminalOutcomeEvidence.runtimeEvidenceRef);
    assert.equal(result.runtimeTerminalEvidence.partialOutputDiscarded, true);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
    assert.equal(result.newCanonicalRevisionCreated, false);
    assert.ok(Object.isFrozen(result));
    assert.ok(Object.isFrozen(result.runtimeTerminalEvidence));
    assertExactBinding(item, result);
  }
});

test('runtime terminal evidence requires exact byte, provider, capability, and resource-budget binding', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  const base = terminalEvidenceFor(item, bytes, request);
  const invalidEvidence = [
    { ...base, schema: 'signthos.pdf.inspect.runtime-terminal.v2' },
    { ...base, terminalOutcome: 'FAILED' },
    { ...base, providerId: 'provider:other' },
    { ...base, providerCapabilityVersion: 'signthos.pdf.inspect.v2' },
    { ...base, inputExactBytesDigest: { algorithm: 'sha256', value: '0'.repeat(64) } },
    { ...base, byteLength: base.byteLength + 1 },
    { ...base, resourceBudgetRef: 'budget:other' },
    { ...base, runtimeEvidenceRef: '   ' },
    { ...base, partialOutputDiscarded: false },
    { ...base, extraField: true },
  ];
  const { runtimeEvidenceRef, ...missingRef } = base;
  invalidEvidence.push(missingRef);

  for (const terminalOutcomeEvidence of invalidEvidence) {
    const result = composePdfInspectResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      structuralEvidence: null,
      terminalOutcomeEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.runtime_terminal_evidence');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('runtime terminal evidence cannot coexist with structural success or unavailable provider state', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  const terminalOutcomeEvidence = terminalEvidenceFor(item, bytes, request);
  const structuralEvidence = structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes);

  const conflicting = composePdfInspectResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence,
    terminalOutcomeEvidence,
  });
  assert.equal(conflicting.outcome, OUTCOME.FAILED);
  assert.equal(conflicting.stableError.errorCode, 'invalid_input.runtime_terminal_evidence_conflict');

  for (const availability of [AVAILABILITY.UNAVAILABLE, AVAILABILITY.UNKNOWN]) {
    const result = composePdfInspectResult({
      bytes,
      request,
      availability,
      structuralEvidence: null,
      terminalOutcomeEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.runtime_terminal_availability_conflict');
  }
});

test('runtime terminal evidence rejects custom prototypes, inherited fields, symbols, accessors, and proxies without trap execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  const base = terminalEvidenceFor(item, bytes, request);

  const custom = Object.create({ terminalOutcome: TERMINAL_OUTCOME.CANCELLED });
  Object.assign(custom, base);
  delete custom.terminalOutcome;

  const symbolExtra = { ...base };
  symbolExtra[Symbol('hidden')] = true;

  let getterCalls = 0;
  const accessor = { ...base };
  Object.defineProperty(accessor, 'runtimeEvidenceRef', {
    enumerable: true,
    get() { getterCalls += 1; return 'runtime-evidence:getter'; },
  });

  let proxyTrapCalls = 0;
  const proxy = new Proxy({ ...base }, {
    getPrototypeOf(target) { proxyTrapCalls += 1; return Reflect.getPrototypeOf(target); },
    ownKeys(target) { proxyTrapCalls += 1; return Reflect.ownKeys(target); },
    getOwnPropertyDescriptor(target, key) { proxyTrapCalls += 1; return Reflect.getOwnPropertyDescriptor(target, key); },
  });

  for (const terminalOutcomeEvidence of [custom, symbolExtra, accessor, proxy]) {
    const result = composePdfInspectResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      structuralEvidence: null,
      terminalOutcomeEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.runtime_terminal_evidence');
  }
  assert.equal(getterCalls, 0);
  assert.equal(proxyTrapCalls, 0);
});

test('runtime terminal composition does not mutate bytes, request, or evidence', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const beforeBytes = Buffer.from(bytes);
  const request = Object.freeze(requestFor(item, bytes));
  const terminalOutcomeEvidence = Object.freeze(terminalEvidenceFor(item, bytes, request));
  const beforeEvidence = JSON.stringify(terminalOutcomeEvidence);
  const result = composePdfInspectResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: null,
    terminalOutcomeEvidence,
  });
  assert.equal(result.outcome, OUTCOME.CANCELLED);
  assert.deepEqual(bytes, beforeBytes);
  assert.equal(JSON.stringify(terminalOutcomeEvidence), beforeEvidence);
});

test('structural evidence must match the exact canonical adapter shape and error meaning', () => {
  const acceptedItem = record('admission-seed-ordinary-minimal-v1');
  const acceptedBytes = bytesFor(acceptedItem);
  const accepted = structuralFor(acceptedItem, { openSucceeded: true, pageCount: 1 }, acceptedBytes);
  const acceptedWithExtra = { ...accepted, providerObservation: { ...accepted.providerObservation, guessedMetadataPresence: false } };
  const acceptedResult = composePdfInspectResult({
    bytes: acceptedBytes,
    request: requestFor(acceptedItem, acceptedBytes),
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: acceptedWithExtra,
  });
  assert.equal(acceptedResult.stableError.errorCode, 'invalid_input.structural_evidence_shape');

  const rejectedItem = record('admission-seed-truncated-pdf-like-v1');
  const rejectedBytes = bytesFor(rejectedItem);
  const rejected = structuralFor(rejectedItem, { openSucceeded: false, pdfiumLastError: 3 }, rejectedBytes);
  const wrongMeaning = {
    ...rejected,
    providerObservation: { ...rejected.providerObservation, pdfiumErrorMeaning: 'Definitely not a PDF' },
  };
  const rejectedResult = composePdfInspectResult({
    bytes: rejectedBytes,
    request: requestFor(rejectedItem, rejectedBytes),
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: wrongMeaning,
  });
  assert.equal(rejectedResult.stableError.errorCode, 'invalid_input.structural_evidence_shape');
  assert.equal(Object.prototype.hasOwnProperty.call(rejectedResult, 'providerDiagnostics'), false);
});

test('structural observation accessors fail closed without getter execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes);
  let getterCalls = 0;
  const providerObservation = { openSucceeded: true };
  Object.defineProperty(providerObservation, 'pageCount', {
    enumerable: true,
    get() { getterCalls += 1; return 1; },
  });
  const result = composePdfInspectResult({
    bytes,
    request: requestFor(item, bytes),
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: { ...evidence, providerObservation },
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.structural_evidence_shape');
  assert.equal(getterCalls, 0);
});

test('proxy-backed request objects fail closed without invoking proxy traps', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  let trapCalls = 0;
  const request = new Proxy(requestFor(item, bytes), {
    getPrototypeOf(target) { trapCalls += 1; return Reflect.getPrototypeOf(target); },
    getOwnPropertyDescriptor(target, key) { trapCalls += 1; return Reflect.getOwnPropertyDescriptor(target, key); },
  });
  const result = composePdfInspectResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    structuralEvidence: structuralFor(item, { openSucceeded: true, pageCount: 1 }, bytes),
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(trapCalls, 0);
});
