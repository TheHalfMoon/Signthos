# PDF_RENDER_V1 Runtime-Terminal Evidence Semantic Qualification

Status: `IMPLEMENTATION_CANDIDATE / SEMANTIC_ONLY / NO_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5676530536`

## 1. Purpose

This bounded unit qualifies the Signthos semantic contract for terminal `PDF_RENDER_V1`
runtime evidence before any render supervisor/bridge integration.

It does not execute PDFium, WASM, a browser, a worker, or any document-processing
network path. It defines how already-confirmed runtime terminal evidence may be
represented without being dropped, normalized into success, or confused with raw
render observations.

Canonical base:

```text
commit = 042a567453a53d5a60031ba5cf4ea96fba1e2ae5
tree = e1916280768471df225aa8fe577072784a1553df
```

## 2. Authorized repository surface

Exactly these paths are authorized by this unit:

```text
packages/providers/src/pdf/browser/pdf-render-provider.js
packages/providers/test/pdf-render-provider.test.js
specs/004-local-pdf-core/pdf-render-v1-runtime-terminal-evidence-semantic-qualification.md
```

No package manifest, lockfile, fixture, dependency, provenance, workflow, container,
database, or runtime asset changes are authorized.

## 3. Canonical predecessors

This unit consumes without weakening:

- the canonical Specification 004 read-only/locality/resource/cancellation model;
- the canonical provider-neutral content identity admission;
- the canonical `@embedpdf/pdfium@2.15.0` structural runtime qualification;
- the canonical pure PDFium structural-evidence adapter;
- the canonical `PDF_PAGE_RENDER_V1` local-WASM runtime core;
- the canonical `PDF_RENDER_V1` browser semantic provider closed by PR #260;
- the canonical `PDF_INSPECT_V1` runtime-terminal evidence semantic qualification
  (mirrored schema, conflict, and outcome discipline).

The predecessor render provider intentionally rejected all terminal evidence because
no render terminal-evidence schema was qualified. That fail-closed behavior is
replaced only by the exact schema in this unit. Success/rejection behavior is
unchanged.

## 4. Why this unit precedes render supervision

Canonical 004C requires runtime outcomes to distinguish:

```text
CANCELLED
TIMED_OUT
RESOURCE_LIMIT_EXCEEDED
UNAVAILABLE
FAILED
SUCCEEDED
```

The canonical render request already binds exact input identity, provider identity,
provider capability version, and `resourceBudgetRef`. It does not contain a qualified
deadline field, so this unit does not invent one.

A render supervisor/bridge cannot safely report cancellation, timeout, or resource
exhaustion until the Signthos semantic boundary can validate and preserve those
outcomes without publishing partial success.

## 5. Exact terminal-evidence schema

Qualified evidence is a strict plain object or null-prototype object containing
exactly these own data fields:

```text
schema
terminalOutcome
providerId
providerCapabilityVersion
inputExactBytesDigest
byteLength
resourceBudgetRef
runtimeEvidenceRef
partialOutputDiscarded
```

The required values are:

```text
schema = signthos.pdf.render.runtime-terminal.v1
terminalOutcome = CANCELLED | TIMED_OUT | RESOURCE_LIMIT_EXCEEDED
providerId = signthos.pdf.browser.embedpdf-v2.15.0-pdfium
providerCapabilityVersion = signthos.pdf.render.v1
inputExactBytesDigest = exact SHA-256 identity of the operation bytes
byteLength = exact operation byte length
resourceBudgetRef = exact request resourceBudgetRef
runtimeEvidenceRef = non-empty opaque evidence reference
partialOutputDiscarded = true
```

Custom prototypes, proxy-backed objects, accessors, inherited required fields,
symbol keys, extra keys, missing keys, or altered binding values are unqualified.

## 6. Exact byte and operation binding

The terminal evidence must match the already-validated request/input binding exactly:

```text
terminal.inputExactBytesDigest == request/input exact digest
terminal.byteLength == request/input byte length
terminal.providerId == canonical PDF_RENDER_V1 provider id
terminal.providerCapabilityVersion == canonical PDF_RENDER_V1 capability version
terminal.resourceBudgetRef == request.resourceBudgetRef
```

No path, URL, filename, cache key, provider-private handle, or caller-declared media
type can substitute for this binding.

## 7. Terminal outcome semantics

### 7.1 Cancellation

Qualified `CANCELLED` evidence maps to:

```text
outcome = CANCELLED
stableError.errorClass = CANCELLED
stableError.errorCode = cancelled.pdf_render_runtime
stableError.retryCategory = RETRY_MAY_SUCCEED
```

### 7.2 Timeout

Qualified `TIMED_OUT` evidence maps to:

```text
outcome = TIMED_OUT
stableError.errorClass = TIMEOUT
stableError.errorCode = timeout.pdf_render_runtime
stableError.retryCategory = RETRY_REQUIRES_CHANGED_INPUT_OR_STATE
```

