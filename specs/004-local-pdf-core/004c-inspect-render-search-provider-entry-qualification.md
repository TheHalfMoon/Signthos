# Specification 004C — Inspect / Render / Search Provider Entry Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_PROVIDER_ENTRY_ONLY / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `c8e5eba21b7c83eeff04eab2592d401c8985d62c`
Authority source: `github:issue-comment:5562660897`

## 1. Canonical authority

Canonical Specification 004A and 004B are complete predecessors for this bounded planning grain.

Fresh post-004B reconciliation authorizes exactly:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 004C_INSPECT_RENDER_SEARCH_PROVIDER_ENTRY_QUALIFICATION
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

This artifact exercises only that planning/provider-entry authority.

It does not install, download, adopt, import, execute, build, benchmark, package, ship, or integrate a PDF engine or provider.

## 2. Purpose

004C freezes the Signthos-owned entry contract for the first Local PDF Core capability grain:

- inspect immutable PDF bytes;
- render pages and thumbnails;
- expose text extraction/selection observations;
- search extracted PDF text;
- preserve exact input revision identity and bytes;
- fail closed on unsupported, malformed, encrypted, active-content, resource, cancellation, and locality boundaries;
- bind the exact browser provider candidate that a later separately authorized implementation/evidence grain may evaluate.

The purpose is to prevent implementation convenience in EmbedPDF/PDFium from redefining Signthos domain, revision, error, security, locality, or evidence semantics.

004C is not a viewer product specification. UI composition, editor chrome, product routes, persistence, envelope/signing flows, native parity, and web-product convergence remain later ownership.

## 3. Canonical predecessors consumed without reopening

004C consumes these canonical rules:

1. `DocumentRevision` identifies immutable exact content.
2. read-only operations cannot overwrite or replace a revision.
3. provider identity is not document or workflow identity.
4. provider runtime state cannot redefine canonical domain lifecycle.
5. provider capability support and runtime availability are separate dimensions.
6. unsupported, unavailable, malformed-untrusted-document, resource-limit, timeout, cancellation, and invariant failures remain distinguishable.
7. browser/native/server/heavy provider kind and execution locality are independent capability metadata.
8. local execution cannot silently transition to network processing.
9. provider errors normalize into Signthos stable errors rather than leaking provider-private error taxonomies as domain truth.
10. temporary/render/cache bytes are not canonical `DocumentRevision` content.
11. signed/signing-bound input cannot be silently rewritten by a read-only provider.
12. active content is default-deny unless a later exact capability explicitly authorizes execution.
13. passwords, keys, tokens, document bytes, and unnecessary document content do not belong in ordinary logs/evidence.
14. corpus evidence must bind exact fixture revision/digest to exact engine/provider identity.
15. public availability does not imply fixture rights or redistribution authority.
16. visual disappearance does not prove safe redaction.
17. Specification 005 owns cryptographic signing and verification semantics.

004C consumes those contracts; it does not amend them.

## 4. Allowed change surface

This planning qualification may add only Signthos-authored material under:

`specs/004-local-pdf-core/**`

It authorizes none of:

- package installation;
- npm/pnpm registry acquisition;
- `package.json` creation or mutation;
- lockfile creation or mutation;
- Cargo manifest mutation;
- upstream source import;
- WASM/native-binary import;
- external fixture acquisition;
- synthetic PDF fixture byte generation;
- browser/provider execution;
- PDF parsing/rendering/search execution;
- TypeScript/Rust runtime implementation;
- React or other UI integration;
- workflow/container mutation;
- provenance/NOTICE/SBOM mutation;
- database/Prisma mutation;
- signing or verification implementation;
- 004D work;
- Specification 005 work.

## 5. Selected exact browser provider candidate

The selected **planning candidate** for this grain is the canonical Foundation/ROADMAP browser direction revalidated by 004B:

```text
providerCandidateId = embedpdf-v2.15.0-pdfium-browser
providerKind = BROWSER
locality = LOCAL_ONLY
exactRepository = https://github.com/embedpdf/embed-pdf-viewer
releaseRef = refs/tags/v2.15.0
exactSourceRevision = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
corePackage = @embedpdf/core@2.15.0
pdfiumPackage = @embedpdf/pdfium@2.15.0
pdfiumSourceGitlink = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
```

