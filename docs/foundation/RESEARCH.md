# Signthos Foundation Research

Status: FOUNDING RESEARCH
Date: 2026-09-02

## 1. Product thesis

Signthos should not launch as a renamed Documenso fork or a Stirling PDF bundle.

The target product is an **open document operating system** that unifies:

1. local/private PDF work,
2. document preparation and editing,
3. multi-party e-signature workflows,
4. independently verifiable signing evidence,
5. automation and developer APIs,
6. native desktop and mobile workflows,
7. self-hosted and managed-cloud deployment.

The strategic wedge is the combination that existing open-source products do not currently deliver as one coherent architecture:

> Local-first PDF workspace + serious e-signature workflow + native apps + open developer platform + verifiable evidence.

## 2. Upstream snapshots

### 2.1 Documenso

Repository: https://github.com/documenso/documenso
Observed main snapshot: `3ec877a68bc423373220f9ee2fda3d93ba368680`
Observed version family: `2.17.0`

Relevant architecture observed at the snapshot:

- TypeScript monorepo with `apps/*` and `packages/*` workspaces.
- React 19 / React Router application surface.
- Hono/tRPC/API layers.
- Prisma + PostgreSQL persistence.
- Dedicated packages for API, auth, database, signing, email, UI, tests, and enterprise functionality.
- Existing REST API, webhooks, embedding, templates/envelopes, recipient workflows, signing, audit and team concepts.

Hosted pricing values observed on 2026-09-02:

- Free: $0, 5 documents/month.
- Individual: $25/month billed yearly.
- Teams: $40/month billed yearly, 5 users included.
- Platform: $250/month billed yearly.

Mutable source: https://documenso.com/pricing
Evidence status: `UNVERIFIED_MUTABLE_SOURCE`.

No immutable page capture, content digest, or vendor revision identifier was preserved for this pricing observation. These values are therefore contextual market observations, not reproducible/auditable pricing evidence, and must not be used as a release or business decision gate without a fresh evidence-backed pricing specification.

### 2.2 Documenso licensing boundary

The repository root is AGPL-3.0, but `packages/ee/` is explicitly outside the community AGPL boundary and requires a Documenso Enterprise license.

The observed enterprise feature list includes:

- Stripe Billing Module
- Organisation Authentication Portal
- Document Action Reauthentication (Passkeys and 2FA)
- 21 CFR
- Email domains
- Embed authoring
- Embed authoring white label
- Enterprise support / licensing behavior

Source paths at the observed Documenso snapshot:

- `LICENSE`
- `apps/docs/content/docs/policies/community-edition.mdx`
- `apps/docs/content/docs/policies/enterprise-edition.mdx`
- `packages/ee/FEATURES`

**Signthos rule:** no Documenso Enterprise Edition source may be imported until a written permission artifact is preserved that explicitly covers copying, modification, redistribution, sublicensing/open-source publication, and derivative works. General permission to "copy" is not enough evidence for relicensing.

### 2.3 Stirling PDF

Repository: https://github.com/Stirling-Tools/Stirling-PDF
Observed main snapshot: `42bdce155c4bc1954a1e3c8ad10a108f2578ad8f`
Observed version family in Gradle: `2.14.3`

Stirling positions itself as an open-source PDF platform with desktop, browser, self-hosted server and API surfaces. Its documentation observed on 2026-09-02 advertised 55+ tools, including:

- text/image editing,
- merge/split/reorder/rotate,
- OCR,
- compression,
- format conversion,
- compare,
- redaction,
- annotation,
- password/permissions,
- handwritten signing,
- certificate signing,
- signature validation,
- watermarking,
- sanitization,
- workflows/automation,
- API processing.

Mutable functionality source: https://docs.stirlingpdf.com/functionality/
Evidence status for the mutable webpage wording/count: `UNVERIFIED_MUTABLE_SOURCE`.

Repository/source-code architecture and license observations are instead bound to the exact Stirling commit above.

