# 004C1DS — Static Offline PDFium Workspace Materialization Contract Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_STATIC_OFFLINE_MATERIALIZATION_CONTRACT / ZERO_EXTRACTION_INSTALLATION_OR_ACQUIRED_SOURCE_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `5c34f8badd70db3ac343defbc09b53d85b70bb4c`
Runtime authority: `github:issue-comment:5643660694`

## 1. Purpose and authority boundary

Canonical 004C1DR closed the raw-byte acquisition frontier for the currently admitted Linux/x64 PDFium dependency set. It did not authorize extraction, package installation, workspace materialization, nested submodule acquisition, hooks, toolchain execution, PDFium configuration/build/runtime, repository source import, release, deployment, or a project-completion claim.

004C1DS is the smallest successor allowed by the post-004C1DR reconciliation. It freezes an exact offline workspace materialization contract from already-acquired bytes and exact `depot_tools` semantics. It performs no materialization.

```text
004C1DS_AUTHORITY = STATIC_PLANNING_AND_MATERIALIZATION_CONTRACT_QUALIFICATION_ONLY
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ds-static-offline-pdfium-workspace-materialization-contract-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
ARCHIVE_EXTRACTION = 0
CIPD_PACKAGE_INSTALLATION = 0
CIPD_CLIENT_EXECUTION = 0
WORKSPACE_MATERIALIZATION_EXECUTION = 0
SUBMODULE_ACQUISITION = 0
NETWORK_REQUESTS_DURING_STATIC_EVIDENCE = 0
ACQUIRED_SOURCE_EXECUTION = 0
HOOK_EXECUTION = 0
TOOLCHAIN_EXECUTION = 0
REPOSITORY_SOURCE_IMPORT = 0
PDFIUM_BUILD_EXECUTION = 0
WAIVER = NO
```

## 2. Canonical predecessor truth

```text
004C1DR = CLOSED_CANONICAL
004C1DR_PR = #211
004C1DR_REVIEW = github:issue-comment:5643559444 = NO_MATERIAL_OR_ACTIONABLE_FINDINGS
004C1DR_REVIEWED_HEAD = 0b79d838cdb3e8795310d6c10dac285b6392c1cc
004C1DR_REVIEWED_TREE = b5772cfc0f854aa8d796bf3fccbe8f2acc66fb8c
004C1DR_MERGE = 5c34f8badd70db3ac343defbc09b53d85b70bb4c
004C1DR_MERGE_TREE = b5772cfc0f854aa8d796bf3fccbe8f2acc66fb8c
CURRENT_ADMITTED_TOP_LEVEL_GIT_SELECTOR_ROOTS_ACQUIRED = 33 / 33
CURRENT_ADMITTED_CIPD_PACKAGE_BODIES_ACQUIRED = 6 / 6
CURRENT_ADMITTED_GCS_OBJECT_BODIES_ACQUIRED = 8 / 8
STATIC_RECURSIVE_DEPS_FRONTIER = EMPTY
RAW_DEPENDENCY_ACQUISITION_GAP = CLOSED
```

The exact PDFium source root remains the canonical gitlink source commit `cb29e78f2ba00c9298714d5f4a8bf7765f1e802f`. The exact `depot_tools` commit used for semantics in this grain is `6235028c6b18b73e68f5414f935ec537a25ea51a`, tree `0b08d0dbc2f75f2b44fb0b46ae7133e9bceb9e44`.

## 3. Static evidence root and deterministic closure

All static evidence was generated outside Signthos from already-acquired bytes only.

