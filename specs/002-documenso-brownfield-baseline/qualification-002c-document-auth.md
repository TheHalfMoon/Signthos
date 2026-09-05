# Specification 002C — Document Authentication Contract Path Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / FAIL_CLOSED`
Issue: #5
Canonical base: `94de7b1ef5a4667ba4d5236a473417db7640d200`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Pinned upstream tree: `f97ae86f4c82501617aec8d0551f52e03c29feae`

## Purpose

Perform the first bounded planning/qualification-only 002C auth/session/policy path qualification after canonical 002B closeout.

This artifact selects one exact auth-policy source candidate from the pinned Documenso snapshot, records its exact static dependency and rights evidence, and determines whether any Stage R candidate exists. It is Signthos-authored analysis only: it commits zero upstream-derived bytes, creates zero source-import records, installs no dependency, and executes no auth, WebAuthn, database, network, provider, credential, or runtime behavior.

This is engineering provenance classification and repository governance, not legal advice.

## Canonical predecessor and authority boundary

Canonical PR #76 established:

- canonical closeout merge: `94de7b1ef5a4667ba4d5236a473417db7640d200`;
- `002B = CLOSED_CANONICAL` after guarded merge and post-merge verification;
- Specification 002 remains open;
- the next dependency-ordered activity may be planning/qualification-only 002C successor discovery/qualification;
- no 002C source-import, Stage R, or implementation authority is inherited from 002B closeout;
- no `S2-T042` identity exists or is created by that closeout.

The canonical plan defines 002C as the auth/session/policy grain after required 002A/002B contracts, with separate qualification and authorization required before implementation.

## Selected exact candidate

Primary candidate:

- repository: `documenso/documenso`;
- commit: `2cac63a000e22422bdea449f68b8025e709aa73a`;
- path: `packages/lib/types/document-auth.ts`;
- Git blob: `e45f578a4c1b1917e9d0a7b25e320436eb691572`;
- size: `6463` bytes;
- candidate destination, only if a later separately authorized Stage R event exists: `packages/lib/types/document-auth.ts`;
- candidate transformation, only if later authorized: `COPY_EXACT`.

No SHA-256 is invented by this planning-only qualification. A later pre-import unit, if rights and dependency closure become eligible, must derive and bind an exact source digest independently before Stage R can become effective.

## Why this path belongs to 002C

Canonical PR #60 previously inspected this exact pinned path while searching for a 002B alternative and rejected it as the wrong grain because its semantics are authentication/access/action behavior. That earlier rejection is now useful dependency evidence: after 002B has closed, this path is correctly positioned in 002C rather than being promoted merely to bypass a blocked predecessor.

Static inspection of the exact candidate shows auth contract vocabulary for:

- `ACCOUNT`;
- `PASSKEY`;
- `TWO_FACTOR_AUTH`;
- `PASSWORD`;
- `EXPLICIT_NONE`;
- document access authentication;
- document action authentication;
- recipient access authentication;
- recipient action authentication;
- preprocessing/default handling for document and recipient auth option arrays;
- compatibility conversion from a historical singular auth value to an array.

This qualification does not claim that this one path completes 002C. It is the first recursively bounded candidate in the auth/session/policy grain.

## Direct static dependency evidence

The candidate imports exactly:

1. external package `zod`;
2. local module `./webauthn` for `ZAuthenticationResponseJSONSchema`.

Pinned local dependency identity:

- path: `packages/lib/types/webauthn.ts`;
- Git blob: `af409ec89e1c94d1b89f2ffe579e9e05afe0c8a7`;
- size: `1392` bytes.

Static inspection of `webauthn.ts` shows that it itself imports `zod` and defines authentication/registration response schemas. It has no file-local SPDX, license, or copyright header at its beginning.

The direct dependency therefore establishes two separate future prerequisites if executable or import-ready auth behavior is ever proposed:

- the exact local `webauthn.ts` source path must be separately rights/provenance-qualified before it can enter an import allowlist;
- external dependency/runtime use of `zod` must be separately justified under the repository/workspace/dependency controls before executable characterization.

For the current planning-only static characterization, neither dependency installation nor runtime execution is required.

`002C_WEBAUTHN_DEPENDENCY_STATUS = EXACT_STATIC_DEPENDENCY_EVIDENCE_ONLY_NOT_IMPORT_AUTHORIZED`

`002C_ZOD_EXECUTION_DEPENDENCY_STATUS = OBSERVED_NOT_AUTHORIZED`

## Product entitlement signal is not a license signal

The exact `document-auth.ts` source contains a description saying that one document action-auth field is restricted to Enterprise plan users.

This qualification treats that text only as a product entitlement/policy signal. The selected path is under `packages/lib/**`, not `packages/ee/**`. The string does not establish that the source path is Enterprise-licensed, does not move it into the `packages/ee/**` boundary, and does not establish Community rights either.

`002C_DOCUMENT_AUTH_ENTERPRISE_PLAN_STRING = PRODUCT_POLICY_SIGNAL_ONLY`

## Pinned package-level rights evidence

Pinned `packages/lib/package.json`:

- Git blob: `84bcb86b992085f9ae87d85f896691196ce8f93c`;
- size: `2215` bytes;
- package name: `@documenso/lib`;
- package metadata: `"license": "MIT"`.

The pinned `packages/lib/` directory listing contains no package-local `LICENSE` artifact. The manifest's `files` list names `client-only/`, `server-only/`, and `universal/`; it does not itself state the license scope of every tracked `types/**` path.

The selected `document-auth.ts` path and its direct local `webauthn.ts` dependency contain no file-local SPDX/license/copyright statement at their beginning.

## Pinned Community/repository rights evidence

The pinned repository root contains the GNU Affero General Public License version 3 text.

Pinned first-party `apps/docs/content/docs/policies/licenses.mdx` describes Documenso Community Edition as AGPL-3.0, Enterprise Edition as commercially licensed, and states that contributions to the main Documenso repository are licensed under AGPL-3.0.

These are materially relevant first-party signals. They do not by themselves explain how the more-specific pinned `@documenso/lib` package-level `MIT` declaration applies to exact `packages/lib/types/document-auth.ts` or `packages/lib/types/webauthn.ts`.

## Exact rights classification

The available pinned first-party evidence is therefore internally conflicting for the selected path:

1. repository/Community evidence supplies AGPL-3.0 signals; while
2. the more-specific `@documenso/lib` package manifest declares `MIT`; and
3. neither selected source file carries a file-local license statement; and
4. no pinned `packages/lib/LICENSE` artifact resolves the package field's exact path scope.

This qualification does not select MIT merely because the package manifest is more specific, and it does not select AGPL merely because the root/community evidence is broader. It also does not infer a copyright holder.

The private permission artifact previously qualified for exact 002B `packages/prisma/schema.prisma` COPY_EXACT distribution is path/action-specific and is not generalized to this 002C candidate or its dependency.

Canonical candidate result:

`002C_DOCUMENT_AUTH_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`

`002C_DOCUMENT_AUTH_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED`

`002C_DOCUMENT_AUTH_COPYRIGHT_HOLDER = UNKNOWN_UNINFERRED`

`002C_WEBAUTHN_LICENSE_CLASSIFICATION = UNRESOLVED_WITHIN_SAME_LIB_PACKAGE_SIGNAL_BOUNDARY`