Architecture observations:

- Java 25 + Spring Boot 4 backend.
- PDFBox, BouncyCastle and a broad document-processing dependency set.
- React 19 frontend.
- EmbedPDF and pdf-lib based editor capabilities.
- Tauri 2 desktop integration.
- Playwright/Vitest frontend testing.
- Docker/server distribution with optional heavy processing dependencies such as LibreOffice and Tesseract.

### 2.4 Stirling licensing boundary

Stirling PDF is open-core, not uniformly MIT.

The repository root license states that content outside listed restricted directories is MIT, while multiple directories carry separate licenses, including:

- `app/proprietary/`
- `app/saas/`
- `engine/`
- `frontend/editor/src/proprietary/`
- `frontend/editor/src/desktop/`
- `frontend/editor/src/saas/`
- `frontend/editor/src/cloud/`
- `frontend/editor/src/prototypes/`
- `frontend/editor/src/portal/`
- `frontend/editor/src/portal-saas/`

The observed `engine/LICENSE` and `frontend/editor/src/desktop/LICENSE` prohibit redistribution/sublicensing without a valid agreement.

**Signthos rule:** Stirling's restricted directories are reference-only unless Signthos obtains separate explicit rights. Functional ideas may be independently implemented. MIT-covered files may only be imported with preserved copyright/license notices and provenance evidence.

## 3. Competitor research

### DocuSeal

Repository: https://github.com/docusealco/docuseal
License observation: AGPL-3.0 with Section 7(b) attribution requirement for interactive UI.

Observed product strengths include:

- WYSIWYG PDF form builder,
- multiple signers,
- mobile-optimized signing,
- signature verification,
- API/webhooks,
- storage provider support,
- bulk send,
- SMS identity verification,
- conditional fields/formulas,
- SAML SSO,
- payments,
- API/embedding.

Pricing values observed on 2026-09-02:

- Cloud Basic: free.
- Pro: $20/user/month.
- API/embedding production: $0.20 per completed document in addition to Pro eligibility.

Mutable source: https://www.docuseal.com/pricing
Evidence status: `UNVERIFIED_MUTABLE_SOURCE`.

No immutable page capture, content digest, or vendor revision identifier was preserved for this pricing observation. The values are contextual only until refreshed under a reproducible market/pricing evidence procedure.

### OpenSign

Repository: https://github.com/OpenSignLabs/OpenSign
License observation: AGPL-3.0 according to observed repository documentation.

Observed strengths include:

- multi-signer workflows and signing order,
- guest email OTP,
- expiration/rejection,
- reusable templates,
- document vault/drive,
- detailed audit trail and completion certificate,
- API/integrations,
- customizable email workflows.

### Commercial reference class

Signthos should measure product completeness against commercial expectations from DocuSign and Adobe Acrobat Sign without copying proprietary implementation or branding. The competitive bar includes native/mobile workflows, identity options, auditability, template/workflow power, enterprise administration, APIs, integrations, and compliance-grade evidence.

## 4. Key gaps Signthos should exploit

### Gap A — Signing and PDF work are separate products

Open-source signing products focus on signature workflows. PDF suites focus on manipulation. Users frequently need both before and after signature.

Signthos should make the document lifecycle continuous:

`import -> inspect -> edit -> redact -> prepare -> route -> sign -> verify -> archive/export`

### Gap B — Local-first signing is weak

A user should be able to install Signthos Desktop, open a local PDF, edit/fill/sign/seal/export it without creating an account or uploading the document.

### Gap C — Native mobile is underexploited

Mobile should be more than a responsive signing page. First-class workflows include:

- camera scan to PDF,
- share-sheet import/export,
- touch/stylus signature capture,
- biometric/passkey unlock,
- secure QR handoff from desktop,
- push notifications,
- offline queue,
- tablet kiosk/in-person mode.

### Gap D — Verification should not depend on the vendor

