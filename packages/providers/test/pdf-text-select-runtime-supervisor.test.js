'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { types: utilTypes } = require('node:util');

const { exactByteIdentity } = require('../src/content-identity-admission');
const {
  PROVIDER_CAPABILITY_VERSION,
  PROVIDER_DESCRIPTOR,
  TERMINAL_EVIDENCE_SCHEMA,
  TERMINAL_OUTCOME,
} = require('../src/pdf/browser/pdf-text-select-provider');
const {
  SUPERVISOR_KIND,
  supervisePdfTextSelectRuntime,
} = require('../src/pdf/browser/pdf-text-select-runtime-supervisor');

function bytes() {
  return Buffer.from('%PDF-text-select-supervisor-test');
}

function identityFor(value) {
  return exactByteIdentity(Buffer.from(value.buffer, value.byteOffset, value.byteLength));
}

function bindingFor(value = bytes(), overrides = {}) {
  const identity = identityFor(value);
  return {
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    byteLength: identity.byteLength,
    resourceBudgetRef: 'budget:pdf-text-select-v1:supervisor-test',
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

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function terminalHarness(options = {}) {
  let handler = null;
  let subscribeCount = 0;
  let disposeCount = 0;
  const control = {
    subscribe(callback) {
      subscribeCount += 1;
      handler = callback;
      if (options.synchronousOutcome) callback({ terminalOutcome: options.synchronousOutcome });
      return () => {
        disposeCount += 1;
        if (options.throwDispose) throw new Error('dispose boom');
        handler = null;
      };
    },
  };
  return {
    control,
    emit(terminalOutcome) {
      assert.equal(typeof handler, 'function', 'terminal handler must be registered');
      handler({ terminalOutcome });
    },
    emitRaw(event) {
      assert.equal(typeof handler, 'function', 'terminal handler must be registered');
      handler(event);
    },
    stats() {
      return { subscribeCount, disposeCount, handlerRegistered: handler !== null };
    },
  };
}

function terminationHarness(options = {}) {
  const calls = [];
  const terminateRuntime = async (request) => {
    calls.push(request);
    if (options.throwTermination) throw new Error('termination boom');
    if (options.confirmation !== undefined) return options.confirmation;
    return {
      runtimeEvidenceRef: `runtime-evidence:${request.terminalOutcome.toLowerCase()}`,
      partialOutputDiscarded: true,
    };
  };
  return { calls, terminateRuntime };
}

async function supervise(overrides = {}) {
  const input = overrides.bytes ?? bytes();
  const terminal = overrides.terminal ?? terminalHarness();
  const termination = overrides.termination ?? terminationHarness();
  const runRuntime = overrides.runRuntime ?? (async () => selectRaw());
  const runtimeBinding = overrides.runtimeBinding ?? bindingFor(input);
  const promise = supervisePdfTextSelectRuntime({
    bytes: input,
    runtimeBinding,
    runRuntime,
    terminalControl: terminal.control,
    terminateRuntime: termination.terminateRuntime,
  });
  return { input, terminal, termination, runtimeBinding, promise };
}

test('runtime completion wins without termination and returns a frozen selection observation envelope', async () => {
  const raw = selectRaw({ pageCount: 3, charCount: 24, startIndex: 4, selectCount: 8, text: 'Signthos' });
  const { terminal, termination, promise } = await supervise({ runRuntime: async () => raw });
  const result = await promise;
  assert.equal(result.kind, SUPERVISOR_KIND.RUNTIME_COMPLETED);
  assert.deepEqual(result.rawObservation, { ...raw, rects: [rect()] });
  assert.notEqual(result.rawObservation, raw);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.rawObservation), true);
  assert.equal(termination.calls.length, 0);
  assert.deepEqual(terminal.stats(), { subscribeCount: 1, disposeCount: 1, handlerRegistered: false });
});

test('normal rejected raw observation remains raw and frozen', async () => {
  const { promise } = await supervise({ runRuntime: async () => ({ openSucceeded: false, pdfiumLastError: 3 }) });
  const result = await promise;
  assert.equal(result.kind, SUPERVISOR_KIND.RUNTIME_COMPLETED);
  assert.deepEqual(result.rawObservation, { openSucceeded: false, pdfiumLastError: 3 });
  assert.equal(Object.isFrozen(result.rawObservation), true);
});

