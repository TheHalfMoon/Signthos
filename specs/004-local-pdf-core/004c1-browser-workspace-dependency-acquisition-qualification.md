# Specification 004C1 — Browser Workspace and Dependency Acquisition Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_DISCOVERY_ONLY / ZERO_DEPENDENCY_BYTES`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `43d2f79476190fbbc6cec65959d06c49405065ba`
Authority source: `github:issue-comment:5562814547`

## 1. Canonical authority

Canonical Specification 004C is closed for its planning/provider-entry scope through PR #103.

Fresh post-004C reconciliation authorizes exactly:

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

This artifact exercises only that bounded planning/discovery authority.

It does not create a JavaScript workspace, write a package manifest, install a package, resolve a lockfile, download a tarball, import upstream source/binary bytes, execute PDFium, or implement any 004C runtime behavior.

## 2. Why this grain exists

Canonical 004C intentionally stopped before dependency acquisition and runtime execution.

Its live closeout records these blockers:

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
```

Canonical `plan.md` explicitly allows post-closeout authority to split, narrow, reorder, or block candidate grains.

004D is not yet eligible because page-structure transforms require read/inspection prerequisites needed for validation, while no 004C read/inspection runtime exists.

004C1 therefore resolves the **workspace and dependency acquisition contract** before any implementation grain is allowed to mutate manifests or execute untrusted PDF code.

## 3. Evidence classes

This artifact distinguishes four evidence classes:

```text
CANONICAL_SIGNTHOS_REPOSITORY_TRUTH
IMMUTABLE_UPSTREAM_SOURCE_METADATA
PUBLIC_REGISTRY_PAGE_METADATA
UNPROVEN_OR_DEFERRED_EVIDENCE
```

Rules:

1. moving branches are not merge-critical evidence;
2. source `workspace:*` dependency declarations are not treated as exact published registry closure;
3. an npm package-page version/license observation is not an integrity hash;
4. a package wrapper license is not complete bundled PDFium distribution licensing;
5. no absent registry/tarball evidence is reconstructed from source assumptions;
6. inability to prove a required field produces an explicit blocker rather than a guessed value.

## 4. Canonical Signthos workspace truth

At canonical `main@43d2f79476190fbbc6cec65959d06c49405065ba`:

- no root `package.json` exists;
- no root lockfile exists;
- no `pnpm-workspace.yaml` or equivalent JavaScript workspace manifest exists;
- `packages/` contains only `packages/prisma`;
- `.npmrc` exists and contains:

```text
legacy-peer-deps = true
prefer-dedupe = true
min-release-age = 7
```

The `.npmrc` is existing imported workspace policy. It is not proof that Signthos has selected npm, pnpm, yarn, or bun as its future package manager.

No 004C1 action may mutate that file.

## 5. Target repository topology consumed as planning evidence

Canonical Foundation architecture describes the target topology:

```text
apps/web/                 # Browser product
packages/providers/       # Provider capability interfaces
packages/editor/          # Shared editor UI
packages/testkit/         # Fixtures/contract tests/golden corpora
```

004C is a provider-entry grain, not a browser-product/UI grain.

Therefore its future reusable provider implementation must not be rooted in `apps/web` merely because the first concrete provider is browser-local.

### 5.1 Future provider package destination

004C1 freezes the **future destination proposal** as:

```text
FUTURE_004C_PROVIDER_PACKAGE_ROOT = packages/providers
FUTURE_004C_BROWSER_MODULE_ROOT = packages/providers/src/pdf/browser
FUTURE_004C_PROVIDER_TEST_ROOT = packages/providers/src/pdf/browser/__tests__
```

This is a planning destination only.

004C1 does not create any of those paths.

Why this destination is preferred:

1. it matches the Foundation target ownership of provider capability interfaces;
2. it keeps the provider reusable by future `apps/web`, desktop webview, tests, and other local surfaces;
3. it prevents 004C engine semantics from becoming hidden product-UI state;
4. it keeps `apps/web` ownership for later product composition rather than PDF-provider internals;
5. it keeps future native/server/heavy provider implementations behind the same semantic package boundary.

A future implementation may refine internal module names if its exact-head review proves a smaller shape, but changing the package root away from `packages/providers` requires fresh architectural authority.

## 6. Root JavaScript workspace remains a separate acquisition concern

Choosing `packages/providers` does not solve how a JavaScript workspace is bootstrapped at repository root.

Canonical Signthos currently has no root package manifest.

A later acquisition grain will therefore need explicit authority for some root workspace control surface.

004C1 does **not** choose or create that surface.

Current state:

```text
ROOT_JS_WORKSPACE_MANIFEST = ABSENT
ROOT_JS_LOCKFILE = ABSENT
ROOT_JS_WORKSPACE_CONFIG = ABSENT
SIGNTHOS_PACKAGE_MANAGER = NOT_YET_CANONICAL
```

### 6.1 Upstream package-manager observation

The selected immutable EmbedPDF source commit has root metadata:

```text
packageManager = pnpm@10.4.0
```

This is useful reproduction evidence for the upstream source snapshot.

It does not make `pnpm@10.4.0` the Signthos package manager.

```text
EMBEDPDF_SOURCE_PACKAGE_MANAGER = pnpm@10.4.0
SIGNTHOS_PACKAGE_MANAGER_SELECTION = DEFERRED_TO_EXACT_ACQUISITION_GRAIN
```

A future Signthos selection must account for:

- deterministic lockfile behavior;
- existing `.npmrc` semantics;
- Node/runtime version support;
- workspace support;
- peer dependency behavior;
- CI reproducibility;
- provenance/SBOM tooling compatibility.

## 7. Selected 004C provider identity remains unchanged

004C1 does not reopen provider selection.

The selected planning candidate remains:

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

No EmbedPDF v3 prerelease, moving branch, cloud provider, or native binding is substituted.

## 8. Initial 004C direct package roles

The 004C planning contract named these capability-facing source packages at version `2.15.0`:

```text
@embedpdf/core
@embedpdf/pdfium
@embedpdf/plugin-document-manager
@embedpdf/plugin-render
@embedpdf/plugin-thumbnail
@embedpdf/plugin-search
@embedpdf/plugin-selection
```

Immutable source inspection proves those package manifests exist at the pinned source revision and declare version `2.15.0` and MIT at the wrapper/package level.

However, this seven-package set is **not** a complete dependency closure.

## 9. Mandatory engine package discovered from source closure

Immutable `packages/core/package.json` declares:

```text
dependencies:
  @embedpdf/engines: workspace:*
  @embedpdf/models: workspace:*
