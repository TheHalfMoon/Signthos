# Specification 003 — Plan

Status: `SHAPING_CANDIDATE / PLANNING_ONLY`
Issue: #6
Canonical shaping base: `89146441dbd3cbadcddbcd24dc0741b4ecdc14e1`

## Planning contract

This plan decomposes Specification 003 using SpecGrain and qualifies each transition using Diffciplane.

The plan does not authorize implementation merely by naming a grain. A future implementation transition requires a separate canonical authorization whose exact scope, allowed paths, dependencies, tests, security constraints, and expected evidence are explicit.

Specification 003 starts only because Specification 002 is now `CLOSED_CANONICAL` through PR #85 and Issue #5 is closed completed.

## Current repository truth

At the shaping base:

- canonical `main` is `89146441dbd3cbadcddbcd24dc0741b4ecdc14e1`;
- Specification 002 is closed for its current authorized import surface;
- canonical Documenso source-import records are exactly `U001-I0001` and `U001-I0002`;
- imported destinations are exactly `.npmrc` and `packages/prisma/schema.prisma`;
- selected 002C auth source is excluded rights-blocked/no-import;
- 002D–002G are not selected for the current import surface;
- 002H is optional/not selected;
- no Documenso auth/document/editor/API/job runtime implementation exists in Signthos;
- Issue #6 remains `PLANNING_ONLY`.

This means Specification 003 begins as a Signthos-owned contract-design program, not as a mass adapter/refactor of an imported application.

## Stage P — shaping

### Purpose

Make the full Specification 003 problem reviewable before any implementation authority exists.

### Change surface

Stage P may change only:

- `specs/003-signthos-domain-boundary/spec.md`;
- `specs/003-signthos-domain-boundary/plan.md`;
- `specs/003-signthos-domain-boundary/tasks.md`;
- Issue #6 comments/metadata for evidence bookkeeping.

### Required outputs

- exact predecessor and authority statement;
- explicit actual imported-surface truth;
- canonical domain vocabulary;
- mandatory revision/signing-input invariants;
- authorization/event/error/provider boundaries;
- anti-corruption scope constrained to actually inherited/imported representation;
- recursive grain dependency graph;
- future qualification/implementation authorization model;
- security/privacy boundaries;
- deterministic shaping acceptance/merge requirements.

### Stage P exit

Stage P closes only after:

1. exact shaping head is bounded to the three-file planning surface;
2. upstream-derived source bytes added are zero;
3. source-import/provenance/NOTICE/product/runtime/package/dependency/config/workflow/database changes are zero;
4. exact-head workflows/checks are accounted truthfully;
5. independent substantive review evaluates the complete exact head;
6. every material finding is repaired forward-only;
7. the amended exact head is re-reviewed when necessary;
8. unresolved material review threads are zero;
9. premerge proof records exact base/head/surface/check accounting;
10. guarded merge uses `expected_head_sha`;
11. post-merge verification proves ordered ancestry, tree equality, signature status, exact surface, and successor authority.

## Successor discovery after Stage P

Stage P merge does not automatically authorize code.

The canonical post-merge reread must determine whether the next unit is:

- a planning/qualification packet for `003A`; or
- a narrower refinement of one unresolved 003A contract question.

The default candidate is:

`003A_DOMAIN_VOCABULARY_AND_IDENTITY_QUALIFICATION`

That candidate is planning/contract qualification only unless a separate canonical authorization explicitly grants implementation.

## 003A — Domain vocabulary and identity invariants

### Purpose

Freeze the minimum Signthos-owned semantic vocabulary before language-specific types or persistence APIs are implemented.

### Scope in

- identity semantics for `Document`, `DocumentRevision`, `Envelope`, `Recipient`, `Field`, `EvidenceBundle`, `Workflow`;
- opaque identifier expectations;
- exact-content digest model with algorithm tag;
- revision lineage semantics;
- terminology for current/working/signable/signed revisions without conflating aliases with immutable identity;
- origin/revision-reason vocabulary.

### Scope out

- TypeScript/Rust structs;
- JSON/OpenAPI schema implementation;
- database schema changes;
- PDF/signing implementation;
- auth provider implementation;
- migration code.

### Acceptance evidence

- no two entities carry overlapping ownership of the same domain state without an explicit relationship;
- revision identity is exact-content based rather than visual equivalence;
- `Document` identity does not become signing-input identity;
- `Envelope` routing state is not document content state;
- field placement binds to revision/page context;
- terminology supports later provider/API bindings without platform-specific semantics.

