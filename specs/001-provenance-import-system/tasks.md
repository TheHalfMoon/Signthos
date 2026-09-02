# Specification 001 — Canonical Task Ledger

Status: GRAIN_B_COMPLETE
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
- [x] `S1-T008` Reconcile every shaping review finding and obtain exact-head re-evaluation after normative amendment.
- [x] `S1-T009` Record exact-head shaping qualification, accurately distinguishing absent/skipped checks from PASS.
- [x] `S1-T010` Merge the exact qualified shaping head with `expected_head_sha` protection.
- [x] `S1-T011` Post-merge verify canonical `main` contains only the intended shaping surface and re-read Issue #4/governance before implementation.

### Shaping review/reconciliation evidence

Initial substantive CodeRabbit review:

- comment: `5512755250`
- reviewed head: `16d769d0dc00448c65a55119d12a2552c631b55a`
- base: `2144b7765595a206e691f43aefd122aa5a150a1b`
- result: `ACTIONABLE FINDINGS`

The reviewer confirmed the shaping-only three-file surface and found no product source, Rust tooling, dependency manifests, CI workflow, credentials, paid-service configuration or Specification 002 implementation.

Initial findings:

1. source-import records needed controlled review status, positive immutable Signthos PR identity and substantive review-evidence binding while keeping final merge/exact-head qualification outside the self-referential record;
2. `import.date` needed executable strict Gregorian `YYYY-MM-DD` validation with leap-day/impossible-date fixtures.

First amended exact-head re-evaluation:

- comment: `5512866118`
- reviewed head: `0aba1ee0bf62c8406185a2e21d8802baa1455d61`
- base: `2144b7765595a206e691f43aefd122aa5a150a1b`
- result: `ACTIONABLE FINDING`

That re-evaluation explicitly confirmed both initial findings were reconciled, then identified one remaining fail-closed weakness: `review.evidence` was constrained only as non-empty text and did not define an executable stable-reference grammar.

Second amended exact-head re-evaluation:

- comment: `5513410383`
- reviewed head: `d7defb42d32a1ab95faa7a40cfb15b699e7b816b`
- base: `2144b7765595a206e691f43aefd122aa5a150a1b`
- result: `ACTIONABLE FINDING`

That re-evaluation confirmed the earlier authorization/date findings and executable evidence-reference grammar were reconciled. It identified one remaining semantic contradiction: an offline local validator cannot emit `REVIEW_*` based on whether a syntax-valid GitHub evidence reference has been externally proven to exist, be independent/substantive, belong to the declared PR, or apply to the exact head.

Final shaping reconciliation established:

- v1 evidence kinds `github:issue-comment`, `github:pull-request-review`, and `github:pull-request-review-comment` only;
- canonical lexical form `^github:(issue-comment|pull-request-review|pull-request-review-comment):[1-9][0-9]*$`;
- offline local syntax/record-state validation only;
- `REVIEW_*` rejection for arbitrary text, generic URLs, unsupported kinds, zero/negative/signed/leading-zero ids, mutable labels and non-ASCII decimal ids;
- valid/invalid fixture requirements for those record-local rules;
- live GitHub verification of existence, independence, substantive scope, PR relationship and exact-head applicability preserved as external Diffciplane gates;
- absence/failure of those live facts blocks external qualification/merge rather than local `validate`, and local validator PASS is never sufficient Diffciplane qualification.

Final independent shaping re-evaluation:

- CodeRabbit comment: `5513505367`
- reviewed head: `6e56c7dcb9857e80415f5cf795bea07d77cf06be`
- base: `2144b7765595a206e691f43aefd122aa5a150a1b`
- result: `PASS`
- exact-head qualification: PR #23 comment `5513522873`
- guarded merge: PR #23 -> canonical `main` `08022382524cec92fc0e829b2666568b17822c0f`
- post-merge verification and governance reread: PR #23 comment `5513550515`

The shaping qualification recorded that no GitHub Actions workflow run existed for the docs-only head and did not convert absent/neutral checks into CI PASS. Canonical post-merge comparison contained only `spec.md`, `plan.md`, and `tasks.md`.

### Shaping path allowlist

Only:

- `specs/001-provenance-import-system/spec.md`
- `specs/001-provenance-import-system/plan.md`
- `specs/001-provenance-import-system/tasks.md`
- Issue #4 metadata/comments

No runtime/toolchain/dependency changes were introduced before `S1-T011`.

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

### Grain B canonical evidence

Implementation branch and base:

- branch: `feat/001-grain-b-provenance-bootstrap`
- exact canonical starting point: `08022382524cec92fc0e829b2666568b17822c0f`
- PR: #24
- exact qualified head: `0ef82ddb15ebf686d03ad85970f3c33c5964af66`

Bootstrap dependency evidence:

