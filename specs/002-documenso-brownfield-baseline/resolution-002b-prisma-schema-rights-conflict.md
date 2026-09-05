# Specification 002B — Prisma Schema Rights-Conflict Resolution

Status: `RESOLUTION_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / RIGHTS_UNRESOLVED / STAGE_R_BLOCKED`
Issue: #5
Canonical base: `a49fc659e59e9bc42313aeaad7d61091af48386c`
Canonical predecessor result: `002B_PRISMA_SCHEMA_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Pinned upstream tree: `f97ae86f4c82501617aec8d0551f52e03c29feae`

## Purpose

Perform the one planning/evidence-only rights-conflict resolution unit authorized by canonical PR #57 for exact `packages/prisma/schema.prisma`.

This unit asks whether additional immutable public first-party evidence is sufficiently specific to resolve the package-level `MIT` declaration relative to Documenso's Community `AGPL-3.0` licensing signals for the exact pinned schema path.

This unit imports no upstream-derived bytes, creates no source-import record, executes no Prisma/database/runtime behavior, and grants no Stage R or 002B implementation authority.

This is engineering provenance classification and repository governance, not legal advice.

## Canonical authority and scope

Canonical PR #56 qualified exact upstream path:

`packages/prisma/schema.prisma`

with exact blob:

`13768e34f62331474fce63b1ca67f8d5ead44854`

and exact size:

`38099`

Canonical PR #57 then established exactly one successor boundary:

**perform one planning/evidence-only rights-conflict resolution unit for exact `packages/prisma/schema.prisma`, seeking sufficiently specific first-party evidence that resolves the package-level MIT declaration relative to the Community AGPL policy.**

No new `S2-Txxx` identity is authorized by that boundary.

The starting non-grants are:

- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `002B_IMPLEMENTATION_AUTHORITY = ABSENT`;
- `packages/ee/** = RESTRICTED / NOT_IMPORT_AUTHORIZED`;
- Specification 003 implementation remains unauthorized.

## Evidence reconfirmation at the pinned snapshot

### E1 — exact package manifest

Pinned `packages/prisma/package.json`:

- blob: `44992d6e4f89d73e02b5d02a36ee3668e446394c`;
- package: `@documenso/prisma`;
- package metadata declares `"license": "MIT"`.

This remains the most specific positive MIT signal currently available for the package. The manifest does not state whether its license field covers every tracked file under `packages/prisma/`, a publishable package subset, or another distribution surface.

### E2 — exact package directory has no package-local license artifact

The pinned `packages/prisma/` directory contains `package.json`, `schema.prisma`, TypeScript source, migrations, seed material, and configuration, but no `LICENSE` file.

A direct lookup of `packages/prisma/LICENSE` at pinned commit `2cac63a000e22422bdea449f68b8025e709aa73a` returns no file.

Therefore there is no package-local license text or package-local scope statement that independently binds MIT terms to `schema.prisma`.

### E3 — root AGPL artifact

Pinned root `LICENSE`:

- blob: `0ad25db4bd1d86c452db3f9602ccdbe172438f52`;
- text: GNU Affero General Public License version 3.

This is a repository-level license artifact. By itself it does not identify the exact copyright holder for `schema.prisma` and does not explain the package-level MIT metadata.

### E4 — pinned Community and license policies

Pinned first-party Community policy:

- path: `apps/docs/content/docs/policies/community-edition.mdx`;
- blob: `2cd1c06fd38adf17201acf31f38b017d7d14a1dc`.

Pinned first-party licenses policy:

- path: `apps/docs/content/docs/policies/licenses.mdx`;
- blob: `a8fc5d78e373d552f6cc926221edd790d707512a`.

These policies describe Community Edition under AGPL-3.0 and distinguish the explicit `packages/ee/**` Enterprise/commercial boundary. Neither policy names `packages/prisma/schema.prisma` or explains the intended file-level scope of `@documenso/prisma`'s MIT package metadata.

### E5 — Enterprise license demonstrates multi-layer licensing but does not classify Prisma

Pinned `packages/ee/LICENSE`:

- blob: `cc97e3a107557f10878ee212ab2cc23dd8378b24`;
- identifies a commercial boundary for Enterprise material;
- expressly recognizes that parts of the Documenso software may be distributed under AGPLv3 or MIT.

This is strong evidence that Documenso's repository can contain differently licensed components. It does not identify `packages/prisma/schema.prisma` as one of the MIT-distributed parts and therefore does not resolve this exact path.

## Historical evidence

### H1 — Prisma package metadata originally had no license field

At historical parent commit:

`76b2fb5eddd6a54ccf9b872d4b1c885f4b2786d4`

`packages/prisma/package.json` was blob:

`fceb9a046a3c19e5379d0827760fcc3ba0e93ab3`

and contained no package `license` field.

This proves only that the current MIT metadata was introduced later. It does not determine its intended scope.

### H2 — MIT package metadata and AGPL repository messaging coexisted at the same revision

At historical commit:

`159bcade7b3b11b0b0871b2ea4eb6a57da4dc841`

`packages/prisma/package.json` was blob:

`d9788f96464da5c8d6c113d0444f6e412812c6e3`

and declared `"license": "MIT"`.

At that exact same commit, repository `README.md` was blob:

`bfcd6aabfb602a1986521b949f09340ecdf859cf`

and displayed the repository license as AGPLv3 with a link to the root `LICENSE`.

Therefore the AGPL repository signal and MIT package-manifest signal were contemporaneous. The conflict cannot be resolved merely by treating one signal as a later replacement for the other.

### H3 — MIT metadata appeared across internal workspace package manifests

At the same historical refactor lineage, `packages/ui/package.json` carried MIT package metadata, and `packages/tsconfig/package.json` was blob:

`881ec485c1861cfbac067e551e7f80d440a4307f`

with both:

- `"license": "MIT"`;
- `"private": true`.

At the pinned snapshot, Documenso's pnpm migration plan is blob:

`7052cb7baecd7d82136dc1dfd6eba8576f7bbfe5`

and describes `@documenso/*` references as internal workspace packages to be represented with `workspace:*`.

These facts weaken any assumption that `@documenso/prisma`'s MIT field can be interpreted solely as a public-package publication license. They still do not prove that the field does or does not license every source file in the package.

## Copyright-holder evidence

Pinned `CLA.md`:

- blob: `9bdc1bd2b3090b8a437093574e800d730241cb81`;
- grants Documenso broad rights from contributors while stating that contributors retain rights in their Contributions.

The CLA helps explain why a named sole file-level copyright holder must not be invented. It is not a downstream license grant from all relevant rightsholders to Signthos and does not resolve the exact schema license expression.

Accordingly:

`002B_PRISMA_SCHEMA_COPYRIGHT_HOLDER = UNKNOWN_UNINFERRED`

remains unchanged.

## Resolution analysis

### Why this unit cannot select MIT

The package manifest's MIT field is specific to `@documenso/prisma`, but the available first-party artifacts do not define the field's exact source-file scope. There is no package-local MIT license text, no file-local SPDX/license notice on the schema, and no pinned first-party statement explicitly saying that `packages/prisma/schema.prisma` may be copied and redistributed under MIT.

Selecting MIT would therefore require Signthos to infer a rights scope that canonical PR #56 expressly required this successor to prove rather than assume.

### Why this unit cannot select AGPL-3.0

Root/community AGPL signals are broad and first-party, and the schema is outside the explicit Enterprise directory. However, the more-specific Prisma package manifest declares MIT, MIT and AGPL signals historically coexisted, and Documenso's Enterprise license itself recognizes that some material can be MIT-distributed.

Selecting AGPL-3.0 for the exact schema would therefore require Signthos to disregard a material package-level licensing signal without a first-party explanation of its scope.

### Why this unit cannot select a dual/alternative expression

No reviewed first-party artifact currently states that `schema.prisma` is deliberately dual-licensed, alternatively licensed, or selectable between MIT and AGPL-3.0.

Constructing a dual-license expression from the mere coexistence of two signals would itself be an unsupported rights inference.

## Public first-party evidence outcome

The bounded public evidence review found no sufficiently specific first-party artifact that answers all of the following for the exact pinned path:

1. whether `packages/prisma/package.json`'s MIT declaration covers `packages/prisma/schema.prisma`;
2. whether Community AGPL-3.0 instead controls the exact schema file;
3. whether both licenses intentionally apply as alternatives or in another relationship;
4. what exact license expression and notice obligations Signthos must record for `COPY_EXACT` redistribution;
5. what non-invented copyright-holder value should accompany an eventual source-import record beyond the already valid fail-closed `unknown` treatment.

The absence of such evidence is not itself evidence for either license.

No upstream issue, message, or other third-party communication is created by this resolution. External clarification is recorded only as a future evidence dependency; it is not presumed authorized outreach.

## Rights-conflict resolution result candidate

`002B_PRISMA_SCHEMA_RIGHTS_CONFLICT_RESOLUTION = UNRESOLVED_REQUIRES_FIRST_PARTY_PATH_SCOPE_CLARIFICATION`

`002B_PRISMA_SCHEMA_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`

`002B_PRISMA_SCHEMA_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`

`002B_PRISMA_SCHEMA_COPYRIGHT_HOLDER = UNKNOWN_UNINFERRED`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002B_IMPLEMENTATION_AUTHORITY = ABSENT`

This result resolves the authorized evidence investigation, not the underlying license conflict.

## Exact sufficient future evidence

The rights blocker may be reopened only by evidence specific enough to remove the ambiguity without Signthos choosing a convenient interpretation. Potentially sufficient evidence includes one of the following, reviewed for applicability to the exact pinned snapshot and intended `COPY_EXACT` action:

1. a first-party package/path license artifact or notice whose stated scope clearly includes `packages/prisma/schema.prisma`;
2. an authoritative first-party Documenso statement explicitly mapping `@documenso/prisma`'s MIT declaration to `schema.prisma` and explaining its relationship to Community AGPL-3.0;
3. an immutable upstream correction or clarification that identifies the applicable license expression and required notices for the exact path, with historical applicability established rather than assumed.

Generic repository metadata, package manifests without clarified file scope, commit authorship, public-source availability, contributor activity, or founder/private approval do not satisfy this dependency.

## Exact exclusions and non-grants

This resolution does not authorize:

- copying, adapting, embedding, reconstructing, or generating from `packages/prisma/schema.prisma`;
- creating destination `packages/prisma/schema.prisma` bytes;
- any source-import record;
- Stage R authorization or proposal;
- 002B implementation authorization;
- importing `packages/prisma/package.json`, migrations, seeds, generated clients, TypeScript source, or any other Prisma package path;
- dependency installation, Prisma generation, migration, seed, database, network, provider, credential, or runtime execution;
- any `packages/ee/**` path;
- Specification 003 implementation;
- interpreting this unresolved result as a license selection, waiver, permission, or legal conclusion;
- creating an upstream clarification request under this PR's authority;
- inventing `S2-T042` or another task identity.

## Successor-governance boundary

If and only if this resolution becomes canonical after fresh independent substantive exact-head review, guarded expected-head merge, and post-merge verification, the rights investigation may be recorded as exhausted on currently available public first-party evidence.

This document does not decide whether Specification 002 may next select another bounded 002B candidate, must pause this grain pending external evidence, or requires ledger reconciliation first. That successor authority must be derived from newly canonical `main` and the canonical task ledger after this resolution is merged.

No downstream branch may treat this candidate document itself as Stage R or source-import authority.

## Exact-head qualification accounting

Before merge, this resolution PR must prove on its exact final head:

- the complete change surface is limited to this Signthos-authored resolution document;
- upstream-derived candidate bytes committed: `0`;
- source-import records created: `0`;
- exact-head GitHub Actions accounting, recording `NO_APPLICABLE_RUN` if no workflow applies;
- neutral, skipped, unavailable, billing-blocked, rate-limited, or summary-only automated checks are not PASS;
- fresh independent substantive review of the exact final head;
- reconciliation of every material finding;
- zero unresolved material review threads;
- unchanged base/head immediately before guarded merge;
- guarded merge with exact `expected_head_sha`;
- post-merge verification before any successor-authority decision.
