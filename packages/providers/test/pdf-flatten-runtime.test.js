'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  flattenPdfPageWithLocalWasm,
  FLATTEN_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-flatten-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-flatten-runtime.js');
const ORDER_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/multipage-order-synthetic-v1.pdf');
const ORDINARY_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/ordinary-minimal.pdf');
const TRUNCATED_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/truncated-pdf-like.pdf');
const NONPDF_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/declared-pdf-nonpdf.bin');
const ACTIVE_CONTENT_FIXTURE = path.join(
  REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/active-content-synthetic-v1.pdf',
);
const SIGNED_FIXTURE = path.join(
  REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/signed-structure-synthetic-v1.pdf',
);

function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function fakeRuntime(options = {}) {
  const events = [];
  const heap = new Uint8Array(options.heapBytes ?? 65536);
  let allocation = options.allocation ?? 64;
  const savedBytes = Uint8Array.from(options.savedBytes ?? [0x25, 0x50, 0x44, 0x46, 0x2d]);
  const writers = new Map();
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
      return options.badDocument ?? 71;
    },
    FPDF_GetLastError() {
      events.push('last-error');
      if (options.throwLastError) throw new Error('last error boom');
      return options.lastError ?? 7;
    },
    FPDF_GetPageCount(handle) {
      events.push(`page-count:${handle}`);
      if (options.throwPageCount) throw new Error('page count boom');
      return options.pageCount ?? 1;
    },
    FPDF_GetSignatureCount(handle) {
      events.push(`signature-count:${handle}`);
      if (options.throwSignatureCount) throw new Error('signature count boom');
      return options.signatureCount ?? 0;
    },
    FPDF_LoadPage(handle, index) {
      events.push(`load-page:${handle}:${index}`);
      if (options.throwLoadPage) throw new Error('load page boom');
      return options.badPage ?? 101;
    },
    FPDF_ClosePage(handle) {
      events.push(`close-page:${handle}`);
      if (options.throwClosePage) throw new Error('close page boom');
    },
    FPDFPage_Flatten(page, flag) {
      events.push(`flatten:${page}:${flag}`);
      if (options.throwFlatten) throw new Error('flatten boom');
      if (options.flattenFalse) return 0;
      return options.flattenStatus ?? 2;
    },
    PDFiumExt_OpenFileWriter() {
      events.push('open-writer');
      if (options.throwOpenWriter) throw new Error('open writer boom');
      writers.set(201, savedBytes);
      return options.badWriter ?? 201;
    },
    PDFiumExt_SaveAsCopy(handle, writerHandle) {
      events.push(`save:${handle}:${writerHandle}`);
      if (options.throwSave) throw new Error('save boom');
      if (options.saveFalse) return 0;
      return 1;
    },
    PDFiumExt_GetFileWriterSize(writerHandle) {
      events.push(`writer-size:${writerHandle}`);
      if (options.throwWriterSize) throw new Error('writer size boom');
      return options.writerSize ?? savedBytes.length;
    },
    PDFiumExt_GetFileWriterData(writerHandle, pointer, length) {
      events.push(`writer-data:${writerHandle}:${pointer}:${length}`);
      if (options.throwWriterData) throw new Error('writer data boom');
      heap.set(savedBytes.subarray(0, length), pointer);
      return options.shortRead ?? length;
    },
    PDFiumExt_CloseFileWriter(writerHandle) {
      events.push(`close-writer:${writerHandle}`);
      if (options.throwCloseWriter) throw new Error('close writer boom');
      writers.delete(writerHandle);
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

function optionsFor(overrides = {}) {
  return {
    bytes: overrides.bytes ?? bytes(),
    wasmBinary: overrides.wasmBinary ?? wasm(),
    initPdfium: overrides.initPdfium ?? (async () => fakeRuntime().module),
    pageIndex: overrides.pageIndex ?? 0,
  };
}

test('flatten module exposes only the bounded runtime surface', () => {
  const runtime = require('../src/pdf/browser/pdf-flatten-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['flattenPdfPageWithLocalWasm', 'FLATTEN_RESOURCE_BUDGETS']);
  assert.equal(typeof flattenPdfPageWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(FLATTEN_RESOURCE_BUDGETS, { maxInputBytes: 67108864, maxOutputBytes: 67108864 });
  assert.equal(Object.isFrozen(FLATTEN_RESOURCE_BUDGETS), true);
});

test('invalid options fail before any runtime effect', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  const base = optionsFor({ initPdfium });
  const invalid = [
    { ...base, bytes: new Uint8Array() },
    { ...base, wasmBinary: new Uint8Array() },
    { ...base, initPdfium: null },
    { ...base, pageIndex: -1 },
    { ...base, pageIndex: 1.5 },
    { ...base, pageIndex: '0' },
    { ...base, extra: 1 },
    { bytes: base.bytes, wasmBinary: base.wasmBinary, initPdfium },
  ];
  for (const options of invalid) {
    await assert.rejects(flattenPdfPageWithLocalWasm(options), TypeError);
  }
  await assert.rejects(flattenPdfPageWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('successful flatten follows the lifecycle with the normal flag', async () => {
  const runtime = fakeRuntime({ savedBytes: [3, 3, 3] });
  const result = await flattenPdfPageWithLocalWasm({
    bytes: bytes(),
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
    pageIndex: 0,
  });
  const order = runtime.events.filter((event) => !event.startsWith('malloc:') && !event.startsWith('free:'));
  assert.deepEqual(order, [
    'library-init',
    'open:64:8:',
    'page-count:71',
    'signature-count:71',
    'load-page:71:0',
    'flatten:101:0',
    'close-page:101',
    'signature-count:71',
    'open-writer',
    'save:71:201',
    'writer-size:201',
    'writer-data:201:89:3',
    'close-writer:201',
    'close:71',
    'destroy',
  ]);
  assert.equal(result.succeeded, true);
  assert.equal(result.pageIndex, 0);
  assert.equal(result.flattenStatus, 2);
  assert.equal(result.pageCount, 1);
  assert.deepEqual(Array.from(result.outputBytes), [3, 3, 3]);
});

test('flatten failure publishes nothing with full cleanup', async () => {
  for (const mode of ['throwFlatten', 'flattenFalse']) {
    const runtime = fakeRuntime({ [mode]: true });
    await assert.rejects(
      flattenPdfPageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
      /flatten boom|did not complete/,
    );
    assert.equal(runtime.events.some((event) => event.startsWith('open-writer')), false);
    assert.ok(runtime.events.includes('close-page:101'));
    assert.ok(runtime.events.includes('close:71'));
    assert.ok(runtime.events.includes('destroy'));
  }
});

test('out-of-range page target fails with zero mutation calls', async () => {
  const runtime = fakeRuntime({ pageCount: 1 });
  await assert.rejects(
    flattenPdfPageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module, pageIndex: 7 })),
    /pageIndex is out of range/,
  );
  assert.equal(runtime.events.some((event) => event.startsWith('load-page')), false);
  assert.equal(runtime.events.some((event) => event.startsWith('flatten')), false);
  assert.ok(runtime.events.includes('close:71'));
  assert.ok(runtime.events.includes('destroy'));
});

test('input and output budgets fail closed with exact diagnostics', async () => {
  const big = new Uint8Array(64 * 1024 * 1024 + 1);
  await assert.rejects(
    flattenPdfPageWithLocalWasm(optionsFor({ bytes: big })),
    /exceeds the flatten resource budget/,
  );
  const runtime = fakeRuntime({ writerSize: 64 * 1024 * 1024 + 1, savedBytes: [1] });
  await assert.rejects(
    flattenPdfPageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /exceeds the flatten resource budget/,
  );
  assert.ok(runtime.events.includes('close:71'));
});

test('mid-run caller mutation of bytes or wasm fails closed', async () => {
  for (const key of ['bytes', 'wasmBinary']) {
    const runtime = fakeRuntime();
    const options = optionsFor({ initPdfium: async () => runtime.module });
    const original = options[key];
    const probe = flattenPdfPageWithLocalWasm(options);
    original[0] = original[0] ^ 0xff;
    const error = await probe.then(() => null, (failure) => failure);
    assert.ok(error instanceof AggregateError);
    assert.ok(error.errors.some((entry) => /changed during PDFium page flatten/.test(entry.message)));
  }
});

test('initializer replacing runtime WASM bytes fails closed', async () => {
  const runtime = fakeRuntime();
  await assert.rejects(
    flattenPdfPageWithLocalWasm(optionsFor({
      initPdfium: async (initOptions) => {
        initOptions.wasmBinary = Uint8Array.from([9, 9, 9]);
        return runtime.module;
      },
    })),
    /replaced runtime WASM bytes/,
  );
});

test('runtime source exposes no network, worker, or subprocess surface', () => {
  const source = fs.readFileSync(SOURCE_PATH, 'utf8');
  assert.equal((source.match(/await initPdfium\(/g) || []).length, 1);
  assert.doesNotMatch(source, /child_process|setTimeout\(|setInterval\(|Worker\(/);
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|WebSocket|node:net|node:http|node:dns/);
  assert.doesNotMatch(source, /FPDFAction_|DoJSAction|JavaScript|SubmitForm|Launch/);
});

function exactPackagePaths() {
  const mainPath = require.resolve('@embedpdf/pdfium');
  const packageRoot = path.resolve(path.dirname(mainPath), '..');
  return {
    packageJson: path.join(packageRoot, 'package.json'),
    wasm: path.join(packageRoot, 'dist/pdfium.wasm'),
  };
}

function realWasmBinary() {
  return fs.readFileSync(exactPackagePaths().wasm);
}

function realInitPdfium() {
  const { init } = require('@embedpdf/pdfium');
  return (options) => init(options);
}

async function renderPixels(bytes, pageIndex) {
  const rendered = await renderPdfPageWithLocalWasm({
    bytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex, maxPixels: 40000,
  });
  assert.equal(rendered.openSucceeded, true);
  return Buffer.from(rendered.pixels);
}

async function pageText(bytes, pageIndex) {
  const extracted = await extractPdfPageTextWithLocalWasm({
    bytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex, maxChars: 500,
  });
  assert.equal(extracted.openSucceeded, true);
  return extracted.text;
}

test('adopted package and WASM identities match the canonical qualification', () => {
  const { packageJson, wasm } = exactPackagePaths();
  const metadata = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
  assert.equal(metadata.name, '@embedpdf/pdfium');
  assert.equal(metadata.version, '2.15.0');
  const wasmBytes = fs.readFileSync(wasm);
  assert.equal(wasmBytes.byteLength, 4633788);
  assert.equal(sha256(wasmBytes), 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8');
});

test('real flatten of the ordinary page preserves rendering and text', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const inputBefore = Buffer.from(input);
  const beforePixels = await renderPixels(input, 0);
  const beforeText = await pageText(input, 0);
  let initCalls = 0;
  const initPdfium = async (options) => { initCalls += 1; return realInitPdfium()(options); };
  const result = await flattenPdfPageWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium, pageIndex: 0,
  });
  assert.equal(initCalls, 1);
  assert.equal(result.succeeded, true);
  assert.equal(result.flattenStatus, 2);
  assert.equal(result.pageCount, 1);
  assert.equal(result.signatureStructurePresent, false);
  assert.deepEqual(Buffer.from(input), inputBefore);
  assert.deepEqual(await renderPixels(result.outputBytes, 0), beforePixels);
  assert.equal(await pageText(result.outputBytes, 0), beforeText);
  const inspection = await inspectPdfWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
  assert.equal(inspection.pageCount, 1);
});

test('real flatten on a later page leaves other pages intact', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDER_FIXTURE));
  const result = await flattenPdfPageWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 2,
  });
  assert.equal(result.succeeded, true);
  assert.equal(await pageText(result.outputBytes, 0), 'page-alpha');
  assert.equal(await pageText(result.outputBytes, 1), 'page-beta');
});

test('real flatten of annotated pages fails closed and mutates nothing', async () => {
  // First-hand provider behavior: FPDFPage_Flatten returns 1 (FLATTEN_FAIL)
  // on both the signed-structure and active-content pages (each carries
  // annotations), and 2 (FLATTEN_SUCCESS) on annotation-free pages. The
  // runtime publishes nothing on the failure path.
  for (const fixture of [SIGNED_FIXTURE, ACTIVE_CONTENT_FIXTURE]) {
    const input = new Uint8Array(fs.readFileSync(fixture));
    const before = Buffer.from(input);
    await assert.rejects(
      flattenPdfPageWithLocalWasm({
        bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0,
      }),
      /did not complete/,
    );
    assert.deepEqual(Buffer.from(input), before);
  }
});

test('real invalid targets and inputs fail closed', async () => {
  const ordinary = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const valid = {
    bytes: ordinary, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0,
  };
  await assert.rejects(flattenPdfPageWithLocalWasm({ ...valid, pageIndex: 7 }), /pageIndex is out of range/);
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  await assert.rejects(flattenPdfPageWithLocalWasm({ ...valid, bytes: truncated }), Error);
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(flattenPdfPageWithLocalWasm({ ...valid, bytes: nonPdf }), Error);
});
