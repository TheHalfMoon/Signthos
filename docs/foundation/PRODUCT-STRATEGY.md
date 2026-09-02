# Signthos Product Strategy

Status: FOUNDATION PLAN
Date: 2026-09-02

## Mission

Make trustworthy document work and electronic signing available everywhere without forcing users to surrender document control, deploy proprietary feature gates, or depend on one vendor to verify the result.

## Category

**Local-first open document and signing platform.**

Signthos should compete with the combined user expectation created by:

- e-signature platforms,
- PDF editors/processors,
- local desktop document tools,
- developer signing APIs,
- self-hosted document infrastructure.

## Core product promise

A user should be able to move through one coherent lifecycle:

```text
Capture / Import
  -> Inspect
  -> Edit / Fill / Transform
  -> Prepare
  -> Route / Approve / Sign
  -> Verify
  -> Export / Archive
```

The same document model and evidence boundaries must survive across local, connected, self-hosted and managed-cloud modes.

## Primary users

### Individual professional

Needs to open, edit, fill, sign and verify documents without a complex account workflow.

Success:

- install/open quickly,
- work locally,
- share a final verified PDF,
- optionally connect to a signing workflow.

### Small team

Needs reusable templates, multiple signers, approvals, reminders, audit evidence, shared document state and simple administration.

Success:

- self-host or use managed cloud,
- invite teammates,
- send and track documents,
- retain/export evidence,
- avoid per-feature enterprise gates.

### Developer / platform team

Needs signing/document infrastructure embedded into another product.

Success:

- stable API,
- webhooks,
- SDKs,
- signing and authoring embeds,
- idempotency/test mode,
- self-hosted deployment option,
- portable data/evidence.

### Regulated / security-conscious organization

Needs explicit trust boundaries, identity integrations, data control, retention, auditability and advanced signature-provider integration.

Success:

- documented security posture,
- tenant isolation,
- deployment control,
- explicit signature/evidence levels,
- independently verifiable results,
- no unsupported compliance marketing.

### Mobile-first user

Needs scan, fill, sign and share from iOS/Android without using a desktop browser workflow.

Success:

- camera capture,
- share sheet,
- biometric/local identity unlock,
- touch/stylus signature,
- offline queue,
- desktop QR handoff.

## Jobs to be done

1. "I have a PDF and need to fix/fill/sign it privately."
2. "I need several people to approve/sign this document in order."
3. "I need to prepare a document before sending it for signature."
4. "I need to prove what was signed, by whom, and whether the file changed."
5. "I need to integrate signing into my product without surrendering infrastructure control."
6. "I need to process hundreds of documents through a deterministic pipeline."
7. "I need to scan/sign on my phone and continue on my desktop."
8. "I need a self-hosted alternative whose core capabilities remain open."

## Product pillars

### 1. Document workspace

One workspace, not a directory of disconnected PDF tools.

Includes progressively:

- view/inspect,
- page operations,
- annotation,
- forms,
- redaction,
- merge/split,
- metadata,
- compression,
- OCR/conversion,
- compare/repair,
- document history.

### 2. Signing workflows

- self-sign,
- multi-party signing,
- signing order,
- approvals,
- templates,
- bulk send,
- reminders/expiry/rejection,
- signing links,
- in-person mode,
- identity/auth provider adapters.

### 3. Verification and evidence

- content-addressed revisions,
- public evidence schema,
- audit events,
- certificate/signature validation,
- completion certificate,
- `signthos verify`,
- explicit unsupported/unknown states.

### 4. Local-first native applications

- desktop local mode,
- mobile scan/sign/share,
- encrypted local vault,
- no silent upload,
- offline behavior,
- optional account/server connection.

### 5. Open developer platform

- REST/OpenAPI,
- webhooks,
- SDKs,
- embed signing,
- embed authoring,
- workflow API,
- CLI,
- test/sandbox mode.

### 6. Self-hosted operations

- Docker/OCI distribution,
- PostgreSQL/object storage,
- configurable email/storage/identity providers,
- backup/restore,
- observability,
- upgrade/migration support,
- secure defaults.

## Explicit product anti-goals

Signthos is not:

- a cosmetic Documenso rebrand,
- a direct source-tree merge with Stirling PDF,
- a 100-button PDF utility dashboard with no coherent lifecycle,
- a cloud-only SaaS clone,
- an AI wrapper whose correctness depends on a model,
- a proprietary-feature-gated self-host distribution,
- a product that claims legal/compliance levels without evidence,
- a complete office-suite replacement.

## v0.1 product story

A credible v0.1 should demonstrate the thesis, not maximum checkbox count.

Required story:

1. A user can self-host Signthos Web/Server and execute a real multi-party signing workflow.
2. A user can perform a useful P0 set of PDF preparation operations in the same product model.
3. A desktop user can open a local PDF, edit/fill/self-sign/verify/export without an account.
4. A mobile user can scan/import and complete a bounded signing flow, or the mobile surface is explicitly released as beta with known gaps.
5. Developers can use documented API/webhooks and at least one production-quality SDK.
6. Signthos Verify can independently validate the supported cryptographic/evidence claims.
7. Every imported source path has provenance/license evidence.

## v0.1 exclusions unless later evidence changes scope

- broad AI authoring suite,
- every Stirling PDF function,
- native office editing,
- proprietary trust service implementation,
- unsupported QES claims,
- custom video identity verification,
- full collaborative live document editing,
- marketplace/ecosystem before API stability.

## Product differentiation test

A major roadmap item should strengthen at least one Signthos differentiator:

- local-first privacy,
- coherent document lifecycle,
- native cross-platform experience,
- open self-hosting,
- independent verification,
- developer openness,
- deterministic automation.

A feature that does none of these requires stronger justification.

## Strategic sequencing

### Foundation

Provenance, architecture, signing semantics and quality attributes.

### Brownfield capture

Import/characterize the mature signing/workflow base without redesign.

### Anti-corruption boundary

Establish Signthos domain contracts so future work is no longer tied directly to upstream product assumptions.

### Differentiation

Local PDF core, independent verifier, desktop/mobile and unified workspace.

### Platformization

API/SDK/embed, workflow automation, robust self-hosting.

### Expansion

Advanced trust providers, collaboration, AI assistance, managed cloud and ecosystem.

## Product decision rule

When choosing between breadth and trustworthiness, Signthos prioritizes:

1. correctness,
2. document integrity,
3. privacy/security,
4. predictable cross-platform behavior,
5. excellent core workflow,
6. breadth.

Feature count is never a substitute for a trustworthy document lifecycle.
