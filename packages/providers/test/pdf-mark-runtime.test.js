'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  placePdfMarkWithLocalWasm,
  MARK_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-mark-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-mark-runtime.js');
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
  let markBytes = null;
  let matrix = null;
  let fillColor = null;
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
    FPDFText_LoadStandardFont(handle, name) {
      events.push(`load-font:${handle}:${name}`);
      if (options.throwLoadFont) throw new Error('load font boom');
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
      markBytes = units;
      if (options.throwSetText) throw new Error('set text boom');
      if (options.setTextFalse) return 0;
      return 1;
    },
    FPDFPageObj_SetFillColor(handle, red, green, blue, alpha) {
      events.push(`fill-color:${handle}:${red},${green},${blue},${alpha}`);
      fillColor = [red, green, blue, alpha];
      if (options.throwFillColor) throw new Error('fill color boom');
      if (options.fillColorFalse) return 0;
      return 1;
    },
    FPDFPageObj_Transform(handle, a, b, c, d, e, f) {
      events.push(`transform:${handle}`);
      if (options.throwTransform) throw new Error('transform boom');
      matrix = [a, b, c, d, e, f];
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
      if (options.throwDestroyObject) throw new Error('destroy object boom');
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
    module, events, heap, bytes: () => markBytes, matrix: () => matrix, color: () => fillColor,
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
    text: overrides.text ?? 'MARK',
    x: overrides.x ?? 20,
    y: overrides.y ?? 40,
    fontSize: overrides.fontSize ?? 48,
    angleDegrees: overrides.angleDegrees ?? 45,
    red: overrides.red ?? 255,
    green: overrides.green ?? 128,
    blue: overrides.blue ?? 128,
    alpha: overrides.alpha ?? 128,
  };
}

