# Signthos Quality Attributes

Status: PROPOSED FOUNDATION
Date: 2026-09-02

Signthos is not complete when a feature merely works in the happy path. The product must preserve security, privacy, accessibility, portability, resilience, interoperability, and verifiability across browser, native and server execution.

This document defines cross-cutting attributes that successor specifications must refine into measurable acceptance criteria.

## 1. Privacy

### Local means local

When the user selects or operates in local-only mode:

- document bytes are not uploaded to Signthos Cloud;
- no hidden fallback to a remote processing provider occurs;
- analytics must not contain document content or extracted document text;
- network-dependent capability absence is visible to the user;
- external resources referenced by a document are not fetched implicitly.

### Data minimization

Audit/evidence collection must be purpose-bound. IP addresses, device identifiers, location, biometrics, document text and behavioral telemetry are not collected merely because they might be useful later.

Each evidence field should eventually have:

- purpose,
- source,
- sensitivity class,
- retention policy,
- disclosure/export policy.

## 2. Security

### Untrusted-document posture

All inbound files are untrusted.

Successor specs must define limits for:

- file size,
- page count,
- object count,
- decompression expansion,
- recursive/archive content,
- image dimensions,
- embedded attachments,
- parser/render time,
- worker memory/CPU,
- cancellation/timeouts.

### No parser-to-secret adjacency

PDF/OCR/conversion workers must not receive signing keys, database superuser credentials, cloud control-plane credentials, or unrelated tenant secrets.

### Native least privilege

Tauri capabilities and mobile entitlements must be granted per bounded feature. Filesystem, shell, network, camera, notification, clipboard and deep-link access must not be globally enabled for convenience.

## 3. Authorization and tenancy

Authentication is not authorization.

The server domain must model explicit authorization decisions for resources such as:

- documents,
- revisions,
- envelopes,
- templates,
- signing links,
- organizations/workspaces,
- integrations,
- API keys,
- audit/evidence exports.

Requirements:

- default deny,
- tenant/resource scoping in repository/service boundaries,
- role/capability decisions separately testable from UI visibility,
- server-side authorization for every mutation and sensitive read,
- no reliance on opaque client-supplied organization identifiers,
- signing-link tokens scoped to the minimum workflow capability.

Specification 003/011 must refine the exact RBAC/ABAC model.

## 4. Data lifecycle

Signthos must distinguish at least:

- editable document revisions,
- immutable signing revisions,
- final signed artifacts,
- evidence bundles,
- transient processing files,
- local caches,
- backups,
- audit events.

Each storage class requires explicit policies for:

- creation,
- encryption,
- retention,
- deletion,
- backup,
- export,
- legal hold where later required,
- tombstones/sync propagation,
- cryptographic key destruction where applicable.

A user-visible delete action must not be documented as immediate physical erasure if backups or retention policy preserve copies.

## 5. Encryption

### In transit

Networked production modes require authenticated encrypted transport.

### At rest

Sensitive server and native storage must have an explicit encryption model rather than relying on vague "encrypted" claims.

### End-to-end encryption tradeoff

End-to-end encrypted collaborative signing is a product/architecture decision, not a checkbox.

True E2EE may constrain:

- server-side PDF processing,
- search,
- previews,
- malware/document inspection,
- email attachments,
- evidence generation,
- workflow automation,
- key recovery.

Signthos should not claim E2EE until a later specification defines participant key management, sharing, recovery, multi-device support, metadata leakage and server capability limitations.

Local-only workflows can provide stronger confidentiality without making an unsupported E2EE cloud claim.

## 6. Reliability and idempotency

Network and workflow operations must expect retries.

Mutation APIs and background jobs should define:

- idempotency key semantics,
- deduplication boundaries,
- at-least-once delivery behavior,
- replay safety,
- retry classes,
- terminal failure states,
- compensating actions where needed.

A repeated `send envelope` request must not accidentally email or create multiple independent signing processes when the same idempotency scope is supplied.

## 7. Offline-first behavior

Native offline behavior requires a deterministic state machine.

Queued actions should have explicit states such as:

```text
LOCAL_ONLY
QUEUED
SENDING
ACKNOWLEDGED
CONFLICT
FAILED_RETRYABLE
FAILED_TERMINAL
```

Requirements:

- signed immutable revisions are content-addressed;
- edits create revisions rather than silently overwriting remote state;
- user-visible conflicts do not resolve by last-write-wins when signing intent/evidence could change;
- retries are idempotent;
- local deletion vs remote retention conflicts are explicit.

Specification 014 can expand collaborative sync, but desktop/mobile v0.1 must still have a safe single-user queue model.

## 8. Performance

Performance targets must be defined from user journeys rather than generic benchmark numbers.

Successor specs should measure representative classes:

- first PDF render latency,
- page-to-page navigation,
- large-document memory usage,
- annotation/edit interaction latency,
- local save/export latency,
- mobile scan processing,
- signature preparation latency,
- verifier throughput,
- API request latency excluding explicitly asynchronous processing,
- heavy-worker queue/processing time.

Corpus classes should include small, typical, large, malformed and adversarial documents.

No single benchmark machine result should become a universal product claim.

## 9. Accessibility

