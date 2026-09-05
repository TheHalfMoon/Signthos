# Specification 002C — Minimum Workspace and Dependency Closure Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / NO_IMPLEMENTATION_AUTHORITY`
Issue: #5
Canonical base: `859837d45fb229de0a00b6e8d3a51cb6fe22d1fa`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Execute the exact planning/evidence-only successor authorized by canonical PR #78:

`PLANNING_ONLY_002C_MINIMUM_WORKSPACE_DEPENDENCY_CLOSURE_QUALIFICATION`.

This artifact determines the narrowest future npm repository/package/dependency contract needed to support the already qualified two-file 002C auth-source candidate and its direct `zod` dependency without reviving the rejected broad Documenso root manifest or lockfile.

It also identifies the next dependency-ordered blocker that remains after package/dependency topology is known.

This artifact is Signthos-authored analysis only. It commits zero upstream-derived source bytes, creates or modifies zero source-import records, creates zero package manifests or lockfiles, installs zero dependencies, performs zero package-manager resolution, and executes zero TypeScript, Zod, WebAuthn, auth, database, provider, credential, build, or runtime behavior.

This is engineering provenance and repository-governance analysis, not legal advice.

## Canonical predecessor and authority boundary

Canonical PR #78 / merge `859837d45fb229de0a00b6e8d3a51cb6fe22d1fa` established:

- selected future 002C source closure:
  - `packages/lib/types/document-auth.ts`;
  - `packages/lib/types/webauthn.ts`;
- both selected source paths remain rights-blocked;
- exact public rights evidence remains conflicting between repository/Community AGPL-3.0 signals and `@documenso/lib` package MIT metadata;
- the exact 002B Prisma private permission artifact does not extend to 002C;
- `zod` is the direct external dependency required by both selected source files;
- canonical Signthos has no JavaScript/TypeScript package/workspace dependency declaration for `zod`;
- the Stage R eligible source-import allowlist remains empty;
- source-import authority remains absent;
- 002C implementation authority remains absent.

PR #78 authorizes only this planning/evidence-only workspace/dependency closure qualification. It does not authorize package manifests, lockfiles, package installation, network package resolution, source import, Stage R, runtime execution, license selection, private-permission expansion, EE access, later grains, Specification 003, or a new `S2-T042` identity.

## Exact current Signthos repository truth

Canonical Signthos at this qualification base contains:

- root `.npmrc` at blob `cbc6b6537fba6c69756ad16e69a35cc056791d99` with:
  - `legacy-peer-deps = true`;
  - `prefer-dedupe = true`;
  - `min-release-age = 7`;
- no root `package.json`;
- no root `package-lock.json`;
- no root JavaScript/TypeScript workspace declaration;
- `packages/` with exactly one current direct child: `packages/prisma/`;
- no `packages/lib/` destination package;
- no executable dependency declaration for `zod`.

The current Prisma surface is canonical 002B source state but is not silently converted into an npm workspace by this qualification. This artifact does not create package semantics for `packages/prisma/`.

## Controlling 002A decisions

### Root exact-copy remains rejected

Canonical 002A2 overbreadth resolution established that pinned upstream root `package.json` exact-copy is not a minimum Signthos workspace seed because it carries broad product identity, scripts, dependencies, devDependencies, overrides, and unrestricted workspace globs spanning later grains.

That resolution also established that future workspace membership must be derived from exact separately authorized/canonical paths rather than copying `apps/*` or `packages/*`.

This qualification does not reopen exact-copy admission.

`UPSTREAM_ROOT_PACKAGE_JSON_COPY_EXACT = STILL_REJECTED`

### Earlier no-necessity result was dependency-state-specific

Canonical 002A2-M1 established `M1_CURRENT_ROOT_MANIFEST_NECESSITY = NOT_ESTABLISHED` at a time when no concrete npm workspace member had yet been selected.

