# Specification 002C — First Auth Contract Rights and Dependency Resolution

Status: `RESOLUTION_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / FAIL_CLOSED`
Issue: #5
Canonical base: `d67811645285c8435be20aa25bc1b941b9374c75`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Resolve the exact planning/evidence-only successor authorized after canonical PR #77 for the first 002C auth contract candidate.

This artifact exhausts the currently available immutable first-party public rights evidence relevant to the selected source boundary, determines the minimum faithful source dependency closure, records the current Signthos workspace/dependency prerequisite, and selects the smallest dependency-ordered planning successor that can proceed without inflating source-import authority.

It is Signthos-authored analysis only. It copies or adapts zero upstream source bytes, creates or modifies zero source-import records, installs zero dependencies, and executes no authentication, WebAuthn, database, network, provider, credential, package-manager, build, or runtime behavior.

This is engineering provenance classification and repository governance, not legal advice.

## Canonical predecessor and authority boundary

Canonical PR #77 established the first bounded 002C path qualification for exact pinned `packages/lib/types/document-auth.ts` and recorded:

- exact source candidate: blob `e45f578a4c1b1917e9d0a7b25e320436eb691572`, size `6463` bytes;
- exact required local dependency evidence: `packages/lib/types/webauthn.ts`, blob `af409ec89e1c94d1b89f2ffe579e9e05afe0c8a7`, size `1392` bytes;
- external dependency signal: `zod`;
- unresolved exact-path public rights evidence: repository/Community AGPL-3.0 signals versus package-manifest MIT metadata;
- no inheritance of the private permission artifact previously qualified for exact 002B Prisma COPY_EXACT distribution;
- empty Stage R import allowlist;
- absent source-import authority;
- absent 002C implementation authority.

Issue #5 post-merge evidence for PR #77 authorizes only the next planning/evidence-only 002C rights/dependency-resolution unit from immutable first-party public evidence/history and dependency closure. It does not authorize upstream outreach, source import, Stage R, dependency installation, runtime execution, EE paths, later-grain implementation, Specification 003, or a new `S2-T042` identity.

## Exact source boundary carried forward

Primary candidate:

- repository: `documenso/documenso`;
- commit: `2cac63a000e22422bdea449f68b8025e709aa73a`;
- path: `packages/lib/types/document-auth.ts`;
- Git blob: `e45f578a4c1b1917e9d0a7b25e320436eb691572`;
- size: `6463` bytes;
- previously proposed transformation if later separately authorized: `COPY_EXACT`.

Required local dependency evidence:

- path: `packages/lib/types/webauthn.ts`;
- Git blob: `af409ec89e1c94d1b89f2ffe579e9e05afe0c8a7`;
- size: `1392` bytes.

Pinned package metadata:

- path: `packages/lib/package.json`;
- Git blob: `84bcb86b992085f9ae87d85f896691196ce8f93c`;
- size: `2215` bytes;
- package: `@documenso/lib`;
- package metadata license field: `MIT`;
- pinned dependency entry: `zod` at `^3.25.76`.

No source digest, import record, destination byte, or Stage R allowlist entry is created here.

## Immutable first-party public rights evidence — pinned snapshot

The pinned snapshot contains materially different first-party signals that remain relevant to exact-path classification:

1. root repository `LICENSE` contains GNU Affero General Public License version 3 text;
2. pinned root `README.md` presents the repository license as AGPLv3;
3. pinned first-party `apps/docs/content/docs/policies/licenses.mdx` describes Community Edition as AGPL-3.0 and Enterprise Edition as commercially licensed;
4. the same first-party policy document states that contributions to the main Documenso repository are licensed under AGPL-3.0;
5. pinned `packages/lib/package.json` declares package metadata `license = MIT`;
6. pinned `packages/lib/` has no package-local `LICENSE` artifact;
7. the pinned package manifest's `files` metadata names `client-only/`, `server-only/`, and `universal/`, but not `types/`;
8. neither selected `types/**` source file carries a file-local SPDX, license, or copyright statement at its beginning.

The package `files` metadata is treated only as package-publication metadata. Its omission of `types/` is not converted into a license conclusion. It does, however, mean the manifest does not itself provide an explicit statement that its package-publication surface and its license-field scope are identical to every tracked `packages/lib/**` path.

## Historical package-license evidence

Immutable upstream history was inspected because PR #77 explicitly permits first-party history analysis.

### Initial package state

At upstream commit `579e1333b399fc241ac683fa7852840dc0658c27` (`project structure`, 2023-01-09), `packages/lib/package.json` existed with `private = true` and no `license` field.

This establishes only that the earliest inspected package state did not itself supply the later MIT metadata. It does not classify later source.

### Pre-MIT package state

At upstream commit `d7bd8fcd3706139109106e3ad52804854e3c3ffe`, the same manifest declared:

`license = SEE LICENSE IN LICENSE`

