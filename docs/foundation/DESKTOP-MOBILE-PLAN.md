# Signthos Desktop and Mobile Plan

Status: FOUNDATION PLAN
Date: 2026-09-02

## Objective

Ship desktop and mobile as first-class product surfaces, not wrappers around the web application.

Target platforms:

- macOS
- Windows
- Linux
- iOS
- Android

Framework hypothesis: **Tauri 2**, subject to focused platform spikes and actual dependency/license validation.

## Shared architecture

Use a shared React/TypeScript product UI where interaction patterns are portable, with Rust/Tauri commands and native Swift/Kotlin plugins for platform capabilities.

```text
Shared React UI
      |
Tauri command boundary
      |
Rust native core
      |
Platform adapters
  |      |      |
macOS  Windows  Linux / iOS / Android
```

The shared UI does not justify identical UX on every form factor. Mobile receives dedicated interaction design.

## Desktop product goals

### Local-first document workstation

A desktop user must eventually be able to:

- open a PDF from the local filesystem,
- inspect/edit/fill/organize it,
- apply supported redactions/transforms,
- self-sign,
- verify,
- save/export,
- do all supported local operations without an account.

### OS integration

Candidate integrations:

- open-with/file associations,
- drag/drop,
- recent documents,
- Finder/Explorer integration where maintainable,
- native save/export dialogs,
- print,
- notifications,
- deep links,
- clipboard,
- system share where available,
- keychain/credential store,
- biometric unlock where supported.

### Desktop connected mode

Once connected to a Signthos server:

- fetch pending signature requests,
- synchronize selected documents/workspaces,
- receive workflow notifications,
- prepare/send routed envelopes,
- continue work across browser/mobile.

Connection must not silently upload unrelated local files.

## Mobile product goals

Mobile must cover three core jobs:

1. capture a physical document,
2. complete/review a signing action,
3. perform light document work and share/export.

### Mobile capture

```text
Camera
 -> detect document edges
 -> crop/perspective correction
 -> batch pages
 -> generate local PDF revision
 -> optional local/connected OCR
 -> document workspace
```

Requirements:

- explicit image/PDF quality controls,
- predictable storage location/lifecycle,
- no automatic cloud upload in local mode,
- recoverable draft capture if the app is interrupted.

### Mobile signing

- touch signature,
- stylus/Apple Pencil where supported,
- initials,
- typed signature appearance,
- biometric unlock of saved local signature/identity material,
- clear evidence/consent step,
- no implication that drawing alone creates a cryptographic signature.

### Mobile import/export

- iOS share extension/share sheet where feasible,
- Android intent/share integration,
- Files/document provider integration,
- deep links/universal links/app links,
- export/share completed PDF/evidence report.

## Secure local storage

Native apps require a local vault boundary.

Sensitive data classes:

- account/session tokens,
- saved visual signatures/initials,
- local signing-key references,
- pending envelope state,
- offline documents where enabled,
- sync metadata,
- evidence cache.

Storage principles:

- secrets use platform secure storage/keychain/keystore,
- encryption keys are not stored next to encrypted document data without protection,
- local deletion semantics are explicit,
- background caches have bounded retention,
- app uninstall implications are documented.

## Native signing keys

Private key design must distinguish:

- local software key,
- OS/hardware-backed key,
- smart card/token where supported,
- remote KMS/HSM/provider key.

A visual signature asset is never treated as a private signing key.

## Offline mode

Supported offline capabilities should include, progressively:

- local document editing,
- local visual self-sign,
- local cryptographic signing when credentials/trust material permit,
- local verification of claims that require no external freshness,
- viewing previously synchronized pending documents where policy permits,
- queued outbound actions.

The product must identify operations that cannot be fully validated offline, such as fresh revocation/trust information.

## Offline queue

Queued network actions require:

- idempotency key,
- local creation time,
- target account/org/server,
- payload digest,
- retry state,
- cancellation where safe,
- user-visible failure reason.

No silent duplicate envelope sends after reconnect.

## Desktop-to-mobile QR handoff

Signature feature:

```text
Desktop
 -> create one-time handoff
 -> show QR
 -> mobile scans
 -> authenticated session establishment
 -> transfer bounded request/document reference
 -> mobile capture/approve/sign
 -> result returns
 -> session invalidated
```

Security requirements:

- the QR bootstrap credential is unpredictable, very short-lived and single-use,
- bind the handoff to the intended session, target document/revision, and intended device or audience (or an equivalent authenticated-pairing property),
- display and explicitly confirm target document/session context where required by the threat model,
- redemption is atomic: concurrent or repeated scans cannot both establish a valid handoff,
- first-scanner/race behavior is explicitly tested and fails closed rather than silently transferring authority,
- destroy or rotate the bootstrap credential immediately after successful redemption,
- pending handoffs expire and can be cancelled/revoked before completion,
- no long-lived bearer credential or raw document is exposed in the QR payload,
- no raw private key transfer,
- audit events cover initiation, confirmation, redemption, cancellation/revocation, expiry and completion.

A later specification must decide whether direct peer-to-peer transport is supported in addition to relay/server transport.

## In-person / kiosk mode

Tablet/mobile may support in-person signing.

Requirements:

- lock to target envelope/session,
- prevent navigation to account-private content,
- wipe transient signer inputs after completion/timeout,
- explicit signer identity/evidence model,
- safe hand-back workflow.

## Background behavior

Mobile OS restrictions mean background transfer/processing cannot be assumed.

Successor specs must define:

- what may continue in background,
- what must resume on foreground,
- upload/download cancellation semantics,
- notification behavior,
- battery/network constraints.

## App Store / Play distribution gate

Before release:

- inspect actual shipped source/dependency derivation graph,
- verify license compatibility with store distribution terms,
- review signing/export cryptography declarations where required,
- privacy labels/data safety declarations must match behavior,
- document account deletion/subscription behavior if applicable.

Do not assume the server's license can be copied onto a native client without analyzing the actual native-client derivation.

## Desktop distribution

Target channels after release qualification:

- GitHub Releases,
- Homebrew Cask,
- Winget,
- platform installers/packages,
- optional distro-specific Linux packaging when maintainable.

Artifacts must be signed/notarized where platform norms require.

## Platform spikes required before commitment

### Tauri shell spike

Prove:

- shared UI boots on all target classes,
- file open/save,
- secure storage,
- deep links,
- app updates on desktop,
- mobile plugin boundary.

### PDF native spike

Prove selected PDF provider can:

- render representative corpus,
- transform without corruption,
- preserve signature semantics when required,
- stay within resource targets.

### Mobile scanner spike

Prove:

- page capture,
- perspective correction,
- multipage assembly,
- local persistence/recovery.

### QR handoff spike

Threat-model and prove unpredictable one-time bootstrap credentials, authenticated device/audience/session binding, user confirmation where required, atomic redemption, anti-race/replay behavior, expiry/cancellation/revocation, and credential invalidation after redemption.

## Success criteria

Desktop succeeds when local document work is genuinely useful without cloud.

Mobile succeeds when scan/sign/share feels native and trustworthy rather than a browser view embedded in an app shell.
