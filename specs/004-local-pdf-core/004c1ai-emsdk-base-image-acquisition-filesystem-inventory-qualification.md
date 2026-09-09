# 004C1AI — Emscripten Base-Image Acquisition and Filesystem Inventory Qualification

Status: `QUALIFICATION_CANDIDATE / EXACT_CONTENT_ADDRESSED_OCI_ACQUISITION_AND_OFFLINE_FILESYSTEM_INVENTORY_ONLY / ZERO_IMAGE_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `bee64bfaa48dc090d368b4ad16e8265c4804eef7`
Canonical base tree: `22058c15132e512037a53da85c479dc20617a7d7`
Authority source: `github:issue-comment:5608033615`
Predecessor-metadata availability reconciliation: `github:issue-comment:5608246118`

## 1. Purpose and exact authority

Canonical 004C1AF selected the exact content-addressed Emscripten linux/amd64 base image. Canonical 004C1AG established the exact Ubuntu/Jammy package metadata closure required by the selected Chromium dependency semantics. Canonical 004C1AH established that Chromium's Rodete-specific pinned `linux-libc-dev` branch is false for the current measured substrate, subject to a mandatory recheck before later provisioning.

004C1AI closes the next smaller prerequisite only: acquire the already-selected OCI image by immutable digest into external ephemeral evidence roots, reconstruct its filesystem offline without executing image content, establish the installed dpkg package inventory, compare that inventory to canonical 004C1AG metadata identities without inferring an APT transaction, and bind the embedded selected Node executable by bytes and ELF metadata.

```text
004C1AI_AUTHORITY = EXACT_CONTENT_ADDRESSED_OCI_ACQUISITION_AND_OFFLINE_FILESYSTEM_INVENTORY_ONLY
004C1AI_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ai-emsdk-base-image-acquisition-filesystem-inventory-qualification.md
004C1AI_MAX_CHANGED_REPOSITORY_FILES = 1
004C1AI_EXTERNAL_EVIDENCE_ROOT = EPHEMERAL_OUTSIDE_REPOSITORY
PUBLIC_DOCKER_REGISTRY_TOKEN_METADATA_READ = AUTHORIZED
PUBLIC_DOCKER_REGISTRY_MANIFEST_READ = AUTHORIZED
PUBLIC_DOCKER_REGISTRY_CONFIG_BLOB_ACQUISITION = AUTHORIZED_EXTERNAL_ONLY
PUBLIC_DOCKER_REGISTRY_LAYER_BLOB_ACQUISITION = AUTHORIZED_EXTERNAL_ONLY
REGISTRY_ISSUED_HTTPS_BLOB_REDIRECT = AUTHORIZED_ONLY_IF_ORIGINATED_FROM_EXACT_AUTHORIZED_BLOB_REQUEST_AND_RECORDED
REGISTRY_CREDENTIAL_FORWARDING_TO_REDIRECT_TARGET = PROHIBITED
SIGNTHOS_AUTHORED_OCI_METADATA_RESOLVER = AUTHORIZED_EXTERNAL_ONLY
SIGNTHOS_AUTHORED_OFFLINE_LAYER_APPLICATION = AUTHORIZED_EXTERNAL_ONLY
OCI_WHITEOUT_AND_OPAQUE_DIRECTORY_SEMANTICS = REQUIRED
OFFLINE_ROOTFS_FILESYSTEM_INVENTORY = AUTHORIZED_EXTERNAL_ONLY
OFFLINE_DPKG_STATUS_PARSE = AUTHORIZED_EXTERNAL_ONLY
OFFLINE_FILE_HASHING = AUTHORIZED_EXTERNAL_ONLY
ELF_METADATA_INSPECTION_WITHOUT_EXECUTION = AUTHORIZED_EXTERNAL_ONLY
DOCKER_IMAGE_PULL = NOT_AUTHORIZED
DOCKER_IMAGE_LOAD = NOT_AUTHORIZED
DOCKER_CONTAINER_EXECUTION = NOT_AUTHORIZED
CONTAINER_NETWORK_EXECUTION = NOT_AUTHORIZED
PACKAGE_ARCHIVE_ACQUISITION_OUTSIDE_SELECTED_OCI_LAYERS = NOT_AUTHORIZED
APT_OR_DPKG_EXECUTION = NOT_AUTHORIZED
PACKAGE_INSTALLATION = NOT_AUTHORIZED
NODE_EXECUTION = NOT_AUTHORIZED
EMSCRIPTEN_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
GCLIENT_GN_NINJA_OR_PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
REPOSITORY_UPSTREAM_BINARY_OR_SOURCE_IMPORT = NOT_AUTHORIZED
PACKAGE_JSON_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
NOTICE_SBOM_PROVENANCE_REPOSITORY_MUTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Exact selected image identity