```text
EVIDENCE_ROOT = /private/tmp/signthos-004c1ds-static-contract-20260912T051213Z-35385
FINAL_EVIDENCE_FILES = 12
FINAL_EVIDENCE_BYTES = 12481089
FINAL_EVIDENCE_INVENTORY_SHA256 = 18f2f2c2c9ce8d5831f2ee5f576dd32eadcf5d265eeae1e528a5fbdbe2655e78
PREDECESSOR_EVIDENCE_INVENTORY_SHA256 = a95d65e946719eb596e85361bf378f29743cdbe4ce42817f43c6105dcc5a0560
CONTRACT_SUMMARY_SHA256 = 8cb528bcd9945b5693f038c60b0d23c07b9a0e6eeb682cd3605ec06f1f409757
GIT_ROOTS_JSONL_SHA256 = dc99423252e73b77f22413be12aad2b873f66372d71caeb45169701151f39fc6
CIPD_MEMBER_INVENTORY_SHA256 = 7fb2db3c0bde6db0d89727348fe406f3676d22e9cc195b140c0b0ce30d312b5b
GCS_MEMBER_INVENTORY_SHA256 = 2cd8231a46d36c50e16531db22696feae698869a593d3bc733f8ca9c70d733b6
FREETYPE_GITLINK_SHA256 = 2607581f22ea5e8ee22d632bb845edd743559f044b0dbb68e66f1f8a8bea6e13
CIPD_CLIENT_BOOTSTRAP_IDENTITY_SHA256 = 1e80b188f27459d558a600771fb9379035dc695b9b392d76d28aad7dde293b7d
```

Static inspection performed zero archive extraction, zero package installation, zero acquired-source execution, zero network request, and zero Signthos repository mutation.

## 4. Exact `depot_tools` semantic sources

| Path | Git blob | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `gclient.py` | `1cc8fb8da0d93acc8f32eceb49fe4aa4bf95945c` | 192738 | `0caf3dd2c05f993c46474ccf49a5c7bb97ad376a4adc810c516bd8eef417b3da` |
| `gclient_scm.py` | `e6b48abb10ab9dfd2148e0fd26ee5d3041c1d69b` | 97975 | `f986f586a92a77f0e7ccbf35e999c96ea47988b8fcce58045294f5e376b9b3f0` |
| `tests/gclient_gcs_smoketest.py` | `570e549912a848f12ba1e7117b0ea70db14eac00` | 2894 | `4f04741e2e661bdedd07cf9b1514aff7e4780f548187199189b9cc6344ee7d9b` |
| `tests/gclient_cipd_smoketest.py` | `022e9af1f588418aadf26229b80ca57d075ba5e0` | 6976 | `106b246947e343c4190cbe38df128bc06df4461464950eddcbbe3302e1faf1c0` |


The exact source establishes these contract-relevant behaviors:

1. each admitted GCS dependency has an output directory equal to its DEPS dependency path;
2. absent `output_file`, the downloaded object is retained as a hidden artifact file and, if it is a tar archive, is validated and extracted into that dependency directory;
3. tar validation rejects unsafe relative traversal and links escaping the archive's observed top-level prefixes;
4. an object with `output_file` is placed at that exact filename and is not assumed to be an archive;
5. CIPD dependencies are grouped under one root and installed through an ensure file using `$ParanoidMode CheckPresence` and `$OverrideInstallMode copy`;
6. CIPD installation is client behavior, not equivalent to generic ZIP extraction.

004C1DS uses these semantics as a contract only. It does not run `gclient`, CIPD, GCS tooling, hooks, GN, Ninja, Clang, Rust, or any acquired source.

## 5. Git-root workspace contract — exact 33 roots

The future offline materializer must consume exactly the 33 admitted DEPS Git selector roots already qualified by canonical 004C1DK/004C1DM/004C1DP. No branch, tag, moving ref, alternate origin, network fetch, or nested repository discovery may expand this set.