Rules:

1. `selected planning candidate` does not mean `adopted dependency`;
2. it does not authorize package download or runtime execution;
3. it does not prove the npm archive graph equals every source-workspace file at the Git revision;
4. it does not prove runtime correctness, security, performance, cancellation, resource, browser compatibility, or corpus conformance;
5. it does not authorize EmbedPDF v3 prerelease or moving `main` substitution;
6. it does not authorize native PDFium or `pdfium-render` as part of this browser grain;
7. it does not authorize cloud/server products associated with EmbedPDF;
8. it does not permit provider semantics to replace canonical Signthos capability semantics.

## 6. Why this candidate is bounded to the first browser grain

Canonical ROADMAP orders inspect/render first and identifies stable/pinned EmbedPDF + PDFium for interactive browser/editor behavior.

Canonical 004B revalidated the exact v2.15.0 repository revision and PDFium runtime gitlink as a feasible browser candidate.

Other 004B candidates remain outside this first browser entry:

- `@libpdf/core@0.4.2` is retained for proven structural operations in later revision-creating grains;
- `pdfium-render@0.9.4` remains a native binding candidate with unresolved exact selected-asset source/build/attestation/platform/runtime binding;
- `lopdf@0.44.0` remains bounded structural/tooling candidate work;
- heavy providers remain deferred until an operation genuinely requires them.

This role distinction is capability ownership, not a claim that EmbedPDF/PDFium is universally superior.

## 7. Pinned upstream package observations

Fresh immutable source inspection at `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed` verifies source manifests for these candidate packages:

```text
@embedpdf/core@2.15.0
@embedpdf/pdfium@2.15.0
@embedpdf/plugin-document-manager@2.15.0
@embedpdf/plugin-render@2.15.0
@embedpdf/plugin-thumbnail@2.15.0
@embedpdf/plugin-search@2.15.0
@embedpdf/plugin-selection@2.15.0
```

Each inspected source manifest declares MIT at that pinned source revision.

The PDFium wrapper license remains insufficient as complete runtime license evidence. `packages/pdfium/LICENSE.pdfium` and bundled/transitive notices remain separate distribution obligations.

### 7.1 Candidate direct capability packages

A later acquisition grain may consider the following direct package roles, but must revalidate exact registry metadata before installation:

| Candidate package | Planned 004C role | Current evidence class |
| --- | --- | --- |
| `@embedpdf/core@2.15.0` | provider/plugin host contract | immutable source manifest only |
| `@embedpdf/pdfium@2.15.0` | browser PDFium WASM engine boundary | immutable source manifest + exact source gitlink |
| `@embedpdf/plugin-document-manager@2.15.0` | document loading/lifetime boundary | immutable source manifest only |
| `@embedpdf/plugin-render@2.15.0` | page render observations | immutable source manifest only |
| `@embedpdf/plugin-thumbnail@2.15.0` | thumbnail render observations | immutable source manifest only |
| `@embedpdf/plugin-search@2.15.0` | text-search observations | immutable source manifest only |
| `@embedpdf/plugin-selection@2.15.0` | selection-oriented text observation | immutable source manifest only |

This table is not an installation list.

### 7.2 Transitive/peer closure is not yet qualified

Source workspace manifests reference additional workspace and peer packages, including examples such as:

- `@embedpdf/models`;
- `@embedpdf/engines` through the core workspace;
- `@embedpdf/utils` for selection support;
- `@embedpdf/plugin-interaction-manager` as a selection peer;
- framework peers such as React/Preact/Vue/Svelte depending on integration surface.

004C does not infer an exact published npm closure from `workspace:*` source declarations.

A later dependency-acquisition grain must bind the exact registry package graph, integrity values, transitive licenses, peer requirements, shipped files, and actual framework surface chosen by Signthos.

## 8. Current Signthos workspace reality

Canonical `main` currently has no root `package.json` and no JavaScript/TypeScript product package tree. The `packages/` directory currently contains only `packages/prisma`.

Therefore 004C must not pretend an existing browser package manifest is available for dependency insertion.

A later implementation/acquisition authority must explicitly decide and authorize:

- the destination package/workspace boundary;
- whether a new package manifest/workspace configuration is required;
- exact package manager and lockfile surface;
- exact package names/versions/integrities;
- provenance/NOTICE/SBOM updates;
- runtime source/test files;
- browser build/test harness location.

No package-path name is canonicalized by this planning artifact.

## 9. Signthos provider descriptor for 004C

The future adapter must map the concrete implementation to the canonical Specification 003E provider contract.

Conceptually:

```text
PdfBrowserInspectProviderDescriptor {
  providerId
  providerKind = BROWSER
  locality = LOCAL_ONLY
  providerCandidateId = embedpdf-v2.15.0-pdfium-browser
  implementationVersionEvidence
  capabilityContractVersion
  declaredCapabilities[]
}
```

Rules:

1. `providerId` is Signthos registry identity, not npm package name;
2. package names and PDFium engine identifiers are implementation evidence only;
3. `LOCAL_ONLY` forbids document-content upload/fetch fallback during capability execution;
4. network loss cannot change execution locality;
5. package-update telemetry or unrelated application networking cannot become a hidden document-upload channel;
6. provider registration does not grant document authorization;
7. capability support does not imply runtime availability;
8. unavailable/unknown availability fails closed for execution eligibility.

## 10. 004C capability catalog

004C owns these initial semantic capability codes:

```text
PDF_INSPECT_V1
PDF_PAGE_RENDER_V1
PDF_THUMBNAIL_RENDER_V1
PDF_TEXT_EXTRACT_V1
PDF_TEXT_SELECT_V1
PDF_TEXT_SEARCH_V1
```

Every 004C capability is:

```text
effectClass = READ_ONLY
locality = LOCAL_ONLY
```

No 004C capability creates a canonical document revision.

No output from 004C is a signature-validity, redaction-safety, archival-conformance, or semantic-preservation claim.

## 11. Common request contract

A future 004C provider operation consumes semantic input equivalent to:

```text
PdfReadOnlyOperationRequest {
  operationId
  capabilityRef
  documentId
  inputRevisionId
  inputExactBytesDigest
  providerId
  providerCapabilityVersion
  deadline?
  cancellationToken?
  resourceBudgetRef
  capabilityParameters
}
```

Rules:

1. `inputRevisionId` identifies the exact immutable Signthos revision;
2. `inputExactBytesDigest` must match the bytes actually supplied to the provider;
3. the provider may not silently substitute another revision, cached document, remote URL, or mutable alias;
4. document bytes remain untrusted input;
5. provider-private handles are runtime metadata, never canonical revision identity;
6. retry may repeat a read-only observation but cannot silently change input revision/provider/version;
7. resource/deadline/cancellation parameters are evidence inputs rather than UI-only hints.

## 12. Common result contract

A successful 004C operation returns semantic evidence equivalent to:

```text
PdfReadOnlyOperationResult {
  operationId
  capabilityRef
  providerId
  providerVersionEvidence
  inputRevisionId
  inputExactBytesDigest
  status
  observations
  warnings[]
  resourceEvidence?
  durationEvidence?
  determinismEvidence?
}
```

Rules:

1. success cannot create or replace `DocumentRevision` content;
2. provider temporary/render/cache bytes are not canonical output revisions;
3. the exact input digest is echoed as evidence of observation binding;
4. warnings cannot be dropped merely because primary output exists;
5. partial/cancelled/timed-out output cannot be published as full success;
6. unsupported/uncertain fields remain explicit rather than guessed;
7. provider-private object IDs are excluded from domain identity;
8. secret/password input is not returned in result evidence.

## 13. Exact input immutability

All 004C operations are byte-preserving with respect to canonical input.

A conforming adapter must prove:

```text
canonicalInputDigestBefore == canonicalInputDigestAfter
canonicalRevisionIdBefore == canonicalRevisionIdAfter
newCanonicalRevisionCreated == false
```

Temporary internal memory, decoded image buffers, search indexes, render surfaces, or caches do not violate the read-only contract only if they cannot replace canonical source bytes.

If a provider API implicitly saves, repairs, normalizes, or rewrites the document as part of an inspection operation, that API is not conformant to 004C `READ_ONLY` semantics without a separately authorized revision-creating contract.

## 14. `PDF_INSPECT_V1`