test('mark module exposes only the bounded runtime surface', () => {
  const runtime = require('../src/pdf/browser/pdf-mark-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['placePdfMarkWithLocalWasm', 'MARK_RESOURCE_BUDGETS']);
  assert.equal(typeof placePdfMarkWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(MARK_RESOURCE_BUDGETS, {
    maxInputBytes: 67108864, maxOutputBytes: 67108864, maxTextChars: 500,
    maxCoordinate: 10000, maxFontSize: 144, maxAngleDegrees: 360, maxChannel: 255,
  });
  assert.equal(Object.isFrozen(MARK_RESOURCE_BUDGETS), true);
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
    { ...base, text: '' },
    { ...base, text: 'x'.repeat(501) },
    { ...base, text: 'caf\u00e9' },
    { ...base, x: Number.NaN },
    { ...base, x: 20000 },
    { ...base, fontSize: 0 },
    { ...base, fontSize: 145 },
    { ...base, angleDegrees: Number.NaN },
    { ...base, angleDegrees: Number.POSITIVE_INFINITY },
    { ...base, angleDegrees: 361 },
    { ...base, angleDegrees: -361 },
    { ...base, red: -1 },
    { ...base, red: 256 },
    { ...base, red: 1.5 },
    { ...base, green: '128' },
    { ...base, blue: null },
    { ...base, alpha: 300 },
    { ...base, extra: 1 },
    {
      bytes: base.bytes, wasmBinary: base.wasmBinary, initPdfium,
      pageIndex: 0, text: 'M', x: 0, y: 0, fontSize: 12, angleDegrees: 0,
      red: 0, green: 0, blue: 0,
    },
  ];
  for (const options of invalid) {
    await assert.rejects(placePdfMarkWithLocalWasm(options), TypeError);
  }
  await assert.rejects(placePdfMarkWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('successful mark follows the lifecycle with exact rotation and color', async () => {
  const runtime = fakeRuntime({ savedBytes: [3, 3, 3] });
  const result = await placePdfMarkWithLocalWasm({
    bytes: bytes(),
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
    pageIndex: 0, text: 'MARK', x: 20, y: 40, fontSize: 48, angleDegrees: 45,
    red: 255, green: 128, blue: 128, alpha: 128,
  });
  assert.deepEqual(runtime.bytes(), [77, 65, 82, 75]);
  assert.deepEqual(runtime.color(), [255, 128, 128, 128]);
  const radians = (45 * Math.PI) / 180;
  assert.deepEqual(runtime.matrix(), [Math.cos(radians), Math.sin(radians), -Math.sin(radians), Math.cos(radians), 20, 40]);
  const order = runtime.events.filter((event) => !event.startsWith('malloc:') && !event.startsWith('free:'));
  assert.deepEqual(order, [
    'library-init',
    'open:64:8:',
    'page-count:71',
    'signature-count:71',
    'load-font:71:Helvetica',
    'create-text:71:301:48',
    'set-text:401:77,65,82,75',
    'fill-color:401:255,128,128,128',
    'transform:401',
    'load-page:71:0',
    'insert:101:401',
    'generate:101',
    'close-page:101',
    'signature-count:71',
    'open-writer',
    'save:71:201',
    'writer-size:201',
    'writer-data:201:116:3',
    'close-writer:201',
    'close:71',
    'destroy',
  ]);
  assert.equal(result.succeeded, true);
  assert.equal(result.placedText, 'MARK');
  assert.deepEqual(result.placement, { x: 20, y: 40, fontSize: 48, angleDegrees: 45 });
  assert.deepEqual(result.color, { red: 255, green: 128, blue: 128, alpha: 128 });
  assert.equal(Object.isFrozen(result.placement), true);
  assert.equal(Object.isFrozen(result.color), true);
  assert.equal(result.font, 'Helvetica');
  assert.deepEqual(Array.from(result.outputBytes), [3, 3, 3]);
});

test('pre-insert failures destroy the text object and publish nothing', async () => {
  for (const mode of ['throwInsert', 'setTextFalse', 'fillColorFalse']) {
    const runtime = fakeRuntime({ [mode]: true });
    await assert.rejects(
      placePdfMarkWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
      /insert boom|not accepted/,
    );
    assert.ok(runtime.events.includes('destroy-object:401'));
    assert.equal(runtime.events.some((event) => event.startsWith('open-writer')), false);
    assert.ok(runtime.events.includes('close:71'));
    assert.ok(runtime.events.includes('destroy'));
  }
});

test('post-insert finalization failure keeps the page-owned object and publishes nothing', async () => {
  const runtime = fakeRuntime({ generateFalse: true });
  await assert.rejects(
    placePdfMarkWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /did not complete/,
  );
  assert.equal(runtime.events.includes('destroy-object:401'), false);
  assert.equal(runtime.events.some((event) => event.startsWith('open-writer')), false);
  assert.ok(runtime.events.includes('close:71'));
  assert.ok(runtime.events.includes('destroy'));
});

test('out-of-range page target fails with zero mutation calls', async () => {
  const runtime = fakeRuntime({ pageCount: 1 });
  await assert.rejects(
    placePdfMarkWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module, pageIndex: 7 })),
    /pageIndex is out of range/,
  );
  assert.equal(runtime.events.some((event) => event.startsWith('load-font')), false);
  assert.equal(runtime.events.some((event) => event.startsWith('create-text')), false);
  assert.equal(runtime.events.some((event) => event.startsWith('load-page')), false);
  assert.ok(runtime.events.includes('close:71'));
  assert.ok(runtime.events.includes('destroy'));
});

test('input and output budgets fail closed with exact diagnostics', async () => {
  const big = new Uint8Array(64 * 1024 * 1024 + 1);
  await assert.rejects(
    placePdfMarkWithLocalWasm(optionsFor({ bytes: big })),
    /exceeds the mark resource budget/,
  );
  const runtime = fakeRuntime({ writerSize: 64 * 1024 * 1024 + 1, savedBytes: [1] });
  await assert.rejects(
    placePdfMarkWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /exceeds the mark resource budget/,
  );
  assert.ok(runtime.events.includes('close:71'));
});

test('mid-run caller mutation of bytes or wasm fails closed', async () => {
  for (const key of ['bytes', 'wasmBinary']) {
    const runtime = fakeRuntime();
    const options = optionsFor({ initPdfium: async () => runtime.module });
    const original = options[key];
    const probe = placePdfMarkWithLocalWasm(options);
    original[0] = original[0] ^ 0xff;
    const error = await probe.then(() => null, (failure) => failure);
    assert.ok(error instanceof AggregateError);
    assert.ok(error.errors.some((entry) => /changed during PDFium mark placement/.test(entry.message)));
  }
});

test('initializer replacing runtime WASM bytes fails closed', async () => {
  const runtime = fakeRuntime();
  await assert.rejects(
    placePdfMarkWithLocalWasm(optionsFor({
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

test('real rotated colored mark changes rendering and preserves text', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const inputBefore = Buffer.from(input);
  const beforePixels = await renderPixels(input, 0);
  const beforeText = await pageText(input, 0);
  let initCalls = 0;
  const initPdfium = async (options) => { initCalls += 1; return realInitPdfium()(options); };
  const result = await placePdfMarkWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium,
    pageIndex: 0, text: 'MARK', x: 100, y: 100, fontSize: 48, angleDegrees: 45,
    red: 255, green: 128, blue: 128, alpha: 128,
  });
  assert.equal(initCalls, 1);
  assert.equal(result.succeeded, true);
  assert.deepEqual(result.placement, { x: 100, y: 100, fontSize: 48, angleDegrees: 45 });
  assert.deepEqual(result.color, { red: 255, green: 128, blue: 128, alpha: 128 });
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
  assert.deepEqual(Buffer.from(input), inputBefore);
  assert.notDeepEqual(await renderPixels(result.outputBytes, 0), beforePixels);
  const afterText = await pageText(result.outputBytes, 0);
  assert.ok(afterText.includes(beforeText));
  assert.ok(afterText.includes('MARK'));
  const inspection = await inspectPdfWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
  assert.equal(inspection.pageCount, 1);
});

test('real mark on a later page leaves other pages intact', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDER_FIXTURE));
  const result = await placePdfMarkWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    pageIndex: 2, text: 'TAIL', x: 30, y: 40, fontSize: 24, angleDegrees: -30,
    red: 0, green: 0, blue: 255, alpha: 255,
  });
  assert.equal(result.succeeded, true);
  assert.equal(await pageText(result.outputBytes, 0), 'page-alpha');
  assert.equal(await pageText(result.outputBytes, 1), 'page-beta');
  assert.ok((await pageText(result.outputBytes, 2)).includes('TAIL'));
});

