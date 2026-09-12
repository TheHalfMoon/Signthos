# 004C1DH — Successful Offline Package Provisioning Qualification

Status: `QUALIFICATION_CANDIDATE / EXACTLY_ONE_CONSUMED_ATTEMPT_PASS / NO_RETRY_AUTHORITY / ZERO_EXECUTION_IN_THIS_DOCUMENT_UNIT`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `88041b208bf79692c1e04c6e46a096cd4f227ca5`
Canonical base tree: `7744435288c0becb368de9aadc84380b489d7694`
Runtime authority: `github:issue-comment:5642113945`
Runtime closeout: `github:issue-comment:5642221014`
Repository-document authority: `github:issue-comment:5642248723`

## 1. Purpose and authority boundary

004C1DH consumed exactly one authorized repaired-harness offline package-provisioning attempt. The attempt crossed its consumption point exactly once, completed all three package stages, returned Docker exit zero and guest exit zero, and produced complete preserved evidence. This document binds that already-completed runtime result into one reviewable repository artifact.

This repository-document unit performs no Docker, APT, dpkg, package, network, toolchain, PDFium, provider, or PDF runtime execution.

```text
004C1DH_RUNTIME_AUTHORITY = EXACTLY_ONE_REPAIRED_HARNESS_OFFLINE_PACKAGE_PROVISIONING_ATTEMPT
004C1DH_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1dh-successful-offline-package-provisioning-qualification.md
004C1DH_MAX_CHANGED_REPOSITORY_FILES = 1
ATTEMPT_BUDGET = 1
ATTEMPT_CONSUMPTION_POINT = FIRST_SUCCESSFUL_START_OF_THE_EXACT_FROZEN_TARGET_CONTAINER
ATTEMPTS_CONSUMED = 1
ATTEMPTS_REMAINING = 0
SECOND_ATTEMPT = NOT_AUTHORIZED
SILENT_RETRY = FALSE
RUNTIME_EXECUTION_IN_THIS_DOCUMENT_UNIT = 0
DOCKER_CONTAINER_START_RESTART_EXEC_REMOVE = NOT_AUTHORIZED
APT_DPKG_PACKAGE_ACTION = NOT_AUTHORIZED
NETWORK_ACQUISITION = NOT_AUTHORIZED
IMAGE_COMMIT_OR_PUSH = NOT_AUTHORIZED
TOOLCHAIN_DEPOT_TOOLS_GCLIENT_GN_NINJA_CLANG_EXECUTION = NOT_AUTHORIZED
PDFIUM_BUILD_OR_RUNTIME = NOT_AUTHORIZED
PROVIDER_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
WAIVER = NO
```

## 2. Canonical predecessor chain

The attempt was not a free-standing execution. It consumed the exact repaired harness and exact offline transport established by the canonical predecessor chain:

```text
004C1DB = INSTALLED_PACKAGE_STATE_PROJECTION_REPAIR / CANONICAL
004C1DC = REPAIRED_OFFLINE_PROVISIONING_HARNESS_FREEZE / CLOSED_CANONICAL
004C1DC_CLOSEOUT = github:issue-comment:5642020533
004C1DD = READ_ONLY_ELIGIBILITY / CLOSED_FAIL_CLOSED_INELIGIBLE / ZERO_ATTEMPTS_CONSUMED
004C1DE = RETAINED_SOURCE_DISCOVERY / CLOSED
004C1DF = STOPPED_CONTAINER_SOURCE_RECOVERY / CLOSED_PASS
004C1DG = EXACT_TRANSPORT_REMATERIALIZATION / CLOSED_PASS
004C1DG_CLOSEOUT = github:issue-comment:5642111684
004C1DH_RUNTIME_AUTHORITY = github:issue-comment:5642113945
004C1DH_RUNTIME_CLOSEOUT = github:issue-comment:5642221014
```

The original retained 004C1CC tar paths had disappeared from host-local `/private/tmp`. No network reacquisition was used. The exact 842-file source payload was recovered one-way from the already-stopped prior container, rebound to canonical archive/list/descriptor identities, and then rematerialized into a tar that matched the original canonical 004C1CC full-file identity byte-for-byte.

