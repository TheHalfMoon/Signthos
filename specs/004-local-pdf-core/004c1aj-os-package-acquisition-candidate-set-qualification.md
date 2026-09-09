# 004C1AJ — OS Package Acquisition Candidate Set Qualification

Status: `QUALIFICATION_CANDIDATE / EXACT_METADATA_ONLY_CLOSURE_TO_BASE_DELTA_AND_ARCHIVE_CANDIDATE_QUALIFICATION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `392fd361d7c9b1600dd1680e0b54ee5483eeeeca`
Canonical base tree: `f8d9ff239b7cb19af477e8a25c8f42027a6d2fcc`
Authority source: `github:issue-comment:5608550208`

## 1. Purpose and exact authority

Canonical 004C1AG established one exact Jammy/amd64 package metadata closure. Canonical 004C1AI established the selected Emscripten base-image installed package state without inferring an APT transaction. 004C1AJ closes only the next metadata prerequisite: determine which exact package archives are candidates for a later acquisition grain by comparing the canonical closure to the canonical installed state.

```text
004C1AJ_AUTHORITY = EXACT_METADATA_ONLY_CLOSURE_TO_BASE_DELTA_AND_ARCHIVE_CANDIDATE_QUALIFICATION
004C1AJ_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1aj-os-package-acquisition-candidate-set-qualification.md
004C1AJ_MAX_CHANGED_REPOSITORY_FILES = 1
004C1AJ_EXTERNAL_EVIDENCE_ROOT = EPHEMERAL_OUTSIDE_REPOSITORY
PACKAGE_ARCHIVE_DOWNLOAD = NOT_AUTHORIZED
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

## 2. Canonical predecessor bindings

The metadata delta was admitted only after exact predecessor byte identities matched:

```text
CANONICAL_004C1AG_RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
CANONICAL_004C1AG_RESOLVED_PACKAGE_COUNT = 910
CANONICAL_004C1AG_RESOLVER_V2_SHA256 = 8c0150e2054091eba165f56a0576fac62b213a618ff2f0b6f885faa59bd581c2
CANONICAL_004C1AI_INSTALLED_PACKAGES_SHA256 = bdc5c6bbbe47db0313b2281b67e2f152ad75e93ab169bbfccf0b5441444694ba
CANONICAL_004C1AI_INSTALLED_PACKAGE_COUNT = 231
```

Any mismatch in these predecessor identities fails closed before classification.

## 3. Metadata-only resolver contract

A Signthos-authored external resolver was used only as metadata logic. Its exact source identity is:

```text
004C1AJ_METADATA_DELTA_RESOLVER_SHA256 = e765354a7b9850d40df68e171eff68cf4408f0c855f0391dc5036569b77d2ce0
```

The resolver:

1. verifies exact predecessor SHA-256 identities before parsing;
2. requires one and only one canonical metadata record per package name;
3. requires `package`, `version`, `architecture`, `suite`, `component`, `filename`, `size`, and `sha256` for every closure record;
4. rejects malformed archive metadata, duplicate package identities, zero/negative sizes, missing `.deb` filenames, and malformed SHA-256 identities;
5. imports only Debian version ordering from the exact canonical 004C1AG resolver v2;
6. compares canonical selected package versions to the exact canonical base-image installed package state;
7. emits canonical JSON with stable ordering;
8. never invokes APT, dpkg, Docker, Node, package scripts, or build tooling.

## 4. Complete classification

Every one of the 910 canonical closure package identities was classified exactly once:

```text
PRESENT_EXACT = 84
PRESENT_OLDER = 106
PRESENT_NEWER = 0
ARCHITECTURE_MISMATCH = 0
ABSENT = 720
TOTAL = 910
```

Classification semantics are intentionally narrow:

- `PRESENT_EXACT`: same package, compatible architecture, exact canonical version already installed;
- `PRESENT_OLDER`: same package and compatible architecture installed at a Debian-version-order lower version;
- `PRESENT_NEWER`: installed version is higher than the canonical metadata selection;
- `ARCHITECTURE_MISMATCH`: selected and installed architecture identities are incompatible;
- `ABSENT`: canonical selected package name is not installed in the base image.

004C1AJ fails closed if `PRESENT_NEWER` or `ARCHITECTURE_MISMATCH` is nonzero. Both are zero for the exact canonical input tuple.

## 5. Exact archive-acquisition candidate set

Only `PRESENT_OLDER + ABSENT` records are eligible for the archive-acquisition candidate set. `PRESENT_EXACT` records are excluded because the exact selected version is already installed in the selected base image.

```text
ARCHIVE_ACQUISITION_CANDIDATE_COUNT = 826
ARCHIVE_ACQUISITION_CANDIDATE_TOTAL_PUBLISHED_BYTES = 317223784
ARCHIVE_ACQUISITION_CANDIDATES_JSON_BYTES = 234052
ARCHIVE_ACQUISITION_CANDIDATES_SHA256 = 6e0f757291d3e2a6ad72799b22b2abe957d239d15f4e9dcd279f6b98160de357
```

Every candidate record preserves exactly:

```text
package
version
architecture
suite
component
filename
size
sha256
```

from canonical 004C1AG. No archive URL, mirror, alternate version, or host-state substitution is introduced by this grain.

## 6. Full classification evidence identity

The complete 910-record classification is also retained externally as canonical JSON:

```text
CLASSIFICATION_JSON_BYTES = 295313
CLASSIFICATION_SHA256 = ac84ce547bc90a736513707685679cc937c9e985e40bad752be015c2a6e27cab
```

The external summary identity is:

```text
SUMMARY_SHA256 = c8f5ef9503dff87af14390825af32f2870d7332eb5ba2570412e72bf0ca461ac
```

## 7. Independent metadata replay determinism

Replay A and Replay B used separately recreated external roots. Each received independent copies of the exact canonical 004C1AG closure bytes, exact canonical 004C1AI installed-package bytes, and exact canonical 004C1AG resolver source bytes. The same exact 004C1AJ resolver source was then executed independently.

Both runs produced:

```text
CLASSIFICATION_BYTES_EQUAL = PASS
ARCHIVE_CANDIDATES_BYTES_EQUAL = PASS
SUMMARY_BYTES_EQUAL = PASS
CLASSIFICATION_SHA256 = ac84ce547bc90a736513707685679cc937c9e985e40bad752be015c2a6e27cab
ARCHIVE_CANDIDATES_SHA256 = 6e0f757291d3e2a6ad72799b22b2abe957d239d15f4e9dcd279f6b98160de357
SUMMARY_SHA256 = c8f5ef9503dff87af14390825af32f2870d7332eb5ba2570412e72bf0ca461ac
```

No network read was required for this qualification because the exact predecessor evidence bytes remained available and were first re-bound by hash.

## 8. Explicit non-transaction boundary

This candidate set is not an APT transaction plan and must not be described as one.

```text
EFFECTIVE_PACKAGE_DOWNLOAD_SET = NOT_ESTABLISHED
EFFECTIVE_INSTALL_UPGRADE_REMOVE_TRANSACTION = NOT_ESTABLISHED
APT_SOLVER_BEHAVIOR = NOT_EXECUTED
APT_SIMULATION = NOT_EXECUTED
DPKG_EXECUTION = NOT_EXECUTED
INSTALL_ORDER = NOT_ESTABLISHED
CONFIGURE_ORDER = NOT_ESTABLISHED
MAINTAINER_SCRIPT_BEHAVIOR = NOT_ESTABLISHED
PACKAGE_REMOVAL_SET = NOT_ESTABLISHED
PACKAGE_ARCHIVE_DOWNLOAD = 0
```

The 826 records are exactly the archive identities that would need byte acquisition if a later canonical grain authorizes acquisition of the selected metadata delta. Actual installability, ordering, removals, maintainer scripts, and effective APT transaction remain separate evidence questions.

## 9. Qualification result

```text
004C1AJ_RESULT = QUALIFIED_EXACT_OS_PACKAGE_ARCHIVE_ACQUISITION_CANDIDATE_SET
CANONICAL_CLOSURE_TO_BASE_DELTA = ESTABLISHED
ARCHIVE_ACQUISITION_CANDIDATE_SET = ESTABLISHED
ARCHIVE_ACQUISITION_CANDIDATE_COUNT = 826
ARCHIVE_ACQUISITION_CANDIDATE_TOTAL_PUBLISHED_BYTES = 317223784
PRESENT_NEWER = 0
ARCHITECTURE_MISMATCH = 0
TWO_REPLAY_METADATA_DETERMINISM = PASS
PACKAGE_ARCHIVE_ACQUISITION = NOT_PERFORMED / NOT_AUTHORIZED
EFFECTIVE_APT_TRANSACTION = NOT_ESTABLISHED
PDFIUM_BUILD_EXECUTION_AUTHORITY = ABSENT
PDFIUM_COMPONENT_NOTICE_COMPLETENESS = PARTIAL
DISTRIBUTION_ADOPTION_GATE = FAIL_CLOSED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

004C1AJ closes only the metadata candidate-set question. Fresh successor reconciliation must decide whether exact acquisition of these 826 immutable `.deb` archives is the next smallest prerequisite or whether another narrower evidence grain is required first.

## 10. Candidate acceptance gates

This candidate is eligible for canonical merge only if the exact final head proves all of the following:

1. canonical base remains `392fd361d7c9b1600dd1680e0b54ee5483eeeeca` / tree `f8d9ff239b7cb19af477e8a25c8f42027a6d2fcc`;
2. exactly this one Signthos-authored qualification file changes;
3. the canonical 004C1AG closure, canonical 004C1AI installed state, and canonical 004C1AG resolver identities are re-bound exactly;
4. every closure package is classified exactly once;
5. duplicate selected package names or malformed archive metadata fail closed;
6. `PRESENT_NEWER` and architecture mismatch are zero;
7. the acquisition candidate set is exactly `PRESENT_OLDER + ABSENT`;
8. every candidate preserves exact canonical package/version/architecture/suite/component/filename/size/SHA-256 metadata;
9. Replay A and Replay B produce byte-identical classification, candidate-set, and summary bytes;
10. no `.deb`, Ubuntu index, base-image, toolchain, upstream source, generated build output, package-manifest, lockfile, NOTICE/SBOM/provenance, provider/runtime, workflow, fixture, or database artifact enters the candidate;
11. exact-head provider/check state is accounted truthfully and skipped/unavailable review is not approval;
12. fresh independent substantive exact-head review reports no unresolved material finding;
13. any repair is forward-only and triggers fresh exact-head review;
14. unresolved material review threads are zero;
15. immediate premerge base/head/race proof passes;
16. guarded normal merge uses exact `expected_head_sha`;
17. mechanical post-merge SHA/tree/parent/signature/surface verification passes;
18. fresh Issue #7 successor reconciliation occurs before archive acquisition, APT/dpkg execution, package installation, provisioning, toolchain acquisition/execution, PDFium build/runtime, 004C2, 004D, or Specification 005 authority is inferred.
