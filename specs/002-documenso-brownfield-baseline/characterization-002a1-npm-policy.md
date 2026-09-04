# 002A1 Characterization Evidence — npm Project-Resolution Policy Seed

Status: `IMPORTED_BYTE_REVIEW_PASSED / QUALIFIED_BYTES_UNCHANGED / FINAL_T040_PENDING`

## Candidate identity

- canonical implementation base: `ca0409e3b5f40deba0c14987d591d1860d902ad1`
- PR: `#46`
- imported-byte predecessor head: `37f17bf2477b23d4951397d047b829be4b92ecd2`
- independently reviewed imported-byte head: `05cffe10399722efdc060addfcf3edb8a1585ad9`
- independent review evidence: `github:issue-comment:5540873733`
- review result: `NO_MATERIAL_FINDING`
- qualified predecessor head with CI PASS: `27eed29b2f7c7c2d0a6d8be7cf4c79b1f65aca1f`
- authorized upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:.npmrc`
- destination: `.npmrc`
- transformation: `COPY_EXACT`

This document is independently authored Signthos characterization evidence. It does not itself constitute independent imported-byte review; the independent review is the CodeRabbit evidence identified above.

## Exact byte characterization

Observed destination `.npmrc`:

- Git blob: `cbc6b6537fba6c69756ad16e69a35cc056791d99`
- byte size: `65`
- SHA-256: `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`
- exact logical assignments:
  1. `legacy-peer-deps = true`
  2. `prefer-dedupe = true`
  3. `min-release-age = 7`

The destination Git blob equals the pinned upstream Git blob exactly.

Observed `LICENSES/AGPL-3.0-only.txt` after forward-only repair:

- source: `spdx/license-list-data@3ac5a9c241d97f95b22a5e366c9c841404a35639:text/AGPL-3.0-only.txt`
- destination Git blob: `0c97efd25b5974b974ed9a8a18207bc4f55bb338`
- authorized source Git blob: `0c97efd25b5974b974ed9a8a18207bc4f55bb338`
- authorized size: `34020` bytes
- result: destination blob identity equals the exact authorized source blob identity.

An earlier branch commit produced a non-matching license blob and was not accepted as qualified evidence. It was repaired forward-only before `.npmrc` was admitted; the current destination blob is the exact authorized blob above.

## Semantic and negative checks

Characterization of the exact 65-byte `.npmrc` returned:

- URL scheme (`http://` / `https://`): absent
- registry term: absent
- token term: absent
- auth term: absent
- credential/password/secret terms: absent
- shell operators (`;`, `&`, `|`, backtick, `$`, parentheses): absent
- lifecycle-script terms (`preinstall`, `install`, `postinstall`, `prepare`, `prepublish`, `script`): absent

No dependency installation, lifecycle command, package-network request, provider, credential, paid service, deployment, or runtime service was used to characterize 002A1.

## Independent imported-byte review

CodeRabbit independently re-ran byte-safe checks against exact reviewed head `05cffe10399722efdc060addfcf3edb8a1585ad9`, compared both authorized byte artifacts with their pinned upstream blobs, checked the provenance fields, rights boundary, negative characterization, NOTICE state, and complete bounded PR surface, then reported:

`No material finding for imported-byte candidate head 05cffe10399722efdc060addfcf3edb8a1585ad9.`

Stable review evidence: `github:issue-comment:5540873733`.

## Provenance state

After that independent review, the bounded qualification delta changed `provenance/imports/U001-I0001.json` to:

`review.status = qualified_exact_head`

and replaced the self-authored pending marker with:

`github:issue-comment:5540873733`

The imported `.npmrc` remains Git blob `cbc6b6537fba6c69756ad16e69a35cc056791d99`, and the full-license artifact remains Git blob `0c97efd25b5974b974ed9a8a18207bc4f55bb338` after the qualification delta.

## NOTICE and CI state

`NOTICE` was regenerated only after independent imported-byte review from the canonical deterministic provenance renderer. Exact-head Provenance workflow run `33876780324` on predecessor `27eed29b2f7c7c2d0a6d8be7cf4c79b1f65aca1f` completed successfully, including complete tests, documentation tests, canonical provenance validation, and deterministic `notice --check`.

Because this evidence document is now being reconciled, that predecessor CI is not represented as final-head qualification. Fresh exact-head CI/review is still required before guarded merge.

## Fail-closed boundary

This characterization does not authorize or qualify any additional Documenso path, `packages/ee/**`, dependency installation, package-network access, provider, credential, paid service, deployment, relicensing, redesign/rebrand/domain migration, or Specification 003 work.

Next gate: fresh exact-head CI and independent substantive re-evaluation of the bounded evidence-reconciliation delta, followed only if clean by expected-head guarded merge and post-merge verification.
