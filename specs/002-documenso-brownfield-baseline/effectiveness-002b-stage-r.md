# Specification 002B — Stage R Effectiveness Proof

Status: `002B_STAGE_R_EFFECTIVENESS_CANDIDATE / NOT_YET_CANONICAL`
Issue: #5
Canonical predecessor: `5388c51ac1c417c7bb8fbe70372e9d89e0bef9fd`

## Purpose

Perform the fresh canonical-governance reread required by the canonical 002B Stage R authorization and prove, without importing any upstream implementation byte, whether the exact one-path Prisma authorization is complete and bounded enough to become operational on `main`.

This proof is Signthos-authored governance only. While it is non-canonical it does not authorize an implementation branch, copy `packages/prisma/schema.prisma`, create `U001-I0002.json`, execute Prisma, install dependencies, access a database/network/provider/credential, modify the public-license conclusion, or start any downstream grain.

## Canonical truth reread

The following live canonical surfaces were reread from predecessor `5388c51ac1c417c7bb8fbe70372e9d89e0bef9fd`:

- `.specify/memory/constitution.md` — `CANONICAL`; provenance before import, exact-head evidence, independent substantive review, expected-head merge protection, post-merge verification, and no authority inflation remain controlling;
- `AGENTS.md` — exact repository/commit/path, path-level rights evidence, canonical authorization, provenance, exact-head qualification, and fail-closed ambiguity remain mandatory;
- `specs/002-documenso-brownfield-baseline/plan.md` — Stage R precedes Stage B implementation, every import grain must use the pending-review-to-qualified provenance flow, and imported-byte characterization must precede transformation;
- `specs/002-documenso-brownfield-baseline/tasks.md` — remains a historical reconciliation of the pre-permission blocked frontier and has not yet been reconciled to the later canonical private-permission/v2/Stage-R chain; it cannot override newer exact canonical authorization artifacts, and it must be reconciled through evidence-backed later bookkeeping;
- `specs/002-documenso-brownfield-baseline/qualification-002b-prisma-v2-preimport.md` — canonical exact source identity/digest and one-path Stage R precursor;
- `specs/002-documenso-brownfield-baseline/authorization-002b-stage-r.md` — canonical PR #71 Stage R authorization and exact implementation/review sequence;
- `provenance/schema/v2/source-import.schema.json` and canonical provenance tooling — v2 is available for unresolved public-license conflicts plus separate permission/distribution evidence, while `review.status = pending` remains not import-ready;
- Issue #5 — latest canonical status evidence includes PR #71 post-merge verification `github:issue-comment:5552732328`.

No reread surface grants broader authority than the bounded result below.

## Canonical predecessor evidence

### PR #70 — exact Prisma v2 pre-import qualification

Canonical facts carried by PR #71 and Issue #5:

- exact reviewed head: `8668e9cac3d59a4f403987fb5044792603ace643`;
- immutable raw-byte digest evidence: `github:issue-comment:5552633677`;
- independent substantive final review: `github:issue-comment:5552647883 = NO_MATERIAL_FINDINGS`;
- guarded merge: `6c776f890593cdfd05232236ac9887f5a9b3722b` using exact `expected_head_sha = 8668e9cac3d59a4f403987fb5044792603ace643`;
- post-merge evidence: `github:issue-comment:5552666697`;
- exact qualified upstream source SHA-256: `0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931`.

### PR #71 — 002B Stage R authorization

Canonical facts:

- predecessor before PR #71: `6c776f890593cdfd05232236ac9887f5a9b3722b`;
- exact reviewed PR #71 head: `dc55e208bcb376c5e459a49b971b612d18c53b27`;
- independent substantive review: `github:issue-comment:5552685955 = NO_MATERIAL_FINDINGS`;
- reviewer independently confirmed `U001-I0002.json` is the safe next canonical import-record identity and the v2 contract is compatible with the canonical schema/validator;
- guarded merge request used exact `expected_head_sha = dc55e208bcb376c5e459a49b971b612d18c53b27`;
- guarded merge: `5388c51ac1c417c7bb8fbe70372e9d89e0bef9fd`;
- ordered parents: `6c776f890593cdfd05232236ac9887f5a9b3722b`, then `dc55e208bcb376c5e459a49b971b612d18c53b27`;
- reviewed-head tree = merge tree: `fe35e64d43f508637505f55e0d0cde682eca37e4`;
- merge signature: verified/valid;
- post-merge GitHub Actions: `NO_APPLICABLE_RUN`, not PASS;
- post-merge evidence: `github:issue-comment:5552732328`;
- upstream source bytes admitted by PR #71: `0`;
- source-import records added by PR #71: `0`.

