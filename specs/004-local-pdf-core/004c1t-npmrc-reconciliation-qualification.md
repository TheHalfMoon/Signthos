# Specification 004C1T — `.npmrc` Reconciliation Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_NPMRC_RECONCILIATION_ONLY / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `640298d6920b8b9204f5dcc6cc8f5573030e804f`
Canonical predecessor tree: `da4f13cf3c39996a57ef27b8403df73064805b0a`
Authority source: `github:issue-comment:5588429090`

## 1. Purpose and exact authority

004C1T qualifies the semantic disposition of the repository-root imported `.npmrc` before any pnpm resolver execution.

The current file is inherited package-control evidence from the authorized Specification 002 brownfield surface. It is not automatically valid Signthos pnpm policy merely because it is canonical repository content.

```text
004C1T_AUTHORITY = PLANNING_NPMRC_RECONCILIATION_QUALIFICATION_ONLY
004C1T_CANONICAL_BASE = 640298d6920b8b9204f5dcc6cc8f5573030e804f
004C1T_ALLOWED_PATH = specs/004-local-pdf-core/004c1t-npmrc-reconciliation-qualification.md
004C1T_MAX_CHANGED_FILES = 1
```

This grain changes no `.npmrc`, `package.json`, `pnpm-workspace.yaml`, lockfile, package, source, fixture, workflow, provenance, database, or runtime path.

## 2. Canonical predecessor contracts consumed without reopening

004C1T consumes these already-canonical package-control decisions:

```text
PACKAGE_MANAGER_FAMILY = pnpm
PACKAGE_MANAGER_VERSION = 10.34.5
PNPM_SOURCE_TAG = pnpm/pnpm@v10.34.5
PNPM_SOURCE_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
RESOLVER_NODE_BASELINE = 24.20.0_LTS
WORKSPACE_CONTROL_ROOT = REPOSITORY_ROOT
ROOT_PACKAGE_MANIFEST = /package.json
ROOT_PACKAGE_MANAGER_PIN = pnpm@10.34.5
ROOT_WORKSPACE_CONFIG = /pnpm-workspace.yaml
LOCKFILE_PATH = /pnpm-lock.yaml
COREPACK_POLICY = NOT_USED
PNPM_SELF_MANAGED_VERSION_DOWNLOAD = DISABLED_REQUIRED
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
MINIMUM_RELEASE_AGE_POLICY = SEVEN_DAYS_EQUIVALENT
MINIMUM_RELEASE_AGE_MINUTES = 10080
PACKAGE_EXTENSION_CONTROL_FILE = /pnpm-workspace.yaml
PACKAGE_EXTENSION_ROOT_KEY = packageExtensions
ROOT_IMPLICIT_WORKSPACE_MEMBER = /
EXPLICIT_NON_ROOT_WORKSPACE_MEMBERS = [packages/providers]
PACKAGES_PRISMA_WORKSPACE_MEMBERSHIP = EXCLUDED
```

004C1T does not reopen package-manager selection, root-manifest bytes, dependency versions, package-extension semantics, workspace membership, fixture identities, provider selection, or content-admission semantics.

## 3. Exact current `.npmrc` identity

At canonical `main@640298d6920b8b9204f5dcc6cc8f5573030e804f`:

```text
PATH = /.npmrc
GIT_BLOB = cbc6b6537fba6c69756ad16e69a35cc056791d99
BYTE_LENGTH = 65
SHA256 = 409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d
```

Exact bytes interpreted as UTF-8 text are:

```ini
legacy-peer-deps = true
prefer-dedupe = true
min-release-age = 7
```

No credential, token, registry URL, proxy, certificate, key, or authentication setting is present in the current file.

## 4. Exact pnpm evidence pins

004C1T uses the same selected pnpm release identity already frozen by canonical 004C1G:

```text
PNPM_VERSION = 10.34.5
PNPM_SOURCE_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
PNPM_DOCS_COMMIT = b015f4e6d789d894847e432d0cc771526a55cd27
```

Relevant first-party documentation paths:

```text
pnpm/pnpm.io:versioned_docs/version-10.x/settings.md
pnpm/pnpm.io:versioned_docs/version-10.x/npmrc.md
```

Relevant exact selected-source paths:

```text
pnpm/pnpm:config/config/src/types.ts
pnpm/pnpm:config/config/src/Config.ts
pnpm/pnpm:config/config/src/index.ts
```

These source and documentation observations are qualification evidence only. No pnpm package, binary, archive, or runtime is acquired or executed here.

## 5. pnpm configuration ownership boundary

First-party pnpm v10 documentation establishes that pnpm can read configuration from command-line arguments, environment variables, `pnpm-workspace.yaml`, and `.npmrc` files.

The same documentation distinguishes the repository project-settings surface from authorization-oriented `.npmrc` settings:

```text
PROJECT_SETTINGS_OWNER = /pnpm-workspace.yaml
AUTH_AND_REGISTRY_SETTINGS_OWNER = .npmrc_CLASS_WHEN_NEEDED
```

Therefore the existence of a repository `.npmrc` is itself a resolver-input concern, even when a particular inherited key does not map to an intended Signthos pnpm policy.

004C1T does not claim that every npm-compatible key is ignored by pnpm. It classifies only the three exact current keys against exact selected-source evidence and canonical Signthos policy.

## 6. `legacy-peer-deps = true` classification

Exact current key:

```text
KEY = legacy-peer-deps
VALUE = true
ORIGIN_CLASS = IMPORTED_NPM_POLICY
```

Canonical Signthos peer behavior is already frozen as:

```text
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
FRAMEWORK_PEER_OMISSIONS = EXPLICITLY_QUALIFIED_ONLY
EMBEDPDF_INTERNAL_PEERS = EXACT_AND_PRESENT
```

The exact selected pnpm `v10.34.5` typed configuration surface does not establish `legacy-peer-deps` or `legacyPeerDeps` as a pnpm peer-policy field. The selected pnpm configuration implementation instead exposes pnpm-owned peer controls such as `auto-install-peers` and `strict-peer-dependencies`.

Accordingly:

```text
LEGACY_PEER_DEPS_IMPORTED_VALUE = true
LEGACY_PEER_DEPS_PNPM_POLICY_OWNER = NONE_ESTABLISHED
LEGACY_PEER_DEPS_CANONICAL_SIGNTHOS_POLICY = FORBIDDEN_AS_PEER_AUTHORITY
LEGACY_PEER_DEPS_FUTURE_DISPOSITION = REMOVE_FROM_REPOSITORY_NPMRC_BEFORE_CANONICAL_PNPM_RESOLUTION
```

004C1T deliberately does not claim universal pnpm ignorance of arbitrary npm configuration. The narrower conclusion is sufficient: this inherited key has no qualified role in the selected Signthos pnpm peer policy and must not remain an ambiguous resolver input when canonical pnpm execution begins.

## 7. `prefer-dedupe = true` classification

Exact current key:

```text
KEY = prefer-dedupe
VALUE = true
ORIGIN_CLASS = IMPORTED_NPM_POLICY
```

The exact selected pnpm typed configuration surface does not establish `prefer-dedupe` or `preferDedupe` as a pnpm configuration field. The selected source instead exposes pnpm-owned explicit dedupe controls, including distinct direct, peer, injected, and peer-dependent settings.

No canonical Signthos grain requires preservation of npm `prefer-dedupe` semantics.

Accordingly:

```text
PREFER_DEDUPE_IMPORTED_VALUE = true
PREFER_DEDUPE_PNPM_SEMANTIC_EQUIVALENT = NOT_ESTABLISHED
PREFER_DEDUPE_CANONICAL_SIGNTHOS_REQUIREMENT = ABSENT
PREFER_DEDUPE_FUTURE_DISPOSITION = REMOVE_FROM_REPOSITORY_NPMRC_BEFORE_CANONICAL_PNPM_RESOLUTION
```

004C1T does not translate `prefer-dedupe=true` into any pnpm dedupe setting by guesswork. If Signthos later needs a dedupe policy, it must be separately qualified using exact pnpm-owned semantics.

## 8. `min-release-age = 7` classification

Exact current key:

```text
KEY = min-release-age
VALUE = 7
ORIGIN_CLASS = IMPORTED_NPM_POLICY
NPM_SEMANTIC_UNIT = DAYS
NPM_SEMANTIC_VALUE = 7_DAYS
```

