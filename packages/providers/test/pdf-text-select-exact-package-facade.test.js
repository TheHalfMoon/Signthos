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
  TERMINAL_OUTCOME,
} = require('../src/pdf/browser/pdf-text-select-provider');
const {
  selectPdfPageTextWithExactPackageSupervisedSemantics,
} = require('../src/pdf/browser/pdf-text-select-exact-package-facade');

const root = path.resolve(__dirname, '../../..');
const fixtureRoot = path.join(root, 'specs/004-local-pdf-core/fixtures/admission');
const manifest = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'manifest.json'), 'utf8'));
const fixture = manifest.records.find((item) => item.fixtureId === 'admission-seed-ordinary-minimal-v1');
assert.ok(fixture, 'missing ordinary minimal admission fixture');

const EXPECTED_FIXTURE_SHA256 = 'd88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207';
const EXPECTED_WASM_SHA256 = 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8';

function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function exactPackagePaths() {
  const mainPath = require.resolve('@embedpdf/pdfium');
  const packageRoot = path.resolve(path.dirname(mainPath), '..');
  return {
    packageJson: path.join(packageRoot, 'package.json'),
    wasm: path.join(packageRoot, 'dist/pdfium.wasm'),
  };
}

const { wasm: REAL_WASM_PATH } = exactPackagePaths();
const REAL_WASM_BYTES = fs.readFileSync(REAL_WASM_PATH);
assert.equal(sha256(REAL_WASM_BYTES), EXPECTED_WASM_SHA256, 'unexpected exact local PDFium WASM identity');

function bytesForFixture() {
  return fs.readFileSync(path.join(root, fixture.repositoryPath));
}

