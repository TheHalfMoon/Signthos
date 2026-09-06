# Specification 003A — Domain Vocabulary and Identity Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor: `d822f3c3ab3bc773efc587ce61f7fc96344098f6`
Owning specification: `003-signthos-domain-boundary`

## Purpose

Freeze the minimum Signthos-owned semantic vocabulary and identity invariants required before any language-specific domain implementation, persistence adapter, migration, PDF/signing behavior, provider implementation, or API schema is authorized.

This unit is contract qualification only. It does not implement product code and does not treat any non-imported Documenso application behavior as inherited Signthos behavior.

## Authority boundary

This unit may add only this Signthos-authored qualification artifact under `specs/003-signthos-domain-boundary/**`.

It authorizes none of the following:

- source import;
- dependency acquisition;
- package-manifest or lockfile changes;
- TypeScript, Rust, SQL, JSON Schema, OpenAPI, or generated-code implementation;
- Prisma schema mutation or migration;
- PDF parsing/rendering/signing behavior;
- authentication-provider or authorization-engine implementation;
- runtime, provider, network, credential, external-service, or deployment execution;
- broad naming/rebrand work;
- Specification 004 work.

`SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT` remains controlling.

## Canonical predecessor truth

At the qualification base:

- Specification 002 is `CLOSED_CANONICAL` through PR #85 / merge `89146441dbd3cbadcddbcd24dc0741b4ecdc14e1`;
- Specification 003 Stage P is `CLOSED_CANONICAL` through PR #86 / merge `d822f3c3ab3bc773efc587ce61f7fc96344098f6`;
- Issue #6 remains open and `PLANNING_ONLY`;
- canonical imported Documenso source remains limited to `.npmrc` and `packages/prisma/schema.prisma`;
- selected 002C auth source remains excluded rights-blocked/no-import;
- 002D–002G remain outside the current imported surface;
- 002H remains optional/not selected.

Therefore the vocabulary below is Signthos-owned contract design. It is not a claim that equivalent Documenso runtime behavior was imported or characterized.

## Identity principles

### 1. Opaque identifiers are not semantic hashes

Every first-class aggregate/entity uses an opaque stable identifier that is independent from mutable metadata and independent from exact-content digests.

Required identifier roles:

```text
DocumentId
DocumentRevisionId
EnvelopeId
RecipientId
FieldId
EvidenceBundleId
WorkflowId
```

Opaque identifiers:

- are stable references within Signthos domain state;
- MUST NOT encode tenant names, user emails, filenames, timestamps, provider identity, or authorization decisions;
- MUST NOT be inferred from presentation labels;
- MUST NOT be reused across different entity kinds merely because underlying bytes or external identifiers match.

### 2. Exact content identity is separately represented

Exact document-content identity uses an algorithm-tagged digest value object:

```text
ContentDigest {
  algorithm
  value
}
```

Qualification constraints:

- the digest identifies exact bytes, not visual equivalence;
- algorithm identity is mandatory and explicit;
- digest comparison requires the same algorithm and value;
- content digest does not replace `DocumentRevisionId`;
- identical bytes MAY exist in distinct revisions or documents without collapsing domain identity;
- visually identical but byte-different content is not the same exact content;
- normalized/rendered/conversion output is a new byte identity unless exact bytes are unchanged.

No cryptographic algorithm choice is implemented or frozen by this planning unit. A later owning unit must select permitted algorithms and lifecycle policy.

## Canonical entity vocabulary

### Document

`Document` is the durable logical container for a user's evolving document lineage.

It owns:

- `DocumentId`;
- tenant/resource ownership reference;
- revision lineage membership;
- logical metadata that does not redefine immutable revision bytes;
- an explicit current/working revision reference when such an alias is needed.

It does not own:

- envelope routing state;
- recipient authentication evidence;
- field completion state;
- signing-event evidence;
- mutable replacement of bytes inside an existing revision.

Invariant:

```text
Document identity != revision identity != exact-content identity
```

### DocumentRevision

`DocumentRevision` is an immutable domain record representing one exact content state in a document lineage.

Minimum qualified semantics:

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

Invariants:

- one revision belongs to exactly one `Document`;
- revision content bytes are immutable after the revision becomes canonical domain state;
- a content-changing operation creates a new revision rather than mutating the prior revision;
- `parent_revision_id`, when present, references a revision in the same document lineage unless a later canonical contract explicitly defines a bounded import/fork relationship;
- exact byte equality does not imply revision-identifier equality;
- a revision may be referenced by an envelope without transferring content ownership to the envelope.

### Envelope

