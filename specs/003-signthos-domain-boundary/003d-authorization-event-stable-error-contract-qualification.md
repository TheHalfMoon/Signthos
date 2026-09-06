# Specification 003D — Authorization, Event, and Stable Error Contract Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_CONTRACT_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `9dae6ca33110f0965a8074294bdda5835134340f`
Owning specification: `003-signthos-domain-boundary`

## Canonical authority

Specification 003A, 003B, and 003C are canonical predecessors.

The post-003C successor reread in Issue #6 authorizes exactly:

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

Freeze the minimum implementation-independent security, event, and machine-error contracts required before application/server/provider surfaces can safely proliferate.

003D defines:

- `Principal`, tenant scope, exact `ResourceRef`, action vocabulary, and bounded `AuthorizationContext`;
- deny-by-default authorization decisions with stable, non-sensitive machine reason semantics;
- recipient-specific authorization without conflating authentication evidence with resource permission;
- separation of commands/requests, domain events, provider/runtime events, and audit/evidence events;
- event versioning, exact resource/revision binding, timestamps, sensitive-data minimization, replay, and idempotency expectations;
- stable machine-readable error classes independent of localized human messages;
- adversarial constraints preventing resource-existence leakage, authorization confusion, event-class conflation, sensitive-content leakage, and text-parsed error semantics.

003D does not implement any of those contracts.

## Allowed change surface

This qualification may add only Signthos-authored planning/contract material under:

`specs/003-signthos-domain-boundary/**`

It authorizes none of:

- product or runtime code;
- authentication-provider implementation;
- authorization middleware or policy-engine implementation;
- public API, webhook, queue, or transport implementation;
- persistence or migration implementation;
- Prisma schema mutation, client generation, or dependency acquisition;
- source import or provenance expansion;
- package, lockfile, configuration, workflow, or deployment changes;
- provider/runtime/network/credential execution;
- PDF/signing/verification implementation;
- 003E implementation;
- Specification 004 work.

## Evidence class

Every new rule below is `SIGNTHOS_OWNED_DESIRED_CONTRACT` derived from canonical Stage P and 003A–003C contracts.

No rule below claims imported Documenso application behavior. The canonical imported Documenso source surface remains limited to `.npmrc` and `packages/prisma/schema.prisma`.

## Predecessor contracts consumed without reopening

003D consumes these canonical facts:

1. `DocumentId`, `DocumentRevisionId`, `EnvelopeId`, `RecipientId`, `FieldId`, `EvidenceBundleId`, and `WorkflowId` are distinct identity roles.
2. exact document revision identity is not a mutable alias.
3. signing/evidence-sensitive references bind exact `DocumentRevisionId` values.
4. envelope lifecycle and exact revision-set binding are owned by 003C.
5. recipient, field, and workflow lifecycle semantics are owned by 003C.
6. authentication evidence is distinct from resource authorization.
7. envelope routing state does not own or mutate document bytes.
8. provider capability semantics remain deferred to 003E.
9. persistence representation remains deferred to 003F.
10. cryptographic validity, trust, and legal effect remain outside 003D.

003D adds authorization, event classification, and stable error semantics around those existing domain resources without redefining their lifecycle ownership.

## Authorization model

### Principal

A `Principal` is the authenticated-or-system actor identity evaluated for a requested action.

Conceptually:

```text
Principal {
  principal_id
  principal_kind
  tenant_scope
  authentication_context_ref?
}
```

`principal_kind` is a stable domain classification, not a provider-specific token type.

Minimum kinds:

```text
USER
RECIPIENT
SERVICE
SYSTEM
ANONYMOUS
```

Required invariants:

1. `Principal` describes the actor presented to authorization; it does not itself grant permission.
2. authentication-provider identity, session identity, email address, phone number, or recipient authentication evidence cannot substitute for an authorization decision.
3. provider-specific subject identifiers may be inputs to later adapters but do not become canonical resource ownership semantics by implication.
4. `ANONYMOUS` is an explicit principal kind, never the absence of authorization evaluation.
5. `SYSTEM` and `SERVICE` principals remain subject to bounded action/resource policy rather than ambient authority.

