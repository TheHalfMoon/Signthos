# Signthos Capability Catalog

Status: FOUNDATION PLAN
Date: 2026-09-02

This catalog assigns major product capabilities to roadmap specifications. Presence here is planning intent, not implementation authority.

Legend:

- `F` foundation/contract work
- `v0.1` intended first-release story
- `post` later expansion
- `optional` provider-dependent

## Document workspace

| Capability | Priority | Planned owner |
|---|---|---|
| PDF view/render | v0.1 | Spec 004 |
| Page thumbnails/navigation | v0.1 | Spec 004/006 |
| Reorder/rotate/remove/extract pages | v0.1 | Spec 004 |
| Merge/split | v0.1 | Spec 004 |
| Annotation | v0.1 | Spec 004/006 |
| Form fill | v0.1 | Spec 004/006 |
| Text/image placement | v0.1 candidate | Spec 004 |
| Metadata/info | v0.1 | Spec 004 |
| Watermark/stamp/page numbers | v0.1/P1 | Spec 004 |
| Redaction | v0.1 | Spec 004 |
| Sanitization | P1 | Spec 004 |
| Compare | P1 | Spec 004 |
| Compression | P1 | Spec 004/010 |
| Repair | post/optional | Spec 010 |
| OCR | v0.1 optional provider | Spec 010 |
| Office conversion | post/optional | Spec 010 |
| PDF/A conversion | post | Spec 010/017 |
| Attachments | P1 | Spec 004 |
| Embedded-JS inspection | P1 security | Spec 004/011 |
| Batch PDF transforms | P1 | Spec 010 |

## Capture/import

| Capability | Priority | Planned owner |
|---|---|---|
| Local filesystem import | v0.1 | Spec 006/007 |
| Browser upload/import | v0.1 | Spec 006 |
| Mobile camera scan | v0.1/beta | Spec 008 |
| Share-sheet/intents | v0.1/beta | Spec 008 |
| Image-to-PDF | v0.1/beta | Spec 008/004 |
| Office source conversion to signable PDF | P1 optional | Spec 010 |

## Document revision model

| Capability | Priority | Planned owner |
|---|---|---|
| Content-addressed revision | F/v0.1 | Spec 003/004 |
| Revision history | v0.1 | Spec 003/006 |
| Signable frozen PDF revision | F/v0.1 | Spec 003/005 |
| Supersession/new revision after edits | v0.1 | Spec 003/005 |
| Local-connected state | v0.1 | Spec 007/014 |

## Signing workflows

| Capability | Priority | Planned owner |
|---|---|---|
| Self-sign | v0.1 | Spec 005/007 |
| Multi-recipient signing | v0.1 | Spec 002/005/006 |
| Signing order | v0.1 | Spec 002/005 |
| Approver/viewer/CC roles | v0.1 | Spec 002/005 |
| Rejection/cancel/expiry | v0.1 | Spec 002/005 |
| Reminders | v0.1 | Spec 002/005/011 |
| Templates | v0.1 | Spec 002/006 |
| Bulk send | P1 | Spec 009/010 |
| Signing links | v0.1/P1 | Spec 005/009 |
| In-person/kiosk signing | P1 | Spec 008 |
| Witness role | P1/post | Spec 005/013 |
| Conditional fields/rules | P1 | Spec 005/006 |
| Attachments during signing | P1 | Spec 005 |

## Signature appearance

| Capability | Priority | Planned owner |
|---|---|---|
| Drawn signature | v0.1 | Spec 005/006/008 |
| Typed signature | v0.1 | Spec 005/006 |
| Uploaded signature image | v0.1 candidate | Spec 005/006 |
| Initials | v0.1 | Spec 005 |
| Saved local signature | v0.1 desktop/mobile | Spec 007/008 |
| Biometric unlock of saved artifact | v0.1/beta | Spec 007/008 |

## Cryptographic signing and evidence

| Capability | Priority | Planned owner |
|---|---|---|
| Signed byte-range integrity model | F/v0.1 | Spec 005 |
| Local certificate signer | v0.1 target | Spec 005/007 |
| Server/KMS signer | v0.1/P1 | Spec 005/011 |
| PAdES B-B target | v0.1 target after proof | Spec 005 |
| Timestamp/B-T | P1 | Spec 005/013 |
| LT/LTA evidence | post | Spec 013/017 |
| Remote trust provider | post | Spec 013 |
| QES integration | post, provider/evidence gated | Spec 013/017 |
| EvidenceBundle v1 | v0.1 | Spec 005 |
| Completion certificate | v0.1 | Spec 005 |
| Canonical audit events | v0.1 | Spec 005 |

## Verification

| Capability | Priority | Planned owner |
|---|---|---|
| `signthos verify` CLI | v0.1 | Spec 005 |
| Desktop verify | v0.1 | Spec 007 |
| Web verify | v0.1/P1 | Spec 006 |
| Certificate-chain status | v0.1/P1 | Spec 005 |
| Tamper detection | v0.1 | Spec 005 |
| Timestamp status | P1 | Spec 005/013 |
| Revocation status | P1/post | Spec 005/013 |
| Evidence bundle verification | v0.1 | Spec 005 |
| Export verification report | v0.1/P1 | Spec 005/006 |

