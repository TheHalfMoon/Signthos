# Specification 001 — Canonical Task Ledger

Status: CLOSED_CANONICAL
Issue: #4
Authorized from canonical `main`: `2144b7765595a206e691f43aefd122aa5a150a1b`
Canonical closeout predecessor: `64e1db6e1b44a1513f51ec6f1a809e5ed7a721bc`

Legend:

- `[x]` — canonical evidence exists and the bounded requirement is satisfied on the Spec 001 lineage.
- `[ ]` — task is not canonically complete.

This reconciled ledger records the canonical task state after Grain J merged and post-merge verification succeeded. Historical detailed evidence remains preserved in PRs #23 through #35, Issue #4, and `closeout.md`. A checked task does not waive any preserved external blocker or authorize Specification 002.

## S1-A — shaping and authorization binding

- [x] `S1-T001` Re-read canonical Foundation closeout and bind Specification 001 to Issue #4 and canonical authorization commit `2144b7765595a206e691f43aefd122aa5a150a1b`.
- [x] `S1-T002` Define the bounded problem, goals, authority, source-import prohibitions and closeout acceptance criteria in `spec.md`.
- [x] `S1-T003` Choose canonical v1 JSON records, strict typed validation and the self-reference-safe byte-digest binding model.
- [x] `S1-T004` Define the standalone Rust `signthos-provenance` architecture and offline-by-default local Git verification boundary.
- [x] `S1-T005` Decompose implementation into dependency-ordered grains with explicit path allowlists and no product runtime/source authority.
- [x] `S1-T006` Define fixture, process, security/resource, deterministic-output and CI qualification strategy.
- [x] `S1-T007` Obtain independent substantive review of the exact shaping candidate covering `spec.md`, `plan.md` and `tasks.md`.
- [x] `S1-T008` Reconcile every shaping review finding and obtain exact-head re-evaluation after normative amendment.
- [x] `S1-T009` Record exact-head shaping qualification, accurately distinguishing absent/skipped checks from PASS.
- [x] `S1-T010` Merge the exact qualified shaping head with `expected_head_sha` protection.
- [x] `S1-T011` Post-merge verify canonical `main` contains only the intended shaping surface and re-read Issue #4/governance before implementation.

Canonical shaping evidence: PR #23, exact qualified head `6e56c7dcb9857e80415f5cf795bea07d77cf06be`, guarded merge `08022382524cec92fc0e829b2666568b17822c0f`.

## S1-B — Rust bootstrap and component provenance

Dependency: `S1-T011`.

- [x] `S1-T012` Create a fresh implementation branch from the exact post-shaping canonical `main`; do not continue implementation on the shaping branch.
- [x] `S1-T013` Create `tools/provenance/Cargo.toml`, `Cargo.lock`, minimal source layout and CLI entry point without network/runtime integration.
- [x] `S1-T014` Pin the Rust edition and minimum supported Rust version candidate based on live toolchain/dependency evidence; document any MSRV limitation explicitly.
- [x] `S1-T015` Pin the minimum dependency set and verify exact locked versions/checksums/source origins, including the maintained SPDX parser.
- [x] `S1-T016` Create the v1 component schema and bootstrap component registry covering every direct/transitive dependency used by `signthos-provenance`.
- [x] `S1-T017` Record exact dependency license evidence without inferring permissive status from package names or repository ownership.
- [x] `S1-T018` Implement CLI command shell and stable exit-code contract `0`–`4` with focused process tests.
- [x] `S1-T019` Run formatting, linting and focused/full bootstrap tests; record exact commands/results.
- [x] `S1-T020` Prove the Grain B diff contains only bootstrap/component-provenance allowed paths and no product/upstream source.
- [x] `S1-T021` Obtain independent substantive exact-head review of Grain B, reconcile findings, qualify, expected-head merge, and post-merge verify before Grain C.

Canonical Grain B evidence: PR #24, exact qualified head `0ef82ddb15ebf686d03ad85970f3c33c5964af66`, guarded merge `f0932f537197431f65fc4e1debf40ad1b2ea438b`.

## S1-C — canonical schemas, strict loading and import readiness

Dependency: `S1-T021`.