M1 explicitly made that result dependency-sensitive rather than permanent: a future characterized package could establish a real root-workspace need, at which point the requirement must return through a separately reviewed qualification rather than being guessed from upstream globs.

002C now supplies the first concrete future npm package path under examination: `packages/lib`, with an exact two-file source closure and one direct registry dependency (`zod`).

Therefore this qualification may reassess root-workspace necessity for this exact future package without authorizing implementation.

## Pinned upstream package-manager evidence

Pinned upstream root `package.json` is evidence only and records:

- `private: true`;
- workspaces `apps/*` and `packages/*`;
- package manager `npm@11.19.1`;
- npm engine floor `>=11.17.0`;
- Node engine floor `>=24.0.0`;
- broad scripts/dependencies/devDependencies/overrides that remain excluded from this 002C closure.

Pinned upstream `packages/lib/package.json` is also evidence only and records:

- package name `@documenso/lib`;
- package version `0.0.0`;
- broad package dependency/runtime/test surface;
- `zod` declaration `^3.25.76`;
- package metadata license `MIT`, which does not resolve the selected 002C source-path rights conflict.

Neither manifest is approved for copy, adaptation, field extraction, or destination use by this qualification.

## Pinned lockfile evidence for the direct dependency

Pinned upstream `package-lock.json`:

- Git blob: `d7b6c7081a6682a679d5724e67bbb6824ac9e6fd`;
- size previously canonically recorded: `1,214,402` bytes;
- lockfile version: `3`;
- whole-workspace root identity: `@documenso/root` version `2.17.0`;
- broad workspace graph and install-script state that remain outside this candidate.

Within that immutable lockfile, the top-level `node_modules/zod` entry records:

- version: `3.25.76`;
- resolved registry artifact: `https://registry.npmjs.org/zod/-/zod-3.25.76.tgz`;
- integrity: `sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==`;
- lockfile license metadata: `MIT`;
- no dependency list is recorded on that exact top-level zod entry.

This is strong reproducibility evidence for the exact dependency resolution used by the pinned upstream snapshot. It is not permission to download, install, copy, vendor, or redistribute the package, and lockfile license metadata is not substituted for later package-level rights verification.

Candidate dependency-resolution evidence:

`002C_ZOD_PINNED_RESOLUTION_EVIDENCE = 3.25.76`

`002C_ZOD_PINNED_INTEGRITY_EVIDENCE = sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==`

`002C_ZOD_PINNED_LOCK_LICENSE_METADATA = MIT_EVIDENCE_ONLY`

`002C_ZOD_OBSERVED_TRANSITIVE_DEPENDENCY_COUNT = 0_FROM_EXACT_LOCK_ENTRY`

No registry access is performed by this qualification.

## npm workspace and lockfile semantics used as external technical evidence

Current official npm documentation was consulted for package-manager semantics only, not as upstream Documenso rights evidence.

Relevant npm semantics:

- npm workspaces are nested packages explicitly named by the top-level root package's `workspaces` configuration;
- workspace paths may be direct paths rather than broad directory globs;
- a root install creates/updates a root `package-lock.json` representing the exact dependency tree;
- lockfiles are intended to preserve exact dependency-tree reproduction, including resolved artifact and integrity metadata;
- a per-project `.npmrc` applies at the root of the npm project in which npm is run.

Official references:

- `https://docs.npmjs.com/cli/using-npm/workspaces/`
- `https://docs.npmjs.com/files/package-lock.json/`
- `https://docs.npmjs.com/files/package.json/`
- `https://docs.npmjs.com/using-npm/config/`

These references support tool semantics only. They do not authorize any repository change or dependency acquisition.

## Candidate topology alternatives

### Alternative A — copy upstream root/package manifests and full lockfile

Rejected.

Reasons:

- canonical 002A2 already rejected the root manifest exact-copy as overbroad;
- upstream `packages/lib/package.json` declares dozens of unrelated dependencies and test/runtime fields far beyond the two-file auth candidate;
- upstream root lockfile captures a whole-repository dependency graph exceeding one megabyte;
- copying any of those artifacts would front-load unrelated grains and rights/provenance work.

`ALTERNATIVE_A = REJECTED_OVERBROAD`

### Alternative B — standalone nested package with no root npm project

A standalone future `packages/lib/package.json` plus a package-local lockfile could technically represent a small npm project, but it would create a second npm project root under `packages/lib`.

That topology would not directly reuse the already canonical root `.npmrc` as the per-project configuration file for package-local npm operations. Achieving equivalent policy would require either another config artifact or command/environment configuration semantics that are not currently canonical for this grain.

It would also bypass the dependency-sensitive 002A workspace model just when the first concrete npm package path has become known.

The alternative is therefore not selected as the minimum canonical Signthos topology.

`ALTERNATIVE_B = NOT_SELECTED_POLICY_FRAGMENTATION_AND_ROOT_POLICY_REUSE_GAP`

This is a planning selection, not a claim that standalone npm packages are technically invalid.

### Alternative C — minimal Signthos-authored root workspace plus minimal package-local manifest

Selected as the smallest future topology candidate, subject to later separate implementation authorization.

The topology would conceptually contain:

1. a Signthos-authored root npm manifest whose only proven semantic purposes are:
   - accidental-publication protection for the root project;
   - exact workspace membership for `packages/lib` only;
2. a Signthos-authored `packages/lib/package.json` whose only currently proven dependency purpose is the exact 002C direct registry dependency;
3. a newly generated Signthos lockfile derived from the eventual canonical manifests using a separately qualified exact npm toolchain, rather than copied/adapted from Documenso's full lockfile;
4. the already canonical root `.npmrc` reused unchanged as project-resolution policy.

No destination bytes for any of those future artifacts are created or approved here.

`ALTERNATIVE_C = SELECTED_FOR_FUTURE_BYTE_DESIGN_QUALIFICATION_ONLY`

## Minimum future root-workspace semantics

The only root-manifest semantics currently justified by the known 002C dependency are:

- root project must be nonpublishable/private;
- workspace membership must name exactly `packages/lib` rather than `packages/*`;
- no `apps/*`, broad `packages/*`, `packages/prisma`, `packages/ee`, or any other path is implied;
- no product name/version is required by the selected auth files;
- no script is required by the selected auth files;
- no root dependency/devDependency is required merely to declare the workspace;
- no override is currently justified.

Candidate semantic result:

`002C_ROOT_MANIFEST_NECESSITY = ESTABLISHED_FOR_FUTURE_MINIMUM_NPM_WORKSPACE_POLICY_REUSE`

`002C_ROOT_WORKSPACE_MEMBERSHIP = EXACT_PATH_PACKAGES_LIB_ONLY_IF_LATER_IMPLEMENTED`

`002C_ROOT_PRODUCT_IDENTITY_FIELDS = NOT_REQUIRED`

`002C_ROOT_SCRIPTS = NONE_REQUIRED`

`002C_ROOT_DEPENDENCIES = NONE_REQUIRED_FOR_WORKSPACE_DECLARATION`

`002C_ROOT_DEVDEPENDENCIES = NONE_REQUIRED_FOR_WORKSPACE_DECLARATION`

`002C_ROOT_OVERRIDES = NONE_CURRENTLY_REQUIRED`

The exact destination JSON bytes remain undesigned and unauthorized. In particular, this qualification does not authorize copying `private: true` or any other upstream field/value pair into a destination file under an assumed provenance-free theory. Future candidate bytes must be independently designed and their derivation/provenance classification reviewed before implementation.

## Package-local minimum dependency semantics

The selected source files use only:

- one local relative source dependency (`./webauthn`); and
- one external package import (`zod`).

