# PDF_TEXT_SEARCH_V1 Exact-Package Supervised Semantic Facade Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / EXACT_PACKAGE_FACADE_QUALIFIED / BOUNDED_LOCAL_WASM_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5712937536`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit closes the top-level seam left after the canonical
`PDF_TEXT_SEARCH_V1_EXACT_PDFIUM_PACKAGE_RUNTIME_BINDING_IMPLEMENTATION`
closeout. It exposes the single exact-package supervised search composition
entry that binds one caller-supplied `runRuntime` closure over the search
exact-package binding and delegates end-to-end supervised execution to the
canonical search orchestrator, with caller-WASM integrity verified after
execution.

```text
UNIT = PDF_TEXT_SEARCH_V1_EXACT_PACKAGE_SUPERVISED_SEMANTIC_FACADE_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 23d4269cf335daeab2d841001f26bf9f53bb6666
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-search-exact-package-facade.js
packages/providers/test/pdf-text-search-exact-package-facade.test.js
specs/004-local-pdf-core/pdf-text-search-v1-exact-package-supervised-semantic-facade-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new facade test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation method and forward-only repairs

The source and test were derived from the canonical select facade by mechanical
transform with search adaptations. The transform introduced defects, all caught
before qualification completed (no failures suppressed, no evidence reused):

1. Backslash-literal matching in the transform script failed twice (entry-rename
   ordering hid the closure-shape regex; a giant multi-line literal missed the
   orchestration-shape regex); resolved by switching to all-plain substitutions
   plus single-line word surgery. No bytes from failed attempts entered the
   candidate files.
2. Word surgery mapped both `selectCount` and `maxRects` to `maxMatches`,
   duplicating `maxMatches` in the closure-shape regex; caught by execution
   (20/21, closure-shape test failed), repaired forward-only by deduplication,
   re-verified 21/21.
3. Test-side require asserts, closure-shape regex, orchestration-shape regex,
   missing-key title/array, options defaults, explicit options block, and
   observation asserts were adapted to search contracts; the `/search/i` forbid
   was replaced by `/select/i` plus search raw/binding and cross-track entry
   forbiddens after proving the replacement matches nothing in the source
   (residual grep: only the forbid line itself).

## 3. Implementation contract

The facade exports only
`searchPdfPageTextWithExactPackageSupervisedSemantics(options)`: exact ten-key
envelope validation (search query/match-budget keys replacing the select
range/rect-budget keys), facade-boundary WASM view check, single `runRuntime`
closure over identical caller inputs through the search exact-package binding,
delegation solely via `orchestratePdfTextSearch`, and post-execution caller-WASM
integrity with plain vs `AggregateError` semantics exactly as specified.

## 4. Local-only boundary

The source imports only the search orchestrator and the search binding, calls
each exactly once, and contains no raw-runtime, cross-track, package, WASM,
network, worker, or asset reference (enforced by the source test).

## 5. Exact package and toolchain identities

```text
NODE_VERSION = v22.22.3
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
FIXTURE_SHA256 = d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207 (admission-seed-ordinary-minimal-v1)
```

No dependency acquisition, package-manager action, lockfile mutation, or
network fetch; no `node_modules` materialization in the candidate diff. Node
truth recorded as executed per governance (no normative v24.20.0 gate).

## 6. Bounded local WASM execution

Successful supervised compositions, synchronous terminals, WASM-mutation
injections, and malformed/unavailable/invalid probes execute against the real
adopted WASM with fixture bytes only.

```text
WASM_INSTANTIATION_OBSERVED = BOUNDED_LOCAL (adopted package + fixture bytes only)
NETWORK_ATTEMPTS_OBSERVED = NONE
```

## 7. Focused facade qualification

```text
FOCUSED_TESTS = 21
FOCUSED_PASS = 21
FOCUSED_FAIL = 0
```

Coverage mirrors the select facade suite with search contracts (export surface,
source composition incl. closure/orchestration shape asserts, proxy/accessor/
symbol/extra/missing-key matrices, invalid WASM shapes, null-prototype real
execution, canonical success with match observations and unchanged bytes, all
three terminals with evidence, terminal-first malformed input, callback/
termination/disposer/combined WASM-mutation behavior, termination-failure
propagation, malformed-document and unavailable/invalid-request preservation
with `invalid_input.pdf_text_search_request`).

## 8. Complete applicable provider qualification

```text
TOTAL_TESTS = 834
PASS = 834
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 9. Candidate file identities

```text
SEARCH_FACADE_SOURCE_SHA256 = d4c95a7760d696aacecd473514fd2d4227b5310dff1a54be24b9bec803934ce5
SEARCH_FACADE_TEST_SHA256 = e33dee7af568a4bf7769b92dd57b82247d94d562060db5aaba63273a529b64be
PROVIDERS_PACKAGE_JSON_SHA256 = f454d4d215c01f5074bdbd8e596befea3dbd957b89781f09052454b646755d4f
```

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 10. Explicit non-grants

```text
TEXT_SEARCH_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SEARCH_SUPERVISOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SEARCH_BRIDGE_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SEARCH_ORCHESTRATOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SEARCH_BINDING_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SEARCH_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
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
