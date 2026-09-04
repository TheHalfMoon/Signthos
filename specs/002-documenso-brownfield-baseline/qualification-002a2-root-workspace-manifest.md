# Specification 002A2 — Root Workspace Manifest Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / STAGE_R_BLOCKED`
Issue: #5
Canonical predecessor: `c95bab85549ee61894436a7a800b3f62cd1ddfaf`
Canonical predecessor result: `002A2_ROOT_WORKSPACE_MANIFEST_QUALIFICATION`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Qualify the exact pinned root `package.json` as the next recursively refined 002A repository/workspace candidate without importing it, creating a source-import record, installing dependencies, or granting Stage R authority.

This unit answers four separate questions:

1. Is the exact candidate identity immutable and reproducible?
2. What is the most-specific public license/notice classification supported for this exact root path?
3. Is exact-copy admission sufficiently bounded for the 002A repository/workspace grain?
4. What dependency/provenance work remains before any separate Stage R authorization may be proposed?

This is engineering provenance classification, not legal advice.

## Canonical authority

PR #48 / merge `c95bab85549ee61894436a7a800b3f62cd1ddfaf` canonically established:

- `002A_COMPLETE_WITH_002A1 = NO`;
- `NEXT_PROPOSED_GRAIN = 002A2_ROOT_WORKSPACE_MANIFEST_QUALIFICATION`;
- `NEXT_CANDIDATE_PATH = package.json`;
- `SUCCESSOR_IMPORT_AUTHORITY = ABSENT`.

Therefore this unit is limited to Stage Q-style planning/evidence. It may record immutable upstream facts and independently authored analysis only. It may not commit any upstream-derived candidate bytes.

## Exact candidate identity

Upstream repository:

`documenso/documenso`

Exact snapshot:

`2cac63a000e22422bdea449f68b8025e709aa73a`

Exact snapshot tree:

`f97ae86f4c82501617aec8d0551f52e03c29feae`

Exact candidate path:

`package.json`

Exact upstream Git blob:

`5578501006ed3d09e9268165af9ffdeb8ae4051f`

Exact byte size:

`5916`

Exact SHA-256:

`5379d7cf9ee597673b1005d3243bf4cb4f9846959b65df9ba0193fac2e9b6285`

Candidate destination, if a later separate authorization ever admits it:

`package.json`

Candidate transformation under examination:

`COPY_EXACT`

The SHA-256 above was computed from the exact 5916-byte UTF-8 upstream blob and is bound to the Git blob identity above. This document does not contain or reconstruct those bytes.

## Manifest structure inventory

The exact pinned manifest is materially broader than 002A1.

Independently counted structural facts:

| Surface | Exact count / value |
| --- | --- |
| workspace globs | `2` (`apps/*`, `packages/*`) |
| scripts | `33` |
| direct `dependencies` declarations | `45` |
| direct `devDependencies` declarations | `40` |
| top-level `overrides` entries | `11` |
| package manager | `npm@11.19.1` |
| npm engine floor | `>=11.17.0` |
| Node engine floor | `>=24.0.0` |

The manifest has no top-level `license` field.

The exact workspace declaration is repository-wide rather than package-specific. Its `packages/*` glob would encompass community packages and the separately restricted `packages/ee` directory if such paths were later present. This observation does not import, permit, or classify any `packages/ee/**` byte.

## Dependency and execution boundary

The manifest is not an inert workspace-name list. Its declarations span later Specification 002 subsystem boundaries.

Observed dependency/script categories include:

- database/schema tooling and Prisma integration;
- job/background execution and cron-related tooling;
- mail delivery;
- AI/provider integration;
- telemetry/profiling;
- PDF/image/document processing;
- browser/end-to-end testing;
- React/UI packages;
- build, lint, formatting, commit-hook and monorepo tooling;
- environment-file loading;
- Docker development orchestration;
- migration/seed/studio operations;
- dependency installation and post-install patching.

Representative immutable package identifiers demonstrating the cross-grain surface include `@documenso/prisma`, `@prisma/client`, `prisma`, `inngest`, `nodemailer`, `@ai-sdk/google-vertex`, `posthog-node`, `@datadog/pprof`, `playwright`, `turbo`, `vite`, `react`, `react-dom`, `@libpdf/core`, `pdfjs-dist`, `sharp`, and `patch-package`.