## 3. Exact pre-consumption identity

Immediately before the consumed attempt, live GitHub and local runtime gates established:

```text
CANONICAL_MAIN = 88041b208bf79692c1e04c6e46a096cd4f227ca5
CANONICAL_MAIN_TREE = 7744435288c0becb368de9aadc84380b489d7694
OPEN_PULL_REQUESTS = 0
SELECTED_IMAGE_MANIFEST = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_IMAGE_CONFIG = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
TARGET_PLATFORM = linux/amd64
TARGET_CONTAINER_NAME = signthos-004c1dd-replacement-attempt1
TARGET_CONTAINER_PREEXISTED = FALSE
HOST_FREE_BYTES = 43596185600
HOST_FREE_INODES = 425744000
```

The selected image was verified entirely from local Docker state. Its descriptor digest matched the selected immutable manifest, and `docker image save` rebound `manifest.json` to the exact config blob path and exact config bytes above. No pull or remote image lookup was required.

## 4. Exact offline transport and harness

```text
TRANSPORT_PATH_AT_EXECUTION = /private/tmp/signthos-004c1dg-materialization-20260912T001652Z-25201/offline-input.tar
TRANSPORT_BYTES = 522393600
TRANSPORT_SHA256 = b56949fa868d2738a3f511a13ccef66c67b8bfa0797ee09e26f5907c50da49ed
TRANSPORT_MEMBERS = 850
TRANSPORT_FILES = 842
TRANSPORT_DIRECTORIES = 8
TRANSPORT_PAYLOAD_BYTES = 521742319
TRANSPORT_READBACK_MISMATCH_COUNT = 0
TRANSPORT_OTHER_MEMBER_TYPE_COUNT = 0
TRANSPORT_MEMBER_ORDER = EXACT

REPAIRED_GUEST_BYTES = 14016
REPAIRED_GUEST_SHA256 = 05ea58893bcd8f0f51326ce3af8f4eee6012b389e574d97138b425f6d5bc6bd9
DOCKER_ARGV_JSON_LF_BYTES = 14834
DOCKER_ARGV_JSON_LF_SHA256 = 8e7d3ca3d432020cfb492519d2889b111a835a4ffe1d3f3a229870ad6f195404
DOCKER_ARGV_ARGC = 27
ARGV_TO_GUEST_BYTE_BINDING = PASS
PULL_POLICY = never
NETWORK_MODE = none
HOST_MOUNTS = 0
```

The full tar readback checked all 842 regular-file payloads against the recovered exact source tree and checked the normalized USTAR metadata/order before the container was allowed to start.

## 5. Attempt consumption and outer execution result

The frozen container started successfully at the authority-defined consumption point. No second start or replacement container was used.

```text
CONTAINER_ID = 54a2dbb9955fa7bfab9054bc681b2db015b417a190c639e9f79ebfd348c6a105
CONTAINER_NAME = signthos-004c1dd-replacement-attempt1
STARTED_AT = 2026-09-12T00:27:35.833697211Z
FINISHED_AT = 2026-09-12T00:31:25.014219054Z
CONTAINER_STATUS = exited
CONTAINER_EXIT = 0
DOCKER_RUN_RETURN = 0
GUEST_EXIT = 0
OOM_KILLED = FALSE
STATE_ERROR = <empty>
NETWORK_MODE = none
MOUNTS = 0
ATTEMPT_1_CONSUMED = TRUE
ATTEMPTS_USED = 1
ATTEMPTS_REMAINING = 0
```

The host runner measured `229.61959075927734` seconds from the `docker run` invocation to return.

## 6. Host evidence-root binding

The fresh host evidence root was outside Signthos:

```text
HOST_EVIDENCE_ROOT = /private/tmp/signthos-004c1dh-attempt1-20260912T002718Z-48656
HOST_RUNNER = /private/tmp/signthos-004c1dh-runner.py
HOST_RUNNER_SHA256 = c8894b323beec3639d19b5529371922cbdbeee0374cd0c9cbd2483c6e9bd7480
```

