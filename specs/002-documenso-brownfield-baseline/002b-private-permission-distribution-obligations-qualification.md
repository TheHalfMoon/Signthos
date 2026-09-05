# Specification 002B — Private-Permission Distribution Obligations Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_EVIDENCE_ONLY / ZERO_UPSTREAM_BYTES / NO_IMPORT_AUTHORITY`
Issue: #5
Canonical base: `6c4681f2a765b6d75ef2f45bdbb6b96bb3421f2d`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Exact candidate path: `packages/prisma/schema.prisma`
Permission artifact: `permission-artifact:documenso-signthos-private-v1`

## Purpose

Execute the single planning/evidence-only successor made effective by canonical PR #68:

`PLANNING_ONLY_002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS_QUALIFICATION`

This unit qualifies only the private grant's distribution/notice conditions for the exact `COPY_EXACT` candidate. It imports zero upstream-derived bytes, creates zero source-import records, changes no provenance implementation, and grants no Stage R or source-import authority.

## Canonical predecessor state

Canonical PR #62 established a separate private first-party rights basis for the exact path and action, including the public-safe permission artifact reference and the relied-on scopes.

Canonical PR #67 made provenance v2 available so unresolved public license metadata can remain unresolved without fabricating SPDX while private permission and distribution obligations remain independently represented.

Canonical PR #68 then established that the remaining blocking dependency was the private grant's exact distribution/notice conditions and authorized only this qualification.

## Evidence intake

Canonical private-permission distribution-conditions intake:

`github:issue-comment:5552564774`

That evidence is intentionally public-safe and does not publish confidential grant text. It binds the existing private permission artifact to:

- upstream repository `documenso/documenso`;
- pinned commit `2cac63a000e22422bdea449f68b8025e709aa73a`;
- exact path `packages/prisma/schema.prisma`;
- exact current action `COPY_EXACT`;
- permission artifact `permission-artifact:documenso-signthos-private-v1`;
- canonically preserved scopes `copy`, `modify`, `create_derivative`, `redistribute`, `publish_source`.

The evidence states that the private grant has no additional distribution conditions beyond the declared scopes.

It specifically records no additional requirement for:

- attribution;
- copyright notice;
- license text;
- naming;
- disclosure;
- source labeling;
- link/reference text;
- any other distribution condition.

The confidential grant remains outside the public repository.

## Qualification questions

### 1. Is the private artifact applicable to the exact candidate and COPY_EXACT action?

Yes, on the currently preserved evidence basis.

`002B_PRIVATE_PERMISSION_APPLICABILITY = ESTABLISHED_FOR_PINNED_PRISMA_SCHEMA_COPY_EXACT`

### 2. Are there additional attribution, notice, naming, disclosure, labeling, text, or reference conditions?

No additional conditions are evidenced for this exact grant/action.

`002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS = RESOLVED_NONE_ADDITIONAL_CANDIDATE`

### 3. Can the conditions result be represented publicly without exposing confidential grant text?

Yes. The public-safe result is the absence of additional conditions; the confidential source text remains outside GitHub.

`002B_PRIVATE_PERMISSION_CONDITIONS_PUBLIC_SUMMARY = SUFFICIENT_NON_SECRET`

### 4. Which repository-relative public artifacts are required before distribution under the private grant?

None are required by the private grant beyond ordinary Signthos repository governance artifacts.

`002B_PRIVATE_PERMISSION_REQUIRED_PUBLIC_DISTRIBUTION_ARTIFACTS = EMPTY`

This statement is limited to obligations imposed by the private grant. It does not erase repository-level NOTICE behavior or any independently applicable Signthos obligations.

### 5. Does a private-grant condition conflict with Signthos open-source publication or COPY_EXACT distribution?

No conflict is established by the qualified private-grant conditions evidence.

`002B_PRIVATE_PERMISSION_DISTRIBUTION_CONFLICT = NONE_ESTABLISHED`

