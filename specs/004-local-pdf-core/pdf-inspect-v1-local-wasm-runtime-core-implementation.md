# PDF_INSPECT_V1 Local-WASM Runtime Core Implementation Qualification

Status: candidate implementation qualification pending independent exact-head review and canonical merge.

Owning specification: `004-local-pdf-core`

## 1. Purpose

This artifact records the bounded implementation of the raw `PDF_INSPECT_V1` PDFium lifecycle core authorized by `github:issue-comment:5672236025`.

The implementation deliberately stops below the semantic provider boundary. It accepts caller-supplied source bytes, caller-supplied exact local/application-bundled WASM bytes, and an injected PDFium initializer. It produces only a raw open/page-count observation or a raw PDFium last-error observation.

This unit does not import or initialize the real `@embedpdf/pdfium` package during qualification. It does not execute PDFium WASM, a browser, a worker, a network request, a renderer, text extraction, selection, or search.

## 2. Authority and exact base

```text
UNIT = PDF_INSPECT_V1_LOCAL_WASM_RUNTIME_CORE_IMPLEMENTATION
AUTHORITY = github:issue-comment:5672236025
CANONICAL_BASE = 28fbc72fe35ff779509632878f882588a35f004e
CANONICAL_BASE_TREE = c692c69fba79775ca8f31aa9c7df6d4afb21b2e8
MAX_CHANGED_REPOSITORY_FILES = 4
```

