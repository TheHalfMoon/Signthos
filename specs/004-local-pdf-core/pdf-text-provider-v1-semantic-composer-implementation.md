# PDF_TEXT_PROVIDER_V1 Semantic Composer Implementation

Status: `IMPLEMENTATION_CANDIDATE / TEXT_PROVIDER_V1_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7 after PR #273
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit starts the plan 004C `browser/local provider behavior` program at its dependency
root: the provider descriptor/schema foundation for text extraction, mirroring
`pdf-render-provider.js`. Supervisor, bridge, orchestrator, binding, and facade layers
consume this foundation and compose later; select/search/metadata/thumbnail providers
compose later; all are explicitly out of scope here.

```text
UNIT = PDF_TEXT_PROVIDER_V1_SEMANTIC_COMPOSER_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 5f623ce5456fd940a08167d317dd6251e84cfd5a
CANONICAL_BASE_TREE = 9a7fbd3bd174edd23228b9ee50081aa0a5ee2dfc
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-text-provider.js
packages/providers/test/pdf-text-provider.test.js
specs/004-local-pdf-core/pdf-text-provider-v1-semantic-composer-implementation.md
```

## 2. Implementation contract

The module exports the bounded semantic composer surface (mirroring the render provider's
export list with `composePdfTextResult` in place of `composePdfRenderResult`).

Its implementation is a mechanical mirror of the canonical render provider in a
self-contained module (all existing providers/runtimes keep their pinned surfaces; zero
canonical-file churn):

- same provider identity (same local browser PDFium provider, same implementation version
  evidence): `providerId signthos.pdf.browser.embedpdf-v2.15.0-pdfium`, kind `BROWSER`,
  locality `LOCAL_ONLY`;
- `CAPABILITY_REF = { capabilityCode: 'PDF_TEXT_EXTRACT_V1', capabilityVersion: '1' }`;
- `PROVIDER_CAPABILITY_VERSION = 'signthos.pdf.text.v1'`;
- `TERMINAL_EVIDENCE_SCHEMA = 'signthos.pdf.text.runtime-terminal.v1'`;
- identical availability/outcome/stable-error/retry vocabularies, including the
  CANCELLED/TIMED_OUT/RESOURCE_LIMIT_EXCEEDED terminal outcomes that carry the
  cancellation vocabulary forward;
- `CAPABILITY_PARAMETER_KEYS = ['pageIndex', 'maxChars']`;
- `ACCEPTED_TEXT_KEYS = [openSucceeded, pageIndex, pageCount, charCount, truncated,
  unicodeMapError, text]` with page/budget/text-shape/binding validation (pageIndex
  match, pageIndex < pageCount, charCount-vs-maxChars consistency by truncated flag,
  text string within budget with exact full-text length when untruncated,
  unicodeMapError boolean);
- `REJECTED_TEXT_KEYS = [openSucceeded, pdfiumLastError]` with format-error diagnostics;
- success observations `{ pageIndex, pageCount, charCount, truncated, unicodeMapError,
  textLength, textDigest, warnings: [] }` with SHA-256 over the UTF-8 text bytes;
- mirrored error-code vocabulary (`invalid_input.pdf_text_request`,
  `unsupported_capability.pdf_text_extract_v1`, `unavailable.pdf_text_provider`,
  `invalid_input.text_evidence_binding/shape`,
  `malformed_untrusted_document.pdfium_format_or_corruption`, terminal
  `cancelled|timeout|resource_limit_exceeded.pdf_text_runtime`);
- identical request/terminal/result composition semantics including read-only effect
  class and no-revision creation.

Pure functions only: no WASM loading, no runtime invocation, no network, no revision
creation. The module requires only `node:crypto`, `node:util`, `content-identity-admission`,
and `pdfium-structural-evidence` — never a runtime module.

## 3. Local-only boundary

The provider source contains no reference to any forbidden surface asserted by its source
test (runtime requires, package import, `WebAssembly`, fetch/XHR/worker, `node:fs`/`node:path`,
timers, network/URL/CDN tokens). It performs no asset resolution, application packaging, or
revision creation. Composition is derived `READ_ONLY` evidence.

## 4. Focused provider qualification

The focused suite ran under the exact canonical tool identity. No `node_modules`
materialization is part of the candidate repository diff.

```text
NODE_VERSION = v24.20.0
NODE_DARWIN_ARM64_EXECUTABLE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
```

Focused coverage proves, at minimum (30 tests mirroring the render provider suite):

```text
exact module surface (bounded composer exports, frozen)
provider descriptor freezes the exact browser-local text capability
canonical success maps to SUCCEEDED with exact observations including text digest
malformed rejection maps to MALFORMED_UNTRUSTED_DOCUMENT with provider diagnostics
capability/provider mismatches fail with the exact mirrored codes
availability closure (UNAVAILABLE/UNKNOWN/unknown-value discipline)
digest/length/parameter/binding/budget defects fail closed (incl. truncation
truthfulness both directions)
text-shape defect battery (flags, types, bounds, lengths, missing text)
unicode and astral-plane text composes an exact utf8 digest (UTF-16 unit counting)
rejection-shape defects without malformed diagnostics
prototype/accessor/proxy discipline without getter or trap execution
read-only composition over bytes/request/evidence
deep freeze with no signature or safety claims
every canonical fixture preserves identity with no revision (all 5 records)
terminal outcomes map distinctly with frozen terminal evidence
terminal binding battery and terminal/runtime coexistence discipline
terminal composition immutability
local-only semantic source boundary (single-purpose requires only)
```

## 5. Real runtime execution (bounded)

This unit's focused proofs are pure-function unit tests (no WASM instantiation required
beyond the full-suite regression):

```text
FOCUSED_TESTS = 30
FOCUSED_PASS = 30
FOCUSED_FAIL = 0
WASM_INSTANTIATION_OBSERVED = NOT_APPLICABLE (pure composition; regression suite covers runtimes)
NETWORK_ATTEMPTS_OBSERVED = NONE
```

No valid-document WASM execution is required by this unit beyond the regression suite
(468/468 PASS at candidate head, first-hand).

## 6. Provenance and legal surface

No dependency, lockfile, notice, or license surface changes in this unit. The manifest change appends
only the new provider test file to the provider test command.

## 7. Explicit non-claims

```text
RUNTIME_LOADING_OR_INVOCATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
TEXT_SELECT_SEARCH_METADATA_PROVIDERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
SUPERVISOR_BRIDGE_ORCHESTRATOR_BINDING_FACADE = NOT_AUTHORIZED / NOT_IMPLEMENTED
THUMBNAIL_PROVIDER_WIRING = NOT_AUTHORIZED / NOT_IMPLEMENTED
WASM_ASSET_CHANGES = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 8. Candidate file hashes (final bytes)

Recorded after final exact-Node qualification rerun, before review:

```text
TEXTPROVIDER_SOURCE_SHA256 = dbe9b8cf0569ef80e458b6ca04f9427571e5ec8c87fd798c097a66605919f64b
TEXTPROVIDER_TEST_SHA256 = 6f0095c9e33de6873d123a45106073c8c861c915729829d67965772ea4bdadba
PROVIDERS_PACKAGE_SHA256 = acbb2d68fce95eb7d5ad4acdf30de869128f7266eb064039c1b5ff3c11f876af
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

No successor authority is inherited from this document. In particular, the text provider does not
itself authorize runtime loading, other capability providers, supervisor/bridge/orchestrator/binding/facade
layers, 004D, Specification 005, release, deployment, or project completion.
