# Specification 003B — Revision and Immutable Signing-Input Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_CONTRACT_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `4e1885851bd80eaae1b38c62eb0bfeec65fb2d8c`
Owning specification: `003-signthos-domain-boundary`

## Canonical authority

Specification 003A is canonical only after PR #89 guarded-merged and passed post-merge verification:

```text
003A_PREMERGE_MAIN = b9ad2e93556136f4df95b56b39ea231d75d64453
003A_REVIEWED_HEAD = d729622504da8b3bd6a99ee596f4fcc0622ef5f5
003A_REVIEWED_HEAD_TREE = 96ba07e45b900f93c2baba92d94dbc802adaa11a
003A_REVIEW = github:issue-comment:5560596626 = NO_MATERIAL_FINDINGS
003A_MERGE = 4e1885851bd80eaae1b38c62eb0bfeec65fb2d8c
003A_MERGE_TREE = 96ba07e45b900f93c2baba92d94dbc802adaa11a
003A_TREE_EQUALITY = PASS
003A_SIGNATURE = VERIFIED_VALID
003A_POSTMERGE_PROOF = github:issue-comment:5560862193
```

The fresh post-003A successor reread is recorded in Issue #6 comment `5560869554`:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 003B_REVISION_AND_IMMUTABLE_SIGNING_INPUT_CONTRACT_QUALIFICATION
003B_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
003B_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
003C_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact exercises only that bounded planning/contract authority.

## Purpose

Freeze the implementation-independent revision lifecycle and immutable signing-input invariants required by later envelope, authorization, provider, persistence, PDF, and signing work.

003B answers only contract questions about:

- when exact document bytes are considered unchanged or changed;
- when a new `DocumentRevisionId` is mandatory;
- how a signing-sensitive operation binds immutable input;
- how conversion output is represented without overwriting its source revision;
- how signed/signing-bound revisions are preserved;
- how stale writes and concurrent revision movement fail safely.

003B does **not** implement any of those rules.

## Allowed change surface

This qualification may add only Signthos-authored planning/contract material under:

`specs/003-signthos-domain-boundary/**`

It authorizes none of:

- source import or provenance expansion;
- package or lockfile mutation;
- dependency acquisition;
- TypeScript, Rust, SQL, Prisma, JSON Schema, OpenAPI, generated code, or runtime types;
- database migration or persistence mapping;
- PDF parsing, rendering, normalization, conversion, signing, verification, or cryptographic execution;
- provider/runtime/network/credential execution;
- envelope/recipient/field/workflow lifecycle implementation;
- authorization implementation;
- public API or webhook implementation;
- Specification 004 work.

## Evidence class

Every new rule below is `SIGNTHOS_OWNED_DESIRED_CONTRACT` derived from canonical Stage P and 003A contracts.

No rule below claims that equivalent Documenso application behavior was imported. The canonical imported Documenso source surface remains only `.npmrc` and `packages/prisma/schema.prisma`.

## Predecessor invariants inherited from 003A

003B depends on these canonical 003A invariants:

1. `DocumentId`, `DocumentRevisionId`, `ContentDigest`, and `EnvelopeId` are distinct identity/value roles.
2. `ContentDigest` represents algorithm-tagged exact-byte identity.
3. canonical revision bytes are immutable.
4. a content-changing operation requires a new revision.
5. signing/evidence-sensitive references resolve to exact revision identities rather than mutable aliases.
6. alias movement cannot silently retarget an established exact binding.
7. `media_type` is explicit and `byte_length`, when available, describes the exact revision snapshot.
8. provider-local identity is not canonical Signthos identity.
9. authentication does not imply resource authorization.
10. legal/signature validity is not inferred from timestamps, provider claims, or audit events.

003B narrows revision/write semantics while preserving ownership of lifecycle details by later grains.

## Operation classification

Every operation that may interact with document content is classified at the contract boundary as one of:

```text
BYTE_PRESERVING_VERIFIED
BYTE_CHANGING
BYTE_EFFECT_UNKNOWN
NO_BYTE_OUTPUT
```

### `BYTE_PRESERVING_VERIFIED`

The operation has produced or inspected bytes and exact-byte comparison proves that the canonical output bytes equal the input revision bytes under the applicable `ContentDigest` algorithm.

Contract rules:

- byte equality does not create a new identity automatically;
- the existing revision may remain the exact content identity when no separately addressable snapshot is intentionally created;
- a separately tracked snapshot may still receive a distinct revision identity even when bytes are equal;
- provider or operation labels such as `read_only`, `normalize`, or `no_change` are insufficient without exact-byte verification when output bytes exist.

### `BYTE_CHANGING`

The canonical output bytes are known to differ from the input revision bytes.

Contract rule:

`BYTE_CHANGING => NEW_DOCUMENT_REVISION_REQUIRED`

