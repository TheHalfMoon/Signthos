# PDF_TEXT_V1 Exact Package Supervised Semantic Facade Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / EXACT_PACKAGE_FACADE_QUALIFIED / BOUNDED_LOCAL_WASM_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5712462016`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit closes the top-level seam left after the canonical
`PDF_TEXT_V1_EXACT_PDFIUM_PACKAGE_RUNTIME_BINDING_IMPLEMENTATION` closeout.
It exposes the single exact-package supervised text composition entry that
binds one caller-supplied `runRuntime` closure over the exact-package binding
and delegates end-to-end supervised execution to the canonical text
orchestrator, with caller-WASM integrity verified after execution.

```text
UNIT = PDF_TEXT_V1_EXACT_PACKAGE_SUPERVISED_SEMANTIC_FACADE_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 5b665948df43642c867eebd18bb99de65b8a45a2
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-exact-package-facade.js
packages/providers/test/pdf-text-exact-package-facade.test.js
specs/004-local-pdf-core/pdf-text-v1-exact-package-supervised-semantic-facade-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new facade test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

The facade exports only
`extractPdfPageTextWithExactPackageSupervisedSemantics(options)`.

Its implementation:

- validates the exact nine-key own-data envelope before any effect;
- rejects empty/non-view caller WASM bytes at the facade boundary before
  terminal subscription or runtime start;
- snapshots caller WASM bytes, then binds exactly one `runRuntime` closure
  over the same caller `{ bytes, wasmBinary, pageIndex, maxChars }` through
  the canonical exact-package binding;
- delegates supervised execution solely to `orchestratePdfText`;
- after execution, fails closed when caller WASM bytes changed (plain throw,
  or `AggregateError` preserving a concurrent orchestration failure);
- rethrows the primary orchestration failure unchanged when WASM is intact.

The facade performs no PDFium loading, no WASM resolution, no file or network
access, no worker/browser execution, no direct runtime/supervisor/provider
call, and no semantic result construction. Terminal outcomes, malformed-document
semantics, unavailable/invalid-request semantics, caller-bytes immutability,
and no-partial-output publication are preserved by pure delegation.

## 3. Local-only boundary

The source imports only `./pdf-text-orchestrator` and
`./pdf-text-runtime-binding`, calls `orchestratePdfText(` once and
`extractPdfPageTextWithExactPdfiumPackage(` once, and contains no reference to
any of: raw runtime imports/calls, cross-track orchestrators/bindings,
`initPdfium`, `@embedpdf/pdfium`, `PDFiumExt_Init`/`FPDF_`, `WebAssembly`,
`DEFAULT_PDFIUM_WASM_URL`, `fetch`/`XMLHttpRequest`, workers, `child_process`,
timers, URLs, `node:fs`/`node:path`, `readFileSync`, CDN/asset resolution,
fonts, thumbnails, or the render/select/inspect/search tracks.

## 4. Exact package and toolchain identities

Qualification performed no dependency acquisition, no package-manager action,
no lockfile mutation, and no network fetch. The exact adopted package was
resolved through a pre-existing external `NODE_PATH` copy populated once from
the public registry tarball; no `node_modules` materialization is part of the
candidate repository diff.

```text
NODE_VERSION = v22.22.3
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_PACKAGE_DEPENDENCIES = undefined
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
PDFIUM_WASM_BYTES = 4633788
FIXTURE_SHA256 = d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207 (admission-seed-ordinary-minimal-v1)
```

Node-version note: canonical governance (Constitution, `AGENTS.md`, 004 plan)
states no Node version requirement; `24.20.0` in the 004C1Z record is the
future resolver-execution-environment baseline, not a provider-qualification
gate. Qualification therefore records the actually executed runtime
(`v22.22.3`); identical test counts are not claimed as environment
equivalence.

## 5. Bounded local WASM execution

The authorizing reconciliation requires an exact-package supervised composition
entry whose delegation, terminal, malformed-document, and WASM-integrity
properties are observable only through real execution. This unit therefore
exercises bounded local WASM execution with the adopted package and fixture
bytes only:

- successful supervised compositions proving delegation, propagation,
  terminal-suppression counters, byte preservation, and frozen results;
- synchronous terminals proving runtime-suppression with terminal semantics
  and evidence preservation;
- WASM-mutation injections (callback, termination, disposer, combined)
  proving fail-closed integrity errors and exact `AggregateError` behavior;
- malformed/unavailable/invalid-request probes proving unchanged canonical
  semantics through the facade.

```text
WASM_INSTANTIATION_OBSERVED = BOUNDED_LOCAL (adopted package + fixture bytes only)
NETWORK_ATTEMPTS_OBSERVED = NONE
```

## 6. Focused facade qualification

The focused facade suite passed on the exact candidate tree using the
external exact-package resolution described above.

```text
FOCUSED_TESTS = 21
FOCUSED_PASS = 21
FOCUSED_FAIL = 0
```

Coverage:

- module exposes only the bounded facade function and is frozen;
- source composes only orchestrator + binding (exact allowlist, single
  runRuntime closure shape, full orchestration argument shape);
- proxy/accessor/symbol/extra-key/custom-prototype/missing-key envelopes fail
  before terminal subscription with zero trap/getter execution;
- invalid WASM shapes fail at the facade boundary before subscription/start;
- null-prototype options execute to canonical success with real package bytes;
- real execution returns canonical success with counters, digests, frozen
  result, and unchanged caller bytes/WASM;
- all three synchronous terminals win with terminal semantics, evidence, and
  unchanged bytes;
- terminal-first malformed input preserves terminal semantics;
- callback/termination/disposer WASM mutations fail closed (plain vs
  aggregate exactly as specified);
- termination failure without mutation propagates unchanged without retry;
- malformed-document and unavailable/invalid-request semantics unchanged.

## 7. Complete applicable provider qualification

The complete canonical provider suite, including the new facade test file as a
separately expanded argument, passed under the exact Node executable with the
exact adopted package exposed through an external `NODE_PATH`. No
`node_modules` materialization is part of the candidate repository diff.

One full-suite run during qualification showed 4 failures in unrelated
wasm-asset loader tests with `ENOSPC: no space left on device` inside the
tests' own temp-dir helper (host volume at 100% capacity from accumulated
`signthos-*-asset-*` temp leftovers). The failure was environmental, not a
candidate regression: after removing only this session's temp leftovers, the
rerun passed 568/568 with zero code changes. This incident is recorded here
instead of being converted into a pass.

```text
TOTAL_TESTS = 568
PASS = 568
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
TEXT_FACADE_SOURCE_SHA256 = 6f20b2a7197f730e1b0d152264cd4a7a5d9bac942e24207a7a733c45cdfc6525
TEXT_FACADE_TEST_SHA256 = 2afc9a45437d2fbf99eefbaef0825ed23262b4dd4cdb3c1a541079a1d56daac7
PROVIDERS_PACKAGE_JSON_SHA256 = b62cf116ae687d09f22d1fb1c0859108b16d250129addc6c15fc558337713e01
```

The package-manifest change only appends `test/pdf-text-exact-package-facade.test.js`
to the existing provider test command. It changes no dependency declaration.

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded exact-package facade composes
caller-supplied bytes through the canonical text orchestrator and exact-package
binding under exact envelope validation, WASM-identity reverification, and
post-execution caller-WASM integrity enforcement.

It does not prove worker integration, search/select/metadata correctness,
004D, Specification 005, release, deployment, or project completion.

## 10. Explicit non-grants

```text
TEXT_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SUPERVISOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_BRIDGE_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_ORCHESTRATOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_BINDING_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
BROWSER_WORKER_INTEGRATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
PDF_TEXT_SELECT_V1_FACADE = NOT_AUTHORIZED
PDF_TEXT_SEARCH_V1_FACADE = NOT_AUTHORIZED
PDF_METADATA_V1_FACADE = NOT_AUTHORIZED
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
