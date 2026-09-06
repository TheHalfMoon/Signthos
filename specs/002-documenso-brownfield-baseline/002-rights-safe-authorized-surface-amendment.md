# Specification 002 — Rights-Safe Authorized-Surface Amendment

Status: `AMENDMENT_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / FAIL_CLOSED`
Issue: #5
Canonical base: `0ae51ca0d67dabd6a246387f403dc4fa60e03579`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Resolve the current Specification 002 deadlock without weakening provenance, rights, characterization, or Diffciplane requirements.

The current 002C source candidates remain blocked because exact `COPY_EXACT` rights are not established for:

- `packages/lib/types/document-auth.ts`; and
- `packages/lib/types/webauthn.ts`.

This amendment does not resolve that rights conflict, select a license, inherit the 002B private permission, copy or adapt either file, authorize Stage R, or create product implementation authority.

Instead, it reconciles the meaning of the Specification 002 authorized import surface with the canonical roadmap and the existing Specification 002 completion rule: a grain that never becomes import-authorized because its exact source rights fail closed is an exclusion from the authorized brownfield surface, not an indefinite requirement to import blocked source.

## Canonical inputs

The amendment relies only on already canonical repository facts.

### Constitution

The Constitution requires:

- brownfield truth before transformation;
- provenance before import;
- fail-closed handling of ambiguous, conflicting, or missing rights;
- exact-head evidence and Diffciplane merge discipline; and
- no authority inflation from generic approval.

It does not require Signthos to copy source whose rights remain unresolved.

### Canonical roadmap

`ROADMAP.md` defines Specification 002 as:

> establish an exact, tested behavioral baseline for the authorized Documenso import surface before Signthos transformations.

The important limiting phrase is `authorized Documenso import surface`.

The roadmap lists 002A through 002H as candidate grains. Candidate ordering does not itself create import authority.

### Specification 002 completion rule

The canonical Specification 002 completion rule says the specification becomes `CLOSED_CANONICAL` only after every actually authorized/imported grain is proven, reviewed, merged, post-merge verified, and reconciled.

That rule does not say that every candidate grain must eventually become import-authorized.

### Existing 002C fail-closed result

Canonical 002C planning established:

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

Canonical 002C analysis also established that a clean-room or newly authored auth contract may be a valid later Signthos design direction under separate transformation authority, but must not be represented as an exact inherited baseline copy.

This amendment preserves that distinction.

## Problem in the current frontier interpretation

The current post-toolchain reconciliation treated the unqualified 002C candidate as both:

1. unable to enter Stage R because rights fail closed; and
2. a required predecessor whose non-import permanently prevents Specification 002 closeout and Specification 003 successor eligibility.

Those two conditions together create a permanent deadlock unless a third party supplies new rights evidence.

That interpretation is stricter than the canonical Specification 002 completion rule and the roadmap's `authorized ... import surface` boundary.

Fail-closed rights handling means blocked source must not enter Signthos. It does not require the project to wait forever for permission to source that was never import-authorized.

## Amended authorized-surface rule

Specification 002 candidate grains are classified into one of these states:

```text
AUTHORIZED_AND_IMPORTED
AUTHORIZED_NOT_YET_IMPORTED
PLANNING_ONLY_PENDING_QUALIFICATION
EXCLUDED_RIGHTS_BLOCKED_NO_IMPORT
NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
OPTIONAL_NOT_SELECTED
```

Only `AUTHORIZED_AND_IMPORTED` and `AUTHORIZED_NOT_YET_IMPORTED` belong to the active Specification 002 import-completion dependency set. `PLANNING_ONLY_PENDING_QUALIFICATION` is an active unresolved planning dependency only when a canonical planning chain has actually selected that grain for the current import surface. The remaining three states are outside the active import-completion dependency set, but for different reasons that must not be conflated.

### Status vocabulary mapping