Before the inventory file itself was written, that root contained 90 files totaling 12531716 bytes. A deterministic path/byte/SHA-256 inventory was then written and frozen:

```text
EVIDENCE_INVENTORY_COVERED_FILE_COUNT = 90
EVIDENCE_INVENTORY_COVERED_TOTAL_BYTES = 12531716
EVIDENCE_INVENTORY_BYTES = 11639
EVIDENCE_INVENTORY_SHA256 = 950ad069d9eeafc081aa79d83fbe0e7b4137da9e2318ead7a485da75aed67f02
```

Key host artifacts are independently bound:

```text
preflight.json = 904 / d1771429d72f30a8abf4fe00b59250b03faa2455c6be3dad005bfd9dae8be34d
docker-argv.json = 14834 / 8e7d3ca3d432020cfb492519d2889b111a835a4ffe1d3f3a229870ad6f195404
guest.sh = 14016 / 05ea58893bcd8f0f51326ce3af8f4eee6012b389e574d97138b425f6d5bc6bd9
containers.pre.tsv = 208 / 2fe3c5bb39642721bb4ff624c707393b2efdbcf7c0bebedec6a752e129c7cfec
docker.stdout.tar = 5099520 / ab8a4a9f23b3e149ef7fe5dc2dfa08ff30c37fe6e1d8688f893f855851cbb22a
docker.stderr.txt = 0 / e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
docker.exit.txt = 2 / 9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa
timing.json = 143 / a32ca32fd18e2be891ef9d8285859941770a84b3fb0944b591a6cbc8a99fb3c4
container.inspect.json = 36756 / 5b727aad984325d5d6cf9fc7043c0adcf8940f2e64e54eaef42ac5bd172f7279
container.diff.txt = 2336435 / 1dc79e1d8e751974d5bc5a0122a9a27e3eeebb37a7bd752d78425c25bfeed3fc
containers.post.tsv = 408 / 8096efdaeaa777478b9b3c47482a1c7b3c58add4ebee2ca9ec187635374cc50e
```

The guest-produced evidence tar is a valid tar with 78 members. Its SHA-256 is the `docker.stdout.tar` identity above.

## 7. Input and executable identity

The guest recorded the exact extracted input set and package archive set:

```text
INPUT_FILE_COUNT = 842
INPUT_FILE_SET_EQUALS_QUALIFIED_TRANSPORT = TRUE
INPUT_DEB_COUNT = 826
INPUT_DEB_SET_EQUALS_QUALIFIED_TRANSPORT = TRUE
ARCHIVE_IDENTITY_MISMATCH_COUNT = 0
APT_GET_SHA256 = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196
APT_GET_PATH = /usr/bin/apt-get
INPUT_TAR_STDERR_BYTES = 0
```

Every stage preserved 826 archive paths and 826 archive hashes. All stage archive hashes matched the exact recovered source payload.

## 8. Stage A qualification

```text
STAGE_A_EXIT = 0
STAGE_A_ARGV_SHA256 = 5b0f1ffb795a128f28a63f2d182e1cbc7970c85187763f2b115c60288db18c7a
STAGE_A_RAW_ROWS = 255
STAGE_A_RAW_BYTES = 13853
STAGE_A_RAW_SHA256 = 9edce4c60b4c23641b566a24d6468502c0a0c87381869376b962eaa4dbb1f8a3
STAGE_A_INSTALLED_COUNT = 255
STAGE_A_INSTALLED_BYTES = 27625
STAGE_A_INSTALLED_SHA256 = 14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7
STAGE_A_RESIDUAL_COUNT = 0
STAGE_A_RESIDUAL_BYTES = 3
STAGE_A_RESIDUAL_SHA256 = 37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
STAGE_A_DPKG_QUERY_STDERR_BYTES = 0
STAGE_A_STATE_MISMATCH_MARKER = ABSENT
STAGE_A_ARCHIVE_PATH_COUNT = 826
STAGE_A_ARCHIVE_HASH_COUNT = 826
STAGE_A_ARCHIVE_IDENTITY_MISMATCH_COUNT = 0
```

