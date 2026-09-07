# Specification 004C1N — Root Manifest Nondependency Shape Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_ROOT_MANIFEST_SHAPE_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `58d7219b9363c5c04d994a9f22f31eb8fdbd014b`
Canonical predecessor tree: `e393e0fee4b235d2d26bd3732b48217d67fea0df`
Authority source: `github:issue-comment:5574521113`

## 1. Purpose and authority boundary

004C1N freezes only the nondependency semantic shape of the future Signthos-owned repository-root `package.json` control manifest. It consumes canonical 004C1M's exact dependency declaration set without reopening package identities, versions, classifications, peer ownership, or framework omission policy.

```text
004C1N_AUTHORITY = PLANNING_ROOT_MANIFEST_SHAPE_QUALIFICATION_ONLY
004C1N_ALLOWED_SURFACE = specs/004-local-pdf-core/**
004C1N_CANONICAL_004C1G_H_M_RECONCILIATION_AUTHORITY = PRESENT
004C1N_ROOT_MANIFEST_FIELD_OWNERSHIP_QUALIFICATION_AUTHORITY = PRESENT
004C1N_ROOT_MANIFEST_NONDEPENDENCY_SEMANTIC_SHAPE_AUTHORITY = PRESENT
004C1N_EXACT_004C1M_DEPENDENCY_SET_REFERENCE_AUTHORITY = PRESENT
004C1N_PRODUCT_FRAMEWORK_SELECTION_AUTHORITY = ABSENT
004C1N_IMPLEMENTATION_AUTHORITY = ABSENT
004C1N_PACKAGE_JSON_MUTATION_AUTHORITY = ABSENT
004C1N_PNPM_WORKSPACE_MUTATION_AUTHORITY = ABSENT
004C1N_PNPM_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1N_NPMRC_MUTATION_AUTHORITY = ABSENT
004C1N_PACKAGE_MANAGER_NODE_COREPACK_RESOLVER_EXECUTION_AUTHORITY = ABSENT
004C1N_DEPENDENCY_ADOPTION_ACQUISITION_INSTALL_AUTHORITY = ABSENT
004C1N_ARCHIVE_SOURCE_BINARY_FIXTURE_IMPORT_AUTHORITY = ABSENT
004C1N_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1N_PROVIDER_PDF_RUNTIME_AUTHORITY = ABSENT
004C1O_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact creates no `package.json` bytes. It executes no package manager, Node.js, Corepack, resolver, provider, or PDF runtime command and acquires no dependency or package archive.

## 2. Canonical inputs consumed without reopening

Canonical 004C1G/004C1H/004C1M establish:

```text
SELECTED_PACKAGE_MANAGER_FAMILY = pnpm
SELECTED_PACKAGE_MANAGER_VERSION = 10.34.5
PACKAGE_MANAGER_PIN_MECHANISM = ROOT_PACKAGE_JSON_PACKAGE_MANAGER_EXACT_VERSION
RESOLVER_NODE_BASELINE = 24.20.0_LTS
WORKSPACE_CONTROL_ROOT = REPOSITORY_ROOT
ROOT_PACKAGE_MANIFEST_POLICY = REQUIRED_BEFORE_RESOLVER_EXECUTION
ROOT_PACKAGE_MANIFEST_OWNERSHIP = SIGNTHOS_AUTHORED
ROOT_WORKSPACE_CONFIG = pnpm-workspace.yaml
COREPACK_POLICY = NOT_USED
PNPM_SELF_MANAGED_VERSION_DOWNLOAD = DISABLED_REQUIRED
PACKAGE_MANAGER_STRICT_VERSION = REQUIRED
DIRECT_RUNTIME_DEPENDENCY_COUNT = 8
DIRECT_RUNTIME_DEPENDENCY_VERSION_POLICY = EXACT_2.15.0
DIRECT_DEVELOPMENT_DEPENDENCY_COUNT = 0
DIRECT_PEER_DEPENDENCY_COUNT = 0
DIRECT_OPTIONAL_DEPENDENCY_COUNT = 0
```

Canonical 004C1H additionally requires the future root manifest to be private, to carry an exact package-manager pin and Node policy compatible with the selected resolver baseline, to avoid an implicit second workspace-control source, and to use an explicit script allowlist only.

004C1N does not alter those decisions.

## 3. Live root fact boundary

At canonical predecessor `58d7219b9363c5c04d994a9f22f31eb8fdbd014b`:

```text
ROOT_PACKAGE_JSON = ABSENT
ROOT_PNPM_WORKSPACE_YAML = ABSENT
ROOT_PNPM_LOCK_YAML = ABSENT
ROOT_NPMRC = PRESENT
```

The current root `.npmrc` remains exactly:

```text
legacy-peer-deps = true
prefer-dedupe = true
min-release-age = 7
```

004C1N does not reinterpret, migrate, delete, or mutate those `.npmrc` bytes. Exact pnpm reconciliation of that imported policy remains a separate unresolved gate.

## 4. Public package-manifest semantic evidence

004C1N uses public first-party package-manifest documentation only to avoid inventing unnecessary fields.

Observed documentation facts:

- npm's `package.json` reference states that `name` and `version` are required for publishing but optional when the package is not intended for publication.
- npm documents `private: true` as preventing accidental publication.
- npm documents `engines.node` as a version expression describing the intended Node version surface; enforcement behavior is configuration-dependent.
- npm documents `workspaces` as an optional local workspace discovery/membership surface.
- Node.js package documentation defines the root `type` field as controlling how `.js` files beneath that package boundary are interpreted as CommonJS or ES modules.

Evidence references:

```text
NPM_PACKAGE_JSON_REFERENCE = https://docs.npmjs.com/files/package.json/
NODE_PACKAGE_REFERENCE = https://nodejs.org/api/packages.html
```

These documentation facts are semantic inputs only. No npm or Node command is executed.

## 5. Root manifest role

The future root manifest is a **private dependency-control manifest**, not a publishable product package and not an application/runtime package.

```text
ROOT_MANIFEST_ROLE = PRIVATE_REPOSITORY_DEPENDENCY_CONTROL
ROOT_MANIFEST_PUBLICATION_ROLE = NONE
ROOT_MANIFEST_APPLICATION_ENTRYPOINT_ROLE = NONE
ROOT_MANIFEST_LIBRARY_ENTRYPOINT_ROLE = NONE
ROOT_MANIFEST_WORKSPACE_MEMBERSHIP_AUTHORITY = NONE
```

The manifest must not acquire product metadata or executable behavior merely because such fields are common in published npm packages.

## 6. Exact qualified nondependency field set

004C1N qualifies the future root manifest to contain exactly these nondependency fields and values:

```text
name = signthos
private = true
packageManager = pnpm@10.34.5
engines.node = 24.20.0
```

No other nondependency field is qualified by 004C1N.

### 6.1 `name`

```text
name = signthos
```

`signthos` is the stable Signthos-owned repository control identifier. Because the manifest is private and not a publication artifact, this field does not claim npm-registry ownership, availability, or publication intent.

### 6.2 `private`

```text
private = true
```

This is mandatory. A future manifest with `private` absent or false fails the 004C1N contract.

### 6.3 `packageManager`

```text
packageManager = pnpm@10.34.5
```

This is the exact canonical package-manager family/version selected by 004C1G. The field does not authorize Corepack, pnpm self-provisioning, download, execution, or ambient version substitution.

Canonical future execution policy still requires:

```text
COREPACK = NOT_USED
PNPM_SELF_MANAGED_VERSION_DOWNLOAD = DISABLED_REQUIRED
PACKAGE_MANAGER_STRICT_VERSION = REQUIRED
```

Those controls must be serialized and qualified by later authority before any resolver execution.

### 6.4 `engines.node`

```text
engines.node = 24.20.0
```

This binds the private dependency-control manifest to the exact resolver Node baseline selected by canonical 004C1G. It is not a general Signthos product-runtime Node support statement.

```text
ROOT_CONTROL_NODE_BASELINE = EXACT_24.20.0
PRODUCT_NODE_SUPPORT_POLICY = NOT_ESTABLISHED_BY_004C1N
```

A later product package may have a separately qualified runtime engine policy.

## 7. Exact dependency field consumed from 004C1M

004C1N does not reopen dependency ownership. The future root manifest's only qualified dependency section is canonical 004C1M's exact runtime set:

```text
dependencies:
  @embedpdf/core = 2.15.0
  @embedpdf/pdfium = 2.15.0
  @embedpdf/plugin-document-manager = 2.15.0
  @embedpdf/plugin-render = 2.15.0
  @embedpdf/plugin-thumbnail = 2.15.0
  @embedpdf/plugin-search = 2.15.0
  @embedpdf/plugin-selection = 2.15.0
  @embedpdf/plugin-interaction-manager = 2.15.0
