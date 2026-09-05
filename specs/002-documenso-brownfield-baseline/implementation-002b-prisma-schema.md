# Specification 002B — Prisma Schema Implementation Intake

Status: `IMPLEMENTATION_CANDIDATE / EXACT_SOURCE_ADMITTED / PROVENANCE_PENDING / STATIC_CHARACTERIZATION_RECORDED`
Issue: #5
Canonical base: `f02335d11c2bc556f01fa4ff3c21c7859074600f`

## Purpose

Open and qualify the bounded 002B implementation review surface after canonical Stage R effectiveness while preserving provenance-before-import, exact-copy integrity, and a static-only database/domain characterization boundary.

The opening head contained zero upstream-derived bytes and no source-import record. The current implementation candidate now contains only the exact Stage R-authorized Prisma schema bytes, the corresponding pending v2 source-import record, and this Signthos-authored characterization/evidence artifact.

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
- v2 record: `provenance/imports/U001-I0002.json`.

## Opening-head boundary

Before PR #73 existed, `U001-I0002.json` could not truthfully satisfy the canonical v2 `review.pull_request` requirement. The opening commit therefore intentionally contained neither the upstream schema bytes nor the provenance record.

After PR #73 existed, immutable pending evidence `github:issue-comment:5552771594` was created, and the exact schema bytes and `U001-I0002.json` were admitted together. The record remains `review.status = pending` and is deliberately non-import-ready until independent imported-byte exact-head review exists.

## Exact-copy integrity

The admitted destination must remain byte-identical to the authorized upstream source:

- destination Git blob: `13768e34f62331474fce63b1ca67f8d5ead44854`;
- destination size: `38099` bytes;
- destination SHA-256: `0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931`.

No normalization, whitespace repair, formatting, source edit, adaptation, code generation, migration, or schema rewrite is permitted in this grain.

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

## Static characterization evidence

The following counts were obtained by static inspection of the exact authorized upstream blob and are characterization evidence only. They do not assert generated-client, migration, database, application-runtime, authorization-runtime, or provider behavior.

- generator blocks: `4` — `kysely`, `client`, `json`, `zod`;
- datasource blocks: `1`;
- datasource provider declaration: `postgresql`;
- datasource environment-variable names: `NEXT_PRIVATE_DATABASE_URL`, `NEXT_PRIVATE_DIRECT_DATABASE_URL`;
- model declarations: `47`;
- enum declarations: `19`;
- explicit `@relation(...)` declarations: `41`;
- model-level `@@index(...)` declarations: `19`;
- model-level compound `@@unique(...)` declarations: `7`;
- relation declarations containing `onDelete: Cascade`: `34`;
- relation declarations containing `onDelete: SetNull`: `8`;
- `@zod.import` annotations: `10`.

Representative static contract surfaces visible in the schema include users/accounts/sessions, organisations/teams/membership, envelopes/document items/document metadata, recipients/fields/signatures, webhooks/API tokens, background jobs, email/domain configuration, and organisation/team settings. These names and relationships are recorded only as declarative schema facts; no runtime semantics are inferred from them.

Characterization methodology:

1. inspect the immutable pinned schema bytes as text;
2. count exact declaration/annotation forms;
3. record only observable declarations and references;
4. do not install packages;
5. do not invoke Prisma;
6. do not open database connections;
7. do not read credentials or environment values;
8. do not make provider/runtime calls;
9. do not generate clients, migrations, fixtures, or derived source.

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

`U001-I0002.json` remains pending until independent imported-byte exact-head review exists. A pending record is intentionally rejected by import-readiness/NOTICE qualification and that failure must never be reported as PASS.

## Implementation sequence

1. Obtain this pull request's real number. — completed by PR #73.
2. Create immutable pending provenance evidence on the pull request. — completed by `github:issue-comment:5552771594`.
3. Add exact pinned schema bytes and `U001-I0002.json` together. — completed with exact schema blob `13768e34f62331474fce63b1ca67f8d5ead44854`.
4. Verify source/destination blob, size, and SHA-256. — completed for the current candidate.
5. Extend this Signthos-authored artifact with static characterization evidence. — completed by this revision.
6. Run applicable provenance/source/NOTICE/format/test/CI qualification without Prisma execution or dependency installation. — pending records are expected to fail only the import-readiness/NOTICE gate until step 7 completes.
7. Obtain independent substantive imported-byte exact-head review.
8. Apply only the bounded v2 review-status/evidence delta to `qualified_exact_head` after clean independent review.
9. Prove the schema bytes are unchanged across that metadata-only delta.
10. Re-run exact-head qualification, reconcile threads, guarded-merge, and post-merge verify.

No new `S2-Txxx` identity is created by this intake. No 002C–002H or Specification 003 authority is created by this artifact.