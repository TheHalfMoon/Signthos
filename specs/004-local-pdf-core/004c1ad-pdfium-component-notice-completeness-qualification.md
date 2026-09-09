# 004C1AD — PDFium Component Notice Completeness Qualification

## 1. Authority and scope

This artifact executes only the bounded public-source/archive notice-evidence authority granted by Issue #7 successor reconciliation `github:issue-comment:5606346552` from canonical base `65ba77239d628ae15938e11077139f282d09941d` / tree `4c6238a514f9804993241a46946f1e826f68ec06`.

```text
004C1AD_AUTHORITY = BOUNDED_PUBLIC_SOURCE_AND_ARCHIVE_NOTICE_EVIDENCE_ONLY
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ad-pdfium-component-notice-completeness-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
PACKAGE_INSTALLATION = NOT_AUTHORIZED
PACKAGE_LIFECYCLE_EXECUTION = NOT_AUTHORIZED
PROVIDER_RUNTIME_EXECUTION = NOT_AUTHORIZED
PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
NOTICE_SBOM_PROVENANCE_REPOSITORY_MUTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Exact identities rebound

The immutable EmbedPDF source tag `v2.15.0` resolves to commit `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed`. At that exact tree, `packages/pdfium/pdfium-src` is gitlink `cb29e78f2ba00c9298714d5f4a8bf7765f1e802f` in `embedpdf/pdfium`.

Canonical 004C1AC already binds exact `@embedpdf/pdfium@2.15.0` npm archive bytes and its published `package/dist/pdfium.wasm`, `package/LICENSE`, and `package/LICENSE.pdfium`. This grain reuses those canonical archive identities as predecessor truth and independently re-reads immutable source/build/license metadata; it does not execute or install the archive.

## 3. Source-to-WASM build relationship

At EmbedPDF commit `2cf7df3b...`, `packages/pdfium/scripts/build.sh` sets `SRC=packages/pdfium/pdfium-src`, configures a WASM PDFium build, runs `ninja -C <out> pdfium`, invokes the local Emscripten compilation scripts, and copies the resulting `pdfium.wasm` into `packages/pdfium/src/vendor/`. The same source tree records the exact PDFium gitlink above.

The build arguments explicitly disable Skia, XFA, and V8 and request a complete static PDFium library for `target_os="wasm"` / `target_cpu="wasm"`. These facts narrow the candidate component surface, but they are not a machine-verifiable component-to-license manifest for the exact emitted WASM.

## 4. Published license bundle evidence

Immutable EmbedPDF source contains `packages/pdfium/LICENSE` and `packages/pdfium/LICENSE.pdfium`; the published npm archive contains corresponding wrapper/PDFium license material beside the shipped WASM. `LICENSE.pdfium` starts with the PDFium BSD-style redistribution terms and also includes the Apache License 2.0 text.

No separately named `NOTICE`, component manifest, generated third-party attribution inventory, SPDX SBOM, or build-produced license inventory is present in the exact published `@embedpdf/pdfium@2.15.0` archive established by 004C1AC.

## 5. Exact PDFium source third-party evidence

The exact runtime source commit `cb29e78f2ba00c9298714d5f4a8bf7765f1e802f` contains a non-trivial `third_party/` tree and multiple component-specific license or attribution files. Immutable examples observed include:

- `third_party/NotoSansCJK/LICENSE`;
- `third_party/agg23/copying` and `third_party/agg23/README.pdfium`;
- `third_party/bigint/LICENSE`;
- `third_party/fp16/LICENSE`;
- `third_party/freetype/FTL.TXT` and `third_party/freetype/README.pdfium`;
- `third_party/highway/LICENSE`;
- `third_party/lcms/LICENSE`;
- `third_party/libopenjpeg/LICENSE`;
- `third_party/libtiff/LICENSE.md`;
- multiple additional `README.pdfium` and dependency metadata records.

The source tree therefore proves that PDFium's build/source dependency surface carries component-specific licensing material beyond the top-level PDFium BSD text. The existence of these files does not prove that every listed component is linked into this exact WASM build, and their absence from `LICENSE.pdfium` cannot be dismissed without a build-to-component attribution proof.

## 6. Completeness classification

```text
PDFIUM_ARCHIVE_LICENSE_FILE_BINDING = ESTABLISHED
PDFIUM_WASM_TO_EXACT_SOURCE_GITLINK_RELATIONSHIP = ESTABLISHED_AT_BUILD_INPUT_LEVEL
PDFIUM_SOURCE_THIRD_PARTY_LICENSE_SURFACE = ESTABLISHED_NONTRIVIAL
EXACT_WASM_COMPONENT_INVENTORY = NOT_ESTABLISHED
EXACT_WASM_COMPONENT_TO_LICENSE_MAPPING = NOT_ESTABLISHED
GENERATED_NOTICE_OR_ATTRIBUTION_INVENTORY = NOT_FOUND
PDFIUM_COMPONENT_NOTICE_COMPLETENESS = PARTIAL
DISTRIBUTION_ADOPTION_GATE = FAIL_CLOSED
```

`PARTIAL` is the strongest truthful classification. The published bundle establishes real redistribution text for PDFium and Apache-licensed material, while the exact pinned source exposes additional component-specific licensing inputs. However, current immutable evidence does not map the emitted `pdfium.wasm` to a complete set of linked third-party components and required notices. Therefore completeness is not established.

## 7. Exact missing evidence

Before Signthos may adopt/distribute this PDFium WASM payload, a later explicitly authorized grain must provide one of the following equivalent evidence paths for the exact pinned build:

1. a deterministic build-generated third-party license/NOTICE inventory tied to the exact `cb29e78...` source graph and exact WASM output; or
2. a reproducible component-link inventory plus component-by-component license/notice mapping demonstrating that the redistribution bundle is complete for the emitted WASM.

That evidence must distinguish source-present dependencies from actually linked components, preserve all applicable copyright/attribution texts, and bind its result to exact output bytes. Generic PDFium licensing, wrapper MIT metadata, or the mere presence of `LICENSE.pdfium` is insufficient.

## 8. Governance result

This qualification narrows the blocker but does not clear adoption. No dependency installation, `node_modules`, package lifecycle, provider source, runtime execution, PDF execution, upstream-byte import, repository NOTICE/SBOM mutation, package/lockfile mutation, 004C2, 004D, or Specification 005 authority is created.

```text
004C1AD_RESULT = QUALIFIED_PARTIAL_NOTICE_EVIDENCE
PDFIUM_COMPONENT_NOTICE_COMPLETENESS = PARTIAL
DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
PROVIDER_RUNTIME_AUTHORITY = ABSENT
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
FRESH_SUCCESSOR_RECONCILIATION_REQUIRED_AFTER_CANONICAL_CLOSE = YES
```
