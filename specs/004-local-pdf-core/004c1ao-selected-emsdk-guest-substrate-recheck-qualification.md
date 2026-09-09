# 004C1AO — Selected Emscripten Guest Substrate Recheck Qualification

Status: `QUALIFICATION_CANDIDATE / TWO_REPLAY_BOUNDED_GUEST_PROBE_PASS / ZERO_APT_OR_TOOLCHAIN_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `715f0372e283642a2370bee7f4496f2c9af65e06`
Canonical base tree: `a3d1c37a0fd134d501f3416094e302482415de6a`
Authority source: `github:issue-comment:5609237034`

## 1. Purpose and authority

Canonical 004C1AN restored local availability of the exact selected Emscripten `linux/amd64` image. Canonical 004C1AL requires a fresh execution-substrate guest kernel, machine, libc, and Rodete-predicate recheck immediately before any later APT solver execution. 004C1AO closes only that prerequisite through two bounded non-APT container probes.

```text
004C1AO_AUTHORITY = BOUNDED_SELECTED_IMAGE_GUEST_KERNEL_MACHINE_LIBC_RECHECK_ONLY
004C1AO_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ao-selected-emsdk-guest-substrate-recheck-qualification.md
004C1AO_MAX_CHANGED_REPOSITORY_FILES = 1
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
TARGET_PLATFORM = linux/amd64
BOUNDED_CONTAINER_PROBE = AUTHORIZED_AT_MOST_TWO_REPLAYS
BOUNDED_CONTAINER_PROBE_PULL_POLICY = never
BOUNDED_CONTAINER_PROBE_NETWORK = none
BOUNDED_CONTAINER_PROBE_FILESYSTEM = read-only
BOUNDED_CONTAINER_PROBE_CAPABILITIES = drop-all
BOUNDED_CONTAINER_PROBE_NO_NEW_PRIVILEGES = required
BOUNDED_CONTAINER_PROBE_PIDS_LIMIT = 64
BOUNDED_CONTAINER_PROBE_HOST_MOUNTS = 0
BOUNDED_CONTAINER_PROBE_REPOSITORY_MOUNTS = 0
BOUNDED_CONTAINER_PROBE_ENTRYPOINT = /bin/sh
DOCKER_IMAGE_PULL = NOT_AUTHORIZED
DOCKER_IMAGE_LOAD_OR_BUILD = NOT_AUTHORIZED
APT_GET_OR_APT_CACHE_EXECUTION = NOT_AUTHORIZED
DPKG_EXECUTION = NOT_AUTHORIZED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED
PACKAGE_ARCHIVE_ACQUISITION = NOT_AUTHORIZED
PACKAGE_INSTALLATION = NOT_AUTHORIZED
ROOTFS_EXTRACTION = NOT_AUTHORIZED
NODE_OR_EMSDK_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
DEPOT_TOOLS_GCLIENT_GN_NINJA_CLANG_OR_PDFIUM_EXECUTION = NOT_AUTHORIZED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
REPOSITORY_UPSTREAM_BINARY_OR_SOURCE_IMPORT = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No container filesystem, image layer, package, source, toolchain, or runtime bytes enter the repository.

## 2. Immediate pre-probe authority race and selected-image presence

At `2026-09-09T21:51:48Z`, immediately before Probe A:

```text
CANONICAL_MAIN = 715f0372e283642a2370bee7f4496f2c9af65e06
OPEN_PULL_REQUESTS = []
DOCKER_CLIENT_VERSION = 29.5.1
DOCKER_SERVER_VERSION = 29.7.2
DOCKER_SERVER_KERNEL = 7.0.12-linuxkit
DOCKER_SERVER_ARCH = arm64
SELECTED_IMAGE_LOCAL_INSPECT_RC = 0
SELECTED_IMAGE_DESCRIPTOR_DIGEST = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_IMAGE_OS = linux
SELECTED_IMAGE_ARCH = amd64
```

The canonical base, zero-competing-PR state, and exact selected-image locality were therefore current at probe start.

## 3. Exact bounded probe argv

Probe A and Probe B used the same invocation:

```text
PROBE_ARGV = [
  "docker",
  "run",
  "--pull=never",
  "--platform",
  "linux/amd64",
  "--network",
  "none",
  "--read-only",
  "--cap-drop",
  "ALL",
  "--security-opt",
  "no-new-privileges",
  "--pids-limit",
  "64",
  "--rm",
  "--entrypoint",
  "/bin/sh",
  "docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3",
  "-lc",
  "uname -r; uname -m; ldd --version; if [ -x /run/rosetta/rosetta ]; then echo ROSETTA_VISIBLE=YES; else echo ROSETTA_VISIBLE=NO; fi"
]
```

Control accounting:

```text
IMAGE_PULL_POLICY = never
NETWORK = none
FILESYSTEM = read-only
CAPABILITIES = drop-all
NO_NEW_PRIVILEGES = true
PIDS_LIMIT = 64
HOST_MOUNTS = 0
REPOSITORY_MOUNTS = 0
ENTRYPOINT = /bin/sh
```

The `ldd --version` process naturally emitted multiple informational lines. The authority requires the `ldd --version` first-line observation; only the first line is consumed as qualification evidence. The remaining stdout is retained only for byte-accounting and is not used to broaden the evidence claim. No additional guest executable was invoked to trim the output.

## 4. Probe A

```text
PROBE_A_START_UTC = 2026-09-09T21:51:48Z
PROBE_A_END_UTC = 2026-09-09T21:51:49Z
PROBE_A_EXIT_STATUS = 0
PROBE_A_STDOUT_BYTES = 329
PROBE_A_STDOUT_SHA256 = 776667f3ab7841221d22676b1fc4f1bd780064aa1291a182d3f985071b23f575
PROBE_A_STDERR_BYTES = 0
PROBE_A_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
PROBE_A_CONTAINER_SET_UNCHANGED = TRUE
```

Qualification observations parsed from Probe A:

```text
GUEST_KERNEL = 7.0.12-linuxkit
GUEST_MACHINE = x86_64
GUEST_LIBC_FIRST_LINE = ldd (Ubuntu GLIBC 2.35-0ubuntu3.8) 2.35
ROSETTA_VISIBLE = NO
```

Probe A succeeded, so authority permitted exactly one independent Probe B.

## 5. Probe B

```text
PROBE_B_START_UTC = 2026-09-09T21:51:49Z
PROBE_B_END_UTC = 2026-09-09T21:51:49Z
PROBE_B_EXIT_STATUS = 0
PROBE_B_STDOUT_BYTES = 329
PROBE_B_STDOUT_SHA256 = 776667f3ab7841221d22676b1fc4f1bd780064aa1291a182d3f985071b23f575
PROBE_B_STDERR_BYTES = 0
PROBE_B_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
PROBE_B_CONTAINER_SET_UNCHANGED = TRUE
```

Qualification observations parsed from Probe B are identical:

```text
GUEST_KERNEL = 7.0.12-linuxkit
GUEST_MACHINE = x86_64
GUEST_LIBC_FIRST_LINE = ldd (Ubuntu GLIBC 2.35-0ubuntu3.8) 2.35
ROSETTA_VISIBLE = NO
```

```text
PROBE_OBSERVATIONS_EQUAL = TRUE
PROBE_RAW_STDOUT_IDENTITY_EQUAL = TRUE
PROBE_RAW_STDERR_IDENTITY_EQUAL = TRUE
```

No third probe was executed.

## 6. Chromium Rodete predicate

Canonical 004C1AH and 004C1AL bind the Chromium execution-substrate predicate as:

```python
name.startswith('6.12.') and name.endswith('rodete1-amd64')
```

The input to this evaluation is the fresh selected-image guest `uname -r`, not the Docker server kernel:

```text
name = 7.0.12-linuxkit
name.startswith('6.12.') = FALSE
name.endswith('rodete1-amd64') = FALSE
RODETE_PREDICATE = FALSE
```

Therefore the Rodete-specific pinned `linux-libc-dev=5.8.14-1` branch remains inactive for this exact measured selected-image execution substrate.

This conclusion is scoped only to the exact current Docker substrate and selected immutable image. It must not be generalized to another Docker server/kernel/image/platform.

## 7. Architecture and translation disclosure

