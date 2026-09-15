'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const root = path.resolve(__dirname, '../../..');
const fixtureRoot = path.join(root, 'specs/004-local-pdf-core/fixtures/admission');
const manifest = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'manifest.json'), 'utf8'));
const fixture = manifest.records.find((item) => item.fixtureId === 'admission-seed-ordinary-minimal-v1');
assert.ok(fixture, 'missing ordinary minimal admission fixture');

const EXPECTED_FIXTURE_SHA256 = 'd88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207';
const EXPECTED_WASM_SHA256 = 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8';
const EXPECTED_RENDER_WIDTH = 200;
const EXPECTED_RENDER_HEIGHT = 200;
const EXPECTED_RENDER_STRIDE = 800;
const EXPECTED_RENDER_SHA256 = 'ee8a61c37f566f82977b0371055fcc068f34dc351169acbb4b556b94a8c6dd7a';

function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function exactPackagePaths() {
  const mainPath = require.resolve('@embedpdf/pdfium');
  const packageRoot = path.resolve(path.dirname(mainPath), '..');
  return {
    packageJson: path.join(packageRoot, 'package.json'),
    wasm: path.join(packageRoot, 'dist/pdfium.wasm'),
  };
}

const { wasm: REAL_WASM_PATH } = exactPackagePaths();
const REAL_WASM_BYTES = fs.readFileSync(REAL_WASM_PATH);
assert.equal(sha256(REAL_WASM_BYTES), EXPECTED_WASM_SHA256, 'unexpected exact local PDFium WASM identity');

function bytesForFixture() {
  return fs.readFileSync(path.join(root, fixture.repositoryPath));
}

function realInitPdfium() {
  return require(require.resolve('@embedpdf/pdfium')).init;
}

function optionsFor(overrides = {}) {
  return {
    bytes: overrides.bytes ?? bytesForFixture(),
    wasmBinary: overrides.wasmBinary ?? Buffer.from(REAL_WASM_BYTES),
    initPdfium: overrides.initPdfium ?? realInitPdfium(),
    pageIndex: overrides.pageIndex ?? 0,
    maxPixels: overrides.maxPixels ?? 40000,
  };
}

