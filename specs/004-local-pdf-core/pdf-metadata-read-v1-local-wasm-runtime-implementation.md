# PDF_METADATA_READ_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / METADATA_READ_V1_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7 after PR #271
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit starts the plan 004C `bounded document/page metadata reads` bullet at its
dependency root: bounded document Info-dictionary reads through the adopted exact PDFium
runtime. Page-box reads, metadata writes, and XMP compose later and are explicitly out
of scope here.

```text
UNIT = PDF_METADATA_READ_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 75b84886434b21908023512b664c640b53b64433
CANONICAL_BASE_TREE = a9790fa1d07a1c165f2ad68a1b491728a5bf2d37
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-metadata-runtime.js
packages/providers/test/pdf-metadata-runtime.test.js
specs/004-local-pdf-core/pdf-metadata-read-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The module exports only `readPdfMetadataWithLocalWasm`.

Its implementation mirrors the canonical search lifecycle in a self-contained module
(all text runtimes keep their pinned single-export surfaces; zero canonical-file churn):

- destructured inputs `bytes`, `wasmBinary`, `initPdfium` (document-level; no page index)
  with the same per-field fail-fast validation;
- identical snapshots, runtime-owned initializer options with substitution detection, surface
  validation (extended with `FPDF_GetMetaText` only — no page, text, find, rect, char-box,
  or font surface), allocation guards, and document loading;
- fixed closed tag vocabulary read in order (`Title`, `Author`, `Subject`, `Keywords`,
  `Creator`, `Producer`, `CreationDate`, `ModDate`); the function takes no tag input, so
  no caller-reachable native tag path exists by construction;
- two-phase read per tag with the tag passed as a JS string directly (the adopted binding
  marshals the tag itself — a pointer argument aborts; never a pointer); `need <= 2`
  means absent-or-empty and yields `null` explicitly, never an empty-string guess;
  `need > 2` mallocs exactly `need` bytes with the same allocation-bounds guards and
  ownership-immediate extent discipline, then requires the second call to report within
  `(2, need]` (else fail-closed `inconsistent metadata length`); bounds-checked copy-out
  of `written - 2` bytes decoded UTF-16LE, where a value-buffer cleanup failure aggregates
  with (never replaces) the read error;
- any per-tag violation fails the whole call closed; no partial envelope is ever returned;
- document close, then the identical input-free/destroy-library cleanup with aggregated
  fail-closed errors; caller-immutability post-checks;
- result envelope `{ openSucceeded, metadata: { title, author, subject, keywords, creator,
  producer, creationDate, modDate } }` with `null` for absent; malformed documents return
  `openSucceeded: false` with the PDFium last-error code, exactly like the text paths.

## 3. Local-only boundary

The metadata source contains no reference to any of the forbidden surfaces asserted by its source test
(page/text/find/rect/char-box/font/bounded-text APIs, page bitmap rendering, package import,
`WebAssembly`, fetch/XHR/worker, `node:fs`/`node:path`, timers, network/URL/CDN tokens).
It performs no asset resolution, application packaging, or revision creation. Metadata reads are
derived `READ_ONLY` evidence with explicit absence (`null`) semantics.

## 4. Focused metadata qualification

The focused suite ran under the exact canonical tool identity with the exact adopted package
exposed through an external `NODE_PATH`. No `node_modules` materialization is part of the candidate
repository diff.

```text
NODE_VERSION = v24.20.0
NODE_DARWIN_ARM64_EXECUTABLE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
FIXTURE = admission-seed-ordinary-minimal-v1
FIXTURE_METADATA = all 8 tags absent (need = 0 each, deterministic)
```

No repository fixture carries an Info dictionary (surveyed all admission fixtures), so positive
reads are stub-proven in this grain with real-fixture absence proofs; a metadata-bearing corpus
fixture is future corpus work, explicitly not authorized here.

Focused coverage proves, at minimum:

```text
exact module surface and frozen exports (metadata object frozen)
local-only raw-runtime boundary (single init call site, no page/text/find/rect/char-box/font tokens)
all invalid input classes fail before initializer invocation (initCalls == 0)
ordinary-minimal fixture reports every tag absent with a frozen envelope, deterministic
stub-surface proofs: exact positive values with string-typed tags (11-call two-phase
sequence asserted), non-ASCII round-trip, empty-string reads as explicit absence,
invalid need, oversized need before value-buffer malloc, inconsistent written length
(both directions), failed document close, read+cleanup dual aggregation
allocation-bounds proofs: value-slot and input-allocation extent failures still free
the failed pointer (freed-pointer sequences asserted via stub hooks)
malformed document fails closed with openSucceeded false and a safe-integer error code
caller bytes and WASM bytes unchanged across successful execution
```

## 5. Real runtime execution (bounded)

Bounded real-package proofs with the ordinary-minimal fixture only, as authorized:

```text
FOCUSED_TESTS = 15
FOCUSED_PASS = 15
FOCUSED_FAIL = 0
WASM_INSTANTIATION_OBSERVED = YES (positive + fail-closed real-package paths)
NETWORK_ATTEMPTS_OBSERVED = NONE
```

No other valid-document execution occurs in this unit.

## 6. Provenance and legal surface

No dependency, lockfile, notice, or license surface changes in this unit. The manifest change appends
only the new metadata test file to the provider test command.

## 7. Explicit non-claims

```text
METADATA_WRITES_XMP = NOT_AUTHORIZED / NOT_IMPLEMENTED
PAGE_BOX_APIS = NOT_AUTHORIZED / NOT_IMPLEMENTED
BRIDGE_ORCHESTRATOR_FACADE_PROVIDER_WIRING = NOT_AUTHORIZED / NOT_IMPLEMENTED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 8. Candidate file hashes (final bytes)

Recorded after final exact-Node qualification rerun, before review:

```text
METADATA_SOURCE_SHA256 = fb69cbc53a3f25cf297fd472fced3fa7d738498cdbe20b8b6f9d7476626222c9
METADATA_TEST_SHA256 = ed69b6f00bf06b86de077de68fe8da744ba27016a60f4fb283869b08fdebbc53
PROVIDERS_PACKAGE_SHA256 = e38089c48eee18b00e6abb1118b9f2fcde930637b228ea359d975e421511fede
```

The document's own bytes are bound externally: the candidate tree SHA in the PR body
and the merge-tree equality check cover this file byte-identically (a self-recorded
document hash could never match its own final bytes).

## 9. Merge and successor gates

This candidate is not canonical until all of the following hold on the exact final head:

1. the final diff contains only the four authorized paths;
2. exact Node qualification is rerun after the qualification document is complete;
3. source, test, and package hashes are recorded for the final bytes, with the document
   bound externally through the candidate tree SHA and merge-tree equality check;
4. `git diff --check` is clean;
5. repository status is byte-identical before and after final qualification;
6. a fresh independent substantive exact-head review reports no material findings;
7. all material review threads are resolved;
8. live `main`, candidate head/tree, changed paths, open-PR set, and applicable status truth are
   reverified immediately before merge;
9. merge uses normal merge with exact expected head SHA and no history rewriting;
10. post-merge tree, ordered parents, signature, changed surface, PR state, and open-PR state are
    mechanically verified;
11. Issue #7 receives canonical closeout;
12. a fresh successor reconciliation determines the next minimum dependency-ordered unit.

No successor authority is inherited from this document. In particular, the metadata runtime does not
itself authorize metadata writes, XMP, page-box APIs, bridge/orchestrator/facade/provider wiring,
004D, Specification 005, release, deployment, or project completion.
