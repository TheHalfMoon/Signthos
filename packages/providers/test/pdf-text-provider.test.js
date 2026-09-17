'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { exactByteIdentity } = require('../src/content-identity-admission');
const { PDFIUM_PROVIDER } = require('../src/pdf/browser/pdfium-structural-evidence');
const {
  AVAILABILITY,
  CAPABILITY_REF,
  OUTCOME,
  PROVIDER_CAPABILITY_VERSION,
  PROVIDER_DESCRIPTOR,
  STABLE_ERROR,
  TERMINAL_EVIDENCE_SCHEMA,
  TERMINAL_OUTCOME,
  composePdfTextResult,
} = require('../src/pdf/browser/pdf-text-provider');

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
    operationId: `text:${item.fixtureId}`,
    capabilityRef: { ...CAPABILITY_REF },
    documentId: `document:${item.fixtureId}`,
    inputRevisionId: `revision:${item.fixtureId}`,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    inputByteLength: identity.byteLength,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    resourceBudgetRef: 'budget:pdf-text-extract-v1:test',
    capabilityParameters: { pageIndex: 0, maxChars: 1000 },
    ...overrides,
  };
}

function successEvidence({ pageIndex = 0, pageCount = 1, charCount = 8, truncated = false, unicodeMapError = false, text = 'Signthos' } = {}) {
  return { openSucceeded: true, pageIndex, pageCount, charCount, truncated, unicodeMapError, text };
}

function rejectedEvidence() {
  return { openSucceeded: false, pdfiumLastError: 3 };
}

function text(item, evidence, overrides = {}) {
  const bytes = overrides.bytes ?? bytesFor(item);
  return composePdfTextResult({
    bytes,
    request: overrides.request ?? requestFor(item, bytes),
    availability: overrides.availability ?? AVAILABILITY.AVAILABLE,
    textEvidence: overrides.textEvidence ?? evidence,
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

test('text provider module exposes only the bounded semantic composer', () => {
  const provider = require('../src/pdf/browser/pdf-text-provider');
  assert.deepEqual(Reflect.ownKeys(provider).sort(), [
    'AVAILABILITY',
    'CAPABILITY_REF',
    'OUTCOME',
    'PROVIDER_CAPABILITY_VERSION',
    'PROVIDER_DESCRIPTOR',
    'RETRY_CATEGORY',
    'STABLE_ERROR',
    'TERMINAL_EVIDENCE_SCHEMA',
    'TERMINAL_OUTCOME',
    'composePdfTextResult',
  ].sort());
  assert.equal(typeof composePdfTextResult, 'function');
  assert.ok(Object.isFrozen(provider));
});

test('provider descriptor freezes the exact browser-local text capability', () => {
  assert.equal(PROVIDER_DESCRIPTOR.providerId, 'signthos.pdf.browser.embedpdf-v2.15.0-pdfium');
  assert.equal(PROVIDER_DESCRIPTOR.providerKind, 'BROWSER');
  assert.equal(PROVIDER_DESCRIPTOR.locality, 'LOCAL_ONLY');
  assert.equal(PROVIDER_DESCRIPTOR.providerCandidateId, 'embedpdf-v2.15.0-pdfium-browser');
  assert.equal(PROVIDER_DESCRIPTOR.capabilityContractVersion, 'signthos.provider-capability.v1');
  assert.deepEqual(PROVIDER_DESCRIPTOR.declaredCapabilities, [CAPABILITY_REF]);
  assert.deepEqual(CAPABILITY_REF, { capabilityCode: 'PDF_TEXT_EXTRACT_V1', capabilityVersion: '1' });
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.packageIdentity, '@embedpdf/pdfium@2.15.0');
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.version, '2.15.0');
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.embedpdfSourceCommit, PDFIUM_PROVIDER.embedpdfSourceCommit);
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.pdfiumSubmoduleRevision, PDFIUM_PROVIDER.pdfiumSubmoduleRevision);
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.wasmSha256, PDFIUM_PROVIDER.wasmSha256);
  assert.equal(PROVIDER_CAPABILITY_VERSION, 'signthos.pdf.text.v1');
  assert.ok(Object.isFrozen(PROVIDER_DESCRIPTOR));
  assert.ok(Object.isFrozen(PROVIDER_DESCRIPTOR.declaredCapabilities));
});