| Logical path | Exact revision | Tree | Future materialization disposition |
| --- | --- | --- | --- |
| `base/allocator/partition_allocator` | `baaa6670c23c19485d0a5a538bc43d3332def328` | `acd2c22d095e6674927b11a6b6d3437d67adf62a` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `build` | `06d247cb917bb5fac3103b1b7dccb75368a553ce` | `e01b69d7c03521219d8b95e0e5b49af18be45c5d` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `buildtools` | `6a18683f555b4ac8b05ac8395c29c84483ac9588` | `8a36f872e24a56fe517682e14bc897ceb28f8058` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `testing/corpus` | `e64acd24f00d365c3f7c60e9c4eff16ce2d71f5d` | `2d942d7a1a6819c2365bd28c3293b996191f8699` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/abseil-cpp` | `675d3d37ecbec78fd51378c6774c45715b1e4382` | `ca62252c27724e8ad8fe91d70807c700c6069f86` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/brotli` | `ac16a36bc55c4c896135084e878f0d6a2f9b347e` | `0c85090ba747c2548f3ac785db123bd795abdeb7` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/clang-format/script` | `c2725e0622e1a86d55f14514f2177a39efea4a0e` | `5117026e03ac0ec21b1c163738d26a7c9443f611` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/depot_tools` | `6235028c6b18b73e68f5414f935ec537a25ea51a` | `0b08d0dbc2f75f2b44fb0b46ae7133e9bceb9e44` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/dragonbox/src` | `beeeef91cf6fef89a4d4ba5e95d47ca64ccb3a44` | `176383f02746d0248e7b04409367f691cc231cef` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/fast_float/src` | `cb1d42aaa1e14b09e1452cfdef373d051b8c02a4` | `7138c095baadd3caa9f4cbae2b6effb643f22454` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/fp16/src` | `3d2de1816307bac63c16a297e8c4dc501b4076df` | `052b1ec2fb66e4f709ecbdc11dd43c2bfb979f32` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/freetype/src` | `b91f75bd02db43b06d634591eb286d3eb0ce3b65` | `84a6fa6276a41ebff796b2b16fd217e867b0c8bd` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/googletest/src` | `4fe3307fb2d9f86d19777c7eb0e4809e9694dde7` | `feafbf9cf5deeb64dbe983f5574cb50f96fc330b` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/harfbuzz-ng/src` | `fa2908bf16d2ccd6623f4d575455fea72a1a722b` | `c2cd3655b841dfcf6ca2806dacc1217298bada3b` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/highway/src` | `84379d1c73de9681b54fbe1c035a23c7bd5d272d` | `afb7cf05e253a76cfc1e9bd8975a979fa865d113` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/icu` | `a86a32e67b8d1384b33f8fa48c83a6079b86f8cd` | `73b9cb2be837165ec31f9512bec2577255b825eb` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/instrumented_libs` | `e8cb570a9a2ee9128e2214c73417ad2a3c47780b` | `651502f72d94a6c75baf64edb2090a894af13d63` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/jinja2` | `c3027d884967773057bf74b957e3fea87e5df4d7` | `b1ced381d7e8c813f62afc3be3026da78800409c` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/libc++/src` | `7ab65651aed6802d2599dcb7a73b1f82d5179d05` | `2d0b4c55fd2fd81d53a11a54f10424e60b4e954e` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/libc++abi/src` | `8f11bb1d4438d0239d0dfc1bd9456a9f31629dda` | `63eed58f0937ba832a2195cd848f9f53ef8ecea9` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/libjpeg_turbo` | `6bb85251a8382b5e07f635a981ac685cc5ab5053` | `402c2a97c8296e75ab702aa137b7b5d5d4faafb6` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/libpng` | `172f83835c98264e6eefdbe8ae82dc08be337ad0` | `615deb4d13aa95080f11030afcf2eebf17dd43b4` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/llvm-libc/src` | `603c242115079d3a208638a6e56f842c0801d0bd` | `b4f9a04628d3fe9de5ca34e2684e7f54701ad7cc` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/markupsafe` | `4256084ae14175d38a3ff7d739dca83ae49ccec6` | `8c1f275c5022de6417bf43377c671b44d7a474d6` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/nasm` | `af5eeeb054bebadfbb79c7bcd100a95e2ad4525f` | `1c758a0853e56e755cc16fa081314c24888435e1` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/simdutf` | `f7356eed293f8208c40b3c1b344a50bd70971983` | `6123564324038cf176c37fbd3dfac2bbee1deb32` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/skia` | `c497e689bf3db5c8efe853dae45dd61867d3363a` | `1767c5d85a6b00262b76864728f4cefaa65be928` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/test_fonts` | `7f51783942943e965cd56facf786544ccfc07713` | `7d8a8ab400ae28ff251c0feaf7116693b7e5ae5d` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `third_party/zlib` | `980253c1cc835c893c57b5cfc10c5b942e10bc46` | `610b2b5c40379696b6920fa8573d0652b1a6e830` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `tools/clang` | `a1542f2952bcc47640d5cfbc39bb8f6926a1bf6a` | `5f6eb766609b9c3e2062e28ff581e53800c5b4db` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `tools/code_coverage` | `fc75c61d3a98a78ff83940366aeba83ddeb28179` | `39d72b61c7db2b6a4a4965645bf33fa1238aaf04` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `tools/memory` | `16429092be4bb5160bed0ad763bd4c13f1f52990` | `3335d7f6fceaee7584cc674fd7efcc9c9c1bc512` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |
| `v8` | `b3995dff9fc0df19d00743da41a567da5eb8318c` | `6fab8283d790ea54c5c34479458cd33cd7eaad7d` | Local exact-revision Git checkout; no network; source tree plus non-identity-bearing local Git metadata allowed. |

