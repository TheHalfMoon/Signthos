# 004C1DR — Exact Eight GCS Object Acquisition Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_EXACT_EIGHT_GCS_OBJECT_ACQUISITION / ZERO_EXTRACTION_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `f6bfc1093829541c899db8e6e55203379e2bd9d6`
Runtime authority: `github:issue-comment:5643488805`
Runtime closeout and document authority: `github:issue-comment:5643528087`

## 1. Purpose and authority boundary

Canonical 004C1DQ closes the immutable instance-identity and raw package-body acquisition gap for the six admitted Linux/amd64 CIPD packages without extracting, installing, ensuring, or executing any package content. Canonical 004C1DP already closes the current admitted top-level Git selector root acquisition gap.

The remaining dependency-byte class identified by canonical 004C1DL and 004C1DN is the admitted Google Cloud Storage object set. 004C1DR closes only that exact raw-object acquisition prerequisite: acquire the eight already-admitted, generation-pinned GCS objects into an external evidence root and verify each object against its exact canonical selector, expected byte size, and SHA-256.

```text
004C1DR_AUTHORITY = EXACT_EIGHT_ADMITTED_GCS_OBJECT_ACQUISITION_ONLY
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1dr-exact-eight-gcs-object-acquisition-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
TARGET_OBJECTS = 8
EXPECTED_TOTAL_BYTES = 1382940791
GCS_OBJECT_EXTRACTION = 0
ARCHIVE_EXTRACTION = 0
ACQUIRED_OBJECT_EXECUTION = 0
REPOSITORY_MUTATION_DURING_ACQUISITION = 0
PDFIUM_BUILD_EXECUTION = 0
WAIVER = NO
```

004C1DR does not unpack, install, execute, import, or otherwise materialize any acquired object into a source tree or build tree.

## 2. Canonical predecessor truth

```text
004C1DQ = CLOSED_CANONICAL
004C1DQ_PR = #210
004C1DQ_REVIEW = github:issue-comment:5643475137 = NO_MATERIAL_OR_ACTIONABLE_FINDINGS
004C1DQ_REVIEWED_HEAD = ef6da9f27fb95b13e34aeb445a91c0ce5d1110a9
004C1DQ_REVIEWED_TREE = a69fbe7dc5b09d00a6b9637cedebac079b85f5ca
004C1DQ_MERGE = f6bfc1093829541c899db8e6e55203379e2bd9d6
004C1DQ_MERGE_TREE = a69fbe7dc5b09d00a6b9637cedebac079b85f5ca
004C1DQ_PARENT_1 = b268c9451ab689f9c766ed9c693fc23b5e7c9faf
004C1DQ_PARENT_2 = ef6da9f27fb95b13e34aeb445a91c0ce5d1110a9
004C1DQ_MERGE_SIGNATURE = VERIFIED / VALID
004C1DQ_POST_MERGE_PROOF = github:issue-comment:5643484381
004C1DQ_POST_MERGE_ACTION_RUNS = 0
004C1DQ_OPEN_PULL_REQUESTS_AFTER_MERGE = 0
CIPD_PACKAGE_BODIES_ACQUIRED = 6 / 6
CIPD_PACKAGE_BODY_BYTES = 239556004
```

The 004C1DQ merge introduced only its qualification document. It did not extract or execute package content and did not authorize GCS acquisition by implication; 004C1DR uses the separate explicit authority above.

## 3. Canonical GCS selector provenance

Canonical 004C1DL establishes three admitted top-level GCS objects totaling 329,212,260 bytes. Canonical 004C1DN establishes five additional admitted recursive GCS objects totaling 1,053,728,531 bytes and proves the recursive `DEPS` frontier is empty. No new selector is introduced by 004C1DR.

```text
TOP_LEVEL_GCS_OBJECTS = 3
TOP_LEVEL_GCS_BYTES = 329212260
RECURSIVE_GCS_OBJECTS = 5
RECURSIVE_GCS_BYTES = 1053728531
CURRENT_ADMITTED_GCS_OBJECTS = 8
CURRENT_ADMITTED_GCS_BYTES = 1382940791
```

## 4. Exact authorized object set

