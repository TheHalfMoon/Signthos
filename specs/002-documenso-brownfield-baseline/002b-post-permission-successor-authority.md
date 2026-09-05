# Specification 002B — Post-Permission Successor Authority Analysis

Status: `SUCCESSOR_AUTHORITY_CANDIDATE / PLANNING_EVIDENCE_ONLY / ZERO_UPSTREAM_BYTES / NO_IMPORT_AUTHORITY`
Issue: #5
Canonical base: `ec0dc45c01af263996a5fdf096fd01123293820c`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Perform the fresh successor-authority analysis required after canonical PR #62 and determine the next dependency-ordered repository unit without inflating authority.

This document is Signthos-authored planning/evidence only. It imports zero upstream-derived bytes, creates zero source-import records, changes no provenance schema/validator/policy, executes no Prisma/database/runtime/provider behavior, and grants no Stage R or product-source import authority.

## Canonical predecessor

PR #62 is canonical at merge `ec0dc45c01af263996a5fdf096fd01123293820c`.

Its exact reviewed result establishes:

- `002B_PRISMA_SCHEMA_PERMISSION_ARTIFACT = permission-artifact:documenso-signthos-private-v1`;
- private evidence intake `github:issue-comment:5552033420`;
- `002B_PRISMA_SCHEMA_PERMISSION_SCOPE = copy,redistribute,publish_source`;
- `002B_PRISMA_SCHEMA_SEPARATE_RIGHTS_BASIS = ESTABLISHED_FOR_COPY_EXACT_DISTRIBUTION`;
- public license evidence remains `CONFLICT_UNRESOLVED_AGPL_3_0_VS_PACKAGE_MIT`;
- `002B_PRISMA_SCHEMA_IMPORT_LICENSE_EXPRESSION = UNRESOLVED`;
- `PROVENANCE_V1_RECORD_ELIGIBILITY = BLOCKED_UNRESOLVED_LICENSE_EXPRESSION`;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `002B_IMPLEMENTATION_AUTHORITY = ABSENT`.

PR #62 did not amend Specification 001 and explicitly required fresh successor-authority analysis before any provenance-model change.

## Controlling governance

### Constitution

The Constitution requires provenance before import, fail-closed ambiguous/conflicting rights handling, exact-head qualification, independent substantive review, no authority inflation, and bounded recursively refined implementation units.

General founder approval covers ordinary work inside the canonical bounded roadmap but does not waive separately required rights/evidence/review gates.

### Specification 002

Issue #5 remains planning-authorized. Canonical Specification 002 states that failure or uncertainty blocks the affected import without blocking unrelated planning.

Specification 002's Stage Q model expressly permits Signthos-authored qualification/evidence documents while prohibiting upstream-derived bytes and source-import records until a later Stage R authorization.

The current blocker is no longer absence of copying/publication permission. It is that the canonical provenance machinery cannot honestly encode an import-ready record for this exact separately permitted path while its public SPDX expression remains unresolved.

### Specification 001

Specification 001 is `CLOSED_CANONICAL` in its canonical task ledger.

Its original Foundation authorization covers only provenance/import machinery and safe qualification fixtures. It does not authorize Documenso product-source import.

The v1 model deliberately requires an SPDX expression and fails closed on conflicting/unknown license evidence. The implemented validator rejects unresolved SPDX states and does not allow custom `LicenseRef-*` values to create source-import authority.

No canonical artifact found by this analysis states that closing Specification 001 permanently forbids later maintenance of the provenance machinery. However, `CLOSED_CANONICAL` also cannot be treated as implicit authorization to mutate a predecessor control plane without a new bounded, reviewed authority decision.

## Candidate alternatives

### Alternative A — continue waiting only for public license-expression clarification

A later first-party Documenso clarification could resolve the exact schema/package SPDX classification without changing Signthos provenance machinery.

This remains valid but is externally dependent and does not use the now-established private permission basis.

Result:

`ALT_A = VALID_EXTERNAL_REENTRY_PATH / NOT_REPOSITORY_EXECUTABLE_NOW`

### Alternative B — bypass v1 with `MIT`, AGPL, `NOASSERTION`, or `LicenseRef-*`

Rejected.

- `MIT` would reintroduce the exact material finding already rejected in PR #62.
- AGPL would also select a conflicting public signal without exact-path clarification.
- `NOASSERTION`/`NONE` are deliberately unresolved and rejected by the validator.
- `LicenseRef-*` cannot be used as a permission substitute or invented file-license classification.

Result:

`ALT_B = REJECTED_POLICY_BYPASS`

### Alternative C — import without a canonical source-import record because private permission exists

Rejected.

The Constitution and Specification 001 require canonical provenance before import. Private permission satisfies a rights dependency; it does not waive provenance machinery.

Result:

`ALT_C = REJECTED_PROVENANCE_BYPASS`

### Alternative D — directly edit Specification 001 schemas/validator now

Not currently authorized by PR #62.

Direct implementation would skip the required analysis of representation semantics, migration compatibility, failure modes, notice obligations, review evidence, and exact implementation surface.

Result:

`ALT_D = BLOCKED_PENDING_BOUNDED_COMPATIBILITY_ANALYSIS_AND_SEPARATE_IMPLEMENTATION_AUTHORITY`

### Alternative E — perform a planning/evidence-only provenance compatibility analysis

