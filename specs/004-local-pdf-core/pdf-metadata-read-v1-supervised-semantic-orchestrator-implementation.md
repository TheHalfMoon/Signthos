# PDF_METADATA_READ_V1 Supervised Semantic Orchestrator Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / FAKE_CONTROL_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5713221745`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This bounded unit implements the canonical `PDF_METADATA_READ_V1` supervised
semantic orchestrator `orchestratePdfMetadataRead`, mirroring the canonical
search orchestrator discipline over the metadata supervisor and bridge. It
checks cross-layer request/binding identity, supervises one injected runtime,
rechecks identity after supervision, and composes the supervised result into a
canonical semantic result.

It does not execute PDFium, WASM, a browser, a worker, a real timer, a resource
meter, or any document-processing network path. Qualification uses deterministic
injected runtimes and canonical fixture bytes only.

```text
UNIT = PDF_METADATA_READ_V1_SUPERVISED_SEMANTIC_ORCHESTRATOR_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 7b3e5de9b800ccfead8917854c82934c316bcff1
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-metadata-orchestrator.js
packages/providers/test/pdf-metadata-orchestrator.test.js
specs/004-local-pdf-core/pdf-metadata-read-v1-supervised-semantic-orchestrator-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new orchestrator test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

`orchestratePdfMetadataRead(options)` mirrors `orchestratePdfTextSearch`:

- exact seven-key options validation (`bytes`, `request`, `availability`,
  `runtimeBinding`, `runRuntime`, `terminalControl`, `terminateRuntime`);
- `Buffer` bytes at the orchestrator boundary before any subscription or
  runtime effect;
- cross-layer identity check (provider id, capability version, byte length,
  budget ref, exact digest) over safe own-data request/binding objects BEFORE
  supervision and AGAIN after supervision before composition — mid-flight
  request mutation fails closed with no semantic result;
- supervision through the canonical metadata supervisor, composition through
  the canonical metadata bridge; runtime/termination/disposer rejections
  propagate unchanged without substitution or retry.

No metadata runtime, provider, supervisor, bridge, binding, or facade is
modified or invoked directly by this unit beyond the two canonical calls.

## 3. Local-only boundary

The source imports only the metadata supervisor and the metadata bridge, and
contains no reference to any of: raw metadata runtime imports or reads,
direct composer invocation, other-capability orchestrators, `@embedpdf/pdfium`,
`PDFiumExt_Init`/`FPDF_`, `WebAssembly`, asset URLs, `fetch`, workers,
`child_process`, timers, or URLs (enforced by the source-surface test).

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

## 6. Focused orchestrator qualification

```text
FOCUSED_TESTS = 22
FOCUSED_PASS = 22
FOCUSED_FAIL = 0
```

Coverage mirrors the search orchestrator suite with metadata options:
supervised-once success with exact observations; format-rejection mapping; all
three synchronous terminals with execution suppression; runtime/termination/
disposer propagation without substitution; provider-owned request defects after
supervision; pre-supervision binding mismatch; Buffer boundary; options hostile
matrix (proxy/accessor/symbol/extra-key/custom-prototype) with zero
trap/getter/runtime effects; null-prototype acceptance; caller non-mutation;
source boundary; per-field cross-layer mismatch matrix; unsafe request/binding/
digest containers; mid-runtime and mid-termination identity-mutation rejection.

## 7. Complete applicable provider qualification

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 934
PASS = 934
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
METADATA_ORCHESTRATOR_SOURCE_SHA256 = cedec26f545f96a6de8aa3cbfb40d93adf820c3fe82753eed22c123fb701f3ca
METADATA_ORCHESTRATOR_TEST_SHA256 = 9ec239c93ea61e38d635ac49f09783298188007cddff3d110ce0397b34e4eaab
PROVIDERS_PACKAGE_JSON_SHA256 = 9dcf1b71802e78732fa554862bc21a9c644885e8c79d29456d0371019da526e7
```

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded metadata orchestrator binds one
semantic request to one supervised runtime execution and composes the result
under exact options, double-checked cross-layer identity, and fail-closed
attack-surface validation.

It does not prove metadata binding, facade, real runtime execution, metadata
write behavior, worker integration, or native/server parity.

## 10. Explicit non-grants

```text
METADATA_BINDING = NOT_AUTHORIZED
METADATA_FACADE = NOT_AUTHORIZED
METADATA_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_SUPERVISOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_BRIDGE_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
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