| # | Logical path | Bucket | Object | Generation | SHA-256 | Bytes |
| ---: | --- | --- | --- | ---: | --- | ---: |
| 1 | `third_party/llvm-build/Release+Asserts` | `chromium-browser-clang` | `Linux_x64/clang-llvmorg-23-init-2224-g5bd8dadb-1.tar.xz` | `1769798229467453` | `d373cde5b6f1c0da245ebcad93e4883252323c1ff283df96f0eb2e9180f1a537` | 57,692,132 |
| 2 | `third_party/llvm-build/Release+Asserts` | `chromium-browser-clang` | `Linux_x64/llvmobjdump-llvmorg-23-init-2224-g5bd8dadb-1.tar.xz` | `1769798229787736` | `28df84ef25bae64ab82a48295bd09aa6689e436449bd78cdc83f58ef05bfdd6a` | 5,818,392 |
| 3 | `third_party/rust-toolchain` | `chromium-browser-clang` | `Linux_x64/rust-toolchain-7d8ebe3128fc87f3da1ad64240e63ccf07b8f0bd-1-llvmorg-23-init-2224-g5bd8dadb.tar.xz` | `1769798222913076` | `aff16507e3f1623a9948cf9b14bd90827fd702b58adbc5f5cc277b60682a6608` | 265,701,736 |
| 4 | `build/linux/debian_bullseye_amd64-sysroot` | `chrome-linux-sysroot` | `36a164623d03f525e3dfb783a5e9b8a00e98e1ddd2b5cff4e449bd016dd27e50` | `1741221486381719` | `36a164623d03f525e3dfb783a5e9b8a00e98e1ddd2b5cff4e449bd016dd27e50` | 20,781,612 |
| 5 | `build/linux/debian_bullseye_i386-sysroot` | `chrome-linux-sysroot` | `63f0e5128b84f7b0421956a4a40affa472be8da0e58caf27e9acbc84072daee7` | `1741221485445080` | `63f0e5128b84f7b0421956a4a40affa472be8da0e58caf27e9acbc84072daee7` | 20,786,772 |
| 6 | `buildtools/linux64-format` | `chromium-clang-format` | `79a7b4e5336339c17b828de10d80611ff0f85961` | `1738622384130717` | `889266a51681d55bd4b9e02c9a104fa6ee22ecdfa7e8253532e5ea47e2e4cb4a` | 3,899,440 |
| 7 | `third_party/instrumented_libs/binaries` | `chromium-instrumented-libraries` | `9329714322846c2b47dd518ac08e437b8c7d8075c514dc7ec3eb3e3a1e0faeb6` | `1717631892393679` | `9329714322846c2b47dd518ac08e437b8c7d8075c514dc7ec3eb3e3a1e0faeb6` | 514,553,540 |
| 8 | `third_party/instrumented_libs/binaries` | `chromium-instrumented-libraries` | `a749c9e47cb4584bc944c887440b1d1c51501f7d9bb99eea276ebcba0aa6c1ec` | `1717631898740987` | `a749c9e47cb4584bc944c887440b1d1c51501f7d9bb99eea276ebcba0aa6c1ec` | 493,707,167 |

The exact aggregate of the eight canonical expected sizes is `1,382,940,791` bytes.

## 5. Acquisition transport and acceptance rule

For each exact selector, 004C1DR used the public Google Cloud Storage JSON API only. Metadata requests were generation-pinned and read-only. The object body request used the same exact bucket, percent-encoded object name, and generation with `alt=media`.

```text
METADATA_ENDPOINT_SHAPE = https://storage.googleapis.com/storage/v1/b/<bucket>/o/<encoded-object>?generation=<generation>
BODY_ENDPOINT_SHAPE = https://storage.googleapis.com/download/storage/v1/b/<bucket>/o/<encoded-object>?alt=media&generation=<generation>
TLS_VERIFICATION_REQUIRED = TRUE
REDIRECT_LIMIT = 0
METADATA_REQUESTS_PER_TARGET = 2
BODY_DOWNLOADS_PER_TARGET = 1
```

A target passed only if both metadata responses reproduced the exact canonical bucket, exact object name, exact generation, and exact expected size; the generation-pinned body request returned HTTP 200 with zero redirects and successful TLS verification; the downloaded file size equaled the expected size; and both Python `hashlib` SHA-256 and system `shasum -a 256` equaled the canonical expected digest.

No body was opened as an archive. No acquired byte was executed.

