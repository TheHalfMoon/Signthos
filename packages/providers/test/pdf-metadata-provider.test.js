'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { exactByteIdentity } = require('../src/content-identity-admission');
const { PDFIUM_PROVIDER } = require('../src/pdf/browser/pdfium-structural-evidence');
const {
  AVAILABILITY,
  CAPABILITY_REF,
  METADATA_FIELD_KEYS,
  OUTCOME,
  PROVIDER_CAPABILITY_VERSION,
  PROVIDER_DESCRIPTOR,
  STABLE_ERROR,
  TERMINAL_EVIDENCE_SCHEMA,
  TERMINAL_OUTCOME,
  composePdfMetadataResult,
} = require('../src/pdf/browser/pdf-metadata-provider');

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
    operationId: `metadata-read:${item.fixtureId}`,
    capabilityRef: { ...CAPABILITY_REF },
    documentId: `document:${item.fixtureId}`,
    inputRevisionId: `revision:${item.fixtureId}`,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    inputByteLength: identity.byteLength,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    resourceBudgetRef: 'budget:pdf-metadata-read-v1:test',
    capabilityParameters: {},
    ...overrides,
  };
}

function absentMetadata() {
  return {
    title: null,
    author: null,
    subject: null,
    keywords: null,
    creator: null,
    producer: null,
    creationDate: null,
    modDate: null,
  };
}

function successEvidence(overrides = {}) {
  return {
    openSucceeded: true,
    metadata: { ...absentMetadata() },
    ...overrides,
  };
}

function positiveMetadata() {
  return {
    title: 'Signthos Title',
    author: 'Signthos Author',
    subject: 'Signthos Subject',
    keywords: 'signthos, metadata',
    creator: 'Signthos Creator',
    producer: 'Signthos Producer',
    creationDate: 'D:20260917000000+03\'00\'',
    modDate: 'D:20260917120000+03\'00\'',
  };
}

function rejectedEvidence() {
  return { openSucceeded: false, pdfiumLastError: 3 };
}

function read(item, evidence, overrides = {}) {
  const bytes = overrides.bytes ?? bytesFor(item);
  return composePdfMetadataResult({
    bytes,
    request: overrides.request ?? requestFor(item, bytes),
    availability: overrides.availability ?? AVAILABILITY.AVAILABLE,
    metadataEvidence: overrides.metadataEvidence ?? evidence,
  });
}

function assertExactBinding(item, result) {
  assert.deepEqual(result.inputExactBytesDigest, item.exactBytesDigest);
  assert.equal(result.inputByteLength, item.byteLength);
}

function terminalEvidenceFor(item, bytes = bytesFor(item), request = requestFor(item, bytes), overrides = {}) {
  const identity = exactByteIdentity(bytes);
  return {
    schema: TERMINAL_EVIDENCE_SCHEMA,
    terminalOutcome: TERMINAL_OUTCOME.CANCELLED,
    providerId: PROVIDER_DESCRIPTOR.providerId,
    providerCapabilityVersion: PROVIDER_CAPABILITY_VERSION,
    inputExactBytesDigest: { ...identity.inputExactBytesDigest },
    byteLength: identity.byteLength,
    resourceBudgetRef: request.resourceBudgetRef,
    runtimeEvidenceRef: `runtime-evidence:${item.fixtureId}`,
    partialOutputDiscarded: true,
    ...overrides,
  };
}

test('metadata provider module exposes only the bounded semantic composer', () => {
  const provider = require('../src/pdf/browser/pdf-metadata-provider');
  assert.deepEqual(Reflect.ownKeys(provider), [
    'AVAILABILITY',
    'CAPABILITY_REF',
    'METADATA_FIELD_KEYS',
    'OUTCOME',
    'PROVIDER_CAPABILITY_VERSION',
    'PROVIDER_DESCRIPTOR',
    'RETRY_CATEGORY',
    'STABLE_ERROR',
    'TERMINAL_EVIDENCE_SCHEMA',
    'TERMINAL_OUTCOME',
    'composePdfMetadataResult',
  ]);
  assert.equal(typeof composePdfMetadataResult, 'function');
  assert.equal(Object.isFrozen(provider), true);
});

