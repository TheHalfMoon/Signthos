# Specification 003C — Envelope, Recipient, Field, and Workflow Contract Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_CONTRACT_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `342e08a1ffc7634242c8411d1e4055fa5e8af227`
Owning specification: `003-signthos-domain-boundary`

## Canonical authority

Specification 003A and 003B are canonical predecessors.

The post-003B successor reread in Issue #6 authorizes exactly:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 003C_ENVELOPE_RECIPIENT_FIELD_WORKFLOW_CONTRACT_QUALIFICATION
003C_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
003C_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
003D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact exercises only that bounded planning/contract authority.

## Purpose

Freeze the minimum implementation-independent routing and interaction contracts that sit above immutable document revisions.

003C defines:

- envelope lifecycle vocabulary and exact revision-set binding;
- recipient participation slots, roles, routing states, and authentication-evidence separation;
- field ownership, placement, and completion semantics;
- workflow transition rules;
- cancellation, decline, void, and expiry semantics;
- idempotency expectations for repeated transition requests.

003C does not implement any of those contracts.

## Allowed change surface

This qualification may add only Signthos-authored planning/contract material under:

`specs/003-signthos-domain-boundary/**`

It authorizes none of:

- source import or provenance expansion;
- package or lockfile mutation;
- dependency acquisition;
- TypeScript, Rust, SQL, Prisma, JSON Schema, OpenAPI, generated code, or runtime types;
- database migration or persistence mapping;
- PDF parsing, rendering, coordinate conversion, signing, verification, or cryptographic execution;
- email or SMS delivery implementation;
- UI workflow implementation;
- public API or webhook transport;
- authentication-provider implementation;
- resource-authorization implementation;
- provider/runtime/network/credential execution;
- deployment;
- Specification 004 work.

## Evidence class

Every new rule below is `SIGNTHOS_OWNED_DESIRED_CONTRACT` derived from canonical Stage P, 003A, and 003B contracts.

No rule below claims that equivalent Documenso application behavior was imported. The canonical imported Documenso source surface remains limited to `.npmrc` and `packages/prisma/schema.prisma`.

## Predecessor contracts consumed without reopening

003C consumes these canonical predecessor facts:

1. `DocumentId`, `DocumentRevisionId`, `EnvelopeId`, `RecipientId`, `FieldId`, and `WorkflowId` are distinct identity roles.
2. canonical revision bytes are immutable.
3. a content-changing operation creates a new revision.
4. signing/evidence-sensitive references bind exact `DocumentRevisionId` values, not mutable aliases.
5. alias movement cannot silently retarget an established exact binding.
6. a content-changing provider/output path cannot overwrite the bound revision.
7. stale revision writes cannot silently target a newer revision.
8. authentication/contact/provider identity is not resource authorization.
9. cryptographic validity, trust, and legal effect remain outside 003C.

003C owns lifecycle/cardinality/placement semantics that 003A deliberately deferred, while preserving 003D authorization/event/error ownership and later PDF/signing ownership.

## Envelope revision-set contract

An envelope governs an ordered set of one or more exact document revisions once it becomes ready for participant interaction.

Conceptually:

```text
EnvelopeRevisionBinding {
  envelope_id
  ordered_revision_ids[]
}
```

Required invariants:

1. every bound value is an exact `DocumentRevisionId`;
2. the ready-state binding contains at least one revision;
3. one envelope may govern one or multiple revisions;
4. each bound revision is listed at most once in the same envelope binding;
5. ordering is explicit and stable after the envelope leaves `DRAFT`;
6. `DocumentId`, `latest_revision`, `current_revision`, filenames, URLs, or provider IDs cannot substitute for exact revision identity;
7. every content-sensitive field must reference a revision contained in the same envelope binding;
8. envelope state never owns or mutates revision bytes.

### Draft mutability and sealing

While the envelope is `DRAFT`, its proposed revision set may be replaced explicitly.

The transition from `DRAFT` to `READY` seals the exact ordered revision set for that envelope execution.

After `READY`:

- bound revision IDs cannot be added, removed, reordered, or silently substituted;
- creating a newer document revision does not alter the envelope;
- alias movement does not alter the envelope;
- changed content requires a new revision and a separately authorized new envelope/restart path rather than hidden rebinding.

003C does not create an in-place post-`READY` rebinding mechanism.

## Envelope lifecycle vocabulary

Canonical 003C envelope states are:

```text
DRAFT
READY
IN_PROGRESS
COMPLETED
CANCELLED
DECLINED
VOIDED
EXPIRED
```

### State semantics

`DRAFT`