```text
PHYSICAL_HOST_ARCH = arm64
DOCKER_SERVER_ARCH = arm64
SELECTED_IMAGE_PLATFORM = linux/amd64
EFFECTIVE_GUEST_MACHINE = x86_64
ROSETTA_VISIBLE_INSIDE_GUEST = NO
NATIVE_X86_64_HARDWARE_CLAIM = PROHIBITED
TRANSLATION_IMPLEMENTATION = NOT_ESTABLISHED_BY_004C1AO
```

The effective guest ABI is x86_64. Absence of `/run/rosetta/rosetta` does not prove which translation/emulation implementation is used by Docker Desktop.

## 8. Container and execution accounting

```text
CONTAINER_COUNT_BEFORE = 14
CONTAINER_COUNT_AFTER = 14
FINAL_CONTAINER_SET_UNCHANGED = TRUE
BOUNDED_PROBE_COUNT = 2
DOCKER_IMAGE_PULL = 0
DOCKER_IMAGE_LOAD = 0
DOCKER_IMAGE_BUILD = 0
PERSISTENT_CONTAINER_COUNT_CREATED = 0
APT_GET_OR_APT_CACHE_EXECUTION = 0
DPKG_EXECUTION = 0
APT_SIMULATION_EXECUTION = 0
PACKAGE_ARCHIVE_ACQUISITION = 0
PACKAGE_INSTALLATION = 0
ROOTFS_EXTRACTION = 0
NODE_OR_EMSDK_TOOLCHAIN_EXECUTION = 0
DEPOT_TOOLS_GCLIENT_GN_NINJA_CLANG_OR_PDFIUM_EXECUTION = 0
PROVIDER_OR_PDF_RUNTIME_EXECUTION = 0
REPOSITORY_UPSTREAM_BINARY_OR_SOURCE_IMPORT = 0
```

Two ephemeral Docker containers existed only for the authorized bounded probes and were automatically removed by `--rm`. The pre/post container set is identical.

## 9. Qualification result

```text
004C1AO_RESULT = PASS_BOUNDED_GUEST_SUBSTRATE_RECHECK
FRESH_SELECTED_IMAGE_GUEST_KERNEL = 7.0.12-linuxkit
FRESH_SELECTED_IMAGE_GUEST_MACHINE = x86_64
FRESH_SELECTED_IMAGE_GUEST_LIBC = Ubuntu GLIBC 2.35-0ubuntu3.8 / 2.35
FRESH_SELECTED_IMAGE_ROSETTA_VISIBILITY = NO
FRESH_SELECTED_IMAGE_RODETE_PREDICATE = FALSE
TWO_REPLAY_DETERMINISM = PASS
```

This closes only the guest-substrate freshness prerequisite in canonical 004C1AL.

## 10. Explicit non-claims and successor boundary

004C1AO does not establish or authorize:

```text
EXACT_APT_EXECUTABLE_PATH_VERSION_BYTE_IDENTITY = NOT_ESTABLISHED
EXACT_APT_ARGV_CONFIGURATION = NOT_ESTABLISHED
EXACT_SNAPSHOT_LIST_MATERIALIZATION_METHOD = NOT_ESTABLISHED
APT_SIMULATION_EXECUTED = FALSE
EFFECTIVE_APT_TRANSACTION = NOT_ESTABLISHED
IMAGE_PROVISIONING = NOT_PERFORMED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

Any next grain requires fresh post-merge Issue #7 reconciliation. A successful 004C1AO merge alone grants no APT, package, provisioning, build, provider, or later-specification authority.

## 11. Merge gates

004C1AO remains a candidate until one exact final head satisfies:

1. canonical `main` and zero-competing-successor-PR reread;
2. exact one-file surface and whitespace verification;
3. exact-head provider/check accounting;
4. fresh independent substantive exact-head review;
5. forward-only repair of every material finding;
6. zero unresolved material review threads;
7. immediate premerge base/head/open-PR race proof;
8. guarded normal merge using the exact reviewed `expected_head_sha`;
9. mechanical post-merge tree/parent/signature/surface verification;
10. fresh Issue #7 successor reconciliation before any new execution authority is inferred.