```

The browser provider cannot therefore model `@embedpdf/core` as isolated from `@embedpdf/engines`.

`@embedpdf/engines@2.15.0` is an explicit member of the future candidate closure.

Its pinned source manifest exposes PDFium browser engine entry points including:

```text
./pdfium
./pdfium-direct-engine
./pdfium-worker-engine
```

and declares `@embedpdf/pdfium` plus model/font packages as source-workspace dependencies.

No engine execution is authorized by this observation.

## 10. Source-declared closure for `@embedpdf/engines`

At exact source revision `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed`, `@embedpdf/engines@2.15.0` declares source dependencies:

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

Consequences:

1. font packages are part of the source-declared engine closure even though 004C initially discussed only the PDF engine/plugins;
2. Arabic fallback-font support is directly relevant to the canonical Arabic/RTL corpus family;
3. every font package requires its own exact registry version/integrity/license/file evidence before Signthos adoption;
4. font-license obligations cannot be inferred from the MIT license on `@embedpdf/engines`;
5. the future lockfile/SBOM must preserve the actual resolved font packages rather than hiding them behind the engine wrapper.

Exact registry versions and integrity hashes for these font packages remain unproven by 004C1 unless separately captured from immutable registry metadata.

## 11. Plugin source dependency graph

Pinned source manifests establish these package-level relationships.

### `@embedpdf/plugin-document-manager@2.15.0`

```text
dependencies:
  @embedpdf/models: workspace:*
peerDependencies:
  @embedpdf/core: workspace:*
  react: >=16.8.0
  react-dom: >=16.8.0
  preact: ^10.26.4
  vue: >=3.2.0
  svelte: >=5 <6
