# 004C1DZ — Exact Offline Release Execution Topology Materialization Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_TWO_REPLAYS_DETERMINISTIC_IDENTITY_EQUAL_WITH_REVIEWABLE_CIPD_DIAGNOSTIC_NORMALIZATION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `de4fdf680450fc842794744061bd0185e95abc29`
Runtime authority: `github:issue-comment:5648203834`
Prelaunch freeze: `github:issue-comment:5648229499`
Storage repair authority: `github:issue-comment:5648331314`
Storage locator repair: `github:issue-comment:5648344486`
Storage repair closeout: `github:issue-comment:5648350377`
Governance metadata correction: `github:issue-comment:5648471068`
Runtime closeout and repository authority: `github:issue-comment:5648473181`
Review finding: `github:issue-comment:5648506136`
Forward-only review repair authority: `github:issue-comment:5648510735`

## 1. Purpose and authority boundary

004C1DY canonically qualified the exact 11-file EmbedPDF release build-control closure without executing it. 004C1DZ closes only the next dependency-ordered prerequisite: reconstruct the already-qualified combined PDFium workspace and place it under the exact EmbedPDF release execution topology, together with those 11 exact build-control files and an empty future output sink, inside isolated offline Linux containers.

```text
004C1DZ_AUTHORITY = EXACT_OFFLINE_RELEASE_EXECUTION_TOPOLOGY_MATERIALIZATION_QUALIFICATION_ONLY
CANONICAL_BASE = de4fdf680450fc842794744061bd0185e95abc29
BUILDER_IMAGE = sha256:ebc4a9202a97820ac8f8780c8e7b89d51952f5ed512a898c52a8576cd38924b4
SUCCESSFUL_REPLAYS_REQUIRED = 2
SUCCESSFUL_REPLAYS_COMPLETED = 2
NETWORK_MODE = none
HOST_MOUNTS = 0
WAIVER = NO
```

This qualification does not execute the upstream release script and does not establish configuration, build, link, runtime, provider, release, deployment, or project-completion success.

## 2. Canonical predecessor truth

```text
004C1DY = CLOSED_CANONICAL
004C1DY_PR = #219
004C1DY_REVIEWED_HEAD = febb6c0462fe5657d93daaad06b12844192eae9d
004C1DY_MERGE = de4fdf680450fc842794744061bd0185e95abc29
004C1DY_MERGE_TREE = 5a8b490e1685bcaf706119df9dfb027718e1a7b8
004C1DY_MERGE_SIGNATURE = VERIFIED_VALID
POST_MERGE_OPEN_PR_FRONTIER = 0
```

The post-merge COMMENT review records later added accidentally to already-merged PR #219 are explicitly non-authoritative and are excluded from this qualification. Issue #7 correction `github:issue-comment:5648471068` governs that metadata event.

## 3. Frozen materialization inputs

Both successful replays used the same exact frozen identities:

```text
WRAPPER_SHA256 = 724215cab67d9d22970d2afe7403ed0efdbd14213d8f8bb8aa90ceac8273e007
CONTROL_MANIFEST_SHA256 = 663ac7ae7069a08db2e8a43c90035ba82d9f69980b066f88661cc3f29dfea007
PREDECESSOR_MATERIALIZER_SHA256 = b6b39bdd3a42b70ecd6d800c8511607a2e37fd80d2f5dc4411ca45450606eda8
PREDECESSOR_MANIFEST_SHA256 = 008d33f17370fb1273c992591758e3475f2520cfd0af238f9279691daeb016e4
PDFIUM_REVISION = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
PDFIUM_TREE = 5b402772057e8c3a676c95882a4825350bdf6988
BUILD_CONTROL_FILES = 11
BUILD_CONTROL_BYTES = 52747
```

Every source/package/object/control input was copied into a stopped container before first start. No host source or evidence directory was mounted into either guest.

## 4. Exact release topology

The qualified topology is:

```text
PACKAGE_ROOT = /workspace/packages/pdfium
PDFIUM_SOURCE_ROOT = /workspace/packages/pdfium/pdfium-src
BUILD_CONTROL_ROOTS = /workspace/packages/pdfium/build + /workspace/packages/pdfium/scripts
FUTURE_OUTPUT_SINK = /workspace/packages/pdfium/src/vendor
FUTURE_OUTPUT_SINK_STATE = EMPTY_DIRECTORY
```

