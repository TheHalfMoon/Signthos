# PDF_METADATA_READ_V1 Exact PDFium Package Runtime Binding Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / REAL_PACKAGE_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5713244528`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This bounded unit implements the canonical `PDF_METADATA_READ_V1` exact
PDFium package runtime binding `readPdfMetadataWithExactPdfiumPackage`,
mirroring the canonical search binding discipline with the document-level
metadata grammar. It validates the exact two-key options envelope and
delegates to the canonical metadata raw runtime with the adopted exact
package initializer — no asset or network resolution.

```text
UNIT = PDF_METADATA_READ_V1_EXACT_PDFIUM_PACKAGE_RUNTIME_BINDING_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 2a0c4c4e444bb2603eb08da5c845fbc26e571b5e
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-metadata-runtime-binding.js
packages/providers/test/pdf-metadata-runtime-binding.test.js
specs/004-local-pdf-core/pdf-metadata-read-v1-exact-pdfium-package-runtime-binding-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new binding test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

`readPdfMetadataWithExactPdfiumPackage({ bytes, wasmBinary })` mirrors
`searchPdfPageTextWithExactPdfiumPackage` without page/query/budget params:

- exact two-key options validation (`bytes`, `wasmBinary`), else `TypeError`
  before any runtime effect;
- delegation to the canonical `readPdfMetadataWithLocalWasm` with the adopted
  exact package initializer (`init` from `@embedpdf/pdfium@2.15.0`);
- caller byte-view validation, caller-immutability, frozen result envelopes,
  and structured rejection semantics are inherited unchanged from the
  canonical runtime.

No metadata provider, supervisor, bridge, orchestrator, facade, or cross-track
runtime is modified or invoked by this unit.

## 3. Local-only boundary

The source imports only the exact package initializer and the metadata raw
runtime, and contains no reference to any of: asset URLs, `fetch`, workers,
`node:fs`/`node:path`, CDN hosts, provider/supervisor/bridge/orchestrator
modules, composer/supervisor/bridge/orchestrator calls, or cross-track
runtimes (enforced by the source-surface tests).

## 4. Exact package and toolchain identities

```text
NODE_VERSION = v22.22.3
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
PDFIUM_WASM_BYTES = 4633788
```

Node-version note: canonical governance states no Node version requirement;
qualification records the actually executed runtime; identical test counts are
not claimed as environment equivalence. The adopted package is exposed through
an external `NODE_PATH`; no dependency acquisition, package-manager action,
lockfile mutation, or network fetch occurred; no `node_modules`
materialization is part of the candidate diff.

## 5. Bounded real-package execution

Real WASM execution is authorized and observed in this unit (ordinary-minimal
fixture delegation, mismatched-WASM fail-closed path, corrupt-bytes rejection
path):

```text
WASM_INSTANTIATION_OBSERVED = YES (delegation success + fail-closed paths)
NETWORK_ATTEMPTS_OBSERVED = NONE
FIXTURE_METADATA = all 8 tags absent on ordinary-minimal (deterministic, matches runtime qualification)
```

No other valid-document execution occurs in this unit.

## 6. Focused binding qualification

```text
FOCUSED_TESTS = 10
FOCUSED_PASS = 10
FOCUSED_FAIL = 0
```

Coverage mirrors the search binding suite with the two-key metadata grammar:
export surface; initializer-without-resolution source surface; no
provider/supervisor/bridge/orchestrator/cross-track surface; exact adopted
package and WASM identities (name, version, zero dependencies, byte length,
SHA-256); malformed-envelope matrix; accessor/extra/missing/symbol-key matrix;
byte-view validation without runtime invocation; real delegation success with
frozen all-absent metadata and caller-immutability; mismatched-WASM
fail-closed; corrupt-bytes structured rejection.

## 7. Complete applicable provider qualification

```text
TOTAL_TESTS = 944
PASS = 944
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
METADATA_BINDING_SOURCE_SHA256 = 7a7994108331ef0e585ae8f27020cfb1f91123d92e7eaaa0b5a32d2e2d0638bd
METADATA_BINDING_TEST_SHA256 = f0f2a85b5089b7d943cb1da0d2e77895b099ff659a5d2361c6a97b8a5dec4eea
PROVIDERS_PACKAGE_JSON_SHA256 = 7fe2b6f355ff290aec7a54869d121b8c4649121f8b9c658c9471e8fc02e645b4
```

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded metadata binding validates the exact
two-key envelope and executes the canonical metadata runtime against the
adopted exact PDFium package under local-only, fail-closed validation.

It does not prove metadata facade, metadata write behavior, XMP behavior,
page-box behavior, worker integration, or native/server parity.

## 10. Explicit non-grants

```text
METADATA_FACADE = NOT_AUTHORIZED
METADATA_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_SUPERVISOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_BRIDGE_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_ORCHESTRATOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 11. Merge and successor gates

This candidate is not canonical until all of the following hold on the exact final
head:

1. the final diff contains only the four authorized paths;
2. exact Node qualification is rerun after the qualification document is complete;
3. source/test/package/document hashes are recorded for the final bytes;
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
12. a fresh successor reconciliation determines the next minimum
    dependency-ordered unit.

No successor authority is inherited from this document.