`Envelope` owns routing/interaction state for a bounded signing or approval process and binds to an exact document revision.

Minimum qualified semantics:

```text
Envelope {
  envelope_id
  document_revision_id
  workflow_id?
  routing_state
}
```

Invariants:

- envelope state never mutates the bound revision's bytes;
- changing the signable/input bytes requires a new revision and a separately valid binding transition;
- an alias such as `latest revision` MUST NOT silently retarget an existing envelope;
- envelope identity is independent from document and revision identity;
- cancellation, expiry, completion, or voiding are routing/process state, not content mutation.

### Recipient

`Recipient` is an envelope-scoped participant reference with a role and interaction state.

Minimum qualified semantics:

```text
Recipient {
  recipient_id
  envelope_id
  role
  state
  principal_binding?
}
```

Invariants:

- recipient identity is not equivalent to authentication proof;
- email address, phone number, display name, or provider account identifier MUST NOT be treated as sufficient authorization by themselves;
- one recipient belongs to one envelope in the minimum model;
- authorization remains a separate decision using principal/tenant/resource/action context.

### Field

`Field` is an envelope/revision-bound interaction requirement placed in document context.

Minimum qualified semantics:

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

Invariants:

- placement is meaningful only against an exact revision/page context;
- a field MUST NOT silently follow a new revision when page geometry/content changes;
- recipient ownership, when present, references a recipient in the same envelope;
- field completion state is not document content identity;
- a future provider may render or collect a field, but provider-local state must map back to this shared semantic contract.

No coordinate format or page-number indexing convention is selected by this unit.

### EvidenceBundle

`EvidenceBundle` is an immutable or append-only domain evidence aggregate that binds evidence items to exact domain resources and revisions without converting uncertain evidence into validity claims.

Minimum qualified semantics:

```text
EvidenceBundle {
  evidence_bundle_id
  subject_refs
  evidence_items
  integrity_metadata
}
```

Invariants:

- evidence must bind to exact subject identities, including revision identity when content-specific;
- verification state distinguishes valid, invalid, incomplete, unsupported, and unavailable where applicable;
- timestamps, provider claims, or audit events do not by themselves establish legal effect;
- sensitive content is minimized by default;
- evidence mutation policy must preserve prior canonical evidence rather than silently rewrite it.

This unit does not define cryptographic evidence formats, signature validation, qualified-signature claims, or legal-effect policy.

### Workflow

`Workflow` is a reusable or envelope-associated transition policy describing allowed domain process progression without owning document bytes.

Minimum qualified semantics:

```text
Workflow {
  workflow_id
  transition_policy
}
```

Invariants:

- workflow policy cannot mutate `DocumentRevision` bytes in place;
- workflow state must not become hidden provider-specific semantics;
- provider/runtime implementations may execute transitions only through later authorized contracts;
- workflow identity is distinct from an individual envelope execution.

## Aliases versus immutable identity

Terms such as the following may exist only as mutable references or derived classifications:

```text
current_revision
working_revision
signable_revision
signed_revision
latest_revision
```

They are not independent immutable identities unless a later specification explicitly introduces a separate entity.

Rules:

- an alias MUST resolve to an exact `DocumentRevisionId` before an irreversible or signing-sensitive action is bound;
- once an envelope or evidence record is bound to a revision, a later alias change MUST NOT silently retarget that binding;
- `signed_revision` denotes a revision participating in signed evidence, not a mutable flag permitting byte replacement;
- `signable_revision` is a qualification/state concept and MUST NOT mean that signatures, legal validity, or provider support have already been established.

## Revision origin vocabulary

A revision has an explicit origin classification. The minimum qualified vocabulary is:

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

- `IMPORTED`: exact bytes entered the Signthos document lineage from an external/user-supplied artifact;
- `CREATED`: initial bytes were created through a future Signthos-owned creation path;
- `EDITED`: bytes changed through an authorized content-changing operation;
- `CONVERTED`: bytes were produced by explicit format conversion;
- `PROVIDER_OUTPUT`: a provider returned content-changing bytes that become a new revision;
- `RESTORED`: exact historical bytes were restored into an explicitly recorded new/current lineage position without mutating prior records;
- `OTHER_EXPLICIT`: reserved only when a later bounded contract records a stable machine-readable reason rather than silently coercing an unknown origin.

No runtime operation is authorized by these labels.

## Revision reason vocabulary

`revision_reason` records why a new immutable revision exists. Minimum categories:

```text
INITIAL_INGEST
USER_EDIT
FORMAT_CONVERSION
PROVIDER_CONTENT_CHANGE
METADATA_BYTE_CHANGE
RESTORE
OTHER_EXPLICIT
```

