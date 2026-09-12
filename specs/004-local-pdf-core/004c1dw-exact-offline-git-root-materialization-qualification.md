# 004C1DW — Exact Offline Git Root Materialization Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_EXACT_OFFLINE_GIT_ROOT_MATERIALIZATION / TWO_BYTE_IDENTICAL_SUCCESS_REPLAYS / TWO_PRESERVED_FAIL_CLOSED_ATTEMPTS`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `e32aff043bc28668897d9f50033b7fc817bf34d5`
Runtime authority: `github:issue-comment:5646964817`
Repair authority 1: `github:issue-comment:5646994091`
Repair authority 2: `github:issue-comment:5647011961`
Closeout and repository authority: `github:issue-comment:5647097950`

## 1. Purpose and authority boundary

Canonical 004C1DV closed deterministic offline materialization of all eight admitted GCS objects. Canonical 004C1DS had already frozen the exact 33 admitted Git selector roots and their commit/tree identities. 004C1DW closes the narrower Git-root materialization prerequisite only: reconstruct those 33 exact source trees from retained local Git object stores inside isolated offline Linux containers, without source execution, hooks, submodule recursion, `gclient`, CIPD, GCS operations, or network transport.

```text
004C1DW_AUTHORITY = EXACT_OFFLINE_GIT_ROOT_MATERIALIZATION_QUALIFICATION_ONLY
CANONICAL_BASE = e32aff043bc28668897d9f50033b7fc817bf34d5
AUTHORIZED_GIT_ROOTS = 33
SUCCESSFUL_REPLAYS_REQUIRED = 2
SUCCESSFUL_REPLAYS_COMPLETED = 2
PRESERVED_FAILED_ATTEMPTS = 2
NETWORK_REQUESTS = 0
HOST_MOUNTS = 0
SUBMODULE_OPERATIONS = 0
HOOK_EXECUTIONS = 0
PAYLOAD_EXECUTIONS = 0
GCLIENT_EXECUTIONS = 0
GCS_OPERATIONS = 0
CIPD_OPERATIONS = 0
PDFIUM_BUILD_OR_RUNTIME = 0
WAIVER = NO
```

This qualification does not claim a complete PDFium workspace, `gclient` equivalence, build success, runtime success, release readiness, deployment readiness, or project completion.

## 2. Canonical predecessor truth

The immediate predecessor is canonical 004C1DV:

```text
004C1DV = CLOSED_CANONICAL
004C1DV_PR = #215
004C1DV_REVIEWED_HEAD = 4f23214b4949828f665e26ff1218a8a4ca82b8f0
004C1DV_REVIEWED_TREE = c10173e04e8d2365f6375323db866ce467b35273
004C1DV_MERGE = e32aff043bc28668897d9f50033b7fc817bf34d5
004C1DV_MERGE_TREE = c10173e04e8d2365f6375323db866ce467b35273
004C1DV_MERGE_PARENTS = 8432d93ceab78b2fa4ea9595fc65b14383494484 4f23214b4949828f665e26ff1218a8a4ca82b8f0
004C1DV_MERGE_SIGNATURE = VERIFIED_VALID
POST_MERGE_WORKFLOW_RUNS = 0
POST_MERGE_OPEN_PR_FRONTIER = 0
```

## 3. Frozen root identity set

`IDENTITY_MANIFEST_SHA256 = 93f4a24dba8cd5cb1dd33685bc47b738059a85f8f65fde6e8ce683bb6405fe89`

