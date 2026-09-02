# Signthos Security Threat Model

Status: FOUNDATION PLAN
Date: 2026-09-02

## Objective

Treat document processing, signing, identity, native capabilities and multi-tenant server behavior as separate trust boundaries with explicit failure modes.

This is a foundation threat model, not a completed security audit.

## Primary assets

- document contents,
- document revision integrity,
- signature/evidence artifacts,
- private signing keys and key references,
- user/session/API credentials,
- organization membership/authorization state,
- recipient signing sessions,
- audit/evidence history,
- webhook/integration secrets,
- local vault contents,
- backup data.

## Adversaries / failure sources

- malicious uploaded PDF/document,
- unauthenticated external attacker,
- authenticated user crossing tenant boundaries,
- compromised recipient/signing link,
- malicious/compromised integration endpoint,
- compromised document-processing dependency,
- malicious browser content/embedded document behavior,
- compromised native plugin/update channel,
- insider/operator error,
- stolen/lost device,
- buggy workflow retry causing duplicate side effects,
- incorrect verification logic representing uncertainty as valid.

## Trust boundaries

### Untrusted document boundary

All imported/uploaded documents are untrusted bytes.

Risks:

- parser vulnerabilities,
- decompression/resource bombs,
- embedded JavaScript/actions,
- external references,
- malformed object graphs,
- crafted fonts/images,
- metadata abuse.

Controls:

- strict parser/resource limits,
- sandbox processors where feasible,
- no implicit remote resource fetch,
- content-type/magic validation,
- timeouts/cancellation,
- fuzz/corpus testing,
- isolate document processors from secrets.

### Browser boundary

Risks:

- XSS,
- CSRF,
- malicious embedded content,
- origin confusion in embeds,
- token leakage.

Controls:

- CSP,
- output escaping,
- secure cookies/session handling,
- origin restrictions,
- scoped embed tokens,
- no rendering arbitrary document HTML in privileged app origin.

### Native/Tauri boundary

Risks:

- overly broad command capabilities,
- arbitrary filesystem access,
- shell execution,
- deep-link abuse,
- insecure update channel,
- plugin compromise.

Controls:

- least-privilege Tauri capabilities,
- narrow typed commands,
- validate paths/URLs/input,
- avoid generic shell execution,
- signed/notarized releases,
- secure updater metadata,
- dependency review.

### Server tenancy boundary

Risks:

- IDOR/cross-tenant reads,
- privilege escalation,
- recipient access to organization-private resources,
- API key scope bypass.

Controls:

- server-side authorization on every resource operation,
- ownership/org/scope checks,
- negative cross-tenant tests,
- opaque/scoped recipient sessions,
- explicit API scopes,
- audit privileged changes.

### Signing key boundary

Risks:

- key exfiltration,
- accidental logging,
- signing wrong revision,
- signer provider confused-deputy attack.

Controls:

- key providers expose sign operation rather than raw key when possible,
- bind signing request to exact digest/revision,
- secure store/KMS/HSM adapters,
- never store key material in document metadata,
- audit provider/key identity without leaking secrets.

### Recipient/signing session boundary

Risks:

- link forwarding,
- session fixation,
- replay,
- weak recipient authentication,
- stale document revision.

Controls:

- scoped/expiring tokens,
- action re-auth based on policy,
- optional OTP/passkey/identity providers,
- bind session to envelope/recipient/revision,
- invalidate on completion/cancel/supersession where appropriate.

### Integration/webhook boundary

Risks:

- forged inbound webhooks,
- outbound SSRF,
- secret leakage,
- unbounded response bodies,
- retry storms.

Controls:

- signature verification,
- destination validation,
- block metadata/private-network targets by default for generic HTTP,
- scoped secrets,
- time/size limits,
- bounded retry/backoff.

## Critical security invariants

