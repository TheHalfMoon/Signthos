# Specification 004C1Z — Resolver Execution Environment Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_EXECUTION_ENVIRONMENT_ONLY / ZERO_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `9d303e32ca6dffbc95d226bb2ce311cee0733f31`
Canonical predecessor tree: `41d6184cab36720dc72f76b41ba0ba15d7b541ed`
Authority source: `github:issue-comment:5590816708`

## 1. Purpose and exact authority

004C1Z qualifies the execution-environment contract that a future, separately authorized resolver-evidence unit must satisfy before it may acquire toolchain bytes, execute Node or pnpm, access the npm registry, generate `pnpm-lock.yaml`, or claim a resolved dependency graph.

```text
004C1Z_AUTHORITY = PLANNING_EXECUTION_ENVIRONMENT_QUALIFICATION_ONLY
004C1Z_ALLOWED_PATH = specs/004-local-pdf-core/004c1z-resolver-execution-environment-qualification.md
004C1Z_MAX_CHANGED_FILES = 1
PUBLIC_FIRST_PARTY_RELEASE_METADATA_RESEARCH = AUTHORIZED
PUBLIC_PACKAGE_METADATA_RESEARCH = AUTHORIZED_READ_ONLY
PACKAGE_MANAGER_PROVISIONING_EXECUTION = NOT_AUTHORIZED
NODE_PROVISIONING_EXECUTION = NOT_AUTHORIZED
PACKAGE_MANAGER_EXECUTION = NOT_AUTHORIZED
NODE_EXECUTION = NOT_AUTHORIZED
COREPACK_EXECUTION = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
REGISTRY_PACKAGE_ACQUISITION = NOT_AUTHORIZED
DEPENDENCY_ACQUISITION_OR_INSTALLATION = NOT_AUTHORIZED
PACKAGE_ARCHIVE_DOWNLOAD_OR_IMPORT = NOT_AUTHORIZED
```

This grain executes no package manager, Node runtime, Corepack, resolver, dependency, provider, fixture, or PDF runtime. It downloads no package or runtime archive and creates no lockfile, package, source, fixture, cache, provenance, NOTICE, SBOM, workflow, or container artifact.

## 2. Canonical inputs consumed without reopening

The following repository-owned decisions are already canonical and are consumed as fixed inputs:

```text
PACKAGE_MANAGER_FAMILY = pnpm
PACKAGE_MANAGER_VERSION = 10.34.5
PACKAGE_MANAGER_SOURCE_TAG = pnpm/pnpm@v10.34.5
PACKAGE_MANAGER_SOURCE_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
RESOLVER_NODE_BASELINE = 24.20.0_LTS
COREPACK_POLICY = NOT_USED
PNPM_SELF_MANAGED_VERSION_DOWNLOAD = DISABLED_REQUIRED
PACKAGE_MANAGER_STRICT = REQUIRED
PACKAGE_MANAGER_STRICT_VERSION = REQUIRED
LOCKFILE_FAMILY = pnpm-lock.yaml
ROOT_PACKAGE_JSON = PRESENT / EXACT_CANONICAL_BYTES
ROOT_PNPM_WORKSPACE_YAML = PRESENT / EXACT_CANONICAL_BYTES
ROOT_NPMRC = ABSENT
PACKAGES_PROVIDERS = ABSENT
```

Current exact repository control-file identities at the 004C1Z base are:

```text
ROOT_PACKAGE_JSON_BYTE_LENGTH = 509
ROOT_PACKAGE_JSON_SHA256 = 71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183
ROOT_PNPM_WORKSPACE_BYTE_LENGTH = 2473
ROOT_PNPM_WORKSPACE_SHA256 = 695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f
ROOT_PNPM_LOCK_YAML = ABSENT
```

004C1Z does not reopen package identities, dependency declarations, framework-peer omission policy, workspace membership, project-setting semantics, `.npmrc` disposition, or exact repository control-file bytes.

