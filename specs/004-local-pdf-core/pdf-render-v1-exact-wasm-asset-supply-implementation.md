# PDF_RENDER_V1 Exact WASM Asset Supply Implementation

Status: `IMPLEMENTATION_CANDIDATE / EXACT_WASM_ASSET_SUPPLY_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7 after PR #266
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit closes the WASM supply seam left after the canonical exact-package facade: every
production render layer treated `wasmBinary` as caller-supplied pass-through, and only tests
supplied WASM bytes from external exact-package extraction. No production render-side source
obtained, verified, or packaged the exact local WASM bytes, and the render side must not import
`inspect`-named modules.

```text
UNIT = PDF_PAGE_RENDER_V1_EXACT_WASM_ASSET_SUPPLY_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 72f81a0d48d516c7eb22490d247f259858f4d4b4
CANONICAL_BASE_TREE = 21a378bb3d5f29400b40a163b904a43ee17bff66
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-render-wasm-asset.js
packages/providers/test/pdf-render-wasm-asset.test.js
specs/004-local-pdf-core/pdf-render-v1-exact-wasm-asset-supply-implementation.md
```

## 2. Implementation contract

The supplier exports only `loadExactPdfiumWasmAsset({ packageRoot })`.

Its implementation:

- accepts exactly one strict own-data options object with only `packageRoot`, rejecting proxy,
  accessor, symbol-bearing, extra-key, and custom-prototype surfaces without invoking caller
  getter code;
- requires `packageRoot` to be a non-empty string;
- reads `<packageRoot>/package.json` with local file reads only and fails closed when it is
  unreadable, invalid JSON, or a non-object shape;
- verifies package identity exactly: name `@embedpdf/pdfium`, version `2.15.0`, no declared
  dependencies;
- reads `<packageRoot>/dist/pdfium.wasm` with local file reads only and fails closed when
  unreadable;
- verifies WASM identity exactly: byte length `4633788` and SHA-256
  `c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8`;
- returns a private caller-owned `Buffer` copy on every call: no shared cache, no memoization, no
  global state;
- never imports the package code itself (`@embedpdf/pdfium` initializer, PDFium symbols, WASM
  instantiation are all out of scope);
- performs no network access, CDN/URL resolution, worker integration, rendering, text, or search
  work;
- changes no lower-level contract (facade, orchestrator, binding, runtime, supervisor, bridge,
  provider untouched).

The caller supplies the package root explicitly, mirroring the codebase's caller-supplied
philosophy: the supplier verifies, it does not resolve, install, or download anything.

## 3. Local-only boundary

The supplier source contains no reference to any of:

```text
@embedpdf/pdfium code import
initPdfium
renderPdfPageWith* / orchestratePdfRender
PDFiumExt_Init
FPDF_*
WebAssembly
fetch(...) / XMLHttpRequest
Worker( / importScripts
child_process / node:net / node:tls / node:dns
setTimeout( / setInterval(
http:// / https://
URL
CDN
```

## 4. Focused asset qualification

The focused asset suite ran under the exact canonical tool identity with the exact adopted package
exposed through an external `NODE_PATH`. No `node_modules` materialization is part of the candidate
repository diff. Mismatch fixtures are written to the OS temporary directory, never to the
repository.

```text
NODE_VERSION = v24.20.0
NODE_DARWIN_ARM64_EXECUTABLE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
PDFIUM_WASM_BYTES = 4633788
```

Focused coverage proves, at minimum:

```text
exact single-key field surface and unsafe accessor/proxy rejection without getter invocation
loader returns caller-owned SHA-pinned bytes from the adopted package
each call returns an independent copy; mutating one never affects later calls
wrong name/version/dependencies/non-object/invalid-JSON/missing metadata fails closed
tampered/truncated/empty/missing WASM fails closed
null-prototype options remain accepted
```

## 5. No runtime execution

`REAL_RUNTIME_EXECUTION` and `WASM_INSTANTIATION` are explicitly forbidden by the unit authority.
No test path imports the package initializer or instantiates PDFium WASM:

```text
FOCUSED_TESTS = 8
FOCUSED_PASS = 8
FOCUSED_FAIL = 0
WASM_INSTANTIATION_OBSERVED = NONE
NETWORK_ATTEMPTS_OBSERVED = NONE
```

Composition with the canonical facade is by byte identity: supplied bytes are SHA-256-pinned
identical to the exact WASM bytes the facade unit already executed successfully. No new execution
proof is claimed here.

## 6. Provenance and legal surface

No dependency, lockfile, notice, or license surface changes in this unit. The exact adopted package
and its frozen legal evidence are inherited unchanged from canonical predecessors; the test resolves
the package through an external pre-existing `NODE_PATH` copy for resolution only, with no
acquisition, no package-manager action, and no network. The manifest change appends only the new
asset test file to the provider test command.

## 7. Explicit non-claims

```text
ASSET_PATH_RESOLVER = NOT_AUTHORIZED / NOT_IMPLEMENTED
APPLICATION_WASM_PACKAGING = NOT_AUTHORIZED / NOT_IMPLEMENTED
WORKER_OR_BROWSER_INTEGRATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
REAL_RUNTIME_EXECUTION = NOT_AUTHORIZED / NOT_EXECUTED
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

## 8. Candidate file hashes (final bytes)

Recorded after final exact-Node qualification rerun, before review:

```text
ASSET_SOURCE_SHA256 = a340db7769c9ec615a3fa289c5cc249bb9400aa1b6554f39b91e3fe4b10c467d
ASSET_TEST_SHA256 = ce65b5345981481cf332870dd228cfe46e7e5791d92cd7fdf3de03378fc5c2c3
```

## 9. Merge and successor gates

This candidate is not canonical until all of the following hold on the exact final head:

1. the final diff contains only the four authorized paths;
2. exact Node qualification is rerun after the qualification document is complete;
3. source/test/package/document hashes are recorded for the final bytes;
4. `git diff --check` is clean;
5. repository status is byte-identical before and after final qualification;
6. a fresh independent substantive exact-head review reports no material findings;
7. all material review threads are resolved;
8. live `main`, candidate head/tree, changed paths, open-PR set, and applicable status truth are
   reverified immediately before merge;
9. merge uses normal merge with exact expected head SHA and no history rewriting;
10. post-merge tree, ordered parents, signature, changed surface, PR state, and open-PR state are
    mechanically verified;
11. Issue #7 receives canonical closeout;
12. a fresh successor reconciliation determines the next minimum dependency-ordered unit.

No successor authority is inherited from this document. In particular, verified supply does not
itself authorize asset resolution, application packaging, browser-worker integration,
thumbnail/text/search, 004D, Specification 005, release, deployment, or project completion.
