# Specification 002B — Private Permission Re-entry Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_EVIDENCE_ONLY / ZERO_UPSTREAM_BYTES / PRIVATE_PERMISSION_REENTRY`
Issue: #5
Canonical base: `53111e0e207d61ef30f52771587e60bc1f0b8558`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Exact candidate path: `packages/prisma/schema.prisma`
Exact upstream blob: `13768e34f62331474fce63b1ca67f8d5ead44854`
Exact upstream size: `38099`

## Purpose

Re-enter the Specification 002B qualification path after the project owner confirmed possession of a private first-party Documenso rights/permission artifact applicable to Signthos.

This is a planning/evidence-only qualification unit. It commits zero upstream-derived bytes, creates zero source-import records, runs no Prisma/database/runtime/provider behavior, and grants no Stage R or source-import authority by itself.

The confidential permission source is intentionally not published. Canonical Specification 001 policy permits a stable non-secret permission-artifact reference plus a public scope summary while the confidential original remains in an appropriate private records system.

## Canonical predecessor and re-entry authority

Canonical PR #61 established the execution frontier:

`SPEC_002_EXECUTION_FRONTIER = BLOCKED_PENDING_FIRST_PARTY_PRISMA_SCHEMA_RIGHTS_CLARIFICATION`

and its re-entry rule permits a later repository unit after a genuinely available first-party rights/permission artifact or authoritative first-party clarification is preserved and is sufficiently specific to evaluate the exact intended action for the pinned path.

The user has now affirmatively confirmed that the required private permission exists and instructed the project to record that permission correctly and continue through the canonical process.

This confirmation is treated as evidence intake for the private artifact, not as ordinary founder approval and not as permission invented by repository ownership.

## Private permission artifact reference

Stable public reference:

`permission-artifact:documenso-signthos-private-v1`

Confidential source:

`PRESERVED_OUTSIDE_PUBLIC_REPOSITORY`

Public scope asserted for this exact qualification:

- upstream repository: `documenso/documenso`;
- exact pinned revision: `2cac63a000e22422bdea449f68b8025e709aa73a`;
- exact path under current evaluation: `packages/prisma/schema.prisma`;
- intended current source transformation: `COPY_EXACT` / `copied`;
- rights relied upon for current and directly derivative Signthos treatment: `copy`, `modify`, `create_derivative`, `redistribute`, `publish_source`;
- no `relicense`, `sublicense`, or `commercial_use` right is inferred by this qualification beyond any separately preserved private terms;
- no `packages/ee/**` right or authorization is created by this artifact reference.

This public record deliberately does not reproduce confidential correspondence, contractual text, identities not already public, credentials, or private legal records.

## Existing public license evidence remains materially inconsistent

The private permission does not erase or rewrite the already-canonical public evidence:

1. first-party Documenso Community licensing policy describes Community Edition under AGPL-3.0;
2. exact pinned `packages/prisma/package.json` identifies `@documenso/prisma` and declares `"license": "MIT"`;
3. exact pinned `packages/prisma/schema.prisma` has no file-local SPDX/license/copyright notice at its beginning;
4. the exact pinned `packages/prisma/` directory has no package-local `LICENSE` artifact;
5. prior canonical PRs #56 and #58 therefore correctly recorded a public-evidence ambiguity rather than selecting a convenient expression.

No prior canonical result is retroactively rewritten.

## What the private permission resolves

The new artifact supplies an independent rights basis for the declared actions even though the public AGPL/MIT signals remain ambiguous.

Candidate rights result for independent substantive review:

`002B_PRISMA_SCHEMA_PERMISSION_ARTIFACT = permission-artifact:documenso-signthos-private-v1`

`002B_PRISMA_SCHEMA_PERMISSION_SCOPE = copy,modify,create_derivative,redistribute,publish_source`

`002B_PRISMA_SCHEMA_SEPARATE_RIGHTS_BASIS = ESTABLISHED_FOR_DECLARED_SCOPE`

This result means Signthos no longer needs to infer the existence of copying/modification/redistribution/open-source-publication rights solely from the conflicting public license signals for this exact path.

It does **not** mean that Signthos may mechanically relicense upstream bytes, claim sublicensing authority, claim commercial-use terms beyond the private artifact, or import any path outside a later exact canonical allowlist.

## SPDX and license-record treatment

Specification 001 still requires an unambiguous SPDX expression in any eventual source-import record. A private permission artifact is not itself an SPDX expression and must not be represented as `LicenseRef-*` merely to force validator acceptance.

The most specific public SPDX-compatible metadata for the selected package is the exact first-party `@documenso/prisma` package manifest declaration:

`MIT`

The broader first-party Community policy remains AGPL-3.0. The private permission removes uncertainty about whether Signthos has the declared reuse rights, but it does not by itself prove that the upstream author intended the package manifest's `MIT` field to be the exclusive file-level license of `schema.prisma`.

