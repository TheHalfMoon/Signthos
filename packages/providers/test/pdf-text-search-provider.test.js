'use strict';

const assert = require('node:assert/strict');
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
  composePdfTextSearchResult,
} = require('../src/pdf/browser/pdf-text-search-provider');

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
    operationId: `text-search:${item.fixtureId}`,
    capabilityRef: { ...CAPABILITY_REF },
    documentId: `document:${item.fixtureId}`,
    inputRevisionId: `revision:${item.fixtureId}`,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    inputByteLength: identity.byteLength,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    resourceBudgetRef: 'budget:pdf-text-search-v1:test',
    capabilityParameters: { pageIndex: 0, query: 'Sign', maxMatches: 4 },
    ...overrides,
  };
}

function match(index = 0, length = 4) {
  return { index, length };
}

function successEvidence(overrides = {}) {
  return {
    openSucceeded: true,
    pageIndex: 0,
    pageCount: 1,
    charCount: 8,
    queryLength: 4,
    matchCount: 2,
    matchesTruncated: false,
    matches: [match(0, 4), match(4, 4)],
    ...overrides,
  };
}

function rejectedEvidence() {
  return { openSucceeded: false, pdfiumLastError: 3 };
}

function search(item, evidence, overrides = {}) {
  const bytes = overrides.bytes ?? bytesFor(item);
  return composePdfTextSearchResult({
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

test('text search provider module exposes only the bounded semantic composer', () => {
  const provider = require('../src/pdf/browser/pdf-text-search-provider');
  assert.deepEqual(Reflect.ownKeys(provider), [
    'AVAILABILITY',
    'CAPABILITY_REF',
    'OUTCOME',
    'PROVIDER_CAPABILITY_VERSION',
    'PROVIDER_DESCRIPTOR',
    'RETRY_CATEGORY',
    'STABLE_ERROR',
    'TERMINAL_EVIDENCE_SCHEMA',
    'TERMINAL_OUTCOME',
    'composePdfTextSearchResult',
  ]);
  assert.equal(typeof composePdfTextSearchResult, 'function');
  assert.equal(Object.isFrozen(provider), true);
});

test('provider descriptor freezes the exact browser-local search capability', () => {
  assert.deepEqual({ ...CAPABILITY_REF }, { capabilityCode: 'PDF_TEXT_SEARCH_V1', capabilityVersion: '1' });
  assert.equal(PROVIDER_CAPABILITY_VERSION, 'signthos.pdf.text.search.v1');
  assert.equal(TERMINAL_EVIDENCE_SCHEMA, 'signthos.pdf.text.search.runtime-terminal.v1');
  assert.ok(Object.isFrozen(CAPABILITY_REF));
  assert.ok(Object.isFrozen(PROVIDER_DESCRIPTOR));
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.wasmSha256, PDFIUM_PROVIDER.wasmSha256);
  assert.ok(PROVIDER_DESCRIPTOR.declaredCapabilities.includes(CAPABILITY_REF));
});

test('canonical search success maps to SUCCEEDED with exact match observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = search(item, successEvidence());
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.capabilityRef.capabilityCode, 'PDF_TEXT_SEARCH_V1');
  assert.equal(result.capabilityRef.capabilityVersion, '1');
  assert.equal(result.effectClass, 'READ_ONLY');
  assert.equal(result.locality, 'LOCAL_ONLY');
  assert.equal(result.providerKind, 'BROWSER');
  assert.equal(result.observations.pageIndex, 0);
  assert.equal(result.observations.pageCount, 1);
  assert.equal(result.observations.charCount, 8);
  assert.equal(result.observations.queryLength, 4);
  assert.equal(result.observations.matchCount, 2);
  assert.equal(result.observations.matchesTruncated, false);
  assert.deepEqual(result.observations.matches, [match(0, 4), match(4, 4)]);
  assert.deepEqual(result.observations.warnings, []);
  assert.equal(result.newCanonicalRevisionCreated, false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'stableError'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'providerDiagnostics'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'exactOutputRevisionIds'), false);
  assertExactBinding(item, result);
});

test('truncated match list composes with exact shown matches', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const evidence = successEvidence({
    charCount: 20,
    matchCount: 6,
    matchesTruncated: true,
    matches: [match(0, 4), match(4, 4), match(8, 4), match(12, 4)],
  });
  const result = search(item, evidence);
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.observations.matchCount, 6);
  assert.equal(result.observations.matchesTruncated, true);
  assert.deepEqual(result.observations.matches, [match(0, 4), match(4, 4), match(8, 4), match(12, 4)]);
});

