# Specification 002 — 002A3 First 002B Dependency Discovery

Status: `S2_T041_DISCOVERY_CANDIDATE / PLANNING_EVIDENCE_ONLY / ZERO_UPSTREAM_DERIVED_BYTES / ZERO_SOURCE_IMPORT_RECORDS`
Issue: #5
Canonical Signthos base: `3ea95d37ddf42d7c02face0e89e29ab26c3710c6`
Canonical reconciliation evidence: PR #52, exact reviewed head `99dc2147141868774afbebeb3efd7cfe558f063c`, merge `3ea95d37ddf42d7c02face0e89e29ab26c3710c6`, post-merge evidence `github:issue-comment:5550947633`
Pinned upstream snapshot: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Task: `S2-T041 / 002A3 — first 002B dependency discovery for repository/workspace prerequisites`

## 1. Authority and byte boundary

This unit is planning/evidence only. It does not start 002B implementation and does not authorize any upstream path for import.

This branch may contain only this independently authored discovery document and ordinary PR metadata/evidence. It must contain:

- zero copied, adapted, generated-from, or otherwise upstream-derived bytes;
- zero canonical source-import records;
- zero dependency installation or package-network activity;
- zero lifecycle, build, migration, database, provider, credential, deployment, or runtime execution.

Generic founder approval does not substitute for later path-level rights/provenance qualification, Stage R authorization, exact imported-byte review, CI, or other evidence-dependent gates.

## 2. Selected bounded 002B characterization candidate