- [x] `S1-T022` Create v1 source-import JSON Schema with closed object shapes and required semantic fields, including review status/PR/evidence and import date.
- [x] `S1-T023` Create v1 policy JSON Schema and align component schema with the canonical Rust models.
- [x] `S1-T024` Implement strict source-import/component/policy typed deserialization with unknown-field rejection.
- [x] `S1-T025` Enforce per-record and total-run byte limits before unbounded allocation/deserialization.
- [x] `S1-T026` Validate canonical ids, exact 40-character lowercase hexadecimal v1 Git object id, lowercase SHA-256 digests and normalized relative POSIX paths.
- [x] `S1-T026A` Enforce semantic proleptic-Gregorian `import.date` in exact zero-padded ASCII `YYYY-MM-DD` form, including year range `0001`–`9999`, leap-year rules and impossible-date rejection.
- [x] `S1-T026B` Enforce source-import review vocabulary `pending|qualified_exact_head|rejected`, positive immutable Signthos PR identity and non-empty review evidence; only `qualified_exact_head` may pass canonical/import-ready validation.
- [x] `S1-T026C` Preserve the two-stage authorization handoff: pending exact imported-byte review, manifest-only qualification amendment, independent exact-head/delta re-evaluation, and external Diffciplane qualification without a self-referential current-commit field.
- [x] `S1-T026D` Enforce the canonical offline review-evidence grammar `^github:(issue-comment|pull-request-review|pull-request-review-comment):[1-9][0-9]*$` and reject arbitrary text, URLs, unsupported kinds, non-canonical/mutable ids and non-ASCII decimal forms with record-local `REVIEW_*` diagnostics.
- [x] `S1-T026E` Keep semantic verification that a canonical evidence reference exists, is independent/substantive, belongs to the declared PR and covers the applicable exact head outside local syntax validation as a mandatory live Diffciplane gate; absence/failure blocks external qualification/merge rather than local `validate`, and a local PASS never implies qualification.
- [x] `S1-T027` Reject absolute paths, traversal, backslash aliases, malformed normalization and duplicate semantic identities/destination claims.
- [x] `S1-T028` Implement stable deterministic diagnostic model and `validate` / `validate --json` baseline output, including `DATE_*` and record-local `REVIEW_*` families.
- [x] `S1-T029` Add valid/invalid synthetic fixtures for every Grain C record-local failure rule.
- [x] `S1-T030` Run focused/full tests, exact dependency-graph/component-registry reconciliation, and change-surface proof.
- [x] `S1-T031` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain C.

Canonical Grain C evidence: PR #27, exact qualified/reviewed head `5987bc08a386f569b4d352ed6d090ea1655e9783`, guarded merge `74827276d37ff9ba3794d7da28818ae454762651`.

## S1-D — SPDX and license policy

Dependency: `S1-T031`.

- [x] `S1-T032` Integrate the pinned maintained SPDX parser through a narrow adapter boundary.
- [x] `S1-T033` Add `provenance/policy/license-policy.json` with versioned Signthos license-expression rules.
- [x] `S1-T034` Reject syntactically invalid and unknown SPDX identifiers.
- [x] `S1-T035` Reject prohibited ambiguous/deprecated shorthand including bare `AGPL-3.0`; require explicit `-only`/`-or-later` semantics where applicable.
- [x] `S1-T036` Fail closed on conflicting license evidence and disallow `LicenseRef-*` from independently authorizing source import in v1.
- [x] `S1-T037` Add deterministic `SPDX_*` diagnostics and complete valid/invalid fixtures.
- [x] `S1-T038` Reconcile bootstrap component license records under the now-functional policy validator.
- [x] `S1-T039` Run focused/full tests and exact change-surface proof.
- [x] `S1-T040` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain D.

Canonical Grain D evidence: PR #29, exact qualified/reviewed head `532f1a63e7b1be582e8f8bff3de01446fcc4d69f`, guarded merge `79de3dcb5e1f44cb6bf3a2f20e9e1188435a9a1e`.

## S1-E — restricted paths and permission scopes

Dependency: `S1-T040`.

- [x] `S1-T041` Create versioned `restricted-paths.json` policy data with canonical repository identities and deterministic path-match semantics.
- [x] `S1-T042` Encode Foundation-known Documenso EE/commercial boundaries as `require_permission`/deny policy data without copying product source.
- [x] `S1-T043` Encode Foundation-known Stirling separately licensed/restricted boundaries as fail-closed policy data without copying product source.
- [x] `S1-T044` Implement deterministic policy precedence where a more-specific deny cannot be weakened by a broad allow.
- [x] `S1-T045` Implement controlled permission-artifact references that never require confidential artifact contents in the public repository.
- [x] `S1-T046` Implement v1 permission-scope vocabulary and minimum-required-scope derivation for declared transformation/distribution intent.
- [x] `S1-T047` Fail separate-permission records when artifact reference or required scope is missing; keep `restricted` and `unknown` import-denying.
- [x] `S1-T048` Add `PERMISSION_*` and `RESTRICTED_PATH_*` diagnostics plus synthetic fixtures.
- [x] `S1-T049` Run focused/full tests and prove no Documenso/Stirling product source entered the grain.
- [x] `S1-T050` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain E.

