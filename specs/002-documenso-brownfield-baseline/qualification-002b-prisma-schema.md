# Specification 002B — Prisma Schema Path Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / RIGHTS_CONFLICT / STAGE_R_BLOCKED`
Issue: #5
Canonical predecessor: `5645987c8ff2835b5cc95e392274a3b312b4d427`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Pinned upstream tree: `f97ae86f4c82501617aec8d0551f52e03c29feae`

## Purpose

Qualify the exact `packages/prisma/schema.prisma` path selected by canonical `S2-T041 / 002A3` without importing it, adapting it, creating a source-import record, installing dependencies, running Prisma, starting a database, or granting Stage R or 002B implementation authority.

This unit answers five bounded questions:

1. Is the candidate identity immutable and reproducible?
2. What path/package/repository rights and notice evidence applies to the exact candidate?
3. Is generated, vendored, third-party, or restricted-EE treatment indicated by current evidence?
4. What exact destination/transformation and independently authored static characterization could be proposed if rights are later resolved and separate Stage R/B authorization is granted?
5. Is the path currently eligible for any import allowlist?

This is engineering provenance classification, not legal advice.

## Canonical authority

PR #53 and the post-merge ledger reconciliation in PR #55 canonically established only the following successor boundary:

**select and prepare one separately bounded 002B path-level qualification packet for `packages/prisma/schema.prisma`.**

The canonical predecessor also establishes:

- `002A3_STATIC_SCHEMA_WORKSPACE_PREREQUISITE = NONE_ESTABLISHED` for bounded static schema-contract inventory only;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `002B_IMPLEMENTATION_AUTHORITY = ABSENT`;
- no `S2-T042` identity was assigned.

Therefore this unit is Stage-Q-style planning/evidence only. It may commit Signthos-authored analysis and immutable upstream identifiers. It must not commit upstream-derived bytes or a source-import record.

## Exact candidate identity

Upstream repository:

`documenso/documenso`

Exact snapshot:

`2cac63a000e22422bdea449f68b8025e709aa73a`

Exact snapshot tree:

`f97ae86f4c82501617aec8d0551f52e03c29feae`

Exact candidate path:

`packages/prisma/schema.prisma`

Exact upstream Git blob:

`13768e34f62331474fce63b1ca67f8d5ead44854`

Exact byte size:

`38099`

Candidate destination, only if a later separate authorization ever admits it:

`packages/prisma/schema.prisma`

Candidate transformation under examination:

`COPY_EXACT`

This document does not contain or reconstruct the candidate bytes.

## Static role and dependency boundary

Canonical 002A3 evidence already established that the file is a bounded static Prisma database/domain contract inventory surface. Its declarative surface includes datasource/generator declarations plus model, enum, relation, key, uniqueness, default, optionality, index, and referential-action information.

For this qualification unit, the file is inspected only as immutable public evidence. The unit does not:

- run `prisma generate`;
- execute migrations or seed scripts;
- install or resolve npm packages;
- start PostgreSQL or any other database;
- read or create `.env` files;
- access credentials, providers, deployment services, or external runtime services;
- execute lifecycle scripts;
- characterize runtime behavior.

If a future bounded unit needs executable Prisma behavior, it must return to separately reviewed 002A dependency/toolchain qualification before execution or import.

## Rights and provenance evidence

### E1 — exact schema path

At the pinned snapshot, `packages/prisma/schema.prisma`:

- is outside the explicit `packages/ee/**` commercial directory;
- has no file-local SPDX identifier at its beginning;
- has no file-local copyright statement at its beginning;
- has no file-local license notice at its beginning;
- is represented by exact Git blob `13768e34f62331474fce63b1ca67f8d5ead44854`, size `38099` bytes.

No file-local evidence resolves the applicable license by itself.

### E2 — Documenso Community Edition policy

Pinned first-party policy path:

`apps/docs/content/docs/policies/community-edition.mdx`

Pinned Git blob:

`2cd1c06fd38adf17201acf31f38b017d7d14a1dc`

The policy describes the Community Edition as available under AGPL-3.0, requires preservation of copyright/license notices, and explicitly states that features under `packages/ee/` are outside the AGPL boundary and require Enterprise licensing.

