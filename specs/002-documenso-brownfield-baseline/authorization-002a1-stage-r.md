# Specification 002A1 — Stage R Import Authorization

Status: `STAGE_R_AUTHORIZATION_CANDIDATE / NOT_YET_EFFECTIVE`
Issue: #5
Canonical predecessor: `a97c937456d57569c633c21b2bfc943f7ee9039a`

## Purpose

Record the separate canonical implementation-authorization event required by Specification 002 Stage R for the first bounded brownfield grain.

This document is Signthos-authored governance only. It imports zero upstream-derived bytes, creates zero source-import records, installs no dependency, and does not itself make implementation authority effective while it remains on a non-canonical branch or open pull request.

## Canonical prerequisite evidence

The path-specific L002 evidence unit became canonical through PR #41:

- reviewed exact head: `ee527cfdb66075ac804b7a03e8072802eca0dc97`
- independent substantive review: `github:issue-comment:5539396641`
- guarded merge: `a97c937456d57569c633c21b2bfc943f7ee9039a`
- post-merge verification: Issue #5 comment `5539571347`

That canonical evidence establishes only the following evidence-qualified Stage-R candidate allowlist:

| Upstream | Destination | SPDX | Transformation |
| --- | --- | --- | --- |
| `.npmrc` | `.npmrc` | `AGPL-3.0-only` | `COPY_EXACT` |

No other Documenso path or revision is eligible under this authorization unit.

## Authorized grain

Grain:

`002A1 — npm project-resolution policy seed`

Exact upstream repository:

`documenso/documenso`

Exact upstream snapshot:

`2cac63a000e22422bdea449f68b8025e709aa73a`

The selected snapshot is immutable for this grain. A moving branch name, newer upstream commit, cherry-pick, backport, or forward-port is outside this authorization unless separately qualified and canonically authorized.

## Exact upstream allowlist

The complete upstream byte allowlist is exactly one path:

| Path | Git blob | Size | SHA-256 | Classification | SPDX |
| --- | --- | ---: | --- | --- | --- |
| `.npmrc` | `cbc6b6537fba6c69756ad16e69a35cc056791d99` | 65 | `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d` | `oss_permitted` | `AGPL-3.0-only` |

Everything else in `documenso/documenso` is outside the allowlist for 002A1, including root manifests, lockfiles, Turbo configuration, scripts, patches, applications, packages, tests, docs, assets, generated/vendor content, deployment configuration, and `packages/ee/**`.

## Allowed Signthos implementation surface

Only after S2-T033 becomes canonical and effective, the 002A1 implementation grain may create or modify exactly the following bounded surfaces required by the Specification 001 import flow:

1. `.npmrc` — exact copied destination bytes for the authorized upstream `.npmrc` only;
2. `provenance/imports/U001-I0001.json` — the canonical v1 source-import record for this one path;
3. independently authored Signthos characterization/evidence files under `specs/002-documenso-brownfield-baseline/` only when necessary to prove the 002A1 acceptance criteria;
4. `specs/002-documenso-brownfield-baseline/tasks.md` only for evidence-backed ledger reconciliation associated with the authorized grain.

No other product/runtime/workspace path is authorized by this Stage R event.

## Transformation and byte-integrity rule

Authorized transformation:

`COPY_EXACT`

Specification 001 record vocabulary:

`copied`

The imported destination `.npmrc` must be byte-for-byte identical to the exact authorized upstream blob. Its destination SHA-256 must equal:

`409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`

Any byte change, normalization, formatting change, comment insertion, line-ending conversion, merge conflict edit, generated replacement, or adaptation requires a separately qualified transformation decision and is not authorized here.

## Rights and permission basis

This exact path is authorized only on the canonical public Community-license basis established by the PR #41 L002 evidence unit:

- classification: `oss_permitted`
- SPDX: `AGPL-3.0-only`
- separate permission artifact: not required for this one Community path

This statement does not resolve Foundation L001 globally and does not synthesize a founder/private permission artifact from conversational approval.

`packages/ee/**` remains `RESTRICTED / NOT_IMPORT_AUTHORIZED` and is expressly excluded.

