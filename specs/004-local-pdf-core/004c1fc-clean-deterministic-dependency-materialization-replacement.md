# 004C1FC Clean Deterministic Dependency Materialization Replacement Qualification

## 1. Canonical decision

```text
UNIT = 004C1FC_CLEAN_DETERMINISTIC_DEPENDENCY_MATERIALIZATION_REPLACEMENT
RESULT = PASS_FOR_REPOSITORY_CANDIDATE
PARENT_AUTHORITY = github:issue-comment:5658708308
VALIDATOR_REPAIR_AUTHORITY = github:issue-comment:5658759990
EXECUTION_CLOSEOUT = github:issue-comment:5658781534
CANONICAL_BASE = adf6860961c91e8110d045b7dad6db73b230cde0
CANONICAL_BASE_TREE = 3344138e2b1af05e1ee0e0a3d98edecb170a1e05
MATERIALIZATION_ATTEMPTS = 1_CONSUMED
MATERIALIZATION_RETRY_AUTHORITY = ABSENT
PROJECT_COMPLETE = false
```

This artifact records the one clean replacement dependency-materialization attempt authorized by canonical Issue #7. The execution evidence was frozen outside the repository before this artifact was created. No downloaded archive, materialized package payload, pnpm store, cache, temporary file, or toolchain body is committed by this qualification.

## 2. Repository and control boundary

The attempt used a fresh clean detached worktree at the exact canonical base. The pre- and post-execution Git status bytes are identical, the postrun worktree remained clean, and the postrun open-PR set was empty.

| Control input | SHA-256 |
| --- | --- |
| `package.json` | `71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183` |
| `pnpm-lock.yaml` | `ee29f5f0f4d1b1b98fbd615de64589a7a5b6a92bee368f4ef8a07255a989479e` |
| `pnpm-workspace.yaml` | `695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f` |
| `provenance/components/pdfium-2.15.0/ADOPTION.json` | `e05b64a2dba4a319aef8d2978898b6db966e5bed5b6fef2264af6c1ce731bb36` |

```text
ROOT_NPMRC = ABSENT
CONTROL_HASHES = PASS_4_OF_4
PRE_POST_GIT_STATUS_BYTE_EQUAL = TRUE
POSTRUN_WORKTREE_CLEAN = TRUE
OPEN_PULL_REQUESTS_POST = 0
REPOSITORY_WORKTREE_MOUNTS = 0
```

## 3. Qualified retained toolchain and substrate

| Retained body | SHA-256 |
| --- | --- |
| `tool_node_archive` | `2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2` |
| `tool_node_executable` | `89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7` |
| `tool_pnpm_entrypoint` | `b276da51dc8ca5b0d3ee3371695b50fc8b3244b281b091c63a3f082a88dadeb9` |
| `tool_pnpm_tarball` | `ccb5c479cab1b00621325bfe7d4c9a8a8031e7a525d7249e275ecbec81b08db2` |

```text
IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
IMAGE_ID = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
PLATFORM = linux/amd64
PULL = never
READ_ONLY_ROOTFS = true
CAP_DROP = ALL
NO_NEW_PRIVILEGES = true
PIDS_LIMIT = 512
MEMORY = 4g
CPUS = 2
REGISTRY_ALLOWLIST = registry.npmjs.org:443
PROXY = NONE
CREDENTIALS = NONE
REDIRECTS = PROHIBITED
```

The materialization container received only the external canonical snapshot/evidence root as its writable attempt mount and the retained toolchain bodies as a read-only mount. No repository worktree was mounted into the container.

## 4. Exact materialization command envelope

```text
/toolchain/node/node-v24.20.0-linux-x64/bin/node /toolchain/pnpm/package/bin/pnpm.cjs install --frozen-lockfile --ignore-scripts --strict-peer-dependencies --reporter=ndjson --store-dir=/attempt/PNPM_STORE_DIR --modules-dir=/attempt/MATERIALIZED_NODE_MODULES_ROOT --registry=https://registry.npmjs.org/
```

The execution environment explicitly unset HTTP/HTTPS/all proxy variables, npm user configuration, registry credentials, and Corepack state; it set the registry to `https://registry.npmjs.org/` and confined HOME/cache/temp/store/modules outputs beneath the external attempt root. `--frozen-lockfile`, `--ignore-scripts`, and `--strict-peer-dependencies` were active.

## 5. Archive admission and network evidence

