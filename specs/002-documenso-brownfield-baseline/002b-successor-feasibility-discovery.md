# Specification 002B — Successor Feasibility Discovery

Status: `DISCOVERY_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / FAIL_CLOSED`
Issue: #5
Canonical base: `ea787bd968030507bd9f24323fa850a8e428593f`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Pinned upstream tree: `f97ae86f4c82501617aec8d0551f52e03c29feae`

## Purpose

Perform the single planning/evidence-only successor-feasibility discovery authorized by canonical PR #59.

The bounded question is whether one separate non-EE database/domain path from the pinned Documenso snapshot can be proposed for independent path qualification without depending on the blocked `packages/prisma/schema.prisma` candidate, or whether 002B must remain blocked pending first-party clarification of the Prisma package/schema license scope.

This document is Signthos-authored analysis only. It commits zero upstream-derived bytes, creates zero source-import records, executes no Prisma/database/runtime/provider behavior, and grants no Stage R or 002B implementation authority.

This is engineering provenance classification and repository governance, not legal advice.

## Canonical authority

Canonical PR #59 established only this successor boundary:

**perform one planning/evidence-only 002B successor-feasibility discovery to determine whether a separate bounded non-EE database/domain candidate from the same pinned snapshot can be qualified independently of blocked `packages/prisma/schema.prisma`, or whether 002B must remain blocked pending first-party clarification.**

The discovery may identify at most one proposed separately bounded qualification candidate. It may not import or adapt source, create source-import records, execute Prisma/database/runtime/provider behavior, choose a license from generic metadata, contact upstream parties, authorize `packages/ee/**`, grant Stage R/002B implementation authority, or create a new `S2-Txxx` task identity.

Starting state:

- `002B_PRISMA_SCHEMA_RIGHTS_CONFLICT_RESOLUTION = UNRESOLVED_REQUIRES_FIRST_PARTY_PATH_SCOPE_CLARIFICATION`;
- `002B_PRISMA_SCHEMA_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`;
- `002B_PRISMA_SCHEMA_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`;
- `002B_PRISMA_SCHEMA_COPYRIGHT_HOLDER = UNKNOWN_UNINFERRED`;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `002B_IMPLEMENTATION_AUTHORITY = ABSENT`.

## Feasibility criteria

A candidate is independently feasible for a later path qualification only if all of the following are true at discovery time:

1. it is genuinely part of the 002B database/domain baseline rather than a later 002C auth, 002D document/envelope, 002E editor/signing, 002F API/webhook, or 002G provider grain;
2. its static role can be characterized without requiring the blocked Prisma schema, generated Prisma model artifacts, Prisma Client generation, database execution, migration execution, dependency installation, credentials, network access, or provider runtime;
3. it is sufficiently bounded for one path-level qualification packet;
4. available evidence does not already prove that the same unresolved rights dependency makes the proposed qualification circular or unable to establish independence;
5. selecting it does not silently substitute an old migration delta, generated output, runtime adapter, or later-grain behavioral contract for the current database/domain baseline.

Failing these criteria does not make a path unusable forever. It means this discovery does not have evidence to select it as the independent successor to the blocked schema.

## Pinned package-level evidence

### `packages/prisma/**`

Canonical PRs #56 and #58 already established the exact unresolved rights state for `packages/prisma/schema.prisma`:

- pinned `packages/prisma/package.json` blob `44992d6e4f89d73e02b5d02a36ee3668e446394c` declares package license `MIT`;
- pinned Community/repository evidence supplies materially relevant AGPL-3.0 signals;
- exact `packages/prisma/` has no package-local `LICENSE` artifact resolving the scope relationship;
- first-party public evidence reviewed through PR #58 does not state whether `schema.prisma` is MIT, AGPL-3.0, or intentionally dual/alternative licensed.

The pinned `packages/prisma/.gitignore` is blob `9ab870da897d66e8575def4b3d3f89a614f7ad7a` and excludes `generated/`. Therefore generated Prisma/Zod model artifacts referenced elsewhere are not a separate tracked static source candidate in this snapshot.

No other path under `packages/prisma/**` inherits a resolved rights basis from the schema qualification. Package-level MIT metadata remains a signal, not path authorization.

### `packages/lib/**`

Pinned `packages/lib/package.json` is blob `84bcb86b992085f9ae87d85f896691196ce8f93c` and identifies package `@documenso/lib` with package metadata `license = MIT`.

