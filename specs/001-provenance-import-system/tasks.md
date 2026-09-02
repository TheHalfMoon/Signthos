# Specification 001 — Canonical Task Ledger

Status: SHAPING_RECONCILIATION
Issue: #4
Authorized from canonical `main`: `2144b7765595a206e691f43aefd122aa5a150a1b`

Legend:

- `[x]` — task evidence exists and the bounded requirement is satisfied on the current Spec 001 lineage.
- `[ ]` — task is not yet canonically complete.

A checked implementation task does not imply the PR, grain or specification is merge-qualified. Independent exact-head review, CI/evidence gates, expected-head merge protection and post-merge verification remain separately required.

## S1-A — shaping and authorization binding

- [x] `S1-T001` Re-read canonical Foundation closeout and bind Specification 001 to Issue #4 and canonical authorization commit `2144b7765595a206e691f43aefd122aa5a150a1b`.
- [x] `S1-T002` Define the bounded problem, goals, authority, source-import prohibitions and closeout acceptance criteria in `spec.md`.
- [x] `S1-T003` Choose canonical v1 JSON records, strict typed validation and the self-reference-safe byte-digest binding model.
- [x] `S1-T004` Define the standalone Rust `signthos-provenance` architecture and offline-by-default local Git verification boundary.
- [x] `S1-T005` Decompose implementation into dependency-ordered grains with explicit path allowlists and no product runtime/source authority.
- [x] `S1-T006` Define fixture, process, security/resource, deterministic-output and CI qualification strategy.
- [x] `S1-T007` Obtain independent substantive review of the exact shaping candidate covering `spec.md`, `plan.md` and `tasks.md`.
- [ ] `S1-T008` Reconcile every shaping review finding and obtain exact-head re-evaluation after normative amendment.
- [ ] `S1-T009` Record exact-head shaping qualification, accurately distinguishing absent/skipped checks from PASS.
- [ ] `S1-T010` Merge the exact qualified shaping head with `expected_head_sha` protection.
- [ ] `S1-T011` Post-merge verify canonical `main` contains only the intended shaping surface and re-read Issue #4/governance before implementation.

### S1-T007 review evidence

CodeRabbit issue comment `5512755250` substantively reviewed exact shaping head:

`16d769d0dc00448c65a55119d12a2552c631b55a`

against base:

`2144b7765595a206e691f43aefd122aa5a150a1b`

Result: `ACTIONABLE FINDINGS`.

The reviewer confirmed the shaping-only three-file surface and found no product source, Rust tooling, dependency manifests, CI workflow, credentials, paid-service configuration or Specification 002 implementation.

Two findings require reconciliation before qualification:

1. source-import records must bind import-ready state to a controlled review status, positive immutable Signthos PR identity and stable non-secret substantive review-evidence reference; pending/missing/rejected authorization must fail canonical validation while final exact-head qualification remains externally recorded to avoid self-reference;
2. `import.date` must receive executable strict Gregorian `YYYY-MM-DD` validation with leap-day/impossible-date fixtures rather than relying on a conceptual string or non-enforced JSON Schema format.

The current reconciliation amends `spec.md`, `plan.md` and this ledger only. `S1-T008` remains open until an independent reviewer re-evaluates the amended exact head.

### Shaping path allowlist

Only:

- `specs/001-provenance-import-system/spec.md`
- `specs/001-provenance-import-system/plan.md`
- `specs/001-provenance-import-system/tasks.md`
- Issue #4 metadata/comments

No runtime/toolchain/dependency changes are authorized before `S1-T011`.

## S1-B — Rust bootstrap and component provenance

Dependency: `S1-T011`.

- [ ] `S1-T012` Create a fresh implementation branch from the exact post-shaping canonical `main`; do not continue implementation on the shaping branch.
- [ ] `S1-T013` Create `tools/provenance/Cargo.toml`, `Cargo.lock`, minimal source layout and CLI entry point without network/runtime integration.
- [ ] `S1-T014` Pin the Rust edition and minimum supported Rust version candidate based on live toolchain/dependency evidence; document any MSRV limitation explicitly.
- [ ] `S1-T015` Pin the minimum dependency set and verify exact locked versions/checksums/source origins, including the maintained SPDX parser.
- [ ] `S1-T016` Create the v1 component schema and bootstrap component registry covering every direct/transitive dependency used by `signthos-provenance`.
- [ ] `S1-T017` Record exact dependency license evidence without inferring permissive status from package names or repository ownership.
- [ ] `S1-T018` Implement CLI command shell and stable exit-code contract `0`–`4` with focused process tests.
- [ ] `S1-T019` Run formatting, linting and focused/full bootstrap tests; record exact commands/results.
- [ ] `S1-T020` Prove the Grain B diff contains only bootstrap/component-provenance allowed paths and no product/upstream source.
- [ ] `S1-T021` Obtain independent substantive exact-head review of Grain B, reconcile findings, qualify, expected-head merge, and post-merge verify before Grain C.

