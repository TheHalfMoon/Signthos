# Specification 004 — Content Identity and Admission Semantic Qualification

Status: `CANDIDATE / PLANNING_CONTRACT_QUALIFICATION_ONLY / ZERO_RUNTIME_AUTHORITY`
Issue: #7
Authority: `github:issue-comment:5576566217`
Canonical base: `a580747cc14f5bb1ff99503d6ef608065f59e029`
Canonical predecessor: PR #125 / merge `a580747cc14f5bb1ff99503d6ef608065f59e029`

## Purpose

Freeze the provider-neutral semantic contract for establishing the content identity and admission disposition of exact untrusted input bytes before any general Specification 004 PDF capability execution.

This grain defines semantics and qualification requirements only. It does not implement content classification, PDF parsing, security scanning, fixture acquisition, package/model acquisition, or provider runtime behavior.

## Authority boundary

```text
AUTHORITY_CLASS = PLANNING_CONTRACT_QUALIFICATION_ONLY
SOURCE_IMPORT_AUTHORITY = ABSENT
DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
MODEL_ACQUISITION_AUTHORITY = ABSENT
PACKAGE_MANAGER_OR_RESOLVER_EXECUTION_AUTHORITY = ABSENT
PACKAGE_MANIFEST_WORKSPACE_LOCKFILE_MUTATION_AUTHORITY = ABSENT
PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
CLASSIFIER_RUNTIME_EXECUTION_AUTHORITY = ABSENT
SECURITY_SCANNER_EXECUTION_AUTHORITY = ABSENT
PDF_PROVIDER_RUNTIME_AUTHORITY = ABSENT
CONTENT_IDENTITY_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004C2_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004D_SUCCESSOR_AUTHORITY = ABSENT
SPECIFICATION_005_AUTHORITY = ABSENT
```

## Canonical admission order

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

No stage may silently upgrade an observation into a stronger claim than it proves.

## Exact-input identity

Every admission evaluation binds one immutable input identity:

```text
InputIdentity {
  digestAlgorithm
  digest
  byteLength
  immutableHandleRef?
}
```

Requirements:

- all observations bind to the same digest and byte length;
- path names are never identity authority;
- a downstream provider may not silently reopen a mutable path and process different bytes;
- any digest mismatch creates a new input identity and invalidates prior admission evidence for the replaced bytes;
- admission is read-only with respect to the input revision.

## Declared identity evidence

Caller-supplied metadata is retained as untrusted evidence:

```text
DeclaredIdentityEvidence {
  originalFileName?
  declaredExtension?
  declaredMediaType?
  sourceChannel?
}
```

Mismatch between declared and observed identity is preserved as security/audit evidence and is not normalized away.

## Deterministic observations

Deterministic signature observations must be reproducible, bounded, read-only, and explicit about what they do and do not prove.

```text
DeterministicSignatureObservation {
  observationId
  result
  evidenceRef?
}
```

A positive byte-signature observation is not equivalent to full PDF structural validity or safety.

## Optional classifier evidence

A probabilistic classifier is optional evidence and never sole admission authority.

```text
ClassifierEvidence {
  providerIdentity
  providerVersion
  packageIdentity?
  modelIdentity?
  configIdentity?
  mode?
  label?
  confidence?
  state
}
```

Candidate states:

```text
CLASSIFIER_NOT_CONFIGURED
CLASSIFIER_UNAVAILABLE
CLASSIFIER_EXECUTION_FAILED
CLASSIFIER_UNSUPPORTED_INPUT
CLASSIFIER_LOW_CONFIDENCE
CLASSIFIER_RESULT_AVAILABLE
```

Unavailable, failed, unsupported, or low-confidence classification cannot silently become `NOT_PDF` or successful admission.

## Structural inspection evidence

Structural inspection is a distinct evidence producer with bounded execution semantics.

```text
StructuralInspectionEvidence {
  providerIdentity
  providerVersion
  result
  activeContentIndicators[]
  embeddedArtifactIndicators[]
  warnings[]
  resourceEvidence?
}
```

The future provider must expose explicit file/page/object/memory/time limits, cancellation/deadline behavior, malformed-input handling, encryption behavior, active-content non-execution, no-silent-network behavior, and isolation evidence.

A successful parser open is not proof of malware absence, sanitization, non-polyglot status, signature validity, or certificate trust.

## Reconciliation contract

