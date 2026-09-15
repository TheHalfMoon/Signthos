# PDF_PAGE_RENDER_V1 Local WASM Runtime Core Implementation

Status: `IMPLEMENTATION_CANDIDATE / LOCAL_WASM_RENDER_CORE_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7 after PR #258
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit opens the page-render capability at the raw-runtime core, exactly as the inspect path began: one bounded caller-supplied seam that loads a document through the exact local PDFium WASM runtime and renders one page to owned bitmap bytes. No render semantic provider, bridge, supervisor, thumbnail, text, or search surface is created.

```text
UNIT = PDF_PAGE_RENDER_V1_LOCAL_WASM_RUNTIME_CORE_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = cd56d5b2924a16ef94752050769144744885c66a
CANONICAL_BASE_TREE = d60c50def951398ae8b95ade465ddf9de3255d11
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-render-runtime.js
packages/providers/test/pdf-render-runtime.test.js
specs/004-local-pdf-core/pdf-render-v1-local-wasm-runtime-core-implementation.md
```

## 2. Implementation contract

The core exports only `renderPdfPageWithLocalWasm({ bytes, wasmBinary, initPdfium, pageIndex, maxPixels })`.

Its implementation:

- validates every input before any runtime effect: non-empty PDF/WASM byte views (proxy-rejecting), function initializer, non-negative safe-integer page index, positive safe-integer pixel budget;
- snapshots caller bytes, isolates runtime WASM in a private copy, and verifies the initializer did not replace it;
- validates the full touched PDFium surface (`PDFiumExt_Init`, load/last-error/page-count, page load, float page size, bitmap create/render/buffer/stride/destroy, page/document close, library destroy, `HEAPU8`, malloc/free);
- preserves canonical malformed-input behavior as a frozen `{ openSucceeded: false, pdfiumLastError }` observation;
- fails closed when the page index exceeds the loaded page count, when the page size is invalid or unrenderable, and when `width * height` exceeds the caller pixel budget;
- renders with rotate `0` and flags `0` (deterministic; annotations excluded) into a runtime-owned `BGRA` bitmap (`FPDFBitmap_BGRA = 4` per the PDFium C API) created with caller-independent allocation;
- validates bitmap stride, buffer pointer, and bounds against `HEAPU8` before copying owned pixel bytes out;
- enforces full lifetime cleanup (bitmap, page, document, allocation, library) with combined-failure preservation identical in structure to the canonical inspect runtime;
- detects caller/RAM source and WASM mutation and fails closed with combined errors;
- returns only a frozen raw observation; creates no revision and writes no files.

## 3. Local-only boundary

The core source contains no reference to any of:

```text
@embedpdf/pdfium code import
WebAssembly
DEFAULT_PDFIUM_WASM_URL
fetch(...) / XMLHttpRequest
Worker( / importScripts
child_process
node:fs / node:path
setTimeout( / setInterval(
http:// / https://
URL / CDN
```

## 4. Focused render qualification

The focused render suite ran under the exact canonical tool identity with the exact adopted package exposed through an external `NODE_PATH`. No `node_modules` materialization is part of the candidate repository diff.

```text
NODE_VERSION = v24.20.0
NODE_DARWIN_ARM64_ARCHIVE_SHA256 = 40e5607e5ecb3db9192723776da2d75d966260fc74a7a9e731c1bd67dda96bc8
NODE_DARWIN_ARM64_EXECUTABLE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
FIXTURE = admission-seed-ordinary-minimal-v1
FIXTURE_SHA256 = d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207
RENDER_PAGE = 0
RENDER_SIZE = 200 x 200
RENDER_STRIDE = 800
RENDER_PIXEL_SHA256 = ee8a61c37f566f82977b0371055fcc068f34dc351169acbb4b556b94a8c6dd7a
```

Focused coverage proves, at minimum:

```text
module exposes only the bounded render function
source keeps the local-only raw-runtime boundary with a single initializer call
invalid inputs (bytes, wasm, initializer, page index, pixel budget, proxy bytes) fail before runtime effects
ordinary-minimal page 0 renders to 200x200 BGRA with deterministic bytes across runs
malformed input preserves canonical format-rejection semantics
out-of-range page index fails closed after open
over-budget pixel cap fails closed before bitmap creation; exact-budget render succeeds
initializer WASM substitution fails closed
incomplete PDFium surface fails closed
caller bytes and WASM bytes unchanged
```

Focused results:

```text
FOCUSED_TESTS = 9
FOCUSED_PASS = 9
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 907fcc379e984ba71964651da7bb8fdbf6c543859d49c490bdf0cb36fdc5011e
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 5. Network-denied execution evidence

The same exact focused suite was rerun with an external deny preload intercepting Node HTTP, HTTPS, TCP, TLS, WebSocket, and global `fetch` entry points, using a pre-created network log file.

```text
NETWORK_TESTS = 9
NETWORK_PASS = 9
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = 3f36660cacdf77bf9164cd6fee194703bde7de53f3b3f378d37764291af22642
NETWORK_STDOUT_SHA256 = ab4305f93a6ddc2e3bf2328d1696915be4ad24c5512ccbf94705fab7ab398aca
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 6. Complete applicable provider qualification

The complete canonical provider suite, including the new render test file as separately expanded arguments, passed under the exact Node executable.

```text
TOTAL_TESTS = 218
PASS = 218
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = bf74fe21bf532a5a46d121f24016355e78f6c37e5223a1be430b48fc258b1235
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
RENDER_RUNTIME_SOURCE_SHA256 = a4ac3e427d54d09a2314132b3540f99fe124b3eccf6831e9d8525fb5e157806b
RENDER_RUNTIME_TEST_SHA256 = ae922684bf4e04492e703d7b543460b0757633a6f0daf55993fc7049920bb23f
PROVIDERS_PACKAGE_JSON_SHA256 = 782b581b8bcd11bff45a2c4062cdb3e1db1623fff9138f97fa3e6e83462b55fd
```

The package-manifest change only appends `test/pdf-render-runtime.test.js` to the existing provider test command. It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that one page of the canonical ordinary-minimal fixture can be rendered to owned BGRA bitmap bytes through the exact adopted local PDFium WASM runtime under caller pixel-budget control, deterministically in the measured environment and without an observed network attempt.

It does not prove a render semantic provider, cross-document render determinism, font-fallback behavior, annotation rendering, thumbnail/text/search correctness, corpus-wide compatibility, or native/server parity.

## 9. Explicit non-grants

```text
RENDER_SEMANTIC_PROVIDER = NOT_AUTHORIZED / NOT_IMPLEMENTED
RENDER_SUPERVISOR_OR_BRIDGE = NOT_AUTHORIZED / NOT_IMPLEMENTED
PDF_THUMBNAIL_RENDER_V1 = NOT_AUTHORIZED
PDF_TEXT_EXTRACT_V1 = NOT_AUTHORIZED
PDF_TEXT_SELECT_V1 = NOT_AUTHORIZED
PDF_TEXT_SEARCH_V1 = NOT_AUTHORIZED
BROWSER_WORKER_INTEGRATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
CDN_RUNTIME_FETCH = NOT_AUTHORIZED / NOT_USED
FONT_FALLBACK_CONFIGURATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 10. Merge and successor gates

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

No successor authority is inherited from this document.

The final document SHA-256 is recorded in external GitHub qualification evidence after the file is complete; the document does not contain a self-referential digest.
