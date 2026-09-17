# PDF_METADATA_READ_V1 Semantic Composer Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / FAKE_CONTROL_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5713115354`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This bounded unit implements the canonical `PDF_METADATA_READ_V1` browser
semantic provider composer `composePdfMetadataResult`, mirroring the
canonical inspect-provider document-level request discipline and the
canonical text-search evidence-classification discipline over the canonical
metadata raw runtime observations. It composes deterministic completion
carrying revalidated Info-dictionary evidence, qualified PDFium format
rejection, and shape-validated terminal evidence into canonical results.

It does not execute PDFium, WASM, a browser, a worker, a real timer, a resource
meter, the supervisor, or any document-processing network path. Qualification
uses deterministic injected evidence and canonical fixture bytes only.

```text
UNIT = PDF_METADATA_V1_SEMANTIC_COMPOSER_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = bc5f681bf187dbd4c7d0c4e3441cfc378d14ca77
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-metadata-provider.js
packages/providers/test/pdf-metadata-provider.test.js
specs/004-local-pdf-core/pdf-metadata-v1-semantic-composer-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new provider test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

`composePdfMetadataResult({ bytes, request, availability, metadataEvidence,
terminalOutcomeEvidence })` mirrors `composePdfTextSearchResult` with the
document-level request shape of the inspect provider:

- exact request validation with EMPTY capability parameters (document-level
  read of a fixed eight-tag vocabulary; `exactOwnKeys(params, [])` per the
  inspect-provider precedent — any caller-supplied tag, page, or option field
  fails the request closed), exact byte-identity binding, and canonical
  document-revision input binding;
- metadata capability `PDF_METADATA_READ_V1` / `signthos.pdf.metadata.read.v1`
  (no text/search/select capability reuse);
- success requires exactly `{ openSucceeded: true, metadata }` where
  `metadata` carries exactly the eight runtime fields (`title`, `author`,
  `subject`, `keywords`, `creator`, `producer`, `creationDate`, `modDate`),
  each `string`-or-`null` (explicit absence stays `null`; no empty-string
  guessing, no caller-controlled tag path — the fixed vocabulary is unchanged
  from the runtime);
- rejection requires exactly `openSucceeded = false` with `pdfiumLastError = 3`
  (`FPDF_ERR_FORMAT`) with provider diagnostics;
- terminal evidence uses the metadata schema
  `signthos.pdf.metadata.read.runtime-terminal.v1` with metadata runtime error
  codes; conflict/binding semantics mirror the search provider;
- success observations echo the eight metadata fields (copied out of the
  evidence container, never referenced) plus empty warnings.

No metadata runtime, supervisor, bridge, orchestrator, binding, or facade is
modified or invoked by this unit.

## 3. Local-only boundary

The source imports only content-identity admission and the PDFium structural
evidence descriptor, and contains no reference to any of: metadata raw runtime
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
FOCUSED_TESTS = 31
FOCUSED_PASS = 31
FOCUSED_FAIL = 0
```

Coverage: export surface/descriptor with the frozen eight-field vocabulary;
all-absent success with explicit nulls; positive and partial stub metadata;
format-rejection diagnostics; capability/version/identity taxonomy;
availability fail-closed; byte-identity defects; document-level empty-params
enforcement (tag/page/option/null/string defects); success-shape defect matrix
including missing fields and hostile value types; metadata accessor/proxy
matrices with zero getter/trap execution; rejection defects; request
prototype/accessor/proxy matrices with zero getter/trap execution; read-only
composition; deep freeze with no safety claims; all-fixture identity;
revision-id defects; unknown-field rejection; terminal
outcomes/binding/conflicts/attack-matrices/non-mutation; source boundary.

## 7. Complete applicable provider qualification

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 865
PASS = 865
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
METADATA_PROVIDER_SOURCE_SHA256 = 83ed3f9361e92c1be007c000f90ae3795fa5d9b20e350fdde2ae7fc4e61137d0
METADATA_PROVIDER_TEST_SHA256 = 899738822e1dd0a71b4f293f081ed44619bd9f5969ed006c5de9440158da7d80
PROVIDERS_PACKAGE_JSON_SHA256 = bc92000779bb4deb48a9c1b783fc70d58fdd77d14660a03795e98215ea1760ad
```

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded metadata semantic composer validates
metadata observations and terminal evidence into canonical results under exact
document-level request, fixed-vocabulary, absence-explicit, and fail-closed
attack-surface validation.

It does not prove metadata supervision, bridging, orchestration, binding,
facade, real runtime execution, metadata write behavior, XMP behavior,
page-box behavior, worker integration, or native/server parity.

## 10. Explicit non-grants

```text
METADATA_SUPERVISOR = NOT_AUTHORIZED
METADATA_BRIDGE = NOT_AUTHORIZED
METADATA_ORCHESTRATOR = NOT_AUTHORIZED
METADATA_BINDING = NOT_AUTHORIZED
METADATA_FACADE = NOT_AUTHORIZED
METADATA_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_WRITES_XMP = NOT_AUTHORIZED / NOT_IMPLEMENTED
PAGE_BOX_APIS = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SEARCH_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
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
