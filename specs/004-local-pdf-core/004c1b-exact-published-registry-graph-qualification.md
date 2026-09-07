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

This grain does not weaken those states.

## 3. Public registry evidence source

The npm public registry remains the authoritative package registry used by npm for package metadata. Public npm package pages are treated only as the evidence fields they directly expose. A package page showing a version, license, dependency count, or repository does not prove `dist.integrity`, `dist.shasum`, exact tarball identity, archive contents, or archive-to-source equivalence.

Observed first-party/public sources on 2026-09-07:

- `https://www.npmjs.com/package/@embedpdf/core`
- `https://www.npmjs.com/package/@embedpdf/engines`
- `https://www.npmjs.com/package/@embedpdf/models`
- `https://www.npmjs.com/package/@embedpdf/pdfium`
- `https://www.npmjs.com/package/@embedpdf/plugin-interaction-manager`
- `https://www.npmjs.com/search?q=@embedpdf`
- npm registry documentation describing the public registry endpoint.

## 4. Published version observations

The current public package pages establish these bounded facts:

```text
@embedpdf/core = 2.15.0 / MIT / 2 dependencies observed
@embedpdf/engines = 2.15.0 / MIT / 9 dependencies observed
@embedpdf/models = 2.15.0 / MIT / 0 dependencies observed
@embedpdf/pdfium = 2.15.0 / MIT package metadata observed
@embedpdf/plugin-interaction-manager = 2.15.0 / MIT / @embedpdf/models dependency observed
@embedpdf/utils = 2.15.0 / MIT existence observed
```

The public npm search surface also establishes that the fallback font packages are independently versioned rather than following the `2.15.0` application-package line:

```text
@embedpdf/fonts-arabic = 1.0.0 / OFL-1.1
@embedpdf/fonts-hebrew = 1.0.0 / OFL-1.1
@embedpdf/fonts-jp = 1.0.0 / OFL-1.1
@embedpdf/fonts-kr = 1.0.0 / OFL-1.1
@embedpdf/fonts-latin = 1.0.0 / OFL-1.1
@embedpdf/fonts-sc = 1.0.0 / OFL-1.1
@embedpdf/fonts-tc = 1.0.0 / OFL-1.1
```

This is a material refinement of the future graph boundary: package names in the pinned source closure must not be assigned `2.15.0` by family-name inference. Exact published dependency ranges from `@embedpdf/engines@2.15.0` still have to be bound before the font versions can be promoted into an exact resolved graph.

## 5. Published graph state

Current public page evidence improves existence/version/license classification but does not establish the exact published closure.

```text
DIRECT_CORE_VERSION_EXISTENCE = ESTABLISHED_FOR_OBSERVED_PACKAGES
FONT_PACKAGE_VERSION_EXISTENCE = ESTABLISHED_AS_1.0.0_FOR_OBSERVED_FONT_SET
FONT_PACKAGE_LEVEL_LICENSE = OFL-1.1_OBSERVED
EXACT_CORE_PUBLISHED_DEPENDENCY_RANGES = PARTIAL
EXACT_ENGINE_PUBLISHED_DEPENDENCY_RANGES = NOT_ESTABLISHED
EXACT_PLUGIN_PUBLISHED_DEPENDENCY_RANGES = PARTIAL
EXACT_PUBLISHED_TRANSITIVE_GRAPH = NOT_ESTABLISHED
EXACT_PUBLISHED_PEER_GRAPH = NOT_ESTABLISHED
```

Dependency counts are not accepted as dependency identities or ranges.

## 6. Exact dist metadata state

The current evidence available to this grain does not expose or independently bind the exact npm version-document `dist` fields for the selected package set.

Therefore:

```text
EXACT_REGISTRY_INTEGRITY_SET = NOT_ESTABLISHED
EXACT_REGISTRY_SHASUM_SET = NOT_ESTABLISHED
EXACT_REGISTRY_TARBALL_SET = NOT_ESTABLISHED
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = UNPROVEN
```

No package archive is downloaded into Signthos to compensate for missing metadata.

