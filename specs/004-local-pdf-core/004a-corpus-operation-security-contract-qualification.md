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

This file is Signthos-authored planning only. It imports or acquires no fixture bytes or upstream source, selects or installs no PDF engine, changes no product/runtime/dependency/package/lockfile/Cargo/workflow/container/database/provenance/NOTICE surface, executes no PDF provider, uses no credentials, and implements no signing or verification behavior.

## 2. Purpose

004A freezes the shared semantic and evidence contract that later Local PDF Core providers must satisfy before implementation claims can converge.

It qualifies planning requirements for:

- fixture and corpus identity;
- fixture source, rights, redistribution and privacy evidence;
- operation identity and effect semantics;
- input/output revision identity, digest and lineage;
- status, error, warning, unsupported and uncertainty semantics;
- resource budgets, cancellation and deadlines;
- execution locality and network policy;
- active-content behavior;
- encrypted-input secret handling;
- provider isolation;
- signed-input safety;
- output validation and independent redaction recovery;
- deterministic evidence and adversarial cases.

004A does not choose an implementation language, engine, package, crate, binary, provider, or fixture corpus.

## 3. Canonical predecessor contracts consumed without reopening

Specification 003 continues to own:

- `Document`, `DocumentId`, `DocumentRevision`, and `DocumentRevisionId` semantics;
- exact immutable revision-byte identity;
- algorithm-tagged revision digest and lineage;
- conversion-generated revision semantics;
- immutable signing-input semantics;
- separation of document revision state from `Envelope` routing state;
- authentication versus resource authorization;
- principal/tenant/resource/action authorization decisions;
- stable domain error/event ownership;
- browser/native/server/heavy provider separation;
- provider status not being canonical workflow/domain state;
- local-first no-silent-network semantics;
- unsupported/unknown states not becoming success.

004A specializes those contracts for PDF-core evidence without redefining them.

## 4. Normative planning language

`MUST`, `MUST NOT`, `REQUIRED`, `SHOULD`, `SHOULD NOT`, and `MAY` define requirements for later separately authorized implementation grains. They do not create implementation authority here.

A **fixture** is a byte-exact qualification input.

A **corpus** is an immutable revision of fixture records plus their evidence.

A **provider** is a concrete implementation behind a Signthos capability contract. No provider is selected here.

An **operation** is one requested capability invocation bound to exact canonical input revision(s), one effect class, and one scope disposition.

A **published output** is an output that has passed all success and validation gates required by its capability.

A **partial output** is intermediate or incomplete provider output. It is never silently promoted to success.

## 5. Effect class and scope disposition are separate axes

A concrete invocation MUST declare exactly one primary effect class:

```text
PdfOperationEffectClass =
  | READ_ONLY
  | REVISION_CREATING
  | SIGNATURE_CREATING
  | VERIFICATION_ONLY
```

Separately, it MUST declare exactly one scope disposition:

```text
PdfOperationScopeDisposition =
  | SPEC_004_SUPPORTED
  | SPEC_004_EVIDENCE_ONLY
  | OUT_OF_SCOPE_FOR_SPEC_004
```

This separation is normative. `OUT_OF_SCOPE_FOR_SPEC_004` is **not** an effect class.

### 5.1 `READ_ONLY`

A `READ_ONLY` operation:

- consumes exact immutable input revision(s);
- does not change those revision bytes;
- does not create a replacement revision merely as a provider side effect;
- may return derived render/extraction/inspection artifacts;
- binds derived evidence to exact input revision digest(s);
- makes unsupported/partial facts explicit;
- obeys the requested locality/network policy.

Typical 004 candidates: inspect, render, search, text extraction, thumbnails and bounded metadata read.

### 5.2 `REVISION_CREATING`

A `REVISION_CREATING` operation:

- preserves every source revision unchanged;
- produces a distinct canonical output revision only after success gates pass;
- binds an algorithm-tagged output digest;
- records exact source lineage and normalized operation parameters;
- records provider/version evidence;
- never overwrites signed/signing-bound source bytes;
- declares lossy behavior when applicable;
- never publishes partial output after cancellation, deadline, resource-limit or validation failure.

Typical 004 candidates: page transforms, merge/split, annotations/forms, marks/metadata/attachments, redaction, compression/repair, OCR text layers and conversion.

### 5.3 `SIGNATURE_CREATING`

Cryptographic signing implementation belongs to Specification 005.

A cryptographic signing invocation has:

```text
effectClass = SIGNATURE_CREATING
scopeDisposition = OUT_OF_SCOPE_FOR_SPEC_004
```

Specification 004 may define preservation/interoperability requirements around signed inputs, but it does not implement signing under 004A.

### 5.4 `VERIFICATION_ONLY`

Cryptographic signature/trust verification implementation belongs to Specification 005.

A standalone cryptographic verifier invocation has:

```text
effectClass = VERIFICATION_ONLY
scopeDisposition = OUT_OF_SCOPE_FOR_SPEC_004
```

A later 004 mutation grain MAY consume independently qualified verification evidence as `SPEC_004_EVIDENCE_ONLY` to establish whether pre-existing signature state was preserved. The mutating provider's own assertion is insufficient.

### 5.5 Unknown capability

An unknown capability MUST be classified explicitly as unsupported/out-of-scope. It MUST NOT be guessed into a nearby effect class or silently executed.

## 6. Fixture record contract

Future corpus manifests MUST represent every fixture with information equivalent to:

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

Fixture identity MUST bind exact bytes with an algorithm-tagged cryptographic digest.

Filename, URL, tag, release label, repository path, or description alone is insufficient.

Any byte change creates a new fixture identity/evidence record.

### 6.2 Source classes

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

### 6.3 Rights and redistribution

Every fixture intended for repository inclusion or redistribution MUST bind exact rights evidence covering the intended use.

Evidence includes, as applicable:

- owner/project;
- exact source revision/path/artifact;
- exact license and version;
- permission artifact when public license is insufficient;
- modification/redistribution allowance;
- copyright/attribution/NOTICE obligations;
- separately licensed embedded fonts/images/attachments;
- privacy/confidentiality classification.

Public availability alone does not establish redistribution rights.

Ambiguous or missing rights fail closed for import/redistribution.

004A acquires no external fixture bytes.

### 6.4 Privacy

The shared corpus SHOULD prefer synthetic or purpose-built non-personal material.

No PHI, secrets, credentials, private correspondence, production customer documents, or unnecessary personal identifiers may be introduced merely to create a test case.

User-supplied local debugging material is not automatically repository-corpus eligible.

## 7. Required corpus families

A future corpus MUST cover the families relevant to the claimed capability:

| Family | Qualification purpose |
|---|---|
| `minimal` | smallest structurally valid PDF cases |
| `typical` | ordinary multipage text/image documents |
| `fonts-images` | embedded/subset fonts and raster/vector images |
| `annotations` | annotations and appearance streams |
| `forms` | AcroForm plus explicit unsupported form systems |
| `metadata-attachments` | metadata and embedded files |
| `malformed-truncated` | xref/object/stream/truncation failures |
| `encrypted` | supported/unsupported encryption/password behavior |
| `signed` | pre-existing signature containers/signed byte ranges |
| `incremental` | incremental updates and multiple revisions/signatures |
| `active-content` | JavaScript/actions/launch/URI/external-reference cases |
| `rtl-arabic` | Arabic/RTL rendering and extraction cases |
| `redaction-recovery` | deliberately recoverable hidden/text/image/object cases |
| `large-resource` | page/object/stream/decompression/resource-bound cases |
| `lossy-transform` | compression/repair cases with measurable information loss |
| `ocr-conversion` | later generated/conversion cases when separately authorized |

This matrix defines evidence families only. It does not claim any fixture exists.

## 8. Corpus revision contract

