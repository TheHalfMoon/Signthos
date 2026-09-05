# Specification 002B — Private Permission Re-entry Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_EVIDENCE_ONLY / ZERO_UPSTREAM_BYTES / PRIVATE_RIGHTS_ESTABLISHED / SPDX_UNRESOLVED / STAGE_R_BLOCKED`
Issue: #5
Canonical base: `53111e0e207d61ef30f52771587e60bc1f0b8558`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Exact candidate path: `packages/prisma/schema.prisma`
Exact upstream blob: `13768e34f62331474fce63b1ca67f8d5ead44854`
Exact upstream size: `38099`

## Purpose

Re-enter the Specification 002B qualification path after the project owner confirmed possession of a private first-party Documenso rights/permission artifact applicable to Signthos.

This is a planning/evidence-only qualification unit. It commits zero upstream-derived bytes, creates zero source-import records, runs no Prisma/database/runtime/provider behavior, and grants no Stage R or source-import authority by itself.

The confidential permission source is intentionally not published. Canonical policy permits a stable non-secret permission-artifact reference plus a public scope summary while the confidential original remains outside the public repository.

## Canonical predecessor and re-entry authority

Canonical PR #61 established:

`SPEC_002_EXECUTION_FRONTIER = BLOCKED_PENDING_FIRST_PARTY_PRISMA_SCHEMA_RIGHTS_CLARIFICATION`

Its re-entry rule permits a later repository unit after a genuinely available first-party rights/permission artifact or authoritative first-party clarification is preserved and is sufficiently specific to evaluate the exact intended action for the pinned path.

The private-evidence intake is recorded in Issue #5 as:

`github:issue-comment:5552033420`

This confirmation is treated as evidence intake for a private first-party artifact, not as ordinary founder approval and not as permission synthesized from repository ownership.

## Private permission artifact reference

Stable public reference:

`permission-artifact:documenso-signthos-private-v1`

Confidential source:

`PRESERVED_OUTSIDE_PUBLIC_REPOSITORY`

Public scope relied upon by this exact `COPY_EXACT` qualification:

- upstream repository: `documenso/documenso`;
- exact pinned revision: `2cac63a000e22422bdea449f68b8025e709aa73a`;
- exact path: `packages/prisma/schema.prisma`;
- intended source transformation: `COPY_EXACT` / `copied`;
- rights relied upon: `copy`, `redistribute`, `publish_source`.

No `modify`, `create_derivative`, `relicense`, `sublicense`, `commercial_use`, `packages/ee/**`, or broader-repository right is claimed by this qualification. Any later adapted or derivative transformation would require its own exact permission-scope qualification before authorization.

The public record deliberately does not reproduce confidential correspondence, contractual text, credentials, or private legal records.

## Existing public license evidence remains materially inconsistent

The private permission does not erase or rewrite the already-canonical public evidence:

1. first-party Documenso Community licensing policy describes Community Edition under AGPL-3.0;
2. exact pinned `packages/prisma/package.json` identifies `@documenso/prisma` and declares `"license": "MIT"`;
3. exact pinned `packages/prisma/schema.prisma` has no file-local SPDX/license/copyright notice at its beginning;
4. the exact pinned `packages/prisma/` directory has no package-local `LICENSE` artifact;
5. canonical PRs #56 and #58 therefore correctly recorded a public-evidence conflict instead of selecting a convenient expression.

No historical canonical result is retroactively rewritten.

## What the private permission resolves

The new private artifact supplies an independent rights basis for the exact declared action even though the public AGPL/MIT signals remain inconsistent.

Candidate rights result for independent review:

`002B_PRISMA_SCHEMA_PERMISSION_ARTIFACT = permission-artifact:documenso-signthos-private-v1`

`002B_PRISMA_SCHEMA_PERMISSION_SCOPE = copy,redistribute,publish_source`

`002B_PRISMA_SCHEMA_SEPARATE_RIGHTS_BASIS = ESTABLISHED_FOR_COPY_EXACT_DISTRIBUTION`

This means Signthos no longer needs to infer whether the required copy/redistribute/open-source-publication rights exist solely from the conflicting public license signals for this exact path.

It does not establish file-level SPDX classification, copyright ownership, relicensing authority, sublicensing authority, modification rights, derivative-work rights, EE rights, or import authorization.

## Review finding reconciliation — SPDX

The initial exact-head independent substantive review `github:issue-comment:5552041787` found materially that the prior candidate could not safely select `MIT` as future exact-path `license.spdx` merely because a separate permission artifact supplies reuse rights.

That finding is accepted.

