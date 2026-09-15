# PDF_INSPECT_V1 Runtime-Terminal Supervisor Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / FAKE_CONTROL_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5672586986`
Validation failure record: `github:issue-comment:5672620350`
Final validation record: `github:issue-comment:5672640334`

## 1. Purpose

This bounded unit implements the source-level supervisor needed to convert independently confirmed runtime termination into the already-qualified `PDF_INSPECT_V1` runtime-terminal evidence schema.

It does not execute PDFium, WASM, a browser, a worker, a real timer, a resource meter, or any document-processing network path. Qualification uses deterministic injected fake executors and terminal controls only.

Canonical base:

```text
commit = 10538c3c0459606fdd89b8c92cce0e017682a86f
tree = de51913dc60d1c74ed12bc44e159ab4d5eaadc95
```

## 2. Authorized repository surface

Exactly these paths are authorized by this unit:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-inspect-runtime-supervisor.js
packages/providers/test/pdf-inspect-runtime-supervisor.test.js
specs/004-local-pdf-core/pdf-inspect-v1-runtime-terminal-supervisor-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append the new supervisor test file. No dependency declaration, workspace, lockfile, fixture, provenance, workflow, container, browser asset, or runtime binary is changed.

## 3. Canonical predecessors

This implementation consumes without weakening:

- the canonical Specification 004 read-only/local-only provider contract;
- the canonical `PDF_INSPECT_V1` browser semantic provider implementation;
- the canonical `signthos.pdf.inspect.runtime-terminal.v1` semantic qualification;
- the canonical local-WASM raw inspection runtime core;
- the canonical exact-byte identity implementation.

The semantic layer already knows how to validate and publish qualified terminal outcomes. The raw runtime core already knows how to execute an injected PDFium lifecycle and return only raw open/page-count/last-error observations. Before this unit there was no source component that supervised deterministic runtime completion versus cancellation, timeout, or resource-limit termination and produced the qualified terminal-evidence shape only after confirmed termination.

## 4. Separation of responsibilities

This supervisor does not import or call the real runtime core. Its runtime is an injected asynchronous `runRuntime` function.

This supervisor also does not call the semantic provider. A later separately authorized bridge may consume either:

```text
RUNTIME_COMPLETED -> rawObservation
RUNTIME_TERMINAL -> terminalOutcomeEvidence
```

The present unit only establishes the deterministic supervision boundary.

## 5. Exact input and runtime binding

