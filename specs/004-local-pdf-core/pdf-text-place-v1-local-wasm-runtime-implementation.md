# PDF_TEXT_PLACE_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / TEXT_PLACE_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the post-merge successor reconciliation `github:issue-comment:5713823794`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the first 004F content grain: single-string ASCII text
placement on one page of an ordinary PDF through `FPDFText_LoadStandardFont`
(Helvetica) plus `FPDFPageObj_CreateTextObj` / `FPDFText_SetText` /
`FPDFPageObj_Transform` / insert / `FPDFPage_GenerateContent`, saving through
the merge/split-proven `PDFiumExt` writer path. On canonical closure of this
unit, the first 004F grain is established; forms, images, and flatten remain
for successor grains.

```text
UNIT = PDF_TEXT_PLACE_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 8a231152a9c1dbd59d72c7de012760de57a7e16c
CANONICAL_BASE_TREE = ea3d093bb4e2bbe4016c41a74d2276ccbbe15825
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = placePdfTextWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-place-runtime.js
packages/providers/test/pdf-text-place-runtime.test.js
specs/004-local-pdf-core/pdf-text-place-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `placePdfTextWithLocalWasm` and the frozen
`TEXT_PLACE_RESOURCE_BUDGETS` constant (`maxInputBytes`/`maxOutputBytes`
64 MiB, `maxTextChars` 500, `maxCoordinate` 10000, `maxFontSize` 144), and
nothing else. The module object is frozen.

Inputs are validated before any PDFium call: `wasmBinary` non-empty bytes
(max 64 MiB, budget error names the exact byte length), `bytes` non-empty
(max 64 MiB), `pageIndex` an integer in range, `text` a 1..500 character
printable-ASCII string (no control characters; the empty string and
non-ASCII input are rejected with exact-length diagnostics), `x`/`y`
finite numbers within [0, 10000], `fontSize` a finite number within
(0, 144]. Option-surface discipline mirrors prior grains: only the nine
declared keys are read, unknown keys throw, accessor values throw, and
per-read getters are never invoked more than once.

Mechanism: single `initPdfium` call; open the input allocation with the
merge/split-proven exact-head-decode readback (truncated and non-PDF bytes
fail closed with `FPDF_GetLastError` codes); snapshot page count, signature
count, and signature presence; load the target page; load the Helvetica
standard font; create the text object; marshal the text as UTF-16LE through
a request-bounded allocation; set the text content; apply the requested
placement via a 6-element float matrix marshaled through a DataView (no
alignment trap); insert the object into the page; generate content; save
through the `PDFiumExt` writer with readout and output budget; decode the
output head-exactly and validate it by reopening before publish. The input
allocation is held until source close.

Failure hygiene: pre-insert failures (font load, object creation, content
set, transform, insert throw) destroy the owned text object and publish
nothing. A post-insert finalization failure keeps the page-owned object
(the insert succeeded, so destroying it would corrupt the page) and still
publishes nothing. Post-save failures (budget, reader count, readout,
decode) discard the unpublished bytes. Save-gate errors never allocate
input memory: an out-of-range page, empty text, or oversized input fails
with zero PDFium calls beyond init.

The result is one frozen object: input identity (`inputByteLength`, sha256
`inputDigest`, `pageCount`, `signatureCount`, `signatureStructurePresent`),
`placedText`, frozen `placement` ({ x, y, fontSize, font: 'Helvetica' }),
caller-owned `outputBytes`, `outputByteLength`, sha256 `outputDigest`, and
frozen `providerIdentity`. No preservation fields. No revision minting. No
signature validity claim: signed-structure inputs record
`signatureStructurePresent: true` with their source count and nothing more.

`FPDF_MovePages`, font embedding, multi-string layout, and version-stamp
APIs are all absent. Stable errors use the 004A vocabulary;
`AggregateError` discipline; no retry.

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports; no package import in src; no
network/asset/active-content identifiers (static assertions in the suite).

## 4. Focused text-placement qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface (nine keys); proxy/accessor/unknown-key rejection
single-marshal UTF-16LE text array with read-back; alignment-safe transform
matrix verification; full lifecycle order with pre-insert destroy
post-insert finalization failure keeps the page-owned object, publishes zero
save gates allocate zero input memory; aggregation; no retry
unopenable input; input/output budgets; caller-mutation immunity
real Helvetica placement preserves page text and adds placed text with
  independent inspect/render validation
real later-page placement leaves other pages byte-text intact
real signed/active placement records structure, claims nothing, mutates zero
real out-of-range/truncated/non-PDF failures; source bytes unchanged
adopted package 2.15.0 + WASM 4633788 bytes c0af5a6a pinned in-suite
```

Focused results:

```text
FOCUSED_TESTS = 14
FOCUSED_PASS = 14
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = c9d3abe1b5c5b0e3f17855527177dd7b49a1bdf11443eca53885f36245767bbf
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 5. Network-denied execution evidence

Same external deny preload method as prior grains
(`/private/tmp/signthos-deny-preload.mjs`; macOS provides no `unshare`).

```text
NETWORK_TESTS = 14
NETWORK_PASS = 14
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = b60cc7a683544585d44bda0d1095e23af30b97b6337870f227a5d879fa208b79
NETWORK_STDOUT_SHA256 = 330dca53b876c96358a0f7dbefd4915749df64250d71779aa5e26dc11c427c09
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The network log file is absent (no attempt was recorded); the absent-file
hash recorded is the empty-digest convention shared with prior grains.

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1089
PASS = 1089
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = 6ef1fa3d4907e0485d2f9f51d1d3a3b4f5b524440f9c6d5ec7b671293762e817
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
TEXT_PLACE_SOURCE_SHA256 = c376e506d19c5181da2770f3632958de348c69bbfa89ab88d5bca76f3c49643b
TEXT_PLACE_TEST_SHA256 = 771e550c25b58325216d5423f1d507b39a3adf82c2b46e15fc6951f207de4271
PROVIDERS_PACKAGE_JSON_SHA256 = 94161b214050d635f06fb64f438396ca3d16c4e66415f60fa569c1aaf5bfad39
```

The package-manifest change only appends `test/pdf-text-place-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that single-string ASCII text placement through
the exact adopted runtime produces one independently valid revision
candidate with the placed text present and original page text preserved,
validates it through independent canonical paths, fails every invalid
input closed with zero publication, and performs no observed network
attempt.

It does not prove multi-string layout, non-ASCII or bidirectional text,
font embedding, form fill, image placement, flattening, supervision layers,
revision minting, signature preservation, corpus-wide compatibility,
performance bounds, or native/server parity.

## 9. Explicit non-grants

```text
NON_ASCII_OR_BIDI_TEXT = NOT_AUTHORIZED / NOT_IMPLEMENTED
FONT_EMBEDDING = NOT_AUTHORIZED
FORM_FILL = NOT_AUTHORIZED
IMAGE_PLACEMENT = NOT_AUTHORIZED
FLATTEN = NOT_AUTHORIZED
TEXT_PLACE_PLUS_PRIOR_COMPOSITION = NOT_AUTHORIZED
MUTATION_SUPERVISION_COMPOSITION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004G_K = NOT_AUTHORIZED (beyond 004F first grain)
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