## 7. PDFium and font redistribution boundary

The `@embedpdf/pdfium` package page identifies the package as MIT while its documentation states that bundled PDFium WebAssembly is Apache-2.0 licensed. That package-level statement is not sufficient to establish the complete bundled PDFium third-party notice set, build identity, exact WASM digest, reproducibility relationship, or SBOM mapping.

The fallback fonts are publicly described under OFL-1.1 package metadata. This improves license-family classification but does not yet establish exact shipped font files, copyrights, required notices, archive digests, modification state, or exact relationship to the selected engine archive.

```text
PDFIUM_WRAPPER_LICENSE = MIT_OBSERVED
PDFIUM_BUNDLED_ENGINE_LICENSE_FAMILY = APACHE_2_0_OBSERVED_FROM_PACKAGE_DOCUMENTATION
PDFIUM_WASM_EXACT_ACQUISITION_DIGEST = NOT_ESTABLISHED
PDFIUM_WASM_ARCHIVE_SOURCE_BUILD_BINDING = NOT_ESTABLISHED
PDFIUM_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
FONT_PACKAGE_LICENSE_FAMILY = OFL_1_1_OBSERVED
FONT_EXACT_ASSET_NOTICE_SET = NOT_ESTABLISHED
FONT_ARCHIVE_DIGEST_SET = NOT_ESTABLISHED
```

## 8. Framework peers and package manager

No framework or Signthos package manager is selected by this grain.

```text
PEER_FRAMEWORK_INSTALLATION_SET = UNRESOLVED
FRAMEWORK_ADOPTION_AUTHORITY = ABSENT
SIGNTHOS_PACKAGE_MANAGER = NOT_YET_CANONICAL
ROOT_JS_WORKSPACE_CONTROL_SURFACE = UNRESOLVED
PACKAGE_MANIFEST_MUTATION_AUTHORITY = ABSENT
LOCKFILE_MUTATION_AUTHORITY = ABSENT
```

Upstream `pnpm@10.4.0` remains reproduction metadata only.

## 9. Acquisition readiness

The refined evidence still fails dependency acquisition closed:

```text
004C1B_EXACT_PUBLISHED_GRAPH = INCOMPLETE
004C1B_EXACT_DIST_METADATA = INCOMPLETE
004C1B_ARCHIVE_SOURCE_BINDING = UNPROVEN
004C1B_PDFIUM_NOTICE_BINDING = INCOMPLETE
004C1B_FONT_NOTICE_BINDING = INCOMPLETE
004C1B_PEER_RESOLUTION = UNPROVEN
004C1B_PACKAGE_MANAGER_SELECTION = UNRESOLVED
004C1B_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1B_IMPLEMENTATION_AUTHORITY = ABSENT
004C1B_RUNTIME_AUTHORITY = ABSENT
```

A future acquisition/bootstrap grain is not authorized merely because package/version existence is now better characterized.

## 10. Remaining deterministic gates

Before dependency bytes may enter Signthos, fresh canonical evidence must establish all applicable gates:

1. exact published dependency ranges for the selected direct and transitive package set;
2. exact published peer and optional-peer metadata;
3. exact registry `dist.integrity`, `dist.shasum`, and tarball identity per selected package;
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

After exact-head independent substantive review, guarded expected-head merge, post-merge verification, and fresh canonical governance reread, the next successor must be derived from live evidence. If exact dist/published-graph and distribution evidence remain unavailable, another evidence-only grain or an explicit external blocker is the safe result.

## 12. Explicit non-claims

004C1B does not claim that:

- any dependency is adopted, installed, downloaded, or imported;
- the full published dependency/peer closure is known;
- any exact npm integrity, shasum, or tarball identity is known when not directly evidenced;
- a registry archive equals pinned Git source bytes;
- package-level MIT fully classifies bundled PDFium obligations;
- package-level OFL-1.1 alone completes font redistribution notice evidence;
- pnpm is selected for Signthos;
- any framework is selected;
- any provider runtime has executed;
- 004C2, 004D, or Specification 005 is authorized.
