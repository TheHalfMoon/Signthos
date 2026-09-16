# PDF_RENDER_V1 Exact PDFium Package Runtime Binding Implementation

Status: `IMPLEMENTATION_CANDIDATE / EXACT_PACKAGE_BINDING_QUALIFIED / NO_REAL_RUNTIME_EXECUTION`
Issue: #7
Authority: `github:issue-comment:5693442791`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit closes only the package-to-raw-runtime seam left after the canonical
`PDF_PAGE_RENDER_V1_SUPERVISED_SEMANTIC_ORCHESTRATOR_IMPLEMENTATION` closeout.
It binds the already-adopted exact `@embedpdf/pdfium@2.15.0` CommonJS `init`
export to the canonical `renderPdfPageWithLocalWasm()` raw runtime while keeping
PDF bytes, WASM bytes, page index, and pixel budget caller/application supplied.

```text
UNIT = PDF_PAGE_RENDER_V1_EXACT_PDFIUM_PACKAGE_RUNTIME_BINDING_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = c5303263c93cea2b6dfe31939cb1322d7bc23b8d
CANONICAL_BASE_TREE = 0ec32b038b844974e28b0e58bb33b8b8d205cff3
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-render-runtime-binding.js
packages/providers/test/pdf-render-runtime-binding.test.js
specs/004-local-pdf-core/pdf-render-v1-exact-pdfium-package-runtime-binding-implementation.md
```

## 2. Implementation contract

The binding exports only `renderPdfPageWithExactPdfiumPackage(options)`.

Its implementation:

- imports `init` from `@embedpdf/pdfium`;
- imports the canonical `renderPdfPageWithLocalWasm()` raw runtime;
- rejects malformed, proxy, accessor-bearing, extra-key, missing-key,
  symbol-keyed, and custom-prototype option envelopes with a deterministic
  `TypeError` before any runtime effect;
- forwards caller/application-supplied `bytes`, `wasmBinary`, `pageIndex`,
  and `maxPixels` unchanged as call arguments;
- injects the exact package `init` function into the canonical raw runtime;
- delegates byte validation, private runtime WASM isolation, PDFium surface
  validation, allocation, document/page/bitmap lifetime, cleanup, stride and
  pixel-budget enforcement, and mutation detection to the canonical runtime.

The binding does not resolve an asset path, read a WASM file, accept a URL,
create a URL, invoke a worker, configure font fallback, perform page render
itself, or implement any PDF semantic mapping. Request/runtime-binding
identity, terminal fail-closed semantics, caller-owned bytes/control
immutability, and no-partial-output publication are preserved by pure
delegation: the binding never observes, mutates, or republishes orchestrator,
supervisor, or bridge state.

## 3. Local-only boundary

The source contains no reference to any of:

```text
DEFAULT_PDFIUM_WASM_URL
fetch(...)
XMLHttpRequest
http://
https://
node:fs
node:path
Worker
CDN
pdfium.wasm asset resolution
```

The upstream package's exported CDN convenience URL is therefore not part of
this Signthos binding path.

## 4. Exact package and toolchain identities

Qualification performed no dependency acquisition, no package-manager action,
no lockfile mutation, and no network fetch. The exact adopted package was
resolved through a pre-existing external `NODE_PATH` copy; no `node_modules`
materialization is part of the candidate repository diff.

```text
NODE_VERSION = v22.22.3
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_PACKAGE_DEPENDENCIES = undefined
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
PDFIUM_WASM_BYTES = 4633788
LOCKFILE_PIN = pnpm-lock.yaml `@embedpdf/pdfium@2.15.0` resolution integrity sha512-KgpRND2MYcdbhzb2EMb4WzWcJYrR0A6JXvhMv4WthEHKt6qmNo2v/MC68bpYvpveYT9GNnUnY/+TG5MpXY3pRw==
```

The WASM identity above was reverified from the external copy during this
qualification and matches the canonical frozen qualification value. Frozen
provenance and legal evidence under `provenance/components/pdfium-2.15.0/`
were not mutated.

## 5. No real runtime execution

`REAL_RUNTIME_EXECUTION` is explicitly forbidden by the unit authority, so no
test path invokes the exact-package initializer or instantiates PDFium WASM.

Construction evidence that every exercised path rejects before runtime effects:

- the binding envelope check precedes the single downstream call site;
- the canonical runtime validates `bytes`, `wasmBinary`, `initPdfium`,
  `pageIndex`, and `maxPixels` before its single `await initPdfium(...)`
  call site;
- every behavioral test supplies at least one invalid envelope or field, so
  rejection deterministically precedes initializer invocation;
- the focused suite completes in milliseconds with no WASM instantiation,
  compile, abort, or instantiate output.

A fully valid envelope is therefore intentionally never exercised in this
unit; positive real-render execution belongs to a future authorized unit.