This unit can be performed without changing Specification 001, importing upstream bytes, creating source-import records, or granting import authority.

It is directly responsive to the canonical PR #62 successor question and remains within Issue #5 planning/evidence authority.

The analysis can determine whether a versioned provenance representation can safely distinguish:

1. public license evidence/classification;
2. independently preserved private permission as the actual rights basis for an action;
3. required distribution/notice obligations;
4. unresolved public SPDX state;
5. import authorization state;
6. backwards compatibility for existing v1 records and validators.

Result:

`ALT_E = AUTHORIZED_PLANNING_EVIDENCE_SUCCESSOR_CANDIDATE`

## Authority determination candidate

Subject to independent substantive exact-head review and canonicalization of this document:

`NEXT_AUTHORIZED_UNIT = PLANNING_ONLY_PROVENANCE_PRIVATE_PERMISSION_COMPATIBILITY_ANALYSIS`

The next unit is limited to a Signthos-authored analysis document. It may inspect canonical Specification 001 schemas, validators, fixtures, policies, docs, and already-preserved private-permission evidence. It may propose a versioned data model and implementation boundary.

It must not:

- modify Specification 001 schema or validator code;
- change current provenance policies;
- create a source-import record;
- import any Documenso source bytes;
- select a license expression for `packages/prisma/schema.prisma`;
- grant Stage R;
- grant source-import authority;
- alter existing v1 record meaning;
- authorize `packages/ee/**`;
- start 002C–002H implementation;
- authorize Specification 003.

## Compatibility-analysis required questions

The next planning-only unit must answer at minimum:

1. Can canonical provenance represent a source file whose reuse is authorized by a separately preserved private permission while public license metadata remains conflicting or unresolved?
2. If yes, should this be a versioned v2 source-import schema, a backwards-compatible additive version, or a distinct authorization-basis envelope around v1?
3. How are `license evidence`, `license expression`, and `permission rights basis` kept semantically distinct so private permission never becomes a fabricated SPDX classification?
4. What exact fields are required to preserve non-secret permission identity, scope, source/destination digests, transformation, review evidence, notices, and distribution obligations?
5. What states remain fail-closed?
6. How are existing v1 records preserved without semantic reinterpretation?
7. What validator changes and negative fixtures would be required if implementation is later authorized?
8. How does deterministic NOTICE generation represent separately permitted source without exposing confidential terms or asserting a false public license?
9. Which exact repository paths would a future implementation amendment need to touch?
10. What independent semantic/security/provenance tests would prove no permission or license bypass is introduced?

## Expected compatibility invariants

The planning analysis must preserve these invariants unless a later separately reviewed canonical amendment explicitly changes them:

- private permission never implies an SPDX license expression;
- unresolved public license evidence remains visible and is never rewritten as resolved;
- permission scope must cover every actual transformation/distribution action;
- a record lacking required permission evidence remains invalid;
- a restricted path remains fail-closed absent exact accepted permission;
- existing v1 records remain valid under their original semantics;
- existing imported bytes are never reclassified by migration alone;
- review and exact-head qualification remain mandatory before import-ready state;
- confidential permission text remains outside the public repository;
- deterministic NOTICE output must not disclose confidential permission terms;
- no source import becomes eligible merely because a schema can represent it.

## Why this is planning rather than implementation authority

The next unit determines whether the provenance machinery should evolve and, if so, defines the smallest safe versioned change. It cannot itself mutate the control plane.

A later implementation would require a separate canonical authorization that names:

- the exact provenance amendment/version;
- exact repository change surface;
- backwards-compatibility contract;
- validator and NOTICE behavior;
- test/fixture requirements;
- exact-head CI requirements;
- independent substantive review requirements;
- migration/non-migration behavior for existing records.

Only after such an amendment is implemented, qualified, merged, post-merge verified, and then separately applied to the exact Prisma candidate could Stage R eligibility be reconsidered.

## Current execution frontier candidate

If this successor-authority analysis becomes canonical:

- `002B_PRIVATE_PERMISSION_RIGHTS_BASIS = ESTABLISHED_FOR_COPY_EXACT_DISTRIBUTION`;
- `002B_PUBLIC_LICENSE_EXPRESSION = UNRESOLVED`;
- `PROVENANCE_V1_RECORD_ELIGIBILITY = BLOCKED_UNRESOLVED_LICENSE_EXPRESSION`;
- `NEXT_AUTHORIZED_UNIT = PLANNING_ONLY_PROVENANCE_PRIVATE_PERMISSION_COMPATIBILITY_ANALYSIS`;
- `PROVENANCE_MODEL_AMENDMENT_AUTHORITY = ABSENT`;
- `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- `SOURCE_IMPORT_AUTHORITY = ABSENT`;
- `002B_IMPLEMENTATION_AUTHORITY = ABSENT`;
- `SPEC_003_SUCCESSOR_AUTHORITY = ABSENT`.

No new `S2-Txxx` identity is created by this analysis.

## Qualification gate

Before this candidate may become canonical it requires:

1. exact-head workflow/check accounting;
2. fresh independent substantive exact-head review;
3. reconciliation of every material finding;
4. zero unresolved material review threads;
5. unchanged base/head before merge;
6. guarded merge with exact `expected_head_sha`;
7. post-merge verification.

Until then, no successor unit may infer authority from this candidate.