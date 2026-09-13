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
OPEN_PULL_REQUESTS_AT_LOCK = 0
REPLAY_B_COMPLETE_UTC = 2026-09-13T20:26:50Z
CANDIDATE_COMMITTER_DATE_UTC = 2026-09-13T20:49:52Z
PR_233_CREATED_AT_UTC = 2026-09-13T20:50:15Z
REPOSITORY_COMMIT_OR_PUSH_BEFORE_QUALIFYING_EVIDENCE = 0
TRACKED_CANDIDATE_COMMIT_AFTER_REPLAY_EVIDENCE = PASS
PR_CREATION_AFTER_REPLAY_EVIDENCE = PASS
```

The authority explicitly treated the prior untracked draft as nonqualifying and required regeneration after the fresh repair pair. Consistent with that boundary, the no-mutation proof here is about tracked candidate commit/push and PR mutation: none occurred before qualifying replay evidence completed. The prior untracked draft was not used as qualifying evidence.

## 3. Replay results

Replay A exited successfully before Replay B was attempted. Both replays produced byte-identical stdout and empty stderr.

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

The required guest architecture and libc predicates therefore pass on the exact selected linux/amd64 image.

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
