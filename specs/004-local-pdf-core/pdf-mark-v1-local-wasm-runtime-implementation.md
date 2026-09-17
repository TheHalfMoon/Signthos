# PDF_MARK_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / MARK_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the successor reconciliation `github:issue-comment:5714459057`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the third 004G grain: stamping one rotated, colored
text mark on one page through `FPDFPageObj_CreateTextObj` /
`FPDFPageObj_SetText` / `FPDFPage_InsertObject` plus `FPDFPage_GenerateContent`,
saving through the proven `PDFiumExt` writer path. First-hand probes proved
the `FPDFAnnot` surface absent from the adopted binding (all annotation
entry points undefined), so marks are page content-stream objects, not
annotations, and this unit makes no annotation claim. On canonical closure
of this unit, marks join attach-add and attach-remove as complete; the
blocked metadata mutation remains for successor handling.

```text
UNIT = PDF_MARK_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = c92da4589ad13e8f33127be5bf56805df9651036
CANONICAL_BASE_TREE = 0f75122f6f46edfa1d2b983c286fc453ea56e73b
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = addPdfTextMarkWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-mark-runtime.js
packages/providers/test/pdf-mark-runtime.test.js
specs/004-local-pdf-core/pdf-mark-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `addPdfTextMarkWithLocalWasm` and the frozen
`MARK_RESOURCE_BUDGETS` constant (`maxInputBytes`/`maxOutputBytes` 64 MiB,
`maxNameBytes` 4096 as the shared channel-capacity witness), and nothing
else. The module object is frozen.

Inputs are validated before any PDFium call: `wasmBinary` non-empty bytes
(max 64 MiB, budget error names the exact byte length), `bytes` non-empty
(max 64 MiB). Option-surface discipline mirrors prior grains: only the five
declared keys are read (`targetPageIndex`, `text`, `fontSizePt`,
`color`, `rotationDegreesClockwise`); unknown keys throw, accessor values
throw, and per-read getters are never invoked more than once.

Option semantics: `targetPageIndex` a safe integer >= 0 (default 0);
`text` a non-empty string of at most 200 chars (default `'MARK'`);
`fontSizePt` a finite number in [1, 144] (default 48); `color` a frozen
`{r,g,b}` triple with byte-range integers (default red); callers cannot
mutate the default through the result because defaults are copied per call.
`rotationDegreesClockwise` a finite number in [0, 360) (default 45); 0 is
unrotated, values rotate the text matrix clockwise on the page.

Gates, all before any mutation: `signatureCount` must be 0, else "signed
documents are not mark targets"; `targetPageIndex` in range of the live
page count (out-of-range fails with `/out of range/`, never by touching
an out-of-range page).

Mechanism: single `initPdfium` call; open the input allocation with the
proven exact-head-decode readback; pass the gates; write the UTF-16LE
text bytes (with NUL) into a WASM allocation (empty text impossible by
validation); create the text object with the requested font size; set the
text (false fails); set fill RGB (PDFium byte-RGB proof, not normalized
floats); build the rotation matrix with `cos/sin` on the standard math
object and set it; insert the object into the target page (false fails);
generate the page content (false fails); save through the `PDFiumExt`
writer with readout and output budget; decode the output head-exactly
and validate it by reopening before publish. The text buffer is freed
after insertion; the document closes on all paths. The input allocation
is held until source close.

Failure hygiene: every validation, gate, and create/set/insert/generate
/save failure publishes nothing; allocations are tracked in cleanup and
freed on all post-allocation failure paths. Save-gate errors never touch
the content surface: oversized input and signed documents fail with zero
text-object creations. Caller mutation of the input bytes after the call
cannot affect the saved output.

The result is one frozen object: input identity (`inputByteLength`,
sha256 `inputDigest`, `pageCount`, `signatureCount` 0,
`signatureStructurePresent` false by gate), `targetPageIndex`, `text`
exact, `fontSizePt`, frozen `color` copy, `rotationDegreesClockwise`,
`markObjectCount` 1 (read from the single created handle, never
arithmetically claimed), caller-owned `outputBytes`,
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
exact option surface (five keys); proxy/accessor/unknown-key rejection
defaults copied per call (caller mutation cannot poison later calls)
full lifecycle order with exact writer-data pointer at the mocked writer
gate failures (signed, out-of-range page) stop before any text creation
create/set/insert/generate/save failures publish nothing with cleanup
input/output budgets; aggregation; caller-mutation immunity
real red 45-degree mark renders darker-red pixels (channel delta beyond
  noise) in the marked region against the unmarked source, preserves
  text, reopens valid, renders
real blue mark on the second page marks only that page; earlier page
  unchanged
real signed refusal, truncated/non-PDF failures; sources unchanged
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

This candidate proves only that one rotated colored text mark stamped
through the exact adopted runtime produces one independently valid
revision candidate with exactly one created mark object, rotation and
color proven by real render deltas, validates it through independent
canonical paths, refuses signed documents and out-of-range pages closed
with zero publication, fails every invalid input closed, and performs
no observed network attempt.

It does not prove annotation-based marks (the adopted binding exposes no
annotation surface), multi-mark stamping, image marks, metadata mutation,
supervision layers, revision minting, signature preservation,
corpus-wide compatibility, performance bounds, or native/server parity.

## 9. Explicit non-grants

```text
ANNOTATION_BASED_MARKS = NOT_AUTHORIZED (binding exposes no FPDFAnnot surface)
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
