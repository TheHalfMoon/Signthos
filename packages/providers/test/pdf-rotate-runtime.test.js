'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  rotatePdfPageWithLocalWasm,
  ROTATE_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-rotate-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-rotate-runtime.js');
const ORDINARY_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/ordinary-minimal.pdf');
const TRUNCATED_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/truncated-pdf-like.pdf');
const NONPDF_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/declared-pdf-nonpdf.bin');
const ACTIVE_CONTENT_FIXTURE = path.join(
  REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/active-content-synthetic-v1.pdf',
);
const SIGNED_FIXTURE = path.join(
  REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/signed-structure-synthetic-v1.pdf',
);
const EXPECTED_SIGNED_SHA256 = '3e73cd7415f384de96e9446b82ca4f9053561daeedc7dd1c7acdc83a442d461d';
const EXPECTED_SIGNED_BYTES = 1090;

function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function fakeRuntime(options = {}) {
  const events = [];
  const heap = new Uint8Array(options.heapBytes ?? 65536);
  let allocation = options.allocation ?? 64;
  let document = options.document ?? 71;
  let page = options.page ?? 101;
  let writer = options.writer ?? 201;
  let rotation = options.rotation ?? 0;
  const savedBytes = Uint8Array.from(options.savedBytes ?? [0x25, 0x50, 0x44, 0x46, 0x2d]);
  const writers = new Map();
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
      const handle = document;
      document += 11;
      return options.badDocument ?? handle;
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
    FPDF_LoadPage(handle, index) {
      events.push(`load-page:${handle}:${index}`);
      if (options.throwLoadPage) throw new Error('load page boom');
      const handleOut = page;
      page += 13;
      return options.badPage ?? handleOut;
    },
    FPDF_ClosePage(handle) {
      events.push(`close-page:${handle}`);
      if (options.throwClosePage) throw new Error('close page boom');
    },
    FPDFPage_GetRotation(handle) {
      events.push(`get-rotation:${handle}`);
      if (options.throwGetRotation) throw new Error('get rotation boom');
      if (options.frozenRotation) return options.rotation ?? 0;
      return rotation;
    },
    FPDFPage_SetRotation(handle, quarters) {
      events.push(`set-rotation:${handle}:${quarters}`);
      if (options.throwSetRotation) throw new Error('set rotation boom');
      rotation = quarters;
    },
    PDFiumExt_OpenFileWriter() {
      events.push('open-writer');
      if (options.throwOpenWriter) throw new Error('open writer boom');
      const handleOut = writer;
      writer += 19;
      writers.set(handleOut, savedBytes);
      return options.badWriter ?? handleOut;
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
      const stored = writers.get(writerHandle) ?? savedBytes;
      heap.set(stored.subarray(0, length), pointer);
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
  return { module, events, heap };
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
    degreesClockwise: overrides.degreesClockwise ?? 90,
  };
}

