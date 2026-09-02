# Signthos Canonical Roadmap

Status: PROPOSED FOUNDATION
Date: 2026-09-02

This roadmap uses SpecGrain recursive refinement and Diffciplane evidence gates. Specification numbers define dependency order; they do not authorize implementation by themselves.

## Dependency spine

```text
000 Foundation
  -> 001 Provenance + Import System
      -> 002 Brownfield Documenso Baseline
          -> 003 Signthos Domain Boundary
              -> 004 Local PDF Core
              -> 005 Signing + Evidence Core
                  -> 006 Web Product Convergence
                  -> 007 Desktop Local-First
                      -> 008 Mobile + Handoff
                  -> 009 API / SDK / Embed
              -> 010 Automation + Heavy PDF Providers
          -> 011 Self-Hosted Operations + Security
              -> 012 v0.1 Qualification + Release

Post-v0.1 candidates:
013 Advanced Identity / Trust Providers
014 Collaboration + Sync Expansion
015 AI-Assisted Document Workflows
016 Managed Cloud
017 Enterprise Operations / Compliance Integrations
```

Parallelism is permitted only when specifications are dependency-independent and do not share an unsafe change surface.

---

## Specification 000 — Foundation, research and architecture

Purpose: establish the product thesis, architecture, provenance boundaries, competitor benchmark and governance system before code import.

Required outputs:

- founding research,
- competitor matrix,
- master architecture,
- provenance register,
- constitution,
- canonical roadmap,
- bounded Spec 000 task ledger,
- license decision record or explicit unresolved gate,
- independent substantive foundation review.

Exit condition: Foundation 000 is merged and post-merge verified. No upstream application source may be imported before this.

---

## Specification 001 — Provenance and import system

Purpose: make source reuse auditable before importing product code.

Scope:

- machine-readable provenance manifest schema,
- validator CLI/CI,
- license-class registry,
- exact-upstream-SHA pinning,
- notice generation,
- restricted-path deny rules,
- permission-artifact references,
- source-import workflow documentation.

Acceptance examples:

- an unclassified imported path fails CI,
- a restricted upstream path fails without explicit permission evidence,
- exact upstream commit drift is detectable,
- generated NOTICE output is deterministic.

---

## Specification 002 — Documenso brownfield baseline

Purpose: establish an exact, tested behavioral baseline for the authorized Documenso import surface before Signthos transformations.

Scope should be recursively partitioned by subsystem instead of one giant fork-import PR.

Candidate grains:

- 002A repository/workspace baseline,
- 002B database/domain baseline,
- 002C auth baseline,
- 002D document/envelope baseline,
- 002E editor/signing baseline,
- 002F API/webhook baseline,
- 002G mail/storage/job baseline,
- 002H EE-permission-authorized paths if and only if provenance gate permits.

Required technique:

- exact upstream snapshot,
- characterization tests,
- path allowlist,
- no redesign during import.

---

## Specification 003 — Signthos domain and anti-corruption boundary

Purpose: stop the product from remaining a cosmetic fork.

Scope:

- canonical Signthos domain contracts,
- `Document` / `DocumentRevision` / `Envelope` separation,
- event taxonomy,
- provider interfaces,
- stable error model,
- migration adapters around inherited Documenso behavior,
- replacement of product naming/configuration without architectural overreach.

Exit condition: new development can target Signthos contracts while imported behavior remains characterized behind adapters.

---

## Specification 004 — Local PDF core

Purpose: create the shared document-workspace foundation.

Initial capability order:

1. inspect/render,
2. page reorder/rotate/remove/extract,
3. merge/split,
4. annotations/text/image placement,
5. form fill,
6. watermark/stamp/page numbering,
7. metadata/attachments,
8. redaction/sanitize,
9. compare,
10. compression/repair,
11. OCR/conversion through optional providers.

Do not implement all capabilities in one specification. Each item or tightly coupled cluster becomes its own grain with corpus tests and resource-limit cases.

Required architectural proof:

- browser provider and native/server providers can implement the same typed capability contract,
- heavyweight dependencies are optional provider concerns,
- malformed/untrusted PDF fixtures fail safely.

---

## Specification 005 — Signing and evidence core

Purpose: establish Signthos signing semantics and public evidence contracts.

Grains:

- visual signature artifacts,
- recipient consent/intent events,
- immutable signing input revision,
- signer provider interface,
- local signer,
- server/KMS signer adapter,
- evidence bundle v1,
- audit event canonicalization,
- completion certificate,
- verifier library,
- `signthos verify` CLI.

Critical gate: no compliance-level claim may be promoted until the corresponding evidence and verification specification proves it.