### Grain B path allowlist

- `tools/provenance/**`
- `provenance/components/**`
- `provenance/schema/v1/component.schema.json`
- `provenance/fixtures/**` only for bootstrap component fixtures
- Spec 001 evidence bookkeeping only where required

Explicitly prohibited:

- Documenso/Stirling application source;
- product runtime/application directories;
- credentials or paid service configuration.

## S1-C — canonical schemas, strict loading and import readiness

Dependency: `S1-T021`.

- [ ] `S1-T022` Create v1 source-import JSON Schema with closed object shapes and required semantic fields, including review status/PR/evidence and import date.
- [ ] `S1-T023` Create v1 policy JSON Schema and align component schema with the canonical Rust models.
- [ ] `S1-T024` Implement strict source-import/component/policy typed deserialization with unknown-field rejection.
- [ ] `S1-T025` Enforce per-record and total-run byte limits before unbounded allocation/deserialization.
- [ ] `S1-T026` Validate canonical ids, exact 40-character lowercase hexadecimal v1 Git object id, lowercase SHA-256 digests and normalized relative POSIX paths.
- [ ] `S1-T026A` Enforce semantic proleptic-Gregorian `import.date` in exact zero-padded `YYYY-MM-DD` form, including year range `0001`–`9999`, leap-year rules and impossible-date rejection.
- [ ] `S1-T026B` Enforce source-import review vocabulary `pending|qualified_exact_head|rejected`, positive immutable Signthos PR identity and non-empty stable non-secret review evidence; only `qualified_exact_head` may pass canonical/import-ready validation.
- [ ] `S1-T026C` Preserve the two-stage authorization handoff: pending exact imported-byte review, manifest-only qualification amendment, independent exact-head/delta re-evaluation, and external Diffciplane qualification without a self-referential current-commit field.
- [ ] `S1-T027` Reject absolute paths, traversal, backslash aliases, malformed normalization and duplicate semantic identities/destination claims.
- [ ] `S1-T028` Implement stable deterministic diagnostic model and `validate` / `validate --json` baseline output, including `DATE_*` and `REVIEW_*` families.
- [ ] `S1-T029` Add valid/invalid synthetic fixtures for every Grain C failure rule, including valid leap day, impossible/non-canonical dates, missing/empty review evidence, missing/non-positive PR identity, pending/rejected/unknown review states.
- [ ] `S1-T030` Run focused/full tests and change-surface proof.
- [ ] `S1-T031` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain C.

### Grain C path allowlist

- `tools/provenance/**`
- `provenance/schema/v1/**`
- `provenance/fixtures/**`
- Spec 001 evidence bookkeeping only where required

## S1-D — SPDX and license policy

Dependency: `S1-T031`.

- [ ] `S1-T032` Integrate the pinned maintained SPDX parser through a narrow adapter boundary.
- [ ] `S1-T033` Add `provenance/policy/license-policy.json` with versioned Signthos license-expression rules.
- [ ] `S1-T034` Reject syntactically invalid and unknown SPDX identifiers.
- [ ] `S1-T035` Reject prohibited ambiguous/deprecated shorthand including bare `AGPL-3.0`; require explicit `-only`/`-or-later` semantics where applicable.
- [ ] `S1-T036` Fail closed on conflicting license evidence and disallow `LicenseRef-*` from independently authorizing source import in v1.
- [ ] `S1-T037` Add deterministic `SPDX_*` diagnostics and complete valid/invalid fixtures.
- [ ] `S1-T038` Reconcile bootstrap component license records under the now-functional policy validator.
- [ ] `S1-T039` Run focused/full tests and exact change-surface proof.
- [ ] `S1-T040` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain D.

### Grain D path allowlist

- `tools/provenance/**`
- `provenance/policy/license-policy.json`
- `provenance/fixtures/**`
- `provenance/components/**` only for exact bootstrap reconciliation
- Spec 001 evidence bookkeeping only where required

