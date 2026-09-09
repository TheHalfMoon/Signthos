# 004C1AE — PDFium Build Environment Provenance Qualification

Status: `QUALIFICATION_CANDIDATE / PUBLIC_BUILD_ENVIRONMENT_METADATA_AND_PLANNING_ONLY / ZERO_BUILD_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `910b87bcb05c88517238d6f244b8dc6cf430aefc`
Canonical base tree: `5f60b91ee109c5b4ad3c2d955fb4fa21f7751b65`
Authority source: `github:issue-comment:5606699471`

## 1. Purpose and authority

Canonical 004C1AD established that the published PDFium WASM archive has real license material but does not have a proven component-complete notice mapping. Its next missing evidence requires an exact component/link closure and a source-to-acquired-WASM reproducibility or attestation binding.

004C1AE closes the prerequisite question that must be answered before any such build execution: whether the upstream EmbedPDF build environment is itself immutable enough to produce merge-critical reproducibility evidence.

```text
004C1AE_AUTHORITY = BOUNDED_PUBLIC_BUILD_ENVIRONMENT_METADATA_AND_PLANNING_ONLY
004C1AE_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ae-pdfium-build-environment-provenance-qualification.md
004C1AE_MAX_CHANGED_REPOSITORY_FILES = 1
PUBLIC_IMMUTABLE_GITHUB_METADATA_READ = AUTHORIZED
PUBLIC_BUILD_IMAGE_REGISTRY_METADATA_READ = AUTHORIZED
PUBLIC_FIRST_PARTY_TOOLCHAIN_RELEASE_METADATA_READ = AUTHORIZED
PUBLIC_PACKAGE_REPOSITORY_METADATA_READ = AUTHORIZED
STATIC_BUILD_SCRIPT_AND_CONTAINER_METADATA_INSPECTION = AUTHORIZED
BUILD_ENVIRONMENT_EXECUTION = NOT_AUTHORIZED
DOCKER_IMAGE_PULL_OR_BUILD = NOT_AUTHORIZED
APT_PACKAGE_INSTALLATION = NOT_AUTHORIZED
NODE_OR_RUST_TOOLCHAIN_INSTALLATION = NOT_AUTHORIZED
DEPOT_TOOLS_CLONE_OR_EXECUTION = NOT_AUTHORIZED
GCLIENT_SYNC = NOT_AUTHORIZED
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

No image, package, toolchain, dependency, or upstream source byte is committed by this grain.

## 2. Exact source/build inputs rebound

The canonical source identities remain:

```text
EMBEDPDF_REPOSITORY = https://github.com/embedpdf/embed-pdf-viewer
EMBEDPDF_TAG = refs/tags/v2.15.0
EMBEDPDF_TAG_API_LOCATOR = https://api.github.com/repos/embedpdf/embed-pdf-viewer/git/ref/tags/v2.15.0
EMBEDPDF_SOURCE_COMMIT = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
EMBEDPDF_COMMIT_API_LOCATOR = https://api.github.com/repos/embedpdf/embed-pdf-viewer/git/commits/2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
PDFIUM_SUBMODULE_URL = https://github.com/embedpdf/pdfium.git
PDFIUM_SUBMODULE_BRANCH_METADATA = embedpdf/main
PDFIUM_GITLINK = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
PDFIUM_COMMIT_API_LOCATOR = https://api.github.com/repos/embedpdf/pdfium/git/commits/cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
```

The repository-qualified immutable raw-content prefix used for the exact build-control file reads is:

```text
https://raw.githubusercontent.com/embedpdf/embed-pdf-viewer/2cf7df3b594dfe46de2d85e6973ff50ea447a1ed/
```

The exact `.gitmodules` file at the same EmbedPDF commit binds `packages/pdfium/pdfium-src` to `https://github.com/embedpdf/pdfium.git`; the tree entry for that path is the gitlink SHA recorded above. The moving `branch = embedpdf/main` metadata is not used as merge-critical identity; the exact gitlink commit is.

Exact build-control file identities at the EmbedPDF source commit:

| Path | Bytes | SHA-256 |
|---|---:|---|
| `packages/pdfium/Dockerfile` | 3831 | `c6a7f6a71cd75abee90a1262526240ca811417f9f3bd060d3f429ed7f1d5ef0c` |
| `packages/pdfium/docker-compose.yml` | 1602 | `9831f5da704a3215106e6fae5bc3ba7906e5769553e2db11030b403b02c107c3` |
| `packages/pdfium/Makefile` | 164 | `4cca97c0b7b70d3cda0df66016d0444e4b1485753417bc7e23fd9f2142f6d41a` |
| `packages/pdfium/scripts/build.sh` | 3165 | `91f63a02f4cc79aff4ab3f47ee4203ae8b4ed5be1b8448554d55fe678b752a4e` |
| `packages/pdfium/scripts/dev.sh` | 4343 | `73c8422170f8f563046abc8c80ad07aafc8c96304c17ba6fc3735389aa15a821` |

