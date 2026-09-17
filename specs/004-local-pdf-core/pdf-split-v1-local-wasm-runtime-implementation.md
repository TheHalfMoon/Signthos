# PDF_SPLIT_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / SPLIT_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the post-merge successor reconciliation `github:issue-comment:5713823794`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the final 004E operation: single-source multi-output
split over the reorder/extract/merge-proven import mechanism, with explicit
all-or-nothing partial-success semantics. On canonical closure of this unit,
`004E_MERGE_SPLIT = COMPLETE` is established.

```text
UNIT = PDF_SPLIT_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 2bcf97f234cf3ed0f5481c7d739de0993f4f950c
CANONICAL_BASE_TREE = eb1976091da788d49b9000258345c00212a0957a
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = splitPdfDocumentWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-split-runtime.js
packages/providers/test/pdf-split-runtime.test.js
specs/004-local-pdf-core/pdf-split-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `splitPdfDocumentWithLocalWasm` and the frozen
`SPLIT_RESOURCE_BUDGETS` constant (`maxInputBytes`/`maxOutputBytes` 64 MiB,
`maxRanges` 32), and nothing else. The module object is frozen.

`pageRanges` is an array of 1..32 entries in output order; each entry is a
non-empty array of distinct in-range 0-based source indices read through
per-index data descriptors (element getters never invoked). Duplicates within
an entry are rejected so per-output lineage stays injective. Cross-entry
overlap is PERMITTED and recorded: each output carries exact independent
lineage regardless of overlap.

Partial success is ALL-OR-NOTHING (004A case 12): ranges are processed in
order into one target document each; any range failure (validation, import
boolean/count, signature read, save, readout, per-output budget) discards
every produced output and publishes nothing. A mid-list stub failure proves
zero outputs escape and every opened target closes.

Mechanism per range mirrors the extract grain (identity-order import of its
indices with boolean AND count-delta gates, DataView-marshaled index array
freed per range, per-output signature count, per-output `PDFiumExt` save and
readout with per-output budget, input allocation held until source close).
All opened targets are tracked and closed on all paths.

The result is one frozen object: input identity (`inputByteLength`, sha256
`inputDigest`, `pageCount`, `signatureCount`, `signatureStructurePresent`),
frozen `outputs[]` with one frozen entry per range in order (`pageIndices`
frozen copy, `pageCount`, `outputSignatureCount`, caller-owned `outputBytes`,
`outputByteLength`, sha256 `outputDigest`), and frozen `providerIdentity`. No
preservation fields. No revision minting.

Observed provider behavior, recorded without claim: imports do not carry
countable signature structures (single-page split of the signed-structure
fixture yields `outputSignatureCount` 0 while source evidence stays 1).
Identical ranges may yield identical outputs; not forbidden.

`MAX_RANGES = 32` bounds output fan-out (larger splits compose via repeated
calls). `FPDF_MovePages`, range-string import, Delete, and version-stamp APIs
are all absent. Stable errors use the 004A vocabulary with range-tagged
messages; `AggregateError` discipline; no retry.

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports; no package import in src; no
network/asset/active-content identifiers (static assertions in the suite).

## 4. Focused split qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface (1..32 ranges); proxy/accessor/unknown-key rejection
per-range import order with marshaled-array read-back and full lifecycle order
invalid ranges fail before any import; mid-list import/save failure publishes
  zero outputs and closes every opened target
unopenable input; input/output budgets (range-tagged); aggregation; no retry
mid-run caller mutation fails closed; single-import-path static surface
real [[0,1],[2]] split with per-output text proof and independent inspect/render
real reversed/overlapping/single-range splits with per-output text proof
real ordinary/signed/active single splits (output-sig-0 recorded, no claim)
real malformed/non-PDF/invalid-range failures; source bytes unchanged everywhere
```

Focused results:

```text
FOCUSED_TESTS = 14
FOCUSED_PASS = 14
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 2ede6235d52936dcbe4fa23c00cdf32f7a3b47f85085634b6395eb804ba6d4a4
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 5. Network-denied execution evidence

Same external deny preload method as prior grains.

```text
NETWORK_TESTS = 14
NETWORK_PASS = 14
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = b60cc7a683544585d44bda0d1095e23af30b97b6337870f227a5d879fa208b79
NETWORK_STDOUT_SHA256 = 86e0df8a97e5c9d6bfdcfbd214d90484dca50ab5253ed4791c0e545e1eba8468
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1075
PASS = 1075
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = 7a3d93ee2276cb25d46df517eb7c525d7178ce1527308d7fc740b14df456a683
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
SPLIT_SOURCE_SHA256 = ff3e75d535c12500912794ab4071aeaa0e9e7a08ff6fe87de04aa2056127e6c8
SPLIT_TEST_SHA256 = a0351258c17834a9b36ee771fc15e5a15b1bbfd93ef4d4c4bc10b3ca49ed5cc2
PROVIDERS_PACKAGE_JSON_SHA256 = 170851d41cdc34cf4d9949d57eb2e285acf871b7ecf98e086825bde96e70bc33
```

The package-manifest change only appends `test/pdf-split-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that single-source multi-output split over the
exact adopted runtime produces one independently valid revision candidate per
requested range in order, validates each through independent canonical paths,
fails the whole operation closed on any range failure, and publishes nothing
on any failure path without an observed network attempt.

It does not prove merge/split composition, supervision layers, revision
minting, signature preservation, corpus-wide compatibility, performance
bounds, or native/server parity.

## 9. Explicit non-grants

```text
N_WAY_MERGE = NOT_AUTHORIZED
MERGE_PLUS_SPLIT_COMPOSITION = NOT_AUTHORIZED
MUTATION_SUPERVISION_COMPOSITION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
OVERLAP_PROHIBITION = NOT_AUTHORIZED / NOT_IMPOSED (permitted, recorded)
SPECIFICATION_005 = NOT_AUTHORIZED
004F_K = NOT_AUTHORIZED (beyond 004E)
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 10. Merge and successor gates

Same gates as prior grains on the four authorized paths. No successor
authority is inherited from this document; the 004F successor reconciliation
follows canonical closure separately.

The final document SHA-256 is recorded in external GitHub qualification
evidence after the file is complete; the document does not contain a
self-referential digest.
