# Specification 004C1Q — Package Extension Serialization Location Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_PACKAGE_EXTENSION_LOCATION_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `ce592c76a1affbd352f32ac81bd48f17436505ca`
Canonical predecessor tree: `6c72936795dbc125846910b6e79f2346b92e1159`
Authority source: `github:issue-comment:5575472571`

## 1. Purpose and authority boundary

004C1Q qualifies exactly one unresolved package-control decision: which repository-owned pnpm control surface must serialize the already-canonical 004C1L `packageExtensions` policy.

```text
004C1Q_AUTHORITY = PLANNING_PACKAGE_EXTENSION_LOCATION_QUALIFICATION_ONLY
004C1Q_ALLOWED_SURFACE = specs/004-local-pdf-core/**
004C1Q_CANONICAL_PACKAGE_EXTENSION_OWNER = ROOT_PNPM_WORKSPACE_YAML
004C1Q_PACKAGE_JSON_PACKAGE_EXTENSIONS = FORBIDDEN
004C1Q_NPMRC_PACKAGE_EXTENSIONS = FORBIDDEN
004C1Q_PACKAGE_EXTENSION_SEMANTICS = CANONICAL_004C1L_ONLY
004C1Q_PACKAGE_EXTENSION_SELECTOR_OR_VALUE_DRIFT_AUTHORITY = ABSENT
004C1Q_PNPM_WORKSPACE_EXACT_CONTENT_AUTHORITY = ABSENT
004C1Q_PNPM_WORKSPACE_MUTATION_AUTHORITY = ABSENT
004C1Q_NPMRC_MUTATION_AUTHORITY = ABSENT
004C1Q_PACKAGE_MANAGER_NODE_COREPACK_RESOLVER_EXECUTION_AUTHORITY = ABSENT
004C1Q_DEPENDENCY_ADOPTION_ACQUISITION_INSTALL_AUTHORITY = ABSENT
004C1Q_LOCKFILE_GENERATION_AUTHORITY = ABSENT
004C1Q_PRODUCT_FRAMEWORK_SELECTION_AUTHORITY = ABSENT
004C1Q_PROVIDER_PDF_RUNTIME_AUTHORITY = ABSENT
004C1R_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact is planning evidence only. It does not create or mutate `pnpm-workspace.yaml`, `.npmrc`, `package.json`, `pnpm-lock.yaml`, source, runtime, workflow, cache, provenance, NOTICE/SBOM, container, database, fixture, archive, or installed dependency state. It executes no pnpm, npm, yarn, bun, Node.js, Corepack, resolver, provider, or PDF runtime command.

## 2. Canonical predecessor truth consumed without reopening

Canonical 004C1G and 004C1H establish:

```text
PACKAGE_MANAGER_FAMILY = pnpm
PACKAGE_MANAGER_VERSION = 10.34.5
PNPM_TAG = v10.34.5
PNPM_TAG_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
WORKSPACE_CONTROL_ROOT = REPOSITORY_ROOT
ROOT_WORKSPACE_CONFIG = pnpm-workspace.yaml
ROOT_PACKAGE_MANIFEST_POLICY = REQUIRED_BEFORE_RESOLVER_EXECUTION
LOCKFILE_FAMILY = pnpm-lock.yaml
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
```

Canonical 004C1P has now materialized the exact root `package.json` bytes previously qualified by 004C1M, 004C1N, and 004C1O:

```text
LIVE_ROOT_PACKAGE_JSON = PRESENT
LIVE_ROOT_PACKAGE_JSON_BYTE_LENGTH = 509
LIVE_ROOT_PACKAGE_JSON_SHA256 = 71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183
LIVE_ROOT_PACKAGE_JSON_DEPENDENCY_ENTRY_COUNT = 8
LIVE_ROOT_PNPM_WORKSPACE_YAML = ABSENT
LIVE_ROOT_PNPM_LOCK_YAML = ABSENT
LIVE_ROOT_NPMRC = PRESENT
```

Canonical 004C1N intentionally excludes pnpm-specific policy keys from `package.json`, including `pnpm`, `packageExtensions`, `peerDependenciesMeta`, and equivalent package-manager policy metadata. 004C1Q does not reopen that manifest-shape decision.

## 3. Canonical 004C1L semantics consumed without reopening

004C1Q does not invent or modify any package-extension selector, peer name, or value. Canonical 004C1L remains the sole semantic authority.

The exact peer-bearing package identities eligible for the omission policy are:

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

The exact deliberately unselected framework peer names are:

```text
preact
react
react-dom
svelte
vue
```

For each of the nine exact package selectors, 004C1L qualifies only this semantic addition:

```yaml
peerDependenciesMeta:
  preact:
    optional: true
  react:
    optional: true
  react-dom:
    optional: true
  svelte:
    optional: true
  vue:
    optional: true
