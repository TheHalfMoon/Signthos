# 002A1 Implementation Closeout — npm Project-Resolution Policy Seed

Status: `CLOSEOUT_CANDIDATE / POSTMERGE_VERIFIED / SUCCESSOR_AUTHORITY_UNRESOLVED`

## Purpose

Reconcile the completed implementation evidence for the first canonically authorized Specification 002 grain without expanding import authority.

This document is Signthos-authored bookkeeping/governance evidence. It imports no new upstream bytes, changes no source-import record, changes no deterministic `NOTICE`, and authorizes no successor source path or grain.

## Canonical implementation result

PR #46 implemented only `002A1 — npm project-resolution policy seed`.

- canonical pre-implementation base: `ca0409e3b5f40deba0c14987d591d1860d902ad1`
- exact final PR head: `7be77fad7190c36b89588610627876e637827472`
- guarded merge: `7c10ec2a3d25f73e8cd37e6ff7bf5db41cdaf019`
- merge tree: `fecabda1ab16bfe1888c134cf8e749e142204eac`
- ordered merge parents:
  1. `ca0409e3b5f40deba0c14987d591d1860d902ad1`
  2. `7be77fad7190c36b89588610627876e637827472`
- GitHub merge verification: `verified=true`, `reason=valid`

The base-to-merge change surface is exactly eight authorized paths:

1. `.npmrc`
2. `LICENSES/AGPL-3.0-only.txt`
3. `NOTICE`
4. `provenance/imports/U001-I0001.json`
5. `specs/002-documenso-brownfield-baseline/characterization-002a1-npm-policy.md`
6. `specs/002-documenso-brownfield-baseline/implementation-002a1-npm-policy.md`
7. `specs/002-documenso-brownfield-baseline/qualification-002a1-import-review.md`
8. `specs/002-documenso-brownfield-baseline/tasks.md`

No additional Documenso path, dependency/lockfile, `packages/ee/**`, runtime/provider/credential/deployment/relicense/rebrand/redesign, or Specification 003 surface was admitted.

## Imported byte identity

Canonical `.npmrc`:

- source: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:.npmrc`
- destination: `.npmrc`
- Git blob: `cbc6b6537fba6c69756ad16e69a35cc056791d99`
- size: `65` bytes
- SHA-256: `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`
- transformation: `COPY_EXACT` / provenance kind `copied`
- SPDX: `AGPL-3.0-only`

Canonical full-license artifact:

- source: `spdx/license-list-data@3ac5a9c241d97f95b22a5e366c9c841404a35639:text/AGPL-3.0-only.txt`
- destination: `LICENSES/AGPL-3.0-only.txt`
- Git blob: `0c97efd25b5974b974ed9a8a18207bc4f55bb338`
- size: `34020` bytes
- SHA-256: `d8a6cc31abc16b6748c7a21f21611f5a1ec33f67d22ca23d7da1c19b95496bee`

An earlier branch-local non-matching license artifact was rejected fail-closed and repaired forward-only before `.npmrc` admission. The rejected blob is not present in the final candidate or canonical merge tree.

## Provenance and distribution state

Canonical `provenance/imports/U001-I0001.json` describes `.npmrc` only and records:

- `classification = oss_permitted`
- exact upstream commit/path/SHA-256
- `license.spdx = AGPL-3.0-only`
- `permission = null`
- exact destination/SHA-256
- transformation kind `copied`
- `review.status = qualified_exact_head`
- PR `46`
- independent review evidence `github:issue-comment:5540873733`

Canonical `NOTICE` is the deterministic provenance projection and contains exactly this source-import entry for 002A1:

`- U001-I0001 | destination .npmrc | source documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:.npmrc | SPDX: AGPL-3.0-only`

The NOTICE inventory summary does not replace the separately preserved full license or any other applicable distribution obligation.

## Independent review evidence

Imported-byte review:

- reviewed head: `05cffe10399722efdc060addfcf3edb8a1585ad9`
- independent reviewer: CodeRabbit
- stable evidence: `github:issue-comment:5540873733`
- result: `NO_MATERIAL_FINDING`

The reviewer independently compared both imported artifacts against their pinned upstream blobs, checked the provenance/rights boundary and complete candidate surface, and did not treat the self-authored pending marker as review PASS.

Final exact-head/delta re-evaluation:

- reviewed head: `7be77fad7190c36b89588610627876e637827472`
- independent reviewer: CodeRabbit
- stable evidence: `github:issue-comment:5541196123`
- result: `NO_MATERIAL_FINDING`

The final reviewer confirmed byte invariance, final provenance/NOTICE semantics, the bounded evidence reconciliation, exact-head CI evidence, and the absence of unauthorized surface. It explicitly did not infer guarded merge or post-merge completion.

Unresolved material review threads immediately before merge: `0`.

## Exact-head and post-merge qualification

Final PR-head Provenance workflow:

- exact head: `7be77fad7190c36b89588610627876e637827472`
- run: `33878569772`
- conclusion: `SUCCESS`

Every workflow step passed, including exact candidate identity, locked dependency graph verification, formatting, strict Clippy, complete tests, documentation tests, canonical provenance validation, and deterministic `NOTICE` check.

Post-merge Provenance workflow:

- exact canonical merge: `7c10ec2a3d25f73e8cd37e6ff7bf5db41cdaf019`
- run: `33878897083`
- event: `push` on `main`
- conclusion: `SUCCESS`

Every post-merge workflow step passed through canonical provenance validation and deterministic `NOTICE` check.

Pre-merge repository policy state was also re-read: branch protection was disabled, required status checks were empty, repository rulesets were empty, and the neutral Cubic plan-limit check was not represented as PASS or as a required gate.

## S2-T040 determination

All operations required by `S2-T040` for exact 002A1 are now evidenced:

1. final exact-head CI/provenance/NOTICE qualification passed;
2. imported-byte independent review existed before provenance qualification;
3. fresh final exact-head/delta independent re-evaluation reported no material finding;
4. unresolved material review threads were zero;
5. expected base/head were unchanged at the guarded merge boundary;
6. merge used `expected_head_sha=7be77fad7190c36b89588610627876e637827472` and the repository's normal merge-commit method;
7. canonical post-merge ancestry, surface, imported/license bytes, provenance, NOTICE, CI, and governance were reverified.

Therefore this closeout candidate records:

`S2-T040 = SATISFIED_BY_CANONICAL_PR46_EVIDENCE`

This statement becomes canonical bookkeeping only after this closeout unit itself receives independent substantive review, guarded merge, and post-merge verification.

## Successor-authority determination

PR #46 closes only the exact `002A1` implementation unit. It does not establish that the broader `002A — repository/workspace baseline` is complete and it does not authorize 002A2, 002B, or any later grain.

Canonical Specification 002 requires recursive refinement when a grain's exact allowlist or review surface is too broad. It also requires every future import grain to obtain an exact path allowlist, path-level license/notice evidence, provenance qualification, independent review, and a separate canonical implementation authorization before source import.

Accordingly, after this closeout becomes canonical, the next permitted activity is planning/qualification only:

`002A successor discovery — determine the next minimum repository/workspace dependency, if any, from the pinned upstream snapshot without importing source bytes.`

That discovery must decide from evidence whether 002A is complete with 002A1 or whether another narrowly bounded 002A subgrain is necessary. It must not presume that previously excluded broad root files (`package.json`, `package-lock.json`, `turbo.json`) are authorized or appropriately bounded.

No successor implementation authority is created here.

## Carried blockers and non-grants

- `packages/ee/**` remains `RESTRICTED / NOT_IMPORT_AUTHORIZED` absent separately accepted exact-scope rights evidence.
- All non-EE successor paths remain unimportable until exact path-level evidence and separate canonical authorization exist.
- No dependency installation, package-network access, provider, credential, paid service, deployment, relicensing, global rename/rebrand, redesign, domain/schema migration, or Specification 003 work is authorized by this closeout.
- Issue #5 planning authority does not substitute for the separate per-grain import-authorization handoff.
- Completion of 002A1 does not imply completion of Specification 002.

## Closeout gate

This closeout unit may be merged only after fresh independent substantive review of its exact final head, reconciliation of every material finding, zero unresolved material review threads, re-verification of unchanged expected base/head, and guarded merge with `expected_head_sha`.

After merge, canonical `main` must be re-read and this closeout surface verified before successor discovery begins.
