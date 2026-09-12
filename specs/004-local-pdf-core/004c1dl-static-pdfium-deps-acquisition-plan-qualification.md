# 004C1DL — Static PDFium DEPS Dependency and Tool Acquisition Plan Qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_PLAN_PASS / ZERO_ACQUIRED_SOURCE_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `05bdfb10fff7830556ace01e9062ac5eab4a9176`
Canonical base tree: `ec734c0ffa338842e8ad8b462c1e53c4935c83e0`
Runtime authority: `github:issue-comment:5642621613`
Runtime closeout and document authority: `github:issue-comment:5642752988`

## 1. Purpose and authority boundary

004C1DK canonically acquired and qualified the exact PDFium source root and exact `depot_tools` source root without executing either source tree. 004C1DL closes only the next prerequisite: derive a deterministic Linux/amd64 top-level dependency and tool acquisition plan from the exact acquired PDFium `DEPS` bytes and the exact acquired `depot_tools` semantics, without executing `DEPS`, `depot_tools`, `gclient`, CIPD, hooks, toolchains, containers, or PDFium.

```text
004C1DL_AUTHORITY = STATIC_PDFIUM_DEPS_DEPENDENCY_AND_TOOL_ACQUISITION_PLAN_ONLY
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1dl-static-pdfium-deps-acquisition-plan-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
DEPS_EXECUTION = 0
DEPOT_TOOLS_EXECUTION = 0
GCLIENT_EXECUTION = 0
CIPD_EXECUTION = 0
HOOK_EXECUTION = 0
NETWORK_ACQUISITION = 0
DEPENDENCY_BYTES_ACQUIRED = 0
TOOLCHAIN_EXECUTION = 0
PDFIUM_BUILD_EXECUTION = 0
WAIVER = NO
```

## 2. Canonical predecessor and exact inputs

```text
004C1DK = CLOSED_CANONICAL
004C1DK_PR = #204
004C1DK_MERGE = 05bdfb10fff7830556ace01e9062ac5eab4a9176
004C1DK_MERGE_TREE = ec734c0ffa338842e8ad8b462c1e53c4935c83e0
PDFIUM_COMMIT = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
PDFIUM_DEPS_GIT_BLOB = 30e0cf22c37d8cdb94bd64fd01aab3b0abe0eeb6
PDFIUM_DEPS_BYTES = 38648
PDFIUM_DEPS_SHA256 = f456f116824717cde93a32fa9cb2df1bae776226dadfa225a211dd5686ed05f1
DEPOT_TOOLS_COMMIT = 6235028c6b18b73e68f5414f935ec537a25ea51a
TARGET_BUILDER_PLATFORM = linux/amd64
GCLIENT_HOST_CPU_CLASS = x64
CHECKOUT_CONFIGURATION = default
DEPS_OS_CLASS = unix
```

## 3. Static-only method

The exact `DEPS` bytes were parsed with Python `ast.parse` only. The evaluator permits a bounded value surface consisting of constants, lists, tuples, dictionaries, string/list concatenation, `Var("name")`, and `Str("literal")`. Conditions permit only constants, variable references, `not`, boolean `and`/`or`, equality/inequality, membership comparisons, and literal lists/tuples. Any unsupported construct fails closed.

No Python `exec`, Python `eval`, import of acquired code, `gclient_eval.Parse`, `gclient`, CIPD client, hook, or acquired-source script was run. Exact `depot_tools` source was read only to bind semantics such as built-in variables, string-condition recursion, GCS object condition merging, Cog handling, and host platform mapping.

## 4. Preserved fail-closed parser history

V1 failed before producing a plan because it incorrectly treated the literal data value `checkout_configuration = "default"` as a condition expression. V2 failed before producing a plan because `host_cpu` had not yet been bound. Both failures are preserved in the external evidence root. Neither attempt executed acquired source or performed network access. V4 corrected only the evaluator logic and target built-in binding; it did not change the acquired input bytes.

