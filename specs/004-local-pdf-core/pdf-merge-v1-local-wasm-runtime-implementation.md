# PDF_MERGE_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / MERGE_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the post-extract successor reconciliation `github:issue-comment:5713776004`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the first 004E grain: two-document merge over the exact
adopted PDFium package runtime, reusing the reorder/extract import mechanism
with multi-input binding, deterministic input ordering, and per-input lineage.

```text
UNIT = PDF_MERGE_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 7ccf69f0e9c9bedc75b14223f18ab8bb0c1cd6ff
CANONICAL_BASE_TREE = 200dd92a10b9ece407710f7366077d1b9eb7782f
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = mergePdfDocumentsWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-merge-runtime.js
packages/providers/test/pdf-merge-runtime.test.js
specs/004-local-pdf-core/pdf-merge-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `mergePdfDocumentsWithLocalWasm` and the frozen
`MERGE_RESOURCE_BUDGETS` constant, and nothing else. The module object is
frozen.

`bytesList` holds EXACTLY 2 inputs: a plain non-proxy array read through
per-index data descriptors (element getters never invoked), each entry a
non-empty byte view. N-way merge is an explicit successor. Caller-side
authorization of every input is a recorded precondition owned by a later
layer; this runtime binds both exact digests in array order and reads nothing
else.

Its implementation:

- accepts exactly one plain-object argument with exactly the own data keys
  `bytesList`, `wasmBinary`, `initPdfium`, with the established
  strict/proxy/accessor rejection;
- budget-checks BOTH inputs before init; snapshots both inputs and the WASM
  bytes; operates the initializer on a private WASM copy;
- opens input 0 then input 1; a second-open failure closes the first document
  and publishes nothing (slot-tagged errors: `input 0` / `input 1`);
- reads both page counts and signature counts; creates the target; imports ALL
  of input 0 at position 0 and ALL of input 1 at position nA, each import
  gated by BOTH the provider boolean and a count-delta proof, with the index
  array freed on all paths;
- captures the output signature count; saves the TARGET through the adopted
  `PDFiumExt` writer path; copies output bytes out; closes writer, all three
  documents, and every allocation on all paths (input allocations held until
  their documents close, per the `FPDF_LoadMemDocument` lifetime contract);
- returns one frozen result (`succeeded`, frozen `inputByteLengths[2]`,
  frozen sha256 `inputDigests[2]`, frozen `inputPageCounts[2]`, frozen
  `inputSignatureCounts[2]`, `pageCount`, `outputSignatureCount`,
  `signatureStructurePresent` (either input), caller-owned `outputBytes` +
  length + sha256 `outputDigest`, frozen `providerIdentity`); throws with
  nothing published on every failure path;
- enforces the shared 64 MiB input/output budgets (own frozen export);
- preserves primary + cleanup failures per the canonical `AggregateError`
  discipline; never retries; never mints revisions; carries no preservation
  fields.

Allocation-lifetime note (first-hand): `FPDF_LoadMemDocument` requires the
source buffer to remain valid for the document lifetime. This runtime holds
both input allocations until their documents close. An earlier shaping probe
that freed early observed shell-only imports; that observation is void and is
not relied upon anywhere in this unit.

`FPDF_MovePages`, range-string import, Delete, and version-stamp APIs are all
absent from the source.

Stable error mapping (004A sections 10-11 vocabulary):

```text
options/list/wasm/init shape violations -> INPUT_REJECTED / PDF_INPUT_INVALID
either input over budget -> RESOURCE_LIMIT_EXCEEDED / PDF_RESOURCE_LIMIT_EXCEEDED
either input fails to open (incl. password-required, last-error 4) ->
  INPUT_REJECTED / PDF_INPUT_INVALID (slot-tagged)