## 3. Fresh public evidence snapshot

Fresh read-only evidence was revalidated on 2026-09-08.

### pnpm source identity

First-party GitHub tag truth:

```text
REPOSITORY = https://github.com/pnpm/pnpm
TAG = refs/tags/v10.34.5
TAG_OBJECT_TYPE = commit
TAG_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
SOURCE_PACKAGE_PATH = pnpm/package.json
SOURCE_PACKAGE_NAME = pnpm
SOURCE_PACKAGE_VERSION = 10.34.5
SOURCE_PACKAGE_LICENSE = MIT
SOURCE_PACKAGE_BIN_PNPM = bin/pnpm.cjs
SOURCE_NODE_ENGINE = >=18.12
```

The exact source manifest identifies `bin/pnpm.cjs` as the `pnpm` CLI entry point. This establishes a source-level entry-point identity only; it does not prove the exact bytes of the published tarball entry point.

### pnpm published package metadata

Current exact-version npm-registry-derived metadata for `pnpm@10.34.5` reports:

```text
PACKAGE = pnpm@10.34.5
LICENSE = MIT
TARBALL_URL = https://registry.npmjs.org/pnpm/-/pnpm-10.34.5.tgz
REGISTRY_DIST_SHASUM_SHA1 = 6a91127a7f2ca72fe53bb9ff54883e0c75b22f17
KNOWN_OSV_VULNERABILITIES_AT_LOOKUP = NONE_REPORTED
NPM_SIGSTORE_PROVENANCE = ABSENT
```

Absence of npm Sigstore provenance is not converted into source equivalence or source mismatch. The pinned Git source identity and the published tarball identity remain separate evidence objects until a future acquisition grain can inspect exact acquired bytes.

Independent public package-control records consistently expose this pnpm 10.34.5 SHA-512 integrity value:

```text
CORROBORATIVE_PNPM_SHA512_HEX = a4ee05f2f73658255bd6a89859c065a45c28a57daefae2c893a168ee2b73168c37b91e83e57ea67654ad03f03031746430e8bce38e362e042605fb8abc80192e
CORROBORATIVE_PNPM_SRI = sha512-pO4F8vc2WCVb1qiYWcBlpFwopX2u+uLIk6Fo7itzFow3uR6D5X6mdlStA/AwMXRkMOi84442LgQmBfuKvIAZLg==
CORROBORATIVE_PNPM_TARBALL_SHA256 = ccb5c479cab1b00621325bfe7d4c9a8a8031e7a525d7249e275ecbec81b08db2
```

These values are useful cross-checks but are **not promoted to authoritative npm-registry evidence by 004C1Z** because the available registry read interface did not independently expose `dist.integrity` or SHA-256. A future acquisition-authorizing unit must re-read authoritative npm packument metadata immediately before acquisition, then compute SHA-256 locally over the exact acquired tarball bytes.

### Node.js official release identity

First-party Node.js release evidence reports:

```text
NODE_VERSION = 24.20.0
NODE_RELEASE_LINE = Krypton
NODE_RELEASE_STATUS = LTS
NODE_RELEASE_DATE = 2026-08-26
FIRST_RESOLVER_NODE_ARTIFACT = node-v24.20.0-linux-x64.tar.xz
NODE_ARTIFACT_URL = https://nodejs.org/dist/v24.20.0/node-v24.20.0-linux-x64.tar.xz
NODE_ARTIFACT_SHA256 = 2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2
NODE_SHASUMS_SOURCE = https://nodejs.org/dist/v24.20.0/SHASUMS256.txt
NODE_SHASUMS_SIGNATURE_SOURCE = https://nodejs.org/dist/v24.20.0/SHASUMS256.txt.asc
```

The Node release publishes signed SHA-256 checksums. 004C1Z selects the official Linux x64 `.tar.xz` archive only as the first resolver-evidence toolchain artifact. It does not download or execute it.

