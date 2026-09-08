# Specification 004C1W — pnpm Project-Settings Semantic Aggregation Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_PROJECT_SETTINGS_SEMANTICS_ONLY / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `612429c2b2e8e5d848f4eeeb9873e53ef3d06bb5`
Canonical predecessor tree: `d41e283c5bbc83fafb673bb8c050fef1740f4a08`
Authority source: `github:issue-comment:5589313200`

## 1. Purpose and exact authority

004C1W aggregates the already-qualified repository-owned pnpm project-setting semantics into one bounded semantic contract before any exact `pnpm-workspace.yaml` bytes are frozen.

```text
004C1W_AUTHORITY = PLANNING_PROJECT_SETTINGS_SEMANTIC_AGGREGATION_ONLY
004C1W_CANONICAL_BASE = 612429c2b2e8e5d848f4eeeb9873e53ef3d06bb5
004C1W_CANONICAL_BASE_TREE = d41e283c5bbc83fafb673bb8c050fef1740f4a08
004C1W_ALLOWED_PATH = specs/004-local-pdf-core/004c1w-pnpm-project-settings-semantic-aggregation-qualification.md
004C1W_MAX_CHANGED_FILES = 1
```

This grain does not create or edit `pnpm-workspace.yaml`. It does not modify `package.json`, create a lockfile, create `packages/providers`, provision pnpm or Node, execute a resolver, contact a registry, acquire dependencies, execute fixtures, or implement provider/admission behavior.

## 2. Canonical predecessor decisions consumed without reopening

004C1W consumes the following canonical decisions:

```text
PACKAGE_MANAGER_FAMILY = pnpm
PACKAGE_MANAGER_VERSION = 10.34.5
PNPM_SOURCE_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
PNPM_DOCUMENTATION_COMMIT = b015f4e6d789d894847e432d0cc771526a55cd27
RESOLVER_NODE_BASELINE = 24.20.0_LTS
WORKSPACE_CONTROL_ROOT = REPOSITORY_ROOT
ROOT_PACKAGE_MANIFEST = /package.json
ROOT_PACKAGE_MANAGER_PIN = pnpm@10.34.5
ROOT_WORKSPACE_CONFIG = /pnpm-workspace.yaml
LOCKFILE_PATH = /pnpm-lock.yaml
COREPACK_POLICY = NOT_USED
ROOT_IMPLICIT_WORKSPACE_MEMBER = /
EXPLICIT_NON_ROOT_WORKSPACE_MEMBERS = [packages/providers]
PACKAGES_PRISMA_WORKSPACE_MEMBERSHIP = EXCLUDED
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
PNPM_SELF_MANAGED_VERSION_DOWNLOAD = DISABLED_REQUIRED
PACKAGE_MANAGER_STRICT = true
PACKAGE_MANAGER_STRICT_VERSION = true
MINIMUM_RELEASE_AGE_MINUTES = 10080
EXOTIC_TRANSITIVE_SOURCE_DEFAULT = FAIL_CLOSED
DEPENDENCY_LIFECYCLE_SCRIPTS = DENY_BY_DEFAULT
ALLOWED_BUILD_DEPENDENCIES = EMPTY_UNLESS_SEPARATELY_QUALIFIED
OVERRIDES = EXPLICIT_REPOSITORY_OWNED_ONLY
PACKAGE_EXTENSION_CONTROL_FILE = /pnpm-workspace.yaml
PACKAGE_EXTENSION_ROOT_KEY = packageExtensions
NPMRC_FUTURE_EXISTENCE = ABSENT
ROOT_NPMRC = ABSENT
```

004C1W does not reopen dependency versions, root-manifest bytes, workspace membership, package-extension selectors, framework-peer omission semantics, `.npmrc` disposition, provider selection, content identity, admission semantics, or fixture identity.

## 3. Exact live repository facts

At canonical `main@612429c2b2e8e5d848f4eeeb9873e53ef3d06bb5`:

```text
ROOT_PACKAGE_JSON = PRESENT
ROOT_PACKAGE_JSON_BLOB = 510341a3ad1bad08084e338152da8bef1f698b14
ROOT_PACKAGE_JSON_NAME = signthos
ROOT_PACKAGE_JSON_PRIVATE = true
ROOT_PACKAGE_JSON_PACKAGE_MANAGER = pnpm@10.34.5
ROOT_PACKAGE_JSON_NODE_ENGINE = 24.20.0
ROOT_PACKAGE_JSON_DIRECT_DEPENDENCY_COUNT = 8
ROOT_PNPM_WORKSPACE_YAML = ABSENT
ROOT_PNPM_LOCK_YAML = ABSENT
ROOT_NPMRC = ABSENT
PACKAGES_PROVIDERS_PACKAGE = ABSENT
```

