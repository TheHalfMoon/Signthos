# PDF_IMAGE_PLACE_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / IMAGE_PLACE_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the successor reconciliation `github:issue-comment:5713997596`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the second 004F content grain: single raw-RGBA-bitmap
image placement on one page through `FPDFBitmap_CreateEx` plus
`FPDFPageObj_NewImageObj` / `FPDFImageObj_SetBitmap` /
`FPDFPageObj_Transform` / insert / `FPDFPage_GenerateContent`, saving through
the text-grain-proven `PDFiumExt` writer path. On canonical closure of this
unit, the second 004F grain is established; form fill and flatten remain for
successor grains.

```text
UNIT = PDF_IMAGE_PLACE_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 2f6820cf3692e482c81c7be9066ee8a2b94c1e3c
CANONICAL_BASE_TREE = 73b325f5269e11c210a00c92ab098ecc2a9f82e5
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = placePdfImageWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-image-place-runtime.js
packages/providers/test/pdf-image-place-runtime.test.js
specs/004-local-pdf-core/pdf-image-place-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `placePdfImageWithLocalWasm` and the frozen
`IMAGE_PLACE_RESOURCE_BUDGETS` constant (`maxInputBytes`/`maxOutputBytes`
64 MiB, `maxImageDimension` 256, `maxCoordinate` 10000, `maxScale` 16), and
nothing else. The module object is frozen.

Inputs are validated before any PDFium call: `wasmBinary` non-empty bytes
(max 64 MiB, budget error names the exact byte length), `bytes` non-empty
(max 64 MiB), `pageIndex` an integer in range, `pixels` a Uint8Array of
exactly `width * height * 4` bytes written verbatim into a BGRA bitmap
(byte order is verbatim, not converted), `width`/`height` safe integers in
1..256 (request-proportional allocation, no provider-claimed-size
allocation), `x`/`y` finite numbers within [0, 10000], `scale` a finite
number within (0, 16]. Option-surface discipline mirrors prior grains: only
the ten declared keys are read, unknown keys throw, accessor values throw,
and per-read getters are never invoked more than once.

Mechanism: single `initPdfium` call; open the input allocation with the
proven exact-head-decode readback (truncated and non-PDF bytes fail closed
with `FPDF_GetLastError` codes); snapshot page count, signature count, and
signature presence; create the BGRA bitmap and write caller pixels
stride-aware row by row; create the image object; load the target page;
marshal a native single-entry page-pointer array via DataView (a JS array
is rejected by the binding with a signature-mismatch abort, proven
first-hand); set the bitmap; free the page array immediately; apply the
requested placement via uniform-scale matrix; insert the object into the
page; generate content; save through the `PDFiumExt` writer with readout
and output budget; decode the output head-exactly and validate it by
reopening before publish. The input allocation is held until source close.

Failure hygiene: pre-insert failures (bitmap creation, stride/buffer
readout, image creation, page load, bitmap set, transform, insert throw)
destroy the owned image object (when created) and always destroy the
standalone bitmap, and publish nothing. A post-insert finalization failure
keeps the page-owned object (the insert succeeded, so destroying it would
corrupt the page), still frees the bitmap, and still publishes nothing.
Post-save failures (budget, reader count, readout, decode) discard the
unpublished bytes. Save-gate errors never allocate input memory: an
out-of-range page or oversized input fails with zero PDFium mutation calls
(bitmap creation included).

The result is one frozen object: input identity (`inputByteLength`, sha256
`inputDigest`, `pageCount`, `signatureCount`, `signatureStructurePresent`),
`placedImage` ({ width, height }), frozen `placement` ({ x, y, scale }),
caller-owned `outputBytes`, `outputByteLength`, sha256 `outputDigest`, and
frozen `providerIdentity`. No preservation fields. No revision minting. No
signature validity claim: signed-structure inputs record
`signatureStructurePresent: true` with their source count and nothing more.

Encoded-image decoding (JPEG/PNG), `FPDF_MovePages`, and version-stamp APIs
are all absent. Stable errors use the 004A vocabulary;
`AggregateError` discipline; no retry.

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports; no package import in src; no
network/asset/active-content identifiers (static assertions in the suite).

## 4. Focused image-placement qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface (ten keys); proxy/accessor/unknown-key rejection
stride-aware pixel write with verbatim read-back; marshaled page-pointer
  array read-back (listed page equals loaded page); full lifecycle order
  with bitmap destroy positioned after writer close
pre-insert failures destroy owned objects + bitmap; creation-throw modes
  destroy nothing that was never created
post-insert finalization failure keeps the page-owned object, frees bitmap,
  publishes zero
save gates allocate zero input memory and create zero bitmaps; aggregation
mid-run caller mutation of bytes/wasm/pixels fails closed via AggregateError
real RGBA placement changes rendered pixels and preserves page text with
  independent inspect/render validation
real later-page placement leaves other pages byte-text intact
real signed/active placement records structure, claims nothing, mutates zero
real out-of-range/truncated/non-PDF failures; source bytes unchanged
adopted package 2.15.0 + WASM 4633788 bytes c0af5a6a pinned in-suite
```