The installed-state identity equals the previously qualified Stage A virtual installed state exactly.

## 9. Stage B qualification

```text
STAGE_B_EXIT = 0
STAGE_B_ARGV_SHA256 = 2ea968eca2e35d46eb4aabd0a00af368d566506533a070871ec7a7123079d84b
STAGE_B_RAW_ROWS = 905
STAGE_B_RAW_BYTES = 50179
STAGE_B_RAW_SHA256 = 079eb5fb44d1bdcb3c979be23a2963bce04c07d704c0157b7e9b1168aa562a52
STAGE_B_INSTALLED_COUNT = 904
STAGE_B_INSTALLED_BYTES = 98938
STAGE_B_INSTALLED_SHA256 = 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea
STAGE_B_RESIDUAL_COUNT = 1
STAGE_B_RESIDUAL_BYTES = 115
STAGE_B_RESIDUAL_SHA256 = 040dd3c69edf71e1e66c59843ad51b7b3d5e790fd075c88f0454b7e2e22a5e1c
STAGE_B_RESIDUAL_EXACT = pkg-config:amd64 / deinstall ok config-files / 0.29.2-1ubuntu3
STAGE_B_DPKG_QUERY_STDERR_BYTES = 0
STAGE_B_STATE_MISMATCH_MARKER = ABSENT
STAGE_B_ARCHIVE_PATH_COUNT = 826
STAGE_B_ARCHIVE_HASH_COUNT = 826
STAGE_B_ARCHIVE_IDENTITY_MISMATCH_COUNT = 0
```

The installed-state identity equals the previously qualified Stage B virtual installed state exactly. The residual row is the exact closed-class residual already established by 004C1DB.

## 10. Stage C qualification

```text
STAGE_C_EXIT = 0
STAGE_C_ARGV_SHA256 = bda16e788ac116f3e376063f7bf7cffe0b0af0bd850a01e09ee06a1b211e51b9
STAGE_C_RAW_ROWS = 906
STAGE_C_RAW_BYTES = 50235
STAGE_C_RAW_SHA256 = 3c69f4e54278f7bac8260f005ab8befecdc3d944cbb598df027616a58ea8cd69
STAGE_C_INSTALLED_COUNT = 905
STAGE_C_INSTALLED_BYTES = 99059
STAGE_C_INSTALLED_SHA256 = 8801230a86014a849c052da1f85740def6e5fcd204584e914b67017472bb71be
STAGE_C_RESIDUAL_COUNT = 1
STAGE_C_RESIDUAL_BYTES = 104
STAGE_C_RESIDUAL_SHA256 = 6d4fbb1e3bbb8561ab667d84ca489c478b59611634b8aa8b13df2171b8ac0968
STAGE_C_RESIDUAL_EXACT = pkgconf:amd64 / deinstall ok config-files / 1.8.0-1
STAGE_C_DPKG_QUERY_STDERR_BYTES = 0
STAGE_C_STATE_MISMATCH_MARKER = ABSENT
STAGE_C_ARCHIVE_PATH_COUNT = 826
STAGE_C_ARCHIVE_HASH_COUNT = 826
STAGE_C_ARCHIVE_IDENTITY_MISMATCH_COUNT = 0
```

The installed-state identity equals the previously qualified Stage C virtual installed state exactly.

## 11. Stage C residual policy is canonical, not a waiver

004C1DB closed the terminal status policy before this attempt. Its allowed residual class is exactly:

```text
deinstall ok config-files
```

004C1DB also states that the projection applies uniformly to a future authorized Stage C attempt because Stage C compares virtual installed-package state with the real dpkg database. It specifically identifies the planned `pkgconf` / `pkg-config` transition and requires any terminal residual config-file row for the removed package to be preserved as residual evidence and excluded from the installed-package projection.

The actual Stage C dpkg log exhibits that exact transition:

```text
remove pkgconf:amd64 1.8.0-1 <none>
status config-files pkgconf:amd64 1.8.0-1
install pkg-config:amd64 0.29.2-1ubuntu3 0.29.2-1ubuntu3
status installed pkg-config:amd64 0.29.2-1ubuntu3
```

Therefore the Stage C `pkgconf` residual is policy-compliant evidence, not a state mismatch and not a waiver.

## 12. Raw evidence and sidecar validation

For all three stages, the corrected canonicalizer and independent host qualification established:

```text
RAW_ENCODING = strict UTF-8
RAW_RECORD_SEPARATOR = LF only
RAW_FINAL_LF = REQUIRED / PASS
EMPTY_RECORDS = REJECTED / NONE OBSERVED
RECORD_FIELDS = exactly 4 / PASS
DUPLICATE_PACKAGE_ARCH_KEYS = 0
INSTALLED_STATUS = exact install ok installed
RESIDUAL_STATUS = exact deinstall ok config-files
OTHER_TERMINAL_STATUS = 0
RAW_COUNT_BYTE_SHA_SIDECARS = PASS / ALL STAGES
INSTALLED_COUNT_BYTE_SHA_SIDECARS = PASS / ALL STAGES
RESIDUAL_COUNT_BYTE_SHA_SIDECARS = PASS / ALL STAGES
INSTALLED_PROJECTION_RECOMPUTATION = PASS / ALL STAGES
RESIDUAL_PROJECTION_RECOMPUTATION = PASS / ALL STAGES
```

No raw parser normalization was used to hide malformed evidence.

## 13. Preserved first local-classifier false negative

The first independent host-side qualification script correctly validated all raw framing, sidecars, installed-state identities, argv identities and archive identities, but it added an assumption that was not in canonical 004C1DB: it required the Stage C residual count to be zero.

That first summary is preserved unchanged:

```text
PREDECESSOR_LOCAL_CLASSIFIER = qualification-summary.json
PREDECESSOR_LOCAL_CLASSIFIER_BYTES = 275
PREDECESSOR_LOCAL_CLASSIFIER_SHA256 = 8d1a1247a1e707f8335077ea19b7a443698ca6f6627cd4b12a1e5db975522642
PREDECESSOR_LOCAL_CLASSIFIER_FINDINGS = [STAGE_C:expected_residual, STAGE_C:residual_exact]
PREDECESSOR_LOCAL_CLASSIFIER_CLASSIFICATION = FALSE_NEGATIVE_DUE_TO_NONCANONICAL_STAGE_C_ZERO_RESIDUAL_ASSUMPTION
```

The finding was not suppressed. Canonical 004C1DB was reread, the actual Stage C dpkg transition was checked, and a corrected qualification was produced against the already-preserved immutable attempt evidence. No runtime was rerun.

```text
CORRECTED_QUALIFICATION = qualification-summary-v2.json
CORRECTED_QUALIFICATION_BYTES = 3686
CORRECTED_QUALIFICATION_SHA256 = f03628513b1a66c59b4552db78c1543900ad2d63b39cc2cadadba0a7bca0ce02
CORRECTED_QUALIFICATION_FAILURES = 0
CORRECTED_QUALIFICATION_PASS = TRUE
RUNTIME_REEXECUTION_FOR_CORRECTION = 0
```

## 14. Qualification result

The single authorized offline package-provisioning attempt qualifies as a PASS.

```text
004C1DH_RESULT = PASS_EXACTLY_ONE_OFFLINE_PACKAGE_PROVISIONING_ATTEMPT
PACKAGE_PROVISIONING_SUCCESS = TRUE
STAGE_A_RUNTIME_EQUALITY = PASS
STAGE_B_RUNTIME_EQUALITY = PASS
STAGE_C_RUNTIME_EQUALITY = PASS
FINAL_VIRTUAL_STATE_905_RUNTIME_EQUALITY = PASS
RESIDUAL_STATUS_POLICY = PASS
ARCHIVE_INPUT_IDENTITY = PASS
EVIDENCE_COMPLETENESS = PASS
NETWORK_ISOLATION = PASS
ATTEMPT_ACCOUNTING = EXACTLY_ONE_CONSUMED
RETRY = NOT_AUTHORIZED
REPLACEMENT_ATTEMPT = NOT_AUTHORIZED
WAIVER = NO
```

