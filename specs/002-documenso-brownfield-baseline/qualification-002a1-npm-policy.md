# Specification 002A1 — npm Policy Seed Qualification

Status: `STAGE_Q_CANDIDATE / PLANNING_ONLY / IMPORT_BLOCKED`
Issue: #5
Canonical Signthos base: `80ae1410b3065768e031eecaffda5b6a216ebd13`
Upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## 1. Stage Q authority and exact change allowlist

This document is a Signthos-authored pre-import qualification record. It does not contain or authorize upstream-derived bytes.

The Stage Q pull request for this packet may change only:

- `specs/002-documenso-brownfield-baseline/qualification-002a1-npm-policy.md`
- `specs/002-documenso-brownfield-baseline/tasks.md`
- Issue #5 comments/metadata for evidence/status only.

No other repository file is admitted by this Stage Q packet.

The packet must contain:

- zero copied upstream bytes;
- zero adapted upstream bytes;
- zero upstream-derived source, tests, manifests, lockfiles, configuration, assets, schemas, patches, fixtures, generated files, or license copies;
- zero source-import records.

Identifiers, hashes, path names, license-evidence references, and independently authored descriptions below are evidence references only.

## 2. Selected recursively refined grain

Selected grain:

`002A1 — npm project-resolution policy seed`

Purpose:

Qualify the smallest root workspace prerequisite that affects future npm dependency resolution without importing the broad Documenso workspace manifest, lockfile, build graph, application source, or enterprise surface.

This is intentionally narrower than the full 002A repository/workspace baseline. It does not establish a runnable Documenso workspace by itself.

## 3. Snapshot reconfirmation

The captured upstream snapshot remains:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

Live upstream `main` was re-read during this Stage Q qualification and still pointed to the same exact commit.

Observed immutable commit facts:

- commit: `2cac63a000e22422bdea449f68b8025e709aa73a`;
- tree: `f97ae86f4c82501617aec8d0551f52e03c29feae`;
- parent: `4aa3583e89432e5aec23b57a2a8739e245b27033`;
- subject: `fix: block SSRF via IPv4-mapped IPv6 webhook URLs (#2901) (#3166)`.

No snapshot amendment is proposed.

## 4. Candidate upstream path and destination map

Candidate path inventory:

| Upstream path | Upstream blob | Size | Candidate Signthos destination | Proposed future transformation | Stage R eligibility now |
| --- | --- | ---: | --- | --- | --- |
| `.npmrc` | `cbc6b6537fba6c69756ad16e69a35cc056791d99` | 65 bytes | `.npmrc` | `COPY_EXACT` | `BLOCKED_PENDING_L002` |

Independent SHA-256 evidence for the exact upstream candidate bytes:

`409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`

The candidate has no current Signthos destination collision: canonical Signthos root at `80ae1410b3065768e031eecaffda5b6a216ebd13` does not contain `.npmrc`.

This table is a qualification candidate, not an import allowlist authorization.

### Stage-R-eligible import allowlist

`EMPTY`

Reason: the exact SPDX option required by canonical Signthos provenance policy is not yet established for the candidate path. Stage Q therefore excludes the candidate from implementation eligibility while preserving it as the first proposed 002A1 path for evidence resolution.

## 5. Path-level license and notice classification

### File-local evidence

The exact `.npmrc` candidate was inspected at the pinned snapshot.

Observed file-local state:

- no file-local copyright notice is present;
- no file-local SPDX expression is present;
- no generated/vendor/third-party marker is present;
- no separate file-local license notice is present.

Absence of a marker is not proof of authorship or ownership.

### Repository-level/community evidence

Most-specific currently observed evidence outside the file itself:

- root `LICENSE` at the pinned snapshot contains GNU Affero General Public License version 3 text;
- upstream community licensing documentation at `apps/docs/content/docs/policies/licenses.mdx` states that the Community Edition is licensed under GNU Affero General Public License version 3 and calls the family `AGPL-3.0`;
- upstream community licensing documentation separates `packages/ee/**` from the community AGPL boundary;
- GitHub repository metadata reports `AGPL-3.0`.

Canonical Signthos policy does not permit the ambiguous/deprecated `AGPL-3.0` shorthand in a source-import record. It requires an unambiguous expression such as `AGPL-3.0-only` or `AGPL-3.0-or-later` supported by exact evidence.

The canonical Foundation licensing strategy explicitly retains:

`L002 = unresolved`

for the question of whether affected Documenso code permits `AGPL-3.0-or-later` or requires `AGPL-3.0-only` treatment.

The generic "How to Apply These Terms" material in the AGPL license text is not treated as a project-specific licensing notice and is not used to resolve L002.

Qualification result:

`LICENSE_EXPRESSION = UNRESOLVED_FAIL_CLOSED`

No import authorization may use bare `AGPL-3.0`, and this packet does not guess between `AGPL-3.0-only` and `AGPL-3.0-or-later`.

### Copyright holder field

No file-local holder statement was observed. A future source-import record may use the canonical explicit unknown representation if the schema permits it, but this packet does not create a source-import record and does not infer ownership from commit authorship.

## 6. Restricted/commercial classification

`packages/ee/**` is outside this candidate grain and remains:

`RESTRICTED / NOT_IMPORT_AUTHORIZED`

No EE path is necessary for 002A1. No private permission artifact is relied upon by this packet.

The unresolved Foundation gate `L001` concerning the exact scope of any founder-held Documenso permission artifact is not converted into rights evidence here.

## 7. Why broader root workspace files are excluded

The first grain intentionally excludes root artifacts whose import would expand the dependency or runtime boundary beyond one small prerequisite.

