# Specification 002 — Documenso Brownfield Baseline

Status: `SHAPING_CANDIDATE / PLANNING_ONLY`
Issue: #5
Canonical predecessor: Specification 001 `CLOSED_CANONICAL`
Canonical shaping base: `8e3a3ab8f1b889a6e13a82a5449f4a3b8c3a6167`

## Authority

Issue #5 authorizes planning only. This specification candidate does not authorize upstream source import, dependency installation from the upstream workspace, application/runtime implementation, product rebranding, relicensing, or restricted/commercial-source use.

General founder approval covers ordinary work inside this planning boundary. It does not override the Constitution's separate evidence and rights gates.

Source import may begin only after a separate canonical authorization explicitly names an import grain and the exact upstream paths allowed for that grain, and only after every affected path satisfies Specification 001 provenance, license, permission, review, and exact-head qualification requirements.

## Problem

Signthos needs a reproducible behavioral baseline for selected Documenso community functionality before transformation. A blind fork or whole-repository copy would mix unrelated subsystems, hide license boundaries, make characterization weak, and create an unsafe foundation for later Signthos architecture work.

The baseline must therefore be built from exact upstream truth, path-level provenance, bounded subsystem imports, characterization before redesign, and fail-closed rights handling.

## Goal

Shape a dependency-ordered brownfield program that can later, when separately authorized, import only explicitly permitted Documenso paths from one exact upstream snapshot, preserve their obligations, characterize inherited behavior, and make every subsequent transformation reviewable.

## Captured upstream snapshot candidate

Repository: `documenso/documenso`

Captured candidate commit:

`2cac63a000e22422bdea449f68b8025e709aa73a`

Observed commit subject:

`fix: block SSRF via IPv4-mapped IPv6 webhook URLs (#2901) (#3166)`

This SHA is a planning candidate, not import authorization. Moving upstream `main` does not change this captured identity. Replacing the candidate snapshot requires a reviewed shaping amendment that records the new exact SHA and re-runs the boundary inventory.

## License and rights boundary

Repository-level metadata and the root `LICENSE` establish an AGPLv3 repository baseline, but they do not classify every path independently and must not be used to override more-specific license files.

The captured tree contains `packages/ee/LICENSE`, which is the Documenso Commercial License and applies a separate commercial/restricted boundary. Therefore:

- `packages/ee/**` is `RESTRICTED / NOT_IMPORT_AUTHORIZED` by default;
- no file under `packages/ee/**` may enter Signthos without separate preserved permission evidence covering every required right for the intended use, including open-source publication where applicable;
- access, repository visibility, a subscription, development/testing permission, conversational permission, or generic founder approval is not sufficient evidence for open-source import;
- all non-EE paths remain `UNCLASSIFIED_PENDING_PATH_LEVEL_EVIDENCE` until their exact path-level license/notice/provenance basis is recorded and validated;
- GitHub's repository-level `AGPL-3.0` metadata is descriptive evidence only and is not itself a canonical Signthos import expression or path authorization.

No upstream product/application source is copied into this shaping candidate.

## Scope in

Planning-only scope includes:

- exact snapshot identity and immutable capture rules;
- upstream root/workspace/subsystem inventory at metadata/path level;
- path-level license/permission classification workflow;
- bounded grain decomposition;
- provenance-manifest and authorization handoff rules;
- characterization requirements before transformation;
- exact import-diff and destination rules;
- dependency and build-environment evidence requirements;
- explicit handling of community, unknown, and EE/commercial paths;
- exact-head CI/review/merge and post-merge requirements for each future grain;
- completion and successor-authority rules.

## Scope out

This shaping unit does not authorize or perform:

- copying any Documenso application/product source into Signthos;
- copying `packages/ee/**` or any other restricted/commercial path;
- running or installing the Documenso workspace merely to prove planning facts;
- selecting a final Signthos product license by inference;
- rebranding or renaming imported source;
- database migrations or schema transformations;
- architecture migration;
- behavior changes;
- production feature work;
- credentials, paid services, private permission-document publication, or legal/compliance claims;
- Specification 003 implementation.

## Brownfield principles

### Exact snapshot before bytes

Every future import grain must bind to one exact upstream commit. Branch names, tags without resolved commit evidence, and mutable labels are not sufficient.

### Path-level authority

Every imported file must be covered by an explicit upstream allowlist and canonical provenance record. Directory-level assumptions do not override more-specific license files, generated-file provenance, embedded third-party notices, or commercial boundaries.

