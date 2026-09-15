# PDF_RENDER_V1 browser semantic provider implementation qualification

## 1. Purpose

This artifact qualifies the bounded pure semantic browser-provider layer authorized by
`github:issue-comment:5676258901` (fresh post-PR-259 successor reconciliation).

The unit converts an already-qualified raw page-render observation from the canonical
local-WASM render runtime core (`pdf-render-runtime.js`) into the provider-operation
semantics required by `PDF_RENDER_V1`. It does not execute the PDF engine, does not
replace the canonical provider-neutral admission layer, and does not modify the raw
render runtime.

```text
UNIT = PDF_PAGE_RENDER_V1_PROVIDER_IMPLEMENTATION
CAPABILITY_CODE = PDF_RENDER_V1
CAPABILITY_VERSION = 1
EFFECT_CLASS = READ_ONLY
PROVIDER_KIND = BROWSER
LOCALITY = LOCAL_ONLY
CANONICAL_BASE = 5d1a4137b85b3b51bd57aca3daf9b6dc2d633fc9
CANONICAL_BASE_TREE = 2a5131eb20ec9a991890f9ce27b36d43657f334f
MAX_CHANGED_FILES = 4
```

## 2. Authorized repository surface

Exactly these paths are authorized:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-render-provider.js
packages/providers/test/pdf-render-provider.test.js
specs/004-local-pdf-core/pdf-render-v1-provider-implementation.md
```

The package manifest change only extends the existing provider test script to include
`test/pdf-render-provider.test.js`. No dependency declaration changes.

## 3. Canonical predecessors

This implementation consumes without reopening:

- Specification 003D stable error classes and retry semantics;
- Specification 003E provider capability/support/availability/locality and result semantics;
- Specification 004A read-only operation and resource/cancellation/timeout boundaries;
- canonical provider-neutral content identity admission;
- canonical `@embedpdf/pdfium@2.15.0` structural runtime qualification;
- canonical pure PDFium structural-evidence adapter (provider/version evidence source);
- canonical `PDF_INSPECT_V1` browser semantic provider (mirrored request/availability/
  error/retry/fail-closed discipline);
- canonical `PDF_PAGE_RENDER_V1` local-WASM runtime core (raw observation contract).

No predecessor contract is weakened by this unit. The raw render runtime is unchanged.

## 4. Provider and capability identity

The Signthos provider identity is distinct from npm/package identity:

```text
providerId = signthos.pdf.browser.embedpdf-v2.15.0-pdfium
providerKind = BROWSER
locality = LOCAL_ONLY
providerCandidateId = embedpdf-v2.15.0-pdfium-browser
providerCapabilityVersion = signthos.pdf.render.v1
capabilityContractVersion = signthos.provider-capability.v1
```

The semantic capability is:

```text
capabilityCode = PDF_RENDER_V1
capabilityVersion = 1
effectClass = READ_ONLY
```

Implementation evidence remains evidence only:

```text
packageIdentity = @embedpdf/pdfium@2.15.0
version = 2.15.0
embedpdfSourceCommit = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
pdfiumSubmoduleRevision = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
wasmSha256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
```

None of these implementation identifiers becomes document identity, revision identity,
or a domain capability code.

## 5. Request contract

The bounded semantic request requires own data properties for exactly:

```text
operationId
capabilityRef
  capabilityCode
  capabilityVersion
documentId
inputRevisionId
inputExactBytesDigest
  algorithm
  value
inputByteLength
providerId
providerCapabilityVersion
resourceBudgetRef
capabilityParameters
  pageIndex
  maxPixels
