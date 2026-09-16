# PDF_RENDER_V1 Exact Package Supervised Semantic Facade Implementation

Status: `IMPLEMENTATION_CANDIDATE / EXACT_PACKAGE_SUPERVISED_SEMANTIC_FACADE_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7 after PR #265,
amended before implementation for one bounded positive real-package proof case
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit closes the last composition seam between the canonical supervised semantic
orchestrator and the canonical exact PDFium package runtime binding. Before this unit,
production source imported or composed both surfaces nowhere: the orchestrator required an
injected zero-argument `runRuntime`, and the exact package binding exposed
`renderPdfPageWithExactPdfiumPackage({ bytes, wasmBinary, pageIndex, maxPixels })`, with each
layer exercised only independently.

```text
UNIT = PDF_PAGE_RENDER_V1_EXACT_PACKAGE_SUPERVISED_SEMANTIC_FACADE_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = ca4789e902c15c958783a2f96744499cb406504a
CANONICAL_BASE_TREE = 3de822fff3517edaeaf5d35c9b62c147def93d6e
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-render-exact-package-facade.js
packages/providers/test/pdf-render-exact-package-facade.test.js
specs/004-local-pdf-core/pdf-render-v1-exact-package-supervised-semantic-facade-implementation.md
```

## 2. Implementation contract

The facade exports only `renderPdfPageWithExactPackageSupervisedSemantics(options)`.

Its implementation:

- imports only canonical `orchestratePdfRender()`, canonical
  `renderPdfPageWithExactPdfiumPackage()`, and the standard-library `node:util` helpers needed
  for safe boundary validation;
- accepts exactly caller-supplied `bytes`, `request`, `availability`, `runtimeBinding`,
  `wasmBinary`, `pageIndex`, `maxPixels`, `terminalControl`, and `terminateRuntime`;
- rejects proxy, accessor, and unknown top-level option surfaces without invoking caller getter
  code;
- requires a non-empty caller-owned `wasmBinary` byte view before any terminal subscription or
  runtime effect;
- passes the same extracted `bytes`, request, availability, runtime binding, terminal control,
  and termination function into the canonical orchestrator;
- supplies exactly one `runRuntime` closure that invokes the exact package binding with that same
  extracted `bytes` object and the same caller `wasmBinary`, `pageIndex`, and `maxPixels` values;
- never retries runtime, orchestration, termination, or semantic composition;
- preserves all canonical request, runtime-binding, provider, and result validation in predecessor
  layers rather than duplicating or weakening it (`pageIndex`/`maxPixels` value validation stays in
  the canonical binding and runtime; request/binding coherence stays in the orchestrator);
- snapshots caller WASM bytes before orchestration and fails closed if they change during
  completed-runtime or terminal supervision;
- if both orchestration and WASM-integrity failure occur, preserves both failures in an
  `AggregateError` rather than suppressing either;
- returns only the canonical semantic provider result produced by the canonical orchestrator.

## 3. WASM integrity seam

The canonical supervisor protects source PDF bytes, the runtime binding, and terminal controls
across runtime and terminal activity, but `wasmBinary` is not part of the supervisor contract,
and a synchronous terminal path can skip the raw runtime entirely. The facade therefore owns WASM
immutability directly:

- the non-empty byte-view check runs before terminal subscription, so invalid, missing, or empty
  WASM cannot cause any runtime effect;
- the snapshot is a private copy taken before orchestration begins;
- after orchestration settles (success or failure), the live caller view is compared byte-for-byte
  against the snapshot;
- a mismatch after successful orchestration throws a WASM-integrity error instead of returning the
  semantic result;
- a mismatch combined with an orchestration failure throws an `AggregateError` carrying both
  failures in order;
- an orchestration failure with intact WASM bytes propagates the original error object unchanged.

The facade never writes to caller PDF or WASM bytes. The exact package runtime already isolates the
bytes it hands to the PDFium initializer, so the post-orchestration comparison detects only genuine
caller-side or terminal-path mutation.

## 4. Terminal semantics

Terminal behavior is owned entirely by the canonical supervisor and orchestrator. The facade
forwards the caller terminal control and termination function unchanged and creates no terminal
control of its own. Synchronous qualified terminal signals therefore retain canonical behavior: the
exact package runtime never starts, the winning terminal path calls `terminateRuntime()` once, and
only qualified terminal evidence proceeds to semantic composition. The facade post-check still
applies on terminal paths, so terminal-callback or termination mutation of caller WASM fails closed
instead of returning terminal semantics.

## 5. Local-only boundary

The facade source contains no reference to any of:

```text
renderPdfPageWithLocalWasm
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
inspect / thumbnail / text extract / select / search
```

The facade performs no asset resolution, application WASM packaging, browser-worker integration,
network loading, inspection, text, or search capability. It creates no canonical PDF revision and
adds no retry, cache, or global runtime state.

## 6. Focused facade qualification

The focused facade suite ran under the exact canonical tool identity with the exact adopted package
exposed through an external `NODE_PATH`. No `node_modules` materialization is part of the candidate
repository diff.

```text
NODE_VERSION = v24.20.0
NODE_DARWIN_ARM64_EXECUTABLE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
PDFIUM_WASM_BYTES = 4633788
FIXTURE = admission-seed-ordinary-minimal-v1
FIXTURE_SHA256 = d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207
```

Focused coverage proves, at minimum:

```text
exact top-level field surface and unsafe accessor/proxy rejection without getter invocation
invalid/missing/empty WASM fails before terminal subscription or runtime start
ordinary-minimal real-package execution returns canonical semantic success with one page
single runRuntime closure over the same caller bytes, wasm, page, and budget inputs
caller PDF and WASM bytes unchanged on successful execution
synchronous terminal-first paths preserve terminal semantics without runtime completion
terminal-path and post-completion WASM mutation fails closed, with dual-failure aggregation
canonical malformed-document, unavailable, and invalid-request semantics unchanged
```

## 7. Real runtime execution (bounded positive proof)

Unlike the binding unit, this unit permits exactly one bounded positive real-package render proof
(the ordinary-minimal fixture, page 0, real exact WASM), plus the fail-closed real-package paths
(malformed content, post-completion disposer mutation). Real PDFium WASM instantiation is therefore
observed on the executing paths and honestly recorded here:

```text
FOCUSED_TESTS = 21
FOCUSED_PASS = 21
FOCUSED_FAIL = 0
WASM_INSTANTIATION_OBSERVED = YES (positive and fail-closed real-package paths only)
NETWORK_ATTEMPTS_OBSERVED = NONE
POSITIVE_VALID_RENDER = PROVEN (single bounded ordinary-minimal case, page 0)
BROADER_RENDER_TEXT_SEARCH = NOT_AUTHORIZED / NOT_EXECUTED
```

No other valid-document execution occurs in this unit.

## 8. Provenance and legal surface

No dependency, lockfile, notice, or license surface changes in this unit. The exact adopted package
`@embedpdf/pdfium@2.15.0` and its frozen legal evidence are inherited unchanged from canonical
predecessors; the test resolves the package through an external pre-existing `NODE_PATH` copy for
resolution only, with no acquisition, no package-manager action, and no network. The manifest change
appends only the new facade test file to the provider test command.

## 9. Explicit non-claims

```text
ASSET_PATH_RESOLVER = NOT_AUTHORIZED / NOT_IMPLEMENTED
APPLICATION_WASM_PACKAGING = NOT_AUTHORIZED / NOT_IMPLEMENTED
WORKER_OR_BROWSER_INTEGRATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
FONT_FALLBACK_CONFIGURATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
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

## 10. Candidate file hashes (final bytes)

Recorded after final exact-Node qualification rerun, before review:

```text
FACADE_SOURCE_SHA256 = fd227f1505865f48609695d6eeafaa09e81b010486f7874800b10945486b7edb
FACADE_TEST_SHA256 = cf2135822276fa9a8bf51451d50a29758ee9e9840ed1bd3d5463e3a691b0a48e
```

## 11. Merge and successor gates

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

No successor authority is inherited from this document. In particular, successful facade composition
does not itself authorize asset resolution, application packaging, browser-worker integration,
thumbnail/text/search, 004D, Specification 005, release, deployment, or project completion.
