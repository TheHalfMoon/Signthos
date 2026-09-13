# 004C1FA Selected linux/amd64 Guest Substrate Recheck Qualification

Status: `QUALIFICATION_CANDIDATE / REPAIR_PAIR_PASS / EXCLUSIVE_REPLAY_EVIDENCE_FROZEN`
Issue: #7
Owning specification: `004-local-pdf-core`
Authority source: `github:issue-comment:5655884091`

## 1. Authority and scope

This record implements only the fresh repair authority for `004C1FA_SELECTED_LINUX_AMD64_GUEST_SUBSTRATE_RECHECK_QUALIFICATION`. The failed original attempt at `github:issue-comment:5655882645` remains permanently nonqualifying. The repair executed exactly one replacement replay pair under an exclusive local coordination lock and did not widen the previously qualified Docker envelope.

```text
CANONICAL_BASE = 4988f1271c87333c687d399cc58f67e51a74d43e
CANONICAL_BASE_TREE = 2c719588833d1ad862fe1d6b6420b680497a3576
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
TARGET_PLATFORM = linux/amd64
MAX_FRESH_REPAIR_REPLAYS = 2
AUTHORIZED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1fa-selected-linux-amd64-guest-substrate-recheck-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
```

## 2. Fresh repair evidence lineage

The qualifying repair evidence is isolated from both earlier nonqualifying evidence roots.

```text
EVIDENCE_ROOT_LABEL = 004c1fa-repair-20260913T202512Z
AUTHORITY_COMMENT = 5655884091
EXCLUSIVE_LOCK_PATH = Signthos-evidence/.004c1fa-repair.lock
EVIDENCE_DATA_FILES = 9
EVIDENCE_MANIFEST_TSV_SHA256 = cfa840ff78174d9bb5b453ebc9464ecb538ba2a276bfb2aeb33b04a084adacdf
SUPPLEMENTAL_PRECONDITION_EVIDENCE_ROOT_LABEL = 004c1fa-precondition-reconstruction-20260913T210115Z
SUPPLEMENTAL_EVIDENCE_MANIFEST_TSV_SHA256 = 93b06c47ada63695e6aaa8f4672bef9db17f18357853efbb84688ab066974bbc
SUPPLEMENTAL_SUMMARY_JSON_SHA256 = 0154fd67504a88fa3c37fed1d3fd81b6bc19158907c60a0d96fa018df58aefc9
REPLAY_A_STDOUT_SHA256 = 0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9
REPLAY_B_STDOUT_SHA256 = 0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9
REPLAY_A_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
REPLAY_B_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The lock remained outside the repository and existed before Replay A began. No stale hash from either prior 004C1FA attempt is used as qualifying evidence.

A supplemental read-only reconstruction binds the authority preconditions to immutable GitHub and Git timing evidence:

```text
EXCLUSIVE_LOCK_ACQUIRED_UTC = 2026-09-13T20:25:12Z
OPEN_PULL_REQUESTS_REQUIRED = []
OPEN_PULL_REQUESTS_AT_LOCK = 0
OPEN_PULL_REQUESTS_REQUIRED_EVIDENCE = supplemental:open-prs-at-lock.tsv
OPEN_PULL_REQUESTS_REQUIRED_EVIDENCE_TIMESTAMP_UTC = 2026-09-13T20:25:12Z
REPLAY_B_COMPLETE_UTC = 2026-09-13T20:26:50Z
CANDIDATE_COMMITTER_DATE_UTC = 2026-09-13T20:49:52Z
PR_233_CREATED_AT_UTC = 2026-09-13T20:50:15Z
REPOSITORY_COMMIT_OR_PUSH_BEFORE_QUALIFYING_EVIDENCE = 0
TRACKED_CANDIDATE_COMMIT_AFTER_REPLAY_EVIDENCE = PASS
PR_CREATION_AFTER_REPLAY_EVIDENCE = PASS
```

The authority explicitly treated the prior untracked draft as nonqualifying and required regeneration after the fresh repair pair. Consistent with that boundary, the no-mutation proof here is about tracked candidate commit/push and PR mutation: none occurred before qualifying replay evidence completed. The prior untracked draft was not used as qualifying evidence.

### 2.1 Repository-visible evidence manifest

The original frozen local evidence bytes remain unchanged. To make the evidence independently retrievable from the immutable candidate commit, this qualification record reproduces the deterministic manifest content and the small raw artifacts needed to verify the replay gate. The local evidence root itself remains outside the repository as required by Issue #7.

Original repair manifest content (`evidence-manifest.tsv`, SHA-256 `cfa840ff78174d9bb5b453ebc9464ecb538ba2a276bfb2aeb33b04a084adacdf`):

```text
64aaea0bf01c272beed3a9998b52fd1f0c0f10397af5e9dad18a47efaaa7c054	authority-comment.txt
50e7f89a40701f36102df84fcb1eda14d9302523cd421b531c470b90dd37271f	lock-path.txt
9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa	replay-A.exit.txt
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	replay-A.stderr.txt
0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9	replay-A.stdout.txt
9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa	replay-B.exit.txt
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	replay-B.stderr.txt
0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9	replay-B.stdout.txt
9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa	replay-equality.exit.txt
```

Supplemental precondition manifest content (`evidence-manifest.tsv`, SHA-256 `93b06c47ada63695e6aaa8f4672bef9db17f18357853efbb84688ab066974bbc`):

```text
path	bytes	sha256
all-prs.json	4041588	0fa5aceca903d4c39a5e43f7bb6088bd0ef15fd895fb1046cb9e3541ce5637c0
candidate-commit.json	8520	67e1a1e703d72fa90903a65f4538988f864e986fd244e9580cde34140224b2ae
local-branch-reflog.txt	153	c715534c52113493ec84b2affa048d459f089d49ba951c78e386a90423365280
lock-acquired-utc.txt	21	9abc0471dccc33ca9407fcb8b2fde80cbecc1b9dd86195ea295e4faa2800d166
open-prs-at-lock.tsv	52	114c94edf827b7a0b67b08b3def77f63c7d8f986a9e618ed1121bc26ac9fd9cc
pr233.json	18315	49bf22bf15fead4ec159fd7bcae13a158e49baccc91d9ce02e62c06579793788
replay-b-complete-utc.txt	21	4eca19eb22c21648680af3e8973b103f9642eacc742f8dd4a9ff462c9972d443
summary.json	441	0154fd67504a88fa3c37fed1d3fd81b6bc19158907c60a0d96fa018df58aefc9
```

The exact authority is independently retrievable at `https://github.com/TheHalfMoon/Signthos/issues/7#issuecomment-5655884091`. The open-PR precondition is represented by the exact raw TSV payload below; its header-only body means the required list is empty:

```text
number	state	created_at	closed_at	head_ref	head_sha
```

The supplemental summary payload is:

```json
{"candidateCommit":"5305ae425d92a07c5b561b8b856f286b23dd43f3","candidateCommitterDate":"2026-09-13T20:49:52Z","lockAcquiredUtc":"2026-09-13T20:25:12Z","openPullRequestsAtLock":[],"openPullRequestsAtLockCount":0,"pr233CreatedAt":"2026-09-13T20:50:15Z","prCreationAfterReplayEvidence":true,"replayBCompleteUtc":"2026-09-13T20:26:50Z","schema":"signthos.004c1fa.precondition-reconstruction.v1","trackedCandidateCommitAfterReplayEvidence":true}
```

## 3. Replay results

Replay A exited successfully and its architecture/libc predicates were observable before Replay B evidence began. Both replays produced byte-identical stdout and empty stderr.

```text
REPLAY_A_EXIT = 0
REPLAY_B_EXIT = 0
REPLAY_EQUALITY_EXIT = 0
REPLAY_STDOUT_BYTE_IDENTICAL = PASS
GUEST_KERNEL = 7.0.12-linuxkit
GUEST_MACHINE = x86_64
GUEST_LIBC = ldd (Ubuntu GLIBC 2.35-0ubuntu3.8) 2.35
ROSETTA_VISIBLE = NO
```

The exact raw Replay A stdout bytes (120 bytes; SHA-256 `0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9`) are:

```text
GUEST_KERNEL=7.0.12-linuxkit
GUEST_MACHINE=x86_64
GUEST_LIBC=ldd (Ubuntu GLIBC 2.35-0ubuntu3.8) 2.35
ROSETTA_VISIBLE=NO
```