These labels are a Specification 002 closeout-classification layer. They do not rewrite or erase historical task, grain, Stage R, rights, or implementation statuses. Existing canonical records remain authoritative for what was true when each record was created.

- `AUTHORIZED_AND_IMPORTED` means a grain or bounded subgrain obtained separate canonical import authority, imported its authorized bytes, completed required qualification/review/guarded merge/post-merge evidence, and has no remaining authorized import action in the current surface. This classification never broadens the exact imported paths.
- `AUTHORIZED_NOT_YET_IMPORTED` means separate canonical import authority is effective for an exact path/action but the authorized import has not yet reached canonical post-merge completion. Any such grain blocks Specification 002 closeout. No current candidate is assigned this state by this amendment.
- `PLANNING_ONLY_PENDING_QUALIFICATION` means a canonical planning chain selected the grain for the current import surface but no effective import authority exists yet and the planning/qualification question remains productively unresolved. Any such current-surface grain blocks Specification 002 closeout. This amendment removes 002C from this state only if the exclusion itself becomes canonical.
- `EXCLUDED_RIGHTS_BLOCKED_NO_IMPORT` means the grain was selected and qualified far enough to establish a fail-closed exact rights blocker, never obtained import authority, imported zero blocked bytes, and satisfies every exclusion prerequisite below. This is a terminal disposition for the current Specification 002 import surface only; it is not `CLOSED_CANONICAL` implementation, not a license conclusion, not an inherited-behavior claim, and not authority to reproduce the blocked expression.
- `NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE` means a roadmap candidate grain never obtained separate canonical selection/import authority for the current Specification 002 surface. It is neither completed nor failed; it is simply outside this closeout surface. Later source reuse requires a fresh canonical qualification/authorization chain.
- `OPTIONAL_NOT_SELECTED` is reserved for a grain that the roadmap/specification already defines as optional or separately permission-dependent and that is not selected. For current Specification 002 this applies to 002H.

The mapping from existing canonical states to these classifications is forward-only:

```text
HISTORICAL_OR_EXISTING_STATUS -> CURRENT_SURFACE_CLASSIFICATION
002A1 CLOSED_CANONICAL plus later 002A no-necessity results -> 002A AUTHORIZED_AND_IMPORTED
002B CLOSED_CANONICAL -> 002B AUTHORIZED_AND_IMPORTED
002C OPEN_BLOCKED_PENDING_EXACT_RIGHTS_REENTRY -> 002C EXCLUDED_RIGHTS_BLOCKED_NO_IMPORT only after this amendment is canonical
002D-002G never selected/authorized for import -> NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002H optional separate-rights grain not selected -> OPTIONAL_NOT_SELECTED
```

The closeout reconciliation may classify Specification 002 eligible for closure only if:

1. every `AUTHORIZED_AND_IMPORTED` grain is fully proven and reconciled;
2. there are zero `AUTHORIZED_NOT_YET_IMPORTED` grains;
3. there are zero `PLANNING_ONLY_PENDING_QUALIFICATION` grains selected for the current import surface;
4. every `EXCLUDED_RIGHTS_BLOCKED_NO_IMPORT` grain satisfies and preserves its fail-closed exclusion proof;
5. every `NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE` or `OPTIONAL_NOT_SELECTED` grain has zero imported bytes and zero effective import authority under this specification; and
6. no historical status is rewritten to imply that blocked or unselected implementation occurred.

A grain may become `EXCLUDED_RIGHTS_BLOCKED_NO_IMPORT` only when all of the following are true:

1. the exact candidate source boundary is known;
2. the applicable rights evidence has been qualified fail-closed;
3. no path/action-specific rights basis exists for the proposed import;
4. no already-authorized independent source substitute is available inside the same brownfield grain;
5. the exclusion copies/adapts zero blocked upstream bytes;
6. the exclusion does not claim inherited behavioral characterization that was not actually established;
7. any required product capability is explicitly deferred to a later Signthos-owned transformation/domain specification rather than silently dropped; and
8. the exclusion itself passes independent substantive exact-head review, guarded merge, and post-merge verification.

