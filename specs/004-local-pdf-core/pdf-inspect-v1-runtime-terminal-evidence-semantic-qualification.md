# PDF_INSPECT_V1 Runtime-Terminal Evidence Semantic Qualification

Status: `IMPLEMENTATION_CANDIDATE / SEMANTIC_ONLY / NO_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5671808320`
Validation record: `github:issue-comment:5671845616`

## 1. Purpose

This bounded unit qualifies the Signthos semantic contract for terminal `PDF_INSPECT_V1` runtime evidence before any browser/PDFium runtime integration.

It does not execute PDFium, WASM, Docker, a browser, a worker, or any document-processing network path. It defines how already-confirmed runtime terminal evidence may be represented without being dropped, normalized into success, or confused with structural inspection evidence.

Canonical base:

```text
commit = 477f396bd1524c7e2a2ecc32bee4caa82c8acd2f
tree = aaf224396fd236fde784e90849f1ae5f85d5e632
```

## 2. Authorized repository surface

Exactly these paths are authorized by this unit:

```text
packages/providers/src/pdf/browser/pdf-inspect-provider.js
packages/providers/test/pdf-inspect-provider.test.js
specs/004-local-pdf-core/pdf-inspect-v1-runtime-terminal-evidence-semantic-qualification.md
```

No package manifest, lockfile, fixture, dependency, provenance, workflow, container, database, or runtime asset changes are authorized.

## 3. Canonical predecessors

This unit consumes without weakening:

- the canonical Specification 004 read-only/locality/resource/cancellation model;
- the canonical 004C browser provider-entry contract;
- the canonical content-identity/admission boundary;
- the canonical PDFium structural runtime qualification;
- the canonical PDFium structural-evidence adapter;
- the canonical `PDF_INSPECT_V1` browser semantic provider implementation closed by `github:issue-comment:5671777399`.

The predecessor semantic provider intentionally rejected all `terminalOutcomeEvidence` because no terminal-evidence schema was qualified. That fail-closed behavior is replaced only by the exact schema in this unit.

## 4. Why this unit precedes browser runtime integration

Canonical 004C requires runtime outcomes to distinguish:

```text
CANCELLED
TIMED_OUT
RESOURCE_LIMIT_EXCEEDED
UNAVAILABLE
FAILED
SUCCEEDED
```

The canonical request already binds exact input identity, provider identity, provider capability version, and `resourceBudgetRef`. It does not contain a qualified deadline field, so this unit does not invent one.

A browser runtime bridge cannot safely report cancellation, timeout, or resource exhaustion until the Signthos semantic boundary can validate and preserve those outcomes without publishing partial success.

## 5. Exact terminal-evidence schema

Qualified evidence is a strict plain object or null-prototype object containing exactly these own data fields:

```text
schema
terminalOutcome
providerId
providerCapabilityVersion
inputExactBytesDigest
byteLength
resourceBudgetRef
runtimeEvidenceRef
partialOutputDiscarded
```

The required values are:

```text
schema = signthos.pdf.inspect.runtime-terminal.v1
terminalOutcome = CANCELLED | TIMED_OUT | RESOURCE_LIMIT_EXCEEDED
providerId = signthos.pdf.browser.embedpdf-v2.15.0-pdfium
providerCapabilityVersion = signthos.pdf.inspect.v1
inputExactBytesDigest = exact SHA-256 identity of the operation bytes
byteLength = exact operation byte length
resourceBudgetRef = exact request resourceBudgetRef
runtimeEvidenceRef = non-empty opaque evidence reference
partialOutputDiscarded = true
```

Custom prototypes, proxy-backed objects, accessors, inherited required fields, symbol keys, extra keys, missing keys, or altered binding values are unqualified.

## 6. Exact byte and operation binding

The terminal evidence must match the already-validated request/input binding exactly:

```text
terminal.inputExactBytesDigest == request/input exact digest
terminal.byteLength == request/input byte length
terminal.providerId == canonical PDF_INSPECT_V1 provider id
terminal.providerCapabilityVersion == canonical PDF_INSPECT_V1 capability version
terminal.resourceBudgetRef == request.resourceBudgetRef
```

