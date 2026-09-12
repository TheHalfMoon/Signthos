# 004C1DV — Exact Offline GCS Object Materialization Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_EXACT_OFFLINE_GCS_OBJECT_MATERIALIZATION / TWO_BYTE_IDENTICAL_REPLAYS`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `8432d93ceab78b2fa4ea9595fc65b14383494484`
Runtime authority: `github:issue-comment:5645950883`
Closeout and repository authority: `github:issue-comment:5646848822`

## 1. Purpose and authority boundary

Canonical 004C1DR acquired and hash-qualified the exact eight admitted Google Cloud Storage object bodies. Canonical 004C1DS froze the exact offline placement and safety contract but performed no extraction. Canonical 004C1DU subsequently qualified the exact pinned CIPD local-package deployment primitive required by later workspace assembly.

004C1DV closes one narrower prerequisite: deterministic offline materialization of only the exact eight already-acquired GCS bodies at the frozen 004C1DS logical paths.

```text
004C1DV_AUTHORITY = EXACT_OFFLINE_GCS_OBJECT_MATERIALIZATION_QUALIFICATION_ONLY
CANONICAL_BASE = 8432d93ceab78b2fa4ea9595fc65b14383494484
REPLAYS_AUTHORIZED = 2
REPLAYS_EXECUTED = 2
NEW_GCS_ACQUISITION = 0
NETWORK_REQUESTS = 0
HOST_MOUNTS = 0
GIT_OPERATIONS = 0
CIPD_OPERATIONS = 0
GCLIENT_EXECUTIONS = 0
PAYLOAD_EXECUTIONS = 0
HOOK_EXECUTION = 0
TOOLCHAIN_EXECUTION = 0
PDFIUM_BUILD_OR_RUNTIME = 0
WAIVER = NO
```

This qualification does not claim a complete PDFium workspace, `gclient` equivalence, build success, runtime success, release readiness, deployment readiness, or project completion.

## 2. Canonical predecessor truth

The immediate predecessor is canonical 004C1DU:

```text
004C1DU = CLOSED_CANONICAL
004C1DU_PR = #214
004C1DU_REVIEWED_HEAD = 8307c3e0aa294bf2a3eeb54c3152d78bc6544a36
004C1DU_REVIEWED_TREE = a542c43a54ac6bd15504c562c7ad9170dbc22845
004C1DU_MERGE = 8432d93ceab78b2fa4ea9595fc65b14383494484
004C1DU_MERGE_TREE = a542c43a54ac6bd15504c562c7ad9170dbc22845
004C1DU_MERGE_PARENTS = 9d772fb74aea2e1aedf5dfa3f5f934f3586ba823 8307c3e0aa294bf2a3eeb54c3152d78bc6544a36
004C1DU_MERGE_SIGNATURE = VERIFIED_VALID
POST_MERGE_WORKFLOW_RUNS = 0
POST_MERGE_OPEN_PR_FRONTIER = 0
```

The frozen GCS placement semantics remain bound to exact depot_tools commit:

```text
DEPOT_TOOLS_REVISION = 6235028c6b18b73e68f5414f935ec537a25ea51a
DEPOT_TOOLS_TREE = 0b08d0dbc2f75f2b44fb0b46ae7133e9bceb9e44
```

Canonical 004C1DS established that seven admitted objects are validated tar-compatible archives and one is a direct output file. It also bound tar path/link validation, logical output directories, archive mtime non-identity behavior, deterministic inventory requirements, and the direct executable-output contract.

## 3. Exact authorized input set

No body was downloaded or substituted by 004C1DV.

