# Specification 004C1A — Exact Registry, Package-Manager, and Bootstrap Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_DISCOVERY_ONLY / ZERO_DEPENDENCY_BYTES / NO_BOOTSTRAP_AUTHORITY`
Issue: #7
Canonical base: `9fea450217f50918cea57ac114642a8a8cafa050`
Canonical predecessor: Specification 004C1 / PR #104
Pinned provider source: `embedpdf/embed-pdf-viewer@2cf7df3b594dfe46de2d85e6973ff50ea447a1ed` (`v2.15.0`)

## Purpose

Execute only the bounded successor authorized by Issue #7 comment `5563205089`:

```text
004C1A_EXACT_REGISTRY_PACKAGE_MANAGER_BOOTSTRAP_QUALIFICATION
```

This unit tightens the future browser-provider dependency boundary without creating a JavaScript workspace, installing dependencies, importing package archives, executing lifecycle scripts, running PDF/provider code, acquiring fixtures, or mutating provenance, NOTICE, or SBOM records.

The unit has four jobs:

1. replace provisional source-workspace dependency assumptions with exact published-package observations wherever current evidence can support them;
2. select an exact future package-manager candidate and a fail-closed package-resolution policy;
3. freeze the smallest future root/provider workspace control surface without creating those files;
4. identify every remaining evidence blocker that must stay closed before dependency acquisition or runtime work.

This is engineering provenance and repository-governance analysis, not legal advice.

## Authority and hard limits

Canonical Issue #7 authority is planning/discovery only. The following remain absent:

```text
004C1A_IMPLEMENTATION_AUTHORITY = ABSENT
004C1A_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1A_DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
004C1A_PACKAGE_ARCHIVE_DOWNLOAD_IMPORT_AUTHORITY = ABSENT
004C1A_PACKAGE_MANIFEST_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1A_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1A_SOURCE_OR_BINARY_IMPORT_AUTHORITY = ABSENT
004C1A_EXTERNAL_FIXTURE_ACQUISITION_AUTHORITY = ABSENT
004C1A_FIXTURE_GENERATION_AUTHORITY = ABSENT
004C1A_PROVIDER_RUNTIME_EXECUTION_AUTHORITY = ABSENT
004C1A_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004C1B_BOOTSTRAP_ACQUISITION_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2_RUNTIME_IMPLEMENTATION_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

No command in this document is execution authority.

## Canonical predecessor truth

PR #104 made the corrected 004C1 planning boundary canonical:

```text
CANONICAL_MAIN = 9fea450217f50918cea57ac114642a8a8cafa050
004C1_REVIEWED_HEAD = bbd1a5bad30084d0446384db22bac6562d0f8689
004C1_REVIEWED_HEAD_TREE = fceda1a1d5c056c98becdbcabc4d331509a89402
004C1_REVIEW = github:issue-comment:5563149443
004C1_REVIEW_RESULT = NO_MATERIAL_FINDINGS
004C1_MERGE = 9fea450217f50918cea57ac114642a8a8cafa050
004C1_MERGE_TREE = fceda1a1d5c056c98becdbcabc4d331509a89402
004C1_TREE_EQUALITY = PASS
004C1_MERGE_SIGNATURE = VERIFIED_VALID
004C1_POSTMERGE_ACTIONS = NO_APPLICABLE_RUN
004C1_POSTMERGE_STATUSES = NO_APPLICABLE_STATUS
```

004C1 also proved a material `LOCAL_ONLY` correction against the exact pinned EmbedPDF worker implementation:

```text
PDFIUM_WASM_SOURCE = EXACT_LOCAL_OR_APPLICATION_BUNDLED_ASSET
PDFIUM_WASM_EXTERNAL_CDN = FORBIDDEN
FONT_FALLBACK_MODE = EXPLICITLY_DISABLED_OR_EXACT_LOCAL_ASSETS
FONT_FALLBACK_EXTERNAL_CDN = FORBIDDEN
MOVING_FONT_VERSION_SELECTOR = FORBIDDEN
UNEXPECTED_DOCUMENT_PROCESSING_NETWORK = FAIL
NO_NETWORK_EVIDENCE = REQUIRED
```

004C1 did not acquire the WASM or font bytes and did not establish their complete distribution notice set.

## Current Signthos JavaScript workspace truth

At the canonical base:

- no root `package.json` exists;
- no root `pnpm-workspace.yaml` exists;
- no root `pnpm-lock.yaml` exists;
- no root `package-lock.json` exists;
- no canonical JavaScript package manager is selected;
- `packages/providers/` does not exist;
- the imported root `.npmrc` exists with:

```text
legacy-peer-deps = true
prefer-dedupe = true
min-release-age = 7
```

Those settings are existing policy evidence, not proof that npm is the selected package manager.

## Evidence model and registry limitation

The current evidence harness could read npmjs.com package pages, exact pinned upstream manifests, immutable GitHub release metadata, and independent npm lockfiles. It could not directly retrieve the raw `registry.npmjs.org/<package>/<version>` version documents in a way that provides a first-party version-document snapshot.

Therefore this qualification keeps two evidence classes separate:

```text
NPMJS_PUBLIC_VERSION_VISIBILITY = OBSERVED
INDEPENDENT_NPM_LOCKFILE_RESOLVED_TARBALL_AND_SRI = CORROBORATED
RAW_REGISTRY_VERSION_DOCUMENT = NOT_CAPTURED
RAW_REGISTRY_DIST_SHASUM = UNPROVEN
RAW_REGISTRY_VERSION_DOCUMENT_TO_TARBALL_BINDING = UNPROVEN
PACKAGE_ARCHIVE_TO_PINNED_GIT_SOURCE_EQUIVALENCE = UNPROVEN
```

Two independent npm lockfiles were inspected at immutable Git commits:

- `Divnoorheer/Scribble-Notes@0fb228d165d239e96f5bc515b21aaaabb2429d3f` / `package-lock.json`;
- `edalcin/newPdfDing@cee8f78aacdcae894abb8d5f4c52e396133cd1dd` / `frontend/package-lock.json`.

For overlapping EmbedPDF entries they agree on version, npm tarball URL, SRI integrity, license metadata, core/engine dependencies, and the seven `1.0.0` font package identities. This is strong corroborating installation evidence, but it is not promoted to a raw-registry attestation.

## Published closure correction

Pinned source manifests use `workspace:*`, so source-manifest version placeholders are not registry resolution truth. Independent npm lockfiles establish a narrower published closure than the provisional 004C1 list.

### Exact 2.15.0 package identities

The following package identities are corroborated at `2.15.0`:

| Package | Corroborated npm tarball | Corroborated SRI | License metadata |
| --- | --- | --- | --- |
| `@embedpdf/core` | `https://registry.npmjs.org/@embedpdf/core/-/core-2.15.0.tgz` | `sha512-0yaPCgvbE5/cBf+5rHBUsRUm8i6hSl894xjC19HTOmb8DqrhxOxbOQSyjiTbJTQK52zZrNL79SigsPgGHPrYWA==` | MIT |
| `@embedpdf/engines` | `https://registry.npmjs.org/@embedpdf/engines/-/engines-2.15.0.tgz` | `sha512-fW5UoqpDRkAWDbGMl3y6ril3l2qXzoYz+klt4O2P8gWzYzhG3fmr0L2+qzjD+BPO+QfYMNNvmBI+teT/nYjm/g==` | MIT |
| `@embedpdf/models` | `https://registry.npmjs.org/@embedpdf/models/-/models-2.15.0.tgz` | `sha512-gHr+hAN094kmzCB+6J2zaiHS8o4tKeY0IfTOxVEGwqntgKk8LCWD3s+P7dlVY3V8XUVmdyFWhFt7zwm0uw+VMg==` | MIT |
| `@embedpdf/pdfium` | `https://registry.npmjs.org/@embedpdf/pdfium/-/pdfium-2.15.0.tgz` | `sha512-KgpRND2MYcdbhzb2EMb4WzWcJYrR0A6JXvhMv4WthEHKt6qmNo2v/MC68bpYvpveYT9GNnUnY/+TG5MpXY3pRw==` | MIT package metadata only |
| `@embedpdf/plugin-document-manager` | `https://registry.npmjs.org/@embedpdf/plugin-document-manager/-/plugin-document-manager-2.15.0.tgz` | `sha512-M8EwOuonICSHfOklTMwk0XfyPhG9v9EMDRU9Pvz0zAe1DJzUPtIxUh+CgxtFSSnUeKSfxE7JpTRryrbUW0XcGg==` | MIT |
| `@embedpdf/plugin-render` | `https://registry.npmjs.org/@embedpdf/plugin-render/-/plugin-render-2.15.0.tgz` | `sha512-EVfn8XsdU10VgrSs9qKo8nqjfUyt2/NWFJtlW3nX4sZ74Pi9xSvEa7/B99/LYZZMa0ENzi+4HKAXiQ6NUXisDg==` | MIT |
| `@embedpdf/plugin-thumbnail` | `https://registry.npmjs.org/@embedpdf/plugin-thumbnail/-/plugin-thumbnail-2.15.0.tgz` | `sha512-39EojqobHmvSvk2ejKeh58m43ApGS3cie/sVZP+pkXr6MRogX6+ivMa5GfoqBzh9wdZAZ3l4XTd+RQ4kFZ4aqQ==` | MIT |
| `@embedpdf/plugin-search` | `https://registry.npmjs.org/@embedpdf/plugin-search/-/plugin-search-2.15.0.tgz` | `sha512-mMzy8uo3xvDMjSc+xuBMgdI/mmmpgbZ6xKTmNxpF0d8BcaWu6Zp9a4ewamfjBwg8WF/qUW49U6HYZsiRr3NUEQ==` | MIT |
| `@embedpdf/plugin-selection` | `https://registry.npmjs.org/@embedpdf/plugin-selection/-/plugin-selection-2.15.0.tgz` | `sha512-iEnhx0jeQrbze7WHkHhZtF21yfGBuqF2B+V2efLHT2O0a2fnof+PEVaQQRgERSfrwRvLvyEJL9ud54E41ahsRQ==` | MIT |
| `@embedpdf/plugin-interaction-manager` | `https://registry.npmjs.org/@embedpdf/plugin-interaction-manager/-/plugin-interaction-manager-2.15.0.tgz` | `sha512-YCMvTvu4Fm1KNuEhj+CftzG+T6F1+/QhI7eaYft9Lp5xm3CYSXdR3pNfGwNFy5XkDUDwB1IscLTiU0q75viMCw==` | MIT |
| `@embedpdf/utils` | `https://registry.npmjs.org/@embedpdf/utils/-/utils-2.15.0.tgz` | `sha512-13UEMPpu5XrxmYI/MPiLtJC3R3b1g8ii3zfhQ3g1WpECybnwTuhBgwqaOvqw3rVCKCnXEgNMs4PBCzLyFpZZTw==` | MIT |

