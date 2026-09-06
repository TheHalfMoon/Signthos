# Specification 003B — Revision and Immutable Signing-Input Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_CONTRACT_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `4e1885851bd80eaae1b38c62eb0bfeec65fb2d8c`
Owning specification: `003-signthos-domain-boundary`
Dependency: 003A `CLOSED_CANONICAL`

## Canonical authority

003A became canonical through PR #89 / merge `4e1885851bd80eaae1b38c62eb0bfeec65fb2d8c`.

The post-003A successor reread in Issue #6 authorizes exactly:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 003B_REVISION_AND_IMMUTABLE_SIGNING_INPUT_QUALIFICATION
003B_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
003B_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
SOURCE_IMPORT_AUTHORITY = ABSENT
DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
DATABASE_MIGRATION_AUTHORITY = ABSENT
RUNTIME_PROVIDER_NETWORK_AUTHORITY = ABSENT
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact is Signthos-authored desired-contract work only. It does not import or translate excluded Documenso application source and does not claim that non-imported upstream behavior exists in Signthos.

## Purpose

Freeze the implementation-independent content lifecycle rules that every later Signthos PDF, signing, workflow, provider, persistence, and public-interface implementation must obey.

003B answers one question: **when document bytes or signing-relevant content state changes, what immutable revision and binding consequences are required?**

It deliberately does not define envelope routing lifecycle, recipient role/state machines, field completion lifecycle, authorization policy, provider wire protocols, persistence schema, or cryptographic signing implementation.

## Allowed change surface

This qualification may add only Signthos-authored planning/contract material under:

`specs/003-signthos-domain-boundary/**`

It authorizes no source import, dependency acquisition, package or lockfile mutation, generated schema, TypeScript/Rust/SQL/Prisma implementation, database migration, PDF parsing/rendering/conversion execution, cryptographic signing, auth-provider implementation, runtime/provider/network execution, credentials, deployment, broad rebrand, or Specification 004 work.

## Evidence class

Every new contract below is `SIGNTHOS_OWNED_DESIRED_CONTRACT` unless explicitly identified as canonical predecessor fact.

No rule below is evidence that Documenso implements the same behavior. The current canonical imported source surface remains only `.npmrc` and `packages/prisma/schema.prisma`.

## Predecessor identity contracts carried forward

003B consumes, and must not weaken, canonical 003A semantics:

- `Document` is a durable logical lineage identity;
- `DocumentRevision` is an immutable identity for one exact content snapshot;
- `ContentDigest` is algorithm-tagged exact-byte identity and is distinct from entity identity;
- `Envelope`, `Field`, and evidence-sensitive references bind to exact revision identity rather than mutable aliases;
- content-changing operations require a new `DocumentRevisionId`;
- aliases such as `current_revision`, `working_revision`, `latest_revision`, `signable_revision`, and `signed_revision` are not immutable identity;
- verifier uncertainty or unsupported/unavailable states may not be promoted to success.

003B refines lifecycle consequences only; it does not reopen those identity decisions.

## Operation-effect classification

Every operation that can observe or transform document content must be classified before execution by semantic effect.

Minimum classes:

```text
READ_ONLY
METADATA_ONLY_NON_BYTE_CHANGING
CONTENT_CHANGING
CONTENT_REWRITING_UNKNOWN_UNTIL_RESULT
```

### READ_ONLY

A `READ_ONLY` operation promises that canonical revision bytes are not changed and that no replacement revision is produced.

Examples at contract level may include inspection, verification, rendering, or extraction that returns derived data without replacing the canonical document bytes.

A provider that returns changed canonical document bytes from a `READ_ONLY` operation violates the contract. The result must not be silently accepted as the original revision.

### METADATA_ONLY_NON_BYTE_CHANGING

This class is permitted only for metadata that is stored outside the canonical revision byte stream and whose change cannot alter the exact content digest or signing input.

