'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const zlib = require('node:zlib');

const {
  addPdfAttachmentWithLocalWasm,
  ATTACH_ADD_RESOURCE_BUDGETS,
} = require('../src/pdf/browser/pdf-attach-add-runtime');
const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SOURCE_PATH = path.join(__dirname, '../src/pdf/browser/pdf-attach-add-runtime.js');
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
  let addedName = null;
  let storedContent = null;
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
    FPDFDoc_AddAttachment(handle, namePointer) {
      const bytes = [];
      for (let at = 0; ; at += 1) {
        const byte = heap[namePointer + at];
        if (byte === 0) break;
        bytes.push(byte);
        if (bytes.length > 200) break;
      }
      addedName = Buffer.from(bytes).toString('utf8');
      events.push(`add-attach:${handle}:${addedName}`);
      if (options.throwAdd) throw new Error('add boom');
      return options.badAttachment ?? 501;
    },
    FPDFAttachment_SetFile(handle, doc, pointer, length) {
      events.push(`set-file:${handle}:${doc}:${length}`);
      if (options.throwSetFile) throw new Error('set file boom');
      storedContent = Array.from(heap.slice(pointer, pointer + length));
      if (options.setFileFalse) return 0;
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
  return {
    module, events, heap, added: () => addedName, stored: () => storedContent,
  };
}

function bytes() {
  return Uint8Array.from([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]);
}

function wasm() {
  return Uint8Array.from([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]);
}

function content() {
  return Uint8Array.from([65, 66, 67, 49, 50, 51]);
}

function optionsFor(overrides = {}) {
  return {
    bytes: overrides.bytes ?? bytes(),
    wasmBinary: overrides.wasmBinary ?? wasm(),
    initPdfium: overrides.initPdfium ?? (async () => fakeRuntime().module),
    name: overrides.name ?? 'note.txt',
    content: overrides.content ?? content(),
  };
}

test('attach-add module exposes only the bounded runtime surface', () => {
  const runtime = require('../src/pdf/browser/pdf-attach-add-runtime');
  assert.deepEqual(Reflect.ownKeys(runtime), ['addPdfAttachmentWithLocalWasm', 'ATTACH_ADD_RESOURCE_BUDGETS']);
  assert.equal(typeof addPdfAttachmentWithLocalWasm, 'function');
  assert.equal(Object.isFrozen(runtime), true);
  assert.deepEqual(ATTACH_ADD_RESOURCE_BUDGETS, {
    maxInputBytes: 67108864, maxOutputBytes: 67108864, maxNameChars: 128, maxContentBytes: 1048576,
  });
  assert.equal(Object.isFrozen(ATTACH_ADD_RESOURCE_BUDGETS), true);
});

test('invalid options fail before any runtime effect', async () => {
  let initCalls = 0;
  const initPdfium = async () => { initCalls += 1; throw new Error('runtime must not start'); };
  const base = optionsFor({ initPdfium });
  const invalid = [
    { ...base, bytes: new Uint8Array() },
    { ...base, wasmBinary: new Uint8Array() },
    { ...base, initPdfium: null },
    { ...base, name: '' },
    { ...base, name: 'x'.repeat(129) },
    { ...base, name: 'caf\u00e9.txt' },
    { ...base, name: 'a/b.txt' },
    { ...base, name: 'a\\b.txt' },
    { ...base, name: 42 },
    { ...base, content: new Uint8Array() },
    { ...base, content: 'ABC' },
    { ...base, extra: 1 },
    { bytes: base.bytes, wasmBinary: base.wasmBinary, initPdfium, name: 'a.txt' },
  ];
  for (const options of invalid) {
    await assert.rejects(addPdfAttachmentWithLocalWasm(options), TypeError);
  }
  await assert.rejects(addPdfAttachmentWithLocalWasm(new Proxy(base, {})), TypeError);
  assert.equal(initCalls, 0);
});

