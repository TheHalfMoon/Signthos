# Specification 004C1EV — Deterministic Dependency Materialization Prelaunch Qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_PRELAUNCH_ONLY / EXECUTION_BLOCKED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `9092267b0e83d1dd0c007a3a6270f3d9e663fe87`
Canonical base tree: `28843ebda425b62469c0d2f7611e56338b66d2ef`
Authority source: `github:issue-comment:5654377078`

## 1. Purpose and authority boundary

004C1EV freezes the static dependency-materialization envelope permitted by the post-004C1EU reconciliation. It does not perform dependency acquisition, installation, extraction, `node_modules` creation, package-manager execution, provider/PDF runtime execution, or lifecycle/build execution.

```text
004C1EV_AUTHORITY = STATIC_PRELAUNCH_QUALIFICATION_ONLY
004C1EV_ALLOWED_PATH = specs/004-local-pdf-core/004c1ev-dependency-materialization-prelaunch-qualification.md
004C1EV_MAX_CHANGED_REPOSITORY_FILES = 1
PROJECT_DEPENDENCY_ARCHIVE_DOWNLOAD = NOT_AUTHORIZED
PROJECT_DEPENDENCY_INSTALLATION = NOT_AUTHORIZED
NODE_MODULES_CREATION = NOT_AUTHORIZED
NODE_EXECUTION = NOT_AUTHORIZED
PNPM_EXECUTION = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
LIFECYCLE_OR_BUILD_EXECUTION = NOT_AUTHORIZED
PACKAGE_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_MUTATION = NOT_AUTHORIZED
NPMRC_MUTATION = NOT_AUTHORIZED
PROVENANCE_MUTATION = NOT_AUTHORIZED
SOURCE_OR_RUNTIME_MUTATION = NOT_AUTHORIZED
PDFIUM_RUNTIME_EXECUTION = NOT_AUTHORIZED
DISTRIBUTION_ACTIVATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

## 2. Exact canonical repository inputs

Fresh reread on the exact canonical base established:

```text
package.json.bytes = 509
package.json.sha256 = 71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183
package.json.git_blob = 510341a3ad1bad08084e338152da8bef1f698b14

pnpm-workspace.yaml.bytes = 2473
pnpm-workspace.yaml.sha256 = 695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f
pnpm-workspace.yaml.git_blob = 2e6712fa22a1d01547cec4249d1c12b0c2cfeaf1

pnpm-lock.yaml.bytes = 9485
pnpm-lock.yaml.sha256 = ee29f5f0f4d1b1b98fbd615de64589a7a5b6a92bee368f4ef8a07255a989479e
pnpm-lock.yaml.git_blob = 015e3cfc386743731544f3c889f2d01a76a71a62

provenance/components/pdfium-2.15.0/ADOPTION.json.bytes = 6767
provenance/components/pdfium-2.15.0/ADOPTION.json.sha256 = e05b64a2dba4a319aef8d2978898b6db966e5bed5b6fef2264af6c1ce731bb36
provenance/components/pdfium-2.15.0/ADOPTION.json.git_blob = 694234d7282083ead66b406c1d924976d9723db1

