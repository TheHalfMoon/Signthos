# 004C1EH — Reproducible Build to Published npm PDFium WASM Identity Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_EXACT_PUBLISHED_WASM_BYTE_IDENTITY / STATIC_CROSS_EVIDENCE_ONLY`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `d3ce21ef6e55d89aca1d6676a923e6f33bdc735b`
Canonical base tree: `8c6d026ca7c8c15c3781e1fbfea8de90263a5cc5`
Authority: `github:issue-comment:5650000303`

## 1. Purpose and authority boundary

004C1EH joins already-canonical evidence only. It performs no network acquisition, build, package execution, runtime execution, or binary import.

Canonical 004C1AC/004C1AD bind the exact acquired npm archive payload for `@embedpdf/pdfium@2.15.0`. Canonical 004C1EF/004C1EG bind two independently successful exact offline rebuilds from the pinned EmbedPDF/PDFium source and release-build topology. The single question in this unit is whether those two evidence streams identify the same `pdfium.wasm` bytes.

```text
AUTHORITY_CLASS = STATIC_CANONICAL_CROSS_EVIDENCE_ONLY
NETWORK_ACQUISITION = 0
RUNTIME_EXECUTION = 0
BUILD_REEXECUTION = 0
UPSTREAM_SOURCE_BYTES_ADDED = 0
GENERATED_VENDOR_BINARY_BYTES_ADDED = 0
PACKAGE_OR_LOCKFILE_MUTATION = 0
```

## 2. Canonical published artifact identity

Canonical 004C1AC and 004C1AD establish:

```text
NPM_PACKAGE = @embedpdf/pdfium@2.15.0
TARBALL_BYTES = 2665003
TARBALL_SHA256 = fe0cb4677782a58b67f555df9a1257742bcfbf390b9a3e08bd8ad976eea436bb
PUBLISHED_WASM_PATH = package/dist/pdfium.wasm
PUBLISHED_WASM_BYTES = 4633788
PUBLISHED_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
```

004C1AD also records that component/NOTICE completeness remains `PARTIAL`; that independent licensing blocker is not weakened by this unit.

## 3. Canonical reproducible build identity

Canonical 004C1EF records the first successful exact offline build and canonical 004C1EG records the independent fresh-container replay. Both emitted:

```text
REBUILT_WASM_BYTES = 4633788
REBUILT_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
SUCCESSFUL_EXACT_OFFLINE_BUILD_COUNT = 2
SECOND_BUILD_PREVIOUS_OUTPUT_REUSE = NO
SECOND_BUILD_PREVIOUS_GENERATED_EMSCRIPTEN_CACHE_REUSE = NO
```

The two build results are therefore independently reproducible for this exact frozen build topology.

## 4. Exact cross-evidence comparison

| Evidence object | Path / role | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| Canonical acquired npm payload | `package/dist/pdfium.wasm` | 4,633,788 | `c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8` |
| Canonical exact offline build 1 | generated `pdfium.wasm` | 4,633,788 | `c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8` |
| Canonical independent build 2 | generated `pdfium.wasm` | 4,633,788 | `c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8` |

```text
PUBLISHED_TO_BUILD1_SHA256_EQUAL = YES
PUBLISHED_TO_BUILD1_SIZE_EQUAL = YES
PUBLISHED_TO_BUILD2_SHA256_EQUAL = YES
PUBLISHED_TO_BUILD2_SIZE_EQUAL = YES
EXACT_REPRODUCIBLE_BUILD_TO_PUBLISHED_NPM_WASM_IDENTITY = PASS
```

Because SHA-256 and byte size are identical across the exact acquired published payload and both independent rebuilds, the canonical evidence binds the reproducibly rebuilt `pdfium.wasm` byte identity to the published `@embedpdf/pdfium@2.15.0` `package/dist/pdfium.wasm` byte identity.

This is an exact byte-identity claim for `pdfium.wasm` only. No published identity is available here for `pdfium.js`, `pdfium.cjs`, `functions.ts`, or `runtime-methods.ts`, so equality for those files is not inferred.

## 5. 004C1AD missing-evidence disposition

004C1AD listed five missing evidence classes before adoption/distribution. This unit closes only item 5:

```text
ITEM_1_EXACT_FINAL_COMPONENT_LINK_CLOSURE = OPEN
ITEM_2_COMPONENT_LICENSE_COPYRIGHT_ATTRIBUTION_MAPPING = OPEN
ITEM_3_EXTERNAL_DEPS_AND_EMSCRIPTEN_ACTUAL_INCORPORATION_MAPPING = OPEN
ITEM_4_DETERMINISTIC_NOTICE_LICENSE_INVENTORY_COMPLETENESS = OPEN
ITEM_5_REPRODUCIBLE_BUILD_BINDING_SOURCE_TO_ACQUIRED_NPM_WASM = CLOSED_PASS
PDFIUM_COMPONENT_NOTICE_COMPLETENESS = PARTIAL
DISTRIBUTION_ADOPTION_GATE = FAIL_CLOSED
```

The equality result must not be treated as a component inventory, SBOM, or complete redistribution notice proof.

## 6. Claims established

004C1EH establishes exactly:

- the canonical acquired npm `package/dist/pdfium.wasm` is byte-identical by SHA-256 and byte size to canonical exact offline build 1;
- the same published WASM is byte-identical by SHA-256 and byte size to canonical independent build 2;
- the canonical reproducible build result therefore binds the pinned exact build topology to the exact published npm WASM byte identity.

## 7. Explicit non-grants

004C1EH does not establish or authorize:

- published equality for any file other than `pdfium.wasm`;
- complete final linked-component membership;
- complete component-level license/copyright/attribution mapping;
- complete NOTICE, SBOM, or redistribution package;
- artifact import, dependency installation, or product adoption;
- browser loading/render/search/edit behavior or provider contract conformance;
- arbitrary/untrusted PDF safety, resource limits, performance, or corpus behavior;
- 004C2, 004D, Specification 005, release, deployment, or project completion.

## 8. Merge discipline and successor boundary

This candidate becomes canonical only after exact base/head/tree/path verification, `git diff --check`, truthful workflow/check/provider accounting, fresh independent substantive exact-head review, zero unresolved material review threads, immediate premerge race proof, guarded normal merge of the exact reviewed head, and mechanical post-merge proof.

After canonical merge, fresh Issue #7 reconciliation must select the smallest remaining prerequisite. Based on current canonical facts, 004C1AD component/NOTICE items 1–4 remain open, but this document does not authorize their implementation or any provider runtime successor.