test('provider descriptor freezes the exact browser-local metadata capability', () => {
  assert.deepEqual({ ...CAPABILITY_REF }, { capabilityCode: 'PDF_METADATA_READ_V1', capabilityVersion: '1' });
  assert.equal(PROVIDER_CAPABILITY_VERSION, 'signthos.pdf.metadata.read.v1');
  assert.equal(TERMINAL_EVIDENCE_SCHEMA, 'signthos.pdf.metadata.read.runtime-terminal.v1');
  assert.deepEqual([...METADATA_FIELD_KEYS], [
    'title',
    'author',
    'subject',
    'keywords',
    'creator',
    'producer',
    'creationDate',
    'modDate',
  ]);
  assert.ok(Object.isFrozen(CAPABILITY_REF));
  assert.ok(Object.isFrozen(METADATA_FIELD_KEYS));
  assert.ok(Object.isFrozen(PROVIDER_DESCRIPTOR));
  assert.equal(PROVIDER_DESCRIPTOR.implementationVersionEvidence.wasmSha256, PDFIUM_PROVIDER.wasmSha256);
  assert.ok(PROVIDER_DESCRIPTOR.declaredCapabilities.includes(CAPABILITY_REF));
});

test('all-absent fixture metadata composes to SUCCEEDED with explicit nulls', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = read(item, successEvidence());
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.capabilityRef.capabilityCode, 'PDF_METADATA_READ_V1');
  assert.equal(result.capabilityRef.capabilityVersion, '1');
  assert.equal(result.effectClass, 'READ_ONLY');
  assert.equal(result.locality, 'LOCAL_ONLY');
  assert.equal(result.providerKind, 'BROWSER');
  assert.deepEqual({ ...result.observations, warnings: undefined }, { ...absentMetadata(), warnings: undefined });
  assert.deepEqual(result.observations.warnings, []);
  assert.equal(result.newCanonicalRevisionCreated, false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'stableError'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'providerDiagnostics'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'exactOutputRevisionIds'), false);
  assertExactBinding(item, result);
});

test('positive stub metadata values compose with exact observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = read(item, successEvidence({ metadata: positiveMetadata() }));
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.deepEqual({ ...result.observations, warnings: undefined }, { ...positiveMetadata(), warnings: undefined });
  assert.deepEqual(result.observations.warnings, []);
  assertExactBinding(item, result);
});

test('partial metadata mixes present strings with explicit nulls', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = read(item, successEvidence({
    metadata: { ...absentMetadata(), title: 'Only Title', producer: 'Only Producer' },
  }));
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.equal(result.observations.title, 'Only Title');
  assert.equal(result.observations.producer, 'Only Producer');
  assert.equal(result.observations.author, null);
  assert.equal(result.observations.modDate, null);
});

test('malformed rejection maps to MALFORMED_UNTRUSTED_DOCUMENT with provider diagnostics', () => {
  const item = record('admission-seed-declared-pdf-nonpdf-v1');
  const result = read(item, rejectedEvidence());
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
    { capabilityCode: 'PDF_TEXT_SEARCH_V1', capabilityVersion: '1' },
    { capabilityCode: 'PDF_METADATA_READ_V1', capabilityVersion: '2' },
  ]) {
    const result = composePdfMetadataResult({
      bytes,
      request: requestFor(item, bytes, { capabilityRef }),
      availability: AVAILABILITY.AVAILABLE,
      metadataEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.UNSUPPORTED_CAPABILITY);
    assert.equal(result.stableError.errorCode, 'unsupported_capability.pdf_metadata_read_v1');
  }
});