PR #71 therefore establishes the authorization contract but deliberately requires this separate effectiveness proof before source-import authority becomes operational.

## Exact effective 002B authority candidate

If and only if this exact proof becomes canonical after independent substantive exact-head review, reconciliation of all material findings, zero unresolved material review threads, guarded expected-head merge, and post-merge verification, then the 002B Stage R authorization becomes operational with the following immutable bounds.

### Grain

`002B — Prisma database/domain schema baseline`

### Exact upstream source

Repository and snapshot:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

Complete upstream byte allowlist:

| Upstream path | Destination | Git blob | Size | SHA-256 | Classification | Public license state | Rights basis | Transformation |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| `packages/prisma/schema.prisma` | `packages/prisma/schema.prisma` | `13768e34f62331474fce63b1ca67f8d5ead44854` | `38099` | `0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931` | `separate_permission_required` | `unresolved_conflict` | `permission-artifact:documenso-signthos-private-v1` | `COPY_EXACT` / `copied` |

No other Documenso path or revision is authorized.

### Rights and distribution state

Canonical private-permission facts are limited to the exact qualified path/action:

- permission artifact: `permission-artifact:documenso-signthos-private-v1`;
- relied-on scopes include `copy`, `modify`, `create_derivative`, `redistribute`, and `publish_source` as already preserved canonically;
- current implementation transformation: `COPY_EXACT` only;
- private-grant distribution obligations: `RESOLVED_NONE_ADDITIONAL`;
- private-grant required public distribution artifacts: `EMPTY`;
- public license metadata: `CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`;
- public SPDX expression: unresolved; no `spdx` value may be synthesized from the private grant.

No relicense, sublicense, commercial-use, EE, or broader-repository right is inferred by this proof.

## Complete allowed Signthos implementation surface

After this proof is canonical and post-merge verified, the complete 002B implementation surface is exactly:

1. `packages/prisma/schema.prisma` — exact authorized upstream bytes only;
2. `provenance/imports/U001-I0002.json` — one canonical v2 source-import record for that exact path only;
3. necessary independently authored 002B characterization/evidence under `specs/002-documenso-brownfield-baseline/`;
4. evidence-backed `specs/002-documenso-brownfield-baseline/tasks.md` reconciliation associated with the exact 002B grain.

No other repository path is authorized by this proof.

## Exact-copy integrity

The destination must remain byte-for-byte identical to the authorized upstream blob.

Before commit and again before merge, implementation must prove all of:

- Git blob: `13768e34f62331474fce63b1ca67f8d5ead44854`;
- byte size: `38099`;
- SHA-256: `0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931`.

Any line-ending normalization, formatting, inserted comment, schema edit, migration, generated replacement, conflict edit, adaptation, or other source-byte mutation falls outside effective authority.

## Required initial v2 provenance state

The real implementation record must be `provenance/imports/U001-I0002.json` and must initially use `review.status = pending`.

The initial record must preserve:

- `schema_version = 2`;
- `kind = source_import`;
- `id = U001-I0002`;
- classification `separate_permission_required`;
- exact repository/commit/path/source SHA-256;
- explicit unknown/uninferred copyright-holder text unless reliable new evidence establishes a holder;
- public-license classification `unresolved_conflict` with at least two stable evidence references and no `spdx` field;
- permission artifact `permission-artifact:documenso-signthos-private-v1` with scopes sufficient for the current exact action;
- distribution `state = resolved` with stable non-secret evidence;
- private-grant `required_artifacts = []`;
- distribution actions including `redistribute` and `publish_source`;
- destination `packages/prisma/schema.prisma` and destination SHA-256 equal to the source SHA-256;
- transformation `kind = copied`;
- a positive implementation PR number and at least one immutable GitHub evidence reference even while status is `pending`, as required by the canonical v2 schema;
- later movement to `qualified_exact_head` only through a bounded metadata authorization delta after independent imported-byte review.

