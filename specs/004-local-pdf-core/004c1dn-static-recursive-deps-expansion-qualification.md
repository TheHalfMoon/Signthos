# 004C1DN — Static Recursive DEPS Expansion Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_STATIC_RECURSIVE_DEPS_EXPANSION / ZERO_ACQUIRED_SOURCE_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `85bdd2f9e7e09a7ba38e5b27a8c330a660182572`
Runtime authority: `github:issue-comment:5642886611`
Runtime closeout and document authority: `github:issue-comment:5642943319`

## 1. Purpose and authority boundary

Canonical 004C1DM acquired and qualified the exact Git roots named by the top-level PDFium `recursedeps` surface and bound their exact root `DEPS` bytes without executing acquired source. 004C1DN closes only the remaining static recursion question: derive the exact recursive selector surface of those three root `DEPS` files under the already-qualified Linux/x64/default context and exact acquired `depot_tools` recursion semantics.

```text
004C1DN_AUTHORITY = STATIC_RECURSIVE_DEPS_EXPANSION_ONLY
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1dn-static-recursive-deps-expansion-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
NETWORK_EXECUTION = 0
GCLIENT_EXECUTION = 0
CIPD_EXECUTION = 0
HOOK_EXECUTION = 0
ACQUIRED_SOURCE_EXECUTION = 0
CONTAINER_EXECUTION = 0
PDFIUM_BUILD_EXECUTION = 0
WAIVER = NO
```

## 2. Canonical predecessor truth

```text
004C1DM = CLOSED_CANONICAL
004C1DM_PR = #206
004C1DM_REVIEW = github:issue-comment:5642870536 = NO_MATERIAL_OR_ACTIONABLE_FINDINGS
004C1DM_REVIEWED_HEAD = d3ba460216b444fb281479c68bdf9fde9c72ce84
004C1DM_REVIEWED_TREE = 19f5c89d5f8abbbd7b7aabd07ebf7064889f7e3c
004C1DM_MERGE = 85bdd2f9e7e09a7ba38e5b27a8c330a660182572
004C1DM_MERGE_TREE = 19f5c89d5f8abbbd7b7aabd07ebf7064889f7e3c
004C1DM_PARENT_1 = 0f7bdd3ef431342f2a801270917c96ac18808f13
004C1DM_PARENT_2 = d3ba460216b444fb281479c68bdf9fde9c72ce84
004C1DM_MERGE_SIGNATURE = VERIFIED / VALID
004C1DM_POST_MERGE_WORKFLOWS = 0
004C1DM_OPEN_PULL_REQUESTS_AFTER_MERGE = 0
```

The exact root recursion inputs were `build/DEPS`, `buildtools/DEPS`, and `third_party/instrumented_libs/DEPS`. 004C1DM explicitly did not promote subordinate or test-fixture files merely because they were named `DEPS`.

## 3. Exact root input identities

| Logical root | Path | Git blob | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| `build` | `build/DEPS` | `9bafc137a30cbc52b1acf24a08f5ce4b3908e73b` | 3703 | `a2b844fcfe7357580ea6691fc0c94157d1b439b4bdc95b56c1c7fcf5fe24e8c6` |
| `buildtools` | `buildtools/DEPS` | `373b526bae915b1aad8248983d45ff22d3f9a20b` | 2000 | `72317f8d247e4a40a8629efaf0d267302258715ddc38b4d28448f1fecb4bb9b4` |
| `third_party/instrumented_libs` | `third_party/instrumented_libs/DEPS` | `21357bcdcf6dca6292b8df75ec9dce0f89a0d424` | 1127 | `1405cef79e0ba612179aab38100dd704f65db8a0e24b2aa8abb841cd20b5afcc` |

Corresponding acquired roots remained unchanged and unexecuted:

```text
build
COMMIT = 06d247cb917bb5fac3103b1b7dccb75368a553ce
TREE = e01b69d7c03521219d8b95e0e5b49af18be45c5d

buildtools
COMMIT = 6a18683f555b4ac8b05ac8395c29c84483ac9588
TREE = 8a36f872e24a56fe517682e14bc897ceb28f8058

third_party/instrumented_libs
COMMIT = e8cb570a9a2ee9128e2214c73417ad2a3c47780b
TREE = 651502f72d94a6c75baf64edb2090a894af13d63
```

## 4. Exact depot_tools semantic basis

004C1DN read exact already-acquired source text only; it did not import or execute `depot_tools`.

```text
DEPOT_TOOLS_COMMIT = 6235028c6b18b73e68f5414f935ec537a25ea51a
DEPOT_TOOLS_TREE = 0b08d0dbc2f75f2b44fb0b46ae7133e9bceb9e44
```

| Path | Git blob | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `gclient.py` | `1cc8fb8da0d93acc8f32eceb49fe4aa4bf95945c` | 192738 | `0caf3dd2c05f993c46474ccf49a5c7bb97ad376a4adc810c516bd8eef417b3da` |
| `gclient_eval.py` | `94874e3ce54f5f52a356ce0b1f2b319ad4cc303f` | 37411 | `40473804d1d21b39012a7ff286a595ee938e9b46cc77870e594e08ea78ae5fa4` |
| `tests/gclient_test.py` | `00cdbd7da1569162628cd524f1edd6d199a8787c` | 66701 | `80d022a725109961a452929cfe5ef04e1bd99baf7930ec20cee22632eafaa5fc` |

The inspected exact source establishes the bounded rules consumed here:

1. `recursedeps` selectively overrides default no-recursion behavior per dependency.
2. A child dependency receives `should_recurse = name in self.recursedeps`.
3. String `recursedeps` entries use the default dependency file; two-string entries may name an alternate dependency file.
4. `use_relative_paths` prefixes dependency and recursion names with the logical parent path.
5. `gclient_eval.EvaluateCondition` recursively resolves string variables, including scalar strings used in comparisons, while boolean operators require boolean operands.
6. The `recursedeps` schema admits only explicit supported entries.
7. Exact recursion tests show traversal continues only along the explicit `recursedeps` chain and stops when a child declares no further recursion.

Therefore filename presence alone is not recursion authority.

## 5. Static target context

The context is the inherited static build-target context from 004C1DL and the 004C1DN authority, not a claim about the physical host used to run the parser.

```text
TARGET_OS = linux
TARGET_CPU = x64
HOST_OS_CONTEXT = linux
HOST_CPU_CONTEXT = x64
CHECKOUT_LINUX = true
CHECKOUT_X64 = true
CHECKOUT_X86 = false
CHECKOUT_ARM = false
CHECKOUT_ARM64 = false
CHECKOUT_MIPS = false
CHECKOUT_MIPS64 = false
CHECKOUT_PPC = false
CHECKOUT_RISCV64 = false
CHECKOUT_S390 = false
CHECKOUT_LOONG64 = false
CHECKOUT_CONFIGURATION = default
CHECKOUT_INSTRUMENTED_LIBRARIES = true
NON_GIT_SOURCE = True
```

The bounded evaluator fails closed on unsupported AST, unresolved `Var()` use, unsupported dependency types, invalid recursion entries, ambiguous syntax, and dependency conditions that do not resolve to booleans.

## 6. Preserved static-analysis failure history

004C1DN required forward-only repair. Failed attempts were retained.

### V1 — semantic-anchor excerpt range defect

V1 failed before static expansion because its copied `gclient.py` excerpt ended before the required `gclient_eval.Parse(...)` semantic anchor while the evaluator required that anchor.

```text
V1_RESULT = FAIL_CLOSED_BEFORE_STATIC_EXPANSION
V1_NETWORK = 0
V1_REPOSITORY_MUTATION = 0
V1_ACQUIRED_SOURCE_EXECUTION = 0
```

### V2 — scalar condition model defect

V2 repaired the excerpt range but incorrectly required every recursive string-variable evaluation to produce a boolean. Exact `depot_tools` permits a scalar such as `host_os -> "linux"` before comparison.