```

Rules:

1. request objects must use `Object.prototype` or `null` as their prototype;
2. proxy-backed request objects fail closed before proxy traps are used for request parsing;
3. accessors are not accepted as qualified request fields (descriptors are read without
   invoking getters);
4. identifiers must be non-empty after trimming;
5. digest and byte length must exactly match the supplied input `Buffer`;
6. the canonical revision binding must be valid for the exact `documentId` and
   `inputRevisionId`;
7. `capabilityParameters` carries exactly `{ pageIndex, maxPixels }`: `pageIndex` must
   be a non-negative safe integer and `maxPixels` a positive safe integer; any missing,
   extra, mistyped, or out-of-range parameter fails the request;
8. unknown top-level request fields are rejected rather than silently becoming
   provider/runtime options.

The implementation copies validated semantic values into its internal frozen state.
It does not freeze or otherwise mutate nested objects supplied by the caller.

## 6. Exact input and revision binding

The provider recomputes exact input identity through canonical `exactByteIdentity()`
and binds the same bytes using canonical `createContentInputBinding()`.

A success requires all of:

```text
request.inputExactBytesDigest == exact SHA-256 of supplied bytes
request.inputByteLength == supplied byte length
request.documentId == exact originating document identity
request.inputRevisionId == exact immutable revision identity
renderEvidence.pageIndex == request.capabilityParameters.pageIndex
```

A mismatch never retargets another revision, alias, path, URL, cache entry, or
provider-private handle.

## 7. Capability and availability semantics

The provider descriptor declares only `PDF_RENDER_V1` version `1` for this operation.

A request for another capability code/version, or another provider capability-contract
version, returns stable:

```text
UNSUPPORTED_CAPABILITY / unsupported_capability.pdf_render_v1
```

The selected provider identity itself must match exactly. Provider identity mismatch is
`INVALID_INPUT / invalid_input.provider_mismatch` rather than provider substitution.

Runtime availability is separate from support:

```text
AVAILABLE
UNAVAILABLE
UNKNOWN
```

`UNAVAILABLE` and `UNKNOWN` return stable `UNAVAILABLE / unavailable.pdf_render_provider`
with `RETRY_MAY_SUCCEED` and publish no observations. Any other availability value is
`INVALID_INPUT / invalid_input.availability_state`.

## 8. Raw render observation validation

The provider accepts only the exact raw observation shapes produced by the canonical
render runtime core. Success and rejection shapes are strictly separated.

Success requires exactly these own data properties:

```text
openSucceeded = true
pageIndex (non-negative safe integer, equal to the requested pageIndex)
pageCount (non-negative safe integer, strictly greater than pageIndex)
width (safe integer >= 1)
height (safe integer >= 1)
pixelFormat = BGRA
bytesPerPixel = 4
stride (safe integer >= width * 4)
pixels (Buffer, proxy-rejecting, byteLength == stride * height)
```

Additionally `width * height` must be a safe integer and must not exceed the requested
`maxPixels` caller pixel budget. A page-index mismatch against the request is reported
as `INVALID_INPUT / invalid_input.render_evidence_binding`; every other success-shape
defect is `INVALID_INPUT / invalid_input.render_evidence_shape`.

Rejection requires exactly:

```text
openSucceeded = false
pdfiumLastError = 3
```

The code `3` is the exact qualified PDFium format error (`FPDF_ERR_FORMAT`,
`File not in PDF format or corrupted`). Any other rejection shape maps to
`INVALID_INPUT / invalid_input.render_evidence_shape` with no diagnostics.

Unsafe evidence containers (non-plain objects, proxies, accessors, symbol keys, extra
or missing keys) fail closed as `INVALID_INPUT` without invoking getter or trap code.

## 9. Result semantics

Canonical success maps to:

```text
outcome = SUCCEEDED
observations.pageIndex / pageCount / width / height = validated evidence values
observations.pixelFormat = BGRA
observations.bytesPerPixel = 4
observations.stride = validated stride
observations.pixelByteLength = stride * height
observations.pixelDigest = { algorithm = sha256, value = SHA-256 of the rendered pixels }
observations.warnings = []
```

The result carries the pixel digest, never the pixel bytes. Input binding
(`inputExactBytesDigest`, `inputByteLength`, `documentId`, `inputRevisionId`) is
preserved exactly and `newCanonicalRevisionCreated` is always `false`.

Canonical malformed/untrusted rejection maps to:

```text
outcome = FAILED
stableError = MALFORMED_UNTRUSTED_DOCUMENT
  / malformed_untrusted_document.pdfium_format_or_corruption
  / RETRY_REQUIRES_CHANGED_INPUT_OR_STATE
providerDiagnostics = { providerErrorCode = 3,
  providerErrorConstant = FPDF_ERR_FORMAT,
  providerErrorMeaning = File not in PDF format or corrupted }