Accessibility is a release property, not a late UI polish task.

Target baseline for first-class web/editor UI:

- WCAG 2.2 AA as the product target where applicable;
- keyboard-complete core workflows;
- visible focus states;
- semantic labels for form/signing fields;
- screen-reader announcements for document/workflow state changes;
- non-color-only validation states;
- sufficient zoom/reflow behavior around application chrome;
- accessible alternatives for signature input where a drawn signature is not required by policy.

PDF document accessibility and application UI accessibility are distinct concerns.

## 10. Internationalization and RTL

Signthos should be architected for locale expansion from the first UI implementation.

Requirements:

- no hard-coded English-only domain values where localized labels are intended;
- Unicode-safe names and metadata;
- locale-aware date/time/number presentation;
- right-to-left UI layout support;
- Arabic as an explicit early RTL qualification locale;
- locale negotiation that preserves full locale codes when needed;
- timezone shown explicitly for legal/audit timestamps.

Canonical machine evidence should use locale-independent representations such as UTC timestamps and stable enum identifiers.

## 11. Time semantics

Signing evidence is time-sensitive.

The system must distinguish:

- device clock,
- server clock,
- event-received time,
- claimed signing time,
- trusted timestamp time,
- certificate validity interval.

User-facing local time is presentation. Canonical evidence must retain an unambiguous time representation and source.

## 12. Interoperability and portability

Users must not need Signthos Cloud to access their own completed records.

Portability targets:

- standard PDF files,
- public evidence-bundle schema,
- documented JSON/OpenAPI contracts,
- exportable audit records,
- standard certificate/signature formats,
- webhook/event schemas,
- no undocumented proprietary wrapper required to verify a final document.

## 13. API compatibility

Public contracts must have explicit stability/versioning rules.

Breaking change considerations include:

- endpoint shape,
- enum semantics,
- webhook payloads,
- evidence schema,
- CLI output intended for machines,
- SDK behavior,
- provider capability IDs.

A generated SDK update does not make an unversioned breaking API acceptable.

## 14. Email, SMS and abuse prevention

A signing platform can be abused as a delivery system.

Self-hosted and managed modes should support controls for:

- invitation rate limits,
- API-key quotas,
- recipient abuse reports,
- suspicious bulk sends,
- bounce/complaint handling,
- sender/domain policy,
- webhook destination abuse/SSRF defenses,
- SMS cost/abuse limits,
- signing-link guessing/brute force.

Managed-cloud anti-abuse policy is not a reason to cripple self-hosted software, but secure defaults are still required.

## 15. Supply-chain security

Release qualification must eventually include:

- locked dependencies,
- dependency/license inventory,
- SBOM,
- secret scanning,
- code/dependency vulnerability scanning,
- signed commits/tags or release attestations according to final policy,
- signed desktop/mobile/server release artifacts,
- protected update metadata,
- provenance of embedded native binaries such as PDFium,
- reproducible or at minimum independently rebuildable release instructions.

Third-party binary downloads during release must be checksum/version pinned.

## 16. Observability without document leakage

Production observability should include:

- structured operational logs,
- traces/metrics around workflows and providers,
- error taxonomy,
- queue/provider health,
- security-relevant audit events.

It must avoid by default:

- raw document bytes,
- extracted document text,
- passwords/OTPs,
- signing private keys,
- full bearer tokens,
- sensitive form field values.

## 17. Disaster recovery

Self-hosted production guidance must eventually define recoverability for:

- PostgreSQL,
- object storage,
- encryption/key material,
- evidence artifacts,
- configuration/secrets,
- background-job state.

A backup that excludes required encryption keys is not a recoverable backup. A backup that indiscriminately exports signing private keys may violate the key-isolation model.

## 18. Compatibility matrix

Every public release should state tested support for:

- browsers,
- desktop operating systems/architectures,
- iOS versions/devices,
- Android API versions/devices,
- PostgreSQL versions,
- supported object stores where relevant,
- optional processing providers,
- PDF/signature standard levels actually verified.

"Cross-platform" is not a substitute for an observed test matrix.

## 19. Quality gate allocation

### Specification 003

- tenancy/authorization contract,
- domain error taxonomy,
- revision semantics.

### Specification 004

- untrusted PDF corpus,
- resource limits,
- redaction proof,
- rendering/operation performance baselines.

### Specification 005

- cryptographic/signature conformance,
- independent verification,
- time/trust semantics,
- evidence privacy policy.

### Specifications 007/008

- offline queue model,
- secure storage,
- native least privilege,
- platform performance/accessibility,
- signed update/distribution path.

### Specification 009

- API compatibility/versioning,
- idempotency,
- webhook SSRF/replay policy.

### Specification 011

- self-host hardening,
- backup/recovery,
- observability/privacy,
- supply-chain controls,
- abuse controls.

### Specification 012

- compatibility matrix,
- accessibility qualification,
- release/security/provenance evidence.

## 20. Foundation conclusion

Signthos should optimize for **trustworthy document lifecycle behavior**, not maximum checkbox count.

A feature is not release-ready unless its privacy, authorization, failure, offline, accessibility, performance and verification boundaries are understood well enough for the risk of that feature.
