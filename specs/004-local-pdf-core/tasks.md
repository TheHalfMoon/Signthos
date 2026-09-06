# Specification 004 — Local PDF Core Task Ledger

Status: `STAGE_P_CANDIDATE / PLANNING_ONLY`
Issue: #7
Canonical predecessor merge: `dd996f11b701679b941c1fb3fd3e8bdc880f2506`

## Ledger rules

- Task numbering records dependency order; it does not create implementation authority.
- A task is `CLOSED_CANONICAL` only after exact-head qualification, independent substantive review, guarded merge, post-merge verification, and ledger reconciliation where applicable.
- Unavailable/skipped/rate-limited/billing-blocked provider output is not review evidence.
- `NO_APPLICABLE_RUN` is distinct from CI PASS.
- Head movement burns exact-head review/check evidence.
- Stage P is planning-only. No task below authorizes dependencies, binaries, imports, runtime execution, migrations, signing, provider network use, or deployment unless a later canonical authority explicitly does so.

## Stage P shaping tasks

### S4-T001 — Establish canonical predecessor and authority boundary

Status: `CANDIDATE_COMPLETE`

Acceptance:

- Specification 003 closure and exact predecessor merge are identified;
- Issue #7 Stage P authority source is recorded;
- implementation/import/dependency/runtime/signing/deployment authority remains explicitly absent.

Evidence target: canonical Issue #6/#7 authority and exact live `main`.

### S4-T002 — Define Local PDF Core problem, goals, and non-goals

Status: `CANDIDATE_COMPLETE`

Acceptance:

- local-first provider-neutral PDF core problem is explicit;
- untrusted-input and multi-engine constraints are explicit;
- implementation and Specification 005 signing behavior are out of Stage P scope.

### S4-T003 — Bind canonical Specification 003 predecessor contracts

Status: `CANDIDATE_COMPLETE`

Acceptance:

- `DocumentRevision`, provider, authorization/error, persistence, and naming contracts are consumed without reopening them;
- conflict handling is fail-closed and requires separate governance reconciliation.

### S4-T004 — Define operation effect taxonomy

Status: `CANDIDATE_COMPLETE`

Acceptance:

- `READ_ONLY`, `REVISION_CREATING`, `SIGNATURE_CREATING`, `VERIFICATION_ONLY`, and `OUT_OF_SPEC_004` are distinguished;
- persisted content changes require new revision semantics;
- signing and verification ownership remains with Specification 005.

### S4-T005 — Define capability groups and recursive grain boundary

Status: `CANDIDATE_COMPLETE`

Acceptance:

- inspect/render through optional OCR/conversion are partitioned into bounded groups;
- cross-provider convergence and closeout are separate grains;
- numbering cannot be used as successor authority.

### S4-T006 — Define provider capability contract inputs

Status: `CANDIDATE_COMPLETE`

Acceptance:

- provider identity/version/runtime/capabilities/results/resource/network/isolation/provenance fields are enumerated;
- narrower provider capability sets are allowed instead of false convergence.

### S4-T007 — Define trust, locality, and untrusted-input boundaries

Status: `CANDIDATE_COMPLETE`

Acceptance:

- malformed/encrypted/active-content/decompression/resource-exhaustion cases are explicit;
- cancellation/timeout/isolation/logging/privacy requirements are explicit;
- local operations prohibit silent network upload.

### S4-T008 — Define fixture/corpus qualification contract

Status: `CANDIDATE_COMPLETE`

Acceptance:

- corpus is versioned and legally redistributable;
- fixture provenance/rights are mandatory;
- minimal/typical/forms/fonts/images/malformed/encrypted/signed-incremental/Arabic-RTL/redaction-recovery/resource-limit/differential classes are covered.

### S4-T009 — Define high-risk PDF safety invariants

Status: `CANDIDATE_COMPLETE`

Acceptance:

- redaction requires independent exported-file recovery testing;
- visual appearance is insufficient;
- signed revisions are not silently overwritten;
- transformation effects on existing signatures are not overstated.

### S4-T010 — Define dependency/binary provenance and adoption gate

Status: `CANDIDATE_COMPLETE`

Acceptance:

- exact source/package/crate/binary identity and checksums are required;
- license/notices/SBOM/vulnerability/update-path/platform evidence is required;
- ambiguous rights or binary provenance fail closed;
- Stage P adopts no candidate engine.

### S4-T011 — Define deterministic, security, and performance evidence gates

Status: `CANDIDATE_COMPLETE`

Acceptance:

- deterministic versus provider-dependent outputs are classified;
- exact-head/provider/corpus evidence binding is required;
- performance claims require representative platform/corpus evidence;
- unsupported/unknown/unavailable states are not converted to PASS.

