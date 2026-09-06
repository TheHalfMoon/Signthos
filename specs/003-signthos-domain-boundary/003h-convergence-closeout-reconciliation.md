# Specification 003H — Convergence and Closeout Reconciliation

Status: `CLOSEOUT_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `ee6fa17bedc6a346bc25874f9c6c4174fc1aed3d`
Owning specification: `003-signthos-domain-boundary`

## Canonical authority

Fresh post-003G Issue #6 reconciliation authorizes exactly:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 003H_CONVERGENCE_AND_CLOSEOUT_RECONCILIATION
003H_AUTHORITY = PLANNING_CLOSEOUT_RECONCILIATION_ONLY
003H_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_CLOSEOUT = NOT_YET_CANONICAL
SPEC_004_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
```

This artifact exercises only that bounded closeout-reconciliation authority.

It authorizes no product/runtime code, source import, dependency acquisition, Prisma schema mutation, migration, generation, database/runtime execution, provider/network execution, PDF/signing implementation, credentials, deployment, or Specification 004 work.

## Purpose

Prove that the currently authorized Specification 003 planning/contract program converged coherently across 003A through 003G, preserve all authority boundaries, and establish the exact evidence that must become canonical before any Specification 004 successor eligibility can be derived.

003H is reconciliation, not implementation.

## Canonical grain chain

The current canonical merge chain is:

```text
Stage P shaping      PR #86 -> d822f3c3ab3bc773efc587ce61f7fc96344098f6
Stage P closeout     PR #88 -> b9ad2e93556136f4df95b56b39ea231d75d64453
003A                 PR #89 -> 4e1885851bd80eaae1b38c62eb0bfeec65fb2d8c
003B                 PR #90 -> 342e08a1ffc7634242c8411d1e4055fa5e8af227
003C                 PR #91 -> 9dae6ca33110f0965a8074294bdda5835134340f
003D                 PR #92 -> 59c459fcc2d9068cc96c1f7ff95055e26020162a
003E                 PR #94 -> 5a8d1728810c7bb7f9df4ffc170c656d7314fae7
003F                 PR #95 -> 2a4acb8d788b24ecd2034b8f1b00faf7dbca55b7
003G                 PR #96 -> ee6fa17bedc6a346bc25874f9c6c4174fc1aed3d
```

PR #87 and PR #93 were closed without merge and are noncanonical candidate history. Their branch/review/check evidence must not be used as canonical grain evidence.

## Grain convergence summary

### 003A — domain vocabulary and identity

Canonical result:

- `Document`, `DocumentRevision`, `Envelope`, `Recipient`, `Field`, `EvidenceBundle`, and `Workflow` have distinct identity ownership;
- opaque entity identity remains distinct from exact-byte content digest;
- content-changing operations require a new revision identity;
- aliases cannot silently retarget irreversible bindings;
- authentication/contact/provider identity is not resource authorization.

Implementation authority remains absent.

### 003B — revision and immutable signing input

Canonical result:

- byte-changing operations require fresh revision identity;
- unknown byte effect fails closed;
- signing-sensitive bindings target exact immutable revisions, not moving aliases;
- conversion is an explicit revision boundary where required;
- signed/signing-bound inputs cannot be mutated in place;
- provider-result rules remain limited to byte effect/revision identity and do not absorb provider trust/locality ownership.

Implementation authority remains absent.

### 003C — envelope, recipient, field and workflow

Canonical result:

- envelope lifecycle/routing state is separate from document content identity;
- revision-set binding, recipient participation, field ownership/placement/completion, workflow transitions, cancellation/decline/void/expiry and idempotency are contractually separated;
- required fields belong to blocking recipients;
- valid skipped blocking recipients use explicit waiver semantics rather than false satisfaction.

Implementation authority remains absent.

### 003D — authorization, events and stable errors

Canonical result:

- principal, tenant scope, resource reference and action semantics are explicit;
- authorization is deny-by-default and cross-tenant existence leakage is constrained;
- authentication is not authorization;
- command/request, domain event, provider/runtime event and audit/evidence event classes are non-interchangeable;
- stable machine-readable error and retry classes are independent from provider/raw/localized messages.

Implementation authority remains absent.

### 003E — provider capability contract

Canonical result:

- browser/native/server/heavy providers share one semantic capability model;
- provider identity, capability identity/version, support and runtime availability are distinct;
- operations are classified as read-only or revision-creating;
- local-only work cannot silently fall back to network processing;
- provider success/status cannot redefine domain state or bypass authorization/workflow preconditions;
- heavy providers receive no signing-key/control-plane-secret access by default.

Implementation authority remains absent.

### 003F — Prisma anti-corruption and migration mapping

Canonical result:

- the exact imported `packages/prisma/schema.prisma` remains persistence representation, not domain authority;
- imported schema identity/count facts remain static observations only;
- all imported models are dispositioned against canonical Signthos contracts;
- persistence keys/enums/relations/cascades/JSON/timestamps cannot silently become canonical identities, workflow semantics, authorization, evidence or signing truth;
- future migration classes and rollback/preservation requirements are described without authorizing schema or migration mutation.

