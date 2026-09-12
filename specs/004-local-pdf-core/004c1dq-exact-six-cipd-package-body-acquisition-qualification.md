# 004C1DQ — Exact Six CIPD Package Body Acquisition Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_EXACT_SIX_CIPD_PACKAGE_BODY_ACQUISITION / ZERO_EXTRACTION_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `b268c9451ab689f9c766ed9c693fc23b5e7c9faf`
Runtime authority: `github:issue-comment:5643365114`
Runtime closeout and document authority: `github:issue-comment:5643381076`

## 1. Purpose and authority boundary

Canonical 004C1DP closes the exact current admitted top-level Git selector identity and acquisition gap for the selected PDFium Linux/amd64 dependency graph. Its successor boundary leaves two unresolved dependency-byte classes: admitted GCS objects and the six exact CIPD instances already resolved by canonical 004C1DO.

004C1DQ closes only the smaller already-identity-closed CIPD package-body acquisition prerequisite. It acquires the exact six immutable package bodies into an external evidence root using public canonical CIPD metadata transport and direct HTTPS storage retrieval. It does not install, extract, execute, import, or otherwise materialize package contents into the repository or a build tree.

```text
004C1DQ_AUTHORITY = EXACT_SIX_CIPD_PACKAGE_BODY_ACQUISITION_ONLY
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1dq-exact-six-cipd-package-body-acquisition-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
TARGET_PLATFORM = linux-amd64
TARGETS_TOTAL = 6
CIPD_INSTALLATION = 0
CIPD_PACKAGE_EXTRACTION = 0
CIPD_PACKAGE_EXECUTION = 0
CIPD_CLIENT_EXECUTION = 0
ACQUIRED_SOURCE_EXECUTION = 0
REPOSITORY_MUTATION_DURING_ACQUISITION = 0
GCS_DOWNLOAD = 0
PDFIUM_BUILD_EXECUTION = 0
WAIVER = NO
```

## 2. Canonical predecessor truth

```text
004C1DP = CLOSED_CANONICAL
004C1DP_PR = #209
004C1DP_REVIEW = github:issue-comment:5643319808 = NO_MATERIAL_OR_ACTIONABLE_FINDINGS
004C1DP_REVIEWED_HEAD = 0ee3e33dad4b73a876cd82de91ca88857c63f4e4
004C1DP_REVIEWED_TREE = 804a0ecf4a98596bda7be52ebcfa349e39180c8d
004C1DP_MERGE = b268c9451ab689f9c766ed9c693fc23b5e7c9faf
004C1DP_MERGE_TREE = 804a0ecf4a98596bda7be52ebcfa349e39180c8d
004C1DP_PARENT_1 = 9ea4740487b5836288c36ee47bd1c44e0c1648c4
004C1DP_PARENT_2 = 0ee3e33dad4b73a876cd82de91ca88857c63f4e4
004C1DP_MERGE_SIGNATURE = VERIFIED / VALID
004C1DP_POST_MERGE_PROOF = github:issue-comment:5643363564
004C1DP_POST_MERGE_ACTION_RUNS = 0
004C1DP_POST_MERGE_COMMIT_STATUSES = 0
004C1DP_OPEN_PULL_REQUESTS_AFTER_MERGE = 0
CURRENT_ADMITTED_TOP_LEVEL_GIT_SELECTOR_ROOTS_ACQUIRED = 33 / 33
CURRENT_ADMITTED_TOP_LEVEL_GIT_SELECTOR_IDENTITY_GAP = CLOSED
```

No 004C1DP source tree was executed by this unit.

## 3. Exact canonical CIPD target set

Canonical 004C1DO resolved the six admitted Linux/amd64 selectors to immutable SHA-256-backed instance IDs. 004C1DQ introduces no new package, version, platform, or instance identity.

| Logical path | Exact package | Exact instance ID | Exact SHA-256 encoded by instance ID |
| --- | --- | --- | --- |
| `buildtools/linux64` | `gn/gn/linux-amd64` | `qdyvoyVF792YFWTtJi04a3sw6x7Dffk3mrD7x0Ey0_sC` | `a9dcafa32545efdd981564ed262d386b7b30eb1ec37df9379ab0fbc74132d3fb` |
| `buildtools/reclient` | `infra/rbe/client/linux-amd64` | `ADvz6sQzvQcUUOl6LmYz9_kwRoKMi-QopcOTjGPdF2QC` | `003bf3eac433bd071450e97a2e6633f7f93046828c8be428a5c3938c63dd1764` |
| `third_party/ninja` | `infra/3pp/tools/ninja/linux-amd64` | `Px8cwPaaG8_fZ_tsK8dBmx3YEruNDnmvqb-oo1U7UIIC` | `3f1f1cc0f69a1bcfdf67fb6c2bc7419b1dd812bb8d0e79afa9bfa8a3553b5082` |
| `third_party/siso/cipd` | `build/siso/linux-amd64` | `MF0YOMnae3v_65ZGQClhx1E-zz_I_O7jmYzSNpEfhqkC` | `305d1838c9da7b7bffeb9646402961c7513ecf3fc8fceee3998cd236911f86a9` |
| `tools/resultdb` | `infra/tools/result_adapter/linux-amd64` | `v9d06vVBFkAEPeZc_T_Hlp7dru37V52eI1N19xBapo4C` | `bfd774eaf5411640043de65cfd3fc7969eddaeedfb579d9e235375f7105aa68e` |
| `tools/skia_goldctl/linux` | `skia/tools/goldctl/linux-amd64` | `-kBgGbJiTOk-cPfW3Hk9s0VTgDJ_LLFD0GjjiFdxQxMC` | `fa406019b2624ce93e70f7d6dc793db3455380327f2cb143d068e38857714313` |