## Identity/authentication

| Capability | Priority | Planned owner |
|---|---|---|
| User accounts/sessions | v0.1 inherited/baseline | Spec 002 |
| Organizations/members | v0.1 inherited/baseline | Spec 002 |
| Recipient email link | v0.1 | Spec 002/005 |
| Email OTP | v0.1/P1 | Spec 005/013 |
| Password-protected access | P1 | Spec 005 |
| Passkeys/WebAuthn | v0.1/P1 if permitted/built | Spec 002/013 |
| TOTP/action re-auth | P1 | Spec 013 |
| OIDC | v0.1/P1 | Spec 011 |
| SAML | P1 | Spec 011/013 |
| SMS | optional | Spec 013 |
| Identity-proofing provider | post | Spec 013 |

## Desktop

| Capability | Priority | Planned owner |
|---|---|---|
| Tauri shell | v0.1 | Spec 007 |
| Windows/macOS/Linux builds | v0.1 | Spec 007/012 |
| Open/save/drag-drop | v0.1 | Spec 007 |
| Local encrypted vault | v0.1 | Spec 007 |
| Secure storage | v0.1 | Spec 007 |
| Offline local editing/sign/verify | v0.1 | Spec 007 |
| Connected account mode | v0.1 | Spec 007 |
| Native notifications | P1 | Spec 007 |
| Auto updater | v0.1 release target | Spec 007/012 |

## Mobile

| Capability | Priority | Planned owner |
|---|---|---|
| iOS shell | v0.1 beta/target | Spec 008 |
| Android shell | v0.1 beta/target | Spec 008 |
| Camera scanner | v0.1 | Spec 008 |
| Share/import/export | v0.1 | Spec 008 |
| Touch/stylus signature | v0.1 | Spec 008 |
| Biometric secure-store unlock | v0.1/P1 | Spec 008 |
| Offline queue | v0.1/P1 | Spec 008 |
| Deep/app links | v0.1 | Spec 008 |
| Push notifications | P1 | Spec 008 |
| Desktop QR handoff | differentiation target | Spec 008 |
| Tablet kiosk | P1 | Spec 008 |

## Developer platform

| Capability | Priority | Planned owner |
|---|---|---|
| REST/OpenAPI | v0.1 | Spec 009 |
| Webhooks | v0.1 | Spec 009 |
| API keys/scopes | v0.1 | Spec 009 |
| Idempotency | v0.1 | Spec 009 |
| TypeScript SDK | v0.1 | Spec 009 |
| Python SDK | P1/v0.1 candidate | Spec 009 |
| Go SDK | P1 | Spec 009 |
| Embed signing | v0.1/P1 | Spec 009 |
| Embed authoring | P1 | Spec 009 |
| Test/sandbox mode | v0.1/P1 | Spec 009 |
| CLI connected operations | P1 | Spec 009 |
| MCP/agent adapters | post stable API | Spec 015 or ecosystem |

## Workflows/automation

| Capability | Priority | Planned owner |
|---|---|---|
| Typed workflow schema | v0.1/P1 | Spec 010 |
| Local workflow runner | P1 | Spec 010 |
| Server workflow runner | P1 | Spec 010 |
| Capability discovery | P1 | Spec 010 |
| Batch processing | P1 | Spec 010 |
| Human approval step | P1 | Spec 010 |
| Scheduled workflows | P1/post | Spec 010/011 |
| Generic HTTP integration | post/security gated | Spec 010 |

## Self-host/operations

| Capability | Priority | Planned owner |
|---|---|---|
| OCI images | v0.1 | Spec 011/012 |
| PostgreSQL | v0.1 | Spec 002/011 |
| S3-compatible storage | v0.1 | Spec 011 |
| SMTP/email provider | v0.1 | Spec 011 |
| Backup/restore | v0.1 | Spec 011 |
| Observability | v0.1 | Spec 011 |
| Resource/rate limits | v0.1 | Spec 011 |
| SBOM/security scans | v0.1 | Spec 011/012 |
| Signed releases | v0.1 | Spec 012 |
| Dedicated/air-gapped support | post | Spec 017 |

## AI assistance

| Capability | Priority | Planned owner |
|---|---|---|
| Field suggestions | post | Spec 015 |
| Redaction suggestions | post | Spec 015 |
| Document summary | post | Spec 015 |
| Workflow drafting | post | Spec 015 |
| Local/provider-neutral model support | post | Spec 015 |

AI never owns signature validity or human signing intent.

## Community/ecosystem

| Capability | Priority | Planned owner |
|---|---|---|
| Contribution docs/templates | before broad launch | Spec 011/012/community |
| Public fixture corpora | v0.1/P1 | Specs 004/005/012 |
| Provider/integration ecosystem | post stable contracts | later |
| Workflow template ecosystem | post | later |

## Catalog rule

Any capability moved into an earlier release/spec must also move its prerequisites, evidence gates, tests and security/licensing obligations. Scope may not be accelerated by copying only the feature name.
