# Specification 004B — Engine Provenance, License, and Capability Feasibility Qualification

Status: `QUALIFICATION_CANDIDATE / DISCOVERY_ONLY / ZERO_ADOPTION`
Issue: #7
Canonical base: `3f321f74b81c50397768cc253b4e4984a82071ce`
Canonical predecessor: Specification 004A `CLOSED_CANONICAL_PLANNING_CONTRACT`
Research cutoff: `2026-09-07`

## 1. Authority

Issue #7 comment `github:issue-comment:5562425019` authorizes exactly:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 004B_ENGINE_PROVENANCE_LICENSE_CAPABILITY_FEASIBILITY_QUALIFICATION
004B_AUTHORITY = DISCOVERY_QUALIFICATION_ONLY
004B_PUBLIC_SOURCE_METADATA_RESEARCH_AUTHORITY = PRESENT
004B_IMMUTABLE_CANDIDATE_EVIDENCE_AUTHORITY = PRESENT
004B_IMPLEMENTATION_AUTHORITY = ABSENT
004B_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004B_DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
004B_SOURCE_IMPORT_AUTHORITY = ABSENT
004B_EXTERNAL_FIXTURE_ACQUISITION_AUTHORITY = ABSENT
004B_PROVIDER_RUNTIME_EXECUTION_AUTHORITY = ABSENT
SPEC_004_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_PACKAGE_MANIFEST_LOCKFILE_AUTHORITY = ABSENT
SPEC_004_DATABASE_MIGRATION_AUTHORITY = ABSENT
SPEC_004_SIGNING_IMPLEMENTATION_AUTHORITY = ABSENT
004C_AUTHORITY = NOT_YET_CANONICAL_SUCCESSOR_AUTHORITY
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact is Signthos-authored qualification evidence only.

It does not install, download into the repository, vendor, import, adopt, execute, build, benchmark, package, ship, or select any candidate as a Signthos runtime dependency.

It does not modify product code, package manifests, lockfiles, Cargo manifests, workflows, containers, database surfaces, provenance inventory, NOTICE files, SBOM output, signing/verification code, or external fixture corpus bytes.

## 2. Purpose

004B answers one bounded question:

> Which exact immutable public candidates are sufficiently evidenced to remain feasible inputs to later Specification 004 provider-selection work, and which evidence gaps must block adoption or implementation claims?

004B deliberately separates public metadata qualification from later runtime qualification.

It does not answer:

- which provider Signthos will adopt;
- which dependency will be added to a manifest;
- whether a candidate passes the future 004A corpus;
- whether a candidate meets performance targets;
- whether a candidate safely handles malformed or hostile PDFs;
- whether redaction is safe;
- whether signature state is preserved;
- whether browser/native behavior is equivalent;
- whether a native/WASM binary is distributable as finally packaged;
- whether a provider implementation may begin.

Those claims require later explicit authority and evidence.

## 3. Evidence classification

Every material statement in this qualification uses one of these evidence classes:

```text
004B_EVIDENCE_CLASS =
  | VERIFIED_IMMUTABLE_METADATA
  | VERIFIED_REGISTRY_METADATA
  | UPSTREAM_CAPABILITY_CLAIM_ONLY
  | FOUNDATION_PRIOR_EVIDENCE_REVALIDATED
  | GAP_BLOCKING_ADOPTION
  | DEFERRED_RUNTIME_EVIDENCE
  | OUT_OF_SCOPE_FOR_004B
```

### 3.1 `VERIFIED_IMMUTABLE_METADATA`

A fact directly bound to an immutable repository object such as a tag target, commit, tree, manifest at exact revision, exact submodule gitlink, or exact license file.

### 3.2 `VERIFIED_REGISTRY_METADATA`

A fact bound to immutable package-registry metadata such as an exact version, checksum, feature set, and publication timestamp.

Registry metadata does not prove equivalence to an untagged Git commit unless the source archive itself is independently matched.

### 3.3 `UPSTREAM_CAPABILITY_CLAIM_ONLY`

Documentation, manifest description, package keyword, README, or project statement describing capability.

This class is useful for feasibility triage but is not runtime proof.