The same manifest also declares a direct dependency on `@documenso/prisma` and many runtime/provider dependencies. Its package `files` list names `client-only/`, `server-only/`, and `universal/`; it does not itself define the license scope of every tracked `constants/**` or `types/**` source path.

A direct lookup for pinned `packages/lib/LICENSE` returns no file. Therefore this discovery does not treat the package-level MIT field as exact path-level authorization or as a resolution of the broader Community AGPL signal.

## Candidate class evaluation

### C1 — Prisma-derived domain constants

Observed exact path:

`packages/lib/constants/recipient-roles.ts`

Pinned blob:

`378b00df514355bf762e4ed289e41db424d9cd8f`

Static inspection shows that this file imports the `RecipientRole` enum from `@prisma/client`. Its contract therefore depends on Prisma Client generation/schema semantics and is not independent of the blocked Prisma domain source.

Result:

`C1 = REJECTED_NOT_PRISMA_INDEPENDENT`

### C2 — recipient response/domain types

Observed exact path:

`packages/lib/types/recipient.ts`

Pinned blob:

`25282846a9167d0c037dafabf089172dee3fde38`

Static inspection shows that it imports generated Prisma Zod model schemas for Recipient, Team, and User. These generated paths are downstream of Prisma generation and are excluded from tracked source by `packages/prisma/.gitignore`.

Result:

`C2 = REJECTED_GENERATED_PRISMA_DEPENDENCY`

### C3 — field/domain types

Observed exact path:

`packages/lib/types/field.ts`

Pinned blob:

`683f027d6473e6ae11d959541b29615931948579`

Static inspection shows that it imports a generated Prisma Field model schema and Prisma Client types/decimal behavior. It is not an independent static database/domain contract.

Result:

`C3 = REJECTED_GENERATED_AND_CLIENT_PRISMA_DEPENDENCY`

### C4 — document/domain response types

Observed exact path:

`packages/lib/types/document.ts`

Pinned blob:

`2205d91912b5fcdd9908c06a411247887fa7531d`

Static inspection shows that it imports multiple generated Prisma model schemas and a Prisma-package legacy document schema, and composes recipient/field contracts that are themselves Prisma-derived.

Its primary role is also closer to the later document/envelope contract grain than to an independent database baseline seed.

Result:

`C4 = REJECTED_PRISMA_DEPENDENT_AND_LATER_GRAIN`

### C5 — document metadata types

Observed exact path:

`packages/lib/types/document-meta.ts`

Pinned blob:

`12c1cf87c7d63baad4b2d3000266cace8985c447`

Static inspection shows that it imports a generated Prisma DocumentMeta model schema and Prisma Client enums. The file also explicitly ties some defaults to `schema.prisma` semantics.

Its behavioral surface concerns document/signing metadata, which belongs downstream of the database baseline.

Result:

`C5 = REJECTED_PRISMA_DEPENDENT_AND_LATER_GRAIN`

### C6 — technically Prisma-independent auth types

Observed exact path:

`packages/lib/types/document-auth.ts`

Pinned blob:

`e45f578a4c1b1917e9d0a7b25e320436eb691572`

This path does not directly import Prisma in the inspected source. However its contract is authentication/access/action behavior. That is a 002C auth concern, not a 002B database/domain replacement. The inspected contract also contains an Enterprise-plan restriction signal for one action-auth surface, so treating it as an uncomplicated community database candidate would collapse grain and rights boundaries.

Result:

`C6 = REJECTED_WRONG_GRAIN`

### C7 — Prisma migrations

Pinned migration root:

`packages/prisma/migrations/`

Pinned tree:

`7b9980ffc5fefa7dde60032414572f7ff17e240c`

Migrations are database-native evidence, but they remain under the same `packages/prisma/**` package for which the package-level MIT signal is unresolved relative to Community AGPL evidence at exact-path scope.

Representative exact historical migration:

`packages/prisma/migrations/20230404095503_initial_migration/migration.sql`

Pinned blob:

`052d9f0328ebea4fd5a884f6190aaa02bec3c98d`

Pinned size:

`4665` bytes

Its beginning contains SQL migration operations rather than a file-local license/copyright scope statement. It is an historical schema delta containing multiple domain/auth/account/document structures, not a bounded substitute for the current pinned database/domain contract. Selecting an old migration as the current 002B baseline would therefore change the characterization target rather than independently qualify the blocked current schema.

Result:

`C7 = REJECTED_SAME_RIGHTS_BOUNDARY_AND_NOT_CURRENT_BOUNDED_BASELINE`

### C8 — Prisma client/helpers/middleware/seeds

