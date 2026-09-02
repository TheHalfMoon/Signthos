# Specification 000 — Plan

Status: DRAFT

## Execution strategy

Foundation 000 is documentation/governance work only. It must close before upstream product source import.

The execution model follows:

`observe -> classify -> shape -> review -> reconcile -> qualify -> merge -> verify`

## Phase F0-A — Live-source observation

Inputs:

- Documenso live repository/default branch.
- Stirling PDF live repository/default branch.
- official current pricing/docs.
- selected competitor repositories/docs.
- framework/library/standards sources used to support architectural decisions.

### Required evidence binding

Every external source must be recorded **per source**, not as an aggregate list.

For a repository source, record:

- exact repository identity,
- exact observed commit SHA,
- exact path(s) used for the claim where applicable,
- retrieval/observation date,
- license/provenance evidence where relevant.

For a mutable web source, record:

- exact URL,
- retrieval date,
- immutable version/revision/archive/content digest when one is available,
- otherwise explicit `UNVERIFIED_MUTABLE_SOURCE` status.

A mutable unarchived webpage may inform exploratory context but may not satisfy a reproducible evidence-dependent pricing, licensing, compliance, release, or architecture gate.

The canonical source register is `docs/foundation/EXTERNAL-SOURCES.md`.

Outputs:

- source-bound repository/commit/path evidence records,
- source-bound web URL/retrieval/version-or-unverified records,
- architecture notes,
- license-boundary evidence,
- competitor capability observations with evidence status.

No code import is permitted.

## Phase F0-B — Product shaping

Produce:

- product thesis,
- category definition,
- explicit anti-goals,
- feature/capability map,
- competitor matrix,
- pricing hypothesis clearly labeled non-final.

The shaping question is not "what features can we copy?" It is "what coherent product should exist, and which upstream behavior reduces the cost/risk of building it?"

## Phase F0-C — Architecture shaping

Define:

- canonical domain boundaries,
- local/connected/self-hosted/cloud modes,
- browser/native/server/heavy PDF provider model,
- desktop/mobile shell hypothesis,
- signing provider model,
- evidence/verifier model,
- sync/local-vault boundary,
- API contract direction,
- security trust boundaries,
- dependency/licensing boundaries for proposed PDF/native engines.

Architecture must avoid a direct merge of the Documenso and Stirling application monoliths.

## Phase F0-D — Provenance and licensing classification

Record:

- Documenso community AGPL boundary,
- Documenso EE/commercial boundary,
- Stirling MIT/default boundary,
- Stirling restricted directories,
- competitor source licenses where relevant,
- proposed framework/library component-license boundaries,
- permission evidence still required.

Unresolved rights remain explicit blockers for later imports.

## Phase F0-E — SpecGrain roadmap

Recursively decompose the founding idea into dependency-ordered specifications.

Dependency edges must represent real contract consumption. In particular:

- PDF revision/provider semantics precede signing and PDF-dependent product surfaces,
- public API contracts precede the operations layer that promises to host them,
- release qualification waits for every release-critical predecessor included in the advertised release scope.

Successors must not receive implementation authority merely because they appear in the roadmap or have planning issues. Each successor must be activated by canonical completion of its prerequisites and any additional required authorization/evidence.

## Phase F0-F — Independent review

Request an independent substantive review of the exact candidate head.

Review questions:

1. Is Signthos differentiated enough from Documenso and Stirling?
2. Does the architecture avoid an unmaintainable two-monolith merge?
3. Are license/provenance assumptions conservative, source-bound and explicit?
4. Does the roadmap recursively refine risky work and encode real dependencies?
5. Are native/mobile and local-first requirements architectural rather than cosmetic?
6. Is the verifier/evidence model technically separable from cloud trust?
7. Are redaction and QR handoff security properties strong enough to fail closed?
8. Are any major competitor capabilities missing from the benchmark?
9. Does any document accidentally authorize prohibited code import or unsupported compliance claims?

Review absence or superficial acknowledgement is not PASS.

## Phase F0-G — Reconciliation and qualification

After review:

- verify every finding against current repository truth,
- address every still-valid substantive finding,
- reply to and resolve review threads only when the correction is present,
- update exact-head evidence,
- confirm only foundation paths changed,
- confirm no upstream product code was imported,
- confirm branch is mergeable and required checks pass if configured,
- confirm no unresolved substantive review conversation remains.

Any change after the review's examined head requires exact-head reconciliation. If the change is substantive enough that the prior review no longer covers the candidate, request a fresh/continued review rather than pretending the old review qualifies unseen material.

## Phase F0-H — Merge and post-merge verification

Merge only the exact reviewed/qualified head, using expected-head protection where supported.

Post-merge:

- re-read canonical `main`,
- verify foundation files exist,
- verify no prohibited imports exist,
- verify the merged commit matches the qualified candidate lineage,
- update task ledger only from observed evidence,
- then evaluate whether Specification 001 becomes genuinely authorized.

## Change surface for Foundation 000

Allowed:

- `README.md`
- `.specify/**`
- `AGENTS.md`
- `ROADMAP.md`
- `docs/foundation/**`
- `provenance/**`
- `specs/000-foundation/**`

Forbidden:

- Documenso application/package source import,
- Stirling application/engine/editor source import,
- production implementation under `apps/`, `packages/`, or `crates/`,
- dependency manifests for product runtime,
- production deployment configuration.