The future source-import record must preserve the applicable license evidence and obligations. This authorization does not relicense copied bytes.

## Copyright-holder representation

The exact upstream `.npmrc` has no file-local copyright-holder statement. Commit authorship must not be substituted for copyright ownership.

The future source-import record must use the canonical explicit `unknown` representation permitted by `provenance/UPSTREAM.md` unless separate reliable evidence establishes a holder before the record is finalized.

## Secret, network, and dependency boundaries

The implementation grain must prove that the imported `.npmrc` contains no credential, token, private endpoint, or secret material.

This authorization does not authorize:

- dependency installation;
- execution of upstream lifecycle scripts;
- network package access;
- credentials or paid services;
- external provider access;
- importing root `package.json`, `package-lock.json`, `turbo.json`, or any package/application source.

Any later dependency/bootstrap requirement must be separately qualified and authorized.

## Required implementation and review flow

After this authorization is canonical and S2-T033 independently proves it effective on `main`, the 002A1 implementation must follow this exact sequence:

1. create the implementation branch from the exact then-current canonical `main`;
2. reverify canonical governance, this authorization, and the immutable upstream snapshot;
3. copy only the exact authorized `.npmrc` bytes;
4. create `provenance/imports/U001-I0001.json` with `review.status = pending` and the exact source/destination identity and digests;
5. run local/offline provenance source verification where available against the exact upstream checkout or equivalent exact source evidence;
6. run independently authored 002A1 characterization proving destination/path/digest equality, npm policy semantics, absence of credentials/private endpoints, and the exact one-file import surface;
7. obtain independent substantive review of the imported bytes, provenance record, and characterization evidence on the exact candidate head;
8. reconcile all material findings;
9. apply only the bounded manifest authorization delta that changes the source-import review state/evidence to `qualified_exact_head` and records the immutable review-evidence reference;
10. prove `.npmrc` destination bytes did not change across that manifest-only authorization delta;
11. re-evaluate the final exact head, run all applicable provenance/CI/characterization qualification, and account accurately for unavailable or non-applicable checks;
12. prove zero unresolved material review threads;
13. merge only with `expected_head_sha` protection;
14. post-merge verify ancestry, exact surface, destination digest, provenance status/evidence, characterization, and current governance.

A syntactically valid provenance record or successful source verification does not substitute for independent review, canonical authorization, exact-head qualification, or rights evidence.

## Characterization acceptance criteria

The independently authored characterization for 002A1 must prove at minimum:

- canonical destination is exactly `.npmrc`;
- no other upstream file entered the grain;
- destination SHA-256 is exactly `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`;
- the file contains no credential, token, private registry endpoint, or project secret;
- its npm-policy effect is characterized without importing broader workspace manifests or installing dependencies;
- the imported bytes remain unchanged across the provenance authorization delta;
- no rebrand, redesign, dependency-bootstrap, schema migration, feature implementation, or license-boundary change is mixed into the grain.

## Non-grants

This authorization unit does not authorize:

- any path other than the exact upstream `.npmrc` identified above;
- any Documenso revision other than `2cac63a000e22422bdea449f68b8025e709aa73a`;
- `packages/ee/**` or any commercial/restricted source;
- root `package.json`, lockfiles, Turbo configuration, scripts, patches, applications, packages, tests, docs, assets, or deployment files;
- source transformation other than exact copying;
- global Documenso relicensing;
- credentials, paid services, provider/runtime access, or deployment;
- Specification 003 or any later roadmap implementation authority.

## Canonicalization rule

While this document is not canonical on `main`:

- `S2-T032 = NOT_SATISFIED`
- `S2-T033 = NOT_SATISFIED`
- `IMPORT_IMPLEMENTATION_AUTHORITY = ABSENT`
- no source-import branch may be created
- no upstream `.npmrc` byte may enter Signthos

If and only if this exact Stage R authorization unit receives independent substantive exact-head review, reconciles all material findings, has zero unresolved material review threads, merges guarded with its reviewed exact head, and passes post-merge verification, then `S2-T032` becomes satisfied.

`S2-T033` still requires a fresh canonical governance reread after that merge and a separately canonical proof that this authorization is effective on `main` before any source-import branch is created.
