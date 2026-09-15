'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  inspectPdfWithExactPdfiumPackage,
} = require('../src/pdf/browser/pdf-inspect-runtime-binding');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const FIXTURE_PATH = path.join(
  REPO_ROOT,
  'specs/004-local-pdf-core/fixtures/admission/ordinary-minimal.pdf',
);
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

test('exact package runtime binding exposes only the bounded inspect function', () => {
  const binding = require('../src/pdf/browser/pdf-inspect-runtime-binding');
  assert.deepEqual(Reflect.ownKeys(binding), ['inspectPdfWithExactPdfiumPackage']);
  assert.equal(typeof inspectPdfWithExactPdfiumPackage, 'function');
  assert.equal(Object.isFrozen(binding), true);
});

test('binding source imports the exact package initializer without asset or network resolution', () => {
  const sourcePath = path.join(
    __dirname,
    '../src/pdf/browser/pdf-inspect-runtime-binding.js',
  );
  const source = fs.readFileSync(sourcePath, 'utf8');

  assert.match(source, /require\('@embedpdf\/pdfium'\)/);
  assert.match(source, /require\('\.\/pdf-inspect-runtime'\)/);
  assert.doesNotMatch(source, /DEFAULT_PDFIUM_WASM_URL/);
  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /XMLHttpRequest/);
  assert.doesNotMatch(source, /https?:\/\//);
  assert.doesNotMatch(source, /node:fs|node:path|require\(['"]fs['"]\)/);
});

test('exact adopted package and local WASM identities match the canonical qualification', () => {
  const { packageJson, wasm } = exactPackagePaths();
  const packageMetadata = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
  const wasmBytes = fs.readFileSync(wasm);

  assert.equal(packageMetadata.name, '@embedpdf/pdfium');
  assert.equal(packageMetadata.version, '2.15.0');
  assert.equal(packageMetadata.dependencies, undefined);
  assert.equal(wasmBytes.byteLength, 4633788);
  assert.equal(sha256(wasmBytes), EXPECTED_WASM_SHA256);
});

test('binding executes the canonical ordinary-minimal fixture through exact local PDFium', async () => {
  const { wasm } = exactPackagePaths();
  const bytes = fs.readFileSync(FIXTURE_PATH);
  const wasmBinary = fs.readFileSync(wasm);
  const inputBefore = Buffer.from(bytes);
  const wasmBefore = Buffer.from(wasmBinary);

  assert.equal(bytes.byteLength, 583);
  assert.equal(sha256(bytes), EXPECTED_FIXTURE_SHA256);
  assert.equal(sha256(wasmBinary), EXPECTED_WASM_SHA256);

  const result = await inspectPdfWithExactPdfiumPackage({ bytes, wasmBinary });

  assert.deepEqual(result, { openSucceeded: true, pageCount: 1 });
  assert.equal(Object.isFrozen(result), true);
  assert.deepEqual(bytes, inputBefore);
  assert.deepEqual(wasmBinary, wasmBefore);
});

test('binding preserves canonical raw-runtime input validation', async () => {
  await assert.rejects(
    inspectPdfWithExactPdfiumPackage({ bytes: new Uint8Array(), wasmBinary: Uint8Array.of(0) }),
    /bytes must be a non-empty Uint8Array/,
  );
  await assert.rejects(
    inspectPdfWithExactPdfiumPackage({ bytes: Uint8Array.of(0), wasmBinary: new Uint8Array() }),
    /wasmBinary must be a non-empty Uint8Array/,
  );
});