A merge-critical corpus MUST have an immutable corpus revision binding:

- manifest bytes/digest;
- canonically normalized fixture-record set;
- exact fixture digests;
- rights-evidence references;
- expected-fact schema version;
- generation recipe/version for generated fixtures;
- exclusions/unsupported families.

Any corpus mutation creates a new corpus revision. Evidence from one revision MUST NOT be represented as evidence for another.

## 9. Canonical operation request

A future request MUST be equivalent in meaning to:

```text
PdfOperationRequest {
  operationId
  operationSchemaVersion
  capabilityId
  effectClass
  scopeDisposition
  inputRevisionRefs[]
  inputDigestRefs[]
  normalizedParameters
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

Every request binds exact input revision(s) and digest(s). A file path, mutable row, current-document pointer, envelope state, or UI selection alone is insufficient.

Parameters affecting behavior or output MUST have deterministic normalization for evidence. Provider-private defaults that affect behavior MUST NOT be hidden from merge-critical evidence.

Byte-identical determinism MUST NOT be claimed when provider/PDF behavior legitimately introduces permitted nondeterministic bytes unless exact evidence proves byte determinism.

## 10. Canonical operation result

A future result MUST be equivalent in meaning to:

```text
PdfOperationResult {
  operationId
  capabilityId
  status
  effectClass
  scopeDisposition
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

Minimum status vocabulary:

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

No non-success state may become `SUCCEEDED` merely because bytes exist.

Warnings do not replace machine-readable failure/unsupported state. Unknown facts remain explicit uncertainty.

## 11. Stable PDF-core error specializations

Candidate machine classes compatible with Specification 003 include:

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

Later bounded implementation may refine subcategories, but stable machine classes stay separate from localized human messages.

## 12. Resource-budget taxonomy

Every untrusted-PDF provider operation MUST eventually be governed by explicit budgets equivalent to:

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

004A fabricates no universal numeric thresholds. Provider grains must set and test concrete limits from actual platform/provider evidence.

Encoded input size alone is insufficient; decoded/decompressed expansion must be bounded where applicable.

Limit termination must be distinguishable from malformed input, unsupported capability, provider failure, cancellation and generic failure.

## 13. Cancellation, deadlines and partial output

Cancellation and deadline expiration are first-class machine outcomes.

Future implementation MUST ensure:

- cancellation/deadline signals propagate where technically supported;
- late results after cancellation/deadline are not reported as success;
- temporary/partial output is quarantined or discarded unless a separate recovery contract exists;
- canonical source revision bytes remain unchanged;
- temporary resources are cleaned under a bounded policy;
- result evidence records the cancellation/deadline outcome.

Partial output is not canonical output until all required success/validation gates pass.

## 14. Locality and network evidence

Candidate execution localities:

```text
ExecutionLocality =
  | BROWSER_LOCAL
  | NATIVE_LOCAL
  | SERVER_LOCAL
  | ISOLATED_HEAVY_WORKER
  | EXPLICIT_NETWORK_PROVIDER
```

A provider MUST NOT silently change locality.

For an operation declared local:

- document bytes are not implicitly uploaded;
- embedded external references do not trigger automatic fetch without separately authorized behavior;
- telemetry/logging excludes document bytes and sensitive extracted content by default;
- later evidence should prove the expected network state where the execution environment permits measurement.

## 15. Active-content default deny

Untrusted PDF active content is non-executing by default, including where relevant:

- document JavaScript;
- open/additional actions;
- launch actions;
- URI actions;
- submit/import form actions;
- embedded executable files;
- multimedia/rich media;
- external references and automatic fetches.

Future providers distinguish:

- presence detected;
- inspection unsupported;
- blocked/non-executed;
- sanitized/removed into a new revision;
- separately authorized intentional behavior.

Failure to detect is not proof of absence unless provider/corpus evidence establishes it.

## 16. Encrypted input and secrets

Future contracts distinguish:

- encrypted/password required;
- password accepted;
- invalid password;
- supported encryption;
- unsupported encryption;
- observed permission flags;
- permission flags not security-enforced by provider;
- decryption failure.

Passwords/keys:

- never appear in ordinary logs, analytics, fixture manifests or evidence bundles;
- are held only for the minimum operation lifetime where practical;
- are not forwarded to another provider without explicit selected locality/provider authority;
- are not persisted by default.

004A does not infer DRM or legal-effect policy from PDF permission flags.

## 17. Provider isolation and secret boundary

Later provider grains declare their trust/isolation boundary.

Untrusted parsers/renderers/heavy converters do not receive signing keys, KMS credentials, deployment credentials, control-plane secrets, unrelated account tokens, or unrestricted filesystem/network access merely for convenience.

Broader privileges require explicit justification and mitigation before qualification.

## 18. Signed-input safety

Signed or signing-bound source revision bytes are immutable.

For any future `REVISION_CREATING` operation on signed content:

- the source revision remains unchanged;
- output is a distinct revision;
- prior signature state is not advertised as preserved without independent verification evidence;
- full rewrite never silently claims signature preservation;
- incremental serialization support is not evidence of signature preservation by itself;
- product layers receive machine state sufficient to distinguish the new unsigned/superseding revision from its signed predecessor.

Signing itself remains Specification 005.

## 19. Output validation

A mutation grain defines validation proportionate to its claim, potentially including:

- output parseability;
- independent parse/inspection where required;
- expected page/object/form/annotation facts;
- input/output digest relation;
- render sanity;
- extraction facts;
- metadata/attachment facts;
- signature-state evidence;
- redaction recovery;
- independent format/conformance validation where claimed.

Same-engine round-trip alone is insufficient for high-assurance safe-redaction or standards-conformance claims.

## 20. Independent safe-redaction invariant

Safe redaction is not established by visual appearance or by the implementing engine alone.

Applicable independent recovery paths include:

- text extraction/search/copy;
- raw object/stream inspection;
- image extraction/inspection;
- annotations/appearance streams;
- forms/XFA where relevant;
- optional-content/layers;
- metadata;
- attachments;
- incremental-history artifacts;
- rendered output.

If targeted recoverable content remains through an applicable independent path, the safe-redaction claim fails.

## 21. Unsupported and uncertainty ledger

Later provider qualification explicitly records unsupported or partial facts such as:

- unsupported encryption family;
- unsupported XFA;
- unsupported annotation subtype;
- unsupported font/image/color feature;
- incomplete active-content inspection;
- unavailable cancellation primitive;
- unavailable native target;
- unavailable independent validation path.

Unsupported is a valid machine outcome. Silent approximation is not.

## 22. Security logging

Ordinary logs/evidence exclude:

- document bytes;
- extracted body text;
- passwords;
- private/signing keys;
- embedded attachment content;
- personal identifiers unless a separately bounded test explicitly requires them.

Safe diagnostic candidates include operation/capability/provider IDs, algorithm-tagged digests, counts, resource-limit class, duration/resource metrics, stable error class, locality/network state, and non-sensitive corpus/fixture IDs.

## 23. Deterministic examples

### Read-only example

```text
inputRevision = R1
inputDigest = sha256:D1
capability = inspect
effectClass = READ_ONLY
scopeDisposition = SPEC_004_SUPPORTED
locality = BROWSER_LOCAL
```

Success requires source bytes unchanged, result input digest bound to `D1`, no canonical output revision, active content non-executing, locality evidence consistent with local execution, and unsupported facts explicit.

### Revision-creating example

```text
inputRevision = R1
inputDigest = sha256:D1
capability = rotate_page
effectClass = REVISION_CREATING
scopeDisposition = SPEC_004_SUPPORTED
parameters = {page: 2, degrees: 90}
```

Success requires source `R1` unchanged, a distinct output revision `R2`, algorithm-tagged output digest `D2`, lineage `R2 <- R1`, normalized parameter evidence, and no partial output publication.

### Signing example

```text
capability = cryptographic_sign
effectClass = SIGNATURE_CREATING
scopeDisposition = OUT_OF_SCOPE_FOR_SPEC_004
```

004A therefore cannot route this invocation into a later 004 PDF mutation implementation merely because an engine exposes a signing API.

## 24. Adversarial contract cases

Later applicable provider grains cover cases including:

1. malformed xref with enormous declared stream length;
2. tiny encoded stream expanding beyond decoded budget;
3. recursive/nested objects near depth limits;
4. encrypted input without password;
5. wrong password;
6. unsupported encryption;
7. JavaScript/open action under local render;
8. embedded external reference attempting fetch;
9. cancellation during parse;
10. cancellation during serialization;
11. deadline expiration after temporary output exists;
12. provider failure after partial output;
13. signed input passed to full-rewrite mutation;
14. claimed incremental signature preservation without independent evidence;
15. visually redacted text recoverable by independent extraction;
16. redacted text removed but image pixels remain;
17. targeted content retained in incremental history;
18. targeted content retained in attachment;
19. unsupported XFA treated as ordinary AcroForm;
20. provider returns bytes while machine status is failure;
21. local-only request whose provider attempts network access;
22. oversized embedded image/attachment;
23. Arabic/RTL render succeeds while extraction order remains uncertain;
24. fixture digest mismatch;
25. missing/ambiguous fixture rights evidence.

Applicable cases fail or classify explicitly; none become generic success.

## 25. Future synthetic fixture generation

A separately authorized synthetic-fixture grain MAY generate Signthos-owned fixtures when deterministic generation and redistribution are established.

Its generation record should bind generator source/version, parameters, deterministic seed where relevant, output digest, intended facts, embedded-asset rights, and review evidence.

004A creates no binary fixtures.

## 26. 004B handoff

If 004A becomes canonical and live governance authorizes 004B, feasibility work evaluates exact candidates against this contract rather than replacing it.

004B must answer for each exact candidate:

- actual supported lifecycle/capability scope;
- exact source/package/crate/WASM/native artifacts that would ship;
- rights/licenses/notices/SBOM obligations;
- advisory/update path;
- locality/isolation/resource/cancellation behavior;
- active-content/encryption behavior;
- corpus-family coverage potential;
- unsupported/uncertain semantics;
- adapter requirements needed to prevent provider APIs from becoming domain authority.

004B discovery alone does not grant dependency acquisition, source import, provider execution or product implementation authority.

## 27. Acceptance criteria

004A is sound only if review confirms:

- effect class and scope disposition are separate, non-conflicting axes;
- fixture identity binds exact bytes and rights are fail-closed;
- corpus revision prevents stale evidence reuse;
- corpus families cover the Stage P threat/capability matrix without claiming current fixture existence;
- request/result/status contracts bind exact revisions, digests, normalized parameters, locality, resources and provider evidence;
- decoded/decompression and temporary-resource risks are explicit;
- cancellation/deadline/partial-output semantics fail closed;
- local/no-network and active-content behavior fail closed;
- encrypted secrets are protected;
- provider isolation protects signing/control-plane secrets;
- signed inputs remain immutable and preservation claims require independent evidence;
- redaction uses independent recovery paths;
- unsupported/uncertain states remain explicit;
- logs exclude sensitive content/secrets by default;
- 004B and Specification 005 remain unauthorized;
- no engine/dependency/source/runtime/fixture acquisition occurs.

## 28. Qualification evidence requirements

The exact 004A candidate requires:

- exact base/head/diff accounting;
- clean `git diff --check`;
- zero upstream-derived source bytes and zero external fixture bytes;
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

## 29. Completion boundary

Until the exact candidate completes Diffciplane:

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

Canonical 004A completion qualifies planning contracts only. It does not install, adopt, execute or ship a PDF engine or fixture corpus.
