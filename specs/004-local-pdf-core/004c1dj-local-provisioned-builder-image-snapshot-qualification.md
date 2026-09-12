# 004C1DJ — Local Provisioned Builder Image Snapshot Qualification

Status: `QUALIFICATION_CANDIDATE / EXACT_ONE_LOCAL_IMAGE_SNAPSHOT / ZERO_EXECUTION_IN_THIS_DOCUMENT_UNIT`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `d582f068bc29fb3cdf48c0f0b59ac6f17a36fe92`
Canonical base tree: `8866232677b6bab36533b154fbf0bc5aceb1b791`
004C1DI/004C1DJ authority and repair: `github:issue-comment:5642368051`
004C1DJ runtime closeout and document authority: `github:issue-comment:5642388827`

## 1. Purpose and authority boundary

004C1DH established one exact successful offline package-provisioning execution inside one stopped container. It deliberately did not create a reusable builder image. 004C1DJ preserves that exact stopped filesystem state as one local Docker image snapshot so later qualification work can bind a stable local image identity without silently authorizing another package-provisioning attempt.

This repository-document unit records already-completed evidence only. It performs no Docker, container, package, network, toolchain, source, PDFium, provider, or PDF runtime execution.

```text
004C1DJ_AUTHORITY = EXACT_ONE_STOPPED_PROVISIONED_CONTAINER_LOCAL_IMAGE_SNAPSHOT
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1dj-local-provisioned-builder-image-snapshot-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
DOCKER_COMMIT_BUDGET = 1
DOCKER_COMMITS_CONSUMED = 1
SECOND_COMMIT = NOT_AUTHORIZED
RUNTIME_EXECUTION_IN_THIS_DOCUMENT_UNIT = 0
CONTAINER_START_RESTART_EXEC = NOT_AUTHORIZED
SECOND_PACKAGE_PROVISIONING_ATTEMPT = NOT_AUTHORIZED
NETWORK = NOT_AUTHORIZED
IMAGE_PULL_PUSH_TAG_REMOVE = NOT_AUTHORIZED
DOCKER_PRUNE_RESET = NOT_AUTHORIZED
TOOLCHAIN_SOURCE_PDFIUM_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
WAIVER = NO
```

## 2. Canonical predecessor truth

```text
004C1DH = CLOSED_CANONICAL
004C1DH_PR = #202
004C1DH_MERGE = d582f068bc29fb3cdf48c0f0b59ac6f17a36fe92
004C1DH_MERGE_TREE = 8866232677b6bab36533b154fbf0bc5aceb1b791
004C1DH_PACKAGE_PROVISIONING_PASS = TRUE
004C1DH_ATTEMPTS_CONSUMED = 1
004C1DH_ATTEMPTS_REMAINING = 0
004C1DH_SOURCE_CONTAINER = 54a2dbb9955fa7bfab9054bc681b2db015b417a190c639e9f79ebfd348c6a105
```

The source container completed Stage A, Stage B, and Stage C with exact canonical installed-package identities and remained stopped after successful execution.

## 3. Source container identity before preservation

```text
SOURCE_CONTAINER_ID = 54a2dbb9955fa7bfab9054bc681b2db015b417a190c639e9f79ebfd348c6a105
SOURCE_CONTAINER_NAME = signthos-004c1dd-replacement-attempt1
SOURCE_BASE_IMAGE = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SOURCE_RUNNING = false
SOURCE_EXIT_CODE = 0
SOURCE_OOM_KILLED = false
SOURCE_ERROR = <empty>
SOURCE_NETWORK_MODE = none
SOURCE_MOUNTS = 0
SOURCE_STARTED = 2026-09-12T00:27:35.833697211Z
SOURCE_FINISHED = 2026-09-12T00:31:25.014219054Z
SOURCE_PATH = /bin/sh
```

The source container was never restarted or executed for snapshot preservation.

## 4. 004C1DI fail-closed precommit history

The first preservation authority, 004C1DI, required fresh raw `docker inspect` bytes to equal the qualification-time raw inspect bytes exactly. That gate failed before any commit operation.

```text
004C1DI_DOCKER_COMMITS_CONSUMED = 0
004C1DI_COMMITTED_IMAGE = NONE
QUALIFICATION_INSPECT_SHA256 = 5b727aad984325d5d6cf9fc7043c0adcf8940f2e64e54eaef42ac5bd172f7279
004C1DI_FRESH_RAW_INSPECT_SHA256 = 20439d28eed09c0858cf1e161eb8f5a6abe45f8147d3dd464f9b2e85ca4725ec
```

Recursive comparison found exactly one raw representation difference:

```text
[0].HostConfig.Dns: null -> []
```

No other inspect field changed. The container remained `NetworkMode=none` and the normalized filesystem-diff set remained exact. 004C1DI did not waive the failed gate; it closed fail-closed with zero snapshot commits consumed.

## 5. Forward-only semantic inspect repair

