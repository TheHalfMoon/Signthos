# Specification 002A1 — Stage R Effectiveness Proof

Status: `S2_T033_EFFECTIVENESS_CANDIDATE / NOT_YET_CANONICAL`
Issue: #5
Canonical predecessor: `6d947ab78ea56312785de7761154e1a5c7bfd9e7`

## Purpose

Perform the fresh canonical-governance reread required by `S2-T033` and prove, without importing any implementation bytes, whether the combined canonical 002A1 authorization is complete and bounded enough to become effective on `main`.

This proof is Signthos-authored governance only. While it is non-canonical it does not authorize an import branch, copy `.npmrc`, create the full-license artifact, create a source-import record, modify `NOTICE`, install dependencies, use credentials/providers, or start Specification 003.

## Canonical truth reread

The following live canonical surfaces were reread from predecessor `6d947ab78ea56312785de7761154e1a5c7bfd9e7`:

- `.specify/memory/constitution.md` — `CANONICAL`; provenance before import, exact-head evidence, independent substantive review, expected-head merge protection, post-merge verification, and no authority inflation remain controlling;
- `AGENTS.md` — exact repository/commit/path, path-level license, required notices, permission evidence where needed, canonical authorization, and provenance remain required before upstream import;
- `ROADMAP.md` — Specification numbers remain dependency order only and do not create implementation authority;
- Issue #5 — remains `PLANNING_ONLY` and does not itself authorize source import;
- `specs/002-documenso-brownfield-baseline/spec.md` — source import requires a separate canonical authorization with exact grain/path evidence and live review;
- `specs/002-documenso-brownfield-baseline/plan.md` — Stage R precedes Stage A and every import grain must use the Specification 001 pending-review-to-qualified flow;
- `specs/002-documenso-brownfield-baseline/tasks.md` — `S2-T033` is the current unsatisfied gate before `S2-T034`;
- `specs/002-documenso-brownfield-baseline/authorization-002a1-stage-r.md` — canonical PR #42 Stage R authorization;
- `specs/002-documenso-brownfield-baseline/authorization-002a1-agpl-license-artifact.md` — canonical PR #43 distribution-artifact/NOTICE prerequisite amendment;
- Specification 001 provenance schema/tooling — remains the required record, validation, review-evidence, deterministic NOTICE, and exact-head qualification mechanism.

No reread surface grants broader authority than the bounded result below.

## Canonical predecessor evidence

### PR #42 — S2-T032 Stage R authorization

Canonical facts:

- predecessor before PR #42: `a97c937456d57569c633c21b2bfc943f7ee9039a`;
- reviewed exact PR #42 head: `89c097b57caf870e8c22536e9db46940abfc39a1`;
- independent substantive review: `github:issue-comment:5539615793`;
- guarded merge: `ea9022423563153951616b1a7c12fc4f255cc462`;
- exact merged surface: `specs/002-documenso-brownfield-baseline/authorization-002a1-stage-r.md` only;
- post-merge `.npmrc`: absent;
- post-merge source-import records: none.

This canonical event satisfies `S2-T032` only.

### PR #43 — distribution-artifact / NOTICE prerequisite

Canonical facts:

- predecessor before PR #43: `ea9022423563153951616b1a7c12fc4f255cc462`;
- exact final PR #43 head: `a96f2fcf40bd0273faeecb44282423b5265bf82c`;
- prior complete substantive review plus forward-only finding reconciliation;
- exact-head/delta re-evaluation: `github:issue-comment:5539988995`, concluding the authority-timing finding was fully addressed and no material finding remained;
- guarded merge: `6d947ab78ea56312785de7761154e1a5c7bfd9e7`;
- post-merge evidence: Issue #5 comment `5540023733`;
- exact merged surface: `specs/002-documenso-brownfield-baseline/authorization-002a1-agpl-license-artifact.md` only;
- post-merge `.npmrc`: absent;
- post-merge `LICENSES/`: absent;
- post-merge `provenance/imports/`: `README.md` only;
- post-merge `NOTICE` Git blob remains `a6fc6f8bf5c53a7cef8d6c871deef025301b5f70`;
- post-merge checks and Actions: `NO_APPLICABLE_RUN`.

PR #43 therefore established only the prerequisite authorization contract. Its implementation surfaces remain inactive until this `S2-T033` proof itself becomes canonical.

## Exact effective 002A1 authority candidate

If and only if this exact proof becomes canonical after independent substantive exact-head review, reconciliation of all material findings, zero unresolved material review threads, guarded expected-head merge, and post-merge verification, then `S2-T033` is satisfied and 002A1 implementation authority becomes effective with the following immutable bounds.

### Grain and upstream source

Grain:

`002A1 — npm project-resolution policy seed`

Documenso source repository and snapshot:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

The complete Documenso upstream byte allowlist is exactly one path:

| Upstream path | Destination | Blob | Size | SHA-256 | Classification | SPDX | Transformation |
| --- | --- | --- | ---: | --- | --- | --- | --- |
| `.npmrc` | `.npmrc` | `cbc6b6537fba6c69756ad16e69a35cc056791d99` | 65 | `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d` | `oss_permitted` | `AGPL-3.0-only` | `COPY_EXACT` / `copied` |

No other Documenso path or revision is authorized.

### Required full-license distribution artifact

The authorized full-license artifact source is independent of the Documenso product-source allowlist:

- repository: `spdx/license-list-data`;
- commit: `3ac5a9c241d97f95b22a5e366c9c841404a35639`;
- source path: `text/AGPL-3.0-only.txt`;
- source/destination Git blob: `0c97efd25b5974b974ed9a8a18207bc4f55bb338`;
- size: `34020` bytes;
- destination: `LICENSES/AGPL-3.0-only.txt`;
- transformation: `COPY_EXACT` only.

This standard license artifact is not `U001-I0001` and does not expand the Documenso source allowlist.

### Complete allowed Signthos implementation surface

After this proof is canonical and post-merge verified, the complete 002A1 implementation surface is exactly:

1. `.npmrc` — exact authorized Documenso bytes only;
2. `LICENSES/AGPL-3.0-only.txt` — exact authorized SPDX license-document bytes only;
3. `provenance/imports/U001-I0001.json` — source-import record for `.npmrc` only;
4. `NOTICE` — only the deterministic provenance projection during the final qualified-record phase;
5. necessary independently authored 002A1 characterization/evidence under `specs/002-documenso-brownfield-baseline/`;
6. evidence-backed `specs/002-documenso-brownfield-baseline/tasks.md` reconciliation.

No other repository path is authorized by this proof.

## Required first-import sequence after effectiveness

Once this proof is canonical, the next task is `S2-T034`, not a later grain.

The first implementation unit must:

1. create the 002A1 import branch from the exact then-current canonical `main`;
2. reverify this proof, PR #42/PR #43 authorization, and both immutable external snapshots;
3. copy only the exact 65-byte Documenso `.npmrc` and exact 34020-byte SPDX full-license artifact;
4. create only `provenance/imports/U001-I0001.json` for the `.npmrc`, initially with `review.status = pending`;
5. use `copyright_holder = "unknown"` unless reliable separate evidence establishes a holder;
6. keep `permission = null` for this exact `oss_permitted` Community path;
7. add independently authored characterization proving exact path/digest equality, npm policy semantics, no credential/token/private endpoint, and no broader imported surface;
8. obtain independent substantive imported-byte review before qualification;
9. apply only the bounded provenance authorization delta required to set `review.status = qualified_exact_head` and preserve immutable review evidence;
10. regenerate `NOTICE` only in that final qualification phase through canonical provenance tooling;
11. prove `.npmrc` and `LICENSES/AGPL-3.0-only.txt` are byte-identical before and after the provenance/NOTICE qualification delta;
12. run all applicable exact-head provenance/NOTICE/characterization/CI checks, resolve material review threads, merge with `expected_head_sha`, and post-merge verify.

A pending source-import record is not canonical authorization. A syntactically valid record does not substitute for independent review or exact-head qualification.

## Explicit non-grants

Even after this proof becomes canonical, it does not authorize:

- any additional Documenso path, revision, package, application, test, manifest, lockfile, script, patch, asset, deployment file, generated/vendor path, or root license file;
- `packages/ee/**` or any commercial/restricted source;
- dependency installation, lifecycle scripts, package-network access, external providers, credentials, paid services, or deployment;
- modification of imported `.npmrc` bytes or the AGPL full-license text;
- hand-authored or unrelated `NOTICE` changes;
- any source-import record for the standard SPDX license artifact;
- global relicensing;
- rebrand, redesign, schema/domain migration, or feature implementation mixed into 002A1;
- Specification 003 or any later roadmap implementation authority.

## Canonicalization rule

While this file is only on a branch or open pull request:

- `S2-T033 = NOT_SATISFIED`;
- `IMPORT_IMPLEMENTATION_AUTHORITY = ABSENT`;
- `S2-T034` may not create a source-import branch;
- `.npmrc`, `LICENSES/AGPL-3.0-only.txt`, `U001-I0001.json`, and `NOTICE` remain unchanged/absent as applicable.

If and only if this exact proof:

1. receives independent substantive exact-head review;
2. reconciles all material findings;
3. has zero unresolved material review threads;
4. records exact check/workflow availability without converting unavailable states into PASS;
5. merges guarded with the reviewed exact head; and
6. passes post-merge verification against the same bounded authority,

then:

`S2-T033 = SATISFIED_CANONICAL`

and:

`IMPORT_IMPLEMENTATION_AUTHORITY = EFFECTIVE_FOR_002A1_ONLY`

The next dependency then becomes `S2-T034 — create the authorized 002A1 implementation branch from exact canonical main`.
