# Specification 004C1D — Package Manager and Workspace Control Surface Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_CONTRACT_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `1b0610c2fef5bdfc294015950df70fbdb72d2f1a`
Authority source: `github:issue-comment:5567900992`

## 1. Authority boundary

This grain qualifies the control-plane contract required before any deterministic package resolver execution.

```text
004C1D_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
004C1D_IMPLEMENTATION_AUTHORITY = ABSENT
004C1D_PACKAGE_MANAGER_EXECUTION_AUTHORITY = ABSENT
004C1D_COREPACK_EXECUTION_AUTHORITY = ABSENT
004C1D_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1D_DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
004C1D_PACKAGE_ARCHIVE_DOWNLOAD_IMPORT_AUTHORITY = ABSENT
004C1D_PACKAGE_MANIFEST_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1D_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1D_PROVIDER_RUNTIME_EXECUTION_AUTHORITY = ABSENT
004C1D_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004C1E_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

No package-manager command, Corepack command, resolver, package installation, archive download, manifest/lockfile mutation, provenance mutation, or runtime execution is authorized by this grain.

## 2. Canonical predecessor state

004C1C closed canonically through PR #108 / merge `1b0610c2fef5bdfc294015950df70fbdb72d2f1a` and preserved:

```text
SIGNTHOS_PACKAGE_MANAGER = NOT_YET_CANONICAL
ROOT_JS_WORKSPACE_CONTROL_SURFACE = UNRESOLVED
ROOT_PACKAGE_MANIFEST = ABSENT_OR_NOT_AUTHORIZED_FOR_MUTATION
LOCKFILE_FORMAT = NOT_SELECTED
OVERRIDE_RESOLUTION_POLICY = NOT_SELECTED
PEER_CONFLICT_POLICY = NOT_SELECTED
OPTIONAL_DEPENDENCY_POLICY = NOT_SELECTED
PLATFORM_RESOLUTION_INPUTS = NOT_SELECTED
004C1C_RESOLVED_INSTALLATION_GRAPH = NOT_ESTABLISHED
004C1C_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
```

004C1D must not reinterpret declared registry metadata as a resolved graph.

## 3. Control-surface decision contract

Before any deterministic resolver run can become merge-critical evidence, a later separately authorized decision must bind all of the following:

```text
PackageControlSurfaceDecision {
  workspaceRoot
  manifestPath
  manifestOwnership
  selectedPackageManager
  selectedPackageManagerVersion
  packageManagerVersionPinMechanism
  corepackState
  corepackVersion
  corepackPinMechanism
  corepackProvisioningMode
  corepackCacheState
  corepackAcquisitionSource
  corepackNetworkPolicy
  lockfilePath
  lockfileFormat
  lockfileOwnership
  workspaceMembershipPolicy
  dependencyDeclarationPolicy
  overrideResolutionPolicy
  peerDependencyPolicy
  optionalDependencyPolicy
  platformOs
  platformCpu
  runtimeVersion
  registryConfigurationPolicy
  lifecycleScriptPolicy
  deterministicResolverCommandShape
  writablePaths
  evidenceDigestBinding
}
```

Every field that affects dependency resolution or package-manager provisioning must be explicit. Unknown fields remain blockers rather than being filled from developer-machine defaults.

For Corepack, the future decision must choose exactly one explicit state:

```text
COREPACK = NOT_USED
```

or a fully pinned used state that records exact Corepack version, pin mechanism, provisioning/activation command mode, cache location and relevant cache state, package-manager acquisition source, and network/download policy. `COREPACK = USED_UNPINNED` is nonqualifying.

## 4. Package-manager selection criteria

A future package-manager selection must be based on repository control-surface compatibility and deterministic evidence, not preference alone.

The decision must evaluate at least:

- whether canonical repository roots already declare a package manager or workspace owner;
- exact package-manager version pinning rather than moving latest behavior;
- whether Corepack is used at all and, if used, its exact version and provisioning behavior;
- whether Corepack can download or switch the package-manager executable and under what explicit network policy;
- lockfile determinism and canonical ownership;
- peer-dependency semantics;
- optional-dependency semantics;
- override/resolution semantics;
- lifecycle/install-script behavior;
- platform-specific dependency resolution;
- offline/reproducible verification options;
- compatibility with repository CI/build conventions when implementation authority later exists.

Candidate families may include npm, pnpm, yarn, bun, or another resolver, but this grain selects none.

```text
SIGNTHOS_PACKAGE_MANAGER = NOT_SELECTED_BY_004C1D
COREPACK_STATE = NOT_SELECTED_BY_004C1D
```

## 5. Workspace-root ownership

A deterministic resolver closure requires one canonical root control surface.

004C1D therefore requires a future decision to identify:

```text
ROOT_JS_WORKSPACE_CONTROL_SURFACE
ROOT_PACKAGE_MANIFEST
ROOT_LOCKFILE
ROOT_WORKSPACE_MEMBERSHIP
ROOT_DEPENDENCY_POLICY_OWNER
```

No nested package manifest may silently become the dependency-policy root merely because a command is executed from that directory.

If multiple candidate roots exist, the ambiguity must be reconciled before resolver execution.

## 6. Exact version and provisioning pinning

A package-manager binary, Corepack provisioning layer, or runtime used for merge-critical resolution evidence must be exact-version-bound where applicable.

Acceptable future evidence must identify:

- exact package-manager name;
- exact package-manager version;
- exact runtime version where behavior depends on it;
- exact package-manager version-pin mechanism such as a repository-owned declaration or separately canonical equivalent;
- explicit Corepack state (`NOT_USED` or pinned `USED`);
- when Corepack is used: exact Corepack version, exact pin mechanism, provisioning/activation mode, cache location and state, package-manager provisioning source, and network/download policy;
- exact resolver command arguments;
- exact registry configuration inputs applicable to resolution.

Moving aliases such as `latest`, environment-dependent global installs, undocumented local defaults, or an unpinned Corepack that may select or download a package-manager executable are nonqualifying.

Corepack execution, activation, preparation, cache mutation, package-manager provisioning, and any network/download behavior remain prohibited until separately authorized.

## 7. Lockfile contract

A future lockfile decision must define:

- one canonical lockfile path;
- one lockfile format/version;
- repository ownership and mutation boundary;
- whether frozen/immutable resolution is required after initial generation;
- deterministic handling of peer and optional dependencies;
- platform-specific entry expectations;
- whether lifecycle scripts affect resolved or installed state;
- exact diff/evidence expectations when the lockfile changes.

004C1D creates or modifies no lockfile.

## 8. Peer, optional and override policy

Resolver semantics are not neutral. Before deterministic closure qualification, the repository must explicitly bind:

```text
PEER_DEPENDENCY_POLICY = UNSELECTED
OPTIONAL_DEPENDENCY_POLICY = UNSELECTED
OVERRIDE_RESOLUTION_POLICY = UNSELECTED
LIFECYCLE_SCRIPT_POLICY = UNSELECTED
```

A later decision must define whether peer conflicts fail closed, how optional dependencies are treated for supported platforms, and whether overrides/resolutions are permitted and how they are evidenced.

## 9. Platform-resolution inputs

Exact resolver evidence must state every platform input that can affect graph shape or package-manager provisioning, including where applicable:

```text
OS
CPU_ARCHITECTURE
RUNTIME_VERSION
PACKAGE_MANAGER_VERSION
COREPACK_STATE
COREPACK_VERSION
COREPACK_PROVISIONING_MODE
COREPACK_CACHE_STATE
COREPACK_ACQUISITION_SOURCE
COREPACK_NETWORK_POLICY
REGISTRY_CONFIGURATION
WORKSPACE_ROOT
ROOT_MANIFEST_DIGEST
LOCKFILE_STATE
OVERRIDES_OR_RESOLUTIONS
PEER_POLICY
OPTIONAL_DEPENDENCY_POLICY
```

No single-platform graph may be generalized to all supported platforms without separate evidence.

## 10. Writable-surface prerequisite

Even after a package manager is selected, dependency resolution or acquisition remains unauthorized until a fresh canonical unit explicitly grants the required writable paths.

Potential future writable surfaces could include a root manifest, workspace declaration, lockfile, Corepack/package-manager cache or provisioning surface, provenance inventory, NOTICE/SBOM outputs, or generated evidence artifacts. None is granted here.

```text
PACKAGE_MANIFEST_WRITABLE_AUTHORITY = ABSENT
LOCKFILE_WRITABLE_AUTHORITY = ABSENT
WORKSPACE_CONFIG_WRITABLE_AUTHORITY = ABSENT
COREPACK_CACHE_WRITABLE_AUTHORITY = ABSENT
PACKAGE_MANAGER_PROVISIONING_WRITABLE_AUTHORITY = ABSENT
PROVENANCE_NOTICE_SBOM_WRITABLE_AUTHORITY = ABSENT
```

## 11. Deterministic resolver evidence contract

A future resolver-closure qualification must bind at minimum:

- exact canonical base/head/tree;
- exact package-manager/runtime versions;
- explicit Corepack state and, when used, exact Corepack version and provisioning behavior;
- exact Corepack cache state, acquisition source, and network/download policy where applicable;
- exact workspace root and root manifest digest;
- exact resolver command and environment inputs;
- exact lockfile input/output digest where applicable;
- exact registry metadata set used;
- resolved package/version graph;
- peer/optional/override decisions;
- platform-specific graph differences;
- lifecycle/install-script characterization;
- exact `dist.integrity`, `dist.shasum`, and tarball identities for the selected graph;
- proof that no unauthorized repository paths changed;
- independent substantive exact-head review and guarded canonicalization.

The resolver run itself and any Corepack/package-manager provisioning require separate authority and are not performed by 004C1D.

## 12. Current qualification result

```text
004C1D_CONTROL_SURFACE_CONTRACT = ESTABLISHED_AS_PLANNING_REQUIREMENT
004C1D_PACKAGE_MANAGER_SELECTION = NOT_PERFORMED
004C1D_COREPACK_STATE_SELECTION = NOT_PERFORMED
004C1D_COREPACK_EXECUTION = NOT_PERFORMED
004C1D_WORKSPACE_ROOT_SELECTION = NOT_PERFORMED
004C1D_LOCKFILE_SELECTION = NOT_PERFORMED
004C1D_RESOLVER_EXECUTION = NOT_PERFORMED
004C1D_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1D_IMPLEMENTATION_AUTHORITY = ABSENT
004C1D_RUNTIME_AUTHORITY = ABSENT
```

## 13. Successor rule

Canonicalizing 004C1D does not itself select a package manager, select or execute Corepack, authorize package-manager provisioning or downloads, authorize resolver execution, install dependencies, create a lockfile, mutate a package manifest, import archive bytes, or authorize 004C2/004D/Specification 005.

After exact-head independent substantive review, guarded merge, post-merge verification, and fresh governance reread, a successor may qualify one bounded control-plane decision or resolver-evidence step only if live canonical truth explicitly authorizes it.

## 14. Explicit non-claims

004C1D does not claim that:

- npm, pnpm, yarn, bun, or any other package manager is selected;
- Corepack is selected, enabled, invoked, activated, prepared, or permitted to provision/download a package manager;
- any package-manager or Corepack command has run;
- any manifest, workspace file, lockfile, Corepack cache, or package-manager provisioning state may be changed;
- any dependency is adopted, acquired, downloaded, installed, imported, or executable;
- any deterministic resolved dependency graph exists;
- any archive/source binding or redistribution closure is complete;
- any PDF/provider runtime is authorized;
- 004C2, 004D, or Specification 005 is authorized.
