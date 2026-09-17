'use strict';

const assert = require('node:assert/strict');
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
  TERMINAL_OUTCOME,
} = require('../src/pdf/browser/pdf-text-search-provider');
const { orchestratePdfTextSearch } = require('../src/pdf/browser/pdf-text-search-orchestrator');

const root = path.resolve(__dirname, '../../..');
const fixtureRoot = path.join(root, 'specs/004-local-pdf-core/fixtures/admission');
const manifest = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'manifest.json'), 'utf8'));
const fixture = manifest.records.find((item) => item.fixtureId === 'admission-seed-ordinary-minimal-v1');
assert.ok(fixture, 'missing ordinary minimal admission fixture');

function bytesForFixture() {
  return fs.readFileSync(path.join(root, fixture.repositoryPath));
}

function match(index = 0, length = 4) {
  return { index, length };
}

function successRaw() {
  return {
    openSucceeded: true,
    pageIndex: 0,
    pageCount: 1,
    charCount: 8,
    queryLength: 4,
    matchCount: 2,
    matchesTruncated: false,
    matches: [match(0, 4), match(4, 4)],
  };
}

function requestFor(bytes, overrides = {}) {
  const identity = exactByteIdentity(bytes);
  return {
    operationId: `text-search:${fixture.fixtureId}:orchestrator`,
    capabilityRef: { ...CAPABILITY_REF },
    documentId: `document:${fixture.fixtureId}`,
    inputRevisionId: `revision:${fixture.fixtureId}`,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    inputByteLength: identity.byteLength,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    resourceBudgetRef: 'budget:pdf-text-search-v1:orchestrator-search-test',
    capabilityParameters: { pageIndex: 0, query: 'Sign', maxMatches: 4 },
    ...overrides,
  };
}

function runtimeBindingFor(bytes, request, overrides = {}) {
  const identity = exactByteIdentity(bytes);
  return {
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    byteLength: identity.byteLength,
    resourceBudgetRef: request.resourceBudgetRef,
    ...overrides,
  };
}

function quietControl(counters = {}) {
  return {
    subscribe() {
      counters.subscribe = (counters.subscribe || 0) + 1;
      return () => { counters.dispose = (counters.dispose || 0) + 1; };
    },
  };
}

function synchronousTerminalControl(terminalOutcome, counters = {}) {
  return {
    subscribe(callback) {
      counters.subscribe = (counters.subscribe || 0) + 1;
      callback({ terminalOutcome });
      return () => { counters.dispose = (counters.dispose || 0) + 1; };
    },
  };
}

function optionsFor(overrides = {}) {
  const bytes = overrides.bytes ?? bytesForFixture();
  const request = overrides.request ?? requestFor(bytes);
  return {
    bytes,
    request,
    availability: overrides.availability ?? AVAILABILITY.AVAILABLE,
    runtimeBinding: overrides.runtimeBinding ?? runtimeBindingFor(bytes, request),
    runRuntime: overrides.runRuntime ?? (async () => successRaw()),
    terminalControl: overrides.terminalControl ?? quietControl(),
    terminateRuntime: overrides.terminateRuntime ?? (async () => ({
      runtimeEvidenceRef: 'runtime-evidence:orchestrator-search-test',
      partialOutputDiscarded: true,
    })),
  };
}

test('completed runtime is supervised once and composed into canonical semantic success', async () => {
  const counters = {};
  const result = await orchestratePdfTextSearch(optionsFor({
    runRuntime: async () => {
      counters.runRuntime = (counters.runRuntime || 0) + 1;
      return successRaw();
    },
    terminalControl: quietControl(counters),
    terminateRuntime: async () => {
      counters.terminateRuntime = (counters.terminateRuntime || 0) + 1;
      return { runtimeEvidenceRef: 'unused', partialOutputDiscarded: true };
    },
  }));

  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.observations.pageCount, 1);
  assert.equal(result.observations.charCount, 8);
  assert.equal(result.observations.queryLength, 4);
  assert.equal(result.observations.matchCount, 2);
  assert.equal(result.observations.matchesTruncated, false);
  assert.deepEqual(result.observations.matches, [match(0, 4), match(4, 4)]);
  assert.equal(counters.runRuntime, 1);
  assert.equal(counters.subscribe, 1);
  assert.equal(counters.dispose, 1);
  assert.equal(counters.terminateRuntime || 0, 0);
  assert.ok(Object.isFrozen(result));
});