test('render runtime module exposes only the bounded render function', () => {
  const runtime = require('../src/pdf/browser/pdf-render-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['renderPdfPageWithLocalWasm']);
  assert.equal(typeof renderPdfPageWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
});

test('render runtime source keeps the local-only raw-runtime boundary', () => {
  const source = fs.readFileSync(
    path.join(root, 'packages/providers/src/pdf/browser/pdf-render-runtime.js'),
    'utf8',
  );
  assert.match(source, /FPDF_RenderPageBitmap/);
  assert.match(source, /FPDFBitmap_CreateEx/);
  assert.match(source, /FPDFBitmap_Destroy/);
  assert.match(source, /FPDF_ClosePage/);
  assert.match(source, /FPDF_LoadPage/);
  assert.equal(source.match(/await initPdfium\(/g).length, 1);
  for (const forbidden of [
    /require\('@embedpdf\/pdfium'\)/,
    /\bWebAssembly\b/,
    /DEFAULT_PDFIUM_WASM_URL/,
    /\bfetch\s*\(/,
    /XMLHttpRequest/,
    /\bWorker\s*\(/,
    /importScripts/,
    /child_process/,
    /node:fs/,
    /node:path/,
    /readFileSync/,
    /setTimeout\s*\(/,
    /setInterval\s*\(/,
    /https?:\/\//,
    /\bURL\b/,
    /cdn/i,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
});

test('invalid inputs fail before runtime effects', async () => {
  let initCalls = 0;
  const initPdfium = async () => {
    initCalls += 1;
    throw new Error('runtime must not start');
  };
  const invalidOptions = [
    { ...optionsFor(), bytes: new Uint8Array(), initPdfium },
    { ...optionsFor(), wasmBinary: new Uint8Array(), initPdfium },
    { ...optionsFor(), initPdfium: null },
    { ...optionsFor(), pageIndex: -1, initPdfium },
    { ...optionsFor(), pageIndex: 1.5, initPdfium },
    { ...optionsFor(), pageIndex: '0', initPdfium },
    { ...optionsFor(), maxPixels: 0, initPdfium },
    { ...optionsFor(), maxPixels: -100, initPdfium },
    { ...optionsFor(), maxPixels: 2.5, initPdfium },
    { ...optionsFor(), bytes: new Proxy(bytesForFixture(), {}), initPdfium },
  ];
  for (const options of invalidOptions) {
    await assert.rejects(renderPdfPageWithLocalWasm(options), TypeError);
  }
  assert.equal(initCalls, 0);
});

test('ordinary-minimal fixture renders page 0 to bounded deterministic BGRA bytes', async () => {
  const bytes = bytesForFixture();
  assert.equal(sha256(bytes), EXPECTED_FIXTURE_SHA256);
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const inputBefore = Buffer.from(bytes);
  const wasmBefore = Buffer.from(wasmBinary);

  const first = await renderPdfPageWithLocalWasm(optionsFor({ bytes, wasmBinary }));
  assert.equal(first.openSucceeded, true);
  assert.equal(first.pageIndex, 0);
  assert.equal(first.pageCount, 1);
  assert.equal(first.width, EXPECTED_RENDER_WIDTH);
  assert.equal(first.height, EXPECTED_RENDER_HEIGHT);
  assert.equal(first.pixelFormat, 'BGRA');
  assert.equal(first.bytesPerPixel, 4);
  assert.equal(first.stride, EXPECTED_RENDER_STRIDE);
  assert.ok(Buffer.isBuffer(first.pixels));
  assert.equal(first.pixels.byteLength, EXPECTED_RENDER_STRIDE * EXPECTED_RENDER_HEIGHT);
  assert.equal(sha256(first.pixels), EXPECTED_RENDER_SHA256);
  assert.ok(Object.isFrozen(first));

  const second = await renderPdfPageWithLocalWasm(optionsFor({
    bytes: Buffer.from(bytes),
    wasmBinary: Buffer.from(wasmBinary),
  }));
  assert.deepEqual(second.pixels, first.pixels);

  assert.deepEqual(bytes, inputBefore);
  assert.deepEqual(wasmBinary, wasmBefore);
});

test('malformed input preserves canonical format-rejection semantics', async () => {
  const result = await renderPdfPageWithLocalWasm(optionsFor({
    bytes: Buffer.from('render malformed probe: not a pdf document'),
  }));
  assert.deepEqual(result, { openSucceeded: false, pdfiumLastError: 3 });
  assert.ok(Object.isFrozen(result));
});

test('out-of-range page index fails closed after open', async () => {
  await assert.rejects(
    renderPdfPageWithLocalWasm(optionsFor({ pageIndex: 1 })),
    /pageIndex exceeds the loaded document page count/,
  );
  await assert.rejects(
    renderPdfPageWithLocalWasm(optionsFor({ pageIndex: 99 })),
    /pageIndex exceeds the loaded document page count/,
  );
});

test('over-budget pixel cap fails closed before bitmap creation', async () => {
  await assert.rejects(
    renderPdfPageWithLocalWasm(optionsFor({ maxPixels: 1 })),
    /exceeds the caller pixel budget/,
  );
  await assert.rejects(
    renderPdfPageWithLocalWasm(optionsFor({ maxPixels: EXPECTED_RENDER_WIDTH * EXPECTED_RENDER_HEIGHT - 1 })),
    /exceeds the caller pixel budget/,
  );
  const exact = await renderPdfPageWithLocalWasm(optionsFor({
    maxPixels: EXPECTED_RENDER_WIDTH * EXPECTED_RENDER_HEIGHT,
  }));
  assert.equal(exact.openSucceeded, true);
});

test('initializer WASM substitution fails closed', async () => {
  const realInit = realInitPdfium();
  const substitutingInit = async (options) => {
    options.wasmBinary = Buffer.from(options.wasmBinary);
    return realInit(options);
  };
  await assert.rejects(
    renderPdfPageWithLocalWasm(optionsFor({ initPdfium: substitutingInit })),
    /replaced runtime WASM bytes/,
  );
});

test('incomplete PDFium surface fails closed', async () => {
  const realInit = realInitPdfium();
  const partialInit = async (options) => {
    const module = await realInit(options);
    const { FPDF_RenderPageBitmap, ...rest } = module;
    assert.equal(typeof FPDF_RenderPageBitmap, 'function');
    return rest;
  };
  await assert.rejects(
    renderPdfPageWithLocalWasm(optionsFor({ initPdfium: partialInit })),
    /missing FPDF_RenderPageBitmap/,
  );
});