Signthos should ship an independent verifier surface:

`signthos verify document.pdf`

The verifier should be able to validate document integrity, signature metadata, evidence bundles and supported certificate chains without trusting Signthos Cloud.

### Gap E — Open-source products often use feature gates

Signthos should monetize managed operations, not software freedom. Core self-hosted product capabilities should not be artificially disabled because the user has not purchased a cloud/enterprise tier.

### Gap F — Developer experience is fragmented

A first-class API and SDK surface should cover the same domain model used by the product UI. Embedded signing, embedded authoring, webhooks, test mode and local development should be designed as core product contracts.

## 5. Product capability map

### Document workspace

- PDF viewer
- text/image annotation
- form fill
- page organizer
- merge/split/extract/rotate
- crop
- watermark
- stamp
- page numbering
- metadata
- attachments
- compare
- sanitize
- redact
- compress
- repair
- OCR
- conversion
- scan/import

### Signing

- self-sign
- multi-party signing
- signing order
- approver / viewer / CC / witness roles
- reusable signatures and initials
- typed/drawn/uploaded signatures
- field placement
- templates
- bulk send
- reminders
- expiry / rejection
- in-person signing
- signing links
- evidence bundle
- completion certificate
- certificate-backed signatures
- verification

### Identity

- email OTP
- passkeys
- TOTP
- SMS provider adapter
- OIDC/SAML organization auth
- optional identity-proofing adapters
- remote trust-provider adapters for advanced signature levels

### Automation

- visual workflow builder
- deterministic multi-tool PDF pipelines
- webhook events
- API-triggered workflows
- CLI
- batch processing
- scheduled/queue execution where authorized

### Platform

- REST API
- webhooks
- TypeScript SDK
- Python SDK
- Go SDK
- Rust SDK/core crates where useful
- embedding for signing
- embedding for authoring
- local development sandbox

## 6. Product positioning

Primary positioning:

> **Signthos — Open documents. Open signing. Everywhere.**

Category:

> Local-first open document and signing platform.

Not:

- a Documenso rebrand,
- a Stirling rebrand,
- a cloud-only DocuSign clone,
- a generic AI wrapper,
- an unbounded PDF utility collection.

## 7. Pricing hypothesis

Self-hosted software should remain fully functional without artificial feature gates.

Managed cloud pricing should charge for infrastructure, delivery, storage, managed identity/compliance integrations, support and SLA rather than source-code capability unlocks.

Initial hypothesis, to be validated under a future reproducible pricing/market specification before launch:

- Free Cloud: $0 with bounded monthly managed usage.
- Personal Cloud: approximately $8-$10/month.
- Team Cloud: approximately $25-$30/month with multiple included seats.
- Business Cloud: approximately $79-$99/month with larger managed quotas and support.
- Enterprise: custom SLA/compliance/procurement terms.

This is a product hypothesis, not a committed price list.

## 8. Evidence rule for external research

Repository-derived claims must bind the repository name, exact commit SHA and path used as evidence.

Mutable webpages must record:

- exact URL,
- retrieval date,
- immutable revision/archive/content digest when available,
- otherwise explicit `UNVERIFIED_MUTABLE_SOURCE` status.

Mutable unarchived pages may inform exploration, but they may not be presented as reproducible evidence or satisfy evidence-dependent release/legal/pricing gates.

The canonical source register is `docs/foundation/EXTERNAL-SOURCES.md`.

## 9. Research conclusion

The strongest architecture is not to merge Documenso and Stirling source trees.

Signthos should:

1. use Documenso as the primary brownfield workflow/signing reference and controlled import candidate;
2. use Stirling as the PDF capability benchmark and selectively import only clearly permitted code when useful;
3. implement a new capability boundary that allows browser-local, native-local, server and optional heavy-processing providers;
4. preserve a new Signthos domain model and product identity from the first implementation specification;
5. keep all imports provenance-addressable to exact upstream commits.
