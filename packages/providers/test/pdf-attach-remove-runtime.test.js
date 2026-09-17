'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  removePdfAttachmentWithLocalWasm,
  ATTACH_REMOVE_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-attach-remove-runtime');
const {
  addPdfAttachmentWithLocalWasm,
} = require('../src/pdf/browser/pdf-attach-add-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-attach-remove-runtime.js');
const ORDINARY_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/ordinary-minimal.pdf');
const TRUNCATED_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/truncated-pdf-like.pdf');
const NONPDF_FIXTURE = path.join(REPO_ROOT, 'specs/004-local-pdf-core/fixtures/admission/declared-pdf-nonpdf.bin');
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
  const savedBytes = Uint8Array.from(options.savedBytes ?? [0x25, 0x50, 0x44, 0x46, 0x2d]);
  const writers = new Map();
  let count = options.attachmentCount ?? 1;
  const names = options.names ?? ['note.txt'];
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
      return options.badDocument ?? 71;
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
    FPDFDoc_GetAttachmentCount(handle) {
      events.push(`attach-count:${handle}`);
      if (options.throwCount) throw new Error('count boom');
      if (options.countAfterDelete !== undefined && events.some((event) => event.startsWith('delete:'))) {
        return options.countAfterDelete;
      }
      return count;
    },
    FPDFDoc_GetAttachment(handle, index) {
      events.push(`get-attach:${handle}:${index}`);
      if (options.throwGetAttachment) throw new Error('get attachment boom');
      return options.badEntry ?? 601;
    },
    FPDFAttachment_GetName(handle, pointer, length) {
      events.push(`get-name:${handle}:${length}`);
      if (options.throwGetName) throw new Error('get name boom');
      if (options.badNameLength !== undefined) return options.badNameLength;
      const encoded = Buffer.from(`${names[0]}\0`, 'utf8');
      heap.set(encoded.subarray(0, length), pointer);
      return options.nameLength ?? encoded.length;
    },
    FPDFDoc_DeleteAttachment(handle, index) {
      events.push(`delete:${handle}:${index}`);
      if (options.throwDelete) throw new Error('delete boom');
      if (options.deleteFalse) return 0;
      count -= 1;
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
    attachmentIndex: overrides.attachmentIndex ?? 0,
  };
}

