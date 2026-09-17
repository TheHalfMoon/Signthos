'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  removePdfAnnotWithLocalWasm,
  ANNOT_REMOVE_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-annot-remove-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-annot-remove-runtime.js');
const FORM_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/form-text-synthetic-v1.pdf');
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
  const annots = options.annots ?? [{ handle: 401, subtype: 2 }];
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
    FPDFPage_GetAnnotCount(page) {
      events.push(`annot-count:${page}`);
      if (options.throwAnnotCount) throw new Error('annot count boom');
      return annots.length;
    },
    FPDFPage_GetAnnot(page, index) {
      events.push(`get-annot:${page}:${index}`);
      if (options.throwGetAnnot) throw new Error('get annot boom');
      return annots[index].handle;
    },
    FPDFAnnot_GetSubtype(handle) {
      events.push(`subtype:${handle}`);
      if (options.throwSubtype) throw new Error('subtype boom');
      return annots.find((entry) => entry.handle === handle).subtype;
    },
    FPDFPage_CloseAnnot(handle) {
      events.push(`close-annot:${handle}`);
      if (options.throwCloseAnnot) throw new Error('close annot boom');
    },
    FPDFPage_RemoveAnnot(page, index) {
      events.push(`remove:${page}:${index}`);
      if (options.throwRemove) throw new Error('remove boom');
      if (options.removeFalse) return 0;
      return 1;
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
    annotIndex: overrides.annotIndex ?? 0,
  };
}