```

### `@embedpdf/plugin-render@2.15.0`

```text
dependencies:
  @embedpdf/models: workspace:*
peerDependencies:
  @embedpdf/core: workspace:*
  react: >=16.8.0
  react-dom: >=16.8.0
  preact: ^10.26.4
  vue: >=3.2.0
  svelte: >=5 <6
```

### `@embedpdf/plugin-thumbnail@2.15.0`

```text
dependencies:
  @embedpdf/models: workspace:*
peerDependencies:
  @embedpdf/core: workspace:*
  @embedpdf/plugin-render: workspace:*
  react: >=16.8.0
  react-dom: >=16.8.0
  preact: ^10.26.4
  vue: >=3.2.0
  svelte: >=5 <6
```

The source manifest lists `@embedpdf/plugin-scroll` as a development dependency, not a runtime peer dependency. 004C1 therefore does not promote it to the required runtime closure without additional implementation evidence.

### `@embedpdf/plugin-search@2.15.0`

```text
dependencies:
  @embedpdf/models: workspace:*
peerDependencies:
  @embedpdf/core: workspace:*
  react: >=16.8.0
  react-dom: >=16.8.0
  preact: ^10.26.4
  vue: >=3.2.0
  svelte: >=5 <6
```

### `@embedpdf/plugin-selection@2.15.0`

```text
dependencies:
  @embedpdf/models: workspace:*
  @embedpdf/utils: workspace:*
peerDependencies:
  @embedpdf/core: workspace:*
  @embedpdf/plugin-interaction-manager: workspace:*
  react: >=16.8.0
  react-dom: >=16.8.0
  preact: ^10.26.4
  vue: >=3.2.0
  svelte: >=5 <6