If a metadata change rewrites file bytes, embedded metadata, object structure, xref data, attachments, form values, or any other byte-level content, it is `CONTENT_CHANGING` regardless of the user's perceived intent.

The classification follows actual signing-relevant byte effect, not UI wording.

### CONTENT_CHANGING

Any operation that changes canonical document bytes produces a new revision identity.

Examples include import normalization that rewrites bytes, conversion, edit, merge, split output, page mutation, annotation insertion, form-value persistence, watermark/stamp, metadata embedding, attachment change, redaction, sanitize/repair, compression rewrite, signing incremental update, and provider output that differs in exact bytes.

The exact operation catalog belongs to later owning specifications; 003B fixes only the lifecycle rule.

### CONTENT_REWRITING_UNKNOWN_UNTIL_RESULT

Some processors may not be able to promise byte preservation before execution. Such operations must be treated fail-closed as potentially revision-creating until exact result comparison proves otherwise.

A provider must not label an operation read-only merely because its intended visual result is unchanged.

## Revision creation contract

A new `DocumentRevision` is required whenever canonical bytes change.

Minimum semantic result:

```text
RevisionCreationResult {
  document_id
  previous_revision_id?
  new_revision_id
  content_digest
  media_type
  byte_length?
  origin
  revision_reason
}
```

Required invariants:

1. `new_revision_id` is never equal to the replaced/input revision identity when bytes differ;
2. `content_digest` binds to the exact bytes of the new revision;
3. `previous_revision_id`, when used as lineage parentage, must reference an allowed predecessor in the same document lineage unless a later owning contract explicitly defines import/fork semantics;
4. the input revision remains independently addressable and immutable;
5. creation of a new revision does not silently retarget existing envelope, field, signing-intent, signature, or evidence bindings;
6. alias movement to the new revision is a separate explicit state change owned by a later contract and never changes historical exact bindings;
7. origin and revision reason are explicit machine-readable classifications, not inferred from human labels.

## Exact-byte comparison rule

Byte equality is determined on the canonical byte sequence associated with a revision.

```text
same_exact_content(a, b) :=
  a.content_digest.algorithm == b.content_digest.algorithm
  AND a.content_digest.value == b.content_digest.value
```

A later contract may require independent byte-length or direct-byte confirmation at selected boundaries, but visual equivalence, normalized text equivalence, rendered-page equality, or provider claims do not establish exact-byte equality.

Digest-algorithm selection and encoding remain separately owned decisions.

## Non-PDF import and conversion revision contract

A non-PDF source must never become a PDF signing input merely by changing a filename, media-type label, or alias.

When a future owning PDF/provider implementation converts non-PDF input to PDF, the conversion output is a distinct `DocumentRevision` with:

- a new revision identity;
- exact digest for the converted bytes;
- explicit PDF media type;
- explicit conversion origin/reason;
- lineage/reference to the source revision or source-ingest identity as defined by the later owning contract;
- independently recorded conversion/provider evidence where required.

The source and converted revision remain distinct historical artifacts.

No signing workflow may bind directly to a non-PDF source when the owning signing/PDF contract requires a signable PDF revision.

003B does not select conversion engines, dependency versions, provider protocols, sandboxing, or PDF conformance policy.

## Signable-input qualification boundary

`signable_revision` is a classification, not a promise of cryptographic validity, legal effect, or provider support.

Before a revision can be treated as signing input, the later owning specifications must establish all required structural/media/capability conditions. 003B fixes only these binding rules:

1. the signing input is an exact `DocumentRevisionId` plus its exact content identity;
2. mutable document aliases are resolved before irreversible signing/evidence-sensitive action;
3. once intent/evidence binds to an exact revision, later alias movement cannot retarget that binding;
4. any content change requires a new revision and a new explicit later-authorized binding decision;
5. signing-input bytes are immutable for the lifetime of the binding.

## Signing-input binding contract

