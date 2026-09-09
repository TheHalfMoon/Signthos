# 004C1AG — PDFium OS Package Metadata Closure Qualification

Status: `QUALIFICATION_CANDIDATE / EXACT_SNAPSHOT_PACKAGE_METADATA_RESOLUTION_AND_EVIDENCE_ONLY / ZERO_PACKAGE_ACQUISITION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `dc097d2cb3eeff1ff54b4d8268c00ce210ce8d98`
Canonical base tree: `ddd38e5a94cfbce279941998e74f61fc8e5d7066`
Authority source: `github:issue-comment:5607231993`

## 1. Purpose and exact authority

Canonical 004C1AF selected a deterministic PDFium release-builder provisioning contract but failed closed before provisioning because the exact Jammy/amd64 OS-package metadata closure was not established. 004C1AG resolves only that metadata identity gap against the exact already-selected Ubuntu snapshot. It does not acquire `.deb` archives, inspect a builder filesystem, install packages, pull/build images, execute upstream installers, or execute any build/runtime toolchain.

```text
004C1AG_AUTHORITY = EXACT_SNAPSHOT_PACKAGE_METADATA_RESOLUTION_AND_EVIDENCE_ONLY
004C1AG_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ag-pdfium-os-package-metadata-closure-qualification.md
004C1AG_MAX_CHANGED_REPOSITORY_FILES = 1
004C1AG_EXTERNAL_EVIDENCE_ROOT = EPHEMERAL_OUTSIDE_REPOSITORY
PUBLIC_UBUNTU_SNAPSHOT_METADATA_READ = AUTHORIZED
PUBLIC_UBUNTU_ARCHIVE_KEY_METADATA_READ = AUTHORIZED
INRELEASE_SIGNATURE_VERIFICATION = AUTHORIZED
PACKAGES_INDEX_DOWNLOAD = AUTHORIZED_METADATA_ONLY_TO_EXTERNAL_EVIDENCE_ROOT
PACKAGE_METADATA_DECOMPRESSION_AND_PARSING = AUTHORIZED
SIGNTHOS_AUTHORED_METADATA_RESOLVER_EXECUTION = AUTHORIZED_EXTERNAL_ONLY
EXACT_CHROMIUM_INSTALL_BUILD_DEPS_SEMANTIC_REPLAY = AUTHORIZED_WITHOUT_EXECUTING_UPSTREAM_INSTALL_SCRIPT
APT_OR_DPKG_PACKAGE_INSTALLATION = NOT_AUTHORIZED
APT_PACKAGE_ARCHIVE_DOWNLOAD = NOT_AUTHORIZED
DEB_EXTRACTION = NOT_AUTHORIZED
DOCKER_IMAGE_PULL_OR_BUILD = NOT_AUTHORIZED
UPSTREAM_INSTALL_BUILD_DEPS_EXECUTION = NOT_AUTHORIZED
APT_GET_EXECUTION = NOT_AUTHORIZED
DPKG_EXECUTION = NOT_AUTHORIZED
NODE_OR_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
GCLIENT_GN_NINJA_OR_PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
REPOSITORY_UPSTREAM_SOURCE_IMPORT = NOT_AUTHORIZED
PACKAGE_JSON_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
NOTICE_SBOM_PROVENANCE_REPOSITORY_MUTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Canonical predecessor identities consumed without reopening

```text
EMBEDPDF_REPOSITORY = https://github.com/embedpdf/embed-pdf-viewer
EMBEDPDF_SOURCE_COMMIT = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
PDFIUM_GITLINK = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
CHROMIUM_BUILD_REVISION = 06d247cb917bb5fac3103b1b7dccb75368a553ce
INSTALL_BUILD_DEPS_PY_SHA256 = 6ba801d9f651af8148a9c2627d666dfe29d01adc81236454ba193b1d773d5566
EMBEDPDF_DOCKERFILE_SHA256 = c6a7f6a71cd75abee90a1262526240ca811417f9f3bd060d3f429ed7f1d5ef0c
SELECTED_BASE_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_NODE_RUNTIME = /emsdk/node/20.18.0_64bit/bin/node
DEPOT_TOOLS_REVISION = 6235028c6b18b73e68f5414f935ec537a25ea51a
GN_VERSION = git_revision:bd3356ac13f411b521b16b11da12cec5150e917c
NINJA_VERSION = version:3@1.12.1.chromium.4
CLANG_REVISION = a1542f2952bcc47640d5cfbc39bb8f6926a1bf6a
```

