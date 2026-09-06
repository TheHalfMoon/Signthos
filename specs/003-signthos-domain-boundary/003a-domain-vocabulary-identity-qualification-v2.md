# Specification 003A — Domain Vocabulary and Identity Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_CONTRACT_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `b9ad2e93556136f4df95b56b39ea231d75d64453`
Owning specification: `003-signthos-domain-boundary`

## Canonical authority

Specification 003 Stage P is `CLOSED_CANONICAL` only after both:

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

Freeze only the minimum implementation-independent Signthos vocabulary, identity roles, value boundaries, and cross-entity identity invariants required by later Specification 003 grains.

003A does **not** freeze lifecycle/state-machine semantics owned by later grains. In particular, detailed envelope routing, recipient roles/states, field placement/completion semantics, and workflow transition policy remain owned by 003C; authorization decisions remain owned by 003D; provider wire/runtime contracts remain owned by 003E; persistence mappings remain owned by 003F.

## Allowed change surface

This qualification may add only Signthos-authored planning/contract material under:

`specs/003-signthos-domain-boundary/**`

It authorizes no source import, dependency acquisition, package or lockfile mutation, generated schema, TypeScript/Rust/SQL/Prisma implementation, database migration, PDF/signing execution, authentication-provider implementation, provider/network execution, credentials, deployment, broad rebrand, or Specification 004 work.

## Evidence class

Every new contract below is `SIGNTHOS_OWNED_DESIRED_CONTRACT` unless explicitly identified as canonical predecessor fact.

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
6. concrete digest algorithms, encoding rules, and rotation policy remain deferred to a separately owning authorization.

## Canonical entity identity semantics

### Document

`Document` is the durable logical identity for a user-visible document lineage.

Identity-level invariants:

- owns `DocumentId`;
- contains separately addressable `DocumentRevision` identities;
- may expose an alias such as current/working revision without making that alias immutable identity;
- does not itself mean the bytes being signed;
- does not own envelope routing state, recipient authentication evidence, field completion state, or signing evidence.

Invariant:

```text
DocumentId != DocumentRevisionId != ContentDigest != EnvelopeId
```

### DocumentRevision

`DocumentRevision` is an immutable identity for one exact content snapshot in a document lineage.

Minimum Stage-P-compatible semantic shape:

```text
DocumentRevision {
  document_revision_id
  document_id
  content_digest
  media_type
  byte_length?
  parent_revision_id?
  origin
  revision_reason
}
```

Required invariants:

1. a revision belongs to exactly one `Document`;
2. canonical revision bytes are immutable;
3. a content-changing operation creates a new revision;
4. `media_type` is explicit for the revision content;
5. `byte_length`, when available at the creation/verification boundary, belongs to the exact revision snapshot;
6. `parent_revision_id`, when present, references the same document lineage unless a later canonical contract explicitly defines a bounded fork/import relation;
7. exact byte equality does not imply revision identity equality;
8. a routing/evidence aggregate may reference a revision but does not acquire ownership of its content.

003A does not choose media-type normalization, byte-storage representation, digest algorithm, or revision-creation API.

### Envelope

`Envelope` has a stable `EnvelopeId` distinct from document/revision/content identity.

At any signing/evidence-sensitive boundary an envelope must identify the exact `DocumentRevisionId` value or values it governs. 003A deliberately does **not** freeze whether the final 003C envelope model supports one revision, multiple revisions, ordering, grouping, or other cardinality semantics.

Identity-level invariants:

1. an envelope never identifies signable content by `DocumentId` or mutable alias alone;
2. envelope/routing state cannot mutate revision bytes;
3. alias movement cannot silently retarget an already established exact revision binding;
4. a content change requires a new `DocumentRevisionId` before later owning contracts may establish any new binding.

Detailed routing state and transition semantics are deferred to 003C.

### Recipient

`Recipient` has a stable `RecipientId` and is scoped to an envelope under the minimum Signthos identity model.

Identity-level invariants:

1. recipient identity is not authentication proof;
2. email, phone, display name, or provider account ID is not canonical recipient identity by itself;
3. recipient identity or authentication success is not sufficient resource authorization;
4. detailed role, delivery, interaction, and lifecycle states are deferred to 003C;
5. authorization semantics remain owned by 003D.

### Field

`Field` has a stable `FieldId` and must be addressable against an envelope plus exact revision context when its meaning depends on document content or geometry.

Identity-level invariants:

1. a field cannot silently follow a mutable document/revision alias;
2. a content/geometry-sensitive field binding must identify an exact revision governed by its envelope under the later 003C contract;
3. provider-local field IDs are adapter mappings, not canonical Signthos identity;
4. field kind, placement representation, page-index convention, ownership/cardinality details, and completion lifecycle are deferred to 003C.

### EvidenceBundle

`EvidenceBundle` has a stable `EvidenceBundleId` and binds evidence to exact subject identities.

Identity-level invariants:

1. content-specific evidence references exact revision identity;
2. evidence state must preserve distinctions such as valid, invalid, incomplete, unsupported, and unavailable where applicable;
3. timestamps, provider claims, or audit events do not by themselves establish legal effect;
4. sensitive content is minimized by default;
5. later mutation/append semantics must preserve prior canonical evidence rather than silently rewriting history.

Cryptographic formats, certificate policy, PAdES level, QES/AdES claims, signature validation, and legal-effect policy are outside 003A.

### Workflow

`Workflow` has a stable `WorkflowId` distinct from any single envelope execution and from provider/runtime job identity.

Identity-level invariants:

1. workflow identity never owns document bytes;
2. provider/runtime job identity must not become hidden canonical workflow identity;
3. transition policy, replay/idempotency behavior, and lifecycle semantics are deferred to 003C;
4. runtime execution remains unauthorized until separately granted.

## Aliases and classifications

The following are aliases or classifications, not new immutable identities unless a later canonical contract explicitly introduces a separate entity:

```text
current_revision
working_revision
signable_revision
signed_revision
latest_revision
```

Rules:

1. an alias resolves to an exact `DocumentRevisionId` before any irreversible or signing/evidence-sensitive binding;
2. once an envelope/evidence record is bound to an exact revision, later alias movement cannot silently retarget it;
3. `signed_revision` means a revision participates in signed evidence, not permission to replace its bytes;
4. `signable_revision` is a qualification/classification only and does not imply signatures, legal validity, or provider support exist.

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

These labels describe why exact revision bytes entered a lineage; they authorize no runtime behavior. Later grains may refine the vocabulary without weakening the invariant that every content-changing path creates a distinct revision.

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

`OTHER_EXPLICIT` requires a stable machine-readable reason rather than an untyped implicit fallback. Later owning grains may introduce explicit categories for merge, redaction, signing increment, external ingest, or other Stage-P-compatible reasons.

A metadata operation that changes exact bytes is content-changing for revision identity even when rendered appearance is unchanged.

## Cross-entity relationship invariants

003A freezes only identity-safe relationships; 003C owns detailed cardinality and lifecycle semantics.

```text
Document
  -> one or more separately addressable DocumentRevision identities over its lineage

Envelope
  -> one or more exact governed DocumentRevision identities at signing/evidence-sensitive boundaries, with final cardinality/order deferred to 003C
  -> Recipient identities scoped under the envelope
  -> Field identities scoped under the envelope
  -> optional Workflow identity reference only if later 003C semantics require it

Field
  -> exact revision identity whenever content/geometry semantics depend on document bytes
  -> any recipient relationship must remain within the same envelope unless a later canonical contract explicitly defines otherwise

EvidenceBundle
  -> one or more explicit subject identities
```

No later grain may collapse document-content ownership into routing state or make a mutable alias sufficient for a signing/evidence-sensitive binding.

## Tenant and resource identity constraints

003A does not own the full authorization model; 003D remains the planned owner. Identity semantics must nevertheless support authorization safely:

1. each protected first-class resource must be addressable by opaque resource identity;
2. tenant scope must be representable independently from human labels;
3. cross-tenant identifier collision does not imply shared authority;
4. provider/external identifiers are adapter mappings by default;
5. authentication identity does not replace resource ownership/authorization context.

