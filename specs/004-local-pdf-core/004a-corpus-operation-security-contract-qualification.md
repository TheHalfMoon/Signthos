# Specification 004A — Corpus, Operation, and Security Contract Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #7
Canonical base: `8e4bae2ffd47aeacc0fe3049dcce699d7ee2c0e5`
Canonical predecessor: Specification 004 Stage P `CLOSED_CANONICAL`

## 1. Authority

Issue #7 comment `github:issue-comment:5562296838` authorizes exactly:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 004A_CORPUS_OPERATION_SECURITY_CONTRACT_QUALIFICATION
004A_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
004A_IMPLEMENTATION_AUTHORITY = ABSENT
004A_EXTERNAL_FIXTURE_ACQUISITION_AUTHORITY = ABSENT
SPEC_004_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SOURCE_IMPORT_AUTHORITY = ABSENT
SPEC_004_DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
SPEC_004_PACKAGE_MANIFEST_LOCKFILE_AUTHORITY = ABSENT
SPEC_004_PROVIDER_RUNTIME_AUTHORITY = ABSENT
SPEC_004_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_DATABASE_MIGRATION_AUTHORITY = ABSENT
SPEC_004_SIGNING_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

This file is Signthos-authored contract planning only. It does not import or acquire fixture bytes, install or select a PDF engine, mutate product/runtime code, modify package/lockfile/Cargo/workflow/container/database/provenance/NOTICE surfaces, execute a PDF provider, process a user document, use credentials, or implement signing/verification.

## 2. Purpose

004A freezes the shared semantic and evidence vocabulary that every later Local PDF Core provider must satisfy.

The goal is to make later engine feasibility and implementation work testable against stable Signthos-owned contracts rather than allowing each library or platform to define its own meaning for:

- fixture identity;
- operation identity;
- input revision identity;
- output revision identity;
- mutation/effect classification;
- resource budgets;
- locality/network behavior;
- cancellation and deadline outcomes;
- unsupported and uncertain outcomes;
- active-content behavior;
- encrypted-input behavior;
- provider isolation;
- signing-boundary safety;
- deterministic evidence.

004A does **not** choose how these contracts are implemented.

## 3. Canonical predecessor contracts consumed without reopening

Specification 004A consumes the canonical Specification 003 contract boundary.

The following remain owned by Specification 003 and are not redefined here:

- `Document` and `DocumentId`;
- `DocumentRevision` and `DocumentRevisionId`;
- exact revision-byte identity;
- algorithm-tagged revision digest;
- revision lineage;
- conversion-generated revision semantics;
- immutable signing-input semantics;
- `Envelope` routing state being distinct from document revision state;
- authentication being distinct from resource authorization;
- principal/tenant/resource/action authorization decisions;
- stable domain error class ownership;
- canonical domain event ownership;
- browser/native/server/heavy provider separation;
- provider status not being canonical workflow/domain state;
- no-silent-network local-first semantics;
- unsupported/unknown states not becoming success.

004A adds PDF-core-specific operation and evidence requirements on top of those contracts.

## 4. Normative terminology

The keywords `MUST`, `MUST NOT`, `REQUIRED`, `SHOULD`, `SHOULD NOT`, and `MAY` express contract requirements for future implementation grains. Their presence here does not create implementation authority.

A **fixture** is a byte-exact input artifact used for deterministic qualification.

A **corpus** is a versioned set of fixture records and associated rights/evidence metadata.

A **provider** is an implementation behind a Signthos capability contract. No provider is selected by this document.

An **operation** is one requested PDF capability invocation bound to an exact input revision and explicit effect class.

A **published output** is an output that has passed the operation's success gates and may be bound to a new canonical revision where required.

A **partial output** is any intermediate or incomplete artifact produced before final success. Partial output is never silently promoted to published success.

## 5. Lifecycle/effect classes

Every PDF-core capability MUST declare exactly one primary effect class for a concrete invocation:

```text
PdfOperationEffectClass =
  | READ_ONLY
  | REVISION_CREATING
  | SIGNATURE_CREATING
  | VERIFICATION_ONLY
  | OUT_OF_SCOPE
```

### 5.1 `READ_ONLY`

A `READ_ONLY` operation:

- MUST consume an exact immutable `DocumentRevision`;
- MUST NOT change input revision bytes;
- MUST NOT create a replacement revision merely as an implementation side effect;
- MAY return derived render/extraction/inspection data;
- MUST bind derived evidence to the exact input revision digest;
- MUST declare unsupported/partial extraction explicitly;
- MUST remain local when the selected provider contract declares local execution.

Examples: inspect, render, text search, thumbnail generation, bounded metadata read.

### 5.2 `REVISION_CREATING`

A `REVISION_CREATING` operation:

- MUST preserve the source revision unchanged;
- MUST produce a distinct output revision when successful;
- MUST compute and bind an algorithm-tagged output digest;
- MUST record lineage from exact source revision(s);
- MUST identify the operation/provider evidence that produced the output;
- MUST NOT overwrite an existing signed/signing-bound revision;
- MUST classify lossy behavior explicitly where applicable;
- MUST NOT publish partial output after timeout/cancellation/failure.

Examples: rotate, remove page, merge, split, annotation application, form fill, watermark, metadata mutation, redaction apply, compression, repair, OCR text-layer creation, conversion.

### 5.3 `SIGNATURE_CREATING`

Cryptographic signing implementation belongs to Specification 005.

Specification 004 may only define preservation/interoperability constraints required to avoid corrupting or silently replacing signed revisions.

An operation whose actual purpose is to create a cryptographic PDF signature MUST be `SIGNATURE_CREATING` and `OUT_OF_SCOPE` for 004 implementation until Specification 005 separately authorizes it.

### 5.4 `VERIFICATION_ONLY`

Cryptographic signature/trust verification implementation belongs to Specification 005.

Specification 004 MAY later use independently qualified verification evidence to prove whether a PDF mutation preserved a pre-existing signature state, but it MUST NOT treat the mutating engine's own assertion as sufficient verification.

### 5.5 `OUT_OF_SCOPE`

An operation is `OUT_OF_SCOPE` when its semantics belong to another specification or when no supported deterministic contract exists.

Unknown operations MUST fail closed rather than being guessed into a nearby class.

## 6. Versioned fixture record contract

Future corpus manifests MUST represent every fixture using a record equivalent in meaning to:

```text
PdfFixtureRecord {
  fixtureId
  fixtureSchemaVersion
  corpusRevision
  displayLabel
  sourceClass
  sourceLocator
  sourceRevision
  acquisitionDate
  rightsBasis
  licenseExpression
  redistributionAllowed
  modificationAllowed
  requiredNotices
  byteLength
  digestAlgorithm
  digestValue
  mediaType
  expectedPdfVersion
  encryptionClass
  activeContentClass
  signatureStateClass
  incrementalUpdateClass
  featureTags[]
  adversarialTags[]
  expectedCapabilityFacts[]
  expectedUnsupportedFacts[]
  privacyClass
  evidenceRefs[]
}
```

Field names are planning vocabulary, not a language-specific API commitment.

### 6.1 Fixture identity

A fixture identity MUST bind the exact bytes through an algorithm-tagged cryptographic digest.

A filename, URL, repository tag, release label, or human description alone MUST NOT establish fixture identity.

Changing fixture bytes creates a new fixture identity/evidence record even when the visible document appears unchanged.

### 6.2 Fixture source classes

The future manifest MUST distinguish at least:

```text
FixtureSourceClass =
  | SIGNTHOS_AUTHORED_SYNTHETIC
  | PUBLIC_REPOSITORY
  | PUBLIC_STANDARD_CORPUS
  | THIRD_PARTY_PERMISSION
  | USER_SUPPLIED_TEST_ONLY
  | GENERATED_DERIVATIVE
  | UNKNOWN
```

`UNKNOWN` is not redistributable by default.

### 6.3 Rights basis