| # | Logical path | Exact revision | Exact tree |
| ---: | --- | --- | --- |
| 1 | `base/allocator/partition_allocator` | `baaa6670c23c19485d0a5a538bc43d3332def328` | `acd2c22d095e6674927b11a6b6d3437d67adf62a` |
| 2 | `build` | `06d247cb917bb5fac3103b1b7dccb75368a553ce` | `e01b69d7c03521219d8b95e0e5b49af18be45c5d` |
| 3 | `buildtools` | `6a18683f555b4ac8b05ac8395c29c84483ac9588` | `8a36f872e24a56fe517682e14bc897ceb28f8058` |
| 4 | `testing/corpus` | `e64acd24f00d365c3f7c60e9c4eff16ce2d71f5d` | `2d942d7a1a6819c2365bd28c3293b996191f8699` |
| 5 | `third_party/abseil-cpp` | `675d3d37ecbec78fd51378c6774c45715b1e4382` | `ca62252c27724e8ad8fe91d70807c700c6069f86` |
| 6 | `third_party/brotli` | `ac16a36bc55c4c896135084e878f0d6a2f9b347e` | `0c85090ba747c2548f3ac785db123bd795abdeb7` |
| 7 | `third_party/clang-format/script` | `c2725e0622e1a86d55f14514f2177a39efea4a0e` | `5117026e03ac0ec21b1c163738d26a7c9443f611` |
| 8 | `third_party/depot_tools` | `6235028c6b18b73e68f5414f935ec537a25ea51a` | `0b08d0dbc2f75f2b44fb0b46ae7133e9bceb9e44` |
| 9 | `third_party/dragonbox/src` | `beeeef91cf6fef89a4d4ba5e95d47ca64ccb3a44` | `176383f02746d0248e7b04409367f691cc231cef` |
| 10 | `third_party/fast_float/src` | `cb1d42aaa1e14b09e1452cfdef373d051b8c02a4` | `7138c095baadd3caa9f4cbae2b6effb643f22454` |
| 11 | `third_party/fp16/src` | `3d2de1816307bac63c16a297e8c4dc501b4076df` | `052b1ec2fb66e4f709ecbdc11dd43c2bfb979f32` |
| 12 | `third_party/freetype/src` | `b91f75bd02db43b06d634591eb286d3eb0ce3b65` | `84a6fa6276a41ebff796b2b16fd217e867b0c8bd` |
| 13 | `third_party/googletest/src` | `4fe3307fb2d9f86d19777c7eb0e4809e9694dde7` | `feafbf9cf5deeb64dbe983f5574cb50f96fc330b` |
| 14 | `third_party/harfbuzz-ng/src` | `fa2908bf16d2ccd6623f4d575455fea72a1a722b` | `c2cd3655b841dfcf6ca2806dacc1217298bada3b` |
| 15 | `third_party/highway/src` | `84379d1c73de9681b54fbe1c035a23c7bd5d272d` | `afb7cf05e253a76cfc1e9bd8975a979fa865d113` |
| 16 | `third_party/icu` | `a86a32e67b8d1384b33f8fa48c83a6079b86f8cd` | `73b9cb2be837165ec31f9512bec2577255b825eb` |
| 17 | `third_party/instrumented_libs` | `e8cb570a9a2ee9128e2214c73417ad2a3c47780b` | `651502f72d94a6c75baf64edb2090a894af13d63` |
| 18 | `third_party/jinja2` | `c3027d884967773057bf74b957e3fea87e5df4d7` | `b1ced381d7e8c813f62afc3be3026da78800409c` |
| 19 | `third_party/libc++/src` | `7ab65651aed6802d2599dcb7a73b1f82d5179d05` | `2d0b4c55fd2fd81d53a11a54f10424e60b4e954e` |
| 20 | `third_party/libc++abi/src` | `8f11bb1d4438d0239d0dfc1bd9456a9f31629dda` | `63eed58f0937ba832a2195cd848f9f53ef8ecea9` |
| 21 | `third_party/libjpeg_turbo` | `6bb85251a8382b5e07f635a981ac685cc5ab5053` | `402c2a97c8296e75ab702aa137b7b5d5d4faafb6` |
| 22 | `third_party/libpng` | `172f83835c98264e6eefdbe8ae82dc08be337ad0` | `615deb4d13aa95080f11030afcf2eebf17dd43b4` |
| 23 | `third_party/llvm-libc/src` | `603c242115079d3a208638a6e56f842c0801d0bd` | `b4f9a04628d3fe9de5ca34e2684e7f54701ad7cc` |
| 24 | `third_party/markupsafe` | `4256084ae14175d38a3ff7d739dca83ae49ccec6` | `8c1f275c5022de6417bf43377c671b44d7a474d6` |
| 25 | `third_party/nasm` | `af5eeeb054bebadfbb79c7bcd100a95e2ad4525f` | `1c758a0853e56e755cc16fa081314c24888435e1` |
| 26 | `third_party/simdutf` | `f7356eed293f8208c40b3c1b344a50bd70971983` | `6123564324038cf176c37fbd3dfac2bbee1deb32` |
| 27 | `third_party/skia` | `c497e689bf3db5c8efe853dae45dd61867d3363a` | `1767c5d85a6b00262b76864728f4cefaa65be928` |
| 28 | `third_party/test_fonts` | `7f51783942943e965cd56facf786544ccfc07713` | `7d8a8ab400ae28ff251c0feaf7116693b7e5ae5d` |
| 29 | `third_party/zlib` | `980253c1cc835c893c57b5cfc10c5b942e10bc46` | `610b2b5c40379696b6920fa8573d0652b1a6e830` |
| 30 | `tools/clang` | `a1542f2952bcc47640d5cfbc39bb8f6926a1bf6a` | `5f6eb766609b9c3e2062e28ff581e53800c5b4db` |
| 31 | `tools/code_coverage` | `fc75c61d3a98a78ff83940366aeba83ddeb28179` | `39d72b61c7db2b6a4a4965645bf33fa1238aaf04` |
| 32 | `tools/memory` | `16429092be4bb5160bed0ad763bd4c13f1f52990` | `3335d7f6fceaee7584cc674fd7efcc9c9c1bc512` |
| 33 | `v8` | `b3995dff9fc0df19d00743da41a567da5eb8318c` | `6fab8283d790ea54c5c34479458cd33cd7eaad7d` |

