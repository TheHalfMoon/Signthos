# 004C1EX Toolchain Transport-Provenance Reacquisition Qualification

## Authority and scope

This record implements only `004C1EX_TOOLCHAIN_TRANSPORT_PROVENANCE_REACQUISITION_QUALIFICATION` under `github:issue-comment:5655156735`.

```text
CANONICAL_BASE = 677f0d3f6d5f0bb179b2c15fbdf1fbfc0354bf2b
CANONICAL_BASE_TREE = acf43f0ef37463e73fc0da55132978e29f77bc7b
PLATFORM_IDENTITY = linux-x64-glibc
AUTHORIZED_NETWORK_REQUESTS = 4
AUTHORIZED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ex-toolchain-transport-provenance-reacquisition-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
```

The authority permits one fresh exact toolchain-body reacquisition sequence only. It does not authorize project dependency acquisition, dependency materialization, Node/pnpm/Corepack/resolver execution, lifecycle/build execution, provider/PDF runtime, distribution, release, deployment, or any later specification unit.

## Frozen evidence lineage

```text
EVIDENCE_ROOT_LABEL = 004c1ex-toolchain-transport-provenance-reacquisition-20260913T181956Z
ACQUISITION_SCRIPT_BYTES = 6767
ACQUISITION_SCRIPT_SHA256 = 6ac6d2a7de48772be061961c432087c5d89d96678e1f01ad360f56d1a6c1feda
ENVIRONMENT_BOUNDARY_SHA256 = a29b02e0d9bfbbafcb839381380bd9d457661e0c1927cd4c0830a2ef03e705fc
SUMMARY_SHA256 = 3ad32f61fcb71c753ea13689324a7208839d676db5fa2c0a9ac9bea4de809ce6
MANIFEST_DATA_ENTRIES = 5902
MANIFEST_SHA256 = 12d579dea1ef40c2c4db291b7794400a7ac665cd60ab15ceb7e86e3d542e323b
MANIFEST_MISSING_OR_MISMATCHED = 0
```

The exact acquisition script bytes were frozen before the first request. The sequence used `/usr/bin/curl --disable`, explicit direct proxy bypass, HTTPS-only protocol restriction, `--max-redirs 0`, no location-following option, no auth/cookie/netrc option, and a bounded timeout. No silent retry occurred.

Before network execution, inherited proxy variables and the relevant npm/curl credential variables were explicitly unset and recorded as absent. The frozen environment record reports zero presence after unset for:

- `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` and lowercase equivalents;
- `NODE_AUTH_TOKEN`, `NPM_TOKEN`;
- `NPM_CONFIG_USERCONFIG`, `npm_config_userconfig`;
- `NPM_CONFIG__AUTH`, `npm_config__auth`;
- `NPM_CONFIG_AUTH`, `npm_config_auth`;
- `NPM_CONFIG_TOKEN`, `npm_config_token`.

The sequence retained curl verbose transcripts and independently scanned every emitted request-header block. No `Authorization`, `Proxy-Authorization`, or `Cookie` request header was present in any of the four requests.

## Per-request transport proof

Exactly four HTTPS requests executed. Each completed with HTTP 200, verified TLS, no redirect, and a final effective URL identical to the requested URL.

| Request | Requested and final effective URL | Remote endpoint | HTTP | Redirects | TLS verify | Credential headers | Metrics SHA-256 | Verbose SHA-256 |
| --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| Node checksum list | `https://nodejs.org/dist/v24.20.0/SHASUMS256.txt` | `[2606:4700::6810:d483]:443` | `200` | `0` | `0` | ABSENT | `9e53a64aa74c022ad997bfaf27781b1151c3c5975b3011624527fe89a2d8885a` | `a57c041e7f07e2483bc4068cde36e6b26464f332d36e928a0b37c5413d2f8576` |
| Node archive | `https://nodejs.org/dist/v24.20.0/node-v24.20.0-linux-x64.tar.xz` | `[2606:4700::6810:d583]:443` | `200` | `0` | `0` | ABSENT | `fdfd8d7d727ca5074ddfcdea359fade6ad7fad42bcac2749c89bd7ea203a8173` | `2038ce32ca896a7eab8502088b2be54d166e44452e3cee262ab0122adf32825f` |
| pnpm exact-version packument | `https://registry.npmjs.org/pnpm/10.34.5` | `104.16.7.34:443` | `200` | `0` | `0` | ABSENT | `2f53adbf2d1d5cbfccd5f02d3f7a378d23ccc845b47da3c945124ad3b39adcd0` | `feb13aac862a5fa48b8ba3ac026175afe265ec8a14e373aaa797a3ec335c9889` |
| pnpm tarball | `https://registry.npmjs.org/pnpm/-/pnpm-10.34.5.tgz` | `[2606:4700::6810:722]:443` | `200` | `0` | `0` | ABSENT | `200c4b87d428a2b0a6729b21c074cdff61ca39ae1eba8033e6fd709f4a79c3c5` | `7300d87ffde17740cf5c43ca6775e938e58881f1032d12bc09bdb504c26b1e61` |

