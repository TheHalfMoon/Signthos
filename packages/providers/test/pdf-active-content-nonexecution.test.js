'use strict';

// PDF_ACTIVE_CONTENT_NONEXECUTION_V1_QUALIFICATION (Issue #7; authority:
// bounded qualification-only reconciliation after PR #272, plus the
// synthetic-fixture generator embedded in that reconciliation).
// Drives all six local-WASM read runtimes against the synthetic hostile
// fixture admission-seed-active-content-synthetic-v1 (document JavaScript
// action, OpenAction JavaScript, URI link annotation; 922 bytes, SHA-256
// a484ff08...) and proves default-deny: deterministic completion, bounded
// wall-clock, caller-bytes immutability, and no network/action-execution
// surface anywhere in the exercised path. No runtime behavior changes.

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { inspectPdfWithLocalWasm } = require('../src/pdf/browser/pdf-inspect-runtime');
const { renderPdfPageWithLocalWasm } = require('../src/pdf/browser/pdf-render-runtime');
const { renderPdfThumbnailWithLocalWasm } = require('../src/pdf/browser/pdf-render-thumbnail-runtime');
const { extractPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-runtime');
const { selectPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-select-runtime');
const { searchPdfPageTextWithLocalWasm } = require('../src/pdf/browser/pdf-text-search-runtime');
const { readPdfMetadataWithLocalWasm } = require('../src/pdf/browser/pdf-metadata-runtime');

const root = path.resolve(__dirname, '../../..');
const fixtureRoot = path.join(root, 'specs/004-local-pdf-core/fixtures/admission');
const manifest = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'manifest.json'), 'utf8'));
const fixture = manifest.records.find((item) => item.fixtureId === 'admission-seed-active-content-synthetic-v1');
assert.ok(fixture, 'missing active-content synthetic admission fixture');

const EXPECTED_FIXTURE_SHA256 = 'a484ff080c95b6acde6d3bdfa5689d2922574f43634b3ce3336bc9904f3f732a';
const EXPECTED_FIXTURE_BYTES = 922;
const EXPECTED_WASM_SHA256 = 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8';
const TIME_BUDGET_MS = 5000;

