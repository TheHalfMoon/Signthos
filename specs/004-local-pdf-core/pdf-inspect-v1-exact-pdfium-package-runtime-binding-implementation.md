# PDF_INSPECT_V1 Exact PDFium Package Runtime Binding Implementation

Status: `IMPLEMENTATION_CANDIDATE / EXACT_PACKAGE_BINDING_QUALIFIED`
Issue: #7
Authority: `github:issue-comment:5673698762`
Preserved non-qualifying setup attempt: `github:issue-comment:5673790992`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit closes only the package-to-raw-runtime seam left after canonical real-PDFium execution qualification. It binds the already-adopted exact `@embedpdf/pdfium@2.15.0` CommonJS `init` export to the canonical `inspectPdfWithLocalWasm()` runtime while keeping PDF bytes and WASM bytes caller/application supplied.

```text
UNIT = PDF_INSPECT_V1_EXACT_PDFIUM_PACKAGE_RUNTIME_BINDING_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = cc0fde01edc44d209ae8ce238b2673680b36ce41
CANONICAL_BASE_TREE = d26355bc6f35da4098237c8bcf00d8a3f722281e
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-inspect-runtime-binding.js
packages/providers/test/pdf-inspect-runtime-binding.test.js
specs/004-local-pdf-core/pdf-inspect-v1-exact-pdfium-package-runtime-binding-implementation.md
```

## 2. Implementation contract

The binding exports only `inspectPdfWithExactPdfiumPackage({ bytes, wasmBinary })`.

Its implementation:

- imports `init` from `@embedpdf/pdfium`;
- imports the canonical `inspectPdfWithLocalWasm()` runtime;
- forwards caller/application-supplied `bytes` and `wasmBinary` unchanged as call arguments;
- injects the exact package `init` function into the canonical raw runtime;
- delegates byte validation, private runtime WASM isolation, PDFium surface validation, allocation, document lifetime, cleanup, and mutation detection to the canonical runtime.

The binding does not resolve an asset path, read a WASM file, accept a URL, create a URL, invoke a worker, configure font fallback, or implement any PDF semantic mapping.

## 3. Local-only boundary

The source contains no reference to any of:

```text
DEFAULT_PDFIUM_WASM_URL
fetch(...)
XMLHttpRequest
http://
https://
node:fs
node:path
pdfium.wasm asset resolution
```

The upstream package's exported CDN convenience URL is therefore not part of this Signthos binding path.

## 4. Exact package and toolchain identities

Qualification used a fresh external extraction of the exact already-adopted package and did not use an online package-manager fallback.

```text
NODE_VERSION = v24.20.0
NODE_DARWIN_ARM64_ARCHIVE_SHA256 = 40e5607e5ecb3db9192723776da2d75d966260fc74a7a9e731c1bd67dda96bc8
NODE_DARWIN_ARM64_EXECUTABLE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_TARBALL_SHA256 = fe0cb4677782a58b67f555df9a1257742bcfbf390b9a3e08bd8ad976eea436bb
PDFIUM_INDEX_CJS_SHA256 = 937f65dbde0ebc92f3c1d3d32c909bc1a30146e824d69d6fde4de3a168912602
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
PDFIUM_WASM_BYTES = 4633788
EXTRACTED_PDFIUM_DEPENDENCIES = 0
```

The exact package was exposed to the qualification process through an external `NODE_PATH`. No `node_modules` materialization is part of the candidate repository diff.

## 5. Preserved setup failure

A prior isolated `pnpm --offline` workspace materialization attempt failed because the local pnpm store did not contain `@embedpdf/fonts-hebrew@1.0.0`.

That attempt is preserved separately at `github:issue-comment:5673790992`. It downloaded zero packages and changed zero tracked or staged repository bytes. Its generated untracked `node_modules/.pnpm/**` links were never used as qualification evidence.

## 6. Real package execution evidence

The focused binding suite used the canonical ordinary-minimal fixture and the exact local PDFium WASM bytes.

```text
FIXTURE = admission-seed-ordinary-minimal-v1
FIXTURE_BYTES = 583
FIXTURE_SHA256 = d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207
RAW_RESULT = { openSucceeded: true, pageCount: 1 }
CALLER_SOURCE_BYTES_UNCHANGED = YES
CALLER_WASM_BYTES_UNCHANGED = YES
FOCUSED_TESTS = 5
FOCUSED_PASS = 5
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = bf5e27a623e1c9f9726ed5f5205ab71ae7d6691da9262cea5c4722ada881a9c0
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The focused tests also prove that invalid source/WASM inputs continue to fail through the canonical raw-runtime validation rather than through a competing binding schema.

## 7. Network-denied execution evidence

The same exact focused suite was rerun with an external deny preload intercepting Node HTTP, HTTPS, TCP, TLS, and global `fetch` entry points.

```text
NETWORK_TESTS = 5
NETWORK_PASS = 5
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = c4b149dd08aed1870dedf015ad4cc9ccbf90dfb94fc96945fa4739b7ba507ccb
NETWORK_STDOUT_SHA256 = ed006564cc806be672e1730ddb1f092b96caf3a37d54b1ca22fb224e77dba0df
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 8. Complete applicable provider qualification