| # | Logical materialization path | SHA-256 | Bytes | Disposition |
| ---: | --- | --- | ---: | --- |
| 1 | `third_party/llvm-build/Release+Asserts` | `d373cde5b6f1c0da245ebcad93e4883252323c1ff283df96f0eb2e9180f1a537` | 57,692,132 | validated tar extraction |
| 2 | `third_party/llvm-build/Release+Asserts` | `28df84ef25bae64ab82a48295bd09aa6689e436449bd78cdc83f58ef05bfdd6a` | 5,818,392 | validated tar extraction |
| 3 | `third_party/rust-toolchain` | `aff16507e3f1623a9948cf9b14bd90827fd702b58adbc5f5cc277b60682a6608` | 265,701,736 | validated tar extraction |
| 4 | `build/linux/debian_bullseye_amd64-sysroot` | `36a164623d03f525e3dfb783a5e9b8a00e98e1ddd2b5cff4e449bd016dd27e50` | 20,781,612 | validated tar extraction |
| 5 | `build/linux/debian_bullseye_i386-sysroot` | `63f0e5128b84f7b0421956a4a40affa472be8da0e58caf27e9acbc84072daee7` | 20,786,772 | validated tar extraction |
| 6 | `buildtools/linux64-format/clang-format` | `889266a51681d55bd4b9e02c9a104fa6ee22ecdfa7e8253532e5ea47e2e4cb4a` | 3,899,440 | exact direct output, executable |
| 7 | `third_party/instrumented_libs/binaries` | `9329714322846c2b47dd518ac08e437b8c7d8075c514dc7ec3eb3e3a1e0faeb6` | 514,553,540 | validated tar extraction |
| 8 | `third_party/instrumented_libs/binaries` | `a749c9e47cb4584bc944c887440b1d1c51501f7d9bb99eea276ebcba0aa6c1ec` | 493,707,167 | validated tar extraction |

```text
AUTHORIZED_OBJECTS = 8
AUTHORIZED_INPUT_BYTES = 1382940791
INPUT_HASH_MISMATCHES = 0
INPUT_SIZE_MISMATCHES = 0
```

## 4. Frozen materializer

The same Signthos-authored materializer bytes were copied into both fresh containers before first start.

```text
MATERIALIZER_BYTES = 9941
MATERIALIZER_SHA256 = a79c848fad3c1c7504fe0f6b07fc1b957abd74f06f65ea9a8263216fb2971cc5
VALIDATE_ONLY_SHA256 = e00925debdde79e7e3c9a411821218006404f134a0a32211157b0029642190db
```

Before either authorized replay, host-side validation-only inspection revalidated all eight input size/hash identities and all seven archive member sets. It wrote no materialized payload.

Observed archive member types were limited to regular files, directories, symlinks, and hardlinks. No device, FIFO, socket, or unsupported archive member type was admitted.

The materializer performs the following bounded actions only:

1. verify every input byte count and SHA-256 before any placement;
2. validate every archive path and link target before extraction;
3. reject absolute paths, traversal, resolved-path escape, device entries, FIFOs, sockets, and unsupported types;
4. extract archive members only under their frozen logical dependency directory;
5. treat archive mtime as non-identity-bearing;
6. copy the exact direct-output body to `buildtools/linux64-format/clang-format` and set mode `0755`;
7. inventory the final materialized tree deterministically without following symlinks;
8. execute no materialized payload.

## 5. Exact replay boundary

Both replays used only the canonical 004C1DJ builder image:

```text
BUILDER_IMAGE_ID = sha256:ebc4a9202a97820ac8f8780c8e7b89d51952f5ed512a898c52a8576cd38924b4
BUILDER_OS = linux
BUILDER_ARCHITECTURE = amd64
GUEST_PYTHON = 3.10.12
```

Each replay used a different fresh container and fresh empty output root.

```text
PLATFORM = linux/amd64
NETWORK_MODE = none
HOST_MOUNTS = 0
ENTRYPOINT = /bin/sh
INPUT_TRANSPORT = docker cp before first start
OUTPUT_ROOT = /work/gcs
EVIDENCE_ROOT = /work/evidence
```

Pre-start state for both containers was exactly:

```text
none 0 created false
```

Post-exit state for both containers was exactly:

```text
none 0 exited false 0 false
```

The final two fields are exit code `0` and `OOMKilled=false`.

## 6. Replay results

Both replays completed successfully with zero stderr bytes.

```text
REPLAY1_RESULT = PASS
REPLAY1_EXIT = 0
REPLAY1_STDERR_BYTES = 0
REPLAY2_RESULT = PASS
REPLAY2_EXIT = 0
REPLAY2_STDERR_BYTES = 0
```

Each replay produced:

```text
INVENTORY_ROWS = 53722
INVENTORY_SHA256 = fe449e89fc2f99c394dfad20b0c553f775b8eac8d46582687735a0f74aaa0c4f
DIR_ROWS = 7439
FILE_ROWS = 43911
HARDLINK_ROWS = 26
SYMLINK_ROWS = 2346
REGULAR_PATH_BYTES = 3521795489
```

The two raw inventory files are byte-identical. The two replay summary files are byte-identical. The two event files are byte-identical.

```text
INVENTORIES_BYTE_IDENTICAL = PASS
SUMMARIES_BYTE_IDENTICAL = PASS
EVENTS_BYTE_IDENTICAL = PASS
DETERMINISTIC_REPLAY = PASS
```