The input revision remains immutable and preserved.

### `BYTE_EFFECT_UNKNOWN`

The system cannot prove whether an operation preserved exact bytes.

Contract rules:

- `BYTE_EFFECT_UNKNOWN` must never be silently treated as `BYTE_PRESERVING_VERIFIED`;
- a caller may fail/abstain, retain the original revision without accepting uncertain output, or preserve uncertain output as a distinct later-authorized revision;
- uncertain provider behavior cannot overwrite the input revision;
- implementation-specific quarantine/storage behavior is deferred.

### `NO_BYTE_OUTPUT`

The operation changes no canonical document bytes and produces no replacement byte stream.

Examples may include changes to separately stored workflow or presentation metadata, provided that those values are not embedded into or used to redefine canonical revision bytes.

If a metadata operation rewrites the document file and therefore changes serialized bytes, it is `BYTE_CHANGING`, not `NO_BYTE_OUTPUT`.

## Byte-changing operation contract

The following classes are byte-changing whenever their result differs at the exact-byte level:

- editing document content;
- conversion between file formats;
- PDF normalization or rewriting;
- redaction or flattening;
- page insertion, removal, reordering, rotation, crop-box/media-box rewrite, or geometry rewrite;
- annotation or form-value embedding;
- embedded metadata rewrite;
- encryption/decryption output rewrite;
- provider-produced transformed bytes;
- signature-container or signed-file output that changes bytes;
- any save/re-encode operation whose output digest differs from its input.

Naming an operation `read-only`, `safe`, `lossless`, `metadata-only`, or similar does not override exact byte truth.

## Revision creation contract

For every mandatory new revision:

```text
NewRevision {
  new_document_revision_id
  document_id
  content_digest
  media_type
  byte_length?
  parent_revision_id?
  origin
  revision_reason
}
```

Contract invariants:

1. `new_document_revision_id` must not equal the input `DocumentRevisionId`.
2. The original revision remains unchanged and addressable.
3. The new revision belongs to the same `Document` for ordinary content evolution unless a later canonical contract explicitly defines a bounded import/fork relation.
4. `content_digest` describes the exact new bytes.
5. `media_type` describes the new bytes rather than the source format.
6. `byte_length`, when available, describes the same exact new byte snapshot.
7. `parent_revision_id`, when used for ordinary evolution, identifies the revision from which the new content was derived.
8. `origin` and `revision_reason` must distinguish meaningful contract causes without encoding provider-specific wire details as domain identity.
9. creation of a new revision does not automatically move any alias, envelope, field, evidence, or workflow binding.
10. moving `current_revision` or another mutable alias is a separate later-authorized decision.

## Prohibition on in-place mutation

The following semantic operation is invalid:

```text
overwrite_bytes(existing_document_revision_id, different_bytes)
```

No implementation may later claim conformance while changing canonical bytes behind an existing `DocumentRevisionId`.

If different bytes must be retained, a new revision identity is required.

## Conversion revision contract

Non-PDF inputs that must participate in a PDF-specific signing flow require an explicit conversion boundary before a signing-input binding can be established.

For a source revision `R_source` and converted PDF bytes:

```text
R_source
  -- explicit conversion relation -->
R_pdf
```

Required invariants:

1. `R_source` remains immutable and preserved.
2. `R_pdf` has a distinct `DocumentRevisionId` whenever conversion output differs in bytes.
3. `R_pdf.media_type` identifies the converted format.
4. `R_pdf.content_digest` and `byte_length?` describe the converted bytes.
5. conversion provenance identifies the source revision at contract level without requiring a provider-specific persistence schema.
6. a PDF-specific signing intent binds `R_pdf`, not a mutable alias and not the non-PDF source revision.
7. reconversion that produces different bytes creates another revision rather than rewriting `R_pdf`.
8. deterministic byte equality between two conversion runs does not force identity collapse; revision identity policy may preserve separate attempts when separately addressable snapshots are required.

003B does not select a conversion engine, file-format library, sandbox, provider, or network path.

## Immutable signing-input contract

A signing-sensitive intent must resolve its input to an immutable exact revision before any irreversible signing operation is allowed.

Minimum contract-level binding:

```text
SigningInputBinding {
  document_revision_id
  content_digest
  media_type
  byte_length?
}
```

Required invariants:

1. `document_revision_id` is exact and immutable.
2. `content_digest` must correspond to that same revision snapshot.
3. `media_type` must correspond to the same revision snapshot.
4. `byte_length`, when recorded, must correspond to the same revision snapshot.
5. a mutable alias such as `latest_revision`, `current_revision`, `working_revision`, or `signable_revision` must be resolved before binding and cannot remain the binding key.
6. later alias movement cannot retarget an established signing-input binding.
7. later creation of a newer revision cannot mutate or reinterpret the established signing-input binding.
8. a signing operation must not silently substitute a transformed revision for the bound input.
9. if required transformation produces different bytes, that transformation creates a distinct revision that must be explicitly selected/bound before signing.

