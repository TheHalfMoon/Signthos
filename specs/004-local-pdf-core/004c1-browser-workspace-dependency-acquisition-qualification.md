# Specification 004C1 — Browser Workspace Dependency Acquisition Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_DISCOVERY_ONLY / ZERO_ADOPTION / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `43d2f79476190fbbc6cec65959d06c49405065ba`
Authority source: `github:issue-comment:5562814547`

## 1. Canonical authority

Canonical 004C is closed through PR #103 and authorizes exactly this bounded successor:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 004C1_BROWSER_WORKSPACE_DEPENDENCY_ACQUISITION_QUALIFICATION
004C1_AUTHORITY = PLANNING_DISCOVERY_QUALIFICATION_ONLY
004C1_PUBLIC_REGISTRY_METADATA_RESEARCH_AUTHORITY = PRESENT
004C1_PUBLIC_UPSTREAM_METADATA_RESEARCH_AUTHORITY = PRESENT
004C1_WORKSPACE_BOUNDARY_PLANNING_AUTHORITY = PRESENT
004C1_DEPENDENCY_GRAPH_QUALIFICATION_AUTHORITY = PRESENT
004C1_PROVENANCE_LICENSE_NOTICE_SBOM_PLANNING_AUTHORITY = PRESENT
004C1_IMPLEMENTATION_AUTHORITY = ABSENT
004C1_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1_DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
004C1_PACKAGE_MANIFEST_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1_SOURCE_OR_BINARY_IMPORT_AUTHORITY = ABSENT
004C1_EXTERNAL_FIXTURE_ACQUISITION_AUTHORITY = ABSENT
004C1_PROVIDER_RUNTIME_EXECUTION_AUTHORITY = ABSENT
004C1_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004C1_PROVENANCE_NOTICE_MUTATION_AUTHORITY = ABSENT
004C1_WORKFLOW_CONTAINER_DATABASE_MUTATION_AUTHORITY = ABSENT
004C2_RUNTIME_IMPLEMENTATION_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact exercises only planning/discovery qualification authority. It does not adopt, install, download, import, execute, build, benchmark, or ship any dependency or runtime.

## 2. Purpose

004C1 converts the 004C provider-entry candidate into a fail-closed dependency-acquisition plan by answering only the questions that can be answered without mutation or runtime execution:

1. what browser workspace boundary is minimally compatible with current Signthos tree truth;
2. which exact EmbedPDF v2.15.0 packages are candidate direct dependencies for the 004C inspect/render/search surface;
3. what transitive and peer graph follows from pinned source manifests;
4. which registry, provenance, license, NOTICE, SBOM, and archive-to-source facts are established versus still unproven;
5. what future package/workspace/lockfile/provenance surface would need explicit authority;
6. what deterministic gates must be satisfied before any dependency acquisition or runtime implementation can begin.

004C1 is not dependency acquisition itself.

## 3. Canonical predecessor candidate

004C selected the planning candidate:

```text
providerCandidateId = embedpdf-v2.15.0-pdfium-browser
providerKind = BROWSER
locality = LOCAL_ONLY
repository = https://github.com/embedpdf/embed-pdf-viewer
releaseRef = refs/tags/v2.15.0
sourceRevision = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
```

The exact tag resolves to commit `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed`.

This remains a planning candidate, not an adopted dependency set.

## 4. Exact current Signthos workspace truth

At canonical predecessor `43d2f79476190fbbc6cec65959d06c49405065ba`:

- root `package.json` is absent;
- no JavaScript/TypeScript browser application workspace is canonical;
- `packages/` contains only `packages/prisma`;
- no lockfile or browser package boundary is established by Specification 004;
- no EmbedPDF package, PDFium WASM archive, source tree, or runtime bytes are canonical Signthos content.

Therefore the minimal proposed future browser workspace boundary is **not an existing path**.

004C1 records only this planning disposition:

```text
BROWSER_WORKSPACE_CURRENT_STATE = ABSENT
BROWSER_WORKSPACE_DESTINATION = NOT_YET_CANONICALIZED
ROOT_PACKAGE_MANIFEST = ABSENT
BROWSER_LOCKFILE = ABSENT
DEPENDENCY_ACQUISITION_CHANGE_SURFACE = REQUIRES_SEPARATE_AUTHORITY
```

A successor must explicitly authorize the workspace destination before creating any package manifest or lockfile. 004C1 does not invent a path such as `apps/web`, `packages/pdf-browser`, or equivalent.

## 5. Candidate direct package set

The direct capability package set carried forward from canonical 004C is:

| Package | Exact candidate version | 004C role | Source-manifest license at pinned tag |
| --- | --- | --- | --- |
| `@embedpdf/core` | `2.15.0` | provider/plugin host contract | MIT |
| `@embedpdf/pdfium` | `2.15.0` | browser PDFium WASM engine boundary | MIT wrapper manifest |
| `@embedpdf/plugin-document-manager` | `2.15.0` | document loading/lifetime boundary | MIT |
| `@embedpdf/plugin-render` | `2.15.0` | page render observations | MIT |
| `@embedpdf/plugin-thumbnail` | `2.15.0` | thumbnail observations | MIT |
| `@embedpdf/plugin-search` | `2.15.0` | text search observations | MIT |
| `@embedpdf/plugin-selection` | `2.15.0` | selection-oriented text observation | MIT |

These are candidate direct packages only. The table is not an installation list and does not authorize acquisition.

## 6. Pinned source dependency observations

### 6.1 `@embedpdf/core@2.15.0`

Pinned source manifest declares:

```text
dependencies:
  @embedpdf/engines = workspace:*
  @embedpdf/models = workspace:*

peerDependencies:
  preact = ^10.26.4
  react = >=16.8.0
  react-dom = >=16.8.0
  svelte = >=5 <6
  vue = >=3.2.0
```

Framework peers are integration-surface alternatives, not automatically required together. A later acquisition grain must choose the actual framework surface and must not install all framework peers by inference.

### 6.2 `@embedpdf/engines@2.15.0`

Pinned source manifest declares dependencies on:

```text
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

It also declares the same optional framework peer families for Preact/React/Svelte/Vue adapters.

This means `@embedpdf/core` pulls a materially wider published package closure than the seven direct capability candidates once registry package relationships are resolved.

### 6.3 `@embedpdf/pdfium@2.15.0`

Pinned source manifest exposes `./pdfium.wasm` and declares no runtime dependencies in the inspected source manifest.

The package-level MIT declaration covers the wrapper package manifest only. Complete PDFium/WASM redistribution evidence remains separately required, including bundled/transitive notices and the pinned runtime source/build relationship already identified by 004B/004C.

### 6.4 plugin manifests

Pinned source manifests for `plugin-document-manager`, `plugin-render`, and `plugin-search` each depend on `@embedpdf/models` and peer on `@embedpdf/core` plus framework adapters.

Canonical 004C additionally identified `@embedpdf/utils` and `@embedpdf/plugin-interaction-manager` as possible selection-support closure members. Their exact published-registry relationship must be proven before acquisition rather than inferred from source-workspace shorthand.

## 7. Registry evidence classification

Public npm pages confirm that multiple `@embedpdf/*` packages are published at `2.15.0` and expose MIT package metadata. However, this run did not obtain a complete authoritative registry metadata record for every candidate package containing all of the following fields together:

```text
exact version
registry dist.integrity
registry dist.tarball
published dependency map
published peer dependency map
license metadata
repository/directory linkage
shipped file list
archive digest or equivalent binding
```

Accordingly:

```text
REGISTRY_VERSION_EXISTENCE = PARTIALLY_ESTABLISHED
REGISTRY_DIRECT_PACKAGE_SET_COMPLETE_METADATA = NOT_ESTABLISHED
REGISTRY_DIST_INTEGRITY_SET = NOT_ESTABLISHED
REGISTRY_TARBALL_SET = NOT_ESTABLISHED
REGISTRY_PUBLISHED_TRANSITIVE_GRAPH = NOT_ESTABLISHED
REGISTRY_PEER_GRAPH = NOT_ESTABLISHED
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = NOT_ESTABLISHED
DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
```

No registry value is guessed from another project lockfile, search snippet, moving `latest`, or source-workspace `workspace:*` declaration.

## 8. Source-to-registry binding rule

The immutable source tag and registry package version are separate evidence domains.

A future acquisition unit must bind each selected registry archive to the pinned source candidate using reproducible evidence sufficient to answer:

1. does the package metadata name/version match the selected package/version;
2. what exact registry integrity and tarball identity are being acquired;
3. what repository and directory metadata does the registry record claim;
4. can the shipped archive contents be reconciled to the expected build/output of the pinned source revision;
5. are generated/bundled files accounted for rather than silently assumed to exist in source;
6. is the PDFium WASM payload tied to an exact upstream/runtime source and build provenance chain;
7. are all licenses, notices, and bundled third-party obligations captured.

Until that binding is complete, `@embedpdf/*@2.15.0` source and registry observations must not be treated as byte-equivalent evidence.

## 9. Candidate dependency closure classes

004C1 classifies the future graph into four distinct classes.

### 9.1 Direct capability dependencies

```text
@embedpdf/core@2.15.0
@embedpdf/pdfium@2.15.0
@embedpdf/plugin-document-manager@2.15.0
@embedpdf/plugin-render@2.15.0
@embedpdf/plugin-thumbnail@2.15.0
@embedpdf/plugin-search@2.15.0
@embedpdf/plugin-selection@2.15.0
```

### 9.2 Internal transitive candidates already evidenced by pinned source

```text
@embedpdf/engines
@embedpdf/models
@embedpdf/fonts-arabic
@embedpdf/fonts-hebrew
@embedpdf/fonts-jp
@embedpdf/fonts-kr
@embedpdf/fonts-latin
@embedpdf/fonts-sc
@embedpdf/fonts-tc
```

Exact published versions and integrities remain registry-evidence requirements even when source workspace relationships strongly suggest aligned versioning.

### 9.3 Additional plugin/support closure requiring exact verification

```text
@embedpdf/utils
@embedpdf/plugin-interaction-manager
```

These remain conditional until the exact selected plugin path and published package graph are verified.

### 9.4 Framework peers

```text
preact
react
react-dom
svelte
vue
```

No framework is selected by 004C1. Only the peer(s) required by the later canonical Signthos browser workspace may enter an acquisition graph.

## 10. PDFium/WASM distribution gate

`@embedpdf/pdfium@2.15.0` exposes `pdfium.wasm`, so package acquisition would include executable WebAssembly bytes.

Before adoption, a successor must establish a distribution evidence bundle that includes at minimum:

```text
PDFIUM_WRAPPER_PACKAGE_IDENTITY
PDFIUM_WRAPPER_LICENSE
PDFIUM_WASM_EXACT_DIGEST
PDFIUM_WASM_SOURCE_REVISION_OR_BUILD_INPUT_BINDING
PDFIUM_BUILD_TOOLCHAIN_OR_REPRODUCIBILITY_EVIDENCE
PDFIUM_UPSTREAM_LICENSE_SET
BUNDLED_THIRD_PARTY_LICENSE_SET
REQUIRED_NOTICE_TEXTS
SBOM_COMPONENT_MAPPING
CVE_OR_VULNERABILITY_REVIEW_INPUT
UPDATE_AND_REBUILD_PATH
```

Current result:

```text
PDFIUM_WASM_DISTRIBUTION_NOTICE_SET = NOT_ESTABLISHED
PDFIUM_WASM_EXACT_ACQUISITION_DIGEST = NOT_ESTABLISHED
PDFIUM_WASM_ARCHIVE_TO_SOURCE_BUILD_BINDING = NOT_ESTABLISHED
PDFIUM_WASM_ADOPTION_ELIGIBILITY = FAIL_CLOSED
```

The wrapper package's MIT field must not be used as a substitute for complete PDFium binary redistribution evidence.

## 11. Provenance / NOTICE / SBOM future surface

A later separately authorized acquisition unit would need to produce deterministic records for every adopted package and binary component, including:

- source repository and immutable source revision;
- registry package/version;
- registry integrity/tarball identity;
- exact acquired archive or package digest;
- package-to-source evidence class;
- license classification and license text source;
- bundled/transitive license obligations;
- required NOTICE entries;
- SBOM component identity and dependency edges;
- review state and exact-head qualification evidence.

004C1 does not mutate `provenance/**`, root `NOTICE`, or any SBOM output.

## 12. Minimal future repository mutation surface

No exact path is authorized yet, but a future acquisition grain would require explicit authority covering the equivalent of:

```text
one canonical browser workspace/package boundary
one exact package manifest for that boundary
one canonical package-manager/lockfile strategy
exact dependency entries at immutable versions/integrities
provenance records for acquired packages and executable WASM
NOTICE/license/SBOM reconciliation
no product behavior beyond dependency/bootstrap verification unless separately authorized
```

The unit must not opportunistically introduce unrelated UI, editor, signing, persistence, provider, native, server, or heavy-worker dependencies.

## 13. Deterministic future acquisition gates

A future acquisition unit is eligible only when all of these are established on exact live truth:

```text
G1_WORKSPACE_DESTINATION_EXPLICITLY_AUTHORIZED = PASS
G2_PACKAGE_MANAGER_AND_LOCKFILE_SURFACE_AUTHORIZED = PASS
G3_DIRECT_PACKAGE_SET_EXACT = PASS
G4_REGISTRY_VERSION_AND_INTEGRITY_FOR_EACH_PACKAGE = PASS
G5_PUBLISHED_TRANSITIVE_GRAPH_COMPLETE = PASS
G6_PEER_GRAPH_RESOLVED_TO_ACTUAL_SIGNTHOS_INTEGRATION = PASS
G7_ARCHIVE_TO_PINNED_SOURCE_EVIDENCE_ACCEPTABLE = PASS
G8_PDFIUM_WASM_PROVENANCE_AND_LICENSE_NOTICE_SET_COMPLETE = PASS
G9_ALL_TRANSITIVE_LICENSES_COMPATIBLE_AND_RECORDED = PASS
G10_PROVENANCE_NOTICE_SBOM_CHANGE_SURFACE_AUTHORIZED = PASS
G11_ZERO_UNAUTHORIZED_SOURCE_OR_FIXTURE_IMPORT = PASS
G12_ZERO_PROVIDER_RUNTIME_EXECUTION = PASS_UNLESS_SEPARATELY_AUTHORIZED
G13_EXACT_HEAD_INDEPENDENT_SUBSTANTIVE_REVIEW = PASS
```

Any missing gate fails closed.

## 14. Runtime evidence remains absent

004C1 performs no runtime work. Therefore all 004C runtime claims remain absent:

```text
004C_FIXTURE_CORPUS_BYTES = ABSENT
004C_FIXTURE_CORPUS_REVISION_DIGEST = ABSENT
004C_RUNTIME_CORPUS_RESULTS = ABSENT
004C_RESOURCE_LIMIT_VALUES = ABSENT
004C_CANCELLATION_EVIDENCE = ABSENT
004C_NO_NETWORK_RUNTIME_EVIDENCE = ABSENT
004C_PERFORMANCE_BASELINE = ABSENT
004C_BROWSER_COMPATIBILITY_EVIDENCE = ABSENT
004C_RENDER_DETERMINISM_CLASSIFICATION = ABSENT
```

No package metadata observation may be used to imply any of these runtime properties.

## 15. Security and locality preservation

Any later acquisition/implementation must preserve canonical 004C rules:

1. PDF bytes are untrusted input;
2. document processing remains `LOCAL_ONLY` for this provider candidate;
3. no hidden document-content network fallback is permitted;
4. active content remains default-deny;
5. malformed/encrypted/resource-limit/cancellation cases remain distinguishable;
6. read-only operations must not rewrite canonical input bytes;
7. caches, render surfaces, decoded buffers, and search indexes are noncanonical temporary data;
8. provider package updates cannot silently redefine capability semantics;
9. package telemetry or update checks cannot become a document-content channel;
10. executable WASM provenance is a security boundary, not merely package metadata.

## 16. What 004C1 establishes

If independently qualified and canonicalized, 004C1 establishes only:

```text
004C1_BROWSER_WORKSPACE_CURRENT_STATE = ABSENT
004C1_BROWSER_WORKSPACE_DESTINATION = REQUIRES_SEPARATE_CANONICAL_SELECTION
004C1_DIRECT_CANDIDATE_PACKAGE_SET = BOUNDED_TO_SEVEN_004C_PACKAGES
004C1_PINNED_SOURCE_DEPENDENCY_OBSERVATIONS = ESTABLISHED_FOR_INSPECTED_MANIFESTS
004C1_REGISTRY_COMPLETE_METADATA = NOT_ESTABLISHED
004C1_ARCHIVE_TO_SOURCE_BINDING = NOT_ESTABLISHED
004C1_PDFIUM_WASM_DISTRIBUTION_EVIDENCE = NOT_ESTABLISHED
004C1_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED_PENDING_EVIDENCE_AND_AUTHORITY
004C1_IMPLEMENTATION_AUTHORITY = ABSENT
```

This is useful progress because it converts an ambiguous dependency step into explicit evidence obligations without importing or installing anything.

## 17. What 004C1 does not establish

004C1 does not establish:

- dependency adoption or installation authority;
- a canonical browser workspace path;
- a root package manifest;
- a package manager or lockfile choice;
- exact npm archive integrity for the full graph;
- archive-to-pinned-source equivalence;
- complete PDFium binary redistribution rights/notices;
- fixture acquisition/generation authority;
- browser/provider runtime execution authority;
- PDF inspect/render/search implementation authority;
- validated resource limits;
- no-network runtime proof;
- performance, determinism, browser compatibility, or security corpus results;
- 004C2 authority;
- 004D authority;
- Specification 005 authority.

## 18. Successor derivation rule

No successor is inferred from numbering.

After this 004C1 candidate passes fresh independent substantive exact-head review, guarded expected-head merge, post-merge verification, and fresh canonical governance reread, successor authority must be derived from live evidence.

Possible outcomes include:

- another narrower registry/provenance discovery grain if exact package/archive evidence remains incomplete;
- a bounded dependency-acquisition grain if governance separately authorizes the exact workspace/package/lockfile/provenance surface and all evidence gates are ready;
- continued fail-closed hold if PDFium redistribution/provenance or registry/source binding remains insufficient.

004C2 runtime implementation and 004D remain unauthorized unless a later canonical reconciliation explicitly grants them.
