# Specification 002B — Post-Discovery Dependency Frontier

Status: `FRONTIER_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / EXTERNAL_EVIDENCE_BLOCKED`
Issue: #5
Canonical base: `ad4140bdecd35c2d294f1bb52242ff4c21ac3d01`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Perform the planning/evidence-only post-discovery dependency-frontier analysis authorized by canonical PR #60 and determine whether any later Specification 002 grain has a genuinely dependency-independent canonical successor while 002B remains blocked.

This artifact is Signthos-authored governance analysis only. It imports no upstream source, creates no source-import record, installs no dependency, executes no Prisma/database/runtime/provider behavior, contacts no upstream party, and grants no Stage R, 002B–002H implementation, EE, Specification 003, or outreach authority.

## Canonical predecessor

PR #60 established the fail-closed result:

- `002B_SUCCESSOR_FEASIBILITY = BLOCKED_PENDING_FIRST_PARTY_PRISMA_SCHEMA_CLARIFICATION`;
- `002B_ALTERNATIVE_QUALIFICATION_CANDIDATE = NONE`;
- `002B_PRISMA_SCHEMA_RIGHTS_CONFLICT_RESOLUTION = UNRESOLVED_REQUIRES_FIRST_PARTY_PATH_SCOPE_CLARIFICATION`;
- `002B_PRISMA_SCHEMA_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`;
- `002B_PRISMA_SCHEMA_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `002B_IMPLEMENTATION_AUTHORITY = ABSENT`;
- `UPSTREAM_OUTREACH_AUTHORITY = ABSENT`.

PR #60 exact evidence:

- exact base: `ea787bd968030507bd9f24323fa850a8e428593f`;
- exact reviewed head: `8cef5bfe9d6c5c8f1c3a27232f4381c34905dff0`;
- independent substantive review: `github:issue-comment:5551680983 = NO_MATERIAL_FINDINGS`;
- guarded merge executed with exact `expected_head_sha = 8cef5bfe9d6c5c8f1c3a27232f4381c34905dff0`;
- merge: `ad4140bdecd35c2d294f1bb52242ff4c21ac3d01`;
- ordered parents: pre-merge `main` `ea787bd968030507bd9f24323fa850a8e428593f`, then exact reviewed head `8cef5bfe9d6c5c8f1c3a27232f4381c34905dff0`;
- merge tree: `605595f0d7d716e361050b1f0d5a0a900d73d019`;
- exact reviewed-head tree: `605595f0d7d716e361050b1f0d5a0a900d73d019`;
- merge signature: verified / valid;
- post-merge evidence: `github:issue-comment:5551693002`;
- post-merge GitHub Actions: `NO_APPLICABLE_RUN`, not PASS;
- upstream-derived bytes committed: `0`;
- source-import records created: `0`.

PR #60 authorized only post-discovery ledger reconciliation and dependency-frontier analysis. It did not authorize source import or a later grain.

## Controlling dependency rules

Canonical `plan.md` defines:

- 002B: dependency on canonical 002A plus separate B authorization;
- 002C: dependency on required 002A/002B contracts plus separate C authorization;
- 002D: dependency on required domain/auth baselines plus separate D authorization;
- 002E: dependency on required domain/document baselines plus separate E authorization;
- 002F: dependency on relevant domain/auth/document contracts plus separate F authorization;
- 002G: dependency on relevant domain/workflow contracts plus separate G authorization;
- 002H: default `BLOCKED / OPTIONAL / MAY_REMAIN_EMPTY` and requires separately accepted exact rights evidence.

Canonical `spec.md` also states that uncertainty blocks the affected import without blocking unrelated planning. That rule does not erase explicit grain dependencies. A planning activity is not dependency-independent merely because it performs no source import.

The canonical roadmap orders Specification 002 before Specification 003. Specification numbers express dependency order and do not themselves authorize implementation.

## Frontier analysis

### 002A — repository/workspace baseline

Current broader 002A state remains:

`BROADER_002A_STATUS = OPEN_PENDING_REAL_WORKSPACE_DEPENDENCY_DISCOVERY`

Prior M1 evidence established no current root-manifest necessity. PR #53 then established no workspace prerequisite for bounded static schema characterization.

Because 002B has no independently feasible replacement candidate and executable Prisma behavior remains unauthorized, this frontier does not establish a new real workspace dependency that would reactivate a bounded 002A workspace-import unit.

Result:

`002A_CURRENT_SUCCESSOR = NONE_ESTABLISHED`

This does not close broader 002A permanently. A future genuinely authorized grain may establish an actual workspace prerequisite.

### 002B — database/domain baseline

PR #60 exhaustively tested the currently plausible bounded candidate classes allowed by its authority and established no independent alternative to the blocked Prisma schema.

The exact missing dependency is external first-party evidence sufficiently specific to resolve the rights scope for `packages/prisma/schema.prisma` relative to the package-level MIT declaration and Community AGPL signals.

Result:

- `002B_STATUS = OPEN_BLOCKED_EXTERNAL_RIGHTS_EVIDENCE`;
- `002B_ALTERNATIVE_QUALIFICATION_CANDIDATE = NONE`;
- `002B_STAGE_R_CANDIDATE = NONE`;
- `002B_STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`.

### 002C — auth baseline

002C explicitly requires required 002A/002B contracts plus separate C authorization.

Starting a canonical 002C characterization/import successor now would require either pretending the missing 002B domain contracts exist or redefining the dependency graph. This unit is not authorized to do either.

The fact that PR #60 observed a technically more Prisma-independent auth-related path does not make it an authorized 002C successor. PR #60 correctly rejected it as the wrong grain.

Result:

`002C_CURRENT_SUCCESSOR = BLOCKED_BY_REQUIRED_002B_CONTRACTS_AND_SEPARATE_C_AUTHORIZATION`

### 002D — document/envelope baseline

002D requires required domain/auth baselines. Both the domain baseline and the auth baseline are not canonically available.

Result:

`002D_CURRENT_SUCCESSOR = BLOCKED_BY_DOMAIN_AUTH_DEPENDENCIES`

### 002E — editor/signing baseline

002E requires required domain/document baselines. Those contracts are not canonically available.

Result:

`002E_CURRENT_SUCCESSOR = BLOCKED_BY_DOMAIN_DOCUMENT_DEPENDENCIES`

### 002F — API/webhook baseline

002F requires relevant domain/auth/document contracts. Those contracts are not canonically available.

Security-relevant public metadata or source observations do not substitute for the missing inherited contracts and do not authorize a Stage F successor.

Result:

`002F_CURRENT_SUCCESSOR = BLOCKED_BY_DOMAIN_AUTH_DOCUMENT_DEPENDENCIES`

### 002G — mail/storage/job baseline

002G requires relevant domain/workflow contracts. The required workflow/domain contracts are not canonically available.

Provider-interface inventory without those contracts would be disconnected planning rather than the dependency-ordered Stage G baseline required by Specification 002.

Result:

`002G_CURRENT_SUCCESSOR = BLOCKED_BY_DOMAIN_WORKFLOW_DEPENDENCIES`

### 002H — separately permitted EE paths

002H is explicitly optional and may remain empty. No separately accepted exact EE rights artifact is canonical for an intended open-source import action.

This optional grain must not be used to route around a blocked community baseline and must not become a prerequisite for Specification 002 community success.

Result:

- `002H_STATUS = BLOCKED_OPTIONAL_MAY_REMAIN_EMPTY`;
- `002H_CURRENT_SUCCESSOR = NONE_WITHOUT_SEPARATE_RIGHTS_EVIDENCE`.

## Specification 002 completion analysis

Specification 002 cannot be declared complete from the current state.

Issue #5 exists to establish the authorized Documenso baseline. The completion rules require actually authorized/imported grains to close canonically and require the baseline to remain reproducible, characterized, provenance-complete, and free of unauthorized paths.

The database/domain baseline is still open and blocked before Stage R. Dependent later grains have not become eligible. Calling Specification 002 complete would therefore fabricate completion and collapse the dependency spine.

Result:

`SPEC_002_STATUS = OPEN_BLOCKED_EXTERNAL_RIGHTS_EVIDENCE`

`SPEC_002_CLOSEOUT_ELIGIBILITY = FALSE`

## Specification 003 boundary

The roadmap places Specification 003 after Specification 002. Current canonical blockers already prohibit Specification 003 implementation.

This unit creates no authority to start Specification 003 as a canonical successor while Specification 002 remains open and blocked.

Result:

`SPEC_003_SUCCESSOR_AUTHORITY = ABSENT`

## Executable-work conclusion

No later 002C–002G grain-specific canonical successor is dependency-independent under the current plan. 002H is optional and has no qualifying separate rights evidence. Broader 002A has no newly established workspace dependency. Specification 003 remains downstream of Specification 002.

Therefore the current canonical execution frontier, if this artifact and its ledger reconciliation become canonical, is an external evidence gate rather than another repository implementation unit:

`SPEC_002_EXECUTION_FRONTIER = BLOCKED_PENDING_FIRST_PARTY_PRISMA_SCHEMA_RIGHTS_CLARIFICATION`

The required external evidence must be sufficiently specific to the exact pinned Prisma package/schema rights scope. Generic founder approval, repository visibility, repository-level license metadata, commit authorship, operational convenience, or absence of a more-specific file-local license is not a substitute.

`UPSTREAM_OUTREACH_AUTHORITY = ABSENT`

This repository unit does not contact Documenso or create an upstream issue.

## Re-entry condition

A later repository unit may re-enter the 002B qualification path only after a genuinely available first-party rights/permission artifact or authoritative first-party clarification is preserved and is sufficiently specific to evaluate the exact intended action for the pinned path.

Re-entry still requires fresh canonical authority, path-level qualification, independent substantive review, exact-head qualification, and a separate Stage R event before any upstream source bytes may enter Signthos.

No automatic Stage R or import authority follows merely from receipt of new evidence.

## Non-grants

This frontier analysis grants none of the following:

- source import or adaptation;
- a source-import record;
- dependency installation;
- Prisma generation or migration execution;
- database/runtime/provider execution;
- Stage R;
- 002B–002H implementation;
- EE import or publication rights;
- upstream outreach;
- Specification 003 implementation or successor authority;
- Specification 002 closeout;
- a new `S2-Txxx` identity.

## Candidate conclusion

If this exact candidate passes independent substantive exact-head review, accurate workflow/check accounting, zero unresolved material review threads, guarded expected-head merge, and post-merge verification, the canonical result is:

- `002B_SUCCESSOR_FEASIBILITY = BLOCKED_PENDING_FIRST_PARTY_PRISMA_SCHEMA_CLARIFICATION`;
- `002B_ALTERNATIVE_QUALIFICATION_CANDIDATE = NONE`;
- `SPEC_002_STATUS = OPEN_BLOCKED_EXTERNAL_RIGHTS_EVIDENCE`;
- `SPEC_002_CLOSEOUT_ELIGIBILITY = FALSE`;
- `SPEC_002_EXECUTION_FRONTIER = BLOCKED_PENDING_FIRST_PARTY_PRISMA_SCHEMA_RIGHTS_CLARIFICATION`;
- `SPEC_003_SUCCESSOR_AUTHORITY = ABSENT`;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `UPSTREAM_OUTREACH_AUTHORITY = ABSENT`.

No `S2-T042` identity is created.
