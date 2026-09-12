# 004C1DP — Exact Remaining Admitted Git Root Acquisition Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_EXACT_29_GIT_ROOT_ACQUISITION / ZERO_ACQUIRED_SOURCE_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `9ea4740487b5836288c36ee47bd1c44e0c1648c4`
Runtime authority: `github:issue-comment:5643117542`
Runtime closeout and document authority: `github:issue-comment:5643134938`

## 1. Purpose and authority boundary

Canonical 004C1DO closed immutable instance identity for all six admitted CIPD selectors. Canonical 004C1DL had already established 33 admitted Git selectors, while four of those selector roots (`build`, `buildtools`, `third_party/instrumented_libs`, and `third_party/depot_tools`) had been acquired and qualified by earlier units.

004C1DP closes only the remaining Git-byte prerequisite: acquire the other 29 exact admitted Git roots at their already-canonical origins and exact 40-hex revisions, prove their Git object identities and checkout integrity, and bind deterministic tree inventories. It executes none of the acquired source.

```text
004C1DP_AUTHORITY = EXACT_29_GIT_ROOT_ACQUISITION_AND_IDENTITY_QUALIFICATION_ONLY
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1dp-exact-remaining-admitted-git-root-acquisition-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
TARGETS_COUNT = 29
TARGETS_TSV_SHA256 = 45cab0adb95496a2d36feea974ec10e3216a487f8d708a86933ddf41681fbc10
CIPD_DOWNLOAD = 0
GCS_DOWNLOAD = 0
GCLIENT_EXECUTION = 0
HOOK_EXECUTION = 0
ACQUIRED_SOURCE_EXECUTION = 0
TOOLCHAIN_EXECUTION = 0
CONTAINER_EXECUTION = 0
REPOSITORY_SOURCE_IMPORT = 0
PDFIUM_BUILD_EXECUTION = 0
WAIVER = NO
```

## 2. Canonical predecessor truth

```text
004C1DO = CLOSED_CANONICAL
004C1DO_PR = #208
004C1DO_REVIEW = github:issue-comment:5643099737 = NO_MATERIAL_OR_ACTIONABLE_FINDINGS
004C1DO_REVIEWED_HEAD = 497b17ef5f78f9a365641cdd1d4226940935d6d6
004C1DO_REVIEWED_TREE = 015dcab6146f99f31faeedc321438f301b2b1ca1
004C1DO_MERGE = 9ea4740487b5836288c36ee47bd1c44e0c1648c4
004C1DO_MERGE_TREE = 015dcab6146f99f31faeedc321438f301b2b1ca1
004C1DO_PARENT_1 = aae5f986ee1f2c78faf653473c2ba2d423def880
004C1DO_PARENT_2 = 497b17ef5f78f9a365641cdd1d4226940935d6d6
004C1DO_MERGE_SIGNATURE = VERIFIED / VALID
004C1DO_POST_MERGE_WORKFLOWS = 0
004C1DO_OPEN_PULL_REQUESTS_AFTER_MERGE = 0
CIPD_INSTANCE_IDENTITY_GAP = CLOSED_FOR_CURRENT_ADMITTED_SET
```

## 3. Exact target-set freeze

The target set was derived mechanically from canonical 004C1DL `admitted-git.jsonl` by subtracting only the four selector paths already acquired by prior canonical units.

```text
TARGET_FREEZE_ROOT = /private/tmp/signthos-004c1dp-target-freeze-20260912T031955Z-56819
CANONICAL_ADMITTED_GIT_JSONL_SHA256 = 87e0a245fb5958ee5ab5deb61077c61ac3a45967cf10b554d95f60b91b992774
ADMITTED_GIT_TOTAL = 33
ALREADY_ACQUIRED_SELECTOR_ROOTS = 4
REMAINING_TARGETS = 29
TARGETS_TSV_BYTES = 3980
TARGETS_TSV_SHA256 = 45cab0adb95496a2d36feea974ec10e3216a487f8d708a86933ddf41681fbc10
TARGETS_JSON_SHA256 = cda17fa7ebb2a4388da728b26e693ddd76091e56a9e31c4ec0b3c8ba7e8b3c3c
```

No branch, tag, alternate origin, moving selector, or fallback was allowed to replace any target row.

## 4. Transport and acquisition method