### `package.json` — excluded

At the pinned snapshot the root manifest:

- declares both `apps/*` and `packages/*` workspaces;
- includes a post-install patching step;
- defines build/development/database/container/job/translation scripts spanning later subsystems;
- declares a broad dependency and development-dependency surface;
- references workspace packages and application flows beyond this micro-grain.

Importing it now would not be a minimal package-manager-policy seed.

### `package-lock.json` — excluded

The root lockfile is a 1,214,402-byte full-workspace dependency artifact at blob `d7b6c7081a6682a679d5724e67bbb6824ac9e6fd`.

Its dependency/license graph is not classified by this packet. It is therefore excluded rather than silently inheriting the whole workspace dependency surface.

### `turbo.json` — excluded

The root Turbo configuration spans build/test/dev tasks and a broad environment-variable contract covering authentication, database, signing, storage, mail, billing, telemetry, jobs, external credentials, test credentials, and other later-grain concerns.

It is not required to characterize the isolated npm resolution-policy seed.

### Other explicit exclusions

This packet excludes:

- every `apps/**` path;
- every `packages/**` path;
- every `packages/ee/**` path independently of the broader packages exclusion;
- `.github/**`;
- `.env.example`;
- `docker/**`;
- `patches/**`;
- `scripts/**`;
- `assets/**`;
- root product/build/lint/translation/deployment configuration not named as the single candidate path;
- all upstream tests;
- all upstream license copies;
- all source-import records.

## 8. Dependency and build implications

The candidate `.npmrc` is configuration only. It declares no dependency and does not make the workspace runnable by itself.

Its observed semantics affect future npm resolution behavior in three narrow ways:

1. compatibility handling for peer-dependency conflicts is enabled;
2. dependency deduplication is preferred;
3. a seven-day minimum package-release age is requested.

No install, build, container, database, network provider, paid service, credential, or application runtime is required to characterize these policy semantics.

The broader npm workspace manifest/lock/build graph must be qualified in a later recursively refined 002A packet after its exact necessity and dependency provenance are known.

## 9. Independently authored characterization plan

No upstream test file is proposed for import.

If 002A1 later receives valid Stage R implementation authorization, Signthos-authored characterization should prove at minimum:

1. the destination is exactly `.npmrc` and no additional upstream file entered the grain;
2. exact-copy source and destination SHA-256 digests are equal;
3. npm project configuration resolves the three intended policy semantics described in Section 8;
4. no registry credential, auth token, private endpoint, or production secret is introduced by the imported file;
5. the characterization remains local and does not require dependency installation or external service access;
6. the candidate bytes remain unchanged across any later manifest-only authorization delta.

The test implementation itself must be independently authored from the behavioral contract, not copied or adapted from upstream test source.

## 10. Digest and provenance plan for a future authorized import

This Stage Q packet creates no source-import record.

If a later canonical Stage R event authorizes this path after L002 is resolved, the implementation grain must:

1. fetch `.npmrc` only from exact upstream commit `2cac63a000e22422bdea449f68b8025e709aa73a`;
2. verify upstream Git blob identity `cbc6b6537fba6c69756ad16e69a35cc056791d99`;
3. compute SHA-256 over the exact fetched source bytes and require `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`;
4. copy those bytes to Signthos `.npmrc` without adaptation;
5. compute the destination SHA-256 and require equality with the source SHA-256;
6. create the canonical source-import record only on the separately authorized implementation branch;
7. record the exact unambiguous SPDX expression supported by the then-accepted L002 evidence;
8. keep imported-byte review/authorization pending until independent review exists;
9. apply only the later manifest authorization delta required by canonical review evidence;
10. prove `.npmrc` bytes did not change across that manifest-only delta.

## 11. Stage Q validation

This packet is documentation/evidence only.

Applicable validation for this Stage Q candidate is:

- exact GitHub base/head and two-file PR surface verification;
- manual consistency check against canonical `spec.md`, `plan.md`, `tasks.md`, Constitution, `AGENTS.md`, Foundation licensing strategy, and provenance policy;
- independent substantive semantic/provenance/security review of the exact candidate bytes;
- accurate `NO_APPLICABLE_RUN` accounting if no repository workflow applies to this documentation surface;
- zero unresolved material review conversations before guarded merge.

A syntactic provenance validator cannot make this path import-authorized because no source-import record exists and L002 remains unresolved.

## 12. Stage Q result and blocker

Selected first proposed grain:

`002A1 — npm project-resolution policy seed`

Candidate path:

`.npmrc -> .npmrc`

Current qualification state:

`BLOCKED_PENDING_L002`

Current Stage-R-eligible import allowlist:

`EMPTY`

Blocking evidence required before this candidate path can become implementation-eligible:

- canonical, reviewable evidence that resolves the exact applicable SPDX option for the candidate Documenso community path (`AGPL-3.0-only` versus `AGPL-3.0-or-later`), **or**
- a separately accepted permission artifact whose exact scope independently covers the intended copy/modification/redistribution/open-source publication treatment and is recorded under canonical provenance rules.

Even after that evidence exists, Stage R still requires its separate canonical authorization under S2-T032/S2-T033. Resolution of L002 or L001 does not itself authorize import.

## 13. Non-grants

This packet does not authorize:

- copying `.npmrc`;
- any upstream-derived byte;
- any source-import record;
- `package.json`, `package-lock.json`, `turbo.json`, or any other root configuration;
- dependency installation;
- product/runtime changes;
- `apps/**` or `packages/**` source;
- `packages/ee/**`;
- relicensing;
- credentials or paid services;
- Specification 003.
