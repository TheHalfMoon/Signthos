# Specification 001 — Implementation Plan

Status: SHAPING_PENDING_REVIEW
Issue: #4
Canonical authorization base: `2144b7765595a206e691f43aefd122aa5a150a1b`

## 1. Execution objective

Deliver a small standalone provenance subsystem that makes future source import auditable and fail-closed before Specification 002 is allowed to import product code.

The implementation sequence is intentionally narrower than the full Signthos product architecture. Specification 001 creates repository control-plane tooling only. It does not create the web app, server, database, desktop shell, mobile app, signing engine or PDF engine.

## 2. Architectural decisions

### 2.1 Standalone Rust tool

The validator lives in `tools/provenance/` as a standalone Rust package named `signthos-provenance`.

Reasons:

- deterministic single-binary CI usage;
- strict typed models;
- cross-platform execution for Linux, macOS and Windows;
- no coupling to a future Documenso-derived JavaScript workspace;
- offline-by-default operation;
- easy exact-version dependency locking with `Cargo.lock`.

The tool is not a production runtime dependency of Signthos product code.

### 2.2 Canonical JSON records

Canonical provenance records are UTF-8 JSON. JSON Schema artifacts document the public record contract, while Rust typed deserialization is authoritative for executable validation.

The parser must reject unknown fields. YAML is not accepted in v1.

### 2.3 Maintained SPDX parser

Do not hand-write SPDX grammar.

The implementation baseline is the maintained Embark Studios `spdx` crate family. Current upstream projects `cargo-deny` and `cargo-about` use `spdx` 0.13, which is a suitable candidate baseline, but the bootstrap task must pin the exact crate version/checksum/license in `Cargo.lock` and the component registry before merge.

No dependency version named in this plan is authority by itself; live package metadata and lockfile evidence at the implementation head control.

### 2.4 Minimal dependency posture

Prefer Rust standard library plus a small dependency set:

- `serde` / `serde_json` for strict canonical records;
- `clap` for CLI parsing;
- `spdx` for SPDX expression parsing;
- `sha2` for SHA-256;
- `thiserror` only if typed error ergonomics materially improve clarity;
- test-only crates only when they reduce fixture/process-test risk.

Do not add network clients, async runtimes, native Git libraries, databases, template engines or web frameworks unless a later task demonstrates necessity and expands authority explicitly.

### 2.5 Local Git process boundary

`verify-source` may invoke the locally installed `git` executable through an isolated process adapter. It may inspect only a caller-supplied local checkout.

Normal validation must not fetch, clone or contact GitHub.

### 2.6 Deterministic output

Machine-readable validation output and NOTICE generation must be deterministic:

- stable sorting;
- no timestamps in generated NOTICE;
- no host-specific absolute paths in deterministic output;
- stable error codes;
- LF line endings;
- byte-identical output from byte-identical validated inputs.

## 3. Repository target surface

Specification 001 may ultimately modify only these top-level surfaces unless the task ledger is explicitly amended and independently reviewed:

```text
specs/001-provenance-import-system/
provenance/
tools/provenance/
.github/workflows/provenance.yml
NOTICE
AGENTS.md                 # only if contributor execution rules require Spec 001-specific amendment
README.md                 # only for bounded provenance contributor entry-point documentation
```

No product application source directory is authorized.

## 4. Dependency-ordered grains

### Grain A — shaping

Purpose:

- establish the canonical specification, plan and task ledger;
- record architecture choices, security boundaries and task allowlists;
- obtain independent semantic review before implementation.

Allowed paths:

- `specs/001-provenance-import-system/spec.md`
- `specs/001-provenance-import-system/plan.md`
- `specs/001-provenance-import-system/tasks.md`
- Issue #4 metadata/comments

No runtime/tooling/dependency changes are allowed in this grain.

### Grain B — Rust/bootstrap and component provenance

Purpose:

- create `tools/provenance/` Rust package;
- pin Rust edition/MSRV candidate and exact dependency lockfile;
- manually establish bootstrap component records for every direct/transitive dependency used by the tool;
- create minimal CLI shell and exit-code contract tests.

Allowed paths:

- `tools/provenance/**`
- `provenance/components/**`
- `provenance/schema/v1/component.schema.json`
- `provenance/fixtures/**` only for bootstrap component fixtures
- `specs/001-provenance-import-system/tasks.md` only for evidence bookkeeping when appropriate

No source-import records or upstream product code.

### Grain C — canonical schemas and strict record loading

Purpose:

- implement source-import, component and policy Rust models;
- add JSON Schema artifacts;
- reject unknown/malformed/oversized records;
- enforce stable identities, normalized paths and exact SHA/digest shapes.

Allowed paths:

- `tools/provenance/**`
- `provenance/schema/v1/**`
- `provenance/fixtures/**`
- `specs/001-provenance-import-system/tasks.md` for evidence bookkeeping

### Grain D — SPDX and license policy

Purpose:

- parse SPDX using maintained library;
- enforce Signthos policy rules such as rejection of bare `AGPL-3.0`;
- define explicit policy for custom/non-SPDX terms and unknown licenses;
- add deterministic diagnostics and fixtures.

Allowed paths:

- `tools/provenance/**`
- `provenance/policy/license-policy.json`
- `provenance/fixtures/**`
- `provenance/components/**` when bootstrap records need exact license evidence reconciliation

### Grain E — restricted-path and permission-scope enforcement

Purpose:

- create versioned path policy data;
- implement deterministic specificity/deny precedence;
- require accepted permission references/scopes when policy demands them;
- preserve confidential-artifact references without storing secret documents;
- encode Foundation-known Documenso EE and Stirling restricted boundaries as fail-closed policy data only.

Allowed paths:

- `tools/provenance/**`
- `provenance/policy/**`
- `provenance/permissions/README.md`
- `provenance/fixtures/**`

Explicit prohibition:

- no Documenso or Stirling product source may be copied into fixtures.

### Grain F — derivation and distribution guards

Purpose:

- prevent permissive reclassification of explicit copyleft/restricted derivations without relicensing evidence;
- validate component distribution surfaces and pending/blocked review states;
- prove that directory/package placement cannot override provenance relationships.

Allowed paths:

- `tools/provenance/**`
- `provenance/schema/v1/**` only if the already-approved schema needs a compatible bounded refinement;
- `provenance/policy/**`
- `provenance/fixtures/**`

### Grain G — deterministic NOTICE

Purpose:

- generate NOTICE from validated records;
- provide `notice` and `notice --check`;
- prove byte determinism and drift detection.

Allowed paths:

- `tools/provenance/**`
- `provenance/components/**`
- `provenance/fixtures/**`
- `NOTICE`

No full license text is invented by the generator. Required license texts remain separate explicit repository artifacts in a later authorized task if/when actual components require them.

### Grain H — offline local source verification

Purpose:

- implement `verify-source` against a caller-supplied local Git checkout;
- verify exact HEAD, repository identity, path existence and source SHA-256;
- test with synthetic temporary Git repositories only.

Allowed paths:

- `tools/provenance/**`
- `provenance/fixtures/**`

No network access and no real Documenso/Stirling checkout is required or authorized.

### Grain I — repository integration and CI

Purpose:

- add canonical root validation command documentation;
- add `.github/workflows/provenance.yml`;
- run formatting, lint, tests, validator self-check and NOTICE drift check;
- bind CI evidence to exact candidate head.

Allowed paths:

- `.github/workflows/provenance.yml`
- `tools/provenance/**`
- `provenance/**`
- `NOTICE`
- `README.md` or `AGENTS.md` only for bounded invocation/contributor instructions

The workflow must not require secrets, paid services or network access beyond ordinary GitHub-hosted runner dependency installation/cache behavior.

### Grain J — closeout

Purpose:

- reconcile the complete Spec 001 surface;
- prove no unauthorized product source entered the repository;
- obtain independent substantive review of the exact candidate;
- resolve all review threads;
- record tests/CI accurately;
- merge with expected-head protection;
- post-merge verify canonical `main`;
- determine separately whether Specification 002 receives successor authority.

Allowed paths before final merge:

- Spec 001 evidence/task bookkeeping only unless a genuine defect requires reopening the owning implementation grain.