```text
ARCHIVE_ADMISSION = PASS_18_OF_18
ARCHIVE_ADMISSION_SCRIPT_SHA256 = dadbbdb55e7d4e31106600eb811d61fb721bf494f61006fe6083650bc3c20eca
ARCHIVE_ADMISSION_SUMMARY_SHA256 = 01088326d31aa638ba3e69e1f1a62daaac34b1eba8c57b799653dc4bc6c75244
NETWORK_HOSTS = registry.npmjs.org
OBSERVED_CREDENTIAL_HEADERS = NONE
OBSERVED_PROXY_USE = NONE
```

All 18 expected package archives were independently admitted before the single materialization launch. Observed project-dependency network traffic was confined to `registry.npmjs.org`; no alternate package host, credential header, or proxy use qualified.

## 6. Materialization result

```text
CONTAINER_EXIT = 0
DOCKER_START_ATTACH_EXIT = 0
OOM_KILLED = FALSE
RESOLVED = 18
FETCHED = 18
MATERIALIZED = 18
PAYLOAD_BYTE_EXACT_MATCHES = 18
LIFECYCLE_EXECUTION = 0
MATERIALIZED_INVENTORY_ENTRIES = 934
MATERIALIZED_INVENTORY_SHA256 = 6490e2adc663d3970ddd1cfacd37f139ebf303a9e5a40daf2665b46f9f66c585
PACKAGE_SUMMARY_SHA256 = ee83a2695cf9f217d3bb8ec3e33f6515d5dd27543dc17c857ea7de84f3f60ead
```

Resolved, fetched, and materialized identities are exactly equal at 18 packages with no extras. Every materialized regular-file payload compared against the corresponding admitted tarball payload passed byte-exact verification. Lifecycle/build execution count is zero.

## 7. Exact qualified package set

| Package | Regular files | Symlinks | Admitted tarball SHA-256 |
| --- | ---: | ---: | --- |
| `@embedpdf/core@2.15.0` | 116 | 0 | `9dd8825fea07a3a48b1befe4ba08d4841693f26bc2a4c1f0cab347126179a73d` |
| `@embedpdf/engines@2.15.0` | 124 | 0 | `044aeff2b0b453666c73def7cd06843d5f4510b028a4019785c2f1d814d24983` |
| `@embedpdf/fonts-arabic@1.0.0` | 10 | 0 | `6877696b89128ba8c488c96456f80dc0a5154d6ea9530148e0ba515fb6b88046` |
| `@embedpdf/fonts-hebrew@1.0.0` | 10 | 0 | `af0780c63bf2058337fddce3059722811f992137e66537383881a0da3923aac2` |
| `@embedpdf/fonts-jp@1.0.0` | 15 | 0 | `df8af067c031e5dea31dab7105bf01560cccfe007fe055d7d69b395fc1526b58` |
| `@embedpdf/fonts-kr@1.0.0` | 15 | 0 | `c6e93dac723b37c743af2007fb3e18ac9ce8dce10f65beb100b3c8327571fcec` |
| `@embedpdf/fonts-latin@1.0.0` | 26 | 0 | `474d091abd00f943422546462277ad3a3f29fdb4f44019a575888d5d8b763f18` |
| `@embedpdf/fonts-sc@1.0.0` | 13 | 0 | `589e6a5f2168430b4ae5a46bfdc4606f1798f5c06be5a2369ab89f75b804a0ad` |
| `@embedpdf/fonts-tc@1.0.0` | 15 | 0 | `3627a6a23f0cb07dca9a72db07e2e47afb15b934b850529367458b64b322e8a4` |
| `@embedpdf/models@2.15.0` | 28 | 0 | `ce7859614d73cd2356329ce5b5b9685de0563ab1fcd1bab519ae1efcf2318fd9` |
| `@embedpdf/pdfium@2.15.0` | 18 | 0 | `fe0cb4677782a58b67f555df9a1257742bcfbf390b9a3e08bd8ad976eea436bb` |
| `@embedpdf/plugin-document-manager@2.15.0` | 68 | 0 | `627e3b189fd7ee6401c6878636bc3bf6cc4a86450871dd448dbc6cb8c68a9951` |
| `@embedpdf/plugin-interaction-manager@2.15.0` | 70 | 0 | `c847529a63afcad49092875768526ea58ee28807f1925f8443625c44f5f9c1dc` |
| `@embedpdf/plugin-render@2.15.0` | 58 | 0 | `f594e90916168c952433c410582519caa4704c990f31a0ccfcf6e7e14b4c44de` |
| `@embedpdf/plugin-search@2.15.0` | 60 | 0 | `307118b067cd30fd97251be46fe7ae917f29bc20603d9bd371461b5481f3eeda` |
| `@embedpdf/plugin-selection@2.15.0` | 89 | 0 | `4bab888db26e696ac6ce9457a3aea03246929802f6721e43d5c58e2c15101f28` |
| `@embedpdf/plugin-thumbnail@2.15.0` | 65 | 0 | `40f1155ad6de9805441e9b2d2179ffd8db784ea59172bb7a796c80475f28bee5` |
| `@embedpdf/utils@2.15.0` | 98 | 0 | `fc64ec73a43fdcf4727874b188c1c291489f61ca5a9fe673aefdd30a21ae3172` |

