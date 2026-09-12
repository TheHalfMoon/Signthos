# 004C1DM — Exact Recursive DEPS Root Acquisition Qualification

Status: `QUALIFICATION_CANDIDATE / EXACT_RECURSIVE_ROOT_ACQUISITION_PASS / ZERO_SOURCE_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `0f7bdd3ef431342f2a801270917c96ac18808f13`
Canonical base tree: `29e80d52cc77a59bafd43c2fcbf0d88a861bc132`
Runtime authority: `github:issue-comment:5642804069`
Runtime closeout and document authority: `github:issue-comment:5642821129`

## 1. Purpose and authority boundary

Canonical 004C1DL established the exact Linux/x64 top-level acquisition selector set but stopped before byte acquisition because full transitive dependency closure was blocked by three `recursedeps` roots. 004C1DM closes only that information prerequisite: acquire those three exact Git roots, prove their acquired Git identities and integrity, and bind the exact recursion metadata bytes without executing any acquired source.

```text
004C1DM_AUTHORITY = EXACT_RECURSIVE_DEPS_ROOT_ACQUISITION_ONLY
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1dm-exact-recursive-deps-root-acquisition-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
ACQUIRED_SOURCE_EXECUTION = 0
GCLIENT_EXECUTION = 0
CIPD_EXECUTION = 0
GCS_DOWNLOAD = 0
HOOK_EXECUTION = 0
TOOLCHAIN_EXECUTION = 0
PDFIUM_BUILD_EXECUTION = 0
REPOSITORY_SOURCE_IMPORT = 0
WAIVER = NO
```

## 2. Canonical predecessor truth

```text
004C1DL = CLOSED_CANONICAL
004C1DL_PR = #205
004C1DL_MERGE = 0f7bdd3ef431342f2a801270917c96ac18808f13
004C1DL_MERGE_TREE = 29e80d52cc77a59bafd43c2fcbf0d88a861bc132
TOP_LEVEL_SELECTOR_RECORDS = 42
TOP_LEVEL_GIT_SELECTORS = 33
TOP_LEVEL_CIPD_SELECTORS = 6
TOP_LEVEL_GCS_OBJECT_SELECTORS = 3
FULL_TRANSITIVE_DEPS_CLOSURE = NOT_ESTABLISHED
TOP_LEVEL_RECURSEDEPS = build, buildtools, third_party/instrumented_libs
```

004C1DM deliberately acquired only the three recursion roots. It did not broaden authority to the other top-level Git selectors, CIPD selectors, or GCS byte selectors.

## 3. Preserved fail-closed launcher history

The first local launcher created only `authority.txt` and `targets.tsv`, then failed under shell `nounset` before the first `git fetch` because a local directory variable referenced the root-name variable in the same declaration. That failed root is preserved. No network acquisition occurred in V1. V2 used a fresh evidence root, the same exact authorized origins and revisions, and no history rewrite or selector substitution.

```text
V1_ROOT = /private/tmp/signthos-004c1dm-recursive-roots-20260912T021714Z-24969
V1_RESULT = FAILED_BEFORE_NETWORK_ACQUISITION
V2_ROOT = /private/tmp/signthos-004c1dm-recursive-roots-v2-20260912T021831Z-25142
V2_RESULT = PASS
```

## 4. Transport hardening

Each V2 repository was initialized in its own fresh external directory. Git fetch used only the exact commit SHA at the exact authorized HTTPS origin, with inherited HTTP/HTTPS/all-proxy variables removed, global/system Git configuration disabled, terminal prompting disabled, credential helpers disabled, Git HTTP proxy disabled, and `http.followRedirects=false`. No branch head or tag was accepted as an identity substitute.

Observed fetch origins remained the authorized origins:

```text
From https://chromium.googlesource.com/chromium/src/build
From https://chromium.googlesource.com/chromium/src/buildtools
From https://chromium.googlesource.com/chromium/third_party/instrumented_libraries
```

## 5. Exact acquired root identities

### Chromium build

```text
HEAD = 06d247cb917bb5fac3103b1b7dccb75368a553ce
TREE = e01b69d7c03521219d8b95e0e5b49af18be45c5d
ORIGIN = https://chromium.googlesource.com/chromium/src/build.git
GIT_TREE_ENTRIES = 1455
GIT_TREE_BLOBS = 1455
SYMLINKS = 0
GIT_TREE_MANIFEST_SHA256 = d410d684abec92e30bfc0333f1851507b697be22a73894bb47ff09771489df28
FSCK_STDERR_BYTES = 0
STATUS_BYTES = 0
RAW_PARENT = 5280516e99101a28b399c0977e46bd0b54f6910b
FSCK = PASS
CHECKOUT_STATUS = CLEAN
```

### Chromium buildtools

```text
HEAD = 6a18683f555b4ac8b05ac8395c29c84483ac9588
TREE = 8a36f872e24a56fe517682e14bc897ceb28f8058
ORIGIN = https://chromium.googlesource.com/chromium/src/buildtools.git
GIT_TREE_ENTRIES = 78
GIT_TREE_BLOBS = 78
SYMLINKS = 0
GIT_TREE_MANIFEST_SHA256 = a153ff87d22ae5a8716df9d5661378c58742ace11261ca08804e43adc09d8b03
FSCK_STDERR_BYTES = 0
STATUS_BYTES = 0
RAW_PARENT = 4dc32b3f510b330137385e2b3a631ca8e13a8e22
FSCK = PASS
CHECKOUT_STATUS = CLEAN
```

### Instrumented libraries

```text
HEAD = e8cb570a9a2ee9128e2214c73417ad2a3c47780b
TREE = 651502f72d94a6c75baf64edb2090a894af13d63
ORIGIN = https://chromium.googlesource.com/chromium/third_party/instrumented_libraries.git
GIT_TREE_ENTRIES = 61
GIT_TREE_BLOBS = 61
SYMLINKS = 0
GIT_TREE_MANIFEST_SHA256 = 3b1a3c565e8149ce1804aabac718b3d0faf0c6871faa8100343fe8f44809c2bf
FSCK_STDERR_BYTES = 0
STATUS_BYTES = 0
RAW_PARENT = 69015643b3f68dbd438c010439c59adc52cac808
FSCK = PASS
CHECKOUT_STATUS = CLEAN
```

All three exact commits were detached checkouts. `git fsck --full --strict` produced no stderr, and `git status --porcelain` was empty for each acquired root.

## 6. Root recursion metadata identities

Only the root `DEPS` file of each top-level `recursedeps` entry is promoted here as the current recursion frontier:

| Recursion root | Path | Git blob | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| `build` | `build/DEPS` | `9bafc137a30cbc52b1acf24a08f5ce4b3908e73b` | 3703 | `a2b844fcfe7357580ea6691fc0c94157d1b439b4bdc95b56c1c7fcf5fe24e8c6` |
| `buildtools` | `buildtools/DEPS` | `373b526bae915b1aad8248983d45ff22d3f9a20b` | 2000 | `72317f8d247e4a40a8629efaf0d267302258715ddc38b4d28448f1fecb4bb9b4` |
| `third_party/instrumented_libs` | `third_party/instrumented_libs/DEPS` | `21357bcdcf6dca6292b8df75ec9dce0f89a0d424` | 1127 | `1405cef79e0ba612179aab38100dd704f65db8a0e24b2aa8abb841cd20b5afcc` |

No root `DEPS` file was executed or semantically expanded by 004C1DM. Their bytes are identity evidence only.

## 7. Complete observed DEPS-file inventory

The exact acquired Git trees contain the following files named `DEPS`. Presence alone does not make a subordinate file part of the current gclient recursion frontier.

| Acquired root | Relative path | Git blob | Bytes | SHA-256 | Classification |
| --- | --- | --- | ---: | --- | --- |
| `build` | `DEPS` | `9bafc137a30cbc52b1acf24a08f5ce4b3908e73b` | 3703 | `a2b844fcfe7357580ea6691fc0c94157d1b439b4bdc95b56c1c7fcf5fe24e8c6` | current root recursion frontier |
| `build` | `rust/allocator/DEPS` | `923a2e07c80f48c82baf3be62f771c419ba11200` | 115 | `a157a37b5f57a3fa2e451157818d759c471c54a20e73e17d75edc456d3675241` | subordinate / not promoted by filename presence |
| `buildtools` | `DEPS` | `373b526bae915b1aad8248983d45ff22d3f9a20b` | 2000 | `72317f8d247e4a40a8629efaf0d267302258715ddc38b4d28448f1fecb4bb9b4` | current root recursion frontier |
| `buildtools` | `checkdeps/DEPS` | `7a57b0bcc8ea8cce899d05344fce157fe756bda8` | 40 | `1460786d7715d87fc0290dd2b094e84e0e6d19046711553001670df451e168e8` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/DEPS` | `2220b5785999557b6828c41b590a88b38b9199ae` | 197 | `41824df5a5f76b7ee93a08e7fcd4f3d660ff8ea9325402a4e921302a73c7139c` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/allowed/DEPS` | `1e44d162ff089c08a58e5fe1747f79f3b7f00eec` | 364 | `3f021a2ef278f2521f8fa19adc065e1ca31e9dadb11ee8677532c0f8a01889ff` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/checkdeps_test/DEPS` | `91a9b990c32ab0ce1bd0326681db0262212d0af8` | 91 | `e4b9a24c9e8c645d9ccbb0adbf92da4ab66dce99756af7a026bc8fe9d501b48d` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/checkdeps_test/allowed/DEPS` | `a6340815d10aea6ad1a528dcae9a0855f4fbc565` | 205 | `06e3f87cdb97600b635ff471cc77c3122e346a479a2a8551341f1f400c55fe6e` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/checkdeps_test/disallowed/allowed/DEPS` | `2be72b801885779e5e1c22680067240d0247ad30` | 39 | `2c25b6203830ec88885c4fad6cacff8d2c12a16ed619279af5c6850831a5fa3f` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/disallowed/allowed/DEPS` | `2be72b801885779e5e1c22680067240d0247ad30` | 39 | `2c25b6203830ec88885c4fad6cacff8d2c12a16ed619279af5c6850831a5fa3f` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/noparent/DEPS` | `3e0f1370afaa5a0cf4c0a56ab121add30adf2aec` | 126 | `bada4e3c3271e3495b92fbc2c2b165e08b193206d181cdfe84478777a3435fdd` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/requires_review/sub/DEPS` | `607bd204758390444d49f0706c173c68e77ea9be` | 33 | `4ddb7cd813c189975c4833ca77504cb57bfa00203b0d42f087b2060c8fbd4d90` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/requires_review/sub/sub/DEPS` | `607bd204758390444d49f0706c173c68e77ea9be` | 33 | `4ddb7cd813c189975c4833ca77504cb57bfa00203b0d42f087b2060c8fbd4d90` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/requires_review/sub/sub/no_review/DEPS` | `8573169b606ef56cc78003ec8d3b8838ab1ce182` | 34 | `e031efd2526b14b414bbf2a6d3df030d4eb2ecece9df942b6565af09199683ae` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/requires_review_users/DEPS` | `619f4a542bc78a3eccf8cd0cc9d46ae31082d7ff` | 72 | `e85abb621d17efeb608264da6d5a62613634380d9d78cdefba9c8d31c2d7f867` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/requires_review_users/sub/includes_okay/DEPS` | `67db8c2e10bdf730a309bfc30675f2f29e1d074d` | 188 | `976811d72573cb5ec4197ab3f9417ce8a8e73486e2f637241df1fbfa7f7854eb` | subordinate / not promoted by filename presence |
| `buildtools` | `checkdeps/testdata/requires_review_users/sub/includes_only_sub/DEPS` | `15dd896786eb932ff165ea110f59d438072c3946` | 138 | `8ba4dac82b3353b73db87d3f0d4cca640135539b3bd1845c1d535c0f5e969e29` | subordinate / not promoted by filename presence |
| `instrumented_libs` | `DEPS` | `21357bcdcf6dca6292b8df75ec9dce0f89a0d424` | 1127 | `1405cef79e0ba612179aab38100dd704f65db8a0e24b2aa8abb841cd20b5afcc` | current root recursion frontier |

The subordinate inventory includes `build/rust/allocator/DEPS` and fourteen `buildtools` subordinate/test-fixture `DEPS` files. 004C1DM makes no runtime-relevance claim for those files.

## 8. Deterministic tree-content evidence

Each root has a Git-tree-derived JSONL manifest that binds every recursive blob to path, mode, Git object ID, byte count, and SHA-256 content identity. No symlink is present in any of these three exact trees.

```text
BUILD_MANIFEST_SHA256 = d410d684abec92e30bfc0333f1851507b697be22a73894bb47ff09771489df28
BUILDTOOLS_MANIFEST_SHA256 = a153ff87d22ae5a8716df9d5661378c58742ace11261ca08804e43adc09d8b03
INSTRUMENTED_LIBS_MANIFEST_SHA256 = 3b1a3c565e8149ce1804aabac718b3d0faf0c6871faa8100343fe8f44809c2bf
ROOT_DEPS_IDENTITIES_SHA256 = 657a72771eced823e681250f8f932f9574d1418dafc3b15196b10e99b7269b48
```

## 9. External evidence closure

```text
HOST_EVIDENCE_ROOT = /private/tmp/signthos-004c1dm-recursive-roots-v2-20260912T021831Z-25142
EVIDENCE_FILES = 51
EVIDENCE_BYTES = 650581
EVIDENCE_INVENTORY_SHA256 = 16e7379020537d374396790ed038ab8b755130ba32b8ef790edbf44d53688d78
QUALIFICATION_SUMMARY_SHA256 = 1c653fcb2fa6c628e4ab319057d5a0998c18cafebc84577bf057b1caee295a5b
```

The evidence root preserves transport stdout/stderr, raw commit objects and parent OIDs, shallow-boundary files, exact heads/trees/origins, fsck results, checkout status, recursive tree listings, deterministic manifests, symlink inventories, all observed `DEPS` file identities, the V1 failure-root inventory, and the final evidence inventory.

## 10. What 004C1DM establishes

```text
004C1DM_RESULT = PASS_EXACT_RECURSIVE_DEPS_ROOT_ACQUISITION
BUILD_EXACT_ROOT_ACQUIRED = TRUE
BUILDTOOLS_EXACT_ROOT_ACQUIRED = TRUE
INSTRUMENTED_LIBS_EXACT_ROOT_ACQUIRED = TRUE
ALL_THREE_GIT_OBJECT_INTEGRITY = PASS
THREE_ROOT_DEPS_BYTE_IDENTITIES = ESTABLISHED
NESTED_DEPS_SEMANTIC_EXPANSION = NOT_PERFORMED
FULL_TRANSITIVE_DEPS_CLOSURE = NOT_ESTABLISHED
OTHER_TOP_LEVEL_DEPENDENCY_BYTES_ACQUIRED_BY_004C1DM = 0
WAIVER = NO
```

## 11. Explicit non-grants

```text
NESTED_DEPS_PLAN_EXPANSION = NOT_AUTHORIZED
NEW_NETWORK_ACQUISITION = NOT_AUTHORIZED
OTHER_TOP_LEVEL_GIT_DEPENDENCY_ACQUISITION = NOT_AUTHORIZED
CIPD_METADATA_OR_BYTE_ACQUISITION = NOT_AUTHORIZED
CIPD_CLIENT_BOOTSTRAP_OR_EXECUTION = NOT_AUTHORIZED
GCS_OBJECT_DOWNLOAD = NOT_AUTHORIZED
GCLIENT_EXECUTION = NOT_AUTHORIZED
HOOK_EXECUTION = NOT_AUTHORIZED
GN_NINJA_CLANG_RUST_EXECUTION = NOT_AUTHORIZED
SNAPSHOT_IMAGE_OR_CONTAINER_EXECUTION = NOT_AUTHORIZED
PDFIUM_CONFIGURATION_BUILD_LINK_RUNTIME = NOT_AUTHORIZED
REPOSITORY_SOURCE_IMPORT = NOT_AUTHORIZED
PROVIDER_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE_OR_DEPLOYMENT = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
```

## 12. Successor boundary

After canonical merge, fresh Issue #7 reconciliation may authorize static semantic expansion of the three exact root `DEPS` byte sets under the inherited Linux/x64/default context. It must not infer full transitive closure until any newly discovered recursive roots are themselves acquired and qualified. No additional byte acquisition or build execution is implied by this document.

## 13. Merge gate

Fresh independent substantive exact-head review is mandatory. Any material repair must be forward-only and freshly reviewed. Merge requires zero unresolved material threads, immediate base/head/frontier race proof, normal expected-head merge, mechanical post-merge verification, and fresh Issue #7 successor reconciliation.
