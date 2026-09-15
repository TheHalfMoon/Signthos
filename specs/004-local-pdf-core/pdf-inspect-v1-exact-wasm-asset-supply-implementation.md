# PDF_INSPECT_V1 Exact WASM Asset Supply Implementation

Status: `IMPLEMENTATION_CANDIDATE / EXACT_WASM_ASSET_SUPPLY_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7 after PR #257
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit closes the WASM supply seam left after the canonical exact-package facade: every production layer treated `wasmBinary` as caller-supplied pass-through, and only tests supplied WASM bytes from external exact-package extraction. No production source obtained, verified, or packaged the exact local WASM bytes.

```text
UNIT = PDF_INSPECT_V1_EXACT_WASM_ASSET_SUPPLY_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = f9bf6c6d4462ad8501dec084e6dbcbd97438a509
CANONICAL_BASE_TREE = a8883157f9c52fb86f36f50d076d16a2373a3e3b
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-inspect-wasm-asset.js
packages/providers/test/pdf-inspect-wasm-asset.test.js
specs/004-local-pdf-core/pdf-inspect-v1-exact-wasm-asset-supply-implementation.md
```

## 2. Implementation contract

The supplier exports only `loadExactPdfiumWasmAsset({ packageRoot })`.

Its implementation:

- accepts exactly one strict own-data options object with only `packageRoot`, rejecting proxy, accessor, symbol-bearing, extra-key, and custom-prototype surfaces without invoking caller getter code;
- requires `packageRoot` to be a non-empty string;
- reads `<packageRoot>/package.json` with local file reads only and fails closed when it is unreadable, invalid JSON, or a non-object shape;
- verifies package identity exactly: name `@embedpdf/pdfium`, version `2.15.0`, no declared dependencies;
- reads `<packageRoot>/dist/pdfium.wasm` with local file reads only and fails closed when unreadable;
- verifies WASM identity exactly: byte length `4633788` and SHA-256 `c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8`;
- returns a private caller-owned `Buffer` copy on every call: no shared cache, no memoization, no global state;
- never imports the package code itself (`@embedpdf/pdfium` initializer, PDFium symbols, WASM instantiation are all out of scope);
- performs no network access, CDN/URL resolution, worker integration, rendering, text, or search work;
- changes no lower-level contract (facade, orchestrator, binding, runtime, supervisor, bridge, provider untouched).

The caller supplies the package root explicitly, mirroring the codebase's caller-supplied philosophy: the supplier verifies, it does not resolve, install, or download anything.

## 3. Local-only boundary

The supplier source contains no reference to any of:

```text
@embedpdf/pdfium code import
initPdfium
inspectPdfWith* / orchestratePdfInspect
PDFiumExt_Init
FPDF_*
WebAssembly
fetch(...) / XMLHttpRequest
Worker( / importScripts
child_process
node:net / node:tls / node:dns
setTimeout( / setInterval(
http:// / https://
URL
CDN
```

## 4. Focused asset qualification

The focused asset suite ran under the exact canonical tool identity with the exact adopted package exposed through an external `NODE_PATH`. No `node_modules` materialization is part of the candidate repository diff.

```text
NODE_VERSION = v24.20.0
NODE_DARWIN_ARM64_ARCHIVE_SHA256 = 40e5607e5ecb3db9192723776da2d75d966260fc74a7a9e731c1bd67dda96bc8
NODE_DARWIN_ARM64_EXECUTABLE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
PDFIUM_WASM_BYTES = 4633788
FIXTURE = admission-seed-ordinary-minimal-v1
FIXTURE_SHA256 = d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207
```

Focused coverage proves, at minimum:

```text
module exposes only the bounded loader
source uses only local file reads with pinned identity checks
loader returns caller-owned exact WASM bytes from the adopted package
each call returns an independent copy (mutation isolation)
package identity mismatch fails closed (name, version, deps, shape, JSON, missing)
WASM identity mismatch fails closed (tampered, truncated, empty, missing)
proxy/accessor/extra-key/malformed root fail without getter invocation
null-prototype options accepted
supplied bytes drive the canonical facade to semantic success with one page
```

Focused results:

```text
FOCUSED_TESTS = 9
FOCUSED_PASS = 9
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 98b86f4f7be883cc450a5f254eff3c1a3ce90de7b5197e933c3d201f85a419a4
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
NETWORK_STDOUT_SHA256 = fa2aeb3604db791daa898ce9cc685d388578036f3583de3ee0b3eb9515e6ba1c
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 6. Complete applicable provider qualification

The complete canonical provider suite, including the new asset test file as separately expanded arguments, passed under the exact Node executable.

```text
TOTAL_TESTS = 209
PASS = 209
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = b15c2d783f7e7fd3c64575d9aa7a08fe3506c2df7131353654fcc9feddd68fc7
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
WASM_ASSET_SOURCE_SHA256 = 7503c1b28aafa7507b3151940f1d0b603eede24ea0f266dc0e69365c7bfec2ea
WASM_ASSET_TEST_SHA256 = b00e603d6eaa3203239856da0f18fd7bb78a3b6b7496fa125a7ccbcec720ffef
PROVIDERS_PACKAGE_JSON_SHA256 = e680af525f92afa06d2bfb5677b60d66d2a7eaaa642be57b562bd9eecaddda52
```

The package-manifest change only appends `test/pdf-inspect-wasm-asset.test.js` to the existing provider test command. It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that the exact adopted `@embedpdf/pdfium@2.15.0` WASM bytes can be supplied to the canonical facade path through one governed local-only seam with pinned identity verification and caller-owned copy semantics, succeeding on the canonical ordinary-minimal fixture without an observed network attempt.

It does not prove browser-worker asset packaging, same-origin application asset loading, font fallback behavior, render determinism, text extraction/search correctness, corpus-wide compatibility, or native/server parity.

## 9. Explicit non-grants

```text
BROWSER_WORKER_INTEGRATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
CDN_RUNTIME_FETCH = NOT_AUTHORIZED / NOT_USED
DEFAULT_PDFIUM_WASM_URL = NOT_USED
FONT_FALLBACK_CONFIGURATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
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
