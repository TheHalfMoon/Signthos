# PDF_MARK_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / MARK_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the successor reconciliation `github:issue-comment:5714459057`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the third 004G grain: placing one positioned,
rotated, colored text mark on one page through the Helvetica standard
font (`FPDFText_LoadStandardFont`) plus `FPDFPageObj_CreateTextObj` /
`FPDFText_SetText` / `FPDFPageObj_SetFillColor` / `FPDFPageObj_Transform`,
inserted with `FPDFPage_InsertObject` and baked with
`FPDFPage_GenerateContent`, saving through the proven `PDFiumExt` writer
path. The runtime surface validated here exposes no annotation entry
points, so marks are page content-stream objects, not annotations, and
this unit makes no annotation claim. Unlike prior mutation grains, signed
inputs are not refused: the mark is placed and the result reports the
read input and output signature counts while explicitly claiming nothing
about signature validity or preservation. On canonical closure of this
unit, marks join attach-add and attach-remove as complete; the blocked
metadata mutation remains for successor handling.

```text
UNIT = PDF_MARK_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = c92da4589ad13e8f33127be5bf56805df9651036
CANONICAL_BASE_TREE = 0f75122f6f46edfa1d2b983c286fc453ea56e73b
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = placePdfMarkWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-mark-runtime.js
packages/providers/test/pdf-mark-runtime.test.js
specs/004-local-pdf-core/pdf-mark-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `placePdfMarkWithLocalWasm` and the frozen
`MARK_RESOURCE_BUDGETS` constant (`maxInputBytes`/`maxOutputBytes`
64 MiB, `maxTextChars` 500, `maxCoordinate` 10000, `maxFontSize` 144,
`maxAngleDegrees` 360, `maxChannel` 255), and nothing else. The module
object is frozen.

Inputs are validated before any PDFium call: `wasmBinary` non-empty bytes
(max 64 MiB), `bytes` non-empty (max 64 MiB, budget error on oversize).
Option-surface discipline mirrors prior grains: all fourteen declared
keys are required (`bytes`, `wasmBinary`, `initPdfium`, `pageIndex`,
`text`, `x`, `y`, `fontSize`, `angleDegrees`, `red`, `green`, `blue`,
`alpha`); unknown or missing keys throw, accessor values throw (only own
plain data values are read).

Option semantics: `pageIndex` a safe integer >= 0; `text` 1..500
printable ASCII characters; `x`/`y` finite coordinates within +/-10000;
`fontSize` a finite size in (0, 144]; `angleDegrees` a finite angle with
|angle| <= 360; `red`/`green`/`blue`/`alpha` safe integers in 0..255.
There are no defaults; every placement input is explicit per call.

Gates, all before any mutation: `pageIndex` in range of the live page
count read before any mutation (out-of-range fails closed, never by
touching an out-of-range page). Signed documents are deliberately not
refused; the input and output signature counts are both read and
reported, and the result carries no signature-validity or
signature-preservation claim.

Mechanism: single `initPdfium` call with a copied WASM binary (an
initializer that replaces the bytes fails closed); open the input
allocation with the proven exact-head-decode readback; load the Helvetica
standard font; create the text object with the requested size; write the
UTF-16LE text bytes (with NUL) into a WASM allocation and set the text
(false fails); set the RGBA fill color; apply the rotation/translation
matrix `(cos, sin, -sin, cos, x, y)` built from `angleDegrees` via
`FPDFPageObj_Transform`; load the target page; insert the object; generate
the page content (false fails); close the page; re-read the signature
count; save through the `PDFiumExt` writer with readout and output
budget; output validation beyond the writer readout lives in the suite's
independent reopen/render/extract proofs (no in-runtime output reopen).
The text buffer is freed immediately after the set-text
call on all paths; the document closes on all paths. The input allocation
is held until source close.

Failure hygiene: every validation, gate, and font/create/set/color/
transform/insert/generate/save failure publishes nothing. A text object
that was created but never inserted is destroyed (`FPDFPageObj_Destroy`);
once inserted, the object is page-owned and is never destroyed by the
runtime. Save-gate errors never touch the content surface: oversized
input fails with zero text-object creations. Caller mutation of the input
or WASM bytes mid-run fails the call closed via snapshot comparison
(`AggregateError`); an initializer replacing the runtime WASM bytes fails
closed.

The result is one frozen object: `succeeded` true, input identity
(`inputByteLength`, sha256 `inputDigest`), `pageIndex`, `placedText`
exact, frozen `placement` (`x`, `y`, `fontSize`, `angleDegrees`), frozen
`color` (`red`, `green`, `blue`, `alpha`), `font` `'Helvetica'`,
`pageCount`, `signatureCount`, re-read `outputSignatureCount`,
`signatureStructurePresent`, caller-owned `outputBytes`,
`outputByteLength`, sha256 `outputDigest`, and frozen
`providerIdentity`. No preservation fields. No revision minting.

Stable errors use the 004A vocabulary; `AggregateError` discipline; no
retry.

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports; no package import in src; no
network/asset/active-content identifiers (static assertions in the suite).

## 4. Focused mark qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface (fourteen keys); proxy/accessor/unknown/missing-key
  rejection with zero initializer calls
full lifecycle order with exact rotation matrix, RGBA fill, UTF-16LE
  text units, and writer-data pointer at the mocked writer
pre-insert failures (insert/set-text/color) destroy the text object and
  publish nothing; post-insert generate failure keeps the page-owned
  object and publishes nothing
out-of-range page target fails with zero font/text/page calls
input/output budgets with exact diagnostics; aggregation discipline;
  mid-run caller mutation of bytes or WASM fails closed; initializer
  replacing runtime WASM bytes fails closed
real 45-degree mark changes page rendering, preserves prior text,
  exposes the mark text, reopens valid with page count intact
real mark on a later page leaves earlier pages byte-text intact
real signed and active-content marks succeed while claiming nothing
  about signatures (no signaturePreserved/signatureValid fields);
  sources unchanged
real out-of-range page, truncated, and non-PDF inputs fail closed
adopted package 2.15.0 + WASM 4633788 bytes c0af5a6a pinned in-suite
```

