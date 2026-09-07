# Specification 004C1B — Exact Published Registry Graph Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_DISCOVERY_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `156688e0e11da944a7197224ea933a8e5cbefccf`
Authority source: `github:issue-comment:5563598888`

## 1. Authority boundary

This grain is limited to public first-party registry/source metadata qualification.

```text
004C1B_AUTHORITY = PLANNING_DISCOVERY_QUALIFICATION_ONLY
004C1B_IMPLEMENTATION_AUTHORITY = ABSENT
004C1B_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1B_DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
004C1B_PACKAGE_ARCHIVE_DOWNLOAD_IMPORT_AUTHORITY = ABSENT
004C1B_PACKAGE_MANAGER_SELECTION_AUTHORITY = ABSENT
004C1B_PACKAGE_MANIFEST_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1B_SOURCE_BINARY_FIXTURE_IMPORT_AUTHORITY = ABSENT
004C1B_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1B_PROVIDER_RUNTIME_EXECUTION_AUTHORITY = ABSENT
004C1B_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

No package bytes, source bytes, binaries, fixtures, manifests, lockfiles, provenance records, NOTICE/SBOM outputs, runtime code, workflows, containers, or databases are changed by this grain.

## 2. Canonical predecessor result

004C1A closed canonical through PR #106 and intentionally failed dependency acquisition closed because the complete registry metadata set, exact integrity/tarball identities, published dependency/peer graph, archive-to-source binding, PDFium distribution evidence, font redistribution evidence, peer policy, and Signthos package-manager/workspace selection were not established.

This grain refines only evidence that is now directly observed from exact public npm version documents. It does not promote those observations into dependency-acquisition authority.

## 3. Public registry evidence source

The npm public registry is the package registry used by npm for package metadata. This grain distinguishes npm package-page observations from exact npm version-document observations. Exact version-document fields are accepted only as the registry metadata fields they directly expose; they do not prove archive contents, archive-to-source equivalence, bundled third-party notice completeness, or runtime suitability.

Observed public sources on 2026-09-07 include:

- `https://www.npmjs.com/package/@embedpdf/core`
- `https://www.npmjs.com/package/@embedpdf/engines`
- `https://www.npmjs.com/package/@embedpdf/models`
- `https://www.npmjs.com/package/@embedpdf/pdfium`
- `https://www.npmjs.com/package/@embedpdf/plugin-interaction-manager`
- `https://www.npmjs.com/search?q=@embedpdf`
- exact public npm version documents under `https://registry.npmjs.org/<encoded-package>/<version>` for the selected package/version records inspected by this qualification.

The registry version-document boundary is materially stronger than a package-page count: it exposes exact published dependency/peer metadata and exact `dist.integrity`, `dist.shasum`, and `dist.tarball` fields for the queried version record.

## 4. Published version and dependency observations

The selected package/version existence and package-level license observations include:

```text
@embedpdf/core = 2.15.0 / MIT
@embedpdf/engines = 2.15.0 / MIT
@embedpdf/models = 2.15.0 / MIT
@embedpdf/pdfium = 2.15.0 / MIT
@embedpdf/plugin-interaction-manager = 2.15.0 / MIT
@embedpdf/utils = 2.15.0 / MIT
```

The fallback font packages are independently versioned rather than following the `2.15.0` application-package line:

```text
@embedpdf/fonts-arabic = 1.0.0 / OFL-1.1
@embedpdf/fonts-hebrew = 1.0.0 / OFL-1.1
@embedpdf/fonts-jp = 1.0.0 / OFL-1.1
@embedpdf/fonts-kr = 1.0.0 / OFL-1.1
@embedpdf/fonts-latin = 1.0.0 / OFL-1.1
@embedpdf/fonts-sc = 1.0.0 / OFL-1.1
@embedpdf/fonts-tc = 1.0.0 / OFL-1.1
```

Fresh exact-version-document inspection also establishes that `@embedpdf/engines@2.15.0` publishes nine dependency entries. The seven fallback-font dependency ranges are directly observed as exact `1.0.0` entries rather than inferred from the EmbedPDF `2.15.0` family line. The complete nine-entry published dependency map is therefore registry-observed evidence for this exact version record, not a package-page count or source-workspace inference.

Classification:

```text
DIRECT_CORE_VERSION_EXISTENCE = ESTABLISHED_FOR_OBSERVED_PACKAGES
FONT_PACKAGE_VERSION_EXISTENCE = ESTABLISHED_AS_1.0.0_FOR_OBSERVED_FONT_SET
FONT_PACKAGE_LEVEL_LICENSE = OFL-1.1_OBSERVED
EXACT_ENGINE_PUBLISHED_DEPENDENCY_RANGES = DIRECTLY_OBSERVED_FROM_2.15.0_VERSION_DOCUMENT
EXACT_ENGINE_FONT_DEPENDENCY_RANGES = SEVEN_DIRECT_EXACT_1.0.0_ENTRIES_OBSERVED
SELECTED_VERSION_DOCUMENT_PEER_FIELDS = DIRECTLY_OBSERVED_WHERE_PRESENT
EXACT_PUBLISHED_TRANSITIVE_GRAPH = NOT_ESTABLISHED
EXACT_RESOLVED_PEER_GRAPH = NOT_ESTABLISHED
```

Direct dependency metadata does not establish the recursively resolved transitive graph or prove that a future Signthos package-manager resolution would produce one specific closure.

## 5. Exact registry dist metadata observations

Fresh public npm version-document inspection establishes that selected exact version records directly expose the registry `dist` fields:

```text
SELECTED_VERSION_DOCUMENT_DIST_INTEGRITY = DIRECTLY_OBSERVED
SELECTED_VERSION_DOCUMENT_DIST_SHASUM = DIRECTLY_OBSERVED
SELECTED_VERSION_DOCUMENT_DIST_TARBALL = DIRECTLY_OBSERVED
```

These are exact registry metadata observations for the queried package/version records. They correct the predecessor candidate's over-conservative claim that such fields were not exposed.

They do **not** establish all acquisition gates. In particular, this grain does not download or hash package archives inside Signthos, characterize archive payloads, prove archive-to-pinned-source equivalence, or bind bundled PDFium/font distribution obligations.

Therefore the broader states remain:

```text
EXACT_SELECTED_VERSION_DOCUMENT_DIST_FIELDS = ESTABLISHED_FOR_INSPECTED_RECORDS
COMPLETE_SELECTED_AND_TRANSITIVE_DIST_SET = NOT_ESTABLISHED
REGISTRY_ARCHIVE_PAYLOAD_CHARACTERIZATION = NOT_ESTABLISHED
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = UNPROVEN
```

No package archive is downloaded into Signthos by this grain.

## 6. Published graph state

The direct registry evidence is now stronger than the previous candidate stated, but the exact acquisition closure is still incomplete.

```text
EXACT_ENGINE_DIRECT_PUBLISHED_DEPENDENCY_MAP = ESTABLISHED_FROM_VERSION_DOCUMENT
SELECTED_VERSION_DOCUMENT_PEER_METADATA = DIRECTLY_OBSERVED_WHERE_PRESENT
SELECTED_VERSION_DOCUMENT_DIST_METADATA = DIRECTLY_OBSERVED
FULL_RECURSIVE_TRANSITIVE_RESOLUTION = NOT_ESTABLISHED
FULL_RESOLVED_PEER_OPTIONAL_PEER_CLOSURE = NOT_ESTABLISHED
COMPLETE_ARCHIVE_IDENTITY_SET_FOR_FINAL_CLOSURE = NOT_ESTABLISHED
```

No dependency count, family-name convention, source `workspace:*` declaration, or version-number similarity is promoted into a resolved-closure claim.

## 7. PDFium and font redistribution boundary

The `@embedpdf/pdfium` package metadata identifies the wrapper package as MIT while its documentation states that bundled PDFium WebAssembly is Apache-2.0 licensed. Registry `dist` metadata does not by itself establish the complete bundled PDFium third-party notice set, build identity, exact WASM digest after archive extraction, reproducibility relationship, or SBOM mapping.

The fallback fonts are publicly described under OFL-1.1 package metadata. Direct version-document and tarball-URL metadata improve registry identity evidence but do not establish exact shipped font files, copyrights, required notices, modification state, or exact relationship to the selected engine archive without archive characterization.