The authorized repository paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-inspect-runtime.js
packages/providers/test/pdf-inspect-runtime.test.js
specs/004-local-pdf-core/pdf-inspect-v1-local-wasm-runtime-core-implementation.md
```

`packages/providers/package.json` changes only the existing package test command so the new fake-runtime regression suite participates in the provider test set. No dependency, peer dependency, optional dependency, development dependency, package identity, workspace declaration, root package, or lockfile is changed.

## 3. Canonical predecessor state

The canonical predecessor already establishes:

- provider-neutral content identity and exact-byte binding;
- exact `@embedpdf/pdfium@2.15.0` provenance and notice/license closure;
- the PDFium structural-evidence mapper;
- the `PDF_INSPECT_V1` semantic provider;
- runtime-terminal semantic evidence for cancellation, timeout, and resource-limit outcomes;
- the exact PDFium WASM SHA-256 `c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8`;
- a previously consumed one-shot structural runtime proving the exact retained PDFium version can initialize from caller-supplied `wasmBinary` without a CDN URL.

That earlier structural execution is evidence, not authority to rerun PDFium here.

## 4. Local-only asset and network boundary

Canonical `004c1-local-only-browser-asset-network-correction.md` establishes that the upstream PDFium CDN convenience URL and browser-worker CDN font fallback are incompatible with a Signthos `LOCAL_ONLY` qualification unless explicitly overridden by qualified local assets.

The runtime core therefore owns no URL construction or asset discovery. Its initializer boundary is exactly:

```text
initPdfium({ wasmBinary })
```

The implementation source contains no reference to:

```text
@embedpdf/pdfium
DEFAULT_PDFIUM_WASM_URL
cdn.jsdelivr.net
fetch(...)
XMLHttpRequest
http://
https://
```

The caller must provide the WASM bytes. This source unit neither fetches them nor chooses a location for them.

## 5. Caller-supplied byte contract

`inspectPdfWithLocalWasm()` accepts:

```text
bytes       = non-empty Uint8Array-compatible byte view
wasmBinary  = non-empty Uint8Array-compatible byte view
initPdfium  = function
```

Node `Buffer` values satisfy the byte-view boundary because they are `Uint8Array` subclasses. Generic `ArrayBuffer` values are not silently normalized by this core.

Before invoking the injected initializer, the core copies both byte views into private snapshots. The source bytes copied into PDFium memory come from the source snapshot, not from a later potentially changed caller view.

After operation cleanup, both caller-supplied byte views are compared byte-for-byte with their snapshots. Any mutation is a terminal failure; a raw success observation is not returned.

## 6. Injected initializer boundary

The runtime core does not resolve or import a PDFium package. The integration layer must supply `initPdfium`.

The initializer receives one frozen options object with one key only:

```text
{
  wasmBinary
}
```

The exact caller-supplied WASM byte-view object is passed through. No URL, locate-file callback, font fallback, remote base, network option, or vendor-specific hidden option is synthesized by this core.

## 7. Required initialized runtime surface

Before library initialization, the returned object must expose the raw lifecycle members required by this bounded operation:

```text
PDFiumExt_Init
FPDF_LoadMemDocument
FPDF_GetLastError
FPDF_GetPageCount
FPDF_CloseDocument
FPDF_DestroyLibrary
pdfium.HEAPU8
pdfium.wasmExports.malloc
pdfium.wasmExports.free
```

Missing required functions, memory, or allocator surface fail closed before `PDFiumExt_Init()` is called.

The retained exact EmbedPDF source at canonical source commit `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed` declares both `FPDF_LoadMemDocument` and `FPDF_GetPageCount` as numeric interfaces. The retained `packages/pdfium/src/vendor/functions.ts` bytes used for this static confirmation have SHA-256:

```text
a099440e877ad8ab21fccc914f2d9cdc6e029451e1201b64ec58e631d48d8f50
```

This static check did not execute PDFium.

## 8. Raw lifecycle order

For a valid runtime surface, the bounded lifecycle is:

```text
1. initPdfium({ wasmBinary })
2. validate required runtime surface
3. PDFiumExt_Init()
4. malloc(exact source byte length)
5. validate positive safe-integer allocation pointer and HEAPU8 bounds
6. copy exact source snapshot into HEAPU8
7. FPDF_LoadMemDocument(pointer, exact length, "")
8a. if document handle is 0: FPDF_GetLastError()
8b. otherwise require a positive safe-integer document handle and call FPDF_GetPageCount()
9. if a document opened: FPDF_CloseDocument(documentHandle)
10. if a valid allocation was established: free(allocationPointer)
11. if library initialization completed: FPDF_DestroyLibrary()
12. verify caller source and WASM bytes remain unchanged
13. return raw frozen observation only if operation and cleanup are both clean
```

The empty password is intentional for this bounded no-password inspect core. Password prompting/retry remains outside this unit.

## 9. Successful-open observation

A successful open requires:

```text
FPDF_LoadMemDocument => positive safe-integer handle
FPDF_GetPageCount    => nonnegative safe integer
```

Only then may the runtime core prepare:

```text
{
  openSucceeded: true,
  pageCount: <exact returned count>
}
```

The object is newly created and frozen.

The result is not returned until document close, allocation free, library destruction, and caller-byte immutability checks have completed without error.

## 10. Normal open-rejection observation

Exactly numeric document handle `0` is treated as the normal PDFium open-rejection sentinel.

The runtime then calls `FPDF_GetLastError()` and requires a nonnegative safe integer. Only then may it prepare:

```text
{
  openSucceeded: false,
  pdfiumLastError: <exact returned code>
}
```

This core does not interpret the integer into content identity, `NOT_PDF`, structural acceptance/rejection, or admission disposition. That interpretation remains owned by the separately qualified structural-evidence and semantic layers.

## 11. Allocation and handle hardening

The candidate was hardened before commit so an allocator return value is first held as an untrusted local result. It becomes the tracked `allocationPointer` only after it is proven to be a positive safe integer and its end address is proven to fit within `HEAPU8`.

Therefore zero, negative, `NaN`, fractional, overflowed, or out-of-bounds allocation results cannot be opened or later passed to `free()` as though they were valid allocations.

Similarly, `FPDF_LoadMemDocument()` result `0` is the only normal rejection sentinel. Any other non-positive, non-safe-integer, fractional, or otherwise invalid document handle fails closed. An invalid document handle is never passed to page-count or close operations.

## 12. Cleanup and failure semantics

Operation errors do not bypass later valid cleanup opportunities.

Cleanup order is fixed:

```text
close opened document
free valid allocation
destroy initialized library
```

Cleanup calls are attempted independently so a close failure does not suppress a subsequent free or destroy attempt.

If the operation fails and cleanup also fails, the runtime throws an `AggregateError` containing the primary operation failure followed by cleanup failures.

If the operation succeeds but cleanup or caller-byte immutability validation fails, the runtime throws instead of returning the prepared observation.

This unit does not convert runtime failures into canonical semantic provider results. Runtime-terminal supervision and semantic normalization remain separate later boundaries.

## 13. Raw-evidence-only boundary

The runtime core returns only one of the two raw shapes described above.

It does not emit:

```text
admissionDisposition
structuralIdentityResult
provider capability result
runtime-terminal evidence
canonical revision
partial document output
render output
text output
search output
signature or certificate claims
malware or safety claims
```

This separation keeps raw native execution below the already-qualified semantic provider contract.

## 14. Fake-runtime regression coverage

Qualification tests use deterministic JavaScript fake modules only. They do not import or execute real PDFium or WASM.

The suite proves at minimum:

- exact success lifecycle ordering;
- exact page-count preservation;
- normal handle-0 rejection with exact last-error preservation;
- cleanup after thrown open or page-count exceptions;
- independent close/free/destroy cleanup attempts;
- malformed initialized runtime surface rejection before library initialization;
- invalid/empty byte-view rejection before initializer invocation;
- zero/negative/NaN allocation results fail before open and are not freed as valid allocations;
- invalid document handles fail before page-count/close while valid allocation cleanup continues;
- source and WASM bytes remain unchanged on normal execution;
- caller-WASM mutation is detected and prevents result publication;
- repeated operations obtain fresh allocator/document handles from the supplied runtime;
- runtime source contains no real PDFium import or network/CDN loader surface.

## 15. Preserved failure lineage

The first authorized qualification attempt did not read candidate source because the host command was launched from the Remote Desktop Commander package directory instead of the candidate worktree. Node returned `MODULE_NOT_FOUND` for the relative candidate path.

That orchestration failure is preserved by:

```text
github:issue-comment:5672268349
```

It is not qualification evidence.

After the working-directory correction, syntax checks passed and the first combined candidate suite produced `102/103` passing tests. The one failure was a regression assertion that expected a nested WASM-mutation cleanup error to appear as the top-level `AggregateError` message. The implementation had detected the mutation and failed closed correctly. The assertion was repaired forward-only to inspect the nested error collection.

That genuine candidate test failure is preserved by:

```text
github:issue-comment:5672277645
```

Neither failure was erased or represented as a pass.

## 16. Exact-Node validation history

The first clean post-assertion-repair candidate passed `103/103` tests and is recorded by `github:issue-comment:5672311768`.

A further precommit static review then hardened invalid allocation/document-handle behavior as described in Section 11. Because source/test bytes changed, the complete authorized validation sequence was executed again from the start on the final pre-document bytes.

The validation toolchain is the already-qualified official Node executable:

```text
Node version = v24.20.0
Node executable SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
```

The exact authorized commands on the pre-review candidate all passed:

```text
node --check packages/providers/src/pdf/browser/pdf-inspect-runtime.js
  => PASS / RC 0

