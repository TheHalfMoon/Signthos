# PDF_REORDER_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / REORDER_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the post-#298 successor reconciliation `github:issue-comment:5713544418`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the second canonical `REVISION_CREATING` grain: page
reorder as an exact permutation over the exact adopted PDFium package runtime.
It reuses the rotate grain's revision-creation contract (input binding, save
boundary, budgets, atomicity, signature evidence, independent validation) and
adds the two-document import mechanism that the later extract grain will reuse.

```text
UNIT = PDF_REORDER_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 58742ea27490b5cd5a7d01b7ab7c640f3f7390fa
CANONICAL_BASE_TREE = 62b3ea7bbb995401bc36e1c69442286f3739bff4
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 6
EXACT_ENTRY_POINT = reorderPdfPagesWithLocalWasm
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-reorder-runtime.js
packages/providers/test/pdf-reorder-runtime.test.js
specs/004-local-pdf-core/pdf-reorder-v1-local-wasm-runtime-implementation.md
specs/004-local-pdf-core/fixtures/admission/multipage-order-synthetic-v1.pdf
specs/004-local-pdf-core/fixtures/admission/manifest.json
```

## 2. Implementation contract

The runtime exports `reorderPdfPagesWithLocalWasm` and the frozen
`REORDER_RESOURCE_BUDGETS` constant, and nothing else. The module object is
frozen.

`pageOrder` is an exact permutation of the source pages: a plain array whose
length equals the observed page count with every 0-based source index listed
exactly once. Duplicates, omissions, out-of-range entries, non-integers, and
length mismatches are all `INPUT_REJECTED` before any import call. Subset
selection (dropping pages) is extract scope, not this unit; requiring a
bijection keeps output lineage exact (output page `i` came from source page
`pageOrder[i]`).

Its implementation:

- accepts exactly one plain-object argument with exactly the own data keys
  `bytes`, `wasmBinary`, `initPdfium`, `pageOrder`;
- rejects proxies, arrays-as-options, unknown/missing keys, and accessor
  properties without invoking caller getter code or proxy traps; `pageOrder`
  itself must be a plain non-proxy array read through per-index data
  descriptors (element getters are never invoked);
- requires non-empty caller-owned `bytes`/`wasmBinary`; injected `initPdfium`
  only (no direct package import);
- enforces `MAX_INPUT_BYTES` / `MAX_OUTPUT_BYTES` (67108864 each, own frozen
  export with the same rationale as the rotate grain);
- snapshots caller bytes/WASM, operates on private copies, fails closed on
  mid-run caller mutation;
- loads the source read-only, validates the page count, enforces the exact
  permutation, captures source `signatureCount`;
- creates the target with `FPDF_CreateNewDocument`, marshals the order as a
  heap int32 array written with endian-explicit `DataView.setInt32` (no
  alignment assumption on the allocator), imports with
  `FPDF_ImportPagesByIndex(target, source, ptr, len, 0)`, frees the index
  array on all paths, and proves the import by re-reading the target page
  count (must equal the source count);
- captures `outputSignatureCount` on the rebuilt target, saves the TARGET
  document through the adopted `PDFiumExt` writer path, copies output bytes
  out, and closes writer, both documents, and every allocation on all paths;
- returns one frozen result (`succeeded`, `inputByteLength`, sha256
  `inputDigest`, frozen `pageOrder` copy, `pageCount`, source
  `signatureCount`, `outputSignatureCount`, `signatureStructurePresent`,
  caller-owned `outputBytes` + length + sha256 `outputDigest`,
  `providerIdentity`); throws with nothing published on every failure path;
- preserves primary + cleanup failures per the canonical `AggregateError`
  discipline; never retries.

Repair note from qualification: the first candidate wrote the index array
with `new Int32Array(buffer, offset, len)`, which throws on non-4-aligned
offsets. A stub-allocator test caught it before any real-package run. The
canonical implementation writes with `DataView.setInt32(..., true)` and the
stub reads back the same way, so no allocator alignment is assumed.

`FPDF_MovePages` is absent from the source by authorization design, not
oversight: first-hand probing showed it returns false on every variant
including fresh PDFium-created documents. `FPDF_ImportPages` (range-string
form) is likewise absent: this unit authorizes exactly one import path.
`FPDF_SaveWithVersion` is absent (SaveAsCopy-only, no version stamps).

Stable error mapping (004A sections 10-11 vocabulary):

```text
options/bytes/wasm/init/pageOrder shape violations -> INPUT_REJECTED / PDF_INPUT_INVALID
input over budget -> RESOURCE_LIMIT_EXCEEDED / PDF_RESOURCE_LIMIT_EXCEEDED
document fails to open -> INPUT_REJECTED / PDF_INPUT_INVALID
non-permutation pageOrder -> INPUT_REJECTED / PDF_INPUT_INVALID
import returns false / imported count mismatch -> FAILED / PDF_OUTPUT_VALIDATION_FAILED
save/readout/size failures -> FAILED / PDF_OUTPUT_VALIDATION_FAILED
output over budget -> RESOURCE_LIMIT_EXCEEDED / PDF_RESOURCE_LIMIT_EXCEEDED
caller mutation mid-run -> FAILED / PDF_OUTPUT_VALIDATION_FAILED
cleanup failures -> FAILED (+ preserved AggregateError entries)
```

## 3. Fixture record

