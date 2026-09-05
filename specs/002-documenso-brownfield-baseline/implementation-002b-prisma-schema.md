# Specification 002B — Prisma Schema Implementation Intake

Status: `IMPLEMENTATION_CANDIDATE / EXACT_SOURCE_ADMITTED / PROVENANCE_QUALIFIED / NOTICE_SYNCHRONIZED / FINAL_QUALIFICATION_PENDING`
Issue: #5
Canonical implementation base: `f02335d11c2bc556f01fa4ff3c21c7859074600f`

## Purpose

Qualify the bounded 002B implementation review surface after canonical Stage R effectiveness while preserving provenance-before-import, exact-copy integrity, static-only database/domain characterization, and deterministic NOTICE synchronization.

The opening head contained zero upstream-derived bytes and no source-import record. The current implementation candidate contains only the exact Stage R-authorized Prisma schema bytes, the corresponding qualified v2 source-import record, this Signthos-authored characterization/evidence artifact, and the deterministic root `NOTICE` projection authorized later by canonical PRs #74 and #75.

## Effective authority

Canonical PR #72 post-merge evidence: `github:issue-comment:5552760056`.

Effective source-import authority is limited to:

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

Canonical PR #74 added only root `NOTICE` as deterministic derivative bookkeeping for this grain. Canonical PR #75 made only that bounded NOTICE surface effective. Those events do not expand the upstream source allowlist or runtime/dependency authority.

## Opening-head and qualification boundary

Before PR #73 existed, `U001-I0002.json` could not truthfully satisfy the canonical v2 `review.pull_request` requirement. The opening commit therefore intentionally contained neither the upstream schema bytes nor the provenance record.

After PR #73 existed, immutable pending evidence `github:issue-comment:5552771594` was created, and the exact schema bytes and `U001-I0002.json` were admitted together with `review.status = pending`.

Independent imported-byte review found one material issue only in the Signthos-authored characterization counts. That issue was corrected without changing the imported schema bytes or provenance record. Fresh exact-head re-review then returned `NO_MATERIAL_FINDINGS` as `github:issue-comment:5553077805`, and the bounded metadata-only authorization delta changed the record to `review.status = qualified_exact_head` with that immutable review evidence.

The later deterministic NOTICE delta changed only root `NOTICE`; comparison from qualified head `8617ae23183a8aaf8d3c35293eace78350c1225d` to NOTICE-synchronized head `b8f0e628ea367cb0c6e9fb30fc0f2b62c0e550a1` shows exactly one changed file, `NOTICE`, with one added source-import projection line.

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

The following counts were obtained by static inspection of the exact authorized upstream blob and were independently re-counted during the imported-byte review. They are characterization evidence only. They do not assert generated-client, migration, database, application-runtime, authorization-runtime, or provider behavior.

- generator blocks: `4` — `kysely`, `client`, `json`, `zod`;
- datasource blocks: `1`;
- datasource provider declaration: `postgresql`;
- datasource environment-variable names: `NEXT_PRIVATE_DATABASE_URL`, `NEXT_PRIVATE_DIRECT_DATABASE_URL`;
- model declarations: `51`;
- enum declarations: `30`;
- explicit `@relation(...)` declarations: `64`;
- model-level `@@index(...)` declarations: `44`;
- model-level compound `@@unique(...)` declarations: `7`;
- relation declarations containing `onDelete: Cascade`: `49`;
- relation declarations containing `onDelete: SetNull`: `8`;
- `@zod.import` annotations: `10`.

The corrected counts above reconcile the material static-characterization finding reported by independent review `github:issue-comment:5553047221`. The imported schema bytes and provenance record were not changed by that reconciliation.

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

The public AGPL/MIT path metadata remains `unresolved_conflict`; no SPDX expression is synthesized for this record.

The private permission artifact remains a separate non-secret reference. Confidential permission text is not committed.

Private-grant distribution obligations remain `RESOLVED_NONE_ADDITIONAL` with `required_artifacts = []` for obligations imposed by that grant only.

`U001-I0002.json` is now `review.status = qualified_exact_head` with immutable evidence `github:issue-comment:5553077805`. This status records the completed imported-byte review gate; it does not waive final exact-head CI, final substantive review, unresolved-thread reconciliation, expected-head guarded merge, or post-merge verification.

## Implementation sequence

1. Obtain this pull request's real number. — completed by PR #73.
2. Create immutable pending provenance evidence on the pull request. — completed by `github:issue-comment:5552771594`.
3. Add exact pinned schema bytes and `U001-I0002.json` together. — completed with exact schema blob `13768e34f62331474fce63b1ca67f8d5ead44854`.
4. Verify source/destination blob, size, and SHA-256. — completed for the candidate.
5. Extend this Signthos-authored artifact with static characterization evidence. — completed and corrected after independent review `github:issue-comment:5553047221`.
6. Run pre-review qualification. — completed; pending provenance correctly failed only import-readiness/NOTICE gates while earlier formatting, dependency, Clippy, and test steps passed.
7. Obtain independent substantive imported-byte exact-head review and reconcile material findings. — completed; corrected characterization counts and clean re-review `github:issue-comment:5553077805 = NO_MATERIAL_FINDINGS`.
8. Apply only the bounded v2 review-status/evidence delta to `qualified_exact_head`. — completed at head `8617ae23183a8aaf8d3c35293eace78350c1225d`.
9. Prove the schema bytes are unchanged across the metadata-only delta. — completed.
10. Canonicalize and activate the missing deterministic NOTICE surface without expanding source authority. — completed through PRs #74 and #75.
11. Regenerate only deterministic root `NOTICE` and prove schema/provenance/characterization remained unchanged across that NOTICE-only delta. — completed at `b8f0e628ea367cb0c6e9fb30fc0f2b62c0e550a1`.
12. Reconcile this characterization with the now-qualified state, then rerun complete exact-head CI and obtain a fresh final substantive exact-head review against current canonical `main`. — current step.
13. Prove zero unresolved material review threads, merge only with exact `expected_head_sha`, and perform post-merge verification. — pending final qualification.
14. Reconcile the canonical task ledger and analyze the next dependency-ordered successor only after 002B is canonically closed. — pending post-merge closeout.

No new `S2-Txxx` identity is created by this intake. No 002C–002H or Specification 003 authority is created by this artifact.
