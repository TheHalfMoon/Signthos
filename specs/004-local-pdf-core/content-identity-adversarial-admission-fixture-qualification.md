# Specification 004 — Content Identity Adversarial Admission Fixture Qualification

Status: `PLANNING_ADVERSARIAL_ADMISSION_FIXTURE_QUALIFICATION_ONLY / ZERO_FIXTURE_BYTES / ZERO_RUNTIME`
Issue: #7
Canonical base: `b486a454f973ad79386ba06b4de7914b9c53874e`
Authority: `github:issue-comment:5582229593`
Canonical predecessor: `CONTENT_IDENTITY_CLASSIFIER_INTEGRATION_PROVENANCE_QUALIFICATION = CLOSED_CANONICAL`

## 1. Purpose

This grain qualifies the evidence contract and fixture-family design required to test the canonical content-identity and admission boundary before any admission implementation is authorized.

It defines how future adversarial fixtures must be identified, sourced or generated, licensed, versioned, expected, and evaluated. It does not create, import, download, generate, parse, classify, execute, mutate, or redistribute fixture bytes.

The purpose is to ensure that later implementation evidence is bound to exact known bytes and expected observations rather than informal filenames, MIME labels, screenshots, scanner summaries, or mutable external references.

## 2. Canonical predecessor semantics consumed without reopening

The following canonical rules remain authoritative:

- every input is untrusted bytes;
- declared filename, extension, MIME type, browser media type, upload metadata, and source-channel labels are untrusted evidence;
- every admission observation binds to the same immutable exact-byte identity and byte length;
- digest equality requires equality of `algorithm` and `value`;
- a probabilistic classifier is advisory evidence only;
- classifier unavailable, unsupported, failed, or low-confidence is not `NOT_PDF`;
- classifier label `pdf` is not sufficient for `CONFIRMED_PDF`;
- successful PDF structural open is one observation, not universal safety, sanitization, malware absence, non-polyglot status, signature validity, compliance, or release readiness;
- conflicting identity signals remain explicit evidence;
- embedded or extracted artifacts are new untrusted identities and do not inherit parent admission state;
- admission is read-only and must not silently normalize, sanitize, repair, convert, rewrite, or otherwise mutate the input;
- general 004C capability execution remains downstream of qualified admission.

## 3. Authority and allowed surface

The live successor authorization is intentionally narrow:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = CONTENT_IDENTITY_ADVERSARIAL_ADMISSION_FIXTURE_QUALIFICATION
AUTHORITY_CLASS = PLANNING_ADVERSARIAL_ADMISSION_FIXTURE_QUALIFICATION_ONLY
CANONICAL_BASE = b486a454f973ad79386ba06b4de7914b9c53874e
ALLOWED_PATH = specs/004-local-pdf-core/content-identity-adversarial-admission-fixture-qualification.md
MAX_CHANGED_FILES = 1
```

No fixture or runtime path is authorized by this grain.

## 4. Explicit non-grants

```text
EXTERNAL_FIXTURE_ACQUISITION = NOT_AUTHORIZED
EXTERNAL_FIXTURE_IMPORT = NOT_AUTHORIZED
SYNTHETIC_FIXTURE_GENERATION = NOT_AUTHORIZED
FIXTURE_BYTES_COMMIT = NOT_AUTHORIZED
PDF_OR_NON_PDF_FIXTURE_EXECUTION = NOT_AUTHORIZED
CLASSIFIER_RUNTIME_EXECUTION = NOT_AUTHORIZED
STRUCTURAL_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
MAGIKA_PACKAGE_OR_MODEL_ADOPTION = NOT_AUTHORIZED
DEPENDENCY_ACQUISITION_OR_INSTALLATION = NOT_AUTHORIZED
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_MUTATION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
NPMRC_MUTATION = NOT_AUTHORIZED
CONTENT_IDENTITY_IMPLEMENTATION = NOT_AUTHORIZED
ADMISSION_IMPLEMENTATION = NOT_AUTHORIZED
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 5. Fixture identity contract

Every future admitted fixture must be represented by an immutable record equivalent to:

```text
AdmissionFixtureRecord {
  fixtureId
  fixtureSchemaVersion
  fixtureClass
  constructionClass

  exactBytesDigest: ContentDigest {
    algorithm
    value
  }
  byteLength

  sourceEvidence
  rightsEvidence
  provenanceEvidence

  declaredIdentityInputs
  deterministicExpectedObservations
  classifierExpectedEvidence
  structuralExpectedEvidence
  reconciliationExpectedEvidence
  admissionExpectedDisposition

  resourceExpectation
  recursionExpectation?
  mutationExpectation
  confidentialityClass
  evidenceCompleteness
}
```

