# PDF_TEXT_SELECT_V1 Supervised Semantic Orchestrator Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / FAKE_CONTROL_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5712617935`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This bounded unit implements the source-level orchestrator needed to drive one
supervised select execution end to end: validate the orchestration envelope,
verify cross-layer request/runtime-binding identity, supervise the supplied
runtime exactly once, re-verify identity after supervision, and delegate final
composition to the canonical `composeSupervisedPdfTextSelectResult` bridge.

It does not execute PDFium, WASM, a browser, a worker, a real timer, a resource
meter, or any document-processing network path. Qualification uses deterministic
injected runtimes and the ordinary-minimal admission fixture bytes only.

```text
UNIT = PDF_TEXT_SELECT_V1_SUPERVISED_SEMANTIC_ORCHESTRATOR_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 724b6c3b3bf6f1268094f95e13ce43fed3f79c5e
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-select-orchestrator.js
packages/providers/test/pdf-text-select-orchestrator.test.js
specs/004-local-pdf-core/pdf-text-select-v1-supervised-semantic-orchestrator-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new orchestrator test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Canonical predecessors

This implementation consumes without weakening the select supervisor, the
select bridge, the select provider composer, and the mirrored text
orchestrator envelope/identity/supervision discipline. The provider, the
supervisor, the bridge, and the raw runtime core are unchanged by this unit.
The source was derived from the canonical text orchestrator by a reviewed
mechanical transform (select requires, select entry/kind/message naming) plus
select-specific observation, parameter, budget, operation, and error-code
adaptations; every adapted site was verified by execution.

## 3. Separation of responsibilities

The orchestrator does not import or call the real select runtime core. Its
`runRuntime` is an injected function supervised exactly once. Cross-layer
identity is verified before runtime effects and re-verified after supervision.
One pre-creation defect (test imported text provider constants instead of
select constants) was caught by execution and repaired forward-only before
qualification completed.

## 4. Exact input and identity validation

`orchestratePdfTextSelect()` accepts exactly the seven own-data keys with the
same boundary discipline as the text orchestrator: `Buffer` bytes, function
runtimes, safe own-data request/binding with provider id, capability version,
byte length, budget ref, and exact digest agreement, else no runtime effect.

## 5. Local-only boundary

The orchestrator source imports only the select supervisor and the select
bridge, and contains no direct runtime, PDFium, WASM, network, timer, worker,
or cross-track reference (enforced by the source-surface test, which adds
select-runtime and cross-track orchestrator forbiddens to the mirrored set).

## 6. Focused qualification

```text
NODE_VERSION = v22.22.3
FOCUSED_TESTS = 22
FOCUSED_PASS = 22
FOCUSED_FAIL = 0
```

Coverage mirrors the text orchestrator suite with select contracts: supervised
success with selection fields, format-rejection mapping, all terminal outcomes
with run suppression, rejection propagation, malformed completion failure,
termination/disposer propagation, provider-defect handling with
`invalid_input.pdf_text_select_request`, pre-effect binding mismatch, Buffer
boundary, proxy/accessor/symbol/extra-key/custom-prototype matrices, source
surface, per-field mismatch matrix, unsafe containers/digests, and
during-runtime/termination mutation rejection.

Node-version note: canonical governance states no Node version requirement;
qualification records the actually executed runtime.

## 7. Complete applicable provider qualification

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 669
PASS = 669
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

No `node_modules` materialization is part of the candidate repository diff.

## 8. Candidate file identities

```text
SELECT_ORCHESTRATOR_SOURCE_SHA256 = 15e23bd62017138ed78a925dec6710295be50374fbf510e22ef9b530237d08f0
SELECT_ORCHESTRATOR_TEST_SHA256 = 21dac2790afe5f7d60a9e5a214f81ed323a4c51d9534450f6da4d736376a7bd8
PROVIDERS_PACKAGE_JSON_SHA256 = ae4e8da4e6bf493dbc99a4a16126eb92dee438dc60ce40f39224d32e9e9b63b0
```

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded orchestrator drives one injected
select-supervisor execution with pre/post cross-layer identity verification and
faithful bridge delegation under exact envelope and fail-closed attack-surface
validation.

It does not prove real runtime execution, provider wiring, binding/facade
composition, search/metadata correctness, worker integration, or native/server
parity.

## 10. Explicit non-grants

```text
TEXT_SELECT_BINDING = NOT_AUTHORIZED
TEXT_SELECT_FACADE = NOT_AUTHORIZED
TEXT_SELECT_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SELECT_SUPERVISOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SELECT_BRIDGE_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SELECT_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
REAL_RUNTIME_EXECUTION = NOT_AUTHORIZED / NOT_IMPLEMENTED
SEARCH_TRACK = NOT_AUTHORIZED
METADATA_TRACK = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 11. Merge and successor gates

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
