# Specification 003B — Revision and Immutable Signing-Input Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_CONTRACT_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `4e1885851bd80eaae1b38c62eb0bfeec65fb2d8c`
Owning specification: `003-signthos-domain-boundary`
Dependency: 003A `CLOSED_CANONICAL`

## Canonical authority

003A is canonical through PR #89 / merge `4e1885851bd80eaae1b38c62eb0bfeec65fb2d8c`.

Issue #6 post-003A successor authority permits only:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 003B_REVISION_AND_IMMUTABLE_SIGNING_INPUT_CONTRACT_QUALIFICATION
003B_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
003B_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact is Signthos-authored desired-contract work only. It imports zero upstream application source bytes and does not claim inherited Documenso runtime behavior.

## Purpose

Freeze only the implementation-independent revision and exact signing-input rules required by later Specification 003 grains.

003B owns questions about:

- exact byte-effect classification;
- when a new `DocumentRevisionId` is mandatory;
- explicit conversion revisions;
- exact immutable signing-input binding;
- preservation of prior signed/signing-bound byte states;
- revision-safe mutation preconditions and stale-write conflicts.

003B does not own envelope/recipient/field/workflow lifecycle, authorization, final event/error taxonomy, provider capability/runtime policy, provider local/network behavior, provider secret-access policy, persistence mechanisms, PDF engine behavior, cryptographic signing, PAdES/CMS/certificate/timestamp semantics, or legal effect.

## Allowed change surface

Only Signthos-authored planning/contract material under:

`specs/003-signthos-domain-boundary/**`

No source import, package/lockfile mutation, dependency acquisition, generated code, TypeScript/Rust/SQL/Prisma implementation, migration, runtime/provider/network execution, credentials, PDF/signing execution, broad rebrand, or Specification 004 work is authorized.

## Evidence class

Every new rule below is `SIGNTHOS_OWNED_DESIRED_CONTRACT` unless explicitly identified as canonical predecessor fact.

The canonical imported Documenso source surface remains only `.npmrc` and `packages/prisma/schema.prisma`.

## Canonical 003A invariants consumed

003B preserves these canonical predecessor rules:

1. `DocumentId`, `DocumentRevisionId`, `ContentDigest`, and `EnvelopeId` are distinct identity/value roles.
2. `ContentDigest` means algorithm-tagged exact-byte identity.
3. revision bytes are immutable after creation.
4. a content-changing operation requires a new revision.
5. signing/evidence-sensitive references bind exact revision identities, not mutable aliases.
6. alias movement cannot silently retarget an established exact binding.
7. `media_type` and, when available, `byte_length` describe the exact revision snapshot.
8. provider-local identity does not become canonical Signthos identity.

003B refines lifecycle consequences without reopening 003A identity ownership.

## Byte-effect classification

Every operation that may observe, emit, or transform document bytes is classified semantically as one of:

```text
BYTE_PRESERVING_VERIFIED
BYTE_CHANGING
BYTE_EFFECT_UNKNOWN
NO_CANONICAL_BYTE_OUTPUT
```

### `BYTE_PRESERVING_VERIFIED`

Exact output bytes are proven equal to the input revision bytes using applicable exact-content identity evidence.

Rules:

- provider/UI labels are not sufficient proof;
- visual equivalence is not exact-byte equality;
- a new revision is not mandatory solely because an operation executed;
- separately addressable snapshots may still retain distinct revision identity when a later owning contract requires them.

### `BYTE_CHANGING`

Exact canonical output bytes differ from the input revision bytes.

Mandatory consequence:

```text
BYTE_CHANGING => NEW_DOCUMENT_REVISION_REQUIRED
```

The input revision remains unchanged and separately addressable.

### `BYTE_EFFECT_UNKNOWN`

The system cannot prove whether exact bytes were preserved.

Rules:

- unknown effect cannot be promoted to `BYTE_PRESERVING_VERIFIED`;
- uncertain output cannot overwrite the input revision;
- the caller must fail/abstain or use a later separately authorized handling path that preserves revision identity safely.