The external 004C1AE evidence manifest is bound as:

```text
004C1AE_EXTERNAL_EVIDENCE_MANIFEST_BYTES = 4000
004C1AE_EXTERNAL_EVIDENCE_MANIFEST_SHA256 = 99909583ecdea6f9726581385fe570d7363a6cb77f1593a85e1d1d45004c6d91
```

Raw metadata snapshots remain external ephemeral evidence only.

## 3. Emscripten base image identity

The Dockerfile names:

```text
FROM emscripten/emsdk:3.1.70
```

Fresh Docker registry metadata inspection, without pulling the image filesystem, observed the current tag binding:

```text
OBSERVED_IMAGE_REFERENCE = docker.io/emscripten/emsdk:3.1.70
OBSERVED_MANIFEST_MEDIA_TYPE = application/vnd.docker.distribution.manifest.v2+json
OBSERVED_MANIFEST_DIGEST = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
OBSERVED_CONFIG_DIGEST = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
OBSERVED_PLATFORM = linux/amd64
OBSERVED_IMAGE_CREATED = 2024-10-25T02:01:37.555008906Z
OBSERVED_BASE_OS_LABEL = ubuntu / 22.04
OBSERVED_EMBEDDED_NODE_PATH = /emsdk/node/20.18.0_64bit/bin
```

The image manifest is content-addressable, but the upstream Dockerfile names a mutable tag rather than the observed digest. Therefore the exact tag-to-digest mapping must not be assumed stable across future rebuilds.

```text
UPSTREAM_BASE_TAG_VERSIONED = YES
UPSTREAM_BASE_DIGEST_PINNED = NO
CURRENT_CONTENT_ADDRESSABLE_DIGEST_AVAILABLE = YES
```

## 4. Live Debian package resolution is not frozen

The Dockerfile performs two direct `apt-get update` sequences and installs package names without exact package versions. It does not identify a Debian/Ubuntu snapshot timestamp, repository Release-file digest, package index digest, package version set, or package `.deb` hashes.

It also executes `pdfium/build/install-build-deps.sh` from a bootstrap checkout whose PDFium revision is not frozen by the Dockerfile.

```text
APT_SNAPSHOT_PIN = ABSENT
APT_PACKAGE_VERSION_PINNING = ABSENT
APT_PACKAGE_ARCHIVE_HASH_BINDING = ABSENT
BOOTSTRAP_INSTALL_BUILD_DEPS_SOURCE_REVISION = MOVING_IN_UPSTREAM_DOCKERFILE
```

A later deterministic builder may use a separately qualified content-addressed builder image or an exact package snapshot/version/hash contract. Live `apt-get update` cannot be merge-critical reproducibility evidence.

## 5. Node provisioning is moving

The Dockerfile replaces or supplements the base-image Node runtime using:

```text
https://deb.nodesource.com/setup_22.x
apt-get install -y nodejs
```

Fresh HTTP metadata for `setup_22.x` observed:

```text
OBSERVED_CONTENT_LENGTH = 3907
OBSERVED_LAST_MODIFIED = Thu, 09 Jul 2026 19:56:52 GMT
OBSERVED_ETAG = "6ca0c308bd902cf34622fac1e709a08d"
```

Those observations identify the current response metadata only. The URL is a moving major-series setup endpoint and the subsequent `nodejs` package install has no exact package version or archive hash in the Dockerfile.

The build scripts require a Node runtime for local generator scripts, but the exact required Node identity is not selected by canonical build evidence. The digest-pinned Emscripten image would transitively fix an embedded Node `20.18.0`, but 004C1AE does not claim that this runtime is compatible with the exact generator scripts.

```text
NODE_RUNTIME_REQUIRED_BY_BUILD_GENERATORS = YES
UPSTREAM_NODE_SELECTOR = MOVING_22_X_REPOSITORY_SETUP
UPSTREAM_NODE_PACKAGE_VERSION = UNBOUND
BASE_IMAGE_EMBEDDED_NODE = 20.18.0 / TRANSITIVELY_FIXED_IF_IMAGE_DIGEST_IS_FIXED
BASE_NODE_BUILD_COMPATIBILITY = NOT_ESTABLISHED
```

