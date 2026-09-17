# PDF_TEXT_SELECT_V1 Semantic Composer Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / FAKE_CONTROL_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5712514739`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This bounded unit implements the canonical `PDF_TEXT_SELECT_V1` browser semantic
provider composer `composePdfTextSelectResult`, mirroring the canonical
`PDF_TEXT_V1` provider composer discipline over the canonical select raw
runtime observations. It composes deterministic completion carrying revalidated
selection evidence, qualified PDFium format rejection, and shape-validated
terminal evidence into canonical results.

It does not execute PDFium, WASM, a browser, a worker, a real timer, a resource
meter, the supervisor, or any document-processing network path. Qualification
uses deterministic injected evidence and canonical fixture bytes only.

```text
UNIT = PDF_TEXT_SELECT_V1_SEMANTIC_COMPOSER_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = a8c03b1cf245bedc337141484e5ceac4d440acbb
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-select-provider.js
packages/providers/test/pdf-text-select-provider.test.js
specs/004-local-pdf-core/pdf-text-select-v1-semantic-composer-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new provider test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

`composePdfTextSelectResult({ bytes, request, availability, textEvidence,
terminalOutcomeEvidence })` mirrors `composePdfTextResult`:

- exact request validation with select capability parameters (`pageIndex`,
  `startIndex`, `selectCount`, `maxRects`), exact byte-identity binding, and
  canonical document-revision input binding;
- select capability `PDF_TEXT_SELECT_V1` / `signthos.pdf.text.select.v1`
  (no text capability reuse);
- success requires the exact eleven select keys with non-negative safe
  `pageIndex`/`pageCount`/`charCount`/`startIndex`/`selectCount`/`rectCount`,
  strict boolean `rectsTruncated`/`unicodeMapError`, string `text` whose length
  equals `selectCount`, selection range within the page character count, and
  rect truthfulness (`rectsTruncated === (rectCount > maxRects)`,
  `rects.length` equals shown rects, every rect an exact finite
  `{left,top,right,bottom}` with `left <= right`);
- page/start/count binding: evidence `pageIndex`/`startIndex`/`selectCount`
  must equal the request parameters, else binding mismatch;
- rejection requires exactly `openSucceeded = false` with `pdfiumLastError = 3`
  (the provider-pinned `FPDF_ERR_FORMAT`) with provider diagnostics;
- terminal evidence uses the select schema
  `signthos.pdf.text.select.runtime-terminal.v1` with select runtime error
  codes; availability/evidence conflict and binding semantics mirror the text
  provider;
- success observations carry page/count/char/start/count/rect fields,
  `textLength`, UTF-8 `textDigest`, frozen `rects` copy, and empty warnings;
  raw `text` is never published (privacy, mirroring text provider).

No select runtime, supervisor, bridge, orchestrator, binding, or facade is
modified or invoked by this unit.

## 3. Local-only boundary

The source imports only content-identity admission and the PDFium structural
evidence descriptor, and contains no reference to any of: select raw runtime
imports, `@embedpdf/pdfium` imports, `WebAssembly`, asset URLs, `fetch`,
workers, `child_process`, `node:fs`/`node:path`, timers, URLs, or CDN paths
(enforced by the source-surface test).

## 4. Exact package and toolchain identities

```text
NODE_VERSION = v22.22.3
```

Node-version note: canonical governance states no Node version requirement;
`24.20.0` in the 004C1Z record is the future resolver-execution-environment
baseline, not a provider-qualification gate. Qualification records the actually
executed runtime; identical test counts are not claimed as environment
equivalence. No dependency acquisition, package-manager action, lockfile
mutation, or network fetch occurred; no `node_modules` materialization is part
of the candidate diff.

## 5. No real runtime execution

`REAL_RUNTIME_EXECUTION` is not part of this unit: no test path instantiates
PDFium WASM or invokes any runtime. All evidence is injected; all behavior is
deterministic composition.

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

Coverage: export surface/descriptor; canonical success with digest + rects;
truncated-rect composition; format-rejection diagnostics; capability/version/
identity mismatch taxonomy; availability fail-closed; byte/param defects;
page/start/count binding mismatches; range, text-length, shape, and rect
truthfulness defects; astral-plane digest; rejection defects; custom-prototype/
accessor/proxy matrices with zero getter/trap execution; read-only composition;
deep freeze with no signature/safety claims; all-fixture identity; non-Buffer
and revision-id defects; unknown-field rejection; terminal outcomes, binding
matrix, conflicts, attack matrices, non-mutation; source boundary.

## 7. Complete applicable provider qualification

The complete canonical provider suite, including the new provider test file as a
separately expanded argument, passed under the exact Node executable with the
exact adopted package exposed through an external `NODE_PATH`. No
`node_modules` materialization is part of the candidate repository diff.

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 601
PASS = 601
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
SELECT_PROVIDER_SOURCE_SHA256 = 25a1b581a14b707a153672e0567846b2d9fe7dab4ba39d2c5509acdb1fe70397
SELECT_PROVIDER_TEST_SHA256 = a24d138c294b9ea706433e520fd54f4639e99200cb84fc1808d096b9ce95c6f2
PROVIDERS_PACKAGE_JSON_SHA256 = 2a05fae2c69fbb8b3da4259f48b2843a5256f00ff90ced62eec04d83f739dac2
```

The package-manifest change only appends `test/pdf-text-select-provider.test.js`
to the existing provider test command. It changes no dependency declaration.

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded select semantic composer validates
select observations and terminal evidence into canonical results under exact
request, binding, truthfulness, and fail-closed attack-surface validation.

It does not prove select supervision, bridging, orchestration, binding, facade,
real runtime execution, search/metadata correctness, worker integration, or
native/server parity.

## 10. Explicit non-grants

```text
TEXT_SELECT_SUPERVISOR = NOT_AUTHORIZED
TEXT_SELECT_BRIDGE = NOT_AUTHORIZED
TEXT_SELECT_ORCHESTRATOR = NOT_AUTHORIZED
TEXT_SELECT_BINDING = NOT_AUTHORIZED
TEXT_SELECT_FACADE = NOT_AUTHORIZED
TEXT_SELECT_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
SEARCH_PROVIDER = NOT_AUTHORIZED
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