A fixture name is not an identity. A source URL is not an identity. A Git commit without exact fixture path and exact distributed-byte digest is not final fixture identity.

## 6. Construction classes

Future fixtures must declare exactly one construction class:

```text
SIGNTHOS_AUTHORED_SYNTHETIC
EXTERNAL_EXACT_BYTES
EXTERNAL_DERIVED_WITH_RECORDED_TRANSFORMATION
PROGRAMMATICALLY_GENERATED_FROM_SIGNTHOS_SPEC
COMPOSITE_OR_POLYGLOT_WITH_RECORDED_CONSTRUCTION
```

The class determines required provenance and rights evidence.

No construction class is authorized for byte materialization by this planning grain.

## 7. Source and provenance requirements

For external exact-byte fixtures, future evidence must bind:

```text
ExternalFixtureSourceEvidence {
  sourceRepositoryOrPublisher
  sourceRevisionOrRelease
  exactSourcePathOrArtifact
  sourceArtifactIdentity
  retrievalDate
  immutableRetrievalReference?
  transformationClass
  intendedRepositoryDestination
}
```

For generated fixtures, future evidence must bind:

```text
SyntheticFixtureGenerationEvidence {
  generatorIdentity
  generatorVersionOrCommit
  generationSpecificationIdentity
  deterministicSeed?
  parameters
  environmentIdentity?
  generatedExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  generatedByteLength
}
```

A later generation unit must prove whether generation is deterministic. If deterministic reproduction is not guaranteed, the resulting exact bytes become the canonical fixture identity after generation.

## 8. Rights and license boundary

Every fixture requires a rights basis independent of technical usefulness.

Future rights evidence must distinguish:

- Signthos-authored synthetic bytes;
- public-domain or equivalent source material;
- permissively licensed test material;
- restricted redistribution material;
- standards/certification corpora with special terms;
- malware/executable/security samples with separate handling constraints;
- third-party documents containing copyrighted text, images, fonts, signatures, personal data, or embedded assets.

A repository-level license cannot be assumed to cover every embedded fixture asset.

If redistribution rights are absent or ambiguous, the fixture must remain out of the repository unless a later canonical unit provides exact permission or uses a non-redistributed test mechanism that is separately qualified.

## 9. No PHI, secrets, or real signing material

Future fixture acquisition or generation must not introduce:

- protected health information;
- real private keys;
- real production signing credentials;
- live access tokens or secrets;
- private customer documents;
- unnecessary personal data;
- real regulated identity documents unless separately authorized with exact legal/privacy handling.

Synthetic substitutes are preferred when they preserve the security property under test.

## 10. Declared identity inputs

Each fixture may intentionally carry misleading declared identity metadata.

```text
DeclaredIdentityInputs {
  fileName?
  extension?
  mediaType?
  sourceChannel?
}
```

These fields are expected inputs, not fixture truth.

Mismatch between declared identity and observed identity is itself expected evidence for relevant adversarial classes.

## 11. Deterministic byte-signature expectation contract

A fixture may define expected deterministic observations without claiming those observations are sufficient for admission.

```text
DeterministicSignatureExpectation {
  observationId
  expectedState
  expectedValue?
  requiredForFixturePurpose
  rationale
}
```

Expected observations must be defined against exact bytes and an explicitly qualified observation algorithm/version before implementation evidence can be treated as reproducible.

## 12. Classifier expectation contract

Classifier expectations must preserve advisory semantics.

```text
ClassifierExpectation {
  applicability
  expectedStateSet
  expectedLabelSet?
  confidenceConstraint?
  providerSpecificExpectation?
  exactClassifierIdentityRequired
  exactInputBindingRequired = TRUE
}
```

A future fixture must not require one probabilistic score as universal truth unless the exact model, config, package/runtime, mode, and threshold policy are fixed.

Portable fixtures should prefer invariant expectations such as:

- classifier result is bound to the exact input digest;
- unavailable does not become `NOT_PDF`;
- low confidence remains explicit;
- a `pdf` label cannot bypass structural admission;
- a non-`pdf` label cannot override stronger deterministic/structural evidence without canonical policy.

## 13. Structural inspection expectation contract

```text
StructuralInspectionExpectation {
  applicability
  expectedStateSet
  malformedIndicators?
  encryptionState?
  activeContentIndicators?
  embeddedArtifactIndicators?
  resourceLimitOutcome?
  exactProviderIdentityRequired
  exactInputBindingRequired = TRUE
}
```