## 4. Provisioning mechanism qualification

The future resolver evidence must not rely on ambient Node, ambient pnpm, Corepack, a global package installation, or pnpm self-version-management.

The qualified provisioning shape is:

```text
PROVISIONING_STYLE = ISOLATED_EXACT_ARCHIVE_EXTRACTION
COREPACK = NOT_USED
GLOBAL_NPM_INSTALL_OF_PNPM = NOT_USED
SYSTEM_PACKAGE_MANAGER_INSTALL = NOT_USED
PNPM_SELF_MANAGED_VERSION_DOWNLOAD = DISABLED
AMBIENT_PATH_NODE = NOT_TRUSTED
AMBIENT_PATH_PNPM = NOT_TRUSTED
```

A future separately authorized acquisition/provisioning unit must:

1. acquire the exact official Node archive named in Section 3;
2. verify its bytes against the official Node SHA-256 before extraction;
3. extract Node into a dedicated isolated toolchain directory outside the repository;
4. compute and record the extracted `bin/node` SHA-256 before any Node execution;
5. acquire exactly `pnpm@10.34.5` from the public npm registry tarball identity named in Section 3;
6. re-read authoritative npm registry metadata immediately before acquisition and bind the exact `dist.shasum`, `dist.integrity`, tarball URL, signatures/attestations if present, and publication metadata;
7. verify registry-native integrity before extraction;
8. compute and record SHA-256 over the exact acquired pnpm tarball bytes;
9. extract the tarball into a dedicated isolated pnpm tool directory outside the repository;
10. verify the published package manifest identifies `name=pnpm`, `version=10.34.5`, and `bin.pnpm=bin/pnpm.cjs`;
11. compute and record SHA-256 over the exact extracted `bin/pnpm.cjs` bytes;
12. invoke pnpm only through the exact extracted Node executable and exact extracted pnpm entry point in a later execution-authorizing unit.

Until those acquired-byte checks occur:

```text
NODE_EXTRACTED_EXECUTABLE_SHA256 = NOT_YET_COMPUTED
PNPM_AUTHORITATIVE_DIST_INTEGRITY = MUST_BE_REVALIDATED_FROM_NPM_PACKUMENT
PNPM_ACQUIRED_TARBALL_SHA256 = NOT_YET_COMPUTED
PNPM_EXTRACTED_ENTRYPOINT_SHA256 = NOT_YET_COMPUTED
EXECUTION_ELIGIBILITY = FAIL_CLOSED
```

004C1Z does not fabricate these values.

## 5. First resolver platform contract

The first resolver evidence run is constrained to the Node artifact's platform class:

```text
TARGET_OS = linux
TARGET_ARCH = x64
TARGET_LIBC_FAMILY = glibc
NODE_DISTRIBUTION_FLAVOR = linux-x64
CROSS_PLATFORM_GRAPH_CLAIM = PROHIBITED
```

Immediately before any future execution, the execution-authorizing unit must mechanically capture and bind the exact host/runtime tuple, including:

```text
kernel identity
OS distribution/release identity
architecture
libc family and observed version
filesystem case behavior relevant to the working surface
exact Node archive digest
exact extracted Node executable digest
exact pnpm tarball digest(s)
exact extracted pnpm entry-point digest
```

If the actual execution platform is not Linux x64 with glibc, this first-run contract does not apply and a separately qualified platform tuple is required.

The observed libc version is evidence-bound even when package selection depends only on libc family. No graph produced on this tuple may be generalized to musl, arm64, macOS, or Windows without separate evidence.

## 6. Isolated filesystem layout contract

A future execution unit must allocate a unique empty evidence root outside the repository. Symbolic names below are contract placeholders, not currently created paths:

```text
<EVIDENCE_ROOT>/toolchain/node/
<EVIDENCE_ROOT>/toolchain/pnpm/
<EVIDENCE_ROOT>/home/
<EVIDENCE_ROOT>/xdg-config/
<EVIDENCE_ROOT>/xdg-cache/
<EVIDENCE_ROOT>/pnpm-home/
<EVIDENCE_ROOT>/pnpm-store/
<EVIDENCE_ROOT>/tmp/
<EVIDENCE_ROOT>/network/
<EVIDENCE_ROOT>/evidence/
```

Every directory must be empty or mechanically inventoried before execution. No ambient user home, pnpm store, npm cache, Corepack cache, or global package directory may participate.

## 7. Environment allowlist

The future resolver process environment is deny-by-default. The child environment may contain only explicitly bound values required by the execution harness.

Required controlled variables are:

```text
HOME = <EVIDENCE_ROOT>/home
XDG_CONFIG_HOME = <EVIDENCE_ROOT>/xdg-config
XDG_CACHE_HOME = <EVIDENCE_ROOT>/xdg-cache
PNPM_HOME = <EVIDENCE_ROOT>/pnpm-home
TMPDIR = <EVIDENCE_ROOT>/tmp
CI = true
TZ = UTC
LANG = C.UTF-8
LC_ALL = C.UTF-8
PATH = <EXACT_NODE_BIN_DIRECTORY>
NPM_CONFIG_USERCONFIG = <EVIDENCE_ROOT>/xdg-config/empty-user-npmrc
NPM_CONFIG_GLOBALCONFIG = <EVIDENCE_ROOT>/xdg-config/empty-global-npmrc
```

The two controlled npmrc paths must exist as exact empty files and be digest-bound before resolver execution. They are ephemeral execution inputs, not repository `.npmrc` files.

All unlisted environment variables must be removed from the resolver child process unless a later exact-head qualification explicitly adds them. In particular, the following classes must be absent:

```text
HTTP_PROXY / HTTPS_PROXY / ALL_PROXY and lowercase variants
NO_PROXY and lowercase variants
NODE_OPTIONS
NODE_EXTRA_CA_CERTS
SSL_CERT_FILE
SSL_CERT_DIR
npm_config_registry / NPM_CONFIG_REGISTRY
npm_config_proxy / npm_config_https_proxy
credential/token variables
arbitrary PNPM_* variables not listed above
arbitrary npm_config_* variables not listed above
CI-provider secret variables
```

The future evidence object must record the sorted allowlisted environment-name/value representation after secret-safe normalization and its digest.

## 8. TLS, registry, DNS, proxy, and network contract

004C1Z authorizes no network execution. For a future separately authorized resolver run, the network policy is qualified as:

```text
REGISTRY_ORIGIN = https://registry.npmjs.org/
ALLOWED_SCHEME = https
ALLOWED_HOST = registry.npmjs.org
ALLOWED_PORT = 443
PROXY = NONE
TLS_CERTIFICATE_VERIFICATION = REQUIRED
NODE_EXTRA_CA_CERTS = ABSENT
CUSTOM_CA_FILE = ABSENT
CUSTOM_CA_DIRECTORY = ABSENT
CREDENTIALS = NONE
SILENT_REGISTRY_FALLBACK = PROHIBITED
CROSS_ORIGIN_REDIRECT = PROHIBITED
UNDECLARED_NETWORK_HOST = FAIL
```

The exact Node distribution's built-in CA behavior is part of the selected runtime identity. A future execution harness must record DNS results and observed remote endpoints as evidence but must authorize by TLS hostname, not by hard-coded CDN IP addresses.

Any attempted request to a host other than `registry.npmjs.org` fails the qualification unless a later canonical authority explicitly extends the allowlist before execution.

## 9. Cache and store mode

The first resolver evidence run uses canonical 004C1H `MODE_A`:

```text
CACHE_MODE = EMPTY_ISOLATED_STORE_WITH_EXPLICIT_NETWORK
PNPM_STORE = <EVIDENCE_ROOT>/pnpm-store
XDG_CACHE = <EVIDENCE_ROOT>/xdg-cache
PRE_RUN_STORE_STATE = EMPTY
AMBIENT_STORE_REUSE = PROHIBITED
AMBIENT_CACHE_REUSE = PROHIBITED
```

