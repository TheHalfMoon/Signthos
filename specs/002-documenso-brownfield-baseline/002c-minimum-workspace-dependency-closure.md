# Specification 002C — Minimum Workspace and Dependency Closure Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / NO_IMPLEMENTATION_AUTHORITY`
Issue: #5
Canonical base: `859837d45fb229de0a00b6e8d3a51cb6fe22d1fa`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Execute the exact planning/evidence-only successor authorized by canonical PR #78:

`PLANNING_ONLY_002C_MINIMUM_WORKSPACE_DEPENDENCY_CLOSURE_QUALIFICATION`.

This artifact determines the narrowest future npm package/dependency contract needed to support the already qualified two-file 002C auth-source candidate and its direct `zod` dependency. It commits zero upstream-derived source bytes, creates or modifies zero source-import records, creates zero package manifests or lockfiles, installs zero dependencies, performs zero package-manager resolution, and executes zero TypeScript, Zod, WebAuthn, auth, database, provider, credential, build, or runtime behavior.

This is engineering provenance and repository-governance analysis, not legal advice.

## Canonical predecessor and authority boundary

Canonical PR #78 / merge `859837d45fb229de0a00b6e8d3a51cb6fe22d1fa` established:

- selected future 002C source closure:
  - `packages/lib/types/document-auth.ts`;
  - `packages/lib/types/webauthn.ts`;
- both selected source paths remain rights-blocked;
- exact public rights evidence remains conflicting between repository/Community AGPL-3.0 signals and `@documenso/lib` package MIT metadata;
- the exact 002B Prisma private permission artifact does not extend to 002C;
- both selected source files require `zod`;
- canonical Signthos has no executable JavaScript/TypeScript dependency declaration for `zod`;
- Stage R eligible source-import allowlist remains empty;
- source-import authority remains absent;
- 002C implementation authority remains absent.

PR #78 authorizes only this planning/evidence qualification. It does not authorize package manifests, lockfiles, package installation, network package resolution, source import, Stage R, runtime execution, license selection, private-permission expansion, EE access, later grains, Specification 003, or a new `S2-T042` identity.

## Exact current Signthos repository truth

At the canonical base:

- root `.npmrc` blob is `cbc6b6537fba6c69756ad16e69a35cc056791d99` and records:
  - `legacy-peer-deps = true`;
  - `prefer-dedupe = true`;
  - `min-release-age = 7`;
- no root `package.json` exists;
- no root `package-lock.json` exists;
- no root JavaScript/TypeScript workspace declaration exists;
- `packages/` has one current direct child: `packages/prisma/`;
- no `packages/lib/` destination package exists;
- no executable dependency declaration for `zod` exists.

The canonical Prisma surface is not silently converted into an npm workspace by this qualification.

## Controlling 002A decisions

Canonical 002A2 rejected copying the pinned upstream root `package.json` as a minimum seed because it carries broad product identity, scripts, dependencies, devDependencies, overrides, and broad workspace globs. That rejection remains controlling.

`UPSTREAM_ROOT_PACKAGE_JSON_COPY_EXACT = STILL_REJECTED`

Canonical 002A2-M1 established:

`M1_CURRENT_ROOT_MANIFEST_NECESSITY = NOT_ESTABLISHED`

M1 permits a later qualification to establish a root workspace if a concrete requirement proves that one is needed. The existence of a concrete nested package is not, by itself, proof that npm workspace semantics are required.

## Pinned upstream package/dependency evidence

Pinned upstream root `package.json` is evidence only and records:

- `private: true`;
- workspaces `apps/*` and `packages/*`;
- package manager `npm@11.19.1`;
- npm engine floor `>=11.17.0`;
- Node engine floor `>=24.0.0`;
- broad unrelated scripts/dependencies/devDependencies/overrides.

Pinned upstream `packages/lib/package.json` is evidence only and records:

- package name `@documenso/lib`;
- package version `0.0.0`;
- broad package/runtime/test surface;
- `zod` declaration `^3.25.76`;
- package metadata license `MIT`, which does not resolve selected source-path rights.

Neither upstream manifest is approved for copy, adaptation, field extraction, or destination use by this qualification.

