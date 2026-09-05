# Specification 002B — Post-v2 Successor Authority Analysis

Status: `SUCCESSOR_AUTHORITY_CANDIDATE / PLANNING_EVIDENCE_ONLY / ZERO_UPSTREAM_BYTES / NO_IMPORT_AUTHORITY`
Issue: #5
Canonical base: `cabd242d7f48177ff2cdaa563d157619ddc86cb0`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Exact candidate path: `packages/prisma/schema.prisma`

## Purpose

Perform the fresh dependency-ordered successor-authority analysis required after canonical PR #67 completed the bounded provenance v2 control-plane implementation.

This unit is Signthos-authored planning/evidence only. It imports zero upstream-derived bytes, creates zero source-import records, executes no Prisma/database/runtime/provider behavior, and grants no Stage R, product-source import, downstream grain, EE, or Specification 003 authority.

## Canonical predecessor chain

### Private permission re-entry — PR #62

Canonical PR #62 established:

- `002B_PRISMA_SCHEMA_PERMISSION_ARTIFACT = permission-artifact:documenso-signthos-private-v1`;
- private evidence intake `github:issue-comment:5552033420`;
- `002B_PRISMA_SCHEMA_PERMISSION_SCOPE = copy,redistribute,publish_source`;
- `002B_PRISMA_SCHEMA_SEPARATE_RIGHTS_BASIS = ESTABLISHED_FOR_COPY_EXACT_DISTRIBUTION`;
- public license evidence remained `CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`;
- no SPDX expression was selected;
- Stage R and source-import authority remained absent.

The private permission therefore resolved the prior absence-of-reuse-rights blocker for the declared exact `COPY_EXACT` action. Historical task-ledger text saying that the COPY_EXACT rights basis is absent describes the pre-PR-#62 state and must not be treated as the current frontier.

### Provenance compatibility and authority — PRs #63–#65

Canonical PR #63 authorized only a planning-only compatibility analysis.

Canonical PR #64 established:

- v1 cannot honestly encode this separate-permission/unresolved-public-license state without semantic mutation or placeholder bypass;
- v1 must remain unchanged;
- a versioned v2 representation is feasible;
- private permission rights and distribution/notice obligations are separate questions;
- `002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS = NOT_YET_CANONICALLY_RESOLVED`.

Canonical PR #65 then authorized one bounded provenance v2 implementation and made that authority effective through `github:issue-comment:5552233983`.

### Provenance v2 implementation — PR #67

Canonical PR #67 completed the bounded implementation:

- exact reviewed head: `f1c3763bb89380b07c0204f1b307412d10d6c7fd`;
- exact-head Provenance workflow: `33971831624 = SUCCESS`;
- independent substantive review: `github:issue-comment:5552478677 = NO_MATERIAL_FINDINGS`;
- guarded merge: `cabd242d7f48177ff2cdaa563d157619ddc86cb0`;
- reviewed-head tree = merge tree: `4afd443da6337b8a1f2e869f240b355a40e42301`;
- merge signature: verified/valid;
- post-merge main push workflow: `33972157155 = SUCCESS`;
- post-merge evidence: `github:issue-comment:5552511036`.

Canonical v2 can now represent unresolved public license evidence without inventing SPDX while keeping private permission, distribution obligations, and review/import state separate.

No real upstream product byte or real v2 source-import record was introduced.

## Current truth after PR #67

The old blockers must be separated into resolved and unresolved dependencies.

### Resolved dependency — private reuse rights for declared action

`002B_PRIVATE_PERMISSION_RIGHTS_BASIS = ESTABLISHED_FOR_COPY_EXACT_DISTRIBUTION`

The canonical public summary currently relies on these exact rights:

- `copy`;
- `redistribute`;
- `publish_source`.

No modification, derivative-work, relicensing, sublicensing, commercial-use, EE, or broader-repository right is inferred.

### Resolved dependency — provenance representability

`PROVENANCE_V2_IMPLEMENTATION = CANONICAL`

`PROVENANCE_V2_CAN_REPRESENT_UNRESOLVED_PUBLIC_LICENSE_WITH_SEPARATE_PERMISSION = TRUE`

The previous v1 representation blocker therefore no longer blocks planning of an exact v2 candidate.

### Unresolved public license metadata

`002B_PUBLIC_LICENSE_EXPRESSION = UNRESOLVED`

Public first-party evidence remains materially inconsistent between broader Community AGPL guidance and exact `@documenso/prisma` package metadata declaring MIT. The private permission does not rewrite this evidence and v2 deliberately preserves the unresolved state.

A resolved SPDX expression is not required merely to represent the candidate in v2 when the actual rights basis is separate permission, but no guessed SPDX expression may be inserted.

### Unresolved dependency — private-permission distribution obligations

The available canonical private-permission summary proves the rights scopes relied upon for the action. It does not record a complete non-secret answer to whether the grant also imposes any attribution, notice, source-labeling, naming, disclosure, required text, or equivalent distribution condition.

No canonical evidence currently states one of the following complete outcomes for the exact private artifact:

- `NO_ADDITIONAL_DISTRIBUTION_OBLIGATIONS` with a qualifying evidence basis; or
- a complete enumerated set of applicable distribution/notice obligations and required public artifacts.

Therefore:

`002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS = NOT_YET_CANONICALLY_RESOLVED`

This is now the exact blocking dependency for creating an import-ready Prisma v2 qualification candidate.

## Alternative analysis

### Alternative A — treat omission of obligations from the existing public permission summary as proof that none exist

Rejected.