A direct lookup of `packages/lib/LICENSE` at that exact commit returns no such repository path.

This historical state therefore does not provide a package-local license artifact that can resolve the selected path.

### Exact transition to MIT metadata

Upstream commit `7f5ef8690b20940be2b485f9d8d74d45c8b243f6` (`fix: further stash conflicts`, 2023-11-06) changes exactly the package manifest license value from `SEE LICENSE IN LICENSE` to `MIT` in the fetched commit diff.

The commit message does not state a path-scope rule, explain the relationship between the package field and repository-level licensing, or classify the later `types/document-auth.ts` and `types/webauthn.ts` paths. Subsequent package-manifest history preserves the MIT field through the pinned snapshot.

This is meaningful first-party evidence that the package metadata was intentionally changed to `MIT`. It is not sufficient, by itself, to prove the exact legal/license scope of every later tracked `packages/lib/**` path in the presence of the pinned repository/Community AGPL statements and absent file-local or package-local license text.

## Public-rights resolution result

The newly inspected historical evidence strengthens the package-level MIT signal but does not eliminate the material conflict already recorded by PR #77.

This resolution therefore must not:

- select MIT solely from package metadata;
- select AGPL-3.0 solely from broader repository/Community statements;
- synthesize a dual-license expression;
- infer a copyright holder;
- treat `SEE LICENSE IN LICENSE` as a missing historical license text that may be guessed;
- treat the absence of `types/` from npm `files` metadata as a license exclusion;
- generalize the exact 002B private permission artifact to 002C.

Canonical candidate result:

`002C_PUBLIC_RIGHTS_EVIDENCE_STATUS = IMMUTABLE_FIRST_PARTY_PUBLIC_HISTORY_EXHAUSTED_CONFLICT_UNRESOLVED`

`002C_DOCUMENT_AUTH_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`

`002C_WEBAUTHN_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_WITHIN_SAME_LIB_PACKAGE_BOUNDARY`

`002C_DOCUMENT_AUTH_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`

`002C_WEBAUTHN_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`

