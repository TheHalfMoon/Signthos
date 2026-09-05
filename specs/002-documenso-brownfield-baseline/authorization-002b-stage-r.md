# Specification 002B — Stage R Import Authorization

Status: `STAGE_R_AUTHORIZATION_CANDIDATE / NOT_YET_EFFECTIVE`
Issue: #5
Canonical predecessor: `6c776f890593cdfd05232236ac9887f5a9b3722b`

## Purpose

Record the separate canonical Stage R implementation-authorization event for the exact qualified 002B Prisma schema grain.

This document is Signthos-authored governance only. It imports zero upstream-derived bytes, creates zero source-import records, executes no Prisma/database/runtime behavior, installs no dependency, and does not itself make implementation authority effective while it remains non-canonical.

## Canonical prerequisite evidence

The exact Prisma v2 pre-import qualification became canonical through PR #70:

- exact reviewed head: `8668e9cac3d59a4f403987fb5044792603ace643`;
- independent raw-byte digest evidence: `github:issue-comment:5552633677`;
- independent substantive final review: `github:issue-comment:5552647883 = NO_MATERIAL_FINDINGS`;
- guarded merge: `6c776f890593cdfd05232236ac9887f5a9b3722b` using exact `expected_head_sha = 8668e9cac3d59a4f403987fb5044792603ace643`;
- post-merge verification: `github:issue-comment:5552666697`.

That canonical qualification establishes exactly one Stage R candidate path and no broader upstream allowlist.

## Authorized grain candidate

Grain:

`002B — Prisma database/domain schema baseline`

Exact upstream repository:

`documenso/documenso`

Exact immutable upstream snapshot:

`2cac63a000e22422bdea449f68b8025e709aa73a`

A moving branch, newer upstream commit, cherry-pick, backport, forward-port, adjacent path, generated output, migration, or EE source is outside this authorization.

## Exact one-path byte allowlist

| Path | Git blob | Size | SHA-256 | Destination | Classification | Public license state | Rights basis | Transformation |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- |
| `packages/prisma/schema.prisma` | `13768e34f62331474fce63b1ca67f8d5ead44854` | `38099` | `0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931` | `packages/prisma/schema.prisma` | `separate_permission_required` | `unresolved_conflict` | `permission-artifact:documenso-signthos-private-v1` | `COPY_EXACT` |

Everything else in `documenso/documenso` is outside the 002B Stage R byte allowlist, including every other `packages/prisma/**` path, migrations, seed code, generated clients, root manifests, lockfiles, apps, packages, tests, docs, assets, scripts, deployment configuration, and all `packages/ee/**` paths.

## Rights and distribution basis

The exact current reuse action relies on the separately preserved private first-party permission artifact:

`permission-artifact:documenso-signthos-private-v1`

Canonical scope evidence covers the current exact-copy publication/distribution action. Canonical PR #69 qualifies the private-grant distribution obligations as:

`RESOLVED_NONE_ADDITIONAL`

Private-grant required public distribution artifacts are:

`EMPTY`

This does not erase independent Signthos provenance/NOTICE requirements.

The conflicting public AGPL/MIT metadata remains unresolved. This authorization does not select MIT, AGPL, `NONE`, `NOASSERTION`, or a `LicenseRef-*` as the exact public SPDX expression. Private permission is not treated as SPDX.

No relicense, sublicense, commercial-use, EE, or broader-repository right is inferred.

## Allowed Signthos implementation surface

Only after this authorization becomes canonical and a separate effectiveness proof makes it operational, the 002B implementation grain may create or modify exactly these bounded surfaces:

1. `packages/prisma/schema.prisma` — exact copied destination bytes from the one authorized upstream blob only;
2. `provenance/imports/U001-I0002.json` — the canonical v2 source-import record for this exact one-path import;
3. independently authored Signthos characterization/evidence files under `specs/002-documenso-brownfield-baseline/` only when necessary to prove 002B acceptance criteria;
4. `specs/002-documenso-brownfield-baseline/tasks.md` only for evidence-backed ledger reconciliation associated with this exact grain.

No other product/runtime/workspace path is authorized by this Stage R event.

## Exact-copy integrity rule

Authorized transformation:

`COPY_EXACT`

Provenance transformation vocabulary:

`copied`

The destination bytes must be byte-for-byte identical to the exact authorized upstream blob and must satisfy all three exact identities:

- Git blob: `13768e34f62331474fce63b1ca67f8d5ead44854`;
- byte size: `38099`;
- SHA-256: `0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931`.

Any normalization, line-ending conversion, formatting, comment insertion, schema edit, generated replacement, merge-conflict edit, or adaptation is outside this authorization.