A metadata operation that changes exact bytes is content-changing for revision identity even if rendered appearance is unchanged.

## Relationship constraints

The minimum ownership graph is:

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

A later unit may refine cardinality, but it MUST NOT collapse document-content ownership into envelope routing state.

## Tenant and resource identity constraints

This 003A unit does not define the complete authorization model owned by later 003D work, but identity semantics must support it.

Therefore:

- each protected first-class resource must be addressable with an opaque resource identifier;
- tenant scope must be representable independently from user-facing labels;
- cross-tenant identifier collision must not imply shared authority;
- external/provider identifiers, when later introduced, must be treated as adapter mappings rather than canonical Signthos identity by default;
- authentication identity must not replace resource ownership/authorization context.

## Deterministic contract examples

### Example A — edit creates a new revision

Given:

```text
Document D1
Revision R1 -> digest shaX:A
```

If an authorized edit changes bytes from `A` to `B`, the domain result is conceptually:

```text
Document D1
Revision R1 -> digest shaX:A
Revision R2 -> digest shaX:B, parent=R1, reason=USER_EDIT
```

The invalid result is mutating R1 to point at bytes B.

### Example B — same bytes do not collapse domain identity

Two distinct documents may each contain a revision with the same exact content digest. They remain distinct documents and revisions.

### Example C — envelope binding is exact

If Envelope E1 is bound to R2 and Document D1 later advances its `current_revision` alias to R3, E1 remains bound to R2 unless a later authorized transition explicitly creates/rebinds process state under its owning contract.

### Example D — conversion is explicit

A non-PDF input converted into PDF-like output is represented as a new revision with origin/reason reflecting conversion. The conversion does not rewrite the original imported revision.

This example does not authorize any converter or claim PDF validity.

## Required negative cases

Any later contract/schema implementation derived from this qualification must reject or make impossible:

1. silently replacing bytes for an existing `DocumentRevisionId`;
2. treating `DocumentId` as signing-input identity;
3. automatically retargeting an existing envelope when a document alias moves;
4. binding a field to a revision that conflicts with the envelope's bound revision without an explicit later contract permitting it;
5. treating recipient contact data or authentication proof as sufficient resource authorization;
6. using visual equivalence as exact-content equality;
7. dropping the digest algorithm tag;
8. treating provider-local IDs as canonical Signthos IDs without an adapter mapping;
9. converting verification `unsupported`, `incomplete`, or `unavailable` into success;
10. using an origin/reason label to imply runtime capability that has not been separately authorized.

## Deferred decisions

The following remain intentionally unresolved and must be owned by later bounded qualification units:

- concrete programming language/type representation;
- UUID/ULID/other opaque-ID encoding;
- digest algorithm set and rotation policy;
- timestamp representation and clock semantics;
- field coordinate/page-index representation;
- envelope lifecycle transition matrix;
- recipient role/state enumerations beyond minimum ownership semantics;
- authorization action vocabulary and decision reason taxonomy;
- evidence serialization and cryptographic format;
- provider capability wire contracts;
- persistence mapping and migration strategy;
- public API/JSON/OpenAPI representation.

Deferral is deliberate and is not permission to choose these implicitly during implementation.

## 003A acceptance criteria

This qualification may become canonical only if independent exact-head review confirms that:

1. every first-class entity has non-overlapping semantic ownership;
2. `Document`, `DocumentRevision`, exact-content digest, and `Envelope` identities remain distinct;
3. revision immutability is explicit without prematurely specifying implementation mechanics;
4. envelope and field bindings cannot silently follow mutable aliases;
5. conversion and provider content changes require new-revision semantics at contract level;
6. authentication/contact identity remains distinct from resource authorization;
7. provider/platform identifiers cannot fork canonical domain identity;
8. verification uncertainty remains fail-closed;
9. deferred decisions are explicit enough to prevent accidental implementation-by-assumption;
10. the exact diff remains planning-only under `specs/003-signthos-domain-boundary/**` with zero upstream-derived source bytes and zero implementation/provenance/dependency/runtime mutation.

## Candidate successor

If and only if this exact 003A qualification is independently reviewed, guarded-merged, post-merge verified, and reconciled from live canonical truth, the candidate next bounded unit is:

```text
003B_REVISION_AND_IMMUTABLE_SIGNING_INPUT_CONTRACT_QUALIFICATION
```

That successor remains planning/contract qualification only unless separate canonical authority explicitly grants implementation.

Candidate result before merge:

```text
003A_STATUS = QUALIFICATION_CANDIDATE
003A_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```
