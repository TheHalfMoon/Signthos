# Specification 003H — Convergence and Closeout Reconciliation

Status: `CLOSEOUT_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `ee6fa17bedc6a346bc25874f9c6c4174fc1aed3d`
Owning specification: `003-signthos-domain-boundary`

## Canonical authority

Fresh post-003G Issue #6 reconciliation `github:issue-comment:5562037836` authorizes exactly:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 003H_SPECIFICATION_003_CONVERGENCE_CLOSEOUT
003H_AUTHORITY = PLANNING_CLOSEOUT_QUALIFICATION_ONLY
003H_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
PRODUCT_RUNTIME_AUTHORITY = ABSENT
SOURCE_IMPORT_AUTHORITY = ABSENT
DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
PERSISTENCE_MIGRATION_AUTHORITY = ABSENT
PROVIDER_RUNTIME_AUTHORITY = ABSENT
PDF_SIGNING_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
```

This artifact exercises only that bounded closeout-qualification authority.

It authorizes no product/runtime code, source import, dependency acquisition, package/config mutation, Prisma schema mutation, migration, generation, database/runtime execution, provider/network execution, PDF/signing implementation, credentials, deployment, public API/SDK work, or Specification 004 work.

## Purpose

Prove that the currently authorized Specification 003 planning/contract program converged coherently across Stage P and 003A through 003G, preserve all authority boundaries, and establish the exact evidence that must become canonical before any Specification 004 successor authority can be derived.

003H is reconciliation and qualification, not implementation.

## Canonical dependency chain

The canonical merge chain is continuous and dependency ordered:

```text
Specification 002 closeout
  -> Stage P shaping      PR #86 -> d822f3c3ab3bc773efc587ce61f7fc96344098f6
  -> Stage P closeout     PR #88 -> b9ad2e93556136f4df95b56b39ea231d75d64453
  -> 003A                 PR #89 -> 4e1885851bd80eaae1b38c62eb0bfeec65fb2d8c
  -> 003B                 PR #90 -> 342e08a1ffc7634242c8411d1e4055fa5e8af227
  -> 003C                 PR #91 -> 9dae6ca33110f0965a8074294bdda5835134340f
  -> 003D                 PR #92 -> 59c459fcc2d9068cc96c1f7ff95055e26020162a
  -> 003E                 PR #94 -> 5a8d1728810c7bb7f9df4ffc170c656d7314fae7
  -> 003F                 PR #95 -> 2a4acb8d788b24ecd2034b8f1b00faf7dbca55b7
  -> 003G                 PR #96 -> ee6fa17bedc6a346bc25874f9c6c4174fc1aed3d
```

Every successor PR base equals the canonical predecessor merge required by the dependency graph.

PR #87 and PR #93 were closed without merge and are noncanonical candidate history. Their branch, review, check, or authority evidence is not reused here.

## Stage P evidence

Stage P shaping and mandatory closeout are canonical prerequisites, not implementation grants.

### Stage P shaping

```text
PR = #86
BASE = 89146441dbd3cbadcddbcd24dc0741b4ecdc14e1
REVIEWED_HEAD = b966343fe9bcd44822a65776f2047725dcaa9486
MERGE = d822f3c3ab3bc773efc587ce61f7fc96344098f6
REVIEWED_HEAD_TREE = 7beb5dd8c2d7a6239e14c75bf4efcae7fd9168b4
MERGE_TREE = 7beb5dd8c2d7a6239e14c75bf4efcae7fd9168b4
TREE_EQUALITY = PASS
MERGE_SIGNATURE = VERIFIED / VALID
POST_MERGE_ACTIONS = NO_APPLICABLE_RUN
POST_MERGE_STATUSES = NO_APPLICABLE_RUN
```

The complete canonical Stage P proof is preserved in `stage-p-closeout.md`.

### Mandatory Stage P closeout

```text
PR = #88
BASE = d822f3c3ab3bc773efc587ce61f7fc96344098f6
HEAD = 6c533d60c849bab7a1b021d6b0d214ca5b3dd1ec
MERGE = b9ad2e93556136f4df95b56b39ea231d75d64453
CHANGED_FILES = 2
```