## Future v2 provenance record contract

The initial real record `provenance/imports/U001-I0002.json` must begin with `review.status = pending` and preserve at minimum:

- `schema_version = 2`;
- `kind = source_import`;
- classification `separate_permission_required`;
- exact upstream repository, commit, path and SHA-256 above;
- explicit unknown/uninferred copyright-holder representation unless reliable evidence changes;
- public license classification `unresolved_conflict` with stable evidence preserving the AGPL/MIT conflict and no `spdx` field;
- permission artifact `permission-artifact:documenso-signthos-private-v1` and scopes sufficient for the current action;
- distribution state `resolved` with stable non-secret evidence;
- private-grant required distribution artifacts empty;
- distribution actions `redistribute` and `publish_source`;
- destination and destination SHA-256 equal to the authorized source SHA-256;
- transformation `copied`;
- exact review PR/evidence fields updated only through the later manifest authorization delta after independent review.

A structurally valid record does not itself grant import authority or replace independent review.

## Characterization acceptance criteria

The independently authored 002B characterization must prove at minimum:

- canonical destination is exactly `packages/prisma/schema.prisma`;
- no other upstream file entered the grain;
- destination Git blob, byte size, and SHA-256 exactly match the authorized source;
- the file is treated as a static declarative schema baseline only;
- no Prisma generator, migration, seed, studio, database connection, provider, credential, or lifecycle behavior is executed;
- no dependency is installed merely because generator/provider declarations appear in the schema;
- unresolved public license metadata remains unresolved in the v2 provenance record;
- the private permission artifact is not exposed or converted into a public SPDX assertion;
- destination bytes remain unchanged across the later provenance review-state authorization delta.

## Secret, network, dependency and runtime boundaries

This Stage R authorization does not authorize:

- `npm`, `pnpm`, `yarn`, or package installation;
- Prisma client generation;
- Prisma migration execution;
- Prisma seed execution;
- Prisma Studio;
- database connections;
- environment variables or credentials;
- provider/network access;
- deployment;
- generated files;
- imported migrations or seed code;
- any adjacent Documenso dependency.

If later characterization demonstrates a required executable dependency, it must be separately qualified and authorized before use.

## Required implementation/review sequence

After this authorization is canonical and a separate effectiveness proof establishes it on `main`, implementation must follow this exact order:

1. create an implementation branch from the exact then-current canonical `main`;
2. re-read canonical governance, this authorization, its effectiveness proof, and PR #70 qualification;
3. retrieve/copy only the exact authorized pinned source bytes;
4. verify source and destination Git blob, size, and SHA-256 before commit;
5. create `provenance/imports/U001-I0002.json` with `review.status = pending`;
6. create independently authored static characterization evidence;
7. run all applicable provenance validation, `verify-source`, deterministic NOTICE, format/lint/test/CI qualification on the exact candidate head;
8. obtain fresh independent substantive exact-head review of the copied bytes, v2 record, and characterization;
9. reconcile every material finding;
10. apply only the bounded provenance review-state/evidence authorization delta to move the real record to `qualified_exact_head` and bind immutable review evidence;
11. prove the copied schema bytes remain unchanged across that metadata-only authorization delta;
12. rerun exact-head qualification and prove zero unresolved material review threads;
13. merge only with exact `expected_head_sha` protection;
14. post-merge verify ancestry, exact tree/surface, byte identities, v2 provenance state/evidence, characterization, and applicable canonical-main CI.

## Non-grants

This authorization does not authorize:

- any upstream path other than exact `packages/prisma/schema.prisma` at the pinned commit;
- any `packages/ee/**` source;
- any other `packages/prisma/**` source;
- migrations, seeds, generated clients, scripts, configs, manifests, lockfiles, applications, tests, docs, or assets;
- any source transformation other than `COPY_EXACT`;
- any public SPDX resolution for the conflicting path;
- relicensing or sublicensing;
- dependency installation or runtime/provider activity;
- 002C–002H implementation;
- Specification 003 implementation.

## Canonicalization and effectiveness rule

While this document is non-canonical:

- `002B_STAGE_R_AUTHORIZATION = NOT_EFFECTIVE`;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- no upstream Prisma schema byte may enter Signthos.

If and only if this exact authorization receives independent substantive exact-head review, accurate check accounting, zero unresolved material review threads, guarded merge with its exact reviewed head, and post-merge verification, then the authorization exists canonically.

A separate Signthos-authored post-merge effectiveness proof must still become canonical before the implementation branch is created.

No new `S2-Txxx` identity is created by this authorization unit.