No path, URL, filename, cache key, provider-private handle, or caller-declared media type can substitute for this binding.

## 7. Terminal outcome semantics

### 7.1 Cancellation

Qualified `CANCELLED` evidence maps to:

```text
outcome = CANCELLED
stableError.errorClass = CANCELLED
stableError.errorCode = cancelled.pdf_inspect_runtime
stableError.retryCategory = RETRY_MAY_SUCCEED
```

### 7.2 Timeout

Qualified `TIMED_OUT` evidence maps to:

```text
outcome = TIMED_OUT
stableError.errorClass = TIMEOUT
stableError.errorCode = timeout.pdf_inspect_runtime
stableError.retryCategory = RETRY_REQUIRES_CHANGED_INPUT_OR_STATE
```

### 7.3 Resource exhaustion

Qualified `RESOURCE_LIMIT_EXCEEDED` evidence maps to:

```text
outcome = RESOURCE_LIMIT_EXCEEDED
stableError.errorClass = RESOURCE_LIMIT_EXCEEDED
stableError.errorCode = resource_limit_exceeded.pdf_inspect_runtime
stableError.retryCategory = RETRY_REQUIRES_CHANGED_INPUT_OR_STATE
```

Each terminal result preserves `READ_ONLY`, `LOCAL_ONLY`, exact revision/input binding, and `newCanonicalRevisionCreated=false`.

## 8. Partial-output boundary

A qualified terminal evidence record requires:

```text
partialOutputDiscarded = true
```

The semantic result publishes no `observations` field and no partial page-count/search/render result. This prevents late or incomplete provider output from being represented as exhaustive or successful operation evidence.

The normalized result retains only:

```text
runtimeTerminalEvidence.schema
runtimeTerminalEvidence.runtimeEvidenceRef
runtimeTerminalEvidence.partialOutputDiscarded = true
```

The opaque reference points to separately controlled runtime evidence; it does not embed document content or provider-private diagnostics in the semantic result.

## 9. Contradiction handling

`terminalOutcomeEvidence` and `structuralEvidence` cannot both be supplied for the same composition call. Such input fails closed as:

```text
INVALID_INPUT
invalid_input.runtime_terminal_evidence_conflict
```

Likewise, terminal evidence supplied while provider availability is `UNAVAILABLE` or `UNKNOWN` is internally contradictory and fails as:

```text
INVALID_INPUT
invalid_input.runtime_terminal_availability_conflict
```

This avoids silently preferring one incompatible evidence path and dropping the other.

## 10. Invalid terminal evidence

Malformed or unqualified terminal evidence fails as:

```text
outcome = FAILED
stableError.errorClass = INVALID_INPUT
stableError.errorCode = invalid_input.runtime_terminal_evidence
observations = ABSENT
```

Invalid cases include, without limitation:

- unknown schema/version;
- unknown terminal outcome;
- provider mismatch;
- capability-version mismatch;
- digest mismatch;
- byte-length mismatch;
- resource-budget mismatch;
- empty/whitespace-only runtime evidence reference;
- `partialOutputDiscarded != true`;
- extra or missing fields;
- custom prototypes;
- inherited required fields;
- symbol keys;
- accessors;
- proxies.

## 11. Accessor and proxy safety

The implementation reuses the canonical provider's descriptor-based own-data-field helpers.

Proxy-backed evidence is rejected by `util.types.isProxy()` before prototype/property traversal. Accessors are rejected through own-property descriptor inspection without invoking getter code. Symbol/extra keys are rejected through exact-own-key validation.

Therefore malformed evidence cannot execute a getter or proxy trap merely by being validated as terminal evidence.

## 12. Existing provider behavior preserved

When no terminal evidence is supplied, existing canonical behavior remains unchanged:

- exact `PDF_INSPECT_V1` capability validation;
- exact provider identity and capability-version validation;
- `UNAVAILABLE`/`UNKNOWN` availability behavior;
- exact request digest/length/revision binding;
- strict canonical structural-evidence validation;
- accepted structural inspection success;
- qualified PDFium format/corruption rejection;
- no network fallback;
- no canonical revision creation.

## 13. Validation toolchain

Validation used only the previously qualified official Node executable:

```text
node version = v24.20.0
node executable SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
toolchain qualification record SHA256 = 18fe06392700a2026bce899f949a18e09ca6d0817b487a650071f1019640a39b
```

Authorized commands executed exactly once on the final source/test bytes:

```text
node --check packages/providers/src/pdf/browser/pdf-inspect-provider.js = PASS / RC 0
node --check packages/providers/test/pdf-inspect-provider.test.js = PASS / RC 0
node --test packages/providers/test/content-identity-admission.test.js packages/providers/test/pdfium-structural-evidence.test.js packages/providers/test/pdf-inspect-provider.test.js = PASS / RC 0
```

Combined test result:

```text
TESTS = 92
PASS = 92
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

Evidence identities:

```text
SOURCE_SHA256 = aa0ec7816a305a8a0abc1e221e4ebfa1a227f42f0c9015cbbd914e256e6f493a
TEST_SHA256 = 79fa5aee012a8d4c3049896beb46b446b535bee92e88f0049d8fe627c97fabd9
TEST_STDOUT_SHA256 = 5df32cad4db41bd04396f5ee7c899860df591f96fa6fb9b416659f46141e9fb5
TEST_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
VALIDATION_SUMMARY_SHA256 = eefa783563b1683af8b5dd01759d2c8c23b32be50bfb18650d30afa7446f8bc3
EVIDENCE_MANIFEST_SHA256 = e32026f94aada043e01da39ac1f9e8ad12a4c0d0f15052753719a47bc7d616cc
```

The validation is preserved by `github:issue-comment:5671845616`.

## 14. Regression coverage

The combined suite proves at minimum:

- all three terminal outcomes remain distinct;
- exact byte identity is mandatory;
- exact provider/capability binding is mandatory;
- exact resource-budget binding is mandatory;
- `partialOutputDiscarded` must be exactly true;
- unknown/malformed terminal evidence fails closed;
- terminal and structural evidence cannot coexist;
- unavailable/unknown provider state cannot coexist with terminal evidence;
- custom prototypes, inherited fields, symbols, accessors, and proxies fail closed;
- getter/proxy traps are not executed during rejection;
- semantic result objects are deeply frozen;
- bytes, request, and evidence are not mutated;
- previous inspect/admission/adapter behavior remains green in the same combined suite.

## 15. Explicit non-grants

```text
PDFIUM_IMPORT_OR_INITIALIZATION = NOT_AUTHORIZED
PDFIUM_WASM_EXECUTION = NOT_AUTHORIZED
BROWSER_RUNTIME_EXECUTION = NOT_AUTHORIZED
SECOND_STRUCTURAL_RUNTIME_ATTEMPT = NOT_AUTHORIZED
PDF_PAGE_RENDER_V1 = NOT_AUTHORIZED
PDF_THUMBNAIL_RENDER_V1 = NOT_AUTHORIZED
PDF_TEXT_EXTRACT_V1 = NOT_AUTHORIZED
PDF_TEXT_SELECT_V1 = NOT_AUTHORIZED
PDF_TEXT_SEARCH_V1 = NOT_AUTHORIZED
DEPENDENCY_MUTATION = NOT_AUTHORIZED
ROOT_PACKAGE_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
FIXTURE_MUTATION = NOT_AUTHORIZED
NETWORK_DOCUMENT_PROCESSING = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

This unit does not claim that cancellation, timeout, or resource limits have been executed or measured in a browser runtime. It only qualifies how later independently proven runtime-terminal evidence is admitted into the Signthos semantic provider result.

## 16. Canonicalization gate

This candidate is not canonical merely because local tests pass. Canonicalization requires:

1. exact three-path diff accounting and `git diff --check`;
2. truthful exact-head check/provider accounting;
3. fresh independent substantive exact-head review of the complete candidate;
4. forward-only repair of every material finding;
5. zero unresolved material review threads;
6. immediate premerge race proof;
7. guarded normal merge using exact `expected_head_sha`;
8. mechanical post-merge tree/parent/signature/surface/status verification;
9. fresh Issue #7 successor reconciliation before any runtime or further capability work.

No successor authority is inferred from this candidate.
