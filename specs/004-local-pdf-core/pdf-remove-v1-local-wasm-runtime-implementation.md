# PDF_REMOVE_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / REMOVE_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the post-#299 successor reconciliation `github:issue-comment:5713594594`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the third canonical `REVISION_CREATING` grain: single-page
removal over the exact adopted PDFium package runtime. It reuses the
rotate/reorder revision-creation contract and adds destructive-mutation
discipline (target validation before any Delete call, exact count-decrement
proof, silent no-op detection) plus explicit 0-page degenerate semantics.

```text
UNIT = PDF_REMOVE_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 98e63fd01b06e775e62573e8dc08a60b6d9e9177
CANONICAL_BASE_TREE = e4532250320b6af73b114df7d77cdafe1607687b
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = removePdfPageWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-remove-runtime.js
packages/providers/test/pdf-remove-runtime.test.js
specs/004-local-pdf-core/pdf-remove-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `removePdfPageWithLocalWasm` and the frozen
`REMOVE_RESOURCE_BUDGETS` constant, and nothing else. The module object is
frozen.

Its implementation:

- accepts exactly one plain-object argument with exactly the own data keys
  `bytes`, `wasmBinary`, `initPdfium`, `pageIndex`, with the established
  strict/proxy/accessor rejection;
- validates `pageIndex` against the observed page count BEFORE any
  `FPDFPage_Delete` call; out-of-range targets fail with the document still
  closed cleanly and nothing published (event-level proof in tests);
- deletes exactly once, then proves the effect by re-reading the page count
  (must equal before-minus-one; a silent no-op fails closed);
- captures source and output signature counts; saves through the adopted
  `PDFiumExt` writer path; frees all allocations; closes writer/document;
- returns one frozen result (`succeeded`, `inputByteLength`, sha256
  `inputDigest`, `pageIndex`, `pageCountBefore/After`, source
  `signatureCount`, `outputSignatureCount`, `signatureStructurePresent`,
  caller-owned `outputBytes` + length + sha256 `outputDigest`,
  `providerIdentity`); throws with nothing published on every failure path;
- enforces the shared 64 MiB input/output budgets (own frozen export);
- preserves primary + cleanup failures per the canonical `AggregateError`
  discipline; never retries.

0-page degenerate semantics (first-hand): deleting the sole page yields a
valid revision candidate (316 output bytes on the ordinary-minimal fixture,
re-opens with page count 0). Validation for 0-page outputs is inspect-only;
no text or render claims exist for them. This is explicit contract, not silent
degradation.

`FPDF_MovePages`, `FPDF_ImportPages*`, and `FPDF_SaveWithVersion` are all
absent from the source. No revision is minted; no preservation fields exist.

Stable error mapping (004A sections 10-11 vocabulary):

```text
options/shape violations -> INPUT_REJECTED / PDF_INPUT_INVALID
input over budget -> RESOURCE_LIMIT_EXCEEDED / PDF_RESOURCE_LIMIT_EXCEEDED
document fails to open -> INPUT_REJECTED / PDF_INPUT_INVALID
pageIndex out of range -> INPUT_REJECTED / PDF_INPUT_INVALID
count not decreased -> FAILED / PDF_OUTPUT_VALIDATION_FAILED
save/readout/size failures -> FAILED / PDF_OUTPUT_VALIDATION_FAILED
output over budget -> RESOURCE_LIMIT_EXCEEDED / PDF_RESOURCE_LIMIT_EXCEEDED
caller mutation mid-run -> FAILED / PDF_OUTPUT_VALIDATION_FAILED
cleanup failures -> FAILED (+ preserved AggregateError entries)
```

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports; no package import in src; no
network/asset/active-content identifiers (static assertions in the suite).

## 4. Focused remove qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface; proxy/unknown-key rejection before effects
single Delete call with before/after count proof; silent no-op detection
out-of-range target with zero Delete calls and clean close
unopenable input with last-error; save/readout/size failures publish nothing
budgets; cleanup aggregation; mid-run mutation fails closed; no retry
source/import allowlist static surface
real remove-1 on the 3-page fixture with [alpha, gamma] text-order proof
real sole-page removal with inspect-valid 0-page output
real out-of-range/malformed/non-PDF failures
real signed-structure sole removal with evidence and no preservation claim
real active-content sole removal with inspect-valid 0-page output
independent inspect + render validation; caller bytes unchanged everywhere
```

Focused results:

```text
FOCUSED_TESTS = 17
FOCUSED_PASS = 17
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = fff5e32106501070add353d46db1295c9e9f17ca5140772aa4aba32d4730ec86
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 5. Network-denied execution evidence

Same external deny preload method as prior grains.

```text
NETWORK_TESTS = 17
NETWORK_PASS = 17
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = b60cc7a683544585d44bda0d1095e23af30b97b6337870f227a5d879fa208b79
NETWORK_STDOUT_SHA256 = e53119553ed0c98bdf25a6d8975e5a8fdded2c564150d02ab3065b68c24689c4
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1029
PASS = 1029
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = f5c43b92678f1637df4bf3b2589ec2e943e8d1c9b467ed89c5ef94866c78aa8c
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
REMOVE_SOURCE_SHA256 = 060824023959af2df0c173396abea6358f82ef2dd979addec20d5ab210f806b3
REMOVE_TEST_SHA256 = a80e3e6159fec11067b2776433b041834cfc1d9e576be53fa8dc81caae72bb9b
PROVIDERS_PACKAGE_JSON_SHA256 = a84156e17afd8edd298d132950c459e014c1ec4213fcc401ea07ba85d0e554c2
```

The package-manifest change only appends `test/pdf-remove-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that single-page removal over the exact adopted
runtime deletes the validated target exactly once, exports the result through
the save-completion boundary with a new digest and lineage evidence, validates
through independent canonical paths (including the explicit 0-page contract),
carries signature evidence without preservation claims, and publishes nothing
on any failure path without an observed network attempt.

It does not prove extract, supervision layers, revision minting, signature
preservation, corpus-wide compatibility, performance bounds, or native/server
parity.

## 9. Explicit non-grants

```text
EXTRACT = NOT_AUTHORIZED
MOVE_OR_IMPORT_USE = NOT_AUTHORIZED / NOT_USED
MUTATION_SUPERVISION_COMPOSITION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
ZERO_PAGE_TEXT_OR_RENDER_CLAIMS = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004E_K = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 10. Merge and successor gates

Same twelve gates as prior grains on the four authorized paths of this unit.
No successor authority is inherited from this document.

The final document SHA-256 is recorded in external GitHub qualification
evidence after the file is complete; the document does not contain a
self-referential digest.