Pinned upstream `package-lock.json` is also evidence only:

- blob `d7b6c7081a6682a679d5724e67bbb6824ac9e6fd`;
- lockfile version `3`;
- whole-workspace identity `@documenso/root@2.17.0`;
- broad repository-wide dependency graph.

Its exact top-level `node_modules/zod` entry records:

- version `3.25.76`;
- resolved registry artifact `https://registry.npmjs.org/zod/-/zod-3.25.76.tgz`;
- integrity `sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==`;
- lockfile license metadata `MIT`;
- no dependency list on that exact entry.

Candidate evidence only:

`002C_ZOD_PINNED_RESOLUTION_EVIDENCE = 3.25.76`

`002C_ZOD_PINNED_INTEGRITY_EVIDENCE = sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==`

`002C_ZOD_PINNED_LOCK_LICENSE_METADATA = MIT_EVIDENCE_ONLY`

`002C_ZOD_OBSERVED_TRANSITIVE_DEPENDENCY_COUNT = 0_FROM_EXACT_LOCK_ENTRY`

No registry access is performed and no rights conclusion is inferred from lockfile metadata.

## Candidate topology alternatives

### Alternative A — copy broad upstream manifests and lockfile

Rejected as overbroad.

`ALTERNATIVE_A = REJECTED_OVERBROAD`

### Alternative B — standalone nested package with no root npm project

Selected as the minimum topology supported by current evidence.

A future independently authored `packages/lib/package.json` plus a package-local generated `packages/lib/package-lock.json` can represent the exact currently known dependency closure without adding root workspace semantics.

This is smaller than a root-workspace topology because it does not require a third artifact at the repository root. The selected two-file source pair does not itself require npm workspace membership, root publication policy, or root-project package-manager execution.

The existing root `.npmrc` does not change that minimum result. Reusing its policy for a nested standalone npm project could later require separately qualified command/environment configuration or a package-local policy artifact, but that is a policy/tooling question, not a proven dependency of the selected source pair. No such artifact is authorized here.

`ALTERNATIVE_B = SELECTED_MINIMUM_TOPOLOGY_FOR_FUTURE_BYTE_DESIGN_QUALIFICATION_ONLY`

### Alternative C — minimal root workspace plus package-local manifest

Not selected as the minimum topology on present evidence.

A future Signthos-owned root workspace may still become justified if a separately reviewed requirement establishes that root-project npm policy reuse, multi-package coordination, repository-level lockfile semantics, or another concrete invariant is mandatory. That requirement is not established by this qualification.

`ALTERNATIVE_C = DEFERRED_PENDING_INDEPENDENT_ROOT_WORKSPACE_NECESSITY`

`002C_ROOT_MANIFEST_NECESSITY = NOT_ESTABLISHED`

`002C_ROOT_WORKSPACE_MEMBERSHIP = NOT_SELECTED`

`002C_ROOT_LOCKFILE_NECESSITY = NOT_ESTABLISHED`

This correction resolves the prior exact-head review finding that root-workspace policy reuse had been treated as a minimum requirement without sufficient evidence.

## Minimum package-local dependency semantics

The selected source files use only:

- one local relative source dependency: `./webauthn`;
- one external package import: `zod`.

For dependency acquisition alone, no other upstream `@documenso/lib` declaration is statically required by those two files.

A future Signthos-authored `packages/lib/package.json` therefore need not copy upstream package name, version, entrypoint, `files`, scripts, unrelated dependencies, or devDependencies merely to express the selected closure.

`002C_PACKAGES_LIB_DIRECT_RUNTIME_DEPENDENCY_SET = { zod }`

For reproducible characterization, the preferred exact dependency candidate is the pinned resolved version rather than the broader upstream semver range:

`002C_ZOD_FUTURE_DECLARATION_CANDIDATE = 3.25.76_EXACT`

This is planning only. It creates no manifest bytes and grants no package acquisition authority.

A future package-local manifest may need Signthos-owned package identity/private semantics. Exact fields remain independently designed Signthos decisions and must not be copied from `@documenso/lib` by convenience.

