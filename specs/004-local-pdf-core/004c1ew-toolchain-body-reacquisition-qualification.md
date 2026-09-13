# 004C1EW Toolchain Body Reacquisition Qualification

## Authority and canonical evidence sequence

This record implements only `004C1EW_TOOLCHAIN_BODY_REACQUISITION_QUALIFICATION` under `github:issue-comment:5654737147`. The canonical predecessor is `f3b5e36a9403985fcdd0969a60b41d6d8f1f4939`, tree `465398b71ee1d728a5de6c775a33f207ea3ba1b9`, for `linux-x64-glibc`.

The authority allowed exactly one bounded reacquisition sequence. The first sequence consumed that authority and is the only evidence lineage qualified here:

```text
EVIDENCE_ROOT_LABEL = 004c1ew-toolchain-body-reacquisition-20260913T170801Z
NETWORK_REQUESTS_ALLOWED = 4
NETWORK_REQUESTS_EXECUTED = 4
PROXY_VARIABLES_PRESENT_AFTER_UNSET = 0
```

Later concurrently created `004c1ew*` evidence roots are excluded from this qualification. They do not consume, replace, repair, or extend the first authorized lineage, and no claim below is derived from them.

## Frozen source identities

Exactly four HTTPS requests were recorded by the authorized sequence, with no additional dependency request:

1. `https://nodejs.org/dist/v24.20.0/SHASUMS256.txt`
2. `https://nodejs.org/dist/v24.20.0/node-v24.20.0-linux-x64.tar.xz`
3. `https://registry.npmjs.org/pnpm/10.34.5`
4. `https://registry.npmjs.org/pnpm/-/pnpm-10.34.5.tgz`

| Evidence | Exact identity | Result |
| --- | --- | --- |
| Node archive | `node-v24.20.0-linux-x64.tar.xz` | PASS |
| Node archive bytes | `31838904` | PASS |
| Node archive SHA-256 | `2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2` | PASS |
| Node executable bytes | `126458664` | PASS |
| Node executable SHA-256 | `89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7` | PASS |
| pnpm package | `pnpm@10.34.5` | PASS |
| pnpm tarball bytes | `4862438` | PASS |
| pnpm tarball SHA-1 | `6a91127a7f2ca72fe53bb9ff54883e0c75b22f17` | PASS |
| pnpm tarball SHA-256 | `ccb5c479cab1b00621325bfe7d4c9a8a8031e7a525d7249e275ecbec81b08db2` | PASS |
| pnpm tarball SHA-512 | `a4ee05f2f73658255bd6a89859c065a45c28a57daefae2c893a168ee2b73168c37b91e83e57ea67654ad03f03031746430e8bce38e362e042605fb8abc80192e` | PASS |
| pnpm packument SRI | `sha512-pO4F8vc2WCVb1qiYWcBlpFwopX2u+uLIk6Fo7itzFow3uR6D5X6mdlStA/AwMXRkMOi84442LgQmBfuKvIAZLg==` | PASS |
| pnpm entrypoint | `package/bin/pnpm.cjs` | PASS |
| pnpm entrypoint bytes | `1102` | PASS |
| pnpm entrypoint SHA-256 | `b276da51dc8ca5b0d3ee3371695b50fc8b3244b281b091c63a3f082a88dadeb9` | PASS |

The Node archive SHA-256 matched the exact `SHASUMS256.txt` entry before extraction. The pnpm packument bound `name=pnpm`, `version=10.34.5`, the exact tarball URL, SHA-1 `6a91127a7f2ca72fe53bb9ff54883e0c75b22f17`, and the exact SHA-512 SRI above before extraction.

## Static verification and deterministic manifest

Archive path-safety checks passed before extraction. Static extraction reproduced the frozen Node executable and pnpm entrypoint identities without executing either body.

The evidence manifest uses `path<TAB>bytes<TAB>sha256`. Reverification of every data row produced:

```text
MANIFEST_DATA_ENTRIES = 5896
MANIFEST_MISSING = 0
MANIFEST_SIZE_OR_SHA256_MISMATCH = 0
MANIFEST_SHA256 = 8a521d0855ec1e86042bfe563c7c0de97f3e5dc84be82a47f128b40f473b9a72
```

The verified archives and extracted bodies remain outside the repository. Their presence does not authorize execution or project dependency materialization.

## Concurrency containment

A concurrent repository/evidence writer was observed after the first authorized sequence. Candidate text and evidence from that later activity were not accepted as canonical merely because they existed on disk or on the branch. This repaired record deliberately rebinds every qualification claim to the first authorized sequence and its verified manifest only.

The concurrency incident grants no retry, second reacquisition, dependency acquisition, resolver execution, or successor authority. Any later root is non-canonical unless a future canonical Issue #7 decision explicitly says otherwise.

## Fail-closed boundary

```text
004C1EW_EXACT_TOOLCHAIN_BODY_REACQUISITION = PASS
NODE_BODY_RETAINED_AND_STATICALLY_VERIFIED = PASS
PNPM_BODY_RETAINED_AND_STATICALLY_VERIFIED = PASS
NODE_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
PNPM_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
COREPACK_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
RESOLVER_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
PROJECT_DEPENDENCY_ACQUISITION = PROHIBITED_AND_NOT_PERFORMED
NODE_MODULES_CREATION = PROHIBITED_AND_NOT_PERFORMED
PACKAGE_LIFECYCLE_OR_BUILD_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
REPOSITORY_MUTATION_FROM_REACQUISITION = ZERO
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

This qualification grants no dependency-materialization attempt. Any successor requires fresh canonical Issue #7 reconciliation after exact-head independent substantive review, guarded merge, and mechanical post-merge verification of this record.
