# PDF_PAGE_NUMBER_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / PAGE_NUMBER_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the successor reconciliation `github:issue-comment:5714691643`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the fourth 004G grain: numbering every page with
decimal page numbers as a thin composer over the qualified
`placePdfMarkWithLocalWasm` runtime. Page `i` receives text
`startNumber + i`; each step's output feeds the next step's input. No new
PDFium mechanism is introduced: the only PDFium-touching calls are the
composed mark entry (one per page) and one inspect call that reads the
live page count bounding the loop. On canonical closure of this unit, the
watermark/stamp/numbering sub-item of 004G is complete; metadata mutation
and attachment extraction stay open on their provider blocks.

```text
UNIT = PDF_PAGE_NUMBER_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 5a6120bb8d5cb04a3852f59105f57ea7cd085211
CANONICAL_BASE_TREE = b147a6209b6c414bc2243ea4c9aca1374ddac962
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = numberPdfPagesWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-page-number-runtime.js
packages/providers/test/pdf-page-number-runtime.test.js
specs/004-local-pdf-core/pdf-page-number-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `numberPdfPagesWithLocalWasm` and the frozen
`NUMBER_RESOURCE_BUDGETS` constant (`maxInputBytes`/`maxOutputBytes`
64 MiB, `maxPages` 10000, `maxCoordinate` 10000, `maxFontSize` 144,
`maxAngleDegrees` 360, `maxChannel` 255), and nothing else. The module
object is frozen.

Inputs are validated before any runtime effect: `wasmBinary` non-empty
bytes (max 64 MiB), `bytes` non-empty (max 64 MiB, budget error on
oversize). Option-surface discipline mirrors the mark grain: all twelve
declared keys are required (`bytes`, `wasmBinary`, `initPdfium`,
`startNumber`, `x`, `y`, `fontSize`, `angleDegrees`, `red`, `green`,
`blue`, `alpha`); unknown or missing keys throw, accessor values throw
(only own plain data values are read).

Option semantics: `startNumber` a safe integer >= 0; placement and
channel bounds identical to the mark grain (`x`/`y` finite within
+/-10000, `fontSize` in (0, 144], |`angleDegrees`| <= 360, channels safe
integers 0..255). There are no defaults; every numbering input is
explicit per call.

Gates, all before any placement: the live page count is read through the
canonical inspect runtime; a count above `maxPages` fails closed with
zero placements; `startNumber + pageCount - 1` beyond
`Number.MAX_SAFE_INTEGER` fails closed with zero placements (decimal
number texts are therefore always exact). Signed documents are not
refused: mark semantics are inherited (placed, claims nothing about
signatures), and the result carries no signature fields at all.

Mechanism: single inspect call for the count, then one composed
`placePdfMarkWithLocalWasm` call per page with `pageIndex` i and text
`String(startNumber + i)`, threading outputs forward. The new source
contains no `FPDF_`/`PDFiumExt_` identifiers, no `wasmExports`/`HEAPU8`
access, and no other `node:` imports beyond `node:crypto`/`node:util`
(static assertions in the suite). An empty document succeeds vacuously
with a copy of the input bytes and an empty placed-text list.

Failure hygiene: every validation, gate, and step failure publishes
nothing. Step failures inherit the composed runtime's exact cleanup
(owned objects destroyed pre-insert, page-owned objects kept
post-insert). Caller mutation of the input or WASM bytes mid-run fails
the call closed via snapshot comparison (`AggregateError`).

The result is one frozen object: `succeeded` true, input identity
(`inputByteLength`, sha256 `inputDigest`), `pageCount`, `startNumber`,
frozen `placedTexts` (exact per-page decimal strings), caller-owned
`outputBytes`, `outputByteLength`, sha256 `outputDigest`, and frozen
`providerIdentity` (adopted 2.15.0 / 4633788 / c0af5a6a). No signature
fields. No preservation fields. No revision minting.

Stable errors use the 004A vocabulary; `AggregateError` discipline; no
retry.

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports plus the two canonical
sibling runtimes; no package import in src; no network/asset/
active-content identifiers (static assertions in the suite).

## 4. Focused page-number qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface (twelve keys); proxy/accessor/unknown/missing-key
  rejection with zero initializer calls; oversized input gate
stub composition over a shared fake module: 1 inspect + 3 ordered mark
  steps (4 initializer calls), exact placed texts, per-page load order,
  three inserts, zero owned-object destroys, output digest exact
mid-composition step failure publishes nothing
page count above budget fails with zero font/text/writer calls
unsafe final page number fails with zero placements
empty document succeeds vacuously with input bytes preserved
mid-run caller mutation of bytes or WASM fails closed (AggregateError)
source makes no direct PDFium calls (no FPDF_/PDFiumExt_/wasmExports/
  HEAPU8 identifiers; only node:crypto/node:util imports)
real 3-page numbering proves per-page numbers in extracted text with
  page count intact, source unchanged, digests differing, output
  reopening valid and rendering
real single-page numbering places the start number
real signed and active-content numbering succeeds while carrying no
  signature fields; sources unchanged
real truncated and non-PDF inputs fail closed
adopted package 2.15.0 + WASM 4633788 bytes c0af5a6a pinned in-suite
```

