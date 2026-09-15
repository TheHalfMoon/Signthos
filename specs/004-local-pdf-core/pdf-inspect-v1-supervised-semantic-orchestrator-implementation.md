# PDF_INSPECT_V1 Supervised Semantic Orchestrator Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / DETERMINISTIC_COMPOSITION_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5672974929`
Preserved first regression: `github:issue-comment:5672986992`
Preserved repair-validation failures: `github:issue-comment:5672994634`
Final validation: `github:issue-comment:5673005160`

## 1. Purpose

This bounded unit implements the missing composition seam between the canonical runtime supervisor and the canonical supervised-result semantic bridge.

Canonical base:

```text
commit = d1f02043713ef07d856b7d930c4a680b232b1f78
tree = 9eac055107449dd600e5821c5d009903e4002c61
```

The orchestrator performs only:

```text
validate cross-layer binding
-> supervisePdfInspectRuntime()
-> composeSupervisedPdfInspectResult()
```

It does not import or invoke `inspectPdfWithLocalWasm()` and does not import a PDFium initializer.

## 2. Authorized repository surface

Exactly four repository paths are authorized:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-inspect-orchestrator.js
packages/providers/test/pdf-inspect-orchestrator.test.js
specs/004-local-pdf-core/pdf-inspect-v1-supervised-semantic-orchestrator-implementation.md
```

The package manifest changes only the existing test command by appending the orchestrator test file. No dependency declaration changes.

## 3. Input contract

`orchestratePdfInspect()` accepts one strict own-data options object with exactly:

```text
bytes
request
availability
runtimeBinding
runRuntime
terminalControl
terminateRuntime
```

`bytes` must be a `Buffer` because the complete supervised-semantic operation must satisfy both the supervisor and semantic-bridge boundaries before runtime effects begin.

`runRuntime` and `terminateRuntime` must be functions. The canonical supervisor retains ownership of terminal-control shape validation and runtime outcome/termination semantics.

## 4. Cross-layer binding invariant

The first focused implementation exposed a real defect: a caller could supply a runtime binding with one `resourceBudgetRef` and a semantic request with another. The supervisor independently validated the runtime binding, while completed-runtime semantic composition later consumed only the request. That could make runtime evidence and final provider semantics refer to different operation budgets.

The failure is preserved by `github:issue-comment:5672986992`.

The forward-only repair requires the semantic request and runtime binding to match before supervision on every identity shared by both layers:

```text
providerId
providerCapabilityVersion
inputExactBytesDigest.algorithm
inputExactBytesDigest.value
inputByteLength <-> byteLength
resourceBudgetRef
```

This is a seam invariant, not a competing semantic request schema. Provider-owned fields such as operation identity, document/revision identity, capability reference, and capability parameters remain validated by the canonical semantic provider after successful supervision.

## 5. Unsafe-object boundary

Before runtime effects, the orchestrator rejects unsafe request or runtime-binding containers when they are:

- proxy-backed;
- accessor-backed;
- custom-prototype or inherited-container shapes;
- symbol-bearing.

The shared digest must be an exact own-data `{ algorithm, value }` object on both sides.

The tests prove tested accessors are rejected without invoking their getter code and that unsafe/mismatched seam data does not start `runRuntime`.

## 6. Supervisor ownership

After preflight, the orchestrator calls `supervisePdfInspectRuntime()` exactly once with the original:

```text
bytes
runtimeBinding
runRuntime
terminalControl
terminateRuntime
```

The orchestrator does not retry runtime execution, terminal handling, termination, or cleanup.

Supervisor failures remain failures. They are not converted into provider-domain results and semantic composition does not occur after a rejected supervisor call.

Synchronous qualified terminal signals retain the canonical supervisor behavior: runtime execution does not begin, the winning terminal path calls `terminateRuntime()` once, and only qualified terminal evidence may proceed to semantic composition.

## 7. Semantic bridge ownership

Only after successful supervision does the orchestrator call `composeSupervisedPdfInspectResult()` with:

```text
bytes
request
availability
supervisedResult
```

The bridge and canonical provider retain ownership of:

- raw structural mapping;
- terminal evidence validation;
- availability semantics;
- capability/request semantics;
- stable provider errors;
- immutable canonical provider result construction.

The orchestrator does not define a second provider result schema and returns exactly the canonical semantic result.

## 8. Preserved validation history

The first focused run produced:

```text
TESTS = 17
PASS = 16
FAIL = 1
```

The failing regression proved the cross-layer budget-binding defect.

After the seam repair, the second focused run produced:

```text
TESTS = 17
PASS = 13
FAIL = 4
```

Those four failures were preserved by `github:issue-comment:5672994634`. They were test-expectation conflicts caused by the new fail-earlier boundary: unsafe top-level request proxies and cross-layer byte-length mismatch were now rejected before the deeper paths the tests had intended to exercise.

The tests were repaired forward-only without weakening the new boundary. No predecessor source was changed.

Expanded focused coverage then passed:

```text
TESTS = 20
PASS = 20
FAIL = 0
```

## 9. Final exact-Node qualification

The final complete predecessor + orchestrator suite used exactly:

```text
Node version = v24.20.0
Node executable SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
```

Results:

```text
CHECK_SOURCE_RC = 0
CHECK_TEST_RC = 0
COMBINED_TEST_RC = 0
TESTS = 168
PASS = 168
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