One new synthetic fixture, regenerated in-grain from the byte-exact generator
embedded in the successor authority (`github:issue-comment:5713544418`) and
verified byte-identical before use:

```text
FIXTURE = admission-seed-multipage-order-synthetic-v1
PATH = specs/004-local-pdf-core/fixtures/admission/multipage-order-synthetic-v1.pdf
FIXTURE_SHA256 = 6cf09a5b2d695709b068ad7e3985626cb30073f4809d5988d20ac2f14bcb3171
FIXTURE_BYTES = 902
RIGHTS = SIGNTHOS_AUTHORED_SYNTHETIC / redistribution ALLOWED / PUBLIC_SYNTHETIC
```

Per-page texts (`page-alpha`, `page-beta`, `page-gamma`) are proven
extractable by the canonical text runtime on the adopted package. The manifest
change appends exactly this one record (plus its `recordOrdering` entry).

## 4. Local-only boundary

The reorder source contains no reference to any of:

```text
require('@embedpdf/pdfium')
FPDF_MovePages
FPDF_ImportPages( (range-string form; only FPDF_ImportPagesByIndex is used)
FPDF_SaveWithVersion
DEFAULT_PDFIUM_WASM_URL
fetch(...)
XMLHttpRequest
Worker(
child_process
setTimeout(
setInterval(
http://
https://
node:fs
node:path
```

Its only module imports are `node:crypto` and `node:util`. No revision is
minted, no asset resolution occurs, and no retry/cache/global state is added.

## 5. Focused reorder qualification

Focused environment mirrors the rotate grain (external `NODE_PATH`, no
`node_modules` in the diff, Node v22.22.3, exact adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface; proxy/accessor/unknown-key rejection without caller-code invocation
element-getter pageOrder rejection without invocation
exact marshaled index array read-back and full mutation lifecycle order
non-permutation orders (dup/short/long/out-of-range) fail with zero import calls
import-false closes both documents and publishes nothing; count mismatch fails closed
unopenable input reports last-error; save/readout/size failures publish nothing
input/output budgets enforced; cleanup aggregation; no retry; mid-run mutation fails closed
source/import allowlist plus single-import-path static surface
real [2,0,1] reorder with per-page text-order proof (gamma/alpha/beta)
real identity permutation mints a distinct revision candidate with order preserved
real single-page trivial permutation; real non-permutation failures
real malformed/non-PDF failures; real signed-structure reorder with no preservation claim
real active-content reorder; independent inspect + render validation; caller bytes unchanged
```

Focused results:

```text
FOCUSED_TESTS = 22
FOCUSED_PASS = 22
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = c0c798dc8236b35ccfee0a11eddf0038a05db408b78d7939a0e371ae7145f299
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 6. Network-denied execution evidence

Same external deny preload method as the rotate grain.

```text
NETWORK_TESTS = 22
NETWORK_PASS = 22
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = b60cc7a683544585d44bda0d1095e23af30b97b6337870f227a5d879fa208b79
NETWORK_STDOUT_SHA256 = f266720a83cf74ce13e7eea759e556e4915baa5a97d9fe81763317550748b735
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 7. Complete applicable provider qualification

The complete canonical provider suite, including the new reorder test file,
passed under the exact Node executable.

```text
TOTAL_TESTS = 1012
PASS = 1012
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = 1fb33c238e64dfb294ad89fed2c0df5901fb5c27504d4a7661da2dcee5623685
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
REORDER_SOURCE_SHA256 = 4c04b0d8de64c4958976b7b1993387bdb9e71595ff5a75239a3e976506840afa
REORDER_TEST_SHA256 = 0404af39d749a9209955db7245bed789df67de83de5d93732dd3acb01189bc34
PROVIDERS_PACKAGE_JSON_SHA256 = b4ccc3e796463772072efa6ea3ed41ea9f2af3030632ffe825ef98895a82cfeb
ORDER_FIXTURE_SHA256 = 6cf09a5b2d695709b068ad7e3985626cb30073f4809d5988d20ac2f14bcb3171
FIXTURE_MANIFEST_SHA256 = fa6eff3b4f323a364a6d8a40fe8f6f51df960df37e0f3f49fb8be98d0ebe7c04
```

The package-manifest change only appends `test/pdf-reorder-runtime.test.js`.
It changes no dependency declaration.

## 9. Exact qualification claim

This candidate proves only that exact-permutation page reorder over the exact
adopted runtime imports source pages in the requested order into a new
document, exports it through the save-completion boundary with a new digest
and lineage evidence, validates order through independent canonical text
extraction, and publishes nothing on any failure path without an observed
network attempt.

It does not prove MovePages-based reorder, range-string imports,
remove/extract, supervision layers, revision minting, signature preservation,
corpus-wide compatibility, performance bounds, or native/server parity.

## 10. Explicit non-grants

```text
FPDF_MovePages_USE = NOT_AUTHORIZED / NOT_USED (proven non-functional in this build)
RANGE_STRING_IMPORT_USE = NOT_AUTHORIZED / NOT_USED
REMOVE_EXTRACT = NOT_AUTHORIZED
MUTATION_SUPERVISION_COMPOSITION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004E_K = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 11. Merge and successor gates

Same twelve gates as the rotate grain, applied to the six authorized paths of
this unit on its exact final head. No successor authority is inherited from
this document.

The final document SHA-256 is recorded in external GitHub qualification
evidence after the file is complete; the document does not contain a
self-referential digest.
