'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');
const { renderPdfThumbnailWithLocalWasm } = require('../src/pdf/browser/pdf-render-thumbnail-runtime');

const root = path.resolve(__dirname, '../../..');
const fixtureRoot = path.join(root, 'specs/004-local-pdf-core/fixtures/admission');
const manifest = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'manifest.json'), 'utf8'));
const fixture = manifest.records.find((item) => item.fixtureId === 'admission-seed-ordinary-minimal-v1');
assert.ok(fixture, 'missing ordinary minimal admission fixture');

const EXPECTED_FIXTURE_SHA256 = 'd88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207';
const EXPECTED_WASM_SHA256 = 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8';
const EXPECTED_THUMB_SHA256 = '1601c5e02b5d88a664e4abc3bfc250ae0dd357d23336ef3f70d408f6575c879c';

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
    thumbMaxDimension: overrides.thumbMaxDimension ?? 64,
  };
}

test('thumbnail runtime module exposes only the bounded thumbnail function', () => {
  const runtime = require('../src/pdf/browser/pdf-render-thumbnail-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['renderPdfThumbnailWithLocalWasm']);
  assert.equal(typeof renderPdfThumbnailWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
});

test('thumbnail runtime source keeps the local-only raw-runtime boundary', () => {
  const source = fs.readFileSync(
    path.join(root, 'packages/providers/src/pdf/browser/pdf-render-thumbnail-runtime.js'),
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
    { ...optionsFor(), thumbMaxDimension: 0, initPdfium },
    { ...optionsFor(), thumbMaxDimension: -64, initPdfium },
    { ...optionsFor(), thumbMaxDimension: 1.5, initPdfium },
    { ...optionsFor(), thumbMaxDimension: '64', initPdfium },
    { ...optionsFor(), thumbMaxDimension: null, initPdfium },
    { ...optionsFor(), bytes: new Proxy(bytesForFixture(), {}), initPdfium },
  ];
  for (const options of invalidOptions) {
    await assert.rejects(renderPdfThumbnailWithLocalWasm(options), TypeError);
  }
  assert.equal(initCalls, 0);
});

test('ordinary-minimal fixture renders a 64-pixel aspect-preserving BGRA thumbnail', async () => {
  const bytes = bytesForFixture();
  assert.equal(sha256(bytes), EXPECTED_FIXTURE_SHA256);
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const inputBefore = Buffer.from(bytes);
  const wasmBefore = Buffer.from(wasmBinary);

  const first = await renderPdfThumbnailWithLocalWasm(optionsFor({ bytes, wasmBinary }));
  assert.equal(first.openSucceeded, true);
  assert.equal(first.pageIndex, 0);
  assert.equal(first.pageCount, 1);
  assert.equal(first.width, 64);
  assert.equal(first.height, 64);
  assert.equal(first.pixelFormat, 'BGRA');
  assert.equal(first.bytesPerPixel, 4);
  assert.equal(first.stride, 256);
  assert.equal(first.pixels.byteLength, 256 * 64);
  assert.equal(sha256(first.pixels), EXPECTED_THUMB_SHA256);
  assert.ok(Object.isFrozen(first));

  const second = await renderPdfThumbnailWithLocalWasm(optionsFor({ bytes, wasmBinary }));
  assert.deepEqual(second.pixels, first.pixels);

  assert.deepEqual(bytes, inputBefore);
  assert.deepEqual(wasmBinary, wasmBefore);
});

test('thumbnail bound at or above page size matches full page render bytes', async () => {
  const bytes = bytesForFixture();
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const page = await renderPdfPageWithLocalWasm({
    bytes: Buffer.from(bytes),
    wasmBinary: Buffer.from(wasmBinary),
    initPdfium: realInitPdfium(),
    pageIndex: 0,
    maxPixels: 40000,
  });
  assert.equal(page.width, 200);
  assert.equal(page.height, 200);
  const thumb = await renderPdfThumbnailWithLocalWasm(optionsFor({
    bytes,
    wasmBinary,
    thumbMaxDimension: 400,
  }));
  assert.equal(thumb.width, 200);
  assert.equal(thumb.height, 200);
  assert.deepEqual(thumb.pixels, page.pixels);
});

test('thumbnail pixel budget is enforced before bitmap creation', async () => {
  await assert.rejects(
    renderPdfThumbnailWithLocalWasm(optionsFor({ maxPixels: 100 })),
    /thumbnail size exceeds the caller pixel budget/,
  );
});

test('malformed document fails closed without throwing', async () => {
  const result = await renderPdfThumbnailWithLocalWasm(optionsFor({
    bytes: Buffer.from('thumbnail malformed probe: not a pdf document'),
  }));
  assert.equal(result.openSucceeded, false);
  assert.ok(Number.isSafeInteger(result.pdfiumLastError));
});

test('out-of-range page index rejects without partial output', async () => {
  await assert.rejects(
    renderPdfThumbnailWithLocalWasm(optionsFor({ pageIndex: 99 })),
    RangeError,
  );
});
