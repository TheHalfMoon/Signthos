# Specification 004C1A — Registry Archive Provenance Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_DISCOVERY_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `9fea450217f50918cea57ac114642a8a8cafa050`
Authority source: `github:issue-comment:5563204316`

## 1. Canonical authority

Canonical 004C1 is closed through PR #104. Fresh reconciliation authorizes only:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 004C1A_REGISTRY_ARCHIVE_PROVENANCE_QUALIFICATION
004C1A_AUTHORITY = PLANNING_DISCOVERY_QUALIFICATION_ONLY
004C1A_PUBLIC_REGISTRY_METADATA_RESEARCH_AUTHORITY = PRESENT
004C1A_PUBLIC_UPSTREAM_RELEASE_SOURCE_METADATA_RESEARCH_AUTHORITY = PRESENT
004C1A_REGISTRY_PACKAGE_GRAPH_QUALIFICATION_AUTHORITY = PRESENT
004C1A_ARCHIVE_SOURCE_BINDING_QUALIFICATION_AUTHORITY = PRESENT
004C1A_LICENSE_NOTICE_SBOM_PLANNING_AUTHORITY = PRESENT
004C1A_IMPLEMENTATION_AUTHORITY = ABSENT
004C1A_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1A_DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
004C1A_PACKAGE_MANIFEST_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1A_SOURCE_BINARY_FIXTURE_IMPORT_AUTHORITY = ABSENT
004C1A_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1A_PROVIDER_RUNTIME_EXECUTION_AUTHORITY = ABSENT
004C1A_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

This file exercises only evidence/discovery authority.

## 2. Canonical predecessor facts

004C1 established:

```text
FUTURE_004C_PROVIDER_PACKAGE_ROOT = packages/providers
CURRENT_ROOT_JS_WORKSPACE = ABSENT
SIGNTHOS_PACKAGE_MANAGER = NOT_YET_CANONICAL
EMBEDPDF_SOURCE_PACKAGE_MANAGER = pnpm@10.4.0
004C_INITIAL_SEVEN_PACKAGE_SET = INCOMPLETE_AS_CLOSURE
004C_SOURCE_DECLARED_EMBEDPDF_CLOSURE = QUALIFIED_PROVISIONALLY
EXACT_NPM_DIST_INTEGRITY = UNPROVEN
EXACT_NPM_TARBALL_BINDING = UNPROVEN
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = UNPROVEN
PDFIUM_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
FONT_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
DEPENDENCY_ADOPTION = NONE
DEPENDENCY_INSTALLATION = NONE
RUNTIME_EXECUTION = NONE
```

004C1A must not weaken these states merely to make acquisition appear ready.

## 3. Exact immutable upstream identity

The selected 004C browser provider candidate remains:

```text
repository = https://github.com/embedpdf/embed-pdf-viewer
releaseRef = refs/tags/v2.15.0
sourceRevision = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
providerCandidateId = embedpdf-v2.15.0-pdfium-browser
```

The tag resolves directly to commit `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed`.

No moving branch, v3 prerelease, cloud provider, or native binding is substituted.

## 4. Registry evidence classes

004C1A distinguishes:

```text
REGISTRY_PACKAGE_PAGE_OBSERVATION
REGISTRY_VERSION_RECORD
REGISTRY_DIST_INTEGRITY_RECORD
REGISTRY_TARBALL_RECORD
REGISTRY_PUBLISHED_DEPENDENCY_RECORD
REGISTRY_PUBLISHED_PEER_RECORD
IMMUTABLE_SOURCE_MANIFEST_RECORD
ARCHIVE_TO_SOURCE_BINDING_RECORD
```

A weaker class must never be promoted to a stronger one by inference.

Examples:

- an npm package page showing version `2.15.0` does not prove `dist.integrity`;
- a pinned source `workspace:*` dependency does not prove the published dependency range;
- matching package version and Git tag do not prove tarball byte equivalence;
- wrapper-level MIT metadata does not fully classify bundled PDFium/font redistribution obligations.

