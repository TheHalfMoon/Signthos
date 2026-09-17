'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  placePdfTextWithLocalWasm,
  TEXT_PLACE_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-text-place-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-text-place-runtime.js');
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
  let placedText = null;
  let transform = null;
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
      events.push(`set-text:${handle}:${pointer}`);
      if (options.throwSetText) throw new Error('set text boom');
      const chars = [];
      for (let at = 0; ; at += 1) {
        const code = heap[pointer + at * 2] | (heap[pointer + at * 2 + 1] << 8);
        if (code === 0) break;
        chars.push(String.fromCharCode(code));
        if (chars.length > 600) break;
      }
      placedText = chars.join('');
      if (options.setTextFalse) return 0;
      return 1;
    },
    FPDFPageObj_Transform(handle, a, b, c, d, e, f) {
      events.push(`transform:${handle}:${a},${b},${c},${d},${e},${f}`);
      if (options.throwTransform) throw new Error('transform boom');
      transform = [a, b, c, d, e, f];
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
    module, events, heap, placed: () => placedText, matrix: () => transform,
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
    text: overrides.text ?? 'HELLO',
    x: overrides.x ?? 20,
    y: overrides.y ?? 100,
    fontSize: overrides.fontSize ?? 12,
  };
}

test('text-place module exposes only the bounded runtime surface', () => {
  const runtime = require('../src/pdf/browser/pdf-text-place-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['placePdfTextWithLocalWasm', 'TEXT_PLACE_RESOURCE_BUDGETS']);
  assert.equal(typeof placePdfTextWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(TEXT_PLACE_RESOURCE_BUDGETS, { maxInputBytes: 67108864, maxOutputBytes: 67108864, maxTextChars: 500 });
  assert.equal(Object.isFrozen(TEXT_PLACE_RESOURCE_BUDGETS), true);
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
    { ...base, text: '' },
    { ...base, text: 'x'.repeat(501) },
    { ...base, text: 'caf\u00e9' },
    { ...base, text: 'hello\nworld' },
    { ...base, text: 'مرحبا' },
    { ...base, text: 42 },
    { ...base, x: Number.NaN },
    { ...base, x: Number.POSITIVE_INFINITY },
    { ...base, x: 2000000 },
    { ...base, y: '100' },
    { ...base, fontSize: 0 },
    { ...base, fontSize: -12 },
    { ...base, fontSize: 1001 },
    { ...base, fontSize: Number.NaN },
    { ...base, extra: 1 },
    { bytes: base.bytes, wasmBinary: base.wasmBinary, initPdfium, pageIndex: 0, text: 'A', x: 0, y: 0 },
  ];
  for (const options of invalid) {
    await assert.rejects(placePdfTextWithLocalWasm(options), TypeError);
  }
  await assert.rejects(placePdfTextWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('successful placement follows the lifecycle with exact content and matrix', async () => {
  const runtime = fakeRuntime({ savedBytes: [3, 3, 3] });
  const result = await placePdfTextWithLocalWasm({
    bytes: bytes(),
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
    pageIndex: 0,
    text: 'HELLO',
    x: 20,
    y: 100,
    fontSize: 12,
  });
  assert.equal(runtime.placed(), 'HELLO');
  assert.deepEqual(runtime.matrix(), [1, 0, 0, 1, 20, 100]);
  const order = runtime.events.filter((event) => !event.startsWith('malloc:') && !event.startsWith('free:'));
  assert.deepEqual(order, [
    'library-init',
    'open:64:8:',
    'page-count:71',
    'signature-count:71',
    'load-font:71:Helvetica',
    'create-text:71:301:12',
    'set-text:401:89',
    'transform:401:1,0,0,1,20,100',
    'load-page:71:0',
    'insert:101:401',
    'generate:101',
    'close-page:101',
    'signature-count:71',
    'open-writer',
    'save:71:201',
    'writer-size:201',
    'writer-data:201:118:3',
    'close-writer:201',
    'close:71',
    'destroy',
  ]);
  assert.equal(result.succeeded, true);
  assert.equal(result.placedText, 'HELLO');
  assert.deepEqual(result.placement, { x: 20, y: 100, fontSize: 12, font: 'Helvetica' });
  assert.equal(Object.isFrozen(result.placement), true);
  assert.equal(result.pageCount, 1);
  assert.deepEqual(Array.from(result.outputBytes), [3, 3, 3]);
});

test('pre-insert failures destroy the text object and publish nothing', async () => {
  for (const mode of ['throwInsert', 'setTextFalse']) {
    const runtime = fakeRuntime(mode === 'throwInsert' ? { throwInsert: true } : { setTextFalse: true });
    await assert.rejects(
      placePdfTextWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
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
    placePdfTextWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /did not complete/,
  );
  // The insert succeeded, so the text object is owned by the page and must
  // not be destroyed by the runtime.
  assert.equal(runtime.events.includes('destroy-object:401'), false);
  assert.equal(runtime.events.some((event) => event.startsWith('open-writer')), false);
  assert.ok(runtime.events.includes('close:71'));
  assert.ok(runtime.events.includes('destroy'));
});

test('out-of-range page target fails with zero mutation calls', async () => {
  const runtime = fakeRuntime({ pageCount: 1 });
  await assert.rejects(
    placePdfTextWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module, pageIndex: 2 })),
    /pageIndex is out of range/,
  );
  assert.equal(runtime.events.some((event) => event.startsWith('load-font:')), false);
  assert.ok(runtime.events.includes('close:71'));
});

test('unopenable input and save failures publish nothing', async () => {
  const closed = fakeRuntime({ rejectOpen: true, lastError: 3 });
  await assert.rejects(
    placePdfTextWithLocalWasm(optionsFor({ initPdfium: async () => closed.module })),
    /could not open the input document \(last-error 3\)/,
  );
  for (const mode of ['saveFalse', 'zeroSize', 'shortRead']) {
    const runtime = fakeRuntime(
      mode === 'saveFalse' ? { saveFalse: true } : mode === 'zeroSize' ? { writerSize: 0 } : { shortRead: 1 },
    );
    await assert.rejects(
      placePdfTextWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
      /save did not complete|produced no bytes|readout is incomplete/,
    );
  }
});

test('budgets aggregate failures and mutation fails closed', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  await assert.rejects(
    placePdfTextWithLocalWasm(optionsFor({ bytes: new Uint8Array(67108865), initPdfium })),
    /exceeds the text-place resource budget/,
  );
  assert.equal(initCalls, 0);
  const oversize = fakeRuntime({ writerSize: 67108865 });
  await assert.rejects(
    placePdfTextWithLocalWasm(optionsFor({ initPdfium: async () => oversize.module })),
    /exceeds the text-place resource budget/,
  );
  const failing = fakeRuntime({ pageCount: 0, throwClose: true, throwDestroy: true });
  const error = await placePdfTextWithLocalWasm(
    optionsFor({ initPdfium: async () => failing.module, pageIndex: 1 }),
  ).then(() => null, (failure) => failure);
  assert.ok(error instanceof AggregateError);
  assert.match(error.errors[0].message, /pageIndex is out of range/);
  const input = bytes();
  const runtime = fakeRuntime();
  const error2 = await placePdfTextWithLocalWasm({
    bytes: input,
    wasmBinary: wasm(),
    initPdfium: async () => { input[0] = 0x00; return runtime.module; },
    pageIndex: 0,
    text: 'HELLO',
    x: 20,
    y: 100,
    fontSize: 12,
  }).then(() => null, (failure) => failure);
  assert.ok(error2 instanceof AggregateError);
  assert.ok(error2.errors.some((entry) => /source bytes changed/.test(entry.message)));
});

test('text-place source imports only the allowlisted surface', () => {
  const source = fs.readFileSync(SOURCE_PATH, 'utf8');
  const requires = Array.from(source.matchAll(/require\('([^']+)'\)/g)).map((match) => match[1]);
  assert.deepEqual(Array.from(new Set(requires)).sort(), ['node:crypto', 'node:util']);
  assert.doesNotMatch(source, /require\('@embedpdf\/pdfium'\)/);
  assert.match(source, /FPDFPageObj_CreateTextObj/);
  assert.match(source, /FPDFText_SetText/);
  assert.match(source, /FPDFPage_InsertObject/);
  assert.match(source, /FPDFPage_GenerateContent/);
  assert.doesNotMatch(source, /FPDFPage_AddAnnot/);
  assert.doesNotMatch(source, /FPDFImageObj_/);
  assert.doesNotMatch(source, /FPDF_SaveWithVersion/);
  assert.doesNotMatch(source, /DEFAULT_PDFIUM_WASM_URL/);
  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /https?:\/\//);
  assert.doesNotMatch(source, /node:fs/);
  assert.doesNotMatch(source, /node:path/);
  assert.doesNotMatch(source, /child_process|setTimeout\(|setInterval\(|Worker\(/);
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

async function pageText(bytes, wasmBinary, initPdfium, pageIndex) {
  const extracted = await extractPdfPageTextWithLocalWasm({
    bytes, wasmBinary, initPdfium, pageIndex, maxChars: 500,
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

test('real text placement preserves original text and adds placed text', async () => {
  const wasmBinary = realWasmBinary();
  const input = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const inputBefore = Buffer.from(input);
  const beforeText = await pageText(input, realWasmBinary(), realInitPdfium(), 0);
  let initCalls = 0;
  const initPdfium = async (options) => { initCalls += 1; return realInitPdfium()(options); };
  const result = await placePdfTextWithLocalWasm({
    bytes: input, wasmBinary, initPdfium, pageIndex: 0, text: 'HELLO', x: 20, y: 100, fontSize: 12,
  });
  assert.equal(initCalls, 1);
  assert.equal(result.succeeded, true);
  assert.equal(result.placedText, 'HELLO');
  assert.deepEqual(result.placement, { x: 20, y: 100, fontSize: 12, font: 'Helvetica' });
  assert.equal(result.pageCount, 1);
  assert.equal(result.signatureStructurePresent, false);
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
  assert.deepEqual(Buffer.from(input), inputBefore);
  const afterText = await pageText(result.outputBytes, realWasmBinary(), realInitPdfium(), 0);
  assert.ok(afterText.includes(beforeText));
  assert.ok(afterText.includes('HELLO'));
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

test('real placement on a later page leaves other pages intact', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDER_FIXTURE));
  const result = await placePdfTextWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 2, text: 'TAIL', x: 30, y: 40, fontSize: 14,
  });
  assert.equal(result.succeeded, true);
  assert.equal(await pageText(result.outputBytes, realWasmBinary(), realInitPdfium(), 0), 'page-alpha');
  assert.equal(await pageText(result.outputBytes, realWasmBinary(), realInitPdfium(), 1), 'page-beta');
  assert.ok((await pageText(result.outputBytes, realWasmBinary(), realInitPdfium(), 2)).includes('TAIL'));
});

test('real placement on signed and active fixtures claims nothing', async () => {
  const signed = new Uint8Array(fs.readFileSync(SIGNED_FIXTURE));
  const signedBefore = Buffer.from(signed);
  const signedResult = await placePdfTextWithLocalWasm({
    bytes: signed, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, text: 'NOTE', x: 10, y: 10, fontSize: 10,
  });
  assert.equal(signedResult.succeeded, true);
  assert.equal(signedResult.signatureStructurePresent, true);
  assert.equal(signedResult.signatureCount, 1);
  assert.equal('signaturePreserved' in signedResult, false);
  assert.equal('signatureValid' in signedResult, false);
  assert.deepEqual(Buffer.from(signed), signedBefore);
  const active = new Uint8Array(fs.readFileSync(ACTIVE_CONTENT_FIXTURE));
  const activeBefore = Buffer.from(active);
  const activeResult = await placePdfTextWithLocalWasm({
    bytes: active, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, text: 'NOTE', x: 10, y: 10, fontSize: 10,
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
    bytes: ordinary, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, text: 'OK', x: 1, y: 1, fontSize: 12,
  };
  await assert.rejects(placePdfTextWithLocalWasm({ ...valid, pageIndex: 7 }), /pageIndex is out of range/);
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  await assert.rejects(placePdfTextWithLocalWasm({ ...valid, bytes: truncated }), Error);
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(placePdfTextWithLocalWasm({ ...valid, bytes: nonPdf }), Error);
});
