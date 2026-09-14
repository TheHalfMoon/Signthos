'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  COMPLETENESS,
  CONFLICT_IMPACTS,
  DISPOSITIONS,
  OPERATION_STATUS,
  SOURCE_KINDS,
  createContentInputBinding,
  evaluateAdmission,
  exactByteIdentity,
} = require('../src/content-identity-admission');
const {
  PDFIUM_FORMAT_ERROR,
  PDFIUM_PROVIDER,
  mapPdfiumStructuralObservation,
} = require('../src/pdf/browser/pdfium-structural-evidence');

const root = path.resolve(__dirname, '../../..');
const fixtureRoot = path.join(root, 'specs/004-local-pdf-core/fixtures/admission');
const manifest = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'manifest.json'), 'utf8'));

const POLICY = Object.freeze({
  policyId: 'signthos.test.pdfium-structural-admission',
  policyVersion: '1',
  structuralEvidenceRequired: true,
  classifierRequired: false,
  deterministicObservationsRequired: false,
  structuralRejectionDisposition: DISPOSITIONS.NOT_PDF,
});

function record(id) {
  const value = manifest.records.find((item) => item.fixtureId === id);
  assert.ok(value, `missing fixture record ${id}`);
  return value;
}

function bytesFor(item) {
  return fs.readFileSync(path.join(root, item.repositoryPath));
}

function bindingFor(item, bytes = bytesFor(item)) {
  return createContentInputBinding(bytes, {
    sourceKind: SOURCE_KINDS.CANONICAL_DOCUMENT_REVISION,
    documentId: `test:${item.fixtureId}`,
    inputRevisionId: `test-revision:${item.fixtureSchemaVersion}`,
  });
}

function evaluateWithMappedEvidence(item, structuralEvidence, conflicts = []) {
  const bytes = bytesFor(item);
  return evaluateAdmission({
    bytes,
    inputBinding: bindingFor(item, bytes),
    policy: POLICY,
    declaredIdentity: item.declaredIdentityInputs,
    structuralEvidence,
    conflicts,
  });
}

function bound(binding, fields) {
  return {
    ...fields,
    inputExactBytesDigest: binding.inputExactBytesDigest,
    byteLength: binding.byteLength,
  };
}

function assertExactBinding(item, evidence) {
  assert.deepEqual(evidence.inputExactBytesDigest, item.exactBytesDigest);
  assert.equal(evidence.byteLength, item.byteLength);
}

for (const id of [
  'admission-seed-ordinary-minimal-v1',
  'admission-seed-trailing-inert-bytes-v1',
]) {
  test(`${id} maps successful PDFium open to complete accepted structural evidence`, () => {
    const item = record(id);
    const evidence = mapPdfiumStructuralObservation(bytesFor(item), {
      openSucceeded: true,
      pageCount: 1,
    });
    assert.equal(evidence.state, 'STRUCTURAL_INSPECTION_COMPLETE');
    assert.equal(evidence.structuralIdentityResult, 'PDF_STRUCTURE_ACCEPTED');
    assert.deepEqual(evidence.providerObservation, { openSucceeded: true, pageCount: 1 });
    assertExactBinding(item, evidence);
  });
}

for (const id of [
  'admission-seed-declared-pdf-nonpdf-v1',
  'admission-seed-truncated-pdf-like-v1',
]) {
  test(`${id} maps PDFium format error to input rejection without structural identity result`, () => {
    const item = record(id);
    const evidence = mapPdfiumStructuralObservation(bytesFor(item), {
      openSucceeded: false,
      pdfiumLastError: 3,
    });
    assert.equal(evidence.state, 'STRUCTURAL_INSPECTION_INPUT_REJECTED');
    assert.equal(Object.prototype.hasOwnProperty.call(evidence, 'structuralIdentityResult'), false);
    assert.deepEqual(evidence.providerObservation, {
      openSucceeded: false,
      pdfiumLastError: 3,
      pdfiumErrorConstant: 'FPDF_ERR_FORMAT',
      pdfiumErrorMeaning: 'File not in PDF format or corrupted',
    });
    assertExactBinding(item, evidence);
  });
}

test('provider evidence is exact and version-bound', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const evidence = mapPdfiumStructuralObservation(bytesFor(item), { openSucceeded: true, pageCount: 1 });
  assert.equal(evidence.providerId, '@embedpdf/pdfium');
  assert.equal(evidence.providerVersionEvidence.packageIdentity, '@embedpdf/pdfium@2.15.0');
  assert.equal(evidence.providerVersionEvidence.version, '2.15.0');
  assert.equal(evidence.providerVersionEvidence.embedpdfSourceCommit, '2cf7df3b594dfe46de2d85e6973ff50ea447a1ed');
  assert.equal(evidence.providerVersionEvidence.pdfiumSubmoduleRevision, 'cb29e78f2ba00c9298714d5f4a8bf7765f1e802f');
  assert.equal(evidence.providerVersionEvidence.wasmSha256, 'c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8');
  assert.equal(evidence.providerCapabilityVersion, 'signthos.pdfium.structural-open.v1');
});

