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
  composePdfTextSelectResult,
} = require('../src/pdf/browser/pdf-text-select-provider');

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
    operationId: `text-select:${item.fixtureId}`,
    capabilityRef: { ...CAPABILITY_REF },
    documentId: `document:${item.fixtureId}`,
    inputRevisionId: `revision:${item.fixtureId}`,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    inputByteLength: identity.byteLength,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    resourceBudgetRef: 'budget:pdf-text-select-v1:test',
    capabilityParameters: { pageIndex: 0, startIndex: 0, selectCount: 8, maxRects: 4 },
    ...overrides,
  };
}

function rect(index = 0) {
  return { left: index, top: index + 1, right: index + 2, bottom: index + 3 };
}

function successEvidence(overrides = {}) {
  return {
    openSucceeded: true,
    pageIndex: 0,
    pageCount: 1,
    charCount: 8,
    startIndex: 0,
    selectCount: 8,
    rectCount: 1,
    rectsTruncated: false,
    unicodeMapError: false,
    text: 'Signthos',
    rects: [rect()],
    ...overrides,
  };
}

function rejectedEvidence() {
  return { openSucceeded: false, pdfiumLastError: 3 };
}

function select(item, evidence, overrides = {}) {
  const bytes = overrides.bytes ?? bytesFor(item);
  return composePdfTextSelectResult({
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

test('text select provider module exposes only the bounded semantic composer', () => {
  const provider = require('../src/pdf/browser/pdf-text-select-provider');
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
    'composePdfTextSelectResult',
  ]);
  assert.equal(typeof composePdfTextSelectResult, 'function');
  assert.equal(Object.isFrozen(provider), true);
});

test('provider descriptor freezes the exact browser-local select capability', () => {
  assert.deepEqual({ ...CAPABILITY_REF }, { capabilityCode: 'PDF_TEXT_SELECT_V1', capabilityVersion: '1' });
  assert.equal(PROVIDER_CAPABILITY_VERSION, 'signthos.pdf.text.select.v1');
  assert.equal(TERMINAL_EVIDENCE_SCHEMA, 'signthos.pdf.text.select.runtime-terminal.v1');
  assert.ok(Object.isFrozen(CAPABILITY_REF));
  assert.ok(Object.isFrozen(PROVIDER_DESCRIPTOR));
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.wasmSha256, PDFIUM_PROVIDER.wasmSha256);
  assert.ok(PROVIDER_DESCRIPTOR.declaredCapabilities.includes(CAPABILITY_REF));
});

test('canonical select success maps to SUCCEEDED with exact observations including text digest and rects', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const evidence = successEvidence();
  const result = select(item, evidence);
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.capabilityRef.capabilityCode, 'PDF_TEXT_SELECT_V1');
  assert.equal(result.capabilityRef.capabilityVersion, '1');
  assert.equal(result.effectClass, 'READ_ONLY');
  assert.equal(result.locality, 'LOCAL_ONLY');
  assert.equal(result.providerKind, 'BROWSER');
  assert.equal(result.observations.pageIndex, 0);
  assert.equal(result.observations.pageCount, 1);
  assert.equal(result.observations.charCount, 8);
  assert.equal(result.observations.startIndex, 0);
  assert.equal(result.observations.selectCount, 8);
  assert.equal(result.observations.rectCount, 1);
  assert.equal(result.observations.rectsTruncated, false);
  assert.equal(result.observations.unicodeMapError, false);
  assert.equal(result.observations.textLength, 8);
  assert.deepEqual(result.observations.textDigest, {
    algorithm: 'sha256',
    value: crypto.createHash('sha256').update(evidence.text, 'utf8').digest('hex'),
  });
  assert.deepEqual(result.observations.rects, [rect()]);
  assert.deepEqual(result.observations.warnings, []);
  assert.equal(result.newCanonicalRevisionCreated, false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'stableError'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'providerDiagnostics'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'exactOutputRevisionIds'), false);
  assertExactBinding(item, result);
});

test('truncated rect list composes with exact shown rects', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const evidence = successEvidence({
    rectCount: 6,
    rectsTruncated: true,
    rects: [rect(0), rect(10), rect(20), rect(30)],
  });
  const result = select(item, evidence);
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.observations.rectCount, 6);
  assert.equal(result.observations.rectsTruncated, true);
  assert.deepEqual(result.observations.rects, [rect(0), rect(10), rect(20), rect(30)]);
});

test('malformed rejection maps to MALFORMED_UNTRUSTED_DOCUMENT with provider diagnostics', () => {
  const item = record('admission-seed-declared-pdf-nonpdf-v1');
  const result = select(item, rejectedEvidence());
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
    { capabilityCode: 'PDF_TEXT_EXTRACT_V1', capabilityVersion: '1' },
    { capabilityCode: 'PDF_TEXT_SELECT_V1', capabilityVersion: '2' },
  ]) {
    const result = composePdfTextSelectResult({
      bytes,
      request: requestFor(item, bytes, { capabilityRef }),
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.UNSUPPORTED_CAPABILITY);
    assert.equal(result.stableError.errorCode, 'unsupported_capability.pdf_text_select_v1');
  }
});