test('empty match list composes success with zero matches', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const evidence = successEvidence({ matchCount: 0, matches: [] });
  const result = search(item, evidence);
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.observations.matchCount, 0);
  assert.deepEqual(result.observations.matches, []);
});

test('malformed rejection maps to MALFORMED_UNTRUSTED_DOCUMENT with provider diagnostics', () => {
  const item = record('admission-seed-declared-pdf-nonpdf-v1');
  const result = search(item, rejectedEvidence());
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
    { capabilityCode: 'PDF_TEXT_SELECT_V1', capabilityVersion: '1' },
    { capabilityCode: 'PDF_TEXT_SEARCH_V1', capabilityVersion: '2' },
  ]) {
    const result = composePdfTextSearchResult({
      bytes,
      request: requestFor(item, bytes, { capabilityRef }),
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.UNSUPPORTED_CAPABILITY);
    assert.equal(result.stableError.errorCode, 'unsupported_capability.pdf_text_search_v1');
  }
});

test('provider capability-version mismatch is unsupported but provider identity mismatch is invalid input', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const versionMismatch = composePdfTextSearchResult({
    bytes,
    request: requestFor(item, bytes, { providerCapabilityVersion: 'signthos.pdf.text.search.v2' }),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
  });
  assert.equal(versionMismatch.stableError.errorClass, STABLE_ERROR.UNSUPPORTED_CAPABILITY);

  const identityMismatch = composePdfTextSearchResult({
    bytes,
    request: requestFor(item, bytes, { providerId: 'provider:other' }),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
  });
  assert.equal(identityMismatch.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(identityMismatch.stableError.errorCode, 'invalid_input.provider_mismatch');
});

test('UNAVAILABLE and UNKNOWN availability fail closed without observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const availability of [AVAILABILITY.UNAVAILABLE, AVAILABILITY.UNKNOWN]) {
    const result = search(item, successEvidence(), { availability });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.UNAVAILABLE);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('unknown availability value is invalid input rather than silently available', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = search(item, successEvidence(), { availability: 'SOMETIMES' });
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorCode, 'invalid_input.availability_state');
});

test('request exact-byte digest or length mismatch fails before provider success', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  for (const overrides of [
    { inputByteLength: bytes.length + 1 },
    { inputExactBytesDigest: { algorithm: 'sha256', value: '0'.repeat(64) } },
  ]) {
    const result = search(item, successEvidence(), {
      request: requestFor(item, bytes, overrides),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_text_search_request');
  }
});

test('capability parameter shape defects fail closed as invalid request', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const defects = [
    { pageIndex: -1 },
    { query: '' },
    { query: 42 },
    { query: null },
    { maxMatches: 0 },
    { pageIndex: 1.5 },
    { maxMatches: '4' },
  ];
  for (const defect of defects) {
    const parameters = { pageIndex: 0, query: 'Sign', maxMatches: 4, ...defect };
    const result = composePdfTextSearchResult({
      bytes,
      request: requestFor(item, bytes, { capabilityParameters: parameters }),
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_text_search_request');
  }
});

test('search evidence bound to a different page or query fails closed as binding mismatch', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    successEvidence({ pageIndex: 1 }),
    successEvidence({ queryLength: 3 }),
    successEvidence({ queryLength: 5 }),
  ]) {
    const result = search(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.text_search_evidence_binding');
  }
});

test('page range and query-length shape defects fail closed', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    successEvidence({ pageCount: 0 }),
    successEvidence({ queryLength: 0 }),
    successEvidence({ queryLength: -1 }),
    successEvidence({ matches: [{ index: 7, length: 4 }, { index: 0, length: 4 }] }),
  ]) {
    const result = search(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.text_search_evidence_shape');
  }
});