The exact combined PDFium workspace is reconstructed first and then moved atomically from `/work/pdfium` to the release topology source root. The 11 static 004C1DY build-control inputs are copied to their exact release-relative paths. No destination collision or non-directory ancestor conflict was admitted.

## 5. Successful replay result

Both fresh replays completed with:

```text
REPLAY1_EXIT = 0
REPLAY2_EXIT = 0
REPLAY1_OOM_KILLED = false
REPLAY2_OOM_KILLED = false
PREDECESSOR_INVENTORY_ROWS = 138380
PREDECESSOR_INVENTORY_SHA256 = 7cd54b8a7f0a266bcbea46dde3e5d7b6daa6a8a17df39ff4303eb4aa18d9f7f5
TOPOLOGY_INVENTORY_ROWS = 138402
TOPOLOGY_INVENTORY_SHA256 = dbd6632edd5e86432b7cfed65383b6b6d44c37f868efe2a70f2ab76a9f46e507
TOPOLOGY_REGULAR_PATH_BYTES = 5375955001
DIRS = 13508
FILES = 122510
HARDLINKS = 26
SYMLINKS = 2358
VENDOR_OUTPUT_SINK_EMPTY = true
```

The existing FreeType unresolved gitlink boundary remains an empty directory, the Skia `fontations/Cargo.toml` symlink target remains `../../../bazel/external/fontations/Cargo.toml`, and the LLVM directory required by the release script's gclient-skip condition is present.

## 6. Replay equivalence classification

The exact replay-equivalence classification is:

```text
PASS_TWO_REPLAYS_DETERMINISTIC_IDENTITY_EQUAL_WITH_REVIEWABLE_CIPD_DIAGNOSTIC_NORMALIZATION
EVIDENCE_PATHS_TOTAL = 32
BYTE_IDENTICAL_EVIDENCE_PATHS = 26
DIAGNOSTIC_VARIANCE_PATHS = 6
FINAL_REPLAY_EQUIVALENCE_SHA256 = 0e9a0f44cc785a1457db1aba7d0163c42bc367dafe5066abac7367237732db27
```

Identity-bearing artifacts are byte-identical between replays, including the topology inventory, summary, control input identities, control placement identities, predecessor inventory and summary, GCS events, post-overlay Git verification, Git materialization events, CIPD events, and input identities.

The only non-byte-identical guest evidence paths are:

```text
predecessor/cipd-01.stderr
predecessor/cipd-02.stderr
predecessor/cipd-03.stderr
predecessor/cipd-04.stderr
predecessor/cipd-05.stderr
predecessor/cipd-06.stderr
```

A fresh independent exact-head review correctly found that raw hashes alone did not make the diagnostic-only classification independently reviewable. The forward-only repair embeds the complete bounded text of all twelve retained stderr logs (six packages × two replays) directly in `004c1dz-replay-equivalence.json`, together with strict parsing/normalization rules, rejection rules, per-package stable semantic objects, raw hashes/sizes, dynamic-field records, and normalized semantic hashes. The comparison rejects unexpected message classes, levels, source locations, package instances, targets, install modes, archive totals, terminal states, or lifecycle order. It normalizes only PID, wall-clock timestamp, intermediate sampled extraction progress/throughput, and terminal elapsed-time text. All six package pairs produce byte-identical canonical stable-semantic JSON and zero unexpected lines. The diagnostic-only classification is therefore reviewable from the committed head without access to retained external stderr files. This document still does not claim that every diagnostic byte is deterministic.

### 6.1 Reviewable CIPD diagnostic comparison repair

The repaired replay-equivalence artifact contains the complete bounded stderr text for every differing CIPD diagnostic log from both successful replays. Its parser accepts only the observed CIPD deployment lifecycle grammar and fails closed on every unexpected line/message/source/level or stable-field change. For each package pair, canonical sorted compact JSON + LF of the stable semantic object hashes identically across replays.

