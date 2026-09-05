# Specification 002 — Canonical Task Ledger

Status: `002B_IMPLEMENTATION_CLOSEOUT_CANDIDATE / POSTMERGE_VERIFIED / ZERO_NEW_UPSTREAM_BYTES / SUCCESSOR_AUTHORITY_UNRESOLVED`
Issue: #5
Pinned upstream snapshot: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Reconciliation base: `50d2ae1cc95809c8903612631caa9ffa5c0e76d1`

## Ledger contract

This file is the canonical task-status index for Specification 002. Detailed evidence remains in the named canonical qualification, authorization, characterization, closeout, resolution, PR, CI, and Issue #5 records; this ledger intentionally does not duplicate every evidence byte.

- `[x]` means the task has exact canonical evidence identified by the existing repository history and summaries below.
- `[ ]` means incomplete, deliberately blocked, or not yet authorized.
- A checked planning/evidence task never creates source-import or implementation authority beyond the exact canonical artifact it cites.
- Existing canonical task identities `S2-T001` through `S2-T041` are preserved exactly.
- Canonical successor units after `S2-T040` that were executed under separately reviewed successor authority remain recorded without inventing retroactive `S2-Txxx` identities.
- No `S2-T042` identity is invented by this reconciliation.
- Historical blockers remain evidence of the state that existed when they were recorded. A later canonical chain may resolve a historical blocker for one exact action without erasing the historical fact or broadening rights to another path.
- This active closeout branch is not itself canonical until independent substantive review, guarded expected-head merge, and post-merge verification complete.

## Canonical merge chain

