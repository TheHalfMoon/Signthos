# Specification 004C1U — `.npmrc` Future Existence Disposition Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_NPMRC_DISPOSITION_ONLY / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `c37c440b3c1c72c1f1d549cbba448a1f1e79359d`
Canonical predecessor tree: `d59a5000cfe9bda4b9b0e56b3296f1ffdc3701a5`
Authority source: `github:issue-comment:5588875241`

## 1. Purpose and exact authority

004C1U qualifies one unresolved package-control decision left intentionally open by canonical 004C1T: whether the repository-root `.npmrc` should exist in the first canonical Signthos pnpm resolver-control state after all three imported npm-policy settings are removed from future policy.

```text
004C1U_AUTHORITY = PLANNING_NPMRC_FUTURE_DISPOSITION_QUALIFICATION_ONLY
004C1U_CANONICAL_BASE = c37c440b3c1c72c1f1d549cbba448a1f1e79359d
004C1U_ALLOWED_PATH = specs/004-local-pdf-core/004c1u-npmrc-future-existence-disposition-qualification.md
004C1U_MAX_CHANGED_FILES = 1
```

This grain does not delete, replace, edit, or otherwise mutate `.npmrc`. It changes no `package.json`, `pnpm-workspace.yaml`, lockfile, package, source, fixture, workflow, provenance, database, container, or runtime surface.

## 2. Canonical predecessor contracts consumed without reopening

004C1U consumes the following already-canonical decisions:

```text
PACKAGE_MANAGER_FAMILY = pnpm
PACKAGE_MANAGER_VERSION = 10.34.5
PNPM_SOURCE_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
PNPM_DOCUMENTATION_COMMIT = b015f4e6d789d894847e432d0cc771526a55cd27
WORKSPACE_CONTROL_ROOT = REPOSITORY_ROOT
ROOT_PACKAGE_MANIFEST = /package.json
ROOT_PACKAGE_MANAGER_PIN = pnpm@10.34.5
ROOT_WORKSPACE_CONFIG = /pnpm-workspace.yaml
LOCKFILE_PATH = /pnpm-lock.yaml
COREPACK_POLICY = NOT_USED
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
MINIMUM_RELEASE_AGE_MINUTES = 10080
ROOT_IMPLICIT_WORKSPACE_MEMBER = /
EXPLICIT_NON_ROOT_WORKSPACE_MEMBERS = [packages/providers]
PACKAGES_PRISMA_WORKSPACE_MEMBERSHIP = EXCLUDED
PACKAGE_EXTENSION_CONTROL_FILE = /pnpm-workspace.yaml
PACKAGE_EXTENSION_ROOT_KEY = packageExtensions
```

004C1U does not reopen package-manager selection, dependency versions, root-manifest bytes, workspace membership, package-extension semantics, content-identity/admission semantics, fixture identities, provider selection, or any runtime behavior.

## 3. Exact live repository facts

At canonical `main@c37c440b3c1c72c1f1d549cbba448a1f1e79359d`:

```text
ROOT_PACKAGE_JSON = PRESENT
ROOT_PACKAGE_JSON_NAME = signthos
ROOT_PACKAGE_JSON_PRIVATE = true
ROOT_PACKAGE_JSON_PACKAGE_MANAGER = pnpm@10.34.5
ROOT_PACKAGE_JSON_NODE_ENGINE = 24.20.0
ROOT_PACKAGE_JSON_DIRECT_DEPENDENCY_COUNT = 8
ROOT_PNPM_WORKSPACE_YAML = ABSENT
ROOT_PNPM_LOCK_YAML = ABSENT
ROOT_NPMRC = PRESENT
```

The current `.npmrc` identity remains exactly:

```text
PATH = /.npmrc
GIT_BLOB = cbc6b6537fba6c69756ad16e69a35cc056791d99
BYTE_LENGTH = 65
SHA256 = 409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d
```

Exact text:

```ini
legacy-peer-deps = true
prefer-dedupe = true
min-release-age = 7
```

004C1U does not alter those bytes.

## 4. Canonical 004C1T reconciliation consumed without reopening

Canonical 004C1T excludes all three current settings from the future Signthos pnpm resolver-policy set:

```text
legacy-peer-deps = REMOVE_FROM_REPOSITORY_NPMRC_BEFORE_CANONICAL_PNPM_RESOLUTION
prefer-dedupe = REMOVE_FROM_REPOSITORY_NPMRC_BEFORE_CANONICAL_PNPM_RESOLUTION_WITHOUT_INFERRED_PNPM_REPLACEMENT
min-release-age = REMOVE_FROM_REPOSITORY_NPMRC_AND_SEMANTICALLY_MIGRATE_7_DAYS_TO_minimumReleaseAge_10080_MINUTES
```

It also establishes:

```text
REPOSITORY_NPMRC_REGISTRY_REQUIREMENT = NOT_ESTABLISHED
REPOSITORY_NPMRC_AUTH_REQUIREMENT = NOT_ESTABLISHED
REPOSITORY_NPMRC_PROXY_REQUIREMENT = NOT_ESTABLISHED
REPOSITORY_NPMRC_TLS_OR_CERT_REQUIREMENT = NOT_ESTABLISHED
```

The unresolved predecessor state is exactly:

```text
NPMRC_FUTURE_EXISTENCE = UNRESOLVED_FAIL_CLOSED
NPMRC_FUTURE_EXACT_CONTENT = NOT_AUTHORIZED
NPMRC_DELETE_VS_REPLACE = NOT_AUTHORIZED
NPMRC_MUTATION = NOT_AUTHORIZED
```

004C1U resolves only the future-existence/disposition question. Mutation remains separate.

## 5. First-party pnpm registry and authentication evidence

The selected pnpm line is exact `10.34.5`. First-party pnpm v10 documentation at immutable documentation commit `b015f4e6d789d894847e432d0cc771526a55cd27` identifies `.npmrc` as the configuration class for authentication and registry settings when such settings are needed.

The same documentation establishes the default public registry without any repository `.npmrc` override:

```text
PNPM_DEFAULT_REGISTRY = https://registry.npmjs.org/
```

The documentation also establishes that authentication may be supplied from trusted non-repository sources, including user/global configuration and `npm_config_*` environment variables, without requiring a committed project `.npmrc`.

Since pnpm `10.34.2`, repository project/workspace `.npmrc` files receive additional restrictions for environment-variable expansion in registry/proxy/credential settings specifically to prevent repository-controlled secret exfiltration.

These facts support a narrow conclusion only: the first public-registry resolver-control state does not require committed repository `.npmrc` bytes merely to obtain the pnpm default registry or to preserve the possibility of future trusted authentication.

004C1U authorizes no registry request, credential use, environment-variable use, package acquisition, or resolver execution.

## 6. Current dependency registry requirement

The canonical root `package.json` declares eight exact direct dependencies, all in the selected public `@embedpdf/*` package line:

```text
@embedpdf/core@2.15.0
@embedpdf/pdfium@2.15.0
@embedpdf/plugin-document-manager@2.15.0
@embedpdf/plugin-interaction-manager@2.15.0
@embedpdf/plugin-render@2.15.0
@embedpdf/plugin-search@2.15.0
@embedpdf/plugin-selection@2.15.0
@embedpdf/plugin-thumbnail@2.15.0
```

No canonical repository contract currently requires:

```text
CUSTOM_DEFAULT_REGISTRY = PRESENT
CUSTOM_SCOPE_REGISTRY = PRESENT
REGISTRY_AUTHENTICATION = PRESENT
REPOSITORY_PROXY_SETTING = PRESENT
CUSTOM_CA_OR_CERTIFICATE = PRESENT
CLIENT_CERTIFICATE_OR_KEY = PRESENT
```

This does not authorize network resolution from the public registry. Future resolver/network evidence must still bind the exact allowed registry host, transport, redirects, credentials state, and request evidence.

## 7. Disposition options considered

004C1U considers exactly three future repository states.

### Option A — retain the current file

```text
NPMRC_STATE = CURRENT_65_BYTE_FILE
RESULT = REJECTED
```

Reason: every current setting is already canonically excluded from future pnpm resolver policy. Retention would preserve an unnecessary and ambiguous resolver-input surface.

### Option B — replace with an empty repository `.npmrc`

```text
NPMRC_STATE = PRESENT_EMPTY_FILE
RESULT = REJECTED
```

An empty file provides no current canonical registry, authentication, proxy, TLS, certificate, or resolver-policy semantic value. Retaining a zero-semantic configuration surface would add path/digest state without satisfying any canonical requirement.

If a later qualified requirement genuinely needs repository `.npmrc` settings, a separately authorized unit may reintroduce the file with exact purpose and bytes.

### Option C — repository `.npmrc` absent

```text
NPMRC_STATE = ABSENT
RESULT = SELECTED
```

