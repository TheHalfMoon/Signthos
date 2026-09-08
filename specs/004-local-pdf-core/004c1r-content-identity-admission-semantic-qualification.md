# Specification 004C1R — Content Identity and Admission Semantic Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_SEMANTIC_ONLY / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `a580747cc14f5bb1ff99503d6ef608065f59e029`
Canonical predecessor tree: `5ac7ca926af03ce19b5f8d598ce9097b1a5f34c4`
Authority source: `github:issue-comment:5576579281`
Canonical security-plan predecessor: PR #125 / merge `a580747cc14f5bb1ff99503d6ef608065f59e029`

## 1. Purpose and exact authority

004C1R freezes the provider-neutral semantic contract for **Content Identity and Admission** before any general 004C PDF capability execution.

The canonical source-informed security amendment established the dependency boundary:

```text
UNTRUSTED_INPUT_BYTES
  -> IMMUTABLE_DIGEST_AND_SIZE_PREFLIGHT
  -> DECLARED_IDENTITY_CAPTURE
  -> DETERMINISTIC_BYTE_SIGNATURE_OBSERVATIONS
  -> OPTIONAL_PROBABILISTIC_CONTENT_CLASSIFIER
  -> ISOLATED_BOUNDED_PDF_STRUCTURAL_INSPECTION
  -> CONTENT_IDENTITY_RECONCILIATION
  -> ADMISSION_DISPOSITION
  -> GENERAL_004C_CAPABILITY_EXECUTION
```

004C1R qualifies only the semantics carried across this boundary.

The controlling authority remains the original one-file primary grant. The second path exists only because the later forward-only digest-typing repair authority explicitly allowed one exact companion file; that repair does not broaden the primary semantic authority.

```text
004C1R_AUTHORITY = PLANNING_SEMANTIC_QUALIFICATION_ONLY
004C1R_PRIMARY_AUTHORITY = github:issue-comment:5576579281
004C1R_PRIMARY_ALLOWED_PATH = specs/004-local-pdf-core/004c1r-content-identity-admission-semantic-qualification.md
004C1R_PRIMARY_MAX_CHANGED_FILES = 1
004C1R_REPAIR_AUTHORITY = github:issue-comment:5576663706
004C1R_AUTHORIZED_REPAIR_COMPANION_PATH = specs/004-local-pdf-core/004c1r-algorithm-tagged-nested-digest-correction.md
004C1R_MAX_CHANGED_FILES_AFTER_AUTHORIZED_REPAIR = 2
004C1R_CORRECTION_SYNC_AUTHORITY = github:issue-comment:5576728632
004C1R_IMPLEMENTATION_AUTHORITY = ABSENT
004C1R_CLASSIFIER_SELECTION_AUTHORITY = ABSENT
004C1R_STRUCTURAL_PROVIDER_SELECTION_AUTHORITY = ABSENT
004C1R_RUNTIME_EXECUTION_AUTHORITY = ABSENT
004C1R_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1R_SOURCE_IMPORT_AUTHORITY = ABSENT
004C1R_FIXTURE_ACQUISITION_AUTHORITY = ABSENT
004C1R_NETWORK_PROVIDER_AUTHORITY = ABSENT
004C2_SUCCESSOR_AUTHORITY = NOT_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

No implementation, package, model, fixture, scanner, PDF provider, or runtime is selected or executed by this grain.

## 2. Canonical contracts consumed without reopening

004C1R consumes these canonical predecessor semantics:

1. `DocumentRevision` identifies immutable exact canonical document content.
2. Exact byte identity uses canonical algorithm-tagged `ContentDigest { algorithm, value }`.
3. Digest equality requires equality of both algorithm and value.
4. Read-only operations cannot replace canonical revision bytes or silently create a replacement revision.
5. Provider identity and provider-private handles never become document identity.
6. Unsupported, unavailable, malformed, resource-limited, cancelled, timed-out, and uncertain states remain distinguishable.
7. Local execution cannot silently transition into network processing.
8. Untrusted PDF active content is non-executing by default.
9. Provider output cannot redefine canonical domain state.
10. Raw document content, extracted content, passwords, signing material, and secrets are excluded from ordinary logs.
11. A classifier label is evidence, not structural PDF validity or universal safety evidence.
12. A parser opening bytes is evidence, not malware absence, polyglot absence, sanitization, signature validity, certificate trust, or compliance.
13. Derived or extracted artifacts become new untrusted byte identities and do not inherit parent admission.
14. Admission is read-only with respect to the exact admitted bytes.
15. Authentication/provider/contact identity does not imply resource authorization; authorization remains deny-by-default and must precede privileged document-byte access.

004C1R does not reopen canonical 004A operation/security contracts, canonical 004C read-only capability contracts, canonical 004C algorithm-tagged digest correction, canonical 004C1Q package-control decisions, or the canonical source-informed security amendment.

Content identity evidence never grants resource authorization. A derived-artifact admission may occur only inside an already-authorized parent extraction/quarantine context until that artifact is separately promoted to a canonical document revision.

## 3. Semantic separation of operation status and admission disposition

Operation execution state and content-identity meaning are separate axes.

A future admission operation MUST use the canonical 004A status vocabulary or a compatible specialization:

```text
PdfOperationStatus =
  | SUCCEEDED
  | FAILED
  | CANCELLED
  | DEADLINE_EXCEEDED
  | RESOURCE_LIMIT_EXCEEDED
  | UNSUPPORTED
  | INPUT_REJECTED
  | PROVIDER_UNAVAILABLE
  | PARTIAL_NOT_PUBLISHED
