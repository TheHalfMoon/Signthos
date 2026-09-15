'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { exactByteIdentity } = require('../src/content-identity-admission');
const { PDFIUM_PROVIDER } = require('../src/pdf/browser/pdfium-structural-evidence');
const {
  AVAILABILITY,
  CAPABILITY_REF,
  OUTCOME,
  PROVIDER_CAPABILITY_VERSION,
  PROVIDER_DESCRIPTOR,
  STABLE_ERROR,
  composePdfRenderResult,
} = require('../src/pdf/browser/pdf-render-provider');

const root = path.resolve(__dirname, '../../..');
const fixtureRoot = path.join(root, 'specs/004-local-pdf-core/fixtures/admission');
const manifest = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'manifest.json'), 'utf8'));

function record(id) {
  const value = manifest.records.find((item) => item.fixtureId === id);
  assert.ok(value, `missing fixture ${id}`);
  return value;
}

function bytesFor(item) {
  return fs.readFileSync(path.join(root, item.repositoryPath));
}

function requestFor(item, bytes = bytesFor(item), overrides = {}) {
  const identity = exactByteIdentity(bytes);
  return {
    operationId: `render:${item.fixtureId}`,
    capabilityRef: { ...CAPABILITY_REF },
    documentId: `document:${item.fixtureId}`,
    inputRevisionId: `revision:${item.fixtureId}`,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    inputByteLength: identity.byteLength,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    resourceBudgetRef: 'budget:pdf-render-v1:test',
    capabilityParameters: { pageIndex: 0, maxPixels: 40000 },
    ...overrides,
  };
}

function successEvidence({ pageIndex = 0, pageCount = 1, width = 2, height = 2 } = {}) {
  const stride = width * 4;
  const pixels = Buffer.from({ length: stride * height }, (_, index) => index % 251);
  return { openSucceeded: true, pageIndex, pageCount, width, height, pixelFormat: 'BGRA', bytesPerPixel: 4, stride, pixels };
}

function rejectedEvidence() {
  return { openSucceeded: false, pdfiumLastError: 3 };
}

function render(item, evidence, overrides = {}) {
  const bytes = overrides.bytes ?? bytesFor(item);
  return composePdfRenderResult({
    bytes,
    request: overrides.request ?? requestFor(item, bytes),
    availability: overrides.availability ?? AVAILABILITY.AVAILABLE,
    renderEvidence: overrides.renderEvidence ?? evidence,
  });
}

function assertExactBinding(item, result) {
  assert.deepEqual(result.inputExactBytesDigest, item.exactBytesDigest);
  assert.equal(result.inputByteLength, item.byteLength);
}

test('render provider module exposes only the bounded semantic composer', () => {
  const provider = require('../src/pdf/browser/pdf-render-provider');
  assert.deepEqual(Reflect.ownKeys(provider).sort(), [
    'AVAILABILITY',
    'CAPABILITY_REF',
    'OUTCOME',
    'PROVIDER_CAPABILITY_VERSION',
    'PROVIDER_DESCRIPTOR',
    'RETRY_CATEGORY',
    'STABLE_ERROR',
    'composePdfRenderResult',
  ].sort());
  assert.equal(typeof composePdfRenderResult, 'function');
  assert.ok(Object.isFrozen(provider));
});

test('provider descriptor freezes the exact browser-local render capability', () => {
  assert.equal(PROVIDER_DESCRIPTOR.providerId, 'signthos.pdf.browser.embedpdf-v2.15.0-pdfium');
  assert.equal(PROVIDER_DESCRIPTOR.providerKind, 'BROWSER');
  assert.equal(PROVIDER_DESCRIPTOR.locality, 'LOCAL_ONLY');
  assert.equal(PROVIDER_DESCRIPTOR.providerCandidateId, 'embedpdf-v2.15.0-pdfium-browser');
  assert.equal(PROVIDER_DESCRIPTOR.capabilityContractVersion, 'signthos.provider-capability.v1');
  assert.deepEqual(PROVIDER_DESCRIPTOR.declaredCapabilities, [CAPABILITY_REF]);
  assert.deepEqual(CAPABILITY_REF, { capabilityCode: 'PDF_RENDER_V1', capabilityVersion: '1' });
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.packageIdentity, '@embedpdf/pdfium@2.15.0');
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.version, '2.15.0');
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.embedpdfSourceCommit, PDFIUM_PROVIDER.embedpdfSourceCommit);
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.pdfiumSubmoduleRevision, PDFIUM_PROVIDER.pdfiumSubmoduleRevision);
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.wasmSha256, PDFIUM_PROVIDER.wasmSha256);
  assert.equal(PROVIDER_CAPABILITY_VERSION, 'signthos.pdf.render.v1');
  assert.ok(Object.isFrozen(PROVIDER_DESCRIPTOR));
  assert.ok(Object.isFrozen(PROVIDER_DESCRIPTOR.declaredCapabilities));
});