test('unknown PDFium errors fail closed instead of being guessed', () => {
  const item = record('admission-seed-truncated-pdf-like-v1');
  for (const code of [1, 2, 4, 5, 6, 7, 8, 999]) {
    assert.throws(
      () => mapPdfiumStructuralObservation(bytesFor(item), { openSucceeded: false, pdfiumLastError: code }),
      /not qualified for structural mapping/,
    );
  }
});

test('contradictory or incomplete raw observations fail closed', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const cases = [
    { openSucceeded: true },
    { openSucceeded: true, pageCount: -1 },
    { openSucceeded: true, pageCount: 1.5 },
    { openSucceeded: true, pageCount: 1, pdfiumLastError: 3 },
    { openSucceeded: false, pageCount: 0, pdfiumLastError: 3 },
    { openSucceeded: false },
    { openSucceeded: 'true', pageCount: 1 },
  ];
  for (const observation of cases) {
    assert.throws(() => mapPdfiumStructuralObservation(bytes, observation), TypeError);
  }
});

test('mapped accepted evidence composes with provider-neutral admission', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const evidence = mapPdfiumStructuralObservation(bytesFor(item), { openSucceeded: true, pageCount: 1 });
  const result = evaluateWithMappedEvidence(item, evidence);
  assert.equal(result.operationStatus, OPERATION_STATUS.SUCCEEDED);
  assert.equal(result.evidenceCompleteness, COMPLETENESS.COMPLETE);
  assert.equal(result.admissionDisposition, DISPOSITIONS.CONFIRMED_PDF);
});

test('mapped input rejection publishes no admission disposition', () => {
  const item = record('admission-seed-truncated-pdf-like-v1');
  const evidence = mapPdfiumStructuralObservation(bytesFor(item), { openSucceeded: false, pdfiumLastError: 3 });
  const result = evaluateWithMappedEvidence(item, evidence);
  assert.equal(result.operationStatus, OPERATION_STATUS.INPUT_REJECTED);
  assert.equal(result.evidenceCompleteness, COMPLETENESS.INCOMPLETE);
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'admissionDisposition'), false);
});

test('trailing-inert acceptance remains compatible with explicit polyglot ambiguity', () => {
  const item = record('admission-seed-trailing-inert-bytes-v1');
  const bytes = bytesFor(item);
  const binding = bindingFor(item, bytes);
  const evidence = mapPdfiumStructuralObservation(bytes, { openSucceeded: true, pageCount: 1 });
  const conflict = bound(binding, {
    conflictClass: 'POLYGLOT_OR_MIXED_CONTENT_INDICATOR',
    evidenceRefs: ['pdfium-structural-evidence', 'mixed-content-observation'],
    dispositionImpact: CONFLICT_IMPACTS.AMBIGUOUS,
  });
  const result = evaluateAdmission({
    bytes,
    inputBinding: binding,
    policy: POLICY,
    declaredIdentity: item.declaredIdentityInputs,
    structuralEvidence: evidence,
    conflicts: [conflict],
  });
  assert.equal(result.operationStatus, OPERATION_STATUS.SUCCEEDED);
  assert.equal(result.evidenceCompleteness, COMPLETENESS.CONFLICTING);
  assert.equal(result.admissionDisposition, DISPOSITIONS.AMBIGUOUS_CONTENT_IDENTITY);
});

test('adapter does not mutate input bytes or raw observation objects', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const before = Buffer.from(bytes);
  const observation = Object.freeze({ openSucceeded: true, pageCount: 1 });
  const observationSnapshot = JSON.stringify(observation);
  mapPdfiumStructuralObservation(bytes, observation);
  assert.deepEqual(bytes, before);
  assert.equal(JSON.stringify(observation), observationSnapshot);
});

test('adapter rejects non-buffer bytes and non-object observations', () => {
  assert.throws(() => mapPdfiumStructuralObservation('not-bytes', { openSucceeded: true, pageCount: 1 }), /Buffer/);
  assert.throws(() => mapPdfiumStructuralObservation(Buffer.from('x'), null), /plain object/);
});

test('provider constants preserve exact qualified PDFium format-error semantics', () => {
  assert.equal(PDFIUM_PROVIDER.packageIdentity, '@embedpdf/pdfium@2.15.0');
  assert.deepEqual(PDFIUM_FORMAT_ERROR, {
    code: 3,
    constant: 'FPDF_ERR_FORMAT',
    meaning: 'File not in PDF format or corrupted',
  });
});

test('every mapped evidence binding equals exact bytes independently recomputed by canonical identity logic', () => {
  for (const item of manifest.records) {
    const bytes = bytesFor(item);
    const identity = exactByteIdentity(bytes);
    const raw = item.fixtureId.includes('declared-pdf-nonpdf') || item.fixtureId.includes('truncated-pdf-like')
      ? { openSucceeded: false, pdfiumLastError: 3 }
      : { openSucceeded: true, pageCount: 1 };
    const evidence = mapPdfiumStructuralObservation(bytes, raw);
    assert.deepEqual(evidence.inputExactBytesDigest, identity.inputExactBytesDigest);
    assert.equal(evidence.byteLength, identity.byteLength);
  }
});