`002C_PRIVATE_PERMISSION_INHERITANCE_FROM_002B = PROHIBITED`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002C_IMPLEMENTATION_AUTHORITY = ABSENT`

## Static characterization proposal

If rights and dependency closure are later resolved through separate canonical units, the first characterization should remain independently authored and static. It may inventory:

- auth method vocabulary and discriminated-union shapes;
- document versus recipient access/action policy distinctions;
- passkey payload references and token-reference shape;
- password and 2FA input constraints;
- default/preprocess behavior for missing auth options;
- historical singular-to-array compatibility behavior;
- the Enterprise-plan entitlement string strictly as product policy metadata;
- exact denial/invalid-input cases implied by schema constraints.

It must not authenticate a user, validate a real WebAuthn assertion, run a database, generate Prisma code, install dependencies, contact a provider, use credentials, invoke a network service, or make a production authorization decision.

## Explicit non-grants

This qualification does not authorize or create:

- copying/adapting `document-auth.ts`;
- copying/adapting `webauthn.ts`;
- any other `packages/lib/**` path;
- `packages/ee/**`;
- a private-permission claim for these paths;
- selection of MIT, AGPL-3.0, dual licensing, or another SPDX expression for the exact candidate;
- `zod` installation or package-network access;
- WebAuthn execution or credential handling;
- login/session/account/org/membership implementation;
- recipient authorization enforcement;
- source-import or provenance records;
- NOTICE changes;
- Stage R;
- 002C implementation;
- 002D–002H implementation;
- Specification 003 authority;
- a new `S2-T042` or any retroactive task identity.

## Qualification result candidate

`002C_FIRST_AUTH_CONTRACT_CANDIDATE = packages/lib/types/document-auth.ts`

`002C_FIRST_AUTH_CONTRACT_QUALIFICATION = BLOCKED_UNRESOLVED_PATH_RIGHTS_AND_DEPENDENCY_CLOSURE`

`002C_DOCUMENT_AUTH_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`

`002C_WEBAUTHN_DEPENDENCY = REQUIRED_FOR_EXACT_SOURCE_SEMANTICS_BUT_NOT_IMPORT_AUTHORIZED`

`002C_ZOD_DEPENDENCY = OBSERVED_NOT_AUTHORIZED`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002C_IMPLEMENTATION_AUTHORITY = ABSENT`

## Successor boundary if canonical

If and only if this exact qualification receives fresh independent substantive exact-head review, accurate workflow/check accounting, reconciliation of every material finding, zero unresolved material review threads, guarded merge using exact expected-head protection, and post-merge verification, the next bounded dependency is a planning/evidence-only 002C rights/dependency-resolution unit.

That later unit may:

- seek sufficiently specific first-party public evidence already available in immutable repository/history/docs surfaces to determine the exact license scope of `document-auth.ts` and its required `webauthn.ts` dependency;
- determine whether the `webauthn.ts` dependency must become a jointly qualified source candidate or whether a smaller independently authored contract can preserve the required semantics;
- determine the minimum non-executable dependency closure required before any Stage R decision.

It may not contact an upstream party unless separately authorized, import source, create a real source-import record, select a license without sufficient evidence, install `zod`, execute authentication/WebAuthn/runtime behavior, grant Stage R, start 002C implementation, advance later implementation grains, authorize EE, or start Specification 003.

No `S2-T042` identity is created by this qualification.

## Exact-head qualification requirements

Before merge require:

1. the final PR diff remains limited to this one Signthos-authored qualification artifact;
2. upstream-derived bytes committed remain `0`;
3. source-import records created/modified remain `0`;
4. exact-head GitHub Actions/check accounting is recorded accurately, including `NO_APPLICABLE_RUN` where appropriate;
5. neutral, unavailable, skipped, rate-limited, summary-only, or billing-blocked providers are not counted as PASS;
6. fresh independent substantive review verifies pinned identities, grain classification, dependency evidence, rights conflict, Enterprise-plan-string treatment, non-grants, and successor bounds;
7. every material finding is reconciled and re-reviewed on the exact amended head if bytes change;
8. unresolved material review threads are zero;
9. exact canonical base/head remain unchanged immediately before merge;
10. repository rulesets/branch requirements are reverified;
11. merge uses exact `expected_head_sha`;
12. post-merge verification proves ordered ancestry, tree equality, signature, one-file change surface, zero upstream-derived bytes, zero source-import records, and the canonical successor boundary.