Focused results:

```text
FOCUSED_TESTS = 15
FOCUSED_PASS = 15
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 7feca95c5f102e2f429fa28e0272bf8a274723e98f5149f9b9fd866425d3799c
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
NETWORK_STDOUT_SHA256 = 11d04a07987ede28ca5c2629b02f18496bc80dcc83c19fa66fa58b09e5a4b8e8
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The network log file is absent (no attempt was recorded); the absent-file
hash recorded is the empty-digest convention shared with prior grains.

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1193
PASS = 1193
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = 9f3fb1d8b06fc4f922cda1926e0af162b11ed3a9b564d96e9542c3c4a2795fa3
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
MARK_SOURCE_SHA256 = 018ae06e38d1084638df2874cbbce814a1176cf9644354b5d4bd053aa0a71c2b
MARK_TEST_SHA256 = 0c156a82d2aa2f0b70c74892865f45492978db2e1554f46472d54f0c951bbdbd
PROVIDERS_PACKAGE_JSON_SHA256 = f31a7597b14aeebe6f2a0c1d6dcc1d8b2c5c2fa2a2fd8e3f50627bc85a3820af
```

The package-manifest change only appends `test/pdf-mark-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that one positioned rotated colored text
mark placed through the exact adopted runtime produces one independently
valid revision candidate with exact placement, rotation matrix, and RGBA
color, validates it through independent canonical paths, refuses
out-of-range pages closed with zero mutation calls, places marks on
signed and active-content inputs while claiming nothing about
signatures, fails every invalid input closed, and performs no observed
network attempt.

It does not prove annotation-based marks (the validated surface exposes
no annotation entry points), multi-mark stamping, image marks, metadata
mutation, supervision layers, revision minting, signature validity or
preservation, corpus-wide compatibility, performance bounds, or
native/server parity.

## 9. Explicit non-grants

```text
ANNOTATION_BASED_MARKS = NOT_AUTHORIZED (validated surface exposes no annotation entry points)
MULTI_MARK_OR_IMAGE_MARKS = NOT_AUTHORIZED (later grains if specified)
METADATA_MUTATION = NOT_AUTHORIZED / PROVIDER_BLOCKED
SUPERVISION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004H_L = NOT_AUTHORIZED (beyond 004G third grain)
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 10. Merge and successor gates

Same gates as prior grains on the four authorized paths. No successor
authority is inherited from this document; the next reconciliation follows
canonical closure separately.

The final document SHA-256 is recorded in external GitHub qualification
evidence after the file is complete; the document does not contain a
self-referential digest.
