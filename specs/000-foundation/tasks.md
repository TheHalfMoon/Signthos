# Specification 000 — Canonical Task Ledger

Status: CLOSED_CANONICAL

Legend:

- `[x]` task output/evidence exists and the stated bounded requirement is satisfied on the current specification lineage.
- `[ ]` task is not yet canonically complete.

A checked task does not imply the specification or PR is merge-qualified.

## Research and shaping

- [x] `F0-T001` Establish repository foundation boundary and prohibit pre-foundation upstream source import.
- [x] `F0-T002` Capture Documenso architecture, pricing-context and license-boundary research with exact repository snapshot evidence.
- [x] `F0-T003` Capture Stirling PDF capabilities, architecture and license-boundary research with exact repository snapshot evidence.
- [x] `F0-T004` Benchmark DocuSeal and OpenSign as focused open-source signing competitors.
- [x] `F0-T005` Define Signthos product thesis, moat and anti-goals.
- [x] `F0-T006` Produce normalized competitor capability matrix.
- [x] `F0-T006A` Establish canonical external-source register and classify mutable unarchived webpages as non-hard evidence.

## Architecture, product and provenance

- [x] `F0-T007` Define master architecture and product runtime modes.
- [x] `F0-T008` Define PDF capability-provider architecture rather than a two-monolith merge.
- [x] `F0-T009` Define native desktop/mobile architecture hypothesis around Tauri 2.
- [x] `F0-T010` Define signing/evidence/verifier architecture direction.
- [x] `F0-T011` Establish upstream provenance register with fail-closed import policy and explicit permission-scope requirements.
- [x] `F0-T012` Establish SpecGrain/Diffciplane constitution.
- [x] `F0-T013` Create dependency-ordered canonical roadmap through v0.1 qualification.
- [x] `F0-T013A` Define licensing architecture, component-license boundaries and mobile/App Store distribution gate.
- [x] `F0-T013B` Define pinned Foundation PDF engine/provider candidates, revision semantics and independent redaction/signing proof boundaries.
- [x] `F0-T013C` Define signing standards, PAdES/evidence distinctions, verification semantics and remote trust-provider direction.
- [x] `F0-T013D` Define cross-platform quality attributes covering privacy, authorization, data lifecycle, offline behavior, accessibility, i18n/RTL, abuse and supply-chain security.
- [x] `F0-T013E` Define product strategy, UX/document-workspace journeys and product language/brand posture.
- [x] `F0-T013F` Define data/sync lifecycle, desktop/mobile, API/SDK/embed and self-host/cloud platform plans.
- [x] `F0-T013G` Define automation/integration, threat-model, migration/import, testing/qualification and release/distribution plans.
- [x] `F0-T013H` Define business/pricing hypothesis, success metrics, capability catalog and community/growth plan.
- [x] `F0-T013I` Establish GitHub-first operating model and canonical Foundation index so durable planning does not live only in chat/local scratch.
- [x] `F0-T013J` Create GitHub planning epics for Specifications 001–017 and record their actual issue mapping/prerequisite state in `docs/foundation/EPIC-INDEX.md`.

## Foundation closeout

- [x] `F0-T014` Add repository agent/contributor execution rules for Foundation 000.
- [x] `F0-T015` Run change-surface reconciliation and prove no prohibited source import; recheck exact candidate head before merge qualification.
- [x] `F0-T016` Obtain independent substantive review of architecture, provenance/licensing, PDF/signing strategies, quality attributes, competitor coverage and roadmap decomposition.
- [x] `F0-T017` Reconcile all substantive review findings and obtain independent re-evaluation that covers the reconciled exact candidate head/delta after normative content changes.
- [x] `F0-T018` Re-run exact-head qualification after review reconciliation; record unavailable/nonexistent CI accurately rather than treating skipped checks as PASS.
- [x] `F0-T019` Merge the exact qualified Foundation 000 head with expected-head protection where supported.
- [x] `F0-T020` Perform post-merge verification on canonical `main`.
- [x] `F0-T021` Re-read canonical governance and determine whether Specification 001 is genuinely authorized.

## Canonical closeout evidence

### F0-T017 — independent exact-head re-evaluation

CodeRabbit independently reviewed the complete reconciled Foundation 000 candidate and returned:

`PASS — substantive Foundation 000 review completed.`

Evidence:

- reviewed head: `4d4ba4bdfd5f01d05caaff888526f9a3e13deec4`
- reviewed base: `0c065257b382d5baa00b25fe7b19e9659ce3b9cb`
- reviewed diff: 35 files, 9,066 additions, 0 deletions
- result: no new blocking or non-blocking substantive defects
- prior provenance-manifest finding explicitly reconciled
- PR #2 issue comment: `5511819284`
- all original inline review threads: resolved

The earlier CodeRabbit review on `9a5a6339d639273d07bc03899cb4b72c3dbf2fad` remains historical evidence for `F0-T016`; it is not used as the exact-head qualification substitute.

### F0-T018 — exact-head qualification

Exact candidate qualification was recorded on PR #2 in issue comment `5511858375` and bound to:

- base `main`: `0c065257b382d5baa00b25fe7b19e9659ce3b9cb`
- candidate head: `4d4ba4bdfd5f01d05caaff888526f9a3e13deec4`
- independent semantic PASS: CodeRabbit comment `5511819284`
- change surface: 35 Foundation/governance/planning files only
- no upstream application source import
- no runtime dependency manifest
- no production application implementation
- no production deployment configuration
- GitHub Actions workflow runs associated with the exact candidate: none observed
- commit status context observed: CodeRabbit `success`; this status is not treated as a substitute for the substantive review comment
- repository rulesets: none observed
- traditional `main` branch protection: not enabled at qualification time

Absent CI was recorded as absent, not fabricated as PASS.

### F0-T019 — guarded merge

Foundation PR #2 was merged with expected-head protection for exact qualified head:

`4d4ba4bdfd5f01d05caaff888526f9a3e13deec4`

Canonical merge commit:

`0a14925dec8326a0c1378f9c567ee4dd59f90f51`

Merge parents:

- previous `main`: `0c065257b382d5baa00b25fe7b19e9659ce3b9cb`
- exact qualified candidate: `4d4ba4bdfd5f01d05caaff888526f9a3e13deec4`

### F0-T020 — post-merge verification

Post-merge verification established that canonical `main` at `0a14925dec8326a0c1378f9c567ee4dd59f90f51` contains the Foundation-only merge surface and preserves the prohibited-import boundary:

- Foundation/governance/planning content only
- no upstream application source
- no runtime dependency manifest
- no production application implementation
- no production deployment configuration

Foundation 000 was then canonically closed through PR #21. That closeout received an independent exact-head substantive PASS in CodeRabbit issue comment `5512353637`, exact-head qualification in PR #21 comment `5512372913`, expected-head merge to canonical commit `a39bcaf7705ac639d2da52ffd23f2d94ba7461ed`, and post-merge verification in PR #21 comment `5512411428`.

### F0-T021 — successor authorization

Canonical governance was re-read from `main` at:

`a39bcaf7705ac639d2da52ffd23f2d94ba7461ed`

Observed successor-authority facts:

- Specification 000 is `CLOSED_CANONICAL`.
- Constitution status is `CANONICAL`.
- Foundation closeout is merged and post-merge verified.
- Foundation review-gate Issue #3 is closed as completed.
- no open pull request exists at the authorization check.
- Issue #4 is the dependency-ordered Specification 001 epic.
- `ROADMAP.md`, `provenance/UPSTREAM.md`, the Constitution, `AGENTS.md`, and the Foundation epic index expose no newer blocker to building the provenance/import machinery itself.
- `provenance/UPSTREAM.md` remains `PRE-IMPORT` and fail-closed.

Determination: **Specification 001 — Provenance and Import System is authorized after this F0-T021 record is merged and post-merge verified.** Its authority is limited to the bounded provenance/import-system specification and implementation that canonical Spec 001 defines. It does not authorize any upstream product-source import merely to exercise the machinery.

The following gates remain independently binding and are not waived by Spec 001 authorization:

- `B001` Documenso commercial/EE rights evidence;
- `B002` final component/repository licensing compatibility before derived/imported product-code release;
- `B003` Stirling restricted-source rights;
- `B004` exact mobile-distribution dependency/derivation review;
- `B005` signing/PAdES/regulatory claim evidence;
- `B006` reproducible market/pricing evidence for hard business gates.

## Planning epic records

- Spec 001 → Issue #4
- Spec 002 → Issue #5
- Spec 003 → Issue #6
- Spec 004 → Issue #7
- Spec 005 → Issue #8
- Spec 006 → Issue #9
- Spec 007 → Issue #10
- Spec 008 → Issue #11
- Spec 009 → Issue #12
- Spec 010 → Issue #13
- Spec 011 → Issue #14
- Spec 012 → Issue #15
- Spec 013 → Issue #16
- Spec 014 → Issue #17
- Spec 015 → Issue #18
- Spec 016 → Issue #19
- Spec 017 → Issue #20

Issue existence does not grant implementation authority.

## Explicit blockers carried forward

These do not prevent Foundation 000 from documenting the architecture, but they prevent affected source imports or distribution/claim decisions:

- `B001` Written Documenso permission must be preserved and examined for rights beyond ordinary AGPL/community code, especially commercial/EE code.
- `B002` Final Signthos component/repository license decision must be made before the first derived/imported product-code release.
- `B003` Stirling restricted directories remain non-importable without separate explicit rights.
- `B004` iOS/App Store and Google Play licensing/distribution compatibility must be reviewed against the actual shipped mobile dependency/derivation graph before release.
- `B005` Exact signing/PAdES/regulatory capability claims require fixture/conformance evidence in their successor specification and cannot be inferred from library documentation.
- `B006` Mutable pricing/market observations require fresh reproducible evidence before they can drive launch pricing or a hard business gate.

## Canonical completion rule

Specification 000 is `CLOSED_CANONICAL`. `F0-T021` authorizes Specification 001 only after this successor-authorization record is independently qualified, merged with expected-head protection, and post-merge verified on canonical `main`.