```text
V1_RESULT = FAILED_FAIL_CLOSED / NO_PLAN
V2_RESULT = FAILED_FAIL_CLOSED / NO_PLAN
V4_RESULT = PASS
V4_UNSUPPORTED_COUNT = 0
STATIC_EVALUATOR_V4_SHA256 = b3f3ab70b48b5a6ecd02fa54a7d9b93236bec0a66bb44baf0ecf2986f7a8b9ab
```

## 5. Condition semantics and target context

The acquired PDFium `DEPS` sets `non_git_source` to the condition string `True`. Exact acquired `depot_tools` condition semantics recursively evaluate string variables; unknown names become strings. The exact `depot_tools` built-in surface supplies host/target booleans, and its CIPD bootstrap wrapper maps Linux `x86_64`/`amd64` to host platform `linux-amd64`.

```text
host_os = linux
host_cpu = x64
checkout_linux = true
checkout_x64 = true
checkout_mac = false
checkout_win = false
checkout_android = false
checkout_rust = false
checkout_skia = true
checkout_testing_corpus = true
checkout_v8 = true
non_git_source = true
```

## 6. Deterministic top-level plan result

```text
DEPS_TOTAL = 54
DEPS_ADMITTED = 41
DEPS_EXCLUDED = 13
ADMITTED_GIT_DECLARATIONS = 33
ADMITTED_CIPD_DECLARATIONS = 6
ADMITTED_GCS_DEPENDENCY_DECLARATIONS = 2
GCS_OBJECTS_TOTAL = 26
GCS_OBJECTS_ADMITTED = 3
GCS_OBJECTS_EXCLUDED = 23
GCS_ADMITTED_BYTES = 329212260
HOOKS_TOTAL = 12
HOOKS_ADMITTED_BY_CONDITION = 5
HOOKS_EXCLUDED_BY_CONDITION = 7
```

Condition admission is a planning result only. It does not authorize fetching a dependency or executing an admitted hook.

## 7. Exact admitted Git selectors