test('annot-remove module exposes only the bounded runtime surface', () => {
  const runtime = require('../src/pdf/browser/pdf-annot-remove-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['removePdfAnnotWithLocalWasm', 'ANNOT_REMOVE_RESOURCE_BUDGETS']);
  assert.equal(typeof removePdfAnnotWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(ANNOT_REMOVE_RESOURCE_BUDGETS, { maxInputBytes: 67108864, maxOutputBytes: 67108864 });
  assert.equal(Object.isFrozen(ANNOT_REMOVE_RESOURCE_BUDGETS), true);
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
    { ...base, annotIndex: -1 },
    { ...base, annotIndex: 0.5 },
    { ...base, annotIndex: '0' },
    { ...base, extra: 1 },
    { bytes: base.bytes, wasmBinary: base.wasmBinary, initPdfium, pageIndex: 0 },
  ];
  for (const options of invalid) {
    await assert.rejects(removePdfAnnotWithLocalWasm(options), TypeError);
  }
  await assert.rejects(removePdfAnnotWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('successful removal follows the lifecycle and records the subtype', async () => {
  const runtime = fakeRuntime({ savedBytes: [3, 3, 3] });
  const result = await removePdfAnnotWithLocalWasm({
    bytes: bytes(),
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
    pageIndex: 0,
    annotIndex: 0,
  });
  const order = runtime.events.filter((event) => !event.startsWith('malloc:') && !event.startsWith('free:'));
  assert.deepEqual(order, [
    'library-init',
    'open:64:8:',
    'signature-count:71',
    'page-count:71',
    'load-page:71:0',
    'annot-count:101',
    'get-annot:101:0',
    'subtype:401',
    'close-annot:401',
    'remove:101:0',
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
  assert.equal(result.annotIndex, 0);
  assert.equal(result.removedSubtype, 2);
  assert.equal(result.pageCount, 1);
  assert.deepEqual(Array.from(result.outputBytes), [3, 3, 3]);
});

test('gate failures stop before any mutation surface', async () => {
  const signed = fakeRuntime({ signatureCount: 1 });
  await assert.rejects(
    removePdfAnnotWithLocalWasm(optionsFor({ initPdfium: async () => signed.module })),
    /not removal targets/,
  );
  assert.equal(signed.events.some((event) => event.startsWith('load-page')), false);
  const badPage = fakeRuntime({ pageCount: 1 });
  await assert.rejects(
    removePdfAnnotWithLocalWasm(optionsFor({ initPdfium: async () => badPage.module, pageIndex: 7 })),
    /pageIndex is out of range/,
  );
  assert.equal(badPage.events.some((event) => event.startsWith('load-page')), false);
  const badAnnot = fakeRuntime();
  await assert.rejects(
    removePdfAnnotWithLocalWasm(optionsFor({ initPdfium: async () => badAnnot.module, annotIndex: 4 })),
    /annotIndex is out of range/,
  );
  assert.equal(badAnnot.events.some((event) => event.startsWith('get-annot')), false);
  assert.equal(badAnnot.events.some((event) => event.startsWith('remove:')), false);
  for (const runtime of [signed, badPage, badAnnot]) {
    assert.ok(runtime.events.includes('close:71'));
    assert.ok(runtime.events.includes('destroy'));
  }
});

test('removal and save failures publish nothing with full cleanup', async () => {
  for (const mode of ['removeFalse', 'throwRemove', 'saveFalse']) {
    const runtime = fakeRuntime({ [mode]: true });
    await assert.rejects(
      removePdfAnnotWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
      /did not complete|remove boom|did not complete/,
    );
    assert.equal(runtime.events.some((event) => event.startsWith('open-writer')), mode === 'saveFalse');
    assert.ok(runtime.events.includes('close-annot:401'));
    assert.ok(runtime.events.includes('close-page:101'));
    assert.ok(runtime.events.includes('close:71'));
    assert.ok(runtime.events.includes('destroy'));
  }
});

test('input and output budgets fail closed with exact diagnostics', async () => {
  const big = new Uint8Array(64 * 1024 * 1024 + 1);
  await assert.rejects(
    removePdfAnnotWithLocalWasm(optionsFor({ bytes: big })),
    /exceeds the annot-remove resource budget/,
  );
  const runtime = fakeRuntime({ writerSize: 64 * 1024 * 1024 + 1, savedBytes: [1] });
  await assert.rejects(
    removePdfAnnotWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /exceeds the annot-remove resource budget/,
  );
  assert.ok(runtime.events.includes('close:71'));
});

test('mid-run caller mutation of bytes or wasm fails closed', async () => {
  for (const key of ['bytes', 'wasmBinary']) {
    const runtime = fakeRuntime();
    const options = optionsFor({ initPdfium: async () => runtime.module });
    const original = options[key];
    const probe = removePdfAnnotWithLocalWasm(options);
    original[0] = original[0] ^ 0xff;
    const error = await probe.then(() => null, (failure) => failure);
    assert.ok(error instanceof AggregateError);
    assert.ok(error.errors.some((entry) => /changed during PDFium annotation removal/.test(entry.message)));
  }
});

test('initializer replacing runtime WASM bytes fails closed', async () => {
  const runtime = fakeRuntime();
  await assert.rejects(
    removePdfAnnotWithLocalWasm(optionsFor({
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

async function annotCount(bytes, pageIndex) {
  const { init } = require('@embedpdf/pdfium');
  const wasmBinary = realWasmBinary();
  const module = await init({ wasmBinary });
  module.PDFiumExt_Init();
  const heap = module.pdfium.HEAPU8;
  const data = module.pdfium.wasmExports.malloc(bytes.byteLength);
  heap.set(bytes, data);
  const doc = module.FPDF_LoadMemDocument(data, bytes.byteLength, '');
  const page = module.FPDF_LoadPage(doc, pageIndex);
  const count = module.FPDFPage_GetAnnotCount(page);
  module.FPDF_ClosePage(page);
  module.FPDF_CloseDocument(doc);
  module.pdfium.wasmExports.free(data);
  module.FPDF_DestroyLibrary();
  return count;
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

test('real link removal drops the annot count and preserves text', async () => {
  const input = new Uint8Array(fs.readFileSync(ACTIVE_CONTENT_FIXTURE));
  const inputBefore = Buffer.from(input);
  assert.equal(await annotCount(input, 0), 1);
  const beforeText = await pageText(input, 0);
  let initCalls = 0;
  const initPdfium = async (options) => { initCalls += 1; return realInitPdfium()(options); };
  const result = await removePdfAnnotWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium, pageIndex: 0, annotIndex: 0,
  });
  assert.equal(initCalls, 1);
  assert.equal(result.succeeded, true);
  assert.equal(result.removedSubtype, 2);
  assert.equal(result.pageCount, 1);
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
  assert.deepEqual(Buffer.from(input), inputBefore);
  assert.equal(await annotCount(result.outputBytes, 0), 0);
  assert.equal(await pageText(result.outputBytes, 0), beforeText);
  const inspection = await inspectPdfWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
  assert.equal(inspection.pageCount, 1);
  const rendered = await renderPdfPageWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, maxPixels: 40000,
  });
  assert.equal(rendered.openSucceeded, true);
});

test('real widget removal on the unsigned form fixture drops its annot', async () => {
  const input = new Uint8Array(fs.readFileSync(FORM_FIXTURE));
  assert.equal(await annotCount(input, 0), 1);
  const result = await removePdfAnnotWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, annotIndex: 0,
  });
  assert.equal(result.succeeded, true);
  assert.equal(result.removedSubtype, 20);
  assert.equal(await annotCount(result.outputBytes, 0), 0);
});

test('real signed refusal and range failures mutate nothing', async () => {
  const signed = new Uint8Array(fs.readFileSync(SIGNED_FIXTURE));
  const signedBefore = Buffer.from(signed);
  await assert.rejects(removePdfAnnotWithLocalWasm({
    bytes: signed, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, annotIndex: 0,
  }), /not removal targets/);
  assert.deepEqual(Buffer.from(signed), signedBefore);
  assert.equal(await annotCount(signed, 0), 1);
  const ordinary = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  await assert.rejects(removePdfAnnotWithLocalWasm({
    bytes: ordinary, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, annotIndex: 0,
  }), /annotIndex is out of range/);
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  await assert.rejects(removePdfAnnotWithLocalWasm({
    bytes: truncated, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, annotIndex: 0,
  }), Error);
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(removePdfAnnotWithLocalWasm({
    bytes: nonPdf, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, annotIndex: 0,
  }), Error);
});