For these SHA-256 CIPD instance IDs, the decoded representation is the 32-byte digest followed by the CIPD hash-algorithm byte. The body digest used below is the 32-byte SHA-256 portion only.

```text
TARGETS_TSV_SHA256 = 5faa079d4680490196750f7f7d0891df91dfbe0e0d3a0abaf1947007d8e7c60d
TARGETS_JSON_SHA256 = baa83bf160826b176faaf9098cba05370a9345542fe39ff67a390eafd8cbe2c8
```

## 4. Acquisition transport

No CIPD client was bootstrapped or executed. For every exact package/instance pair, the acquisition process called the canonical public pRPC endpoint twice:

```text
METHOD = POST
SERVICE = https://chrome-infra-packages.appspot.com
RPC = /prpc/cipd.Repository/GetInstanceURL
CONTENT_TYPE = application/json
TLS_VERIFICATION_REQUIRED = TRUE
METADATA_REDIRECT_LIMIT = 0
```

The request supplied only the exact package name and exact SHA-256 object reference decoded from the canonical instance ID. A metadata response was accepted only when HTTP status was 200, TLS verification succeeded, redirects were zero, and its signed URL identified exactly:

```text
SCHEME = https
HOST = storage.googleapis.com
PATH_PREFIX = /chrome-infra-packages/store/SHA256/
PATH_DIGEST = exact canonical instance SHA-256
```

The two independent metadata requests for each target resolved the same canonical storage object path. Signed query parameters were transport credentials only and are not package identity.

The package body was then fetched directly over HTTPS from that exact signed object URL with redirect limit zero. No archive was opened or extracted.

## 5. Transport result

```text
METADATA_REQUESTS = 12
METADATA_HTTP_200 = 12
METADATA_REDIRECTS_TOTAL = 0
METADATA_TLS_VERIFY_FAILURES = 0
PACKAGE_DOWNLOADS = 6
DOWNLOAD_HTTP_200 = 6
DOWNLOAD_REDIRECTS_TOTAL = 0
DOWNLOAD_TLS_VERIFY_FAILURES = 0
```

All transport commands completed successfully. No package body acquisition required CIPD client execution.

## 6. Exact acquired package body identities

| Logical path | SHA-256 | Bytes | Python `hashlib` | System `shasum -a 256` |
| --- | --- | ---: | --- | --- |
| `buildtools/linux64` | `a9dcafa32545efdd981564ed262d386b7b30eb1ec37df9379ab0fbc74132d3fb` | 3,395,003 | match | match |
| `buildtools/reclient` | `003bf3eac433bd071450e97a2e6633f7f93046828c8be428a5c3938c63dd1764` | 171,776,820 | match | match |
| `third_party/ninja` | `3f1f1cc0f69a1bcfdf67fb6c2bc7419b1dd812bb8d0e79afa9bfa8a3553b5082` | 182,403 | match | match |
| `third_party/siso/cipd` | `305d1838c9da7b7bffeb9646402961c7513ecf3fc8fceee3998cd236911f86a9` | 27,566,530 | match | match |
| `tools/resultdb` | `bfd774eaf5411640043de65cfd3fc7969eddaeedfb579d9e235375f7105aa68e` | 12,405,175 | match | match |
| `tools/skia_goldctl/linux` | `fa406019b2624ce93e70f7d6dc793db3455380327f2cb143d068e38857714313` | 24,230,073 | match | match |

```text
TARGETS_PASSED = 6 / 6
PACKAGE_BODY_BYTES_TOTAL = 239556004
INSTANCE_DIGEST_MATCHES = 6 / 6
INDEPENDENT_DIGEST_IMPLEMENTATION_MATCHES = 6 / 6
```

A PASS requires both digest implementations to equal the exact SHA-256 encoded by the canonical instance ID. There is no content-identity waiver.

## 7. External evidence closure