Focused results:

```text
FOCUSED_TESTS = 15
FOCUSED_PASS = 15
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 0a27c850c85a5c88ee09572accfcd1d1a815572f70f856c75107be0bca6b982c
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 5. Network-denied execution evidence

Same external deny preload method as prior grains
(`/private/tmp/signthos-deny-preload.mjs`; macOS provides no `unshare`).

```text
NETWORK_TESTS = 15
NETWORK_PASS = 15
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = b60cc7a683544585d44bda0d1095e23af30b97b6337870f227a5d879fa208b79
NETWORK_STDOUT_SHA256 = 97396fb37cd18794d9c5fb44e9b2d8969e9b1cc7150e0d3837952199849819f3
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The network log file is absent (no attempt was recorded); the absent-file
hash recorded is the empty-digest convention shared with prior grains.

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1104
PASS = 1104
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = ee6ad26fc888e400b1a0483898db6bee6e3e0cb481e8ec69e9ec7dee43371237
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
IMAGE_PLACE_SOURCE_SHA256 = 267568760f81aa464bb9a58bff329479565644c0973d952372b79d7ef3b75312
IMAGE_PLACE_TEST_SHA256 = b1a6b06bad6a7da240c5bcb25abe593c42452d33bee490fd39a3efd7dc3349cd
PROVIDERS_PACKAGE_JSON_SHA256 = d1121af2a8c6af8d9f759544aebd95b442621cef788bb256f2b3f57169f5d418
```

The package-manifest change only appends `test/pdf-image-place-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that single raw-RGBA-bitmap image placement
through the exact adopted runtime produces one independently valid revision
candidate with changed rendering and preserved page text, validates it
through independent canonical paths, fails every invalid input closed with
zero publication, and performs no observed network attempt.

It does not prove encoded-image decoding, multi-image layout, form fill,
flattening, supervision layers, revision minting, signature preservation,
corpus-wide compatibility, performance bounds, or native/server parity.

## 9. Explicit non-grants

```text
ENCODED_IMAGE_INPUT = NOT_AUTHORIZED / NOT_IMPLEMENTED
MULTI_IMAGE_LAYOUT = NOT_AUTHORIZED
FORM_FILL = NOT_AUTHORIZED
FLATTEN = NOT_AUTHORIZED
IMAGE_PLACE_PLUS_PRIOR_COMPOSITION = NOT_AUTHORIZED
MUTATION_SUPERVISION_COMPOSITION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004G_K = NOT_AUTHORIZED (beyond 004F second grain)
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 10. Merge and successor gates

Same gates as prior grains on the four authorized paths. No successor
authority is inherited from this document; the next 004F grain
reconciliation follows canonical closure separately.

The final document SHA-256 is recorded in external GitHub qualification
evidence after the file is complete; the document does not contain a
self-referential digest.
