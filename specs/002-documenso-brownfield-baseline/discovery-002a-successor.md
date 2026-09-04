# Specification 002A Successor Discovery — Repository/Workspace Frontier

Status: `DISCOVERY_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #5
Canonical predecessor: `002A1 = CLOSED_CANONICAL`
Canonical Signthos base: `5218e144ae800d8cd29fa52cbd0086157cb59e54`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Determine, from immutable upstream evidence, whether the broader `002A — repository/workspace baseline` is complete with 002A1 or whether another narrowly bounded repository/workspace grain is genuinely required.

This is discovery/planning evidence only. It imports zero upstream-derived bytes, creates zero source-import records, changes no dependency/runtime surface, and grants no successor implementation authority.

## Canonical predecessor

PR #47 closed only `002A1 — npm project-resolution policy seed`.

Canonical closeout facts:

- exact PR #47 head: `9b5f5db4f8bf7826dec1a8567cb6f7cfa58bd7a4`;
- guarded closeout merge: `5218e144ae800d8cd29fa52cbd0086157cb59e54`;
- merge tree: `55f8c2ed84c28cddc046f22e1206ff8346a37143`;
- `002A1 = CLOSED_CANONICAL`;
- successor source import authority: absent.

Canonical Signthos now contains the exact authorized `.npmrc` but no root `package.json`.

## Upstream snapshot reconfirmation

The selected upstream snapshot remains:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

Immutable snapshot facts used by this discovery:

- commit tree: `f97ae86f4c82501617aec8d0551f52e03c29feae`;
- root `.npmrc`: blob `cbc6b6537fba6c69756ad16e69a35cc056791d99`, 65 bytes;
- root `package.json`: blob `5578501006ed3d09e9268165af9ffdeb8ae4051f`, 5,916 bytes;
- root `package-lock.json`: blob `d7b6c7081a6682a679d5724e67bbb6824ac9e6fd`, 1,214,402 bytes;
- root `turbo.json`: blob `d0bd4d27476d8ebef04fb89b9474674dcc45e1a6`, 5,496 bytes.

No moving branch identity is used as import evidence.

## Why 002A is not complete with 002A1

The canonical 002A1 `.npmrc` establishes npm resolution policy only. It does not define an npm workspace, package-manager/runtime compatibility, workspace membership, workspace package resolution, root scripts, or the dependency graph.

At the pinned snapshot, the root `package.json` is the upstream workspace identity surface. It declares:

- workspace membership: `apps/*` and `packages/*`;
- package manager: `npm@11.19.1`;
- engine floors: npm `>=11.17.0` and Node `>=24.0.0`;
- a `postinstall` patching step;
- root build/dev/database/container/job/translation scripts;
- broad root dependencies, dev dependencies, and overrides.

The need for workspace/config resolution is concrete rather than hypothetical. For example, pinned `packages/prisma/tsconfig.json` extends `@documenso/tsconfig/react-library.json`, and that shared configuration package is itself under `packages/tsconfig`.

Therefore `.npmrc` alone is not a sufficient repository/workspace baseline for a later characterized 002B package. Closing broader 002A now would hide a real workspace-resolution dependency.

## Successor selection

Selected next proposed grain:

`002A2 — root workspace manifest qualification`

Candidate upstream path for the next planning/qualification packet:

| Upstream path | Blob | Size | Candidate destination | Candidate transformation | Current import status |
| --- | --- | ---: | --- | --- | --- |
| `package.json` | `5578501006ed3d09e9268165af9ffdeb8ae4051f` | 5,916 bytes | `package.json` | `COPY_EXACT` for qualification analysis only | `BLOCKED_PENDING_QUALIFICATION_AND_STAGE_R` |

This table is not an import allowlist and does not establish that exact-copy admission will ultimately be acceptable.

## Why only `package.json` is selected for the next packet

`package-lock.json` is intentionally not co-selected. It is a 1,214,402-byte whole-workspace dependency artifact whose complete dependency/license/provenance implications have not been classified.

`turbo.json` is intentionally not co-selected. It spans build/test/dev behavior and a broad environment-variable contract crossing later auth, database, signing, storage, mail, billing, telemetry, jobs, credentials, and test surfaces.

`packages/tsconfig/**` is also not co-selected. Although downstream packages rely on it, its exact necessity and file allowlist should be derived only after the root workspace identity boundary is qualified. Bundling it into this discovery would create a multi-purpose grain.

No `apps/**`, `packages/**`, `patches/**`, `scripts/**`, `.github/**`, deployment configuration, environment configuration, test source, or license copy is selected by this discovery.

## Rights and provenance state

The canonical 002A1 L002 result was path-specific to exact `.npmrc`. It does not classify root `package.json`.

Therefore the candidate remains:

`UNCLASSIFIED_PENDING_PATH_LEVEL_LICENSE_AND_NOTICE_EVIDENCE`

The root AGPL license and repository/community metadata are evidence inputs only; they do not by themselves create a machine-readable Signthos import authorization for this new path.

`packages/ee/**` remains `RESTRICTED / NOT_IMPORT_AUTHORIZED` and is unrelated to this candidate.

No private/founder permission artifact is relied upon.

## Dependency and security boundary for 002A2 qualification

The next qualification packet must treat the root manifest as inert evidence, not as permission to execute it.

Before any later Stage R decision it must, at minimum:

1. reverify exact blob identity and compute an exact SHA-256 digest;
2. establish path-level license/copyright/notice evidence and an unambiguous SPDX expression;
3. inventory the manifest's workspace declarations, lifecycle scripts, dependency/dev-dependency declarations, overrides, package-manager and engine constraints;
4. determine the provenance/component consequences of admitting those declarations to Signthos;
5. determine whether `COPY_EXACT` remains sufficiently bounded or must fail closed;
6. define independently authored characterization that does not install dependencies, run lifecycle scripts, access package networks, start containers, use credentials, or invoke providers;
7. keep `package-lock.json`, `turbo.json`, all workspace packages and all source-import records excluded unless separately selected later;
8. obtain independent substantive review before any canonical Stage R authorization is proposed.

A qualification result may legitimately conclude that exact-copy admission is too broad. Such a result must block/refine 002A2 rather than silently adapt the upstream manifest or weaken provenance requirements.

## Exact-head workflow and review accounting

This discovery PR changes only `specs/002-documenso-brownfield-baseline/discovery-002a-successor.md`.

For an exact head with only this Spec 002 documentation surface:

- GitHub Actions workflow runs are `NO_APPLICABLE_RUN` because the canonical `.github/workflows/provenance.yml` pull-request path filters do not include `specs/002-documenso-brownfield-baseline/**`;
- `NO_APPLICABLE_RUN` is an absence-of-applicable-workflow state, not PASS;
- the Cubic check is `NEUTRAL / PLAN_LIMIT_REACHED` and does not satisfy an independent-review or qualification gate;
- Qodo is billing-blocked and does not satisfy an independent-review or qualification gate;
- a successful status/check without substantive review content must not be substituted for the required independent substantive review;
- after any amendment, the amended exact head must receive fresh independent substantive re-review before guarded merge.

The initial independent review of this discovery candidate identified the missing exact-head workflow accounting as a material finding and found no other material issue in the reviewed scope. This amendment addresses only that finding; it does not claim that the amended head is reviewed or qualified. Qualification remains pending fresh independent re-review of the amended exact head.

## Current authority and non-grants

Current authority after this discovery candidate remains planning-only.

This discovery does not authorize:

- copying or adapting `package.json`;
- importing any upstream-derived byte;
- creating a source-import record;
- importing `package-lock.json` or `turbo.json`;
- importing any `apps/**` or `packages/**` path;
- installing dependencies or running lifecycle scripts;
- package-network access;
- Docker/container/database/job execution;
- credentials, providers, paid services or deployment;
- `packages/ee/**`;
- relicensing, rebranding or redesign;
- 002B implementation;
- Specification 003 implementation.

Generic founder approval does not replace the separate qualification, rights/provenance, review and Stage R gates.

## Discovery result

`002A_COMPLETE_WITH_002A1 = NO`

`NEXT_PROPOSED_GRAIN = 002A2_ROOT_WORKSPACE_MANIFEST_QUALIFICATION`

`NEXT_CANDIDATE_PATH = package.json`

`SUCCESSOR_IMPORT_AUTHORITY = ABSENT`

If and only if this discovery unit becomes canonical after fresh independent substantive review, guarded expected-head merge and post-merge verification, the next permitted unit is a planning/evidence-only 002A2 qualification packet for exact root `package.json`.
