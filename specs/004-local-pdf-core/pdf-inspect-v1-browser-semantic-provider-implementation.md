# PDF_INSPECT_V1 browser semantic provider implementation qualification

## 1. Purpose

This artifact qualifies the bounded pure semantic browser-provider layer authorized by `github:issue-comment:5671364613`.

The unit converts already-qualified, already-bound structural evidence from the canonical PDFium structural-evidence adapter into the provider-operation semantics required by `PDF_INSPECT_V1`. It does not execute the PDF engine and does not replace the canonical provider-neutral admission layer.

```text
UNIT = PDF_INSPECT_V1_BROWSER_SEMANTIC_PROVIDER_IMPLEMENTATION
CAPABILITY_CODE = PDF_INSPECT_V1
CAPABILITY_VERSION = 1
EFFECT_CLASS = READ_ONLY
PROVIDER_KIND = BROWSER
LOCALITY = LOCAL_ONLY
CANONICAL_BASE = 3da262fbe0ebc9d5f19dcebf89be3dcc19a22f4a
CANONICAL_BASE_TREE = d5cc46f92685c5fce00f6f39bc0f327f653e1228
```

## 2. Authorized repository surface

Exactly these paths are authorized:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-inspect-provider.js
packages/providers/test/pdf-inspect-provider.test.js
specs/004-local-pdf-core/pdf-inspect-v1-browser-semantic-provider-implementation.md
```

The package manifest change only extends the existing provider test script to include `test/pdf-inspect-provider.test.js`. No dependency declaration changes.

## 3. Canonical predecessors

This implementation consumes without reopening:

- Specification 003D stable error classes and retry semantics;
- Specification 003E provider capability/support/availability/locality and result semantics;
- Specification 004A read-only operation and resource/cancellation/timeout boundaries;
- Specification 004C `PDF_INSPECT_V1` request/result and browser-provider contracts;
- canonical provider-neutral content identity admission;
- canonical `@embedpdf/pdfium@2.15.0` structural runtime qualification;
- canonical pure PDFium structural-evidence adapter.

No predecessor contract is weakened by this unit.

## 4. Provider and capability identity

The Signthos provider identity is distinct from npm/package identity:

```text
providerId = signthos.pdf.browser.embedpdf-v2.15.0-pdfium
providerKind = BROWSER
locality = LOCAL_ONLY
providerCandidateId = embedpdf-v2.15.0-pdfium-browser
providerCapabilityVersion = signthos.pdf.inspect.v1
capabilityContractVersion = signthos.provider-capability.v1
```

The semantic capability is:

```text
capabilityCode = PDF_INSPECT_V1
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