```text
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
EXPECTED_MANIFEST_DIGEST = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
EXPECTED_CONFIG_DIGEST = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
EXPECTED_PLATFORM = linux/amd64
```

Both fresh acquisitions obtained exactly the digest-addressed Docker schema-2 manifest. The raw manifest bytes independently hashed to the expected digest, and the registry `Docker-Content-Digest` header matched the same identity.

```text
MANIFEST_MEDIA_TYPE = application/vnd.docker.distribution.manifest.v2+json
MANIFEST_BYTES = 1369
MANIFEST_SHA256 = c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
CONFIG_MEDIA_TYPE = application/vnd.docker.container.image.v1+json
CONFIG_BYTES = 4359
CONFIG_SHA256 = 6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
CONFIG_PLATFORM = linux/amd64
```

## 3. Exact layer identity set

The selected manifest contains five gzip-compressed Docker rootfs diff layers. Every blob was acquired only by the exact digest named by the verified manifest and was accepted only after both byte-count and SHA-256 verification.

| Index | Digest | Compressed bytes | Media type |
|---:|---|---:|---|
| 0 | `sha256:6414378b647780fee8fd903ddb9541d134a1947ce092d08bdeb23a54cb3684ac` | 29,535,688 | `application/vnd.docker.image.rootfs.diff.tar.gzip` |
| 1 | `sha256:1164f57cdbc07b21b5f290ecea54b10bbc0777ef07dd20c35c4fd530f43ac2e8` | 465,376,363 | `application/vnd.docker.image.rootfs.diff.tar.gzip` |
| 2 | `sha256:e760689f52850b429cbb44a5279b7784da9f0c3433f94bf5ae72c93468b2588b` | 4,339 | `application/vnd.docker.image.rootfs.diff.tar.gzip` |
| 3 | `sha256:75fef3b7122bb367a84e704f6eb3fe3bba5e1cddfeed8cb2b012eeeeac6ed672` | 225,670,250 | `application/vnd.docker.image.rootfs.diff.tar.gzip` |
| 4 | `sha256:33b4841b8fee46e16490db256e13a880072d422a2a45560774cf611ea312562a` | 92 | `application/vnd.docker.image.rootfs.diff.tar.gzip` |

```text
LAYER_COUNT = 5
LAYER_TOTAL_COMPRESSED_BYTES = 720586732
LAYER_SIZE_AND_SHA256_VERIFICATION = PASS / 5_OF_5 / REPLAY_A_AND_REPLAY_B
```

## 4. Registry redirect and credential boundary

The registry returned one HTTPS redirect for the config blob and one for each of the five layer blobs in each replay. Every registry-issued blob redirect targeted the following origin:

```text
https://production.cloudfront.docker.com
```

The acquisition harness deliberately performed the authenticated registry request with redirects disabled, parsed only the resulting HTTPS redirect, then issued a new unauthenticated HTTPS request to the redirect target.

```text
REDIRECT_RECORD_COUNT_PER_REPLAY = 6
REGISTRY_AUTHORIZATION_HEADER_FORWARDING_TO_REDIRECT = 0
REDIRECT_TARGET_SCHEME = https
REDIRECT_ACCOUNTING_BYTES_EQUAL = PASS
```

No bearer credential was forwarded to CloudFront or another redirect target.

## 5. Image configuration and selected Node path

The verified image config records:

