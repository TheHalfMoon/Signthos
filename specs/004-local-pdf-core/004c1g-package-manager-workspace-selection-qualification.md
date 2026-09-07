# Specification 004C1G — Package Manager and Workspace Selection Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_DECISION_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `39a780214e0931b40363096e893dff17ac023a54`
Authority source: `github:issue-comment:5572214448`

## 1. Authority boundary

004C1G qualifies a repository-owned planning decision for the future JavaScript package/workspace control plane. It does not execute, provision, install, or mutate that control plane.

```text
004C1G_AUTHORITY = PLANNING_DECISION_QUALIFICATION_ONLY
004C1G_ALLOWED_SURFACE = specs/004-local-pdf-core/**
004C1G_IMPLEMENTATION_AUTHORITY = ABSENT
004C1G_PACKAGE_MANAGER_EXECUTION_AUTHORITY = ABSENT
004C1G_COREPACK_EXECUTION_AUTHORITY = ABSENT
004C1G_RESOLVER_EXECUTION_AUTHORITY = ABSENT
004C1G_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1G_DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
004C1G_DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
004C1G_PACKAGE_MANIFEST_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1G_PACKAGE_ARCHIVE_DOWNLOAD_IMPORT_AUTHORITY = ABSENT
004C1G_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1G_PROVIDER_PDF_RUNTIME_AUTHORITY = ABSENT
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

No package-manager command, Corepack command, resolver run, dependency installation, archive download, cache mutation, manifest/workspace/lockfile mutation, provenance mutation, or PDF/provider runtime execution is authorized.

## 2. Canonical repository inputs

This decision consumes:

- the canonical Constitution and `AGENTS.md` bounded-purpose, exact-evidence, and no-authority-inflation rules;
- Specification 004 `plan.md` package/dependency qualification requirements;
- canonical 004C1E package/workspace decision contract;
- canonical 004C1F exact repository package-control fact qualification;
- historical Specification 002 npm-policy evidence as context only;
- canonical 004C browser-provider planning that records the pinned EmbedPDF v2.15.0 source workspace as pnpm 10.x context, not as Signthos execution authority.

004C1F established at its exact fact base:

```text
ROOT_NPMRC = PRESENT
ROOT_PACKAGE_JSON = ABSENT
PACKAGE_JSON_ANYWHERE = NOT_OBSERVED
ROOT_PACKAGE_LOCK_JSON = ABSENT
ROOT_PNPM_LOCK_YAML = ABSENT
ROOT_YARN_LOCK = ABSENT
ROOT_BUN_LOCK = ABSENT
ROOT_BUN_LOCKB = ABSENT
JS_WORKSPACE_DECLARATION = NOT_OBSERVED
```

The canonical root `.npmrc` contains exactly:

```text
legacy-peer-deps = true
prefer-dedupe = true
min-release-age = 7
```

Those values are evidence inputs. They do not select npm, pnpm, a workspace root, or a lockfile by themselves.

## 3. Fresh candidate evidence

The first 004C1G head selected npm without the comparison required by canonical 004C1E. Independent exact-head review identified that as material. This forward-only repair performs the required bounded comparison before selecting a family.

### Node baseline observation

Fresh first-party Node.js release metadata on 2026-09-07 reports:

```text
NODE_24_LTS = v24.20.0 / Krypton / LTS
NODE_26 = v26.8.1 / Current
```

Node.js guidance says production applications should use an Active LTS or Maintenance LTS line. Therefore the future resolver evidence baseline is selected as Node `24.20.0` LTS, while product/runtime support beyond resolver evidence remains separately qualified.

```text
RESOLVER_NODE_BASELINE = 24.20.0_LTS
PRODUCT_NODE_SUPPORT_POLICY = NOT_ESTABLISHED_BY_004C1G
```

No Node binary is downloaded or executed by this grain.

### pnpm 10.34.5 identity

Fresh first-party pnpm evidence establishes:

```text
PNPM_CANDIDATE_VERSION = 10.34.5
PNPM_GITHUB_TAG = refs/tags/v10.34.5
PNPM_GITHUB_TAG_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
PNPM_RELEASE = IMMUTABLE / NON_PRERELEASE
PNPM_RELEASE_PUBLISHED = 2026-07-10
PNPM_LICENSE = MIT
PNPM_NODE_ENGINE = >=18.12
PNPM_NPM_TARBALL = https://registry.npmjs.org/pnpm/-/pnpm-10.34.5.tgz
PNPM_NPM_SHASUM = 6a91127a7f2ca72fe53bb9ff54883e0c75b22f17
KNOWN_VULNERABILITIES_FROM_CURRENT_NPMSCAN_QUERY = NONE_REPORTED
```

The exact source package manifest at tag `v10.34.5` is independently available from `pnpm/pnpm` and is compatible with the selected Node 24 resolver baseline.

### pnpm v10 control evidence

First-party pnpm v10 documentation at immutable documentation commit `b015f4e6d789d894847e432d0cc771526a55cd27` establishes:

- `pnpm-workspace.yaml` defines the workspace root and explicit included/excluded package paths;
- project settings may be stored in `pnpm-workspace.yaml`, with authorization/registry settings handled through `.npmrc`;
- `autoInstallPeers` defaults to `true` but can be set to `false`;
- `strictPeerDependencies` defaults to `false` but can be enabled so missing/invalid peers fail;
- `managePackageManagerVersions` defaults to `true` and would automatically download/run the `packageManager` version, but can be disabled;
- `packageManagerStrictVersion` can force exact package-manager version equality;
- `onlyBuiltDependencies` is an explicit install-script allowlist, and absent allowlist/deny-list configuration defaults to blocking dependency lifecycle scripts;
- `minimumReleaseAge` exists in pnpm 10 and is expressed in minutes;
- `blockExoticSubdeps` exists in pnpm 10.26+ and can reject transitive git/direct-tarball sources;
- pnpm supports repository-root overrides and deterministic lockfile/workspace resolution.

These are planning facts only. No setting is written or executed here.

### npm comparison identity

For a bounded same-ecosystem comparison, current npm 11-line evidence establishes:

```text
NPM_COMPARISON_VERSION = 11.19.1
NPM_GITHUB_TAG = refs/tags/v11.19.1
NPM_GITHUB_TAG_COMMIT = 3acf9a784798094a5feb43c2e1898429dd667cb6
NPM_LICENSE = Artistic-2.0
NPM_NODE_ENGINE = ^20.17.0 || >=22.9.0
```

npm provides workspaces, a deterministic lockfile family, `npm ci`, registry controls, and lifecycle-script controls. It is a valid candidate family.

However, current canonical `.npmrc` includes:

```text
legacy-peer-deps = true
```

Current first-party npm configuration documentation defines that setting as causing npm to completely ignore `peerDependencies` when building the package tree. That behavior conflicts with the exact peer-closure and fail-closed peer policy required by canonical 004C1B/004C1C and the 004C1E decision contract unless the setting is separately changed before resolver evidence is generated.

The same `.npmrc` contains `min-release-age=7`; npm defines this value in days. pnpm's analogous `minimumReleaseAge` is in minutes, so a later pnpm control-plane mutation must translate the intended seven-day maturity window to `10080` minutes rather than copying the numeric literal `7`.

## 4. Repository-needs comparison

The comparison is limited to the two candidate families with direct canonical relevance: npm from the imported root policy lineage, and pnpm from the exact selected EmbedPDF v2 source-workspace lineage plus current first-party tool evidence. Yarn and Bun remain possible future alternatives but are not selected because current canonical evidence provides no dependency-specific reason to introduce either family before the first 004C provider graph.

| 004C1E criterion | npm 11.x direction | pnpm 10.34.5 direction | Qualification result |
| --- | --- | --- | --- |
| Exact-version pinning | Requires separately controlled npm provisioning coupled to exact Node/tooling inputs | `packageManager` exact pin can be validated with `packageManagerStrictVersion=true`; `managePackageManagerVersions=false` prevents pnpm self-download | pnpm gives a direct fail-closed exact-version contract without ambient self-provisioning |
| Deterministic lockfile | `package-lock.json` supported | `pnpm-lock.yaml` supported | both qualify in principle |
| Workspace semantics | root manifest `workspaces` controls membership | `pnpm-workspace.yaml` explicitly defines workspace root/membership and always includes root | pnpm is more explicit for separating root control plane from provider packages |
| Peer behavior | current canonical `legacy-peer-deps=true` would ignore peers unless separately repaired | `autoInstallPeers=false` plus `strictPeerDependencies=true` supports no-ambient-peer-install and fail-closed internal peer checking | pnpm better matches current 004C peer-governance requirement |
| Optional/platform behavior | supported, but exact policy still must be frozen | supported with explicit `supportedArchitectures` and optional-dependency controls | pnpm exposes an explicit planning surface for later platform evidence |
| Override/resolution behavior | root overrides supported | root `overrides` supported in workspace config | both qualify in principle |
| Lifecycle/install scripts | can be disabled, but exact future policy still required | dependency lifecycle execution is deny-by-default when no allowlist is granted; `onlyBuiltDependencies` provides explicit allowlisting | pnpm fits least-privilege default more directly |
| Frozen/offline verification | `npm ci` and offline/cache modes exist | frozen lockfile/offline modes exist | both qualify in principle; execution remains future evidence |
| Registry behavior | existing `.npmrc` is native npm configuration | pnpm v10 reads `.npmrc` and `pnpm-workspace.yaml`; registry/auth remains `.npmrc` territory | both can consume the existing root registry policy surface without claiming its resolver semantics are already correct |
| Node compatibility | npm 11.19.1 supports selected Node 24 baseline | pnpm 10.34.5 supports Node >=18.12 and therefore selected Node 24 baseline | both compatible |
| Corepack interaction | npm selection does not need Corepack | pnpm can use Corepack, but pnpm itself can also self-manage versions; both automatic provisioning paths are disabled by this decision | pnpm with `COREPACK=NOT_USED` + self-management disabled is deterministic and explicit |
| Resolver evidence binding | possible with exact npm/Node/config inputs | exact pnpm version + explicit workspace config + strict version check + lockfile/config inputs create a compact evidence tuple | pnpm is preferred for the first 004C provider graph |
| Alignment with selected upstream provider | no direct selected-provider package-manager alignment | pinned EmbedPDF v2.15.0 source workspace already uses pnpm 10.x | pnpm reduces package-manager semantic drift from the selected provider source while creating no upstream execution authority |

### Comparison conclusion

Both npm and pnpm are technically capable package managers. npm is not rejected as unsafe in general. It is not selected for the first 004C JavaScript control plane because the current repository's imported npm policy contains peer behavior that must be changed before it can satisfy 004C's exact-peer contract, while pnpm 10 provides explicit controls that satisfy the desired fail-closed posture and aligns with the pinned EmbedPDF v2 source workspace family.

The selected version is intentionally pnpm 10.34.5 rather than a moving `latest`, pnpm 11.26.0, or pnpm 12.3.4. The 10.34.5 release is immutable, non-prerelease, mature relative to the existing seven-day release-age policy, same-major with the pinned EmbedPDF v2 workspace toolchain, and compatible with Node 24 LTS. No claim is made that pnpm 10 must remain selected forever; changing the selection requires a later explicit evidence-backed decision.

## 5. Selected planning direction

```text
SELECTED_PACKAGE_MANAGER_FAMILY = pnpm
SELECTED_PACKAGE_MANAGER_VERSION = 10.34.5
SELECTED_PACKAGE_MANAGER_SOURCE_TAG = pnpm/pnpm@v10.34.5
SELECTED_PACKAGE_MANAGER_SOURCE_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
WORKSPACE_CONTROL_ROOT = REPOSITORY_ROOT
ROOT_PACKAGE_MANIFEST_POLICY = REQUIRED_BEFORE_RESOLVER_EXECUTION
ROOT_PACKAGE_MANIFEST_OWNERSHIP = SIGNTHOS_AUTHORED
PACKAGE_MANAGER_PIN_MECHANISM = ROOT_PACKAGE_JSON_PACKAGE_MANAGER_EXACT_VERSION
COREPACK_POLICY = NOT_USED
PNPM_SELF_MANAGED_VERSION_DOWNLOAD = DISABLED_REQUIRED
PACKAGE_MANAGER_STRICT_VERSION = REQUIRED
LOCKFILE_FAMILY = pnpm-lock.yaml
LOCKFILE_OWNERSHIP = SIGNTHOS_AUTHORED_AT_REPOSITORY_ROOT
RESOLVER_NODE_BASELINE = 24.20.0_LTS
EXISTING_ROOT_NPMRC = PRESERVE_AS_CURRENT_CANONICAL_INPUT_UNTIL_SEPARATELY_AUTHORIZED_RECONCILIATION
```

This is a planning decision only. No selected artifact or setting is created by this grain.

## 6. Workspace/root-manifest decision

The future JavaScript dependency-control root is repository root.

```text
WORKSPACE_CONTROL_ROOT = /
NESTED_IMPLICIT_WORKSPACE_ROOT = PROHIBITED
ROOT_PACKAGE_JSON = REQUIRED_FUTURE_CONTROL_ARTIFACT
ROOT_PNPM_WORKSPACE_YAML = REQUIRED_FUTURE_CONTROL_ARTIFACT
ROOT_PNPM_LOCK_YAML = REQUIRED_FUTURE_RESOLVER_ARTIFACT
ROOT_WORKSPACE_MEMBERSHIP = NOT_YET_AUTHORIZED_FOR_MUTATION
```

`pnpm-workspace.yaml` is selected because pnpm v10 defines it as the workspace-root and explicit membership control file. The root package is always included; provider package membership must be explicit.

Canonical earlier 004C planning identifies:

```text
FUTURE_004C_PROVIDER_PACKAGE_ROOT = packages/providers
```

That path remains a future package-control candidate, not an existing package and not mutation authority. `packages/prisma/` does not automatically become JavaScript workspace membership.

The future root `package.json` must be Signthos-authored and `private`. It must not be copied or mechanically reduced from Documenso. Its exact dependency/scripts/workspaces/engines contents remain a separately authorized mutation decision.

## 7. Corepack and provisioning decision

```text
COREPACK_POLICY = NOT_USED
COREPACK_PROVISIONING = NOT_AUTHORIZED
COREPACK_DOWNLOAD = NOT_AUTHORIZED
PNPM_AUTO_VERSION_DOWNLOAD = PROHIBITED_FOR_MERGE_CRITICAL_RESOLVER_EVIDENCE
```

Rationale:

- Node 24 still documents Corepack as experimental;
- Node documentation states Corepack is no longer distributed beginning with Node 25;
- Corepack may download a requested package manager on demand;
- pnpm v10's own `managePackageManagerVersions=true` default can also auto-download the declared pnpm version.

For deterministic future evidence, neither ambient Corepack provisioning nor pnpm self-download may occur. A later execution/provisioning grain must provide the exact pnpm 10.34.5 binary/package through an explicitly authorized, digest-bound mechanism and must configure equivalent semantics to:

```text
managePackageManagerVersions = false
packageManagerStrict = true
packageManagerStrictVersion = true
```

No provisioning mechanism is authorized by 004C1G.

## 8. Dependency-policy direction

The future resolver control plane must satisfy these planning requirements before execution:

```text
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
FRAMEWORK_PEER_OMISSIONS = EXPLICITLY_QUALIFIED_ONLY
EMBEDPDF_INTERNAL_PEERS = EXACT_AND_PRESENT
OPTIONAL_DEPENDENCIES = FAIL_CLOSED_UNTIL_PLATFORM_MATRIX_IS_EXPLICIT
OVERRIDES = REPOSITORY_OWNED_AND_EVIDENCE_BOUND_ONLY
DEPENDENCY_LIFECYCLE_SCRIPTS = DENY_BY_DEFAULT
EXOTIC_TRANSITIVE_SOURCES = BLOCK_BY_DEFAULT
MINIMUM_RELEASE_AGE = SEVEN_DAYS_EQUIVALENT
NETWORK_REGISTRY = EXPLICIT_AND_EVIDENCE_BOUND
```

For pnpm 10, the seven-day maturity window corresponds to:

```text
minimumReleaseAge = 10080
```

This translation is a future mutation requirement, not an edit to the current `.npmrc`.

The canonical imported `.npmrc` remains untouched in this PR. Before resolver execution, a separately authorized grain must characterize which existing keys pnpm 10 consumes, ignores, or conflicts with and must make any required migration explicit. In particular, `legacy-peer-deps=true` must not be promoted as the Signthos peer policy.

## 9. Lockfile decision

```text
LOCKFILE_POLICY = REQUIRED
LOCKFILE_PATH = /pnpm-lock.yaml
LOCKFILE_FAMILY = pnpm-lock.yaml
LOCKFILE_OWNER = REPOSITORY_ROOT_JS_CONTROL_PLANE
FROZEN_INSTALL_POLICY = REQUIRED_AFTER_INITIAL_CANONICAL_GENERATION
```

The exact lockfile format/version must be observed from the exact future pnpm 10.34.5 resolver execution rather than guessed in advance.

No historical Documenso or external lockfile may be imported as Signthos resolver truth.

## 10. Resolver-critical fields still blocked

004C1G intentionally does not claim resolver readiness. These remain blockers until a separately authorized successor freezes or executes them:

```text
ROOT_MANIFEST_EXACT_CONTENT = NOT_AUTHORIZED
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
ROOT_WORKSPACE_MEMBERSHIP = NOT_AUTHORIZED
EXACT_004C_DEPENDENCY_DECLARATION_SET = NOT_AUTHORIZED_FOR_MANIFEST_MUTATION
EXACT_PNPM_PROVISIONING_MECHANISM = NOT_AUTHORIZED
EXACT_REGISTRY_CONFIGURATION = NOT_FROZEN_FOR_EXECUTION
SUPPORTED_PLATFORM_RESOLVER_MATRIX = NOT_FROZEN
RESOLVER_WRITABLE_PATHS = NOT_AUTHORIZED
CACHE_WRITABLE_PATHS = NOT_AUTHORIZED
NETWORK_ACQUISITION = NOT_AUTHORIZED
PROVENANCE_NOTICE_SBOM_WRITES = NOT_AUTHORIZED
RESOLVER_COMMAND = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
```

## 11. Fail-closed acquisition state

```text
004C1G_PACKAGE_MANAGER_SELECTION = QUALIFIED_CANDIDATE_PENDING_EXACT_HEAD_REVIEW
004C1G_RESOLVER_READINESS = FAIL_CLOSED
004C1G_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1G_PROVIDER_RUNTIME_ELIGIBILITY = FAIL_CLOSED
004C1G_IMPLEMENTATION_AUTHORITY = ABSENT
004C1G_RUNTIME_AUTHORITY = ABSENT
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

