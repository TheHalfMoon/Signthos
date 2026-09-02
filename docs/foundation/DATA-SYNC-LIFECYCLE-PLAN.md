# Signthos Data, Sync, and Lifecycle Plan

Status: FOUNDATION PLAN
Date: 2026-09-02

## Objective

Define how documents, revisions, envelopes, evidence and local caches move through their lifecycle without compromising local-first behavior or signing integrity.

## Canonical data principles

1. Documents are versioned.
2. Signing binds to immutable document revisions.
3. Content digests are independent of storage paths.
4. Sync is explicit, observable and conflict-aware.
5. Local data is not automatically uploaded merely because an account exists.
6. Deletion/retention semantics are documented and testable.
7. Evidence needed to prove a completed signing event is not silently destroyed by ordinary UI cleanup.

## Primary data objects

### Document

Logical user-facing document identity.

### DocumentRevision

Immutable or effectively immutable content version with:

- content digest,
- MIME/type information,
- byte length,
- creation provenance,
- parent revision(s),
- storage references,
- transformation metadata.

### Envelope

Routing/signing process bound to one or more specific document revisions.

### EvidenceBundle

Versioned evidence artifact for signing/verification events.

### LocalWorkspace

Client-local state for documents, pending edits, offline queues and sync metadata.

## Signable artifact rule

For the initial architecture, the primary signable artifact is a **frozen PDF revision**.

Imported source formats such as Office documents or images may be accepted as source assets, but conversion produces a distinct PDF revision before signature preparation/routing.

```text
source.docx
  -> conversion
  -> contract.pdf revision R3
  -> freeze/signing preparation
  -> Envelope E7 binds R3
```

Any content-changing conversion after signing creates a new document revision and cannot pretend to preserve the prior signature's binding to bytes.

## Revision semantics

Content-changing operations create a new revision or deterministic pending edit state that materializes into a new revision.

Examples:

- page reorder,
- merge,
- redaction apply,
- form flattening where content changes,
- OCR text layer insertion,
- conversion,
- compression that rewrites bytes.

UI-only view settings such as zoom do not create revisions.

## Content addressing

At minimum preserve a cryptographic digest for immutable artifact bytes.

Digest algorithm/version must be part of the metadata contract so future algorithms can coexist.

Do not use filename, object-storage key or database ID as integrity proof.

## Storage classes

### Local explicit files

Files controlled directly by the user in filesystem/document-provider locations.

### Local managed vault

App-managed encrypted storage for drafts, synchronized documents, queues and sensitive metadata.

### Server object storage

Immutable/revision-oriented blobs and evidence artifacts.

### Database records

Metadata, authorization, workflow state, indexes and references—not an excuse to duplicate large raw documents unnecessarily.

## Sync model

Sync operates on typed domain objects/revisions rather than raw filesystem mirroring.

Properties:

- idempotent mutations,
- content hashes,
- version/precondition tokens,
- explicit upload/download state,
- conflict records,
- retry-safe queues.

## Conflict strategy

Never silently overwrite divergent edits.

Possible conflict classes:

- metadata-only conflict,
- editable draft conflict,
- immutable revision divergence,
- envelope-state conflict,
- delete/update race.

Immutable signed revisions cannot be merged by modifying their bytes. A user chooses a new revision/supersession path.

## Envelope sync

Envelope workflow state is server-authoritative for a connected routed signing process unless a later offline-routing specification defines another mode.

Clients may cache state but must not fabricate server acceptance/completion.

Outbound commands use idempotency and expected-state/version constraints.

## Local-first account boundary

Connecting an account does not automatically claim every local file.

A local document becomes connected only through an explicit action, such as:

- upload/sync document,
- prepare and send,
- add to connected workspace,
- restore from server.

The UI should identify connected status.

## Retention

Retention is policy-driven and separated by data class.

Possible classes:

- active documents,
- completed envelope documents,
- evidence/audit artifacts,
- local transient processing files,
- logs,
- delivery metadata,
- backups.

Self-host operators receive configurable policies subject to integrity/legal constraints they choose to operate under.

Managed cloud should publish defaults and limits clearly.

## Deletion

Deletion needs explicit semantics:

- hide/archive,
- soft delete,
- purge request,
- legal/policy hold,
- evidence retention,
- backup expiry.

A UI "delete" must not promise immediate cryptographic erasure from backups unless the infrastructure actually provides it.

## Account deletion

Account/org deletion must define:

- owned documents,
- shared documents,
- completed envelopes involving other parties,
- evidence needed by other parties,
- API credentials,
- local-device data,
- backups.

The deletion model must reconcile privacy rights with legitimate shared transaction/evidence retention without overclaiming legal requirements.

## Temporary files

Document processing often creates sensitive temporary files.

Requirements:

- isolated temp directories,
- bounded lifetime,
- cleanup after success/failure,
- no predictable public paths,
- worker sandbox boundaries,
- no debug retention by default in production.

## Logging

Do not log raw document contents, extracted sensitive text, signature images, passwords, private keys or full authorization tokens.

Structured event logs should use identifiers and safe metadata.

Debug logging that expands sensitive data requires explicit developer-only controls and must not be the production default.

## Backup and recovery

Server backup design must cover:

- PostgreSQL,
- object storage/revision blobs,
- evidence artifacts,
- encryption/key dependencies,
- configuration/version metadata.

Recovery tests must prove relational and blob consistency, not only database restore success.

## Export and portability

Users/organizations should be able to export:

- original/current documents,
- completed signed documents,
- evidence bundles,
- audit reports,
- templates where portable,
- machine-readable metadata where feasible.

Open APIs and evidence schemas reduce lock-in.

## Migration invariants

Database/storage migrations must not silently alter the bytes of signed revisions.

If storage format changes, preserve artifact bytes/digests or explicitly version the transformation and resulting artifact identity.

## Data residency

Self-hosting naturally gives operators infrastructure choice.

Managed cloud may later offer regions, but residency claims must reflect all relevant processors such as email, SMS, identity or trust providers—not only the primary database.

## Telemetry

Local/self-host privacy principle:

- no invasive mandatory telemetry,
- document contents never telemetry,
- optional diagnostics clearly scoped,
- self-host operators can disable outbound analytics,
- managed-service operational telemetry follows published privacy behavior.

## Acceptance requirements for successor specs

Any feature handling document/evidence data must declare:

- storage location,
- encryption expectations,
- network transitions,
- retention/deletion behavior,
- authorization owner/tenant,
- backup implications,
- sync/conflict behavior,
- whether bytes may change after signature.
