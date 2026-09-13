# 004C1EY Dependency Materialization Launch-Readiness Qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_LAUNCH_READINESS_ONLY / MATERIALIZATION_BLOCKED`
Issue: #7
Owning specification: `004-local-pdf-core`
Authority source: `github:issue-comment:5655324703`

## 1. Authority and scope

This record implements only `004C1EY_DEPENDENCY_MATERIALIZATION_LAUNCH_READINESS_QUALIFICATION`. It performs read-only static verification of the retained qualified toolchain bodies and the canonical 004C1EV dependency-materialization envelope. It does not execute Node, pnpm, Corepack, a resolver, lifecycle/build code, provider/PDF runtime, or any project dependency network request, extraction, installation, or materialization.

```text
CANONICAL_BASE = dcbd45dc544d921151193091ce521f64ada1c956
CANONICAL_BASE_TREE = fce8c9aa464baaee5a280f4f22c6a02239705a89
PLATFORM_IDENTITY = linux-x64-glibc
AUTHORIZED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ey-dependency-materialization-launch-readiness-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
QUALIFIED_TOOLCHAIN_EVIDENCE_ROOT_LABEL = 004c1ex-toolchain-transport-provenance-reacquisition-20260913T181956Z
```

## 2. Static evidence lineage

A fresh unique prospective materialization root was created outside the repository and proved empty before any qualification record was written. It remains empty; the static qualification records are retained beside it rather than inside it so the prospective root is not consumed as execution state.

```text
PROSPECTIVE_MATERIALIZATION_ROOT_LABEL = 004c1ey-prospective-materialization-20260913T190151Z
PROSPECTIVE_ROOT_INITIAL_ENTRY_COUNT = 0
PROSPECTIVE_ROOT_INITIAL_STATE = EMPTY
PROSPECTIVE_ROOT_CURRENT_ENTRY_COUNT = 0
PROSPECTIVE_ROOT_CURRENT_STATE = EMPTY
INITIAL_EMPTY_STATE_RECORD_SHA256 = ed0465debca6f0ef3443ede609c31d8a25ae4b93de0dedb9e78f373bf8879ecd
PACKAGE_CLOSURE_TSV_SHA256 = 2b5ad4d19d027d98ad4e60cc3ae254df47ca7cae0ae7ccfc3c0cc2ef175a1fbb
PRELAUNCH_MANIFEST_TSV_SHA256 = eef9a14238dd792b1919526888eccd90c2103833410d4028ea6433b4f847f1a6
STATIC_VERIFICATION_RECORD_SHA256 = 3ac997cebc30a04600d6124a3f8d95be6911664dc51b4acc0a426944b449141b
```

The retained 004C1EX deterministic manifest was independently reverified using its `path<TAB>bytes<TAB>sha256` semantics with the header excluded from the data-row count:

```text
004C1EX_MANIFEST_SHA256 = 12d579dea1ef40c2c4db291b7794400a7ac665cd60ab15ceb7e86e3d542e323b
004C1EX_MANIFEST_DATA_ENTRIES = 5902
004C1EX_MANIFEST_MISSING = 0
004C1EX_MANIFEST_SIZE_OR_SHA256_MISMATCH = 0
```

## 3. Canonical repository control bytes

Fresh static verification on the exact canonical base reproduced every 004C1EV control identity:

| Input | Bytes | SHA-256 | Git blob |
| --- | ---: | --- | --- |
| `package.json` | 509 | `71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183` | `510341a3ad1bad08084e338152da8bef1f698b14` |
| `pnpm-workspace.yaml` | 2473 | `695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f` | `2e6712fa22a1d01547cec4249d1c12b0c2cfeaf1` |
| `pnpm-lock.yaml` | 9485 | `ee29f5f0f4d1b1b98fbd615de64589a7a5b6a92bee368f4ef8a07255a989479e` | `015e3cfc386743731544f3c889f2d01a76a71a62` |
| `provenance/components/pdfium-2.15.0/ADOPTION.json` | 6767 | `e05b64a2dba4a319aef8d2978898b6db966e5bed5b6fef2264af6c1ce731bb36` | `694234d7282083ead66b406c1d924976d9723db1` |

```text
ROOT_NPMRC = ABSENT
PACKAGES_PROVIDERS_DIRECTORY = ABSENT
CANONICAL_REPOSITORY_INPUTS_MATCH = PASS_4_OF_4
```

## 4. Exact 18-package closure