node --check packages/providers/test/pdf-inspect-runtime.test.js
  => PASS / RC 0

node --test packages/providers/test/content-identity-admission.test.js packages/providers/test/pdfium-structural-evidence.test.js packages/providers/test/pdf-inspect-provider.test.js packages/providers/test/pdf-inspect-runtime.test.js
  => PASS / RC 0
```

Combined test result:

```text
TESTS = 104
PASS = 104
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
TEST_STDOUT_SHA256 = c1a2f8e3a38d43236f3498fd5c89c849507a84129fd71eb2c9a7bc9ebd6b55da
TEST_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

Frozen validation evidence identities:

```text
VALIDATION_SUMMARY_SHA256 = 6e5bbf55d93520d26b0734c80fa4539c69233be94180c4073aa0b8a1a8a1c322
EVIDENCE_MANIFEST_ENTRIES = 12
EVIDENCE_MANIFEST_SHA256 = ee12ebd16eb94e9728b80b26648a32c5252c02771affb6b4111446e563714b7c
```

The final validation is preserved by:

```text
github:issue-comment:5672340654
```

### Independent exact-head review finding and forward-only repair

Fresh CodeRabbit review of exact head `f09498ae1ca8ea54c30afce2836cc8a7f0afe01b` / tree `89085e736deafbc0976955d8504646223183915d` identified one material test defect: the static no-network regression contained literal byte `0x08` before `fetch` instead of the intended JavaScript regex word-boundary escape `\b`. The malformed assertion therefore did not reliably reject a normal `fetch(` source reference.

The finding is preserved by `github:issue-comment:5672388271` and the governance record `github:issue-comment:5672511858`. The repair was limited to the authorized runtime test path: the control byte was replaced by the shared `\bfetch\s*\(` pattern and a direct regression now proves that the same pattern detects both `fetch(...)` and `fetch (...)` syntax. The runtime implementation itself did not change.

