# Specification 004C1M — Exact Dependency Declaration Set Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_DECLARATION_SET_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `2b438962e356cf7391dd304c8ead63be3db78ff1`
Canonical predecessor tree: `3047f11a9c212ceb97ac7d020b678c7cef4c1cc9`
Authority source: `github:issue-comment:5574309065`

## 1. Purpose and authority boundary

004C1M freezes the exact dependency declaration-set semantics that a future, separately authorized package-control mutation would have to encode for the selected EmbedPDF browser-provider candidate. It reconciles canonical 004C1G–004C1L without creating package-control bytes or executing a resolver.

```text
004C1M_AUTHORITY = PLANNING_DECLARATION_SET_QUALIFICATION_ONLY
004C1M_ALLOWED_SURFACE = specs/004-local-pdf-core/**
004C1M_CANONICAL_004C1G_TO_004C1L_RECONCILIATION_AUTHORITY = PRESENT
004C1M_EXACT_DIRECT_DEPENDENCY_IDENTITY_QUALIFICATION_AUTHORITY = PRESENT
004C1M_EXACT_INTERNAL_PEER_SATISFACTION_MAPPING_AUTHORITY = PRESENT
004C1M_EXACT_FRAMEWORK_OMISSION_MAPPING_AUTHORITY = PRESENT
004C1M_EXACT_PACKAGE_CONTROL_SEMANTIC_SHAPE_QUALIFICATION_AUTHORITY = PRESENT
004C1M_PRODUCT_FRAMEWORK_SELECTION_AUTHORITY = ABSENT
004C1M_IMPLEMENTATION_AUTHORITY = ABSENT
004C1M_PACKAGE_MANAGER_NODE_COREPACK_RESOLVER_EXECUTION_AUTHORITY = ABSENT
004C1M_DEPENDENCY_ADOPTION_ACQUISITION_INSTALL_AUTHORITY = ABSENT
004C1M_PACKAGE_JSON_MUTATION_AUTHORITY = ABSENT
004C1M_PNPM_WORKSPACE_MUTATION_AUTHORITY = ABSENT
004C1M_PNPM_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1M_NPMRC_MUTATION_AUTHORITY = ABSENT
004C1M_ARCHIVE_SOURCE_BINARY_FIXTURE_IMPORT_AUTHORITY = ABSENT
004C1M_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1M_PROVIDER_PDF_RUNTIME_AUTHORITY = ABSENT
004C1N_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact is planning evidence only. It does not create or mutate `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `.npmrc`, source, runtime, workflow, cache, provenance, NOTICE/SBOM, container, database, fixture, package archive, or installed dependency state. It executes no pnpm, npm, yarn, bun, Node.js, Corepack, resolver, provider, or PDF runtime command.

## 2. Canonical inputs consumed without reopening

004C1M consumes these canonical predecessor results:

```text
PACKAGE_MANAGER = pnpm@10.34.5
PACKAGE_MANAGER_SOURCE_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
RESOLVER_NODE_BASELINE = 24.20.0_LTS
WORKSPACE_CONTROL_ROOT = REPOSITORY_ROOT
ROOT_PACKAGE_MANIFEST_POLICY = REQUIRED_BEFORE_RESOLVER_EXECUTION
ROOT_PACKAGE_MANIFEST_OWNERSHIP = SIGNTHOS_AUTHORED
ROOT_WORKSPACE_CONFIG = pnpm-workspace.yaml
LOCKFILE_FAMILY = pnpm-lock.yaml
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
DEPENDENCY_LIFECYCLE_SCRIPTS = DENY_BY_DEFAULT
MINIMUM_RELEASE_AGE_MINUTES = 10080
SELECTED_PLANNING_ROOT_COUNT = 8
DECLARED_DEPENDENCY_ONLY_REACHABLE_IDENTITY_COUNT = 18
PUBLISHED_PEER_BEARING_PACKAGE_COUNT = 9
PUBLISHED_FRAMEWORK_PEER_ENTRY_COUNT = 45
PUBLISHED_INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
FRAMEWORK_PEER_OMISSION_POLICY = EXACT_PACKAGE_SCOPED
GLOBAL_PEER_SUPPRESSION = FORBIDDEN
WILDCARD_PEER_SUPPRESSION = FORBIDDEN
PRODUCT_FRAMEWORK_SELECTION = NOT_AUTHORIZED
```

