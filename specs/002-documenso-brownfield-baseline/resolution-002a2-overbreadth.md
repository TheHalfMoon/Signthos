# Specification 002A2 — Root Manifest Overbreadth Resolution

Status: `RESOLUTION_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / STAGE_R_BLOCKED`
Issue: #5
Canonical base: `7c8fe436f6dcce7766ca8fffc4302646a87b7d60`
Canonical predecessor result: `002A2_COPY_EXACT_STAGE_R_READINESS = BLOCKED_OVERBROAD_DEPENDENCY_AND_SCRIPT_SURFACE`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Resolve the five canonical 002A2 blockers without importing any upstream-derived bytes, creating any source-import record, installing packages, executing lifecycle scripts, or granting Stage R authority.

This unit evaluates whether exact-copy admission of the pinned root `package.json` can become a minimum bounded repository/workspace grain. It also determines the next planning-only successor if exact-copy admission fails that test.

This is engineering provenance and architecture classification, not legal advice.

## Canonical inputs

PR #49 / merge `7c8fe436f6dcce7766ca8fffc4302646a87b7d60` canonically established:

- exact root candidate path: `package.json`;
- upstream blob: `5578501006ed3d09e9268165af9ffdeb8ae4051f`;
- exact size: `5916` bytes;
- exact SHA-256: `5379d7cf9ee597673b1005d3243bf4cb4f9846959b65df9ba0193fac2e9b6285`;
- path-level license: `AGPL-3.0-only`;
- transformation under examination: `COPY_EXACT`;
- exact-copy Stage R readiness: blocked;
- Stage-R eligible import allowlist: empty;
- successor import authority: absent.

The five unresolved blockers are `D002A2-1` through `D002A2-5`.

## Evidence reconfirmation

### Root manifest

The pinned root manifest is repository-wide rather than a narrow workspace seed. It contains:

- `private: true`;
- product-root identity and version fields;
- workspace globs `apps/*` and `packages/*`;
- `33` scripts;
- package manager `npm@11.19.1`;
- npm engine floor `>=11.17.0`;
- Node engine floor `>=24.0.0`;
- `45` direct dependencies;
- `40` direct devDependencies;
- `11` top-level overrides.

Its script surface includes `postinstall`, `prepare`, install/clean/reset flows, Docker development orchestration, Prisma generate/migrate/seed/studio operations, environment-file loading, jobs, translation, build, lint and e2e execution.

### Workspace membership wildcard hazard

The pinned upstream `packages/*` workspace glob is not itself a safe minimum-membership value for Signthos. At the same snapshot, `packages/ee/**` is a separately restricted commercial boundary. If that directory were present in a future Signthos tree, `packages/*` would match it by directory pattern even though no EE import authority exists.

Likewise, upstream `apps/*` denotes every direct child under the upstream applications directory rather than only an individually authorized application path.

Therefore the future M1 question is not “copy the upstream workspace globs but drop scripts and dependencies.” It must independently derive the least-authority workspace membership set from paths that are already separately authorized or canonical at that time. No wildcard or explicit membership entry may match `packages/ee/**`, another restricted path, or an otherwise unauthorized workspace path.

The upstream glob values are evidence about upstream repository structure only. They are not approved Signthos destination values.

### Root lockfile

Pinned `package-lock.json`:

- blob: `d7b6c7081a6682a679d5724e67bbb6824ac9e6fd`;
- size: `1,214,402` bytes;
- lockfile version: `3`;
- root package identity: `@documenso/root` version `2.17.0`;
- root entry reports `hasInstallScript: true`;
- root workspaces are `apps/*` and `packages/*`;
- root direct dependency/devDependency declarations mirror the broad root-manifest surface.

The available evidence does not establish an exhaustive dependency/license classification of every transitive lockfile entry. No such exhaustive classification is claimed here.

### Turbo configuration

Pinned `turbo.json`:

- blob: `d0bd4d27476d8ebef04fb89b9474674dcc45e1a6`;
- size: `5496` bytes;
- defines build/prebuild/lint/clean/dev/start/e2e tasks;
- declares `.env.*local` as a global dependency;
- declares a broad global environment contract spanning authentication, signing/HSM/CSC, storage credentials, mail, billing, browserless, jobs, Redis, Inngest, telemetry, Google Vertex, database, e2e authentication and anti-abuse controls.

