# Specification 002A2-M1 — Current Root-Manifest Necessity Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / NO_STAGE_R_CANDIDATE`
Issue: #5
Canonical base: `9beb6e69128315cb4450f747fbb793fe9a611465`
Canonical predecessor: PR #50 / merge `9beb6e69128315cb4450f747fbb793fe9a611465`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Execute the planning/evidence-only successor authorized by canonical PR #50:

`002A2-M1 — minimal root workspace manifest derivation qualification`.

This unit asks a narrower question than “what should a reduced `package.json` contain?” It first determines whether canonical Signthos currently has any bounded repository/workspace need that requires a root npm manifest at all.

This qualification commits no upstream-derived bytes, creates no destination `package.json`, creates no source-import record, installs no package, executes no lifecycle script, and grants no Stage R authority.

## Controlling boundaries

Canonical Specification 002 requires dependency-minimal bounded grains. Canonical PR #50 established that exact-copy of the pinned upstream root `package.json` is not the minimum 002A surface and that any future M1 candidate may examine only these semantic categories:

- private-root marker;
- npm workspace membership declaration;
- package-manager compatibility declaration;
- Node/npm engine compatibility declarations.

PR #50 also established that upstream `apps/*` and `packages/*` are evidence only, not approved Signthos destination values, and that no destination membership may include or match `packages/ee/**`, another restricted path, or any otherwise unauthorized workspace.

The current M1 authority does not permit destination manifest bytes. Therefore this qualification must decide necessity and semantic admissibility before any candidate-byte design.

## Exact canonical Signthos state

The exact canonical tree at `9beb6e69128315cb4450f747fbb793fe9a611465` contains:

- canonical 002A1 `.npmrc`;
- the required AGPL full-license artifact and deterministic provenance/NOTICE surfaces from 002A1;
- governance, foundation, Specification 001/002 evidence, and provenance tooling.

The canonical repository root does **not** contain:

- `package.json`;
- `package-lock.json`;
- `turbo.json`;
- `apps/`;
- `packages/`.

No canonical source-import record authorizes a Documenso workspace package beyond the exact 002A1 `.npmrc` import.

Therefore the current authorized npm workspace-member set is empty.

`CURRENT_AUTHORIZED_WORKSPACE_MEMBERSHIP = EMPTY`

## Pinned upstream evidence

Canonical PRs #49 and #50 already bound the upstream root manifest to:

- path: `package.json`;
- blob: `5578501006ed3d09e9268165af9ffdeb8ae4051f`;
- size: `5916` bytes;
- SHA-256: `5379d7cf9ee597673b1005d3243bf4cb4f9846959b65df9ba0193fac2e9b6285`;
- path-level license treatment: `AGPL-3.0-only`;
- exact-copy result: rejected as an overbroad 002A minimum surface.

The upstream manifest exposes repository-wide values including product identity/version, broad workspace globs, scripts, dependencies/devDependencies, overrides, package-manager compatibility, and Node/npm engine compatibility.

Only the four semantic categories listed by PR #50 are in M1 planning scope. Their upstream values are evidence inputs only and are not approved destination content.

## Necessity analysis

### 1. Private-root marker

A private-root marker is useful when an npm root manifest exists and must be protected from accidental publication.

Canonical Signthos currently has no root npm manifest and no authorized npm workspace member. Adding a manifest solely to carry a private marker would create the object whose publication behavior the marker protects without establishing any current workspace need for that object.

Result:

`PRIVATE_ROOT_MARKER_CURRENT_NECESSITY = NOT_ESTABLISHED`

This does not reject a future private-root marker after a real workspace need exists.

### 2. Workspace membership

Workspace membership must be derived from separately authorized/canonical workspaces using least-authority matching.

At the canonical base:

- authorized `apps/**` workspace paths: none;
- authorized `packages/**` workspace paths: none;
- canonical `apps/` directory: absent;
- canonical `packages/` directory: absent.

An empty workspace list would not preserve a useful upstream workspace relationship and would not enable a currently authorized package. Broad wildcard values are expressly prohibited by PR #50.

Therefore no destination workspace membership value can presently be justified.

Result:

`WORKSPACE_MEMBERSHIP_CURRENT_NECESSITY = NOT_ESTABLISHED`

`WORKSPACE_MEMBERSHIP_DESTINATION_SET = UNDESIGNED`

### 3. Package-manager compatibility

The pinned upstream root records a package-manager compatibility declaration. That fact may be relevant when Signthos has an authorized npm workspace whose reproducible behavior depends on a root package-manager contract.