Purpose: return bounded structural observations required to safely route later capabilities.

Candidate observation fields may include:

```text
PdfInspectObservation {
  pageCount?
  pageBoxes?
  pageRotations?
  encryptionState?
  metadataPresence?
  formPresence?
  attachmentPresence?
  activeContentIndicators?
  warnings[]
  unsupportedObservations[]
}
```

Rules:

1. absence of an observation means unknown/unsupported, not false;
2. inspect does not execute JavaScript/actions/URI launches;
3. inspect does not decrypt without explicit password material supplied for the operation;
4. password values are ephemeral secrets and excluded from ordinary evidence/logs;
5. page-box observations must identify the box type and page index;
6. provider guesses must not become canonical facts;
7. signature structures may be observed as presence metadata, but cryptographic verification is out of scope.

## 15. `PDF_PAGE_RENDER_V1`

Purpose: render a page observation from exact immutable PDF bytes.

Conceptual parameters:

```text
PdfPageRenderParameters {
  pageIndex
  targetPixelWidth?
  targetPixelHeight?
  scale?
  pageBox
  backgroundPolicy
  rotationPolicy
}
```

Conceptual evidence:

```text
PdfPageRenderObservation {
  pageIndex
  pixelWidth
  pixelHeight
  renderedDigest?
  renderConfigurationEvidence
  warnings[]
}
```

Rules:

1. page indexing semantics must be explicit and adapter-normalized;
2. render dimensions/configuration must be recorded for comparison evidence;
3. active content is not executed to obtain the render;
4. rendering must not mutate canonical bytes;
5. hidden network fetches for document content/resources are forbidden;
6. font/image decoding is subject to resource budgets;
7. malformed or unsupported content may produce warnings/failure rather than fabricated visual completeness;
8. rendered output is an observation, not a new canonical PDF revision.

### 15.1 Render determinism and tolerance

Exact pixel identity is not assumed universally.

A later runtime qualification must classify a supported render path as one of:

```text
PIXEL_DETERMINISTIC_FOR_PINNED_ENVIRONMENT
BOUNDED_VISUAL_VARIANCE
UNQUALIFIED
```

If bounded variance is accepted, the exact comparison metric, threshold, environment, fonts, scale, page box, color/background configuration, and corpus revision must be recorded.

No numeric tolerance is invented by 004C planning.

## 16. `PDF_THUMBNAIL_RENDER_V1`

Thumbnail rendering is a distinct capability because resource policy and output dimensions differ from full page rendering.

Rules:

1. thumbnail output remains bound to exact source revision/digest;
2. thumbnail generation is read-only;
3. dimensions/scale are explicit;
4. thumbnail caches cannot replace source revision identity;
5. failure to render a thumbnail cannot be interpreted as document invalidity without inspect evidence;
6. resource limits may be stricter than full page rendering;
7. thumbnail generation cannot silently invoke a network renderer.

## 17. `PDF_TEXT_EXTRACT_V1`

Purpose: return text observations derived from exact PDF bytes.

Conceptual result:

```text
PdfTextExtractionObservation {
  pages[] {
    pageIndex
    textRuns[]
    normalizedText?
    geometryEvidence?
    directionEvidence?
    warnings[]
  }
  unsupportedFeatures[]
}
```

Rules:

1. extracted text is observation evidence, not canonical document content;
2. provider order and Unicode mapping limitations must remain observable;
3. missing glyph mapping cannot be silently repaired into invented characters;
4. Arabic/RTL and mixed-direction fixtures are mandatory evidence families before support claims;
5. ligatures, unusual encodings, embedded fonts, combining marks, and invisible text require explicit fixture coverage;
6. geometry may be absent if provider support is unqualified;
7. extraction must not execute active content;
8. extraction must not upload document bytes.

## 18. `PDF_TEXT_SELECT_V1`

Purpose: expose bounded selection observations needed by a future browser workspace.

This is not UI selection chrome. It is the provider semantic boundary for mapping user-selected rendered regions to text observations.

Conceptual evidence may include:

```text
PdfTextSelectionObservation {
  pageIndex
  selectedText
  textRunRefs?
  geometry?
  directionEvidence?
  warnings[]
}
```

Rules:

1. selection result is bound to the exact rendered/source revision;
2. selection cannot create annotations or content changes;
3. selection must not imply extraction completeness outside the selected region;
4. selection geometry and text ordering limitations remain explicit;
5. copy-to-clipboard behavior is product/UI work, not provider semantics.

## 19. `PDF_TEXT_SEARCH_V1`

Search is a semantic operation over provider-extracted PDF text, not a browser substring search over arbitrary UI strings.

Conceptual request:

```text
PdfTextSearchParameters {
  query
  matchMode
  pageRange?
  maxResults?
}
```

Initial canonical match modes are intentionally narrow:

```text
EXACT_CODEPOINT
CASE_INSENSITIVE_PROVIDER_QUALIFIED
```

Rules:

1. `EXACT_CODEPOINT` means the adapter must not silently case-fold, accent-fold, transliterate, stem, OCR, or normalize away characters beyond explicitly recorded provider decoding;
2. `CASE_INSENSITIVE_PROVIDER_QUALIFIED` may be exposed only after exact Unicode/case behavior is characterized by fixtures;
3. locale-sensitive transformations are not silently enabled;
4. fuzzy search, semantic search, stemming, OCR, and AI search are outside 004C;
5. every hit identifies page and source-revision binding;
6. result snippets cannot become evidence of complete text extraction;
7. max-results truncation must be explicit;
8. cancelled/timed-out search cannot be represented as exhaustive success.

## 20. Search result contract

Conceptually:

```text
PdfTextSearchObservation {
  queryEvidence
  matchMode
  hits[] {
    pageIndex
    matchedText
    textRunRef?
    geometry?
  }
  complete
  truncatedReason?
  warnings[]
}
```

Rules:

1. `complete = true` requires the provider to have searched the full requested page range under the exact capability semantics;
2. resource-limit, timeout, cancellation, unsupported page content, or extraction failure forces `complete = false` unless no omitted region could contain a match and that condition is independently proven;
3. a partial hit list is useful evidence but is not exhaustive success;
4. provider ranking is not introduced in v1.

## 21. Active-content default deny

004C browser execution treats PDF active content as untrusted.

Default policy:

```text
JAVASCRIPT_EXECUTION = DENY
EMBEDDED_ACTION_EXECUTION = DENY
URI_AUTO_OPEN = DENY
REMOTE_CONTENT_FETCH = DENY
EMBEDDED_FILE_AUTO_EXECUTION = DENY
LAUNCH_ACTION_EXECUTION = DENY
```

Rules:

1. inspection may report active-content indicators without executing them;
2. rendering cannot require active-content execution for success;
3. ignored/unsupported active content may produce warnings;
4. later product UX may expose links/actions only through separately authorized safe interaction semantics;
5. no provider setting may silently weaken these defaults.

## 22. Locality and no-silent-network contract

004C is `LOCAL_ONLY`.

During document capability execution:

- document bytes cannot be uploaded;
- remote rendering cannot be used;
- remote text extraction/search cannot be used;
- provider fallback cannot become server/cloud processing;
- external URL references inside the PDF cannot be fetched to complete rendering;
- remote fonts/resources cannot be fetched as a hidden rendering dependency;
- an unavailable local WASM engine returns an unavailable/unsupported failure rather than network fallback.

A later runtime grain must instrument or otherwise prove this behavior under representative failure conditions.

## 23. Encrypted-input contract

004C distinguishes:

```text
UNENCRYPTED
ENCRYPTED_PASSWORD_REQUIRED
ENCRYPTED_PASSWORD_ACCEPTED
ENCRYPTED_UNSUPPORTED
ENCRYPTED_MALFORMED_OR_INDETERMINATE
```

Rules:

1. passwords are operation-scoped secrets;
2. passwords do not enter ordinary logs, analytics, stable IDs, fixture names, screenshots, or persistent evidence;
3. a wrong password is not `MALFORMED_UNTRUSTED_DOCUMENT`;
4. unsupported encryption is not generic corruption;
5. decrypted temporary content remains governed by the same local-only and secret-isolation boundary;
6. no password storage semantics are authorized here.

Exact mapping to canonical stable errors must preserve these distinctions without exposing sensitive detail.

## 24. Malformed/untrusted input

Malformed PDFs remain an explicit trust boundary.

