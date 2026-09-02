# Signthos External Source Register

Status: FOUNDATION EVIDENCE REGISTER
Date: 2026-09-02

This register makes Foundation 000 external research source-bound and reproducible where possible.

## Evidence classes

- `PINNED_REPOSITORY` — repository, exact commit SHA and relevant path/tag are recorded.
- `PINNED_RELEASE` — immutable release/tag and exact commit are recorded.
- `UNVERIFIED_MUTABLE_SOURCE` — URL and retrieval date are recorded, but no immutable archive/revision/content digest was preserved. This class may inform exploration but cannot satisfy a hard evidence-dependent gate.
- `REFERENCE_ONLY` — contextual external standard/product/documentation reference; successor work must pin the exact applicable version before depending on it.

## Repository and release sources

| ID | Evidence class | Source | Exact revision | Relevant paths / purpose | Observed |
|---|---|---|---|---|---|
| EXT-R001 | PINNED_REPOSITORY | `documenso/documenso` | `3ec877a68bc423373220f9ee2fda3d93ba368680` | repository architecture; `package.json`; `LICENSE`; community/enterprise policy docs; `packages/ee/FEATURES`; signing/PDF references | 2026-09-02 |
| EXT-R002 | PINNED_REPOSITORY | `Stirling-Tools/Stirling-PDF` | `42bdce155c4bc1954a1e3c8ad10a108f2578ad8f` | root/restricted licensing boundaries; frontend/editor architecture; Tauri/PDF capability reference; Gradle/server stack | 2026-09-02 |
| EXT-R003 | PINNED_REPOSITORY | `docusealco/docuseal` | `c216e43d2499614cbf432b13b0fa918c8fd966e6` (`master`) | competitor repository/license/product-reference baseline; captured during Foundation review reconciliation | 2026-09-02 |
| EXT-R004 | PINNED_REPOSITORY | `OpenSignLabs/OpenSign` | `e5f2c5c0a9f65ec01d8a53e4bf3a390c7ade7bcd` (`staging`) | competitor repository/license/product-reference baseline; captured during Foundation review reconciliation | 2026-09-02 |
| EXT-R005 | PINNED_RELEASE | `embedpdf/embed-pdf-viewer` | tag `v2.15.0` -> `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed` | stable Foundation browser/editor candidate; `packages/core`, `packages/pdfium`, license/package metadata | 2026-09-02 |
| EXT-R006 | PINNED_REPOSITORY | `embedpdf/pdfium` | `cb29e78f2ba00c9298714d5f4a8bf7765f1e802f` | PDFium source/runtime pinned by EmbedPDF v2.15.0 `packages/pdfium/pdfium-src` | 2026-09-02 |
| EXT-R007 | PINNED_REPOSITORY | `LibPDF-js/core` | `2144a0a5c4b4ef26373f0f8c30af613c1f17802d` | release commit for v0.4.2; root `LICENSE.md`; `src/fontbox/LICENSE.md`; PDF/signing candidate evidence | 2026-09-02 |
| EXT-R008 | PINNED_REPOSITORY | `tauri-apps/tauri` | `461221feb6d5636da732278eb4cbd483553c3caa` (`dev`) | current framework repository observation only; **not** a dependency-version pin; successor native spec must choose an immutable Tauri release | 2026-09-02 |

### Repository evidence rule

A later change in an upstream default branch does not change the Foundation claim. Re-evaluation must create a new evidence record or explicitly supersede an old one rather than silently moving a SHA.

`EXT-R008` intentionally records only the repository state observed during Foundation reconciliation. It does not authorize building against Tauri `dev`; Specifications 007/008 must pin a released version and its complete dependency/license graph.

## Mutable web sources

| ID | Evidence class | URL | Observation | Use / limitation |
|---|---|---|---|---|
| EXT-W001 | UNVERIFIED_MUTABLE_SOURCE | `https://documenso.com/pricing` | 2026-09-02 | contextual Documenso hosted-pricing observation only; not auditable pricing evidence |
| EXT-W002 | UNVERIFIED_MUTABLE_SOURCE | `https://www.docuseal.com/pricing` | 2026-09-02 | contextual DocuSeal pricing observation only; not auditable pricing evidence |
| EXT-W003 | UNVERIFIED_MUTABLE_SOURCE | `https://docs.stirlingpdf.com/functionality/` | 2026-09-02 | contextual Stirling capability-count/wording observation; source-code architecture claims use EXT-R002 instead |
| EXT-W004 | UNVERIFIED_MUTABLE_SOURCE | `https://documenso.com` and current product/docs pages | 2026-09-02 | product positioning/context only unless a repository path or immutable version is separately recorded |
| EXT-W005 | UNVERIFIED_MUTABLE_SOURCE | `https://v2.tauri.app/` | 2026-09-02 | framework capability/documentation context only; native implementation must pin an immutable release and verify target-platform support |
| EXT-W006 | UNVERIFIED_MUTABLE_SOURCE | `https://www.npmjs.com/package/@libpdf/core` | 2026-09-02 | package-marketing/capability context only; exact implementation claims must use pinned source/package/fixtures |

## Standards and protocol references

The following are architectural references, not yet implementation qualification evidence. Successor specifications must record exact publication/version identifiers and legally usable conformance evidence before advertising support.

| ID | Evidence class | Reference | Foundation use |
|---|---|---|---|
| EXT-S001 | REFERENCE_ONLY | PDF/PAdES standards family | separates visual/electronic/cryptographic signature semantics and guides future PAdES grains |
| EXT-S002 | REFERENCE_ONLY | RFC 3161 timestamp protocol | architecture requirement before a PAdES B-T timestamp claim |
| EXT-S003 | REFERENCE_ONLY | Cloud Signature Consortium API family | post-v0.1 remote-trust-provider candidate only |
| EXT-S004 | REFERENCE_ONLY | WCAG 2.2 | accessibility target; qualification method belongs to product/release specs |
| EXT-S005 | REFERENCE_ONLY | SPDX license-expression specification | Specification 001 validator design reference; exact supported SPDX tooling/version must be pinned in that spec |

## Pricing evidence policy

Foundation 000 deliberately does **not** claim that mutable pricing pages are archived or reproducible. Any pricing, packaging or competitor-cost decision used for launch must run a fresh market/pricing evidence unit that preserves one of:

- immutable vendor revision,
- archived capture with durable reference,
- response/content digest plus captured content where lawful,
- another independently reviewable point-in-time artifact.

Until then, prices recorded in `RESEARCH.md` and `BUSINESS-PRICING.md` remain hypotheses/context rather than hard evidence.

## Permission evidence policy

Private commercial permission artifacts must **not** be published merely to satisfy transparency. The repository should store a non-secret stable reference, scope summary, reviewer identity/evidence and date. The confidential original may remain in an appropriate private legal/records system.

No permission is inferred from this register. Source import remains governed by `provenance/UPSTREAM.md` and Specification 001.