Canonical Signthos currently has no root npm workspace or imported package requiring that contract. The existing `.npmrc` policy seed does not itself require a root `package.json` to remain a canonical configuration artifact.

Pinning a package-manager declaration now would therefore establish a new root toolchain contract before a bounded package/workspace requirement proves its necessity.

Result:

`PACKAGE_MANAGER_DECLARATION_CURRENT_NECESSITY = NOT_ESTABLISHED`

The upstream package-manager value remains evidence, not approved destination content.

### 4. Node/npm engine compatibility

Engine declarations constrain a package/workspace runtime/toolchain contract. Canonical Signthos currently has no authorized imported npm package or application whose exact characterization requires those root engine declarations.

Copying or adapting upstream Node/npm engine floors now would front-load a toolchain compatibility decision without a bounded executable workspace dependency.

Result:

`ENGINE_DECLARATIONS_CURRENT_NECESSITY = NOT_ESTABLISHED`

Future package qualification may establish an exact minimum Node/npm compatibility requirement from the actual selected package graph. That later evidence may agree with or differ from the pinned upstream root values; M1 does not pre-decide it.

## Why an empty or placeholder root manifest is rejected

M1 must not create a root manifest merely because later grains are expected to need npm workspaces.

A placeholder manifest would still create canonical repository semantics, including some combination of package identity, publication behavior, package-manager compatibility, engine compatibility, or workspace membership. Those semantics would exist before any authorized workspace path proves which values are necessary.

An empty/minimal placeholder would also create a false appearance that the 002A root workspace boundary has been implemented even though the first real workspace membership is still unknown.

Therefore:

`PLACEHOLDER_ROOT_MANIFEST = REJECTED_WITHOUT_CURRENT_NECESSITY`

This is a dependency-order decision, not a permanent prohibition on a future root manifest.

## Future dependency evidence — not authorization

The pinned upstream snapshot contains evidence that later database/domain characterization may require shared workspace configuration.

Observed immutable dependency chain:

1. `packages/prisma/tsconfig.json`
   - blob `4aefcb98c13a0f69584c741a4a40144553f92ac4`;
   - extends `@documenso/tsconfig/react-library.json`.
2. `packages/tsconfig/react-library.json`
   - blob `cdc684e3d0b80bdcecd5cc10bf117e661d32dfbc`;
   - extends `./base.json`.
3. `packages/tsconfig/base.json`
   - blob `aaa62ea73c63ce2a501bef3b2e7af323e68a258c`.
4. `packages/tsconfig/package.json`
   - blob `b22d7d2ed75db7249c7269b9f0130e096da1c621`;
   - package name `@documenso/tsconfig`;
   - package-level license declaration `MIT`.

This evidence suggests that the smallest currently observed shared TypeScript-configuration closure relevant to the Prisma configuration relationship is no broader than:

- `packages/tsconfig/package.json`;
- `packages/tsconfig/react-library.json`;
- `packages/tsconfig/base.json`.

That is an **evidence hypothesis only**. It does not establish that Prisma is the first authorized 002B package, does not classify all three files for import, does not prove that this closure is sufficient for executable characterization, and does not authorize any of those paths.

The evidence matters to M1 for one reason: it demonstrates that actual workspace membership can be derived later from an exact selected package/configuration dependency rather than guessed now from upstream directory-wide globs.

## Transformation/provenance result

Because M1 produces no destination manifest bytes, there is no current destination transformation to classify.

`M1_DESTINATION_TRANSFORMATION = NOT_APPLICABLE_NO_CANDIDATE_BYTES`

If a later planning unit establishes a real root-manifest necessity and designs destination bytes by reference to pinned upstream semantics, that future candidate must separately classify its transformation using the canonical Specification 001 taxonomy and preserve derivation-sensitive license/provenance obligations.

Canonical `copyright_holder` handling remains unchanged:

- the source-import v1 field must be nonempty if a source-import record is eventually created;
- `"unknown"` is the canonical fail-closed value when reliable separate holder evidence is absent;
- no named holder may be inferred from commit authorship, repository access, Enterprise-only notices, or generic product attribution.

No source-import record is created by M1.

## Stage R analysis

A Stage R proposal requires an exact candidate allowlist and destination surface. M1 has established no present root-manifest necessity and intentionally has no destination bytes or digest.

Therefore there is no valid Stage R candidate from this unit.

`M1_STAGE_R_CANDIDATE = NONE`

