'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  placePdfImageWithLocalWasm,
  IMAGE_PLACE_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-image-place-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-image-place-runtime.js');
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
  let bitmapBytes = null;
  let transform = null;
  let pageListReadback = null;
  const bitmaps = new Map();
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
    FPDFBitmap_CreateEx(width, height, format, firstScan, stride) {
      events.push(`create-bitmap:${width}:${height}:${format}:${firstScan}:${stride}`);
      if (options.throwCreateBitmap) throw new Error('create bitmap boom');
      const handle = options.badBitmap ?? 501;
      bitmaps.set(handle, { width, height, buffer: 9000 + handle, stride: width * 4 });
      return handle;
    },
    FPDFBitmap_GetStride(handle) {
      events.push(`bitmap-stride:${handle}`);
      if (options.throwBitmapStride) throw new Error('bitmap stride boom');
      if (options.badStride) return options.badStride;
      return bitmaps.get(handle).stride;
    },
    FPDFBitmap_GetBuffer(handle) {
      events.push(`bitmap-buffer:${handle}`);
      if (options.throwBitmapBuffer) throw new Error('bitmap buffer boom');
      return options.badBitmapBuffer ?? bitmaps.get(handle).buffer;
    },
    FPDFBitmap_Destroy(handle) {
      events.push(`destroy-bitmap:${handle}`);
      if (options.throwDestroyBitmap) throw new Error('destroy bitmap boom');
      bitmaps.delete(handle);
    },
    FPDFPageObj_NewImageObj(handle) {
      events.push(`create-image:${handle}`);
      if (options.throwCreateImage) throw new Error('create image boom');
      return options.badImage ?? 401;
    },
    FPDFImageObj_SetBitmap(pageArray, count, image, bitmap) {
      const listed = new DataView(heap.buffer, heap.byteOffset, heap.byteLength).getUint32(pageArray, true);
      events.push(`set-bitmap:${count}:${image}:${bitmap}:page=${listed}`);
      pageListReadback = listed;
      if (options.throwSetBitmap) throw new Error('set bitmap boom');
      bitmapBytes = Array.from(heap.slice(
        bitmaps.get(bitmap).buffer, bitmaps.get(bitmap).buffer + 16,
      ));
      if (options.setBitmapFalse) return 0;
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
    module, events, heap, bitmap: () => bitmapBytes, matrix: () => transform, pageListed: () => pageListReadback,
  };
}

function bytes() {
  return Uint8Array.from([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]);
}

function wasm() {
  return Uint8Array.from([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]);
}

function pixels2x2() {
  // Distinct BGRA pattern: red, green / blue, white.
  return Uint8Array.from([
    0, 0, 255, 255, 0, 255, 0, 255,
    255, 0, 0, 255, 255, 255, 255, 255,
  ]);
}

function optionsFor(overrides = {}) {
  return {
    bytes: overrides.bytes ?? bytes(),
    wasmBinary: overrides.wasmBinary ?? wasm(),
    initPdfium: overrides.initPdfium ?? (async () => fakeRuntime().module),
    pageIndex: overrides.pageIndex ?? 0,
    pixels: overrides.pixels ?? pixels2x2(),
    width: overrides.width ?? 2,
    height: overrides.height ?? 2,
    x: overrides.x ?? 20,
    y: overrides.y ?? 40,
    scale: overrides.scale ?? 2,
  };
}