Every target used a fresh external Git repository under the evidence root. Fetches removed inherited HTTP/HTTPS/all-proxy variables and disabled system/global Git configuration, terminal prompts, credential helpers, Git HTTP proxy, and HTTP redirects. Fetch requested only the exact authorized 40-hex revision with `--depth=1 --no-tags`.

Each target then used a detached exact-revision checkout. Fresh repositories contained no active fetched hooks in `.git/hooks`; no acquired source file was executed.

```text
GIT_VERSION = 2.54.0
HTTP_FOLLOW_REDIRECTS = false
BRANCH_HEAD_FALLBACK = 0
TAG_FALLBACK = 0
ORIGIN_SUBSTITUTION = 0
ACQUIRED_SOURCE_EXECUTION = 0
```

## 5. Aggregate acquisition result

```text
ACQUISITION_ROOT = /private/tmp/signthos-004c1dp-git-acquisition-20260912T032103Z-57013
TARGETS_TOTAL = 29
TARGETS_PASSED = 29
TARGETS_FAILED = 0
EXACT_HEAD_MATCHES = 29
FSCK_PASS = 29
FSCK_STDOUT_BYTES_TOTAL = 0
FSCK_STDERR_BYTES_TOTAL = 0
CLEAN_STATUS = 29
TREE_RECORDS_TOTAL = 70940
TREE_BLOB_RECORDS_TOTAL = 70939
SYMLINKS_TOTAL = 1
SUBMODULES_TOTAL = 1
```

For every root, configured origin exactly equals the frozen canonical origin, detached `HEAD` equals the exact authorized revision, object type is `commit`, tree OID and raw parent OID(s) are bound below, `git fsck --full --strict` exits zero, and `git status --porcelain` is empty.

## 6. Exact acquired root identities

