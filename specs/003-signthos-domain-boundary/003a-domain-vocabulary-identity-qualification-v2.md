# Specification 003A — Domain Vocabulary and Identity Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_CONTRACT_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `b9ad2e93556136f4df95b56b39ea231d75d64453`
Owning specification: `003-signthos-domain-boundary`

## Canonical authority

Specification 003 Stage P is now `CLOSED_CANONICAL` only after both:

- Stage P shaping PR #86 / merge `d822f3c3ab3bc773efc587ce61f7fc96344098f6`; and
- mandatory Stage P closeout PR #88 / merge `b9ad2e93556136f4df95b56b39ea231d75d64453`.

Issue #6 post-closeout frontier authorizes exactly:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 003A_DOMAIN_VOCABULARY_AND_IDENTITY_QUALIFICATION
003A_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
003A_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact is freshly derived from that post-#88 canonical state. It does not reuse PR #87 branch, head, review, check, or qualification evidence.

## Purpose

Freeze the minimum implementation-independent Signthos vocabulary and identity invariants that later 003 grains may safely depend on.

The result must make these concepts unambiguous before any language-specific types, persistence APIs, migrations, PDF/signing behavior, provider runtime, public API, or Specification 004 implementation can be authorized.

## Allowed change surface

This qualification may add only Signthos-authored planning/contract material under:

`specs/003-signthos-domain-boundary/**`

It authorizes no source import, dependency acquisition, package or lockfile mutation, generated schema, TypeScript/Rust/SQL/Prisma implementation, database migration, PDF/signing execution, authentication-provider implementation, provider/network execution, credentials, deployment, broad rebrand, or Specification 004 work.

## Evidence class

Every contract below is `SIGNTHOS_OWNED_DESIRED_CONTRACT` unless explicitly identified as canonical predecessor fact.

No contract term below is evidence that equivalent Documenso application behavior was imported. The canonical Documenso source surface remains limited to `.npmrc` and `packages/prisma/schema.prisma`; excluded or unselected 002C–002H application behavior is not inherited by implication.

## Identity model

### Opaque entity identifiers

First-class domain entities use stable opaque identifiers whose semantics do not depend on mutable labels, filenames, tenant names, emails, provider IDs, timestamps, or authorization decisions.

Qualified identifier roles:

```text
DocumentId
DocumentRevisionId
EnvelopeId
RecipientId
FieldId
EvidenceBundleId
WorkflowId
```

Rules:

1. identifiers are scoped by entity kind;
2. equal external/provider identifiers do not collapse Signthos entities;
3. presentation labels are never canonical identity;
4. an identifier does not encode authorization or tenancy policy;
5. concrete UUID/ULID/other encoding remains deferred.

### Exact-content identity

Exact bytes are represented separately from entity identity by an algorithm-tagged digest value:

```text
ContentDigest {
  algorithm
  value
}
```

Rules:

1. digest identity means exact-byte identity, not visual equivalence;
2. comparison requires both algorithm and value;
3. a digest does not replace `DocumentRevisionId`;
4. equal bytes may exist in distinct documents or revisions without collapsing domain identity;
5. normalization, conversion, rendering, redaction, metadata rewriting, or provider output that changes bytes produces a different exact-content identity;
6. concrete digest algorithms and rotation policy remain deferred to a separately owning authorization.

## Canonical entity semantics

### Document

`Document` is the durable logical identity for a user's evolving document lineage.

It owns:

- `DocumentId`;
- document-lineage membership;
- logical metadata that does not redefine immutable revision bytes;
- an optional explicit current/working revision reference.

It does not own:

- envelope routing state;
- recipient authentication evidence;
- field completion state;
- signing evidence;
- mutable replacement of bytes inside an existing revision.

Invariant:

```text
DocumentId != DocumentRevisionId != ContentDigest != EnvelopeId
```

### DocumentRevision

`DocumentRevision` is an immutable record for one exact content state in a `Document` lineage.

Minimum semantic shape:

```text
DocumentRevision {
  document_revision_id
  document_id
  content_digest
  parent_revision_id?
  origin
  revision_reason
}
```

Required invariants:

1. a revision belongs to exactly one `Document`;
2. canonical revision bytes are immutable;
3. a content-changing operation creates a new revision;
4. `parent_revision_id`, when present, references the same document lineage unless a later canonical contract explicitly defines a bounded fork/import relation;
5. exact byte equality does not imply revision identity equality;
6. an envelope may reference a revision but does not acquire ownership of its content.

### Envelope

`Envelope` is the bounded routing, participant, intent, and workflow state for a signing or approval process.

Minimum semantic shape:

```text
Envelope {
  envelope_id
  document_revision_id
  workflow_id?
  routing_state
}
```

Required invariants:

1. an envelope binds to an exact revision identity at any signing/evidence-sensitive boundary;
2. envelope state never mutates bound revision bytes;
3. changing signable/input bytes requires a new revision and an explicit later-authorized transition;
4. aliases such as `latest_revision` must never silently retarget an existing envelope;
5. cancellation, expiry, completion, or voiding are process state, not content mutation.

### Recipient

`Recipient` is an envelope-scoped participant reference with role and interaction state.

Minimum semantic shape:

```text
Recipient {
  recipient_id
  envelope_id
  role
  state
  principal_binding?
}
```

Required invariants:

1. recipient identity is not authentication proof;
2. email, phone, display name, or provider account ID is not sufficient resource authorization;
3. a recipient belongs to one envelope in the minimum model;
4. authorization remains a separate decision using principal, tenant/resource, action, and bounded context.

### Field

`Field` is an interaction/placement requirement bound to envelope and exact revision context.

Minimum semantic shape:

```text
Field {
  field_id
  envelope_id
  document_revision_id
  recipient_id?
  field_kind
  placement
  completion_state
}
```

Required invariants:

1. placement is meaningful only against an exact revision/page context;
2. a field cannot silently follow a later revision;
3. optional recipient binding must reference a recipient in the same envelope;
4. field completion state does not redefine document bytes;
5. provider-local field identifiers are adapter mappings, not canonical identity.

Coordinate representation and page-index convention remain deferred.

### EvidenceBundle

`EvidenceBundle` is a stable evidence aggregate that binds evidence items to exact domain subjects without promoting uncertainty into validity.

Minimum semantic shape:

```text
EvidenceBundle {
  evidence_bundle_id
  subject_refs
  evidence_items
  integrity_metadata
}
```

Required invariants:

1. content-specific evidence binds to exact revision identity;
2. verification states preserve at least valid, invalid, incomplete, unsupported, and unavailable where applicable;
3. timestamps/provider claims/audit events do not by themselves establish legal effect;
4. sensitive content is minimized by default;
5. mutation policy must preserve prior canonical evidence rather than silently rewriting it.

Cryptographic formats, certificate policy, PAdES level, QES/AdES claims, and legal-effect policy are explicitly outside 003A.

### Workflow

`Workflow` is a reusable or envelope-associated transition policy. It does not own document bytes.

Minimum semantic shape:

```text
Workflow {
  workflow_id
  transition_policy
}
```

Required invariants:

1. workflow policy cannot mutate revision bytes in place;
2. provider/runtime job state must not become hidden domain semantics;
3. workflow identity is distinct from a specific envelope execution;
4. runtime execution remains unauthorized until separately granted.

## Aliases and classifications

The following are aliases/classifications, not new immutable identities unless a later canonical contract explicitly introduces a separate entity:

```text
current_revision
working_revision
signable_revision
signed_revision
latest_revision
```

Rules:

1. an alias resolves to an exact `DocumentRevisionId` before any irreversible or signing-sensitive binding;
2. once an envelope/evidence record is bound, later alias movement cannot silently retarget it;
3. `signed_revision` means a revision participates in signed evidence, not permission to replace its bytes;
4. `signable_revision` is a qualification state only and does not imply signatures, legal validity, or provider support exist.

## Revision origin vocabulary

Minimum origin categories:

```text
IMPORTED
CREATED
EDITED
CONVERTED
PROVIDER_OUTPUT
RESTORED
OTHER_EXPLICIT
```

Semantics:

- `IMPORTED`: exact bytes entered the lineage from an external/user-supplied artifact;
- `CREATED`: initial bytes were created by a future authorized Signthos creation path;
- `EDITED`: content bytes changed through an authorized content-changing operation;
- `CONVERTED`: bytes were created through explicit format conversion;
- `PROVIDER_OUTPUT`: provider-produced changed bytes became a new revision;
- `RESTORED`: historical bytes were deliberately restored into a new/current lineage position without rewriting history;
- `OTHER_EXPLICIT`: a later stable machine-readable reason is recorded rather than silently coercing an unknown origin.

These labels authorize no runtime behavior.

## Revision reason vocabulary

Minimum categories:

```text
INITIAL_INGEST
USER_EDIT
FORMAT_CONVERSION
PROVIDER_CONTENT_CHANGE
METADATA_BYTE_CHANGE
RESTORE
OTHER_EXPLICIT
```

A metadata operation that changes exact bytes is content-changing for revision identity even when rendered appearance is unchanged.

## Relationship constraints

Minimum ownership graph:

```text
Document
  1 -> many DocumentRevision

Envelope
  1 -> exactly 1 bound DocumentRevision
  1 -> many Recipient
  1 -> many Field
  0..1 -> Workflow reference

Field
  -> exactly 1 Envelope
  -> exactly 1 DocumentRevision matching the envelope-bound revision unless a later canonical contract explicitly defines a safe exception
  -> 0..1 Recipient within the same Envelope

EvidenceBundle
  -> one or more explicit subject references
```

