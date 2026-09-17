# PDF_TEXT_V1 Exact PDFium Package Runtime Binding Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / EXACT_PACKAGE_BINDING_QUALIFIED / BOUNDED_LOCAL_WASM_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5712333520`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit closes only the package-to-raw-runtime seam left after the canonical
`PDF_TEXT_V1_SUPERVISED_SEMANTIC_ORCHESTRATOR_IMPLEMENTATION` closeout.
It binds the already-adopted exact `@embedpdf/pdfium@2.15.0` CommonJS `init`
export to the canonical `extractPdfPageTextWithLocalWasm()` raw runtime while
keeping PDF bytes, WASM bytes, page index, and character budget
caller/application supplied.

```text
UNIT = PDF_TEXT_V1_EXACT_PDFIUM_PACKAGE_RUNTIME_BINDING_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 0a08c6db565d9b92628720e0de34ee46d74768e0
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-runtime-binding.js
packages/providers/test/pdf-text-runtime-binding.test.js
specs/004-local-pdf-core/pdf-text-v1-exact-pdfium-package-runtime-binding-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new binding test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

The binding exports only `extractPdfPageTextWithExactPdfiumPackage(options)`.

Its implementation:

- imports `init` from `@embedpdf/pdfium`;
- imports the canonical `extractPdfPageTextWithLocalWasm()` raw runtime;
- rejects malformed, proxy, accessor-bearing, extra-key, missing-key,
  symbol-keyed, and custom-prototype option envelopes with a deterministic
  `TypeError` before any runtime effect;
- forwards caller/application-supplied `bytes`, `wasmBinary`, `pageIndex`,
  and `maxChars` unchanged as call arguments;
- injects the exact package `init` function into the canonical raw runtime;
- delegates byte validation, private runtime WASM isolation, PDFium surface
  validation, allocation, document/page/text-page lifetime, cleanup, character
  budget enforcement, and mutation detection to the canonical runtime.

The binding does not resolve an asset path, read a WASM file, accept a URL,
create a URL, invoke a worker, perform text extraction itself, or implement any
PDF semantic mapping. Request/runtime-binding identity, terminal fail-closed
semantics, caller-owned bytes/control immutability, and no-partial-output
publication are preserved by pure delegation: the binding never observes,
mutates, or republishes provider, supervisor, bridge, or orchestrator state.

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
Worker
CDN
pdfium.wasm asset resolution
```

