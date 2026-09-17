# PDF_ROTATE_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / ROTATE_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the 004D shaping reconciliation `github:issue-comment:5713413460`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the first canonical `REVISION_CREATING` grain: single-page
PDF rotation over the exact adopted PDFium package runtime. It establishes the
reusable revision-creation contract (input binding, target validation, mutation,
save/export boundary, output bytes/digest, lineage evidence, independent
validation, source-immutability proof, signed-source rule, failure atomicity)
for later 004D grains without building mutation supervision, composition, or
domain revision minting.

```text
UNIT = PDF_ROTATE_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 1f9e26d4c51401a30c295cdb1b6d17eab8436e57
CANONICAL_BASE_TREE = 4032a1ebd2bac682c6fcd55cf0116ab0542ed4c4
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 6
EXACT_ENTRY_POINT = rotatePdfPageWithLocalWasm
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-rotate-runtime.js
packages/providers/test/pdf-rotate-runtime.test.js
specs/004-local-pdf-core/pdf-rotate-v1-local-wasm-runtime-implementation.md
specs/004-local-pdf-core/fixtures/admission/signed-structure-synthetic-v1.pdf
specs/004-local-pdf-core/fixtures/admission/manifest.json
```

## 2. Implementation contract

The runtime exports `rotatePdfPageWithLocalWasm` and the frozen
`ROTATE_RESOURCE_BUDGETS` constant, and nothing else. The module object is
frozen.

Rotation semantics are relative: `degreesClockwise` (exactly 90, 180, or 270)
rotates the page clockwise by that amount from its current rotation, i.e.
`rotationAfter = (rotationBefore + degreesClockwise / 90) mod 4` in
quarter-turn units. The adopted `FPDFPage_SetRotation` primitive is an absolute
setter; the runtime reads the current rotation first, computes the relative
target, sets it, and re-reads to prove the mutation took effect. Absolute-set
would make repeated rotation idempotent and could mint revisions for no-op
mutations; relative semantics keep every successful call byte-changing.

Its implementation:

- accepts exactly one plain-object argument with exactly the own data keys
  `bytes`, `wasmBinary`, `initPdfium`, `pageIndex`, `degreesClockwise`;
- rejects proxies, arrays, Buffers-as-options, unknown/missing keys, and
  accessor properties without invoking caller getter code or proxy traps;
- requires non-empty caller-owned `bytes` and `wasmBinary` byte views;
- requires `initPdfium` to be a function and never imports
  `@embedpdf/pdfium` itself (initializer injection only);
- requires `pageIndex` to be a safe integer `>= 0` and `degreesClockwise` to
  be exactly `90`, `180`, or `270` (no silent normalization; `0`/`360` and
  non-multiples of 90 are invalid because they would mint revisions for
  no-op or ambiguous mutations);
- enforces `MAX_INPUT_BYTES` (67108864) before PDFium initialization and
  `MAX_OUTPUT_BYTES` (67108864) after save readout; oversize output is
  discarded unpublished. Rationale: 64 MiB is orders of magnitude above every
  admission fixture while far below WASM-heap practical limits; it bounds
  decoded expansion risk at this layer without pretending to be a universal
  corpus threshold (004A sets none).
- snapshots caller bytes and WASM bytes before init, operates the initializer
  on a private WASM copy, and fails closed if any caller view changed;
- loads the document read-only first, validates the page count, rejects
  out-of-range targets before any setter call;
- captures `FPDF_GetSignatureCount` evidence on every run
  (`signatureCount`, `signatureStructurePresent`);
- performs exactly one `FPDFPage_SetRotation` with the computed relative
  target and proves the effect by re-reading rotation before saving;
- saves exclusively through the adopted `PDFiumExt` file-writer path
  (`OpenFileWriter` -> `SaveAsCopy` -> `GetFileWriterSize` ->
  `GetFileWriterData` -> `CloseFileWriter`); raw `FPDF_SaveAsCopy` with a
  hand-rolled writer and `FPDF_SaveWithVersion` are both absent from the
  source (no version-stamp semantics are introduced);
- copies output bytes out of the WASM heap into a fresh caller-owned
  `Uint8Array`, frees every WASM-side allocation, closes writer/page/document
  handles, and destroys the library on all paths;
- returns one frozen result binding exact input identity
  (`inputByteLength`, sha256 `inputDigest`), normalized parameters,
  before/after rotation, page count, signature evidence, caller-owned
  `outputBytes` with `outputByteLength` and sha256 `outputDigest`, and
  `providerIdentity` (package, version, WASM byte length and digest);
- throws on every failure path with zero output bytes, zero digest, and zero
  lineage published (`PARTIAL_NOT_PUBLISHED` posture);
- preserves primary + cleanup failures per the canonical `AggregateError`
  discipline shared with the inspect runtime;
- never retries initialization, save, or cleanup.