An exclusion is not a license determination and is not permission to reimplement by copying expression from the blocked source.

## 002C disposition candidate

The exact selected 002C source closure satisfies the fail-closed exclusion prerequisites already established by the canonical chain:

- exact source paths and immutable blobs are known;
- exact public rights conflict is qualified and unresolved;
- `COPY_EXACT` rights are not established;
- 002B private permission inheritance is prohibited;
- no Stage R allowlist exists;
- no imported 002C source bytes exist in Signthos;
- no source-import record exists for those paths;
- the previously considered independently authored substitute was correctly rejected as a representation of the inherited baseline;
- later Signthos-owned auth/domain design remains available only under separate transformation authority.

If this amendment becomes canonical, the intended disposition is:

```text
002C_BASELINE_IMPORT_DISPOSITION = EXCLUDED_RIGHTS_BLOCKED_NO_IMPORT
002C_SELECTED_SOURCE_BYTES_IMPORTED = NO
002C_SOURCE_IMPORT_RECORDS_CREATED = 0
002C_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED
002C_STAGE_R_AUTHORITY = ABSENT
002C_IMPLEMENTATION_AUTHORITY = ABSENT
002C_INHERITED_BASELINE_CLAIM = NOT_ESTABLISHED_FOR_EXCLUDED_SOURCE
002C_LATER_SIGNTHOS_AUTH_CONTRACT = DEFERRED_TO_SEPARATE_TRANSFORMATION_AUTHORITY
```

The historical 002C rights/dependency/toolchain planning remains valid evidence. The exclusion changes only whether the blocked source remains a mandatory Specification 002 completion dependency.

## 002D–002G dependency effect

The current canonical chain never created Stage R or implementation authority for 002D through 002G.

This amendment does not create such authority.

Because 002C would be excluded rather than imported, 002D through 002G must not be started merely by bypassing the missing auth baseline. Their candidate dependency chains were shaped around an inherited baseline that is no longer available as a mandatory predecessor.

Accordingly, if this amendment becomes canonical:

```text
002D_CURRENT_SURFACE_CLASSIFICATION = NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002E_CURRENT_SURFACE_CLASSIFICATION = NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002F_CURRENT_SURFACE_CLASSIFICATION = NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002G_CURRENT_SURFACE_CLASSIFICATION = NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002D_002G_SOURCE_IMPORT_AUTHORITY = ABSENT
002D_002G_IMPLEMENTATION_AUTHORITY = ABSENT
```

Future reuse of any exact upstream path from those candidate grains still requires fresh path-level qualification and separate canonical import authority. This amendment does not pre-authorize later source reuse.

## 002H effect

002H remains optional and empty unless separately accepted exact rights evidence exists.

```text
002H_CURRENT_SURFACE_CLASSIFICATION = OPTIONAL_NOT_SELECTED
002H_SOURCE_IMPORT_AUTHORITY = ABSENT
```

## Specification 002 authorized import surface after this amendment

The currently canonical imported surface remains exactly the surface already proven by the existing chain, including:

- the authorized 002A1 `.npmrc` baseline seed and its required license/NOTICE treatment; and
- the exact authorized 002B `packages/prisma/schema.prisma` baseline under its separately preserved private permission/provenance chain.

No new upstream-derived bytes are admitted by this amendment.

If canonicalized, the Specification 002 import dependency set becomes the set of grains that actually obtained import authority rather than the full candidate-grain list.

Candidate classification:

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

This classification must be reverified against exact canonical history during the later Specification 002 closeout unit. This amendment does not itself mark Specification 002 closed.

## Successor effect if canonical

If and only if this amendment receives fresh independent substantive exact-head review, accurate check accounting, zero unresolved material review threads, guarded merge, and post-merge verification, then the next bounded repository unit is a Specification 002 closeout reconciliation.

That closeout must independently prove:

1. the complete exact authorized/imported upstream byte surface;
2. all source-import records and current review states;
3. deterministic NOTICE/license obligations for the admitted surface;
4. exact canonical qualification/merge/post-merge evidence for every admitted import unit;
5. zero unauthorized upstream path present;
6. 002C exact blocked paths remain absent;
7. 002D–002H contain no imported product bytes under this specification unless separately authorized before closeout;
8. historical blockers/evidence remain preserved rather than rewritten;
9. Specification 002 completion semantics match the roadmap's `authorized Documenso import surface`; and
10. Specification 003 successor eligibility is derived only after that closeout itself becomes canonical.

Candidate successor result:

```text
NEXT_AUTHORIZED_UNIT_IF_CANONICAL = SPEC_002_RIGHTS_SAFE_CLOSEOUT_RECONCILIATION
SPEC_002_CLOSEOUT_ELIGIBILITY = PENDING_AMENDMENT_CANONICALIZATION_AND_CLOSEOUT_PROOF
SPEC_003_SUCCESSOR_AUTHORITY = ABSENT_UNTIL_SPEC_002_CLOSEOUT_CANONICAL
```

No `S2-T042` identity is created.

## Relationship to future Signthos auth

This amendment does not silently remove authentication from the product roadmap.

It separates two questions that the current deadlock incorrectly coupled:

1. **Can Signthos copy the selected Documenso auth source as an inherited baseline?**
   - Current answer: no qualifying rights basis is established, so fail closed and do not import it.

2. **Can a later Signthos specification define a Signthos-owned authentication/resource-authorization contract from independently authored requirements and behavior evidence?**
   - Potentially yes, but only under the separately canonical authority of the later owning specification.

Specification 003 already owns the Signthos domain/anti-corruption boundary and includes authentication separation, resource/tenant authorization, stable errors, and migration adapters around inherited behavior. Any later implementation must be independently scoped and may not copy expression from excluded source merely because the product needs equivalent capability.

## Explicit non-grants

This amendment grants none of the following:

- a license conclusion for either 002C source file;
- permission to copy, adapt, translate, derive from, or redistribute either blocked source file;
- inheritance of the 002B private permission;
- source-import records for excluded paths;
- package/config/test/runtime bytes for 002C;
- dependency/toolchain acquisition;
- TypeScript/Zod/WebAuthn execution;
- Stage R for 002C or any later grain;
- 002D–002H source import or implementation;
- upstream outreach;
- new third-party rights;
- Specification 003 implementation;
- a new `S2-T042` task identity;
- any claim that excluded Documenso auth behavior has been characterized or reproduced.

## Exact-head qualification requirements

Before merge require one unchanged exact PR head to prove:

1. the diff is limited to this Signthos-authored planning amendment unless a separately justified canonical bookkeeping correction is required;
2. upstream-derived bytes committed by this amendment remain `0`;
3. source-import records created/modified remain `0`;
4. no source, package manifest, lockfile, config, test, runtime, NOTICE, provenance tool/schema, workflow, or product surface is changed;
5. no rights or license ambiguity is converted into permission;
6. the amendment is consistent with the Constitution, roadmap `authorized import surface`, Specification 002 completion rule, Issue #5 `PLANNING_ONLY`, and existing 002C rights result;
7. fresh independent substantive review specifically evaluates whether excluding never-authorized blocked source is a valid closeout-path interpretation rather than an unauthorized dependency bypass;
8. all material findings are corrected forward-only and re-reviewed on the exact amended head;
9. unresolved material review threads are `0`;
10. exact-head workflow/check accounting is truthful, including `NO_APPLICABLE_RUN` where applicable;
11. canonical `main`, PR base/head, changed surface, rulesets, branch protection, and mergeability are reverified immediately before merge;
12. merge uses exact `expected_head_sha`; and
13. post-merge verification proves ordered ancestry, tree equality, valid signature, exact bounded surface, zero upstream-derived bytes, zero source-import mutation, and the resulting closeout-only successor frontier.