test('provider capability-version mismatch is unsupported but provider identity mismatch is invalid input', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const versionMismatch = composePdfMetadataResult({
    bytes,
    request: requestFor(item, bytes, { providerCapabilityVersion: 'signthos.pdf.metadata.read.v2' }),
    availability: AVAILABILITY.AVAILABLE,
    metadataEvidence: successEvidence(),
  });
  assert.equal(versionMismatch.stableError.errorClass, STABLE_ERROR.UNSUPPORTED_CAPABILITY);

  const identityMismatch = composePdfMetadataResult({
    bytes,
    request: requestFor(item, bytes, { providerId: 'provider:other' }),
    availability: AVAILABILITY.AVAILABLE,
    metadataEvidence: successEvidence(),
  });
  assert.equal(identityMismatch.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(identityMismatch.stableError.errorCode, 'invalid_input.provider_mismatch');
});

test('UNAVAILABLE and UNKNOWN availability fail closed without observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const availability of [AVAILABILITY.UNAVAILABLE, AVAILABILITY.UNKNOWN]) {
    const result = read(item, successEvidence(), { availability });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.UNAVAILABLE);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('unknown availability value is invalid input rather than silently available', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = read(item, successEvidence(), { availability: 'SOMETIMES' });
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorCode, 'invalid_input.availability_state');
});

test('request exact-byte digest or length mismatch fails before provider success', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  for (const overrides of [
    { inputByteLength: bytes.length + 1 },
    { inputExactBytesDigest: { algorithm: 'sha256', value: '0'.repeat(64) } },
  ]) {
    const result = read(item, successEvidence(), {
      request: requestFor(item, bytes, overrides),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_metadata_read_request');
  }
});

test('document-level capability parameters must stay empty', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  for (const capabilityParameters of [
    { pageIndex: 0 },
    { tag: 'Title' },
    { tags: ['Title'] },
    null,
    'metadata',
  ]) {
    const result = composePdfMetadataResult({
      bytes,
      request: requestFor(item, bytes, { capabilityParameters }),
      availability: AVAILABILITY.AVAILABLE,
      metadataEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_metadata_read_request');
  }
});

test('metadata success-shape defects fail closed without observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    { ...successEvidence(), extra: true },
    { openSucceeded: 'yes', metadata: absentMetadata() },
    { openSucceeded: true },
    { openSucceeded: true, metadata: null },
    { openSucceeded: true, metadata: [] },
    { openSucceeded: true, metadata: { ...absentMetadata(), extra: 'tag' } },
    { openSucceeded: true, metadata: { ...absentMetadata(), title: 42 } },
    { openSucceeded: true, metadata: { ...absentMetadata(), author: {} } },
    { openSucceeded: true, metadata: { ...absentMetadata(), modDate: ['D:now'] } },
    { openSucceeded: true, metadata: { ...absentMetadata(), creationDate: undefined } },
  ]) {
    const result = read(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.metadata_evidence_shape');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('missing metadata fields fail closed without observations', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const partial = { ...absentMetadata() };
  delete partial.modDate;
  const result = read(item, successEvidence({ metadata: partial }));
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorCode, 'invalid_input.metadata_evidence_shape');
});

test('metadata observation accessors fail closed without getter execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  let getterCalls = 0;
  const evidence = successEvidence();
  Object.defineProperty(evidence.metadata, 'title', {
    enumerable: true,
    get() { getterCalls += 1; return 'Getter Title'; },
  });
  const result = read(item, evidence);
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorCode, 'invalid_input.metadata_evidence_shape');
  assert.equal(getterCalls, 0);
});

test('rejection shape defects fail closed without malformed diagnostics', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  for (const evidence of [
    { openSucceeded: false, pdfiumLastError: 2 },
    { openSucceeded: false },
    { openSucceeded: 'no', pdfiumLastError: 3 },
  ]) {
    const result = read(item, evidence);
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.metadata_evidence_shape');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'providerDiagnostics'), false);
  }
});

test('request custom prototypes and accessor fields fail closed without invoking getters', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  let getterCalls = 0;
  const accessor = requestFor(item, bytes);
  Object.defineProperty(accessor, 'operationId', {
    enumerable: true,
    get() { getterCalls += 1; return 'metadata-read:getter'; },
  });
  for (const request of [
    accessor,
    Object.assign(Object.create({ inherited: true }), requestFor(item, bytes)),
  ]) {
    const result = composePdfMetadataResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      metadataEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.pdf_metadata_read_request');
  }
  assert.equal(getterCalls, 0);
});

