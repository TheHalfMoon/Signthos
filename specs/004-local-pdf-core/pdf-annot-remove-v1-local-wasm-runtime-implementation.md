# PDF_ANNOT_REMOVE_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / ANNOT_REMOVE_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the successor reconciliation `github:issue-comment:5714294350`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the fifth 004F content grain: single-annotation removal
by page index through `FPDFPage_RemoveAnnot`, saving through the
form-fill-grain-proven `PDFiumExt` writer path. Annotation placement stays
provider-blocked (`FPDFPage_AddAnnot` absent); removal is the viable
revision-creating half of the plan's "annotations" sub-grain.

```text
UNIT = PDF_ANNOT_REMOVE_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 06c1597f6c304b217383a1882c9d9e11e2967fa0
CANONICAL_BASE_TREE = 5edd69a9d0596a85032b0e83d62507541421c91b
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = removePdfAnnotWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-annot-remove-runtime.js
packages/providers/test/pdf-annot-remove-runtime.test.js
specs/004-local-pdf-core/pdf-annot-remove-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `removePdfAnnotWithLocalWasm` and the frozen
`ANNOT_REMOVE_RESOURCE_BUDGETS` constant (`maxInputBytes`/`maxOutputBytes`
64 MiB), and nothing else. The module object is frozen.

Inputs are validated before any PDFium call: `wasmBinary` non-empty bytes
(max 64 MiB, budget error names the exact byte length), `bytes` non-empty
(max 64 MiB), `pageIndex` and `annotIndex` safe integers >= 0.
Option-surface discipline mirrors prior grains: only the five declared keys
are read, unknown keys throw, accessor values throw, and per-read getters
are never invoked more than once.

Gates, all before any mutation: `signatureCount` must be 0, else "signed
documents are not removal targets" (removal would break signatures);
`pageIndex` in range; `annotIndex` in range of the page annot count read
before opening anything mutable.

Mechanism: single `initPdfium` call; open the input allocation with the
proven exact-head-decode readback; pass the gates; load the target page;
read the annot count; range-check the index; fetch the annot; record its
subtype; close the annot handle; remove by index with a boolean gate; close
the page; save through the `PDFiumExt` writer with readout and output
budget; decode the output head-exactly and validate it by reopening before
publish. No annot handle survives the call. The input allocation is held
until source close.

Failure hygiene: every gate and every removal/save failure publishes
nothing; the annot handle is closed before removal is attempted, so no
failure path leaks it; page and document close on all paths. Save-gate
errors never touch the mutation surface: out-of-range indices and signed
documents fail with zero annot/page calls beyond counting. A close-annot
failure fails the whole operation closed (nothing published).

The result is one frozen object: input identity (`inputByteLength`, sha256
`inputDigest`, `pageCount`, `signatureCount` 0,
`signatureStructurePresent` false by gate), `pageIndex`, `annotIndex`,
`removedSubtype` (the exact PDFium subtype code read before removal),
caller-owned `outputBytes`, `outputByteLength`, sha256 `outputDigest`, and
frozen `providerIdentity`. No preservation fields. No revision minting.

Stable errors use the 004A vocabulary; `AggregateError` discipline; no
retry.

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports; no package import in src; no
network/asset/active-content identifiers (static assertions in the suite).

## 4. Focused annot-removal qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface (five keys); proxy/accessor/unknown-key rejection
full lifecycle order with subtype recording and close-before-remove
gate failures (signed, out-of-range page/annot) stop before any mutation
removal/save failures publish nothing with full cleanup
input/output budgets; aggregation; caller-mutation immunity
real Link removal drops the reopen annot count 1->0 and preserves text,
  with independent inspect/render validation
real Widget removal on the unsigned form fixture drops its annot 1->0
real signed refusal and range failures mutate nothing (signed reopen
  census still 1)
real truncated/non-PDF failures; source bytes unchanged
adopted package 2.15.0 + WASM 4633788 bytes c0af5a6a pinned in-suite
```

Focused results:

```text
FOCUSED_TESTS = 13
FOCUSED_PASS = 13
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 54ac553716a59df221d082389b400f819ecc07702b5d3628114593beae063f78
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 5. Network-denied execution evidence

Same external deny preload method as prior grains
(`/private/tmp/signthos-deny-preload.mjs`; macOS provides no `unshare`).

```text
NETWORK_TESTS = 13
NETWORK_PASS = 13
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = b60cc7a683544585d44bda0d1095e23af30b97b6337870f227a5d879fa208b79
NETWORK_STDOUT_SHA256 = b202a7dc95dd9472127a19756155a05672be858b862e11c95872abda94522242
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The network log file is absent (no attempt was recorded); the absent-file
hash recorded is the empty-digest convention shared with prior grains.

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1145
PASS = 1145
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = 3b7061210c0749747aaf148bb1dfbaca378ffcef54af251af5912baeeaf11115
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
ANNOT_REMOVE_SOURCE_SHA256 = 76aae549a8d85ec5cb1aafcb4a755489c5efee6a6c68ca8a2b43ae021448597e
ANNOT_REMOVE_TEST_SHA256 = 7779c9907fb25ec63d4459b0a1e2faa9bb295148512cbbe2e03df2524d0bf32f
PROVIDERS_PACKAGE_JSON_SHA256 = 5752aee5d58cac79a64627cb1ed83ec6999bbb64094a5fd3ab351f1bed789e49
```

The package-manifest change only appends `test/pdf-annot-remove-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that single-annotation removal by page index
through the exact adopted runtime produces one independently valid revision
candidate with the reopen annot count exactly one less and page text
preserved, validates it through independent canonical paths, refuses signed
documents and missing targets closed with zero publication, fails every
invalid input closed, and performs no observed network attempt.

It does not prove annotation placement, rect editing, removal composition,
supervision layers, revision minting, signature preservation, corpus-wide
compatibility, performance bounds, or native/server parity.

## 9. Explicit non-grants

```text
ANNOTATION_PLACEMENT = NOT_AUTHORIZED / PROVIDER_BLOCKED
ANNOTATION_RECT_EDIT = NOT_AUTHORIZED / NOT_CLAIMED
REMOVE_PLUS_FILL_COMPOSITION = NOT_AUTHORIZED
MUTATION_SUPERVISION_COMPOSITION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004G_K = NOT_AUTHORIZED (beyond 004F fifth grain)
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
