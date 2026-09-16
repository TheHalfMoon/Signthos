# PDF_THUMBNAIL_RENDER_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / THUMBNAIL_RENDER_V1_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7 after PR #267,
with a pre-implementation path correction to a self-contained module
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the remaining half of the plan 004C `render page/thumbnail` bullet. The
canonical page runtime renders at 1pt = 1px with no scaling path, so a thumbnail is a genuine new
grain: an aspect-preserving scaled render through PDFium into a caller-bounded bitmap. No
downscaling algorithm outside PDFium is introduced; no bridge, orchestrator, facade, or provider
wiring changes in this unit.

```text
UNIT = PDF_THUMBNAIL_RENDER_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = c8950a9e7c99eed82bf80a4a406aea17a6e2284c
CANONICAL_BASE_TREE = 1bfd26b880351724bc33a849f92ba82ab3c2ec07
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-render-thumbnail-runtime.js
packages/providers/test/pdf-render-thumbnail-runtime.test.js
specs/004-local-pdf-core/pdf-thumbnail-render-v1-local-wasm-runtime-implementation.md
```

A pre-implementation contract check found the existing runtime test pins the canonical page module
surface, so the thumbnail entry lives in a self-contained sibling module. Existing page-render
behavior is untouched by construction: zero canonical-file churn.

## 2. Implementation contract

The module exports only `renderPdfThumbnailWithLocalWasm`.

Its implementation mirrors the canonical page-render lifecycle with scaled dimensions:

- destructured inputs `bytes`, `wasmBinary`, `initPdfium`, `pageIndex`, `maxPixels`,
  `thumbMaxDimension` with the same per-field fail-fast validation, plus
  `thumbMaxDimension` as a positive safe integer;
- identical snapshots, runtime-owned initializer options with substitution detection, surface
  validation, allocation guards, document/page loading, and cleanup/fail-closed discipline
  (destroy/close/free/destroy-library ordering, source/WASM/runtime byte-equality post-checks,
  aggregated cleanup errors);
- thumbnail dimensions from the ceiled page size: scale to fit the longest side within
  `thumbMaxDimension`, each dimension floored with a minimum of 1, never exceeding the bound;
  `width * height > maxPixels` throws the canonical budget `RangeError`;
- bitmap creation and `FPDF_RenderPageBitmap` at thumbnail dimensions so PDFium itself scales the
  page; identical stride/buffer validation; pixel copy-out as caller-owned `Buffer`;
- result envelope bridge-compatible:
  `openSucceeded, pageIndex, pageCount, width, height, pixelFormat, bytesPerPixel, stride, pixels`
  with thumbnail dimensions; malformed documents return `openSucceeded: false` with the PDFium
  last-error code, exactly like the page path.

## 3. Local-only boundary

The thumbnail source contains no reference to any of the forbidden surfaces asserted by its
source test (package import, `WebAssembly`, fetch/XHR/worker, `node:fs`/`node:path`, timers,
network/URL/CDN tokens). It performs no asset resolution, application packaging, text/search work,
or revision creation. Thumbnails are derived `READ_ONLY` evidence.

## 4. Focused thumbnail qualification

The focused suite ran under the exact canonical tool identity with the exact adopted package
exposed through an external `NODE_PATH`. No `node_modules` materialization is part of the candidate
repository diff.

```text
NODE_VERSION = v24.20.0
NODE_DARWIN_ARM64_EXECUTABLE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
FIXTURE = admission-seed-ordinary-minimal-v1 (renders 200x200 full page)
THUMB_64_SHA256 = 1601c5e02b5d88a664e4abc3bfc250ae0dd357d23336ef3f70d408f6575c879c
```

Focused coverage proves, at minimum:

```text
exact module surface and frozen exports
local-only raw-runtime boundary (single init call site, no network/fs/worker tokens)
all invalid input classes fail before initializer invocation (initCalls == 0)
ordinary-minimal page 0 renders a deterministic 64x64 BGRA thumbnail (stride 256, pinned bytes)
bound at/above page size reproduces full page-render bytes exactly (cross-check vs page runtime)
pixel budget enforced before bitmap creation with the canonical budget error class
malformed document fails closed with openSucceeded false and a safe-integer error code
out-of-range page index rejects with RangeError and no partial output
caller bytes and WASM bytes unchanged across successful execution
pre-existing page-render suite still 9/9 green (untouched canonical file)
```

## 5. Real runtime execution (bounded)

Bounded real-package proofs with the ordinary-minimal fixture only (page 0), as authorized:

```text
FOCUSED_TESTS = 8
FOCUSED_PASS = 8
FOCUSED_FAIL = 0
WASM_INSTANTIATION_OBSERVED = YES (positive + fail-closed real-package paths)
NETWORK_ATTEMPTS_OBSERVED = NONE
```

No other valid-document execution occurs in this unit.

## 6. Provenance and legal surface

No dependency, lockfile, notice, or license surface changes in this unit. The manifest change appends
only the new thumbnail test file to the provider test command.

## 7. Explicit non-claims

```text
BRIDGE_ORCHESTRATOR_FACADE_PROVIDER_WIRING = NOT_AUTHORIZED / NOT_IMPLEMENTED
THUMBNAIL_DOWNSCALE_ALGORITHM_OUTSIDE_PDFIUM = NOT_AUTHORIZED / NOT_IMPLEMENTED
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
THUMB_SOURCE_SHA256 = cb5f0c01cf1473d6f8b92f57f9b1afd6cd3c31e352f08ec827aeb007ecf18efa
THUMB_TEST_SHA256 = cc09d7d4ee28bc6e9f26ca60cb30ac83d6af5f4bfee9a9451b61047f41836ea0
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

No successor authority is inherited from this document. In particular, the thumbnail runtime does
not itself authorize bridge/orchestrator/facade/provider wiring, text/search, 004D, Specification
005, release, deployment, or project completion.
