# 004C1AN — Selected Emscripten linux/amd64 Image Reacquisition Qualification

Status: `QUALIFICATION_CANDIDATE / EXACT_DIGEST_REACQUISITION_COMPLETE / READ_ONLY_IDENTITY_VERIFICATION_ONLY / ZERO_CONTAINER_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `97069b159871ea3f12f37e7f6cfb1f7ec45b2384`
Canonical base tree: `b61a58661023072e322b2d9d210bf61cf16adffe`
Latest authority source: `github:issue-comment:5609056032`
Earlier bounded authority record: `github:issue-comment:5609048897`

## 1. Purpose and exact authority

Canonical 004C1AM closed fail-closed because the exact selected Emscripten `linux/amd64` image was not present in the local Docker content store. 004C1AN closes only that locality blocker by executing the one exact-digest pull authorized by Issue #7 and then verifying the selected immutable manifest/config/platform identities without executing image content.

```text
004C1AN_AUTHORITY = EXACT_DIGEST_IMAGE_REACQUISITION_AND_READ_ONLY_IDENTITY_VERIFICATION_ONLY
004C1AN_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1an-selected-emsdk-linux-amd64-image-reacquisition-qualification.md
004C1AN_MAX_CHANGED_REPOSITORY_FILES = 1
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_IMAGE_MANIFEST_SHA256 = c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_IMAGE_CONFIG_SHA256 = 6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
TARGET_PLATFORM = linux/amd64
EXACT_SELECTED_IMAGE_PULL_BY_DIGEST = AUTHORIZED
POST_PULL_READ_ONLY_DOCKER_IMAGE_METADATA_INSPECTION = AUTHORIZED
POST_PULL_MANIFEST_CONFIG_PLATFORM_IDENTITY_VERIFICATION = AUTHORIZED
POST_PULL_LOCAL_CONTENT_STORE_PRESENCE_VERIFICATION = AUTHORIZED
DOCKER_IMAGE_LOAD = NOT_AUTHORIZED
DOCKER_CONTAINER_CREATE_OR_EXECUTION = NOT_AUTHORIZED
SELECTED_IMAGE_ROOTFS_EXTRACTION = NOT_AUTHORIZED
APT_GET_OR_APT_CACHE_EXECUTION = NOT_AUTHORIZED
DPKG_EXECUTION = NOT_AUTHORIZED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED
PACKAGE_ARCHIVE_ACQUISITION = NOT_AUTHORIZED
PACKAGE_INSTALLATION = NOT_AUTHORIZED
IMAGE_PROVISIONING_OR_MUTATION = NOT_AUTHORIZED
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

No image layer, config blob, package byte, source byte, generated runtime artifact, or external evidence byte is committed to Signthos by this grain.

## 2. Canonical predecessor and competing-work gate

Immediately before the authorized acquisition window, Issue #7 reconciliation `github:issue-comment:5609056032` bound:

```text
CANONICAL_MAIN = 97069b159871ea3f12f37e7f6cfb1f7ec45b2384
CANONICAL_MAIN_TREE = b61a58661023072e322b2d9d210bf61cf16adffe
004C1AM = CLOSED_CANONICAL_FAIL_CLOSED_PREFLIGHT
004C1AM_PRIMARY_BLOCKER = EXACT_SELECTED_EMSDK_LINUX_AMD64_IMAGE_NOT_LOCAL
OPEN_PULL_REQUEST_COUNT = 0
```

That reconciliation was created at `2026-09-09T21:33:54Z`. The bounded pull began at `2026-09-09T21:33:58Z`, four seconds later, and the acquisition harness independently re-read canonical `main` before invoking Docker:

```text
CANONICAL_MAIN_RECHECK = 97069b159871ea3f12f37e7f6cfb1f7ec45b2384
PRE_ACQUISITION_AUTHORITY_RACE = PASS
```

No competing successor PR existed in the authority record immediately preceding acquisition. A fresh open-PR query is still required immediately before any later guarded merge because this observation is time-bounded.

## 3. Fresh Docker identity and pre-attempt locality

Fresh read-only pre-attempt measurements:

```text
DOCKER_CLIENT_VERSION = 29.5.1
DOCKER_SERVER_VERSION = 29.7.2
DOCKER_SERVER_KERNEL = 7.0.12-linuxkit
DOCKER_SERVER_ARCH = aarch64
PRE_SELECTED_IMAGE_INSPECT_RC = 1
PRE_SELECTED_IMAGE_LOCAL_PRESENT = NO
PRE_SELECTED_CONFIG_INSPECT_RC = 1
PRE_SELECTED_CONFIG_LOCAL_PRESENT = NO
CONTAINER_COUNT_BEFORE = 14
```

The selected image/config absence therefore reproduced the exact 004C1AM blocker before acquisition.

## 4. Single authorized pull attempt

Exactly one acquisition command was executed:

```text
PULL_ARGV = ["docker","pull","--platform","linux/amd64","docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3"]
PULL_START_UTC = 2026-09-09T21:33:58Z
PULL_END_UTC = 2026-09-09T21:41:10Z
PULL_EXIT_STATUS = 0
PULL_STDOUT_BYTES = 888
PULL_STDOUT_SHA256 = 757c348984156029d2bf6c0395b5998f3a50c2a65726c740caf846180db6c47d
PULL_STDERR_BYTES = 0
PULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
AUTHORIZED_PULL_ATTEMPT_COUNT = 1
RERUN_TO_GREEN_PULL_COUNT = 0
```

The pull reported the exact immutable digest and completed the five exact canonical layer identities:

```text
PULL_REPORTED_DIGEST = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
PULL_REPORTED_REFERENCE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
```

No alternate tag, digest, or platform was supplied.

## 5. Post-pull local Docker metadata

Read-only local inspection after the pull established:

```text
POST_SELECTED_IMAGE_INSPECT_RC = 0
POST_IMAGE_ID = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
POST_DESCRIPTOR_DIGEST = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
POST_DESCRIPTOR_MEDIA_TYPE = application/vnd.docker.distribution.manifest.v2+json
POST_DESCRIPTOR_SIZE = 1369
POST_IMAGE_OS = linux
POST_IMAGE_ARCH = amd64
POST_IMAGE_REPODIGESTS = ["emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3"]
POST_IMAGE_CREATED = 2024-10-25T02:01:37.555008906Z
POST_IMAGE_SIZE = 720592460
POST_ROOTFS_LAYER_COUNT = 5
POST_IMAGE_INSPECT_JSON_SHA256 = 62283da30bfbe9c58db0d583a24a053fe75a2c7f3a7738158769beeb62b1225a
```

The uncompressed rootfs diff-ID set observed by local Docker is:

```text
sha256:2573e0d8158209ed54ab25c87bcdcb00bd3d2539246960a3d592a1c599d70465
sha256:cda677916487ddbbb6e47b65bf860d988cfcd69d53f32260b55cec6f2c4e5086
sha256:a89cd2ce10250e9e4ff6955c798ff27a1051eacd4b443bc81051a38e779a7733
sha256:af363988ef20e590c4995923f6566ca5012887bc8c42d9c64cab1e55b58eabe9
sha256:fdfce864fd5f062670cc90a37f9eea85b13ecc4d9fa7caf940f8a27d1dfa413c
```

```text
POST_ROOTFS_DIFF_IDS_SHA256 = 4adf6c36cc9948b573f78abf5836a540cab8b5a8b0bbe5aec16e16b206ffd1eb
LOCAL_REPOSITORY_DIGEST_MATCH = PASS
LOCAL_OS_MATCH = PASS
LOCAL_ARCHITECTURE_MATCH = PASS
LOCAL_MANIFEST_DESCRIPTOR_MATCH = PASS
```

No rootfs extraction occurred.

## 6. Initial Docker `.Id` interpretation was non-qualifying

The acquisition harness initially emitted:

```text
CONFIG_ID_MATCH_EXPECTED = FALSE
```

That boolean was produced by comparing Docker image-inspect `.Id` to the canonical config digest. The comparison is semantically invalid on the current Docker Desktop containerd image store because `.Id` is exposed as the manifest descriptor digest for this image:

```text
DOCKER_INSPECT_ID = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
DOCKER_INSPECT_DESCRIPTOR_DIGEST = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
CANONICAL_CONFIG_DIGEST = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
```

Therefore:

```text
INITIAL_CONFIG_ID_BOOLEAN = NON_QUALIFYING_MEASUREMENT_METHOD
INITIAL_CONFIG_MISMATCH_CLAIM = REJECTED
IMAGE_ID_TO_CONFIG_DIGEST_EQUIVALENCE = FALSE_ON_CURRENT_INSPECTION_SURFACE
```

This record preserves the initial observation rather than deleting or rewriting it. Identity qualification uses the authorized immutable manifest/config verification below.

## 7. Authorized immutable manifest/config verification

Latest Issue #7 authority explicitly permits post-pull manifest/config/platform identity verification. A read-only exact-digest verification used:

```text
VERIFY_TIME_UTC = 2026-09-09T21:45:18Z
VERIFY_ARGV = ["docker","buildx","imagetools","inspect","--raw","docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3"]
VERIFY_RC = 0
VERIFY_STDOUT_BYTES = 1369
VERIFY_STDOUT_SHA256 = c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
VERIFY_STDERR_BYTES = 0
VERIFY_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The raw immutable manifest decoded to:

```text
MANIFEST_MEDIA_TYPE = application/vnd.docker.distribution.manifest.v2+json
MANIFEST_SCHEMA_VERSION = 2
MANIFEST_CONFIG_MEDIA_TYPE = application/vnd.docker.container.image.v1+json
MANIFEST_CONFIG_DIGEST = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
MANIFEST_CONFIG_SIZE = 4359
MANIFEST_LAYER_COUNT = 5
EXPECTED_MANIFEST_SHA256_MATCH = TRUE
EXPECTED_CONFIG_DIGEST_MATCH = TRUE
```

The exact compressed layer digest sequence is:

```text
sha256:6414378b647780fee8fd903ddb9541d134a1947ce092d08bdeb23a54cb3684ac
sha256:1164f57cdbc07b21b5f290ecea54b10bbc0777ef07dd20c35c4fd530f43ac2e8
sha256:e760689f52850b429cbb44a5279b7784da9f0c3433f94bf5ae72c93468b2588b
sha256:75fef3b7122bb367a84e704f6eb3fe3bba5e1cddfeed8cb2b012eeeeac6ed672
sha256:33b4841b8fee46e16490db256e13a880072d422a2a45560774cf611ea312562a
```

These manifest/config/layer identities exactly match canonical 004C1AI. The raw manifest bytes themselves hash to the selected immutable manifest identity, so the config binding is cryptographically part of the exact selected manifest rather than inferred from Docker `.Id` semantics.

## 8. Container and execution accounting

Container inventory was unchanged across the pull:

```text
CONTAINER_COUNT_BEFORE = 14
CONTAINER_COUNT_AFTER = 14
CONTAINER_SET_UNCHANGED = TRUE
```

Execution accounting for 004C1AN:

```text
DOCKER_PULL_ATTEMPTS = 1
DOCKER_IMAGE_LOAD = 0
DOCKER_IMAGE_BUILD = 0
DOCKER_CONTAINER_CREATE = 0
DOCKER_CONTAINER_EXECUTION = 0
HOST_OR_REPOSITORY_MOUNT = 0
ROOTFS_EXTRACTION = 0
APT_GET_OR_APT_CACHE_EXECUTION = 0
DPKG_EXECUTION = 0
APT_SIMULATION_EXECUTION = 0
PACKAGE_ARCHIVE_ACQUISITION = 0
PACKAGE_INSTALLATION = 0
IMAGE_PROVISIONING_OR_MUTATION = 0
NODE_OR_TOOLCHAIN_EXECUTION = 0
DEPOT_TOOLS_GCLIENT_GN_NINJA_CLANG_OR_PDFIUM_EXECUTION = 0
PROVIDER_OR_PDF_RUNTIME_EXECUTION = 0
REPOSITORY_UPSTREAM_BINARY_OR_SOURCE_IMPORT = 0
```

`docker pull` acquired only the already-selected immutable image into Docker's external local content store as explicitly authorized. It did not execute image content.

## 9. Qualification result

```text
004C1AN_RESULT = PASS_EXACT_SELECTED_IMAGE_LOCALITY_AND_IDENTITY_RESTORED
EXACT_SELECTED_IMAGE_LOCAL_PRESENT = TRUE
EXACT_SELECTED_MANIFEST_MATCH = PASS
EXACT_SELECTED_CONFIG_BINDING_MATCH = PASS
EXACT_SELECTED_PLATFORM_MATCH = PASS
ALTERNATE_TAG_DIGEST_PLATFORM_SUBSTITUTION = 0
AUTHORIZED_PULL_ATTEMPT_COUNT = 1
RERUN_TO_GREEN_PULL_COUNT = 0
```

The former 004C1AM primary blocker is therefore resolved for this exact local Docker content-store state:

```text
EXACT_SELECTED_EMSDK_LINUX_AMD64_IMAGE_NOT_LOCAL = RESOLVED_BY_004C1AN_CANDIDATE
```

This statement is locality-specific and time-sensitive. Image garbage collection, Docker content-store reset, Docker Desktop changes, or any selected digest/platform change invalidates inherited local-presence assumptions and requires fresh reconciliation.

## 10. Explicit non-claims and successor boundary

004C1AN establishes only exact selected-image reacquisition and identity verification.

```text
FRESH_GUEST_KERNEL_MACHINE_LIBC_RECHECK = NOT_PERFORMED / NOT_AUTHORIZED
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

A successful merge of 004C1AN does not automatically authorize a container probe, rootfs extraction, apt executable inspection, APT simulation, provisioning, toolchain/PDFium execution, provider runtime, 004C2, 004D, or Specification 005. The next bounded unit must be derived from a fresh post-merge Issue #7 reconciliation.

## 11. Merge gates

004C1AN remains a candidate until all gates pass on one exact final head:

1. canonical `main` and zero-competing-successor-PR reread;
2. exact one-file surface verification;
3. `git diff --check` equivalent whitespace validation;
4. exact-head provider/check accounting;
5. fresh independent substantive exact-head review;
6. forward-only repair of every material finding;
7. zero unresolved material review threads;
8. immediate premerge base/head/open-PR race proof;
9. guarded normal merge using the exact reviewed `expected_head_sha`;
10. mechanical post-merge tree/parent/signature/surface verification;
11. fresh Issue #7 successor reconciliation before any new execution authority is inferred.
