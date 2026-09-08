# Specification 004C1X — pnpm Workspace Exact-Byte Serialization Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_EXACT_BYTE_SERIALIZATION_ONLY / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `13085a44af0fc0662353adcd48a65df413b81fbf`
Canonical predecessor tree: `1be65b92973d94502b6559e6f3631f8d1aec1407`
Authority source: `github:issue-comment:5590012285`

## 1. Purpose and exact authority

004C1X freezes one exact UTF-8/LF serialization of the already-canonical 004C1W repository-owned pnpm project-settings semantic object. It does not create `/pnpm-workspace.yaml`.

```text
004C1X_AUTHORITY = PLANNING_EXACT_BYTE_SERIALIZATION_ONLY
004C1X_CANONICAL_BASE = 13085a44af0fc0662353adcd48a65df413b81fbf
004C1X_CANONICAL_BASE_TREE = 1be65b92973d94502b6559e6f3631f8d1aec1407
004C1X_ALLOWED_PATH = specs/004-local-pdf-core/004c1x-pnpm-workspace-exact-byte-serialization-qualification.md
004C1X_MAX_CHANGED_FILES = 1
PNPM_WORKSPACE_YAML_MUTATION = NOT_AUTHORIZED
```

No package manager, Node.js, Corepack, resolver, registry, provider, PDF runtime, dependency acquisition, installation, package creation, fixture execution, or admission implementation is authorized.

## 2. Canonical semantic input consumed without reopening

Canonical 004C1W fixes the complete repository-owned semantic object:

```text
WORKSPACE_PACKAGES = [packages/providers]
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
MANAGE_PACKAGE_MANAGER_VERSIONS = false
PACKAGE_MANAGER_STRICT = true
PACKAGE_MANAGER_STRICT_VERSION = true
MINIMUM_RELEASE_AGE = 10080
BLOCK_EXOTIC_SUBDEPS = true
PACKAGE_EXTENSIONS = CANONICAL_004C1L_MATRIX
```

Canonical omissions remain omissions:

```text
minimumReleaseAgeExclude = ABSENT
allowBuilds = ABSENT
overrides = ABSENT
supportedArchitectures = ABSENT
ignoredOptionalDependencies = ABSENT
registry/authentication settings = ABSENT
```

004C1X has no authority to add, remove, broaden, narrow, or reinterpret any semantic key or value.

## 3. Exact serialization conventions

The future root `/pnpm-workspace.yaml` byte object is frozen with these conventions:

```text
ENCODING = UTF-8_WITHOUT_BOM
LINE_ENDINGS = LF
INDENTATION = 2_ASCII_SPACES
TAB_CHARACTERS = FORBIDDEN
TOP_LEVEL_KEY_ORDER =
  packages
  autoInstallPeers
  strictPeerDependencies
  managePackageManagerVersions
  packageManagerStrict
  packageManagerStrictVersion
  minimumReleaseAge
  blockExoticSubdeps
  packageExtensions
PACKAGE_SELECTOR_QUOTING = SINGLE_QUOTED
OTHER_SCALAR_QUOTING = NONE_WHERE_NOT_REQUIRED
BLANK_LINE_AFTER_PACKAGES_BLOCK = YES
TERMINAL_NEWLINE = REQUIRED_EXACTLY_ONE_LF
TRAILING_SPACES = FORBIDDEN
YAML_DOCUMENT_START_MARKER = ABSENT
YAML_DOCUMENT_END_MARKER = ABSENT
COMMENTS = ABSENT
```

The exact package-selector order is the canonical 004C1W/004C1L order and is not alphabetically rewritten by this grain.

## 4. Exact future `/pnpm-workspace.yaml` bytes

The following fenced payload is the exact future file content between the fences, including one terminal LF after the final `optional: true` line. The fences themselves are not part of the file.

