# 004C1BA — APT Effective Hook Preflight Execution Qualification

Status: `QUALIFICATION_CANDIDATE / TWO_REPLAY_EXECUTION_COMPLETE / PASS`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `9e2026ea555b4c8b53f31f40ee97b9a580562312`
Canonical base tree: `556ed84bf88ea24c9859eebd9771ca0bdbaffef8`
Authority source: `github:issue-comment:5611067824`

## 1. Scope

004C1BA executes only the exact standalone effective-hook observation method frozen by canonical 004C1AZ. It does not execute `apt-get`, dpkg, a package action, or Stage A. The canonical same-container immediate-before-`apt-get` hook recheck remains a later combined-harness requirement.

```text
004C1BA_AUTHORITY = EXACT_FROZEN_STANDALONE_HOOK_PREFLIGHT_TWO_REPLAY_EXECUTION_ONLY
004C1AZ_DOCKER_ARGV_SHA256 = 08ea086eafe27b7f3c73f310315eccd75fcec2cbddfbbb1a26bc90817ef1bd19
004C1AZ_APT_CONFIG_ARGV_SHA256 = c56c77e8d564c9c9d0f89342dc96d7aedeabc527107628d24ec4aa30bbc2a372
004C1AZ_GUEST_SCRIPT_SHA256 = 0fe753051f965b1db053380fade3762ca2d3f4b9b5a28575106996624002eb55
APT_GET_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_ACTION = 0
STAGE_A_RETRY = 0
STAGE_B_EXECUTION = 0
STAGE_C_EXECUTION = 0
PDFIUM_OR_PROVIDER_EXECUTION = 0
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Pre-execution live truth

```text
CANONICAL_MAIN = 9e2026ea555b4c8b53f31f40ee97b9a580562312
CANONICAL_MAIN_TREE = 556ed84bf88ea24c9859eebd9771ca0bdbaffef8
OPEN_PULL_REQUESTS = 0
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
LOCAL_IMAGE_ID = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
IMAGE_CONFIG_DIGEST = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
PLATFORM = linux/amd64
CONTAINER_COUNT_BEFORE = 14
RUNNING_CONTAINER_COUNT_BEFORE = 0
```

The selected image was already local. No pull, load, build, retag, or substitution occurred.

## 3. Frozen observation method

The exact 32-token `apt-config` argv, 2,072-byte guest wrapper, and 34-token Docker argv are inherited byte-for-byte from canonical 004C1AZ. The Docker envelope is `--pull=never`, `--platform linux/amd64`, `--network none`, read-only rootfs, all capabilities dropped, `no-new-privileges`, bounded pids/memory/cpu, isolated tmpfs, explicit `/bin/sh` entrypoint, and no mounts.

The wrapper revalidates environment, helper identities, and exact `/usr/bin/apt-config` identity before executing:

```text
APT_CONFIG_PATH = /usr/bin/apt-config
APT_CONFIG_BYTES = 27024
APT_CONFIG_MODE = 0755
APT_CONFIG_UID = 0
APT_CONFIG_GID = 0
APT_CONFIG_SHA256 = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19
```

The queried executable-hook subtrees are exactly:

```text
APT::Install::Pre-Invoke
APT::Install::Post-Invoke-Success
AptCli::Hooks::Install
```

Canonical 004C1AZ proves from exact APT 2.4.13 source that exit `0` plus zero raw stdout bytes and zero raw stderr bytes conservatively implies no non-empty executable-hook value exists at or below any queried subtree.

## 4. Replay A

```text
REPLAY = A
START_UTC = 2026-09-10T01:01:35.107808Z
END_UTC = 2026-09-10T01:01:36.003918Z
DOCKER_EXIT = 0
STDOUT_BYTES = 0
STDOUT_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
STDERR_BYTES = 0
STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
DOCKER_ARGV_SHA256 = 08ea086eafe27b7f3c73f310315eccd75fcec2cbddfbbb1a26bc90817ef1bd19
REPLAY_A_QUALIFIES = TRUE
```

## 5. Replay B

Replay B was executed only after Replay A met every qualification predicate.

```text
REPLAY = B
START_UTC = 2026-09-10T01:01:36.005120Z
END_UTC = 2026-09-10T01:01:37.115166Z
DOCKER_EXIT = 0
STDOUT_BYTES = 0
STDOUT_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
STDERR_BYTES = 0
STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
DOCKER_ARGV_SHA256 = 08ea086eafe27b7f3c73f310315eccd75fcec2cbddfbbb1a26bc90817ef1bd19
REPLAY_B_QUALIFIES = TRUE
```

## 6. Determinism and accounting

The canonical pair record uses UTF-8 compact JSON, lexicographically sorted object keys, no insignificant whitespace, and exactly one trailing LF.

```text
PAIR_SCHEMA = signthos.004c1ba.hook-preflight-execution.v1
PAIR_JSON_BYTES = 968
PAIR_JSON_SHA256 = b1f08e6015a5154a694c62f4e9a24165729696109c6c9222e83ea45051fb2829
A_B_RESULT_EQUAL = TRUE
CONTAINER_COUNT_AFTER = 14
RUNNING_CONTAINER_COUNT_AFTER = 0
DOCKER_CONTAINER_NET_COUNT_CHANGE = 0
```

The equality comparison binds Docker exit, stdout bytes/SHA-256, stderr bytes/SHA-256, and frozen Docker argv SHA-256. Both replays are byte-identical on all comparison fields.

### Exact canonical pair JSON payload

The digest above is independently reconstructible from the exact one-line JSON payload below. Take only the UTF-8 bytes between the `json` fences, exclude both fences and their line endings, and append exactly one LF byte. Do not pretty-print, reorder, normalize timestamps, rename fields, or add whitespace. The resulting payload must be exactly `968` bytes and SHA-256 `b1f08e6015a5154a694c62f4e9a24165729696109c6c9222e83ea45051fb2829`.

```json
{"comparisonFields":["exit","stdoutBytes","stdoutSha256","stderrBytes","stderrSha256","dockerArgvSha256"],"equal":true,"replayA":{"dockerArgvSha256":"08ea086eafe27b7f3c73f310315eccd75fcec2cbddfbbb1a26bc90817ef1bd19","endUtc":"2026-09-10T01:01:36.003918Z","exit":0,"replay":"A","startUtc":"2026-09-10T01:01:35.107808Z","stderrBytes":0,"stderrSha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","stdoutBytes":0,"stdoutSha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"},"replayB":{"dockerArgvSha256":"08ea086eafe27b7f3c73f310315eccd75fcec2cbddfbbb1a26bc90817ef1bd19","endUtc":"2026-09-10T01:01:37.115166Z","exit":0,"replay":"B","startUtc":"2026-09-10T01:01:36.005120Z","stderrBytes":0,"stderrSha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","stdoutBytes":0,"stdoutSha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"},"schema":"signthos.004c1ba.hook-preflight-execution.v1"}
```

```text
DOCKER_PULL = 0
DOCKER_IMAGE_LOAD = 0
DOCKER_IMAGE_BUILD = 0
HOST_OR_REPOSITORY_MOUNT = 0
LIVE_NETWORK = 0 / NETWORK_NONE
APT_CONFIG_EXECUTIONS = 2
APT_GET_EXECUTIONS = 0
DPKG_EXECUTIONS = 0
PACKAGE_DOWNLOAD = 0
PACKAGE_INSTALL = 0
PACKAGE_UNPACK = 0
PACKAGE_CONFIGURE = 0
STAGE_A_SOLVER_EXECUTION = 0
```

## 7. Qualification result

```text
EXACT_SELECTED_IMAGE_LOCALITY = PASS
FROZEN_DOCKER_ARGV_IDENTITY = PASS
REPLAY_A_ZERO_BYTE_PREDICATE = PASS
REPLAY_B_ZERO_BYTE_PREDICATE = PASS
TWO_REPLAY_DETERMINISM = PASS
CURRENT_SELECTED_IMAGE_EFFECTIVE_EXECUTABLE_HOOK_ENTRY_COUNT = 0 / QUALIFIED_BY_004C1AZ_PREDICATE
004C1BA_RESULT = PASS_STANDALONE_EFFECTIVE_HOOK_PREFLIGHT_EXECUTION
```

This result qualifies the standalone observation method against the current exact selected image and configuration. It does **not** satisfy the canonical immediacy requirement for Stage A.

## 8. Successor boundary

Any future Stage A harness must run the same exact 32-token `apt-config` query inside the same Stage A container, after all image/environment/input/configuration preconditions and immediately before the repaired Stage A `apt-get`. No execution-control input may change between the successful query and `apt-get`.

```text
SAME_CONTAINER_IMMEDIATE_HOOK_RECHECK = REQUIRED
COMBINED_STAGE_A_HARNESS = REQUIRES_SEPARATE_STATIC_FREEZE_AND_AUTHORITY
STAGE_A_RETRY = NOT_AUTHORIZED_BY_004C1BA
STAGE_B_EXECUTION = NOT_AUTHORIZED
STAGE_C_EXECUTION = NOT_AUTHORIZED
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
