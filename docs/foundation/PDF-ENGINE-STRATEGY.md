# Signthos PDF Engine Strategy

Status: PROPOSED FOUNDATION
Date: 2026-09-02

## 1. Decision

Signthos should **not** choose one PDF library as the universal implementation engine.

The recommended architecture is a small number of deliberately selected engines behind one Signthos capability contract:

1. **EmbedPDF + PDFium** for interactive browser/editor rendering and annotation-oriented UX.
2. **`@libpdf/core`** for TypeScript-native structural PDF manipulation and signing-oriented operations where its exact-version capability is proven.
3. **PDFium through Rust bindings** for native rendering/inspection and selected native edits.
4. **Small Rust structural utilities** such as `lopdf` only for bounded operations where their serialization model is safe for the document state.
5. **Optional isolated heavyweight workers** for OCR, office conversion, specialist repair/compression and archival operations.

Signing and verification remain their own trust boundary and must not depend on a generic editor library silently preserving signature semantics.

## 2. Why one engine is the wrong goal

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

## 3. Browser/editor recommendation — EmbedPDF + PDFium

Observed EmbedPDF strengths:

- MIT-licensed project,
- PDFium-backed rendering,
- annotations,
- real redaction support,
- search and text selection,
- virtualized scrolling,
- pluggable/tree-shakable architecture,
- framework-agnostic core with React support.

Role in Signthos:

- viewer/editor rendering,
- selection/search,
- annotation interactions,
- redaction selection/preview/application only after fixture-level validation,
- thumbnails/navigation,
- print/export UI support.

Signthos must wrap EmbedPDF APIs behind its own editor command/capability contracts so a future engine replacement does not rewrite the domain layer.

Current reference:

- https://github.com/embedpdf/embed-pdf-viewer

## 4. TypeScript structural engine — `@libpdf/core`

`@libpdf/core` is a current MIT-licensed PDF library developed from Documenso's production needs. It supports parsing/modifying/generating PDFs and is already present in the observed Documenso dependency graph.

Observed capabilities across current project/package documentation include:

- malformed-document recovery,
- encryption,
- form filling,
- merge/split,
- attachments,
- text extraction,
- incremental saves,
- digital-signature creation.

### Important documentation discrepancy

Current public documentation is not perfectly consistent:

- the project README states that signature verification is not yet implemented;
- current npm documentation advertises PAdES B-B/B-T/B-LT/B-LTA signing capability.

Therefore Signthos must not infer verification or PAdES-level support from package marketing alone. Specification 005 must pin an exact version and prove each claimed signature capability with fixtures and independent verification.

Role in Signthos:

- high-value reuse candidate for server/browser-compatible structural operations,
- candidate incremental-save/signing primitive,
- not the sole verifier of signatures it creates.

Current references:

- https://github.com/LibPDF-js/core
- https://www.npmjs.com/package/@libpdf/core

## 5. Native rendering/inspection — PDFium + `pdfium-render`

PDFium is the mature C++ PDF engine used by Chromium and is distributed under a permissive BSD-style license.

`pdfium-render` provides Rust bindings under `MIT OR Apache-2.0` and currently exposes rendering plus document/text/image/editing APIs supported by PDFium.

Role in Signthos:

- native desktop rendering,
- native inspection/text extraction where validated,
- thumbnail generation,
- page rendering for scanner/compare/redaction verification,
- selected editing operations that map cleanly to the capability contract.

Benefits:

- Rust-facing API without rewriting a PDF renderer,
- rendering-engine family can align browser and native behavior,
- permissive licensing fits the proposed native-shell boundary.

Costs/risks:

- shipping and updating native PDFium binaries across macOS/Windows/Linux/iOS/Android,
- platform-specific binary hardening,
- CVE/update cadence,
- ABI/version coordination,
- mobile build/package size.

These costs require a focused Tauri/native PDF spike before final adoption.

References:

- https://pdfium.googlesource.com/pdfium/
- https://github.com/ajrcarey/pdfium-render

## 6. Rust structural manipulation — bounded use of `lopdf`

`lopdf` is a mature MIT-licensed Rust library for PDF document manipulation.