test('canonical text success maps to SUCCEEDED with exact observations including text digest', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const evidence = successEvidence();
  const result = text(item, evidence);
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.capabilityRef.capabilityCode, 'PDF_TEXT_EXTRACT_V1');
  assert.equal(result.capabilityRef.capabilityVersion, '1');
  assert.equal(result.effectClass, 'READ_ONLY');
  assert.equal(result.locality, 'LOCAL_ONLY');
  assert.equal(result.providerKind, 'BROWSER');
  assert.equal(result.observations.pageIndex, 0);
  assert.equal(result.observations.pageCount, 1);
  assert.equal(result.observations.charCount, 8);
  assert.equal(result.observations.truncated, false);
  assert.equal(result.observations.unicodeMapError, false);
  assert.equal(result.observations.textLength, 8);
  assert.deepEqual(result.observations.textDigest, {
    algorithm: 'sha256',
    value: crypto.createHash('sha256').update(evidence.text, 'utf8').digest('hex'),
  });
  assert.deepEqual(result.observations.warnings, []);
  assert.equal(result.newCanonicalRevisionCreated, false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'stableError'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'providerDiagnostics'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'exactOutputRevisionIds'), false);
  assertExactBinding(item, result);
});

test('malformed rejection maps to MALFORMED_UNTRUSTED_DOCUMENT with provider diagnostics', () => {
  const item = record('admission-seed-declared-pdf-nonpdf-v1');
  const result = text(item, rejectedEvidence());
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

test('capability code or semantic version mismatch fails as unsupported capability', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  for (const capabilityRef of [
    { capabilityCode: 'PDF_INSPECT_V1', capabilityVersion: '1' },
    { capabilityCode: 'PDF_TEXT_EXTRACT_V1', capabilityVersion: '2' },
  ]) {
    const result = composePdfTextResult({
      bytes,
      request: requestFor(item, bytes, { capabilityRef }),
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.UNSUPPORTED_CAPABILITY);
    assert.equal(result.stableError.errorCode, 'unsupported_capability.pdf_text_extract_v1');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('provider capability-version mismatch is unsupported but provider identity mismatch is invalid input', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const unsupported = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes, { providerCapabilityVersion: 'signthos.pdf.text.v2' }),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
  });
  assert.equal(unsupported.stableError.errorClass, STABLE_ERROR.UNSUPPORTED_CAPABILITY);

  const wrongProvider = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes, { providerId: 'provider:other' }),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
  });
  assert.equal(wrongProvider.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(wrongProvider.stableError.errorCode, 'invalid_input.provider_mismatch');
});

test('UNAVAILABLE and UNKNOWN availability fail closed without observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  for (const availability of [AVAILABILITY.UNAVAILABLE, AVAILABILITY.UNKNOWN]) {
    const result = composePdfTextResult({
      bytes,
      request: requestFor(item, bytes),
      availability,
      textEvidence: null,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.UNAVAILABLE);
    assert.equal(result.stableError.errorCode, 'unavailable.pdf_text_provider');
    assert.equal(result.stableError.retryCategory, 'RETRY_MAY_SUCCEED');
    assert.equal(result.locality, 'LOCAL_ONLY');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('unknown availability value is invalid input rather than silently available', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = composePdfTextResult({
    bytes: bytesFor(item),
    request: requestFor(item),
    availability: 'AVAILABLE_WITH_FALLBACK',
    textEvidence: null,
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.availability_state');
});

test('request exact-byte digest or length mismatch fails before provider success', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const badDigest = requestFor(item, bytes, {
    inputExactBytesDigest: { algorithm: 'sha256', value: '0'.repeat(64) },
  });
  const badLength = requestFor(item, bytes, { inputByteLength: bytes.length + 1 });
  for (const request of [badDigest, badLength]) {
    const result = composePdfTextResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_text_request');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('capability parameter shape defects fail closed as invalid request', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const defects = [
    {},
    { pageIndex: 0 },
    { maxChars: 1000 },
    { pageIndex: 0, maxChars: 1000, vendorMode: 'fast' },
    { pageIndex: -1, maxChars: 1000 },
    { pageIndex: 1.5, maxChars: 1000 },
    { pageIndex: '0', maxChars: 1000 },
    { pageIndex: 0, maxChars: 0 },
    { pageIndex: 0, maxChars: -10 },
    { pageIndex: 0, maxChars: 2.5 },
    { pageIndex: 0, maxChars: '1000' },
  ];
  for (const capabilityParameters of defects) {
    const result = composePdfTextResult({
      bytes,
      request: requestFor(item, bytes, { capabilityParameters }),
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_text_request');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('text evidence bound to a different page index fails closed as binding mismatch', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = successEvidence({ pageIndex: 1, pageCount: 2 });
  const result = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: evidence,
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.text_evidence_binding');
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
});

test('character budget enforcement fails closed while exact budget succeeds', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const over = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes, { capabilityParameters: { pageIndex: 0, maxChars: 7 } }),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
  });
  assert.equal(over.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(over.stableError.errorCode, 'invalid_input.text_evidence_shape');

  const exact = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes, { capabilityParameters: { pageIndex: 0, maxChars: 8 } }),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
  });
  assert.equal(exact.outcome, OUTCOME.SUCCEEDED);

  const truncatedValid = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes, { capabilityParameters: { pageIndex: 0, maxChars: 4 } }),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence({ charCount: 12, truncated: true, text: 'Sign' }),
  });
  assert.equal(truncatedValid.outcome, OUTCOME.SUCCEEDED);
  assert.equal(truncatedValid.observations.textLength, 4);

  const truncatedLie = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes, { capabilityParameters: { pageIndex: 0, maxChars: 4 } }),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence({ charCount: 4, truncated: true, text: 'Sign' }),
  });
  assert.equal(truncatedLie.stableError.errorCode, 'invalid_input.text_evidence_shape');
});

