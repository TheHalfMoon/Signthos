# Signthos Foundation Index

Status: CANONICAL FOUNDATION CATALOG
Date: 2026-09-02

This index is the navigation entry point for all Signthos planning and foundation material. GitHub is the canonical planning system. No local-only plan, private scratch roadmap, or external document may override this repository.

## Product definition

Signthos is a local-first open document and electronic-signing platform covering the full document lifecycle:

`capture/import -> inspect -> edit -> transform -> prepare -> route -> sign -> verify -> archive/export`

Product surfaces:

- Signthos Web
- Signthos Desktop — macOS, Windows, Linux
- Signthos Mobile — iOS, Android
- Signthos Server — self-hosted and managed
- Signthos API / SDKs / Embed
- Signthos CLI
- Signthos Verify

## Foundation documents

### Research and positioning

- [`RESEARCH.md`](./RESEARCH.md) — upstream and market research plus evidence-status rules.
- [`EXTERNAL-SOURCES.md`](./EXTERNAL-SOURCES.md) — canonical per-source evidence register with exact repository SHAs and mutable-source classifications.
- [`COMPETITOR-MATRIX.md`](./COMPETITOR-MATRIX.md) — normalized capability comparison and moat.
- [`STIRLING-CAPABILITY-MAP.md`](./STIRLING-CAPABILITY-MAP.md) — Stirling-class PDF capability mapping, redaction proof requirements and secure handoff constraints.
- [`PRODUCT-STRATEGY.md`](./PRODUCT-STRATEGY.md) — users, jobs, product pillars, scope and success model.
- [`BUSINESS-PRICING-PLAN.md`](./BUSINESS-PRICING-PLAN.md) — open-core avoidance, hosted business model and pricing hypothesis.

### Architecture and technical strategy

- [`MASTER-ARCHITECTURE.md`](./MASTER-ARCHITECTURE.md) — target system architecture and domain boundaries.
- [`PDF-ENGINE-STRATEGY.md`](./PDF-ENGINE-STRATEGY.md) — pinned Foundation PDF candidates plus browser/native/server/heavy provider strategy.
- [`SIGNING-STANDARDS-STRATEGY.md`](./SIGNING-STANDARDS-STRATEGY.md) — e-sign evidence, PAdES, certificate and verifier direction.
- [`LICENSING-STRATEGY.md`](./LICENSING-STRATEGY.md) — component licensing and upstream derivation boundaries.
- [`QUALITY-ATTRIBUTES.md`](./QUALITY-ATTRIBUTES.md) — privacy, security, availability, accessibility, i18n, portability and resilience.
- [`SECURITY-THREAT-MODEL.md`](./SECURITY-THREAT-MODEL.md) — trust boundaries, abuse cases and control objectives.
- [`DATA-SYNC-LIFECYCLE-PLAN.md`](./DATA-SYNC-LIFECYCLE-PLAN.md) — local vault, sync, retention, deletion and portability.

### Product surfaces

- [`UX-PRODUCT-PLAN.md`](./UX-PRODUCT-PLAN.md) — information architecture, document workspace and primary journeys.
- [`DESKTOP-MOBILE-PLAN.md`](./DESKTOP-MOBILE-PLAN.md) — Tauri desktop/mobile, native capabilities and secure QR handoff.
- [`API-SDK-EMBED-PLAN.md`](./API-SDK-EMBED-PLAN.md) — developer platform, API, webhooks, SDK and embedding.
- [`SELF-HOST-CLOUD-PLAN.md`](./SELF-HOST-CLOUD-PLAN.md) — deployment, operations and managed-cloud boundaries.
- [`AUTOMATION-INTEGRATIONS-PLAN.md`](./AUTOMATION-INTEGRATIONS-PLAN.md) — workflow engine, heavy processors and integrations.

### Engineering and delivery