```text
V2_RESULT = FAIL_CLOSED_BEFORE_STATIC_EXPANSION
V2_NETWORK = 0
V2_REPOSITORY_MUTATION = 0
V2_ACQUIRED_SOURCE_EXECUTION = 0
```

### V3 — corrected bounded evaluator

V3 changed only the local static model to match exact scalar/boolean recursion behavior and removed comparison behavior broader than the inspected source.

```text
V3_RESULT = PASS
V3_REPLAYS = 3
V3_REPLAY_HASH_SETS_IDENTICAL = TRUE
V3_STDERR_BYTES_RUN_1 = 0
V3_STDERR_BYTES_RUN_2 = 0
V3_STDERR_BYTES_RUN_3 = 0
STATIC_EVALUATOR_BYTES = 14502
STATIC_EVALUATOR_SHA256 = c89313fb5310a6172945fa403de8a520a87357f8a2d4e83924c4acd58c194160
```

## 7. Independent cross-check history

A second Signthos-authored verifier used `ast.literal_eval` for literal root structures and an independently implemented condition evaluator.

Cross-check V1 failed closed because it conflated an unknown scalar name such as `linux` with a context lookup cycle. The failed script and stderr remain preserved. Cross-check V2 repaired only that distinction and passed:

```text
INDEPENDENT_CROSSCHECK_V2 = PASS
INDEPENDENT_CROSSCHECK_V2_STDERR_BYTES = 0
INDEPENDENT_CROSSCHECK_V2_SCRIPT_BYTES = 3497
INDEPENDENT_CROSSCHECK_V2_SCRIPT_SHA256 = 4f74b6082b33bab52359ae0ae042cbad253c3aa1fc6ce5c9796a9a9e83d0c3ed
INDEPENDENT_CROSSCHECK_V2_RESULT_BYTES = 682
INDEPENDENT_CROSSCHECK_V2_RESULT_SHA256 = 341b3be65b76eaaa5412c7357c4ce9ee9e2d89834db443dd84793b33e04aeba8
```

It reproduced all aggregate counts, the exact admitted byte total, zero Git records, zero CIPD records, zero hook assignments, and zero `recursedeps` assignments.

## 8. Root expansion — build

`build/DEPS` uses `use_relative_paths = True` and declares eight GCS dependency records.

```text
BUILD_DEPENDENCY_RECORDS_TOTAL = 8
BUILD_GCS_DEPENDENCY_RECORDS_ADMITTED = 2
BUILD_GCS_DEPENDENCY_RECORDS_EXCLUDED = 6
BUILD_GCS_OBJECTS_TOTAL = 8
BUILD_GCS_OBJECTS_ADMITTED = 2
BUILD_GCS_ADMITTED_BYTES = 41568384
BUILD_HOOKS = 0
BUILD_RECURSEDEPS = 0
```

Admitted objects:

```text
build/linux/debian_bullseye_amd64-sysroot
condition = checkout_linux and checkout_x64
bucket = chrome-linux-sysroot
generation = 1741221486381719
object_name = 36a164623d03f525e3dfb783a5e9b8a00e98e1ddd2b5cff4e449bd016dd27e50
sha256 = 36a164623d03f525e3dfb783a5e9b8a00e98e1ddd2b5cff4e449bd016dd27e50
bytes = 20781612

build/linux/debian_bullseye_i386-sysroot
condition = checkout_linux and (checkout_x86 or checkout_x64)
bucket = chrome-linux-sysroot
generation = 1741221485445080
object_name = 63f0e5128b84f7b0421956a4a40affa472be8da0e58caf27e9acbc84072daee7
sha256 = 63f0e5128b84f7b0421956a4a40affa472be8da0e58caf27e9acbc84072daee7
bytes = 20786772
```

The ARM64, ARMHF, MIPS64EL, MIPSEL, PPC64EL, and RISCV64 records are excluded under x64.