```text
ContentIdentityEvidence {
  inputIdentity
  declaredIdentity?
  deterministicSignatureObservations[]
  classifierEvidence?
  structuralInspectionEvidence?
  conflictingIdentitySignals[]
  evidenceCompleteness
  admissionDisposition
}
```

Conflicting signals remain representable and auditable. The reconciliation policy must not collapse ambiguity into generic success.

## Admission dispositions

The semantic contract freezes these top-level dispositions:

```text
CONFIRMED_PDF
AMBIGUOUS_CONTENT_IDENTITY
NOT_PDF
UNSUPPORTED_OR_UNCERTAIN
```

`CONFIRMED_PDF` means only that the exact qualified admission policy permits the exact input bytes for the claimed downstream PDF capability. It does not imply malware-free, sanitized, non-polyglot, trusted, signed, compliant, or safe for unrelated consumers.

## Capability-specific admission

Admission requirements are capability-specific. A downstream capability must declare the minimum evidence set it requires.

Examples:

- read-only metadata inspection may require a different qualified evidence set from rendering;
- extracting embedded artifacts creates new untrusted artifact identities;
- revision-creating operations must bind the admitted exact source revision and exact source digest;
- no capability may weaken `AMBIGUOUS_CONTENT_IDENTITY` or `UNSUPPORTED_OR_UNCERTAIN` into success by provider fallback.

## Polyglot and ambiguity rules

- classifier `pdf` does not prove non-polyglot status;
- parser acceptance does not prove safety for another runtime;
- appended or mixed-format evidence remains explicit;
- top-level identity is distinct from embedded artifact identity;
- conflicting signals require deterministic fail-closed handling for the claimed capability.

## Derived artifact identity

Every extracted or embedded artifact is a new untrusted identity and does not inherit parent admission status.

```text
DerivedArtifactIdentity {
  parentDocumentDigest
  embeddedObjectIdentity?
  artifactDigest
  byteLength
  extractionProviderIdentity
  contentIdentityEvidenceRef?
}
```

Recursive analysis requires explicit aggregate byte, single-artifact size, count, depth, CPU, memory, time, and cancellation budgets, with no automatic execution or network fetch.

## Error and uncertainty semantics

The future runtime contract must preserve distinct stable states for at least:

- input identity mismatch;
- malformed input;
- unsupported input;
- classifier unavailable/failure/low confidence;
- structural inspector unavailable/failure/resource exhaustion;
- encryption or credential-required states;
- conflicting identity signals;
- admission policy rejection;
- cancellation and timeout.

Unknown or incomplete evidence is never converted into success.

## Security invariants

```text
DECLARED_METADATA != CONTENT_TRUTH
BYTE_SIGNATURE != FULL_STRUCTURAL_VALIDITY
CLASSIFIER_LABEL != PDF_VALIDITY
PARSER_OPEN_SUCCESS != MALWARE_FREE
PARSER_OPEN_SUCCESS != NON_POLYGLOT
SCANNER_NO_FINDINGS != SAFE_FILE
SARIF_PRESENT != SCAN_COMPLETE
```

Document-derived content remains untrusted data and never privileged AI instruction.

## Qualification evidence required before canonicalization

This planning grain requires:

1. exact base/head/tree and one-file diff verification;
2. truthful GitHub Actions/check/provider accounting;
3. independent substantive exact-head review;
4. forward-only repair of every material finding;
5. zero unresolved material review threads;
6. immediate premerge race proof;
7. guarded normal merge using exact expected-head protection;
8. mechanical post-merge verification of main, ordered parents, tree equality, signature, exact changed surface, and status/review accounting;
9. fresh live successor reconciliation.

## Explicit non-grants

This grain does not authorize:

- Magika or any other classifier package/model/config acquisition;
- donor source import;
- package-manager/resolver execution;
- package/workspace/lockfile mutation;
- provenance/NOTICE/SBOM mutation;
- scanner execution;
- fixture acquisition or generation;
- classifier runtime implementation;
- PDF provider runtime implementation;
- content-identity runtime implementation;
- 004C2 runtime implementation;
- 004D;
- Specification 005.

## Completion boundary

Canonicalization of this semantic contract authorizes no implementation by itself. The next candidate in the planning dependency order is classifier integration-route and package/model/config provenance qualification, but it requires a fresh post-merge authority record before any repository mutation begins.
