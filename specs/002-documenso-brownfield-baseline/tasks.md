# Specification 002 — Canonical Task Ledger

Status: `STAGE_R_002A1_EFFECTIVE_CANONICAL / LEDGER_RECONCILIATION_CANDIDATE`
Issue: #5
Canonical shaping base: `8e3a3ab8f1b889a6e13a82a5449f4a3b8c3a6167`
Canonical shaping merge: `24c2494e70cfad9e4771d9be676363561726c0fc`
Canonical Stage P reconciliation merge: `80ae1410b3065768e031eecaffda5b6a216ebd13`
Canonical 002A1 Stage Q merge: `b83f934a72fec111c27964a45cd79dccc489b4bf`
Canonical 002A1 Stage Q reconciliation merge: `fb1c0c57c594a1f148167de3d2e2bac071601d6e`
Canonical 002A1 L002 merge: `a97c937456d57569c633c21b2bfc943f7ee9039a`
Canonical 002A1 Stage R authorization merge: `ea9022423563153951616b1a7c12fc4f255cc462`
Canonical 002A1 distribution-artifact prerequisite merge: `6d947ab78ea56312785de7761154e1a5c7bfd9e7`
Canonical 002A1 Stage R effectiveness merge: `e13aa50fad6ed24b2f031a078d74b4c798db147a`

Legend:

- `[x]` — canonically satisfied by merged and post-merge-verified evidence identified here or in the linked closeout records.
- `[ ]` — not yet complete or deliberately blocked by a later authorization/evidence dependency.

A checked planning or authorization task never implies authority beyond its exact canonical scope.

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

**Stage Q admits zero upstream-derived bytes and zero source-import records.** Its separately reviewed allowlist may contain only explicitly named, Signthos-authored qualification/evidence documents. Upstream facts may be referenced by immutable repository/path/SHA/digest/license identifiers and independently authored descriptions, but no copied, adapted, vendored, embedded, generated-from, or otherwise upstream-derived source, test, manifest, lockfile, configuration, asset, schema, patch, fixture, license copy, or other upstream file content may be committed before Stage R authorization.

The canonical 002A1 Stage Q packet is:

- `specs/002-documenso-brownfield-baseline/qualification-002a1-npm-policy.md`
- PR #39 exact reviewed head `5b6c9c03ac311e4b44a3dda0d02073930bf6517a`
- guarded merge `b83f934a72fec111c27964a45cd79dccc489b4bf`
- post-merge closeout `qualification-002a1-closeout.md`
- post-qualification reconciliation PR #40 / merge `fb1c0c57c594a1f148167de3d2e2bac071601d6e`