```

Selection therefore adds two package-closure concerns that were absent from the initial seven-package list:

```text
@embedpdf/utils
@embedpdf/plugin-interaction-manager
```

Pinned source metadata proves both source packages are version `2.15.0` and MIT at their package level.

## 12. Provisional source-declared EmbedPDF closure

The minimum **source-declared candidate set** currently visible for the 004C browser provider is:

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

This is **not** an installation list and is not claimed to be the final registry closure.

Reasons it remains provisional:

- source `workspace:*` ranges do not prove exact published dependency ranges;
- registry metadata may add or normalize dependency/peer metadata;
- package-manager peer resolution can introduce additional packages;
- framework peer policy is unresolved;
- tarball file content and integrity are not bound here;
- transitive packages outside the EmbedPDF namespace may appear in exact published metadata.

## 13. Framework peers are not silently adopted

Many pinned EmbedPDF v2 source packages declare broad peers for multiple UI frameworks:

```text
preact = ^10.26.4
react = >=16.8.0
react-dom = >=16.8.0
svelte = >=5 <6
vue = >=3.2.0
```

Signthos Foundation recommends React for the shared editor direction, but 004C itself is a provider package rather than product UI.

004C1 therefore does not install all declared framework peers by implication.

Current disposition:

```text
REACT_PRODUCT_DIRECTION = FOUNDATION_RECOMMENDED
004C_PROVIDER_FRAMEWORK_SURFACE = HEADLESS_BASE_EXPORTS_PREFERRED
PEER_FRAMEWORK_INSTALLATION_SET = UNRESOLVED_UNTIL_EXACT_REGISTRY_AND_BUILD_HARNESS_QUALIFICATION
```

A future acquisition grain must determine whether published package metadata marks any peers optional and how the selected package manager resolves them.

It must not add Vue, Svelte, Preact, React, or React DOM merely because upstream source packages publish framework adapters.

## 14. Public npm page observations

Public npm package pages observed during 004C1 research establish at least:

- `@embedpdf/core` has public version `2.15.0`, package-level MIT metadata, and two dependencies;
- `@embedpdf/pdfium` has public version `2.15.0`, package-level MIT metadata, and publicly describes bundled PDFium WebAssembly under separate licensing;
- `@embedpdf/engines` has public version `2.15.0` and package-level MIT metadata;
- `@embedpdf/models` public metadata exposes version `2.15.0`;
- `@embedpdf/plugin-interaction-manager` public metadata exposes version `2.15.0`, MIT, and a dependency on `@embedpdf/models`.

These observations support package existence/version feasibility only.

They are not complete registry records and do not prove:

```text
dist.integrity
dist.shasum
exact tarball URL binding
exact tarball file list
registry signatures/attestations
published dependency range equality to source workspace metadata
archive byte equality or provenance equivalence to the pinned Git source tree
```

## 15. Registry integrity remains fail-closed

No merge-critical npm `dist.integrity` value is captured as canonical evidence by this grain.

Therefore:

```text
EXACT_NPM_DIST_INTEGRITY = UNPROVEN
EXACT_NPM_DIST_SHASUM = UNPROVEN
EXACT_NPM_TARBALL_BINDING = UNPROVEN
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = UNPROVEN
```

A future acquisition grain must obtain exact immutable registry metadata for **every resolved package**, before or during the authorized deterministic lockfile operation, and bind it into review evidence.

No integrity value may be inferred from Git commits, package versions, package-page existence, or source blob hashes.

## 16. PDFium distribution boundary remains separate

`@embedpdf/pdfium@2.15.0` is an MIT wrapper/package around a bundled PDFium WASM runtime.

Canonical 004B/004C already prohibit wrapper-license inference.

004C1 preserves these separate evidence requirements:

```text
PDFIUM_WRAPPER_LICENSE = MIT_SOURCE_METADATA
PDFIUM_RUNTIME_LICENSE = SEPARATE_DISTRIBUTION_BOUNDARY
PDFIUM_RUNTIME_SOURCE_GITLINK = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
PDFIUM_RUNTIME_WASM_ARCHIVE_DIGEST = UNPROVEN_FOR_SIGNTHOS_ACQUISITION
PDFIUM_BUNDLED_THIRD_PARTY_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
PDFIUM_DISTRIBUTION_SBOM = NOT_YET_BOUND_IN_SIGNTHOS
```

The future acquisition grain must inspect the exact published package contents and bind all required PDFium/third-party notices before Signthos may ship or adopt the runtime.

## 17. Font licensing cannot inherit MIT from `@embedpdf/engines`

The engine source closure includes seven fallback-font packages.

Font binaries and font-package notices are a separate license/distribution boundary.

A future acquisition grain must record, for every resolved font package:

- exact package/version/integrity;
- exact font files shipped;
- exact font license expression/text;
- copyright/attribution obligations;
- whether redistribution inside the Signthos web bundle is permitted under the exact license terms;
- SBOM representation.

004C1 makes no blanket font-license claim.

## 18. Future direct dependency proposal

If a later acquisition grain proves exact registry closure and peer behavior, the proposed **direct** dependencies for the headless 004C browser provider package are:

```text
@embedpdf/core@2.15.0
@embedpdf/engines@2.15.0
@embedpdf/pdfium@2.15.0
@embedpdf/plugin-document-manager@2.15.0
@embedpdf/plugin-render@2.15.0
@embedpdf/plugin-thumbnail@2.15.0
@embedpdf/plugin-search@2.15.0
@embedpdf/plugin-selection@2.15.0
@embedpdf/plugin-interaction-manager@2.15.0
```

Rationale:

- `core` owns the plugin/provider host;
- `engines` exposes the PDFium engine boundary used by core;
- `pdfium` provides the selected browser WASM engine package;
- document manager binds document loading/lifetime;
- render and thumbnail support the two render capabilities;
- search supports `PDF_TEXT_SEARCH_V1`;
- selection supports selection-oriented text observations;
- interaction-manager satisfies the selection plugin's declared peer relationship.

`models`, `utils`, and font packages are expected transitive/source-closure members unless the exact published registry graph proves they must be direct dependencies.

This proposal is not adoption authority.

## 19. Packages explicitly excluded from the 004C1 direct proposal

004C1 does not add these merely because they exist in the upstream monorepo:

- annotation/editing plugins;
- redaction plugins;
- rotate/reorder/page-transform plugins;
- export/print plugins;
- full viewer/snippet packages;
- v3 engine/runtime packages;
- cloud/server packages;
- native PDFium bindings;
- framework-specific viewer packages;
- OCR/conversion providers.

Those belong to later capability/product grains or remain unselected.

## 20. Future manifest surface

A future dependency-acquisition grain may need to create, but 004C1 does not create:

```text
packages/providers/package.json
```

The exact root workspace control files remain unresolved until package-manager qualification.

Possible classes include a root package manifest and package-manager-specific workspace/lockfile files, but **no filename is authorized for mutation merely by this planning artifact**.

The acquisition grain must name every file before mutation.

## 21. Provenance and NOTICE future surface

No provenance/NOTICE file is modified by 004C1.

Before dependency adoption, a future grain must produce or update canonical Signthos-owned evidence for:

- exact npm package identities/versions/integrities;
- exact upstream repository/tag/source commit relationships;
- published archive-to-source gaps or equivalence evidence;
- package-level license metadata;
- PDFium bundled notices;
- font licenses/notices;
- transitive dependency licenses;
- deterministic SBOM representation;
- package-manager lockfile evidence.

Existing provenance machinery from Specification 001 must be reused rather than bypassed.

## 22. No package-manager command is currently authorized

Forbidden in 004C1:

```text
npm install
npm ci
npm pack
npm view that downloads package bytes
pnpm add
pnpm install
yarn add
bun add
corepack mutation
lockfile generation
```

Reading public metadata is allowed; acquiring package archives into Signthos is not.

## 23. Future package-manager selection gate

Before any installation command, the acquisition successor must freeze:

```text
PACKAGE_MANAGER_NAME
PACKAGE_MANAGER_EXACT_VERSION
ROOT_WORKSPACE_MANIFEST_PATHS
LOCKFILE_PATH
WORKSPACE_PACKAGE_PATHS
NODE_RUNTIME_VERSION_RANGE
PEER_DEPENDENCY_POLICY
MIN_RELEASE_AGE_BEHAVIOR
REGISTRY_SOURCE
FROZEN_INSTALL_COMMAND
```

The current `.npmrc` policy must be tested for the selected manager rather than silently assumed equivalent.

## 24. Future registry graph gate

For every resolved package, evidence must capture at minimum:

```text
RegistryPackageEvidence {
  name
  version
  distIntegrity
  distShasum?
  registryTarballIdentity
  dependencies
  optionalDependencies
  peerDependencies
  peerDependenciesMeta?
  engines?
  licenseMetadata
  repositoryMetadata?
  publishedTime?
  deprecationState?
}
```

Any required field that is unavailable or ambiguous is recorded explicitly and reviewed before installation authority.

## 25. Source-to-registry binding gate

For every selected EmbedPDF package, future evidence must distinguish:

```text
PINNED_GIT_SOURCE_METADATA
PUBLISHED_NPM_ARCHIVE_METADATA
```

Version equality is not sufficient to prove byte equality.

At minimum, the later acquisition grain must verify:

- package name/version alignment;
- repository metadata alignment;
- published file surface against intended runtime use;
- no unexpected executable/install scripts;
- exact archive integrity;
- relevant runtime/license files present;
- differences between source workspace metadata and published package metadata documented.

If archive-to-source byte equivalence cannot be proven, that limitation must remain visible and provenance must bind both identities separately.

## 26. Installation-script and supply-chain gate

A future package graph must be inspected for:

- `preinstall`, `install`, and `postinstall` scripts;
- native binary downloads;
- optional platform package downloads;
- registry redirects;
- package deprecation/yank state;
- package provenance/signature metadata where available;
- unexpected network behavior during build/install;
- license changes across the exact resolved closure.

No package is trusted merely because it is under the `@embedpdf` scope.

## 27. Fixture and runtime evidence remain downstream

004C1 does not generate fixture bytes or execute runtime tests.

These remain absent:

```text
004C_FIXTURE_CORPUS_BYTES = ABSENT
004C_FIXTURE_CORPUS_REVISION_DIGEST = ABSENT
004C_RUNTIME_CORPUS_RESULTS = ABSENT
004C_RESOURCE_LIMIT_VALUES = ABSENT
004C_CANCELLATION_EVIDENCE = ABSENT
004C_NO_NETWORK_RUNTIME_EVIDENCE = ABSENT
004C_PERFORMANCE_BASELINE = ABSENT
```

A dependency may not be promoted from acquisition feasibility to qualified 004C runtime merely because installation succeeds.

## 28. Synthetic fixture successor requirement

Canonical 004A allows synthetic/Signthos-authored fixtures only when separately authorized.

A future runtime implementation/evidence plan needs a bounded fixture grain or explicit fixture-generation authority before claiming corpus coverage.

External fixture acquisition remains a separate rights/provenance boundary.

## 29. Read-only and local-only invariants survive acquisition

Any future dependency acquisition must preserve:

```text
PDF_INSPECT_V1 = READ_ONLY / LOCAL_ONLY
PDF_PAGE_RENDER_V1 = READ_ONLY / LOCAL_ONLY
PDF_THUMBNAIL_RENDER_V1 = READ_ONLY / LOCAL_ONLY
PDF_TEXT_EXTRACT_V1 = READ_ONLY / LOCAL_ONLY
PDF_TEXT_SELECT_V1 = READ_ONLY / LOCAL_ONLY
PDF_TEXT_SEARCH_V1 = READ_ONLY / LOCAL_ONLY
```

Dependency convenience cannot authorize:

- remote document fetch fallback;
- provider cloud upload;
- canonical revision mutation;
- active-content execution;
- signature-validity claims;
- hidden repair/save behavior.

## 30. Future acquisition acceptance gates

A future acquisition grain is not merge-qualified unless all applicable gates are proven on its exact head:

1. exact `main` and authority reread;
2. exact package manager/version and workspace files named;
3. exact direct dependencies named;
4. exact full resolved graph recorded;
5. exact registry integrities recorded;
6. peer dependency policy proven;
7. package archive/source relationship characterized;
8. no unexpected install scripts or download hooks are unreviewed;
9. PDFium runtime license/NOTICE obligations bound;
10. font licenses/notices bound;
11. provenance/SBOM plan matches actual resolved graph;
12. frozen deterministic install/lockfile command defined;
13. no runtime execution occurs unless separately authorized;
14. exact changed surface contains only authorized package/workspace/provenance/notice files;
15. focused validation and `git diff --check` pass;
16. applicable CI/check state is truthful;
17. independent substantive exact-head review reports no unresolved material finding;
18. review threads are resolved;
19. mandatory premerge proof is recorded;
20. guarded merge uses exact reviewed head;
21. post-merge tree/parents/signature/surface/check state is verified;
22. fresh successor reconciliation occurs before runtime implementation.

## 31. 004C1 deterministic adversarial cases

### A. Seven-package-list undercounts core closure

Given the initial 004C package list,
when `@embedpdf/core` immutable source metadata is inspected,
then `@embedpdf/engines` and `@embedpdf/models` are discovered and the seven-package list must not be represented as complete.

### B. Engines hide font redistribution surface

Given `@embedpdf/engines`,
when its immutable source dependencies are inspected,
then all seven font packages are recorded as separate license/distribution evidence subjects rather than inheriting the engine's MIT metadata.

### C. Selection adds peer closure

Given `@embedpdf/plugin-selection`,
when its immutable source manifest is inspected,
then `@embedpdf/utils` and `@embedpdf/plugin-interaction-manager` are surfaced and the latter's peer requirement cannot be ignored.

### D. Source workspace range is not registry integrity

Given `workspace:*` in pinned source,
when planning an npm acquisition,
then no `dist.integrity`, exact published dependency range, or tarball identity may be inferred from that string.

### E. Wrapper MIT does not license PDFium bundle completely

Given `@embedpdf/pdfium` package-level MIT metadata,
when distribution obligations are assessed,
then bundled PDFium and third-party notices remain a separate gate.

### F. Framework peers do not become automatic product dependencies

Given source peer declarations for React, Preact, Vue, and Svelte,
when defining the 004C headless provider dependency set,
then no framework is added solely because its peer range appears in upstream source metadata.

### G. Product app is not provider package

Given Foundation `apps/web` and `packages/providers` ownership,
when choosing the 004C implementation destination,
then provider engine/adapters remain under the provider package boundary rather than being hidden in the browser app.

### H. Install success is not runtime qualification

Given a future deterministic dependency installation,
when the package graph resolves successfully,
then no 004C capability is considered functionally/security/performance qualified without its separate corpus/runtime evidence grain.

## 32. 004C1 completion state

This candidate establishes the following planning result:

```text
FUTURE_004C_PROVIDER_PACKAGE_ROOT = packages/providers
FUTURE_004C_BROWSER_MODULE_ROOT = packages/providers/src/pdf/browser
CURRENT_ROOT_JS_WORKSPACE = ABSENT
SIGNTHOS_PACKAGE_MANAGER = NOT_YET_CANONICAL
EMBEDPDF_SOURCE_PACKAGE_MANAGER = pnpm@10.4.0
004C_INITIAL_SEVEN_PACKAGE_SET = INCOMPLETE_AS_CLOSURE
004C_SOURCE_DECLARED_EMBEDPDF_CLOSURE = QUALIFIED_PROVISIONALLY
004C_DIRECT_DEPENDENCY_PROPOSAL = QUALIFIED_FOR_FUTURE_ACQUISITION_REVIEW_ONLY
EXACT_NPM_DIST_INTEGRITY = UNPROVEN
EXACT_NPM_TARBALL_BINDING = UNPROVEN
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = UNPROVEN
PDFIUM_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
FONT_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
DEPENDENCY_ADOPTION = NONE
DEPENDENCY_INSTALLATION = NONE
RUNTIME_EXECUTION = NONE
```

## 33. Successor handoff — fail closed

Canonicalization of 004C1 must not automatically authorize dependency acquisition or runtime implementation.

A fresh post-merge reconciliation may derive another bounded successor only from live truth.

Expected next unresolved decisions include:

```text
EXACT_SIGNTHOS_PACKAGE_MANAGER = UNRESOLVED
EXACT_ROOT_WORKSPACE_CONTROL_SURFACE = UNRESOLVED
EXACT_REGISTRY_METADATA_AND_INTEGRITIES = UNPROVEN
EXACT_PEER_RESOLUTION = UNPROVEN
PDFIUM_AND_FONT_NOTICE_BINDING = UNPROVEN
PROVENANCE_SBOM_MUTATION_AUTHORITY = ABSENT
PACKAGE_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C_FIXTURE_GENERATION_AUTHORITY = ABSENT
004C_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