For dependency acquisition alone, no other upstream `@documenso/lib` declaration is statically required by those two files.

A future Signthos-authored `packages/lib/package.json` therefore need not copy the upstream package name, version, entrypoint, `files`, scripts, unrelated dependencies, or devDependencies merely to express this closure.

Candidate dependency intent:

`002C_PACKAGES_LIB_DIRECT_RUNTIME_DEPENDENCY_SET = { zod }`

For reproducible characterization, the currently preferred exact dependency candidate is the pinned resolved version rather than the broader upstream semver range:

`002C_ZOD_FUTURE_DECLARATION_CANDIDATE = 3.25.76_EXACT`

This exact-version preference is a planning conclusion only. It does not create manifest bytes and does not authorize package acquisition.

A future package-local manifest may also need a Signthos-owned package identity/private marker for npm workspace behavior and publication safety. Exact identity fields remain a Signthos design decision and must not be copied from `@documenso/lib` by convenience.

`002C_PACKAGES_LIB_PRODUCT_IDENTITY = UNDESIGNED_SIGNTHOS_OWNED_IF_NEEDED`

## Lockfile strategy

The pinned upstream root lockfile is not a valid Signthos minimum candidate because its graph is repository-wide.

The future minimum lockfile strategy is therefore:

- do not copy/adapt the pinned upstream `package-lock.json`;
- independently generate a Signthos lockfile from the separately approved minimal Signthos manifests;
- use a separately qualified exact npm toolchain/version;
- require the resulting external package closure to remain bounded to the exact dependencies approved for the characterization grain;
- independently verify resolved package identity, integrity, license/notice evidence, install-script metadata, and unexpected transitives before considering dependency acquisition successful;
- fail closed if generated resolution differs materially from the qualified dependency evidence.

The pinned upstream zod resolution/integrity may be used as an immutable comparison point, not as a substitute for independent future resolution evidence.

Candidate result:

`002C_FULL_UPSTREAM_LOCKFILE = REJECTED_OVERBROAD`

`002C_FUTURE_LOCKFILE = SIGNTHOS_GENERATED_MINIMUM_GRAPH_REQUIRED_IF_DEPENDENCY_INSTALLATION_LATER_AUTHORIZED`

`002C_LOCKFILE_BYTES = NONE`

`002C_LOCKFILE_GENERATION_AUTHORITY = ABSENT`

## Package-manager and engine fields

Pinned upstream toolchain evidence is:

- `npm@11.19.1`;
- npm engine `>=11.17.0`;
- Node engine `>=24.0.0`;
- lockfile version `3`.

Those values are relevant to future reproducibility but are not selected as destination root-manifest fields by this qualification.

Reason:

- the source files themselves do not establish that exact Node/npm compatibility floor;
- lockfile generation is not authorized yet;
- the next tooling question must determine the minimum TypeScript characterization environment, which may impose its own exact Node/npm/tooling compatibility requirements;
- front-loading toolchain fields before that analysis would repeat the ordering error 002A2-M1 avoided.

Candidate result:

`002C_PACKAGE_MANAGER_FIELD = DEFERRED_TO_CHARACTERIZATION_TOOLCHAIN_QUALIFICATION`

`002C_NODE_ENGINE_FIELD = DEFERRED_TO_CHARACTERIZATION_TOOLCHAIN_QUALIFICATION`

`002C_NPM_ENGINE_FIELD = DEFERRED_TO_CHARACTERIZATION_TOOLCHAIN_QUALIFICATION`

No command or version installation is authorized here.

## Canonical `.npmrc` reuse result

The root `.npmrc` remains the canonical npm resolution-policy artifact and is not changed by this candidate.

The selected root-workspace topology permits future root-project npm operations to use that artifact in its existing repository-root position rather than duplicating it inside `packages/lib`.

No claim is made here that every future npm version interprets every key identically. Exact toolchain characterization must verify the effective intended policy before any dependency-network operation becomes eligible.