All 33 retained local source repositories were revalidated before replay: exact `HEAD`, exact tree OID, clean status, and silent successful `git fsck`. No branch, tag, moving ref, alternate origin, network fetch, or nested repository discovery expanded the set.

## 4. Attempt history and forward-only repairs

The first two fresh containers failed closed at the first local-path fetch before any source checkout completed. Both failures are preserved in the repository-visible evidence bundle and compressed Docker diffs.

```text
ATTEMPT_1_RESULT = FAIL_CLOSED_BEFORE_ANY_SOURCE_CHECKOUT
ATTEMPT_1_MATERIALIZER_SHA256 = 94936d22fff9f93601bd92a2da77661a00a9856791ae257b30b2e01df4073ec7
ATTEMPT_1_EXIT = 1
ATTEMPT_1_ERROR = GIT_DUBIOUS_OWNERSHIP_AT_FIRST_LOCAL_PATH_FETCH
ATTEMPT_1_SUCCESSFUL_SOURCE_CHECKOUTS = 0

ATTEMPT_2_RESULT = FAIL_CLOSED_BEFORE_ANY_SOURCE_CHECKOUT
ATTEMPT_2_MATERIALIZER_SHA256 = e859387604ef9173f1ebb42a65434dc0f74f3f0ee693abaa0a29b5d685e02e95
ATTEMPT_2_EXIT = 1
ATTEMPT_2_ERROR = GIT_DUBIOUS_OWNERSHIP_AT_FIRST_LOCAL_PATH_FETCH
ATTEMPT_2_SUCCESSFUL_SOURCE_CHECKOUTS = 0
```

The first repair attempted exact per-repository `safe.directory` entries through process-local Git configuration; Git local upload-pack still rejected the copied object stores. The second repair moved the same exact 33-path allowlist into an isolated protected Git global configuration file inside each fresh container. No wildcard `safe.directory=*`, `chown`, `chmod`, source-byte mutation, or host/user Git config was used.

```text
SUCCESS_MATERIALIZER_SHA256 = 27d8c87585623e6086a3c37073b023feb7a3c3fb89a4584f74160d59f82b9de5
SUCCESS_GUEST_MANIFEST_SHA256 = 6daf9fc8c9e7c9fccc6e791c4ce9a31901d7bc3dee63a400e536e7231f9aa816
SAFE_DIRECTORY_ENTRIES = 33
SAFE_DIRECTORY_PATTERN = /tmp/repo-NN.git for NN=01..33 only
GIT_CONFIG_GLOBAL = /tmp/signthos-safe.gitconfig
GIT_CONFIG_NOSYSTEM = 1
SAFE_DIRECTORY_WILDCARD = NO
SOURCE_OBJECT_STORE_MUTATION = 0
```

