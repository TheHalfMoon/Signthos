# PDF_TEXT_EXTRACT_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / TEXT_EXTRACT_V1_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7 after PR #268
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit starts the plan 004C `text selection/extraction/search` bullet at its dependency root:
bounded page-text extraction through the adopted exact PDFium runtime. Selection, search, char-box,
and font APIs compose on top later and are explicitly out of scope here.

```text
UNIT = PDF_TEXT_EXTRACT_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 59c65dc30f411102778af0d6d7b752b1df8907fd
CANONICAL_BASE_TREE = a43969de6b0d26e7e627738cb9c3dd8d8f4c4623
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-runtime.js
packages/providers/test/pdf-text-runtime.test.js
specs/004-local-pdf-core/pdf-text-extract-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The module exports only `extractPdfPageTextWithLocalWasm`.

Its implementation mirrors the canonical render-runtime lifecycle:

- destructured inputs `bytes`, `wasmBinary`, `initPdfium`, `pageIndex`, `maxChars` with the same
  per-field fail-fast validation, plus `maxChars` as a positive safe-integer resource bound;
- identical snapshots, runtime-owned initializer options with substitution detection, surface
  validation (extended with `FPDFText_LoadPage`, `FPDFText_CountChars`, `FPDFText_GetText`,
  `FPDFText_HasUnicodeMapError`, `FPDFText_ClosePage`), allocation guards, and document/page
  loading;
- text-page loading with handle validation; character counting with safe-integer validation;
  explicit truncation to `maxChars` with a `truncated` flag; `FPDFText_GetText` into a malloced
  UTF-16LE buffer sized `(extractCount + 1) * 2` with bounds-checked copy-out and NUL handling;
  the unicode-map error flag surfaced explicitly so extraction uncertainty is never silent;
- text-page close ordered before page close, then the identical destroy/close/free/destroy-library
  cleanup with aggregated fail-closed errors; caller-immutability post-checks;
- result envelope `{ openSucceeded, pageIndex, pageCount, charCount, truncated, unicodeMapError,
  text }` where `charCount` is the full page count even when truncated; malformed documents return
  `openSucceeded: false` with the PDFium last-error code, exactly like the render paths.

## 3. Local-only boundary

The text source contains no reference to any of the forbidden surfaces asserted by its source test
(selection/search/char-box/font APIs, page bitmap rendering, package import, `WebAssembly`,
fetch/XHR/worker, `node:fs`/`node:path`, timers, network/URL/CDN tokens). It performs no asset
resolution, application packaging, or revision creation. Extraction is derived `READ_ONLY` evidence
with explicit uncertainty flags.

## 4. Focused text qualification

The focused suite ran under the exact canonical tool identity with the exact adopted package
exposed through an external `NODE_PATH`. No `node_modules` materialization is part of the candidate
repository diff.

```text
NODE_VERSION = v24.20.0
NODE_DARWIN_ARM64_EXECUTABLE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
FIXTURE = admission-seed-ordinary-minimal-v1
FIXTURE_TEXT = Signthos (8 chars, unicodeMapError false)
```

Focused coverage proves, at minimum:

```text
exact module surface and frozen exports
local-only raw-runtime boundary (single init call site, no selection/search/font tokens)
all invalid input classes fail before initializer invocation (initCalls == 0)
ordinary-minimal page 0 extracts deterministic bounded text with explicit flags
truncation at maxChars 4 yields truncated true with the exact 4-char prefix
malformed document fails closed with openSucceeded false and a safe-integer error code
out-of-range page index rejects with RangeError and no partial output
caller bytes and WASM bytes unchanged across successful execution
```

## 5. Real runtime execution (bounded)

Bounded real-package proofs with the ordinary-minimal fixture only (page 0), as authorized:

```text
FOCUSED_TESTS = 7
FOCUSED_PASS = 7
FOCUSED_FAIL = 0
WASM_INSTANTIATION_OBSERVED = YES (positive + fail-closed real-package paths)
NETWORK_ATTEMPTS_OBSERVED = NONE
```

No other valid-document execution occurs in this unit.

## 6. Provenance and legal surface

No dependency, lockfile, notice, or license surface changes in this unit. The manifest change appends
only the new text test file to the provider test command.

## 7. Explicit non-claims

```text
TEXT_SELECTION_SEARCH_CHARBOX_FONT_APIS = NOT_AUTHORIZED / NOT_IMPLEMENTED
BRIDGE_ORCHESTRATOR_FACADE_PROVIDER_WIRING = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_READS = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 8. Candidate file hashes (final bytes)

Recorded after final exact-Node qualification rerun, before review:

```text
TEXT_SOURCE_SHA256 = 9fb023a14af3322bdb26ecd12d53557f8404cb025cdcbaacf58fbda5dcbb1b05
TEXT_TEST_SHA256 = 5434f4a5946d616a770a34878432f37bac8211277301e39f95ecfe9b4b76c38a
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

No successor authority is inherited from this document. In particular, the text runtime does not
itself authorize selection/search, bridge/orchestrator/facade/provider wiring, metadata reads,
004D, Specification 005, release, deployment, or project completion.
