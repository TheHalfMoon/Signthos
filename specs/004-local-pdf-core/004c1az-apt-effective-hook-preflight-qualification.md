# 004C1AZ — APT Effective Executable-Hook Preflight Qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_ONLY / ZERO_DOCKER_OR_APT_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `b48d7224d87149edbb6c166a9b200921f74573c8`
Canonical base tree: `ace74bddd4fdd7d3cd64578239c3c04bc6140d83`
Authority source: `github:issue-comment:5610934169`

## 1. Purpose and authority boundary

Canonical 004C1AY proves that the repaired Stage A `apt-get --simulate` control flow reaches `pkgSimulate` before `AcquireRun` only after executable APT hook surfaces are proven empty. 004C1AZ binds the exact read-only observation method needed for that proof. It performs no Docker, `apt-config`, `apt-get`, dpkg, package, or provider execution.

```text
004C1AZ_AUTHORITY = STATIC_PREFLIGHT_DESIGN_AND_BINDING_ONLY
004C1AZ_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1az-apt-effective-hook-preflight-qualification.md
004C1AZ_MAX_CHANGED_REPOSITORY_FILES = 1
APT_CONFIG_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
DOCKER_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_GET_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
DPKG_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
PACKAGE_ARCHIVE_ACQUISITION_OR_EXTRACTION = NOT_AUTHORIZED / NOT_PERFORMED
PACKAGE_ACTION = NOT_AUTHORIZED / NOT_PERFORMED
STAGE_A_RETRY = NOT_AUTHORIZED
STAGE_B_EXECUTION = NOT_AUTHORIZED
STAGE_C_EXECUTION = NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Canonical predecessor bindings

```text
CANONICAL_MAIN_AT_AZ_START = b48d7224d87149edbb6c166a9b200921f74573c8
CANONICAL_MAIN_TREE_AT_AZ_START = ace74bddd4fdd7d3cd64578239c3c04bc6140d83
OPEN_PULL_REQUESTS_AT_AZ_START = 0
004C1AY_PR = #168
004C1AY_REVIEWED_HEAD = b59c5818ff662eb48ea31f87bed4340f04283ac8
004C1AY_REVIEW = github:issue-comment:5610879443 / NO_MATERIAL_FINDINGS
004C1AY_MERGE = b48d7224d87149edbb6c166a9b200921f74573c8
REQUIRED_STAGE_A_ARGV_SHA256 = dceeccc5096bbc9eb0c661b93be5a5091f459a2ffaeed808b4bebb212ebff96b
REQUIRED_EFFECTIVE_HOOK_ENTRY_COUNT = 0
```

The repaired Stage A argv, requested roots, snapshot identities, selected image, and all package-action prohibitions are not reopened.

## 3. Exact APT 2.4.13 source semantics

```text
APT_SOURCE_REPOSITORY = https://git.launchpad.net/ubuntu/+source/apt
APT_SOURCE_VERSION = 2.4.13
APT_SOURCE_COMMIT = 581ec5c0aa2c6665d72465040f1465eb93503200
APT_SOURCE_TREE = e9afcae41f88040e93eb7a10a89e72c00b59e245
CMDLINE_APT_CONFIG_CC_SHA256 = 22fe9785ec231590698bf8bc032df21029638357a9b20590ae276be51aa96d30
PRIVATE_CMNDLINE_CC_SHA256 = ac94ee0b1462654f263a0ed6ca482d5dc1c0c999caf9a131856fa469b82d8541
CONFIGURATION_CC_SHA256 = 95c780ce50510038b2e9f1ba7bb868672eaeec363575cafd2c4c328f83cd936f
PRIVATE_INSTALL_CC_SHA256 = 70731f4b87a6211600b9573995e41e6b200010d3cd0508f73a0061c45a32fc90
FILEUTL_CC_SHA256 = bd7b4adc87b751a916af4eb67c560b4bc91371b9ea09b47d2e0f5b7557398ef6
PRIVATE_JSON_HOOKS_CC_SHA256 = 4efc03094dea513a0e837c0a55370d9fa473b34a90889db263e1fc7e0a81c4c9
```

At this exact source revision, `apt-config dump ROOT...` calls `Configuration::Dump` separately for each requested root. A missing root emits nothing. `--no-empty` is the boolean negation of `APT::Config::Dump::EmptyValue`; therefore `Configuration::Dump(..., emptyValue=false)` emits only configuration items whose values are non-empty. The dump traversal includes a root and all descendants.

This makes a zero-byte result a conservative hook-absence predicate: for the three selected roots, **any non-empty scalar at the root or below it produces output**. This is stricter than the runtime hook implementations, which execute non-empty child values, and therefore cannot silently accept an executable hook. No regex, shell evaluation, quoting interpretation, or hook-name inference is required.

## 4. Exact executable identity and bootstrap helpers

Both retained canonical 004C1AI filesystem inventories independently record the same selected-image identity. Their byte-complete rootfs inventory is already canonically bound as 7,969,350-byte JSONL with SHA-256 `f5362f12e52f0ef7d4fa42bca401be0c3cf99a2bc9962a085fd6b4eb4d6e658d`, with replay equality PASS. The exact `/usr/bin/apt-config` row extracted from each retained replay is identical:

```text
APT_CONFIG_IDENTITY_SOURCE = 004C1AI_ROOTFS_INVENTORY_JSONL
004C1AI_ROOTFS_INVENTORY_JSONL_BYTES = 7969350
004C1AI_ROOTFS_INVENTORY_SHA256 = f5362f12e52f0ef7d4fa42bca401be0c3cf99a2bc9962a085fd6b4eb4d6e658d
004C1AI_ROOTFS_INVENTORY_REPLAY_EQUALITY = PASS
APT_CONFIG_PATH = /usr/bin/apt-config
APT_CONFIG_BYTES = 27024
APT_CONFIG_MODE = 0755
APT_CONFIG_UID = 0
APT_CONFIG_GID = 0
APT_CONFIG_SHA256 = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19
```

The future preflight wrapper must revalidate that identity before invoking `apt-config`. It reuses already-bound selected-image helpers:

| Helper | SHA-256 |
| --- | --- |
| `/bin/sh` | `4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483` |
| `/usr/bin/sha256sum` | `7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3` |
| `/usr/bin/stat` | `9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3` |

004C1AZ binds these identities but does not execute them.

## 5. Exact effective-configuration query

The ordered Stage A configuration overrides are frozen unchanged:

```text
Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources
Dir::Etc::sourceparts=-
Dir::State=/tmp/signthos-apt/state/
Dir::State::lists=/tmp/signthos-apt/lists/
Dir::Cache=/tmp/signthos-apt/cache/
Dir::Cache::archives=/tmp/signthos-apt/cache/archives/
Dir::Cache::pkgcache=
Dir::Cache::srcpkgcache=
Dir::State::status=/tmp/signthos-apt/state/status
Dir::Log=/tmp/signthos-apt/log/
Debug::NoLocking=1
Acquire::Languages=none
Acquire::Retries=0
```

The queried roots are frozen in this order:

```text
APT::Install::Pre-Invoke
APT::Install::Post-Invoke-Success
AptCli::Hooks::Install
```

The exact `apt-config` argv is serialized as UTF-8 compact JSON with one trailing LF:

```text
APT_CONFIG_ARGC = 32
APT_CONFIG_ARGV_JSON_BYTES = 668
APT_CONFIG_ARGV_SHA256 = c56c77e8d564c9c9d0f89342dc96d7aedeabc527107628d24ec4aa30bbc2a372
```

```json
["/usr/bin/apt-config","--no-empty","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State=/tmp/signthos-apt/state/","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache=/tmp/signthos-apt/cache/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::Cache::pkgcache=","-o","Dir::Cache::srcpkgcache=","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","dump","APT::Install::Pre-Invoke","APT::Install::Post-Invoke-Success","AptCli::Hooks::Install"]
```

## 6. Future observation envelope

The future observation uses the exact selected immutable image and the established containment controls. It introduces no host or repository mount and no network path:

```text
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
IMAGE_CONFIG_DIGEST = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
PLATFORM = linux/amd64
PULL = never
NETWORK = none
ROOTFS = read-only
CAPABILITIES = drop-all
NO_NEW_PRIVILEGES = required
PIDS_LIMIT = 64
MEMORY = 512m
CPUS = 2
HOST_MOUNTS = 0
REPOSITORY_MOUNTS = 0
TMPFS = /tmp/signthos-apt:rw,nosuid,nodev,noexec,size=384m,mode=0755
ENTRYPOINT = /bin/sh
```

The selected-image inherited environment and explicit overrides remain:

```text
PATH=/emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
EMSDK=/emsdk
TMPDIR=/tmp/signthos-apt/tmp
LC_ALL=C
LANG=C
TZ=UTC
```

No proxy, credential, custom CA, source-routing, or other environment override is admitted.

## 7. Exact wrapper and Docker argv

The wrapper emits nothing on successful bootstrap checks and then `exec`s the exact `apt-config` argv. Therefore the container's stdout/stderr are the raw `apt-config` streams on the only success path.

```text
GUEST_SCRIPT_BYTES = 2072
GUEST_SCRIPT_SHA256 = 0fe753051f965b1db053380fade3762ca2d3f4b9b5a28575106996624002eb55
DOCKER_ARGC = 34
DOCKER_ARGV_JSON_BYTES = 2642
DOCKER_ARGV_SHA256 = 08ea086eafe27b7f3c73f310315eccd75fcec2cbddfbbb1a26bc90817ef1bd19
```

### Exact guest script

```sh
umask 022
[ "$PATH" = /emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin ] || { printf "ENV_PATH_MISMATCH\n" >&2; exit 10; }
[ "$EMSDK" = /emsdk ] || { printf "ENV_EMSDK_MISMATCH\n" >&2; exit 11; }
[ "$TMPDIR" = /tmp/signthos-apt/tmp ] || { printf "ENV_TMPDIR_MISMATCH\n" >&2; exit 12; }
[ "$LC_ALL" = C ] || { printf "ENV_LC_ALL_MISMATCH\n" >&2; exit 13; }
[ "$LANG" = C ] || { printf "ENV_LANG_MISMATCH\n" >&2; exit 14; }
[ "$TZ" = UTC ] || { printf "ENV_TZ_MISMATCH\n" >&2; exit 15; }
h=$(/usr/bin/sha256sum /bin/sh); h=${h%% *}; [ "$h" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || { printf "HELPER_MISMATCH\t/bin/sh\n" >&2; exit 20; }
h=$(/usr/bin/sha256sum /usr/bin/sha256sum); h=${h%% *}; [ "$h" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || { printf "HELPER_MISMATCH\t/usr/bin/sha256sum\n" >&2; exit 21; }
h=$(/usr/bin/sha256sum /usr/bin/stat); h=${h%% *}; [ "$h" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || { printf "HELPER_MISMATCH\t/usr/bin/stat\n" >&2; exit 22; }
h=$(/usr/bin/sha256sum /usr/bin/apt-config); h=${h%% *}; [ "$h" = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19 ] || { printf "APT_CONFIG_HASH_MISMATCH\n" >&2; exit 23; }
m=$(/usr/bin/stat -c "%s %a %u %g" /usr/bin/apt-config); [ "$m" = "27024 755 0 0" ] || { printf "APT_CONFIG_METADATA_MISMATCH\n" >&2; exit 24; }
exec /usr/bin/apt-config --no-empty -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 dump APT::Install::Pre-Invoke APT::Install::Post-Invoke-Success AptCli::Hooks::Install
```

### Exact Docker argv

```json
["docker","run","--rm","--pull=never","--platform","linux/amd64","--network","none","--read-only","--cap-drop","ALL","--security-opt","no-new-privileges","--pids-limit","64","--memory","512m","--cpus","2","--tmpfs","/tmp/signthos-apt:rw,nosuid,nodev,noexec,size=384m,mode=0755","-e","TMPDIR=/tmp/signthos-apt/tmp","-e","LC_ALL=C","-e","LANG=C","-e","TZ=UTC","--entrypoint","/bin/sh","docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3","-ceu","umask 022\n[ \"$PATH\" = /emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin ] || { printf \"ENV_PATH_MISMATCH\\n\" >&2; exit 10; }\n[ \"$EMSDK\" = /emsdk ] || { printf \"ENV_EMSDK_MISMATCH\\n\" >&2; exit 11; }\n[ \"$TMPDIR\" = /tmp/signthos-apt/tmp ] || { printf \"ENV_TMPDIR_MISMATCH\\n\" >&2; exit 12; }\n[ \"$LC_ALL\" = C ] || { printf \"ENV_LC_ALL_MISMATCH\\n\" >&2; exit 13; }\n[ \"$LANG\" = C ] || { printf \"ENV_LANG_MISMATCH\\n\" >&2; exit 14; }\n[ \"$TZ\" = UTC ] || { printf \"ENV_TZ_MISMATCH\\n\" >&2; exit 15; }\nh=$(/usr/bin/sha256sum /bin/sh); h=${h%% *}; [ \"$h\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || { printf \"HELPER_MISMATCH\\t/bin/sh\\n\" >&2; exit 20; }\nh=$(/usr/bin/sha256sum /usr/bin/sha256sum); h=${h%% *}; [ \"$h\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || { printf \"HELPER_MISMATCH\\t/usr/bin/sha256sum\\n\" >&2; exit 21; }\nh=$(/usr/bin/sha256sum /usr/bin/stat); h=${h%% *}; [ \"$h\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || { printf \"HELPER_MISMATCH\\t/usr/bin/stat\\n\" >&2; exit 22; }\nh=$(/usr/bin/sha256sum /usr/bin/apt-config); h=${h%% *}; [ \"$h\" = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19 ] || { printf \"APT_CONFIG_HASH_MISMATCH\\n\" >&2; exit 23; }\nm=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-config); [ \"$m\" = \"27024 755 0 0\" ] || { printf \"APT_CONFIG_METADATA_MISMATCH\\n\" >&2; exit 24; }\nexec /usr/bin/apt-config --no-empty -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 dump APT::Install::Pre-Invoke APT::Install::Post-Invoke-Success AptCli::Hooks::Install\n"]
```

## 8. Output serialization and fail-closed decision

The future execution must consist of exactly two independent identical replays, A then B. Each replay records host-observed Docker exit status and exact raw stdout/stderr bytes. No trimming, line normalization, decoding repair, grep/filter, or shell evaluation is allowed before qualification.

A replay qualifies **only** if all conditions are true:

```text
DOCKER_EXIT = 0
STDOUT_BYTES = 0
STDOUT_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
STDERR_BYTES = 0
STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The pair qualifies only if both replays individually qualify and their raw stdout, stderr, exit status, selected-image digest, wrapper identity, and `apt-config` argv identity are equal.

The fail-closed parser is intentionally content-free:

```text
ACCEPT_REPLAY := docker_exit == 0
                 AND stdout_bytes == 0
                 AND stdout_sha256 == SHA256_EMPTY
                 AND stderr_bytes == 0
                 AND stderr_sha256 == SHA256_EMPTY
ACCEPT_PAIR := ACCEPT_REPLAY_A
               AND ACCEPT_REPLAY_B
               AND RAW_REPLAY_EQUALITY
EFFECTIVE_HOOK_ENTRY_COUNT := 0 ONLY_IF ACCEPT_PAIR
```

Any positive stdout byte count means at least one non-empty configuration item exists in one of the exact queried subtrees and is a material rejection. Any nonzero exit or stderr byte is also a rejection; it must not be reinterpreted as hook absence.

## 9. Separation from Stage A and mandatory same-container recheck

004C1AZ does not authorize the observation or Stage A. A future hook-preflight execution successor must run only the frozen `apt-config` observation pair. A qualifying pair establishes that this observation method is deterministic and that the exact selected image/configuration currently yields no non-empty executable-hook entry. It is **not** a substitute for the canonical 004C1AY requirement to revalidate hook absence immediately before `apt-get`.

Any later Stage A execution harness must therefore perform the same exact 32-token `apt-config` hook query again **inside the same Stage A container**, after the exact image/environment/input-root/configuration preconditions have been verified and immediately before the repaired Stage A `apt-get` invocation. It must fail before `apt-get` unless that in-container query returns exit `0` with exactly zero stdout bytes and zero stderr bytes. No environment, APT configuration, source/list/status input, image state, or other execution-control input may change between the successful hook query and `apt-get`.

The future combined Stage A harness, including how it captures and gates this immediate query without contaminating canonical input inventories, is not frozen by 004C1AZ. It requires its own exact command/script identity and fresh Issue #7 execution authority after the standalone preflight pair qualifies.

```text
APT_CONFIG_REPLAY_PAIR = FUTURE_SEPARATELY_AUTHORIZED_EXECUTION_ONLY
STANDALONE_PREFLIGHT_PAIR_SUFFICIENT_FOR_STAGE_A = FALSE
SAME_CONTAINER_IMMEDIATE_HOOK_RECHECK_BEFORE_APT_GET = REQUIRED
INTERVENING_CONFIG_ENV_INPUT_MUTATION = PROHIBITED
FAILED_OR_NONEMPTY_IMMEDIATE_RECHECK = FAIL_BEFORE_APT_GET
STAGE_A_ARGV_SHA256 = dceeccc5096bbc9eb0c661b93be5a5091f459a2ffaeed808b4bebb212ebff96b
STAGE_A_COMBINED_HARNESS_FREEZE = FUTURE_SEPARATE_AUTHORITY_REQUIRED
STAGE_A_RETRY_AFTER_PREFLIGHT = REQUIRES_FRESH_ISSUE_7_AUTHORITY
```

This preserves two distinct gates: first, qualify the observation method with an auditable replay pair; second, enforce the same predicate immediately before the eventual solver invocation in the same container. A preflight failure can never be followed by solver execution.

## 10. Fail-closed invariants

```text
APT_CONFIG_IDENTITY_MISMATCH = REJECT
IMAGE_OR_PLATFORM_MISMATCH = REJECT
ENVIRONMENT_MISMATCH = REJECT
STAGE_A_OVERRIDE_ORDER_OR_VALUE_CHANGE = REJECT
HOOK_ROOT_SET_OR_ORDER_CHANGE = REJECT
NO_EMPTY_OPTION_REMOVAL = REJECT
NONZERO_DOCKER_EXIT = REJECT
NONEMPTY_STDOUT = REJECT
NONEMPTY_STDERR = REJECT
REPLAY_DIVERGENCE = REJECT
HOST_OR_REPOSITORY_MOUNT = REJECT
NETWORK_NOT_NONE = REJECT
IMAGE_DEFAULT_ENTRYPOINT_EXECUTION = REJECT
APT_GET_EXECUTION = REJECT
DPKG_EXECUTION = REJECT
PACKAGE_ACTION = REJECT
OLD_004C1AQ_DUMP_USED_AS_CURRENT_HOOK_ABSENCE_PROOF = REJECT
```

## 11. Deterministic AZ contract

Serialization is UTF-8 compact JSON with `sort_keys=true`, separators `(',', ':')`, `ensure_ascii=false`, and exactly one trailing LF.

```text
004C1AZ_CONTRACT_JSON_BYTES = 2571
004C1AZ_CONTRACT_JSON_SHA256 = 52ec3f0520630100c73cf89aedcd757e1e320200b9c44318a2b16aab687fa82d
```

```json
{"aptConfigArgv":["/usr/bin/apt-config","--no-empty","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State=/tmp/signthos-apt/state/","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache=/tmp/signthos-apt/cache/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::Cache::pkgcache=","-o","Dir::Cache::srcpkgcache=","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","dump","APT::Install::Pre-Invoke","APT::Install::Post-Invoke-Success","AptCli::Hooks::Install"],"aptConfigArgvSha256":"c56c77e8d564c9c9d0f89342dc96d7aedeabc527107628d24ec4aa30bbc2a372","aptConfigExecutable":{"bytes":27024,"gid":0,"mode":"0755","path":"/usr/bin/apt-config","sha256":"ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19","uid":0},"aptSource":{"commit":"581ec5c0aa2c6665d72465040f1465eb93503200","tree":"e9afcae41f88040e93eb7a10a89e72c00b59e245","version":"2.4.13"},"canonicalBase":"b48d7224d87149edbb6c166a9b200921f74573c8","dockerArgvSha256":"08ea086eafe27b7f3c73f310315eccd75fcec2cbddfbbb1a26bc90817ef1bd19","guestScriptSha256":"0fe753051f965b1db053380fade3762ca2d3f4b9b5a28575106996624002eb55","hookRootsOrdered":["APT::Install::Pre-Invoke","APT::Install::Post-Invoke-Success","AptCli::Hooks::Install"],"schema":"signthos.004c1az.apt-effective-hook-preflight.v1","selectedImage":{"configDigest":"sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0","platform":"linux/amd64","ref":"docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3"},"stageAArgvSha256":"dceeccc5096bbc9eb0c661b93be5a5091f459a2ffaeed808b4bebb212ebff96b","stageAOverridesOrdered":["Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","Dir::Etc::sourceparts=-","Dir::State=/tmp/signthos-apt/state/","Dir::State::lists=/tmp/signthos-apt/lists/","Dir::Cache=/tmp/signthos-apt/cache/","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","Dir::Cache::pkgcache=","Dir::Cache::srcpkgcache=","Dir::State::status=/tmp/signthos-apt/state/status","Dir::Log=/tmp/signthos-apt/log/","Debug::NoLocking=1","Acquire::Languages=none","Acquire::Retries=0"],"success":{"dockerExit":0,"rawReplayEquality":true,"replayCount":2,"stderrBytes":0,"stderrSha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","stdoutBytes":0,"stdoutSha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"}}
```

## 12. Qualification result and successor boundary

```text
APT_CONFIG_EXECUTABLE_IDENTITY_BOUND = PASS_STATIC
EXACT_STAGE_A_CONFIGURATION_OVERRIDES_BOUND = PASS_STATIC
EXACT_HOOK_ROOTS_BOUND = PASS_STATIC
NO_EMPTY_SOURCE_SEMANTICS = PASS_STATIC
ZERO_BYTE_ABSENCE_PREDICATE = PASS_STATIC_CONSERVATIVE
CONTAINER_ENVELOPE_BOUND = PASS_STATIC
WRAPPER_IDENTITY_BOUND = PASS_STATIC
OUTPUT_SERIALIZATION_BOUND = PASS_STATIC
FAIL_CLOSED_PARSER_BOUND = PASS_STATIC
REPLAY_PAIR_CONTRACT_BOUND = PASS_STATIC
004C1AZ_RESULT = PASS_STATIC_ONLY
RUNTIME_OBSERVATION = 0
APT_CONFIG_EXECUTION = 0
APT_GET_EXECUTION = 0
PACKAGE_ACTION = 0
```

004C1AZ can become canonical only after exact-head independent substantive review, zero unresolved material findings, guarded merge, and post-merge verification. Only fresh Issue #7 reconciliation may authorize the frozen `apt-config` replay pair. Stage A remains unauthorized until that later pair actually qualifies and is separately reconciled.
