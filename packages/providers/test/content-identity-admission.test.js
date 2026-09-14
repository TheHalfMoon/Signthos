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

const root = path.resolve(__dirname, '../../..');
const fixtureRoot = path.join(root, 'specs/004-local-pdf-core/fixtures/admission');
const manifest = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'manifest.json'), 'utf8'));

const POLICY = Object.freeze({
  policyId: 'signthos.test.provider-neutral-admission',
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

function bound(binding, fields) {
  return {
    ...fields,
    inputExactBytesDigest: binding.inputExactBytesDigest,
    byteLength: binding.byteLength,
  };
}

function structural(binding, state, structuralIdentityResult) {
  const fields = { state };
  if (structuralIdentityResult !== undefined) fields.structuralIdentityResult = structuralIdentityResult;
  return bound(binding, fields);
}

function evaluateFixture(item, overrides = {}) {
  const bytes = overrides.bytes ?? bytesFor(item);
  const inputBinding = overrides.inputBinding ?? bindingFor(item, bytes);
  return evaluateAdmission({
    bytes,
    inputBinding,
    policy: overrides.policy ?? POLICY,
    declaredIdentity: overrides.declaredIdentity ?? item.declaredIdentityInputs,
    deterministicObservations: overrides.deterministicObservations ?? [],
    classifierEvidence: overrides.classifierEvidence ?? null,
    structuralEvidence: overrides.structuralEvidence ?? null,
    conflicts: overrides.conflicts ?? [],
  });
}

function assertNoDisposition(result) {
  assert.equal(Object.prototype.hasOwnProperty.call(result, 'admissionDisposition'), false);
}

test('fixture manifest exact bytes remain canonical', () => {
  for (const item of manifest.records) {
    const identity = exactByteIdentity(bytesFor(item));
    assert.equal(identity.byteLength, item.byteLength);
    assert.deepEqual(identity.inputExactBytesDigest, item.exactBytesDigest);
  }
});

test('canonical revision binding requires document and revision identifiers', () => {
  const bytes = Buffer.from('binding-test');
  assert.throws(() => createContentInputBinding(bytes, {
    sourceKind: SOURCE_KINDS.CANONICAL_DOCUMENT_REVISION,
    documentId: 'doc-1',
  }), /valid canonical-revision or derived-artifact binding/);
});

test('derived artifact binding requires derived and parent operation references', () => {
  const bytes = Buffer.from('derived-test');
  const binding = createContentInputBinding(bytes, {
    sourceKind: SOURCE_KINDS.DERIVED_ARTIFACT,
    derivedArtifactRef: 'artifact-1',
    parentOperationRef: 'operation-1',
  });
  assert.equal(binding.sourceKind, SOURCE_KINDS.DERIVED_ARTIFACT);
  assert.equal(binding.derivedArtifactRef, 'artifact-1');
  assert.equal(binding.parentOperationRef, 'operation-1');
});

test('ordinary PDF requires structural acceptance before confirmation', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const binding = bindingFor(item);
  const result = evaluateFixture(item, {
    inputBinding: binding,
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_ACCEPTED'),
  });
  assert.equal(result.operationStatus, OPERATION_STATUS.SUCCEEDED);
  assert.equal(result.evidenceCompleteness, COMPLETENESS.COMPLETE);
  assert.equal(result.admissionDisposition, DISPOSITIONS.CONFIRMED_PDF);
});

test('complete structural rejection may publish NOT_PDF only through explicit policy choice', () => {
  const item = record('admission-seed-declared-pdf-nonpdf-v1');
  const binding = bindingFor(item);
  const result = evaluateFixture(item, {
    inputBinding: binding,
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_REJECTED'),
  });
  assert.equal(result.operationStatus, OPERATION_STATUS.SUCCEEDED);
  assert.equal(result.admissionDisposition, DISPOSITIONS.NOT_PDF);
});

test('policy can preserve structural rejection as uncertainty instead of claiming NOT_PDF', () => {
  const item = record('admission-seed-declared-pdf-nonpdf-v1');
  const binding = bindingFor(item);
  const policy = { ...POLICY, structuralRejectionDisposition: DISPOSITIONS.UNSUPPORTED_OR_UNCERTAIN };
  const result = evaluateFixture(item, {
    policy,
    inputBinding: binding,
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_REJECTED'),
  });
  assert.equal(result.operationStatus, OPERATION_STATUS.SUCCEEDED);
  assert.equal(result.admissionDisposition, DISPOSITIONS.UNSUPPORTED_OR_UNCERTAIN);
});

test('structural input rejection publishes no admission disposition', () => {
  const item = record('admission-seed-truncated-pdf-like-v1');
  const binding = bindingFor(item);
  const result = evaluateFixture(item, {
    inputBinding: binding,
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_INPUT_REJECTED'),
  });
  assert.equal(result.operationStatus, OPERATION_STATUS.INPUT_REJECTED);
  assert.equal(result.evidenceCompleteness, COMPLETENESS.INCOMPLETE);
  assertNoDisposition(result);
});

test('classifier pdf result cannot confirm PDF without structural evidence', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const binding = bindingFor(item);
  const result = evaluateFixture(item, {
    inputBinding: binding,
    classifierEvidence: bound(binding, {
      state: 'CLASSIFIER_RESULT_AVAILABLE',
      classifierLabel: 'pdf',
      classifierConfidence: 0.99,
    }),
  });
  assert.equal(result.operationStatus, OPERATION_STATUS.PROVIDER_UNAVAILABLE);
  assert.equal(result.evidenceCompleteness, COMPLETENESS.UNAVAILABLE);
  assertNoDisposition(result);
});

