# 004C1CA — Pre-Provisioning Substrate and Selected-Image Locality Recheck Qualification

Status: `QUALIFICATION_CANDIDATE / TWO_REPLAY_PRE_PROVISIONING_RECHECK_PASS / ZERO_PROVISIONING_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `56d577241bb9c38bb8ce9358090f438ce68a7098`
Canonical base tree: `eba5d20fa1d9cb68e9d7b42a4ac3e3b74f36416b`
Authority source: `github:issue-comment:5635619015`

## 1. Purpose and exact authority

Canonical 004C1BZ closes the final Stage C solver-model virtual installed state only. It does not authorize package extraction or installation, builder provisioning, source/toolchain execution, PDFium build/runtime, provider implementation, 004C2, 004D, or Specification 005.

Canonical 004C1AH requires a fresh execution-substrate recheck immediately before any separately authorized provisioning execution. Canonical 004C1AO satisfied the analogous freshness prerequisite for the APT simulation window and cannot be reused as an immediate pre-provisioning freshness proof.

Issue #7 therefore authorizes 004C1CA only to re-read the current host/Docker substrate, verify exact selected-image locality and immutable identity, and run at most two bounded non-provisioning guest probes.

```text
004C1CA_AUTHORITY = BOUNDED_PRE_PROVISIONING_SUBSTRATE_AND_SELECTED_IMAGE_LOCALITY_RECHECK_ONLY
004C1CA_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ca-pre-provisioning-substrate-and-selected-image-locality-recheck-qualification.md
004C1CA_MAX_CHANGED_REPOSITORY_FILES = 1
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
TARGET_PLATFORM = linux/amd64
HOST_AND_DOCKER_READ_ONLY_VERSION_KERNEL_ARCH_MEASUREMENT = AUTHORIZED
SELECTED_IMAGE_LOCAL_READ_ONLY_METADATA_INSPECTION = AUTHORIZED
SELECTED_IMAGE_MANIFEST_CONFIG_PLATFORM_IDENTITY_RECHECK = AUTHORIZED_READ_ONLY
BOUNDED_SELECTED_IMAGE_GUEST_PROBE = AUTHORIZED_AT_MOST_TWO_REPLAYS
DOCKER_IMAGE_PULL = NOT_AUTHORIZED
DOCKER_IMAGE_LOAD_OR_BUILD = NOT_AUTHORIZED
APT_GET_OR_APT_CACHE_EXECUTION = NOT_AUTHORIZED
DPKG_EXECUTION = NOT_AUTHORIZED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED
PACKAGE_ARCHIVE_ACQUISITION = NOT_AUTHORIZED
PACKAGE_EXTRACTION_INSTALLATION_OR_CONFIGURATION = NOT_AUTHORIZED
IMAGE_PROVISIONING_OR_MUTATION = NOT_AUTHORIZED
NODE_OR_EMSDK_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
DEPOT_TOOLS_GCLIENT_GN_NINJA_CLANG_OR_PDFIUM_ACQUISITION_OR_EXECUTION = NOT_AUTHORIZED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
REPOSITORY_UPSTREAM_BINARY_OR_SOURCE_IMPORT = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No image layer, package byte, source byte, toolchain byte, runtime artifact, or raw external evidence file enters the repository through this grain.

## 2. Immediate pre-measurement canonical race check

Immediately before the qualifying measurement window, live GitHub truth was re-read:

```text
CANONICAL_MAIN = 56d577241bb9c38bb8ce9358090f438ce68a7098
CANONICAL_MAIN_TREE = eba5d20fa1d9cb68e9d7b42a4ac3e3b74f36416b
OPEN_PULL_REQUEST_COUNT = 0
LATEST_004C1BZ_CLOSEOUT = github:issue-comment:5628998020
004C1CA_AUTHORITY = github:issue-comment:5635619015
```

The external evidence root was created outside the Signthos repository:

```text
EVIDENCE_ROOT = /tmp/signthos-004c1ca-20260911T140737Z-63626
MEASUREMENT_START_UTC = 2026-09-11T14:07:37Z
MEASUREMENT_END_UTC = 2026-09-11T14:07:41Z
```

No local Signthos checkout was mounted into either probe.

## 3. Fresh physical host and Docker substrate

The qualifying window measured the current host and Docker substrate without mutation:

```text
HOST_PRODUCT = macOS
HOST_PRODUCT_VERSION = 26.6.2
HOST_BUILD_VERSION = 25G83
HOST_UNAME = Darwin macbook 25.6.0 Darwin Kernel Version 25.6.0: Fri Jul 31 19:18:43 PDT 2026; root:xnu-12377.161.14~5/RELEASE_ARM64_T8112 arm64
DOCKER_CLIENT = 29.5.1/darwin/arm64
DOCKER_SERVER = 29.7.2/linux/arm64
DOCKER_SERVER_KERNEL = 7.0.12-linuxkit
```

Exact retained measurement-file identities:

```text
SW_VERS_STDOUT = 65 / cd5d6399b3785b04ceaae75045a9ca9f80f0bbc3526eff9d0c36b170ed1ec348
UNAME_STDOUT = 132 / 43b5b072c8c3905ab01a14daa6cfd910a1c01a99f4ab43c7953956a6fab1a098
DOCKER_VERSION_STDOUT = 76 / 98a8d08003fa0572e502b43ae3f199bf2a355f3c02683adb82a5414e0d19182a
SW_VERS_STDERR_BYTES = 0
UNAME_STDERR_BYTES = 0
DOCKER_VERSION_STDERR_BYTES = 0
```

These facts match the material Docker substrate qualified before the APT simulation chain: Docker client 29.5.1, Docker server 29.7.2 on linux/arm64, and kernel 7.0.12-linuxkit. No material Docker substrate drift was observed.

## 4. Exact selected-image locality and immutable identity

The selected image remained locally present and its local read-only metadata matched the canonical selection:

```text
IMAGE_INSPECT_RC = 0
IMAGE_ID = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
IMAGE_OS = linux
IMAGE_ARCH = amd64
IMAGE_REPODIGESTS = ["emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3"]
IMAGE_CREATED = 2024-10-25T02:01:37.555008906Z
IMAGE_SIZE = 720592460
ROOTFS_LAYER_COUNT = 5
IMAGE_INSPECT_JSON = 2573 / 62283da30bfbe9c58db0d583a24a053fe75a2c7f3a7738158769beeb62b1225a
IMAGE_INSPECT_STDERR_BYTES = 0
```

The authorized immutable manifest/config binding recheck also passed:

```text
MANIFEST_INSPECT_RC = 0
MANIFEST_BYTES = 1369
MANIFEST_SHA256 = c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
MANIFEST_MEDIA_TYPE = application/vnd.docker.distribution.manifest.v2+json
MANIFEST_CONFIG_DIGEST = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
MANIFEST_CONFIG_SIZE = 4359
MANIFEST_LAYER_COUNT = 5
MANIFEST_STDERR_BYTES = 0
```

Therefore:

```text
SELECTED_IMAGE_LOCAL_PRESENT = TRUE
SELECTED_MANIFEST_MATCH = PASS
SELECTED_CONFIG_BINDING_MATCH = PASS
SELECTED_PLATFORM_MATCH = PASS
DOCKER_IMAGE_PULL = 0
DOCKER_IMAGE_LOAD = 0
DOCKER_IMAGE_BUILD = 0
```

## 5. Exact bounded probe contract

Probe A and Probe B used the same invocation and consumed the maximum authorized probe count:

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
PULL_POLICY = never
NETWORK = none
FILESYSTEM = read-only
CAPABILITIES = drop-all
NO_NEW_PRIVILEGES = true
PIDS_LIMIT = 64
HOST_MOUNTS = 0
REPOSITORY_MOUNTS = 0
ENTRYPOINT = /bin/sh
AUTHORIZED_MAXIMUM_PROBE_COUNT = 2
ACTUAL_PROBE_COUNT = 2
SILENT_RETRY_COUNT = 0
```

## 6. Probe A and Probe B evidence

Probe A:

```text
PROBE_A_START_UTC = 2026-09-11T14:07:41Z
PROBE_A_END_UTC = 2026-09-11T14:07:41Z
PROBE_A_EXIT_STATUS = 0
PROBE_A_STDOUT = 329 / 776667f3ab7841221d22676b1fc4f1bd780064aa1291a182d3f985071b23f575
PROBE_A_STDERR = 0 / e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

Probe B:

```text
PROBE_B_START_UTC = 2026-09-11T14:07:41Z
PROBE_B_END_UTC = 2026-09-11T14:07:41Z
PROBE_B_EXIT_STATUS = 0
PROBE_B_STDOUT = 329 / 776667f3ab7841221d22676b1fc4f1bd780064aa1291a182d3f985071b23f575
PROBE_B_STDERR = 0 / e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The qualification observations are identical in both probes:

```text
GUEST_KERNEL = 7.0.12-linuxkit
GUEST_MACHINE = x86_64
GUEST_LIBC_FIRST_LINE = ldd (Ubuntu GLIBC 2.35-0ubuntu3.8) 2.35
ROSETTA_VISIBLE = NO
PROBE_STDOUT_EQUAL = TRUE
PROBE_STDERR_EQUAL = TRUE
TWO_REPLAY_DETERMINISM = PASS
```

The additional informational lines emitted naturally by `ldd --version` are retained in the raw stdout identity but are not used to broaden the qualification claim.

No third probe was executed or authorized.

## 7. Chromium Rodete predicate

The canonical predicate remains:

```python
name.startswith('6.12.') and name.endswith('rodete1-amd64')
```

For the fresh selected-image guest kernel:

```text
name = 7.0.12-linuxkit
name.startswith('6.12.') = FALSE
name.endswith('rodete1-amd64') = FALSE
RODETE_PREDICATE = FALSE
```

The Rodete-specific pinned `linux-libc-dev=5.8.14-1` branch therefore remains inactive for this exact measured substrate. This conclusion is scoped to this exact Docker server/kernel, selected immutable image, and linux/amd64 guest.

## 8. Container-set and execution accounting

```text
CONTAINER_COUNT_BEFORE = 14
CONTAINER_COUNT_AFTER = 14
CONTAINER_SET_BEFORE = 910 / 5dcb01c290286c1699b2b183b9bc44aa53a8b3f1cadae001065932056112937d
CONTAINER_SET_AFTER = 910 / 5dcb01c290286c1699b2b183b9bc44aa53a8b3f1cadae001065932056112937d
CONTAINER_SET_UNCHANGED = TRUE
PERSISTENT_CONTAINER_COUNT_CREATED = 0
DOCKER_IMAGE_PULL = 0
DOCKER_IMAGE_LOAD = 0
DOCKER_IMAGE_BUILD = 0
APT_GET_OR_APT_CACHE_EXECUTION = 0
DPKG_EXECUTION = 0
APT_SIMULATION_EXECUTION = 0
PACKAGE_ARCHIVE_ACQUISITION = 0
PACKAGE_EXTRACTION_INSTALLATION_CONFIGURATION = 0
IMAGE_PROVISIONING_OR_MUTATION = 0
NODE_OR_EMSDK_TOOLCHAIN_EXECUTION = 0
DEPOT_TOOLS_GCLIENT_GN_NINJA_CLANG_OR_PDFIUM_ACQUISITION_OR_EXECUTION = 0
PROVIDER_OR_PDF_RUNTIME_EXECUTION = 0
REPOSITORY_UPSTREAM_BINARY_OR_SOURCE_IMPORT = 0
```

The two containers existed only ephemerally for the two authorized probes and were removed by `--rm`.

## 9. Qualification result

```text
004C1CA_RESULT = PASS_PRE_PROVISIONING_SUBSTRATE_AND_SELECTED_IMAGE_LOCALITY_RECHECK
FRESH_HOST_DOCKER_SUBSTRATE = PASS
FRESH_SELECTED_IMAGE_LOCALITY = PASS
FRESH_SELECTED_MANIFEST_CONFIG_PLATFORM_IDENTITY = PASS
FRESH_SELECTED_IMAGE_GUEST_KERNEL = 7.0.12-linuxkit
FRESH_SELECTED_IMAGE_GUEST_MACHINE = x86_64
FRESH_SELECTED_IMAGE_GUEST_LIBC = Ubuntu GLIBC 2.35-0ubuntu3.8 / 2.35
FRESH_SELECTED_IMAGE_ROSETTA_VISIBILITY = NO
FRESH_SELECTED_IMAGE_RODETE_PREDICATE = FALSE
TWO_REPLAY_DETERMINISM = PASS
SUBSTRATE_RECHECK_BEFORE_PROVISIONING = SATISFIED_BY_004C1CA_CANDIDATE
```

This closes only the immediate freshness prerequisite required before a separately authorized provisioning attempt. The qualification is time-sensitive: Docker Desktop changes, Docker server/kernel/architecture drift, selected-image garbage collection, selected digest/platform changes, or later material substrate changes invalidate inherited freshness.

## 10. Explicit non-claims and successor boundary

004C1CA does not establish or authorize:

```text
PACKAGE_PROVISIONING_EXECUTION = NOT_PERFORMED / NOT_AUTHORIZED
FINAL_PROVISIONED_IMAGE_IDENTITY = NOT_ESTABLISHED
MAINTAINER_SCRIPT_EFFECTS = NOT_EXECUTED / NOT_ESTABLISHED
DPKG_TRIGGER_EFFECTS = NOT_EXECUTED / NOT_ESTABLISHED
ALTERNATIVES_OR_DIVERSION_EFFECTS = NOT_EXECUTED / NOT_ESTABLISHED
DEPOT_TOOLS_ACQUIRED_BYTE_IDENTITY = NOT_ESTABLISHED_BY_004C1CA
GN_NINJA_CLANG_ACQUIRED_BYTE_IDENTITIES = NOT_ESTABLISHED_BY_004C1CA
PDFIUM_BUILD_EXECUTION_AUTHORITY = ABSENT
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
```

A successful 004C1CA merge grants no package-provisioning authority by itself. Fresh post-merge Issue #7 reconciliation must determine whether the next smallest unit may authorize a bounded package-provisioning attempt or whether another prerequisite remains.

## 11. Merge gates

004C1CA remains a candidate until one exact final head satisfies all canonical gates:

1. canonical `main` and zero-competing-successor-PR reread;
2. exact one-file surface and whitespace verification;
3. exact document byte/line/SHA-256 identity capture;
4. exact-head provider/check accounting;
5. fresh independent substantive exact-head review;
6. forward-only repair of every material finding;
7. fresh exact-head re-review after any repair;
8. zero unresolved material review threads;
9. immediate premerge base/head/open-PR race proof;
10. guarded normal merge using the exact reviewed `expected_head_sha`;
11. mechanical post-merge tree/parent/signature/surface verification;
12. fresh Issue #7 successor reconciliation before any new execution authority is inferred.