## 6. `depot_tools` and bootstrap PDFium refs are moving

The Dockerfile clones:

```text
https://chromium.googlesource.com/chromium/tools/depot_tools.git -b main
```

Fresh public ref metadata observed:

```text
OBSERVED_DEPOT_TOOLS_MAIN = c04f810a76c5fe34760d4de90d40197780df1fd7
```

The exact pinned PDFium `DEPS` file, however, records:

```text
PDFIUM_DEPS_DEPOT_TOOLS_REVISION = 6235028c6b18b73e68f5414f935ec537a25ea51a
```

Public immutable metadata confirms that exact depot-tools commit exists. The upstream Dockerfile does not select it.

The bootstrap stage also runs:

```text
gclient config --unmanaged https://pdfium.googlesource.com/pdfium.git
gclient sync --no-history --shallow
```

without a PDFium revision in that bootstrap stage. Fresh public ref metadata observed current PDFium `main` as:

```text
OBSERVED_PDFIUM_MAIN = f0118f1eb5e3b6e9047d7e0597b41196720f8256
```

That current ref is not the canonical EmbedPDF gitlink `cb29e78...`. It is recorded only to prove the moving-ref condition, not as an allowed substitute.

```text
UPSTREAM_DEPOT_TOOLS_REF = MOVING_MAIN
PINNED_DEPOT_TOOLS_REVISION_AVAILABLE_FROM_EXACT_DEPS = YES
UPSTREAM_BOOTSTRAP_PDFIUM_REF = UNPINNED
CANONICAL_PDFIUM_GITLINK = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
BOOTSTRAP_MAIN_AS_CANONICAL_SOURCE = PROHIBITED
```

## 7. Exact tool identities already present in pinned PDFium `DEPS`

Static inspection of `DEPS` at exact PDFium gitlink `cb29e78...` exposes immutable build-tool selectors including:

```text
DEPOT_TOOLS_REVISION = 6235028c6b18b73e68f5414f935ec537a25ea51a
GN_VERSION = git_revision:bd3356ac13f411b521b16b11da12cec5150e917c
NINJA_VERSION = version:3@1.12.1.chromium.4
CLANG_REVISION = a1542f2952bcc47640d5cfbc39bb8f6926a1bf6a
RUST_REVISION = 7da7c8be1f1b4ba32dcfd73ddc59ea48a376c041
```

These selectors are stronger than the moving Docker bootstrap, but 004C1AE does not download their artifacts or claim acquired-byte hashes. A later provisioning grain must bind the exact effective artifacts and their registry-native/content hashes before execution.

## 8. Rustup and `watchexec-cli` are not deterministic as written

The Dockerfile executes the moving Rustup bootstrap URL and then:

```text
cargo install --locked watchexec-cli
```

without a crate version. Fresh metadata headers for `https://sh.rustup.rs` identify the current response but do not make the URL immutable:

```text
OBSERVED_RUSTUP_LAST_MODIFIED = Tue, 01 Sep 2026 11:43:38 GMT
OBSERVED_RUSTUP_ETAG = "b3e3de7b5ea0154dd9f73cca18658c65"
OBSERVED_RUSTUP_S3_VERSION_ID = TxG_zgSr6sqNHDCrl5Js7L3K0Ihc56Za
```

Fresh crates.io sparse-index metadata observed latest `watchexec-cli` as:

```text
OBSERVED_WATCHEXEC_CLI_VERSION = 2.7.2
OBSERVED_WATCHEXEC_CLI_CRATE_CHECKSUM = 092605bd8c2e2a3c433057d298385a429e93878095defe56637bebed71a16c8f
```

The version is not selected by the Dockerfile. `watchexec` is directly invoked by `scripts/dev.sh`, not by `scripts/build.sh`. Therefore it is a development-tooling surface for the observed scripts and must not be included in a minimal deterministic release builder unless a separate transitive requirement is proven.

The Dockerfile's Rustup installation is directly used to provide Cargo for that `watchexec-cli` installation. 004C1AE does not infer that no Rust toolchain is needed anywhere in the PDFium dependency graph; the exact PDFium `DEPS` Rust selector remains a separate pinned build-graph fact.

## 9. Release-build environment classification