### Tenant scope

Tenant scope is an explicit authorization boundary.

Conceptually:

```text
TenantScope {
  tenant_id
}
```

Required invariants:

1. every tenant-owned resource authorization decision binds the exact tenant scope supplied by trusted resource resolution;
2. cross-tenant access is deny-by-default;
3. caller-supplied tenant identifiers are not trusted merely because they match a route, request field, or UI state;
4. a principal authenticated in one tenant receives no implicit authority in another tenant;
5. system/service principals require explicit cross-tenant authority where such capability is ever canonically authorized later;
6. authorization failure must not reveal foreign-tenant resource existence unless a later canonical contract explicitly permits disclosure.

### Resource reference

Authorization operates on exact canonical resource identity.

Conceptually:

```text
ResourceRef {
  resource_kind
  resource_id
  tenant_scope
  revision_id?
}
```

Minimum `resource_kind` vocabulary:

```text
DOCUMENT
DOCUMENT_REVISION
ENVELOPE
RECIPIENT
FIELD
EVIDENCE_BUNDLE
WORKFLOW
```

Required invariants:

1. the resource reference uses canonical opaque identifiers defined by 003A;
2. revision-sensitive actions bind exact `DocumentRevisionId`, never `latest`, `current`, filename, URL, or provider alias;
3. resource lookup and authorization remain logically distinct even if a later implementation combines them operationally;
4. a nested resource does not inherit authorization solely because a caller knows a parent identifier;
5. field/recipient/envelope relationships from 003C constrain valid resource references but do not themselves grant principal authority.

### Action vocabulary

Stable action identifiers are semantic capabilities, not HTTP verbs, UI button names, or provider operations.

Canonical minimum actions:

```text
READ
CREATE
UPDATE
DELETE
CONFIGURE
BIND_REVISION
START
ACT
COMPLETE
DECLINE
CANCEL
VOID
VIEW_EVIDENCE
EXPORT_EVIDENCE
VERIFY
ADMINISTER
```

Rules:

1. one transport operation may require multiple domain actions;
2. the same action may map to different transport methods without changing authorization semantics;
3. `ADMINISTER` is not a wildcard bypass; later policy must state its exact covered resources/actions;
4. recipient participation actions are evaluated against recipient-specific resource relationships and workflow state;
5. action vocabulary may be extended only through a later canonical contract preserving stable machine identity.

### Authorization context

Authorization evaluation receives only bounded, security-relevant context.

Conceptually:

```text
AuthorizationContext {
  principal
  resource
  action
  recipient_binding?
  workflow_state?
  request_security_context?
}
```

`request_security_context` may later include security properties such as authenticated session strength, trusted service provenance, or anti-replay result, but must not become an untyped bag of ambient request data.

Required invariants:

1. authorization input is explicit and inspectable;
2. policy cannot silently depend on arbitrary UI state, hidden globals, network origin assumptions, or mutable provider internals;
3. sensitive document contents are not authorization context by default;
4. recipient authentication evidence may contribute to context only through a bounded reference/result, never as automatic permission;
5. runtime/provider availability is not an authorization fact.

### Decision

Authorization produces exactly one domain decision:

```text
AuthorizationDecision {
  effect: ALLOW | DENY
  reason_code
}
```

Required invariants:

1. unknown, missing, malformed, or cross-tenant authority resolves to `DENY` unless a later canonical policy explicitly permits the exact case;
2. `ALLOW` requires an affirmative policy basis;
3. transient provider/runtime failures cannot be converted to `ALLOW`;
4. human-readable explanation is optional presentation and is not the machine contract;
5. `reason_code` must be stable and non-sensitive;
6. policy internals, secret identifiers, foreign resource existence, recipient contact data, document contents, or provider secrets must not be embedded in `reason_code`.

Minimum stable reason vocabulary:

