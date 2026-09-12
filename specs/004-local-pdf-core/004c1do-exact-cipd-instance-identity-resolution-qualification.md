# 004C1DO — Exact CIPD Instance Identity Resolution Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_EXACT_SIX_CIPD_INSTANCE_IDENTITY_RESOLUTION / ZERO_PACKAGE_BYTES`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `aae5f986ee1f2c78faf653473c2ba2d423def880`
Runtime authority: `github:issue-comment:5643072297`
Runtime closeout and document authority: `github:issue-comment:5643086117`

## 1. Purpose and authority boundary

Canonical 004C1DN closed the static recursive selector frontier for the selected PDFium Linux/x64/default dependency graph. It explicitly left CIPD instance identity unresolved and all unacquired dependency bytes fail-closed.

004C1DO closes only that identity prerequisite. It expands the six already-admitted CIPD package templates for the canonical Linux/amd64 target and resolves each already-admitted version selector to one immutable CIPD instance ID using read-only repository metadata requests. It does not download or install package bodies.

```text
004C1DO_AUTHORITY = EXACT_SIX_CIPD_SELECTOR_EXPANSION_AND_METADATA_RESOLUTION_ONLY
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1do-exact-cipd-instance-identity-resolution-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
TARGET_PLATFORM = linux-amd64
TARGET_ARCH = amd64
CIPD_PACKAGE_ARCHIVE_DOWNLOAD = 0
CIPD_INSTALL = 0
CIPD_ENSURE = 0
CIPD_FETCH = 0
GIT_ACQUISITION = 0
GCS_DOWNLOAD = 0
GCLIENT_EXECUTION = 0
HOOK_EXECUTION = 0
ACQUIRED_SOURCE_EXECUTION = 0
CONTAINER_EXECUTION = 0
REPOSITORY_SOURCE_IMPORT = 0
PDFIUM_BUILD_EXECUTION = 0
WAIVER = NO
```

## 2. Canonical predecessor truth

```text
004C1DN = CLOSED_CANONICAL
004C1DN_PR = #207
004C1DN_REVIEW = github:issue-comment:5642974557 = NO_MATERIAL_OR_ACTIONABLE_FINDINGS
004C1DN_REVIEWED_HEAD = 1c6bb30a714af537c8ead70f3015d3e3ca56ef2d
004C1DN_REVIEWED_TREE = ed94840484971d24e348c855b8f6fbcafaa05c2a
004C1DN_MERGE = aae5f986ee1f2c78faf653473c2ba2d423def880
004C1DN_MERGE_TREE = ed94840484971d24e348c855b8f6fbcafaa05c2a
004C1DN_PARENT_1 = 85bdd2f9e7e09a7ba38e5b27a8c330a660182572
004C1DN_PARENT_2 = 1c6bb30a714af537c8ead70f3015d3e3ca56ef2d
004C1DN_MERGE_SIGNATURE = VERIFIED / VALID
004C1DN_POST_MERGE_WORKFLOWS = 0
004C1DN_OPEN_PULL_REQUESTS_AFTER_MERGE = 0
STATIC_TRANSITIVE_RECURSION_CLOSURE = ESTABLISHED
RECURSIVE_FRONTIER = EMPTY
```

004C1DN does not establish that any remaining admitted dependency bytes are present locally.

## 3. Canonical CIPD selector source

Canonical 004C1DL established exactly six admitted CIPD declarations under the selected Linux/x64/default context. No new package declaration or version selector is introduced here.

| Logical path | Canonical package declaration | Canonical version selector |
| --- | --- | --- |
| `buildtools/linux64` | `gn/gn/linux-${{arch}}` | `git_revision:bd3356ac13f411b521b16b11da12cec5150e917c` |
| `buildtools/reclient` | `infra/rbe/client/${{platform}}` | `re_client_version:0.185.0.db415f21-gomaip` |
| `third_party/ninja` | `infra/3pp/tools/ninja/${{platform}}` | `version:3@1.12.1.chromium.4` |
| `third_party/siso/cipd` | `build/siso/${{platform}}` | `git_revision:ed57223a0bd19f8f2767a01b24311e8843ea2890` |
| `tools/resultdb` | `infra/tools/result_adapter/${{platform}}` | `git_revision:5fb3ca203842fd691cab615453f8e5a14302a1d8` |
| `tools/skia_goldctl/linux` | `skia/tools/goldctl/linux-amd64` | `git_revision:f809b7407f82c9bdb3324152b09fb6e0304396d6` |

Canonical 004C1DL also established the target expansion context:

```text
CIPD_PLATFORM = linux-amd64
CIPD_ARCH = amd64
```

004C1DO therefore performs only literal template substitution:

```text
${{platform}} -> linux-amd64
${{arch}} -> amd64
```

## 4. Read-only resolution transport

Authority permitted only read-only metadata resolution against the public canonical CIPD service. The successful V2 requests used:

```text
METHOD = GET
SERVICE = https://chrome-infra-packages.appspot.com/_ah/api/repo/v1/instance/resolve
QUERY_PARAMETERS = package_name, version
REDIRECT_LIMIT = 0
HTTPS_ONLY = TRUE
TLS_VERIFICATION_REQUIRED = TRUE
PACKAGE_BODY_URL_REQUEST = 0
```

The service response was accepted only when HTTP status was 200, redirect count was zero, TLS verification succeeded, response status was `SUCCESS`, and a non-empty instance ID was returned.

Every exact package/version pair was resolved twice. A pair qualified only if both attempts returned the identical instance ID.

## 5. Preserved fail-closed V1 history

The first launcher did not correctly perform literal placeholder replacement in zsh. Its pattern substitution transformed the first package into an invalid string rather than `gn/gn/linux-amd64`.

The CIPD metadata service rejected that malformed package name with HTTP 400. The attempt stopped immediately.

```text
V1_ROOT = /private/tmp/signthos-004c1do-cipd-resolution-20260912T031117Z-41986
V1_RESULT = FAIL_CLOSED_HTTP_400_AFTER_LOCAL_TEMPLATE_EXPANSION_BUG
V1_HTTP_RESPONSE = 400
V1_REDIRECTS = 0
V1_TLS_VERIFY_RESULT = 0
V1_PACKAGE_DOWNLOADS = 0
V1_REPOSITORY_MUTATION = 0
```

The failed V1 evidence was not rewritten or deleted. V2 used a fresh evidence root and replaced only local template-expansion logic with exact Python literal replacement.

```text
V1_EVIDENCE_SUMMARY_SHA256 = 19a3698f9ccaae88e653b34dd7570583803f54ef8c8abf2e46a486222d048a6f
```

## 6. Successful V2 evidence root

```text
V2_ROOT = /private/tmp/signthos-004c1do-cipd-resolution-v2-20260912T031237Z-55476
V2_RESULT = PASS
SELECTORS_TOTAL = 6
SELECTORS_RESOLVED = 6
RESOLUTION_ATTEMPTS_TOTAL = 12
STABLE_REPEAT_PAIRS = 6
HTTP_200 = 12
REDIRECTS_TOTAL = 0
TLS_VERIFY_FAILURES = 0
LAUNCHER_STDERR_BYTES = 0
PACKAGE_ARCHIVE_DOWNLOADS = 0
CIPD_INSTALL = 0
CIPD_ENSURE = 0
CIPD_FETCH = 0
GIT_ACQUISITION = 0
GCS_DOWNLOAD = 0
GCLIENT_EXECUTION = 0
HOOK_EXECUTION = 0
REPOSITORY_MUTATION = 0
```

## 7. Exact resolved package identities

### GN

```text
LOGICAL_PATH = buildtools/linux64
PACKAGE_TEMPLATE = gn/gn/linux-${{arch}}
EXPANDED_PACKAGE = gn/gn/linux-amd64
VERSION = git_revision:bd3356ac13f411b521b16b11da12cec5150e917c
INSTANCE_ID = qdyvoyVF792YFWTtJi04a3sw6x7Dffk3mrD7x0Ey0_sC
REPEAT_MATCH = TRUE
```

### Reclient

```text
LOGICAL_PATH = buildtools/reclient
PACKAGE_TEMPLATE = infra/rbe/client/${{platform}}
EXPANDED_PACKAGE = infra/rbe/client/linux-amd64
VERSION = re_client_version:0.185.0.db415f21-gomaip
INSTANCE_ID = ADvz6sQzvQcUUOl6LmYz9_kwRoKMi-QopcOTjGPdF2QC
REPEAT_MATCH = TRUE
```

### Ninja

```text
LOGICAL_PATH = third_party/ninja
PACKAGE_TEMPLATE = infra/3pp/tools/ninja/${{platform}}
EXPANDED_PACKAGE = infra/3pp/tools/ninja/linux-amd64
VERSION = version:3@1.12.1.chromium.4
INSTANCE_ID = Px8cwPaaG8_fZ_tsK8dBmx3YEruNDnmvqb-oo1U7UIIC
REPEAT_MATCH = TRUE
```

### Siso

```text
LOGICAL_PATH = third_party/siso/cipd
PACKAGE_TEMPLATE = build/siso/${{platform}}
EXPANDED_PACKAGE = build/siso/linux-amd64
VERSION = git_revision:ed57223a0bd19f8f2767a01b24311e8843ea2890
INSTANCE_ID = MF0YOMnae3v_65ZGQClhx1E-zz_I_O7jmYzSNpEfhqkC
REPEAT_MATCH = TRUE
```

### Result adapter

```text
LOGICAL_PATH = tools/resultdb
PACKAGE_TEMPLATE = infra/tools/result_adapter/${{platform}}
EXPANDED_PACKAGE = infra/tools/result_adapter/linux-amd64
VERSION = git_revision:5fb3ca203842fd691cab615453f8e5a14302a1d8
INSTANCE_ID = v9d06vVBFkAEPeZc_T_Hlp7dru37V52eI1N19xBapo4C
REPEAT_MATCH = TRUE
```