## S1-E — restricted paths and permission scopes

Dependency: `S1-T040`.

- [ ] `S1-T041` Create versioned `restricted-paths.json` policy data with canonical repository identities and deterministic path-match semantics.
- [ ] `S1-T042` Encode Foundation-known Documenso EE/commercial boundaries as `require_permission`/deny policy data without copying product source.
- [ ] `S1-T043` Encode Foundation-known Stirling separately licensed/restricted boundaries as fail-closed policy data without copying product source.
- [ ] `S1-T044` Implement deterministic policy precedence where a more-specific deny cannot be weakened by a broad allow.
- [ ] `S1-T045` Implement controlled permission-artifact references that never require confidential artifact contents in the public repository.
- [ ] `S1-T046` Implement v1 permission-scope vocabulary and minimum-required-scope derivation for declared transformation/distribution intent.
- [ ] `S1-T047` Fail separate-permission records when artifact reference or required scope is missing; keep `restricted` and `unknown` import-denying.
- [ ] `S1-T048` Add `PERMISSION_*` and `RESTRICTED_PATH_*` diagnostics plus synthetic fixtures.
- [ ] `S1-T049` Run focused/full tests and prove no Documenso/Stirling product source entered the grain.
- [ ] `S1-T050` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain E.

### Grain E path allowlist

- `tools/provenance/**`
- `provenance/policy/**`
- `provenance/permissions/README.md`
- `provenance/fixtures/**`
- Spec 001 evidence bookkeeping only where required

## S1-F — derivation and distribution guards

Dependency: `S1-T050`.

- [ ] `S1-T051` Implement explicit provenance relationship model for copied/adapted/rewritten/generated source records.
- [ ] `S1-T052` Prevent a copyleft/restricted derivation from receiving a less restrictive destination classification without explicit accepted relicensing evidence.
- [ ] `S1-T053` Treat unknown derivation/relicensing facts as blocking rather than inferring independence from directory/package separation.
- [ ] `S1-T054` Implement distribution-surface vocabulary and review states `not_applicable`, `pending`, `approved_with_evidence`, `blocked`.
- [ ] `S1-T055` Require stable evidence references for `approved_with_evidence` and prevent SPDX expressions from auto-approving store/mobile compatibility.
- [ ] `S1-T056` Add `DERIVATION_*` and `DISTRIBUTION_*` diagnostics and fixtures.
- [ ] `S1-T057` Run focused/full tests and exact change-surface proof.
- [ ] `S1-T058` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain F.

### Grain F path allowlist

- `tools/provenance/**`
- `provenance/schema/v1/**` only for compatible bounded refinement
- `provenance/policy/**`
- `provenance/fixtures/**`
- Spec 001 evidence bookkeeping only where required

## S1-G — deterministic NOTICE

Dependency: `S1-T058`.

- [ ] `S1-T059` Define deterministic NOTICE input projection from validated component/import records.
- [ ] `S1-T060` Implement stable sort/template/UTF-8/LF generation without timestamp, host path or mutable network data.
- [ ] `S1-T061` Implement `notice` and `notice --check` commands.
- [ ] `S1-T062` Add byte-for-byte determinism and drift-detection tests.
- [ ] `S1-T063` Ensure NOTICE output does not pretend to replace required full license texts or attribution artifacts.
- [ ] `S1-T064` Generate the canonical `NOTICE` for the Spec 001 component/tooling set.
- [ ] `S1-T065` Run focused/full tests and exact change-surface proof.
- [ ] `S1-T066` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain G.

### Grain G path allowlist

- `tools/provenance/**`
- `provenance/components/**`
- `provenance/fixtures/**`
- `NOTICE`
- Spec 001 evidence bookkeeping only where required

## S1-H — offline source verification

Dependency: `S1-T066`.

- [ ] `S1-T067` Implement an isolated local Git process adapter with no shell interpolation and deterministic error mapping.
- [ ] `S1-T068` Implement `verify-source --record <id> --source-root <path>` against caller-supplied local checkout only.
- [ ] `S1-T069` Verify local Git HEAD equals exact manifest upstream commit and repository identity matches policy expectations.
- [ ] `S1-T070` Verify upstream path existence and source SHA-256 digest at the pinned revision.
- [ ] `S1-T071` Reject symlink/path escapes outside the supplied source root.
- [ ] `S1-T072` Add synthetic temporary Git repository tests for valid revision, drift, missing path, digest mismatch and missing local `git`/I/O failures.
- [ ] `S1-T073` Prove normal `validate` performs no network operation and `verify-source` never fetches/clones.
- [ ] `S1-T074` Run focused/full tests and exact change-surface proof.
- [ ] `S1-T075` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain H.

