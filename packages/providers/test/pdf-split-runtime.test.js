'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  splitPdfDocumentWithLocalWasm,
  SPLIT_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-split-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-split-runtime.js');
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
  const sourceHandle = 71;
  let nextTarget = options.target ?? 501;
  const targetPages = new Map();
  const savedBytes = Uint8Array.from(options.savedBytes ?? [9, 8, 7]);
  const writers = new Map();
  const imports = [];
  let importCalls = 0;
  let saveCalls = 0;
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
      if (targetPages.has(handle)) return targetPages.get(handle);
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
      const handle = nextTarget;
      nextTarget += 1;
      targetPages.set(handle, 0);
      return options.badTarget ?? handle;
    },
    FPDF_ImportPagesByIndex(targetHandle, srcHandle, pointer, length, index) {
      events.push(`import:${targetHandle}:${srcHandle}:${length}:${index}`);
      if (options.throwImport) throw new Error('import boom');
      const view = new DataView(heap.buffer, heap.byteOffset + pointer, length * 4);
      const order = [];
      for (let at = 0; at < length; at += 1) order.push(view.getInt32(at * 4, true));
      const callIndex = importCalls;
      importCalls += 1;
      imports.push({ target: targetHandle, order });
      targetPages.set(targetHandle, options.importedPages ?? length);
      if (options.importFalseOnCall === callIndex) return 0;
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
      const callIndex = saveCalls;
      saveCalls += 1;
      if (options.saveFalseOnCall === callIndex) return 0;
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
    bytes: overrides.bytes ?? bytes(),
    wasmBinary: overrides.wasmBinary ?? wasm(),
    initPdfium: overrides.initPdfium ?? (async () => fakeRuntime().module),
    pageRanges: overrides.pageRanges ?? [[0, 1], [2]],
  };
}

test('split module exposes only the bounded runtime surface', () => {
  const runtime = require('../src/pdf/browser/pdf-split-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['splitPdfDocumentWithLocalWasm', 'SPLIT_RESOURCE_BUDGETS']);
  assert.equal(typeof splitPdfDocumentWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(SPLIT_RESOURCE_BUDGETS, { maxInputBytes: 67108864, maxOutputBytes: 67108864, maxRanges: 32 });
  assert.equal(Object.isFrozen(SPLIT_RESOURCE_BUDGETS), true);
});

test('invalid options fail before any runtime effect', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  const base = { bytes: bytes(), wasmBinary: wasm(), initPdfium, pageRanges: [[0, 1], [2]] };
  const invalid = [
    { ...base, bytes: new Uint8Array() },
    { ...base, wasmBinary: new Uint8Array() },
    { ...base, initPdfium: null },
    { ...base, pageRanges: null },
    { ...base, pageRanges: 'x' },
    { ...base, pageRanges: [] },
    { ...base, pageRanges: [[]] },
    { ...base, pageRanges: [[0, -1]] },
    { ...base, pageRanges: [[1.5]] },
    { ...base, pageRanges: [['0']] },
    { ...base, extra: 1 },
    { bytes: base.bytes, wasmBinary: base.wasmBinary, initPdfium },
  ];
  for (const options of invalid) {
    await assert.rejects(splitPdfDocumentWithLocalWasm(options), TypeError);
  }
  await assert.rejects(splitPdfDocumentWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('proxy and accessor ranges fail without invoking caller code', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  await assert.rejects(
    splitPdfDocumentWithLocalWasm({ bytes: bytes(), wasmBinary: wasm(), initPdfium, pageRanges: new Proxy([[]], {}) }),
    TypeError,
  );
  let getterCalls = 0;
  const inner = [0, 1];
  Object.defineProperty(inner, '0', { enumerable: true, get() { getterCalls += 1; return 0; } });
  await assert.rejects(
    splitPdfDocumentWithLocalWasm({ bytes: bytes(), wasmBinary: wasm(), initPdfium, pageRanges: [inner] }),
    TypeError,
  );
  assert.equal(getterCalls, 0);
  assert.equal(initCalls, 0);
});

test('successful split produces one frozen output per range in order', async () => {
  const runtime = fakeRuntime({ savedBytes: [4, 4] });
  const result = await splitPdfDocumentWithLocalWasm({
    bytes: bytes(),
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
    pageRanges: [[0, 1], [2]],
  });
  assert.deepEqual(runtime.imports().map((entry) => [entry.target, entry.order]), [[501, [0, 1]], [502, [2]]]);
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
    'writer-data:201:114:2',
    'close-writer:201',
    'create-target',
    'import:502:71:1:0',
    'page-count:502',
    'signature-count:502',
    'open-writer',
    'save:502:201',
    'writer-size:201',
    'writer-data:201:154:2',
    'close-writer:201',
    'close:502',
    'close:501',
    'close:71',
    'destroy',
  ]);
  assert.equal(result.succeeded, true);
  assert.equal(result.pageCount, 3);
  assert.equal(result.outputs.length, 2);
  assert.equal(Object.isFrozen(result.outputs), true);
  assert.deepEqual(result.outputs[0].pageIndices, [0, 1]);
  assert.deepEqual(result.outputs[1].pageIndices, [2]);
  assert.equal(Object.isFrozen(result.outputs[0]), true);
  assert.deepEqual(Array.from(result.outputs[0].outputBytes), [4, 4]);
  assert.deepEqual(Array.from(result.outputs[1].outputBytes), [4, 4]);
});

test('invalid ranges fail before any import', async () => {
  const cases = [
    [[[0, 0]], /distinct in-range/],
    [[[0, 9]], /distinct in-range/],
    [[[0, 1, 2, 3]], /at least one in-range/],
  ];
  for (const [pageRanges, pattern] of cases) {
    const runtime = fakeRuntime({ pageCount: 3 });
    await assert.rejects(
      splitPdfDocumentWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module, pageRanges })),
      pattern,
    );
    assert.equal(runtime.events.some((event) => event.startsWith('import:')), false);
  }
});

