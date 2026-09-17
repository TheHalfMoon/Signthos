# PDF_TEXT_SELECT_V1 Runtime Supervisor Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / FAKE_CONTROL_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5712559470`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This bounded unit implements the canonical `PDF_TEXT_SELECT_V1` runtime
supervisor `supervisePdfTextSelectRuntime`, mirroring the canonical
`PDF_TEXT_V1` supervisor discipline (including disposal-before-mutation per the
PR #275 repair) over the select raw runtime grammar. It drives one injected
runtime to deterministic completion carrying a revalidated selection
observation, or to confirmed termination carrying shape-validated terminal
evidence.

It does not execute PDFium, WASM, a browser, a worker, a real timer, a resource
meter, or any document-processing network path. Qualification uses deterministic
injected runtimes and synthetic bytes only.

```text
UNIT = PDF_TEXT_SELECT_V1_RUNTIME_SUPERVISOR_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 22be8c272a3e99828e6fb8b0c99954a3449e39a2
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-select-runtime-supervisor.js
packages/providers/test/pdf-text-select-runtime-supervisor.test.js
specs/004-local-pdf-core/pdf-text-select-v1-runtime-supervisor-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new supervisor test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

`supervisePdfTextSelectRuntime({ bytes, runtimeBinding, runRuntime,
terminalControl, terminateRuntime })` mirrors `supervisePdfTextRuntime`:

- non-empty `Uint8Array` bytes with snapshot/mutation detection;
- select capability runtime-binding validation against exact byte identity;
- single terminal subscription with synchronously snapshotted signals;
- completion/termination race with fail-closed invalid-signal handling;
- exactly-once confirmed termination with validated confirmation;
- raw selection observation revalidation (exact eleven select keys, safe
  integer fields, strict boolean flags, string text, valid rect array;
  rejection pinned to `FPDF_ERR_FORMAT` code 3) with frozen normalized output;
- disposal before post-supervision mutation checks (source bytes, binding,
  control), with `AggregateError` combination;
- terminal evidence built from the normalized binding with the select schema
  `signthos.pdf.text.select.runtime-terminal.v1`.

No select provider, bridge, orchestrator, binding, facade, or raw runtime is
modified or invoked by this unit.

## 3. Local-only boundary

The source imports only content-identity admission and the select provider
constants, calls no runtime/provider/composer, and contains no reference to
any of: `@embedpdf/pdfium`, select raw runtime imports, provider composition
calls, asset URLs, CDN hosts, `fetch`, workers, `WebAssembly`, `PDFiumExt_Init`/
`FPDF_`, `child_process`, timers, or URLs (enforced by the source-surface
test).

## 4. Exact package and toolchain identities

```text
NODE_VERSION = v22.22.3
```

Node-version note: canonical governance states no Node version requirement;
`24.20.0` in the 004C1Z record is the future resolver-execution-environment
baseline, not a provider-qualification gate. Qualification records the actually
executed runtime; identical test counts are not claimed as environment
equivalence. No dependency acquisition, package-manager action, lockfile
mutation, or network fetch occurred; no `node_modules` materialization is part
of the candidate diff.

## 5. No real runtime execution

`REAL_RUNTIME_EXECUTION` is not part of this unit: no test path instantiates
PDFium WASM or invokes any real runtime. All runtimes are injected fakes; all
behavior is deterministic supervision.

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

Coverage mirrors the text supervisor suite with select observations: frozen
completion/rejection/empty-selection envelopes; all three terminal outcomes
with exact evidence and late-resolution stability; synchronous snapshotting;
first-signal-wins; sync-terminal executor suppression; late-rejection hygiene;
termination failure/confirmation defects; executor failure propagation;
malformed observation matrix (including select int/flag/text/rect defects);
binding validation before registration; binding attack matrix with zero
getter/trap execution; null-prototype acceptance; executor/disposer mutation
detection after cleanup; disposal failure combination; invalid terminal events;
non-mutation; export surface; source boundary.

## 7. Complete applicable provider qualification

The complete canonical provider suite, including the new supervisor test file
as a separately expanded argument, passed under the exact Node executable with
the exact adopted package exposed through an external `NODE_PATH`. No
`node_modules` materialization is part of the candidate repository diff.

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 628
PASS = 628
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
SELECT_SUPERVISOR_SOURCE_SHA256 = b1e3c1d141df7c26474f7916ee027ff66443758bff40b8d32b63a53d4e7aba35
SELECT_SUPERVISOR_TEST_SHA256 = 206f793fde74813541ec8bc9a4c3915297ffa1b87442e81fb4b99f728d7a4533
PROVIDERS_PACKAGE_JSON_SHA256 = e560ec2fdf9e371fc79c2237459ac8ddae6089e64ce9921a87846c65301e3bc9
```

The package-manifest change only appends
`test/pdf-text-select-runtime-supervisor.test.js` to the existing provider test
command. It changes no dependency declaration.

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded select supervisor drives one injected
runtime to validated completion or confirmed termination under exact binding,
fail-closed lifecycle, disposal-before-mutation, and attack-surface validation.

It does not prove select bridging, orchestration, binding, facade, real runtime
execution, search/metadata correctness, worker integration, or native/server
parity.

## 10. Explicit non-grants

```text
TEXT_SELECT_BRIDGE = NOT_AUTHORIZED
TEXT_SELECT_ORCHESTRATOR = NOT_AUTHORIZED
TEXT_SELECT_BINDING = NOT_AUTHORIZED
TEXT_SELECT_FACADE = NOT_AUTHORIZED
TEXT_SELECT_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SELECT_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
SEARCH_SUPERVISOR = NOT_AUTHORIZED
METADATA_SUPERVISOR = NOT_AUTHORIZED
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