### Git materialization semantics

For each row, a future execution grain must:

1. create the checkout only from the retained local acquired repository;
2. pin detached `HEAD` to the exact revision above;
3. prove the resulting source tree OID equals the exact tree above;
4. prohibit Git network transport and submodule recursion;
5. install no active hooks and execute no repository-provided scripts;
6. treat `.git` implementation metadata as non-identity-bearing support state; merge-critical workspace identity is the exact commit/tree plus a deterministic source-tree inventory;
7. fail closed on any path collision that would replace an unrelated canonical PDFium source file.

The PDFium root itself is separately fixed at `cb29e78f2ba00c9298714d5f4a8bf7765f1e802f` and is not counted again among these 33 DEPS roots.

## 6. CIPD payload contract — exact six package bodies

Static inspection found six valid ZIP-based CIPD package bodies, zero unsafe member paths, and zero symlink members. Package metadata is not discarded: `.cipdpkg/manifest.json` controls package identity/install behavior, and three package manifests declare a version file.

| Logical path | Package | Instance ID | Body SHA-256 | Members | Manifest disposition |
| --- | --- | --- | --- | ---: | --- |
| `buildtools/linux64` | `gn/gn/linux-amd64` | `qdyvoyVF792YFWTtJi04a3sw6x7Dffk3mrD7x0Ey0_sC` | `a9dcafa32545efdd981564ed262d386b7b30eb1ec37df9379ab0fbc74132d3fb` | 2 | Deploy exact local package body with the exact pinned CIPD client; do not hand-roll ZIP extraction. |
| `buildtools/reclient` | `infra/rbe/client/linux-amd64` | `ADvz6sQzvQcUUOl6LmYz9_kwRoKMi-QopcOTjGPdF2QC` | `003bf3eac433bd071450e97a2e6633f7f93046828c8be428a5c3938c63dd1764` | 20 | Deploy exact local package body with the exact pinned CIPD client; do not hand-roll ZIP extraction. |
| `third_party/ninja` | `infra/3pp/tools/ninja/linux-amd64` | `Px8cwPaaG8_fZ_tsK8dBmx3YEruNDnmvqb-oo1U7UIIC` | `3f1f1cc0f69a1bcfdf67fb6c2bc7419b1dd812bb8d0e79afa9bfa8a3553b5082` | 4 | Deploy exact local package body with the exact pinned CIPD client; do not hand-roll ZIP extraction. |
| `third_party/siso/cipd` | `build/siso/linux-amd64` | `MF0YOMnae3v_65ZGQClhx1E-zz_I_O7jmYzSNpEfhqkC` | `305d1838c9da7b7bffeb9646402961c7513ecf3fc8fceee3998cd236911f86a9` | 2 | Deploy exact local package body with the exact pinned CIPD client; do not hand-roll ZIP extraction. |
| `tools/resultdb` | `infra/tools/result_adapter/linux-amd64` | `v9d06vVBFkAEPeZc_T_Hlp7dru37V52eI1N19xBapo4C` | `bfd774eaf5411640043de65cfd3fc7969eddaeedfb579d9e235375f7105aa68e` | 2 | Deploy exact local package body with the exact pinned CIPD client; do not hand-roll ZIP extraction. |
| `tools/skia_goldctl/linux` | `skia/tools/goldctl/linux-amd64` | `-kBgGbJiTOk-cPfW3Hk9s0VTgDJ_LLFD0GjjiFdxQxMC` | `fa406019b2624ce93e70f7d6dc793db3455380327f2cb143d068e38857714313` | 2 | Deploy exact local package body with the exact pinned CIPD client; do not hand-roll ZIP extraction. |