test('canonical success maps to SUCCEEDED with exact observations including pixel digest', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const evidence = successEvidence();
  const result = render(item, evidence);
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.capabilityRef.capabilityCode, 'PDF_RENDER_V1');
  assert.equal(result.capabilityRef.capabilityVersion, '1');
  assert.equal(result.effectClass, 'READ_ONLY');
  assert.equal(result.locality, 'LOCAL_ONLY');
  assert.equal(result.providerKind, 'BROWSER');
  assert.equal(result.observations.pageIndex, 0);
  assert.equal(result.observations.pageCount, 1);
  assert.equal(result.observations.width, 2);
  assert.equal(result.observations.height, 2);
  assert.equal(result.observations.pixelFormat, 'BGRA');
  assert.equal(result.observations.bytesPerPixel, 4);
  assert.equal(result.observations.stride, 8);
  assert.equal(result.observations.pixelByteLength, 16);
  assert.deepEqual(result.observations.pixelDigest, {
    algorithm: 'sha256',
    value: crypto.createHash('sha256').update(evidence.pixels).digest('hex'),
  });
  assert.deepEqual(result.observations.warnings, []);
  assert.equal(result.newCanonicalRevisionCreated, false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'stableError'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'providerDiagnostics'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'exactOutputRevisionIds'), false);
  assertExactBinding(item, result);
});

test('malformed rejection maps to MALFORMED_UNTRUSTED_DOCUMENT with provider diagnostics', () => {
  const item = record('admission-seed-declared-pdf-nonpdf-v1');
  const result = render(item, rejectedEvidence());
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorClass, STABLE_ERROR.MALFORMED_UNTRUSTED_DOCUMENT);
  assert.equal(result.stableError.errorCode, 'malformed_untrusted_document.pdfium_format_or_corruption');
  assert.equal(result.stableError.retryCategory, 'RETRY_REQUIRES_CHANGED_INPUT_OR_STATE');
  assert.deepEqual(result.providerDiagnostics, {
    providerErrorCode: 3,
    providerErrorConstant: 'FPDF_ERR_FORMAT',
    providerErrorMeaning: 'File not in PDF format or corrupted',
  });
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  assert.equal(result.newCanonicalRevisionCreated, false);
  assertExactBinding(item, result);
});