test('rotate module exposes only the bounded runtime surface', () => {
  const runtime = require('../src/pdf/browser/pdf-rotate-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['rotatePdfPageWithLocalWasm', 'ROTATE_RESOURCE_BUDGETS']);
  assert.equal(typeof rotatePdfPageWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(ROTATE_RESOURCE_BUDGETS, { maxInputBytes: 67108864, maxOutputBytes: 67108864 });
  assert.equal(Object.isFrozen(ROTATE_RESOURCE_BUDGETS), true);
});

test('invalid options fail before any runtime effect', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  const base = { bytes: bytes(), wasmBinary: wasm(), initPdfium, pageIndex: 0, degreesClockwise: 90 };
  const invalid = [
    { ...base, bytes: new Uint8Array() },
    { ...base, bytes: new ArrayBuffer(8) },
    { ...base, bytes: 'nope' },
    { ...base, wasmBinary: new Uint8Array() },
    { ...base, initPdfium: null },
    { ...base, pageIndex: -1 },
    { ...base, pageIndex: 1.5 },
    { ...base, pageIndex: '0' },
    { ...base, pageIndex: Number.NaN },
    { ...base, degreesClockwise: 0 },
    { ...base, degreesClockwise: 45 },
    { ...base, degreesClockwise: 360 },
    { ...base, degreesClockwise: 450 },
    { ...base, degreesClockwise: '90' },
    { ...base, degreesClockwise: null },
    { ...base, extra: 1 },
    { bytes: base.bytes, wasmBinary: base.wasmBinary, initPdfium, pageIndex: 0 },
  ];
  for (const options of invalid) {
    await assert.rejects(rotatePdfPageWithLocalWasm(options), TypeError);
  }
  await assert.rejects(rotatePdfPageWithLocalWasm(null), TypeError);
  await assert.rejects(rotatePdfPageWithLocalWasm([1, 2]), TypeError);
  assert.equal(initCalls, 0);
});

test('proxy and accessor options fail without invoking caller code', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  let trapCalls = 0;
  const proxied = new Proxy(
    { bytes: bytes(), wasmBinary: wasm(), initPdfium, pageIndex: 0, degreesClockwise: 90 },
    { get(target, key) { trapCalls += 1; return target[key]; } },
  );
  await assert.rejects(rotatePdfPageWithLocalWasm(proxied), TypeError);
  let getterCalls = 0;
  const withGetter = {};
  Object.defineProperty(withGetter, 'bytes', { enumerable: true, get() { getterCalls += 1; return bytes(); } });
  withGetter.wasmBinary = wasm();
  withGetter.initPdfium = initPdfium;
  withGetter.pageIndex = 0;
  withGetter.degreesClockwise = 90;
  await assert.rejects(rotatePdfPageWithLocalWasm(withGetter), TypeError);
  assert.equal(getterCalls, 0);
  assert.equal(initCalls, 0);
  assert.equal(trapCalls, 0);
});

test('successful rotate executes the mutation lifecycle in order', async () => {
  const runtime = fakeRuntime({ savedBytes: [9, 8, 7, 6] });
  const input = bytes();
  const result = await rotatePdfPageWithLocalWasm({
    bytes: input,
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
    pageIndex: 0,
    degreesClockwise: 180,
  });
  const order = runtime.events.filter((event) => !event.startsWith('malloc:') && !event.startsWith('free:'));
  assert.deepEqual(order, [
    'library-init',
    `open:64:8:`,
    'page-count:71',
    'signature-count:71',
    'load-page:71:0',
    'get-rotation:101',
    'set-rotation:101:2',
    'get-rotation:101',
    'close-page:101',
    'open-writer',
    'save:71:201',
    'writer-size:201',
    'writer-data:201:89:4',
    'close-writer:201',
    'close:71',
    'destroy',
  ]);
  assert.equal(result.succeeded, true);
  assert.equal(result.rotationBefore, 0);
  assert.equal(result.rotationAfter, 2);
  assert.deepEqual(Array.from(result.outputBytes), [9, 8, 7, 6]);
});

test('success result binds exact input/output identity and lineage evidence', async () => {
  const input = bytes();
  const wasmBinary = wasm();
  const expectedInputDigest = sha256(input);
  const runtime = fakeRuntime({ savedBytes: [5, 5, 5], signatureCount: 0 });
  const result = await rotatePdfPageWithLocalWasm({
    bytes: input, wasmBinary, initPdfium: async () => runtime.module, pageIndex: 0, degreesClockwise: 270,
  });
  assert.equal(Object.isFrozen(result), true);
  assert.equal(result.inputByteLength, input.byteLength);
  assert.deepEqual(result.inputDigest, { algorithm: 'sha256', value: expectedInputDigest });
  assert.equal(result.pageIndex, 0);
  assert.equal(result.degreesClockwise, 270);
  assert.equal(result.rotationAfter, 3);
  assert.equal(result.pageCount, 1);
  assert.equal(result.signatureCount, 0);
  assert.equal(result.signatureStructurePresent, false);
  assert.equal(result.outputByteLength, 3);
  assert.deepEqual(result.outputDigest, { algorithm: 'sha256', value: sha256(Uint8Array.from([5, 5, 5])) });
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
  assert.deepEqual(result.providerIdentity, {
    package: '@embedpdf/pdfium',
    version: '2.15.0',
    wasmByteLength: 4633788,
    wasmDigest: 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8',
  });
  assert.equal(result.signaturePreserved, undefined);
  assert.equal(result.signatureValid, undefined);
});