test('qualified raw format rejection is composed into canonical malformed-document semantics', async () => {
  const result = await orchestratePdfTextSearch(optionsFor({
    runRuntime: async () => ({ openSucceeded: false, pdfiumLastError: 3 }),
  }));
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorClass, STABLE_ERROR.MALFORMED_UNTRUSTED_DOCUMENT);
  assert.equal(result.stableError.errorCode, 'malformed_untrusted_document.pdfium_format_or_corruption');
});

for (const [terminalOutcome, errorClass] of [
  [TERMINAL_OUTCOME.CANCELLED, STABLE_ERROR.CANCELLED],
  [TERMINAL_OUTCOME.TIMED_OUT, STABLE_ERROR.TIMEOUT],
  [TERMINAL_OUTCOME.RESOURCE_LIMIT_EXCEEDED, STABLE_ERROR.RESOURCE_LIMIT_EXCEEDED],
]) {
  test(`synchronous terminal ${terminalOutcome} prevents runtime start and composes canonical terminal semantics`, async () => {
    const counters = {};
    const result = await orchestratePdfTextSearch(optionsFor({
      terminalControl: synchronousTerminalControl(terminalOutcome, counters),
      runRuntime: async () => {
        counters.runRuntime = (counters.runRuntime || 0) + 1;
        return { ...successRaw(), pageCount: 999 };
      },
      terminateRuntime: async ({ terminalOutcome: received }) => {
        counters.terminateRuntime = (counters.terminateRuntime || 0) + 1;
        assert.equal(received, terminalOutcome);
        return {
          runtimeEvidenceRef: `runtime-evidence:${terminalOutcome}`,
          partialOutputDiscarded: true,
        };
      },
    }));

    assert.equal(result.outcome, terminalOutcome);
    assert.equal(result.stableError.errorClass, errorClass);
    assert.equal(counters.runRuntime || 0, 0);
    assert.equal(counters.terminateRuntime, 1);
    assert.equal(counters.subscribe, 1);
    assert.equal(counters.dispose, 1);
    assert.equal('observations' in result, false);
  });
}

test('runtime rejection propagates unchanged without semantic substitution', async () => {
  const runtimeFailure = new Error('fake runtime failure');
  await assert.rejects(
    orchestratePdfTextSearch(optionsFor({
      runRuntime: async () => { throw runtimeFailure; },
    })),
    (error) => error === runtimeFailure,
  );
});

test('malformed runtime completion fails in supervision before semantic composition', async () => {
  await assert.rejects(
    orchestratePdfTextSearch(optionsFor({
      runRuntime: async () => ({ ...successRaw(), charCount: -1 }),
    })),
    /invalid search fields/,
  );
});

test('termination rejection propagates and is not retried', async () => {
  const failure = new Error('fake termination failure');
  let terminateCalls = 0;
  await assert.rejects(
    orchestratePdfTextSearch(optionsFor({
      terminalControl: synchronousTerminalControl(TERMINAL_OUTCOME.CANCELLED),
      terminateRuntime: async () => {
        terminateCalls += 1;
        throw failure;
      },
    })),
    (error) => error === failure,
  );
  assert.equal(terminateCalls, 1);
});