This removes the imported npm-policy surface from the first canonical pnpm resolver-control state while preserving pnpm's documented public-registry default and preserving the ability to supply future trusted authentication externally or to reintroduce an explicitly qualified repository setting later.

## 8. Canonical future existence decision

004C1U qualifies the future target state as:

```text
NPMRC_FUTURE_EXISTENCE = ABSENT
NPMRC_FUTURE_DISPOSITION = DELETE_CURRENT_IMPORTED_REPOSITORY_NPMRC
NPMRC_EMPTY_REPLACEMENT = FORBIDDEN_WITHOUT_NEW_SEMANTIC_REQUIREMENT
NPMRC_NONEMPTY_REPLACEMENT = FORBIDDEN_WITHOUT_NEW_SEMANTIC_REQUIREMENT
NPMRC_CURRENT_THREE_KEY_SET = FORBIDDEN_FOR_CANONICAL_PNPM_RESOLUTION
```

This is a planning disposition only. The current repository file remains present until a separately authorized mutation unit performs and qualifies its deletion.

## 9. Why absence is the least-authority state

Selecting absence follows the canonical least-authority posture:

1. all current settings have already lost future resolver-policy ownership;
2. no replacement repository setting is currently required;
3. pnpm has a documented default public registry;
4. authentication can remain outside repository-controlled bytes;
5. an absent file cannot silently retain imported npm resolver behavior;
6. a later real requirement can add an explicitly reviewed setting rather than preserving an unused surface preemptively.

Absence is not a claim that `.npmrc` is generally unsafe or unsupported. It is only the selected state for the first Signthos canonical pnpm resolver-control plane under current requirements.

## 10. Future registry/auth policy remains separately evidence-bound

004C1U does not freeze the execution-time registry/network/auth tuple.

Still unresolved:

```text
EXECUTION_REGISTRY_BASE_URL = NOT_AUTHORIZED
EXECUTION_ALLOWED_REGISTRY_HOSTS = NOT_AUTHORIZED
EXECUTION_REDIRECT_POLICY = NOT_AUTHORIZED
EXECUTION_PROXY_POLICY = NOT_AUTHORIZED
EXECUTION_TLS_POLICY = NOT_AUTHORIZED
EXECUTION_AUTH_SOURCE = NOT_AUTHORIZED
EXECUTION_CREDENTIAL_STATE = NOT_AUTHORIZED
EXECUTION_NPM_CONFIG_ENVIRONMENT = NOT_AUTHORIZED
EXECUTION_NETWORK_REQUESTS = NOT_AUTHORIZED
```

A future resolver unit must bind these independently even though repository `.npmrc` is selected for absence.

## 11. Future reintroduction rule

After a later authorized deletion, repository `.npmrc` may be reintroduced only if fresh canonical authority proves an exact repository-owned need such as a non-secret registry mapping or another pnpm/npm-compatible setting that is genuinely required at repository scope.

Any reintroduction must bind:

```text
exact purpose
exact setting keys
exact non-secret values or secure external secret source
exact interaction with pnpm 10.x
exact file bytes
byte length
SHA256
network/auth implications
review and merge evidence
```

Credentials, private keys, bearer tokens, or secret material must not be committed to repository `.npmrc`.

## 12. Historical provenance is preserved

Deleting the imported `.npmrc` in a future separately authorized mutation does not erase its historical Specification 002 provenance or prior Git history.

004C1U does not rewrite, delete, or relabel historical provenance evidence. It only selects the future active control-plane disposition.

```text
HISTORICAL_NPMRC_PROVENANCE = PRESERVED
HISTORICAL_IMPORT_RECORD = IMMUTABLE_HISTORY
FUTURE_ACTIVE_NPMRC_CONTROL_SURFACE = ABSENT
```

## 13. Relationship to `pnpm-workspace.yaml`

The future absence of repository `.npmrc` does not itself freeze complete pnpm project settings.

Canonical project-settings inputs remain distributed across prior grains:

```text
WORKSPACE_MEMBERSHIP_SEMANTICS = CANONICAL_004C1S
PACKAGE_EXTENSION_SEMANTICS = CANONICAL_004C1L
PACKAGE_EXTENSION_SERIALIZATION_OWNER = CANONICAL_004C1Q
PEER_POLICY_SEMANTICS = CANONICAL_004C1G_H
MINIMUM_RELEASE_AGE_SEMANTICS = CANONICAL_004C1G_T
PACKAGE_MANAGER_VERSION_CONTROL_SEMANTICS = CANONICAL_004C1G
LIFECYCLE_POLICY_SEMANTICS = CANONICAL_004C1G_H
EXOTIC_SOURCE_POLICY_SEMANTICS = CANONICAL_004C1G_H
```