test('empty selection observation passes through raw and frozen', async () => {
  const raw = selectRaw({ charCount: 0, selectCount: 0, text: '', rects: [], rectCount: 0 });
  const { promise } = await supervise({ runRuntime: async () => raw });
  const result = await promise;
  assert.equal(result.kind, SUPERVISOR_KIND.RUNTIME_COMPLETED);
  assert.deepEqual(result.rawObservation, raw);
  assert.equal(Object.isFrozen(result.rawObservation), true);
});

for (const terminalOutcome of [
  TERMINAL_OUTCOME.CANCELLED,
  TERMINAL_OUTCOME.TIMED_OUT,
  TERMINAL_OUTCOME.RESOURCE_LIMIT_EXCEEDED,
]) {
  test(`${terminalOutcome} produces exact terminal evidence after confirmed termination`, async () => {
    const runtime = deferred();
    const state = await supervise({ runRuntime: () => runtime.promise });
    state.terminal.emit(terminalOutcome);
    const result = await state.promise;
    const identity = identityFor(state.input);
    assert.equal(result.kind, SUPERVISOR_KIND.RUNTIME_TERMINAL);
    assert.deepEqual(result.terminalOutcomeEvidence, {
      schema: TERMINAL_EVIDENCE_SCHEMA,
      terminalOutcome,
      providerId: PROVIDER_DESCRIPTOR.providerId,
      providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
      inputExactBytesDigest: identity.inputExactBytesDigest,
      byteLength: identity.byteLength,
      resourceBudgetRef: state.runtimeBinding.resourceBudgetRef,
      runtimeEvidenceRef: `runtime-evidence:${terminalOutcome.toLowerCase()}`,
      partialOutputDiscarded: true,
    });
    assert.equal(Object.isFrozen(result), true);
    assert.equal(Object.isFrozen(result.terminalOutcomeEvidence), true);
    assert.equal(Object.isFrozen(result.terminalOutcomeEvidence.inputExactBytesDigest), true);
    assert.equal(state.termination.calls.length, 1);
    assert.deepEqual(state.termination.calls[0], { terminalOutcome });
    assert.equal(Object.isFrozen(state.termination.calls[0]), true);
    assert.equal(state.terminal.stats().disposeCount, 1);
    runtime.resolve(selectRaw({ charCount: 99, text: 'late' }));
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(result.terminalOutcomeEvidence.terminalOutcome, terminalOutcome);
  });
}

test('terminal event is snapshotted synchronously before emitter mutation', async () => {
  const runtime = deferred();
  const state = await supervise({ runRuntime: () => runtime.promise });
  const event = { terminalOutcome: TERMINAL_OUTCOME.CANCELLED };
  state.terminal.emitRaw(event);
  event.terminalOutcome = TERMINAL_OUTCOME.TIMED_OUT;
  event.extra = true;
  const result = await state.promise;
  assert.equal(result.terminalOutcomeEvidence.terminalOutcome, TERMINAL_OUTCOME.CANCELLED);
  assert.equal(state.termination.calls.length, 1);
  runtime.resolve(selectRaw());
});

test('first terminal signal wins and termination executes exactly once', async () => {
  const runtime = deferred();
  const state = await supervise({ runRuntime: () => runtime.promise });
  state.terminal.emit(TERMINAL_OUTCOME.CANCELLED);
  state.terminal.emit(TERMINAL_OUTCOME.TIMED_OUT);
  const result = await state.promise;
  assert.equal(result.terminalOutcomeEvidence.terminalOutcome, TERMINAL_OUTCOME.CANCELLED);
  assert.equal(state.termination.calls.length, 1);
  assert.equal(state.terminal.stats().disposeCount, 1);
  runtime.resolve(selectRaw());
});

test('synchronous terminal signal prevents executor invocation', async () => {
  const terminal = terminalHarness({ synchronousOutcome: TERMINAL_OUTCOME.CANCELLED });
  let executions = 0;
  const state = await supervise({
    terminal,
    runRuntime: async () => {
      executions += 1;
      return selectRaw();
    },
  });
  const result = await state.promise;
  assert.equal(result.kind, SUPERVISOR_KIND.RUNTIME_TERMINAL);
  assert.equal(executions, 0);
  assert.equal(state.termination.calls.length, 1);
  assert.equal(terminal.stats().disposeCount, 1);
});

