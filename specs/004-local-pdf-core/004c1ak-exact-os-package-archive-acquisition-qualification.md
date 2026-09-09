# 004C1AK — Exact OS Package Archive Acquisition Qualification

Status: `QUALIFICATION_CANDIDATE / EXACT_CANONICAL_004C1AJ_ARCHIVE_BYTE_ACQUISITION_AND_VERIFICATION_ONLY`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `5a1630a13e95ffe5f8812bac833c8041a8b4b89f`
Canonical base tree: `0a19aec6e3207511d3b1ae527eb583cce898f09c`
Authority source: `github:issue-comment:5608607774`

## 1. Purpose and authority

Canonical 004C1AJ established an exact 826-record archive-acquisition candidate set from the canonical Ubuntu snapshot metadata and exact selected base-image installed state. 004C1AK closes only archive-byte identity by acquiring those exact `.deb` objects into external evidence roots and requiring published size and SHA-256 matches. It does not extract, install, execute, or simulate package-management behavior.

```text
004C1AK_AUTHORITY = EXACT_CANONICAL_004C1AJ_ARCHIVE_BYTE_ACQUISITION_AND_VERIFICATION_ONLY
004C1AK_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ak-exact-os-package-archive-acquisition-qualification.md
004C1AK_MAX_CHANGED_REPOSITORY_FILES = 1
PACKAGE_ARCHIVE_ACQUISITION = AUTHORIZED_EXTERNAL_ONLY
DEB_EXTRACTION = NOT_AUTHORIZED
APT_OR_DPKG_EXECUTION = NOT_AUTHORIZED
APT_SIMULATION = NOT_AUTHORIZED
PACKAGE_INSTALLATION = NOT_AUTHORIZED
DOCKER_IMAGE_LOAD_OR_CONTAINER_EXECUTION = NOT_AUTHORIZED
NODE_OR_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
PDFIUM_BUILD_OR_PROVIDER_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Exact predecessor binding

Acquisition began only after the exact canonical 004C1AJ candidate bytes matched:

```text
ARCHIVE_ACQUISITION_CANDIDATE_COUNT = 826
ARCHIVE_ACQUISITION_CANDIDATE_TOTAL_PUBLISHED_BYTES = 317223784
ARCHIVE_ACQUISITION_CANDIDATES_SHA256 = 6e0f757291d3e2a6ad72799b22b2abe957d239d15f4e9dcd279f6b98160de357
UBUNTU_SNAPSHOT_ID = 20260909T180000Z
UBUNTU_SNAPSHOT_BASE = https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/
```

The acquisition harness also rejects any candidate count other than 826, any duplicate package identity, duplicate filename, non-`pool/` relative path, path traversal, or filename not ending in `.deb`.

## 3. External acquisition harness identity

The exact Signthos-authored external acquisition harness is bound as:

```text
004C1AK_ACQUISITION_HARNESS_SHA256 = d2d42793c3d17bbfd226e6c1ccf87eeeb20afcc54e1c8766465581e465b9a05a
```

For every candidate it constructs only:

```text
https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/<exact-canonical-filename>
```

It records the final HTTPS origin and HTTP status, reads archive bytes as opaque data, computes SHA-256 while streaming, and accepts the object only when both observed byte count and SHA-256 equal the canonical metadata record. The requests contain no authorization header, cookie, registry credential, package-manager credential, proxy secret, or custom CA material.

## 4. Replay A result

Replay A used a freshly recreated external evidence root and independently acquired all 826 exact candidates.

```text
REPLAY_A_VERIFIED_COUNT = 826
REPLAY_A_VERIFIED_TOTAL_BYTES = 317223784
REPLAY_A_VERIFIED_INVENTORY_BYTES = 439991
REPLAY_A_VERIFIED_INVENTORY_SHA256 = 38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98
REPLAY_A_ARCHIVE_IDENTITY_SET_SHA256 = 8ac7e3c9a44831e5f8c4a03a81862644990b504f7d2043102a1ab1a0fd69810d
REPLAY_A_SUMMARY_SHA256 = b1511c249940b486fcd1277d28c25e04586279fa4d67638d5a92e20bf32ab52b
REPLAY_A_SIZE_SHA256_VERIFICATION = PASS / 826_OF_826
```

No accepted object used an alternate package version or filename.

## 5. Replay B result

Replay B started independently from the exact same canonical candidate bytes in a distinct freshly recreated external evidence root and reacquired every archive from the exact snapshot path.

```text
REPLAY_B_VERIFIED_COUNT = 826
REPLAY_B_VERIFIED_TOTAL_BYTES = 317223784
REPLAY_B_VERIFIED_INVENTORY_BYTES = 439991
REPLAY_B_VERIFIED_INVENTORY_SHA256 = 38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98
REPLAY_B_ARCHIVE_IDENTITY_SET_SHA256 = 8ac7e3c9a44831e5f8c4a03a81862644990b504f7d2043102a1ab1a0fd69810d
REPLAY_B_SUMMARY_SHA256 = b1511c249940b486fcd1277d28c25e04586279fa4d67638d5a92e20bf32ab52b
REPLAY_B_SIZE_SHA256_VERIFICATION = PASS / 826_OF_826
```

## 6. Cross-replay determinism

The canonical inventories and summaries are byte-identical across the two acquisitions:

```text
VERIFIED_ARCHIVE_INVENTORY_BYTES_EQUAL = PASS
SUMMARY_BYTES_EQUAL = PASS
ARCHIVE_IDENTITY_SET_SHA256_EQUAL = PASS
VERIFIED_ARCHIVE_INVENTORY_SHA256 = 38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98
ARCHIVE_IDENTITY_SET_SHA256 = 8ac7e3c9a44831e5f8c4a03a81862644990b504f7d2043102a1ab1a0fd69810d
```

Across both replays, 1,652 archive acquisitions were admitted only after exact expected size and SHA-256 verification. Each replay independently accounts for the full published candidate byte total of 317,223,784 bytes.

## 7. Canonical verified inventory

Each of the 826 stable records contains:

```text
package
version
architecture
suite
component
filename
size
sha256
observed_size
observed_sha256
request_origin
final_origin
http_status
authorization_forwarded
```

For every record, `observed_size == size` and `observed_sha256 == sha256`. All final URLs remained HTTPS. No authorization credential was attached or forwarded by the harness.

Raw `.deb` bytes and the full inventory remain external evidence only and are not committed.

## 8. Explicit non-execution boundary

```text
DEB_EXTRACTION = 0
APT_OR_DPKG_EXECUTION = 0
APT_SIMULATION = 0
PACKAGE_INSTALLATION = 0
DOCKER_IMAGE_LOAD_OR_CONTAINER_EXECUTION = 0
NODE_OR_TOOLCHAIN_EXECUTION = 0
MAINTAINER_SCRIPT_EXECUTION = 0
EFFECTIVE_INSTALL_UPGRADE_REMOVE_TRANSACTION = NOT_ESTABLISHED
INSTALL_OR_CONFIGURE_ORDER = NOT_ESTABLISHED
```

Archive availability and identity do not prove transaction feasibility, install order, maintainer-script behavior, resulting filesystem state, or build readiness.

## 9. Qualification result

```text
004C1AK_RESULT = QUALIFIED_EXACT_OS_PACKAGE_ARCHIVE_BYTE_IDENTITY
EXACT_ARCHIVE_BYTE_SET = ESTABLISHED
EXACT_ARCHIVE_COUNT = 826
EXACT_ARCHIVE_TOTAL_BYTES = 317223784
TWO_REPLAY_ACQUISITION_DETERMINISM = PASS
DEB_EXTRACTION = NOT_PERFORMED / NOT_AUTHORIZED
APT_OR_DPKG_EXECUTION = NOT_PERFORMED / NOT_AUTHORIZED
PACKAGE_INSTALLATION = NOT_PERFORMED / NOT_AUTHORIZED
EFFECTIVE_APT_TRANSACTION = NOT_ESTABLISHED
PDFIUM_BUILD_EXECUTION_AUTHORITY = ABSENT
PDFIUM_COMPONENT_NOTICE_COMPLETENESS = PARTIAL
DISTRIBUTION_ADOPTION_GATE = FAIL_CLOSED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