### Dependency

Stage P `CLOSED_CANONICAL`.

## 003B — Revision and immutable signing-input contracts

### Purpose

Define the content lifecycle that downstream PDF/signing work must obey.

### Scope in

- content-changing operation classification;
- new-revision semantics;
- immutable signing input;
- conversion revisions for non-PDF inputs;
- signed-revision preservation;
- explicit binding between envelope/evidence and exact revision;
- version/conflict semantics required for safe writes.

### Required adversarial cases

- edit attempted after signing intent bound to revision;
- provider returns changed bytes while claiming read-only behavior;
- non-PDF file sent directly to signing without a conversion revision;
- metadata rewrite changes file bytes;
- “latest revision” alias changes after an envelope is created;
- stale client attempts mutation against an older revision.

### Dependency

003A canonical contract qualification.

## 003C — Envelope, recipient, field and workflow contracts

### Purpose

Separate routing/interaction state from immutable content identity.

### Scope in

- envelope lifecycle vocabulary;
- revision binding rules;
- recipient roles/states;
- recipient identity/authentication evidence separation;
- field ownership, placement, and completion semantics;
- workflow transition contract;
- cancellation/void/expiry semantics at domain level;
- idempotency expectations for repeated transition requests.

### Scope out

- email/SMS delivery implementation;
- UI workflow;
- public API transport;
- webhook implementation;
- signing cryptography.

### Dependency

003A and 003B.

## 003D — Authorization, event and stable error contracts

### Purpose

Make security and machine interoperability explicit before app/server code proliferates.

### Authorization work

Define:

- `Principal`;
- tenant scope;
- resource reference;
- action vocabulary;
- authorization context;
- allow/deny decision and stable reason semantics;
- deny-by-default cross-tenant behavior;
- recipient-specific permissions without treating authentication as authorization.

### Event work

Define separation between:

- domain event;
- command/request;
- provider/runtime event;
- audit/evidence event.

Define event versioning, exact resource/revision binding, timestamp representation, sensitive-data minimization, and replay/idempotency expectations.

### Error work

Define stable machine-readable classes for invalid input, authn, authz, not-found/undisclosed, conflict, unsupported, unavailable, resource limits, malformed document, verification incomplete/unsupported/unavailable, and invariant violation.

### Dependency

003A and the resource semantics from 003C.

## 003E — Provider capability contracts

### Purpose

Prevent browser/native/server/heavy implementations from creating separate hidden domain models.

### Scope in

- provider identity/type;
- declared capabilities;
- capability versioning;
- operation contract shape at semantic level;
- read-only vs revision-creating classification;
- unsupported/unavailable distinction;
- cancellation/timeout/resource-limit hooks;
- local/network transition visibility;
- provider result binding to exact input/output revision identities.

### Security constraints

- local-only operation cannot silently invoke network provider;
- heavy provider has no signing-key/control-plane-secret access by default;
- malformed/untrusted input remains a distinct trust boundary;
- capability mismatch fails explicitly.

### Dependency

003A–003D.

## 003F — Prisma anti-corruption and migration mapping

### Purpose

Map the one actually imported domain-adjacent source artifact into the new Signthos contracts without letting persistence representation own product semantics.

### Scope in

- inventory relevant models/fields/relations from canonical `packages/prisma/schema.prisma`;
- map each relevant persistence concept to Signthos domain terminology;
- identify missing/overloaded/ambiguous concepts;
- identify adapter boundaries;
- classify which future changes would be additive migration, rename, compatibility adapter, or breaking migration;
- define data-preservation/rollback evidence needed for later migration implementation.

### Scope out

- modifying Prisma schema;
- creating migrations;
- generating clients;
- installing Prisma dependencies;
- copying any non-imported Documenso source.

### Dependency

003A–003E stable enough to own semantics.

## 003G — Bounded product naming/configuration migration

### Purpose

Replace cosmetic/upstream naming only after domain ownership is explicit.

### Scope in

- inventory product-facing naming/configuration seams;
- separate stable external compatibility identifiers from internal names;
- define bounded migration clusters;
- define deprecation/removal policy for aliases;
- define which naming changes are documentation-only vs behavior-affecting.

### Prohibition

Do not combine broad rename with persistence migration, source import, license-boundary change, provider behavior, or feature implementation.

### Dependency

003A–003F.

## 003H — convergence and closeout

### Purpose

Prove Specification 003 actually established stable contracts and anti-corruption boundaries before downstream specs consume them.