| Path | Origin | Exact revision | Reuse |
| --- | --- | --- | --- |
| `base/allocator/partition_allocator` | `https://chromium.googlesource.com/chromium/src/base/allocator/partition_allocator.git` | `baaa6670c23c19485d0a5a538bc43d3332def328` | not acquired |
| `build` | `https://chromium.googlesource.com/chromium/src/build.git` | `06d247cb917bb5fac3103b1b7dccb75368a553ce` | not acquired |
| `buildtools` | `https://chromium.googlesource.com/chromium/src/buildtools.git` | `6a18683f555b4ac8b05ac8395c29c84483ac9588` | not acquired |
| `testing/corpus` | `https://pdfium.googlesource.com/pdfium_tests` | `e64acd24f00d365c3f7c60e9c4eff16ce2d71f5d` | not acquired |
| `third_party/abseil-cpp` | `https://chromium.googlesource.com/chromium/src/third_party/abseil-cpp.git` | `675d3d37ecbec78fd51378c6774c45715b1e4382` | not acquired |
| `third_party/brotli` | `https://chromium.googlesource.com/chromium/src/third_party/brotli.git` | `ac16a36bc55c4c896135084e878f0d6a2f9b347e` | not acquired |
| `third_party/clang-format/script` | `https://chromium.googlesource.com/external/github.com/llvm/llvm-project/clang/tools/clang-format.git` | `c2725e0622e1a86d55f14514f2177a39efea4a0e` | not acquired |
| `third_party/depot_tools` | `https://chromium.googlesource.com/chromium/tools/depot_tools.git` | `6235028c6b18b73e68f5414f935ec537a25ea51a` | already acquired by 004C1DK |
| `third_party/dragonbox/src` | `https://chromium.googlesource.com/external/github.com/jk-jeon/dragonbox.git` | `beeeef91cf6fef89a4d4ba5e95d47ca64ccb3a44` | not acquired |
| `third_party/fast_float/src` | `https://chromium.googlesource.com/external/github.com/fastfloat/fast_float.git` | `cb1d42aaa1e14b09e1452cfdef373d051b8c02a4` | not acquired |
| `third_party/fp16/src` | `https://chromium.googlesource.com/external/github.com/Maratyszcza/FP16.git` | `3d2de1816307bac63c16a297e8c4dc501b4076df` | not acquired |
| `third_party/freetype/src` | `https://chromium.googlesource.com/chromium/src/third_party/freetype2.git` | `b91f75bd02db43b06d634591eb286d3eb0ce3b65` | not acquired |
| `third_party/googletest/src` | `https://chromium.googlesource.com/external/github.com/google/googletest.git` | `4fe3307fb2d9f86d19777c7eb0e4809e9694dde7` | not acquired |
| `third_party/harfbuzz-ng/src` | `https://chromium.googlesource.com/external/github.com/harfbuzz/harfbuzz.git` | `fa2908bf16d2ccd6623f4d575455fea72a1a722b` | not acquired |
| `third_party/highway/src` | `https://chromium.googlesource.com/external/github.com/google/highway.git` | `84379d1c73de9681b54fbe1c035a23c7bd5d272d` | not acquired |
| `third_party/icu` | `https://chromium.googlesource.com/chromium/deps/icu.git` | `a86a32e67b8d1384b33f8fa48c83a6079b86f8cd` | not acquired |
| `third_party/instrumented_libs` | `https://chromium.googlesource.com/chromium/third_party/instrumented_libraries.git` | `e8cb570a9a2ee9128e2214c73417ad2a3c47780b` | not acquired |
| `third_party/jinja2` | `https://chromium.googlesource.com/chromium/src/third_party/jinja2.git` | `c3027d884967773057bf74b957e3fea87e5df4d7` | not acquired |
| `third_party/libc++/src` | `https://chromium.googlesource.com/external/github.com/llvm/llvm-project/libcxx.git` | `7ab65651aed6802d2599dcb7a73b1f82d5179d05` | not acquired |
| `third_party/libc++abi/src` | `https://chromium.googlesource.com/external/github.com/llvm/llvm-project/libcxxabi.git` | `8f11bb1d4438d0239d0dfc1bd9456a9f31629dda` | not acquired |
| `third_party/libjpeg_turbo` | `https://chromium.googlesource.com/chromium/deps/libjpeg_turbo.git` | `6bb85251a8382b5e07f635a981ac685cc5ab5053` | not acquired |
| `third_party/libpng` | `https://chromium.googlesource.com/chromium/src/third_party/libpng.git` | `172f83835c98264e6eefdbe8ae82dc08be337ad0` | not acquired |
| `third_party/llvm-libc/src` | `https://chromium.googlesource.com/external/github.com/llvm/llvm-project/libc.git` | `603c242115079d3a208638a6e56f842c0801d0bd` | not acquired |
| `third_party/markupsafe` | `https://chromium.googlesource.com/chromium/src/third_party/markupsafe.git` | `4256084ae14175d38a3ff7d739dca83ae49ccec6` | not acquired |
| `third_party/nasm` | `https://chromium.googlesource.com/chromium/deps/nasm.git` | `af5eeeb054bebadfbb79c7bcd100a95e2ad4525f` | not acquired |
| `third_party/simdutf` | `https://chromium.googlesource.com/chromium/src/third_party/simdutf` | `f7356eed293f8208c40b3c1b344a50bd70971983` | not acquired |
| `third_party/skia` | `https://skia.googlesource.com/skia.git` | `c497e689bf3db5c8efe853dae45dd61867d3363a` | not acquired |
| `third_party/test_fonts` | `https://chromium.googlesource.com/chromium/src/third_party/test_fonts.git` | `7f51783942943e965cd56facf786544ccfc07713` | not acquired |
| `third_party/zlib` | `https://chromium.googlesource.com/chromium/src/third_party/zlib.git` | `980253c1cc835c893c57b5cfc10c5b942e10bc46` | not acquired |
| `tools/clang` | `https://chromium.googlesource.com/chromium/src/tools/clang` | `a1542f2952bcc47640d5cfbc39bb8f6926a1bf6a` | not acquired |
| `tools/code_coverage` | `https://chromium.googlesource.com/chromium/src/tools/code_coverage.git` | `fc75c61d3a98a78ff83940366aeba83ddeb28179` | not acquired |
| `tools/memory` | `https://chromium.googlesource.com/chromium/src/tools/memory` | `16429092be4bb5160bed0ad763bd4c13f1f52990` | not acquired |
| `v8` | `https://chromium.googlesource.com/v8/v8.git` | `b3995dff9fc0df19d00743da41a567da5eb8318c` | not acquired |

