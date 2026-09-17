'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  extractPdfPagesWithLocalWasm,
  EXTRACT_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-extract-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-extract-runtime.js');
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
  const target = options.target ?? 501;
  const sourceHandle = 71;
  const savedBytes = Uint8Array.from(options.savedBytes ?? [0x25, 0x50, 0x44, 0x46, 0x2d]);
  const writers = new Map();
  let importedIndices = null;
  let targetPages = 0;
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
      return options.badDocument ?? sourceHandle;
    },
    FPDF_GetLastError() {
      events.push('last-error');
      if (options.throwLastError) throw new Error('last error boom');
      return options.lastError ?? 7;
    },
    FPDF_GetPageCount(handle) {
      events.push(`page-count:${handle}`);
      if (options.throwPageCount) throw new Error('page count boom');
      if (handle === target) return options.importedPages ?? targetPages;
      return options.pageCount ?? 3;
    },
    FPDF_GetSignatureCount(handle) {
      events.push(`signature-count:${handle}`);
      if (options.throwSignatureCount) throw new Error('signature count boom');
      return options.signatureCount ?? 0;
    },
    FPDF_CreateNewDocument() {
      events.push('create-target');
      if (options.throwCreate) throw new Error('create boom');
      return options.badTarget ?? target;
    },
    FPDF_ImportPagesByIndex(targetHandle, srcHandle, pointer, length, index) {
      events.push(`import:${targetHandle}:${srcHandle}:${length}:${index}`);
      if (options.throwImport) throw new Error('import boom');
      const view = new DataView(heap.buffer, heap.byteOffset + pointer, length * 4);
      importedIndices = [];
      for (let at = 0; at < length; at += 1) importedIndices.push(view.getInt32(at * 4, true));
      targetPages = options.importedPages ?? length;
      if (options.importFalse) return 0;
      return 1;
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
  return { module, events, heap, imported: () => importedIndices };
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
    pageIndices: overrides.pageIndices ?? [0, 2],
  };
}

