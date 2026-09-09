# 004C1AF — PDFium Deterministic Build Provisioning Contract Qualification

Status: `QUALIFICATION_CANDIDATE / PUBLIC_BUILD_PROVISIONING_METADATA_AND_PLANNING_ONLY / ZERO_PROVISIONING_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `db6340d205d9b1411f3d0ceb59d5a6bb56887f4b`
Canonical base tree: `7c4a628953dda6f94b5a9e17514705ca81857dd1`
Authority source: `github:issue-comment:5607054203`

## 1. Purpose and authority

Canonical 004C1AE proved that the upstream EmbedPDF PDFium Docker path is not reproducible enough to support merge-critical source-to-WASM or component-notice evidence as written. This grain defines the smallest deterministic release-builder provisioning contract that can be supported by static public metadata, and identifies the exact remaining metadata-closure blocker before any provisioning execution may be authorized.

```text
004C1AF_AUTHORITY = BOUNDED_PUBLIC_BUILD_PROVISIONING_METADATA_AND_PLANNING_ONLY
004C1AF_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1af-pdfium-deterministic-build-provisioning-contract-qualification.md
004C1AF_MAX_CHANGED_REPOSITORY_FILES = 1
PUBLIC_IMMUTABLE_GITHUB_METADATA_READ = AUTHORIZED
PUBLIC_BUILD_IMAGE_REGISTRY_METADATA_READ = AUTHORIZED
PUBLIC_FIRST_PARTY_TOOLCHAIN_RELEASE_METADATA_READ = AUTHORIZED
PUBLIC_OS_PACKAGE_SNAPSHOT_METADATA_READ = AUTHORIZED
PUBLIC_PACKAGE_REPOSITORY_METADATA_READ = AUTHORIZED
STATIC_BUILD_SCRIPT_CONTAINER_AND_DEPS_METADATA_INSPECTION = AUTHORIZED
BUILD_ENVIRONMENT_EXECUTION = NOT_AUTHORIZED
DOCKER_IMAGE_PULL_OR_BUILD = NOT_AUTHORIZED
APT_METADATA_RESOLVER_EXECUTION = NOT_AUTHORIZED
APT_PACKAGE_INSTALLATION = NOT_AUTHORIZED
NODE_OR_RUST_TOOLCHAIN_INSTALLATION = NOT_AUTHORIZED
DEPOT_TOOLS_CLONE_OR_EXECUTION = NOT_AUTHORIZED
GCLIENT_SYNC = NOT_AUTHORIZED
GN_OR_NINJA_EXECUTION = NOT_AUTHORIZED
PDFIUM_BUILD_OR_LINK_EXECUTION = NOT_AUTHORIZED
PACKAGE_INSTALLATION = NOT_AUTHORIZED
PROVIDER_RUNTIME_EXECUTION = NOT_AUTHORIZED
PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
REPOSITORY_UPSTREAM_SOURCE_IMPORT = NOT_AUTHORIZED
NOTICE_SBOM_PROVENANCE_REPOSITORY_MUTATION = NOT_AUTHORIZED
PACKAGE_JSON_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No image, OS package, toolchain, upstream source tree, dependency, generated build artifact, or runtime byte enters Signthos in this grain.

## 2. Canonical source identities consumed without reopening

```text
EMBEDPDF_REPOSITORY = https://github.com/embedpdf/embed-pdf-viewer
EMBEDPDF_TAG = refs/tags/v2.15.0
EMBEDPDF_SOURCE_COMMIT = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
PDFIUM_SUBMODULE_URL = https://github.com/embedpdf/pdfium.git
PDFIUM_GITLINK = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
PDFIUM_DEPS_SHA256 = f456f116824717cde93a32fa9cb2df1bae776226dadfa225a211dd5686ed05f1
```

The moving `.gitmodules` branch metadata `embedpdf/main` remains descriptive only. The exact gitlink commit is the merge-critical source identity.

## 3. Fresh external evidence binding

All fresh metadata bytes were written only beneath an ephemeral external evidence root. The compact evidence manifest is:

```text
004C1AF_EXTERNAL_EVIDENCE_MANIFEST_BYTES = 4580
004C1AF_EXTERNAL_EVIDENCE_MANIFEST_SHA256 = 761bdeb32324b15ea8423df7c365977ec1ebb13d3f4853fd85267f98f1421fd1
```

Relevant immutable source-file identities were re-read at the exact EmbedPDF commit:

| Path | Bytes | SHA-256 |
|---|---:|---|
| `.gitmodules` | 146 | `a66e78a932189e265043442f33e4e809d7a2adb849c31b1274546f735a214105` |
| `packages/pdfium/Dockerfile` | 3831 | `c6a7f6a71cd75abee90a1262526240ca811417f9f3bd060d3f429ed7f1d5ef0c` |
| `packages/pdfium/docker-compose.yml` | 1602 | `9831f5da704a3215106e6fae5bc3ba7906e5769553e2db11030b403b02c107c3` |
| `packages/pdfium/Makefile` | 164 | `4cca97c0b7b70d3cda0df66016d0444e4b1485753417bc7e23fd9f2142f6d41a` |
| `packages/pdfium/scripts/build.sh` | 3165 | `91f63a02f4cc79aff4ab3f47ee4203ae8b4ed5be1b8448554d55fe678b752a4e` |
| `packages/pdfium/scripts/dev.sh` | 4343 | `73c8422170f8f563046abc8c80ad07aafc8c96304c17ba6fc3735389aa15a821` |
| `.github/workflows/release.yml` | 4733 | `1b8317274eaad2418e0ebb56bf25e154767577c4e91589a02e6ba46b01feb7b8` |
| `.github/workflows/release-next.yml` | 4806 | `952c80c94f8e9f5e20b3c8c7e9e24609fe964764037d9c34c45e9f0519d68242` |
| `packages/pdfium/build/generate-functions.mjs` | 4170 | `046c2a7c22c907c8bb221caf5593d305120acea569db0062cef99067505a4e01` |
| `packages/pdfium/build/generate-runtime-methods.mjs` | 5285 | `b32930f1eee7ca498649c6cf1f33c04294f6668a9a681d0d531f3e33ff87f63b` |

Raw registry, source, snapshot, and helper-script bytes remain external evidence only.

## 4. Content-addressed Emscripten base selection

The upstream Dockerfile names `emscripten/emsdk:3.1.70`. Fresh Docker Registry metadata binds the observed exact Linux/amd64 manifest:

```text
SELECTED_BASE_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
OBSERVED_TAG = docker.io/emscripten/emsdk:3.1.70
MANIFEST_DIGEST = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
CONFIG_DIGEST = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
PLATFORM = linux/amd64
IMAGE_CREATED = 2024-10-25T02:01:37.555008906Z
BASE_OS_LABEL = ubuntu/22.04
```

A future provisioning-evidence run must address the base by digest, verify the returned manifest digest before any filesystem use, prohibit tag substitution, and record the image/config identities again. 004C1AF does not pull the image.

## 5. Node generator runtime selection

The exact selected image config exposes:

```text
/emsdk/node/20.18.0_64bit/bin
```

on its declared `PATH`. At the exact EmbedPDF source commit, both release workflows use `actions/setup-node@v4` with `node-version: 20`. The two build-generator modules inspected by this grain import only Node built-ins `node:fs`, `node:path`, and `node:url` and use standard ESM/runtime primitives.

Therefore the deterministic provisioning contract selects the image-embedded runtime for future evidence rather than the moving NodeSource `setup_22.x` layer:

```text
SELECTED_NODE_RUNTIME_VERSION = 20.18.0
SELECTED_NODE_RUNTIME_PATH = /emsdk/node/20.18.0_64bit/bin/node
NODE_SOURCE = CONTENT_ADDRESSED_EMSDK_IMAGE
NODESOURCE_SETUP_22_X = EXCLUDED_FROM_DETERMINISTIC_RELEASE_BUILDER
NODE_MAJOR_STATIC_COMPATIBILITY_CORROBORATION = EMBEDPDF_RELEASE_WORKFLOWS_USE_NODE_20
NODE_GENERATOR_STATIC_API_SURFACE = NODE_BUILTINS_ONLY_IN_INSPECTED_GENERATORS
NODE_EXECUTABLE_SHA256 = MUST_BE_MEASURED_AFTER_SEPARATELY_AUTHORIZED_IMAGE_ACQUISITION
NODE_RUNTIME_BEHAVIOR = NOT_EXECUTED / NOT_PROVEN_BY_004C1AF
```

This is a provisioning selection, not a claim that the published npm WASM was built with Node 20.18.0 and not proof that future build output will match it.

## 6. Exact depot_tools and PDFium source selection

The exact PDFium `DEPS` file records:

```text
DEPOT_TOOLS_REVISION = 6235028c6b18b73e68f5414f935ec537a25ea51a
PDFIUM_GITLINK = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
```

The deterministic release-builder contract therefore prohibits:

```text
git clone ... depot_tools.git -b main
bootstrap gclient sync against current PDFium main
```

as identity-bearing inputs. A future provisioning-evidence run must acquire `depot_tools` at exactly `6235028c6b18b73e68f5414f935ec537a25ea51a`, verify its acquired source/archive identity, and operate only on the canonical PDFium gitlink source. Any moving branch observation is nonqualifying.

## 7. PDFium DEPS-derived tool selectors