Canonical 004C1G already records that the imported npm key `min-release-age` expresses its maturity window in days.

The selected pnpm `v10.34.5` source defines a **different** pnpm-owned configuration key, `minimum-release-age`, as numeric configuration and exposes the corresponding `minimumReleaseAge` value. First-party pnpm v10 documentation defines that pnpm setting in **minutes**.

The exact selected pnpm typed configuration surface does not establish `min-release-age` as an alias for `minimum-release-age`. Therefore this grain does not claim that pnpm consumes the current imported key or interprets its literal `7` as seven minutes.

Canonical Signthos 004C1G separately freezes the intended maturity window as seven days under pnpm semantics:

```text
SEVEN_DAYS_IN_MINUTES = 10080
```

The required semantic migration is therefore explicit rather than a literal-key or literal-number copy:

```text
IMPORTED_NPM_KEY = min-release-age
IMPORTED_NPM_VALUE = 7
IMPORTED_NPM_MEANING = 7_DAYS
SELECTED_PNPM_KEY = minimumReleaseAge
SELECTED_PNPM_SERIALIZED_KEY = minimumReleaseAge
SELECTED_PNPM_UNIT = MINUTES
CANONICAL_SIGNTHOS_PNPM_VALUE = 10080
PNPM_CONSUMPTION_OF_IMPORTED_min-release-age = NOT_ESTABLISHED
DIRECT_LITERAL_KEY_COPY = FORBIDDEN
DIRECT_LITERAL_VALUE_COPY = FORBIDDEN
SEMANTIC_EQUIVALENCE_REQUIRES = 7_DAYS_TO_10080_MINUTES
```

Canonical disposition:

```text
MIN_RELEASE_AGE_NPMRC_DISPOSITION = REMOVE_FROM_REPOSITORY_NPMRC_BEFORE_CANONICAL_PNPM_RESOLUTION
MINIMUM_RELEASE_AGE_SEMANTIC_MIGRATION_OWNER = /pnpm-workspace.yaml
MINIMUM_RELEASE_AGE_FUTURE_KEY = minimumReleaseAge
MINIMUM_RELEASE_AGE_FUTURE_VALUE = 10080
```

This grain freezes semantic migration only. It does not assert current-key pnpm consumption and does not serialize future YAML bytes.

## 9. Three-key disposition matrix

| Current key | Current value | Canonical classification | Future disposition |
| --- | ---: | --- | --- |
| `legacy-peer-deps` | `true` | imported npm peer-policy input with no qualified Signthos pnpm ownership | remove from repository `.npmrc`; use canonical pnpm peer controls instead |
| `prefer-dedupe` | `true` | imported npm dedupe-policy input with no qualified pnpm semantic equivalent required by Signthos | remove from repository `.npmrc`; do not infer replacement |
| `min-release-age` | `7` | imported npm seven-day maturity policy; pnpm consumption of this exact npm key is not established | remove from repository `.npmrc`; migrate the seven-day requirement explicitly to `minimumReleaseAge: 10080` in future workspace settings |

All three current keys are therefore excluded from the future canonical repository `.npmrc` semantic set used for pnpm resolution.

## 10. Future `.npmrc` ownership rule

After a separately authorized mutation grain applies this reconciliation, repository `.npmrc` may contain only settings whose ownership is explicitly qualified for that surface.

Potential classes include registry, authentication, proxy, TLS, certificate, and related npm-compatible network settings where a future requirement exists and where secrets are not committed.

Current canonical need state:

```text
REPOSITORY_NPMRC_REGISTRY_REQUIREMENT = NOT_ESTABLISHED
REPOSITORY_NPMRC_AUTH_REQUIREMENT = NOT_ESTABLISHED
REPOSITORY_NPMRC_PROXY_REQUIREMENT = NOT_ESTABLISHED
REPOSITORY_NPMRC_TLS_OR_CERT_REQUIREMENT = NOT_ESTABLISHED
```

No such setting is introduced by 004C1T.

## 11. Exact future `.npmrc` bytes remain unresolved

004C1T does not decide whether the current file will later be deleted or replaced by an empty/nonempty separately qualified file.