Each remote endpoint above is the contemporaneous `remote_ip` plus `remote_port` captured in the corresponding metrics record whose SHA-256 is bound in the same row. `ssl_verify_result=0` is recorded for all four requests. `num_redirects=0` is recorded for all four requests. Because redirect following was disabled and each response was the expected HTTP 200 at the requested URL, no redirect was accepted or followed. This satisfies the canonical redirect boundary without inferring from current host state.

## Exact Node identity

The official checksum-list request completed and the exact entry for the authorized archive matched before the archive request was consumed.

```text
NODE_VERSION = 24.20.0
NODE_ARCHIVE = node-v24.20.0-linux-x64.tar.xz
NODE_ARCHIVE_BYTES = 31838904
NODE_ARCHIVE_SHA256 = 2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2
NODE_ARCHIVE_SHA256_MATCH = PASS
NODE_ARCHIVE_PATH_SAFETY = PASS
NODE_EXECUTABLE_BYTES = 126458664
NODE_EXECUTABLE_SHA256 = 89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7
NODE_EXECUTABLE_SHA256_MATCH = PASS
NODE_EXECUTED = NO
```

Static extraction occurred only outside the repository after archive identity and path-safety checks passed. The extracted `bin/node` was hashed but never executed.

## Exact pnpm identity

The exact-version packument was validated before the tarball request. It bound `name=pnpm`, `version=10.34.5`, the exact authorized tarball URL, canonical SHA-1, and canonical SHA-512 SRI.

```text
PNPM_VERSION = 10.34.5
PNPM_TARBALL_BYTES = 4862438
PNPM_TARBALL_SHA1 = 6a91127a7f2ca72fe53bb9ff54883e0c75b22f17
PNPM_TARBALL_SHA256 = ccb5c479cab1b00621325bfe7d4c9a8a8031e7a525d7249e275ecbec81b08db2
PNPM_TARBALL_SHA512 = a4ee05f2f73658255bd6a89859c065a45c28a57daefae2c893a168ee2b73168c37b91e83e57ea67654ad03f03031746430e8bce38e362e042605fb8abc80192e
PNPM_TARBALL_SHA512_SRI = sha512-pO4F8vc2WCVb1qiYWcBlpFwopX2u+uLIk6Fo7itzFow3uR6D5X6mdlStA/AwMXRkMOi84442LgQmBfuKvIAZLg==
PNPM_TARBALL_ALL_HASHES_AND_SRI_MATCH = PASS
PNPM_ARCHIVE_PATH_SAFETY = PASS
PNPM_ENTRYPOINT = package/bin/pnpm.cjs
PNPM_ENTRYPOINT_BYTES = 1102
PNPM_ENTRYPOINT_SHA256 = b276da51dc8ca5b0d3ee3371695b50fc8b3244b281b091c63a3f082a88dadeb9
PNPM_ENTRYPOINT_SHA256_MATCH = PASS
PNPM_EXECUTED = NO
```

Static extraction occurred only outside the repository. The pnpm entrypoint was hashed but never executed.

## Deterministic evidence manifest

The retained evidence root contains the exact acquisition script, authority record, environment boundary, per-request metrics and verbose transport transcripts, credential-header checks, exact fetched inputs and archives, static extraction outputs, summary, and inventories. A deterministic sorted `path<TAB>bytes<TAB>sha256` manifest covers 5,902 data files and independently reverifies with zero missing, size-mismatched, or hash-mismatched rows.

The evidence root remains outside the repository. No developer-local absolute path is committed by this qualification artifact.

## Qualification result and fail-closed successor boundary

```text
004C1EX_EXACT_TOOLCHAIN_TRANSPORT_PROVENANCE_REACQUISITION = PASS
NETWORK_REQUESTS_EXECUTED = 4_OF_4_AUTHORIZED
DIRECT_HTTPS_TRANSPORT = PASS_4_OF_4
FINAL_EFFECTIVE_URL_EXACT = PASS_4_OF_4
REDIRECT_COUNT_ZERO = PASS_4_OF_4
TLS_VERIFICATION = PASS_4_OF_4
REQUEST_CREDENTIAL_HEADERS_ABSENT = PASS_4_OF_4
PROXY_AND_CREDENTIAL_ENV_AFTER_UNSET = PASS
CURL_CONFIG_DISABLED = PASS
NODE_BODY_RETAINED_AND_STATICALLY_VERIFIED = PASS
PNPM_BODY_RETAINED_AND_STATICALLY_VERIFIED = PASS
EXACT_TOOLCHAIN_BODIES_AVAILABLE_FOR_SUCCESSOR_QUALIFICATION = PASS
NODE_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
PNPM_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
COREPACK_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
RESOLVER_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
PROJECT_DEPENDENCY_ACQUISITION = PROHIBITED_AND_NOT_PERFORMED
DEPENDENCY_MATERIALIZATION = NOT_AUTHORIZED
NODE_MODULES_CREATION = PROHIBITED_AND_NOT_PERFORMED
PACKAGE_LIFECYCLE_OR_BUILD_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
DISTRIBUTION_ACTIVATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

This qualification does not itself grant a dependency-materialization attempt. Any successor consumption of the newly retained qualified bodies requires fresh canonical Issue #7 reconciliation after exact-head independent substantive review, guarded normal merge, and mechanical post-merge verification of this record.