This unit does not execute, install, resolve, fetch, inspect transitive packages, or characterize any declared dependency. Naming a declaration is not permission to acquire or use its package bytes.

## Why exact-copy admission is not yet sufficiently bounded

Canonical plan Section 8 requires each authorized grain to identify only dependencies needed by its bounded imported surface and to reject or separately authorize dependency/script behavior that crosses credentials, paid services, providers, or broader subsystem boundaries.

The root manifest fails that readiness test today for a simple reason: exact copying would place repository-wide declarations for multiple later grains into canonical Signthos before their true 002B–002G dependency requirements and provenance consequences are characterized.

In particular:

1. the `33` scripts include dependency-install, lifecycle, Docker, database, job and environment-loading behavior;
2. the `85` direct dependency/dev-dependency declarations materially exceed a minimal workspace-resolution seed;
3. several declarations name provider/telemetry/job/mail/database surfaces whose execution and credentials belong to later bounded grains;
4. `package-lock.json` remains excluded, so exact dependency closure is not yet admitted or provenance-qualified;
5. `turbo.json` remains excluded, so build-pipeline/environment behavior is not yet admitted or characterized;
6. workspace package paths remain excluded, so the manifest cannot yet support meaningful build characterization of its declared workspaces;
7. no current canonical evidence proves that admitting the entire manifest now is the minimum repository/workspace surface necessary for the next executable characterization step.

Therefore this qualification does **not** propose Stage R admission of exact root `package.json` yet.

`COPY_EXACT` remains the only candidate transformation being evaluated; this unit does not silently switch to selective copying, field extraction, rewriting, or a Signthos-authored substitute manifest.

## Rights and license evidence

### E1 — exact candidate path

At the pinned snapshot, root `package.json`:

- is located at repository root, outside `packages/ee/**`;
- has no top-level `license` field;
- has no file-local SPDX identifier or copyright notice;
- has no observed generated/vendor marker or embedded third-party notice.

The candidate bytes are not copied here.

### E2 — Documenso Community Edition policy

Pinned first-party policy path:

`apps/docs/content/docs/policies/community-edition.mdx`

Pinned Git blob:

`2cd1c06fd38adf17201acf31f38b017d7d14a1dc`

That policy identifies the Community Edition as AGPL version 3 and states that features under `packages/ee/` are outside the AGPL boundary and require Enterprise licensing.

The exact candidate is not under that separately restricted path.

### E3 — Documenso licenses policy

Pinned first-party policy path:

`apps/docs/content/docs/policies/licenses.mdx`

Pinned Git blob:

`a8fc5d78e373d552f6cc926221edd790d707512a`

That policy distinguishes the Community AGPL version-3 basis from the Enterprise commercial license. It does not grant a general commercial-license exception for repository-root files.

### E4 — root license text

Pinned path:

`LICENSE`

Pinned Git blob:

`0ad25db4bd1d86c452db3f9602ccdbe172438f52`

The repository root contains the standard GNU Affero General Public License version 3 text.

As established canonically during 002A1 L002, the generic instructions inside the standard license document do not themselves create a project-specific `or later` grant.

### E5 — canonical 002A1 L002 interpretation boundary

Canonical Signthos evidence in `qualification-002a1-l002.md` established that Documenso's pinned first-party Community policies consistently describe AGPL version 3 and do not state an `or later` option. That prior decision was intentionally path-specific and cannot itself classify root `package.json`; its interpretation methodology is reused here while this exact root path is independently evaluated.

## Path-level license synthesis candidate