| Unit | PR | Canonical merge | Result |
| --- | ---: | --- | --- |
| Specification 002 shaping | #37 | `24c2494e70cfad9e4771d9be676363561726c0fc` | Stage P shaping merged |
| Stage P reconciliation | #38 | `80ae1410b3065768e031eecaffda5b6a216ebd13` | `STAGE_P = CLOSED_CANONICAL` |
| 002A1 Stage Q qualification | #39 | `b83f934a72fec111c27964a45cd79dccc489b4bf` | first `.npmrc` qualification packet |
| Stage Q closeout reconciliation | #40 | `fb1c0c57c594a1f148167de3d2e2bac071601d6e` | Stage Q bookkeeping canonical |
| 002A1 L002 decision | #41 | `a97c937456d57569c633c21b2bfc943f7ee9039a` | exact `.npmrc = AGPL-3.0-only` |
| 002A1 Stage R authorization | #42 | `ea9022423563153951616b1a7c12fc4f255cc462` | bounded one-path authorization recorded |
| AGPL distribution prerequisite | #43 | `6d947ab78ea56312785de7761154e1a5c7bfd9e7` | full-license/NOTICE prerequisite recorded |
| Stage R effectiveness | #44 | `e13aa50fad6ed24b2f031a078d74b4c798db147a` | 002A1 implementation authority became effective after canonical proof |
| Stage R ledger reconciliation | #45 | `ca0409e3b5f40deba0c14987d591d1860d902ad1` | implementation frontier moved to T034 |
| 002A1 implementation | #46 | `7c10ec2a3d25f73e8cd37e6ff7bf5db41cdaf019` | exact `.npmrc` import completed and qualified |
| 002A1 implementation closeout | #47 | `5218e144ae800d8cd29fa52cbd0086157cb59e54` | `002A1 = CLOSED_CANONICAL` |
| 002A successor discovery | #48 | `c95bab85549ee61894436a7a800b3f62cd1ddfaf` | root-manifest qualification selected; no import authority |
| 002A2 root-manifest qualification | #49 | `7c8fe436f6dcce7766ca8fffc4302646a87b7d60` | exact copy blocked as overbroad |
| 002A2 overbreadth resolution | #50 | `9beb6e69128315cb4450f747fbb793fe9a611465` | exact-copy rejected; M1 planning selected |
| 002A2-M1 necessity qualification | #51 | `52ee76d5608242a0b56a550a7342fa433d44c546` | no current root-manifest necessity |
| 002A through M1 ledger reconciliation | #52 | `3ea95d37ddf42d7c02face0e89e29ab26c3710c6` | `S2-T041 / 002A3` became next planned task |
| S2-T041 / 002A3 dependency discovery | #53 | `6f242e1ad7747fba7e544001e6d8c3f5bcce5d83` | static Prisma schema candidate; no workspace prerequisite established |
| S2-T041 post-merge ledger reconciliation | #55 | `5645987c8ff2835b5cc95e392274a3b312b4d427` | T041 evidence/frontier reconciled; no T042 invented |
| 002B Prisma schema path qualification | #56 | `dba8940dbc9210f6f6cbff4dfa48cc605d7b9b76` | AGPL/MIT rights conflict found; Stage R then blocked |
| 002B qualification ledger reconciliation | #57 | `a49fc659e59e9bc42313aeaad7d61091af48386c` | rights-resolution-only successor frontier |
| 002B rights-conflict resolution | #58 | `e37e21936b033bbabf52171cae29f3f45308d785` | public evidence exhausted; clarification still required at that time |
| Post-rights-resolution reconciliation | #59 | `ea787bd968030507bd9f24323fa850a8e428593f` | feasibility discovery authorized only |
| 002B successor feasibility discovery | #60 | `ad4140bdecd35c2d294f1bb52242ff4c21ac3d01` | no independent alternative candidate |
| Blocked dependency-frontier reconciliation | #61 | `53111e0e207d61ef30f52771587e60bc1f0b8558` | external-rights re-entry gate recorded; no T042 |
| Private Prisma permission re-entry qualification | #62 | `ec0dc45c01af263996a5fdf096fd01123293820c` | exact private rights basis established for current COPY_EXACT distribution; public license conflict preserved |
| Post-permission successor-authority analysis | #63 | `edeec84c97ee682c9dfa05c4f2a913d8b2038365` | planning-only provenance compatibility analysis selected |
| Private-permission provenance compatibility | #64 | `ff6e756e6f655f1bbfac55de99eff064a08d5bee` | v1 not truthfully representable; versioned v2 feasible |
| Bounded provenance-v2 authorization | #65 | `d0ec3901b7da5c34ec6418fc597194cb45892d7e` | versioned v2 maintenance authority recorded |
| Provenance v2 implementation | #67 | `cabd242d7f48177ff2cdaa563d157619ddc86cb0` | v2 private-permission records implemented; v1 semantics preserved |
| Post-v2 successor authority | #68 | `6c4681f2a765b6d75ef2f45bdbb6b96bb3421f2d` | private-grant distribution obligations selected as remaining dependency |
| Private-permission distribution qualification | #69 | `ffb546f40052457a0c26fa5586d0f10975695093` | `RESOLVED_NONE_ADDITIONAL`; required public artifacts empty |
| Exact Prisma v2 pre-import qualification | #70 | `6c776f890593cdfd05232236ac9887f5a9b3722b` | exact source digest/identity qualified; Stage R candidate established |
| Bounded Prisma Stage R authorization | #71 | `5388c51ac1c417c7bb8fbe70372e9d89e0bef9fd` | one-path authorization recorded, not yet operational |
| Prisma Stage R effectiveness | #72 | `f02335d11c2bc556f01fa4ff3c21c7859074600f` | exact schema COPY_EXACT authority made effective |
| Deterministic NOTICE surface authorization | #74 | `69e8e17dac37b23c3f9bf50895dff21901e6034d` | root NOTICE added only as derivative provenance bookkeeping |
| Deterministic NOTICE effectiveness | #75 | `e71af0c0dfff4916c380cef4b68362d7990e6216` | NOTICE-only operational authority made effective |
| 002B Prisma schema implementation | #73 | `50d2ae1cc95809c8903612631caa9ffa5c0e76d1` | exact Prisma schema baseline canonical and post-merge verified |

PR #54 was superseded/closed without merge. PR #66 was closed without merge. Neither is canonical authority or evidence for a repository mutation.

## S2-P — shaping and snapshot truth

- [x] `S2-T001` Re-read canonical Constitution, `AGENTS.md`, `ROADMAP.md`, Issue #5, Foundation migration/import plan, and Specification 001 closeout.
- [x] `S2-T002` Bind shaping to exact canonical Signthos and pinned upstream truth under Issue #5 `PLANNING_ONLY` authority.
- [x] `S2-T003` Capture immutable upstream snapshot `2cac63a000e22422bdea449f68b8025e709aa73a` without copying source.
- [x] `S2-T004` Record immutable upstream repository/commit/root-layout facts and distinguish pinned SHA from moving upstream `main`.
- [x] `S2-T005` Record that repository-level license metadata is not path-level import authorization.
- [x] `S2-T006` Record `packages/ee/**` as a separate restricted/commercial boundary.
- [x] `S2-T007` Record observed upstream `apps/` and `packages/` structure without creating an allowlist.
- [x] `S2-T008` Fail-close unclassified paths pending exact path-level evidence.
- [x] `S2-T009` Define Specification 002 scope and zero-source-import shaping boundary.
- [x] `S2-T010` Decompose 002A–002H into dependency-ordered bounded grains.
- [x] `S2-T011` Define separate qualification and implementation-authorization stages.
- [x] `S2-T012` Define exact-head provenance/review/expected-head/post-merge flow.
- [x] `S2-T013` Define dependency, secret, security, characterization, transformation, and no-relicensing boundaries.
- [x] `S2-T014` Prove shaping contained zero upstream product bytes.
- [x] `S2-T015` Obtain independent substantive shaping review.
- [x] `S2-T016` Reconcile material shaping findings and obtain exact-head/delta re-evaluation.
- [x] `S2-T017` Account accurately for `NO_APPLICABLE_RUN` and unavailable/neutral automated checks.
- [x] `S2-T018` Confirm zero unresolved material threads and unchanged expected base/head before merge.
- [x] `S2-T019` Guarded-merge exact shaping head.
- [x] `S2-T020` Post-merge verify shaping and reconcile Stage P in PR #38.