These are repository facts, not resolver-readiness claims.

## 4. First-party pnpm project-settings ownership

Pinned pnpm v10 documentation identifies `pnpm-workspace.yaml` as the per-project configuration file and documents the relevant setting names used by this contract.

The exact selected pnpm line establishes:

```text
PROJECT_SETTINGS_OWNER = /pnpm-workspace.yaml
AUTHORIZATION_SETTINGS_CLASS = .npmrc_WHEN_NEEDED
```

Canonical 004C1U/004C1V establish that no repository `.npmrc` is needed in the current first resolver-control state, so 004C1W does not reintroduce one.

## 5. Complete repository-owned semantic set

004C1W qualifies the complete repository-owned semantic set that a later exact-byte serializer may encode.

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

No additional repository-owned resolver setting is added by implication.

## 6. Workspace membership semantic

Canonical 004C1S controls membership. 004C1W aggregates it without widening it:

```text
ROOT_MEMBER = IMPLICIT_BY_PNPM_WORKSPACE_ROOT
EXPLICIT_NON_ROOT_MEMBER_COUNT = 1
EXPLICIT_NON_ROOT_MEMBER_1 = packages/providers
PACKAGES_PRISMA = EXCLUDED
BROAD_PACKAGES_GLOB = FORBIDDEN
RECURSIVE_PACKAGES_GLOB = FORBIDDEN
UNLISTED_DIRECTORY_INFERENCE = FORBIDDEN
```

The semantic `packages:` list therefore contains exactly one explicit entry: `packages/providers`.

The fact that `packages/providers` is not yet materialized does not authorize its creation in this grain.

## 7. Peer-policy semantics

Pinned pnpm v10 documentation establishes that `autoInstallPeers` defaults to `true` and `strictPeerDependencies` defaults to `false`.

Canonical Signthos policy requires the opposite explicit fail-closed posture:

```text
autoInstallPeers = false
strictPeerDependencies = true
```

This prevents missing non-optional peers from being silently installed and requires missing or invalid peers to fail.

No `legacy-peer-deps` semantics are permitted.

## 8. Package-manager version-control semantics

Pinned pnpm v10 documentation establishes:

- `packageManagerStrict` checks that the package-manager name matches the root `packageManager` declaration;
- `packageManagerStrictVersion` requires the running pnpm version to match the exact version declared in `packageManager`;
- `managePackageManagerVersions` otherwise permits pnpm to download/run the version named by `packageManager`.

Canonical Signthos policy therefore serializes:

```text
managePackageManagerVersions = false
packageManagerStrict = true
packageManagerStrictVersion = true
```

This does not provision pnpm. A later execution grain must separately establish the exact pnpm distribution and executable identity.

## 9. Release-age semantic

Canonical 004C1G/004C1T preserve the imported seven-day maturity intent using pnpm's minute-based setting.

```text
minimumReleaseAge = 10080
minimumReleaseAgeExclude = ABSENT
```

No package, scope, version, or pattern is exempted from the maturity window by current canonical authority.

## 10. Exotic-source semantic

Pinned pnpm v10 documentation defines `blockExoticSubdeps` and canonical 004C1G/004C1H require transitive exotic sources to fail closed unless separately qualified.

The repository-owned semantic is therefore:

```text
blockExoticSubdeps = true
```

This does not authorize direct exotic-source dependencies. Current exact direct declarations remain the separately canonical registry package set.

## 11. Lifecycle-script semantic and current pnpm mechanism

Canonical 004C1H requires:

```text
DEPENDENCY_LIFECYCLE_SCRIPTS = DENY_BY_DEFAULT
ALLOWED_BUILD_DEPENDENCIES = EMPTY_UNLESS_SEPARATELY_QUALIFIED
ROOT_INSTALL_HOOKS = NONE_UNLESS_SEPARATELY_QUALIFIED
```

Pinned pnpm v10 documentation establishes that dependency lifecycle scripts are not run unless explicitly allowed. It also records that `allowBuilds`, added in pnpm v10.26.0, replaces the older `onlyBuiltDependencies` and `ignoredBuiltDependencies` controls.