```

```text
DEPENDENCIES_FIELD = EXACT_004C1M_SET
DEVDEPENDENCIES_FIELD = ABSENT
PEERDEPENDENCIES_FIELD = ABSENT
OPTIONALDEPENDENCIES_FIELD = ABSENT
```

The dependency section is a future semantic requirement only. 004C1N still does not authorize creation of the manifest or adoption/acquisition/installation of those dependencies.

## 8. Explicitly absent root fields

The following fields are intentionally **absent** from the 004C1N-qualified semantic shape:

```text
version = ABSENT
scripts = ABSENT
workspaces = ABSENT
type = ABSENT
main = ABSENT
module = ABSENT
exports = ABSENT
imports = ABSENT
bin = ABSENT
files = ABSENT
browser = ABSENT
publishConfig = ABSENT
bundledDependencies = ABSENT
bundleDependencies = ABSENT
config = ABSENT
os = ABSENT
cpu = ABSENT
libc = ABSENT
engines.pnpm = ABSENT
devEngines = ABSENT
pnpm = ABSENT
overrides = ABSENT
resolutions = ABSENT
packageExtensions = ABSENT
peerDependenciesMeta = ABSENT
license = ABSENT
author = ABSENT
contributors = ABSENT
description = ABSENT
keywords = ABSENT
homepage = ABSENT
repository = ABSENT
bugs = ABSENT
funding = ABSENT
```

This absence list is deliberate rather than accidental.

### 8.1 No `version`

The root control manifest is private and not intended for publication. Adding a root package version would create a package-release identity that current 004C authority does not need.

### 8.2 No `scripts`

No package-manager execution entrypoint is authorized. An absent scripts field is the smallest explicit script allowlist: zero root scripts.

A later script may be added only by a grain that owns its exact command, purpose, execution authority, writable surface, network behavior, and evidence requirements.

### 8.3 No `workspaces`

Canonical workspace membership authority belongs to `pnpm-workspace.yaml`. A root `workspaces` field would create a second membership/discovery policy surface and is therefore prohibited for this control manifest.

```text
ROOT_PACKAGE_JSON_WORKSPACES_FIELD = ABSENT_REQUIRED
PNPM_WORKSPACE_MEMBERSHIP = SEPARATE_UNRESOLVED_GATE
```

### 8.4 No `type`

Node.js documents `type` as affecting interpretation of `.js` files beneath the package boundary. 004C1N has no module-system or runtime-source authority, so it must not select CommonJS or ESM for the repository by implication.

Any future root JavaScript execution surface must establish its module-format boundary explicitly rather than inheriting an accidental 004C1N choice.

### 8.5 No entrypoints or publishing metadata

`main`, `module`, `exports`, `imports`, `bin`, `files`, `browser`, `publishConfig`, and package-discovery metadata are absent because this root manifest is neither an application package nor a published library package.

### 8.6 No root package-manager policy container

`pnpm`, `overrides`, `resolutions`, `packageExtensions`, and root peer metadata are absent from the 004C1N manifest shape. Their exact repository-owned serialization locations and values remain separate policy/workspace-control qualifications.

004C1N therefore does not prejudge whether a later pnpm-specific setting belongs in `pnpm-workspace.yaml`, `.npmrc`, or another canonical pnpm control surface.

### 8.7 No root license simplification

The root manifest does not add a `license` field. Signthos already has repository-level provenance, NOTICE, and path/license boundaries; a single package-level license value could be misread as reclassifying mixed or imported repository content. Any root package-license representation requires separate provenance-aware qualification.

## 9. Canonical semantic object

The complete future root-manifest semantic object qualified by 004C1N is therefore equivalent to:

```json
{
  "name": "signthos",
  "private": true,
  "packageManager": "pnpm@10.34.5",
  "engines": {
    "node": "24.20.0"
  },
  "dependencies": {
    "@embedpdf/core": "2.15.0",
    "@embedpdf/pdfium": "2.15.0",
    "@embedpdf/plugin-document-manager": "2.15.0",
    "@embedpdf/plugin-interaction-manager": "2.15.0",
    "@embedpdf/plugin-render": "2.15.0",
    "@embedpdf/plugin-search": "2.15.0",
    "@embedpdf/plugin-selection": "2.15.0",
    "@embedpdf/plugin-thumbnail": "2.15.0"
  }
}
```

This JSON is a **semantic planning representation only**. It is not authorized repository content, its formatting/key order is not a byte-level contract, and 004C1N does not create it at `/package.json`.

## 10. Deterministic acceptance rules

A later root-manifest byte candidate may claim 004C1N semantic compatibility only if:

1. the manifest is at repository root;
2. `name` is exactly `signthos`;
3. `private` is exactly boolean `true`;
4. `packageManager` is exactly `pnpm@10.34.5`;
5. `engines` contains exactly `node = 24.20.0` and no additional engine policy absent later authority;
6. `dependencies` is exactly canonical 004C1M's eight runtime declarations at literal `2.15.0`;
7. no `devDependencies`, `peerDependencies`, or `optionalDependencies` field is present;
8. no `scripts` field is present;
9. no `workspaces` field is present;
10. no `type` or package/library entrypoint field is present;
11. no root pnpm/override/resolution/package-extension policy field is present absent later authority;
12. no package publication or root license simplification metadata is introduced absent later authority;
13. all workspace, `.npmrc`, provisioning, resolver, network/cache/writable-surface, lockfile, archive, and runtime gates remain independently fail closed.

Any additional field is `UNQUALIFIED_ROOT_MANIFEST_CONTENT` unless a later canonical successor explicitly authorizes it.

## 11. Failure conditions

```text
ROOT_MANIFEST_NAME_DRIFT = FAIL
ROOT_MANIFEST_PRIVATE_NOT_TRUE = FAIL
ROOT_MANIFEST_PACKAGE_MANAGER_DRIFT = FAIL
ROOT_MANIFEST_NODE_BASELINE_DRIFT = FAIL
ROOT_MANIFEST_DEPENDENCY_SET_DRIFT = FAIL
ROOT_MANIFEST_EXTRA_DEPENDENCY_CLASS = FAIL
ROOT_MANIFEST_SCRIPT_ADDITION = FAIL_UNLESS_LATER_AUTHORIZED
ROOT_MANIFEST_WORKSPACES_FIELD_PRESENT = FAIL
ROOT_MANIFEST_TYPE_FIELD_PRESENT = FAIL_UNLESS_LATER_AUTHORIZED
ROOT_MANIFEST_ENTRYPOINT_OR_PUBLISH_SURFACE = FAIL_UNLESS_LATER_AUTHORIZED
ROOT_MANIFEST_PACKAGE_MANAGER_POLICY_FIELD = FAIL_UNLESS_LATER_AUTHORIZED
ROOT_MANIFEST_UNQUALIFIED_EXTRA_FIELD = FAIL_CLOSED
```

## 12. Remaining independent blockers

004C1N intentionally does not close these gates:

```text
ROOT_PACKAGE_JSON_BYTES = NOT_CREATED
ROOT_MANIFEST_SHA256 = NOT_ESTABLISHED
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
PNPM_WORKSPACE_SHA256 = NOT_ESTABLISHED
ROOT_WORKSPACE_MEMBERSHIP = UNRESOLVED_FAIL_CLOSED
EXACT_PACKAGE_EXTENSION_SERIALIZATION_LOCATION = NOT_AUTHORIZED
EXACT_NPMRC_RECONCILIATION = NOT_AUTHORIZED
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

