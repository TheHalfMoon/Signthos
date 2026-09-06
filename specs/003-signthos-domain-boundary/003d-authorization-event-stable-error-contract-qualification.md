# Specification 003D — Authorization, Event, and Stable Error Contract Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_CONTRACT_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `9dae6ca33110f0965a8074294bdda5835134340f`
Owning specification: `003-signthos-domain-boundary`

## Canonical authority

Specification 003A, 003B, and 003C are canonical predecessors.

The fresh post-003C successor reread in Issue #6 authorizes exactly:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 003D_AUTHORIZATION_EVENT_STABLE_ERROR_CONTRACT_QUALIFICATION
003D_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
003D_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
003E_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact exercises only that bounded planning/contract authority.

## Purpose

Freeze the minimum implementation-independent Signthos contracts for resource authorization, machine-readable event classes, audit/evidence event boundaries, and stable machine-readable errors before application, server, provider, or public API implementations proliferate.

003D defines:

- principal, tenant, resource, action, authorization-context, and allow/deny semantics;
- recipient-specific authorization without collapsing recipient identity into authentication identity;
- deny-by-default cross-tenant and sensitive resource-disclosure behavior;
- domain-event, command/request, provider/runtime-event, and audit/evidence-event separation;
- event identity, versioning, exact subject binding, timestamp, correlation/causation, replay, and data-minimization semantics;
- stable error classes/codes and provider-to-domain error normalization boundaries;
- adversarial authorization/event/error cases required by later implementation grains.

003D does not implement any of those contracts.

## Allowed change surface

This qualification may add only Signthos-authored planning/contract material under:

`specs/003-signthos-domain-boundary/**`

It authorizes none of:

- source import or provenance expansion;
- package or lockfile mutation;
- dependency acquisition;
- TypeScript, Rust, SQL, Prisma, JSON Schema, OpenAPI, generated code, or runtime types;
- database migration, persistence mapping, policy-store implementation, or transaction design;
- authentication-provider, OIDC, SAML, passkey, email-link, SMS, or identity-proofing implementation;
- API, webhook, SDK, UI, transport-status, or middleware implementation;
- provider/runtime/network/credential execution;
- PDF parsing, rendering, conversion, signing, verification, or cryptographic execution;
- deployment;
- 003E implementation;
- Specification 004 work.

## Evidence class

Every new rule below is `SIGNTHOS_OWNED_DESIRED_CONTRACT` derived from canonical Stage P and 003A–003C contracts.

No rule below claims that equivalent Documenso application behavior was imported. The canonical imported Documenso source surface remains limited to `.npmrc` and `packages/prisma/schema.prisma`.

## Predecessor contracts consumed without reopening

003D consumes these canonical facts:

1. `Document`, `DocumentRevision`, `Envelope`, `Recipient`, `Field`, `EvidenceBundle`, and `Workflow` have distinct identity/state ownership boundaries.
2. `DocumentRevision` bytes are immutable and exact-content-sensitive references use exact `DocumentRevisionId` values rather than mutable aliases.
3. a ready/active envelope binds an ordered sealed set of exact revisions.
4. `RecipientId` is an envelope-scoped participation-slot identity, not a global person or authentication principal.
5. recipient contact identifiers and authentication evidence are not canonical recipient identity.
6. authentication success is not resource authorization.
7. recipient role does not itself grant authorization.
8. a workflow defines permitted domain transitions, while provider/runtime job state is not canonical workflow state.
9. 003C owns envelope/recipient/field/workflow transition and idempotency semantics; 003D must not silently redefine that state machine.
10. verification validity, certificate trust, cryptographic strength, regulated signature level, and legal effect remain owned by later signing/evidence specifications.

003D owns security decision semantics and machine-interoperability/error vocabulary while preserving 003E provider ownership, 003F persistence ownership, and later API/signing ownership.

# Authorization contract

## Authorization decision model

A protected operation is evaluated conceptually as:

```text
AuthorizationRequest {
  principal
  tenant_scope?
  resource
  action
  context
}

AuthorizationDecision {
  effect
  reason_code
  disclosure
}
```

This is a semantic shape, not a wire schema or programming-language type.

Canonical effects are:

```text
ALLOW
DENY
```

Rules:

1. absence of a proven `ALLOW` is `DENY`;
2. authentication success alone cannot produce `ALLOW`;
3. an unknown, malformed, stale, unsupported, or insufficient authorization fact cannot be coerced into `ALLOW`;
4. authorization is evaluated for one exact resource/action decision boundary, not inferred from UI visibility;
5. provider-local permissions, route guards, client feature flags, or hidden UI controls are not substitutes for the canonical authorization decision;
6. an `ALLOW` decision is not a transferable capability unless a later owning specification explicitly defines a capability credential;
7. authorization never changes document bytes, envelope state, recipient state, field state, or evidence by itself.

## Principal

`Principal` is the actor context presented to an authorization decision.

A principal may represent an authenticated human, a service/workload identity, or another explicitly qualified actor class in later implementation. 003D does not select authentication mechanisms.

Minimum semantic properties:

```text
Principal {
  principal_id
  principal_kind
  authentication_assurance_ref?
}
```

Rules:

1. `principal_id` is stable within its owning identity authority but is not a `RecipientId`;
2. provider account IDs may be mapped into principal identity but cannot silently become canonical Signthos resource identity;
3. authentication evidence may inform principal context but does not itself grant any resource action;
4. an anonymous/unauthenticated context, if a later contract permits one, is explicit rather than represented as a fabricated authenticated principal;
5. principal attributes used by policy must be bounded, provenance-aware facts rather than arbitrary client assertions;
6. 003D does not define credential issuance, session storage, token format, identity federation, or account lifecycle.

## Tenant scope

`TenantId` is the opaque authorization scope for a tenant/account/workspace boundary where multi-tenancy exists.

Rules:

1. tenant identity is independent from display names, domains, email addresses, billing accounts, or provider tenant IDs;
2. a principal being known to one tenant does not imply authority in another tenant;
3. cross-tenant access is `DENY` by default;
4. a cross-tenant relationship may permit an action only when a later canonical policy explicitly models that relationship and the exact resource/action decision proves it;
5. matching resource identifiers across tenants never collapse tenancy boundaries;
6. tenant scope may be absent only for a resource/action contract that is explicitly tenant-independent; absence is not a wildcard tenant.

## Resource reference

Every protected operation identifies an exact canonical resource reference:

```text
ResourceRef {
  resource_kind
  resource_id
}
```

Minimum canonical resource kinds for current Specification 003 semantics are:

```text
DOCUMENT
DOCUMENT_REVISION
ENVELOPE
RECIPIENT
FIELD
EVIDENCE_BUNDLE
WORKFLOW
```

Rules:

1. `resource_id` uses the canonical opaque identity of the named kind;
2. mutable aliases such as `latest_revision` or filenames cannot substitute for exact revision identity at security-sensitive boundaries;
3. a child relationship does not automatically inherit every parent action;
4. knowledge of a `ResourceRef` is not proof of access;
5. provider-local IDs, URLs, route strings, filenames, contact identifiers, and UI handles are not canonical resource references;
6. resource kinds may be extended only by a later bounded canonical contract rather than ad hoc provider naming.

## Action vocabulary

An `Action` is a stable machine-readable attempted capability. It is more specific than a generic authenticated/unauthenticated state and must be meaningful for the target resource kind.

The minimum semantic action families are:

```text
READ
CREATE
UPDATE
DELETE
TRANSITION
PARTICIPATE
USE
ADMINISTER
```

These families are contract categories, not a blanket permission matrix.

Rules:

1. each later implementation binds concrete resource actions to one explicit family and stable code;
2. `READ` does not imply `UPDATE`, `TRANSITION`, `PARTICIPATE`, or `ADMINISTER`;
3. `UPDATE` does not authorize mutation of immutable `DocumentRevision` bytes;
4. `TRANSITION` is evaluated against the exact domain transition permitted by 003C; authorization cannot make an invalid transition valid;
5. `PARTICIPATE` means acting for one exact `RecipientId` participation slot and does not imply envelope administration;
6. `USE` permits use of a separately authorized resource such as a workflow policy but does not imply administration of it;
7. `ADMINISTER` is explicit and must not be inferred from ownership labels or broad UI roles;
8. later API transport may use more specific namespaced action codes, but it cannot collapse distinct semantic actions into a single ambiguous permission.

## Authorization context

`AuthorizationContext` contains bounded facts needed to evaluate the exact decision.

Potential fact classes include:

- tenant relationship;
- resource ownership/membership relationship;
- exact envelope/recipient relationship;
- recipient role and current 003C state;
- requested transition identity;
- authentication-assurance reference required by a separately owning workflow/signing policy;
- delegated relationship explicitly qualified by a later contract.

Rules:

1. context is not an untyped map whose arbitrary client fields may grant authority;
2. every policy-relevant fact has an owning source/trust classification in later implementation;
3. caller-controlled presentation data cannot be promoted to trusted authorization fact by convention;
4. missing required context fails closed;
5. authorization context cannot silently mutate domain state;
6. provider/runtime capability data belongs to 003E and may constrain execution but cannot redefine authorization semantics.

## Recipient-specific authorization

A `Principal` may act for a `RecipientId` only when a canonical authorization decision proves the exact relationship and action.

Required invariants:

1. matching email, phone, display name, provider account, or authentication subject is insufficient by itself;
2. successful authentication is insufficient by itself;
3. a principal authorized for one recipient slot is not thereby authorized for another slot, even when both slots resolve to the same person/contact;
4. recipient `role` is an obligation classification, not an authorization grant;
5. an `OBSERVER` role cannot be promoted to signer/approver action merely because the principal can read the envelope;
6. `PARTICIPATE` is scoped to the exact envelope/recipient relationship and permitted 003C action;
7. authorization cannot bypass routing-step/actionability or terminal-state rules from 003C;
8. a workflow-authorized skip, decline, completion, or field action still requires whatever actor authorization the owning transition contract later requires.

## Cross-tenant fail-closed behavior

For a tenant-scoped protected resource:

```text
principal_tenant_scope != resource_tenant_scope
  => DENY
```

unless an explicit canonical cross-tenant relationship proves the exact resource/action grant.

A server-backed implementation must enforce this decision server-side where a server participates. Client-side filtering or route hiding is insufficient.

## Authorization reason semantics

Stable decision reasons support policy evaluation, diagnostics, audit, and tests without becoming a sensitive disclosure channel.

Minimum internal reason categories are:

```text
ALLOW_POLICY_MATCH
DENY_AUTHENTICATION_REQUIRED
DENY_AUTHENTICATION_INSUFFICIENT
DENY_TENANT_SCOPE
DENY_RESOURCE_RELATION
DENY_ACTION_NOT_GRANTED
DENY_RECIPIENT_BINDING
DENY_STATE_PRECONDITION
DENY_CONTEXT_INSUFFICIENT
DENY_POLICY_UNAVAILABLE
DENY_OTHER_EXPLICIT
```

Rules:

1. a reason is machine-readable and stable within its semantic version;
2. internal reason precision does not require equally precise disclosure to an untrusted caller;
3. `DENY_OTHER_EXPLICIT` requires a stable bounded subreason rather than arbitrary human text;
4. a deny reason cannot be used as evidence that the resource exists when disclosure policy says existence is hidden;
5. localized human text is not a decision code.

## Resource existence and disclosure

Authorization decisions and user-facing errors must prevent sensitive resource enumeration.

Canonical disclosure modes are:

```text
DISCLOSE
UNDISCLOSED
```

Rules:

1. `UNDISCLOSED` permits an implementation to return the same externally observable not-found/undisclosed error contract for nonexistent and unauthorized-sensitive resources;
2. internal audit may retain the true deny reason under an authorized evidence/logging boundary;
3. public/client error details must not reveal tenant membership, resource owner, recipient contact, document metadata, or authorization-policy internals merely to explain a denial;
4. timing/transport side-channel hardening is an implementation/security requirement owned by later bounded work; 003D freezes the semantic no-existence-leak requirement.

# Event contract

## Event classes

003D defines four non-interchangeable classes:

```text
DOMAIN_EVENT
COMMAND_REQUEST
PROVIDER_RUNTIME_EVENT
AUDIT_EVIDENCE_EVENT
```

### Domain event

A `DOMAIN_EVENT` states that an accepted canonical domain fact already occurred.

Examples at semantic level:

- an envelope transitioned between canonical 003C states;
- a recipient participation slot transitioned;
- a field became satisfied or waived;
- an exact revision binding was sealed.

Rules:

1. a domain event is emitted only after the owning domain transition is accepted;
2. an attempted command is not a domain event;
3. a provider callback is not automatically a domain event;
4. event publication cannot make an otherwise-invalid transition valid;
5. domain events reference canonical Signthos identities rather than provider-local IDs.