test('extract module exposes only the bounded runtime surface', () => {
  const runtime = require('../src/pdf/browser/pdf-extract-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['extractPdfPagesWithLocalWasm', 'EXTRACT_RESOURCE_BUDGETS']);
  assert.equal(typeof extractPdfPagesWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(EXTRACT_RESOURCE_BUDGETS, { maxInputBytes: 67108864, maxOutputBytes: 67108864 });
  assert.equal(Object.isFrozen(EXTRACT_RESOURCE_BUDGETS), true);
});

test('invalid options fail before any runtime effect', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  const base = { bytes: bytes(), wasmBinary: wasm(), initPdfium, pageIndices: [0, 2] };
  const invalid = [
    { ...base, bytes: new Uint8Array() },
    { ...base, wasmBinary: new Uint8Array() },
    { ...base, initPdfium: null },
    { ...base, pageIndices: null },
    { ...base, pageIndices: '02' },
    { ...base, pageIndices: [] },
    { ...base, pageIndices: [0, -1] },
    { ...base, pageIndices: [1.5] },
    { ...base, pageIndices: ['0'] },
    { ...base, extra: 1 },
    { bytes: base.bytes, wasmBinary: base.wasmBinary, initPdfium },
  ];
  for (const options of invalid) {
    await assert.rejects(extractPdfPagesWithLocalWasm(options), TypeError);
  }
  await assert.rejects(extractPdfPagesWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('successful extraction imports the requested subset in order', async () => {
  const runtime = fakeRuntime({ savedBytes: [9, 9, 9] });
  const result = await extractPdfPagesWithLocalWasm({
    bytes: bytes(),
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
    pageIndices: [2, 0],
  });
  assert.deepEqual(runtime.imported(), [2, 0]);
  const order = runtime.events.filter((event) => !event.startsWith('malloc:') && !event.startsWith('free:'));
  assert.deepEqual(order, [
    'library-init',
    'open:64:8:',
    'page-count:71',
    'signature-count:71',
    'create-target',
    'import:501:71:2:0',
    'page-count:501',
    'signature-count:501',
    'open-writer',
    'save:501:201',
    'writer-size:201',
    'writer-data:201:114:3',
    'close-writer:201',
    'close:501',
    'close:71',
    'destroy',
  ]);
  assert.equal(result.succeeded, true);
  assert.deepEqual(result.pageIndices, [2, 0]);
  assert.equal(Object.isFrozen(result.pageIndices), true);
  assert.equal(result.pageCount, 3);
  assert.deepEqual(Array.from(result.outputBytes), [9, 9, 9]);
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
});

test('invalid selections fail with zero import calls', async () => {
  const cases = [
    [[0, 0], /distinct in-range/],
    [[0, 1, 1], /distinct in-range/],
    [[0, 9], /distinct in-range/],
    [[0, 1, 2, 3], /at least one in-range/],
  ];
  for (const [pageIndices, pattern] of cases) {
    const runtime = fakeRuntime({ pageCount: 3 });
    await assert.rejects(
      extractPdfPagesWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module, pageIndices })),
      pattern,
    );
    assert.equal(runtime.events.some((event) => event.startsWith('import:')), false);
    assert.ok(runtime.events.includes('close:71'));
    assert.ok(runtime.events.includes('destroy'));
  }
});

test('import failure closes both documents and publishes nothing', async () => {
  const runtime = fakeRuntime({ importFalse: true });
  await assert.rejects(
    extractPdfPagesWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /page import did not complete/,
  );
  assert.equal(runtime.events.some((event) => event.startsWith('open-writer')), false);
  assert.ok(runtime.events.includes('close:501'));
  assert.ok(runtime.events.includes('close:71'));
});

test('unopenable input and save failures publish nothing', async () => {
  const closed = fakeRuntime({ rejectOpen: true, lastError: 3 });
  await assert.rejects(
    extractPdfPagesWithLocalWasm(optionsFor({ initPdfium: async () => closed.module })),
    /could not open the input document \(last-error 3\)/,
  );
  for (const mode of ['saveFalse', 'zeroSize', 'shortRead']) {
    const runtime = fakeRuntime(
      mode === 'saveFalse' ? { saveFalse: true } : mode === 'zeroSize' ? { writerSize: 0 } : { shortRead: 1 },
    );
    await assert.rejects(
      extractPdfPagesWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
      /save did not complete|produced no bytes|readout is incomplete/,
    );
  }
});

test('resource budgets are enforced and cleanup aggregates', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  await assert.rejects(
    extractPdfPagesWithLocalWasm(optionsFor({ bytes: new Uint8Array(67108865), initPdfium })),
    /exceeds the extract resource budget/,
  );
  assert.equal(initCalls, 0);
  const oversize = fakeRuntime({ writerSize: 67108865 });
  await assert.rejects(
    extractPdfPagesWithLocalWasm(optionsFor({ initPdfium: async () => oversize.module })),
    /exceeds the extract resource budget/,
  );
  const failing = fakeRuntime({ pageCount: 2, throwClose: true, throwDestroy: true });
  const error = await extractPdfPagesWithLocalWasm(
    optionsFor({ initPdfium: async () => failing.module, pageIndices: [0, 4] }),
  ).then(() => null, (failure) => failure);
  assert.ok(error instanceof AggregateError);
  assert.match(error.errors[0].message, /distinct in-range/);
  const input = bytes();
  const runtime = fakeRuntime();
  const error2 = await extractPdfPagesWithLocalWasm({
    bytes: input,
    wasmBinary: wasm(),
    initPdfium: async () => { input[0] = 0x00; return runtime.module; },
    pageIndices: [0, 2],
  }).then(() => null, (failure) => failure);
  assert.ok(error2 instanceof AggregateError);
  assert.ok(error2.errors.some((entry) => /source bytes changed/.test(entry.message)));
});

test('huge claimed page count cannot force a large validation allocation', async () => {
  const runtime = fakeRuntime({ pageCount: 2 ** 30, savedBytes: [1] });
  const result = await extractPdfPagesWithLocalWasm({
    bytes: bytes(),
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
    pageIndices: [0, 1],
  });
  assert.equal(result.succeeded, true);
  assert.deepEqual(result.pageIndices, [0, 1]);
  assert.equal(result.pageCount, 2 ** 30);
});