The result carries no `signaturePreserved` / `signatureValid` fields by
construction. Canonical `DocumentRevisionId` minting is not performed here:
the result is output revision CANDIDATE evidence
(`inputDigest` + normalized parameters + `providerIdentity`) sufficient for a
later owning grain to mint a 003B `NewRevision`.

Stable error mapping (004A sections 10-11 vocabulary):

```text
options/bytes/wasm/init/pageIndex/degrees shape violations -> INPUT_REJECTED / PDF_INPUT_INVALID
input over MAX_INPUT_BYTES -> RESOURCE_LIMIT_EXCEEDED / PDF_RESOURCE_LIMIT_EXCEEDED
document fails to open (incl. truncated/non-PDF) -> INPUT_REJECTED / PDF_INPUT_INVALID
pageIndex >= page count -> INPUT_REJECTED / PDF_INPUT_INVALID (page target out of range)
rotation read invalid / rotation not effective -> FAILED / PDF_OUTPUT_VALIDATION_FAILED
save incomplete / no bytes / readout short -> FAILED / PDF_OUTPUT_VALIDATION_FAILED
output over MAX_OUTPUT_BYTES -> RESOURCE_LIMIT_EXCEEDED / PDF_RESOURCE_LIMIT_EXCEEDED
caller bytes/WASM changed mid-run -> FAILED / PDF_OUTPUT_VALIDATION_FAILED
cleanup failure alone or with primary -> FAILED (+ preserved AggregateError entries)
```

## 3. Fixture record

One new synthetic fixture, regenerated in-grain from the byte-exact generator
embedded in the shaping authority (`github:issue-comment:5713413460`) and
verified byte-identical before use:

```text
FIXTURE = admission-seed-signed-structure-synthetic-v1
PATH = specs/004-local-pdf-core/fixtures/admission/signed-structure-synthetic-v1.pdf
FIXTURE_SHA256 = 3e73cd7415f384de96e9446b82ca4f9053561daeedc7dd1c7acdc83a442d461d
FIXTURE_BYTES = 1090
RIGHTS = SIGNTHOS_AUTHORED_SYNTHETIC / redistribution ALLOWED / PUBLIC_SYNTHETIC
```

The manifest change appends exactly this one record (plus its `recordOrdering`
entry) in the existing schema. Observed adopted-package behavior, recorded
without any validity claim: `FPDF_GetSignatureCount` observes 1,
`FPDF_GetFormType` observes 1. The placeholder `/Contents` are zero bytes, so
the surviving count after rewrite proves structure carriage only, never
signature validity.

## 4. Local-only boundary

The rotate source contains no reference to any of:

```text
require('@embedpdf/pdfium')
FPDF_SaveAsCopy (raw; only PDFiumExt_SaveAsCopy is used)
FPDF_SaveWithVersion
DEFAULT_PDFIUM_WASM_URL
fetch(...)
XMLHttpRequest
Worker(
importScripts
child_process
setTimeout(
setInterval(
http://
https://
node:fs
node:path
JavaScript / Launch / URI / OpenAction identifiers
```

Its only module imports are `node:crypto` (sha256 digests) and `node:util`
(proxy detection). It creates no canonical PDF revision, performs no asset
resolution, and adds no retry, cache, or global runtime state.

## 5. Focused rotate qualification

The focused rotate suite ran under the exact canonical tool identity with the
exact adopted package exposed through an external `NODE_PATH`. No
`node_modules` materialization is part of the candidate repository diff.

```text
NODE_VERSION = v22.22.3
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
FIXTURE_ORDINARY_SHA256 = d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207
FIXTURE_SIGNED_SHA256 = 3e73cd7415f384de96e9446b82ca4f9053561daeedc7dd1c7acdc83a442d461d
```

Focused coverage proves, at minimum:

```text
exact option surface; proxy/accessor/unknown-key rejection without caller-code invocation
invalid bytes/wasm/init/pageIndex/degrees fail before any runtime effect
mutation lifecycle order (init/open/count/signature/load/rotate/save/readout/cleanup)
result binds input digest, normalized params, before/after rotation, signature evidence,
  output bytes/digest, provider identity; result frozen; no preservation fields exist
out-of-range page target fails with zero setter calls and full cleanup
unopenable input reports the PDFium last-error code; no output published
save/readout/size failures publish nothing; writer still closed
oversize output discarded unpublished; oversize input rejected before init
ineffective rotation fails closed; invalid provider facts fail closed
WASM replacement by initializer fails closed; caller mid-run mutation fails closed
cleanup failures aggregate primary + cleanup errors; initialization never retried
source/import allowlist and no-active-content/no-network static surface
real 90/180/270 rotation on ordinary-minimal with rotation persistence across save/load
real signed-structure rotate: signature evidence carried, preservation never claimed
real active-content rotate succeeds; output re-opens with the same page count
independent validation: canonical inspect page count, text-extraction equality,
  render smoke on rotated output; caller bytes byte-identical after every real run
```

