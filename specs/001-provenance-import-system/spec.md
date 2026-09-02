# Specification 001 — Provenance and Import System

Status: ACTIVE
Issue: #4
Authorized from canonical `main`: `2144b7765595a206e691f43aefd122aa5a150a1b`

## Problem

Signthos intends to reuse selected upstream source and ship third-party dependencies across server, web, desktop, mobile, CLI, SDK, verifier and optional processing surfaces. Without executable provenance controls, a later import can accidentally:

- enter from an unpinned upstream revision;
- cross a restricted/commercial path boundary;
- use an ambiguous or invalid license expression;
- rely on permission evidence whose scope does not cover the intended action;
- lose copyright/license notices;
- classify a derived copyleft file as permissive merely because it moved directories;
- ship a component whose package/binary license was never classified;
- produce a non-reproducible NOTICE file;
- make a mobile-distribution or compliance inference from incomplete metadata;
- make repository review depend on hidden chat/local evidence;
- appear structurally valid while lacking the canonical PR/reviewer authorization required for import.

Foundation 000 established the policy direction. Specification 001 turns that direction into versioned, testable, fail-closed repository machinery before any product-source import.

## Goal

Create a small, auditable, offline-by-default provenance system that can answer, for every future source import and shipped component:

1. exactly where it came from;
2. exactly which upstream revision and path supplied it;
3. which bytes are being classified;
4. which license/permission basis applies;
5. which rights are required by the intended transformation/distribution;
6. whether a restricted-path policy applies;
7. whether the destination classification is compatible with derivation evidence;
8. which notices/licenses must ship;
9. whether distribution-review gates remain pending;
10. which immutable Signthos PR and preserved review evidence authorize the import-ready record;
11. whether the repository state is valid enough to proceed.

The system must fail closed when any required answer is unknown, ambiguous, contradictory, malformed or unsupported.

## Authority

Specification 001 is authorized by canonical Foundation task `F0-T021`, independently reviewed and merged through PR #22, with post-merge verification recorded in PR #22 issue comment `5512563307`.

This authority covers only the provenance/import machinery and safe synthetic or clearly distributable fixtures required to qualify it.

It does **not** authorize:

- importing Documenso product/application source merely to test the tool;
- importing Documenso EE/commercial source;
- importing Stirling restricted source;
- relicensing any derived code without separate rights evidence;
- using credentials or paid external services;
- claiming App Store/Google Play compatibility;
- making compliance, legal-effect, AdES/QES or certification claims;
- authorizing Specification 002 merely because a provenance record is syntactically valid.

## Canonical inputs

- `.specify/memory/constitution.md`
- `AGENTS.md`
- `ROADMAP.md`
- `provenance/UPSTREAM.md`
- `docs/foundation/LICENSING-STRATEGY.md`
- `docs/foundation/MIGRATION-IMPORT-PLAN.md`
- `docs/foundation/EXTERNAL-SOURCES.md`
- Issue #4

When these sources conflict, the Constitution, active specification and live canonical repository evidence control. Unknown rights remain fail-closed.

## Scope in

### Contract and records

- versioned canonical source-import record schema;
- versioned component/dependency record schema;
- versioned restricted-path/policy schema;
- stable permission-scope vocabulary;
- stable transformation taxonomy;
- stable source-import review/authorization vocabulary;
- stable distribution-review metadata;
- machine-readable JSON Schema artifacts;
- deterministic canonical ordering rules.

### Validation

- strict structural validation;
- unknown-field rejection;
- SPDX expression parsing and policy validation;
- explicit rejection of ambiguous/deprecated shorthand such as bare `AGPL-3.0`;
- exact upstream commit validation;
- canonical repository/path validation;
- source/destination SHA-256 validation;
- strict Gregorian import-date validation;
- immutable pull-request identity and review-evidence validation for import-ready records;
- required permission-artifact and permission-scope checks;
- restricted-path deny/permission rules;
- derived-code reclassification checks;
- component/package/binary license classification checks;
- distribution-review gate checks;
- deterministic diagnostic identifiers and machine-readable output.

### Repository outputs