```text
AUTHORIZED
AUTHENTICATION_REQUIRED
AUTHENTICATION_INSUFFICIENT
TENANT_SCOPE_MISMATCH
ACTION_NOT_PERMITTED
RESOURCE_RELATIONSHIP_NOT_PERMITTED
RECIPIENT_ACTION_NOT_PERMITTED
RESOURCE_STATE_NOT_PERMITTED
POLICY_CONTEXT_INVALID
POLICY_UNAVAILABLE
```

`AUTHORIZED` is valid only with `ALLOW`; all other minimum reasons map to `DENY`.

`POLICY_UNAVAILABLE` is deny/fail-closed and must not be reported as permission.

### Recipient-specific permissions

Recipient participation is relationship-specific.

Required invariants:

1. successful recipient authentication does not authorize arbitrary envelope/document access;
2. the principal must be bound to the exact recipient participation slot or another explicitly authorized relationship;
3. recipient action must be valid for the exact envelope/workflow state from 003C;
4. a recipient cannot act as another recipient solely by possessing the same contact address, device, browser session, or provider identity;
5. field access/action is constrained by the exact field assignment and recipient relationship defined by 003C;
6. recipient authority does not imply tenant administration authority;
7. tenant administration authority does not silently impersonate recipient evidence or signing intent.

## Existence-leakage contract

Authorization and resource discovery must support intentionally undisclosed outcomes.

Required invariants:

1. callers lacking disclosure authority must not be able to distinguish `resource does not exist` from `resource exists but is forbidden` through stable machine behavior where that distinction would leak protected existence;
2. latency, error class, reason detail, event emission, and audit payload must not intentionally expose protected existence;
3. privileged/internal diagnostics may preserve the true reason only inside an explicitly authorized audit/security boundary;
4. external machine contracts use the stable error class defined below rather than embedding policy internals.

003D does not mandate one universal concealment policy for every resource. It freezes the capability to represent `NOT_FOUND_OR_UNDISCLOSED` without lying internally or leaking externally.

## Command/request contract

A command/request expresses attempted intent. It is not evidence that the action occurred.

Conceptually:

```text
CommandRequest {
  command_type
  command_version
  request_id
  idempotency_key?
  principal_ref
  resource_ref
  requested_at
  payload_ref_or_minimized_payload
}
```

Required invariants:

1. command receipt does not imply authorization or success;
2. command payloads minimize sensitive document/recipient content;
3. commands bind exact resource identities;
4. revision-sensitive commands bind exact revision identity;
5. retries use explicit idempotency semantics where the operation is retryable;
6. a command is never replayed as a domain event merely because it was accepted by a transport.

## Event taxonomy

The following classes are semantically distinct:

```text
COMMAND_REQUEST
DOMAIN_EVENT
PROVIDER_RUNTIME_EVENT
AUDIT_EVIDENCE_EVENT
```

### Domain event

A `DOMAIN_EVENT` states that a canonical domain transition or fact occurred.

Examples:

```text
ENVELOPE_READY
ENVELOPE_STARTED
ENVELOPE_COMPLETED
RECIPIENT_COMPLETED
FIELD_COMPLETED
ENVELOPE_CANCELLED
ENVELOPE_DECLINED
ENVELOPE_VOIDED
ENVELOPE_EXPIRED
```

Rules:

1. domain events reflect canonical domain facts after applicable authorization and invariant checks;
2. a provider callback is not automatically a domain event;
3. a command/request is not a domain event;
4. domain events must not claim cryptographic/legal validity absent separately qualified evidence;
5. domain events bind exact resource identities and relevant exact revision identities.

### Provider/runtime event

A `PROVIDER_RUNTIME_EVENT` describes execution or integration behavior, not canonical domain truth by itself.

Examples:

```text
DELIVERY_PROVIDER_ACCEPTED
DELIVERY_PROVIDER_REJECTED
PROVIDER_TIMEOUT
PROVIDER_CAPABILITY_UNAVAILABLE
CALLBACK_RECEIVED
RUNTIME_RETRY_SCHEDULED
```

Rules:

1. provider/runtime events may be inputs to later domain transitions but do not automatically cause them;
2. provider identifiers remain adapter/runtime metadata, not canonical resource identity;
3. untrusted provider callbacks require validation before influencing domain state;
4. provider/runtime errors preserve unsupported/unavailable/failed distinctions.

### Audit/evidence event

An `AUDIT_EVIDENCE_EVENT` records security/evidence-relevant observation without becoming the domain object itself.

Examples:

```text
AUTHORIZATION_DECISION_RECORDED
AUTHENTICATION_EVIDENCE_REFERENCED
VERIFICATION_RESULT_RECORDED
SIGNING_EVIDENCE_RECORDED
SECURITY_RELEVANT_FAILURE_RECORDED
```

Rules:

1. audit/evidence events must be append-oriented in later implementation unless a future canonical retention contract says otherwise;
2. evidence events reference exact subject/resource/revision identity where relevant;
3. audit presence does not make an action authorized or valid;
4. evidence records distinguish observed fact from interpretation/verification result;
5. sensitive content minimization remains mandatory.

## Event envelope contract

Conceptually:

```text
EventEnvelope {
  event_id
  event_class
  event_type
  event_version
  occurred_at
  recorded_at
  tenant_scope
  resource_ref?
  revision_id?
  actor_ref?
  correlation_id?
  causation_id?
  idempotency_key?
  payload
}
```

### Identity and versioning

Required invariants:

1. `event_id` is globally unique within the event identity domain;
2. `event_type` has stable machine identity;
3. `event_version` is explicit and changes when machine interpretation becomes incompatible;
4. localized display strings never define event identity;
5. schema evolution must preserve the ability to reject unsupported versions explicitly;
6. unknown event types/versions are not silently interpreted as a known success event.

### Exact binding

Required invariants:

1. events concerning document bytes bind exact `DocumentRevisionId`;
2. envelope events bind exact `EnvelopeId`;
3. recipient/field events bind their exact identifiers and envelope relationship where required;
4. aliases such as `latest` cannot replace exact identity in evidence-sensitive events;
5. correlation or provider identifiers cannot substitute for canonical resource identity.

### Time representation

Canonical event timestamps are RFC 3339-compatible UTC instants with explicit timezone/offset representation at the serialization boundary.

Semantic distinction:

- `occurred_at`: when the represented fact is asserted to have occurred;
- `recorded_at`: when Signthos recorded the event.

Rules:

1. these fields are distinct when delayed ingestion is possible;
2. missing/unknown occurrence time must not be fabricated from record time;
3. ordering must not rely solely on wall-clock timestamps when causal/version identity is available;
4. provider timestamps remain untrusted input until normalized/validated by later implementation.

### Sensitive-data minimization

Events and authorization records must exclude raw document bytes and unnecessary sensitive content by default.

Prohibited by default:

- document bytes;
- signing private keys or secrets;
- authentication secrets/tokens;
- full provider credentials;
- unnecessary recipient contact content;
- arbitrary request bodies;
- arbitrary provider payloads;
- authorization policy internals that expose hidden resource relationships.

Allowed payload data should be identifiers, stable classifications, bounded reason/result codes, non-sensitive metadata, and explicit references to separately governed evidence where required.

### Replay and idempotency

Required invariants:

1. duplicate delivery of an event does not create a second canonical domain transition merely because the transport redelivered it;
2. `event_id` is stable for the same emitted event instance;
3. commands that accept an idempotency key must return/resolve consistently for the same scoped key and semantically identical request;
4. reuse of an idempotency key for a semantically different request is a conflict;
5. provider callback retries are deduplicated through validated provider/event identity or a later canonical adapter rule, not by trusting raw payload equality alone;
6. replay protection must not suppress a distinct legitimate domain event that happens to carry similar content.

## Stable machine-readable error contract

Machine error identity is independent from localized human text, HTTP status, UI copy, logs, or provider-native messages.

Conceptually:

```text
DomainError {
  error_class
  error_code
  retry_class
  safe_detail?
  resource_ref?
  correlation_id?
}
```