### Skia goldctl

```text
LOGICAL_PATH = tools/skia_goldctl/linux
PACKAGE_TEMPLATE = skia/tools/goldctl/linux-amd64
EXPANDED_PACKAGE = skia/tools/goldctl/linux-amd64
VERSION = git_revision:f809b7407f82c9bdb3324152b09fb6e0304396d6
INSTANCE_ID = -kBgGbJiTOk-cPfW3Hk9s0VTgDJ_LLFD0GjjiFdxQxMC
REPEAT_MATCH = TRUE
```

## 8. Evidence closure

The successful V2 root is bound by a deterministic inventory that excludes only the inventory file and its summary from the payload count.

```text
EVIDENCE_PAYLOAD_FILES = 85
EVIDENCE_PAYLOAD_BYTES = 34540
EVIDENCE_INVENTORY_SHA256 = 5bb737503dac93dc8bca4e01ccb8933d2f0043fc7d61d1a1583f59755dbadd9d
QUALIFICATION_SUMMARY_SHA256 = 54d39345c6569181d993a6539f409a157e69be908b3dbc9ebe763961efacb435
RESOLVED_JSON_SHA256 = 3df3172f103e39cb5a7b9e1fc30753d2d93ffc6c6c99fdedbc242ef1d747249c
RESOLVED_TSV_SHA256 = e41196d156666f304682ba0df488b21470e4bc72e424ad4c31105476c2bab642
HTTP_VERIFICATION_SHA256 = 0d896073d233ca1a96e5fbc92810ae031ebd543213f195f79fe958effdace632
RESOLVE_SCRIPT_SHA256 = cc4752882ab42b6e64888a2653d1a87402c6727626f300bd724283d8bd1e8207
SELECTORS_SHA256 = 5ea2cf23ab6641fafdcceda36c199164ed6ab6f95f22ac8d0c365e93832d90bb
EXPANDED_SELECTORS_SHA256 = 717b6d4df31d38d9a15291545c4bdf8dae54217092b47823e7534d915cc78a13
```

For all twelve successful requests:

```text
HTTP_CODE = 200
NUM_REDIRECTS = 0
SSL_VERIFY_RESULT = 0
```

Raw request records, response bodies, response headers, transport metadata, curl stderr, and curl exit codes are preserved under the V2 evidence root.

## 9. What 004C1DO establishes

```text
004C1DO_RESULT = PASS_EXACT_SIX_CIPD_INSTANCE_IDENTITY_RESOLUTION
CIPD_SELECTORS_TOTAL = 6
CIPD_SELECTORS_WITH_EXACT_EXPANDED_PACKAGE = 6
CIPD_SELECTORS_WITH_EXACT_INSTANCE_ID = 6
CIPD_INSTANCE_IDENTITY_GAP = CLOSED_FOR_CURRENT_ADMITTED_SET
PACKAGE_BYTES_ACQUIRED = 0
```

The six current admitted CIPD selectors are now bound to immutable package instance IDs for the already-qualified Linux/amd64 context.

This result is an identity result only. It does not prove package contents, archive byte size, installed filesystem content, executable behavior, licenses/notices, tool compatibility, or successful use in a PDFium build.

## 10. Explicit non-grants

```text
DEPENDENCY_BYTES_ACQUISITION = NOT_AUTHORIZED
CIPD_PACKAGE_BODY_DOWNLOAD = NOT_AUTHORIZED
CIPD_INSTALLATION = NOT_AUTHORIZED
CIPD_CLIENT_BOOTSTRAP_OR_UPDATE = NOT_AUTHORIZED
GIT_FETCH_OF_REMAINING_SELECTORS = NOT_AUTHORIZED
GCS_DOWNLOAD = NOT_AUTHORIZED
HOOK_EXECUTION = NOT_AUTHORIZED
GN_EXECUTION = NOT_AUTHORIZED
NINJA_EXECUTION = NOT_AUTHORIZED
CLANG_EXECUTION = NOT_AUTHORIZED
RUST_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
PDFIUM_CONFIGURATION = NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
PDF_PROVIDER_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
WAIVER = NO
```

## 11. Qualification and merge gate

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
10. Issue #7 is reconciled again before any dependency-byte acquisition or successor execution.

Bot summaries, automatic skip statuses, reactions, reviewer-request state, billing blocks, and unavailable checks are not substantive review evidence.

## 12. Successor boundary

004C1DO does not authorize its successor.

After canonical merge and mechanical post-merge verification, Issue #7 must choose the smallest dependency-byte acquisition or further identity prerequisite from live truth. No Git fetch, GCS object download, CIPD package-body acquisition, hook execution, tool execution, PDFium configuration, or PDFium build may be inferred from this qualification.