Canonical source/evidence chain:

- 004C1G — package-manager/workspace selection;
- 004C1H — resolver input contract;
- 004C1I — selected roots and dependency-only declared registry closure;
- 004C1J — pinned-source peer/optional/framework metadata;
- 004C1K — exact published peer/optional registry parity;
- 004C1L — framework-peer ownership and omission policy.

No predecessor execution or adoption boundary is reopened by this grain.

## 3. Direct-declaration selection rule

Canonical 004C1I used eight capability-facing planning roots and explicitly distinguished those roots from the complete 18-package dependency-only reachable set.

004C1M freezes the future direct dependency declaration set to those eight capability-facing roots only. The ten additional reachable identities remain transitive dependency expectations and are not promoted into redundant Signthos-owned direct declarations.

This rule preserves two properties:

1. Signthos explicitly owns every capability-facing package it intentionally requests.
2. Signthos does not inflate the direct dependency surface merely to duplicate exact transitive edges already published by the selected packages.

The declaration set is still a planning contract, not dependency adoption.

## 4. Exact future direct dependency declaration set

A future package-control mutation may qualify against 004C1M only if its runtime direct-dependency semantics are exactly equivalent to:

```text
@embedpdf/core = 2.15.0
@embedpdf/pdfium = 2.15.0
@embedpdf/plugin-document-manager = 2.15.0
@embedpdf/plugin-render = 2.15.0
@embedpdf/plugin-thumbnail = 2.15.0
@embedpdf/plugin-search = 2.15.0
@embedpdf/plugin-selection = 2.15.0
@embedpdf/plugin-interaction-manager = 2.15.0
```

Qualified direct-declaration count:

```text
DIRECT_RUNTIME_DEPENDENCY_COUNT = 8
DIRECT_DEVELOPMENT_DEPENDENCY_COUNT = 0
DIRECT_PEER_DEPENDENCY_COUNT = 0
DIRECT_OPTIONAL_DEPENDENCY_COUNT = 0
```

No range operator, tag, moving reference, workspace protocol, git branch, remote tarball URL, local path, alias, catalog indirection, or implicit latest resolution is qualified for these direct declarations.

```text
DIRECT_VERSION_POLICY = EXACT_LITERAL_VERSION_ONLY
DIRECT_VERSION_VALUE_FOR_ALL_8 = 2.15.0
```

## 5. Direct declaration purpose map

| Exact direct identity | Classification | Planning purpose | Canonical evidence |
| --- | --- | --- | --- |
| `@embedpdf/core@2.15.0` | runtime | shared EmbedPDF engine/plugin coordination core | 004C1I selected root + 004C1J/K peer metadata |
| `@embedpdf/pdfium@2.15.0` | runtime | exact selected browser PDFium package identity | 004C1I selected root/registry identity |
| `@embedpdf/plugin-document-manager@2.15.0` | runtime | bounded document-manager capability | 004C1I selected root + 004C1J/K peer metadata |
| `@embedpdf/plugin-render@2.15.0` | runtime | bounded page render capability | 004C1I selected root + 004C1J/K peer metadata |
| `@embedpdf/plugin-thumbnail@2.15.0` | runtime | bounded thumbnail capability | 004C1I selected root + 004C1J/K peer metadata |
| `@embedpdf/plugin-search@2.15.0` | runtime | bounded text search capability | 004C1I selected root + 004C1J/K peer metadata |
| `@embedpdf/plugin-selection@2.15.0` | runtime | bounded text/selection capability | 004C1I selected root + 004C1J/K peer metadata |
| `@embedpdf/plugin-interaction-manager@2.15.0` | runtime | bounded interaction coordination required by selected plugin surface | 004C1I selected root + 004C1J/K peer metadata |