- Rust edition: `2024`
- MSRV candidate and tested toolchain: `1.85.0`
- `spdx 0.13.5`: crates.io checksum `081670c233dfbed55690cc0cd38424e0e24ac1b2673d0b408b3f7b684738dfa9`, source revision `10dcdc28d619b5bb1c14cbf546deea3578ead73c`, package license metadata `Apache-2.0`
- `smallvec 1.15.1`: crates.io checksum `67b1b7a3b5fe4f1376887184045fcf45c69e92af734b7aaddc05fb777b6fbd03`, source revision `d0f47a3ea99296498ee940b5d99f59b403c498a2`, package license metadata `MIT OR Apache-2.0`
- resolved normal dependency graph: exactly `signthos-provenance 0.1.0 -> spdx 0.13.5 -> smallvec 1.15.1`

Exact-head execution evidence:

- CodeRabbit execution comment: `5514095311`
- result: `QUALIFIED` for the execution gate on head `0ef82ddb15ebf686d03ad85970f3c33c5964af66`
- formatting check: PASS using the installed Rust 1.85.0 sysroot `cargo-fmt` after proving the runner PATH/shim defect
- clippy: PASS with `-D warnings`
- library tests: 4 passed, 0 failed
- CLI integration tests: 4 passed, 0 failed
- binary tests: 0 failed
- doctest phase: executed successfully, 0 failed
- `cargo metadata --locked`: PASS
- `cargo tree --locked`: PASS

The runner's missing `cargo-fmt`/`rustdoc` PATH shims were repaired by invoking the already-installed toolchain sysroot binaries; no repository change or qualification waiver was used.

Independent review and merge evidence:

- independent substantive exact-head review: CodeRabbit comment `5514151207`
- review result: `PASS` with no actionable substantive defects
- qualification: PR #24 comment `5514164947`
- unresolved review threads immediately before merge: zero
- GitHub Actions workflow runs for Grain B head: none; repository CI workflow remains owned by Grain I and absence was not represented as PASS
- Cubic check: `neutral` because its monthly review-line limit was reached; not treated as PASS
- guarded merge: PR #24 -> canonical `main` `f0932f537197431f65fc4e1debf40ad1b2ea438b`
- merge parents: `08022382524cec92fc0e829b2666568b17822c0f` and `0ef82ddb15ebf686d03ad85970f3c33c5964af66`
- post-merge verification and fresh governance reread: PR #24 comment `5514180440`

Canonical base-to-merge comparison contains exactly seven Grain B files and no upstream product/application source, workflow, credential, paid-service configuration, restricted/commercial import, relicensing action, legal/compliance claim, or Specification 002 implementation.

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

### Pre-CI execution evidence adoption

- [ ] `S1-T021A` Adopt `specs/001-provenance-import-system/execution-evidence.md` as the normative pre-CI execution-evidence boundary after that addendum's exact head receives independent substantive review, expected-head merge protection, and canonical post-merge verification. This task gates only use of the non-merge `verify/spec001-*` execution mechanism for Grains C–H; it does not retroactively invalidate Grain C implementation work that began after `S1-T021` and before this operational blocker was discovered.

Once `S1-T021A` is canonically complete:

- the Constitution and `AGENTS.md` remain higher authority than all Specification 001 files;
- this `tasks.md` remains the canonical dependency/order ledger;
- `execution-evidence.md` is a subordinate normative addendum only for the mechanics and evidence binding of temporary pre-Grain-I remote execution;
- for that narrow subject, the addendum supersedes `plan.md` only to authorize a temporary `.github/workflows/spec001-ephemeral-verify.yml` on a non-merge `verify/spec001-*` branch created from an already-existing exact candidate SHA;
- no Grain C–H implementation merge-candidate path allowlist is widened by the addendum, and `.github/workflows/**` remains prohibited from those implementation PRs;
- Grain I and `S1-T078` retain exclusive authority for the first canonical persistent `.github/workflows/provenance.yml` and repository CI integration;
- verification-run evidence is stale after any candidate-head change and can never substitute for independent semantic review, exact-head qualification, live external review-evidence verification, rights evidence, or guarded merge;
- no verification branch may be created or used under this authority until `S1-T021A` is complete.

The `S1-T021A` adoption candidate itself is limited to `tasks.md`, `execution-evidence.md`, and Issue/PR evidence. It does not authorize product/application source, upstream source import, network/runtime integration beyond public toolchain/dependency retrieval inside the temporary verifier, credentials, paid services, restricted/commercial source, relicensing, legal/compliance claims, or Specification 002.

## S1-C — canonical schemas, strict loading and import readiness

Dependency: `S1-T021` for implementation. `S1-T021A` is additionally required before invoking the optional pre-CI remote verification mechanism described in `execution-evidence.md`.

