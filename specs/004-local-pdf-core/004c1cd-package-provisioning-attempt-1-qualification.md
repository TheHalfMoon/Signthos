# 004C1CD — Package Provisioning Attempt 1 Qualification

Status: `QUALIFICATION_CANDIDATE / CONSUMED_ATTEMPT_FAILED_FAIL_CLOSED / NO_RETRY_AUTHORITY`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `1c19703670d693fff2d2ade9429492ac9993ae30`
Canonical base tree: `442830278cd6c13cb4378b2e7df85c53c68ad316`
Primary authority source: `github:issue-comment:5639435376`
Mandatory prelaunch record: `github:issue-comment:5639596275`
Initial fail-closed checkpoint: `github:issue-comment:5639802135`
Readability recovery authority: `github:issue-comment:5640063578`
Readability recovery result / diagnostic authority: `github:issue-comment:5640114506`
Attempt-consumption and failure reconciliation: `github:issue-comment:5640162290`

## 1. Purpose and authority boundary

004C1CD was authorized for exactly one fail-closed offline package-provisioning attempt after canonical 004C1CB and 004C1CC. The attempt budget was one. The consumption point was the first qualifying container start. Retry and replacement were explicitly outside the authority.

This document records the actual consumed attempt and its actual failure. It does not convert an environmental failure into provisioning success, does not authorize a retry, and does not infer downstream build or runtime authority.

```text
004C1CD_AUTHORITY = EXACTLY_ONE_FAIL_CLOSED_OFFLINE_PACKAGE_PROVISIONING_ATTEMPT
004C1CD_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1cd-package-provisioning-attempt-1-qualification.md
004C1CD_MAX_CHANGED_REPOSITORY_FILES = 1
ATTEMPT_BUDGET = 1
ATTEMPT_CONSUMPTION_POINT = FIRST_QUALIFYING_CONTAINER_START
RETRY_WITHIN_004C1CD = NOT_AUTHORIZED
REPLACEMENT_WITHIN_004C1CD = NOT_AUTHORIZED
DOCKER_COMMIT_OR_PUSH = NOT_AUTHORIZED
TOOLCHAIN_OR_PDFIUM_EXECUTION = NOT_AUTHORIZED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No Docker, APT, dpkg, package, toolchain, PDFium, provider, or PDF runtime execution is performed by this repository-document qualification.

## 2. Frozen prelaunch identity

The mandatory prelaunch record froze the exact retained transport, selected image, Docker argv, guest script, external evidence root, and container name before the execution attempt.

```text
CANONICAL_MAIN_AT_PRELAUNCH = 1c19703670d693fff2d2ade9429492ac9993ae30
CANONICAL_MAIN_TREE_AT_PRELAUNCH = 442830278cd6c13cb4378b2e7df85c53c68ad316
OPEN_PULL_REQUESTS_AT_PRELAUNCH = 0
RETAINED_TRANSPORT_TAR = /private/tmp/signthos-004c1cc-transport-A/offline-input.tar
RETAINED_TRANSPORT_TAR_BYTES = 522393600
RETAINED_TRANSPORT_TAR_SHA256 = b56949fa868d2738a3f511a13ccef66c67b8bfa0797ee09e26f5907c50da49ed
RETAINED_TRANSPORT_MEMBER_COUNT = 850
RETAINED_TRANSPORT_FILE_COUNT = 842
RETAINED_TRANSPORT_DIRECTORY_COUNT = 8
RETAINED_TRANSPORT_DEB_COUNT = 826
RETAINED_TRANSPORT_PAYLOAD_BYTES = 521742319
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_IMAGE_CONFIG = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
TARGET_PLATFORM = linux/amd64
DOCKER_ARGV_ARGC = 27
DOCKER_ARGV_JSON_LF_BYTES = 13082
DOCKER_ARGV_JSON_LF_SHA256 = a88ae751d967ac31d99bf911f5bbde35a26758e0c37383d4545078563a93392f
GUEST_SCRIPT_BYTES = 12378
GUEST_SCRIPT_SHA256 = 123bb4cf2c4f5abdd012cd32a07d3920fba1fe233344cfa1c186af877503582a
FROZEN_CONTAINER_NAME = signthos-004c1cd-attempt1-20260911t192230z
FROZEN_EVIDENCE_ROOT = /tmp/signthos-004c1cc-package-provisioning-20260911T192230Z-29808
ATTEMPTS_USED_AT_PRELAUNCH = 0
ATTEMPTS_REMAINING_AT_PRELAUNCH = 1
```

The frozen Docker argv did not contain `--rm`. The frozen guest script contained no host-side container removal action. This matters only to later forensic accounting; it does not authorize any recovery mutation.

## 3. Exact attempt consumption

The previously unresolved attempt accounting is resolved by retained Docker Desktop host and VM logs.

Docker VM API logs record the exact frozen name in the create request:

```text
2026-09-11T19:28:12.393552047Z
POST /v1.54/containers/create?name=signthos-004c1cd-attempt1-20260911t192230z&platform=linux%2Famd64
```

Docker Desktop then binds that name to the observed container ID:

```text
OBSERVED_CONTAINER_ID = 4732fe001f4e7c3f1f813d74c257cf906713d713664f507ce15be0b216a3938e
REGISTERED_NAME = /signthos-004c1cd-attempt1-20260911t192230z
REGISTERED_VOLUMES = []
```

The same exact container then crossed the authority-defined consumption point:

```text
CONTAINER_START_REQUEST_UTC = 2026-09-11T19:28:12.512780797Z
CONTAINER_START_RESPONSE_UTC = 2026-09-11T19:28:12.609610798Z
CONTAINER_START_API = POST /v1.54/containers/4732fe001f4e7c3f1f813d74c257cf906713d713664f507ce15be0b216a3938e/start
ATTEMPT_CONSUMPTION_POINT_SATISFIED = TRUE
ATTEMPT_1_CONSUMED = TRUE
ATTEMPTS_USED = 1
ATTEMPTS_REMAINING = 0
```

Repeated attach, wait, inspect, and stats activity for the same container ID after the start response independently confirms that the container was running rather than merely created.

## 4. Failure chronology

The attempt failed because the Docker Desktop VM lost writable storage while package provisioning was in progress.

The contemporaneous VM log records write failures beginning at approximately `2026-09-11T19:30:10Z`:

```text
I/O error, dev vda, ... op 0x1:(WRITE)
EXT4-fs ... I/O error ...
Buffer I/O error on device vda1 ...
```

The failure progressed to journal loss while APT was active:

```text
2026-09-11T19:30:12.905511548Z
EXT4-fs error (device vda1): ext4_journal_check_start:86: comm apt-get: Detected aborted journal
```

The exact attempt container then failed to write its Stage B and terminal evidence records:

```text
2026-09-11T19:30:13.622895631Z
/bin/sh: 32: cannot create /tmp/signthos-004c1cd-evidence/STAGE_B.exit.txt: Read-only file system

