# Specification 002B — Exact Prisma v2 Pre-Import Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_EVIDENCE_ONLY / ZERO_UPSTREAM_BYTES / NO_IMPORT_AUTHORITY`
Issue: #5
Canonical base: `ffb546f40052457a0c26fa5586d0f10975695093`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Exact upstream path: `packages/prisma/schema.prisma`
Candidate destination: `packages/prisma/schema.prisma`
Candidate transformation: `COPY_EXACT`

## Purpose

Execute the planning/evidence-only successor made effective by canonical PR #69:

`PLANNING_ONLY_002B_EXACT_PRISMA_V2_PREIMPORT_QUALIFICATION`

This unit determines whether the exact pinned Prisma schema has a complete, truthful v2 pre-import evidence packet sufficient to support a separately reviewed Stage R authorization proposal. It does not import upstream bytes, create a real source-import record, execute Prisma, install dependencies, or grant Stage R.

## Canonical predecessor state

The following facts are canonical before this branch:

- private first-party permission artifact: `permission-artifact:documenso-signthos-private-v1`;
- exact permission applicability: pinned `packages/prisma/schema.prisma`, current `COPY_EXACT` action;
- preserved scopes: `copy`, `modify`, `create_derivative`, `redistribute`, `publish_source`;
- private grant distribution obligations: `RESOLVED_NONE_ADDITIONAL`;
- private-grant required public distribution artifacts: `EMPTY`;
- public license metadata: `CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`;
- public SPDX expression: `UNRESOLVED`;
- provenance v2 implementation: canonical;
- Stage R allowlist: empty;
- source-import authority: absent.

The unresolved public license state is intentionally preserved. Private permission is the separate rights basis and does not synthesize SPDX.

## Exact immutable source identity

Freshly reverified against the pinned upstream snapshot:

- repository: `documenso/documenso`;
- commit: `2cac63a000e22422bdea449f68b8025e709aa73a`;
- path: `packages/prisma/schema.prisma`;
- Git blob: `13768e34f62331474fce63b1ca67f8d5ead44854`;
- byte size: `38099`;
- candidate destination: `packages/prisma/schema.prisma`;
- transformation: `COPY_EXACT`.

The exact upstream file begins with Prisma generator/datasource declarations and has no file-local SPDX, copyright, or license notice at its beginning. The package manifest remains `@documenso/prisma` with package-level `"license": "MIT"`; broader Documenso Community policy remains AGPL-oriented. This qualification does not resolve that public conflict.

## Exact source SHA-256 evidence gate

A canonical v2 source-import record and Stage R byte allowlist require an exact SHA-256 digest of the pinned source bytes.

At branch creation, the available GitHub repository interfaces establish the immutable Git blob and size above but this Signthos-authored document does not invent a SHA-256 value.

Candidate state before independent exact-source derivation:

`002B_PRISMA_SCHEMA_SOURCE_SHA256 = PENDING_INDEPENDENT_EXACT_SOURCE_DERIVATION`

The independent reviewer for this PR is specifically asked to retrieve the exact pinned blob bytes directly from GitHub, compute SHA-256, report the digest together with the pinned commit/path/blob/size identity, and treat any mismatch as material. After a genuine digest is supplied, this branch may be amended to bind it and must then receive a fresh exact-head review.

## v2 rights model candidate

If the source digest is independently established, the exact future v2 record semantics are expected to be:

- `schema_version = 2`;
- `kind = source_import`;
- classification: `separate_permission_required`;
- upstream repository/commit/path: exact values above;
- upstream SHA-256: exact independently derived digest;
- copyright holder: explicit unknown/uninferred representation unless reliable evidence changes;
- public license classification: `unresolved_conflict`;
- public license evidence: stable references preserving the AGPL/MIT conflict;
- permission artifact: `permission-artifact:documenso-signthos-private-v1`;
- permission scopes: at least `copy`, `redistribute`, `publish_source` for current exact-copy distribution, with the broader already-preserved grant scopes remaining accurately recorded where the schema permits;
- distribution state: `resolved`;
- distribution evidence: `github:issue-comment:5552564774` plus canonical PR #69 qualification evidence;
- required distribution artifacts imposed by the private grant: empty;
- distribution actions: `redistribute`, `publish_source`;
- destination: `packages/prisma/schema.prisma`;
- transformation kind: `copied`;
- review status: pending until an actual implementation PR receives exact-head independent review.