The first bounded database/domain candidate is:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:packages/prisma/schema.prisma`

Observed immutable upstream identity:

- Git blob: `13768e34f62331474fce63b1ca67f8d5ead44854`;
- size: `38099` bytes;
- location: community path `packages/prisma/schema.prisma`, outside `packages/ee/**`;
- destination bytes: `NONE`;
- import authority: `ABSENT`.

This file is selected only as the future 002B characterization target because it is the pinned declarative database/domain contract containing the PostgreSQL datasource, Prisma generators, enums, models, relations, indexes, uniqueness constraints, defaults, and referential-action declarations needed to characterize the inherited data model.

Selection is not license qualification and is not permission to copy the file.

## 3. Observed schema/tooling facts

The pinned schema declares:

- PostgreSQL as the datasource provider;
- datasource environment names `NEXT_PRIVATE_DATABASE_URL` and `NEXT_PRIVATE_DIRECT_DATABASE_URL`;
- generators using `prisma-kysely`, `prisma-client-js`, `prisma-json-types-generator`, and `zod-prisma-types`;
- comments/annotations that can reference application-level `@documenso/lib/**` types for generated Zod output.

These observations establish future characterization implications only. They do not authorize credentials, a live database, generator execution, application-library imports, or package installation.

A future baseline characterization should prefer the least-authority observable contract. Static schema structure and Prisma schema validation/format behavior are separable from generated TypeScript application output, database migration execution, seed execution, and runtime application integration.

## 4. First real repository/workspace prerequisite

The first repository/package prerequisite proven by the selected schema candidate is:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:packages/prisma/package.json`

Observed immutable upstream identity:

- Git blob: `44992d6e4f89d73e02b5d02a36ee3668e446394c`;
- size: `1117` bytes;
- package name: `@documenso/prisma`;
- package-declared license field: `MIT`;
- destination bytes: `NONE`;
- import authority: `ABSENT`.

The package manifest pins/describes the package-local Prisma and generator toolchain needed if future characterization uses upstream-compatible Prisma validation or generation. Its declared dependency surface includes `@prisma/client`, `prisma`, `prisma-kysely`, `prisma-json-types-generator`, `zod-prisma-types`, and related package-local tooling.

The manifest also declares explicit build, format, migration, seed, studio, and generation scripts. None of those scripts is authorized for execution by this discovery. No script result is evidence in this unit.

### Decision D002A3-1

`packages/prisma/package.json` is the first exact path that must return to a separately reviewed 002A Stage-Q-style qualification before any schema implementation/import can proceed with an upstream-compatible package toolchain.

This discovery does not itself qualify the path and does not create Stage R eligibility.

## 5. Root workspace manifest is still not proven necessary

The pinned root `package.json` declares broad workspace globs `apps/*` and `packages/*`, root lifecycle/build/dev/deployment-oriented scripts, a large dependency surface, npm/Node engine requirements, and workspace convenience commands such as `npm run ... -w @documenso/prisma`.

For the selected single-file schema characterization target, those broad root workspace semantics are not yet proven necessary:

- the schema has an exact package-local manifest;
- package-local Prisma/schema characterization can be designed without declaring all `apps/*` or `packages/*` as Signthos workspace members;
- the root manifest would admit or describe unrelated application/workspace surfaces, including patterns broad enough to cover restricted `packages/ee/**`;
- root `package-lock.json` and `turbo.json` therefore remain outside the current minimum prerequisite set.

### Decision D002A3-2

`ROOT_PACKAGE_JSON_NECESSITY = NOT_ESTABLISHED_FOR_SCHEMA_ONLY_CHARACTERIZATION`.

This does not permanently prohibit a root manifest. A later exact dependency may prove a narrower root/toolchain contract necessary, in which case it must return to 002A qualification rather than being inferred here.

## 6. TypeScript workspace configuration is not a current schema-only prerequisite

The pinned `packages/prisma/tsconfig.json` extends `@documenso/tsconfig/react-library.json`. The referenced shared configuration package contains an exact package manifest plus `react-library.json`, which extends `base.json`.

That chain is a real workspace dependency for TypeScript package compilation. It is not required merely to identify or characterize the declarative Prisma schema contract itself.

Observed shared-config identities relevant only if a later grain expands to TypeScript compilation:

- `packages/prisma/tsconfig.json`: blob `4aefcb98c13a0f69584c741a4a40144553f92ac4`, 126 bytes;
- `packages/tsconfig/package.json`: blob `b22d7d2ed75db7249c7269b9f0130e096da1c621`, 231 bytes, package name `@documenso/tsconfig`, package-declared license `MIT`;
- `packages/tsconfig/react-library.json`: blob `cdc684e3d0b80bdcecd5cc10bf117e661d32dfbc`, 367 bytes;
- `packages/tsconfig/base.json`: blob `aaa62ea73c63ce2a501bef3b2e7af323e68a258c`, 654 bytes.

### Decision D002A3-3

`TSCONFIG_WORKSPACE_CHAIN_NECESSITY = NOT_ESTABLISHED_FOR_SCHEMA_ONLY_CHARACTERIZATION`.

If a later authorized baseline requires TypeScript helpers, generated client code, or compilation of `packages/prisma/*.ts`, that later unit must return to 002A and qualify the exact minimal shared-config chain. It must not import the whole `packages/tsconfig/**` directory by default.

## 7. Lockfile and dependency execution boundary

This discovery does not authorize dependency installation. Therefore it does not claim that the repository-wide root lockfile is currently required.

If a future authorized characterization needs installed Prisma/generator packages, the qualification must separately determine the minimum deterministic dependency closure and whether preserving upstream behavior requires any exact lockfile material. The current whole-workspace root lockfile must not be imported merely because npm dependencies exist.

`ROOT_PACKAGE_LOCK_NECESSITY = UNRESOLVED_UNTIL_INSTALL_IS_SEPARATELY_AUTHORIZED`.

No dependency or transitive package receives provenance/license approval from this statement.

## 8. Application-type references do not widen this grain

The schema contains generator annotations that reference `@documenso/lib/**` application types. Those references are relevant to generated Zod application output, not to the minimum declarative schema-selection decision made here.

Therefore:

- no `@documenso/lib/**` source is a current 002A prerequisite;
- no generator output is a current import candidate;
- no app/domain helper source enters the current allowlist;
- if future characterization requires those generated semantics, they must be discovered and qualified as separate dependencies under canonical ordering.

## 9. Exact result

`S2_T041_SELECTED_002B_CANDIDATE = packages/prisma/schema.prisma`

`S2_T041_FIRST_RETURN_TO_002A_QUALIFICATION = packages/prisma/package.json`

`S2_T041_ROOT_PACKAGE_JSON_NECESSITY = NOT_ESTABLISHED`

`S2_T041_ROOT_PACKAGE_LOCK_NECESSITY = UNRESOLVED_UNTIL_INSTALL_AUTHORIZED`

`S2_T041_TSCONFIG_WORKSPACE_CHAIN_NECESSITY = NOT_ESTABLISHED_FOR_SCHEMA_ONLY_CHARACTERIZATION`

`S2_T041_UPSTREAM_DERIVED_BYTES_COMMITTED = 0`

`S2_T041_SOURCE_IMPORT_RECORDS_CREATED = 0`

`S2_T041_STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`S2_T041_SUCCESSOR_IMPORT_AUTHORITY = ABSENT`

`S2_T041_002B_IMPLEMENTATION_AUTHORITY = ABSENT`

## 10. Proposed dependency-ordered successor

If and only if this exact discovery becomes canonical after independent substantive review, exact-head accounting, guarded expected-head merge, and post-merge verification, the next bounded activity is:

`002A4 — packages/prisma/package.json pre-import qualification`

That successor must remain planning/evidence only. It must, at minimum:

1. verify exact byte identity/digest for `packages/prisma/package.json` at the pinned snapshot;
2. perform path-level license/notice/copyright/provenance analysis without inferring ownership;
3. classify every declared script and direct dependency relevant to the proposed bounded characterization;
4. determine whether a package-local destination manifest can preserve only the required Prisma/schema contract without broad root-workspace authority;
5. determine the deterministic dependency/lock strategy without installing or executing dependencies unless separately authorized;
6. keep all upstream-derived bytes and source-import records prohibited;
7. return a Stage R candidate only if every required gate is actually satisfied.

`002A4` must not import `packages/prisma/package.json`, `schema.prisma`, root `package.json`, root `package-lock.json`, `turbo.json`, `packages/prisma/tsconfig.json`, `packages/tsconfig/**`, or any other upstream path.

002B implementation remains blocked until every repository/workspace prerequisite actually required by the selected schema grain has been canonically qualified, separately authorized where import is proposed, implemented, reviewed, qualified, merged, and post-merge verified.

## 11. Explicit non-grants

This discovery grants no authority to:

- copy or adapt `packages/prisma/schema.prisma`;
- copy or adapt `packages/prisma/package.json`;
- create or modify a destination root/package workspace manifest;
- import root `package-lock.json` or `turbo.json`;
- import `packages/prisma/tsconfig.json` or any `packages/tsconfig/**` file;
- import any `@documenso/lib/**`, `apps/**`, `packages/ee/**`, migration, seed, generated, vendor, or application source;
- install npm dependencies;
- execute Prisma generators, migration commands, seed commands, lifecycle scripts, or database operations;
- use real database URLs, credentials, providers, paid services, or deployment infrastructure;
- create canonical source-import records;
- start 002B implementation;
- start Specification 003 implementation.

All rights/provenance, review, CI, Stage R, expected-head merge, and post-merge gates remain fail-closed.