- standalone Rust provenance CLI under `tools/provenance/`;
- canonical provenance schemas/policies/registries under `provenance/`;
- deterministic `NOTICE` generation/checking;
- valid and invalid synthetic fixtures;
- GitHub Actions provenance gate;
- contributor/import workflow documentation.

## Scope out

- importing any Documenso application/product source;
- importing any Stirling product source;
- deciding the final Signthos server/web license before exact imported notices/rights exist;
- publishing confidential permission artifacts;
- automatically obtaining legal permission;
- automatically deciding copyright derivation from directory placement;
- network fetching of upstream repositories during normal validation;
- package vulnerability scanning beyond provenance/license metadata;
- SBOM generation beyond the component registry contract required by later release work;
- legal advice or mobile-store legal qualification;
- Specification 002 brownfield import itself.

## Canonical record format

### JSON, not YAML, for v1

Canonical v1 records use UTF-8 JSON.

Foundation examples used YAML only as a conceptual shape. Specification 001 deliberately chooses JSON because canonical import authorization benefits from:

- unambiguous primitive typing;
- simpler strict deserialization;
- straightforward unknown-field rejection;
- standard JSON Schema publication;
- reduced parser surface compared with YAML anchors, aliases and implicit typing;
- deterministic serialization for fixtures and generated artifacts.

YAML input is not accepted by the v1 validator. A future specification may add a non-canonical authoring format only if it round-trips to the canonical JSON model without semantic loss.

### Self-reference rule

A provenance record MUST NOT require the current Signthos commit SHA as a field whose value changes the same commit that contains the record. Such a contract is recursively self-referential and cannot be exact.

Instead, exact byte binding is established by:

- upstream repository + exact upstream commit;
- exact upstream path;
- source SHA-256 digest;
- exact destination path;
- destination SHA-256 digest for the reviewed candidate tree;
- immutable Signthos pull-request number;
- stable non-secret substantive review-evidence reference;
- exact-head qualification/re-evaluation evidence recorded by Diffciplane outside the self-referential file content.

A later post-merge evidence record may reference a merge commit without being used to define that commit's own content identity.

## Source-import record v1

Conceptual normalized shape:

```json
{
  "schema_version": 1,
  "kind": "source_import",
  "id": "U001-I0001",
  "classification": "oss_permitted",
  "upstream": {
    "repository": "owner/repository",
    "commit": "0123456789abcdef0123456789abcdef01234567",
    "path": "path/to/file",
    "sha256": "64-lowercase-hex",
    "copyright_holder": "Example Holder"
  },
  "license": {
    "spdx": "AGPL-3.0-only",
    "evidence": ["stable-evidence-reference"]
  },
  "permission": null,
  "import": {
    "destination": "path/in/signthos",
    "sha256": "64-lowercase-hex",
    "date": "2026-09-02"
  },
  "transformation": {
    "kind": "copied",
    "notes": "bounded description",
    "derives_from": []
  },
  "review": {
    "status": "qualified_exact_head",
    "pull_request": 123,
    "evidence": ["github:issue-comment:stable-review-evidence"]
  }
}
```

The exact committed JSON Schema is delivered by an implementation grain. This specification controls its required semantics.

## Source-import review and authorization binding

A source-import record is not import-ready merely because its source/license/permission fields are valid.

The v1 `review.status` controlled vocabulary is:

- `pending`
- `qualified_exact_head`
- `rejected`

Only `qualified_exact_head` is an import-authorizing state for canonical repository validation.

For every canonical source-import record:

- `review.pull_request` is required and MUST be a positive immutable GitHub pull-request number in the Signthos repository;
- `review.evidence` is required and MUST contain at least one stable, non-secret reference to substantive independent review evidence;
- `pending` fails canonical/import-ready validation;
- `rejected` fails canonical/import-ready validation;
- missing PR identity fails closed;
- missing/empty review evidence fails closed;
- a status string outside the controlled vocabulary fails closed;
- status presence never substitutes for evidence-dependent governance gates outside the record.

### Qualification handoff without self-reference

Later import PRs must use a two-stage exact-head flow so the record can preserve review evidence without a current-commit self-reference:

1. the import candidate is opened with its record in `pending` state and an immutable PR number;
2. independent substantive review evaluates that exact candidate/imported-byte head and emits stable review evidence;
3. a bounded manifest-only authorization amendment sets `review.status` to `qualified_exact_head` and records the review evidence reference, without changing imported destination bytes;
4. the new exact head receives independent re-evaluation of the authorization delta and proof that the reviewed imported destination bytes/digests are unchanged;
5. Diffciplane records final exact-head qualification outside the provenance record and merges with expected-head protection.

Canonical `validate` rejects `pending` and `rejected` records. A future workflow may provide a separately named prequalification structural command, but no permissive flag on canonical `validate` may silently turn pending authorization into PASS.

The validator does not claim that a string reference proves reviewer independence; canonical GitHub review/qualification evidence remains an external governance gate.

## Import date semantics

`import.date` is mandatory and represents the repository import action's calendar date.

The accepted canonical form is exactly `YYYY-MM-DD` with ASCII digits and zero-padded month/day.

The validator MUST perform semantic proleptic-Gregorian calendar validation, not merely regex or JSON Schema `format` annotation checking.

Rules include:

- year range `0001` through `9999`;
- month `01` through `12`;
- valid day count for the selected month/year;
- leap year when divisible by 4 except century years not divisible by 400;
- impossible dates fail;
- non-zero-padded forms fail;
- timestamps, time zones and trailing text fail.

Required fixtures include valid `2024-02-29` and invalid cases such as `2025-02-29`, `2026-13-01`, `2026-02-30`, `2026-2-01`, and `0000-01-01`.

JSON Schema may additionally use a date-oriented constraint, but executable Rust validation is required and authoritative for the semantic failure behavior.

## Required source classifications

The v1 controlled vocabulary is:

- `oss_permitted`
- `separate_permission_required`
- `restricted`
- `unknown`

Only `oss_permitted` may pass without a separate permission artifact.

`separate_permission_required` may pass only when an accepted permission reference and complete required permission scope are present.

`restricted` and `unknown` are import-denying classifications in v1.

## Transformation taxonomy

The v1 transformation vocabulary is:

- `copied`
- `adapted`
- `rewritten_with_source_reference`
- `generated_from_upstream`

`rewritten_with_source_reference` does not imply independent copyright. It remains derivation-sensitive and cannot be used to obtain a permissive classification automatically.

Purely independently authored work with no copied/adapted upstream source is outside the source-import record and belongs in component/package provenance when relevant.

## Permission model

A public provenance record may contain a stable non-secret permission-artifact identifier but MUST NOT require publication of confidential documents.

The controlled v1 permission-scope vocabulary includes:

- `copy`
- `modify`
- `create_derivative`
- `redistribute`
- `publish_source`
- `sublicense`
- `relicense`
- `commercial_use`

The validator derives minimum required scopes from the transformation and declared destination/distribution treatment. A record fails when the evidence scope is missing any required right.

Directory placement, repository ownership, private-repository access or founder conversational approval cannot synthesize missing permission scope.

## SPDX policy

The validator MUST use a maintained SPDX expression parser rather than a handwritten license grammar.

The implementation baseline is Rust with the maintained `spdx` crate family, exact version/checksum/license pinned by the bootstrap grain before code is merged.

Validation rules include:

- syntactically invalid expressions fail;
- unknown SPDX identifiers fail;
- ambiguous/deprecated shorthand prohibited by Signthos policy fails even if a parser can technically recognize it;
- bare `AGPL-3.0` fails;
- `-only` versus `-or-later` must be explicit where SPDX defines that distinction;
- custom/non-SPDX terms cannot authorize source import in v1 merely through a `LicenseRef-*` string;
- conflicting license evidence fails closed.

## Repository and path identity

Every source-import record MUST use:

- canonical repository identity;
- exact 40-character lowercase hexadecimal Git commit object id for v1;
- normalized relative POSIX upstream path;
- normalized relative POSIX destination path;
- SHA-256 digest for source bytes;
- SHA-256 digest for destination bytes;
- strict canonical import date;
- immutable pull-request identity and import-ready review evidence.

Reject:

- branch names as commit identity;
- abbreviated SHAs;
- absolute paths;
- `..` traversal;
- empty segments where ambiguous;
- Windows backslash aliases in canonical records;
- paths that normalize to a different semantic target;
- unreviewed symlink traversal when validating destination files.

A future schema version may add support for a different Git object-id format only through an explicit versioned contract change; v1 does not silently reinterpret object-id length.

## Offline source attestation

Normal validation performs no network requests.

An explicit `verify-source` operation may inspect a locally supplied upstream checkout and MUST verify, fail-closed:

- local Git HEAD equals the manifest's exact upstream commit;
- repository identity matches an allowed canonical repository identity;
- each declared upstream path exists at that revision;
- source SHA-256 digests match.

The implementation may invoke the locally installed `git` executable behind a testable process boundary rather than adding a native Git library dependency. Network fetch/clone remains outside the validator.

Tests use synthetic local Git fixtures; they do not require Documenso or Stirling source.

## Restricted-path policy

Restricted-path policy is data, not scattered hard-coded conditionals.

A versioned policy record maps canonical repository identities and normalized path patterns to one of:

- `allow_with_license_evidence`
- `require_permission`
- `deny`
- `unknown_deny`

Known Foundation restrictions for Documenso EE/commercial and Stirling separately licensed paths are represented as initial policy inputs, but exact future import snapshots must be revalidated by Specification 002 before use.

Unknown repository/path classification fails closed.

Pattern matching semantics must be documented and deterministic. Records may not use path patterns to weaken a more-specific deny rule.

## Component/dependency registry

Every shipped or build-critical package/crate/binary introduced by Specification 001 must itself be classified before Spec 001 closes.

A component record includes at minimum:

- stable component id;
- ecosystem/type;
- package/component name;
- exact version or immutable revision;
- source repository when known;
- package checksum or binary SHA-256 when applicable;
- SPDX expression or explicit restricted/custom classification;
- license evidence references;
- bundled/native/WASM/binary provenance where applicable;
- distribution surfaces;
- notice requirement;
- derivation/origin record ids where applicable;
- distribution-review state.

The provenance tool must bootstrap honestly: its initial Rust dependency inventory is manually reviewed and recorded before the validator can be used to validate its own registry. Once the validator exists, CI validates the same bootstrap records using the tool itself.

## Derived-code reclassification guard

A destination component/file cannot become permissively classified merely because it moves into a package, SDK, native directory or new repository boundary.

If a source-import or component record derives from copyleft/restricted material, a less restrictive destination classification requires explicit relicensing/permission evidence whose scope covers the actual change.

The guard operates on explicit provenance relationships and evidence. It does not pretend to make a legal determination about derivation absent those records; uncertainty blocks reclassification.

## Distribution review metadata

Component records may declare distribution surfaces such as:

- `server`
- `web`
- `desktop_direct`
- `desktop_store`
- `ios_app_store`
- `android_play`
- `sdk`
- `embed`
- `cli`
- `worker`

For policy-gated surfaces, the state is one of:

- `not_applicable`
- `pending`
- `approved_with_evidence`
- `blocked`

`approved_with_evidence` requires stable evidence references. The validator never infers App Store/Google Play compatibility from an SPDX expression alone.

## Deterministic NOTICE

NOTICE generation consumes only validated canonical records.

Determinism requirements:

- UTF-8;
- LF line endings;
- stable sorting by canonical component/import identity;
- no current timestamp;
- no absolute local paths;
- no network-derived mutable text;
- fixed templates/version;
- identical validated input produces byte-identical output.

`notice --check` fails when the committed NOTICE differs from generated output.

NOTICE generation does not replace required full license texts or package-specific attribution files.

## CLI contract

The standalone tool package is `tools/provenance/`.

The product-facing name is `signthos-provenance`.

Required v1 commands:

```text
signthos-provenance validate
signthos-provenance validate --json
signthos-provenance verify-source --record <id> --source-root <path>
signthos-provenance notice
signthos-provenance notice --check
signthos-provenance explain <id>
```

Required exit-code contract:

- `0` — requested operation succeeded and provenance is valid/import-ready for commands whose contract requires readiness;
- `1` — provenance/policy/authorization validation failed;
- `2` — CLI usage error;
- `3` — required local I/O/tooling/input unavailable;
- `4` — internal invariant failure.