### Exact font package identities

A material correction from 004C1 is that `@embedpdf/engines@2.15.0` resolves the fallback-font packages at `1.0.0`, not `2.15.0`:

| Package | Version | Corroborated SRI | License metadata |
| --- | --- | --- | --- |
| `@embedpdf/fonts-arabic` | `1.0.0` | `sha512-SnGvQb+LwPZQO2WjjvlmXrJZolJUfLYbLZQSaYUw1vrQyMyJKT4LewvJGG+hZ+Yz2fz7OMIQ+4Gc98mGODZtOg==` | OFL-1.1 |
| `@embedpdf/fonts-hebrew` | `1.0.0` | `sha512-5HVAKGL7VqPeTxxADDrSqAFBxfmAXdP8fIqrPwJIKkqdK2643bOer8CqnnpO3/nPoFhkzxhttWMB9BGiqSW62w==` | OFL-1.1 |
| `@embedpdf/fonts-jp` | `1.0.0` | `sha512-BY2tv/mcICUUKf+M/bizf3RU65PMqKClJ/e5o9mgMibxyML0OQvEDwYMRPODQkKgJKXCO3ScHmVvcmXp6kt+fA==` | OFL-1.1 |
| `@embedpdf/fonts-kr` | `1.0.0` | `sha512-bh88HXSvOBS581kgmihWY7Ijp9hBsvlmXogFG5LSNx9UBAobRcakZiFMGieRBc06hUSkpo7WhjaFM/z/SfQ8dQ==` | OFL-1.1 |
| `@embedpdf/fonts-latin` | `1.0.0` | `sha512-LLYysdr8O6sRNzhmW3PbF3AeA8xnqvOi4XLFfIfNlW5uEZ+qsJdcfd78Q78sFJMhlaOAYFMziMMsnOzmx463rA==` | OFL-1.1 |
| `@embedpdf/fonts-sc` | `1.0.0` | `sha512-ETXl7XCwaQLSSvMO3EUDwMNqtL64kX2LlFxarTRi/NsIGGOIxUurGfKtrkmtnKHrWy1jAJSt6oxK2uJhvdvQIw==` | OFL-1.1 |
| `@embedpdf/fonts-tc` | `1.0.0` | `sha512-rGZJbVD6DYS5BbXdpEMnWkpVF0Knar+bsiyb2o3+YRx7O8eyFubEBQUSUInirQk69HA6fc3GhYCg7TyC/oD76Q==` | OFL-1.1 |