Focused results:

```text
FOCUSED_TESTS = 15
FOCUSED_PASS = 15
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 9921b74d5301bc728cc961aee9c8c2ece7ce3b517ded43918fe8ff71faa22e8c
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
NETWORK_STDOUT_SHA256 = 16b0f4a36502a91f79db6fb5a89637a27cd5c04093cd28fe27ec86eac624569a
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The network log file is absent (no attempt was recorded); the absent-file
hash recorded is the empty-digest convention shared with prior grains.

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1208
PASS = 1208
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = 2c844eaaab619bdd33397bc30f916009f701867f2f8e38684f7d5d9347bd1b11
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
PAGE_NUMBER_SOURCE_SHA256 = 310eeb8b40fe673fbce2a9ea6ef18639075799e93de8e67786264022f46ece47
PAGE_NUMBER_TEST_SHA256 = 61746318ed0a35a2b5e28a1de3995a70ccbe7592c5e7abaf2f266a53ad70d80d
PROVIDERS_PACKAGE_JSON_SHA256 = bff62ffdc37d63e797c7f8d7f76abe89aef55d445302d6557f8b07cc523a2213
```

The package-manifest change only appends `test/pdf-page-number-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that decimal page numbering composed from the
exact qualified mark runtime produces one independently valid revision
candidate with exact per-page number texts, validates it through
independent canonical paths, refuses over-budget page counts and unsafe
number ranges closed with zero placements, numbers signed and
active-content inputs while carrying no signature claim of any kind,
fails every invalid input closed, and performs no observed network
attempt.

It does not prove non-decimal or positional numbering schemes,
watermark graphics beyond text, metadata mutation, attachment
extraction, supervision layers, revision minting, signature validity or
preservation, corpus-wide compatibility, performance bounds, or
native/server parity.

## 9. Explicit non-grants

```text
NON_DECIMAL_OR_POSITIONAL_NUMBERING = NOT_AUTHORIZED
METADATA_MUTATION = NOT_AUTHORIZED / PROVIDER_BLOCKED
ATTACHMENT_EXTRACT = NOT_AUTHORIZED / PROVIDER_BLOCKED
WATERMARK_GRAPHICS_BEYOND_TEXT = NOT_AUTHORIZED
FONT_CHOICE_OR_EMBEDDING = NOT_AUTHORIZED
NUMBER_PLUS_PRIOR_COMPOSITION_BEYOND_SEQUENTIAL_MARKS = NOT_AUTHORIZED
SUPERVISION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004H_L = NOT_AUTHORIZED (beyond 004G fourth grain)
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
