# 004C1DT — Exact Pinned CIPD Client Body Acquisition Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_EXACT_PINNED_CIPD_CLIENT_BODY_ACQUISITION / ZERO_CLIENT_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `2b7e8eaf8076af287754738aacc605e0d08a9521`
Runtime authority: `github:issue-comment:5643804262`

## 1. Purpose and authority boundary

Canonical 004C1DS established the offline PDFium workspace materialization contract and proved that generic ZIP extraction is not sufficient evidence of CIPD deployment equivalence. It identified one dependency-order blocker before any bounded CIPD deployment execution: the exact pinned Linux/amd64 CIPD client body referenced by the already-acquired `depot_tools` revision.

004C1DT closes only that client-body acquisition blocker. It acquires and verifies the exact pinned client body. It does not execute the client and does not install any package or materialize any workspace.

```text
004C1DT_AUTHORITY = EXACT_PINNED_CIPD_CLIENT_BODY_ACQUISITION_QUALIFICATION_ONLY
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1dt-exact-pinned-cipd-client-body-acquisition-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
CIPD_CLIENT_EXECUTION = 0
CIPD_CLIENT_INSTALLATION = 0
CIPD_SELF_UPDATE = 0
CIPD_PACKAGE_INSTALLATION = 0
GCS_EXTRACTION = 0
GIT_WORKSPACE_MATERIALIZATION = 0
SUBMODULE_ACQUISITION = 0
HOOK_EXECUTION = 0
TOOLCHAIN_EXECUTION = 0
PDFIUM_CONFIGURATION = 0
PDFIUM_BUILD_EXECUTION = 0
PDFIUM_RUNTIME_EXECUTION = 0
REPOSITORY_SOURCE_IMPORT = 0
WAIVER = NO
```

## 2. Canonical predecessor truth

```text
004C1DS = CLOSED_CANONICAL
004C1DS_PR = #212
004C1DS_REVIEW_COMMENT = github:issue-comment:5643729548
004C1DS_REVIEWED_HEAD = 68f94e415c1144e002652931e901fbd38d9d8dbf
004C1DS_REVIEWED_TREE = dc5741764bc18f3c68694685cef913efbee3127e
004C1DS_MERGE = 2b7e8eaf8076af287754738aacc605e0d08a9521
004C1DS_MERGE_TREE = dc5741764bc18f3c68694685cef913efbee3127e
004C1DS_MERGE_SIGNATURE = VERIFIED_VALID
POST_MERGE_WORKFLOW_RUNS = 0
POST_MERGE_OPEN_PR_FRONTIER = 0
```

The 004C1DS contract remains authoritative for all Git, CIPD package, GCS, nested-gitlink, and future materialization semantics. 004C1DT does not widen those surfaces.

## 3. Exact pinned client identity derived from `depot_tools`

The client identity is derived only from the exact already-acquired `depot_tools` commit:

```text
DEPOT_TOOLS_COMMIT = 6235028c6b18b73e68f5414f935ec537a25ea51a
DEPOT_TOOLS_TREE = 0b08d0dbc2f75f2b44fb0b46ae7133e9bceb9e44
CIPD_PLATFORM = linux-amd64
CIPD_CLIENT_VERSION = git_revision:b1f414539ac10cc67a0250890a38712cc06cf102
EXPECTED_CIPD_CLIENT_SHA256 = a4245bbd790e00c43756c1c202c21a3d2b5f0a4fe655fdb4d100029dfe9f223a
```

The exact bootstrap source identities that bind this derivation are:

| Path | Git blob | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `cipd` | `3acbe4add9e42be94207810812d38a8662d8dd34` | 8632 | `746c80831334280072185af1c55d2bb2c962817ee47f9c37b893ca352a60c770` |
| `cipd_client_version` | `d020db42ba97b2c790f59dae2a2e0a210bb2d0da` | 54 | `f7ef5caf1f691fed40e9e9046b04de0340cf2c9f1e24ee75694f3b9ec14bfe54` |
| `cipd_client_version.digests` | `ea291a345a24237b750d0e6bf71a6d8a57d36073` | 3417 | `b5ff38481e9bb2b38a90ad3ca6cf93d3601867e3f39561b4159865ec3e5d412b` |