```

An `admissionDisposition` exists only when the admission evaluation itself completed sufficiently to publish a semantic disposition. A failed, cancelled, deadline-exceeded, resource-limited, or partial operation MUST NOT synthesize a successful content disposition merely because some evidence was collected.

The top-level content-identity dispositions are frozen as:

```text
ContentAdmissionDisposition =
  | CONFIRMED_PDF
  | AMBIGUOUS_CONTENT_IDENTITY
  | NOT_PDF
  | UNSUPPORTED_OR_UNCERTAIN
```

These names are exact 004C1R semantic vocabulary.

## 4. Narrow meaning of `CONFIRMED_PDF`

`CONFIRMED_PDF` means only:

> The exact immutable input bytes satisfy the exact separately qualified admission policy for the requested PDF capability, including required structural PDF evidence and all applicable conflict checks.

It does **not** mean:

```text
SAFE_FILE
MALWARE_FREE
NO_ACTIVE_CONTENT
NON_POLYGLOT_UNLESS_EXPLICITLY_PROVEN
SANITIZED
REDACTED_SAFELY
SIGNATURE_VALID
CERTIFICATE_TRUSTED
COMPLIANT
PRODUCTION_READY
RELEASE_READY
```

A probabilistic classifier result, filename, extension, declared media type, byte signature, or parser-open result alone can never establish `CONFIRMED_PDF`.

A future admission policy may omit an optional probabilistic classifier, but it may not omit independently qualified structural PDF evidence when publishing `CONFIRMED_PDF`.

## 5. Exact input binding contract

Every admission evaluation is bound to one exact immutable byte identity and one explicit source-binding class:

```text
ContentInputBinding {
  sourceKind: CANONICAL_DOCUMENT_REVISION | DERIVED_ARTIFACT
  inputExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  byteLength
  documentId?
  inputRevisionId?
  derivedArtifactRef?
  parentOperationRef?
}
```

Rules:

1. `inputExactBytesDigest.algorithm`, `.value`, and `byteLength` are mandatory for every admission input.
2. A `CANONICAL_DOCUMENT_REVISION` binding MUST include `documentId` and `inputRevisionId`; the digest and byte length must match that exact canonical immutable revision.
3. A `DERIVED_ARTIFACT` binding MUST include `derivedArtifactRef` and `parentOperationRef`; `documentId`/`inputRevisionId` may be absent until explicit canonical revision promotion occurs.
4. A derived artifact is not a `DocumentRevision` merely because it has a digest or admission evidence.
5. General 004C inspect/render/search capability execution requires a `CANONICAL_DOCUMENT_REVISION` binding. A pre-promotion derived-artifact admission cannot bypass that requirement.
6. Every admission observation MUST bind to the same exact digest and byte length as its `ContentInputBinding`.
7. A raw digest string without algorithm identity is insufficient.
8. A mutable path, URL, current-document pointer, provider handle, cache key, filename, or media type is never byte identity.
9. A digest or length mismatch creates a new input identity; it is not a warning attached to the prior identity.
10. A new input identity requires a new admission evaluation and evidence record.
11. Source binding is lineage/context evidence; only digest plus length identify the exact bytes.

## 6. TOCTOU and immutable-byte semantics

Admission MUST reason about the same bytes at every stage.

A future implementation must prove behavior equivalent to one of these safe patterns:

- retain an immutable byte buffer/object throughout admission and downstream handoff;
- retain an immutable content-addressed handle bound to the exact `ContentDigest` and length;
- re-hash and re-check length before any stage that must reopen bytes.

Forbidden behavior includes:

- classify path A, then allow a provider to reopen a mutable path whose bytes may have changed;
- classify bytes from one revision/artifact and structurally inspect another;
- use stale cache/provider handles without exact-byte re-binding;
- accept path replacement, symlink substitution, file truncation/growth, or equivalent input replacement as the same evidence identity.

Any observed identity drift terminates the current evaluation as non-success. Previously gathered evidence cannot be reused to admit the replacement bytes.

Candidate specialized machine class:

```text
PDF_INPUT_IDENTITY_CHANGED_DURING_ADMISSION
```

This specializes failure evidence only; it does not replace the canonical 004A operation status contract.

## 7. Declared identity evidence

Caller-supplied identity is preserved independently from observed content:

```text
DeclaredContentIdentity {
  originalFileName?
  declaredExtension?
  declaredMediaType?
  sourceChannel?
}
```

Rules:

1. every declared value is untrusted metadata;
2. declared metadata MUST NOT be silently normalized into observed content truth;
3. disagreement with observed signals is itself audit/security evidence;
4. absence of declared metadata is distinct from an explicit value;
5. a `.pdf` extension or `application/pdf` media type never admits bytes by itself;
6. non-PDF extension/media metadata does not by itself prove `NOT_PDF`;
7. raw filenames may contain sensitive information and are excluded from ordinary logs by default; protected evidence may use a bounded reference instead.

## 8. Deterministic byte-observation semantics

004C1R does not select or implement a detector. It freezes the evidence shape a later detector must produce.

```text
DeterministicContentObservation {
  observationRuleId
  observationRuleVersion
  result
  observedRange?
  claimedContentClass?
  inputExactBytesDigest
  byteLength
  evidenceRef?
}
```

`result` is exactly one of:

```text
DeterministicObservationResult =
  | MATCH
  | NO_MATCH
  | UNAVAILABLE
  | ERROR