No package has canonical build-script execution authority. Therefore 004C1W selects no repository allowlist key at all:

```text
allowBuilds = ABSENT
onlyBuiltDependencies = ABSENT
ignoredBuiltDependencies = ABSENT
onlyBuiltDependenciesFile = ABSENT
neverBuiltDependencies = ABSENT
DEPENDENCY_BUILD_ALLOWLIST = EMPTY
DEPENDENCY_SCRIPT_DEFAULT = DENY_BY_EXACT_PNPM_10.34.5_BEHAVIOR
```

The absence of an allowlist is not execution authority. A future resolver/install grain must mechanically prove that no dependency lifecycle script executed; any package later requiring build/install scripts needs fresh bounded security and execution authority.

## 12. Repository-owned override semantic

No canonical override exception currently exists.

```text
overrides = ABSENT
OVERRIDE_ENTRY_COUNT = 0
```

A future override requires its own evidence-backed authority and may not be inserted by the exact-byte serializer as a convenience fix.

## 13. Optional dependency and platform classification

Canonical 004C1H requires exact target OS, architecture, Node version, optional-dependency policy, and platform inputs for every future resolver evidence object. It explicitly permits `SUPPORTED_ARCHITECTURES_POLICY` to be exact or absent.

004C1W chooses not to encode cross-platform expansion into repository project settings:

```text
supportedArchitectures = ABSENT
ignoredOptionalDependencies = ABSENT
REPOSITORY_OPTIONAL_DEPENDENCY_SUPPRESSION = NONE
REPOSITORY_CROSS_PLATFORM_OPTIONAL_EXPANSION = NONE
```

Rationale:

- `supportedArchitectures` can deliberately install optional dependencies for platforms other than the executing platform;
- canonical resolver evidence must remain bound to an exact platform tuple and must not represent one graph as universal cross-platform truth;
- no optional package is canonically authorized for blanket repository-level suppression.

The exact future optional-dependency behavior therefore remains execution/evidence-bound:

```text
TARGET_OS = EXECUTION_BOUND
TARGET_ARCH = EXECUTION_BOUND
TARGET_LIBC_IF_RELEVANT = EXECUTION_BOUND
OPTIONAL_DEPENDENCY_POLICY = EXECUTION_BOUND_EXACT
PLATFORM_GRAPH_UNIVERSALITY_CLAIM = FORBIDDEN
```

This classification does not block exact YAML serialization because these values are deliberately outside the repository project-setting object rather than unknown keys that the serializer must invent.

## 14. Registry/authentication classification

Repository `.npmrc` is now canonically absent.

No registry/authentication key is serialized into `pnpm-workspace.yaml` by 004C1W.

```text
REPOSITORY_REGISTRY_OVERRIDE = ABSENT
REPOSITORY_AUTHENTICATION = ABSENT
REPOSITORY_PROXY = ABSENT
REPOSITORY_TLS_OR_CERT_OVERRIDE = ABSENT
```

A future resolver run must still bind the exact effective registry URL, ambient configuration isolation, proxy/TLS state, credential state, redirects, network allowlist, and request evidence. The documented pnpm public-registry default is not by itself permission to perform network resolution.

## 15. Exact canonical package-extension matrix

Canonical 004C1L and 004C1Q own these semantics. The later serializer must encode exactly nine selectors, each at exact version `2.15.0`, with exactly five optional framework peer metadata entries.

Selectors:

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

Semantic value beneath every selector:

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

Canonical counts:

```text
PACKAGE_EXTENSION_SELECTOR_COUNT = 9
FRAMEWORK_PEER_NAMES_PER_SELECTOR = 5
FRAMEWORK_PEER_OMISSION_ENTRY_COUNT = 45
INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
```

No selector widening, wildcard, extra peer, internal-peer omission, dependency override, or framework selection is permitted.

## 16. Semantic object allowed for later serialization

A later exact-byte grain may serialize only the semantic object below, subject to fresh authority:

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
  <exact nine 004C1L selectors>: <exact canonical peerDependenciesMeta values>
```

This block is semantic illustration, not exact future file bytes. It intentionally omits lifecycle allowlists, overrides, supported architectures, optional-dependency suppression, registry/authentication settings, and every other unqualified setting.

## 17. Closed-world serialization rule

The later exact-byte serializer must operate under a closed-world rule:

```text
ALLOWED_TOP_LEVEL_SEMANTIC_KEYS =
  packages
  autoInstallPeers
  strictPeerDependencies
  managePackageManagerVersions
  packageManagerStrict
  packageManagerStrictVersion
  minimumReleaseAge
  blockExoticSubdeps
  packageExtensions