The current canonical lockfile packages section contains exactly the same 18 name/version identities frozen by 004C1EV. Every lockfile SHA-512 SRI is rebound to the canonical 004C1EV license and registry SHA-1 record.

| Package | Version | License | Lockfile SHA-512 SRI | Canonical registry SHA-1 |
| --- | --- | --- | --- | --- |
| `@embedpdf/core` | `2.15.0` | MIT | `sha512-0yaPCgvbE5/cBf+5rHBUsRUm8i6hSl894xjC19HTOmb8DqrhxOxbOQSyjiTbJTQK52zZrNL79SigsPgGHPrYWA==` | `6c3d962910afdd63f88725c92afb872f1cf430e4` |
| `@embedpdf/engines` | `2.15.0` | MIT | `sha512-fW5UoqpDRkAWDbGMl3y6ril3l2qXzoYz+klt4O2P8gWzYzhG3fmr0L2+qzjD+BPO+QfYMNNvmBI+teT/nYjm/g==` | `2e068fe4959575d82ec489fae01b9630f15ac6e8` |
| `@embedpdf/fonts-arabic` | `1.0.0` | OFL-1.1 | `sha512-SnGvQb+LwPZQO2WjjvlmXrJZolJUfLYbLZQSaYUw1vrQyMyJKT4LewvJGG+hZ+Yz2fz7OMIQ+4Gc98mGODZtOg==` | `32cf6e9b13a73827800278db7ae832981f9764df` |
| `@embedpdf/fonts-hebrew` | `1.0.0` | OFL-1.1 | `sha512-5HVAKGL7VqPeTxxADDrSqAFBxfmAXdP8fIqrPwJIKkqdK2643bOer8CqnnpO3/nPoFhkzxhttWMB9BGiqSW62w==` | `5ad24258c1606fa95dbb4ba5fa67757502c58edc` |
| `@embedpdf/fonts-jp` | `1.0.0` | OFL-1.1 | `sha512-BY2tv/mcICUUKf+M/bizf3RU65PMqKClJ/e5o9mgMibxyML0OQvEDwYMRPODQkKgJKXCO3ScHmVvcmXp6kt+fA==` | `03c643bde1e0e556bfa1cf4bbb7eafbe555aa9ac` |
| `@embedpdf/fonts-kr` | `1.0.0` | OFL-1.1 | `sha512-bh88HXSvOBS581kgmihWY7Ijp9hBsvlmXogFG5LSNx9UBAobRcakZiFMGieRBc06hUSkpo7WhjaFM/z/SfQ8dQ==` | `4652ae3b26a83c3c7e499f0b7b60375fb9bb1d46` |
| `@embedpdf/fonts-latin` | `1.0.0` | OFL-1.1 | `sha512-LLYysdr8O6sRNzhmW3PbF3AeA8xnqvOi4XLFfIfNlW5uEZ+qsJdcfd78Q78sFJMhlaOAYFMziMMsnOzmx463rA==` | `b646560c2c147f0ccbf04ae26ef18c7822506240` |
| `@embedpdf/fonts-sc` | `1.0.0` | OFL-1.1 | `sha512-ETXl7XCwaQLSSvMO3EUDwMNqtL64kX2LlFxarTRi/NsIGGOIxUurGfKtrkmtnKHrWy1jAJSt6oxK2uJhvdvQIw==` | `a52a70b3cb36e9e49148f2055f51d0fa387f41bf` |
| `@embedpdf/fonts-tc` | `1.0.0` | OFL-1.1 | `sha512-rGZJbVD6DYS5BbXdpEMnWkpVF0Knar+bsiyb2o3+YRx7O8eyFubEBQUSUInirQk69HA6fc3GhYCg7TyC/oD76Q==` | `21262bb512ede384c3fb84b952a6812b98e793f4` |
| `@embedpdf/models` | `2.15.0` | MIT | `sha512-gHr+hAN094kmzCB+6J2zaiHS8o4tKeY0IfTOxVEGwqntgKk8LCWD3s+P7dlVY3V8XUVmdyFWhFt7zwm0uw+VMg==` | `dff75043166abf361c850f294ec242ff4eacbdd8` |
| `@embedpdf/pdfium` | `2.15.0` | MIT | `sha512-KgpRND2MYcdbhzb2EMb4WzWcJYrR0A6JXvhMv4WthEHKt6qmNo2v/MC68bpYvpveYT9GNnUnY/+TG5MpXY3pRw==` | `b073cf9cee2252507c4fc81fb47a156cb2a19662` |
| `@embedpdf/plugin-document-manager` | `2.15.0` | MIT | `sha512-M8EwOuonICSHfOklTMwk0XfyPhG9v9EMDRU9Pvz0zAe1DJzUPtIxUh+CgxtFSSnUeKSfxE7JpTRryrbUW0XcGg==` | `2a9cfc2a9942c54d23432209942448a1a81b0c12` |
| `@embedpdf/plugin-interaction-manager` | `2.15.0` | MIT | `sha512-YCMvTvu4Fm1KNuEhj+CftzG+T6F1+/QhI7eaYft9Lp5xm3CYSXdR3pNfGwNFy5XkDUDwB1IscLTiU0q75viMCw==` | `d899c14f262358d7120124d5cf9d4e9df4dcf885` |
| `@embedpdf/plugin-render` | `2.15.0` | MIT | `sha512-EVfn8XsdU10VgrSs9qKo8nqjfUyt2/NWFJtlW3nX4sZ74Pi9xSvEa7/B99/LYZZMa0ENzi+4HKAXiQ6NUXisDg==` | `da1cfac73c3f8f8dcd064a7fc27d953b73eb2d3a` |
| `@embedpdf/plugin-search` | `2.15.0` | MIT | `sha512-mMzy8uo3xvDMjSc+xuBMgdI/mmmpgbZ6xKTmNxpF0d8BcaWu6Zp9a4ewamfjBwg8WF/qUW49U6HYZsiRr3NUEQ==` | `4dc1dc7c80bbf1f121f34cfb5208456439078048` |
| `@embedpdf/plugin-selection` | `2.15.0` | MIT | `sha512-iEnhx0jeQrbze7WHkHhZtF21yfGBuqF2B+V2efLHT2O0a2fnof+PEVaQQRgERSfrwRvLvyEJL9ud54E41ahsRQ==` | `a2f269c0b66ef96ea06ad68c731cd3233346194f` |
| `@embedpdf/plugin-thumbnail` | `2.15.0` | MIT | `sha512-39EojqobHmvSvk2ejKeh58m43ApGS3cie/sVZP+pkXr6MRogX6+ivMa5GfoqBzh9wdZAZ3l4XTd+RQ4kFZ4aqQ==` | `ca68dc15714a5790295eb569507acdb3b59bf9c5` |
| `@embedpdf/utils` | `2.15.0` | MIT | `sha512-13UEMPpu5XrxmYI/MPiLtJC3R3b1g8ii3zfhQ3g1WpECybnwTuhBgwqaOvqw3rVCKCnXEgNMs4PBCzLyFpZZTw==` | `bd7561a76b0117421354c08b15582c1f6791e4f3` |