```

Rules:

1. every rule is versioned and reproducible;
2. an observed byte range, when relevant, must be bounded and explicit;
3. `NO_MATCH` means only that the exact rule did not match;
4. `NO_MATCH` is not universal proof of `NOT_PDF`;
5. `MATCH` is not full structural validity;
6. absence of a rule result is not equivalent to `NO_MATCH`;
7. deterministic observations are read-only and resource bounded;
8. no observation may silently execute active content or perform a network fetch;
9. positive observations for materially incompatible top-level content classes must remain representable as conflict/polyglot evidence.

Exact byte rules and offsets remain a later separately qualified design/implementation surface.

## 9. Optional probabilistic classifier evidence

A probabilistic classifier is optional evidence in the semantic contract. 004C1R does not select Magika or any alternative.

Classifier state is frozen as:

```text
ClassifierEvidenceState =
  | CLASSIFIER_NOT_CONFIGURED
  | CLASSIFIER_UNAVAILABLE
  | CLASSIFIER_EXECUTION_FAILED
  | CLASSIFIER_UNSUPPORTED_INPUT
  | CLASSIFIER_LOW_CONFIDENCE
  | CLASSIFIER_RESULT_AVAILABLE
```

When classifier evidence exists, it must be semantically capable of binding:

```text
ProbabilisticClassifierEvidence {
  state
  classifierProvider?
  classifierVersion?
  classifierPackageIdentity?
  classifierModelIdentity?
  classifierConfigIdentity?
  classifierMode?
  classifierPolicyRef?
  classifierLabel?
  classifierConfidence?
  executionLocality?
  networkUseEvidence?
  inputExactBytesDigest
  byteLength
  evidenceRef?
}
```

Rules:

1. package, model, and config identities are separate evidence surfaces;
2. label and confidence are separate fields;
3. threshold/fallback policy belongs to explicit policy evidence, not hidden provider behavior;
4. `CLASSIFIER_NOT_CONFIGURED`, `UNAVAILABLE`, `EXECUTION_FAILED`, `UNSUPPORTED_INPUT`, or `LOW_CONFIDENCE` can never silently become `NOT_PDF`;
5. the same states can never silently become `CONFIRMED_PDF`;
6. `CLASSIFIER_RESULT_AVAILABLE` still provides advisory evidence only;
7. a classifier label of `pdf` is not structural validity and cannot prove non-polyglot status;
8. a classifier label of another format cannot override stronger conflicting structural evidence without explicit reconciliation;
9. no silent package/model/config/network fetch is allowed by the semantic contract;
10. a future deterministic provider-only route remains semantically possible when a separately qualified policy proves its required evidence without classifier use.

## 10. Structural PDF inspection evidence

Structural PDF evidence is separate from deterministic signature and classifier evidence.

004C1R does not select or execute a provider. It freezes these evidence states:

```text
PdfStructuralInspectionState =
  | STRUCTURAL_INSPECTION_NOT_CONFIGURED
  | STRUCTURAL_INSPECTION_UNAVAILABLE
  | STRUCTURAL_INSPECTION_EXECUTION_FAILED
  | STRUCTURAL_INSPECTION_INPUT_REJECTED
  | STRUCTURAL_INSPECTION_PASSWORD_REQUIRED
  | STRUCTURAL_INSPECTION_ENCRYPTION_UNSUPPORTED
  | STRUCTURAL_INSPECTION_RESOURCE_LIMIT_EXCEEDED
  | STRUCTURAL_INSPECTION_DEADLINE_EXCEEDED
  | STRUCTURAL_INSPECTION_CANCELLED
  | STRUCTURAL_INSPECTION_COMPLETE
```

A complete inspection has an explicit semantic result:

```text
PdfStructuralIdentityResult =
  | PDF_STRUCTURE_ACCEPTED
  | PDF_STRUCTURE_REJECTED
  | PDF_STRUCTURE_UNSUPPORTED_OR_UNCERTAIN