EXTRA_TOP_LEVEL_PROJECT_SETTING = FORBIDDEN_WITHOUT_FRESH_AUTHORITY
```

Defaults or ambient settings that can influence execution remain part of the future resolver evidence contract and may not be silently promoted into repository bytes.

## 18. Exact bytes deliberately unresolved

004C1W does not freeze serialization details:

```text
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
PNPM_WORKSPACE_BYTE_LENGTH = NOT_ESTABLISHED
PNPM_WORKSPACE_SHA256 = NOT_ESTABLISHED
PNPM_WORKSPACE_KEY_ORDER = NOT_ESTABLISHED
PNPM_WORKSPACE_QUOTING = NOT_ESTABLISHED
PNPM_WORKSPACE_INDENTATION = NOT_ESTABLISHED
PNPM_WORKSPACE_LINE_ENDINGS = NOT_ESTABLISHED
PNPM_WORKSPACE_TERMINAL_NEWLINE = NOT_ESTABLISHED
```

No `pnpm-workspace.yaml` file is created in this grain.

## 19. Execution-bearing fields remain fail closed

The following remain outside 004C1W authority:

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
LOCKFILE = NOT_GENERATED
RESOLVED_GRAPH = NOT_GENERATED
PACKAGE_ARCHIVE_IDENTITY_SET = NOT_ESTABLISHED
```

Therefore:

```text
RESOLVER_READINESS = FAIL_CLOSED
DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
```

## 20. Deterministic acceptance criteria

004C1W may close canonically only if:

1. canonical base is exactly `612429c2b2e8e5d848f4eeeb9873e53ef3d06bb5`;
2. base tree is exactly `d41e283c5bbc83fafb673bb8c050fef1740f4a08`;
3. candidate changes exactly this one Signthos-authored planning artifact;
4. canonical workspace membership remains root implicit plus exact `packages/providers` only;
5. peer settings remain exactly `autoInstallPeers=false` and `strictPeerDependencies=true`;
6. package-manager controls remain exactly self-management disabled plus strict package-manager name/version checks;
7. release age remains exactly `10080` minutes with no exclusions;
8. transitive exotic-source policy serializes fail-closed as `blockExoticSubdeps=true`;
9. no dependency lifecycle build allowlist is granted;
10. no repository override is invented;
11. supported-architecture expansion and optional-dependency suppression remain absent from repository settings and future execution remains platform-bound;
12. exact 004C1L/004C1Q package-extension matrix is preserved without drift;
13. no `.npmrc` is reintroduced;
14. no `pnpm-workspace.yaml`, package manifest, lockfile, package, source, fixture, workflow, provenance, database, cache or runtime path is mutated;
15. no package manager, Node, Corepack, resolver, registry, provider or PDF runtime is executed;
16. exact-head Actions/check/provider state is recorded truthfully;
17. fresh independent substantive review covers the exact candidate head/tree;
18. all material findings are repaired forward-only and any changed head receives fresh review;
19. unresolved material review threads are zero;
20. immediate premerge race proof re-verifies all merge-critical state;
21. guarded normal merge uses exact expected head SHA;
22. postmerge verification proves reviewed-head/merge-tree equality and exact one-file surface;
23. fresh Issue #7 reconciliation derives any exact-byte or execution successor rather than assuming it.

## 21. Explicit non-grants

```text
PNPM_WORKSPACE_YAML_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_EXACT_BYTES = NOT_AUTHORIZED
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
NPMRC_REINTRODUCTION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_CREATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_PACKAGE_JSON = NOT_AUTHORIZED
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
CLASSIFIER_RUNTIME_EXECUTION = NOT_AUTHORIZED
STRUCTURAL_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 22. Successor boundary

No successor is implied automatically.

If 004C1W closes canonically, fresh reconciliation must determine whether the next smallest unit is exact `pnpm-workspace.yaml` byte serialization/materialization or whether another prerequisite must close first. Any exact-byte unit must freeze formatting and digest without reopening the semantic object above. Any execution unit remains separately gated by pnpm/Node provisioning, platform, environment, registry/network, cache, writable-surface, command, lockfile, graph and archive evidence requirements.