```yaml
packages:
  - packages/providers

autoInstallPeers: false
strictPeerDependencies: true
managePackageManagerVersions: false
packageManagerStrict: true
packageManagerStrictVersion: true
minimumReleaseAge: 10080
blockExoticSubdeps: true
packageExtensions:
  '@embedpdf/core@2.15.0':
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
  '@embedpdf/engines@2.15.0':
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
  '@embedpdf/plugin-document-manager@2.15.0':
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
  '@embedpdf/plugin-render@2.15.0':
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
  '@embedpdf/plugin-thumbnail@2.15.0':
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
  '@embedpdf/plugin-search@2.15.0':
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
  '@embedpdf/plugin-selection@2.15.0':
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
  '@embedpdf/plugin-interaction-manager@2.15.0':
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
  '@embedpdf/utils@2.15.0':
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

## 5. Exact byte identity

For the payload in Section 4 with UTF-8 encoding, LF line endings, no BOM, and exactly one terminal LF:

```text
PNPM_WORKSPACE_EXACT_BYTE_LENGTH = 2473
PNPM_WORKSPACE_SHA256 = 695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f
PNPM_WORKSPACE_TERMINAL_NEWLINE = EXACTLY_ONE_LF
```

Any future materialization must reproduce this byte identity exactly or fail closed.

## 6. Semantic preservation proof obligations

A future materialization review must mechanically prove that the exact bytes decode to only these top-level keys:

```text
packages
autoInstallPeers
strictPeerDependencies
managePackageManagerVersions
packageManagerStrict
packageManagerStrictVersion
minimumReleaseAge
blockExoticSubdeps
packageExtensions
```

It must also prove:

```text
EXPLICIT_NON_ROOT_WORKSPACE_MEMBER_COUNT = 1
EXPLICIT_NON_ROOT_WORKSPACE_MEMBER_1 = packages/providers
PACKAGE_EXTENSION_SELECTOR_COUNT = 9
FRAMEWORK_PEER_NAMES_PER_SELECTOR = 5
FRAMEWORK_PEER_OMISSION_ENTRY_COUNT = 45
INTERNAL_EMBEDPDF_PEER_EDGE_OMISSION_COUNT = 0
EXTRA_TOP_LEVEL_KEYS = 0
BUILD_ALLOWLIST_KEYS = 0
OVERRIDE_ENTRIES = 0
RELEASE_AGE_EXCLUSIONS = 0
SUPPORTED_ARCHITECTURE_EXPANSION = 0
OPTIONAL_DEPENDENCY_SUPPRESSIONS = 0
```

## 7. Why package selectors are quoted

Each `packageExtensions` selector begins with `@`. Single quoting makes the YAML representation explicit and unambiguous while preserving the exact selector strings already canonical under 004C1L/004C1W.

No semantic interpretation is derived from quoting; it is only an exact serialization choice.

## 8. Lifecycle-script boundary

No build allowlist key appears in the exact bytes.

```text
allowBuilds = ABSENT
onlyBuiltDependencies = ABSENT
ignoredBuiltDependencies = ABSENT
onlyBuiltDependenciesFile = ABSENT
neverBuiltDependencies = ABSENT
DEPENDENCY_BUILD_ALLOWLIST = EMPTY
```

This absence does not itself prove future install behavior. Any future resolver/install execution must still mechanically prove that no dependency lifecycle script executed unless later exact authority changes the policy.

## 9. Exotic-source boundary

The exact bytes serialize:

```text
blockExoticSubdeps = true
```

This is only the canonical pnpm baseline hardening. It does not authorize any pnpm trusted-source exception. Future resolver evidence must inspect actual resolved source identities and reject every unqualified transitive exotic source even when pnpm technically permits that source.

## 10. Platform and optional-dependency boundary

The exact bytes intentionally contain no `supportedArchitectures` and no `ignoredOptionalDependencies`.

Future resolver evidence remains bound to an exact execution platform tuple and exact optional-dependency behavior. These bytes do not claim one universal cross-platform dependency graph.

## 11. Registry and `.npmrc` boundary

The exact bytes contain no registry, authentication, proxy, TLS, or certificate configuration. Canonical repository `.npmrc` remains absent.

No network execution is authorized, and the public-registry default is not treated as network permission.

## 12. Materialization remains separate

004C1X freezes bytes only. It does not create the root file.

```text
LIVE_ROOT_PNPM_WORKSPACE_YAML = ABSENT_AT_004C1X_BASE
PNPM_WORKSPACE_MATERIALIZATION = NOT_AUTHORIZED
PNPM_LOCKFILE_GENERATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_CREATION = NOT_AUTHORIZED
```

A later materialization grain, if freshly authorized, may create only `/pnpm-workspace.yaml` with exact byte length `2473` and SHA-256 `695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f`.

## 13. Execution-bearing fields remain fail closed

```text
EXACT_PNPM_PROVISIONING_MECHANISM = NOT_AUTHORIZED
EXACT_PNPM_DISTRIBUTION_SHA256 = NOT_ESTABLISHED
EXACT_NODE_DISTRIBUTION_SHA256 = NOT_ESTABLISHED
EXACT_RESOLVER_COMMAND = NOT_AUTHORIZED
EXACT_EFFECTIVE_REGISTRY = NOT_EXECUTED_OR_PROVEN
EXACT_NETWORK_ALLOWLIST = NOT_AUTHORIZED
EXACT_ENVIRONMENT_ALLOWLIST = NOT_AUTHORIZED
EXACT_CACHE_MODE = NOT_AUTHORIZED
EXACT_WRITABLE_SURFACE = NOT_AUTHORIZED
EXACT_TARGET_OS = NOT_AUTHORIZED_FOR_EXECUTION
EXACT_TARGET_ARCH = NOT_AUTHORIZED_FOR_EXECUTION
EXACT_OPTIONAL_DEPENDENCY_EXECUTION_POLICY = NOT_AUTHORIZED
TRANSITIVE_EXOTIC_SOURCE_IDENTITY_PROOF = NOT_EXECUTED_OR_PROVEN
LOCKFILE = NOT_GENERATED
RESOLVED_GRAPH = NOT_GENERATED
PACKAGE_ARCHIVE_IDENTITY_SET = NOT_ESTABLISHED
```

Therefore:

```text
RESOLVER_READINESS = FAIL_CLOSED
DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
```

## 14. Deterministic acceptance criteria

004C1X may close canonically only if:

1. canonical base is exactly `13085a44af0fc0662353adcd48a65df413b81fbf`;
2. base tree is exactly `1be65b92973d94502b6559e6f3631f8d1aec1407`;
3. candidate changes exactly this one Signthos-authored planning artifact;
4. the exact payload has byte length `2473` and SHA-256 `695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f`;
5. exact UTF-8/no-BOM, LF, two-space indentation, no tabs/trailing spaces, and one terminal LF are preserved;
6. the top-level key set and order are exactly those frozen in Section 3;
7. workspace membership remains exactly root implicit plus explicit `packages/providers` only;
8. peer and package-manager controls preserve canonical 004C1W semantics exactly;
9. release age remains `10080` with no exclusions;
10. `blockExoticSubdeps=true` remains baseline hardening only and grants no trusted-source exception;
11. the exact nine-selector/45-entry package-extension matrix is preserved without drift;
12. no lifecycle build allowlist, override, supported-architecture expansion, optional-dependency suppression, registry/authentication setting, or extra project key is serialized;
13. `/pnpm-workspace.yaml`, package manifest, lockfile, package, `.npmrc`, source, fixture, workflow, provenance, database, cache, or runtime path is not mutated;
14. no package manager, Node, Corepack, resolver, registry, provider, or PDF runtime is executed;
15. exact-head Actions/check/provider state is recorded truthfully;
16. fresh independent substantive review covers the exact candidate head/tree;
17. all material findings are repaired forward-only and any changed head receives fresh review;
18. unresolved material review threads are zero;
19. immediate premerge race proof re-verifies all merge-critical state;
20. guarded normal merge uses exact expected head SHA;
21. postmerge verification proves reviewed-head/merge-tree equality and exact one-file surface;
22. fresh Issue #7 reconciliation derives any materialization or execution successor rather than assuming it.

## 15. Explicit non-grants

```text
PNPM_WORKSPACE_YAML_MUTATION = NOT_AUTHORIZED
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
NPMRC_REINTRODUCTION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_CREATION = NOT_AUTHORIZED
PACKAGE_MANAGER_PROVISIONING = NOT_AUTHORIZED
PACKAGE_MANAGER_EXECUTION = NOT_AUTHORIZED
NODE_EXECUTION = NOT_AUTHORIZED
COREPACK_EXECUTION = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
REGISTRY_NETWORK_EXECUTION = NOT_AUTHORIZED
DEPENDENCY_ACQUISITION_OR_INSTALLATION = NOT_AUTHORIZED
SOURCE_IMPORT = NOT_AUTHORIZED
CONTENT_IDENTITY_IMPLEMENTATION = NOT_AUTHORIZED
ADMISSION_IMPLEMENTATION = NOT_AUTHORIZED
FIXTURE_EXECUTION = NOT_AUTHORIZED
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 16. Qualification result

```text
004C1X_EXACT_BYTE_SERIALIZATION = QUALIFIED_CANDIDATE
FUTURE_FILE = /pnpm-workspace.yaml
BYTE_LENGTH = 2473
SHA256 = 695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f
LIVE_FILE_CREATED = NO
RESOLVER_READINESS = FAIL_CLOSED
DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
```

No successor is implied automatically.