`002C_NPMRC_REUSE = REUSE_CANONICAL_ROOT_ARTIFACT_UNCHANGED`

`002C_DUPLICATE_PACKAGE_LOCAL_NPMRC = NOT_SELECTED`

## Third-party dependency provenance and security boundary

`zod` is third-party registry software rather than a Documenso source-import path.

The pinned upstream lockfile provides exact version/resolution/integrity/license metadata, but later Signthos dependency use still requires independently reviewable evidence sufficient for the repository's dependency policy and security posture.

Before any dependency installation is authorized, a later implementation/authorization unit must at minimum establish:

- exact package identity/version;
- expected registry source;
- expected integrity;
- license/notice evidence from the package/registry source rather than only inherited Documenso metadata;
- whether package install/lifecycle scripts exist;
- exact transitive package closure;
- exact package-manager/toolchain version;
- network scope and package-source restrictions;
- generated lockfile review;
- no unexpected package or lifecycle behavior.

This artifact does not perform those acquisition-time checks.

`002C_ZOD_DEPENDENCY_PROVENANCE = PLANNED_NOT_ACQUIRED`

`002C_ZOD_NETWORK_AUTHORITY = ABSENT`

`002C_ZOD_INSTALL_AUTHORITY = ABSENT`

## TypeScript characterization closure is not yet complete

The package/dependency topology above is necessary but not sufficient for executable characterization.

Pinned upstream `packages/lib/tsconfig.json`:

- blob `b7913f6ee7d1075b50a4a2e8d75145b2e9ca42a4`;
- extends `@documenso/tsconfig/react-library.json`;
- requests types from `@documenso/tsconfig/process-env.d.ts` and `vite/client`;
- sets `moduleResolution` to `Bundler`.

Pinned `packages/tsconfig/react-library.json`:

- blob `cdc684e3d0b80bdcecd5cc10bf117e661d32dfbc`;
- extends `./base.json`;
- carries React/DOM/library-wide compiler configuration.

Pinned `packages/tsconfig/base.json`:

- blob `aaa62ea73c63ce2a501bef3b2e7af323e68a258c`;
- carries broad shared TypeScript compiler behavior.

Pinned root manifest separately declares TypeScript `5.6.2`.

The selected 002C source files are TypeScript files, so some independently qualified TypeScript characterization toolchain is eventually required. However, copying the upstream `packages/lib/tsconfig.json` or shared config chain would pull `vite/client`, process-env types, React-library semantics, and additional workspace/configuration dependencies not proven necessary for the two selected auth contract files.

Therefore:

`002C_UPSTREAM_LIB_TSCONFIG_COPY = REJECTED_AS_CURRENT_MINIMUM`

`002C_UPSTREAM_SHARED_TSCONFIG_COPY = REJECTED_AS_CURRENT_MINIMUM`

`002C_TYPESCRIPT_CHARACTERIZATION_TOOLCHAIN = REQUIRED_BUT_NOT_YET_QUALIFIED`

`002C_TYPESCRIPT_EXECUTION_AUTHORITY = ABSENT`

This is the next dependency-order question after package/dependency topology, not an invitation to import the upstream TypeScript configuration.

## Rights blocker remains independent and unsatisfied

Nothing in workspace/dependency planning changes the source-rights state from PR #78.

Canonical candidate carry-forward:

`002C_DOCUMENT_AUTH_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`

`002C_WEBAUTHN_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`