For exact path:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:package.json`

current evidence supports this candidate classification:

`AGPL-3.0-only`

Reasoning:

1. the candidate is a repository-root file and not under the explicitly separate `packages/ee/**` commercial boundary;
2. no more-specific file-local license or third-party marker overrides the root/community evidence;
3. first-party policy identifies the Community license as GNU AGPL version 3;
4. no reviewed first-party evidence grants an `or later` option for this root path;
5. bare `AGPL-3.0` remains unsuitable as an unambiguous Signthos provenance expression.

This conclusion is a review candidate only until this exact qualification unit is independently reviewed and merged canonically.

No private/founder permission artifact is relied upon. Generic founder approval is not treated as rights evidence.

Copyright holder remains unstated at file level and must not be inferred from commit authorship.

`packages/ee/**` remains `RESTRICTED / NOT_IMPORT_AUTHORIZED`.

## Provenance consequence analysis

A future source-import record cannot be created merely because this path-level license candidate may become canonical.

Before root `package.json` can become Stage-R eligible, Signthos must separately resolve at least:

### D002A2-1 — minimum-surface necessity

Determine whether exact root `package.json`, with all repository-wide declarations intact, is genuinely the minimum executable workspace surface for the next characterized baseline step.

### D002A2-2 — direct declaration provenance and policy

Classify the policy consequences of all direct dependency/dev-dependency declarations that exact-copy admission would place into Signthos. Distinguish declaration provenance from package-byte acquisition; do not install packages as part of this evidence unit.

### D002A2-3 — lifecycle/script safety

Define fail-closed execution policy proving that import/qualification cannot accidentally trigger `postinstall`, `prepare`, install, Docker, database migration/seed/studio, job/provider, environment-file, or other side-effecting scripts.

### D002A2-4 — lock/build closure sequencing

Determine whether `package-lock.json`, `turbo.json`, or a smaller shared workspace configuration grain must be qualified before meaningful exact-head characterization can occur. None is admitted by this unit.

### D002A2-5 — later-grain boundary

Prove that admitting root declarations does not silently authorize or front-load 002B–002G implementation, provider credentials, runtime access, or EE paths.

Until these blockers are resolved canonically:

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`IMPORT_IMPLEMENTATION_AUTHORITY = ABSENT`

## Characterization plan before any source import

A later independently authored 002A2 characterization packet, if this candidate survives dependency refinement, must be able to run without acquiring package bytes and must at minimum verify:

1. exact candidate repository/path/blob/size/SHA-256 identity;
2. deterministic JSON syntax/structure inspection from pinned evidence;
3. exact workspace glob, package-manager and engine facts;
4. declaration-count invariants;
5. explicit detection of lifecycle/install/Docker/database/provider/job/environment-loading script categories;
6. absence of committed credential values in the exact candidate;
7. continued exclusion of lockfile, Turbo configuration, workspace package bytes and `packages/ee/**`;
8. zero package-network access, zero lifecycle execution, zero container/database/provider execution.

No upstream test source is proposed.

## Exact exclusions

This qualification does not authorize or import:

- root `package.json` bytes;
- `package-lock.json`;
- `turbo.json`;
- any `apps/**` path;
- any `packages/**` path;
- `packages/ee/**`;
- `patches/**`;
- `scripts/**`;
- deployment/environment configuration;
- any dependency package bytes;
- dependency installation or package-network access;
- lifecycle scripts;
- Docker/container/database/job/provider execution;
- credentials or paid services;
- source-import records;
- NOTICE regeneration;
- 002B–002H implementation;
- Specification 003 implementation;
- relicensing, rebranding or redesign.

## Exact-head qualification accounting

Before merge, the exact final head of this qualification PR must record and satisfy:

- complete changed surface limited to this Signthos-authored qualification document;
- upstream-derived bytes committed: `0`;
- source-import records created: `0`;
- GitHub Actions workflow accounting for the exact head, using `NO_APPLICABLE_RUN` if the canonical path filters remain unchanged;
- any neutral/billing-blocked/unavailable automated checks as non-PASS states;
- fresh independent substantive review of the exact final head;
- reconciliation of every material finding;
- zero unresolved material review threads;
- unchanged expected base/head immediately before guarded merge;
- guarded merge using exact `expected_head_sha`;
- post-merge verification before any dependency-resolution successor begins.

Current exact-head check state is intentionally not claimed in advance of PR creation and live query.

## Qualification result candidate

`002A2_PACKAGE_JSON_IDENTITY = QUALIFIED_CANDIDATE`

`002A2_PACKAGE_JSON_LICENSE = AGPL-3.0-only_CANDIDATE`

`002A2_COPY_EXACT_STAGE_R_READINESS = BLOCKED_OVERBROAD_DEPENDENCY_AND_SCRIPT_SURFACE`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SUCCESSOR_IMPORT_AUTHORITY = ABSENT`

If this qualification unit becomes canonical, the next dependency is a planning/evidence-only 002A2 dependency/provenance/overbreadth resolution addressing `D002A2-1` through `D002A2-5`. It is not a Stage R authorization and not a source-import branch.