### S4-T012 — Define dependency-ordered Specification 004 grain plan

Status: `CANDIDATE_COMPLETE`

Acceptance:

- Stage P closeout and 004A–004K are bounded;
- every grain has purpose, dependencies, scope, and authority boundary;
- implementation cannot begin by roadmap numbering alone.

## Stage P qualification tasks

### S4-T013 — Verify exact candidate changed surface

Status: `PENDING`

Required proof:

- exact canonical base;
- exact candidate head/tree;
- exactly three Signthos-authored planning files under `specs/004-local-pdf-core/**` unless forward-only review repair legitimately changes the bounded planning surface;
- zero product/runtime/dependency/import/provenance/NOTICE/config/workflow/database/signing mutation.

### S4-T014 — Account for exact-head workflows/checks truthfully

Status: `PENDING`

Required proof:

- list exact-head applicable workflow runs/checks/statuses;
- use `NO_APPLICABLE_RUN` when none exist;
- do not treat review-provider status as substantive review evidence.

### S4-T015 — Obtain fresh independent substantive exact-head review

Status: `PENDING`

Review must inspect at least:

- preservation of Specification 003 contracts;
- zero authority inflation;
- operation-effect/revision semantics;
- local/no-silent-network boundary;
- untrusted/malformed/encrypted/active-content/resource limits;
- corpus rights/provenance contract;
- provider adoption/provenance gate;
- redaction independent-validation invariant;
- signing/verification boundary;
- recursive grain ordering and successor discipline.

Any material finding must be repaired forward-only and the resulting exact head re-reviewed.

### S4-T016 — Reconcile all material review findings and threads

Status: `PENDING`

Acceptance:

- every material finding is resolved substantively;
- unresolved material review threads = 0;
- stale-head review evidence is excluded.

### S4-T017 — Record exact-head premerge qualification proof

Status: `PENDING`

Must bind:

- canonical base;
- exact reviewed head/tree;
- final changed surface;
- review evidence;
- exact-head workflow/check truth;
- thread count;
- ruleset/branch-protection truth;
- PR state/draft/mergeability;
- explicit absence of unauthorized mutation.

### S4-T018 — Guarded expected-head merge

Status: `PENDING`

Acceptance:

- normal merge only;
- exact `expected_head_sha` protection;
- no squash/rebase/force/admin/bypass.

### S4-T019 — Post-merge mechanical verification

Status: `PENDING`

Must prove:

- returned merge SHA equals canonical `main`;
- GitHub signature is valid/verified;
- ordered parents are `[premerge main, exact reviewed head]`;
- merge tree equals reviewed-head tree or any bounded difference is independently explained and verified;
- exact planning-only surface became canonical;
- PR is merged/closed;
- post-merge workflow/status accounting is truthful;
- unresolved material threads remain zero.

### S4-T020 — Mandatory Stage P closeout/successor reconciliation

Status: `BLOCKED_UNTIL_S4_T019_CANONICAL`

Purpose: reconcile Stage P evidence into canonical governance and derive the next authorized unit from live truth.

Explicit rule: Stage P merge alone does not authorize 004A implementation or provider adoption.

## Planned successor ledger — NOT AUTHORIZED BY THIS FILE

The following entries describe future dependency candidates only.

### S4-T021 — 004A corpus/provider-adoption contract qualification
Status: `NOT_YET_AUTHORIZED`

### S4-T022 — 004B inspect/render contract qualification
Status: `NOT_YET_AUTHORIZED`

### S4-T023 — 004C page operation contract qualification
Status: `NOT_YET_AUTHORIZED`

### S4-T024 — 004D merge/split contract qualification
Status: `NOT_YET_AUTHORIZED`

### S4-T025 — 004E content/forms/stamp contract qualification
Status: `NOT_YET_AUTHORIZED`

### S4-T026 — 004F metadata/attachments contract qualification
Status: `NOT_YET_AUTHORIZED`

### S4-T027 — 004G redaction/sanitize safety contract qualification
Status: `NOT_YET_AUTHORIZED`

### S4-T028 — 004H compare/compression/repair contract qualification
Status: `NOT_YET_AUTHORIZED`

### S4-T029 — 004I OCR/conversion optional-provider contract qualification
Status: `NOT_YET_AUTHORIZED`

### S4-T030 — 004J cross-provider convergence qualification
Status: `NOT_YET_AUTHORIZED`

### S4-T031 — 004K Specification 004 convergence closeout
Status: `NOT_YET_AUTHORIZED`

## Stage P completion condition

Specification 004 Stage P is not `CLOSED_CANONICAL` until S4-T001 through S4-T019 are canonically evidenced and a separate S4-T020 closeout reconciles the ledger and successor frontier.

This candidate ledger itself creates no implementation authority.