`002C_PACKAGES_LIB_PRODUCT_IDENTITY = UNDESIGNED_SIGNTHOS_OWNED_IF_NEEDED`

## Minimum lockfile strategy

The upstream repository-wide lockfile remains rejected as a Signthos minimum candidate.

If dependency installation later becomes authorized, the currently minimum topology calls for a newly generated package-local lockfile under the standalone `packages/lib` npm project, derived from separately approved Signthos-authored package bytes with a separately qualified exact npm toolchain.

The future qualification must verify exact package identity, resolved source, integrity, license/notice evidence, install/lifecycle scripts, exact transitives, package-manager version, network scope, and unexpected package behavior.

`002C_FULL_UPSTREAM_LOCKFILE = REJECTED_OVERBROAD`

`002C_FUTURE_LOCKFILE_LOCATION = PACKAGES_LIB_PACKAGE_LOCAL_IF_STANDALONE_TOPOLOGY_LATER_AUTHORIZED`

`002C_LOCKFILE_BYTES = NONE`

`002C_LOCKFILE_GENERATION_AUTHORITY = ABSENT`

## Root `.npmrc` result

The canonical root `.npmrc` remains unchanged and remains repository evidence/policy state.

This qualification does not claim that it automatically governs a future standalone `packages/lib` npm project, and it does not duplicate or move the file. Exact package-manager characterization must determine whether the root settings are inherited/effective for any future command shape and whether equivalent policy is actually required.

`002C_ROOT_NPMRC = UNCHANGED`

`002C_NPMRC_APPLICABILITY_TO_STANDALONE_PACKAGE = DEFERRED_TO_TOOLCHAIN_QUALIFICATION`

`002C_DUPLICATE_PACKAGE_LOCAL_NPMRC_AUTHORITY = ABSENT`

## Package-manager and TypeScript characterization blockers

Pinned upstream toolchain evidence includes:

- `npm@11.19.1`;
- npm engine `>=11.17.0`;
- Node engine `>=24.0.0`;
- TypeScript `5.6.2` in the pinned root manifest.

Those values are evidence only. They are not selected as destination fields or executable toolchain pins by this qualification.

Pinned upstream `packages/lib/tsconfig.json` extends broad shared Documenso configuration and introduces `vite/client`, process-env typing, React-library/shared config semantics, and additional workspace coupling not proven necessary for the selected two-file auth contract.

Therefore:

`002C_PACKAGE_MANAGER_FIELD = DEFERRED_TO_CHARACTERIZATION_TOOLCHAIN_QUALIFICATION`

`002C_NODE_ENGINE_FIELD = DEFERRED_TO_CHARACTERIZATION_TOOLCHAIN_QUALIFICATION`

`002C_NPM_ENGINE_FIELD = DEFERRED_TO_CHARACTERIZATION_TOOLCHAIN_QUALIFICATION`

`002C_UPSTREAM_LIB_TSCONFIG_COPY = REJECTED_AS_CURRENT_MINIMUM`

`002C_UPSTREAM_SHARED_TSCONFIG_COPY = REJECTED_AS_CURRENT_MINIMUM`

`002C_TYPESCRIPT_CHARACTERIZATION_TOOLCHAIN = REQUIRED_BUT_NOT_YET_QUALIFIED`

`002C_TYPESCRIPT_EXECUTION_AUTHORITY = ABSENT`

## Rights blocker remains independent and unsatisfied

Nothing in dependency-topology planning changes the source-rights state from PR #78.

`002C_DOCUMENT_AUTH_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`

`002C_WEBAUTHN_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`