- configuration is not yet sealed;
- revision set, recipient participation slots, field assignments, and workflow selection may still change under later implementation;
- no participant action is considered active.

`READY`

- the exact revision set and interaction contract are sealed;
- all readiness invariants are satisfied;
- participant processing has not yet started.

`IN_PROGRESS`

- participant processing has started;
- exact revision bindings remain sealed;
- recipient/field transitions may proceed under the workflow contract.

`COMPLETED`

- all blocking recipient obligations and required field obligations are satisfied under the 003C workflow contract;
- this state does not itself prove signature validity, cryptographic trust, or legal effect.

`CANCELLED`

- the envelope was explicitly terminated before participant processing became active;
- no further participant action may advance the envelope.

`DECLINED`

- an active blocking recipient explicitly declined its required participation;
- prior exact content/evidence references remain historical and unchanged.

`VOIDED`

- an active envelope was explicitly terminated for an administrative/workflow reason other than recipient decline or expiry;
- voiding does not erase prior actions/evidence and does not by itself establish legal invalidity.

`EXPIRED`

- an applicable workflow deadline ended the active/ready process;
- expiry does not erase prior actions/evidence.

### Allowed envelope transitions

Minimum canonical transition graph:

```text
DRAFT -> READY
DRAFT -> CANCELLED

READY -> IN_PROGRESS
READY -> CANCELLED
READY -> EXPIRED

IN_PROGRESS -> COMPLETED
IN_PROGRESS -> DECLINED
IN_PROGRESS -> VOIDED
IN_PROGRESS -> EXPIRED
```

`COMPLETED`, `CANCELLED`, `DECLINED`, `VOIDED`, and `EXPIRED` are terminal under 003C.

003C defines no transition out of a terminal state and no transition back to `DRAFT` after sealing.

A later specification may define a new envelope/restart operation without mutating this envelope's historical lifecycle.

## Readiness contract

An envelope may transition from `DRAFT` to `READY` only when all of the following hold:

1. the ordered revision binding is non-empty and exact;
2. every content-sensitive field references one of those exact revisions;
3. every required participant-action field has a valid recipient assignment;
4. every field placement satisfies the 003C placement contract;
5. recipient routing steps and roles are internally consistent;
6. the referenced workflow contract is resolvable;
7. no mutable revision alias remains as a signing/evidence-sensitive binding key.

Failure to satisfy readiness remains a domain precondition failure. 003D owns final stable machine-readable error classes.

## Recipient participation-slot contract

A 003C `Recipient` is an envelope-scoped participation slot, not a global person identity.

A single real-world person may occupy multiple participation slots when distinct role/routing semantics are required. Reusing an email, phone number, display name, external account, or authentication principal does not collapse two `RecipientId` values.

Minimum semantic shape:

```text
RecipientParticipation {
  recipient_id
  envelope_id
  role
  routing_step
  state
  blocking
}
```

Required invariants:

1. a recipient belongs to exactly one envelope;
2. `routing_step` is a non-negative integer;
3. one participation slot has one canonical role;
4. recipient identity is not authentication proof;
5. authentication success is not resource authorization;
6. contact identifiers are attributes/references, not canonical `RecipientId` identity;
7. a recipient cannot satisfy another recipient slot merely because both resolve to the same contact or principal;
8. provider-local recipient IDs are adapter mappings, not canonical identity.

## Recipient role vocabulary

Canonical minimum roles are:

```text
SIGNER
APPROVER
ACKNOWLEDGER
OBSERVER
OTHER_EXPLICIT
```

Role semantics:

- `SIGNER`: owes a signing participation obligation defined by later signing contracts;
- `APPROVER`: owes an explicit approval/decision obligation without implying cryptographic signing;
- `ACKNOWLEDGER`: owes an explicit acknowledgment obligation;
- `OBSERVER`: receives/observes process state but has no blocking completion obligation by default;
- `OTHER_EXPLICIT`: permits a later bounded extension only when its semantics are explicitly declared rather than inferred from provider/UI naming.

A role does not grant authorization. 003D owns principal/resource/action authorization semantics.

## Recipient state vocabulary

Canonical recipient states are:

```text
PENDING
ACTIONABLE
COMPLETED
DECLINED
SKIPPED
```

Rules:

1. `PENDING` means the routing policy has not yet made the slot actionable;
2. `ACTIONABLE` means the workflow permits the slot's required action now; it does not imply delivery succeeded or authentication passed;
3. `COMPLETED` means the slot's required 003C obligation is satisfied under the owning workflow/signing contract;
4. `DECLINED` is an explicit refusal by an actionable blocking slot;
5. `SKIPPED` requires an explicit workflow decision and cannot be inferred from non-delivery, timeout, UI absence, or provider behavior;
6. `COMPLETED`, `DECLINED`, and `SKIPPED` are terminal recipient states within the envelope;
7. recipient-state transitions do not mutate document bytes.