test('provider capability-version mismatch is unsupported but provider identity mismatch is invalid input', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const versionMismatch = composePdfTextSelectResult({
    bytes,
    request: requestFor(item, bytes, { providerCapabilityVersion: 'signthos.pdf.text.select.v2' }),
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
  });
  assert.equal(versionMismatch.stableError.errorClass, STABLE_ERROR.UNSUPPORTED_CAPABILITY);

  const identityMismatch = composePdfTextSelectResult({
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
    const result = select(item, successEvidence(), { availability });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.UNAVAILABLE);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('unknown availability value is invalid input rather than silently available', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = select(item, successEvidence(), { availability: 'SOMETIMES' });
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
    const result = select(item, successEvidence(), {
      request: requestFor(item, bytes, overrides),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_text_select_request');
  }
});

test('capability parameter shape defects fail closed as invalid request', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const defects = [
    { pageIndex: -1 },
    { startIndex: -1 },
    { selectCount: -1 },
    { maxRects: 0 },
    { pageIndex: 1.5 },
    { startIndex: '0' },
    { selectCount: null },
    { maxRects: '4' },
  ];
  for (const defect of defects) {
    const parameters = { pageIndex: 0, startIndex: 0, selectCount: 8, maxRects: 4, ...defect };
    const result = composePdfTextSelectResult({
      bytes,
      request: requestFor(item, bytes, { capabilityParameters: parameters }),
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_text_select_request');
  }
});

test('select evidence bound to different page, start, or count fails closed as binding mismatch', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    successEvidence({ pageIndex: 1 }),
    successEvidence({ startIndex: 1 }),
    successEvidence({ selectCount: 7, text: 'Signtho' }),
  ]) {
    const result = select(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.text_select_evidence_binding');
  }
});

test('selection range beyond the page character count fails closed', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    successEvidence({ charCount: 4 }),
    successEvidence({ charCount: 7 }),
    successEvidence({ pageCount: 0 }),
  ]) {
    const result = select(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.text_select_evidence_shape');
  }
});

test('selection text length must equal the selected count', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    successEvidence({ text: 'Signtho' }),
    successEvidence({ text: 'Signthos!' }),
    successEvidence({ text: 123 }),
  ]) {
    const result = select(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.text_select_evidence_shape');
  }
});

test('success select-shape defects fail closed without observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    { ...successEvidence(), extra: true },
    { ...successEvidence(), charCount: -1 },
    { ...successEvidence(), unicodeMapError: 'no' },
    { ...successEvidence(), rectCount: -1 },
    { ...successEvidence(), rectsTruncated: 'no' },
  ]) {
    const result = select(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.text_select_evidence_shape');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('rect truthfulness defects fail closed without observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    successEvidence({ rectCount: 6, rectsTruncated: false, rects: [rect()] }),
    successEvidence({ rectCount: 1, rectsTruncated: true, rects: [rect()] }),
    successEvidence({ rects: [rect(), rect()] }),
    successEvidence({ rects: 'rects' }),
    successEvidence({ rects: [{ left: 0, top: 1, right: 2 }] }),
    successEvidence({ rects: [{ left: 0, top: 1, right: 2, bottom: 3, extra: true }] }),
    successEvidence({ rects: [{ left: 5, top: 1, right: 2, bottom: 3 }] }),
    successEvidence({ rects: [{ left: NaN, top: 1, right: 2, bottom: 3 }] }),
  ]) {
    const result = select(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.text_select_evidence_shape');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('unicode and astral-plane selection composes an exact utf8 digest', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const evidence = successEvidence({
    charCount: 8,
    startIndex: 2,
    selectCount: 6,
    text: 'a𝄞b𝄞',
    rects: [],
    rectCount: 0,
  });
  const request = requestFor(item, bytesFor(item), {
    capabilityParameters: { pageIndex: 0, startIndex: 2, selectCount: 6, maxRects: 4 },
  });
  const result = select(item, evidence, { request });
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.observations.textLength, 6);
  assert.deepEqual(result.observations.textDigest, {
    algorithm: 'sha256',
    value: crypto.createHash('sha256').update('a𝄞b𝄞', 'utf8').digest('hex'),
  });
});

test('rejection shape defects fail closed without malformed diagnostics', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    { openSucceeded: false, pdfiumLastError: 2 },
    { openSucceeded: false },
    { openSucceeded: 'no', pdfiumLastError: 3 },
  ]) {
    const result = select(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.text_select_evidence_shape');
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
    get() { getterCalls += 1; return 'text-select:getter'; },
  });
  for (const request of [
    accessor,
    Object.assign(Object.create({ inherited: true }), requestFor(item, bytes)),
  ]) {
    const result = composePdfTextSelectResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_text_select_request');
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
        get() { getterCalls += 1; return 'PDF_TEXT_SELECT_V1'; },
      });
    }),
    accessedRequest((request) => {
      Object.defineProperty(request.capabilityParameters, 'selectCount', {
        enumerable: true,
        get() { getterCalls += 1; return 8; },
      });
    }),
  ];
  for (const request of cases) {
    const result = composePdfTextSelectResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
  }
  assert.equal(getterCalls, 0);
});