A future runtime must fail closed on classes including:

- truncated files;
- malformed xref/object streams;
- invalid object references;
- recursive/hostile structures;
- decompression bombs;
- extreme page/object counts;
- extreme page dimensions;
- image/font decode abuse;
- malformed encrypted structures.

A provider crash, worker termination, browser tab failure, or uncaught WASM exception is not acceptable semantic success.

Normalization into the canonical error boundary must preserve whether the operation failed because of malformed input, resource limits, unsupported capability, unavailability, timeout/cancellation, or an internal invariant violation.

## 25. Resource-budget contract

004C uses the canonical 004A resource taxonomy rather than inventing universal numeric limits.

A later runtime grain must make exact limits explicit for at least:

- source byte length;
- page count;
- object count where observable;
- decoded/decompressed bytes;
- image dimensions/pixels;
- page dimensions;
- memory budget;
- CPU/worker budget where measurable;
- wall-clock deadline;
- temporary/cache storage;
- concurrent render/search work;
- search result count.

Rules:

1. reaching a limit is a stable resource-limit result, not silent truncation unless the capability explicitly supports bounded partial results;
2. numeric values require evidence and may be platform-specific;
3. browser memory pressure cannot silently change locality or input revision;
4. resource limits may become stricter at runtime but cannot weaken security invariants.

## 26. Cancellation and timeout semantics

004C operations are read-only but may consume significant decode/render/search work.

A future adapter must distinguish:

```text
CANCELLED
TIMED_OUT
RESOURCE_LIMIT_EXCEEDED
UNAVAILABLE
FAILED
SUCCEEDED
```

Rules:

1. cancellation is best-effort until provider/runtime evidence proves stronger semantics;
2. late completion after cancellation/timeout must not overwrite the terminal Signthos operation state;
3. late render/search observations may be discarded/quarantined;
4. cancellation never mutates source bytes;
5. a partial search result after timeout/cancellation cannot claim exhaustiveness;
6. browser worker termination may be used as an implementation mechanism only if a later grain proves cleanup and state isolation.

## 27. Provider isolation and secret boundary

The PDF engine processes hostile bytes and receives no signing/control-plane secrets by default.

004C provider execution must not receive:

- signing private keys;
- KMS credentials;
- provider API bearer tokens unrelated to local PDF execution;
- server database credentials;
- envelope recipient authentication secrets;
- unrelated user documents.

The browser provider may receive only the exact authorized PDF bytes and operation-scoped password when required.

## 28. Logging and privacy

Default logs/evidence may include:

- operation/capability identifiers;
- provider/version evidence;
- exact input digest;
- fixture identifier in test contexts;
- resource/deadline class;
- stable error/warning classes;
- non-sensitive timing/resource summaries.

Default logs/evidence exclude:

- PDF bytes;
- extracted document text;
- search query text unless a later privacy-safe telemetry contract explicitly authorizes it;
- rendered page pixels;
- passwords;
- signing/auth tokens;
- user metadata/content unnecessary to diagnosis.

## 29. Corpus-entry plan

004C planning does not create fixture bytes.

A later separately authorized corpus/evidence grain must instantiate a versioned fixture manifest conforming to 004A.

Minimum 004C evidence families:

1. minimal valid PDF;
2. typical multi-page text/image PDF;
3. Arabic/RTL text;
4. mixed-direction text;
5. embedded fonts;
6. unusual encoding/ligature/combining-mark text;
7. image-heavy PDF;
8. unusual MediaBox/CropBox/rotation combinations;
9. annotations/forms present but not executed/modified;
10. active-content/actions/URI/JavaScript indicators;
11. encrypted/password-protected supported case;
12. wrong-password case;
13. unsupported encryption case where applicable;
14. truncated file;
15. malformed xref/object stream;
16. oversized page count;
17. oversized page dimensions;
18. decompression/resource-exhaustion case;
19. existing digital-signature/incremental-update document observed read-only;
20. search hit/no-hit/multiple-hit/truncation cases.

Every fixture must be `PUBLIC_OR_SYNTHETIC_ONLY` with exact rights/source/digest evidence before merge-critical use.

External fixture acquisition remains unauthorized by this planning grain.

## 30. Required runtime evidence matrix

