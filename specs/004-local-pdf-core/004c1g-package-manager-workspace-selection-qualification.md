# Specification 004C1G — Package Manager and Workspace Selection Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_DECISION_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `39a780214e0931b40363096e893dff17ac023a54`
Authority source: `github:issue-comment:5572214448`

## 1. Authority boundary

004C1G qualifies a repository-owned planning decision for the future JavaScript package/workspace control plane. It does not execute or provision that control plane.

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

No package-manager command, Corepack command, resolver run, dependency installation, archive download, cache mutation, manifest/lockfile mutation, provenance mutation, or PDF/provider runtime execution is authorized.

## 2. Canonical inputs

This decision consumes only canonical repository evidence available at the predecessor main:

- Constitution and `AGENTS.md` bounded-purpose, exact-evidence, and no-authority-inflation rules;
- Specification 004 `plan.md` package/dependency qualification requirements;
- 004C1E decision-object/control-surface contract;
- 004C1F exact repository package-control fact qualification;
- historical Specification 002 npm-policy records as context, not as current execution authority.

004C1F established:

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

The root `.npmrc` is canonical and contains exactly:

```text
legacy-peer-deps = true
prefer-dedupe = true
min-release-age = 7
```

Specification 002 records that file as an exact imported Documenso npm project-resolution policy seed, but 004C1G does not inherit upstream workspace or runtime authority from that history.

## 3. Selected planning direction

The qualified future control-plane direction is:

```text
SELECTED_PACKAGE_MANAGER_FAMILY = npm
WORKSPACE_CONTROL_ROOT = REPOSITORY_ROOT
ROOT_PACKAGE_MANIFEST_POLICY = REQUIRED_BEFORE_RESOLVER_EXECUTION
ROOT_PACKAGE_MANIFEST_OWNERSHIP = SIGNTHOS_AUTHORED
COREPACK_POLICY = NOT_USED_FOR_NPM_SELECTION
LOCKFILE_FAMILY = package-lock.json
LOCKFILE_OWNERSHIP = SIGNTHOS_AUTHORED_AT_REPOSITORY_ROOT
EXISTING_ROOT_NPMRC_POLICY = PRESERVE_UNCHANGED_UNLESS_SEPARATELY_AUTHORIZED
```

This is a planning decision only. None of the selected artifacts is created by this grain.

### Why npm

The npm family is selected because it is the narrowest direction consistent with current canonical evidence:

1. the repository already contains a canonical npm-compatible root `.npmrc` whose three policies are explicitly characterized;
2. Specification 002 independently characterized that artifact specifically as an npm project-resolution policy seed;
3. selecting npm avoids introducing an additional package-manager-specific workspace/configuration surface solely to reach the first deterministic JavaScript dependency graph;
4. npm's root-manifest and `package-lock.json` control model can be made explicit in a later bounded Signthos-authored mutation grain;
5. this selection does not import Documenso's historical `package.json`, `package-lock.json`, workspaces, scripts, dependencies, or runtime assumptions.

The selection is not justified by popularity, developer-machine state, a globally installed tool, or the presence of `.npmrc` alone. It is the result of the combined current fact base plus the repository's already-canonical npm policy lineage.

## 4. Workspace decision

The future JavaScript dependency-control root is selected as repository root because the existing canonical npm policy artifact is already root-scoped and Specification 004's candidate browser/provider dependencies are repository-level product concerns rather than a Rust provenance-tool concern.

```text
WORKSPACE_CONTROL_ROOT = /
NESTED_IMPLICIT_WORKSPACE_ROOT = PROHIBITED
PACKAGES_DIRECTORY_MEMBERSHIP = NOT_YET_DECLARED
ROOT_WORKSPACES_FIELD_POLICY = NOT_YET_DECIDED
```

The existing `packages/` directory does not automatically become an npm workspace. Any future workspace membership must be explicit in a separately authorized manifest decision/mutation.

## 5. Root manifest decision

A root `package.json` is required before any resolver execution because a deterministic Signthos-owned dependency declaration cannot otherwise be bound to an exact repository path and reviewed independently.

The future manifest must be Signthos-authored. It must not be copied or mechanically reduced from Documenso's historical root manifest.

004C1G does not decide the manifest's dependency set, scripts, workspaces, engines field, package metadata, or package-manager version field. Those remain later bounded decisions.