### 3.4 `FOUNDATION_PRIOR_EVIDENCE_REVALIDATED`

A Foundation candidate statement rechecked against fresh immutable evidence during 004B.

### 3.5 `GAP_BLOCKING_ADOPTION`

Required adoption evidence is missing, ambiguous, or cannot yet be bound to an immutable artifact.

A blocking gap does not mean the candidate is defective. It means Signthos must not adopt or ship it from current evidence.

### 3.6 `DEFERRED_RUNTIME_EVIDENCE`

A claim requiring separately authorized execution, corpus tests, platform packaging, benchmarking, security tests, independent validation, or provider implementation.

### 3.7 `OUT_OF_SCOPE_FOR_004B`

Evidence owned by another specification, especially cryptographic signing/verification behavior under Specification 005.

## 4. Shared candidate evidence record

Every candidate is evaluated against the Stage P matrix:

```text
CandidateEngineEvidence {
  exactRepository
  exactSourceRevision
  exactPackageOrCrateVersion
  exactPathsOrArtifacts
  binaryOrWasmProvenance
  transitiveBundledComponents
  licenseExpressions
  requiredNotices
  distributionObligations
  advisoryCveUpdatePath
  supportedPlatformsArchitectures
  capabilityClaims
  unsupportedOrPartialClaims
  executionLocality
  isolationBoundary
  resourceControls
  cancellationBehavior
  corpusEvidenceRef
  performanceEvidenceRef
}
```

Unknown fields stay unknown. They are not inferred from nearby metadata.

## 5. Candidate A — EmbedPDF v2.15.0 with pinned EmbedPDF PDFium runtime

### 5.1 Immutable repository identity

```text
candidateId = embedpdf-v2.15.0-pdfium
repository = https://github.com/embedpdf/embed-pdf-viewer
releaseRef = refs/tags/v2.15.0
releaseCommit = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
```

Fresh GitHub ref evidence confirms tag `v2.15.0` directly targets commit `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed`.

Evidence class: `VERIFIED_IMMUTABLE_METADATA`.

Foundation pin is therefore revalidated.

### 5.2 Exact package metadata

At the release commit:

```text
@embedpdf/core.version = 2.15.0
@embedpdf/core.license = MIT
@embedpdf/pdfium.version = 2.15.0
@embedpdf/pdfium.license = MIT
@embedpdf/pdfium.exports["./pdfium.wasm"] = "./dist/pdfium.wasm"
```

Evidence paths:

- `packages/core/package.json`
- `packages/pdfium/package.json`

Evidence class: `VERIFIED_IMMUTABLE_METADATA`.

### 5.3 PDFium source gitlink

At exact EmbedPDF release commit `2cf7df3b...`, path:

`packages/pdfium/pdfium-src`

is an actual Git submodule entry whose immutable gitlink SHA is:

```text
cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
```

The historical submodule URL is `https://github.com/embedpdf/pdfium.git`.

That repository now redirects/moved; the same immutable commit is available in current repository `https://github.com/embedpdf/runtime` as commit `cb29e78f2ba00c9298714d5f4a8bf7765f1e802f`.

This relocation does not alter the commit identity.

Evidence class: `VERIFIED_IMMUTABLE_METADATA`.

### 5.4 License and notice boundary

The JavaScript package manifests identify the wrapper packages as MIT.

That does **not** establish the complete license obligation for the distributed PDFium WASM binary.

Exact `packages/pdfium/LICENSE.pdfium` includes:

- PDFium BSD-style redistribution terms;
- Apache-2.0 license text;
- bundled-component notice material beyond the MIT wrapper declaration.

Therefore:

```text
WRAPPER_LICENSE_INFERENCE_FOR_WASM = PROHIBITED
PDFIUM_WASM_COMPONENT_INVENTORY = REQUIRED_BEFORE_ADOPTION
PDFIUM_THIRD_PARTY_NOTICE_PRESERVATION = REQUIRED_BEFORE_DISTRIBUTION
```

Evidence class: `VERIFIED_IMMUTABLE_METADATA` plus `GAP_BLOCKING_ADOPTION` for the final shipped binary inventory.

### 5.5 Capability disposition