No real record is created by this qualification.

## Restricted-path and EE boundary

The candidate is outside `packages/ee/**` and no current evidence classifies this exact path as an EE path.

The canonical restricted-path policy must still be evaluated on the eventual real v2 record. Any deny rule or additional required permission scope remains additive and fail-closed.

`packages/ee/**` remains excluded and unauthorized.

## Static dependency boundary

The schema is a declarative database/domain contract surface, but its package also declares Prisma generation, migration, seed, and studio scripts and generator dependencies.

This pre-import qualification authorizes none of those executable dependencies or commands.

The first import grain remains exact source-byte copying plus independently authored static characterization only. Any future attempt to run Prisma, generate clients, execute migrations, seed a database, install dependencies, access credentials, or use a provider requires separate dependency/toolchain/runtime qualification and authority.

## Proposed Stage R allowlist candidate

Only if this branch is amended with a genuine independently derived SHA-256 and then independently re-reviewed cleanly may a separate Stage R authorization proposal use exactly this one-path candidate:

| Upstream path | Git blob | Size | SHA-256 | Destination | Transformation | Rights basis |
| --- | --- | ---: | --- | --- | --- | --- |
| `packages/prisma/schema.prisma` | `13768e34f62331474fce63b1ca67f8d5ead44854` | `38099` | `PENDING_INDEPENDENT_EXACT_SOURCE_DERIVATION` | `packages/prisma/schema.prisma` | `COPY_EXACT` | `permission-artifact:documenso-signthos-private-v1` |

While the digest is pending:

- `002B_EXACT_V2_PREIMPORT_QUALIFICATION = INCOMPLETE_PENDING_SOURCE_SHA256`;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `002B_IMPLEMENTATION_AUTHORITY = ABSENT`.

## Acceptance criteria for this qualification

Before this qualification may become canonical as a positive Stage R precursor, independent review must verify:

1. exact pinned repository/commit/path/blob/size identity;
2. exact SHA-256 derived from the pinned bytes and bound to the same identity;
3. the candidate destination and `COPY_EXACT` transformation are exact and bounded;
4. the private permission artifact/scopes apply to this exact path/action;
5. private distribution obligations are canonically `RESOLVED_NONE_ADDITIONAL` without exposing confidential text;
6. unresolved public AGPL/MIT evidence remains unresolved and does not become SPDX;
7. v2 semantics can represent the rights basis and distribution state without weakening v1;
8. restricted-path policy remains additive;
9. no executable Prisma/dependency/runtime authority is inferred;
10. no upstream-derived byte or real source-import record is committed in this planning unit;
11. no EE, downstream 002C–002H, or Specification 003 authority is introduced.

## Successor boundary candidate

If the exact source SHA-256 is supplied, bound on this branch, and the final exact head receives `NO_MATERIAL_FINDINGS`, then this qualification may conclude:

`002B_EXACT_V2_PREIMPORT_QUALIFICATION = PASS`

and may nominate only a separate governance unit:

`NEXT_AUTHORIZED_UNIT = GOVERNANCE_ONLY_002B_STAGE_R_AUTHORIZATION`

That later Stage R authorization must independently name the exact one-path byte allowlist and implementation surface and must itself pass exact-head review, guarded merge, post-merge verification, and a separate effectiveness proof before any upstream byte enters Signthos.

Until the digest gate is closed and this exact candidate is canonical, Stage R remains unauthorized.

No new `S2-Txxx` identity is created by this planning unit.