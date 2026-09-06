# Specification 004 — Local PDF Core

Status: `SHAPING_CANDIDATE / PLANNING_ONLY / SIGNTHOS_AUTHORED / ZERO_UPSTREAM_BYTES`
Issue: #7
Canonical shaping base: `dd996f11b701679b941c1fb3fd3e8bdc880f2506`
Canonical predecessor: Specification 003 `CLOSED_CANONICAL`
Predecessor closeout: PR #97 / merge `dd996f11b701679b941c1fb3fd3e8bdc880f2506`
Authority source: `github:issue-comment:5562123379`

## Authority

Issue #7 authorizes **Specification 004 Stage P shaping only**.

```text
SPEC_004_AUTHORITY = PLANNING_SHAPING_ONLY
SPEC_004_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SOURCE_IMPORT_AUTHORITY = ABSENT
SPEC_004_DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
SPEC_004_PACKAGE_MANIFEST_LOCKFILE_AUTHORITY = ABSENT
SPEC_004_PROVIDER_RUNTIME_AUTHORITY = ABSENT
SPEC_004_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_DATABASE_MIGRATION_AUTHORITY = ABSENT
SPEC_004_SIGNING_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_DEPLOYMENT_AUTHORITY = ABSENT
```

Stage P may define Signthos-owned PDF capability contracts, trust boundaries, qualification gates, corpus/evidence requirements, dependency-order candidates, and future implementation-grain candidates.

Stage P does **not** authorize installing, downloading, importing, executing, or adopting EmbedPDF, PDFium, LibPDF, `pdfium-render`, `lopdf`, MuPDF, Stirling, OCR/conversion engines, or any other product/runtime dependency. It does not authorize product code, package manifests, lockfiles, generated code, workflows, containers, database migrations, signing/verification implementation, credentials, deployment, network document processing, or public capability claims.

The roadmap number `004` describes dependency order. It does not create implementation authority.

## Exact predecessor truth consumed without reopening

Specification 003 is `CLOSED_CANONICAL` for its current planning/contract scope.

Specification 004 consumes these canonical boundaries:

- `Document` identity is distinct from document content revisions and envelope/workflow state.
- `DocumentRevision` identifies exact content state; exact signing/evidence-sensitive bindings target immutable revisions rather than moving aliases.
- content-changing operations create a new revision and cannot mutate signing-bound bytes in place;
- provider identity, capability identity/version, support, runtime availability, and execution locality are distinct;
- authentication/provider/contact identity does not imply resource authorization;
- authorization remains deny-by-default and tenant/resource/action scoped;
- provider/raw/localized errors cannot replace stable machine-readable error classes;
- provider success/status cannot redefine canonical domain/workflow state;
- local-only execution cannot silently fall back to network document processing;
- imported Prisma representation remains persistence state, not canonical domain authority;
- naming/source/provenance/legal protections are cumulative and are not cosmetic migration targets;
- no Specification 003 planning artifact grants PDF engine, signing, provider-runtime, dependency, or source-import implementation authority.

Specification 004 must conform to these contracts. It does not redesign them casually to fit an engine API.

## Problem

Signthos needs one deterministic local-first PDF capability layer that can serve browser, desktop/native, server, mobile, and later heavy-provider workflows without allowing each PDF engine to define its own hidden domain semantics.

PDF processing is a high-risk untrusted-input boundary. A parser or renderer may face malformed objects, recursive/deep graphs, compressed bombs, enormous streams/images/fonts, active content, encrypted documents, damaged cross-reference tables, incremental-update chains, embedded files, forms, scripts/actions, and intentionally adversarial files.

At the same time, PDF operations differ fundamentally:

- some are read-only observations of exact bytes;
- some create a new document revision;
- some may invalidate or supersede existing signatures;
- cryptographic signing and verification belong to a later dedicated trust boundary;
- OCR/conversion/repair may require isolated heavyweight providers rather than core libraries.

A universal-library assumption would blur these distinctions. Specification 004 therefore standardizes **capability semantics and evidence**, not one implementation engine.

## Goal

Define a stable Local PDF Core contract and qualification program such that future engine/provider implementations can be selected, replaced, compared, sandboxed, and independently tested without changing Signthos document/revision semantics.

Stage P success means the PDF work is decomposed into small, reviewable, security-bounded future grains with explicit evidence requirements. It does not mean any PDF feature is implemented.