test('success text-shape defects fail closed without observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const base = successEvidence();
  const defects = [
    { ...base, pdfiumLastError: 3 },
    { ...base, extraField: true },
    { ...base, truncated: 'yes' },
    { ...base, unicodeMapError: 1 },
    { ...base, text: 123 },
    { ...base, text: 'Signthos!' },
    { ...base, charCount: -1 },
    { ...base, pageCount: 0 },
    { ...base, pageCount: -1 },
  ];
  const { text, ...missingText } = base;
  defects.push(missingText);
  for (const textEvidence of defects) {
    const result = composePdfTextResult({
      bytes,
      request: requestFor(item, bytes),
      availability: AVAILABILITY.AVAILABLE,
      textEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.text_evidence_shape');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('unicode and astral-plane text composes an exact utf8 digest', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const text = 'a\u00e9\ud834\udd1eX';
  assert.equal(text.length, 5);
  const result = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence({ charCount: 5, text }),
  });
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.observations.textLength, 5);
  assert.deepEqual(result.observations.textDigest, {
    algorithm: 'sha256',
    value: crypto.createHash('sha256').update(text, 'utf8').digest('hex'),
  });
});
test('rejection shape defects fail closed without malformed diagnostics', () => {
  const item = record('admission-seed-declared-pdf-nonpdf-v1');
  const bytes = bytesFor(item);
  const defects = [
    { openSucceeded: false, pdfiumLastError: 4 },
    { openSucceeded: false, pdfiumLastError: '3' },
    { openSucceeded: false, pdfiumLastError: 3, pageCount: 1 },
    { openSucceeded: false },
    { openSucceeded: 'no', pdfiumLastError: 3 },
    null,
    {},
  ];
  for (const textEvidence of defects) {
    const result = composePdfTextResult({
      bytes,
      request: requestFor(item, bytes),
      availability: AVAILABILITY.AVAILABLE,
      textEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'providerDiagnostics'), false);
  }
});

test('request custom prototypes and accessor fields fail closed without invoking getters', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = successEvidence();
  let getterCalls = 0;

  const custom = Object.create({ operationId: 'inherited' });
  Object.assign(custom, requestFor(item, bytes));
  const customResult = composePdfTextResult({
    bytes, request: custom, availability: AVAILABILITY.AVAILABLE, textEvidence: evidence,
  });
  assert.equal(customResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);

  const accessor = requestFor(item, bytes);
  Object.defineProperty(accessor, 'operationId', {
    configurable: true,
    enumerable: true,
    get() { getterCalls += 1; return 'getter-operation'; },
  });
  const result = composePdfTextResult({
    bytes, request: accessor, availability: AVAILABILITY.AVAILABLE, textEvidence: evidence,
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(getterCalls, 0);
});

test('digest, capability, and parameter nested accessors fail closed without getter execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = successEvidence();
  let getterCalls = 0;

  const digest = {};
  Object.defineProperty(digest, 'algorithm', { enumerable: true, get() { getterCalls += 1; return 'sha256'; } });
  digest.value = item.exactBytesDigest.value;
  const digestResult = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes, { inputExactBytesDigest: digest }),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: evidence,
  });
  assert.equal(digestResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);

  const capabilityRef = {};
  Object.defineProperty(capabilityRef, 'capabilityCode', { enumerable: true, get() { getterCalls += 1; return 'PDF_TEXT_EXTRACT_V1'; } });
  capabilityRef.capabilityVersion = '1';
  const capabilityResult = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes, { capabilityRef }),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: evidence,
  });
  assert.equal(capabilityResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);

  const capabilityParameters = { pageIndex: 0 };
  Object.defineProperty(capabilityParameters, 'maxChars', { enumerable: true, get() { getterCalls += 1; return 1000; } });
  const parameterResult = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes, { capabilityParameters }),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: evidence,
  });
  assert.equal(parameterResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(getterCalls, 0);
});