2026-09-11T19:30:13.623201840Z
/bin/sh: 4: cannot create /tmp/signthos-004c1cd-evidence/guest-exit.txt: Read-only file system
```

Docker Desktop's host backend records the corresponding host-side storage cause:

```text
2026-09-11T19:30:13.631536000Z
engine linux/virtualization-framework shutdown requested
cancel cause: write <HOME>/Library/Containers/com.docker.docker/Data/log/vm/init.log: no space left on device
```

Its retained error API subsequently reported:

```text
TITLE = Docker Desktop - Disk full
MESSAGE = Docker Desktop cannot continue because the disk is full. Free up space and then start Docker Desktop again.
```

The current post-failure host free-space measurement is not treated as the free-space state at failure time. The causal classification is instead bound to the contemporaneous `no space left on device`, VM block-I/O, ext4 journal-abort, and read-only-filesystem records above.

## 5. Evidence preservation

The original launch-side evidence root was preserved after the Docker daemon became unavailable.

```text
ORIGINAL_ATTEMPT_EVIDENCE_ROOT = /tmp/signthos-004c1cc-package-provisioning-20260911T192230Z-29808
containers-before.txt = 1979 / ffe3631238b0d152a6150f896f0b9334afb734bb8b9fe94825fdb2c4ee1c765e
docker.stdout = 0 / e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
docker.stderr = 0 / e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The missing Docker exit/result/inspect/diff artifacts are retained as missing evidence. They are not synthesized from later logs.

One separately authorized Docker Desktop readability restart was attempted and did not restore daemon readability. That recovery budget was fully consumed and did not authorize a provisioning retry.

```text
READABILITY_RECOVERY_AUTHORITY = github:issue-comment:5640063578
READABILITY_RECOVERY_RESULT = github:issue-comment:5640114506
DOCKER_DESKTOP_RESTARTS_CONSUMED = 1/1
DAEMON_READABILITY_AFTER_RECOVERY = NOT_RESTORED
PROVISIONING_COMMANDS_DURING_RECOVERY = 0
```

Read-only diagnosis then preserved the exact name/ID/start/failure chain under:

```text
DIAGNOSIS_ROOT = /tmp/signthos-004c1cd-startup-diagnosis-20260911T201818Z-69892
authority.txt = 32 / 0ee2e6ca0b2db4c9a01a2666cdf34e34189a067d3900a14cbeddebcf32c0c8e
frozen-container-name.txt = 43 / 605656d9ebc1c09f05cc387e648edbb046e830741bb374fa2ea6a64a6d88f48c
observed-container-id.txt = 65 / 4f109ba437b2dbb531e296871f2a3c698947bf9bfdf54275573f04258241104d
name-matches.txt = 5624 / 89e0b26a6e12d5f032733ab68da4f027268309e007f07908061031e3eb1a1ffa
container-id-matches.txt = 66503 / 80af6e6dda2d633872e9dc0a93f1450dbab08dee3002c2ab8e877577937295dc
storage-failure-matches.txt = 12306 / ccb6caa87aa1ebbbd07c0d573c3f7af5a8cf03021fd24ceebe8092787f0d647e
storage-state.txt = 286 / 9fcc78d5b20aae8e0c736083586286fa7aa6d3e3382e56a51e9476feee36eab3
start-event.txt = 1382 / 48fbcd5c3644d3f2ebbc779a089f309560671c6cd3f13e6459790eae58684e34
attempt-failure-window.txt = 5109 / 264e0e35cd8d4e233e9c02f5d8c7780a9660a6e5950bf8855bb1c4a1e52ec47b
```

No Docker Desktop reset, prune, reinstall, Docker-data deletion, container deletion, image deletion, or repository-history rewrite was performed during this reconciliation.

## 6. Qualification result

The consumed attempt is a failed fail-closed provisioning attempt. It is not a partial success and it does not establish the final provisioned builder state.

```text
004C1CD_RESULT = FAILED_FAIL_CLOSED_PACKAGE_PROVISIONING_ATTEMPT_1
ATTEMPT_1_CONSUMED = TRUE
ATTEMPTS_USED = 1
ATTEMPTS_REMAINING = 0
FAILURE_CLASS = HOST_DOCKER_VM_STORAGE_WRITE_FAILURE
FAILURE_CAUSE = HOST_DISK_EXHAUSTION_CAUSING_VDA_IO_ERRORS_AND_READ_ONLY_FILESYSTEM
STAGE_A_RUNTIME_QUALIFICATION = NOT_ESTABLISHED_BY_COMPLETE_HOST_EVIDENCE
STAGE_B_RUNTIME_COMPLETION = NOT_ESTABLISHED
STAGE_C_RUNTIME_EXECUTION = NOT_ESTABLISHED
FINAL_VIRTUAL_STATE_905_RUNTIME_EQUALITY = NOT_ESTABLISHED
PACKAGE_PROVISIONING_SUCCESS = FALSE
FINAL_PROVISIONED_IMAGE_IDENTITY = NOT_ESTABLISHED
RETRY = NOT_AUTHORIZED
REPLACEMENT_ATTEMPT = NOT_AUTHORIZED
```

The log message referencing `STAGE_B.exit.txt` establishes that the guest reached the Stage B evidence-recording path when storage became read-only. It does not establish a successful Stage B transaction or its canonical post-state, because the expected Stage B exit/evidence artifact could not be written and the host launch artifacts never completed.

## 7. Downstream non-grants

Nothing in this qualification authorizes remediation or another execution attempt.

```text
HOST_CAPACITY_REMEDIATION = NOT_AUTHORIZED_BY_004C1CD
DOCKER_DESKTOP_RESTART_RESET_PRUNE_REINSTALL = NOT_AUTHORIZED_BY_004C1CD
DOCKER_DATA_MUTATION = NOT_AUTHORIZED_BY_004C1CD
CONTAINER_START_RESTART_EXEC_REMOVE = NOT_AUTHORIZED_BY_004C1CD
IMAGE_PULL_LOAD_BUILD_COMMIT_PUSH = NOT_AUTHORIZED_BY_004C1CD
PACKAGE_PROVISIONING_RETRY = NOT_AUTHORIZED
PACKAGE_PROVISIONING_REPLACEMENT_ATTEMPT = NOT_AUTHORIZED
DEPOT_TOOLS_GCLIENT_GN_NINJA_CLANG_ACQUISITION_OR_EXECUTION = NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
```

## 8. Merge gates and successor rule

This candidate may merge only if all of the following remain true:

1. canonical `main` remains `1c19703670d693fff2d2ade9429492ac9993ae30` with tree `442830278cd6c13cb4378b2e7df85c53c68ad316` until guarded merge;
2. exactly this one authorized qualification file changes relative to that base;
3. the consumed start event, frozen name-to-container-ID binding, storage-failure chronology, and external evidence identities remain byte-exact;
4. the document does not claim successful Stage A, Stage B, Stage C, final 905-package runtime equality, or final image identity without missing evidence;
5. retry and replacement remain unauthorized;
6. fresh independent substantive exact-head review reports no material finding;
7. any repair is forward-only and triggers a fresh exact-head review;
8. immediate premerge base/head/open-frontier race proof passes;
9. guarded normal merge uses exactly the reviewed head;
10. post-merge parent/tree/signature/path/byte verification passes;
11. fresh Issue #7 successor reconciliation occurs before any host remediation or replacement provisioning attempt is inferred.

The next dependency is not a retry of this attempt. After canonical closeout, Issue #7 must separately decide a host-capacity/storage-recovery unit that preserves Docker forensic state, followed by any separately authorized replacement provisioning attempt only if the repaired substrate requalifies.