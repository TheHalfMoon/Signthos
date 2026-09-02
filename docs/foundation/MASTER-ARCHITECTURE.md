# Signthos Master Architecture

Status: PROPOSED FOUNDATION
Date: 2026-09-02

## 1. Architectural objective

Signthos must support one coherent document lifecycle across web, desktop, mobile, self-hosted server and managed cloud without forcing every platform to run the same implementation technology.

The architecture therefore separates:

1. domain contracts,
2. user experience,
3. execution providers,
4. persistence/sync,
5. signing/evidence,
6. integrations,
7. deployment mode.

The core rule is:

> **One domain model; multiple trusted execution providers.**

## 2. Target repository topology

```text
signthos/
├── apps/
│   ├── web/                 # Browser product
│   ├── desktop/             # Tauri 2 desktop shell
│   ├── mobile/              # Tauri 2 iOS/Android shell + native plugins
│   ├── server/              # Hosted/self-hosted control plane
│   └── docs/                # Product and developer documentation
│
├── packages/
│   ├── domain/              # Canonical TS domain contracts
│   ├── api/                 # REST/OpenAPI implementation
│   ├── sdk-ts/              # TypeScript SDK
│   ├── auth/                # User/session/org auth
│   ├── db/                  # PostgreSQL schema and persistence
│   ├── documents/           # Document aggregate and lifecycle
│   ├── envelopes/           # Signature routing aggregate
│   ├── fields/              # Typed document/signing fields
│   ├── editor/              # Shared document editor UI
│   ├── signing/             # Signing orchestration contracts
│   ├── evidence/            # Audit/evidence bundle contracts
│   ├── workflows/           # Deterministic workflow model
│   ├── providers/           # Provider capability interfaces
│   ├── sync/                # Local/cloud replication protocol
│   ├── webhooks/            # Event delivery
│   ├── ui/                  # Cross-surface design system
│   └── testkit/             # Fixtures, contract tests, golden corpora
│
├── crates/
│   ├── core/                # Native orchestration primitives
│   ├── local-vault/         # Encrypted local metadata/document vault
│   ├── secure-store/        # OS keychain/keystore abstraction
│   ├── pdf-core/            # Safe native PDF capability facade
│   ├── signer/              # Local signing implementation/adapters
│   ├── verifier/            # Independent verification engine
│   ├── workflow-runner/     # Native deterministic pipeline runner
│   └── ffi/                 # Narrow Tauri/mobile bindings
│
├── tools/
│   ├── cli/                 # `signthos` CLI
│   ├── provenance/          # Import/license audit tooling
│   └── fixtures/            # Reproducible document fixtures
│
├── specs/                   # SpecGrain canonical specifications
├── provenance/              # Exact upstream lineage manifests
└── .github/                 # CI, security and release governance
```

This is a target shape. Brownfield import work must not mechanically force Documenso paths to this shape in a single migration.

## 3. Product runtime modes

### 3.1 Local mode

No account and no server are required for supported operations.

Examples:

- open/import PDF,
- reorder/rotate/crop,
- annotate/fill,
- redact,
- merge/split,
- local signature capture,
- local certificate signing when configured,
- verify a signed document,
- export.

Local documents remain on-device unless the user explicitly chooses a networked action.

### 3.2 Connected mode

The native/web client connects to a Signthos server for:

- multi-party routing,
- invitation delivery,
- sync,
- team collaboration,
- remote audit/evidence aggregation,
- managed identity integrations,
- hosted automation.

### 3.3 Self-hosted mode

The organization runs the control plane and selected processing providers on its own infrastructure.

### 3.4 Managed cloud mode

Signthos operates the same public contracts as a managed service. Cloud convenience must not define private, undocumented domain behavior required by the open product.

## 4. Domain model

The canonical domain model should be explicit and versioned.

Primary aggregates:

- `Document`
- `DocumentRevision`
- `Workspace`
- `Envelope`
- `Recipient`
- `Field`
- `Template`
- `SignatureArtifact`
- `EvidenceBundle`
- `Workflow`
- `WorkflowRun`
- `Organization`
- `Identity`
- `Integration`

### Document vs envelope

A `Document` is content plus revision history and metadata.

An `Envelope` is a routing/signing process over one or more immutable document revisions.

This separation prevents signing workflow state from corrupting the editable document model.

### Immutable signing input

Once an envelope enters a signing state, its signing input revision is immutable. Any content change creates a new revision and must invalidate or supersede the prior signing process according to explicit rules.

## 5. PDF capability architecture

Signthos should not hard-code one PDF engine.

Define a versioned capability contract such as:

```ts
interface PdfProvider {
  inspect(input: DocumentInput): Promise<PdfInspection>;
  render(input: DocumentInput, page: number): Promise<RenderedPage>;
  transform(request: PdfTransformRequest): Promise<PdfTransformResult>;
  verify(request: PdfVerifyRequest): Promise<PdfVerifyResult>;
}
```

Capabilities are declared, not inferred:

```text
inspect
render
merge
split
rotate
reorder
crop
annotate
forms
redact
sanitize
compress
repair
ocr
convert
compare
sign
verify
```

### Provider classes

#### Browser provider

For safe operations that can execute entirely in the browser using WASM/JS libraries.

Benefits:

- no upload,
- immediate privacy,
- useful web local-first mode.

#### Native provider

Rust-backed provider for desktop/mobile operations needing filesystem, secure storage, native performance or OS integration.

#### Server provider

Self-hosted/cloud processing for collaboration and workloads that require server execution.

#### Heavy provider

An explicitly optional worker boundary for large native dependencies such as OCR or office-format conversion.

Heavy providers must not silently become mandatory core runtime dependencies.

## 6. Editor architecture

The editor should be shared React UI with platform adapters rather than separate web/desktop/mobile editors.

Recommended frontend direction:

- React 19
- TypeScript
- Vite
- accessible component system
- PDF rendering/editor layer based on independently licensed dependencies selected after provenance review
- deterministic command model for edits

All editor actions should emit typed commands:

```text
AddAnnotation
SetFormValue
RotatePage
DeletePage
MovePage
ApplyRedaction
PlaceSignatureField
PlaceInitialField
```

Commands provide a common basis for undo/redo, automation, collaboration, auditability and tests.

## 7. Desktop and mobile architecture

Use Tauri 2 as the cross-platform shell unless a later evidence-backed specification disproves it.

Target platforms:

- macOS
- Windows
- Linux
- iOS
- Android

Tauri 2 currently supports a shared web frontend with Rust application logic and Swift/Kotlin plugin bindings for deeper mobile integration.

Native adapters should cover:

- filesystem/open-with,
- share sheet,
- camera/scanner,
- secure keychain/keystore,
- biometric authentication,
- notifications,
- background transfer where platform rules permit,
- deep links,
- universal/app links,
- clipboard and drag/drop,
- print/export,
- desktop shell extensions where safe.

## 8. Local vault and sync

### Local vault

Desktop/mobile must use an encrypted local vault for:

- document metadata,
- pending workflow state,
- saved signatures/initials,
- local identities,
- cached evidence,
- sync queue.

Raw document storage should support explicit user-controlled locations where possible rather than trapping all content in opaque application storage.

### Sync principles

- local operation does not require sync,
- sync is explicit and observable,
- conflicts never overwrite silently,
- immutable signed revisions are content-addressed,
- queued network actions are idempotent,
- server acknowledgement is not treated as document integrity proof.

## 9. Signing architecture

Signing must use a transport/provider boundary.

```text
SigningOrchestrator
  ├── LocalKeySigner
  ├── CloudKmsSigner
  ├── OrganizationKeySigner
  └── RemoteTrustProviderSigner
```

The orchestrator owns policy and evidence assembly. Providers own key operations.

Private keys should not cross provider boundaries unnecessarily.

### Signature classes

Signthos should distinguish rather than blur:

- visual signature appearance,
- electronic-signature evidence,
- cryptographic PDF signature,
- advanced/qualified trust-provider signatures.

Marketing claims must follow validated technical/legal capability, never the reverse.

## 10. Evidence architecture

Every completed signing process should be able to produce a versioned `EvidenceBundle` containing supported evidence such as:

- document digest(s),
- revision identifiers,
- envelope identifier,
- signer/recipient identifiers appropriate to policy,
- authentication events,
- timestamps,
- consent/intent events,
- field completion events,
- signature metadata,
- certificate metadata when applicable,
- audit events,
- delivery/completion events,
- software/protocol version,
- canonical serialization and bundle digest.

The evidence schema must be public and versioned.

## 11. Signthos Verify

`Signthos Verify` is a first-class product, not a debugging tool.

Interfaces:

- `signthos verify <document>` CLI,
- desktop verification UI,
- web verification where privacy requirements permit,
- reusable verifier library.

The verifier must not require Signthos Cloud for locally verifiable claims.

A verification result must distinguish:

- cryptographic validity,
- document integrity,
- certificate/trust-chain status,
- evidence-bundle validity,
- evidence completeness,
- unsupported claims,
- unavailable external trust information.