`002C_PRIVATE_PERMISSION_INHERITANCE_FROM_002B = PROHIBITED`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002C_IMPLEMENTATION_AUTHORITY = ABSENT`

No package/tooling qualification may bypass source-rights re-entry before Stage R.

## Candidate minimum future closure summary

If later separately authorized after all prerequisite gates, the currently minimum dependency topology candidate is:

- future Signthos-authored `packages/lib/package.json` with only independently justified package/private semantics and exact direct dependency intent for `zod`;
- future Signthos-generated `packages/lib/package-lock.json` representing the reviewed package-local dependency graph;
- no root npm manifest or root lockfile unless a later independent root-workspace-necessity qualification establishes one;
- no copied upstream root/package manifests;
- no copied upstream lockfile;
- no copied upstream tsconfig/shared config;
- no broad workspace globs;
- no unrelated scripts, dependencies, devDependencies, overrides, provider contracts, EE paths, or package membership.

No byte-level candidate is authorized by this summary.

## Successor decision

The package/dependency topology is sufficiently bounded for planning, but executable/static TypeScript characterization still lacks a minimum compiler/configuration harness.

If and only if this qualification becomes canonical, the next planning-only successor candidate is:

`PLANNING_ONLY_002C_MINIMUM_TYPESCRIPT_CHARACTERIZATION_TOOLCHAIN_QUALIFICATION`

That successor may:

- inspect the selected source files' TypeScript syntax/type requirements as evidence;
- inspect pinned upstream TypeScript/configuration only as evidence;
- determine the smallest independently authored TypeScript compiler/configuration/test harness sufficient to characterize the selected auth schema contract;
- determine exact Node/npm compatibility required by the selected tooling;
- determine whether any package-manager policy is mandatory for the standalone package and whether root `.npmrc` settings are applicable;
- propose independently authored static characterization cases without implementing or executing them;
- preserve `zod` acquisition and source rights as separate unsatisfied gates.

It may not create package manifests or lockfiles, install/download packages, access the npm registry, copy/adapt upstream tsconfig/tests/source, create source-import records, select source-path licenses, execute TypeScript/Zod/WebAuthn/auth behavior, grant Stage R, enter EE paths, start 002D–002H, start Specification 003, or invent `S2-T042`.

`NEXT_AUTHORIZED_UNIT_IF_CANONICAL = PLANNING_ONLY_002C_MINIMUM_TYPESCRIPT_CHARACTERIZATION_TOOLCHAIN_QUALIFICATION`

## Explicit non-grants

This qualification does not authorize or create:

- root or nested `package.json` bytes;
- root or nested `package-lock.json` bytes;
- dependency/network access;
- `zod` or TypeScript installation;
- npm install/ci/update execution;
- lifecycle scripts;
- upstream manifest/config/source/test copying;
- `packages/lib/**` destination source;
- source-import records or NOTICE changes;
- source license selection or private-permission expansion;
- Stage R;
- TypeScript/Zod/WebAuthn/auth runtime behavior;
- database/provider/credential behavior;
- EE access;
- 002D–002H implementation;
- Specification 003;
- `S2-T042`.

## Exact-head qualification requirements

Before this result may become canonical, require on the exact final PR head:

1. final repository diff remains limited to this one Signthos-authored planning artifact;
2. upstream-derived source/config/manifest/lock/test bytes committed remain `0`;
3. source-import records created/modified remain `0`;
4. no package manifest, lockfile, `.npmrc`, package source, NOTICE, provenance schema/tool, workflow, or runtime surface changes;
5. no npm/package network or runtime execution evidence is claimed;
6. exact-head GitHub Actions/check accounting is accurate, including `NO_APPLICABLE_RUN` rather than PASS where applicable;
7. neutral, skipped, unavailable, billing-blocked, rate-limited, or summary-only provider results are not counted as PASS;
8. fresh independent substantive review verifies:
   - controlling 002A2/M1 interpretation;
   - current Signthos package state;
   - standalone package selection as the actual minimum supported by current evidence;
   - root workspace/root policy reuse remaining deferred unless independently required;
   - rejection of broad upstream manifests/lockfile;
   - exact `zod` pinned-resolution evidence;
   - third-party dependency boundary;
   - TypeScript toolchain blocker;
   - successor/non-grant boundaries;
9. every material finding is reconciled and independently re-reviewed against the exact amended head if bytes change;
10. unresolved material review threads are zero;
11. canonical `main`, PR base, and PR head remain unchanged at final pre-merge race check;
12. repository rulesets/branch protection are reverified where accessible;
13. merge uses exact `expected_head_sha`;
14. post-merge verification proves ordered ancestry, tree/document identity, signature, one-file change surface, zero upstream-derived bytes, zero source-import records, zero package/runtime changes, and the bounded successor frontier.
