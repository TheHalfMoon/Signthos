# Specification 002B — Deterministic NOTICE Surface Amendment

Status: `DISTRIBUTION_BOOKKEEPING_AUTHORIZATION_CANDIDATE / NOT_YET_EFFECTIVE`
Issue: #5
Canonical base: `f02335d11c2bc556f01fa4ff3c21c7859074600f`

## Purpose

Authorize exactly one missing Signthos-owned distribution-bookkeeping surface required to complete the already-effective 002B Stage R implementation flow:

`NOTICE`

This amendment exists because canonical `authorization-002b-stage-r.md` requires deterministic NOTICE qualification after the real v2 source-import record is promoted to `qualified_exact_head`, but its enumerated implementation surface did not include the root `NOTICE` file.

The omission is now proven by live PR #73 exact-head CI rather than inferred prospectively.

This governance-only unit imports zero upstream-derived bytes, creates zero source-import records, changes zero NOTICE bytes, and grants no new Documenso source path or runtime authority while non-canonical.

## Live evidence establishing the gap

The effective 002B implementation PR is #73.

After independent imported-byte review became clean on exact head `1c6c75aab11ede70be965f3d679da566e14b8fa5`, the only permitted metadata delta promoted `provenance/imports/U001-I0002.json` to `review.status = qualified_exact_head` with qualifying evidence `github:issue-comment:5553077805`.

The resulting exact head is:

`8617ae23183a8aaf8d3c35293eace78350c1225d`

On that exact head:

- `packages/prisma/schema.prisma` remains Git blob `13768e34f62331474fce63b1ca67f8d5ead44854`, size `38099`;
- only the provenance record changed in the qualification delta;
- formatting passes;
- locked dependency verification passes;
- strict Clippy passes;
- all tests before the NOTICE synchronization assertion pass;
- workflow run `33977107574` is `FAILURE`, not PASS;
- the only test failures are `notice_check_accepts_canonical_bytes` and `canonical_notice_is_byte_current_and_repeatable`;
- the explicit diagnostic is `NOTICE_DRIFT: NOTICE differs from deterministic canonical projection`.

The expected deterministic projection differs because the now-qualified `U001-I0002` must appear in the `Source imports` section alongside the existing `U001-I0001` entry.

This is not a provenance-record defect, imported-source defect, characterization defect, or permission defect. It is a bounded repository bookkeeping surface omitted from the 002B implementation allowlist.

## Canonical precedent

Canonical `authorization-002a1-agpl-license-artifact.md` establishes the repository's existing pattern:

- deterministic `NOTICE` is generated from validated canonical source-import records;
- a newly qualified source-import record necessarily changes the canonical NOTICE projection;
- a Stage R implementation surface must explicitly authorize the root `NOTICE` file before that deterministic change is committed;
- the NOTICE change is derivative bookkeeping and does not expand the upstream byte allowlist.

This 002B amendment applies the same already-canonical pattern to `U001-I0002` only.

## Exact amendment

If this authorization becomes canonical and separately effective, the complete 002B implementation surface is amended by adding exactly:

5. `NOTICE` — deterministic canonical provenance projection update required by the qualified `U001-I0002.json` record.

The original authorized surfaces remain unchanged:

1. `packages/prisma/schema.prisma` — exact authorized upstream source bytes only;
2. `provenance/imports/U001-I0002.json` — the v2 source-import record;
3. necessary independently authored characterization/evidence files under `specs/002-documenso-brownfield-baseline/`;
4. `specs/002-documenso-brownfield-baseline/tasks.md` only for evidence-backed ledger reconciliation.

No sixth implementation surface is authorized.

## Deterministic NOTICE constraints

The 002B implementation PR may modify root `NOTICE` only after this amendment is both canonical and effective, and only under all of these constraints:

1. `U001-I0002.json` is already `review.status = qualified_exact_head` with immutable independent review evidence;
2. `NOTICE` must be the exact deterministic output of the canonical Signthos provenance tool for the repository's validated canonical records on that implementation head;
3. the only semantic inventory addition attributable to 002B is the `U001-I0002` source-import projection;
4. no hand-authored, branding, licensing-policy, explanatory, unrelated component, or unrelated source-import content may be added through this authority;
5. `cargo test --locked --offline --manifest-path tools/provenance/Cargo.toml --all-targets --all-features` must pass on the final exact head;
6. canonical provenance validation must pass;
7. source verification for the exact Prisma import must pass where applicable;
8. `cargo run --locked --offline --manifest-path tools/provenance/Cargo.toml -- notice --check` must pass on the final exact head;
9. `packages/prisma/schema.prisma` must remain blob `13768e34f62331474fce63b1ca67f8d5ead44854`, size `38099`, SHA-256 `0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931` across the NOTICE delta;
10. the qualified `U001-I0002.json` review identity/evidence must remain intact unless a later material finding independently requires a separately reviewed provenance correction.

## Rights and license boundaries

This amendment does not alter the rights basis or public-license classification.

- private rights artifact remains `permission-artifact:documenso-signthos-private-v1`;
- private-grant distribution obligations remain `RESOLVED_NONE_ADDITIONAL`;
- public path license remains `unresolved_conflict`;
- no SPDX expression is synthesized;
- no relicense, sublicense, commercial-use, EE, or broader-repository right is inferred.

The deterministic NOTICE line is inventory/provenance bookkeeping. It does not resolve the AGPL/MIT conflict and does not replace confidential permission evidence.

## Non-grants

This amendment does not authorize:

- any additional Documenso source byte or path;
- any adjacent `packages/prisma/**` path;
- any `packages/ee/**` path;
- package installation;
- Prisma generation, migrations, seeds, Studio, database, provider, network, credentials, or generated output;
- changes to provenance schema/validator/tool behavior;
- hand-authored or unrelated NOTICE changes;
- 002C–002H implementation;
- Specification 003 implementation.

## Effectiveness rule

While this document is non-canonical:

- `002B_NOTICE_SURFACE_AUTHORITY = ABSENT`;
- PR #73 must remain unmerged while deterministic NOTICE is stale;
- root `NOTICE` must not be mutated under 002B authority.

If and only if this exact amendment receives fresh independent substantive exact-head review, reconciles every material finding, has zero unresolved material review threads, merges guarded with its exact reviewed head, and is post-merge verified, a separate effectiveness proof must still establish the amendment on canonical `main` before PR #73 may update `NOTICE`.

The effectiveness proof must verify that the original 002B Stage R authorization/effectiveness chain remains canonical, that PR #73's live failure is exactly the deterministic NOTICE drift described here, and that no authority beyond the single root `NOTICE` bookkeeping surface is activated.

No new `S2-Txxx` task identity is created by this amendment.