test('digest, capability, and parameter nested accessors fail closed without getter execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  let getterCalls = 0;
  function accessedRequest(mutator) {
    const request = requestFor(item, bytes);
    mutator(request);
    return request;
  }
  const cases = [
    accessedRequest((request) => {
      Object.defineProperty(request.inputExactBytesDigest, 'value', {
        enumerable: true,
        get() { getterCalls += 1; return 'getter'; },
      });
    }),
    accessedRequest((request) => {
      Object.defineProperty(request.capabilityRef, 'capabilityCode', {
        enumerable: true,
        get() { getterCalls += 1; return 'PDF_METADATA_READ_V1'; },
      });
    }),
    accessedRequest((request) => {
      Object.defineProperty(request.capabilityParameters, 'tag', {
        enumerable: true,
        get() { getterCalls += 1; return 'Title'; },
      });
    }),
  ];
  for (const request of cases) {
    const result = composePdfMetadataResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      metadataEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
  }
  assert.equal(getterCalls, 0);
});

test('proxy-backed request and evidence containers fail closed without invoking proxy traps', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  let trapCalls = 0;
  const request = new Proxy(requestFor(item, bytes), {
    getOwnPropertyDescriptor(target, key) {
      trapCalls += 1;
      return Reflect.getOwnPropertyDescriptor(target, key);
    },
  });
  const evidence = new Proxy(successEvidence(), {
    ownKeys(target) {
      trapCalls += 1;
      return Reflect.ownKeys(target);
    },
  });
  for (const input of [
    { request, metadataEvidence: successEvidence() },
    { request: requestFor(item, bytes), metadataEvidence: evidence },
  ]) {
    const result = composePdfMetadataResult({
      bytes,
      request: input.request,
      availability: AVAILABILITY.AVAILABLE,
      metadataEvidence: input.metadataEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
  }
  assert.equal(trapCalls, 0);
});

test('proxy-backed metadata field containers fail closed without invoking proxy traps', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  let trapCalls = 0;
  const metadata = new Proxy({ ...absentMetadata() }, {
    ownKeys(target) {
      trapCalls += 1;
      return Reflect.ownKeys(target);
    },
  });
  const result = read(item, successEvidence({ metadata }));
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorCode, 'invalid_input.metadata_evidence_shape');
  assert.equal(trapCalls, 0);
});

test('semantic composition is read-only with respect to bytes, request, and metadata evidence', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const bytesBefore = Buffer.from(bytes);
  const request = requestFor(item, bytes);
  const requestBefore = JSON.stringify(request);
  const evidence = successEvidence({ metadata: positiveMetadata() });
  const evidenceShapeBefore = JSON.stringify(evidence);
  const result = composePdfMetadataResult({ bytes, request, availability: AVAILABILITY.AVAILABLE, metadataEvidence: evidence });
  assert.equal(result.outcome, OUTCOME.SUCCEEDED);
  assert.deepEqual(bytes, bytesBefore);
  assert.equal(JSON.stringify(request), requestBefore);
  assert.equal(JSON.stringify(evidence), evidenceShapeBefore);
});

test('successful result remains deeply frozen and contains no signature or safety claim', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const result = read(item, successEvidence({ metadata: positiveMetadata() }));
  assert.ok(Object.isFrozen(result));
  assert.ok(Object.isFrozen(result.observations));
  assert.ok(Object.isFrozen(result.observations.warnings));
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'metadata'), false);
  for (const key of ['signatureValid', 'redactionSafe', 'pdfConformant', 'nonPolyglot', 'malwareFree']) {
    assert.equal(Object.prototype.hasOwnProperty.call(result, key), false);
    assert.equal(Object.prototype.hasOwnProperty.call(result.observations, key), false);
  }
});