```

Evidence is equivalent in meaning to:

```text
PdfStructuralInspectionEvidence {
  state
  structuralIdentityResult?
  providerId?
  providerVersionEvidence?
  providerCapabilityVersion?
  activeContentIndicators[]
  embeddedArtifactIndicators[]
  warnings[]
  resourceEvidence?
  localityEvidence?
  networkEvidence?
  inputExactBytesDigest
  byteLength
  evidenceRef?
}
```

Rules:

1. `STRUCTURAL_INSPECTION_COMPLETE` MUST carry exactly one `structuralIdentityResult`, and only then is that result authoritative for reconciliation.
2. Any structural state other than `STRUCTURAL_INSPECTION_COMPLETE` MUST NOT publish an authoritative `structuralIdentityResult`; a state/result contradiction is invalid evidence and cannot be reconciled as complete.
3. `PDF_STRUCTURE_ACCEPTED` means only that the separately qualified structural provider accepted the bytes as PDF under its exact bounded contract.
4. structural acceptance is not malware absence, sanitization, non-polyglot status, signature validity, certificate trust, or universal safety.
5. a provider failure or unavailable state is not `PDF_STRUCTURE_REJECTED`.
6. password-required and unsupported-encryption states remain explicit.
7. resource/deadline/cancellation outcomes remain explicit.
8. active content is not executed to obtain structural evidence.
9. no silent document-content network fetch is permitted.
10. exact provider/version/capability evidence remains implementation qualification, not domain identity.

## 11. Evidence completeness

Admission evidence completeness is separate from content disposition.

```text
ContentIdentityEvidenceCompleteness =
  | COMPLETE_FOR_ADMISSION_POLICY
  | INCOMPLETE_REQUIRED_EVIDENCE
  | REQUIRED_EVIDENCE_UNAVAILABLE
  | CONFLICTING_REQUIRED_EVIDENCE
  | INPUT_IDENTITY_INVALIDATED
```

Rules:

1. `COMPLETE_FOR_ADMISSION_POLICY` requires every evidence class marked required by the exact admission policy;
2. optional classifier absence does not create incompleteness unless that exact policy requires classifier evidence;
3. required provider failure/unavailability cannot be represented as complete evidence;
4. unresolved conflict in evidence required by policy is `CONFLICTING_REQUIRED_EVIDENCE`;
5. digest/length drift is `INPUT_IDENTITY_INVALIDATED` and cannot produce an admission success;
6. evidence completeness does not itself imply a PDF disposition.

## 12. Conflict taxonomy

Conflicting signals must remain machine-readable.

```text
ContentIdentityConflictClass =
  | DECLARED_VS_DETERMINISTIC_MISMATCH
  | DECLARED_VS_CLASSIFIER_MISMATCH
  | DECLARED_VS_STRUCTURAL_MISMATCH
  | DETERMINISTIC_VS_CLASSIFIER_MISMATCH
  | DETERMINISTIC_VS_STRUCTURAL_MISMATCH
  | CLASSIFIER_VS_STRUCTURAL_MISMATCH
  | POLYGLOT_OR_MIXED_CONTENT_INDICATOR
  | INPUT_IDENTITY_CHANGED
  | DERIVED_ARTIFACT_IDENTITY_MISMATCH