import boolean false / count mismatch -> FAILED / PDF_OUTPUT_VALIDATION_FAILED
save/readout/size failures -> FAILED / PDF_OUTPUT_VALIDATION_FAILED
output over budget -> RESOURCE_LIMIT_EXCEEDED / PDF_RESOURCE_LIMIT_EXCEEDED
caller mutation mid-run (per-input tagged) -> FAILED / PDF_OUTPUT_VALIDATION_FAILED
cleanup failures -> FAILED (+ preserved AggregateError entries)
```

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports; no package import in src; no
network/asset/active-content identifiers (static assertions in the suite).
Test-time encrypted bytes are generated in-test from the ordinary-minimal
fixture with synthetic password constants that never reach logs or evidence;
no encrypted material is checked into the repository.

## 4. Focused merge qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface (exactly-2 list); proxy/accessor/unknown-key rejection
both-inputs import order with marshaled-array read-back and lifecycle order
second-open failure closes first with no target creation
import-false/count-mismatch close all documents and publish nothing
first/second/both slot open failures with slot-tagged errors
save/readout/size failures publish nothing; budgets; aggregation; no retry
mid-run mutation of either input fails closed with slot tag
single-import-path static surface
real [ordinary, 3-page] merge with [Signthos, alpha, beta, gamma] order proof
real reversed merge with reversed order proof (deterministic input ordering)
real signed merge with output-sig-0 evidence and no preservation claim
real active-content merge; real encrypted-input fail-closed both slots;
  real malformed slot failures; independent inspect + render + metadata
  characterization (PDFium-stamped doc-info, informational); inputs unchanged
```

Focused results:

```text
FOCUSED_TESTS = 16
FOCUSED_PASS = 16
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 2004b95dcab4ae3f2b32f0f9bcee1a5d4dced37871ea0c1c4beb73238d55e6dd
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 5. Network-denied execution evidence

Same external deny preload method as prior grains.

```text
NETWORK_TESTS = 16
NETWORK_PASS = 16
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = b60cc7a683544585d44bda0d1095e23af30b97b6337870f227a5d879fa208b79
NETWORK_STDOUT_SHA256 = 4481347afc416aa826ce093e0795636fc5d8deae76805ffc4b78ca004eb2e21a
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1061
PASS = 1061
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = e275d7bc9bebb4fd9c553f79dc72bbff3b835401ab334c01ac9d1c8d358513bf
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
MERGE_SOURCE_SHA256 = 2581b6012ca4fe729b495d620bc5263b6ce183d2305d25d4ea80144870323367
MERGE_TEST_SHA256 = 939e81f38b12851d3da59d3a1fa3605d3659af1530e48963e87e3c06a91ae224
PROVIDERS_PACKAGE_JSON_SHA256 = ee5c7fef353196536c7216c85f79893ee746d46de4559830ac2edc059f40e1f2
```

The package-manifest change only appends `test/pdf-merge-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that two-document merge over the exact adopted
runtime binds both exact input identities in order, imports all pages of each
in sequence into a new document, exports it through the save-completion
boundary with a new digest and lineage evidence, validates order through
independent canonical text extraction, fails closed on encrypted/malformed
inputs per slot, and publishes nothing on any failure path without an
observed network attempt.

It does not prove N-way merge, split, supervision layers, revision minting,
signature preservation, metadata carry, corpus-wide compatibility,
performance bounds, or native/server parity.

## 9. Explicit non-grants

```text
N_WAY_MERGE = NOT_AUTHORIZED (exactly 2 inputs)
SPLIT = NOT_AUTHORIZED
MUTATION_SUPERVISION_COMPOSITION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
METADATA_CARRY_CLAIM = NOT_AUTHORIZED / NOT_MADE (PDFium-stamped, informational)
FPDF_MovePages_USE = NOT_AUTHORIZED / NOT_USED
SPECIFICATION_005 = NOT_AUTHORIZED
004F_K = NOT_AUTHORIZED (beyond 004E-merge)
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 10. Merge and successor gates

Same gates as prior grains on the four authorized paths. No successor
authority is inherited from this document.

The final document SHA-256 is recorded in external GitHub qualification
evidence after the file is complete; the document does not contain a
self-referential digest.