### Characterize before transform

A future import grain may copy only the behavior required for that grain and must establish characterization evidence before Signthos redesign, global rename, domain migration, or license-boundary movement.

### Imported bytes and authorization are distinct

The Specification 001 two-stage authorization model remains controlling. Imported-byte review and the later manifest-only authorization delta must be independently reviewable, with proof that imported destination bytes did not change between those stages.

### No mechanical relicensing

Copied or adapted upstream code keeps applicable upstream obligations unless separate accepted rights explicitly permit another treatment. Directory placement and Signthos ownership do not create relicensing authority.

## Planned dependency-ordered grains

The roadmap names 002A through 002H. This shaping candidate refines them without authorizing them:

- **002A — repository/workspace baseline:** exact minimum community workspace/tooling surface needed to build/test later authorized community grains; exclude application behavior not required by the bounded baseline and exclude `packages/ee/**`.
- **002B — database/domain baseline:** exact permitted schema/domain paths plus characterization of model relationships and migration assumptions.
- **002C — auth baseline:** exact permitted authentication/account/session/membership paths with security-focused characterization.
- **002D — document/envelope baseline:** exact permitted document, recipient, envelope, routing, and state-transition paths.
- **002E — editor/signing baseline:** exact permitted editor/signing paths and representative signing/PDF characterization; no Signthos signing-standard claims.
- **002F — API/webhook baseline:** exact permitted API/webhook paths, contracts, auth boundaries, idempotency, SSRF/replay behavior where present.
- **002G — mail/storage/job baseline:** exact permitted delivery/storage/background-job paths and provider assumptions.
- **002H — separately permitted EE paths:** blocked unless a separate rights artifact is accepted and canonical authorization names exact paths and scopes. This grain may remain permanently empty.

Each grain must be recursively split again if its exact allowlist or review surface is too broad.

## Import authorization handoff

No 002A–002H implementation branch may be created as an import branch until all of the following are canonical:

1. this shaping package is independently reviewed, merge-qualified, merged with expected-head protection, and post-merge verified;
2. the exact upstream snapshot remains explicitly selected;
3. the candidate grain has an exact upstream path allowlist and destination map;
4. every candidate path has path-level license/notice classification and any required permission scope;
5. the Specification 001 validator accepts the candidate provenance structure applicable to the proposed import;
6. live review confirms any canonical evidence references exist, are substantive/independent, and apply to the relevant exact head;
7. a separate canonical authorization explicitly changes that grain from planning-only to import-authorized.

Failure or uncertainty at any item blocks the affected import without blocking unrelated planning.

## Characterization contract

Future imported behavior must be characterized using the narrowest suitable evidence, such as:

- existing upstream tests whose import rights are separately classified;
- independently authored Signthos characterization tests based on observable behavior/contracts;
- API/request/response contracts;
- database schema/model expectations;
- authorization denial cases;
- document/envelope state transitions;
- signing/PDF fixture behavior validated independently where relevant;
- provider/environment assumptions.

Characterization evidence must distinguish observed behavior from desired Signthos behavior.

## Change-surface rule

This shaping candidate may modify only:

- `specs/002-documenso-brownfield-baseline/**`
- Issue #5 comments/metadata when needed for shaping evidence.

No upstream source, provenance import record, runtime/tooling source, dependency manifest, workflow, NOTICE, product code, credential, or paid-service configuration is authorized in the shaping PR.

## Shaping acceptance criteria

The shaping unit is complete only when:

- canonical predecessor and planning authority are exact;
- snapshot candidate and license-boundary facts are recorded without claiming path authorization;
- restricted/commercial handling is fail-closed;
- grains are dependency-ordered and bounded;
- import authorization handoff is executable and cannot be satisfied by generic approval alone;
- source import remains zero bytes in the shaping diff;
- an independent substantive review evaluates the exact shaping head;
- all material findings are reconciled and the final exact head is re-evaluated when amended;
- unresolved material review threads are zero;
- merge uses `expected_head_sha` protection;
- post-merge canonical truth is re-read before any implementation authorization decision.

## Completion rule

Specification 002 is not complete when planning is merged, and planning completion does not authorize import. The specification becomes implementation-active only through a separate canonical authorization satisfying the handoff above, and becomes `CLOSED_CANONICAL` only after every actually authorized/imported grain is proven, reviewed, merged, post-merge verified, and reconciled.