None of these implementation identifiers becomes document identity, revision identity, or a domain capability code.

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
capabilityParameters = {}
```

Rules:

1. request objects must use `Object.prototype` or `null` as their prototype;
2. proxy-backed request objects fail closed before proxy traps are used for request parsing;
3. accessors are not accepted as qualified request fields;
4. identifiers must be non-empty after trimming;
5. digest and byte length must exactly match the supplied input `Buffer`;
6. the canonical revision binding must be valid for the exact `documentId` and `inputRevisionId`;
7. inspect capability parameters are empty in this unit; a provider-private option bag is invalid;
8. unknown top-level request fields are rejected rather than silently becoming provider/runtime options.

The implementation copies validated semantic capability values into its internal frozen state. It does not freeze or otherwise mutate nested objects supplied by the caller.

## 6. Exact input and revision binding

The provider recomputes exact input identity through canonical `exactByteIdentity()` and binds the same bytes using canonical `createContentInputBinding()`.

A success requires all of:

```text
request.inputExactBytesDigest == exact SHA-256 of supplied bytes
request.inputByteLength == supplied byte length
request.documentId == exact originating document identity
request.inputRevisionId == exact immutable revision identity
structuralEvidence.inputExactBytesDigest == same exact SHA-256
structuralEvidence.byteLength == same exact byte length
```

A mismatch never retargets another revision, alias, path, URL, cache entry, or provider-private handle.

## 7. Capability and availability semantics

The provider descriptor declares only `PDF_INSPECT_V1` version `1` for this operation.

A request for another capability code/version, or another provider capability-contract version, returns stable:

```text
UNSUPPORTED_CAPABILITY
```

The selected provider identity itself must match exactly. Provider identity mismatch is `INVALID_INPUT` rather than provider substitution.

Runtime availability is separate from support:

```text
AVAILABLE
UNAVAILABLE
UNKNOWN
```

Only `AVAILABLE` may continue toward structural semantic composition. Both `UNAVAILABLE` and `UNKNOWN` fail closed as stable `UNAVAILABLE` with `RETRY_MAY_SUCCEED` guidance. No network fallback is selected or attempted.

An unknown availability vocabulary value is `INVALID_INPUT`.

## 8. Canonical structural-evidence boundary

The semantic provider accepts only exact evidence compatible with the canonical `pdfium-structural-evidence.js` adapter.

Common binding requirements include:

```text
providerId = @embedpdf/pdfium
providerCapabilityVersion = signthos.pdfium.structural-open.v1
packageIdentity = @embedpdf/pdfium@2.15.0
version = 2.15.0
embedpdfSourceCommit = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
pdfiumSubmoduleRevision = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
wasmSha256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
```

The evidence digest and byte length must match the operation bytes exactly.

Custom prototypes, proxy-backed shapes, accessors, extra structural fields, extra provider-observation fields, or altered provider/version evidence do not qualify.

## 9. Successful inspect mapping

The only successful structural input shape is equivalent to:

```text
state = STRUCTURAL_INSPECTION_COMPLETE
structuralIdentityResult = PDF_STRUCTURE_ACCEPTED
providerObservation = {
  openSucceeded = true
  pageCount = nonnegative safe integer
}
```

It produces provider outcome:

```text
outcome = SUCCEEDED
operationId = exact request operationId
capabilityRef = PDF_INSPECT_V1 / 1
providerId = signthos.pdf.browser.embedpdf-v2.15.0-pdfium
providerKind = BROWSER
locality = LOCAL_ONLY
effectClass = READ_ONLY
documentId = exact request documentId
inputRevisionId = exact request inputRevisionId
inputExactBytesDigest = exact input SHA-256
inputByteLength = exact input byte length
newCanonicalRevisionCreated = false
```

The bounded observation is:

```text
pageCount = qualified PDFium page count
warnings = []
unsupportedObservations = [
  pageBoxes,
  pageRotations,
  encryptionState,
  metadataPresence,
  formPresence,
  attachmentPresence,
  activeContentIndicators
]
```

Unsupported/unknown fields are not guessed as false, empty, safe, valid, absent, or verified.

## 10. Malformed/untrusted input normalization

The canonical structural adapter may emit qualified input rejection only as:

```text
state = STRUCTURAL_INSPECTION_INPUT_REJECTED
structuralIdentityResult = ABSENT
providerObservation.openSucceeded = false
providerObservation.pdfiumLastError = 3
providerObservation.pdfiumErrorConstant = FPDF_ERR_FORMAT
providerObservation.pdfiumErrorMeaning = File not in PDF format or corrupted
```

This semantic provider normalizes that bounded provider evidence to:

```text
outcome = FAILED
stableError.errorClass = MALFORMED_UNTRUSTED_DOCUMENT
stableError.errorCode = malformed_untrusted_document.pdfium_format_or_corruption
stableError.retryCategory = RETRY_REQUIRES_CHANGED_INPUT_OR_STATE
```

Provider-private diagnostics preserve only:

```text
providerErrorCode = 3
providerErrorConstant = FPDF_ERR_FORMAT
providerErrorMeaning = File not in PDF format or corrupted
```

The result does not assert `NOT_PDF`, `PDF_STRUCTURE_REJECTED`, PDF conformance, corruption subtype, malware absence, signature validity, certificate trust, non-polyglot status, redaction safety, or universal safety.

## 11. Invalid-input boundary

Stable `INVALID_INPUT` is used for malformed static/domain inputs including:

- non-Buffer input bytes;
- malformed/custom-prototype/proxy-backed request shapes;
- accessors in qualified request/nested fields;
- whitespace-only semantic identifiers;
- digest or byte-length mismatch;
- provider identity mismatch;
- non-empty capability option bags;
- unknown request fields;
- unknown availability vocabulary;
- structural-evidence digest/length/provider/version mismatch;
- structural-evidence shapes not exactly emitted by the canonical adapter;
- structural observation accessors or extra/contradictory fields.

No such case may publish a successful observation.

## 12. Cancellation, timeout, and resource-limit boundary

This unit is pure semantic composition and owns no runtime execution, cancellation mechanism, deadline mechanism, worker lifecycle, or resource enforcement.

The authority permits terminal cancellation/timeout/resource-limit semantics only when backed by already-confirmed runtime evidence. No canonical runtime-terminal-evidence schema is authorized in this unit.

Therefore a supplied `terminalOutcomeEvidence` value is never ignored and never converted into `SUCCEEDED`; it fails closed as:

```text
INVALID_INPUT
invalid_input.runtime_terminal_evidence_not_qualified
```

A later explicitly authorized runtime grain may define and qualify the schema needed to represent `CANCELLED`, `TIMED_OUT`, or `RESOURCE_LIMIT_EXCEEDED`. This unit does not fabricate such evidence.

## 13. Read-only and locality invariants

The provider result always preserves:

```text
effectClass = READ_ONLY
locality = LOCAL_ONLY
newCanonicalRevisionCreated = false
```

The implementation:

- does not write or normalize source PDF bytes;
- does not create a new `DocumentRevision`;
- does not import or initialize PDFium;
- does not execute WASM;
- does not parse bytes independently;
- does not render pages or thumbnails;
- does not extract/select/search text;
- does not perform network I/O;
- does not acquire/install dependencies;
- does not silently select a remote provider.

## 14. Mutation and accessor safety

The regression suite proves that semantic composition does not mutate:

- input bytes;
- the request object;
- nested request capability/digest objects;
- structural evidence.

Request and structural evidence accessors are rejected through property-descriptor inspection without invoking getter code. Proxy-backed requests are rejected before Buffer/prototype/property inspection that could execute proxy traps.

Successful output objects are deeply frozen and contain only newly constructed/sanitized semantic state or already-canonical frozen provider/version evidence.

## 15. Package surface

`packages/providers/package.json` changes only:

```text
node --test test/content-identity-admission.test.js test/pdfium-structural-evidence.test.js
```

to:

```text
node --test test/content-identity-admission.test.js test/pdfium-structural-evidence.test.js test/pdf-inspect-provider.test.js
```

No dependency key is added, removed, or changed.

## 16. Preserved first qualification failure

The first exact-Node sequence is preserved by `github:issue-comment:5671548073`.

```text
CHECK_SOURCE_RC = 0
CHECK_TEST_RC = 0
COMBINED_TEST_RC = 1
TESTS = 88
PASS = 86
FAIL = 2
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

