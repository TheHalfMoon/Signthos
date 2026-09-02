# Signthos PDF Engine Strategy

Status: PROPOSED FOUNDATION
Date: 2026-09-02

## 1. Decision

Signthos should **not** choose one PDF library as the universal implementation engine.

The recommended architecture is a small number of deliberately selected engines behind one Signthos capability contract:

1. **EmbedPDF v2 + PDFium** for interactive browser/editor rendering and annotation-oriented UX.
2. **`@libpdf/core`** for TypeScript-native structural PDF manipulation and signing-oriented operations where an exact-version capability is proven.
3. **PDFium through Rust bindings** for native rendering/inspection and selected native edits.
4. **Small Rust structural utilities** such as `lopdf` only for bounded operations where their serialization model is safe for the document state.
5. **Optional isolated heavyweight workers** for OCR, office conversion, specialist repair/compression and archival operations.

Signing and verification remain their own trust boundary and must not depend on a generic editor library silently preserving signature semantics.

## 2. Foundation-pinned browser candidate

The production candidate recorded by Foundation 000 is deliberately pinned rather than pointing at a moving repository branch:

| Component | Foundation candidate | Exact provenance | License evidence | Foundation rule |
|---|---|---|---|---|
| EmbedPDF repository | tag `v2.15.0` | commit `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed` | root/package manifests at this tag report MIT | Candidate only; Spec 004 must revalidate before adoption. |
| `@embedpdf/core` | `2.15.0` | `packages/core/package.json` at the same tag | MIT | Pin the exact package set used by Signthos. |
| `@embedpdf/pdfium` | `2.15.0` | `packages/pdfium/package.json` at the same tag | MIT wrapper/package plus bundled PDFium notices | Preserve package and PDFium notices. |
| EmbedPDF PDFium source/runtime | submodule/fork commit | `embedpdf/pdfium@cb29e78f2ba00c9298714d5f4a8bf7765f1e802f` | `packages/pdfium/LICENSE.pdfium` and upstream third-party notices apply | Treat the WASM/native binary as a separately inventoried distributed component. |

Foundation evidence URLs:

- `https://github.com/embedpdf/embed-pdf-viewer/tree/v2.15.0`
- `https://github.com/embedpdf/embed-pdf-viewer/commit/2cf7df3b594dfe46de2d85e6973ff50ea447a1ed`
- `https://github.com/embedpdf/pdfium/tree/cb29e78f2ba00c9298714d5f4a8bf7765f1e802f`

**Do not substitute EmbedPDF `main`/v3 prerelease code for this candidate without a new dependency review.** Foundation 000 records v2.15.0 because the independent review identified the stable v2 line as the production-safe reference at the review date.

### Fixture baseline required before adoption

Foundation 000 does not fabricate a fixture digest before the corpus exists. Specification 004 must create and pin an exact fixture-corpus revision before claiming the EmbedPDF/PDFium provider is adopted. At minimum the baseline must contain versioned, legally redistributable fixtures for:

- minimal/typical PDFs,
- forms and annotations,
- embedded fonts/images,
- malformed/truncated input,
- encrypted input where supported,
- existing digital signatures and incremental updates,
- redaction recovery tests,
- Arabic/RTL text,
- large/page-heavy resource-limit cases.

The Spec 004 evidence record must bind the exact EmbedPDF package set, exact PDFium runtime commit, fixture-corpus commit/digest and test results together.

## 3. Why one engine is the wrong goal

PDF work spans different workloads:

- interactive rendering,
- text selection/search,
- annotations,
- structural page editing,
- form filling,
- redaction,
- incremental updates,
- cryptographic signatures,
- OCR,
- office conversion,
- repair,
- archival conversion.

An engine excellent at one class may be weak or unsafe for another. Signthos therefore standardizes behavior at the capability contract rather than forcing implementation uniformity.

## 4. Browser/editor recommendation — EmbedPDF v2 + PDFium

Observed v2 candidate strengths include:

- PDFium-backed rendering,
- annotations,
- redaction-oriented functionality,
- search and text selection,
- virtualized scrolling,
- pluggable architecture,
- framework-agnostic core with React support.

Role in Signthos:

- viewer/editor rendering,
- selection/search,
- annotation interactions,
- redaction selection/preview/application only after fixture-level validation,
- thumbnails/navigation,
- print/export UI support.

Signthos must wrap EmbedPDF APIs behind its own editor command/capability contracts so a future engine replacement does not rewrite the domain layer.

## 5. Component-license boundary

A repository-level license label is not enough for a shipped binary. Specification 001 must inventory every included path/package/binary and generate NOTICE/SBOM evidence.

Foundation component matrix:

| Candidate component | Observed license/provenance status | Distribution obligation direction |
|---|---|---|
| EmbedPDF v2.15.0 root/packages used by Signthos | exact tag/commit pinned; relevant package manifests observed as MIT | retain MIT copyright/license notices for distributed source/substantial portions as applicable |
| `@embedpdf/core@2.15.0` | MIT package manifest at pinned tag | retain applicable MIT notice |
| `@embedpdf/pdfium@2.15.0` | MIT package wrapper at pinned tag | retain wrapper notice **and** bundled PDFium/third-party notices |
| EmbedPDF PDFium runtime | `embedpdf/pdfium@cb29e78f...` pinned by the v2.15.0 package submodule | preserve PDFium BSD-style and applicable third-party/Apache notices from the distributed runtime |
| `@libpdf/core` foundation reference | release commit `2144a0a5c4b4ef26373f0f8c30af613c1f17802d` (`v0.4.2` release commit); root `LICENSE.md` is MIT | retain MIT notice; inventory separately licensed bundled/derived components |
| `@libpdf/core/src/fontbox` | Apache-2.0 license file plus embedded third-party/font notices | preserve Apache-2.0 and relevant NOTICE/third-party/font obligations in distributed artifacts |
| EmbedPDF `cloudpdf/server` or other restricted/newer service paths | **not part of the v2.15.0 Foundation candidate**; no authorization inferred from the open packages | fail closed; classify exact path/license separately before any future use |
| Transitive native/WASM binaries | not licensed merely because the JS wrapper is MIT | SBOM + exact binary/source provenance + bundled license/notice review required |

This matrix is architectural evidence, not a substitute for Specification 001's machine-readable license validator.

## 6. TypeScript structural engine — `@libpdf/core`

Documenso snapshot `3ec877a68bc423373220f9ee2fda3d93ba368680` declares `@libpdf/core: ^0.4.2` and uses it across signing and PDF operations. The LibPDF repository's observed `v0.4.2` release commit is `2144a0a5c4b4ef26373f0f8c30af613c1f17802d`.

Observed capabilities across current project/package documentation include:

- parsing/modifying/generating PDFs,
- malformed-document recovery,
- encryption,
- form filling,
- merge/split,
- attachments,
- text extraction,
- incremental saves,
- digital-signature creation.

### Important proof rule

Public documentation and implementation maturity can change. Signthos must not infer verification or a PAdES support level from marketing/package text alone. Specifications 004/005 must pin the exact dependency and independently test every claimed signing/verification capability.

Role in Signthos:

- high-value reuse candidate for server/browser-compatible structural operations,
- candidate incremental-save/signing primitive,
- not the sole verifier of signatures it creates.

References:

- `https://github.com/LibPDF-js/core/commit/2144a0a5c4b4ef26373f0f8c30af613c1f17802d`
- `https://github.com/LibPDF-js/core/blob/2144a0a5c4b4ef26373f0f8c30af613c1f17802d/LICENSE.md`
- `https://github.com/LibPDF-js/core/blob/2144a0a5c4b4ef26373f0f8c30af613c1f17802d/src/fontbox/LICENSE.md`

## 7. Native rendering/inspection — PDFium + Rust bindings

PDFium is a mature C++ PDF engine used by Chromium. A Rust binding such as `pdfium-render` is a candidate native facade, subject to exact-version/license/binary qualification.

Role in Signthos:

- native desktop rendering,
- native inspection/text extraction where validated,
- thumbnail generation,
- page rendering for scanner/compare/redaction verification,
- selected editing operations that map cleanly to the capability contract.

Benefits:

- Rust-facing API without rewriting a PDF renderer,
- rendering-engine family can align browser and native behavior,
- native orchestration can remain within the Tauri/Rust boundary.

Costs/risks:

- shipping/updating native PDFium binaries across macOS/Windows/Linux/iOS/Android,
- platform-specific binary hardening,
- CVE/update cadence,
- ABI/version coordination,
- mobile build/package size,
- third-party license/notice inventory for each binary.

These costs require a focused Tauri/native PDF spike before final adoption. The native provider does **not** automatically reuse the EmbedPDF WASM runtime; each shipped PDFium build is separately pinned and proven.

## 8. Rust structural manipulation — bounded use of `lopdf`

A Rust structural library such as `lopdf` may be useful for pre-sign transformations or tooling, but full-document serialization is dangerous across signature boundaries.

Signthos rule:

> A full-document rewrite must never be used after a signature boundary unless a specification proves that the operation intentionally preserves or supersedes existing signatures.

Candidate uses:

- metadata/inspection utilities,
- pre-sign page transforms,
- bounded low-level repair/manipulation,
- test/fixture tooling.

Non-default uses:

- modifying a previously signed revision,
- signing implementation,
- validation of signatures it helped produce.

Exact crate version/license must be pinned when the capability spec adopts it.

## 9. MuPDF decision

