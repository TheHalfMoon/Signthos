# PDF_RENDER_V1 Runtime Supervisor Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / FAKE_CONTROL_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5676579851`

## 1. Purpose

This bounded unit implements the source-level supervisor needed to convert an
injected render-runtime execution into either deterministic completion carrying the
raw render observation, or independently confirmed runtime termination carrying
qualified `signthos.pdf.render.runtime-terminal.v1` evidence.

It does not execute PDFium, WASM, a browser, a worker, a real timer, a resource
meter, or any document-processing network path. Qualification uses deterministic
injected fake executors and terminal controls only.

Canonical base:

```text
commit = ebf9e385c007332f7d055377ed23e8fcca048768
tree = 980f3aaa8c1fd8808c394304a3c0b60fef968c4a
```

## 2. Authorized repository surface

Exactly these paths are authorized by this unit:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-render-runtime-supervisor.js
packages/providers/test/pdf-render-runtime-supervisor.test.js
specs/004-local-pdf-core/pdf-render-v1-runtime-supervisor-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new supervisor test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 3. Canonical predecessors

This implementation consumes without weakening:

- the canonical Specification 004 read-only/local-only provider contract;
- the canonical `PDF_RENDER_V1` browser semantic provider implementation;
- the canonical `signthos.pdf.render.runtime-terminal.v1` semantic qualification;
- the canonical local-WASM raw render runtime core;
- the canonical exact-byte identity implementation;
- the canonical `PDF_INSPECT_V1` runtime-terminal supervisor (mirrored control,
  race, disposal, mutation-detection, and combined-failure discipline).

The semantic provider already knows how to validate and publish qualified terminal
outcomes and raw render observations. The raw render core already knows how to
execute an injected PDFium lifecycle and return only raw observations. Before this
unit there was no source component that supervised deterministic render completion
versus cancellation, timeout, or resource-limit termination. The provider and the
raw runtime core are unchanged by this unit.

## 4. Separation of responsibilities

This supervisor does not import or call the real render runtime core. Its runtime is
an injected asynchronous `runRuntime` function.

This supervisor also does not call the semantic provider. A later separately
authorized bridge may consume either:

```text
RUNTIME_COMPLETED -> rawObservation
RUNTIME_TERMINAL -> terminalOutcomeEvidence
```

The present unit only establishes the deterministic supervision boundary.

## 5. Exact input and runtime binding

`supervisePdfRenderRuntime()` accepts non-empty `Uint8Array`-compatible bytes and an
exact runtime binding containing only:

```text
providerId
providerCapabilityVersion
inputExactBytesDigest
byteLength
resourceBudgetRef
```

The binding must match:

```text
providerId = signthos.pdf.browser.embedpdf-v2.15.0-pdfium
providerCapabilityVersion = signthos.pdf.render.v1
inputExactBytesDigest = canonical SHA-256 of the exact supplied byte view
byteLength = exact supplied byte-view length
resourceBudgetRef = non-empty opaque string
```

Invalid bytes, a non-function runtime, a non-function terminator, or an unqualified
binding throws before any executor invocation or terminal registration.

## 6. Raw render observation validation

A completed runtime value must be a strict plain observation. Success requires
exactly:

```text
openSucceeded = true
pageIndex (non-negative safe integer)
pageCount (non-negative safe integer)
width (safe integer >= 1)
height (safe integer >= 1)
pixelFormat = BGRA
bytesPerPixel = 4
stride (safe integer >= 1)
pixels (non-empty byte view)
```

Pixel emptiness is enforced through the intrinsic `%TypedArray%` byte-length getter
so evidence length shadows can never affect the check. Pixel-budget and
stride/height coherence adjudication remain owned by the semantic provider; the
supervisor passes the pixel view through opaquely by reference.

Rejection requires exactly:

```text
openSucceeded = false
pdfiumLastError = 3
```

The code `3` is the exact qualified PDFium format error. Any other completion shape
throws a `TypeError` and never produces an envelope.

## 7. Terminal supervision

The terminal control must contain only an own `subscribe` function returning a
disposer function. Terminal events must contain only a qualified `terminalOutcome`
(`CANCELLED | TIMED_OUT | RESOURCE_LIMIT_EXCEEDED`).

Runtime completion races terminal signals deterministically:

- a synchronous terminal signal prevents executor invocation;
- the first terminal signal wins; later signals are ignored;
- a late runtime settlement after a terminal result is consumed without unhandled
  rejection;
- terminal victory awaits `terminateRuntime({ terminalOutcome })` confirmation
  carrying a non-empty `runtimeEvidenceRef` with `partialOutputDiscarded = true`,
  then emits a frozen `RUNTIME_TERMINAL` envelope with qualified terminal evidence
  built from the validated binding;
