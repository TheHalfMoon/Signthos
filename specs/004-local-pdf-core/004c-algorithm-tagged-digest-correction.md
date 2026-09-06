# Specification 004C — Algorithm-Tagged Digest Correction

Status: `FORWARD_ONLY_REVIEW_REPAIR / PLANNING_PROVIDER_ENTRY_ONLY / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `c8e5eba21b7c83eeff04eab2592d401c8985d62c`
Authority source: `github:issue-comment:5562660897`
Review finding: `github:issue-comment:5562740686`

## Purpose

This forward-only correction repairs the single material finding reported against PR #103 head `e0f6bbdd94ce7ea66e4ad9f96cd2b3ed7f46984e`.

The original 004C provider-entry artifact used the semantic field name `inputExactBytesDigest` in the common request/result contracts but did not explicitly state that the digest includes its algorithm identity. Canonical Specification 003A defines exact-byte identity through an algorithm-tagged `ContentDigest`, and canonical 004A requires algorithm-tagged revision and fixture digests.

A digest value without its algorithm is therefore insufficient as an unambiguous exact-byte identity.

This correction supersedes only the ambiguous digest representation in Sections 11–13 of `004c-inspect-render-search-provider-entry-qualification.md`. All other 004C authority, provider-selection, capability, locality, runtime, corpus, implementation, and successor boundaries remain unchanged.

## Canonical digest value

004C consumes the canonical Specification 003A value contract:

```text
ContentDigest {
  algorithm
  value
}
```

Rules:

1. `algorithm` is required and machine-readable;
2. `value` is interpreted only under that exact algorithm;
3. equality of exact-byte digests requires equality of both `algorithm` and `value`;
4. a raw digest string without algorithm identity is not sufficient 004C exact-byte evidence;
5. 004C does not select or change the canonical algorithm policy; it consumes the algorithm-tagged contract owned by the canonical predecessor specifications.

## Corrected common request contract

The 004C request contract is corrected to semantic input equivalent to:

```text
PdfReadOnlyOperationRequest {
  operationId
  capabilityRef
  documentId
  inputRevisionId
  inputExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  providerId
  providerCapabilityVersion
  deadline?
  cancellationToken?
  resourceBudgetRef
  capabilityParameters
}
```

Corrected rules:

1. `inputRevisionId` identifies the exact immutable Signthos revision;
2. `inputExactBytesDigest.algorithm` and `inputExactBytesDigest.value` together identify the exact bytes supplied to the provider;
3. both digest components must match the canonical digest bound to the requested revision before provider execution is eligible;
4. the provider may not silently substitute another revision, digest algorithm, digest value, cached document, remote URL, or mutable alias;
5. retry cannot silently change the input revision, digest algorithm, digest value, provider, or capability version;
6. document bytes remain untrusted input;
7. provider-private handles remain runtime metadata, never canonical revision identity.

## Corrected common result contract

The 004C result contract is corrected to semantic evidence equivalent to:

```text
PdfReadOnlyOperationResult {
  operationId
  capabilityRef
  providerId
  providerVersionEvidence
  inputRevisionId
  inputExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  status
  observations
  warnings[]
  resourceEvidence?
  durationEvidence?
  determinismEvidence?
}
```

Corrected rules:

1. every terminal result echoes the exact input `ContentDigest`, including both algorithm and value;
2. the echoed algorithm/value pair must equal the request pair and the canonical revision digest used for execution;
3. an adapter must not normalize, omit, substitute, or infer the digest algorithm after execution;
4. a result containing only an untagged digest value is incomplete exact-byte evidence and cannot satisfy the 004C evidence contract;
5. success remains read-only and cannot create or replace canonical `DocumentRevision` content;
6. partial, cancelled, timed-out, unsupported, unavailable, or failed outcomes cannot be promoted to full success by digest presence alone.

## Corrected immutability proof

The Section 13 proof is interpreted as algorithm-tagged equality:

```text
canonicalInputDigestBefore.algorithm == canonicalInputDigestAfter.algorithm
canonicalInputDigestBefore.value == canonicalInputDigestAfter.value
canonicalRevisionIdBefore == canonicalRevisionIdAfter
newCanonicalRevisionCreated == false
```

Equivalently:

```text
canonicalInputDigestBefore == canonicalInputDigestAfter
```

is valid only because both sides are canonical `ContentDigest { algorithm, value }` values.

## Other digest-bearing observations

If a later 004C implementation emits an optional exact digest for a rendered or derived observation, such as `renderedDigest`, that digest must also carry explicit algorithm identity whenever it is used as exact-byte evidence. A human-readable checksum string without algorithm identity cannot become canonical exact-byte evidence.

This does not promote rendered output to a `DocumentRevision` and does not create runtime authority.

## Authority remains unchanged

```text
004C_AUTHORITY = PLANNING_PROVIDER_ENTRY_QUALIFICATION_ONLY
004C_SELECTED_PROVIDER_CANDIDATE_AUTHORITY = PRESENT_FOR_PLANNING_ONLY
004C_IMPLEMENTATION_AUTHORITY = ABSENT
004C_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C_DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
004C_SOURCE_IMPORT_AUTHORITY = ABSENT
004C_EXTERNAL_FIXTURE_ACQUISITION_AUTHORITY = ABSENT
004C_PROVIDER_RUNTIME_EXECUTION_AUTHORITY = ABSENT
004C_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004C_PACKAGE_MANIFEST_LOCKFILE_AUTHORITY = ABSENT
004C_WORKFLOW_CONTAINER_MUTATION_AUTHORITY = ABSENT
004C_DATABASE_MIGRATION_AUTHORITY = ABSENT
SPEC_004_SIGNING_IMPLEMENTATION_AUTHORITY = ABSENT
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

This repair adds no dependency, source byte, fixture byte, runtime code, package/lockfile mutation, workflow, database change, provenance/NOTICE/SBOM mutation, provider execution, PDF execution, signing implementation, or downstream authority.

## Re-review requirement

The prior review at `github:issue-comment:5562740686` is evidence for the superseded head only and is not merge qualification for the changed head.

The complete new exact PR head must receive fresh independent substantive review covering both 004C files together. The reviewer must verify that this correction fully repairs algorithm identity without introducing a conflicting digest representation or expanding authority.