The font package identities are dependency-closure evidence only. Canonical 004C1 requires font fallback to be explicitly disabled or supplied only from exact local assets. Merely installing these packages does not authorize loading their bytes at runtime.

### Published dependency relationships

The corroborated lockfiles and exact pinned manifests agree on these relevant relationships:

```text
@embedpdf/core@2.15.0
  -> @embedpdf/engines@2.15.0
  -> @embedpdf/models@2.15.0

@embedpdf/engines@2.15.0
  -> @embedpdf/models@2.15.0
  -> @embedpdf/pdfium@2.15.0
  -> seven @embedpdf/fonts-*@1.0.0 packages

@embedpdf/plugin-selection@2.15.0
  -> @embedpdf/models@2.15.0
  -> @embedpdf/utils@2.15.0
  peer -> @embedpdf/core@2.15.0
  peer -> @embedpdf/plugin-interaction-manager@2.15.0

@embedpdf/plugin-interaction-manager@2.15.0
  -> @embedpdf/models@2.15.0
```

The other selected headless plugins have no evidence of an external non-EmbedPDF runtime dependency beyond the already selected internal closure.

Therefore the current exact package identity set is:

```text
EMBEDPDF_2_15_0_PACKAGES = 11
EMBEDPDF_FONT_1_0_0_PACKAGES = 7
TOTAL_EMBEDPDF_PACKAGE_IDENTITIES = 18
UNQUALIFIED_NON_EMBEDPDF_RUNTIME_DEPENDENCIES = 0_OBSERVED
```

This count is a metadata qualification result, not an installation or runtime result.

## Framework peer boundary

Exact pinned package manifests for `@embedpdf/core`, `@embedpdf/utils`, and the selected plugins declare broad framework peers such as:

```text
preact = ^10.26.4
react = >=16.8.0
react-dom = >=16.8.0
svelte = >=5 <6
vue = >=3.2.0
```

The inspected pinned manifests do not declare these peers optional with `peerDependenciesMeta`. The package exports nevertheless expose a base `.` entry separately from framework-specific `./react`, `./preact`, `./vue`, and `./svelte` entry points.

Signthos 004C is a headless provider boundary. No canonical requirement exists for React, React DOM, Preact, Vue, or Svelte in the provider package.

Therefore:

```text
FRAMEWORK_ADAPTER_IMPORTS = FORBIDDEN_IN_004C_HEADLESS_PROVIDER
REACT_ADOPTION = NOT_AUTHORIZED
REACT_DOM_ADOPTION = NOT_AUTHORIZED
PREACT_ADOPTION = NOT_AUTHORIZED
VUE_ADOPTION = NOT_AUTHORIZED
SVELTE_ADOPTION = NOT_AUTHORIZED
INTERNAL_EMBEDPDF_PEERS = MUST_RESOLVE_EXACTLY
FRAMEWORK_PEERS = INTENTIONALLY_UNSATISFIED_FOR_BASE_ENTRYPOINT_ONLY
```

A package manager must not silently auto-install those framework peers.

## Package-manager selection

### Why upstream `pnpm@10.4.0` is not selected

Pinned EmbedPDF source records `pnpm@10.4.0`. That is useful reproduction evidence, but it predates several pnpm v10 supply-chain controls needed by this bootstrap policy. In particular, pnpm v10 documentation records:

- `minimumReleaseAge` added in `v10.16.0`;
- exact-version `onlyBuiltDependencies` matching added in `v10.19.0`;
- `trustPolicy` added in `v10.21.0`;
- `blockExoticSubdeps` and `allowBuilds` added in `v10.26.0`.

Promoting `10.4.0` merely because the donor source used it would lose controls required by Signthos.

### Why npm is not the preferred bootstrap candidate

npm `11.19.1` is a valid exact package-manager candidate and its official documentation supports workspaces, root `package-lock.json`, `min-release-age`, `prefer-dedupe`, and install-script controls. However, the canonical imported `.npmrc` currently sets:

```text
legacy-peer-deps = true
```

npm documents that setting as completely ignoring peer dependencies and explicitly says its use is not recommended because meta-dependencies may rely on their peer contracts. That is too broad for this provider: Signthos needs exact internal EmbedPDF peers while intentionally excluding only unrelated framework adapters.

Using CLI overrides could narrow the behavior, but selecting a package manager whose canonical root config immediately needs a semantic override is less deterministic than using an explicit workspace policy with narrow peer exceptions.

### Selected planning candidate: pnpm 10.33.4

The exact future package-manager candidate is:

```text
SIGNTHOS_PACKAGE_MANAGER_CANDIDATE = pnpm@10.33.4
PACKAGE_MANAGER_MAJOR = 10
PACKAGE_MANAGER_RELEASE = IMMUTABLE_NON_PRERELEASE_GITHUB_RELEASE
PACKAGE_MANAGER_RELEASE_DATE = 2026-05-06
PACKAGE_MANAGER_ADOPTION_AUTHORITY = ABSENT
```

`pnpm/pnpm` release `v10.33.4` is an immutable non-prerelease GitHub release and publishes standalone platform assets with SHA-256 digests. This qualification does not download those assets or select a host-specific binary.

pnpm v10 documentation states that a Node-backed installation requires Node.js at least `18.12`, while the v10 compatibility table supports Node 18, 20, 22, and 24. Standalone pnpm binaries can run without a preinstalled Node runtime. No exact Signthos application Node runtime is selected by this planning unit.

```text
PNPM_10_NODE_BACKED_MINIMUM = >=18.12
PNPM_10_SUPPORTED_NODE_MAJORS_OBSERVED = 18,20,22,24
EXACT_SIGNTHOS_NODE_RUNTIME = DEFERRED
PACKAGE_MANAGER_BINARY_ACQUISITION_METHOD = DEFERRED
```

## Future workspace control surface

If and only if a later independently authorized bootstrap/acquisition grain is derived, the smallest proposed JavaScript workspace control surface is exactly:

```text
/package.json
/pnpm-workspace.yaml
/pnpm-lock.yaml
/packages/providers/package.json
```

The existing root `.npmrc` remains unchanged by default. It is not counted as a new bootstrap file.

No separate root TypeScript config, Vite config, test config, workflow, container, source file, generated provenance file, or runtime asset is required merely to establish package acquisition.

### Proposed root `package.json` semantics

Future independently authored semantics should be limited to:

```text
private = true
packageManager = pnpm@10.33.4
workspaces are represented by pnpm-workspace.yaml, not broad npm workspace mutation
no lifecycle scripts required for acquisition
no runtime dependencies at repository root
```

### Proposed `pnpm-workspace.yaml` semantics

A future authorized bootstrap should express a narrow workspace and fail-closed dependency policy equivalent to:

```yaml
packages:
  - packages/providers

minimumReleaseAge: 10080
blockExoticSubdeps: true
autoInstallPeers: false
strictPeerDependencies: true
peerDependencyRules:
  ignoreMissing:
    - react
    - react-dom
    - preact
    - vue
    - svelte
onlyBuiltDependencies: []
```

Meaning:

- `10080` minutes preserves the existing seven-day release-age intent;
- transitive git/direct-tarball dependencies fail closed;
- framework peers are not auto-installed;
- missing/invalid peers fail except the explicitly enumerated unused framework adapters;
- selected EmbedPDF internal peers must resolve exactly;
- dependency lifecycle scripts are not permitted during initial acquisition.

The exact future syntax must be validated against the exact selected pnpm executable before canonical bootstrap. This document does not create this YAML file.

### Proposed provider package dependency semantics

A future `packages/providers/package.json` should use exact versions, not ranges and not moving tags.

Direct dependency candidates remain exactly:

```text
@embedpdf/core = 2.15.0
@embedpdf/engines = 2.15.0
@embedpdf/pdfium = 2.15.0
@embedpdf/plugin-document-manager = 2.15.0
@embedpdf/plugin-render = 2.15.0
@embedpdf/plugin-thumbnail = 2.15.0
@embedpdf/plugin-search = 2.15.0
@embedpdf/plugin-selection = 2.15.0
@embedpdf/plugin-interaction-manager = 2.15.0
```