```

Canonical counts remain:

```text
PACKAGE_EXTENSION_SELECTOR_COUNT = 9
FRAMEWORK_PEER_NAMES_PER_SELECTOR = 5
FRAMEWORK_PEER_OMISSION_ENTRY_COUNT = 45
INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
```

All eight internal EmbedPDF peer edges remain exact-and-present. 004C1Q grants no omission, override, broad suppression, framework selection, or version-range widening beyond canonical 004C1L.

## 4. First-party pnpm v10 serialization evidence

The selected package-manager line is exact pnpm `10.34.5`.

First-party pnpm v10 documentation identifies the per-project settings file as:

```text
/path/to/my/project/pnpm-workspace.yaml
```

The version-10.x Settings documentation defines `packageExtensions` as a project setting and explicitly permits the following extension fields:

```text
dependencies
optionalDependencies
peerDependencies
peerDependenciesMeta
```

It also documents exact package-name-plus-semver selectors as valid `packageExtensions` keys.

The exact selected pnpm `v10.34.5` source tree independently demonstrates the serialization owner: its repository-root `pnpm-workspace.yaml` contains a top-level `packageExtensions:` mapping with package-scoped extension entries.

Evidence identifiers:

```text
PNPM_DOCUMENTATION = pnpm/pnpm.io:versioned_docs/version-10.x/settings.md
PNPM_DOCUMENTATION_SECTION = Settings (pnpm-workspace.yaml) / packageExtensions
PNPM_SELECTED_TAG = v10.34.5
PNPM_SELECTED_TAG_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
PNPM_SELECTED_SOURCE_PATH = pnpm/pnpm:pnpm-workspace.yaml
PNPM_SELECTED_SOURCE_OBSERVATION = TOP_LEVEL_PACKAGE_EXTENSIONS_PRESENT
```

No pnpm command was executed to establish this evidence.

## 5. Canonical serialization owner

004C1Q qualifies exactly:

```text
PACKAGE_EXTENSION_CONTROL_FILE = /pnpm-workspace.yaml
PACKAGE_EXTENSION_ROOT_KEY = packageExtensions
PACKAGE_EXTENSION_SCOPE = REPOSITORY_ROOT_PNPM_PROJECT_SETTINGS
PACKAGE_EXTENSION_SEMANTIC_SOURCE = CANONICAL_004C1L
```

A future workspace-control candidate may serialize the 004C1L omission matrix only as a top-level `packageExtensions` mapping in the repository-root `pnpm-workspace.yaml`.

The semantic shape beneath that key must remain equivalent to:

```yaml
packageExtensions:
  <exact-package-name>@2.15.0:
    peerDependenciesMeta:
      preact:
        optional: true
      react:
        optional: true
      react-dom:
        optional: true
      svelte:
        optional: true
      vue:
        optional: true