test('late runtime rejection after terminal result is consumed without unhandled rejection', async () => {
  const runtime = deferred();
  const observed = [];
  const listener = (error) => observed.push(error);
  process.on('unhandledRejection', listener);
  try {
    const state = await supervise({ runRuntime: () => runtime.promise });
    state.terminal.emit(TERMINAL_OUTCOME.TIMED_OUT);
    const result = await state.promise;
    assert.equal(result.kind, SUPERVISOR_KIND.RUNTIME_TERMINAL);
    runtime.reject(new Error('late runtime rejection'));
    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(observed, []);
  } finally {
    process.off('unhandledRejection', listener);
  }
});

test('termination failure fails closed and disposes terminal control', async () => {
  const runtime = deferred();
  const termination = terminationHarness({ throwTermination: true });
  const state = await supervise({ runRuntime: () => runtime.promise, termination });
  state.terminal.emit(TERMINAL_OUTCOME.CANCELLED);
  await assert.rejects(state.promise, /termination boom/);
  assert.equal(termination.calls.length, 1);
  assert.equal(state.terminal.stats().disposeCount, 1);
  runtime.resolve(selectRaw());
});

test('malformed termination confirmation fails closed without terminal evidence', async () => {
  for (const confirmation of [
    null,
    {},
    { runtimeEvidenceRef: '', partialOutputDiscarded: true },
    { runtimeEvidenceRef: 'runtime-evidence:test', partialOutputDiscarded: false },
    { runtimeEvidenceRef: 'runtime-evidence:test', partialOutputDiscarded: true, extra: true },
  ]) {
    const runtime = deferred();
    const state = await supervise({
      runRuntime: () => runtime.promise,
      termination: terminationHarness({ confirmation }),
    });
    state.terminal.emit(TERMINAL_OUTCOME.RESOURCE_LIMIT_EXCEEDED);
    await assert.rejects(state.promise, TypeError);
    assert.equal(state.terminal.stats().disposeCount, 1);
    runtime.resolve(selectRaw());
  }
});

test('executor failure before terminal event propagates and is never guessed into terminal evidence', async () => {
  const terminal = terminalHarness();
  const state = await supervise({ terminal, runRuntime: async () => { throw new Error('runtime boom'); } });
  await assert.rejects(state.promise, /runtime boom/);
  assert.equal(state.termination.calls.length, 0);
  assert.equal(terminal.stats().disposeCount, 1);
});

test('malformed raw selection observations fail closed', async () => {
  const cases = [
    null,
    {},
    { openSucceeded: true },
    { ...selectRaw(), pageIndex: -1 },
    { ...selectRaw(), pageCount: -1 },
    { ...selectRaw(), charCount: -1 },
    { ...selectRaw(), startIndex: -1 },
    { ...selectRaw(), selectCount: -1 },
    { ...selectRaw(), rectCount: -1 },
    { ...selectRaw(), rectsTruncated: 'yes' },
    { ...selectRaw(), rectsTruncated: 1 },
    { ...selectRaw(), unicodeMapError: 'no' },
    { ...selectRaw(), unicodeMapError: 0 },
    { ...selectRaw(), text: 123 },
    { ...selectRaw(), text: null },
    { ...selectRaw(), text: Buffer.from('Signthos') },
    { ...selectRaw(), rects: 'rects' },
    { ...selectRaw(), rects: [{ left: 0, top: 1, right: 2 }] },
    { ...selectRaw(), rects: [{ left: 9, top: 1, right: 2, bottom: 3 }] },
    { ...selectRaw(), pdfiumLastError: 3 },
    { ...selectRaw(), extra: true },
    { openSucceeded: false },
    { openSucceeded: false, pdfiumLastError: -1 },
    { openSucceeded: false, pdfiumLastError: 2 },
    { openSucceeded: false, pdfiumLastError: 4 },
    { openSucceeded: false, pdfiumLastError: 3, pageCount: 0 },
  ];
  for (const value of cases) {
    const state = await supervise({ runRuntime: async () => value });
    await assert.rejects(state.promise, TypeError);
    assert.equal(state.terminal.stats().disposeCount, 1);
  }
});

