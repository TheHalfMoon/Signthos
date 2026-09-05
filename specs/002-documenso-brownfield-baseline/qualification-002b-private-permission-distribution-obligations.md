# Specification 002B — Private Permission Distribution-Obligations Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_EVIDENCE_ONLY / ZERO_UPSTREAM_BYTES / FAIL_CLOSED_EXTERNAL_EVIDENCE`
Issue: #5
Canonical base: `6c4681f2a765b6d75ef2f45bdbb6b96bb3421f2d`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Exact candidate path: `packages/prisma/schema.prisma`
Exact intended action: `COPY_EXACT`

## Purpose

Execute the single bounded successor authorized by canonical PR #68:

`PLANNING_ONLY_002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS_QUALIFICATION`

The qualification determines whether the private first-party permission artifact already accepted for exact `COPY_EXACT` reuse has sufficiently evidenced distribution/notice conditions to support a future v2 candidate without exposing confidential grant text or inventing missing terms.

This document is planning/evidence only. It imports zero upstream-derived bytes, creates zero source-import records, changes no provenance implementation/schema/policy, and grants no Stage R, source import, downstream grain, EE, or Specification 003 authority.

## Canonical inputs

### Private permission identity and rights scope

Canonical PR #62 and Issue #5 establish:

- artifact reference: `permission-artifact:documenso-signthos-private-v1`;
- intake evidence: `github:issue-comment:5552033420`;
- exact upstream repository: `documenso/documenso`;
- pinned revision: `2cac63a000e22422bdea449f68b8025e709aa73a`;
- exact path under qualification: `packages/prisma/schema.prisma`;
- exact current transformation: `COPY_EXACT` / `copied`;
- relied-on rights: `copy`, `redistribute`, `publish_source`.

No modification, derivative-work, relicensing, sublicensing, commercial-use, EE, or broader-repository right is inferred.

Canonical result carried forward:

`002B_PRIVATE_PERMISSION_RIGHTS_BASIS = ESTABLISHED_FOR_COPY_EXACT_DISTRIBUTION`

This qualification does not reopen that already-reviewed rights-basis result.

### Public license evidence

The exact public license expression remains unresolved:

`002B_PUBLIC_LICENSE_EXPRESSION = UNRESOLVED`

The private permission is the independent rights basis for the declared action. The public AGPL/MIT evidence conflict must not be used to manufacture or substitute for the terms of the private grant.

### Provenance v2

Canonical PR #67 established a reviewed, tested, post-merge-verified v2 source-import representation that can keep unresolved public license evidence, private permission, distribution obligations, and review/import state separate.

`PROVENANCE_V2_IMPLEMENTATION = CANONICAL`

Representability does not establish evidence or import authority.

## Evidence inventory examined

The qualification examined the currently canonical non-secret surfaces that can describe the private grant without exposing confidential text:

1. `github:issue-comment:5552033420` — private first-party permission evidence intake;
2. `specs/002-documenso-brownfield-baseline/qualification-002b-private-permission-reentry.md` — reviewed public scope and exclusions;
3. `specs/002-documenso-brownfield-baseline/002b-post-permission-successor-authority.md` — canonical rights-basis successor analysis;
4. `specs/002-documenso-brownfield-baseline/002b-provenance-private-permission-compatibility.md` — canonical distinction between rights and obligations;
5. `specs/001-provenance-import-system/amendments/v2-private-permission.md` — canonical v2 maintenance semantics;
6. `github:issue-comment:5552511036` — PR #67 post-merge v2 verification;
7. `specs/002-documenso-brownfield-baseline/002b-post-v2-successor-authority.md` — canonical PR #68 successor determination;
8. Issue #5 canonical comments available at this qualification frontier;
9. repository search for `permission-artifact:documenso-signthos-private-v1` and related public summaries.

The examined canonical surfaces confirm the artifact identity, exact candidate, transformation, and relied-on rights. They do not state the complete conditions of the confidential grant.

No newly available canonical artifact was found that states either:

- the grant is unconditional for the declared distribution action; or
- a complete list of attribution, copyright-notice, license-text, naming, disclosure, source-labeling, link/reference, or equivalent distribution obligations.

This finding is scoped to the canonical surfaces examined. It is not a claim that the confidential original contains no such terms; the original is intentionally outside the public repository.

## Required question 1 — exact applicability

The existing canonical intake and qualification bind the private artifact to the exact pinned repository/revision/path and exact `COPY_EXACT` action for the relied-on rights.

Result:

`002B_PRIVATE_PERMISSION_EXACT_APPLICABILITY = ESTABLISHED_FOR_PREVIOUSLY_QUALIFIED_RIGHTS_SCOPE`

This result establishes applicability of the accepted rights basis. It does not independently establish the grant's conditions.

## Required question 2 — applicable distribution conditions

The available non-secret evidence does not affirmatively answer whether the grant imposes any of the following:

- attribution;
- copyright notice preservation;
- license-text inclusion;
- naming or trademark-related language;
- source labeling;
- disclosure language;
- links or references;
- required notices or statements;
- other distribution-specific conditions.

Silence in the existing rights-scope summary cannot be converted to `none`.

Result:

`002B_PRIVATE_PERMISSION_CONDITIONS_ENUMERATION = NOT_ESTABLISHED`

## Required question 3 — privacy-preserving public summary

A privacy-preserving public summary is structurally possible under the canonical v2 model, but only after the conditions themselves are known.

The repository may record a bounded non-secret statement such as:

- `no additional distribution obligations`, if genuinely evidenced; or
- a complete list of required public actions/artifacts, if genuinely evidenced.

The repository must not quote or publish confidential correspondence merely to satisfy this requirement.

Current result:

`002B_PRIVATE_PERMISSION_NON_SECRET_CONDITIONS_SUMMARY = NOT_AVAILABLE_FROM_CURRENT_EVIDENCE`

## Required question 4 — required public artifacts

Because the grant conditions are not currently enumerated, the qualification cannot truthfully determine whether any repository-relative public artifact is required.

It would be incorrect to set the future v2 `distribution.required_artifacts` to an empty array on the basis of missing evidence alone.

Result:

`002B_PRIVATE_PERMISSION_REQUIRED_PUBLIC_ARTIFACTS = UNKNOWN_PENDING_GRANT_CONDITIONS`

## Required question 5 — compatibility with Signthos open-source publication

The previously qualified rights include `publish_source`, so open-source publication is within the relied-on rights basis for the exact action.

However, without the complete conditions, this qualification cannot determine whether there are additional compatible obligations that must be fulfilled before distribution.

No evidence currently establishes a contradictory condition, but absence of a known contradiction is not proof of condition completeness.

Result:

`002B_PRIVATE_PERMISSION_OPEN_SOURCE_COMPATIBILITY = RIGHTS_ESTABLISHED_CONDITIONS_INCOMPLETE`

## Required question 6 — scope sufficiency after conditions

The relied-on rights scopes are sufficient for the already-qualified exact action as rights categories:

- `copy`;
- `redistribute`;
- `publish_source`.

This qualification cannot determine whether satisfying those rights also requires additional notices or public artifacts because the conditions are not yet known.

Result:

`002B_PRIVATE_PERMISSION_SCOPE_SUFFICIENCY = RIGHTS_SCOPE_ESTABLISHED_CONDITIONS_PENDING`

## Required question 7 — future v2 distribution state

The v2 control plane allows `distribution.state = resolved` only when the obligations are genuinely resolved with non-secret evidence.

Current evidence cannot support that state for the exact Prisma candidate.

Result:

`002B_FUTURE_V2_DISTRIBUTION_STATE = UNRESOLVED`

A real v2 Prisma source-import record must not be created merely to encode this unresolved candidate while source-import authority is absent.

## Required question 8 — immutable evidence reference

The existing immutable intake `github:issue-comment:5552033420` proves the accepted private permission artifact and bounded rights summary, but does not record the complete grant conditions.

No separate immutable evidence reference containing a complete privacy-preserving conditions summary is currently canonical.

Result:

`002B_PRIVATE_PERMISSION_CONDITIONS_EVIDENCE_REFERENCE = ABSENT`

## Qualification result

The positive outcomes are not established:

`RESOLVED_NONE_ADDITIONAL = NOT_PROVEN`

`RESOLVED_EXPLICIT_CONDITIONS = NOT_PROVEN`

The required fail-closed result is:

`002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS = BLOCKED_PENDING_PRIVATE_GRANT_CONDITIONS_EVIDENCE`

This blocker is distinct from the already-resolved reuse-rights dependency and from the already-resolved provenance-representability dependency.

Exact current dependency decomposition:

- private COPY_EXACT rights basis: `ESTABLISHED`;
- provenance v2 representability: `CANONICAL`;
- public license expression: `UNRESOLVED`, preserved without fabrication;
- private distribution/notice conditions: `BLOCKED_PENDING_PRIVATE_GRANT_CONDITIONS_EVIDENCE`;
- Stage R allowlist: `EMPTY`;
- source-import authority: `ABSENT`.

## Exact re-entry evidence requirement

Re-entry does not require publishing the confidential original grant.

A future qualification needs a genuine privacy-preserving evidence statement derived from the grant that is sufficient to answer all applicable distribution conditions. At minimum the evidence must establish either:

### Outcome A — no additional conditions

A reliable non-secret record that the exact grant permits the already-qualified action without additional attribution, notice, license-text, naming, disclosure, source-labeling, link/reference, required-public-artifact, or equivalent distribution condition.

or

### Outcome B — explicit conditions

A reliable non-secret record enumerating every applicable condition and identifying any required public repository artifact or action, while leaving confidential source text outside the repository.

The future evidence should preserve a stable immutable reference or custody locator permitted by canonical policy. It must be specific enough for independent review to verify that the public summary is complete for the exact action.

Generic founder approval, a restatement that permission exists, or the existing rights-scope summary does not satisfy this condition-completeness requirement.

## Non-grants

This qualification does not authorize or perform:

- a real v2 source-import record;
- `distribution.state = resolved` for Prisma;
- source import;
- Stage R;
- Prisma generation, migration, seed, database, dependency installation, runtime, network, provider, credential, or deployment activity;
- any upstream product byte;
- any additional `packages/prisma/**` path;
- any `packages/ee/**` path;
- any SPDX expression selection;
- modification/derivative/relicense/sublicense/commercial-use rights;
- downstream 002C–002H implementation;
- Specification 002 closeout;
- Specification 003;
- upstream outreach;
- a new `S2-Txxx` identity.

## Successor consequence candidate

If this qualification becomes canonical:

`AUTHORIZED_REPOSITORY_SUCCESSOR = NONE_PENDING_PRIVATE_GRANT_CONDITIONS_EVIDENCE`

No additional repository implementation or source-qualification branch is automatically authorized by reaching this result.

A later genuinely available grant-conditions evidence artifact may authorize a fresh planning/evidence re-entry qualification. It would not automatically grant Stage R or source import; those remain separate canonical gates after a positive obligations result and an exact candidate qualification.

## Qualification gate

Before this result may become canonical it requires:

1. exact-head workflow/check accounting;
2. fresh independent substantive exact-head review;
3. reconciliation of every material finding;
4. zero unresolved material review threads;
5. unchanged canonical base/head before merge;
6. guarded merge using exact `expected_head_sha`;
7. post-merge verification;
8. canonical frontier/convergence reconciliation.