Minimum semantic binding:

```text
SigningInputBinding {
  document_id
  document_revision_id
  content_digest
  bound_at
  binding_context_id
}
```

`binding_context_id` is an opaque reference to the owning envelope/workflow/signing context defined by later contracts. 003B does not decide envelope cardinality or workflow state-machine shape.

Required invariants:

- `document_revision_id` and `content_digest` must agree on the same exact snapshot;
- a binding cannot contain only `DocumentId`, `latest_revision`, `current_revision`, filename, provider ID, or URL;
- re-resolving an alias after binding cannot alter the bound revision;
- if the exact revision is unavailable or its digest cannot be verified when verification is required, the binding is incomplete/unavailable rather than implicitly valid;
- binding timestamps are evidence facts only and do not establish legal effect.

## Intent boundary

A later owning signing/workflow contract may distinguish preparation, send, consent, signer intent, cryptographic signing, completion, and evidence finalization.

003B requires that once a workflow crosses any boundary that the owning contract declares signing/evidence-sensitive, the exact input revision must already be fixed.

If content changes after such a boundary:

- the previous exact binding remains historical evidence;
- the changed content is a new revision;
- the workflow must follow an explicit later-defined transition, restart, replacement, invalidation, or re-consent rule;
- Signthos must not silently preserve old intent as if it applied to new bytes.

003B does not choose which workflow states require re-consent; that belongs to 003C/005.

## Signed revision preservation

A revision that participates in cryptographic or other canonical signing evidence must never be overwritten in place.

Any later operation that changes its bytes produces a new revision, even when the operation is described as:

- adding another signature;
- embedding timestamp material;
- attaching validation material;
- changing metadata;
- optimizing/compressing;
- sanitizing/repairing;
- applying a visual mark.

A later signing specification may model valid incremental PDF updates and multi-signature chains, but each exact byte state remains separately identifiable and auditable under the revision model.

003B does not define PAdES levels, CMS structures, certificates, timestamps, trust policy, or legal effect.

## Provider-result contract

Any future provider operation that can return document bytes must report semantic effect in a form that lets the caller preserve revision invariants.

Minimum semantic requirements:

```text
ProviderContentResult {
  declared_effect
  input_revision_id
  output_bytes_present
  output_content_digest?
  output_media_type?
  output_byte_length?
}
```

Rules:

1. `READ_ONLY` plus changed output bytes is an invariant violation;
2. `CONTENT_CHANGING` output cannot be installed as the input revision;
3. unknown/rewrite-capable output is verified against exact content identity before deciding whether a new revision is required;
4. provider-local document/version IDs do not replace Signthos revision identity;
5. provider claims are not trusted as sole proof that bytes did or did not change.

Concrete provider interfaces belong to 003E.

## Stale-write and conflict contract

A mutation request must identify the revision state it intends to modify or supersede.

Minimum semantic precondition:

```text
MutationPrecondition {
  document_id
  expected_revision_id
  expected_content_digest?
}
```

A stale client must not silently overwrite a newer document state.

If the canonical current/working revision no longer matches the request's expected revision under the later owning write policy, the operation must produce an explicit conflict/version-mismatch result or a separately authorized branch/fork outcome. Last-write-wins is not the default across signing/evidence-sensitive boundaries.

Required properties:

- conflict is machine-readable;
- conflict does not mutate either revision merely to resolve itself;
- retry requires an explicit fresh precondition or later-defined merge/rebase operation at the domain level;
- signing/evidence bindings remain attached to their historical exact revision regardless of current alias movement.

003B does not define collaborative editing or merge algorithms.

## Alias movement contract

Aliases such as `current_revision` or `working_revision` may move only as an explicit domain-state operation defined by a later owning contract.

Alias movement:

- never changes revision bytes;
- never changes revision identity;
- never rewrites historical evidence;
- never retargets an existing signing-input binding;
- may fail with a conflict when expected state is stale.

