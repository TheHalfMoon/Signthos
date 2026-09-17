# PDF_TEXT_SEARCH_V1 Semantic Composer Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / FAKE_CONTROL_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5712744104`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This bounded unit implements the canonical `PDF_TEXT_SEARCH_V1` browser
semantic provider composer `composePdfTextSearchResult`, mirroring the
canonical select provider composer discipline over the canonical search raw
runtime observations. It composes deterministic completion carrying revalidated
match evidence, qualified PDFium format rejection, and shape-validated terminal
evidence into canonical results.

It does not execute PDFium, WASM, a browser, a worker, a real timer, a resource
meter, the supervisor, or any document-processing network path. Qualification
uses deterministic injected evidence and canonical fixture bytes only.

```text
UNIT = PDF_TEXT_SEARCH_V1_SEMANTIC_COMPOSER_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 842c99098cd53c2621037405290201381aff8349
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-search-provider.js
packages/providers/test/pdf-text-search-provider.test.js
specs/004-local-pdf-core/pdf-text-search-v1-semantic-composer-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new provider test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

`composePdfTextSearchResult({ bytes, request, availability, textEvidence,
terminalOutcomeEvidence })` mirrors `composePdfTextSelectResult`:

- exact request validation with search capability parameters (`pageIndex`,
  `query`, `maxMatches`; query a non-empty string within PDFium int units,
  mirroring the raw runtime's own query rule including whitespace acceptance),
  exact byte-identity binding, and canonical document-revision input binding;
- search capability `PDF_TEXT_SEARCH_V1` / `signthos.pdf.text.search.v1`
  (no select/text capability reuse);
- success requires the exact eight search keys with non-negative safe
  `pageIndex`/`pageCount`/`charCount`/`matchCount`, positive safe
  `queryLength`, strict boolean `matchesTruncated`, query binding via
  `queryLength === query.length` (UTF-16 units on both sides), and match
  truthfulness (`matchesTruncated === (matchCount > maxMatches)`, shown-count
  equality, every match an exact `{index,length}` with safe non-negative
  index, positive length, and `index + length <= charCount` overflow-guarded);
- page binding: evidence `pageIndex` must equal the request parameter, else
  binding mismatch (checked before range adjudication, matching select
  ordering);
- rejection requires exactly `openSucceeded = false` with `pdfiumLastError = 3`
  with provider diagnostics;
- terminal evidence uses the search schema
  `signthos.pdf.text.search.runtime-terminal.v1` with search runtime error
  codes; conflict/binding semantics mirror the select provider;
- success observations carry page/count/char/query/match fields, the frozen
  `matches` copy, and empty warnings; raw query text beyond its length is never
  published.

Two pre-creation test-expectation defects (whitespace-query validity, binding-
before-range ordering) were caught by execution and repaired forward-only: a
whitespace query is a valid request shape per runtime semantics (length-bound),
and param-mismatched evidence is a binding mismatch by contract. No source
changes were needed; no failures suppressed.

No search runtime, supervisor, bridge, orchestrator, binding, or facade is
modified or invoked by this unit.

## 3. Local-only boundary

The source imports only content-identity admission and the PDFium structural
evidence descriptor, and contains no reference to any of: search raw runtime
imports, `@embedpdf/pdfium` imports, `WebAssembly`, asset URLs, `fetch`,
workers, `child_process`, `node:fs`/`node:path`, timers, URLs, or CDN paths
(enforced by the source-surface test).

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

`REAL_RUNTIME_EXECUTION` is not part of this unit.

```text
WASM_INSTANTIATION_OBSERVED = NONE
NETWORK_ATTEMPTS_OBSERVED = NONE
```

## 6. Focused provider qualification

```text
FOCUSED_TESTS = 33
FOCUSED_PASS = 33
FOCUSED_FAIL = 0
```

Coverage: export surface/descriptor; canonical success; truncated/empty match
composition; format-rejection diagnostics; capability/version/identity taxonomy;
availability fail-closed; byte/param defects; page/query binding mismatches;
page/query shape defects; match truthfulness matrix; astral-plane query-length
binding; rejection defects; prototype/accessor/proxy matrices with zero
getter/trap execution; read-only composition; deep freeze with no safety
claims; all-fixture identity; revision-id defects; unknown-field rejection;
terminal outcomes/binding/conflicts/attack-matrices/non-mutation; source
boundary.

## 7. Complete applicable provider qualification

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 734
PASS = 734
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
SEARCH_PROVIDER_SOURCE_SHA256 = d6d3d6f19a031922338a1f2e33b43217ce6d684725a771435fa2e938953e2fdd
SEARCH_PROVIDER_TEST_SHA256 = e1c521b27107f363b1818574ef32669ee0568ceb95d4d7b856711ed3ff9aaf79
PROVIDERS_PACKAGE_JSON_SHA256 = f43e0019d75c50d5fd33350e51264be081aea053fdbd7409fa1e01936e9106f3
```

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded search semantic composer validates
search observations and terminal evidence into canonical results under exact
request, query/page binding, match-truthfulness, and fail-closed attack-surface
validation.

It does not prove search supervision, bridging, orchestration, binding, facade,
real runtime execution, metadata correctness, worker integration, or
native/server parity.

## 10. Explicit non-grants

```text
TEXT_SEARCH_SUPERVISOR = NOT_AUTHORIZED
TEXT_SEARCH_BRIDGE = NOT_AUTHORIZED
TEXT_SEARCH_ORCHESTRATOR = NOT_AUTHORIZED
TEXT_SEARCH_BINDING = NOT_AUTHORIZED
TEXT_SEARCH_FACADE = NOT_AUTHORIZED
TEXT_SEARCH_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SELECT_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_PROVIDER = NOT_AUTHORIZED
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