- [x] `S2-T021` Select one first proposed grain without authorizing import: `002A1 — npm project-resolution policy seed`.
- [x] `S2-T022` Reconfirm the exact upstream snapshot. Live `documenso/documenso/main` was re-read during Stage Q and remained exactly `2cac63a000e22422bdea449f68b8025e709aa73a`; no snapshot amendment is proposed.
- [x] `S2-T023` Produce an exact file-level candidate map as Signthos-authored evidence only: upstream `.npmrc` blob `cbc6b6537fba6c69756ad16e69a35cc056791d99`, 65 bytes, candidate destination `.npmrc`, proposed future transformation `COPY_EXACT`.
- [x] `S2-T024` Classify the most-specific current license/notice/provenance evidence without copying it. No file-local license/copyright/generated/vendor marker is present; root/community evidence identifies AGPL version 3 family treatment. Copyright holder is not inferred from commit authorship.
- [x] `S2-T025` Exclude every insufficiently evidenced/restricted path. `packages/ee/**` remains separately `RESTRICTED / NOT_IMPORT_AUTHORIZED`; no path other than the exact 002A1 `.npmrc` acquired Stage R authority.
- [x] `S2-T026` Identify the minimum workspace/dependency/build surface. 002A1 is configuration-only and requires no install/build/service; broad root `package.json`, `package-lock.json`, `turbo.json`, application/package trees, deployment/configuration, patches, scripts, tests, and EE paths are explicitly excluded.
- [x] `S2-T027` Define independently authored characterization before any import. No upstream test file is proposed; authorized characterization verifies exact path/digest equality, npm policy semantics, absence of credentials/endpoints, local execution, and unchanged imported bytes across any manifest-only authorization delta.
- [x] `S2-T028` Define source/destination digest and pending-to-qualified review flow. Exact candidate SHA-256 is `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`; authorized import must reverify source blob/SHA-256, require destination equality, keep review pending, and prove destination bytes unchanged across the manifest authorization delta.
- [x] `S2-T029` Validate only Signthos-authored Stage Q evidence. The Stage Q candidate change surface admitted zero upstream-derived bytes and zero source-import records.
- [x] `S2-T030` Obtain independent substantive exact-head review of the qualification packet and reconcile all findings. CodeRabbit independently reviewed exact head `5b6c9c03ac311e4b44a3dda0d02073930bf6517a`, reported no material findings, and a subsequent full review on the same exact head generated no actionable comments with covered commit equal to the reviewed head.
- [x] `S2-T031` Merge/post-merge verify the packet under the applicable planning authority. PR #39 merged guarded with `expected_head_sha=5b6c9c03ac311e4b44a3dda0d02073930bf6517a` as `b83f934a72fec111c27964a45cd79dccc489b4bf`; PR #40 then reconciled this closeout canonically without changing import authority.

Canonical Stage Q evidence is summarized in `qualification-002a1-npm-policy.md`, `qualification-002a1-closeout.md`, PRs #39–#40, and the Issue #5 evidence records.

## S2-L002 — exact 002A1 license-option evidence unit

Dependency: canonical S2-T031 reconciliation at `fb1c0c57c594a1f148167de3d2e2bac071601d6e`.

Evidence document:

`specs/002-documenso-brownfield-baseline/qualification-002a1-l002.md`