A later planning grain must aggregate only already-qualified pnpm project-setting semantics and classify any still-unresolved optional/platform or execution-bound policy before exact YAML bytes can be frozen.

004C1U grants no authority to create or mutate `pnpm-workspace.yaml`.

## 14. Resolver readiness remains fail closed

Even if 004C1U becomes canonical, resolver execution remains blocked by unresolved prerequisites including:

```text
NPMRC_DELETION_NOT_MATERIALIZED = TRUE
PNPM_WORKSPACE_EXACT_CONTENT = NOT_ESTABLISHED
PNPM_WORKSPACE_SHA256 = NOT_ESTABLISHED
PACKAGES_PROVIDERS_CURRENT_STATE = ABSENT
PACKAGES_PROVIDERS_PACKAGE_MANIFEST = ABSENT
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

No resolver, dependency, package, provider, PDF, or release readiness is claimed.

## 15. Deterministic acceptance criteria

004C1U may close canonically only if all of the following remain true:

1. canonical predecessor main is exactly `c37c440b3c1c72c1f1d549cbba448a1f1e79359d`;
2. canonical predecessor tree is exactly `d59a5000cfe9bda4b9b0e56b3296f1ffdc3701a5`;
3. the changed surface is exactly this one Signthos-authored planning file;
4. the current `.npmrc` identity and exact three-key contents are recorded correctly;
5. canonical 004C1T removal/migration semantics are consumed without reopening them;
6. first-party pnpm evidence records the default public registry and trusted non-repository authentication alternatives accurately;
7. no current canonical requirement is invented for registry/auth/proxy/TLS/certificate repository settings;
8. retention of the current file is rejected;
9. empty-file replacement is rejected absent a semantic requirement;
10. future repository `.npmrc` absence is selected for the first canonical pnpm resolver-control state;
11. historical provenance remains preserved;
12. no `.npmrc`, `package.json`, `pnpm-workspace.yaml`, lockfile, package, source, fixture, workflow, provenance, database, container, or runtime surface is mutated outside this one planning file;
13. no package manager, Node, Corepack, resolver, registry, dependency, classifier, structural provider, or PDF runtime is executed;
14. exact-head Actions/check/provider state is recorded truthfully;
15. fresh independent substantive review covers the exact complete candidate head/tree;
16. every material finding is repaired forward-only and any changed head is freshly reviewed;
17. unresolved material review threads are zero;
18. immediate exact-head premerge race proof is recorded;
19. guarded normal merge uses the exact reviewed expected head SHA;
20. postmerge verification proves canonical main, ordered parents, reviewed-head/merge-tree equality, valid signature, exact changed surface, and truthful workflow/status accounting;
21. fresh Issue #7 reconciliation derives any successor rather than assuming it.

## 16. Explicit non-grants

```text
NPMRC_MUTATION = NOT_AUTHORIZED
NPMRC_DELETION = NOT_AUTHORIZED
NPMRC_REPLACEMENT = NOT_AUTHORIZED
PNPM_WORKSPACE_YAML_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_EXACT_BYTES = NOT_AUTHORIZED
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_CREATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_PACKAGE_JSON = NOT_AUTHORIZED
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

## 17. Qualification result

Before independent exact-head review and guarded merge:

```text
004C1U_NPMRC_FUTURE_EXISTENCE_DISPOSITION = QUALIFIED_CANDIDATE
NPMRC_FUTURE_EXISTENCE = ABSENT
NPMRC_FUTURE_DISPOSITION = DELETE_CURRENT_IMPORTED_REPOSITORY_NPMRC
CURRENT_NPMRC_MUTATION = NONE
PNPM_DEFAULT_REGISTRY = https://registry.npmjs.org/
REPOSITORY_NPMRC_REPLACEMENT_REQUIREMENT = ABSENT
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
RESOLVER_READINESS = FAIL_CLOSED
DEPENDENCY_ACQUISITION = NOT_AUTHORIZED
ADMISSION_IMPLEMENTATION = NOT_AUTHORIZED
CANONICAL_STATUS = CANDIDATE_ONLY
```

No successor is implied automatically. Fresh postmerge reconciliation must choose the next smallest unresolved package-control or implementation prerequisite from live canonical truth.