The table records future declaration purpose only. It does not claim provider behavior, browser compatibility, PDF correctness, performance, runtime safety, or adoption readiness.

## 6. Expected dependency-only transitive closure

Canonical 004C1I established the complete observed dependency-only closure for the exact eight roots as 18 identities. 004C1M preserves that set as an expected declared-metadata closure, not as a resolved installation graph:

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

```text
EXPECTED_DECLARED_METADATA_CLOSURE_COUNT = 18
RESOLVED_INSTALLATION_GRAPH = NOT_ESTABLISHED
LOCKFILE_GRAPH = NOT_ESTABLISHED
ARCHIVE_BYTE_SET = NOT_ACQUIRED
```

A later resolver result may not be declared correct merely because it contains these 18 names. Exact lockfile, peer, platform, integrity, archive, and mutation evidence remains required by 004C1H.

## 7. Internal EmbedPDF peer satisfaction map

All eight canonical internal EmbedPDF peer edges remain exact-and-present requirements:

```text
@embedpdf/plugin-document-manager@2.15.0 -> @embedpdf/core = 2.15.0
@embedpdf/plugin-render@2.15.0 -> @embedpdf/core = 2.15.0
@embedpdf/plugin-thumbnail@2.15.0 -> @embedpdf/core = 2.15.0
@embedpdf/plugin-thumbnail@2.15.0 -> @embedpdf/plugin-render = 2.15.0
@embedpdf/plugin-search@2.15.0 -> @embedpdf/core = 2.15.0
@embedpdf/plugin-selection@2.15.0 -> @embedpdf/core = 2.15.0
@embedpdf/plugin-selection@2.15.0 -> @embedpdf/plugin-interaction-manager = 2.15.0
@embedpdf/plugin-interaction-manager@2.15.0 -> @embedpdf/core = 2.15.0
```

Every peer target in that map is itself one of the eight exact Signthos-owned direct runtime declarations in Section 4.

Therefore the future declaration contract is:

```text
INTERNAL_PEER_TARGETS_SATISFIED_BY_EXACT_DIRECT_DECLARATIONS = 8_OF_8_EDGES
INTERNAL_PEER_OMISSION_EXCEPTION_COUNT = 0
INTERNAL_PEER_RANGE_OVERRIDE_COUNT = 0
INTERNAL_PEER_ALLOW_ANY_COUNT = 0
```

No package extension may mark an internal `@embedpdf/*` peer optional.

## 8. Framework peer omission map

Canonical 004C1L qualified deliberate omission of exactly five unselected framework peer names for exactly nine dependent identities:

```text
FRAMEWORK_PEER_NAMES = preact,react,react-dom,svelte,vue
FRAMEWORK_PEER_SELECTION = UNDECIDED / NOT_AUTHORIZED
FRAMEWORK_OMISSION_DEPENDENT_IDENTITY_COUNT = 9
FRAMEWORK_OMISSION_ENTRY_COUNT = 45
```

Exact dependent identities:

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

For each of those nine exact identities, and only those identities, the five framework peers may be represented in future package-control semantics as:

```text
peerDependenciesMeta.<framework-peer>.optional = true
```

The semantic mechanism must be attached through exact dependent-package/version-scoped `packageExtensions` as qualified by 004C1L.

```text
peerDependencyRules.ignoreMissing = FORBIDDEN
peerDependencyRules.allowAny = FORBIDDEN
GLOBAL_FRAMEWORK_PEER_SUPPRESSION = FORBIDDEN
WILDCARD_FRAMEWORK_PEER_SUPPRESSION = FORBIDDEN
BROAD_DEPENDENT_VERSION_SELECTOR = FORBIDDEN
```

004C1M does not choose the package-control file location or serialize these settings into repository bytes.