Later grains may refine cardinality but must not collapse document-content ownership into routing state.

## Tenant and resource identity constraints

003A does not own the full authorization model; 003D remains the planned owner. Identity semantics must nevertheless support authorization safely:

1. each protected resource is addressable by opaque resource identity;
2. tenant scope is representable independently from human labels;
3. cross-tenant identifier collision does not imply shared authority;
4. provider/external identifiers are adapter mappings by default;
5. authentication identity does not replace resource ownership/authorization context.

## Deterministic contract examples

### Example A — edit creates a new revision

Given:

```text
Document D1
Revision R1 -> digest alg:A
```

If an authorized edit changes bytes to B:

```text
Document D1
Revision R1 -> digest alg:A
Revision R2 -> digest alg:B, parent=R1, reason=USER_EDIT
```

Mutating R1 to point at B is invalid.

### Example B — equal bytes do not collapse domain identity

Two distinct documents may each contain a revision with the same exact `ContentDigest`. Their `DocumentId` and `DocumentRevisionId` values remain distinct.

### Example C — envelope binding is exact

If Envelope E1 binds to R2 and D1 later changes its `current_revision` alias to R3, E1 remains bound to R2 unless a later owning contract explicitly authorizes and records a transition.

### Example D — conversion is explicit

A non-PDF input converted to PDF produces a new revision with conversion origin/reason. The imported revision remains immutable. This example authorizes no converter and makes no PDF-validity claim.

## Required negative cases

Any later implementation/schema derived from this qualification must reject or make impossible:

1. replacing bytes for an existing `DocumentRevisionId`;
2. treating `DocumentId` as exact signing-input identity;
3. silently retargeting an envelope when a mutable revision alias moves;
4. binding a field to a conflicting revision without an explicitly authorized exception;
5. treating recipient contact data or authentication proof as sufficient resource authorization;
6. treating visual equivalence as exact-content equality;
7. omitting the digest algorithm tag;
8. treating provider-local IDs as canonical Signthos IDs without adapter mapping;
9. converting verification `unsupported`, `incomplete`, or `unavailable` into success;
10. using origin/reason labels as evidence of runtime capability.

## Deferred decisions

003A intentionally does not choose:

- programming language/type representation;
- UUID/ULID/other identifier encoding;
- digest algorithm set or rotation policy;
- timestamp and clock representation;
- field coordinate/page-index representation;
- full envelope lifecycle matrix;
- complete recipient role/state enumerations;
- authorization action/reason taxonomy;
- evidence serialization or cryptographic format;
- provider wire contracts;
- persistence mapping or migration strategy;
- public API/JSON/OpenAPI representation.

Deferral is explicit and is not permission to make these choices implicitly during implementation.

## Acceptance criteria

003A may become canonical only if exact-head independent substantive review confirms all of the following:

1. every first-class entity has distinct semantic ownership;
2. `Document`, `DocumentRevision`, `ContentDigest`, and `Envelope` identities remain distinct;
3. revision immutability is explicit without prematurely choosing implementation mechanics;
4. envelope and field bindings cannot silently follow mutable aliases;
5. conversion/provider content changes require new-revision semantics at contract level;
6. authentication/contact identity remains distinct from resource authorization;
7. provider/platform identifiers cannot fork canonical domain identity;
8. verification uncertainty remains fail-closed;
9. deferred decisions prevent accidental implementation-by-assumption;
10. the exact diff remains planning-only under `specs/003-signthos-domain-boundary/**` with zero upstream-derived source bytes and zero implementation/provenance/dependency/runtime mutation.

## Qualification workflow

This candidate requires:

1. exact current canonical base/head verification;
2. exact planning-only changed-surface verification;
3. truthful GitHub Actions/check/provider accounting;
4. fresh independent substantive exact-head review;
5. forward-only repair of every material finding, with fresh re-review after any head change;
6. zero unresolved material review threads;
7. final ruleset/branch-protection/mergeability race check;
8. mandatory premerge proof;
9. guarded merge using exact `expected_head_sha`;
10. post-merge verification of ordered parents, tree equality/bounded delta, signature, exact surface, and workflow/status truth;
11. live canonical successor derivation.

## Candidate successor

003B is not pre-authorized merely by numbering.

If and only if this exact 003A candidate becomes canonical and the live post-merge reread confirms the dependency frontier, the next candidate may be:

```text
003B_REVISION_AND_IMMUTABLE_SIGNING_INPUT_CONTRACT_QUALIFICATION
```

Any such successor remains planning/contract qualification only unless separately authorized.

Candidate state before merge:

```text
003A_STATUS = QUALIFICATION_CANDIDATE
003A_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```