### Command/request

A `COMMAND_REQUEST` requests that an operation be evaluated/performed.

Rules:

1. it represents intent/request, not proof that work occurred;
2. authorization and domain preconditions are evaluated before a protected command may produce an accepted domain transition;
3. rejected commands do not generate success-domain events;
4. idempotent replay semantics must preserve the owning 003C transition rules;
5. a command may produce a stable error outcome without any domain event.

### Provider/runtime event

A `PROVIDER_RUNTIME_EVENT` reports operational facts from a provider/runtime boundary.

Examples include bounded progress, timeout, cancellation observation, provider availability, or job completion signals.

Rules:

1. provider/runtime events do not redefine canonical domain state;
2. provider success does not prove authorization, domain transition validity, content validity, signature validity, or legal effect;
3. provider-local identifiers remain adapter data;
4. a provider/runtime event may be translated into a command/result only through an explicit adapter/domain validation boundary;
5. provider capability and runtime semantics remain owned by 003E.

### Audit/evidence event

An `AUDIT_EVIDENCE_EVENT` records an auditable/evidence-relevant observation or accepted fact under an explicitly owning evidence policy.

Rules:

1. it binds exact canonical subject identities;
2. it is append-oriented/immutable once canonicalized; correction uses a new explicit event rather than silent overwrite;
3. it does not by itself prove cryptographic validity, trust, regulated signature level, or legal effect;
4. authentication evidence, consent/intent evidence, provider claims, and signature evidence remain distinguishable subcategories in later owning specifications;
5. sensitive payload data is minimized by default;
6. an audit/evidence event may reference a related domain event without becoming the same semantic class.

## Event identity

Canonical event records use an opaque `EventId` introduced by 003D.

Conceptually:

```text
EventRecord {
  event_id
  event_class
  event_type
  schema_version
  occurred_at
  recorded_at?
  subject_refs[]
  actor_ref?
  correlation_id?
  causation_id?
  payload
}
```

This is a semantic record, not an implementation/wire schema.

Rules:

1. `EventId` identifies one canonical event record and is not derived from timestamp or provider job ID;
2. duplicate delivery/replay of the same canonical event preserves the same `EventId` where the same event identity is known;
3. `event_type` is stable and machine-readable;
4. `event_class` cannot silently change for an existing event type/version;
5. `payload` is type/version governed rather than an arbitrary unbounded bag;
6. concrete identifier encoding and storage remain deferred.

## Event versioning

Every event type has an explicit `schema_version`.

Rules:

1. consumers must not infer schema semantics from human descriptions alone;
2. a breaking change to required meaning, field interpretation, or event-class semantics requires a new incompatible schema version;
3. additive optional metadata may be introduced only when old consumers can safely ignore it without changing the event's meaning;
4. an unknown incompatible event version is `UNSUPPORTED`, not silently parsed as the nearest known version;
5. event type/version stability is independent from transport protocol versioning;
6. no public webhook/API representation is selected by 003D.

## Exact event subject binding

`subject_refs[]` contains one or more canonical `ResourceRef` values.

Requirements:

1. revision-sensitive events reference exact `DOCUMENT_REVISION` resources;
2. envelope transition events reference the exact `ENVELOPE` and may reference affected `RECIPIENT`/`FIELD` resources as required by the event contract;
3. signing/evidence-sensitive events cannot use mutable aliases as exact content subjects;
4. actor/principal references do not replace recipient/resource subject identity;
5. provider-local IDs may appear only as bounded adapter/diagnostic metadata where explicitly permitted.

## Canonical timestamp semantics

Canonical event instants use UTC RFC 3339 representation with an explicit `Z` offset.

Rules:

1. `occurred_at` records when the represented fact occurred according to the owning event source;
2. `recorded_at`, when present, records when Signthos accepted/recorded the event and is not a replacement for `occurred_at`;
3. local-time strings without an offset are invalid as canonical event instants;
4. display localization cannot mutate canonical timestamp meaning;
5. wall-clock timestamps alone do not establish causal ordering when events race;
6. provider-supplied timestamps are evidence inputs and do not automatically become trusted canonical occurrence times without the owning adapter/evidence policy;
7. concrete clock source, precision, synchronization, and storage mechanics remain deferred.

## Correlation and causation

`correlation_id` groups records that belong to one bounded operation/workflow interaction without implying identical identity.