004C1AG does not reinterpret those selections and does not convert them into execution authority.

## 3. Exact snapshot and Ubuntu archive signing key binding

```text
UBUNTU_SNAPSHOT_ID = 20260909T180000Z
UBUNTU_SNAPSHOT_BASE = https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/
TARGET_ARCHITECTURE = amd64
UBUNTU_SUITES = [jammy, jammy-updates, jammy-security]
UBUNTU_COMPONENTS = [main, restricted, universe, multiverse]
UBUNTU_ARCHIVE_KEYRING_URL = https://archive.ubuntu.com/ubuntu/project/ubuntu-archive-keyring.gpg
UBUNTU_ARCHIVE_KEYRING_BYTES = 3607
UBUNTU_ARCHIVE_KEYRING_SHA256 = 80a36b0a6de2f69f49d2df75ef473ccde121e9e190b9ea01d20a4f63778d5c31
```

The bound keyring exposes these primary fingerprints:

```text
790BC7277767219C42C86F933B4FE6ACC0B21F32
843938DF228D22F7B3742BC0D94AA3F0EFE21092
F6ECB3762474EDA9D21B7022871920D1991BC93C
```

All three selected `InRelease` records validate with `gpgv` to the Ubuntu Archive Automatic Signing Key (2018), fingerprint `F6ECB3762474EDA9D21B7022871920D1991BC93C`.

| Suite | InRelease bytes | InRelease SHA-256 | Signature |
|---|---:|---|---|
| `jammy` | 270087 | `c14060cd8c6d625874dfcb9523a35a395bf4865c28b6b6a82569ef326fe92dc6` | `VALIDSIG F6ECB3762474EDA9D21B7022871920D1991BC93C` |
| `jammy-updates` | 128049 | `78e5c7e6f16f418c394d2d6caa4d8d10fafa715b08b038c02a8c73cd6dc4587b` | `VALIDSIG F6ECB3762474EDA9D21B7022871920D1991BC93C` |
| `jammy-security` | 128927 | `b2eb2336d267611f596e47fe9bad879db22371598047363db841d8f5f586d450` | `VALIDSIG F6ECB3762474EDA9D21B7022871920D1991BC93C` |

No unsigned package index is admitted.

## 4. Signed Packages index closure

Only `binary-amd64/Packages.xz` indexes named by the verified `InRelease` SHA-256 records were acquired. Every acquired index matched both the exact signed byte length and SHA-256 before decompression or parsing.

| Suite | Component | Bytes | SHA-256 |
|---|---|---:|---|
| `jammy` | `main` | 1394768 | `37cb57f1554cbfa71c5a29ee9ffee18a9a8c1782bb0568e0874b7ff4ce8f9c11` |
| `jammy` | `restricted` | 129256 | `92102b5d9dfb7804293891528d5e57c3d05949df71af613d4f99fcb7d6a3f488` |
| `jammy` | `universe` | 14090084 | `d29cb24c93fec5f43255706bce7eb46d4779952039d8c68ac1bb14a6f3655ce2` |
| `jammy` | `multiverse` | 216948 | `e24bf9b5daf5387aa5311f69367b248b1d46d37d72480760f91f5a312c7eb43c` |
| `jammy-updates` | `main` | 3794492 | `fc3ca7fd8c51bfcaef4c60146d82f07771d5c81843def876d3b4296acffad473` |
| `jammy-updates` | `restricted` | 6542404 | `a9d99a9e6dd5952ec639e7e28763275c3aa5df18b69f06973cc3c6ab1fac434d` |
| `jammy-updates` | `universe` | 1282472 | `e63677ef4f3f73a0ac7ac29be177222ddb2bf169ba0fe2bc16448342f71a53db` |
| `jammy-updates` | `multiverse` | 76800 | `eb52bf4941c406f9d9fe486128453060fadb2d0172750cbe84f2896d1ecf4e71` |
| `jammy-security` | `main` | 3526324 | `6fed35b19b0a467d391330554308eb2bcfc679a13604635f3298dd8ef383e7a4` |
| `jammy-security` | `restricted` | 6304508 | `c82967cb499e44f680aa67fd9972db8a396eed44d3733261ccdc8b3dd57a8287` |
| `jammy-security` | `universe` | 1048048 | `c06fe8a63c3debf947fd2f717d369e9c205f31a0eea25d07e8b92e106ee84757` |
| `jammy-security` | `multiverse` | 69092 | `8b79f9054d123125a830170dbaea7c7053572dba1a0f9187313c5229245ae384` |