### Grain H path allowlist

- `tools/provenance/**`
- `provenance/fixtures/**`
- Spec 001 evidence bookkeeping only where required

## S1-I — repository integration and CI

Dependency: `S1-T075`.

- [ ] `S1-T076` Create root canonical provenance record directories/readmes needed by contributors without adding product-source imports.
- [ ] `S1-T077` Add bounded contributor invocation/documentation in `README.md` and/or `AGENTS.md` only where necessary.
- [ ] `S1-T078` Add `.github/workflows/provenance.yml` with formatting, clippy, tests, locked validation and NOTICE drift gates.
- [ ] `S1-T079` Ensure CI requires no secrets or paid services and uses `--locked` dependency resolution.
- [ ] `S1-T080` Confirm all Spec 001 fixtures/records validate on the exact candidate head.
- [ ] `S1-T081` Confirm `NOTICE` is byte-current under `notice --check` on the exact candidate head.
- [ ] `S1-T082` Capture exact GitHub Actions workflow/job evidence and distinguish any skipped/unavailable checks from PASS.
- [ ] `S1-T083` Run complete local/CI qualification command set and exact change-surface reconciliation.
- [ ] `S1-T084` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain I.

### Grain I path allowlist

- `.github/workflows/provenance.yml`
- `tools/provenance/**`
- `provenance/**`
- `NOTICE`
- `README.md` and/or `AGENTS.md` only for bounded provenance invocation/contributor rules
- Spec 001 evidence bookkeeping only where required

## S1-J — canonical closeout

Dependency: `S1-T084`.

- [ ] `S1-T085` Re-read canonical Constitution, `AGENTS.md`, ROADMAP, Issue #4, Foundation provenance/licensing plans and the entire Spec 001 ledger from post-Grain-I `main`.
- [ ] `S1-T086` Reconcile the complete Spec 001 change surface and prove no unauthorized upstream product/application source is present.
- [ ] `S1-T087` Verify every direct/transitive `signthos-provenance` dependency is represented by validated component provenance and has no unresolved license state.
- [ ] `S1-T088` Re-run full formatting, clippy, tests, validator self-check, NOTICE check and exact-head GitHub Actions qualification.
- [ ] `S1-T089` Obtain independent substantive semantic review of the complete exact Spec 001 closeout candidate, including schemas, code, policy, fixtures, component records, NOTICE, CI and authority boundaries.
- [ ] `S1-T090` Reconcile all review findings and obtain independent exact-head/delta re-evaluation after any normative or code amendment.
- [ ] `S1-T091` Confirm no unresolved PR review threads remain and record exact-head qualification without treating summaries/status bots as semantic review evidence.
- [ ] `S1-T092` Merge the exact qualified closeout head with `expected_head_sha` protection.
- [ ] `S1-T093` Post-merge verify canonical `main`, including exact merge ancestry, full validation/NOTICE state and source-import absence.
- [ ] `S1-T094` Update Issue #4 and Spec 001 bookkeeping to `CLOSED_CANONICAL` only through a separately reviewed closeout record if post-merge evidence requires bookkeeping mutation.
- [ ] `S1-T095` Re-read canonical governance and determine separately whether Specification 002 is genuinely authorized; do not infer authority from Spec 001 completion alone.

## Explicit blockers carried through Spec 001

These are not waived by any checked task in this ledger:

- `B001` Documenso EE/commercial rights evidence.
- `B002` exact Signthos component/repository licensing compatibility before derived/imported product-code release.
- `B003` Stirling restricted-source rights.
- `B004` exact mobile/App Store/Play distribution compatibility against the shipped dependency/derivation graph.
- `B005` signing/PAdES/regulatory capability evidence.
- `B006` reproducible market/pricing evidence for hard business gates.

## Canonical completion rule

Specification 001 is not complete merely because the validator works. It becomes `CLOSED_CANONICAL` only after the dependency-ordered grains are merged with their required evidence, the complete exact candidate receives substantive independent review, exact-head qualification and expected-head merge, canonical `main` is post-merge verified, and any required closeout bookkeeping is itself canonically reconciled.

Specification 002 remains unauthorized until `S1-T095` determines successor authority from live canonical governance.
