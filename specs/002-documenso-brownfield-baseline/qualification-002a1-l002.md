# Specification 002A1 — L002 License-Option Evidence Resolution

Status: `EVIDENCE_RESOLUTION_CANDIDATE / PLANNING_ONLY / NOT_IMPORT_AUTHORIZATION`
Issue: #5
Canonical predecessor: `fb1c0c57c594a1f148167de3d2e2bac071601d6e`

## Purpose

Resolve, for the exact 002A1 `.npmrc` candidate only, whether immutable first-party evidence supports an unambiguous SPDX expression suitable for a future Specification 001 source-import record.

This is an engineering provenance classification, not legal advice.

This unit is planning/evidence only. It imports zero upstream-derived bytes, creates zero source-import records, changes no dependency/runtime/workflow/NOTICE surface, grants no permission rights, and does not authorize Stage R or source import.

## Exact candidate identity

Upstream repository:

`documenso/documenso`

Exact snapshot:

`2cac63a000e22422bdea449f68b8025e709aa73a`

Exact candidate path:

`.npmrc`

Exact upstream Git blob:

`cbc6b6537fba6c69756ad16e69a35cc056791d99`

Exact byte size:

`65`

Exact SHA-256:

`409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`

Candidate destination:

`.npmrc`

Proposed later transformation, if separately authorized:

`COPY_EXACT`

Live `documenso/documenso/main` was re-read while preparing this unit and still resolved exactly to the selected snapshot. No snapshot amendment is needed.

## Evidence rule

Canonical Signthos provenance policy rejects bare `AGPL-3.0` because that deprecated/ambiguous shorthand does not distinguish:

- `AGPL-3.0-only`; from
- `AGPL-3.0-or-later`.

The question in this unit is therefore not whether Documenso Community is in the AGPL version-3 family. That is already documented. The narrow question is whether the exact 002A1 path has evidence of permission to use a later AGPL version as an alternative to version 3.

The decision is fail-closed: `AGPL-3.0-or-later` may not be inferred from the presence of the standard AGPL license text itself.

## Immutable first-party evidence

### E1 — Documenso licensing policy

At the selected snapshot:

- path: `apps/docs/content/docs/policies/licenses.mdx`
- Git blob: `a8fc5d78e373d552f6cc926221edd790d707512a`
- immutable URL: `https://github.com/documenso/documenso/blob/2cac63a000e22422bdea449f68b8025e709aa73a/apps/docs/content/docs/policies/licenses.mdx`

The document describes the Community Edition as licensed under the GNU Affero General Public License **version 3** and repeatedly describes derivative/open-source treatment as `AGPL-3.0`. It contrasts that community license with the separate Enterprise commercial license.

It does not state that Community Edition recipients may choose AGPL version 3 **or any later version**.

### E2 — Documenso Community Edition policy

At the selected snapshot:

- path: `apps/docs/content/docs/policies/community-edition.mdx`
- Git blob: `2cd1c06fd38adf17201acf31f38b017d7d14a1dc`
- immutable URL: `https://github.com/documenso/documenso/blob/2cac63a000e22422bdea449f68b8025e709aa73a/apps/docs/content/docs/policies/community-edition.mdx`

The document again identifies the Community Edition license as GNU Affero General Public License **version 3** and states that forks/derivative works continue under `AGPL-3.0`. It explicitly identifies `packages/ee/**` as outside the Community AGPL boundary.

It does not state an `or later` option.

### E3 — exact candidate file

At the selected snapshot:

- path: `.npmrc`
- Git blob: `cbc6b6537fba6c69756ad16e69a35cc056791d99`
- immutable URL: `https://github.com/documenso/documenso/blob/2cac63a000e22422bdea449f68b8025e709aa73a/.npmrc`

The exact file has no file-local copyright notice, SPDX identifier, generated/vendor marker, third-party notice, or alternative license statement.

This unit records only that independently authored observation and the immutable identity above. It does not copy the 65 upstream bytes into Signthos.

### E4 — repository root AGPL text

At the selected snapshot:

- path: `LICENSE`
- Git blob: `0ad25db4bd1d86c452db3f9602ccdbe172438f52`
- immutable URL: `https://github.com/documenso/documenso/blob/2cac63a000e22422bdea449f68b8025e709aa73a/LICENSE`

The repository contains the standard GNU Affero General Public License version 3 text.

GitHub history for this path reports one repository commit, `7b08d409d9209a2e289aef4f220d2f5c7efcf6a9` (`Create LICENSE`), with no later project-specific edit to the root license file observed through the selected snapshot.

The standard AGPL text includes generic instructions/examples describing how a copyright holder can choose an `or later` notice. Those generic instructions are part of the license document; they are not themselves a Documenso project-specific grant of an `or later` option.

### E5 — project-wide explicit-option search

