# PDF_EXTRACT_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / EXTRACT_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the post-#300 successor reconciliation `github:issue-comment:5713628507`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the fourth and final 004D operation: page extraction as
subset selection over the reorder-proven import mechanism. On canonical closure
of this unit, `004D_PAGE_TRANSFORMS = COMPLETE` is established.

```text
UNIT = PDF_EXTRACT_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 1ce689bfa09409af31f424957384887a73b519ef
CANONICAL_BASE_TREE = 1100c3d1d09fe032698f8ee1435ac492f1abdcee
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = extractPdfPagesWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-extract-runtime.js
packages/providers/test/pdf-extract-runtime.test.js
specs/004-local-pdf-core/pdf-extract-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `extractPdfPagesWithLocalWasm` and the frozen
`EXTRACT_RESOURCE_BUDGETS` constant, and nothing else. The module object is
frozen.

`pageIndices` selects a subset: a plain non-empty array of distinct in-range
0-based source indices in the requested output order (length 1..pageCount).
Duplicates are rejected so output lineage stays injective (output page `i`
came from source `pageIndices[i]`); omissions are the defined extract
semantic, unlike reorder which requires a bijection. Empty selections fail as
invalid input. Output is single and all-or-nothing; multi-output split
semantics belong to 004E and partial-success is recorded N/A here.

Mechanism, validation, budgets, error mapping, and security discipline mirror
the reorder grain exactly (CreateNewDocument + DataView-marshaled
`FPDF_ImportPagesByIndex` + target-count proof + `PDFiumExt` writer save of
the target; both documents closed on all paths; 64 MiB budgets; 004A error
vocabulary; `AggregateError` discipline; no retry; node:crypto + node:util
only; no MovePages/range-string/Delete/version-stamp surface). No revision is
minted; no preservation fields exist.

## 3. Focused extract qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface; proxy/unknown-key rejection before effects
subset import in requested order with marshaled-array read-back and lifecycle order
duplicate/empty/out-of-range/overlong selections fail with zero import calls
import-false closes both documents and publishes nothing
unopenable input with last-error; save/readout/size failures publish nothing
budgets; cleanup aggregation; mid-run mutation fails closed; no retry
single-import-path static surface
real [2,0] subset with [gamma, alpha] text-order proof
real full-set and single-page extractions
real invalid selections/malformed/non-PDF failures
real signed-structure extraction with evidence and no preservation claim
real active-content extraction; independent inspect + render; caller bytes unchanged
```

Focused results:

```text
FOCUSED_TESTS = 15
FOCUSED_PASS = 15
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 43696944ee761675ade8065f5ea639f913679c5bf252774ace70667a6aa91bfa
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 4. Network-denied execution evidence

Same external deny preload method as prior grains.

```text
NETWORK_TESTS = 15
NETWORK_PASS = 15
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = b60cc7a683544585d44bda0d1095e23af30b97b6337870f227a5d879fa208b79
NETWORK_STDOUT_SHA256 = eb68988bcf32636cdb319dd086eb7bcac156ba5c7bf7d7b39e1334e690682e78
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 5. Complete applicable provider qualification

```text
TOTAL_TESTS = 1044
PASS = 1044
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = 2861703bed6d78fccecfd23f338cb25dccc8c628aee6c0916811d0cda7ee7de3
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 6. Candidate file identities

```text
EXTRACT_SOURCE_SHA256 = 432969111ce62e026ac18b496e1466ec1acb95fc17110109df4be4dc392f5417
EXTRACT_TEST_SHA256 = 6982e68b4c3f209b73fa67bc1ceb10aafdd306aa9daf4c5337c8e8813697f0bc
PROVIDERS_PACKAGE_JSON_SHA256 = d0313589c6d9661c33e3e824220b9804f6cca4c3b45779bb11353bad6a7912cc
```

The package-manifest change only appends `test/pdf-extract-runtime.test.js`.
It changes no dependency declaration.

## 7. Exact qualification claim

This candidate proves only that subset page extraction over the exact adopted
runtime imports the requested distinct pages in order into a new document,
exports it through the save-completion boundary with a new digest and lineage
evidence, validates order through independent canonical text extraction, and
publishes nothing on any failure path without an observed network attempt.

It does not prove multi-output split, supervision layers, revision minting,
signature preservation, corpus-wide compatibility, performance bounds, or
native/server parity.

## 8. Explicit non-grants

```text
MULTI_OUTPUT_SPLIT = NOT_AUTHORIZED (single output only; 004E scope)
PERMUTATION_PLUS_DUPLICATES = NOT_AUTHORIZED / REJECTED
MUTATION_SUPERVISION_COMPOSITION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004E_K = NOT_AUTHORIZED (beyond 004D)
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 9. Merge and successor gates

Same gates as prior grains on the four authorized paths. No successor
authority is inherited from this document; the 004E successor reconciliation
follows canonical closure separately.

The final document SHA-256 is recorded in external GitHub qualification
evidence after the file is complete; the document does not contain a
self-referential digest.