### 7.3 Resource exhaustion

Qualified `RESOURCE_LIMIT_EXCEEDED` evidence maps to:

```text
outcome = RESOURCE_LIMIT_EXCEEDED
stableError.errorClass = RESOURCE_LIMIT_EXCEEDED
stableError.errorCode = resource_limit_exceeded.pdf_render_runtime
stableError.retryCategory = RETRY_REQUIRES_CHANGED_INPUT_OR_STATE
```

Each terminal result preserves `READ_ONLY`, `LOCAL_ONLY`, exact revision/input
binding, and `newCanonicalRevisionCreated=false`.

## 8. Partial-output boundary

A qualified terminal evidence record requires:

```text
partialOutputDiscarded = true
```

The semantic result publishes no `observations` field and no partial render result.
This prevents late or incomplete provider output from being represented as
exhaustive or successful operation evidence.

The normalized result retains only:

```text
runtimeTerminalEvidence.schema
runtimeTerminalEvidence.runtimeEvidenceRef
runtimeTerminalEvidence.partialOutputDiscarded = true
```

The opaque reference points to separately controlled runtime evidence; it does not
embed document content, pixel bytes, or provider-private diagnostics in the semantic
result.

## 9. Contradiction handling

`terminalOutcomeEvidence` and `renderEvidence` cannot both be supplied for the same
composition call. Such input fails closed as:

```text
INVALID_INPUT
invalid_input.runtime_terminal_evidence_conflict
```

Likewise, terminal evidence supplied while provider availability is `UNAVAILABLE` or
`UNKNOWN` is internally contradictory and fails as:

```text
INVALID_INPUT
invalid_input.runtime_terminal_availability_conflict
```

This avoids silently preferring one incompatible evidence path and dropping the
other.

## 10. Invalid terminal evidence

Malformed or unqualified terminal evidence fails as:

```text
outcome = FAILED
stableError.errorClass = INVALID_INPUT
stableError.errorCode = invalid_input.runtime_terminal_evidence
observations = ABSENT
```

Invalid cases include, without limitation:

- unknown schema/version;
- unknown terminal outcome;
- provider mismatch;
- capability-version mismatch;
- digest or byte-length mismatch;
- resource-budget mismatch;
- empty runtime evidence reference;
- `partialOutputDiscarded !== true`;
- extra, missing, inherited, symbol, accessor, or proxy-backed fields.

## 11. Local-only boundary

This unit adds no runtime import, network, worker, filesystem, timer, or execution
surface. The source delta is pure semantic classification over caller-supplied
evidence, mirroring the canonical inspect terminal handling with render naming.

## 12. Focused qualification

The focused render provider suite ran under the exact canonical Node identity with
synthetic observations and synthetic terminal evidence only.

```text
NODE_VERSION = v24.20.0
FOCUSED_TESTS = 30
FOCUSED_PASS = 30
FOCUSED_FAIL = 0
```

New focused coverage proves, at minimum:

```text
qualified terminal evidence maps to the three distinct fail-closed terminal outcomes
terminal evidence requires exact byte, provider, capability, and budget binding
terminal evidence cannot coexist with render evidence or unavailable provider state
terminal evidence rejects hostile containers without getter/trap execution
terminal composition does not mutate bytes, request, or evidence
```

## 13. Complete applicable provider qualification

The complete canonical provider suite passed under the exact Node executable with the
exact adopted package exposed through an external `NODE_PATH`. No `node_modules`
materialization is part of the candidate repository diff.

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 248
PASS = 248
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 14. Candidate file identities

```text
RENDER_PROVIDER_SOURCE_SHA256 = f401a8ebe9855cd137078d99b80117cd8c582c2b4d19f521c3d1d2340763e021
RENDER_PROVIDER_TEST_SHA256 = d1c9fa176bd99c60e6968bd367927d2c1905a5b95b0e27e54924598734ff8480
```

No package-manifest change is part of this candidate.

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 15. Exact qualification claim

This candidate proves only that the bounded render semantic provider additionally
represents independently confirmed runtime termination under the exact schema,
binding, conflict, outcome, retry, read-only, and local-only behavior above, with no
change to success/rejection semantics.

It does not prove runtime supervision, timeout/cancellation enforcement, bridge
composition, worker integration, thumbnail/text/search correctness, or
native/server parity.

## 16. Explicit non-grants

```text
RENDER_SUPERVISOR = NOT_AUTHORIZED / NOT_IMPLEMENTED
RENDER_BRIDGE = NOT_AUTHORIZED / NOT_IMPLEMENTED
RENDER_TERMINAL_EXECUTION = NOT_AUTHORIZED / NOT_IMPLEMENTED
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

## 17. Merge and successor gates

This candidate is not canonical until all of the following hold on the exact final
head:

1. the final diff contains only the three authorized paths;
2. exact Node qualification is rerun after the qualification document is complete;
3. source/test/document hashes are recorded for the final bytes;
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