MuPDF is technically capable but is AGPL/commercial dual-licensed. Adding it as a mandatory native dependency would increase licensing complexity, especially for a potentially permissive independent native boundary.

Foundation recommendation:

- do not make MuPDF a default core dependency;
- reconsider only within a bounded provider specification if it uniquely solves a proven requirement and the resulting license/distribution model is explicitly acceptable.

## 10. Heavy-provider strategy

Stirling-class breadth should be implemented through optional workers rather than bloating the core app.

### OCR

`page render/extract -> OCR provider -> structured text/coordinates -> Signthos result contract`

The OCR engine is replaceable and version-recorded.

### Office conversion

- isolated worker/container,
- resource/time limits,
- no access to signing keys,
- deterministic request/result metadata,
- explicit conversion-generated document revision.

### Repair/compression

Use dedicated tools only behind a provider with fixture tests. Repair output is a new revision and must not silently replace a signed revision.

### Archival conversion

PDF/A and related conformance operations require their own validation tooling. Producing a file without validating claimed conformance is insufficient.

## 11. Canonical PDF lifecycle rule

Every operation is classified as one of:

- `READ_ONLY`
- `REVISION_CREATING`
- `SIGNATURE_CREATING`
- `VERIFICATION_ONLY`

| Capability | Class |
|---|---|
| render | READ_ONLY |
| inspect | READ_ONLY |
| text search | READ_ONLY |
| annotate | REVISION_CREATING |
| merge | REVISION_CREATING |
| split | REVISION_CREATING |
| OCR text layer | REVISION_CREATING |
| redaction apply | REVISION_CREATING |
| cryptographic sign | SIGNATURE_CREATING |
| signature verify | VERIFICATION_ONLY |

A `REVISION_CREATING` operation performed on already signed content creates a new unsigned/superseding revision unless the exact signature standard and operation permit an incremental update that preserves prior signature validity and an independent verifier proves that state.

## 12. Redaction proof requirement

A redaction feature cannot be qualified from visual output or the implementing parser alone.

Safe-redaction qualification requires file-level evidence that the targeted content is absent from the exported PDF. The corpus must attempt recovery through **independent parsing/inspection paths** in addition to the implementation path, including where applicable:

- text extraction/copy,
- raw/object inspection,
- image/object extraction,
- annotations/forms/layers,
- metadata/attachments,
- incremental-history artifacts,
- rendered output.

If targeted recoverable content remains through an independent parser/inspection path, the file must not be labeled safely redacted.

## 13. Signing proof requirement

A signer implementation must be verified by an independent verifier implementation/toolchain.

Minimum fixture families should eventually cover:

- unsigned PDF,
- one valid signature,
- multiple incremental signatures,
- modified-after-signing file,
- expired/untrusted certificate,
- malformed signature container,
- timestamped signature,
- long-term validation material where supported,
- encrypted document where supported.

A library's ability to create a signature does not prove that Signthos generated a standards-conformant, externally valid artifact.

## 14. Recommended capability ownership

| Capability family | Default engine direction |
|---|---|
| interactive render/editor | pinned EmbedPDF v2 / PDFium candidate |
| browser structural edits | pinned `@libpdf/core` plus validated editor export path |
| native render/inspect | pinned PDFium build via Rust bindings |
| simple native pre-sign structural edits | capability-specific Rust implementation/library where safe |
| cryptographic signing | dedicated Signthos signer boundary using proven primitives |
| verification | dedicated independent verifier boundary |
| OCR | optional heavy provider |
| office conversion | optional heavy provider |
| advanced repair/compression | optional heavy provider |
| archival/conformance conversion | optional provider + independent validator |

## 15. Specification gates

### Specification 004 must prove

- exact package/crate/binary versions and SPDX/license notices,
- exact EmbedPDF/PDFium runtime provenance if adopted,
- a pinned fixture-corpus revision/digest,
- representative malformed PDF corpus behavior,
- browser/native rendering consistency targets,
- resource limits,
- revision semantics,
- independent redaction recovery tests before claiming safe redaction.

### Specification 005 must prove

- incremental signing semantics,
- cryptographic algorithm policy,
- exact PAdES/support level claims,
- independent verification,
- multi-signature behavior,
- timestamp/LTV behavior only where implemented,
- deterministic evidence binding.

### Specification 007/008 must prove

- exact PDFium binary source/version and packaging/update path on each native target,
- mobile binary size/performance,
- least-privilege native capabilities,
- App Store/Play distribution licensing for the actual shipped dependency graph.

## 16. Foundation conclusion

The best Signthos strategy is not to port Stirling's Java PDF stack and not to rewrite a PDF engine in Rust.

Use mature, exactly pinned and license-inventoried engines behind Signthos contracts; reserve Rust for native orchestration/security/provider boundaries; and prove signing/redaction/verification with independent fixture-based evidence.