Canonical Grain E evidence: PR #30, exact qualified/reviewed head `c922bf8d5569d4ae35853fc96df83b46c7bb4a3b`, guarded merge `0b0821ed8f97b01c9b3131597f5ecb8c22143472`.

## S1-F — derivation and distribution guards

Dependency: `S1-T050`.

- [x] `S1-T051` Implement explicit provenance relationship model for copied/adapted/rewritten/generated source records.
- [x] `S1-T052` Prevent a copyleft/restricted derivation from receiving a less restrictive destination classification without explicit accepted relicensing evidence.
- [x] `S1-T053` Treat unknown derivation/relicensing facts as blocking rather than inferring independence from directory/package separation.
- [x] `S1-T054` Implement distribution-surface vocabulary and review states `not_applicable`, `pending`, `approved_with_evidence`, `blocked`.
- [x] `S1-T055` Require stable evidence references for `approved_with_evidence` and prevent SPDX expressions from auto-approving store/mobile compatibility.
- [x] `S1-T056` Add `DERIVATION_*` and `DISTRIBUTION_*` diagnostics and fixtures.
- [x] `S1-T057` Run focused/full tests and exact change-surface proof.
- [x] `S1-T058` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain F.

Canonical Grain F evidence: PR #31, exact qualified/reviewed head `c0f0aebd756cceb1eec176128986df9b00bef3a7`, guarded merge `3769bb19c2524dae7cf40728d796e47ca0a2505f`.

## S1-G — deterministic NOTICE

Dependency: `S1-T058`.

- [x] `S1-T059` Define deterministic NOTICE input projection from validated component/import records.
- [x] `S1-T060` Implement stable sort/template/UTF-8/LF generation without timestamp, host path or mutable network data.
- [x] `S1-T061` Implement `notice` and `notice --check` commands.
- [x] `S1-T062` Add byte-for-byte determinism and drift-detection tests.
- [x] `S1-T063` Ensure NOTICE output does not pretend to replace required full license texts or attribution artifacts.
- [x] `S1-T064` Generate the canonical `NOTICE` for the Spec 001 component/tooling set.
- [x] `S1-T065` Run focused/full tests and exact change-surface proof.
- [x] `S1-T066` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain G.

Canonical Grain G evidence: PR #32, exact qualified/reviewed head `2f333a8afc1eed301ae346efa6624ce7e4028647`, guarded merge `2817bd71edc5b8fb952127a5d6bcd52630c16f30`.

## S1-H — offline source verification

Dependency: `S1-T066`.

- [x] `S1-T067` Implement an isolated local Git process adapter with no shell interpolation and deterministic error mapping.
- [x] `S1-T068` Implement `verify-source --record <id> --source-root <path>` against caller-supplied local checkout only.
- [x] `S1-T069` Verify local Git HEAD equals exact manifest upstream commit and repository identity matches policy expectations.
- [x] `S1-T070` Verify upstream path existence and source SHA-256 digest at the pinned revision.
- [x] `S1-T071` Reject symlink/path escapes outside the supplied source root.
- [x] `S1-T072` Add synthetic temporary Git repository tests for valid revision, drift, missing path, digest mismatch and missing local `git`/I/O failures.
- [x] `S1-T073` Prove normal `validate` performs no network operation and `verify-source` never fetches/clones.
- [x] `S1-T074` Run focused/full tests and exact change-surface proof.
- [x] `S1-T075` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain H.

Canonical Grain H evidence: PR #33, exact qualified/reviewed head `2d0de4de62b0abb0ab0df0ab6dc93d99d0037c2f`, guarded merge `9acd25872e380a35b27382acf7a7e64aaee4d70e`.

## S1-I — repository integration and CI

Dependency: `S1-T075`.

- [x] `S1-T076` Create root canonical provenance record directories/readmes needed by contributors without adding product-source imports.
- [x] `S1-T077` Add bounded contributor invocation/documentation in `README.md` and/or `AGENTS.md` only where necessary.
- [x] `S1-T078` Add `.github/workflows/provenance.yml` with formatting, clippy, tests, locked validation and NOTICE drift gates.
- [x] `S1-T079` Ensure CI requires no secrets or paid services and uses `--locked` dependency resolution.
- [x] `S1-T080` Confirm all Spec 001 fixtures/records validate on the exact candidate head.
- [x] `S1-T081` Confirm `NOTICE` is byte-current under `notice --check` on the exact candidate head.
- [x] `S1-T082` Capture exact GitHub Actions workflow/job evidence and distinguish any skipped/unavailable checks from PASS.
- [x] `S1-T083` Run complete local/CI qualification command set and exact change-surface reconciliation.
- [x] `S1-T084` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain I.