`causation_id` identifies the immediate canonical event/command relationship when one exists.

Rules:

1. correlation does not grant authorization;
2. causation metadata cannot override domain transition rules;
3. provider trace/job IDs are not silently substituted for canonical correlation/causation identity;
4. missing optional correlation metadata cannot turn a duplicate command into a new authorized transition when 003C idempotency says otherwise.

## Replay and idempotency boundary

003D preserves 003C transition idempotency and defines the event/command consequences:

1. replaying the same accepted idempotent command must not create a second semantic domain transition;
2. repeating the same idempotency key with a semantically different request is a conflict;
3. duplicate event delivery must be detectable by canonical event identity/version rather than processed as a new domain fact;
4. replay cannot bypass current authorization when the owning command contract requires fresh authorization evaluation;
5. an event consumer cannot reinterpret an old event under a newer incompatible schema silently;
6. persistence/transaction/outbox mechanics remain owned by 003F or later implementation grains.

## Sensitive-data minimization

Events exclude sensitive payload material by default.

Unless a later explicitly owning contract proves necessity and handling requirements, events must not contain:

- document bytes;
- signing private keys or key material;
- credentials, bearer tokens, session secrets, OTPs, recovery secrets, or raw authentication artifacts;
- full field values when a reference/status is sufficient;
- recipient contact details when `RecipientId` is sufficient;
- unrestricted request/response bodies;
- provider secrets;
- confidential permission/provenance evidence.

Rules:

1. logs are not a permitted backdoor around event minimization;
2. a digest/reference may be used only when it does not itself reveal sensitive content beyond the owning policy;
3. redaction/minimization must preserve enough stable identifiers to audit the relevant action without embedding document content;
4. later evidence/signing specs may authorize narrowly scoped evidence payloads without weakening this default.

# Stable error contract

## Error outcome model

A machine-facing failure exposes a stable semantic class and code independently from localized human text.

Conceptually:

```text
ErrorOutcome {
  error_class
  error_code
  retry_semantics
  disclosure
  details?
}
```

This is not an HTTP, RPC, CLI, or language-exception schema.

Rules:

1. clients must not need to parse human text to determine failure semantics;
2. `error_class` is coarse and stable;
3. `error_code` is a stable machine-readable refinement within that class;
4. human messages may vary by locale without changing class/code meaning;
5. transport-specific status mapping belongs to later API/UI/CLI owners;
6. provider raw errors are diagnostic inputs, not canonical error codes;
7. error details obey authorization/disclosure and sensitive-data minimization rules.

## Canonical error classes

Minimum classes are:

```text
INVALID_INPUT
AUTHENTICATION_REQUIRED
AUTHENTICATION_FAILED
AUTHORIZATION_DENIED
RESOURCE_NOT_FOUND_OR_UNDISCLOSED
CONFLICT
UNSUPPORTED_CAPABILITY
UNAVAILABLE
RESOURCE_LIMIT_EXCEEDED
MALFORMED_UNTRUSTED_DOCUMENT
VERIFICATION_INCOMPLETE
VERIFICATION_UNSUPPORTED
VERIFICATION_UNAVAILABLE
INVARIANT_VIOLATION
```

### INVALID_INPUT

Use for malformed request shape/value or a request that cannot satisfy a declared static/domain input requirement before execution.

Representative stable codes may include:

```text
invalid_input.malformed
invalid_input.precondition
invalid_input.unknown_value
```

A transition race/version mismatch is `CONFLICT`, not merely invalid input.

### AUTHENTICATION_REQUIRED

Use when the requested protected operation requires authenticated principal context and none is established.

This class does not reveal whether a sensitive target resource exists.

### AUTHENTICATION_FAILED

Use when an attempted authentication proof fails under the owning authentication mechanism.

003D does not define credential format or provider implementation.

### AUTHORIZATION_DENIED

Use when the caller may be told that authorization was denied without violating disclosure policy.

Representative refinements include:

```text
authorization_denied.action_not_granted
authorization_denied.recipient_binding
authorization_denied.state_precondition
```

Sensitive cross-tenant/resource denial may instead surface externally as `RESOURCE_NOT_FOUND_OR_UNDISCLOSED`.

### RESOURCE_NOT_FOUND_OR_UNDISCLOSED

Use as the externally stable non-enumerating class when a resource is nonexistent or its existence must not be disclosed to the caller.