The complete authorized exact-Node sequence was then executed fresh on the repaired bytes:

```text
node --check packages/providers/src/pdf/browser/pdf-inspect-runtime.js
  => PASS / RC 0

node --check packages/providers/test/pdf-inspect-runtime.test.js
  => PASS / RC 0

node --test packages/providers/test/content-identity-admission.test.js packages/providers/test/pdfium-structural-evidence.test.js packages/providers/test/pdf-inspect-provider.test.js packages/providers/test/pdf-inspect-runtime.test.js
  => PASS / RC 0

TESTS = 105
PASS = 105
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
TEST_STDOUT_SHA256 = 1581c234f5ef39ad51495f117c0cb2e20168c5d0692e840e6b6fa6cbfd834939
TEST_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
VALIDATION_SUMMARY_SHA256 = 43eb0a4c1fc54a7d85837bfd6f191ffa97561d119d6cc17e3376fc8aa344e3e3
EVIDENCE_MANIFEST_ENTRIES = 14
EVIDENCE_MANIFEST_SHA256 = fb9f6a3e06173ffb0fedab033cdb332acba39e4f29ba01affc546481aef8be84
```

The repaired validation is preserved by `github:issue-comment:5672526986`. No real PDFium/WASM, browser, network, dependency-manager, or dependency-installation execution occurred. The old review is stale for merge qualification because the test bytes changed.

## 17. Final review-repair implementation identities

```text
packages/providers/src/pdf/browser/pdf-inspect-runtime.js
SHA256 = 5edc4120358c636c517c60175299e90d49c3b01eae625a6cc86ae337860bb8db

packages/providers/test/pdf-inspect-runtime.test.js
SHA256 = 517168c351611d16b3fea020364bf88fe46a5108e43fa56406dd1ca4c0621ac6

packages/providers/package.json
SHA256 = 658c5d27d56985fd66c52a3d177f8a078a84c31f2b9bcf438e98ee293f6a9a88
```

The qualification document is synchronized only after these implementation/test/package bytes were validated. It does not alter those bytes.

## 18. Explicit non-grants and non-claims

```text
REAL_PDFIUM_IMPORT = NOT_AUTHORIZED / NOT_PERFORMED
REAL_PDFIUM_INITIALIZATION = NOT_AUTHORIZED / NOT_PERFORMED
PDFIUM_WASM_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
SECOND_STRUCTURAL_RUNTIME_ATTEMPT = NOT_AUTHORIZED / NOT_PERFORMED
BROWSER_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
NETWORK_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
DEPENDENCY_INSTALLATION_OR_MUTATION = NOT_AUTHORIZED / NOT_PERFORMED
ROOT_PACKAGE_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED / NOT_PERFORMED
FIXTURE_MUTATION = NOT_AUTHORIZED / NOT_PERFORMED
RUNTIME_TERMINAL_SUPERVISOR_IMPLEMENTATION = NOT_AUTHORIZED / NOT_PERFORMED
PDF_PAGE_RENDER_V1 = NOT_AUTHORIZED
PDF_THUMBNAIL_RENDER_V1 = NOT_AUTHORIZED
PDF_TEXT_EXTRACT_V1 = NOT_AUTHORIZED
PDF_TEXT_SELECT_V1 = NOT_AUTHORIZED
PDF_TEXT_SEARCH_V1 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

Fake-runtime qualification proves the source lifecycle contract under the fake surfaces exercised by the tests. It does not prove real browser/PDFium execution, browser cancellation behavior, deadline enforcement, resource isolation, no-network runtime behavior, renderer behavior, font fallback behavior, or corpus-wide robustness.

## 19. Canonicalization gate

This artifact is a candidate qualification only until all required merge gates are satisfied.

Required remaining gates:

1. exact four-path candidate surface;
2. clean worktree after commit;
3. fresh independent substantive review bound to the exact candidate head/tree;
4. zero unresolved material review threads;
5. immediate live premerge race proof;
6. guarded normal merge using the exact reviewed head SHA;
7. mechanical post-merge verification of parents/tree/path surface/signature/workflows;
8. canonical Issue #7 closeout;
9. fresh Issue #7 successor reconciliation before any real PDFium/WASM/browser execution or any other capability implementation.

No successor authority is inferred by this artifact.