`STAGE_P = CLOSED_CANONICAL`.

## S2-Q — first pre-import qualification packet

- [x] `S2-T021` Select first bounded grain: `002A1 — npm project-resolution policy seed`.
- [x] `S2-T022` Reconfirm pinned upstream snapshot.
- [x] `S2-T023` Map exact `.npmrc` candidate identity/digest as evidence only.
- [x] `S2-T024` Gather path-specific license/notice/provenance evidence without inferring ownership.
- [x] `S2-T025` Preserve exclusions including `packages/ee/**` and every non-selected path.
- [x] `S2-T026` Prove the 002A1 dependency/build surface requires no install/build/service.
- [x] `S2-T027` Define independently authored characterization before import.
- [x] `S2-T028` Define source/destination digest and pending-to-qualified review flow.
- [x] `S2-T029` Validate zero upstream-derived bytes and zero source-import records in Stage Q.
- [x] `S2-T030` Obtain independent substantive exact-head qualification review.
- [x] `S2-T031` Guarded-merge/post-merge verify Stage Q and reconcile it in PR #40.

## S2-L002 — exact 002A1 license-option evidence

- [x] Canonical path-specific result from PR #41: exact `.npmrc = AGPL-3.0-only` at the pinned snapshot.

Global L002 remains path-specific. No 002A1 license result classifies another Documenso path.

## S2-R — separate 002A1 implementation authorization

- [x] `S2-T032` Canonically record exact one-path 002A1 Stage R authorization in PR #42.
- [x] `S2-T033` Canonically prove bounded authorization effectiveness after PRs #43–#44 and reconcile the ledger in PR #45.

## S2-A1 — repository/workspace baseline seed implementation

- [x] `S2-T034` Create the authorized 002A1 import branch from exact canonical `main`.
- [x] `S2-T035` Import only exact authorized `.npmrc` plus separately authorized SPDX full-license artifact.
- [x] `S2-T036` Create exact source-import record `U001-I0001` with pending review state.
- [x] `S2-T037` Establish bounded reproducible `.npmrc` characterization without dependency/network/runtime/provider access.
- [x] `S2-T038` Preserve independently authored characterization/evidence only.
- [x] `S2-T039` Obtain imported-byte review, apply bounded review-status/NOTICE qualification delta, and prove imported bytes unchanged.
- [x] `S2-T040` Pass exact-head Provenance qualification, review/thread reconciliation, guarded merge, and post-merge verification in PR #46.

002A1 is `CLOSED_CANONICAL` through PR #47. The later 002A2/M1 chain established no currently required root workspace manifest and left speculative root/workspace bytes absent.

## S2-T041 — first 002B dependency discovery

- [x] `S2-T041` Perform `002A3 — first 002B dependency discovery for repository/workspace prerequisites` as planning/evidence only. Select one bounded database/domain characterization candidate from the pinned snapshot and identify only its exact repository/workspace prerequisites. Commit zero upstream-derived bytes and create zero source-import records.

Canonical PR #53 selected exact `packages/prisma/schema.prisma` for static characterization and established `002A3_STATIC_SCHEMA_WORKSPACE_PREREQUISITE = NONE_ESTABLISHED`. PR #55 reconciled T041 without creating T042.

## Canonical 002B resolution and implementation chain after S2-T041

No new `S2-Txxx` identity is assigned to these separately reviewed successor units.

### Historical rights blocker — PRs #56–#61

At the time of PRs #56–#61, the exact Prisma schema was correctly fail-closed because public first-party evidence produced an unresolved AGPL/MIT conflict and no separately qualified exact rights basis was then represented canonically. PR #60 found no independent substitute candidate. PR #61 made the external-rights re-entry condition canonical.

This historical state is preserved as evidence; it is not the current 002B state after the later #62–#75 chain.

