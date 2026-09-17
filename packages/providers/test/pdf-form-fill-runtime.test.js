'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  fillPdfFormTextWithLocalWasm,
  FORM_FILL_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-form-fill-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-form-fill-runtime.js');
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

function savedWithProof(value) {
  return Array.from(Buffer.from(`%PDF-1.7 /V (${value}) end`, 'latin1'));
}

function fakeRuntime(options = {}) {
  const events = [];
  const heap = new Uint8Array(options.heapBytes ?? 65536);
  let allocation = options.allocation ?? 64;
  const savedBytes = Uint8Array.from(options.savedBytes ?? savedWithProof('HI'));
  const writers = new Map();
  let typedChars = '';
  const annots = options.annots ?? [{ handle: 401, subtype: 20 }];
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
    FPDF_GetFormType(handle) {
      events.push(`form-type:${handle}`);
      if (options.throwFormType) throw new Error('form type boom');
      return options.formType ?? 1;
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
    PDFiumExt_OpenFormFillInfo() {
      events.push('open-form-info');
      if (options.throwOpenFormInfo) throw new Error('open form info boom');
      return options.badFormInfo ?? 601;
    },
    PDFiumExt_InitFormFillEnvironment(handle, info) {
      events.push(`init-form:${handle}:${info}`);
      if (options.throwInitForm) throw new Error('init form boom');
      return options.badForm ?? 602;
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
    FORM_OnAfterLoadPage(page, form) {
      events.push(`after-load:${page}:${form}`);
      if (options.throwAfterLoad) throw new Error('after load boom');
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
    FORM_SetFocusedAnnot(form, annot) {
      events.push(`focus:${form}:${annot}`);
      if (options.throwFocus) throw new Error('focus boom');
      if (options.focusFalse) return 0;
      return 1;
    },
    FORM_OnChar(form, page, code, flags) {
      events.push(`char:${form}:${page}:${code}:${flags}`);
      if (options.throwChar) throw new Error('char boom');
      typedChars += String.fromCharCode(code);
      if (options.charFalse) return 0;
      return 1;
    },
    FORM_ForceToKillFocus(form) {
      events.push(`kill-focus:${form}`);
      if (options.throwKillFocus) throw new Error('kill focus boom');
      if (options.killFocusFalse) return 0;
      return 1;
    },
    FORM_OnBeforeClosePage(page, form) {
      events.push(`before-close:${page}:${form}`);
      if (options.throwBeforeClose) throw new Error('before close boom');
    },
    PDFiumExt_ExitFormFillEnvironment(form) {
      events.push(`exit-form:${form}`);
      if (options.throwExitForm) throw new Error('exit form boom');
    },
    PDFiumExt_CloseFormFillInfo(info) {
      events.push(`close-form-info:${info}`);
      if (options.throwCloseFormInfo) throw new Error('close form info boom');
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
  return {
    module, events, heap, typed: () => typedChars,
  };
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
    widgetIndex: overrides.widgetIndex ?? 0,
    value: overrides.value ?? 'HI',
  };
}

test('form-fill module exposes only the bounded runtime surface', () => {
  const runtime = require('../src/pdf/browser/pdf-form-fill-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['fillPdfFormTextWithLocalWasm', 'FORM_FILL_RESOURCE_BUDGETS']);
  assert.equal(typeof fillPdfFormTextWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(FORM_FILL_RESOURCE_BUDGETS, {
    maxInputBytes: 67108864, maxOutputBytes: 67108864, maxFillChars: 500,
  });
  assert.equal(Object.isFrozen(FORM_FILL_RESOURCE_BUDGETS), true);
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
    { ...base, widgetIndex: -1 },
    { ...base, widgetIndex: 2.5 },
    { ...base, value: '' },
    { ...base, value: 'x'.repeat(501) },
    { ...base, value: 'caf\u00e9' },
    { ...base, value: 'a(b' },
    { ...base, value: 'a)b' },
    { ...base, value: 'a\\b' },
    { ...base, value: 'hi\nthere' },
    { ...base, value: 42 },
    { ...base, extra: 1 },
    { bytes: base.bytes, wasmBinary: base.wasmBinary, initPdfium, pageIndex: 0, widgetIndex: 0 },
  ];
  for (const options of invalid) {
    await assert.rejects(fillPdfFormTextWithLocalWasm(options), TypeError);
  }
  await assert.rejects(fillPdfFormTextWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('successful fill follows the lifecycle and types every character', async () => {
  const runtime = fakeRuntime();
  const result = await fillPdfFormTextWithLocalWasm({
    bytes: bytes(),
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
    pageIndex: 0,
    widgetIndex: 0,
    value: 'HI',
  });
  assert.equal(runtime.typed(), 'HI');
  const order = runtime.events.filter((event) => !event.startsWith('malloc:') && !event.startsWith('free:'));
  assert.deepEqual(order, [
    'library-init',
    'open:64:8:',
    'form-type:71',
    'signature-count:71',
    'page-count:71',
    'open-form-info',
    'init-form:71:601',
    'load-page:71:0',
    'after-load:101:602',
    'annot-count:101',
    'get-annot:101:0',
    'subtype:401',
    'focus:602:401',
    'char:602:101:72:0',
    'char:602:101:73:0',
    'kill-focus:602',
    'close-annot:401',
    'before-close:101:602',
    'close-page:101',
    'signature-count:71',
    'open-writer',
    'save:71:201',
    'writer-size:201',
    'writer-data:201:89:20',
    'close-writer:201',
    'exit-form:602',
    'close-form-info:601',
    'close:71',
    'destroy',
  ]);
  assert.equal(result.succeeded, true);
  assert.equal(result.pageIndex, 0);
  assert.equal(result.widgetIndex, 0);
  assert.equal(result.filledValue, 'HI');
  assert.equal(result.pageCount, 1);
  assert.equal(result.signatureCount, 0);
  assert.equal(result.signatureStructurePresent, false);
});

test('gate failures stop before any mutation surface', async () => {
  const noForm = fakeRuntime({ formType: 0 });
  await assert.rejects(
    fillPdfFormTextWithLocalWasm(optionsFor({ initPdfium: async () => noForm.module })),
    /no AcroForm/,
  );
  assert.equal(noForm.events.some((event) => event.startsWith('open-form-info')), false);
  const signed = fakeRuntime({ signatureCount: 1 });
  await assert.rejects(
    fillPdfFormTextWithLocalWasm(optionsFor({ initPdfium: async () => signed.module })),
    /not fill targets/,
  );
  assert.equal(signed.events.some((event) => event.startsWith('open-form-info')), false);
  const badPage = fakeRuntime({ pageCount: 1 });
  await assert.rejects(
    fillPdfFormTextWithLocalWasm(optionsFor({ initPdfium: async () => badPage.module, pageIndex: 7 })),
    /pageIndex is out of range/,
  );
  assert.equal(badPage.events.some((event) => event.startsWith('open-form-info')), false);
  const noWidget = fakeRuntime({ annots: [{ handle: 402, subtype: 2 }] });
  await assert.rejects(
    fillPdfFormTextWithLocalWasm(optionsFor({ initPdfium: async () => noWidget.module })),
    /no widget annotation at widgetIndex/,
  );
  assert.ok(noWidget.events.includes('close-annot:402'));
  assert.equal(noWidget.events.some((event) => event.startsWith('focus')), false);
  assert.ok(noWidget.events.includes('exit-form:602'));
  assert.ok(noWidget.events.includes('close-form-info:601'));
  assert.ok(noWidget.events.includes('close:71'));
  assert.ok(noWidget.events.includes('destroy'));
});

test('focus, typing, and release failures publish nothing with environment teardown', async () => {
  for (const mode of ['focusFalse', 'charFalse', 'killFocusFalse']) {
    const runtime = fakeRuntime({ [mode]: true });
    await assert.rejects(
      fillPdfFormTextWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
      /did not accept focus|not accepted|did not release focus/,
    );
    assert.equal(runtime.events.some((event) => event.startsWith('open-writer')), false);
    assert.equal(runtime.events.filter((event) => event.startsWith('close-annot:')).length, 1);
    assert.ok(runtime.events.includes('close-page:101'));
    assert.ok(runtime.events.includes('exit-form:602'));
    assert.ok(runtime.events.includes('close-form-info:601'));
    assert.ok(runtime.events.includes('close:71'));
    assert.ok(runtime.events.includes('destroy'));
  }
});

test('missing fill proof fails closed after a complete save', async () => {
  const runtime = fakeRuntime({ savedBytes: [0x25, 0x50, 0x44, 0x46] });
  await assert.rejects(
    fillPdfFormTextWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /fill proof is absent/,
  );
  assert.ok(runtime.events.includes('close:71'));
  assert.ok(runtime.events.includes('destroy'));
});

test('input and output budgets fail closed with exact diagnostics', async () => {
  const big = new Uint8Array(64 * 1024 * 1024 + 1);
  await assert.rejects(
    fillPdfFormTextWithLocalWasm(optionsFor({ bytes: big })),
    /exceeds the form-fill resource budget/,
  );
  const runtime = fakeRuntime({ writerSize: 64 * 1024 * 1024 + 1, savedBytes: [1] });
  await assert.rejects(
    fillPdfFormTextWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /exceeds the form-fill resource budget/,
  );
  assert.ok(runtime.events.includes('close:71'));
});

test('mid-run caller mutation of bytes or wasm fails closed', async () => {
  for (const key of ['bytes', 'wasmBinary']) {
    const runtime = fakeRuntime();
    const options = optionsFor({ initPdfium: async () => runtime.module });
    const original = options[key];
    const probe = fillPdfFormTextWithLocalWasm(options);
    original[0] = original[0] ^ 0xff;
    const error = await probe.then(() => null, (failure) => failure);
    assert.ok(error instanceof AggregateError);
    assert.ok(error.errors.some((entry) => /changed during PDFium form fill/.test(entry.message)));
  }
});

test('initializer replacing runtime WASM bytes fails closed', async () => {
  const runtime = fakeRuntime();
  await assert.rejects(
    fillPdfFormTextWithLocalWasm(optionsFor({
      initPdfium: async (initOptions) => {
        initOptions.wasmBinary = Uint8Array.from([9, 9, 9]);
        return runtime.module;
      },
    })),
    /replaced runtime WASM bytes/,
  );
});

test('runtime source exposes no network, worker, subprocess, or JS-action surface', () => {
  const source = fs.readFileSync(SOURCE_PATH, 'utf8');
  assert.equal((source.match(/await initPdfium\(/g) || []).length, 1);
  assert.doesNotMatch(source, /child_process|setTimeout\(|setInterval\(|Worker\(/);
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|WebSocket|node:net|node:http|node:dns/);
  assert.doesNotMatch(source, /DoJSAction|DoDocumentJSAction|JavaScriptAction|SubmitForm|Launch|JavaScript/);
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

test('real fill persists /V, preserves text, and reopens valid', async () => {
  const input = new Uint8Array(fs.readFileSync(FORM_FIXTURE));
  const inputBefore = Buffer.from(input);
  const beforeText = await pageText(input, 0);
  let initCalls = 0;
  const initPdfium = async (options) => { initCalls += 1; return realInitPdfium()(options); };
  const result = await fillPdfFormTextWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium,
    pageIndex: 0, widgetIndex: 0, value: 'HI Brown',
  });
  assert.equal(initCalls, 1);
  assert.equal(result.succeeded, true);
  assert.equal(result.filledValue, 'HI Brown');
  assert.deepEqual(result.pageIndex, 0);
  assert.deepEqual(result.widgetIndex, 0);
  assert.equal(result.pageCount, 1);
  assert.equal(result.signatureCount, 0);
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
  assert.deepEqual(Buffer.from(input), inputBefore);
  const outputLatin1 = Buffer.from(result.outputBytes).toString('latin1');
  assert.ok(outputLatin1.includes('/V(HI Brown)') || outputLatin1.includes('/V (HI Brown)'));
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

test('real non-form, signed, and non-widget targets fail closed', async () => {
  const ordinary = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const ordinaryBefore = Buffer.from(ordinary);
  await assert.rejects(fillPdfFormTextWithLocalWasm({
    bytes: ordinary, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    pageIndex: 0, widgetIndex: 0, value: 'HI',
  }), /no AcroForm/);
  assert.deepEqual(Buffer.from(ordinary), ordinaryBefore);
  const signed = new Uint8Array(fs.readFileSync(SIGNED_FIXTURE));
  const signedBefore = Buffer.from(signed);
  await assert.rejects(fillPdfFormTextWithLocalWasm({
    bytes: signed, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    pageIndex: 0, widgetIndex: 0, value: 'HI',
  }), /not fill targets/);
  assert.deepEqual(Buffer.from(signed), signedBefore);
  // The active fixture carries a Link annot but no AcroForm dictionary, so it
  // fails at the form gate (the widget gate is covered by stub tests).
  const active = new Uint8Array(fs.readFileSync(ACTIVE_CONTENT_FIXTURE));
  const activeBefore = Buffer.from(active);
  await assert.rejects(fillPdfFormTextWithLocalWasm({
    bytes: active, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    pageIndex: 0, widgetIndex: 0, value: 'HI',
  }), /no AcroForm/);
  assert.deepEqual(Buffer.from(active), activeBefore);
});

test('real invalid targets and inputs fail closed', async () => {
  const form = new Uint8Array(fs.readFileSync(FORM_FIXTURE));
  const valid = {
    bytes: form, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    pageIndex: 0, widgetIndex: 0, value: 'HI',
  };
  await assert.rejects(fillPdfFormTextWithLocalWasm({ ...valid, pageIndex: 7 }), /pageIndex is out of range/);
  await assert.rejects(fillPdfFormTextWithLocalWasm({ ...valid, widgetIndex: 3 }), /no widget annotation at widgetIndex/);
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  await assert.rejects(fillPdfFormTextWithLocalWasm({ ...valid, bytes: truncated }), Error);
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(fillPdfFormTextWithLocalWasm({ ...valid, bytes: nonPdf }), Error);
});