test('classifier non-pdf label cannot override structural acceptance without explicit conflict', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const binding = bindingFor(item);
  const result = evaluateFixture(item, {
    inputBinding: binding,
    classifierEvidence: bound(binding, {
      state: 'CLASSIFIER_RESULT_AVAILABLE',
      classifierLabel: 'zip',
      classifierConfidence: 0.99,
    }),
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_ACCEPTED'),
  });
  assert.equal(result.admissionDisposition, DISPOSITIONS.CONFIRMED_PDF);
});

test('non-material declared metadata conflict is preserved without forcing ambiguity', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const binding = bindingFor(item);
  const conflict = bound(binding, {
    conflictClass: 'DECLARED_VS_STRUCTURAL_MISMATCH',
    evidenceRefs: ['declared-identity', 'structural-evidence'],
    dispositionImpact: CONFLICT_IMPACTS.NONE,
  });
  const result = evaluateFixture(item, {
    inputBinding: binding,
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_ACCEPTED'),
    conflicts: [conflict],
  });
  assert.equal(result.evidenceCompleteness, COMPLETENESS.COMPLETE);
  assert.equal(result.admissionDisposition, DISPOSITIONS.CONFIRMED_PDF);
  assert.equal(result.conflicts.length, 1);
});

test('material same-byte polyglot conflict remains explicit ambiguity', () => {
  const item = record('admission-seed-trailing-inert-bytes-v1');
  const binding = bindingFor(item);
  const conflict = bound(binding, {
    conflictClass: 'POLYGLOT_OR_MIXED_CONTENT_INDICATOR',
    evidenceRefs: ['structural-evidence', 'mixed-content-observation'],
    dispositionImpact: CONFLICT_IMPACTS.AMBIGUOUS,
  });
  const result = evaluateFixture(item, {
    inputBinding: binding,
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_ACCEPTED'),
    conflicts: [conflict],
  });
  assert.equal(result.operationStatus, OPERATION_STATUS.SUCCEEDED);
  assert.equal(result.evidenceCompleteness, COMPLETENESS.CONFLICTING);
  assert.equal(result.admissionDisposition, DISPOSITIONS.AMBIGUOUS_CONTENT_IDENTITY);
});

test('explicit input-identity-change conflict invalidates the evaluation', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const binding = bindingFor(item);
  const conflict = bound(binding, {
    conflictClass: 'INPUT_IDENTITY_CHANGED',
    evidenceRefs: ['preflight-binding', 'reopen-binding'],
    dispositionImpact: CONFLICT_IMPACTS.INVALIDATED,
  });
  const result = evaluateFixture(item, {
    inputBinding: binding,
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_ACCEPTED'),
    conflicts: [conflict],
  });
  assert.equal(result.operationStatus, OPERATION_STATUS.FAILED);
  assert.equal(result.evidenceCompleteness, COMPLETENESS.INVALIDATED);
  assert.equal(result.failureClass, 'PDF_INPUT_IDENTITY_CHANGED_DURING_ADMISSION');
  assertNoDisposition(result);
});