test('disposer rejection propagates after runtime completion before semantic composition', async () => {
  const terminalControl = {
    subscribe() {
      return () => { throw new Error('fake disposer failure'); };
    },
  };
  await assert.rejects(
    orchestratePdfTextSearch(optionsFor({ terminalControl })),
    /fake disposer failure/,
  );
});

test('provider-owned semantic request defect is handled after successful supervision', async () => {
  const bytes = bytesForFixture();
  const validRequest = requestFor(bytes);
  const result = await orchestratePdfTextSearch(optionsFor({
    bytes,
    request: { ...validRequest, operationId: '' },
    runtimeBinding: runtimeBindingFor(bytes, validRequest),
  }));
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.pdf_text_search_request');
});

test('runtime binding mismatch fails before runRuntime is invoked', async () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes);
  let runtimeCalls = 0;
  await assert.rejects(
    orchestratePdfTextSearch(optionsFor({
      bytes,
      request,
      runtimeBinding: runtimeBindingFor(bytes, request, { resourceBudgetRef: 'budget:mismatch' }),
      runRuntime: async () => {
        runtimeCalls += 1;
        return successRaw();
      },
    })),
    /do not describe the same PDF text search operation/,
  );
  assert.equal(runtimeCalls, 0);
});

test('orchestrator requires Buffer bytes before subscribing or starting runtime', async () => {
  const buffer = bytesForFixture();
  const bytes = new Uint8Array(buffer);
  const request = requestFor(buffer);
  const counters = {};
  await assert.rejects(
    orchestratePdfTextSearch(optionsFor({
      bytes,
      request,
      runtimeBinding: runtimeBindingFor(buffer, request),
      terminalControl: quietControl(counters),
      runRuntime: async () => { counters.runRuntime = 1; return successRaw(); },
    })),
    /bytes must be a Buffer/,
  );
  assert.equal(counters.subscribe || 0, 0);
  assert.equal(counters.runRuntime || 0, 0);
});

test('top-level proxy options fail without executing proxy traps', async () => {
  let traps = 0;
  const proxy = new Proxy(optionsFor(), {
    getPrototypeOf() { traps += 1; throw new Error('trap executed'); },
    ownKeys() { traps += 1; throw new Error('trap executed'); },
    getOwnPropertyDescriptor() { traps += 1; throw new Error('trap executed'); },
  });
  await assert.rejects(orchestratePdfTextSearch(proxy), /qualified own data fields/);
  assert.equal(traps, 0);
});

test('top-level accessor, symbol, extra-key, and custom-prototype options fail before runtime effects', async () => {
  let runtimeCalls = 0;
  const base = optionsFor({ runRuntime: async () => { runtimeCalls += 1; return successRaw(); } });
  let getterCalls = 0;
  const accessor = { ...base };
  Object.defineProperty(accessor, 'availability', {
    enumerable: true,
    get() { getterCalls += 1; throw new Error('getter executed'); },
  });
  const cases = [
    accessor,
    { ...base, extra: true },
    Object.assign({ ...base }, { [Symbol('extra')]: true }),
    Object.assign(Object.create({ inherited: true }), base),
  ];
  for (const value of cases) {
    await assert.rejects(orchestratePdfTextSearch(value), /qualified own data fields/);
  }
  assert.equal(getterCalls, 0);
  assert.equal(runtimeCalls, 0);
});

test('null-prototype top-level options remain accepted when all fields are qualified', async () => {
  const options = Object.assign(Object.create(null), optionsFor());
  const result = await orchestratePdfTextSearch(options);
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
});

test('caller-owned bytes, request, binding, and control references are not mutated or frozen in place', async () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes);
  const binding = runtimeBindingFor(bytes, request);
  const counters = {};
  const control = quietControl(counters);
  const bytesBefore = Buffer.from(bytes);
  const requestBefore = JSON.stringify(request);
  const bindingBefore = JSON.stringify(binding);

  const result = await orchestratePdfTextSearch(optionsFor({
    bytes,
    request,
    runtimeBinding: binding,
    terminalControl: control,
  }));

  assert.deepEqual(bytes, bytesBefore);
  assert.equal(JSON.stringify(request), requestBefore);
  assert.equal(JSON.stringify(binding), bindingBefore);
  assert.equal(Object.isFrozen(request), false);
  assert.equal(Object.isFrozen(binding), false);
  assert.equal(Object.isFrozen(control), false);
  assert.ok(Object.isFrozen(result));
});

