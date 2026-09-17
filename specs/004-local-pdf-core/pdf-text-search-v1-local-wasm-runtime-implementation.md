# PDF_TEXT_SEARCH_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / TEXT_SEARCH_V1_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7 after PR #270
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit closes the plan 004C `text selection/extraction/search` bullet at its third
dependency step: bounded page-text search (find query to match index/length list)
through the adopted exact PDFium runtime, composing on the extraction/selection cores.
Char-box/font/bounded-text APIs and any bridge/orchestrator/facade/provider wiring compose
later and are explicitly out of scope here.

```text
UNIT = PDF_TEXT_SEARCH_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = cc53781b603444a2114fb44eafb302966245306a
CANONICAL_BASE_TREE = 60eba4655de9be90e7c323c69e38772b2f0ffb54
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-search-runtime.js
packages/providers/test/pdf-text-search-runtime.test.js
specs/004-local-pdf-core/pdf-text-search-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The module exports only `searchPdfPageTextWithLocalWasm`.

Its implementation mirrors the canonical selection lifecycle in a self-contained module
(`pdf-text-runtime.js` and `pdf-text-select-runtime.js` keep their pinned single-export
surfaces; zero canonical-file churn):

- destructured inputs `bytes`, `wasmBinary`, `initPdfium`, `pageIndex`, `query`,
  `maxMatches` with the same per-field fail-fast validation, plus `query` as a non-empty
  string with `1..0x7fffffff` UTF-16 units and `maxMatches` as a positive PDFium-int
  resource bound (`1..0x7fffffff`, rejected before any runtime effect);
- identical snapshots, runtime-owned initializer options with substitution detection, surface
  validation (extended with `FPDFText_FindStart`, `FPDFText_FindNext`,
  `FPDFText_GetSchCount`, `FPDFText_GetSchResultIndex`, `FPDFText_FindClose` only —
  no text, map-error, rect, char-box, or font surface), allocation guards, and
  document/page/text-page loading with character counting;
- query encoded UTF-16LE NUL-terminated into a malloced buffer with the same
  allocation-bounds guards and bounds-checked copy-in; allocation ownership is assigned
  immediately after positive-pointer validation so heap-extent failures run through the
  cleanup-protected path and the failed pointer is still freed;
- `FPDFText_FindStart(textPage, queryPointer, 0, 0)` handle validated as a positive safe
  integer (else fail-closed `search initialization failed`); FindNext-driven match loop
  bounded by `maxMatches` with strict boolean validation of every FindNext flag;
  per-match `FPDFText_GetSchCount` (safe integer `>= 1`, the current match length in
  chars) and 1-arg `FPDFText_GetSchResultIndex` (safe integer `>= 0`, with
  `index + length <= charCount` else fail-closed `out-of-range search match`);
  `matchesTruncated` is determined by exactly one extra FindNext after reaching the bound,
  so `matchCount` counts precisely the reported matches and truncation is explicit;
- `FPDFText_FindClose` ordered before text-page close with aggregated fail-closed errors,
  then the identical destroy/close/free (query buffer before input allocation)
  /destroy-library cleanup with aggregated fail-closed errors; caller-immutability
  post-checks;
- result envelope `{ openSucceeded, pageIndex, pageCount, charCount, queryLength,
  matchCount, matchesTruncated, matches }` where `matches` entries are frozen
  `{ index, length }`; malformed documents return `openSucceeded: false` with
  the PDFium last-error code, exactly like the extract/select/render paths.

## 3. Local-only boundary

The search source contains no reference to any of the forbidden surfaces asserted by its source test
(text/map-error/rect/char-box/font/bounded-text APIs, page bitmap rendering, package import,
`WebAssembly`, fetch/XHR/worker, `node:fs`/`node:path`, timers, network/URL/CDN tokens).
It performs no asset resolution, application packaging, or revision creation. Search is derived
`READ_ONLY` evidence with explicit truncation flags.

## 4. Focused search qualification

The focused suite ran under the exact canonical tool identity with the exact adopted package
exposed through an external `NODE_PATH`. No `node_modules` materialization is part of the candidate
repository diff.

```text
NODE_VERSION = v24.20.0
NODE_DARWIN_ARM64_EXECUTABLE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
FIXTURE = admission-seed-ordinary-minimal-v1
FIXTURE_SIGN = [{ index: 0, length: 4 }]
FIXTURE_THOS = [{ index: 4, length: 4 }]
FIXTURE_ZZZ = []
```

Focused coverage proves, at minimum:

```text
exact module surface and frozen exports (matches array and match objects frozen)
local-only raw-runtime boundary (single init call site, no text/rect/find-extra/char-box/font tokens)
all invalid input classes fail before initializer invocation (initCalls == 0)
ordinary-minimal page 0 Sign query: one exact match plus frozen envelope, deterministic
ordinary-minimal thos query: one exact match at index 4
ordinary-minimal ZZZ query: zero matches with frozen empty list
stub-surface proofs: truncation at maxMatches with exact kept prefix, full untruncated list,
failed search initialization, non-boolean find-next flag, invalid match length/index,
out-of-range match — all fail closed
allocation-bounds proofs: unsupported character count rejects before query-buffer malloc;
query-slot and input-allocation extent failures still free the failed pointer
(freed-pointer sequences asserted via stub hooks)
failed find close aggregates as a cleanup failure
find plus cleanup failures aggregate without loss (3-error chain asserted)
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
only the new search test file to the provider test command.

## 7. Explicit non-claims

```text
TEXT_CHARBOX_FONT_BOUNDEDTEXT_APIS = NOT_AUTHORIZED / NOT_IMPLEMENTED
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
SEARCH_SOURCE_SHA256 = de420aad601a8a5b26c889e4e45e8c732601fc3ed298530046de81cf75efa5da
SEARCH_TEST_SHA256 = 3b6b69640ed1b330ca4bf4c7402dc5b1566faa79d5ac2011a5940b047824d92d
PROVIDERS_PACKAGE_SHA256 = 6c91593dd933f05e2dd7daf701cd8e7669f591cb0ab7da58b729a7093db73a6b
```

The document's own bytes are bound externally: the candidate tree SHA in the PR body
and the merge-tree equality check cover this file byte-identically (a self-recorded
document hash could never match its own final bytes).

## 9. Merge and successor gates

This candidate is not canonical until all of the following hold on the exact final head:

1. the final diff contains only the four authorized paths;
2. exact Node qualification is rerun after the qualification document is complete;
3. source, test, and package hashes are recorded for the final bytes, with the document
   bound externally through the candidate tree SHA and merge-tree equality check;
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

No successor authority is inherited from this document. In particular, the search runtime does not
itself authorize char-box/font APIs, bridge/orchestrator/facade/provider wiring, metadata reads,
004D, Specification 005, release, deployment, or project completion.
