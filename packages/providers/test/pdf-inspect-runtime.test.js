'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');

function fakeRuntime(options = {}) {
  const events = [];
  const heap = new Uint8Array(4096);
  let allocation = options.allocation ?? 32;
  let document = options.document ?? 71;
  const module = {
    pdfium: {
      HEAPU8: heap,
      wasmExports: {
        malloc(length) {
          events.push(`malloc:${length}`);
          if (options.throwMalloc) throw new Error('malloc boom');
          const pointer = allocation;
          allocation += length + 17;
          return options.badAllocation ?? pointer;
        },
        free(pointer) {
          events.push(`free:${pointer}`);
          if (options.throwFree) throw new Error('free boom');
        },
      },
    },
    PDFiumExt_Init() {
      events.push('library-init');
      if (options.throwLibraryInit) throw new Error('library init boom');
    },
    FPDF_LoadMemDocument(pointer, length, password) {
      events.push(`open:${pointer}:${length}:${password}`);
      if (options.throwOpen) throw new Error('open boom');
      if (options.rejectOpen) return 0;
      const handle = document;
      document += 11;
      return handle;
    },
    FPDF_GetLastError() {
      events.push('last-error');
      if (options.throwLastError) throw new Error('last error boom');
      return options.lastError ?? 3;
    },
    FPDF_GetPageCount(handle) {
      events.push(`page-count:${handle}`);
      if (options.throwPageCount) throw new Error('page count boom');
      return options.pageCount ?? 2;
    },
    FPDF_CloseDocument(handle) {
      events.push(`close:${handle}`);
      if (options.throwClose) throw new Error('close boom');
    },
    FPDF_DestroyLibrary() {
      events.push('destroy');
      if (options.throwDestroy) throw new Error('destroy boom');
    },
  };
  return { module, events, heap };
}

function bytes() {
  return Uint8Array.from([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]);
}

function wasm() {
  return Uint8Array.from([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]);
}

test('successful local-WASM inspect executes the raw lifecycle in order', async () => {
  const input = bytes();
  const wasmBinary = wasm();
  const runtime = fakeRuntime({ pageCount: 4 });
  let receivedOptions = null;
  const result = await inspectPdfWithLocalWasm({
    bytes: input,
    wasmBinary,
    async initPdfium(options) {
      receivedOptions = options;
      runtime.events.push('init');
      return runtime.module;
    },
  });

  assert.deepEqual(Reflect.ownKeys(receivedOptions), ['wasmBinary']);
  assert.equal(receivedOptions.wasmBinary, wasmBinary);
  assert.deepEqual(result, { openSucceeded: true, pageCount: 4 });
  assert.equal(Object.isFrozen(result), true);
  assert.deepEqual(runtime.events, [
    'init',
    'library-init',
    `malloc:${input.byteLength}`,
    `open:32:${input.byteLength}:`,
    'page-count:71',
    'close:71',
    'free:32',
    'destroy',
  ]);
  assert.deepEqual(Array.from(runtime.heap.slice(32, 32 + input.byteLength)), Array.from(input));
});

test('normal PDFium open rejection preserves exact last error and still cleans up', async () => {
  const input = bytes();
  const runtime = fakeRuntime({ rejectOpen: true, lastError: 3 });
  const result = await inspectPdfWithLocalWasm({
    bytes: input,
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
  });
  assert.deepEqual(result, { openSucceeded: false, pdfiumLastError: 3 });
  assert.deepEqual(runtime.events, [
    'library-init',
    `malloc:${input.byteLength}`,
    `open:32:${input.byteLength}:`,
    'last-error',
    'free:32',
    'destroy',
  ]);
});

test('runtime exceptions never publish success and still free/destroy', async () => {
  for (const mode of ['throwOpen', 'throwPageCount']) {
    const runtime = fakeRuntime({ [mode]: true });
    await assert.rejects(
      inspectPdfWithLocalWasm({ bytes: bytes(), wasmBinary: wasm(), initPdfium: async () => runtime.module }),
      /boom/,
    );
    assert.equal(runtime.events.includes('free:32'), true);
    assert.equal(runtime.events.at(-1), 'destroy');
    if (mode === 'throwPageCount') assert.equal(runtime.events.includes('close:71'), true);
  }
});

test('cleanup failures remain terminal and later cleanup still runs', async () => {
  const runtime = fakeRuntime({ throwClose: true, throwFree: true, throwDestroy: true });
  await assert.rejects(
    inspectPdfWithLocalWasm({ bytes: bytes(), wasmBinary: wasm(), initPdfium: async () => runtime.module }),
    (error) => {
      assert.equal(error instanceof AggregateError, true);
      assert.match(error.message, /cleanup failed/);
      assert.equal(error.errors.length, 3);
      return true;
    },
  );
  assert.equal(runtime.events.includes('close:71'), true);
  assert.equal(runtime.events.includes('free:32'), true);
  assert.equal(runtime.events.at(-1), 'destroy');
});

test('invalid page counts and allocation pointers fail closed with cleanup', async () => {
  const invalidPage = fakeRuntime({ pageCount: -1 });
  await assert.rejects(
    inspectPdfWithLocalWasm({ bytes: bytes(), wasmBinary: wasm(), initPdfium: async () => invalidPage.module }),
    /invalid page count/,
  );
  assert.deepEqual(invalidPage.events.slice(-3), ['close:71', 'free:32', 'destroy']);

  for (const badAllocation of [0, -1, Number.NaN]) {
    const invalidAllocation = fakeRuntime({ badAllocation });
    await assert.rejects(
      inspectPdfWithLocalWasm({ bytes: bytes(), wasmBinary: wasm(), initPdfium: async () => invalidAllocation.module }),
      /allocation failed/,
    );
    assert.equal(invalidAllocation.events.at(-1), 'destroy');
    assert.equal(invalidAllocation.events.some((entry) => entry.startsWith('open:')), false);
    assert.equal(invalidAllocation.events.some((entry) => entry.startsWith('free:')), false);
  }
});