| Logical path | Exact revision | Tree | Raw parent(s) | Tree records | Symlinks | Submodules | Tree-manifest SHA-256 |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| `base/allocator/partition_allocator` | `baaa6670c23c19485d0a5a538bc43d3332def328` | `acd2c22d095e6674927b11a6b6d3437d67adf62a` | `4344806135c21081ac9c2551b9d8e26fd1894280` | 391 | 0 | 0 | `8af338a7371f70b1ff6a174b3c96b0dccfe10b13ebcc13e51b579941fc9df52e` |
| `testing/corpus` | `e64acd24f00d365c3f7c60e9c4eff16ce2d71f5d` | `2d942d7a1a6819c2365bd28c3293b996191f8699` | `f78c65b71bd32a418584eee501ce419e3e71e1df` | 4908 | 0 | 0 | `47d63544bceab98ee311557846f377d2b43aafdfe24b52514a94790e2c5569bb` |
| `third_party/abseil-cpp` | `675d3d37ecbec78fd51378c6774c45715b1e4382` | `ca62252c27724e8ad8fe91d70807c700c6069f86` | `f1bbf89b19e2770edb5c178209a6f43a9f7d15be` | 1619 | 0 | 0 | `fca064723bf4b3e252b662b2583b5b3fd028103fcd0615309e70ef1f1734b856` |
| `third_party/brotli` | `ac16a36bc55c4c896135084e878f0d6a2f9b347e` | `0c85090ba747c2548f3ac785db123bd795abdeb7` | `64800e1d57528678d22078004d07d4ddff771528` | 102 | 0 | 0 | `6aecf94e21aae5d3d3a8cf28d83ecde67a7f6b39d801ff5b63f13a95f27dbde6` |
| `third_party/clang-format/script` | `c2725e0622e1a86d55f14514f2177a39efea4a0e` | `5117026e03ac0ec21b1c163738d26a7c9443f611` | `5046447cbdce3f1f3474b84ad4281b9a5c6f8fe7` | 13 | 0 | 0 | `ac2c47bf2a7d564b3b4db6efab5c0ea04992f82ad8951132a6513a79742abbf4` |
| `third_party/dragonbox/src` | `beeeef91cf6fef89a4d4ba5e95d47ca64ccb3a44` | `176383f02746d0248e7b04409367f691cc231cef` | `e4a85ebee62750382bc7d1eef4bb72f9696d073f` | 92 | 0 | 0 | `2815ae9538af194305422b82bbdfabf844cf590155d670fceefad9d2fedee889` |
| `third_party/fast_float/src` | `cb1d42aaa1e14b09e1452cfdef373d051b8c02a4` | `7138c095baadd3caa9f4cbae2b6effb643f22454` | `b9661b41afad068f601d92cc5f0628280c3a9abf` | 100 | 0 | 0 | `9b8aa3baee1616f926d24c37814cf8b0a7b6b2245341fdda65ed919078f8b2f2` |
| `third_party/fp16/src` | `3d2de1816307bac63c16a297e8c4dc501b4076df` | `052b1ec2fb66e4f709ecbdc11dd43c2bfb979f32` | `84faa71a2f228032ab770e2e271bc8302c345183` | 31 | 0 | 0 | `f08687be624eef2f11da7a608baceb30b6d02e5e3825f25d59fcc7efeae06b71` |
| `third_party/freetype/src` | `b91f75bd02db43b06d634591eb286d3eb0ce3b65` | `84a6fa6276a41ebff796b2b16fd217e867b0c8bd` | `5f524d04b4f81a0e6d0d86add447f564047d6d09` | 745 | 0 | 1 | `8ab4fab2daea3ce3146b92907e2678ace8ead80cab0f043fa0e183fc4d330ea0` |
| `third_party/googletest/src` | `4fe3307fb2d9f86d19777c7eb0e4809e9694dde7` | `feafbf9cf5deeb64dbe983f5574cb50f96fc330b` | `b2b9072ecbe874f5937054653ef8f2731eb0f010` | 251 | 0 | 0 | `ceb2574d091d9d7486f3e29e82b4fb09240e9ac5588d0b366299fa15980d5ff7` |
| `third_party/harfbuzz-ng/src` | `fa2908bf16d2ccd6623f4d575455fea72a1a722b` | `c2cd3655b841dfcf6ca2806dacc1217298bada3b` | `e8dd3cd376c183061ee00f6cfbcfd435f2f1ad9a` | 3487 | 0 | 0 | `3fb24d461ef97043ede65b3adf937599ea1b1ff182277f4f82dc36960a614269` |
| `third_party/highway/src` | `84379d1c73de9681b54fbe1c035a23c7bd5d272d` | `afb7cf05e253a76cfc1e9bd8975a979fa865d113` | `bcb1cf4474eef5bad86231098bc2185acc22cb29` | 265 | 0 | 0 | `daed50770722ce250f9b8449ad3c6a64ba7cd69cfc4f8f693d1f34046e7832c5` |
| `third_party/icu` | `a86a32e67b8d1384b33f8fa48c83a6079b86f8cd` | `73b9cb2be837165ec31f9512bec2577255b825eb` | `f27805b7d7d8618fa73ce89e9d28e0a8b2216fec` | 6995 | 0 | 0 | `2e0087fb23e1c53545e669f77159213abe7a3e97c0e4dcc4a44fa611336d4323` |
| `third_party/jinja2` | `c3027d884967773057bf74b957e3fea87e5df4d7` | `b1ced381d7e8c813f62afc3be3026da78800409c` | `5e1ee241ab04b38889f8d517f2da8b3df7cfbd9a` | 34 | 0 | 0 | `16b6ce0ce4ea551e699e6768e9299fa23768ee4832c8ab3c03cf0609f2489093` |
| `third_party/libc++/src` | `7ab65651aed6802d2599dcb7a73b1f82d5179d05` | `2d0b4c55fd2fd81d53a11a54f10424e60b4e954e` | `6dec1351724c1f123b2ff4c4f8c0344ffcf04c85` | 12179 | 0 | 0 | `5e46f43b6bb571b7022e22d60b4d8b59745fbc10ac73f97f714a5c436b61f0ea` |
| `third_party/libc++abi/src` | `8f11bb1d4438d0239d0dfc1bd9456a9f31629dda` | `63eed58f0937ba832a2195cd848f9f53ef8ecea9` | `7a8c5a0cbf615a7e44bd924c124cc8e8663ea093` | 161 | 0 | 0 | `4a020d0950124604199971785ad8bbe79dd271becf8e32d776c0a4af596f34c5` |
| `third_party/libjpeg_turbo` | `6bb85251a8382b5e07f635a981ac685cc5ab5053` | `402c2a97c8296e75ab702aa137b7b5d5d4faafb6` | `d2d3546f9173f5cc0e4378018aa7ccf3a4875cc3,54cc9a8121b9581a52d5d0799d9850cac4f06d8f` | 307 | 0 | 0 | `68cf2b3c75185aeafdc33790a89aaba2eed5d3beb065487a80d5b4a132a8423c` |
| `third_party/libpng` | `172f83835c98264e6eefdbe8ae82dc08be337ad0` | `615deb4d13aa95080f11030afcf2eebf17dd43b4` | `f63f5ef0e0ef0f17645c015568b729e452e57147` | 46 | 0 | 0 | `170073d71b82dc31df3aa7fbfa53e38e79da38131530ad72aac6e84128995872` |
| `third_party/llvm-libc/src` | `603c242115079d3a208638a6e56f842c0801d0bd` | `b4f9a04628d3fe9de5ca34e2684e7f54701ad7cc` | `7c84e8a1613bb5eda65c62cbef3e1ebc85aa5941` | 6347 | 0 | 0 | `43a90432e5b5f1cb4a444d81eddc8a3c46c874e7a25b680f7fe805e43252be76` |
| `third_party/markupsafe` | `4256084ae14175d38a3ff7d739dca83ae49ccec6` | `8c1f275c5022de6417bf43377c671b44d7a474d6` | `9f8efc8637f847ab1ba984212598e6fb9cf1b3d4` | 15 | 0 | 0 | `bc81495270558b62f019e1690d49c8661be0de4a0b31d1d511cc9152f119f483` |
| `third_party/nasm` | `af5eeeb054bebadfbb79c7bcd100a95e2ad4525f` | `1c758a0853e56e755cc16fa081314c24888435e1` | `e2c93c34982b286b27ce8b56dd7159e0b90869a2` | 1208 | 0 | 0 | `0fa348e495cb3951c9f80730965ecfca0ef7bb013b3a9de8325c09f6c5750fe0` |
| `third_party/simdutf` | `f7356eed293f8208c40b3c1b344a50bd70971983` | `6123564324038cf176c37fbd3dfac2bbee1deb32` | `93b35aec29256f705c97f675fe4623578bd7a395` | 6 | 0 | 0 | `76990ed53080ea32ee9e72af7161784024fe199d9b95b869deff8339b29a05d9` |
| `third_party/skia` | `c497e689bf3db5c8efe853dae45dd61867d3363a` | `1767c5d85a6b00262b76864728f4cefaa65be928` | `7e79e4ac2dace884299337bbcc98139975a1a0f2` | 12031 | 1 | 0 | `2c227ed8f705365fad3d8082f4c6c797fdddc0afe66f34368c4061536111b127` |
| `third_party/test_fonts` | `7f51783942943e965cd56facf786544ccfc07713` | `7d8a8ab400ae28ff251c0feaf7116693b7e5ae5d` | `0b9500c13631104dcebf14252879f65c05f55563` | 13 | 0 | 0 | `f74eb5ab8a2b8dbafaae61c47784f3861a8a8dd4b89cdfa8ee85685a73ca28b6` |
| `third_party/zlib` | `980253c1cc835c893c57b5cfc10c5b942e10bc46` | `610b2b5c40379696b6920fa8573d0652b1a6e830` | `330a4df5c48bd189118f12463636934d0e12318e` | 183 | 0 | 0 | `769172eaf77a67c5b6cd30710ce660b321f893a76a079f69a928d0128f043813` |
| `tools/clang` | `a1542f2952bcc47640d5cfbc39bb8f6926a1bf6a` | `5f6eb766609b9c3e2062e28ff581e53800c5b4db` | `875a1ac5c4b27880b71eedbf7d8cd447b5efb6f0` | 994 | 0 | 0 | `256814f12913241c007ef9844057dd60480d8ad739e70a010d6aa31bdce73654` |
| `tools/code_coverage` | `fc75c61d3a98a78ff83940366aeba83ddeb28179` | `39d72b61c7db2b6a4a4965645bf33fa1238aaf04` | `9e4876df273e2b637b56d5e35815d27fed1dfce7` | 36 | 0 | 0 | `b0bdced6a580b5d2ffec79cc1db1e4bef72fb0e928b1ddedc48ccde9fe6eaa09` |
| `tools/memory` | `16429092be4bb5160bed0ad763bd4c13f1f52990` | `3335d7f6fceaee7584cc674fd7efcc9c9c1bc512` | `fadcf286230c8d51283c330603f5ffaadbc86a0b` | 55 | 0 | 0 | `37faf2819f1eab3b42d475ac48c845cc111d28683891c5351a85924cc45b00c5` |
| `v8` | `b3995dff9fc0df19d00743da41a567da5eb8318c` | `6fab8283d790ea54c5c34479458cd33cd7eaad7d` | `e0b1c341a9b32f32cefeca8d7553e7fda0598f12` | 18326 | 0 | 0 | `9d16b4f920b3c79463fd91c1a769b22502fd16ed8ef95a715e24eb1bf6c69cb7` |