A package-manager decision does not authorize package-manager execution. A lockfile selection does not authorize generation. A workspace selection does not authorize creating a manifest or workspace file.

## 12. Required successor qualification

Before any resolver execution or dependency acquisition, a separately authorized successor must bind at minimum:

- exact root `package.json` intended content and digest;
- exact `pnpm-workspace.yaml` intended content and digest;
- exact 004C package membership;
- exact dependency declaration set and versions;
- exact pnpm 10.34.5 provisioning source/digest and no-self-download proof;
- exact Node 24.20.0 resolver binary/source identity or equivalent immutable runtime binding;
- exact registry/auth configuration without credentials in evidence;
- exact peer reconciliation, including framework-peer omissions and internal EmbedPDF peers;
- exact lifecycle-script allowlist, expected to be empty unless separately justified;
- exact optional/platform policy and resolver platform matrix;
- exact override policy;
- exact writable/cache/network surfaces;
- exact evidence-binding procedure for resolver output;
- exact lockfile output plus resolved graph and archive identities;
- proof of zero unauthorized repository mutation.

Whether that successor is planning-only or permits bounded manifest/resolver mutation must be derived fresh after canonical 004C1G closeout; 004C1G itself grants neither.

## 13. Forward-only review repair record

The first head `9de15c8c129f85b8b8eec09d8b65b56196e17a4f` selected npm without the canonical 004C1E candidate-needs comparison. Independent CodeRabbit exact-head review reported one material finding.

