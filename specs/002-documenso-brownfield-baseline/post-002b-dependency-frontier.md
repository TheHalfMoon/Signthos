# Specification 002 — Post-002B Dependency Frontier

Status: `FRONTIER_ANALYSIS_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #5
Canonical base: `ad4140bdecd35c2d294f1bb52242ff4c21ac3d01`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Perform the planning/evidence-only dependency-frontier analysis authorized by canonical PR #60 after the 002B successor-feasibility discovery concluded that no independent alternative 002B database/domain candidate is currently established.

This document determines what later Specification 002 work is still internally executable without pretending that the blocked 002B contract exists.

It imports no upstream-derived bytes, creates no source-import records, executes no dependency/Prisma/database/runtime/provider behavior, and grants no Stage R or 002B–002H implementation authority.

## Canonical starting state

Canonical PR #60 established:

- `002B_SUCCESSOR_FEASIBILITY = BLOCKED_PENDING_FIRST_PARTY_PRISMA_SCHEMA_CLARIFICATION`;
- `002B_ALTERNATIVE_QUALIFICATION_CANDIDATE = NONE`;
- `002B_PRISMA_SCHEMA_RIGHTS_CONFLICT_RESOLUTION = UNRESOLVED_REQUIRES_FIRST_PARTY_PATH_SCOPE_CLARIFICATION`;
- `002B_PRISMA_SCHEMA_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`;
- `002B_PRISMA_SCHEMA_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `002B_IMPLEMENTATION_AUTHORITY = ABSENT`;
- `UPSTREAM_OUTREACH_AUTHORITY = ABSENT`.

The blocked evidence dependency remains sufficiently specific first-party clarification of the exact Prisma schema/package license scope. This analysis does not authorize Signthos to request that clarification.

## Canonical dependency rules

The canonical `plan.md` defines implementation/characterization dependencies as follows:

- 002B depends on canonical 002A plus separate B authorization;
- 002C depends on required 002A/002B contracts plus separate C authorization;
- 002D depends on required domain/auth baselines plus separate D authorization;
- 002E depends on required domain/document baselines plus separate E authorization;
- 002F depends on relevant domain/auth/document contracts plus separate F authorization;
- 002G depends on relevant domain/workflow contracts plus separate G authorization;
- 002H is `BLOCKED / OPTIONAL / MAY_REMAIN_EMPTY` and requires exact separate rights evidence if ever used.

The canonical `spec.md` also states that failure or uncertainty at an import-authorization item blocks the affected import without blocking unrelated planning.

These two rules must be applied together. The blocked 002B contract prevents downstream implementation/behavioral characterization that requires that contract, but it does not automatically prohibit independent metadata/path/rights planning that neither imports source nor assumes the missing contract exists.

## Frontier analysis

### 002A — repository/workspace baseline

Canonical earlier evidence remains:

- exact `.npmrc` implementation is closed canonical;
- `BROADER_002A_STATUS = OPEN_PENDING_REAL_WORKSPACE_DEPENDENCY_DISCOVERY`;
- no current root-manifest necessity was established for the bounded static schema inventory;
- no later grain may invent workspace/toolchain necessity before a real bounded dependency demonstrates it.

The 002B blocker does not create a new 002A dependency to import. Therefore no new 002A implementation or root-manifest action is authorized now.

Result:

`002A_FRONTIER = OPEN_PENDING_REAL_WORKSPACE_DEPENDENCY`

### 002B — database/domain baseline

No independent alternative current database/domain candidate was established by canonical PR #60, and exact `packages/prisma/schema.prisma` remains rights-blocked.

Therefore:

`002B_IMPLEMENTATION_FRONTIER = BLOCKED_EXTERNAL_FIRST_PARTY_RIGHTS_EVIDENCE`

`002B_PLANNING_FRONTIER = NO_FURTHER_INTERNAL_SCHEMA_RIGHTS_WORK_IDENTIFIED`

No Stage R proposal, import branch, database characterization, migration execution, Prisma generation, or source-import record is eligible.

### 002C — auth baseline

002C implementation and behavioral characterization require the required 002A/002B contracts plus separate C authorization. Those implementation gates are not satisfied.

However, a bounded planning-only discovery can still inspect immutable public path identities, dependency relationships, and rights signals for one possible auth candidate without importing it, running it, asserting database behavior, or creating C authorization.

This is materially distinct from prematurely implementing C: it can answer whether there is even a path worth later qualifying, while preserving the missing 002B contract as an explicit implementation blocker.

Observed public evidence already shows that `packages/lib/types/document-auth.ts` is semantically auth-related and is not directly Prisma-importing in the inspected file, but this frontier analysis does **not** select or qualify that path. Its package-level rights signals and exact fit within the full 002C baseline still require separately bounded discovery.

Result:

`002C_IMPLEMENTATION_AUTHORITY = ABSENT`

`002C_CHARACTERIZATION_AUTHORITY = ABSENT`

`002C_NEXT_PLANNING_UNIT = ONE_BOUNDED_AUTH_CANDIDATE_DISCOVERY`

