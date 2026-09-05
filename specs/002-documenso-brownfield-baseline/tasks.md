# Specification 002 — Canonical Task Ledger

Status: `S2_T041_POSTMERGE_LEDGER_RECONCILIATION_CANDIDATE / ZERO_NEW_UPSTREAM_BYTES / NEXT_002B_PATH_QUALIFICATION_BLOCKED_PENDING_THIS_MERGE`
Issue: #5
Pinned upstream snapshot: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Reconciliation base: `6f242e1ad7747fba7e544001e6d8c3f5bcce5d83`

## Ledger contract

This file is the canonical task-status index for Specification 002. Detailed evidence remains in the named canonical qualification, authorization, characterization, closeout, resolution, PR, CI, and Issue #5 records; this ledger does not duplicate every evidence byte.

- `[x]` means the task has exact evidence identified below. When a checked item is first recorded by an active reconciliation branch, that bookkeeping becomes canonical only if the reconciliation itself receives independent substantive review, guarded expected-head merge, and post-merge verification.
- `[ ]` means incomplete, deliberately blocked, or not yet authorized.
- A checked planning/evidence task never creates source-import or implementation authority beyond the exact canonical artifact it cites.
- Existing canonical task identities `S2-T001` through `S2-T041` are preserved exactly.
- Canonical successor units that occurred after `S2-T040` under separately reviewed successor authority remain recorded as historical canonical units without inventing retroactive `S2-Txxx` identities.
- No `S2-T042` identity is invented by this reconciliation. The next dependency is described only by the exact successor boundary canonically established by PR #53.

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
| Stage R effectiveness | #44 | `e13aa50fad6ed24b2f031a078d74b4c798db147a` | 002A1 authority effective only after canonicalization |
| Stage R ledger reconciliation | #45 | `ca0409e3b5f40deba0c14987d591d1860d902ad1` | implementation frontier moved to T034 |
| 002A1 implementation | #46 | `7c10ec2a3d25f73e8cd37e6ff7bf5db41cdaf019` | exact `.npmrc` import completed and qualified |
| 002A1 implementation closeout | #47 | `5218e144ae800d8cd29fa52cbd0086157cb59e54` | `002A1 = CLOSED_CANONICAL` |
| 002A successor discovery | #48 | `c95bab85549ee61894436a7a800b3f62cd1ddfaf` | selected root-manifest qualification, no import authority |
| 002A2 root-manifest qualification | #49 | `7c8fe436f6dcce7766ca8fffc4302646a87b7d60` | exact copy blocked as overbroad |
| 002A2 overbreadth resolution | #50 | `9beb6e69128315cb4450f747fbb793fe9a611465` | exact-copy rejected; M1 planning selected |
| 002A2-M1 necessity qualification | #51 | `52ee76d5608242a0b56a550a7342fa433d44c546` | no current root-manifest necessity; broader 002A remains open |
| 002A through M1 ledger reconciliation | #52 | `3ea95d37ddf42d7c02face0e89e29ab26c3710c6` | canonical ledger reconciled; `S2-T041 / 002A3` became next planned task |
| S2-T041 / 002A3 dependency discovery | #53 | `6f242e1ad7747fba7e544001e6d8c3f5bcce5d83` | selected static Prisma schema characterization; no workspace prerequisite established |

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

Canonical path-specific result from PR #41:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:.npmrc = AGPL-3.0-only`

The exact candidate remains blob `cbc6b6537fba6c69756ad16e69a35cc056791d99`, 65 bytes, SHA-256 `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`.

Global L002 remains unresolved outside separately qualified paths. `packages/ee/**` remains restricted/not import-authorized.

## S2-R — separate 002A1 implementation authorization

- [x] `S2-T032` Canonically record exact one-path 002A1 Stage R authorization in PR #42.
- [x] `S2-T033` Canonically prove bounded authorization effectiveness after PRs #43–#44 and reconcile the ledger in PR #45.

The only implemented Documenso source path authorized by this completed chain remains exact `.npmrc`. No later 002A/002B path inherits that authority.

## S2-A1 — repository/workspace baseline seed implementation

- [x] `S2-T034` Create the authorized 002A1 import branch from exact canonical `main`.
- [x] `S2-T035` Import only exact authorized `.npmrc` plus separately authorized SPDX full-license artifact.
- [x] `S2-T036` Create exact source-import record `U001-I0001` with pending review state.
- [x] `S2-T037` Establish bounded reproducible `.npmrc` characterization without dependency/network/runtime/provider access.
- [x] `S2-T038` Preserve independently authored characterization/evidence only.
- [x] `S2-T039` Obtain imported-byte review, apply bounded review-status/NOTICE qualification delta, and prove imported bytes unchanged.
- [x] `S2-T040` Pass exact-head Provenance qualification, review/thread reconciliation, guarded merge, and post-merge verification in PR #46.