A future structural expectation is valid only for a qualified provider/version/configuration. Parser-specific acceptance cannot be promoted to universal PDF truth.

## 14. Reconciliation and admission expectation

Each fixture family must define what the admission policy is intended to exercise.

```text
AdmissionExpectation {
  conflictingSignalsExpected
  evidenceCompletenessExpectation
  permittedDispositionSet
  forbiddenDispositionSet
  rationale
}
```

The canonical candidate dispositions remain:

```text
CONFIRMED_PDF
AMBIGUOUS_CONTENT_IDENTITY
NOT_PDF
UNSUPPORTED_OR_UNCERTAIN
```

A fixture may permit more than one disposition when the canonical policy intentionally leaves a provider-dependent or capability-dependent uncertainty boundary. Such flexibility must be explicit rather than treated as nondeterministic test success.

## 15. Core fixture-family matrix

The future corpus must cover, at minimum, these classes where rights and safe construction permit.

### A. Ordinary PDF controls

- minimal valid PDF;
- typical multi-page PDF;
- PDF with common fonts/images;
- Arabic/RTL content;
- unusual but valid incremental structure;
- encrypted PDF with known synthetic credential;
- PDF with benign annotations/forms/attachments.

Purpose: prevent adversarial policy from rejecting ordinary supported PDF structures by default.

### B. Declared-identity mismatch

- non-PDF bytes named `.pdf`;
- non-PDF bytes declared `application/pdf`;
- valid PDF named with a non-PDF extension;
- valid PDF with conflicting caller MIME;
- filename and MIME disagreement.

Expected invariant: declared metadata never becomes content truth.

### C. Deterministic signature ambiguity

- PDF header present but structurally invalid;
- leading bytes before PDF marker where policy permits observation;
- truncated PDF after plausible header;
- appended payload after an otherwise parseable PDF;
- signature-like bytes inside non-PDF content.

Expected invariant: bounded byte signatures are evidence, not full validity.

### D. Structural malformed inputs

- malformed xref structures;
- malformed object references;
- cyclic/deep object graphs where safely reproducible;
- damaged incremental chains;
- malformed streams;
- truncated objects/streams;
- parser limit cases.

Expected invariant: failure remains explicit and resource bounded.

### E. Active-content and external-action cases

- document JavaScript indicators;
- launch/action indicators;
- URI/external-reference indicators;
- embedded-file indicators;
- forms/XFA indicators where safely constructible.

Expected invariant: inspection does not execute active content or silently fetch network resources.

### F. Probabilistic classifier stress

- classifier low-confidence candidate;
- classifier unknown/unsupported candidate;
- classifier unavailable state exercised through test harness configuration rather than fake file truth;
- classifier label disagreement with deterministic/structural evidence.

Expected invariant: classifier evidence remains advisory and non-collapsible.

### G. Polyglot and mixed-content ambiguity

- safely reproducible appended payload candidate;
- mixed-format candidate where both interpretations are technically meaningful;
- archive/executable/script-like bytes presented as PDF;
- valid PDF with embedded non-PDF artifact.

Expected invariant: ambiguity is explicit; `pdf` classification or parser acceptance is not a non-polyglot proof.

### H. Resource and decompression stress

- oversized declared length scenarios;
- deep nesting;
- large image/font/object structures;
- high object counts;
- compressed-stream expansion cases that are safe to maintain;
- cancellation/deadline cases.

Expected invariant: limit outcomes are explicit and cannot become successful admission through partial evidence.

### I. Derived-artifact recursion

- PDF with one embedded benign artifact;
- PDF with embedded artifact whose declared type mismatches exact bytes;
- nested archive/document artifact where safely supported;
- artifact-count boundary;
- aggregate extracted-byte boundary;
- recursion-depth boundary.

Expected invariant: every extracted artifact receives a new exact-byte identity and independent admission evidence.

### J. TOCTOU and substitution regression

Future harness-only cases must simulate:

- path contents changing after digest capture;
- alias/symlink/reopen substitution where relevant to the selected provider;
- stale classifier evidence applied to replacement bytes;
- structural evidence produced from different bytes than classifier evidence;
- downstream provider reopening mutable path state.

Expected invariant: evidence bound to different exact bytes cannot be reconciled into successful admission.

## 16. Resource expectation contract

```text
FixtureResourceExpectation {
  maxInputBytes?
  maxPages?
  maxObjects?
  maxEmbeddedArtifacts?
  maxAggregateDerivedBytes?
  maxNestedDepth?
  cpuBudgetClass?
  memoryBudgetClass?
  deadlineClass?
  expectedLimitDisposition?
}
```