```text
IMAGE_OS = linux
IMAGE_ARCHITECTURE = amd64
IMAGE_WORKING_DIR = /src
IMAGE_ENTRYPOINT = [/emsdk/docker/entrypoint.sh]
IMAGE_CMD = null
EMSDK = /emsdk
PATH = /emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

Therefore the exact Node directory selected in canonical 004C1AF remains present in the image-declared `PATH`:

```text
SELECTED_NODE_DIRECTORY = /emsdk/node/20.18.0_64bit/bin
SELECTED_NODE_DIRECTORY_PRESENT_IN_IMAGE_PATH = true
```

This is configuration evidence only. Neither the entrypoint nor Node was executed.

## 6. Offline logical rootfs reconstruction method

The Signthos-authored reconstruction harness never materialized or executed a container. It reconstructed a deterministic logical filesystem state directly from verified tar-layer bytes.

For each layer, the harness:

1. normalized each archive path as a root-relative POSIX path and rejected absolute or escaping paths;
2. streamed every regular file to SHA-256 without executing it;
3. recorded directories, regular files, symbolic links, hard links, character devices, block devices and FIFOs explicitly, failing on unsupported entry types;
4. collected whiteout operations for the layer before applying ordinary entries;
5. applied `.wh.<name>` as deletion of the target path and descendants;
6. applied `.wh..wh..opq` as removal of lower-layer children of the containing directory while preserving the directory itself;
7. applied non-whiteout layer entries in archive order after the lower-layer deletions;
8. resolved hard-link content identity deterministically and failed closed on an unresolved hard link;
9. stored the final canonical inventory as stable JSON records sorted by exact POSIX path.

Each normalized inventory record contains exactly the required deterministic surface:

```text
path
type
mode
link_target
file_size
file_sha256
```

Host extraction timestamps, host inode identities, host ownership observations and other host-specific filesystem metadata are excluded. The logical representation avoids APFS case-sensitivity or inode-behavior substitution for Linux filesystem identity.

A final consistency check found:

```text
FINAL_SYMLINK_COUNT = 1051
FINAL_PATHS_UNDER_SYMLINK_PREFIX = 0
FINAL_HARDLINK_COUNT = 122
FINAL_HARDLINKS_WITHOUT_FILE_SHA256 = 0
```

## 7. Deterministic rootfs inventory

Both replays produced the same canonical logical rootfs:

```text
ROOTFS_PATH_COUNT = 37570
ROOTFS_INVENTORY_JSONL_BYTES = 7969350
ROOTFS_INVENTORY_SHA256 = f5362f12e52f0ef7d4fa42bca401be0c3cf99a2bc9962a085fd6b4eb4d6e658d
ROOTFS_INVENTORY_BYTES_EQUAL = PASS
```

Final type distribution is:

```text
DIRECTORY_COUNT = 3715
REGULAR_FILE_COUNT = 32682
HARDLINK_COUNT = 122
SYMLINK_COUNT = 1051
```

No image content was executed to obtain this inventory.

## 8. Offline dpkg installed-package inventory

The final logical filesystem contains `/var/lib/dpkg/status`. Its exact bytes were materialized from the verified source layer as data only and parsed without invoking `dpkg`.

```text
DPKG_STATUS_BYTES = 231024
DPKG_STATUS_SHA256 = 49176dcea062ad5a71df28c178ce241a6bcf9a2ec7e1525a1445a143bfd1080b
INSTALLED_PACKAGE_COUNT = 231
NONINSTALLED_DPKG_STANZA_COUNT = 0
INSTALLED_PACKAGES_CANONICAL_JSON_BYTES = 25060
INSTALLED_PACKAGES_SHA256 = bdc5c6bbbe47db0313b2281b67e2f152ad75e93ab169bbfccf0b5441444694ba
INSTALLED_PACKAGE_INVENTORY_BYTES_EQUAL = PASS
```

Each installed record binds `package`, `version`, `architecture`, and exact `Status = install ok installed` in stable canonical order.

## 9. Canonical 004C1AG predecessor metadata bridge

004C1AG intentionally kept its 293,999-byte resolved closure outside the repository. When 004C1AI reached its mandatory installed-package comparison, those ephemeral bytes were no longer present on the connected execution device.

Issue #7 reconciliation `github:issue-comment:5608246118` therefore authorized only the exact predecessor metadata reads needed to regenerate those already-qualified comparison bytes, with package archive acquisition and APT/dpkg execution still prohibited.

The exact resolver source was reconstructed from canonical evidence comment `github:issue-comment:5607783345` and matched its canonical identity before use:

```text
004C1AG_RESOLVER_V2_BYTES = 22258
004C1AG_RESOLVER_V2_SHA256 = 8c0150e2054091eba165f56a0576fac62b213a618ff2f0b6f885faa59bd581c2
EXPECTED_004C1AG_RESOLVER_V2_SHA256 = 8c0150e2054091eba165f56a0576fac62b213a618ff2f0b6f885faa59bd581c2
RESOLVER_IDENTITY_MATCH = PASS
```

The metadata-only replay reverified the canonical keyring/signature/index chain and reproduced exactly:

```text
ROOT_PACKAGE_SET_SHA256 = 2d3674e9676c03150f515de07a750f772e37925311bf2f11395d0c502616a8e0
RESOLVED_CLOSURE_JSON_BYTES = 293999
RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
RESOLVED_PACKAGE_METADATA_COUNT = 910
EVIDENCE_MANIFEST_SHA256 = b81ab60d70f3afa0027e6b688d38162c40d726a55ea9ae544f08169ffd09332f
CANONICAL_004C1AG_IDENTITY_REPRODUCTION = PASS
PACKAGE_ARCHIVE_ACQUISITION = 0
APT_OR_DPKG_EXECUTION = 0
```

No new snapshot or package identity was selected.

## 10. Installed-package comparison to canonical 004C1AG

Comparison uses the Debian version-ordering implementation already contained in the exact canonical 004C1AG resolver. It compares installed package names and versions to the one canonical closure identity per package name and does not infer transaction behavior.

For all 231 packages installed in the selected base image:

```text
EXACT_VERSION_MATCH = 84
INSTALLED_OLDER_THAN_004C1AG = 106
INSTALLED_NEWER_THAN_004C1AG = 0
ARCHITECTURE_MISMATCH = 0
NOT_IN_004C1AG_CLOSURE = 41
PACKAGE_COMPARISON_JSON_BYTES = 82660
PACKAGE_COMPARISON_SHA256 = d62a57134782609e32c272a8ea5425f146270c346f3a7d560ad38e15098c1f74
```

For the 158 canonical combined requested roots, virtual root `git-core` is evaluated through its canonical selected provider `git`:

```text
PRESENT_EXACT = 7
PRESENT_OLDER = 25
PRESENT_NEWER = 0
PRESENT_ARCHITECTURE_MISMATCH = 0
ABSENT_REQUESTED_ROOT = 126
ROOT_PACKAGE_COMPARISON_JSON_BYTES = 21199
ROOT_PACKAGE_COMPARISON_SHA256 = f3a5bbdc93b49711fd855d0692fec2edeee579bffd3d56e1c93e3f5062c76018
```

These observations establish base-image state only. In particular:

```text
EFFECTIVE_PACKAGE_DOWNLOAD_SET = NOT_ESTABLISHED
EFFECTIVE_INSTALL_UPGRADE_REMOVE_TRANSACTION = NOT_ESTABLISHED
APT_SOLVER_BEHAVIOR = NOT_EXECUTED / NOT_INFERRED
SIMULTANEOUS_INSTALLABLE_SET_CLAIMED = false
```

The presence of an older package does not prove it must be downloaded, upgraded or removed; the absence of a requested root does not by itself establish the final APT transaction.

## 11. Embedded selected Node byte identity and ELF metadata

The final logical rootfs contains the exact selected path from 004C1AF:

```text
NODE_PATH = /emsdk/node/20.18.0_64bit/bin/node
NODE_BYTES = 84136624
NODE_SHA256 = 94ea6cc6b866ec29a0f5924eb636783f814e0ef0e5925a1d3ccb5f55b91ac633
ELF_CLASS = ELF64
ELF_ENDIANNESS = little
ELF_MACHINE = x86-64
ELF_MACHINE_ID = 62
ELF_TYPE = 2
ELF_OSABI = 3
NODE_EXECUTION = 0
```

The ELF header was parsed as bytes only. This establishes a linux/amd64 executable identity without executing the binary or claiming runtime correctness.

## 12. External harness identities and failed pre-replay attempt

All helper code remained external to the repository.

```text
OCI_ACQUISITION_HARNESS_SHA256 = 5cd321f1d351ed2dbc2ce48ea2340539b8877cc05d7840baea779ebc1c5c8e3c
OFFLINE_INVENTORY_HARNESS_SHA256 = 94b4cf6a954197b94f621461e2b1fa988405b80a7491ebd1e53628804faa9117
PACKAGE_COMPARISON_HARNESS_SHA256 = 8e687d659d4a5f987c0f92d21ccd0189a3deda6d3d8cd3909db6d08848e8144c
CANONICAL_004C1AG_RESOLVER_SHA256 = 8c0150e2054091eba165f56a0576fac62b213a618ff2f0b6f885faa59bd581c2
```

One initial harness invocation failed before config/layer blob acquisition because a shell-local variable was referenced inside the same declaration under `set -u`. That invocation is nonqualifying. The harness was corrected outside the repository, its new identity was recorded above, and Replay A started again from a freshly removed/recreated evidence root.

```text
INITIAL_HARNESS_ATTEMPT = NONQUALIFYING
INITIAL_HARNESS_FAILURE = SHELL_LOCAL_DECLARATION / BEFORE_CONFIG_OR_LAYER_BLOB_ACQUISITION
HISTORY_REWRITE = NOT_APPLICABLE / EXTERNAL_EPHEMERAL_HARNESS
```

## 13. Fresh Replay A and Replay B determinism

Replay A and Replay B used distinct freshly recreated external evidence roots. Each separately reacquired the exact manifest, config and all five layers from the registry, verified all bytes, reconstructed the logical rootfs, parsed the dpkg inventory, hashed Node and performed the canonical 004C1AG comparison.

```text
REPLAY_A_ACQUISITION_SUMMARY_SHA256 = 764a0d6dfe6215cb2c3f7ae3f4047f278c31d1ef7b73f47bfb7e32bc3c07f8c9
REPLAY_B_ACQUISITION_SUMMARY_SHA256 = 764a0d6dfe6215cb2c3f7ae3f4047f278c31d1ef7b73f47bfb7e32bc3c07f8c9
REPLAY_A_SUMMARY_SHA256 = 7abd9a07c7f1d36f8f85854a294380f153ffe403fd7b202e1f365a7515de9016
REPLAY_B_SUMMARY_SHA256 = 6a28015e5fe0d64ded985c924475f0bb015b4c4014c9c5b575e60960c4459e3f
CROSS_REPLAY_COMPARISON_SHA256 = 74d9f9150832cac82f025070f845122a01f652ad286826e0dd992495efe6a242
```

The replay-summary digests intentionally differ because each summary labels its own replay as `A` or `B`. The evidence surfaces that must be identical were compared independently and all passed:

```text
MANIFEST_BYTES_EQUAL = PASS
CONFIG_BYTES_EQUAL = PASS
LAYER_IDENTITY_SET_EQUAL = PASS
REDIRECT_ACCOUNTING_BYTES_EQUAL = PASS
ROOTFS_INVENTORY_BYTES_EQUAL = PASS
INSTALLED_PACKAGE_INVENTORY_BYTES_EQUAL = PASS
NODE_DIGEST_EQUAL = PASS
PACKAGE_COMPARISON_BYTES_EQUAL = PASS
ROOT_COMPARISON_BYTES_EQUAL = PASS
004C1AI_TWO_REPLAY_DETERMINISM = PASS
```

Raw OCI blobs, reconstructed inventory bytes, dpkg status bytes, Node bytes and predecessor metadata bytes remain external ephemeral evidence and are not committed.

## 14. Qualification result and exact remaining boundary

```text
004C1AI_RESULT = QUALIFIED_EXACT_SELECTED_BASE_IMAGE_BYTE_FILESYSTEM_PACKAGE_AND_NODE_IDENTITY
SELECTED_IMAGE_MANIFEST_IDENTITY = ESTABLISHED
SELECTED_IMAGE_CONFIG_IDENTITY = ESTABLISHED
SELECTED_IMAGE_LAYER_IDENTITY_SET = ESTABLISHED
SELECTED_IMAGE_PLATFORM = linux/amd64 / ESTABLISHED
OFFLINE_ROOTFS_INVENTORY = ESTABLISHED
BASE_IMAGE_FILESYSTEM_INVENTORY = ESTABLISHED
BASE_IMAGE_INSTALLED_PACKAGE_STATE = ESTABLISHED
EMBEDDED_SELECTED_NODE_BYTE_IDENTITY = ESTABLISHED
NODE_EXECUTABLE_BYTE_HASH = 94ea6cc6b866ec29a0f5924eb636783f814e0ef0e5925a1d3ccb5f55b91ac633
004C1AG_INSTALLED_PACKAGE_COMPARISON = ESTABLISHED
EFFECTIVE_PACKAGE_DOWNLOAD_SET = NOT_ESTABLISHED
EFFECTIVE_INSTALL_UPGRADE_REMOVE_TRANSACTION = NOT_ESTABLISHED
PACKAGE_ARCHIVE_ACQUISITION_OUTSIDE_SELECTED_OCI_LAYERS = NOT_PERFORMED / NOT_AUTHORIZED
PACKAGE_INSTALLATION = NOT_PERFORMED / NOT_AUTHORIZED
GN_NINJA_CLANG_ACQUIRED_BYTE_IDENTITIES = NOT_ESTABLISHED
PDFIUM_BUILD_EXECUTION_AUTHORITY = ABSENT
PDFIUM_COMPONENT_NOTICE_COMPLETENESS = PARTIAL
DISTRIBUTION_ADOPTION_GATE = FAIL_CLOSED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