test('mid-list range failure publishes zero outputs and closes everything', async () => {
  const runtime = fakeRuntime({ importFalseOnCall: 1 });
  const error = await splitPdfDocumentWithLocalWasm(
    optionsFor({ initPdfium: async () => runtime.module, pageRanges: [[0], [1], [2]] }),
  ).then(() => null, (failure) => failure);
  assert.ok(error instanceof Error);
  assert.match(error.message, /page import did not complete \(range 1\)/);
  assert.ok(runtime.events.includes('close:501'));
  assert.ok(runtime.events.includes('close:502'));
  assert.equal(runtime.events.includes('close:503'), false);
  assert.ok(runtime.events.includes('close:71'));
  assert.ok(runtime.events.includes('destroy'));
  const saving = fakeRuntime({ saveFalseOnCall: 1 });
  await assert.rejects(
    splitPdfDocumentWithLocalWasm(
      optionsFor({ initPdfium: async () => saving.module, pageRanges: [[0], [1]] }),
    ),
    /save did not complete \(range 1\)/,
  );
});

test('unopenable input and budget failures publish nothing', async () => {
  const closed = fakeRuntime({ rejectOpen: true, lastError: 3 });
  await assert.rejects(
    splitPdfDocumentWithLocalWasm(optionsFor({ initPdfium: async () => closed.module })),
    /could not open the input document \(last-error 3\)/,
  );
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  await assert.rejects(
    splitPdfDocumentWithLocalWasm(optionsFor({ bytes: new Uint8Array(67108865), initPdfium })),
    /exceeds the split resource budget/,
  );
  assert.equal(initCalls, 0);
  const oversize = fakeRuntime({ writerSize: 67108865 });
  await assert.rejects(
    splitPdfDocumentWithLocalWasm(optionsFor({ initPdfium: async () => oversize.module })),
    /exceeds the split resource budget \(range 0\)/,
  );
});

test('cleanup aggregates and caller mutation fails closed', async () => {
  const failing = fakeRuntime({ pageCount: 2, throwClose: true, throwDestroy: true });
  const error = await splitPdfDocumentWithLocalWasm(
    optionsFor({ initPdfium: async () => failing.module, pageRanges: [[0, 4]] }),
  ).then(() => null, (failure) => failure);
  assert.ok(error instanceof AggregateError);
  assert.match(error.errors[0].message, /distinct in-range/);
  const input = bytes();
  const runtime = fakeRuntime();
  const error2 = await splitPdfDocumentWithLocalWasm({
    bytes: input,
    wasmBinary: wasm(),
    initPdfium: async () => { input[0] = 0x00; return runtime.module; },
    pageRanges: [[0, 1], [2]],
  }).then(() => null, (failure) => failure);
  assert.ok(error2 instanceof AggregateError);
  assert.ok(error2.errors.some((entry) => /source bytes changed/.test(entry.message)));
});