A likely successor class is a separately authorized exact dependency-acquisition/bootstrap grain, followed by a separately authorized synthetic-fixture/runtime-evidence implementation grain. Neither successor is authorized by this file or by its task ordering.

## 34. Explicit non-claims

004C1 does not claim:

- that `packages/providers` exists today;
- that pnpm is canonically selected for Signthos;
- that any npm `dist.integrity` was verified;
- that published npm archives are byte-equivalent to pinned Git source;
- that the source-declared closure is identical to the future resolved lockfile graph;
- that all peer frameworks are required or optional in published registry metadata;
- that PDFium/font distribution obligations are complete;
- that any dependency is safe, vulnerability-free, installed, adopted, or executable;
- that any PDF fixture exists;
- that any 004C runtime capability has passed functional, security, no-network, resource, cancellation, Arabic/RTL, render, extraction, or performance tests;
- that 004D or Specification 005 is authorized.

## 35. Review requirement

Before 004C1 may become canonical, the exact final head must receive fresh independent substantive review that rechecks:

- Issue #7 authority `5562814547`;
- exact canonical base `43d2f79476190fbbc6cec65959d06c49405065ba`;
- current Signthos workspace truth;
- Foundation provider/package ownership;
- pinned EmbedPDF v2.15.0 source manifests and dependency/peer relationships;
- distinction between source-workspace metadata and registry evidence;
- public npm observations without inflated integrity claims;
- PDFium and font licensing/NOTICE boundaries;
- future direct dependency proposal versus transitive/provisional closure;
- explicit no-install/no-runtime authority;
- 004D and Specification 005 remaining unauthorized;
- `git diff --check` and exact changed surface.

Every material finding must be repaired forward-only. Any changed head requires a fresh exact-head substantive review.