Foundation and upstream documentation describe the v2 family as a candidate for interactive browser rendering, text selection/search, annotations, thumbnails/navigation, and redaction-oriented UX.

Those are `UPSTREAM_CAPABILITY_CLAIM_ONLY` / `FOUNDATION_PRIOR_EVIDENCE_REVALIDATED` until tested against the canonical 004A corpus and provider contract.

No redaction-safety, signature-preservation, hostile-input, performance, cancellation, or resource-control claim is qualified by 004B.

### 5.6 Locality and isolation

The package exports a browser-consumable `pdfium.wasm` and is architecturally a browser/WASM candidate.

Actual no-silent-network behavior, worker isolation, active-content non-execution, memory/resource budgets, and cancellation behavior require later implementation/runtime evidence.

Evidence class: `DEFERRED_RUNTIME_EVIDENCE`.

### 5.7 EmbedPDF v3 rule

Current or future v3 prerelease/moving-main work is not a substitute for this exact v2.15.0 candidate.

```text
EMBEDPDF_V3_IMPLICIT_SUBSTITUTION = PROHIBITED
```

Any v3 comparison requires a separate explicit evidence decision.

### 5.8 Candidate status

```text
feasibilityStatus = FEASIBLE_CANDIDATE_NOT_ADOPTED
adoptionStatus = BLOCKED_PENDING_RUNTIME_CORPUS_SECURITY_AND_DISTRIBUTION_EVIDENCE
```

## 6. Candidate B — LibPDF `@libpdf/core` v0.4.2

### 6.1 Immutable repository identity

```text
candidateId = libpdf-core-0.4.2
repository = https://github.com/LibPDF-js/core
releaseRef = refs/tags/v0.4.2
releaseCommit = 2144a0a5c4b4ef26373f0f8c30af613c1f17802d
package = @libpdf/core
packageVersion = 0.4.2
```

Fresh GitHub ref evidence confirms the tag directly targets the stated commit.

Evidence class: `VERIFIED_IMMUTABLE_METADATA`.

### 6.2 Root package and dependency metadata

At exact release commit, `package.json` states:

```text
name = @libpdf/core
version = 0.4.2
license = MIT
nodeEngine = >=20
```

Runtime dependency metadata includes exact semver ranges for:

- `@noble/ciphers`
- `@noble/hashes`
- `@scure/base`
- `asn1js`
- `lru-cache`
- `pako`
- `pkijs`

Google KMS and Secret Manager are optional peer dependencies.

These dependency declarations are immutable manifest evidence, not Signthos dependency selection.

### 6.3 Layered license evidence

Root `LICENSE.md` is MIT.

However `src/fontbox/LICENSE.md` is a component-level license/notice bundle that includes:

- Apache License 2.0 for derived FontBox/PDFBox code;
- historical FontBox BSD-style terms;
- SIL Open Font License 1.1 material for included/referenced font components;
- named font attribution/notice material including Lohit, FoglihtenNo07 and Josefin Sans.

Therefore:

```text
ROOT_MIT_ONLY_INFERENCE = PROHIBITED
FONTBOX_COMPONENT_NOTICE_ACCOUNTING = REQUIRED
EMBEDDED_FONT_LICENSE_ACCOUNTING = REQUIRED_WHERE_DISTRIBUTED
```

Evidence class: `VERIFIED_IMMUTABLE_METADATA`.

### 6.4 Capability disposition

Project/package documentation describes parsing/generation and exposes signing-related package metadata/keywords; Foundation evidence also records structural-operation claims such as merge/split, forms, attachments, encryption, text extraction and incremental save.

004B classifies these as `UPSTREAM_CAPABILITY_CLAIM_ONLY` until exact runtime/corpus evidence exists.

Any cryptographic signing or trust-verification behavior remains `OUT_OF_SCOPE_FOR_004B` and under Specification 005, even if public APIs expose signing primitives.

### 6.5 Platform/locality disposition

The library is a TypeScript/ESM candidate with Node `>=20` manifest requirement.

Browser compatibility, worker isolation, hostile-input behavior, memory/resource controls, cancellation semantics and no-network behavior are not proven by the package manifest.

