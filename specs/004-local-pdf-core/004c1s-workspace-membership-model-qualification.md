# Specification 004C1S — Workspace Membership Model Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_WORKSPACE_MEMBERSHIP_ONLY / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `7082649e95870061c835ca3c70fc9407f1607b56`
Canonical predecessor tree: `870ad7e9b14515cc8c8f9f6cded3e07924ea5e80`
Authority source: `github:issue-comment:5588013877`

## 1. Purpose and authority boundary

004C1S qualifies only the future pnpm workspace-membership model needed for the first reusable Signthos PDF provider package.

The canonical content-identity/admission sequence now has exact synthetic seed fixture bytes, but a meaningful executable and testable implementation still requires an explicitly owned package boundary. Canonical 004C1 planning already fixes that future package root as `packages/providers`; canonical 004C1Q explicitly leaves workspace membership unresolved and fail closed.

```text
004C1S_AUTHORITY = PLANNING_WORKSPACE_MEMBERSHIP_QUALIFICATION_ONLY
004C1S_CANONICAL_BASE = 7082649e95870061c835ca3c70fc9407f1607b56
004C1S_ALLOWED_PATH = specs/004-local-pdf-core/004c1s-workspace-membership-model-qualification.md
004C1S_MAX_CHANGED_FILES = 1
```

This grain creates no `pnpm-workspace.yaml`, package, lockfile, dependency, source implementation, fixture, workflow, provenance record, database change, or runtime evidence.

## 2. Canonical predecessor contracts consumed without reopening

004C1S consumes these canonical decisions:

```text
SELECTED_PACKAGE_MANAGER_FAMILY = pnpm
SELECTED_PACKAGE_MANAGER_VERSION = 10.34.5
WORKSPACE_CONTROL_ROOT = REPOSITORY_ROOT
ROOT_PACKAGE_MANIFEST_POLICY = REQUIRED_BEFORE_RESOLVER_EXECUTION
ROOT_PACKAGE_MANIFEST_OWNERSHIP = SIGNTHOS_AUTHORED
LOCKFILE_FAMILY = pnpm-lock.yaml
FUTURE_004C_PROVIDER_PACKAGE_ROOT = packages/providers
PACKAGE_EXTENSION_CONTROL_FILE = /pnpm-workspace.yaml
PACKAGE_EXTENSION_ROOT_KEY = packageExtensions
PACKAGE_EXTENSION_SEMANTICS = CANONICAL_004C1L
```

004C1S does not reopen:

- the package-manager family or version;
- the root `package.json` semantic or byte identity;
- the selected EmbedPDF dependency declarations;
- package-extension selectors or values;
- the package-extension serialization location;
- content-identity/admission semantics;
- fixture identities or expectations;
- provider selection, dependency adoption, or runtime behavior.

## 3. Fresh repository truth

At canonical `main@7082649e95870061c835ca3c70fc9407f1607b56`:

```text
ROOT_PACKAGE_JSON = PRESENT
ROOT_PACKAGE_JSON_BYTE_LENGTH = 509
ROOT_PACKAGE_JSON_PACKAGE_MANAGER = pnpm@10.34.5
ROOT_PNPM_WORKSPACE_YAML = ABSENT
ROOT_PNPM_LOCK_YAML = ABSENT
ROOT_NPMRC = PRESENT
PACKAGES_DIRECTORY = PRESENT
PACKAGES_PRISMA = PRESENT
PACKAGES_PROVIDERS = ABSENT
```

`packages/prisma/` contains exactly the imported `schema.prisma` artifact and no `package.json`. It is therefore not an established JavaScript package and receives no pnpm workspace membership by directory-name inference.

No `apps/web`, `packages/editor`, or `packages/testkit` directory is present on this canonical base.

## 4. Membership ownership model

The future pnpm workspace has two distinct membership classes:

```text
WorkspaceMembershipClass =
  | ROOT_IMPLICIT_MEMBER
  | EXPLICIT_NON_ROOT_MEMBER
```

