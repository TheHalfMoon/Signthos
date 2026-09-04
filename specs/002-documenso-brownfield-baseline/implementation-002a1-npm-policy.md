# 002A1 Implementation Evidence — npm Project-Resolution Policy Seed

Status: `IMPLEMENTATION_BRANCH_BOOTSTRAP / NO_IMPORTED_BYTES_YET`

## Canonical authority

- implementation branch base: `ca0409e3b5f40deba0c14987d591d1860d902ad1`
- `S2-T032 = SATISFIED_CANONICAL`
- `S2-T033 = SATISFIED_CANONICAL`
- `IMPORT_IMPLEMENTATION_AUTHORITY = EFFECTIVE_FOR_002A1_ONLY`
- current implementation task at branch creation: `S2-T034`

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

This artifact must remain byte-identical to the pinned SPDX source and must not be represented as `U001-I0001`.

## Characterization contract

After the authorized bytes are admitted, independently authored checks must prove at least:

1. `.npmrc` is exactly 65 bytes and matches SHA-256 `409b452c3c544d06bf4638253ff835c5a6f00602486704953fa1df04625c0f7d`.
2. `.npmrc` contains exactly the three authorized npm policy assignments: `legacy-peer-deps = true`, `prefer-dedupe = true`, and `min-release-age = 7`.
3. `.npmrc` contains no registry URL, credential, token, authentication material, lifecycle command, or executable script.
4. No dependency installation, package-network request, runtime service, provider, or credential is required to characterize 002A1.
5. `LICENSES/AGPL-3.0-only.txt` is exactly 34020 bytes and has Git blob `0c97efd25b5974b974ed9a8a18207bc4f55bb338`.
6. `U001-I0001.json` describes `.npmrc` only and begins with `review.status = pending`.
7. Before the later manifest-only qualification delta, `NOTICE` remains unchanged.
8. After independent imported-byte review, only the provenance qualification/NOTICE/task-evidence surfaces may change; `.npmrc` and the full-license artifact must remain byte-identical.

## Fail-closed non-grants

This unit does not authorize:

- any additional Documenso path, revision, test, manifest, lockfile, package, application source, asset, schema, patch, or configuration;
- `packages/ee/**`;
- dependency installation, lifecycle scripts, package-network access, providers, credentials, paid services, or deployment;
- relicensing, rebrand, redesign, schema/domain migration, or Specification 003;
- hand-authored `NOTICE` changes;
- treating `pending` provenance as canonical validation PASS or review qualification.

## Two-stage review handoff

The import candidate must remain fail-closed until all of the following occur in order:

1. the pull request exists with immutable PR identity;
2. exact authorized `.npmrc` and full-license bytes are copied;
3. `U001-I0001.json` is created with the immutable PR number and `review.status = pending`;
4. independent substantive review evaluates the imported bytes and complete bounded candidate;
5. only a manifest/NOTICE/task-evidence qualification delta records stable review evidence;
6. exact-head re-evaluation proves imported/license bytes did not change;
7. applicable provenance/characterization qualification passes;
8. all material threads are resolved;
9. merge uses `expected_head_sha`;
10. post-merge verification proves exact ancestry, surface, digests, NOTICE, and governance state.