## 7. Exact origin binding

The exact origin for every acquired root is also frozen and verified:

| Logical path | Exact origin |
| --- | --- |
| `base/allocator/partition_allocator` | `https://chromium.googlesource.com/chromium/src/base/allocator/partition_allocator.git` |
| `testing/corpus` | `https://pdfium.googlesource.com/pdfium_tests` |
| `third_party/abseil-cpp` | `https://chromium.googlesource.com/chromium/src/third_party/abseil-cpp.git` |
| `third_party/brotli` | `https://chromium.googlesource.com/chromium/src/third_party/brotli.git` |
| `third_party/clang-format/script` | `https://chromium.googlesource.com/external/github.com/llvm/llvm-project/clang/tools/clang-format.git` |
| `third_party/dragonbox/src` | `https://chromium.googlesource.com/external/github.com/jk-jeon/dragonbox.git` |
| `third_party/fast_float/src` | `https://chromium.googlesource.com/external/github.com/fastfloat/fast_float.git` |
| `third_party/fp16/src` | `https://chromium.googlesource.com/external/github.com/Maratyszcza/FP16.git` |
| `third_party/freetype/src` | `https://chromium.googlesource.com/chromium/src/third_party/freetype2.git` |
| `third_party/googletest/src` | `https://chromium.googlesource.com/external/github.com/google/googletest.git` |
| `third_party/harfbuzz-ng/src` | `https://chromium.googlesource.com/external/github.com/harfbuzz/harfbuzz.git` |
| `third_party/highway/src` | `https://chromium.googlesource.com/external/github.com/google/highway.git` |
| `third_party/icu` | `https://chromium.googlesource.com/chromium/deps/icu.git` |
| `third_party/jinja2` | `https://chromium.googlesource.com/chromium/src/third_party/jinja2.git` |
| `third_party/libc++/src` | `https://chromium.googlesource.com/external/github.com/llvm/llvm-project/libcxx.git` |
| `third_party/libc++abi/src` | `https://chromium.googlesource.com/external/github.com/llvm/llvm-project/libcxxabi.git` |
| `third_party/libjpeg_turbo` | `https://chromium.googlesource.com/chromium/deps/libjpeg_turbo.git` |
| `third_party/libpng` | `https://chromium.googlesource.com/chromium/src/third_party/libpng.git` |
| `third_party/llvm-libc/src` | `https://chromium.googlesource.com/external/github.com/llvm/llvm-project/libc.git` |
| `third_party/markupsafe` | `https://chromium.googlesource.com/chromium/src/third_party/markupsafe.git` |
| `third_party/nasm` | `https://chromium.googlesource.com/chromium/deps/nasm.git` |
| `third_party/simdutf` | `https://chromium.googlesource.com/chromium/src/third_party/simdutf` |
| `third_party/skia` | `https://skia.googlesource.com/skia.git` |
| `third_party/test_fonts` | `https://chromium.googlesource.com/chromium/src/third_party/test_fonts.git` |
| `third_party/zlib` | `https://chromium.googlesource.com/chromium/src/third_party/zlib.git` |
| `tools/clang` | `https://chromium.googlesource.com/chromium/src/tools/clang` |
| `tools/code_coverage` | `https://chromium.googlesource.com/chromium/src/tools/code_coverage.git` |
| `tools/memory` | `https://chromium.googlesource.com/chromium/src/tools/memory` |
| `v8` | `https://chromium.googlesource.com/v8/v8.git` |