test('split source imports only the allowlisted single import path', () => {
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

async function outputTexts(outputs, wasmBinary, initPdfium) {
  const texts = [];
  for (const output of outputs) {
    const perPage = [];
    for (let pageIndex = 0; pageIndex < output.pageCount; pageIndex += 1) {
      const extracted = await extractPdfPageTextWithLocalWasm({
        bytes: output.outputBytes, wasmBinary, initPdfium, pageIndex, maxChars: 100,
      });
      assert.equal(extracted.openSucceeded, true);
      perPage.push(extracted.text);
    }
    texts.push(perPage);
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

test('real split produces independently valid outputs in range order', async () => {
  const wasmBinary = realWasmBinary();
  const input = new Uint8Array(fs.readFileSync(ORDER_FIXTURE));
  const inputBefore = Buffer.from(input);
  const result = await splitPdfDocumentWithLocalWasm({
    bytes: input, wasmBinary, initPdfium: realInitPdfium(), pageRanges: [[0, 1], [2]],
  });
  assert.equal(result.succeeded, true);
  assert.equal(result.pageCount, 3);
  assert.equal(result.signatureStructurePresent, false);
  assert.equal(result.outputs.length, 2);
  assert.deepEqual(result.outputs[0].pageIndices, [0, 1]);
  assert.deepEqual(result.outputs[1].pageIndices, [2]);
  assert.notEqual(result.outputs[0].outputDigest.value, result.inputDigest.value);
  assert.notEqual(result.outputs[1].outputDigest.value, result.inputDigest.value);
  assert.deepEqual(Buffer.from(input), inputBefore);
  assert.deepEqual(await outputTexts(result.outputs, realWasmBinary(), realInitPdfium()),
    [['page-alpha', 'page-beta'], ['page-gamma']]);
  for (const output of result.outputs) {
    const inspection = await inspectPdfWithLocalWasm({
      bytes: output.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    });
    assert.equal(inspection.openSucceeded, true);
    assert.equal(inspection.pageCount, output.pageCount);
  }
  const rendered = await renderPdfPageWithLocalWasm({
    bytes: result.outputs[1].outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, maxPixels: 40000,
  });
  assert.equal(rendered.openSucceeded, true);
});

test('real reversed and overlapping ranges validate independently', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDER_FIXTURE));
  const reversed = await splitPdfDocumentWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageRanges: [[2], [0]],
  });
  assert.deepEqual(await outputTexts(reversed.outputs, realWasmBinary(), realInitPdfium()),
    [['page-gamma'], ['page-alpha']]);
  const overlapping = await splitPdfDocumentWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageRanges: [[0, 1], [1, 2]],
  });
  assert.deepEqual(await outputTexts(overlapping.outputs, realWasmBinary(), realInitPdfium()),
    [['page-alpha', 'page-beta'], ['page-beta', 'page-gamma']]);
  const single = await splitPdfDocumentWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageRanges: [[1]],
  });
  assert.equal(single.outputs.length, 1);
  assert.deepEqual(await outputTexts(single.outputs, realWasmBinary(), realInitPdfium()), [['page-beta']]);
});

test('real single splits on ordinary, signed, and active fixtures', async () => {
  const ordinary = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const ordinarySplit = await splitPdfDocumentWithLocalWasm({
    bytes: ordinary, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageRanges: [[0]],
  });
  assert.equal(ordinarySplit.outputs.length, 1);
  assert.equal(ordinarySplit.outputs[0].pageCount, 1);
  const signed = new Uint8Array(fs.readFileSync(SIGNED_FIXTURE));
  const signedSplit = await splitPdfDocumentWithLocalWasm({
    bytes: signed, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageRanges: [[0]],
  });
  assert.equal(signedSplit.signatureStructurePresent, true);
  assert.equal(signedSplit.signatureCount, 1);
  assert.equal(signedSplit.outputs[0].outputSignatureCount, 0);
  assert.equal('signaturePreserved' in signedSplit, false);
  assert.equal('signatureValid' in signedSplit, false);
  const active = new Uint8Array(fs.readFileSync(ACTIVE_CONTENT_FIXTURE));
  const activeBefore = Buffer.from(active);
  const activeSplit = await splitPdfDocumentWithLocalWasm({
    bytes: active, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageRanges: [[0]],
  });
  assert.equal(activeSplit.outputs[0].pageCount, 1);
  assert.deepEqual(Buffer.from(active), activeBefore);
  const inspection = await inspectPdfWithLocalWasm({
    bytes: activeSplit.outputs[0].outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
});

test('real invalid inputs and ranges fail with zero outputs', async () => {
  const ordinary = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(
    splitPdfDocumentWithLocalWasm({
      bytes: truncated, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageRanges: [[0]],
    }),
    Error,
  );
  await assert.rejects(
    splitPdfDocumentWithLocalWasm({
      bytes: nonPdf, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageRanges: [[0]],
    }),
    Error,
  );
  for (const pageRanges of [[[0, 0]], [[]], [[0, 5]]]) {
    await assert.rejects(
      splitPdfDocumentWithLocalWasm({
        bytes: ordinary, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageRanges,
      }),
      /distinct in-range|at least one in-range|non-empty array/,
    );
  }
});
