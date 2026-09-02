# Signthos Canonical Roadmap

Status: PROPOSED FOUNDATION
Date: 2026-09-02

This roadmap uses SpecGrain recursive refinement and Diffciplane evidence gates. Specification numbers describe canonical dependency order; they do **not** authorize implementation by themselves.

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
                          -> 008 Mobile + Secure Handoff
                      -> 009 API / SDK / Embed
                  -> 010 Automation + Heavy PDF Providers

011 Self-Hosted Operations + Security
  requires: 003 Signthos Domain Boundary
            009 API / SDK / Embed
            all server/runtime contracts it operationalizes

012 v0.1 Qualification + Release
  requires canonical completion of every release-critical v0.1 branch:
  001, 002, 003, 004, 005, 006, 007, 008 where included in the release scope,
  009, 010 where included in the advertised v0.1 capability set, and 011.

Post-v0.1 candidates:
013 Advanced Identity / Trust Providers
014 Collaboration + Sync Expansion
015 AI-Assisted Document Workflows
016 Managed Cloud
017 Enterprise Operations / Compliance Integrations
```

### Dependency rules

- `004 Local PDF Core` is a prerequisite for PDF-dependent signing, web, desktop and heavyweight-provider work.
- `005 Signing + Evidence Core` consumes the immutable PDF revision/provider semantics established by 004.
- `006` and `007` consume both the Signthos domain boundary and qualified PDF/signing contracts.
- `008` consumes the desktop/mobile/native security and signing contracts needed for handoff.
- `009` depends on stable domain/signing semantics before exposing them as public contracts.
- `010` depends on the PDF capability/revision contract from 004.
- `011` must not operationalize an API/auth model before 003 and 009 establish those contracts.
- `012` is a convergence gate, not a shortcut: it waits for every specification whose behavior is advertised in the candidate v0.1 release.

Parallelism is permitted only when specifications are genuinely dependency-independent and do not share an unsafe change surface or unresolved contract.

---

## Specification 000 — Foundation, research and architecture

Purpose: establish the product thesis, architecture, provenance/licensing boundaries, PDF/signing technology strategy, quality attributes, competitor benchmark and governance system before code import.

Required outputs:

- canonical foundation index,
- founding research and external-source evidence policy,
- product strategy,
- competitor matrix,
- Stirling-to-Signthos capability map,
- master architecture,
- licensing architecture,
- PDF engine strategy,
- signing standards/evidence strategy,
- UX/product experience plan,
- desktop/mobile plan,
- data/sync lifecycle plan,
- API/SDK/embed plan,
- self-host/cloud operations plan,
- automation/integration plan,
- threat model,
- migration/import plan,
- testing/qualification strategy,
- release/distribution plan,
- business/pricing hypothesis,
- community/growth plan,
- brand/product language,
- success metrics,
- capability catalog,
- GitHub-first operating model,
- provenance register,
- constitution,
- canonical roadmap,
- bounded Spec 000 task ledger,
- explicit unresolved rights/distribution gates,
- independent substantive foundation review.

Exit condition: Foundation 000 is independently reviewed, every substantive finding is reconciled, exact-head qualified, merged using expected-head protection where available, and post-merge verified. No upstream application source may be imported before this.

---

## Specification 001 — Provenance and import system

Purpose: make source reuse and component licensing auditable before importing product code.

Scope:

- versioned machine-readable provenance manifest schema,
- validator CLI/CI,
- component/package license registry,
- SPDX expression validation,
- exact-upstream-SHA pinning,
- deterministic NOTICE generation,
- restricted-path deny rules,
- permission-artifact references without publishing confidential evidence,
- explicit permission-scope validation,
- derived-code reclassification guard,
- license-boundary examples/tests,
- mobile distribution review gate,
- source-import workflow documentation.

Acceptance examples:

- an unclassified imported path fails CI,
- a restricted upstream path fails without explicit permission evidence,
- exact upstream commit drift is detectable,
- generated NOTICE output is deterministic,
- a package without declared/allowed license metadata fails validation,
- an AGPL-derived file cannot be relabeled permissive without explicit relicensing evidence,
- ambiguous SPDX shorthand fails closed,
- import metadata identifies source path, destination path, import date and exact transformation class,
- permission scope includes every right required for the intended transformation/distribution.

Specification 001 creates the machinery for later imports; it does not itself authorize any source path whose rights remain blocked.

---

## Specification 002 — Documenso brownfield baseline

Purpose: establish an exact, tested behavioral baseline for the authorized Documenso import surface before Signthos transformations.

Scope must be recursively partitioned by subsystem instead of one giant fork-import PR.

Candidate grains:

- 002A repository/workspace baseline,
- 002B database/domain baseline,
- 002C auth baseline,
- 002D document/envelope baseline,
- 002E editor/signing baseline,
- 002F API/webhook baseline,
- 002G mail/storage/job baseline,
- 002H EE-permission-authorized paths **only** if provenance/rights gates explicitly permit them.

Required technique:

- exact upstream snapshot,
- characterization tests,
- path allowlist,
- provenance manifest per import grain,
- no redesign during import,
- no global rename mixed with behavioral migration,
- no mechanical relicense of derived code.

---

## Specification 003 — Signthos domain and anti-corruption boundary

Purpose: stop the product from remaining a cosmetic fork.

Scope:

- canonical Signthos domain contracts,
- `Document` / `DocumentRevision` / `Envelope` separation,
- content-addressed signable PDF revision semantics,
- event taxonomy,
- provider interfaces,
- stable error model,
- resource/tenant authorization model,
- revision and immutable-signing-input semantics,
- migration adapters around inherited Documenso behavior,
- replacement of product naming/configuration without architectural overreach.

Quality gates:

- authentication is separate from resource authorization,
- tenant scope is enforced server-side,
- mutable document revisions cannot silently mutate signed inputs,
- non-PDF imports become explicit conversion revisions before signing,
- errors have stable machine-readable classes.

Exit condition: new development can target Signthos contracts while imported behavior remains characterized behind adapters.

---

## Specification 004 — Local PDF core

Purpose: create the shared document-workspace foundation using fit-for-purpose engines behind stable Signthos contracts.

Foundation engine direction to validate rather than blindly adopt:

- stable/pinned EmbedPDF + PDFium for interactive render/editor behavior,
- `@libpdf/core` for proven TypeScript structural operations,
- PDFium via Rust bindings for native render/inspection/selected operations,
- bounded Rust structural tooling such as `lopdf` only where revision/signature semantics remain safe,
- isolated heavy providers for OCR/conversion/repair/advanced compression/archival work.

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

Do not implement all capabilities in one unit. Each item or tightly coupled cluster becomes its own grain with corpus tests and resource-limit cases.

Required architectural/proof gates:

- exact dependency versions, upstream commits, binary origins and licenses are pinned/classified,
- fixture baseline is versioned,
- browser and native/server providers implement the same typed capability semantics where both claim support,
- heavyweight dependencies remain optional provider concerns,
- malformed/untrusted PDF fixtures fail safely,
- file/page/object/memory/time limits are explicit,
- operations are classified as read-only vs revision-creating,
- full-document rewrites cannot silently overwrite a signed revision,
- redaction is proven as an independent file-level safety invariant using an independent parser/toolchain and not only visual appearance,
- representative performance baselines exist for supported platforms/corpus classes.

---

## Specification 005 — Signing and evidence core

Prerequisite: Specification 004.

Purpose: establish Signthos signing semantics, standards posture and public evidence/verification contracts on top of qualified immutable PDF revision semantics.

Initial grains:

- visual signature artifacts,
- recipient consent/intent events,
- immutable signing input revision,
- signer provider interface/capability metadata,
- local signer,
- server/KMS signer adapter,
- explicit algorithm policy,
- PAdES B-B baseline implementation target,
- RFC 3161 timestamp adapter before any B-T claim,
- evidence bundle v1,
- audit event canonicalization,
- completion certificate,
- independent verifier library/toolchain,
- `signthos verify` CLI,
- multi-signature incremental-update fixtures.

Potential later grains inside or after Spec 005 when the unit would otherwise become too broad:

- PAdES B-T qualification,
- PAdES B-LT validation material,
- PAdES B-LTA/archive timestamping.

Critical gates:

- a visual signature is not marketed as a cryptographic signature by default,
- cryptographic validity does not imply certificate trust or a regulated trust level,
- generated signatures are tested by an independent verifier/toolchain,
- verifier output separates byte integrity, CMS, certificate trust/status, timestamp, PAdES level, evidence completeness and unsupported/unavailable states,
- weak legacy algorithms may be parsed when necessary but are not automatically allowed for new signatures,
- no AdES/QES or jurisdiction-specific compliance claim is promoted until the complete required evidence/provider/legal mapping is proven.

---

## Specification 006 — Web product convergence

Prerequisites: Specifications 003, 004 and 005 for the workflows exposed by the web product.

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
- explicit network transition UX,
- localization architecture,
- keyboard/accessibility baseline,
- explicit local-only privacy behavior.

Quality gates:

- no silent upload from local-only actions,
- WCAG 2.2 AA is the product target where applicable,
- Arabic is an early RTL qualification locale,
- audit/legal timestamps retain canonical unambiguous machine representations regardless of locale display.

---

## Specification 007 — Desktop local-first

Prerequisites: Specifications 003, 004 and 005.

Purpose: ship macOS, Windows and Linux as first-class applications.

Framework hypothesis: Tauri 2, subject to a focused architecture spike.

Grains:

- shell/bootstrap,
- filesystem open/save,
- drag/drop and OS open-with,
- encrypted local vault,
- secure key storage,
- local PDF/PDFium provider feasibility,
- self-sign workflow,
- offline verification,
- connected account mode,
- deterministic offline action queue,
- safe updater/release signing,
- platform packaging.

Required gates:

- least-privilege Tauri capabilities,
- PDFium/native binary provenance/update path if selected,
- no parser/converter access to signing keys,
- queued network actions are idempotent,
- conflicts do not last-write-win across signing/evidence boundaries,
- signed release/update metadata,
- tested platform/architecture matrix.

Definition of success:

A fresh user can install Signthos Desktop, open a local PDF, perform supported edits, sign/verify and export without account or server.

---

## Specification 008 — Mobile and secure handoff

Prerequisites: Specifications 004, 005 and the applicable native contracts from 007.

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

Security gates:

- QR handoff has a threat model,
- bootstrap pairing credentials are one-time, short-lived and non-replayable,
- pairing is bound to the intended session/device/audience or equivalent authenticated context,
- redemption is atomic,
- confirmation/revocation/expiry semantics are explicit,
- QR data does not expose raw documents or long-lived bearer credentials,
- local-only mobile actions do not silently use remote processors,
- camera/files/network/key-store privileges are least-privilege.

Distribution gates:

- actual shipped dependency and derivation graph has package-level license metadata,
- iOS/App Store and Google Play distribution obligations are reviewed for the exact binary rather than assumed from repository directory structure,
- native PDF engine binary size/performance/update path is qualified on representative devices.

---

## Specification 009 — API, SDK and Embed

Prerequisites: Specification 003 and the stable signing/document contracts it exposes, including applicable 004/005 outputs.

Purpose: make Signthos a developer platform.

Scope:

- public REST/OpenAPI contract,
- webhooks,
- idempotency,
- API compatibility/versioning policy,
- TypeScript SDK,
- Python SDK,
- Go SDK,
- optional Rust client/core interoperability package where justified,
- test/sandbox mode,
- embedded signing,
- embedded authoring,
- stable examples and integration tests.

Security/reliability gates:

- webhook destination SSRF controls,
- webhook signature/replay policy,
- mutation idempotency semantics,
- API keys scoped/rotatable,
- external SDK licenses are explicitly classified and do not silently inherit server copyleft unless derivation requires it.

Open-product rule: API/embed/authoring capability must not exist only as closed-source feature unlocks.

---

## Specification 010 — Automation and heavyweight document providers

Prerequisite: Specification 004 and the domain/workflow contracts from 003.

Purpose: add Stirling-class processing breadth without turning the core into an unbounded runtime.

Scope:

- deterministic workflow schema,
- local workflow runner,
- server worker protocol,
- OCR provider,
- office conversion provider,
- advanced compression provider,
- repair provider,
- archival/conformance provider where justified,
- batch processing,
- capability discovery.

Every external processor must have:

- version pinning,
- license/provenance classification,
- file/page/resource limits,
- sandbox boundary where feasible,
- timeout/cancellation contract,
- no access to signing keys/control-plane secrets,
- deterministic input/output evidence where applicable,
- new-revision semantics for content-changing output.

Producing PDF/A-looking output without independent conformance validation is not sufficient for a conformance claim.

---

## Specification 011 — Self-hosted operations and security

Prerequisites: Specifications 003 and 009, plus every server/runtime contract included in the supported self-hosted product.

Purpose: make production self-hosting credible.

Scope:

- Docker images,
- documented configuration,
- PostgreSQL/object storage,
- email provider adapters,
- OIDC/SAML architecture,
- backups/restores,
- explicit data retention/deletion classes,
- observability without document-content leakage,
- audit administration,
- rate/resource limits,
- invitation/API/SMS abuse controls,
- webhook egress restrictions,
- secrets management,
- SBOM,
- vulnerability/secret scanning,
- native/server dependency provenance,
- signed release artifacts,
- deployment hardening,
- disaster-recovery guidance.

Self-hosting must not require a paid feature license for core software behavior.

Backup/recovery claims must include required key material without violating the intended signing-key isolation model.

---

## Specification 012 — v0.1 qualification and release

Prerequisite: canonical completion of **every release-critical specification whose behavior is included or advertised in v0.1**. At minimum, the core v0.1 convergence path requires 001–007, 009 and 011; 008 and 010 are also mandatory whenever mobile or heavyweight/automation capabilities are part of the v0.1 release claim.

Purpose: prove the first public Signthos release as a coherent product.

Minimum intended v0.1 product story, subject to final release scope:

- self-hostable web signing workflow,
- useful local PDF editing subset,
- desktop local-first self-sign/edit/verify,
- initial mobile signing/scanning path or explicitly scoped beta if included,
- API/webhooks,
- independent verifier,
- complete provenance/license records,
- upgrade/migration documentation,
- security and release evidence.

Release gates:

- exact-head CI/check evidence,
- all release-critical predecessors `CLOSED_CANONICAL`,
- clean licensing/provenance audit,
- no unresolved mobile distribution license gate for released app-store artifacts,
- security checks,
- end-to-end fixture suite,
- PDF/signature conformance evidence for every advertised level,
- platform/browser/mobile compatibility matrix for shipped surfaces,
- accessibility qualification for core workflows,
- RTL/Arabic qualification for the promised locale surface,
- representative performance/resource baselines,
- backup/restore proof for self-hosted production claims,
- independent substantive review,
- no unresolved release-blocking conversations,
- signed artifacts/update metadata,
- post-release verification.

---

# Post-v0.1 candidates

## Specification 013 — Advanced identity and trust providers

Purpose: extend identity/signature assurance without making Signthos itself a private trust silo.

Candidate scope:

- Cloud Signature Consortium CSC API evaluation/adapter,
- remote-signing authorization,
- qualified/advanced certificate/provider metadata,
- trusted-list/status integration,
- organization identity policies,
- external identity-proofing providers,
- advanced/qualified validation evidence,
- jurisdiction-specific claim policy.

No provider capability alone authorizes an AdES/QES marketing claim; the full evidence/policy chain must be qualified.

## Specification 014 — Collaboration and sync expansion

Candidate scope:

- multi-device sync,
- collaboration,
- conflict model,
- tombstones/deletion propagation,
- shared local/cloud workspaces,
- optional end-to-end encryption only after its key-management/server-capability tradeoffs are explicitly specified.

## Specification 015 — AI-assisted document workflows

Candidate scope:

- field detection,
- classification,
- sensitive-data suggestions,
- summary,
- workflow drafting,
- recipient/field suggestions.

AI remains optional, reviewable and outside signing-validity trust decisions.

## Specification 016 — Managed Cloud

Candidate scope:

- hosted multi-tenant operations,
- managed email/SMS/storage,
- support/quotas/billing,
- cloud abuse prevention,
- managed backups/DR,
- operational SLOs.

Cloud convenience must use public/core contracts rather than private closed product behavior.

## Specification 017 — Enterprise operations / compliance integrations

Candidate scope:

- procurement/SLA controls,
- dedicated/air-gapped operations support,
- compliance assistance/evidence export,
- jurisdiction/industry-specific workflows only where separately qualified.

---

# Product-growth tracks after technical foundation

These are not implementation authority for pre-v0.1 work.

## Community

- contributor-friendly `good first issue` grains,
- public design/RFC process,
- reproducible development environment,
- benchmark corpus contributors can extend,
- transparent roadmap and provenance,
- excellent screenshots/demos once real behavior exists.

## Distribution

- GitHub Releases,
- Homebrew,
- Winget,
- Linux packages where maintainable,
- Apple App Store subject to exact distribution/license qualification,
- Google Play subject to exact distribution/license qualification,
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

Pricing remains a hypothesis until validated with reproducible market evidence and operating-cost models.