### 002D — document/envelope baseline

002D depends on required domain/auth baselines. 002B is blocked and 002C has not even completed bounded candidate discovery.

Opening 002D planning now would front-run the dependency-ordered 002C planning frontier without necessity.

Result:

`002D_FRONTIER = DEFERRED_BEHIND_002C_PLANNING_AND_REQUIRED_DOMAIN_AUTH_CONTRACTS`

### 002E — editor/signing baseline

002E depends on required domain/document baselines. Those baselines are not available.

Result:

`002E_FRONTIER = DEFERRED_BEHIND_REQUIRED_DOMAIN_DOCUMENT_CONTRACTS`

### 002F — API/webhook baseline

002F depends on relevant domain/auth/document contracts. Those contracts are not available canonically.

Result:

`002F_FRONTIER = DEFERRED_BEHIND_REQUIRED_DOMAIN_AUTH_DOCUMENT_CONTRACTS`

### 002G — mail/storage/job baseline

002G depends on relevant domain/workflow contracts. The necessary predecessor baseline chain is not established.

Result:

`002G_FRONTIER = DEFERRED_BEHIND_REQUIRED_DOMAIN_WORKFLOW_CONTRACTS`

### 002H — separately permitted EE paths

The canonical plan explicitly permits 002H to remain empty. No separately accepted exact EE rights evidence is canonical, and generic visibility/permission does not qualify.

Result:

`002H_FRONTIER = OPTIONAL_EMPTY / NO_CURRENT_RIGHTS_PACKET`

This is not a blocker to community-baseline success by itself.

## Why 002C planning is the only next internal unit

The dependency-ordering rule prevents jumping to D–G while the next auth planning boundary is unresolved.

The unrelated-planning rule prevents over-broadly declaring all future planning impossible merely because 002B import is blocked.

A single 002C candidate discovery is therefore the narrowest next internal action that:

1. respects dependency order;
2. does not assume the missing 002B contract exists;
3. does not import or execute anything;
4. can expose path-specific rights/dependency facts useful to later decisions;
5. can fail closed without inflating implementation authority.

The discovery must not turn a semantically convenient file into a selected import path merely because it has fewer dependencies. It must evaluate exact grain fit, exact path identity, package/path rights evidence, generated/vendor/EE markers, and static dependency requirements.

## Result candidate

`SPEC002_CURRENT_STATE = IMPLEMENTATION_BLOCKED_AT_002B_EXTERNAL_RIGHTS_EVIDENCE / PLANNING_CAN_CONTINUE_BOUNDEDLY`

`002B_SUCCESSOR_FEASIBILITY = BLOCKED_PENDING_FIRST_PARTY_PRISMA_SCHEMA_CLARIFICATION`

`002C_NEXT_PLANNING_UNIT = ONE_BOUNDED_AUTH_CANDIDATE_DISCOVERY`

`002D_002G_PLANNING_FRONTIER = DEFERRED_BEHIND_002C_AND_REQUIRED_PREDECESSOR_CONTRACTS`

`002H_FRONTIER = OPTIONAL_EMPTY / NO_CURRENT_RIGHTS_PACKET`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002B_IMPLEMENTATION_AUTHORITY = ABSENT`

`002C_IMPLEMENTATION_AUTHORITY = ABSENT`

`UPSTREAM_OUTREACH_AUTHORITY = ABSENT`

Specification 002 is not `CLOSED_CANONICAL`. Its implementation cannot complete while the required 002B database/domain contract remains rights-blocked.

## Exact-head qualification requirements

Before this frontier analysis can become canonical it must prove on its exact final head:

- complete change surface is limited to Signthos-authored Specification 002 planning/reconciliation artifacts;
- upstream-derived bytes committed: `0`;
- source-import records created: `0`;
- accurate exact-head workflow/check accounting;
- fresh independent substantive review;
- reconciliation of every material finding;
- zero unresolved material review threads;
- unchanged exact base/head immediately before merge;
- guarded merge with exact `expected_head_sha`;
- post-merge verification before opening 002C discovery.

## Successor boundary if canonical

If and only if this frontier analysis and its ledger reconciliation become canonical after the required gates, the next internal unit is:

**perform one planning/evidence-only 002C auth candidate discovery against the pinned upstream snapshot, selecting at most one separately bounded non-EE auth candidate for later path qualification if exact grain fit, static dependency independence, and rights evidence justify doing so.**

That discovery may inspect immutable public repository/path/blob/package/policy/dependency evidence only. It must commit zero upstream-derived bytes and create zero source-import records. It must not execute authentication behavior, install dependencies, generate Prisma artifacts, access a database/network/provider/credential, authorize source import, contact upstream parties, authorize `packages/ee/**`, grant Stage R/C implementation authority, bypass the blocked 002B implementation dependency, or create `S2-T042` or another retroactive task identity.

If no useful independently discoverable 002C candidate exists, the discovery must fail closed rather than expanding scope to D–G.
