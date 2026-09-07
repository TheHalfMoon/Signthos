# Specification 004C1C — Declared Registry Closure Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_DISCOVERY_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `80ffe65255c04db443fb260c37ff454922c05e41`
Authority source: `github:issue-comment:5566568843`

## 1. Authority boundary

This grain is limited to public immutable registry/source metadata qualification.

```text
004C1C_AUTHORITY = PLANNING_DISCOVERY_QUALIFICATION_ONLY
004C1C_IMPLEMENTATION_AUTHORITY = ABSENT
004C1C_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1C_DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
004C1C_PACKAGE_ARCHIVE_DOWNLOAD_IMPORT_AUTHORITY = ABSENT
004C1C_PACKAGE_MANAGER_SELECTION_AUTHORITY = ABSENT
004C1C_PACKAGE_MANIFEST_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1C_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1C_PROVIDER_RUNTIME_EXECUTION_AUTHORITY = ABSENT
004C1C_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

No package bytes, source bytes, binaries, fixtures, manifests, lockfiles, provenance records, NOTICE/SBOM outputs, runtime code, workflows, containers, or databases are changed by this grain.

## 2. Canonical predecessor result

004C1B closed canonical through PR #107. It established stronger exact public npm version-record evidence while preserving acquisition fail-closed.

Canonical predecessor states include:

```text
EXACT_ENGINE_PUBLISHED_DEPENDENCY_COUNT = NINE_DIRECTLY_OBSERVED
EXACT_ENGINE_FONT_DEPENDENCY_RANGES = SEVEN_DIRECT_EXACT_1.0.0_ENTRIES_OBSERVED
EXACT_ENGINE_COMPLETE_PUBLISHED_DEPENDENCY_MAP = NOT_ESTABLISHED
SELECTED_VERSION_DOCUMENT_DIST_METADATA = DIRECTLY_OBSERVED
FULL_RECURSIVE_TRANSITIVE_RESOLUTION = NOT_ESTABLISHED
FULL_RESOLVED_PEER_OPTIONAL_PEER_CLOSURE = NOT_ESTABLISHED
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = UNPROVEN
SIGNTHOS_PACKAGE_MANAGER = NOT_YET_CANONICAL
004C1B_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
```

004C1C must not reinterpret those states as installation or adoption readiness.

## 3. Evidence-class distinction

This qualification distinguishes four materially different evidence classes:

```text
DECLARED_DIRECT_DEPENDENCY_METADATA
DECLARED_TRANSITIVE_DEPENDENCY_METADATA
DECLARED_PEER_OPTIONAL_PEER_METADATA
RESOLVED_INSTALLATION_GRAPH
```

The first three are package-version metadata observations. The fourth depends on an explicitly selected resolver/package manager, exact root manifest inputs, overrides/resolutions, platform constraints, peer policy, optional-dependency behavior, and lockfile semantics.

Therefore:

```text
DECLARED_METADATA != RESOLVED_INSTALLATION_GRAPH
```

No declared range, package-page dependency count, or upstream workspace declaration is promoted into a resolved-installation claim.

## 4. Selected engine direct dependency evidence

Fresh public registry observations continue to identify `@embedpdf/engines@2.15.0` with nine direct dependency entries.

The seven fallback-font dependencies are independently versioned at `1.0.0`:

```text
@embedpdf/fonts-arabic = 1.0.0
@embedpdf/fonts-hebrew = 1.0.0
@embedpdf/fonts-jp = 1.0.0
@embedpdf/fonts-kr = 1.0.0
@embedpdf/fonts-latin = 1.0.0
@embedpdf/fonts-sc = 1.0.0
@embedpdf/fonts-tc = 1.0.0
```

Public package metadata also identifies `@embedpdf/models@2.15.0` and `@embedpdf/pdfium@2.15.0` as direct engine dependencies.

This grain records only package/version identity observations that are directly supportable from public package metadata. It does not claim that every exact published dependency range has been independently captured from one immutable version-document snapshot unless that exact field is directly recorded.

Classification:

```text
ENGINE_DIRECT_DEPENDENCY_COUNT = NINE_OBSERVED
ENGINE_DIRECT_DEPENDENCY_NAMES = NINE_OBSERVED
ENGINE_FONT_VERSION_IDENTITIES = SEVEN_AT_1.0.0_OBSERVED
ENGINE_MODELS_VERSION_IDENTITY = 2.15.0_OBSERVED
ENGINE_PDFIUM_VERSION_IDENTITY = 2.15.0_OBSERVED
ENGINE_COMPLETE_EXACT_RANGE_MAP = NOT_ESTABLISHED
```

The distinction between version identity and exact declared range is deliberate.

## 5. Declared transitive metadata boundary

A recursively complete declared package metadata closure would require walking every selected exact package version and recording, for every reachable version record:

- package name and exact version identity;
- declared `dependencies` map;
- declared `optionalDependencies` map;
- declared `peerDependencies` map;
- declared `peerDependenciesMeta` where present;
- relevant `engines`, `os`, and `cpu` constraints where present;
- exact registry `dist.integrity`, `dist.shasum`, and `dist.tarball` metadata;
- package-level license and repository metadata.

This candidate does not claim that such a complete recursively enumerated metadata closure has been established for the final selected provider surface.

```text
COMPLETE_DECLARED_TRANSITIVE_METADATA_CLOSURE = NOT_ESTABLISHED
COMPLETE_DECLARED_PEER_OPTIONAL_PEER_METADATA_CLOSURE = NOT_ESTABLISHED
COMPLETE_SELECTED_DIST_METADATA_SET = NOT_ESTABLISHED
```

## 6. Package-page and registry-version observations

Public npm package pages currently support existence/version/license observations for the selected EmbedPDF package family and show dependency counts for individual packages.

These pages are useful discovery evidence but are weaker than exact version documents for package-to-range and `dist` fields.

This grain therefore preserves:

```text
PACKAGE_PAGE_EXISTENCE_VERSION_LICENSE_EVIDENCE = PRESENT_FOR_OBSERVED_PACKAGES
PACKAGE_PAGE_DEPENDENCY_COUNT_EVIDENCE = PRESENT_WHERE_EXPOSED
EXACT_VERSION_DOCUMENT_FIELD_EVIDENCE = REQUIRED_FOR_RANGE_AND_DIST_CLAIMS
```

## 7. Resolver and package-manager boundary

No Signthos package manager is selected by this grain.

```text
SIGNTHOS_PACKAGE_MANAGER = NOT_YET_CANONICAL
ROOT_JS_WORKSPACE_CONTROL_SURFACE = UNRESOLVED
ROOT_PACKAGE_MANIFEST = ABSENT_OR_NOT_AUTHORIZED_FOR_MUTATION
LOCKFILE_FORMAT = NOT_SELECTED
OVERRIDE_RESOLUTION_POLICY = NOT_SELECTED
PEER_CONFLICT_POLICY = NOT_SELECTED
OPTIONAL_DEPENDENCY_POLICY = NOT_SELECTED
PLATFORM_RESOLUTION_INPUTS = NOT_SELECTED
```

Without those inputs, a package-manager-resolved graph cannot be truthfully claimed.

004C1C does not run npm, pnpm, yarn, bun, or any other resolver.

## 8. Archive, PDFium and font redistribution boundary

Declared registry closure metadata does not establish archive contents or redistribution closure.

The following remain unproven:

```text
REGISTRY_ARCHIVE_PAYLOAD_CHARACTERIZATION = NOT_ESTABLISHED
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = UNPROVEN
PDFIUM_WASM_EXACT_ACQUISITION_DIGEST = NOT_ESTABLISHED
PDFIUM_WASM_ARCHIVE_SOURCE_BUILD_BINDING = NOT_ESTABLISHED
PDFIUM_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
FONT_EXACT_ASSET_NOTICE_SET = NOT_ESTABLISHED
FONT_EXTRACTED_ASSET_DIGEST_SET = NOT_ESTABLISHED
```

Package-level MIT or OFL-1.1 metadata must not be used to infer complete bundled third-party notice obligations.

## 9. Acquisition readiness

The current result remains fail-closed:

```text
004C1C_DIRECT_DECLARED_METADATA = PARTIALLY_ESTABLISHED
004C1C_COMPLETE_DECLARED_TRANSITIVE_METADATA = INCOMPLETE
004C1C_RESOLVED_INSTALLATION_GRAPH = NOT_ESTABLISHED
004C1C_ARCHIVE_PAYLOAD_CHARACTERIZATION = UNPROVEN
004C1C_ARCHIVE_SOURCE_BINDING = UNPROVEN
004C1C_PDFIUM_NOTICE_BINDING = INCOMPLETE
004C1C_FONT_NOTICE_BINDING = INCOMPLETE
004C1C_PACKAGE_MANAGER_SELECTION = UNRESOLVED
004C1C_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1C_IMPLEMENTATION_AUTHORITY = ABSENT
004C1C_RUNTIME_AUTHORITY = ABSENT
```

No package installation or source/runtime mutation may be inferred from this qualification.

## 10. Remaining deterministic gates

Before dependency bytes may enter Signthos, fresh canonical evidence must establish all applicable gates, including:

1. complete exact direct package-to-range maps for the final selected package set;
2. complete recursively enumerated declared dependency/peer/optional-peer metadata;
3. a separately authorized Signthos package-manager and root-workspace decision;
4. exact deterministic resolved graph under that selected resolver and policy;
5. complete exact `dist` identity set for that resolved graph;
6. archive payload and lifecycle/install-script characterization;
7. archive-to-pinned-source relationship evidence acceptable to governance;
8. exact PDFium WASM source/build/license/notice/SBOM evidence;
9. exact font asset/license/copyright/notice evidence;
10. exact writable package/workspace/lockfile/provenance/NOTICE/SBOM authority;
11. independent exact-head substantive review and guarded canonicalization of every prerequisite grain.

## 11. Successor rule

Canonicalizing 004C1C does not authorize package-manager selection, dependency acquisition, runtime implementation, 004C2, 004D, or Specification 005.

After exact-head independent substantive review, guarded merge, post-merge verification, and fresh governance reread, the next successor must be derived from live canonical evidence.

A future package-manager/workspace decision or deterministic resolver-closure qualification requires its own separately bounded authority.

## 12. Explicit non-claims

004C1C does not claim that:

- any dependency is adopted, installed, downloaded, imported, or executable;
- a Signthos package manager is selected;
- the complete exact published direct range map is established;
- the complete recursively declared metadata closure is established;
- a package-manager-resolved graph is established;
- archive payload contents or archive/source equality are established;
- PDFium or font redistribution obligations are complete;
- any provider runtime has executed;
- 004C2, 004D, or Specification 005 is authorized.