Rules:

1. the external class does not distinguish nonexistent from intentionally undisclosed;
2. authorized internal audit may retain the precise reason;
3. details must not leak tenant/resource ownership or recipient/contact facts.

### CONFLICT

Use for an otherwise meaningful request that conflicts with current canonical state/version/idempotency semantics.

Minimum stable refinements include:

```text
conflict.version_mismatch
conflict.transition_race
conflict.idempotency_key_reuse
conflict.terminal_state
```

A conflict must not be automatically repaired by silently retargeting a newer revision or retrying a different domain transition.

### UNSUPPORTED_CAPABILITY

Use when the requested semantic capability/version is not supported by the selected/available contract or provider capability set.

Unsupported is not the same as temporarily unavailable.

### UNAVAILABLE

Use when a supported dependency/provider/service required for the operation is temporarily or operationally unavailable.

Unavailable is not success, unsupported, or authorization denial.

### RESOURCE_LIMIT_EXCEEDED

Use when a declared processing/resource safety limit is exceeded.

Later implementation may refine dimensions such as bytes, pages, memory, time, concurrency, or provider quota while preserving the stable class.

### MALFORMED_UNTRUSTED_DOCUMENT

Use when untrusted document structure/content cannot be safely accepted/parsed/processed under the owning document boundary.

This class must not be converted into an internal invariant failure merely because a parser threw an implementation exception.

### Verification classes

`VERIFICATION_INCOMPLETE`, `VERIFICATION_UNSUPPORTED`, and `VERIFICATION_UNAVAILABLE` preserve uncertainty/failure-to-evaluate distinctions.

Rules:

1. `VERIFICATION_INCOMPLETE` means required evidence for the requested verification conclusion is missing/incomplete;
2. `VERIFICATION_UNSUPPORTED` means the verifier does not support the relevant format/algorithm/evidence feature;
3. `VERIFICATION_UNAVAILABLE` means a required supported verification dependency is operationally unavailable;
4. none may be converted into valid/success;
5. a completed verification result of `INVALID` is a domain verification result, not automatically an error class;
6. exact cryptographic/verifier result semantics remain owned by later signing/evidence specifications.

### INVARIANT_VIOLATION

Use when Signthos itself reaches a state that violates a canonical internal invariant despite validated external input.

Rules:

1. do not use this class for ordinary untrusted/malformed document input;
2. do not expose internal stack traces, secrets, policy data, or document content to callers;
3. fail closed and preserve evidence needed for authorized diagnostics;
4. an invariant violation cannot be rewritten into success to keep a workflow moving.

## Retry semantics

Canonical retry categories are:

```text
DO_NOT_RETRY_UNCHANGED
RETRY_MAY_SUCCEED
RETRY_REQUIRES_CHANGED_INPUT_OR_STATE
```

Rules:

1. retry classification is semantic guidance, not a transport retry loop;
2. `UNAVAILABLE` may be `RETRY_MAY_SUCCEED` when the failure is operational/transient;
3. `CONFLICT` normally requires refreshed state or changed request and is `RETRY_REQUIRES_CHANGED_INPUT_OR_STATE`;
4. authorization denial cannot be blindly retried as if it were provider unavailability;
5. an unsupported capability is not made available by blind retry;
6. provider-specific backoff/timing belongs to 003E/later transport implementation.

## Provider error normalization boundary

Later provider adapters must map provider/runtime failure into canonical error semantics without leaking provider naming into the domain contract.

Rules:

1. provider-specific error code/text may be retained as bounded diagnostic metadata but is not the canonical `error_code`;
2. provider `404`, `401`, timeout, quota, or exception labels do not determine Signthos class without semantic translation;
3. a provider error cannot override authorization disclosure policy;
4. provider `success` cannot override invalid domain state/preconditions;
5. 003E owns provider capability/runtime mechanics; 003D owns the stable semantic error boundary.

# Authorization, event, and error composition

The canonical protected-command sequence is conceptually:

```text
1. resolve exact canonical resource/action request
2. establish/validate principal context as required
3. evaluate authorization -> ALLOW or DENY
4. validate owning 003C/domain preconditions
5. perform separately authorized operation
6. record accepted domain transition/result
7. emit canonical domain/audit events as required
```

Rules:

1. a denied command produces no success-domain event;
2. a failed domain precondition produces no accepted transition event;
3. provider/runtime completion before domain acceptance cannot fabricate a canonical domain event;
4. audit may record denied/failed attempts when an owning policy requires it, subject to sensitive-data minimization;
5. an audit event about denial is not itself authorization to retry or access the resource;
6. the ordering above expresses semantic dependencies, not a transaction/storage implementation.

# Deterministic adversarial cases

## Case A — authenticated cross-tenant principal

Given principal P authenticated in tenant T1 and envelope E scoped to T2, with no explicit cross-tenant grant:

```text
Authorize(P, T1, ENVELOPE:E, READ) => DENY
```

Authentication does not override tenant separation.

## Case B — recipient contact collision

Recipient slots R1 and R2 use the same email address. Principal P is authorized to participate as R1 only.

```text
Authorize(P, RECIPIENT:R1, PARTICIPATE) => ALLOW (if all other policy/state checks pass)
Authorize(P, RECIPIENT:R2, PARTICIPATE) => DENY
```

Contact equality does not collapse recipient authorization.

## Case C — observer cannot sign by role coincidence

A principal authorized to read an envelope and associated with an `OBSERVER` recipient cannot perform a signer participation action unless a separate exact grant exists for the correct recipient/action and 003C state permits it.

## Case D — existence leak prevention

An unauthorised caller probes a sensitive `EnvelopeId`.

The external failure may be:

```text
RESOURCE_NOT_FOUND_OR_UNDISCLOSED
```

regardless of whether the envelope exists. Internal authorized audit may preserve the exact deny cause.

## Case E — command is not an event

A request to transition `IN_PROGRESS -> COMPLETED` fails 003C required-field preconditions.

Result:

- no `EnvelopeCompleted` domain fact is emitted;
- a stable error outcome is returned/recorded under the owning interface;
- optional audit of the rejected attempt remains separate from a domain event.

## Case F — provider success cannot fabricate domain success

A provider reports its job complete, but the exact Signthos transition is unauthorized or violates 003C state.

Result:

- provider/runtime event may record the provider observation;
- canonical domain state does not advance;
- no success-domain event is emitted.

## Case G — idempotent replay

An accepted transition request is replayed with the same semantic idempotency identity.

Result:

- no second semantic transition;
- duplicate event delivery is deduplicable by canonical event identity;
- a different request using the same idempotency key is `CONFLICT`.

## Case H — sensitive payload leakage

An event implementation proposes embedding full document bytes, OTP, bearer token, or raw signature private-key material for debugging.

Result: contract violation. References/minimized authorized metadata must be used instead.

## Case I — unsupported versus unavailable

A provider that never implements a capability returns `UNSUPPORTED_CAPABILITY`; a provider that supports it but is temporarily unreachable returns `UNAVAILABLE`. Neither may be reported as success.

## Case J — invalid verification result is not infrastructure failure

A verifier successfully evaluates evidence and concludes `INVALID`.

Result: `INVALID` remains a verification result. It is not rewritten as `INVARIANT_VIOLATION` or `VERIFICATION_UNAVAILABLE`.

## Case K — stale transition race

Two authorized actors race the same terminal transition. One commits first; the stale second request observes incompatible current state.

Result:

```text
CONFLICT / conflict.transition_race
```

The stale request does not overwrite canonical state or emit a second success-domain event.

## Case L — raw provider error is not canonical API

Provider X returns `ERR_7492 foo failed`.

A later adapter must normalize it into the appropriate stable Signthos error class/code. Clients cannot be required to parse provider text as Signthos semantics.

# Deferred decisions and ownership

003D intentionally does not choose:

- authentication protocol, credential/session/token format, OIDC/SAML/passkey provider, or identity-proofing policy — later auth/security implementation;
- authorization policy language/engine, RBAC/ABAC library, policy persistence, cache, or decision-service topology — later bounded implementation;
- public API/HTTP/RPC status mapping — Specification 009 or another owning interface specification;
- webhook event transport, signatures, delivery/retry, endpoint security, or schema serialization — later API/webhook work;
- database tables, outbox/inbox, event store, transactions, isolation level, or migrations — 003F/later persistence implementation;
- provider capability implementation, timeout/backoff, cancellation wiring, network selection, or heavy-worker trust mechanics — 003E;
- PDF parser/geometry/conversion implementation — Specification 004;
- signature/evidence cryptographic formats, verifier policy, certificate trust, PAdES/QES/AdES, or legal-effect semantics — Specification 005/later signing work;
- event payload serialization format or generated schemas — later owning implementation;
- exact transport-visible error body — later owning API/UI/CLI specification;
- localization wording — later product/interface work.