Minimum recipient transitions:

```text
PENDING -> ACTIONABLE
PENDING -> SKIPPED
ACTIONABLE -> COMPLETED
ACTIONABLE -> DECLINED
ACTIONABLE -> SKIPPED
```

A blocking recipient may be `SKIPPED` only when the workflow contract explicitly permits that outcome for that slot.

## Authentication-evidence separation

A recipient action may later reference authentication evidence, but 003C does not define authentication mechanisms or authorization policy.

Required boundaries:

- `RecipientId` is not an authentication principal;
- email/phone possession is not canonical recipient identity;
- an authentication-evidence reference is evidence about an interaction, not a grant of resource access;
- authentication evidence may be required by a later workflow/signing policy before a transition is accepted;
- successful authentication cannot by itself transition or authorize access to an envelope;
- 003D owns principal, tenant/resource/action, allow/deny, and disclosure semantics.

## Routing-step contract

Routing is modeled by ordered non-negative `routing_step` values.

Rules:

1. lower routing steps precede higher routing steps;
2. multiple recipients at the same routing step may be actionable concurrently;
3. a later step cannot become actionable until all blocking slots in earlier steps are `COMPLETED` or explicitly validly `SKIPPED`;
4. non-blocking/observer slots do not prevent progression by default;
5. an actionable blocking recipient that becomes `DECLINED` causes the owning envelope transition to `DECLINED`;
6. routing progression never changes the sealed revision set;
7. delivery-channel timing is not routing truth; email/SMS transport remains out of scope.

## Field contract

A `Field` is an envelope-scoped interaction requirement positioned against an exact revision/page context.

Minimum semantic shape:

```text
FieldContract {
  field_id
  envelope_id
  document_revision_id
  page_index
  placement
  kind
  required
  owner_kind
  recipient_id?
  state
}
```

Required invariants:

1. a field belongs to exactly one envelope;
2. `document_revision_id` is one of that envelope's exact bound revisions;
3. a field never follows a mutable revision alias;
4. `page_index` is zero-based;
5. interactive recipient-owned fields reference a recipient in the same envelope;
6. provider-local field IDs are not canonical field identity;
7. field completion never mutates the bound revision bytes;
8. a later new document revision does not retarget an existing field.

## Field ownership

Canonical owner kinds are:

```text
RECIPIENT
ENVELOPE
```

Rules:

- `RECIPIENT` fields identify exactly one `recipient_id` in the same envelope;
- `ENVELOPE` fields have no participant owner and cannot be used to fabricate participant completion;
- a required participant-action field must be `RECIPIENT` owned before `READY`;
- changing field ownership after `READY` is not authorized by 003C.

## Field kind vocabulary

Canonical minimum semantic kinds are:

```text
SIGNATURE
INITIALS
TEXT
DATE
BOOLEAN
CHOICE
OTHER_EXPLICIT
```

These are domain interaction classes, not UI widgets or PDF implementation formats.

`SIGNATURE` and `INITIALS` do not themselves define cryptographic signature format, legal effect, appearance generation, or provider behavior.

## Field placement coordinate contract

003C uses a transport- and platform-independent normalized page-relative rectangle.

```text
NormalizedPlacement {
  x
  y
  width
  height
}
```

Coordinate semantics:

- origin is the top-left of the canonical presented page box;
- `x`, `y`, `width`, and `height` are finite normalized decimal values;
- `0 <= x <= 1`;
- `0 <= y <= 1`;
- `0 < width <= 1`;
- `0 < height <= 1`;
- `x + width <= 1`;
- `y + height <= 1`.

The placement is meaningful only together with exact `document_revision_id` and zero-based `page_index`.

Specification 004 owns PDF parsing/page-box/rotation/crop mapping needed to translate concrete PDF geometry into or out of this normalized 003C coordinate space. 003C does not authorize that implementation.

## Field completion vocabulary

Canonical field states are:

```text
UNSATISFIED
SATISFIED
INVALIDATED
```

Rules:

1. required fields must be `SATISFIED` for their blocking recipient obligation to complete;
2. optional fields may remain `UNSATISFIED` without blocking completion;
3. `INVALIDATED` cannot count as completion;
4. a recipient may satisfy only fields assigned to its participation slot unless a later explicit workflow contract states otherwise;
5. field-value representation, validation detail, sensitive-data storage, and rendering remain separately owned;
6. a terminal envelope does not silently rewrite field history.