test('text observation accessors fail closed without getter execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  let getterCalls = 0;
  const textEvidence = { ...successEvidence() };
  Object.defineProperty(textEvidence, 'pageIndex', {
    enumerable: true,
    get() { getterCalls += 1; return 0; },
  });
  const result = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence,
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.text_evidence_shape');
  assert.equal(getterCalls, 0);
});

test('proxy-backed request and evidence containers fail closed without invoking proxy traps', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  let trapCalls = 0;
  const request = new Proxy(requestFor(item, bytes), {
    getPrototypeOf(target) { trapCalls += 1; return Reflect.getPrototypeOf(target); },
    getOwnPropertyDescriptor(target, key) { trapCalls += 1; return Reflect.getOwnPropertyDescriptor(target, key); },
  });
  const requestResult = composePdfTextResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
  });
  assert.equal(requestResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);

  const evidence = new Proxy(successEvidence(), {
    getPrototypeOf(target) { trapCalls += 1; return Reflect.getPrototypeOf(target); },
    getOwnPropertyDescriptor(target, key) { trapCalls += 1; return Reflect.getOwnPropertyDescriptor(target, key); },
  });
  const evidenceResult = composePdfTextResult({
    bytes,
    request: requestFor(item, bytes),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: evidence,
  });
  assert.equal(evidenceResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(trapCalls, 0);
});

test('semantic composition is read-only with respect to bytes, request, and text evidence', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const bytesBefore = Buffer.from(bytes);
  const request = requestFor(item, bytes);
  const requestBefore = JSON.stringify(request);
  const evidence = successEvidence();
  const evidenceTextBefore = evidence.text;
  const evidenceShapeBefore = JSON.stringify(evidence);
  const result = composePdfTextResult({ bytes, request, availability: AVAILABILITY.AVAILABLE, textEvidence: evidence });
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.deepEqual(bytes, bytesBefore);
  assert.equal(JSON.stringify(request), requestBefore);
  assert.equal(evidence.text, evidenceTextBefore);
  assert.equal(JSON.stringify(evidence), evidenceShapeBefore);
});

test('successful result remains deeply frozen and contains no signature or safety claim', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = text(item, successEvidence());
  assert.ok(Object.isFrozen(result));
  assert.ok(Object.isFrozen(result.observations));
  assert.ok(Object.isFrozen(result.observations.textDigest));
  assert.ok(Object.isFrozen(result.observations.warnings));
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'text'), false);
  for (const key of ['signatureValid', 'redactionSafe', 'pdfConformant', 'nonPolyglot', 'malwareFree']) {
    assert.equal(Object.prototype.hasOwnProperty.call(result, key), false);
    assert.equal(Object.prototype.hasOwnProperty.call(result.observations, key), false);
  }
});

test('every canonical fixture result preserves exact input identity and creates no revision', () => {
  for (const item of manifest.records) {
    const rejected = item.fixtureId.includes('declared-pdf-nonpdf') || item.fixtureId.includes('truncated-pdf-like');
    const evidence = rejected ? rejectedEvidence() : successEvidence();
    const result = text(item, evidence);
    assertExactBinding(item, result);
    assert.equal(result.newCanonicalRevisionCreated, false);
    assert.equal(result.documentId, `document:${item.fixtureId}`);
    assert.equal(result.inputRevisionId, `revision:${item.fixtureId}`);
    if (rejected) {
      assert.equal(result.stableError.errorClass, STABLE_ERROR.MALFORMED_UNTRUSTED_DOCUMENT);
    } else {
      assert.equal(result.outcome, OUTCOME.SUCCEEDED);
    }
  }
});