Canonical Grain I evidence: PR #34, exact qualified/reviewed head `fc7b4c47f651a029d92f3846681ccc72a17d2fa5`, exact-head Provenance run `33819924370` SUCCESS, guarded merge `821201d2d6f7c87d9a4c7ab8f567ea889addbee6`, post-merge Provenance run `33827770232` SUCCESS.

## S1-J — canonical closeout

Dependency: `S1-T084`.

- [x] `S1-T085` Re-read canonical Constitution, `AGENTS.md`, ROADMAP, Issue #4, Foundation provenance/licensing plans and the entire Spec 001 ledger from post-Grain-I `main`.
- [x] `S1-T086` Reconcile the complete Spec 001 change surface and prove no unauthorized upstream product/application source is present.
- [x] `S1-T087` Verify every direct/transitive `signthos-provenance` dependency is represented by validated component provenance and has no unresolved license state.
- [x] `S1-T088` Re-run full formatting, clippy, tests, validator self-check, NOTICE check and exact-head GitHub Actions qualification.
- [x] `S1-T089` Obtain independent substantive semantic review of the complete exact Spec 001 closeout candidate, including schemas, code, policy, fixtures, component records, NOTICE, CI and authority boundaries.
- [x] `S1-T090` Reconcile all review findings and obtain independent exact-head/delta re-evaluation after any normative or code amendment.
- [x] `S1-T091` Confirm no unresolved PR review threads remain and record exact-head qualification without treating summaries/status bots as semantic review evidence.
- [x] `S1-T092` Merge the exact qualified closeout head with `expected_head_sha` protection.
- [x] `S1-T093` Post-merge verify canonical `main`, including exact merge ancestry, full validation/NOTICE state and source-import absence.
- [x] `S1-T094` Update Issue #4 and Spec 001 bookkeeping to `CLOSED_CANONICAL` only through a separately reviewed closeout record if post-merge evidence requires bookkeeping mutation.
- [x] `S1-T095` Re-read canonical governance and determine separately whether Specification 002 is genuinely authorized; do not infer authority from Spec 001 completion alone.

Grain J merge-line evidence:

- PR: #35
- exact qualified/reviewed head: `884385b8f90aa8b15ed151edcd23a1eeaca7a808`
- exact-head Provenance run: `33827963750` — SUCCESS
- independent substantive exact-head review: CodeRabbit run `72e4ab7c-ee3c-4838-9b92-dfc3467f66ea` — no actionable findings
- unresolved material review threads: zero
- guarded merge: `64e1db6e1b44a1513f51ec6f1a809e5ed7a721bc`
- merge tree: `bfd103e738016d60a504e8b99778ca7959d582dd`
- ordered parents: `821201d2d6f7c87d9a4c7ab8f567ea889addbee6`, then `884385b8f90aa8b15ed151edcd23a1eeaca7a808`
- GitHub commit verification: `verified=true`, `reason=valid`
- post-merge Provenance run: `33836244076` — SUCCESS on exact canonical `main`

`S1-T094` is satisfied by the separately reviewed post-Grain-J bookkeeping reconciliation that contains this ledger. Its own exact-head CI/review/merge/post-merge evidence must be recorded before Issue #4 is closed.

`S1-T095` successor determination after the Grain J merge is: **Specification 002 remains `UNAUTHORIZED`**. `ROADMAP.md` defines dependency order only and explicitly states that specification numbers do not authorize implementation by themselves. No separate canonical Specification 002 authorization exists at this reconciliation point.

## Explicit blockers carried through Spec 001

These are not waived by any checked task in this ledger:

- `B001` Documenso EE/commercial rights evidence.
- `B002` exact Signthos component/repository licensing compatibility before derived/imported product-code release.
- `B003` Stirling restricted-source rights.
- `B004` exact mobile/App Store/Play distribution compatibility against the shipped dependency/derivation graph.
- `B005` signing/PAdES/regulatory capability evidence.
- `B006` reproducible market/pricing evidence for hard business gates.

## Canonical completion rule

Specification 001 is `CLOSED_CANONICAL` only after this post-Grain-J bookkeeping change itself passes exact-head Provenance qualification, fresh independent substantive review, zero unresolved material threads, guarded expected-head merge, post-merge verification, and Issue #4 reconciliation.

Until that bookkeeping PR is merged and post-merge verified, this branch is only a closeout candidate despite the reconciled task values above.

Specification 002 remains `UNAUTHORIZED` unless a separate canonical governance action explicitly authorizes it.