test('out-of-range page target fails without any setter call', async () => {
  const runtime = fakeRuntime({ pageCount: 1 });
  await assert.rejects(
    rotatePdfPageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module, pageIndex: 1 })),
    /pageIndex is out of range/,
  );
  assert.equal(runtime.events.some((event) => event.startsWith('set-rotation:')), false);
  assert.ok(runtime.events.includes('close:71'));
  assert.ok(runtime.events.includes('destroy'));
});

test('unopenable input fails with the PDFium last-error code', async () => {
  const runtime = fakeRuntime({ rejectOpen: true, lastError: 3 });
  await assert.rejects(
    rotatePdfPageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /could not open the input document \(last-error 3\)/,
  );
});

test('save failures publish no output bytes', async () => {
  for (const mode of ['saveFalse', 'zeroSize', 'shortRead']) {
    const runtime = fakeRuntime(
      mode === 'saveFalse' ? { saveFalse: true } : mode === 'zeroSize' ? { writerSize: 0 } : { shortRead: 1 },
    );
    await assert.rejects(
      rotatePdfPageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
      /save did not complete|produced no bytes|readout is incomplete/,
    );
    assert.ok(runtime.events.includes('close-writer:201'));
    assert.ok(runtime.events.includes('close:71'));
    assert.ok(runtime.events.includes('destroy'));
  }
});

test('oversize output is discarded unpublished', async () => {
  const runtime = fakeRuntime({ writerSize: 67108865 });
  await assert.rejects(
    rotatePdfPageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /exceeds the rotate resource budget/,
  );
  assert.ok(runtime.events.includes('close-writer:201'));
});

test('oversize input is rejected before PDFium init', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  await assert.rejects(
    rotatePdfPageWithLocalWasm(optionsFor({ bytes: new Uint8Array(67108865), initPdfium })),
    /exceeds the rotate resource budget/,
  );
  assert.equal(initCalls, 0);
});

test('rotation that does not take effect fails closed', async () => {
  const runtime = fakeRuntime({ frozenRotation: true, rotation: 0 });
  await assert.rejects(
    rotatePdfPageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /did not take effect/,
  );
});

test('invalid provider facts fail closed', async () => {
  const cases = [
    [{ rotation: 9 }, /invalid page rotation/],
    [{ signatureCount: -1 }, /invalid signature count/],
    [{ pageCount: -2 }, /invalid page count/],
    [{ badPage: 0 }, /invalid page handle/],
    [{ badWriter: 0 }, /file-writer allocation failed/],
  ];
  for (const [mode, pattern] of cases) {
    const runtime = fakeRuntime(mode);
    await assert.rejects(
      rotatePdfPageWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
      pattern,
    );
  }
});

test('initializer replacing runtime WASM bytes fails closed', async () => {
  const runtime = fakeRuntime();
  const other = Uint8Array.from([1, 2, 3, 4]);
  await assert.rejects(
    rotatePdfPageWithLocalWasm(optionsFor({
      initPdfium: async (options) => {
        options.wasmBinary = other;
        return runtime.module;
      },
    })),
    /replaced runtime WASM bytes/,
  );
});

test('cleanup failures preserve both primary and cleanup failures', async () => {
  const runtime = fakeRuntime({ pageCount: 0, throwClose: true, throwFree: true, throwDestroy: true });
  const error = await rotatePdfPageWithLocalWasm(
    optionsFor({ initPdfium: async () => runtime.module, pageIndex: 3 }),
  ).then(() => null, (failure) => failure);
  assert.ok(error instanceof AggregateError);
  assert.match(error.message, /rotation and cleanup failed/);
  assert.match(error.errors[0].message, /pageIndex is out of range/);
  assert.ok(error.errors.length >= 3);
});