Validated byte identities:

```text
ORCHESTRATOR_SOURCE_SHA256 = f2c647af6839c3b9b725a948e81cd6fec4d577cd734d8f47b727fd21ce76487c
ORCHESTRATOR_TEST_SHA256 = 1f6044d5b0eeb1b9790de14dedfd2f21aff3e255734df474a3aed68a1e9abcef
PROVIDER_PACKAGE_SHA256 = 2b69b08037c1e8c38ed6ae2b0fc10c67734a251c1688c38bbe2046b89a3b45ef
TEST_STDOUT_SHA256 = 6aa3dd074c4f157132bc35e9780648c2df617c4e724738c509063c4c86d328c5
TEST_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
VALIDATION_SUMMARY_SHA256 = 7394aae4e4ef40b5b568819b5c26bdda86968a41372fa7ea3e2c7d94ebab6815
EVIDENCE_MANIFEST_SHA256 = 89b575ef054f05fed53b938a2d30d31d88c69eb04ed26238562af52b9dff7074
PRE_STATUS_SHA256 = 2831d1f5da43dc1cd6f355d49a43140bb49ed47a236509932574ac811d5b8ce8
POST_STATUS_SHA256 = 2831d1f5da43dc1cd6f355d49a43140bb49ed47a236509932574ac811d5b8ce8
```

The final validation is preserved by `github:issue-comment:5673005160`.

This document was added only after the validated source/test/package bytes were frozen and does not alter those validated bytes.

## 10. Static execution boundary

The source regression requires imports of only the canonical supervisor and semantic bridge and rejects direct introduction of:

```text
pdf-inspect-runtime
inspectPdfWithLocalWasm
@embedpdf/pdfium
PDFiumExt_Init
FPDF_*
WebAssembly
fetch(
XMLHttpRequest
Worker(
importScripts
child_process
setTimeout(
setInterval(
http://
https://
```

No real runtime, PDFium, WASM, browser, worker, timer, resource meter, document-processing network, dependency manager, or dependency installation was executed by this unit.

## 11. Explicit non-grants

```text
DIRECT_LOCAL_WASM_RUNTIME_IMPORT_OR_INVOCATION = NOT_AUTHORIZED / NOT_PERFORMED
REAL_PDFIUM_IMPORT_OR_INITIALIZATION = NOT_AUTHORIZED / NOT_PERFORMED
PDFIUM_WASM_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
REAL_BROWSER_OR_WORKER_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
REAL_TIMER_OR_RESOURCE_MEASUREMENT_QUALIFICATION = NOT_AUTHORIZED / NOT_PERFORMED
NETWORK_DOCUMENT_PROCESSING = NOT_AUTHORIZED / NOT_PERFORMED
DEPENDENCY_INSTALLATION_OR_MUTATION = NOT_AUTHORIZED / NOT_PERFORMED
REAL_RUNTIME_ADAPTER_OR_LOADER = NOT_AUTHORIZED
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

## 12. Canonicalization gate

The candidate remains non-canonical until exact four-path diff accounting, clean commit/push, truthful GitHub check accounting, fresh exact-head independent substantive review, zero unresolved material threads, immediate race proof, guarded normal merge with exact expected head, mechanical post-merge verification, Issue #7 closeout, and a completely fresh successor reconciliation all succeed.

No successor authority is inferred from this candidate.
