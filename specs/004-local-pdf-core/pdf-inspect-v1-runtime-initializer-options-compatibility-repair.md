# PDF_INSPECT_V1 Runtime Initializer-Options Compatibility Repair

Status: `IMPLEMENTATION_CANDIDATE / FORWARD_REPAIR / REAL_RUNTIME_RETRY_BLOCKED`

Issue: #7
Authority: `github:issue-comment:5673180360`
Preserved real-runtime failure: `github:issue-comment:5673176139`

## 1. Purpose

This bounded repair closes the repository-owned compatibility defect discovered by the first exact local real-PDFium execution qualification attempt.

The canonical runtime core previously invoked the injected initializer with a frozen object:

```text
initPdfium(Object.freeze({ wasmBinary }))
```

Exact `@embedpdf/pdfium@2.15.0` uses its passed module-options object as the Emscripten `Module` object and later writes the captured overrides back into that object. The frozen object therefore failed before PDF document execution.
## 2. Exact authority and base

```text
UNIT = PDF_INSPECT_V1_RUNTIME_INITIALIZER_OPTIONS_COMPATIBILITY_REPAIR
AUTHORITY = github:issue-comment:5673180360
CANONICAL_BASE = 4451850dfe19eb4c32b5560fb86b9c0649e83651
CANONICAL_BASE_TREE = d27fa26d75ee02a7e1d21186ce00da772ea75310
MAX_CHANGED_REPOSITORY_FILES = 3
```

Exact authorized paths:

```text
packages/providers/src/pdf/browser/pdf-inspect-runtime.js
packages/providers/test/pdf-inspect-runtime.test.js
specs/004-local-pdf-core/pdf-inspect-v1-runtime-initializer-options-compatibility-repair.md
```

No package, lockfile, workspace, dependency, fixture, provenance, workflow, database, or unrelated provider path is authorized.

## 3. Preserved failed real-runtime attempt

Before any repair, the exact package materialization gates passed: exact npm identity, exact registry SHA-1, exact canonical tarball SHA-256, dependency-free extracted package identity, and exact published WASM SHA-256.
The failed attempt established:

```text
NODE_VERSION = v24.20.0
NODE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
PACKAGE = @embedpdf/pdfium@2.15.0
REGISTRY_SHA1 = b073cf9cee2252507c4fc81fb47a156cb2a19662
TARBALL_SHA256 = fe0cb4677782a58b67f555df9a1257742bcfbf390b9a3e08bd8ad976eea436bb
WASM_BYTES = 4633788
WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
NETWORK_ATTEMPTS = 0
```

It then failed with:

```text
TypeError: Cannot assign to read only property 'wasmBinary' of object '#<Object>'
```

That attempt is `FAIL_PRESERVED`. It produced no PDF result and is not reused as qualification evidence for this repair.

## 4. Repair boundary

The runtime core now creates two independent WASM copies before initialization:

- `wasmSnapshot`: immutable expected bytes used only for later equality checks;
- `runtimeWasmBinary`: a private runtime-owned byte view supplied to the initializer.
The initializer receives a fresh mutable object owned only by the runtime core:

```text
initPdfium({ wasmBinary: runtimeWasmBinary })
```

The caller-owned `wasmBinary` object is no longer passed to the initializer. This preserves caller isolation while satisfying the exact Emscripten-style initializer contract that may extend or rewrite its module-options object.

After operation and cleanup, the runtime separately verifies:

```text
caller wasmBinary == wasmSnapshot
runtimeWasmBinary == wasmSnapshot
```

A mutation of either byte view is terminal. No raw success result is published when either equality check fails.

## 5. Preserved behavior

The repair does not change the canonical PDF lifecycle or semantic ownership. It preserves:

- exact source-byte private snapshotting;
- required runtime-surface validation before library initialization;
- `PDFiumExt_Init`, allocation, exact-byte copy, open, page-count/error observation, close, free, and destroy ordering;
- fail-closed allocation and document-handle validation;
- independent cleanup attempts and `AggregateError` behavior;
- raw observation only, with no semantic-provider result creation;
- zero package import, URL construction, CDN selection, fetch, browser, worker, or dependency-manager behavior in runtime source.
## 6. Regression coverage

The updated runtime suite proves both the old invariants and the new compatibility boundary.

New or strengthened assertions prove:

- initializer options are not frozen;
- initializer options initially contain only `wasmBinary`;
- initializer `wasmBinary` is not the caller-owned object;
- private runtime WASM bytes initially equal the exact caller bytes;
- an Emscripten-like initializer may extend and assign its fresh options object;
- caller-owned WASM remains unchanged when only the options object is mutated;
- direct caller-WASM mutation is still detected after cleanup;
- private runtime-WASM mutation is independently detected even while caller WASM remains unchanged.

Focused runtime suite on the final source/test bytes:

```text
TESTS = 15
PASS = 15
FAIL = 0
```

## 7. Final exact-Node qualification

The complete applicable provider chain was re-executed after the repair using the already-qualified exact Node executable.
```text
NODE_VERSION = v24.20.0
NODE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
CHECK_SOURCE_RC = 0
CHECK_TEST_RC = 0
COMBINED_TEST_RC = 0
TESTS = 172
PASS = 172
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

Frozen implementation/test identities:

```text
RUNTIME_SOURCE_SHA256 = f2ad165c3307b06b46866d5f6ced6e4c015f20241e8f5074274964c33aab8a3b
RUNTIME_TEST_SHA256 = 53001fa03a4c687778612e9fd5ac1f26e48d0ab192de92d4085992cb8a4c0206
TEST_STDOUT_SHA256 = 003a877c7ae09377e892ca2787a2a511c2198cbeeb46046d5d72020230208dc3
TEST_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
VALIDATION_SUMMARY_SHA256 = bf216fb59aea2b0d91670d1684e5feea73ddbbab0af0acd69bc71c108e2af460
EVIDENCE_MANIFEST_ENTRIES = 14
EVIDENCE_MANIFEST_SHA256 = 3ecaebfaf080cce845f648929664f302c96609e8bba68b6c702f1062fda0569f
```
The validation summary and manifest were frozen from the source/test bytes before this qualification document was added. This document does not alter the validated implementation or test bytes.

## 8. Explicit non-grants

```text
REAL_PDFIUM_WASM_RETRY = NOT_AUTHORIZED / NOT_PERFORMED
REAL_PDFIUM_INITIALIZATION_AFTER_REPAIR = NOT_AUTHORIZED / NOT_PERFORMED
PACKAGE_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED / NOT_PERFORMED
DEPENDENCY_INSTALLATION_OR_ADOPTION = NOT_AUTHORIZED / NOT_PERFORMED
PRODUCTION_LOADER_OR_ASSET_RESOLVER = NOT_AUTHORIZED / NOT_PERFORMED
BROWSER_OR_WORKER_QUALIFICATION = NOT_AUTHORIZED / NOT_PERFORMED
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

The failed real-runtime attempt remains preserved as evidence that motivated this repair. It is not converted into a successful runtime qualification.

## 9. Canonicalization gate

This repair remains a candidate until exact-head independent substantive review, zero unresolved material review threads, immediate live race proof, guarded normal merge using the exact reviewed head, post-merge parent/tree/path/signature verification, and Issue #7 closeout are complete.

Only after canonical closeout may Issue #7 freshly decide whether the exact local real-PDFium execution qualification may be retried. No retry authority is inferred from test success or task ordering.
