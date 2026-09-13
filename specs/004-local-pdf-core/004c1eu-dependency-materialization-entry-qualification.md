# Specification 004C1EU — Dependency Materialization Entry Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_ENTRY_ONLY / ZERO_DEPENDENCY_ACQUISITION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `9780e5cc4644e35d583583489981ac80c63caad8`
Canonical base tree: `93db4e1bbd1133df50d1defb4f7ae27f4a6aac75`
Authority source: `github:issue-comment:5653486560`

## 1. Purpose and authority boundary

004C1EU determines whether the canonical package-control, resolver, lockfile, package-identity, PDFium provenance, and repository-adoption prerequisites now converge sufficiently to admit a later, separately authorized deterministic project-dependency materialization grain.

```text
004C1EU_AUTHORITY = PLANNING_ENTRY_QUALIFICATION_ONLY
004C1EU_ALLOWED_PATH = specs/004-local-pdf-core/004c1eu-dependency-materialization-entry-qualification.md
004C1EU_MAX_CHANGED_REPOSITORY_FILES = 1
PUBLIC_REGISTRY_METADATA_REVALIDATION = AUTHORIZED_READ_ONLY
DEPENDENCY_INSTALLATION = NOT_AUTHORIZED
DEPENDENCY_ARCHIVE_ACQUISITION = NOT_AUTHORIZED
PACKAGE_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_MUTATION = NOT_AUTHORIZED
NPMRC_MUTATION = NOT_AUTHORIZED
PROVENANCE_MUTATION = NOT_AUTHORIZED
SOURCE_OR_BINARY_IMPORT = NOT_AUTHORIZED
NODE_OR_PNPM_EXECUTION = NOT_AUTHORIZED
PDFIUM_RUNTIME_EXECUTION = NOT_AUTHORIZED
GENERAL_004C_RUNTIME = NOT_AUTHORIZED
DISTRIBUTION_ACTIVATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
```

No package manager, resolver, dependency, provider, PDF runtime, container, or project lifecycle code is executed by this grain.

## 2. Exact live repository state consumed

Fresh reread of canonical `main` at the 004C1ET merge proves:

```text
CANONICAL_MAIN = 9780e5cc4644e35d583583489981ac80c63caad8
CANONICAL_MAIN_TREE = 93db4e1bbd1133df50d1defb4f7ae27f4a6aac75
ROOT_PACKAGE_JSON = PRESENT
ROOT_PACKAGE_JSON_BLOB = 510341a3ad1bad08084e338152da8bef1f698b14
ROOT_PNPM_WORKSPACE_YAML = PRESENT
ROOT_PNPM_WORKSPACE_BLOB = 2e6712fa22a1d01547cec4249d1c12b0c2cfeaf1
ROOT_PNPM_LOCK_YAML = PRESENT
ROOT_PNPM_LOCK_YAML_BLOB = 015e3cfc386743731544f3c889f2d01a76a71a62
ROOT_NPMRC = ABSENT
PDFIUM_COMPONENT_ADOPTION = PRESENT
PDFIUM_ADOPTION_BLOB = 694234d7282083ead66b406c1d924976d9723db1
```

The root manifest declares exactly these eight direct runtime dependencies at exact version `2.15.0`:

```text
@embedpdf/core
@embedpdf/pdfium
@embedpdf/plugin-document-manager
@embedpdf/plugin-interaction-manager
@embedpdf/plugin-render
@embedpdf/plugin-search
@embedpdf/plugin-selection
@embedpdf/plugin-thumbnail
```

It also fixes `packageManager=pnpm@10.34.5` and `engines.node=24.20.0`.

The live `pnpm-workspace.yaml` preserves the canonical repository policy: `autoInstallPeers=false`, `strictPeerDependencies=true`, `managePackageManagerVersions=false`, strict package-manager/version enforcement, `minimumReleaseAge=10080`, `blockExoticSubdeps=true`, exactly one explicit non-root workspace member (`packages/providers`), and the exact nine package-scoped framework-peer omission selectors. No registry/authentication or lifecycle-build allowlist is present.

The live lockfile is lockfile version `9.0`, records the exact eight root specifiers at `2.15.0`, and binds package-resolution integrity values. This grain does not regenerate or reinterpret those bytes.

## 3. Canonical execution and provenance prerequisites consumed without reopening

Canonical predecessor work already established the following exact identities and boundaries:

```text
PACKAGE_MANAGER = pnpm@10.34.5
PACKAGE_MANAGER_SOURCE_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
NODE_VERSION = 24.20.0
FIRST_RESOLVER_PLATFORM = linux-x64-glibc
COREPACK = NOT_USED
PNPM_SELF_MANAGED_VERSION_DOWNLOAD = DISABLED
PROXY = NONE
REGISTRY_ORIGIN = https://registry.npmjs.org/
DEPENDENCY_LIFECYCLE_SCRIPTS = DENY_BY_DEFAULT
PROJECT_PACKAGE_ARCHIVE_DOWNLOAD_IN_LOCKFILE_ONLY_RESOLVER = PROHIBITED
```

Canonical 004C1AA measured the exact isolated Node/pnpm toolchain artifacts without executing them. Canonical resolver/lockfile grains subsequently qualified the exact lockfile-generation substrate and deterministic repository control bytes. 004C1EU does not promote any historical exploratory run into new evidence and does not reopen platform claims.

Canonical 004C1ET now additionally proves repository adoption of the complete frozen PDFium component NOTICE/license evidence under `provenance/components/pdfium-2.15.0/`.

The adopted component binds:

```text
NPM_IDENTITY = @embedpdf/pdfium@2.15.0
PUBLISHED_WASM_PATH = package/dist/pdfium.wasm
PUBLISHED_WASM_BYTES = 4633788
PUBLISHED_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
NOTICE_SHA256 = 9ce821c509d524f0744daa516cb4eb75683db10909b4e7535264a7a030cef5e3
INVENTORY_SHA256 = 2b564bb641ff544e25ecf12eb8e860d4537d5c8ea2faac301e517207bd9b37af
CLOSURE_ROWS = 24
UNRESOLVED_ROWS = 0
```

No developer-local evidence path is present in the adopted metadata.

## 4. Fresh exact-version registry revalidation

Fresh read-only npm-registry metadata revalidation was performed for all eight direct roots. Every exact version remains published, non-deprecated, and reports license `MIT`. The observed exact-version SHA-1 values match the canonical 004C1I registry identities:

| Exact identity | Fresh registry SHA-1 | Canonical parity |
| --- | --- | --- |
| `@embedpdf/core@2.15.0` | `6c3d962910afdd63f88725c92afb872f1cf430e4` | PASS |
| `@embedpdf/pdfium@2.15.0` | `b073cf9cee2252507c4fc81fb47a156cb2a19662` | PASS |
| `@embedpdf/plugin-document-manager@2.15.0` | `2a9cfc2a9942c54d23432209942448a1a81b0c12` | PASS |
| `@embedpdf/plugin-interaction-manager@2.15.0` | `d899c14f262358d7120124d5cf9d4e9df4dcf885` | PASS |
| `@embedpdf/plugin-render@2.15.0` | `da1cfac73c3f8f8dcd064a7fc27d953b73eb2d3a` | PASS |
| `@embedpdf/plugin-search@2.15.0` | `4dc1dc7c80bbf1f121f34cfb5208456439078048` | PASS |
| `@embedpdf/plugin-selection@2.15.0` | `a2f269c0b66ef96ea06ad68c731cd3233346194f` | PASS |
| `@embedpdf/plugin-thumbnail@2.15.0` | `ca68dc15714a5790295eb569507acdb3b59bf9c5` | PASS |

The fresh exact-version vulnerability lookup reported no known OSV findings for those eight direct roots at the time of revalidation. This is a time-bounded metadata observation, not a permanent security claim and not a substitute for a fresh full resolved-closure check immediately before dependency acquisition.

The exact PDFium tarball SHA-1 remains `b073cf9cee2252507c4fc81fb47a156cb2a19662`, matching the canonical exact-tarball evidence whose acquired bytes were independently measured as SHA-256 `fe0cb4677782a58b67f555df9a1257742bcfbf390b9a3e08bd8ad976eea436bb` and whose registry SRI matched the canonical lockfile.

## 5. Convergence result

The former entry blockers now converge at the repository-control/provenance level:

```text
EXACT_DIRECT_DECLARATION_SET = PASS
EXACT_PACKAGE_MANAGER_PIN = PASS
EXACT_NODE_BASELINE = PASS
EXACT_WORKSPACE_POLICY = PASS
EXACT_LOCKFILE_PRESENT = PASS
ROOT_NPMRC_ABSENT = PASS
DIRECT_ROOT_REGISTRY_IDENTITY_REVALIDATION = PASS
DIRECT_ROOT_CANONICAL_SHA1_PARITY = 8_OF_8
DIRECT_ROOT_KNOWN_OSV_FINDINGS_AT_LOOKUP = 0
PDFIUM_TARBALL_IDENTITY_EVIDENCE = PRESENT
PDFIUM_PUBLISHED_WASM_IDENTITY_EVIDENCE = PRESENT
PDFIUM_NOTICE_LICENSE_COMPONENT_ADOPTION = PASS
PDFIUM_NOTICE_LICENSE_UNRESOLVED_ROWS = 0
```