## 7. Extraction and collision accounting

The exact event sequence was identical in both replays.

| Object | Members | Files | Dirs | Symlinks | Hardlinks | Preexisting member paths |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 460 | 421 | 27 | 12 | 0 | 0 |
| 2 | 8 | 6 | 1 | 1 | 0 | 2 |
| 3 | 8,690 | 7,084 | 1,604 | 2 | 0 | 0 |
| 4 | 20,806 | 17,229 | 2,708 | 856 | 13 | 0 |
| 5 | 20,771 | 17,209 | 2,696 | 853 | 13 | 0 |
| 7 | 1,488 | 981 | 196 | 311 | 0 | 0 |
| 8 | 1,488 | 981 | 196 | 311 | 0 | 0 |

Object 2 intentionally overlays the same LLVM logical directory used by object 1. Exactly two object-2 member paths were already present at the time of the second extraction. No other object observed a preexisting member path. This accounting is deterministic and identical across both replays.

## 8. Direct-output contract

The non-archive object materialized exactly as:

```text
PATH = buildtools/linux64-format/clang-format
TYPE = file
MODE = 0755
BYTES = 3899440
SHA256 = 889266a51681d55bd4b9e02c9a104fa6ee22ecdfa7e8253532e5ea47e2e4cb4a
```

The executable mode matches the frozen upstream GCS metadata contract. The file was never executed.

## 9. Path and Docker-diff confinement

A normalized path scan over all 53,722 output records in each replay found zero absolute paths, traversal records, or output paths outside the materialization root.

The raw Docker diff for each replay contained exactly 53,739 records. The only top-level changed roots were:

```text
/tmp
/work
```

```text
UNEXPECTED_DOCKER_DIFF_ROOTS = 0
```

Raw Docker diff hashes differ between containers and are not treated as payload identity. Both complete diffs are published in deterministic gzip form for independent inspection.

```text
REPLAY1_DOCKER_DIFF_RAW_SHA256 = 20d03590c923e5f8f7146d71791316d49a32ca3ec8d46a71f48f6ed51830523b
REPLAY2_DOCKER_DIFF_RAW_SHA256 = 8b42a47f102c9e27b59d2fcaee5d67df31b5e11ca32261d133e7d937c829420b
```

## 10. Prohibited-activity accounting

The frozen materializer contains no network client, Git invocation, CIPD invocation, `gclient` invocation, subprocess execution of extracted payload, hook invocation, or compiler/runtime invocation.

Both replay summaries record:

```text
NETWORK_REQUESTS = 0
PAYLOAD_EXECUTIONS = 0
GIT_OPERATIONS = 0
CIPD_OPERATIONS = 0
GCLIENT_EXECUTIONS = 0
```

The container boundary independently denied network access with `NetworkMode=none` and zero host mounts.

## 11. Repository-visible evidence

PR #214 established repository-visible evidence as a merge-critical reviewability requirement. 004C1DV therefore publishes the central evidence rather than relying on host-local `/private/tmp` state.

| Repository evidence file | Bytes | SHA-256 |
| --- | ---: | --- |
| `004c1dv-evidence-bundle.json` | 49,830 | `f9d9b1c743bdecf4e32c6db17e8a8356b7e43088c27ca0312dd06f6b694dce67` |
| `004c1dv-replay1-inventory.jsonl.gz` | 2,217,706 | `324e9b93c4b9f3902ace12890a1e1933bc2a8e0933d6a5b25126d9102511d89d` |
| `004c1dv-replay2-inventory.jsonl.gz` | 2,217,706 | `324e9b93c4b9f3902ace12890a1e1933bc2a8e0933d6a5b25126d9102511d89d` |
| `004c1dv-replay1-docker-diff.txt.gz` | 329,034 | `32f563c2483b0d0dedbe58366ce1bb6917f7aa2ce69da236072650d8747cedcc` |
| `004c1dv-replay2-docker-diff.txt.gz` | 327,792 | `e876e815cc21384b1aaf5855f048ce80f701b729c32ff427a7657384949439ee` |

The two compressed inventory files are also byte-identical. Deterministic decompression reproduces the raw inventory SHA-256 shown above.

Deterministic decompression of the Docker diff files reproduces their exact raw SHA-256 values in Section 9.

