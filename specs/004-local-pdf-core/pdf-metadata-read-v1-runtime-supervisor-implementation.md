# PDF_METADATA_READ_V1 Runtime Supervisor Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / FAKE_CONTROL_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5713169196`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This bounded unit implements the canonical `PDF_METADATA_READ_V1` runtime
supervisor `supervisePdfMetadataReadRuntime`, mirroring the canonical search
supervisor discipline (including disposal-before-mutation) over the metadata
raw runtime grammar. It drives one injected runtime to deterministic completion
carrying a revalidated metadata observation, or to confirmed termination
carrying shape-validated terminal evidence.

It does not execute PDFium, WASM, a browser, a worker, a real timer, a resource
meter, or any document-processing network path. Qualification uses deterministic
injected runtimes and synthetic bytes only.

```text
UNIT = PDF_METADATA_READ_V1_RUNTIME_SUPERVISOR_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 2e0b8fb8c580c49c6096f503e0994063a3f34870
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-metadata-runtime-supervisor.js
packages/providers/test/pdf-metadata-runtime-supervisor.test.js
specs/004-local-pdf-core/pdf-metadata-read-v1-runtime-supervisor-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new supervisor test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

`supervisePdfMetadataReadRuntime({ bytes, runtimeBinding, runRuntime,
terminalControl, terminateRuntime })` mirrors `supervisePdfTextSearchRuntime`
with the metadata grammar: exact two-key success validation with an exact
eight-field metadata object (every value `string`-or-`null`, copied into a
frozen normalized observation), rejection pinned to `FPDF_ERR_FORMAT` code 3,
metadata-schema terminal evidence from the normalized binding, and the identical
subscribe/race/terminate/dispose lifecycle with disposal-before-mutation
checks. Match-style range adjudication has no metadata analog; the supervisor
validates shape only, and fixed-vocabulary binding remains owned by the
provider composer.

No metadata provider, bridge, orchestrator, binding, facade, or raw runtime is
modified or invoked by this unit.

## 3. Local-only boundary

The source imports only content-identity admission and the metadata provider
constants, calls no runtime/provider/composer, and contains no reference to
any of: `@embedpdf/pdfium`, metadata raw runtime imports, provider composition
calls, asset URLs, CDN hosts, `fetch`, workers, `WebAssembly`, `PDFiumExt_Init`/
`FPDF_`, `child_process`, timers, or URLs (enforced by the source-surface
test).

## 4. Exact package and toolchain identities

```text
NODE_VERSION = v22.22.3
```

Node-version note: canonical governance states no Node version requirement;
qualification records the actually executed runtime; identical test counts are
not claimed as environment equivalence. No dependency acquisition,
package-manager action, lockfile mutation, or network fetch occurred; no
`node_modules` materialization is part of the candidate diff.

## 5. No real runtime execution

```text
WASM_INSTANTIATION_OBSERVED = NONE
NETWORK_ATTEMPTS_OBSERVED = NONE
```

## 6. Focused supervisor qualification

```text
FOCUSED_TESTS = 27
FOCUSED_PASS = 27
FOCUSED_FAIL = 0
```

Coverage mirrors the search supervisor suite with metadata observations: frozen
completion/rejection/all-absent envelopes; all three terminal outcomes with
exact evidence and late-resolution stability; synchronous snapshotting;
first-signal-wins; sync-terminal suppression; late-rejection hygiene;
termination failure/confirmation defects; executor propagation; 16-case
malformed observation matrix (missing fields, hostile value types, mixed
success/rejection shapes); pre-registration binding validation; binding
attack matrix with zero getter/trap execution; null-prototype acceptance;
executor/disposer mutation detection; disposal-failure combination; invalid
terminal events; non-mutation; export surface; source boundary.

## 7. Complete applicable provider qualification

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 892
PASS = 892
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
METADATA_SUPERVISOR_SOURCE_SHA256 = ecb903041160d4c3fed426a11cbb81a5aea149d84b0eb80e626cf31a41deb290
METADATA_SUPERVISOR_TEST_SHA256 = 8d3fa2836aead70ccc4edef01f355c25a639964499c2d4e958d05f45e1417214
PROVIDERS_PACKAGE_JSON_SHA256 = 126f1a06cc0f5a81b6d92bbd77bca84d979182ca51b4fb39f963d4ba3e26e61a
```

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded metadata supervisor drives one injected
runtime to validated completion or confirmed termination under exact binding,
fail-closed lifecycle, disposal-before-mutation, and attack-surface validation.

It does not prove metadata bridging, orchestration, binding, facade, real runtime
execution, metadata write behavior, worker integration, or native/server parity.

## 10. Explicit non-grants

```text
METADATA_BRIDGE = NOT_AUTHORIZED
METADATA_ORCHESTRATOR = NOT_AUTHORIZED
METADATA_BINDING = NOT_AUTHORIZED
METADATA_FACADE = NOT_AUTHORIZED
METADATA_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
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