test('stale input binding applied to replacement bytes fails closed', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const originalBytes = bytesFor(item);
  const staleBinding = bindingFor(item, originalBytes);
  const replacementBytes = Buffer.concat([originalBytes, Buffer.from('replacement')]);
  const result = evaluateFixture(item, { bytes: replacementBytes, inputBinding: staleBinding });
  assert.equal(result.evidenceCompleteness, COMPLETENESS.INVALIDATED);
  assert.equal(result.failureClass, 'PDF_INPUT_IDENTITY_CHANGED_DURING_ADMISSION');
  assertNoDisposition(result);
});

test('evidence bound to different bytes fails closed', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const binding = bindingFor(item, bytes);
  const wrong = createContentInputBinding(Buffer.from('different bytes'), {
    sourceKind: SOURCE_KINDS.CANONICAL_DOCUMENT_REVISION,
    documentId: 'wrong',
    inputRevisionId: 'wrong-revision',
  });
  const result = evaluateFixture(item, {
    inputBinding: binding,
    structuralEvidence: structural(wrong, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_ACCEPTED'),
  });
  assert.equal(result.evidenceCompleteness, COMPLETENESS.INVALIDATED);
  assertNoDisposition(result);
});

test('missing nested evidence binding is invalid rather than treated as a match', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const binding = bindingFor(item);
  const result = evaluateFixture(item, {
    inputBinding: binding,
    structuralEvidence: {
      state: 'STRUCTURAL_INSPECTION_COMPLETE',
      structuralIdentityResult: 'PDF_STRUCTURE_ACCEPTED',
    },
  });
  assert.equal(result.operationStatus, OPERATION_STATUS.FAILED);
  assert.equal(result.evidenceCompleteness, COMPLETENESS.INCOMPLETE);
  assert.equal(result.failureClass, 'PDF_ADMISSION_INVALID_EVIDENCE_BINDING');
  assertNoDisposition(result);
});

test('complete structural state without exactly one valid result is invalid evidence', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const binding = bindingFor(item);
  const result = evaluateFixture(item, {
    inputBinding: binding,
    structuralEvidence: bound(binding, { state: 'STRUCTURAL_INSPECTION_COMPLETE' }),
  });
  assert.equal(result.failureClass, 'PDF_ADMISSION_INVALID_EVIDENCE');
  assertNoDisposition(result);
});

test('non-complete structural state cannot carry an authoritative structural result', () => {
  const item = record('admission-seed-truncated-pdf-like-v1');
  const binding = bindingFor(item);
  const result = evaluateFixture(item, {
    inputBinding: binding,
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_INPUT_REJECTED', 'PDF_STRUCTURE_REJECTED'),
  });
  assert.equal(result.failureClass, 'PDF_ADMISSION_INVALID_EVIDENCE');
  assertNoDisposition(result);
});

test('invalid classifier state fails evidence validation', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const binding = bindingFor(item);
  const result = evaluateFixture(item, {
    inputBinding: binding,
    classifierEvidence: bound(binding, { state: 'CLASSIFIER_MAGIC_SUCCESS' }),
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_ACCEPTED'),
  });
  assert.equal(result.failureClass, 'PDF_ADMISSION_INVALID_EVIDENCE');
  assertNoDisposition(result);
});

test('invalid deterministic observation result fails evidence validation', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const binding = bindingFor(item);
  const result = evaluateFixture(item, {
    inputBinding: binding,
    deterministicObservations: [bound(binding, {
      observationRuleId: 'test-rule',
      observationRuleVersion: '1',
      result: 'PROVES_PDF',
    })],
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_ACCEPTED'),
  });
  assert.equal(result.failureClass, 'PDF_ADMISSION_INVALID_EVIDENCE');
  assertNoDisposition(result);
});