The exact `depot_tools` bootstrap additionally pins the client needed to preserve CIPD deployment semantics:

```text
CIPD_CLIENT_VERSION = git_revision:b1f414539ac10cc67a0250890a38712cc06cf102
CIPD_CLIENT_PLATFORM = linux-amd64
CIPD_CLIENT_EXPECTED_SHA256 = a4245bbd790e00c43756c1c202c21a3d2b5f0a4fe655fdb4d100029dfe9f223a
CIPD_CLIENT_BOOTSTRAP_URL_TEMPLATE = https://chrome-infra-packages.appspot.com/client?platform=linux-amd64&version=git_revision:b1f414539ac10cc67a0250890a38712cc06cf102
```

Exact bootstrap source identities:

| Path | Git blob | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `cipd` | `3acbe4add9e42be94207810812d38a8662d8dd34` | 8632 | `746c80831334280072185af1c55d2bb2c962817ee47f9c37b893ca352a60c770` |
| `cipd_client_version` | `d020db42ba97b2c790f59dae2a2e0a210bb2d0da` | 54 | `f7ef5caf1f691fed40e9e9046b04de0340cf2c9f1e24ee75694f3b9ec14bfe54` |
| `cipd_client_version.digests` | `ea291a345a24237b750d0e6bf71a6d8a57d36073` | 3417 | `b5ff38481e9bb2b38a90ad3ca6cf93d3601867e3f39561b4159865ec3e5d412b` |


### CIPD blocker and required successor ordering

The pinned Linux/amd64 CIPD client binary is **not** part of the current acquired dependency body set. Generic ZIP extraction would not prove equivalent `.cipd` deployment state, copy-mode behavior, or declared version-file behavior. Therefore 004C1DS explicitly rejects a hand-written ZIP installer as merge-critical materialization evidence.

Before offline workspace materialization may execute, Issue #7 must separately authorize and qualify acquisition of the exact pinned Linux/amd64 CIPD client body without executing it. A later materialization grain may then use the exact verified client only through a local-package deployment path that consumes the already-acquired `.cipd` package files without network resolution. Exact argv/network-denial behavior must be frozen in that later authority before execution.

```text
CIPD_CLIENT_IDENTITY = ESTABLISHED
CIPD_CLIENT_BODY = NOT_ACQUIRED_BY_004C1DS
CIPD_CLIENT_EXECUTION = NOT_AUTHORIZED_BY_004C1DS
HAND_ROLLED_CIPD_ZIP_INSTALLER = REJECTED_FOR_MERGE_CRITICAL_EQUIVALENCE
NEXT_DEPENDENCY_ORDER_BLOCKER = EXACT_PINNED_CIPD_CLIENT_BODY_ACQUISITION
```

## 7. GCS payload contract — exact eight objects

All eight already-acquired bodies were revalidated against their canonical SHA-256 and byte counts before member inspection. Seven are tar-compatible archives and one is a direct output file. Every tar member passed the exact path/link validity rule modeled from the pinned `gclient.py`; no extraction occurred.