test('extract source imports only the allowlisted single import path', () => {
  const source = fs.readFileSync(SOURCE_PATH, 'utf8');
  const requires = Array.from(source.matchAll(/require\('([^']+)'\)/g)).map((match) => match[1]);
  assert.deepEqual(Array.from(new Set(requires)).sort(), ['node:crypto', 'node:util']);
  assert.doesNotMatch(source, /require\('@embedpdf\/pdfium'\)/);
  assert.match(source, /FPDF_ImportPagesByIndex/);
  assert.doesNotMatch(source, /FPDF_ImportPages\(/);
  assert.doesNotMatch(source, /FPDF_MovePages/);
  assert.doesNotMatch(source, /FPDFPage_Delete/);
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

async function pageTexts(bytes, wasmBinary, initPdfium, count) {
  const texts = [];
  for (let pageIndex = 0; pageIndex < count; pageIndex += 1) {
    const extracted = await extractPdfPageTextWithLocalWasm({
      bytes, wasmBinary, initPdfium, pageIndex, maxChars: 100,
    });
    assert.equal(extracted.openSucceeded, true);
    texts.push(extracted.text);
  }
  return texts;
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

test('real subset extraction preserves requested order with text proof', async () => {
  const wasmBinary = realWasmBinary();
  const input = new Uint8Array(fs.readFileSync(ORDER_FIXTURE));
  const inputBefore = Buffer.from(input);
  const result = await extractPdfPagesWithLocalWasm({
    bytes: input, wasmBinary, initPdfium: realInitPdfium(), pageIndices: [2, 0],
  });
  assert.equal(result.succeeded, true);
  assert.deepEqual(result.pageIndices, [2, 0]);
  assert.equal(result.pageCount, 3);
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
  assert.deepEqual(Buffer.from(input), inputBefore);
  const afterTexts = await pageTexts(result.outputBytes, realWasmBinary(), realInitPdfium(), 2);
  assert.deepEqual(afterTexts, ['page-gamma', 'page-alpha']);
  const inspection = await inspectPdfWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
  assert.equal(inspection.pageCount, 2);
  const rendered = await renderPdfPageWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, maxPixels: 40000,
  });
  assert.equal(rendered.openSucceeded, true);
});

test('real full-set and single-page extractions succeed', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDER_FIXTURE));
  const full = await extractPdfPagesWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndices: [0, 1, 2],
  });
  assert.equal(full.succeeded, true);
  assert.deepEqual(await pageTexts(full.outputBytes, realWasmBinary(), realInitPdfium(), 3),
    ['page-alpha', 'page-beta', 'page-gamma']);
  const single = await extractPdfPagesWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndices: [1],
  });
  assert.equal(single.succeeded, true);
  assert.deepEqual(await pageTexts(single.outputBytes, realWasmBinary(), realInitPdfium(), 1), ['page-beta']);
  const ordinary = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const only = await extractPdfPagesWithLocalWasm({
    bytes: ordinary, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndices: [0],
  });
  assert.equal(only.succeeded, true);
  assert.equal(only.pageCount, 1);
});

test('real invalid selections fail with zero import calls', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDER_FIXTURE));
  for (const pageIndices of [[0, 0], [0, 1, 1], [0, 9], [0, 1, 2, 3]]) {
    await assert.rejects(
      extractPdfPagesWithLocalWasm({
        bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndices,
      }),
      /distinct in-range|at least one in-range/,
    );
  }
});

test('real malformed and non-PDF inputs fail', async () => {
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  await assert.rejects(
    extractPdfPagesWithLocalWasm({
      bytes: truncated, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndices: [0],
    }),
    Error,
  );
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(
    extractPdfPagesWithLocalWasm({
      bytes: nonPdf, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndices: [0],
    }),
    Error,
  );
});

test('real extraction of the signed-structure page claims no preservation', async () => {
  const input = new Uint8Array(fs.readFileSync(SIGNED_FIXTURE));
  const inputBefore = Buffer.from(input);
  const result = await extractPdfPagesWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndices: [0],
  });
  assert.equal(result.succeeded, true);
  assert.equal(result.signatureStructurePresent, true);
  assert.equal(result.signatureCount, 1);
  assert.equal('signaturePreserved' in result, false);
  assert.equal('signatureValid' in result, false);
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
  assert.deepEqual(Buffer.from(input), inputBefore);
});

test('real extraction on the active-content fixture succeeds without execution surface', async () => {
  const input = new Uint8Array(fs.readFileSync(ACTIVE_CONTENT_FIXTURE));
  const inputBefore = Buffer.from(input);
  const result = await extractPdfPagesWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndices: [0],
  });
  assert.equal(result.succeeded, true);
  assert.deepEqual(Buffer.from(input), inputBefore);
  const inspection = await inspectPdfWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
  assert.equal(inspection.pageCount, 1);
});