The representation, storage, API encoding, and cryptographic use of this binding are deferred.

## Signing output and signed-revision preservation

003B does not define cryptographic signature formats or legal validity. It does define content preservation around any later signing operation.

If a later signing implementation produces output bytes different from its bound input revision:

```text
BOUND_INPUT_REVISION != SIGNED_OUTPUT_REVISION
```

Required invariants:

1. signed output must never overwrite the bound input revision.
2. differing signed output bytes require a distinct revision identity or a later canonical artifact identity explicitly designed for signed output; until such an alternative identity is canonically established, the safe default contract is a distinct `DocumentRevisionId`.
3. evidence must remain capable of identifying the exact input revision and exact resulting signed bytes/revision as applicable.
4. later edits occur from an explicitly selected revision and cannot rewrite signed bytes in place.
5. the existence of a newer edited revision does not invalidate, replace, or retarget evidence bound to an earlier signed revision.
6. the label `signed_revision` remains a classification/alias and does not itself prove cryptographic or legal validity.

Detailed signature/evidence relations remain owned by later signing/evidence specifications.

## Envelope and evidence exact-binding contract

003B freezes only revision-binding safety, not envelope lifecycle or cardinality.

At any signing/evidence-sensitive boundary:

- an envelope reference to content resolves to one or more exact `DocumentRevisionId` values according to later 003C cardinality rules;
- an evidence item whose meaning depends on content references the exact revision identity it evaluated or recorded;
- neither may depend only on `DocumentId` or a mutable alias;
- alias movement after binding does not mutate the binding;
- replacement content requires a new revision followed by an explicit later-authorized rebinding/transition, if such a transition is permitted at all.

003B does not define whether an envelope can rebind, when rebinding is legal, or what lifecycle state permits it. Those semantics belong to 003C and later signing specifications.

## Safe-write base contract

Any content-changing write intent must identify the revision state against which the caller prepared the mutation.

Conceptually:

```text
RevisionWriteIntent {
  document_id
  base_document_revision_id
  base_content_digest?
  proposed_operation_class
}
```

Required invariants:

1. `base_document_revision_id` is exact, not a moving alias.
2. when a digest precondition is supplied it must correspond to the stated base revision.
3. a server/runtime must not silently reinterpret a stale intent against a newer current revision.
4. if canonical current/working state has moved in a way that invalidates the caller's base assumption, the operation returns a conflict/abstention outcome rather than silently applying to the newer revision.
5. conflict does not imply automatic merge or last-write-wins.
6. explicit retry/rebase/merge semantics require a separately owned contract.
7. a successful byte-changing write creates a new revision rather than mutating the base revision.

003B defines only domain-level precondition/conflict semantics. HTTP status codes, database compare-and-swap mechanics, transactions, locks, and persistence columns remain deferred.

## Version/conflict outcomes

Minimum machine-meaningful contract outcomes for revision-sensitive writes are:

```text
ACCEPTABLE_BASE
STALE_BASE_CONFLICT
BASE_REVISION_UNKNOWN
BASE_DIGEST_MISMATCH
BYTE_EFFECT_UNRESOLVED
OPERATION_UNSUPPORTED
```

These are semantic classes, not final public API error codes.

Rules:

- stale/unknown/mismatched base state cannot become success by fallback to `latest`;
- `BYTE_EFFECT_UNRESOLVED` cannot be downgraded to byte-preserving success;
- `OPERATION_UNSUPPORTED` cannot be represented as successful no-op when a content change was requested;
- later 003D stable error contracts own final machine-readable error taxonomy and disclosure policy.

## Concurrent revision semantics

003B does not require a strictly linear document history.

Contract constraints:

1. concurrent writers may produce competing candidate revisions from the same base.
2. no competing candidate may overwrite another revision's bytes.
3. whether both candidates become canonical lineage members, one is rejected, or an explicit merge revision is created remains a later persistence/product policy decision.
4. any chosen winner/current alias movement must be explicit and must not rewrite historical identities.
5. envelope/evidence/signing bindings remain attached to the exact revisions they already reference.

This avoids accidentally freezing database locking or branching strategy in a planning contract.

## Required adversarial cases

### A — Edit after signing intent

Given signing intent is bound to `R1` and a user edits the document:

- `R1` remains unchanged;
- edited bytes become `R2`;
- signing intent remains bound to `R1` unless a later canonical lifecycle contract explicitly permits and records rebinding;
- `latest_revision = R2` cannot silently retarget the intent.

### B — Provider claims read-only but returns changed bytes

Given provider output digest differs from input revision digest:

- provider metadata saying `read_only=true` is irrelevant to byte identity;
- input revision is preserved;
- returned differing bytes require a distinct revision if accepted;
- if byte comparison cannot be completed, state is `BYTE_EFFECT_UNRESOLVED`, not verified unchanged.

### C — Non-PDF source sent to a PDF-specific signing path

Given `R_source.media_type` is non-PDF:

- direct substitution into a PDF-specific signing-input contract is invalid;
- explicit conversion produces/identifies a PDF revision `R_pdf`;
- signing binds `R_pdf` exactly;
- source revision remains preserved.

### D — Metadata rewrite changes bytes

Given an embedded metadata update changes file bytes:

- operation is `BYTE_CHANGING`;
- a new revision is required;
- the prior revision cannot be relabeled as if its bytes changed in place.

### E — `latest_revision` moves after envelope creation

Given an envelope is bound to exact revision `R1` and `latest_revision` later becomes `R2`:

- envelope binding remains `R1`;
- no implicit retargeting is permitted.

### F — Stale client mutation

Given client prepared a mutation against `R1` but the relevant working/current state advanced to `R2`:

- runtime must not silently apply the mutation to `R2`;
- result is conflict/abstention unless a later explicit rebase/merge contract is used;
- `R1` and `R2` bytes remain immutable.

### G — Signing output changes bytes

Given signing is bound to input revision `R1` and later signing output bytes differ:

- `R1` remains unchanged;
- output cannot reuse `R1` as if its bytes changed;
- distinct signed output identity is required under the safe default contract;
- evidence can preserve the relation between exact input and output.

### H — Transformation result happens to match input bytes

Given a nominal conversion/normalization returns the exact same digest and byte length as its source:

- exact-byte identity is verified unchanged;
- a new revision is not mandatory solely because an operation was attempted;
- a separately tracked operation result may still receive a distinct revision identity if later product policy requires an addressable snapshot;
- no identity collapse is forced.

## Cross-grain ownership boundaries

003B owns:

- exact-byte operation classification;
- mandatory new-revision rule for changed bytes;
- conversion-revision semantics;
- immutable signing-input revision binding;
- preservation of signed/signing-bound revisions;
- revision-safe write preconditions and stale-base conflict semantics.

003B explicitly does **not** own:

- envelope lifecycle, routing, rebinding permission, recipient/field/workflow transitions — 003C;
- authorization decisions, stable final error taxonomy, domain/event taxonomy — 003D;
- provider capability/wire/runtime contracts — 003E;
- Prisma mapping, storage, transaction, optimistic-lock implementation, migration design — 003F;
- naming/configuration migration — 003G;
- Specification 003 closeout — 003H;
- PDF engine behavior — Specification 004 if/when authorized;
- signing cryptography/evidence implementation — later specifications if/when authorized.

## Deferred decisions

003B intentionally does not select:

- identifier encoding;
- digest algorithm suite;
- database version counters;
- ETags or HTTP precondition headers;
- transaction isolation level;
- locking strategy;
- branch/merge UI;
- conversion engine;
- PDF library;
- signature format or PAdES profile;
- timestamp/certificate provider;
- API route shape;
- persistence schema;
- network/provider execution policy beyond inherited no-silent-network rules.

No implementation may later infer one of these decisions from omission.

## Qualification assertions

The 003B candidate is acceptable only if independent substantive exact-head review confirms all of the following:

1. every known byte-changing operation requires a new revision;
2. unknown byte effect fails closed rather than becoming byte-preserving success;
3. in-place revision-byte mutation is prohibited;
4. non-PDF conversion is an explicit revision boundary before PDF-specific signing;
5. signing-sensitive bindings use exact revision identity and exact-content metadata rather than aliases;
6. later alias movement cannot retarget established bindings;
7. differing signing output cannot overwrite its immutable input revision;
8. stale writes cannot silently apply against a newer revision;
9. concurrent-revision rules do not prematurely select persistence/locking strategy;
10. 003C–003F ownership is preserved;
11. no cryptographic/legal validity claim is created;
12. no implementation/source/dependency/provider/migration authority is created;
13. the final exact diff remains limited to Signthos-authored planning/contract material;
14. 003C remains only a candidate successor until 003B canonicalization and a fresh post-merge reread.

## Expected candidate result

Before qualification/merge:

```text
003A_STATUS = CANONICAL_MERGED_POSTMERGE_VERIFIED
003B_STATUS = QUALIFICATION_CANDIDATE
003B_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
003B_IMPLEMENTATION_AUTHORITY = ABSENT
003C_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

If and only if this exact 003B candidate passes truthful exact-head check accounting, independent substantive exact-head review, forward-only finding reconciliation, zero unresolved material review threads, guarded expected-head merge, mechanical post-merge verification, and fresh canonical successor reread, 003C eligibility may then be derived from live truth.

This artifact itself does not grant that successor authority.