## 5. Direct capability package observations

Canonical 004C/004C1 direct candidates remain:

```text
@embedpdf/core@2.15.0
@embedpdf/pdfium@2.15.0
@embedpdf/plugin-document-manager@2.15.0
@embedpdf/plugin-render@2.15.0
@embedpdf/plugin-thumbnail@2.15.0
@embedpdf/plugin-search@2.15.0
@embedpdf/plugin-selection@2.15.0
```

Public npm package-page observations independently support existence of multiple `@embedpdf/*` packages at version `2.15.0` with package-level MIT metadata, including `@embedpdf/core`, `@embedpdf/engines`, `@embedpdf/plugin-interaction-manager`, and other 2.15.0 packages observed during qualification.

These observations are useful existence/version evidence only.

Current classification:

```text
DIRECT_PACKAGE_VERSION_EXISTENCE = PARTIALLY_ESTABLISHED_FROM_PUBLIC_REGISTRY_PAGES
DIRECT_PACKAGE_COMPLETE_REGISTRY_RECORD_SET = NOT_ESTABLISHED
DIRECT_PACKAGE_DIST_INTEGRITY_SET = NOT_ESTABLISHED
DIRECT_PACKAGE_TARBALL_SET = NOT_ESTABLISHED
```

## 6. Immutable source manifest evidence

Pinned source manifests at `v2.15.0` establish at least:

### `@embedpdf/core@2.15.0`

```text
license = MIT
dependencies:
  @embedpdf/engines = workspace:*
  @embedpdf/models = workspace:*
peer families:
  preact
  react
  react-dom
  svelte
  vue
```

### `@embedpdf/engines@2.15.0`

```text
license = MIT
dependencies include:
  @embedpdf/fonts-arabic
  @embedpdf/fonts-hebrew
  @embedpdf/fonts-jp
  @embedpdf/fonts-kr
  @embedpdf/fonts-latin
  @embedpdf/fonts-sc
  @embedpdf/fonts-tc
  @embedpdf/models
  @embedpdf/pdfium
```

It exposes PDFium browser engine entry points.

### `@embedpdf/pdfium@2.15.0`

```text
license = MIT
export = ./pdfium.wasm
runtime dependencies in inspected source manifest = none
```

The package contains executable WebAssembly distribution surface.

### capability plugins

Pinned source manifests for document manager, render, search, and related plugins preserve `@embedpdf/models` dependencies and `@embedpdf/core` peer relationships. Canonical 004C1 additionally identified selection support through `@embedpdf/utils` and `@embedpdf/plugin-interaction-manager`.

These source observations remain separate from published registry metadata.

## 7. Provisional source-declared closure

The canonical provisional closure remains:

```text
@embedpdf/core
@embedpdf/engines
@embedpdf/models
@embedpdf/pdfium
@embedpdf/plugin-document-manager
@embedpdf/plugin-render
@embedpdf/plugin-thumbnail
@embedpdf/plugin-search
@embedpdf/plugin-selection
@embedpdf/plugin-interaction-manager
@embedpdf/utils
@embedpdf/fonts-arabic
@embedpdf/fonts-hebrew
@embedpdf/fonts-jp
@embedpdf/fonts-kr
@embedpdf/fonts-latin
@embedpdf/fonts-sc
@embedpdf/fonts-tc
```

This is not an installation list and is not asserted to equal a future resolved lockfile graph.

## 8. Exact registry retrieval result for this qualification

A direct attempt to obtain complete registry metadata for the candidate package set did not yield a complete reliable record within this qualification run.

The qualification therefore records missing fields explicitly rather than substituting search snippets or third-party lockfiles.

For the candidate closure, the following remain required before acquisition eligibility:

```text
exact published version record per selected package
exact dist.integrity per selected package
exact dist.tarball identity per selected package
exact published dependencies per selected package
exact published peerDependencies per selected package
repository/directory metadata per selected package
install/preinstall/postinstall script metadata where published
package deprecation/yank state
shipped-file/archive characterization
```

Current result:

```text
EXACT_REGISTRY_METADATA_SET = NOT_ESTABLISHED
EXACT_REGISTRY_INTEGRITY_SET = NOT_ESTABLISHED
EXACT_REGISTRY_TARBALL_SET = NOT_ESTABLISHED
EXACT_PUBLISHED_TRANSITIVE_GRAPH = NOT_ESTABLISHED
EXACT_PUBLISHED_PEER_GRAPH = NOT_ESTABLISHED
```

## 9. Archive-to-source binding

The selected source identity and a future registry archive identity must be tracked independently.

A successor may claim archive/source binding only if evidence establishes, for each selected package:

1. exact registry package/version;
2. exact registry integrity/tarball identity;
3. repository/directory metadata alignment;
4. expected source package path at pinned commit;
5. generated/bundled output classification;
6. archive file surface and executable payload classification;
7. any differences between source workspace and published package metadata;
8. reproducible or otherwise independently auditable binding between archive artifacts and pinned source/build inputs.

Current result:

```text
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = UNPROVEN
```

Version equality alone is not accepted as binding evidence.

## 10. PDFium executable distribution boundary

`@embedpdf/pdfium@2.15.0` exposes `pdfium.wasm`.

Before dependency acquisition, complete evidence must bind:

```text
wrapper package identity
wrapper license
exact WASM archive/package digest
exact PDFium source/build identity
build or reproducibility evidence
PDFium upstream license set
bundled third-party license set
required notices
SBOM component mapping
security/advisory review input
update/rebuild path
```

Current result:

```text
PDFIUM_WASM_EXACT_ACQUISITION_DIGEST = NOT_ESTABLISHED
PDFIUM_WASM_ARCHIVE_SOURCE_BUILD_BINDING = NOT_ESTABLISHED
PDFIUM_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
PDFIUM_ADOPTION_ELIGIBILITY = FAIL_CLOSED
```

## 11. Font redistribution boundary

The engine source closure includes Arabic, Hebrew, Japanese, Korean, Latin, simplified-Chinese, and traditional-Chinese font packages.

Each font package is a separate distribution subject.

Before acquisition, a successor must establish:

- exact registry package/version/integrity;
- exact shipped font assets;
- exact font licenses;
- copyright notices;
- redistribution/modification obligations;
- SBOM identities;
- relationship to the selected engine archive.

The MIT license on `@embedpdf/engines` does not classify these assets.

Current result:

```text
FONT_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
FONT_ARCHIVE_LICENSE_EVIDENCE = NOT_ESTABLISHED
```

## 12. Framework peer policy remains unresolved

Source manifests expose broad peers for React, React DOM, Preact, Vue, and Svelte.

004C1A does not adopt any framework.

A future registry graph qualification must determine:

```text
which peers are actually present in published manifests
which peers are optional
which peer family is needed by the exact Signthos provider build/test harness
how the selected package manager resolves omitted peers
```

Current result:

```text
PEER_FRAMEWORK_INSTALLATION_SET = UNRESOLVED
FRAMEWORK_ADOPTION_AUTHORITY = ABSENT
```

## 13. Package-manager/workspace authority remains absent

Canonical Signthos still has no root JavaScript workspace manifest or lockfile.

Upstream EmbedPDF uses `pnpm@10.4.0`, but this remains upstream reproduction metadata only.

```text
SIGNTHOS_PACKAGE_MANAGER = NOT_YET_CANONICAL
ROOT_JS_WORKSPACE_CONTROL_SURFACE = UNRESOLVED
PACKAGE_MANIFEST_MUTATION_AUTHORITY = ABSENT
LOCKFILE_MUTATION_AUTHORITY = ABSENT
```

