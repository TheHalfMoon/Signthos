# PDF_INSPECT_V1 Exact Package Supervised Semantic Facade Implementation

Status: `IMPLEMENTATION_CANDIDATE / EXACT_PACKAGE_SUPERVISED_SEMANTIC_FACADE_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7 after PR #256
Preserved non-qualifying harness invocation: recorded on Issue #7 (complete-suite attempt passed the provider test-file list to Node as one combined path argument; zero candidate tests executed)
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit closes the last composition seam between the canonical supervised semantic orchestrator and the canonical exact PDFium package runtime binding. Before this unit, production source imported or composed both surfaces nowhere: the orchestrator required an injected zero-argument `runRuntime`, and the exact package binding exposed `inspectPdfWithExactPdfiumPackage({ bytes, wasmBinary })`, with each layer exercised only independently.

```text
UNIT = PDF_INSPECT_V1_EXACT_PACKAGE_SUPERVISED_SEMANTIC_FACADE_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 496921447031c4a778f7570fceeae96820b81bf2
CANONICAL_BASE_TREE = 8d41d5c62957a41ce88787599bf7ad096d8aef72
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-inspect-exact-package-facade.js
packages/providers/test/pdf-inspect-exact-package-facade.test.js
specs/004-local-pdf-core/pdf-inspect-v1-exact-package-supervised-semantic-facade-implementation.md
```

## 2. Implementation contract

The facade exports only `inspectPdfWithExactPackageSupervisedSemantics(options)`.

Its implementation:

- imports only canonical `orchestratePdfInspect()`, canonical `inspectPdfWithExactPdfiumPackage()`, and the standard-library `node:util` helpers needed for safe boundary validation;
- accepts exactly caller-supplied `bytes`, `wasmBinary`, `request`, `availability`, `runtimeBinding`, `terminalControl`, and `terminateRuntime`;
- rejects proxy, accessor, and unknown top-level option surfaces without invoking caller getter code;
- requires a non-empty caller-owned `wasmBinary` byte view before any terminal subscription or runtime effect;
- passes the same extracted `bytes`, request, availability, runtime binding, terminal control, and termination function into the canonical orchestrator;
- supplies exactly one `runRuntime` closure that invokes the exact package binding with that same extracted `bytes` object and same caller `wasmBinary` object;
- never retries runtime, orchestration, termination, or semantic composition;
- preserves all canonical request, runtime-binding, provider, and result validation in predecessor layers rather than duplicating or weakening it;
- snapshots caller WASM bytes before orchestration and fails closed if they change during completed-runtime or terminal supervision;
- if both orchestration and WASM-integrity failure occur, preserves both failures in an `AggregateError` rather than suppressing either;
- returns only the canonical semantic provider result produced by the canonical orchestrator.

## 3. WASM integrity seam

The canonical supervisor protects source PDF bytes, the runtime binding, and terminal controls across runtime and terminal activity, but `wasmBinary` is not part of the supervisor contract, and a synchronous terminal path can skip the raw runtime entirely. The facade therefore owns WASM immutability directly:

- the non-empty byte-view check runs before terminal subscription, so invalid, missing, or empty WASM cannot cause any runtime effect;
- the snapshot is a private copy taken before orchestration begins;
- after orchestration settles (success or failure), the live caller view is compared byte-for-byte against the snapshot;
- a mismatch after successful orchestration throws a WASM-integrity error instead of returning the semantic result;
- a mismatch combined with an orchestration failure throws an `AggregateError` carrying both failures in order;
- an orchestration failure with intact WASM bytes propagates the original error object unchanged.

The facade never writes to caller PDF or WASM bytes. The exact package runtime already isolates the bytes it hands to the PDFium initializer, so the post-orchestration comparison detects only genuine caller-side or terminal-path mutation.

## 4. Terminal semantics

Terminal behavior is owned entirely by the canonical supervisor and orchestrator. The facade forwards the caller terminal control and termination function unchanged and creates no terminal control of its own. Synchronous qualified terminal signals therefore retain canonical behavior: the exact package runtime never starts, the winning terminal path calls `terminateRuntime()` once, and only qualified terminal evidence proceeds to semantic composition. The facade post-check still applies on terminal paths, so terminal-callback or termination mutation of caller WASM fails closed instead of returning terminal semantics.

## 5. Local-only boundary

The facade source contains no reference to any of:

```text
inspectPdfWithLocalWasm
initPdfium
@embedpdf/pdfium
PDFiumExt_Init
FPDF_*
WebAssembly
DEFAULT_PDFIUM_WASM_URL
fetch(...)
XMLHttpRequest
Worker(
importScripts
child_process
setTimeout(
setInterval(
http://
https://
node:fs
node:path
URL
CDN
asset resolution
WASM path resolver
font fallback
render / thumbnail / text extract / select / search
```

The facade performs no asset resolution, application WASM packaging, browser-worker integration, network loading, rendering, text, or search capability. It creates no canonical PDF revision and adds no retry, cache, or global runtime state.

## 6. Focused facade qualification

The focused facade suite ran under the exact canonical tool identity with the exact adopted package exposed through an external `NODE_PATH`. No `node_modules` materialization is part of the candidate repository diff.

```text
NODE_VERSION = v24.20.0
NODE_DARWIN_ARM64_ARCHIVE_SHA256 = 40e5607e5ecb3db9192723776da2d75d966260fc74a7a9e731c1bd67dda96bc8
NODE_DARWIN_ARM64_EXECUTABLE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
FIXTURE = admission-seed-ordinary-minimal-v1
FIXTURE_SHA256 = d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207
```

Focused coverage proves, at minimum:

```text
exact top-level field surface and unsafe accessor/proxy rejection without getter invocation
invalid/missing/empty WASM fails before terminal subscription or runtime start
ordinary-minimal real-package execution returns canonical semantic success with one page
single runRuntime closure over the same caller bytes and wasm objects
caller PDF and WASM bytes unchanged on successful execution
synchronous terminal-first paths preserve terminal semantics without runtime completion
terminal callback/termination/disposer WASM mutation fails closed
combined orchestration and WASM-integrity failure preserves both failures
unchanged orchestration failure propagates without retry when WASM is intact
canonical malformed-input, unavailable, and invalid-request semantics unchanged
no network/asset/CDN/browser-worker/render/text/search surface introduced
```

Focused results:

```text
FOCUSED_TESTS = 21
FOCUSED_PASS = 21
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 4b8456c296bfe900bdb99e8f39f0341c6269fbebff994db3f8315eb283692dba
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 7. Network-denied execution evidence

The same exact focused suite was rerun with an external deny preload intercepting Node HTTP, HTTPS, TCP, TLS, and global `fetch` entry points, using a pre-created network log file.

```text
NETWORK_TESTS = 21
NETWORK_PASS = 21
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = 3f36660cacdf77bf9164cd6fee194703bde7de53f3b3f378d37764291af22642
NETWORK_STDOUT_SHA256 = 838c33d29d1341c5ce6106a79acd2e199eec7f738ce3f21eec021cccf0f1c8c4
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 8. Complete applicable provider qualification

The complete canonical provider suite, including the new facade test file as separately expanded arguments, passed under the exact Node executable.

```text
TOTAL_TESTS = 200
PASS = 200
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = 8927655a96b95298cb2596efce730bc4fdf9a4d9dccf9c07fcc07face879386b
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

Applicable predecessor tests cover content identity/admission, PDFium structural evidence, the semantic provider, local-WASM runtime core, terminal supervisor, supervised-result semantic bridge, supervised semantic orchestrator, and exact PDFium package runtime binding.

## 9. Candidate file identities

Before this qualification document was completed, the three implementation/test surfaces had these exact identities:

```text
FACADE_SOURCE_SHA256 = cdb0f6b812b0af6c054e04ce5405a6439fd14c035ca6113e1e708c378489feaf
FACADE_TEST_SHA256 = e5a89df3d7f8a02025374504d5d6def407e17395571292db6f2e638bd25bcb97
PROVIDERS_PACKAGE_JSON_SHA256 = 83e6e8dfe9842a7e9d6303d25f43de8259a1303e725e4cd96055f2eac5748628
```

The package-manifest change only appends `test/pdf-inspect-exact-package-facade.test.js` to the existing provider test command. It changes no dependency declaration.

## 10. Exact qualification claim

This candidate proves only that the canonical supervised semantic orchestrator can be bound directly to the exact adopted `@embedpdf/pdfium@2.15.0` package runtime through one caller-supplied seam with caller/application-supplied PDF and WASM bytes, that this path succeeds on the canonical ordinary-minimal fixture under the measured Node/Darwin environment without an observed network attempt, and that caller WASM immutability holds across completed-runtime and terminal-first paths.

It does not prove browser-worker asset packaging, same-origin application asset loading, font fallback behavior, render determinism, text extraction/search correctness, corpus-wide compatibility, or native/server parity.

## 11. Explicit non-grants

```text
ASSET_PATH_RESOLVER = NOT_AUTHORIZED / NOT_IMPLEMENTED
APPLICATION_WASM_PACKAGING = NOT_AUTHORIZED / NOT_IMPLEMENTED
DEFAULT_PDFIUM_WASM_URL = NOT_USED
CDN_RUNTIME_FETCH = NOT_AUTHORIZED / NOT_USED
FONT_FALLBACK_CONFIGURATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
BROWSER_WORKER_INTEGRATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TERMINAL_CONTROL_IMPLEMENTATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
PDF_PAGE_RENDER_V1 = NOT_AUTHORIZED
PDF_THUMBNAIL_RENDER_V1 = NOT_AUTHORIZED
PDF_TEXT_EXTRACT_V1 = NOT_AUTHORIZED
PDF_TEXT_SELECT_V1 = NOT_AUTHORIZED
PDF_TEXT_SEARCH_V1 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 12. Merge and successor gates

This candidate is not canonical until all of the following hold on the exact final head:

1. the final diff contains only the four authorized paths;
2. exact Node qualification is rerun after the qualification document is complete;
3. source/test/package/document hashes are recorded for the final bytes;
4. `git diff --check` is clean;
5. repository status is byte-identical before and after final qualification;
6. a fresh independent substantive exact-head review reports no material findings;
7. all material review threads are resolved;
8. live `main`, candidate head/tree, changed paths, open-PR set, and applicable status truth are reverified immediately before merge;
9. merge uses normal merge with exact expected head SHA and no history rewriting;
10. post-merge tree, ordered parents, signature, changed surface, PR state, and open-PR state are mechanically verified;
11. Issue #7 receives canonical closeout;
12. a fresh successor reconciliation determines the next minimum dependency-ordered unit.

No successor authority is inherited from this document. In particular, successful facade composition does not itself authorize asset resolution, application packaging, browser-worker integration, render/text/search, 004D, Specification 005, release, deployment, or project completion.

The final document SHA-256 is recorded in external GitHub qualification evidence after the file is complete; the document does not contain a self-referential digest.
