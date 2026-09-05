# Specification 002B — Provenance v2 Amendment Authorization

Status: `GOVERNANCE_AUTHORIZATION_CANDIDATE / ZERO_UPSTREAM_BYTES / NOT_YET_EFFECTIVE`
Issue: #5
Canonical predecessor: `ff6e756e6f655f1bbfac55de99eff064a08d5bee`

## Purpose

Record the separate governance decision recommended by canonical PR #64 and determine whether Signthos may extend the closed Specification 001 provenance control plane with a narrowly bounded, versioned v2 source-import representation.

This authorization candidate is governance-only. It changes no provenance implementation, schema, policy, NOTICE behavior, source-import record, upstream source byte, dependency, runtime, or product surface while it remains non-canonical.

## Canonical prerequisite evidence

Canonical PR #64 established, after independent substantive exact-head review:

- v1 cannot represent a private-permission rights basis with unresolved public license evidence without semantic mutation or a placeholder bypass;
- v1 semantics must remain unchanged;
- a versioned v2 source-import representation is technically feasible;
- public license evidence, private permission rights, distribution/notice obligations, and import authorization must remain distinct;
- private permission rights do not establish absence or completion of distribution/notice obligations;
- the exact Prisma candidate therefore remains non-import-ready;
- the next bounded successor candidate is this `PROVENANCE_V2_AMENDMENT_AUTHORITY_DECISION`.

Canonical evidence:

- PR #64 merge: `ff6e756e6f655f1bbfac55de99eff064a08d5bee`;
- exact reviewed head: `6b924d518c6e4ffd8900d12976d89fbb1c10952e`;
- independent review: `github:issue-comment:5552183956 = NO_MATERIAL_FINDINGS`;
- post-merge evidence: `github:issue-comment:5552199628`.

## Decision candidate

Subject to independent substantive exact-head review and guarded canonicalization of this authorization:

`PROVENANCE_V2_AMENDMENT_AUTHORITY = AUTHORIZED_BOUNDED_IMPLEMENTATION_AFTER_CANONICAL_EFFECTIVENESS`

The authority is limited to adding a versioned v2 source-import representation to the provenance control plane while preserving v1 semantics exactly.

This is a maintenance extension of the provenance machinery required by Specification 002. It does not reopen or rewrite the historical completion claims of Specification 001 v1, and it does not authorize any Documenso source import.

## v1 preservation contract

The implementation must preserve all of the following:

- `schema_version = 1` source-import schema semantics remain unchanged;
- existing valid v1 records remain valid with the same meaning;
- existing invalid v1 unresolved-license states remain invalid;
- v1 SPDX validation behavior remains fail-closed;
- the existing canonical `.npmrc` import record is not migrated or rewritten merely because v2 exists;
- no v1 record is automatically converted to v2;
- no v2 unresolved-license state may be downgraded to a guessed v1 SPDX expression;
- existing component/policy record semantics remain unchanged;
- current deterministic diagnostic ordering, secure I/O, source verification, and NOTICE behavior for v1 remain compatible.

`V1_MIGRATION_REQUIRED = FALSE`

`V1_SEMANTIC_REINTERPRETATION = PROHIBITED`

## Authorized v2 semantic contract

A future v2 source-import record may represent unresolved public license evidence only when the record keeps these domains independently explicit:

1. public license evidence/status;
2. separately preserved permission artifact and required scopes;
3. non-secret distribution/notice obligations evidence;
4. source/import/transformation identity;
5. immutable review evidence and import-ready authorization state.

Private permission must never supply, alias, imply, or fabricate an SPDX expression.

### Public license state

The implementation may define reviewed exact enum names equivalent to:

- resolved SPDX state — requires canonical SPDX expression and existing policy-equivalent validation;
- unresolved conflict — forbids an SPDX expression and requires sufficient stable public evidence of the conflict;
- unresolved unknown — forbids an SPDX expression and requires stable evidence for the unknown state.

Unresolved public license evidence may be structurally representable in v2, but it is never sufficient for import-ready state by itself.

### Permission state

For `classification = separate_permission_required`:

- canonical `permission-artifact:<id>` reference remains mandatory;
- exact permission scopes remain mandatory;
- permission scopes must cover the actual transformation and distribution action;
- existing restricted-path policy remains additive and fail-closed;
- missing/malformed/insufficient permission remains invalid.

### Distribution/notice obligations