003B does not specify provider quarantine, local/network execution, or provider trust policy; those belong to later owning grains.

### `NO_CANONICAL_BYTE_OUTPUT`

No replacement canonical document byte stream is emitted.

A workflow/presentation metadata operation can be in this class only when it does not rewrite canonical document bytes.

If embedded metadata or serialized structure changes exact bytes, the operation is `BYTE_CHANGING`.

## Byte-changing examples at contract level

When their resulting exact bytes differ, examples include:

- document edits;
- format conversion;
- PDF normalization/rewrite;
- page insertion/removal/reorder/rotation/geometry rewrite;
- annotation/form embedding;
- embedded metadata rewrite;
- redaction/sanitize/repair output;
- compression/re-encoding;
- signing incremental update;
- any transformed output whose digest differs from its input.

Names such as `read-only`, `safe`, `lossless`, or `metadata-only` do not override byte truth.

## New-revision contract

A mandatory new revision has at least this semantic shape:

```text
NewRevision {
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

1. changed bytes never reuse the input `DocumentRevisionId`;
2. the previous revision remains immutable and addressable;
3. `content_digest` describes the exact new bytes;
4. `media_type` describes the new bytes;
5. `byte_length`, when recorded, describes the same exact snapshot;
6. ordinary lineage parentage references an allowed predecessor in the same document lineage unless a later canonical contract defines bounded fork/import semantics;
7. `origin` and `revision_reason` are machine-meaningful domain classifications, not provider wire identity;
8. creation of a new revision does not automatically move any mutable alias or any existing signing/evidence-sensitive binding.

## In-place mutation prohibition

This semantic operation is invalid:

```text
overwrite_bytes(existing_document_revision_id, different_bytes)
```

Different canonical bytes require a different exact revision identity.

## Exact-content comparison boundary

Content equality is exact-byte equality under the applicable algorithm-tagged digest contract.

Visual equivalence, normalized text equality, rendered-page equality, filename equality, media-type equality, or provider assertions are insufficient.

Digest algorithm selection and encoding policy remain deferred to their owning authorization.

## Conversion revision contract

When a later signing/PDF policy requires PDF input, a non-PDF source cannot become signable merely by relabeling an alias or filename.

Conceptually:

```text
R_source --explicit conversion relation--> R_pdf
```

Required invariants:

1. `R_source` remains immutable and preserved;
2. differing conversion output bytes use a distinct `DocumentRevisionId`;
3. the converted revision records its own exact content identity and media type;
4. the conversion relation identifies the source revision at contract level;
5. a PDF-specific signing binding references the converted exact revision, not the non-PDF source or a mutable alias;
6. reconversion that produces different bytes creates another revision rather than rewriting an earlier conversion output.

003B does not select conversion engines, providers, sandboxing, dependencies, or execution paths.

## Immutable signing-input contract

Before any later owning contract permits an irreversible signing/evidence-sensitive operation, the input must resolve to an exact immutable revision.

Minimum semantic binding:

```text
SigningInputBinding {
  document_revision_id
  content_digest
  media_type
  byte_length?
}
```

Required invariants:

1. all fields refer to the same exact revision snapshot;
2. `latest_revision`, `current_revision`, `working_revision`, `signable_revision`, filenames, URLs, or provider IDs are not valid immutable binding keys;
3. mutable aliases are resolved before binding;
4. later alias movement cannot retarget an established binding;
5. creating a newer revision cannot reinterpret the existing binding;
6. transformed bytes cannot silently replace the bound input;
7. any required transformation that changes bytes creates a distinct revision that must be explicitly selected under the later owning lifecycle contract.

Storage, API representation, signer state, and cryptographic use of the binding are deferred.

## Signed/signing-bound revision preservation

If a later signing operation emits bytes different from its bound input, the bound input remains immutable and auditable.

Safe contract rule:

```text
BOUND_INPUT_EXACT_BYTES != CHANGED_SIGNING_OUTPUT_EXACT_BYTES
=> DISTINCT_EXACT_REVISION_STATE_REQUIRED
```

Required invariants:

- signing output cannot overwrite the bound input revision;
- evidence remains capable of identifying the exact input and exact output state;
- later edits do not rewrite earlier signed/signing-bound bytes;
- newer revisions do not retarget evidence attached to earlier exact states;
- `signed_revision` remains a classification and does not itself prove cryptographic validity, trust, or legal effect.

Detailed signing/evidence relations belong to later signing specifications.

## Envelope/evidence binding boundary

003B freezes only exact-revision safety.

At signing/evidence-sensitive boundaries:

- content references use exact `DocumentRevisionId` values;
- content-specific evidence identifies the exact revision it examined or recorded;
- `DocumentId` or a mutable alias alone is insufficient;
- later alias movement does not mutate prior bindings;
- changed content requires a new revision before any later-owning lifecycle can consider a replacement binding.

003B does not decide envelope cardinality, rebinding permission, recipient states, field lifecycle, workflow transitions, cancellation, voiding, expiry, or consent/re-consent. Those remain owned by 003C and later signing specifications.

## Safe-write precondition contract

A content-changing write intent identifies the exact revision state against which it was prepared.

Conceptually:

```text
RevisionWriteIntent {
  document_id
  base_document_revision_id
  base_content_digest?
  proposed_effect_class
}
```

Required invariants:

1. the base revision is exact, not a moving alias;
2. an optional digest precondition must correspond to the stated base revision;
3. a stale intent cannot be silently reinterpreted against a newer revision;
4. if relevant working/current state has moved so the base assumption is invalid, the result is conflict/abstention or another later-authorized explicit outcome;
5. conflict never mutates either revision merely to resolve itself;
6. successful byte-changing output creates a new revision instead of mutating the base.

HTTP codes, ETags, transactions, locks, compare-and-swap, database columns, and merge algorithms are deferred.

## Revision conflict semantic classes

003B may use these semantic result classes without freezing final public error codes:

```text
ACCEPTABLE_BASE
STALE_BASE_CONFLICT
BASE_REVISION_UNKNOWN
BASE_DIGEST_MISMATCH
BYTE_EFFECT_UNRESOLVED
OPERATION_UNSUPPORTED
```

Rules:

- stale/unknown/mismatched state cannot become success by fallback to `latest`;
- unresolved byte effect cannot become verified byte preservation;
- unsupported requested mutation cannot be represented as successful no-op;
- 003D owns final stable machine-readable error taxonomy and disclosure behavior.

## Concurrent revision safety

003B does not require a strictly linear history and does not choose persistence strategy.

Constraints:

1. concurrent writers may derive competing candidate revisions from the same base;
2. no candidate overwrites another revision's bytes;
3. whether candidates are retained/rejected/merged remains a later product/persistence policy;
4. any mutable alias movement is explicit and does not rewrite historical identities;
5. existing signing/evidence bindings remain attached to their exact referenced revisions.

## No-op / equal-byte result

An operation may execute and produce bytes exactly equal to the input.

Rules:

- exact unchanged bytes do not require a new revision solely because execution occurred;
- execution/audit/provenance may be recorded separately by later owning contracts;
- already distinct historical revision identities are not collapsed merely because bytes happen to be equal.

## Failure and atomicity boundary

A failed or incomplete byte-changing operation cannot partially replace the input revision.

If later implementation creates a new revision and also updates mutable state, externally visible state must not expose:

- a pointer to missing/unverified revision content;
- replacement revision identity lacking required exact-content metadata;
- silent retargeting of existing signing/evidence bindings.

Concrete transaction/storage mechanisms belong to later owning implementation and persistence grains.

## Provider-result ownership boundary

003B provider-related rules are intentionally limited to exact byte effect and revision identity.

A future provider result that emits document bytes must permit determination of:

```text
input_revision_id
output_bytes_present
output_content_digest?
output_media_type?
output_byte_length?
byte_effect_class
```

003B requires only:

1. changed output bytes cannot reuse input revision identity;
2. unknown byte effect cannot be treated as verified unchanged;
3. provider-local IDs do not replace Signthos revision identity;
4. provider claims are not sole proof of byte equality.

Provider capability discovery, provider wire/runtime contracts, local/network execution policy, provider trust boundaries, and provider secret-access policy are explicitly owned by 003E and are not defined by 003B.

## Required adversarial cases

### A — edit after signing intent binds `R1`

Changed bytes create `R2`; the existing binding remains on `R1` unless a later-owning lifecycle explicitly permits and records a replacement transition.

### B — provider claims read-only but returns changed bytes

Exact byte truth wins. Changed bytes cannot be accepted as `R1`; if accepted later, they require a distinct revision state.

### C — non-PDF sent directly to a PDF-specific signing path

The request fails/abstains until explicit conversion creates/selects an exact PDF revision as required by the later signing/PDF policy.

### D — embedded metadata rewrite changes bytes

The operation is byte-changing and requires a new revision.

### E — `latest_revision` moves after an envelope/evidence binding

Existing exact binding remains on the previously resolved revision.

### F — stale client mutation

The stale base cannot silently apply to a newer relevant revision. Conflict/abstention or a later-authorized explicit merge/rebase path is required.

### G — signing output changes exact bytes

The original bound input remains unchanged; changed output uses a separately identifiable exact revision state and evidence can preserve the relation.

### H — operation result equals input bytes

A new revision is not mandatory solely because execution occurred; no historical identity collapse is implied.

## Cross-grain ownership

003B owns only:

- exact-byte effect classification;
- mandatory new-revision consequences;
- explicit conversion-revision semantics;
- immutable signing-input exact-revision binding;
- preservation of signed/signing-bound exact states;
- revision-safe write preconditions/conflicts.

003B explicitly defers:

- 003C: envelope/recipient/field/workflow lifecycle and cardinality;
- 003D: authorization, event taxonomy, final error codes;
- 003E: provider capability/interface/runtime behavior, local/network policy, provider trust and secret-access policy;
- 003F: persistence, transactions, schema/migration mapping;
- 003G: naming/config migration;
- 003H: convergence/closeout;
- Specification 004: PDF implementation when separately authorized;
- later signing specifications: cryptography/evidence/PAdES/legal semantics.

## Qualification assertions

The exact final head is acceptable only if independent substantive review confirms:

1. changed bytes always require a new revision identity;
2. unknown byte effect fails closed;
3. in-place byte mutation is prohibited;
4. conversion is an explicit revision boundary;
5. signing-sensitive binding uses exact immutable revision identity;
6. aliases cannot retarget established bindings;
7. changed signing output cannot overwrite its input;
8. stale writes cannot silently target a newer revision;
9. concurrent rules do not prematurely choose persistence strategy;
10. provider-related 003B rules are limited to byte effect/revision identity and do not own 003E behavior;
11. 003C–003F and later signing ownership is preserved;
12. no cryptographic/legal/implementation/source/dependency/runtime/migration authority is created;
13. final diff remains Signthos-authored planning/contract material only;
14. 003C remains only a candidate successor until successful 003B canonicalization and fresh post-merge reread.

## Candidate result

If and only if this exact qualification passes truthful exact-head check accounting, independent substantive exact-head review, forward-only finding reconciliation, zero unresolved material review threads, guarded `expected_head_sha` merge, mechanical post-merge verification, and fresh canonical successor reread:

```text
003B_REVISION_AND_IMMUTABLE_SIGNING_INPUT_QUALIFICATION = CLOSED_CANONICAL
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
NEXT_CANDIDATE_UNIT = 003C_ENVELOPE_RECIPIENT_FIELD_WORKFLOW_QUALIFICATION
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

The post-merge successor analysis remains controlling. This artifact does not itself authorize 003C or implementation.