test('every canonical fixture result preserves exact input identity and creates no revision', () => {
  for (const item of manifest.records) {
    const rejected = item.fixtureId.includes('declared-pdf-nonpdf') || item.fixtureId.includes('truncated-pdf-like');
    const evidence = rejected ? rejectedEvidence() : successEvidence();
    const result = read(item, evidence);
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
  const nonBuffer = composePdfMetadataResult({
    bytes: 'not-bytes',
    request: requestFor(item),
    availability: AVAILABILITY.AVAILABLE,
    metadataEvidence: null,
  });
  assert.equal(nonBuffer.outcome, OUTCOME.FAILED);
  assert.equal(nonBuffer.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
  assert.equal(Object.prototype.hasOwnProperty.call(nonBuffer, 'observations'), false);

  const bytes = bytesFor(item);
  for (const override of [{ documentId: '   ' }, { inputRevisionId: '   ' }]) {
    const result = composePdfMetadataResult({
      bytes,
      request: requestFor(item, bytes, override),
      availability: AVAILABILITY.AVAILABLE,
      metadataEvidence: successEvidence(),
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('unknown top-level request fields fail closed instead of becoming hidden provider options', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const result = composePdfMetadataResult({
    bytes,
    request: { ...requestFor(item, bytes), debug: true },
    availability: AVAILABILITY.AVAILABLE,
    metadataEvidence: successEvidence(),
  });
  assert.equal(result.outcome, OUTCOME.FAILED);
  assert.equal(result.stableError.errorCode, 'invalid_input.pdf_metadata_read_request');
});

test('qualified runtime terminal evidence maps to distinct fail-closed terminal outcomes', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  for (const [terminalOutcome, errorClass, errorCode] of [
    [TERMINAL_OUTCOME.CANCELLED, STABLE_ERROR.CANCELLED, 'cancelled.pdf_metadata_read_runtime'],
    [TERMINAL_OUTCOME.TIMED_OUT, STABLE_ERROR.TIMEOUT, 'timeout.pdf_metadata_read_runtime'],
    [TERMINAL_OUTCOME.RESOURCE_LIMIT_EXCEEDED, STABLE_ERROR.RESOURCE_LIMIT_EXCEEDED, 'resource_limit_exceeded.pdf_metadata_read_runtime'],
  ]) {
    const result = composePdfMetadataResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      metadataEvidence: null,
      terminalOutcomeEvidence: terminalEvidenceFor(item, bytes, request, { terminalOutcome }),
    });
    assert.equal(result.outcome, terminalOutcome);
    assert.equal(result.stableError.errorClass, errorClass);
    assert.equal(result.stableError.errorCode, errorCode);
    assert.deepEqual(result.runtimeTerminalEvidence, {
      schema: TERMINAL_EVIDENCE_SCHEMA,
      runtimeEvidenceRef: `runtime-evidence:${item.fixtureId}`,
      partialOutputDiscarded: true,
    });
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
    assert.ok(Object.isFrozen(result));
  }
});

test('runtime terminal evidence requires exact byte, provider, capability, and resource-budget binding', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  const base = terminalEvidenceFor(item, bytes, request);
  const invalidEvidence = [
    { ...base, schema: 'signthos.pdf.metadata.read.runtime-terminal.v2' },
    { ...base, terminalOutcome: 'FAILED' },
    { ...base, providerId: 'provider:other' },
    { ...base, providerCapabilityVersion: 'signthos.pdf.metadata.read.v2' },
    { ...base, inputExactBytesDigest: { algorithm: 'sha256', value: '0'.repeat(64) } },
    { ...base, byteLength: base.byteLength + 1 },
    { ...base, resourceBudgetRef: 'budget:other' },
    { ...base, runtimeEvidenceRef: '   ' },
    { ...base, partialOutputDiscarded: false },
    { ...base, extraField: true },
  ];
  const { runtimeEvidenceRef, ...missingRef } = base;
  void runtimeEvidenceRef;
  invalidEvidence.push(missingRef);

  for (const terminalOutcomeEvidence of invalidEvidence) {
    const result = composePdfMetadataResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      metadataEvidence: null,
      terminalOutcomeEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.runtime_terminal_evidence');
    assert.equal(Object.prototype.hasOwnProperty.call(result, 'observations'), false);
  }
});

test('runtime terminal evidence cannot coexist with metadata success or unavailable provider state', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  const terminalOutcomeEvidence = terminalEvidenceFor(item, bytes, request);

  const conflicting = composePdfMetadataResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    metadataEvidence: successEvidence(),
    terminalOutcomeEvidence,
  });
  assert.equal(conflicting.outcome, OUTCOME.FAILED);
  assert.equal(conflicting.stableError.errorCode, 'invalid_input.runtime_terminal_evidence_conflict');

  for (const availability of [AVAILABILITY.UNAVAILABLE, AVAILABILITY.UNKNOWN]) {
    const result = composePdfMetadataResult({
      bytes,
      request,
      availability,
      metadataEvidence: null,
      terminalOutcomeEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorCode, 'invalid_input.runtime_terminal_availability_conflict');
  }
});

