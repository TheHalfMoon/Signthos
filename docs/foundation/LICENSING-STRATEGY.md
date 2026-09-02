# Signthos Licensing Architecture

Status: PROPOSED / LEGAL-REVIEW REQUIRED
Date: 2026-09-02

This document is an engineering licensing strategy, not legal advice. Final license texts and any relicensing decision require review of the exact upstream notices and the founder's written permissions.

## 1. Why licensing is architecture

Signthos targets all of the following at once:

- a server derived in meaningful part from Documenso community code,
- web clients,
- native desktop applications,
- iOS and Android applications,
- standalone SDKs,
- embeddable components,
- a standalone verifier,
- optional PDF-processing workers,
- selectively reused permissive upstream code.

A single undifferentiated license assumption can unnecessarily constrain mobile/app-store distribution, SDK adoption, embedding, or future commercial permissioning.

## 2. Current upstream constraints

### Documenso community code

Observed root license: GNU Affero General Public License version 3.

Engineering implication:

- a modified network-accessible derivative must comply with AGPL source-availability obligations;
- the exact upstream notices must be inspected before assigning `-only` versus `-or-later` SPDX semantics;
- Signthos must not claim relicensing rights merely from possession of the public AGPL source.

### Documenso Enterprise Edition

Observed `packages/ee/` documentation states that these paths are outside the community AGPL boundary and require separate commercial rights.

Engineering implication:

No EE source import until the preserved permission artifact explicitly grants the rights needed for the intended Signthos treatment, including modification and redistribution/open-source publication if that is the plan.

### Stirling PDF

The root repository uses an open-core layout. Some paths are MIT-covered while multiple paths carry the Stirling PDF User License and prohibit ordinary redistribution/sublicensing.

Engineering implication:

- MIT-covered imports can be considered with notice preservation and provenance;
- restricted paths are reference-only without separate explicit rights;
- where possible, use independently licensed underlying libraries directly instead of inheriting Stirling-specific restricted implementation.

## 3. Apple/iOS distribution risk

Signthos cannot safely assume that an AGPL-derived native iOS application can simply be shipped through the App Store without a dedicated licensing review.

The current Apple Developer Program License Agreement defines copyleft-style software as FOSS and requires developers to comply with all applicable FOSS terms. It also requires the licensing terms governing an application and included FOSS to be consistent with the Program's digital-signing/content-protection requirements.

Therefore, mobile distribution must be a first-class license-boundary decision before shared AGPL-derived web code is embedded into the iOS binary.

This is a **design risk**, not a declaration that AGPL software is categorically prohibited from the App Store.

Primary current source:

- https://developer.apple.com/support/terms/apple-developer-program-license-agreement/

## 4. Recommended repository license architecture

The preferred architecture is **license-by-boundary**, with as few license classes as practical.

### Boundary A — AGPL product/server derivative

Candidate scope:

- server/control plane derived from Documenso community code,
- web product code that is a derivative of imported Documenso AGPL code,
- tightly integrated derived domain/application modules.

Default candidate license:

- the exact AGPL version/option permitted by the imported Documenso source notices, unless Signthos has explicit additional relicensing rights.

Do not write `AGPL-3.0-or-later` merely because the repository root contains the AGPL v3 license text; inspect upstream copyright/license notices first.

### Boundary B — Independently authored portable protocol/core libraries

Candidate scope:

- public domain schemas,
- generated OpenAPI artifacts where legally appropriate,
- independent protocol types,
- standalone verifier core if it does not derive from AGPL code,
- portable crypto/document primitives written independently,
- test vectors intended for ecosystem interoperability.

Preferred candidate license:

- Apache-2.0 OR MIT/Apache-2.0 dual license, subject to dependency compatibility and legal review.

Reason:

These components are intended for maximum independent adoption by other clients, services, auditors and integrators.

### Boundary C — SDKs

Candidate scope:

- TypeScript SDK,
- Python SDK,
- Go SDK,
- Rust SDK/client.

Preferred candidate license:

- Apache-2.0 or MIT.

SDKs should be usable by proprietary and open-source applications without forcing the consuming application into the Signthos server's copyleft license.

### Boundary D — Native mobile clients

Preferred direction:

- keep native mobile application code independently authored against public Signthos protocols/domain schemas where feasible;
- avoid copying Documenso AGPL UI/application implementation into iOS/Android until app-store compatibility and license obligations are explicitly reviewed;
- isolate any copyleft component behind a legally/technically valid boundary rather than relying on naming or directory separation alone.

Candidate license:

- permissive open-source license if the code is genuinely independent and dependencies permit;
- otherwise the applicable copyleft license with an explicit distribution analysis.

### Boundary E — Desktop client

Desktop is less constrained by a single mandatory store channel, but should still preserve the same clean architecture as mobile.

Preferred direction:

- independently authored Tauri/Rust native shell,
- shared permissively licensed protocol/core packages when possible,
- AGPL-derived web/application portions kept clearly classified.

Desktop releases may be distributed directly even if optional store channels introduce additional terms.

### Boundary F — Optional heavy PDF providers

Each provider should retain its own dependency/license manifest and may be packaged separately when dependency obligations or binary size justify it.

The core server/client must discover capabilities rather than assume every provider is installed.

## 5. Important non-solution: directory separation

Putting code in separate directories does **not** by itself make combined or derivative works independently licensable.

License boundaries must follow actual copyright derivation, linking/integration, distribution and applicable license terms.

The repository may use directories to document intended boundaries, but provenance and legal classification remain authoritative.

## 6. Proposed top-level license policy

Before Specification 002 imports Documenso source, Specification 001 should produce:

1. `LICENSES/` containing every license text actually used by Signthos components;
2. machine-readable SPDX identifiers per package/crate/app;
3. `NOTICE` generated from provenance/dependency records;
4. package-level `LICENSE` or manifest metadata where boundaries differ;
5. CI that rejects missing/unknown package license metadata;
6. a policy preventing an AGPL-derived file from being reclassified as permissive without explicit relicensing evidence.

## 7. Recommended initial decision

Subject to review of the founder's Documenso permission artifact, the recommended default is:

- **AGPL-compatible treatment for the imported/derived Documenso server/web product**;
- **permissive licensing for genuinely independently authored SDKs, protocols, verifier libraries, native shells and interoperability tooling** where their dependency/derivation graph permits;
- **no Stirling restricted-source import** without explicit additional rights;
- **no Documenso EE import** until the permission artifact is preserved and classified;
- **no iOS App Store release architecture that embeds AGPL-derived application code** until an explicit distribution/license review closes that risk.

This maximizes openness while preserving ecosystem adoption and native distribution options.

## 8. Specification 001 licensing deliverables

Specification 001 must refine this proposal into executable repository controls:

- component license registry,
- provenance schema,
- permission-artifact metadata without publishing confidential material,
- SPDX validation,
- import classifier,
- restricted-path deny rules,
- deterministic NOTICE generation,
- derived-code reclassification guard,
- mobile distribution review gate,
- examples and tests.

## 9. Unresolved decisions

The following remain explicit gates:

- `L001`: exact rights granted by the founder's Documenso permission artifact;
- `L002`: whether imported Documenso notices permit `AGPL-3.0-or-later` or require an `AGPL-3.0-only` interpretation for affected code;
- `L003`: exact package boundaries that can be permissively licensed because they are independently authored and not derivatives of AGPL code;
- `L004`: iOS/App Store distribution model after review of the exact mobile implementation and then-current Apple terms;
- `L005`: whether Signthos will offer a contributor agreement or inbound=outbound contribution model;
- `L006`: whether Signthos will reserve a separate commercial-license option for contributors who opt in.

None of these unresolved items authorize code import by themselves.
