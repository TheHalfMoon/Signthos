# Specification 003 — Canonical Task Ledger

Status: `STAGE_P_CLOSEOUT_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical shaping base: `89146441dbd3cbadcddbcd24dc0741b4ecdc14e1`
Canonical Stage P merge: `d822f3c3ab3bc773efc587ce61f7fc96344098f6`
Canonical predecessor: Specification 002 `CLOSED_CANONICAL`

## Ledger contract

This ledger tracks bounded Specification 003 planning/qualification work.

- `[x]` means the current candidate contains the stated result/evidence; newly reconciled closeout items become canonical only if this exact closeout package passes independent substantive review, guarded merge, post-merge verification, and live successor reconciliation.
- `[ ]` means incomplete, blocked, or not yet authorized.
- A checked planning task grants no product/runtime implementation authority.
- No implementation task identity is created by Stage P or its closeout.
- No source-import, dependency-acquisition, database-migration, runtime/provider, PDF/signing, or Specification 004 authority is implied by task ordering.
- Historical Specification 002 and Stage P evidence remain immutable predecessor evidence and are not rewritten by this ledger.

## Stage P — shaping and closeout

- [x] `S3-T001` Re-read canonical Constitution, `AGENTS.md`, `ROADMAP.md`, Issue #6, and exact current `main` before shaping.
- [x] `S3-T002` Verify Specification 002 predecessor closure through PR #85 / merge `89146441dbd3cbadcddbcd24dc0741b4ecdc14e1` and closed Issue #5.
- [x] `S3-T003` Bind Stage P authority to Issue #6 `PLANNING_ONLY`; record that roadmap numbering does not authorize implementation.
- [x] `S3-T004` Record the exact current Documenso imported surface as only `.npmrc` and `packages/prisma/schema.prisma` through canonical source-import records `U001-I0001` and `U001-I0002`.
- [x] `S3-T005` Record that 002C auth source remains excluded rights-blocked/no-import, 002D–002G remain not selected, and 002H remains optional/not selected.
- [x] `S3-T006` Prohibit false inherited-behavior claims for non-imported Documenso auth/document/editor/API/job subsystems.
- [x] `S3-T007` Define Specification 003 problem, goal, scope-in, scope-out, rights boundary, and zero-implementation Stage P change surface.
- [x] `S3-T008` Define canonical contract vocabulary for `Document`, `DocumentRevision`, `Envelope`, `Recipient`, `Field`, `EvidenceBundle`, and `Workflow`.
- [x] `S3-T009` Define content-addressing, revision lineage, explicit conversion revision, and immutable signing-input invariants at planning level.
- [x] `S3-T010` Define authentication/resource-authorization separation and minimum principal/tenant/resource/action decision vocabulary.
- [x] `S3-T011` Define event taxonomy and stable machine-readable error model requirements.
- [x] `S3-T012` Define browser/native/server/heavy provider boundaries, explicit capability semantics, and local-first no-silent-network constraints.
- [x] `S3-T013` Constrain anti-corruption planning to actually inherited/imported representation and prevent excluded-source expression from re-entering by implication.
- [x] `S3-T014` Define bounded naming/configuration migration boundary without combining rebrand with behavior/license/schema migration.
- [x] `S3-T015` Recursively decompose Specification 003 into dependency-ordered candidate grains 003A–003H.
- [x] `S3-T016` Define separate future implementation-authorization requirements for every implementation grain.
- [x] `S3-T017` Define contract, adapter, security, privacy, evidence-class, and Diffciplane qualification requirements for future grains.
- [x] `S3-T018` Prove the Stage P candidate itself requires zero source import, zero dependency acquisition, zero runtime/provider execution, and zero product implementation.
- [x] `S3-T019` Verify exact Stage P diff is limited to `spec.md`, `plan.md`, and `tasks.md` under `specs/003-signthos-domain-boundary/**`, with zero upstream-derived source bytes and zero protected-surface mutation.
- [x] `S3-T020` Account truthfully for exact-head GitHub Actions/check/provider state; skipped/unavailable/neutral/billing-blocked output was not converted into PASS.
- [x] `S3-T021` Obtain independent substantive review of the exact final Stage P head against exact base.
- [x] `S3-T022` Reconcile review findings: no material finding required a forward-only repair, so no changed-head re-review was necessary.
- [x] `S3-T023` Confirm unresolved material review threads are zero and reverify exact base/head, mergeability, rulesets, and branch protection immediately before merge.
- [x] `S3-T024` Record mandatory exact-head premerge proof and guarded-merge using exact `expected_head_sha`.
- [x] `S3-T025` Post-merge verify ordered ancestry, reviewed-head/merge tree equality, signature, workflow/check accounting, and three-file Stage P surface.
- [x] `S3-T026` Reconcile Stage P canonical status and derive the next bounded 003 successor from live post-merge truth through `stage-p-closeout.md`.

## Stage P closeout evidence

Canonical Stage P evidence reconciled by this candidate:

```text
STAGE_P_BASE = 89146441dbd3cbadcddbcd24dc0741b4ecdc14e1
STAGE_P_REVIEWED_HEAD = b966343fe9bcd44822a65776f2047725dcaa9486
STAGE_P_MERGE = d822f3c3ab3bc773efc587ce61f7fc96344098f6
STAGE_P_REVIEWED_HEAD_TREE = 7beb5dd8c2d7a6239e14c75bf4efcae7fd9168b4
STAGE_P_MERGE_TREE = 7beb5dd8c2d7a6239e14c75bf4efcae7fd9168b4
TREE_EQUALITY = PASS
POSTMERGE_ACTIONS = NO_APPLICABLE_RUN
POSTMERGE_STATUSES = NO_APPLICABLE_RUN
UNRESOLVED_MATERIAL_REVIEW_THREADS = 0
```

Exact review and post-merge details are recorded in `stage-p-closeout.md`, PR #86, and Issue #6.

## Authority-race correction

PR #87 attempted 003A qualification before this mandatory closeout became canonical. Issue #6 still declared:

```text
003A_DOMAIN_VOCABULARY_AND_IDENTITY_QUALIFICATION = NOT_YET_CANONICAL_SUCCESSOR_AUTHORITY
```

PR #87 was therefore closed without merge. Its branch/history is non-canonical candidate evidence only. Future 003A work must not reuse PR #87's authority, review, check, or exact-head qualification evidence.

## Stage P candidate result

Before this closeout candidate is guarded-merged and post-merge verified:

```text
SPEC_003_STAGE_P_SHAPING = MERGED_POSTMERGE_VERIFIED
SPEC_003_STAGE_P_CLOSEOUT = CANDIDATE_ONLY
SPEC_003_STATUS = PLANNING_ONLY
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
003A_DOMAIN_VOCABULARY_AND_IDENTITY_QUALIFICATION = NOT_YET_CANONICAL_SUCCESSOR_AUTHORITY
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

If and only if this exact closeout package becomes canonical and the live post-merge reread does not narrow authority, the expected state is:

```text
SPEC_003_STAGE_P = CLOSED_CANONICAL
SPEC_003_STATUS = PLANNING_ACTIVE
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
NEXT_AUTHORIZED_REPOSITORY_UNIT = 003A_DOMAIN_VOCABULARY_AND_IDENTITY_QUALIFICATION
003A_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
003A_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

The actual post-merge reread controls.

## Candidate grain dependency graph

```text
Stage P shaping + closeout
  -> 003A Domain vocabulary + identity invariants
      -> 003B Revision + immutable signing-input contracts
          -> 003C Envelope / Recipient / Field / Workflow contracts
              -> 003D Authorization / Event / Error contracts
                  -> 003E Provider capability contracts
                      -> 003F Prisma anti-corruption + migration mapping
                          -> 003G Bounded naming/config migration
                              -> 003H Convergence + closeout
```

The graph orders contract dependencies. It does not create implementation authority.

## 003A candidate — planning/qualification only

Potential successor identity after canonical Stage P closeout:

`003A_DOMAIN_VOCABULARY_AND_IDENTITY_QUALIFICATION`

Purpose:

- qualify exact semantic fields/value objects/invariants for the minimum Signthos domain vocabulary;
- identify unresolved decisions before selecting any language-specific implementation;
- produce deterministic contract examples/negative cases without product code.

Candidate allowed surface, subject to post-merge authorization:

- planning/contract artifacts under `specs/003-signthos-domain-boundary/**` only.

Explicitly not pre-authorized:

- `packages/**` product/domain code;
- database migrations;
- package manifests/lockfiles;
- dependency acquisition;
- generated code;
- runtime/provider/network behavior;
- source import;
- Specification 004.

## 003B candidate

Purpose: qualify revision creation, exact byte identity, conversion revisions, signing-input binding, signed-input immutability, and stale-write/conflict semantics.

Dependency: 003A canonical contract qualification.

No implementation authority exists.

## 003C candidate

Purpose: qualify envelope/recipient/field/workflow state ownership and revision-binding semantics.

Dependency: 003A–003B.

No implementation authority exists.

## 003D candidate

Purpose: qualify principal/tenant/resource/action authorization, event classes/versioning, evidence-event boundaries, and stable error classes.

Dependency: 003A and relevant 003C resource semantics.

No implementation authority exists.

## 003E candidate

Purpose: qualify provider capabilities/interfaces and local/network/heavy trust boundaries without hidden domain forks.

Dependency: 003A–003D.

No implementation authority exists.

## 003F candidate

Purpose: qualify mapping from canonical imported Prisma representation into stable Signthos contracts and identify future adapter/migration seams.

Dependency: 003A–003E.

No Prisma schema mutation, migration, generation, dependency acquisition, or source import is authorized.

## 003G candidate

Purpose: qualify bounded product naming/configuration migration after contract/persistence boundaries are stable.

Dependency: 003A–003F.

No broad rebrand or behavioral migration is authorized.

## 003H candidate

Purpose: converge every actually authorized 003 grain and derive Specification 004 eligibility only after exact canonical closeout evidence exists.

Dependency: all 003 grains that become canonically authorized for the current Specification 003 scope.

## Rights/provenance state

Stage P and this closeout introduce no upstream-derived source bytes and no new source-import records.

Canonical Specification 002 rights states remain unchanged:

- `.npmrc`: already imported under canonical provenance;
- Prisma schema: already imported under canonical private-permission provenance with public conflict preserved;
- selected 002C auth paths: `COPY_EXACT` rights not established and remain excluded;
- 002D–002G: not selected for current import surface;
- 002H/EE: optional/not selected and not import-authorized.

Specification 003 planning does not broaden or inherit any of those rights.

## Security invariants carried into all future grains

- authentication is not resource authorization;
- cross-tenant access is deny-by-default;
- client UI gating is not sufficient authorization;
- signed/signing-bound revision bytes are immutable;
- content-changing provider output creates a new revision;
- non-PDF conversion is explicit;
- local-only operations do not silently use network;
- heavy/untrusted processors do not receive signing keys/control-plane secrets by default;
- verifier uncertainty/unsupported/unavailable states cannot become success;
- sensitive content is excluded from logs/events by default;
- machine error classes are stable independently from localized human messages.

## Completion boundary

Specification 003 is not canonically complete when Stage P closes.

No implementation task should be invented until live canonical successor analysis explicitly authorizes a bounded implementation unit.

Stage P and its closeout preserve the distinction between:

- shaping/qualification authority;
- implementation authority;
- dependency acquisition authority;
- source-import rights;
- runtime/provider/network authority;
- downstream Specification 004 authority.