## 5. Exact successful replay boundary

Both successful replays used fresh containers and the exact previously-qualified builder image:

```text
BUILDER_IMAGE_ID = sha256:ebc4a9202a97820ac8f8780c8e7b89d51952f5ed512a898c52a8576cd38924b4
BUILDER_OS = linux
BUILDER_ARCHITECTURE = amd64
PLATFORM = linux/amd64
NETWORK_MODE = none
HOST_MOUNTS = 0
ENTRYPOINT = /bin/sh
INPUT_TRANSPORT = docker cp before first start
WORKSPACE_ROOT = /work/git
```

Each replay copied only the 33 prevalidated `.git` object stores plus the same materializer and manifest bytes before first start. Local Git transport was explicitly enabled only for those copied paths. Every materialized checkout set `core.hooksPath=/dev/null`, `submodule.recurse=false`, and `core.autocrlf=false`, then verified exact detached `HEAD`, exact tree OID, clean status, and zero active hooks.

## 6. Successful replay result

```text
REPLAY1_RESULT = PASS
REPLAY2_RESULT = PASS
REPLAY1_EXIT = 0
REPLAY2_EXIT = 0
REPLAY1_STDERR_BYTES = 0
REPLAY2_STDERR_BYTES = 0
ROOTS = 33 / 33
INVENTORY_ROWS = 79207
INVENTORY_SHA256 = 6c4aad82de96c38ad14afb6bc8766a8e0f18f8d9f9a0fc1db4f63527cd887989
FILES = 73327
DIRS = 5874
SYMLINKS = 6
REGULAR_FILE_BYTES = 1295110068
INVENTORIES_BYTE_IDENTICAL = PASS
SUMMARIES_BYTE_IDENTICAL = PASS
ALL_33_HEADS_EXACT = PASS
ALL_33_TREES_EXACT = PASS
ALL_33_STATUS_CLEAN = PASS
ACTIVE_HOOKS = 0
```

## 7. Explicit special-tree boundaries

The canonical FreeType tree contains one Gitlink at `third_party/freetype/src/subprojects/dlg`. 004C1DW did not acquire or recurse into that submodule. The checkout semantics produced and verified that path as an empty directory only.

```text
FREETYPE_GITLINK_EMPTY_DIRECTORY = PASS
FREETYPE_SUBMODULE_ACQUISITION = 0
```

The canonical Skia tree contains the previously-qualified symlink. Both successful replays preserved it as a symlink with the exact target:

```text
SKIA_SYMLINK_PATH = third_party/skia/src/ports/fontations/Cargo.toml
SKIA_SYMLINK_TARGET = ../../../bazel/external/fontations/Cargo.toml
```

## 8. Prohibited-activity accounting

Both successful replay summaries record:

```text
NETWORK_REQUESTS = 0
SUBMODULE_OPERATIONS = 0
HOOK_EXECUTIONS = 0
PAYLOAD_EXECUTIONS = 0
GCLIENT_EXECUTIONS = 0
GCS_OPERATIONS = 0
CIPD_OPERATIONS = 0
```

The container boundary independently denied network access with `NetworkMode=none` and zero host mounts. Docker diffs for both successful replays are confined to `/tmp` and `/work`.

## 9. Repository-visible evidence

The qualification publishes the attempt history and merge-critical replay evidence directly in Git. No acquired source repository or materialized source tree is committed.