Planning fixture records may identify the limit dimension under test without inventing numeric production limits that have not been qualified.

Numeric budgets belong to a later provider/runtime qualification unless a prior canonical contract already fixes them.

## 17. Recursion expectation contract

Derived-artifact fixtures must express parentage without inventing a `DocumentRevision` for bytes that have not been promoted into the canonical document model.

```text
DerivedArtifactExpectation {
  parentArtifactExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  embeddedObjectIdentity
  childExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  childByteLength
  expectedDepth
  expectedIndependentAdmission = TRUE
}
```

Every nested digest is algorithm tagged.

## 18. Mutation expectation

Admission fixture execution is read-only.

```text
MutationExpectation {
  inputBytesMustRemainIdentical = TRUE
  outputDocumentRevisionExpected = FALSE
  sanitizerOrRepairOutputExpected = FALSE
}
```

If a later test requires repair, sanitize, conversion, redaction, or extraction output, that output belongs to a separately authorized revision-creating or derived-artifact capability and must not be mislabeled as admission inspection.

## 19. Evidence completeness

Future fixture execution results must distinguish:

```text
FIXTURE_IDENTITY_COMPLETE
FIXTURE_RIGHTS_COMPLETE
DETERMINISTIC_OBSERVATION_COMPLETE
CLASSIFIER_NOT_APPLICABLE
CLASSIFIER_NOT_CONFIGURED
CLASSIFIER_UNAVAILABLE
CLASSIFIER_EXECUTION_FAILED
CLASSIFIER_RESULT_COMPLETE
STRUCTURAL_NOT_CONFIGURED
STRUCTURAL_UNAVAILABLE
STRUCTURAL_EXECUTION_FAILED
STRUCTURAL_RESULT_COMPLETE
RECONCILIATION_COMPLETE
ADMISSION_RESULT_COMPLETE
```

Missing evidence cannot be encoded as a clean result.

## 20. Expected-result integrity

Expected outcomes must be authored before the corresponding implementation result is accepted as qualification evidence, except where a dedicated discovery fixture is explicitly marked as exploratory.

A later implementation unit must prevent:

- rewriting expected results merely to match implementation output;
- accepting a scanner/classifier/provider summary without exact evidence binding;
- treating test harness crash as rejection success;
- treating skipped classifier or structural stages as clean evidence;
- treating timeout or resource termination as ordinary `NOT_PDF`;
- using file extension as the oracle.

## 21. Negative-control discipline

The future corpus must contain both positive and negative controls for each material decision boundary.

Examples:

- valid PDF vs non-PDF with `.pdf` extension;
- structurally valid unusual PDF vs malformed PDF with plausible header;
- embedded artifact expected vs no-attachment control;
- classifier available vs intentionally unavailable harness state;
- exact digest match vs controlled substitution mismatch.

This prevents a policy from appearing correct by rejecting every difficult input.

## 22. Fixture metadata must not become implementation authority

A fixture record can define evidence expectations. It cannot authorize:

- dependency installation;
- model acquisition;
- parser execution;
- network access;
- unsafe sample handling;
- privileged sandbox escape testing;
- provider implementation;
- package/workspace changes.

Each runtime action requires its own canonical unit.

## 23. Safe handling classes

Future fixture records should classify operational handling:

```text
ORDINARY_TEST_BYTES
RESOURCE_STRESS_BYTES
ACTIVE_CONTENT_TEST_BYTES
POLYGLOT_OR_MIXED_FORMAT_TEST_BYTES
MALWARE_LIKE_BUT_INERT_SYNTHETIC_BYTES
RESTRICTED_SECURITY_SAMPLE
```

`RESTRICTED_SECURITY_SAMPLE` must fail closed for repository inclusion unless exact rights, handling, and execution safeguards are separately authorized.

This planning grain does not authorize real malware acquisition or execution.

## 24. Corpus versioning

A future materialized corpus must have an immutable corpus identity computed from an ordered manifest of exact fixture records.

Candidate structure:

```text
AdmissionCorpusIdentity {
  schemaVersion
  corpusVersion
  orderedFixtureRecordDigests[]
  manifestDigest: ContentDigest {
    algorithm
    value
  }
}
```

The exact canonical serialization algorithm must be separately frozen before this becomes merge-critical runtime evidence.

## 25. Fixture update policy

A fixture byte change creates a new fixture identity.