test('invalid binding fails before executor or terminal registration', async () => {
  const input = bytes();
  const valid = bindingFor(input);
  const invalidBindings = [
    { ...valid, providerId: 'wrong-provider' },
    { ...valid, providerCapabilityVersion: 'wrong-capability' },
    { ...valid, byteLength: valid.byteLength + 1 },
    { ...valid, inputExactBytesDigest: { ...valid.inputExactBytesDigest, value: '0'.repeat(64) } },
    { ...valid, resourceBudgetRef: '   ' },
    { ...valid, extra: true },
  ];
  for (const runtimeBinding of invalidBindings) {
    let executions = 0;
    let subscriptions = 0;
    const terminalControl = {
      subscribe() {
        subscriptions += 1;
        return () => {};
      },
    };
    await assert.rejects(
      supervisePdfTextSelectRuntime({
        bytes: input,
        runtimeBinding,
        runRuntime: async () => { executions += 1; return selectRaw(); },
        terminalControl,
        terminateRuntime: async () => ({ runtimeEvidenceRef: 'never', partialOutputDiscarded: true }),
      }),
      TypeError,
    );
    assert.equal(executions, 0);
    assert.equal(subscriptions, 0);
  }
});

test('custom prototypes, symbols, accessors and proxies in binding fail closed without invoking getter or proxy traps', async () => {
  const input = bytes();
  const valid = bindingFor(input);
  let getterCalls = 0;
  let proxyTrapCalls = 0;

  const custom = Object.assign(Object.create({ inherited: true }), valid);
  const symbolExtra = { ...valid, [Symbol('extra')]: true };
  const accessor = { ...valid };
  Object.defineProperty(accessor, 'resourceBudgetRef', {
    enumerable: true,
    get() { getterCalls += 1; return valid.resourceBudgetRef; },
  });
  const proxy = new Proxy({ ...valid }, {
    getPrototypeOf(target) { proxyTrapCalls += 1; return Reflect.getPrototypeOf(target); },
    ownKeys(target) { proxyTrapCalls += 1; return Reflect.ownKeys(target); },
    getOwnPropertyDescriptor(target, key) { proxyTrapCalls += 1; return Reflect.getOwnPropertyDescriptor(target, key); },
  });
  assert.equal(utilTypes.isProxy(proxy), true);

  for (const runtimeBinding of [custom, symbolExtra, accessor, proxy]) {
    await assert.rejects(
      supervisePdfTextSelectRuntime({
        bytes: input,
        runtimeBinding,
        runRuntime: async () => selectRaw(),
        terminalControl: terminalHarness().control,
        terminateRuntime: terminationHarness().terminateRuntime,
      }),
      TypeError,
    );
  }
  assert.equal(getterCalls, 0);
  assert.equal(proxyTrapCalls, 0);
});

test('null-prototype binding and digest are accepted when all fields are own data fields', async () => {
  const input = bytes();
  const normal = bindingFor(input);
  const digest = Object.assign(Object.create(null), normal.inputExactBytesDigest);
  const runtimeBinding = Object.assign(Object.create(null), { ...normal, inputExactBytesDigest: digest });
  const state = await supervise({ bytes: input, runtimeBinding });
  const result = await state.promise;
  assert.equal(result.kind, SUPERVISOR_KIND.RUNTIME_COMPLETED);
});

test('source byte mutation by executor is detected after cleanup', async () => {
  const input = bytes();
  const state = await supervise({
    bytes: input,
    runRuntime: async () => {
      input[0] ^= 0xff;
      return selectRaw();
    },
  });
  await assert.rejects(state.promise, /source bytes changed/);
  assert.equal(state.terminal.stats().disposeCount, 1);
});

test('runtime binding mutation by executor is detected after cleanup', async () => {
  const input = bytes();
  const runtimeBinding = bindingFor(input);
  const state = await supervise({
    bytes: input,
    runtimeBinding,
    runRuntime: async () => {
      runtimeBinding.resourceBudgetRef = 'budget:mutated';
      return selectRaw();
    },
  });
  await assert.rejects(state.promise, /runtime binding changed/);
  assert.equal(state.terminal.stats().disposeCount, 1);
});

test('terminal control mutation by executor is detected after cleanup', async () => {
  const terminal = terminalHarness();
  const state = await supervise({
    terminal,
    runRuntime: async () => {
      terminal.control.subscribe = () => () => {};
      return selectRaw();
    },
  });
  await assert.rejects(state.promise, /terminal control changed/);
  assert.equal(terminal.stats().disposeCount, 1);
});