```text
SIGNED_PACKAGES_INDEX_COUNT = 12
SIGNED_PACKAGES_INDEX_COMPRESSED_BYTES = 38475196
INDEX_INRELEASE_SHA256_MATCH = PASS / 12_OF_12
INDEX_INRELEASE_SIZE_MATCH = PASS / 12_OF_12
```

Identical package bytes appearing at more than one suite/component location are admitted as duplicate locations only when `name/version/architecture`, package size, and package SHA-256 agree. A duplicate location with differing bytes fails closed.

## 5. Signthos-authored semantic replay boundary

The external resolver is Signthos-authored; it does not import or execute Chromium installer code. It parses the exact `install-build-deps.py` AST as data and implements only the observed Jammy/amd64 package-selection semantics required by the canonical `--no-prompt` invocation.

```text
EXTERNAL_RESOLVER_BYTES = 21610
EXTERNAL_RESOLVER_SHA256 = 00891f3e692d53df474016d5f4e5af58c7171dd091dfee9dba63ab379e419fd5
UPSTREAM_INSTALL_BUILD_DEPS_EXECUTION = 0
APT_GET_EXECUTION = 0
APT_CACHE_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_ARCHIVE_DOWNLOAD = 0
PACKAGE_INSTALLATION = 0
```

The exact option posture for `install-build-deps.sh --no-prompt` is modeled as:

```text
syms = false
lib32 = false
android = false
arm = false
chromeos_fonts = false
nacl = false
backwards_compatible = false
quick_check = false
unsupported = false
no_prompt = true
TARGET_INIT_CLASS = ELF_64_BIT / derived from authorized linux-amd64 target, not host state
```

Therefore the replay admits `dev_list()` plus `lib_list()`, applies the exact availability branches and final `maybe_append_t64` transformation, and excludes `dbg_list`, `lib32_list`, `arm_list`, and `backwards_compatible_list` under their false defaults.

## 6. Exact availability/rename branch evidence

The replay made 28 unique `package_exists(...)` decisions from only the signed snapshot indexes: 21 present and 7 absent.

```text
ABSENT = [realpath, libav-tools, libpng16-16t64, appmenu-gtk, libgnome-keyring0, libgnome-keyring-dev, libasound2t64]
PRESENT = [libjpeg-dev, libbrlapi0.8, libvulkan-dev, libinput-dev, at-spi2-core, binutils-arm-linux-gnueabihf, binutils-aarch64-linux-gnu, binutils-mipsel-linux-gnu, binutils-mips64el-linux-gnuabi64, libc6-i386, lib32stdc++6, lib32gcc-s1, lib32z1, libffi8, libpng16-16, libnspr4, libvulkan1, libinput10, libncurses6, libgraphene-1.0-0, mutter-common]
T64_ROOT_RENAME_SELECTED_COUNT = 0
```

The resulting Chromium request set contains 145 unique package roots.

## 7. EmbedPDF Docker APT roots and release-stage ordering

The deterministic metadata replay combines the Chromium request set with the release-reachable explicit APT package names from the exact EmbedPDF Dockerfile while preserving stage provenance and excluding the already-canonical NodeSource/Rustup/watchexec development provisioning path.

```text
DOCKER_EMSDK_BASE_ROOTS = [pkg-config, autoconf, automake, libtool, ragel, git, yasm, subversion, lsb-release, tzdata, keyboard-configuration, tini]
DOCKER_PDFIUM_POST_ROOTS = [curl, build-essential, pkg-config, rsync]
UNIQUE_DOCKER_ROOT_COUNT = 15
CHROMIUM_ROOT_COUNT = 145
COMBINED_UNIQUE_ROOT_IDENTITY_COUNT = 158
```

One Chromium root, `git-core`, is virtual in the selected snapshot and resolves uniquely to exact package `git@1:2.34.1-1ubuntu1.17`, which provides `git-core`.

## 8. Deterministic dependency-resolution policy

The metadata resolver does not claim to be `apt`. It resolves one deterministic package-archive metadata closure under these explicit rules:

1. admit only `Architecture: amd64` or `Architecture: all` binary metadata from the signed selected snapshot;
2. choose the highest Debian version satisfying each exact package dependency constraint across the three selected suites;
3. when byte-identical duplicate records occur, prefer suite order `jammy-security`, `jammy-updates`, then `jammy`, and component order `main`, `restricted`, `universe`, `multiverse` only as a deterministic location label;
4. process dependency alternatives in declared left-to-right order and choose the first viable alternative;
5. prefer a real package over a virtual provider for the same alternative;
6. for a virtual dependency with multiple providers, admit only a unique `Priority: required` provider; otherwise fail closed;
7. include `Pre-Depends`, `Depends`, and default-APT `Recommends`; do not include `Suggests`;
8. reject an unresolved version constraint, unavailable root, ambiguous provider, unsupported architecture-qualified dependency, or divergent duplicate package identity;
9. record `Conflicts`/`Breaks` relations but do not claim that the union of metadata identities is a simultaneous installed filesystem state.

The only multi-provider virtual dependency encountered is `debhelper → awk`; the unique `Priority: required` provider is:

```text
VIRTUAL_DEPENDENCY = awk
SELECTED_PROVIDER = mawk
SELECTED_VERSION = 1.3.4.20200120-3
SELECTED_SHA256 = 73aea4eef18e9960e04ea2de58c3ee1bb552af6c1dc889ab33c6c896d3387c97
PROVIDER_POLICY = UNIQUE_PRIORITY_REQUIRED_PROVIDER
```

No unresolved alternative/provider ambiguity remains.

## 9. Cross-stage package relation preserved, not hidden

The metadata identity union contains both `pkgconf` from Chromium's request set and `pkg-config` from explicit Docker stages. Jammy metadata declares:

```text
pkgconf Breaks: pkg-config (>= 0.29-1)
```

This is recorded as one cross-stage relation rather than misrepresented as a simultaneously installable final set. The exact upstream Dockerfile installs `pkg-config` before the Chromium dependency step and again in the later `pdfium-deps` APT step. 004C1AG establishes archive metadata identities needed by those staged package transactions; it does not establish the future base-image installed state or execute the transactions.

```text
CROSS_STAGE_CONFLICT_RELATION_COUNT = 1
SIMULTANEOUS_INSTALLABLE_SET_CLAIMED = false
EFFECTIVE_APT_TRANSACTION_DELTA = NOT_ESTABLISHED
BASE_IMAGE_INSTALLED_PACKAGE_STATE = NOT_ESTABLISHED
```

## 10. Exact resolved metadata closure

The canonical JSON closure records, for every selected package identity:

```text
package
architecture
version
suite
component
filename
size
sha256
selection reason
immediate parent where dependency-derived
```

Fresh Replay A produced:

```text
ROOT_PACKAGE_SET_JSON_BYTES = 21892
ROOT_PACKAGE_SET_SHA256 = 2d3674e9676c03150f515de07a750f772e37925311bf2f11395d0c502616a8e0
RESOLVED_CLOSURE_JSON_BYTES = 293999
RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
RESOLVED_PACKAGE_METADATA_COUNT = 910
RESOLVED_ARCHIVE_TOTAL_PUBLISHED_BYTES = 339373120
AMBIGUITY_COUNT = 0
```

Closure distribution is:

```text
ARCHITECTURE_COUNTS = {amd64: 658, all: 252}
SUITE_COUNTS = {jammy: 541, jammy-updates: 60, jammy-security: 309}
COMPONENT_COUNTS = {main: 842, universe: 68}
SELECTION_REASON_COUNTS = {ROOT: 157, Pre-Depends: 8, Depends: 637, Recommends: 108}
```

`RESOLVED_ARCHIVE_TOTAL_PUBLISHED_BYTES` is metadata arithmetic over `Size` fields. No package archive byte was downloaded.

## 11. Fresh second metadata replay determinism

Replay B used a distinct fresh external evidence root, reacquired the keyring, all three signed `InRelease` records, and all twelve referenced package indexes, reverified them, reran the same bounded metadata algorithm, and produced byte-identical canonical outputs.