## 9. Root expansion — buildtools

`buildtools/DEPS` uses `use_relative_paths = True` and declares four GCS dependency records.

```text
BUILDTOOLS_DEPENDENCY_RECORDS_TOTAL = 4
BUILDTOOLS_GCS_DEPENDENCY_RECORDS_ADMITTED = 1
BUILDTOOLS_GCS_DEPENDENCY_RECORDS_EXCLUDED = 3
BUILDTOOLS_GCS_OBJECTS_TOTAL = 4
BUILDTOOLS_GCS_OBJECTS_ADMITTED = 1
BUILDTOOLS_GCS_ADMITTED_BYTES = 3899440
BUILDTOOLS_HOOKS = 0
BUILDTOOLS_RECURSEDEPS = 0
```

Admitted object:

```text
buildtools/linux64-format
condition = host_os == "linux"
bucket = chromium-clang-format
generation = 1738622384130717
object_name = 79a7b4e5336339c17b828de10d80611ff0f85961
sha256 = 889266a51681d55bd4b9e02c9a104fa6ee22ecdfa7e8253532e5ea47e2e4cb4a
bytes = 3899440
output_file = clang-format
```

Windows, macOS x64, and macOS arm64 formatter records are excluded.

## 10. Root expansion — instrumented libraries

`third_party/instrumented_libs/DEPS` uses `use_relative_paths = True`, declares one admitted GCS dependency record, and contains two admitted objects.

```text
INSTRUMENTED_LIBS_DEPENDENCY_RECORDS_TOTAL = 1
INSTRUMENTED_LIBS_GCS_DEPENDENCY_RECORDS_ADMITTED = 1
INSTRUMENTED_LIBS_GCS_DEPENDENCY_RECORDS_EXCLUDED = 0
INSTRUMENTED_LIBS_GCS_OBJECTS_TOTAL = 2
INSTRUMENTED_LIBS_GCS_OBJECTS_ADMITTED = 2
INSTRUMENTED_LIBS_GCS_ADMITTED_BYTES = 1008260707
INSTRUMENTED_LIBS_HOOKS = 0
INSTRUMENTED_LIBS_RECURSEDEPS = 0
```

Admitted objects:

```text
third_party/instrumented_libs/binaries
condition = checkout_instrumented_libraries and non_git_source
bucket = chromium-instrumented-libraries
generation = 1717631892393679
object_name = 9329714322846c2b47dd518ac08e437b8c7d8075c514dc7ec3eb3e3a1e0faeb6
sha256 = 9329714322846c2b47dd518ac08e437b8c7d8075c514dc7ec3eb3e3a1e0faeb6
bytes = 514553540

third_party/instrumented_libs/binaries
condition = checkout_instrumented_libraries and non_git_source
bucket = chromium-instrumented-libraries
generation = 1717631898740987
object_name = a749c9e47cb4584bc944c887440b1d1c51501f7d9bb99eea276ebcba0aa6c1ec
sha256 = a749c9e47cb4584bc944c887440b1d1c51501f7d9bb99eea276ebcba0aa6c1ec
bytes = 493707167
```

## 11. Aggregate recursive expansion result

```text
ROOT_DEPS_FILES = 3
DEPENDENCY_RECORDS_TOTAL = 13
DEPENDENCY_RECORDS_ADMITTED = 4
DEPENDENCY_RECORDS_EXCLUDED = 9

GIT_RECORDS_TOTAL = 0
GIT_RECORDS_ADMITTED = 0
CIPD_RECORDS_TOTAL = 0
CIPD_RECORDS_ADMITTED = 0
GCS_DEPENDENCY_RECORDS_TOTAL = 13
GCS_DEPENDENCY_RECORDS_ADMITTED = 4
GCS_DEPENDENCY_RECORDS_EXCLUDED = 9

GCS_OBJECTS_TOTAL = 14
GCS_OBJECTS_ADMITTED = 5
GCS_OBJECTS_EXCLUDED = 9
GCS_ADMITTED_BYTES = 1053728531

HOOKS_TOTAL = 0
RECURSEDEPS_TOTAL = 0
RECURSIVE_FRONTIER = EMPTY
UNSUPPORTED_COUNT = 0
```