- [`MIGRATION-IMPORT-PLAN.md`](./MIGRATION-IMPORT-PLAN.md) — controlled Documenso migration and Stirling capability reuse rules.
- [`TEST-QUALIFICATION-PLAN.md`](./TEST-QUALIFICATION-PLAN.md) — fixture corpora, contract tests, security tests and qualification gates.
- [`RELEASE-DISTRIBUTION-PLAN.md`](./RELEASE-DISTRIBUTION-PLAN.md) — builds, signing, stores, packages, migration and release channels.
- [`OPERATING-MODEL.md`](./OPERATING-MODEL.md) — SpecGrain/Diffciplane execution lifecycle and GitHub-first repository workflow.
- [`CAPABILITY-CATALOG.md`](./CAPABILITY-CATALOG.md) — planned feature/capability inventory and ownership by specification.
- [`SUCCESS-METRICS.md`](./SUCCESS-METRICS.md) — technical, product, community and business metrics.
- [`EPIC-INDEX.md`](./EPIC-INDEX.md) — GitHub issue mapping for Specifications 001–017 and their prerequisite/authority state.

### Community and identity

- [`COMMUNITY-GROWTH-PLAN.md`](./COMMUNITY-GROWTH-PLAN.md) — contributor experience, launch, ecosystem and growth.
- [`BRAND-PRODUCT-LANGUAGE.md`](./BRAND-PRODUCT-LANGUAGE.md) — product naming, positioning language and UI writing principles.

## Governance

- [`../../.specify/memory/constitution.md`](../../.specify/memory/constitution.md) — canonical constitution.
- [`../../AGENTS.md`](../../AGENTS.md) — execution rules for contributors/agents.
- [`../../ROADMAP.md`](../../ROADMAP.md) — dependency-ordered roadmap.
- [`../../provenance/UPSTREAM.md`](../../provenance/UPSTREAM.md) — upstream import provenance policy/register.
- [`../../specs/000-foundation/spec.md`](../../specs/000-foundation/spec.md) — active Foundation 000 specification.
- [`../../specs/000-foundation/plan.md`](../../specs/000-foundation/plan.md) — active plan.
- [`../../specs/000-foundation/tasks.md`](../../specs/000-foundation/tasks.md) — canonical task ledger.

## Planning authority rule

The documents and issues in this catalog may define future intent and successor scope. They do **not** authorize implementation before canonical prerequisites are satisfied.

In particular:

- no upstream product source may be imported before Foundation 000 closes;
- no restricted/commercial code may be imported without explicit rights evidence;
- no successor implementation begins merely because its plan or GitHub issue exists;
- exact live repository/governance truth overrides stale planning text;
- contradictions must be resolved in the active canonical specification before implementation;
- mutable unarchived external webpages cannot satisfy evidence-dependent gates merely because their URLs appear in research.

## Founding product decisions

Unless changed by a later evidence-backed ADR/specification:

1. Signthos is local-first and self-host-friendly.
2. Signthos does not directly merge Documenso and Stirling application monoliths.
3. Documenso is the primary signing/workflow brownfield reference.
4. Stirling is primarily a PDF-capability benchmark/selective permitted-source reference.
5. PDF functionality uses explicit provider contracts across browser/native/server/heavy execution.
6. Rust is used where native, local, security or verification value justifies it; the full application is not rewritten in Rust for ideology.
7. Tauri 2 is the desktop/mobile shell hypothesis, subject to an immutable release pin and platform spikes.
8. `DocumentRevision` and `Envelope` routing state remain distinct.
9. Signable input is a frozen/content-addressed PDF revision; conversion from non-PDF input creates a separate revision before signing.
10. Signthos Verify is independent from Signthos Cloud for locally verifiable claims.
11. Visual signatures, e-sign evidence, cryptographic PDF signatures and regulated trust levels are distinct concepts.
12. Redaction safety requires independent file-level verification, not a visual overlay.
13. Cross-device QR pairing must be one-time, short-lived and non-replayable with explicit redemption/revocation semantics.
14. AI is optional and never the authority for signature validity.
15. Core self-hosted capabilities should not be intentionally disabled solely to force a commercial upgrade.
16. GitHub repository state is the canonical plan and evidence system.