```text
REPLAY_A_EVIDENCE_MANIFEST_BYTES = 4374
REPLAY_A_EVIDENCE_MANIFEST_SHA256 = 105eb26b82e09b14e93e7942502131fbdf3b10a70cf72d0f32c9d68d4f04beb4
REPLAY_B_EVIDENCE_MANIFEST_BYTES = 4374
REPLAY_B_EVIDENCE_MANIFEST_SHA256 = 105eb26b82e09b14e93e7942502131fbdf3b10a70cf72d0f32c9d68d4f04beb4
ROOT_SET_BYTES_EQUAL = PASS
ROOT_SET_SHA256_EQUAL = PASS
RESOLVED_CLOSURE_BYTES_EQUAL = PASS
RESOLVED_CLOSURE_SHA256_EQUAL = PASS
REPLAY_A_RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
REPLAY_B_RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
```

Raw keyring, signed metadata, package indexes, resolver source, and canonical JSON outputs remain external ephemeral evidence only.

## 12. Qualification result and exact remaining boundary

```text
004C1AG_RESULT = QUALIFIED_EXACT_OS_PACKAGE_METADATA_CLOSURE
UBUNTU_SNAPSHOT_SIGNATURE_CHAIN = VERIFIED
SIGNED_PACKAGES_INDEX_CLOSURE = ESTABLISHED
CHROMIUM_PACKAGE_AVAILABILITY_SEMANTIC_REPLAY = ESTABLISHED
EXACT_ROOT_PACKAGE_IDENTITY_SET = ESTABLISHED
EXACT_TRANSITIVE_PACKAGE_METADATA_CLOSURE = ESTABLISHED
EXACT_PACKAGE_NAME_VERSION_ARCHIVE_SHA256_SET = ESTABLISHED
METADATA_REPLAY_DETERMINISM = PASS
APT_PACKAGE_ARCHIVE_ACQUISITION = NOT_PERFORMED / NOT_AUTHORIZED
BASE_IMAGE_FILESYSTEM_INVENTORY = NOT_ESTABLISHED
EFFECTIVE_PACKAGE_DOWNLOAD_SET = NOT_ESTABLISHED
EFFECTIVE_INSTALL_UPGRADE_REMOVE_TRANSACTION = NOT_ESTABLISHED
FINAL_PROVISIONED_IMAGE_IDENTITY = NOT_ESTABLISHED
NODE_EXECUTABLE_BYTE_HASH = NOT_ESTABLISHED
GN_NINJA_CLANG_ACQUIRED_BYTE_IDENTITIES = NOT_ESTABLISHED
PDFIUM_BUILD_EXECUTION_AUTHORITY = ABSENT
PDFIUM_COMPONENT_NOTICE_COMPLETENESS = PARTIAL
DISTRIBUTION_ADOPTION_GATE = FAIL_CLOSED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

004C1AG closes package metadata identity only. It does not claim what is already installed in the selected content-addressed Emscripten filesystem and therefore does not claim an effective package download/install delta. A fresh successor reconciliation must decide whether the next smallest prerequisite is base-image filesystem/package inventory acquisition, exact package-archive acquisition, or another narrower evidence grain.

## 13. Candidate acceptance gates

This candidate is eligible for canonical merge only if the exact final head proves all of the following:

1. canonical base remains `dc097d2cb3eeff1ff54b4d8268c00ce210ce8d98` / tree `ddd38e5a94cfbce279941998e74f61fc8e5d7066`;
2. exactly this one Signthos-authored qualification file changes;
3. Ubuntu archive keyring bytes/fingerprints and all three `InRelease` signatures are rebound;
4. all twelve package indexes match the exact signed size/SHA-256 records before parsing;
5. Chromium package availability/rename semantics are replayed from metadata without executing upstream installer/APT/dpkg;
6. provider/alternative policy remains explicit and ambiguity count is zero;
7. both fresh metadata replays produce identical root-set and closure bytes/digests;
8. no package archive, image, source, toolchain, generated build output, NOTICE/SBOM, package manifest, lockfile, provider/runtime, fixture, workflow, container, or database mutation enters the candidate;
9. exact-head Actions/check/provider state is accounted truthfully;
10. fresh independent substantive exact-head review reports no unresolved material finding;
11. any repair is forward-only and triggers fresh exact-head review;
12. unresolved material review threads are zero;
13. immediate premerge base/head/race proof passes;
14. guarded normal merge uses exact `expected_head_sha`;
15. mechanical post-merge SHA/tree/parent/signature/surface verification passes;
16. a fresh Issue #7 successor reconciliation occurs before any package/image/toolchain acquisition or execution authority is inferred.