The exact raw Replay B stdout bytes are identical (120 bytes; same SHA-256). Both stderr artifacts are zero bytes and hash to SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`. The three exit artifacts each contain exactly `0\n` and hash to SHA-256 `9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa`.

Read-only filesystem metadata from the frozen evidence root establishes the ordering without re-executing either replay:

```text
EXCLUSIVE_LOCK_ACQUIRED_UTC = 2026-09-13T20:25:12Z
REPLAY_A_STDOUT_FILE_BIRTH_UTC = 2026-09-13T20:26:00Z
REPLAY_A_STDOUT_FILE_MTIME_UTC = 2026-09-13T20:26:02Z
REPLAY_A_EXIT_FILE_BIRTH_UTC = 2026-09-13T20:26:02Z
REPLAY_A_EXIT_FILE_MTIME_UTC = 2026-09-13T20:26:02Z
REPLAY_A_GATE_COMPLETE_UTC = 2026-09-13T20:26:02Z
REPLAY_A_GATE_MACHINE = x86_64
REPLAY_A_GATE_GLIBC = ldd (Ubuntu GLIBC 2.35-0ubuntu3.8) 2.35
REPLAY_A_GATE_EXIT = 0
REPLAY_B_STDOUT_FILE_BIRTH_UTC = 2026-09-13T20:26:50Z
REPLAY_B_STDOUT_FILE_MTIME_UTC = 2026-09-13T20:26:50Z
REPLAY_B_EXIT_FILE_BIRTH_UTC = 2026-09-13T20:26:50Z
REPLAY_B_EXIT_FILE_MTIME_UTC = 2026-09-13T20:26:50Z
REPLAY_B_COMPLETE_UTC = 2026-09-13T20:26:50Z
REPLAY_B_BEGAN_AFTER_REPLAY_A_GATE = PASS
```

`REPLAY_A_GATE_COMPLETE_UTC` is the creation/modification time of the frozen `replay-A.exit.txt` combined with the already-written Replay A stdout whose hash and raw bytes above establish `x86_64` and glibc 2.35. Replay B's output/exit files were not created until `48` seconds later. This is read-only provenance over the original evidence; no replay was rerun and no frozen evidence byte was normalized or changed.

The required guest architecture and libc predicates therefore pass on the exact selected linux/amd64 image, and Replay B occurred only after the Replay A gate had passed.

## 4. Execution-boundary proof

The repair preserved the canonical guest-probe envelope. It did not pull, load, build, or commit an image; mount a host or repository path; enable container networking; execute Node, pnpm, Corepack, a resolver, or project runtime code; make project dependency network requests; or materialize dependencies.

```text
DOCKER_ENVELOPE_CHANGE = 0
IMAGE_PULL_LOAD_BUILD_COMMIT = 0
HOST_OR_REPOSITORY_MOUNTS = 0
NETWORK = none
NODE_PNPM_COREPACK_RESOLVER_EXECUTION = 0
PROJECT_DEPENDENCY_NETWORK_REQUESTS = 0
DEPENDENCY_MATERIALIZATION = 0
FRESH_REPAIR_REPLAY_COUNT = 2
```

## 5. Qualification result

```text
004C1FA_REPAIR_RESULT = PASS_CANDIDATE
FAILED_ORIGINAL_ATTEMPT = PERMANENTLY_NONQUALIFYING
EXCLUSIVE_REPLAY_PAIR = PASS
GUEST_MACHINE_QUALIFICATION = PASS_x86_64
GUEST_GLIBC_QUALIFICATION = PASS_2.35
REPLAY_DETERMINISM = PASS_BYTE_IDENTICAL
REPOSITORY_CHANGED_FILES = 1
MATERIALIZATION_ATTEMPT_AUTHORITY = ABSENT
RUNTIME_AUTHORITY = ABSENT
DISTRIBUTION_AUTHORITY = ABSENT
004C2_AUTHORITY = ABSENT
004D_AUTHORITY = ABSENT
SPECIFICATION_005_AUTHORITY = ABSENT
RELEASE_AUTHORITY = ABSENT
DEPLOYMENT_AUTHORITY = ABSENT
PROJECT_COMPLETE = false
```

This candidate records only the repaired 004C1FA qualification. Any successor authority requires exact-head independent substantive review, guarded merge, post-merge verification, and a fresh canonical Issue #7 reconciliation.