## 9. Consolidated future resolver declaration semantics

A future package-control candidate must preserve all of the following simultaneously:

```text
PACKAGE_MANAGER = pnpm@10.34.5
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
DIRECT_RUNTIME_DEPENDENCIES = EXACT_8_SET
DIRECT_VERSION_POLICY = EXACT_LITERAL_VERSION_ONLY
INTERNAL_EMBEDPDF_PEER_EDGES = EXACT_8_AND_PRESENT
FRAMEWORK_PEER_SELECTION = NONE_AUTHORIZED
FRAMEWORK_PEER_OMISSION = EXACT_45_PACKAGE_SCOPED_ENTRIES
GLOBAL_OR_WILDCARD_PEER_SUPPRESSION = FORBIDDEN
DEPENDENCY_LIFECYCLE_SCRIPTS = DENY_BY_DEFAULT
MINIMUM_RELEASE_AGE_MINUTES = 10080
COREPACK = NOT_USED
PNPM_SELF_MANAGED_VERSION_DOWNLOAD = DISABLED_REQUIRED
```

No field in this semantic tuple authorizes execution.

## 10. Deterministic acceptance rules

A later package-control candidate is declaration-set compatible with 004C1M only if all of the following are true:

1. it declares exactly the eight runtime dependencies in Section 4;
2. each direct version is the exact literal `2.15.0`;
3. it introduces no direct framework dependency by implication;
4. it introduces no direct development, peer, or optional dependency absent later explicit authority;
5. every one of the eight internal EmbedPDF peer edges resolves against an exact direct declaration target without an omission exception;
6. framework omission semantics contain exactly the 45 entries qualified by 004C1L;
7. no package outside the nine exact dependent identities receives that omission metadata;
8. no peer name outside the exact five framework names receives that omission metadata;
9. `autoInstallPeers=false` and `strictPeerDependencies=true` remain unchanged;
10. no global/wildcard `ignoreMissing`, `allowAny`, peer suppression, or broad package selector is introduced;
11. no dependency lifecycle execution authority is introduced;
12. all still-unresolved package-control fields remain fail closed until separately qualified.

Any violation fails declaration-set qualification.

## 11. Explicit failure conditions

```text
MISSING_DIRECT_ROOT_DECLARATION = FAIL
EXTRA_DIRECT_DEPENDENCY = FAIL_UNLESS_LATER_EXPLICITLY_AUTHORIZED
NON_EXACT_DIRECT_VERSION = FAIL
DIRECT_FRAMEWORK_SELECTION_BY_IMPLICATION = FAIL
MISSING_INTERNAL_EMBEDPDF_PEER_TARGET = FAIL
INVALID_INTERNAL_EMBEDPDF_PEER_TARGET_VERSION = FAIL
INTERNAL_PEER_OPTIONALIZATION = FAIL
FRAMEWORK_OMISSION_ENTRY_OUTSIDE_EXACT_45 = FAIL
GLOBAL_OR_WILDCARD_PEER_SUPPRESSION = FAIL
AUTO_INSTALL_PEERS_TRUE = FAIL
STRICT_PEER_DEPENDENCIES_FALSE = FAIL
DEPENDENCY_LIFECYCLE_EXECUTION_BY_IMPLICATION = FAIL
UNQUALIFIED_PACKAGE_CONTROL_FIELD = FAIL_CLOSED
```

## 12. Registry, license, and source-evidence boundary

004C1M relies on already-canonical metadata evidence; it performs no registry request and acquires no archive.

Canonical 004C1I observed:

```text
11 software records -> registry license field MIT
7 font records -> registry license field OFL-1.1
```

That metadata is not promoted into archive/binary/font redistribution clearance. Existing unresolved provenance boundaries remain unresolved, including PDFium distribution notice/archive-source binding and exact font asset notice/digest clearance where required by later acquisition/distribution authority.

No 004C1M statement grants dependency adoption, redistribution, runtime, or shipment authority.