| Surface | Upstream selector | Classification | Deterministic disposition |
|---|---|---|---|
| Emscripten SDK image | `emscripten/emsdk:3.1.70` | versioned tag, not digest-pinned | use qualified immutable manifest digest |
| OS packages | live `apt-get update` + unversioned package names | moving/unbound | snapshot+exact versions/hashes or qualified immutable builder image |
| Node | `setup_22.x` + unversioned `nodejs` | moving/unbound | select one exact Node identity and prove generator compatibility |
| `depot_tools` | `main` | moving | exact immutable revision required |
| bootstrap PDFium | unpinned `gclient` solution | moving | prohibit; start from exact canonical gitlink |
| GN | exact PDFium `DEPS` selector | immutable selector available | bind acquired artifact before execution |
| Ninja | exact PDFium `DEPS` selector | immutable selector available | bind acquired artifact before execution |
| Clang | exact PDFium `DEPS` revision | immutable selector available | bind effective artifact before execution |
| PDFium Rust graph | exact PDFium `DEPS` revision | immutable selector available | bind only if effective build graph requires it |
| Rustup | moving script endpoint | moving/unbound | exclude unless separately required and exactly pinned |
| `watchexec-cli` | unversioned Cargo install | moving/dev-oriented | exclude from minimal release builder |

## 10. Deterministic provisioning contract required before build execution

A future build-evidence execution is ineligible until a separately canonical provisioning unit establishes at minimum:

1. a content-addressed Linux/amd64 builder base, not a mutable tag-only reference;
2. no live OS package resolution: either an immutable already-qualified builder filesystem or exact snapshot/package/version/hash identities;
3. one exact Node runtime identity with static or bounded compatibility evidence for the generator scripts;
4. exact `depot_tools` rather than `main`;
5. exact canonical PDFium gitlink as the source root, with no bootstrap from current PDFium `main`;
6. exact `DEPS`-derived GN/Ninja/Clang and any effective Rust/toolchain artifact identities;
7. no development-only watcher tooling in the minimal release build unless independently required;
8. explicit network origins, redirect policy, credential/proxy/custom-CA policy, cache isolation, writable paths, environment, architecture, and output accounting;
9. an external-only evidence root for builder/toolchain/package bytes and logs;
10. no claim of source-to-published-WASM reproducibility until a fresh build actually matches the acquired archive output under separately authorized execution.

## 11. Qualification result

```text
UPSTREAM_EMBEDPDF_DOCKERFILE_REPRODUCIBILITY = NOT_ESTABLISHED
UPSTREAM_BUILD_ENVIRONMENT_AS_WRITTEN = NOT_REPRODUCIBLE_FOR_MERGE_CRITICAL_EVIDENCE
CONTENT_ADDRESSED_EMSDK_BASE_CANDIDATE = AVAILABLE
EXACT_PDFIUM_DEPS_TOOL_SELECTORS = PARTIALLY_AVAILABLE
MOVING_BUILD_ENVIRONMENT_INPUTS = PRESENT
DETERMINISTIC_PROVISIONING_CONTRACT = REQUIRED_BEFORE_EXECUTION
004C1AE_RESULT = QUALIFIED_BUILD_ENVIRONMENT_PROVENANCE_GAP
BUILD_EXECUTION_AUTHORITY = ABSENT
PDFIUM_COMPONENT_NOTICE_COMPLETENESS = PARTIAL
DISTRIBUTION_ADOPTION_GATE = FAIL_CLOSED
DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
PROVIDER_RUNTIME_AUTHORITY = ABSENT
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

The upstream Dockerfile is useful engineering context but cannot be executed as-is and then promoted to reproducible qualification evidence.

## 12. Candidate acceptance gates

This candidate is eligible for merge only if the exact final head proves:

1. exact base/main remains `910b87bcb05c88517238d6f244b8dc6cf430aefc` / tree `5f60b91ee109c5b4ad3c2d955fb4fa21f7751b65`;
2. exactly this one Signthos-authored qualification file changes;
3. exact EmbedPDF/PDFium source and build-control bytes are rebound;
4. registry/toolchain/package metadata reads do not download or execute build images/toolchains/packages;
5. every moving upstream build selector remains explicit rather than silently replaced by a current observation;
6. dev-only versus release-relevant surfaces are separated without claiming unproven transitive absence;
7. the deterministic provisioning contract remains a future prerequisite, not execution authority;
8. no upstream/image/toolchain/package byte enters the repository;
9. exact-head provider/check state is accounted truthfully;
10. fresh independent substantive exact-head review reports no unresolved material finding;
11. any repair is forward-only and triggers fresh exact-head review;
12. unresolved material review threads are zero immediately before merge;
13. guarded normal merge uses exact expected-head protection;
14. post-merge verification proves SHA/tree/parents/signature/changed surface;
15. fresh Issue #7 successor reconciliation occurs before any build/provisioning execution authority is inferred.