```text
EVIDENCE_ROOT = /private/tmp/signthos-004c1dq-cipd-body-acquisition-NBif12Ns
ACQUISITION_RESULTS_TSV_SHA256 = 15d5b1505ba5a394eed771aab5a669afe40b44ba0cd847fb500601622ed9fc8c
TRANSPORT_SUMMARY_TSV_SHA256 = 17d5a09767723c1c5e8d633698d146981d064434edf109ece1a9fc7cad72d947
SUMMARY_JSON_SHA256 = 4af61123f49916b2f3e8fa115e5a39775845501c53fe2b28dcd65e484070b1d9
ACQUIRE_SCRIPT_SHA256 = dace3f2ea8277f6f780be0d71c486bf2afff8fd70505115e5bcce7874fca1b12
COMPACT_EVIDENCE_FILES = 56
COMPACT_EVIDENCE_BYTES = 27307
COMPACT_EVIDENCE_INVENTORY_SHA256 = 77af829f29157ceae4ed8ba4ae2bab41f3a86812766ac36169608c8a07b05485
CLOSEOUT_JSON_SHA256 = 7ec834a5fe93a7f2e92f76b60210087ca6766b37279338a42c6352baeb6b1275
```

The compact inventory excludes the six package body files because those bytes are already bound directly by their canonical instance SHA-256 values and exact acquired sizes. It also excludes raw signed-URL response bodies because their expiring query parameters are transport artifacts, not package identities. Request JSON, response headers, transport summaries, per-target result records, the acquisition script, target manifests, and summary are included. `closeout.json` was produced after compact-inventory closure and is bound separately by `CLOSEOUT_JSON_SHA256`; it is not claimed as an inventory member.

## 8. What 004C1DQ establishes

```text
004C1DQ_RESULT = PASS_EXACT_SIX_CIPD_PACKAGE_BODY_ACQUISITION
CIPD_INSTANCE_IDENTITY_GAP = CLOSED_FOR_CURRENT_ADMITTED_SET
CIPD_PACKAGE_BODY_BYTE_GAP = CLOSED_FOR_CURRENT_ADMITTED_SET
CIPD_PACKAGE_BODIES_ACQUIRED = 6 / 6
CIPD_PACKAGE_BODY_BYTES = 239556004
CIPD_PACKAGE_EXTRACTION = 0
CIPD_PACKAGE_INSTALLATION = 0
CIPD_PACKAGE_EXECUTION = 0
CIPD_CLIENT_EXECUTION = 0
REPOSITORY_MUTATION_DURING_ACQUISITION = 0
```

This result proves only exact package-body acquisition and transport/content integrity. It does not prove archive structure, manifest semantics, extracted file identities, executable behavior, notices/licenses inside package contents, install semantics, hook behavior, tool compatibility, or successful PDFium configuration/build/runtime.

The remaining unresolved dependency-byte class is the admitted GCS object set established by canonical 004C1DL and 004C1DN.

## 9. Explicit non-grants

```text
CIPD_INSTALLATION = NOT_AUTHORIZED
CIPD_ENSURE = NOT_AUTHORIZED
CIPD_PACKAGE_EXTRACTION = NOT_AUTHORIZED
CIPD_PACKAGE_EXECUTION = NOT_AUTHORIZED
CIPD_CLIENT_BOOTSTRAP_OR_UPDATE = NOT_AUTHORIZED
GCS_OBJECT_DOWNLOAD = NOT_AUTHORIZED
NEW_GIT_ACQUISITION = NOT_AUTHORIZED
SUBMODULE_ACQUISITION = NOT_AUTHORIZED
SYMLINK_TARGET_SPECIAL_ACQUISITION = NOT_AUTHORIZED
GCLIENT_EXECUTION = NOT_AUTHORIZED
HOOK_EXECUTION = NOT_AUTHORIZED
GN_EXECUTION = NOT_AUTHORIZED
NINJA_EXECUTION = NOT_AUTHORIZED
CLANG_EXECUTION = NOT_AUTHORIZED
RUST_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
PDFIUM_CONFIGURATION = NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
PDFIUM_LINK_EXECUTION = NOT_AUTHORIZED
PDFIUM_RUNTIME = NOT_AUTHORIZED
REPOSITORY_SOURCE_IMPORT = NOT_AUTHORIZED
NOTICE_SBOM_PROVENANCE_MUTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
WAIVER = NO
```

## 10. Qualification and merge gate

This document becomes canonical only after all of the following are true:

1. exact final base/head/tree and one-file diff are verified;
2. `git diff --check` passes and the isolated candidate worktree is clean;
3. exact-head workflow/check/provider state is accounted for truthfully;
4. a fresh independent substantive review is completed against the exact head and base;
5. every material finding is repaired forward-only and any changed head receives a fresh review;
6. unresolved material review threads are zero;
7. canonical main, exact head, open-PR frontier, mergeability, rules/protection and checks are reread immediately before merge;
8. normal merge uses the exact expected head SHA;
9. post-merge main, ordered parents, merge tree, signature, changed path/blob, workflows and open-PR frontier are mechanically verified;
10. Issue #7 is reconciled again before any GCS acquisition or successor execution.

Bot summaries, automatic skip statuses, reactions, billing blocks, reviewer-request state, and unavailable checks are not substantive review evidence.

## 11. Successor boundary

004C1DQ does not authorize its successor.

After canonical merge, Issue #7 must choose the smallest remaining dependency-byte or identity prerequisite from exact live truth. No GCS object download, package extraction/install, hook/tool execution, PDFium configuration/build/runtime, repository source import, release, deployment, or project-completion claim may be inferred from this qualification.
