# Specification 002A1 — Stage Q Qualification Closeout

Status: `POST_MERGE_VERIFIED / PLANNING_ONLY / IMPORT_BLOCKED`
Issue: #5

## Purpose

Record the canonical post-merge evidence for the first Specification 002 Stage Q qualification packet without changing source-import authority.

This record is Signthos-authored bookkeeping only. It imports zero upstream-derived bytes, creates zero source-import records, changes no runtime/tooling/dependency/workflow/NOTICE surface, and grants no Stage R or implementation authority.

## Canonical lineage

- canonical pre-packet base: `80ae1410b3065768e031eecaffda5b6a216ebd13`
- PR: #39 — `docs(002): qualify 002A1 npm policy seed`
- exact independently reviewed head: `5b6c9c03ac311e4b44a3dda0d02073930bf6517a`
- guarded merge commit: `b83f934a72fec111c27964a45cd79dccc489b4bf`
- merge parent 1: `80ae1410b3065768e031eecaffda5b6a216ebd13`
- merge parent 2: `5b6c9c03ac311e4b44a3dda0d02073930bf6517a`

## Exact merged surface

PR #39 changed exactly:

- `specs/002-documenso-brownfield-baseline/qualification-002a1-npm-policy.md`
- `specs/002-documenso-brownfield-baseline/tasks.md`

No upstream-derived source, test, manifest, lockfile, configuration, asset, schema, patch, fixture, generated file, license copy, source-import record, dependency installation, product/runtime source, credential, paid-service configuration, or Specification 003 implementation entered the merge.

Canonical root `.npmrc` remains absent. Canonical `provenance/imports/` still contains only its contributor `README.md`.

## Independent review evidence

CodeRabbit performed a fresh independent substantive semantic/provenance/security review of exact head `5b6c9c03ac311e4b44a3dda0d02073930bf6517a` and reported no material findings.

The review independently verified, among other things:

- exact two-file base-to-head scope;
- zero source-import records;
- the upstream 65-byte `.npmrc` content is not embedded in the Stage Q documents;
- upstream `.npmrc` Git blob, size and SHA-256 identity;
- the documented npm-policy semantics;
- fail-closed `L002` handling;
- unresolved `L001` treatment without rights inflation;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `packages/ee/** = RESTRICTED / NOT_IMPORT_AUTHORIZED`;
- bounded exclusions of broader workspace artifacts;
- no Stage R, source-import, relicensing, credential, paid-service, or Specification 003 authority.

A subsequent full CodeRabbit review covered the same exact head and both changed files, generated no actionable comments, recorded minimal merge risk, and stated the change was ready to merge. The CodeRabbit commit status then became `success / Review completed`.

Cubic was `neutral / plan-limit` and Qodo was billing-blocked. Those unavailable/non-substantive states are not used as PASS evidence.

There were zero review threads.

## Exact-head qualification

Immediately before merge:

- PR #39: open, non-draft and mergeable;
- expected base: `80ae1410b3065768e031eecaffda5b6a216ebd13`;
- expected head: `5b6c9c03ac311e4b44a3dda0d02073930bf6517a`;
- changed-file count: 2;
- CodeRabbit: `success / Review completed` on exact head;
- GitHub Actions workflow runs: `NO_APPLICABLE_RUN`;
- unresolved review threads: 0;
- branch protection required checks: none;
- repository rulesets: none.

## Guarded merge

PR #39 was merged using the repository's normal merge-commit method with:

`expected_head_sha=5b6c9c03ac311e4b44a3dda0d02073930bf6517a`

GitHub returned:

`b83f934a72fec111c27964a45cd79dccc489b4bf`

## Post-merge verification

Live post-merge truth establishes:

- canonical `main = b83f934a72fec111c27964a45cd79dccc489b4bf`;
- ordered merge parents exactly match the canonical base and reviewed head above;
- merged surface is exactly the two Stage Q documents;
- merge-commit check runs: `NO_APPLICABLE_RUN`;
- merge-commit GitHub Actions workflow runs: `NO_APPLICABLE_RUN`;
- canonical root `.npmrc`: absent;
- canonical `provenance/imports/`: only `README.md`;
- Issue #5 remains open and `PLANNING_ONLY`;
- Constitution remains CANONICAL and continues to require provenance-before-import, fail-closed ambiguity, Diffciplane reconciliation, and no authority inflation;
- `AGENTS.md` retains the same exact-source/license/permission/authorization requirements and canonical ledger reconciliation rule;
- `ROADMAP.md` still defines dependency order without granting implementation authority by specification number.

## Stage Q result

The evidence required by `S2-T030` and `S2-T031` now exists.

The first qualified candidate remains:

`002A1 — npm project-resolution policy seed`

However:

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

and:

`.npmrc = BLOCKED_PENDING_L002`

because canonical Signthos policy still requires an unambiguous Documenso community SPDX expression and `L002` is unresolved.

`IMPORT_IMPLEMENTATION_AUTHORITY = ABSENT`.

## Successor boundary

The next dependency is not source import and is not Stage R authorization while the eligible allowlist is empty.

The next bounded planning/evidence work is resolution of `S2-B008 / L002` for the exact 002A1 community candidate using first-party immutable evidence, while preserving fail-closed treatment if the evidence is insufficient.

Any L002 resolution must be a separate reviewable evidence unit. It must not import upstream bytes, create a source-import record, authorize `packages/ee/**`, infer a founder permission artifact, or itself satisfy `S2-T032`/`S2-T033`.

If L002 cannot be resolved from reviewable evidence, 002A1 remains blocked and the repository must record that blocker rather than guess.