The canonical bootstrap semantics construct the client request from the service endpoint, exact platform, and exact version and reject a downloaded client whose SHA-256 does not equal the platform digest above.

## 4. Exact acquisition request

004C1DT used exactly this canonical request URL:

```text
https://chrome-infra-packages.appspot.com/client?platform=linux-amd64&version=git_revision:b1f414539ac10cc67a0250890a38712cc06cf102
```

No moving tag, alternate client version, alternate platform, unpinned binary, package-manager substitute, or local pre-existing client was accepted.

Transport controls:

```text
HTTPS_ONLY = YES
CURL_PROTO = https
TLS_MINIMUM = TLSv1.2
TLS_CERTIFICATE_VERIFICATION = ENABLED
FAIL_ON_HTTP_ERROR = ENABLED
REDIRECT_FOLLOWING = ENABLED
EXPECTED_BODY_HASH_CHECK = REQUIRED
CLIENT_EXECUTION_AFTER_DOWNLOAD = 0
```

The canonical service returned one HTTPS redirect to `storage.googleapis.com`. The signed redirect query is transport-volatile and is retained only in external evidence; it is not a materialization identity input and is intentionally not copied into this repository document.

## 5. Attempt 1 acquisition result

```text
HTTP_FINAL_STATUS = 200
REDIRECT_COUNT = 1
FINAL_HOST = storage.googleapis.com
SSL_VERIFY_RESULT = 0
CONTENT_TYPE = application/octet-stream
BODY_BYTES = 19754946
EXPECTED_SHA256 = a4245bbd790e00c43756c1c202c21a3d2b5f0a4fe655fdb4d100029dfe9f223a
ACTUAL_SHA256 = a4245bbd790e00c43756c1c202c21a3d2b5f0a4fe655fdb4d100029dfe9f223a
HASH_MATCH = YES
```

The acquired body was identified without execution as:

```text
ELF 64-bit LSB executable
architecture = x86-64
linkage = statically linked
symbols = with debug_info, not stripped
```

File-type inspection is descriptive only and is not identity-bearing. The identity-bearing body facts are exact byte count plus pinned SHA-256.

## 6. Independent replay

The exact canonical request was repeated once without executing either result.

| Property | Attempt 1 | Attempt 2 |
| --- | ---: | ---: |
| Final HTTP status | 200 | 200 |
| Redirects | 1 | 1 |
| TLS verify result | 0 | 0 |
| Body bytes | 19754946 | 19754946 |
| SHA-256 | `a4245bbd790e00c43756c1c202c21a3d2b5f0a4fe655fdb4d100029dfe9f223a` | `a4245bbd790e00c43756c1c202c21a3d2b5f0a4fe655fdb4d100029dfe9f223a` |

```text
REPLAY_BYTE_IDENTICAL = YES
REPLAY_HASH_IDENTICAL = YES
REPLAY_CLIENT_EXECUTIONS = 0
```

The replay proves that both exact requests resolved to the same pinned body even though the redirect signatures themselves are transport-volatile.

## 7. External evidence closure

```text
EVIDENCE_ROOT = /private/tmp/signthos-004c1dt-cipd-client-acquisition-20260912T053314Z-61095
EVIDENCE_FILES = 21
EVIDENCE_BYTES = 39538219
EVIDENCE_INVENTORY_SHA256 = 2d0b8e2cdb1bff89dd74108c9495782e0953fb385226823268e7234b6d36e09a
QUALIFICATION_SUMMARY_SHA256 = 5b76f8cfdaced29f1676a811c565e774699e478de3ea81e6d78e7133ab06cc44
REPLAY_SUMMARY_SHA256 = 2250df71653147cc4c2b596bf7ce3612e352d6a93f014975e9f255c32f6b4011
EVIDENCE_SUMMARY_SHA256 = d906ad3ad6dd1799c06891287fdb042c264c1d89606349200acbe32beacd930c
```

The evidence root retains request URL, expected digest, response headers, transport summaries, TLS/redirect diagnostics, both downloaded bodies, both body hashes and byte counts, file-type observation, replay comparison, and deterministic evidence inventories.