---

## Specification 006 — Web product convergence

Purpose: produce a coherent Signthos browser product rather than separate PDF and signing applications.

Key user journey:

`Import -> Edit -> Prepare -> Send/Sign -> Verify -> Export/Archive`

Scope:

- unified workspace shell,
- document history/revisions,
- PDF editor integration,
- signing preparation mode,
- envelope management,
- local browser operations where supported,
- explicit network transition UX.

---

## Specification 007 — Desktop local-first

Purpose: ship macOS, Windows and Linux as first-class applications.

Framework hypothesis: Tauri 2, subject to a focused architecture spike.

Grains:

- shell/bootstrap,
- filesystem open/save,
- drag/drop and OS open-with,
- encrypted local vault,
- secure key storage,
- local PDF provider,
- self-sign workflow,
- offline verification,
- connected account mode,
- safe updater/release signing,
- platform packaging.

Definition of success:

A fresh user can install Signthos Desktop, open a local PDF, perform supported edits, sign/verify and export without account or server.

---

## Specification 008 — Mobile and secure handoff

Purpose: make iOS and Android genuine document products.

Grains:

- Tauri mobile feasibility and shell,
- file/share-sheet import,
- camera scan,
- touch/stylus signature capture,
- secure keystore/biometric unlock,
- offline local queue,
- deep/app links,
- push notification adapter,
- desktop-to-mobile QR handoff protocol,
- tablet/in-person signing mode.

Security gate: QR handoff requires explicit threat model, replay protection, expiration and credential invalidation evidence.

---

## Specification 009 — API, SDK and Embed

Purpose: make Signthos a developer platform.

Scope:

- public REST/OpenAPI contract,
- webhooks,
- idempotency,
- TypeScript SDK,
- Python SDK,
- Go SDK,
- test/sandbox mode,
- embedded signing,
- embedded authoring,
- stable examples and integration tests.

Open-product rule: API/embed/authoring capability must not exist only as closed-source feature unlocks.

---

## Specification 010 — Automation and heavyweight document providers

Purpose: add Stirling-class processing breadth without turning the core into an unbounded runtime.

Scope:

- deterministic workflow schema,
- local workflow runner,
- server worker protocol,
- OCR provider,
- office conversion provider,
- advanced compression provider,
- repair provider,
- batch processing,
- capability discovery.

Every external processor must have:

- version pinning,
- resource limits,
- sandbox boundary where feasible,
- timeout/cancellation contract,
- deterministic input/output evidence where applicable.

---

## Specification 011 — Self-hosted operations and security

Purpose: make production self-hosting credible.

Scope:

- Docker images,
- documented configuration,
- PostgreSQL/object storage,
- email provider adapters,
- OIDC/SAML architecture,
- backups/restores,
- observability,
- audit administration,
- rate/resource limits,
- secrets management,
- SBOM,
- vulnerability scanning,
- signed release artifacts,
- deployment hardening.

Self-hosting must not require a paid feature license for core software behavior.

---

## Specification 012 — v0.1 qualification and release

Purpose: prove the first public Signthos release as a coherent product.

Minimum v0.1 product story:

- self-hostable web signing workflow,
- useful local PDF editing subset,
- desktop local-first self-sign/edit/verify,
- initial mobile signing/scanning path or explicitly scoped beta,
- API/webhooks,
- independent verifier,
- complete provenance records,
- upgrade/migration documentation,
- security and release evidence.

Release gates:

- exact-head CI,
- clean licensing/provenance audit,
- security checks,
- end-to-end fixture suite,
- platform build matrix,
- independent substantive review,
- no unresolved release-blocking conversations,
- signed artifacts,
- post-release verification.

---

# Product-growth tracks after technical foundation

These are not implementation authority for pre-v0.1 work.

## Community

- contributor-friendly `good first issue` grains,
- public design/RFC process,
- reproducible development environment,
- benchmark corpus that contributors can extend,
- transparent roadmap and provenance,
- excellent screenshots/demos once real behavior exists.

## Distribution

- GitHub Releases,
- Homebrew,
- Winget,
- Linux packages where maintainable,
- Apple App Store,
- Google Play,
- Docker/OCI images,
- one-command self-host path.

## Developer ecosystem

- SDK examples,
- framework components,
- MCP/agent integrations only after the stable API exists,
- workflow templates,
- integration marketplace based on public contracts.

## Business model

Commercial value should come from managed operation rather than closed core capability:

- hosted cloud,
- managed email/SMS,
- managed trust/identity providers,
- storage/backup,
- support,
- SLA,
- compliance assistance,
- enterprise procurement,
- dedicated/air-gapped operations support.