Therefore the planning entry gate is satisfied for a later bounded dependency-materialization qualification. This conclusion does **not** itself authorize any download, install, extraction, `node_modules` creation, lifecycle execution, runtime execution, or distribution.

```text
004C1EU_ENTRY_QUALIFICATION = PASS_CANDIDATE
LATER_DEPENDENCY_MATERIALIZATION_GRAIN_ELIGIBILITY = PRESENT_SUBJECT_TO_FRESH_SUCCESSOR_AUTHORITY
DEPENDENCY_MATERIALIZATION_AUTHORITY_NOW = ABSENT
```

## 6. Mandatory fail-closed successor requirements

Any later dependency-materialization grain must be freshly authorized after 004C1EU canonical closeout and must, at minimum:

1. reverify exact canonical `main`, package/workspace/lockfile bytes, and the complete resolved package identity set immediately before execution;
2. revalidate authoritative registry metadata and registry-native integrity for every archive that would actually be acquired, not only the eight direct roots;
3. bind the exact previously qualified Node and pnpm toolchain identities and the qualified execution platform/substrate;
4. use a unique empty external evidence root, isolated home/cache/store/temp surfaces, deny-by-default environment, no credentials, no proxy, and exact registry network allowlist;
5. acquire only lockfile-bound public npm package archives whose exact identity and integrity are proven before extraction;
6. compute local cryptographic hashes over acquired archive bytes and compare them to authoritative/canonical identities where available;
7. preserve lifecycle/build execution as deny-by-default and prove whether any dependency attempts a lifecycle script before allowing it;
8. preserve repository mutation scope explicitly; no source, provenance, workflow, database, fixture, deployment, or unrelated control-file mutation may occur;
9. account for optional/platform-specific graph behavior and make no cross-platform claim from one materialization tuple;
10. produce deterministic acquisition/materialization evidence suitable for independent exact-head review before any runtime authority is considered.

Any metadata drift, integrity mismatch, unexpected package, exotic source, undeclared host, lifecycle execution, repository mutation, provenance gap, unresolved license/notice requirement, or platform ambiguity fails closed.

## 7. Explicit non-grants

```text
PROJECT_DEPENDENCY_ARCHIVE_DOWNLOAD = NOT_AUTHORIZED
PROJECT_DEPENDENCY_INSTALLATION = NOT_AUTHORIZED
NODE_MODULES_CREATION = NOT_AUTHORIZED
LIFECYCLE_SCRIPT_EXECUTION = NOT_AUTHORIZED
PACKAGE_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
PROVENANCE_MUTATION = NOT_AUTHORIZED
PDFIUM_RUNTIME_EXECUTION = NOT_AUTHORIZED
BROWSER_PROVIDER_RUNTIME = NOT_AUTHORIZED
DISTRIBUTION_ACTIVATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

## 8. Candidate acceptance and merge gate

004C1EU may close canonically only if:

1. its base is exactly `9780e5cc4644e35d583583489981ac80c63caad8` / tree `93db4e1bbd1133df50d1defb4f7ae27f4a6aac75`;
2. exactly this one Signthos-authored qualification artifact changes;
3. all repository-control identities and current authority boundaries are represented truthfully;
4. the fresh direct-root registry snapshot is bound without converting metadata observations into archive-acquisition evidence;
5. no dependency/network/runtime execution or package/control/provenance mutation occurs;
6. exact-head workflow/check/provider state is recorded truthfully;
7. a fresh independent substantive review covers the exact final head;
8. every material finding is repaired forward-only and any changed head receives fresh review;
9. unresolved material review threads are zero;
10. immediate premerge race proof re-verifies canonical main, exact head/tree, changed surface, review evidence, workflows/checks, mergeability, and competing authority;
11. guarded normal merge uses exact expected head SHA;
12. post-merge verification proves reviewed-head/merge-tree equality, ordered parents, signature, exact changed surface, and truthful workflow state;
13. Issue #7 performs a fresh successor reconciliation before any dependency acquisition/materialization authority is derived.

No task numbering or planning result may be treated as successor authority.