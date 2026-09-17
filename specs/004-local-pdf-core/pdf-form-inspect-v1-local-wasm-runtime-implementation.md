# PDF_FORM_INSPECT_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / FORM_INSPECT_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the successor reconciliation `github:issue-comment:5714340701`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the sixth and final viable 004F grain: read-only form
inspection (document form type plus per-page annotation census) through the
proven classic annotation getters. It creates no revision and publishes no
bytes (`READ_ONLY` side-effect class); the writer surface is absent from the
runtime by construction. On canonical closure of this unit, 004F is assessed
complete: every viable sub-grain is done and the remainder is
provider-blocked with first-hand evidence.

```text
UNIT = PDF_FORM_INSPECT_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 75a1b39c1e4d0e3e8e33a1c0473d1313834d2b3b
CANONICAL_BASE_TREE = 5f621d04b51501653d05ea3a1043ead21f365a42
SIDE_EFFECT_CLASS = READ_ONLY
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = inspectPdfFormWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-form-inspect-runtime.js
packages/providers/test/pdf-form-inspect-runtime.test.js
specs/004-local-pdf-core/pdf-form-inspect-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `inspectPdfFormWithLocalWasm` and nothing else (no
budget export: there is no output side to budget). The module object is
frozen.

Inputs are validated before any PDFium call: `wasmBinary` non-empty bytes
(max 64 MiB input budget), `bytes` non-empty, `initPdfium` a function. No
page targeting: the census covers every page. Option-surface discipline
mirrors prior grains: only the three declared keys are read, unknown keys
throw, accessor values throw, and per-read getters are never invoked more
than once.

Mechanism: single `initPdfium` call; open the input allocation with the
proven exact-head-decode readback (unopenable input fails with
`FPDF_GetLastError` codes, never with invented structure); snapshot page
count, signature count, and form type; per page in order: load, read annot
count, per annot fetch handle, read subtype, close handle immediately,
close page. Nothing is created, mutated, or saved. The input allocation is
held until source close; the caller bytes are verified unchanged at the end
(the read-only proof).

The result is one frozen object: input identity (`inputByteLength`, sha256
`inputDigest`, `pageCount`, `signatureCount`, `signatureStructurePresent`),
`formType` (exact code) with `formKind` (`none` for 0, `acroform` for 1,
`other` for any other code), frozen `pages[]` with one frozen entry per
page (`pageIndex`, `annotCount`, frozen `subtypes` code array), and frozen
`providerIdentity`. No `outputBytes`. No preservation fields.

Failure hygiene: any getter failure closes the loaded page and document;
annot handles are closed immediately after reading, so no failure path
leaks them. Stable errors use the 004A vocabulary; `AggregateError`
discipline; no retry.

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports; no package import in src; no
network/asset/active-content identifiers and no writer/save identifiers
(static assertions in the suite).

## 4. Focused form-inspection qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface (three keys); proxy/accessor/unknown-key rejection
multi-page census with per-annot close ordering and frozen result shape
form-kind mapping for none/acroform/other codes
read failures close opened handles and aggregate
mid-run caller mutation fails closed; no outputBytes field exists
real corpus census matches the rehearsed contract on ordinary, form-text,
  active, signed, and multipage fixtures with sources unchanged
real truncated/non-PDF failures
adopted package 2.15.0 + WASM 4633788 bytes c0af5a6a pinned in-suite
```

Focused results:

```text
FOCUSED_TESTS = 11
FOCUSED_PASS = 11
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 88b43dc1b3cd8d21226b60a9fb82aa5c3dfb56888966051a5607ab0882ad5aa9
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
NETWORK_STDOUT_SHA256 = cfcf0e2f955d0385979776b41d5163051abab60fd7020d61b9ce2d74cbd44fdd
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The network log file is absent (no attempt was recorded); the absent-file
hash recorded is the empty-digest convention shared with prior grains.

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1156
PASS = 1156
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = e3845e7c03021f89718f595e6b61ca5794e51e4a6ab979df55c726b371a2a1e8
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
FORM_INSPECT_SOURCE_SHA256 = 7535218f0476f254cb1928ee323da9fc422af67fa37dff0bc9379feeb2202689
FORM_INSPECT_TEST_SHA256 = 01e615b4400495506b6339b65f00f7a3a5622a94048b1fa90bd7801f23373795
PROVIDERS_PACKAGE_JSON_SHA256 = 612420ac57d04a08e0e441e809aa3b22dbefc0cdc2f711b491b82c7a770113f0
```

The package-manifest change only appends `test/pdf-form-inspect-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that read-only form inspection through the exact
adopted runtime reports the document form type and a per-page annotation
census matching the rehearsed corpus contract, closes every handle it
opens, mutates zero caller bytes, fails unopenable input closed, and
performs no observed network attempt.

It does not prove field name/value reads (getter-blocked), fill, revision
creation, supervision layers, revision minting, signature preservation,
corpus-wide compatibility, performance bounds, or native/server parity.

## 9. Explicit non-grants

```text
FIELD_NAME_OR_VALUE_READ = NOT_AUTHORIZED / PROVIDER_BLOCKED
FILL = NOT_AUTHORIZED (done in #308)
REVISION_CREATION_OR_SAVE = NOT_AUTHORIZED (read-only grain)
MUTATION_SUPERVISION_COMPOSITION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004G_K = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 10. Merge and successor gates

Same gates as prior grains on the four authorized paths. No successor
authority is inherited from this document; on canonical closure 004F is
assessed complete in the closeout, and the next lane reconciles separately.

The final document SHA-256 is recorded in external GitHub qualification
evidence after the file is complete; the document does not contain a
self-referential digest.