```text
CIPD_DIAGNOSTIC_LOG_PAIRS = 6
RAW_LOGS_EMBEDDED = 12 / 12
UNEXPECTED_LINES = 0
NORMALIZED_SEMANTIC_EQUALITY = 6 / 6
NORMALIZED_FIELDS = PID / WALL_CLOCK / INTERMEDIATE_PROGRESS_THROUGHPUT / ELAPSED_TIME_ONLY
RAW_HASH_BINDINGS_PRESERVED = 12 / 12
```

This forward-only repair changes no runtime evidence or replay result; it makes the already-observed variance class independently inspectable from repository-visible evidence.

## 7. Deterministic inventory and Docker-diff evidence

Both raw topology inventories are byte-identical. Deterministic gzip encoding of each reproduces the same compressed identity:

```text
TOPOLOGY_INVENTORY_GZIP_SHA256 = 6f3ba6bb881dc6bef33d16611449de25cad77ff4960a682c9bb9910321ec0f64
```

The Docker diff streams were sorted before comparison so host/runtime ordering could not create a false mismatch:

```text
SORTED_DOCKER_DIFF_RAW_SHA256 = 08bf2dc649ca0141b761bd1dd2eb04437e0a36b22270fde174d3a812bc26aaa6
SORTED_DOCKER_DIFF_GZIP_SHA256 = d6b8245aedf2711a684dd2f6ff693d80fbd4ea65b66a4481dc81aab781d1df12
```

The sorted raw and compressed Docker-diff evidence is byte-identical across both successful replays.

## 8. Storage/headroom forward repair

After Replay 1 evidence was copied and verified, available host storage was insufficient for a safe second replay. The first bounded cleanup attempt failed closed before deletion because the historical 004C1CZ guest-evidence locator was stale. A fresh forward-only locator repair then preserved the actual retained evidence and removed only the two explicitly authorized stopped legacy containers.

```text
PRESERVED_FILE_COUNT = 124
PRESERVED_TOTAL_BYTES = 12870058
PRESERVED_EVIDENCE_MANIFEST_SHA256 = 1fd62d2a239ac735e0cc4e041cbb0023e8504b2262c0e618472c20729bd052f7
LEGACY_CONTAINERS_REMOVED = 2
DOCKER_PRUNE_EXECUTIONS = 0
IMAGE_REMOVALS = 0
SOURCE_OR_EXTERNAL_EVIDENCE_DELETIONS = 0
BUILDER_IMAGE_PRESERVED = sha256:ebc4a9202a97820ac8f8780c8e7b89d51952f5ed512a898c52a8576cd38924b4
```