test('capability code or semantic version mismatch fails as unsupported capability', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  for (const capabilityRef of [
    { capabilityCode: 'PDF_INSPECT_V1', capabilityVersion: '1' },
    { capabilityCode: 'PDF_RENDER_V1', capabilityVersion: '2' },
  ]) {
    const result = composePdfRenderResult({
      bytes,
      request: requestFor(item, bytes, { capabilityRef }),
      availability: AVAILABILITY.AVAILABLE,
      renderEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.UNSUPPORTED_CAPABILITY);
    assert.equal(result.stableError.errorCode, 'unsupported_capability.pdf_render_v1');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('provider capability-version mismatch is unsupported but provider identity mismatch is invalid input', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const unsupported = composePdfRenderResult({
    bytes,
    request: requestFor(item, bytes, { providerCapabilityVersion: 'signthos.pdf.render.v2' }),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: successEvidence(),
  });
  assert.equal(unsupported.stableError.errorClass, STABLE_ERROR.UNSUPPORTED_CAPABILITY);

  const wrongProvider = composePdfRenderResult({
    bytes,
    request: requestFor(item, bytes, { providerId: 'provider:other' }),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: successEvidence(),
  });
  assert.equal(wrongProvider.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(wrongProvider.stableError.errorCode, 'invalid_input.provider_mismatch');
});

test('UNAVAILABLE and UNKNOWN availability fail closed without observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  for (const availability of [AVAILABILITY.UNAVAILABLE, AVAILABILITY.UNKNOWN]) {
    const result = composePdfRenderResult({
      bytes,
      request: requestFor(item, bytes),
      availability,
      renderEvidence: null,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.UNAVAILABLE);
    assert.equal(result.stableError.errorCode, 'unavailable.pdf_render_provider');
    assert.equal(result.stableError.retryCategory, 'RETRY_MAY_SUCCEED');
    assert.equal(result.locality, 'LOCAL_ONLY');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('unknown availability value is invalid input rather than silently available', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = composePdfRenderResult({
    bytes: bytesFor(item),
    request: requestFor(item),
    availability: 'AVAILABLE_WITH_FALLBACK',
    renderEvidence: null,
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.availability_state');
});

test('request exact-byte digest or length mismatch fails before provider success', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const badDigest = requestFor(item, bytes, {
    inputExactBytesDigest: { algorithm: 'sha256', value: '0'.repeat(64) },
  });
  const badLength = requestFor(item, bytes, { inputByteLength: bytes.length + 1 });
  for (const request of [badDigest, badLength]) {
    const result = composePdfRenderResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      renderEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_render_request');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('capability parameter shape defects fail closed as invalid request', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const defects = [
    {},
    { pageIndex: 0 },
    { maxPixels: 40000 },
    { pageIndex: 0, maxPixels: 40000, vendorMode: 'fast' },
    { pageIndex: -1, maxPixels: 40000 },
    { pageIndex: 1.5, maxPixels: 40000 },
    { pageIndex: '0', maxPixels: 40000 },
    { pageIndex: 0, maxPixels: 0 },
    { pageIndex: 0, maxPixels: -10 },
    { pageIndex: 0, maxPixels: 2.5 },
    { pageIndex: 0, maxPixels: '40000' },
  ];
  for (const capabilityParameters of defects) {
    const result = composePdfRenderResult({
      bytes,
      request: requestFor(item, bytes, { capabilityParameters }),
      availability: AVAILABILITY.AVAILABLE,
      renderEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_render_request');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('render evidence bound to a different page index fails closed as binding mismatch', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = successEvidence({ pageIndex: 1, pageCount: 2 });
  const result = composePdfRenderResult({
    bytes,
    request: requestFor(item, bytes),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: evidence,
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.render_evidence_binding');
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
});

test('pixel budget enforcement fails closed while exact budget succeeds', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const over = composePdfRenderResult({
    bytes,
    request: requestFor(item, bytes, { capabilityParameters: { pageIndex: 0, maxPixels: 3 } }),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: successEvidence(),
  });
  assert.equal(over.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(over.stableError.errorCode, 'invalid_input.render_evidence_shape');

  const exact = composePdfRenderResult({
    bytes,
    request: requestFor(item, bytes, { capabilityParameters: { pageIndex: 0, maxPixels: 4 } }),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: successEvidence(),
  });
  assert.equal(exact.outcome, OUTCOME.SUCCEEDED);
});

test('success pixel-shape defects fail closed without observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const base = successEvidence();
  const defects = [
    { ...base, pdfiumLastError: 3 },
    { ...base, extraField: true },
    { ...base, pixelFormat: 'RGBA' },
    { ...base, bytesPerPixel: 3 },
    { ...base, width: 0 },
    { ...base, height: -2 },
    { ...base, stride: 4 },
    { ...base, pixels: Buffer.from({ length: 15 }, () => 7) },
    { ...base, pixels: 'not-pixels' },
    { ...base, pageCount: 0 },
    { ...base, pageCount: -1 },
  ];
  const { pixels, ...missingPixels } = base;
  defects.push(missingPixels);
  for (const renderEvidence of defects) {
    const result = composePdfRenderResult({
      bytes,
      request: requestFor(item, bytes),
      availability: AVAILABILITY.AVAILABLE,
      renderEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.render_evidence_shape');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('shadowed pixel length properties fail closed without invoking evidence getters', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  let getterCalls = 0;

  const shadowed = successEvidence();
  shadowed.pixels = Buffer.from({ length: 15 }, () => 7);
  Object.defineProperty(shadowed.pixels, 'byteLength', { value: 16, configurable: true });
  const shadowedResult = composePdfRenderResult({
    bytes,
    request: requestFor(item, bytes),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: shadowed,
  });
  assert.equal(shadowedResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(shadowedResult.stableError.errorCode, 'invalid_input.render_evidence_shape');
  assert.equal(Object.prototype.hasOwnProperty.call(shadowedResult, 'observations'), false);

  const getter = successEvidence();
  Object.defineProperty(getter.pixels, 'byteLength', {
    configurable: true,
    get() { getterCalls += 1; return 16; },
  });
  const getterResult = composePdfRenderResult({
    bytes,
    request: requestFor(item, bytes),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: getter,
  });
  assert.equal(getterResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(getterResult.stableError.errorCode, 'invalid_input.render_evidence_shape');
  assert.equal(getterCalls, 0);
});

test('rejection shape defects fail closed without malformed diagnostics', () => {
  const item = record('admission-seed-declared-pdf-nonpdf-v1');
  const bytes = bytesFor(item);
  const defects = [
    { openSucceeded: false, pdfiumLastError: 4 },
    { openSucceeded: false, pdfiumLastError: '3' },
    { openSucceeded: false, pdfiumLastError: 3, pageCount: 1 },
    { openSucceeded: false },
    { openSucceeded: 'no', pdfiumLastError: 3 },
    null,
    {},
  ];
  for (const renderEvidence of defects) {
    const result = composePdfRenderResult({
      bytes,
      request: requestFor(item, bytes),
      availability: AVAILABILITY.AVAILABLE,
      renderEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'providerDiagnostics'), false);
  }
});

test('request custom prototypes and accessor fields fail closed without invoking getters', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = successEvidence();
  let getterCalls = 0;

  const custom = Object.create({ operationId: 'inherited' });
  Object.assign(custom, requestFor(item, bytes));
  const customResult = composePdfRenderResult({
    bytes, request: custom, availability: AVAILABILITY.AVAILABLE, renderEvidence: evidence,
  });
  assert.equal(customResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);

  const accessor = requestFor(item, bytes);
  Object.defineProperty(accessor, 'operationId', {
    configurable: true,
    enumerable: true,
    get() { getterCalls += 1; return 'getter-operation'; },
  });
  const result = composePdfRenderResult({
    bytes, request: accessor, availability: AVAILABILITY.AVAILABLE, renderEvidence: evidence,
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(getterCalls, 0);
});

test('digest, capability, and parameter nested accessors fail closed without getter execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const evidence = successEvidence();
  let getterCalls = 0;

  const digest = {};
  Object.defineProperty(digest, 'algorithm', { enumerable: true, get() { getterCalls += 1; return 'sha256'; } });
  digest.value = item.exactBytesDigest.value;
  const digestResult = composePdfRenderResult({
    bytes,
    request: requestFor(item, bytes, { inputExactBytesDigest: digest }),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: evidence,
  });
  assert.equal(digestResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);

  const capabilityRef = {};
  Object.defineProperty(capabilityRef, 'capabilityCode', { enumerable: true, get() { getterCalls += 1; return 'PDF_RENDER_V1'; } });
  capabilityRef.capabilityVersion = '1';
  const capabilityResult = composePdfRenderResult({
    bytes,
    request: requestFor(item, bytes, { capabilityRef }),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: evidence,
  });
  assert.equal(capabilityResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);

  const capabilityParameters = { pageIndex: 0 };
  Object.defineProperty(capabilityParameters, 'maxPixels', { enumerable: true, get() { getterCalls += 1; return 40000; } });
  const parameterResult = composePdfRenderResult({
    bytes,
    request: requestFor(item, bytes, { capabilityParameters }),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: evidence,
  });
  assert.equal(parameterResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(getterCalls, 0);
});

test('render observation accessors fail closed without getter execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  let getterCalls = 0;
  const renderEvidence = { ...successEvidence() };
  Object.defineProperty(renderEvidence, 'pageIndex', {
    enumerable: true,
    get() { getterCalls += 1; return 0; },
  });
  const result = composePdfRenderResult({
    bytes,
    request: requestFor(item, bytes),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence,
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(result.stableError.errorCode, 'invalid_input.render_evidence_shape');
  assert.equal(getterCalls, 0);
});

test('proxy-backed request and evidence containers fail closed without invoking proxy traps', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  let trapCalls = 0;
  const request = new Proxy(requestFor(item, bytes), {
    getPrototypeOf(target) { trapCalls += 1; return Reflect.getPrototypeOf(target); },
    getOwnPropertyDescriptor(target, key) { trapCalls += 1; return Reflect.getOwnPropertyDescriptor(target, key); },
  });
  const requestResult = composePdfRenderResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: successEvidence(),
  });
  assert.equal(requestResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);

  const evidence = new Proxy(successEvidence(), {
    getPrototypeOf(target) { trapCalls += 1; return Reflect.getPrototypeOf(target); },
    getOwnPropertyDescriptor(target, key) { trapCalls += 1; return Reflect.getOwnPropertyDescriptor(target, key); },
  });
  const evidenceResult = composePdfRenderResult({
    bytes,
    request: requestFor(item, bytes),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: evidence,
  });
  assert.equal(evidenceResult.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(trapCalls, 0);
});

test('semantic composition is read-only with respect to bytes, request, and render evidence', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const bytesBefore = Buffer.from(bytes);
  const request = requestFor(item, bytes);
  const requestBefore = JSON.stringify(request);
  const evidence = successEvidence();
  const evidencePixelsBefore = Buffer.from(evidence.pixels);
  const evidenceShapeBefore = JSON.stringify({ ...evidence, pixels: evidence.pixels.toString('hex') });
  const result = composePdfRenderResult({ bytes, request, availability: AVAILABILITY.AVAILABLE, renderEvidence: evidence });
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.deepEqual(bytes, bytesBefore);
  assert.equal(JSON.stringify(request), requestBefore);
  assert.deepEqual(evidence.pixels, evidencePixelsBefore);
  assert.equal(JSON.stringify({ ...evidence, pixels: evidence.pixels.toString('hex') }), evidenceShapeBefore);
});

test('successful result remains deeply frozen and contains no signature or safety claim', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = render(item, successEvidence());
  assert.ok(Object.isFrozen(result));
  assert.ok(Object.isFrozen(result.observations));
  assert.ok(Object.isFrozen(result.observations.pixelDigest));
  assert.ok(Object.isFrozen(result.observations.warnings));
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'pixels'), false);
  for (const key of ['signatureValid', 'redactionSafe', 'pdfConformant', 'nonPolyglot', 'malwareFree']) {
    assert.equal(Object.prototype.hasOwnProperty.call(result, key), false);
    assert.equal(Object.prototype.hasOwnProperty.call(result.observations, key), false);
  }
});

test('every canonical fixture result preserves exact input identity and creates no revision', () => {
  for (const item of manifest.records) {
    const rejected = item.fixtureId.includes('declared-pdf-nonpdf') || item.fixtureId.includes('truncated-pdf-like');
    const evidence = rejected ? rejectedEvidence() : successEvidence();
    const result = render(item, evidence);
    assertExactBinding(item, result);
    assert.equal(result.newCanonicalRevisionCreated, false);
    assert.equal(result.documentId, `document:${item.fixtureId}`);
    assert.equal(result.inputRevisionId, `revision:${item.fixtureId}`);
    if (rejected) {
      assert.equal(result.stableError.errorClass, STABLE_ERROR.MALFORMED_UNTRUSTED_DOCUMENT);
    } else {
      assert.equal(result.outcome, OUTCOME.SUCCEEDED);
    }
  }
});

test('non-buffer bytes and invalid canonical revision identifiers fail as INVALID_INPUT without throwing', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const nonBuffer = composePdfRenderResult({
    bytes: 'not-bytes',
    request: requestFor(item),
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: null,
  });
  assert.equal(nonBuffer.outcome, OUTCOME.FAILED);
  assert.equal(nonBuffer.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(Object.prototype.hasOwnProperty.call(nonBuffer, 'observations'), false);

  const bytes = bytesFor(item);
  for (const override of [{ documentId: '   ' }, { inputRevisionId: '   ' }]) {
    const result = composePdfRenderResult({
      bytes,
      request: requestFor(item, bytes, override),
      availability: AVAILABILITY.AVAILABLE,
      renderEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('unknown top-level request fields fail closed instead of becoming hidden provider options', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  request.remoteFallbackUrl = 'https://example.invalid/document.pdf';
  const result = composePdfRenderResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    renderEvidence: successEvidence(),
  });
  assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  assert.equal(result.locality, 'LOCAL_ONLY');
});

test('render provider source keeps the local-only semantic boundary', () => {
  const source = fs.readFileSync(
    path.join(root, 'packages/providers/src/pdf/browser/pdf-render-provider.js'),
    'utf8',
  );
  assert.match(source, /composePdfRenderResult/);
  assert.match(source, /PDF_RENDER_V1/);
  assert.match(source, /pixelDigest/);
  for (const forbidden of [
    /require\('..\/pdf-render-runtime'\)/,
    /require\('@embedpdf\/pdfium'\)/,
    /\bWebAssembly\b/,
    /DEFAULT_PDFIUM_WASM_URL/,
    /\bfetch\s*\(/,
    /XMLHttpRequest/,
    /\bWorker\s*\(/,
    /importScripts/,
    /child_process/,
    /node:fs/,
    /node:path/,
    /readFileSync/,
    /setTimeout\s*\(/,
    /setInterval\s*\(/,
    /https?:\/\//,
    /\bURL\b/,
    /cdn/i,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
});