### Private-rights/provenance re-entry — PRs #62–#70

Canonical later evidence established, without erasing the public license conflict:

- private permission artifact `permission-artifact:documenso-signthos-private-v1` for exact current `COPY_EXACT` distribution;
- relied-on scopes `copy,redistribute,publish_source`;
- public license state remains `unresolved_conflict` with no synthesized SPDX;
- provenance v1 remained frozen and a bounded v2 model was implemented instead;
- private-grant distribution obligations became `RESOLVED_NONE_ADDITIONAL` with required public artifacts `EMPTY`;
- exact source blob/size/SHA-256 were independently bound for pre-import qualification.

PR #67 canonical-main workflow `33972157155 = SUCCESS`; review `github:issue-comment:5552478677 = NO_MATERIAL_FINDINGS`.

PR #70 exact reviewed head `8668e9cac3d59a4f403987fb5044792603ace643`; digest evidence `github:issue-comment:5552633677`; independent review `github:issue-comment:5552647883 = NO_MATERIAL_FINDINGS`; post-merge evidence `github:issue-comment:5552666697`.

### Stage R, NOTICE, and implementation — PRs #71–#75 and #73

PR #71 recorded the exact one-path Stage R authorization. PR #72 made that bounded authority effective for:

- upstream `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`;
- path/destination `packages/prisma/schema.prisma`;
- blob `13768e34f62331474fce63b1ca67f8d5ead44854`;
- size `38099`;
- SHA-256 `0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931`;
- transformation `COPY_EXACT` / `copied`;
- v2 record `provenance/imports/U001-I0002.json`;
- rights basis `permission-artifact:documenso-signthos-private-v1`;
- public license expression intentionally unresolved.

PR #74 separately authorized only deterministic root `NOTICE` projection for qualified `U001-I0002`; PR #75 made only that NOTICE surface effective.

PR #73 final implementation evidence:

- exact reviewed head `de0fcc0df612b8dc102e3623f0d92fac60a9e13c`;
- reviewed-head tree `87b0a5359eefc8589c008e9b5cc07d37d0ff50c6`;
- final independent exact-head review `github:issue-comment:5553355822 = NO_MATERIAL_FINDINGS`;
- exact-head Provenance run `33979352721 = SUCCESS`;
- guarded merge with `expected_head_sha = de0fcc0df612b8dc102e3623f0d92fac60a9e13c`;
- canonical merge `50d2ae1cc95809c8903612631caa9ffa5c0e76d1`;
- merge tree equals reviewed-head tree `87b0a5359eefc8589c008e9b5cc07d37d0ff50c6`;
- ordered parents: pre-merge main `e71af0c0dfff4916c380cef4b68362d7990e6216`, then exact reviewed head `de0fcc0df612b8dc102e3623f0d92fac60a9e13c`;
- merge signature verified/valid;
- post-merge evidence `github:issue-comment:5553371124`;
- canonical-main Provenance run `33979551234 = SUCCESS`.

Canonical implementation surface relative to pre-merge main is exactly:

1. `NOTICE` — deterministic projection delta only;
2. `packages/prisma/schema.prisma` — exact authorized source bytes;
3. `provenance/imports/U001-I0002.json` — qualified v2 record;
4. `specs/002-documenso-brownfield-baseline/implementation-002b-prisma-schema.md` — Signthos static characterization/evidence.

Canonical identities after PR #73:

- schema blob `13768e34f62331474fce63b1ca67f8d5ead44854`;
- provenance blob `9ef347d0ac095b2e50e05a3a851bc30e895c7547`;
- provenance `review.status = qualified_exact_head`;
- NOTICE blob `90b40a51731c480bcc79ee5a0d7119e6b529ebf2`;
- NOTICE projects `U001-I0002` with `classification: unresolved_conflict` and does not expose private permission text.

## Historical blockers and current reconciliation