The failures proved:

1. whitespace-only document/revision identifiers needed stricter semantic-layer validation;
2. proxy rejection needed to occur before `Buffer.isBuffer()`/prototype inspection to prevent proxy trap execution.

No commit, push, PR, PDFium runtime, WASM, Docker, network document processing, or dependency operation resulted from the failed sequence.

The failure is evidence; it is not qualification evidence.

## 17. Shared PR reconciliation and fresh qualification result

A concurrent same-unit candidate appeared as PR #248 while the stricter local candidate was still uncommitted. `github:issue-comment:5671601223` adopted PR #248 as the single shared candidate and quarantined the unpushed local branch. The shared first head was `cc17641a8b7a3be72352121f931bdb6424467fd4` / tree `2da11002e16381efd36b2da2875e1dfa43897c19`.

The stricter semantic source/tests were projected forward-only onto that exact shared predecessor without rebase, amend, force push, or history rewrite. A staged gate found one trailing blank line at the end of the reconciled test file; that whitespace was normalized before qualification, making the earlier local 88/88 test identity stale.

The exact commands authorized by `github:issue-comment:5671364613` were then executed fresh on the reconciled shared-candidate bytes using only the verified Node `v24.20.0` executable.

```text
node --check packages/providers/src/pdf/browser/pdf-inspect-provider.js = PASS / RC 0
node --check packages/providers/test/pdf-inspect-provider.test.js = PASS / RC 0
node --test packages/providers/test/content-identity-admission.test.js packages/providers/test/pdfium-structural-evidence.test.js packages/providers/test/pdf-inspect-provider.test.js = PASS / RC 0
```

Exact qualification result:

```text
NODE_VERSION = v24.20.0
NODE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
TESTS = 88
PASS = 88
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
SOURCE_SHA256 = 7cbc27fb582f70c546c22c09226701c197b78113ed1dab01eacee035a57afeb1
TEST_SHA256 = 3c3582a2628ee40d9c4df036effdf7454605acaf6846497fa05a29cdc7715531
PACKAGE_SHA256 = cad2f4b354e1d0dee560f0bdf52421bbeff3165a1ecf8c9f99f009aa71e647a8
TEST_STDOUT_SHA256 = 0bbc67c8a228b661565a02dc73772c3948f35aba5c287c9da7f876a1105c3777
TEST_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
VALIDATION_SUMMARY_SHA256 = 48413489699460f4f5cd01dd01e414f8a7cdd4f0040b0e46de7e3a8507873d05
EVIDENCE_MANIFEST_ENTRIES = 14
EVIDENCE_MANIFEST_SHA256 = 294f1cc7145f98598232377afe0ea55c86c18ff2b491a59b1f9962e7f51a32f9
```

The reconciled fresh PASS is preserved by `github:issue-comment:5671619024`.

No Node rerun is required for this documentation-only synchronization because the source/test/package bytes above are unchanged after the successful sequence. The prior local PASS in `github:issue-comment:5671562490` remains historical evidence only and does not qualify the reconciled test bytes.

## 18. Regression coverage

The combined suite proves at minimum:

- accepted ordinary and trailing-inert fixtures produce bounded inspect success with exact page count;
- qualified PDFium format/corruption rejection produces `MALFORMED_UNTRUSTED_DOCUMENT` and no success observations;
- capability code/version mismatch is unsupported rather than substituted;
- provider identity mismatch is invalid input;
- `UNAVAILABLE` and `UNKNOWN` availability fail closed without network fallback;
- digest/length mismatch fails before success;
- structural evidence bound to different bytes fails closed;
- provider/version/capability evidence mismatch fails closed;
- contradictory accepted/rejected structural observations fail closed;
- request custom prototypes and accessors fail without getter execution;
- nested digest/capability accessors fail without getter execution;
- proxy-backed request objects fail without proxy-trap execution;
- non-empty capability option bags and unknown top-level request fields fail closed;
- supplied terminal runtime evidence cannot be silently converted into success;
- structural evidence must match exact adapter shape and exact PDFium error meaning;
- structural observation accessors fail without getter execution;
- request/evidence/input bytes remain unchanged;
- successful output is deeply frozen;
- no signature/safety/non-polyglot claims are synthesized;
- all four canonical fixture results preserve exact input identity and create no revision.

## 19. Explicit non-grants

```text
PDFIUM_IMPORT_OR_INITIALIZATION = NOT_AUTHORIZED
PDFIUM_WASM_EXECUTION = NOT_AUTHORIZED
SECOND_STRUCTURAL_RUNTIME_ATTEMPT = NOT_AUTHORIZED
BROWSER_RUNTIME_EXECUTION = NOT_AUTHORIZED
PDF_PAGE_RENDER_V1 = NOT_AUTHORIZED
PDF_THUMBNAIL_RENDER_V1 = NOT_AUTHORIZED
PDF_TEXT_EXTRACT_V1 = NOT_AUTHORIZED
PDF_TEXT_SELECT_V1 = NOT_AUTHORIZED
PDF_TEXT_SEARCH_V1 = NOT_AUTHORIZED
NETWORK_DOCUMENT_PROCESSING = NOT_AUTHORIZED
DEPENDENCY_ACQUISITION_OR_INSTALLATION = NOT_AUTHORIZED
ROOT_PACKAGE_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
FIXTURE_MUTATION = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 20. Canonicalization gate

This implementation is only a candidate until all of the following are true for one unchanged exact head:

1. the base/head/tree and exact four-path surface are frozen;
2. `git diff --check` passes;
3. fresh independent substantive exact-head review reports no material findings;
4. zero unresolved material review threads remain;
5. immediate premerge race proof confirms unchanged canonical main and reviewed head;
6. guarded normal merge uses the exact reviewed head SHA;
7. post-merge verification proves ordered parents, merge-tree equality, valid GitHub signature, exact surface and truthful workflow accounting;
8. Issue #7 receives canonical closeout and fresh successor reconciliation.

No successor authority is inferred from this candidate.
