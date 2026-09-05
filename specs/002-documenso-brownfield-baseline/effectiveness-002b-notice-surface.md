# Specification 002B — Deterministic NOTICE Surface Effectiveness

Status: `EFFECTIVENESS_CANDIDATE / NOT_YET_CANONICAL`
Issue: #5
Canonical base: `69e8e17dac37b23c3f9bf50895dff21901e6034d`

## Purpose

Perform the separately required post-merge governance proof for the deterministic NOTICE surface amendment created by canonical PR #74.

This unit changes no source, provenance record, NOTICE byte, workflow, tool, dependency, or runtime surface. It only determines whether the already-canonical amendment is complete and bounded enough to become operational for PR #73.

## Canonical chain

The following chain is canonical on `main`:

1. 002B exact Prisma Stage R authorization;
2. 002B Stage R effectiveness proof;
3. PR #73 implementation authority for exact `COPY_EXACT` Prisma schema import;
4. independent imported-byte review of PR #73 and subsequent metadata-only promotion of `U001-I0002.json` to `qualified_exact_head`;
5. exact-head CI run `33977107574`, which proves that the only remaining failure is deterministic NOTICE drift after the qualified v2 record becomes import-ready;
6. PR #74 deterministic NOTICE surface amendment, merged as `69e8e17dac37b23c3f9bf50895dff21901e6034d` after independent exact-head `NO_MATERIAL_FINDINGS` review.

PR #74 post-merge evidence is `github:issue-comment:5553123588`.

## Live implementation state proved by this effectiveness unit

PR #73 remains open and unmerged.

Its current qualified implementation head before NOTICE regeneration is:

`8617ae23183a8aaf8d3c35293eace78350c1225d`

On that exact head:

- `packages/prisma/schema.prisma` remains exact authorized Git blob `13768e34f62331474fce63b1ca67f8d5ead44854`, size `38099`, SHA-256 `0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931`;
- `U001-I0002.json` is `qualified_exact_head` and binds independent review `github:issue-comment:5553077805`;
- characterization is independently reconciled;
- no extra upstream path entered;
- workflow `33977107574` is `FAILURE`, not PASS;
- formatting, locked dependency verification, strict Clippy, and every test before NOTICE synchronization pass;
- the only test failures are deterministic NOTICE byte-currentness checks with diagnostic `NOTICE_DRIFT: NOTICE differs from deterministic canonical projection`.

## Effectiveness determination candidate

The PR #74 amendment is now canonical, tree-equal to its independently reviewed head, signed by GitHub, and present at canonical `main = 69e8e17dac37b23c3f9bf50895dff21901e6034d`.

The amendment is sufficient to activate exactly one additional implementation surface for PR #73:

`NOTICE`

and only for the deterministic canonical provenance projection caused by the already-qualified `U001-I0002.json` record.

Subject to independent exact-head review and canonicalization of this effectiveness document:

`002B_NOTICE_SURFACE_AUTHORITY = EFFECTIVE_DETERMINISTIC_PROJECTION_ONLY`

## Operational boundary after effectiveness

If this effectiveness proof becomes canonical, PR #73 may perform exactly one new repository mutation class:

- regenerate/update root `NOTICE` to the canonical deterministic output produced by the existing Signthos provenance tool for the exact qualified implementation head.

The mutation must preserve:

- exact Prisma schema blob/size/SHA-256;
- qualified `U001-I0002.json` review identity and evidence;
- characterization evidence;
- all existing upstream/public-license/private-permission boundaries.

The resulting exact head must then pass the complete Provenance workflow, including NOTICE tests/checks, canonical validation and any applicable source verification.

## Non-grants

This effectiveness proof does not authorize:

- any new upstream byte or path;
- any adjacent `packages/prisma/**` path;
- any `packages/ee/**` path;
- hand-authored/unrelated NOTICE edits;
- provenance tool/schema/validator changes;
- package installation;
- Prisma generation, migration, seed, Studio, database, network, provider, credentials or generated outputs;
- 002C–002H implementation;
- Specification 003 implementation.

## Qualification gate

Before effectiveness becomes canonical require:

1. exact-head workflow/check accounting;
2. fresh independent substantive exact-head review;
3. reconciliation of every material finding;
4. zero unresolved material review threads;
5. unchanged canonical base/head;
6. guarded merge with exact `expected_head_sha`;
7. post-merge verification.

Until then, root `NOTICE` remains unauthorized for mutation under the 002B implementation grain.