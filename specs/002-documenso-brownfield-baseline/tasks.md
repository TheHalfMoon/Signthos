# Specification 002 — Canonical Task Ledger

Status: `STAGE_Q_002A1_CLOSED_CANONICAL / PLANNING_ONLY / IMPORT_BLOCKED`
Issue: #5
Canonical shaping base: `8e3a3ab8f1b889a6e13a82a5449f4a3b8c3a6167`
Canonical shaping merge: `24c2494e70cfad9e4771d9be676363561726c0fc`
Canonical Stage P reconciliation merge: `80ae1410b3065768e031eecaffda5b6a216ebd13`
Canonical 002A1 Stage Q merge: `b83f934a72fec111c27964a45cd79dccc489b4bf`

Legend:

- `[x]` — canonically satisfied by merged and post-merge-verified evidence identified here or in the linked closeout records.
- `[ ]` — not yet complete or deliberately blocked by a later authorization/evidence dependency.

A checked planning task never implies source-import authorization.

## S2-P — shaping and snapshot truth

- [x] `S2-T001` Re-read canonical Constitution, `AGENTS.md`, `ROADMAP.md`, Issue #5, Foundation migration/import plan, and Specification 001 closeout from live canonical `main`.
- [x] `S2-T002` Bind shaping to canonical Signthos base `8e3a3ab8f1b889a6e13a82a5449f4a3b8c3a6167` and Issue #5 `PLANNING_ONLY` authority.
- [x] `S2-T003` Re-read live `documenso/documenso` default branch and capture exact planning snapshot candidate `2cac63a000e22422bdea449f68b8025e709aa73a` without copying source.
- [x] `S2-T004` Record immutable upstream repository/commit/root-layout facts and distinguish captured SHA from moving `main`.
- [x] `S2-T005` Read root license evidence and record that repository-level AGPL metadata is not sufficient path-level authorization.
- [x] `S2-T006` Identify the more-specific `packages/ee/LICENSE` commercial boundary and fail-close `packages/ee/**` as restricted/not import-authorized.
- [x] `S2-T007` Record observed `apps/` and `packages/` top-level structure without converting tree names into import allowlists.
- [x] `S2-T008` Define all other upstream paths as `UNCLASSIFIED_PENDING_PATH_LEVEL_EVIDENCE` until exact file-level classification.
- [x] `S2-T009` Define Specification 002 scope, explicit non-grants, brownfield characterization contract, and zero-source-import shaping boundary.
- [x] `S2-T010` Decompose roadmap grains 002A–002H into dependency-ordered baseline units while preserving per-grain recursive refinement.
- [x] `S2-T011` Define the pre-import qualification packet and separate canonical implementation-authorization handoff.
- [x] `S2-T012` Define per-grain Specification 001 provenance/review/authorization-delta/expected-head/post-merge flow.
- [x] `S2-T013` Define dependency, secret, security, characterization, mechanical-transformation, and no-relicensing boundaries.
- [x] `S2-T014` Prove the shaping candidate change surface is limited to Spec 002 planning files and contains zero upstream product source.
- [x] `S2-T015` Obtain fresh independent substantive review coverage of the shaping candidate: CodeRabbit reviewed all four planning files at predecessor `60403fa2981b34432df8d1ddd669f42bf6fc1720`, then independently re-evaluated the complete bounded amendment delta on exact final head `052e6df02de146c315ab9d169deac391f310300e`.
- [x] `S2-T016` Reconcile every material shaping review finding and obtain exact-head/delta re-evaluation after amendments. The single material Stage Q byte-admission finding was confirmed addressed on exact final head and its review thread was resolved.
- [x] `S2-T017` Record exact-head shaping qualification accurately: GitHub Actions for final head were `NO_APPLICABLE_RUN`; later CodeRabbit full-review availability was `UNAVAILABLE / RATE_LIMITED`; Cubic exact-head review was `UNAVAILABLE / NEUTRAL / PLAN_LIMIT_REACHED`; none of those unavailable states was represented as PASS.
- [x] `S2-T018` Confirm zero unresolved material review threads and unchanged expected base/head immediately before merge. PR #37 remained mergeable with base `8e3a3ab8f1b889a6e13a82a5449f4a3b8c3a6167` and head `052e6df02de146c315ab9d169deac391f310300e`.
- [x] `S2-T019` Merge the exact qualified shaping head with `expected_head_sha` protection. PR #37 merged by the repository's normal merge-commit method as `24c2494e70cfad9e4771d9be676363561726c0fc`.
- [x] `S2-T020` Post-merge verify canonical `main`, exact ancestry/surface, Issue #5/governance, and that source import remains unauthorized. Stage P bookkeeping was then independently reviewed, guarded-merged in PR #38, and post-merge verified as canonical `main` `80ae1410b3065768e031eecaffda5b6a216ebd13` with zero upstream-derived bytes and zero source-import records.