The candidate no longer proposes `MIT`, AGPL, a compound expression, `NOASSERTION`, or a `LicenseRef-*` value as the canonical file license.

Current result:

`002B_PRISMA_SCHEMA_PUBLIC_LICENSE_EVIDENCE = CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`

`002B_PRISMA_SCHEMA_IMPORT_LICENSE_EXPRESSION = UNRESOLVED`

`002B_PRISMA_SCHEMA_COPY_EXACT_RIGHTS_BASIS = PRIVATE_PERMISSION_ESTABLISHED`

The distinction is intentional: permission for the intended action is now evidenced, while the file's canonical SPDX metadata remains unresolved.

## Specification 001 v1 consequence

Canonical Specification 001 v1 requires every source-import record to contain an SPDX expression and explicitly fails closed on conflicting license evidence.

The implemented validator also rejects `NONE` and `NOASSERTION` as unresolved, rejects unknown SPDX identifiers, and rejects `LicenseRef-*` as a way to independently authorize canonical source evidence.

Therefore no valid import-ready v1 source-import record can be honestly constructed for this exact path today without inventing a license expression.

Result:

`PROVENANCE_V1_RECORD_ELIGIBILITY = BLOCKED_UNRESOLVED_LICENSE_EXPRESSION`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`STAGE_R_AUTHORITY = ABSENT`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002B_IMPLEMENTATION_AUTHORITY = ABSENT`

This is not a rejection of the private permission. It is a narrower provenance-representation blocker exposed after the rights dependency was supplied.

## No policy bypass

This qualification does not amend Specification 001, weaken the validator, reinterpret `NOASSERTION`, invent a custom license, or treat permission scope as an SPDX expression.

A change to the provenance model, if ever needed, must be separately authorized, bounded, independently reviewed, exact-head qualified, and canonical before it could affect source-import eligibility.

Likewise, a later genuine first-party clarification that resolves the exact file/package license expression could remove this blocker without changing Specification 001.

## Candidate successor boundary if canonical

If this qualification becomes canonical, the prior missing-rights dependency is narrowed to an exact remaining blocker:

`002B_REMAINING_BLOCKER = PROVENANCE_V1_REQUIRES_UNAMBIGUOUS_LICENSE_EXPRESSION`

This document does not automatically authorize a provenance-model amendment or another source qualification.

Fresh post-merge successor-authority analysis must determine whether canonical governance permits one of these paths:

1. a new exact first-party license-expression clarification for the pinned schema; or
2. a separately authorized planning/evidence-only compatibility analysis of whether Specification 001 needs a versioned representation for source admitted solely under separately preserved permission while public license metadata remains conflicting.

Neither path is granted by this candidate itself.

## Exact exclusions

This qualification does not authorize or perform:

- source import;
- a source-import record;
- Stage R;
- any license-expression assertion for the schema;
- modification or derivative treatment;
- Prisma generation, migration, seed, database, dependency installation, runtime, network, provider, credential, or deployment activity;
- any other `packages/prisma/**` path;
- any `packages/ee/**` path;
- relicensing or sublicensing;
- downstream 002C–002H implementation;
- Specification 003 implementation;
- Specification 002 closeout;
- a new `S2-Txxx` task identity.

## Independent review objective

The reviewer must adversarially determine whether:

1. canonical PR #61 genuinely permits this private-permission re-entry;
2. `permission-artifact:documenso-signthos-private-v1` plus `github:issue-comment:5552033420` complies with canonical confidentiality/evidence policy;
3. the narrowed `copy,redistribute,publish_source` scope matches `COPY_EXACT` distribution without claiming modification/derivative/relicense/sublicense/EE rights;
4. the candidate correctly preserves the public AGPL/MIT conflict and makes no SPDX selection;
5. the candidate accurately states the current Specification 001 v1/validator consequence for unresolved or custom license expressions;
6. zero upstream-derived bytes and zero source-import records are committed;
7. Stage R, source import, later 002 grains, and Specification 003 remain unauthorized;
8. the successor paragraph is analysis-only and does not silently authorize a Specification 001 amendment.

Any material uncertainty must fail closed and be reconciled before merge.

## Qualification gate

Before this candidate may become canonical it requires:

1. exact-head workflow/check accounting;
2. fresh independent substantive exact-head re-evaluation after the review-driven amendment;
3. reconciliation of every material finding;
4. zero unresolved material review threads;
5. unchanged canonical base and candidate head before merge;
6. guarded merge with exact `expected_head_sha` where supported;
7. post-merge verification;
8. fresh successor-authority analysis from the newly canonical `main`.

Until all gates complete:

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002B_IMPLEMENTATION_AUTHORITY = ABSENT`