The upstream package's exported CDN convenience URL is therefore not part of
this Signthos binding path. The source additionally carries no provider,
supervisor, bridge, or orchestrator import or behavior.

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
```

The WASM identity above was reverified from the external copy during this
qualification and matches the canonical frozen qualification value. Frozen
provenance and legal evidence under `provenance/components/pdfium-2.15.0/`
were not mutated.

Node-version note: canonical governance (Constitution, `AGENTS.md`, 004 plan)
states no Node version requirement; `24.20.0` in the 004C1Z record is the
future resolver-execution-environment baseline, not a provider-qualification
gate. Qualification therefore records the actually executed runtime
(`v22.22.3`); identical test counts are not claimed as environment
equivalence. The render binding unit's canonical merged evidence likewise
records `NODE_VERSION = v22.22.3`.

## 5. Bounded local WASM execution

Unlike the render binding unit (which forbade real execution), the authorizing
reconciliation for this unit explicitly requires package-init delegation, raw
runtime delegation, and fail-closed mismatch evidence. Those properties of a
pass-through binding are observable only through the real initializer, so this
unit exercises bounded local WASM execution with the adopted package and
fixture bytes only:

- one successful extraction (adopted WASM + ordinary-minimal fixture PDF)
  proving init delegation, raw-runtime delegation, page/char-budget
  propagation, byte identity preservation, and caller-input immutability;
- one mismatched-WASM call (caller-supplied non-WASM bytes) proving fail-closed
  rejection with no text success published;
- one corrupt-PDF call (adopted WASM + non-PDF bytes) proving structured
  rejection (`openSucceeded: false`) instead of success.

```text
WASM_INSTANTIATION_OBSERVED = BOUNDED_LOCAL (adopted package + fixture bytes only)
WASM_INSTANTIATION_SUCCESSFUL = YES (1 delegation proof; mismatch/corrupt paths fail closed)
NETWORK_ATTEMPTS_OBSERVED = NONE
```

Construction evidence that every other exercised path rejects before runtime
effects:

- the binding envelope check precedes the single downstream call site;
- the canonical runtime validates `bytes`, `wasmBinary`, `initPdfium`,
  `pageIndex`, and `maxChars` before its single `await initPdfium(...)`
  call site;
- every non-delegation behavioral test supplies at least one invalid envelope
  or field, so rejection deterministically precedes initializer invocation.

## 6. Focused binding qualification

The focused binding suite passed on the exact candidate tree using the
external exact-package resolution described above.

```text
FOCUSED_TESTS = 11
FOCUSED_PASS = 11
FOCUSED_FAIL = 0
```

Coverage:

- module exposes only `extractPdfPageTextWithExactPdfiumPackage` and is frozen;
- source keeps the exact-package/local-only boundary of section 3;
- source carries no provider/supervisor/bridge/orchestrator behavior;
- exact adopted package and local WASM identities match section 4;
- malformed envelopes (null, primitives, arrays, Buffers, proxies,
  custom-prototype objects) fail with the deterministic binding `TypeError`;
- accessor-bearing, extra-key, missing-key, and symbol-keyed envelopes fail
  with the deterministic binding `TypeError`;
- empty source/WASM views fail through canonical raw-runtime validation with
  deterministic field messages, and caller bytes are unchanged afterwards;
- out-of-range page indexes and character budgets fail through canonical
  raw-runtime validation with deterministic field messages;
- package-init and raw-runtime delegation succeed once on adopted bytes with
  byte identity preserved and caller inputs unmutated/unfrozen;
- mismatched caller WASM bytes reject with no success published and caller
  bytes unchanged;
- corrupt caller PDF bytes resolve to structured rejection with no `text`
  publication.

## 7. Complete applicable provider qualification

The complete canonical provider suite, including the new binding test file as a
separately expanded argument, passed under the exact Node executable with the
exact adopted package exposed through an external `NODE_PATH`. No
`node_modules` materialization is part of the candidate repository diff.

```text
TOTAL_TESTS = 547
PASS = 547
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
TEXT_BINDING_SOURCE_SHA256 = 8624d4a76fdee2dea9901ad28ce2674f66a124ee79122ca83e800355e4359a7b
TEXT_BINDING_TEST_SHA256 = e9ac85817fbdd342137ffa9d7e5923b91c31fe13928b98ebd3b62de7f9d7a7e4
PROVIDERS_PACKAGE_JSON_SHA256 = c94fb34bdffe71d227b1f8caf8c9679cbe7247e823f2b125bcf47f4a5d7bf2d9
```

The package-manifest change only appends `test/pdf-text-runtime-binding.test.js`
to the existing provider test command. It changes no dependency declaration.

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded binding connects the exact adopted
PDFium package initializer to the canonical raw text runtime with
caller-supplied bytes under exact envelope validation, verified package/WASM
identity, and observed fail-closed mismatch behavior.

It does not prove provider wiring, supervisor/orchestrator integration,
facade composition, search/select/metadata correctness, worker integration, or
native/server parity.

## 10. Explicit non-grants

```text
TEXT_FACADE = NOT_AUTHORIZED
TEXT_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SUPERVISOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_BRIDGE_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_ORCHESTRATOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
BROWSER_WORKER_INTEGRATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
PDF_TEXT_SELECT_V1_BINDING = NOT_AUTHORIZED
PDF_TEXT_SEARCH_V1_BINDING = NOT_AUTHORIZED
PDF_METADATA_V1_BINDING = NOT_AUTHORIZED
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