The JSON evidence bundle includes the frozen materializer bytes, validation-only result, replay input-validation records, events, summaries, container IDs, pre/post state, selected pre/post inspect state, raw inspect hashes, output identities, inventory identities, Docker-diff identities, and replay-equivalence result.

A targeted secret/token/private-key scan of the repository evidence bundle found zero findings. No acquired GCS body is committed.

## 12. External evidence closure

External execution evidence remains available at the execution-time host path but is not required for repository review because the central evidence is published above.

```text
EXTERNAL_EVIDENCE_ROOT = /private/tmp/signthos-004c1dv-gcs-materialization-e6ukaVPv
QUALIFICATION_RESULT_BYTES = 2369
QUALIFICATION_RESULT_SHA256 = f490e8a1e73f2f2a04accf53c82f417d5144257aa8ce3338c716dd152e351c5b
```

## 13. Qualification result

```text
EXACT_EIGHT_INPUT_IDENTITIES = PASS
ARCHIVE_MEMBER_VALIDATION = PASS
DIRECT_OUTPUT_IDENTITY_AND_MODE = PASS
REPLAY1 = PASS
REPLAY2 = PASS
DETERMINISTIC_REPLAY = PASS
OUTPUT_PATH_CONFINEMENT = PASS
DOCKER_DIFF_CONFINEMENT = PASS
NETWORK_ISOLATION = PASS
ZERO_HOST_MOUNTS = PASS
ZERO_PAYLOAD_EXECUTION = PASS
REPOSITORY_VISIBLE_EVIDENCE = PRESENT
004C1DV_RESULT = PASS
```

004C1DV establishes only that the eight exact canonical GCS bodies can be materialized offline, at the frozen paths, twice with byte-identical deterministic output inventories under the bounded builder/container contract.

## 14. Explicit non-claims and non-grants

004C1DV does **not** establish or authorize:

- `gclient` execution or equivalence;
- materialization of the 33 admitted Git roots;
- CIPD package deployment as part of a combined workspace assembly;
- acquisition of the nested FreeType `subprojects/dlg` gitlink;
- hook execution;
- execution of `clang-format`, GN, Ninja, Siso, reclient, result_adapter, goldctl, Clang, Rust, or any other acquired/materialized tool;
- complete PDFium workspace assembly;
- PDFium GN configuration;
- PDFium compilation, linking, tests, rendering, or runtime;
- repository source import;
- 004C2 or 004D;
- Specification 005;
- release or deployment;
- project completion.

No new runtime replay is authorized by this document.

## 15. Successor boundary

After canonical merge, Issue #7 must perform fresh successor reconciliation from exact live truth.

The remaining known materialization classes are not collapsed by this unit:

```text
GCS_MATERIALIZATION = QUALIFIED_BY_004C1DV
GIT_ROOTS = 33 exact acquired roots, not yet materialized as one workspace class
CIPD_PACKAGES = 6 exact bodies with offline deployment primitive qualified by 004C1DU
FREETYPE_DLG_GITLINK = observed, intentionally not acquired
FULL_PDFIUM_WORKSPACE = NOT_ASSEMBLED
```

A likely dependency-ordered direction is exact offline Git-root materialization qualification before any combined workspace assembly. That is informational only and creates no successor authority.

## 16. Merge discipline

This candidate may merge only if:

1. canonical `main` remains `8432d93ceab78b2fa4ea9595fc65b14383494484` through immediate premerge race proof;
2. the candidate contains exactly one commit and exactly the six paths authorized by `github:issue-comment:5646848822`;
3. the five evidence files match the exact closeout identities;
4. both compressed inventories independently decompress to `fe449e89fc2f99c394dfad20b0c553f775b8eac8d46582687735a0f74aaa0c4f` and compare byte-for-byte equal;
5. both Docker diff evidence files decompress to the exact raw hashes recorded above;
6. `git diff --check` passes;
7. applicable exact-head checks are accounted truthfully;
8. a fresh independent substantive exact-head review reports no material/actionable finding;
9. any repair is forward-only and receives a fresh exact-head review;
10. unresolved material review threads are zero;
11. guarded normal merge uses the exact reviewed head;
12. post-merge tree, ordered parents, signature, path/blob identities, workflow state, and open-PR frontier are mechanically verified;
13. fresh Issue #7 successor reconciliation occurs before any Git-root materialization, combined workspace assembly, hook/tool execution, PDFium build/runtime, 004C2, 004D, Specification 005, release, deployment, or completion claim.

No statement in this document claims that PDFium has been built, tested, rendered, or run.
