# PDF_TEXT_SEARCH_V1 Runtime Supervisor Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / FAKE_CONTROL_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5712785680`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This bounded unit implements the canonical `PDF_TEXT_SEARCH_V1` runtime
supervisor `supervisePdfTextSearchRuntime`, mirroring the canonical select
supervisor discipline (including disposal-before-mutation) over the search raw
runtime grammar. It drives one injected runtime to deterministic completion
carrying a revalidated search observation, or to confirmed termination carrying
shape-validated terminal evidence.

It does not execute PDFium, WASM, a browser, a worker, a real timer, a resource
meter, or any document-processing network path. Qualification uses deterministic
injected runtimes and synthetic bytes only.

```text
UNIT = PDF_TEXT_SEARCH_V1_RUNTIME_SUPERVISOR_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 6d18c93135521c90ad02ef602c1e8198e1fc1d8c
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-search-runtime-supervisor.js
packages/providers/test/pdf-text-search-runtime-supervisor.test.js
specs/004-local-pdf-core/pdf-text-search-v1-runtime-supervisor-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new supervisor test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

`supervisePdfTextSearchRuntime({ bytes, runtimeBinding, runRuntime,
terminalControl, terminateRuntime })` mirrors `supervisePdfTextSelectRuntime`
with the search grammar: exact eight-key success validation (safe page/char/
query/match integers with positive `queryLength`, strict `matchesTruncated`,
non-proxy match array of exact `{index,length}` items with safe non-negative
index and positive length), rejection pinned to `FPDF_ERR_FORMAT` code 3,
search-schema terminal evidence from the normalized binding, and the identical
subscribe/race/terminate/dispose lifecycle with disposal-before-mutation
checks. Match range adjudication (`index + length <= charCount`) remains owned
by the provider composer; the supervisor validates shape only.

No search provider, bridge, orchestrator, binding, facade, or raw runtime is
modified or invoked by this unit.

## 3. Local-only boundary

The source imports only content-identity admission and the search provider
constants, calls no runtime/provider/composer, and contains no reference to
any of: `@embedpdf/pdfium`, search raw runtime imports, provider composition
calls, asset URLs, CDN hosts, `fetch`, workers, `WebAssembly`, `PDFiumExt_Init`/
`FPDF_`, `child_process`, timers, or URLs (enforced by the source-surface
test).

## 4. Exact package and toolchain identities

```text
NODE_VERSION = v22.22.3
```

Node-version note: canonical governance states no Node version requirement;
qualification records the actually executed runtime; identical test counts are
not claimed as environment equivalence. No dependency acquisition,
package-manager action, lockfile mutation, or network fetch occurred; no
`node_modules` materialization is part of the candidate diff.

## 5. No real runtime execution

```text
WASM_INSTANTIATION_OBSERVED = NONE
NETWORK_ATTEMPTS_OBSERVED = NONE
```

## 6. Focused supervisor qualification

```text
FOCUSED_TESTS = 27
FOCUSED_PASS = 27
FOCUSED_FAIL = 0
```

Coverage mirrors the select supervisor suite with search observations: frozen
completion/rejection/empty-match envelopes; all three terminal outcomes with
exact evidence and late-resolution stability; synchronous snapshotting;
first-signal-wins; sync-terminal suppression; late-rejection hygiene;
termination failure/confirmation defects; executor propagation; 24-case
malformed observation matrix; pre-registration binding validation; binding
attack matrix with zero getter/trap execution; null-prototype acceptance;
executor/disposer mutation detection; disposal-failure combination; invalid
terminal events; non-mutation; export surface; source boundary.

## 7. Complete applicable provider qualification

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 761
PASS = 761
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
SEARCH_SUPERVISOR_SOURCE_SHA256 = bf14ef2691d83c1471a100ccdfb1dd3656ce765b26f5a988298a60b954813d99
SEARCH_SUPERVISOR_TEST_SHA256 = 2997aacd12870bf88e042138dce9f512536bfbb4aa2f4271026f71c4a4d07452
PROVIDERS_PACKAGE_JSON_SHA256 = 735d0e7fa81d3b8efa68cc31865ef5b7ae103035f9633a8e6c3e91437387cd7a
```

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded search supervisor drives one injected
runtime to validated completion or confirmed termination under exact binding,
fail-closed lifecycle, disposal-before-mutation, and attack-surface validation.

It does not prove search bridging, orchestration, binding, facade, real runtime
execution, metadata correctness, worker integration, or native/server parity.

## 10. Explicit non-grants

```text
TEXT_SEARCH_BRIDGE = NOT_AUTHORIZED
TEXT_SEARCH_ORCHESTRATOR = NOT_AUTHORIZED
TEXT_SEARCH_BINDING = NOT_AUTHORIZED
TEXT_SEARCH_FACADE = NOT_AUTHORIZED
TEXT_SEARCH_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SEARCH_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_SUPERVISOR = NOT_AUTHORIZED
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