The removed stopped containers were historical 004C1CZ and 004C1DD artifacts only. The canonical 004C1DJ builder snapshot and all retained source/dependency/runtime evidence used by 004C1DZ remained available and identity-bound.

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
NODE_EXECUTIONS = 0
EMSCRIPTEN_EXECUTIONS = 0
RUST_TOOLCHAIN_EXECUTIONS = 0
PDFIUM_BUILD_OR_RUNTIME_EXECUTIONS = 0
REPOSITORY_MUTATIONS_DURING_RUNTIME = 0
```

Local Git reconstruction and the exact pinned CIPD client's already-qualified `pkg-deploy` operation are inherited materialization helpers from canonical 004C1DX. They do not constitute source, toolchain, configuration, build, or runtime execution authority.

## 10. Repository-visible evidence

No acquired source, package body, GCS body, Git object store, materialized workspace, builder image, toolchain binary, or executable materializer is committed. The candidate publishes reviewable metadata and deterministic compressed text evidence only.

| Repository evidence file | Bytes | SHA-256 |
| --- | ---: | --- |
| `004c1dz-control-placement-identities.json` | 2924 | `cdaccf5d2c45a03d4c9b3e1a74deb3d836532e6b2fd2df9ab6e178b1a950389d` |
| `004c1dz-evidence-bundle.json` | 3989 | `3e9087f1c97e0fd746402ebd5b92f0f226d41a0aa70de2bbb5bf636a00bcb6d6` |
| `004c1dz-replay-equivalence.json` | 36880 | `9ea44fb7d1fe3c6117aae7d6811242061494b97f5055b1ae2b8f537c5a376fdd` |
| `004c1dz-replay1-docker-diff-sorted.txt.gz` | 834714 | `d6b8245aedf2711a684dd2f6ff693d80fbd4ea65b66a4481dc81aab781d1df12` |
| `004c1dz-replay1-summary.json` | 1740 | `2c222e6e29ea17d33613958b3ff5c392b95e51570aab4c82208a850eea1eb9ad` |
| `004c1dz-replay1-topology-inventory.jsonl.gz` | 6217522 | `6f3ba6bb881dc6bef33d16611449de25cad77ff4960a682c9bb9910321ec0f64` |
| `004c1dz-replay2-docker-diff-sorted.txt.gz` | 834714 | `d6b8245aedf2711a684dd2f6ff693d80fbd4ea65b66a4481dc81aab781d1df12` |
| `004c1dz-replay2-summary.json` | 1740 | `2c222e6e29ea17d33613958b3ff5c392b95e51570aab4c82208a850eea1eb9ad` |
| `004c1dz-replay2-topology-inventory.jsonl.gz` | 6217522 | `6f3ba6bb881dc6bef33d16611449de25cad77ff4960a682c9bb9910321ec0f64` |
| `004c1dz-storage-repair-summary.json` | 1030 | `70aab3bf70bcefbb336cd5e85dc76580fbc349e84e8f750c65a52156c147f404` |

Independent decompression of each topology inventory must reproduce raw SHA-256 `dbd6632edd5e86432b7cfed65383b6b6d44c37f868efe2a70f2ab76a9f46e507` and exactly `138402` lines. Independent decompression of each sorted Docker diff must reproduce raw SHA-256 `08bf2dc649ca0141b761bd1dd2eb04437e0a36b22270fde174d3a812bc26aaa6`.

## 11. What 004C1DZ establishes

```text
004C1DZ_RESULT = PASS_EXACT_OFFLINE_RELEASE_EXECUTION_TOPOLOGY_MATERIALIZATION_TWO_REPLAYS
EXACT_COMBINED_PDFIUM_WORKSPACE = MATERIALIZED_AT_RELEASE_SOURCE_ROOT
EXACT_BUILD_CONTROL_CLOSURE = 11 / 11 PLACED
FUTURE_VENDOR_OUTPUT_SINK = EMPTY
DETERMINISTIC_IDENTITY_REPLAY = PASS
RELEASE_EXECUTION_TOPOLOGY_GAP = CLOSED
WAIVER = NO
```

004C1DZ establishes only that the exact qualified source/dependency workspace and exact static build-control closure can be arranged deterministically into the release script's expected filesystem topology while remaining fully offline and without executing the release build surface.

## 12. Explicit non-grants

004C1DZ does **not** authorize or establish:

- execution of `scripts/build.sh`;
- `gclient`, hooks, submodules, or dependency acquisition;
- GN configuration success or effective wasm graph success;
- Ninja, Siso, reclient, Clang, Node, Emscripten, Rust, or other build/toolchain execution;
- PDFium compilation, linking, test, provider, or runtime success;
- 004C2 or 004D authority;
- Specification 005 authority;
- release or deployment readiness;
- project completion.

## 13. Release-script sequencing boundary

Canonical 004C1DY established that the exact upstream release script performs an initial `gn gen` before applying the wasm `BUILDCONFIG.gn` / wasm toolchain patch and before appending `target_os="wasm"` / `target_cpu="wasm"`. Therefore a later unit must not treat the initial GN invocation alone as evidence that the effective wasm release graph is valid.

Any successor configuration qualification must model the actual release sequence and distinguish bootstrap/prepatch configuration from the postpatch effective wasm configuration that the release ultimately consumes.

## 14. Merge discipline

This document becomes canonical only after exact final base/head/tree/path verification, mechanical artifact/decompression validation, truthful check/provider accounting, fresh independent substantive exact-head review, forward-only repair of every material finding, zero unresolved material review threads, immediate premerge race verification, guarded normal merge of the exact reviewed head, mechanical post-merge proof, and fresh Issue #7 successor reconciliation.

Bot summaries, automatic skip states, reactions, stale review of a prior head, self-review, or unavailable provider status do not satisfy the independent substantive exact-head review gate.

## 15. Successor boundary

004C1DZ does not authorize its successor. After canonical merge, Issue #7 must select the smallest dependency-ordered remaining prerequisite from live repository truth. No GN/configuration/build/runtime authority may be inferred merely because the execution topology is now qualified.
