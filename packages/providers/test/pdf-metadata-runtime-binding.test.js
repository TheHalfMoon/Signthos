'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  readPdfMetadataWithExactPdfiumPackage,
} = require('../src/pdf/browser/pdf-metadata-runtime-binding');

const BINDING_OPTIONS_MESSAGE = 'PDF metadata read exact-package runtime binding options must contain only qualified own data fields';
const EXPECTED_WASM_SHA256 = 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8';
const EXPECTED_WASM_BYTES = 4633788;

const root = path.resolve(__dirname, '../../..');
const fixtureRoot = path.join(root, 'specs/004-local-pdf-core/fixtures/admission');
const manifest = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'manifest.json'), 'utf8'));
const fixture = manifest.records.find((item) => item.fixtureId === 'admission-seed-ordinary-minimal-v1');
assert.ok(fixture, 'missing ordinary minimal admission fixture');

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

function adoptedWasmBytes() {
  return new Uint8Array(fs.readFileSync(exactPackagePaths().wasm));
}

function bytesForFixture() {
  return new Uint8Array(fs.readFileSync(path.join(root, fixture.repositoryPath)));
}

function optionsFor(overrides = {}) {
  return {
    bytes: 'bytes' in overrides ? overrides.bytes : Uint8Array.of(1, 2, 3),
    wasmBinary: 'wasmBinary' in overrides ? overrides.wasmBinary : Uint8Array.of(4, 5, 6),
    ...Object.fromEntries(Object.entries(overrides).filter(([key]) => !['bytes', 'wasmBinary'].includes(key))),
  };
}

function bindingMessagePattern() {
  return new RegExp(BINDING_OPTIONS_MESSAGE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
}

test('exact package runtime binding exposes only the bounded metadata function', () => {
  const binding = require('../src/pdf/browser/pdf-metadata-runtime-binding');
  assert.deepEqual(Reflect.ownKeys(binding), ['readPdfMetadataWithExactPdfiumPackage']);
  assert.equal(typeof readPdfMetadataWithExactPdfiumPackage, 'function');
  assert.equal(Object.isFrozen(binding), true);
});

test('binding source imports the exact package initializer without asset or network resolution', () => {
  const sourcePath = path.join(
    __dirname,
    '../src/pdf/browser/pdf-metadata-runtime-binding.js',
  );
  const source = fs.readFileSync(sourcePath, 'utf8');

  assert.match(source, /require\('@embedpdf\/pdfium'\)/);
  assert.match(source, /require\('\.\/pdf-metadata-runtime'\)/);
  assert.doesNotMatch(source, /DEFAULT_PDFIUM_WASM_URL/);
  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /XMLHttpRequest/);
  assert.doesNotMatch(source, /https?:\/\//);
  assert.doesNotMatch(source, /node:fs|node:path|require\(['"]fs['"]\)/);
  assert.doesNotMatch(source, /\bWorker\b/);
  assert.doesNotMatch(source, /\bCDN\b/);
});

test('binding source carries no provider, supervisor, bridge, orchestrator, or cross-track behavior', () => {
  const sourcePath = path.join(
    __dirname,
    '../src/pdf/browser/pdf-metadata-runtime-binding.js',
  );
  const source = fs.readFileSync(sourcePath, 'utf8');

  for (const forbidden of [
    /require\('\.\/pdf-metadata-provider'\)/,
    /require\('\.\/pdf-metadata-runtime-supervisor'\)/,
    /require\('\.\/pdf-metadata-runtime-bridge'\)/,
    /require\('\.\/pdf-metadata-orchestrator'\)/,
    /readPdfPageTextWithLocalWasm/,
    /searchPdfPageTextWithLocalWasm/,
    /orchestratePdfMetadata\(/,
    /composePdfMetadataResult/,
    /supervisePdfMetadataReadRuntime/,
    /composeSupervisedPdfMetadataResult/,
    /orchestratePdfMetadataRead/,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
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
      readPdfMetadataWithExactPdfiumPackage(input),
      bindingMessagePattern(),
    );
  }
});

test('binding rejects accessor, extra-key, missing-key, and symbol-key envelopes before runtime effects', async () => {
  const withAccessor = optionsFor();
  Object.defineProperty(withAccessor, 'bytes', {
    configurable: true,
    enumerable: true,
    get() { return Uint8Array.of(1, 2, 3); },
  });
  const withExtraKey = { ...optionsFor(), unexpected: 1 };
  const { wasmBinary: _dropped, ...withMissingKey } = optionsFor();
  const withSymbolKey = { ...optionsFor(), [Symbol('binding')]: 1 };

  for (const input of [withAccessor, withExtraKey, withMissingKey, withSymbolKey]) {
    await assert.rejects(
      readPdfMetadataWithExactPdfiumPackage(input),
      bindingMessagePattern(),
    );
  }
});

test('binding preserves canonical byte-view validation without invoking the runtime', async () => {
  const bytes = Uint8Array.of(9, 9, 9);
  const wasmBinary = Uint8Array.of(8, 8, 8);
  const bytesBefore = Uint8Array.from(bytes);
  const wasmBefore = Uint8Array.from(wasmBinary);

  await assert.rejects(
    readPdfMetadataWithExactPdfiumPackage(optionsFor({ bytes: new Uint8Array(), wasmBinary })),
    /bytes must be a non-empty Uint8Array/,
  );
  await assert.rejects(
    readPdfMetadataWithExactPdfiumPackage(optionsFor({ bytes, wasmBinary: new Uint8Array() })),
    /wasmBinary must be a non-empty Uint8Array/,
  );

  assert.deepEqual(bytes, bytesBefore);
  assert.deepEqual(wasmBinary, wasmBefore);
});

test('binding delegates package init and raw metadata extraction for caller-supplied bytes', async () => {
  const bytes = bytesForFixture();
  const wasmBinary = adoptedWasmBytes();
  const bytesBefore = Uint8Array.from(bytes);
  const wasmBefore = Uint8Array.from(wasmBinary);

  const result = await readPdfMetadataWithExactPdfiumPackage({
    bytes,
    wasmBinary,
  });

  assert.equal(result.openSucceeded, true);
  assert.deepEqual(result.metadata, {
    title: null,
    author: null,
    subject: null,
    keywords: null,
    creator: null,
    producer: null,
    creationDate: null,
    modDate: null,
  });
  assert.deepEqual(bytes, bytesBefore);
  assert.deepEqual(wasmBinary, wasmBefore);
  assert.equal(Object.isFrozen(bytes), false);
  assert.equal(Object.isFrozen(wasmBinary), false);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.metadata), true);
});

test('mismatched caller WASM bytes fail closed without publishing metadata success', async () => {
  const bytes = bytesForFixture();
  const wasmBinary = Uint8Array.of(0, 1, 2, 3, 4, 5, 6, 7);
  const bytesBefore = Uint8Array.from(bytes);

  await assert.rejects(
    readPdfMetadataWithExactPdfiumPackage({
      bytes,
      wasmBinary,
    }),
  );
  assert.deepEqual(bytes, bytesBefore);
});

test('corrupt caller PDF bytes resolve to structured rejection instead of success', async () => {
  const bytes = Uint8Array.from(Buffer.from('not a pdf document', 'utf8'));
  const wasmBinary = adoptedWasmBytes();

  const result = await readPdfMetadataWithExactPdfiumPackage({
    bytes,
    wasmBinary,
  });

  assert.equal(result.openSucceeded, false);
  assert.ok(Number.isSafeInteger(result.pdfiumLastError));
  assert.equal('metadata' in result, false);
});