The existing public summary was deliberately bounded to rights relied upon. Silence about conditions is not affirmative evidence that the underlying private grant is unconditional.

`ALT_A = REJECTED_UNSUPPORTED_INFERENCE`

### Alternative B — use the unresolved public AGPL or MIT signals to manufacture distribution obligations

Rejected.

Doing so would silently choose one side of the exact license conflict that PRs #58, #62, and #64 deliberately preserved as unresolved.

`ALT_B = REJECTED_LICENSE_CONFLICT_BYPASS`

### Alternative C — create a real v2 Prisma record with `distribution.state = resolved` now

Rejected.

The v2 control plane makes the state representable; it does not supply the missing evidence. Marking distribution resolved without the grant conditions would convert representation capability into fabricated evidence.

`ALT_C = REJECTED_EVIDENCE_FABRICATION`

### Alternative D — proceed directly to Stage R because copy/redistribute/publish-source rights are established

Rejected.

Canonical provenance requires the distribution/notice obligations to be resolved independently. Stage R remains a separate authorization after exact candidate qualification.

`ALT_D = REJECTED_AUTHORITY_INFLATION`

### Alternative E — perform one planning/evidence-only exact private-permission distribution-obligations qualification

This is the smallest dependency-ordered repository unit that can be performed without importing source or asserting unknown private terms.

The qualification may inspect only:

- the existing non-secret private-permission artifact reference and canonical scope summary;
- any genuinely available non-secret/private evidence supplied or already preserved for the exact grant;
- public first-party evidence only as contextual evidence, without using it to rewrite the private grant or choose the unresolved file license;
- canonical v2 distribution semantics.

It must determine whether the exact grant's applicable distribution conditions are sufficiently evidenced for a non-secret canonical summary.

If evidence remains insufficient, it must terminate fail-closed with an exact external-evidence requirement rather than creating a v2 record.

`ALT_E = AUTHORIZED_PLANNING_EVIDENCE_SUCCESSOR_CANDIDATE`

## Successor authority candidate

Subject to fresh independent substantive exact-head review and canonicalization of this document:

`NEXT_AUTHORIZED_UNIT = PLANNING_ONLY_002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS_QUALIFICATION`

The successor is limited to a Signthos-authored qualification/evidence document. It may not create or modify:

- `packages/prisma/schema.prisma`;
- any other upstream source byte;
- `provenance/imports/**`;
- a real v2 source-import record;
- provenance schemas or validator code;
- dependencies/workflows;
- application/runtime code;
- `packages/ee/**`;
- downstream 002C–002H implementation;
- Specification 003.

## Required questions for the next qualification

The next unit must answer, without exposing confidential permission text:

1. Is the private permission artifact still applicable to exact `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:packages/prisma/schema.prisma` and exact `COPY_EXACT` distribution?
2. Does the grant impose attribution, copyright notice, license-text, naming, disclosure, source-labeling, link/reference, or other distribution conditions?
3. If conditions exist, can every condition be represented in a stable non-secret public summary without publishing confidential grant text?
4. Which repository-relative public artifacts, if any, are required before distribution?
5. Does any condition conflict with Signthos open-source publication or the intended distribution action?
6. Are the existing relied-on scopes `copy,redistribute,publish_source` sufficient for the exact action after conditions are accounted for?
7. Is `distribution.state = resolved` genuinely evidence-backed for a future synthetic/exact candidate, or must it remain unresolved?
8. What immutable evidence reference can support the qualification without inventing or exposing secret terms?

## Evidence sufficiency rule

A qualifying positive outcome requires a genuine basis sufficient to state either:

`002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS = RESOLVED_NONE_ADDITIONAL`

or a complete bounded result equivalent to:

`002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS = RESOLVED_EXPLICIT_CONDITIONS`

with every applicable condition and required public artifact recorded non-secretly.

A mere statement that permission exists, the already-recorded rights scopes, ordinary founder approval, public package metadata, or provenance-v2 representability is not enough to infer the obligations result.

If the exact grant conditions are not available to the qualification, the required result is:

`002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS = BLOCKED_PENDING_PRIVATE_GRANT_CONDITIONS_EVIDENCE`

No source-import candidate follows from that blocked result.

## Current execution frontier candidate

If this analysis becomes canonical:

- `002B_PRIVATE_PERMISSION_RIGHTS_BASIS = ESTABLISHED_FOR_COPY_EXACT_DISTRIBUTION`;
- `PROVENANCE_V2_IMPLEMENTATION = CANONICAL`;
- `002B_PUBLIC_LICENSE_EXPRESSION = UNRESOLVED`;
- `002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS = NOT_YET_CANONICALLY_RESOLVED`;
- `NEXT_AUTHORIZED_UNIT = PLANNING_ONLY_002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS_QUALIFICATION`;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `002B_IMPLEMENTATION_AUTHORITY = ABSENT`;
- `002C_CURRENT_SUCCESSOR = BLOCKED_BY_REQUIRED_002B_CONTRACTS_AND_SEPARATE_C_AUTHORIZATION`;
- `SPEC_002_CLOSEOUT_ELIGIBILITY = FALSE`;
- `SPEC_003_SUCCESSOR_AUTHORITY = ABSENT`.

No new `S2-Txxx` identity is created by this analysis.

## Qualification gate

Before this candidate may become canonical it requires:

1. exact-head workflow/check accounting;
2. fresh independent substantive exact-head review;
3. reconciliation of every material finding;
4. zero unresolved material review threads;
5. unchanged canonical base/head before merge;
6. guarded merge using exact `expected_head_sha`;
7. post-merge verification;
8. only then may the bounded obligations-qualification successor branch be created.
