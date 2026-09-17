# PDF_TEXT_SEARCH_V1 Exact PDFium Package Runtime Binding Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / EXACT_PACKAGE_BINDING_QUALIFIED / BOUNDED_LOCAL_WASM_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5712908228`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit closes only the package-to-raw-runtime seam left after the canonical
`PDF_TEXT_SEARCH_V1_SUPERVISED_SEMANTIC_ORCHESTRATOR_IMPLEMENTATION` closeout.
It binds the already-adopted exact `@embedpdf/pdfium@2.15.0` CommonJS `init`
export to the canonical `searchPdfPageTextWithLocalWasm()` raw runtime while
keeping PDF bytes, WASM bytes, page index, search query, and match budget
caller/application supplied.

```text
UNIT = PDF_TEXT_SEARCH_V1_EXACT_PDFIUM_PACKAGE_RUNTIME_BINDING_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 65072c67327482b9f605024f3050be957976ed2a
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-search-runtime-binding.js
packages/providers/test/pdf-text-search-runtime-binding.test.js
specs/004-local-pdf-core/pdf-text-search-v1-exact-pdfium-package-runtime-binding-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new binding test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

The binding exports only `searchPdfPageTextWithExactPdfiumPackage(options)`:
exact five-key envelope validation, unchanged forwarding of caller
`bytes`/`wasmBinary`/`pageIndex`/`query`/`maxMatches`, exact package `init`
injection, and delegation of all validation, isolation, allocation, lifetime,
cleanup, budget, and mutation semantics to the canonical search raw runtime. No
provider/supervisor/bridge/orchestrator behavior leaks (source-surface test
enforces the forbiddens, including cross-track extract and orchestrator
references).

## 3. Local-only boundary

The source imports only `@embedpdf/pdfium` and the search raw runtime, and
contains no asset-path resolution, file reads, URLs, workers, or network access.

## 4. Exact package and toolchain identities

```text
NODE_VERSION = v22.22.3
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_PACKAGE_DEPENDENCIES = undefined
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
PDFIUM_WASM_BYTES = 4633788
```

No dependency acquisition, package-manager action, lockfile mutation, or
network fetch; no `node_modules` materialization in the candidate diff. Node
truth recorded as executed per governance (no normative v24.20.0 gate).

## 5. Bounded local WASM execution

As with the select binding unit, delegation and fail-closed mismatch properties
are observable only through the real initializer: one successful search
extraction (adopted WASM + ordinary-minimal fixture PDF with query `Sign`,
proving init/raw delegation, query/budget propagation, byte preservation,
non-mutation: `queryLength` 4, `matchCount` 1, exact `[{ index: 0, length: 4 }]`), one
mismatched-WASM rejection with no success published, one corrupt-PDF structured
rejection with no `matches` publication.

```text
WASM_INSTANTIATION_OBSERVED = BOUNDED_LOCAL (adopted package + fixture bytes only)
NETWORK_ATTEMPTS_OBSERVED = NONE
```

## 6. Focused binding qualification

```text
FOCUSED_TESTS = 11
FOCUSED_PASS = 11
FOCUSED_FAIL = 0
```

Coverage: export surface/frozen; source boundary; no upper-layer or cross-track
leakage; exact package/WASM identity; malformed/accessor/extra/missing/symbol
envelopes; byte-view validation; page/query/match-budget validation with search
field messages; real delegation with preservation; WASM-mismatch fail-closed;
corrupt-PDF structured rejection.

## 7. Complete applicable provider qualification

```text
TOTAL_TESTS = 813
PASS = 813
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
SEARCH_BINDING_SOURCE_SHA256 = 00b7ef68efc2902e33e5cd4a8615db6726c4B59333433e79cc4bbd61a77bf798
SEARCH_BINDING_TEST_SHA256 = 7e7eecc98f30cef8e676daa6cb3fa13f8e6e5dbfc92fd2a7899a114c371b1430
PROVIDERS_PACKAGE_JSON_SHA256 = 1656e8410356adb5a377c0c8effb6da3755c32b08f4b8c992fcaff7c5f61be54
```

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded binding connects the exact adopted
PDFium package initializer to the canonical raw search runtime with
caller-supplied bytes under exact envelope validation, verified package/WASM
identity, and observed fail-closed mismatch behavior.

It does not prove provider wiring, supervision/orchestration integration,
facade composition, select/text correctness beyond the mirrored discipline,
metadata correctness, worker integration, or native/server parity.

## 10. Explicit non-grants

```text
TEXT_SEARCH_FACADE = NOT_AUTHORIZED
TEXT_SEARCH_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SEARCH_SUPERVISOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SEARCH_BRIDGE_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SEARCH_ORCHESTRATOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
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
