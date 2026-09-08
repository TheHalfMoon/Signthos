# Specification 004C1V — `.npmrc` Deletion Materialization Evidence

Status: `MATERIALIZATION_CANDIDATE / BOUNDED_CONFIG_DELETION_ONLY / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `f31cb308f17de5180e70eae99e383cdca589531b`
Canonical predecessor tree: `a7b50237235218414613c9c2eb1733cffd431c4c`
Authority source: `github:issue-comment:5589179007`

## 1. Purpose and exact authority

004C1V materializes one already-qualified future control-plane state: repository-root `.npmrc` absence.

Canonical 004C1U selected:

```text
NPMRC_FUTURE_EXISTENCE = ABSENT
NPMRC_FUTURE_DISPOSITION = DELETE_CURRENT_IMPORTED_REPOSITORY_NPMRC
```

004C1V does not select new package-manager policy. It performs the exact bounded deletion required to make live repository state converge with that already-canonical target.

```text
004C1V_AUTHORITY = BOUNDED_CONFIG_DELETION_MATERIALIZATION_ONLY
004C1V_CANONICAL_BASE = f31cb308f17de5180e70eae99e383cdca589531b
004C1V_CANONICAL_BASE_TREE = a7b50237235218414613c9c2eb1733cffd431c4c
004C1V_ALLOWED_PATH_1 = .npmrc
004C1V_ALLOWED_PATH_2 = specs/004-local-pdf-core/004c1v-npmrc-deletion-materialization-evidence.md
004C1V_MAX_CHANGED_FILES = 2
```

## 2. Exact predecessor `.npmrc` identity

Immediately before this candidate, live canonical main contains exactly:

```text
PATH = /.npmrc
GIT_BLOB = cbc6b6537fba6c69756ad16e69a35cc056791d99
BYTE_LENGTH = 65
SHA256 = 409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d
```

Exact UTF-8 text:

```ini
legacy-peer-deps = true
prefer-dedupe = true
min-release-age = 7
```

The deletion is authorized only for that exact predecessor blob. Any different live identity invalidates this candidate.

## 3. Canonical reasons for deletion

Canonical 004C1T already excluded all three predecessor settings from future pnpm resolver policy:

```text
legacy-peer-deps = REMOVE
prefer-dedupe = REMOVE_WITHOUT_INFERRED_PNPM_REPLACEMENT
min-release-age = REMOVE_AND_SEMANTICALLY_MIGRATE_7_DAYS_TO_minimumReleaseAge_10080_MINUTES
```

Canonical 004C1U then established that no repository-level registry, authentication, proxy, TLS, certificate, or other retained `.npmrc` semantic requirement is currently proven and selected repository `.npmrc` absence as the least-authority first pnpm resolver-control state.

004C1V consumes those decisions without reopening them.

## 4. Exact materialization operation

The candidate operation is exactly:

```text
DELETE /.npmrc
EXPECTED_DELETED_BLOB = cbc6b6537fba6c69756ad16e69a35cc056791d99
CREATE /specs/004-local-pdf-core/004c1v-npmrc-deletion-materialization-evidence.md
ALL_OTHER_PATHS = UNCHANGED
```

No empty replacement file and no non-empty replacement file are permitted in this grain.

## 5. Target repository state

If this candidate becomes canonical, the required postmerge state is:

```text
ROOT_NPMRC = ABSENT
LEGACY_PEER_DEPS_IMPORTED_SETTING = NOT_PRESENT_AS_REPOSITORY_INPUT
PREFER_DEDUPE_IMPORTED_SETTING = NOT_PRESENT_AS_REPOSITORY_INPUT
MIN_RELEASE_AGE_IMPORTED_NPM_SETTING = NOT_PRESENT_AS_REPOSITORY_INPUT
HISTORICAL_NPMRC_PROVENANCE = PRESERVED_IN_GIT_HISTORY
```

Absence does not establish the complete future pnpm resolver configuration. It only removes the obsolete imported repository input.

## 6. Zero-runtime and zero-acquisition boundary

No package manager, Node runtime, Corepack, resolver, registry request, dependency installation, provider, classifier, structural PDF runtime, or fixture runtime is executed by 004C1V.

```text
PACKAGE_MANAGER_EXECUTION = NOT_PERFORMED
NODE_EXECUTION = NOT_PERFORMED
COREPACK_EXECUTION = NOT_PERFORMED
RESOLVER_EXECUTION = NOT_PERFORMED
REGISTRY_NETWORK_EXECUTION = NOT_PERFORMED
DEPENDENCY_ACQUISITION_OR_INSTALLATION = NOT_PERFORMED
FIXTURE_EXECUTION = NOT_PERFORMED
CLASSIFIER_RUNTIME_EXECUTION = NOT_PERFORMED
STRUCTURAL_PDF_RUNTIME_EXECUTION = NOT_PERFORMED
```

No runtime success, resolver readiness, lockfile correctness, package availability, provider functionality, or PDF behavior is claimed.

## 7. Other package-control surfaces remain unchanged

004C1V does not create, modify, delete, execute, or qualify exact bytes for:

```text
/package.json
/pnpm-workspace.yaml
/pnpm-lock.yaml
/packages/providers/**
```

In particular:

```text
PNPM_WORKSPACE_EXACT_CONTENT = NOT_ESTABLISHED
PNPM_WORKSPACE_SHA256 = NOT_ESTABLISHED
PACKAGES_PROVIDERS_PACKAGE_MANIFEST = ABSENT
EXACT_PNPM_PROVISIONING_MECHANISM = NOT_AUTHORIZED
EXACT_RESOLVER_COMMAND = NOT_AUTHORIZED
EXACT_NETWORK_ALLOWLIST = NOT_AUTHORIZED
LOCKFILE = NOT_GENERATED
```

## 8. Security and provenance effect

The deletion reduces active repository resolver-input surface without erasing historical evidence.

```text
ACTIVE_IMPORTED_NPM_POLICY_SURFACE = REMOVED
GIT_HISTORY = PRESERVED
SOURCE_IMPORT = NONE
LICENSE_BOUNDARY_CHANGE = NONE
CREDENTIAL_MUTATION = NONE
SECRET_MATERIAL = NONE
```

No claim is made that `.npmrc` is generally unsafe. The selected absence applies only to the current Signthos first pnpm resolver-control state because no repository-owned semantic requirement remains for this file.

## 9. Deterministic acceptance criteria

004C1V may close canonically only if all of the following are proven:

1. canonical base is exactly `f31cb308f17de5180e70eae99e383cdca589531b`;
2. canonical base tree is exactly `a7b50237235218414613c9c2eb1733cffd431c4c`;
3. pre-change `.npmrc` blob is exactly `cbc6b6537fba6c69756ad16e69a35cc056791d99` and size 65 bytes;
4. base-to-head changed surface is exactly `.npmrc` deletion plus this evidence document;
5. `.npmrc` has no replacement blob at candidate head;
6. `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, packages, source, fixtures, workflows, provenance, database and runtime surfaces are otherwise unchanged;
7. no package-manager/runtime/network/dependency/provider/PDF execution occurs;
8. exact-head Actions/check/provider state is recorded truthfully;
9. fresh independent substantive review covers the complete exact candidate head/tree;
10. every material finding is repaired forward-only and any changed head is freshly reviewed;
11. unresolved material review threads are zero;
12. immediate premerge race proof re-verifies base/head/tree, `.npmrc` absence, authority, review evidence, checks, rulesets/protection and competing PR state;
13. guarded normal merge uses the exact reviewed expected head SHA;
14. postmerge verification proves canonical main, ordered parents, reviewed-head/merge-tree equality, valid merge signature and exact two-path surface;
15. postmerge tree proves `.npmrc = ABSENT`;
16. postmerge Actions/status accounting is truthful;
17. fresh Issue #7 reconciliation derives any successor rather than assuming it.

## 10. Explicit non-grants

```text
NPMRC_REPLACEMENT = NOT_AUTHORIZED
NPMRC_NEW_BYTES = NOT_AUTHORIZED
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

## 11. Successor boundary

004C1V does not imply a resolver or implementation successor automatically.

After canonical closeout, fresh live reconciliation must choose the next smallest unresolved package-control prerequisite. Canonical 004C1U identifies a likely later planning need to aggregate already-qualified pnpm project-setting semantics and classify any unresolved optional/platform or execution-bound settings before exact `pnpm-workspace.yaml` bytes can be frozen, but this document does not authorize that successor.