test('attach-remove module exposes only the bounded runtime surface', () => {
  const runtime = require('../src/pdf/browser/pdf-attach-remove-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['removePdfAttachmentWithLocalWasm', 'ATTACH_REMOVE_RESOURCE_BUDGETS']);
  assert.equal(typeof removePdfAttachmentWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(ATTACH_REMOVE_RESOURCE_BUDGETS, {
    maxInputBytes: 67108864, maxOutputBytes: 67108864, maxNameBytes: 4096,
  });
  assert.equal(Object.isFrozen(ATTACH_REMOVE_RESOURCE_BUDGETS), true);
});

test('invalid options fail before any runtime effect', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  const base = optionsFor({ initPdfium });
  const invalid = [
    { ...base, bytes: new Uint8Array() },
    { ...base, wasmBinary: new Uint8Array() },
    { ...base, initPdfium: null },
    { ...base, attachmentIndex: -1 },
    { ...base, attachmentIndex: 1.5 },
    { ...base, attachmentIndex: '0' },
    { ...base, extra: 1 },
    { bytes: base.bytes, wasmBinary: base.wasmBinary, initPdfium },
  ];
  for (const options of invalid) {
    await assert.rejects(removePdfAttachmentWithLocalWasm(options), TypeError);
  }
  await assert.rejects(removePdfAttachmentWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('successful removal follows the lifecycle and re-reads the count', async () => {
  const runtime = fakeRuntime({ savedBytes: [3, 3, 3] });
  const result = await removePdfAttachmentWithLocalWasm({
    bytes: bytes(),
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
    attachmentIndex: 0,
  });
  const order = runtime.events.filter((event) => !event.startsWith('malloc:') && !event.startsWith('free:'));
  assert.deepEqual(order, [
    'library-init',
    'open:64:8:',
    'signature-count:71',
    'page-count:71',
    'attach-count:71',
    'get-attach:71:0',
    'get-name:601:4096',
    'delete:71:0',
    'attach-count:71',
    'open-writer',
    'save:71:201',
    'writer-size:201',
    'writer-data:201:4202:3',
    'close-writer:201',
    'close:71',
    'destroy',
  ]);
  assert.equal(result.succeeded, true);
  assert.equal(result.attachmentIndex, 0);
  assert.equal(result.removedName, 'note.txt');
  assert.equal(result.attachmentCountBefore, 1);
  assert.equal(result.attachmentCountAfter, 0);
  assert.equal(result.pageCount, 1);
  assert.deepEqual(Array.from(result.outputBytes), [3, 3, 3]);
});

test('gate and step failures publish nothing with full cleanup', async () => {
  const signed = fakeRuntime({ signatureCount: 1 });
  await assert.rejects(
    removePdfAttachmentWithLocalWasm(optionsFor({ initPdfium: async () => signed.module })),
    /not attachment targets/,
  );
  assert.equal(signed.events.some((event) => event.startsWith('attach-count')), false);
  const empty = fakeRuntime({ attachmentCount: 0 });
  await assert.rejects(
    removePdfAttachmentWithLocalWasm(optionsFor({ initPdfium: async () => empty.module })),
    /out of range/,
  );
  assert.equal(empty.events.some((event) => event.startsWith('delete:')), false);
  for (const mode of ['throwDelete', 'deleteFalse', 'saveFalse']) {
    const runtime = fakeRuntime({ [mode]: true });
    await assert.rejects(
      removePdfAttachmentWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
      /did not complete|delete boom/,
    );
    assert.ok(runtime.events.includes('close:71'));
    assert.ok(runtime.events.includes('destroy'));
  }
  const staleCount = fakeRuntime({ countAfterDelete: 1 });
  await assert.rejects(
    removePdfAttachmentWithLocalWasm(optionsFor({ initPdfium: async () => staleCount.module })),
    /did not decrease by exactly one/,
  );
  const badName = fakeRuntime({ badNameLength: 0 });
  await assert.rejects(
    removePdfAttachmentWithLocalWasm(optionsFor({ initPdfium: async () => badName.module })),
    /name is unreadable/,
  );
});

test('input and output budgets fail closed with exact diagnostics', async () => {
  const big = new Uint8Array(64 * 1024 * 1024 + 1);
  await assert.rejects(
    removePdfAttachmentWithLocalWasm(optionsFor({ bytes: big })),
    /exceeds the attach-remove resource budget/,
  );
  const runtime = fakeRuntime({ writerSize: 64 * 1024 * 1024 + 1, savedBytes: [1] });
  await assert.rejects(
    removePdfAttachmentWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /exceeds the attach-remove resource budget/,
  );
  assert.ok(runtime.events.includes('close:71'));
});

test('mid-run caller mutation of bytes or wasm fails closed', async () => {
  for (const key of ['bytes', 'wasmBinary']) {
    const runtime = fakeRuntime();
    const options = optionsFor({ initPdfium: async () => runtime.module });
    const original = options[key];
    const probe = removePdfAttachmentWithLocalWasm(options);
    original[0] = original[0] ^ 0xff;
    const error = await probe.then(() => null, (failure) => failure);
    assert.ok(error instanceof AggregateError);
    assert.ok(error.errors.some((entry) => /changed during PDFium attachment removal/.test(entry.message)));
  }
});

test('initializer replacing runtime WASM bytes fails closed', async () => {
  const runtime = fakeRuntime();
  await assert.rejects(
    removePdfAttachmentWithLocalWasm(optionsFor({
      initPdfium: async (initOptions) => {
        initOptions.wasmBinary = Uint8Array.from([9, 9, 9]);
        return runtime.module;
      },
    })),
    /replaced runtime WASM bytes/,
  );
});

test('runtime source exposes no network, worker, or subprocess surface', () => {
  const source = fs.readFileSync(SOURCE_PATH, 'utf8');
  assert.equal((source.match(/await initPdfium\(/g) || []).length, 1);
  assert.doesNotMatch(source, /child_process|setTimeout\(|setInterval\(|Worker\(/);
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|WebSocket|node:net|node:http|node:dns/);
  assert.doesNotMatch(source, /FPDFAction_|DoJSAction|JavaScript|SubmitForm|Launch/);
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

async function attachmentCensus(outputBytes) {
  const { init } = require('@embedpdf/pdfium');
  const wasmBinary = realWasmBinary();
  const module = await init({ wasmBinary });
  module.PDFiumExt_Init();
  const heap = module.pdfium.HEAPU8;
  const data = module.pdfium.wasmExports.malloc(outputBytes.byteLength);
  heap.set(outputBytes, data);
  const doc = module.FPDF_LoadMemDocument(data, outputBytes.byteLength, '');
  const count = module.FPDFDoc_GetAttachmentCount(doc);
  const names = [];
  for (let index = 0; index < count; index += 1) {
    const handle = module.FPDFDoc_GetAttachment(doc, index);
    const nameBuffer = module.pdfium.wasmExports.malloc(4096);
    const nameLength = module.FPDFAttachment_GetName(handle, nameBuffer, 4096);
    names.push(Buffer.from(heap.slice(nameBuffer, nameBuffer + Math.min(nameLength, 256))).toString('utf8').replace(/\0/g, ''));
    module.pdfium.wasmExports.free(nameBuffer);
  }
  module.FPDF_CloseDocument(doc);
  module.pdfium.wasmExports.free(data);
  module.FPDF_DestroyLibrary();
  return { count, names };
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

test('real add-then-remove scaffold drops the census 1->0 with name proof', async () => {
  // Test-side scaffolding only: the qualified add runtime builds the input;
  // the independent proof is the reopen census. No product composition claimed.
  const ordinary = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const added = await addPdfAttachmentWithLocalWasm({
    bytes: ordinary, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    name: 'gone.txt', content: Uint8Array.from([9, 9, 9]),
  });
  assert.equal((await attachmentCensus(added.outputBytes)).count, 1);
  let initCalls = 0;
  const initPdfium = async (options) => { initCalls += 1; return realInitPdfium()(options); };
  const result = await removePdfAttachmentWithLocalWasm({
    bytes: added.outputBytes, wasmBinary: realWasmBinary(), initPdfium, attachmentIndex: 0,
  });
  assert.equal(initCalls, 1);
  assert.equal(result.succeeded, true);
  assert.equal(result.removedName, 'gone.txt');
  assert.equal(result.attachmentCountBefore, 1);
  assert.equal(result.attachmentCountAfter, 0);
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
  const census = await attachmentCensus(result.outputBytes);
  assert.equal(census.count, 0);
  assert.deepEqual(census.names, []);
  const extracted = await extractPdfPageTextWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, maxChars: 500,
  });
  assert.equal(extracted.openSucceeded, true);
  const inspection = await inspectPdfWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
  });
  assert.equal(inspection.openSucceeded, true);
  assert.equal(inspection.pageCount, 1);
  const rendered = await renderPdfPageWithLocalWasm({
    bytes: result.outputBytes, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), pageIndex: 0, maxPixels: 40000,
  });
  assert.equal(rendered.openSucceeded, true);
});

test('real signed refusal, empty-table range, and invalid inputs fail closed', async () => {
  const signed = new Uint8Array(fs.readFileSync(SIGNED_FIXTURE));
  const signedBefore = Buffer.from(signed);
  await assert.rejects(removePdfAttachmentWithLocalWasm({
    bytes: signed, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), attachmentIndex: 0,
  }), /not attachment targets/);
  assert.deepEqual(Buffer.from(signed), signedBefore);
  const ordinary = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  await assert.rejects(removePdfAttachmentWithLocalWasm({
    bytes: ordinary, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), attachmentIndex: 0,
  }), /out of range/);
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  await assert.rejects(removePdfAttachmentWithLocalWasm({
    bytes: truncated, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), attachmentIndex: 0,
  }), Error);
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(removePdfAttachmentWithLocalWasm({
    bytes: nonPdf, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(), attachmentIndex: 0,
  }), Error);
});