```

`<exact-package-name>` is restricted to the nine canonical 004C1L identities listed in Section 3. The fragment above is semantic illustration only; this grain does not freeze YAML quoting, key order, indentation, line endings, byte length, or digest.

## 6. Rejected serialization locations

The following are not canonical owners for the 004C1L package-extension policy:

```text
/package.json.packageExtensions = FORBIDDEN
/package.json.pnpm.packageExtensions = FORBIDDEN
/.npmrc package-extension encoding = FORBIDDEN
NESTED_WORKSPACE_PACKAGE_PACKAGE_JSON = FORBIDDEN
AD_HOC_JSON_OR_YAML_POLICY_FILE = FORBIDDEN
RUNTIME_GENERATED_PACKAGE_EXTENSION_POLICY = FORBIDDEN
COMMAND_LINE_ONLY_PACKAGE_EXTENSION_POLICY = FORBIDDEN
ENVIRONMENT_ONLY_PACKAGE_EXTENSION_POLICY = FORBIDDEN
```

Rationale:

- canonical 004C1N already fixes the root `package.json` semantic object and excludes pnpm policy fields;
- first-party pnpm v10 treats `packageExtensions` as project settings represented in `pnpm-workspace.yaml`;
- `.npmrc` remains a separate configuration and authorization/reconciliation surface and is not selected as the structured package-extension owner;
- runtime, command-line, or environment-only injection would not provide the repository-owned deterministic bytes required by canonical 004C1H.

## 7. Exact selector ownership rules

A future serializer must preserve all of these rules:

```text
SELECTOR_VERSION_POLICY = EXACT_2.15.0_ONLY
SELECTOR_COUNT = 9
PEER_META_ENTRY_COUNT = 45
ADDED_FIELD_PER_SELECTOR = peerDependenciesMeta_ONLY
FRAMEWORK_PEER_OPTIONAL_VALUE = true
BROAD_SEMVER_RANGE = FORBIDDEN
UNVERSIONED_SELECTOR = FORBIDDEN
WILDCARD_SELECTOR = FORBIDDEN
EXTRA_DEPENDENT_PACKAGE = FORBIDDEN
EXTRA_FRAMEWORK_PEER = FORBIDDEN
INTERNAL_EMBEDPDF_PEER_OMISSION = FORBIDDEN
GLOBAL_IGNORE_MISSING = FORBIDDEN
ALLOW_ANY = FORBIDDEN
STRICT_PEER_DEPENDENCIES_FALSE = FORBIDDEN
AUTO_INSTALL_PEERS_TRUE = FORBIDDEN
```

004C1Q does not alter peer ranges published by EmbedPDF, install any framework, or select a product framework.

## 8. Separation from workspace membership

Selecting `pnpm-workspace.yaml` as the package-extension owner does not establish workspace membership.

Still unresolved:

```text
PNPM_WORKSPACE_PACKAGES_FIELD = NOT_AUTHORIZED
ROOT_WORKSPACE_MEMBERSHIP = UNRESOLVED_FAIL_CLOSED
FUTURE_PROVIDER_WORKSPACE_MEMBERSHIP = UNRESOLVED_FAIL_CLOSED
PACKAGES_PRISMA_WORKSPACE_MEMBERSHIP = NOT_IMPLICITLY_AUTHORIZED
```

A later grain must independently qualify the complete workspace membership model and any exact `packages:` patterns.

The repository root remains the control root, and the root package remains a pnpm workspace root package by canonical 004C1G semantics. 004C1Q does not infer additional workspace members from directory existence.

## 9. Separation from other pnpm settings

004C1Q does not serialize or qualify the complete project settings object.

Still unresolved for later grains:

```text
AUTO_INSTALL_PEERS_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
STRICT_PEER_DEPENDENCIES_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
MANAGE_PACKAGE_MANAGER_VERSIONS_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
PACKAGE_MANAGER_STRICT_VERSION_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
MINIMUM_RELEASE_AGE_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
DEPENDENCY_LIFECYCLE_SCRIPT_POLICY_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
OTHER_REQUIRED_004C1G_004C1H_SETTINGS = NOT_YET_QUALIFIED_AS_BYTES
```

Those settings may share the same future `pnpm-workspace.yaml` control surface where canonical pnpm semantics require it, but 004C1Q grants no exact content or mutation authority for them.

## 10. `.npmrc` separation

The live repository `.npmrc` currently remains a separate unresolved control surface. 004C1Q neither validates nor changes it.

```text
EXACT_NPMRC_RECONCILIATION = NOT_AUTHORIZED
NPMRC_MUTATION = NOT_AUTHORIZED
NPMRC_CORRECTNESS = NOT_CLAIMED
```

Any existing `.npmrc` setting that can influence a future pnpm invocation must be reconciled before resolver execution under a separately authorized grain.

## 11. Byte identity remains unresolved

004C1Q deliberately does not freeze exact `pnpm-workspace.yaml` bytes.

```text
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
PNPM_WORKSPACE_BYTE_LENGTH = NOT_ESTABLISHED
PNPM_WORKSPACE_SHA256 = NOT_ESTABLISHED
PNPM_WORKSPACE_YAML_KEY_ORDER = NOT_ESTABLISHED
PNPM_WORKSPACE_YAML_QUOTING = NOT_ESTABLISHED
PNPM_WORKSPACE_YAML_INDENTATION = NOT_ESTABLISHED
PNPM_WORKSPACE_TERMINAL_NEWLINE_POLICY = NOT_ESTABLISHED
```

A later exact-content grain must combine every already-qualified workspace/control semantic requirement without reopening this location decision or canonical 004C1L semantics.

## 12. Resolver and acquisition boundary

No execution-bearing prerequisite is closed by 004C1Q.

```text
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
DEPENDENCY_ADOPTION = NOT_AUTHORIZED
```

No resolver readiness, package acquisition, installation readiness, provider behavior, PDF behavior, or release readiness is claimed.

## 13. Deterministic acceptance rules

004C1Q may close canonically only if all of the following remain true:

1. the candidate changes exactly one Signthos-authored planning artifact under `specs/004-local-pdf-core/**`;
2. canonical predecessor main is exactly `ce592c76a1affbd352f32ac81bd48f17436505ca`;
3. canonical 004C1L remains the only semantic authority for package-extension selectors and values;
4. the serialization owner is exactly repository-root `/pnpm-workspace.yaml`;
5. the root key is exactly `packageExtensions`;
6. `package.json`, `.npmrc`, nested package manifests, ad-hoc policy files, runtime injection, command-line-only injection, and environment-only injection are rejected as canonical owners;
7. no `pnpm-workspace.yaml`, `.npmrc`, `package.json`, lockfile, source, runtime, provenance, workflow, fixture, database, or container path is mutated;
8. no package manager, Node, Corepack, resolver, registry, provider, or PDF runtime is executed;
9. no dependency or framework is adopted, acquired, downloaded, installed, or selected;
10. exact-head provider/check state is recorded truthfully;
11. a fresh independent substantive exact-head review is obtained;
12. all material findings are repaired forward-only and every changed head is re-reviewed;
13. unresolved material review threads are zero;
14. mandatory exact-head premerge proof is recorded;
15. guarded normal merge uses the exact reviewed head;
16. post-merge verification proves reviewed-head/merge-tree equality and exact changed surface;
17. fresh canonical reconciliation derives any successor rather than assuming it.

## 14. Explicit non-claims

004C1Q does not claim:

- that `pnpm-workspace.yaml` exists;
- that workspace membership is known;
- that complete workspace settings are known;
- that exact workspace YAML serialization or digest is known;
- that `.npmrc` is correct;
- that pnpm or Node is provisioned;
- that resolver execution is authorized or reproducible;
- that a lockfile or resolved graph exists;
- that package archives were acquired;
- that dependencies are installed or adopted;
- that a product framework is selected;
- that provider/PDF runtime behavior exists;
- that CI, resolver, install, browser, PDF, redistribution, or release readiness passed;
- that 004C1R, 004C2, 004D, or Specification 005 is authorized.

## 15. Qualification result

```text
004C1Q_PACKAGE_EXTENSION_SERIALIZATION_LOCATION = QUALIFIED_CANDIDATE
PACKAGE_EXTENSION_CONTROL_FILE = /pnpm-workspace.yaml
PACKAGE_EXTENSION_ROOT_KEY = packageExtensions
PACKAGE_EXTENSION_SEMANTICS = CANONICAL_004C1L
PACKAGE_EXTENSION_SELECTOR_COUNT = 9
FRAMEWORK_PEER_OMISSION_ENTRY_COUNT = 45
INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
LIVE_PNPM_WORKSPACE_YAML = ABSENT
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
PNPM_WORKSPACE_SHA256 = NOT_ESTABLISHED
ROOT_WORKSPACE_MEMBERSHIP = UNRESOLVED_FAIL_CLOSED
EXACT_NPMRC_RECONCILIATION = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
DEPENDENCY_ADOPTION = NOT_AUTHORIZED
PROVIDER_PDF_RUNTIME = NOT_AUTHORIZED
004C1R_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

The location decision becomes canonical only after fresh independent exact-head review, guarded merge, post-merge verification, and mandatory successor reconciliation.