`latest_revision` must not be used as an irreversible signing/evidence reference.

## No-op and equal-byte result semantics

An operation may execute and produce bytes identical to the input.

003B does not require a new revision solely because a command was attempted. The later owning operation contract must decide whether provenance/audit requirements warrant a distinct non-content event or derived artifact.

For canonical document revision identity:

- if exact canonical bytes are unchanged, content change alone does not require a new revision;
- if exact bytes differ, a new revision is mandatory;
- equality of bytes does not collapse already distinct historical revision identities that were legitimately created for separate domain reasons.

## Failure semantics

A content-transforming operation that fails before a complete valid output is accepted must not partially replace the input revision.

Minimum failure classes for later stable-error ownership include:

- invalid input;
- malformed/untrusted document;
- unsupported capability/media type;
- provider unavailable;
- resource limit exceeded;
- conflict/version mismatch;
- output verification failure;
- internal invariant violation.

003B does not freeze final error codes; 003D owns the stable error taxonomy.

## Atomicity requirement

Where a later implementation creates a revision and updates a mutable alias or workflow pointer, the externally visible outcome must not expose a state in which:

- the alias points to nonexistent/unverified revision content;
- the new revision exists as canonical replacement while required identity/integrity metadata is missing;
- an existing signing/evidence binding is silently switched to the new revision.

Concrete transaction/storage mechanisms belong to 003F and later implementation grains.

## Derived artifacts boundary

Rendering previews, thumbnails, extracted text, OCR text, page images, comparison data, or other derived outputs are not automatically `DocumentRevision` values.

A later owning contract must classify whether an output is:

- ephemeral/derived evidence;
- cache/projection;
- export artifact;
- canonical replacement/new document revision.

If a derived processor's output becomes canonical document bytes, normal new-revision rules apply.

003B does not define derived-artifact storage or cache invalidation.

## Evidence binding

Evidence about content-changing operations must identify the exact input and, when applicable, output revision identities.

A future audit/evidence event should be able to state at least:

```text
input_revision_id
output_revision_id?
operation_class
result_class
provider_ref?
canonical_timestamp
```

Sensitive content is minimized by default. Provider references do not become canonical resource identity.

Event taxonomy and stable payload versioning belong to 003D.

## Adversarial qualification cases

### Case A — edit after signing intent is bound

Given an exact signing-input binding to revision `R1`, an edit that changes bytes must create `R2` and cannot silently move the existing binding from `R1` to `R2`.

Expected contract result: historical binding remains on `R1`; later 003C/005 policy decides restart/re-consent/replacement semantics.

### Case B — provider claims read-only but returns changed bytes

Given input `R1`, a provider operation classified `READ_ONLY` returns document bytes whose exact content identity differs.

Expected contract result: invariant violation; changed bytes are not accepted as `R1` and are not silently treated as harmless output.

### Case C — non-PDF sent directly to signing

Given source revision `R1` with non-PDF media type where later signing policy requires PDF, a request attempts signing without conversion.

Expected contract result: fail/unsupported precondition. A conversion must create distinct revision `R2` before any signing-input binding to the PDF bytes.

### Case D — metadata rewrite changes bytes

A UI action described as “metadata only” rewrites embedded PDF metadata and changes the exact digest.

Expected contract result: classify by actual byte effect; new revision required.

### Case E — latest alias moves after envelope creation

An envelope/evidence-sensitive binding resolves `latest_revision` to `R1`; later a new revision `R2` becomes latest.

Expected contract result: existing binding remains `R1`. Alias movement does not retarget it.

### Case F — stale client mutation

Client reads `R1`; another actor establishes `R2` as the later write target; the stale client submits a mutation preconditioned on `R1`.

Expected contract result: explicit conflict/version mismatch or later-authorized fork semantics, never silent overwrite of `R2`.

### Case G — equal-byte processor result

