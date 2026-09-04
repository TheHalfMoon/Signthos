# Specification 002 — Implementation Plan

Status: `SHAPING_CANDIDATE / PLANNING_ONLY`
Issue: #5
Canonical shaping base: `8e3a3ab8f1b889a6e13a82a5449f4a3b8c3a6167`
Upstream snapshot candidate: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## 1. Objective

Turn the roadmap's Brownfield Documenso Baseline into an executable, fail-closed import program without importing source during shaping.

The plan must preserve three boundaries:

1. exact upstream truth before copying bytes;
2. provenance and rights before import authorization;
3. characterization before Signthos transformation.

## 2. Planning-only change surface

The shaping PR is limited to:

```text
specs/002-documenso-brownfield-baseline/spec.md
specs/002-documenso-brownfield-baseline/plan.md
specs/002-documenso-brownfield-baseline/tasks.md
specs/002-documenso-brownfield-baseline/snapshot.md
```

Issue #5 may receive evidence/status comments.

No other repository path is needed to shape Specification 002.

## 3. Snapshot discipline

The captured candidate is:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

A future implementation authorization must either adopt this exact SHA or canonically amend it before import. The selected baseline is immutable for all grains that declare it; later upstream fixes are separate forward-port candidates with their own provenance.

The snapshot record stores facts, not copied source.

## 4. License-boundary discipline

Observed planning evidence establishes:

- root `LICENSE`: GNU Affero General Public License v3 text;
- repository metadata: GitHub reports `AGPL-3.0`, which is not sufficient by itself for Signthos path authorization;
- `packages/ee/LICENSE`: Documenso Commercial License;
- `packages/ee/**`: restricted by default and not import-authorized;
- all other upstream paths: unclassified until exact path-level evidence is gathered for their owning import grain.

The path classifier must use the most specific applicable license/evidence and fail closed on conflicts, generated/vendor content, embedded third-party material, or absent evidence.

## 5. Execution stages

### Stage P — shaping and canonicalization

Purpose: establish this specification, plan, ledger, snapshot facts, and the authorization boundary.

Allowed paths: shaping files only.

Exit:

- exact shaping diff proven;
- zero upstream source bytes;
- independent substantive exact-head review;
- findings reconciled;
- guarded merge;
- post-merge reread.

This stage may close while all source import remains unauthorized.

### Stage Q — pre-import qualification packet

This stage is planning/evidence work, not source import.

For the first proposed implementation grain only, prepare a canonical packet that identifies:

- exact snapshot SHA;
- exact upstream file allowlist;
- exact Signthos destination map;
- path-level license and copyright/notice evidence;
- generated/vendor/third-party classification where applicable;
- required transformation type per path;
- dependency/build implications;
- proposed characterization tests;
- permission scope/evidence for any non-OSS path;
- explicit exclusions.

The packet must be small enough for independent line-by-line review.

No upstream application source may be committed in Stage Q.

### Stage R — separate implementation authorization

After Stage Q is canonical, live governance must record a separate authorization that names:

- one grain;
- one snapshot SHA;
- one exact upstream allowlist or canonical allowlist artifact;
- the allowed Signthos destination surface;
- any accepted permission artifact/scopes;
- the required imported-byte review/qualification flow.

Without this event the grain remains `PLANNING_ONLY`, regardless of ordinary founder approval.

### Stage A — 002A repository/workspace baseline

Only after Stage R authorization.

Purpose: import the minimum permitted community workspace/tooling baseline needed for later characterized community grains.

Candidate upstream categories for later classification, not current authorization:

- root workspace manifests/configuration required to resolve/build the bounded baseline;
- narrowly required shared workspace configuration;
- only those workspace packages proven necessary for the first characterized subsystem.

Default exclusions:

- `packages/ee/**`;
- credentials/environment secrets;
- deployment configuration not required by the bounded baseline;
- docs/assets not needed for executable characterization;
- application feature source belonging to later grains;
- generated or vendored source until independently classified.

Acceptance requires deterministic import/provenance mapping plus characterization/build evidence on the exact candidate head.

### Stage B — 002B database/domain baseline

Dependency: canonical 002A plus separate B authorization.

Import only exact permitted domain/schema paths required to characterize inherited data contracts. Preserve original names/semantics during baseline characterization; no branding-driven schema migration.

Evidence must cover model relationships, migration assumptions, constraints, and tests appropriate to the imported surface.

### Stage C — 002C auth baseline

Dependency: required 002A/002B contracts plus separate C authorization.

Characterize session/account/organization/membership/recipient authorization behavior. Include denial and cross-tenant cases. Do not redesign auth while importing it.

### Stage D — 002D document/envelope baseline

Dependency: required domain/auth baselines plus separate D authorization.