This head supersedes that evidence by:

1. adding a bounded npm-versus-pnpm comparison against every material 004C1E criterion;
2. explicitly re-testing the canonical `.npmrc` semantics instead of treating it as selection authority;
3. selecting pnpm 10.34.5 only after immutable release/source/runtime/control evidence;
4. preserving execution, provisioning, resolver, mutation, acquisition, and runtime authority as absent;
5. requiring a completely fresh independent substantive review of the new exact head.

The prior review does not qualify this repaired head.

## 14. Acceptance and qualification evidence

004C1G may close canonically only if:

- canonical `main` remains the exact PR base at the final pre-merge race check;
- final base-to-head surface remains exactly one Signthos-authored planning file under `specs/004-local-pdf-core/**`;
- `git diff --check` equivalent evidence is clean;
- zero package/runtime/dependency/config/workflow/provenance/NOTICE/database bytes enter the PR;
- fresh independent substantive exact-head review reports `NO_MATERIAL_FINDINGS` or equivalent after evaluating the candidate comparison and selected pnpm direction;
- unresolved material review threads are zero;
- workflow/check/provider accounting is truthful;
- merge uses guarded normal merge with exact `expected_head_sha`;
- returned merge object, signature, parents, tree, and canonical surface are verified post-merge;
- Issue #7 plus canonical governance are reread before deriving any successor.

## 15. Explicit non-claims

004C1G does not claim that pnpm, Node, or Corepack is installed or executable in Signthos. It does not claim that a dependency graph or JavaScript workspace exists, that EmbedPDF or any package is adopted, that a lockfile has been generated, that resolver platform parity exists, or that any PDF/provider runtime has executed.

It grants no implementation, package-manager execution, provisioning, resolver, acquisition, runtime, 004C2, 004D, or Specification 005 authority.