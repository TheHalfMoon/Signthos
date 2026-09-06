# Specification 002 — Rights-Safe Closeout Reconciliation

Status: `CLOSEOUT_CANDIDATE / GOVERNANCE_ONLY / ZERO_NEW_UPSTREAM_BYTES`
Issue: #5
Canonical base: `70021a680d9be149682f592f139c8871a3920b88`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Reconcile the complete current Specification 002 authorized Documenso import surface after the rights-safe authorized-surface amendment became canonical through PR #82.

This closeout determines whether the canonical Specification 002 completion rule is now satisfied without importing source whose exact rights remain fail-closed.

This unit is Signthos-authored governance/bookkeeping only. It imports zero new upstream-derived bytes, creates or modifies zero source-import records, and changes no `NOTICE`, source, package, dependency, configuration, test, workflow, provenance schema/tool, runtime, provider, credential, deployment, restricted, or EE surface.

This closeout does not become effective merely because this candidate file exists. `SPEC_002 = CLOSED_CANONICAL` may become current truth only after this exact closeout unit itself receives fresh independent substantive exact-head review, reconciles every material finding, has zero unresolved material review threads, guarded-merges with exact expected-head protection, and passes post-merge verification.

## Governing completion rule

The canonical Specification 002 specification states:

> Specification 002 is not complete when planning is merged, and planning completion does not authorize import. The specification becomes implementation-active only through a separate canonical authorization satisfying the handoff above, and becomes `CLOSED_CANONICAL` only after every actually authorized/imported grain is proven, reviewed, merged, post-merge verified, and reconciled.

The canonical roadmap defines the objective as an exact tested behavioral baseline for the **authorized Documenso import surface**.

PR #82 canonicalized the current-surface classification model so candidate grains that never receive import authority may be dispositioned outside the active import-completion set without weakening their rights gate.

Therefore this closeout must prove all of the following simultaneously:

1. every actually authorized/imported grain is canonical and reconciled;
2. there are zero `AUTHORIZED_NOT_YET_IMPORTED` grains;
3. there are zero `PLANNING_ONLY_PENDING_QUALIFICATION` grains selected for the current import surface;
4. each `EXCLUDED_RIGHTS_BLOCKED_NO_IMPORT` grain retains complete fail-closed exclusion evidence and zero blocked imported bytes;
5. each `NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE` and `OPTIONAL_NOT_SELECTED` grain has zero imported bytes and zero effective import authority under Specification 002;
6. no historical blocker is rewritten as implementation completion;
7. no unauthorized upstream path is present in the canonical imported surface; and
8. all current distribution/provenance obligations for admitted source imports remain represented canonically.

## Exact closeout base

Canonical Signthos main at closeout preparation:

`70021a680d9be149682f592f139c8871a3920b88`

Canonical main tree at that merge:

`2232ffe00fda213968819ed2c19d24d26ae103c7`

PR #82 exact reviewed head:

`3eaf111d7e47776d9b5d5a93ac05f21f28e64265`

PR #82 independent substantive exact-head review:

`github:issue-comment:5559761349 = NO_MATERIAL_FINDINGS`

PR #82 guarded merge:

`70021a680d9be149682f592f139c8871a3920b88`

PR #82 reviewed-head tree equals merge tree:

`2232ffe00fda213968819ed2c19d24d26ae103c7`

PR #82 merge signature is verified/valid.

PR #82 post-merge verification:

`github:issue-comment:5559781078`

## Canonical current-surface classification

PR #82 established the current Specification 002 import-surface classification:

```text
002A_CURRENT_SURFACE_CLASSIFICATION = AUTHORIZED_AND_IMPORTED
002B_CURRENT_SURFACE_CLASSIFICATION = AUTHORIZED_AND_IMPORTED
002C_CURRENT_SURFACE_CLASSIFICATION = EXCLUDED_RIGHTS_BLOCKED_NO_IMPORT
002D_CURRENT_SURFACE_CLASSIFICATION = NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002E_CURRENT_SURFACE_CLASSIFICATION = NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002F_CURRENT_SURFACE_CLASSIFICATION = NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002G_CURRENT_SURFACE_CLASSIFICATION = NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002H_CURRENT_SURFACE_CLASSIFICATION = OPTIONAL_NOT_SELECTED
```

This closeout does not alter those dispositions. It validates them against the exact canonical repository surface and historical evidence.