test('source imports only supervisor and semantic bridge and contains no direct runtime or external execution surface', () => {
  const source = fs.readFileSync(
    path.join(root, 'packages/providers/src/pdf/browser/pdf-text-search-orchestrator.js'),
    'utf8',
  );
  assert.match(source, /require\('\.\/pdf-text-search-runtime-supervisor'\)/);
  assert.match(source, /require\('\.\/pdf-text-search-runtime-bridge'\)/);
  for (const forbidden of [
    /require\('\.\/pdf-text-runtime'\)/,
    /extractPdfPageTextWithLocalWasm/,
    /searchPdfPageTextWithLocalWasm/,
    /orchestratePdfText\(/,
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

test('every cross-layer request/runtime-binding identity field mismatch fails before runtime effects', async () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes);
  const identity = exactByteIdentity(bytes);
  const mismatches = [
    { providerId: 'provider:mismatch' },
    { providerCapabilityVersion: 'capability:mismatch' },
    { byteLength: bytes.length + 1 },
    { resourceBudgetRef: 'budget:mismatch' },
    { inputExactBytesDigest: { algorithm: 'sha256', value: `${identity.inputExactBytesDigest.value}00` } },
    { inputExactBytesDigest: { algorithm: 'sha512', value: identity.inputExactBytesDigest.value } },
  ];

  for (const mismatch of mismatches) {
    let runtimeCalls = 0;
    await assert.rejects(
      orchestratePdfTextSearch(optionsFor({
        bytes,
        request,
        runtimeBinding: { ...runtimeBindingFor(bytes, request), ...mismatch },
        runRuntime: async () => {
          runtimeCalls += 1;
          return successRaw();
        },
      })),
      /do not describe the same PDF text search operation/,
    );
    assert.equal(runtimeCalls, 0);
  }
});

test('unsafe semantic request and runtime binding containers fail before runtime effects', async () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes);
  const binding = runtimeBindingFor(bytes, request);
  let runtimeCalls = 0;
  const runRuntime = async () => {
    runtimeCalls += 1;
    return successRaw();
  };

  let getterCalls = 0;
  const accessorRequest = { ...request };
  Object.defineProperty(accessorRequest, 'operationId', {
    enumerable: true,
    get() { getterCalls += 1; throw new Error('getter executed'); },
  });

  const unsafeRequests = [
    new Proxy(request, {}),
    accessorRequest,
    Object.assign({ ...request }, { [Symbol('extra')]: true }),
    Object.assign(Object.create({ inherited: true }), request),
  ];
  for (const unsafeRequest of unsafeRequests) {
    await assert.rejects(
      orchestratePdfTextSearch(optionsFor({ bytes, request: unsafeRequest, runtimeBinding: binding, runRuntime })),
      /safe own-data objects/,
    );
  }

  const accessorBinding = { ...binding };
  Object.defineProperty(accessorBinding, 'resourceBudgetRef', {
    enumerable: true,
    get() { getterCalls += 1; throw new Error('getter executed'); },
  });
  const unsafeBindings = [
    new Proxy(binding, {}),
    accessorBinding,
    Object.assign({ ...binding }, { [Symbol('extra')]: true }),
    Object.assign(Object.create({ inherited: true }), binding),
  ];
  for (const unsafeBinding of unsafeBindings) {
    await assert.rejects(
      orchestratePdfTextSearch(optionsFor({ bytes, request, runtimeBinding: unsafeBinding, runRuntime })),
      /safe own-data objects/,
    );
  }

  assert.equal(getterCalls, 0);
  assert.equal(runtimeCalls, 0);
});

test('unsafe nested digest shapes fail before runtime effects', async () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes);
  const binding = runtimeBindingFor(bytes, request);
  let runtimeCalls = 0;
  const runRuntime = async () => {
    runtimeCalls += 1;
    return successRaw();
  };

  const badRequests = [
    { ...request, inputExactBytesDigest: new Proxy(request.inputExactBytesDigest, {}) },
    { ...request, inputExactBytesDigest: { ...request.inputExactBytesDigest, extra: true } },
    { ...request, inputExactBytesDigest: Object.assign({ ...request.inputExactBytesDigest }, { [Symbol('extra')]: true }) },
  ];
  for (const badRequest of badRequests) {
    await assert.rejects(
      orchestratePdfTextSearch(optionsFor({ bytes, request: badRequest, runtimeBinding: binding, runRuntime })),
      /do not describe the same PDF text search operation/,
    );
  }
  assert.equal(runtimeCalls, 0);
});

