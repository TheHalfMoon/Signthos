# PDF_TEXT_SELECT_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / TEXT_SELECT_V1_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7 after PR #269
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit continues the plan 004C `text selection/extraction/search` bullet at its second
dependency step: bounded page-text selection (character range to text plus highlight rectangles)
through the adopted exact PDFium runtime, composing on the extraction core. Search (find) and
char-box/font APIs compose on top later and are explicitly out of scope here.

```text
UNIT = PDF_TEXT_SELECT_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = bf170605ae74ff6d0d851ebae5be90ecee727e2e
CANONICAL_BASE_TREE = 18ba81bb60abd2ceedc20eacf4fafae5e1a69194
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-select-runtime.js
packages/providers/test/pdf-text-select-runtime.test.js
specs/004-local-pdf-core/pdf-text-select-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The module exports only `selectPdfPageTextWithLocalWasm`.

Its implementation mirrors the canonical text-extract lifecycle in a self-contained module
(`pdf-text-runtime.js` keeps its pinned single-export surface; zero canonical-file churn):

- destructured inputs `bytes`, `wasmBinary`, `initPdfium`, `pageIndex`, `startIndex`,
  `selectCount`, `maxRects` with the same per-field fail-fast validation, plus `startIndex`
  as a non-negative safe integer, `selectCount` as a PDFium-int character count
  (`0..0x7fffffff`), and `maxRects` as a positive PDFium-int resource bound
  (`1..0x7fffffff`, rejected before any runtime effect);
- identical snapshots, runtime-owned initializer options with substitution detection, surface
  validation (extended with `FPDFText_CountRects` and `FPDFText_GetRect` only), allocation
  guards, and document/page/text-page loading with character counting;
- range validation (`startIndex <= charCount` and `startIndex + selectCount <= charCount`
  as a safe integer, else `RangeError` with no partial output); `selectCount = 0` yields an
  empty selection without text-buffer or rect calls;
- text over exactly the selected range via the same `FPDFText_GetText` bounded UTF-16LE
  copy-out discipline with NUL handling, where a text-buffer cleanup failure aggregates
  with (never replaces) the extraction error; the per-character
  `FPDFText_HasUnicodeMapError(textPage, startIndex + index)` flag OR-ed over exactly the
  selected range (empty range yields false; any invalid per-index flag fails closed), so
  extraction uncertainty stays explicit and never silent;
- rectangles via `FPDFText_CountRects(textPage, startIndex, selectCount)` with fail-closed
  count validation, truncation to `maxRects` with an explicit `rectsTruncated` flag, and
  per-rect `FPDFText_GetRect` reads through one malloced 32-byte f64 slot with
  bounds-checked copy-out via alignment-safe `DataView`, finite-double validation, and
  `left <= right` (no top/bottom ordering claim: PDF y-up coordinates report top above
  bottom); a rect-read failure aggregates with (never replaces) the rect-slot cleanup
  failure; the slot is always freed;
- text-page close ordered before page close, then the identical destroy/close/free/destroy-library
  cleanup with aggregated fail-closed errors; caller-immutability post-checks;
- result envelope `{ openSucceeded, pageIndex, pageCount, charCount, startIndex,
  selectCount, rectCount, rectsTruncated, unicodeMapError, text, rects }` where `rectCount`
  is the full rectangle total even when truncated and `rects` entries are frozen
  `{ left, top, right, bottom }`; malformed documents return `openSucceeded: false` with
  the PDFium last-error code, exactly like the extract/render paths.

## 3. Local-only boundary

The selection source contains no reference to any of the forbidden surfaces asserted by its source test
(find/search/char-box/font/bounded-text APIs, page bitmap rendering, package import, `WebAssembly`,
fetch/XHR/worker, `node:fs`/`node:path`, timers, network/URL/CDN tokens). It performs no asset
resolution, application packaging, or revision creation. Selection is derived `READ_ONLY` evidence
with explicit uncertainty and truncation flags.

## 4. Focused selection qualification

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
FIXTURE_FULL_RECT = (20.58799934387207, 108.84400177001953, 66.26000213623047, 97.37200164794922)
FIXTURE_SUB_RECT_0_4 = (20.58799934387207, 108.84400177001953, 43.23200225830078, 97.37200164794922)
```

Focused coverage proves, at minimum:

```text
exact module surface and frozen exports (rects array and rect objects frozen)
local-only raw-runtime boundary (single init call site, no find/search/char-box/font tokens)
all invalid input classes fail before initializer invocation (initCalls == 0)
ordinary-minimal page 0 full-range selection: deterministic text plus one exact rect
ordinary-minimal sub-range [0, 4) selection: exact 4-char prefix plus its exact rect
empty selection returns empty text with zero rects and no rect calls
out-of-range startIndex/count rejects with RangeError and no partial output
stub-surface proofs: empty page, range-scoped map error (inside true, outside false),
invalid per-index flag fails closed, rect truncation at maxRects with exact kept prefix
allocation-bounds proofs: unsupported character count and maximum-int text buffer reject
before text-buffer malloc; invalid rectangle count rejects before rect-slot malloc
(malloc-call-count asserted in all three)
failed rectangle query and invalid rectangle coordinates (left > right, NaN) fail closed
extraction+cleanup dual failure aggregates losslessly
rect-read + rect-cleanup dual failure aggregates losslessly
malformed document fails closed with openSucceeded false and a safe-integer error code
out-of-range page index rejects with RangeError and no partial output
caller bytes and WASM bytes unchanged across successful execution
```

## 5. Real runtime execution (bounded)

Bounded real-package proofs with the ordinary-minimal fixture only (page 0), as authorized:

```text
FOCUSED_TESTS = 20
FOCUSED_PASS = 20
FOCUSED_FAIL = 0
WASM_INSTANTIATION_OBSERVED = YES (positive + fail-closed real-package paths)
NETWORK_ATTEMPTS_OBSERVED = NONE
```

No other valid-document execution occurs in this unit.

## 6. Provenance and legal surface

No dependency, lockfile, notice, or license surface changes in this unit. The manifest change appends
only the new selection test file to the provider test command.

## 7. Explicit non-claims

```text
TEXT_SEARCH_FIND_APIS = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_CHARBOX_FONT_APIS = NOT_AUTHORIZED / NOT_IMPLEMENTED
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
SELECT_SOURCE_SHA256 = 8eb840b2544dcf5da7b62ffce8958c4f58b07a9e983e67792ad682401c1c65b9
SELECT_TEST_SHA256 = a4b617914ab448e59cd7117c7764618e4deb5bcba7b2429c71310d04149f9f2e
PROVIDERS_PACKAGE_SHA256 = 114c3bce0ba364d9d21189e324527bcf5a57e49c66796c95ac163544c35db00f
```

The document's own bytes are bound externally: the candidate tree SHA in the PR body
and the merge-tree equality check cover this file byte-identically (a self-recorded
document hash could never match its own final bytes).

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

No successor authority is inherited from this document. In particular, the selection runtime does not
itself authorize search/find, char-box/font APIs, bridge/orchestrator/facade/provider wiring, metadata reads,
004D, Specification 005, release, deployment, or project completion.