Before 004C can claim implementation support, a later exact runtime/evidence grain must bind:

```text
RuntimeEvidenceKey {
  capabilityCode
  capabilityVersion
  providerCandidateId
  exactPackageGraphDigestOrLockEvidence
  exactPdfiumRuntimeIdentity
  platformBrowserEnvironment
  fixtureCorpusRevision
  fixtureCorpusDigest
  testHarnessRevision
  resultEvidenceRevision
}
```

Required evidence categories include:

- ordinary valid-input correctness;
- malformed-input fail-closed behavior;
- encrypted-input behavior;
- active-content non-execution;
- no-silent-network behavior;
- exact input bytes unchanged;
- resource-limit behavior;
- cancellation/timeout behavior;
- Arabic/RTL extraction/search;
- render configuration consistency;
- bounded determinism/tolerance classification;
- unsupported/uncertainty behavior;
- representative performance baselines.

No row is currently satisfied merely by this planning document.

## 31. Dependency-acquisition gate

A future dependency-acquisition grain must not simply run `pnpm add` or equivalent.

Before package mutation it must bind:

1. exact destination workspace/package boundary;
2. exact package manager and manifest/lockfile files;
3. exact registry versions and integrity hashes;
4. exact dependency/peer/transitive closure;
5. registry tarball provenance relative to pinned source evidence;
6. all license/SPDX/NOTICE obligations;
7. PDFium WASM provenance and bundled third-party notices;
8. SBOM entries;
9. advisory/CVE/update path;
10. excluded packages/features/services;
11. deterministic install/lock evidence;
12. rollback/removal path.

The current repository lacks an existing browser package manifest, so this gate must also explicitly authorize any new workspace/package structure required by implementation.

## 32. Excluded EmbedPDF surfaces

Selection of the v2.15.0 browser candidate does not select every repository package.

004C explicitly excludes unless later required and separately qualified:

- AI packages/plugins;
- annotation editing;
- form editing;
- redaction application;
- signature creation;
- stamp/content editing;
- export/save mutation paths;
- attachment mutation;
- cloud/server services;
- v3 prerelease paths;
- any restricted/proprietary path not covered by exact rights evidence.

A package being present in the upstream monorepo is not authorization to acquire or expose it.

## 33. Interaction with signatures

004C may inspect/render/search a signed PDF read-only.

Rules:

1. 004C never claims cryptographic signature validity;
2. it never rewrites signed bytes;
3. it may report that signature-related structures appear present only as unverified structural observation;
4. signature status/trust/timestamp/PAdES claims belong to Specification 005;
5. any provider behavior that saves/normalizes signed input is non-conformant for this read-only grain.

## 34. Interaction with future native provider

004C browser qualification does not prove native parity.

A later native grain must separately bind:

- exact `pdfium-render` crate/archive/source equivalence;
- exact selected native PDFium asset;
- source/build/attestation/NOTICE binding;
- target architecture/platform packaging;
- native isolation/resource behavior;
- corpus convergence against the browser provider where both claim equal capability semantics.

No native dependency selection is made here.

## 35. Adversarial planning cases

A later implementation/evidence grain must demonstrate at minimum:

### Case A — exact revision mismatch

Request names revision/digest A but supplied bytes hash to B.

Expected:

```text
FAIL_CLOSED
NO_PROVIDER_SUCCESS_PUBLICATION
NO_REVISION_MUTATION
```

### Case B — local engine unavailable

WASM/provider initialization fails.

Expected:

```text
UNAVAILABLE
NO_NETWORK_FALLBACK
```

### Case C — active JavaScript present

Inspection observes an active-content indicator.

Expected:

```text
NO_SCRIPT_EXECUTION
WARNING_OR_OBSERVATION_ALLOWED
READ_ONLY_INPUT_PRESERVED
```

### Case D — malformed decompression bomb

Decode exceeds configured resource budget.

Expected:

```text
RESOURCE_LIMIT_EXCEEDED
NO_PARTIAL_SUCCESS_CLAIM
SOURCE_BYTES_PRESERVED
```

### Case E — cancelled search with hits already found

Expected:

```text
CANCELLED
PARTIAL_HITS_MAY_BE_QUARANTINED_OR_MARKED_INCOMPLETE
EXHAUSTIVE_SUCCESS = FALSE
```