## 5. Test strategy

### 5.1 Unit tests

Cover pure validation functions:

- schema/model constraints;
- path normalization;
- SHA-1 commit-shape validation;
- SHA-256 digest validation;
- SPDX policy;
- permission scope closure;
- restricted-path precedence;
- derivation/reclassification rules;
- distribution state rules;
- deterministic sort and diagnostic ordering.

### 5.2 Fixture tests

Versioned `provenance/fixtures/valid` and `provenance/fixtures/invalid` cases must include:

- minimal valid OSS import;
- valid separate-permission record using a non-secret evidence id;
- missing required field;
- unknown field;
- malformed JSON;
- oversized record;
- abbreviated commit SHA;
- uppercase/non-canonical digest;
- absolute/traversal/backslash path;
- bare `AGPL-3.0`;
- unknown SPDX id;
- `restricted` and `unknown` import classifications;
- required permission with missing artifact;
- incomplete permission scope;
- more-specific deny overriding broad allow;
- attempted permissive reclassification of a copyleft derivation;
- pending/blocked distribution review represented correctly;
- duplicate import id;
- duplicate destination claim;
- deterministic NOTICE input/output.

Fixtures must be synthetic or clearly distributable. They must not embed copied product-source content from Documenso or Stirling.

### 5.3 Process/CLI tests

Exercise:

- exit codes 0–4;
- `validate` human output;
- `validate --json` deterministic output;
- `notice` and `notice --check`;
- `explain <id>`;
- `verify-source` with synthetic local Git repositories;
- missing `git`/missing source-root behavior as local-tooling error, not policy PASS.

### 5.4 Security/resource tests

Cover:

- byte limits;
- symlink escape rejection;
- no command interpretation from record strings;
- deterministic treatment of unusual Unicode/path input;
- no permission secret content in diagnostics;
- no absolute host paths in deterministic JSON output.

## 6. CI qualification target

The final provenance workflow should run, at minimum:

```text
cargo fmt --manifest-path tools/provenance/Cargo.toml -- --check
cargo clippy --manifest-path tools/provenance/Cargo.toml --all-targets --all-features -- -D warnings
cargo test --manifest-path tools/provenance/Cargo.toml --all-features
cargo run --locked --manifest-path tools/provenance/Cargo.toml -- validate
cargo run --locked --manifest-path tools/provenance/Cargo.toml -- notice --check
```

If the exact CLI syntax changes during implementation, the canonical task ledger and workflow must remain aligned.

A green workflow is necessary but is not a substitute for independent semantic review.

## 7. Dependency provenance bootstrap rule

The provenance tool cannot rely on itself before it exists.

Therefore Grain B must manually inspect and record the exact locked Rust dependency graph used by `signthos-provenance`. That bootstrap review is evidence-bearing work, not an exception to provenance policy.

After the validator is functional, the same component records must validate under the tool and CI. Any unresolved dependency license becomes fail-closed for Spec 001 closeout.

## 8. External dependency evidence posture

Current public evidence supports the architectural candidate that Embark Studios' `spdx` crate is actively used by `cargo-deny` and `cargo-about` for SPDX expression parsing. Exact versions, checksums and license classifications are deliberately deferred to Grain B's live lockfile review.

Do not cite mutable crate popularity or version numbers as long-lived authority. The committed lockfile and component records are the release-relevant evidence.

## 9. No hidden legal inference

The validator enforces encoded engineering policy. It must distinguish:

- syntactic validity;
- repository policy validity;
- preserved evidence references;
- external/legal facts that remain unverified.

A syntactically complete record cannot turn an unknown legal right into an approved right.

## 10. Shaping exit gate

Implementation may begin only after:

1. `spec.md`, `plan.md`, and `tasks.md` exist on one shaping candidate;
2. the change surface is shaping-only;
3. independent substantive review evaluates the exact shaping head;
4. all findings are reconciled;
5. exact-head qualification is recorded;
6. the shaping PR merges with expected-head protection;
7. post-merge verification confirms canonical `main` contains only the intended shaping surface;
8. Issue #4 remains `ACTIVE` and no newer governance blocker exists.