| Repository evidence file | Bytes | SHA-256 | Raw bytes | Raw SHA-256 | Raw lines |
| --- | ---: | --- | ---: | --- | ---: |
| `004c1dw-evidence-bundle.json` | 66749 | `e9f221cc919342075e7bdeff818b9999c3d17cb0130cd0c46483be2a8ab83fc9` | — | — | — |
| `004c1dw-failed1-docker-diff.txt.gz` | 15925 | `ea79d72d5142a338bc6c758a377ea675b6d6cfc118e04327e30a227fc2a79d1a` | 81471 | `e49ac3d6a8457d9b4c565348a6697695c57ce526db170775e42e31a0e2c4c460` | 1891 |
| `004c1dw-failed2-docker-diff.txt.gz` | 15967 | `a5d4b5944a09c64be02c12985cf7edb70d9d3228cd4de0c5c4e4d4736c1cac8d` | 81474 | `44353dc06057ec17f534ddf7e857eba363da36a9caea44361714cec586ce2c20` | 1891 |
| `004c1dw-success1-docker-diff.txt.gz` | 515920 | `ff77e7c9321ff4ac73d5aaf675807a6637d81cfc5aa5a87b1a736dc318e6247d` | 5947831 | `7a9ef3af68d44ce18ef7a0451af9cdcacbcd1560e90c9452319d3adaaf12880c` | 82885 |
| `004c1dw-success1-inventory.jsonl.gz` | 3729129 | `beb2462ca27ca5e1d8fd39e5a07215580bee54e684cc6b0b5718018bb8e0b1c3` | 14381334 | `6c4aad82de96c38ad14afb6bc8766a8e0f18f8d9f9a0fc1db4f63527cd887989` | 79207 |
| `004c1dw-success2-docker-diff.txt.gz` | 514661 | `e86b0b7809692d869c490677c58d0397682d4870a5ec2e1333bd3af5a334e628` | 5947831 | `e60e1393878f0020446cc8de6034ca7b35fefea79eac93476a280dec29d6d241` | 82885 |
| `004c1dw-success2-inventory.jsonl.gz` | 3729129 | `beb2462ca27ca5e1d8fd39e5a07215580bee54e684cc6b0b5718018bb8e0b1c3` | 14381334 | `6c4aad82de96c38ad14afb6bc8766a8e0f18f8d9f9a0fc1db4f63527cd887989` | 79207 |

The two compressed success inventories are byte-identical. Independent decompression reproduces exact raw inventory SHA-256 `6c4aad82de96c38ad14afb6bc8766a8e0f18f8d9f9a0fc1db4f63527cd887989`. Secret/token scanning over the published evidence set found zero findings.

## 10. What 004C1DW establishes

```text
004C1DW_RESULT = PASS_EXACT_OFFLINE_GIT_ROOT_MATERIALIZATION
CURRENT_ADMITTED_TOP_LEVEL_GIT_SELECTOR_ROOTS_MATERIALIZED = 33 / 33
GIT_ROOT_MATERIALIZATION_IDENTITY_GAP = CLOSED
DETERMINISTIC_SUCCESS_REPLAY = PASS
FAILED_ATTEMPTS_PRESERVED = 2
WAIVER = NO
```

This establishes a deterministic, offline, exact-identity materialization primitive for the currently admitted Git dependency roots. It does not establish combined workspace assembly or the correctness of overlaying these roots with the PDFium root, GCS materialization, or CIPD deployments.

## 11. Explicit non-grants

004C1DW does **not** authorize or establish:

- `gclient` execution or equivalence;
- combined PDFium workspace assembly;
- PDFium root materialization replay;
- GCS replay or CIPD deployment replay;
- submodule acquisition or recursion;
- hook or toolchain execution;
- GN/Ninja/PDFium configuration or build execution;
- PDFium runtime/provider execution;
- 004C2 or 004D authority;
- Specification 005 authority;
- release or deployment readiness;
- project completion;

## 12. Merge discipline

This document becomes canonical only after exact final base/head/tree/eight-path verification, truthful workflow/check/provider accounting, fresh independent substantive exact-head review, forward-only repair of every material finding, zero unresolved material review threads, immediate premerge race verification, guarded normal merge using exact `expected_head_sha`, mechanical post-merge proof, and fresh Issue #7 reconciliation.

Bot summaries, automatic skip statuses, reactions, billing blocks, reviewer-request state, and unavailable checks are not substantive review evidence.

## 13. Successor boundary

004C1DW does not authorize its successor. After canonical merge, Issue #7 must choose the smallest remaining materialization/assembly prerequisite from live truth. Combined workspace assembly, PDFium configuration, and build execution must not be inferred from this qualification.