## 13. Qualification result

```text
ROOT_MANIFEST_ROLE = PRIVATE_REPOSITORY_DEPENDENCY_CONTROL
ROOT_MANIFEST_NONDEPENDENCY_SEMANTIC_SHAPE = QUALIFIED_CANDIDATE
ROOT_MANIFEST_NAME = signthos
ROOT_MANIFEST_PRIVATE = true
ROOT_MANIFEST_PACKAGE_MANAGER = pnpm@10.34.5
ROOT_MANIFEST_NODE_ENGINE = 24.20.0
ROOT_MANIFEST_DEPENDENCIES = EXACT_004C1M_8_RUNTIME_SET
ROOT_MANIFEST_WORKSPACES = ABSENT_REQUIRED
ROOT_MANIFEST_SCRIPTS = ABSENT
ROOT_MANIFEST_TYPE = ABSENT
ROOT_MANIFEST_PACKAGE_MANAGER_POLICY_FIELDS = ABSENT
ROOT_PACKAGE_JSON_BYTES = NOT_CREATED
DEPENDENCY_ADOPTION = NOT_CLAIMED
RESOLVER_EXECUTION = NOT_PERFORMED
004C1N_STATUS = QUALIFIED_CANDIDATE
```

004C1N closes only the root-manifest semantic-shape prerequisite. It does not make package-control mutation or resolver execution ready.

## 14. Successor boundary

004C1N does not derive its own successor.

Fresh post-merge canonical reconciliation must decide which remaining prerequisite is next. Workspace membership/control shape, package-extension serialization, `.npmrc` reconciliation, package-manager/Node provisioning, resolver execution preparation, 004C2, 004D, and Specification 005 remain unauthorized by this artifact.

```text
004C1O = NOT_AUTHORIZED_BY_004C1N
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED_BY_004C1N
PNPM_WORKSPACE_MUTATION = NOT_AUTHORIZED_BY_004C1N
NPMRC_MUTATION = NOT_AUTHORIZED_BY_004C1N
RESOLVER_EXECUTION = NOT_AUTHORIZED_BY_004C1N
004C2 = NOT_AUTHORIZED_BY_004C1N
004D = NOT_AUTHORIZED_BY_004C1N
SPECIFICATION_005 = NOT_AUTHORIZED_BY_004C1N
```

No CI, test, resolver, dependency installation, provider runtime, PDF behavior, browser compatibility, performance, redistribution, or release-readiness claim is made by 004C1N.