Canonical implementation evidence includes exact-head Provenance run `33878569772 = SUCCESS`, post-merge run `33878897083 = SUCCESS`, imported-byte review `github:issue-comment:5540873733`, final exact-head review `github:issue-comment:5541196123`, and merge `7c10ec2a3d25f73e8cd37e6ff7bf5db41cdaf019`.

## Canonical successor units after S2-T040

The following units are canonical. Units before `S2-T041` were executed under separately reviewed successor authority after `S2-T040`; this ledger records their exact evidence without assigning retroactive task identities.

### 002A1 implementation closeout — PR #47

- exact reviewed head: `9b5f5db4f8bf7826dec1a8567cb6f7cfa58bd7a4`;
- independent review: `github:issue-comment:5541333501`;
- guarded merge: `5218e144ae800d8cd29fa52cbd0086157cb59e54`;
- post-merge evidence: `github:issue-comment:5541382595`;
- result: `002A1 = CLOSED_CANONICAL`.

### 002A successor discovery — PR #48

- exact reviewed head: `04eeae840fd1f4c60ffca994525ef1700c9f1c33`;
- guarded merge: `c95bab85549ee61894436a7a800b3f62cd1ddfaf`;
- post-merge evidence: `github:issue-comment:5547275772`;
- result: broader 002A did not close with `.npmrc` alone; root-manifest qualification selected; source-import authority remained absent.

### 002A2 root-manifest qualification — PR #49

- exact reviewed head: `f293d9ae784435154992f5de53e2d51f7a154f6f`;
- independent review: `github:issue-comment:5547301678`;
- guarded merge: `7c8fe436f6dcce7766ca8fffc4302646a87b7d60`;
- post-merge evidence: `github:issue-comment:5547353086`;
- result: path-level candidate `AGPL-3.0-only`; exact-copy Stage R readiness blocked by overbroad dependency/script surface; import allowlist empty.

### 002A2 overbreadth resolution — PR #50

- exact reviewed head: `3d6b4c1e9bcc3069dafac1d12f9c3f247d76a750`;
- material review finding reconciled and re-evaluated: `github:issue-comment:5550773402`;
- final metadata consistency review: `github:issue-comment:5550781165`;
- guarded merge: `9beb6e69128315cb4450f747fbb793fe9a611465`;
- post-merge evidence: `github:issue-comment:5550792938`;
- result: exact root manifest rejected as the current minimum 002A surface; M1 planning selected; no Stage R/import authority.

### 002A2-M1 current root-manifest necessity — PR #51

- exact reviewed head: `7d09e0ef0d1e61740504b5eceddf5c56caa1168c`;
- independent substantive review: `github:issue-comment:5550815814 = NO_MATERIAL_FINDINGS`;
- guarded merge: `52ee76d5608242a0b56a550a7342fa433d44c546`;
- post-merge evidence: `github:issue-comment:5550836655`.

Canonical M1 result:

- `M1_CURRENT_ROOT_MANIFEST_NECESSITY = NOT_ESTABLISHED`;
- `M1_CURRENT_AUTHORIZED_WORKSPACE_MEMBERSHIP = EMPTY`;
- `M1_DESTINATION_MANIFEST_BYTES = NONE`;
- `M1_STAGE_R_CANDIDATE = NONE`;
- `M1_STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `M1_SUCCESSOR_IMPORT_AUTHORITY = ABSENT`;
- `BROADER_002A_STATUS = OPEN_PENDING_REAL_WORKSPACE_DEPENDENCY_DISCOVERY`.

M1 does not permanently prohibit a future root manifest. It requires an actual bounded workspace dependency before root workspace membership/toolchain semantics are designed.

### Post-M1 ledger reconciliation — PR #52

- exact reviewed head: `99dc2147141868774afbebeb3efd7cfe558f063c`;
- independent exact-head/delta review: canonical PR #52 review evidence;
- guarded merge: `3ea95d37ddf42d7c02face0e89e29ab26c3710c6`;
- result: ledger reconciliation became canonical and `S2-T041 / 002A3` became the first newly planned successor task.

## S2-T041 — first 002B dependency discovery

- [x] `S2-T041` Perform `002A3 — first 002B dependency discovery for repository/workspace prerequisites` as planning/evidence only. Select one bounded database/domain characterization candidate from the pinned snapshot and identify only its exact repository/workspace prerequisites. Commit zero upstream-derived bytes and create zero source-import records.

Canonical evidence from PR #53:

- exact base: `3ea95d37ddf42d7c02face0e89e29ab26c3710c6`;
- exact reviewed head: `1144a8ee9fd5a25642eb9224f6f22a63592d39c7`;
- independent substantive review: `github:issue-comment:5551137715 = NO_MATERIAL_FINDINGS`;
- guarded merge: `6f242e1ad7747fba7e544001e6d8c3f5bcce5d83`;
- merge tree: `193cf538694736abe4506a21346340a3b7f12a89`, equal to the reviewed-head tree;
- ordered parents: pre-merge `main` `3ea95d37ddf42d7c02face0e89e29ab26c3710c6`, then exact reviewed head `1144a8ee9fd5a25642eb9224f6f22a63592d39c7`;
- post-merge evidence: `github:issue-comment:5551151329`;
- post-merge GitHub Actions: `NO_APPLICABLE_RUN`, not PASS;
- changed surface: exactly `specs/002-documenso-brownfield-baseline/002a3-prisma-schema-dependency-discovery.md`;
- upstream-derived bytes committed: `0`;
- source-import records created: `0`.

Canonical bounded result:

- selected static characterization candidate: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:packages/prisma/schema.prisma`;
- upstream blob: `13768e34f62331474fce63b1ca67f8d5ead44854`;
- upstream size: `38099` bytes;
- `002A3_STATIC_SCHEMA_WORKSPACE_PREREQUISITE = NONE_ESTABLISHED`;
- no root `package.json`, root lockfile, `turbo.json`, shared TypeScript config, npm workspace resolution, dependency installation, Prisma generation, migration, database, environment, network, credential, provider, or deployment prerequisite is established for the bounded static schema-contract inventory;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `002B_IMPLEMENTATION_AUTHORITY = ABSENT`.

This result is intentionally limited to static schema characterization. Any future executable Prisma behavior must separately prove and qualify its minimum repository/workspace/toolchain/environment prerequisites.

## Explicit blockers and non-grants

- `S2-B001` `packages/ee/**` is restricted/not import-authorized without separately accepted written rights covering the exact intended action.
- `S2-B002` Repository-level AGPL metadata does not authorize non-EE paths; exact path-level evidence remains mandatory. The only currently imported Documenso product path is exact 002A1 `.npmrc`.
- `S2-B003` Generic founder approval does not substitute for Stage R, path-level rights/provenance, independent review, or evidence-dependent gates.
- `S2-B004` No copied/adapted upstream code may be mechanically relicensed.
- `S2-B005` A syntactically valid provenance record never substitutes for independent review, rights evidence, or canonical authorization.
- `S2-B006` No app/mobile/signing/compliance/distribution claim follows from the brownfield baseline.
- `S2-B007` Specification 003 implementation remains unauthorized.
- `S2-B008` The 002A1 `.npmrc` L002 result remains path/revision-specific and does not classify or authorize any other Documenso path.
- `S2-B009` Root `package.json`, `package-lock.json`, `turbo.json`, all `apps/**`, all `packages/**` including observed `packages/tsconfig/**` and `packages/prisma/**`, dependencies/install/network/lifecycle/runtime/provider/credential/deployment activity remain unauthorized unless a later exact unit satisfies every required gate.

## Current reconciliation gate and next dependency

This branch is a bookkeeping-only post-merge reconciliation of already-canonical `S2-T041` evidence. The checked `S2-T041` value and updated frontier become canonical only if this exact reconciliation receives independent substantive exact-head review, guarded expected-head merge, and post-merge verification.

Until this reconciliation becomes canonical:

- do not open a downstream canonical successor branch;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- no upstream path is import-authorized;
- 002B implementation remains blocked;
- Specification 003 implementation remains blocked.

If and only if this reconciliation becomes canonical, the next dependency is exactly the successor boundary established by PR #53:

**select and prepare one separately bounded 002B path-level qualification packet for `packages/prisma/schema.prisma`.**

That successor is planning/evidence only. It must include exact path-level license/provenance evidence and a proposed independently authored static characterization while preserving zero source-import authority until a later separate Stage R event. It must not infer path-level permission from repository-level metadata, must not copy/adapt the schema, and must not install dependencies or execute Prisma/database/runtime behavior.

No `S2-T042` task identity is assigned by this reconciliation. A later canonical authority artifact may assign a task identity only if the repository governance genuinely requires and authorizes it.