## Scope in — planning only

Stage P may define contracts and qualification requirements for:

1. document inspection and metadata-safe parsing;
2. rendering, thumbnails, text selection/search and text extraction;
3. page reorder, rotate, remove and extract;
4. merge and split;
5. annotation and bounded text/image placement;
6. form inspection/fill/flatten where semantics are proven;
7. watermark, stamp and page numbering;
8. metadata and attachment handling;
9. redaction and sanitization;
10. compare/diff evidence;
11. compression and repair;
12. OCR and office/image conversion provider boundaries;
13. browser/native/server provider convergence;
14. deterministic fixture/corpus, resource, security and performance evidence;
15. exact engine/package/binary provenance and notice qualification prerequisites.

## Scope out

Stage P does not authorize or implement:

- cryptographic signing, timestamping, certificate trust, PAdES profiles or evidence bundle implementation — Specification 005 owns those;
- signature verification implementation — Specification 005 owns the independent verifier boundary;
- the unified web workspace — Specification 006;
- desktop packaging/native-product integration — Specification 007;
- mobile packaging/secure handoff — Specification 008;
- generic automation orchestration/heavy-provider product platform — Specification 010;
- database schema/migration work;
- product rebranding/config migration;
- source import or dependency acquisition;
- engine adoption merely because a Foundation document or public release exists.

## Capability lifecycle classes

Every PDF operation must declare exactly one **semantic side-effect class** before implementation:

```text
READ_ONLY
REVISION_CREATING
SIGNATURE_CREATING
VERIFICATION_ONLY
```

Specification 004 may qualify `READ_ONLY` and `REVISION_CREATING` PDF behavior.

`SIGNATURE_CREATING` and cryptographic `VERIFICATION_ONLY` implementation remain Specification 005 ownership even if a PDF library exposes APIs with those names.

Examples:

| Operation | Default semantic class | Stage P rule |
| --- | --- | --- |
| parse/inspect | `READ_ONLY` | must not mutate or replace exact input bytes |
| render/thumbnail | `READ_ONLY` | output image is derived evidence, not a document revision |
| search/text extract | `READ_ONLY` | extraction uncertainty must be explicit |
| reorder/rotate/remove/extract pages | `REVISION_CREATING` | output receives new exact revision identity |
| merge/split | `REVISION_CREATING` | lineage records every exact input revision |
| annotation/text/image placement | `REVISION_CREATING` | no in-place mutation of signing-bound revision |
| form fill/flatten | `REVISION_CREATING` | flattening and form semantics must be explicit |
| watermark/stamp/page numbering | `REVISION_CREATING` | output is a new revision |
| metadata/attachment mutation | `REVISION_CREATING` | metadata-only is still a byte change |
| redaction apply/sanitize | `REVISION_CREATING` | safe-redaction claim requires independent recovery evidence |
| compression/repair | `REVISION_CREATING` | repaired bytes never silently replace source revision |
| OCR text layer | `REVISION_CREATING` | OCR output is derived and provenance-bound |
| office/image conversion to PDF | `REVISION_CREATING` | conversion is an explicit lineage edge |
| cryptographic sign | `SIGNATURE_CREATING` | owned by Specification 005 |
| signature verify | `VERIFICATION_ONLY` | owned by Specification 005 |

If byte-effect is unknown, qualification fails closed rather than assuming `READ_ONLY`.

## Canonical future operation contract

A future executable PDF capability should expose semantics equivalent to:

```text
PdfOperationRequest {
  operationId
  capabilityId
  capabilityVersion
  providerId
  providerVersion
  executionLocality
  principalContext
  tenantContext
  inputRevisionRefs[]
  exactInputDigests[]
  parameters
  resourceBudget
  deadline
  cancellationRef
}

PdfOperationResult {
  operationId
  semanticClass
  providerIdentity
  capabilityIdentity
  exactInputRevisionRefs[]
  outputKind
  outputRevisionCandidate?
  exactOutputDigest?
  lineageEvidence?
  derivedArtifacts[]
  warnings[]
  stableError?
  resourceEvidence?
}
```

This is a semantic planning contract, not a wire format and not implementation authority.

Mandatory rules:

- exact input revision identity and digest are explicit;
- provider names/versions are evidence, not domain state;
- a `REVISION_CREATING` result cannot silently overwrite the input revision;
- multi-input operations such as merge record every input revision/digest in deterministic order;
- local-only operations cannot silently perform network document processing;
- stable machine errors remain independent from engine-specific strings;
- cancellation/deadline/resource exhaustion is explicit and distinguishable from malformed/unsupported input;
- provider callbacks/status cannot mark domain workflows complete;
- authorization occurs before privileged document access or mutation;
- secrets/passwords/raw document content are excluded from ordinary logs/events/evidence summaries.

## PDF trust boundaries

### Untrusted input

Every user-provided or imported PDF is untrusted, including documents that render successfully in another application.

Future implementations must define bounded handling for:

- malformed headers/trailers;
- invalid or cyclic object references;
- deeply nested arrays/dictionaries/object graphs;
- malformed xref tables/xref streams;
- malformed object streams;
- truncated/incremental-update chains;
- huge/deceptive declared sizes;
- decompression bombs;
- oversized images/fonts/embedded files;
- adversarial page counts/dimensions;
- encrypted/password-protected files;
- damaged or unsupported encryption modes;
- forms, XFA and appearance streams;
- JavaScript, actions, launch actions and URI actions;
- embedded files/attachments;
- external references and network-capable features;
- signed/incrementally updated PDFs;
- malformed signature dictionaries even though signature validation is not owned here.

### Active content

Parsing/rendering does not imply permission to execute document-controlled active content.

Default Stage P policy:

```text
PDF_JAVASCRIPT_EXECUTION = DENY_BY_DEFAULT
LAUNCH_ACTIONS = DENY_BY_DEFAULT
AUTOMATIC_EXTERNAL_URI_FETCH = DENY_BY_DEFAULT
AUTOMATIC_EMBEDDED_FILE_EXECUTION = DENY
AUTOMATIC_NETWORK_EGRESS = DENY_BY_DEFAULT
```

Any future exception requires explicit capability, threat model, user-visible behavior and separately qualified network/security evidence.

### Resource exhaustion

Every engine/provider grain must declare and test enforceable or externally supervised limits appropriate to its surface, including as applicable:

- input byte size;
- page count;
- page dimensions;
- object count;
- object depth;
- stream/decompressed byte budget;
- image pixel budget;
- font/attachment budget;
- memory budget;
- CPU/wall-clock budget;
- worker/process concurrency;
- output byte/page/object limits.

An unsupported/unbounded limit must be recorded explicitly. It cannot be disguised as success.

### Cancellation and timeout

Long-running operations require observable cancellation/deadline behavior. A cancellation or timeout must not publish a partial output revision as successful.

### Isolation

Native/WASM/server/heavy processors are separate trust boundaries. Future grains must prove the least-privilege boundary suitable for the provider, including process/worker/container isolation where appropriate.

Heavy/untrusted processors must not receive signing keys, control-plane secrets, unrelated tenant documents, or unrestricted network access by default.

## Encrypted document policy

Password-protected/encrypted PDFs require explicit treatment.

Stage P rules:

- passwords are secrets and must not appear in ordinary logs, analytics, error messages or durable evidence records;
- decrypted working bytes are sensitive derived material;
- provider capability must declare supported encryption modes;
- unsupported/invalid credentials fail distinctly from malformed input;
- local-only encrypted operations remain local unless an explicit future network transition is separately authorized and user-visible;
- re-encryption or encryption removal changes bytes and is `REVISION_CREATING`.

## Signed and signing-bound revision safety

Specification 004 does not own cryptographic signing, but it must not destroy signing semantics accidentally.

Rules:

1. exact signed/signing-bound input bytes are immutable;
2. any ordinary PDF content change produces a new revision rather than mutating the old revision;
3. a full-document rewrite of a signed revision produces a distinct new revision and may invalidate or supersede signatures; it must not be presented as preserving them without independent Specification 005 evidence;
4. incremental-update behavior that claims prior-signature preservation requires separately qualified signing/verification evidence;
5. a PDF engine's successful save result is not proof of signature preservation;
6. operation lineage records the exact signed source revision when a new revision derives from it.

## Locality contract

A capability must declare execution locality, for example:

```text
BROWSER_LOCAL
NATIVE_LOCAL
SERVER_SELF_HOSTED
MANAGED_NETWORK
ISOLATED_HEAVY_WORKER
```

