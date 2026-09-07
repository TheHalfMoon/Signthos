# Specification 004C1E — Package Manager and Workspace Decision Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_DECISION_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `7445d57535ff8c026dfcf86e334801665a28c6aa`
Authority source: `github:issue-comment:5569392854`

## 1. Authority boundary

This grain qualifies the repository-owned decision surface that must exist before any future deterministic package-resolver execution can be authorized.

```text
004C1E_AUTHORITY = PLANNING_DECISION_QUALIFICATION_ONLY
004C1E_IMPLEMENTATION_AUTHORITY = ABSENT
004C1E_PACKAGE_MANAGER_EXECUTION_AUTHORITY = ABSENT
004C1E_COREPACK_EXECUTION_AUTHORITY = ABSENT
004C1E_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1E_DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
004C1E_RESOLVER_EXECUTION_AUTHORITY = ABSENT
004C1E_PACKAGE_ARCHIVE_DOWNLOAD_IMPORT_AUTHORITY = ABSENT
004C1E_PACKAGE_MANIFEST_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1E_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1E_PROVIDER_RUNTIME_EXECUTION_AUTHORITY = ABSENT
004C1E_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004C1F_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

No package-manager command, Corepack command, resolver run, dependency installation, archive download, manifest/lockfile mutation, cache mutation, provenance mutation, or runtime execution is authorized by this grain.

## 2. Canonical predecessor state

004C1D closed canonically through PR #109 / merge `7445d57535ff8c026dfcf86e334801665a28c6aa` and established the control-surface contract while preserving:

```text
SIGNTHOS_PACKAGE_MANAGER = NOT_SELECTED
COREPACK_STATE = NOT_SELECTED
ROOT_JS_WORKSPACE_CONTROL_SURFACE = UNRESOLVED
ROOT_PACKAGE_MANIFEST = ABSENT_OR_NOT_AUTHORIZED_FOR_MUTATION
LOCKFILE_FORMAT = NOT_SELECTED
PEER_DEPENDENCY_POLICY = UNSELECTED
OPTIONAL_DEPENDENCY_POLICY = UNSELECTED
OVERRIDE_RESOLUTION_POLICY = UNSELECTED
LIFECYCLE_SCRIPT_POLICY = UNSELECTED
004C1D_RESOLVER_EXECUTION = NOT_PERFORMED
004C1D_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
```

004C1E must not reinterpret that contract as execution authority.

## 3. Decision object

A future resolver-authorized grain may proceed only if canonical repository truth has first frozen a complete decision equivalent to:

```text
PackageWorkspaceDecision {
  workspaceRoot
  rootManifestPolicy
  rootManifestPath
  workspaceMembershipPolicy
  selectedPackageManager
  selectedPackageManagerVersion
  packageManagerPinMechanism
  corepackState
  corepackVersion
  corepackPinMechanism
  corepackProvisioningPolicy
  lockfilePolicy
  lockfilePath
  lockfileFormat
  lockfileOwnership
  peerDependencyPolicy
  optionalDependencyPolicy
  overrideResolutionPolicy
  lifecycleScriptPolicy
  registryConfigurationPolicy
  supportedPlatforms
  runtimeVersionPolicy
  writablePathsRequiredForResolver
  writablePathsRequiredForPackageManagerProvisioning
  evidenceBindingPolicy
}
```

Every field that can affect graph shape, package-manager identity, provisioning behavior, or writable repository state is explicit. Unknown values remain blockers.

## 4. Workspace-root decision

The repository must have one canonical JS dependency-control root before any merge-critical resolver evidence is generated.

The decision must establish:

```text
WORKSPACE_ROOT = EXACT_REPOSITORY_PATH
ROOT_PACKAGE_MANIFEST_POLICY = REQUIRED | NOT_REQUIRED_WITH_JUSTIFICATION
ROOT_WORKSPACE_MEMBERSHIP_POLICY = EXPLICIT
ROOT_DEPENDENCY_POLICY_OWNER = EXACT_REPOSITORY_PATH
```

A nested package directory may not silently become the root because a developer executed a command from that directory.

If no root package manifest currently exists, 004C1E records that fact only. It does not create one.

## 5. Package-manager decision criteria

004C1E may qualify a preferred future package-manager decision only as planning evidence. The decision must compare candidates against repository needs rather than preference.

At minimum, evaluate:

- exact-version pinning mechanism;
- deterministic lockfile support;
- workspace semantics;
- peer-dependency conflict behavior;
- optional/platform dependency behavior;
- override/resolution behavior;
- lifecycle/install-script controls;
- frozen/offline verification behavior;
- registry configuration behavior;
- compatibility with supported Node/runtime policy;
- Corepack interaction, if any;
- ability to bind merge-critical evidence to exact resolver inputs.

Candidate families may include npm, pnpm, yarn, bun, or another package manager. 004C1E may record a planning preference only if the repository evidence supports it; it still cannot execute or provision that tool.

## 6. Corepack decision

The decision must choose exactly one future control state:

```text
COREPACK = NOT_USED
```

or

```text
COREPACK = USED_PINNED
```

A `USED_PINNED` decision must specify the exact Corepack version, exact pin mechanism, provisioning/activation mode, package-manager acquisition source, cache policy, and network/download policy.

`COREPACK = USED_UNPINNED` is nonqualifying.

004C1E does not run Corepack and does not populate or mutate any Corepack cache.

## 7. Lockfile decision

Before resolver execution, the repository must decide:

```text
LOCKFILE_POLICY = REQUIRED | NOT_APPLICABLE_WITH_JUSTIFICATION
LOCKFILE_PATH = EXACT_PATH_IF_REQUIRED
LOCKFILE_FORMAT = EXACT_FORMAT_AND_VERSION_IF_REQUIRED
LOCKFILE_OWNER = EXACT_REPOSITORY_CONTROL_SURFACE
FROZEN_INSTALL_POLICY = EXPLICIT
```

The decision must also define how peer, optional, override, and platform-specific entries are treated.

004C1E creates or modifies no lockfile.

## 8. Dependency-policy decisions

The future control plane must bind:

```text
PEER_DEPENDENCY_POLICY
OPTIONAL_DEPENDENCY_POLICY
OVERRIDE_RESOLUTION_POLICY
LIFECYCLE_SCRIPT_POLICY
```

Required properties:

- peer conflicts are either fail-closed or governed by an explicit accepted reconciliation rule;
- optional dependencies cannot silently expand supported-platform claims;
- overrides/resolutions require repository-owned declarations and evidence;
- lifecycle/install scripts default to explicit policy and may not become ambient code execution by accident.

## 9. Registry and platform inputs

The future resolver evidence must freeze every input that can affect graph shape or artifact identity, including:

```text
REGISTRY_CONFIGURATION
OS
CPU_ARCHITECTURE
RUNTIME_VERSION
PACKAGE_MANAGER_VERSION
COREPACK_STATE
WORKSPACE_ROOT
ROOT_MANIFEST_DIGEST
LOCKFILE_STATE
PEER_POLICY
OPTIONAL_POLICY
OVERRIDE_POLICY
LIFECYCLE_SCRIPT_POLICY
```

A graph resolved for one platform cannot be generalized to every supported platform without separate evidence.

## 10. Writable-surface decision

004C1E may identify the exact paths that a later resolver/provisioning unit would need, but it grants no write permission.

Potential categories include:

- root package manifest;
- workspace declaration;
- canonical lockfile;
- package-manager metadata/configuration;
- Corepack/package-manager cache or provisioning surfaces;
- provenance inventory;
- NOTICE/SBOM outputs;
- generated resolver evidence artifacts.

Current authority remains:

```text
PACKAGE_MANIFEST_WRITABLE_AUTHORITY = ABSENT
LOCKFILE_WRITABLE_AUTHORITY = ABSENT
WORKSPACE_CONFIG_WRITABLE_AUTHORITY = ABSENT
COREPACK_CACHE_WRITABLE_AUTHORITY = ABSENT
PACKAGE_MANAGER_PROVISIONING_WRITABLE_AUTHORITY = ABSENT
PROVENANCE_NOTICE_SBOM_WRITABLE_AUTHORITY = ABSENT
```

## 11. Resolver successor prerequisite

A later deterministic resolver-closure unit is eligible for consideration only after 004C1E is canonically closed and live governance separately authorizes execution.

That later unit must bind at minimum:

- exact canonical base/head/tree;
- exact package-manager and runtime versions;
- exact Corepack state and version if used;
- exact workspace root and manifest digest;
- exact registry inputs;
- exact resolver command and environment;
- exact lockfile input/output state where applicable;
- exact writable paths;
- exact resolved graph;
- exact package `dist.integrity`, `dist.shasum`, and tarball identities;
- peer/optional/override decisions;
- platform-specific graph differences;
- lifecycle/install-script characterization;
- proof of zero unauthorized repository mutations;
- exact-head independent substantive review and guarded canonicalization.

No such resolver execution occurs in 004C1E.

## 12. Current qualification result

```text
004C1E_DECISION_CONTRACT = ESTABLISHED_AS_PLANNING_REQUIREMENT
004C1E_WORKSPACE_ROOT_SELECTION = NOT_PERFORMED
004C1E_PACKAGE_MANAGER_SELECTION = NOT_PERFORMED
004C1E_COREPACK_STATE_SELECTION = NOT_PERFORMED
004C1E_LOCKFILE_SELECTION = NOT_PERFORMED
004C1E_RESOLVER_EXECUTION = NOT_PERFORMED
004C1E_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1E_IMPLEMENTATION_AUTHORITY = ABSENT
004C1E_RUNTIME_AUTHORITY = ABSENT
```

## 13. Successor rule

Canonicalizing 004C1E does not itself authorize package-manager/Corepack execution, provisioning, resolver execution, dependency acquisition, lockfile generation, package-manifest mutation, archive import, provenance mutation, provider execution, PDF implementation, 004C2, 004D, or Specification 005.

After exact-head independent substantive review, guarded merge, post-merge verification, and a fresh canonical governance reread, only a separately authorized bounded successor may freeze an actual repository decision or execute deterministic resolver evidence.

## 14. Explicit non-claims

004C1E does not claim that:

- any package manager has been selected or installed;
- Corepack is enabled, disabled, invoked, provisioned, or cached;
- a root package manifest exists or should be created without later authority;
- a lockfile exists or should be generated without later authority;
- npm registry metadata is a resolved installation graph;
- dependency acquisition is safe or authorized;
- any PDF engine/provider dependency is adopted;
- any product/runtime behavior exists.

Unknown evidence remains unknown rather than being inferred from developer-machine state.