The exact PDFium `DEPS` metadata provides immutable selectors including:

```text
GN_VERSION = git_revision:bd3356ac13f411b521b16b11da12cec5150e917c
NINJA_VERSION = version:3@1.12.1.chromium.4
CLANG_REVISION = a1542f2952bcc47640d5cfbc39bb8f6926a1bf6a
RUST_REVISION = 7da7c8be1f1b4ba32dcfd73ddc59ea48a376c041
CHROMIUM_BUILD_REVISION = 06d247cb917bb5fac3103b1b7dccb75368a553ce
```

The exact Chromium `build` dependency at `06d247cb917bb5fac3103b1b7dccb75368a553ce` contains:

| Path | Bytes | SHA-256 |
|---|---:|---|
| `install-build-deps.sh` | 218 | `ed195bd040cbb52c5d9441c4bd42eddd8143a6c968293454f26c37447c55e13c` |
| `install-build-deps.py` | 27706 | `6ba801d9f651af8148a9c2627d666dfe29d01adc81236454ba193b1d773d5566` |

A future provisioning grain must bind the actual acquired GN/Ninja/Clang artifacts to their registry-native/content identities. Rust/toolchain artifacts must be admitted only if the effective release build graph requires them; 004C1AF does not infer necessity from source presence alone.

## 8. Development-only provisioning removed from release contract

The upstream Dockerfile installs Rustup and unversioned `watchexec-cli`; `scripts/dev.sh` invokes `watchexec`, while `scripts/build.sh` does not.

```text
RUSTUP_BOOTSTRAP = EXCLUDED_UNLESS_SEPARATELY_PROVEN_REQUIRED_BY_EFFECTIVE_RELEASE_GRAPH
WATCHEXEC_CLI = EXCLUDED_FROM_RELEASE_BUILDER
WATCH_LOOP = EXCLUDED_FROM_RELEASE_BUILDER
DEV_CONTAINER_TTY_OR_STDIN = EXCLUDED_FROM_RELEASE_BUILDER
```

No claim is made that PDFium itself has no Rust-bearing dependency path. The exact `DEPS` Rust selector remains recorded for later effective-graph qualification.

## 9. Ubuntu snapshot contract

The selected Emscripten base is Ubuntu 22.04-derived. A deterministic OS-package source is available through Ubuntu Snapshot Service. 004C1AF selects this exact snapshot identifier for future metadata-closure evidence:

```text
UBUNTU_SNAPSHOT_ID = 20260909T180000Z
UBUNTU_SNAPSHOT_BASE = https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/
UBUNTU_SUITE_1 = jammy
UBUNTU_SUITE_2 = jammy-updates
UBUNTU_SUITE_3 = jammy-security
```

Fresh signed `InRelease` metadata reads produced:

| Suite | Bytes | SHA-256 |
|---|---:|---|
| `jammy` | 270087 | `c14060cd8c6d625874dfcb9523a35a395bf4865c28b6b6a82569ef326fe92dc6` |
| `jammy-updates` | 128049 | `78e5c7e6f16f418c394d2d6caa4d8d10fafa715b08b038c02a8c73cd6dc4587b` |
| `jammy-security` | 128927 | `b2eb2336d267611f596e47fe9bad879db22371598047363db841d8f5f586d450` |

All three observed records report `Origin: Ubuntu`, `Codename: jammy`, and `Acquire-By-Hash: yes`. A future package-closure unit must verify the InRelease signatures with a bound Ubuntu archive keyring/fingerprint before admitting package metadata; hashes alone are not signature verification.

Live `archive.ubuntu.com`, `security.ubuntu.com`, or unconstrained `apt-get update` resolution is prohibited for merge-critical builder evidence.

## 10. Exact OS-package closure is the remaining blocker

The upstream Dockerfile names explicit APT packages, then executes `pdfium/build/install-build-deps.sh --no-prompt`. Canonical PDFium `DEPS` does not itself contain that `build/` tree; it pins Chromium `build` revision `06d247cb917bb5fac3103b1b7dccb75368a553ce`, whose exact `install-build-deps.sh` dispatches to the exact `install-build-deps.py` bound above.

That Python program does not expose one static unconditional package set. Its package selection depends on the target distro/architecture and calls `apt-cache dumpavail`, `package_exists(...)`, and `apt-get --just-print install ...` to determine available/renamed packages and dependency closure.

Consequently static source inspection cannot truthfully produce the complete exact package name/version/archive-hash closure for the selected snapshot without executing a package-metadata resolver against that snapshot.