Updates must not silently replace bytes under the same fixture ID without an explicit version transition.

A future update record should bind:

- previous fixture identity;
- new fixture identity;
- reason for change;
- rights/provenance delta;
- expected-observation delta;
- affected admission policy cases;
- corpus-version transition.

## 26. External-source research disposition

External public examples may be useful for identifying attack classes, but source discovery does not authorize copying sample bytes.

Future fixture acquisition must prefer, in order:

1. Signthos-authored deterministic synthetic fixtures when they faithfully exercise the required property;
2. small permissively redistributable exact fixtures with clear path-level rights;
3. externally referenced but non-redistributed fixtures only under a separately qualified reproducible retrieval/testing mechanism;
4. restricted security samples only when indispensable and separately authorized.

No mutable URL or branch reference is sufficient final fixture identity.

## 27. Relationship to Magika qualification

The canonical classifier integration/provenance qualification remains planning evidence only.

Future classifier-exercising fixtures must not pin expectations merely to `Magika` as a product name. They must bind the exact selected provider/package/model/config/runtime identity before probabilistic expectations can become qualification evidence.

A provider-neutral fixture may instead assert invariant behavior such as preserving low confidence, preserving unavailable state, and refusing to convert a classifier label into universal safety truth.

## 28. Relationship to structural PDF provider qualification

No structural provider is selected by this grain.

Future provider-specific expected structural observations must be added only after exact provider identity and runtime authority exist.

Provider-neutral fixture families may define the security property to exercise without inventing unsupported parser-specific expected values.

## 29. Relationship to source-informed security plan

This grain implements the next planning dependency from the canonical sequence:

```text
content-identity/admission semantic qualification
  -> classifier integration-route and package/model/config provenance qualification
      -> adversarial admission fixture qualification
          -> bounded provider-neutral admission implementation
              -> general inspect/render/search runtime qualification
```

This grain closes only the third planning dependency above. It does not authorize the fourth.

## 30. Acceptance gates for this planning grain

This planning grain qualifies only if all of the following are true:

1. canonical base remains `b486a454f973ad79386ba06b4de7914b9c53874e` through premerge race verification;
2. changed surface is exactly this one Signthos-authored planning file;
3. zero fixture bytes are created, imported, downloaded, generated, executed, parsed, classified, or redistributed;
4. zero source/model/package/binary/runtime bytes are acquired;
5. every digest-bearing schema field is explicitly algorithm tagged with `ContentDigest { algorithm, value }`;
6. declared identity remains untrusted evidence;
7. classifier expectations remain advisory and exact-identity-bound;
8. structural expectations do not become universal safety claims;
9. polyglot ambiguity remains explicit;
10. classifier unavailable/failure cannot become `NOT_PDF`;
11. derived artifacts receive independent exact-byte identities and recursion expectations;
12. resource-limit outcomes cannot become ordinary success;
13. rights/provenance requirements are explicit for every future fixture class;
14. the candidate does not invent numeric production budgets absent canonical evidence;
15. Actions/check/provider accounting is truthful;
16. a fresh independent substantive exact-head review finds no unresolved material defect;
17. unresolved material review threads are zero;
18. immediate race verification confirms exact base/head/tree/surface/authority;
19. guarded normal merge uses the exact reviewed head;
20. postmerge verification proves canonical main, parents, tree, signature and exact surface.

## 31. Successor boundary

If this planning grain becomes canonical, no successor is implied automatically.

The source-informed sequence suggests a bounded provider-neutral admission implementation next, but implementation authority remains absent until a fresh canonical reread proves dependency readiness and names exact paths, tests, runtime/provider boundaries, fixture materialization authority, and evidence requirements.

A later canonical successor analysis must decide whether fixture materialization itself needs one or more separate grains before any admission implementation can be meaningfully executed.

## 32. Canonical candidate state

Until guarded merge and postmerge verification complete:

```text
CONTENT_IDENTITY_ADVERSARIAL_ADMISSION_FIXTURE_QUALIFICATION = CANDIDATE_ONLY
EXTERNAL_FIXTURE_ACQUISITION = NOT_AUTHORIZED
SYNTHETIC_FIXTURE_GENERATION = NOT_AUTHORIZED
FIXTURE_BYTES_COMMIT = NOT_AUTHORIZED
CLASSIFIER_RUNTIME_EXECUTION = NOT_AUTHORIZED
STRUCTURAL_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
CONTENT_IDENTITY_IMPLEMENTATION = NOT_AUTHORIZED
ADMISSION_IMPLEMENTATION = NOT_AUTHORIZED
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