A rewrite-capable provider returns bytes whose exact digest equals the input revision.

Expected contract result: no content-change-driven revision creation is required solely from execution; audit/provenance handling remains separately owned.

### Case H — second signature creates new exact bytes

A later signing provider applies a valid incremental update to an already signed PDF revision.

Expected contract result: the post-update exact byte state has a distinct revision identity while earlier signed revision bytes and evidence remain addressable.

## Security and privacy invariants

003B carries forward these fail-closed constraints:

- signing/evidence references bind exact immutable revision identity;
- stale writes do not silently overwrite newer signing-relevant state;
- provider effect claims are verified where byte identity matters;
- local-only mode cannot silently invoke network merely to classify or transform content;
- heavy/untrusted processors receive no signing keys or control-plane secrets by default;
- failed or partial transforms do not replace canonical input revisions;
- verification uncertainty is never converted to success;
- sensitive document content is not required in logs/events for revision identity.

## Explicit deferred decisions

003B intentionally does not decide:

- digest algorithm/encoding policy;
- UUID/ULID/entity-ID encoding;
- PDF structural signability criteria;
- conversion engine/provider selection;
- PDF parser/editor implementation;
- exact operation capability catalog;
- envelope cardinality and lifecycle states;
- recipient roles/states;
- field placement/completion lifecycle;
- signer consent/re-consent state machine;
- authorization policy;
- final event/error codes;
- provider wire/interface types;
- persistence schema or transaction mechanism;
- API versioning/idempotency transport behavior;
- PAdES/CMS/certificate/timestamp/trust/legal semantics;
- collaboration merge algorithms;
- Specification 004 implementation.

Owners remain 003C, 003D, 003E, 003F, later Specification 005, and other separately authorized units as defined by the canonical plan.

## Qualification checklist

003B is merge-qualified only if all are true for the exact final head:

- [x] canonical predecessor main is `4e1885851bd80eaae1b38c62eb0bfeec65fb2d8c`;
- [x] 003A dependency is canonical;
- [x] scope is planning/contract qualification only;
- [x] operation-effect classes distinguish actual byte effect from user-facing labels;
- [x] byte changes deterministically require a new revision;
- [x] immutable signing-input binding cannot silently follow aliases;
- [x] non-PDF conversion produces a distinct revision before PDF signing binding where required;
- [x] signed/signing-bound historical revisions remain immutable/addressable;
- [x] provider misclassification and unknown rewrite behavior fail closed;
- [x] stale-write conflict semantics prevent silent overwrite;
- [x] adversarial cases cover every canonical `plan.md` requirement plus equal-byte and multi-signature edge cases;
- [x] deferred decisions prevent implementation-by-assumption;
- [x] zero upstream-derived/product/runtime/dependency/provenance/migration bytes are introduced;
- [ ] exact-head workflow/check/provider state is accounted truthfully;
- [ ] independent substantive review evaluates the complete exact final base/head;
- [ ] all material findings are repaired forward-only and amended head re-reviewed when necessary;
- [ ] unresolved material review threads are zero;
- [ ] mandatory exact-head premerge proof is recorded;
- [ ] guarded merge uses exact `expected_head_sha`;
- [ ] post-merge verification proves ordered ancestry, reviewed-head/merge tree equality or exact bounded delta, signature, exact surface, and successor state.

## Candidate result

If and only if this exact 003B qualification becomes canonical after full Diffciplane qualification and live post-merge successor reread does not narrow authority, the expected state is:

```text
003B_REVISION_AND_IMMUTABLE_SIGNING_INPUT_QUALIFICATION = CLOSED_CANONICAL
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
NEXT_CANDIDATE_UNIT = 003C_ENVELOPE_RECIPIENT_FIELD_WORKFLOW_QUALIFICATION
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

The post-merge successor analysis remains controlling. This artifact itself does not authorize 003C or implementation.