## 8. Postrun validator control repair

The first postrun validator is preserved as failed control evidence. Its unintended reporter-shape predicate required a `status=started` observation even though canonical authority did not make that cardinality a qualification predicate. No materialization rerun, archive-admission rerun, network request, Node execution, pnpm execution, or Docker start was authorized for the repair.

```text
POSTRUN_VALIDATOR_V1_EXIT = 1
POSTRUN_VALIDATOR_V1_PRESERVED = TRUE
POSTRUN_VALIDATOR_V2_SHA256 = 846b7a0dbfc5d07f3cfbaa55dd2744d7812e788c094e62a4d55054dffb3e1f8a
POSTRUN_VALIDATOR_V2_EXIT = 0
POSTRUN_VALIDATOR_V2_RESULT = PASS
STARTED_OBSERVATION = 0
```

Validator V2 read only the already-consumed attempt bytes and established the authority-required predicates: exact 18/18 identity equality, 18 byte-exact package payload matches, zero lifecycle execution, registry-only network confinement, stable control hashes, deterministic materialized inventory, and repository nonmutation.

## 9. Coordination lock and evidence finalization

```text
authority=github:issue-comment:5658708308
unit=004C1FC_CLEAN_DETERMINISTIC_DEPENDENCY_MATERIALIZATION_REPLACEMENT
owner_pid=89322
acquired_utc=2026-09-14T03:49:34.693540000Z
worktree=/Users/abdulazizalsh/Signthos-worktrees/004c1fc-clean-materialization-20260914T034932Z
evidence_root=/Users/abdulazizalsh/Signthos-evidence/004c1fc-clean-materialization-20260914T034932Z
LOCK_HELD_AT_FINALIZATION = TRUE
FINALIZATION_UTC = 2026-09-14T03:58:39.910021Z
```

The same exclusive coordination lock remained held through archive admission, the single materialization launch, postrun validation, evidence-manifest completion, and durable finalization. Release occurred only after finalization.

## 10. Frozen evidence identities

```text
EVIDENCE_ROOT = 004c1fc-clean-materialization-20260914T034932Z
PRIMARY_EVIDENCE_MANIFEST_ROWS_WITH_HEADER = 2291
PRIMARY_EVIDENCE_MANIFEST_SHA256 = abe74dfab2d99d5e9f100277d2b805c534cfd1db675e4405b7d5f7d99b46b2df
ARCHIVE_ADMISSION_SUMMARY_SHA256 = 01088326d31aa638ba3e69e1f1a62daaac34b1eba8c57b799653dc4bc6c75244
PACKAGE_SUMMARY_SHA256 = ee83a2695cf9f217d3bb8ec3e33f6515d5dd27543dc17c857ea7de84f3f60ead
MATERIALIZED_INVENTORY_SHA256 = 6490e2adc663d3970ddd1cfacd37f139ebf303a9e5a40daf2665b46f9f66c585
```

The frozen evidence root remains external to Git. This document records reviewable identities and conclusions only; it does not import the evidence payloads.

## 11. Qualification conclusion and successor boundary

```text
004C1FC = PASS_FOR_REPOSITORY_CANDIDATE
DETERMINISTIC_DEPENDENCY_MATERIALIZATION = QUALIFIED_FOR_THIS_EXACT_ATTEMPT
SECOND_MATERIALIZATION_LAUNCH = NOT_AUTHORIZED
DEPENDENCY_PAYLOAD_IMPORT_TO_REPOSITORY = NOT_AUTHORIZED
GENERAL_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

Canonical closeout of this repository candidate still requires a fresh independent substantive exact-head review, zero unresolved material review threads, immediate premerge race proof, guarded normal merge with the exact expected head SHA, mechanical post-merge verification, and fresh Issue #7 successor reconciliation. No runtime, distribution, 004C2, 004D, Specification 005, release, deployment, or project-completion authority is inferred by this qualification.
