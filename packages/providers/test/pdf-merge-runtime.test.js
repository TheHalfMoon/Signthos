'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  mergePdfDocumentsWithLocalWasm,
  MERGE_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-merge-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');
const { readPdfMetadataWithLocalWasm } = require('../src/pdf/browser/pdf-metadata-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-merge-runtime.js');
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
const TEST_USER_PASSWORD = 'signthos-004e-test-pw';
const TEST_OWNER_PASSWORD = 'signthos-004e-test-owner';

function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function fakeRuntime(options = {}) {
  const events = [];
  const heap = new Uint8Array(options.heapBytes ?? 65536);
  let allocation = options.allocation ?? 64;
  const handles = { source: [71, 72], target: 501 };
  const sourcePages = options.sourcePages ?? [1, 3];
  let targetPages = 0;
  const savedBytes = Uint8Array.from(options.savedBytes ?? [0x25, 0x50, 0x44, 0x46, 0x2d]);
  const writers = new Map();
  const imports = [];
  let opened = 0;
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
      events.push(`open:${opened}:${pointer}:${length}:${password}`);
      if (options.throwOpen) throw new Error('open boom');
      const slot = opened;
      opened += 1;
      if (options.rejectOpenSlot === slot) return 0;
      if (options.rejectOpen) return 0;
      return options.badDocument ?? handles.source[slot];
    },
    FPDF_GetLastError() {
      events.push('last-error');
      if (options.throwLastError) throw new Error('last error boom');
      return options.lastError ?? 7;
    },
    FPDF_GetPageCount(handle) {
      events.push(`page-count:${handle}`);
      if (options.throwPageCount) throw new Error('page count boom');
      if (handle === handles.target) return options.importedPages ?? targetPages;
      const slot = handles.source.indexOf(handle);
      return sourcePages[slot] ?? 0;
    },
    FPDF_GetSignatureCount(handle) {
      events.push(`signature-count:${handle}`);
      if (options.throwSignatureCount) throw new Error('signature count boom');
      return options.signatureCount ?? 0;
    },
    FPDF_CreateNewDocument() {
      events.push('create-target');
      if (options.throwCreate) throw new Error('create boom');
      return options.badTarget ?? handles.target;
    },
    FPDF_ImportPagesByIndex(targetHandle, srcHandle, pointer, length, index) {
      events.push(`import:${targetHandle}:${srcHandle}:${length}:${index}`);
      if (options.throwImport) throw new Error('import boom');
      const view = new DataView(heap.buffer, heap.byteOffset + pointer, length * 4);
      const order = [];
      for (let at = 0; at < length; at += 1) order.push(view.getInt32(at * 4, true));
      imports.push({ srcHandle, length, index, order });
      targetPages = options.importedPages ?? (targetPages + length);
      if (options.importFalseSlot === imports.length - 1) return 0;
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
  return { module, events, heap, imports: () => imports };
}

function bytes() {
  return Uint8Array.from([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]);
}

function wasm() {
  return Uint8Array.from([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]);
}

function optionsFor(overrides = {}) {
  return {
    bytesList: overrides.bytesList ?? [bytes(), bytes()],
    wasmBinary: overrides.wasmBinary ?? wasm(),
    initPdfium: overrides.initPdfium ?? (async () => fakeRuntime().module),
  };
}

