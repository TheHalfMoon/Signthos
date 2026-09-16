'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  renderPdfPageWithExactPdfiumPackage,
} = require('../src/pdf/browser/pdf-render-runtime-binding');

const BINDING_OPTIONS_MESSAGE = 'PDF render exact-package runtime binding options must contain only qualified own data fields';
const EXPECTED_WASM_SHA256 = 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8';
const EXPECTED_WASM_BYTES = 4633788;

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

function optionsFor(overrides = {}) {
  return {
    bytes: 'bytes' in overrides ? overrides.bytes : Uint8Array.of(1, 2, 3),
    wasmBinary: 'wasmBinary' in overrides ? overrides.wasmBinary : Uint8Array.of(4, 5, 6),
    pageIndex: 'pageIndex' in overrides ? overrides.pageIndex : 0,
    maxPixels: 'maxPixels' in overrides ? overrides.maxPixels : 40000,
  };
}

test('exact package runtime binding exposes only the bounded render function', () => {
  const binding = require('../src/pdf/browser/pdf-render-runtime-binding');
  assert.deepEqual(Reflect.ownKeys(binding), ['renderPdfPageWithExactPdfiumPackage']);
  assert.equal(typeof renderPdfPageWithExactPdfiumPackage, 'function');
  assert.equal(Object.isFrozen(binding), true);
});

test('binding source imports the exact package initializer without asset or network resolution', () => {
  const sourcePath = path.join(
    __dirname,
    '../src/pdf/browser/pdf-render-runtime-binding.js',
  );
  const source = fs.readFileSync(sourcePath, 'utf8');

  assert.match(source, /require\('@embedpdf\/pdfium'\)/);
  assert.match(source, /require\('\.\/pdf-render-runtime'\)/);
  assert.doesNotMatch(source, /DEFAULT_PDFIUM_WASM_URL/);
  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /XMLHttpRequest/);
  assert.doesNotMatch(source, /https?:\/\//);
  assert.doesNotMatch(source, /node:fs|node:path|require\(['"]fs['"]\)/);
  assert.doesNotMatch(source, /\bWorker\b/);
  assert.doesNotMatch(source, /\bCDN\b/);
});

test('exact adopted package and local WASM identities match the canonical qualification', () => {
  const { packageJson, wasm } = exactPackagePaths();
  const packageMetadata = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
  const wasmBytes = fs.readFileSync(wasm);

  assert.equal(packageMetadata.name, '@embedpdf/pdfium');
  assert.equal(packageMetadata.version, '2.15.0');
  assert.equal(packageMetadata.dependencies, undefined);
  assert.equal(wasmBytes.byteLength, EXPECTED_WASM_BYTES);
  assert.equal(sha256(wasmBytes), EXPECTED_WASM_SHA256);
});

test('binding rejects malformed envelope shapes before runtime effects', async () => {
  const malformed = [
    null,
    undefined,
    'bytes',
    42,
    Uint8Array.of(1),
    [],
    Buffer.from([1]),
    new Proxy(optionsFor(), {}),
    Object.assign(Object.create({ polluted: true }), optionsFor()),
  ];
  for (const input of malformed) {
    await assert.rejects(
      renderPdfPageWithExactPdfiumPackage(input),
      new RegExp(BINDING_OPTIONS_MESSAGE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    );
  }
});

test('binding rejects accessor, extra-key, missing-key, and symbol-key envelopes before runtime effects', async () => {
  const withAccessor = optionsFor();
  Object.defineProperty(withAccessor, 'pageIndex', {
    configurable: true,
    enumerable: true,
    get() { return 0; },
  });
  const withExtraKey = { ...optionsFor(), unexpected: 1 };
  const { maxPixels: _dropped, ...withMissingKey } = optionsFor();
  const withSymbolKey = { ...optionsFor(), [Symbol('binding')]: 1 };

  for (const input of [withAccessor, withExtraKey, withMissingKey, withSymbolKey]) {
    await assert.rejects(
      renderPdfPageWithExactPdfiumPackage(input),
      new RegExp(BINDING_OPTIONS_MESSAGE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    );
  }
});

test('binding preserves canonical byte-view validation without invoking the runtime', async () => {
  const bytes = Uint8Array.of(9, 9, 9);
  const wasmBinary = Uint8Array.of(8, 8, 8);
  const bytesBefore = Uint8Array.from(bytes);
  const wasmBefore = Uint8Array.from(wasmBinary);

  await assert.rejects(
    renderPdfPageWithExactPdfiumPackage(optionsFor({ bytes: new Uint8Array(), wasmBinary })),
    /bytes must be a non-empty Uint8Array/,
  );
  await assert.rejects(
    renderPdfPageWithExactPdfiumPackage(optionsFor({ bytes, wasmBinary: new Uint8Array() })),
    /wasmBinary must be a non-empty Uint8Array/,
  );

  assert.deepEqual(bytes, bytesBefore);
  assert.deepEqual(wasmBinary, wasmBefore);
});

test('binding preserves canonical page and pixel-budget validation without invoking the runtime', async () => {
  for (const pageIndex of [-1, 1.5, '0', null]) {
    await assert.rejects(
      renderPdfPageWithExactPdfiumPackage(optionsFor({ pageIndex })),
      /pageIndex must be a non-negative safe integer/,
    );
  }
  for (const maxPixels of [0, -100, 2.5, '40000', null]) {
    await assert.rejects(
      renderPdfPageWithExactPdfiumPackage(optionsFor({ maxPixels })),
      /maxPixels must be a positive safe integer/,
    );
  }
});