Evidence class: `DEFERRED_RUNTIME_EVIDENCE`.

### 6.6 Candidate status

```text
feasibilityStatus = FEASIBLE_CANDIDATE_NOT_ADOPTED
adoptionStatus = BLOCKED_PENDING_CORPUS_RUNTIME_SECURITY_TRANSITIVE_LICENSE_AND_PLATFORM_EVIDENCE
```

## 7. Candidate C — `pdfium-render` 0.9.4 plus exact PDFium binary/source path

### 7.1 Registry identity

The crates.io index contains immutable registry metadata:

```text
crate = pdfium-render
version = 0.9.4
checksum = 8948a803616a9e936b15a6637af2cd48c5fb8ae0fcdeb3c32eac3a540e255a19
publishedAt = 2026-09-06T14:41:29Z
yanked = false
rustVersion = 1.61
```

The registry metadata lists default features equivalent to:

```text
pdfium_latest
image_latest
thread_safe
```

and maps:

```text
pdfium_latest -> pdfium_7881
```

Evidence class: `VERIFIED_REGISTRY_METADATA`.

### 7.2 Git source evidence and mapping gap

No Git ref `0.9.4` or `v0.9.4` exists in the public `ajrcarey/pdfium-render` repository at qualification time.

An immutable repository commit:

```text
4176e8a53511fa4c3647c7772ad481be07ec030c
```

has a `Cargo.toml` declaring:

```text
name = pdfium-render
version = 0.9.4
license = MIT OR Apache-2.0
default = [pdfium_latest, image_latest, thread_safe]
pdfium_latest = [pdfium_7881]
```

This is strong source-tree evidence, but 004B has not downloaded/imported the crates.io source archive and therefore has not proven byte/source equivalence between the published checksum and this untagged Git commit.

```text
CRATE_0_9_4_TO_GIT_COMMIT_EQUIVALENCE = UNPROVEN
```

Evidence class: `GAP_BLOCKING_ADOPTION`.

### 7.3 Binding-versus-binary separation

`pdfium-render` is a Rust wrapper/binding candidate. Its manifest does not itself prove the provenance of a PDFium native binary that Signthos might later ship.

The manifest's `pdfium_7881` feature binds API definitions to a PDFium API release family; it is not a binary digest.

Therefore:

```text
RUST_BINDING_LICENSE != PDFIUM_BINARY_LICENSE_INVENTORY
RUST_BINDING_VERSION != PDFIUM_BINARY_PROVENANCE
API_FEATURE_PIN != BINARY_DIGEST
```

### 7.4 Prebuilt PDFium candidate metadata

The public `bblanchon/pdfium-binaries` repository exposes immutable tag:

```text
refs/tags/chromium/7881
```

which targets commit:

```text
867b3ecc32163d715e84708c51fae5f031254985
```

The project documents recurring precompiled PDFium binaries across Android, iOS, Linux, macOS, Windows and experimental WebAssembly variants.

This establishes a concrete distribution candidate family but does not yet prove:

- exact upstream PDFium source commit for every released asset;
- per-platform asset digest/checksum;
- build flags for every asset;
- whether V8/XFA/Skia or other compile-time features are included;
- bundled third-party notices for the exact asset;
- reproducibility of each build;
- Signthos platform compatibility;
- hardening/update response evidence.

Those are adoption blockers.

### 7.5 Threading/resource/cancellation disposition

The wrapper exposes a `thread_safe` feature and public documentation describes serialized access behavior around PDFium calls.

004B treats this as upstream design information only.

Actual concurrency safety, cancellation, deadline propagation, resource budgets, parser isolation and malformed-input behavior require later runtime qualification.

### 7.6 Candidate status

```text
feasibilityStatus = FEASIBLE_NATIVE_BINDING_CANDIDATE_WITH_BLOCKING_PROVENANCE_GAPS
adoptionStatus = BLOCKED
primaryBlockers = [
  CRATE_TO_GIT_SOURCE_EQUIVALENCE_UNPROVEN,
  EXACT_PDFIUM_ASSET_SOURCE_BUILD_DIGEST_NOTICE_MATRIX_INCOMPLETE,
  CORPUS_RUNTIME_SECURITY_EVIDENCE_ABSENT
]
```

