# 004C1DK — Exact PDFium Build Source Root Acquisition Qualification

Status: `QUALIFICATION_CANDIDATE / EXACT_SOURCE_ROOT_ACQUISITION_PASS / ZERO_SOURCE_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `55e2ca5966abb6960983e8ade065799bd95aa4f5`
Canonical base tree: `c9777b16cd0d1a0e1bd4ea427e0d8b0f8f4c9d98`
Runtime authority: `github:issue-comment:5642467758`
Runtime closeout and document authority: `github:issue-comment:5642562275`

## 1. Purpose and authority boundary

004C1DJ canonically preserved the successful provisioned builder filesystem as one exact local Docker image snapshot. It did not establish the source bytes that later build-tool execution would consume.

004C1DK closes only the next smaller prerequisite: acquire the two already-selected identity-bearing source roots at their exact immutable commits into fresh evidence roots outside Signthos, verify Git object integrity, and bind deterministic source-tree manifests without executing acquired source content.

This qualification document records already-completed acquisition evidence. It performs no network access, source execution, image execution, package action, toolchain execution, PDFium build/runtime, provider action, or repository source import.

```text
004C1DK_AUTHORITY = EXACT_PDFIUM_BUILD_SOURCE_ROOT_ACQUISITION_ONLY
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1dk-exact-pdfium-build-source-root-acquisition-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
RUNTIME_EXECUTION_IN_DOCUMENT_UNIT = 0
REPOSITORY_SOURCE_IMPORT = NOT_AUTHORIZED
ACQUIRED_SOURCE_EXECUTION = NOT_AUTHORIZED
DEPOT_TOOLS_EXECUTION = NOT_AUTHORIZED
GCLIENT_CONFIG_SYNC_HOOKS = NOT_AUTHORIZED
CIPD_EXECUTION = NOT_AUTHORIZED
GN_NINJA_CLANG_ACQUISITION_OR_EXECUTION = NOT_AUTHORIZED
RUST_TOOLCHAIN_ACQUISITION_OR_EXECUTION = NOT_AUTHORIZED
PDFIUM_CONFIGURATION_BUILD_LINK_RUNTIME = NOT_AUTHORIZED
SNAPSHOT_IMAGE_EXECUTION = NOT_AUTHORIZED
PACKAGE_ACTION = NOT_AUTHORIZED
PROVIDER_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE_OR_DEPLOYMENT = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
WAIVER = NO
```

## 2. Canonical predecessor truth

```text
004C1DJ = CLOSED_CANONICAL
004C1DJ_PR = #203
004C1DJ_MERGE = 55e2ca5966abb6960983e8ade065799bd95aa4f5
004C1DJ_MERGE_TREE = c9777b16cd0d1a0e1bd4ea427e0d8b0f8f4c9d98
LOCAL_PROVISIONED_BUILDER_IMAGE = sha256:ebc4a9202a97820ac8f8780c8e7b89d51952f5ed512a898c52a8576cd38924b4
SELECTED_NODE_RUNTIME = 20.18.0
SELECTED_NODE_SHA256 = 94ea6cc6b866ec29a0f5924eb636783f814e0ef0e5925a1d3ccb5f55b91ac633
OS_PACKAGE_METADATA_CLOSURE = CLOSED_CANONICAL
OFFLINE_PACKAGE_PROVISIONING = PASS / CLOSED_CANONICAL
GN_NINJA_CLANG_ACQUIRED_BYTE_IDENTITIES = NOT_ESTABLISHED
PDFIUM_BUILD_EXECUTION_AUTHORITY = ABSENT
```

Canonical 004C1AE and 004C1AF had already selected the source roots below and explicitly prohibited moving branch heads as identity-bearing substitutes.

## 3. Exact acquisition authority

```text
DEPOT_TOOLS_URL = https://chromium.googlesource.com/chromium/tools/depot_tools.git
DEPOT_TOOLS_REVISION = 6235028c6b18b73e68f5414f935ec537a25ea51a
PDFIUM_SOURCE_URL = https://github.com/embedpdf/pdfium.git
PDFIUM_GITLINK = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
MOVING_DEPOT_TOOLS_MAIN = PROHIBITED_AS_IDENTITY
MOVING_PDFIUM_MAIN = PROHIBITED_AS_IDENTITY
```

The authority permitted only fresh external Git roots, exact-SHA fetches/checkouts, Git integrity/read-only metadata inspection, and deterministic source inventory/hashing.

## 4. Transport hardening

Each repository was initialized in its own fresh external root. Acquisition used the exact selected commit SHA rather than a branch or tag.

The Git process environment removed HTTP/HTTPS/all-proxy variables and disabled interactive credential use. Git was invoked with:

```text
GIT_CONFIG_GLOBAL=/dev/null
GIT_CONFIG_NOSYSTEM=1
GIT_TERMINAL_PROMPT=0
credential.helper=
http.proxy=
http.followRedirects=false
protocol.version=2
```

The observed fetch origins remained exactly:

```text
From https://chromium.googlesource.com/chromium/tools/depot_tools
From https://github.com/embedpdf/pdfium
```

No redirect was accepted. No mirror, moving branch, credential forwarding, proxy, custom Git configuration, or alternate origin became an identity-bearing input.

## 5. depot_tools exact acquired identity

```text
DEPOT_TOOLS_ORIGIN_EXPECTED = https://chromium.googlesource.com/chromium/tools/depot_tools.git
DEPOT_TOOLS_ORIGIN_ACTUAL = https://chromium.googlesource.com/chromium/tools/depot_tools.git
DEPOT_TOOLS_HEAD = 6235028c6b18b73e68f5414f935ec537a25ea51a
DEPOT_TOOLS_TREE = 0b08d0dbc2f75f2b44fb0b46ae7133e9bceb9e44
DEPOT_TOOLS_PARENT_SET = <empty>
DEPOT_TOOLS_AUTHOR = Nico Weber <thakis@chromium.org>
DEPOT_TOOLS_AUTHOR_DATE = 2026-02-01T17:11:14-08:00
DEPOT_TOOLS_COMMITTER = LUCI CQ <infra-scoped@luci-project-accounts.iam.gserviceaccount.com>
DEPOT_TOOLS_COMMITTER_DATE = 2026-02-01T17:11:14-08:00
DEPOT_TOOLS_SUBJECT = Fix typo in diagnostic text
DEPOT_TOOLS_FSCK = PASS
DEPOT_TOOLS_CHECKOUT_STATUS = CLEAN
```

The shallow exact-commit acquisition contains a root commit object with no locally available parent in the shallow graph. 004C1DK does not infer ancestry beyond the acquired shallow object boundary.

## 6. depot_tools deterministic tree-content manifest

The Git-tree-derived manifest enumerates every recursive tree entry and binds each blob to its Git OID plus SHA-256 content identity. Symlink target bytes are explicitly bound without dereferencing or executing them.

```text
DEPOT_TOOLS_GIT_TREE_MANIFEST_COUNT = 800
DEPOT_TOOLS_GIT_TREE_MANIFEST_BLOBS = 800
DEPOT_TOOLS_GIT_TREE_MANIFEST_GITLINKS = 0
DEPOT_TOOLS_SYMLINK_COUNT = 5
DEPOT_TOOLS_GIT_TREE_MANIFEST_SHA256 = 72087b1f702dd82c32dbce90518f768f4d821bcba88bef5ab65fdce99038600f
```

The independent working-tree manifest also contains 800 file/symlink entries and was generated without executing any acquired content.

## 7. PDFium exact acquired identity

```text
PDFIUM_ORIGIN_EXPECTED = https://github.com/embedpdf/pdfium.git
PDFIUM_ORIGIN_ACTUAL = https://github.com/embedpdf/pdfium.git
PDFIUM_HEAD = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
PDFIUM_TREE = 5b402772057e8c3a676c95882a4825350bdf6988
PDFIUM_PARENT_SET = <empty>
PDFIUM_AUTHOR = Bob Singor <bob@singor.com>
PDFIUM_AUTHOR_DATE = 2026-06-08T09:49:07+03:00
PDFIUM_COMMITTER = Bob Singor <bob@singor.com>
PDFIUM_COMMITTER_DATE = 2026-06-08T09:49:07+03:00
PDFIUM_SUBJECT = Add EPDF_GetPageBoxByIndex API
PDFIUM_FSCK = PASS
PDFIUM_CHECKOUT_STATUS = CLEAN
```

As with depot_tools, the exact-SHA fetch used `--depth=1`. Parent absence in this acquired shallow graph is preserved as a boundary rather than misreported as proof that the upstream commit has no parent.

## 8. PDFium deterministic tree-content manifest

```text
PDFIUM_GIT_TREE_MANIFEST_COUNT = 5214
PDFIUM_GIT_TREE_MANIFEST_BLOBS = 5214
PDFIUM_GIT_TREE_MANIFEST_GITLINKS = 0
PDFIUM_SYMLINK_COUNT = 0
PDFIUM_GIT_TREE_MANIFEST_SHA256 = fb1f5202aae791edb3c291710094b0a26a2c98bb900bd030e8d0d1bc31ced09d
```

The manifest is derived from `git ls-tree -r HEAD`, not from inferred filesystem traversal alone. Every blob records path, Git mode, Git OID, byte length and SHA-256. No submodule/gitlink entry is present in this exact root tree.

## 9. Acquired PDFium DEPS identity

The exact acquired source root contains `DEPS` as:

```text
PDFIUM_DEPS_GIT_BLOB = 30e0cf22c37d8cdb94bd64fd01aab3b0abe0eeb6
PDFIUM_DEPS_BYTES = 38648
PDFIUM_DEPS_LINES = 985
PDFIUM_DEPS_SHA256 = f456f116824717cde93a32fa9cb2df1bae776226dadfa225a211dd5686ed05f1
```

Read-only text inspection of these exact bytes re-establishes the canonical selectors:

```text
DEPOT_TOOLS_SELECTOR = 6235028c6b18b73e68f5414f935ec537a25ea51a
GN_SELECTOR = git_revision:bd3356ac13f411b521b16b11da12cec5150e917c
NINJA_SELECTOR = version:3@1.12.1.chromium.4
CLANG_SELECTOR = a1542f2952bcc47640d5cfbc39bb8f6926a1bf6a
RUST_SELECTOR = 7da7c8be1f1b4ba32dcfd73ddc59ea48a376c041
CHROMIUM_BUILD_SELECTOR = 06d247cb917bb5fac3103b1b7dccb75368a553ce
CHECKOUT_CONFIGURATION_DEFAULT = default
```

No `DEPS` file was evaluated as executable Python and no gclient/CIPD behavior was triggered. The selectors are recorded only as static acquired-source facts.

## 10. External evidence root

```text
HOST_EVIDENCE_ROOT = /private/tmp/signthos-004c1dk-source-acquisition-20260912T012933Z-28175
QUALIFICATION_SUMMARY_BYTES = 1708
QUALIFICATION_SUMMARY_SHA256 = f5e749874d0f9d331e73f7538da35619f3f227c263ca03382524719ab3b62b29
EVIDENCE_INVENTORY_FILES = 47
EVIDENCE_INVENTORY_BYTES = 4382
EVIDENCE_INVENTORY_SHA256 = 0649947b29e840e2578e18560cd3bd1469ed813d43932328b23b4d00f6dcd938
```

The evidence root includes exact expected/actual origins, fetch stdout/stderr, acquired commit and tree identities, commit metadata, fsck results, raw recursive Git tree listings, deterministic Git-object manifests, independent working-tree manifests, symlink manifests, source checkout status, preflight information, and the final qualification summary/inventory.

## 11. Existing Signthos working tree preservation

The user's primary local Signthos tree was not cleaned, reset, rebased, checked out, or otherwise mutated by 004C1DK. Read-only observation found:

```text
PRIMARY_LOCAL_HEAD = f09ea86e2a77cdccbfb453b1c5cd793f4c42c601
PRIMARY_ORIGIN_MAIN = 55e2ca5966abb6960983e8ade065799bd95aa4f5
PREEXISTING_STATUS_LINE_COUNT = 1
PREEXISTING_STATUS = D specs/004-local-pdf-core/004c1ay-apt-simulate-no-download-semantic-repair-qualification.md
```

This qualification candidate is therefore created in a separate isolated worktree from canonical `origin/main`. The pre-existing primary-tree state is not evidence of 004C1DK mutation and is left untouched.

## 12. What 004C1DK establishes

```text
004C1DK_RESULT = PASS_EXACT_PDFIUM_BUILD_SOURCE_ROOT_ACQUISITION
DEPOT_TOOLS_EXACT_COMMIT_ACQUIRED = TRUE
DEPOT_TOOLS_OBJECT_INTEGRITY = PASS
DEPOT_TOOLS_TREE_CONTENT_IDENTITY = ESTABLISHED
PDFIUM_EXACT_COMMIT_ACQUIRED = TRUE
PDFIUM_OBJECT_INTEGRITY = PASS
PDFIUM_TREE_CONTENT_IDENTITY = ESTABLISHED
PDFIUM_DEPS_ACQUIRED_BYTE_IDENTITY = ESTABLISHED
PDFIUM_DEPS_TOOL_SELECTORS_REBOUND = TRUE
BRANCH_HEAD_SUBSTITUTION = FALSE
REDIRECT_ACCEPTANCE = FALSE
ACQUIRED_SOURCE_EXECUTION = 0
REPOSITORY_SOURCE_IMPORT = 0
WAIVER = NO
```

This is source-root acquisition qualification only. It does not establish the full `DEPS` dependency checkout, CIPD package bytes, GN/Ninja/Clang acquired bytes, effective Rust requirement, generated build files, PDFium build success, source-to-WASM equality, runtime behavior, distribution eligibility, or release readiness.

## 13. Explicit remaining boundary

The exact acquired PDFium root statically identifies many downstream Git/CIPD dependencies. None were acquired by 004C1DK.

In particular:

```text
GCLIENT_CONFIG = NOT_EXECUTED
GCLIENT_SYNC = NOT_EXECUTED
GCLIENT_HOOKS = NOT_EXECUTED
CIPD_CLIENT = NOT_EXECUTED
PDFIUM_DEPS_DEPENDENCY_ROOTS = NOT_ACQUIRED
GN_ACQUIRED_BYTE_IDENTITY = NOT_ESTABLISHED
NINJA_ACQUIRED_BYTE_IDENTITY = NOT_ESTABLISHED
CLANG_ACQUIRED_BYTE_IDENTITY = NOT_ESTABLISHED
EFFECTIVE_RUST_TOOLCHAIN_REQUIREMENT = NOT_ESTABLISHED
PDFIUM_BUILD_EXECUTION_AUTHORITY = ABSENT
```

A future successor must decide the smallest safe way to close the exact `DEPS` dependency/tool byte identities. 004C1DK does not grant such authority by implication.

## 14. Downstream non-grants

```text
ACQUIRED_DEPOT_TOOLS_EXECUTION = NOT_AUTHORIZED
ACQUIRED_PDFIUM_SCRIPT_EXECUTION = NOT_AUTHORIZED
PATH_MUTATION_WITH_ACQUIRED_ROOTS = NOT_AUTHORIZED
GCLIENT_CONFIG_SYNC_HOOKS = NOT_AUTHORIZED
CIPD_CLIENT_EXECUTION = NOT_AUTHORIZED
GN_NINJA_CLANG_ACQUISITION_OR_EXECUTION = NOT_AUTHORIZED
RUST_TOOLCHAIN_ACQUISITION_OR_EXECUTION = NOT_AUTHORIZED
PDFIUM_CONFIGURATION_BUILD_LINK_RUNTIME = NOT_AUTHORIZED
SNAPSHOT_IMAGE_EXECUTION = NOT_AUTHORIZED
SECOND_PACKAGE_PROVISIONING_ATTEMPT = NOT_AUTHORIZED
REPOSITORY_SOURCE_IMPORT = NOT_AUTHORIZED
NOTICE_SBOM_PROVENANCE_REPOSITORY_MUTATION = NOT_AUTHORIZED
PROVIDER_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE_OR_DEPLOYMENT = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
WAIVER = NO
```

## 15. Candidate merge gates

This candidate may merge only if:

1. canonical main remains `55e2ca5966abb6960983e8ade065799bd95aa4f5` until guarded merge;
2. exactly this one authorized qualification path changes;
3. the two acquired source commits and Git tree IDs remain exact;
4. expected/actual canonical origins remain equal and branch-head substitution remains false;
5. both fsck results remain pass and both acquired checkouts remain clean;
6. both deterministic Git-tree manifest counts and SHA-256 identities remain exact;
7. PDFium `DEPS` blob/byte/line/SHA identities remain exact;
8. the static selectors are represented as acquired-source facts without executing DEPS/gclient/CIPD;
9. no source/tool binary is executed and no acquired source is imported into Signthos;
10. the user's pre-existing primary-worktree state remains untouched;
11. `git diff --check` and exact one-path accounting pass;
12. applicable exact-head Actions/check state is accounted truthfully;
13. fresh independent substantive exact-head review reports no material finding;
14. any material repair is forward-only and triggers fresh exact-head review;
15. unresolved material review threads are zero;
16. immediate premerge base/head/frontier race proof passes;
17. normal merge uses the exact reviewed `expected_head_sha`;
18. post-merge tree/parent/signature/path/blob verification passes;
19. fresh Issue #7 reconciliation occurs before any dependency/tool acquisition or execution authority is inferred.

## 16. Successor rule

After canonical merge, fresh Issue #7 reconciliation must select the next smallest prerequisite from actual remaining evidence. The likely frontier is a non-executing exact `DEPS` dependency/tool acquisition plan or separately bounded acquired-byte closure for GN/Ninja/Clang/CIPD inputs. This document does not authorize either path by implication.