test('merge module exposes only the bounded runtime surface', () => {
  const runtime = require('../src/pdf/browser/pdf-merge-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['mergePdfDocumentsWithLocalWasm', 'MERGE_RESOURCE_BUDGETS']);
  assert.equal(typeof mergePdfDocumentsWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(MERGE_RESOURCE_BUDGETS, { maxInputBytes: 67108864, maxOutputBytes: 67108864 });
  assert.equal(Object.isFrozen(MERGE_RESOURCE_BUDGETS), true);
});

test('invalid options fail before any runtime effect', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  const base = { bytesList: [bytes(), bytes()], wasmBinary: wasm(), initPdfium };
  const invalid = [
    { ...base, bytesList: null },
    { ...base, bytesList: 'nope' },
    { ...base, bytesList: [] },
    { ...base, bytesList: [bytes()] },
    { ...base, bytesList: [bytes(), bytes(), bytes()] },
    { ...base, bytesList: [new Uint8Array(), bytes()] },
    { ...base, bytesList: [bytes(), 'nope'] },
    { ...base, wasmBinary: new Uint8Array() },
    { ...base, initPdfium: null },
    { ...base, extra: 1 },
    { bytesList: base.bytesList, wasmBinary: base.wasmBinary },
  ];
  for (const options of invalid) {
    await assert.rejects(mergePdfDocumentsWithLocalWasm(options), TypeError);
  }
  await assert.rejects(mergePdfDocumentsWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('proxy and accessor list entries fail without invoking caller code', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm({ bytesList: new Proxy([bytes(), bytes()], {}), wasmBinary: wasm(), initPdfium }),
    TypeError,
  );
  let getterCalls = 0;
  const withGetter = [bytes(), bytes()];
  Object.defineProperty(withGetter, '0', { enumerable: true, get() { getterCalls += 1; return bytes(); } });
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm({ bytesList: withGetter, wasmBinary: wasm(), initPdfium }),
    TypeError,
  );
  assert.equal(getterCalls, 0);
  assert.equal(initCalls, 0);
});

test('successful merge imports both inputs in order with lifecycle proof', async () => {
  const runtime = fakeRuntime({ savedBytes: [6, 6, 6, 6], sourcePages: [1, 3] });
  const result = await mergePdfDocumentsWithLocalWasm({
    bytesList: [bytes(), bytes()],
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
  });
  assert.deepEqual(runtime.imports().map((entry) => [entry.srcHandle, entry.length, entry.index]), [[71, 1, 0], [72, 3, 1]]);
  assert.deepEqual(runtime.imports()[0].order, [0]);
  assert.deepEqual(runtime.imports()[1].order, [0, 1, 2]);
  const order = runtime.events.filter((event) => !event.startsWith('malloc:') && !event.startsWith('free:'));
  assert.deepEqual(order, [
    'library-init',
    'open:0:64:8:',
    'open:1:89:8:',
    'page-count:71',
    'page-count:72',
    'signature-count:71',
    'signature-count:72',
    'create-target',
    'page-count:501',
    'import:501:71:1:0',
    'page-count:501',
    'page-count:501',
    'import:501:72:3:1',
    'page-count:501',
    'signature-count:501',
    'open-writer',
    'save:501:201',
    'writer-size:201',
    'writer-data:201:164:4',
    'close-writer:201',
    'close:501',
    'close:72',
    'close:71',
    'destroy',
  ]);
  assert.equal(result.succeeded, true);
  assert.deepEqual(result.inputByteLengths, [8, 8]);
  assert.equal(result.inputDigests.length, 2);
  assert.deepEqual(result.inputPageCounts, [1, 3]);
  assert.equal(result.pageCount, 4);
  assert.equal(Object.isFrozen(result.inputDigests), true);
  assert.equal(Object.isFrozen(result.inputPageCounts), true);
  assert.deepEqual(Array.from(result.outputBytes), [6, 6, 6, 6]);
  assert.notEqual(result.outputDigest.value, result.inputDigests[0].value);
});

test('second-input open failure closes the first document and publishes nothing', async () => {
  const runtime = fakeRuntime({ rejectOpenSlot: 1, lastError: 4 });
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /could not open input 1 \(last-error 4\)/,
  );
  assert.ok(runtime.events.includes('close:71'));
  assert.equal(runtime.events.some((event) => event.startsWith('create-target')), false);
  assert.ok(runtime.events.includes('destroy'));
});

test('import and count failures close all documents and publish nothing', async () => {
  const failing = fakeRuntime({ importFalseSlot: 1 });
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm(optionsFor({ initPdfium: async () => failing.module })),
    /page import did not complete \(input 1\)/,
  );
  assert.equal(failing.events.some((event) => event.startsWith('open-writer')), false);
  assert.ok(failing.events.includes('close:501'));
  assert.ok(failing.events.includes('close:72'));
  assert.ok(failing.events.includes('close:71'));
  const mismatched = fakeRuntime({ importedPages: 99 });
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm(optionsFor({ initPdfium: async () => mismatched.module })),
    /imported page count mismatch \(input 0\)/,
  );
});