004C1AI does not authorize a package transaction merely because the exact base state is now known. Fresh successor reconciliation must determine the smallest remaining prerequisite, including whether a separately bounded package-transaction planning/evidence grain must precede any package-archive acquisition or provisioning.

## 15. Candidate acceptance gates

This candidate is eligible for canonical merge only if the exact final head proves all of the following:

1. canonical base remains `bee64bfaa48dc090d368b4ad16e8265c4804eef7` / tree `22058c15132e512037a53da85c479dc20617a7d7`;
2. exactly this one Signthos-authored qualification file changes;
3. exact manifest/config/layer size and SHA-256 identities remain bound to the selected immutable image;
4. every registry redirect remains HTTPS, originated from an exact authorized registry blob request and is recorded without forwarding registry credentials;
5. the offline reconstruction applies explicit OCI/Docker whiteout and opaque-directory semantics and never executes image content;
6. canonical rootfs inventory is deterministic over the required normalized fields only;
7. final `/var/lib/dpkg/status` is present, well formed and parsed without `dpkg` execution;
8. canonical 004C1AG comparison bytes are consumed only after exact predecessor resolver/keyring/index/root-set/closure identities are reproduced;
9. the embedded selected Node path exists, hashes identically across replays and is ELF64 x86-64 without executing it;
10. Replay A and Replay B produce byte-identical required evidence surfaces;
11. no OCI blob, rootfs byte, package metadata byte, Node byte, helper script, source/toolchain byte, generated build output, package manifest, lockfile, workflow, NOTICE/SBOM/provenance mutation, provider/runtime artifact, fixture, container definition or database mutation enters the candidate;
12. exact-head Actions/check/provider state is accounted truthfully and non-substantive statuses are not approvals;
13. fresh independent substantive exact-head review reports no unresolved material finding;
14. any repair is forward-only and triggers fresh exact-head review;
15. unresolved material review threads are zero;
16. immediate premerge base/head/race proof passes;
17. guarded normal merge uses exact `expected_head_sha`;
18. mechanical post-merge SHA/tree/parent/signature/surface verification passes;
19. fresh Issue #7 successor reconciliation occurs before any package archive acquisition, provisioning, toolchain acquisition/execution, PDFium build/runtime, 004C2, 004D or Specification 005 authority is inferred.