All 33 Git revisions are exact 40-hex selectors. One selector, `third_party/depot_tools`, points to the already-acquired exact `depot_tools` commit and may be reused as evidence by a later authorized acquisition unit; 004C1DL itself performs no reuse/copy/import action.

## 8. Exact admitted CIPD selectors

| Path | Package declaration | Version selector | Resolution state |
| --- | --- | --- | --- |
| `buildtools/linux64` | `gn/gn/linux-${{arch}}` | `git_revision:bd3356ac13f411b521b16b11da12cec5150e917c` | template; client expansion not executed |
| `buildtools/reclient` | `infra/rbe/client/${{platform}}` | `re_client_version:0.185.0.db415f21-gomaip` | template; client expansion not executed |
| `third_party/ninja` | `infra/3pp/tools/ninja/${{platform}}` | `version:3@1.12.1.chromium.4` | template; client expansion not executed |
| `third_party/siso/cipd` | `build/siso/${{platform}}` | `git_revision:ed57223a0bd19f8f2767a01b24311e8843ea2890` | template; client expansion not executed |
| `tools/resultdb` | `infra/tools/result_adapter/${{platform}}` | `git_revision:5fb3ca203842fd691cab615453f8e5a14302a1d8` | template; client expansion not executed |
| `tools/skia_goldctl/linux` | `skia/tools/goldctl/linux-amd64` | `git_revision:f809b7407f82c9bdb3324152b09fb6e0304396d6` | literal package name |

Five package declarations contain `${{platform}}` or `${{arch}}`. Exact acquired `depot_tools` proves the host wrapper maps Linux x86_64/amd64 to CIPD platform `linux-amd64`, but the CIPD client `expand-package-name` command was not executed. No expanded package identity, version instance ID, archive digest, or installed file identity is therefore claimed.

## 9. Exact admitted GCS byte selectors

| Path | Bucket/object | SHA-256 | Bytes | Generation |
| --- | --- | --- | ---: | ---: |
| `third_party/llvm-build/Release+Asserts` | `chromium-browser-clang/Linux_x64/clang-llvmorg-23-init-2224-g5bd8dadb-1.tar.xz` | `d373cde5b6f1c0da245ebcad93e4883252323c1ff283df96f0eb2e9180f1a537` | 57692132 | 1769798229467453 |
| `third_party/llvm-build/Release+Asserts` | `chromium-browser-clang/Linux_x64/llvmobjdump-llvmorg-23-init-2224-g5bd8dadb-1.tar.xz` | `28df84ef25bae64ab82a48295bd09aa6689e436449bd78cdc83f58ef05bfdd6a` | 5818392 | 1769798229787736 |
| `third_party/rust-toolchain` | `chromium-browser-clang/Linux_x64/rust-toolchain-7d8ebe3128fc87f3da1ad64240e63ccf07b8f0bd-1-llvmorg-23-init-2224-g5bd8dadb.tar.xz` | `aff16507e3f1623a9948cf9b14bd90827fd702b58adbc5f5cc277b60682a6608` | 265701736 | 1769798222913076 |

These three objects total `329212260` bytes. Their exact SHA-256 and generation selectors are source facts only; no GCS object was downloaded by 004C1DL.

## 10. Excluded top-level dependency declarations