```

Failures publish no `observations`. Only the malformed rejection publishes
`providerDiagnostics`. Every result is deeply frozen, read-only, creates no revision,
writes no files, and mutates neither the input bytes nor the supplied evidence.

## 10. Local-only boundary

The provider source contains no reference to any of:

```text
pdf-render-runtime import (semantic layer stays decoupled; synthetic evidence only)
@embedpdf/pdfium code import
WebAssembly
DEFAULT_PDFIUM_WASM_URL
fetch(...) / XMLHttpRequest
Worker( / importScripts
child_process
node:fs / node:path
setTimeout( / setInterval(
http:// / https://
URL / CDN
```

The only Node core imports are `node:crypto` (pixel digest) and `node:util` (proxy
detection). No real PDFium execution is performed or required by this unit.

## 11. Focused provider qualification

The focused provider suite ran under the exact canonical Node identity with synthetic
raw observations only. No `node_modules` materialization is part of the candidate
repository diff.

```text
NODE_VERSION = v24.20.0
```

Focused coverage proves, at minimum:

```text
module exposes only the bounded semantic composer
descriptor freezes the exact browser-local render capability
canonical success maps to SUCCEEDED with exact observations including pixel digest
malformed rejection maps to MALFORMED_UNTRUSTED_DOCUMENT with provider diagnostics
capability/provider mismatches map to the exact stable errors
unavailable/unknown/invalid availability map to the exact stable errors
request digest/length mismatches fail before provider success
capability parameter shape defects fail closed as invalid request
page-index binding mismatch fails closed with the binding error
pixel budget enforcement fails closed while exact budget succeeds
success/rejection pixel-shape defects fail closed without observations or diagnostics
request/evidence accessors and proxies fail closed without getter/trap execution
composition is read-only over bytes, request, and evidence
results are deeply frozen with no signature or safety claim
every canonical fixture preserves exact input identity and creates no revision
unknown request fields fail closed while preserving LOCAL_ONLY
source keeps the local-only semantic boundary
```

Focused results:

```text
FOCUSED_TESTS = 24
FOCUSED_PASS = 24
FOCUSED_FAIL = 0
```

## 12. Complete applicable provider qualification

The complete canonical provider suite, including the new render provider test file as a
separately expanded argument, passed under the exact Node executable with the exact
adopted package exposed through an external `NODE_PATH`. No `node_modules`
materialization is part of the candidate repository diff.

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 242
PASS = 242
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 13. Candidate file identities

```text
RENDER_PROVIDER_SOURCE_SHA256 = bfe4d6099e3eff02b40d814deb22cda2c582b301562bfda0e00495b229b9c0c5
RENDER_PROVIDER_TEST_SHA256 = 3ae215e6a3a2bffe128ea9555f801cc5e16f35d0e827b9dd0ae74eaed0095449
PROVIDERS_PACKAGE_JSON_SHA256 = bc2068a09eeaa8b0d82362f0260ab02230378ea4f521fce1365adc197719eb55
```

The package-manifest change only appends `test/pdf-render-provider.test.js` to the
existing provider test command. It changes no dependency declaration.

The final document SHA-256 is recorded in external GitHub qualification evidence after
the file is complete; the document does not contain a self-referential digest.

## 14. Exact qualification claim

This candidate proves only that a bounded semantic provider maps already-qualified raw
page-render observations to canonical `PDF_RENDER_V1` success/failure semantics with
exact request, binding, budget, pixel-coherence, availability, error, retry,
read-only, and local-only behavior.

It does not prove render execution determinism beyond the raw core, font-fallback
behavior, annotation rendering, thumbnail/text/search correctness, corpus-wide
compatibility, worker/bridge/supervisor integration, or native/server parity.

## 15. Explicit non-grants

```text
RENDER_SUPERVISOR_OR_BRIDGE = NOT_AUTHORIZED / NOT_IMPLEMENTED
RENDER_TERMINAL_SEMANTICS = NOT_AUTHORIZED / NOT_IMPLEMENTED
PDF_THUMBNAIL_RENDER_V1 = NOT_AUTHORIZED
PDF_TEXT_EXTRACT_V1 = NOT_AUTHORIZED
PDF_TEXT_SELECT_V1 = NOT_AUTHORIZED
PDF_TEXT_SEARCH_V1 = NOT_AUTHORIZED
BROWSER_WORKER_INTEGRATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
CDN_RUNTIME_FETCH = NOT_AUTHORIZED / NOT_USED
FONT_FALLBACK_CONFIGURATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 16. Merge and successor gates

This candidate is not canonical until all of the following hold on the exact final head:

1. the final diff contains only the four authorized paths;
2. exact Node qualification is rerun after the qualification document is complete;
3. source/test/package/document hashes are recorded for the final bytes;
4. `git diff --check` is clean;
5. repository status is byte-identical before and after final qualification;
6. a fresh independent substantive exact-head review reports no material findings;
7. all material review threads are resolved;
8. live `main`, candidate head/tree, changed paths, open-PR set, and applicable status
   truth are reverified immediately before merge;
9. merge uses normal merge with exact expected head SHA and no history rewriting;
10. post-merge tree, ordered parents, signature, changed surface, PR state, and
    open-PR state are mechanically verified;
11. Issue #7 receives canonical closeout;
12. a fresh successor reconciliation determines the next minimum dependency-ordered unit.

No successor authority is inherited from this document.