Focused results:

```text
FOCUSED_TESTS = 25
FOCUSED_PASS = 25
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = f94097b9c4151758d00a794f7f8e8fdceb9573a18b8c7df7b1ed827f2f95557e
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 6. Network-denied execution evidence

The same exact focused suite was rerun with an external deny preload
(`node --import`) intercepting Node HTTP, HTTPS, TCP, TLS, WebSocket, and
global `fetch` entry points, using a pre-created network log file.

```text
NETWORK_TESTS = 25
NETWORK_PASS = 25
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = b60cc7a683544585d44bda0d1095e23af30b97b6337870f227a5d879fa208b79
NETWORK_STDOUT_SHA256 = c5e4cf9ff0621d6aa805d5e92af4b3e5f1ebd6e409b17344d53f2ef6b51daaf6
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 7. Complete applicable provider qualification

The complete canonical provider suite, including the new rotate test file as a
separately expanded argument, passed under the exact Node executable.

```text
TOTAL_TESTS = 990
PASS = 990
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = 9ed9bec839e9acac76893952d12a299000c8e5598e1880361b3e85dd5340cb4d
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

Applicable predecessor tests cover content identity/admission, PDFium
structural evidence, inspect/render/text-select/text-search/metadata tracks
(runtime through facade), thumbnail, and active-content non-execution.

## 8. Candidate file identities

Before this qualification document was completed, the implementation/test
surfaces had these exact identities:

```text
ROTATE_SOURCE_SHA256 = 5b8448c7585e109e8a7fe0bac2aea2dad1b67abae2ea15fdd281742fb38b5678
ROTATE_TEST_SHA256 = 57bdceff94a651c56497b1dc6c754bacae83e9b63bd9b8bd1b3e202ab84ba247
PROVIDERS_PACKAGE_JSON_SHA256 = 271394956b0e1f0ff075156a4f124f6cad76a5349db2878eee42f1bbe92434e5
SIGNED_FIXTURE_SHA256 = 3e73cd7415f384de96e9446b82ca4f9053561daeedc7dd1c7acdc83a442d461d
FIXTURE_MANIFEST_SHA256 = af78d836eedd441f46210b09d00e9e63f26d4c46d7c1aa0725cfc3f64b192dfb
```

The package-manifest change only appends `test/pdf-rotate-runtime.test.js` to
the existing provider test command. It changes no dependency declaration.

## 9. Exact qualification claim

This candidate proves only that single-page relative rotation (90/180/270) over
the exact adopted `@embedpdf/pdfium@2.15.0` runtime loads exact input bytes,
validates the page target, applies a relative quarter-turn mutation, exports
the result through the save-completion boundary as new output bytes with a new
digest and lineage evidence, validates the output through independent canonical
inspection paths, leaves source bytes unchanged, carries signature-structure
evidence without any preservation claim, and publishes nothing on any failure
path under the measured Node environment without an observed network attempt.

It does not prove reorder/remove/extract, merge/split, mutation supervision or
composition layers, domain revision minting, signature validity or
preservation, corpus-wide compatibility, performance bounds, or native/server
parity.

## 10. Explicit non-grants

```text
MUTATION_SUPERVISOR_BRIDGE_ORCHESTRATOR_BINDING_FACADE = NOT_AUTHORIZED / NOT_IMPLEMENTED
REORDER_REMOVE_EXTRACT = NOT_AUTHORIZED
FPDF_SaveWithVersion_USAGE = NOT_AUTHORIZED / NOT_USED
RAW_FPDF_SaveAsCopy_WITH_HAND_ROLLED_WRITER = NOT_AUTHORIZED / NOT_USED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004E_K = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 11. Merge and successor gates

This candidate is not canonical until all of the following hold on the exact
final head:

1. the final diff contains only the six authorized paths;
2. exact Node qualification is rerun after the qualification document is complete;
3. source/test/package/fixture/manifest hashes are recorded for the final bytes;
4. `git diff --check` is clean;
5. repository status is byte-identical before and after final qualification;
6. a fresh independent substantive exact-head review reports no material findings;
7. all material review threads are resolved;
8. live `main`, candidate head/tree, changed paths, open-PR set, and applicable
   status truth are reverified immediately before merge;
9. merge uses normal merge with exact expected head SHA and no history rewriting;
10. post-merge tree, ordered parents, signature, changed surface, PR state, and
    open-PR state are mechanically verified;
11. Issue #7 receives canonical closeout;
12. a fresh successor reconciliation determines the next minimum dependency-ordered unit.

No successor authority is inherited from this document.

The final document SHA-256 is recorded in external GitHub qualification
evidence after the file is complete; the document does not contain a
self-referential digest.
