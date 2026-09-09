# 004C1AD — PDFium Component Notice Completeness Qualification

Status: `QUALIFICATION_CANDIDATE / PUBLIC_SOURCE_AND_ARCHIVE_NOTICE_EVIDENCE_ONLY / ZERO_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `65ba77239d628ae15938e11077139f282d09941d`
Canonical base tree: `4c6238a514f9804993241a46946f1e826f68ec06`
Authority source: `github:issue-comment:5606346552`

## 1. Authority and non-grants

This artifact executes only the bounded public-source/archive notice-evidence authority granted by the post-004C1AC successor reconciliation.

```text
004C1AD_AUTHORITY = BOUNDED_PUBLIC_SOURCE_AND_ARCHIVE_NOTICE_EVIDENCE_ONLY
004C1AD_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ad-pdfium-component-notice-completeness-qualification.md
004C1AD_MAX_CHANGED_REPOSITORY_FILES = 1
PUBLIC_IMMUTABLE_SOURCE_FILE_READ = EXTERNAL_EPHEMERAL_EVIDENCE_ONLY
EXACT_PDFIUM_ARCHIVE_REACQUISITION = EXTERNAL_EPHEMERAL_EVIDENCE_ONLY
PACKAGE_INSTALLATION = NOT_AUTHORIZED
NODE_MODULES_MATERIALIZATION = NOT_AUTHORIZED
PACKAGE_LIFECYCLE_EXECUTION = NOT_AUTHORIZED
PROVIDER_RUNTIME_EXECUTION = NOT_AUTHORIZED
PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
REPOSITORY_ARCHIVE_OR_UPSTREAM_SOURCE_IMPORT = NOT_AUTHORIZED
NOTICE_SBOM_PROVENANCE_REPOSITORY_MUTATION = NOT_AUTHORIZED
PACKAGE_JSON_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Fresh exact npm/archive rebind

A fresh external replay reacquired exact public npm metadata and the metadata-declared tarball for `@embedpdf/pdfium@2.15.0`. Acquired bytes remained outside Signthos and no package code was executed.

```text
NPM_IDENTITY = @embedpdf/pdfium@2.15.0
TARBALL_BYTES = 2665003
TARBALL_SHA256 = fe0cb4677782a58b67f555df9a1257742bcfbf390b9a3e08bd8ad976eea436bb
TARBALL_SHA1 = b073cf9cee2252507c4fc81fb47a156cb2a19662
TARBALL_SRI_SHA512 = sha512-KgpRND2MYcdbhzb2EMb4WzWcJYrR0A6JXvhMv4WthEHKt6qmNo2v/MC68bpYvpveYT9GNnUnY/+TG5MpXY3pRw==
LOCKFILE_SRI_MATCH = PASS
REGISTRY_DIST_INTEGRITY_MATCH = PASS
REGISTRY_DIST_SHASUM_MATCH = PASS
ARCHIVE_MEMBER_COUNT = 18
PUBLISHED_GITHEAD = ABSENT
```

Exact published payload bindings:

| Path | Bytes | SHA-256 |
|---|---:|---|
| `package/package.json` | 2399 | `e699a8b606b5ceae9f0e8a3bc4974aed413e62186e1e3f9cdb8f22d6a9f3b904` |
| `package/LICENSE` | 1075 | `f5031b66adba8ef5ef57666deff980a7f2ccff5c8a8c22a8117e854d2b8dfcd3` |
| `package/LICENSE.pdfium` | 12880 | `b033ffb8fc19c23ca81f7e98019ab658cc6f4cf14587c7c6a2a67fb0f6ac0f5a` |
| `package/dist/pdfium.wasm` | 4633788 | `c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8` |

The only license/notice-named paths in the exact 18-member npm archive are `package/LICENSE` and `package/LICENSE.pdfium`. No separately named `NOTICE`, component manifest, SPDX SBOM, generated third-party attribution inventory, or component-license directory is present.

The fresh external evidence manifest is itself bound as:

```text
004C1AD_EXTERNAL_EVIDENCE_MANIFEST_BYTES = 8378
004C1AD_EXTERNAL_EVIDENCE_MANIFEST_SHA256 = de79263faea7d64a5ec6c2f65e6e88384d04cc706ab4c16bf3e186d93b2d0e34
```

Raw metadata, tarball bytes, source snapshots, and the manifest remain external ephemeral evidence only.

## 3. Immutable source and runtime identities

Fresh immutable-source revalidation establishes:

```text
EMBEDPDF_TAG = refs/tags/v2.15.0
EMBEDPDF_SOURCE_COMMIT = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
PDFIUM_GITLINK_PATH = packages/pdfium/pdfium-src
PDFIUM_GITLINK_COMMIT = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
```

The historical submodule URL points to `embedpdf/pdfium`; the same immutable commit is readable in the current `embedpdf/runtime` repository. Repository relocation does not change the git object identity.

At the exact EmbedPDF source commit, relevant source-file identities include:

| Source path | Bytes | SHA-256 |
|---|---:|---|
| `packages/pdfium/LICENSE` | 1075 | `f5031b66adba8ef5ef57666deff980a7f2ccff5c8a8c22a8117e854d2b8dfcd3` |
| `packages/pdfium/LICENSE.pdfium` | 12880 | `b033ffb8fc19c23ca81f7e98019ab658cc6f4cf14587c7c6a2a67fb0f6ac0f5a` |
| `packages/pdfium/scripts/build.sh` | 3165 | `91f63a02f4cc79aff4ab3f47ee4203ae8b4ed5be1b8448554d55fe678b752a4e` |
| `packages/pdfium/build/compile.sh` | 621 | `7e8ba0a5c50cfe0d859b7cd8613c9e4a0bed4e9508b7907be956e54562fc61fc` |
| `packages/pdfium/build/compile.esm.sh` | 639 | `c7f7551a795ba573ca6e7d229ffbf6f168c9ab4b7c842d6620d1af6fce4795dd` |
| `packages/pdfium/build/patch/BUILD.gn` | 16898 | `7c785a835c626ef22e91b46cc18e1dab4149b5008efd844ac7a08e9faf7ac347` |

The exact source `LICENSE` and `LICENSE.pdfium` bytes equal the corresponding files in the acquired npm archive.

## 4. Static source-to-WASM build relationship

Static inspection of exact build metadata, without executing build/package code, establishes that `packages/pdfium/scripts/build.sh`:

- uses the exact `packages/pdfium/pdfium-src` gitlink as `SRC`;
- runs `gclient sync --no-history --shallow --nohooks --deps=builder` when required dependencies are absent;
- configures a complete static PDFium library;
- runs `ninja -C <out> pdfium`;
- links `libpdfium.a` through Emscripten compilation scripts;
- copies the resulting `pdfium.wasm` into the package vendor surface.

The exact configured build arguments include:

```text
pdf_use_skia=false
pdf_enable_xfa=false
pdf_enable_v8=false
is_component_build=false
pdf_is_complete_lib=true
pdf_use_partition_alloc=false
use_sysroot=false
is_clang=false
target_os="wasm"
target_cpu="wasm"
```

Both Emscripten compilation scripts also request `-sUSE_ZLIB=1`. This is a build-input fact only; this grain does not infer the final linked-object closure from command text.

## 5. `LICENSE.pdfium` provenance and aggregation boundary

`packages/pdfium/LICENSE.pdfium` was introduced in EmbedPDF commit `18f489380ae294c57fb7557a4568d33e03932850` with subject `Create LICENSE.pdfium`. No build or package script in the exact `packages/pdfium` source surface references `LICENSE.pdfium`; the exact README references it as PDFium licensing material.

The source file contains PDFium BSD-style redistribution terms followed by Apache License 2.0 text. It is not byte-identical to the exact runtime-root `LICENSE` at gitlink commit `cb29e78...`:

```text
EMBEDPDF_LICENSE_PDFIUM_BYTES = 12880
EMBEDPDF_LICENSE_PDFIUM_SHA256 = b033ffb8fc19c23ca81f7e98019ab658cc6f4cf14587c7c6a2a67fb0f6ac0f5a
RUNTIME_ROOT_LICENSE_BYTES = 12896
RUNTIME_ROOT_LICENSE_SHA256 = 1fe9dea718fbd75cf149adaf4d8a22a4335604d964ddb76d1b45383dec8668c9
BYTE_EQUAL = FALSE
```

No immutable evidence inspected by this grain identifies `LICENSE.pdfium` as the output of a component inventory, linker map, SBOM generator, or third-party notice aggregation process.

## 6. Production-path third-party evidence

The exact build flags disable XFA, V8, and Skia, which removes several source-present optional surfaces. Static production GN metadata still names multiple third-party dependencies on paths used by the `pdfium` target:

- `core/fxcodec`: LCMS2, OpenJPEG, PNG, zlib, and JPEG;
- `core/fxcrt`: `fast_float`, bundled FreeType, Abseil, and ICU;
- `core/fxge`: PDFium's bundled Anti-Grain Geometry target;
- `fpdfsdk`: PNG and `libjpeg_turbo`.

The default source metadata used by this build selects bundled FreeType, bundled LCMS2, bundled OpenJPEG, bundled PNG/zlib, and `libjpeg_turbo` rather than system variants. This is a statically selected dependency surface, not a final object-level WASM inventory.

Exact local component metadata provides concrete shipped-license evidence for at least:

| Component | Source metadata | License file | License SHA-256 |
|---|---|---|---|
| Anti-Grain Geometry 2.3 | `Shipped: yes`, `License: MIT` | `third_party/agg23/copying` | `0e16f9c2285583269242e94c6f502de0c9910dfcbbc7b386e236cdf29ecd4333` |
| FreeType `VER-2-14-1-38` | `Shipped: yes`, `License: FTL` | `third_party/freetype/FTL.TXT` | `f4b133e25df1f86ad3ffea453aa0e613f0474f34778dbbb3e437e7b2724937d8` |
| Little CMS 2.15 | `Shipped: yes`, `License: MIT` | `third_party/lcms/LICENSE` | `6dbd60437f8ef91d8de1f08ad75882547fd4931bfcc3566a0735f28db1484d31` |
| OpenJPEG 2.5.4 | `Shipped: yes`, `License: BSD-2-Clause` | `third_party/libopenjpeg/LICENSE` | `a6af136f3e15038a666b61f376612a07d9a4e48cb7c01adbf3e33b3f14ab49b6` |

The exact runtime `DEPS` also pins external source identities referenced by production metadata, including:

```text
ABSEIL_REVISION = 675d3d37ecbec78fd51378c6774c45715b1e4382
FAST_FLOAT_REVISION = cb1d42aaa1e14b09e1452cfdef373d051b8c02a4
FREETYPE_REVISION = b91f75bd02db43b06d634591eb286d3eb0ce3b65
ICU_REVISION = a86a32e67b8d1384b33f8fa48c83a6079b86f8cd
LIBJPEG_TURBO_REVISION = 6bb85251a8382b5e07f635a981ac685cc5ab5053
LIBPNG_REVISION = 172f83835c98264e6eefdbe8ae82dc08be337ad0
ZLIB_REVISION = 980253c1cc835c893c57b5cfc10c5b942e10bc46
```

The exact PDFium source tree contains additional third-party license/README material, but source presence alone is not promoted into final-WASM membership.

## 7. Completeness classification

