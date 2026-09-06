# Specification 003 — Signthos Domain and Anti-Corruption Boundary

Status: `SHAPING_CANDIDATE / PLANNING_ONLY / SIGNTHOS_AUTHORED / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical shaping base: `89146441dbd3cbadcddbcd24dc0741b4ecdc14e1`
Canonical predecessor: Specification 002 `CLOSED_CANONICAL`
Predecessor closeout: PR #85 / merge `89146441dbd3cbadcddbcd24dc0741b4ecdc14e1`

## Authority

Issue #6 is `PLANNING_ONLY`.

This shaping package may define Signthos-owned domain vocabulary, invariants, contract boundaries, dependency order, qualification gates, and future implementation-grain candidates. It does **not** authorize product/runtime implementation, source import, dependency installation, database migration, provider execution, signing/PDF behavior, external services, credentials, regulated identity/compliance claims, or Specification 004 work.

The roadmap number `003` describes dependency order only. It is not implementation authority.

Any future implementation grain requires a separately canonical bounded authorization after this shaping package is independently reviewed, guarded-merged, post-merge verified, and its successor frontier is reread.

## Exact predecessor truth

Specification 002 closed canonically for the current authorized Documenso import surface.

The canonical imported source surface is intentionally narrow:

- `.npmrc` through `U001-I0001`;
- `packages/prisma/schema.prisma` through `U001-I0002`.

No Documenso authentication, document/envelope application logic, editor/signing logic, API/webhook logic, mail/storage/job logic, or EE application behavior was imported under Specification 002.

The selected 002C auth candidates remain excluded because exact `COPY_EXACT` rights were not established. 002D–002G were not selected for the current import surface. 002H remained optional/not selected.

Therefore Specification 003 must not pretend that excluded or unselected Documenso behavior exists inside Signthos. Anti-corruption work may target only actually inherited/imported surfaces and independently observed external behavior where separately qualified. New product contracts defined here are Signthos-owned requirements, not copies of blocked upstream expression.

## Problem

Without an explicit domain boundary, future PDF, signing, web, desktop, mobile, API, automation, and self-hosted work could each invent incompatible concepts for documents, revisions, recipients, routing, authorization, errors, providers, and signing inputs.

A cosmetic rename would preserve accidental upstream coupling. A premature implementation rewrite would create hidden semantics before the contracts are reviewable.

Specification 003 therefore establishes one stable Signthos domain model and anti-corruption boundary before downstream product implementation converges on it.

## Goal

Create a canonical, implementation-independent contract model that future Signthos work can target consistently while preserving these invariants:

- document content/revisions are distinct from envelope/routing state;
- signable input is an immutable exact revision, never an implicitly mutable document;
- non-PDF imports become explicit conversion revisions before signing;
- authentication is distinct from resource authorization;
- tenant/resource authorization semantics are explicit and enforceable server-side where a server participates;
- browser, native, server, and heavy processors implement shared capability contracts rather than hidden platform-specific domain forks;
- stable event and error classes are machine-readable;
- anti-corruption adapters isolate inherited/imported representation from Signthos contracts;
- excluded upstream source is never recreated by copying or translating its protected expression.

## Scope in

Planning/shaping scope includes:

- canonical domain vocabulary and identity/value boundaries;
- `Document`, `DocumentRevision`, `Envelope`, `Recipient`, `Field`, `EvidenceBundle`, and `Workflow` contract semantics;
- content-addressed revision identity requirements;
- immutable signing-input semantics;
- explicit non-PDF conversion revision semantics;
- event taxonomy requirements;
- stable machine-readable error classes;
- principal/tenant/resource/action authorization vocabulary;
- provider capability/interface boundaries for browser, native, server, and heavy-processing implementations;
- anti-corruption adapter responsibilities around actually imported surfaces;
- bounded naming/configuration migration rules;
- deterministic future test/evidence requirements;
- recursive decomposition into independently reviewable future grains.

## Scope out

This shaping unit does not authorize or perform:

- TypeScript, Rust, SQL, Prisma, API, UI, desktop, mobile, or server implementation;
- schema migration or database mutation;
- source import or provenance-record mutation;
- copying/adapting excluded 002C source;
- dependency or toolchain acquisition;
- runtime/provider execution;
- PDF parsing/rendering/editing/conversion implementation;
- signing-key management or cryptographic signing implementation;
- regulated identity, PAdES/QES/AdES, certificate-trust, or legal-effect claims;
- auth-provider/OIDC/SAML implementation;
- public REST/OpenAPI/SDK implementation;
- self-hosted deployment work;
- broad mechanical rebrand;
- Specification 004 or later implementation.

## Domain vocabulary

The names below are contract terms. Exact field layouts and language bindings belong to later bounded qualification/implementation grains.

### Document

A `Document` is the stable logical identity for a user-visible document across revisions.

A `Document` does not itself mean “the bytes being signed.” Mutable metadata, workspace placement, routing state, and presentation state must not silently redefine the signing input.

A document may reference a current working revision, but historical revisions remain separately addressable.

### DocumentRevision

A `DocumentRevision` is an immutable content snapshot.

Minimum semantic requirements:

- stable revision identifier;
- owning `Document` identifier;
- exact content digest with an algorithm tag;
- media type;
- byte length when available at creation/verification boundary;
- creation provenance/origin class;
- optional predecessor revision identifier;
- explicit revision-creation reason such as import, conversion, edit, merge, redaction, signing increment, or external ingest;
- immutable content identity after creation.

A content-changing operation creates a new revision. It does not mutate an existing signed or signable revision in place.

### Signable revision

A revision is signable only when the owning signing/PDF specifications later establish that its media type and structural state are acceptable for signing.

For PDF workflows, the signing input must bind to the exact bytes of one `DocumentRevision`.

If the source is not already a signable PDF, conversion produces a distinct new revision before any signing workflow binds to it.

No UI convenience may silently replace the bound signing revision after signer intent or signature evidence has been recorded.

### Envelope

An `Envelope` is the routing, recipient, intent, and completion container for a signing workflow.

It is distinct from the `Document` and from a `DocumentRevision`.

An envelope must identify the exact revision(s) it governs at each signing/evidence boundary. Changing signable content requires an explicit new revision and an explicit workflow transition; it cannot be represented as an invisible edit to an existing bound input.

### Recipient

A `Recipient` is an envelope-scoped participant with an explicit role and delivery/interaction state.

Recipient identity evidence, authentication method, and authorization to act are separate concepts. Authentication success alone does not grant access to another tenant/resource/envelope.

### Field

A `Field` represents a structured interaction or placement requirement associated with an envelope and a specific document/revision context.

Field semantics must distinguish user input intent from rendered appearance. Coordinates or anchors must be bound to a known revision/page geometry so that a later content revision cannot silently reinterpret an earlier field placement.

### EvidenceBundle

An `EvidenceBundle` is the stable container for verifiable workflow/signing evidence associated with exact document revisions and envelope actions.

It is not a marketing label for legal validity. Later signing specifications may populate cryptographic, consent, timestamp, certificate, and audit evidence, but verifier output must keep validity, trust, completeness, unsupported, and unavailable states distinct.

### Workflow

A `Workflow` describes allowed domain transitions and orchestration semantics. Provider-specific job execution, UI navigation, and transport retries are not themselves the domain model.

Workflow state transitions must be explicit and idempotency/replay semantics must be defined before public API exposure.

## Identity and addressing rules

Contract identifiers must be opaque and stable. Human-readable names are not identity.

Content addressing must include an algorithm tag and exact digest bytes/text representation. A later owning implementation specification may select a default algorithm, but no implementation may silently change the algorithm or canonicalization rules for an existing revision identity.

A revision digest represents exact content bytes, not a visually equivalent rendering and not an implicitly normalized file.

## Revision invariants

The following invariants are mandatory design inputs for all later grains:

1. a content-changing operation creates a new `DocumentRevision`;
2. a signed or signing-bound revision is immutable;
3. routing-state changes do not mutate document content;
4. metadata changes that affect signable bytes require a new revision;
5. non-PDF conversion is explicit and creates a new revision;
6. provider output that changes document bytes returns a new revision identity;
7. verification results bind to the exact revision/evidence inputs examined;
8. historical revisions remain auditable and are not overwritten by “latest” aliases.

## Authorization model vocabulary

Specification 003 separates authentication from authorization.

The minimum authorization decision vocabulary is:

- `Principal` — authenticated or otherwise identified actor context;
- `TenantId` — explicit tenant/account/workspace scope where multi-tenancy exists;
- `ResourceRef` — exact resource type and identifier;
- `Action` — machine-readable attempted capability;
- `AuthorizationContext` — additional bounded facts required for the decision;
- `AuthorizationDecision` — allow/deny plus stable reason metadata, without leaking sensitive existence information where inappropriate.

Server-backed access checks must be enforceable server-side. Client UI gating is not authorization.

Cross-tenant access is deny-by-default unless a canonical contract explicitly models a permitted relationship.

Resource authorization must be composable with recipient/envelope permissions without making “is authenticated” equivalent to “may act.”

## Event taxonomy

Future event contracts must distinguish at least:

- domain facts that already occurred;
- commands/requests to perform work;
- provider/runtime operational events;
- audit/evidence events.

Event names and payload versions must be stable and machine-readable. Sensitive document content and secrets must not be placed into events by default.

Events that contribute to signing/evidence history must bind to exact resource/revision identities and canonical timestamps in an unambiguous machine representation.

## Stable error model

Later implementations must expose stable machine-readable error classes rather than making clients parse human text.

The taxonomy must be able to represent at least:

- invalid input;
- authentication required/failed;
- authorization denied;
- resource not found or intentionally undisclosed;
- conflict/version mismatch;
- unsupported capability;
- unavailable provider/service;
- resource limit exceeded;
- malformed/untrusted document failure;
- verification incomplete/unsupported/unavailable;
- internal invariant violation.

Human messages may vary by locale. Error class/code semantics must remain stable across supported interfaces.

## Provider boundary

Browser, native, server, and heavy-processing providers implement explicit capabilities behind shared Signthos contracts.

A provider must not silently redefine:

- revision identity;
- whether an operation changes content;
- signing-input immutability;
- authorization semantics;
- evidence/verification result meaning;
- error-class meaning.

Provider capabilities must be discoverable or statically declared so unsupported operations fail explicitly rather than falling through to a hidden network service.

Local-only operations must not silently upload document bytes.

Heavy processors remain separate trust boundaries with resource limits and no access to signing keys/control-plane secrets unless a later explicit contract proves a narrower need.

## Anti-corruption boundary

Anti-corruption adapters translate between imported/inherited representation and Signthos contracts without leaking upstream representation into downstream domain APIs.

For the current canonical baseline:

- `.npmrc` is workspace policy, not a product-domain model;
- `packages/prisma/schema.prisma` is the only imported domain-adjacent upstream source artifact;
- no imported Documenso auth/document/editor/API/job runtime implementation exists to adapt.

Therefore early anti-corruption planning may map database/schema concepts to Signthos-owned domain concepts, but must not claim behavioral parity for non-imported subsystems.

If later source reuse is proposed, it must independently pass provenance/rights qualification and cannot inherit authority from this specification.

## Naming and configuration migration boundary

Specification 003 may plan bounded replacement of product-facing naming/configuration only after stable domain contracts exist.

A future rename/migration grain must not combine mechanical rename with unrelated behavior change, source import, license-boundary movement, or architecture migration.

Compatibility aliases/adapters, if required, must have explicit removal/versioning policy rather than becoming permanent hidden dual semantics.

## Planned recursive grains

The current shaping candidate proposes the following dependency order. These are planning identities, not implementation authorization.

### 003A — Domain vocabulary and identity invariants

Define stable identity/value semantics for `Document`, `DocumentRevision`, `Envelope`, `Recipient`, `Field`, `EvidenceBundle`, `Workflow`, identifiers, digests, and revision lineage.

### 003B — Revision and immutable signing-input contracts

Define content-changing vs non-content-changing operations, revision creation, conversion revisions, exact signing-input binding, and signed-input mutation prohibitions.

Depends on 003A.

### 003C — Envelope, recipient, field and workflow contracts

Define routing/recipient/field/workflow semantics independently from document content identity.

Depends on 003A–003B.

### 003D — Authorization, event and stable error contracts

Define principal/tenant/resource/action authorization vocabulary, stable event taxonomy, audit/evidence event boundaries, and machine-readable errors.

Depends on 003A and relevant 003C resource semantics.

### 003E — Provider capability contracts

Define browser/native/server/heavy provider interfaces and capability discovery without platform-specific domain forks.

Depends on 003A–003D.

### 003F — Prisma anti-corruption and migration mapping

Map the actually imported Prisma schema concepts to Signthos contracts, identify mismatches, and define adapter/migration seams. No schema mutation is authorized by the planning grain.

Depends on stable contracts from 003A–003E.

### 003G — Bounded product naming/configuration migration plan

Identify rename/configuration seams only after contract ownership is stable. No broad rebrand is authorized by shaping.

Depends on 003A–003F.

### 003H — Specification 003 convergence/closeout

Reconcile every actually authorized 003 implementation grain, contract tests, review evidence, adapter boundary, and successor eligibility before Specification 004 may become active.

## Characterization and test strategy for later grains

Planning must distinguish three evidence classes:

1. **Canonical imported-source evidence** — exact imported artifacts and provenance from Specification 002;
2. **Observable-behavior evidence** — independently observed contracts/behavior when separately qualified and legally safe;
3. **Signthos-owned desired behavior** — newly authored requirements defined by this specification and later approved implementation grains.

Later contract tests must never label desired behavior as inherited upstream characterization when no inherited implementation exists.

Future implementation tests should include, where applicable:

- revision immutability and digest stability;
- explicit new-revision creation for content changes;
- non-PDF conversion revision creation;
- envelope/revision separation;
- cross-tenant authorization denial;
- recipient authentication without implicit resource authorization;
- stable error-code behavior;
- provider capability parity/unsupported behavior;
- local mode no-network assertions;
- adapter round-trip or deterministic mapping tests where a mapping is actually defined.

## Security and privacy requirements

Planning must preserve:

- deny-by-default cross-tenant resource access;
- exact revision binding for signing/evidence;
- no silent local-to-network transition;
- no parser/provider access to signing keys by default;
- no document content in logs/events unless explicitly required and bounded;
- no existence leakage from authorization errors where sensitive;
- no silent downgrade from unsupported/unavailable verification to success;
- no use of authentication claims as a substitute for resource authorization.

## Rights and provenance boundary

This shaping package is Signthos-authored and contains zero upstream-derived source bytes.

It does not change canonical source-import records, `NOTICE`, license artifacts, or permission evidence.

References to upstream/imported concepts are factual planning references only. They do not grant rights to copy excluded source or create derivative code from it.

## Change-surface rule for Stage P shaping

The Stage P shaping PR may change exactly:

- `specs/003-signthos-domain-boundary/spec.md`;
- `specs/003-signthos-domain-boundary/plan.md`;
- `specs/003-signthos-domain-boundary/tasks.md`;
- Issue #6 comments/metadata as evidence bookkeeping.

No product/runtime/source/package/dependency/config/workflow/provenance/NOTICE/database bytes are authorized in Stage P.

## Shaping acceptance criteria

Stage P shaping is complete only when:

- Specification 002 predecessor closure is exact and verified;
- current imported baseline truth is represented without inflating inherited behavior;
- scope-in/scope-out and anti-corruption boundaries are explicit;
- domain entities and critical invariants are defined at contract level;
- auth vs resource authorization is explicit;
- provider boundaries and local-first constraints are explicit;
- recursive grains are dependency-ordered;
- no implementation/import/acquisition authority is inferred;
- the shaping diff contains zero upstream-derived source bytes;
- exact-head workflow/check accounting is truthful;
- independent substantive review evaluates the exact shaping head;
- every material finding is repaired forward-only and the final exact head is re-reviewed;
- unresolved material review threads are zero;
- guarded merge uses exact expected-head protection;
- post-merge verification proves exact ancestry/tree/surface;
- successor authority is reread from canonical truth after merge.

## Exit condition for Specification 003

Specification 003 itself does **not** close when Stage P shaping merges.

The specification may become `CLOSED_CANONICAL` only after every implementation/qualification grain that becomes canonically authorized is completed, independently reviewed, exact-head qualified, guarded-merged, post-merge verified, and reconciled, and new development can target stable Signthos contracts while actually inherited behavior remains isolated behind explicit adapters.

Specification 004 remains unauthorized until canonical Specification 003 governance explicitly establishes its successor condition.