```text
NPMRC_FUTURE_EXISTENCE = UNRESOLVED_FAIL_CLOSED
NPMRC_FUTURE_EXACT_CONTENT = NOT_AUTHORIZED
NPMRC_FUTURE_BYTE_LENGTH = NOT_ESTABLISHED
NPMRC_FUTURE_SHA256 = NOT_ESTABLISHED
NPMRC_DELETE_VS_REPLACE = NOT_AUTHORIZED
NPMRC_MUTATION = NOT_AUTHORIZED
```

This separation prevents semantic qualification from silently becoming byte-mutation authority.

## 12. `pnpm-workspace.yaml` semantic migration boundary

The seven-day maturity semantic belongs to the future pnpm project-settings object.

004C1T adds only this already-required semantic binding to the future serialization input set:

```yaml
minimumReleaseAge: 10080
```

The fragment is semantic illustration, not exact serialization authority.

Canonical independent owners remain:

```text
WORKSPACE_MEMBERSHIP_SEMANTICS = CANONICAL_004C1S
PACKAGE_EXTENSION_SEMANTICS = CANONICAL_004C1L
PACKAGE_EXTENSION_SERIALIZATION_OWNER = CANONICAL_004C1Q
PEER_POLICY_SEMANTICS = CANONICAL_004C1G_H
MINIMUM_RELEASE_AGE_SEMANTICS = CANONICAL_004C1G_PLUS_004C1T_RECONCILIATION
```

No complete workspace YAML object, ordering, quoting, comments, line endings, byte length, or digest is frozen here.

## 13. No silent compatibility assumption

A future pnpm resolver must not rely on accidental compatibility with imported npm settings.

Before canonical resolver execution:

1. the current three-key `.npmrc` state must no longer be an unresolved repository-controlled resolver input;
2. canonical pnpm project settings must explicitly encode required pnpm-owned policies;
3. every retained `.npmrc` setting, if any, must have an explicit owner and exact semantic purpose;
4. registry/auth/proxy/TLS inputs must remain separately evidence-bound;
5. no credential may enter repository evidence.

## 14. Registry and authentication separation

The pnpm v10 `.npmrc` documentation identifies `.npmrc` as a configuration surface for registry and authorization settings.

004C1T does not authorize registry or authentication configuration because no such repository-level requirement is established by this grain.

```text
REGISTRY_BASE_URL_FOR_EXECUTION = NOT_AUTHORIZED
REGISTRY_AUTH_SOURCE = NOT_AUTHORIZED
REGISTRY_MIRROR = NOT_AUTHORIZED
PROXY_CONFIGURATION = NOT_AUTHORIZED
CUSTOM_CA_OR_CERTIFICATE = NOT_AUTHORIZED
CREDENTIAL_STORAGE = NOT_AUTHORIZED
```

Public-registry execution remains a future resolver/network authorization boundary.

## 15. Security consequences

This reconciliation prevents three classes of ambiguity:

1. **peer-policy ambiguity** — imported npm behavior must not weaken canonical pnpm strict-peer rules;
2. **maturity-window ambiguity** — the npm key/value pair `min-release-age=7` must not be copied literally into pnpm policy, where the canonical pnpm-owned setting is `minimumReleaseAge` measured in minutes and the seven-day value is `10080`;
3. **dedupe-policy ambiguity** — npm-specific intent must not be translated into pnpm resolution behavior without first-party evidence and canonical need.

These are package-supply-chain controls, not formatting preferences.

## 16. Resolver readiness remains fail closed

Even after this planning grain becomes canonical, resolver execution remains blocked by other unresolved prerequisites.

At minimum, live postmerge reconciliation must still account for:

```text
PNPM_WORKSPACE_EXACT_CONTENT = NOT_ESTABLISHED
PNPM_WORKSPACE_SHA256 = NOT_ESTABLISHED
NPMRC_EXACT_MUTATION = NOT_AUTHORIZED
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

No one of these may be inferred from task numbering or from the presence of the root `package.json`.

## 17. Deterministic acceptance criteria

004C1T may close canonically only if all of the following remain true:

1. canonical predecessor main is exactly `640298d6920b8b9204f5dcc6cc8f5573030e804f`;
2. changed surface is exactly this one Signthos-authored planning file;
3. the current `.npmrc` blob, byte length, SHA-256, and exact three-key content are recorded correctly;
4. pnpm source evidence remains bound to exact `v10.34.5` source commit `702ad5f860ffd50d64a3a711d9f8a3da16fc796e`;
5. pnpm documentation evidence remains bound to exact commit `b015f4e6d789d894847e432d0cc771526a55cd27`;
6. `legacy-peer-deps=true` is excluded from canonical Signthos pnpm peer-policy ownership;
7. `prefer-dedupe=true` is not assigned an invented pnpm equivalent;
8. `min-release-age=7` is classified as imported npm seven-day policy and pnpm consumption of that exact key is not asserted without evidence;
9. direct literal key/value migration from `min-release-age=7` to pnpm is forbidden;
10. the future semantic migration is exactly `minimumReleaseAge = 10080` on the pnpm project-settings surface;
11. none of the three current settings is retained as future canonical pnpm-resolution `.npmrc` policy;
12. delete-versus-replace and exact future `.npmrc` bytes remain unresolved and unauthorized;
13. complete `pnpm-workspace.yaml` bytes remain unresolved and unauthorized;
14. no package manager, Node, Corepack, resolver, registry, dependency, classifier, structural provider, or PDF runtime is executed;
15. no `.npmrc`, workspace, manifest, lockfile, package, source, fixture, workflow, provenance, database, or container mutation occurs outside this one planning file;
16. exact-head Actions/check/provider state is recorded truthfully;
17. fresh independent substantive review covers the exact complete candidate head/tree;
18. every material review finding is repaired forward-only and any changed head is freshly reviewed;
19. unresolved material review threads are zero;
20. immediate exact-head premerge race proof is recorded;
21. guarded normal merge uses the exact reviewed `expected_head_sha`;
22. postmerge verification proves canonical main, ordered parents, reviewed-head/merge-tree equality, valid merge signature, exact changed surface, and truthful workflow/status accounting;
23. fresh Issue #7 reconciliation derives any successor rather than assuming it.

## 18. Explicit non-grants

```text
NPMRC_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_YAML_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_EXACT_BYTES = NOT_AUTHORIZED
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_CREATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_PACKAGE_JSON = NOT_AUTHORIZED
PACKAGE_MANAGER_EXECUTION = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
NETWORK_REGISTRY_EXECUTION = NOT_AUTHORIZED
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

## 19. Successor boundary

Closing 004C1T does not automatically authorize `.npmrc` mutation, workspace-file serialization, provider-package creation, package-manager provisioning, resolver execution, dependency acquisition, or admission implementation.

Fresh postmerge reconciliation must determine the smallest dependency-ordered successor from live canonical truth. Candidate unresolved directions include:

- complete pnpm project-settings semantic aggregation before exact workspace bytes;
- exact workspace-file byte serialization qualification;
- exact `.npmrc` retirement/replacement-byte qualification;
- `packages/providers` package-manifest qualification;
- package-manager/Node provisioning qualification.

This list is diagnostic only. It grants no successor authority.

## 20. Candidate result

Before independent exact-head review and guarded merge:

```text
004C1T_NPMRC_RECONCILIATION = QUALIFIED_CANDIDATE
CURRENT_NPMRC_THREE_KEY_SET = NOT_ACCEPTABLE_AS_CANONICAL_PNPM_RESOLVER_POLICY
LEGACY_PEER_DEPS_FUTURE_POLICY = REMOVE
PREFER_DEDUPE_FUTURE_POLICY = REMOVE_WITHOUT_INFERRED_REPLACEMENT
MIN_RELEASE_AGE_FUTURE_POLICY = REMOVE_AND_SEMANTICALLY_MIGRATE_7_DAYS_TO_MINIMUM_RELEASE_AGE_10080_MINUTES
NPMRC_MUTATION_AUTHORITY = ABSENT
PNPM_WORKSPACE_MUTATION_AUTHORITY = ABSENT
RESOLVER_READINESS = FAIL_CLOSED
DEPENDENCY_ACQUISITION_READINESS = FAIL_CLOSED
IMPLEMENTATION_AUTHORITY = ABSENT
CANONICAL_STATUS = CANDIDATE_ONLY
```