It is therefore not a narrow repository/workspace seed.

### Shared TypeScript configuration

Pinned `packages/tsconfig/package.json`:

- blob: `b22d7d2ed75db7249c7269b9f0130e096da1c621`;
- size: `231` bytes;
- package name: `@documenso/tsconfig`;
- package-level license declaration: `MIT`;
- private package;
- only package script: `clean`;
- package `files` declaration names `base.json`, `nextjs.json`, and `react-library.json`.

Pinned `packages/prisma/tsconfig.json` depends on `@documenso/tsconfig/react-library.json`. This proves a real later shared-config dependency, but does not grant import authority for that package or any adjacent file.

## D002A2-1 — minimum-surface necessity

### Question

Is exact root `package.json`, with every field intact, the minimum repository/workspace surface necessary before later 002B characterization?

### Resolution

`NO`.

The facts needed to establish an npm workspace baseline are materially narrower than the entire pinned root manifest. The exact file couples workspace identity to product identity/version, 33 scripts, 85 direct dependency declarations and 11 overrides spanning later subsystem grains. Its exact workspace glob values are themselves broader than a least-authority future membership set because they are directory-wide patterns rather than individually authorized workspace paths.

Canonical Specification 002 requires dependency-minimal bounded grains and rejects front-loading broader subsystem behavior merely because it exists upstream. Exact-copying the whole root manifest would violate that posture before 002B–002G package requirements are characterized.

Therefore:

`D002A2-1 = RESOLVED_COPY_EXACT_NOT_MINIMUM`

## D002A2-2 — direct declaration provenance and policy

### Question

Must Signthos classify all 85 root direct declarations now in order to make exact-copy admission valid?

### Resolution

Doing so would solve the wrong boundary problem.

The declarations are immutable upstream facts and may be cited as evidence, but committing them into canonical Signthos would place dependency intent for database, jobs, mail, AI/provider, telemetry, document processing, UI and broad tooling into 002A before those subsystem grains establish necessity.

Dependency declaration provenance is distinct from acquiring the dependency package bytes, but declaration-only admission still changes the canonical dependency contract and therefore remains subject to bounded-grain governance.

Because exact-copy is not the minimum surface, Signthos does not need to front-load exhaustive direct/transitive package qualification merely to preserve an overbroad candidate.

Any dependency later selected by 002B or a subsequent grain must be qualified from that grain's actual necessity and exact lock/component evidence.

Therefore:

`D002A2-2 = RESOLVED_DEFER_TO_GRAIN_SPECIFIC_DEPENDENCY_QUALIFICATION`

No dependency package is authorized or acquired by this result.

## D002A2-3 — lifecycle and script safety

### Question

Can the exact root manifest be treated as inert enough for Stage R despite its script surface?

### Resolution

`NO` for current 002A exact-copy admission.

The pinned manifest contains `postinstall`, `prepare`, install/reset, Docker, database, environment-loading and job-oriented scripts. The pinned lockfile independently reports the root package as `hasInstallScript: true`.

A future import pipeline could technically copy a manifest without executing it, but canonical repository presence would still create a side-effect-capable executable package surface whose ordinary npm operations could trigger behavior outside 002A authority.

The safe 002A posture is therefore not merely “do not run the scripts”; it is to avoid admitting unnecessary scripts into the bounded workspace seed in the first place.

Until a separately authorized candidate exists, all of these remain prohibited:

- `npm install`, `npm ci`, or equivalent package acquisition;
- lifecycle execution;
- `prepare`/hooks;
- Docker execution;
- Prisma generate/migrate/seed/studio;
- environment-file loading;
- provider/job/runtime invocation.

Therefore:

`D002A2-3 = RESOLVED_COPY_EXACT_SCRIPT_SURFACE_REJECTED_FOR_002A`

## D002A2-4 — lock/build closure sequencing

### Question

Should `package-lock.json` or `turbo.json` be admitted before root-manifest overbreadth is resolved?

### Resolution

`NO`.

