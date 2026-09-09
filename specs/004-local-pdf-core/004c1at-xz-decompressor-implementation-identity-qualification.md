# 004C1AT — XZ Decompressor Implementation Identity Qualification

Status: `QUALIFICATION_CANDIDATE / IDENTITY_EVIDENCE_COMPLETE / NO_DECOMPRESSION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `91085636aaebdae60d96ade380cce3c148c724af`
Canonical base tree: `57da7cc97946030da48237927a2618ccb0abd75f`
Authority sources: `github:issue-comment:5609932103`, `github:issue-comment:5609942917`, `github:issue-comment:5609950858`
Failure evidence: `github:issue-comment:5609941328`, `github:issue-comment:5609949104`

## 1. Purpose and dependency basis

Canonical 004C1AR requires any later `Packages.xz` transform to use an XZ implementation whose executable/library identity is separately bound before decompression. Canonical repository search after 004C1AS found no earlier XZ/liblzma implementation identity qualification. 004C1AT closes only that prerequisite for the exact selected local image.

```text
004C1AT_AUTHORITY = BOUNDED_SELECTED_IMAGE_XZ_EXECUTABLE_AND_LINKED_LIBLZMA_IDENTITY_MEASUREMENT_ONLY
004C1AT_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1at-xz-decompressor-implementation-identity-qualification.md
004C1AT_MAX_CHANGED_REPOSITORY_FILES = 1
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
TARGET_PLATFORM = linux/amd64
XZ_DECOMPRESSION = NOT_AUTHORIZED / NOT_PERFORMED
XZ_COMPRESSION = NOT_AUTHORIZED / NOT_PERFORMED
APT_SOURCE_DESCRIPTOR_MATERIALIZATION = NOT_AUTHORIZED / NOT_PERFORMED
APT_SNAPSHOT_LIST_MATERIALIZATION = NOT_AUTHORIZED / NOT_PERFORMED
WRITABLE_APT_STATE_PREPARATION = NOT_AUTHORIZED / NOT_PERFORMED
APT_GET_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_CACHE_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
DPKG_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
PACKAGE_ACTIONS = NOT_AUTHORIZED / NOT_PERFORMED
IMAGE_PULL_LOAD_BUILD = NOT_AUTHORIZED / NOT_PERFORMED
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Preflight binding

Immediately before the first authorized identity probe:

```text
PREFLIGHT_TIME_UTC = 2026-09-09T23:03:58Z
CANONICAL_MAIN = 91085636aaebdae60d96ade380cce3c148c724af
CANONICAL_MAIN_TREE = 57da7cc97946030da48237927a2618ccb0abd75f
OPEN_PULL_REQUESTS = []
SELECTED_IMAGE_LOCAL_ID = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_IMAGE_OS = linux
SELECTED_IMAGE_ARCH = amd64
CONTAINER_COUNT_BEFORE = 14
```

All authorized probes used the already-local exact image with:

```text
--pull=never
--platform linux/amd64
--network none
--read-only
--cap-drop ALL
--security-opt no-new-privileges
--pids-limit 64
--rm
HOST_MOUNTS = 0
REPOSITORY_MOUNTS = 0
```

## 3. Preserved initial Probe A failure

The original authority allowed one Probe A and a Probe B only if A succeeded. Probe A executed this identity-only command family: locate `xz`, print version, hash/stat `/usr/bin/xz`, run `ldd /usr/bin/xz`, then derive and hash/stat the linked `liblzma` path.

The probe recorded useful observations but exited `2` because the host-authored shell quoting caused the `awk` field expression to be interpreted by `/bin/sh` under `set -u`.

```text
INITIAL_PROBE_A_START_UTC = 2026-09-09T23:04:01Z
INITIAL_PROBE_A_END_UTC = 2026-09-09T23:04:02Z
INITIAL_PROBE_A_EXIT_STATUS = 2
INITIAL_PROBE_A_STDOUT_BYTES = 328
INITIAL_PROBE_A_STDOUT_SHA256 = 84bb5b559b0ca9d04b8dd3bbb47a1c594cf3ae77255b272d04e57bbbcf9bb575
INITIAL_PROBE_A_STDERR_BYTES = 33
INITIAL_PROBE_A_STDERR_SHA256 = cb87bee89c3e3a0d7a4ab877846ec0d2a4ebba43198ccf5b343a39f6b23c876e
INITIAL_PROBE_A_STDERR = /bin/sh: 1: 3: parameter not set
INITIAL_PROBE_B_EXECUTED = FALSE
CONTAINER_COUNT_AFTER_INITIAL_FAILURE = 14
```

The preserved stdout before failure established:

```text
XZ_PATH = /usr/bin/xz
XZ_VERSION_FIRST_LINE = xz (XZ Utils) 5.2.5
LIBLZMA_VERSION_LINE = liblzma 5.2.5
XZ_SHA256 = bf66862cb9945876668da02c1522a57ad1824a4bde7c510df497db7c15cbe2ed
XZ_FILE_BYTES = 84504
XZ_MODE_UID_GID = 755 0 0
LDD_LIBLZMA_RESOLUTION = liblzma.so.5 => /lib/x86_64-linux-gnu/liblzma.so.5
```

This failed attempt is canonical evidence and was not rerun under the original authority.

## 4. Bounded fixed-path repair replays

Issue #7 repair authority `github:issue-comment:5609942917` permitted exactly two repaired probes if the first succeeded. It bound `/lib/x86_64-linux-gnu/liblzma.so.5` from the preserved initial `ldd` stdout and removed only the faulty runtime path parser.

Both repaired probes executed the same identity-only operations:

```text
command -v xz
/usr/bin/xz --version
/usr/bin/sha256sum /usr/bin/xz
/usr/bin/stat -c '%s %a %u %g' /usr/bin/xz
/usr/bin/ldd /usr/bin/xz
/usr/bin/sha256sum /lib/x86_64-linux-gnu/liblzma.so.5
/usr/bin/stat -c '%s %a %u %g' /lib/x86_64-linux-gnu/liblzma.so.5
```

Results:

```text
REPAIR_PROBE_A_START_UTC = 2026-09-09T23:05:11Z
REPAIR_PROBE_A_END_UTC = 2026-09-09T23:05:11Z
REPAIR_PROBE_A_EXIT_STATUS = 0
REPAIR_PROBE_B_START_UTC = 2026-09-09T23:05:12Z
REPAIR_PROBE_B_END_UTC = 2026-09-09T23:05:12Z
REPAIR_PROBE_B_EXIT_STATUS = 0
REPAIR_STDOUT_BYTES = 440
REPAIR_STDOUT_SHA256 = b6b9e4c8c3e15e863f1fe675d78eae6b680f0e5cb71bb417b5cde7e6ceb98eb3
REPAIR_STDERR_BYTES = 0
REPAIR_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
REPAIR_A_EQUALS_B_STDOUT = PASS
REPAIR_A_EQUALS_B_STDERR = PASS
```

Qualified observations were identical in both replays:

```text
XZ_PATH = /usr/bin/xz
XZ_VERSION_FIRST_LINE = xz (XZ Utils) 5.2.5
LIBLZMA_VERSION_LINE = liblzma 5.2.5
XZ_SHA256 = bf66862cb9945876668da02c1522a57ad1824a4bde7c510df497db7c15cbe2ed
XZ_FILE_BYTES = 84504
XZ_MODE = 755
XZ_UID = 0
XZ_GID = 0
LDD_LIBLZMA_PATH = /lib/x86_64-linux-gnu/liblzma.so.5
LIBLZMA_CONTENT_SHA256_THROUGH_LDD_PATH = 493cb401ab4aa3bba611ca464d12996afb3b327940d29476f535f999e167439b
LIBLZMA_SYMLINK_NODE_BYTES = 16
LIBLZMA_SYMLINK_NODE_MODE = 777
LIBLZMA_SYMLINK_NODE_UID = 0
LIBLZMA_SYMLINK_NODE_GID = 0
```

The `sha256sum` operation follows the symlink and therefore hashes the linked-library target contents. The non-dereferenced `stat` operation described the symlink node, so target metadata remained intentionally unresolved at this point.

## 5. Linked-library target-stat clarification

Issue #7 clarification authority `github:issue-comment:5609950858` permitted only `/usr/bin/stat -L` on the already-bound linked-library path, twice if the first succeeded. No `xz` execution or new path discovery was authorized.

Exact guest operation:

```text
/usr/bin/stat -Lc '%s %a %u %g' /lib/x86_64-linux-gnu/liblzma.so.5
```

Results:

```text
TARGET_STAT_A_START_UTC = 2026-09-09T23:06:02Z
TARGET_STAT_A_END_UTC = 2026-09-09T23:06:02Z
TARGET_STAT_A_EXIT_STATUS = 0
TARGET_STAT_B_START_UTC = 2026-09-09T23:06:02Z
TARGET_STAT_B_END_UTC = 2026-09-09T23:06:02Z
TARGET_STAT_B_EXIT_STATUS = 0
TARGET_STAT_STDOUT_BYTES = 15
TARGET_STAT_STDOUT_SHA256 = 3d74451a198c55a0dcb7bf5d4cf0c2e5242a4a3422afa508e69452708f95c4ad
TARGET_STAT_STDERR_BYTES = 0
TARGET_STAT_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
TARGET_STAT_A_EQUALS_B_STDOUT = PASS
TARGET_STAT_A_EQUALS_B_STDERR = PASS
LIBLZMA_TARGET_FILE_BYTES = 170456
LIBLZMA_TARGET_MODE = 644
LIBLZMA_TARGET_UID = 0
LIBLZMA_TARGET_GID = 0
```

