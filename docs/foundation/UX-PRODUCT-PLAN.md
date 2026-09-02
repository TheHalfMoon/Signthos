# Signthos UX and Product Surface Plan

Status: FOUNDATION PLAN
Date: 2026-09-02

## UX principle

Signthos should feel like one document product, not a signing website glued to a PDF toolbox.

The primary object in the interface is the **document/workspace**, not the tool list.

## Information architecture

Primary navigation:

- Home
- Documents
- Signing
- Templates
- Workflows
- Verify
- Team / Organization
- Developer
- Settings

Desktop local mode may expose a reduced navigation set when disconnected.

## Primary workspace model

A document opens into one stable workspace with modes instead of separate products:

```text
Document Workspace
├── View
├── Edit
├── Organize
├── Fill
├── Redact
├── Prepare
├── Sign
├── Verify
└── History
```

The interface may adapt controls per platform, but domain semantics remain shared.

## Core workspace regions

### Document canvas

- page rendering,
- zoom/pan,
- page selection,
- field/annotation overlays,
- signature preparation overlays,
- redaction preview,
- verification markers.

### Left rail

- page thumbnails,
- outline/bookmarks,
- attachments where supported,
- document revisions/history.

### Right inspector

Contextual properties for:

- selected annotation,
- page,
- field,
- recipient,
- workflow step,
- signature/certificate,
- verification result.

### Command bar

Searchable actions such as:

- merge,
- split,
- rotate,
- redact,
- add signer,
- request signature,
- verify,
- export.

The command model should map to typed domain/editor commands rather than invoking UI-only behavior.

## Primary journeys

### Journey A — local self-sign

```text
Open PDF
 -> inspect
 -> optional edits/fill
 -> add visual signature / local certificate signature
 -> verify supported claims
 -> export
```

Requirements:

- no account,
- no silent network call,
- clear distinction between visual signature and cryptographic signature,
- local save/export.

### Journey B — prepare and send

```text
Import document
 -> prepare fields
 -> add recipients/roles/order
 -> choose authentication/reminders
 -> freeze signing revision
 -> send
 -> track
 -> completion
 -> verify/export evidence
```

### Journey C — scan on mobile and sign

```text
Camera
 -> detect/crop pages
 -> review PDF
 -> fill/edit
 -> sign or send
 -> share/save
```

### Journey D — desktop-to-phone handoff

```text
Desktop document
 -> Sign on phone
 -> one-time QR
 -> mobile authenticated handoff
 -> touch/stylus capture or approval
 -> desktop receives result
 -> invalidate handoff
```

### Journey E — verify received PDF

```text
Open/drag PDF
 -> Verify
 -> cryptographic status
 -> certificate/trust status
 -> evidence bundle status
 -> unsupported/unavailable dimensions
 -> export verification report
```

### Journey F — developer embed

```text
Create envelope via API
 -> generate scoped embed session
 -> embed authoring/signing
 -> webhook completion
 -> fetch final document/evidence
```

## Document status model in UX

Avoid ambiguous status words.

Possible top-level states:

- Draft
- Ready
- Sent
- In progress
- Completed
- Declined
- Expired
- Superseded
- Cancelled

Verification status is separate:

- Valid
- Invalid
- Incomplete
- Unsupported
- Unavailable
- Not checked

`Completed` must never imply `cryptographically valid`.

## Local/network visibility

Every action that causes data to leave the device must be explainable.

Examples:

- `Local` badge for operations executing entirely on-device.
- `Server` or provider indication for OCR/conversion requiring remote execution.
- explicit upload/connection transition when a local document becomes a routed envelope.

No hidden upload because a tool happens to be server-backed.

## Progressive capability UI

If a provider lacks a capability, the UI should say why rather than disappear unpredictably.

Example:

> OCR is not installed in this self-hosted deployment.

or:

> This operation requires the optional conversion worker.

Capability discovery should drive availability.

## Mobile UX rules

- thumb-reachable primary actions,
- full-screen signing/capture modes,
- no desktop-style tiny field handles,
- camera-first import,
- share-sheet integration,
- biometric unlock for protected local identity/signature artifacts,
- offline-readable pending documents where policy permits,
- explicit queue status.

Tablet may expose a denser workspace and kiosk/in-person signing mode.

## Desktop UX rules

- open-with integration,
- drag/drop,
- multi-window only if state safety is proven,
- keyboard shortcuts,
- command palette,
- local filesystem awareness,
- background operations with visible progress/cancel,
- native notification for connected signing events.

## Accessibility

Target WCAG 2.2 AA for web/shared UI where applicable.

Critical requirements:

- keyboard-accessible field preparation,
- screen-reader labels for signing fields and page navigation,
- non-color-only status communication,
- sufficient target sizes,
- focus visibility,
- reduced-motion support,
- accessible signature alternatives when drawing is not feasible.

PDF content accessibility is a separate document-level concern and should not be conflated with UI accessibility.

## Internationalization

The product is designed for localization from the beginning.

Requirements:

- externalized strings,
- plural/date/number formatting,
- timezone-aware evidence display,
- LTR and RTL layouts,
- Arabic as an early first-class RTL qualification language,
- recipient names/addresses in international scripts,
- no fixed-width English assumptions in field labels.

## Error design

Errors must preserve trust.

Avoid generic "Something went wrong" where the system knows the failure class.

Distinguish:

- malformed PDF,
- unsupported encryption,
- provider unavailable,
- authorization denied,
- signature invalid,
- external trust information unavailable,
- sync conflict,
- workflow rejected,
- delivery failure.

Errors that might affect document integrity must fail closed.

## AI interaction principles

AI suggestions appear as proposals, never silent actions in trust-sensitive flows.

Example:

- suggest signature fields,
- suggest recipient roles,
- suggest redaction regions,
- summarize document.

The user must review changes that alter document contents, recipients, legal intent, or signing state.

## Design system direction

The visual identity should communicate calm, trustworthy infrastructure rather than legal-software complexity.

Design system should support:

- document-heavy dense surfaces,
- clear status hierarchy,
- consistent field types,
- verification severity states,
- dark/light modes,
- RTL mirroring,
- shared React components across web/native shells.

## UX acceptance bar

A major feature is incomplete if it works only through API/CLI but the primary user journey is unusable, or if web and native surfaces present contradictory semantics.

Every successor UI spec should define:

- journey,
- empty/loading/error states,
- keyboard/touch behavior,
- accessibility checks,
- offline/network behavior,
- permission states,
- responsive/platform adaptations.