`package-lock.json` is a 1.2MB whole-workspace dependency closure whose root explicitly has an install script and whose transitive component/license graph is not yet canonically classified for Signthos. Importing it now would multiply the same premature cross-grain dependency problem.

`turbo.json` is a build/runtime orchestration contract with a broad environment-variable surface that directly touches later authentication, signing, storage, mail, billing, jobs, telemetry, AI/provider, database and e2e boundaries.

Neither artifact is necessary to decide that exact root `package.json` is overbroad.

A smaller shared TypeScript configuration may later be required for a characterized package such as Prisma, but its exact allowlist and rights/provenance must be qualified separately after the root workspace boundary is settled.

Therefore:

`D002A2-4 = RESOLVED_LOCK_AND_TURBO_NOT_NEXT_002A_IMPORTS`

## D002A2-5 — later-grain boundary

### Question

Would exact root-manifest admission preserve the separation between 002A and 002B–002G?

### Resolution

`NO` sufficiently for Stage R.

The manifest's declarations explicitly encode later database, provider, mail, job, telemetry, UI, PDF/image, test and deployment-adjacent intent. Its exact workspace patterns also name broad future directory populations rather than only separately authorized workspaces. Even without executing packages, exact-copy admission would make those declarations and patterns part of the canonical Signthos root package contract before later grains authorize them.

Canonical grain boundaries are about repository authority as well as runtime execution. Deferring execution does not make overbroad declarations or workspace patterns minimal.

Therefore:

`D002A2-5 = RESOLVED_COPY_EXACT_WOULD_FRONT_LOAD_LATER_GRAINS`

## Exact-copy decision

All five blockers converge on the same architectural result:

`002A2_ROOT_PACKAGE_JSON_COPY_EXACT = REJECTED_AS_002A_MINIMUM_SURFACE`

This means only that exact-copy of the pinned root manifest is not the correct Stage R candidate for the 002A workspace baseline.

It does **not** mean:

- the upstream file is unsafe or defective;
- the upstream license classification is invalid;
- Signthos may silently edit or cherry-pick fields from it;
- Signthos may treat selected upstream field/value combinations as independently authored without provenance analysis;
- any replacement manifest is already authorized.

## Transformation and derivation boundary

Canonical Specification 001 supports source-import transformation kinds including `copied`, `adapted`, `rewritten_with_source_reference`, and `generated_from_upstream`.

`rewritten_with_source_reference` does not imply independent copyright and remains derivation-sensitive. Likewise, an adapted root manifest must not be treated as provenance-free merely because it contains fewer fields.

Therefore the overbreadth resolution may select a new planning candidate, but it cannot generate or import that candidate under the authority of this PR.

## Next proposed planning candidate

The smallest defensible successor to evaluate is:

`002A2-M1 — minimal root workspace manifest derivation qualification`

The proposed qualification question is whether a root manifest derived from the pinned upstream workspace identity can be bounded to repository/workspace facts only, with no scripts, dependencies, devDependencies, overrides, provider/runtime behavior, or later-grain package intent.

### Candidate semantic field boundary for qualification

The next planning packet may evaluate only these upstream semantic categories:

- private-root marker;
- npm workspace membership declaration;
- package-manager compatibility declaration;
- Node/npm engine compatibility declarations.

The semantic category `npm workspace membership declaration` does **not** preserve upstream glob values by implication. In particular, exact upstream values `apps/*` and `packages/*` are evidence inputs only and are not approved candidate destination values. M1 must prove every destination membership path or pattern from separately authorized/canonical workspaces, using least-authority matching. No destination pattern may match `packages/ee/**`, another restricted path, or any otherwise unauthorized workspace.

The following upstream root categories are excluded from that candidate unless separately re-authorized:

- upstream product package name;
- upstream product version;
- every script;
- every dependency;
- every devDependency;
- every override.

This is a semantic field allowlist for **future qualification only**. It is not candidate destination content, not a source-import allowlist, and not authorization to commit a derived `package.json`.

No destination bytes or digest exist yet.

## Rights/provenance blockers for 002A2-M1

Before any Stage R proposal for an adapted/minimal manifest, a separate qualification packet must resolve all of the following:

1. exact transformation classification under the canonical source-import taxonomy;
2. exact source path/blob/SHA-256 binding;
3. destination-byte design and exact destination SHA-256 only after authority exists to create the candidate;
4. derivation-sensitive `AGPL-3.0-only` treatment unless stronger path-specific rights evidence supports another result;
5. required permission/license obligations for modify/create-derivative/redistribute/publish-source behavior under repository policy;
6. the canonical `copyright_holder` field required by source-import v1 without inventing file-level ownership;
7. exact Signthos root identity/version policy without copying upstream product identity merely for convenience;
8. exact least-authority workspace membership values/patterns, including proof that no entry can match `packages/ee/**`, another restricted path, or an unauthorized workspace;
9. independent substantive review before any Stage R authorization proposal.

The current evidence does not yet provide a canonically accepted nonempty source-import `copyright_holder` value for root `package.json`. That is an explicit fail-closed provenance blocker for any later import-ready record and must be resolved from reliable first-party evidence rather than inferred from commit authorship, repository access, Enterprise-only copyright text, or generic product attribution.

## Shared configuration sequencing

`packages/tsconfig/**` is not bundled into 002A2-M1.

After the minimal root workspace boundary is independently qualified and, if later authorized, implemented, successor discovery may evaluate the smallest exact shared TypeScript configuration required by the first characterized 002B package.

For the currently observed Prisma dependency, that investigation must start from the actual `packages/prisma/tsconfig.json -> @documenso/tsconfig/react-library.json` dependency chain and include only files proven necessary by the configuration inheritance graph. It must not import all of `packages/tsconfig/**` by directory convenience.

## Exact exclusions

This resolution imports or authorizes none of the following:

- root `package.json` bytes;
- any reduced/adapted `package.json` bytes;
- exact upstream workspace glob values as Signthos destination membership values;
- `package-lock.json`;
- `turbo.json`;
- `packages/tsconfig/**`;
- `packages/prisma/**`;
- any other `apps/**` or `packages/**` path;
- `packages/ee/**`;
- dependencies or package-network access;
- lifecycle scripts;
- Docker/database/provider/job execution;
- credentials or paid services;
- source-import records;
- NOTICE regeneration;
- 002B implementation;
- Specification 003 implementation;
- relicensing, rebranding or product redesign.

## Exact-head qualification accounting

Before merge, this resolution PR must prove on its exact final head:

- the complete change surface is limited to this Signthos-authored resolution document;
- upstream-derived candidate bytes committed: `0`;
- source-import records created: `0`;
- exact-head GitHub Actions accounting, with `NO_APPLICABLE_RUN` recorded if canonical Spec 002 path filters remain unchanged;
- neutral, skipped, unavailable, billing-blocked, rate-limited or summary-only automated checks are not PASS;
- fresh independent substantive review of the exact final head;
- reconciliation of every material finding;
- zero unresolved material review threads;
- unchanged base/head immediately before guarded merge;
- guarded merge with exact `expected_head_sha`;
- post-merge verification before opening 002A2-M1 qualification.

## Resolution result candidate

`D002A2-1 = RESOLVED_COPY_EXACT_NOT_MINIMUM`

`D002A2-2 = RESOLVED_DEFER_TO_GRAIN_SPECIFIC_DEPENDENCY_QUALIFICATION`

`D002A2-3 = RESOLVED_COPY_EXACT_SCRIPT_SURFACE_REJECTED_FOR_002A`

`D002A2-4 = RESOLVED_LOCK_AND_TURBO_NOT_NEXT_002A_IMPORTS`

`D002A2-5 = RESOLVED_COPY_EXACT_WOULD_FRONT_LOAD_LATER_GRAINS`

`002A2_ROOT_PACKAGE_JSON_COPY_EXACT = REJECTED_AS_002A_MINIMUM_SURFACE`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SUCCESSOR_IMPORT_AUTHORITY = ABSENT`

`NEXT_PROPOSED_PLANNING_UNIT = 002A2-M1_MINIMAL_ROOT_WORKSPACE_MANIFEST_DERIVATION_QUALIFICATION`

If and only if this resolution becomes canonical after fresh independent substantive review, guarded expected-head merge and post-merge verification, the next authority is planning/evidence-only qualification of 002A2-M1. No destination manifest bytes may be created under this resolution authority.