| Path | Kind | Condition |
| --- | --- | --- |
| `buildtools/mac` | `cipd` | `host_os == "mac"` |
| `buildtools/win` | `cipd` | `host_os == "win"` |
| `testing/scripts/rust` | `git` | `checkout_rust` |
| `third_party/android_toolchain/ndk` | `cipd` | `checkout_android_native_support` |
| `third_party/catapult` | `git` | `checkout_android` |
| `third_party/cpu_features/src` | `git` | `checkout_android` |
| `third_party/libunwind/src` | `git` | `checkout_android` |
| `third_party/rust` | `git` | `checkout_rust` |
| `tools/rust` | `git` | `checkout_rust` |
| `tools/skia_goldctl/mac_amd64` | `cipd` | `checkout_mac` |
| `tools/skia_goldctl/mac_arm64` | `cipd` | `checkout_mac` |
| `tools/skia_goldctl/win` | `cipd` | `checkout_win` |
| `tools/win` | `git` | `checkout_win` |

These 13 declarations evaluate false for the selected Linux/x64/default context. Their exclusion is not a statement that the upstream project never uses them; it is limited to this exact target context.

## 11. Hook condition inventory

| Hook | Condition | Static admission |
| --- | --- | --- |
| `ciopfs_linux` | `checkout_win and host_os == "linux"` | excluded |
| `configure_reclient_cfgs` | `not download_remoteexec_cfg` | admitted |
| `configure_siso` | `-` | admitted |
| `disable_depot_tools_selfupdate` | `-` | admitted |
| `download_and_configure_reclient_cfgs` | `download_remoteexec_cfg and host_os == "win"` | excluded |
| `download_and_configure_reclient_cfgs` | `download_remoteexec_cfg and not host_os == "win"` | excluded |
| `dsymutil_mac_arm64` | `host_os == "mac" and host_cpu == "arm64"` | excluded |
| `dsymutil_mac_x64` | `host_os == "mac" and host_cpu == "x64"` | excluded |
| `lastchange` | `-` | admitted |
| `mac_toolchain` | `checkout_mac` | excluded |
| `test_fonts` | `-` | admitted |
| `win_toolchain` | `checkout_win` | excluded |

Five hooks are condition-admitted, but **zero hooks were executed**. Hook admission is retained only so a later execution authority can explicitly decide whether and how to run or replace each hook.

## 12. Recursive dependency frontier

The exact top-level `recursedeps` surface is:

```text
build
buildtools
third_party/instrumented_libs
```

Those roots have not been acquired by 004C1DL, so their nested `DEPS` bytes are unavailable for canonical static planning. Consequently this document establishes a top-level acquisition plan, **not full transitive dependency closure**. A later authorized unit must acquire the exact admitted top-level roots first, then statically qualify recursive `DEPS` surfaces before full build execution can be claimed.

## 13. Selector manifest and deterministic replay evidence

```text
SELECTOR_RECORDS = 42
GIT_SELECTORS = 33
CIPD_SELECTORS = 6
GCS_OBJECT_SELECTORS = 3
GIT_SELECTOR_ALREADY_ACQUIRED_REUSABLE = 1
CIPD_TEMPLATE_SELECTORS_REQUIRING_PLATFORM_RESOLUTION = 5
GCS_TOTAL_EXACT_BYTES = 329212260
SELECTORS_SHA256 = 6468c8d3c3abce9a85a2bd7d40f9f9b99278e590b773b442877c783d7d1216b6
SELECTOR_SUMMARY_SHA256 = 44bdf4c1fb780509ba34127b790826b5ca773653d69e27fe7f2b333a1f40b037
PLAN_SUMMARY_V4_SHA256 = 55e85d24f026ec0f19839d76121695ddfacec2d5a7bd80477ea6e3f00527e3fa
DEPENDENCY_PLAN_V4_SHA256 = 223180dc2f45720dfaa1db8d2001ece6e3dc202bc229dc0a6d76e4c1e5214094
GCS_OBJECT_PLAN_V4_SHA256 = 2ba63d81e63563169f904c84453deb32f36d33348f3f39349368cc746b4808a0
HOOKS_PLAN_V4_SHA256 = 52e4b261b265c51953c2315f106a9372cc59b29dc0cc74cae812d2f50c92796f
THREE_REPLAY_HASH_SETS = BYTE_IDENTICAL / PASS
REPLAY_HASHSET_SHA256 = ebfd11b180b7a7c854a704930c6f3592ca175c843a980124f3d903af8530a34e
```