Stage P does not require these exact wire labels, but future capability semantics must distinguish local and network execution.

Local operation rules:

- no silent document upload;
- no silent remote rendering/OCR/conversion;
- no telemetry payload containing document content by default;
- any transition to a network provider is explicit and separately authorized;
- provider selection cannot silently weaken privacy or authorization semantics.

## Deterministic fixture corpus contract

No engine/provider can be described as adopted or qualified until a versioned fixture corpus is pinned.

Each fixture record should include:

```text
FixtureRecord {
  fixtureId
  sourceClass
  rightsBasis
  sourceReference?
  exactBytesDigest
  byteLength
  expectedCapabilityUses[]
  expectedWarningsOrFailures?
  sensitivity = PUBLIC_OR_SYNTHETIC_ONLY
}
```

The corpus must be legally redistributable and must not contain confidential/user documents.

Minimum families:

- minimal PDF;
- typical text/image multi-page PDF;
- embedded fonts and unusual encodings;
- Arabic/RTL text and mixed-direction text;
- annotations;
- AcroForm forms and appearance edge cases;
- attachments/embedded files;
- metadata edge cases;
- malformed/truncated files;
- malformed xref/object streams;
- encrypted/password-protected files where supported;
- existing digital signatures and incremental updates;
- multi-incremental-update history;
- oversized page/page-count/object/decompression cases;
- image-heavy and font-heavy inputs;
- redaction recovery adversarial fixtures;
- active-content/actions/URI/JavaScript fixtures;
- output-determinism or tolerated-nondeterminism fixtures where appropriate.

Corpus version/revision/digest must bind to engine/version results. A moving external test corpus is not sufficient merge-critical evidence.

## Redaction safety qualification

Visual disappearance is not safe redaction.

A future redaction grain cannot claim safe redaction until the **exported file** is independently attacked for recoverability through paths separate from the implementing code, including as applicable:

- text extraction/copy;
- raw/object inspection;
- independent parser inspection;
- image/object extraction;
- annotations/forms/layers;
- metadata/attachments;
- incremental-history inspection;
- alternate rendering/search paths.

If targeted information remains recoverable through an independently qualified path, result state is not `SAFE_REDACTION_SUCCESS`.

Sanitization must separately enumerate what it removes or disables; it must not be marketed as comprehensive merely because one class of active content was stripped.

## Compare semantics

PDF compare is not one scalar boolean.

Future planning should distinguish as applicable:

- exact byte identity;
- normalized structural difference;
- page geometry difference;
- rendered visual difference;
- text/extraction difference;
- form/annotation difference;
- metadata/attachment difference.

A comparison provider must state what it did not inspect.

## Repair and compression semantics

Repair and compression are revision-creating and potentially lossy.

Future results must identify:

- source revision;
- operation/provider/version;
- output digest;
- warnings/data loss where observable;
- whether unsupported objects/features were dropped;
- whether rendering/text/forms/attachments/signature-related structures changed.

"Opened successfully" is not evidence of semantic preservation.

## OCR and conversion boundaries

OCR and office/image conversion are provider boundaries, not hidden parser behavior.

They require:

- explicit provider identity/version;
- explicit locality;
- input/output revision lineage;
- resource/deadline/cancellation limits;
- language/model/config evidence where relevant;
- no signing-key/control-plane-secret access;
- deterministic request/result metadata where possible;
- clear uncertainty/error semantics;
- output as a new revision.

Specification 004 may shape these contracts. Heavy-provider orchestration belongs to later Specification 010 work.

## Engine strategy — candidates, not adoption

Canonical Foundation strategy recommends multiple fit-for-purpose engines behind one Signthos capability contract.

Fresh Stage P discovery observations on 2026-09-06:

- EmbedPDF public releases expose `v3.0.0-next.11` as a prerelease; the Foundation-pinned `v2.15.0` remains an existing non-prerelease release. Stage P does not auto-upgrade the candidate to v3 or moving `main`.
- `LibPDF-js/core` public releases expose `v0.4.2` as the latest observed non-prerelease release; Foundation pins release commit `2144a0a5c4b4ef26373f0f8c30af613c1f17802d` for later revalidation.
- Foundation records EmbedPDF `v2.15.0` at commit `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed` and its PDFium runtime candidate `embedpdf/pdfium@cb29e78f2ba00c9298714d5f4a8bf7765f1e802f`.
- `pdfium-render` is a native Rust binding candidate only; exact crate/API/PDFium binary versions must be qualified before adoption.
- `lopdf` is a bounded structural/tooling candidate only, especially before signature boundaries.
- MuPDF is not a default core dependency due to AGPL/commercial dual-license complexity; any later use requires explicit bounded license/distribution acceptance.