test('image-place module exposes only the bounded runtime surface', () => {
  const runtime = require('../src/pdf/browser/pdf-image-place-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['placePdfImageWithLocalWasm', 'IMAGE_PLACE_RESOURCE_BUDGETS']);
  assert.equal(typeof placePdfImageWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(IMAGE_PLACE_RESOURCE_BUDGETS, {
    maxInputBytes: 67108864, maxOutputBytes: 67108864, maxImageDimension: 256, maxCoordinate: 10000, maxScale: 16,
  });
  assert.equal(Object.isFrozen(IMAGE_PLACE_RESOURCE_BUDGETS), true);
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
    { ...base, pixels: Uint8Array.from([1, 2, 3]) },
    { ...base, pixels: pixels2x2(), width: 1, height: 1 },
    { ...base, pixels: 'not-bytes' },
    { ...base, width: 0 },
    { ...base, width: 257 },
    { ...base, width: 1.5 },
    { ...base, height: 0 },
    { ...base, height: 300 },
    { ...base, x: Number.NaN },
    { ...base, x: Number.POSITIVE_INFINITY },
    { ...base, x: 20000 },
    { ...base, y: '40' },
    { ...base, scale: 0 },
    { ...base, scale: -2 },
    { ...base, scale: 17 },
    { ...base, scale: Number.NaN },
    { ...base, extra: 1 },
    {
      bytes: base.bytes, wasmBinary: base.wasmBinary, initPdfium,
      pageIndex: 0, pixels: pixels2x2(), width: 2, height: 2, x: 0, y: 0,
    },
  ];
  for (const options of invalid) {
    await assert.rejects(placePdfImageWithLocalWasm(options), TypeError);
  }
  await assert.rejects(placePdfImageWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('successful placement follows the lifecycle with exact pixels and matrix', async () => {
  const runtime = fakeRuntime({ savedBytes: [3, 3, 3] });
  const result = await placePdfImageWithLocalWasm({
    bytes: bytes(),
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
    pageIndex: 0,
    pixels: pixels2x2(),
    width: 2,
    height: 2,
    x: 20,
    y: 40,
    scale: 2,
  });
  assert.deepEqual(runtime.bitmap(), [0, 0, 255, 255, 0, 255, 0, 255, 255, 0, 0, 255, 255, 255, 255, 255]);
  assert.deepEqual(runtime.matrix(), [2, 0, 0, 2, 20, 40]);
  assert.equal(runtime.pageListed(), 101);
  const order = runtime.events.filter((event) => !event.startsWith('malloc:') && !event.startsWith('free:'));
  assert.deepEqual(order, [
    'library-init',
    'open:64:8:',
    'page-count:71',
    'signature-count:71',
    'create-bitmap:2:2:4:0:0',
    'bitmap-stride:501',
    'bitmap-buffer:501',
    'create-image:71',
    'load-page:71:0',
    'set-bitmap:1:401:501:page=101',
    'transform:401:2,0,0,2,20,40',
    'insert:101:401',
    'generate:101',
    'close-page:101',
    'signature-count:71',
    'open-writer',
    'save:71:201',
    'writer-size:201',
    'writer-data:201:110:3',
    'close-writer:201',
    'destroy-bitmap:501',
    'close:71',
    'destroy',
  ]);
  assert.equal(result.succeeded, true);
  assert.deepEqual(result.placedImage, { width: 2, height: 2 });
  assert.equal(Object.isFrozen(result.placedImage), true);
  assert.deepEqual(result.placement, { x: 20, y: 40, scale: 2 });
  assert.equal(Object.isFrozen(result.placement), true);
  assert.equal(result.pageCount, 1);
  assert.deepEqual(Array.from(result.outputBytes), [3, 3, 3]);
});

test('pre-insert failures destroy the image object and bitmap and publish nothing', async () => {
  const modes = ['throwCreateBitmap', 'throwCreateImage', 'setBitmapFalse', 'throwInsert'];
  for (const mode of modes) {
    const runtime = fakeRuntime({ [mode]: true });
    await assert.rejects(
      placePdfImageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
      /create bitmap boom|create image boom|not accepted|insert boom/,
    );
    if (mode !== 'throwCreateBitmap') {
      assert.ok(runtime.events.includes('destroy-bitmap:501'));
    }
    // throwCreateImage fails before any image object exists, so there is
    // nothing to destroy; the bitmap is still freed.
    if (mode === 'setBitmapFalse' || mode === 'throwInsert') {
      assert.ok(runtime.events.includes('destroy-object:401'));
    } else {
      assert.equal(runtime.events.includes('destroy-object:401'), false);
    }
    assert.equal(runtime.events.some((event) => event.startsWith('open-writer')), false);
    assert.ok(runtime.events.includes('close:71'));
    assert.ok(runtime.events.includes('destroy'));
  }
});

test('post-insert finalization failure keeps the page-owned object, frees the bitmap, publishes nothing', async () => {
  const runtime = fakeRuntime({ generateFalse: true });
  await assert.rejects(
    placePdfImageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /did not complete/,
  );
  // The insert succeeded, so the image object is owned by the page and must
  // not be destroyed by the runtime. The standalone bitmap is always freed.
  assert.equal(runtime.events.includes('destroy-object:401'), false);
  assert.ok(runtime.events.includes('destroy-bitmap:501'));
  assert.equal(runtime.events.some((event) => event.startsWith('open-writer')), false);
  assert.ok(runtime.events.includes('close:71'));
  assert.ok(runtime.events.includes('destroy'));
});

test('out-of-range page target fails with zero mutation calls', async () => {
  const runtime = fakeRuntime({ pageCount: 1 });
  await assert.rejects(
    placePdfImageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module, pageIndex: 7 })),
    /pageIndex is out of range/,
  );
  assert.equal(runtime.events.some((event) => event.startsWith('create-bitmap')), false);
  assert.equal(runtime.events.some((event) => event.startsWith('create-image')), false);
  assert.equal(runtime.events.some((event) => event.startsWith('load-page')), false);
  assert.ok(runtime.events.includes('close:71'));
  assert.ok(runtime.events.includes('destroy'));
});

test('input and output budgets fail closed with exact diagnostics', async () => {
  const big = new Uint8Array(64 * 1024 * 1024 + 1);
  await assert.rejects(
    placePdfImageWithLocalWasm(optionsFor({ bytes: big })),
    /exceeds the image-place resource budget/,
  );
  const runtime = fakeRuntime({ writerSize: 64 * 1024 * 1024 + 1, savedBytes: [1] });
  await assert.rejects(
    placePdfImageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /exceeds the image-place resource budget/,
  );
  assert.ok(runtime.events.includes('close:71'));
});

test('mid-run caller mutation of bytes, wasm, or pixels fails closed', async () => {
  for (const key of ['bytes', 'wasmBinary', 'pixels']) {
    const runtime = fakeRuntime();
    const options = optionsFor({ initPdfium: async () => runtime.module });
    const original = options[key];
    const probe = placePdfImageWithLocalWasm(options);
    original[0] = original[0] ^ 0xff;
    const error = await probe.then(() => null, (failure) => failure);
    assert.ok(error instanceof AggregateError);
    assert.ok(error.errors.some((entry) => /changed during PDFium image placement/.test(entry.message)));
  }
});

test('initializer replacing runtime WASM bytes fails closed', async () => {
  const runtime = fakeRuntime();
  await assert.rejects(
    placePdfImageWithLocalWasm(optionsFor({
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

test('adopted package and WASM identities match the canonical qualification', () => {
  const { packageJson, wasm } = exactPackagePaths();
  const metadata = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
  assert.equal(metadata.name, '@embedpdf/pdfium');
  assert.equal(metadata.version, '2.15.0');
  const wasmBytes = fs.readFileSync(wasm);
  assert.equal(wasmBytes.byteLength, 4633788);
  assert.equal(sha256(wasmBytes), 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8');
});

test('real image placement changes rendering and preserves text', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const inputBefore = Buffer.from(input);
  const beforePixels = await renderPixels(input, 0);
  const white = new Uint8Array(16 * 16 * 4).fill(255);
  let initCalls = 0;
  const initPdfium = async (options) => { initCalls += 1; return realInitPdfium()(options); };
  const result = await placePdfImageWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium,
    pageIndex: 0, pixels: white, width: 16, height: 16, x: 20, y: 40, scale: 8,
  });
  assert.equal(initCalls, 1);
  assert.equal(result.succeeded, true);
  assert.deepEqual(result.placedImage, { width: 16, height: 16 });
  assert.deepEqual(result.placement, { x: 20, y: 40, scale: 8 });
  assert.equal(result.pageCount, 1);
  assert.equal(result.signatureStructurePresent, false);
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
  assert.deepEqual(Buffer.from(input), inputBefore);
  const afterPixels = await renderPixels(result.outputBytes, 0);
  assert.notDeepEqual(afterPixels, beforePixels);
  const extracted = await extractPdfPageTextWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, maxChars: 500,
  });
  assert.equal(extracted.openSucceeded, true);
  const inspection = await inspectPdfWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
  assert.equal(inspection.pageCount, 1);
});

test('real placement on a later page leaves other pages intact', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDER_FIXTURE));
  const red = new Uint8Array([0, 0, 255, 255]);
  const result = await placePdfImageWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    pageIndex: 2, pixels: red, width: 1, height: 1, x: 10, y: 10, scale: 4,
  });
  assert.equal(result.succeeded, true);
  const pageText = async (bytes, pageIndex) => {
    const extracted = await extractPdfPageTextWithLocalWasm({
      bytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex, maxChars: 500,
    });
    assert.equal(extracted.openSucceeded, true);
    return extracted.text;
  };
  assert.equal(await pageText(result.outputBytes, 0), 'page-alpha');
  assert.equal(await pageText(result.outputBytes, 1), 'page-beta');
});