`002C_PRIVATE_PERMISSION_INHERITANCE_FROM_002B = PROHIBITED`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002C_IMPLEMENTATION_AUTHORITY = ABSENT`

Workspace/toolchain planning may continue because it copies zero source and grants no import authority, but no workspace or tooling completion may bypass the exact source-rights re-entry requirement before Stage R.

## Candidate minimum future closure summary

If later separately authorized after all prerequisite gates, the currently smallest coherent npm dependency topology candidate is:

- existing root `.npmrc`: reuse unchanged;
- future Signthos-authored root `package.json`: minimal private root plus exact workspace membership `packages/lib` only;
- future Signthos-authored `packages/lib/package.json`: minimal package/private semantics plus exact direct dependency `zod` at an independently accepted exact version, currently planned as `3.25.76`;
- future Signthos-generated root `package-lock.json`: minimum reviewed graph generated by an exact separately qualified npm toolchain;
- no copied upstream root/package manifests;
- no copied upstream lockfile;
- no copied upstream tsconfig/shared config;
- no broad `apps/*`/`packages/*` workspace globs;
- no scripts, broad dependencies, devDependencies, overrides, provider contracts, EE paths, or unrelated package membership.

No byte-level candidate is authorized by this summary.

## Successor decision

The workspace/dependency topology is now sufficiently bounded for planning, but executable/static TypeScript characterization still lacks a minimum compiler/configuration harness.

The next productive planning-only successor candidate is therefore:

`PLANNING_ONLY_002C_MINIMUM_TYPESCRIPT_CHARACTERIZATION_TOOLCHAIN_QUALIFICATION`

That successor may, if and only if this qualification becomes canonical:

- inspect the two selected source files' actual TypeScript syntax/type requirements as evidence;
- inspect pinned upstream TypeScript version/configuration only as evidence;
- determine the smallest independently authored TypeScript compiler/configuration/test harness sufficient to characterize the selected auth schema contract;
- determine whether TypeScript itself is the only additional development dependency or whether a narrowly justified runner is required;
- determine exact Node/npm compatibility needed by the selected tooling;
- determine the future minimum package-manager/toolchain pinning semantics;
- propose independently authored static characterization cases without implementing or executing them;
- preserve `zod` acquisition and source rights as separate unsatisfied gates.

It may not:

- create root/package manifests;
- generate/change a lockfile;
- install or download TypeScript, Zod, or any package;
- access the npm registry;
- copy/adapt upstream tsconfig files;
- copy/adapt upstream tests;
- copy/adapt the two 002C source files;
- create/modify source-import records;
- select source-path licenses;
- claim/expand permission;
- execute TypeScript/Zod/WebAuthn/auth behavior;
- grant Stage R;
- enter EE paths;
- start 002D–002H implementation;
- start Specification 003;
- invent `S2-T042`.

Candidate result:

`NEXT_AUTHORIZED_UNIT_IF_CANONICAL = PLANNING_ONLY_002C_MINIMUM_TYPESCRIPT_CHARACTERIZATION_TOOLCHAIN_QUALIFICATION`

## Explicit non-grants

This qualification itself does not authorize or create:

- root `package.json`;
- `packages/lib/package.json`;
- root or nested `package-lock.json`;
- dependency/network access;
- `zod` installation;
- TypeScript installation;
- any npm install/ci/update command;
- any lifecycle script;
- any upstream manifest/config/source/test copy;
- `packages/lib/**` destination source;
- source-import records;
- NOTICE changes;
- source license selection;
- private-permission expansion;
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
   - root-policy reuse reasoning;
   - rejection of broad upstream manifests/lockfile;
   - exact zod pinned-resolution evidence;
   - minimal future root/package/lock semantics;
   - third-party dependency boundary;
   - TypeScript toolchain blocker;
   - successor/non-grant boundaries;
9. every material finding is reconciled and independently re-reviewed against the exact amended head if bytes change;
10. unresolved material review threads are zero;
11. canonical `main`, PR base, and PR head remain unchanged at final pre-merge race check;
12. repository rulesets and branch protection are reverified;
13. merge uses exact `expected_head_sha`;
14. post-merge verification proves ordered ancestry, tree equality, signature, one-file change surface, zero upstream-derived bytes, zero source-import records, zero package/runtime changes, and the bounded successor frontier.
