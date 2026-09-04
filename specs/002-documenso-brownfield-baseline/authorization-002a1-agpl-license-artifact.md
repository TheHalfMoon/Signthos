# Specification 002A1 — AGPL Full-License Artifact Authorization

Status: `DISTRIBUTION_ARTIFACT_AUTHORIZATION_CANDIDATE / NOT_YET_EFFECTIVE`
Issue: #5
Canonical predecessor: `ea9022423563153951616b1a7c12fc4f255cc462`

## Purpose

Authorize one exact full-license distribution artifact required before the first actual 002A1 AGPL source import can become effective.

This unit exists because canonical Specification 001 states that deterministic `NOTICE` generation does not replace required full license texts and that required license texts must be added as separate explicit repository artifacts when actual components require them. Canonical `NOTICE` repeats that boundary. `LICENSES/` is absent on the canonical predecessor.

This document is Signthos-authored governance only. It copies zero external license bytes, imports zero Documenso source bytes, creates zero source-import records, and grants no source-import authority while non-canonical.

## Relationship to Stage R

PR #42 canonically satisfied S2-T032 at merge `ea9022423563153951616b1a7c12fc4f255cc462` for exactly:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:.npmrc -> .npmrc`

with:

- classification: `oss_permitted`
- SPDX: `AGPL-3.0-only`
- transformation: `COPY_EXACT` / `copied`
- source SHA-256: `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`

This distribution-artifact authorization does not modify that Documenso product-source allowlist.

S2-T033 remains unsatisfied until this predecessor is canonical and a later fresh governance-effectiveness proof confirms the complete import authority on `main`.

## Exact external license-text source

Repository:

`spdx/license-list-data`

Exact source commit:

`3ac5a9c241d97f95b22a5e366c9c841404a35639`

Exact source path:

`text/AGPL-3.0-only.txt`

Exact Git blob:

`0c97efd25b5974b974ed9a8a18207bc4f55bb338`

Exact size:

`34020` bytes

The source is the SPDX License List Data canonical plain-text representation of the GNU Affero General Public License version 3 text associated with SPDX identifier `AGPL-3.0-only`.

The license document itself states that verbatim copies may be distributed and may not be changed. Therefore the authorized transformation is exact copying only.

## Exact Signthos destination authorization

After this authorization is canonical and S2-T033 becomes effective, the 002A1 implementation grain may additionally create exactly:

`LICENSES/AGPL-3.0-only.txt`

from the exact SPDX source blob identified above.

Required byte rule:

- source Git blob: `0c97efd25b5974b974ed9a8a18207bc4f55bb338`
- destination Git blob after creation MUST equal `0c97efd25b5974b974ed9a8a18207bc4f55bb338`
- transformation: `COPY_EXACT`
- no normalization, formatting, line-ending conversion, header/footer insertion, truncation, generated replacement, or adaptation is authorized

Because this is the standard license document supplied as a distribution artifact, it is not a Documenso product-source path and does not create a Documenso source-import record. It must not be recorded as `U001-I0001`; that record remains exclusively for the authorized Documenso `.npmrc` source import.

## Why the artifact is required before effectiveness

Canonical Signthos provenance design deliberately separates deterministic NOTICE inventory from required full license texts and attribution artifacts.

The first actual 002A1 import would introduce a file classified `AGPL-3.0-only`. The repository therefore must have the applicable full AGPL license text available before the import is treated as distribution-ready or canonically complete.

This is a conservative engineering compliance gate. It does not claim that repository presence of the text alone satisfies every future AGPL obligation or product-distribution requirement.

## Allowed implementation surface amendment

When S2-T033 later becomes canonical, the complete 002A1 implementation surface authorized by PR #42 plus this amendment is exactly:

1. `.npmrc` — exact authorized Documenso source bytes;
2. `LICENSES/AGPL-3.0-only.txt` — exact authorized SPDX license-document bytes;
3. `provenance/imports/U001-I0001.json` — source-import record for `.npmrc` only;
4. necessary independently authored 002A1 characterization/evidence under `specs/002-documenso-brownfield-baseline/`;
5. evidence-backed `specs/002-documenso-brownfield-baseline/tasks.md` reconciliation.

No other path becomes authorized.

## Non-grants

This unit does not authorize:

- any additional Documenso source/configuration/test/manifest/license path;
- Documenso root `LICENSE` as a product-source import;
- any path under `packages/ee/**`;
- dependency installation or lifecycle scripts;
- network package access, providers, credentials, or paid services;
- modification of the AGPL license text;
- global relicensing of Signthos or Documenso-derived files;
- any new license boundary outside exact 002A1;
- Specification 003 or later roadmap implementation.

## Canonicalization rule

While this document remains non-canonical:

- the additional `LICENSES/AGPL-3.0-only.txt` destination is not authorized;
- `S2-T033 = NOT_SATISFIED`;
- `IMPORT_IMPLEMENTATION_AUTHORITY = ABSENT`;
- no 002A1 source-import branch may be created.

If and only if this exact authorization unit receives independent substantive exact-head review, reconciles all material findings, has zero unresolved material review threads, merges guarded with the reviewed exact head, and passes post-merge verification, the license-artifact destination becomes an authorized prerequisite surface for 002A1.

S2-T033 must still separately reread canonical governance and prove the combined PR #42 Stage R authorization plus this distribution-artifact amendment are effective before any source-import branch exists.