`M1_STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`M1_SUCCESSOR_IMPORT_AUTHORITY = ABSENT`

No root manifest may be created under this result.

## 002A completion analysis

M1 does **not** declare broader 002A complete.

Canonical Stage A exists to provide the minimum repository/workspace baseline needed for later characterized community grains. Current evidence proves that a root manifest is premature **now**, but it also shows that later package characterization may expose exact shared-workspace prerequisites.

Therefore the correct dependency order is:

1. do not create a speculative root manifest;
2. perform planning/evidence-only successor dependency discovery for the first bounded database/domain baseline candidate;
3. identify the exact workspace/package/configuration paths genuinely required for that candidate;
4. return any proven root-workspace requirement to a separately reviewed 002A qualification/authorization unit before source import;
5. close broader 002A only when all repository/workspace prerequisites actually needed by the selected first community subsystem are canonically known and satisfied.

This preserves the plan requirement that 002B implementation depends on canonical 002A. It does not authorize 002B implementation before that dependency is satisfied.

## Next proposed planning dependency

The next defensible planning/evidence-only activity is:

`002A3 — first 002B dependency discovery for repository/workspace prerequisites`

Purpose:

- identify one bounded candidate for the first database/domain baseline characterization from the pinned upstream snapshot;
- identify only its exact repository/workspace prerequisites;
- determine whether the observed Prisma/shared-tsconfig chain is actually required;
- produce no upstream-derived bytes and no source-import records;
- grant no 002B implementation authority.

If that discovery proves a concrete workspace member is required, a later exact qualification can derive least-authority root workspace membership from that named path instead of from `apps/*` or `packages/*`.

This proposed successor name is planning terminology only until M1 itself becomes canonical after independent review, guarded merge, and post-merge verification.

## Exact exclusions

M1 does not authorize or create:

- root `package.json`;
- reduced/adapted root manifest bytes;
- root package identity or version;
- root workspace membership values;
- root package-manager declaration;
- root Node/npm engine declarations;
- `package-lock.json`;
- `turbo.json`;
- `packages/tsconfig/**`;
- `packages/prisma/**`;
- any `apps/**` or other `packages/**` path;
- `packages/ee/**`;
- dependencies or package-network access;
- lifecycle scripts;
- source-import records;
- NOTICE changes;
- 002B implementation;
- Specification 003 implementation;
- runtime/provider/credential/deployment activity;
- relicensing, rebranding, or product redesign.

## Qualification result candidate

`M1_CURRENT_ROOT_MANIFEST_NECESSITY = NOT_ESTABLISHED`

`M1_CURRENT_AUTHORIZED_WORKSPACE_MEMBERSHIP = EMPTY`

`M1_PRIVATE_ROOT_MARKER_NECESSITY = NOT_ESTABLISHED`

`M1_WORKSPACE_MEMBERSHIP_NECESSITY = NOT_ESTABLISHED`

`M1_PACKAGE_MANAGER_DECLARATION_NECESSITY = NOT_ESTABLISHED`

`M1_ENGINE_DECLARATIONS_NECESSITY = NOT_ESTABLISHED`

`M1_DESTINATION_MANIFEST_BYTES = NONE`

`M1_DESTINATION_TRANSFORMATION = NOT_APPLICABLE_NO_CANDIDATE_BYTES`

`M1_STAGE_R_CANDIDATE = NONE`

`M1_STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`M1_SUCCESSOR_IMPORT_AUTHORITY = ABSENT`

`BROADER_002A_STATUS = OPEN_PENDING_REAL_WORKSPACE_DEPENDENCY_DISCOVERY`

`NEXT_PROPOSED_PLANNING_UNIT = 002A3_FIRST_002B_DEPENDENCY_DISCOVERY_FOR_REPOSITORY_WORKSPACE_PREREQUISITES`

## Exact-head qualification requirements

Before this result may become canonical, the M1 PR must prove on its exact final head:

- canonical base remains the expected predecessor unless explicitly reconciled;
- complete repository change surface is limited to this Signthos-authored qualification document;
- upstream-derived bytes committed: `0`;
- source-import records created: `0`;
- exact-head GitHub Actions/check accounting is accurate, including `NO_APPLICABLE_RUN` rather than PASS when applicable;
- fresh independent substantive review evaluates the necessity reasoning, future dependency evidence, no-Stage-R conclusion, and authority boundary;
- every material finding is reconciled and independently re-evaluated;
- unresolved material review threads are zero;
- base/head are unchanged at final pre-merge race check;
- merge uses exact `expected_head_sha` protection;
- post-merge verification re-reads canonical governance before opening any successor planning unit.

If and only if those requirements are satisfied, M1 establishes that no root manifest is currently justified and authorizes only the next planning/evidence dependency-discovery step described above.