## 6. Lockfile decision

For the selected npm family, the future canonical lockfile family is:

```text
package-lock.json
```

The lockfile must be generated only in a separately authorized resolver grain from an exact manifest, exact npm version, exact Node/runtime input, exact registry configuration, exact platform inputs, and explicit lifecycle/peer/optional/override policies.

No historical Documenso lockfile may be imported or used as the Signthos resolved graph by implication.

## 7. Corepack decision

For this npm-family selection:

```text
COREPACK_POLICY = NOT_USED_FOR_NPM_SELECTION
COREPACK_PROVISIONING = NOT_AUTHORIZED
COREPACK_DOWNLOAD = NOT_AUTHORIZED
```

A later canonical authority may amend this if the selected supported runtime/toolchain requires a different control mechanism. Until then, Corepack is not part of the merge-critical npm selection path.

## 8. Resolver-critical fields still unresolved

004C1G intentionally does not claim resolver readiness. The following remain blockers:

```text
EXACT_NPM_VERSION = NOT_SELECTED
EXACT_NODE_VERSION_POLICY = NOT_SELECTED
ROOT_MANIFEST_CONTENT = NOT_AUTHORIZED
ROOT_WORKSPACE_MEMBERSHIP = NOT_SELECTED
EXACT_DEPENDENCY_SET = NOT_AUTHORIZED
PEER_DEPENDENCY_POLICY = REQUIRES_EXPLICIT_RECONCILIATION_WITH_ROOT_NPMRC
OPTIONAL_DEPENDENCY_POLICY = NOT_SELECTED
OVERRIDE_RESOLUTION_POLICY = NOT_SELECTED
LIFECYCLE_SCRIPT_POLICY = NOT_SELECTED
REGISTRY_CONFIGURATION_POLICY = NOT_FULLY_SELECTED
SUPPORTED_PLATFORM_INPUTS = NOT_SELECTED
RESOLVER_WRITABLE_PATHS = NOT_AUTHORIZED
NETWORK_ACQUISITION_POLICY = NOT_AUTHORIZED
```

The existing `.npmrc` values are inputs to these later decisions, not substitutes for explicit resolver authority.

## 9. Fail-closed acquisition state

```text
004C1G_RESOLVER_READINESS = FAIL_CLOSED
004C1G_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1G_RUNTIME_ELIGIBILITY = FAIL_CLOSED
```

A selected package-manager family does not authorize dependency acquisition. A selected lockfile family does not authorize generating a lockfile. A selected workspace-control root does not authorize creating a manifest.

## 10. Required successor qualification

Before any resolver execution or dependency acquisition, a separately authorized successor must freeze at minimum:

- exact supported Node/runtime version policy;
- exact npm version and pin mechanism;
- exact future root-manifest schema/content boundary;
- exact workspace membership decision;
- explicit reconciliation of `legacy-peer-deps`, `prefer-dedupe`, and `min-release-age` with merge-critical resolver behavior;
- lifecycle/install-script policy;
- optional/platform dependency policy;
- override policy;
- registry/network policy;
- exact writable/cache surfaces;
- exact evidence-binding procedure for resolver output.

That successor remains planning/qualification unless canonical authority explicitly permits execution or mutation.

## 11. Acceptance and qualification evidence

004C1G may close canonically only if:

- canonical main remains the exact PR base at pre-merge race check;
- the diff remains Signthos-authored planning content under `specs/004-local-pdf-core/**` only;
- zero package/runtime/dependency/config/workflow/provenance/NOTICE/database bytes enter the PR;
- independent substantive exact-head review reports no unresolved material findings;
- unresolved material review threads are zero;
- workflow/check/provider accounting is truthful;
- merge uses guarded normal merge with exact expected head;
- returned merge object, signature, parents, tree, and canonical surface are verified post-merge;
- Issue #7 is reread before deriving any successor.

## 12. Explicit non-claims

004C1G does not claim that npm is installed, available, secure for all future use, or already pinned. It does not claim that a dependency graph exists, that EmbedPDF or any other package is adopted, that a lockfile is reproducible, or that any JavaScript runtime is supported.

It grants no implementation, resolver, acquisition, runtime, 004C2, 004D, or Specification 005 authority.