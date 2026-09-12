# 004C1DX — Exact Offline Combined PDFium Workspace Materialization Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_TWO_BYTE_IDENTICAL_SUCCESS_REPLAYS / ONE_PRESERVED_FAIL_CLOSED_ATTEMPT`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `d2300b8a99c0e5a7629377acb6948b6f5a9b9110`
Runtime authority: `github:issue-comment:5647458005`
Pre-runtime correction: `github:issue-comment:5647491294`
Forward-only repair authority: `github:issue-comment:5647633761`
Repaired materializer freeze: `github:issue-comment:5647642202`
Closeout and repository authority: `github:issue-comment:5647782239`

## 1. Purpose and authority boundary

Canonical 004C1DW closed exact offline materialization of the 33 admitted Git roots. Earlier canonical units separately qualified the exact PDFium root, six CIPD package bodies plus the pinned CIPD client, and eight GCS objects. 004C1DX closes the next narrower prerequisite only: assemble those already-qualified inputs into one exact PDFium workspace inside isolated offline Linux containers and prove deterministic replay without source, hook, submodule, toolchain, build, or PDF runtime execution.

```text
004C1DX_AUTHORITY = EXACT_OFFLINE_COMBINED_PDFIUM_WORKSPACE_MATERIALIZATION_QUALIFICATION_ONLY
CANONICAL_BASE = d2300b8a99c0e5a7629377acb6948b6f5a9b9110
BUILDER_IMAGE = sha256:ebc4a9202a97820ac8f8780c8e7b89d51952f5ed512a898c52a8576cd38924b4
SUCCESSFUL_REPLAYS_REQUIRED = 2
SUCCESSFUL_REPLAYS_COMPLETED = 2
PRESERVED_FAILED_ATTEMPTS = 1
NETWORK_MODE = none
HOST_MOUNTS = 0
WAIVER = NO
```

This qualification does not establish `gclient` equivalence, configuration success, build success, runtime/provider success, release readiness, deployment readiness, or project completion.

## 2. Canonical predecessor truth

The immediate canonical predecessor is 004C1DW:

```text
004C1DW = CLOSED_CANONICAL
004C1DW_PR = #217
004C1DW_REVIEWED_HEAD = 34bdc6f893c240c301d820da2cb8595fb30fa0fb
004C1DW_MERGE = d2300b8a99c0e5a7629377acb6948b6f5a9b9110
004C1DW_MERGE_TREE = 4e00f0dce38622e74baa064870e00c515990ebba
004C1DW_MERGE_PARENTS = e32aff043bc28668897d9f50033b7fc817bf34d5 34bdc6f893c240c301d820da2cb8595fb30fa0fb
004C1DW_MERGE_SIGNATURE = VERIFIED_VALID
POST_MERGE_OPEN_PR_FRONTIER = 0
```

## 3. Frozen combined input set

The successful replays used the same exact inputs and the same frozen manifest:

```text
INPUT_MANIFEST_SHA256 = 008d33f17370fb1273c992591758e3475f2520cfd0af238f9279691daeb016e4
REPAIRED_MATERIALIZER_SHA256 = b6b39bdd3a42b70ecd6d800c8511607a2e37fd80d2f5dc4411ca45450606eda8
PDFIUM_REVISION = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
PDFIUM_TREE = 5b402772057e8c3a676c95882a4825350bdf6988
GIT_ROOTS = 33
CIPD_PACKAGES = 6
GCS_OBJECTS = 8
PINNED_CIPD_CLIENT_SHA256 = a4245bbd790e00c43756c1c202c21a3d2b5f0a4fe655fdb4d100029dfe9f223a
```

All inputs were copied into each stopped container before first start. No host mount exposed source or evidence paths to the guest.

## 4. Attempt history and forward-only repair

The first authorized runtime attempt failed closed only after PDFium-root, Git-root, and CIPD placement had succeeded. Python 3.10 `tarfile.data_filter` rejected a Debian sysroot symlink that had already passed the canonical 004C1DV lexical path/link validation because the link resolved outside the extraction subdirectory while remaining inside the combined workspace.

```text
ATTEMPT_1_RESULT = FAIL_CLOSED
ATTEMPT_1_EXIT = 1
ATTEMPT_1_OOM_KILLED = false
ATTEMPT_1_NETWORK_MODE = none
ATTEMPT_1_HOST_MOUNTS = 0
ATTEMPT_1_MATERIALIZER_SHA256 = 271c6d71c9815aa4283a331c31173d55ab01b222316850caf8495f2e2d71eeeb
FAILED_ATTEMPT_EVIDENCE_MANIFEST_SHA256 = 33013d35367e6c2da67b77581833e0ce02244b0377237819c78f7762eb506cf7
```

The repair was forward-only and changed only the extraction compatibility branch back to the already-qualified 004C1DV behavior for Python versions before 3.14. Archive member/path/link prevalidation and post-extraction lexical/resolved escape checks remained in force.