Canonical Stage P evidence is summarized in `shaping-closeout.md` and the PR #38 post-merge Issue #5 evidence record. Stage P is `CLOSED_CANONICAL`. This authorizes only continuation into Stage Q planning/evidence work; it does not authorize source import.

## S2-Q — first pre-import qualification packet

Dependency: `S2-T020`.

This stage remains planning/evidence-only under Issue #5 `PLANNING_ONLY` authority.

**Stage Q admits zero upstream-derived bytes and zero source-import records.** Its separately reviewed allowlist may contain only explicitly named Signthos-authored qualification/evidence documents. Upstream facts may be referenced by immutable repository/path/SHA/digest/license identifiers and independently authored descriptions, but no copied, adapted, vendored, embedded, generated-from, or otherwise upstream-derived source, test, manifest, lockfile, configuration, asset, schema, patch, fixture, license copy, or other upstream file content may be committed before Stage R authorization.

The canonical 002A1 Stage Q packet is:

- `specs/002-documenso-brownfield-baseline/qualification-002a1-npm-policy.md`
- PR #39 exact reviewed head `5b6c9c03ac311e4b44a3dda0d02073930bf6517a`
- guarded merge `b83f934a72fec111c27964a45cd79dccc489b4bf`
- post-merge closeout `qualification-002a1-closeout.md`

- [x] `S2-T021` Select one first proposed grain without authorizing import: `002A1 — npm project-resolution policy seed`.
- [x] `S2-T022` Reconfirm the exact upstream snapshot. Live `documenso/documenso/main` was re-read during Stage Q and remained exactly `2cac63a000e22422bdea449f68b8025e709aa73a`; no snapshot amendment is proposed.
- [x] `S2-T023` Produce an exact file-level candidate map as Signthos-authored evidence only: upstream `.npmrc` blob `cbc6b6537fba6c69756ad16e69a35cc056791d99`, 65 bytes, candidate destination `.npmrc`, proposed future transformation `COPY_EXACT`. Current Stage-R-eligible allowlist remains `EMPTY`.
- [x] `S2-T024` Classify the most-specific current license/notice/provenance evidence without copying it. No file-local license/copyright/generated/vendor marker is present; root/community evidence identifies AGPL version 3 family treatment but canonical L002 remains unresolved between `AGPL-3.0-only` and `AGPL-3.0-or-later`. Copyright holder is not inferred from commit authorship.
- [x] `S2-T025` Exclude every insufficiently evidenced/restricted path. The sole 002A1 candidate remains `BLOCKED_PENDING_L002` and is excluded from the Stage-R-eligible import allowlist; `packages/ee/**` remains separately `RESTRICTED / NOT_IMPORT_AUTHORIZED`.
- [x] `S2-T026` Identify the minimum workspace/dependency/build surface. 002A1 is configuration-only and requires no install/build/service; broad root `package.json`, `package-lock.json`, `turbo.json`, application/package trees, deployment/configuration, patches, scripts, tests, and EE paths are explicitly excluded.
- [x] `S2-T027` Define independently authored characterization before any import. No upstream test file is proposed; future authorized characterization will verify exact path/digest equality, npm policy semantics, absence of credentials/endpoints, local execution, and unchanged imported bytes across any manifest-only authorization delta.
- [x] `S2-T028` Define source/destination digest and pending-to-qualified review flow without creating a source-import record. Exact candidate SHA-256 is `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`; future authorized import must reverify source blob/SHA-256, require destination equality, keep review pending, and prove destination bytes unchanged across the manifest authorization delta.
- [x] `S2-T029` Validate only Signthos-authored Stage Q evidence. The candidate change surface was the two named planning/evidence documents only; zero upstream-derived bytes and zero source-import records were admitted. No provenance record was syntactically validated as import authorization because none exists and L002 remains unresolved.
- [x] `S2-T030` Obtain independent substantive exact-head review of the qualification packet and reconcile all findings. CodeRabbit independently reviewed exact head `5b6c9c03ac311e4b44a3dda0d02073930bf6517a`, reported no material findings, and a subsequent full review on the same exact head generated no actionable comments with covered commit equal to the reviewed head.
- [x] `S2-T031` Merge/post-merge verify the packet under the applicable planning authority. PR #39 merged guarded with `expected_head_sha=5b6c9c03ac311e4b44a3dda0d02073930bf6517a` as `b83f934a72fec111c27964a45cd79dccc489b4bf`; post-merge checks and Actions were `NO_APPLICABLE_RUN`, canonical `.npmrc` remained absent, `provenance/imports/` still contained only `README.md`, and Issue #5 remained `PLANNING_ONLY`.