test('non-buffer bytes and invalid canonical revision identifiers fail as INVALID_INPUT without throwing', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const nonBuffer = composePdfTextResult({
    bytes: 'not-bytes',
    request: requestFor(item),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: null,
  });
  assert.equal(nonBuffer.outcome, OUTCOME.FAILED);
  assert.equal(nonBuffer.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(Object.prototype.hasOwnProperty.call(nonBuffer, 'observations'), false);

  const bytes = bytesFor(item);
  for (const override of [{ documentId: '   ' }, { inputRevisionId: '   ' }]) {
    const result = composePdfTextResult({
      bytes,
      request: requestFor(item, bytes, override),
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: successEvidence(),
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
  const result = composePdfTextResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
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
    [TERMINAL_OUTCOME.CANCELLED, OUTCOME.CANCELLED, STABLE_ERROR.CANCELLED, 'cancelled.pdf_text_runtime', 'RETRY_MAY_SUCCEED'],
    [TERMINAL_OUTCOME.TIMED_OUT, OUTCOME.TIMED_OUT, STABLE_ERROR.TIMEOUT, 'timeout.pdf_text_runtime', 'RETRY_REQUIRES_CHANGED_INPUT_OR_STATE'],
    [TERMINAL_OUTCOME.RESOURCE_LIMIT_EXCEEDED, OUTCOME.RESOURCE_LIMIT_EXCEEDED, STABLE_ERROR.RESOURCE_LIMIT_EXCEEDED, 'resource_limit_exceeded.pdf_text_runtime', 'RETRY_REQUIRES_CHANGED_INPUT_OR_STATE'],
  ];

  for (const [terminalOutcome, outcome, errorClass, errorCode, retryCategory] of cases) {
    const terminalOutcomeEvidence = terminalEvidenceFor(item, bytes, request, { terminalOutcome });
    const result = composePdfTextResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: null,
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
    { ...base, schema: 'signthos.pdf.text.runtime-terminal.v2' },
    { ...base, terminalOutcome: 'FAILED' },
    { ...base, providerId: 'provider:other' },
    { ...base, providerCapabilityVersion: 'signthos.pdf.text.v2' },
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
    const result = composePdfTextResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: null,
      terminalOutcomeEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.runtime_terminal_evidence');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('runtime terminal evidence cannot coexist with text success or unavailable provider state', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  const terminalOutcomeEvidence = terminalEvidenceFor(item, bytes, request);

  const conflicting = composePdfTextResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
    terminalOutcomeEvidence,
  });
  assert.equal(conflicting.outcome, OUTCOME.FAILED);
  assert.equal(conflicting.stableError.errorCode, 'invalid_input.runtime_terminal_evidence_conflict');

  for (const availability of [AVAILABILITY.UNAVAILABLE, AVAILABILITY.UNKNOWN]) {
    const result = composePdfTextResult({
      bytes,
      request,
      availability,
      textEvidence: null,
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
    const result = composePdfTextResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: null,
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
  const result = composePdfTextResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: null,
    terminalOutcomeEvidence,
  });
  assert.equal(result.outcome, OUTCOME.CANCELLED);
  assert.deepEqual(bytes, beforeBytes);
  assert.equal(JSON.stringify(terminalOutcomeEvidence), beforeEvidence);
});

test('text provider source keeps the local-only semantic boundary', () => {
  const source = fs.readFileSync(
    path.join(root, 'packages/providers/src/pdf/browser/pdf-text-provider.js'),
    'utf8',
  );
  assert.match(source, /composePdfTextResult/);
  assert.match(source, /PDF_TEXT_EXTRACT_V1/);
  assert.match(source, /textDigest/);
  for (const forbidden of [
    /require\('..\/pdf-text-runtime'\)/,
    /require\('@embedpdf\/pdfium'\)/,
    /\bWebAssembly\b/,
    /DEFAULT_PDFIUM_WASM_URL/,
    /\bfetch\s*\(/,
    /XMLHttpRequest/,
    /\bWorker\s*\(/,
    /importScripts/,
    /child_process/,
    /node:fs/,
    /node:path/,
    /readFileSync/,
    /setTimeout\s*\(/,
    /setInterval\s*\(/,
    /https?:\/\//,
    /\bURL\b/,
    /cdn/i,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
});