It must fail closed instead of converting uncertainty into `VALID`.

## 12. Workflow architecture

PDF tooling and signing should share one deterministic workflow model.

Example:

```text
Import
 -> OCR
 -> RedactPattern
 -> Compress
 -> PrepareEnvelope
 -> SendForSignature
 -> VerifyCompletion
 -> ExportToStorage
```

A workflow step declares:

- input contract,
- output contract,
- capability requirements,
- provider restrictions,
- side effects,
- retry/idempotency contract,
- evidence output.

Local-only pipelines should be possible without a Signthos server.

## 13. QR handoff protocol

Desktop-to-mobile handoff is a signature Signthos workflow.

The QR code should contain a short-lived handoff descriptor rather than raw document data or long-lived bearer credentials.

Possible flow:

1. Desktop creates one-time handoff session.
2. Mobile scans QR.
3. Both devices perform an authenticated session establishment.
4. Document or signature-capture payload transfers over the permitted channel.
5. Mobile user signs/captures input.
6. Desktop receives the signed artifact/event.
7. Handoff credential is invalidated.

A later security specification must decide transport, encryption, replay protection and whether local peer-to-peer mode is required.

## 14. API architecture

The public API should be contract-first and versioned.

Target surfaces:

- REST/OpenAPI for broad compatibility,
- webhooks for events,
- generated or hand-maintained SDKs,
- idempotency keys for mutations,
- explicit pagination/versioning,
- sandbox/test mode,
- stable error taxonomy.

Internal UI behavior must not depend on undocumented endpoints that external developers cannot model.

## 15. Security boundaries

### Trust boundaries

- untrusted document input,
- PDF parser/renderer,
- heavy converters/OCR workers,
- browser sandbox,
- native shell,
- secure storage,
- signing keys,
- server/database,
- outbound email/SMS,
- third-party identity/trust providers.

### Mandatory posture

- sandbox risky document processing where practical,
- strict file-size/page/resource limits,
- decompression-bomb defenses,
- no implicit remote fetch from document contents,
- content-type validation,
- deterministic sanitization contracts,
- secrets isolated from document processors,
- least-privilege Tauri capabilities,
- signed releases and update metadata,
- SBOM and provenance for shipped artifacts.

## 16. Data architecture

Server persistence should remain PostgreSQL unless a specification demonstrates a stronger reason to change from the Documenso baseline.

Use object storage for large immutable document revisions/evidence artifacts.

Store content hashes independently from storage paths.

Local persistence may use SQLite or another embedded store behind a typed repository contract; the choice must be benchmarked and specified before implementation.

## 17. AI boundary

AI is optional and must not be in the trust path for signing validity.

Potential assistive features:

- field detection,
- document classification,
- OCR enhancement,
- sensitive-data suggestions,
- contract summary,
- workflow drafting,
- recipient/field suggestions.

AI output must be reviewable before it changes signing intent or document content.

Support should be provider-neutral and capable of local execution where feasible.

## 18. Upstream integration strategy

### Documenso

Use controlled brownfield migration:

1. freeze exact upstream snapshot,
2. inventory license class per path,
3. import only authorized paths,
4. preserve history/provenance,
5. add characterization tests,
6. create anti-corruption boundaries,
7. migrate domain areas incrementally.

Do not perform global rename plus architectural rewrite in one change.

### Stirling PDF

Default to capability/reference reuse rather than application-tree merge.

For each desired capability:

1. identify functionality,
2. determine whether implementation is MIT-covered, restricted, or third-party,
3. prefer direct use of independently licensed upstream libraries where practical,
4. independently implement restricted behavior unless explicit rights exist,
5. record provenance.

## 19. Build-vs-reuse rules

Reuse when:

- license/provenance is unambiguous,
- behavior is already mature,
- reuse lowers security risk,
- the component fits the target boundary.

Rebuild when:

- upstream code is commercially restricted,
- architecture would couple Signthos to another product's SaaS assumptions,
- local/mobile requirements materially differ,
- verification/security requires a narrower trusted computing base.

## 20. Architecture success criteria

The architecture is successful when Signthos can eventually prove all of the following without contradictory implementations:

- a local user can edit/sign/verify without an account,
- a self-hosted organization can run signing workflows without proprietary feature unlocks,
- the same document can move from local editing to routed signing without format conversion or hidden state,
- desktop/mobile/web share domain contracts,
- heavy PDF engines are replaceable providers,
- signing keys remain behind explicit provider boundaries,
- evidence is independently verifiable,
- public API behavior matches product domain behavior,
- every imported upstream path has exact provenance and license classification.
