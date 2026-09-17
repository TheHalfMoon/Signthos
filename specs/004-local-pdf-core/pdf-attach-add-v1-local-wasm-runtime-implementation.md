# PDF_ATTACH_ADD_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / ATTACH_ADD_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the successor reconciliation `github:issue-comment:5714409707`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the first 004G grain: single-attachment add with caller
name and content bytes through `FPDFDoc_AddAttachment` plus
`FPDFAttachment_SetFile`, saving through the proven `PDFiumExt` writer path.
On canonical closure of this unit, the first 004G grain is established;
attachment removal, marks, and the blocked metadata mutation remain for
successor handling.

```text
UNIT = PDF_ATTACH_ADD_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = a42467a10835fc7b8c6d66e365af868b5d4adcc2
CANONICAL_BASE_TREE = e9c6c37cf26e2d0101c1e561fe71706a4917e32f
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = addPdfAttachmentWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-attach-add-runtime.js
packages/providers/test/pdf-attach-add-runtime.test.js
specs/004-local-pdf-core/pdf-attach-add-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `addPdfAttachmentWithLocalWasm` and the frozen
`ATTACH_ADD_RESOURCE_BUDGETS` constant (`maxInputBytes`/`maxOutputBytes`
64 MiB, `maxNameChars` 128, `maxContentBytes` 1048576), and nothing else.
The module object is frozen.

Inputs are validated before any PDFium call: `wasmBinary` non-empty bytes
(max 64 MiB, budget error names the exact byte length), `bytes` non-empty
(max 64 MiB), `name` 1..128 printable ASCII excluding `/` and `\` (path
separators have no meaning in the name table), `content` a Uint8Array of
1..1048576 bytes (request-proportional allocation). Option-surface
discipline mirrors prior grains: only the five declared keys are read,
unknown keys throw, accessor values throw, and per-read getters are never
invoked more than once.

Gates, all before any mutation: `signatureCount` must be 0, else "signed
documents are not attachment targets" (embedding changes signed bytes).

Mechanism: single `initPdfium` call; open the input allocation with the
proven exact-head-decode readback; pass the gates; snapshot the page count;
marshal the name as NUL-terminated UTF-8 via a checked allocation (the name
slot takes a pointer — first-hand: JS strings abort or fail here) and add
the attachment with a handle gate; free the name marshal immediately;
marshal a snapshot copy of the content via a checked allocation and set the
file bytes with `SetFile(handle, doc, ptr, len)` — the document handle is a
required argument (first-hand: without it the call traps) — then free the
content marshal immediately; read the output signature count; save through
the `PDFiumExt` writer with readout and output budget; decode the output
head-exactly and validate it by reopening before publish. The input
allocation is held until source close; caller content bytes are snapshotted
and verified unchanged at the end.

Failure hygiene: every gate and every add/set/save failure publishes
nothing; both marshals are freed immediately after use and again tracked in
cleanup; the document closes on all paths. Save-gate errors never touch the
mutation surface: oversized input or signed documents fail with zero
attachment calls.

The result is one frozen object: input identity (`inputByteLength`, sha256
`inputDigest`, `pageCount`, `signatureCount` 0,
`signatureStructurePresent` false by gate), `fileName`, `contentByteLength`,
caller-owned `outputBytes`, `outputByteLength`, sha256 `outputDigest`, and
frozen `providerIdentity`. No preservation fields. No revision minting.

Recorded provider blocks constraining this contract (all probed first-hand):
`FPDFAttachment_GetFile` reports the length but never fills the caller
buffer under any idiom — hence the runtime asserts census, name, and length
on reopen while the suite proves content bytes via stdlib inflate of the
saved stream; `EPDF_SetMetaText` returns true yet persists nothing, so
DocInfo metadata mutation is provider-blocked and stays out of this grain;
the serialized name string shows pair-swapped bytes in the file while API
readback is exact (harmless round-trip quirk, recorded).

Stable errors use the 004A vocabulary; `AggregateError` discipline; no
retry.

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports; no package import in src; no
network/asset/active-content identifiers (static assertions in the suite;
`node:zlib` appears only in the test's artifact proof, never in src).

## 4. Focused attachment-add qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface (five keys); proxy/accessor/unknown-key rejection;
  slash/backslash/non-ASCII name rejection; empty/oversized content rejection
full lifecycle order with exact marshaled name/content read-back
signed gate stops before any attachment call
add/set/save failures publish nothing with full cleanup
input/output budgets; aggregation; caller-mutation immunity (bytes/wasm)
real add persists entry, exact name, exact length, and exact content bytes
  (stdlib-inflate proof), preserves text, reopens valid, renders
real signed refusal and truncated/non-PDF failures; sources unchanged
adopted package 2.15.0 + WASM 4633788 bytes c0af5a6a pinned in-suite
```

Focused results:

```text
FOCUSED_TESTS = 11
FOCUSED_PASS = 11
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 34e4487314a38a3e4461b3abc5eb4e92d19ef2d6e5db725b2c735232c4c94e55
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
NETWORK_STDOUT_SHA256 = 0f8557bc7149fc22f15f732714f2ba2c740332c46a25489f907f018813158851
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The network log file is absent (no attempt was recorded); the absent-file
hash recorded is the empty-digest convention shared with prior grains.

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1167
PASS = 1167
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = 91978af07bf6a8851cea313f52cbc77003a701ec0a48e79a4bf1241c58ccd461
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
ATTACH_ADD_SOURCE_SHA256 = a0c42f79c8b2adeb1a7ad6a767cd254c966369bd4831706d43f08923ee51e08d
ATTACH_ADD_TEST_SHA256 = 76ac254039c3e79c4aa4a3cbc7682c18a8ea4fb13cfd7d5af8156879560ce67d
PROVIDERS_PACKAGE_JSON_SHA256 = 6d01e04995a2191b888118d2ad98ac846db330c4495c55c8cfdd16683baa61ff
```

The package-manifest change only appends `test/pdf-attach-add-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that single-attachment add through the exact
adopted runtime produces one independently valid revision candidate with
the entry, exact name, exact length, and exact content bytes persisted,
validates it through independent canonical paths plus stdlib inflate,
refuses signed documents closed with zero publication, fails every invalid
input closed, and performs no observed network attempt.

It does not prove attachment removal or extraction runtimes, metadata
mutation, marks, supervision layers, revision minting, signature
preservation, corpus-wide compatibility, performance bounds, or
native/server parity.

## 9. Explicit non-grants

```text
ATTACHMENT_REMOVE = NOT_AUTHORIZED (successor grain)
ATTACHMENT_EXTRACT_RUNTIME = NOT_AUTHORIZED (GetFile-content blocked)
METADATA_MUTATION = NOT_AUTHORIZED / PROVIDER_BLOCKED
WATERMARK_STAMP_NUMBERING = NOT_AUTHORIZED (later 004G grains)
SUPERVISION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004H_L = NOT_AUTHORIZED (beyond 004G first grain)
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