function sha256(bytes) { return crypto.createHash('sha256').update(bytes).digest('hex'); }
function exactPackagePaths() { const mainPath = require.resolve('@embedpdf/pdfium'); const packageRoot = path.resolve(path.dirname(mainPath), '..'); return { packageJson: path.join(packageRoot, 'package.json'), wasm: path.join(packageRoot, 'dist/pdfium.wasm') }; }
const { wasm: REAL_WASM_PATH } = exactPackagePaths();
const REAL_WASM_BYTES = fs.readFileSync(REAL_WASM_PATH);
assert.equal(sha256(REAL_WASM_BYTES), EXPECTED_WASM_SHA256, 'unexpected exact local PDFium WASM identity');
function bytesForFixture() { return fs.readFileSync(path.join(root, fixture.repositoryPath)); }
function realInitPdfium() { return require(require.resolve('@embedpdf/pdfium')).init; }
function baseOptions(overrides = {}) { return { bytes: overrides.bytes ?? bytesForFixture(), wasmBinary: overrides.wasmBinary ?? Buffer.from(REAL_WASM_BYTES), initPdfium: overrides.initPdfium ?? realInitPdfium() }; }
async function timedCall(label, call) { let timer = null; try { return await Promise.race([call(), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded the no-hang budget: ${TIME_BUDGET_MS}ms`)), TIME_BUDGET_MS); })]); } finally { if (timer !== null) clearTimeout(timer); } }
function assertBytesUnchanged(before, after, label) { assert.deepEqual(after, before, `${label} mutated caller bytes`); }

test('hostile fixture identity binds manifest bytes exactly', () => { const bytes = bytesForFixture(); assert.equal(bytes.length, EXPECTED_FIXTURE_BYTES); assert.equal(sha256(bytes), EXPECTED_FIXTURE_SHA256); assert.equal(fixture.exactBytesDigest.value, EXPECTED_FIXTURE_SHA256); assert.equal(fixture.byteLength, EXPECTED_FIXTURE_BYTES); assert.equal(fixture.constructionClass, 'SIGNTHOS_AUTHORED_SYNTHETIC'); const raw = Buffer.from(bytes).toString('latin1'); assert.ok(raw.includes('/JavaScript')); assert.ok(raw.includes('/OpenAction')); assert.ok(raw.includes('example.invalid/active-probe')); });
test('hostile fixture carries a real document JavaScript action', async () => { const init = realInitPdfium(); const runtime = await init({ wasmBinary: Buffer.from(REAL_WASM_BYTES) }); runtime.PDFiumExt_Init(); const heap = runtime.pdfium.HEAPU8; const bytes = bytesForFixture(); const docPtr = runtime.pdfium.wasmExports.malloc(bytes.length); heap.set(bytes, docPtr); const doc = runtime.FPDF_LoadMemDocument(docPtr, bytes.length, ''); assert.ok(doc !== 0); assert.equal(runtime.FPDFDoc_GetJavaScriptActionCount(doc), 1); runtime.FPDF_CloseDocument(doc); runtime.pdfium.wasmExports.free(docPtr); runtime.FPDF_DestroyLibrary(); });
test('no runtime source exposes network or action-execution surface', () => { const files = ['pdf-inspect-runtime.js', 'pdf-render-runtime.js', 'pdf-render-thumbnail-runtime.js', 'pdf-text-runtime.js', 'pdf-text-select-runtime.js', 'pdf-text-search-runtime.js', 'pdf-metadata-runtime.js']; const forbidden = [/require\(['"]@embedpdf\/pdfium['"]\)/, /\bfetch\s*\(/, /XMLHttpRequest/, /WebSocket/, /\bWorker\s*\(/, /importScripts/, /child_process/, /node:fs/, /node:path/, /node:net/, /node:http/, /node:https/, /node:dns/, /node:dgram/, /node:tls/, /readFileSync/, /FPDFAction_/, /DoJSAction/, /JavaScriptAction/, /GetJavaScriptAction/, /GetAction/, /GetFormAdditionalAction/, /\/Launch/, /\/URI/, /SubmitForm/, /execMenuItem/]; for (const file of files) { const source = fs.readFileSync(path.join(root, 'packages/providers/src/pdf/browser', file), 'utf8'); assert.equal(source.match(/await initPdfium\(/g).length, 1, `${file} must keep a single init call site`); for (const pattern of forbidden) assert.doesNotMatch(source, pattern, `${file} exposes forbidden surface ${pattern}`); } });
test('inspect completes on hostile bytes without execution', async () => { const bytes = bytesForFixture(); const before = Buffer.from(bytes); const result = await timedCall('inspect', () => inspectPdfWithLocalWasm(baseOptions({ bytes }))); assert.equal(result.openSucceeded, true); assert.equal(result.pageCount, 1); assertBytesUnchanged(before, bytes, 'inspect'); });
test('page render completes on hostile bytes without execution', async () => { const bytes = bytesForFixture(); const before = Buffer.from(bytes); const result = await timedCall('render', () => renderPdfPageWithLocalWasm({ ...baseOptions({ bytes }), pageIndex: 0, maxPixels: 1 << 24 })); assert.equal(result.openSucceeded, true); assert.equal(result.pageCount, 1); assert.ok(result.width >= 1 && result.height >= 1); assert.equal(result.pixels.length, result.stride * result.height); assertBytesUnchanged(before, bytes, 'render'); });
test('thumbnail render completes on hostile bytes without execution', async () => { const bytes = bytesForFixture(); const before = Buffer.from(bytes); const result = await timedCall('thumbnail', () => renderPdfThumbnailWithLocalWasm({ ...baseOptions({ bytes }), pageIndex: 0, maxPixels: 1 << 24, thumbMaxDimension: 64 })); assert.equal(result.openSucceeded, true); assert.equal(result.pageCount, 1); assert.ok(result.width >= 1 && result.height >= 1); assertBytesUnchanged(before, bytes, 'thumbnail'); });
test('text extraction completes on hostile bytes without execution', async () => { const bytes = bytesForFixture(); const before = Buffer.from(bytes); const result = await timedCall('extract', () => extractPdfPageTextWithLocalWasm({ ...baseOptions({ bytes }), pageIndex: 0, maxChars: 1000 })); assert.equal(result.openSucceeded, true); assert.equal(result.charCount, 8); assert.equal(result.text, 'Signthos'); assertBytesUnchanged(before, bytes, 'extract'); });
test('text selection completes on hostile bytes without execution', async () => { const bytes = bytesForFixture(); const before = Buffer.from(bytes); const result = await timedCall('select', () => selectPdfPageTextWithLocalWasm({ ...baseOptions({ bytes }), pageIndex: 0, startIndex: 0, selectCount: 8, maxRects: 16 })); assert.equal(result.openSucceeded, true); assert.equal(result.text, 'Signthos'); assert.equal(result.rectCount, 1); assertBytesUnchanged(before, bytes, 'select'); });
test('text search completes on hostile bytes without execution', async () => { const bytes = bytesForFixture(); const before = Buffer.from(bytes); const result = await timedCall('search', () => searchPdfPageTextWithLocalWasm({ ...baseOptions({ bytes }), pageIndex: 0, query: 'Sign', maxMatches: 16 })); assert.equal(result.openSucceeded, true); assert.deepEqual(result.matches, [{ index: 0, length: 4 }]); assertBytesUnchanged(before, bytes, 'search'); });
test('metadata read completes on hostile bytes without execution', async () => { const bytes = bytesForFixture(); const before = Buffer.from(bytes); const result = await timedCall('metadata', () => readPdfMetadataWithLocalWasm(baseOptions({ bytes }))); assert.equal(result.openSucceeded, true); assert.deepEqual(result.metadata, { title: null, author: null, subject: null, keywords: null, creator: null, producer: null, creationDate: null, modDate: null }); assertBytesUnchanged(before, bytes, 'metadata'); });