## 6. Focused binding qualification

The focused binding suite passed on the exact candidate tree using the
external exact-package resolution described above.

```text
FOCUSED_TESTS = 7
FOCUSED_PASS = 7
FOCUSED_FAIL = 0
WASM_INSTANTIATION_OBSERVED = NONE
NETWORK_ATTEMPTS_OBSERVED = NONE
```

Coverage:

- module exposes only `renderPdfPageWithExactPdfiumPackage` and is frozen;
- source keeps the exact-package/local-only boundary of section 3;
- exact adopted package and local WASM identities match section 4;
- malformed envelopes (null, primitives, arrays, Buffers, proxies,
  custom-prototype objects) fail with the deterministic binding `TypeError`;
- accessor-bearing, extra-key, missing-key, and symbol-keyed envelopes fail
  with the deterministic binding `TypeError`;
- empty source/WASM views fail through canonical raw-runtime validation with
  deterministic field messages, and caller bytes are unchanged afterwards;
- out-of-range page indexes and pixel budgets fail through canonical
  raw-runtime validation with deterministic field messages.

## 7. Complete applicable provider qualification

The complete provider suite was attempted without dependency acquisition and
without external package resolution, exactly as the predecessor orchestrator
unit prescribes for missing local dependencies.

```text
TOTAL_TESTS = 275
PASS = 270
FAIL = 5
CANCELLED = 0
SKIPPED = 0
TODO = 0
```

All 5 failures are `MODULE_NOT_FOUND` for `@embedpdf/pdfium` at test-file
load in the five files that hard-require the exact package
(`pdf-inspect-exact-package-facade`, `pdf-inspect-runtime-binding`,
`pdf-inspect-wasm-asset`, `pdf-render-runtime`, `pdf-render-runtime-binding`).
Four of these are pre-existing environmental failures; the fifth is this
unit's own binding test failing for the same environmental cause. No failure
is a behavioral regression: this candidate modifies no existing source file,
and all 270 package-independent tests pass.

```text
GIT_DIFF_CHECK = PASS
```

## 8. Candidate file identities

Before this qualification document was added, the three
implementation/test/manifest surfaces had these exact identities:

```text
RUNTIME_BINDING_SHA256 = 88dc6aa77c8b81226d59a59338959d1cd75d583ae81b407336005a77b9dc66dc
RUNTIME_BINDING_TEST_SHA256 = e346dbf22e1c0a57eae3f67856264a4c416c3cad420539d321d2d7a150aa8c43
PROVIDERS_PACKAGE_JSON_SHA256 = 62738143bef7f2d771383d16f465792c0909d9cdc5019ad17f1ca7d9cdc63
CANONICAL_RAW_RUNTIME_SHA256 = UNCHANGED_FROM_CANONICAL_MAIN
```

The package-manifest change only appends
`test/pdf-render-runtime-binding.test.js` to the existing provider test
command. It changes no dependency declaration.

## 9. Exact qualification claim

This candidate proves only that the exact adopted `@embedpdf/pdfium@2.15.0`
package initializer is bound directly to the canonical Signthos
`PDF_RENDER_V1` raw runtime behind a strict own-data envelope that rejects
malformed, proxy, accessor-bearing, extra-key, and custom-prototype inputs
before runtime effects, while preserving deterministic error classification
and the local-only boundary.

It does not prove real render execution, render pixel determinism, terminal
supervision behavior, orchestrator composition, browser-worker asset
packaging, font fallback behavior, corpus-wide compatibility, or
native/server parity.

## 10. Explicit non-grants

```text
REAL_RUNTIME_EXECUTION = NOT_AUTHORIZED / NOT_EXECUTED
ASSET_PATH_RESOLVER = NOT_AUTHORIZED / NOT_IMPLEMENTED
APPLICATION_WASM_PACKAGING = NOT_AUTHORIZED / NOT_IMPLEMENTED
DEFAULT_PDFIUM_WASM_URL = NOT_USED
CDN_RUNTIME_FETCH = NOT_AUTHORIZED / NOT_USED
NETWORK_FETCH = NOT_AUTHORIZED / NOT_USED
FONT_FALLBACK_CONFIGURATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
WORKER_OR_BROWSER_INTEGRATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
SUPERVISED_SEMANTIC_FACADE = NOT_AUTHORIZED / NOT_IMPLEMENTED
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

## 11. Merge and successor gates

This candidate is not canonical until all of the following hold on the exact
final head:

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

No successor authority is inherited from this document. In particular,
successful package binding does not itself authorize real execution,
orchestrator/facade composition, browser-worker asset loading, 004D,
Specification 005, release, deployment, or project completion.

The final document SHA-256 is recorded in external GitHub qualification
evidence after the file is complete; the document does not contain a
self-referential digest.
