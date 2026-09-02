# Signthos Agent Execution Rules

These rules apply to human and agent contributors.

## Language

Repository-facing technical content must be written in English unless a future localization specification explicitly requires otherwise.

## Canonical truth

Before work:

1. read `.specify/memory/constitution.md`,
2. read the active specification `spec.md`, `plan.md`, and `tasks.md`,
3. inspect live GitHub/repository state,
4. prefer canonical repository truth over stale handoff notes.

## Foundation 000 restriction

While Specification 000 is active, the only authorized change surface is:

- `README.md`
- `.specify/**`
- `AGENTS.md`
- `ROADMAP.md`
- `docs/foundation/**`
- `provenance/**`
- `specs/000-foundation/**`

Do not import upstream application source and do not create production implementation directories during Foundation 000.

## Upstream source

Do not copy code merely because a repository is public.

Before import, require:

- exact repository and commit,
- exact upstream path,
- path-level license classification,
- required copyright/license notices,
- permission artifact for restricted/commercial code,
- canonical Signthos import authorization,
- provenance record.

Ambiguity is a stop condition for the affected import, not permission to guess.

## SpecGrain execution

One task should have one bounded behavioral or governance purpose.

Each implementation grain must declare:

- scope-in,
- scope-out,
- allowed paths/change surface,
- dependencies,
- acceptance criteria,
- required tests/evidence,
- security/provenance concerns where applicable.

Recursively refine work that is too broad for clean review.

## Diffciplane qualification

Do not mark a task or specification canonically complete from local implementation alone.

Respect, when applicable:

- dependency/task order,
- readiness gates,
- exact-head tests/CI,
- independent substantive review,
- unresolved review conversations,
- mandatory premerge proof,
- expected-head merge protection,
- post-merge verification,
- canonical task-ledger reconciliation.

A skipped or unavailable review is not an approval.

## Evidence integrity

Never fabricate or infer:

- CI success,
- runtime results,
- review approval,
- legal permission,
- provenance,
- mergeability,
- compliance status,
- platform support,
- benchmark results.

Record unknown states as unknown or blocked.

## Security

Treat every uploaded or imported document as untrusted input.

Do not weaken parser/resource limits, sandbox boundaries, secret isolation, key handling, update-signing requirements or verification failure behavior merely to make a feature pass.

## Product architecture

Preserve these boundaries unless a canonical ADR/spec changes them with evidence:

- `Document` content/revisions are distinct from `Envelope` routing state.
- browser/native/server/heavy processing are provider implementations behind shared contracts.
- AI is optional and outside signing-validity trust decisions.
- local mode does not silently upload documents.
- verifier results distinguish uncertainty/unsupported states from validity.

## Commits and pull requests

Prefer small, dependency-ordered commits and PRs.

Do not combine:

- mechanical rebrand,
- upstream import,
- architectural migration,
- feature behavior changes,
- license-boundary changes

into one unreviewable transformation.

Never force-push or rewrite shared history to bypass qualification evidence.