The repository root is the pnpm workspace control root and root package. It is not represented as an invented `packages:` entry merely to restate pnpm root semantics.

The first non-root member qualified by 004C1S is exactly:

```text
EXPLICIT_NON_ROOT_MEMBER_1 = packages/providers
```

No other non-root member is qualified by this grain.

## 5. Canonical first membership set

004C1S qualifies the semantic membership set for the first provider-control plane as:

```text
ROOT_IMPLICIT_MEMBER = /
EXPLICIT_NON_ROOT_MEMBER_COUNT = 1
EXPLICIT_NON_ROOT_MEMBERS = [packages/providers]
```

A future `pnpm-workspace.yaml` semantic object may therefore contain a `packages` list equivalent to:

```yaml
packages:
  - packages/providers
```

This YAML fragment is semantic illustration only. 004C1S does not freeze quoting, indentation, key order, line endings, comments, complete file content, byte length, or digest.

## 6. Why exact-path membership is required

Broad membership patterns are rejected for the first provider-control plane.

```text
packages/* = FORBIDDEN_BY_004C1S
packages/** = FORBIDDEN_BY_004C1S
apps/* = FORBIDDEN_BY_004C1S
apps/** = FORBIDDEN_BY_004C1S
** = FORBIDDEN_BY_004C1S
```

Reasons:

1. `packages/prisma` is not an established JavaScript package and must not become workspace membership by glob side effect;
2. future packages must not become resolver inputs merely because a directory is created under `packages/`;
3. the first 004C implementation boundary is already canonically proposed as `packages/providers`;
4. exact-path membership keeps package-control evidence minimal and reviewable;
5. later product/editor/testkit packages require their own ownership and dependency evidence before joining the workspace.

## 7. `packages/prisma` disposition

Current state:

```text
PATH = packages/prisma
CURRENT_CONTENT = schema.prisma_ONLY
PACKAGE_JSON = ABSENT
JAVASCRIPT_PACKAGE_IDENTITY = ABSENT
WORKSPACE_MEMBERSHIP = EXCLUDED
```

004C1S does not alter the Prisma schema, database model, migration state, or Specification 003 persistence contracts.

A future package may wrap Prisma tooling only under separately authorized package/runtime/database governance. The current directory name alone creates no membership entitlement.

## 8. Absent future topology disposition

Foundation architecture mentions future product/package areas including browser UI, editor, provider, and testkit surfaces. Directory planning does not create membership.

For this first workspace membership model:

```text
apps/web = EXCLUDED_NOT_PRESENT_NOT_AUTHORIZED
packages/editor = EXCLUDED_NOT_PRESENT_NOT_AUTHORIZED
packages/testkit = EXCLUDED_NOT_PRESENT_NOT_AUTHORIZED
all_other_apps = EXCLUDED
all_other_packages = EXCLUDED
```

Adding any later non-root workspace member requires fresh canonical authority and a deliberate membership update.

## 9. Provider package existence gate

004C1S qualifies future membership semantics without creating the member package.

```text
PACKAGES_PROVIDERS_CURRENT_STATE = ABSENT
PACKAGES_PROVIDERS_CREATION_AUTHORITY = ABSENT
PACKAGES_PROVIDERS_PACKAGE_JSON_AUTHORITY = ABSENT
```

Before any resolver execution treats `packages/providers` as an actual member, later canonical evidence must prove at minimum:

- `packages/providers` exists at the exact implementation head;
- its package manifest exists and is separately qualified;
- its package identity/name/version/private/public semantics are explicit;
- its dependency ownership is explicit;
- its source/test paths are bounded;
- workspace membership bytes include the exact qualified path;
- no unintended package path is admitted by the workspace file.

A missing future member path is not a reason to broaden the pattern to `packages/*`.

## 10. Separation from exact workspace bytes

004C1S fixes membership semantics only.

Still unresolved:

```text
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
PNPM_WORKSPACE_BYTE_LENGTH = NOT_ESTABLISHED
PNPM_WORKSPACE_SHA256 = NOT_ESTABLISHED
PNPM_WORKSPACE_KEY_ORDER = NOT_ESTABLISHED
PNPM_WORKSPACE_QUOTING = NOT_ESTABLISHED
PNPM_WORKSPACE_INDENTATION = NOT_ESTABLISHED
PNPM_WORKSPACE_TERMINAL_NEWLINE_POLICY = NOT_ESTABLISHED
PNPM_WORKSPACE_MATERIALIZATION = NOT_AUTHORIZED
```

A later exact-content grain must combine this canonical membership model with every other already-qualified pnpm project-setting semantic requirement before bytes can be frozen.

## 11. Separation from other pnpm project settings

004C1S does not qualify or serialize the complete pnpm settings object.

The following remain separate fail-closed surfaces:

```text
AUTO_INSTALL_PEERS_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
STRICT_PEER_DEPENDENCIES_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
MANAGE_PACKAGE_MANAGER_VERSIONS_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
PACKAGE_MANAGER_STRICT_VERSION_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
MINIMUM_RELEASE_AGE_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
DEPENDENCY_LIFECYCLE_SCRIPT_POLICY_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
PACKAGE_EXTENSION_COMPLETE_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
OPTIONAL_PLATFORM_POLICY_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
EXOTIC_TRANSITIVE_SOURCE_POLICY_SERIALIZATION = NOT_YET_QUALIFIED_AS_BYTES
```

The fact that multiple settings may eventually share `/pnpm-workspace.yaml` does not authorize combining unresolved semantics by guesswork.

## 12. `.npmrc` separation

The canonical `.npmrc` remains:

```text
legacy-peer-deps = true
prefer-dedupe = true
min-release-age = 7
```

004C1S neither adopts these values as pnpm policy nor changes them.

```text
EXACT_NPMRC_RECONCILIATION = NOT_AUTHORIZED
NPMRC_MUTATION = NOT_AUTHORIZED
NPMRC_CORRECTNESS_FOR_PNPM_RESOLUTION = NOT_CLAIMED
```

Canonical 004C1G already establishes that `legacy-peer-deps=true` must not become the Signthos peer policy and that a seven-day pnpm maturity window is represented by `minimumReleaseAge = 10080`, not by copying the literal `7` into pnpm settings.

No resolver execution is permitted until the `.npmrc` influence is separately reconciled.

## 13. Package-extension separation

Canonical 004C1Q fixes `/pnpm-workspace.yaml` as the owner of canonical 004C1L `packageExtensions` semantics.

004C1S preserves that decision but does not serialize the extension matrix.

```text
PACKAGE_EXTENSION_CONTROL_FILE = /pnpm-workspace.yaml
PACKAGE_EXTENSION_ROOT_KEY = packageExtensions
PACKAGE_EXTENSION_SELECTOR_COUNT = 9
FRAMEWORK_PEER_OMISSION_ENTRY_COUNT = 45
PACKAGE_EXTENSION_EXACT_YAML_BYTES = NOT_AUTHORIZED
```

Workspace membership and package-extension semantics are distinct substructures even when they share the same future file.

## 14. Resolver and dependency boundary

No execution-bearing prerequisite is authorized by this membership decision.

```text
EXACT_PNPM_PROVISIONING_MECHANISM = NOT_AUTHORIZED
EXACT_PNPM_DISTRIBUTION_SHA256 = NOT_ESTABLISHED
EXACT_NODE_DISTRIBUTION_SHA256 = NOT_ESTABLISHED
EXACT_RESOLVER_COMMAND = NOT_AUTHORIZED
EXACT_REGISTRY_CONFIGURATION = NOT_FROZEN_FOR_EXECUTION
EXACT_NETWORK_ALLOWLIST = NOT_AUTHORIZED
EXACT_CACHE_MODE = NOT_AUTHORIZED
EXACT_WRITABLE_SURFACE = NOT_AUTHORIZED
LOCKFILE_GENERATION = NOT_AUTHORIZED
RESOLVED_GRAPH = NOT_GENERATED
PACKAGE_ARCHIVE_IDENTITY_SET = NOT_ESTABLISHED
DEPENDENCY_ACQUISITION = NOT_AUTHORIZED
DEPENDENCY_INSTALLATION = NOT_AUTHORIZED
```