## 6. Preserved V1 fail-closed launcher history

The first launcher did not reach the acquisition script. It invoked `/opt/homebrew/bin/python3`, which on the authorized host is a POSIX shell wrapper containing `exec python3 "$@"`. Under the active `PATH`, `python3` recursively resolved to that same wrapper. The process was inspected and terminated before any metadata or body file existed.

```text
V1_ROOT = /private/tmp/signthos-004c1dr-gcs-acquisition-20260912T043750Z-26888
V1_RESULT = FAIL_CLOSED_BEFORE_NETWORK
V1_NETWORK_REQUESTS_OBSERVED = 0
V1_GCS_BODIES_DOWNLOADED = 0
V1_REPOSITORY_MUTATIONS = 0
V1_ARCHIVE_EXTRACTIONS = 0
V1_ACQUIRED_OBJECT_EXECUTIONS = 0
V1_FAILURE_RECORD_SHA256 = 320a4b8df26bd5e94cdc687d4c30b6a44f9269f6a672284525a5ff1fe3761e24
```

V1 was not rewritten or deleted. V2 used a fresh evidence root and explicit `/usr/bin/python3` version 3.9.6. The correction changed only the local launcher interpreter path.

## 7. Successful V2 result

```text
V2_ROOT = /private/tmp/signthos-004c1dr-gcs-acquisition-v2-20260912T044219Z-27803
V2_RESULT = PASS_EXACT_EIGHT_GCS_OBJECT_ACQUISITION
TARGETS_TOTAL = 8
TARGETS_PASSED = 8
METADATA_REQUESTS = 16
METADATA_HTTP_200 = 16
METADATA_REDIRECTS_TOTAL = 0
METADATA_TLS_VERIFY_FAILURES = 0
BODY_DOWNLOADS = 8
BODY_HTTP_200 = 8
BODY_REDIRECTS_TOTAL = 0
BODY_TLS_VERIFY_FAILURES = 0
GENERATION_MATCHES = 8 / 8
SIZE_MATCHES = 8 / 8
SHA256_MATCHES = 8 / 8
TOTAL_BODY_BYTES = 1382940791
OBJECT_EXTRACTIONS = 0
OBJECT_EXECUTIONS = 0
REPOSITORY_MUTATIONS = 0
```

The exact acquired body sizes are identical to the canonical expected sizes in Section 4. The two independent SHA-256 implementations matched the canonical expected digest for every object.

## 8. Deterministic evidence closure

```text
TARGETS_TSV_SHA256 = 5f94c81adb9f40b6280fbda6b81a17c5b9c0adf0f532072e7a33480ac8dae565
ACQUIRE_SCRIPT_SHA256 = 3ff7d9f2972ea4509106bf526b0bacfca470daec9249bb57281b8b804849db12
RESULTS_TSV_SHA256 = 5f94c81adb9f40b6280fbda6b81a17c5b9c0adf0f532072e7a33480ac8dae565
BODY_IDENTITIES_JSON_SHA256 = 80103182be0a53ca65896fcfc297d411e316ba26df4b65e45003f01860d46520
TRANSPORT_SUMMARY_JSON_SHA256 = c8e01baa4ca25a7063c8b8d29dfaa6d0e96a444c6ece7c1e90ebf9492d0e985e
ATTEMPT_HISTORY_JSON_SHA256 = 12457f44a5a6504ab67a673eede8caea22b10561414f44d3043e59042ec3106f
QUALIFICATION_RESULT_JSON_SHA256 = 23bb50677fd3a31fe3a8ab5e35ced13a3d9767924b33cd7dd9362eac942d23da
COMPACT_EVIDENCE_FILES = 104
COMPACT_EVIDENCE_BYTES = 53692
COMPACT_EVIDENCE_INVENTORY_SHA256 = 894cd2fe62834809ca73d14bae9ce130a7d24a7dae4f0d472d05d370d758fb4e
CLOSEOUT_JSON_SHA256 = 3e63c1088f774307b5e2b1bd4c8d88e1bde97a81b8538f8c614887480981edbb
```

`targets.tsv` and `results.tsv` are intentionally byte-identical because every successful result row reproduces the authorized seven-field selector record exactly. Their equal SHA-256 is therefore expected and does not replace the independent per-body digest verification.

