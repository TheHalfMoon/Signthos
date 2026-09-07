# Specification 004C1R — Algorithm-Tagged Nested Digest Correction

Status: `FORWARD_ONLY_REVIEW_REPAIR / PLANNING_SEMANTIC_ONLY / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Primary candidate: `specs/004-local-pdf-core/004c1r-content-identity-admission-semantic-qualification.md`
Repair authority: `github:issue-comment:5576663706`
Self-review finding: `github:issue-comment:5576645937`
Superseded candidate head: `66a074844d483d605d9ab235472f99c3924aa18c`
Superseded candidate tree: `7573e5146eb8d4bd5f5c560de26f81a5511f6eed`

## 1. Purpose

This forward-only correction repairs one material semantic ambiguity in the 004C1R candidate.

The primary 004C1R artifact correctly binds its top-level exact input identity and canonical admission evidence envelope to:

```text
ContentDigest {
  algorithm
  value
}
```

However, several nested evidence snippets use bare field names such as `inputExactBytesDigest` or `parentDocumentDigest` without explicitly repeating the canonical `ContentDigest` type. Canonical Specification 003, canonical 004A, and the canonical 004C algorithm-tagged digest correction already establish that an exact-byte digest without algorithm identity is insufficient.

This correction supersedes only that ambiguous nested digest representation. It changes no other 004C1R status, disposition, policy, evidence, provider, locality, network, error, authority, or successor semantics.

## 2. Canonical exact-byte digest rule

Every exact-byte digest field in 004C1R is an algorithm-tagged canonical value:

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
6. every nested exact-byte digest must bind the same exact bytes and byte length claimed by the owning 004C1R admission evidence record.

## 3. Corrected deterministic observation digest

The `DeterministicContentObservation` contract in the primary 004C1R artifact is interpreted as:

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

The deterministic observation is invalid exact-byte evidence if either digest component is absent or differs from the canonical 004C1R input identity.

## 4. Corrected probabilistic classifier digest

The `ProbabilisticClassifierEvidence` contract in the primary 004C1R artifact is interpreted as:

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

Classifier evidence cannot be reconciled with other admission evidence unless the full algorithm/value pair and byte length identify the same exact input bytes.

## 5. Corrected structural inspection digest

The `PdfStructuralInspectionEvidence` contract in the primary 004C1R artifact is interpreted as:

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
  inputExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  byteLength
  evidenceRef?
}
```

Structural acceptance or rejection cannot be attached to a different digest algorithm/value pair, different byte length, mutable alias, or silently substituted input.

## 6. Corrected derived-artifact parent digest

The `DerivedArtifactIdentityEvidence` contract in the primary 004C1R artifact is interpreted as:

```text
DerivedArtifactIdentityEvidence {
  parentDocumentRevisionId
  parentDocumentDigest: ContentDigest {
    algorithm
    value
  }
  embeddedObjectIdentity
  extractedArtifactDigest: ContentDigest {
    algorithm
    value
  }
  byteLength
  extractionProviderIdentity
  extractionEvidenceRef
  reclassificationRequired = true
}
```

Rules:

1. `parentDocumentDigest` is the canonical algorithm-tagged digest of the exact parent revision from which extraction evidence was produced.
2. `extractedArtifactDigest` is independently algorithm tagged and identifies the exact extracted artifact bytes.
3. parent and extracted digest identities are separate; equality is neither required nor implied.
4. a change in extracted artifact algorithm/value or byte length creates a new derived-artifact identity requiring new admission evidence.
5. no derived artifact inherits the parent admission disposition.

## 7. Canonical admission envelope remains unchanged

The primary 004C1R `ContentIdentityAdmissionEvidence` already explicitly types its top-level input digest as canonical `ContentDigest { algorithm, value }`. This correction does not alter that contract.

Every nested producer referenced by the envelope must use the same algorithm-tagged input digest and byte length unless it explicitly represents a new derived artifact identity under Section 6.

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

Any review/check conclusion bound to the superseded head `66a074844d483d605d9ab235472f99c3924aa18c` is stale for merge qualification.

The complete repaired 004C1R candidate — primary semantic artifact plus this correction artifact — must receive fresh independent substantive exact-head review against the unchanged canonical base.

The reviewer must verify that this correction fully restores explicit algorithm-tagged digest identity for every nested exact-byte evidence contract without altering the primary candidate's admission dispositions, evidence-strength rules, classifier advisory-only boundary, structural-evidence requirement, TOCTOU behavior, polyglot handling, read-only/no-network rules, or explicit non-grants.

## 10. Repair result candidate

```text
NESTED_EXACT_BYTE_DIGEST_TYPE = CONTENT_DIGEST_ALGORITHM_PLUS_VALUE
RAW_UNTAGGED_DIGEST = INSUFFICIENT_EXACT_BYTE_EVIDENCE
DETERMINISTIC_OBSERVATION_DIGEST = ALGORITHM_TAGGED
CLASSIFIER_EVIDENCE_DIGEST = ALGORITHM_TAGGED
STRUCTURAL_INSPECTION_DIGEST = ALGORITHM_TAGGED
DERIVED_PARENT_DIGEST = ALGORITHM_TAGGED
DERIVED_ARTIFACT_DIGEST = ALGORITHM_TAGGED
OTHER_004C1R_SEMANTICS = UNCHANGED
IMPLEMENTATION_AUTHORITY = ABSENT
NEXT_SUCCESSOR = NOT_YET_DERIVED
```