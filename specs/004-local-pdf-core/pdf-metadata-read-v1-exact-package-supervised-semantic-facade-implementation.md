# PDF_METADATA_READ_V1 Exact-Package Supervised Semantic Facade Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / REAL_PACKAGE_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5713267112`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This bounded unit implements the canonical `PDF_METADATA_READ_V1`
exact-package supervised semantic facade
`readPdfMetadataWithExactPackageSupervisedSemantics`, mirroring the canonical
search facade discipline with the document-level metadata grammar. It binds
one caller-supplied WASM binary to exactly one supervised runtime closure,
orchestrates through the canonical metadata orchestrator, and enforces
caller-WASM integrity after execution.

```text
UNIT = PDF_METADATA_READ_V1_EXACT_PACKAGE_SUPERVISED_SEMANTIC_FACADE_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = cc6f48905856e70d5dade5ed3bb801e5c7a3ea77
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-metadata-exact-package-facade.js
packages/providers/test/pdf-metadata-exact-package-facade.test.js
specs/004-local-pdf-core/pdf-metadata-read-v1-exact-package-supervised-semantic-facade-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new facade test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

`readPdfMetadataWithExactPackageSupervisedSemantics(options)` mirrors
`searchPdfPageTextWithExactPackageSupervisedSemantics` without page/query/
budget params:

- exact seven facade keys (`bytes`, `request`, `availability`,
  `runtimeBinding`, `wasmBinary`, `terminalControl`, `terminateRuntime`);
- `wasmBinary` must be a non-empty `Uint8Array` view at the facade boundary,
  snapshotted before execution;
- exactly one `runRuntime` closure over the same caller inputs delegating to
  the canonical metadata exact-package binding;
- orchestration through the canonical metadata orchestrator only;
- caller-WASM integrity post-check: mutation fails closed, aggregated with
  (never replacing) the primary failure.

No metadata runtime, provider, supervisor, bridge, orchestrator, binding,
cross-track runtime, or facade is modified by this unit beyond the single
canonical orchestration call.

## 3. Local-only boundary

The source imports only the metadata orchestrator and the metadata
exact-package binding, and contains no reference to any of: raw metadata
reads, direct composer/supervisor calls, other-capability orchestrators,
`initPdfium`, `@embedpdf/pdfium`, `PDFiumExt_Init`/`FPDF_`, `WebAssembly`,
asset URLs, `fetch`, workers, `child_process`, timers, URLs, CDN/asset/
resolution tokens, fonts, thumbnails, rendering, extraction, inspection, or
selection (enforced by the source-surface tests).

## 4. Exact package and toolchain identities

```text
NODE_VERSION = v22.22.3
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
FIXTURE_SHA256 = d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207
```

Node-version note: canonical governance states no Node version requirement;
qualification records the actually executed runtime; identical test counts are
not claimed as environment equivalence. The adopted package is exposed through
an external `NODE_PATH`; no dependency acquisition, package-manager action,
lockfile mutation, or network fetch occurred; no `node_modules`
materialization is part of the candidate diff.

## 5. Bounded real-package execution

Real WASM execution is authorized and observed in this unit (null-prototype
options, ordinary-minimal success, all three synchronous terminals,
terminal-first malformed input, WASM-mutation matrices, malformed/unavailable/
invalid-request preservation):

```text
WASM_INSTANTIATION_OBSERVED = YES (success + terminal + fail-closed paths)
NETWORK_ATTEMPTS_OBSERVED = NONE
FIXTURE_METADATA = all 8 tags absent on ordinary-minimal (deterministic)
```

No other valid-document execution occurs in this unit.

## 6. Focused facade qualification

```text
FOCUSED_TESTS = 21
FOCUSED_PASS = 21
FOCUSED_FAIL = 0
```

Coverage mirrors the search facade suite with the seven-key metadata grammar:
export surface; orchestrator+binding-only composition; single-closure shape;
options hostile matrix with zero trap/getter/subscription effects; missing
wasmBinary; wasmBinary shape matrix; wasmBinary accessor; null-prototype real
execution; ordinary-minimal real success with caller-immutability; all three
synchronous terminals with real WASM; terminal-first malformed input;
callback/termination/disposer WASM-mutation matrices; combined
termination+mutation aggregation; termination-only propagation; malformed/
unavailable/invalid-request preservation.

## 7. Complete applicable provider qualification

```text
TOTAL_TESTS = 965
PASS = 965
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
METADATA_FACADE_SOURCE_SHA256 = 6dea2a030206ad7fd3fdac933984d3f2705120cd9d6f2a92b4dbe0a1013c10f9
METADATA_FACADE_TEST_SHA256 = 64e59f891a023db647d155d2787b5e742a291ffec92c32ecc425f6ba80e73e09
PROVIDERS_PACKAGE_JSON_SHA256 = 707de0bf2b67c5d979f50b40f477d9ab48d7c594a06fca294b05c5254d31a23d
```

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded metadata facade binds one
caller-supplied WASM binary to one supervised exact-package execution with
WASM-integrity enforcement under exact options and fail-closed attack-surface
validation.

It does not prove metadata write behavior, XMP behavior, page-box behavior,
worker integration, or native/server parity.

## 10. Explicit non-grants

```text
METADATA_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_SUPERVISOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_BRIDGE_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_ORCHESTRATOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_BINDING_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
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