## 8. Candidate D — `lopdf` v0.44.0 as bounded Rust structural utility

### 8.1 Immutable repository identity

Public annotated tag:

```text
refs/tags/v0.44.0
```

has tag object:

```text
d163e69da979be2d867b6d1adf73ef4a7ceafa07
```

which dereferences to exact source commit:

```text
8c454dd93d9c37e608c552a2b304d1d31d1cb2e1
```

Evidence class: `VERIFIED_IMMUTABLE_METADATA`.

### 8.2 Exact manifest and license

At source commit:

```text
name = lopdf
version = 0.44.0
license = MIT
edition = 2024
rustVersion = 1.88
```

Root `LICENSE` is MIT.

The manifest declares PDF manipulation/editing/merge-oriented metadata and dependencies including cryptographic, compression, parsing, image and optional async/parallel components.

Evidence class: `VERIFIED_IMMUTABLE_METADATA`.

### 8.3 Bounded-role rule

Foundation architecture permits a Rust structural library only for bounded operations whose serialization model is proven safe for the document lifecycle.

004B does not qualify `lopdf` as a universal engine.

Full-document rewrite is especially unsafe as an implicit operation across signed/signing-bound revisions.

Potential later use remains limited to capability-specific pre-sign or tooling paths unless a later grain independently proves more.

### 8.4 Candidate status

```text
feasibilityStatus = BOUNDED_STRUCTURAL_CANDIDATE_NOT_ADOPTED
adoptionStatus = BLOCKED_PENDING_EXACT_CAPABILITY_CORPUS_SERIALIZATION_SECURITY_AND_TRANSITIVE_LICENSE_EVIDENCE
```

## 9. Heavy provider classes

Stage P allows optional isolated heavy providers for capabilities such as OCR, office conversion, specialist repair/compression and archival work.

004B does **not** select a concrete heavy-provider dependency because no canonical capability grain yet proves which heavy capability requires one.

```text
heavyProviderStatus = DEFERRED_PENDING_CAPABILITY_NEED_AND_LIVE_AUTHORITY
```

This avoids expanding dependency scope before the operation grain exists.

Any later candidate requires exact source/version/license/container/binary/model/data rights, isolation, network, resource, cancellation, update and platform evidence.

## 10. Candidate comparison summary

| Candidate | Immutable source/version anchor | License boundary | Feasibility result | Adoption result |
|---|---|---|---|---|
| EmbedPDF v2.15 + EmbedPDF PDFium | tag `v2.15.0` -> `2cf7df3b...`; submodule -> `cb29e78f...` | MIT wrappers plus PDFium/third-party notices | strong browser/WASM feasibility candidate | blocked pending runtime/corpus/security/final binary inventory |
| `@libpdf/core` 0.4.2 | tag `v0.4.2` -> `2144a0a5...` | MIT root plus FontBox Apache/BSD/OFL/component notices | strong TypeScript structural feasibility candidate | blocked pending runtime/corpus/security/transitive/platform evidence |
| `pdfium-render` 0.9.4 | crates.io checksum `8948a803...`; Git commit `4176e8a...` declares 0.9.4 but equivalence unproven | `MIT OR Apache-2.0` for wrapper; PDFium binary separate | plausible native binding candidate | blocked by source/archive and exact PDFium binary provenance gaps |
| `lopdf` 0.44.0 | annotated tag -> commit `8c454dd9...` | MIT root; transitive inventory later | bounded structural candidate | blocked pending capability-specific runtime/serialization/security evidence |
| heavy provider | none selected | unknown until exact candidate | deferred | unauthorized/not selected |

No row means adoption.

## 11. Capability-fit disposition against 004A

### 11.1 Interactive browser inspect/render/search

EmbedPDF v2.15 + its pinned PDFium runtime remains the strongest **feasibility direction** from current public immutable evidence and Foundation architecture.

This is not provider selection or adoption.

Before any 004C implementation authority, a later live unit must establish the exact dependency/package/runtime surface and the evidence required to add it.

### 11.2 TypeScript structural mutation

