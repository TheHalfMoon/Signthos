# PDF_FLATTEN_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / FLATTEN_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the successor reconciliation `github:issue-comment:5714073637`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the third 004F content grain: single-page flatten with
the normal flag through `FPDFPage_Flatten`, saving through the
image-grain-proven `PDFiumExt` writer path. On canonical closure of this
unit, the third 004F grain is established; form fill remains for a successor
grain.

```text
UNIT = PDF_FLATTEN_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 23dc0d96c862bc34801643b70d82840f26d3d36b
CANONICAL_BASE_TREE = 18bffa250ebc717f6a314a75323e9c06acedbce4
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = flattenPdfPageWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-flatten-runtime.js
packages/providers/test/pdf-flatten-runtime.test.js
specs/004-local-pdf-core/pdf-flatten-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `flattenPdfPageWithLocalWasm` and the frozen
`FLATTEN_RESOURCE_BUDGETS` constant (`maxInputBytes`/`maxOutputBytes`
64 MiB), and nothing else. The module object is frozen.

Inputs are validated before any PDFium call: `wasmBinary` non-empty bytes
(max 64 MiB, budget error names the exact byte length), `bytes` non-empty
(max 64 MiB), `pageIndex` an integer in range. The flatten flag is fixed to
`FLAT_NORMAL` (0) inside the runtime; there is no flag option in this grain.
Option-surface discipline mirrors prior grains: only the four declared keys
are read, unknown keys throw, accessor values throw, and per-read getters
are never invoked more than once.

Mechanism: single `initPdfium` call; open the input allocation with the
proven exact-head-decode readback (truncated and non-PDF bytes fail closed
with `FPDF_GetLastError` codes); snapshot page count, signature count, and
signature presence; load the target page; flatten with the normal flag and
gate the return code against `FLATTEN_SUCCESS` (2); close the page; save
through the `PDFiumExt` writer with readout and output budget; decode the
output head-exactly and validate it by reopening before publish. No
page-object creation or destruction exists in this grain. The input
allocation is held until source close.

Failure hygiene: flatten-false (any code other than 2) closes the page and
publishes nothing; post-flatten save failures discard unpublished bytes.
Save-gate errors never allocate input memory: an out-of-range page or
oversized input fails with zero PDFium mutation calls (no page load, no
flatten).

The result is one frozen object: input identity (`inputByteLength`, sha256
`inputDigest`, `pageCount`, `signatureCount`, `signatureStructurePresent`),
`pageIndex`, `flattenStatus` (the exact PDFium return code, 2 on success),
caller-owned `outputBytes`, `outputByteLength`, sha256 `outputDigest`, and
frozen `providerIdentity`. No preservation fields. No revision minting.

Observed provider behavior, recorded without claim: `FPDFPage_Flatten`
returns 1 (`FLATTEN_FAIL`) on pages carrying annotations — both the
signed-structure page and the active-content page fail, while the
annotation-free ordinary page and all three multipage-order pages return 2.
The runtime publishes nothing on the failure path and mutates zero caller
bytes. This deviates from the reconciliation's provisional expectation of
signed/active success output; the fail-closed behavior is the canonical fact
and is what the suite asserts.

Stable errors use the 004A vocabulary; `AggregateError` discipline; no
retry.

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports; no package import in src; no
network/asset/active-content identifiers (static assertions in the suite).

## 4. Focused flatten qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface (four keys); proxy/accessor/unknown-key rejection
full lifecycle order with the normal flag (flatten:101:0) and success code
flatten-false and flatten-throw publish nothing with page+doc cleanup
save gates allocate zero input memory and load zero pages; aggregation
mid-run caller mutation of bytes/wasm fails closed via AggregateError
real ordinary-page flatten preserves rendering byte-exactly and text
  exactly, with independent inspect validation
real later-page flatten leaves other pages byte-text intact
real annotated-page (signed + active) flatten fails closed, mutates zero
real out-of-range/truncated/non-PDF failures; source bytes unchanged
adopted package 2.15.0 + WASM 4633788 bytes c0af5a6a pinned in-suite
```

Focused results:

```text
FOCUSED_TESTS = 14
FOCUSED_PASS = 14
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = da62c138ef740288110ae3e79d118f0a7e293fefc2aaa73a848622b5bbe6fdc1
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
NETWORK_STDOUT_SHA256 = f9e687401cf0409a64cbc3ea20b40c7fc2034017059326637469e53017621bd0
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The network log file is absent (no attempt was recorded); the absent-file
hash recorded is the empty-digest convention shared with prior grains.

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1118
PASS = 1118
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = 7cdcfc101f18c49e1b6620bd04bd29cabe00896a47138a1225dba4c9c226b16f
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
FLATTEN_SOURCE_SHA256 = e1c83a06b10dc5896b668e8b45c32363a1066004413dcd8266c462641c24e56b
FLATTEN_TEST_SHA256 = bae866e37130a00cbe9844ceddd826d0bf3537151f72ec8e14422584a9a01024
PROVIDERS_PACKAGE_JSON_SHA256 = 8d9262264c20ce7b38accc626e5fafb7914126f258a22caa091cd4e1d256bca8
```

The package-manifest change only appends `test/pdf-flatten-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that single-page normal-flag flatten through the
exact adopted runtime produces one independently valid revision candidate
with byte-exact preserved rendering and text on annotation-free pages,
refuses annotated pages closed with zero publication, fails every invalid
input closed, and performs no observed network attempt.

It does not prove flag-choice flatten, form fill, flatten-plus-fill
composition, supervision layers, revision minting, signature preservation,
corpus-wide compatibility, performance bounds, or native/server parity.

## 9. Explicit non-grants

```text
FLATTEN_FLAG_CHOICE = NOT_AUTHORIZED / NOT_IMPLEMENTED
FORM_FILL = NOT_AUTHORIZED
FLATTEN_PLUS_FILL_COMPOSITION = NOT_AUTHORIZED
ANNOTATION_PLACEMENT = NOT_AUTHORIZED
MUTATION_SUPERVISION_COMPOSITION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004G_K = NOT_AUTHORIZED (beyond 004F third grain)
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