The final container count remained `14`, equal to the preflight count. All probe containers were ephemeral and removed by `--rm`.

## 6. Qualified implementation identity

The exact decompressor implementation identity for a future separately authorized `Packages.xz` transform is:

```text
XZ_EXECUTABLE_PATH = /usr/bin/xz
XZ_VERSION = xz (XZ Utils) 5.2.5
XZ_EXECUTABLE_SHA256 = bf66862cb9945876668da02c1522a57ad1824a4bde7c510df497db7c15cbe2ed
XZ_EXECUTABLE_BYTES = 84504
XZ_EXECUTABLE_MODE_UID_GID = 755 0 0
LIBLZMA_REPORTED_VERSION = liblzma 5.2.5
LIBLZMA_LDD_PATH = /lib/x86_64-linux-gnu/liblzma.so.5
LIBLZMA_TARGET_CONTENT_SHA256 = 493cb401ab4aa3bba611ca464d12996afb3b327940d29476f535f999e167439b
LIBLZMA_TARGET_BYTES = 170456
LIBLZMA_TARGET_MODE_UID_GID = 644 0 0
SELECTED_IMAGE_DIGEST = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
TARGET_PLATFORM = linux/amd64
```

This identity is bound only to the exact selected image digest and target platform. It is not generalized to other Emscripten tags, architectures, hosts, or future image versions.

## 7. Execution accounting

```text
INITIAL_FAILED_IDENTITY_PROBE_COUNT = 1
INITIAL_SECOND_PROBE_COUNT = 0
REPAIRED_IDENTITY_PROBE_COUNT = 2
TARGET_STAT_CLARIFICATION_PROBE_COUNT = 2
TOTAL_EPHEMERAL_CONTAINER_PROBE_COUNT = 5
CONTAINER_COUNT_BEFORE = 14
CONTAINER_COUNT_FINAL = 14
PERSISTENT_CONTAINER_CREATED = 0
DOCKER_IMAGE_PULL = 0
DOCKER_IMAGE_LOAD = 0
DOCKER_IMAGE_BUILD = 0
XZ_DECOMPRESSION = 0
XZ_COMPRESSION = 0
APT_GET_EXECUTION = 0
APT_CACHE_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_DOWNLOAD = 0
PACKAGE_INSTALL = 0
PACKAGE_UNPACK = 0
PACKAGE_CONFIGURE = 0
APT_SOURCE_DESCRIPTOR_MATERIALIZATION = 0
APT_SNAPSHOT_LIST_MATERIALIZATION = 0
WRITABLE_APT_STATE_PREPARATION = 0
PDFIUM_PROVIDER_EXECUTION = 0
```

The failed first attempt is counted, preserved, and not erased by the successful repair evidence.

## 8. Qualification result

```text
004C1AR_XZ_IDENTITY_PREREQUISITE = SATISFIED_FOR_EXACT_SELECTED_IMAGE
XZ_EXECUTABLE_IDENTITY = PASS
LINKED_LIBLZMA_CONTENT_IDENTITY = PASS
LINKED_LIBLZMA_TARGET_METADATA = PASS
REPAIR_REPLAY_DETERMINISM = PASS
TARGET_STAT_REPLAY_DETERMINISM = PASS
NO_DECOMPRESSION_OR_COMPRESSION = PASS
NO_PACKAGE_OR_APT_ACTION = PASS
004C1AT_RESULT = PASS_XZ_DECOMPRESSOR_IMPLEMENTATION_IDENTITY_ONLY
```

## 9. Successor boundary

004C1AT establishes only the XZ/liblzma implementation identity prerequisite named by canonical 004C1AR. It does not authorize using that implementation yet. A fresh post-merge Issue #7 reconciliation must determine whether the next dependency is descriptor/list/release materialization, writable APT-state preparation, another prerequisite, or a fail-closed blocker.

```text
XZ_DECOMPRESSION = NOT_AUTHORIZED
APT_SOURCE_DESCRIPTOR_MATERIALIZATION = NOT_AUTHORIZED
APT_SNAPSHOT_LIST_MATERIALIZATION = NOT_AUTHORIZED
WRITABLE_APT_STATE_PREPARATION = NOT_AUTHORIZED
APT_GET_EXECUTION = NOT_AUTHORIZED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED
PACKAGE_ACTIONS = NOT_AUTHORIZED
IMAGE_PROVISIONING = NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