A v2 source-import record with a private-permission rights basis must include an explicit non-secret representation proving the applicable distribution/notice obligations are resolved before import-ready state.

The implementation may define exact fields only if they preserve these invariants:

- rights scope is not treated as proof of obligations;
- confidential permission text is never required or rendered publicly;
- stable non-secret evidence references are required;
- required public attribution, notice, license-text, naming, disclosure, or equivalent artifacts must be explicitly represented when applicable;
- unresolved/unknown/contradictory obligations remain fail-closed;
- NOTICE projection must never imply that an unresolved public license became resolved.

For the current Prisma candidate:

`002B_PRIVATE_PERMISSION_DISTRIBUTION_OBLIGATIONS = NOT_YET_CANONICALLY_RESOLVED`

This authorization does not change that result.

## Exact implementation allowlist

Only after this authorization is canonical and its post-merge effectiveness is explicitly verified may one bounded implementation branch modify or create the following repository surfaces.

### Schema

- `provenance/schema/v2/source-import.schema.json` — new v2 schema only.

The existing `provenance/schema/v1/source-import.schema.json` is read-only and outside the implementation write allowlist.

### Synthetic fixtures

- `provenance/fixtures/v2/**` — new synthetic/non-upstream fixtures only.

No real Documenso byte or real Documenso source-import record is allowed under this fixture path.

### Provenance Rust implementation

- `tools/provenance/src/validation.rs`;
- `tools/provenance/src/spdx_policy.rs`;
- `tools/provenance/src/restricted_policy.rs`;
- `tools/provenance/src/notice.rs`;
- `tools/provenance/src/lib.rs`;
- `tools/provenance/src/distribution_obligations.rs` — new only if needed to keep obligations validation isolated;
- `tools/provenance/src/claims.rs` — only for mixed-version duplicate-id/destination correctness if focused tests prove a change is necessary;
- `tools/provenance/src/repository_alignment.rs` — only for mixed-version alignment correctness if focused tests prove a change is necessary;
- `tools/provenance/src/verify_source.rs` — only if exact v2 source-fact compatibility tests prove a change is necessary.

No other Rust source file is authorized.

### Tests

- `tools/provenance/tests/fixtures.rs`;
- `tools/provenance/tests/regressions.rs`;
- `tools/provenance/tests/restricted_policy.rs`;
- `tools/provenance/tests/spdx_policy.rs`;
- `tools/provenance/tests/notice.rs`;
- `tools/provenance/tests/verify_source.rs`;
- `tools/provenance/tests/v2_private_permission.rs` — new focused test file.

No test may depend on real Documenso source bytes or confidential permission text.

### Amendment/evidence documentation

- `specs/001-provenance-import-system/amendments/v2-private-permission.md` — new maintenance-amendment record preserving v1 closeout history;
- `specs/002-documenso-brownfield-baseline/authorization-provenance-v2-amendment.md` — evidence-only reconciliation after implementation if necessary;
- `specs/002-documenso-brownfield-baseline/002b-provenance-private-permission-compatibility.md` — read-only normative predecessor; no implementation rewrite;
- `specs/002-documenso-brownfield-baseline/tasks.md` — bookkeeping only if separately evidence-backed and without inventing `S2-T042`.

## Explicit implementation exclusions

The implementation authority does not allow changes to:

- `provenance/schema/v1/**`;
- existing canonical `provenance/imports/**` records;
- `NOTICE` itself unless a synthetic-only canonical fixture path unexpectedly affects the canonical projection, which must instead be treated as a material finding and resolved before merge;
- `Cargo.toml` / `Cargo.lock` or other dependency declarations;
- `.github/workflows/**` merely to manufacture a passing gate;
- `packages/prisma/schema.prisma`;
- any other `packages/prisma/**` path;
- any `packages/ee/**` path;
- any Documenso application/product source;
- any application/runtime/server/web/desktop/mobile code;
- Specification 003 implementation.

Dependency additions or upgrades are not authorized. The amendment must use the existing pinned provenance dependency graph.

## Required implementation behavior

A qualifying implementation must at minimum prove:

1. v1 behavior and fixtures are unchanged in meaning;
2. v2 resolved-SPDX records retain equivalent SPDX validation rigor;
3. v2 unresolved public-license states cannot carry or smuggle a guessed SPDX expression;
4. unresolved license without separately required permission fails closed;
5. missing/malformed/insufficient permission fails closed;
6. unresolved or incomplete distribution obligations fail closed;
7. applicable restricted-path rules remain fail-closed and additive;
8. review-pending/rejected or missing immutable review evidence remains non-import-ready;
9. representability does not create import authority;
10. mixed v1/v2 duplicate record IDs fail closed;
11. mixed v1/v2 duplicate destinations fail closed;
12. repository alignment is not weakened by version differences;
13. `verify-source` resolves exact source facts safely for both versions or explicitly rejects unsupported version state before any ambiguous lookup;
14. deterministic NOTICE includes every valid canonical v1/v2 record and cannot silently omit v2;
15. NOTICE never renders confidential permission text and never labels unresolved public license evidence as resolved SPDX;
16. byte-size, traversal/symlink, deterministic-output, and secure-I/O defenses remain intact;
17. validation of canonical directories cannot succeed merely because an unknown record version is skipped.

## Minimum negative-test matrix

The implementation must include synthetic tests for at least:

- valid v1 regression corpus unchanged;
- structurally valid v2 resolved-SPDX source import;
- v2 unresolved-conflict with separate permission but unresolved obligations => non-import-ready;
- v2 unresolved-conflict with complete synthetic permission and obligations evidence => structurally/semantically eligible only subject to normal review/authority metadata;
- unresolved license without permission;
- unresolved license carrying forbidden `spdx`;
- resolved license without `spdx`;
- resolved SPDX/evidence conflict;
- `NONE`, `NOASSERTION`, `LicenseRef-*`, deprecated, unknown, and policy-rejected SPDX cases;
- missing/malformed permission artifact;
- insufficient permission scope;
- unresolved/unknown/contradictory distribution obligations;
- missing required public notice/attribution artifact;
- restricted/denied path;
- mixed-version duplicate id;
- mixed-version duplicate destination;
- downgrade attempt by dropping v2 state;
- unknown schema version;
- NOTICE deterministic ordering with mixed versions;
- NOTICE confidentiality regression;
- source verification for v1 and v2 exact source facts;
- secure-I/O and size regressions remain effective.

## Required qualification flow

The implementation must follow Diffciplane exactly:

1. branch from the exact canonical post-authorization main only after authorization effectiveness is verified;
2. re-read Constitution, `AGENTS.md`, Specification 001 closeout, PR #64 compatibility analysis, this authorization, and Issue #5;
3. prove exact change surface stays inside the allowlist;
4. keep upstream-derived product bytes at zero;
5. run formatting and strict linting with the repository's pinned Rust toolchain;
6. run focused v2 tests;
7. run the complete existing provenance test suite;
8. run deterministic canonical provenance validation and NOTICE check;
9. run applicable offline/locked and cross-target qualification already required for shared provenance Rust changes;
10. obtain fresh independent substantive semantic/security/provenance review on the exact implementation head;
11. reconcile every material finding and rerun/re-review any changed exact head;
12. prove zero unresolved material review threads;
13. verify branch/ruleset/required-check state without treating unavailable/neutral providers as PASS;
14. merge only using exact `expected_head_sha` protection;
15. post-merge verify ancestry, tree equality, signature, exact canonical tests/checks, and v1/v2 invariants.

## Effectiveness rule

While this authorization candidate is not canonical:

- `PROVENANCE_V2_AMENDMENT_AUTHORITY = ABSENT`;
- no v2 implementation branch may be created from this decision;
- no provenance implementation/schema file may be modified under this candidate.

If and only if this exact authorization receives independent substantive exact-head review, reconciles every material finding, has zero unresolved material review threads, merges guarded from unchanged base/head, and passes post-merge verification, then the governance decision may become effective for the exact allowlist above.

A post-merge Issue #5 evidence record must explicitly state:

`PROVENANCE_V2_AMENDMENT_AUTHORITY = EFFECTIVE_BOUNDED_IMPLEMENTATION`

before the implementation branch is created.

## Non-grants

This authorization does not authorize:

- any upstream source import;
- any real v2 source-import record;
- Stage R for Prisma;
- resolving the Prisma SPDX conflict;
- inferring private-permission distribution obligations;
- modifying or redistributing Prisma bytes;
- `packages/ee/**`;
- 002C–002H implementation;
- Specification 003;
- credentials, providers, runtime deployment, or paid services;
- a new `S2-Txxx` task identity.

Even after a successful provenance v2 implementation, the exact Prisma candidate remains blocked until its complete non-secret distribution/notice obligations are genuinely evidenced and canonically qualified.