### Case F — encrypted input wrong password

Expected:

```text
AUTHORIZATION_TO_DOCUMENT_UNCHANGED
PASSWORD_FAILURE_DISTINCT_FROM_MALFORMED_DOCUMENT
PASSWORD_NOT_LOGGED
```

### Case G — Arabic/RTL extraction

Provider returns reordered or missing text runs relative to fixture expectation.

Expected:

```text
QUALIFICATION_FAIL_FOR_CLAIMED_TEXT_CAPABILITY
NO_INVENTED_TEXT_REPAIR
```

### Case H — signed input

Provider render path attempts implicit save/repair.

Expected:

```text
NON_CONFORMANT_READ_ONLY_PROVIDER_PATH
CANONICAL_SIGNED_BYTES_UNCHANGED
```

### Case I — provider returns partial search after resource limit

Expected:

```text
complete = false
stableLimitEvidence = present
NO_EXHAUSTIVE_SUCCESS_CLAIM
```

### Case J — external resource reference

PDF references a remote URL/resource.

Expected:

```text
REMOTE_FETCH = DENY
LOCAL_ONLY_PRESERVED
```

## 36. Qualification completion gates

This 004C provider-entry planning candidate is eligible for canonicalization only if:

1. canonical `main` and Issue #7 authority remain unchanged for its base;
2. exact selected planning candidate identity remains pinned to EmbedPDF v2.15.0/PDFium gitlink evidence;
3. no dependency/source/binary/fixture bytes are imported;
4. no package/lockfile/workflow/container/runtime/database surface changes;
5. provider/capability contracts preserve Specification 003/004A semantics;
6. package observations remain non-adoption evidence;
7. current workspace absence of a browser package manifest is stated truthfully;
8. runtime/corpus/performance/security results remain explicitly unproven;
9. exact diff accounting is clean;
10. exact-head applicable check/provider state is truthfully accounted;
11. fresh independent substantive exact-head review reports no unresolved material finding;
12. unresolved review threads are zero;
13. guarded merge uses the exact reviewed head;
14. post-merge tree/parent/signature/surface/check state is verified;
15. fresh successor reconciliation occurs before any dependency acquisition/runtime work.

## 37. Successor handoff — fail closed

Canonicalization of this planning artifact must not automatically authorize dependency acquisition or 004C runtime implementation.

A future successor may be derived only from fresh post-merge truth.

Expected unresolved gates include:

```text
BROWSER_WORKSPACE_DESTINATION = UNRESOLVED
EXACT_REGISTRY_PACKAGE_GRAPH = UNPROVEN
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = UNPROVEN
PDFIUM_WASM_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
004C_FIXTURE_CORPUS_BYTES = ABSENT
004C_FIXTURE_CORPUS_REVISION_DIGEST = ABSENT
004C_RUNTIME_CORPUS_RESULTS = ABSENT
004C_RESOURCE_LIMIT_VALUES = ABSENT
004C_CANCELLATION_EVIDENCE = ABSENT
004C_NO_NETWORK_RUNTIME_EVIDENCE = ABSENT
004C_PERFORMANCE_BASELINE = ABSENT
004C_IMPLEMENTATION_AUTHORITY = ABSENT
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

The next unit must be separately authorized and may need to resolve workspace/package creation, exact dependency acquisition/provenance, synthetic fixture authoring, or runtime evidence in dependency order.

## 38. Explicit non-claims

This artifact does not claim that:

- EmbedPDF/PDFium is already integrated into Signthos;
- any npm package was downloaded or installed;
- any PDF was parsed or rendered;
- any browser was executed;
- any fixture exists;
- any resource limit has been measured;
- any active-content defense has been runtime-proven;
- any no-network behavior has been runtime-proven;
- any Arabic/RTL behavior has been runtime-proven;
- any performance target has been met;
- any signature remains valid after provider execution;
- any redaction is safe;
- any native provider is selected;
- 004D is authorized;
- Specification 005 is authorized.

The only canonical intent of 004C provider-entry qualification is to make the first inspect/render/search implementation grain small enough to execute later without inventing its provider, security, package, corpus, locality, or evidence contract during coding.