test('runtime terminal evidence rejects custom prototypes, inherited fields, symbols, accessors, and proxies without trap execution', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const request = requestFor(item, bytes);
  const base = terminalEvidenceFor(item, bytes, request);

  const custom = Object.create({ terminalOutcome: TERMINAL_OUTCOME.CANCELLED });
  Object.assign(custom, base);
  delete custom.terminalOutcome;

  const symbolExtra = { ...base };
  symbolExtra[Symbol('hidden')] = true;

  let getterCalls = 0;
  const accessor = { ...base };
  Object.defineProperty(accessor, 'runtimeEvidenceRef', {
    enumerable: true,
    get() { getterCalls += 1; return 'runtime-evidence:getter'; },
  });

  let proxyTrapCalls = 0;
  const proxy = new Proxy({ ...base }, {
    getPrototypeOf(target) { proxyTrapCalls += 1; return Reflect.getPrototypeOf(target); },
    ownKeys(target) { proxyTrapCalls += 1; return Reflect.ownKeys(target); },
    getOwnPropertyDescriptor(target, key) { proxyTrapCalls += 1; return Reflect.getOwnPropertyDescriptor(target, key); },
  });

  for (const terminalOutcomeEvidence of [custom, symbolExtra, accessor, proxy]) {
    const result = composePdfMetadataResult({
      bytes,
      request,
      availability: AVAILABILITY.AVAILABLE,
      metadataEvidence: null,
      terminalOutcomeEvidence,
    });
    assert.equal(result.outcome, OUTCOME.FAILED);
    assert.equal(result.stableError.errorClass, STABLE_ERROR.INVALID_INPUT);
    assert.equal(result.stableError.errorCode, 'invalid_input.runtime_terminal_evidence');
  }
  assert.equal(getterCalls, 0);
  assert.equal(proxyTrapCalls, 0);
});

test('runtime terminal composition does not mutate bytes, request, or evidence', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const beforeBytes = Buffer.from(bytes);
  const request = Object.freeze(requestFor(item, bytes));
  const terminalOutcomeEvidence = Object.freeze(terminalEvidenceFor(item, bytes, request));
  const beforeEvidence = JSON.stringify(terminalOutcomeEvidence);
  const result = composePdfMetadataResult({
    bytes,
    request,
    availability: AVAILABILITY.AVAILABLE,
    metadataEvidence: null,
    terminalOutcomeEvidence,
  });
  assert.equal(result.outcome, TERMINAL_OUTCOME.CANCELLED);
  assert.deepEqual(bytes, beforeBytes);
  assert.equal(JSON.stringify(terminalOutcomeEvidence), beforeEvidence);
});

test('metadata provider source keeps the local-only semantic boundary', () => {
  const source = fs.readFileSync(
    path.join(root, 'packages/providers/src/pdf/browser/pdf-metadata-provider.js'),
    'utf8',
  );
  assert.match(source, /composePdfMetadataResult/);
  assert.match(source, /PDF_METADATA_READ_V1/);
  for (const forbidden of [
    /require\('..\/pdf-metadata-runtime'\)/,
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
