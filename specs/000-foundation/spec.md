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
- a cross-platform product whose mobile distribution or dependency licensing was never designed explicitly,
- a plan scattered across chat/local scratch rather than durable repository truth.

## Goal

Establish the canonical product thesis, evidence/provenance boundary, licensing strategy, competitor benchmark, architecture, product/UX plan, PDF/signing technology strategy, cross-cutting quality/security posture, delivery/business/community plans and dependency-ordered execution roadmap before any upstream product source is imported.

## Scope in

- Documenso and Stirling current-state research bound to exact repository snapshots.
- focused competitor benchmark and explicit evidence status for mutable web observations.
- product positioning, user/jobs strategy and capability catalog.
- master architecture and domain model.
- upstream provenance register and external-source register.
- licensing architecture and mobile-distribution risk boundary.
- PDF engine/provider strategy with pinned Foundation candidates and successor proof gates.
- signing standards/evidence/trust-provider strategy.
- privacy/security/accessibility/reliability/portability quality attributes and threat model.
- data/sync lifecycle design.
- UX/web/desktop/mobile/API/SDK/embed/self-host/cloud/automation plans.
- migration/import, testing/qualification, release/distribution plans.
- business/pricing hypothesis, brand/product language, metrics and community/growth plan.
- SpecGrain/Diffciplane constitution and GitHub-first operating model.
- canonical dependency roadmap and Foundation 000 task ledger.
- explicit unresolved legal/licensing/distribution questions.

## Scope out

- copying Documenso application source.
- copying Stirling restricted source.
- implementing PDF tools.
- implementing signing features.
- implementing Tauri applications.
- creating production cloud infrastructure.
- making compliance/legal-effect claims.
- declaring pricing as final.
- declaring Foundation dependency candidates as final production versions without successor qualification.
- resolving jurisdiction-specific legal advice in Foundation 000.

## Product invariants

1. Signthos is local-first.
2. Self-hosted core software is not intentionally crippled to sell feature unlocks.
3. Web, desktop and mobile share canonical domain contracts.
4. Heavy PDF engines are provider-isolated.
5. A signable artifact is a frozen/content-addressed PDF revision; non-PDF imports become explicit conversion revisions before signing.
6. Signing inputs become immutable at the defined routing boundary.
7. Verification is independently available where technically possible.
8. Provenance is known before source import.
9. Restricted-source rights are evidence-backed.
10. AI is optional and outside the signature-validity trust path.
11. Uncertainty is not represented as verification success.
12. A visual signature, electronic-signature evidence, cryptographic PDF signature and regulated trust level are distinct concepts.
13. Local-only mode never silently falls back to network processing.
14. Authentication does not substitute for server-side resource authorization.
15. Data retention/deletion claims must match actual storage, backup and evidence behavior.
16. Accessibility, RTL/i18n, supply-chain security and offline failure behavior are release attributes, not post-release polish.
17. Redaction is safe only when permanent removal is independently verified at the exported-file level; visual concealment is insufficient.
18. Cross-device handoff bootstrap credentials are one-time, short-lived and non-replayable with explicit confirmation/redemption/revocation semantics.
19. Mutable unarchived external webpages do not satisfy hard evidence-dependent gates.
20. GitHub repository state is the durable planning/evidence authority; local/chat scratch is non-canonical.

## Primary architecture decisions proposed for validation

- Keep PostgreSQL as the server persistence baseline.
- Keep a TypeScript/React product surface during brownfield migration.
- Introduce Rust for native/local security-sensitive capability boundaries rather than rewrite the entire server in Rust.
- Use Tauri 2 as the desktop/mobile shell hypothesis, subject to an immutable release pin and native feasibility/distribution qualification.
- Separate `Document`/revision state from `Envelope` routing/signing state.
- Create typed PDF capability providers instead of merging Stirling's Java backend into the Documenso application.
- Use multiple fit-for-purpose PDF engines behind Signthos contracts rather than one universal PDF engine.
- Record EmbedPDF v2.15.0/PDFium and LibPDF v0.4.2 as Foundation candidates, not final production adoption; successor specs must revalidate exact versions/binaries/licenses/fixtures.
- Keep signing and independent verification as explicit trust boundaries rather than generic editor utilities.
- Treat Stirling restricted code as non-importable without separate rights.
- Preserve Documenso AGPL obligations unless explicit rights permit different treatment.
- Prefer permissively licensed independently authored SDK/protocol/native-shell components only when copyright derivation and dependency graphs genuinely permit that classification.
- Treat iOS/App Store and Google Play distribution as explicit exact-binary licensing/dependency gates.

