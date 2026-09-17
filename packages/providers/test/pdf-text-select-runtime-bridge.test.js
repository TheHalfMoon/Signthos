'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { exactByteIdentity } = require('../src/content-identity-admission');
const {
  AVAILABILITY,
  CAPABILITY_REF,
  OUTCOME,
  PROVIDER_CAPABILITY_VERSION,
  PROVIDER_DESCRIPTOR,
  STABLE_ERROR,
  TERMINAL_EVIDENCE_SCHEMA,
  TERMINAL_OUTCOME,
} = require('../src/pdf/browser/pdf-text-select-provider');
const { SUPERVISOR_KIND } = require('../src/pdf/browser/pdf-text-select-runtime-supervisor');
const { composeSupervisedPdfTextSelectResult } = require('../src/pdf/browser/pdf-text-select-runtime-bridge');

const root = path.resolve(__dirname, '../../..');
const fixtureRoot = path.join(root, 'specs/004-local-pdf-core/fixtures/admission');
const manifest = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'manifest.json'), 'utf8'));
const fixture = manifest.records.find((item) => item.fixtureId === 'admission-seed-ordinary-minimal-v1');
assert.ok(fixture, 'missing ordinary minimal admission fixture');

function bytesForFixture() {
  return fs.readFileSync(path.join(root, fixture.repositoryPath));
}

function requestFor(bytes, overrides = {}) {
  const identity = exactByteIdentity(bytes);
  return {
    operationId: `text-select:${fixture.fixtureId}:bridge`,
    capabilityRef: { ...CAPABILITY_REF },
    documentId: `document:${fixture.fixtureId}`,
    inputRevisionId: `revision:${fixture.fixtureId}`,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    inputByteLength: identity.byteLength,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    resourceBudgetRef: 'budget:pdf-text-select-v1:bridge-test',
    capabilityParameters: { pageIndex: 0, startIndex: 0, selectCount: 8, maxRects: 4 },
    ...overrides,
  };
}

function rect(index = 0) {
  return { left: index, top: index + 1, right: index + 2, bottom: index + 3 };
}

function selectRaw(overrides = {}) {
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

function completed(rawObservation) {
  return {
    kind: SUPERVISOR_KIND.RUNTIME_COMPLETED,
    rawObservation,
  };
}

function terminalEvidenceFor(bytes, request, terminalOutcome = TERMINAL_OUTCOME.CANCELLED, overrides = {}) {
  const identity = exactByteIdentity(bytes);
  return {
    schema: TERMINAL_EVIDENCE_SCHEMA,
    terminalOutcome,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    byteLength: identity.byteLength,
    resourceBudgetRef: request.resourceBudgetRef,
    runtimeEvidenceRef: `runtime-evidence:${fixture.fixtureId}:bridge`,
    partialOutputDiscarded: true,
    ...overrides,
  };
}

function terminal(terminalOutcomeEvidence) {
  return {
    kind: SUPERVISOR_KIND.RUNTIME_TERMINAL,
    terminalOutcomeEvidence,
  };
}

function compose(supervisedResult, overrides = {}) {
  const bytes = overrides.bytes ?? bytesForFixture();
  const request = overrides.request ?? requestFor(bytes);
  return composeSupervisedPdfTextSelectResult({
    bytes,
    request,
    availability: overrides.availability ?? AVAILABILITY.AVAILABLE,
    supervisedResult,
  });
}

test('runtime completion maps canonical raw selection success into semantic success with text digest', () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes);
  const raw = selectRaw();
  const result = composeSupervisedPdfTextSelectResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    supervisedResult: completed(raw),
  });

  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
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
    value: crypto.createHash('sha256').update(raw.text, 'utf8').digest('hex'),
  });
  assert.deepEqual(result.observations.rects, [rect()]);
  assert.equal(result.providerId, PROVIDER_DESCRIPTOR.providerId);
  assert.equal(result.resourceBudgetRef, request.resourceBudgetRef);
  assert.equal(result.newCanonicalRevisionCreated, false);
  assert.ok(Object.isFrozen(result));
  assert.ok(Object.isFrozen(result.observations));
});

test('runtime completion maps qualified PDFium format rejection into canonical malformed-document semantics', () => {
  const result = compose(completed({ openSucceeded: false, pdfiumLastError: 3 }));
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorClass, STABLE_ERROR.MALFORMED_UNTRUSTED_DOCUMENT);
  assert.equal(result.stableError.errorCode, 'malformed_untrusted_document.pdfium_format_or_corruption');
  assert.equal(result.newCanonicalRevisionCreated, false);
  assert.equal('observations' in result, false);
});