With upstream `main` still exactly equal to the selected snapshot, repository code search returned no result for:

- `AGPL-3.0-or-later`;
- `AGPLv3+`;
- `SPDX-License-Identifier`.

Absence of a search hit is supporting evidence, not the sole basis for classification.

## Authoritative SPDX/GNU interpretation evidence

### E6 — SPDX `AGPL-3.0-only`

Official SPDX reference:

`https://spdx.org/licenses/AGPL-3.0-only.html`

SPDX distinguishes `AGPL-3.0-only` from `AGPL-3.0-or-later` and explains that the license notice states which choice applies to the code. SPDX also notes that the AGPL exhibit demonstrates the `or later` form.

### E7 — SPDX `AGPL-3.0-or-later`

Official SPDX reference:

`https://spdx.org/licenses/AGPL-3.0-or-later.html`

This is the distinct identifier for permission to use AGPL version 3 or a later version.

### E8 — GNU guidance on license notices

Official GNU reference:

`https://www.gnu.org/licenses/gpl-howto.html`

GNU instructs licensors to make clear which license versions users may use. Its example for a version-3-or-later grant uses explicit language permitting either version 3 or, at the recipient's option, a later version.

This reinforces the distinction between possessing the standard license text and receiving an explicit later-version option.

## Evidence synthesis

For exact path `.npmrc` at exact snapshot `2cac63a000e22422bdea449f68b8025e709aa73a`:

1. the path is a root Community workspace configuration path, not under the separately restricted `packages/ee/**` boundary;
2. no more-specific file-local license or third-party marker exists on the candidate;
3. two first-party Documenso policy documents identify the Community license as GNU AGPL **version 3** and do not state an `or later` option;
4. the root license is the standard version-3 license document and has no observed project-specific later-version amendment;
5. no explicit `AGPL-3.0-or-later`, `AGPLv3+`, or SPDX header was found at the selected snapshot;
6. SPDX treats `-only` and `-or-later` as different choices determined by the applicable notice;
7. GNU guidance makes the later-version option explicit when that option is intended.

Therefore the conservative, evidence-backed machine-readable classification candidate for this exact path is:

`AGPL-3.0-only`

Using `AGPL-3.0-or-later` would add a later-version permission that the reviewed Documenso evidence does not establish.

Using bare `AGPL-3.0` remains prohibited by Signthos provenance policy.

## Scope of the conclusion

This candidate conclusion is intentionally narrow.

It applies only to:

`documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:.npmrc`

It does **not** automatically classify:

- other root files;
- `apps/**`;
- `packages/**`;
- generated/vendor/third-party content;
- any path with a more-specific notice;
- `packages/ee/**`;
- future Documenso revisions.

Those paths require their own most-specific evidence.

Global Foundation `L002` therefore remains unresolved for Documenso paths not covered by a separately reviewed exact-path decision. This unit proposes resolving only `L002/002A1/.npmrc`.

## Permission and copyright boundaries

This classification does not infer a private founder permission artifact and does not resolve Foundation `L001`.

For this Community candidate, the proposed classification relies on the public Community license basis rather than separate commercial rights.

The candidate file does not state a copyright holder locally. A future provenance record must use the exact schema-supported unknown/unstated representation unless separate reliable evidence establishes a holder; commit authorship must not be substituted for copyright ownership.

`packages/ee/**` remains `RESTRICTED / NOT_IMPORT_AUTHORIZED` and outside this unit.

## Conditional canonical result

Before this exact evidence unit becomes canonical:

`STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`

If and only if this exact evidence unit:

1. receives independent substantive exact-head review;
2. reconciles every material finding;
3. has zero unresolved material review threads;
4. preserves accurate absent/unavailable check accounting;
5. merges guarded with the reviewed exact head; and
6. passes post-merge verification with the same evidence/authority boundaries,

then the canonical evidence-qualified Stage-R candidate allowlist becomes exactly:

| Upstream | Destination | SPDX | Transformation |
| --- | --- | --- | --- |
| `.npmrc` | `.npmrc` | `AGPL-3.0-only` | `COPY_EXACT` |

No other path becomes eligible.

Even after that conditional result becomes canonical:

- `S2-T032` remains unsatisfied;
- `S2-T033` remains unsatisfied;
- `IMPORT_IMPLEMENTATION_AUTHORITY = ABSENT`;
- no `.npmrc` bytes may enter Signthos;
- no source-import record may be created;
- no dependency may be installed under this authority.

The next dependency after successful canonicalization would be a **separate Stage R authorization unit**, not source import itself.

## Failure rule

If independent review determines that the evidence is insufficient to distinguish `AGPL-3.0-only` from `AGPL-3.0-or-later`, this candidate must fail closed:

- keep `.npmrc = BLOCKED_PENDING_L002`;
- keep `STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY`;
- do not proceed to `S2-T032`.