test('real mark on signed and active fixtures claims nothing', async () => {
  const signed = new Uint8Array(fs.readFileSync(SIGNED_FIXTURE));
  const signedBefore = Buffer.from(signed);
  const signedResult = await placePdfMarkWithLocalWasm({
    bytes: signed, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    pageIndex: 0, text: 'NOTE', x: 10, y: 10, fontSize: 24, angleDegrees: 0,
    red: 0, green: 0, blue: 0, alpha: 255,
  });
  assert.equal(signedResult.succeeded, true);
  assert.equal(signedResult.signatureStructurePresent, true);
  assert.equal(signedResult.signatureCount, 1);
  assert.equal('signaturePreserved' in signedResult, false);
  assert.equal('signatureValid' in signedResult, false);
  assert.deepEqual(Buffer.from(signed), signedBefore);
  const active = new Uint8Array(fs.readFileSync(ACTIVE_CONTENT_FIXTURE));
  const activeBefore = Buffer.from(active);
  const activeResult = await placePdfMarkWithLocalWasm({
    bytes: active, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    pageIndex: 0, text: 'NOTE', x: 10, y: 10, fontSize: 24, angleDegrees: 90,
    red: 0, green: 0, blue: 0, alpha: 255,
  });
  assert.equal(activeResult.succeeded, true);
  assert.deepEqual(Buffer.from(active), activeBefore);
  const inspection = await inspectPdfWithLocalWasm({
    bytes: activeResult.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
});

test('real invalid targets and inputs fail closed', async () => {
  const ordinary = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const valid = {
    bytes: ordinary, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    pageIndex: 0, text: 'OK', x: 1, y: 1, fontSize: 12, angleDegrees: 0,
    red: 0, green: 0, blue: 0, alpha: 255,
  };
  await assert.rejects(placePdfMarkWithLocalWasm({ ...valid, pageIndex: 7 }), /pageIndex is out of range/);
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  await assert.rejects(placePdfMarkWithLocalWasm({ ...valid, bytes: truncated }), Error);
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(placePdfMarkWithLocalWasm({ ...valid, bytes: nonPdf }), Error);
});
