# PDF_TEXT_SELECT_V1 Exact Package Supervised Semantic Facade Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / EXACT_PACKAGE_FACADE_QUALIFIED / BOUNDED_LOCAL_WASM_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5712690529`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit closes the top-level seam left after the canonical
`PDF_TEXT_SELECT_V1_EXACT_PDFIUM_PACKAGE_RUNTIME_BINDING_IMPLEMENTATION`
closeout. It exposes the single exact-package supervised selection composition
entry that binds one caller-supplied `runRuntime` closure over the select
exact-package binding and delegates end-to-end supervised execution to the
canonical select orchestrator, with caller-WASM integrity verified after
execution.

```text
UNIT = PDF_TEXT_SELECT_V1_EXACT_PACKAGE_SUPERVISED_SEMANTIC_FACADE_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 51016855c38d3b99cd80c29d786bfea1bcf44fce
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-select-exact-package-facade.js
packages/providers/test/pdf-text-select-exact-package-facade.test.js
specs/004-local-pdf-core/pdf-text-select-v1-exact-package-supervised-semantic-facade-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new facade test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation method and forward-only repairs

The source and test were derived from the canonical text facade by mechanical
transform with select adaptations. The transform introduced defects, all caught
by execution and repaired forward-only before qualification completed (no
failures suppressed, no evidence reused):

1. `sed` BRE unescaped dots corrupted two source-path strings
   (`providers/src` matched as `../src`); repaired with exact replacements and
   re-verified by grep over committed bytes.
2. Destructured import names without trailing parens were missed by the
   paren-anchored patterns (`orchestratePdfText`, `extractPdfPageTextWith...`
   imports); repaired and audited to zero residue.
3. Test-side require asserts, closure-shape regex, orchestration-shape regex,
   count assertion, and one explicit options block were adapted to select
   contracts; the `/selection/i` forbid was replaced by `/extract/i` plus
   select raw/binding and cross-track entry forbiddens after proving the
   replacement matches nothing in the source.

## 3. Implementation contract

The facade exports only
`selectPdfPageTextWithExactPackageSupervisedSemantics(options)`: exact
eleven-key envelope validation (select range/rect-budget keys replacing
`maxChars`), facade-boundary WASM view check, single `runRuntime` closure over
identical caller inputs through the select exact-package binding, delegation
solely via `orchestratePdfTextSelect`, and post-execution caller-WASM integrity
with plain vs `AggregateError` semantics exactly as specified.

## 4. Local-only boundary

The source imports only the select orchestrator and the select binding, calls
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

Coverage mirrors the text facade suite with select contracts (export surface,
source composition incl. closure/orchestration shape asserts, proxy/accessor/
symbol/extra/missing-key matrices, invalid WASM shapes, null-prototype real
execution, canonical success with selection fields and unchanged bytes, all
three terminals with evidence, terminal-first malformed input, callback/
termination/disposer/combined WASM-mutation behavior, termination-failure
propagation, malformed-document and unavailable/invalid-request preservation
with `invalid_input.pdf_text_select_request`).

## 8. Complete applicable provider qualification

```text
TOTAL_TESTS = 701
PASS = 701
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 9. Candidate file identities

```text
SELECT_FACADE_SOURCE_SHA256 = 576c1bfebde4e18ff9402c42f56155175493b124ddf637bea373feb3d9c1b5fb
SELECT_FACADE_TEST_SHA256 = 401d14ef8fb9c85895955ad4ea65e1d7a7c9a7607bef4bdec9f52d4d456ffcd4
PROVIDERS_PACKAGE_JSON_SHA256 = b996e3849f1eafdde858aabab2da0a867dfffe51acddc858a050e2c4d2a71c2b
```

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 10. Explicit non-grants

```text
TEXT_SELECT_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SELECT_SUPERVISOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SELECT_BRIDGE_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SELECT_ORCHESTRATOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SELECT_BINDING_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SELECT_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
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