The candidate path is not under `packages/ee/**`.

### E3 — Documenso licenses policy

Pinned first-party policy path:

`apps/docs/content/docs/policies/licenses.mdx`

Pinned Git blob:

`a8fc5d78e373d552f6cc926221edd790d707512a`

The policy describes a dual-licensing model in which Community Edition is AGPL-3.0 and Enterprise Edition is commercial. It does not specifically discuss `packages/prisma/schema.prisma` or explain whether package-level npm metadata may override or supplement the general Community classification.

### E4 — repository root AGPL license text

Pinned path:

`LICENSE`

Pinned Git blob:

`0ad25db4bd1d86c452db3f9602ccdbe172438f52`

The repository root contains the standard GNU Affero General Public License version 3 text.

The generic license text does not identify the copyright holder for this exact schema path and does not resolve any more-specific package-level licensing signal.

### E5 — package-level MIT metadata

Pinned path:

`packages/prisma/package.json`

Pinned Git blob:

`44992d6e4f89d73e02b5d02a36ee3668e446394c`

The exact package manifest identifies package `@documenso/prisma` and explicitly declares:

`"license": "MIT"`

This is a materially more-specific first-party package-level metadata signal than repository-wide licensing metadata. However, the manifest does not state whether that MIT declaration is intended to license every source/schema file in `packages/prisma`, only a published package artifact, or some other package surface.

The manifest also contains Prisma build/generate/migrate/seed/studio scripts. Those scripts are evidence about executable package behavior only; they are not executed or imported here.

### E6 — no package-local license artifact observed

The exact pinned `packages/prisma/` directory contains `package.json`, `schema.prisma`, TypeScript source, migrations, seeds, configuration, and related paths, but no package-local `LICENSE` file is present in the directory listing.

Therefore current public evidence does not include a package-local MIT license text or a package-local notice explicitly binding MIT terms to `schema.prisma`.

### E7 — historical package creation does not resolve the conflict

The historical commit `256c518cbce1663ac6bd308f3c3a66ba43b8708f` (`prisma package`) created an early `packages/prisma/package.json` and schema surface. The package manifest shown in that commit did not contain a `license` field.

This demonstrates only that the current package-level `MIT` declaration was introduced later. Commit history and commit authorship do not establish copyright ownership and do not, by themselves, establish the intended legal scope of the later MIT metadata.

## Generated/vendor/third-party classification

Current evidence does not establish that `packages/prisma/schema.prisma` is generated output, vendored source, or third-party material.

The package manifest's Prisma scripts treat schema tooling as an executable input surface, and the candidate is tracked directly in the first-party repository. That supports classifying it for this packet as:

`GENERATED_VENDOR_THIRD_PARTY_CLASSIFICATION = NO_CURRENT_MARKER_OBSERVED`

This value is an evidence result, not a rights grant. A later material third-party or generated marker would reopen qualification.

## Path-level license synthesis

Current first-party evidence contains two materially incompatible signals relevant to the exact candidate:

1. repository/community policy describes non-EE Community Edition source under AGPL-3.0; and
2. the more-specific `packages/prisma/package.json` declares package license `MIT`.

No file-local schema notice, package-local license artifact, or reviewed pinned first-party statement currently resolves whether the package-level MIT declaration applies to `schema.prisma`, whether AGPL-3.0 remains controlling for this file, or whether a dual/alternative treatment was intended.

The qualification must therefore fail closed rather than selecting whichever license is operationally more convenient.

Canonical candidate result for independent review:

`002B_PRISMA_SCHEMA_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`

`002B_PRISMA_SCHEMA_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`

