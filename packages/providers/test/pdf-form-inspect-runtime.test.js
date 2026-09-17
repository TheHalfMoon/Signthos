'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  inspectPdfFormWithLocalWasm,
} = require('../src/pdf/browser/pdf-form-inspect-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-form-inspect-runtime.js');
const FORM_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/form-text-synthetic-v1.pdf');
const ORDINARY_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/ordinary-minimal.pdf');
const ORDER_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/multipage-order-synthetic-v1.pdf');
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
  const pages = options.pages ?? [[2]];
  let nextAnnot = 401;
  const handles = new Map();
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
      return options.pageCount ?? pages.length;
    },
    FPDF_GetSignatureCount(handle) {
      events.push(`signature-count:${handle}`);
      if (options.throwSignatureCount) throw new Error('signature count boom');
      return options.signatureCount ?? 0;
    },
    FPDF_GetFormType(handle) {
      events.push(`form-type:${handle}`);
      if (options.throwFormType) throw new Error('form type boom');
      return options.formType ?? 0;
    },
    FPDF_LoadPage(handle, index) {
      events.push(`load-page:${handle}:${index}`);
      if (options.throwLoadPage) throw new Error('load page boom');
      return options.badPage ?? (101 + index);
    },
    FPDF_ClosePage(handle) {
      events.push(`close-page:${handle}`);
      if (options.throwClosePage) throw new Error('close page boom');
    },
    FPDFPage_GetAnnotCount(page) {
      events.push(`annot-count:${page}`);
      if (options.throwAnnotCount) throw new Error('annot count boom');
      return pages[page - 101].length;
    },
    FPDFPage_GetAnnot(page, index) {
      events.push(`get-annot:${page}:${index}`);
      if (options.throwGetAnnot) throw new Error('get annot boom');
      const handle = nextAnnot;
      nextAnnot += 1;
      handles.set(handle, pages[page - 101][index]);
      return handle;
    },
    FPDFAnnot_GetSubtype(handle) {
      events.push(`subtype:${handle}`);
      if (options.throwSubtype) throw new Error('subtype boom');
      return handles.get(handle);
    },
    FPDFPage_CloseAnnot(handle) {
      events.push(`close-annot:${handle}`);
      if (options.throwCloseAnnot) throw new Error('close annot boom');
      handles.delete(handle);
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
  };
}

