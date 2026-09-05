# Provenance Maintenance Amendment — v2 Private-Permission Source Imports

Status: `IMPLEMENTATION_CANDIDATE / V1_PRESERVED / ZERO_UPSTREAM_PRODUCT_BYTES`

## Purpose

Extend the Signthos provenance control plane with a versioned `source_import` v2 representation that can truthfully preserve a separate private-permission rights basis when public license evidence remains unresolved.

This maintenance amendment does not reopen Specification 001 v1 closeout. It implements only the bounded authority made effective through Specification 002 governance and canonical PR #65.

## Canonical authority

- canonical authorization PR: `#65`;
- canonical authorization merge: `d0ec3901b7da5c34ec6418fc597194cb45892d7e`;
- post-merge effectiveness record: `github:issue-comment:5552233983`;
- implementation branch base: `d0ec3901b7da5c34ec6418fc597194cb45892d7e`;
- real upstream product bytes admitted by this amendment: `0`;
- real source-import records created by this amendment: `0`.

## v1 preservation

The implementation deliberately leaves the historical v1 structural validator in `tools/provenance/src/validation.rs` unchanged.

Dispatch behavior is version-bounded:

- exact `kind = source_import` with exact `schema_version = 2` uses the new v2 validation path;
- every existing v1 source-import record continues through the pre-existing v1 validator;
- component and policy record behavior is unchanged;
- unknown versions do not gain a permissive fallback;
- a v2-shaped record changed to `schema_version = 1` is rejected rather than silently downgraded;
- no canonical v1 import record is migrated or rewritten.

`V1_SEMANTIC_REINTERPRETATION = PROHIBITED`

`V1_MIGRATION_REQUIRED = FALSE`

## v2 rights model

A v2 record keeps four domains separate:

1. public license evidence;
2. private permission rights;
3. distribution and notice obligations;
4. import/review authorization state.

### Public license evidence

`license.classification` supports:

- `spdx` — requires a canonical SPDX expression and continues through the existing SPDX policy checks;
- `unresolved_conflict` — forbids a guessed SPDX expression and requires at least two non-empty evidence references;
- `unresolved_unknown` — forbids a guessed SPDX expression and requires non-empty evidence.

An unresolved public license state is import-ready only when the source record uses `classification = separate_permission_required` and independently satisfies permission and distribution obligations.

Private permission never aliases or synthesizes an SPDX expression.

### Permission rights

A separate-permission record requires the existing canonical non-secret reference form:

`permission-artifact:<id>`

The required permission scopes are additive:

- transformation scopes come from the selected transformation kind;
- distribution scopes come from explicit `distribution.actions`;
- canonical restricted-path policy scopes remain additive.

A record therefore cannot claim a distribution action such as `publish_source` unless the preserved permission scope includes it.

### Distribution and notice obligations

`distribution.state` is explicit:

- `resolved` may be import-ready when every other gate also passes;
- `unresolved` is not import-ready;
- `contradictory` is not import-ready.

The record also requires:

- non-empty non-secret distribution evidence;
- explicit required public artifact paths, which may be empty only when evidence establishes that no such artifact is required;
- explicit distribution actions.

Permission scope is not treated as evidence that distribution obligations are resolved.

## NOTICE behavior

The deterministic NOTICE projection remains confidential-data safe:

- v2 source imports are not silently omitted;
- resolved SPDX state is rendered as SPDX;
- unresolved public license state is rendered only as its unresolved classification;
- permission artifact references and permission text are not projected into NOTICE;
- the existing disclaimer continues to state that NOTICE does not replace full license, attribution, or other distribution obligations.

## Source verification

The existing offline `verify-source` path reads immutable upstream source facts (`repository`, `commit`, `path`, `sha256`) independently of source-import schema version.

Focused v2 qualification proves that the same exact-source verification works for a synthetic v2 record and still emits the existing statement that import authorization is not evaluated by source verification.

## Security and fail-closed properties

The implementation preserves the existing record and run byte limits, secure canonical-path I/O, deterministic diagnostics, duplicate-id and duplicate-destination detection, restricted-path enforcement, and no-network source verification boundary.

Focused negative coverage includes:

- unresolved or contradictory distribution state;
- unresolved license without separate permission;
- unresolved license carrying a forbidden guessed SPDX field;
- resolved license missing SPDX;
- conflicting SPDX evidence;
- `NONE`, `NOASSERTION`, `LicenseRef-*`, deprecated, and policy-rejected SPDX forms;
- malformed permission artifact;
- insufficient transformation/distribution permission scopes;
- invalid required-artifact path;
- restricted-path denial;
- unknown schema version;
- v2-to-v1 downgrade attempt;
- mixed v1/v2 duplicate ids and destinations;
- mixed-version NOTICE projection and permission confidentiality;
- v2 exact-source verification.

## Non-grants

This amendment does not authorize or perform:

- any Documenso or Prisma source import;
- any real v2 source-import record;
- any `packages/ee/**` import;
- any Stage R authorization for 002B;
- any inference that the current Prisma private permission has resolved distribution/notice obligations;
- dependency or workflow changes;
- application/runtime/product code changes;
- Specification 003 implementation.

The current Prisma candidate remains blocked until its complete non-secret distribution/notice obligations are genuinely evidenced and canonically qualified.