test('invalid document handles fail closed without close and still free/destroy', async () => {
  for (const document of [-1, Number.NaN, 1.5]) {
    const runtime = fakeRuntime({ document });
    await assert.rejects(
      inspectPdfWithLocalWasm({ bytes: bytes(), wasmBinary: wasm(), initPdfium: async () => runtime.module }),
      /invalid document handle/,
    );
    assert.equal(runtime.events.some((entry) => entry.startsWith('page-count:')), false);
    assert.equal(runtime.events.some((entry) => entry.startsWith('close:')), false);
    assert.equal(runtime.events.includes('free:32'), true);
    assert.equal(runtime.events.at(-1), 'destroy');
  }
});

test('malformed runtime surfaces fail before library initialization', async () => {
  const required = [
    ['PDFiumExt_Init'],
    ['FPDF_LoadMemDocument'],
    ['FPDF_GetLastError'],
    ['FPDF_GetPageCount'],
    ['FPDF_CloseDocument'],
    ['FPDF_DestroyLibrary'],
    ['pdfium', 'HEAPU8'],
    ['pdfium', 'wasmExports', 'malloc'],
    ['pdfium', 'wasmExports', 'free'],
  ];
  for (const pathParts of required) {
    const runtime = fakeRuntime();
    let target = runtime.module;
    for (const part of pathParts.slice(0, -1)) target = target[part];
    delete target[pathParts.at(-1)];
    await assert.rejects(
      inspectPdfWithLocalWasm({ bytes: bytes(), wasmBinary: wasm(), initPdfium: async () => runtime.module }),
      /PDFium/,
    );
    assert.equal(runtime.events.length, 0);
  }
});

test('invalid byte views fail before invoking the initializer', async () => {
  let calls = 0;
  const initPdfium = async () => { calls += 1; return fakeRuntime().module; };
  await assert.rejects(inspectPdfWithLocalWasm({ bytes: new Uint8Array(), wasmBinary: wasm(), initPdfium }), /non-empty/);
  await assert.rejects(inspectPdfWithLocalWasm({ bytes: bytes(), wasmBinary: new Uint8Array(), initPdfium }), /non-empty/);
  await assert.rejects(inspectPdfWithLocalWasm({ bytes: new ArrayBuffer(8), wasmBinary: wasm(), initPdfium }), /Uint8Array/);
  assert.equal(calls, 0);
});

test('source and WASM bytes remain unchanged', async () => {
  const input = bytes();
  const wasmBinary = wasm();
  const inputBefore = Array.from(input);
  const wasmBefore = Array.from(wasmBinary);
  const runtime = fakeRuntime();
  await inspectPdfWithLocalWasm({ bytes: input, wasmBinary, initPdfium: async () => runtime.module });
  assert.deepEqual(Array.from(input), inputBefore);
  assert.deepEqual(Array.from(wasmBinary), wasmBefore);
});

test('WASM mutation by the injected initializer is detected after cleanup', async () => {
  const wasmBinary = wasm();
  const runtime = fakeRuntime();
  await assert.rejects(
    inspectPdfWithLocalWasm({
      bytes: bytes(),
      wasmBinary,
      async initPdfium() {
        wasmBinary[0] ^= 0xff;
        return runtime.module;
      },
    }),
    (error) => {
      assert.equal(error instanceof AggregateError, true);
      assert.equal(error.errors.some((item) => /WASM bytes changed/.test(item.message)), true);
      return true;
    },
  );
  assert.equal(runtime.events.at(-1), 'destroy');
});

test('each operation obtains fresh allocation and document handles from the runtime', async () => {
  const runtime = fakeRuntime();
  const initPdfium = async () => runtime.module;
  await inspectPdfWithLocalWasm({ bytes: bytes(), wasmBinary: wasm(), initPdfium });
  await inspectPdfWithLocalWasm({ bytes: bytes(), wasmBinary: wasm(), initPdfium });
  const mallocEvents = runtime.events.filter((entry) => entry.startsWith('malloc:'));
  const openEvents = runtime.events.filter((entry) => entry.startsWith('open:'));
  assert.equal(mallocEvents.length, 2);
  assert.equal(openEvents.length, 2);
  assert.notEqual(openEvents[0].split(':')[1], openEvents[1].split(':')[1]);
  assert.equal(runtime.events.filter((entry) => entry === 'destroy').length, 2);
});

test('runtime module contains no real PDFium import or network/CDN loader surface', () => {
  const source = fs.readFileSync(path.join(__dirname, '../src/pdf/browser/pdf-inspect-runtime.js'), 'utf8');
  for (const forbidden of [
    /@embedpdf\/pdfium/,
    /DEFAULT_PDFIUM_WASM_URL/,
    /cdn\.jsdelivr\.net/,
    /fetch\s*\(/,
    /XMLHttpRequest/,
    /https?:\/\//,
  ]) {
    assert.equal(forbidden.test(source), false, `forbidden runtime source pattern: ${forbidden}`);
  }
});
