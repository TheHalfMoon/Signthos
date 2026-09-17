'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  numberPdfPagesWithLocalWasm,
  NUMBER_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-page-number-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-page-number-runtime.js');
const MULTIPAGE_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/multipage-order-synthetic-v1.pdf');
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
  const savedBytes = Uint8Array.from(options.savedBytes ?? [9, 9, 9]);
  const writers = new Map();
  const placedTexts = [];
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
    },
    FPDF_LoadMemDocument(pointer, length, password) {
      events.push(`open:${pointer}:${length}:${password}`);
      if (options.throwOpen) throw new Error('open boom');
      if (options.rejectOpen) return 0;
      return options.badDocument ?? 71;
    },
    FPDF_GetLastError() {
      events.push('last-error');
      return options.lastError ?? 7;
    },
    FPDF_GetPageCount(handle) {
      events.push(`page-count:${handle}`);
      if (options.throwPageCount) throw new Error('page count boom');
      return options.pageCount ?? 3;
    },
    FPDF_GetSignatureCount(handle) {
      events.push(`signature-count:${handle}`);
      return options.signatureCount ?? 0;
    },
    FPDFText_LoadStandardFont(handle, name) {
      events.push(`load-font:${handle}:${name}`);
      return options.badFont ?? 301;
    },
    FPDFPageObj_CreateTextObj(handle, font, size) {
      events.push(`create-text:${handle}:${font}:${size}`);
      if (options.throwCreateText) throw new Error('create text boom');
      return options.badText ?? 401;
    },
    FPDFText_SetText(handle, pointer) {
      const units = [];
      const view = new DataView(heap.buffer, heap.byteOffset, heap.byteLength);
      for (let at = 0; ; at += 1) {
        const unit = view.getUint16(pointer + at * 2, true);
        if (unit === 0) break;
        units.push(unit);
        if (units.length > 600) break;
      }
      events.push(`set-text:${handle}:${units.join(',')}`);
      placedTexts.push(String.fromCharCode(...units));
      if (options.setTextFalse) return 0;
      return 1;
    },
    FPDFPageObj_SetFillColor(handle, red, green, blue, alpha) {
      events.push(`fill-color:${handle}:${red},${green},${blue},${alpha}`);
      return 1;
    },
    FPDFPageObj_Transform(handle) {
      events.push(`transform:${handle}`);
    },
    FPDF_LoadPage(handle, index) {
      events.push(`load-page:${handle}:${index}`);
      return options.badPage ?? 101;
    },
    FPDF_ClosePage(handle) {
      events.push(`close-page:${handle}`);
    },
    FPDFPage_InsertObject(page, object) {
      events.push(`insert:${page}:${object}`);
      if (options.throwInsert) throw new Error('insert boom');
    },
    FPDFPage_GenerateContent(page) {
      events.push(`generate:${page}`);
      if (options.throwGenerate) throw new Error('generate boom');
      if (options.generateFalse) return 0;
      return 1;
    },
    FPDFPageObj_Destroy(handle) {
      events.push(`destroy-object:${handle}`);
    },
    PDFiumExt_OpenFileWriter() {
      events.push('open-writer');
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
      return options.writerSize ?? savedBytes.length;
    },
    PDFiumExt_GetFileWriterData(writerHandle, pointer, length) {
      events.push(`writer-data:${writerHandle}:${pointer}:${length}`);
      heap.set(savedBytes.subarray(0, length), pointer);
      return options.shortRead ?? length;
    },
    PDFiumExt_CloseFileWriter(writerHandle) {
      events.push(`close-writer:${writerHandle}`);
      writers.delete(writerHandle);
    },
    FPDF_CloseDocument(handle) {
      events.push(`close:${handle}`);
    },
    FPDF_DestroyLibrary() {
      events.push('destroy');
    },
  };
  return { module, events, placedTexts };
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
    startNumber: overrides.startNumber ?? 7,
    x: overrides.x ?? 30,
    y: overrides.y ?? 40,
    fontSize: overrides.fontSize ?? 24,
    angleDegrees: overrides.angleDegrees ?? 0,
    red: overrides.red ?? 0,
    green: overrides.green ?? 0,
    blue: overrides.blue ?? 0,
    alpha: overrides.alpha ?? 255,
  };
}