Every fixture intended for repository inclusion or redistribution MUST have exact rights evidence covering the intended use.

Required future facts include, as applicable:

- source owner/project;
- exact source revision/path/artifact;
- public license and exact version;
- permission artifact where public license is insufficient;
- whether modification is allowed;
- whether redistribution is allowed;
- copyright/attribution/NOTICE obligations;
- whether embedded fonts/images/attachments carry separate rights;
- whether the fixture contains personal, confidential, or regulated data.

Absence or ambiguity of rights is fail-closed for import/redistribution.

004A itself acquires no external fixture bytes.

### 6.4 Privacy rule

The canonical shared corpus SHOULD use synthetic or purpose-built non-personal material wherever possible.

No PHI, secrets, credentials, private correspondence, personal identifiers, or production customer documents may be introduced merely to create a test case.

A user-supplied document used for local debugging is not automatically eligible for repository corpus inclusion.

## 7. Required corpus families

A future implementation corpus MUST cover the capability families actually claimed. The baseline planning matrix is:

| Family | Minimum planning purpose |
|---|---|
| `minimal` | smallest structurally valid PDF cases |
| `typical` | ordinary multipage text/image PDFs |
| `fonts-images` | embedded/subset fonts, raster/vector images |
| `annotations` | common annotation families and appearance streams |
| `forms` | AcroForm fields, appearances, values, unsupported systems |
| `metadata-attachments` | document metadata and embedded files |
| `malformed-truncated` | broken xref/object/stream/truncation cases |
| `encrypted` | supported/unsupported encryption and password behavior |
| `signed` | pre-existing signature containers and signed byte ranges |
| `incremental` | incremental updates and multiple revisions/signatures |
| `active-content` | JavaScript/actions/launch/external-reference cases |
| `rtl-arabic` | Arabic/RTL text, fonts, extraction/render cases |
| `redaction-recovery` | deliberately recoverable hidden/text/image/object cases |
| `large-resource` | page/object/stream/decompression/resource-bound cases |
| `lossy-transform` | compression/repair cases with observable information loss |
| `ocr-conversion` | later generated/conversion cases where separately authorized |

This matrix defines required evidence categories, not fixture files.

## 8. Corpus revision contract

A corpus used as merge-critical implementation evidence MUST have an immutable revision identity.

The corpus revision MUST bind:

- manifest bytes/digest;
- ordered or canonically normalized fixture-record set;
- exact fixture digests;
- fixture-rights evidence references;
- expected-fact schema version;
- generation recipe/version for synthetic/generated fixtures;
- any exclusions or unsupported fixture families.

A later corpus mutation MUST create a new corpus revision. Results from an earlier corpus revision MUST NOT be silently represented as results for a later revision.

## 9. Canonical operation request contract

Every future provider operation MUST consume a request equivalent in meaning to:

```text
PdfOperationRequest {
  operationId
  operationSchemaVersion
  capabilityId
  effectClass
  inputRevisionRefs[]
  inputDigestRefs[]
  parameters
  localityRequirement
  networkPolicy
  resourceBudget
  deadline
  cancellationRef
  activeContentPolicy
  encryptionPolicy
  outputPolicy
  evidenceLevel
}
```

### 9.1 Exact input binding

Every request MUST bind the exact canonical input revision(s). A path, current-document pointer, mutable database row, envelope state, or UI selection alone is insufficient.

### 9.2 Parameter normalization

Parameters that affect output bytes or semantic results MUST have deterministic serialization/normalization before they are included in evidence.

Provider-private defaults that change behavior MUST NOT be omitted from merge-critical evidence.

### 9.3 Idempotency expectation

Where an operation is intended to be deterministic, the contract SHOULD define an idempotency/equivalence expectation appropriate to the capability.

Byte-identical output MUST NOT be claimed when the PDF format/provider legitimately introduces permitted nondeterministic bytes unless the exact evidence proves byte determinism.

## 10. Canonical operation result contract

A future result MUST be equivalent in meaning to:

```text
PdfOperationResult {
  operationId
  capabilityId
  status
  effectClass
  providerIdentity
  providerVersionEvidence
  inputRevisionRefs[]
  outputRevisionRefs[]
  inputDigestRefs[]
  outputDigestRefs[]
  normalizedParametersEvidence
  resourceUsageEvidence
  localityEvidence
  networkEvidence
  cancellationEvidence
  activeContentEvidence
  encryptionEvidence
  warnings[]
  unsupportedFacts[]
  uncertaintyFacts[]
  errorClass
  evidenceRefs[]
}
```

### 10.1 Status vocabulary

At minimum:

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

No non-success state may be converted to `SUCCEEDED` merely because some output bytes exist.

### 10.2 Warnings and uncertainty

Warnings MUST NOT overwrite machine-readable failure or unsupported classifications.

Unknown/uncertain facts MUST remain explicit.

## 11. Stable PDF-core error categories

004A qualifies PDF-specific error categories as specializations compatible with the canonical Specification 003 stable-error model.

Candidate machine classes:

```text
PDF_INPUT_INVALID
PDF_INPUT_TRUNCATED
PDF_INPUT_ENCRYPTED_PASSWORD_REQUIRED
PDF_INPUT_ENCRYPTION_UNSUPPORTED
PDF_ACTIVE_CONTENT_PRESENT
PDF_ACTIVE_CONTENT_BLOCKED
PDF_FEATURE_UNSUPPORTED
PDF_RESOURCE_LIMIT_EXCEEDED
PDF_DECOMPRESSION_LIMIT_EXCEEDED
PDF_PAGE_LIMIT_EXCEEDED
PDF_OBJECT_LIMIT_EXCEEDED
PDF_STREAM_LIMIT_EXCEEDED
PDF_CANCELLED
PDF_DEADLINE_EXCEEDED
PDF_PROVIDER_UNAVAILABLE
PDF_PROVIDER_FAILURE
PDF_OUTPUT_VALIDATION_FAILED
PDF_PARTIAL_OUTPUT_NOT_PUBLISHED
PDF_SIGNED_INPUT_MUTATION_FORBIDDEN
PDF_SIGNATURE_PRESERVATION_UNPROVEN
PDF_REDACTION_RECOVERY_FAILED
PDF_RIGHTS_EVIDENCE_MISSING
PDF_CORPUS_EVIDENCE_MISMATCH
```

Later implementation may refine bounded subcategories without changing the semantic requirement that stable machine classes remain separate from localized human messages.

## 12. Resource-budget taxonomy

Every untrusted PDF provider operation MUST eventually accept or be governed by explicit resource budgets appropriate to its execution environment.

The shared taxonomy includes:

```text
PdfResourceBudget {
  maxInputBytes
  maxOutputBytes
  maxPages
  maxObjects
  maxObjectDepth
  maxStreamBytes
  maxDecodedStreamBytes
  maxImagePixels
  maxEmbeddedFiles
  maxEmbeddedFileBytes
  maxFontBytes
  maxMemoryBytes
  maxCpuTime
  maxWallTime
  maxWorkerCount
  maxTemporaryStorageBytes
}
```

004A sets no fabricated universal numeric values. Later provider grains MUST set and test concrete limits based on platform/provider evidence.

### 12.1 Decompression bombs

Encoded input size MUST NOT be the sole resource bound. Providers must bound decoded/expanded data where applicable.

### 12.2 Limit result semantics

Resource-limit termination MUST be machine distinguishable from malformed input, unsupported capability, provider crash, cancellation, and generic failure.

## 13. Cancellation and deadline contract

Cancellation and deadline expiration are first-class outcomes.

Future implementations MUST ensure:

- cancellation/deadline signals propagate into provider work where technically supported;
- work is not reported successful after cancellation/deadline merely because a late result arrives;
- partially written output is quarantined/discarded unless a separate recovery contract exists;
- cancellation does not mutate the canonical source revision;
- temporary resources are cleaned within a bounded policy;
- cancellation/deadline evidence is bound to the operation result.