```

A conflict record is equivalent in meaning to:

```text
ContentIdentityConflict {
  conflictClass
  evidenceRefs[]
  dispositionImpact
}
```

Rules:

1. declared metadata mismatch is preserved even when admission ultimately succeeds;
2. a credible indication of multiple incompatible top-level interpretations cannot be normalized away;
3. classifier and parser disagreement requires explicit reconciliation;
4. parser acceptance cannot erase positive unrelated-format/polyglot evidence;
5. a classifier `pdf` result cannot erase structural rejection;
6. identity drift invalidates the current evaluation rather than becoming a normal content disagreement.

## 13. Polyglot and mixed-content semantics

A PDF may contain embedded data by design. Embedded content is not automatically a top-level polyglot conflict.

The semantic contract distinguishes:

```text
EMBEDDED_CONTENT_WITHIN_PDF_STRUCTURE
TOP_LEVEL_MIXED_OR_POLYGLOT_INDICATOR
UNRESOLVED_CONTENT_AMBIGUITY
```

Rules:

1. embedded attachments are recorded separately from top-level identity;
2. unrelated executable/archive/script signatures outside expected embedded-object semantics require conflict evidence;
3. safely reproducible mixed/polyglot cases remain a future fixture qualification problem;
4. unresolved top-level polyglot/mixed-content evidence cannot become `CONFIRMED_PDF`;
5. `AMBIGUOUS_CONTENT_IDENTITY` is the required semantic disposition when an otherwise completed evaluation retains unresolved material top-level identity conflict.

## 14. Admission disposition rules

### 14.1 `CONFIRMED_PDF`

May be published only when all are true:

- exact input digest and byte length remain stable;
- operation status is `SUCCEEDED`;
- evidence completeness is `COMPLETE_FOR_ADMISSION_POLICY`;
- the exact policy's required structural inspection completed and supports PDF structure;
- no unresolved material conflict requires ambiguity;
- no required evidence state failed closed;
- the policy does not rely on filename, extension, media type, classifier output, or deterministic signature observation as sole PDF authority.

### 14.2 `AMBIGUOUS_CONTENT_IDENTITY`

Used when the evaluation completed but materially conflicting content-identity evidence remains unresolved, including qualified top-level polyglot/mixed-content indication.

Ambiguity MUST fail closed for general 004C capability execution unless a later capability-specific policy separately and explicitly qualifies a narrower safe path.

### 14.3 `NOT_PDF`

May be published only when a separately qualified admission policy has sufficient positive evidence to reject PDF identity for the exact bytes.

The following alone are insufficient for `NOT_PDF`:

- non-`.pdf` filename/extension;
- non-PDF declared media type;
- classifier not configured;
- classifier unavailable;
- classifier execution failure;
- classifier unsupported input;
- classifier low confidence;
- structural provider unavailable/failure;
- missing evidence.

### 14.4 `UNSUPPORTED_OR_UNCERTAIN`

Used when the evaluation completed enough to report that identity could not be established under the exact policy, without sufficient evidence for `NOT_PDF` and without a resolved material conflict that requires `AMBIGUOUS_CONTENT_IDENTITY`.

Typical semantic causes include unsupported structural features, required evidence that is semantically inconclusive, or a qualified policy that cannot decide the exact bytes.

## 15. Admission policy contract

004C1R freezes the semantic shape of an admission policy but does not select concrete detector/provider/package/model/config bytes.

```text
ContentIdentityAdmissionPolicy {
  policyId
  policyVersion
  capabilityScope[]
  requiredEvidenceClasses[]
  optionalEvidenceClasses[]
  conflictHandlingPolicy
  structuralEvidenceRequirement
  classifierRequirement
  localityRequirement
  networkPolicy
  activeContentPolicy
  resourceBudgetRef
}
```

Rules:

1. every merge-critical disposition binds an exact policy identity/version;
2. hidden provider defaults cannot redefine the policy;
3. classifier use is `OPTIONAL` unless a later separately qualified policy explicitly requires it;
4. structural evidence is mandatory for `CONFIRMED_PDF`;
5. `networkPolicy` cannot silently authorize remote classification or document upload;
6. capability scope is explicit; admission for one bounded capability cannot silently become universal safety admission;
7. policy updates that change security disposition are controlled changes requiring new canonical qualification.

No concrete policy bytes are frozen by 004C1R.

## 16. Canonical admission evidence envelope

A future evidence record is equivalent in meaning to:

```text
ContentIdentityAdmissionEvidence {
  schemaVersion
  operationId
  policyId
  policyVersion
  inputBinding: ContentInputBinding
  declaredIdentity
  deterministicObservations[]
  classifierEvidence?
  structuralInspectionEvidence
  conflicts[]
  evidenceCompleteness
  operationStatus
  admissionDisposition?
  localityEvidence
  networkEvidence
  mutationEvidence
  authorizationEvidenceRef?
  warnings[]
  evidenceRefs[]
}
```

Rules:

1. every nested observation/evidence producer binds the same input digest and length carried by `inputBinding`;
2. when `operationStatus = SUCCEEDED` and `evidenceCompleteness = COMPLETE_FOR_ADMISSION_POLICY`, exactly one of the four `ContentAdmissionDisposition` values MUST be present;
3. `admissionDisposition` MUST be absent when operation status cannot publish a completed disposition, including failed, cancelled, deadline-exceeded, resource-limited, provider-unavailable, input-rejected, and partial-not-published outcomes;
4. a record that violates the status/completeness/disposition relationship is invalid admission evidence and cannot be promoted as a completed semantic result;
5. warnings never replace machine-readable state;
6. provider-private IDs are excluded from canonical document identity;
7. raw document bytes and sensitive extracted content are excluded from ordinary evidence/logs;
8. this envelope is admission evidence, not a security certification or authorization grant;
9. `authorizationEvidenceRef` may record that required authorization occurred, but its presence cannot redefine identity or bypass deny-by-default authorization checks.

## 17. Derived and embedded artifact identity

Every extracted or materialized embedded artifact is a new untrusted byte identity.

The immediate parent may itself be a canonical document revision or another pre-promotion derived artifact. Recursive handling MUST NOT invent a `DocumentRevision` merely to express lineage.

Required semantic evidence is equivalent to:

```text
DerivedArtifactParentBinding {
  parentKind: CANONICAL_DOCUMENT_REVISION | DERIVED_ARTIFACT
  parentExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  parentByteLength
  parentDocumentId?
  parentDocumentRevisionId?
  parentDerivedArtifactRef?
}