The compact evidence inventory excludes exactly:

```text
bodies/**
compact-evidence-inventory.jsonl
closeout.json
```

The eight large body files are bound outside the compact inventory by their exact canonical generation, acquired byte size, canonical SHA-256, and per-target result records. The inventory and closeout exclude themselves to avoid circular hashing.

## 9. What 004C1DR establishes

```text
004C1DR_RESULT = PASS_EXACT_EIGHT_GCS_OBJECT_ACQUISITION
CURRENT_ADMITTED_GCS_SELECTOR_SET = 8 OBJECTS
CURRENT_ADMITTED_GCS_OBJECTS_ACQUIRED = 8 / 8
CURRENT_ADMITTED_GCS_BODY_BYTES = 1382940791
CURRENT_ADMITTED_GCS_BYTE_GAP = CLOSED
GCS_OBJECT_EXTRACTION = 0
ACQUIRED_OBJECT_EXECUTION = 0
REPOSITORY_MUTATION_DURING_ACQUISITION = 0
```

Together with canonical 004C1DP and 004C1DQ, all currently admitted top-level Git selector roots, all six current admitted CIPD package bodies, and all eight current admitted GCS object bodies have now been acquired at exact canonical identities. This is not a claim that the build workspace is materialized or executable. In particular, package/archive extraction, install semantics, the recorded Gitlink/submodule frontier, hooks, tool compatibility, toolchain execution, and PDFium configuration/build/runtime remain separate prerequisites.

## 10. Explicit non-grants

```text
GCS_OBJECT_EXTRACTION = NOT_AUTHORIZED
ARCHIVE_EXTRACTION = NOT_AUTHORIZED
ACQUIRED_OBJECT_EXECUTION = NOT_AUTHORIZED
TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
CIPD_PACKAGE_EXTRACTION_INSTALL_EXECUTION = NOT_AUTHORIZED
CIPD_CLIENT_EXECUTION = NOT_AUTHORIZED
NEW_GIT_ACQUISITION = NOT_AUTHORIZED
SUBMODULE_ACQUISITION = NOT_AUTHORIZED
SYMLINK_TARGET_SPECIAL_ACQUISITION = NOT_AUTHORIZED
GCLIENT_EXECUTION = NOT_AUTHORIZED
HOOK_EXECUTION = NOT_AUTHORIZED
GN_EXECUTION = NOT_AUTHORIZED
NINJA_EXECUTION = NOT_AUTHORIZED
CLANG_EXECUTION = NOT_AUTHORIZED
RUST_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
PDFIUM_CONFIGURATION = NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
PDFIUM_RUNTIME = NOT_AUTHORIZED
REPOSITORY_SOURCE_IMPORT = NOT_AUTHORIZED
NOTICE_SBOM_PROVENANCE_MUTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
WAIVER = NO
```

## 11. Qualification and merge gate

This document becomes canonical only after all of the following are true:

1. exact final base/head/tree and one-file base-to-head diff are verified;
2. `git diff --check` passes and the isolated candidate worktree is clean;
3. exact-head workflow/check/provider state is accounted for truthfully;
4. a fresh independent substantive review is completed against the exact head and exact base;
5. every material finding is repaired forward-only and every changed head receives a fresh exact-head review;
6. unresolved material review threads are zero;
7. canonical main, exact head, open-PR frontier, mergeability, rules/protection and checks are reread immediately before merge;
8. normal merge uses the exact expected head SHA;
9. post-merge main, ordered parents, merge tree, signature, changed path/blob, workflows and open-PR frontier are mechanically verified;
10. Issue #7 is reconciled again before any extraction, materialization, hook/tool execution, PDFium configuration/build/runtime, source import, release, deployment, or completion claim.

Bot summaries, automatic skip statuses, reactions, billing blocks, reviewer-request state, and unavailable checks are not substantive review evidence.

## 12. Successor boundary

004C1DR does not authorize its successor.

After canonical merge and mechanical post-merge verification, Issue #7 must choose the smallest remaining materialization or identity prerequisite from exact live truth. Raw-byte acquisition alone does not authorize archive or package extraction, submodule acquisition, hook execution, GN/Ninja/Clang/Rust execution, PDFium configuration/build/runtime, repository source import, release, deployment, or a project-completion claim.