test('source byte mutation by the disposer fails closed instead of returning success', async () => {
  const input = bytes();
  const terminalControl = {
    subscribe() {
      return () => {
        input[0] ^= 0xff;
      };
    },
  };
  await assert.rejects(
    supervisePdfTextSelectRuntime({
      bytes: input,
      runtimeBinding: bindingFor(input),
      runRuntime: async () => selectRaw(),
      terminalControl,
      terminateRuntime: terminationHarness().terminateRuntime,
    }),
    /source bytes changed/,
  );
});

test('disposal failure fails closed after runtime completion', async () => {
  const terminal = terminalHarness({ throwDispose: true });
  const state = await supervise({ terminal });
  await assert.rejects(state.promise, /dispose boom/);
  assert.equal(terminal.stats().disposeCount, 1);
});

test('disposal failure combines with a primary runtime failure', async () => {
  const terminal = terminalHarness({ throwDispose: true });
  const state = await supervise({ terminal, runRuntime: async () => { throw new Error('runtime boom'); } });
  await assert.rejects(state.promise, (error) => {
    assert.equal(error instanceof AggregateError, true);
    assert.equal(error.errors.some((item) => /runtime boom/.test(item.message)), true);
    assert.equal(error.errors.some((item) => /dispose boom/.test(item.message)), true);
    return true;
  });
});

test('invalid terminal event fails closed without invoking termination', async () => {
  const runtime = deferred();
  const state = await supervise({ runRuntime: () => runtime.promise });
  state.terminal.emitRaw({ terminalOutcome: 'UNKNOWN' });
  await assert.rejects(state.promise, /unqualified outcome/);
  assert.equal(state.termination.calls.length, 0);
  assert.equal(state.terminal.stats().disposeCount, 1);
  runtime.resolve(selectRaw());
});

test('input and injected objects are not mutated by successful supervision', async () => {
  const input = bytes();
  const before = Buffer.from(input);
  const runtimeBinding = Object.freeze({
    ...bindingFor(input),
    inputExactBytesDigest: Object.freeze({ ...bindingFor(input).inputExactBytesDigest }),
  });
  const raw = selectRaw({ pageCount: 4, charCount: 16, startIndex: 4, selectCount: 8, text: 'Signthos' });
  const terminal = terminalHarness();
  const subscribeBefore = terminal.control.subscribe;
  const result = await supervisePdfTextSelectRuntime({
    bytes: input,
    runtimeBinding,
    runRuntime: async () => raw,
    terminalControl: terminal.control,
    terminateRuntime: terminationHarness().terminateRuntime,
  });
  assert.deepEqual(input, before);
  assert.equal(terminal.control.subscribe, subscribeBefore);
  assert.deepEqual(result.rawObservation.pageCount, 4);
});

test('select supervisor module exposes only the bounded supervision surface', async () => {
  const supervisor = require('../src/pdf/browser/pdf-text-select-runtime-supervisor');
  assert.deepEqual(Reflect.ownKeys(supervisor).sort(), [
    'RUNTIME_BINDING_KEYS',
    'SUPERVISOR_KIND',
    'supervisePdfTextSelectRuntime',
  ].sort());
  assert.equal(typeof supervisePdfTextSelectRuntime, 'function');
  assert.equal(Object.isFrozen(supervisor), true);
});

test('select supervisor source contains no real PDFium, WASM execution, provider call, browser/worker or network-loader surface', () => {
  const source = fs.readFileSync(path.join(__dirname, '../src/pdf/browser/pdf-text-select-runtime-supervisor.js'), 'utf8');
  for (const forbidden of [
    /@embedpdf\/pdfium/,
    /require\('\.\/pdf-text-select-runtime'\)/,
    /composePdfTextSelectResult\s*\(/,
    /DEFAULT_PDFIUM_WASM_URL/,
    /cdn\.jsdelivr\.net/,
    /\bfetch\s*\(/,
    /XMLHttpRequest/,
    /https?:\/\//,
    /\bWorker\s*\(/,
    /importScripts/,
    /WebAssembly/,
    /PDFiumExt_Init/,
    /FPDF_/,
    /child_process/,
    /\bsetTimeout\s*\(/,
    /\bsetInterval\s*\(/,
  ]) {
    assert.equal(forbidden.test(source), false, `forbidden supervisor source pattern: ${forbidden}`);
  }
});