```text
PDFIUM_ARCHIVE_LICENSE_FILE_BINDING = ESTABLISHED
PDFIUM_WASM_ARCHIVE_BYTE_BINDING = ESTABLISHED
PDFIUM_PINNED_BUILD_INPUT_RELATIONSHIP = ESTABLISHED
PDFIUM_SOURCE_THIRD_PARTY_LICENSE_SURFACE = ESTABLISHED_NONTRIVIAL
STATIC_PRODUCTION_THIRD_PARTY_DEPENDENCY_SURFACE = PARTIALLY_ENUMERATED
EXACT_WASM_COMPONENT_INVENTORY = NOT_ESTABLISHED
EXACT_WASM_COMPONENT_TO_LICENSE_MAPPING = NOT_ESTABLISHED
GENERATED_NOTICE_OR_ATTRIBUTION_INVENTORY = NOT_FOUND
SOURCE_TO_ACQUIRED_WASM_REPRODUCIBLE_BUILD_BINDING = NOT_ESTABLISHED
PDFIUM_COMPONENT_NOTICE_COMPLETENESS = PARTIAL
DISTRIBUTION_ADOPTION_GATE = FAIL_CLOSED
```

`PARTIAL` is the strongest truthful classification. Real PDFium and component-specific redistribution evidence exists, but current immutable evidence does not establish a complete mapping from the exact emitted/acquired `pdfium.wasm` bytes to every incorporated third-party component and every required redistribution notice.

## 8. Exact missing evidence

Before Signthos may adopt or distribute the exact PDFium WASM payload, later explicit authority must close all applicable missing evidence, including:

1. an exact final component/link closure for `pdfium.wasm`, not merely the source-present dependency set;
2. component-by-component license/copyright/attribution mapping for that exact closure;
3. treatment of externally fetched `DEPS` and Emscripten-linked components as actually incorporated into the final output;
4. a deterministic NOTICE/license inventory whose completeness is checked against the exact final closure;
5. build attestation or reproducible-build evidence that binds the pinned EmbedPDF/PDFium source inputs to the acquired npm WASM bytes.

A deterministic build-generated notice inventory could satisfy items 1–4 if it exposes sufficient exact evidence. Otherwise a reproducible component-link inventory plus separately verified license mapping is required. Generic PDFium licensing, wrapper MIT metadata, README claims, or the mere presence of `LICENSE.pdfium` is insufficient.

## 9. Governance result

This qualification narrows the blocker but does not clear dependency adoption or distribution.

```text
004C1AD_RESULT = QUALIFIED_PARTIAL_NOTICE_EVIDENCE
PDFIUM_COMPONENT_NOTICE_COMPLETENESS = PARTIAL
DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
PROVIDER_RUNTIME_AUTHORITY = ABSENT
PDF_RUNTIME_AUTHORITY = ABSENT
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
FRESH_SUCCESSOR_RECONCILIATION_REQUIRED_AFTER_CANONICAL_CLOSE = YES
```

## 10. Candidate acceptance gates

This candidate is eligible for merge only if the exact final head proves:

1. the canonical base remains `65ba77239d628ae15938e11077139f282d09941d` / tree `4c6238a514f9804993241a46946f1e826f68ec06`;
2. exactly this one Signthos-authored qualification file changes;
3. fresh npm/archive rebind matches canonical 004C1AC identities;
4. exact immutable source tag/gitlink/build/license metadata is recorded without executing upstream build/package/runtime code;
5. component evidence remains separated from unproven final-WASM membership;
6. `PDFIUM_COMPONENT_NOTICE_COMPLETENESS` remains `PARTIAL` unless stronger real evidence appears;
7. no dependency, archive/source byte, NOTICE/SBOM, package/lockfile, provider/runtime, fixture, workflow, container, database, or Specification 005 surface enters the candidate;
8. exact-head Actions/check/provider state is accounted truthfully;
9. fresh independent substantive exact-head review reports no unresolved material finding;
10. any repair is forward-only and triggers fresh exact-head review;
11. unresolved material review threads are zero immediately before merge;
12. guarded normal merge uses exact expected-head protection;
13. post-merge verification proves SHA/tree/parents/signature/changed surface;
14. fresh Issue #7 successor reconciliation occurs before any installation/runtime authority is inferred.