Its current documentation explains that it commonly holds the document as high-level objects and serializes the full document when saving.

That model can be useful for pre-sign transformations but creates an important Signthos rule:

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

Reference:

- https://github.com/J-F-Liu/lopdf

## 7. MuPDF decision

MuPDF is technically capable but is currently AGPL/commercial dual-licensed.

Signthos already has a meaningful AGPL licensing surface inherited from Documenso. Adding MuPDF as a mandatory native dependency would increase licensing complexity, especially for the proposed permissively licensed native/mobile boundary.

Foundation recommendation:

- do not make MuPDF a default core dependency;
- reconsider only within a bounded provider specification if it uniquely solves a proven requirement and the resulting license/distribution model is explicitly acceptable.

Reference:

- https://mupdf.com/releases

## 8. Heavy-provider strategy

Stirling-class breadth should be implemented through optional workers rather than bloating the core app.

Candidate capability families:

### OCR

Preferred architecture:

- page render/extract -> OCR provider -> structured text/coordinates -> Signthos result contract.

The OCR engine is replaceable and version-recorded.

### Office conversion

Preferred architecture:

- isolated worker/container,
- resource/time limits,
- no access to signing keys,
- deterministic request/result metadata,
- explicit conversion-generated document revision.

### Repair/compression

Use dedicated tools only behind a provider with fixture tests. Repair output is a new revision and must not silently replace a signed revision.

### Archival conversion

PDF/A and related conformance operations require their own validation tooling. Producing a file without validating claimed conformance is insufficient.

## 9. Canonical PDF lifecycle rule

Every operation is classified as one of:

- `READ_ONLY`
- `REVISION_CREATING`
- `SIGNATURE_CREATING`
- `VERIFICATION_ONLY`

Examples:

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

A `REVISION_CREATING` operation performed on the content of an already signed revision creates a new unsigned/superseding revision unless the signature standard and exact operation explicitly allow an incremental update that preserves prior signature validity and the verifier proves that state.

## 10. Redaction proof requirement

A redaction feature cannot be qualified from visual output alone.

Required fixture checks should eventually include, where applicable:

- removed text not recoverable by text extraction,
- removed image/object content not recoverable through supported object inspection,
- annotations/forms/metadata reviewed for hidden sensitive content,
- incremental history does not retain the redacted source in an unsafe exported artifact,
- rendered output contains the intended redaction appearance.

The implementation and the verifier should use different evidence paths where practical.

## 11. Signing proof requirement

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

## 12. Recommended capability ownership

| Capability family | Default engine direction |
|---|---|
| interactive render/editor | EmbedPDF / PDFium |
| browser structural edits | `@libpdf/core` plus validated editor export path |
| native render/inspect | PDFium via Rust bindings |
| simple native pre-sign structural edits | capability-specific Rust implementation / `lopdf` where safe |
| cryptographic signing | dedicated Signthos signer boundary using proven primitives |
| verification | dedicated independent verifier boundary |
| OCR | optional heavy provider |
| office conversion | optional heavy provider |
| advanced repair/compression | optional heavy provider |
| archival/conformance conversion | optional provider + independent validator |

## 13. Specification gates

### Specification 004 must prove

- exact library versions and licenses,
- representative malformed PDF corpus behavior,
- browser/native rendering consistency targets,
- resource limits,
- revision semantics,
- redaction behavior before claiming it.

### Specification 005 must prove

- incremental signing semantics,
- cryptographic algorithm policy,
- exact PAdES/support level claims,
- independent verification,
- multi-signature behavior,
- timestamp/LTV behavior only where implemented,
- deterministic evidence binding.

### Specification 007/008 must prove

- PDFium packaging/update path on each native target,
- mobile binary size/performance,
- least-privilege native capabilities,
- App Store/Play distribution licensing for the actual shipped dependency graph.

## 14. Foundation conclusion

The best Signthos strategy is not to port Stirling's Java PDF stack and not to rewrite a PDF engine in Rust.

Use mature permissively licensed engines, wrap them behind Signthos contracts, reserve Rust for native orchestration/security/provider boundaries, and prove signing/redaction/verification with independent fixture-based evidence.