| # | Logical path | SHA-256 | Bytes | Contract materialization | Members |
| ---: | --- | --- | ---: | --- | ---: |
| 1 | `third_party/llvm-build/Release+Asserts` | `d373cde5b6f1c0da245ebcad93e4883252323c1ff283df96f0eb2e9180f1a537` | 57692132 | Extract validated tar into dependency directory | 460 |
| 2 | `third_party/llvm-build/Release+Asserts` | `28df84ef25bae64ab82a48295bd09aa6689e436449bd78cdc83f58ef05bfdd6a` | 5818392 | Extract validated tar into dependency directory | 8 |
| 3 | `third_party/rust-toolchain` | `aff16507e3f1623a9948cf9b14bd90827fd702b58adbc5f5cc277b60682a6608` | 265701736 | Extract validated tar into dependency directory | 8690 |
| 4 | `build/linux/debian_bullseye_amd64-sysroot` | `36a164623d03f525e3dfb783a5e9b8a00e98e1ddd2b5cff4e449bd016dd27e50` | 20781612 | Extract validated tar into dependency directory | 20806 |
| 5 | `build/linux/debian_bullseye_i386-sysroot` | `63f0e5128b84f7b0421956a4a40affa472be8da0e58caf27e9acbc84072daee7` | 20786772 | Extract validated tar into dependency directory | 20771 |
| 6 | `buildtools/linux64-format` | `889266a51681d55bd4b9e02c9a104fa6ee22ecdfa7e8253532e5ea47e2e4cb4a` | 3899440 | Place as direct output file `clang-format` | 0 |
| 7 | `third_party/instrumented_libs/binaries` | `9329714322846c2b47dd518ac08e437b8c7d8075c514dc7ec3eb3e3a1e0faeb6` | 514553540 | Extract validated tar into dependency directory | 1488 |
| 8 | `third_party/instrumented_libs/binaries` | `a749c9e47cb4584bc944c887440b1d1c51501f7d9bb99eea276ebcba0aa6c1ec` | 493707167 | Extract validated tar into dependency directory | 1488 |

A future offline materializer must reproduce the pinned `gclient` placement contract from the already-acquired bodies only:

- tar-compatible objects: validate again, then extract into the exact dependency directory;
- `buildtools/linux64-format`: place the exact body at `buildtools/linux64-format/clang-format` and preserve the executable bit required by the upstream object contract;
- no object may cause network traffic, execute, or escape its dependency directory;
- archive timestamps are non-identity-bearing and must not be used as reproducibility inputs;
- extracted output must be inventoried deterministically by relative path, type, mode, size, symlink/link target where applicable, and SHA-256 for regular files.

## 8. Nested FreeType gitlink disposition

The exact acquired FreeType root contains one nested upstream gitlink:

```text
PARENT_LOGICAL_PATH = third_party/freetype/src
PARENT_REVISION = b91f75bd02db43b06d634591eb286d3eb0ce3b65
GITMODULES_SHA256 = 7f69eb73967e63bf3cbddd406e23e3e456c32cb5eb1a2b70e947d17b02044aeb
GITLINK_PATH = subprojects/dlg
GITLINK_MODE = 160000
GITLINK_TYPE = commit
GITLINK_OID = 395ccad2c1e0daae535c4d20bb0a3f2424648e17
GITLINK_ORIGIN = https://github.com/nyorain/dlg.git
GITLINK_ACQUIRED = NO
```

Canonical 004C1DP intentionally did not acquire this nested repository. Fresh static inspection of the exact PDFium GN wrapper shows the selected bundled FreeType target directly enumerates FreeType headers/sources under `//third_party/freetype/src`; no PDFium wrapper reference to `dlg`, `FT_DEBUG_LOGGING`, or `FT_LOGGING` was observed.

That is sufficient only for this contract disposition:

```text
FREETYPE_DLG_SUBMODULE_ACQUISITION = NOT_AUTHORIZED
FREETYPE_DLG_SUBMODULE_MATERIALIZATION = NOT_PART_OF_CURRENT_ADMITTED_DEPS_WORKSPACE
STATIC_SELECTED_PDFIUM_GN_WRAPPER_REFERENCE = NOT_OBSERVED
BUILD_IRRELEVANCE_PROOF = NOT_YET_ESTABLISHED
FAIL_CLOSED_IF_LATER_CONFIGURATION_OR_BUILD_REQUIRES_DLG = YES
```