Transport evidence may contain volatile signed redirect URLs. Those are retained externally for audit but are not copied into canonical repository identity fields.

## 8. Zero-execution and zero-installation proof

The acquisition scripts performed only HTTPS download, hashing, byte counting, byte comparison, header/transport recording, and passive file-type inspection.

```text
CIPD_CLIENT_EXECUTIONS = 0
CIPD_CLIENT_INSTALLS = 0
CIPD_SELF_UPDATES = 0
CIPD_PACKAGE_INSTALLS = 0
CIPD_ENSURE_EXECUTIONS = 0
WORKSPACE_MATERIALIZATIONS = 0
GCS_EXTRACTIONS = 0
GIT_CHECKOUT_MATERIALIZATIONS = 0
HOOK_EXECUTIONS = 0
TOOLCHAIN_EXECUTIONS = 0
ACQUIRED_SOURCE_EXECUTIONS = 0
SIGNTHOS_REPOSITORY_MUTATIONS_DURING_ACQUISITION = 0
```

No `chmod +x` followed by execution, no `cipd ensure`, no `cipd pkg-deploy`, no `cipd selfupdate`, no `gclient`, no GN, no Ninja, no Clang, no Rust toolchain, and no PDFium binary was run in this grain.

## 9. Qualification result

```text
EXACT_PINNED_CLIENT_IDENTITY = ESTABLISHED
EXACT_PINNED_CLIENT_BODY_ACQUIRED = YES
EXACT_PINNED_CLIENT_BODY_REPLAYED = YES
PINNED_HASH_MATCH = PASS
PINNED_BYTE_COUNT_STABLE = PASS
TLS_VERIFICATION = PASS
CLIENT_EXECUTION = 0
PACKAGE_INSTALLATION = 0
WORKSPACE_MATERIALIZATION = 0
004C1DT_RESULT = PASS
```

004C1DT closes the exact pinned CIPD client body acquisition blocker created by the 004C1DS materialization contract.

## 10. Explicit non-grants

This qualification does not establish or authorize:

- CIPD client runtime correctness beyond exact body identity;
- execution of the acquired client;
- CIPD self-update;
- network-backed CIPD ensure or package resolution;
- installation or deployment of any of the six acquired CIPD package bodies;
- equivalence of any hand-written ZIP extractor to CIPD install semantics;
- GCS archive extraction or direct-output placement;
- materialization of the 33 admitted Git roots;
- nested FreeType `subprojects/dlg` acquisition;
- hook execution;
- GN, Ninja, Clang, Rust, Siso, reclient, or other tool execution;
- PDFium configuration, compilation, linking, tests, rendering, or runtime;
- repository source import;
- 004C2, 004D, Specification 005, release, deployment, or project-completion authority.

## 11. Successor boundary

After canonical merge of this qualification, Issue #7 may consider the smallest dependency-ordered successor needed to prove an exact **offline** deployment path for the already-acquired CIPD package bodies using the exact pinned client.

A successor must fail closed on any design that requires unqualified network resolution, self-update, an alternate client, an alternate package body, or generic ZIP extraction presented as CIPD equivalence.

Candidate direction only:

```text
CANDIDATE_SUCCESSOR = BOUNDED_EXACT_PINNED_CIPD_OFFLINE_PACKAGE_DEPLOYMENT_QUALIFICATION
SUCCESSOR_AUTHORITY = NOT_GRANTED_BY_004C1DT
```

## 12. Merge discipline

This candidate may merge only if all of the following remain true:

1. canonical `main` still equals `2b7e8eaf8076af287754738aacc605e0d08a9521` immediately before merge review/race closure;
2. the branch contains exactly one qualification commit and exactly one changed repository path;
3. a fresh independent substantive review examines the exact current head and finds no material/actionable issue;
4. any material finding is repaired forward-only and receives a fresh exact-head review;
5. zero unresolved material review threads remain;
6. applicable required checks are satisfied without treating skipped or billing-blocked bots as pass evidence;
7. merge uses the exact reviewed head without force-push, rebase, or shared-history rewrite;
8. post-merge tree, ordered parents, signature, changed path/blob, workflow state, and open-PR frontier are mechanically verified.

No statement in this document claims that the PDFium workspace has been materialized, built, tested, or run.