Fresh successor reconciliation must determine the smallest remaining prerequisite. 004C1AK does not itself authorize `.deb` extraction, offline transaction simulation, package installation, builder provisioning, toolchain/source acquisition or execution, PDFium build/link, provider runtime, 004C2, 004D, or Specification 005.

## 10. Candidate acceptance gates

This candidate is eligible for canonical merge only if the exact final head proves:

1. canonical base remains `5a1630a13e95ffe5f8812bac833c8041a8b4b89f` / tree `0a19aec6e3207511d3b1ae527eb583cce898f09c`;
2. exactly this one Signthos-authored qualification file changes;
3. canonical 004C1AJ candidate-set identity is rebound exactly before acquisition;
4. exactly 826 unique package/filename records are acquired from exact snapshot-relative paths;
5. every accepted archive matches exact published size and SHA-256;
6. all acquisition destinations are HTTPS and no credentials are forwarded;
7. Replay A and Replay B independently acquire and verify the full set and produce byte-identical canonical inventories;
8. no `.deb`, extracted package byte, Ubuntu metadata, base-image, source/toolchain byte, generated runtime artifact, lockfile, package manifest, NOTICE/SBOM/provenance mutation, workflow, fixture, or database artifact enters the candidate;
9. no APT/dpkg/simulation/install/container/Node/toolchain/PDFium/provider execution is claimed;
10. exact-head provider/check accounting is truthful and skipped/unavailable review is not approval;
11. fresh independent substantive exact-head review reports no unresolved material finding;
12. any repair is forward-only and triggers fresh exact-head review;
13. unresolved material review threads are zero;
14. immediate premerge base/head/race proof passes;
15. guarded normal merge uses exact `expected_head_sha`;
16. mechanical post-merge SHA/tree/parent/signature/surface verification passes;
17. fresh Issue #7 successor reconciliation occurs before any later acquisition/extraction/execution/runtime authority is inferred.