## Workflow identity and envelope execution

`WorkflowId` names a workflow policy/contract and remains distinct from an envelope execution and from provider/runtime job identity.

003C rules:

1. a ready envelope resolves to exactly one workflow policy identity;
2. `WorkflowId` does not own document bytes;
3. provider/runtime job IDs cannot become hidden `WorkflowId` values;
4. workflow policy determines routing-step progression and permitted recipient/envelope transitions;
5. the envelope stores/exposes its own lifecycle state; it is not replaced by a provider workflow state;
6. concrete workflow persistence, code representation, and runtime engine remain unauthorized.

## Envelope completion contract

An `IN_PROGRESS` envelope may become `COMPLETED` only when:

1. every blocking recipient slot is `COMPLETED` or validly `SKIPPED` under the workflow;
2. every required field owned by a blocking recipient is `SATISFIED`;
3. no blocking recipient is `DECLINED`;
4. the envelope has not become `VOIDED` or `EXPIRED`;
5. the exact sealed revision set remains unchanged.

`COMPLETED` means process obligations are complete under 003C. It does not itself prove cryptographic signature validity, evidence sufficiency, trust-chain validity, statutory compliance, or legal enforceability.

## Cancellation, decline, void, and expiry semantics

### Cancellation

`CANCELLED` is an explicit pre-activation termination from `DRAFT` or `READY`.

Cancellation:

- prevents later participant progression;
- preserves all already-created domain history;
- does not delete revisions;
- does not claim legal invalidity.

### Decline

`DECLINED` is an active-process terminal state caused by explicit refusal from an actionable blocking recipient.

Decline:

- preserves prior recipient/field/evidence history;
- cannot be inferred from delivery failure, timeout, or authentication failure;
- does not mutate sealed revisions.

### Void

`VOIDED` is an explicit administrative/workflow termination of an `IN_PROGRESS` envelope for a reason other than recipient decline or expiry.

Voiding:

- preserves prior history and exact revision bindings;
- cannot erase completed participant actions;
- does not itself assert cryptographic or legal invalidity.

### Expiry

`EXPIRED` is a terminal state produced when the workflow's applicable deadline expires from `READY` or `IN_PROGRESS`.

Expiry:

- prevents future progression under that envelope;
- preserves prior actions and exact revision bindings;
- is not equivalent to cancellation or voiding.

Deadline representation, clock source, scheduling implementation, and delivery reminders remain outside 003C.

## Transition request and idempotency contract

Every state-changing envelope/recipient/field operation must have an idempotent semantic request identity.

Conceptually:

```text
TransitionRequest {
  envelope_id
  transition_kind
  subject_id?
  expected_envelope_state?
  idempotency_key
  semantic_fingerprint
}
```

Required idempotency properties:

1. `idempotency_key` is scoped to the owning envelope transition domain;
2. repeating the same key with the same semantic fingerprint returns the same logical outcome and does not duplicate participant actions, field satisfaction, terminal transitions, or later evidence effects;
3. reusing the same key with a different semantic fingerprint is a conflict, not a second operation;
4. a stale `expected_envelope_state`, when supplied, cannot be silently ignored;
5. terminal envelope transitions are not executed twice under retries;
6. idempotency does not authorize a transition that is invalid from the current state;
7. storage TTL, database uniqueness, HTTP headers, SDK behavior, and transport encoding are deferred.

003D owns final event/error representation; 003F owns persistence mechanisms.

## Transition safety under races

When two incompatible transitions race from the same current state, at most one may become canonical for that envelope lifecycle position.

Examples:

- `COMPLETED` versus `EXPIRED`;
- `COMPLETED` versus `VOIDED`;
- `DECLINED` versus `COMPLETED`;
- duplicate recipient completion with conflicting semantic payloads.

003C requires fail-closed conflict/retry behavior rather than last-write-wins lifecycle corruption.

Concrete compare-and-swap, locking, transactions, event ordering, and error codes remain owned by 003D/003F and later implementation grains.

## Derived lifecycle invariants

The following must hold in every later conforming implementation:

```text
ENVELOPE_LIFECYCLE_STATE != DOCUMENT_REVISION_IDENTITY
RECIPIENT_IDENTITY != AUTHENTICATION_PROOF
AUTHENTICATION_PROOF != RESOURCE_AUTHORIZATION
FIELD_PLACEMENT -> EXACT_DOCUMENT_REVISION_ID
READY_OR_LATER -> SEALED_REVISION_SET
TERMINAL_ENVELOPE_STATE -> NO_FURTHER_003C_PROGRESS
```