test('request identity mutations during runtime are rejected after supervision before semantic composition', async () => {
  const mutationCases = [
    ['providerId', (request) => { request.providerId = 'provider:mutated-during-runtime'; }],
    ['providerCapabilityVersion', (request) => { request.providerCapabilityVersion = 'capability:mutated-during-runtime'; }],
    ['inputByteLength', (request) => { request.inputByteLength += 1; }],
    ['resourceBudgetRef', (request) => { request.resourceBudgetRef = 'budget:mutated-during-runtime'; }],
    ['inputExactBytesDigest.algorithm', (request) => { request.inputExactBytesDigest.algorithm = 'sha512'; }],
    ['inputExactBytesDigest.value', (request) => { request.inputExactBytesDigest.value = `${request.inputExactBytesDigest.value}00`; }],
  ];

  for (const [label, mutate] of mutationCases) {
    const bytes = bytesForFixture();
    const request = requestFor(bytes);
    const runtimeBinding = runtimeBindingFor(bytes, request);
    const counters = {};

    await assert.rejects(
      orchestratePdfTextSearch(optionsFor({
        bytes,
        request,
        runtimeBinding,
        terminalControl: quietControl(counters),
        runRuntime: async () => {
          counters.runRuntime = (counters.runRuntime || 0) + 1;
          mutate(request);
          return successRaw();
        },
      })),
      /do not describe the same PDF text search operation/,
      label,
    );

    assert.equal(counters.runRuntime, 1, label);
    assert.equal(counters.subscribe, 1, label);
    assert.equal(counters.dispose, 1, label);
  }
});

test('request identity mutation during terminal termination is rejected after supervision', async () => {
  const bytes = bytesForFixture();
  const request = requestFor(bytes);
  const runtimeBinding = runtimeBindingFor(bytes, request);
  const counters = {};

  await assert.rejects(
    orchestratePdfTextSearch(optionsFor({
      bytes,
      request,
      runtimeBinding,
      terminalControl: synchronousTerminalControl(TERMINAL_OUTCOME.CANCELLED, counters),
      runRuntime: async () => {
        counters.runRuntime = (counters.runRuntime || 0) + 1;
        return successRaw();
      },
      terminateRuntime: async () => {
        counters.terminateRuntime = (counters.terminateRuntime || 0) + 1;
        request.resourceBudgetRef = 'budget:mutated-during-termination';
        return {
          runtimeEvidenceRef: 'runtime-evidence:mutating-termination',
          partialOutputDiscarded: true,
        };
      },
    })),
    /do not describe the same PDF text search operation/,
  );

  assert.equal(counters.runRuntime || 0, 0);
  assert.equal(counters.terminateRuntime, 1);
  assert.equal(counters.subscribe, 1);
  assert.equal(counters.dispose, 1);
});