```text
REPAIRED_MATERIALIZER_SHA256 = b6b39bdd3a42b70ecd6d800c8511607a2e37fd80d2f5dc4411ca45450606eda8
SILENT_RETRY = FALSE
FAILED_ATTEMPT_PRESERVED = TRUE
```

## 5. Exact successful replay boundary

Both successful replays used fresh containers with:

```text
PLATFORM = linux/amd64
NETWORK_MODE = none
HOST_MOUNTS = 0
ENTRYPOINT = /bin/sh
INPUT_TRANSPORT = docker cp before first start
WORKSPACE_ROOT = /work/pdfium
```

The materializer first reconstructed the exact PDFium root, then the 33 exact Git roots from local object stores using the protected 33-entry `safe.directory` configuration, then deployed the six exact CIPD packages with the pinned local client, then applied the eight already-qualified GCS objects. No acquired body, object store, source tree, or executable payload was run as application code.

## 6. Successful replay result

```text
REPLAY1_RESULT = PASS
REPLAY2_RESULT = PASS
REPLAY1_EXIT = 0
REPLAY2_EXIT = 0
REPLAY1_OOM_KILLED = false
REPLAY2_OOM_KILLED = false
INVENTORY_ROWS = 138380
INVENTORY_SHA256 = 7cd54b8a7f0a266bcbea46dde3e5d7b6daa6a8a17df39ff4303eb4aa18d9f7f5
DIRS = 13497
FILES = 122499
HARDLINKS = 26
SYMLINKS = 2358
REGULAR_PATH_BYTES = 5375902254
CORE_EVIDENCE_BYTE_IDENTICAL = PASS
INVENTORY_GZIP_BYTE_IDENTICAL = PASS
```

The following replay evidence is byte-identical between successful replay 1 and replay 2: normalized inventory, summary, GCS events, post-overlay Git verification, Git materialization events, CIPD events, and input identities.

Docker diff outputs are preserved independently and are **not** claimed byte-identical. They have equal raw byte and line counts but different raw hashes, which is not a workspace identity criterion.

## 7. Post-overlay Git and special-tree verification

Post-overlay verification proves all 34 Git identities — PDFium plus the 33 admitted Git roots — still resolve to the exact admitted revision and tree identities after CIPD and GCS overlays.

```text
POST_OVERLAY_GIT_IDENTITIES = 34 / 34
TRACKED_STATUS_CLEAN = 34 / 34
CORE_HOOKS_PATH = /dev/null
ACTIVE_HOOKS = 0
```

Overlay-created untracked paths are permitted only where prior qualified CIPD/GCS inputs were authorized to populate them; tracked source bytes remain exact.

The FreeType gitlink boundary remains intentionally unresolved:

```text
FREETYPE_PATH = third_party/freetype/src/subprojects/dlg
FREETYPE_TYPE = empty directory
FREETYPE_SUBMODULE_ACQUISITION = 0
```

The Skia symlink remains exact:

```text
SKIA_PATH = third_party/skia/src/ports/fontations/Cargo.toml
SKIA_TARGET = ../../../bazel/external/fontations/Cargo.toml
```

## 8. GCS overlay accounting

Only the previously-qualified second LLVM object overlays existing members from the first LLVM object:

```text
GCS_OBJECT_2_PREEXISTING_MEMBERS = bin, bin/llvm-nm
GCS_OBJECT_2_LLVM_NM_SHA256 = 257d355424256618d08a42f90d7d00ae1c2808ee7d977b220fbe582b94d57125
ALL_OTHER_GCS_PREEXISTING_MEMBER_SETS = EMPTY
UNQUALIFIED_CROSS_CLASS_COLLISIONS = 0
```

The two admitted `bin/llvm-nm` source payloads were verified byte-identical before replay.

## 9. Prohibited-activity accounting

Both successful summaries record:

```text
NETWORK_REQUESTS = 0
HOST_MOUNTS = 0
SUBMODULE_ACQUISITIONS = 0
HOOK_EXECUTIONS = 0
GCLIENT_EXECUTIONS = 0
GN_EXECUTIONS = 0
NINJA_EXECUTIONS = 0
SISO_EXECUTIONS = 0
RECLIENT_EXECUTIONS = 0
CLANG_EXECUTIONS = 0
RUST_TOOLCHAIN_EXECUTIONS = 0
PDFIUM_BUILD_OR_RUNTIME_EXECUTIONS = 0
REPOSITORY_MUTATIONS_DURING_RUNTIME = 0
```

The only allowed payload-adjacent helper execution was the exact pinned CIPD client's local `pkg-deploy` operation for the six already-qualified package bodies; local Git commands reconstructed and verified exact source trees. Neither operation granted toolchain/build/runtime authority.

## 10. Repository-visible evidence

No acquired source repository, object store, CIPD package/client, GCS body, materialized workspace, toolchain payload, or executable is committed. The candidate publishes only reviewable metadata plus deterministic compressed text inventories/diffs.