The later materializer must not silently recurse into or fetch this gitlink. If a later exact GN/configuration preflight proves the selected release graph requires it, Issue #7 must open a separate exact-identity acquisition unit before build execution.

## 9. Future offline workspace topology

After the CIPD-client body blocker is closed, a later execution grain may materialize one fresh external workspace with this logical shape:

```text
<external-workspace>/pdfium/                       exact PDFium root cb29e78f...
<external-workspace>/pdfium/<git-dep-path>/        exact 33 local Git dependency checkouts
<external-workspace>/pdfium/<cipd-dep-path>/       exact six package deployments
<external-workspace>/pdfium/<gcs-dep-path>/        exact seven archive extractions / one direct output
```

The workspace is external evidence, not Signthos source. No dependency payload may be copied into the Signthos repository under this contract.

## 10. Required materialization execution controls

Any later materialization authority must require all of the following:

1. fresh isolated workspace, cache, temporary, and evidence roots outside Signthos;
2. zero network by construction and by observable process/network accounting;
3. exact source/body hashes revalidated before placement;
4. local Git-only checkouts at exact revisions with no submodule recursion and no hooks;
5. exact pinned CIPD client body and explicit offline local-package deployment only;
6. GCS extraction semantics matching the exact pinned `gclient.py` validation and placement behavior;
7. lexical and resolved-path confinement for every created path;
8. rejection of archive/device/FIFO/socket entries not admitted by the frozen contract;
9. preservation of executable/non-executable mode semantics required by Git/CIPD/archive metadata;
10. no execution of any resulting tool, binary, script, hook, generated file, compiler, formatter, or runtime;
11. deterministic source/payload inventory after materialization;
12. a second independent materialization replay with equivalent normalized inventory and identity set;
13. complete accounting of the unresolved FreeType gitlink as non-materialized;
14. repository mutation count zero during execution.

## 11. What workspace materialization will and will not prove

A successful later materialization may establish only that the canonical source/dependency payload can be placed offline at the frozen paths from exact previously acquired bytes.

It will **not** by itself establish:

- GN configuration success;
- effective release-build graph closure;
- FreeType `dlg` irrelevance at runtime/build time;
- hook safety or hook necessity;
- compiler/toolchain executability;
- PDFium build success;
- deterministic or reproducible WASM output;
- provider integration correctness;
- runtime security, rendering, inspection, or search correctness;
- 004C2/004D/Specification 005 authority;
- release, deployment, or project completion.

## 12. Document-worktree launcher failure preserved

The first isolated document-worktree launcher failed before branch or worktree creation because the shared local Git object database had not yet fetched canonical merge object `5c34f8badd70db3ac343defbc09b53d85b70bb4c`. The failure was preserved externally rather than overwritten.

```text
FAILURE_NOTE = /private/tmp/signthos-004c1ds-doc-worktree-launch-v1-failure.txt
FAILURE_NOTE_SHA256 = 5e2311e9575c8c147043574eab194752a652324448c04b6b26d411d2853aee53
FAILURE_CLASS = LOCAL_CANONICAL_OBJECT_NOT_YET_FETCHED
BRANCH_CREATED_BY_FAILED_ATTEMPT = NO
WORKTREE_CREATED_BY_FAILED_ATTEMPT = NO
REPOSITORY_CONTENT_MUTATION = 0
FORWARD_ONLY_REPAIR = FETCH_EXACT_CANONICAL_BASE_OBJECT_THEN_CREATE_FRESH_ISOLATED_WORKTREE
```

No force-push, rebase, history rewrite, or primary-worktree modification occurred.

## 13. Qualification result