- `S2-B001` **ACTIVE** — `packages/ee/**` remains restricted/not import-authorized without separately accepted written rights covering the exact intended action.
- `S2-B002` **ACTIVE** — repository-level or package-level license metadata never automatically authorizes an unqualified path; exact path/action evidence remains mandatory.
- `S2-B003` **ACTIVE** — generic Founder approval does not substitute for path-level third-party rights, provenance, independent review, Stage R, or other evidence-dependent gates.
- `S2-B004` **ACTIVE** — no copied/adapted upstream code may be mechanically relicensed.
- `S2-B005` **ACTIVE** — a syntactically valid provenance record never substitutes for independent review, rights evidence, or canonical authorization.
- `S2-B006` **ACTIVE** — no app/mobile/signing/compliance/distribution claim follows merely from the brownfield baseline.
- `S2-B007` **ACTIVE** — Specification 003 implementation remains unauthorized.
- `S2-B008` **ACTIVE** — the 002A1 `.npmrc` L002 result remains path/revision-specific and classifies no other path.
- `S2-B009` **RECONCILED WITH EXACT EXCEPTION** — root `package.json`, `package-lock.json`, `turbo.json`, all `apps/**`, all other `packages/**`, dependencies/install/network/lifecycle/runtime/provider/credential/deployment activity remain unauthorized unless separately qualified. The one exact exception now canonical is `packages/prisma/schema.prisma` under the #62–#75/#73 chain above.
- `S2-B010` **HISTORICAL BLOCKER RESOLVED FOR THIS EXACT ACTION ONLY** — the public AGPL/MIT conflict remains unresolved, but separate private permission, v2 provenance, distribution-obligation evidence, exact pre-import qualification, Stage R, effectiveness, review, and post-merge verification established the current exact `COPY_EXACT` import without selecting a public SPDX expression. This does not generalize to another path/action.
- `S2-B011` **HISTORICAL EVIDENCE LIMITATION PRESERVED** — PR #58 post-hoc readback did not expose request-time `expected_head_sha`; later successor authority did not fabricate it and instead proceeded through fresh separately reviewed guarded units.
- `S2-B012` **HISTORICAL FEASIBILITY RESULT PRESERVED** — PR #60 found no independent alternative 002B candidate. The later exact Prisma candidate advanced only because new private-rights/provenance/distribution evidence became canonical.
- `S2-B013` **DEPENDENCY STATE UPDATED** — the missing 002B database/domain baseline no longer blocks 002C because PR #73 made that exact static baseline canonical. However, 002C still has no automatic source-import/Stage R/implementation authority; it requires its own fresh planning/qualification and later separate authorization. 002D–002G remain downstream dependency-blocked. 002H remains optional and may remain empty absent separately accepted exact rights evidence.
- `S2-B014` **HISTORICAL 002B BLOCKER RESOLVED / SPECIFICATION CLOSEOUT STILL INELIGIBLE** — Specification 002 is no longer blocked because 002B is open on rights evidence, but Specification 002 still cannot close while later required grains remain unqualified/unimplemented. Specification 003 cannot bypass those dependencies.

## Current 002B closeout gate

PR #73 implementation is canonical and post-merge verified, but this bookkeeping branch must itself become canonical before declaring the grain closed.

While this closeout branch remains non-canonical:

- `002B_STATUS = IMPLEMENTATION_POSTMERGE_VERIFIED_CLOSEOUT_PENDING`;
- `002B_CLOSEOUT_ELIGIBILITY = TRUE_CANDIDATE_ONLY`;
- `002C_PLANNING_SUCCESSOR_AUTHORITY = PENDING_CANONICAL_002B_CLOSEOUT`;
- `002C_SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `002C_STAGE_R_AUTHORITY = ABSENT`;
- `002C_IMPLEMENTATION_AUTHORITY = ABSENT`;
- `002D` through `002G` remain dependency-blocked;
- `002H_STATUS = OPTIONAL_MAY_REMAIN_EMPTY_PENDING_SEPARATE_RIGHTS_EVIDENCE`;
- `SPEC_002_STATUS = OPEN`;
- `SPEC_002_CLOSEOUT_ELIGIBILITY = FALSE`;
- `SPEC_003_SUCCESSOR_AUTHORITY = ABSENT`.

If and only if this exact closeout unit receives fresh independent substantive exact-head review, accurate workflow/check accounting, zero unresolved material review threads, guarded merge using its exact `expected_head_sha`, and post-merge verification, then:

`002B = CLOSED_CANONICAL`

becomes the canonical ledger result.

## Next dependency after canonical 002B closeout

The next permitted dependency-ordered activity is **planning/qualification only** for 002C. It must determine one bounded auth/session/policy contract candidate and its exact prerequisites from the pinned snapshot without importing upstream bytes or creating a source-import record unless and until a later separate rights/provenance qualification and Stage R/effectiveness chain authorizes those exact bytes.

That planning successor must preserve:

- exact path-level rights/provenance qualification;
- zero automatic inheritance from 002B private permission or Stage R;
- no adjacent/EE path admission;
- no dependency installation/runtime/provider/credential behavior unless separately qualified;
- independent substantive review;
- exact-head CI where applicable;
- guarded expected-head merge and post-merge verification.

No 002C implementation, 002D–002H implementation, or Specification 003 authority is created by this closeout.

No `S2-T042` task identity is assigned by this reconciliation.