## 14. Locality and network evidence

The request contract MUST state the required execution locality.

Candidate values:

```text
ExecutionLocality =
  | BROWSER_LOCAL
  | NATIVE_LOCAL
  | SERVER_LOCAL
  | ISOLATED_HEAVY_WORKER
  | EXPLICIT_NETWORK_PROVIDER
```

A provider MUST NOT silently change locality.

For operations declared local:

- document bytes MUST NOT be uploaded implicitly;
- external URL fetches embedded in PDF content MUST be blocked unless an explicit later contract authorizes a bounded fetch;
- telemetry/logging MUST NOT include document bytes or sensitive extracted content by default;
- network evidence SHOULD be capable of proving no document-processing network transition occurred where the implementation environment permits such measurement.

## 15. Active-content default-deny contract

Untrusted PDF active content is non-executing by default.

The policy applies to, where relevant:

- document JavaScript;
- open actions;
- additional actions;
- launch actions;
- URI actions;
- submit/import form actions;
- embedded files or executable payloads;
- multimedia/rich media;
- external references and automatic fetches.

Future providers MUST distinguish:

- presence detected;
- unsupported inspection;
- blocked/non-executed;
- sanitized/removed in a new revision;
- intentionally permitted by a separately authorized feature.

Absence of detection MUST NOT be described as proof of absence unless the selected provider/corpus evidence supports that claim.

## 16. Encrypted-input contract

Encrypted PDFs are untrusted input with additional secret-handling requirements.

Future provider contracts MUST distinguish:

- encrypted/password required;
- password accepted;
- invalid password;
- supported encryption;
- unsupported encryption;
- permission flags observed;
- permission flags not security-enforced by the provider;
- decryption failure.

Passwords/keys:

- MUST NOT appear in ordinary logs, analytics, errors, fixture manifests, or evidence bundles;
- SHOULD be held for the minimum operation lifetime;
- MUST NOT be sent to another provider unless the user-visible operation explicitly selects that provider/locality and governance authorizes it;
- MUST NOT be persisted by default.

004A does not define DRM/legal-effect policy from PDF permission bits.

## 17. Provider isolation and secret boundary

Every later provider grain MUST declare its trust/isolation boundary.

Untrusted parsers/renderers/heavy converters MUST NOT receive signing keys, KMS credentials, deployment credentials, control-plane secrets, unrelated account tokens, or unrestricted filesystem/network access merely for convenience.

A provider requiring broader privilege than its capability needs is not qualified until that privilege is justified and mitigated.

## 18. Signed-input safety contract

The exact bytes of a signed or signing-bound `DocumentRevision` are immutable.

For every future `REVISION_CREATING` PDF operation on signed content:

- the source revision remains unchanged;
- the output is a distinct revision;
- prior signature state MUST NOT be advertised as preserved unless an independent verifier proves the exact applicable state;
- a full rewrite MUST NOT silently claim signature preservation;
- incremental update support MUST NOT be assumed safe merely because the provider supports incremental serialization;
- UI/product layers must receive enough machine state to distinguish a newly unsigned/superseding revision from the signed predecessor.

Signing itself remains Specification 005.

## 19. Partial-output publication rule

A provider may create temporary bytes while processing. Those bytes are not canonical output until the operation result is `SUCCEEDED` and required validation gates have passed.

The following outcomes MUST NOT publish output as a successful new revision:

- cancellation;
- deadline exceeded;
- resource limit exceeded;
- parser/provider crash;
- failed output validation;
- unsupported operation;
- rights/evidence gate failure where the operation requires qualified external material;
- redaction recovery failure for a safe-redaction claim.

## 20. Output validation contract

A future mutation grain MUST define validation proportionate to the capability.

Potential validation dimensions include:

- output parseability through the implementing provider;
- independent parse/inspection where required;
- expected page/object/form/annotation counts;
- input/output digest distinction when mutation is expected;
- render sanity;
- text extraction facts;
- metadata/attachment facts;
- signature-state evidence;
- absence/recovery testing for redaction;
- format/conformance validation only where an independent validator is qualified.