```text
STATIC_MATERIALIZATION_CONTRACT = ESTABLISHED
GIT_ROOT_CONTRACT = 33 / 33 BOUND
CIPD_PACKAGE_CONTRACT = 6 / 6 BOUND
GCS_OBJECT_CONTRACT = 8 / 8 BOUND
GCS_TAR_PATH_VALIDATION = PASS_FOR_7 / 7 TAR_OBJECTS
GCS_DIRECT_OUTPUT_CONTRACT = 1 / 1 BOUND
CIPD_UNSAFE_MEMBER_PATHS = 0
CIPD_SYMLINK_MEMBERS = 0
NESTED_GITLINKS_OBSERVED = 1
NESTED_GITLINKS_ACQUIRED = 0
CIPD_CLIENT_VERSION_IDENTITY = ESTABLISHED
CIPD_CLIENT_LINUX_AMD64_DIGEST = ESTABLISHED
CIPD_CLIENT_BODY = NOT_YET_ACQUIRED
MATERIALIZATION_EXECUTION = NOT_PERFORMED
004C1DS_RESULT = PASS_STATIC_CONTRACT_WITH_ONE_EXPLICIT_SUCCESSOR_BLOCKER
```

The one dependency-order blocker is exact acquisition of the pinned Linux/amd64 CIPD client body. This document creates no authority to acquire or execute it; that requires fresh Issue #7 successor reconciliation after 004C1DS becomes canonical.

## 14. Non-grants

```text
ARCHIVE_EXTRACTION = NOT_AUTHORIZED
CIPD_PACKAGE_INSTALLATION = NOT_AUTHORIZED
CIPD_CLIENT_DOWNLOAD = NOT_AUTHORIZED
CIPD_CLIENT_EXECUTION = NOT_AUTHORIZED
WORKSPACE_MATERIALIZATION_EXECUTION = NOT_AUTHORIZED
SUBMODULE_ACQUISITION = NOT_AUTHORIZED
GIT_NETWORK_FETCH_FOR_DEPENDENCIES = NOT_AUTHORIZED
NEW_CIPD_OR_GCS_DOWNLOAD = NOT_AUTHORIZED
GCLIENT_EXECUTION = NOT_AUTHORIZED
HOOK_EXECUTION = NOT_AUTHORIZED
ACQUIRED_SOURCE_EXECUTION = NOT_AUTHORIZED
GN_EXECUTION = NOT_AUTHORIZED
NINJA_EXECUTION = NOT_AUTHORIZED
CLANG_EXECUTION = NOT_AUTHORIZED
RUST_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
PDFIUM_CONFIGURATION = NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
PDFIUM_RUNTIME = NOT_AUTHORIZED
REPOSITORY_SOURCE_IMPORT = NOT_AUTHORIZED
PACKAGE_JSON_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
WORKFLOW_MUTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE_OR_DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION_CLAIM = NOT_AUTHORIZED
```

## 15. Merge discipline and successor boundary

This candidate is merge-eligible only if:

1. it remains exactly one changed repository file and one commit on canonical base `5c34f8badd70db3ac343defbc09b53d85b70bb4c` before review;
2. `git diff --check` is clean;
3. a fresh independent substantive review examines the exact current head and finds no material/actionable issue;
4. every material finding is repaired forward-only and receives a fresh exact-head review;
5. zero unresolved material review threads remain;
6. an immediate premerge race proof shows canonical `main` and candidate head unchanged and applicable required checks satisfied;
7. merge uses the exact reviewed head without force-push, rebase, or history rewrite;
8. postmerge tree, ordered parents, signature, changed path/blob, workflow state, and open-PR frontier are mechanically verified.

If those gates close, Issue #7 may consider the smallest successor:

```text
CANDIDATE_SUCCESSOR = 004C1DT_EXACT_PINNED_CIPD_CLIENT_BODY_ACQUISITION_QUALIFICATION
PURPOSE = acquire and hash-verify the exact Linux/amd64 CIPD client body pinned by exact depot_tools, without executing it
```

That candidate name is informational only. Authority must come from a fresh postmerge Issue #7 reconciliation.