### Closeout evidence must include

- list of every canonically authorized 003 grain;
- exact merge/post-merge evidence for each completed grain;
- contract test/evidence summary;
- authorization invariants and adversarial cases;
- revision/signing-input immutability proof;
- provider contract consistency proof for any implemented provider surfaces;
- exact Prisma adapter/migration disposition;
- naming/config migration disposition;
- zero unresolved material review findings;
- current successor analysis for Specification 004.

Specification 004 is not authorized merely because an earlier 003 grain exists.

## Implementation authorization model

For any future 003 implementation grain, require a separate canonical authorization artifact that states all of:

- exact grain identity;
- canonical prerequisite commits;
- one bounded purpose;
- scope-in;
- scope-out;
- exact allowed repository paths;
- language/package/dependency choices;
- acquisition authority, if dependencies are required;
- database/migration authority, if applicable;
- runtime/provider/network authority, if applicable;
- test fixtures and evidence requirements;
- security/privacy constraints;
- provenance/rights boundary;
- focused/full test commands;
- exact-head CI/check requirements;
- independent substantive review requirements;
- expected-head merge requirement;
- post-merge verification and ledger reconciliation.

Absent that artifact, implementation authority is `ABSENT`.

## Testing strategy

### Contract tests

When implementation becomes authorized, contract tests should be written against Signthos semantics rather than provider internals.

Minimum cross-cutting tests:

- exact revision digest/identity stability;
- content change creates new revision;
- signed/signing-bound revision cannot be mutated;
- envelope state changes do not rewrite document bytes;
- field placements reject mismatched revision/page context;
- authenticated principal without resource permission is denied;
- cross-tenant resource access is denied;
- stable machine-readable error classes remain consistent;
- unsupported provider capability is not reported as unavailable success;
- local provider path does not silently use network;
- provider result reports correct input/output revision relationship.

### Adapter tests

For any persistence/anti-corruption adapter:

- deterministic mapping;
- no silent data loss;
- explicit unknown/unsupported states;
- compatibility fixtures for existing canonical data shape;
- migration round-trip or rollback evidence when a migration is later authorized.

### Security tests

Later implementation must include negative/adversarial cases for:

- cross-tenant access;
- resource enumeration/existence leakage;
- stale revision mutation;
- replayed envelope transition;
- provider capability spoof/mismatch;
- untrusted document failure propagation;
- silent network fallback;
- sensitive content accidentally emitted to logs/events.

## Evidence classes

Every future finding or test result must state whether it proves:

- imported-source fact;
- observed external behavior;
- Signthos desired contract;
- implementation conformance;
- runtime/platform evidence.

Do not promote one evidence class into another by implication.

## Diffciplane workflow for every future grain

1. re-read exact canonical `main` and active 003 ledger;
2. verify dependency-order authority;
3. create one bounded branch from exact canonical base;
4. implement only allowed paths/actions;
5. run focused tests/evidence;
6. run full applicable regression/validation;
7. record exact-head CI/check accounting;
8. obtain independent substantive exact-head review;
9. repair every material finding forward-only;
10. re-review amended exact head;
11. require zero unresolved material threads;
12. reverify rulesets/branch protection/mergeability and exact base/head immediately before merge;
13. merge with exact expected-head protection;
14. verify ordered parents, tree equality or bounded merge delta, signature, post-merge checks, and exact repository surface;
15. reconcile task ledger and derive successor authority from the new canonical state.

## Parallelism

Do not parallelize grains that share unresolved semantics.

Potentially safe parallel work may be considered only after canonical contracts remove ambiguity and branches do not mutate overlapping unsafe surfaces.

In particular:

- 003B and 003C should not race before 003A identity semantics stabilize;
- 003D authorization depends on resource semantics and should not invent resource types independently;
- 003E providers must not precede shared operation/revision semantics;
- 003F persistence mapping must not define the domain model backward from Prisma;
- 003G renaming should wait until contract/persistence seams are known.

## Stage P completion result candidate

If this exact shaping package becomes canonical after full Diffciplane qualification, the intended result is:

```text
SPEC_003_STAGE_P = CLOSED_CANONICAL
SPEC_003_STATUS = PLANNING_ACTIVE
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
NEXT_CANDIDATE_UNIT = 003A_DOMAIN_VOCABULARY_AND_IDENTITY_QUALIFICATION
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

The post-merge successor analysis remains controlling; these values are candidate outcomes, not pre-merge authority.