The future execution unit must inventory and digest the pre-run empty state and the post-run store/cache state. A warm-cache replay is a separate evidence run and must not be substituted for the cold first run.

## 10. Resolver command contract

The exact future command shape is qualified, but not executed, as an argv vector invoked from repository root:

```text
ARGV[0] = <EXACT_EXTRACTED_NODE_EXECUTABLE>
ARGV[1] = <EXACT_EXTRACTED_PNPM_PACKAGE>/bin/pnpm.cjs
ARGV[2] = install
ARGV[3] = --lockfile-only
ARGV[4] = --ignore-scripts
ARGV[5] = --frozen-lockfile=false
ARGV[6] = --registry=https://registry.npmjs.org/
ARGV[7] = --store-dir=<EVIDENCE_ROOT>/pnpm-store
```

Working directory:

```text
CWD = repository root at the exact future canonical base
```

Requirements:

- the argv vector is passed without shell interpolation;
- no Corepack command is used;
- no global `pnpm` executable lookup is used;
- no package-manager self-update or self-version-download is allowed;
- repository `package.json` and `pnpm-workspace.yaml` are read-only resolver inputs;
- repository `.npmrc` remains absent;
- lifecycle scripts remain disabled even if package metadata requests them;
- the selected `pnpm-workspace.yaml` remains the workspace and pnpm-project-setting authority;
- the command must not be changed during a qualifying attempt without creating a new exact evidence tuple.

If any listed flag is rejected or behaves differently under exact pnpm 10.34.5, the future run fails qualification and no ad-hoc retry with modified arguments may be promoted as the same attempt. A corrected command requires forward-only canonical requalification.

## 11. Lifecycle-script boundary

Defense in depth for the future resolver run is:

```text
DEPENDENCY_LIFECYCLE_SCRIPTS = DENY
ROOT_LIFECYCLE_SCRIPTS = NONE_IN_CANONICAL_ROOT_MANIFEST
COMMAND_IGNORE_SCRIPTS = true
REPOSITORY_BUILD_ALLOWLIST = EMPTY
UNAUTHORIZED_PROCESS_SPAWN_FOR_PACKAGE_BUILD = FAIL
```

No dependency install/build script is authorized merely because pnpm can technically execute one. A package that later requires lifecycle execution needs a separate security review and exact execution authority.

## 12. Repository writable surface

004C1Z does not authorize a lockfile mutation. It qualifies the future resolver unit's maximum repository write surface as:

```text
FUTURE_ALLOWED_REPOSITORY_WRITE = pnpm-lock.yaml only
FUTURE_ALLOWED_NEW_REPOSITORY_PATH_COUNT = 1
PACKAGE_JSON_WRITE = FORBIDDEN
PNPM_WORKSPACE_WRITE = FORBIDDEN
NPMRC_WRITE = FORBIDDEN
NODE_MODULES_WRITE = FORBIDDEN_FOR_LOCKFILE_ONLY_RUN
PACKAGES_PROVIDERS_WRITE = FORBIDDEN
SOURCE_WRITE = FORBIDDEN
WORKFLOW_WRITE = FORBIDDEN
PROVENANCE_NOTICE_SBOM_WRITE = FORBIDDEN_UNLESS_SEPARATELY_AUTHORIZED
```

All toolchain, cache, store, temporary, network-log, and evidence output must remain outside the repository unless a future exact authority names a repository evidence path explicitly.

An observed repository write outside `pnpm-lock.yaml` is a qualification failure even if pnpm exits successfully.

## 13. Zero-unauthorized-mutation proof method

A future resolver evidence run must capture a mechanical before/after proof.

Before execution:

1. bind canonical base commit and tree;
2. require a clean tracked worktree;
3. enumerate all untracked paths;
4. digest the exact bytes of `package.json` and `pnpm-workspace.yaml`;
5. prove `.npmrc`, `pnpm-lock.yaml`, and `packages/providers` are absent at the start where still expected absent;
6. snapshot the complete repository path inventory relevant to write detection.

After execution:

1. enumerate changed and untracked repository paths;
2. require the only repository delta to be newly created `pnpm-lock.yaml` when that path is separately authorized;
3. re-digest `package.json` and `pnpm-workspace.yaml` and require exact equality with pre-run identities;
4. require `.npmrc` to remain absent;
5. require `packages/providers` to remain absent unless separately authorized by a different canonical unit;
6. classify every external evidence-root write;
7. record `UNAUTHORIZED_MUTATION_COUNT` and require exactly `0`.

No cleanup may erase an unauthorized write before evidence capture.

## 14. Future resolver output evidence

A future successful resolver-evidence unit must bind at least:

```text
canonical base commit/tree
exact platform tuple
exact Node archive SHA256
exact extracted Node executable SHA256
exact pnpm registry metadata identity
exact acquired pnpm tarball SHA256
exact extracted pnpm entry-point SHA256
exact environment digest
exact network-policy digest
exact cache/store pre-state digest
exact command argv digest
exact package.json SHA256
exact pnpm-workspace.yaml SHA256
exact lockfile byte length and SHA256
exact normalized resolved-graph digest
exact package archive identity-set digest
exact cache/store post-state digest
exact repository post-state digest
unauthorized mutation count
```

No field may be silently inferred from a prior run or another platform tuple.

## 15. Deliberately unresolved execution facts

004C1Z closes the **contract** for the first resolver environment but cannot truthfully fill values that require acquired bytes or execution.

```text
NODE_EXTRACTED_EXECUTABLE_SHA256 = NOT_YET_COMPUTED
PNPM_AUTHORITATIVE_DIST_INTEGRITY = REVALIDATE_FROM_NPM_PACKUMENT_BEFORE_ACQUISITION
PNPM_ACQUIRED_TARBALL_SHA256 = NOT_YET_COMPUTED
PNPM_EXTRACTED_ENTRYPOINT_SHA256 = NOT_YET_COMPUTED
EXACT_OBSERVED_KERNEL = NOT_YET_OBSERVED
EXACT_OBSERVED_OS_RELEASE = NOT_YET_OBSERVED
EXACT_OBSERVED_LIBC_VERSION = NOT_YET_OBSERVED
EXACT_DNS_RESULTS = NOT_YET_OBSERVED
EXACT_LOCKFILE = NOT_GENERATED
EXACT_RESOLVED_GRAPH = NOT_GENERATED
EXACT_PACKAGE_ARCHIVE_IDENTITY_SET = NOT_ESTABLISHED
```

These are not documentation gaps to be guessed away. Each becomes evidence only in a later separately authorized acquisition/provisioning/execution unit.

## 16. Fail-closed conditions

Qualification fails if any future execution attempts to proceed with:

- a different Node or pnpm version;
- a mismatched Node official SHA-256;
- a pnpm tarball that does not match freshly re-read authoritative registry integrity;
- unrecorded pnpm or Node executable bytes;
- Corepack or package-manager self-download;
- ambient user/global package-manager configuration;
- an unlisted environment variable that can influence resolution or network behavior;
- a proxy or custom CA not separately qualified;
- a registry host outside the exact allowlist;
- a nonempty or unverified initial cache/store;
- lifecycle scripts enabled;
- shell-interpolated resolver argv;
- repository writes outside the separately authorized path set;
- an unexplained process, network request, or filesystem mutation;
- an unsupported platform tuple;
- a partial lockfile/resolved graph promoted as canonical truth.

## 17. Source and evidence references

Merge-critical planning references consumed by this artifact are:

```text
Canonical Signthos authority:
  github:issue-comment:5590816708

Canonical Signthos contracts:
  specs/004-local-pdf-core/004c1g-package-manager-workspace-selection-qualification.md
  specs/004-local-pdf-core/004c1h-resolver-input-contract-qualification.md
  specs/004-local-pdf-core/004c1o-exact-root-manifest-byte-serialization-qualification.md
  specs/004-local-pdf-core/004c1w-pnpm-project-settings-semantic-aggregation-qualification.md
  specs/004-local-pdf-core/004c1x-pnpm-workspace-exact-byte-serialization-qualification.md

pnpm first-party source:
  https://github.com/pnpm/pnpm/tree/702ad5f860ffd50d64a3a711d9f8a3da16fc796e
  https://github.com/pnpm/pnpm/blob/702ad5f860ffd50d64a3a711d9f8a3da16fc796e/pnpm/package.json

pnpm public package identity:
  https://registry.npmjs.org/pnpm/-/pnpm-10.34.5.tgz

Node.js first-party release:
  https://nodejs.org/en/blog/release/v24.20.0
  https://nodejs.org/dist/v24.20.0/
  https://nodejs.org/dist/v24.20.0/SHASUMS256.txt
  https://nodejs.org/dist/v24.20.0/SHASUMS256.txt.asc
```

Public observations are evidence inputs only. They do not themselves authorize downloads, execution, installation, or dependency adoption.

## 18. Deterministic acceptance criteria

004C1Z may close canonically only if:

1. canonical base is exactly `9d303e32ca6dffbc95d226bb2ce311cee0733f31`;
2. base tree is exactly `41d6184cab36720dc72f76b41ba0ba15d7b541ed`;
3. exactly one Signthos-authored planning file changes, at the authorized path;
4. current pnpm tag `v10.34.5` resolves to exact source commit `702ad5f860ffd50d64a3a711d9f8a3da16fc796e`;
5. current registry-derived exact-version metadata confirms pnpm tarball URL and SHA-1 `6a91127a7f2ca72fe53bb9ff54883e0c75b22f17`;
6. Node 24.20.0 remains the selected LTS baseline and official first-run archive identity is bound to SHA-256 `2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2`;
7. Corepack, global installation, ambient Node/pnpm, and self-managed pnpm downloads are prohibited;
8. the future isolated provisioning sequence is explicit and fails before execution on any identity mismatch;
9. first-run platform is constrained to Linux x64 glibc and cross-platform claims are prohibited;
10. environment input is deny-by-default with controlled home/config/cache/toolchain paths;
11. proxy/custom-CA/credential and undeclared package-manager environment inputs are absent;
12. future network is restricted to HTTPS `registry.npmjs.org:443` with TLS verification and no cross-origin fallback;
13. first-run cache mode is an empty isolated store with explicit network evidence;
14. the future resolver argv shape is exact, non-interactive, shell-free, exact-toolchain-bound, and lifecycle-script-disabled;
15. future repository writable surface is limited to `pnpm-lock.yaml` only when separately authorized;
16. zero-unauthorized-mutation proof is deterministic and cleanup cannot erase evidence first;
17. unknown acquired-byte or runtime-observed hashes remain explicitly unknown rather than fabricated;
18. no package manager, Node, Corepack, resolver, registry package acquisition, dependency installation, provider, fixture, or PDF runtime is executed by this grain;
19. no `package.json`, `pnpm-workspace.yaml`, `.npmrc`, `pnpm-lock.yaml`, package, source, fixture, workflow, container, provenance, NOTICE, or SBOM path is mutated;
20. exact-head Actions/check/provider state is recorded truthfully;
21. fresh independent substantive review covers the exact final candidate head/tree;
22. every material finding is repaired forward-only and every changed head is re-reviewed;
23. unresolved material review threads are zero;
24. immediate premerge race proof re-verifies canonical main, exact candidate, rulesets/protection, checks, reviews, threads, and competing PRs;
25. guarded normal merge uses the exact reviewed `expected_head_sha`;
26. post-merge verification proves merge parents, reviewed-head/merge-tree equality, exact changed surface, signature truth, and actual post-merge workflow/check state;
27. fresh Issue #7 reconciliation derives any acquisition, provisioning, resolver, package-creation, 004C2, 004D, or Specification 005 successor rather than assuming it.