DerivedArtifactIdentityEvidence {
  derivedArtifactRef
  parentOperationRef
  parentBinding: DerivedArtifactParentBinding
  embeddedObjectIdentity
  extractedArtifactDigest: ContentDigest {
    algorithm
    value
  }
  extractedArtifactByteLength
  extractionProviderIdentity
  extractionEvidenceRef
  reclassificationRequired = true
}
```

Rules:

1. `parentKind = CANONICAL_DOCUMENT_REVISION` requires `parentDocumentId` and `parentDocumentRevisionId`, and its digest plus `parentByteLength` must match that exact canonical immutable revision.
2. `parentKind = DERIVED_ARTIFACT` requires `parentDerivedArtifactRef`; it MUST NOT fabricate `parentDocumentId` or `parentDocumentRevisionId` for the immediate parent.
3. `parentExactBytesDigest` plus `parentByteLength` bind the exact immediate-parent bytes; `extractedArtifactDigest` plus `extractedArtifactByteLength` independently bind the exact child bytes.
4. derived artifacts never inherit the immediate parent's or root ancestor's `CONFIRMED_PDF` disposition.
5. every materialized artifact requires its own content-identity evaluation before unrelated consumers use it.
6. before canonical revision promotion, that evaluation uses `sourceKind = DERIVED_ARTIFACT`, `derivedArtifactRef`, `parentOperationRef`, exact artifact digest, and byte length.
7. promotion to a canonical `DocumentRevision`, if separately authorized, creates a `CANONICAL_DOCUMENT_REVISION` binding whose digest/length must equal the promoted exact bytes.
8. a digest or length mismatch between parent binding, extraction evidence, admission evidence, promotion evidence, or consumed artifact is a new identity and fails closed.
9. recursive lineage follows explicit immediate-parent derived-artifact references and remains bounded by separately qualified aggregate byte/count/depth/resource/deadline/cancellation budgets.
10. no extracted artifact is automatically executed or network-fetched.
11. attachment identity does not redefine top-level PDF identity.
12. pre-promotion derived-artifact admission does not authorize general 004C inspect/render/search execution.

004C1R creates no fixture or extracted artifact bytes.

## 18. Derived-artifact recursion budget semantics

A later implementation policy must bind explicit recursion/resource budget fields equivalent to:

```text
AdmissionRecursionBudget {
  maxArtifactCount
  maxAggregateExtractedBytes
  maxSingleArtifactBytes
  maxNestedDepth
  memoryBudget?
  cpuBudget?
  wallClockBudget?
  cancellationRef?
}
```

004C1R intentionally does not select numeric limits. Numeric values require later implementation/corpus/resource evidence.

If a required recursion/resource limit is exceeded, traversal fails closed with explicit resource evidence. Partial traversal cannot be published as complete admission evidence.

## 19. Read-only and no-mutation rule

Admission is always read-only with respect to the exact admitted bytes.

```text
ADMISSION_EFFECT_CLASS = READ_ONLY
INPUT_BYTE_MUTATION = FORBIDDEN
INPUT_REVISION_MUTATION = FORBIDDEN_WHEN_REVISION_BOUND
SANITIZE_DURING_ADMISSION = FORBIDDEN
REPAIR_DURING_ADMISSION = FORBIDDEN
NORMALIZE_DURING_ADMISSION = FORBIDDEN
CONVERT_DURING_ADMISSION = FORBIDDEN
REDACT_DURING_ADMISSION = FORBIDDEN
DECOMPRESS_AND_REPACKAGE_DURING_ADMISSION = FORBIDDEN
```

A provider may decode/inspect temporary internal representations only if those representations cannot replace the admitted source bytes.

Sanitize, repair, compression, conversion, redaction, flattening, promotion to a canonical document revision, and similar content/lifecycle changes remain separate capabilities/transitions requiring separate authority and evidence.

## 20. Locality and network semantics

004C1R does not authorize any network provider.

Current semantic requirements are:

```text
DOCUMENT_CONTENT_SILENT_UPLOAD = FORBIDDEN
CLASSIFIER_MODEL_SILENT_FETCH = FORBIDDEN
CLASSIFIER_CONFIG_SILENT_FETCH = FORBIDDEN
EMBEDDED_RESOURCE_AUTOMATIC_FETCH = FORBIDDEN
REMOTE_LLM_SECURITY_SCAN = NOT_AUTHORIZED
DYNAMIC_MCP_SCAN = NOT_AUTHORIZED
```

Any later local classifier or structural provider must record locality/network evidence according to canonical 004A/004C contracts.

A later proposal for explicit network classification or scanning requires separate canonical authority and must not be inferred from the generic `ExecutionLocality` vocabulary.

## 21. Active-content relation

Admission may observe active-content indicators but does not execute them.

```text
ACTIVE_CONTENT_EXECUTION_DURING_ADMISSION = FORBIDDEN
ACTIVE_CONTENT_INDICATOR_PRESENT != MALWARE
ACTIVE_CONTENT_INDICATOR_ABSENT != PROVEN_SAFE
ACTIVE_CONTENT_INSPECTION_UNSUPPORTED != ACTIVE_CONTENT_ABSENT
```

A `CONFIRMED_PDF` disposition does not erase active-content indicators. Capability-specific policy may independently deny general execution when active content is present or cannot be inspected.

## 22. Error and uncertainty routing

004C1R preserves canonical 004A stable error classes and adds no provider-private domain taxonomy.

Admission-specific evidence may specialize failure/uncertainty using bounded machine classes equivalent to:

```text
PDF_INPUT_IDENTITY_CHANGED_DURING_ADMISSION
PDF_CONTENT_IDENTITY_AMBIGUOUS
PDF_CONTENT_IDENTITY_UNCERTAIN
PDF_ADMISSION_REQUIRED_EVIDENCE_UNAVAILABLE
PDF_ADMISSION_EVIDENCE_CONFLICT
```

Rules:

1. these are semantic specializations, not implementation exceptions;
2. classifier/provider-specific errors normalize into canonical operation/evidence state;
3. malformed input, unsupported features/encryption, password-required/invalid-password outcomes, provider unavailability, cancellation, deadline, and resource exhaustion remain distinguishable according to canonical 004A/004C contracts;
4. missing/unavailable evidence never becomes a clean scan or successful content claim;
5. ambiguity and uncertainty remain distinguishable;
6. exact error-to-status mapping is qualified with any future implementation contract.

## 23. Prohibited inference table

| Observed evidence | Prohibited inference |
| --- | --- |
| filename ends in `.pdf` | content is PDF |
| declared `application/pdf` | content is PDF |
| deterministic PDF signature match | full structural validity |
| classifier label `pdf` | structural validity or safety |
| classifier label non-PDF | definitive `NOT_PDF` without qualified policy evidence |
| parser accepts bytes | malware-free or non-polyglot |
| active-content indicator absent | active content proven absent unless inspection coverage is qualified |
| scanner reports zero findings | safe file |
| SARIF exists | scan complete |
| signature object parses | signature cryptographically valid |
| `CONFIRMED_PDF` | sanitized, compliant, production-ready, or release-ready |

No later adapter may promote a weak evidence class into one of these stronger claims without separate owning-spec evidence.

## 24. No dependency/provider/source decision

004C1R intentionally does not answer:

- whether Magika will be used;
- how Magika or another classifier would be packaged;
- whether a classifier is used on every platform;
- exact model/config bytes or digests;
- exact classifier thresholds;
- exact deterministic byte rules/offsets;
- exact structural admission provider;
- exact package manager/workspace/lockfile bytes;
- exact adversarial fixture bytes;
- exact recursion numeric limits;
- exact runtime resource numeric limits;
- exact implementation language or module path.

Those are later separately authorized qualification surfaces.

## 25. Explicit non-grants

```text
SOURCE_IMPORT = NOT_AUTHORIZED
DONOR_SOURCE_COPY = NOT_AUTHORIZED
MAGIKA_DEPENDENCY_ADOPTION = NOT_AUTHORIZED
MAGIKA_MODEL_IMPORT = NOT_AUTHORIZED
MAGIKA_RUNTIME = NOT_AUTHORIZED
CLASSIFIER_SELECTION = NOT_AUTHORIZED
CLASSIFIER_PACKAGE_OR_BINARY_ACQUISITION = NOT_AUTHORIZED
CLASSIFIER_EXECUTION = NOT_AUTHORIZED
PDF_PROVIDER_SELECTION_CHANGE = NOT_AUTHORIZED
PDF_PROVIDER_RUNTIME = NOT_AUTHORIZED
CONTENT_IDENTITY_IMPLEMENTATION = NOT_AUTHORIZED
ADMISSION_IMPLEMENTATION = NOT_AUTHORIZED
EXTERNAL_FIXTURE_ACQUISITION = NOT_AUTHORIZED
SYNTHETIC_FIXTURE_BYTE_GENERATION = NOT_AUTHORIZED
SECURITY_SCANNER_EXECUTION = NOT_AUTHORIZED
REMOTE_LLM_SECURITY_SCAN = NOT_AUTHORIZED
DYNAMIC_MCP_SCAN = NOT_AUTHORIZED
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_MUTATION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
NPMRC_MUTATION = NOT_AUTHORIZED
PACKAGE_MANAGER_OR_RESOLVER_EXECUTION = NOT_AUTHORIZED
DEPENDENCY_ACQUISITION_OR_INSTALL = NOT_AUTHORIZED
WORKFLOW_OR_CONTAINER_MUTATION = NOT_AUTHORIZED
DATABASE_OR_MIGRATION_MUTATION = NOT_AUTHORIZED
ROADMAP_OWNERSHIP_CHANGE = NOT_AUTHORIZED
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 26. Qualification acceptance rules