test('form-inspect module exposes only the inspection entry point', () => {
  const runtime = require('../src/pdf/browser/pdf-form-inspect-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['inspectPdfFormWithLocalWasm']);
  assert.equal(typeof inspectPdfFormWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
});

test('invalid options fail before any runtime effect', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  const base = optionsFor({ initPdfium });
  const invalid = [
    { ...base, bytes: new Uint8Array() },
    { ...base, wasmBinary: new Uint8Array() },
    { ...base, initPdfium: null },
    { ...base, extra: 1 },
    { bytes: base.bytes, wasmBinary: base.wasmBinary },
  ];
  for (const options of invalid) {
    await assert.rejects(inspectPdfFormWithLocalWasm(options), TypeError);
  }
  await assert.rejects(inspectPdfFormWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('multi-page census closes every annot and page in order', async () => {
  const runtime = fakeRuntime({ pages: [[2, 20], [], [20]], formType: 1 });
  const result = await inspectPdfFormWithLocalWasm({
    bytes: bytes(),
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
  });
  const order = runtime.events.filter((event) => !event.startsWith('malloc:') && !event.startsWith('free:'));
  assert.deepEqual(order, [
    'library-init',
    'open:64:8:',
    'page-count:71',
    'signature-count:71',
    'form-type:71',
    'load-page:71:0',
    'annot-count:101',
    'get-annot:101:0',
    'subtype:401',
    'close-annot:401',
    'get-annot:101:1',
    'subtype:402',
    'close-annot:402',
    'close-page:101',
    'load-page:71:1',
    'annot-count:102',
    'close-page:102',
    'load-page:71:2',
    'annot-count:103',
    'get-annot:103:0',
    'subtype:403',
    'close-annot:403',
    'close-page:103',
    'close:71',
    'destroy',
  ]);
  assert.equal(result.inspected, true);
  assert.equal(result.pageCount, 3);
  assert.equal(result.formType, 1);
  assert.equal(result.formKind, 'acroform');
  assert.deepEqual(result.pages, [
    { pageIndex: 0, annotCount: 2, subtypes: [2, 20] },
    { pageIndex: 1, annotCount: 0, subtypes: [] },
    { pageIndex: 2, annotCount: 1, subtypes: [20] },
  ]);
  assert.equal(Object.isFrozen(result.pages), true);
  assert.equal(Object.isFrozen(result.pages[0]), true);
  assert.equal(Object.isFrozen(result.pages[0].subtypes), true);
  assert.equal('outputBytes' in result, false);
});

test('form-kind mapping covers none, acroform, and other codes', async () => {
  for (const [formType, formKind] of [[0, 'none'], [1, 'acroform'], [9, 'other']]) {
    const runtime = fakeRuntime({ formType });
    const result = await inspectPdfFormWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module }));
    assert.equal(result.formType, formType);
    assert.equal(result.formKind, formKind);
  }
});

test('read failures close opened handles and aggregate', async () => {
  const failing = fakeRuntime({ throwSubtype: true, throwClose: true });
  const error = await inspectPdfFormWithLocalWasm(
    optionsFor({ initPdfium: async () => failing.module }),
  ).then(() => null, (failure) => failure);
  assert.ok(error instanceof AggregateError);
  assert.match(error.errors[0].message, /subtype boom/);
  assert.ok(error.errors.some((entry) => /close boom/.test(entry.message)));
});

test('mid-run caller mutation of bytes or wasm fails closed', async () => {
  for (const key of ['bytes', 'wasmBinary']) {
    const runtime = fakeRuntime();
    const options = optionsFor({ initPdfium: async () => runtime.module });
    const original = options[key];
    const probe = inspectPdfFormWithLocalWasm(options);
    original[0] = original[0] ^ 0xff;
    const error = await probe.then(() => null, (failure) => failure);
    assert.ok(error instanceof AggregateError);
    assert.ok(error.errors.some((entry) => /changed during PDFium form inspection/.test(entry.message)));
  }
});

test('initializer replacing runtime WASM bytes fails closed', async () => {
  const runtime = fakeRuntime();
  await assert.rejects(
    inspectPdfFormWithLocalWasm(optionsFor({
      initPdfium: async (initOptions) => {
        initOptions.wasmBinary = Uint8Array.from([9, 9, 9]);
        return runtime.module;
      },
    })),
    /replaced runtime WASM bytes/,
  );
});

test('runtime source exposes no network, worker, subprocess, or writer surface', () => {
  const source = fs.readFileSync(SOURCE_PATH, 'utf8');
  assert.equal((source.match(/await initPdfium\(/g) || []).length, 1);
  assert.doesNotMatch(source, /child_process|setTimeout\(|setInterval\(|Worker\(/);
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|WebSocket|node:net|node:http|node:dns/);
  assert.doesNotMatch(source, /FPDFAction_|DoJSAction|JavaScript|SubmitForm|Launch/);
  assert.doesNotMatch(source, /FileWriter|SaveAsCopy/);
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

test('adopted package and WASM identities match the canonical qualification', () => {
  const { packageJson, wasm } = exactPackagePaths();
  const metadata = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
  assert.equal(metadata.name, '@embedpdf/pdfium');
  assert.equal(metadata.version, '2.15.0');
  const wasmBytes = fs.readFileSync(wasm);
  assert.equal(wasmBytes.byteLength, 4633788);
  assert.equal(sha256(wasmBytes), 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8');
});

test('real corpus census matches the rehearsed contract on every fixture', async () => {
  const expectations = [
    [ORDINARY_FIXTURE, { pageCount: 1, signatureCount: 0, formType: 0, formKind: 'none', pages: [{ pageIndex: 0, annotCount: 0, subtypes: [] }] }],
    [FORM_FIXTURE, { pageCount: 1, signatureCount: 0, formType: 1, formKind: 'acroform', pages: [{ pageIndex: 0, annotCount: 1, subtypes: [20] }] }],
    [ACTIVE_CONTENT_FIXTURE, { pageCount: 1, signatureCount: 0, formType: 0, formKind: 'none', pages: [{ pageIndex: 0, annotCount: 1, subtypes: [2] }] }],
    [SIGNED_FIXTURE, { pageCount: 1, signatureCount: 1, formType: 1, formKind: 'acroform', pages: [{ pageIndex: 0, annotCount: 1, subtypes: [20] }] }],
    [ORDER_FIXTURE, { pageCount: 3, signatureCount: 0, formType: 0, formKind: 'none', pages: [{ pageIndex: 0, annotCount: 0, subtypes: [] }, { pageIndex: 1, annotCount: 0, subtypes: [] }, { pageIndex: 2, annotCount: 0, subtypes: [] }] }],
  ];
  for (const [fixturePath, expected] of expectations) {
    const input = new Uint8Array(fs.readFileSync(fixturePath));
    const before = Buffer.from(input);
    const result = await inspectPdfFormWithLocalWasm({
      bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    });
    assert.equal(result.inspected, true);
    assert.equal(result.pageCount, expected.pageCount, fixturePath);
    assert.equal(result.signatureCount, expected.signatureCount, fixturePath);
    assert.equal(result.signatureStructurePresent, expected.signatureCount > 0, fixturePath);
    assert.equal(result.formType, expected.formType, fixturePath);
    assert.equal(result.formKind, expected.formKind, fixturePath);
    assert.deepEqual(result.pages, expected.pages, fixturePath);
    assert.deepEqual(Buffer.from(input), before, fixturePath);
  }
});

test('real invalid inputs fail closed', async () => {
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  await assert.rejects(inspectPdfFormWithLocalWasm({
    bytes: truncated, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  }), Error);
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(inspectPdfFormWithLocalWasm({
    bytes: nonPdf, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  }), Error);
});