Therefore this qualification deliberately separates two questions:

- rights basis for the intended Signthos action: supplied by the private permission artifact;
- SPDX metadata to record for the imported upstream file: still requires a reviewed canonical treatment.

Candidate SPDX treatment submitted for independent review:

`002B_PRISMA_SCHEMA_IMPORT_LICENSE_METADATA_CANDIDATE = MIT`

Rationale: `MIT` is the exact, first-party, package-specific SPDX declaration for `@documenso/prisma`; the separate permission artifact supplies the actual independently preserved rights basis relied upon by Signthos, so choosing the package-specific SPDX metadata does not need to serve as the sole legal permission basis.

This is a qualification candidate, not a final canonical license classification. If independent substantive review finds that v1 provenance semantics cannot safely record `MIT` while the broader AGPL signal remains unresolved, this candidate must fail closed and be amended rather than bypassed.

## Candidate provenance treatment if this qualification succeeds

A future source-import record for this exact path would use:

- `classification = separate_permission_required`;
- `upstream.repository = documenso/documenso`;
- `upstream.commit = 2cac63a000e22422bdea449f68b8025e709aa73a`;
- `upstream.path = packages/prisma/schema.prisma`;
- `upstream.copyright_holder = unknown` unless later non-invented evidence establishes a value;
- `license.spdx = MIT` only if this exact candidate treatment is independently accepted and canonicalized;
- `license.evidence` referencing the exact pinned package manifest plus this qualification evidence;
- `permission.artifact = permission-artifact:documenso-signthos-private-v1`;
- permission scope containing the complete scopes required for the actual authorized transformation/distribution;
- `import.destination = packages/prisma/schema.prisma`;
- `transformation.kind = copied` for an exact-copy baseline import;
- `review.status = pending` until imported-byte review exists, then the normal bounded manifest-only qualification delta and exact-head re-evaluation flow.

No source-import record is created by this qualification.

## Stage R readiness candidate

If and only if independent substantive review accepts both the private-rights treatment and the proposed SPDX metadata treatment, this qualification may establish a later Stage R candidate limited to:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:packages/prisma/schema.prisma -> packages/prisma/schema.prisma`

with `COPY_EXACT` only.

Even then:

- `STAGE_R_AUTHORITY = ABSENT` until a separate canonical Stage R authorization is reviewed, merged, and post-merge verified;
- `SOURCE_IMPORT_AUTHORITY = ABSENT` in this qualification PR;
- executable Prisma behavior remains separately dependency-qualified;
- root manifests, lockfiles, package manifests, migrations, seeds, generated clients, TypeScript source, and every other `packages/prisma/**` path remain outside the allowlist;
- all `packages/ee/**` paths remain outside the allowlist;
- Specification 003 remains unauthorized until Specification 002 dependency ordering permits it.

## Independent review objective

The reviewer must adversarially determine whether:

1. canonical PR #61 genuinely permits re-entry after a private first-party permission artifact becomes available;
2. the public artifact reference complies with Specification 001 confidentiality and reference rules;
3. the asserted scope is bounded to the intended actions and does not invent relicensing, sublicensing, commercial-use, EE, or broader-repository rights;
4. separating private permission as the rights basis from public SPDX metadata is consistent with Specification 001;
5. `MIT` is a defensible source-import metadata candidate because it is the exact first-party package-specific SPDX declaration, or whether the still-conflicting broader AGPL signal makes that treatment materially unsafe;
6. no upstream-derived bytes or source-import records are committed;
7. no Stage R or source-import authority is silently created;
8. no downstream 002C–002H or Specification 003 authority is inflated.

Any material uncertainty on item 4 or 5 must fail closed and be reconciled before merge.

## Exact exclusions

This qualification does not authorize or perform:

- source import;
- a source-import record;
- Stage R;
- Prisma generation, migration, seed, database, dependency installation, runtime, network, provider, credential, or deployment activity;
- any other `packages/prisma/**` path;
- any `packages/ee/**` path;
- relicensing;
- sublicensing;
- Specification 003 implementation;
- Specification 002 closeout;
- a new `S2-Txxx` task identity.

## Qualification gate

Before this candidate may become canonical it requires:

1. exact-head workflow/check accounting;
2. fresh independent substantive exact-head review of this complete document and its evidence basis;
3. reconciliation of every material finding;
4. zero unresolved material review threads;
5. unchanged canonical base and candidate head before merge;
6. guarded merge with exact `expected_head_sha` where supported;
7. post-merge verification;
8. fresh successor-authority analysis from the newly canonical `main`.

Until all gates complete:

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002B_IMPLEMENTATION_AUTHORITY = ABSENT`
