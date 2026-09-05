# Specification 002B — Private-Permission Provenance Compatibility Analysis

Status: `PLANNING_EVIDENCE_CANDIDATE / ZERO_UPSTREAM_BYTES / NO_PROVENANCE_AMENDMENT / NO_IMPORT_AUTHORITY`
Issue: #5
Canonical base: `edeec84c97ee682c9dfa05c4f2a913d8b2038365`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`
Exact candidate path: `packages/prisma/schema.prisma`

## Purpose

Execute the single planning-only successor authorized by canonical PR #63:

`PLANNING_ONLY_PROVENANCE_PRIVATE_PERMISSION_COMPATIBILITY_ANALYSIS`

The objective is to determine whether Signthos provenance can safely represent a source import whose actual reuse rights come from a separately preserved private first-party permission artifact while the public license evidence for the exact source path remains conflicting or unresolved.

This document changes no provenance schema, validator, policy, NOTICE implementation, source-import record, upstream source byte, runtime surface, or dependency graph.

## Canonical predecessor state

PR #62 established for the exact Prisma schema candidate:

- `002B_PRISMA_SCHEMA_PERMISSION_ARTIFACT = permission-artifact:documenso-signthos-private-v1`;
- `002B_PRISMA_SCHEMA_PERMISSION_SCOPE = copy,redistribute,publish_source`;
- `002B_PRISMA_SCHEMA_SEPARATE_RIGHTS_BASIS = ESTABLISHED_FOR_COPY_EXACT_DISTRIBUTION`;
- public license evidence remains `CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`;
- `002B_PRISMA_SCHEMA_IMPORT_LICENSE_EXPRESSION = UNRESOLVED`;
- `PROVENANCE_V1_RECORD_ELIGIBILITY = BLOCKED_UNRESOLVED_LICENSE_EXPRESSION`.

PR #63 then canonically selected only this planning/evidence compatibility analysis as the next repository unit. It explicitly left provenance-model amendment authority, Stage R, source import, later 002 grains, and Specification 003 absent.

## Exact v1 implementation observations

### Source-import schema

Canonical `provenance/schema/v1/source-import.schema.json` requires all source-import records to contain:

- `schema_version = 1`;
- `classification`;
- exact upstream identity and source digest;
- `license`;
- `permission`;
- destination/import digest/date;
- transformation;
- exact-head review metadata.

The v1 `license` object always requires both:

- `spdx` — non-empty string;
- `evidence` — non-empty unique evidence strings.

The v1 `permission` object is already structurally independent from `license` and can carry:

- a stable non-secret permission artifact reference;
- explicit permission scopes.

Therefore the schema already distinguishes permission evidence structurally, but still makes an SPDX expression mandatory even when `classification = separate_permission_required`.

### Structural validator

Canonical `tools/provenance/src/validation.rs` independently requires the same v1 `license.spdx` field for every `source_import`. It does not branch the required license shape according to `classification`.

The canonical record summary retained by structural validation contains only source-import `id` and destination; downstream policy modules re-read the raw JSON record for semantic validation.

### SPDX policy

Canonical `tools/provenance/src/spdx_policy.rs` validates every source-import `license.spdx` and intentionally fails closed:

- `NONE` and `NOASSERTION` produce `SPDX_UNRESOLVED`;
- deprecated shorthand is rejected;
- unknown expressions are rejected;
- custom `LicenseRef-*` expressions are rejected for canonical source evidence;
- evidence claims that conflict with the canonical SPDX expression produce `SPDX_CONFLICT`.

This means the current v1 cannot honestly encode an unresolved public license state by inserting a placeholder expression.

### Permission and restricted-path policy

Canonical `tools/provenance/src/restricted_policy.rs` already implements the key semantic separation needed for private permission:

- `separate_permission_required` makes permission evidence mandatory;
- permission artifacts must use canonical `permission-artifact:<id>` references;
- transformation kind determines minimum permission scopes;
- `copied` requires `copy`;
- later adapted/generated transformations require broader scopes;
- restricted/unknown classifications remain non-import-ready;
- explicit restricted-path policy rules can require additional scopes or deny a path.

The permission model is therefore reusable in principle. The current blocker is not inability to represent permission scope; it is the unconditional v1 SPDX requirement and the absence of an explicit public distribution-obligations representation for a permission-only rights basis.

### NOTICE projection

Canonical `tools/provenance/src/notice.rs` first validates every canonical source-import record and therefore cannot project a v1 import whose SPDX expression is unresolved.

For source imports it currently emits:

- destination;
- exact upstream repository, commit, and path;
- a license label derived from `license.spdx`.

The generic helper can render a license `classification` when no SPDX exists, but the v1 source-import schema/validator never permits such a canonical source-import state.

NOTICE also states that its summary does not replace required full license texts, copyright notices, attribution artifacts, or other distribution obligations.

### Offline source verification

Canonical `tools/provenance/src/verify_source.rs` reads the exact upstream repository, commit, path, and source SHA-256 from a source-import record and verifies those source facts against a caller-supplied local Git checkout.

It intentionally does not evaluate import authorization. Its source-fact extraction is mostly version-agnostic as long as the upstream identity shape remains stable.

## Compatibility question 1 — can the model represent separate permission with unresolved public license evidence?

### v1

No.

`SOURCE_IMPORT_V1_PRIVATE_PERMISSION_WITH_UNRESOLVED_LICENSE = NOT_REPRESENTABLE_IMPORT_READY`

The blocker is intentional and multi-layered:

1. JSON Schema requires `license.spdx`;
2. structural validation requires it;
3. SPDX policy rejects unresolved placeholders and custom-reference bypasses;
4. canonical NOTICE validation depends on the same valid record.

Changing only one layer would create inconsistent and unsafe behavior.

### Versioned successor

Yes, but only through a new versioned source-import contract that preserves v1 semantics unchanged and makes the rights basis explicit.

`VERSIONED_COMPATIBILITY = FEASIBLE_WITH_NEW_SOURCE_IMPORT_VERSION`

## Compatibility question 2 — v2, additive v1, or envelope?

### Rejected: silently additive v1 change

Changing `schema_version = 1` semantics would make previously closed canonical validation rules mutable in place and could reinterpret old records.

`V1_SEMANTIC_MUTATION = REJECTED`

### Rejected: unvalidated external envelope around a valid v1 record

An envelope that leaves an invalid or fabricated v1 `license.spdx` inside would either preserve the blocker or create a second authorization path outside canonical source-import validation.

`EXTERNAL_AUTHORIZATION_ENVELOPE = REJECTED`

### Selected compatibility model

A future implementation, if separately authorized, should introduce:

`SOURCE_IMPORT_SCHEMA_VERSION = 2`

while retaining all v1 files and semantics byte-stable unless a separately necessary nonsemantic dispatcher refactor is reviewed.

The v2 record should preserve the existing exact upstream/import/transformation/review shapes where possible and version only the license/rights/distribution contract needed for the new semantic state.

`RECOMMENDED_MODEL = VERSIONED_V2_SOURCE_IMPORT_RECORD`

## Compatibility question 3 — semantic separation

A future v2 design should keep three concepts separate.

### Public license evidence state

Proposed conceptual shape:

```json
{
  "license": {
    "status": "resolved_spdx | unresolved_conflict | unresolved_unknown",
    "spdx": "<required only when status=resolved_spdx>",
    "evidence": ["<stable public evidence reference>"]
  }
}
```

Rules:

- `resolved_spdx` requires a canonical accepted SPDX expression and normal SPDX policy validation;
- `unresolved_conflict` forbids `spdx` and requires at least two independently meaningful evidence references establishing the conflict;
- `unresolved_unknown` forbids `spdx` and requires evidence explaining the unknown state;
- unresolved states remain visible in canonical records and NOTICE output;
- migration never converts unresolved evidence to a resolved expression.

The exact enum names are planning candidates, not implementation authority.

### Rights basis

The existing `permission` object remains the natural non-secret representation of separately preserved rights:

```json
{
  "permission": {
    "artifact": "permission-artifact:<stable-id>",
    "scope": ["copy", "redistribute", "publish_source"]
  }
}
```

For a v2 source import with unresolved public license evidence:

- `classification` must remain `separate_permission_required`;
- permission artifact is mandatory;
- scope must cover every actual transformation and distribution action;
- private permission never implies, supplies, or aliases an SPDX expression.

### Distribution obligations

A private permission can grant rights while still imposing notice, attribution, disclosure, naming, or other distribution obligations. The current v1 source-import record has no dedicated normalized field proving that those obligations have been publicly and safely captured.

A future v2 record therefore needs an explicit non-secret distribution-obligations summary rather than assuming that permission scope means “no obligations.”

Conceptual candidate:

```json
{
  "distribution": {
    "obligations_status": "resolved",
    "evidence": ["<stable non-secret evidence reference>"],
    "notice_artifacts": ["<repository-relative public artifact path>"],
    "attribution_required": true,
    "full_license_text_required": false
  }
}
```

Exact fields are not authorized here. The invariant is what matters:

`PRIVATE_PERMISSION_SCOPE != DISTRIBUTION_OBLIGATIONS`

An import cannot become ready until the public non-secret record proves the applicable distribution/notice obligations are resolved without exposing confidential permission text.

For the current Prisma candidate, the existing public permission summary establishes rights scope but does not independently establish a complete distribution-obligations summary.

Therefore:

`002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS = NOT_YET_CANONICALLY_RESOLVED`

## Compatibility question 4 — exact v2 field requirements

A future v2 implementation should preserve or require at least:

- `schema_version = 2`;
- `kind = source_import`;
- canonical record id;
- source classification;
- exact upstream repository/commit/path/SHA-256/copyright-holder treatment;
- explicit public license evidence status;
- optional SPDX expression only when resolved;
- independent permission artifact and exact scopes when permission is the rights basis;
- explicit non-secret distribution-obligations evidence;
- exact destination/SHA-256/import date;
- transformation kind and derivation links;
- exact immutable PR/review evidence;
- normal restricted-path policy evaluation;
- deterministic NOTICE projection;
- source verification compatibility.

No confidential permission text belongs in the record.

## Compatibility question 5 — states that remain fail-closed

A future v2 must reject import-ready state when any of these are true:

- `classification = restricted` or `unknown`;
- public license status is unresolved and no separate permission artifact exists;
- permission artifact syntax is invalid;
- permission scope misses any transformation/distribution action;
- applicable restricted-path policy denies the path;
- required restricted-path permission scopes are missing;
- distribution obligations are unknown, pending, internally contradictory, or unsupported by stable evidence;
- required public notice/attribution artifacts are absent;
- resolved SPDX expression is invalid, deprecated, policy-rejected, or conflicts with its declared evidence;
- source/destination digests are malformed or inconsistent;
- import date is invalid;
- review state is pending/rejected;
- canonical immutable review evidence is absent;
- exact-head Diffciplane qualification is absent or stale;
- source import authority has not been separately established for the exact candidate.

Representability is never equivalent to authorization.

## Compatibility question 6 — v1 preservation

A safe implementation must preserve:

- all existing `schema_version = 1` parsing and diagnostics;
- all current valid v1 records as valid under exactly the same meaning;
- all current invalid v1 unresolved-license cases as invalid;
- v1 SPDX policy behavior;
- existing `.npmrc` import record semantics;
- current component/policy record behavior;
- deterministic ordering and diagnostics;
- current source-fact verification behavior.

No migration of existing v1 records is required merely to add v2 support.

`V1_MIGRATION_REQUIRED = FALSE`

`V1_SEMANTIC_REINTERPRETATION = PROHIBITED`

## Compatibility question 7 — future validator/test surface

If a later canonical action authorizes implementation, the smallest credible implementation surface is expected to include:

### Schemas

- `provenance/schema/v2/source-import.schema.json` — new only;
- v1 schema remains unchanged.

### Rust validation

- `tools/provenance/src/validation.rs` — dispatch source-import validation by `schema_version` and validate v2 structural rules;
- `tools/provenance/src/spdx_policy.rs` — validate v2 resolved/unresolved license-state semantics without allowing placeholder SPDX bypasses;
- `tools/provenance/src/restricted_policy.rs` — preserve permission scope checks and add only version-aware access necessary for v2;
- a narrowly scoped distribution-obligation validator module may be preferable to overloading SPDX or restricted-path logic;
- `tools/provenance/src/lib.rs` — register any new semantic validator module;
- `tools/provenance/src/notice.rs` — project v2 unresolved-license/private-permission source imports deterministically without exposing confidential terms;
- `tools/provenance/src/verify_source.rs` — expected to require no semantic change if upstream identity shape stays stable, but exact compatibility tests are required;
- `tools/provenance/src/claims.rs` / alignment modules — inspect and change only if exact tests prove version-sensitive assumptions.

### Fixtures/tests

At minimum:

- valid v2 resolved-SPDX source import;
- valid structural v2 unresolved-conflict + separate permission candidate that still remains non-import-ready when distribution obligations are unresolved;
- valid import-ready v2 separate-permission fixture only with complete permission scopes, obligations evidence, review metadata, and non-restricted path;
- missing permission artifact;
- malformed permission reference;
- insufficient permission scope;
- unresolved license without permission;
- unresolved license with a forbidden `spdx` field;
- resolved license without `spdx`;
- resolved SPDX/evidence conflict;
- `NONE`, `NOASSERTION`, custom `LicenseRef-*`, deprecated, unknown, and policy-rejected SPDX cases;
- unresolved distribution obligations;
- missing required notice artifact;
- restricted/denied path cases;
- v1 regression corpus unchanged;
- deterministic diagnostics and JSON output;
- deterministic NOTICE across input ordering;
- NOTICE confidentiality regression proving private permission text is never read or rendered;
- source verification for both v1 and v2 exact source facts;
- duplicate id/destination and repository-alignment regressions across mixed v1/v2 canonical sets;
- bounded-size and secure-I/O regressions remain effective.

## Compatibility question 8 — deterministic NOTICE

A future v2 NOTICE must not fabricate a license label for unresolved public license evidence.

For a separately permitted unresolved-license import, a safe deterministic public summary can contain only non-secret canonical facts, for example conceptually:

`rights: separate-permission | public-license: unresolved-conflict | permission: permission-artifact:<id>`

plus any separately required public attribution/notice artifact references.

The exact rendered wording is not authorized here.

Requirements:

- never render confidential permission text;
- never render unresolved public license evidence as a resolved SPDX expression;
- never omit required public attribution/license/notice artifacts merely because private permission exists;
- preserve stable sorting, escaping, UTF-8/LF output, byte determinism, secure reads, and drift checks.

## Compatibility question 9 — future exact repository change surface

A later implementation authorization should start from an exact canonical base and explicitly allow only the minimum proven set, expected to be a subset of:

- `provenance/schema/v2/source-import.schema.json`;
- `provenance/fixtures/**` for synthetic/versioned compatibility fixtures;
- `tools/provenance/src/validation.rs`;
- `tools/provenance/src/spdx_policy.rs`;
- `tools/provenance/src/restricted_policy.rs`;
- `tools/provenance/src/notice.rs`;
- `tools/provenance/src/lib.rs`;
- one narrowly scoped new distribution-obligation validator module if justified;
- exact focused tests under `tools/provenance/tests/**`;
- bounded documentation/specification bookkeeping;
- `NOTICE` only if canonical synthetic/real records at that implementation stage actually change its deterministic projection.

The implementation authorization must not include:

- `packages/prisma/schema.prisma`;
- any new `provenance/imports/**` real Documenso record;
- `packages/ee/**`;
- unrelated application/runtime code;
- dependency upgrades unless independently justified and authorized.

## Compatibility question 10 — qualification evidence for a future implementation

A later provenance amendment must require at minimum:

1. exact change-surface proof;
2. zero upstream product bytes;
3. JSON Schema/structural fixture validation for v1 and v2;
4. focused validator negative tests for every fail-closed state above;
5. full existing provenance test suite;
6. strict formatting/linting with no warnings under the pinned toolchain;
7. deterministic NOTICE generation/check;
8. offline/locked execution;
9. macOS/Windows compile or equivalent existing cross-target qualification if the implementation touches shared Rust code;
10. adversarial security/provenance review for authorization bypass, confidentiality leakage, downgrade, mixed-version duplicate handling, ambiguous-license promotion, and NOTICE omissions;
11. fresh independent substantive exact-head review;
12. zero unresolved material review threads;
13. unchanged expected base/head before guarded merge;
14. post-merge exact canonical verification.

No test result from a predecessor head may qualify a changed implementation head.

## Downgrade and mixed-version risks

A versioned implementation must explicitly prevent:

- interpreting a v2 record as v1 by dropping fields;
- converting unresolved v2 license evidence into a guessed v1 SPDX expression;
- duplicate record IDs across v1/v2 files;
- duplicate destinations across v1/v2 files;
- version-dependent repository alignment gaps;
- permission validation being skipped because one module sees an unknown version;
- NOTICE silently omitting a syntactically valid newer record;
- `verify-source` selecting an unvalidated duplicate record;
- tooling that validates only v1 while canonical directories contain v2.

Mixed-version validation therefore has to operate as one canonical set, not as isolated version silos.

## Current Prisma-candidate consequence

The compatibility analysis establishes that a safe versioned provenance representation is technically feasible without weakening v1.

It does **not** make the exact Prisma candidate import-ready today.

Two independent gates remain:

1. provenance v2 implementation does not exist and is not authorized by this analysis;
2. the private permission's complete non-secret distribution/notice obligations summary has not yet been canonically preserved.

Current candidate state:

`002B_PRIVATE_PERMISSION_RIGHTS_BASIS = ESTABLISHED_FOR_COPY_EXACT_DISTRIBUTION`

`002B_PUBLIC_LICENSE_EXPRESSION = UNRESOLVED`

`002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS = NOT_YET_CANONICALLY_RESOLVED`

`PROVENANCE_V2_COMPATIBILITY = FEASIBLE`

`PROVENANCE_V2_IMPLEMENTATION = ABSENT`

`PROVENANCE_MODEL_AMENDMENT_AUTHORITY = ABSENT`

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

`SOURCE_IMPORT_AUTHORITY = ABSENT`

`002B_IMPLEMENTATION_AUTHORITY = ABSENT`

`SPEC_003_SUCCESSOR_AUTHORITY = ABSENT`

## Successor-authority recommendation candidate

The next repository action should **not** be source import and should **not** directly implement v2 from this document alone.

Subject to independent substantive exact-head review and canonicalization of this analysis, the next bounded successor should be a separate governance authorization decision that determines whether to reopen/extend the closed Specification 001 provenance control plane for a v2 source-import compatibility amendment.

Candidate successor:

`NEXT_SUCCESSOR_CANDIDATE = PROVENANCE_V2_AMENDMENT_AUTHORITY_DECISION`

That decision must either:

- authorize a tightly bounded v2 implementation surface with the invariants/tests above; or
- keep the model unchanged and leave 002B blocked pending an exact public license clarification.

Separately, a complete non-secret public summary of private-permission distribution/notice obligations is required before the exact Prisma import could later become Stage R eligible even if v2 were implemented.

## Exact exclusions

This analysis does not:

- amend Specification 001;
- reopen Specification 001;
- authorize a v2 implementation;
- modify any provenance code/schema/policy;
- create any source-import record;
- import any upstream bytes;
- select an SPDX expression for the Prisma schema;
- infer that private permission has no distribution obligations;
- grant Stage R;
- grant source-import authority;
- authorize any other Prisma/Documenso path;
- authorize EE paths;
- authorize 002C–002H implementation;
- authorize Specification 003;
- create a new `S2-Txxx` identity.

## Qualification gate

Before this analysis can become canonical:

1. exact-head workflow/check accounting;
2. independent substantive exact-head review of the complete compatibility model;
3. reconciliation of every material finding;
4. zero unresolved material review threads;
5. unchanged canonical base and candidate head;
6. guarded expected-head merge;
7. post-merge verification;
8. fresh successor-authority analysis limited to the recommended authority-decision boundary.