```text
RESOLVED_PACKAGE_IDENTITIES = 18
EXACT_CLOSURE_MATCH_004C1EV = PASS_18_OF_18
LOCKFILE_SRI_RECORDS = 18
LICENSE_SHASUM_RECORDS = 18
NORMALIZED_RESOLVED_GRAPH_SHA256 = 6d0ab3f8e03ef4af0c56dfafb6f5c7b09b8ade00360c0d5632131c96db54f448
REGISTRY_IDENTITY_SET_SHA256 = f05755127da744c3e195c6ab5654c15f04a79e94e2508b440229fbfb9135a9a4
FRESH_REPLAY_ARCHIVE_IDENTITY_SET_SHA256 = 1f05d8d4ff98a3f9fc11762f13dab05269fa944df02ae8b973da68c32202181f
MIT_PACKAGE_COUNT = 11
OFL_1_1_PACKAGE_COUNT = 7
```

The package-level license classification does not replace the separately adopted PDFium component NOTICE/license surface, and the seven font packages remain separately classified as OFL-1.1.

## 5. Retained exact toolchain bodies

The exact bodies retained by canonical 004C1EX were re-hashed read-only. Neither executable body was invoked.

```text
NODE_ARCHIVE_SHA256 = 2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2
NODE_EXECUTABLE_SHA256 = 89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7
PNPM_TARBALL_SHA256 = ccb5c479cab1b00621325bfe7d4c9a8a8031e7a525d7249e275ecbec81b08db2
PNPM_ENTRYPOINT_SHA256 = b276da51dc8ca5b0d3ee3371695b50fc8b3244b281b091c63a3f082a88dadeb9
```

