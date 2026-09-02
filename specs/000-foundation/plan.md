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

Outputs:

- exact observed upstream SHAs,
- architecture notes,
- license-boundary evidence,
- competitor capability list.

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
- security trust boundaries.

Architecture must avoid a direct merge of the Documenso and Stirling application monoliths.

## Phase F0-D — Provenance and licensing classification

Record:

- Documenso community AGPL boundary,
- Documenso EE/commercial boundary,
- Stirling MIT/default boundary,
- Stirling restricted directories,
- competitor source licenses where relevant,
- permission evidence still required.

Unresolved rights remain explicit blockers for later imports.

## Phase F0-E — SpecGrain roadmap

Recursively decompose the founding idea into dependency-ordered specifications.

Successors must not receive implementation authority merely because they appear in the roadmap. Each successor must be activated by canonical completion of its prerequisites and any additional required authorization/evidence.

## Phase F0-F — Independent review

Request an independent substantive review of the exact candidate head.

Review questions:

1. Is Signthos differentiated enough from Documenso and Stirling?
2. Does the architecture avoid an unmaintainable two-monolith merge?
3. Are license/provenance assumptions conservative and explicit?
4. Does the roadmap recursively refine risky work?
5. Are native/mobile and local-first requirements architectural rather than cosmetic?
6. Is the verifier/evidence model technically separable from cloud trust?
7. Are any major competitor capabilities missing from the benchmark?
8. Does any document accidentally authorize prohibited code import?

Review absence or superficial acknowledgement is not PASS.

## Phase F0-G — Reconciliation and qualification

After review:

- address substantive findings,
- update exact-head evidence,
- confirm only foundation paths changed,
- confirm no upstream product code was imported,
- confirm branch is mergeable and required CI/checks pass if configured,
- confirm unresolved review threads are closed.

## Phase F0-H — Merge and post-merge verification

Merge only the exact reviewed/qualified head.

Post-merge:

- re-read canonical `main`,
- verify foundation files exist,
- verify no prohibited imports exist,
- update task ledger only from observed evidence,
- then evaluate whether Specification 001 becomes authorized.

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