A structurally valid pending record is not import-ready by itself.

## Required implementation sequence after effectiveness

Once this proof is canonical and post-merge verified, the next bounded unit is the exact 002B implementation grain.

It must:

1. create the implementation branch from the exact then-current canonical `main`;
2. reread Constitution, `AGENTS.md`, Specification 002 plan, PR #70 qualification, PR #71 authorization, this effectiveness proof, v2 schema/tooling, and live Issue #5 state;
3. retrieve only exact pinned `packages/prisma/schema.prisma` bytes;
4. verify upstream Git blob, size, and SHA-256 before committing;
5. copy those bytes exactly to `packages/prisma/schema.prisma` with no normalization or edit;
6. verify destination Git blob, size, and SHA-256;
7. create `provenance/imports/U001-I0002.json` with `review.status = pending` and the exact v2 rights/distribution state above;
8. create independently authored static characterization/evidence only;
9. run all applicable provenance validation, source verification, NOTICE determinism, format/lint/test/CI qualification available for the exact candidate head without executing Prisma or installing newly inferred dependencies;
10. obtain fresh independent substantive exact-head review of the copied source bytes, v2 record, characterization, and bounded task reconciliation;
11. reconcile every material finding;
12. apply only the bounded provenance review-status/evidence delta required to move `U001-I0002.json` to `qualified_exact_head` and bind immutable review evidence;
13. prove `packages/prisma/schema.prisma` bytes are unchanged across that metadata-only authorization delta;
14. rerun all applicable exact-head qualification and prove zero unresolved material review threads;
15. merge only using exact `expected_head_sha` protection;
16. post-merge verify ancestry, exact tree/surface, source/destination byte identities, final v2 provenance state, characterization, task-ledger reconciliation, and applicable canonical-main CI.

## Static characterization boundary

The imported file is treated only as a static declarative database/domain baseline.

Characterization may inspect and document model/enum/relation/schema declarations without running Prisma.

This effectiveness proof does not authorize:

- Prisma client generation;
- Prisma migrations;
- Prisma seed execution;
- Prisma Studio;
- dependency installation;
- database connections;
- environment credentials;
- provider/network activity;
- generated files;
- imported migrations or seed code;
- adjacent Prisma source.

If executable characterization is later proven necessary, it requires a separately qualified dependency/runtime authorization before use.

## Explicit non-grants

Even after this proof becomes canonical, it does not authorize:

- any Documenso path except exact pinned `packages/prisma/schema.prisma`;
- any other `packages/prisma/**` file;
- any `packages/ee/**` path;
- migrations, seeds, generated clients, scripts, configs, manifests, lockfiles, apps, tests, docs, assets, or deployment material;
- any source transformation other than exact copy;
- resolution of the public AGPL/MIT conflict;
- an SPDX value for the exact Prisma path;
- relicensing, sublicensing, or commercial-use rights;
- Prisma/dependency/runtime/database/network/provider/credential execution;
- 002C–002H implementation;
- Specification 003 implementation.

## Canonicalization rule

While this file exists only on a branch or open pull request:

- `002B_STAGE_R_EFFECTIVENESS = NOT_CANONICAL`;
- `002B_STAGE_R_AUTHORIZATION = CANONICAL_NOT_YET_EFFECTIVE`;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- no 002B implementation branch may be created;
- `packages/prisma/schema.prisma` must remain absent from Signthos.

If and only if this exact proof:

1. receives independent substantive exact-head review;
2. reconciles every material finding;
3. has zero unresolved material review threads;
4. records exact check/workflow availability without treating unavailable/skipped states as PASS;
5. merges guarded with the reviewed exact head; and
6. passes post-merge verification against the same bounded authority,

then:

`002B_STAGE_R_EFFECTIVENESS = SATISFIED_CANONICAL`

`002B_STAGE_R_AUTHORIZATION = EFFECTIVE_FOR_EXACT_PRISMA_SCHEMA_COPY`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EXACT_ONE_PATH_PRISMA_SCHEMA`

`SOURCE_IMPORT_AUTHORITY = EFFECTIVE_FOR_002B_EXACT_PRISMA_SCHEMA_ONLY`

The next dependency then becomes the bounded 002B implementation branch described above.

No new `S2-Txxx` identity is created by this effectiveness unit.