test('success search-shape defects fail closed without observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    { ...successEvidence(), extra: true },
    { ...successEvidence(), charCount: -1 },
    { ...successEvidence(), matchCount: -1 },
    { ...successEvidence(), matchesTruncated: 'no' },
  ]) {
    const result = search(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.text_search_evidence_shape');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('match truthfulness defects fail closed without observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    successEvidence({ matchCount: 6, matchesTruncated: false, matches: [match(0, 4), match(4, 4)] }),
    successEvidence({ matchCount: 2, matchesTruncated: true, matches: [match(0, 4), match(4, 4)] }),
    successEvidence({ matches: [match(0, 4)] }),
    successEvidence({ matches: 'matches' }),
    successEvidence({ matches: [{ index: 0 }] }),
    successEvidence({ matches: [{ index: 0, length: 4, extra: true }] }),
    successEvidence({ matches: [{ index: 7, length: 4 }] }),
    successEvidence({ matches: [{ index: 0, length: 0 }] }),
    successEvidence({ matches: [{ index: NaN, length: 4 }] }),
  ]) {
    const result = search(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.text_search_evidence_shape');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('astral-plane query binds by UTF-16 length consistently', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const query = 'a𝄞';
  const request = requestFor(item, bytesFor(item), {
    capabilityParameters: { pageIndex: 0, query, maxMatches: 4 },
  });
  const evidence = successEvidence({
    queryLength: query.length,
    matchCount: 1,
    matches: [match(2, query.length)],
  });
  const result = search(item, evidence, { request });
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.observations.queryLength, 3);
  assert.deepEqual(result.observations.matches, [match(2, 3)]);
});

test('rejection shape defects fail closed without malformed diagnostics', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    { openSucceeded: false, pdfiumLastError: 2 },
    { openSucceeded: false },
    { openSucceeded: 'no', pdfiumLastError: 3 },
  ]) {
    const result = search(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.text_search_evidence_shape');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'providerDiagnostics'), false);
  }
});

test('request custom prototypes and accessor fields fail closed without invoking getters', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  let getterCalls = 0;
  const accessor = requestFor(item, bytes);
  Object.defineProperty(accessor, 'operationId', {
    enumerable: true,
    get() { getterCalls += 1; return 'text-search:getter'; },
  });
  for (const request of [
    accessor,
    Object.assign(Object.create({ inherited: true }), requestFor(item, bytes)),
  ]) {
    const result = composePdfTextSearchResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_text_search_request');
  }
  assert.equal(getterCalls, 0);
});

test('digest, capability, and parameter nested accessors fail closed without getter execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  let getterCalls = 0;
  function accessedRequest(mutator) {
    const request = requestFor(item, bytes);
    mutator(request);
    return request;
  }
  const cases = [
    accessedRequest((request) => {
      Object.defineProperty(request.inputExactBytesDigest, 'value', {
        enumerable: true,
        get() { getterCalls += 1; return 'getter'; },
      });
    }),
    accessedRequest((request) => {
      Object.defineProperty(request.capabilityRef, 'capabilityCode', {
        enumerable: true,
        get() { getterCalls += 1; return 'PDF_TEXT_SEARCH_V1'; },
      });
    }),
    accessedRequest((request) => {
      Object.defineProperty(request.capabilityParameters, 'maxMatches', {
        enumerable: true,
        get() { getterCalls += 1; return 4; },
      });
    }),
  ];
  for (const request of cases) {
    const result = composePdfTextSearchResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
  }
  assert.equal(getterCalls, 0);
});

test('search observation accessors fail closed without getter execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  let getterCalls = 0;
  const evidence = successEvidence();
  Object.defineProperty(evidence, 'matchCount', {
    enumerable: true,
    get() { getterCalls += 1; return 2; },
  });
  const result = search(item, evidence);
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorCode, 'invalid_input.text_search_evidence_shape');
  assert.equal(getterCalls, 0);
});

test('proxy-backed request and evidence containers fail closed without invoking proxy traps', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  let trapCalls = 0;
  const request = new Proxy(requestFor(item, bytes), {
    getOwnPropertyDescriptor(target, key) {
      trapCalls += 1;
      return Reflect.getOwnPropertyDescriptor(target, key);
    },
  });
  const evidence = new Proxy(successEvidence(), {
    ownKeys(target) {
      trapCalls += 1;
      return Reflect.ownKeys(target);
    },
  });
  for (const input of [
    { request, textEvidence: successEvidence() },
    { request: requestFor(item, bytes), textEvidence: evidence },
  ]) {
    const result = composePdfTextSearchResult({
      bytes,
      request: input.request,
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: input.textEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
  }
  assert.equal(trapCalls, 0);
});

test('semantic composition is read-only with respect to bytes, request, and search evidence', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const bytesBefore = Buffer.from(bytes);
  const request = requestFor(item, bytes);
  const requestBefore = JSON.stringify(request);
  const evidence = successEvidence();
  const evidenceShapeBefore = JSON.stringify({ ...evidence, matches: evidence.matches.map((entry) => ({ ...entry })) });
  const result = composePdfTextSearchResult({ bytes, request, availability: AVAILABILITY.AVAILABLE, textEvidence: evidence });
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.deepEqual(bytes, bytesBefore);
  assert.equal(JSON.stringify(request), requestBefore);
  assert.equal(JSON.stringify({ ...evidence, matches: evidence.matches.map((entry) => ({ ...entry })) }), evidenceShapeBefore);
});