Critical replay-1 identities:

```text
DEPENDENCY_RECORDS_SHA256 = 1544db938a8d3245c7be56b24cdea479446ba71f7d089ce16d7e599e0f561a05
GCS_OBJECT_RECORDS_SHA256 = 5342aa15f789221e485606a366e71de396ad641714769582f14b31cb523c1241
RECURSION_RECORDS_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
UNSUPPORTED_SHA256 = 37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
SUMMARY_SHA256 = 7c4dd67199e7cf040026c262e61d0226a42a15709819af07ac9dae2aaf005c42
REPLAY_HASH_SET_SHA256 = 2555281c0cc3e3cf21c783d5c3bb5a1d170c63a96712cbc77b91ff992b49aaa2
```

All three replay hash sets are byte-identical.

## 12. Static recursion closure consequence

Exact `depot_tools` semantics require explicit `recursedeps` membership before a child's `DEPS` is parsed. None of the three exact root files declares any `recursedeps` entry.

```text
STATIC_TRANSITIVE_RECURSION_CLOSURE = ESTABLISHED
RECURSIVE_DEPS_FRONTIER_AFTER_004C1DN = EMPTY
ADDITIONAL_RECURSIVE_GIT_ROOT_ACQUISITION_REQUIRED_FOR_DEPS_EXPANSION = 0
```

This conclusion is bounded to the exact 004C1DL/004C1DM selector graph, exact root bytes, exact acquired `depot_tools` semantics, and exact Linux/x64/default context.

It does not imply that all admitted dependency/tool bytes are present. The five newly admitted nested GCS objects are selectors only and were not downloaded.

## 13. External evidence closure

```text
V3_EVIDENCE_ROOT = /private/tmp/signthos-004c1dn-static-recursive-deps-v3-20260912T024025Z-79065
EVIDENCE_PAYLOAD_FILES = 51
EVIDENCE_PAYLOAD_BYTES = 99171
EVIDENCE_INVENTORY_SHA256 = 05bdb4edffe8e8e1bec46cdac111988d2c1a57b1bc1e7456ff586a2cbb8f25d9
QUALIFICATION_SUMMARY_SHA256 = 0c6c8f84d7230ee1d38e69f795b97222b1fe1a10daf7a92003f057450ed54c2f
ATTEMPT_HISTORY_SHA256 = 90a4e55b5cdcf0db273e0d9c9b1e103cd45e86604cef45053a2cf29deb22aafb
DEPOT_TOOLS_SOURCE_IDENTITIES_SHA256 = 003a7e89b63107df53f3d30d5be589896e8085d00b249107ef99c09c3b649b1a
```

The inventory scope excludes only `evidence-inventory.jsonl` and `evidence-summary.json` themselves to avoid circular hashing. Preserved attempt history binds both failed evaluator roots and both independent cross-check attempts.

## 14. Preserved qualification-document launcher failure

The first repository-document writer failed before staging or commit. Its zsh script used the special parameter name `path`, which is tied to `PATH`; assigning the document pathname to `path` replaced command lookup state. Shell redirection created the target as an untracked zero-byte file before `cat` lookup failed.

The failure was inspected before repair:

```text
DOCUMENT_LAUNCH_V1 = FAIL_CLOSED_BEFORE_STAGING
TARGET_FILE_STATE_AFTER_FAILURE = UNTRACKED / 0 BYTES
STAGING = 0
COMMITS = 0
NETWORK = 0
PUSH = 0
```

An initial external failure note incorrectly stated that the target file had not been created. That note was not rewritten. A separate correction record binds the observed zero-byte target and explains the zsh `path`/`PATH` behavior.

