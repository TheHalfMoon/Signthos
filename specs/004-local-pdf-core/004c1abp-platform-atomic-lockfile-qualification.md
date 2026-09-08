# Specification 004C1ABP — Resolver Platform and Atomic Lockfile Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_AND_MEASURED_SUBSTRATE_CONTRACT_ONLY / ZERO_RESOLVER_AUTHORITY`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `744d0cbc0de8a32479a67aa1cd23980b4e304258`
Canonical base tree: `30477f46bc602e3ece25bf754a0ff95c01cb0285`
Authority source: `github:issue-comment:5593071815`
Predecessor resolver authority: `github:issue-comment:5591711202`
Prior fail-closed platform evidence: `github:issue-comment:5592975692`

## 1. Purpose and authority

004C1ABP resolves two execution-contract ambiguities discovered while attempting the already-authorized 004C1AB resolver evidence:

1. whether the exact Docker Desktop Apple-Silicon-to-Linux-x64 Rosetta translation path can be declared as an execution substrate for the first Linux-x64-glibc resolver evidence; and
2. whether pnpm's measured root-level atomic lockfile materialization sibling may be admitted without broadening the persistent repository candidate surface beyond `pnpm-lock.yaml`.

This is a planning and measured-substrate qualification grain only.

```text
004C1ABP_AUTHORITY = PLANNING_AND_MEASURED_EXECUTION_SUBSTRATE_CONTRACT_QUALIFICATION_ONLY
004C1ABP_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1abp-platform-atomic-lockfile-qualification.md
004C1ABP_MAX_CHANGED_REPOSITORY_FILES = 1
RESOLVER_EXECUTION = NOT_AUTHORIZED_BY_004C1ABP
NODE_EXECUTION = NOT_AUTHORIZED_BY_004C1ABP
PNPM_EXECUTION = NOT_AUTHORIZED_BY_004C1ABP
COREPACK_EXECUTION = NOT_AUTHORIZED
LOCKFILE_CANDIDATE_MATERIALIZATION = NOT_AUTHORIZED_BY_004C1ABP
PACKAGE_OR_PROVIDER_IMPLEMENTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No earlier failed or exploratory resolver attempt becomes qualifying by adoption of this document. Fresh replay A and replay B remain mandatory after a separate post-merge successor authorization.

## 2. Canonical facts consumed without reopening

The following inputs remain fixed from canonical 004C1Z, 004C1AA and controlling 004C1AB authority:

```text
TARGET_OS = linux
TARGET_ARCH = x64
TARGET_LIBC_FAMILY = glibc
NODE_VERSION = 24.20.0
NODE_ARCHIVE_SHA256 = 2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2
NODE_EXTRACTED_BIN_NODE_SHA256 = 89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7
PNPM_VERSION = 10.34.5
PNPM_TARBALL_SHA256 = ccb5c479cab1b00621325bfe7d4c9a8a8031e7a525d7249e275ecbec81b08db2
PNPM_EXTRACTED_BIN_PNPM_CJS_SHA256 = b276da51dc8ca5b0d3ee3371695b50fc8b3244b281b091c63a3f082a88dadeb9
REGISTRY_ORIGIN = https://registry.npmjs.org/
PROXY = NONE
PROJECT_PACKAGE_ARCHIVE_DOWNLOAD = PROHIBITED
NODE_MODULES_CREATION = PROHIBITED
DEPENDENCY_LIFECYCLE_SCRIPTS = PROHIBITED
PERSISTENT_REPOSITORY_CANDIDATE_PATH = pnpm-lock.yaml
```

The exact resolver argv and deny-by-default child environment remain unchanged. This grain does not relax registry, TLS, credential, cache/store, lifecycle, dependency-installation, package-archive, determinism or exact-toolchain requirements.

## 3. Measured platform evidence

The connected execution device and Docker Desktop route were measured as:

```text
PHYSICAL_HOST_OS = macOS 26.6.2
PHYSICAL_HOST_ARCH = arm64
DOCKER_DESKTOP_SERVER_OS = Linux
DOCKER_DESKTOP_SERVER_ARCH = aarch64
EPHEMERAL_X64_IMAGE = debian@sha256:88200866dfff7ea7f5cbcb6ec7c8a701889efe6fe859fe64d6990e4b07ea4171
EFFECTIVE_RESOLVER_GUEST_KERNEL = Linux 6.12.76-linuxkit
EFFECTIVE_RESOLVER_GUEST_ARCH = x86_64
EFFECTIVE_RESOLVER_GUEST_LIBC = glibc 2.36
TRANSLATION_EXECUTABLE_OBSERVED = /run/rosetta/rosetta
```

The first ptrace observer correctly failed closed when `/run/rosetta/rosetta` appeared as an execution event before the Node application was established. That failure is retained as valid evidence that translation exists and must never be hidden or mislabeled as native x86_64 hardware execution.

A later external-harness experiment used the container boundary instead of ptrace to separate the resolver workload from the host translation implementation. The resolver container shared a separately controlled network namespace with an observer, used a restrictive seccomp profile, dropped ambient capabilities, enabled `no-new-privileges`, used a read-only container filesystem except explicit evidence/source mounts, and executed the exact Node/pnpm application through a launcher whose terminal action was `execve` with the canonical argv/environment. Network policy defaulted to DROP and admitted only Docker DNS plus currently observed `registry.npmjs.org` IPv4 endpoints on TCP/443. Filesystem mutation was independently observed at the source mount.

The exploratory run is not qualification evidence because its atomic sibling write was outside the then-current writable-surface contract. Its useful measurements are characterization only:

```text
RESOLVER_EXIT = 0
PNPM_REPORTED_DOWNLOADED = 0
NODE_MODULES_DIRS = 0
PNPM_STORE_REGULAR_FILES = 0
FINAL_LOCKFILE_BYTES = 9485
FINAL_LOCKFILE_SHA256 = ee29f5f0f4d1b1b98fbd615de64589a7a5b6a92bee368f4ef8a07255a989479e
OBSERVED_RESOLVER_TCP_DESTINATION = registry.npmjs.org endpoint / TCP 443 only
QUALIFICATION = NO
```

## 4. Translation-substrate qualification decision

The exact measured Docker Desktop route is qualified for **004C1AB resolver evidence only** as an explicitly declared translation substrate, subject to all controls below.

```text
004C1AB_EFFECTIVE_PLATFORM = Linux x86_64 / glibc 2.36 guest ABI
004C1AB_PHYSICAL_PLATFORM = macOS arm64 host / Docker Desktop Linux aarch64 VM
004C1AB_TRANSLATION_SUBSTRATE = Apple Rosetta exposed by Docker Desktop
TRANSLATION_SUBSTRATE_CLASS = EXTERNAL_HOST_EXECUTION_SUBSTRATE
NATIVE_X86_64_HARDWARE_CLAIM = PROHIBITED
CROSS_PLATFORM_GRAPH_CLAIM = PROHIBITED
```

Rationale: the first-run package-resolution contract is bound to the Linux-x64 Node distribution and the resolver-visible Linux x86_64/glibc ABI. Rosetta is not a pnpm lifecycle process, dependency script, package-manager self-provisioning action or repository child process; it is Docker Desktop's declared host translation implementation beneath the resolver container boundary. Qualification therefore depends on making that substrate explicit and on enforcing application-process constraints at the container boundary rather than pretending the translation does not exist.

This qualification is intentionally narrow. It does not establish native Linux-x64 hardware equivalence for performance, binary compatibility, runtime support, browser/native provider behavior or any later product claim.

### Required platform evidence for each fresh replay

Each future replay must record:

- physical macOS version and host architecture;
- Docker Desktop server kernel/OS/architecture and Docker version;
- exact x64 image repo digest;
- resolver guest `uname` architecture and kernel;
- resolver guest glibc family/version;
- explicit declaration that Rosetta translation is in use;
- exact seccomp profile bytes and SHA-256;
- exact launcher bytes and SHA-256;
- container capability/no-new-privileges/read-only/pids configuration;
- complete resolver-visible process/descendant accounting at the container boundary.

Any additional application/helper process inside the resolver workload, any lifecycle/build subprocess, or any inability to account for descendants fails closed. Runtime threads are not classified as descendant application processes.

If Docker Desktop changes the translation mechanism, guest ABI, image digest behavior, or enforcement primitives materially, this qualification is stale and must be requalified before use.

## 5. Atomic lockfile materialization evidence

The exploratory resolver run recorded the exact root-source mutation sequence:

```text
/repo/|CREATE|pnpm-lock.yaml.1103256081
/repo/|MOVED_FROM|pnpm-lock.yaml.1103256081
/repo/|MOVED_TO|pnpm-lock.yaml
/repo/|CREATE|pnpm-lock.yaml
/repo/|MODIFY|pnpm-lock.yaml
```

The final worktree contained only untracked `pnpm-lock.yaml`; the transient sibling was absent post-run. No `node_modules` event was observed.

This demonstrates that the previously frozen phrase "write any repository path other than pnpm-lock.yaml" was too syntactically narrow for the selected exact pnpm implementation's atomic replace behavior, even though the persistent candidate surface remained exactly one file.

## 6. Atomic-write qualification decision

A future 004C1AB replay may admit only the following transient sibling pattern as part of atomic materialization of the sole persistent candidate:

```text
PERSISTENT_REPOSITORY_CANDIDATE_PATH = pnpm-lock.yaml
MAX_PERSISTENT_CHANGED_REPOSITORY_FILES = 1
TRANSIENT_ATOMIC_SIBLING_PATTERN = ^pnpm-lock\.yaml\.[0-9]+$
TRANSIENT_ATOMIC_SIBLING_LOCATION = REPOSITORY_ROOT_ONLY
TRANSIENT_ATOMIC_SIBLING_CREATOR = EXACT_AUTHORIZED_PNPM_RESOLVER_WORKLOAD_ONLY
TRANSIENT_ATOMIC_SIBLING_REQUIRED_TERMINAL_ACTION = RENAME_DIRECTLY_TO_pnpm-lock.yaml
TRANSIENT_ATOMIC_SIBLING_POST_RUN_PRESENCE = PROHIBITED
ANY_OTHER_REPOSITORY_WRITE_PATH = FAIL_CLOSED
```

This is a transient execution allowance, not a second repository candidate path. It does not increase `MAX_PERSISTENT_CHANGED_REPOSITORY_FILES` and does not authorize arbitrary temporary files, editor swap files, caches, logs, package artifacts or hidden metadata in the repository.

A qualifying replay must prove mechanically that:

1. no matching sibling exists before execution;
2. every observed sibling basename matches the exact decimal-suffix pattern;
3. each sibling is moved directly to root `pnpm-lock.yaml` during the same resolver execution;
4. no matching sibling remains after execution;
5. no other repository write path is observed;
6. final `git status --short` contains only `?? pnpm-lock.yaml` before candidate materialization;
7. `node_modules` remains absent;
8. external store/cache/temp paths remain outside the repository.

Any residue, alternate suffix pattern, nested location or unrelated write fails qualification.

## 7. Network and package-download invariants

The translation and atomic-write qualifications do not weaken the 004C1Z/004C1AB network contract.

Each fresh replay still requires:

```text
REGISTRY_TLS_HOSTNAME = registry.npmjs.org
ALLOWED_PORT = 443
PROXY = NONE
CUSTOM_CA = NONE
CREDENTIALS = NONE
UNDECLARED_HOST = FAIL
PROJECT_PACKAGE_ARCHIVE_DOWNLOAD = 0
NODE_MODULES_CREATION = 0
LIFECYCLE_SCRIPT_EXECUTION = 0
```

DNS observations and remote endpoints must be recorded. Firewall policy must default deny and admit only DNS required by the controlled namespace plus currently resolved registry endpoints on TCP/443. Packet capture or equivalent accounting must show no unrelated destination during the resolver interval.

`pnpm --lockfile-only` reporting `downloaded 0` is corroborative but not sufficient by itself. The isolated store/cache/temp state and network/write evidence must independently support zero package-archive acquisition.

## 8. Fresh-replay boundary

No earlier execution may be promoted after this contract correction.

```text
PRIOR_PTRACE_ATTEMPT = NONQUALIFYING / IMMUTABLE_HISTORY
PRIOR_ATOMIC_WRITE_EXPERIMENT = NONQUALIFYING / IMMUTABLE_HISTORY
FRESH_REPLAY_A_REQUIRED = YES
FRESH_REPLAY_B_REQUIRED = YES
```

Both replays must begin from fresh clean source copies of the exact then-authorized canonical base and fresh empty external evidence roots. Both must use the exact same qualified platform class, exact toolchain identities, child environment policy, resolver command shape and enforcement model.

A deterministic candidate exists only if both fresh runs succeed and produce byte-identical `pnpm-lock.yaml` bytes plus identical normalized resolved-graph digests.

## 9. Security and evidence interpretation

This correction is fail-closed and evidence-driven:

- Rosetta is disclosed, not hidden;
- effective guest ABI is distinguished from physical host architecture;
- translation is not generalized into product platform support;
- atomic lockfile replacement is distinguished from arbitrary repository writes;
- prior failures remain failures;
- no resolver success is inferred from planning;
- no package/provider/PDF authority is derived;
- no review/CI/merge result is inferred.

An observer that cannot distinguish container-boundary application descendants from host translation implementation must report that limitation rather than silently classify unknown processes as safe.

## 10. Acceptance criteria

004C1ABP is qualified only if its exact final head proves all of the following:

1. canonical base and tree match the live predecessor;
2. exactly this one authorized Signthos-authored planning file changes;
3. the physical host, Docker VM, effective guest and Rosetta substrate are all recorded explicitly;
4. the translation path is qualified only for effective Linux-x64-glibc resolver evidence and not generalized;
5. the exact atomic sibling pattern and terminal rename rule are frozen;
6. persistent repository candidate surface remains only root `pnpm-lock.yaml`;
7. fresh A/B reruns are mandatory and prior attempts remain nonqualifying;
8. all existing exact-toolchain, environment, network, archive, node_modules, lifecycle and determinism gates remain unchanged;
9. exact-head Actions/check/provider state is recorded truthfully;
10. fresh independent substantive exact-head review reports no unresolved material finding;
11. unresolved material review threads are zero;
12. guarded normal merge uses exact expected-head protection;
13. post-merge verification succeeds;
14. a fresh successor reconciliation explicitly decides whether 004C1AB execution may resume.

Until those gates close:

```text
004C1ABP = CANDIDATE_ONLY
004C1AB_RESOLVER_RERUN_AUTHORITY = NOT_DERIVED
PNPM_LOCK_YAML_CANDIDATE = ABSENT
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