test('structural uncertainty can publish UNSUPPORTED_OR_UNCERTAIN after completed evaluation', () => {
  const item = record('admission-seed-truncated-pdf-like-v1');
  const binding = bindingFor(item);
  const result = evaluateFixture(item, {
    inputBinding: binding,
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_UNSUPPORTED_OR_UNCERTAIN'),
  });
  assert.equal(result.operationStatus, OPERATION_STATUS.SUCCEEDED);
  assert.equal(result.evidenceCompleteness, COMPLETENESS.COMPLETE);
  assert.equal(result.admissionDisposition, DISPOSITIONS.UNSUPPORTED_OR_UNCERTAIN);
});

test('non-publishable structural outcomes never synthesize a disposition', async (t) => {
  const item = record('admission-seed-truncated-pdf-like-v1');
  const binding = bindingFor(item);
  const cases = [
    ['STRUCTURAL_INSPECTION_NOT_CONFIGURED', OPERATION_STATUS.PROVIDER_UNAVAILABLE],
    ['STRUCTURAL_INSPECTION_UNAVAILABLE', OPERATION_STATUS.PROVIDER_UNAVAILABLE],
    ['STRUCTURAL_INSPECTION_EXECUTION_FAILED', OPERATION_STATUS.FAILED],
    ['STRUCTURAL_INSPECTION_PASSWORD_REQUIRED', OPERATION_STATUS.INPUT_REJECTED],
    ['STRUCTURAL_INSPECTION_ENCRYPTION_UNSUPPORTED', OPERATION_STATUS.UNSUPPORTED],
    ['STRUCTURAL_INSPECTION_RESOURCE_LIMIT_EXCEEDED', OPERATION_STATUS.RESOURCE_LIMIT_EXCEEDED],
    ['STRUCTURAL_INSPECTION_DEADLINE_EXCEEDED', OPERATION_STATUS.DEADLINE_EXCEEDED],
    ['STRUCTURAL_INSPECTION_CANCELLED', OPERATION_STATUS.CANCELLED],
  ];
  for (const [state, expectedStatus] of cases) {
    await t.test(state, () => {
      const result = evaluateFixture(item, {
        inputBinding: binding,
        structuralEvidence: structural(binding, state),
      });
      assert.equal(result.operationStatus, expectedStatus);
      assertNoDisposition(result);
    });
  }
});

test('unsupported policy requirements fail closed instead of silently changing semantics', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const binding = bindingFor(item);
  const result = evaluateFixture(item, {
    inputBinding: binding,
    policy: { ...POLICY, classifierRequired: true },
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_ACCEPTED'),
  });
  assert.equal(result.operationStatus, OPERATION_STATUS.FAILED);
  assert.equal(result.failureClass, 'PDF_ADMISSION_INVALID_POLICY');
  assertNoDisposition(result);
});

test('admission evaluation is read-only with respect to exact input bytes', () => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const bytes = bytesFor(item);
  const before = Buffer.from(bytes);
  const binding = bindingFor(item, bytes);
  evaluateAdmission({
    bytes,
    inputBinding: binding,
    policy: POLICY,
    structuralEvidence: structural(binding, 'STRUCTURAL_INSPECTION_COMPLETE', 'PDF_STRUCTURE_ACCEPTED'),
  });
  assert.deepEqual(bytes, before);
});

test('malformed top-level evidence containers fail closed instead of normalizing to absence', async (t) => {
  const item = record('admission-seed-ordinary-minimal-v1');
  const binding = bindingFor(item);
  const cases = [
    ['deterministicObservations', { deterministicObservations: {} }],
    ['conflicts', { conflicts: {} }],
    ['declaredIdentity', { declaredIdentity: 'application/pdf' }],
    ['classifierEvidence', { classifierEvidence: false }],
    ['structuralEvidence', { structuralEvidence: false }],
  ];
  for (const [name, overrides] of cases) {
    await t.test(name, () => {
      const result = evaluateFixture(item, { inputBinding: binding, ...overrides });
      assert.equal(result.operationStatus, OPERATION_STATUS.FAILED);
      assert.equal(result.evidenceCompleteness, COMPLETENESS.INCOMPLETE);
      assert.equal(result.failureClass, 'PDF_ADMISSION_INVALID_EVIDENCE');
      assertNoDisposition(result);
    });
  }
});