test('successful add follows the lifecycle with exact name and content', async () => {
  const runtime = fakeRuntime({ savedBytes: [3, 3, 3] });
  const result = await addPdfAttachmentWithLocalWasm({
    bytes: bytes(),
    wasmBinary: wasm(),
    initPdfium: async () => runtime.module,
    name: 'note.txt',
    content: content(),
  });
  assert.equal(runtime.added(), 'note.txt');
  assert.deepEqual(runtime.stored(), [65, 66, 67, 49, 50, 51]);
  const order = runtime.events.filter((event) => !event.startsWith('malloc:') && !event.startsWith('free:'));
  assert.deepEqual(order, [
    'library-init',
    'open:64:8:',
    'signature-count:71',
    'page-count:71',
    'add-attach:71:note.txt',
    'set-file:501:71:6',
    'signature-count:71',
    'open-writer',
    'save:71:201',
    'writer-size:201',
    'writer-data:201:138:3',
    'close-writer:201',
    'close:71',
    'destroy',
  ]);
  assert.equal(result.succeeded, true);
  assert.equal(result.fileName, 'note.txt');
  assert.equal(result.contentByteLength, 6);
  assert.equal(result.pageCount, 1);
  assert.equal(result.signatureCount, 0);
  assert.deepEqual(Array.from(result.outputBytes), [3, 3, 3]);
});

test('gate and step failures publish nothing with full cleanup', async () => {
  const signed = fakeRuntime({ signatureCount: 1 });
  await assert.rejects(
    addPdfAttachmentWithLocalWasm(optionsFor({ initPdfium: async () => signed.module })),
    /not attachment targets/,
  );
  assert.equal(signed.events.some((event) => event.startsWith('add-attach')), false);
  for (const mode of ['throwAdd', 'setFileFalse', 'saveFalse']) {
    const runtime = fakeRuntime({ [mode]: true });
    await assert.rejects(
      addPdfAttachmentWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
      /not accepted|add boom|did not complete/,
    );
    assert.ok(runtime.events.includes('close:71'));
    assert.ok(runtime.events.includes('destroy'));
  }
  const noWriter = fakeRuntime({ saveFalse: true });
  await assert.rejects(
    addPdfAttachmentWithLocalWasm(optionsFor({ initPdfium: async () => noWriter.module })),
    /did not complete/,
  );
  assert.equal(noWriter.events.some((event) => event.startsWith('writer-data')), false);
});

test('input and output budgets fail closed with exact diagnostics', async () => {
  const big = new Uint8Array(64 * 1024 * 1024 + 1);
  await assert.rejects(
    addPdfAttachmentWithLocalWasm(optionsFor({ bytes: big })),
    /exceeds the attach-add resource budget/,
  );
  const runtime = fakeRuntime({ writerSize: 64 * 1024 * 1024 + 1, savedBytes: [1] });
  await assert.rejects(
    addPdfAttachmentWithLocalWasm(optionsFor({ initPdfium: async () => runtime.module })),
    /exceeds the attach-add resource budget/,
  );
  assert.ok(runtime.events.includes('close:71'));
});

test('mid-run caller mutation of bytes, wasm, or content fails closed', async () => {
  for (const key of ['bytes', 'wasmBinary', 'content']) {
    const runtime = fakeRuntime();
    const options = optionsFor({ initPdfium: async () => runtime.module });
    const original = options[key];
    const probe = addPdfAttachmentWithLocalWasm(options);
    original[0] = original[0] ^ 0xff;
    const error = await probe.then(() => null, (failure) => failure);
    assert.ok(error instanceof AggregateError);
    assert.ok(error.errors.some((entry) => /changed during PDFium attachment add/.test(entry.message)));
  }
});