004C1R may become canonical only if all remain true:

1. exact canonical base is `a580747cc14f5bb1ff99503d6ef608065f59e029`;
2. the primary semantic change remains confined to `specs/004-local-pdf-core/004c1r-content-identity-admission-semantic-qualification.md`, and the only additional changed path is the separately authorized digest-typing repair companion `specs/004-local-pdf-core/004c1r-algorithm-tagged-nested-digest-correction.md` under `github:issue-comment:5576663706` and representational synchronization authority `github:issue-comment:5576728632`; final changed-file count is exactly two;
3. no package/runtime/source/fixture/workflow/database/provenance/NOTICE/SBOM surface changes;
4. canonical `ContentDigest { algorithm, value }` semantics are preserved;
5. exact digest plus byte length are mandatory for both canonical-revision and derived-artifact admission inputs;
6. canonical document/revision binding is mandatory whenever the input is a canonical revision and before general 004C capability execution;
7. pre-promotion derived artifacts are representable recursively without inventing a `DocumentRevision`, remain bound to exact immediate-parent and child identities, and cannot bypass later revision binding;
8. resource authorization remains separate from identity and precedes privileged byte access;
9. operation status remains separate from admission disposition;
10. a successful evaluation complete for its exact admission policy publishes exactly one of the four admission dispositions, while non-publishable operation outcomes publish none;
11. classifier unavailable/error/low-confidence states cannot become `NOT_PDF` or `CONFIRMED_PDF`;
12. `CONFIRMED_PDF` requires separately qualified structural PDF evidence and cannot rely on classifier/metadata/signature alone;
13. `STRUCTURAL_INSPECTION_COMPLETE` carries exactly one structural identity result and contradictory state/result combinations are invalid evidence;
14. immutable-byte/TOCTOU identity drift invalidates the current evaluation;
15. polyglot/mixed-content ambiguity remains explicit;
16. derived artifacts become new untrusted identities with bounded recursion semantics;
17. admission remains read-only with no silent network or active-content execution;
18. security/signing/compliance/release inferences remain prohibited;
19. exact-head Actions/check/provider state is recorded truthfully;
20. fresh independent substantive exact-head review completes;
21. every material finding is repaired forward-only and any changed head receives fresh review;
22. unresolved material review threads are zero;
23. immediate premerge race proof confirms unchanged base/head/tree/scope/authority and current mergeability/rules state;
24. guarded normal merge uses exact `expected_head_sha`;
25. post-merge proof establishes canonical main, ordered parents, reviewed-head/merge-tree equality, signature, exact two-file authorized surface, and truthful post-merge workflow/status state;
26. successor authority is derived only from fresh post-merge canonical truth.

