# Specification 004C1J — Peer, Optional, and Framework Metadata Qualification

Status: `QUALIFICATION_CANDIDATE / PINNED_SOURCE_AND_PUBLIC_METADATA_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `8e985866a50c734e4f9c32b1f12b5054e5c5807e`
Authority source: `github:issue-comment:5573430750`

## 1. Purpose and authority boundary

004C1J closes the next bounded evidence gap left explicit by canonical 004C1I: peer, optional, and framework metadata for the same selected 004C browser-provider candidate surface.

This grain is evidence-only. It does not select or execute a package manager or resolver and does not adopt any framework or dependency.

```text
004C1J_AUTHORITY = PUBLIC_REGISTRY_AND_PINNED_UPSTREAM_METADATA_QUALIFICATION_ONLY
004C1J_ALLOWED_SURFACE = specs/004-local-pdf-core/**
004C1J_IMPLEMENTATION_AUTHORITY = ABSENT
004C1J_PACKAGE_MANAGER_EXECUTION_AUTHORITY = ABSENT
004C1J_COREPACK_NODE_RESOLVER_EXECUTION_AUTHORITY = ABSENT
004C1J_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1J_DEPENDENCY_ACQUISITION_INSTALL_AUTHORITY = ABSENT
004C1J_PACKAGE_MANIFEST_WORKSPACE_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1J_PACKAGE_ARCHIVE_DOWNLOAD_IMPORT_AUTHORITY = ABSENT
004C1J_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1J_PROVIDER_PDF_RUNTIME_AUTHORITY = ABSENT
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

No package, source, archive, binary, fixture, manifest, lockfile, provenance record, NOTICE/SBOM record, workflow, container, database, runtime, provider, or PDF execution surface is changed by this grain.

## 2. Canonical predecessor truth consumed without reopening

Canonical 004C1I closed through PR #114 at merge `8e985866a50c734e4f9c32b1f12b5054e5c5807e`.

004C1I established the complete observed dependency-only declared registry closure for eight selected roots and 18 exact reachable package identities while deliberately preserving:

```text
004C1I_COMPLETE_DEPENDENCY_ONLY_DECLARED_MAP_FOR_SELECTED_ROOTS = ESTABLISHED_FOR_OBSERVED_EXACT_VERSION_RECORDS
004C1I_COMPLETE_PEER_METADATA_CLOSURE = NOT_ESTABLISHED
004C1I_COMPLETE_OPTIONAL_METADATA_CLOSURE = NOT_ESTABLISHED
004C1I_RESOLVED_INSTALLATION_GRAPH = NOT_ESTABLISHED
```

004C1J does not weaken the canonical distinction:

```text
DECLARED_METADATA != RESOLVED_INSTALLATION_GRAPH
```

It also does not convert a source-workspace range into a published registry range by assumption.

## 3. Exact selected package identity set

004C1J keeps exactly the same 18 package identities established by 004C1I:

```text
@embedpdf/core@2.15.0
@embedpdf/engines@2.15.0
@embedpdf/models@2.15.0
@embedpdf/pdfium@2.15.0
@embedpdf/plugin-document-manager@2.15.0
@embedpdf/plugin-render@2.15.0
@embedpdf/plugin-thumbnail@2.15.0
@embedpdf/plugin-search@2.15.0
@embedpdf/plugin-selection@2.15.0
@embedpdf/plugin-interaction-manager@2.15.0
@embedpdf/utils@2.15.0
@embedpdf/fonts-arabic@1.0.0
@embedpdf/fonts-hebrew@1.0.0
@embedpdf/fonts-jp@1.0.0
@embedpdf/fonts-kr@1.0.0
@embedpdf/fonts-latin@1.0.0
@embedpdf/fonts-sc@1.0.0
@embedpdf/fonts-tc@1.0.0
```

No package is added to the selected dependency-only set by this grain merely because it appears as a peer.

## 4. Immutable upstream source binding

The source-side metadata inspected by this grain is bound to the already-qualified EmbedPDF v2 candidate:

```text
repository = https://github.com/embedpdf/embed-pdf-viewer
release = v2.15.0
sourceRevision = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
```

Only package manifests at that immutable source revision are used for source-side peer/optional observations.

The source manifests use workspace protocol entries for internal EmbedPDF relationships. A `workspace:*` source declaration is not treated as proof of the exact range serialized into a published npm version record.

Therefore:

```text
PINNED_SOURCE_PEER_METADATA = OBSERVED
PUBLISHED_REGISTRY_PEER_RANGE_PARITY = UNPROVEN
WORKSPACE_PROTOCOL_TO_PUBLISHED_RANGE_TRANSFORMATION = NOT_INFERRED
```

## 5. Source-side peer-bearing package classification

Exactly nine of the 18 pinned source manifests expose a `peerDependencies` field:

```text
@embedpdf/core@2.15.0
@embedpdf/engines@2.15.0
@embedpdf/plugin-document-manager@2.15.0
@embedpdf/plugin-render@2.15.0
@embedpdf/plugin-thumbnail@2.15.0
@embedpdf/plugin-search@2.15.0
@embedpdf/plugin-selection@2.15.0
@embedpdf/plugin-interaction-manager@2.15.0
@embedpdf/utils@2.15.0
```

Exactly nine selected package manifests do not expose `peerDependencies` at the pinned source revision:

```text
@embedpdf/models@2.15.0
@embedpdf/pdfium@2.15.0
@embedpdf/fonts-arabic@1.0.0
@embedpdf/fonts-hebrew@1.0.0
@embedpdf/fonts-jp@1.0.0
@embedpdf/fonts-kr@1.0.0
@embedpdf/fonts-latin@1.0.0
@embedpdf/fonts-sc@1.0.0
@embedpdf/fonts-tc@1.0.0
```

Classification:

```text
SELECTED_PACKAGE_IDENTITY_COUNT = 18
PINNED_SOURCE_PEER_BEARING_PACKAGE_COUNT = 9
PINNED_SOURCE_NON_PEER_PACKAGE_COUNT = 9
```

## 6. Framework peer contract observed in pinned source

The same five framework peer ranges are present in each of the nine peer-bearing source manifests:

```text
preact = ^10.26.4
react = >=16.8.0
react-dom = >=16.8.0
svelte = >=5 <6
vue = >=3.2.0
```

The nine packages carrying this framework peer set are:

```text
@embedpdf/core@2.15.0
@embedpdf/engines@2.15.0
@embedpdf/plugin-document-manager@2.15.0
@embedpdf/plugin-render@2.15.0
@embedpdf/plugin-thumbnail@2.15.0
@embedpdf/plugin-search@2.15.0
@embedpdf/plugin-selection@2.15.0
@embedpdf/plugin-interaction-manager@2.15.0
@embedpdf/utils@2.15.0
```

This produces 45 source-side framework peer entries across the selected set, but only five unique framework peer names.

```text
UNIQUE_FRAMEWORK_PEER_NAMES = 5
SOURCE_FRAMEWORK_PEER_ENTRY_COUNT = 45
```

These observations do not select React, Preact, Vue, Svelte, or any browser framework for Signthos.

The existence of framework-specific exports in upstream packages also does not imply that Signthos must install every declared framework peer.

## 7. Internal EmbedPDF peer edges observed in pinned source

Six selected plugin packages declare `@embedpdf/core` as a source-workspace peer:

```text
@embedpdf/plugin-document-manager -> @embedpdf/core = workspace:*
@embedpdf/plugin-render -> @embedpdf/core = workspace:*
@embedpdf/plugin-thumbnail -> @embedpdf/core = workspace:*
@embedpdf/plugin-search -> @embedpdf/core = workspace:*
@embedpdf/plugin-selection -> @embedpdf/core = workspace:*
@embedpdf/plugin-interaction-manager -> @embedpdf/core = workspace:*
```

Two additional internal peer edges are observed:

```text
@embedpdf/plugin-thumbnail -> @embedpdf/plugin-render = workspace:*
@embedpdf/plugin-selection -> @embedpdf/plugin-interaction-manager = workspace:*
```

Therefore:

```text
PINNED_SOURCE_INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
```

These source-workspace edges are compatibility relationships, not dependency adoption authority and not a resolved graph.

## 8. Package-by-package pinned-source peer matrix

| Package | Framework peers | Internal EmbedPDF peers |
| --- | --- | --- |
| `@embedpdf/core@2.15.0` | `preact`, `react`, `react-dom`, `svelte`, `vue` | none |
| `@embedpdf/engines@2.15.0` | `preact`, `react`, `react-dom`, `svelte`, `vue` | none |
| `@embedpdf/models@2.15.0` | none | none |
| `@embedpdf/pdfium@2.15.0` | none | none |
| `@embedpdf/plugin-document-manager@2.15.0` | `preact`, `react`, `react-dom`, `svelte`, `vue` | `@embedpdf/core = workspace:*` |
| `@embedpdf/plugin-render@2.15.0` | `preact`, `react`, `react-dom`, `svelte`, `vue` | `@embedpdf/core = workspace:*` |
| `@embedpdf/plugin-thumbnail@2.15.0` | `preact`, `react`, `react-dom`, `svelte`, `vue` | `@embedpdf/core = workspace:*`; `@embedpdf/plugin-render = workspace:*` |
| `@embedpdf/plugin-search@2.15.0` | `preact`, `react`, `react-dom`, `svelte`, `vue` | `@embedpdf/core = workspace:*` |
| `@embedpdf/plugin-selection@2.15.0` | `preact`, `react`, `react-dom`, `svelte`, `vue` | `@embedpdf/core = workspace:*`; `@embedpdf/plugin-interaction-manager = workspace:*` |
| `@embedpdf/plugin-interaction-manager@2.15.0` | `preact`, `react`, `react-dom`, `svelte`, `vue` | `@embedpdf/core = workspace:*` |
| `@embedpdf/utils@2.15.0` | `preact`, `react`, `react-dom`, `svelte`, `vue` | none |
| `@embedpdf/fonts-arabic@1.0.0` | none | none |
| `@embedpdf/fonts-hebrew@1.0.0` | none | none |
| `@embedpdf/fonts-jp@1.0.0` | none | none |
| `@embedpdf/fonts-kr@1.0.0` | none | none |
| `@embedpdf/fonts-latin@1.0.0` | none | none |
| `@embedpdf/fonts-sc@1.0.0` | none | none |
| `@embedpdf/fonts-tc@1.0.0` | none | none |

## 9. Optional dependency and peer metadata observations

For the 18 exact pinned source manifests inspected in this grain:

```text
PINNED_SOURCE_OPTIONAL_DEPENDENCIES_FIELDS_OBSERVED = 0
PINNED_SOURCE_PEER_DEPENDENCIES_META_FIELDS_OBSERVED = 0
```

This means the pinned source manifests inspected here do not mark any selected peer as optional through `peerDependenciesMeta`, and do not expose `optionalDependencies` fields.

It does not prove what an arbitrary package manager will install, omit, hoist, auto-install, or reject. Resolver behavior remains outside 004C1J.

## 10. Font leaf confirmation

The seven font package source manifests are located under exact upstream paths:

```text
packages/fonts/arabic/package.json
packages/fonts/hebrew/package.json
packages/fonts/jp/package.json
packages/fonts/kr/package.json
packages/fonts/latin/package.json
packages/fonts/sc/package.json
packages/fonts/tc/package.json
```

Each inspected font manifest identifies version `1.0.0`, has no `peerDependencies`, no `peerDependenciesMeta`, and no `optionalDependencies` field, and declares package license metadata as `OFL-1.1`.

This remains package-manifest metadata only. It does not complete exact font-asset copyright, digest, notice, or redistribution evidence.

## 11. Framework policy remains unresolved

Source metadata establishes compatibility declarations, not Signthos framework policy.

The following remain unresolved and fail closed:

```text
SIGNTHOS_SELECTED_BROWSER_FRAMEWORK = NOT_CANONICAL
SIGNTHOS_FRAMEWORK_VERSION = NOT_CANONICAL
SIGNTHOS_PEER_AUTO_INSTALL_POLICY = NOT_CANONICAL
SIGNTHOS_PEER_CONFLICT_POLICY = NOT_CANONICAL
SIGNTHOS_OPTIONAL_DEPENDENCY_POLICY = NOT_CANONICAL
SIGNTHOS_FRAMEWORK_ADAPTER_SELECTION = NOT_CANONICAL
SIGNTHOS_UNUSED_FRAMEWORK_PEER_EXCLUSION_MECHANISM = NOT_CANONICAL
```

A future root-manifest/resolver grain must decide whether the chosen package-manager behavior requires explicit framework peer inputs, can avoid irrelevant framework adapters, or needs package-control policy to prevent accidental peer expansion.

004C1J does not make that decision.

## 12. Registry/source parity boundary

Canonical 004C1I established exact published `dependencies` maps for the 18 exact selected records.

004C1J establishes pinned-source peer and optional metadata, but this candidate does not promote the internal source value `workspace:*` into any claimed exact published npm peer range.

Therefore:

```text
PUBLISHED_REGISTRY_DEPENDENCIES_MAP = CANONICAL_FROM_004C1I
PINNED_SOURCE_PEER_MAP = ESTABLISHED_FOR_SELECTED_18
PINNED_SOURCE_OPTIONAL_MAP = ESTABLISHED_AS_EMPTY_FOR_SELECTED_18
PINNED_SOURCE_PEER_META_MAP = ESTABLISHED_AS_EMPTY_FOR_SELECTED_18
PUBLISHED_REGISTRY_PEER_RANGE_PARITY = UNPROVEN
PUBLISHED_REGISTRY_PEER_META_PARITY = UNPROVEN
PUBLISHED_REGISTRY_OPTIONAL_PARITY = UNPROVEN
```

If a later independent exact-version registry observation establishes those fields, it must record the exact published ranges rather than infer them from source-workspace protocol semantics.

## 13. Resolver implications — evidence, not authority

The source metadata exposes two materially distinct peer classes:

1. internal EmbedPDF compatibility peers;
2. external framework compatibility peers.

A future deterministic resolver qualification must not flatten those classes into one generic dependency set.

At minimum it must define:

```text
ROOT_CAPABILITY_PACKAGE_SET
SELECTED_FRAMEWORK_AND_EXACT_VERSION
FRAMEWORK_ADAPTER_POLICY
PEER_AUTO_INSTALL_BEHAVIOR
PEER_CONFLICT_BEHAVIOR
OPTIONAL_DEPENDENCY_BEHAVIOR
WORKSPACE_PROTOCOL_PUBLISHED_RANGE_INTERPRETATION
OVERRIDES_OR_RESOLUTIONS
OS_CPU_PLATFORM_INPUTS
PACKAGE_MANAGER_VERSION
NODE_VERSION
LOCKFILE_FORMAT
```

Until those inputs are canonical, no resolved-installation graph is established.

## 14. Security and supply-chain boundary

Peer metadata can change the effective installation surface even when dependency-only closure is stable.

Therefore the following must not be inferred from 004C1I or 004C1J alone:

```text
EFFECTIVE_INSTALLATION_PACKAGE_COUNT = UNKNOWN
FRAMEWORK_PACKAGE_SET = UNKNOWN
FRAMEWORK_TRANSITIVE_GRAPH = UNKNOWN
PEER_AUTO_INSTALLED_PACKAGE_SET = UNKNOWN
OPTIONAL_PACKAGE_SET = UNKNOWN
RESOLVED_PACKAGE_ARCHIVE_SET = UNKNOWN
RESOLVED_LICENSE_NOTICE_SET = UNKNOWN
RESOLVED_OSV_CVE_SET = UNKNOWN
```

Any future resolver execution must re-run exact vulnerability, license, lifecycle, provenance, and archive checks against the resulting exact resolved graph rather than carrying forward the 18-package dependency-only observations as if they covered peers.

## 15. Adversarial cases

004C1J explicitly rejects the following shortcuts:

1. Treating `workspace:*` as a published `2.15.0` range without exact registry evidence.
2. Treating every framework peer as a Signthos dependency merely because upstream exposes framework adapters.
3. Treating the absence of `optionalDependencies` in source as proof of a resolver's final optional package set.
4. Treating the absence of `peerDependenciesMeta` as permission to auto-install every peer.
5. Treating a dependency-only closure of 18 packages as a complete installation graph.
6. Treating React compatibility as a decision to use React.
7. Treating peer compatibility ranges as lockfile identities.
8. Treating upstream devDependencies as Signthos runtime dependencies.
9. Treating font package license metadata as complete font asset redistribution evidence.
10. Treating a future package-manager default as canonical policy without explicit bounded qualification.
11. Treating source metadata as proof that published registry metadata is byte-for-byte or field-for-field identical.
12. Treating a successful peer resolution as provider runtime or PDF behavior evidence.

## 16. Acceptance evidence

004C1J is substantively complete only if exact-head independent review confirms all of the following:

- the candidate is based on exact canonical predecessor `8e985866a50c734e4f9c32b1f12b5054e5c5807e`;
- the selected identity set remains exactly the canonical 18 from 004C1I;
- immutable source evidence is bound to EmbedPDF commit `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed`;
- exactly nine selected source manifests are classified as peer-bearing and nine as non-peer-bearing;
- the five unique external framework peer names and ranges are transcribed exactly;
- all eight internal EmbedPDF source peer edges are transcribed exactly;
- no `peerDependenciesMeta` or `optionalDependencies` field is falsely invented for the selected pinned manifests;
- font paths and source metadata are exact;
- `workspace:*` is never promoted into a claimed published range;
- published registry peer/optional parity remains fail closed unless independently established;
- no framework, package-manager, resolver, dependency, package-control, runtime, 004C2, 004D, or Specification 005 authority is inferred;
- `git diff --check` is clean for the exact candidate range;
- the final changed surface remains Signthos-authored planning/evidence under `specs/004-local-pdf-core/**` only.

## 17. Result and remaining gates

Current 004C1J result:

```text
PINNED_SOURCE_PEER_MAP_FOR_SELECTED_18 = ESTABLISHED
PINNED_SOURCE_OPTIONAL_MAP_FOR_SELECTED_18 = ESTABLISHED_AS_EMPTY
PINNED_SOURCE_PEER_META_MAP_FOR_SELECTED_18 = ESTABLISHED_AS_EMPTY
PINNED_SOURCE_FRAMEWORK_PEER_CLASS = ESTABLISHED
PINNED_SOURCE_INTERNAL_EMBEDPDF_PEER_EDGES = ESTABLISHED
PUBLISHED_REGISTRY_PEER_RANGE_PARITY = UNPROVEN
PUBLISHED_REGISTRY_OPTIONAL_PARITY = UNPROVEN
SIGNTHOS_FRAMEWORK_POLICY = UNRESOLVED
SIGNTHOS_PEER_POLICY = UNRESOLVED
RESOLVED_INSTALLATION_GRAPH = NOT_ESTABLISHED
DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1J_IMPLEMENTATION_AUTHORITY = ABSENT
```

Remaining prerequisite classes before dependency bytes may be eligible include, as applicable:

- exact published peer/optional metadata or an explicitly justified policy for relying on immutable source evidence;
- explicit root capability package set and browser framework choice;
- canonical package-manager, Node, and resolver inputs;
- deterministic peer/optional/conflict behavior;
- exact resolved graph and lockfile evidence;
- exact resolved archive/provenance/license/lifecycle/advisory evidence;
- PDFium binary/source/build/notice evidence;
- font asset digest/copyright/notice evidence;
- writable package-control/provenance/NOTICE/SBOM authority;
- exact-head independent review, guarded merge, and live successor reconciliation.

## 18. Successor rule

Canonicalizing 004C1J does not authorize dependency acquisition, package-manager execution, package-control mutation, provider runtime, 004C2, 004D, or Specification 005.

After exact-head independent substantive review, guarded merge, post-merge verification, and a fresh live reread of Issue #7 plus canonical Specification 004 planning/evidence, the next bounded unit must be derived from the remaining smallest deterministic blocker.

No roadmap position or broad founder approval substitutes for that successor derivation.