Diagnostics have stable machine-readable codes independent of human wording.

## Parser and resource safety

All provenance inputs are untrusted repository input.

The validator must:

- impose a per-record byte limit;
- impose a bounded total input size for a validation run;
- use strict typed deserialization with unknown-field rejection;
- reject malformed UTF-8/JSON;
- reject duplicate semantic identities;
- reject duplicate destination claims unless an explicit later version defines safe composition;
- avoid following unreviewed symlinks outside the repository root;
- never execute content from provenance records;
- never make network requests during normal validation;
- avoid printing confidential permission material;
- keep JSON diagnostic output free of host-specific absolute paths where deterministic output is required.

## Error model

Every validation failure maps to a stable code. Initial required families include:

- `SCHEMA_*`
- `SPDX_*`
- `SOURCE_*`
- `PATH_*`
- `DIGEST_*`
- `DATE_*`
- `REVIEW_*`
- `PERMISSION_*`
- `RESTRICTED_PATH_*`
- `COMPONENT_*`
- `DERIVATION_*`
- `DISTRIBUTION_*`
- `NOTICE_*`
- `IO_*`
- `INTERNAL_*`

Multiple independent validation errors should be accumulated and emitted in deterministic order where safe, rather than stopping at the first field error.

## Canonical repository layout target

```text
provenance/
  UPSTREAM.md
  schema/v1/
    source-import.schema.json
    component.schema.json
    policy.schema.json
  policy/
    restricted-paths.json
    license-policy.json
  imports/
    README.md
  components/
    registry.json
  permissions/
    README.md
  fixtures/
    valid/
    invalid/
tools/
  provenance/
    Cargo.toml
    Cargo.lock
    src/
    tests/
.github/workflows/
  provenance.yml
NOTICE
```

Exact files are introduced only by their dependency-ordered tasks. This layout does not authorize importing product source.

## Acceptance criteria

Specification 001 cannot close until all of the following are observed on the exact candidate lineage:

1. canonical v1 schemas exist and reject incomplete/unknown fields;
2. canonical JSON records round-trip deterministically where serialization is exposed;
3. SPDX expressions are validated with a maintained parser and Signthos policy;
4. bare `AGPL-3.0` fails;
5. exact 40-character upstream Git object id and normalized paths are mandatory in v1;
6. source/destination SHA-256 mismatches fail;
7. `import.date` is semantically validated as canonical proleptic-Gregorian `YYYY-MM-DD`, including leap-day and impossible-date tests;
8. canonical source-import validation requires `review.status=qualified_exact_head`, a positive immutable PR number, and non-empty stable non-secret review evidence;
9. pending, rejected, missing-review-evidence and missing-PR records fail canonical/import-ready validation;
10. restricted/commercial path records fail without sufficient accepted permission evidence/scope;
11. `restricted` and `unknown` classifications cannot authorize import;
12. derived copyleft/restricted material cannot be relabeled permissive without explicit relicensing evidence;
13. component/package/binary records are validated, including the provenance tool's own dependencies;
14. distribution-review `pending`/`blocked` cannot be represented as approved;
15. NOTICE generation is byte-deterministic and `notice --check` detects drift;
16. source drift can be detected against a synthetic local Git checkout without network access;
17. malformed/oversized/traversal/symlink fixtures fail safely;
18. valid and invalid fixture corpus is versioned and distributable;
19. CI runs the validator and deterministic NOTICE check on the exact head;
20. no unauthorized product-source import is present;
21. independent substantive exact-head review completes with all findings reconciled;
22. exact-head qualification records tests/CI accurately;
23. merge uses expected-head protection;
24. canonical `main` passes post-merge verification;
25. successor authority for Specification 002 is determined separately after closeout.

## Non-goals and claim boundaries

Passing the provenance validator means the repository satisfies the encoded Signthos engineering policy for the records under validation. It is not legal advice and does not independently prove copyright ownership, enforceability of a private permission document, reviewer independence from a string reference, app-store legal compatibility, regulatory compliance or legal effect.

The validator must never turn unknown external/legal facts into `PASS` merely because required fields are syntactically present.
