# Specification 004C1R — Algorithm-Tagged Nested Digest Correction

Status: `FORWARD_ONLY_REVIEW_REPAIR / PLANNING_SEMANTIC_ONLY / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Primary candidate: `specs/004-local-pdf-core/004c1r-content-identity-admission-semantic-qualification.md`
Repair authority: `github:issue-comment:5576663706`
Synchronization authority: `github:issue-comment:5576728632`
Self-review finding: `github:issue-comment:5576645937`
Original superseded candidate head: `66a074844d483d605d9ab235472f99c3924aa18c`
Original superseded candidate tree: `7573e5146eb8d4bd5f5c560de26f81a5511f6eed`

## 1. Purpose and precedence

This forward-only correction repairs one material semantic ambiguity in the 004C1R candidate: nested exact-byte digest fields must explicitly use the canonical algorithm-tagged digest type.

```text
ContentDigest {
  algorithm
  value
}
```

The primary 004C1R artifact remains authoritative for every non-digest field, source-binding rule, admission disposition, evidence state, authorization rule, derived-artifact lifecycle rule, locality/network rule, error rule, non-grant, and successor boundary.

```text
NON_DIGEST_SCHEMA_AUTHORITY = PRIMARY_004C1R_ARTIFACT
DIGEST_TYPING_CORRECTION_AUTHORITY = THIS_ARTIFACT
CORRECTION_MAY_REMOVE_OR_REDEFINE_PRIMARY_NON_DIGEST_FIELDS = FALSE
```

This correction supersedes only ambiguous nested digest representation. If an example here and the current primary artifact differ outside digest typing, the current primary artifact controls.

## 2. Canonical exact-byte digest rule

Every exact-byte digest field in the complete 004C1R package is an algorithm-tagged canonical value:

```text
ContentDigest {
  algorithm
  value
}
```

Rules:

1. `algorithm` is required and machine-readable.
2. `value` is interpreted only under the exact `algorithm`.
3. exact-byte digest equality requires equality of both `algorithm` and `value`.
4. a raw digest/checksum string without algorithm identity is insufficient exact-byte evidence.
5. no nested evidence producer may omit, infer after execution, normalize away, or silently substitute the digest algorithm.
6. every nested input digest must bind the same exact bytes and byte length carried by the owning primary `ContentInputBinding`.
7. a derived artifact has its own independent algorithm-tagged digest and byte length; it does not inherit the parent digest or admission disposition.

## 3. Deterministic observation digest

The primary `DeterministicContentObservation` contract is interpreted with this exact digest typing:

```text
DeterministicContentObservation {
  observationRuleId
  observationRuleVersion
  result
  observedRange?
  claimedContentClass?
  inputExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  byteLength
  evidenceRef?
}
```

The observation is invalid exact-byte evidence if either digest component is absent or differs from the owning input binding.

## 4. Probabilistic classifier digest

The primary `ProbabilisticClassifierEvidence` contract is interpreted with this exact digest typing:

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
  inputExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  byteLength
  evidenceRef?
}
```

Classifier evidence cannot be reconciled with the admission package unless the full algorithm/value pair and byte length identify the same exact input bytes.

## 5. Structural inspection digest

The primary `PdfStructuralInspectionEvidence` contract is interpreted with this exact digest typing:

```text
PdfStructuralInspectionEvidence {
  state
  structuralIdentityResult? // presence and state/result validity are governed by the current primary artifact
  providerId?
  providerVersionEvidence?
  providerCapabilityVersion?
  activeContentIndicators[]
  embeddedArtifactIndicators[]
  warnings[]
  resourceEvidence?
  localityEvidence?
  networkEvidence?
  inputExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  byteLength
  evidenceRef?
}
```

Structural acceptance or rejection cannot be attached to a different digest algorithm/value pair, byte length, mutable alias, or silently substituted input. The current primary artifact exclusively governs when `structuralIdentityResult` is required or prohibited.

## 6. Derived-artifact digest typing

The current primary artifact owns the derived-artifact schema, immediate-parent kind, lineage, byte-length fields, and lifecycle. For digest typing only, its current nested exact-byte fields are represented equivalently by:

```text
DerivedArtifactParentBinding {
  parentExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  parentByteLength
  // all parent-kind and parent-identity fields are owned by the current primary artifact
}

DerivedArtifactIdentityEvidence {
  parentBinding: DerivedArtifactParentBinding
  extractedArtifactDigest: ContentDigest {
    algorithm
    value
  }
  extractedArtifactByteLength
  // all other non-digest fields are owned by the current primary artifact
}
```

Rules:

1. `parentBinding.parentExactBytesDigest` is the canonical algorithm-tagged digest of the exact immediate-parent bytes defined by the current primary artifact and is paired with that parent's `parentByteLength`.
2. `extractedArtifactDigest` independently identifies the exact extracted child bytes and is paired with `extractedArtifactByteLength`.
3. parent and extracted digest identities are separate; equality is neither required nor implied.
4. a change in either algorithm/value pair or its corresponding byte length creates a different byte identity under the current primary rules.
5. immediate-parent kind, canonical-revision identity, recursive derived-artifact identity, `derivedArtifactRef`, `parentOperationRef`, pre-promotion admission, later canonical-revision promotion, authorization, and general-004C eligibility remain governed only by the current primary artifact.
6. this correction cannot turn a derived artifact into a `DocumentRevision`, redefine recursive lineage, or authorize general 004C execution.

## 7. Admission-envelope synchronization

The current primary `ContentIdentityAdmissionEvidence` carries exact input identity through:

```text
inputBinding: ContentInputBinding
```

The current primary `ContentInputBinding.inputExactBytesDigest` is explicitly:

```text
ContentDigest {
  algorithm
  value
}
```

Every nested producer referenced by the admission envelope must use the same algorithm-tagged input digest and byte length unless it explicitly represents a new derived-artifact identity under the primary contract.

This correction does not replace `ContentInputBinding`, does not restore the superseded mandatory-revision-only shape, and does not modify the primary authorization or derived-artifact rules.

## 8. Authority remains unchanged

```text
004C1R_AUTHORITY = PLANNING_SEMANTIC_QUALIFICATION_ONLY
004C1R_IMPLEMENTATION_AUTHORITY = ABSENT
004C1R_CLASSIFIER_SELECTION_AUTHORITY = ABSENT
004C1R_STRUCTURAL_PROVIDER_SELECTION_AUTHORITY = ABSENT
004C1R_RUNTIME_EXECUTION_AUTHORITY = ABSENT
004C1R_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1R_SOURCE_IMPORT_AUTHORITY = ABSENT
004C1R_FIXTURE_ACQUISITION_AUTHORITY = ABSENT
004C1R_NETWORK_PROVIDER_AUTHORITY = ABSENT
MAGIKA_DEPENDENCY_ADOPTION = NOT_AUTHORIZED
MAGIKA_MODEL_IMPORT = NOT_AUTHORIZED
MAGIKA_RUNTIME = NOT_AUTHORIZED
CLASSIFIER_EXECUTION = NOT_AUTHORIZED
PDF_PROVIDER_RUNTIME = NOT_AUTHORIZED
CONTENT_IDENTITY_IMPLEMENTATION = NOT_AUTHORIZED
ADMISSION_IMPLEMENTATION = NOT_AUTHORIZED
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_MUTATION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
NPMRC_MUTATION = NOT_AUTHORIZED
PACKAGE_MANAGER_OR_RESOLVER_EXECUTION = NOT_AUTHORIZED
DEPENDENCY_ACQUISITION_OR_INSTALL = NOT_AUTHORIZED
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 9. Re-review requirement

Every review/check conclusion bound to an earlier 004C1R head is stale for merge qualification after either forward-only repair.

The complete exact two-file candidate must receive fresh independent substantive exact-head review against unchanged canonical base `a580747cc14f5bb1ff99503d6ef608065f59e029`.

The reviewer must verify that:

- every nested exact-byte digest is explicitly algorithm tagged;
- the current primary artifact's `ContentInputBinding` and derived-artifact schema remain authoritative;
- parent and child digest-plus-length bindings remain distinct while their non-digest lineage semantics remain primary-owned;
- this correction does not remove or redefine non-digest primary semantics;
- the complete package preserves admission dispositions, evidence-strength rules, classifier advisory-only boundary, structural-evidence requirement, TOCTOU behavior, authorization separation, polyglot handling, read-only/no-network rules, derived-artifact lifecycle rules, and explicit non-grants.

## 10. Repair result candidate

```text
NESTED_EXACT_BYTE_DIGEST_TYPE = CONTENT_DIGEST_ALGORITHM_PLUS_VALUE
RAW_UNTAGGED_DIGEST = INSUFFICIENT_EXACT_BYTE_EVIDENCE
DETERMINISTIC_OBSERVATION_DIGEST = ALGORITHM_TAGGED
CLASSIFIER_EVIDENCE_DIGEST = ALGORITHM_TAGGED
STRUCTURAL_INSPECTION_DIGEST = ALGORITHM_TAGGED
DERIVED_PARENT_DIGEST = ALGORITHM_TAGGED
DERIVED_PARENT_LENGTH = PRIMARY_BOUND
DERIVED_ARTIFACT_DIGEST = ALGORITHM_TAGGED
DERIVED_ARTIFACT_LENGTH = PRIMARY_BOUND
NON_DIGEST_SCHEMA_AUTHORITY = PRIMARY_004C1R_ARTIFACT
OTHER_004C1R_SEMANTICS = UNCHANGED
IMPLEMENTATION_AUTHORITY = ABSENT
NEXT_SUCCESSOR = NOT_YET_DERIVED
```