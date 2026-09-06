# Specification 002 — Authorized-Surface Status Correction

Status: `FORWARD_ONLY_CORRECTION / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / FAIL_CLOSED`
Issue: #5
Corrects amendment head predecessor: `6656fa4e98a02a33dfbe3b32e77c96b8dd52c503`
Canonical base: `0ae51ca0d67dabd6a246387f403dc4fa60e03579`

## Purpose

Correct one governance-status inflation defect in the rights-safe authorized-surface amendment without changing its rights-safe 002C exclusion model, importing any upstream byte, or creating implementation authority.

The preceding amendment text maps:

```text
002B CLOSED_CANONICAL -> 002B AUTHORIZED_AND_IMPORTED
```

That historical-status premise is not canonical truth at the current base. Canonical `closeout-002b-implementation.md` records the current 002B lifecycle state as:

```text
002B_STATUS = IMPLEMENTATION_POSTMERGE_VERIFIED_CLOSEOUT_PENDING
```

and states that `002B = CLOSED_CANONICAL` becomes effective only after the separate 002B closeout unit itself receives independent substantive exact-head review, guarded merge, and post-merge verification.

This correction is controlling for any conflicting 002B lifecycle statement in `002-rights-safe-authorized-surface-amendment.md`.

## Separate dimensions

Specification 002 closeout must keep two dimensions separate:

1. **Authorized import-surface completion** — whether an exact authorized source import has already reached canonical implementation/post-merge completion.
2. **Grain lifecycle closeout** — whether the grain's separate closeout bookkeeping has itself become canonical.

For current 002B:

```text
002B_IMPORT_SURFACE_CLASSIFICATION = AUTHORIZED_AND_IMPORTED
002B_IMPLEMENTATION_STATE = CANONICAL_POSTMERGE_VERIFIED
002B_GRAIN_LIFECYCLE_STATUS = IMPLEMENTATION_POSTMERGE_VERIFIED_CLOSEOUT_PENDING
002B_CLOSED_CANONICAL = FALSE
```

`AUTHORIZED_AND_IMPORTED` therefore does **not** mean `CLOSED_CANONICAL`. It means only that the exact authorized import action already occurred and has no remaining source-import action for the current surface.

For current 002A, the closeout reconciliation must independently reverify its canonical lifecycle evidence rather than infer grain closure from the import-surface classification alone.

## Corrected mapping

The controlling forward-only mapping is:

```text
HISTORICAL_OR_EXISTING_STATUS -> CURRENT_IMPORT_SURFACE_CLASSIFICATION
002A1 canonical import plus later 002A no-necessity evidence -> 002A AUTHORIZED_AND_IMPORTED; lifecycle closeout must be independently reverified
002B IMPLEMENTATION_POSTMERGE_VERIFIED_CLOSEOUT_PENDING -> 002B AUTHORIZED_AND_IMPORTED; lifecycle closeout remains pending
002C OPEN_BLOCKED_PENDING_EXACT_RIGHTS_REENTRY -> 002C EXCLUDED_RIGHTS_BLOCKED_NO_IMPORT only after the rights-safe amendment/correction unit is canonical
002D-002G never selected/authorized for import -> NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE
002H optional separate-rights grain not selected -> OPTIONAL_NOT_SELECTED
```

No current-surface classification may be used to rewrite a canonical lifecycle status.

## Corrected closeout predecessor order

The rights-safe Specification 002 closeout reconciliation is not eligible to mark Specification 002 `CLOSED_CANONICAL` while an actually authorized/imported grain still has a required lifecycle closeout pending.

Therefore, after this amendment/correction unit becomes canonical, the successor order is:

```text
1. CANONICALIZE_REQUIRED_PENDING_GRAIN_CLOSEOUTS_FOR_ACTUALLY_AUTHORIZED_IMPORTED_SURFACE
   - including 002B closeout if still pending at live re-read
   - including any other actually authorized/imported grain closeout shown pending by live canonical truth
2. SPEC_002_RIGHTS_SAFE_CLOSEOUT_RECONCILIATION
3. SPEC_003_SUCCESSOR_ELIGIBILITY_REEVALUATION
```

The later Specification 002 closeout must prove all of the following before closure:

- every `AUTHORIZED_AND_IMPORTED` grain has canonical lifecycle closeout evidence required by its governing chain;
- zero `AUTHORIZED_NOT_YET_IMPORTED` grains exist;
- zero current-surface `PLANNING_ONLY_PENDING_QUALIFICATION` grains remain;
- every `EXCLUDED_RIGHTS_BLOCKED_NO_IMPORT` grain preserves its fail-closed proof and imported zero blocked bytes;
- every `NOT_SELECTED_FOR_CURRENT_IMPORT_SURFACE` and `OPTIONAL_NOT_SELECTED` grain has zero imported bytes and zero effective import authority under this specification; and
- no lifecycle status is inflated by an import-surface classification.

## Preserved 002C result

This correction does not change the substantive 002C disposition proposed by the amendment:

```text
002C_CURRENT_SURFACE_CLASSIFICATION = EXCLUDED_RIGHTS_BLOCKED_NO_IMPORT
002C_SELECTED_SOURCE_BYTES_IMPORTED = NO
002C_SOURCE_IMPORT_RECORDS_CREATED = 0
002C_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED
002C_STAGE_R_AUTHORITY = ABSENT
002C_IMPLEMENTATION_AUTHORITY = ABSENT
```

The unresolved AGPL/MIT evidence conflict remains unresolved. The 002B private permission remains non-inheritable for 002C.

## Explicit non-grants

This correction grants no:

- new third-party right or license conclusion;
- source import;
- source-import record mutation;
- `NOTICE` mutation;
- dependency or toolchain acquisition;
- TypeScript execution;
- Stage R authority;
- 002C or 002D–002H implementation authority;
- Specification 003 implementation authority;
- upstream outreach authority; or
- `S2-T042` identity.

## Qualification effect

Because this correction changes the PR head and expands the planning-only diff from one file to two, all review evidence for prior heads is stale.

The two-file scope is justified solely by the amendment's own qualification allowance for a separately justified canonical bookkeeping correction. A fresh independent substantive exact-head review must verify the combined amendment plus this correction, including the corrected 002B lifecycle truth and successor order, before any merge.