## Complete canonical source-import inventory

The canonical `provenance/imports/` directory at the closeout base contains exactly:

1. `README.md` — provenance-format documentation, not a source-import record;
2. `U001-I0001.json`;
3. `U001-I0002.json`.

There is no third canonical source-import record.

Therefore the complete canonical source-import record set is exactly:

```text
CANONICAL_SOURCE_IMPORT_RECORDS = [U001-I0001, U001-I0002]
CANONICAL_SOURCE_IMPORT_RECORD_COUNT = 2
```

## U001-I0001 — 002A1 `.npmrc`

Canonical destination:

`.npmrc`

Current destination Git blob:

`cbc6b6537fba6c69756ad16e69a35cc056791d99`

Pinned upstream source:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:.npmrc`

Source/destination SHA-256 recorded in canonical provenance:

`409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`

Transformation:

`COPY_EXACT` / `copied`

License classification:

`AGPL-3.0-only`

Canonical source-import record:

`provenance/imports/U001-I0001.json`

Record Git blob:

`d670a0e07f4b719176fa9b5fd4903b9e288b3391`

Review state:

`qualified_exact_head`

Implementation PR #46 canonical merge:

`7c10ec2a3d25f73e8cd37e6ff7bf5db41cdaf019`

PR #46 final exact-head Provenance run:

`33878569772 = SUCCESS`

PR #46 post-merge Provenance run:

`33878897083 = SUCCESS`

002A1 closeout PR #47:

- exact closeout head: `9b5f5db4f8bf7826dec1a8567cb6f7cfa58bd7a4`;
- guarded closeout merge: `5218e144ae800d8cd29fa52cbd0086157cb59e54`;
- independent CodeRabbit exact-head review run: `2099bc64-c31d-47e5-b734-ddaebeb2161e`, no actionable comments;
- exact closeout surface: two Signthos governance/bookkeeping files only;
- zero new upstream bytes in the closeout.

Canonical later 002A planning established that the considered root workspace manifest was not currently necessary, and 002A3 established no workspace prerequisite for the selected static Prisma schema characterization.

Current closeout disposition:

```text
002A_CURRENT_SURFACE_CLASSIFICATION = AUTHORIZED_AND_IMPORTED
002A1_LIFECYCLE = CLOSED_CANONICAL
002A_REMAINING_AUTHORIZED_NOT_YET_IMPORTED = 0
```

The required AGPL full-license artifact and deterministic NOTICE treatment remain distribution-support artifacts; they do not expand the source-import record count or authorize another Documenso product path.

## U001-I0002 — 002B Prisma schema

Canonical destination:

`packages/prisma/schema.prisma`

Current destination Git blob:

`13768e34f62331474fce63b1ca67f8d5ead44854`

Pinned upstream source:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:packages/prisma/schema.prisma`

Source/destination SHA-256:

`0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931`

Transformation:

`COPY_EXACT` / `copied`

Canonical source-import record:

`provenance/imports/U001-I0002.json`

Record Git blob:

`9ef347d0ac095b2e50e05a3a851bc30e895c7547`

Review state:

`qualified_exact_head`

Public license classification:

`unresolved_conflict`

Current exact-action rights basis:

`permission-artifact:documenso-signthos-private-v1`

The private-permission provenance record preserves the exact current action without publishing confidential grant text. It does not synthesize an SPDX expression and does not generalize to another path or action.

Implementation PR #73 canonical merge:

`50d2ae1cc95809c8903612631caa9ffa5c0e76d1`

002B closeout PR #76:

- exact reviewed closeout head: `2c414effbfe888adb4fab763705a466dbdb9b6cf`;
- independent exact-head review: `github:issue-comment:5553431652 = NO_MATERIAL_FINDINGS`;
- guarded closeout merge: `94de7b1ef5a4667ba4d5236a473417db7640d200`;
- reviewed-head tree = merge tree: `69df3b819cc752ea48c37e436b6bbc93523388d9`;
- post-merge evidence establishes `002B = CLOSED_CANONICAL`.

PR #83 separately reconciled the remaining temporal candidate-text ambiguity:

- exact reviewed head: `302960ecbef89cd4b4cde6c6e95a1ef549c613ec`;
- independent exact-head CodeRabbit review run: `2ce43854-4a70-447e-899a-f8f4709f7443`, no actionable comments;
- guarded merge: `2bd27e449ee07af4d5359043bbb77a2e6df4a25f`;
- reviewed-head tree = merge tree: `758a375d8ffe90eeab4398ec03e109ea7c697839`;
- post-merge evidence: `github:issue-comment:5559733178`.

Current controlling lifecycle truth:

```text
002B_STATUS = CLOSED_CANONICAL
002B_CURRENT_STATUS_RECONCILED = TRUE
002B_PREMERGE_PENDING_TEXT = HISTORICAL_TEMPORAL_EVIDENCE
002B_RUNTIME_EXECUTION_AUTHORITY = ABSENT
```

Current closeout disposition:

```text
002B_CURRENT_SURFACE_CLASSIFICATION = AUTHORIZED_AND_IMPORTED
002B_REMAINING_AUTHORIZED_NOT_YET_IMPORTED = 0
```

## Deterministic NOTICE and distribution state

Canonical `NOTICE` Git blob at the closeout base:

`90b40a51731c480bcc79ee5a0d7119e6b529ebf2`

Its `Source imports` section contains exactly:

1. `U001-I0001` — `.npmrc` — `AGPL-3.0-only`;
2. `U001-I0002` — `packages/prisma/schema.prisma` — `classification: unresolved_conflict`.

The NOTICE does not synthesize a license for U001-I0002 and does not expose the private permission artifact or confidential permission text.

Current source-import distribution state is therefore reconciled to the exact two-record canonical provenance inventory.

## 002C rights-safe exclusion proof

Selected 002C source candidates remain exactly:

- `packages/lib/types/document-auth.ts`;
- `packages/lib/types/webauthn.ts`.

Canonical rights state remains:

```text
002C_DOCUMENT_AUTH_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT
002C_WEBAUTHN_LICENSE_CLASSIFICATION = CONFLICT_UNRESOLVED_WITHIN_SAME_LIB_PACKAGE_BOUNDARY
002C_DOCUMENT_AUTH_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED
002C_WEBAUTHN_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED
002C_PRIVATE_PERMISSION_INHERITANCE_FROM_002B = PROHIBITED
STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY
002C_SOURCE_IMPORT_AUTHORITY = ABSENT
002C_STAGE_R_AUTHORITY = ABSENT
002C_IMPLEMENTATION_AUTHORITY = ABSENT
```

Canonical repository surface at the closeout base contains no `packages/lib/**` directory. The canonical `packages/` directory contains only `packages/prisma/`.

No canonical source-import record names either selected 002C path.

PR #82 independently reviewed and canonicalized the current-surface disposition:

```text
002C_CURRENT_SURFACE_CLASSIFICATION = EXCLUDED_RIGHTS_BLOCKED_NO_IMPORT
002C_SELECTED_SOURCE_BYTES_IMPORTED = NO
002C_SOURCE_IMPORT_RECORDS_CREATED = 0
002C_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED
002C_STAGE_R_AUTHORITY = ABSENT
002C_IMPLEMENTATION_AUTHORITY = ABSENT
002C_INHERITED_BASELINE_CLAIM = NOT_ESTABLISHED_FOR_EXCLUDED_SOURCE
```

The exclusion does not claim inherited behavior was characterized or reproduced. Any later Signthos-owned authentication/resource-authorization design requires separate owning-specification authority and may not copy the excluded source expression merely because equivalent product capability is needed.

## 002D–002G current-surface proof

PR #82 canonicalized:

```text
002D_CURRENT_SURFACE_CLASSIFICATION = NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002E_CURRENT_SURFACE_CLASSIFICATION = NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002F_CURRENT_SURFACE_CLASSIFICATION = NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002G_CURRENT_SURFACE_CLASSIFICATION = NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002D_002G_SOURCE_IMPORT_AUTHORITY = ABSENT
002D_002G_IMPLEMENTATION_AUTHORITY = ABSENT
```

The exact canonical source-import inventory contains no record for a 002D, 002E, 002F, or 002G path.

The canonical `packages/` surface contains no imported package corresponding to those candidate grains.

No Stage R or implementation authority is inferred from roadmap ordering, PR #82, this closeout, or generic approval.

Current closeout result:

```text
002D_002G_IMPORTED_BYTES_UNDER_SPEC_002 = 0
002D_002G_EFFECTIVE_IMPORT_AUTHORITY = ABSENT
```

