# Specification 002B — Prisma Schema Implementation Intake

Status: `IMPLEMENTATION_INTAKE / ZERO_UPSTREAM_BYTES_AT_OPENING_HEAD`
Issue: #5
Canonical base: `f02335d11c2bc556f01fa4ff3c21c7859074600f`

## Purpose

Open the bounded 002B implementation review surface after canonical Stage R effectiveness, without admitting upstream bytes before the implementation pull-request number and immutable pending-review evidence exist.

This opening artifact is Signthos-authored. The opening head contains zero new upstream-derived bytes and no new source-import record.

## Effective authority

Canonical PR #72 post-merge evidence: `github:issue-comment:5552760056`.

Effective authority is limited to:

- upstream repository: `documenso/documenso`;
- pinned commit: `2cac63a000e22422bdea449f68b8025e709aa73a`;
- upstream path: `packages/prisma/schema.prisma`;
- upstream Git blob: `13768e34f62331474fce63b1ca67f8d5ead44854`;
- upstream size: `38099` bytes;
- upstream SHA-256: `0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931`;
- destination: `packages/prisma/schema.prisma`;
- transformation: `COPY_EXACT` / `copied`;
- rights basis: `permission-artifact:documenso-signthos-private-v1`;
- future v2 record: `provenance/imports/U001-I0002.json`.

## Opening-head boundary

Before this pull request number exists, `U001-I0002.json` cannot truthfully satisfy the canonical v2 `review.pull_request` requirement. Therefore this opening commit intentionally contains neither the upstream schema bytes nor the provenance record.

After the pull request exists, the next implementation commit must admit the exact schema bytes and the corresponding truthful `review.status = pending` v2 record together, with the real PR number and immutable GitHub evidence.

## Static characterization scope

This grain treats the imported file only as a static declarative database/domain baseline.

Allowed characterization includes independently authored inspection of:

- generator and datasource declarations as static text;
- enums and models;
- field types, defaults, unique/index constraints, relation declarations, and cascade/set-null behaviors;
- document/envelope/recipient/signature/domain relationships represented in the schema;
- provider/environment-variable names as static declarations only;
- upstream `@zod.import` annotations as static dependency references only.

No characterization step may execute Prisma or connect to any database/provider.

## Explicit non-execution boundary

This implementation does not authorize or perform:

- package installation;
- `prisma generate`;
- migrations;
- seed execution;
- Prisma Studio;
- database connections;
- environment credentials;
- network/provider access;
- generated clients;
- adjacent `packages/prisma/**` files;
- any `packages/ee/**` path.

## Rights and provenance boundary

The public AGPL/MIT path metadata remains `unresolved_conflict`; no SPDX expression may be synthesized for this record.

The private permission artifact remains a separate non-secret reference. Confidential permission text must not be committed.

Private-grant distribution obligations remain `RESOLVED_NONE_ADDITIONAL` with `required_artifacts = []` for obligations imposed by that grant only.

## Implementation sequence

1. Obtain this pull request's real number.
2. Create immutable pending provenance evidence on the pull request.
3. Add exact pinned schema bytes and `U001-I0002.json` together in one atomic repository commit.
4. Verify source/destination blob, size, and SHA-256.
5. Extend this Signthos-authored artifact with static characterization evidence as needed.
6. Run applicable provenance/source/NOTICE/format/test/CI qualification without Prisma execution or dependency installation.
7. Obtain independent substantive imported-byte exact-head review.
8. Apply only the bounded v2 review-status/evidence delta to `qualified_exact_head`.
9. Prove the schema bytes are unchanged across that metadata-only delta.
10. Re-run exact-head qualification, reconcile threads, guarded-merge, and post-merge verify.

No new `S2-Txxx` identity is created by this intake.