Same-engine round-trip alone is insufficient for high-assurance claims such as safe redaction or standards conformance.

## 21. Redaction evidence invariant

No future feature may be labeled safely redacted based solely on visual appearance or on the same engine that performed the redaction.

A safe-redaction qualification MUST attempt applicable recovery through independent paths covering at least the targeted risk surfaces:

- text extraction/search/copy;
- raw object/stream inspection;
- image extraction/inspection;
- annotations and appearance streams;
- forms/XFA where relevant;
- layers/optional content;
- metadata;
- attachments;
- incremental-history artifacts;
- rendered output.

If targeted recoverable content remains through an applicable independent path, the result MUST fail the safe-redaction claim.

## 22. Deterministic contract example — read-only

```text
Given:
  inputRevision = R1
  inputDigest = sha256:D1
  capability = inspect
  effectClass = READ_ONLY
  locality = BROWSER_LOCAL

Then success requires:
  canonical bytes of R1 unchanged
  result.inputDigest = sha256:D1
  result.outputRevisionRefs = []
  locality evidence consistent with BROWSER_LOCAL
  active content not executed
  unsupported inspection facts explicit
```

## 23. Deterministic contract example — revision-creating

```text
Given:
  inputRevision = R1
  inputDigest = sha256:D1
  capability = rotate_page
  effectClass = REVISION_CREATING
  parameters = {page: 2, degrees: 90}

Then success requires:
  source R1 unchanged
  outputRevision = R2
  R2 != R1
  outputDigest = algorithm-tagged D2
  lineage = R2 derived from R1 by exact normalized operation parameters
  no partial output published before success
```

## 24. Adversarial contract cases

Future provider grains MUST include applicable cases such as:

1. malformed xref plus enormous declared stream length;
2. tiny encoded stream expanding beyond decoded budget;
3. recursive/nested object structure approaching depth limits;
4. encrypted PDF with no password;
5. wrong password;
6. unsupported encryption algorithm;
7. JavaScript/open-action document under local render;
8. external URI/reference attempting automatic network fetch;
9. cancellation during parse;
10. cancellation during output serialization;
11. deadline expiration after temporary output exists;
12. provider crash after partial output;
13. signed input passed to full-rewrite mutation;
14. signed input passed to purported incremental mutation without independent signature evidence;
15. visually redacted text recoverable by independent extraction;
16. text removed but image pixels still reveal targeted content;
17. hidden content remaining in incremental history;
18. attachment containing targeted sensitive content;
19. unsupported XFA treated as ordinary AcroForm;
20. provider returns bytes while machine status says failure;
21. local-only request whose provider attempts network access;
22. oversized embedded image or attachment;
23. Arabic/RTL render succeeds but text extraction order is uncertain;
24. corpus fixture digest differs from manifest;
25. fixture rights evidence missing or ambiguous.

Every applicable case must fail or classify explicitly rather than becoming generic success.

## 25. Security logging contract

Ordinary logs/evidence MUST avoid:

- document bytes;
- extracted document body text;
- passwords;
- private keys;
- signing credentials;
- embedded attachment contents;
- personal identifiers from fixture/user documents unless an explicit bounded test requires them.

Safe diagnostic fields include, subject to privacy review:

- operation ID;
- capability ID;
- provider/version IDs;
- algorithm-tagged digests;
- byte/page/object counts;
- resource-limit class;
- duration/resource metrics;
- stable error class;
- locality/network state;
- corpus/fixture IDs that themselves contain no sensitive data.

## 26. Evidence-level classes

A later implementation MAY define levels equivalent to:

```text
EvidenceLevel =
  | BASIC_RESULT
  | DETERMINISTIC_CONTRACT
  | SECURITY_QUALIFICATION
  | INDEPENDENT_VALIDATION
```

A high-assurance claim MUST NOT be made from a lower evidence class than its canonical grain requires.

004A does not claim that any provider currently satisfies these levels.

