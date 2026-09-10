# 004C1AY — APT Simulation Control and Observer Repair Qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_ONLY / ZERO_APT_OR_DOCKER_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `4f7dd01e68fa32c573032985a6d78c7c52810231`
Canonical base tree: `58801099023ce56d56fb53a59a503f93d7b592b6`
Authority source: `github:issue-comment:5610718016`

## 1. Purpose and boundary

004C1AX reached exact APT 2.4.13 under the selected immutable image and Stage A inputs, but its second ordering-repaired Replay A exited `100` before transaction emission. This grain repairs only the static execution contract that prevented the simulator from being reached and the process-observer race exposed by the same attempt.

```text
004C1AY_AUTHORITY = STATIC_PLANNING_AND_SOURCE_SEMANTIC_RECONCILIATION_ONLY
APT_EXECUTION = 0
DOCKER_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_ARCHIVE_ACQUISITION_OR_EXTRACTION = 0
PACKAGE_ACTION = 0
STAGE_A_RETRY = NOT_AUTHORIZED
STAGE_B_EXECUTION = NOT_AUTHORIZED
STAGE_C_EXECUTION = NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Preserved 004C1AX evidence

The following attempts remain permanently nonqualifying and are not rewritten by this repair:

- `github:issue-comment:5610641096`: initial harness ordering failure before AW input placement;
- `github:issue-comment:5610668381`: first ordering repair placed AW input, then polluted the fixed structural file count before validation;
- `github:issue-comment:5610717797`: second ordering repair reached APT, but APT exited `100` before simulator transaction emission.

The final attempt established:

```text
APT_VERSION = apt 2.4.13 (amd64)
INNER_APT_EXIT = 100
APT_STDOUT_SHA256 = 5b16211bad8a33c48f281eedd83a6aabb9505a66ad08c3c56dfdc747a130ce85
APT_STDERR_SHA256 = 2c683d53a7a4b2a83e8419b72b4199526dae034013b60f1476a4a48a6dc168d8
APT_STDERR = E: Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?
PRE_INVENTORY_SHA256 = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66
POST_INVENTORY_SHA256 = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66
ISOLATED_ROOT_INVENTORY_EQUAL = PASS
TRANSACTION_RECORDS = NOT_EMITTED
```

It also exposed a process-observation race when a `/proc/<pid>/comm` entry disappeared between enumeration and read. That diagnostic did not alter APT state but cannot remain in a qualifying evidence harness.

## 3. Exact APT 2.4.13 source semantics

Static source identity is the already-bound APT 2.4.13 source commit:

```text
APT_SOURCE_VERSION = 2.4.13
APT_SOURCE_COMMIT = 581ec5c0aa2c6665d72465040f1465eb93503200
```

Fresh static inspection establishes the following control flow in `apt-private/private-install.cc`:

1. `InstallPackages` reads `APT::Get::Download` into `DownloadAllowed`.
2. With `APT::Get::Simulate=true`, APT deliberately skips the archive-directory lock.
3. APT still constructs package archive requests with `PM->GetArchives`.
4. If `DownloadAllowed == false`, `RemoveDownloadNeedingItemsFromFetcher` removes non-local requests and marks missing archives.
5. If any archive is missing and `APT::Get::Fix-Missing` is false, APT returns the exact observed `Unable to fetch some archives...` error.
6. Only after that branch does APT reach the `APT::Get::Simulate` block that constructs `SimulateWithActionGroupInhibited` and invokes `PM.DoInstall`.
7. The real `AcquireRun` download path occurs later still and is not reached when the simulation branch returns.

`apt-private/private-cmndline.cc` binds the `download` option to `APT::Get::Download`; therefore the canonical `--no-download` form sets the value false. The observed failure is the expected consequence of combining an empty isolated archive cache with `--no-download`.

This proves that `--no-download` is not an additional safety barrier for this exact simulation. It prevents the simulator itself from being reached.

## 4. Repaired Stage A simulation-control contract

The future Stage A retry must remove exactly one token from the canonical 43-element argv: `--no-download`. No other APT argument, requested root, ordering, source, state, cache, log, language, retry, or Recommends policy changes.

Repaired argv:

```json
["/usr/bin/apt-get","--simulate","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State=/tmp/signthos-apt/state/","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache=/tmp/signthos-apt/cache/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::Cache::pkgcache=","-o","Dir::Cache::srcpkgcache=","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","--no-install-recommends","pkg-config","autoconf","automake","libtool","ragel","git","yasm","subversion","lsb-release","tzdata","keyboard-configuration","tini"]
```

Safety remains fail-closed through independent controls:

```text
APT_SIMULATION = REQUIRED
DOCKER_NETWORK = none
ROOTFS = read-only
APT_WRITABLE_STATE = isolated tmpfs only
HOST_BIND_OR_VOLUME_MOUNTS = 0
REPOSITORY_MOUNTS = 0
SOURCE_LIST = exact canonical snapshot descriptor only
SOURCE_PARTS = disabled
APT_LISTS = exact canonical snapshot bytes only
DPKG_STATUS = exact canonical 004C1AI bytes only
PACKAGE_DOWNLOAD_SUCCESS = PROHIBITED
PACKAGE_INSTALLATION = PROHIBITED
PACKAGE_UNPACK = PROHIBITED
PACKAGE_CONFIGURATION = PROHIBITED
MAINTAINER_SCRIPT_EXECUTION = PROHIBITED
```

The source ordering above is the critical proof: with `APT::Get::Simulate=true`, successful control flow returns from the simulator block before the later `AcquireRun` package-download path. `--network none` remains an independent containment barrier, not a substitute for APT simulation semantics.

A future execution must still fail closed if any archive appears in the isolated archive cache before execution, if the exact image/input identities differ, or if process/inventory evidence indicates package filesystem effects.

## 5. Process observer repair

The future guest observer must treat `/proc` process exit races as expected observation churn rather than shell stderr. It may enumerate `/proc/[0-9]*/comm`, but each read must be guarded so a process disappearing between enumeration and open is silently skipped. The observer may not suppress errors from any non-`/proc` evidence operation.

The deterministic output remains the sorted unique set of successfully read process names while the Stage A process is alive. A disappearing PID is neither an execution failure nor evidence of a process that was never read.

## 6. Supersession and fail-closed rules

This grain supersedes only the future Stage A simulation-control token contract and process-observer read behavior. It does not rewrite the preserved failed attempts and does not independently authorize execution.

```text
CANONICAL_004C1AV_STAGE_A_ARGV_SHA256 = b1a87226bdb1ad54f826565e50e584dc0736394c0f5931b07a3fe4aaa10091e5
REPAIR_DELTA = REMOVE_EXACTLY_--no-download
ALL_OTHER_APT_TOKENS = IDENTICAL_ORDER
004C1AX_PRIOR_ATTEMPTS = PERMANENTLY_NONQUALIFYING
FUTURE_REPLAY_A = REQUIRES_FRESH_POST_MERGE_AUTHORITY
FUTURE_REPLAY_B = CONDITIONAL_ON_QUALIFYING_FUTURE_REPLAY_A
```

Any future evidence showing APT reaching `AcquireRun`, successful archive transfer, package install/unpack/configure, maintainer-script or trigger execution, changed canonical input bytes, unexpected APT action, or a package/version/architecture outside the exact canonical snapshot closure is a material fail-closed result.

## 7. Qualification result

```text
OBSERVED_004C1AX_FAILURE_EXPLAINED_BY_EXACT_APT_SOURCE = PASS_STATIC
NO_DOWNLOAD_PRE_SIMULATOR_BLOCKER = PROVEN
SIMULATE_BRANCH_PRECEDES_ACQUIRERUN_DOWNLOAD_PATH = PROVEN
SINGLE_TOKEN_STAGE_A_REPAIR_DEFINED = PASS_STATIC
NETWORK_NONE_PRESERVED = YES
READ_ONLY_ROOTFS_PRESERVED = YES
ISOLATED_APT_ROOT_PRESERVED = YES
PROC_OBSERVER_RACE_REPAIR_DEFINED = PASS_STATIC
004C1AY_RESULT = PASS_STATIC_ONLY
```

004C1AY can become canonical only after exact-head independent substantive review, zero unresolved material findings, guarded merge, and post-merge verification. Only fresh Issue #7 reconciliation after that closeout may authorize another Stage A execution attempt.
