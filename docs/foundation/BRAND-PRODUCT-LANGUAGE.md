# Signthos Brand and Product Language

Status: FOUNDATION PLAN
Date: 2026-09-02

## Brand name

**Signthos**

Working interpretation:

- `Sign` — document signing.
- `Ethos` — trust, principles, evidence and openness.

Trademark/domain clearance remains a separate pre-launch task. Repository use of the working name is not a legal clearance conclusion.

## Primary tagline

> **Open documents. Open signing. Everywhere.**

## Secondary positioning lines

- Local-first document and signing infrastructure.
- Edit, sign, verify and self-host.
- Your documents. Your infrastructure. Verifiable results.
- From PDF workspace to trusted signature workflow.

Avoid copying competitor taglines or positioning too closely.

## Product family

Canonical candidate names:

- Signthos Web
- Signthos Desktop
- Signthos Mobile
- Signthos Server
- Signthos Cloud
- Signthos API
- Signthos SDK
- Signthos Embed
- Signthos CLI
- Signthos Verify

Do not create a different brand for every technical subsystem.

## Brand attributes

### Trustworthy

Language is precise about what is and is not verified.

### Calm

Avoid fear-heavy legal/security marketing.

### Open

Explain self-hosting, source boundaries and data behavior clearly.

### Technical without being obscure

Developer surfaces can be exact; user-facing flows should remain understandable.

### Independent

Signthos respects upstream heritage while establishing its own domain/product identity.

## Voice

Use:

- clear verbs,
- short status language,
- specific failure explanations,
- evidence-oriented terminology.

Avoid:

- "military-grade" security claims,
- unsupported "legally binding everywhere" claims,
- "100% secure",
- vague AI claims,
- calling every drawn signature cryptographic/digital.

## Signing terminology

Preferred distinctions:

### Signature appearance

The visible drawn/typed/uploaded mark shown on a document.

### Electronic-signature evidence

Events/evidence representing signer intent, authentication and workflow completion.

### Cryptographic PDF signature

A cryptographic signature embedded in the PDF and bound to signed byte ranges/certificate material.

### Advanced / qualified signature

Regulated trust levels only when the implementation/provider and evidence actually meet the relevant requirements.

Do not collapse these into one marketing word.

## Verification language

Allowed states should communicate uncertainty explicitly:

- Valid
- Invalid
- Incomplete
- Unsupported
- Unavailable
- Not checked

Avoid a single green check when only one verification dimension passed.

## Privacy language

When an operation is local, say what that means:

> Processed on this device. The document is not uploaded by this operation.

When network/provider processing is needed, say so clearly.

Avoid absolute privacy claims if telemetry/provider calls remain involved.

## Open-source language

Be precise:

- describe component licenses accurately,
- distinguish open software from managed services,
- do not call restricted/commercial upstream code open source unless rights/license genuinely permit it,
- distinguish trademark rights from source license rights.

## UI action verbs

Preferred:

- Open
- Import
- Scan
- Edit
- Organize
- Fill
- Redact
- Prepare
- Send
- Sign
- Approve
- Verify
- Export
- Archive

These verbs map to the document lifecycle and should remain consistent across web/native/docs.

## Dangerous/destructive actions

Use explicit wording:

- Permanently apply redactions
- Cancel envelope
- Delete local copy
- Purge document
- Revoke API key

Avoid ambiguous generic "Remove" when consequences differ.

## Product status language

Document/envelope workflow status and verification status are separate.

Example:

> Envelope completed · Signature verification valid

not:

> Verified

when completion alone is known.

## AI language

Use:

- Suggest fields
- Suggest redactions
- Draft workflow
- Summarize

Avoid:

- AI verified
- AI legally approved
- AI signed

unless those phrases describe a very specific, truthful and user-understood behavior.

## Accessibility language

Avoid interaction copy that assumes one input method:

Bad:

> Click the green box.

Better:

> Select the signature field.

## Internationalization

Product language should be designed for translation.

- avoid string concatenation,
- avoid culture-specific jokes in critical UI,
- use locale-aware dates/times,
- support RTL structure,
- Arabic is an early qualification language.

## README hero direction after real implementation exists

```text
Signthos
Open documents. Open signing. Everywhere.

Edit and sign PDFs locally, run your own signing infrastructure,
or use managed cloud — across web, desktop, iOS and Android.

Local-first · Self-hostable · Developer-friendly · Independently verifiable
```

Do not publish feature badges for functionality that has not reached the relevant release qualification.

## Visual identity direction

Detailed visual design is a later bounded design specification. Foundation direction:

- modern and calm,
- document-first rather than crypto-themed,
- high-contrast accessible system,
- excellent dark/light themes,
- strong verification/status hierarchy,
- avoid visual similarity likely to confuse Signthos with Documenso/Stirling/DocuSign.

## Naming rule

Technical code symbols may use stable domain language rather than brand prefixes everywhere.

Prefer:

- `DocumentRevision`
- `Envelope`
- `EvidenceBundle`

instead of unnecessary:

- `SignthosDocumentRevision`
- `SignthosEnvelope`

Brand names belong primarily at product/package boundaries.