test('page-number module exposes only the bounded composer surface', () => {
  const runtime = require('../src/pdf/browser/pdf-page-number-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['numberPdfPagesWithLocalWasm', 'NUMBER_RESOURCE_BUDGETS']);
  assert.equal(typeof numberPdfPagesWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(NUMBER_RESOURCE_BUDGETS, {
    maxInputBytes: 67108864, maxOutputBytes: 67108864, maxPages: 10000,
    maxCoordinate: 10000, maxFontSize: 144, maxAngleDegrees: 360, maxChannel: 255,
  });
  assert.equal(Object.isFrozen(NUMBER_RESOURCE_BUDGETS), true);
});

test('invalid options fail before any runtime effect', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  const base = optionsFor({ initPdfium });
  const invalid = [
    { ...base, bytes: new Uint8Array() },
    { ...base, wasmBinary: new Uint8Array() },
    { ...base, initPdfium: null },
    { ...base, startNumber: -1 },
    { ...base, startNumber: 1.5 },
    { ...base, startNumber: Number.NaN },
    { ...base, x: Number.NaN },
    { ...base, x: 20000 },
    { ...base, fontSize: 0 },
    { ...base, fontSize: 145 },
    { ...base, angleDegrees: 361 },
    { ...base, angleDegrees: -361 },
    { ...base, red: -1 },
    { ...base, red: 256 },
    { ...base, green: '0' },
    { ...base, blue: null },
    { ...base, alpha: 300 },
    { ...base, extra: 1 },
    {
      bytes: base.bytes, wasmBinary: base.wasmBinary, initPdfium,
      startNumber: 1, x: 0, y: 0, fontSize: 12, angleDegrees: 0,
      red: 0, green: 0, blue: 0,
    },
  ];
  for (const options of invalid) {
    await assert.rejects(numberPdfPagesWithLocalWasm(options), TypeError);
  }
  await assert.rejects(numberPdfPagesWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('oversized input fails before any runtime effect', async () => {
  let initCalls = 0;
  const big = new Uint8Array(64 * 1024 * 1024 + 1);
  await assert.rejects(
    numberPdfPagesWithLocalWasm(optionsFor({
      bytes: big, initPdfium: async () => { initCalls += 1; throw new Error('no start'); },
    })),
    /exceeds the page-number resource budget/,
  );
  assert.equal(initCalls, 0);
});

test('stub composition numbers every page in order with exact texts', async () => {
  const runtime = fakeRuntime({ pageCount: 3, savedBytes: [9, 9, 9] });
  let initCalls = 0;
  const result = await numberPdfPagesWithLocalWasm(optionsFor({
    initPdfium: async () => { initCalls += 1; return runtime.module; },
  }));
  assert.equal(initCalls, 4);
  assert.equal(result.succeeded, true);
  assert.equal(result.pageCount, 3);
  assert.equal(result.startNumber, 7);
  assert.deepEqual(result.placedTexts, ['7', '8', '9']);
  assert.deepEqual(runtime.placedTexts, ['7', '8', '9']);
  assert.equal(Object.isFrozen(result.placedTexts), true);
  assert.deepEqual(Array.from(result.outputBytes), [9, 9, 9]);
  assert.equal(result.outputDigest.value, sha256(Uint8Array.from([9, 9, 9])));
  const opens = runtime.events.filter((event) => event === 'open-writer');
  assert.equal(opens.length, 3);
  const inserts = runtime.events.filter((event) => event === 'insert:101:401');
  assert.equal(inserts.length, 3);
  const loads = runtime.events.filter((event) => event.startsWith('load-page:71:'));
  assert.deepEqual(loads, ['load-page:71:0', 'load-page:71:1', 'load-page:71:2']);
  assert.equal(runtime.events.includes('destroy-object:401'), false);
  const libraries = runtime.events.filter((event) => event === 'destroy');
  assert.equal(libraries.length, 4);
});

test('mid-composition step failure publishes nothing', async () => {
  const runtime = fakeRuntime({ pageCount: 3, throwSave: true });
  await assert.rejects(
    numberPdfPagesWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /save boom/,
  );
  assert.equal(runtime.events.some((event) => event.startsWith('writer-data')), false);
  assert.ok(runtime.events.includes('close:71'));
  assert.ok(runtime.events.includes('destroy'));
});

test('page count above budget fails with zero placements', async () => {
  const runtime = fakeRuntime({ pageCount: 10001 });
  await assert.rejects(
    numberPdfPagesWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /exceeds the page-number resource budget/,
  );
  assert.equal(runtime.events.some((event) => event.startsWith('load-font')), false);
  assert.equal(runtime.events.some((event) => event.startsWith('create-text')), false);
  assert.equal(runtime.events.some((event) => event.startsWith('open-writer')), false);
  assert.ok(runtime.events.includes('close:71'));
  assert.ok(runtime.events.includes('destroy'));
});

test('unsafe final page number fails with zero placements', async () => {
  const runtime = fakeRuntime({ pageCount: 3 });
  await assert.rejects(
    numberPdfPagesWithLocalWasm(optionsFor({
      initPdfium: async () => runtime.module, startNumber: Number.MAX_SAFE_INTEGER,
    })),
    /safe integer range/,
  );
  assert.equal(runtime.events.some((event) => event.startsWith('create-text')), false);
});

test('empty document succeeds vacuously with input bytes preserved', async () => {
  const runtime = fakeRuntime({ pageCount: 0 });
  const input = bytes();
  const result = await numberPdfPagesWithLocalWasm(optionsFor({
    bytes: input, initPdfium: async () => runtime.module,
  }));
  assert.equal(result.succeeded, true);
  assert.equal(result.pageCount, 0);
  assert.deepEqual(result.placedTexts, []);
  assert.deepEqual(Array.from(result.outputBytes), Array.from(input));
  assert.notEqual(result.outputBytes, input);
  assert.equal(result.outputDigest.value, result.inputDigest.value);
  assert.equal(runtime.events.some((event) => event.startsWith('create-text')), false);
});

test('mid-run caller mutation of bytes or wasm fails closed', async () => {
  for (const key of ['bytes', 'wasmBinary']) {
    const runtime = fakeRuntime({ pageCount: 1 });
    const options = optionsFor({ initPdfium: async () => runtime.module });
    const original = options[key];
    const probe = numberPdfPagesWithLocalWasm(options);
    original[0] = original[0] ^ 0xff;
    const error = await probe.then(() => null, (failure) => failure);
    assert.ok(error instanceof AggregateError);
    assert.ok(error.errors.some((entry) => /changed during PDFium page numbering/.test(entry.message)));
  }
});

test('composer source makes no direct PDFium calls', () => {
  const source = fs.readFileSync(SOURCE_PATH, 'utf8');
  assert.ok(source.includes('placePdfMarkWithLocalWasm'));
  assert.ok(source.includes('inspectPdfWithLocalWasm'));
  assert.doesNotMatch(source, /FPDF_[A-Z]/);
  assert.doesNotMatch(source, /PDFiumExt_[A-Z]/);
  assert.doesNotMatch(source, /wasmExports|HEAPU8/);
  assert.deepEqual(source.match(/node:[a-z]+/g).sort(), ['node:crypto', 'node:util']);
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

async function pageText(bytes, pageIndex) {
  const extracted = await extractPdfPageTextWithLocalWasm({
    bytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex, maxChars: 2000,
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

test('real multipage numbering proves per-page numbers and preserves text', async () => {
  const input = new Uint8Array(fs.readFileSync(MULTIPAGE_FIXTURE));
  const inputBefore = Buffer.from(input);
  let initCalls = 0;
  const initPdfium = async (options) => { initCalls += 1; return realInitPdfium()(options); };
  const result = await numberPdfPagesWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium,
    startNumber: 1, x: 30, y: 40, fontSize: 24, angleDegrees: 0,
    red: 0, green: 0, blue: 0, alpha: 255,
  });
  assert.equal(result.succeeded, true);
  assert.equal(result.pageCount, 3);
  assert.deepEqual(result.placedTexts, ['1', '2', '3']);
  assert.equal(initCalls, 4);
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
  assert.deepEqual(Buffer.from(input), inputBefore);
  assert.ok((await pageText(result.outputBytes, 0)).includes('page-alpha'));
  assert.ok((await pageText(result.outputBytes, 1)).includes('page-beta'));
  for (let pageIndex = 0; pageIndex < 3; pageIndex += 1) {
    assert.ok((await pageText(result.outputBytes, pageIndex)).includes(String(pageIndex + 1)));
  }
  const inspection = await inspectPdfWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
  assert.equal(inspection.pageCount, 3);
  const rendered = await renderPdfPageWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    pageIndex: 0, maxPixels: 40000,
  });
  assert.equal(rendered.openSucceeded, true);
});

test('real single-page numbering places the start number', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const result = await numberPdfPagesWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    startNumber: 5, x: 100, y: 100, fontSize: 48, angleDegrees: 0,
    red: 255, green: 0, blue: 0, alpha: 255,
  });
  assert.equal(result.succeeded, true);
  assert.equal(result.pageCount, 1);
  assert.deepEqual(result.placedTexts, ['5']);
  assert.ok((await pageText(result.outputBytes, 0)).includes('5'));
});

test('real numbering on signed and active fixtures claims nothing', async () => {
  const signed = new Uint8Array(fs.readFileSync(SIGNED_FIXTURE));
  const signedBefore = Buffer.from(signed);
  const signedResult = await numberPdfPagesWithLocalWasm({
    bytes: signed, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    startNumber: 1, x: 10, y: 10, fontSize: 24, angleDegrees: 0,
    red: 0, green: 0, blue: 0, alpha: 255,
  });
  assert.equal(signedResult.succeeded, true);
  assert.equal('signatureCount' in signedResult, false);
  assert.equal('signaturePreserved' in signedResult, false);
  assert.equal('signatureValid' in signedResult, false);
  assert.deepEqual(Buffer.from(signed), signedBefore);
  const active = new Uint8Array(fs.readFileSync(ACTIVE_CONTENT_FIXTURE));
  const activeBefore = Buffer.from(active);
  const activeResult = await numberPdfPagesWithLocalWasm({
    bytes: active, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    startNumber: 1, x: 10, y: 10, fontSize: 24, angleDegrees: 0,
    red: 0, green: 0, blue: 0, alpha: 255,
  });
  assert.equal(activeResult.succeeded, true);
  assert.deepEqual(Buffer.from(active), activeBefore);
  const inspection = await inspectPdfWithLocalWasm({
    bytes: activeResult.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
});

test('real invalid inputs fail closed', async () => {
  const ordinary = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const valid = {
    bytes: ordinary, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    startNumber: 1, x: 1, y: 1, fontSize: 12, angleDegrees: 0,
    red: 0, green: 0, blue: 0, alpha: 255,
  };
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  await assert.rejects(numberPdfPagesWithLocalWasm({ ...valid, bytes: truncated }), Error);
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(numberPdfPagesWithLocalWasm({ ...valid, bytes: nonPdf }), Error);
});