test('select observation accessors fail closed without getter execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  let getterCalls = 0;
  const evidence = successEvidence();
  Object.defineProperty(evidence, 'selectCount', {
    enumerable: true,
    get() { getterCalls += 1; return 8; },
  });
  const result = select(item, evidence);
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorCode, 'invalid_input.text_select_evidence_shape');
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
    const result = composePdfTextSelectResult({
      bytes,
      request: input.request,
      availability: AVAILABILITY.AVAILABLE,
      textEvidence: input.textEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
  }
  assert.equal(trapCalls, 0);
});

test('semantic composition is read-only with respect to bytes, request, and select evidence', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const bytesBefore = Buffer.from(bytes);
  const request = requestFor(item, bytes);
  const requestBefore = JSON.stringify(request);
  const evidence = successEvidence();
  const evidenceTextBefore = evidence.text;
  const evidenceShapeBefore = JSON.stringify({ ...evidence, rects: evidence.rects.map((entry) => ({ ...entry })) });
  const result = composePdfTextSelectResult({ bytes, request, availability: AVAILABILITY.AVAILABLE, textEvidence: evidence });
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.deepEqual(bytes, bytesBefore);
  assert.equal(JSON.stringify(request), requestBefore);
  assert.equal(evidence.text, evidenceTextBefore);
  assert.equal(JSON.stringify({ ...evidence, rects: evidence.rects.map((entry) => ({ ...entry })) }), evidenceShapeBefore);
});

test('successful result remains deeply frozen and contains no signature or safety claim', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = select(item, successEvidence());
  assert.ok(Object.isFrozen(result));
  assert.ok(Object.isFrozen(result.observations));
  assert.ok(Object.isFrozen(result.observations.textDigest));
  assert.ok(Object.isFrozen(result.observations.rects));
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
    const result = select(item, evidence);
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
  const nonBuffer = composePdfTextSelectResult({
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
    const result = composePdfTextSelectResult({
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
  const result = composePdfTextSelectResult({
    bytes,
    request: { ...requestFor(item, bytes), debug: true },
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
  });
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorCode, 'invalid_input.pdf_text_select_request');
});

test('qualified runtime terminal evidence maps to distinct fail-closed terminal outcomes', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  for (const [terminalOutcome, errorClass, errorCode] of [
    [TERMINAL_OUTCOME.CANCELLED, STABLE_ERROR.CANCELLED, 'cancelled.pdf_text_select_runtime'],
    [TERMINAL_OUTCOME.TIMED_OUT, STABLE_ERROR.TIMEOUT, 'timeout.pdf_text_select_runtime'],
    [TERMINAL_OUTCOME.RESOURCE_LIMIT_EXCEEDED, STABLE_ERROR.RESOURCE_LIMIT_EXCEEDED, 'resource_limit_exceeded.pdf_text_select_runtime'],
  ]) {
    const result = composePdfTextSelectResult({
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
    { ...base, schema: 'signthos.pdf.text.select.runtime-terminal.v2' },
    { ...base, terminalOutcome: 'FAILED' },
    { ...base, providerId: 'provider:other' },
    { ...base, providerCapabilityVersion: 'signthos.pdf.text.select.v2' },
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
    const result = composePdfTextSelectResult({
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

test('runtime terminal evidence cannot coexist with select success or unavailable provider state', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  const terminalOutcomeEvidence = terminalEvidenceFor(item, bytes, request);

  const conflicting = composePdfTextSelectResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    textEvidence: successEvidence(),
    terminalOutcomeEvidence,
  });
  assert.equal(conflicting.outcome, OUTCOME.FAILED);
  assert.equal(conflicting.stableError.errorCode, 'invalid_input.runtime_terminal_evidence_conflict');

  for (const availability of [AVAILABILITY.UNAVAILABLE, AVAILABILITY.UNKNOWN]) {
    const result = composePdfTextSelectResult({
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
    const result = composePdfTextSelectResult({
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
  const result = composePdfTextSelectResult({
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

test('text select provider source keeps the local-only semantic boundary', () => {
  const source = fs.readFileSync(
    path.join(root, 'packages/providers/src/pdf/browser/pdf-text-select-provider.js'),
    'utf8',
  );
  assert.match(source, /composePdfTextSelectResult/);
  assert.match(source, /PDF_TEXT_SELECT_V1/);
  assert.match(source, /textDigest/);
  for (const forbidden of [
    /require\('..\/pdf-text-select-runtime'\)/,
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