No item above is an adopted dependency.

## Engine qualification requirements

Before any future dependency/provider adoption, its grain must bind evidence for the exact candidate actually shipped/executed:

- repository and immutable source revision/tag;
- package/crate name and exact version;
- exact paths/artifacts used;
- binary/WASM source provenance;
- transitive/bundled third-party components;
- licenses/SPDX and required copyright/NOTICE texts;
- SBOM/distribution obligations;
- CVE/advisory/update path;
- runtime platform/architecture matrix;
- capability matrix against exact corpus;
- unsupported/partial behavior;
- resource/cancellation/isolation behavior;
- browser/native/server locality behavior;
- representative performance evidence;
- deterministic or explicitly bounded nondeterminism;
- independent review.

A wrapper package license does not automatically license a bundled native/WASM binary or its third-party components.

## Provider convergence rule

Different engines may implement the same Signthos capability only if their externally observable contract remains compatible.

Provider-specific extensions may exist only as explicit optional capability parameters/results. They cannot silently fork revision identity, authorization, locality, error, evidence, or security semantics.

Cross-provider qualification should use shared corpus records and comparable evidence schemas.

## Performance evidence

Stage P defines categories, not fabricated targets.

Future grains must select representative budgets and hardware/runtime profiles for the capability being qualified, including as relevant:

- cold/warm initialization;
- first-page render;
- page navigation/render throughput;
- text extraction/search;
- edit/save latency;
- peak memory;
- output size;
- large-document degradation;
- cancellation latency;
- browser/native/server differences.

No performance number is claimed by Stage P.

## Error and uncertainty model

PDF capability failures must map into stable semantic classes. Candidate categories include:

```text
INVALID_INPUT
MALFORMED_PDF
UNSUPPORTED_PDF_FEATURE
ENCRYPTED_REQUIRES_CREDENTIAL
INVALID_CREDENTIAL
RESOURCE_LIMIT_EXCEEDED
TIMEOUT
CANCELLED
PROVIDER_UNAVAILABLE
CAPABILITY_UNSUPPORTED
OUTPUT_VALIDATION_FAILED
INTERNAL_PROVIDER_ERROR
```

Exact machine codes belong to a later bounded contract grain. Engine-specific raw text is diagnostic detail, not the stable contract.

Unsupported/unknown states fail closed. They are never converted to a valid/success state merely to preserve workflow continuity.

## Privacy and logging

Default telemetry/logging policy for PDF operations:

- no raw document bytes;
- no extracted document text;
- no passwords/decryption keys;
- no attachment contents;
- no signing material;
- no unrestricted user file names/paths where they may contain sensitive information;
- prefer opaque operation/revision/provider IDs and bounded non-content metrics;
- diagnostic capture of content requires a separately explicit, user-controlled support flow and is not authorized by Stage P.

## Candidate product capability definition of done

A future PDF capability is not canonically complete from successful local code alone.

Where applicable it requires:

1. canonical dependency order and explicit implementation authority;
2. exact dependency/source/provenance qualification;
3. pinned fixture corpus evidence;
4. focused deterministic contract tests;
5. malformed/adversarial/resource-limit tests;
6. cancellation/timeout evidence;
7. no-silent-network/locality evidence;
8. revision/digest/lineage evidence;
9. independent validation for safety claims such as redaction;
10. representative performance evidence when the capability exposes performance requirements;
11. exact-head CI/check accounting;
12. independent substantive exact-head review;
13. zero unresolved material review threads;
14. mandatory premerge proof;
15. expected-head guarded merge;
16. post-merge verification;
17. canonical task/roadmap/successor reconciliation.

## Stage P completion boundary

Stage P is complete only when the shaping package itself passes independent substantive exact-head review, guarded merge, post-merge verification, and a mandatory Stage P closeout/successor reconciliation.

Stage P completion does not itself imply engine adoption or implementation authority. Any future 004 grain must be explicitly authorized from live canonical truth.