004C1DJ authorized exactly one narrow normalization: interpret `HostConfig.Dns` null and empty list as the same empty DNS override set, while preserving all other inspect fields exactly.

Both qualification-time and fresh records normalize to:

```text
NORMALIZED_INSPECT_JSON_BYTES = 33260
NORMALIZED_INSPECT_SHA256 = 9f6f543e33dded8253468d30671664761960df6a8b9a7503851e4d08672c3e67
ALL_OTHER_INSPECT_FIELDS_EQUAL = TRUE
```

The filesystem-diff comparison independently proves no path-set drift:

```text
QUALIFIED_DIFF_LINES = 44677
FRESH_DIFF_LINES = 44677
NORMALIZED_DIFF_SHA256 = 74ca8932b3f9857430e3e5417d0d53fd86516728f4225f4d33ff624200275a01
OLD_ONLY = 0
NEW_ONLY = 0
NORMALIZED_DIFF_SET_EQUAL = PASS
```

## 6. Exact snapshot action

After immediate GitHub and local gates passed, exactly one command class was executed:

```text
docker commit 54a2dbb9955fa7bfab9054bc681b2db015b417a190c639e9f79ebfd348c6a105
```

No repository/tag argument and no `--change`, `--author`, or `--message` flag was supplied.

```text
PRECOMMIT_HOST_FREE_KB = 36538800
PRECOMMIT_GATE = PASS
DOCKER_COMMITS_CONSUMED = 1
SECOND_COMMIT_AUTHORIZED = FALSE
```

## 7. Exact local image snapshot identity

```text
SNAPSHOT_IMAGE_ID = sha256:ebc4a9202a97820ac8f8780c8e7b89d51952f5ed512a898c52a8576cd38924b4
SNAPSHOT_PARENT = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SNAPSHOT_CREATED = 2026-09-12T01:01:04.151030503Z
SNAPSHOT_ARCHITECTURE = amd64
SNAPSHOT_OS = linux
SNAPSHOT_SIZE_BYTES = 1378457022
SNAPSHOT_REPO_TAGS = []
SNAPSHOT_REPO_DIGESTS = []
SNAPSHOT_WORKING_DIR = /src
SNAPSHOT_ROOTFS_TYPE = layers
SNAPSHOT_ROOTFS_LAYER_COUNT = 6
```

The image ID is Docker's content identity for the image config. This qualification does not claim that a second Docker commit would reproduce the same image ID or created timestamp.

## 8. RootFS DiffID binding

Exact ordered RootFS DiffIDs:

```text
0 sha256:2573e0d8158209ed54ab25c87bcdcb00bd3d2539246960a3d592a1c599d70465
1 sha256:cda677916487ddbbb6e47b65bf860d988cfcd69d53f32260b55cec6f2c4e5086
2 sha256:a89cd2ce10250e9e4ff6955c798ff27a1051eacd4b443bc81051a38e779a7733
3 sha256:af363988ef20e590c4995923f6566ca5012887bc8c42d9c64cab1e55b58eabe9
4 sha256:fdfce864fd5f062670cc90a37f9eea85b13ecc4d9fa7caf940f8a27d1dfa413c
5 sha256:a05e9990a507c83e7fc54fc600df83411c79524194c5c539f14c3f9fc88aa828
```

The sixth DiffID is the preservation layer created from the exact successful stopped container filesystem state. The first five are inherited from the selected immutable Emscripten base image.

```text
ROOTFS_JSON_BYTES = 473
ROOTFS_JSON_SHA256 = 670e74078562a5189d321e8ec535e51a7afa52850b8628bba4733fa4cd7fbf23
```

## 9. Image config and inherited command binding

No config rewrite occurred during commit. The snapshot therefore inherits the provisioning container's explicit `/bin/sh` entrypoint and guest command. That command is historical evidence only; this qualification does not authorize starting the image with that command.

```text
ENTRYPOINT = ["/bin/sh"]
ENTRYPOINT_JSON_BYTES = 12
ENTRYPOINT_JSON_SHA256 = 1cefc4ebdbe1fe7ca652a7c57ca07b267b9670be73bdd27f86b8440b4725d517
CMD_JSON_BYTES = 14399
CMD_JSON_SHA256 = 539177e9c99187162a9a04d991724304c1275ce466165e897760d93f433ea41b
CONFIG_JSON_BYTES = 15179
CONFIG_JSON_SHA256 = 2686b43c9307a06d18472eae0d3df4b88e6513ff37d99349dd5541aeed0db92e
ENV_COUNT = 7
WORKING_DIR = /src
```

A later execution unit must use an explicitly qualified command/entrypoint envelope. It must not accidentally re-run the historical provisioning guest script merely because the snapshot inherited it.

## 10. Post-snapshot source state

Docker commit did not require a source-container start. Post-snapshot read-only verification found the same source state:

```text
POST_SOURCE_RUNNING = false
POST_SOURCE_EXIT = 0
POST_SOURCE_OOM = false
POST_SOURCE_NETWORK = none
POST_SOURCE_MOUNTS = 0
POST_SOURCE_NORMALIZED_INSPECT_SHA256 = 9f6f543e33dded8253468d30671664761960df6a8b9a7503851e4d08672c3e67
POST_SOURCE_NORMALIZED_DIFF_SHA256 = 74ca8932b3f9857430e3e5417d0d53fd86516728f4225f4d33ff624200275a01
```

No claim is made about unobserved internal Docker implementation details. The externally bound source state did not change.

## 11. Evidence root

```text
HOST_EVIDENCE_ROOT = /private/tmp/signthos-004c1dj-snapshot-VElNSn
SNAPSHOT_SUMMARY_BYTES = 15927
SNAPSHOT_SUMMARY_SHA256 = 9e420c615115f0b4ff030d83aecea0eccf1bc684bec35458ad40cc9cf9da3676
EVIDENCE_FILE_COUNT = 15
EVIDENCE_INVENTORY_BYTES = 1387
EVIDENCE_INVENTORY_SHA256 = 71adcf4559debba16ddbd274583eec967962485deba082deb1ad3801d16a0015
IMAGE_INSPECT_BYTES = 17011
IMAGE_INSPECT_SHA256 = f2285ca1c3d6e8157b8377e83a3ef7b47c61cfde321ce60b27fb60d80c7612a9
```

The evidence root remains outside the Signthos repository. No image tar, layer blob, source tree, package archive, or container filesystem byte is committed by this document.

## 12. What this snapshot proves

004C1DJ establishes only:

1. the exact successful 004C1DH package-provisioned filesystem state was preserved once into a local content-addressed Docker image;
2. the exact local image ID, parent, architecture, OS, size, config identity, ordered RootFS DiffIDs and no-tag/no-digest state are bound;
3. the source stopped container remained semantically unchanged across the preservation action;
4. the first over-strict raw-inspect preflight failure remains preserved rather than rewritten as success.

## 13. Explicit non-claims

004C1DJ does **not** establish:

- reproducible Docker commit output;
- a redistributable or released builder image;
- registry provenance for the new local image;
- deterministic toolchain/source acquisition;
- depot_tools availability;
- gclient sync success;
- GN/Ninja/Clang acquired-byte identities;
- PDFium source checkout or build success;
- PDFium WASM/source equivalence;
- provider runtime behavior;
- 004C2, 004D, Specification 005, release, deployment or project completion.

## 14. Downstream non-grants

```text
SNAPSHOT_IMAGE_EXECUTION = NOT_AUTHORIZED
SNAPSHOT_IMAGE_TAG_OR_PUSH = NOT_AUTHORIZED
SECOND_DOCKER_COMMIT = NOT_AUTHORIZED
SOURCE_CONTAINER_START_RESTART_EXEC_REMOVE = NOT_AUTHORIZED
TOOLCHAIN_DEPOT_TOOLS_ACQUISITION = NOT_AUTHORIZED
TOOLCHAIN_DEPOT_TOOLS_EXECUTION = NOT_AUTHORIZED
GCLIENT_SYNC = NOT_AUTHORIZED
GN_NINJA_CLANG_ACQUISITION_OR_EXECUTION = NOT_AUTHORIZED
PDFIUM_SOURCE_ACQUISITION = NOT_AUTHORIZED
PDFIUM_BUILD_OR_LINK_EXECUTION = NOT_AUTHORIZED
PROVIDER_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE_OR_DEPLOYMENT = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
```

## 15. Merge gates

This candidate may merge only if:

1. canonical main remains `d582f068bc29fb3cdf48c0f0b59ac6f17a36fe92` until guarded merge;
2. exactly this one authorized qualification path changes;
3. the failed 004C1DI raw-inspect gate remains explicitly preserved;
4. the normalized inspect and normalized diff identities remain exact;
5. the one Docker commit and exact snapshot image identity remain bound without claiming reproducibility;
6. all six RootFS DiffIDs and image config identities remain exact;
7. zero runtime action occurs in this document unit;
8. exact diff accounting and `git diff --check` pass;
9. exact-head applicable CI/check state is accounted truthfully;
10. fresh independent substantive exact-head review reports no material finding;
11. any repair is forward-only and any changed head is freshly reviewed;
12. unresolved material review threads are zero;
13. immediate premerge base/head/frontier race proof passes;
14. guarded normal merge uses the exact reviewed head;
15. post-merge tree/parent/signature/path/blob verification passes;
16. fresh Issue #7 successor reconciliation occurs before any image execution, toolchain/source acquisition, PDFium build/runtime, 004C2, 004D or Specification 005 authority is inferred.

## 16. Successor rule

After canonical merge, fresh Issue #7 reconciliation must select the next smallest prerequisite from actual remaining evidence. The likely frontier is the exact execution envelope and acquired-byte closure for the already-selected PDFium build toolchain/source inputs. This document does not authorize that successor by implication.
