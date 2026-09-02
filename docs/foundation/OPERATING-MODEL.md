# Signthos Operating Model

Status: FOUNDATION PLAN
Date: 2026-09-02

## Objective

Define how Signthos planning, implementation, review, qualification and release work moves through GitHub without hidden local plans or authority inflation.

GitHub repository state is canonical.

## Canonical artifacts

### Constitution

`.specify/memory/constitution.md`

Defines non-negotiable governance/product principles.

### Active specification

Each active spec has:

- `spec.md`
- `plan.md`
- `tasks.md`

The active spec controls scope and completion gates.

### Foundation plans

`docs/foundation/**` defines product/architecture direction and successor planning. These documents inform future specs but do not independently authorize implementation.

### Roadmap

`ROADMAP.md` defines dependency order and planned successor scope.

### GitHub issues

Issues may track:

- successor spec epics,
- review requirements,
- defects/findings,
- external blockers.

Issue existence is not implementation authorization.

### Pull requests

PRs are the review/qualification unit for bounded changes.

## SpecGrain lifecycle

### 1. Observe

Read:

- live `main`,
- active spec/governance,
- open PRs/issues,
- upstream/external evidence when relevant.

Do not begin from stale handoff assumptions.

### 2. Refine

Break the next authorized unit until it has:

- one bounded purpose,
- explicit allowed paths,
- scope-out,
- dependencies,
- acceptance criteria,
- test/evidence requirements,
- security/licensing considerations.

### 3. Readiness

Before implementation verify:

- prerequisites complete,
- required rights/credentials/evidence available,
- no canonical blocker,
- exact branch/base known.

### 4. Implement

Change only the authorized surface.

Do not combine unrelated refactors, rebranding, imports and feature work.

### 5. Test

Run focused and broader tests appropriate to risk.

Record actual results; never infer PASS.

### 6. Review

Obtain required independent substantive review.

Review should evaluate behavior/architecture/security as appropriate, not merely summarize the diff.

### 7. Reconcile

Address findings and review threads.

If changes invalidate prior evidence, rerun/re-review.

### 8. Exact-head qualification

Bind merge-critical evidence to the exact candidate head.

Confirm:

- head SHA,
- diff/change surface,
- CI/checks,
- independent review,
- unresolved threads,
- mergeability,
- required evidence.

### 9. Guarded merge

Use expected-head merge protection where supported.

Do not merge a head different from the qualified head.

### 10. Post-merge verification

Re-read `main` and verify:

- intended changes landed,
- canonical task ledger state,
- required checks/evidence,
- no unexpected successor authority.

### 11. Continue

Only after canonical reconciliation determine the next authorized dependency.

## Task states

Suggested conceptual states:

- `PLANNED`
- `BLOCKED`
- `READY`
- `IMPLEMENTING`
- `REVIEW`
- `QUALIFYING`
- `MERGED`
- `CLOSED_CANONICAL`

Checkboxes in `tasks.md` indicate observed task evidence but do not by themselves define entire spec closure.

## Authority model

General founder approval authorizes ordinary work inside the canonical roadmap where prerequisites are satisfied.

It does **not** override explicit gates such as:

- restricted/commercial source rights,
- independent review,
- credentials/paid provider use,
- regulated compliance claims,
- App Store/license compatibility,
- destructive history rewriting.

## Repository-only planning rule

All durable planning created for Signthos must be written to GitHub.

No essential roadmap or architectural decision should exist only:

- in a local file,
- in agent scratch state,
- in a chat message,
- in an unpublished private note.

Chat may explain decisions, but canonical plan changes must be committed to the repository.

## Decision changes

When a major foundation decision changes:

1. update the appropriate canonical document,
2. record rationale/alternatives in a later ADR/spec if implementation is affected,
3. reconcile roadmap/tasks,
4. re-review if the change affects a qualified candidate.

## Review model

Critical domains require stronger reviewers/evidence:

### Provenance/licensing

Review exact source rights/path classification.

### Signing/verification

Require independent semantic/cryptographic review and interoperability evidence.

### Security/auth

Require negative/abuse cases and substantive security review.

### UI/routine docs

Still reviewed, but the depth may be proportional to risk.

A single generic bot status is not automatically sufficient for every domain.

## External blocker handling

Examples:

- review service quota,
- unavailable vendor credential,
- missing legal permission,
- App Store requirement,
- upstream dependency issue.

Rules:

- record blocker publicly in issue/task state when appropriate,
- continue independent authorized work that does not bypass it,
- do not convert unavailability into PASS,
- do not repeatedly churn the candidate head after requesting exact-head review unless a real planning defect is being fixed.

## Branch/PR strategy

- one bounded branch per active unit,
- small dependency-ordered PRs,
- avoid long-lived feature branches that combine multiple specs,
- keep `main` canonical and releasable/understandable,
- use draft PRs for incomplete work only when tool/review workflow supports them reliably.

## Commit strategy

Commits should be meaningful, reviewable and written in English.

Examples:

- `docs: define Signthos PDF engine strategy`
- `spec(001): add provenance manifest validator`
- `feat(pdf): implement page rotation provider contract`
- `fix(auth): deny cross-organization envelope lookup`

## GitHub issue epic model

Successor epic issues should include:

- purpose,
- prerequisites,
- scope,
- mandatory gates,
- explicit non-authority statement.

Detailed tasks are created only when that specification becomes active and live truth is re-read.

## Completion reporting

Repository/GitHub reports must distinguish:

- implementation complete,
- tests pass,
- review complete,
- merge complete,
- post-merge verified,
- spec closed.

Never collapse these into "done" prematurely.

## Roadmap changes

A roadmap entry can be:

- refined,
- split,
- reordered only with dependency evidence,
- removed with rationale.

Do not bypass a difficult gate by inventing a successor task that performs the same blocked behavior under another name.

## Quality culture

Signthos optimizes for:

- evidence over confidence,
- narrow trusted boundaries,
- transparent unknowns,
- small reviewable units,
- maintainability over rewrite enthusiasm,
- real user value over feature-count vanity.

## Success criterion

A new maintainer should be able to open the repository, read the canonical artifacts, identify the active frontier and understand what can and cannot be done next without access to private founder/chat context.
