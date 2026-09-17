# PDF_ATTACH_REMOVE_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / ATTACH_REMOVE_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the successor reconciliation `github:issue-comment:5714459057`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the second 004G grain: single-attachment removal by
table index through `FPDFDoc_DeleteAttachment`, saving through the proven
`PDFiumExt` writer path. On canonical closure of this unit, attachments add
and remove are both canonically complete; extract-runtime, marks, and the
blocked metadata mutation remain for successor handling.

```text
UNIT = PDF_ATTACH_REMOVE_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 690d3366c5155fd44c9cb953c6eb7d5eec553454
CANONICAL_BASE_TREE = 86309aa7f24243da0889fd4f2b95259c74789ec2
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = removePdfAttachmentWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-attach-remove-runtime.js
packages/providers/test/pdf-attach-remove-runtime.test.js
specs/004-local-pdf-core/pdf-attach-remove-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `removePdfAttachmentWithLocalWasm` and the frozen
`ATTACH_REMOVE_RESOURCE_BUDGETS` constant (`maxInputBytes`/`maxOutputBytes`
64 MiB, `maxNameBytes` 4096), and nothing else. The module object is frozen.

Inputs are validated before any PDFium call: `wasmBinary` non-empty bytes
(max 64 MiB, budget error names the exact byte length), `bytes` non-empty
(max 64 MiB), `attachmentIndex` a safe integer >= 0. Option-surface
discipline mirrors prior grains: only the four declared keys are read,
unknown keys throw, accessor values throw, and per-read getters are never
invoked more than once.

Gates, all before any mutation: `signatureCount` must be 0, else "signed
documents are not attachment targets"; `attachmentIndex` in range of the
live attachment count read before any mutation (out-of-range fails with
`/out of range/`, never by calling delete out of range, although the
binding safely returns false there — proven first-hand).

Mechanism: single `initPdfium` call; open the input allocation with the
proven exact-head-decode readback; pass the gates; fetch the entry; read
its exact name into a checked 4 KiB buffer (unreadable or non-ASCII names
fail closed); free the name buffer immediately; delete by index with a
boolean gate; re-read the attachment count and require exactly one less
(the count is re-read, never arithmetically claimed); save through the
`PDFiumExt` writer with readout and output budget; decode the output
head-exactly and validate it by reopening before publish. Entry handles
need no close call in this API. The input allocation is held until source
close.

Failure hygiene: every gate and every fetch/name/delete/save failure
publishes nothing; the name buffer is freed immediately after reading and
tracked in cleanup; the document closes on all paths. Save-gate errors
never touch the mutation surface: oversized input, signed documents, and
empty tables fail with zero delete calls.

The result is one frozen object: input identity (`inputByteLength`, sha256
`inputDigest`, `pageCount`, `signatureCount` 0,
`signatureStructurePresent` false by gate), `attachmentIndex`,
`removedName` exact, `attachmentCountBefore`/`attachmentCountAfter`
(both read, never computed), caller-owned `outputBytes`,
`outputByteLength`, sha256 `outputDigest`, and frozen `providerIdentity`.
No preservation fields. No revision minting.

Stable errors use the 004A vocabulary; `AggregateError` discipline; no
retry.

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports; no package import in src; no
network/asset/active-content identifiers (static assertions in the suite).

## 4. Focused attachment-removal qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface (four keys); proxy/accessor/unknown-key rejection
full lifecycle order with exact name read-back and count re-read
gate failures (signed, empty table) stop before any delete call
delete/save failures and stale-count re-read publish nothing with cleanup
unreadable-name failure publishes nothing
input/output budgets; aggregation; caller-mutation immunity
real add-then-remove scaffold drops the reopen census 1->0 with exact
  removed name (scaffolding labeled test-side only; no product composition
  claimed), preserves text, reopens valid, renders
real signed refusal, empty-table range, truncated/non-PDF failures;
  sources unchanged
adopted package 2.15.0 + WASM 4633788 bytes c0af5a6a pinned in-suite
```

Focused results:

```text
FOCUSED_TESTS = 11
FOCUSED_PASS = 11
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = e719d5681fd5a326a4338cdd08a4e42fecde1f557f82a8dbfb4a3cfc2a27f39c
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 5. Network-denied execution evidence

Same external deny preload method as prior grains
(`/private/tmp/signthos-deny-preload.mjs`; macOS provides no `unshare`).

```text
NETWORK_TESTS = 11
NETWORK_PASS = 11
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = b60cc7a683544585d44bda0d1095e23af30b97b6337870f227a5d879fa208b79
NETWORK_STDOUT_SHA256 = 70d0596d2a84c919b2e32dd1fedc97a7ffd4f433d005504a30b4f81f8c6d3f0d
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The network log file is absent (no attempt was recorded); the absent-file
hash recorded is the empty-digest convention shared with prior grains.

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1178
PASS = 1178
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = f0d9acd6f2e01325a52523c3d1b39bbeaad35420c17ca5fb2719e9395164f77d
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
ATTACH_REMOVE_SOURCE_SHA256 = 6e4321592f0efd5449b0f6d1bdf1a29fedeff8f45c1a782850aa135ecd3044b3
ATTACH_REMOVE_TEST_SHA256 = 3db5c3990cded9323c6e78c6f63f1389f2f1028cb197d067388ad65c90e70c29
PROVIDERS_PACKAGE_JSON_SHA256 = 70cd8f2ef80aa7152eeed6de9a22565e48c0a6a6a0cb885bfa0e491f6273753f77
```

The package-manifest change only appends `test/pdf-attach-remove-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that single-attachment removal by table index
through the exact adopted runtime produces one independently valid revision
candidate with the reopen attachment count exactly one less and the removed
name proven, validates it through independent canonical paths, refuses
signed documents and missing targets closed with zero publication, fails
every invalid input closed, and performs no observed network attempt.

It does not prove attachment extraction runtimes, add-plus-remove product
composition, metadata mutation, marks, supervision layers, revision
minting, signature preservation, corpus-wide compatibility, performance
bounds, or native/server parity.

## 9. Explicit non-grants

```text
ATTACHMENT_EXTRACT_RUNTIME = NOT_AUTHORIZED (GetFile-content blocked)
ADD_PLUS_REMOVE_PRODUCT_COMPOSITION = NOT_AUTHORIZED (scaffold only)
METADATA_MUTATION = NOT_AUTHORIZED / PROVIDER_BLOCKED
WATERMARK_STAMP_NUMBERING = NOT_AUTHORIZED (later 004G grains)
SUPERVISION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004H_L = NOT_AUTHORIZED (beyond 004G second grain)
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