test('initializer replacing runtime WASM bytes fails closed', async () => {
  const runtime = fakeRuntime();
  await assert.rejects(
    addPdfAttachmentWithLocalWasm(optionsFor({
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
  const entries = [];
  for (let index = 0; index < count; index += 1) {
    const handle = module.FPDFDoc_GetAttachment(doc, index);
    const nameBuffer = module.pdfium.wasmExports.malloc(4096);
    const nameLength = module.FPDFAttachment_GetName(handle, nameBuffer, 4096);
    const fileBuffer = module.pdfium.wasmExports.malloc(4096);
    const outLength = module.pdfium.wasmExports.malloc(4);
    new DataView(heap.buffer, heap.byteOffset, heap.byteLength).setUint32(outLength, 0, true);
    const gotFile = module.FPDFAttachment_GetFile(handle, fileBuffer, 4096, outLength);
    const fileLength = new DataView(heap.buffer, heap.byteOffset, heap.byteLength).getUint32(outLength, true);
    entries.push({
      name: Buffer.from(heap.slice(nameBuffer, nameBuffer + Math.min(nameLength, 256))).toString('utf8').replace(/\0/g, ''),
      nameLength, gotFile, fileLength,
    });
    module.pdfium.wasmExports.free(nameBuffer);
    module.pdfium.wasmExports.free(fileBuffer);
    module.pdfium.wasmExports.free(outLength);
  }
  module.FPDF_CloseDocument(doc);
  module.pdfium.wasmExports.free(data);
  module.FPDF_DestroyLibrary();
  return { count, entries };
}

function inflatedStreams(outputBytes) {
  const latin = Buffer.from(outputBytes).toString('latin1');
  const found = [];
  const pattern = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let match = pattern.exec(latin);
  while (match) {
    const raw = Buffer.from(match[1], 'latin1');
    try {
      found.push(zlib.inflateSync(raw));
    } catch {
      found.push(raw);
    }
    match = pattern.exec(latin);
  }
  return found;
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

test('real add persists entry, name, length, and exact content bytes', async () => {
  const input = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const inputBefore = Buffer.from(input);
  const fileContent = Buffer.from('ATTACHMENT-BYTES-123', 'utf8');
  let initCalls = 0;
  const initPdfium = async (options) => { initCalls += 1; return realInitPdfium()(options); };
  const result = await addPdfAttachmentWithLocalWasm({
    bytes: input, wasmBinary: realWasmBinary(), initPdfium,
    name: 'note.txt', content: new Uint8Array(fileContent),
  });
  assert.equal(initCalls, 1);
  assert.equal(result.succeeded, true);
  assert.equal(result.fileName, 'note.txt');
  assert.equal(result.contentByteLength, 20);
  assert.equal(result.pageCount, 1);
  assert.equal(result.signatureCount, 0);
  assert.notEqual(result.outputDigest.value, result.inputDigest.value);
  assert.deepEqual(Buffer.from(input), inputBefore);
  const census = await attachmentCensus(result.outputBytes);
  assert.equal(census.count, 1);
  assert.equal(census.entries[0].name, 'note.txt');
  assert.equal(census.entries[0].fileLength, 20);
  const streams = inflatedStreams(result.outputBytes);
  assert.ok(streams.some((stream) => Buffer.from(stream).equals(fileContent)));
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

test('real signed refusal and invalid inputs fail closed', async () => {
  const signed = new Uint8Array(fs.readFileSync(SIGNED_FIXTURE));
  const signedBefore = Buffer.from(signed);
  await assert.rejects(addPdfAttachmentWithLocalWasm({
    bytes: signed, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    name: 'note.txt', content: content(),
  }), /not attachment targets/);
  assert.deepEqual(Buffer.from(signed), signedBefore);
  const ordinary = new Uint8Array(fs.readFileSync(ORDINARY_FIXTURE));
  const valid = {
    bytes: ordinary, wasmBinary: realWasmBinary(), initPdfium: realInitPdfium(),
    name: 'note.txt', content: content(),
  };
  const truncated = new Uint8Array(fs.readFileSync(TRUNCATED_FIXTURE));
  await assert.rejects(addPdfAttachmentWithLocalWasm({ ...valid, bytes: truncated }), Error);
  const nonPdf = new Uint8Array(fs.readFileSync(NONPDF_FIXTURE));
  await assert.rejects(addPdfAttachmentWithLocalWasm({ ...valid, bytes: nonPdf }), Error);
});
