# 004C1AM — PDFium APT Simulation Execution Preflight Qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_READ_ONLY_PREFLIGHT / FAIL_CLOSED_SELECTED_IMAGE_NOT_LOCAL / ZERO_CONTAINER_OR_APT_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `e1b3f949651ee16930e6424129b556ebbe6ffc45`
Canonical base tree: `99cf1ec77f5b4f0113e2cc2d27a2b822e26b93ea`
Authority source: `github:issue-comment:5608847657`

## 1. Purpose and exact authority

Canonical 004C1AL closes the planning/static contract for a future staged APT solver simulation, but it deliberately leaves every execution-critical identity to a fresh successor. 004C1AM performs only the read-only/static preflight allowed by the successor reconciliation. It does not execute Docker containers, APT, dpkg, package installation, toolchains, PDFium, or provider runtime.

```text
004C1AM_AUTHORITY = STATIC_AND_READ_ONLY_EXECUTION_PREFLIGHT_QUALIFICATION_ONLY
004C1AM_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1am-pdfium-apt-simulation-execution-preflight-qualification.md
004C1AM_MAX_CHANGED_REPOSITORY_FILES = 1
CANONICAL_004C1AF_THROUGH_004C1AL_EVIDENCE_READ = AUTHORIZED
CURRENT_HOST_AND_DOCKER_READ_ONLY_METADATA_INSPECTION = AUTHORIZED
ALREADY_PRESENT_SELECTED_IMAGE_READ_ONLY_METADATA_INSPECTION = AUTHORIZED
ALREADY_PRESENT_SELECTED_IMAGE_STATIC_BYTE_INSPECTION_WITHOUT_PULL_LOAD_OR_CONTAINER_EXECUTION = AUTHORIZED
SIGNTHOS_AUTHORED_APT_SIMULATION_ARGV_AND_CONFIGURATION_DESIGN = AUTHORIZED_STATIC_ONLY
SIGNTHOS_AUTHORED_SNAPSHOT_LIST_MATERIALIZATION_DESIGN = AUTHORIZED_STATIC_ONLY
SIGNTHOS_AUTHORED_ISOLATION_AND_ACCOUNTING_CONTRACT_DESIGN = AUTHORIZED_STATIC_ONLY
DOCKER_IMAGE_PULL = NOT_AUTHORIZED
DOCKER_IMAGE_LOAD = NOT_AUTHORIZED
DOCKER_CONTAINER_CREATE_OR_EXECUTION = NOT_AUTHORIZED
APT_GET_OR_APT_CACHE_EXECUTION = NOT_AUTHORIZED
DPKG_EXECUTION = NOT_AUTHORIZED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED
ADDITIONAL_PACKAGE_ARCHIVE_ACQUISITION = NOT_AUTHORIZED
DEB_EXTRACTION = NOT_AUTHORIZED
PACKAGE_INSTALLATION = NOT_AUTHORIZED
IMAGE_PROVISIONING = NOT_AUTHORIZED
NODE_OR_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
DEPOT_TOOLS_GCLIENT_GN_NINJA_CLANG_OR_PDFIUM_EXECUTION = NOT_AUTHORIZED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
REPOSITORY_UPSTREAM_BINARY_OR_SOURCE_IMPORT = NOT_AUTHORIZED
PACKAGE_MANIFEST_LOCKFILE_MUTATION = NOT_AUTHORIZED
NOTICE_SBOM_PROVENANCE_REPOSITORY_MUTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No image layer, package archive, package index, source tree, toolchain byte, generated runtime artifact, cache, lockfile, or external evidence byte is committed by this grain.

## 2. Canonical predecessor bindings

The preflight consumes the current canonical package/build evidence without reopening any prior selection:

```text
CANONICAL_MAIN_AT_PREFLIGHT_START = e1b3f949651ee16930e6424129b556ebbe6ffc45
CANONICAL_MAIN_TREE_AT_PREFLIGHT_START = 99cf1ec77f5b4f0113e2cc2d27a2b822e26b93ea
CANONICAL_004C1AL_MERGE = e1b3f949651ee16930e6424129b556ebbe6ffc45
CANONICAL_004C1AL_REVIEWED_HEAD = 2636bb45241a3e5fdbe747c682485cafa3ab129c
SELECTED_BASE_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_BASE_IMAGE_MANIFEST_SHA256 = c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_BASE_IMAGE_CONFIG_SHA256 = 6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
TARGET_PLATFORM = linux/amd64
UBUNTU_SNAPSHOT_ID = 20260909T180000Z
004C1AG_RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
004C1AI_DPKG_STATUS_SHA256 = 49176dcea062ad5a71df28c178ce241a6bcf9a2ec7e1525a1445a143bfd1080b
004C1AI_INSTALLED_PACKAGES_SHA256 = bdc5c6bbbe47db0313b2281b67e2f152ad75e93ab169bbfccf0b5441444694ba
004C1AJ_ARCHIVE_ACQUISITION_CANDIDATE_COUNT = 826
004C1AK_EXACT_ARCHIVE_COUNT = 826
004C1AK_EXACT_ARCHIVE_TOTAL_BYTES = 317223784
004C1AK_VERIFIED_ARCHIVE_INVENTORY_SHA256 = 38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98
004C1AK_ARCHIVE_IDENTITY_SET_SHA256 = 8ac7e3c9a44831e5f8c4a03a81862644990b504f7d2043102a1ab1a0fd69810d
APT_STAGE_ORDER = [STAGE_A, STAGE_B, STAGE_C]
```

These are inherited canonical identities. 004C1AM does not claim that the selected image or any external predecessor evidence remains locally available merely because its identity is canonical.

### 2.1 Fresh competing-successor PR query

A fresh GitHub query was executed after the independent review finding and before this forward-only repair:

```text
QUERY_TIME_UTC = 2026-09-09T21:23:54Z
QUERY = gh pr list --repo TheHalfMoon/Signthos --state open --json number,title,headRefOid,baseRefOid --limit 100
OPEN_PR_COUNT = 1
OPEN_PR_1_NUMBER = 157
OPEN_PR_1_TITLE = docs(004): qualify APT simulation execution preflight
OPEN_PR_1_HEAD = 3bd2955c98f0afccb57016fd5182100b2c8ccefd
OPEN_PR_1_BASE = e1b3f949651ee16930e6424129b556ebbe6ffc45
CURRENT_004C1AM_PR = 157
COMPETING_SUCCESSOR_PR_COUNT = 0
COMPETING_SUCCESSOR_DISPOSITION = PASS_AT_OBSERVATION_TIME / IMMEDIATE_PREMERGE_RECHECK_REQUIRED
```

This evidence is time-bounded. It does not authorize ignoring a later competing PR or branch movement. The immediate premerge race proof must query open PRs again and fail closed pending fresh reconciliation if another successor PR appears or if PR #157 no longer targets the exact canonical base/head expected by the reviewed candidate.

## 3. Fresh physical-host and Docker metadata measurement

The authorized read-only preflight measured the current host and Docker server without creating or executing a container:

```text
PHYSICAL_HOST_OS = macOS 26.6.2
PHYSICAL_HOST_BUILD = 25G83
PHYSICAL_HOST_UNAME = Darwin
PHYSICAL_HOST_ARCH = arm64
PHYSICAL_HOST_KERNEL = 25.6.0
DOCKER_CLIENT_VERSION = 29.5.1
DOCKER_CLIENT_OS = darwin
DOCKER_CLIENT_ARCH = arm64
DOCKER_SERVER_VERSION = 29.7.2
DOCKER_SERVER_OS = linux
DOCKER_SERVER_ARCH = arm64
DOCKER_SERVER_KERNEL = 7.0.12-linuxkit
DOCKER_SERVER_OPERATING_SYSTEM = Docker Desktop
DOCKER_SERVER_NAME = docker-desktop
DOCKER_SERVER_STORAGE_DRIVER = overlayfs
DOCKER_SERVER_SECURITY_OPTIONS = [seccomp builtin, cgroupns]
```

The Docker server version and kernel match the values recorded by canonical 004C1AH. That observation does not substitute for the mandatory fresh bounded guest probe required immediately before a later solver execution.

### 3.1 Time-bounded physical-host libc observation

The independent review required an explicit current physical-host libc identity and measurement method. Two read-only observations were performed at `2026-09-09T21:26:48Z` and `2026-09-09T21:27:11Z`.

The direct install-name path is not materialized as a standalone file on this host:

```text
LIBSYSTEM_DIRECT_PATH = /usr/lib/libSystem.B.dylib
LIBSYSTEM_DIRECT_PATH_EXISTS = false
DIRECT_LIBSYSTEM_FILE_SHA256 = NOT_ESTABLISHED
DIRECT_LIBSYSTEM_FILE_BYTE_IDENTITY_CLAIMED = false
```

The libc/LibSystem ABI identity was observed read-only from Mach-O load commands with `/usr/bin/otool -L` on three independent sealed-system executables:

```text
PHYSICAL_HOST_LIBC_MEASUREMENT_METHOD = /usr/bin/otool -L <system-executable>
PHYSICAL_HOST_LIBC_PROBE_1 = /usr/bin/true
PHYSICAL_HOST_LIBC_PROBE_2 = /usr/bin/env
PHYSICAL_HOST_LIBC_PROBE_3 = /bin/sh
PHYSICAL_HOST_LIBC_INSTALL_NAME = /usr/lib/libSystem.B.dylib
PHYSICAL_HOST_LIBC_COMPATIBILITY_VERSION = 1.0.0
PHYSICAL_HOST_LIBC_CURRENT_VERSION = 1356.0.0
PHYSICAL_HOST_LIBC_PROBE_AGREEMENT = PASS
PHYSICAL_HOST_LIBC_IDENTITY = APPLE_LIBSYSTEM_B_DYLIB_CURRENT_VERSION_1356_0_0
PHYSICAL_HOST_GLIBC_IDENTITY = NOT_APPLICABLE / HOST_IS_MACOS
```

This establishes the current host-side libc/LibSystem identity needed for preflight characterization without claiming a standalone dylib byte hash. It does not substitute for the separately required future linux/amd64 guest libc recheck, which remains blocked until an authorized successor restores the exact selected image and separately authorizes a bounded guest probe.

## 4. Fresh Rodete predicate state

Canonical 004C1AH binds the exact Chromium predicate:

```python
name.startswith('6.12.') and name.endswith('rodete1-amd64')
```

The current Docker server kernel is:

```text
CURRENT_DOCKER_SERVER_KERNEL = 7.0.12-linuxkit
SERVER_KERNEL_STARTS_WITH_6_12 = false
SERVER_KERNEL_ENDS_WITH_RODETE1_AMD64 = false
SERVER_KERNEL_RODETE_PREDICATE = false
```

However, 004C1AL requires a fresh execution-substrate/guest recheck before solver execution. 004C1AM has no container-create or container-execution authority, so it does not claim a fresh guest `uname -r`, guest `uname -m`, guest libc identity, or effective guest Rodete predicate.

```text
FRESH_GUEST_KERNEL_RECHECK = NOT_PERFORMED / NOT_AUTHORIZED
FRESH_GUEST_MACHINE_RECHECK = NOT_PERFORMED / NOT_AUTHORIZED
FRESH_GUEST_LIBC_RECHECK = NOT_PERFORMED / NOT_AUTHORIZED
FRESH_EFFECTIVE_GUEST_RODETE_PREDICATE = NOT_ESTABLISHED
```

The server-kernel predicate is recorded only as a preflight observation. It is not execution authority.

## 5. Selected-image locality gate

The preflight attempted only read-only local metadata inspection for the exact canonical linux/amd64 image reference:

```text
INSPECTED_REFERENCE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
INSPECTION_PLATFORM = linux/amd64
DOCKER_PULL = 0
DOCKER_LOAD = 0
CONTAINER_CREATE = 0
CONTAINER_EXECUTION = 0
```

Docker returned no local image for the exact repository digest:

```text
SELECTED_IMAGE_LOCAL_PRESENT_BY_REPOSITORY_DIGEST = false
LOCAL_INSPECT_RESULT = No such image
```

A second read-only check searched the local image inventory and the canonical config digest directly:

```text
LOCAL_EMSCRIPTEN_EMSDK_IMAGE_COUNT = 0
SELECTED_CONFIG_ID = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
SELECTED_CONFIG_ID_LOCAL_PRESENT = false
SELECTED_IMAGE_LOCALITY = NOT_ESTABLISHED_AS_PRESENT
```

No network image acquisition was attempted because 004C1AM explicitly prohibits pull and load.

## 6. Static selected-image byte inspection result

Static selected-image byte inspection is conditional on the exact selected image already being present locally. That condition failed.

Therefore the following required execution identities remain unavailable:

```text
FRESH_SELECTED_IMAGE_MANIFEST_RECHECK = BLOCKED_BY_LOCAL_IMAGE_ABSENCE
FRESH_SELECTED_IMAGE_CONFIG_RECHECK = BLOCKED_BY_LOCAL_IMAGE_ABSENCE
SELECTED_IMAGE_STATIC_ROOTFS_RECHECK = BLOCKED_BY_LOCAL_IMAGE_ABSENCE
EXACT_APT_EXECUTABLE_PATH = NOT_REESTABLISHED
EXACT_APT_EXECUTABLE_BYTES_SHA256 = NOT_ESTABLISHED
EXACT_APT_EXECUTABLE_BYTES = NOT_ESTABLISHED
EXACT_APT_PACKAGE_VERSION = NOT_REESTABLISHED
EXACT_APT_EXECUTABLE_MODE = NOT_REESTABLISHED
```

004C1AM does not reuse a historical apt executable identity that was never canonically bound for the current future execution. It also does not infer apt bytes from package metadata alone.

## 7. Initial solver-state and package-universe readiness

The canonical non-executing inputs that remain valid as repository identities are:

```text
INITIAL_DPKG_STATUS_IDENTITY = 49176dcea062ad5a71df28c178ce241a6bcf9a2ec7e1525a1445a143bfd1080b
INITIAL_INSTALLED_PACKAGE_MODEL_IDENTITY = bdc5c6bbbe47db0313b2281b67e2f152ad75e93ab169bbfccf0b5441444694ba
SNAPSHOT_ID = 20260909T180000Z
SNAPSHOT_METADATA_CLOSURE_IDENTITY = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
VERIFIED_ARCHIVE_IDENTITY_SET_SHA256 = 8ac7e3c9a44831e5f8c4a03a81862644990b504f7d2043102a1ab1a0fd69810d
VERIFIED_ARCHIVE_COUNT = 826
APT_STAGE_ORDER = [STAGE_A, STAGE_B, STAGE_C]
FLATTENED_SINGLE_TRANSACTION_MODEL = PROHIBITED
```

These identities do not establish that APT is available to execute or that a transaction can be simulated on the current machine.

## 8. Future APT argv/configuration freeze gate

004C1AL requires exact `apt-get` executable path/version/byte identity before an exact execution argv can become merge-critical evidence. Because that executable identity is blocked, 004C1AM deliberately does not pretend to freeze a version-specific command line.

The invariant execution constraints remain fixed:

```text
SIMULATION_OR_PRINT_ONLY = REQUIRED
NETWORK_NONE = REQUIRED
HOST_REPOSITORY_MOUNT = PROHIBITED
DEFAULT_LIVE_SOURCE_LISTS = PROHIBITED
SNAPSHOT_ONLY_PACKAGE_UNIVERSE = REQUIRED
PACKAGE_DOWNLOAD = PROHIBITED
PACKAGE_INSTALL = PROHIBITED
PACKAGE_UNPACK = PROHIBITED
PACKAGE_CONFIGURE = PROHIBITED
MAINTAINER_SCRIPT_EXECUTION = PROHIBITED
STAGE_A_RECOMMENDS_POLICY = NO_INSTALL_RECOMMENDS
STAGE_B_RECOMMENDS_POLICY = DEFAULT_APT_RECOMMENDS
STAGE_C_RECOMMENDS_POLICY = NO_INSTALL_RECOMMENDS
STAGE_ORDER = [STAGE_A, STAGE_B, STAGE_C]
UNKNOWN_OR_UNPARSED_PACKAGE_ACTION = FAIL_CLOSED
```

```text
EXACT_APT_ARGV_IDENTITY = NOT_ESTABLISHED
EXACT_APT_CONFIGURATION_IDENTITY = NOT_ESTABLISHED
```

The next execution-readiness attempt must first bind the exact apt executable identity, then freeze argv/configuration against that exact executable before any solver run.

## 9. Snapshot-list materialization gate

004C1AL requires the future simulation to use only canonical 004C1AG signed snapshot metadata and to disable image-default live sources. The exact current materialization procedure must be bound together with the apt executable/configuration identity.

Because selected-image static inspection is blocked and no execution successor exists, 004C1AM records:

```text
CANONICAL_SNAPSHOT_METADATA_IDENTITY = ESTABLISHED
LIVE_ARCHIVE_ACCESS_DURING_SIMULATION = PROHIBITED
HOST_APT_LISTS = PROHIBITED
IMAGE_DEFAULT_LIVE_APT_SOURCES = PROHIBITED
EXACT_SNAPSHOT_LIST_MATERIALIZATION_METHOD = NOT_YET_FROZEN
```

No package index was downloaded or regenerated by this grain.

## 10. Isolation and accounting invariants

A later execution grain remains required to use fresh external ephemeral evidence roots and the following hard boundaries:

```text
FUTURE_CONTAINER_NETWORK = NONE
FUTURE_HOST_REPOSITORY_MOUNT = NONE
FUTURE_REPOSITORY_WRITE = 0
FUTURE_PACKAGE_DOWNLOAD = 0
FUTURE_PACKAGE_INSTALL = 0
FUTURE_PACKAGE_UNPACK = 0
FUTURE_PACKAGE_CONFIGURE = 0
FUTURE_MAINTAINER_SCRIPT_EXECUTION = 0
FUTURE_APT_DEFAULT_LIVE_SOURCE_USE = 0
FUTURE_PROCESS_ARGV_ACCOUNTING = REQUIRED
FUTURE_PROCESS_ENVIRONMENT_ACCOUNTING = REQUIRED
FUTURE_PROCESS_EXIT_STATUS_ACCOUNTING = REQUIRED
FUTURE_STDOUT_STDERR_BYTE_IDENTITY = REQUIRED
FUTURE_CREATED_MODIFIED_FILE_ACCOUNTING = REQUIRED
FUTURE_WRITABLE_ROOT_INVENTORY = REQUIRED
FUTURE_TWO_REPLAY_DETERMINISM = REQUIRED
```

Exact writable directory names remain execution-attempt-specific external paths and must be bound before the later run.

## 11. Required execution-readiness matrix

```text
CURRENT_MAIN_AND_PREDECESSOR_CANONICALITY = PASS
CURRENT_HOST_AND_DOCKER_METADATA_RECHECK = PASS
CURRENT_DOCKER_SERVER_KERNEL_RECHECK = PASS
FRESH_GUEST_KERNEL_MACHINE_LIBC_RECHECK = BLOCKED
SELECTED_IMAGE_LOCAL_PRESENCE = FAIL
SELECTED_IMAGE_MANIFEST_CONFIG_RECHECK = BLOCKED
EXACT_APT_EXECUTABLE_PATH_VERSION_BYTE_IDENTITY = BLOCKED
EXACT_APT_CONFIGURATION_AND_ARGV = BLOCKED
EXACT_SNAPSHOT_LIST_MATERIALIZATION_METHOD = BLOCKED
EXACT_INITIAL_DPKG_STATUS_IDENTITY = PASS
EXACT_STAGE_ROOT_IDENTITIES = PASS_BY_CANONICAL_004C1AL_BINDING
EXACT_SELECTED_ARCHIVE_IDENTITIES = PASS_BY_CANONICAL_004C1AK_BINDING
ISOLATED_WRITABLE_ROOT_CONTRACT = PASS_AS_INVARIANT / EXACT_PATHS_PENDING
NETWORK_NONE_ENFORCEMENT = REQUIRED / NOT_EXECUTED
NO_HOST_OR_REPOSITORY_MOUNT = REQUIRED / NOT_EXECUTED
PROCESS_AND_FILESYSTEM_ACCOUNTING_CONTRACT = PASS_AS_INVARIANT
TWO_REPLAY_DETERMINISM_CONTRACT = PASS_AS_INVARIANT
APT_SIMULATION_EXECUTION_READINESS = FAIL_CLOSED
```

The first blocking prerequisite is the absence of the exact selected image from the local Docker content store.

## 12. Qualification result

```text
004C1AM_RESULT = QUALIFIED_FAIL_CLOSED_EXECUTION_PREFLIGHT
EXECUTION_PREFLIGHT_COMPLETE = false
EXECUTION_READINESS = FAIL_CLOSED
PRIMARY_BLOCKER = EXACT_SELECTED_EMSDK_LINUX_AMD64_IMAGE_NOT_LOCAL
SECONDARY_BLOCKERS = [FRESH_GUEST_RECHECK, EXACT_APT_IDENTITY, EXACT_APT_ARGV_CONFIG, EXACT_SNAPSHOT_LIST_MATERIALIZATION_METHOD]
DOCKER_PULL_PERFORMED = false
DOCKER_LOAD_PERFORMED = false
CONTAINER_CREATE_PERFORMED = false
CONTAINER_EXECUTION_PERFORMED = false
APT_EXECUTION_PERFORMED = false
DPKG_EXECUTION_PERFORMED = false
PACKAGE_DOWNLOAD_PERFORMED = false
PACKAGE_INSTALLATION_PERFORMED = false
```

This is a successful fail-closed qualification: the preflight truth is established, and execution is correctly rejected.

## 13. Successor boundary

004C1AM does not authorize fixing its blocker. A separately reconciled successor must decide whether exact selected-image re-acquisition is authorized. If so, it must bind the immutable repository digest and linux/amd64 platform, forbid substitutions, account bytes and Docker state, and remain separate from APT/package execution.

Only after the exact selected image is locally restored and independently qualified may a later preflight/execution successor bind the apt executable bytes, perform the required fresh bounded guest substrate recheck, freeze exact APT argv/configuration and snapshot-list materialization, and decide whether solver execution can be authorized.

```text
IMAGE_REACQUISITION_AUTHORITY = ABSENT_FROM_004C1AM
APT_SIMULATION_EXECUTION_AUTHORITY = ABSENT_FROM_004C1AM
PACKAGE_INSTALLATION_AUTHORITY = ABSENT_FROM_004C1AM
PDFIUM_BUILD_EXECUTION_AUTHORITY = ABSENT_FROM_004C1AM
```

## 14. Candidate acceptance gates

This candidate is eligible for canonical merge only if all pre-merge gates below pass on the exact final head:

1. canonical base remains `e1b3f949651ee16930e6424129b556ebbe6ffc45` with tree `99cf1ec77f5b4f0113e2cc2d27a2b822e26b93ea`, the time-bounded open-PR evidence in Section 2.1 records exactly PR #157 open with zero competing successor PRs, and the immediate premerge query reconfirms that state or fails closed pending reconciliation;
2. Issue #7 authority remains exactly `github:issue-comment:5608847657` for 004C1AM;
3. exactly one repository file changes at the authorized 004C1AM path;
4. host/Docker facts, including the time-bounded physical-host libc/LibSystem observation and measurement method, are recorded exactly from read-only measurements;
5. exact selected-image absence is recorded truthfully without substituting another image/tag/platform;
6. no pull, load, container create/run, APT/dpkg execution, package/archive acquisition, install, toolchain, PDFium or provider execution occurred;
7. blocked apt/guest/argv/materialization identities remain blocked rather than inferred;
8. canonical 004C1AK/004C1AL package/stage identities remain distinct from execution readiness;
9. provider/check accounting treats skips, neutral output, billing limits, or automatic summaries as non-approval;
10. fresh independent substantive exact-head review confirms the fail-closed result and successor boundary;
11. every material finding is repaired forward-only and triggers fresh exact-head review;
12. unresolved material review threads are zero;
13. immediate premerge base/head/race proof passes;
14. guarded normal merge uses the exact final `expected_head_sha` and fails closed if the head moved.

After merge, mechanical SHA/tree/parents/signature/surface verification and fresh Issue #7 successor reconciliation remain mandatory before any blocker-fixing authority is inferred.