## Normative Foundation 000 corpus

### Catalog and evidence

- `docs/foundation/INDEX.md`
- `docs/foundation/RESEARCH.md`
- `docs/foundation/EXTERNAL-SOURCES.md`
- `docs/foundation/COMPETITOR-MATRIX.md`
- `docs/foundation/STIRLING-CAPABILITY-MAP.md`

### Product and business

- `docs/foundation/PRODUCT-STRATEGY.md`
- `docs/foundation/UX-PRODUCT-PLAN.md`
- `docs/foundation/BUSINESS-PRICING-PLAN.md`
- `docs/foundation/BRAND-PRODUCT-LANGUAGE.md`
- `docs/foundation/SUCCESS-METRICS.md`
- `docs/foundation/COMMUNITY-GROWTH-PLAN.md`

### Architecture and security

- `docs/foundation/MASTER-ARCHITECTURE.md`
- `docs/foundation/LICENSING-STRATEGY.md`
- `docs/foundation/PDF-ENGINE-STRATEGY.md`
- `docs/foundation/SIGNING-STANDARDS-STRATEGY.md`
- `docs/foundation/QUALITY-ATTRIBUTES.md`
- `docs/foundation/SECURITY-THREAT-MODEL.md`
- `docs/foundation/DATA-SYNC-LIFECYCLE-PLAN.md`

### Product surfaces and platform

- `docs/foundation/DESKTOP-MOBILE-PLAN.md`
- `docs/foundation/API-SDK-EMBED-PLAN.md`
- `docs/foundation/SELF-HOST-CLOUD-PLAN.md`
- `docs/foundation/AUTOMATION-INTEGRATIONS-PLAN.md`
- `docs/foundation/CAPABILITY-CATALOG.md`

### Engineering, migration and delivery

- `docs/foundation/MIGRATION-IMPORT-PLAN.md`
- `docs/foundation/TEST-QUALIFICATION-PLAN.md`
- `docs/foundation/RELEASE-DISTRIBUTION-PLAN.md`
- `docs/foundation/OPERATING-MODEL.md`

### Canonical governance

- `provenance/UPSTREAM.md`
- `.specify/memory/constitution.md`
- `AGENTS.md`
- `ROADMAP.md`
- `specs/000-foundation/plan.md`
- `specs/000-foundation/tasks.md`

Where a foundation document says a choice is a hypothesis, candidate, proposed direction or later-specification gate, it does not authorize implementation by itself.

## Acceptance criteria

Foundation 000 may close only when all of the following are true:

- the complete normative corpus above exists and is internally navigable from `docs/foundation/INDEX.md`;
- exact repository evidence and mutable-web evidence status are recorded in `docs/foundation/EXTERNAL-SOURCES.md`;
- product thesis, moat, product surfaces, business model, UX, community and success metrics are represented in-repository rather than remaining chat/local-only plans;
- master architecture defines domain/runtime/provider/security boundaries;
- Stirling capability ambitions are decomposed into bounded Signthos priorities/providers rather than wholesale source-copy authority;
- licensing strategy and `provenance/UPSTREAM.md` define fail-closed path/permission boundaries;
- the conceptual provenance manifest has unambiguous SPDX and explicit permission-scope/import-date/copyright/review requirements;
- PDF strategy records exact Foundation candidate provenance and component-license boundaries while requiring successor fixture/binary requalification;
- signing strategy defines standards/trust distinctions, independent verification and non-claim boundaries;
- redaction and secure QR handoff security invariants are explicit;
- quality/threat/data plans assign privacy, authorization, lifecycle, offline, accessibility, RTL, abuse, backup and supply-chain concerns to successor specifications;
- `ROADMAP.md` encodes real contract dependencies: 004 before PDF-dependent 005/006/007/010, 011 after 003+009, and 012 after all release-critical predecessors;
- `plan.md` and `tasks.md` define the Foundation 000 closeout path;
- unresolved rights/distribution/compliance questions are explicit gates rather than assumed solved;
- the exact candidate diff remains within the Foundation 000 allowed change surface and contains no prohibited product-source import;
- an independent substantive review evaluates the Foundation architecture/plans/risks;
- every still-valid substantive review finding is reconciled with repository evidence and review threads are resolved;
- because normative content changed after the initial review, an independent reviewer re-evaluates the reconciled exact candidate head or exact delta in a way that substantively covers the final candidate;
- required checks/qualification evidence are bound to the exact candidate head; absent CI is recorded as absent rather than misreported as passing;
- no unresolved blocking review threads/conversations remain;
- the foundation PR is merged using expected-head protection where supported;
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