Exact scope:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:.npmrc`

Canonical result:

- path-specific classification: `AGPL-3.0-only`;
- independent substantive exact-head review: `github:issue-comment:5539396641`;
- guarded PR #41 merge: `a97c937456d57569c633c21b2bfc943f7ee9039a`;
- exact candidate remains blob `cbc6b6537fba6c69756ad16e69a35cc056791d99`, 65 bytes, SHA-256 `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`;
- the evidence-qualified allowlist is exactly `.npmrc -> .npmrc`, SPDX `AGPL-3.0-only`, `COPY_EXACT`;
- global Foundation L002 remains unresolved for other Documenso paths/revisions;
- `packages/ee/**` remains `RESTRICTED / NOT_IMPORT_AUTHORIZED`.

This L002 result did not itself create implementation authority; Stage R remained a separate gate.

## S2-R — separate implementation authorization

Dependency: canonical S2-L002 result plus the separate Stage R chain.

- [x] `S2-T032` Record a separate canonical authorization that explicitly names the first import grain, exact upstream snapshot, canonical path allowlist, allowed Signthos destination surface, rights/permission evidence where needed, and required review/qualification gates. PR #42 exact reviewed head `89c097b57caf870e8c22536e9db46940abfc39a1` received independent substantive review `github:issue-comment:5539615793` and merged guarded as `ea9022423563153951616b1a7c12fc4f255cc462`.
- [x] `S2-T033` Re-read canonical governance after that authorization and prove it is effective on `main` before creating any source-import branch. PR #43 canonically established the bounded AGPL full-license/NOTICE prerequisite at merge `6d947ab78ea56312785de7761154e1a5c7bfd9e7`; PR #44 exact reviewed head `f1ca8c11bad1414ea9ec4fba12daded047e2140d` received independent substantive review `github:issue-comment:5540070137` with no material finding and merged guarded as `e13aa50fad6ed24b2f031a078d74b4c798db147a`. Post-merge verification recorded Issue #5 evidence `5540134732` with zero implementation bytes admitted.

`IMPORT_IMPLEMENTATION_AUTHORITY = EFFECTIVE_FOR_002A1_ONLY`.

The complete authorized 002A1 implementation surface is exactly:

1. `.npmrc` — exact authorized Documenso bytes only;
2. `LICENSES/AGPL-3.0-only.txt` — exact authorized SPDX license-document bytes only;
3. `provenance/imports/U001-I0001.json` — source-import record for `.npmrc` only;
4. `NOTICE` — only the deterministic provenance projection during the final `qualified_exact_head` phase;
5. necessary independently authored 002A1 characterization/evidence under `specs/002-documenso-brownfield-baseline/`;
6. evidence-backed `specs/002-documenso-brownfield-baseline/tasks.md` reconciliation.

No other repository path, Documenso path/revision, dependency installation, lifecycle script, package-network access, provider, credential, paid service, deployment, EE source, relicensing action, redesign/rebrand/domain migration, or Specification 003 implementation is authorized.

## S2-A — repository/workspace baseline

Dependency: canonical `S2-T033` effectiveness and this canonical ledger reconciliation.

The tasks below are authorized only for exact 002A1 and must execute in dependency order. Later 002A grains and 002B–002H remain separately blocked/refined as required.

- [ ] `S2-T034` Create the authorized 002A1 implementation branch from exact canonical `main`.
- [ ] `S2-T035` Import only the exact authorized workspace/community path `.npmrc` from exact selected upstream SHA `2cac63a000e22422bdea449f68b8025e709aa73a`, plus the separately authorized exact SPDX full-license distribution artifact.
- [ ] `S2-T036` Create `provenance/imports/U001-I0001.json` for `.npmrc` only and keep `review.status = pending` until imported-byte review exists.
- [ ] `S2-T037` Establish the minimum reproducible 002A1 configuration baseline without dependency installation, lifecycle scripts, package-network access, credentials, providers, or external services.
- [ ] `S2-T038` Add/retain bounded independently authored characterization evidence without mixing rebrand, redesign, schema migration, or license-boundary changes.
- [ ] `S2-T039` Obtain independent imported-byte review, apply the manifest-only authorization delta, regenerate deterministic `NOTICE` only in that final phase, and prove imported `.npmrc` and full-license destination bytes remain unchanged.
- [ ] `S2-T040` Run exact-head CI/provenance/NOTICE/characterization qualification, resolve reviews, expected-head merge, and post-merge verify.

002B–002G must be separately refined/authorized after their true dependencies are known from canonical 002A evidence. 002H remains blocked unless exact separate rights evidence is accepted.

## Explicit blockers/non-grants

- `S2-B001` `packages/ee/**` is restricted/not import-authorized without separately accepted rights covering the exact intended action.
- `S2-B002` Non-EE paths are not authorized merely by repository-level AGPL metadata; exact path-level evidence is required. The only currently authorized Documenso path is exact 002A1 `.npmrc`.
- `S2-B003` Generic founder approval did not substitute for Stage R; S2-T032/S2-T033 were satisfied only by their independently reviewed canonical authorization/effectiveness chain.
- `S2-B004` No copied/adapted upstream code may be mechanically relicensed.
- `S2-B005` No source-import record may treat syntactic validator PASS as proof of review independence, rights, or canonical authorization.
- `S2-B006` No app/mobile/signing/compliance/distribution claim follows from brownfield baseline import.
- `S2-B007` No implementation of Specification 003 is authorized by shaping or baseline characterization.
- `S2-B008` The exact 002A1 `.npmrc` L002 blocker is resolved canonically by PR #41 only for that path/revision. All other insufficiently evidenced paths remain fail-closed, and the separate Stage R scope does not expand beyond exact 002A1.

## Current frontier

After this ledger reconciliation itself is independently reviewed, guarded-merged, and post-merge verified, the next canonical dependency is:

`S2-T034 — create the authorized 002A1 implementation branch from exact canonical main`.

No upstream or external license bytes may enter Signthos on this reconciliation branch.