## 8. Explicit special tree entries

Exactly one Gitlink/submodule record exists in the 29 acquired trees:

```text
ROOT = third_party/freetype/src
PATH = subprojects/dlg
MODE = 160000
TYPE = commit
OID = 395ccad2c1e0daae535c4d20bb0a3f2424648e17
```

004C1DP records that Gitlink only. It does not authorize or perform submodule acquisition.

Exactly one symlink record exists:

```text
ROOT = third_party/skia
PATH = src/ports/fontations/Cargo.toml
MODE = 120000
TYPE = blob
OID = 73b549bfaea891a9d50ae49a2cb45b006ec3eb25
GIT_REPORTED_SIZE = 45
```

The symlink entry is inventoried as a Git object. 004C1DP does not infer a separate network acquisition from the link target.

## 9. Deterministic evidence closure

```text
RUN_RESULTS_SHA256 = 1e1c1a644f6947318afb5ae71d465f9993709d2ed4a09e6fed3acd586baf525f
QUALIFICATION_SUMMARY_SHA256 = a7bf8d4272c824c4b68f19ee5ede66a0c57940681bc3cd1399335e7aac268da9
ROOT_IDENTITIES_TSV_SHA256 = 04265a96521229d7c5c7e668dba36765ec33c31610e5e63ce622b6f9dcd819b1
ACQUIRE_ONE_SCRIPT_SHA256 = 484c3f525fcb0af873ed9c6869420c4456dfc840386c0757449a27893ab850ed
RUN_ALL_SCRIPT_SHA256 = 2c18dd703b876f8dccb8369416c2108508c8485cd37a2ffbf5c7dab66f7fb649
QUALIFICATION_EVIDENCE_FILES = 1521
QUALIFICATION_EVIDENCE_BYTES = 30504461
QUALIFICATION_EVIDENCE_INVENTORY_SHA256 = 43070b9a797c2a558fe90659a9f8037cd49a815078ae57d43a6d6d8a151fb973
```

