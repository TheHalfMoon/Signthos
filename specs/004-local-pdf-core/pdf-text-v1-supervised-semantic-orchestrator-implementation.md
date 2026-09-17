# PDF_TEXT_V1 Supervised Semantic Orchestrator Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / FAKE_CONTROL_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5712294334`

## 1. Purpose

This bounded unit implements the source-level orchestrator needed to drive one
supervised text execution end to end: validate the orchestration envelope,
verify cross-layer request/runtime-binding identity, supervise the supplied
runtime exactly once, re-verify identity after supervision, and delegate final
composition to the canonical `composeSupervisedPdfTextResult` bridge.

It does not execute PDFium, WASM, a browser, a worker, a real timer, a resource
meter, or any document-processing network path. Qualification uses deterministic
injected runtimes and the ordinary-minimal admission fixture bytes only.

Canonical base:

```text
commit = dc022df4808f991039acbc8c1a7762e8c2b2c83a
```

## 2. Authorized repository surface

Exactly these paths are authorized by this unit:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-orchestrator.js
packages/providers/test/pdf-text-orchestrator.test.js
specs/004-local-pdf-core/pdf-text-v1-supervised-semantic-orchestrator-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new orchestrator test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 3. Canonical predecessors

This implementation consumes without weakening:

- the canonical Specification 004 read-only/local-only provider contract;
- the canonical `PDF_TEXT_V1` runtime supervisor `supervisePdfTextRuntime`
  (unchanged);
- the canonical `PDF_TEXT_V1` supervised-result semantic bridge
  `composeSupervisedPdfTextResult` (unchanged);
- the canonical `PDF_TEXT_V1` semantic provider composer (unchanged);
- the canonical `PDF_RENDER_V1` supervised semantic orchestrator
  `orchestratePdfRender` (mirrored envelope/identity/supervision discipline).

The supervisor already knows how to produce deterministic completion versus
confirmed termination envelopes. The bridge already knows how to convert a
supervised envelope into a composed provider result. Before this unit there was
no source component driving supervisor-plus-bridge execution for text. The
provider, the supervisor, the bridge, and the raw runtime core are unchanged by
this unit.

## 4. Separation of responsibilities

This orchestrator does not import or call the real text runtime core. Its
`runRuntime` is an injected function supervised exactly once by
`supervisePdfTextRuntime`. Its only composition call is
`composeSupervisedPdfTextResult` via the supervised result. Cross-layer
`request`/`runtimeBinding` identity (provider id, capability version, byte
length, budget ref, exact bytes digest) is verified before runtime effects and
re-verified after supervision, so mutations during runtime or termination fail
closed before semantic composition.

## 5. Exact input and identity validation

`orchestratePdfText()` accepts exactly the seven own-data keys `bytes`,
`request`, `availability`, `runtimeBinding`, `runRuntime`, `terminalControl`,
and `terminateRuntime`. Bytes must be a `Buffer` at the orchestrator boundary;
`runRuntime` and `terminateRuntime` must be functions. `request` and
`runtimeBinding` must be safe own-data objects whose provider id, capability
version, byte length, budget ref, and exact `{ algorithm, value }` digest agree,
or no runtime effect occurs.

## 6. Local-only boundary

The orchestrator source imports only `./pdf-text-runtime-supervisor` and
`./pdf-text-runtime-bridge`, and contains no reference to any of:

```text
require('./pdf-text-runtime') exact runtime-core import
extractPdfPageTextWithLocalWasm call
@embedpdf/pdfium code import
PDFiumExt_Init / FPDF_ (covers all FPDFText_ execution surface)
WebAssembly
fetch(...) / XMLHttpRequest
Worker( / importScripts
child_process
setTimeout( / setInterval(
http:// / https://
```

## 7. Focused qualification

The focused orchestrator suite ran under the exact canonical Node identity with
deterministic injected runtimes and fixture bytes only.

```text
NODE_VERSION = v22.22.3 (canonical v24.20.0 unavailable on this machine; counts recorded first-hand)
FOCUSED_TESTS = 22
FOCUSED_PASS = 22
FOCUSED_FAIL = 0
```

Focused coverage proves, at minimum:

```text
completed runtime is supervised once and composed into canonical success
qualified format rejection maps to malformed-document semantics
each synchronous terminal prevents runtime start and composes terminal semantics
runtime rejection propagates unchanged without substitution
malformed completion fails in supervision before composition
termination rejection propagates without retry
disposer rejection propagates after completion before composition
provider-owned request defect is handled after supervision
binding mismatch fails before runRuntime is invoked
non-Buffer bytes are rejected before subscribe or runtime start
proxy/accessor/symbol/extra-key/custom-prototype options fail before effects
null-prototype options remain accepted
caller bytes/request/binding/controls are not mutated or frozen
source keeps the supervisor-plus-bridge-only import boundary
every identity field mismatch fails before effects
unsafe request/binding containers fail before effects
unsafe nested digest shapes fail before effects
during-runtime request mutations are rejected after supervision
during-termination request mutation is rejected after supervision
```

## 8. Complete applicable provider qualification

The complete canonical provider suite, including the new orchestrator test file
as a separately expanded argument, passed under the exact Node executable with
the exact adopted package exposed through an external `NODE_PATH`. No
`node_modules` materialization is part of the candidate repository diff.

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 536
PASS = 536
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 9. Candidate file identities

```text
TEXT_ORCHESTRATOR_SOURCE_SHA256 = f76c352f1062744aa0a17652ca970c7423e510c6fd5c4dfe90d6206a54f3e312
TEXT_ORCHESTRATOR_TEST_SHA256 = 096dce48ea3fefd2cef2cae7719a4fe380789ab11569555c6efdb47b626e75d2
PROVIDERS_PACKAGE_JSON_SHA256 = e65f08118aec1b167b1a03bfb069805438321c35a22f17baa2f18d3e6049b4ff
```

The package-manifest change only appends `test/pdf-text-orchestrator.test.js`
to the existing provider test command. It changes no dependency declaration.

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 10. Exact qualification claim

This candidate proves only that a bounded orchestrator drives one injected
text-supervisor execution with pre/post cross-layer identity verification and
faithful bridge delegation under exact envelope and fail-closed attack-surface
validation.

It does not prove real runtime execution, provider wiring, worker integration,
binding/facade composition, search/select/metadata correctness, or
native/server parity.

## 11. Explicit non-grants

```text
TEXT_BINDING = NOT_AUTHORIZED
TEXT_FACADE = NOT_AUTHORIZED
TEXT_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SUPERVISOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_BRIDGE_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
REAL_RUNTIME_EXECUTION = NOT_AUTHORIZED / NOT_IMPLEMENTED
BROWSER_WORKER_INTEGRATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
PDF_TEXT_SELECT_V1_ORCHESTRATOR = NOT_AUTHORIZED
PDF_TEXT_SEARCH_V1_ORCHESTRATOR = NOT_AUTHORIZED
PDF_METADATA_V1_ORCHESTRATOR = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 12. Merge and successor gates

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
