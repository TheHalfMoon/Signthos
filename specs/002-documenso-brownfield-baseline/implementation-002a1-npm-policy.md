# 002A1 Implementation Evidence — npm Project-Resolution Policy Seed

Status: `QUALIFICATION_DELTA_COMPLETE / FINAL_T040_PENDING`

## Canonical authority

- implementation branch base: `ca0409e3b5f40deba0c14987d591d1860d902ad1`
- `S2-T032 = SATISFIED_CANONICAL`
- `S2-T033 = SATISFIED_CANONICAL`
- `IMPORT_IMPLEMENTATION_AUTHORITY = EFFECTIVE_FOR_002A1_ONLY`
- implementation PR: `#46`
- independently reviewed imported-byte head: `05cffe10399722efdc060addfcf3edb8a1585ad9`
- independent review evidence: `github:issue-comment:5540873733`
- review result: `NO_MATERIAL_FINDING`
- qualified predecessor head with exact-head CI PASS: `27eed29b2f7c7c2d0a6d8be7cf4c79b1f65aca1f`
- provenance workflow run: `33876780324` / `success`

This document is independently authored Signthos evidence. It contains no copied upstream file bytes and is not a source-import record.

## Authorized Documenso source

Exactly one Documenso source path is authorized:

- repository: `documenso/documenso`
- commit: `2cac63a000e22422bdea449f68b8025e709aa73a`
- upstream path: `.npmrc`
- destination: `.npmrc`
- upstream Git blob: `cbc6b6537fba6c69756ad16e69a35cc056791d99`
- byte size: `65`
- SHA-256: `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`
- classification: `oss_permitted`
- SPDX: `AGPL-3.0-only`
- transformation: `COPY_EXACT` / provenance kind `copied`

No other Documenso path or revision is authorized.

## Separately authorized distribution artifact

The required full-license artifact is separate from the Documenso source-import record:

- repository: `spdx/license-list-data`
- commit: `3ac5a9c241d97f95b22a5e366c9c841404a35639`
- upstream path: `text/AGPL-3.0-only.txt`
- destination: `LICENSES/AGPL-3.0-only.txt`
- upstream Git blob: `0c97efd25b5974b974ed9a8a18207bc4f55bb338`
- byte size: `34020`
- transformation: `COPY_EXACT`

This artifact remains byte-identical to the pinned SPDX source and is not represented as `U001-I0001`.

## Executed characterization contract

The authorized implementation and characterization sequence established:

1. `.npmrc` is exactly 65 bytes and matches SHA-256 `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`.
2. `.npmrc` contains exactly the three authorized npm policy assignments: `legacy-peer-deps = true`, `prefer-dedupe = true`, and `min-release-age = 7`.
3. `.npmrc` contains no registry URL, credential, token, authentication material, lifecycle command, or executable script.
4. No dependency installation, package-network request, runtime service, provider, or credential was required to characterize 002A1.
5. `LICENSES/AGPL-3.0-only.txt` is exactly 34020 bytes and has Git blob `0c97efd25b5974b974ed9a8a18207bc4f55bb338`.
6. `U001-I0001.json` described `.npmrc` only and began with `review.status = pending`.
7. `NOTICE` remained unchanged during the pending imported-byte review phase.
8. CodeRabbit independently reviewed the complete imported-byte candidate at `05cffe10399722efdc060addfcf3edb8a1585ad9` and reported no material finding in `github:issue-comment:5540873733`.
9. The bounded qualification delta changed provenance review state/evidence and regenerated deterministic `NOTICE` without changing `.npmrc` or the full-license artifact.
10. Exact-head Provenance CI on predecessor `27eed29b2f7c7c2d0a6d8be7cf4c79b1f65aca1f` passed all workflow steps, including strict Clippy, complete tests, documentation tests, canonical provenance validation, and deterministic `NOTICE` check.

Final S2-T040 remains pending until this evidence reconciliation itself receives fresh exact-head qualification/review and the guarded merge plus post-merge verification complete.

## Fail-closed non-grants

This unit does not authorize:

- any additional Documenso path, revision, test, manifest, lockfile, package, application source, asset, schema, patch, or configuration;
- `packages/ee/**`;
- dependency installation, lifecycle scripts, package-network access, providers, credentials, paid services, or deployment;
- relicensing, rebrand, redesign, schema/domain migration, or Specification 003;
- hand-authored `NOTICE` changes;
- treating CI, syntactic validator PASS, or self-authored evidence as a substitute for independent review.

## Final gate

Before S2-T040 may be marked complete, all of the following remain required on the exact final PR head:

1. `.npmrc` and the full-license artifact remain byte-identical to the independently reviewed imported-byte candidate;
2. applicable exact-head Provenance CI passes;
3. fresh independent substantive exact-head/delta review covers the final reconciliation delta;
4. zero unresolved material review threads remain;
5. canonical `main` and expected PR head remain unchanged immediately before merge;
6. merge uses `expected_head_sha`;
7. post-merge verification proves exact ancestry, surface, digests, provenance state, deterministic NOTICE, CI state, and governance.
