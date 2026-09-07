# Specification 004C1F — Repository Package Control Surface Fact Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_DISCOVERY_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `8661f7673a8cd2aa678518f7d26609cc19ed0c09`
Authority source: `github:issue-comment:5569805114`

## 1. Authority boundary

This grain freezes repository-owned package-control facts needed before any later package-manager or workspace decision can be qualified.

```text
004C1F_AUTHORITY = PLANNING_DISCOVERY_QUALIFICATION_ONLY
004C1F_ALLOWED_SURFACE = specs/004-local-pdf-core/**
004C1F_IMPLEMENTATION_AUTHORITY = ABSENT
004C1F_PACKAGE_MANAGER_SELECTION_AUTHORITY = ABSENT
004C1F_PACKAGE_MANAGER_EXECUTION_AUTHORITY = ABSENT
004C1F_COREPACK_EXECUTION_AUTHORITY = ABSENT
004C1F_RESOLVER_EXECUTION_AUTHORITY = ABSENT
004C1F_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1F_DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
004C1F_PACKAGE_MANIFEST_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1F_PACKAGE_ARCHIVE_DOWNLOAD_IMPORT_AUTHORITY = ABSENT
004C1F_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1F_PROVIDER_PDF_RUNTIME_AUTHORITY = ABSENT
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

No package-manager command, Corepack command, resolver run, dependency installation, archive download, manifest/lockfile creation, package-control configuration mutation, provenance mutation, or PDF/provider runtime execution is authorized.

## 2. Exact repository evidence boundary

The fact set in this document is bound only to:

```text
CANONICAL_FACT_BASE = 8661f7673a8cd2aa678518f7d26609cc19ed0c09
CANONICAL_FACT_BASE_TREE = a7196c4ebe194b06effac9a5144f19ed84ee6e0a
```

Repository facts are read from that exact canonical tree. Historical planning documents are context only unless the current tree independently preserves the claimed surface.

No developer-machine package-manager state, globally installed tool, local cache, environment variable, shell configuration, or unstaged file is evidence for this grain.

## 3. Current JavaScript package-control surface

The exact canonical tree establishes:

```text
ROOT_NPMRC = PRESENT
ROOT_NPMRC_BLOB = cbc6b6537fba6c69756ad16e69a35cc056791d99
ROOT_PACKAGE_JSON = ABSENT
PACKAGE_JSON_ANYWHERE = NOT_OBSERVED
ROOT_PACKAGE_LOCK_JSON = ABSENT
ROOT_PNPM_LOCK_YAML = ABSENT
ROOT_YARN_LOCK = ABSENT
ROOT_BUN_LOCK = ABSENT
ROOT_BUN_LOCKB = ABSENT
JS_WORKSPACE_DECLARATION = NOT_OBSERVED
PACKAGES_DIRECTORY = PRESENT
PACKAGES_PRISMA_DIRECTORY = PRESENT
PACKAGES_PRISMA_SCHEMA = PRESENT
PACKAGES_PRISMA_PACKAGE_MANIFEST = NOT_OBSERVED
```

The repository therefore does not presently expose a canonical JavaScript package manifest or lockfile from which a package manager, dependency graph, workspace membership, or installation plan can be derived.

Absence in this exact tree does not prove that a future package manifest is unnecessary. It only proves that none is currently canonical at this fact base.

## 4. Exact `.npmrc` characterization

The canonical root `.npmrc` contains exactly:

```text
legacy-peer-deps = true
prefer-dedupe = true
min-release-age = 7
```

Canonical Specification 002 evidence records this `.npmrc` as an exact imported Documenso path with:

```text
UPSTREAM_REPOSITORY = documenso/documenso
UPSTREAM_COMMIT = 2cac63a000e22422bdea449f68b8025e709aa73a
UPSTREAM_PATH = .npmrc
DESTINATION_PATH = .npmrc
GIT_BLOB = cbc6b6537fba6c69756ad16e69a35cc056791d99
BYTE_SIZE = 65
SHA256 = 409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d
TRANSFORMATION = COPY_EXACT
```

The same canonical predecessor evidence characterized the file as containing no registry URL, credential, token, authentication material, lifecycle command, or executable script.

### Important non-inference

The presence of `.npmrc` does **not** establish:

```text
SIGNTHOS_PACKAGE_MANAGER = npm
SIGNTHOS_PACKAGE_MANAGER_VERSION = ANY_VALUE
COREPACK_STATE = ANY_VALUE
ROOT_JS_WORKSPACE = REPOSITORY_ROOT
ROOT_PACKAGE_MANIFEST_POLICY = REQUIRED
ROOT_LOCKFILE_POLICY = ANY_VALUE
```

`.npmrc` is an npm-compatible configuration artifact. It is not by itself a canonical package-manager selection record, workspace manifest, dependency declaration, lockfile, or resolver execution record.

## 5. Rust tooling is not the JavaScript workspace

The canonical tree contains a separately scoped Rust provenance tool under:

```text
tools/provenance/Cargo.toml
tools/provenance/Cargo.lock
```

Those files establish a Rust package/control surface for the provenance tool only. They do not establish a JavaScript package-manager decision, JavaScript workspace root, JavaScript dependency graph, or PDF-provider dependency authority.

No package ecosystem may silently inherit authority from an unrelated tool subtree.

## 6. Existing `packages/` directory does not establish workspace membership

The canonical tree contains:

```text
packages/prisma/schema.prisma
```

but no observed `package.json` beneath `packages/` at the exact fact base.

Therefore:

```text
PACKAGES_DIRECTORY_IS_JS_WORKSPACE = NOT_ESTABLISHED
PACKAGES_PRISMA_IS_JS_PACKAGE = NOT_ESTABLISHED
ROOT_WORKSPACE_MEMBERSHIP = NOT_ESTABLISHED
```

Directory naming alone is not sufficient to create package/workspace semantics.

## 7. Historical Specification 002 evidence

Specification 002 contains prior npm-policy and workspace/dependency planning artifacts. Those artifacts remain useful provenance and governance history, including the qualified import of `.npmrc`.

However, 004C1F does not promote historical planning choices into current Specification 004 package-manager authority. Current authority remains governed by the exact canonical tree plus live Issue #7 successor state.

In particular:

```text
HISTORICAL_NPM_POLICY = CONTEXT_ONLY_FOR_004C1F_SELECTION
HISTORICAL_WORKSPACE_PLANNING = CONTEXT_ONLY_FOR_004C1F_SELECTION
CURRENT_PACKAGE_MANAGER_SELECTION = NOT_PERFORMED
CURRENT_WORKSPACE_ROOT_SELECTION = NOT_PERFORMED
```

## 8. Decision blockers preserved from 004C1E

The following required 004C1E decision inputs remain unresolved by repository facts alone:

```text
WORKSPACE_ROOT = UNRESOLVED
ROOT_PACKAGE_MANIFEST_POLICY = UNRESOLVED
ROOT_PACKAGE_MANIFEST_PATH = ABSENT
WORKSPACE_MEMBERSHIP_POLICY = UNRESOLVED
SELECTED_PACKAGE_MANAGER = NOT_SELECTED
SELECTED_PACKAGE_MANAGER_VERSION = NOT_SELECTED
PACKAGE_MANAGER_PIN_MECHANISM = NOT_SELECTED
COREPACK_STATE = NOT_SELECTED
COREPACK_VERSION = NOT_SELECTED
COREPACK_PIN_MECHANISM = NOT_SELECTED
COREPACK_PROVISIONING_POLICY = NOT_SELECTED
LOCKFILE_POLICY = NOT_SELECTED
LOCKFILE_PATH = ABSENT
LOCKFILE_FORMAT = NOT_SELECTED
LOCKFILE_OWNERSHIP = UNRESOLVED
PEER_DEPENDENCY_POLICY = NOT_CANONICALLY_DECIDED_FOR_004
OPTIONAL_DEPENDENCY_POLICY = NOT_CANONICALLY_DECIDED_FOR_004
OVERRIDE_RESOLUTION_POLICY = NOT_CANONICALLY_DECIDED_FOR_004
LIFECYCLE_SCRIPT_POLICY = NOT_CANONICALLY_DECIDED_FOR_004
SUPPORTED_PLATFORMS_FOR_JS_RESOLUTION = NOT_CANONICALLY_DECIDED
RUNTIME_VERSION_POLICY = NOT_CANONICALLY_DECIDED
```

The `.npmrc` values may later become inputs to a separately authorized package-manager decision, but they do not resolve these fields automatically.

## 9. Required successor evidence before any resolver execution

A later package/workspace decision grain, if separately authorized, must explicitly reconcile at least:

- whether JavaScript dependency control belongs at repository root or another exact path;
- whether a root manifest is required and, if so, exact intended ownership;
- exact package-manager family and exact version;
- whether Corepack is `NOT_USED` or `USED_PINNED`, including provisioning/network/cache policy if used;
- exact lockfile policy, path, format, and owner;
- workspace membership semantics;
- treatment of canonical `.npmrc` policy values;
- peer, optional, override, and lifecycle-script policy;
- Node/runtime version policy and platform-resolution inputs;
- exact writable surfaces that would require separate mutation authority;
- evidence that the chosen control plane does not silently acquire packages or execute lifecycle code outside explicit authority.

Only after those decisions are canonical may a still-separate resolver-execution unit be considered.

## 10. Current qualification result

```text
004C1F_EXACT_REPOSITORY_FACT_SET = ESTABLISHED_FOR_EXACT_CANONICAL_TREE
004C1F_ROOT_NPMRC_CHARACTERIZATION = ESTABLISHED
004C1F_ROOT_JS_MANIFEST = ABSENT_AT_FACT_BASE
004C1F_JS_LOCKFILE = ABSENT_AT_FACT_BASE
004C1F_JS_WORKSPACE_DECLARATION = NOT_OBSERVED_AT_FACT_BASE
004C1F_PACKAGE_MANAGER_SELECTION = NOT_PERFORMED
004C1F_WORKSPACE_ROOT_SELECTION = NOT_PERFORMED
004C1F_COREPACK_SELECTION = NOT_PERFORMED
004C1F_LOCKFILE_SELECTION = NOT_PERFORMED
004C1F_RESOLVER_EXECUTION = NOT_PERFORMED
004C1F_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1F_IMPLEMENTATION_AUTHORITY = ABSENT
004C1F_RUNTIME_AUTHORITY = ABSENT
```

This is a fact qualification, not a tool choice.

## 11. Successor rule

Canonicalizing 004C1F does not itself authorize:

- npm, pnpm, yarn, bun, Corepack, or any other package-manager selection;
- package-manager provisioning or execution;
- resolver execution;
- `package.json` or workspace-file creation;
- lockfile creation or mutation;
- dependency adoption, download, installation, or lifecycle-script execution;
- archive/source/binary/fixture import;
- provenance/NOTICE/SBOM mutation;
- PDF/provider runtime execution;
- 004C2, 004D, or Specification 005.

After fresh exact-head independent substantive review, guarded merge, post-merge verification, and a fresh governance reread, only a separately authorized bounded successor may freeze an actual package/workspace decision.

## 12. Explicit non-claims

004C1F does not claim that:

- npm is the Signthos package manager;
- `.npmrc` implies npm execution authority;
- a JavaScript workspace already exists;
- the repository root must become a JavaScript workspace;
- `packages/` is automatically workspace membership;
- the existing Prisma schema requires any particular JavaScript package manager;
- a lockfile is unnecessary merely because none exists now;
- historical Specification 002 planning automatically controls Specification 004;
- any dependency graph has been resolved;
- any PDF engine/provider dependency is adopted or runnable.

Unknown or undecided states remain explicit blockers rather than being filled from convention, developer-machine state, or historical intent.