for (const [terminalOutcome, errorClass, errorCode] of [
  [TERMINAL_OUTCOME.CANCELLED, STABLE_ERROR.CANCELLED, 'cancelled.pdf_text_select_runtime'],
  [TERMINAL_OUTCOME.TIMED_OUT, STABLE_ERROR.TIMEOUT, 'timeout.pdf_text_select_runtime'],
  [TERMINAL_OUTCOME.RESOURCE_LIMIT_EXCEEDED, STABLE_ERROR.RESOURCE_LIMIT_EXCEEDED, 'resource_limit_exceeded.pdf_text_select_runtime'],
]) {
  test(`runtime terminal ${terminalOutcome} is preserved through canonical semantic composition`, () => {
    const bytes = bytesForFixture();
    const request = requestFor(bytes);
    const evidence = terminalEvidenceFor(bytes, request, terminalOutcome);
    const result = composeSupervisedPdfTextSelectResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      supervisedResult: terminal(evidence),
    });

    assert.equal(result.outcome, terminalOutcome);
    assert.equal(result.stableError.errorClass, errorClass);
    assert.equal(result.stableError.errorCode, errorCode);
    assert.deepEqual(result.runtimeTerminalEvidence, {
      schema: TERMINAL_EVIDENCE_SCHEMA,
      runtimeEvidenceRef: evidence.runtimeEvidenceRef,
      partialOutputDiscarded: true,
    });
    assert.equal('observations' in result, false);
    assert.ok(Object.isFrozen(result));
    assert.ok(Object.isFrozen(result.runtimeTerminalEvidence));
  });
}

test('terminal path preserves provider availability contradiction semantics instead of inventing a result', () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes);
  const result = composeSupervisedPdfTextSelectResult({
    bytes,
    request,
    availability: AVAILABILITY.UNAVAILABLE,
    supervisedResult: terminal(terminalEvidenceFor(bytes, request)),
  });
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.runtime_terminal_availability_conflict');
});

test('completed path preserves canonical unavailable semantics without selection publication', () => {
  const result = compose(completed(selectRaw()), {
    availability: AVAILABILITY.UNKNOWN,
  });
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorClass, STABLE_ERROR.UNAVAILABLE);
  assert.equal(result.stableError.errorCode, 'unavailable.pdf_text_select_provider');
});

test('semantic request byte mismatch remains a canonical invalid-input result', () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes, { inputByteLength: bytes.length + 1 });
  const result = composeSupervisedPdfTextSelectResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    supervisedResult: completed(selectRaw()),
  });
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.pdf_text_select_request');
});

test('bridge requires Buffer bytes at the semantic boundary', () => {
  const bytes = bytesForFixture();
  assert.throws(() => composeSupervisedPdfTextSelectResult({
    bytes: new Uint8Array(bytes),
    request: requestFor(bytes),
    availability: AVAILABILITY.AVAILABLE,
    supervisedResult: completed(selectRaw()),
  }), /bytes must be a Buffer/);
});

test('unknown, extra-key, symbol-bearing, and custom-prototype supervisor envelopes fail closed', () => {
  const cases = [
    { kind: 'UNKNOWN', rawObservation: selectRaw() },
    { kind: SUPERVISOR_KIND.RUNTIME_COMPLETED, rawObservation: selectRaw(), extra: true },
    Object.assign({ kind: SUPERVISOR_KIND.RUNTIME_COMPLETED, rawObservation: selectRaw() }, { [Symbol('extra')]: true }),
    Object.assign(Object.create({ inherited: true }), { kind: SUPERVISOR_KIND.RUNTIME_COMPLETED, rawObservation: selectRaw() }),
  ];
  for (const value of cases) {
    assert.throws(() => compose(value), TypeError);
  }
});

test('proxy-backed supervisor envelope is rejected without executing proxy traps', () => {
  let traps = 0;
  const proxy = new Proxy(completed(selectRaw()), {
    getPrototypeOf() { traps += 1; throw new Error('trap executed'); },
    ownKeys() { traps += 1; throw new Error('trap executed'); },
    getOwnPropertyDescriptor() { traps += 1; throw new Error('trap executed'); },
  });
  assert.throws(() => compose(proxy), /strict plain supervisor envelope/);
  assert.equal(traps, 0);
});

test('accessor-backed supervisor kind is rejected without invoking the getter', () => {
  let getterCalls = 0;
  const envelope = { rawObservation: selectRaw() };
  Object.defineProperty(envelope, 'kind', {
    enumerable: true,
    get() { getterCalls += 1; throw new Error('getter executed'); },
  });
  assert.throws(() => compose(envelope), /unknown supervisor kind/);
  assert.equal(getterCalls, 0);
});