`002C_PRIVATE_PERMISSION_INHERITANCE_FROM_002B = PROHIBITED`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002C_IMPLEMENTATION_AUTHORITY = ABSENT`

A future rights re-entry may rely only on newly qualified exact evidence or a separately preserved permission basis whose scopes cover the proposed exact paths/actions. This document does not authorize contacting an upstream party.

## Minimum faithful source dependency closure

Static inspection of the pinned candidate establishes that `document-auth.ts` directly depends on:

- external package `zod`; and
- local `./webauthn` for the authentication-response schema used by the passkey contract.

Static inspection of pinned `webauthn.ts` establishes that it also directly depends on `zod`.

For the already proposed future `COPY_EXACT` transformation, `document-auth.ts` therefore cannot be treated as a self-contained exact source candidate. Omitting the local WebAuthn contract would leave the copied module's direct source dependency unresolved and would not preserve its exact source semantics.

Candidate minimum source closure:

`002C_DOCUMENT_AUTH_MINIMUM_SOURCE_CLOSURE = packages/lib/types/document-auth.ts + packages/lib/types/webauthn.ts`

This is a dependency classification only. It does not create an import allowlist and does not grant rights for either path.

## Independently authored substitute decision

PR #77 allowed this unit to determine whether the required local WebAuthn dependency must become a jointly qualified source candidate or whether a smaller independently authored contract can preserve the required semantics.

For baseline import, no independently authored replacement is selected here.

Reason:

- the current candidate transformation is `COPY_EXACT`;
- the canonical Stage C plan requires inherited auth behavior to be characterized without redesigning auth while importing it;
- replacing a direct imported schema dependency with newly authored product source would be a transformation decision, not an exact baseline copy;
- independently authored characterization tests/evidence remain preferred where they can observe the imported contract without copying upstream tests, but test authorship is distinct from replacing product-source dependencies.

Candidate result:

`002C_SMALLER_INDEPENDENT_SOURCE_SUBSTITUTE = NOT_SELECTED_FOR_BASELINE_IMPORT`

A future clean-room or newly authored auth contract may be a valid Signthos design direction only under separate later transformation authority after the inherited baseline question is closed. It must not be represented as the exact inherited baseline.

## Current Signthos workspace/dependency truth

Canonical Signthos `main` at this resolution base contains:

- root `.npmrc` from closed 002A1;
- no root `package.json`;
- no canonical JavaScript/TypeScript workspace manifest establishing a `zod` dependency;
- `packages/` containing only the already canonicalized `packages/prisma/` surface;
- no `packages/lib/` executable/auth source surface.

Search of canonical Signthos source finds `zod` references only in provenance/qualification descriptions and static Prisma annotations, not in an executable package dependency contract.

Therefore even if exact source rights were later established, the current repository does not yet have the minimum JavaScript/TypeScript package/dependency surface needed to execute or typecheck this 002C source closure faithfully.

Candidate result:

`002C_ZOD_EXECUTION_CLOSURE = ABSENT`

`002C_JS_WORKSPACE_EXECUTION_CLOSURE = ABSENT`

`002C_WORKSPACE_DEPENDENCY_PREREQUISITE = SEPARATE_PLANNING_QUALIFICATION_REQUIRED`

This result does not establish that an upstream root manifest should be copied. Canonical 002A2/M1 already rejected speculative root-manifest import without demonstrated necessity. The newly demonstrated 002C dependency requirement creates a concrete planning question, not automatic source or manifest authority.

## Dependency-order decision

Two independent blockers now exist before any 002C Stage R decision could become eligible:

1. exact rights basis for both required source paths remains unresolved; and
2. minimum Signthos workspace/dependency execution closure for `zod` is absent.

The rights blocker cannot be solved from the currently exhausted immutable public evidence without new exact evidence or a separately qualified permission basis.

The workspace/dependency blocker can still be investigated without importing source, installing dependencies, contacting upstream, or executing runtime behavior.

Accordingly, the smallest productive successor candidate is a planning/evidence-only minimum 002C workspace/dependency closure qualification. It must determine the narrowest repository/workspace contract required to support the exact two-file candidate and `zod` without reviving the previously rejected overbroad root-manifest copy.

This successor remains parallel to, and cannot bypass, the exact rights re-entry requirement.

Candidate result:

`NEXT_AUTHORIZED_UNIT_IF_CANONICAL = PLANNING_ONLY_002C_MINIMUM_WORKSPACE_DEPENDENCY_CLOSURE_QUALIFICATION`

`002C_RIGHTS_REENTRY_REQUIRED_BEFORE_STAGE_R = YES`

`002C_STAGE_R_AUTHORITY = ABSENT`

## Bounds for the next planning-only unit

If and only if this resolution becomes canonical through independent exact-head review, accurate check accounting, zero unresolved material review threads, guarded expected-head merge, and post-merge verification, the next planning-only unit may:

- inspect the current Signthos workspace/package state;
- inspect immutable pinned upstream package/workspace metadata as evidence only;
- determine whether a minimal Signthos-authored package/workspace contract can support the selected 002C source closure;
- determine the exact minimum `zod` dependency declaration/lockfile implications that would later be required for reproducible characterization;
- determine whether any already canonical 002A surface can be reused without modification;
- propose a future bounded change surface and tests without implementing them;
- keep exact source rights as an independent unsatisfied gate.

It may not:

- copy/adapt `document-auth.ts` or `webauthn.ts`;
- import any other upstream source, manifest, lockfile, configuration, generated output, or test;
- create or modify source-import records;
- select MIT, AGPL-3.0, dual licensing, or another SPDX expression for the selected paths;
- claim new private permission;
- contact upstream;
- add a root or package `package.json`;
- add or change a lockfile;
- install `zod` or any package;
- run npm/pnpm/yarn/bun package resolution or network access;
- execute TypeScript, Zod, WebAuthn, auth, database, provider, or credential behavior;
- create Stage R or implementation authority;
- enter `packages/ee/**`;
- start 002D–002H implementation;
- start Specification 003;
- invent `S2-T042`.

## Explicit non-grants of this resolution

This document itself grants none of the following:

- source-import authority;
- source-import record creation;
- destination `packages/lib/**` creation;
- package/workspace implementation;
- dependency installation;
- dependency-network access;
- runtime characterization;
- Stage R;
- license selection;
- permission expansion;
- NOTICE mutation;
- EE rights or implementation;
- 002D–002H implementation;
- Specification 003 authority;
- a new `S2-T042` identity.

## Exact-head qualification requirements

Before merge require:

1. the final PR diff remains limited to this one Signthos-authored resolution artifact;
2. upstream-derived bytes committed remain `0`;
3. source-import records created/modified remain `0`;
4. no workspace manifest, lockfile, package source, NOTICE, provenance schema/tool, workflow, or runtime surface changes;
5. exact-head GitHub Actions/check accounting is recorded accurately, including `NO_APPLICABLE_RUN` where applicable;
6. neutral, unavailable, skipped, billing-blocked, rate-limited, or summary-only provider results are not counted as PASS;
7. fresh independent substantive review verifies the immutable package-license history, unresolved-rights conclusion, two-file minimum source closure, no-substitute baseline decision, current Signthos workspace truth, and successor bounds;
8. every material finding is reconciled and re-reviewed against the exact amended head if bytes change;
9. unresolved material review threads are zero;
10. exact canonical base/head remain unchanged immediately before merge;
11. repository rulesets/branch requirements are reverified;
12. merge uses exact `expected_head_sha`;
13. post-merge verification proves ordered ancestry, tree equality, signature, one-file change surface, zero upstream-derived bytes, zero source-import records, and the bounded successor frontier.
