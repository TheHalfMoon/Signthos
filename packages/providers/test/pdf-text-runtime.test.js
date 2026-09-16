'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');

const root = path.resolve(__dirname, '../../..');
const fixtureRoot = path.join(root, 'specs/004-local-pdf-core/fixtures/admission');
const manifest = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'manifest.json'), 'utf8'));
const fixture = manifest.records.find((item) => item.fixtureId === 'admission-seed-ordinary-minimal-v1');
assert.ok(fixture, 'missing ordinary minimal admission fixture');

const EXPECTED_FIXTURE_SHA256 = 'd88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207';
const EXPECTED_WASM_SHA256 = 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8';

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
    maxChars: overrides.maxChars ?? 1000,
  };
}

test('text runtime module exposes only the bounded extract function', () => {
  const runtime = require('../src/pdf/browser/pdf-text-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['extractPdfPageTextWithLocalWasm']);
  assert.equal(typeof extractPdfPageTextWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
});

test('text runtime source keeps the local-only raw-runtime boundary', () => {
  const source = fs.readFileSync(
    path.join(root, 'packages/providers/src/pdf/browser/pdf-text-runtime.js'),
    'utf8',
  );
  assert.match(source, /FPDFText_LoadPage/);
  assert.match(source, /FPDFText_CountChars/);
  assert.match(source, /FPDFText_GetText/);
  assert.match(source, /FPDFText_HasUnicodeMapError/);
  assert.match(source, /FPDFText_ClosePage/);
  assert.equal(source.match(/await initPdfium\(/g).length, 1);
  for (const forbidden of [
    /require\('@embedpdf\/pdfium'\)/,
    /FPDFText_FindStart/,
    /FPDFText_GetCharBox/,
    /FPDFText_GetFontInfo/,
    /FPDF_RenderPageBitmap/,
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
    { ...optionsFor(), maxChars: 0, initPdfium },
    { ...optionsFor(), maxChars: -50, initPdfium },
    { ...optionsFor(), maxChars: 2.5, initPdfium },
    { ...optionsFor(), maxChars: '1000', initPdfium },
    { ...optionsFor(), maxChars: null, initPdfium },
    { ...optionsFor(), bytes: new Proxy(bytesForFixture(), {}), initPdfium },
  ];
  for (const options of invalidOptions) {
    await assert.rejects(extractPdfPageTextWithLocalWasm(options), TypeError);
  }
  assert.equal(initCalls, 0);
});

test('ordinary-minimal fixture extracts bounded deterministic page text', async () => {
  const bytes = bytesForFixture();
  assert.equal(sha256(bytes), EXPECTED_FIXTURE_SHA256);
  const wasmBinary = Buffer.from(REAL_WASM_BYTES);
  const inputBefore = Buffer.from(bytes);
  const wasmBefore = Buffer.from(wasmBinary);

  const first = await extractPdfPageTextWithLocalWasm(optionsFor({ bytes, wasmBinary }));
  assert.equal(first.openSucceeded, true);
  assert.equal(first.pageIndex, 0);
  assert.equal(first.pageCount, 1);
  assert.equal(first.charCount, 8);
  assert.equal(first.truncated, false);
  assert.equal(first.unicodeMapError, false);
  assert.equal(first.text, 'Signthos');
  assert.ok(Object.isFrozen(first));

  const second = await extractPdfPageTextWithLocalWasm(optionsFor({ bytes, wasmBinary }));
  assert.deepEqual(second, first);

  assert.deepEqual(bytes, inputBefore);
  assert.deepEqual(wasmBinary, wasmBefore);
});

test('extraction truncates explicitly at the caller char budget', async () => {
  const result = await extractPdfPageTextWithLocalWasm(optionsFor({ maxChars: 4 }));
  assert.equal(result.openSucceeded, true);
  assert.equal(result.charCount, 8);
  assert.equal(result.truncated, true);
  assert.equal(result.text, 'Sign');
});

test('malformed document fails closed without throwing', async () => {
  const result = await extractPdfPageTextWithLocalWasm(optionsFor({
    bytes: Buffer.from('text extraction malformed probe: not a pdf document'),
  }));
  assert.equal(result.openSucceeded, false);
  assert.ok(Number.isSafeInteger(result.pdfiumLastError));
});

test('out-of-range page index rejects without partial output', async () => {
  await assert.rejects(
    extractPdfPageTextWithLocalWasm(optionsFor({ pageIndex: 99 })),
    RangeError,
  );
});