### Retry class

Canonical minimum retry classes:

```text
DO_NOT_RETRY
RETRY_SAME_REQUEST
RETRY_AFTER_STATE_REFRESH
RETRY_AFTER_DEPENDENCY_RECOVERY
UNKNOWN_RETRY_UNSAFE
```

Rules:

1. retry classification is explicit;
2. authorization/authentication denials are not automatically retryable;
3. invariant violations are not retried blindly;
4. unknown side-effect outcome is `UNKNOWN_RETRY_UNSAFE` unless a later idempotency contract proves safe retry;
5. provider unavailable may be retryable only according to explicit operation/idempotency semantics.

### Canonical error classes

Minimum stable classes:

```text
INVALID_INPUT
AUTHENTICATION_REQUIRED
AUTHENTICATION_INSUFFICIENT
AUTHORIZATION_DENIED
NOT_FOUND_OR_UNDISCLOSED
CONFLICT
VERSION_MISMATCH
UNSUPPORTED_CAPABILITY
DEPENDENCY_UNAVAILABLE
RESOURCE_LIMIT_EXCEEDED
MALFORMED_OR_UNTRUSTED_DOCUMENT
VERIFICATION_INCOMPLETE
VERIFICATION_UNSUPPORTED
VERIFICATION_UNAVAILABLE
INVARIANT_VIOLATION
INTERNAL_FAILURE
```

#### INVALID_INPUT

Use when caller-controlled input is structurally or semantically invalid before protected existence/state needs to be disclosed.

Default retry: `DO_NOT_RETRY` until input changes.

#### AUTHENTICATION_REQUIRED

Use when the operation requires an authenticated principal and none is established.

Default retry: `DO_NOT_RETRY` until authentication state changes.

#### AUTHENTICATION_INSUFFICIENT

Use when authentication exists but does not satisfy the security level/context required for the requested policy evaluation.

Default retry: `DO_NOT_RETRY` until authentication context changes.

#### AUTHORIZATION_DENIED

Use when disclosure of denial is safe and policy denies the action.

Default retry: `DO_NOT_RETRY` until authority/resource relationship changes.

#### NOT_FOUND_OR_UNDISCLOSED

Use when the external contract intentionally does not distinguish absence from forbidden existence.

Default retry: `DO_NOT_RETRY` unless caller obtains new authority or resource identity.

#### CONFLICT

Use for a request incompatible with current canonical resource state, including idempotency-key semantic conflict.

Default retry: `RETRY_AFTER_STATE_REFRESH` when state refresh can resolve it.

#### VERSION_MISMATCH

Use for stale expected-version/revision preconditions.

Default retry: `RETRY_AFTER_STATE_REFRESH`.

#### UNSUPPORTED_CAPABILITY

Use when the selected contract/provider/platform does not support the requested capability.

It is not equivalent to temporary outage.

Default retry: `DO_NOT_RETRY` unless capability/provider selection changes.

#### DEPENDENCY_UNAVAILABLE

Use for a temporarily unavailable required dependency/provider/service where the requested capability is otherwise supported.

Default retry: `RETRY_AFTER_DEPENDENCY_RECOVERY` only when operation/idempotency semantics permit.

#### RESOURCE_LIMIT_EXCEEDED

Use when bounded size/time/concurrency/resource policy rejects processing.

Default retry: `DO_NOT_RETRY` until request/resource shape or authorized limit changes.

#### MALFORMED_OR_UNTRUSTED_DOCUMENT

Use when untrusted document parsing/validation cannot safely continue.

Default retry: `DO_NOT_RETRY` until the document/input changes.

This class must not be collapsed into generic internal failure merely to hide parser safety boundaries.

#### VERIFICATION_INCOMPLETE

Use when verification ran but available evidence is insufficient for a complete result.

It is not success and not equivalent to invalidity.

Default retry depends on whether new evidence can become available; absent such evidence, `DO_NOT_RETRY`.

#### VERIFICATION_UNSUPPORTED

Use when the verifier cannot evaluate the artifact/algorithm/evidence class.