test('malformed raw selection observations fail before the provider can traverse unsafe values', () => {
  let proxyTraps = 0;
  const proxyRaw = new Proxy(selectRaw(), {
    getPrototypeOf() { proxyTraps += 1; throw new Error('trap executed'); },
    ownKeys() { proxyTraps += 1; throw new Error('trap executed'); },
  });

  let getterCalls = 0;
  const accessorRaw = selectRaw();
  delete accessorRaw.openSucceeded;
  Object.defineProperty(accessorRaw, 'openSucceeded', {
    enumerable: true,
    get() { getterCalls += 1; throw new Error('getter executed'); },
  });

  for (const rawObservation of [
    proxyRaw,
    accessorRaw,
    { ...selectRaw(), extra: true },
    Object.assign(selectRaw(), { [Symbol('extra')]: true }),
    Object.assign(Object.create({ inherited: true }), selectRaw()),
    { ...selectRaw(), charCount: -1 },
    { ...selectRaw(), startIndex: -1 },
    { ...selectRaw(), rectCount: -1 },
    { ...selectRaw(), rectsTruncated: 'yes' },
    { ...selectRaw(), text: 123 },
    { ...selectRaw(), text: Buffer.from('Signthos') },
    { ...selectRaw(), rects: 'rects' },
    { ...selectRaw(), rects: [{ left: 0, top: 1, right: 2 }] },
    { openSucceeded: false, pdfiumLastError: 2 },
  ]) {
    assert.throws(() => compose(completed(rawObservation)), TypeError);
  }
  assert.equal(proxyTraps, 0);
  assert.equal(getterCalls, 0);
});

test('proxy-backed and accessor-backed terminal evidence fail without executing unsafe traps or getters', () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes);
  const baseEvidence = terminalEvidenceFor(bytes, request);

  let proxyTraps = 0;
  const proxyEvidence = new Proxy(baseEvidence, {
    getPrototypeOf() { proxyTraps += 1; throw new Error('trap executed'); },
    ownKeys() { proxyTraps += 1; throw new Error('trap executed'); },
  });
  assert.throws(() => compose(terminal(proxyEvidence), { bytes, request }), /terminal evidence has an invalid shape/);
  assert.equal(proxyTraps, 0);

  let getterCalls = 0;
  const accessorEvidence = { ...baseEvidence };
  Object.defineProperty(accessorEvidence, 'runtimeEvidenceRef', {
    enumerable: true,
    get() { getterCalls += 1; throw new Error('getter executed'); },
  });
  assert.throws(() => compose(terminal(accessorEvidence), { bytes, request }), /terminal evidence has an invalid shape/);
  assert.equal(getterCalls, 0);
});

test('terminal evidence extra keys, symbols, and malformed digest shapes fail at the bridge boundary', () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes);
  const base = terminalEvidenceFor(bytes, request);
  const cases = [
    { ...base, extra: true },
    Object.assign({ ...base }, { [Symbol('extra')]: true }),
    { ...base, inputExactBytesDigest: { ...base.inputExactBytesDigest, extra: true } },
  ];
  for (const evidence of cases) {
    assert.throws(() => compose(terminal(evidence), { bytes, request }), TypeError);
  }
});

test('well-shaped but semantically mismatched terminal evidence is rejected by the canonical provider', () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes);
  const evidence = terminalEvidenceFor(bytes, request, TERMINAL_OUTCOME.CANCELLED, {
    resourceBudgetRef: 'budget:mismatch',
  });
  const result = compose(terminal(evidence), { bytes, request });
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.runtime_terminal_evidence');
});

test('bridge does not mutate caller bytes, request, or supervised predecessor evidence', () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes);
  const rawObservation = selectRaw();
  const envelope = completed(rawObservation);
  const bytesBefore = Buffer.from(bytes);
  const requestBefore = JSON.stringify(request);
  const envelopeBefore = JSON.stringify(envelope);

  const result = composeSupervisedPdfTextSelectResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    supervisedResult: envelope,
  });

  assert.deepEqual(bytes, bytesBefore);
  assert.equal(JSON.stringify(request), requestBefore);
  assert.equal(JSON.stringify(envelope), envelopeBefore);
  assert.equal(Object.isFrozen(request), false);
  assert.equal(Object.isFrozen(rawObservation), false);
  assert.ok(Object.isFrozen(result));
});

test('bridge source contains no runtime, PDFium, browser, timer, network, or dependency execution surface', () => {
  const sourcePath = path.join(root, 'packages/providers/src/pdf/browser/pdf-text-select-runtime-bridge.js');
  const source = fs.readFileSync(sourcePath, 'utf8');
  for (const forbidden of [
    /extractPdfPageTextWithLocalWasm/,
    /selectPdfPageTextWithLocalWasm/,
    /supervisePdfTextSelectRuntime\s*\(/,
    /@embedpdf\/pdfium/,
    /PDFiumExt_Init/,
    /\bFPDF_/,
    /\bWebAssembly\b/,
    /\bfetch\s*\(/,
    /XMLHttpRequest/,
    /\bWorker\s*\(/,
    /importScripts/,
    /child_process/,
    /setTimeout\s*\(/,
    /setInterval\s*\(/,
    /https?:\/\//,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
});

test('null-prototype completed envelope and raw observation remain accepted', () => {
  const rawObservation = Object.assign(Object.create(null), selectRaw());
  const envelope = Object.assign(Object.create(null), {
    kind: SUPERVISOR_KIND.RUNTIME_COMPLETED,
    rawObservation,
  });
  const result = compose(envelope);
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.observations.pageIndex, 0);
});