Prisma schema mutation, migration, generation, dependency acquisition and database/runtime authority remain absent.

### 003G — bounded naming/configuration migration

Canonical result:

- `Signthos` remains the canonical working product name without implying trademark/domain/package/app-store clearance;
- stable domain language remains generally unbranded;
- product presentation, internal identifiers, config keys, external compatibility IDs, persistence IDs, provenance identities, imported literals, legal identities and governance IDs are separated;
- protections are cumulative rather than mutually exclusive;
- upstream/provenance/legal identities and exact imported source literals are preserve-exact surfaces, not branding debt;
- current live repository truth requires no broad rename or config migration implementation.

Product rename/config mutation implementation authority remains absent.

## Imported-source and rights boundary

Specification 003 does not reopen or broaden Specification 002 rights.

Current imported source remains exactly the canonical Specification 002 surface:

- `.npmrc` through `U001-I0001`;
- `packages/prisma/schema.prisma` through `U001-I0002`.

The Prisma public license conflict remains preserved in provenance and is not normalized away by domain/persistence/naming planning. Selected 002C paths remain excluded rights-blocked/no-import; 002D–002G remain outside the current import surface; 002H remains optional/not selected.

No 003 grain imported additional upstream product/runtime source.

## Cross-grain invariant convergence

The canonical 003A–003G contracts agree on the following mandatory invariants:

1. exact immutable revision identity controls signing-sensitive and evidence-sensitive bindings;
2. content change creates a new revision and cannot mutate signing-bound bytes in place;
3. envelope/workflow/provider/persistence state cannot redefine document byte identity;
4. authentication/contact/provider identity cannot grant resource authorization;
5. cross-tenant access fails closed and sensitive existence is not disclosed by default;
6. provider capability/status cannot redefine canonical workflow or domain event state;
7. local-only operations cannot silently invoke network document processing;
8. unstable provider/raw/localized errors cannot replace canonical machine-readable error semantics;
9. Prisma representation cannot define domain ownership backward;
10. persistence/source/provenance/legal identifiers are not cosmetic branding targets;
11. verifier uncertainty/unsupported/unavailable states cannot be promoted to success;
12. no planning artifact creates implementation authority by implication.

## Adversarial closeout cases

003H requires all of the following to remain rejected by the combined contract set:

- silently retargeting an envelope from one exact revision to a newer alias;
- mutating signed/signing-bound bytes in place;
- reporting changed provider output as read-only success;
- treating a contact-email match as resource authorization;
- leaking cross-tenant resource existence through error differences;
- allowing provider callback/replay to duplicate canonical terminal state;
- treating a Prisma cascade as domain void/revocation semantics;
- treating a persisted provider status as canonical workflow completion;
- renaming `@documenso/*`, provenance IDs, source paths, NOTICE/license evidence or imported literals as cosmetic branding cleanup;
- treating a `NO_APPLICABLE_RUN`, skipped, neutral, billing-blocked or provider-status-only result as CI/review PASS;
- using noncanonical PR #87 or #93 evidence to qualify canonical grains;
- inferring Specification 004 authority solely from roadmap numbering or 003 grain completion.

## Review and merge evidence requirements for this closeout

This exact 003H candidate becomes effective only after all of the following:

1. canonical `main` remains the exact candidate base;
2. final base-to-head diff is bounded to Signthos-authored 003H closeout/ledger planning material only;
3. zero upstream-derived/product/runtime/package/dependency/config/migration/provenance/NOTICE/provider/network bytes are added or mutated;
4. exact-head workflow/check/provider accounting is recorded truthfully;
5. a fresh independent substantive reviewer evaluates the complete exact closeout head against the complete canonical 003A–003G chain;
6. every material finding is repaired forward-only;
7. any mutated head receives a fresh exact-head review;
8. unresolved material review threads are zero;
9. rulesets, branch protection, required contexts, open/non-draft state and mergeability are reverified immediately before merge;
10. an exact English premerge proof is recorded;
11. guarded normal merge uses exact `expected_head_sha` with no squash/rebase/force/admin/bypass;
12. post-merge verification proves canonical main equals returned merge SHA, valid GitHub signature, ordered parents `[premerge main, exact reviewed head]`, merge tree equality or exact verified bounded delta, exact surface and truthful post-merge check accounting;
13. Issue #6 and the canonical task ledger are reconciled only after those facts are proven.

## Candidate closeout result

Before this exact artifact itself becomes canonical:

```text
SPEC_003 = NOT_YET_CLOSED_CANONICAL
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
```

If and only if the exact 003H closeout candidate passes independent substantive exact-head review, guarded merge, post-merge verification and live governance reread, the intended candidate result is:

```text
SPEC_003 = CLOSED_CANONICAL
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SUCCESSOR_ELIGIBILITY = REEVALUATE_FROM_LIVE_CANONICAL_GOVERNANCE
```

`SPEC_004_SUCCESSOR_ELIGIBILITY` is not implementation authority. Any Specification 004 shaping/planning/implementation authority must be separately derived from live canonical governance after 003H itself becomes canonical.