Characterize document, recipient, envelope/routing, state transitions, and authorization boundaries without introducing the future Signthos domain rewrite.

### Stage E — 002E editor/signing baseline

Dependency: required domain/document baselines plus separate E authorization.

Characterize editor/signing behavior and relevant PDF outputs. Any signing evidence must distinguish inherited behavior from future Signthos standards/verification claims.

### Stage F — 002F API/webhook baseline

Dependency: relevant domain/auth/document contracts plus separate F authorization.

Characterize external API/webhook contracts, authentication/authorization, idempotency, replay/signature semantics, and outbound URL security behavior where present.

### Stage G — 002G mail/storage/job baseline

Dependency: relevant domain/workflow contracts plus separate G authorization.

Characterize provider interfaces, persistence/delivery/background-job assumptions, retries/idempotency, and failure behavior.

### Stage H — 002H separately permitted EE paths

Default state: `BLOCKED / OPTIONAL / MAY_REMAIN_EMPTY`.

No commercial-license path is eligible because it is useful, visible, or present in the public repository. An H packet requires preserved separate rights evidence whose scope covers the exact intended copying, modification, redistribution, derivative treatment, and open-source publication. If such evidence is never canonically accepted, Stage H stays empty and Specification 002 must not depend on it for community baseline success.

## 6. Per-grain provenance flow

Every authorized import grain follows the Specification 001 record and Diffciplane model:

1. create an import branch from exact canonical main;
2. copy only the exact authorized upstream paths from the exact selected SHA;
3. record source/destination byte digests and required metadata;
4. keep source-import authorization `pending` until imported-byte review exists;
5. run local provenance validation and grain-specific characterization;
6. obtain independent substantive review of imported bytes and exact behavior;
7. apply only the bounded manifest authorization delta required to reference preserved review evidence;
8. prove destination bytes did not change across the authorization delta;
9. run exact-head CI/qualification;
10. resolve every material review thread;
11. merge with `expected_head_sha`;
12. post-merge verify ancestry, exact surface, provenance, characterization, and current governance.

A manifest-valid record never substitutes for live review or rights evidence.

## 7. Characterization strategy

Prefer independently authored Signthos tests based on observable contracts when copying upstream test source would create unnecessary import surface.

Where upstream test source itself is valuable, it is an imported path and requires the same provenance/license authorization as product source.

Characterization types may include:

- package/build contract checks;
- database schema/model snapshots;
- HTTP/API schema and status behavior;
- authorization allow/deny matrices;
- state-transition tables;
- deterministic serialization/events;
- PDF/signing fixtures and independent inspection;
- provider failure/idempotency behavior.

Baseline tests must not encode desired redesign as if it were inherited behavior.

## 8. Dependency handling

Do not blindly copy or install the entire upstream dependency graph.

For each authorized grain:

- identify only dependencies needed by the bounded imported surface;
- pin/lock according to the imported workspace contract when preserving baseline behavior requires it;
- classify shipped/direct/transitive dependencies under Signthos provenance rules where they enter the Signthos repository/product surface;
- reject dependencies or scripts that require credentials/paid services for qualification unless separately authorized;
- separate optional SaaS/deployment integrations from the local reproducible baseline.

## 9. Security and secret boundaries

Upstream configuration is untrusted input for import planning.

Future grains must prove that committed examples/configuration do not introduce real secrets, that CI does not require private production credentials, and that external callbacks/storage/mail/job providers are isolated from baseline characterization where feasible.

High-risk surfaces such as auth, signing, webhook egress, parsers, and tenant authorization require focused negative tests before transformation.

## 10. Mechanical transformation boundary

Specification 002 is a baseline specification. It must not combine source import with:

- global Documenso-to-Signthos rename;
- domain-model redesign;
- database renaming/migration for branding;
- API redesign;
- UI redesign;
- signing-standard expansion;
- product-license change.

Those transformations belong to later explicitly authorized work after the inherited baseline is known.

## 11. Qualification rules

For shaping and future grains:

- exact-head evidence only;
- independent substantive semantic/security/provenance review;
- no material unresolved review threads;
- accurate accounting for absent/skipped/unavailable checks;
- expected-head merge protection;
- post-merge verification and canonical reread.

The current Signthos Provenance workflow does not automatically imply coverage for new Spec 002 docs. If a shaping PR has no applicable workflow run, that absence must be recorded as `NO_APPLICABLE_RUN`, not PASS. Adding/changing workflows is outside this shaping surface unless separately authorized.

## 12. Completion

Planning completion means only that the future import program is shaped. It leaves implementation/source import unauthorized until the separate Stage R event.

Specification 002 completion later requires all actually authorized grains to close canonically, all imported paths to remain provenance-complete, no unauthorized path to be present, and a final independent exact-head closeout review/qualification/merge/post-merge reconciliation.