003A does not decide whether tenant identity is embedded in an aggregate, carried in an authorization context, or represented through another later-owned relationship.

## Deterministic contract examples

### Example A — edit creates a new revision

Given:

```text
Document D1
Revision R1 -> digest alg:A, media_type=M
```

If an authorized edit changes bytes to B:

```text
Document D1
Revision R1 -> digest alg:A, media_type=M
Revision R2 -> digest alg:B, media_type=M, parent=R1, reason=USER_EDIT
```

Mutating R1 to point at B is invalid.

### Example B — equal bytes do not collapse domain identity

Two distinct documents may each contain a revision with the same exact `ContentDigest`. Their `DocumentId` and `DocumentRevisionId` values remain distinct.

### Example C — envelope binding is exact without freezing cardinality

If Envelope E1 is bound to exact revision R2 at a signing/evidence-sensitive boundary and D1 later moves its `current_revision` alias to R3, E1's R2 binding remains unchanged. A multi-revision envelope, if later qualified by 003C, follows the same rule independently for every governed exact revision.

### Example D — conversion is explicit

A non-PDF input converted to PDF produces a new revision with conversion origin/reason. The imported revision remains immutable. This example authorizes no converter and makes no PDF-validity claim.

## Required negative cases

Any later implementation/schema derived from this qualification must reject or make impossible:

1. replacing bytes for an existing `DocumentRevisionId`;
2. treating `DocumentId` as exact signing-input identity;
3. silently retargeting an envelope/evidence binding when a mutable revision alias moves;
4. binding a content/geometry-sensitive field only to a mutable alias;
5. treating recipient contact data or authentication proof as sufficient resource authorization;
6. treating visual equivalence as exact-content equality;
7. omitting the digest algorithm tag;
8. treating provider-local IDs as canonical Signthos IDs without adapter mapping;
9. converting verification `unsupported`, `incomplete`, or `unavailable` into success;
10. using origin/reason labels as evidence of runtime capability;
11. inferring a single-revision or multi-revision envelope implementation merely from 003A.

## Deferred decisions and ownership

003A intentionally does not choose:

- programming language/type representation — future implementation authorization;
- UUID/ULID/other identifier encoding — later owning qualification;
- digest algorithm set/encoding/rotation policy — later owning qualification;
- timestamp and clock representation — later owning qualification;
- envelope revision cardinality/order, routing states, and transitions — 003C;
- recipient roles/states and delivery/interaction lifecycle — 003C;
- field kind/placement/page-index/completion semantics — 003C;
- workflow transition/replay/idempotency semantics — 003C;
- authorization action/reason taxonomy and decision model — 003D;
- evidence serialization and cryptographic format — later evidence/signing owners;
- provider capability/wire contracts — 003E;
- persistence mapping and migration strategy — 003F;
- public API/JSON/OpenAPI representation — later owning specification.

Deferral is explicit and is not permission to make these choices implicitly during implementation.

## Acceptance criteria

003A may become canonical only if exact-head independent substantive review confirms all of the following:

1. every first-class entity has distinct identity ownership without stealing lifecycle semantics from later grains;
2. `Document`, `DocumentRevision`, `ContentDigest`, and `Envelope` identities remain distinct;
3. `DocumentRevision` preserves Stage P minimum content metadata including `media_type` and `byte_length` when available;
4. revision immutability is explicit without prematurely choosing implementation mechanics;
5. envelope and field bindings cannot silently follow mutable aliases;
6. 003A does not freeze single-vs-multiple envelope revision cardinality that belongs to later contract work;
7. conversion/provider byte changes require new-revision semantics at contract level;
8. authentication/contact/provider identity remains distinct from resource authorization;
9. provider/platform identifiers cannot fork canonical domain identity;
10. verification uncertainty remains fail-closed;
11. deferred decisions prevent accidental implementation-by-assumption;
12. the exact diff remains planning-only under `specs/003-signthos-domain-boundary/**` with zero upstream-derived source bytes and zero implementation/provenance/dependency/runtime mutation.

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
