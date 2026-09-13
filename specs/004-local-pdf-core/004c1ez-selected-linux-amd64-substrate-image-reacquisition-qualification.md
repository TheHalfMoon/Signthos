# 004C1EZ Selected linux/amd64 Substrate Image Reacquisition Qualification

Status: `QUALIFICATION_CANDIDATE / EXACT_DIGEST_REACQUISITION_COMPLETE / ZERO_CONTAINER_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Authority source: `github:issue-comment:5655591544`

## 1. Authority and scope

This record implements only `004C1EZ_SELECTED_LINUX_AMD64_SUBSTRATE_IMAGE_REACQUISITION_QUALIFICATION`. It restores local availability of the exact previously qualified linux/amd64 Emscripten image by immutable digest and verifies its local descriptor, platform, and config binding without creating or executing a container.

```text
CANONICAL_BASE = 0ac59c4eea451ce0cee5a6a1cbfe712f97df5292
CANONICAL_BASE_TREE = b25323122400f293e102e0cf45b08e134f183485
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_IMAGE_MANIFEST_SHA256 = c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_IMAGE_CONFIG_SHA256 = 6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
TARGET_PLATFORM = linux/amd64
AUTHORIZED_PULL_ATTEMPTS = 1
AUTHORIZED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ez-selected-linux-amd64-substrate-image-reacquisition-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
```

## 2. Fresh evidence lineage

A fresh external evidence root was created for this bounded unit. Only its basename is committed here.

```text
EVIDENCE_ROOT_LABEL = 004c1ez-selected-image-reacquisition-20260913T193604Z
EVIDENCE_DATA_FILES = 11
EVIDENCE_MANIFEST_TSV_SHA256 = ebe9c37ace54c66ec5d7282b32a908550950f2586f0e9d13d331c47ea3005ae7
SUMMARY_JSON_SHA256 = 48598693191467ed0517394b09a39df9a84b44f9e8f8d1a1dde236cd006c9cc2
PULL_ARGV_JSON_SHA256 = aae06824c4710a69bb6f419742633802066c91bb952a984e3ee411fdd430a39f
PULL_STDOUT_SHA256 = 7fab20cf1e9d21e792d7a096edfb87b1ccc40ca45d66460e4b7d5c5840ec04bf
PULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
POST_IMAGE_INSPECT_JSON_SHA256 = c56877cbdd96c5caa04b4f2b8613e1ed01f65771c9ba3d11645b9d9dc1e2f4a7
LOCAL_SAVE_MANIFEST_JSON_SHA256 = be61e0b4a918858ee6e953581fee3d58f431137bcb47ef4db977093a74d34127
```

## 3. Pre-acquisition state and exact pull

Immediately before the authorized pull, exact-digest local image inspection failed and established that the selected image was not present in the local Docker content store. The current Docker server is Linux on arm64; no ambient host architecture is treated as a substitute for the required linux/amd64 guest.

Exactly one pull invocation was executed:

```text
PULL_ATTEMPT_COUNT = 1
PULL_PLATFORM = linux/amd64
PULL_REFERENCE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
PULL_EXIT = 0
PULL_REPORTED_DIGEST = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
PULL_STDERR_BYTES = 0
```

No retry or alternate reference was used.

## 4. Local immutable image identity

Post-pull read-only inspection established:

```text
LOCAL_DOCKER_INSPECT_ID = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
LOCAL_DESCRIPTOR_DIGEST = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
LOCAL_REPOSITORY_DIGEST = emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
LOCAL_IMAGE_OS = linux
LOCAL_IMAGE_ARCHITECTURE = amd64
LOCAL_IMAGE_SIZE_BYTES = 720592460
LOCAL_LAYER_COUNT = 5
```

The current containerd-backed Docker inspection surface reports `.Id` equal to the selected manifest digest. This value is retained only as `LOCAL_DOCKER_INSPECT_ID`; it is not treated as the image config identity. The local descriptor and repository digest match the exact canonical immutable manifest identity, and the selected platform is exactly linux/amd64. The config identity is established separately from the local save manifest below.

## 5. Local config binding

No remote manifest lookup was required after the exact pull. A local `docker image save` stream was read only far enough to retain its small manifest record; no image was loaded, built, mutated, or executed. The local save manifest binds the image to:

```text
LOCAL_CONFIG_REFERENCE = blobs/sha256/6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
LOCAL_CONFIG_DIGEST = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
EXPECTED_CONFIG_DIGEST_MATCH = PASS
LOCAL_MANIFEST_LAYER_COUNT = 5
```

This reproduces the canonical config digest established by the earlier selected-image qualifications.

## 6. Prohibited execution and mutation proof

004C1EZ did not create or execute a Docker container and did not run the retained project toolchain or any package-management/runtime surface.

```text
DOCKER_IMAGE_PULL_ATTEMPTS = 1
DOCKER_IMAGE_BUILD = 0
DOCKER_IMAGE_LOAD = 0
DOCKER_CONTAINER_CREATE = 0
DOCKER_CONTAINER_EXECUTION = 0
NODE_EXECUTION = 0
PNPM_EXECUTION = 0
COREPACK_EXECUTION = 0
RESOLVER_EXECUTION = 0
PROJECT_DEPENDENCY_NETWORK_REQUESTS = 0
DEPENDENCY_MATERIALIZATION = 0
NODE_MODULES_CREATION = 0
PACKAGE_LIFECYCLE_OR_BUILD_EXECUTION = 0
PROVIDER_OR_PDF_RUNTIME_EXECUTION = 0
REPOSITORY_MUTATION_FROM_IMAGE_REACQUISITION = 0
```

No package/workspace/lockfile/.npmrc/provenance/source/workflow/fixture/database/deployment surface changed.

## 7. Qualification result and successor boundary

```text
004C1EZ_EXACT_DIGEST_REACQUISITION = PASS
EXACT_SELECTED_LINUX_AMD64_IMAGE_LOCALITY = PASS
EXACT_SELECTED_MANIFEST_MATCH = PASS
EXACT_SELECTED_CONFIG_BINDING_MATCH = PASS
EXACT_SELECTED_PLATFORM_MATCH = PASS
ALTERNATE_TAG_OR_DIGEST_SUBSTITUTION = 0
GUEST_SUBSTRATE_EXECUTION_AUTHORITY = ABSENT
MATERIALIZATION_ATTEMPT_AUTHORITY = ABSENT
DEPENDENCY_MATERIALIZATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

This qualification restores only the exact selected image locality and immutable identity. It does not itself authorize a guest substrate probe or dependency materialization. Any successor execution requires fresh Issue #7 reconciliation after exact-head independent substantive review, guarded merge, and mechanical post-merge verification of this unit.