Deferral is explicit and cannot be treated as permission to pick these mechanisms implicitly during implementation.

# Required negative cases for later implementations

Any implementation derived from 003D must reject or make impossible:

1. treating authenticated status as blanket resource authorization;
2. allowing cross-tenant access without an explicit exact grant relationship;
3. authorizing a recipient action from contact equality alone;
4. allowing one recipient slot to act for another merely because the same principal/contact appears in both;
5. using client-side UI hiding as the only authorization enforcement where a server participates;
6. leaking sensitive resource existence through differentiated external authorization errors;
7. allowing an authorization decision to bypass invalid 003C workflow state;
8. emitting a success-domain event for an attempted or rejected command;
9. treating provider/runtime status as canonical domain state without validation;
10. silently parsing an incompatible event schema version;
11. processing duplicate event delivery as a new semantic fact;
12. reusing an idempotency key for a different semantic request without conflict;
13. placing document bytes, signing keys, credentials, tokens, OTPs, or unrestricted sensitive field values into generic events/logs;
14. requiring clients to parse human/provider error strings;
15. collapsing unsupported and unavailable states;
16. collapsing verification incomplete/unsupported/unavailable into success;
17. treating a completed `INVALID` verification result as an infrastructure exception;
18. silently retargeting exact revision/resource bindings while handling a conflict;
19. using `INVARIANT_VIOLATION` as a catch-all for malformed untrusted input;
20. converting unknown authorization/event/error states into permissive defaults.

# Acceptance criteria

003D may become canonical only if exact-head independent substantive review confirms all of the following:

1. authorization is explicitly distinct from authentication and recipient/contact identity;
2. cross-tenant protected resource access is deny-by-default;
3. resource/action decisions bind exact canonical identities and cannot follow mutable aliases at revision-sensitive boundaries;
4. recipient-specific permissions preserve exact envelope/recipient-slot identity and 003C routing/state constraints;
5. denial/disclosure semantics prevent sensitive existence leakage;
6. domain events, commands/requests, provider/runtime events, and audit/evidence events are non-interchangeable;
7. event identity/versioning/exact subject/timestamp/correlation/replay semantics are stable without selecting transport or persistence implementation;
8. sensitive-data minimization excludes document bytes, secrets, credentials, raw auth artifacts, and unnecessary recipient/field content by default;
9. stable machine-readable error classes/codes do not require human/provider-text parsing;
10. unsupported, unavailable, malformed-untrusted-document, verification uncertainty, and invariant failures remain semantically distinct;
11. provider errors/status cannot override domain authorization/state or become hidden canonical error/event semantics;
12. 003D preserves 003A–003C contracts and does not steal 003E, 003F, Specification 004, Specification 005, or Specification 009 implementation ownership;
13. every adversarial case has one fail-closed semantic outcome;
14. the exact diff remains planning-only under `specs/003-signthos-domain-boundary/**` with zero upstream-derived source bytes and zero implementation/provenance/dependency/runtime mutation.

# Qualification workflow

This candidate requires:

1. exact current canonical base/head verification;
2. exact planning-only changed-surface verification;
3. truthful GitHub Actions/check/provider accounting;
4. fresh independent substantive exact-head review;
5. forward-only repair of every material finding, with fresh re-review after any head change;
6. zero unresolved material review threads;
7. final ruleset/branch-protection/mergeability race check;
8. mandatory exact-head premerge proof;
9. guarded merge using exact `expected_head_sha`;
10. post-merge verification of ordered parents, tree equality/bounded delta, signature, exact surface, and workflow/status truth;
11. live canonical successor derivation.

# Candidate successor

003E is not pre-authorized merely by numbering.

If and only if this exact 003D candidate becomes canonical and the live post-merge reread confirms the dependency frontier, the next candidate may be:

```text
003E_PROVIDER_CAPABILITY_CONTRACT_QUALIFICATION
```

Any such successor remains planning/contract qualification only unless separately authorized.

Candidate state before merge:

```text
003D_STATUS = QUALIFICATION_CANDIDATE
003D_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
003E_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```