## 27. Qualification result candidate

If the exact candidate passes the required qualification gates, its semantic result is:

```text
004C1R_CONTENT_IDENTITY_ADMISSION_SEMANTICS = QUALIFIED_CANDIDATE
INPUT_BYTE_IDENTITY = ALGORITHM_TAGGED_DIGEST_PLUS_BYTE_LENGTH
CANONICAL_REVISION_BINDING = REQUIRED_WHEN_REVISION_BOUND_AND_BEFORE_GENERAL_004C_RUNTIME
DERIVED_ARTIFACT_BINDING = EXPLICIT_PRE_PROMOTION_IDENTITY_ALLOWED
DERIVED_ARTIFACT_PARENT_BINDING = CANONICAL_REVISION_OR_DERIVED_ARTIFACT
DERIVED_PARENT_AND_CHILD_LENGTHS = INDEPENDENTLY_BOUND
RESOURCE_AUTHORIZATION = SEPARATE_DENY_BY_DEFAULT_GATE
DECLARED_METADATA = UNTRUSTED_EVIDENCE_ONLY
DETERMINISTIC_OBSERVATIONS = EVIDENCE_NOT_FULL_VALIDITY
PROBABILISTIC_CLASSIFIER = OPTIONAL_ADVISORY_EVIDENCE
STRUCTURAL_PDF_EVIDENCE = REQUIRED_FOR_CONFIRMED_PDF
STRUCTURAL_COMPLETE_RESULT = EXACTLY_ONE_REQUIRED
COMPLETED_SUCCESS_DISPOSITION = EXACTLY_ONE_REQUIRED
TOCTOU_IDENTITY_DRIFT = INVALIDATES_CURRENT_EVALUATION
POLYGLOT_OR_MIXED_CONTENT = EXPLICIT_AMBIGUITY_WHEN_UNRESOLVED
DERIVED_ARTIFACT = NEW_UNTRUSTED_IDENTITY
ADMISSION_EFFECT = READ_ONLY
SILENT_NETWORK = FORBIDDEN
ACTIVE_CONTENT_EXECUTION = FORBIDDEN
IMPLEMENTATION = NOT_AUTHORIZED
DEPENDENCY_ADOPTION = NOT_AUTHORIZED
PROVIDER_RUNTIME = NOT_AUTHORIZED
NEXT_SUCCESSOR = NOT_YET_DERIVED
```

## 28. Completion boundary

004C1R closes only the provider-neutral **meaning** of content identity and PDF admission.

It does not prove that any detector, classifier, model, structural provider, fixture corpus, package route, browser environment, native environment, or runtime implementation satisfies that meaning.

After canonical merge, fresh governance reconciliation may consider the next smallest dependency-ordered qualification, likely classifier integration/provenance or another still-required package/control prerequisite, but no successor name, implementation surface, dependency acquisition, provider execution, 004C2, 004D, or Specification 005 authority is automatic.