```text
DOCUMENT_LAUNCH_V1_INITIAL_NOTE_SHA256 = c19cea317cc0e6bbb70e5fabea830c3d74bf74d8163c739421b0426209c998c9
DOCUMENT_LAUNCH_V1_CORRECTION_SHA256 = b046bae703aa2f1faa0548e5b639cb64330d7197f9a974a73f98935938bd4a90
```

The repair was forward-only: both external records remain, and the same untracked zero-byte target was populated before its first staging/commit. No Git history was rewritten.

## 15. What 004C1DN establishes

004C1DN establishes only:

1. exact canonical root `DEPS` bytes were statically parsed without executing acquired source;
2. relevant exact `depot_tools` recursion and condition semantics were derived from exact already-acquired source text;
3. the Linux/x64/default expansion contains 13 GCS dependency records, 4 admitted;
4. those admitted records contain exactly 5 admitted GCS objects totaling 1,053,728,531 bytes;
5. no nested Git or CIPD selector is introduced by the three root files;
6. no hook is declared by the three root files;
7. no further `recursedeps` entry exists;
8. the static recursive selector frontier is empty;
9. all failed evaluator, cross-check, and qualification-document launcher attempts remain explicit;
10. V3 and corrected independent cross-check agree with `UNSUPPORTED_COUNT = 0`.

## 16. Explicit non-grants

```text
NEW_GIT_ACQUISITION = NOT_AUTHORIZED
FULL_ADMITTED_DEPENDENCY_BYTE_ACQUISITION = NOT_ESTABLISHED
CIPD_INSTANCE_IDS = NOT_ESTABLISHED
CIPD_METADATA_OR_BYTE_ACQUISITION = NOT_AUTHORIZED
CIPD_INSTANCE_RESOLUTION_EXECUTION = NOT_AUTHORIZED
CIPD_CLIENT_BOOTSTRAP_OR_EXECUTION = NOT_AUTHORIZED
GCS_OBJECT_DOWNLOAD = NOT_AUTHORIZED
GCLIENT_EXECUTION = NOT_AUTHORIZED
HOOK_EXECUTION = NOT_AUTHORIZED
GN_EXECUTION = NOT_AUTHORIZED
NINJA_EXECUTION = NOT_AUTHORIZED
CLANG_EXECUTION = NOT_AUTHORIZED
RUST_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
CONTAINER_OR_BUILDER_IMAGE_EXECUTION = NOT_AUTHORIZED
PDFIUM_CONFIGURATION = NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
PDFIUM_LINK_EXECUTION = NOT_AUTHORIZED
PDFIUM_RUNTIME = NOT_AUTHORIZED
REPOSITORY_SOURCE_IMPORT = NOT_AUTHORIZED
NOTICE_SBOM_PROVENANCE_MUTATION = NOT_AUTHORIZED
PROVIDER_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE_OR_DEPLOYMENT = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
WAIVER = NO
```

## 17. Candidate and merge discipline

This document is the sole repository path authorized by `github:issue-comment:5642943319`.

```text
COMMITS = 1
CHANGED_FILES = 1
DIFF_CHECK = PASS
WORKTREE = CLEAN
FRESH_INDEPENDENT_SUBSTANTIVE_EXACT_HEAD_REVIEW = REQUIRED
UNRESOLVED_MATERIAL_REVIEW_THREADS = 0
EXPECTED_HEAD_MERGE = REQUIRED
```

Bot summaries, skipped review, requested-reviewer state, reactions, billing blocks, unavailable workflows, or pending non-required bot contexts are not substantive PASS evidence.

Any material repair must be forward-only in a new commit, and a changed head requires a fresh exact-head substantive review.

## 18. Successor boundary

004C1DN does not authorize its successor.

After canonical merge and mechanical post-merge verification, Issue #7 must be reconciled again from live truth. The next unit may reason from the now-closed recursive selector frontier, but it must separately establish the smallest authorized acquisition/identity step for the remaining admitted selectors. Unresolved CIPD instance identity and all unacquired Git/GCS/CIPD bytes remain fail-closed boundaries.
