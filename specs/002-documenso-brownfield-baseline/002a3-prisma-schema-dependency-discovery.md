# 002A3 — First 002B dependency discovery

Status: `CANDIDATE / PLANNING_EVIDENCE_ONLY / ZERO_UPSTREAM_BYTES`
Task: `S2-T041`
Canonical Signthos base: `3ea95d37ddf42d7c02face0e89e29ab26c3710c6`
Pinned upstream snapshot: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Select one bounded 002B database/domain characterization candidate and identify only the repository/workspace prerequisites needed to characterize that candidate. This document is independently authored planning evidence. It commits no upstream-derived bytes, creates no source-import record, grants no Stage R authority, and does not start 002B implementation.

## Selected bounded characterization candidate

Selected upstream evidence identity:

- repository: `documenso/documenso`;
- revision: `2cac63a000e22422bdea449f68b8025e709aa73a`;
- path: `packages/prisma/schema.prisma`;
- upstream Git blob: `13768e34f62331474fce63b1ca67f8d5ead44854`;
- observed size: `38099` bytes.

The proposed first characterization is **static Prisma schema contract inventory only**: identify model names, enum names, relation topology, keys/uniqueness, defaults, field optionality, datasource/generator declarations, and other schema-declared constraints without generating a client, running migrations, starting a database, installing dependencies, or executing lifecycle scripts.

This is a characterization candidate, not an import allowlist.

## Upstream dependency observations

The pinned snapshot exposes `packages/prisma` as a workspace package. Public immutable upstream metadata shows:

- `packages/prisma/package.json` identifies package `@documenso/prisma`, declares Prisma-related build/generate/migrate/seed scripts, and declares Prisma/tool dependencies;
- `packages/prisma/tsconfig.json` extends `@documenso/tsconfig/react-library.json`;
- the root `package.json` declares workspaces covering `packages/*` and contains root scripts that invoke `@documenso/prisma` through npm workspace commands.

These facts establish that **executing the upstream package as a workspace package** has broader package-manager, dependency, shared-config, environment, and possibly database prerequisites. They do not establish that those prerequisites are needed for the selected static schema-only characterization.

## Exact prerequisite decision for this candidate

For the selected static schema contract inventory, current repository/workspace prerequisites are:

- root workspace manifest: **not required**;
- root lockfile: **not required**;
- `turbo.json`: **not required**;
- `packages/tsconfig/**`: **not required**;
- `packages/prisma/package.json`: **not required as imported/runtime bytes** for static schema parsing, though its immutable upstream metadata is relevant evidence for later executable-tooling qualification;
- Node/npm workspace resolution: **not required**;
- dependency installation: **not required**;
- Prisma client generation: **not required**;
- migration execution: **not required**;
- database service: **not required**;
- `.env` / `.env.local`: **not required**;
- network access, credentials, providers, deployment services: **not required**.

Therefore:

`002A3_STATIC_SCHEMA_WORKSPACE_PREREQUISITE = NONE_ESTABLISHED`

This result is intentionally narrower than claiming that future executable Prisma characterization has no prerequisites. If a later bounded unit requires `prisma generate`, migration replay, package compilation, or runtime database behavior, that unit must separately prove the exact minimum package/workspace/toolchain/environment surface it needs.

## Consequence for 002A

This discovery does **not** overturn the canonical M1 result from PR #51. It supplies the first real 002B candidate and proves that the minimum first characterization can remain independent of root workspace semantics.

No root `package.json`, `package-lock.json`, `turbo.json`, `packages/tsconfig/**`, or package workspace membership is qualified for import by this result.

If future 002B evidence requires executable Prisma tooling, the resulting exact prerequisite must return to a separately reviewed 002A qualification. Any proposed upstream bytes must then pass path-level rights/provenance evidence and a separate canonical Stage R authorization/effectiveness chain before import.

## Rights and authority boundary

This task performs dependency discovery only. It does not decide the path-level license/permission basis for `packages/prisma/schema.prisma` and does not infer import permission from repository-level metadata or package metadata.

The following remain prohibited by this task:

- copying or adapting `packages/prisma/schema.prisma` or any other upstream file into Signthos;
- creating a source-import record;
- importing root manifests, lockfiles, shared TypeScript configuration, migrations, generated clients, seed data, or any other `packages/prisma/**` content;
- dependency installation or package-network access;
- lifecycle, Prisma, migration, seed, database, runtime, provider, credential, or deployment execution;
- `packages/ee/**` access/import authority;
- 002B implementation;
- Specification 003 implementation.

## Acceptance evidence

This candidate is complete only if independent substantive review verifies all of the following on the exact PR head:

1. the selected candidate is bounded and genuinely belongs to the first 002B database/domain characterization surface;
2. the immutable upstream identities above are accurate;
3. the prerequisite decision distinguishes static schema characterization from future executable Prisma behavior;
4. no root/workspace prerequisite is claimed absent without explaining the narrower static characterization boundary;
5. zero upstream-derived bytes and zero source-import records are committed;
6. no import, Stage R, 002B implementation, runtime, or Specification 003 authority is inflated;
7. the PR is guarded-merged with expected-head protection and post-merge verified before `S2-T041` can be treated as canonical.

## Next dependency if canonical

If this exact discovery becomes canonical with no material finding, the next eligible work is **not import**. The repository must first choose a separately bounded 002B path-level qualification packet for the selected schema candidate, including exact license/provenance evidence and proposed independently authored static characterization, while preserving zero source-import authority until a later separate Stage R event.