- executor failure propagates unchanged and is never guessed into terminal
  evidence;
- the terminal subscription is disposed exactly once on every path, and disposal
  failure combines with (never masks) a primary failure.

## 8. Mutation detection and cleanup

After settlement the supervisor verifies that the source bytes, the runtime
binding, and the terminal control still match their pre-execution snapshots, and
combines any mismatch into the failure. A missing output is itself a failure. The
supervisor mutates neither the input bytes nor the injected objects beyond invoking
the injected functions.

## 9. Local-only boundary

The supervisor source contains no reference to any of:

```text
@embedpdf/pdfium code import
pdf-render-runtime import
composePdfRenderResult call
WebAssembly
DEFAULT_PDFIUM_WASM_URL
fetch(...) / XMLHttpRequest
Worker( / importScripts
child_process
http:// / https://
PDFiumExt_Init / FPDF_
setTimeout( / setInterval(
```

## 10. Focused qualification

The focused supervisor suite ran under the exact canonical Node identity with
deterministic injected fakes only.

```text
NODE_VERSION = v24.20.0
FOCUSED_TESTS = 25
FOCUSED_PASS = 25
FOCUSED_FAIL = 0
```

Focused coverage proves, at minimum:

```text
runtime completion returns a frozen render observation envelope without termination
rejected raw observations pass through raw and frozen
each terminal outcome produces exact terminal evidence after confirmed termination
terminal events are snapshotted before emitter mutation
first signal wins with exactly one termination
synchronous signals prevent executor invocation
late settlements cause no unhandled rejection
termination/confirmation defects fail closed with disposal
executor failure propagates without terminal fabrication
malformed raw render observations fail closed
invalid bindings fail before executor or terminal registration
hostile bindings fail closed without getter/trap execution
null-prototype bindings are accepted
source/binding/control mutation is detected after cleanup
disposal failures combine with primary failures
invalid terminal events skip termination
inputs are not mutated by successful supervision
module exposes only the bounded supervision surface
source keeps the no-execution boundary
```

## 11. Complete applicable provider qualification

The complete canonical provider suite, including the new supervisor test file as a
separately expanded argument, passed under the exact Node executable with the exact
adopted package exposed through an external `NODE_PATH`. No `node_modules`
materialization is part of the candidate repository diff.

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 273
PASS = 273
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 12. Candidate file identities

```text
RENDER_SUPERVISOR_SOURCE_SHA256 = 0ba4e7d9de3ceee274f3e285189376a540af7f354e467260011ff07d6977778c
RENDER_SUPERVISOR_TEST_SHA256 = 734685e243efda56964911dfc596fa1a769c20f8f259436435300f2ff601f154
PROVIDERS_PACKAGE_JSON_SHA256 = 2f5d20496c7e020685592ddc16c8a8f53504d6a33cd7382c180565fcda1eb3e2
```

The package-manifest change only appends `test/pdf-render-runtime-supervisor.test.js`
to the existing provider test command. It changes no dependency declaration.

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 13. Exact qualification claim

This candidate proves only that a bounded supervisor converts an injected
render-runtime execution into deterministic completion versus independently
confirmed termination envelopes under exact binding, strict observation-shape,
disposal, mutation-detection, and combined-failure behavior.

It does not prove real runtime execution, timeout/cancellation enforcement,
bridge composition, provider wiring, worker integration, thumbnail/text/search
correctness, or native/server parity.

## 14. Explicit non-grants

```text
RENDER_BRIDGE = NOT_AUTHORIZED / NOT_IMPLEMENTED
RENDER_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
RENDER_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
REAL_RUNTIME_EXECUTION = NOT_AUTHORIZED / NOT_IMPLEMENTED
BROWSER_WORKER_INTEGRATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
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

## 15. Merge and successor gates

This candidate is not canonical until all of the following hold on the exact final
head:

1. the final diff contains only the four authorized paths;
2. exact Node qualification is rerun after the qualification document is complete;
3. source/test/package/document hashes are recorded for the final bytes;
4. `git diff --check` is clean;
5. repository status is byte-identical before and after final qualification;
6. a fresh independent substantive exact-head review reports no material findings;
7. all material review threads are resolved;
8. live `main`, candidate head/tree, changed paths, open-PR set, and applicable
   status truth are reverified immediately before merge;
9. merge uses normal merge with exact expected head SHA and no history rewriting;
10. post-merge tree, ordered parents, signature, changed surface, PR state, and
    open-PR state are mechanically verified;
11. Issue #7 receives canonical closeout;
12. a fresh successor reconciliation determines the next minimum
    dependency-ordered unit.

No successor authority is inherited from this document.