## 27. Unsupported capability ledger

Every later provider qualification MUST maintain explicit unsupported/partial capability facts.

Examples include:

- unsupported PDF encryption family;
- unsupported XFA;
- unsupported annotation subtype;
- unsupported color/font/image feature;
- inability to inspect active content comprehensively;
- unavailable cancellation primitive;
- unavailable native target;
- missing independent verification path.

Unsupported is a valid result; silently approximating unsupported behavior is not.

## 28. Future synthetic fixture generation rules

A separately authorized synthetic-fixture grain MAY generate Signthos-owned fixtures when it can establish deterministic generation and safe redistribution.

A generation record SHOULD bind:

- generator source/version;
- exact generation parameters;
- deterministic seed where relevant;
- output digest;
- intended feature/adversarial facts;
- whether generated embedded fonts/images carry compatible rights;
- review evidence.

004A itself creates no binary fixture artifacts.

## 29. 004B handoff contract

If 004A becomes canonical and live governance authorizes 004B, engine feasibility work must evaluate candidates against this contract rather than replacing it.

004B must be able to answer, for each exact candidate:

- which lifecycle classes/capabilities are actually supported;
- what exact source/package/crate/binary artifacts would ship;
- what rights/notices/SBOM obligations apply;
- what locality/isolation/resource/cancellation behavior exists;
- what active-content/encryption behavior exists;
- which corpus families can be exercised;
- which required semantics are unsupported or uncertain;
- whether a separate adapter would be needed to keep provider APIs from becoming domain authority.

004B discovery alone does not grant dependency acquisition or implementation authority.

## 30. Acceptance criteria for 004A

004A is substantively sound only if review confirms:

- the fixture-record contract binds byte identity, source, rights, redistribution, and evidence without importing external fixtures;
- corpus revision semantics prevent stale-result reuse;
- required corpus families cover the Stage P threat/capability matrix;
- operation effect classes are unambiguous and preserve Specification 003 revision ownership;
- request/result/status contracts make input/output/locality/resource/cancellation evidence explicit;
- resource taxonomy includes decoded/decompression and temporary-resource risks;
- local/no-network and active-content default-deny semantics fail closed;
- encrypted-input secret handling is explicit;
- provider isolation protects signing/control-plane secrets;
- signed-input mutation cannot silently replace or claim preservation of signed bytes;
- partial output cannot become success;
- high-assurance redaction requires independent recovery attempts;
- unsupported/uncertain states remain explicit;
- logs exclude sensitive document/secrets by default;
- 004B remains a later candidate only;
- no engine/dependency/source/runtime/fixture acquisition occurs in this grain.

## 31. Qualification evidence requirements

This exact 004A candidate requires:

- exact base/head/diff accounting;
- `git diff --check` clean;
- zero upstream-derived source bytes;
- zero external fixture bytes;
- zero dependency/package/lockfile/Cargo/workflow/container/database/product/runtime mutation;
- truthful exact-head provider/check accounting;
- fresh independent substantive exact-head review;
- forward-only repair and full changed-head re-review for any material finding;
- zero unresolved material review threads;
- immediate base/head/mergeability/ruleset/competing-authority re-verification;
- mandatory premerge proof;
- guarded expected-head merge;
- post-merge tree/parents/signature/check verification;
- live Issue #7 successor reread before 004B authority.

## 32. Completion boundary

Until this exact candidate passes the complete Diffciplane lifecycle:

```text
004A_STATUS = CANDIDATE_ONLY
004A_IMPLEMENTATION_AUTHORITY = ABSENT
004A_EXTERNAL_FIXTURE_ACQUISITION_AUTHORITY = ABSENT
004B_AUTHORITY = NOT_YET_CANONICAL_SUCCESSOR_AUTHORITY
SPEC_004_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
SPEC_004_PROVIDER_RUNTIME_AUTHORITY = ABSENT
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

Canonical 004A completion would qualify planning contracts only. It would not by itself install, adopt, execute, or ship a PDF engine or fixture corpus.