LibPDF v0.4.2 remains the strongest TypeScript structural **feasibility direction** among the current Stage P candidates.

Signing-related APIs are not a reason to assign Specification 005 behavior to Specification 004.

### 11.3 Native inspect/render

`pdfium-render 0.9.4` plus a separately pinned PDFium build remains plausible, but current provenance gaps are material enough to block adoption.

A future selection/adoption grain must bind:

- exact crate archive checksum/source equivalence;
- exact PDFium binary source/build/asset digest;
- exact license/NOTICE inventory;
- target platform/architecture matrix;
- update/advisory process.

### 11.4 Bounded Rust structural operations

`lopdf v0.44.0` remains eligible only as a bounded candidate.

It is not selected as the default PDF writer/parser and must not be used to rewrite signed revisions merely because it can serialize PDFs.

## 12. Security disposition

No candidate receives security qualification from public metadata alone.

Later implementation/provider grains must prove, as applicable:

- untrusted-input limits;
- decoded/decompression limits;
- memory/CPU/wall-time/temp-storage budgets;
- cancellation/deadline behavior;
- partial-output quarantine;
- active-content default deny;
- no-silent-network behavior;
- encrypted secret handling;
- parser/renderer isolation;
- output validation;
- signed-input immutability;
- independent redaction recovery;
- provider failure normalization.

A README statement cannot satisfy these gates.

## 13. License, NOTICE and SBOM disposition

004B confirms that repository/package headline licenses are insufficient for final distribution decisions.

Before adoption, every selected candidate requires an exact inventory of:

- directly distributed source/package/crate;
- generated or vendored WASM/native binaries;
- bundled/transitive native components;
- embedded fonts/data/assets;
- required license texts;
- attribution/NOTICE material;
- package registry checksums;
- source/build mapping;
- final platform artifact digests;
- SBOM component identifiers.

No 004B observation writes canonical provenance or NOTICE records because adoption authority is absent.

## 14. Advisory/CVE/update-path disposition

A candidate must have a concrete update path before adoption.

Current public evidence supports the following update-path directions only:

- EmbedPDF: immutable release/tag + separately pinned runtime gitlink; later adoption must track both wrapper and runtime/security updates.
- LibPDF: immutable release/tag/package dependency graph; later adoption must track direct and transitive JavaScript advisories.
- `pdfium-render`: crates.io version/checksum + explicit PDFium API feature pin; later adoption must track wrapper crate and independent PDFium binary/source updates.
- `lopdf`: immutable Rust release/tag; later adoption must track crate and transitive advisories.
- prebuilt PDFium binaries: release cadence alone is not enough; exact source/build/asset/advisory mapping remains required.

004B does not claim a CVE-free state for any candidate.

## 15. Corpus and performance evidence

004A defines the required future corpus/evidence contract.

004B has no authority to acquire or execute the external corpus.

Therefore every candidate has:

```text
corpusEvidenceRef = NOT_EXECUTED_UNDER_004B
performanceEvidenceRef = NOT_EXECUTED_UNDER_004B
```

No benchmark, redaction-safety, malformed-input, Arabic/RTL, encryption, signed-input, cancellation, or resource result is claimed.

## 16. Explicit adoption blockers

The following remain blocking for any dependency adoption or 004C implementation claim:

1. no canonical dependency-adoption authority exists;
2. no 004A corpus runtime evidence exists;
3. no provider security/resource/cancellation evidence exists;
4. final distributed binary/WASM transitive license/NOTICE/SBOM evidence is incomplete;
5. native PDFium per-platform source/build/digest matrix is incomplete;
6. `pdfium-render 0.9.4` crates.io archive-to-Git-source equivalence is not proven;
7. exact final target platform/architecture support has not been demonstrated in Signthos;
8. performance targets/evidence are absent;
9. redaction safety and signature preservation are unproven;
10. Specification 005 signing/verification remains separately unauthorized.

## 17. 004B result

004B may canonically conclude only the following if this exact artifact qualifies and merges:

```text
EMBEDPDF_V2_15_PDFIUM = FEASIBLE_BROWSER_CANDIDATE_NOT_ADOPTED
LIBPDF_CORE_0_4_2 = FEASIBLE_TYPESCRIPT_STRUCTURAL_CANDIDATE_NOT_ADOPTED
PDFIUM_RENDER_0_9_4 = FEASIBLE_NATIVE_BINDING_CANDIDATE_WITH_BLOCKING_PROVENANCE_GAPS
LOPDF_0_44_0 = BOUNDED_RUST_STRUCTURAL_CANDIDATE_NOT_ADOPTED
HEAVY_PROVIDER = DEFERRED_PENDING_CAPABILITY_NEED_AND_AUTHORITY
DEPENDENCY_ADOPTION = NONE
SOURCE_IMPORT = NONE
PROVIDER_EXECUTION = NONE
EXTERNAL_FIXTURE_ACQUISITION = NONE
PRODUCT_IMPLEMENTATION = NONE
```

This is a feasibility shortlist, not an implementation decision.

## 18. Successor boundary

Canonical Stage P identifies 004C as an inspect/render/search provider qualification candidate only after:

- canonical 004A;
- canonical 004B;
- a selected exact provider candidate authorized for the grain.

004B does not satisfy the third condition because adoption/provider-selection authority is absent.

Therefore, even after successful 004B merge:

```text
004C_IMPLEMENTATION_AUTHORITY = NOT_AUTOMATICALLY_DERIVED
```

Live post-004B reconciliation must decide the next bounded authorized unit.

It may need a provider-selection/dependency-adoption qualification unit before any 004C implementation work. That unit must be explicitly derived from canonical governance; 004B does not invent it in advance.

## 19. Review checklist

Independent review must adversarially verify:

1. Issue #7 authority is represented without adoption or implementation inflation;
2. every immutable revision/version/checksum stated here is correct;
3. EmbedPDF v2.15 tag and exact runtime gitlink are correctly bound;
4. the relocated EmbedPDF runtime repository does not alter immutable commit identity;
5. MIT wrapper declarations are not treated as complete PDFium binary licensing;
6. LibPDF root and FontBox/font/component license layers are accurately separated;
7. signing/verification claims remain outside Specification 004 implementation authority;
8. crates.io metadata for `pdfium-render 0.9.4` is accurately distinguished from unproven Git-source equivalence;
9. `pdfium_7881` is treated as API-definition pinning, not a binary digest;
10. the `bblanchon/pdfium-binaries` tag is not overrepresented as full binary provenance;
11. `lopdf v0.44.0` annotated-tag dereference and MIT manifest are accurate;
12. all runtime/corpus/performance/security claims are explicitly deferred;
13. no candidate is described as adopted or selected for production;
14. 004C remains unauthorized absent fresh live successor/provider-selection authority;
15. no external source/fixture/dependency bytes were imported into Signthos;
16. the exact diff is Signthos-authored documentation only and `git diff --check` is clean.

## 20. Qualification evidence requirements

The exact 004B candidate requires:

- exact base/head/tree/diff accounting;
- clean `git diff --check`;
- zero upstream-derived source bytes in the Signthos diff;
- zero dependency/package/lockfile/Cargo/workflow/container/database/product/runtime mutation;
- truthful exact-head provider/check accounting;
- fresh independent substantive exact-head review;
- forward-only repair and changed-head re-review for every material finding;
- zero unresolved material review threads;
- immediate base/head/mergeability/ruleset/competing-authority re-verification;
- mandatory premerge proof;
- guarded expected-head merge;
- post-merge tree/parents/signature/check verification;
- live Issue #7 successor analysis before any provider selection, dependency adoption, or 004C authority.

## 21. Completion boundary

Until Diffciplane completes:

```text
004B_STATUS = CANDIDATE_ONLY
004B_IMPLEMENTATION_AUTHORITY = ABSENT
004B_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004B_DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
004B_SOURCE_IMPORT_AUTHORITY = ABSENT
004B_PROVIDER_RUNTIME_EXECUTION_AUTHORITY = ABSENT
004C_AUTHORITY = NOT_YET_CANONICAL_SUCCESSOR_AUTHORITY
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

Successful 004B qualification would canonically preserve a fail-closed shortlist and blocker ledger only. It would not add or run a PDF engine.