`supervisePdfInspectRuntime()` accepts non-empty `Uint8Array`-compatible bytes and an exact runtime binding containing only:

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
providerCapabilityVersion = signthos.pdf.inspect.v1
inputExactBytesDigest = canonical SHA-256 of the exact supplied byte view
byteLength = exact supplied byte-view length
resourceBudgetRef = non-empty opaque string
```

The digest is computed through the canonical `exactByteIdentity()` implementation over a Buffer view of the exact visible byte range. No path, URL, filename, media type, cache key, provider-private handle, or mutable alias can substitute for the exact digest/length binding.

The binding object and nested digest must be strict plain or null-prototype own-data objects. Custom prototypes, inherited fields, accessors, symbol keys, proxies, missing keys, or extra keys fail closed before executor invocation or terminal-control registration.

## 6. Deterministic terminal-control interface

Qualification uses an injected terminal control exposing exactly one own data function:

```text
subscribe(callback) -> disposer
```

No real timer, browser signal, worker, OS signal, or resource meter is created by this implementation.

The callback accepts an exact terminal event containing only:

```text
terminalOutcome = CANCELLED | TIMED_OUT | RESOURCE_LIMIT_EXCEEDED
```

The event is validated and reduced to the terminal-outcome scalar synchronously inside the subscription callback. The caller cannot alter the winning outcome by mutating the event object after emission.

If a terminal event is delivered synchronously during registration, the runtime executor is not invoked.

Only the first terminal event is accepted. Later terminal events are ignored by the already-settled control boundary.

## 7. Runtime completion path

When runtime completion wins before a terminal signal, the supervisor accepts only one of the canonical raw observation shapes:

```text
{ openSucceeded: true, pageCount: nonnegative safe integer }
```

or:

```text
{ openSucceeded: false, pdfiumLastError: nonnegative safe integer }
```

The object must be strict plain/null-prototype own-data input with exactly the required keys. The supervisor creates a new frozen raw-observation copy and returns:

```text
{
  kind: RUNTIME_COMPLETED,
  rawObservation
}
```

It does not convert the observation into structural evidence, admission evidence, or semantic provider success/failure.

## 8. Terminal path and confirmed termination

A winning qualified terminal event never directly becomes published terminal evidence.

The supervisor first invokes the injected function exactly once:

```text
terminateRuntime({ terminalOutcome })
```

The request object is newly created and frozen.

Terminal evidence is published only after `terminateRuntime` resolves with the exact confirmation shape:

```text
{
  runtimeEvidenceRef: non-empty string,
  partialOutputDiscarded: true
}
```

Malformed confirmation, termination rejection, or `partialOutputDiscarded != true` fails closed and publishes no terminal evidence.

The implementation treats `runtimeEvidenceRef` as an opaque caller-controlled evidence reference. It validates only non-empty string shape and does not generate document content, a URL, path, provider-private handle, or secret into that value.

## 9. Qualified terminal evidence

Confirmed terminal outcomes produce only the already-qualified semantic evidence schema:

```text
schema = signthos.pdf.inspect.runtime-terminal.v1
terminalOutcome = CANCELLED | TIMED_OUT | RESOURCE_LIMIT_EXCEEDED
providerId = signthos.pdf.browser.embedpdf-v2.15.0-pdfium
providerCapabilityVersion = signthos.pdf.inspect.v1
inputExactBytesDigest = exact input SHA-256
byteLength = exact input byte length
resourceBudgetRef = exact runtime binding value
runtimeEvidenceRef = exact confirmed opaque reference
partialOutputDiscarded = true
```

The supervisor returns a newly created frozen envelope:

```text
{
  kind: RUNTIME_TERMINAL,
  terminalOutcomeEvidence
}
```

The evidence object and nested digest are frozen.

## 10. Late runtime and race behavior

Runtime execution is represented internally as a promise that is converted into a resolved completion/failure event. This attaches an explicit rejection handler before the race is awaited.

Therefore, after a confirmed terminal winner:

- later runtime resolution cannot replace the terminal result;
- later runtime rejection is consumed by the already-installed rejection handler and does not become an unhandled rejection;
- multiple terminal signals cannot invoke termination more than once;
- the terminal outcome remains the first qualified event accepted by the supervisor.

A synchronous terminal signal delivered during registration prevents executor invocation entirely.

## 11. Cleanup boundary

The injected terminal subscription disposer is invoked exactly once after the winner path has been processed.

Disposal failure fails closed. If a primary runtime/supervision failure and disposal failure both exist, the implementation preserves both through `AggregateError` rather than suppressing either failure.

No successful runtime or terminal envelope is returned when cleanup fails.

## 12. Mutation detection

The implementation snapshots exact input bytes before terminal registration/runtime execution and verifies them after the winner path.

The supervisor independently verifies that the original runtime binding still equals its normalized pre-run binding. This post-check deliberately does not recompute the binding against possibly mutated source bytes; source-byte mutation and caller-binding mutation are independent failure dimensions.

The terminal-control `subscribe` function identity and exact control shape are also rechecked after execution.

Caller-provided raw runtime observations are copied rather than frozen or mutated in place.

## 13. Strict object safety

Binding, nested digest, raw observation, terminal event, terminal control, and termination confirmation validation uses own-property descriptors and rejects proxies before prototype/key traversal.

Accessors are rejected as non-data fields without executing getter code. Symbol keys and unexpected string keys are rejected by exact-own-key checks.

The implementation accepts only `Object.prototype` or `null` prototype for qualified data objects.

## 14. Static locality and execution boundary

The supervisor source contains no:

```text
@embedpdf/pdfium import
PDFiumExt_Init
FPDF_* call
WebAssembly execution
DEFAULT_PDFIUM_WASM_URL
HTTP(S) URL
fetch(
XMLHttpRequest
Worker(
importScripts
child_process
setTimeout(
setInterval(
```

The static regression checks the supervisor source for these surfaces. Qualification does not prove real browser no-network behavior; it proves only that this bounded supervisor source introduces none of those execution mechanisms.

## 15. Preserved first candidate failure

The first complete exact-Node candidate validation reached the new implementation and produced:

```text
TESTS = 128
PASS = 127
FAIL = 1
```

The failing regression was:

```text
source byte mutation by executor is detected after cleanup
```

The supervisor had correctly detected source mutation, but the original `runtimeBindingStillMatches()` implementation revalidated the unchanged caller binding against the already-mutated bytes. That conflated source mutation with binding mutation and produced a second failure dimension, yielding an `AggregateError`.

The failure is preserved by:

```text
github:issue-comment:5672620350
```

The forward-only repair changed post-run binding integrity verification to compare the caller binding directly against the normalized pre-run binding. Source-byte integrity remains a separate check.

No commit, push, PR, real PDFium/WASM/browser/network execution, dependency installation, or package-manager action occurred in the failed sequence.

## 16. Precommit terminal-event hardening

After the diagnostic-separation repair passed a complete `128/128` sequence, a static precommit review identified a time-of-check/time-of-use boundary: the callback stored the terminal event object and validated it later in the async winner path.

Before any commit was created, the callback was hardened to validate and snapshot the terminal outcome scalar synchronously. A regression now mutates the event object immediately after emission and proves that the accepted outcome remains the synchronously qualified original value.

Because source/test bytes changed, the complete authorized exact-Node sequence was executed again from the start. Only the final sequence below qualifies the candidate.

## 17. Final exact-Node qualification

Validation used only the previously qualified official Node executable:

```text
node version = v24.20.0
node executable SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
toolchain qualification record SHA256 = 18fe06392700a2026bce899f949a18e09ca6d0817b487a650071f1019640a39b
```

The complete authorized command sequence on the final source/test bytes passed:

```text
node --check packages/providers/src/pdf/browser/pdf-inspect-runtime-supervisor.js
  => PASS / RC 0

node --check packages/providers/test/pdf-inspect-runtime-supervisor.test.js
  => PASS / RC 0

node --test packages/providers/test/content-identity-admission.test.js packages/providers/test/pdfium-structural-evidence.test.js packages/providers/test/pdf-inspect-provider.test.js packages/providers/test/pdf-inspect-runtime.test.js packages/providers/test/pdf-inspect-runtime-supervisor.test.js
  => PASS / RC 0
```

Combined result:

```text
TESTS = 129
PASS = 129
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
TEST_STDOUT_SHA256 = d1fb4c8400f523b12f264e2d3bf82359b312a223065d3f9893dd4f5c296c8239
TEST_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

Frozen validation evidence:

```text
VALIDATION_SUMMARY_SHA256 = e5aa8cd5dfc262a6d19af26461582519dd7f0c1bb473a41d5db70b1244f1d56e
EVIDENCE_MANIFEST_ENTRIES = 14
EVIDENCE_MANIFEST_SHA256 = b165e49929298492ed98ab7784aa4d8432ff3845f16943b713a61888e09c9d66
```

The final validation is preserved by `github:issue-comment:5672640334`.

## 18. Final pre-document source identities

```text
packages/providers/src/pdf/browser/pdf-inspect-runtime-supervisor.js
SHA256 = f258accd7998ef08a9c6f1dd6f26325697c01e5206534d27952e797bee7c1922

packages/providers/test/pdf-inspect-runtime-supervisor.test.js
SHA256 = 8dc0d5abbebd4744b0a5a75a44df4806641956ad277825a62e43e5f1a64c458b

packages/providers/package.json
SHA256 = 278b9ee6116709e289a5e0b1883c11472b74c37031452b08e4c5cdff5a2bdc70
```

The qualification document is added only after those source/test/package bytes were frozen and validated. It does not alter them.

## 19. Regression coverage

The final combined suite proves at minimum:

- runtime-first completion returns a newly created frozen raw observation envelope without termination;
- normal PDFium open rejection remains a raw observation and is not semantically interpreted by the supervisor;
- confirmed cancellation, timeout, and resource-limit signals produce exact qualified terminal evidence;
- first-terminal-wins behavior invokes termination at most once;
- a synchronous terminal event prevents runtime executor invocation;
- terminal event data is snapshotted before emitter mutation;
- late runtime rejection after a terminal winner is consumed without becoming unhandled or replacing the result;
- termination failure and malformed termination confirmation fail closed;
- executor failure before any terminal event remains an executor failure and is not guessed into a terminal outcome;
- malformed raw runtime observations fail closed;
- invalid/mismatched runtime binding fails before executor/control registration;
- custom prototypes, symbols, accessors and proxies fail closed without getter/proxy-trap execution in the tested rejection paths;
- valid null-prototype binding/digest objects remain accepted;
- source bytes, runtime binding and terminal control mutation are independently detected;
- disposal failure suppresses publication and is preserved alongside a primary failure;
- invalid terminal outcome fails closed without termination;
- caller inputs and raw observations are not mutated;
- supervisor source contains no real PDFium/WASM/browser/worker/network/timer/dependency execution surface.

## 20. Explicit non-grants and non-claims

```text
REAL_PDFIUM_IMPORT_OR_INITIALIZATION = NOT_AUTHORIZED / NOT_PERFORMED
PDFIUM_WASM_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
REAL_BROWSER_OR_WORKER_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
REAL_TIMER_OR_RESOURCE_MEASUREMENT_QUALIFICATION = NOT_AUTHORIZED / NOT_PERFORMED
NETWORK_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
DEPENDENCY_INSTALLATION_OR_MUTATION = NOT_AUTHORIZED / NOT_PERFORMED
RUNTIME_TO_SEMANTIC_BRIDGE_IMPLEMENTATION = NOT_AUTHORIZED / NOT_PERFORMED
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

This unit does not prove actual cancellation of a real worker, actual timeout enforcement, actual memory/CPU limit enforcement, real browser execution, or no-network behavior of a real runtime. It only qualifies the deterministic supervisor contract that requires independently confirmed termination before semantic terminal evidence can be published.

## 21. Canonicalization gate

This artifact is a candidate qualification only. Canonicalization requires:

1. exact four-path candidate surface and `git diff --check`;
2. clean worktree after commit;
3. truthful GitHub check/provider accounting;
4. fresh independent substantive review bound to the exact candidate head/tree;
5. forward-only repair of every material finding;
6. zero unresolved material review threads;
7. immediate live premerge race proof;
8. guarded normal merge using the exact reviewed head SHA;
9. mechanical post-merge verification of parents/tree/path surface/signature/workflows;
10. canonical Issue #7 closeout;
11. fresh Issue #7 successor reconciliation before any runtime-to-semantic bridge, real PDFium/WASM/browser execution, further capability implementation, 004D, or Specification 005 work.

No successor authority is inferred by this artifact.