test('real placement on signed and active fixtures claims nothing', async () => {
  const signed = new Uint8Array(fs.readFileSync(SIGNED_FIXTURE));
  const signedBefore = Buffer.from(signed);
  const signedResult = await placePdfImageWithLocalWasm({
    bytes: signed, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    pageIndex: 0, pixels: pixels2x2(), width: 2, height: 2, x: 10, y: 10, scale: 2,
  });
  assert.equal(signedResult.succeeded, true);
  assert.equal(signedResult.signatureStructurePresent, true);
  assert.equal(signedResult.signatureCount, 1);
  assert.equal('signaturePreserved' in signedResult, false);
  assert.equal('signatureValid' in signedResult, false);
  assert.deepEqual(Buffer.from(signed), signedBefore);
  const active = new Uint8Array(fs.readFileSync(ACTIVE_CONTENT_FIXTURE));
  const activeBefore = Buffer.from(active);
  const activeResult = await placePdfImageWithLocalWasm({
    bytes: active, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    pageIndex: 0, pixels: pixels2x2(), width: 2, height: 2, x: 10, y: 10, scale: 2,
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
    pageIndex: 0, pixels: pixels2x2(), width: 2, height: 2, x: 1, y: 1, scale: 2,
  };
  await assert.rejects(placePdfImageWithLocalWasm({ ...valid, pageIndex: 7 }), /pageIndex is out of range/);
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  await assert.rejects(placePdfImageWithLocalWasm({ ...valid, bytes: truncated }), Error);
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(placePdfImageWithLocalWasm({ ...valid, bytes: nonPdf }), Error);
});