Issue #6 canonical closeout proof `github:issue-comment:5560539360` established Stage P `CLOSED_CANONICAL` and authorized a fresh 003A planning/contract qualification only.

## Exact canonical grain evidence

The final exact-head qualification evidence for 003A–003G is:

| Grain | PR | Exact base | Exact final reviewed head | Reviewed-head / merge tree | Independent substantive review | Guarded merge | Post-merge proof |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| 003A | #89 | `b9ad2e93556136f4df95b56b39ea231d75d64453` | `d729622504da8b3bd6a99ee596f4fcc0622ef5f5` | `96ba07e45b900f93c2baba92d94dbc802adaa11a` | `github:issue-comment:5560596626 = NO_MATERIAL_FINDINGS` | `4e1885851bd80eaae1b38c62eb0bfeec65fb2d8c` | `github:issue-comment:5560862193` |
| 003B | #90 | `4e1885851bd80eaae1b38c62eb0bfeec65fb2d8c` | `e3a951418402b6c5f4d7ce5ebecf5f8f1248bf0b` | `96e7ae7f9b05fe608860f2c877bab7112618e9fe` | `github:issue-comment:5560917565 = NO_MATERIAL_FINDINGS` | `342e08a1ffc7634242c8411d1e4055fa5e8af227` | `github:issue-comment:5561139588` |
| 003C | #91 | `342e08a1ffc7634242c8411d1e4055fa5e8af227` | `cb60386de4311b5e490f72b3a31461f11844393b` | `c54cd2063ef347a6a392a1b213534ab651eb0cb9` | `github:issue-comment:5561402476 = NO_MATERIAL_FINDINGS` | `9dae6ca33110f0965a8074294bdda5835134340f` | `github:issue-comment:5561583448` |
| 003D | #92 | `9dae6ca33110f0965a8074294bdda5835134340f` | `3c464897bc28855930322d79e1bfac27ac78f739` | `0e68ca16ed989cc44a98002ca5ac7fc12a4b9aca` | `github:issue-comment:5561619777 = NO_MATERIAL_FINDINGS` | `59c459fcc2d9068cc96c1f7ff95055e26020162a` | `github:issue-comment:5561646641` |
| 003E | #94 | `59c459fcc2d9068cc96c1f7ff95055e26020162a` | `a6fa7133ae0b03a9f89ac8f6dcf82da77617c2cd` | `d83cc031a22651f28bd30de325d463d7bb6912a4` | `github:issue-comment:5561684736 = NO_MATERIAL_FINDINGS` | `5a8d1728810c7bb7f9df4ffc170c656d7314fae7` | `github:issue-comment:5561871561` |
| 003F | #95 | `5a8d1728810c7bb7f9df4ffc170c656d7314fae7` | `92ae01b014daa5409319b40ebf223a85ffa4f6a6` | `585c642f4153c7e93de8fa25d0bec4082f656b00` | `github:issue-comment:5561923290 = NO_MATERIAL_FINDINGS` | `2a4acb8d788b24ecd2034b8f1b00faf7dbca55b7` | `github:issue-comment:5561934917` |
| 003G | #96 | `2a4acb8d788b24ecd2034b8f1b00faf7dbca55b7` | `a43d2abd6f332e10f1b72e9ba8c5edba11b000d7` | `f4037a27f06426b1b5ee1d23f151b75bf5b1d26c` | `github:issue-comment:5562000919 = NO_MATERIAL_FINDINGS` | `ee6fa17bedc6a346bc25874f9c6c4174fc1aed3d` | `github:issue-comment:5562037836` |

For every row above:

- final reviewed head is the head that actually qualified; predecessor-head review evidence is stale;
- the guarded merge contains the reviewed head as the second ordered parent and the then-current canonical main as the first ordered parent;
- reviewed-head tree equals merge tree;
- merge signature was verified/valid;
- post-merge GitHub Actions/status accounting was recorded truthfully and did not promote skipped, neutral, billing-blocked, unavailable, rate-limit, or provider-only output into PASS;
- unresolved material review findings on the final qualified head were zero at merge qualification.

003B, 003C, and 003G required forward-only repair during their review lineage. Only the final repaired heads listed above qualify. 003G specifically superseded the prior P1 mutually-exclusive classification finding by making naming protections cumulative and requiring the intersection of all applicable protections.