`@embedpdf/models`, `@embedpdf/utils`, and the seven font packages are transitive closure members and should not be promoted to direct dependencies unless later runtime source demonstrates a direct import requirement.

```text
DIRECT_PROVIDER_DEPENDENCIES = 9
TRANSITIVE_CLOSURE_IDENTITIES = 9
TOTAL_QUALIFIED_IDENTITIES = 18
VERSION_RANGE_PREFIXES = FORBIDDEN
DIST_TAGS = FORBIDDEN
GIT_DEPENDENCIES = FORBIDDEN
DIRECT_TARBALL_DEPENDENCIES = FORBIDDEN
```

## Lifecycle-script and supply-chain policy

Initial package acquisition must be metadata/lockfile oriented and fail closed on code execution.

pnpm v10 documents that dependency lifecycle scripts are not executed unless admitted through the build-dependency policy. The future bootstrap must begin with an empty allowlist:

```text
DEPENDENCY_INSTALL_SCRIPT_ALLOWLIST = EMPTY
PREINSTALL_EXECUTION = FORBIDDEN
INSTALL_EXECUTION = FORBIDDEN
POSTINSTALL_EXECUTION = FORBIDDEN
PREPARE_EXECUTION_FROM_NON_REGISTRY_SOURCE = FORBIDDEN
```

If later runtime proof demonstrates that a particular exact dependency requires a build script, that package/version must be separately reviewed and explicitly authorized before changing this policy.

## PDFium and font distribution boundary

Package-level metadata does not prove the complete redistribution obligations of embedded PDFium WASM or font files.

Current state remains:

```text
@embedpdf/pdfium_PACKAGE_METADATA_LICENSE = MIT
PDFIUM_WASM_COMPLETE_NOTICE_BINDING = UNPROVEN
PDFIUM_WASM_EXACT_RUNTIME_ASSET_DIGEST = UNPROVEN
FONT_PACKAGE_METADATA_LICENSE = OFL-1.1
FONT_FILE_COMPLETE_NOTICE_BINDING = UNPROVEN
FONT_RUNTIME_ASSET_SELECTION = NOT_AUTHORIZED
FONT_CDN_RUNTIME = FORBIDDEN
PDFIUM_CDN_RUNTIME = FORBIDDEN
```

A future bootstrap/acquisition grain must not treat `license: MIT` on the wrapper package as sufficient evidence for every bundled third-party binary component.

## Provenance, NOTICE, and SBOM future requirements

Before any dependency archive or runtime asset becomes canonical Signthos content, a separately authorized grain must record at least:

- exact package name and version;
- exact registry tarball identity and SRI from a first-party registry version document or equivalent independently admissible registry proof;
- exact package archive digest after acquisition;
- package repository/source linkage and whether archive-to-source equivalence was proven;
- package license metadata and actual distributed license/notice files;
- PDFium WASM origin, version/build identity, digest, and complete third-party notices;
- each locally admitted font file's package/file identity, digest, OFL notice, reserved-font-name obligations if any, and runtime loading path;
- lockfile identity and package-manager identity;
- SBOM component entries for package and separately distributed runtime assets;
- CVE/advisory snapshot appropriate to the exact acquired components;
- explicit confirmation that no remote CDN URL remains reachable from the provider's document-processing path.

No provenance, NOTICE, or SBOM file is mutated by 004C1A.

## Remaining evidence blockers

This unit resolves the provisional package/version closure and selects a precise package-manager/workspace policy, but it intentionally does not claim acquisition readiness while these remain open:

```text
RAW_NPM_REGISTRY_VERSION_DOCUMENT_CAPTURE = UNPROVEN
RAW_NPM_DIST_SHASUM = UNPROVEN
ARCHIVE_TO_PINNED_GIT_SOURCE_EQUIVALENCE = UNPROVEN
PACKAGE_ARCHIVE_BYTES = NOT_ACQUIRED
PACKAGE_ARCHIVE_DIGEST_AFTER_ACQUISITION = UNPROVEN
PNPM_10_33_4_HOST_BINARY_SELECTION = DEFERRED
EXACT_SIGNTHOS_NODE_RUNTIME = DEFERRED
PDFIUM_WASM_ASSET_IDENTITY_AND_DIGEST = UNPROVEN
PDFIUM_COMPLETE_REDISTRIBUTION_NOTICES = UNPROVEN
FONT_FILE_RUNTIME_ALLOWLIST_AND_DIGESTS = UNPROVEN
FONT_COMPLETE_REDISTRIBUTION_NOTICES = UNPROVEN
LOCKFILE_GENERATION = NOT_AUTHORIZED
PROVENANCE_NOTICE_SBOM_MUTATION = NOT_AUTHORIZED
RUNTIME_CORPUS_NO_NETWORK_RESOURCE_CANCELLATION_EVIDENCE = ABSENT
```