## 14. External evidence root

```text
HOST_EVIDENCE_ROOT = /private/tmp/signthos-004c1dl-static-plan-2XM7Yg
EXTERNAL_EVIDENCE_FILES = 50
EXTERNAL_EVIDENCE_BYTES = 244129
EVIDENCE_INVENTORY_SHA256 = 71e91d91bc3e83470257c3ec5a58149b463ee0be26c1b9521e23beaeb82209aa
EVIDENCE_SUMMARY_SHA256 = 006eb675d8650da94126182a88749616d09becc527d7886aacb29771c5781500
```

The root preserves the exact input bytes, V1/V2 fail-closed logs, V4 evaluator, static structure/condition inventories, exact acquired `depot_tools` semantics excerpts, deterministic dependency/GCS/hook plans, selector manifests, and three replay hash sets.

## 15. What 004C1DL establishes

```text
004C1DL_RESULT = PASS_STATIC_TOP_LEVEL_ACQUISITION_PLAN
TOP_LEVEL_STATIC_ACQUISITION_PLAN = ESTABLISHED
TOP_LEVEL_SELECTOR_SET = ESTABLISHED
TARGET_CONDITION_PROVENANCE = ESTABLISHED
GCS_OBJECT_LEVEL_ADMISSION = ESTABLISHED
CIPD_TEMPLATE_SELECTOR_SET = ESTABLISHED
FULL_TRANSITIVE_DEPS_CLOSURE = NOT_ESTABLISHED
CIPD_INSTANCE_IDS = NOT_ESTABLISHED
DEPENDENCY_BYTES_ACQUIRED_BY_004C1DL = 0
WAIVER = NO
```

## 16. Explicit non-grants

```text
NETWORK_DEPENDENCY_ACQUISITION = NOT_AUTHORIZED
GIT_DEPENDENCY_FETCH = NOT_AUTHORIZED
GCLIENT_EXECUTION = NOT_AUTHORIZED
CIPD_CLIENT_BOOTSTRAP_OR_EXECUTION = NOT_AUTHORIZED
CIPD_INSTANCE_RESOLUTION = NOT_AUTHORIZED
GCS_DOWNLOAD = NOT_AUTHORIZED
HOOK_EXECUTION = NOT_AUTHORIZED
GN_NINJA_CLANG_RUST_EXECUTION = NOT_AUTHORIZED
CONTAINER_EXECUTION = NOT_AUTHORIZED
PDFIUM_CONFIGURATION_BUILD_LINK_RUNTIME = NOT_AUTHORIZED
REPOSITORY_SOURCE_IMPORT = NOT_AUTHORIZED
PROVIDER_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE_OR_DEPLOYMENT = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
```

## 17. Successor boundary

This document does not authorize its successor. After canonical merge, fresh Issue #7 reconciliation must choose the smallest next unit. The dependency-ordered frontier is acquisition/identity qualification of admitted top-level dependency and tool bytes, with explicit handling for CIPD template/instance resolution and preservation of the three recursive-DEPS roots for subsequent static closure. No build or runtime execution may be inferred from this plan.

## 18. Merge gate

Fresh independent substantive exact-head review is mandatory. Any material repair must be forward-only and freshly reviewed. Merge requires zero unresolved material threads, immediate base/head/frontier race proof, a normal merge guarded by the expected head SHA, mechanical post-merge verification, and fresh Issue #7 successor reconciliation.