test('unopenable first input and save failures publish nothing', async () => {
  const closed = fakeRuntime({ rejectOpenSlot: 0, lastError: 3 });
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm(optionsFor({ initPdfium: async () => closed.module })),
    /could not open input 0 \(last-error 3\)/,
  );
  for (const mode of ['saveFalse', 'zeroSize', 'shortRead']) {
    const runtime = fakeRuntime(
      mode === 'saveFalse' ? { saveFalse: true } : mode === 'zeroSize' ? { writerSize: 0 } : { shortRead: 1 },
    );
    await assert.rejects(
      mergePdfDocumentsWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
      /save did not complete|produced no bytes|readout is incomplete/,
    );
  }
});

test('resource budgets are enforced and failures aggregate', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm(optionsFor({ bytesList: [bytes(), new Uint8Array(67108865)], initPdfium })),
    /exceeds the merge resource budget/,
  );
  assert.equal(initCalls, 0);
  const oversize = fakeRuntime({ writerSize: 67108865 });
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm(optionsFor({ initPdfium: async () => oversize.module })),
    /exceeds the merge resource budget/,
  );
  const failing = fakeRuntime({ rejectOpenSlot: 1, throwClose: true, throwDestroy: true });
  const error = await mergePdfDocumentsWithLocalWasm(
    optionsFor({ initPdfium: async () => failing.module }),
  ).then(() => null, (failure) => failure);
  assert.ok(error instanceof AggregateError);
  assert.match(error.errors[0].message, /could not open input 1/);
  const first = bytes();
  const runtime = fakeRuntime();
  const error2 = await mergePdfDocumentsWithLocalWasm({
    bytesList: [first, bytes()],
    wasmBinary: wasm(),
    initPdfium: async () => { first[0] = 0x00; return runtime.module; },
  }).then(() => null, (failure) => failure);
  assert.ok(error2 instanceof AggregateError);
  assert.ok(error2.errors.some((entry) => /source bytes changed.*input 0/.test(entry.message)));
});