This result establishes package provisioning inside the consumed container only. The attempt deliberately did not commit that container into a reusable Docker image.

```text
PROVISIONED_CONTAINER_PRESERVED = TRUE
PROVISIONED_CONTAINER_ID = 54a2dbb9955fa7bfab9054bc681b2db015b417a190c639e9f79ebfd348c6a105
PROVISIONED_CONTAINER_FINAL_STATE = exited / 0
COMMITTED_PROVISIONED_IMAGE = NOT_ESTABLISHED
REUSABLE_BUILDER_IMAGE_IDENTITY = NOT_ESTABLISHED
```

A later unit must not infer a reusable provisioned builder image merely from successful package provisioning.

## 15. Explicit downstream non-grants

Nothing in this qualification grants the next execution stage automatically.

```text
DOCKER_COMMIT = NOT_AUTHORIZED
CONTAINER_RESTART_OR_EXEC = NOT_AUTHORIZED
IMAGE_TAG_OR_PUSH = NOT_AUTHORIZED
DEPOT_TOOLS_ACQUISITION = NOT_AUTHORIZED
DEPOT_TOOLS_EXECUTION = NOT_AUTHORIZED
GCLIENT_SYNC = NOT_AUTHORIZED
GN_NINJA_CLANG_ACQUISITION_OR_EXECUTION = NOT_AUTHORIZED
PDFIUM_SOURCE_ACQUISITION = NOT_AUTHORIZED
PDFIUM_BUILD_OR_LINK_EXECUTION = NOT_AUTHORIZED
EMBEDPDF_PROVIDER_IMPLEMENTATION = NOT_AUTHORIZED
PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
```

The next dependency is a fresh Issue #7 reconciliation. In particular, it must decide how the successful provisioned-container state may be preserved or reproduced for a later deterministic builder without silently granting `docker commit`, container restart, a second package-provisioning attempt, source/toolchain acquisition, or PDFium build execution.

## 16. Candidate merge gates

This candidate may merge only if all of the following remain true:

1. canonical `main` remains `88041b208bf79692c1e04c6e46a096cd4f227ca5` with tree `7744435288c0becb368de9aadc84380b489d7694` until guarded merge;
2. exactly this one authorized qualification file changes relative to that base;
3. runtime authority `5642113945`, runtime closeout `5642221014`, and repository-document authority `5642248723` remain the exact governing records;
4. the attempt budget remains exactly one consumed / zero remaining;
5. selected image, transport, guest and Docker argv identities remain exact;
6. container start/finish, Docker/guest exits, OOM/network/mount and evidence-tar identities remain exact;
7. Stage A/B/C raw, installed and residual identities remain exact;
8. 004C1DB residual policy is applied without adding or removing allowed terminal status classes;
9. the first local classifier false-negative remains preserved and is not relabeled as a PASS;
10. corrected qualification v2 remains bound to the same immutable attempt evidence and zero runtime reexecution;
11. no downstream builder/image/source/toolchain/PDFium/provider authority is claimed;
12. `git diff --check` equivalent evidence passes;
13. fresh independent substantive exact-head review reports no unresolved material finding;
14. every material review finding is repaired forward-only and any changed head is freshly reviewed;
15. unresolved material review threads are zero;
16. immediate premerge main/base/head/open-frontier race proof passes;
17. guarded normal merge uses the exact reviewed head;
18. post-merge main/ordered-parents/tree/signature/file identity is verified;
19. post-merge workflow/check applicability is accounted truthfully;
20. fresh Issue #7 successor reconciliation occurs before any builder-image preservation, source/toolchain acquisition, PDFium build/runtime, provider implementation, 004C2, 004D or Specification 005 authority is inferred.
