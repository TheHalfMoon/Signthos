# 002A1 Characterization Evidence — npm Project-Resolution Policy Seed

Status: `PENDING_IMPORTED_BYTE_REVIEW`

## Candidate identity

- canonical implementation base: `ca0409e3b5f40deba0c14987d591d1860d902ad1`
- PR: `#46`
- imported-byte predecessor head: `37f17bf2477b23d4951397d047b829be4b92ecd2`
- authorized upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a:.npmrc`
- destination: `.npmrc`
- transformation: `COPY_EXACT`

This document is independently authored Signthos characterization evidence. It does not qualify the pending provenance review and is not itself independent imported-byte review.

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

## Provenance state

`provenance/imports/U001-I0001.json` describes `.npmrc` only and currently has:

`review.status = pending`

The pending evidence reference is only an immutable workflow marker establishing the two-stage review handoff. It is explicitly not review PASS and does not satisfy imported-byte review.

## NOTICE state

No hand-authored `NOTICE` change is part of this candidate phase. Deterministic `NOTICE` projection remains deferred until the later manifest-only `qualified_exact_head` phase after independent imported-byte review.

## Fail-closed boundary

This characterization does not authorize or qualify any additional Documenso path, `packages/ee/**`, dependency installation, package-network access, provider, credential, paid service, deployment, relicensing, redesign/rebrand/domain migration, or Specification 003 work.

Next gate: obtain fresh independent substantive imported-byte review of the complete pending candidate before changing the provenance review status or regenerating `NOTICE`.