function requestFor(bytes, overrides = {}) {
  const identity = exactByteIdentity(bytes);
  return {
    operationId: `text-select:${fixture.fixtureId}:exact-package-facade`,
    capabilityRef: { ...CAPABILITY_REF },
    documentId: `document:${fixture.fixtureId}`,
    inputRevisionId: `revision:${fixture.fixtureId}`,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    inputByteLength: identity.byteLength,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    resourceBudgetRef: 'budget:pdf-text-select-v1:exact-package-facade-test',
    capabilityParameters: { pageIndex: 0, startIndex: 0, selectCount: 8, maxRects: 4 },
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

function syntheticWasm() {
  return Uint8Array.of(7, 7, 7, 7);
}

function optionsFor(overrides = {}) {
  const bytes = overrides.bytes ?? bytesForFixture();
  const request = overrides.request ?? requestFor(bytes);
  return {
    bytes,
    request,
    availability: overrides.availability ?? AVAILABILITY.AVAILABLE,
    runtimeBinding: overrides.runtimeBinding ?? runtimeBindingFor(bytes, request),
    wasmBinary: overrides.wasmBinary ?? syntheticWasm(),
    pageIndex: overrides.pageIndex ?? 0,
    startIndex: overrides.startIndex ?? 0,
    selectCount: overrides.selectCount ?? 8,
    maxRects: overrides.maxRects ?? 4,
    terminalControl: overrides.terminalControl ?? quietControl(),
    terminateRuntime: overrides.terminateRuntime ?? (async () => ({
      runtimeEvidenceRef: 'runtime-evidence:exact-package-facade-test',
      partialOutputDiscarded: true,
    })),
  };
}

test('facade module exposes only the bounded text function', () => {
  const facade = require('../src/pdf/browser/pdf-text-select-exact-package-facade');
  assert.deepEqual(Reflect.ownKeys(facade), ['selectPdfPageTextWithExactPackageSupervisedSemantics']);
  assert.equal(typeof selectPdfPageTextWithExactPackageSupervisedSemantics, 'function');
  assert.equal(Object.isFrozen(facade), true);
});

test('facade source composes only canonical orchestrator and exact package binding', () => {
  const source = fs.readFileSync(
    path.join(root, 'packages/providers/src/pdf/browser/pdf-text-select-exact-package-facade.js'),
    'utf8',
  );
  assert.match(source, /require\('\.\/pdf-text-select-orchestrator'\)/);
  assert.match(source, /require\('\.\/pdf-text-select-runtime-binding'\)/);
  assert.match(source, /orchestratePdfTextSelect\(/);
  assert.equal(source.match(/selectPdfPageTextWithExactPdfiumPackage\(/g).length, 1);
  for (const forbidden of [
    /require\('\.\/pdf-text-runtime'\)/,
    /extractPdfPageTextWithLocalWasm/,
    /selectPdfPageTextWithLocalWasm/,
    /extractPdfPageTextWithExactPdfiumPackage\(/,
    /orchestratePdfText\(/,
    /initPdfium/,
    /@embedpdf\/pdfium/,
    /PDFiumExt_Init/,
    /\bFPDF_/,
    /\bWebAssembly\b/,
    /DEFAULT_PDFIUM_WASM_URL/,
    /\bfetch\s*\(/,
    /XMLHttpRequest/,
    /\bWorker\s*\(/,
    /importScripts/,
    /child_process/,
    /setTimeout\s*\(/,
    /setInterval\s*\(/,
    /https?:\/\//,
    /node:fs/,
    /node:path/,
    /readFileSync/,
    /\bURL\b/,
    /cdn/i,
    /asset/i,
    /resolv/i,
    /font/i,
    /thumbnail/i,
    /render/i,
    /extract/i,
    /inspect/i,
    /search/i,
    /selectPdfPageTextWithLocalWasm/,
    /extractPdfPageTextWithExactPdfiumPackage\(/,
    /orchestratePdfText\(/,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
});

test('facade binds exactly one runRuntime closure over the same caller inputs', () => {
  const source = fs.readFileSync(
    path.join(root, 'packages/providers/src/pdf/browser/pdf-text-select-exact-package-facade.js'),
    'utf8',
  );
  assert.equal(source.match(/const runRuntime = /g).length, 1);
  assert.match(
    source,
    /const runRuntime = \(\) => selectPdfPageTextWithExactPdfiumPackage\(\{\s*bytes,\s*wasmBinary,\s*pageIndex,\s*startIndex,\s*selectCount,\s*maxRects\s*\}\)/,
  );
  assert.match(
    source,
    /orchestratePdfTextSelect\(\{[\s\S]*?bytes,[\s\S]*?request,[\s\S]*?availability,[\s\S]*?runtimeBinding,[\s\S]*?runRuntime,[\s\S]*?terminalControl,[\s\S]*?terminateRuntime,?[\s\S]*?\}\)/,
  );
});

test('top-level proxy options fail without executing proxy traps', async () => {
  let traps = 0;
  const proxy = new Proxy(optionsFor(), {
    getPrototypeOf() { traps += 1; throw new Error('trap executed'); },
    ownKeys() { traps += 1; throw new Error('trap executed'); },
    getOwnPropertyDescriptor() { traps += 1; throw new Error('trap executed'); },
  });
  await assert.rejects(
    selectPdfPageTextWithExactPackageSupervisedSemantics(proxy),
    /qualified own data fields/,
  );
  assert.equal(traps, 0);
});

test('top-level accessor, symbol, extra-key, and custom-prototype options fail before terminal subscription', async () => {
  const counters = {};
  const base = optionsFor({ terminalControl: quietControl(counters) });
  let getterCalls = 0;
  const accessor = { ...base };
  Object.defineProperty(accessor, 'wasmBinary', {
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
    await assert.rejects(
      selectPdfPageTextWithExactPackageSupervisedSemantics(value),
      /qualified own data fields/,
    );
  }
  assert.equal(getterCalls, 0);
  assert.equal(counters.subscribe || 0, 0);
});

test('missing wasmBinary, pageIndex, startIndex, selectCount, and maxRects keys fail before terminal subscription', async () => {
  for (const key of ["wasmBinary", "pageIndex", "startIndex", "selectCount", "maxRects"]) {
    const counters = {};
    const options = optionsFor({ terminalControl: quietControl(counters) });
    delete options[key];
    await assert.rejects(
      selectPdfPageTextWithExactPackageSupervisedSemantics(options),
      /qualified own data fields/,
    );
    assert.equal(counters.subscribe || 0, 0);
  }
});

test('invalid wasmBinary shapes fail before terminal subscription or runtime start', async () => {
  const invalidValues = [
    undefined,
    null,
    new Uint8Array(),
    Buffer.alloc(0),
    'wasm-bytes',
    42,
    {},
    new DataView(new ArrayBuffer(8)),
    new Proxy(Uint8Array.of(1, 2, 3), {}),
  ];
  for (const wasmBinary of invalidValues) {
    const counters = {};
    const options = optionsFor({ terminalControl: quietControl(counters) });
    options.wasmBinary = wasmBinary;
    await assert.rejects(
      selectPdfPageTextWithExactPackageSupervisedSemantics(options),
      /wasmBinary must be a non-empty Uint8Array/,
    );
    assert.equal(counters.subscribe || 0, 0);
  }
});

test('wasmBinary accessor fails without invoking caller getter code', async () => {
  const counters = {};
  const base = optionsFor({ terminalControl: quietControl(counters) });
  let getterCalls = 0;
  const accessor = { ...base };
  Object.defineProperty(accessor, 'wasmBinary', {
    enumerable: true,
    get() { getterCalls += 1; throw new Error('getter executed'); },
  });
  await assert.rejects(
    selectPdfPageTextWithExactPackageSupervisedSemantics(accessor),
    /qualified own data fields/,
  );
  assert.equal(getterCalls, 0);
  assert.equal(counters.subscribe || 0, 0);
});

test('null-prototype top-level options remain accepted with real package execution', async () => {
  const bytes = bytesForFixture();
  assert.equal(sha256(bytes), EXPECTED_FIXTURE_SHA256);
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const options = Object.assign(
    Object.create(null),
    optionsFor({ bytes, wasmBinary }),
  );
  const result = await selectPdfPageTextWithExactPackageSupervisedSemantics(options);
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.observations.pageCount, 1);
  assert.equal(result.observations.pageIndex, 0);
});

test('ordinary-minimal real package execution returns canonical semantic success with unchanged caller bytes', async () => {
  const bytes = bytesForFixture();
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const inputBefore = Buffer.from(bytes);
  const wasmBefore = Buffer.from(wasmBinary);
  const counters = {};
  const request = requestFor(bytes);
  const runtimeBinding = runtimeBindingFor(bytes, request);

  const result = await selectPdfPageTextWithExactPackageSupervisedSemantics({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    runtimeBinding,
    wasmBinary,
    pageIndex: 0,
    startIndex: 0,
    selectCount: 8,
    maxRects: 4,
    terminalControl: quietControl(counters),
    terminateRuntime: async () => {
      counters.terminateRuntime = (counters.terminateRuntime || 0) + 1;
      return { runtimeEvidenceRef: 'unused', partialOutputDiscarded: true };
    },
  });

  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.observations.pageIndex, 0);
  assert.equal(result.observations.pageCount, 1);
  assert.equal(result.observations.charCount, 8);
  assert.equal(result.observations.textLength, 8);
  assert.equal(result.providerId, PROVIDER_DESCRIPTOR.providerId);
  assert.equal(counters.subscribe, 1);
  assert.equal(counters.dispose, 1);
  assert.equal(counters.terminateRuntime || 0, 0);
  assert.deepEqual(bytes, inputBefore);
  assert.deepEqual(wasmBinary, wasmBefore);
  assert.ok(Object.isFrozen(result));
});

for (const [terminalOutcome, errorClass] of [
  [TERMINAL_OUTCOME.CANCELLED, STABLE_ERROR.CANCELLED],
  [TERMINAL_OUTCOME.TIMED_OUT, STABLE_ERROR.TIMEOUT],
  [TERMINAL_OUTCOME.RESOURCE_LIMIT_EXCEEDED, STABLE_ERROR.RESOURCE_LIMIT_EXCEEDED],
]) {
  test(`synchronous terminal ${terminalOutcome} wins without PDFium runtime completion and preserves terminal semantics`, async () => {
    const bytes = bytesForFixture();
    const wasmBinary = Buffer.from(REAL_WASM_BYTES);
    const inputBefore = Buffer.from(bytes);
    const wasmBefore = Buffer.from(wasmBinary);
    const counters = {};
    const result = await selectPdfPageTextWithExactPackageSupervisedSemantics(optionsFor({
      bytes,
      wasmBinary,
      terminalControl: synchronousTerminalControl(terminalOutcome, counters),
      terminateRuntime: async ({ terminalOutcome: received }) => {
        counters.terminateRuntime = (counters.terminateRuntime || 0) + 1;
        assert.equal(received, terminalOutcome);
        return {
          runtimeEvidenceRef: `runtime-evidence:facade-${terminalOutcome}`,
          partialOutputDiscarded: true,
        };
      },
    }));

    assert.equal(result.outcome, terminalOutcome);
    assert.equal(result.stableError.errorClass, errorClass);
    assert.equal(result.runtimeTerminalEvidence.runtimeEvidenceRef, `runtime-evidence:facade-${terminalOutcome}`);
    assert.equal(result.runtimeTerminalEvidence.partialOutputDiscarded, true);
    assert.equal(counters.subscribe, 1);
    assert.equal(counters.dispose, 1);
    assert.equal(counters.terminateRuntime, 1);
    assert.equal('observations' in result, false);
    assert.deepEqual(bytes, inputBefore);
    assert.deepEqual(wasmBinary, wasmBefore);
  });
}

test('synchronous terminal wins over malformed input without starting PDFium runtime semantics', async () => {
  const bytes = Buffer.from('facade terminal-first probe: not a pdf document');
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const result = await selectPdfPageTextWithExactPackageSupervisedSemantics(optionsFor({
    bytes,
    request: requestFor(bytes),
    runtimeBinding: runtimeBindingFor(bytes, requestFor(bytes)),
    wasmBinary,
    terminalControl: synchronousTerminalControl(TERMINAL_OUTCOME.CANCELLED),
    terminateRuntime: async () => ({
      runtimeEvidenceRef: 'runtime-evidence:facade-terminal-first-malformed',
      partialOutputDiscarded: true,
    }),
  }));
  assert.equal(result.outcome, TERMINAL_OUTCOME.CANCELLED);
  assert.equal(result.stableError.errorClass, STABLE_ERROR.CANCELLED);
});

test('terminal callback mutation of caller WASM fails closed', async () => {
  const bytes = bytesForFixture();
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const mutatingControl = {
    subscribe(callback) {
      wasmBinary[0] = (wasmBinary[0] + 1) % 256;
      callback({ terminalOutcome: TERMINAL_OUTCOME.CANCELLED });
      return () => {};
    },
  };
  await assert.rejects(
    selectPdfPageTextWithExactPackageSupervisedSemantics(optionsFor({
      bytes,
      wasmBinary,
      terminalControl: mutatingControl,
      terminateRuntime: async () => ({
        runtimeEvidenceRef: 'runtime-evidence:facade-mutating-callback',
        partialOutputDiscarded: true,
      }),
    })),
    /caller WASM bytes changed/,
  );
});

test('termination mutation of caller WASM fails closed', async () => {
  const bytes = bytesForFixture();
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  await assert.rejects(
    selectPdfPageTextWithExactPackageSupervisedSemantics(optionsFor({
      bytes,
      wasmBinary,
      terminalControl: synchronousTerminalControl(TERMINAL_OUTCOME.TIMED_OUT),
      terminateRuntime: async () => {
        wasmBinary[wasmBinary.length - 1] = (wasmBinary[wasmBinary.length - 1] + 1) % 256;
        return {
          runtimeEvidenceRef: 'runtime-evidence:facade-mutating-termination',
          partialOutputDiscarded: true,
        };
      },
    })),
    /caller WASM bytes changed/,
  );
});

test('disposer mutation of caller WASM after runtime completion fails closed without aggregation', async () => {
  const bytes = bytesForFixture();
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const mutatingControl = {
    subscribe() {
      return () => {
        wasmBinary[1] = (wasmBinary[1] + 1) % 256;
      };
    },
  };
  const error = await selectPdfPageTextWithExactPackageSupervisedSemantics(optionsFor({
    bytes,
    wasmBinary,
    terminalControl: mutatingControl,
  })).then(
    () => { throw new Error('facade unexpectedly succeeded after disposer WASM mutation'); },
    (failure) => failure,
  );
  assert.match(error.message, /caller WASM bytes changed/);
  assert.equal(error instanceof AggregateError, false);
});

test('termination failure plus WASM mutation preserves both failures', async () => {
  const bytes = bytesForFixture();
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const terminationFailure = new Error('fake facade termination failure');
  const mutatingControl = {
    subscribe(callback) {
      wasmBinary[2] = (wasmBinary[2] + 1) % 256;
      callback({ terminalOutcome: TERMINAL_OUTCOME.RESOURCE_LIMIT_EXCEEDED });
      return () => {};
    },
  };
  const error = await selectPdfPageTextWithExactPackageSupervisedSemantics(optionsFor({
    bytes,
    wasmBinary,
    terminalControl: mutatingControl,
    terminateRuntime: async () => { throw terminationFailure; },
  })).then(
    () => { throw new Error('facade unexpectedly succeeded after combined failure'); },
    (failure) => failure,
  );
  assert.equal(error instanceof AggregateError, true);
  assert.equal(error.errors.length, 2);
  assert.equal(error.errors[0], terminationFailure);
  assert.match(error.errors[1].message, /caller WASM bytes changed/);
});

test('termination failure without WASM mutation propagates unchanged without retry', async () => {
  const bytes = bytesForFixture();
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const wasmBefore = Buffer.from(wasmBinary);
  const failure = new Error('fake facade termination failure without mutation');
  let terminateCalls = 0;
  const error = await selectPdfPageTextWithExactPackageSupervisedSemantics(optionsFor({
    bytes,
    wasmBinary,
    terminalControl: synchronousTerminalControl(TERMINAL_OUTCOME.CANCELLED),
    terminateRuntime: async () => {
      terminateCalls += 1;
      throw failure;
    },
  })).then(
    () => { throw new Error('facade unexpectedly succeeded after termination failure'); },
    (rejection) => rejection,
  );
  assert.equal(error, failure);
  assert.equal(terminateCalls, 1);
  assert.deepEqual(wasmBinary, wasmBefore);
});

test('canonical malformed-document semantics remain unchanged through the facade', async () => {
  const bytes = Buffer.from('facade malformed probe: not a pdf document');
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const request = requestFor(bytes);
  const result = await selectPdfPageTextWithExactPackageSupervisedSemantics({
    ...optionsFor(),
    bytes,
    request,
    runtimeBinding: runtimeBindingFor(bytes, request),
    wasmBinary,
  });
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorClass, STABLE_ERROR.MALFORMED_UNTRUSTED_DOCUMENT);
  assert.equal(result.stableError.errorCode, 'malformed_untrusted_document.pdfium_format_or_corruption');
});

test('canonical unavailable and invalid-request semantics remain unchanged through the facade', async () => {
  const bytes = bytesForFixture();
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const request = requestFor(bytes);
  const runtimeBinding = runtimeBindingFor(bytes, request);

  const unavailable = await selectPdfPageTextWithExactPackageSupervisedSemantics({
    ...optionsFor(),
    bytes,
    request,
    availability: AVAILABILITY.UNAVAILABLE,
    runtimeBinding,
    wasmBinary,
  });
  assert.equal(unavailable.outcome, OUTCOME.FAILED);
  assert.equal(unavailable.stableError.errorClass, STABLE_ERROR.UNAVAILABLE);

  const invalidRequest = await selectPdfPageTextWithExactPackageSupervisedSemantics({
    ...optionsFor(),
    bytes,
    request: { ...request, operationId: '' },
    runtimeBinding,
    wasmBinary,
  });
  assert.equal(invalidRequest.outcome, OUTCOME.FAILED);
  assert.equal(invalidRequest.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(invalidRequest.stableError.errorCode, 'invalid_input.pdf_text_select_request');
});
