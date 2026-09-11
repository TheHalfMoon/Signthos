# 004C1CC — Retained Offline Input Transport Qualification

Status: `QUALIFICATION_CANDIDATE / RETAINED_BYTE_REVALIDATION_AND_HOST_ONLY_DETERMINISTIC_TRANSPORT_MATERIALIZATION / ZERO_PROVISIONING_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `9e04546c8a7e6ca88a1c3633d7111046a72b04c0`
Canonical base tree: `1ee8054697b7bc13aca44fb2a54f2dc591f74ce1`
Authority source: `github:issue-comment:5638579017`
Measurement completed: `2026-09-11T18:00:27Z`

## 1. Purpose and exact authority

Canonical 004C1CB freezes a future offline package-provisioning harness but authorizes zero provisioning attempts. It requires an exact preverified archive/index transport identity before Stage A. This unit closes only that transport prerequisite from bytes already retained by canonical predecessor evidence. It performs no network reacquisition and no Docker, APT, dpkg, package, toolchain, PDFium, provider, or PDF runtime execution.

```text
004C1CC_AUTHORITY = STATIC_AND_HOST_ONLY_DETERMINISTIC_RETAINED_BYTE_TRANSPORT_MATERIALIZATION_QUALIFICATION
004C1CC_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1cc-retained-offline-input-transport-qualification.md
004C1CC_MAX_CHANGED_REPOSITORY_FILES = 1
NETWORK_ACQUISITION = 0 / NOT_AUTHORIZED
SNAPSHOT_REACQUISITION = 0 / NOT_AUTHORIZED
PACKAGE_ARCHIVE_REACQUISITION = 0 / NOT_AUTHORIZED
DOCKER_CONTAINER_EXECUTION = 0 / NOT_AUTHORIZED
APT_GET_APT_CACHE_APT_CONFIG_EXECUTION = 0 / NOT_AUTHORIZED
DPKG_EXECUTION = 0 / NOT_AUTHORIZED
PACKAGE_INSTALL_UNPACK_CONFIGURE = 0 / NOT_AUTHORIZED
MAINTAINER_SCRIPT_OR_TRIGGER_EXECUTION = 0 / NOT_AUTHORIZED
TOOLCHAIN_SOURCE_PDFIUM_PROVIDER_EXECUTION = 0 / NOT_AUTHORIZED
```

All generated tar and manifest bytes remain external evidence only. No retained Ubuntu, package, transport, or generated evidence byte is committed to Signthos.

## 2. Canonical predecessor bindings

```text
004C1CB_CONTRACT_BYTES = 11837
004C1CB_CONTRACT_SHA256 = c93e4aa4a48f110ec5e8c2fd2ac912273120b3059a164777afac8c9b862e7fe5
004C1CB_SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
004C1CB_SELECTED_CONFIG = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
004C1CB_PROVISIONING_ROOT = /tmp/signthos-provision
004C1CB_ARCHIVE_CACHE = /tmp/signthos-provision/cache/archives/
004C1CB_LIST_ROOT = /tmp/signthos-provision/lists/
004C1CB_SOURCE_DESCRIPTOR = /tmp/signthos-provision/etc/snapshot.sources
004C1CB_LOG_ROOT = /tmp/signthos-provision/log/
004C1CB_STAGE_A_INSTALL_ARGV_SHA256 = 5b0f1ffb795a128f28a63f2d182e1cbc7970c85187763f2b115c60288db18c7a
004C1CB_STAGE_B_INSTALL_ARGV_SHA256 = 2ea968eca2e35d46eb4aabd0a00af368d566506533a070871ec7a7123079d84b
004C1CB_STAGE_C_INSTALL_ARGV_SHA256 = bda16e788ac116f3e376063f7bf7cffe0b0af0bd850a01e09ee06a1b211e51b9
004C1AK_ARCHIVE_COUNT = 826
004C1AK_ARCHIVE_TOTAL_BYTES = 317223784
004C1AK_VERIFIED_ARCHIVE_INVENTORY_BYTES = 439991
004C1AK_VERIFIED_ARCHIVE_INVENTORY_SHA256 = 38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98
004C1AK_ARCHIVE_IDENTITY_SET_SHA256 = 8ac7e3c9a44831e5f8c4a03a81862644990b504f7d2043102a1ab1a0fd69810d
004C1AU_TRANSFORMATION_INVENTORY_BYTES = 15168
004C1AU_TRANSFORMATION_INVENTORY_SHA256 = 7ae814d3d293557da0b64f87fdffdca14c5a401a8c0585f22900c61ba0fcf078
004C1AU_UNCOMPRESSED_PACKAGES_TOTAL_BYTES = 203991230
004C1AW_RETAINED_TRANSPORT_BYTES = 204769280
004C1AW_RETAINED_TRANSPORT_SHA256 = f7fd9486a7eadcf82fc5e7f66c166c3de757ff5c108a32aab2bf17cccfbd4755
```

004C1AW remains evidence for no-mount stdin-tar placement semantics only. Its retained tar is not reused as the final 004C1CC transport because it targets `/tmp/signthos-apt`, includes simulation-only initial `state/status`, and contains zero package archives.

## 3. Fresh retained-byte revalidation

Two independent canonical 004C1AK acquisition roots remain locally retained:

```text
REPLAY_A_ARCHIVE_ROOT = /private/tmp/signthos-004c1ak-A/archives
REPLAY_B_ARCHIVE_ROOT = /private/tmp/signthos-004c1ak-B/archives
REPLAY_A_DEB_COUNT = 826
REPLAY_B_DEB_COUNT = 826
REPLAY_A_DEB_TOTAL_BYTES = 317223784
REPLAY_B_DEB_TOTAL_BYTES = 317223784
REPLAY_A_FULL_REHASH_MISMATCH_COUNT = 0
REPLAY_B_FULL_REHASH_MISMATCH_COUNT = 0
REPLAY_A_B_CURRENT_FILE_IDENTITY_EQUAL = PASS
```

The fresh recheck read every one of the 1,652 retained `.deb` files and compared observed size and SHA-256 against the corresponding canonical `verified-archives.json` record. It did not rely on filename presence alone.

The two canonical 004C1AG final roots also remain retained:

```text
REPLAY_A_METADATA_ROOT = /private/tmp/signthos-004c1ag-final-A.9967
REPLAY_B_METADATA_ROOT = /private/tmp/signthos-004c1ag-final-B.19741
INRELEASE_COUNT_PER_REPLAY = 3
PACKAGES_XZ_COUNT_PER_REPLAY = 12
UBUNTU_ARCHIVE_KEYRING_BYTES = 3607
UBUNTU_ARCHIVE_KEYRING_SHA256 = 80a36b0a6de2f69f49d2df75ef473ccde121e9e190b9ea01d20a4f63778d5c31
CURRENT_RETAINED_SIGNED_METADATA_IDENTITY_MATCH = PASS
```

Canonical 004C1AU Replay A/B inputs and uncompressed package outputs remain under `/private/tmp/signthos-004c1au-repaired-20260909T232220Z`. Every input selected for the transport was rebound to the canonical compressed or uncompressed byte identity before use.

No reacquisition was performed because the exact predecessor bytes are still present and valid.

## 4. Exact APT 2.4.13 archive-cache filename semantics

The archive transport cannot use the snapshot pool basename mechanically. Exact already-qualified APT 2.4.13 source is bound as:

```text
APT_SOURCE_REPOSITORY = https://git.launchpad.net/ubuntu/+source/apt
APT_SOURCE_TAG = import/2.4.13
APT_SOURCE_TAG_OBJECT = 27207612b00b302b7b18cfeec355bad1a5de6bca
APT_SOURCE_COMMIT = 581ec5c0aa2c6665d72465040f1465eb93503200
APT_SOURCE_TREE = e9afcae41f88040e93eb7a10a89e72c00b59e245
APT_ACQUIRE_ITEM_CC_BLOB = f9362b0d540bf9fee47eaa9f484ec1be9b73f6cb
APT_ACQUIRE_ITEM_CC_BYTES = 146897
APT_ACQUIRE_ITEM_CC_SHA256 = cf8440c394a97a92efc030f0c96b9456a51b9816081ad71d4408cc3be7f90a54
APT_STRUTL_CC_BLOB = 3a0a6eaa321d7912c90dc989638e177ae246e736
APT_STRUTL_CC_BYTES = 51407
APT_STRUTL_CC_SHA256 = 14de292ea5d5b55f2db3d4ac8d0b08a05e77f75779c17f37673338edc44054fc
```

`pkgAcqArchive` constructs `StoreFilename` from `QuoteString(package, "_:") + '_' + QuoteString(version, "_:") + '_' + QuoteString(architecture, "_:.") + '.deb'`. `QuoteString` percent-encodes colon as `%3a`. Applying that rule to all canonical 004C1AK records gives:

```text
APT_CACHE_FILENAME_COUNT = 826
APT_CACHE_FILENAME_UNIQUE_COUNT = 826
POOL_BASENAME_DIFFERENCE_COUNT = 99
CACHE_FILENAME_MAPPING_BYTES = 253125
CACHE_FILENAME_MAPPING_SHA256 = 5c679b21782d86268f59078f37fd164ddf43c848e0523ae496d55e410f250034
```

Representative epoch-bearing mapping:

```text
PACKAGE = git
VERSION = 1:2.34.1-1ubuntu1.17
POOL_BASENAME = git_2.34.1-1ubuntu1.17_amd64.deb
APT_CACHE_FILENAME = git_1%3a2.34.1-1ubuntu1.17_amd64.deb
```

Any collision, missing identity, extra archive, malformed path, or mapping disagreement fails closed.

## 5. Deterministic transport contract

The transport is an uncompressed POSIX USTAR stream intended for later extraction with the already-qualified no-mount stdin transport primitive. 004C1CC does not execute that extraction.

Logical member order is deterministic:

1. all required directories sorted lexicographically;
2. all required regular files sorted lexicographically.

Exact normalization and retained-byte consumption boundary:

```text
TAR_FORMAT = USTAR
UID = 0
GID = 0
UNAME = empty
GNAME = empty
MTIME = 0
SYMLINKS = PROHIBITED
HARDLINKS = PROHIBITED
SPECIAL_FILES = PROHIBITED
PATH_TRAVERSAL = PROHIBITED
DUPLICATE_PATHS = PROHIBITED
UNBOUND_MEMBERS = PROHIBITED
QUALIFIED_TAR_BASENAME = offline-input.tar
QUALIFIED_TAR_BYTES = 522393600
QUALIFIED_TAR_SHA256 = b56949fa868d2738a3f511a13ccef66c67b8bfa0797ee09e26f5907c50da49ed
TAR_REGENERATION_AUTHORITY = ABSENT
ALTERNATE_USTAR_WRITER_OUTPUT = NOT_QUALIFIED
```

004C1CC qualifies the two already-retained, byte-identical `offline-input.tar` artifacts only. It does not grant a future consumer authority to regenerate the tar from the logical manifest, even when an alternate writer would produce a semantically equivalent POSIX USTAR archive. In particular, no future unit may reinterpret long-path `name`/`prefix` header splitting, checksum formatting, numeric-field encoding, padding, end-of-archive blocks, or any other raw USTAR header encoding and still inherit this qualification.

A later authorized provisioning attempt may consume only a retained tar whose full-file byte length is exactly `522393600` and whose full-file SHA-256 is exactly `b56949fa868d2738a3f511a13ccef66c67b8bfa0797ee09e26f5907c50da49ed`. If both retained copies are absent, if either selected copy fails the full-file identity check, or if regeneration is required for any reason, 004C1CC eligibility fails closed before attempt consumption and fresh authority plus a new transport qualification are required.

Required directories:

| Path | Mode |
|---|---:|
| `tmp/signthos-provision/` | `0755` |
| `tmp/signthos-provision/cache/` | `0755` |
| `tmp/signthos-provision/cache/archives/` | `0755` |
| `tmp/signthos-provision/cache/archives/partial/` | `0700` |
| `tmp/signthos-provision/etc/` | `0755` |
| `tmp/signthos-provision/lists/` | `0755` |
| `tmp/signthos-provision/lists/partial/` | `0700` |
| `tmp/signthos-provision/log/` | `0755` |

All 842 regular files are mode `0644`, uid/gid `0`, mtime `0`:

```text
SOURCE_DESCRIPTOR_FILES = 1
INRELEASE_FILES = 3
UNCOMPRESSED_PACKAGES_FILES = 12
DEB_ARCHIVE_FILES = 826
REGULAR_FILE_COUNT = 842
DIRECTORY_COUNT = 8
LOGICAL_MEMBER_COUNT = 850
PAYLOAD_BYTES = 521742319
MAX_LOGICAL_PATH_BYTES = 126
```

The descriptor is placed at `tmp/signthos-provision/etc/snapshot.sources`. The three `InRelease` and twelve uncompressed `Packages` objects use the exact APT-visible basenames already qualified by 004C1AS/004C1AU/004C1AW under `tmp/signthos-provision/lists/`. Every `.deb` is placed under `tmp/signthos-provision/cache/archives/` using the exact APT 2.4.13 `StoreFilename` rule above.

The transport intentionally excludes `/tmp/signthos-provision/state/status`. 004C1CB explicitly switches from the simulation-only virtual status file to the selected image's real dpkg database.

## 6. Independent Replay A/B host-only materialization

Replay A consumed only retained 004C1AK/A archive bytes and retained 004C1AU/A metadata/list bytes. Replay B consumed the corresponding independently retained B bytes. Both used the same canonical descriptor and deterministic transport rules.

```text
HOST_BUILDER_BYTES = 6798
HOST_BUILDER_SHA256 = 5a1e5e53c8b3f06e45d7b50fc0ebf128d1fd44675d6126b261db6c7c93f5e1d1
REPLAY_A_MANIFEST_BYTES = 386505
REPLAY_A_MANIFEST_SHA256 = 84922cc08d5f58972af36820e7218804dd028a297796ba504a882abebb5fe239
REPLAY_B_MANIFEST_BYTES = 386505
REPLAY_B_MANIFEST_SHA256 = 84922cc08d5f58972af36820e7218804dd028a297796ba504a882abebb5fe239
REPLAY_A_TAR_BYTES = 522393600
REPLAY_A_TAR_SHA256 = b56949fa868d2738a3f511a13ccef66c67b8bfa0797ee09e26f5907c50da49ed
REPLAY_B_TAR_BYTES = 522393600
REPLAY_B_TAR_SHA256 = b56949fa868d2738a3f511a13ccef66c67b8bfa0797ee09e26f5907c50da49ed
REPLAY_MANIFEST_EQUAL = PASS
REPLAY_TAR_BYTE_LENGTH_EQUAL = PASS
REPLAY_TAR_SHA256_EQUAL = PASS
REPLAY_TAR_FILE_BYTES_EQUAL = PASS
```

External evidence roots:

```text
REPLAY_A_TRANSPORT_ROOT = /private/tmp/signthos-004c1cc-transport-A
REPLAY_B_TRANSPORT_ROOT = /private/tmp/signthos-004c1cc-transport-B
```

These paths are locality evidence, not portable project inputs. Eligibility for later execution requires the selected retained `offline-input.tar` bytes to be rechecked immediately before any provisioning attempt against the exact qualified byte length and SHA-256 above. No inherited authority permits rebuilding the tar if the retained bytes are unavailable or drifted.

## 7. Independent full tar readback

A separate host-only verifier reopened both USTAR files, enumerated every member, rejected non-regular/non-directory types, rebound normalized metadata, read every regular-file payload from the tar itself, and recomputed each file SHA-256 against the canonical transport manifest.

```text
REPLAY_A_VERIFIED_MEMBERS = 850
REPLAY_A_VERIFIED_FILES = 842
REPLAY_A_VERIFIED_DIRECTORIES = 8
REPLAY_A_VERIFIED_PAYLOAD_BYTES = 521742319
REPLAY_A_READBACK_MISMATCH_COUNT = 0
REPLAY_B_VERIFIED_MEMBERS = 850
REPLAY_B_VERIFIED_FILES = 842
REPLAY_B_VERIFIED_DIRECTORIES = 8
REPLAY_B_VERIFIED_PAYLOAD_BYTES = 521742319
REPLAY_B_READBACK_MISMATCH_COUNT = 0
```

This readback is content verification only. It is not a container-placement or APT-consumption result.

## 8. Execution accounting and non-grants

```text
PUBLIC_OR_PRIVATE_NETWORK_REQUESTS = 0
DOCKER_COMMANDS = 0
CONTAINER_STARTS = 0
IMAGE_PULL_LOAD_BUILD_COMMIT = 0
APT_GET_EXECUTIONS = 0
APT_CACHE_EXECUTIONS = 0
APT_CONFIG_EXECUTIONS = 0
DPKG_EXECUTIONS = 0
PACKAGE_DOWNLOADS = 0
PACKAGE_INSTALL_UNPACK_CONFIGURE = 0
MAINTAINER_SCRIPT_OR_TRIGGER_EXECUTIONS = 0
TOOLCHAIN_OR_SOURCE_ACQUISITION = 0
PDFIUM_BUILD_EXECUTIONS = 0
PROVIDER_OR_PDF_RUNTIME_EXECUTIONS = 0
REPOSITORY_EXTERNAL_BYTE_IMPORT = 0
PROVISIONING_ATTEMPTS_AUTHORIZED_OR_CONSUMED = 0
```

The two 522393600-byte tar files, the 386505-byte canonical manifests, and the 253125-byte cache-name mapping remain external evidence only.

## 9. Qualification result and successor boundary

```text
004C1CC_RESULT = PASS_RETAINED_OFFLINE_INPUT_TRANSPORT_IDENTITY_ONLY
RETAINED_ARCHIVE_LOCALITY = PRESENT_AND_FULL_REHASH_PASS
RETAINED_SIGNED_METADATA_LOCALITY = PRESENT_AND_IDENTITY_PASS
RETAINED_UNCOMPRESSED_PACKAGES_LOCALITY = PRESENT_AND_IDENTITY_PASS
APT_CACHE_STORE_FILENAME_MAPPING = ESTABLISHED
DETERMINISTIC_TRANSPORT_MANIFEST = ESTABLISHED
DETERMINISTIC_TRANSPORT_USTAR = ESTABLISHED_FOR_RETAINED_EXACT_BYTES
TAR_REGENERATION_AUTHORITY = ABSENT
TWO_REPLAY_TRANSPORT_DETERMINISM = PASS
CONTAINER_VISIBLE_PLACEMENT_FOR_004C1CB_ROOT = NOT_EXECUTED_NOT_ESTABLISHED
APT_OFFLINE_ARCHIVE_CONSUMPTION = NOT_EXECUTED_NOT_ESTABLISHED
PACKAGE_PROVISIONING_EXECUTION_AUTHORITY = ABSENT
FINAL_PROVISIONED_IMAGE_IDENTITY = NOT_ESTABLISHED
PDFIUM_BUILD_EXECUTION_AUTHORITY = ABSENT
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
```

After guarded merge and mechanical closeout, fresh Issue #7 reconciliation must immediately re-read Docker server/kernel/architecture and selected-image locality/config/platform as required by canonical 004C1CB. Only if freshness still matches may a separately authorized successor consider exactly one package-provisioning attempt using this exact retained transport. If substrate or retained input identity drifts, execution eligibility fails closed.

## 10. Candidate acceptance gates

The candidate is merge-eligible only if:

1. canonical `main` remains the recorded base/tree and there is no competing successor PR;
2. exactly this one qualification file changes;
3. all retained 004C1AK A/B archives rehash with zero mismatch and exact canonical inventory identity;
4. retained 004C1AG/004C1AU signed metadata and uncompressed package-list bytes match canonical identities;
5. the APT 2.4.13 `StoreFilename` derivation is bound to exact canonical source provenance and yields exactly 826 unique cache names;
6. both independent USTAR materializations have exactly 850 logical members and identical bytes/SHA-256, the selected retained `offline-input.tar` rehashes to exactly `522393600 / b56949fa868d2738a3f511a13ccef66c67b8bfa0797ee09e26f5907c50da49ed`, and no regenerated or alternate-writer tar is treated as qualified;
7. independent full tar readback returns zero content or metadata mismatch for both transports;
8. no network, Docker, APT, dpkg, package action, toolchain/source acquisition, PDFium build, provider/PDF runtime, or repository external-byte import occurs;
9. fresh independent substantive exact-head review reports no unresolved material finding;
10. any repair is forward-only and triggers fresh exact-head review;
11. immediate premerge race proof passes and guarded normal merge uses the exact reviewed head;
12. post-merge mechanical verification and fresh Issue #7 successor reconciliation complete before any provisioning execution authority is inferred.