## 19. Explicit non-grants

```text
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_MUTATION = NOT_AUTHORIZED
NPMRC_REINTRODUCTION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_CREATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_PACKAGE_JSON_CREATION = NOT_AUTHORIZED
PACKAGE_MANAGER_PROVISIONING_EXECUTION = NOT_AUTHORIZED
PACKAGE_MANAGER_EXECUTION = NOT_AUTHORIZED
NODE_PROVISIONING_EXECUTION = NOT_AUTHORIZED
NODE_EXECUTION = NOT_AUTHORIZED
COREPACK_EXECUTION = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
REGISTRY_PACKAGE_ACQUISITION = NOT_AUTHORIZED
DEPENDENCY_ACQUISITION_OR_INSTALLATION = NOT_AUTHORIZED
PACKAGE_ARCHIVE_DOWNLOAD_OR_IMPORT = NOT_AUTHORIZED
SOURCE_IMPORT = NOT_AUTHORIZED
FIXTURE_BYTES_COMMIT = NOT_AUTHORIZED
FIXTURE_EXECUTION = NOT_AUTHORIZED
CONTENT_IDENTITY_IMPLEMENTATION = NOT_AUTHORIZED
ADMISSION_IMPLEMENTATION = NOT_AUTHORIZED
PROVIDER_RUNTIME_EXECUTION = NOT_AUTHORIZED
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 20. Qualification result

```text
004C1Z_RESOLVER_EXECUTION_ENVIRONMENT_CONTRACT = QUALIFIED_CANDIDATE
EXACT_PNPM_SOURCE_IDENTITY = QUALIFIED
EXACT_PNPM_REGISTRY_TARBALL_URL_AND_SHA1 = QUALIFIED_FROM_CURRENT_REGISTRY_DERIVED_METADATA
PNPM_SHA512_AND_SHA256_CROSS_CHECKS = CORROBORATIVE_ONLY_PENDING_FUTURE_AUTHORITATIVE_PACKUMENT_REVALIDATION_AND_LOCAL_HASH
EXACT_NODE_ARCHIVE_IDENTITY_AND_OFFICIAL_SHA256 = QUALIFIED
PROVISIONING_MECHANISM = QUALIFIED_PLANNING_CONTRACT_ONLY
FIRST_RUN_PLATFORM = LINUX_X64_GLIBC_ONLY
ENVIRONMENT_POLICY = DENY_BY_DEFAULT_QUALIFIED
CACHE_MODE = EMPTY_ISOLATED_STORE_QUALIFIED
NETWORK_POLICY = REGISTRY_NPMJS_ORIGIN_ONLY_QUALIFIED_FOR_FUTURE_AUTHORIZATION
RESOLVER_COMMAND_SHAPE = QUALIFIED_PLANNING_CONTRACT_ONLY
LIFECYCLE_SCRIPT_POLICY = DENY
FUTURE_REPOSITORY_WRITABLE_SURFACE = PNPM_LOCK_YAML_ONLY_IF_SEPARATELY_AUTHORIZED
ACQUIRED_BYTE_EXECUTABLE_HASHES = NOT_YET_AVAILABLE
RESOLVER_EXECUTION = NOT_AUTHORIZED
LOCKFILE = NOT_GENERATED
RESOLVED_GRAPH = NOT_GENERATED
PACKAGE_ARCHIVE_IDENTITY_SET = NOT_ESTABLISHED
004C1_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No execution-bearing successor exists until this exact candidate itself passes independent substantive exact-head review, guarded normal merge, mechanical post-merge verification, and fresh canonical successor reconciliation.
