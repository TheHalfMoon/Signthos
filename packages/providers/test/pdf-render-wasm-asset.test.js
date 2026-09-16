'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { loadExactPdfiumWasmAsset } = require('../src/pdf/browser/pdf-render-wasm-asset');

const root = path.resolve(__dirname, '../../..');

const EXPECTED_WASM_SHA256 = 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8';
const EXPECTED_WASM_BYTE_LENGTH = 4633788;

function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function exactPackageRoot() {
  const mainPath = require.resolve('@embedpdf/pdfium');
  return path.resolve(path.dirname(mainPath), '..');
}

function makePackageDir({ metadata, wasmBytes }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'signthos-render-wasm-asset-'));
  if (metadata !== undefined) {
    fs.writeFileSync(path.join(dir, 'package.json'), metadata);
  }
  if (wasmBytes !== undefined) {
    fs.mkdirSync(path.join(dir, 'dist'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'dist', 'pdfium.wasm'), wasmBytes);
  }
  return dir;
}

function validMetadata(overrides = {}) {
  return JSON.stringify({
    name: '@embedpdf/pdfium',
    version: '2.15.0',
    ...overrides,
  });
}

test('wasm asset module exposes only the bounded loader', () => {
  const asset = require('../src/pdf/browser/pdf-render-wasm-asset');
  assert.deepEqual(Reflect.ownKeys(asset), ['loadExactPdfiumWasmAsset']);
  assert.equal(typeof loadExactPdfiumWasmAsset, 'function');
  assert.equal(Object.isFrozen(asset), true);
});

test('wasm asset source uses only local file reads with pinned identity checks', () => {
  const source = fs.readFileSync(
    path.join(root, 'packages/providers/src/pdf/browser/pdf-render-wasm-asset.js'),
    'utf8',
  );
  assert.match(source, /require\('node:fs'\)/);
  assert.match(source, /require\('node:path'\)/);
  assert.match(source, /require\('node:crypto'\)/);
  assert.match(source, /c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8/);
  assert.match(source, /4633788/);
  for (const forbidden of [
    /require\('@embedpdf\/pdfium'\)/,
    /initPdfium/,
    /renderPdfPageWith/,
    /orchestratePdfRender/,
    /PDFiumExt_Init/,
    /\bFPDF_/,
    /\bWebAssembly\b/,
    /\bfetch\s*\(/,
    /XMLHttpRequest/,
    /\bWorker\s*\(/,
    /importScripts/,
    /child_process/,
    /node:net/,
    /node:tls/,
    /node:dns/,
    /setTimeout\s*\(/,
    /setInterval\s*\(/,
    /https?:\/\//,
    /\bURL\b/,
    /cdn/i,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
});

test('loader returns caller-owned exact WASM bytes from the adopted package', () => {
  const packageRoot = exactPackageRoot();
  const metadata = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
  assert.equal(metadata.name, '@embedpdf/pdfium');
  assert.equal(metadata.version, '2.15.0');
  assert.equal(metadata.dependencies, undefined);

  const wasmBinary = loadExactPdfiumWasmAsset({ packageRoot });
  assert.ok(Buffer.isBuffer(wasmBinary));
  assert.equal(wasmBinary.byteLength, EXPECTED_WASM_BYTE_LENGTH);
  assert.equal(sha256(wasmBinary), EXPECTED_WASM_SHA256);
});

test('each loader call returns an independent copy', () => {
  const packageRoot = exactPackageRoot();
  const first = loadExactPdfiumWasmAsset({ packageRoot });
  const second = loadExactPdfiumWasmAsset({ packageRoot });
  assert.deepEqual(first, second);
  assert.notEqual(first, second);
  first[0] = (first[0] + 1) % 256;
  assert.notDeepEqual(first, second);
  const third = loadExactPdfiumWasmAsset({ packageRoot });
  assert.equal(sha256(third), EXPECTED_WASM_SHA256);
});

test('loader fails closed on package identity mismatch', async () => {
  const wasmBytes = loadExactPdfiumWasmAsset({ packageRoot: exactPackageRoot() });
  const cases = [
    ['wrong name', validMetadata({ name: '@embedpdf/other' })],
    ['wrong version', validMetadata({ version: '2.14.0' })],
    ['declared dependencies', validMetadata({ dependencies: { leftPad: '1.0.0' } })],
    ['non-object metadata', JSON.stringify([1, 2, 3])],
    ['invalid JSON', '{not json'],
  ];
  for (const [label, metadata] of cases) {
    const dir = makePackageDir({ metadata, wasmBytes });
    await assert.rejects(
      (async () => loadExactPdfiumWasmAsset({ packageRoot: dir }))(),
      Error,
      label,
    );
  }
  const missing = makePackageDir({ wasmBytes });
  await assert.rejects(
    (async () => loadExactPdfiumWasmAsset({ packageRoot: missing }))(),
    /metadata is unreadable/,
  );
});

test('loader fails closed on WASM identity mismatch', async () => {
  const metadata = validMetadata();
  const realWasm = loadExactPdfiumWasmAsset({ packageRoot: exactPackageRoot() });
  const tampered = Buffer.from(realWasm);
  tampered[tampered.length - 1] = (tampered[tampered.length - 1] + 1) % 256;
  const cases = [
    ['tampered bytes', tampered],
    ['truncated bytes', realWasm.subarray(0, realWasm.length - 1)],
    ['empty bytes', Buffer.alloc(0)],
  ];
  for (const [label, wasmBytes] of cases) {
    const dir = makePackageDir({ metadata, wasmBytes });
    await assert.rejects(
      (async () => loadExactPdfiumWasmAsset({ packageRoot: dir }))(),
      /WASM bytes do not match/,
      label,
    );
  }
  const missingWasm = makePackageDir({ metadata });
  await assert.rejects(
    (async () => loadExactPdfiumWasmAsset({ packageRoot: missingWasm }))(),
    /WASM bytes are unreadable/,
  );
});

test('top-level proxy, accessor, extra-key, and malformed root fail without invoking getters', async () => {
  let traps = 0;
  const proxy = new Proxy({ packageRoot: exactPackageRoot() }, {
    getPrototypeOf() { traps += 1; throw new Error('trap executed'); },
    ownKeys() { traps += 1; throw new Error('trap executed'); },
    getOwnPropertyDescriptor() { traps += 1; throw new Error('trap executed'); },
  });
  assert.throws(() => loadExactPdfiumWasmAsset(proxy), /qualified own data fields/);
  assert.equal(traps, 0);

  const base = { packageRoot: exactPackageRoot() };
  let getterCalls = 0;
  const accessor = { ...base };
  Object.defineProperty(accessor, 'packageRoot', {
    enumerable: true,
    get() { getterCalls += 1; throw new Error('getter executed'); },
  });
  const cases = [
    accessor,
    { ...base, extra: true },
    Object.assign({ ...base }, { [Symbol('extra')]: true }),
    Object.assign(Object.create({ inherited: true }), base),
    {},
    { packageRoot: '' },
    { packageRoot: 42 },
    { packageRoot: null },
  ];
  for (const value of cases) {
    assert.throws(() => loadExactPdfiumWasmAsset(value), /(qualified own data fields|non-empty string)/);
  }
  assert.equal(getterCalls, 0);
});

test('null-prototype options remain accepted', () => {
  const options = Object.assign(Object.create(null), { packageRoot: exactPackageRoot() });
  const wasmBinary = loadExactPdfiumWasmAsset(options);
  assert.equal(sha256(wasmBinary), EXPECTED_WASM_SHA256);
});