ROOT_NPMRC = ABSENT
PACKAGES_PROVIDERS_DIRECTORY = ABSENT
```

The absent `packages/providers` workspace member is recorded as current repository truth. This grain does not create it or reinterpret its absence as package-manager execution evidence.

## 3. Exact resolved dependency closure

The canonical lockfile contains exactly 18 package identities in its `packages` section. The identity set remains the canonical 004C1AC/004C1EU closure:

| Package | Version | License | Canonical registry SHA-1 |
| --- | --- | --- | --- |
| `@embedpdf/core` | `2.15.0` | MIT | `6c3d962910afdd63f88725c92afb872f1cf430e4` |
| `@embedpdf/engines` | `2.15.0` | MIT | `2e068fe4959575d82ec489fae01b9630f15ac6e8` |
| `@embedpdf/fonts-arabic` | `1.0.0` | OFL-1.1 | `32cf6e9b13a73827800278db7ae832981f9764df` |
| `@embedpdf/fonts-hebrew` | `1.0.0` | OFL-1.1 | `5ad24258c1606fa95dbb4ba5fa67757502c58edc` |
| `@embedpdf/fonts-jp` | `1.0.0` | OFL-1.1 | `03c643bde1e0e556bfa1cf4bbb7eafbe555aa9ac` |
| `@embedpdf/fonts-kr` | `1.0.0` | OFL-1.1 | `4652ae3b26a83c3c7e499f0b7b60375fb9bb1d46` |
| `@embedpdf/fonts-latin` | `1.0.0` | OFL-1.1 | `b646560c2c147f0ccbf04ae26ef18c7822506240` |
| `@embedpdf/fonts-sc` | `1.0.0` | OFL-1.1 | `a52a70b3cb36e9e49148f2055f51d0fa387f41bf` |
| `@embedpdf/fonts-tc` | `1.0.0` | OFL-1.1 | `21262bb512ede384c3fb84b952a6812b98e793f4` |
| `@embedpdf/models` | `2.15.0` | MIT | `dff75043166abf361c850f294ec242ff4eacbdd8` |
| `@embedpdf/pdfium` | `2.15.0` | MIT | `b073cf9cee2252507c4fc81fb47a156cb2a19662` |
| `@embedpdf/plugin-document-manager` | `2.15.0` | MIT | `2a9cfc2a9942c54d23432209942448a1a81b0c12` |
| `@embedpdf/plugin-interaction-manager` | `2.15.0` | MIT | `d899c14f262358d7120124d5cf9d4e9df4dcf885` |
| `@embedpdf/plugin-render` | `2.15.0` | MIT | `da1cfac73c3f8f8dcd064a7fc27d953b73eb2d3a` |
| `@embedpdf/plugin-search` | `2.15.0` | MIT | `4dc1dc7c80bbf1f121f34cfb5208456439078048` |
| `@embedpdf/plugin-selection` | `2.15.0` | MIT | `a2f269c0b66ef96ea06ad68c731cd3233346194f` |
| `@embedpdf/plugin-thumbnail` | `2.15.0` | MIT | `ca68dc15714a5790295eb569507acdb3b59bf9c5` |
| `@embedpdf/utils` | `2.15.0` | MIT | `bd7561a76b0117421354c08b15582c1f6791e4f3` |

Canonical closure identities remain:

```text
RESOLVED_PACKAGE_IDENTITIES = 18
NORMALIZED_RESOLVED_GRAPH_SHA256 = 6d0ab3f8e03ef4af0c56dfafb6f5c7b09b8ade00360c0d5632131c96db54f448
REGISTRY_IDENTITY_SET_SHA256 = f05755127da744c3e195c6ab5654c15f04a79e94e2508b440229fbfb9135a9a4
FRESH_REPLAY_ARCHIVE_IDENTITY_SET_SHA256 = 1f05d8d4ff98a3f9fc11762f13dab05269fa944df02ae8b973da68c32202181f
```

No Git, file, URL, exotic, optional, CPU-, OS-, or libc-specific package identity is present in this lockfile closure. The substring `file:` appears only inside the YAML key `excludeLinksFromLockfile`; it is not a dependency source.

## 4. Fresh metadata-only registry replay

A fresh direct HTTPS metadata replay queried the exact 18 version documents from `registry.npmjs.org`. Proxy and credential state were not used. No project dependency archive was downloaded and no Node or pnpm executable was run.

The replay independently compared each exact version document against the canonical lockfile and historical registry identity evidence:

```text
RESOLVED_PACKAGES = 18
LOCKFILE_SRI_MATCH_COUNT = 18
REGISTRY_SHASUM_CANONICAL_MATCH_COUNT = 18
LICENSE_CANONICAL_MATCH_COUNT = 18
REGISTRY_TARBALL_HOST_MATCH_COUNT = 18
DEPRECATED_COUNT = 0
PUBLISHED_LIFECYCLE_HOOK_PACKAGE_COUNT = 0
MIT_PACKAGE_COUNT = 11
OFL_1_1_PACKAGE_COUNT = 7
```

The retained external metadata-only evidence bundle is identified without embedding a developer-local absolute path:

```text
EVIDENCE_BUNDLE_LABEL = 004c1ev-static-registry-qualification-20260913T161722Z
REGISTRY_SUMMARY_TSV_SHA256 = 1586626d548d30ec6c0b3e828b81ca95729743ded184087e09d8fe5a5d4d737c
SUMMARY_JSON_SHA256 = 79ba15e1ddac72a9b60753da4862eef2666c91f0cc8e2abb77f8ac390e9d563e
EVIDENCE_MANIFEST_TSV_SHA256 = 162e53ceb6a26f93855fce96e6a120cc4e43e7d35fdfaad0978933a748a5dee8
```

A supplemental exact-version OSV lookup across the same 18 identities reported zero known findings at lookup time. This is time-bounded metadata only and is not a permanent security assertion or a substitute for a fresh check immediately before a later authorized acquisition/materialization attempt.

## 5. Previously qualified archive and redistribution evidence

Canonical 004C1AC already acquired and independently verified all 18 exact registry tarballs outside the repository without installing them:

```text
ACQUIRED_TARBALL_COUNT = 18
LOCKFILE_SRI_MATCH_COUNT = 18
REGISTRY_DIST_INTEGRITY_MATCH_COUNT = 18
REGISTRY_DIST_SHASUM_MATCH_COUNT = 18
ARCHIVE_INTEGRITY_FAILURE_COUNT = 0
UNSAFE_ARCHIVE_PATH_COUNT = 0
EXTRACTED_NODE_MODULES_COUNT = 0
PACKAGE_CODE_EXECUTION_COUNT = 0
TOTAL_TARBALL_BYTES = 133277848
FRESH_REPLAY_ARCHIVE_IDENTITY_SET_SHA256 = 1f05d8d4ff98a3f9fc11762f13dab05269fa944df02ae8b973da68c32202181f
```

Every resolved archive was observed with zero `preinstall`, `install`, `postinstall`, `prepare`, or `prepublish` hook. That historical evidence is corroborated by the fresh metadata replay; it does not grant lifecycle execution authority.

The seven font archives each bind exact OFL-1.1 license bytes:

```text
FONT_PACKAGE_COUNT = 7
FONT_ASSET_COUNT = 48
FONT_LICENSE_SHA256 = cea028c0b5185b804ae79f1eab96ca5ee469d61d44925972a2379430890bbec1
FONT_LICENSE_BYTES = 4484
FONT_ARCHIVE_LICENSE_FILE_BINDING = ESTABLISHED
```

The PDFium redistribution surface is separately bound by canonical 004C1AC through 004C1ET and the adopted `provenance/components/pdfium-2.15.0/` subtree. Therefore package-level MIT metadata is not used as a substitute for PDFium component-level NOTICE/license evidence, and font OFL obligations are not collapsed into wrapper MIT metadata.

## 6. Frozen first-platform execution identity

The first qualified project-dependency materialization tuple remains:

```text
PLATFORM = linux-x64-glibc
NODE_VERSION = 24.20.0
PACKAGE_MANAGER = pnpm
PNPM_VERSION = 10.34.5
COREPACK = PROHIBITED
GLOBAL_PNPM_LOOKUP = PROHIBITED
REGISTRY_ORIGIN = https://registry.npmjs.org/
REGISTRY_TLS_PORT = 443
PROXY = NONE
CREDENTIALS = NONE
CROSS_ORIGIN_REDIRECT = PROHIBITED
UNDECLARED_NETWORK_HOST = FAIL_CLOSED
LIFECYCLE_EXECUTION = DENY_BY_DEFAULT
BUILD_EXECUTION = DENY_BY_DEFAULT
```

Previously qualified toolchain identities are:

```text
NODE_ARCHIVE = node-v24.20.0-linux-x64.tar.xz
NODE_ARCHIVE_SHA256 = 2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2
NODE_EXECUTABLE_SHA256 = 89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7
PNPM_TARBALL = pnpm-10.34.5.tgz
PNPM_TARBALL_SHA1 = 6a91127a7f2ca72fe53bb9ff54883e0c75b22f17
PNPM_TARBALL_SHA256 = ccb5c479cab1b00621325bfe7d4c9a8a8031e7a525d7249e275ecbec81b08db2
PNPM_TARBALL_SHA512_SRI = sha512-pO4F8vc2WCVb1qiYWcBlpFwopX2u+uLIk6Fo7itzFow3uR6D5X6mdlStA/AwMXRkMOi84442LgQmBfuKvIAZLg==
PNPM_ENTRYPOINT_SHA256 = b276da51dc8ca5b0d3ee3371695b50fc8b3244b281b091c63a3f082a88dadeb9
```

## 7. Persistent tool-body retention check

A fresh host-only filesystem scan under the persistent Signthos evidence root searched for:

```text
node
pnpm.cjs
node-v24.20.0-linux-x64.tar.xz
pnpm-10.34.5.tgz
```

It found zero candidate files. No tool was executed during this check.

```text
QUALIFIED_NODE_BODY_RETAINED_IN_PERSISTENT_EVIDENCE_ROOT = NOT_FOUND
QUALIFIED_PNPM_BODY_RETAINED_IN_PERSISTENT_EVIDENCE_ROOT = NOT_FOUND
TOOLCHAIN_IDENTITY = QUALIFIED
TOOLCHAIN_EXECUTABLE_BODY_AVAILABILITY = BLOCKED
```

This is a dependency-order blocker. 004C1EV does not reacquire the bodies because its authority explicitly forbids project dependency acquisition and does not independently grant toolchain reacquisition/extraction execution. A successor must derive fresh authority before restoring exact toolchain bodies.

## 8. Frozen later-attempt evidence envelope

A unique persistent prelaunch evidence root was created before any project dependency acquisition. Its basename is retained in this document without a developer-local absolute path:

```text
PRELAUNCH_EVIDENCE_ROOT_LABEL = 004c1ev-dependency-materialization-prelaunch-20260913T161252Z
PRELAUNCH_EVIDENCE_ROOT_ENTRY_COUNT = 0
PRELAUNCH_EVIDENCE_ROOT_STATE = EMPTY
```

Any later authorized materialization attempt must use a fresh unique root rather than treating this planning root as reusable execution state. At minimum the later root must contain isolated and initially empty:

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

The later attempt must remove inherited proxy and credential variables, authorize only `registry.npmjs.org:443`, preserve TLS verification, reject cross-origin redirects, deny lifecycle/build execution, and fail on any unexpected host or package identity.

## 9. Mandatory archive-verification order for a later authorized attempt

No archive may be extracted or admitted merely because pnpm requested it. For every one of the 18 exact identities, a later authorized attempt must prove in order:

1. requested name/version belongs to the exact frozen 18-package closure;
2. effective transport origin remains `registry.npmjs.org`;
3. registry exact-version metadata still exposes the canonical `dist.integrity` and `dist.shasum`;
4. downloaded bytes reproduce the registry SHA-512 SRI;
5. downloaded bytes reproduce the canonical SHA-1;
6. downloaded bytes reproduce the canonical 004C1AC SHA-256 identity when that retained identity is applicable;
7. archive path safety remains clean;
8. archive manifest still exposes no lifecycle hook requiring execution;
9. license/notice classification remains consistent with the canonical 11 MIT / 7 OFL-1.1 package boundary and the separate PDFium component adoption evidence;
10. only then may separately authorized materialization proceed.

Any mismatch fails the attempt before extraction or package code execution.

## 10. Repository non-mutation contract

004C1EV changes only this qualification artifact. A later materialization attempt must preserve these canonical repository inputs byte-for-byte unless a future authority explicitly changes them:

```text
package.json.sha256 = 71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183
pnpm-workspace.yaml.sha256 = 695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f
pnpm-lock.yaml.sha256 = ee29f5f0f4d1b1b98fbd615de64589a7a5b6a92bee368f4ef8a07255a989479e
ADOPTION.json.sha256 = e05b64a2dba4a319aef8d2978898b6db966e5bed5b6fef2264af6c1ce731bb36
ROOT_NPMRC = ABSENT
```

The later evidence harness must record pre/post Git status, pre/post hashes of every listed canonical input, and any created untracked materialization surface. Any unrelated repository mutation fails closed.

## 11. Deterministic evidence manifest requirement

A later attempt must freeze, before launch, a deterministic manifest containing at minimum:

```text
canonical_main_sha
canonical_main_tree
package_json_sha256
workspace_yaml_sha256
lockfile_sha256
pdfium_adoption_sha256
resolved_graph_sha256
registry_identity_set_sha256
all_18_name_version_license_sri_shasum_records
node_archive_sha256
node_executable_sha256
pnpm_tarball_sha256
pnpm_entrypoint_sha256
platform_tuple
registry_allowlist
proxy_and_credential_absence
isolated_path_layout
prelaunch_empty_state
exact_attempt_count
```

Post-run evidence must additionally bind every acquired archive digest, effective URL/host, extraction/materialization result, lifecycle denial evidence, network observation, repository diff/status, and deterministic output inventory.

## 12. Static result and launch blocker

The dependency closure, registry-integrity mapping, license/notice boundary, canonical repository control bytes, first-platform tuple, network boundary, and required evidence contract are sufficiently frozen for static prelaunch qualification.

However, the exact previously qualified Node and pnpm executable bodies were not found in persistent retained evidence. Consequently this grain does not qualify an executable launch state.

```text
004C1EV_STATIC_PRELAUNCH_QUALIFICATION = PASS
EXACT_RESOLVED_CLOSURE = PASS_18_OF_18
FRESH_REGISTRY_SRI_PARITY = PASS_18_OF_18
FRESH_REGISTRY_SHASUM_PARITY = PASS_18_OF_18
FRESH_LICENSE_PARITY = PASS_18_OF_18
FRESH_REGISTRY_TARBALL_HOST_PARITY = PASS_18_OF_18
UNRESOLVED_LICENSE_NOTICE_BOUNDARY = 0
EXACT_TOOLCHAIN_IDENTITIES = QUALIFIED
EXACT_TOOLCHAIN_BODIES_AVAILABLE_FOR_LAUNCH = FAIL_CLOSED
MATERIALIZATION_LAUNCH_READINESS = BLOCKED
MATERIALIZATION_ATTEMPT_AUTHORITY = ABSENT
```

A fresh successor reconciliation must decide the smallest allowed toolchain-body restoration/requalification step. The missing bodies must not be replaced with ambient `node`, global `pnpm`, Corepack, a different version, or a new download without explicit authority and exact identity verification.

## 13. Candidate acceptance and merge gate

004C1EV may close canonically only if:

1. canonical main remains exactly `9092267b0e83d1dd0c007a3a6270f3d9e663fe87` / tree `28843ebda425b62469c0d2f7611e56338b66d2ef` through premerge race proof;
2. exactly this one Signthos-authored qualification artifact changes;
3. the current 18-package closure and fresh metadata replay remain represented without claiming project archive acquisition;
4. the seven OFL packages and PDFium redistribution obligations remain separately bound rather than collapsed into package-level MIT;
5. the missing retained tool bodies remain explicit rather than substituted by ambient tooling;
6. no Node/pnpm/resolver/provider/PDF runtime execution occurs;
7. no project dependency archive is downloaded or installed;
8. no package/workspace/lockfile/.npmrc/provenance/source/workflow/fixture/database/deployment surface changes;
9. exact-head workflow/check/provider state is recorded truthfully;
10. a fresh independent substantive review covers the exact final head;
11. every material finding is repaired forward-only and every changed head receives fresh review;
12. unresolved material review threads are zero;
13. immediate premerge race proof re-verifies canonical main, exact head/tree, changed path, review evidence, workflows/checks, mergeability, and competing authority;
14. guarded normal merge uses the exact reviewed head SHA;
15. post-merge verification proves reviewed-head/merge-tree equality, ordered parents, signature, exact changed surface, and truthful workflow state;
16. Issue #7 performs fresh successor reconciliation before any toolchain reacquisition, dependency acquisition/materialization, runtime, distribution, or later-specification authority is inferred.

No planning result or likely successor named in this document grants its own authority.