The complete canonical provider predecessor chain plus the new binding test passed under the exact Node executable.

```text
TOTAL_TESTS = 179
PASS = 179
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = 76f32e2694621d89f71b13b662a50e0110179ee53169ff2ba2c67738ed0d81bb
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

Applicable predecessor tests cover content identity/admission, PDFium structural evidence, the semantic provider, local-WASM runtime core, terminal supervisor, supervised-result semantic bridge, and supervised semantic orchestrator.

## 9. Candidate file identities

Before this qualification document was added, the three implementation/test surfaces had these exact identities:

```text
RUNTIME_BINDING_SHA256 = 213c690eee100984b2c8c88d41054bc7810c5cc9a798bd7b423d1799bed2d137
RUNTIME_BINDING_TEST_SHA256 = 0bda4a40daf66ebfff5460419f141a781061ea566acf025332b7fe396cb0f0a8
PROVIDERS_PACKAGE_JSON_SHA256 = c2f1b0be7e35d8fd79934d79bcce910d30ced43688d26cbf5e1291e26ce0b458
CANONICAL_RAW_RUNTIME_SHA256 = 4f98df59f85c9e493513afda7ef5e254e578af64c5b368f7a55eebf6f9c4b462
```

The package-manifest change only appends `test/pdf-inspect-runtime-binding.test.js` to the existing provider test command. It changes no dependency declaration.

## 10. Exact qualification claim

This candidate proves only that the exact adopted `@embedpdf/pdfium@2.15.0` package initializer can be bound directly to the canonical Signthos `PDF_INSPECT_V1` raw runtime using caller/application-supplied local WASM bytes, and that this path succeeds on the canonical ordinary-minimal fixture under the measured Node/Darwin environment without an observed network attempt.

It does not prove browser-worker asset packaging, same-origin application asset loading, font fallback behavior, render determinism, text extraction/search correctness, corpus-wide compatibility, or native/server parity.

## 11. Explicit non-grants

```text
ASSET_PATH_RESOLVER = NOT_AUTHORIZED / NOT_IMPLEMENTED
APPLICATION_WASM_PACKAGING = NOT_AUTHORIZED / NOT_IMPLEMENTED
DEFAULT_PDFIUM_WASM_URL = NOT_USED
CDN_RUNTIME_FETCH = NOT_AUTHORIZED / NOT_USED
FONT_FALLBACK_CONFIGURATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
BROWSER_WORKER_INTEGRATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
PDF_PAGE_RENDER_V1 = NOT_AUTHORIZED
PDF_THUMBNAIL_RENDER_V1 = NOT_AUTHORIZED
PDF_TEXT_EXTRACT_V1 = NOT_AUTHORIZED
PDF_TEXT_SELECT_V1 = NOT_AUTHORIZED
PDF_TEXT_SEARCH_V1 = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED_BY_THIS_UNIT
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 12. Merge and successor gates

This candidate is not canonical until all of the following hold on the exact final head:

1. the final diff contains only the four authorized paths;
2. exact Node qualification is rerun after the qualification document is complete;
3. source/test/package/document hashes are recorded for the final bytes;
4. `git diff --check` is clean;
5. repository status is byte-identical before and after final qualification;
6. a fresh independent substantive exact-head review reports no material findings;
7. all material review threads are resolved;
8. live `main`, candidate head/tree, changed paths, open-PR set, and applicable status truth are reverified immediately before merge;
9. merge uses normal merge with exact expected head SHA and no history rewriting;
10. post-merge tree, ordered parents, signature, changed surface, PR state, and open-PR state are mechanically verified;
11. Issue #7 receives canonical closeout;
12. a fresh successor reconciliation determines the next minimum dependency-ordered unit.

No successor authority is inherited from this document. In particular, successful package binding does not itself authorize render/text/search, browser-worker asset loading, 004C2, 004D, Specification 005, release, deployment, or project completion.

The final document SHA-256 is recorded in external GitHub qualification evidence after the file is complete; the document does not contain a self-referential digest.
