# Specification 000 — Canonical Task Ledger

Status: ACTIVE

Legend:

- `[x]` implementation/evidence for the task exists on the current specification branch.
- `[ ]` task is not yet canonically complete.

A checked task does not imply the specification or PR is merge-qualified.

## Research and shaping

- [x] `F0-T001` Establish repository foundation boundary and prohibit pre-foundation upstream source import.
- [x] `F0-T002` Capture current Documenso architecture, pricing and license-boundary research.
- [x] `F0-T003` Capture current Stirling PDF capabilities, architecture and license-boundary research.
- [x] `F0-T004` Benchmark DocuSeal and OpenSign as focused open-source signing competitors.
- [x] `F0-T005` Define Signthos product thesis, moat and anti-goals.
- [x] `F0-T006` Produce competitor capability matrix.

## Architecture and provenance

- [x] `F0-T007` Define master architecture and product runtime modes.
- [x] `F0-T008` Define PDF capability-provider architecture rather than a two-monolith merge.
- [x] `F0-T009` Define native desktop/mobile architecture hypothesis around Tauri 2.
- [x] `F0-T010` Define signing/evidence/verifier architecture direction.
- [x] `F0-T011` Establish upstream provenance register with fail-closed import policy.
- [x] `F0-T012` Establish SpecGrain/Diffciplane constitution.
- [x] `F0-T013` Create dependency-ordered canonical roadmap through v0.1 qualification.
- [x] `F0-T013A` Define licensing architecture, component-license boundaries and mobile/App Store distribution gate.
- [x] `F0-T013B` Define PDF engine/provider strategy, revision semantics and independent redaction/signing proof boundaries.
- [x] `F0-T013C` Define signing standards, PAdES/evidence distinctions, verification semantics and remote trust-provider direction.
- [x] `F0-T013D` Define cross-platform quality attributes covering privacy, authorization, data lifecycle, offline behavior, accessibility, i18n/RTL, abuse and supply-chain security.

## Foundation closeout

- [x] `F0-T014` Add repository agent/contributor execution rules for Foundation 000.
- [x] `F0-T015` Run change-surface reconciliation and prove no prohibited source import; recheck exact candidate head before merge qualification.
- [ ] `F0-T016` Obtain independent substantive review of architecture, provenance/licensing, PDF/signing strategies, quality attributes, competitor coverage and roadmap decomposition.
- [ ] `F0-T017` Reconcile all substantive review findings on the exact candidate head and obtain reviewer re-evaluation when normative content changes.
- [ ] `F0-T018` Re-run exact-head qualification after review reconciliation; record unavailable/nonexistent CI accurately rather than treating skipped checks as PASS.
- [ ] `F0-T019` Merge the exact qualified Foundation 000 head with expected-head protection where supported.
- [ ] `F0-T020` Perform post-merge verification on canonical `main`.
- [ ] `F0-T021` Re-read canonical governance and determine whether Specification 001 is genuinely authorized.

## Independent-review availability evidence

The following do **not** satisfy `F0-T016`, but document attempted reviewer paths:

- Qodo reported that reviews are paused because the connected workspace trial/credits are unavailable.
- CodeRabbit reported that automatic review was skipped and a manual-review request subsequently hit its chat/rate limit.
- Cubic reported that the workspace exceeded its free monthly review line limit.
- A GitHub Copilot reviewer request could not be established through the available repository reviewer interface.

These external constraints do not reduce the substantive-review requirement.

## Explicit blockers carried forward

These do not prevent Foundation 000 from documenting the architecture, but they prevent affected source imports or distribution decisions:

- `B001` Written Documenso permission must be preserved and examined for rights beyond ordinary AGPL/community code, especially commercial/EE code.
- `B002` Final Signthos component/repository license decision must be made before the first derived/imported product-code release.
- `B003` Stirling restricted directories remain non-importable without separate explicit rights.
- `B004` iOS/App Store licensing/distribution compatibility must be reviewed against the actual shipped mobile dependency/derivation graph before release.
- `B005` Exact signing/PAdES/regulatory capability claims require fixture/conformance evidence in their successor specification and cannot be inferred from library documentation.

## Canonical completion rule

Specification 000 becomes `CLOSED_CANONICAL` only after `F0-T001` through `F0-T020` are satisfied by observed evidence and the merged canonical state is verified. `F0-T021` is the continuation-boundary task and may authorize Specification 001 only after that closeout.