It is not success and not invalidity.

Default retry: `DO_NOT_RETRY` unless verifier capability changes.

#### VERIFICATION_UNAVAILABLE

Use when verification capability is expected but temporarily unavailable.

It is not success.

Default retry: `RETRY_AFTER_DEPENDENCY_RECOVERY` only if safe.

#### INVARIANT_VIOLATION

Use when an internal/domain invariant would be broken by continuing.

Default retry: `DO_NOT_RETRY`.

This class is fail-closed and should trigger bounded diagnostics/audit in later implementation.

#### INTERNAL_FAILURE

Use only for unexpected internal failures not safely classifiable above.

Default retry: `UNKNOWN_RETRY_UNSAFE` unless the exact operation is proven idempotent/no-side-effect.

### Stable code semantics

`error_code` refines `error_class` without becoming free text.

Rules:

1. machine clients must branch on documented stable class/code values, never parse human messages;
2. changing punctuation, localization, or user-facing copy does not change machine identity;
3. provider-native codes may be recorded in bounded diagnostics but do not replace canonical error identity;
4. new codes may be added compatibly when existing semantics remain valid;
5. removing/reinterpreting a code requires an explicit contract/version transition;
6. safe detail must not disclose protected resource existence, policy internals, credentials, document contents, or unnecessary recipient data.

## Authorization/event/error interaction rules

1. authorization denial does not emit a domain-success event.
2. a denied command may emit a bounded audit/security event if later retention/privacy policy authorizes it.
3. provider acceptance does not imply domain completion.
4. transport success does not imply domain success.
5. domain transition success may still be followed by provider delivery failure without rewriting the canonical transition fact.
6. exact error class must represent the failing semantic layer where possible.
7. a provider-native failure is translated through a later 003E adapter; provider text is not exposed as canonical machine identity.
8. unknown side-effect outcome must not be reported as failure-safe-to-retry unless idempotency evidence exists.
9. verification unsupported/incomplete/unavailable remain distinct and never become success.
10. authorization policy unavailable is deny/fail-closed, not service-granted permission.

## Adversarial contract cases

### Cross-tenant enumeration

Given a principal in tenant A requests a resource belonging to tenant B and lacks disclosure authority:

- authorization effect is deny;
- external machine result may be `NOT_FOUND_OR_UNDISCLOSED`;
- no event/error payload leaks tenant B identity or protected resource existence;
- no domain-success event is emitted.

### Authentication confused with authorization

Given a recipient successfully proves control of an authentication factor but is not bound to the requested recipient/resource action:

- authentication evidence may be valid;
- authorization remains denied;
- no field/envelope action occurs;
- machine output is a stable authorization error, not authentication success promoted to resource permission.

### Shared contact address

Given two recipient slots share the same email/phone/provider subject representation:

- authentication/contact equality alone cannot select either resource authorization relationship;
- the exact recipient binding must be established independently;
- acting on the wrong recipient slot is denied.

### Stale revision action

Given a request targets an outdated revision where exact current state requires another revision:

- the system does not silently retarget `latest`;
- a stable `VERSION_MISMATCH` or `CONFLICT` result is returned according to the precondition semantics;
- no success event claims action against the newer revision.

### Duplicate command

Given the same scoped idempotency key and semantically identical request is retried:

- later implementation must resolve it consistently without creating duplicate canonical transitions;
- if the same key is reused with semantically different intent, return `CONFLICT`.

### Provider callback replay

Given an identical provider callback is delivered repeatedly:

- callback receipt remains provider/runtime evidence;
- deduplication prevents duplicate canonical domain transition;
- provider callback content alone cannot bypass authorization/invariant validation.

### Provider success/domain failure

Given a delivery provider reports acceptance but the requested domain transition is invalid:

- provider acceptance remains a provider/runtime event only;
- no domain-success event is fabricated;
- canonical machine error reflects the domain failure.

### Sensitive content in event payload

Given a raw provider/request payload contains document bytes, access tokens, or unnecessary recipient data:

- the canonical event payload excludes those values by default;
- bounded references/classifications are recorded instead;
- diagnostic capture requires a separately governed secure boundary.

### Human-message parser

Given a human-facing error message changes language or wording:

- client machine behavior remains unchanged because it consumes stable `error_class`/`error_code`;
- no supported client contract depends on parsing text.

### Unknown side-effect failure

Given a remote/runtime operation times out after dispatch and it is unknown whether side effects occurred:

- result is not declared safely retryable by assumption;
- retry class is `UNKNOWN_RETRY_UNSAFE` absent an exact idempotency guarantee;
- no duplicate action is intentionally triggered merely to obtain certainty.

## Security and privacy invariants

- authentication is not authorization;
- cross-tenant access is deny-by-default;
- disclosure policy prevents protected existence leakage;
- UI gating is not sufficient authorization;
- system/service principals have no ambient wildcard authority;
- authorization context is bounded and explicit;
- sensitive content is excluded from events/errors by default;
- secrets/tokens/keys are never canonical event payloads;
- untrusted provider callbacks are not domain truth without validation;
- unknown event versions fail explicitly rather than being coerced to known success semantics;
- stable machine errors do not expose policy internals;
- verification uncertainty/unsupported/unavailable states cannot become success;
- unknown side-effect outcomes are not blindly retried;
- later implementations must preserve audit integrity without turning audit records into authorization proof.

## Deterministic acceptance criteria

This 003D qualification is acceptable only if the exact candidate proves all of the following:

1. change surface is Signthos-authored planning/contract material under `specs/003-signthos-domain-boundary/**` only;
2. upstream-derived source bytes added are zero;
3. source-import/provenance/NOTICE/product/runtime/package/dependency/config/workflow/database changes are zero;
4. `Principal`, tenant scope, exact `ResourceRef`, action vocabulary, bounded context, and explicit allow/deny decisions are defined;
5. cross-tenant behavior is deny-by-default and existence leakage has an explicit non-disclosing representation;
6. recipient authentication is explicitly separated from resource authorization;
7. command/request, domain event, provider/runtime event, and audit/evidence event are distinct classes;
8. event identity/versioning/exact resource and revision binding/timestamp semantics are explicit;
9. event and authorization records minimize sensitive data by contract;
10. replay/idempotency rules prevent duplicate canonical transitions without suppressing distinct legitimate events;
11. stable machine-readable error classes distinguish invalid input, authn, authz, undisclosed/not-found, conflicts, unsupported, unavailable, limits, malformed input, verification states, and invariant failures;
12. machine semantics never depend on human text parsing;
13. retry classes distinguish safe retry, state refresh, dependency recovery, and unknown-side-effect unsafe retry;
14. no provider-specific code or persistence representation becomes canonical domain semantics;
15. 003D creates no implementation, provider/network, dependency, migration, source-import, 003E, or Specification 004 authority;
16. exact-head workflow/check accounting is truthful;
17. an independent substantive reviewer evaluates the complete exact head;
18. every material finding is repaired forward-only and the amended head is re-reviewed where required;
19. unresolved material review threads are zero;
20. premerge proof records exact base/head/tree/surface/check/review state;
21. merge uses exact `expected_head_sha` without squash/rebase/force/admin bypass;
22. post-merge verification proves ordered ancestry, signature, exact bounded surface/tree, and live successor authority.

## Qualification result candidate

If and only if this exact artifact is independently substantively reviewed, exact-head qualified, guarded-merged, post-merge verified, and the live post-merge reread does not narrow authority, the intended result is:

```text
003D_AUTHORIZATION_EVENT_STABLE_ERROR_CONTRACT_QUALIFICATION = CLOSED_CANONICAL
003D_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
NEXT_CANDIDATE_UNIT = 003E_PROVIDER_CAPABILITY_CONTRACT_QUALIFICATION
003E_SUCCESSOR_AUTHORITY = REQUIRES_POST_MERGE_DERIVATION
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

This candidate result does not itself authorize 003E. The post-merge canonical reread controls.