test('merge source imports only the allowlisted single import path', () => {
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

async function makeEncryptedBytes(wasmBinary, initPdfium) {
  const plain = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const module = await realInitPdfium()({ wasmBinary });
  module.PDFiumExt_Init();
  const { malloc, free } = module.pdfium.wasmExports;
  const heap = module.pdfium.HEAPU8;
  const inPtr = malloc(plain.byteLength);
  heap.set(plain, inPtr);
  const src = module.FPDF_LoadMemDocument(inPtr, plain.byteLength, '');
  assert.notEqual(src, 0);
  const dst = module.FPDF_CreateNewDocument();
  const n = module.FPDF_GetPageCount(src);
  const idx = malloc(n * 4);
  const view = new DataView(heap.buffer, heap.byteOffset + idx, n * 4);
  for (let i = 0; i < n; i += 1) view.setInt32(i * 4, i, true);
  assert.ok(module.FPDF_ImportPagesByIndex(dst, src, idx, n, 0));
  free(idx);
  assert.ok(module.EPDF_SetEncryption(dst, TEST_USER_PASSWORD, TEST_OWNER_PASSWORD, 3));
  const writer = module.PDFiumExt_OpenFileWriter();
  assert.ok(module.PDFiumExt_SaveAsCopy(dst, writer));
  const size = module.PDFiumExt_GetFileWriterSize(writer);
  const outPtr = malloc(size);
  module.PDFiumExt_GetFileWriterData(writer, outPtr, size);
  const out = new Uint8Array(heap.slice(outPtr, outPtr + size));
  free(outPtr);
  module.PDFiumExt_CloseFileWriter(writer);
  module.FPDF_CloseDocument(dst);
  module.FPDF_CloseDocument(src);
  free(inPtr);
  module.FPDF_DestroyLibrary();
  return out;
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

test('real two-document merge concatenates pages with text-order proof', async () => {
  const wasmBinary = realWasmBinary();
  const first = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const second = new Uint8Array(fs.readFileSync(ORDER_FIXTURE));
  const firstBefore = Buffer.from(first);
  const secondBefore = Buffer.from(second);
  let initCalls = 0;
  const initPdfium = async (options) => { initCalls += 1; return realInitPdfium()(options); };
  const result = await mergePdfDocumentsWithLocalWasm({
    bytesList: [first, second], wasmBinary, initPdfium,
  });
  assert.equal(initCalls, 1);
  assert.equal(result.succeeded, true);
  assert.deepEqual(result.inputByteLengths, [first.byteLength, second.byteLength]);
  assert.equal(result.inputDigests[0].value, sha256(first));
  assert.equal(result.inputDigests[1].value, sha256(second));
  assert.deepEqual(result.inputPageCounts, [1, 3]);
  assert.equal(result.pageCount, 4);
  assert.equal(result.signatureStructurePresent, false);
  assert.notEqual(result.outputDigest.value, result.inputDigests[0].value);
  assert.notEqual(result.outputDigest.value, result.inputDigests[1].value);
  assert.deepEqual(Buffer.from(first), firstBefore);
  assert.deepEqual(Buffer.from(second), secondBefore);
  assert.deepEqual(await pageTexts(result.outputBytes, realWasmBinary(), realInitPdfium(), 4),
    ['Signthos', 'page-alpha', 'page-beta', 'page-gamma']);
  const inspection = await inspectPdfWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
  assert.equal(inspection.pageCount, 4);
  const rendered = await renderPdfPageWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 3, maxPixels: 40000,
  });
  assert.equal(rendered.openSucceeded, true);
  const metadata = await readPdfMetadataWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(metadata.openSucceeded, true);
  assert.equal(metadata.metadata.creator, 'PDFium');
  assert.equal(metadata.metadata.producer, 'PDFium');
});

test('real reversed input order produces reversed page order', async () => {
  const first = new Uint8Array(fs.readFileSync(ORDER_FIXTURE));
  const second = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const result = await mergePdfDocumentsWithLocalWasm({
    bytesList: [first, second], wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(result.succeeded, true);
  assert.deepEqual(await pageTexts(result.outputBytes, realWasmBinary(), realInitPdfium(), 4),
    ['page-alpha', 'page-beta', 'page-gamma', 'Signthos']);
});

test('real merge with the signed-structure input claims no preservation', async () => {
  const first = new Uint8Array(fs.readFileSync(SIGNED_FIXTURE));
  const second = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const result = await mergePdfDocumentsWithLocalWasm({
    bytesList: [first, second], wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(result.succeeded, true);
  assert.equal(result.signatureStructurePresent, true);
  assert.deepEqual(result.inputSignatureCounts, [1, 0]);
  assert.equal(result.outputSignatureCount, 0);
  assert.equal('signaturePreserved' in result, false);
  assert.equal('signatureValid' in result, false);
  assert.deepEqual(await pageTexts(result.outputBytes, realWasmBinary(), realInitPdfium(), 2),
    ['rotate me', 'Signthos']);
});

test('real merge with the active-content input succeeds without execution surface', async () => {
  const first = new Uint8Array(fs.readFileSync(ACTIVE_CONTENT_FIXTURE));
  const second = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const firstBefore = Buffer.from(first);
  const result = await mergePdfDocumentsWithLocalWasm({
    bytesList: [first, second], wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(result.succeeded, true);
  assert.deepEqual(Buffer.from(first), firstBefore);
  const inspection = await inspectPdfWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
  assert.equal(inspection.pageCount, 2);
});

test('real encrypted input fails closed without a password', async () => {
  const wasmBinary = realWasmBinary();
  const encrypted = await makeEncryptedBytes(wasmBinary, realInitPdfium());
  const plain = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm({
      bytesList: [encrypted, plain], wasmBinary, initPdfium: realInitPdfium(),
    }),
    /could not open input 0 \(last-error 4\)/,
  );
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm({
      bytesList: [plain, encrypted], wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    }),
    /could not open input 1 \(last-error 4\)/,
  );
});

test('real malformed inputs fail in the correct slot', async () => {
  const ordinary = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm({
      bytesList: [ordinary, truncated], wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    }),
    /could not open input 1/,
  );
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm({
      bytesList: [nonPdf, ordinary], wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    }),
    /could not open input 0/,
  );
  await assert.rejects(
    mergePdfDocumentsWithLocalWasm({
      bytesList: [truncated, nonPdf], wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    }),
    /could not open input 0/,
  );
});