None of these may be converted into PASS by inference from package metadata alone.

## Adversarial acceptance cases for this qualification

004C1A is only correct if all of the following hold:

1. source `workspace:*` declarations are not presented as published version truth;
2. font packages are recorded at the observed published `1.0.0`, not mechanically aligned to EmbedPDF `2.15.0`;
3. npm lockfile SRI values are labeled corroborating evidence rather than raw registry attestations;
4. framework peers are not silently added to the headless provider;
5. internal EmbedPDF peer relationships are not globally ignored;
6. no moving `latest`, caret, tilde, git, or direct-tarball dependency selector enters the proposed provider manifest;
7. package-manager selection is exact and stable, not `latest` or a major-only selector;
8. dependency lifecycle scripts remain blocked during initial acquisition;
9. existing `legacy-peer-deps=true` is not used as evidence that peer contracts are safe to ignore;
10. no CDN-based PDFium or font fallback is reintroduced;
11. wrapper MIT metadata is not treated as complete PDFium redistribution evidence;
12. OFL package metadata is not treated as complete per-font runtime notice evidence;
13. no package archive, dependency, lockfile, manifest, runtime source, workflow, fixture, provenance file, NOTICE, or SBOM is created by this planning unit;
14. 004C1B, 004C2, 004D, and Specification 005 remain unauthorized until fresh post-merge reconciliation.

## Qualification result

```text
004C1A_PACKAGE_IDENTITY_CLOSURE = QUALIFIED_AS_18_IDENTITIES
004C1A_FONT_VERSION_CORRECTION = QUALIFIED_1_0_0
004C1A_HEADLESS_FRAMEWORK_PEER_POLICY = QUALIFIED_EXPLICIT_OMISSION_ONLY
004C1A_INTERNAL_PEER_POLICY = QUALIFIED_EXACT_RESOLUTION_REQUIRED
004C1A_PACKAGE_MANAGER_CANDIDATE = pnpm@10.33.4
004C1A_FUTURE_WORKSPACE_CONTROL_SURFACE = 4_FILES
004C1A_INITIAL_DEPENDENCY_BUILD_SCRIPT_ALLOWLIST = EMPTY
004C1A_REMOTE_CDN_POLICY = FORBIDDEN
004C1A_LOCKFILE_CORROBORATED_SRI = PRESENT
004C1A_RAW_REGISTRY_VERSION_DOCUMENT_PROOF = ABSENT
004C1A_BOOTSTRAP_ACQUISITION_AUTHORITY = ABSENT
004C1A_RUNTIME_AUTHORITY = ABSENT
```

The exact published identity graph and future package-manager/workspace policy are now bounded tightly enough for independent review. A later bootstrap/acquisition successor is not self-authorized by this result.

## Diffciplane gate

Before this planning artifact can become canonical:

- the exact PR head must remain one bounded Signthos-authored planning file on the canonical 004C1 base;
- `git diff --check` or equivalent exact-range validation must be clean;
- any applicable repository checks must be accounted for without converting `NO_APPLICABLE_RUN` into PASS;
- an independent substantive reviewer must inspect the exact head, especially the package version/SRI table, the `1.0.0` font correction, peer omission policy, pnpm version choice, script policy, raw-registry evidence limitation, and no-authority claims;
- every material finding must be repaired forward-only and reviewed again on the new exact head;
- unresolved review conversations must be zero;
- merge must use exact-head protection;
- post-merge parent/tree/signature/surface/check evidence must be verified;
- Issue #7 must be reread fresh before deriving any bootstrap/acquisition successor.

## Successor handoff

If this exact unit independently qualifies and becomes canonical, fresh reconciliation may consider a separately bounded successor whose purpose is to close the still-unproven first-party registry and distribution evidence and, only if all gates permit, create the minimum workspace/lockfile acquisition surface.

Until that fresh reconciliation occurs:

```text
004C1B_BOOTSTRAP_ACQUISITION_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2_RUNTIME_IMPLEMENTATION_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```
