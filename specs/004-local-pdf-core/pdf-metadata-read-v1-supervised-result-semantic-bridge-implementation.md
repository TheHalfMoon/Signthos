# PDF_METADATA_READ_V1 Supervised-Result Semantic Bridge Implementation Qualification

Status: `IMPLEMENTATION_CANDIDATE / FAKE_CONTROL_ONLY / NO_REAL_RUNTIME_EXECUTION`

Issue: #7
Authority: `github:issue-comment:5713197389`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This bounded unit implements the canonical `PDF_METADATA_READ_V1`
supervised-result semantic bridge `composeSupervisedPdfMetadataResult`,
mirroring the canonical search bridge discipline over supervisor envelopes
carrying metadata observations. It revalidates one supervisor envelope and
delegates to the canonical metadata composer with the matching evidence slot.

It does not execute PDFium, WASM, a browser, a worker, a real timer, a resource
meter, the supervisor, or any document-processing network path. Qualification
uses deterministic injected envelopes and canonical fixture bytes only.

```text
UNIT = PDF_METADATA_READ_V1_SUPERVISED_RESULT_SEMANTIC_BRIDGE_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 0aa4547545cb536f07c381067c3d64c1c4c9f975
MAX_CHANGED_FILES = 4
```

Authorized paths are exactly:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-metadata-runtime-bridge.js
packages/providers/test/pdf-metadata-runtime-bridge.test.js
specs/004-local-pdf-core/pdf-metadata-read-v1-supervised-result-semantic-bridge-implementation.md
```

`packages/providers/package.json` changes only its existing test command to append
the new bridge test file. No dependency declaration, workspace, lockfile,
fixture, provenance, workflow, container, browser asset, or runtime binary is
changed.

## 2. Implementation contract

`composeSupervisedPdfMetadataResult({ bytes, request, availability,
supervisedResult })` mirrors `composeSupervisedPdfTextSearchResult`:

- `Buffer` bytes at the semantic boundary and a strict plain supervisor
  envelope, else `TypeError`;
- `RUNTIME_COMPLETED` requires the exact two envelope keys; the carried raw
  observation is revalidated (exact two-key success with eight fixed
  `string`-or-`null` metadata fields; rejection pinned to `FPDF_ERR_FORMAT`
  code 3) and delegated to the canonical composer as `metadataEvidence` with
  `terminalOutcomeEvidence: null`;
- `RUNTIME_TERMINAL` requires the exact two envelope keys; the carried
  terminal evidence is shape-revalidated (exact nine keys plus digest shape)
  and delegated as `terminalOutcomeEvidence` with `metadataEvidence: null`;
- unknown supervisor kinds throw `TypeError`; semantic mismatches inside
  well-shaped evidence are rejected by the canonical composer, never papered
  over by the bridge.

No metadata runtime, provider, supervisor, orchestrator, binding, or facade is
modified or invoked by this unit.

## 3. Local-only boundary

The source imports only the metadata composer and the supervisor kind
constant, calls no runtime/supervisor/composer, and contains no reference to
any of: raw metadata reads, supervisor invocation, `@embedpdf/pdfium`,
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

## 6. Focused bridge qualification

```text
FOCUSED_TESTS = 20
FOCUSED_PASS = 20
FOCUSED_FAIL = 0
```

Coverage mirrors the search bridge suite with metadata envelopes: all-absent
and positive completion; format-rejection mapping; all three terminal outcomes
with exact evidence; availability-conflict preservation; unavailable
preservation; byte-mismatch mapping; Buffer boundary; envelope hostile matrix
(unknown kind, extra keys, symbols, custom prototypes, proxies, accessors)
with zero trap/getter execution; raw-observation hostile matrix; terminal
evidence hostile matrix; semantic-mismatch delegation to the composer;
non-mutation; source boundary; null-prototype acceptance.

## 7. Complete applicable provider qualification

```text
PDFIUM_PACKAGE = @embedpdf/pdfium@2.15.0
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
TOTAL_TESTS = 912
PASS = 912
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 8. Candidate file identities

```text
METADATA_BRIDGE_SOURCE_SHA256 = e22c310bdb14c61461ad6a58a8bd6423422fd6d0909fc9246a240a6950f97116
METADATA_BRIDGE_TEST_SHA256 = 1b6ac5227b1a80bae683ec5780201c2b7b428930d9dd07e8735d9aa4665bfcf1
PROVIDERS_PACKAGE_JSON_SHA256 = 69446f83d101227b340c880f8ebab457f124da4f62197b9bf08b5e85ea81f88b
```

The final document SHA-256 is recorded in external GitHub qualification evidence
after the file is complete; the document does not contain a self-referential digest.

## 9. Exact qualification claim

This candidate proves only that a bounded metadata bridge revalidates
supervisor envelopes into canonical composer results under exact envelope,
observation, terminal-shape, and fail-closed attack-surface validation.

It does not prove metadata orchestration, binding, facade, real runtime
execution, metadata write behavior, worker integration, or native/server parity.

## 10. Explicit non-grants

```text
METADATA_ORCHESTRATOR = NOT_AUTHORIZED
METADATA_BINDING = NOT_AUTHORIZED
METADATA_FACADE = NOT_AUTHORIZED
METADATA_RUNTIME_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_PROVIDER_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
METADATA_SUPERVISOR_MODIFICATION = NOT_AUTHORIZED / NOT_IMPLEMENTED
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