| Repository evidence file | Bytes | SHA-256 | Raw bytes | Raw SHA-256 | Raw lines |
| --- | ---: | --- | ---: | --- | ---: |
| `004c1dx-evidence-bundle.json` | 3090 | `b4563549d43fd2a29c3c21c989bd593d4c86481933ef6181b7d1b433025ef79e` | — | — | — |
| `004c1dx-failed1-docker-diff.txt.gz` | 626819 | `236b6048907719a1287125e0fff0f34c06936fce48bf28da628f9e5fffdff587` | 7854076 | `623f35994430d2bdc849b90ceecaea5badfd1f8f961edb757b3192485ca8d2d5` | 101222 |
| `004c1dx-failed1-summary.json` | 804 | `88ee713157ae4905195022d686cd5d29da1ce5b85072feebb8e0e4753a1a64eb` | — | — | — |
| `004c1dx-post-overlay-evidence.json` | 43593 | `d669bd6ea97e540617b5f880707563148db63f21ab7da5e2df52aa54d80ffad7` | — | — | — |
| `004c1dx-success1-docker-diff.txt.gz` | 881087 | `39124ddcf91b5ade1c196788c8b528fef3d91fbc84824e128a98d534f5758cca` | 12081760 | `b4aa2b57cb60259185b6487081b7d64c11c4f5cb24beefac08962f15ec764bc0` | 142164 |
| `004c1dx-success1-inventory.jsonl.gz` | 6213675 | `85e2011ae04a63cf324fc068bfe5c2f3f94816370e29afd71ac034c53e283844` | 27151651 | `7cd54b8a7f0a266bcbea46dde3e5d7b6daa6a8a17df39ff4303eb4aa18d9f7f5` | 138380 |
| `004c1dx-success1-summary.json` | 2210 | `ef4426a3433654c8b4aa1da592d63506a22e5d2bfbeb9ea6eedf12b800e98b55` | — | — | — |
| `004c1dx-success2-docker-diff.txt.gz` | 881875 | `a5364bbde3e3905544813ae388cf180ba185b1ce9fb8b8d721db7682030e0c3a` | 12081760 | `dd805504c4d075a8db1ea47ba21460ec9d86bb85e0dc3b01cd71db0488d1cafb` | 142164 |
| `004c1dx-success2-inventory.jsonl.gz` | 6213675 | `85e2011ae04a63cf324fc068bfe5c2f3f94816370e29afd71ac034c53e283844` | 27151651 | `7cd54b8a7f0a266bcbea46dde3e5d7b6daa6a8a17df39ff4303eb4aa18d9f7f5` | 138380 |
| `004c1dx-success2-summary.json` | 2210 | `ef4426a3433654c8b4aa1da592d63506a22e5d2bfbeb9ea6eedf12b800e98b55` | — | — | — |

The two compressed success inventories are byte-identical with SHA-256 `85e2011ae04a63cf324fc068bfe5c2f3f94816370e29afd71ac034c53e283844`. Independent decompression of each reproduces raw inventory SHA-256 `7cd54b8a7f0a266bcbea46dde3e5d7b6daa6a8a17df39ff4303eb4aa18d9f7f5` and exactly 138380 lines.

## 11. What 004C1DX establishes

```text
004C1DX_RESULT = PASS_EXACT_OFFLINE_COMBINED_PDFIUM_WORKSPACE_MATERIALIZATION
EXACT_PDFIUM_ROOT = 1 / 1
EXACT_GIT_ROOTS = 33 / 33
EXACT_CIPD_DEPLOYMENTS = 6 / 6
EXACT_GCS_OBJECTS = 8 / 8
DETERMINISTIC_SUCCESS_REPLAY = PASS
FAILED_ATTEMPTS_PRESERVED = 1
COMBINED_WORKSPACE_MATERIALIZATION_GAP = CLOSED
WAIVER = NO
```

This establishes that the currently admitted source/dependency inputs can be assembled deterministically into one exact offline workspace. It does not prove that Chromium/PDFium tooling accepts the workspace, that configuration succeeds, or that any binary can be built or run.

## 12. Explicit non-grants

004C1DX does **not** authorize or establish:

- `gclient` execution or equivalence;
- hook or submodule execution/acquisition;
- GN, Ninja, Siso, reclient, Clang, Rust toolchain, or other payload/toolchain execution;
- PDFium configuration, compilation, linking, tests, provider execution, or runtime;
- 004C2 or 004D authority;
- Specification 005 authority;
- release or deployment readiness;
- project completion.

## 13. Merge discipline

This document becomes canonical only after exact final base/head/tree/path verification, truthful workflow/check/provider accounting, fresh independent substantive exact-head review, forward-only repair of every material finding, zero unresolved material review threads, immediate premerge race verification, guarded normal merge using the exact reviewed head, mechanical post-merge proof, and fresh Issue #7 successor reconciliation.

Bot summaries, reactions, automatic skip states, reviewer-request state, unavailable checks, or historical review of a prior head are not substantive exact-head review evidence.

## 14. Successor boundary

004C1DX does not authorize its successor. After canonical merge, Issue #7 must select the smallest remaining dependency-ordered prerequisite from live repository truth. Configuration/toolchain/build/runtime authority must not be inferred from this materialization qualification.