## 13. Still-unresolved package-control inputs

Freezing the dependency declaration set does not make resolver execution ready. Canonical 004C1H still requires execution-bearing inputs that 004C1M does not authorize or establish:

```text
ROOT_MANIFEST_EXACT_NONDEPENDENCY_CONTENT = NOT_AUTHORIZED
ROOT_MANIFEST_SHA256 = NOT_ESTABLISHED
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
PNPM_WORKSPACE_SHA256 = NOT_ESTABLISHED
ROOT_WORKSPACE_MEMBERSHIP = UNRESOLVED_FAIL_CLOSED
EXACT_PACKAGE_EXTENSION_SERIALIZATION_LOCATION = NOT_AUTHORIZED
EXACT_NPMRC_RECONCILIATION = NOT_AUTHORIZED
EXACT_PNPM_PROVISIONING_MECHANISM = NOT_AUTHORIZED
EXACT_PNPM_DISTRIBUTION_SHA256 = NOT_ESTABLISHED
EXACT_NODE_DISTRIBUTION_SHA256 = NOT_ESTABLISHED
EXACT_RESOLVER_COMMAND = NOT_AUTHORIZED
EXACT_NETWORK_ALLOWLIST = NOT_AUTHORIZED
EXACT_CACHE_MODE = NOT_AUTHORIZED
EXACT_WRITABLE_SURFACE = NOT_AUTHORIZED
LOCKFILE = NOT_GENERATED
RESOLVED_GRAPH = NOT_GENERATED
PACKAGE_ARCHIVE_IDENTITY_SET = NOT_ESTABLISHED
```

These unknowns remain fail closed.

## 14. 004C1M qualification result

```text
EXACT_DIRECT_DEPENDENCY_DECLARATION_SET = QUALIFIED_CANDIDATE
DIRECT_RUNTIME_DEPENDENCY_COUNT = 8
DIRECT_RUNTIME_DEPENDENCY_VERSION_POLICY = EXACT_2.15.0
EXPECTED_DEPENDENCY_ONLY_METADATA_CLOSURE_COUNT = 18
INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
INTERNAL_EMBEDPDF_PEER_POLICY = EXACT_AND_PRESENT
FRAMEWORK_PEER_OMISSION_ENTRY_COUNT = 45
FRAMEWORK_PEER_OMISSION_POLICY = EXACT_PACKAGE_SCOPED
PRODUCT_FRAMEWORK_SELECTION = UNCHANGED_NOT_AUTHORIZED
PACKAGE_CONTROL_BYTES = NOT_CREATED
RESOLVER_EXECUTION = NOT_PERFORMED
DEPENDENCY_ADOPTION = NOT_CLAIMED
004C1M_STATUS = QUALIFIED_CANDIDATE
```

004C1M therefore closes the declaration-set planning gap while preserving every execution-bearing package-control and resolver prerequisite as a separate fail-closed gate.

## 15. Successor boundary

004C1M does not derive its own successor.

The next unit must be derived only after exact-head independent substantive review, guarded merge, mechanical post-merge verification, and fresh canonical reconciliation.

At minimum, package-control byte mutation remains premature while root manifest nondependency content, workspace membership/control bytes, package-extension serialization placement, `.npmrc` reconciliation, and other resolver-affecting control-plane fields remain unqualified.

```text
004C1N = NOT_AUTHORIZED_BY_004C1M
PACKAGE_CONTROL_MUTATION = NOT_AUTHORIZED_BY_004C1M
RESOLVER_EXECUTION = NOT_AUTHORIZED_BY_004C1M
004C2 = NOT_AUTHORIZED_BY_004C1M
004D = NOT_AUTHORIZED_BY_004C1M
SPECIFICATION_005 = NOT_AUTHORIZED_BY_004C1M
```

No CI, test, resolver, package installation, runtime, provider, PDF behavior, browser compatibility, security, performance, redistribution, or release-readiness claim is made by this artifact.