004C1A does not create or recommend a canonical lockfile by implication.

## 14. Supply-chain acceptance requirements

Before any dependency bytes may enter Signthos, the exact resolved graph must be checked for:

- exact registry origin;
- integrity values;
- install scripts;
- binary/WASM download hooks;
- optional platform downloads;
- deprecation/yank state;
- package provenance/signature metadata where available;
- license compatibility and required notices;
- bundled binary/font components;
- SBOM completeness;
- absence of moving/unpinned package substitutions.

Unknown values fail closed.

## 15. Current acquisition readiness

The canonical acquisition decision is:

```text
004C1A_REGISTRY_EVIDENCE = INCOMPLETE
004C1A_ARCHIVE_SOURCE_BINDING = UNPROVEN
004C1A_PDFIUM_NOTICE_BINDING = INCOMPLETE
004C1A_FONT_NOTICE_BINDING = INCOMPLETE
004C1A_PEER_RESOLUTION = UNPROVEN
004C1A_PACKAGE_MANAGER_SELECTION = UNRESOLVED
004C1A_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1A_IMPLEMENTATION_AUTHORITY = ABSENT
004C1A_RUNTIME_AUTHORITY = ABSENT
```

This result is intentional. Discovery qualification is complete when uncertainty is accurately bounded, not when missing evidence is guessed.

## 16. Future deterministic gates

A later dependency-acquisition/bootstrap grain may be considered only after fresh canonical reconciliation proves all applicable prerequisites, including:

```text
G1 exact Signthos package manager selected
G2 exact root workspace control surface authorized
G3 exact direct package list authorized
G4 exact full registry graph established
G5 exact registry integrities and tarballs established
G6 peer resolution proven for actual Signthos integration surface
G7 archive-to-pinned-source relationship characterized acceptably
G8 PDFium executable provenance/license/notice evidence complete
G9 font redistribution license/notice evidence complete
G10 package/install-script supply-chain review complete
G11 provenance/NOTICE/SBOM mutation surface explicitly authorized
G12 package manifest/lockfile mutation surface explicitly authorized
G13 independent exact-head review and guarded merge discipline preserved
```

No gate may be inferred from task numbering.

## 17. Runtime evidence remains absent

004C1A executes no provider or PDF runtime.

```text
004C_FIXTURE_CORPUS_BYTES = ABSENT
004C_RUNTIME_CORPUS_RESULTS = ABSENT
004C_RESOURCE_LIMIT_VALUES = ABSENT
004C_CANCELLATION_EVIDENCE = ABSENT
004C_NO_NETWORK_RUNTIME_EVIDENCE = ABSENT
004C_PERFORMANCE_BASELINE = ABSENT
```

A successful future package installation would still not satisfy these runtime evidence classes.

## 18. Successor rule

004C1A canonicalization does not authorize package acquisition, runtime implementation, 004D, or Specification 005.

After fresh independent substantive exact-head review, guarded expected-head merge, post-merge verification, and canonical governance reread, successor authority must be derived from live evidence.

If the registry/archive/PDFium/font evidence remains materially incomplete, another evidence-acquisition grain or an explicit external blocker may be the only safe successor.

If complete evidence later exists, a bounded dependency-acquisition/bootstrap grain may be separately authorized with exact package/workspace/lockfile/provenance/NOTICE/SBOM surface.

## 19. Explicit non-claims

004C1A does not claim:

- that any npm package is adopted or installed;
- that any registry integrity or tarball identity is known when not directly evidenced;
- that published archives equal pinned Git source bytes;
- that wrapper MIT metadata licenses bundled PDFium/font assets completely;
- that pnpm is selected for Signthos;
- that a browser workspace exists;
- that any provider runtime has executed;
- that any fixture exists;
- that inspect/render/search behavior is qualified;
- that 004C2, 004D, or Specification 005 is authorized.
