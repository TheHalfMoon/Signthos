# Specification 004C1H — Resolver Input Contract Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_CONTRACT_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `1631b8517b008b5bc1ecf1b8033322cd2cb6a62c`
Authority source: `github:issue-comment:5572763689`

## 1. Purpose and authority boundary

004C1H freezes the contract that a future, separately authorized JavaScript dependency resolver unit must satisfy before it may create package-control artifacts, execute pnpm, resolve dependencies, download package archives, or claim a reproducible dependency graph.

```text
004C1H_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
004C1H_ALLOWED_SURFACE = specs/004-local-pdf-core/**
004C1H_IMPLEMENTATION_AUTHORITY = ABSENT
004C1H_PACKAGE_MANAGER_EXECUTION_AUTHORITY = ABSENT
004C1H_COREPACK_EXECUTION_AUTHORITY = ABSENT
004C1H_RESOLVER_EXECUTION_AUTHORITY = ABSENT
004C1H_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1H_DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
004C1H_DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
004C1H_PACKAGE_MANIFEST_WORKSPACE_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1H_PACKAGE_ARCHIVE_DOWNLOAD_IMPORT_AUTHORITY = ABSENT
004C1H_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1H_PROVIDER_PDF_RUNTIME_AUTHORITY = ABSENT
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

No package-manager command, Corepack command, Node resolver execution, registry request, dependency installation, cache mutation, manifest/workspace/lockfile mutation, archive download, provenance mutation, or PDF/provider runtime is authorized by this grain.

## 2. Canonical inputs consumed without reopening

004C1H consumes the canonical decisions already closed by earlier 004C1 grains:

```text
PACKAGE_MANAGER_FAMILY = pnpm
PACKAGE_MANAGER_VERSION = 10.34.5
PACKAGE_MANAGER_SOURCE_TAG = pnpm/pnpm@v10.34.5
PACKAGE_MANAGER_SOURCE_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
RESOLVER_NODE_BASELINE = 24.20.0_LTS
WORKSPACE_CONTROL_ROOT = REPOSITORY_ROOT
ROOT_PACKAGE_MANIFEST_POLICY = REQUIRED_BEFORE_RESOLVER_EXECUTION
ROOT_PACKAGE_MANIFEST_OWNERSHIP = SIGNTHOS_AUTHORED
ROOT_WORKSPACE_CONFIG = pnpm-workspace.yaml
LOCKFILE_FAMILY = pnpm-lock.yaml
LOCKFILE_OWNERSHIP = SIGNTHOS_AUTHORED_AT_REPOSITORY_ROOT
COREPACK_POLICY = NOT_USED
PNPM_SELF_MANAGED_VERSION_DOWNLOAD = DISABLED_REQUIRED
PACKAGE_MANAGER_STRICT_VERSION = REQUIRED
```

004C1H does not change those decisions. It defines the minimum exact evidence tuple required before any future execution can rely on them.

## 3. Resolver evidence object

A future resolver run must be represented by one immutable evidence object. At minimum it must bind:

```text
ResolverEvidence {
  canonical_base_commit
  canonical_base_tree
  package_manager_name
  package_manager_version
  package_manager_source_identity
  package_manager_distribution_identity
  package_manager_binary_or_entrypoint_digest
  node_version
  node_distribution_identity
  node_binary_digest
  platform_os
  platform_arch
  environment_allowlist
  environment_digest
  root_manifest_path
  root_manifest_sha256
  workspace_config_path
  workspace_config_sha256
  npmrc_path
  npmrc_sha256
  dependency_declaration_digest
  workspace_membership_digest
  resolver_policy_digest
  registry_policy_digest
  network_policy_digest
  cache_policy_digest
  writable_surface_digest
  command_argv_digest
  execution_start_state_digest
  lockfile_path
  lockfile_sha256
  resolved_graph_digest
  package_archive_identity_digest
  execution_end_state_digest
  unauthorized_mutation_count
}
```

Every field that can affect dependency resolution must be either exact and evidence-bound or explicitly absent with a reason. Ambient host state must not silently participate.

## 4. Root manifest contract

Before resolver execution, a separately authorized unit must create or otherwise establish one exact Signthos-authored repository-root `package.json` and bind its complete bytes by digest.

Minimum required properties are:

```text
name = Signthos-owned stable package-control identifier
private = true
packageManager = pnpm@10.34.5
engines.node = exact policy compatible with RESOLVER_NODE_BASELINE
scripts = explicit allowlist only
workspaces = not used as an implicit second workspace-control source
```

The exact `name`, `version` presence/absence, `type`, `engines`, `scripts`, dependency sections, and any pnpm-specific fields are not authorized by 004C1H. They must be frozen by a later mutation-authorizing unit before creation.

The manifest must not be copied from Documenso or another upstream project and must not import unrelated dependencies, scripts, tooling, telemetry, postinstall behavior, or workspace topology.

## 5. Workspace configuration contract

A future root `pnpm-workspace.yaml` must be Signthos-authored, repository-root owned, and digest-bound before resolver execution.

It must explicitly encode:

```text
workspace root = repository root
implicit nested workspace roots = prohibited
package membership = explicit allowlist
packages/prisma = not implicitly included
provider package roots = included only after separately authorized creation
```

The exact membership list is unresolved at 004C1H because current canonical authority has not yet created JavaScript provider packages.

```text
ROOT_WORKSPACE_MEMBERSHIP = UNRESOLVED_FAIL_CLOSED
```

Resolver execution must not begin while membership is unresolved.

## 6. Dependency declaration contract

The future resolver input must include an exact declaration set with, for each direct dependency:

```text
package name
exact declared version or exact allowed range
classification = runtime | development | peer | optional
purpose
owning 004C capability grain
source of version authority
license evidence reference
registry metadata evidence reference
expected package/source identity reference
```

No moving tags, unbounded `latest`, git branch references, mutable URLs, or direct local-path substitutions may be used in merge-critical resolver evidence.

For the selected EmbedPDF browser-provider line, declaration authority remains separate from 004C1H. 004C1H does not add `@embedpdf/*` packages to any manifest.

## 7. Peer dependency contract

Before execution, the future resolver policy must freeze all peer-affecting settings and expected peer ownership.

Required posture:

```text
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
LEGACY_PEER_DEPS_SEMANTICS = PROHIBITED_FOR_CANONICAL_PNPM_RESOLUTION
FRAMEWORK_PEER_OMISSIONS = EXPLICITLY_QUALIFIED_ONLY
INTERNAL_EMBEDPDF_PEERS = EXACT_AND_PRESENT
```

Any peer that would otherwise be satisfied by ambient workspace state, automatic installation, or undeclared host packages must fail closed.

## 8. Optional and platform-dependent dependency contract

Optional dependencies and platform-selective packages may affect the resolved graph. A future resolver run therefore must bind an explicit target matrix.

At minimum:

```text
TARGET_OS = exact
TARGET_ARCH = exact
NODE_VERSION = exact
OPTIONAL_DEPENDENCY_POLICY = exact
SUPPORTED_ARCHITECTURES_POLICY = exact-or-absent
CPU_LIBC_RELEVANT_INPUTS = exact-or-not-applicable
```

A graph resolved for one target tuple must not be represented as universal cross-platform truth.

## 9. Override and exotic-source contract

Repository-owned overrides must be explicit, justified, and included in the resolver-policy digest. Silent overrides inherited from upstream packages are not permitted as repository policy.

The future resolver configuration must default to rejecting or separately qualifying transitive dependencies sourced from mutable git references, direct remote tarballs, or other exotic non-registry sources.

```text
EXOTIC_TRANSITIVE_SOURCE_DEFAULT = FAIL_CLOSED
OVERRIDES = EXPLICIT_REPOSITORY_OWNED_ONLY
```

Any exception requires a separately evidence-bound source identity, immutable revision, archive digest, license, and provenance path.

## 10. Lifecycle script contract

Dependency lifecycle scripts are authority-bearing execution and must not run implicitly during dependency qualification.

Required default:

```text
DEPENDENCY_LIFECYCLE_SCRIPTS = DENY_BY_DEFAULT
ALLOWED_BUILD_DEPENDENCIES = EMPTY_UNLESS_SEPARATELY_QUALIFIED
ROOT_INSTALL_HOOKS = NONE_UNLESS_SEPARATELY_QUALIFIED
```

If any package later requires a build/install lifecycle script, that package and script require an explicit bounded security review and a separately authorized execution surface before resolver/install evidence can count as canonical.

## 11. Release-age and registry contract

The intended seven-day maturity policy is preserved as a semantic requirement, not by copying the current npm numeric literal.

For pnpm policy:

```text
MINIMUM_RELEASE_AGE_MINUTES = 10080
```

Before execution, the future control-plane mutation must reconcile the existing `.npmrc` and determine exactly which keys pnpm consumes, ignores, supersedes, or conflicts with. The current `.npmrc` must not be silently treated as already-correct pnpm resolver policy.

Registry inputs must be explicit and evidence-bound:

```text
REGISTRY_BASE_URL = exact
REGISTRY_AUTH_SOURCE = none for public packages unless separately authorized
REGISTRY_MIRROR = prohibited unless separately qualified
REGISTRY_RESPONSE_EVIDENCE = captured without credentials or secrets
SILENT_FALLBACK_REGISTRY = prohibited
```

004C1H authorizes no network access.

## 12. Package-manager provisioning contract

The future resolver unit may not rely on ambient Corepack or pnpm self-provisioning.

It must establish before execution:

```text
COREPACK = NOT_USED
PNPM_VERSION = 10.34.5
PNPM_SELF_MANAGED_VERSION_DOWNLOAD = disabled
PNPM_EXECUTABLE_OR_PACKAGE_IDENTITY = exact
PNPM_EXECUTABLE_OR_PACKAGE_SHA256 = exact
PROVISIONING_SOURCE = exact
PROVISIONING_NETWORK_BEHAVIOR = exact
```

The mechanism that places pnpm 10.34.5 into the execution environment is not selected or authorized by 004C1H.

## 13. Node provisioning contract

The selected resolver baseline is Node 24.20.0 LTS. A future execution unit must bind the exact Node distribution artifact, official source location, archive digest, extracted executable digest, platform tuple, and execution path.

Ambient `node` on `PATH` does not qualify unless its identity is mechanically proven equal to the authorized artifact.

004C1H performs no Node download or execution.

## 14. Environment contract

Resolver evidence must use an explicit environment allowlist. At minimum, the future unit must account for variables that can alter pnpm, npm-compatible registry behavior, proxying, TLS, certificates, home/cache paths, platform selection, scripts, and network behavior.

Unlisted environment variables must either be removed from the child process or proven non-influential.

Secrets must never be copied into resolver evidence artifacts.

## 15. Cache contract

Cache/store state affects offline and repeatability claims. A future resolver run must declare one of two modes:

```text
MODE_A = empty isolated store/cache with network explicitly authorized
MODE_B = immutable pre-populated store/cache with every artifact digest-bound
```

An unverified ambient pnpm store, npm cache, user home directory, or global package cache must not participate in canonical evidence.

Cache paths and pre/post state digests must be recorded.

## 16. Network contract

No-silent-network remains mandatory.

A future resolver unit must separately authorize and record:

```text
allowed hosts
allowed schemes
redirect policy
proxy policy
DNS assumptions
TLS verification policy
request purpose
request/response evidence boundaries
credential policy
retry policy
timeout policy
```

Any request outside the allowlist must fail closed. Resolver success with unrecorded network access does not qualify.

004C1H itself performs no network execution.

## 17. Writable-surface contract

Before execution, the future unit must enumerate every path that pnpm or Node may write.

Expected writable classes may include only separately authorized locations such as:

```text
root manifest/workspace files when explicitly authorized
root lockfile
isolated pnpm store/cache
bounded temporary directory
bounded evidence output directory
```

Unexpected writes anywhere else in the repository or host-controlled locations must fail qualification.

## 18. Command contract

The exact resolver command and arguments must be captured before execution and included in the evidence digest.

The command must be non-interactive, exact-version-bound, and must not permit package-manager self-update, Corepack provisioning, lifecycle execution, implicit workspace discovery, or uncontrolled configuration discovery.

The exact command is intentionally `UNRESOLVED_FAIL_CLOSED` in 004C1H because no resolver execution is authorized.

## 19. Lockfile evidence contract

A future canonical `pnpm-lock.yaml` must be generated only from the exact frozen input tuple and then bound by SHA-256.

The future unit must record:

```text
lockfile path
lockfile byte length
lockfile sha256
observed lockfile schema/version
exact generating pnpm version
exact generating Node version
exact manifest/workspace/config digests
exact platform tuple
```

No external or historical lockfile may be imported as Signthos resolver truth.

The lockfile format/version must be observed from the authorized execution, not guessed by 004C1H.

## 20. Resolved graph contract

Canonical resolver evidence must derive a normalized resolved graph from the generated lockfile and/or resolver output.

For every resolved node it must bind at minimum:

```text
package name
resolved version
registry or qualified source identity
integrity
shasum where available
tarball URL where applicable
dependency edges
peer edges
optional/platform qualifiers
license evidence reference
```

The graph digest must be deterministic under a documented normalization procedure.

A declared dependency map is not equivalent to this resolved graph.

## 21. Package archive identity contract

Every registry archive admitted by a future resolver must have an exact package/version identity and cryptographic integrity from authoritative registry metadata. Where SHA-256 is not the registry-native integrity algorithm, the future acquisition unit must additionally compute and record a local SHA-256 over the exact downloaded bytes.

Registry metadata alone does not prove archive-to-pinned-source equivalence. Any source-binding claim requires separate evidence comparing the exact published archive contents/identity to the authorized source revision.

## 22. Zero-unauthorized-mutation proof

A future resolver unit must prove that its execution changed only explicitly authorized paths.

At minimum it must capture repository tree/worktree state before and after execution and classify every changed/untracked path.

```text
UNAUTHORIZED_MUTATION_COUNT = 0 required
```

A successful resolver exit code with unexplained writes is a qualification failure.

## 23. Determinism and replay contract

A future resolver qualification must demonstrate that the frozen input tuple produces the same canonical lockfile and normalized resolved-graph digests on repeated isolated execution for the same target platform tuple.

Cross-platform equality must not be assumed. If platform-specific optional dependencies change the graph, each platform requires its own evidence tuple and explicit convergence policy.

## 24. Failure contract

The future resolver unit must fail closed if any of the following is unknown or divergent:

- package-manager or Node identity;
- manifest/workspace/config digest;
- dependency declaration set;
- workspace membership;
- peer policy;
- optional/platform policy;
- override or exotic-source policy;
- lifecycle-script policy;
- release-age/registry policy;
- environment allowlist;
- cache state;
- network allowlist;
- writable surface;
- command identity;
- lockfile digest;
- resolved graph digest;
- archive identity set;
- mutation accounting.

No partial resolver result may be promoted to canonical dependency truth.

## 25. Current unresolved fields

004C1H intentionally leaves the execution-bearing values below unresolved:

```text
ROOT_MANIFEST_EXACT_CONTENT = NOT_AUTHORIZED
ROOT_MANIFEST_SHA256 = NOT_ESTABLISHED
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
PNPM_WORKSPACE_SHA256 = NOT_ESTABLISHED
ROOT_WORKSPACE_MEMBERSHIP = UNRESOLVED_FAIL_CLOSED
EXACT_DEPENDENCY_DECLARATION_SET = NOT_AUTHORIZED
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

Therefore:

```text
004C1H_RESOLVER_READINESS = FAIL_CLOSED
004C1H_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
```

## 26. Acceptance criteria

004C1H may close canonically only if:

- the candidate remains one Signthos-authored planning/contract file under `specs/004-local-pdf-core/**`;
- no package manager, Node, Corepack, resolver, registry, provider, or PDF engine is executed;
- no dependency is adopted, acquired, installed, or imported;
- no `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `.npmrc`, cache, provenance, NOTICE, SBOM, source/runtime, workflow, database, or deployment surface is mutated;
- the contract binds every material resolver-affecting input class without pretending unresolved values are known;
- all execution-bearing values remain fail closed;
- fresh independent substantive exact-head review reports no material findings;
- unresolved material review threads are zero;
- workflow/check/provider accounting is truthful;
- guarded normal merge uses exact `expected_head_sha`;
- merge SHA, signature, ordered parents, tree, and canonical surface are mechanically verified post-merge.

## 27. Required successor reconciliation

After canonical 004C1H closeout, governance must be reread before authorizing any mutation or resolver execution.

A possible later unit may qualify exact root-manifest/workspace/config bytes and execution inputs, but 004C1H does not authorize that unit by name, numbering, or implication.

No successor may execute pnpm, Node, Corepack, contact registries, create a lockfile, download packages, or mutate package-control files unless fresh canonical authority explicitly permits those exact actions.

## 28. Explicit non-claims

004C1H does not claim resolver readiness, package-manager availability, Node availability, workspace existence, dependency adoption, registry reachability, lockfile generation, archive acquisition, source/archive equivalence, platform convergence, provider readiness, PDF runtime readiness, 004C2 readiness, 004D readiness, or Specification 005 authority.