The compact qualification evidence inventory excludes `repos/**`; acquired repository content is instead bound through exact commit/tree identities and per-root deterministic Git-tree manifests. A broader acquisition-root inventory was also produced, but it is not used as the compact qualification evidence identity because it includes checked-out source and Git storage internals.

## 10. What 004C1DP establishes

```text
004C1DP_RESULT = PASS_EXACT_29_GIT_ROOT_ACQUISITION
REMAINING_ADMITTED_GIT_ROOTS_ACQUIRED = 29 / 29
CURRENT_ADMITTED_TOP_LEVEL_GIT_SELECTOR_ROOTS_ACQUIRED = 33 / 33
CURRENT_ADMITTED_TOP_LEVEL_GIT_SELECTOR_IDENTITY_GAP = CLOSED
ACQUIRED_SOURCE_EXECUTION = 0
```

This result establishes exact source-tree acquisition and integrity for the current admitted top-level Git selector set. It does not imply that CIPD package bodies or admitted GCS objects have been acquired, and it does not grant build or runtime authority.

## 11. Explicit non-grants

```text
SUBMODULE_ACQUISITION = NOT_AUTHORIZED
SYMLINK_TARGET_SPECIAL_ACQUISITION = NOT_AUTHORIZED
CIPD_PACKAGE_BODY_DOWNLOAD = NOT_AUTHORIZED
GCS_OBJECT_DOWNLOAD = NOT_AUTHORIZED
GCLIENT_EXECUTION = NOT_AUTHORIZED
HOOK_EXECUTION = NOT_AUTHORIZED
GN_EXECUTION = NOT_AUTHORIZED
NINJA_EXECUTION = NOT_AUTHORIZED
CLANG_EXECUTION = NOT_AUTHORIZED
RUST_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
PDFIUM_CONFIGURATION = NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
PDF_PROVIDER_RUNTIME = NOT_AUTHORIZED
REPOSITORY_SOURCE_IMPORT = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
WAIVER = NO
```

## 12. Qualification and merge gate

This document becomes canonical only after exact final base/head/tree/one-file diff verification, truthful workflow/check/provider accounting, a fresh independent substantive exact-head review, forward-only repair of every material finding, zero unresolved material review threads, immediate premerge race verification, guarded normal merge using exact `expected_head_sha`, mechanical post-merge proof, and fresh Issue #7 reconciliation.

Bot summaries, automatic skip statuses, reactions, billing blocks, reviewer-request state, and unavailable checks are not substantive review evidence.

## 13. Successor boundary

004C1DP does not authorize its successor.

After canonical merge, Issue #7 must choose the smallest remaining dependency-byte acquisition or identity unit from live truth. The current unresolved byte classes are admitted GCS objects and six exact CIPD instances. No GCS download, CIPD package-body acquisition, hook/tool execution, PDFium configuration, or PDFium build may be inferred from this qualification.