## Evidence-class accounting

Specification 003A–003G were planning/contract qualification units. They did **not** receive implementation authority.

Therefore the correct evidence classification at 003H is:

```text
SIGNTHOS_OWNED_CONTRACT_EVIDENCE = PRESENT_CANONICAL
INDEPENDENT_SUBSTANTIVE_EXACT_HEAD_REVIEW = PRESENT_FOR_003A_THROUGH_003G
DETERMINISTIC_ADVERSARIAL_CONTRACT_CASES = PRESENT_CANONICAL
PRODUCT_IMPLEMENTATION_CONFORMANCE_TESTS = NOT_APPLICABLE_NO_IMPLEMENTATION_AUTHORITY
PROVIDER_RUNTIME_CONFORMANCE_TESTS = NOT_APPLICABLE_NO_PROVIDER_IMPLEMENTATION
DATABASE_MIGRATION_TESTS = NOT_APPLICABLE_NO_MIGRATION_IMPLEMENTATION
PDF_ENGINE_RUNTIME_TESTS = NOT_APPLICABLE_SPEC_004_NOT_AUTHORIZED
SIGNING_CRYPTOGRAPHY_RUNTIME_TESTS = NOT_APPLICABLE_LATER_OWNER
```

`NOT_APPLICABLE` is not a PASS. It records that the evidence class was outside the authority and changed surface of Specification 003.

003H does not convert contract-design evidence into runtime/platform evidence.

## Grain convergence summary

### 003A — domain vocabulary and identity

Canonical result:

- `Document`, `DocumentRevision`, `Envelope`, `Recipient`, `Field`, `EvidenceBundle`, and `Workflow` have distinct identity ownership;
- opaque entity identity remains distinct from exact-byte content digest;
- content-changing operations require a new revision identity;
- aliases cannot silently retarget irreversible bindings;
- authentication/contact/provider identity is not resource authorization.

### 003B — revision and immutable signing input

Canonical result:

- byte-changing operations require fresh revision identity;
- unknown byte effect fails closed;
- signing-sensitive bindings target exact immutable revisions, not moving aliases;
- conversion is an explicit revision boundary where required;
- signed/signing-bound inputs cannot be mutated in place;
- provider-result rules remain limited to byte effect/revision identity and do not absorb provider trust/locality ownership.

### 003C — envelope, recipient, field and workflow

Canonical result:

- envelope lifecycle/routing state is separate from document content identity;
- revision-set binding, recipient participation, field ownership/placement/completion, workflow transitions, cancellation/decline/void/expiry and idempotency are contractually separated;
- required fields belong to blocking recipients;
- valid skipped blocking recipients use explicit waiver semantics rather than false satisfaction.

### 003D — authorization, events and stable errors

Canonical result:

- principal, tenant scope, resource reference and action semantics are explicit;
- authorization is deny-by-default and cross-tenant existence leakage is constrained;
- authentication is not authorization;
- command/request, domain event, provider/runtime event and audit/evidence event classes are non-interchangeable;
- stable machine-readable error and retry classes are independent from provider/raw/localized messages.

### 003E — provider capability contract

Canonical result:

- browser/native/server/heavy providers share one semantic capability model;
- provider identity, capability identity/version, support and runtime availability are distinct;
- operations are classified as read-only or revision-creating;
- local-only work cannot silently fall back to network processing;
- provider success/status cannot redefine domain state or bypass authorization/workflow preconditions;
- heavy providers receive no signing-key/control-plane-secret access by default.

No provider implementation exists under 003; this is semantic contract consistency, not runtime proof.

### 003F — Prisma anti-corruption and migration mapping

Canonical imported baseline remains exactly:

```text
PATH = packages/prisma/schema.prisma
GIT_BLOB = 13768e34f62331474fce63b1ca67f8d5ead44854
SIZE_BYTES = 38099
SHA256 = 0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931
MODEL_COUNT = 51
ENUM_COUNT = 30
```

Canonical disposition:

- all 51 imported models are classified against Signthos contracts;
- Prisma remains persistence representation, not domain authority;
- persistence keys/enums/relations/cascades/JSON/timestamps cannot silently become canonical identities, workflow semantics, authorization, evidence, or signing truth;
- future migration classes, cutover, preservation, rollback, and verification requirements are defined;
- **no Prisma schema mutation or database migration was implemented or authorized**.

### 003G — bounded naming/configuration migration

Canonical disposition:

- `Signthos` is already the working product name;
- stable domain language remains generally unbranded;
- product presentation, internal identifiers, config keys, external compatibility IDs, persistence IDs, provenance identities, imported literals, legal identities and governance IDs remain distinct concerns;
- protections are cumulative rather than mutually exclusive;
- upstream/provenance/legal identities and exact imported source literals are preserve-exact surfaces, not branding debt;
- current live repository truth supports `CURRENT_BROAD_RENAME_NEEDED = NO` and `CURRENT_CONFIG_KEY_MIGRATION_NEEDED = NO_EVIDENCE`;
- **no product rename/config mutation implementation was performed or authorized**.

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
- treating `NO_APPLICABLE_RUN`, skipped, neutral, billing-blocked, unavailable, rate-limit, or provider-status-only output as CI/review PASS;
- using noncanonical PR #87 or #93 evidence to qualify canonical grains;
- inferring Specification 004 authority solely from roadmap numbering or a 003 grain merge.

## Specification 004 successor analysis candidate

Canonical `ROADMAP.md` defines the dependency spine:

```text
003 Signthos Domain Boundary
  -> 004 Local PDF Core
      -> 005 Signing + Evidence Core
```

There is currently no `specs/004-*` directory on canonical main. No Specification 004 shaping artifact or implementation has been admitted under Specification 003.

The roadmap explicitly states that specification numbers describe dependency order and do not authorize implementation by themselves.

Therefore, before 003H becomes canonical:

```text
SPEC_004_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_IMPLEMENTATION_AUTHORITY = ABSENT
```

If and only if 003H is independently substantively reviewed, guarded-merged, post-merge verified, and the live governance reread remains unchanged, the expected **candidate** next unit is:

```text
NEXT_CANDIDATE_REPOSITORY_UNIT = SPEC_004_STAGE_P_SHAPING
EXPECTED_AUTHORITY_CLASS = PLANNING_ONLY
SPEC_004_IMPLEMENTATION_AUTHORITY = ABSENT
```

This expected candidate is not effective authority. The post-003H live reread controls.

## Review and merge evidence requirements for this closeout

This exact 003H candidate becomes effective only after all of the following:

1. canonical `main` remains the exact candidate base;
2. final base-to-head diff is bounded to Signthos-authored 003H closeout planning material only;
3. zero upstream-derived/product/runtime/package/dependency/config/migration/provenance/NOTICE/provider/network bytes are added or mutated;
4. exact-head workflow/check/provider accounting is recorded truthfully;
5. a fresh independent substantive reviewer evaluates the complete exact closeout head against the canonical Stage P and 003A–003G chain;
6. every material finding is repaired forward-only;
7. any mutated head receives a fresh exact-head review;
8. unresolved material review threads are zero;
9. rulesets, branch protection, required contexts, open/non-draft state and mergeability are reverified immediately before merge;
10. an exact English premerge proof is recorded;
11. guarded normal merge uses exact `expected_head_sha` with no squash/rebase/force/admin/bypass;
12. post-merge verification proves canonical main equals returned merge SHA, valid GitHub signature, ordered parents `[premerge main, exact reviewed head]`, merge-tree equality or exact verified bounded delta, exact surface, and truthful post-merge check accounting;
13. Issue #6 is reconciled only after those facts are proven.

## Candidate closeout result

Before this exact artifact itself becomes canonical:

```text
SPEC_003 = NOT_YET_CLOSED_CANONICAL
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
```

If and only if the exact 003H closeout candidate passes independent substantive exact-head review, guarded merge, post-merge verification, and live governance reread, the intended candidate result is:

```text
SPEC_003 = CLOSED_CANONICAL
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SUCCESSOR_ELIGIBILITY = REEVALUATE_FROM_LIVE_CANONICAL_GOVERNANCE
```

The final post-merge successor reread decides whether a bounded Specification 004 planning unit is authorized. 003H itself does not authorize Specification 004.