### Grain C dependency-provenance authority clarification

`S1-T024` requires strict typed JSON deserialization and Grain C may therefore need a minimal JSON serialization/deserialization dependency set. Grain C is authorized to introduce only the minimum direct/transitive Rust dependencies that are strictly necessary to satisfy `S1-T022` through `S1-T030`.

Every dependency introduced by Grain C must, in the same Grain C candidate:

- be exactly pinned by the manifest/lockfile and included in the exact resolved dependency graph;
- receive a component-provenance entry under `provenance/components/**` with exact package version/checksum/source-origin evidence and license classification/evidence;
- remain within the existing Rust `1.85.0` MSRV unless a separately reviewed normative amendment explicitly changes that contract;
- be reconciled against `Cargo.lock` and the component registry before `S1-T030` may pass;
- be rejected from the grain if it is unrelated to the bounded schema/loading/validation work.

For Grain C only, this task-ledger clarification supersedes the narrower Grain C path list in `plan.md` solely by adding `provenance/components/**` for the exact direct/transitive dependency records introduced by Grain C. It does not widen any other Grain C path or capability authority and does not authorize product/application source, upstream source import, network/runtime integration, credentials, paid services, legal/compliance claims, or Specification 002.

This clarification becomes effective only after its exact head receives independent substantive review, expected-head merge protection, and canonical post-merge verification.

- [ ] `S1-T022` Create v1 source-import JSON Schema with closed object shapes and required semantic fields, including review status/PR/evidence and import date.
- [ ] `S1-T023` Create v1 policy JSON Schema and align component schema with the canonical Rust models.
- [ ] `S1-T024` Implement strict source-import/component/policy typed deserialization with unknown-field rejection.
- [ ] `S1-T025` Enforce per-record and total-run byte limits before unbounded allocation/deserialization.
- [ ] `S1-T026` Validate canonical ids, exact 40-character lowercase hexadecimal v1 Git object id, lowercase SHA-256 digests and normalized relative POSIX paths.
- [ ] `S1-T026A` Enforce semantic proleptic-Gregorian `import.date` in exact zero-padded ASCII `YYYY-MM-DD` form, including year range `0001`–`9999`, leap-year rules and impossible-date rejection.
- [ ] `S1-T026B` Enforce source-import review vocabulary `pending|qualified_exact_head|rejected`, positive immutable Signthos PR identity and non-empty review evidence; only `qualified_exact_head` may pass canonical/import-ready validation.
- [ ] `S1-T026C` Preserve the two-stage authorization handoff: pending exact imported-byte review, manifest-only qualification amendment, independent exact-head/delta re-evaluation, and external Diffciplane qualification without a self-referential current-commit field.
- [ ] `S1-T026D` Enforce the canonical offline review-evidence grammar `^github:(issue-comment|pull-request-review|pull-request-review-comment):[1-9][0-9]*$` and reject arbitrary text, URLs, unsupported kinds, non-canonical/mutable ids and non-ASCII decimal forms with record-local `REVIEW_*` diagnostics.
- [ ] `S1-T026E` Keep semantic verification that a canonical evidence reference exists, is independent/substantive, belongs to the declared PR and covers the applicable exact head outside local syntax validation as a mandatory live Diffciplane gate; absence/failure blocks external qualification/merge rather than local `validate`, and a local PASS never implies qualification.
- [ ] `S1-T027` Reject absolute paths, traversal, backslash aliases, malformed normalization and duplicate semantic identities/destination claims.
- [ ] `S1-T028` Implement stable deterministic diagnostic model and `validate` / `validate --json` baseline output, including `DATE_*` and record-local `REVIEW_*` families.
- [ ] `S1-T029` Add valid/invalid synthetic fixtures for every Grain C record-local failure rule, including valid leap day, impossible/non-canonical dates, missing/empty review evidence, valid canonical evidence kinds, arbitrary free text, generic URLs, unsupported evidence kinds, zero/negative/signed/leading-zero/mutable/non-ASCII evidence ids, missing/non-positive PR identity, and pending/rejected/unknown review states.
- [ ] `S1-T030` Run focused/full tests, exact dependency-graph/component-registry reconciliation, and change-surface proof.
- [ ] `S1-T031` Independent exact-head review, reconciliation, qualification, expected-head merge and post-merge verification for Grain C.

### Grain C path allowlist

- `tools/provenance/**`
- `provenance/schema/v1/**`
- `provenance/fixtures/**`
- `provenance/components/**` only for exact direct/transitive dependency provenance introduced by Grain C
- Spec 001 evidence bookkeeping only where required

Explicitly prohibited in Grain C:

- unrelated dependency expansion;
- product/application source or upstream source-import records;
- network/runtime integration, credentials or paid-service configuration;
- legal/compliance claims or Specification 002 work.

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