## 002H current-surface proof

002H remains a separately permission-dependent optional grain.

PR #82 canonicalized:

```text
002H_CURRENT_SURFACE_CLASSIFICATION = OPTIONAL_NOT_SELECTED
002H_SOURCE_IMPORT_AUTHORITY = ABSENT
```

No `packages/ee/**` path exists in the canonical imported Signthos surface under Specification 002 and no canonical source-import record names an EE path.

Current closeout result:

```text
002H_IMPORTED_BYTES_UNDER_SPEC_002 = 0
002H_EFFECTIVE_IMPORT_AUTHORITY = ABSENT
```

## Unauthorized-path reconciliation

At the closeout base:

- canonical source-import record count is exactly `2`;
- exact source-import destinations are `.npmrc` and `packages/prisma/schema.prisma`;
- canonical `packages/` contains only `packages/prisma/`;
- the selected 002C `packages/lib/types/**` paths are absent;
- 002D–002G have no canonical source-import record and no effective import authority;
- 002H has no canonical source-import record and no effective import authority;
- no `packages/ee/**` path is admitted under Specification 002.

Therefore:

```text
UNAUTHORIZED_UPSTREAM_PATH_PRESENT_IN_SPEC_002_IMPORTED_SURFACE = FALSE
UNRECONCILED_CANONICAL_SOURCE_IMPORT_RECORD = NONE
AUTHORIZED_NOT_YET_IMPORTED_GRAIN_COUNT = 0
PLANNING_ONLY_PENDING_QUALIFICATION_CURRENT_SURFACE_GRAIN_COUNT = 0
```

This result is limited to the current Specification 002 import surface. It is not a repository-wide license claim and does not authorize future source reuse.

## Historical evidence preservation

Historical planning blockers, rights conflicts, candidate statuses, pending-closeout statements, superseded feasibility states, and non-authorizing branches remain valid evidence of what was true when recorded.

This closeout does not rewrite them into claims that implementation occurred.

In particular:

- the historical public rights conflicts remain preserved;
- 002B pre-PR-#76 pending-closeout text remains historical temporal evidence through PR #83;
- 002C remains rights-blocked and excluded, not implemented;
- 002D–002G remain unselected, not implemented;
- 002H remains optional/not selected;
- no historical `S2-Txxx` task identity is rewritten;
- no `S2-T042` is created.

## Completion-rule evaluation

Against the exact canonical closeout base:

```text
EVERY_AUTHORIZED_IMPORTED_GRAIN_PROVEN = TRUE
EVERY_AUTHORIZED_IMPORTED_GRAIN_REVIEWED = TRUE
EVERY_AUTHORIZED_IMPORTED_GRAIN_MERGED = TRUE
EVERY_AUTHORIZED_IMPORTED_GRAIN_POSTMERGE_VERIFIED = TRUE
EVERY_AUTHORIZED_IMPORTED_GRAIN_RECONCILED = TRUE
AUTHORIZED_NOT_YET_IMPORTED_GRAIN_COUNT = 0
PLANNING_ONLY_PENDING_QUALIFICATION_CURRENT_SURFACE_GRAIN_COUNT = 0
RIGHTS_BLOCKED_EXCLUSION_PROOF_COMPLETE = TRUE
UNSELECTED_OPTIONAL_ZERO_IMPORT_PROOF_COMPLETE = TRUE
UNAUTHORIZED_UPSTREAM_PATH_PRESENT_IN_SPEC_002_IMPORTED_SURFACE = FALSE
CANONICAL_SOURCE_IMPORT_RECORD_COUNT = 2
CANONICAL_NOTICE_SOURCE_IMPORT_ENTRIES = 2
S2_T042 = NOT_CREATED
```

Therefore the Specification 002 completion rule is satisfied **as a closeout candidate**, subject only to this closeout unit's own Diffciplane qualification and post-merge verification.

## Candidate canonical result

If and only if this exact closeout unit receives fresh independent substantive exact-head review, reconciles every material finding, has zero unresolved material review threads, has truthful exact-head workflow/check accounting, guarded-merges with exact expected-head protection, and passes post-merge verification, then the current canonical lifecycle result becomes:

```text
SPEC_002_STATUS = CLOSED_CANONICAL
SPEC_002_COMPLETION_RULE = SATISFIED_FOR_CURRENT_AUTHORIZED_DOCUMENSO_IMPORT_SURFACE
SPEC_002_CANONICAL_SOURCE_IMPORT_RECORDS = U001-I0001,U001-I0002
SPEC_002_UNAUTHORIZED_PATHS_PRESENT = FALSE
SPEC_002_RIGHTS_BLOCKED_EXCLUSIONS = 002C
SPEC_002_NOT_SELECTED_CURRENT_SURFACE = 002D,002E,002F,002G
SPEC_002_OPTIONAL_NOT_SELECTED = 002H
SPEC_003_PLANNING_SUCCESSOR_ELIGIBILITY = TRUE_AFTER_POSTMERGE_RECONCILIATION
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
S2_T042 = NOT_CREATED
```

The historical `Status: PLANNING_ONLY` / shaping-candidate headers in older Specification 002 artifacts remain lifecycle evidence for those earlier candidate units. After this closeout is canonical they must not be read as overriding the later explicit Specification 002 closeout record.

## Successor boundary

This closeout does not itself implement Specification 003.

Only after this exact closeout becomes canonical and post-merge verified may the repository reread Issue #6 and the complete current governance to derive the smallest dependency-valid Specification 003 shaping/planning unit.

Expected dependency relationship, subject to that fresh reread:

```text
SPEC_003_PREREQUISITE_SPEC_002_CLOSED_CANONICAL = SATISFIED_AFTER_THIS_CLOSEOUT_ONLY
SPEC_003_CURRENT_ISSUE_STATUS = PLANNING_ONLY
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
```

No product source, runtime, package, dependency, credential, provider, migration, domain implementation, or anti-corruption adapter is authorized by this closeout.

## Explicit non-grants

This closeout grants none of the following:

- new third-party rights;
- a license conclusion for 002C;
- `COPY_EXACT` authority for either selected 002C file;
- inheritance of 002B private permission;
- new source-import records;
- new upstream-derived bytes;
- dependency/toolchain acquisition;
- TypeScript/Zod/WebAuthn execution;
- Stage R for 002C or any later grain;
- 002C implementation;
- 002D–002H implementation;
- `packages/ee/**` authority;
- upstream outreach;
- Specification 003 implementation;
- Specification 004 or later authority;
- a new `S2-Txxx` identity.

## Exact-head qualification requirements

Before merge require one unchanged exact closeout head to prove:

1. the diff is limited to this one Signthos-authored closeout artifact unless a separately justified forward-only correction is required;
2. upstream-derived bytes added remain `0`;
3. source-import records created/modified remain `0`;
4. `.npmrc`, Prisma schema, provenance records, `NOTICE`, packages, dependencies, workflows, runtime, and product source remain unchanged;
5. the canonical source-import record inventory is exactly U001-I0001 and U001-I0002;
6. the exact current destination/provenance/NOTICE blobs recorded above are accurate;
7. 002A1 and 002B canonical lifecycle evidence is accurately represented;
8. PR #83 correctly resolves 002B current-status ambiguity without erasing history;
9. PR #82 correctly canonicalizes the current-surface dispositions and no blocked source entered the repository;
10. the 002C fail-closed exclusion satisfies every canonical exclusion prerequisite;
11. 002D–002G and 002H have zero current-surface imported bytes and zero effective import authority;
12. no unauthorized upstream path is present in the current Specification 002 imported surface;
13. the Specification 002 completion-rule evaluation above is supported without treating a blocked/unselected grain as implemented;
14. fresh independent substantive review specifically tests for rights bypass, historical-status rewriting, hidden imported bytes, missing provenance/NOTICE obligations, and premature Specification 003 authority;
15. every material finding is repaired forward-only and re-reviewed on the exact resulting head;
16. unresolved material review threads are `0`;
17. exact-head workflows/checks are accounted truthfully, including `NO_APPLICABLE_RUN` where applicable;
18. current canonical main/base/head/tree/diff/rulesets/protection/mergeability are reverified immediately before merge;
19. merge uses exact `expected_head_sha` with normal merge method and no bypass; and
20. post-merge verification proves ordered ancestry, tree equality, valid signature, exact one-file closeout surface, zero protected-surface mutation, and the final Specification 002 lifecycle result before Issue #5 closure or Specification 003 planning begins.
