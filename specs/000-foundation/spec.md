# Specification 000 — Foundation

Status: DRAFT

## Problem

Signthos begins from a powerful but risky premise: reuse mature open-source/commercially-permitted e-signature source while adding a broad local PDF platform and new native applications.

Without an explicit foundation, the repository could become:

- a cosmetic fork,
- an unmaintainable merge of two large applications,
- a licensing/provenance liability,
- a platform with contradictory web/native behavior,
- a feature pile without a coherent document model,
- a signing product that overstates cryptographic or regulatory assurance,
- a cross-platform product whose mobile distribution or dependency licensing was never designed explicitly.

## Goal

Establish the canonical product thesis, licensing/provenance boundary, competitor benchmark, architecture, PDF/signing technology strategy, cross-cutting quality posture and dependency-ordered execution roadmap before any upstream product source is imported.

## Scope in

- Documenso current-state research.
- Stirling PDF current-state research.
- focused competitor benchmark.
- product positioning.
- master architecture.
- upstream provenance register.
- licensing architecture and mobile-distribution risk boundary.
- PDF engine/provider strategy.
- signing standards/evidence/trust-provider strategy.
- privacy/security/accessibility/reliability/portability quality attributes.
- SpecGrain/Diffciplane constitution.
- canonical roadmap.
- Foundation 000 execution ledger.
- explicit unresolved legal/licensing questions.

## Scope out

- copying Documenso application source.
- copying Stirling restricted source.
- implementing PDF tools.
- implementing signing features.
- implementing Tauri applications.
- creating production cloud infrastructure.
- making compliance/legal-effect claims.
- declaring pricing as final.
- choosing final production dependency versions before successor spikes/tests.
- resolving jurisdiction-specific legal advice in Foundation 000.

## Product invariants

1. Signthos is local-first.
2. Self-hosted core software is not intentionally crippled to sell feature unlocks.
3. Web, desktop and mobile share canonical domain contracts.
4. Heavy PDF engines are provider-isolated.
5. Signing inputs become immutable at the defined routing boundary.
6. Verification is independently available where technically possible.
7. Provenance is known before source import.
8. Restricted-source rights are evidence-backed.
9. AI is optional and outside the signature-validity trust path.
10. Uncertainty is not represented as verification success.
11. A visual signature, electronic-signature evidence, cryptographic PDF signature and regulated trust level are distinct concepts.
12. Local-only mode never silently falls back to network processing.
13. Authentication does not substitute for server-side resource authorization.
14. Data retention/deletion claims must match actual storage, backup and evidence behavior.
15. Accessibility, RTL/i18n, supply-chain security and offline failure behavior are release attributes, not post-release polish.

## Primary architecture decisions proposed for validation

- Keep PostgreSQL as the server persistence baseline.
- Keep a TypeScript/React product surface during brownfield migration.
- Introduce Rust for native/local security-sensitive capability boundaries rather than rewrite the entire server in Rust.
- Use Tauri 2 as the desktop/mobile shell hypothesis, subject to native feasibility/distribution qualification.
- Separate `Document`/revision state from `Envelope` routing/signing state.
- Create typed PDF capability providers instead of merging Stirling's Java backend into the Documenso application.
- Use multiple fit-for-purpose PDF engines behind Signthos contracts rather than one universal PDF engine.
- Keep signing and independent verification as explicit trust boundaries rather than generic editor utilities.
- Treat Stirling restricted code as non-importable without separate rights.
- Preserve Documenso AGPL obligations unless explicit rights permit different treatment.
- Prefer permissively licensed independently authored SDK/protocol/native-shell components only when copyright derivation and dependency graphs genuinely permit that classification.
- Treat iOS/App Store distribution as an explicit licensing/dependency gate rather than assuming an AGPL-derived mobile binary is automatically suitable.

## Foundation documents

The following documents are normative Foundation 000 outputs for successor planning:

- `docs/foundation/RESEARCH.md`
- `docs/foundation/COMPETITOR-MATRIX.md`
- `docs/foundation/MASTER-ARCHITECTURE.md`
- `docs/foundation/STIRLING-CAPABILITY-MAP.md`
- `docs/foundation/LICENSING-STRATEGY.md`
- `docs/foundation/PDF-ENGINE-STRATEGY.md`
- `docs/foundation/SIGNING-STANDARDS-STRATEGY.md`
- `docs/foundation/QUALITY-ATTRIBUTES.md`
- `provenance/UPSTREAM.md`
- `.specify/memory/constitution.md`
- `ROADMAP.md`
- `specs/000-foundation/plan.md`
- `specs/000-foundation/tasks.md`

Where a foundation document says a choice is a hypothesis, candidate, proposed direction or later-specification gate, it does not authorize implementation by itself.

## Acceptance criteria

Foundation 000 may close only when all of the following are true:

- `docs/foundation/RESEARCH.md` exists and identifies exact observed upstream snapshots.
- `docs/foundation/COMPETITOR-MATRIX.md` exists and identifies the intended Signthos moat.
- `docs/foundation/MASTER-ARCHITECTURE.md` exists and defines runtime/provider/security boundaries.
- `docs/foundation/STIRLING-CAPABILITY-MAP.md` maps broad PDF ambitions into bounded Signthos priorities/providers rather than authorizing wholesale source copying.
- `docs/foundation/LICENSING-STRATEGY.md` defines proposed component licensing boundaries and explicitly carries unresolved rights/mobile-distribution gates.
- `docs/foundation/PDF-ENGINE-STRATEGY.md` defines fit-for-purpose PDF engine candidates, signature/revision safety rules and proof obligations without prematurely pinning production versions.
- `docs/foundation/SIGNING-STANDARDS-STRATEGY.md` defines standards/trust-level distinctions, independent verification requirements and non-claim boundaries.
- `docs/foundation/QUALITY-ATTRIBUTES.md` assigns privacy, security, authorization, data lifecycle, offline, accessibility, i18n/RTL, performance, abuse and supply-chain concerns to successor specifications.
- `provenance/UPSTREAM.md` exists and classifies known upstream license boundaries.
- `.specify/memory/constitution.md` exists and prohibits pre-foundation code import.
- `ROADMAP.md` defines dependency-ordered bounded successor specifications and incorporates the foundation strategy gates.
- `plan.md` and `tasks.md` define the Foundation 000 closeout path.
- unresolved license/permission questions are explicitly marked as gates rather than assumed solved.
- the exact candidate diff remains within the Foundation 000 allowed change surface and contains no prohibited product-source import.
- an independent substantive review evaluates architecture, licensing/provenance assumptions, PDF/signing strategies, quality attributes, roadmap decomposition and missing competitor capabilities.
- required review findings are reconciled and the independent reviewer evaluates the reconciled exact candidate head when findings change normative content.
- required checks/qualification evidence are bound to the exact candidate head; absent CI is recorded as absent rather than misreported as passing.
- no unresolved blocking review threads/conversations remain.
- the foundation PR is merged using expected-head protection where supported.
- post-merge verification confirms canonical files on `main` and no prohibited upstream source import.

## Definition of grain for successors

A successor task is small enough when a reviewer can answer all of the following without reconstructing hidden intent:

- What single behavior or contract changes?
- Which paths are allowed to change?
- What is explicitly forbidden?
- What evidence proves the behavior?
- What failure/rollback boundary exists?
- Which exact dependency enables the work?
- Which license/provenance/security boundary is crossed, if any?

If these questions cannot be answered cleanly, recursively refine the task.