The pinned `packages/prisma/` directory also contains tracked client, helper, index, middleware, seed, and configuration surfaces. These are executable/runtime/tooling or data-seeding concerns rather than an independently authored static current domain contract. They remain in the same unresolved package-level rights boundary and do not eliminate the need for schema/domain truth.

Result:

`C8 = REJECTED_RUNTIME_TOOLING_OR_SEED_SURFACE`

## Synthesis

The discovery found two broad classes of alternatives:

1. database/domain surfaces that remain Prisma-derived, generated-Prisma-dependent, or inside the same unresolved `packages/prisma/**` rights boundary; and
2. technically more independent `packages/lib/**` contracts whose semantics belong to later grains such as auth, document/envelope, editor/signing, API, or provider behavior rather than the 002B database/domain baseline.

Moving a later-grain path into 002B solely because it is easier to qualify would violate the canonical dependency decomposition. Selecting a Prisma-derived type would not create independence. Selecting a migration would substitute historical delta semantics for current pinned domain truth while remaining inside the same unresolved package rights boundary.

The package-level `MIT` fields in `@documenso/prisma` and `@documenso/lib` are not treated as exact path authorization. The absence of package-local license artifacts does not prove AGPL instead. No license expression or copyright holder is inferred.

No independently qualifiable alternative 002B candidate is therefore established by this bounded discovery.

## Result candidate

`002B_SUCCESSOR_FEASIBILITY = BLOCKED_PENDING_FIRST_PARTY_PRISMA_SCHEMA_CLARIFICATION`

`002B_ALTERNATIVE_QUALIFICATION_CANDIDATE = NONE`

`002B_PRISMA_SCHEMA_RIGHTS_CONFLICT_RESOLUTION = UNRESOLVED_REQUIRES_FIRST_PARTY_PATH_SCOPE_CLARIFICATION`

`002B_PRISMA_SCHEMA_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`

`002B_PRISMA_SCHEMA_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`

`002B_PRISMA_SCHEMA_COPYRIGHT_HOLDER = UNKNOWN_UNINFERRED`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002B_IMPLEMENTATION_AUTHORITY = ABSENT`

`UPSTREAM_OUTREACH_AUTHORITY = ABSENT`

The blocker is external evidence, not implementation effort: sufficiently specific authoritative first-party clarification must establish the applicable license scope for the exact Prisma schema action before this schema candidate can proceed.

This result does not authorize Signthos to request that clarification from an upstream party. It records the dependency only.

## Consequence for downstream grains

The canonical plan states that Stage C depends on the required 002A/002B contracts plus separate C authorization, and later stages depend on the relevant preceding domain/auth/document contracts.

This discovery does not decide that every later grain is permanently impossible. It establishes only that the current 002B database/domain frontier has no independently qualifiable substitute under the present evidence.

No downstream source-import or implementation authority is created by skipping 002B. A later canonical dependency analysis is required before any claim that a later grain can proceed without the blocked 002B contract.

## Exact-head qualification requirements

Before this discovery can become canonical it must prove on its exact final head:

- complete change surface limited to this Signthos-authored discovery document;
- upstream-derived bytes committed: `0`;
- source-import records created: `0`;
- exact-head GitHub Actions accounting, with `NO_APPLICABLE_RUN` recorded if canonical Spec 002 path filters remain unchanged;
- neutral, skipped, unavailable, billing-blocked, rate-limited, or summary-only automated checks are not PASS;
- fresh independent substantive review of this complete exact head;
- reconciliation of every material finding;
- zero unresolved material review threads;
- unchanged exact base/head immediately before merge;
- guarded merge using exact `expected_head_sha`;
- post-merge verification of ancestry, tree equality, signature, change surface, and current governance.

## Successor boundary if canonical

If and only if this exact discovery becomes canonical after the required gates, the next internal unit is **planning/evidence-only post-discovery ledger reconciliation and dependency-frontier analysis**.

That unit may record this blocked 002B result and determine from canonical plan dependencies whether any later Spec 002 planning/evidence unit remains independently executable without pretending that missing 002B contracts exist.

It must not import or adapt upstream source; create source-import records; contact upstream parties; grant Stage R, 002B–002H implementation authority; authorize `packages/ee/**`; execute Prisma/database/runtime/provider behavior; or create `S2-T042` or another retroactive task identity.

If canonical dependency analysis finds no downstream planning/evidence work that can proceed without the blocked 002B contract, the correct repository state is an explicit external-evidence blocker rather than fabricated project completion.