Canonical Stage Q evidence is summarized in `qualification-002a1-npm-policy.md`, `qualification-002a1-closeout.md`, PR #39, and the Issue #5 post-merge evidence record.

## S2-R — separate implementation authorization

Dependency: `S2-T031` plus a non-empty evidence-qualified import allowlist.

All tasks below are intentionally unchecked. Ordinary founder approval, roadmap order, a valid provenance schema, completion of planning, or resolution of a license evidence question cannot satisfy them implicitly.

- [ ] `S2-T032` Record a separate canonical authorization that explicitly names the first import grain, exact upstream snapshot, canonical path allowlist, allowed Signthos destination surface, rights/permission evidence where needed, and required review/qualification gates.
- [ ] `S2-T033` Re-read canonical governance after that authorization and prove it is effective on `main` before creating any source-import branch.

`IMPORT_IMPLEMENTATION_AUTHORITY = ABSENT` until `S2-T032` and `S2-T033` are canonically satisfied.

For 002A1 specifically, Stage R cannot be satisfied while the Stage-R-eligible import allowlist is empty.

## S2-A — repository/workspace baseline

Dependency: `S2-T033`.

Future tasks are placeholders for the authorized ledger refinement. They do not authorize source import now.

- [ ] `S2-T034` Create the authorized 002A implementation branch from exact canonical `main`.
- [ ] `S2-T035` Import only the exact authorized workspace/community paths from the exact selected upstream SHA.
- [ ] `S2-T036` Create canonical provenance records for every imported path and keep source-import review state pending until imported-byte review exists.
- [ ] `S2-T037` Establish the minimum reproducible workspace/dependency baseline required by the bounded imported surface.
- [ ] `S2-T038` Add/retain bounded characterization tests without mixing rebrand, redesign, schema migration, or license-boundary changes.
- [ ] `S2-T039` Obtain independent imported-byte review, apply the manifest-only authorization delta, and prove imported destination bytes remain unchanged.
- [ ] `S2-T040` Run exact-head CI/provenance/characterization qualification, resolve reviews, expected-head merge, and post-merge verify.

002B–002G must be separately refined/authorized after their true dependencies are known from canonical 002A evidence. 002H remains blocked unless exact separate rights evidence is accepted.

## Explicit blockers/non-grants

- `S2-B001` `packages/ee/**` is restricted/not import-authorized without separately accepted rights covering the exact intended action.
- `S2-B002` Non-EE paths are not authorized merely by repository-level AGPL metadata; exact path-level evidence is required.
- `S2-B003` No generic founder approval substitutes for the separate canonical import authorization required by `S2-T032`.
- `S2-B004` No copied/adapted upstream code may be mechanically relicensed.
- `S2-B005` No source-import record may treat syntactic validator PASS as proof of review independence, rights, or canonical authorization.
- `S2-B006` No app/mobile/signing/compliance/distribution claim follows from brownfield baseline import.
- `S2-B007` No implementation of Specification 003 is authorized by shaping or baseline characterization.
- `S2-B008` 002A1 remains `BLOCKED_PENDING_L002` until canonical evidence resolves the exact Documenso community SPDX option for the candidate path or a separately accepted exact-scope permission artifact supplies an independent rights basis. Neither event alone substitutes for Stage R authorization.

## Current frontier

`S2-B008 / L002 evidence resolution` — determine, in a separate bounded and independently reviewed planning/evidence unit, whether first-party immutable evidence supports an unambiguous SPDX expression for the exact 002A1 community candidate. Fail closed if it does not.

Until that evidence unit becomes canonical with a non-empty Stage-R-eligible allowlist, `S2-T032` cannot begin.

Source import remains unauthorized. Current Stage-R-eligible 002A1 import allowlist is `EMPTY`.
