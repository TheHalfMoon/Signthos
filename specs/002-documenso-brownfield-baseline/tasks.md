# Specification 002 — Canonical Task Ledger

Status: `SHAPING_CANDIDATE / PLANNING_ONLY`
Issue: #5
Canonical shaping base: `8e3a3ab8f1b889a6e13a82a5449f4a3b8c3a6167`

Legend:

- `[x]` — the shaping candidate contains evidence for this bounded task; it is not canonical until the shaping PR itself satisfies review/merge/post-merge gates.
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
- [ ] `S2-T015` Obtain fresh independent substantive review of the exact shaping candidate.
- [ ] `S2-T016` Reconcile every material shaping review finding and obtain exact-head/delta re-evaluation after amendments.
- [ ] `S2-T017` Record exact-head shaping qualification accurately, including `NO_APPLICABLE_RUN` for any absent workflow rather than representing absence as PASS.
- [ ] `S2-T018` Confirm zero unresolved material review threads and unchanged expected base/head immediately before merge.
- [ ] `S2-T019` Merge the exact qualified shaping head with `expected_head_sha` protection.
- [ ] `S2-T020` Post-merge verify canonical `main`, exact ancestry/surface, Issue #5/governance, and that source import remains unauthorized.

### Shaping path allowlist

Only:

- `specs/002-documenso-brownfield-baseline/spec.md`
- `specs/002-documenso-brownfield-baseline/plan.md`
- `specs/002-documenso-brownfield-baseline/tasks.md`
- `specs/002-documenso-brownfield-baseline/snapshot.md`
- Issue #5 comments/metadata for evidence/status only

Explicitly prohibited during shaping:

- Documenso source files;
- Signthos product/runtime source;
- source-import JSON records;
- dependency manifests/lockfiles;
- workflows/CI configuration changes;
- `NOTICE` changes;
- credentials/paid services;
- permission-rights promotion;
- Specification 003 implementation.

## S2-Q — first pre-import qualification packet

Dependency: `S2-T020`.

This stage remains planning/evidence-only and may proceed only if live governance continues to permit planning.

**Stage Q admits zero upstream-derived bytes and zero source-import records.** Its separately reviewed allowlist may contain only explicitly named Signthos-authored qualification/evidence documents. Upstream facts may be referenced by immutable repository/path/SHA/digest/license identifiers and independently authored descriptions, but no copied, adapted, vendored, embedded, generated-from, or otherwise upstream-derived source, test, manifest, lockfile, configuration, asset, schema, patch, fixture, license copy, or other upstream file content may be committed before Stage R authorization.

- [ ] `S2-T021` Select one first proposed grain, expected to be a recursively refined subset of 002A, without authorizing import.
- [ ] `S2-T022` Reconfirm or canonically amend the exact upstream snapshot before building the packet.
- [ ] `S2-T023` Produce an exact file-level upstream allowlist candidate and Signthos destination map for that one proposed grain as Signthos-authored evidence only, without admitting listed upstream bytes.
- [ ] `S2-T024` Classify the most-specific license, notices, copyright/provenance, generated/vendor/third-party state, and transformation for every candidate path using evidence references/independently authored analysis only.
- [ ] `S2-T025` Exclude every `packages/ee/**`, restricted, unknown, conflicting, or insufficiently evidenced path unless a separate accepted rights artifact applies to that exact path/action.
- [ ] `S2-T026` Identify the minimum workspace/dependency/build surface required for reproducible characterization; reject unrelated upstream configuration without copying any candidate configuration.
- [ ] `S2-T027` Define independently authored characterization tests first; identify any upstream test files proposed for later import as separately provenance-controlled paths without copying/adapting them in Stage Q.
- [ ] `S2-T028` Define exact source/destination digest generation and the pending-to-qualified authorization delta workflow for the proposed grain without creating canonical source-import records.
- [ ] `S2-T029` Validate only Signthos-authored qualification/evidence artifacts with applicable canonical tooling; do not commit any upstream-derived bytes or any source-import record before Stage R authorization.
- [ ] `S2-T030` Obtain independent substantive exact-head review of the qualification packet and reconcile all findings.
- [ ] `S2-T031` Merge/post-merge verify the packet under the authority then applicable, proving its exact surface contains zero upstream-derived bytes and zero source-import records.

## S2-R — separate implementation authorization

Dependency: `S2-T031`.

All tasks below are intentionally unchecked. Ordinary founder approval, roadmap order, a valid provenance schema, or completion of planning cannot satisfy them implicitly.

- [ ] `S2-T032` Record a separate canonical authorization that explicitly names the first import grain, exact upstream snapshot, canonical path allowlist, allowed Signthos destination surface, rights/permission evidence where needed, and required review/qualification gates.
- [ ] `S2-T033` Re-read canonical governance after that authorization and prove it is effective on `main` before creating any source-import branch.

`IMPORT_IMPLEMENTATION_AUTHORITY = ABSENT` until `S2-T032` and `S2-T033` are canonically satisfied.

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

## Current frontier

`S2-T015` — independent substantive exact-head review of the shaping candidate.

Implementation/source import remains unauthorized.