| Body | Bytes | SHA-256 | Result |
| --- | ---: | --- | --- |
| Node archive `node-v24.20.0-linux-x64.tar.xz` | 31838904 | `2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2` | PASS |
| extracted Node `bin/node` | 126458664 | `89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7` | PASS |
| pnpm tarball `pnpm-10.34.5.tgz` | 4862438 | `ccb5c479cab1b00621325bfe7d4c9a8a8031e7a525d7249e275ecbec81b08db2` | PASS |
| pnpm entrypoint `package/bin/pnpm.cjs` | 1102 | `b276da51dc8ca5b0d3ee3371695b50fc8b3244b281b091c63a3f082a88dadeb9` | PASS |

```text
NODE_VERSION = 24.20.0
PNPM_VERSION = 10.34.5
NODE_EXECUTED = NO
PNPM_EXECUTED = NO
COREPACK_EXECUTED = NO
RESOLVER_EXECUTED = NO
```

## 6. Frozen prospective launch envelope

The deterministic prelaunch manifest freezes the following launch contract without consuming it:

```text
PLATFORM_TUPLE = linux-x64-glibc
REGISTRY_ALLOWLIST = registry.npmjs.org:443
PROXY = NONE
CREDENTIALS = NONE
CROSS_ORIGIN_REDIRECT = PROHIBITED
LIFECYCLE_EXECUTION = DENY_BY_DEFAULT
BUILD_EXECUTION = DENY_BY_DEFAULT
EXACT_FUTURE_ATTEMPT_COUNT = 1
MATERIALIZATION_ATTEMPT_AUTHORITY = ABSENT
```

The future isolated path layout is frozen relative to the empty prospective root; none of these paths is materialized by 004C1EY:

```text
HOME
XDG_CACHE_HOME
PNPM_STORE_DIR
TMPDIR
MATERIALIZED_NODE_MODULES_ROOT
NETWORK_LOG
ARCHIVE_EVIDENCE
PRELAUNCH_MANIFEST
POSTRUN_MANIFEST
```

Before any future separately authorized attempt, inherited proxy and credential variables must be explicitly removed, including HTTP(S)/ALL/NO proxy variables in both cases and the frozen npm authentication/userconfig variables. The registry boundary, TLS verification, cross-origin redirect prohibition, lifecycle/build denial, exact package identity gate, archive verification order, and repository non-mutation contract from 004C1EV remain mandatory.

## 7. Static qualification result

```text
004C1EY_STATIC_LAUNCH_READINESS_QUALIFICATION = PASS
CANONICAL_REPOSITORY_INPUTS = PASS_4_OF_4
EXACT_RESOLVED_CLOSURE = PASS_18_OF_18
EXACT_TOOLCHAIN_BODIES_RETAINED_AND_REVERIFIED = PASS_4_OF_4
004C1EX_DETERMINISTIC_MANIFEST = PASS_5902_OF_5902
PROSPECTIVE_MATERIALIZATION_ROOT = EMPTY
PRELAUNCH_MANIFEST = FROZEN
MATERIALIZATION_LAUNCH_READINESS = PASS_FOR_FRESH_SUCCESSOR_AUTHORITY
MATERIALIZATION_ATTEMPT_AUTHORITY = ABSENT
DEPENDENCY_MATERIALIZATION = NOT_AUTHORIZED
PROJECT_DEPENDENCY_NETWORK_REQUESTS = NOT_AUTHORIZED
NODE_EXECUTION = NOT_AUTHORIZED
PNPM_EXECUTION = NOT_AUTHORIZED
COREPACK_EXECUTION = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
NODE_MODULES_CREATION = NOT_AUTHORIZED
PACKAGE_LIFECYCLE_OR_BUILD_EXECUTION = NOT_AUTHORIZED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
DISTRIBUTION_ACTIVATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

This PASS qualifies only the static launch envelope for a fresh successor reconciliation. It does not authorize the one future attempt named in the prelaunch manifest. Any execution requires a separate fresh Issue #7 authority after exact-head independent substantive review, guarded normal merge, mechanical post-merge verification, and successor reconciliation of this unit.

## 8. Merge gate

This candidate may merge only if canonical main remains the exact base above, exactly this one authorized repository file changes, the prospective root remains empty, no prohibited execution or dependency request has occurred, a fresh independent substantive review covers the exact final head, all material findings are repaired forward-only, unresolved material review threads are zero, and immediate premerge race proof succeeds. Merge must be a guarded normal merge using the exact reviewed head followed by mechanical post-merge verification and a fresh Issue #7 successor reconciliation.