`002B_PRISMA_SCHEMA_COPYRIGHT_HOLDER = UNKNOWN_UNINFERRED`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002B_IMPLEMENTATION_AUTHORITY = ABSENT`

No private/founder permission is used as a substitute for exact path-level evidence. Generic founder approval does not resolve this conflict.

`packages/ee/**` remains `RESTRICTED / NOT_IMPORT_AUTHORIZED` and is outside this packet.

## Rights-conflict resolution prerequisite

Before this exact candidate can be proposed for any Stage R or separate Stage B implementation authorization, a later independently reviewed evidence unit must resolve the AGPL/MIT conflict for the exact path.

Acceptable evidence must be specific enough to answer whether `packages/prisma/schema.prisma` at the pinned snapshot may be copied and redistributed under an exact license expression. Examples of potentially sufficient first-party evidence include:

- a package/path-specific license artifact whose scope clearly includes `schema.prisma`;
- an authoritative first-party statement explicitly explaining the scope of `@documenso/prisma`'s MIT declaration relative to the Community AGPL policy;
- an upstream correction or clarification pinned to an immutable revision and reviewed for applicability to this exact historical snapshot/action.

Repository metadata, commit authorship, package popularity, ordinary contributor activity, or the existence of public source code is not sufficient.

Until that conflict is resolved canonically, no source import and no Stage R proposal for this path is eligible.

## Proposed independently authored static characterization

If and only if rights are later resolved and a separate canonical authorization admits this exact path, the first 002B characterization should remain static and independently authored. It should verify observable schema contract facts without requiring Prisma generation or a database.

Proposed bounded assertions include:

1. exact repository/snapshot/path/blob/size identity;
2. deterministic inventory of datasource and generator declarations;
3. deterministic inventory of model and enum names/counts;
4. relation topology and referential actions;
5. primary keys, unique constraints, indexes, and compound constraints;
6. field scalar/container types and optionality;
7. defaults and update-time semantics represented in schema declarations;
8. database-specific annotations and index/operator declarations;
9. schema annotations that reference generated Zod/custom types, recorded as static dependency signals rather than executed imports;
10. zero dependency installation, zero Prisma generation, zero migration execution, zero database/runtime/network/provider/credential use.

Characterization output must be authored from observed contract facts and must not mechanically reproduce the upstream schema as a fixture, snapshot, or embedded source artifact unless such bytes are separately authorized.

## Candidate destination and transformation consequence

`COPY_EXACT` is the only source transformation evaluated by this packet because preserving inherited schema semantics is the baseline objective. This packet does not silently switch to selective copying, extraction, rewriting, schema translation, or a Signthos-authored replacement.

Because the rights basis is unresolved, the candidate destination is descriptive only. No destination file may be created from upstream bytes.

## Explicit exclusions and non-grants

This qualification does not authorize:

- copying, adapting, embedding, generating from, or reconstructing `packages/prisma/schema.prisma` in Signthos;
- any source-import record;
- Stage R authorization;
- separate Stage B implementation authorization;
- `packages/prisma/package.json` import;
- migrations, seeds, generated clients, TypeScript package source, package lockfiles, or any other `packages/prisma/**` path;
- root `package.json`, root lockfiles, `turbo.json`, or shared TypeScript configuration;
- dependency acquisition or installation;
- Prisma lifecycle commands;
- database or network access;
- credentials, providers, deployment, or runtime behavior;
- any `packages/ee/**` path;
- Specification 003 implementation.

## Acceptance criteria

This qualification candidate is complete only if independent substantive exact-head review verifies all of the following:

1. exact upstream repository/snapshot/tree/path/blob/size identities are accurate;
2. the Community AGPL evidence and package-level MIT evidence are represented faithfully;
3. absence of a package-local `LICENSE` artifact is accurately bounded to the pinned directory evidence;
4. no unsupported copyright holder is inferred;
5. the AGPL/MIT conflict is not silently resolved in either direction;
6. generated/vendor/third-party classification is appropriately fail-closed to current markers;
7. the static characterization proposal does not require executable Prisma/database/runtime behavior;
8. zero upstream-derived bytes and zero source-import records are committed;
9. `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST` remains empty;
10. no Stage R, Stage B implementation, or Specification 003 authority is inflated;
11. every material review finding is reconciled on the exact candidate head;
12. merge, if later qualified, uses expected-head protection and is post-merge verified before successor authority is considered.

## Successor boundary if canonical

If this exact qualification becomes canonical with the unresolved conflict intact, the next eligible work is **not import** and is **not Stage R**.

The next bounded dependency is a planning/evidence-only rights-conflict resolution unit for exact `packages/prisma/schema.prisma`, seeking sufficiently specific first-party evidence to resolve the package-level MIT versus Community AGPL signal.

No new `S2-Txxx` task identity is created by this document.
