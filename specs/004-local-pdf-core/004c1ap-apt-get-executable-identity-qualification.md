# 004C1AP — APT Get Executable Identity Qualification

Status: `QUALIFICATION_CANDIDATE / TWO_REPLAY_EXECUTABLE_IDENTITY_PASS / ZERO_PACKAGE_ACTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `e5f8af8d348f7b53791c28b66c9513b7a5bee291`
Canonical base tree: `5e66f187a786f71a4f6dafa6e9d8a6cff4b87c7e`
Authority source: `github:issue-comment:5609300886`

## 1. Purpose and authority

Canonical 004C1AL requires the exact `apt-get` executable path, version, and byte identity before an exact solver argv can become merge-critical evidence. Canonical 004C1AO closes the selected-image guest substrate freshness prerequisite. 004C1AP measures only the exact `apt-get` executable identity in that same selected immutable image.

```text
004C1AP_AUTHORITY = BOUNDED_APT_GET_EXECUTABLE_IDENTITY_MEASUREMENT_ONLY
004C1AP_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ap-apt-get-executable-identity-qualification.md
004C1AP_MAX_CHANGED_REPOSITORY_FILES = 1
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
TARGET_PLATFORM = linux/amd64
AUTHORIZED_SHELL_BUILTIN = command -v apt-get
AUTHORIZED_APT_GET_INVOCATION = /usr/bin/apt-get --version ONLY
AUTHORIZED_BYTE_IDENTITY_COMMAND = /usr/bin/sha256sum /usr/bin/apt-get
AUTHORIZED_FILE_METADATA_COMMAND = /usr/bin/stat -c '%s %a %u %g' /usr/bin/apt-get
ALL_OTHER_APT_GET_INVOCATIONS = NOT_AUTHORIZED
APT_CACHE_EXECUTION = NOT_AUTHORIZED
APT_CONFIG_EXECUTION = NOT_AUTHORIZED
DPKG_OR_DPKG_QUERY_EXECUTION = NOT_AUTHORIZED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED
APT_SOURCE_OR_LIST_READ = NOT_AUTHORIZED
PACKAGE_DOWNLOAD_OR_INSTALL = NOT_AUTHORIZED
ROOTFS_EXTRACTION = NOT_AUTHORIZED
NODE_TOOLCHAIN_PDFIUM_PROVIDER_EXECUTION = NOT_AUTHORIZED
DOCKER_IMAGE_PULL_LOAD_BUILD = NOT_AUTHORIZED
REPOSITORY_UPSTREAM_BINARY_OR_SOURCE_IMPORT = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Immediate pre-probe state

At `2026-09-09T21:57:55Z`:

```text
CANONICAL_MAIN = e5f8af8d348f7b53791c28b66c9513b7a5bee291
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

The exact selected image and zero-competing-PR state were current before Probe A.

## 3. Exact probe controls and argv

Both replays used:

```text
--pull=never
--platform linux/amd64
--network none
--read-only
--cap-drop ALL
--security-opt no-new-privileges
--pids-limit 64
--rm
--entrypoint /bin/sh
HOST_MOUNTS = 0
REPOSITORY_MOUNTS = 0
```

Exact shell body:

```text
command -v apt-get; /usr/bin/apt-get --version; /usr/bin/sha256sum /usr/bin/apt-get; /usr/bin/stat -c '%s %a %u %g' /usr/bin/apt-get
```

No other APT, dpkg, package-manager, or source-list command was executed.

## 4. Probe A

```text
PROBE_A_START_UTC = 2026-09-09T21:57:55Z
PROBE_A_END_UTC = 2026-09-09T21:57:55Z
PROBE_A_EXIT_STATUS = 0
PROBE_A_STDOUT_BYTES = 620
PROBE_A_STDOUT_SHA256 = 304f416d0b28032651721f01f45dd86894a0b1310858805a79f8c30d1197dd58
PROBE_A_STDERR_BYTES = 0
PROBE_A_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
PROBE_A_CONTAINER_SET_UNCHANGED = TRUE
```

Qualified identity fields:

```text
APT_GET_PATH = /usr/bin/apt-get
APT_GET_VERSION_FIRST_LINE = apt 2.4.13 (amd64)
APT_GET_SHA256 = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196
APT_GET_FILE_BYTES = 51680
APT_GET_MODE = 755
APT_GET_UID = 0
APT_GET_GID = 0
```

`apt-get --version` naturally emitted a supported-modules listing after its first line. Only the first line is consumed as version evidence. Remaining stdout is retained solely in the raw stdout byte identity and does not establish source, resolver, package, or configuration behavior.

## 5. Probe B

Probe A succeeded, so exactly one independent replay was performed:

```text
PROBE_B_START_UTC = 2026-09-09T21:57:55Z
PROBE_B_END_UTC = 2026-09-09T21:57:56Z
PROBE_B_EXIT_STATUS = 0
PROBE_B_STDOUT_BYTES = 620
PROBE_B_STDOUT_SHA256 = 304f416d0b28032651721f01f45dd86894a0b1310858805a79f8c30d1197dd58
PROBE_B_STDERR_BYTES = 0
PROBE_B_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
PROBE_B_CONTAINER_SET_UNCHANGED = TRUE
```

Probe B produced the same qualified identity fields:

```text
APT_GET_PATH = /usr/bin/apt-get
APT_GET_VERSION_FIRST_LINE = apt 2.4.13 (amd64)
APT_GET_SHA256 = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196
APT_GET_FILE_BYTES = 51680
APT_GET_MODE = 755
APT_GET_UID = 0
APT_GET_GID = 0
IDENTITY_OBSERVATIONS_EQUAL = TRUE
RAW_STDOUT_EQUAL = TRUE
RAW_STDERR_EQUAL = TRUE
```

No third replay occurred.

## 6. Package-action boundary

The only `apt-get` invocation was exactly:

```text
/usr/bin/apt-get --version
```

It did not request `update`, `install`, `remove`, `upgrade`, `download`, `source`, `satisfy`, `build-dep`, or simulation behavior.

```text
APT_GET_PACKAGE_ACTION = 0
APT_GET_SIMULATION = 0
APT_CACHE_EXECUTION = 0
APT_CONFIG_EXECUTION = 0
DPKG_EXECUTION = 0
DPKG_QUERY_EXECUTION = 0
APT_SOURCE_LIST_READ_COMMAND = 0
PACKAGE_DOWNLOAD = 0
PACKAGE_INSTALLATION = 0
```

004C1AP does not infer configuration, source-list, solver, or installed-state semantics from the `apt-get --version` module listing.

## 7. Container and execution accounting

```text
CONTAINER_COUNT_BEFORE = 14
CONTAINER_COUNT_AFTER = 14
FINAL_CONTAINER_SET_UNCHANGED = TRUE
BOUNDED_PROBE_COUNT = 2
DOCKER_IMAGE_PULL = 0
DOCKER_IMAGE_LOAD = 0
DOCKER_IMAGE_BUILD = 0
PERSISTENT_CONTAINER_COUNT_CREATED = 0
ROOTFS_EXTRACTION = 0
NODE_TOOLCHAIN_PDFIUM_PROVIDER_EXECUTION = 0
REPOSITORY_UPSTREAM_BINARY_OR_SOURCE_IMPORT = 0
```

Two ephemeral containers existed only for the authorized read-only executable-identity probes and were removed by `--rm`.

## 8. Qualification result

```text
004C1AP_RESULT = PASS_APT_GET_EXECUTABLE_IDENTITY
EXACT_APT_GET_PATH = /usr/bin/apt-get
EXACT_APT_GET_VERSION = apt 2.4.13 (amd64)
EXACT_APT_GET_SHA256 = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196
EXACT_APT_GET_FILE_BYTES = 51680
EXACT_APT_GET_MODE = 755
EXACT_APT_GET_UID_GID = 0:0
TWO_REPLAY_IDENTITY_DETERMINISM = PASS
```

This satisfies only the executable-identity prerequisite named by canonical 004C1AL for the current exact image/substrate state.

## 9. Explicit non-claims and successor boundary

```text
EXACT_APT_CONFIGURATION_IDENTITY = NOT_ESTABLISHED
EXACT_APT_ARGV_IDENTITY = NOT_ESTABLISHED
EXACT_SNAPSHOT_LIST_MATERIALIZATION_METHOD = NOT_ESTABLISHED
ISOLATED_APT_WRITABLE_ROOTS = NOT_MATERIALIZED
APT_SIMULATION_EXECUTED = FALSE
EFFECTIVE_APT_TRANSACTION = NOT_ESTABLISHED
IMAGE_PROVISIONING = NOT_PERFORMED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

A successful 004C1AP merge grants no authority for `apt-config`, APT source/list materialization, solver argv freezing, APT simulation, package operations, provisioning, or build execution. Fresh Issue #7 reconciliation is required.

## 10. Merge gates

004C1AP remains a candidate until one exact final head satisfies:

1. canonical main and zero competing successor PR reread;
2. exact one-file surface and whitespace verification;
3. exact-head provider/check accounting;
4. fresh independent substantive exact-head review;
5. forward-only repair of every material finding;
6. zero unresolved material review threads;
7. immediate premerge base/head/open-PR race proof;
8. guarded normal merge using the exact reviewed `expected_head_sha`;
9. mechanical post-merge tree/parent/signature/surface verification;
10. fresh Issue #7 successor reconciliation.