### 6. Are the preserved scopes sufficient for the exact action?

For `COPY_EXACT`, the required action scopes are covered by the preserved permission scopes. No broader right is inferred.

`002B_PRIVATE_PERMISSION_SCOPE_SUFFICIENCY = SUFFICIENT_FOR_CURRENT_COPY_EXACT_ACTION`

No `relicense`, `sublicense`, `commercial_use`, `packages/ee/**`, or broader-repository right is created by this qualification.

### 7. Is future v2 `distribution.state = resolved` evidence-backed for this exact candidate?

Yes, subject to this qualification itself becoming canonical and subject to every separate source-import/Stage R gate remaining satisfied.

`002B_FUTURE_V2_DISTRIBUTION_STATE_ELIGIBILITY = RESOLVED_EVIDENCE_AVAILABLE`

This is representational eligibility only. It is not a real source-import record and not import authority.

### 8. What immutable evidence supports the result?

The public-safe canonical evidence reference is:

`github:issue-comment:5552564774`

The underlying confidential grant remains referenced as:

`permission-artifact:documenso-signthos-private-v1`

No confidential grant text is copied into this repository.

## Public-license separation

The unresolved public license metadata remains intentionally unchanged:

`002B_PUBLIC_LICENSE_EXPRESSION = UNRESOLVED`

The private permission does not select MIT, AGPL, a `LicenseRef-*`, `NONE`, or `NOASSERTION`.

The distribution-obligations result above comes only from the private-grant evidence and not from the conflicting public AGPL/MIT signals.

## Qualification result candidate

Subject to fresh independent substantive exact-head review and canonicalization of this document:

- `002B_PRIVATE_PERMISSION_RIGHTS_BASIS = ESTABLISHED_FOR_COPY_EXACT_DISTRIBUTION`;
- `002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS = RESOLVED_NONE_ADDITIONAL`;
- `002B_PRIVATE_PERMISSION_REQUIRED_PUBLIC_DISTRIBUTION_ARTIFACTS = EMPTY`;
- `002B_PRIVATE_PERMISSION_SCOPE_SUFFICIENCY = SUFFICIENT_FOR_CURRENT_COPY_EXACT_ACTION`;
- `PROVENANCE_V2_IMPLEMENTATION = CANONICAL`;
- `002B_PUBLIC_LICENSE_EXPRESSION = UNRESOLVED`;
- `002B_EXACT_V2_QUALIFICATION_CANDIDATE_ELIGIBILITY = TRUE_AFTER_THIS_RESULT_IS_CANONICAL`;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `002B_IMPLEMENTATION_AUTHORITY = ABSENT`;
- `SPEC_003_SUCCESSOR_AUTHORITY = ABSENT`.

## Successor analysis candidate

If and only if this qualification becomes canonical, the next dependency-ordered repository unit may be a planning/evidence-only exact Prisma v2 qualification candidate for the pinned path.

That later unit may construct only a Signthos-authored qualification record/analysis using exact upstream identity, exact source digest evidence, unresolved public license state, the existing permission artifact/scopes, resolved private distribution obligations, restricted-path policy, and exact review requirements.

It must still not import `packages/prisma/schema.prisma`, create an import-ready canonical source-import record, grant Stage R, or advance 002C–002H merely because the evidence model is now complete.

Candidate successor:

`NEXT_AUTHORIZED_UNIT = PLANNING_ONLY_002B_EXACT_PRISMA_V2_PREIMPORT_QUALIFICATION`

No new `S2-Txxx` identity is created by this qualification.

## Qualification gate

Before this candidate may become canonical it requires:

1. exact-head workflow/check accounting;
2. fresh independent substantive exact-head review;
3. reconciliation of every material finding;
4. zero unresolved material review threads;
5. unchanged canonical base/head before merge;
6. guarded merge using exact `expected_head_sha`;
7. post-merge verification.

Until then, `002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS` remains canonically unresolved and no downstream authority may be inferred from this candidate.