```text
PDFIUM_WRAPPER_LICENSE = MIT_OBSERVED
PDFIUM_BUNDLED_ENGINE_LICENSE_FAMILY = APACHE_2_0_OBSERVED_FROM_PACKAGE_DOCUMENTATION
PDFIUM_WASM_EXACT_ACQUISITION_DIGEST = NOT_ESTABLISHED
PDFIUM_WASM_ARCHIVE_SOURCE_BUILD_BINDING = NOT_ESTABLISHED
PDFIUM_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
FONT_PACKAGE_LICENSE_FAMILY = OFL_1_1_OBSERVED
FONT_EXACT_ASSET_NOTICE_SET = NOT_ESTABLISHED
FONT_EXTRACTED_ASSET_DIGEST_SET = NOT_ESTABLISHED
```

## 8. Framework peers and package manager

The selected version documents expose peer metadata where present, but this grain does not select a framework or Signthos package manager and does not resolve peer policy into a concrete installation graph.

```text
PEER_METADATA_OBSERVATION = PRESENT_FOR_INSPECTED_VERSION_DOCUMENTS_WHERE_EXPOSED
PEER_FRAMEWORK_INSTALLATION_SET = UNRESOLVED
FRAMEWORK_ADOPTION_AUTHORITY = ABSENT
SIGNTHOS_PACKAGE_MANAGER = NOT_YET_CANONICAL
ROOT_JS_WORKSPACE_CONTROL_SURFACE = UNRESOLVED
PACKAGE_MANIFEST_MUTATION_AUTHORITY = ABSENT
LOCKFILE_MUTATION_AUTHORITY = ABSENT
```

Upstream `pnpm@10.4.0` remains reproduction metadata only.

## 9. Acquisition readiness

The corrected evidence still fails dependency acquisition closed:

```text
004C1B_DIRECT_REGISTRY_METADATA = PARTIALLY_ESTABLISHED
004C1B_RECURSIVE_RESOLVED_GRAPH = INCOMPLETE
004C1B_COMPLETE_DIST_SET_FOR_FINAL_CLOSURE = INCOMPLETE
004C1B_ARCHIVE_PAYLOAD_CHARACTERIZATION = UNPROVEN
004C1B_ARCHIVE_SOURCE_BINDING = UNPROVEN
004C1B_PDFIUM_NOTICE_BINDING = INCOMPLETE
004C1B_FONT_NOTICE_BINDING = INCOMPLETE
004C1B_PEER_RESOLUTION = UNPROVEN
004C1B_PACKAGE_MANAGER_SELECTION = UNRESOLVED
004C1B_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1B_IMPLEMENTATION_AUTHORITY = ABSENT
004C1B_RUNTIME_AUTHORITY = ABSENT
```

A future acquisition/bootstrap grain is not authorized merely because stronger registry metadata is now directly observable.

## 10. Remaining deterministic gates

Before dependency bytes may enter Signthos, fresh canonical evidence must establish all applicable gates:

1. the final selected direct and recursively resolved transitive package closure;
2. the final resolved peer/optional-peer policy and graph;
3. the complete exact registry `dist.integrity`, `dist.shasum`, and tarball identity set for that final closure;
4. archive file/executable payload characterization;
5. acceptable archive-to-pinned-source relationship evidence;
6. exact PDFium WASM source/build/license/notice/SBOM evidence;
7. exact font asset/license/copyright/notice evidence;
8. lifecycle/install-script and remote-download-hook review;
9. exact Signthos package-manager selection;
10. exact root workspace and package-manifest/lockfile writable surface authorization;
11. exact provenance/NOTICE/SBOM mutation authorization;
12. independent exact-head review, guarded expected-head merge, and post-merge reconciliation.

## 11. Successor rule

Canonicalizing 004C1B does not authorize dependency acquisition, package-manager selection, runtime implementation, 004D, or Specification 005.

After exact-head independent substantive review, guarded expected-head merge, post-merge verification, and fresh canonical governance reread, the next successor must be derived from live evidence. Stronger direct registry evidence may justify a separately authorized archive/provenance or resolution qualification grain, but it does not itself authorize installation or import.

## 12. Explicit non-claims

004C1B does not claim that:

- any dependency is adopted, installed, downloaded, or imported;
- the full recursively resolved dependency/peer closure is known;
- observed registry `dist` metadata proves archive payload contents or archive-to-source equality;
- package-level MIT fully classifies bundled PDFium obligations;
- package-level OFL-1.1 alone completes font redistribution notice evidence;
- pnpm is selected for Signthos;
- any framework is selected;
- any provider runtime has executed;
- 004C2, 004D, or Specification 005 is authorized.