test('caller byte mutation during execution fails closed', async () => {
  const input = bytes();
  const runtime = fakeRuntime();
  const error = await rotatePdfPageWithLocalWasm({
    bytes: input,
    wasmBinary: wasm(),
    initPdfium: async () => {
      input[0] = 0x00;
      return runtime.module;
    },
    pageIndex: 0,
    degreesClockwise: 90,
  }).then(() => null, (failure) => failure);
  assert.ok(error instanceof AggregateError);
  assert.ok(error.errors.some((entry) => /source bytes changed/.test(entry.message)));
});

test('runtime never retries initialization', async () => {
  let calls = 0;
  const runtime = fakeRuntime({ rejectOpen: true });
  const initPdfium = async () => { calls += 1; return runtime.module; };
  await assert.rejects(rotatePdfPageWithLocalWasm(optionsFor({ initPdfium })), /could not open/);
  assert.equal(calls, 1);
});

test('rotate source imports only the allowlisted modules', () => {
  const source = fs.readFileSync(SOURCE_PATH, 'utf8');
  const requires = Array.from(source.matchAll(/require\('([^']+)'\)/g)).map((match) => match[1]);
  assert.deepEqual(Array.from(new Set(requires)).sort(), ['node:crypto', 'node:util']);
  assert.doesNotMatch(source, /require\('@embedpdf\/pdfium'\)/);
  assert.doesNotMatch(source, /FPDF_SaveAsCopy/);
  assert.doesNotMatch(source, /FPDF_SaveWithVersion/);
  assert.match(source, /PDFiumExt_SaveAsCopy/);
  assert.doesNotMatch(source, /DEFAULT_PDFIUM_WASM_URL/);
  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /XMLHttpRequest/);
  assert.doesNotMatch(source, /https?:\/\//);
  assert.doesNotMatch(source, /node:fs/);
  assert.doesNotMatch(source, /node:path/);
  assert.doesNotMatch(source, /child_process/);
  assert.doesNotMatch(source, /setTimeout\(/);
  assert.doesNotMatch(source, /setInterval\(/);
  assert.doesNotMatch(source, /Worker\(/);
  assert.doesNotMatch(source, /importScripts/);
  assert.doesNotMatch(source, /JavaScript/);
  assert.doesNotMatch(source, /Launch/);
  assert.doesNotMatch(source, /URI/);
  assert.doesNotMatch(source, /OpenAction/);
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

test('adopted package and WASM identities match the canonical qualification', () => {
  const { packageJson, wasm } = exactPackagePaths();
  const metadata = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
  assert.equal(metadata.name, '@embedpdf/pdfium');
  assert.equal(metadata.version, '2.15.0');
  const wasmBytes = fs.readFileSync(wasm);
  assert.equal(wasmBytes.byteLength, 4633788);
  assert.equal(sha256(wasmBytes), 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8');
});

test('real rotate applies and persists rotation on the ordinary-minimal fixture', async () => {
  const wasmBinary = realWasmBinary();
  const input = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const inputBefore = Buffer.from(input);
  let initCalls = 0;
  const initPdfium = async (options) => { initCalls += 1; return realInitPdfium()(options); };
  const first = await rotatePdfPageWithLocalWasm({
    bytes: input, wasmBinary, initPdfium, pageIndex: 0, degreesClockwise: 90,
  });
  assert.equal(initCalls, 1);
  assert.equal(first.succeeded, true);
  assert.equal(first.rotationBefore, 0);
  assert.equal(first.rotationAfter, 1);
  assert.equal(first.pageCount, 1);
  assert.equal(first.signatureCount, 0);
  assert.equal(first.signatureStructurePresent, false);
  assert.equal(first.inputByteLength, 583);
  assert.equal(first.inputDigest.value, 'd88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207');
  assert.notEqual(first.outputDigest.value, first.inputDigest.value);
  assert.ok(first.outputByteLength > 0);
  assert.deepEqual(Buffer.from(input), inputBefore);
  const second = await rotatePdfPageWithLocalWasm({
    bytes: first.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, degreesClockwise: 270,
  });
  assert.equal(second.rotationBefore, 1);
  assert.equal(second.rotationAfter, 0);
  assert.equal(second.pageCount, 1);
});

test('real rotate supports 180 and 270 degree targets', async () => {
  const wasmBinary = realWasmBinary();
  const input = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  for (const [degrees, quarters] of [[180, 2], [270, 3]]) {
    const result = await rotatePdfPageWithLocalWasm({
      bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, degreesClockwise: degrees,
    });
    assert.equal(result.rotationBefore, 0);
    assert.equal(result.rotationAfter, quarters);
  }
  assert.equal(wasmBinary.byteLength, 4633788);
});

test('real out-of-range page target fails without publishing output', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  await assert.rejects(
    rotatePdfPageWithLocalWasm({
      bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 4, degreesClockwise: 90,
    }),
    /pageIndex is out of range/,
  );
});

test('real malformed and non-PDF inputs fail without publishing output', async () => {
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  await assert.rejects(
    rotatePdfPageWithLocalWasm({
      bytes: truncated, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, degreesClockwise: 90,
    }),
    Error,
  );
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(
    rotatePdfPageWithLocalWasm({
      bytes: nonPdf, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, degreesClockwise: 90,
    }),
    Error,
  );
});

test('real rotate of the signed-structure fixture claims no preservation', async () => {
  const wasmBinary = realWasmBinary();
  const input = new Uint8Array(fs.readFileSync(SIGNED_FIXTURE));
  assert.equal(input.byteLength, EXPECTED_SIGNED_BYTES);
  assert.equal(sha256(input), EXPECTED_SIGNED_SHA256);
  const inputBefore = Buffer.from(input);
  const result = await rotatePdfPageWithLocalWasm({
    bytes: input, wasmBinary, initPdfium: realInitPdfium(), pageIndex: 0, degreesClockwise: 90,
  });
  assert.equal(result.succeeded, true);
  assert.equal(result.rotationBefore, 0);
  assert.equal(result.rotationAfter, 1);
  assert.equal(result.signatureStructurePresent, true);
  assert.equal(result.signatureCount, 1);
  assert.equal(result.signaturePreserved, undefined);
  assert.equal(result.signatureValid, undefined);
  assert.equal('signaturePreserved' in result, false);
  assert.equal('signatureValid' in result, false);
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
  assert.deepEqual(Buffer.from(input), inputBefore);
  const again = await rotatePdfPageWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, degreesClockwise: 90,
  });
  assert.equal(again.rotationBefore, 1);
  assert.equal(again.rotationAfter, 2);
  assert.equal(again.signatureStructurePresent, true);
});

test('real rotate of the active-content fixture succeeds without execution surface', async () => {
  const input = new Uint8Array(fs.readFileSync(ACTIVE_CONTENT_FIXTURE));
  const inputBefore = Buffer.from(input);
  const result = await rotatePdfPageWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, degreesClockwise: 90,
  });
  assert.equal(result.succeeded, true);
  assert.equal(result.rotationAfter, 1);
  assert.deepEqual(Buffer.from(input), inputBefore);
  const inspection = await inspectPdfWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
  assert.equal(inspection.pageCount, 1);
});

test('rotated output validates through independent canonical inspection paths', async () => {
  const wasmBinary = realWasmBinary();
  const input = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const rotated = await rotatePdfPageWithLocalWasm({
    bytes: input, wasmBinary, initPdfium: realInitPdfium(), pageIndex: 0, degreesClockwise: 90,
  });
  const inspection = await inspectPdfWithLocalWasm({
    bytes: rotated.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
  assert.equal(inspection.pageCount, 1);
  const beforeText = await extractPdfPageTextWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, maxChars: 1000,
  });
  const afterText = await extractPdfPageTextWithLocalWasm({
    bytes: rotated.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, maxChars: 1000,
  });
  assert.equal(beforeText.openSucceeded, true);
  assert.equal(afterText.openSucceeded, true);
  assert.equal(afterText.text, beforeText.text);
  const rendered = await renderPdfPageWithLocalWasm({
    bytes: rotated.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, maxPixels: 40000,
  });
  assert.equal(rendered.openSucceeded, true);
  assert.equal(rendered.pageCount, 1);
});