test('successful result remains deeply frozen and contains no signature or safety claim', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = search(item, successEvidence());
  assert.ok(Object.isFrozen(result));
  assert.ok(Object.isFrozen(result.observations));
  assert.ok(Object.isFrozen(result.observations.matches));
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
    const result = search(item, evidence);
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
  const nonBuffer = composePdfTextSearchResult({
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
    const result = composePdfTextSearchResult({
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
  const result = composePdfTextSearchResult({
    bytes,
    request: { ...requestFor(item, bytes), debug: true },
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
  });
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorCode, 'invalid_input.pdf_text_search_request');
});

test('qualified runtime terminal evidence maps to distinct fail-closed terminal outcomes', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  for (const [terminalOutcome, errorClass, errorCode] of [
    [TERMINAL_OUTCOME.CANCELLED, STABLE_ERROR.CANCELLED, 'cancelled.pdf_text_search_runtime'],
    [TERMINAL_OUTCOME.TIMED_OUT, STABLE_ERROR.TIMEOUT, 'timeout.pdf_text_search_runtime'],
    [TERMINAL_OUTCOME.RESOURCE_LIMIT_EXCEEDED, STABLE_ERROR.RESOURCE_LIMIT_EXCEEDED, 'resource_limit_exceeded.pdf_text_search_runtime'],
  ]) {
    const result = composePdfTextSearchResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: null,
      terminalOutcomeEvidence: terminalEvidenceFor(item, bytes, request, { terminalOutcome }),
    });
    assert.equal(result.outcome, terminalOutcome);
    assert.equal(result.stableError.errorClass, errorClass);
    assert.equal(result.stableError.errorCode, errorCode);
    assert.deepEqual(result.runtimeTerminalEvidence, {
      schema: TERMINAL_EVIDENCE_SCHEMA,
      runtimeEvidenceRef: `runtime-evidence:${item.fixtureId}`,
      partialOutputDiscarded: true,
    });
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
    assert.ok(Object.isFrozen(result));
  }
});

test('runtime terminal evidence requires exact byte, provider, capability, and resource-budget binding', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  const base = terminalEvidenceFor(item, bytes, request);
  const invalidEvidence = [
    { ...base, schema: 'signthos.pdf.text.search.runtime-terminal.v2' },
    { ...base, terminalOutcome: 'FAILED' },
    { ...base, providerId: 'provider:other' },
    { ...base, providerCapabilityVersion: 'signthos.pdf.text.search.v2' },
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
    const result = composePdfTextSearchResult({
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

test('runtime terminal evidence cannot coexist with search success or unavailable provider state', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  const terminalOutcomeEvidence = terminalEvidenceFor(item, bytes, request);

  const conflicting = composePdfTextSearchResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
    terminalOutcomeEvidence,
  });
  assert.equal(conflicting.outcome, OUTCOME.FAILED);
  assert.equal(conflicting.stableError.errorCode, 'invalid_input.runtime_terminal_evidence_conflict');

  for (const availability of [AVAILABILITY.UNAVAILABLE, AVAILABILITY.UNKNOWN]) {
    const result = composePdfTextSearchResult({
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
    const result = composePdfTextSearchResult({
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
  const result = composePdfTextSearchResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: null,
    terminalOutcomeEvidence,
  });
  assert.equal(result.outcome, TERMINAL_OUTCOME.CANCELLED);
  assert.deepEqual(bytes, beforeBytes);
  assert.equal(JSON.stringify(terminalOutcomeEvidence), beforeEvidence);
});

test('text search provider source keeps the local-only semantic boundary', () => {
  const source = fs.readFileSync(
    path.join(root, 'packages/providers/src/pdf/browser/pdf-text-search-provider.js'),
    'utf8',
  );
  assert.match(source, /composePdfTextSearchResult/);
  assert.match(source, /PDF_TEXT_SEARCH_V1/);
  for (const forbidden of [
    /require\('..\/pdf-text-search-runtime'\)/,
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