Provider-local lifecycle states may be mapped by later adapters but cannot redefine canonical 003C meanings.

## Required adversarial cases

### A — Revision alias moves after envelope readiness

Given envelope `E1` is `READY` and sealed to revision `R1`, `latest_revision` later moves to `R2`.

Expected:

- `E1` remains bound to `R1`;
- no field retargets;
- no workflow state changes from alias movement alone.

### B — Content changes after readiness

Given `E1` is `READY` or `IN_PROGRESS` and new bytes create `R2` from bound `R1`.

Expected:

- `E1` remains sealed to `R1`;
- `R2` does not enter `E1` by alias movement or provider substitution;
- any restart/new-envelope behavior requires a separately explicit operation.

### C — Multi-revision envelope

Given an envelope binds ordered revisions `[R1, R2]`.

Expected:

- both identities are exact and stable;
- fields against `R1` cannot silently target `R2`;
- order remains stable after `READY`.

### D — Same contact in two participation slots

Given recipient slots `A` and `B` share the same email/contact but have different `RecipientId` values and roles.

Expected:

- completing `A` does not complete `B`;
- authentication/contact equality does not collapse identities.

### E — Authentication succeeds without authorization

Given authentication evidence exists for recipient `A`.

Expected:

- 003C does not grant resource access from that fact;
- 003D authorization still governs permitted resource actions.

### F — Field references the wrong revision

Given a field in envelope `E1` references a revision not in `E1`'s sealed set.

Expected: readiness or transition fails; no alias fallback is permitted.

### G — Invalid placement

Given a field rectangle extends outside normalized page bounds or has non-positive dimensions.

Expected: the placement is invalid; no renderer-specific clamping silently changes canonical placement semantics.

### H — Parallel routing step

Given two blocking recipients share routing step `1`.

Expected:

- both may become `ACTIONABLE` concurrently;
- step `2` remains pending until both complete or are validly skipped.

### I — Recipient decline

Given blocking recipient `A` is `ACTIONABLE` and explicitly declines.

Expected:

- `A -> DECLINED`;
- envelope -> `DECLINED`;
- prior actions and exact revision bindings remain preserved.

### J — Retry same transition

Given a completion transition is retried with the same idempotency key and semantic fingerprint.

Expected: one logical completion result, not duplicate actions/evidence.

### K — Reuse key with different semantics

Given the same idempotency key is reused with a different semantic fingerprint.

Expected: conflict/fail closed; the second semantic operation is not executed.

### L — Completion races expiry

Given envelope completion and expiry race from `IN_PROGRESS`.

Expected:

- only one compatible terminal transition becomes canonical;
- no state may simultaneously be `COMPLETED` and `EXPIRED`;
- later 003D/003F implementation must preserve this invariant without last-write-wins corruption.

### M — Observer does not block

Given an `OBSERVER` slot is non-blocking and remains `PENDING` while all blocking obligations complete.

Expected: the observer alone does not prevent envelope completion.

### N — Terminal-state replay

Given a `VOIDED`, `CANCELLED`, `DECLINED`, `EXPIRED`, or `COMPLETED` envelope receives a new progression request.

Expected: no further 003C progression occurs; later error taxonomy determines the machine response.

## Explicit deferred ownership

003C deliberately does not define:

- principal, tenant, resource, action, allow/deny, or disclosure policy — 003D;
- final domain-event, audit-event, provider-event, or stable error payloads — 003D;
- browser/native/server/heavy provider capability interfaces — 003E;
- provider local/network/trust/secret policy — 003E;
- Prisma mapping, database transactions, locks, persistence representation, or migrations — 003F;
- broad product naming/config migration — 003G;
- PDF page parsing, concrete page boxes, rotation/crop transforms, or PDF mutation — Specification 004;
- cryptographic signing, signature validation, certificates, timestamps, PAdES/CMS, or legal-effect claims — later signing specifications;
- email/SMS transport, UI flows, public API transport, webhook delivery, or deployment.

## Qualification result candidate

If this exact artifact passes independent substantive exact-head review, zero unresolved material findings, truthful check accounting, guarded expected-head merge, and post-merge verification, then 003C may become canonical planning/contract evidence.

This artifact itself grants no implementation authority.

The next potential dependency-ordered grain after canonical 003C is 003D authorization/event/error contract qualification, but 003D authority must be derived only from fresh post-merge canonical truth.

```text
003C_STATUS = QUALIFICATION_CANDIDATE_ONLY
003C_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
003D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```