1. A user cannot access another tenant's private resources by knowing IDs.
2. A signed envelope binds to the exact intended document revision.
3. A document processor never receives signing/provider secrets unless explicitly required by its trust role.
4. Visual masking is never represented as permanent redaction.
5. Verification uncertainty/unsupported status is never represented as valid.
6. Local-only operations do not silently transmit document bytes.
7. A QR handoff cannot be reused, redirected, or won by an unintended concurrent scanner without an explicit fail-closed outcome.
8. Retried jobs cannot duplicate sends/signing side effects without detection/idempotency.
9. Software updates/releases are authenticated.
10. Logs/telemetry do not contain raw sensitive document/signature/key data by default.

## Redaction threat model

A redaction may be represented as safely applied only when targeted recoverable content is absent from the exported PDF under an independent file-level verification invariant.

Verification must use a parser/toolchain independent from the redaction implementation where practicable and attempt recovery through:

- text extraction,
- object/content-stream inspection,
- copy/paste,
- rendering layers,
- annotations/forms,
- metadata/attachments where in scope.

A black rectangle or correct-looking render alone fails. If independent verification cannot cover the claimed redaction scope, the product reports that verification as unsupported/incomplete rather than claiming safe redaction.

## Signature verification threat model

Potential false-positive causes:

- checking only presence of signature field,
- validating CMS but not signed byte range,
- ignoring post-sign modifications,
- treating untrusted/self-signed certificate as globally trusted,
- stale/unavailable revocation data,
- failing to distinguish timestamp evidence.

Verification output therefore exposes dimensions separately.

## QR handoff threats

- photographed QR reused later,
- attacker scans first,
- simultaneous scanners race redemption,
- session relay/MITM,
- wrong device/audience/document binding,
- long-lived bearer token leak.

Required controls:

- unpredictable, very short-lived, one-time bootstrap credential,
- authenticated session establishment bound to the intended session and device/audience (or an equivalent authenticated-pairing property),
- explicit target document/revision context and user confirmation where the threat model requires it,
- atomic redemption so only one claimant can establish the handoff,
- explicit first-scanner/race handling that fails closed rather than silently transferring authority,
- immediate destruction/rotation of the bootstrap credential after redemption,
- expiry plus cancellation/revocation before completion,
- no long-lived bearer credential, raw document, or private key in the QR payload,
- auditable initiation, confirmation, redemption, expiry, cancellation/revocation and completion events.

## Local device threat model

Lost/stolen device risks:

- saved signatures,
- cached documents,
- access tokens.

Controls:

- platform keychain/keystore,
- encrypted local vault,
- biometric/device unlock policy where available,
- account session revocation,
- bounded sensitive cache retention,
- optional app lock.

## Abuse / platform misuse

Signing/email infrastructure can be abused for spam/phishing.

Controls for managed service:

- account/email verification,
- send/bulk limits,
- anomaly/abuse signals,
- complaint/bounce processing,
- link/domain safety measures,
- suspension tooling,
- audit trail.

Self-host operators retain responsibility for their deployment but receive safe defaults/limits.

## Supply chain

Requirements before release:

- lockfiles/version pins,
- dependency vulnerability scanning,
- SBOM,
- provenance for binaries/containers,
- release signing,
- restricted GitHub permissions,
- review dependency licenses,
- avoid unnecessary native dependencies.

## Secrets and CI

- no secrets in repository,
- least-privilege CI tokens,
- environment-scoped deployment credentials,
- avoid running untrusted PR code with privileged secrets,
- release jobs bind to reviewed/tagged commit.

## Security testing program

Successor specs should include where applicable:

- unit/contract security tests,
- cross-tenant negative integration tests,
- parser fuzzing/corpus tests,
- SSRF tests,
- webhook replay/signature tests,
- auth/session tests,
- dependency/SAST/CodeQL-like analysis,
- mobile/native permission review,
- external security review before mature production claims.

## Vulnerability disclosure

Before public production launch, provide:

- SECURITY.md,
- supported versions,
- private reporting channel,
- response/patch policy,
- coordinated disclosure guidance.

## Security decision rule

When usability conflicts with integrity or secret isolation, choose an explicit safer flow rather than hiding security-sensitive behavior behind convenience.