```text
UBUNTU_SNAPSHOT_IDENTITY = ESTABLISHED
UBUNTU_INRELEASE_BYTE_IDENTITIES = ESTABLISHED
CHROMIUM_BUILD_DEPENDENCY_SCRIPT_IDENTITY = ESTABLISHED
APT_PACKAGE_SELECTION_ALGORITHM_IDENTITY = ESTABLISHED
EXACT_APT_PACKAGE_NAME_SET = NOT_ESTABLISHED
EXACT_APT_PACKAGE_VERSION_SET = NOT_ESTABLISHED
EXACT_APT_PACKAGE_ARCHIVE_SHA256_SET = NOT_ESTABLISHED
TRANSITIVE_APT_DEPENDENCY_CLOSURE = NOT_ESTABLISHED
APT_METADATA_RESOLVER_EXECUTION_AUTHORITY = ABSENT
```

This is a real dependency-order blocker, not permission to reuse live APT resolution.

## 11. Future deterministic provisioning envelope

A later provisioning-evidence path may proceed only after the exact OS-package metadata closure above is canonically established. The eventual provisioning envelope must preserve at minimum:

1. Linux/amd64 only for the first qualification;
2. Emscripten base addressed by exact manifest digest;
3. selected image-embedded Node 20.18.0 with acquired executable digest verification;
4. exact `depot_tools` commit, never `main`;
5. exact canonical PDFium gitlink, never bootstrap current PDFium;
6. exact PDFium `DEPS` plus acquired GN/Ninja/Clang and any effective Rust/tool identities;
7. one signed/hash-bound Ubuntu snapshot and exact package name/version/archive-hash closure;
8. no Rustup/watchexec/watch tooling unless independently proven necessary;
9. direct verified HTTPS only to explicitly authorized first-party origins, no proxy/custom CA/credentials/mirror/cross-origin redirect;
10. fresh isolated cache/store/temp/evidence roots outside Signthos;
11. read-only Signthos source input until a separately authorized output-evidence phase defines writable surfaces;
12. complete process, network, filesystem, image/layer, package/toolchain, environment and output accounting.

No builder output may be called reproducible merely because provisioning becomes deterministic. Source-to-acquired-WASM equality remains a later execution result.

## 12. Qualification result

```text
004C1AF_RESULT = QUALIFIED_DETERMINISTIC_PROVISIONING_CONTRACT_WITH_OS_PACKAGE_CLOSURE_BLOCKER
CONTENT_ADDRESSED_EMSDK_BASE = SELECTED
NODE_RUNTIME = SELECTED_FOR_PROVISIONING / BYTE_HASH_PENDING_ACQUISITION
DEPOT_TOOLS = EXACT_COMMIT_SELECTED
CANONICAL_PDFIUM_SOURCE = EXACT_GITLINK_SELECTED
GN_NINJA_CLANG_SELECTORS = EXACT_METADATA_BOUND
RUST_TOOLCHAIN = CONDITIONAL_ON_EFFECTIVE_GRAPH
DEV_WATCHEXEC = EXCLUDED
UBUNTU_SNAPSHOT = EXACT_ID_AND_INRELEASE_BYTES_BOUND
EXACT_OS_PACKAGE_METADATA_CLOSURE = NOT_ESTABLISHED
READY_FOR_PROVISIONING_EVIDENCE = BLOCKED
BUILD_EXECUTION_AUTHORITY = ABSENT
PDFIUM_COMPONENT_NOTICE_COMPLETENESS = PARTIAL
DISTRIBUTION_ADOPTION_GATE = FAIL_CLOSED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

The smallest next prerequisite is an exact snapshot-bound OS-package metadata-closure qualification. It must remain distinct from package download/install and from image/build execution.

## 13. Candidate acceptance gates

This candidate is eligible for merge only if its exact final head proves:

1. canonical base/tree equal the verified PR #147 merge;
2. exactly this one Signthos-authored qualification file changes;
3. exact source/image/DEPS/helper identities are rebound from real metadata;
4. Node selection is explicitly provisioning-only and does not claim published-WASM build identity;
5. development-only watch tooling is excluded without overclaiming the effective PDFium Rust graph;
6. Ubuntu snapshot and signed-metadata byte identities are explicit while signature verification remains a later required check;
7. the dynamic package-selection dependency is represented as a blocker rather than guessed from source;
8. no image/package/toolchain/source dependency is pulled, installed, executed or committed;
9. exact-head provider/check state is accounted truthfully;
10. fresh independent substantive exact-head review reports no unresolved material finding;
11. every material finding is repaired forward-only and any changed head is freshly reviewed;
12. unresolved material review threads are zero;
13. immediate premerge base/head/race proof passes;
14. guarded normal merge uses exact expected-head protection;
15. mechanical post-merge verification proves tree/parents/signature/surface;
16. fresh Issue #7 reconciliation derives any successor before package-metadata resolver execution.

Until every gate above closes, 004C1AF remains candidate-only and creates no downstream authority.