No package-manager, Node, Corepack, registry, provider, classifier, or PDF runtime execution occurs in this grain.

## 15. Relationship to content-identity/admission implementation

The canonical source-informed sequence identifies bounded provider-neutral admission implementation after semantic, classifier-provenance, adversarial-fixture, and fixture-materialization prerequisites.

004C1S does not reopen that sequence. It closes only one repository-control prerequisite needed to make a future implementation package explicit.

A future implementation authorization must still name:

- exact `packages/providers` package manifest and package identity;
- exact source paths;
- exact test paths;
- deterministic byte-observation rule surface;
- structural-provider boundary and what remains unavailable;
- classifier optionality and provider boundary;
- exact fixture manifest/record versions consumed;
- test execution authority and command;
- dependency/runtime assumptions;
- resource/network/TOCTOU acceptance evidence;
- exact-head review and merge gates.

Until those prerequisites are separately canonical, admission implementation remains absent.

## 16. Deterministic acceptance rules

004C1S may close canonically only if all of the following remain true:

1. canonical predecessor main is exactly `7082649e95870061c835ca3c70fc9407f1607b56`;
2. changed surface is exactly this one Signthos-authored planning file;
3. package-manager family/version and provider-package-root decisions are consumed without reopening;
4. root is recognized as the implicit workspace root package;
5. the only qualified explicit non-root first member is exactly `packages/providers`;
6. broad globs that could include `packages/prisma` or future packages are rejected;
7. `packages/prisma` remains excluded from JavaScript workspace membership;
8. absent `apps/web`, `packages/editor`, and `packages/testkit` remain excluded;
9. no `pnpm-workspace.yaml`, `.npmrc`, `package.json`, lockfile, package, source, runtime, workflow, fixture, provenance, database, or container path is mutated;
10. no package manager, resolver, registry, dependency, classifier, structural provider, or PDF runtime is executed;
11. exact-head Actions/check/provider state is recorded truthfully;
12. a fresh independent substantive exact-head review is obtained;
13. every material finding is repaired forward-only and any changed head is freshly reviewed;
14. unresolved material review threads are zero;
15. immediate exact-head premerge race proof is recorded;
16. guarded normal merge uses the exact reviewed expected head;
17. postmerge verification proves canonical main, ordered parents, reviewed-head/merge-tree equality, valid merge signature, exact changed surface, and truthful workflow/status accounting;
18. fresh Issue #7 reconciliation derives any successor rather than assuming it.

## 17. Explicit non-grants

```text
PNPM_WORKSPACE_YAML_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_EXACT_BYTES = NOT_AUTHORIZED
NPMRC_MUTATION = NOT_AUTHORIZED
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_CREATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_PACKAGE_JSON = NOT_AUTHORIZED
PACKAGE_MANAGER_EXECUTION = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
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

## 18. Qualification result

Before independent exact-head review:

```text
004C1S_WORKSPACE_MEMBERSHIP_MODEL = QUALIFIED_CANDIDATE
ROOT_IMPLICIT_MEMBER = /
EXPLICIT_NON_ROOT_MEMBER_COUNT = 1
EXPLICIT_NON_ROOT_MEMBERS = [packages/providers]
BROAD_PACKAGE_GLOBS = FORBIDDEN
PACKAGES_PRISMA_WORKSPACE_MEMBERSHIP = EXCLUDED
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
PNPM_WORKSPACE_MATERIALIZATION = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
DEPENDENCY_ADOPTION = NOT_AUTHORIZED
ADMISSION_IMPLEMENTATION = NOT_AUTHORIZED
CANONICAL_STATUS = CANDIDATE_ONLY
```

No successor is implied automatically. Fresh postmerge reconciliation must choose the next smallest unresolved package-control or implementation prerequisite from live canonical truth.