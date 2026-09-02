# Signthos Competitor Matrix

Status: FOUNDING RESEARCH
Date: 2026-09-02

Legend:

- `Strong` = mature or prominently offered.
- `Partial` = present but limited, gated, or not a first-class product surface.
- `Weak` = materially below the Signthos target or absent for this product category.
- `Target` = a founding Signthos requirement, not a claim of current implementation.

Every rating cell uses exactly one legend token. Commercial/plan/scope qualifiers are recorded after the matrix.

| Capability | Documenso | Stirling PDF | DocuSeal | OpenSign | Signthos Target |
|---|---|---|---|---|---|
| Multi-party e-signature | Strong | Weak | Strong | Strong | Target |
| Templates / reusable sending | Strong | Weak | Strong | Strong | Target |
| Signing order / recipient roles | Strong | Weak | Strong | Strong | Target |
| API / webhooks | Strong | Strong | Strong | Strong | Target |
| Embedded signing | Partial | Weak | Partial | Partial | Target |
| Embedded authoring | Partial | Weak | Partial | Partial | Target |
| White-label | Partial | Partial | Partial | Partial | Target |
| SSO | Partial | Partial | Partial | Partial | Target |
| Passkeys / action re-auth | Partial | Partial | Partial | Weak | Target |
| Bulk send | Partial | Weak | Strong | Strong | Target |
| PDF merge/split/reorder | Weak | Strong | Weak | Weak | Target |
| PDF OCR | Weak | Strong | Weak | Weak | Target |
| PDF conversion | Weak | Strong | Weak | Weak | Target |
| PDF redaction/sanitize | Weak | Strong | Weak | Weak | Target |
| PDF compare/repair/compress | Weak | Strong | Weak | Weak | Target |
| General PDF editor | Partial | Strong | Partial | Partial | Target |
| Certificate signing | Strong | Strong | Partial | Partial | Target |
| Independent CLI verifier | Weak | Partial | Weak | Weak | Target |
| Desktop application | Weak | Strong | Weak | Weak | Target |
| iOS application | Weak | Partial | Partial | Partial | Target |
| Android application | Weak | Partial | Partial | Partial | Target |
| No-account local workflow | Weak | Strong | Weak | Weak | Target |
| Offline document workspace | Weak | Strong | Weak | Weak | Target |
| Camera scan + share sheet | Weak | Partial | Weak | Weak | Target |
| Desktop-to-phone QR handoff | Weak | Partial | Weak | Weak | Target |
| Visual PDF automation | Weak | Strong | Weak | Weak | Target |
| Signing workflow automation | Strong | Weak | Strong | Strong | Target |
| Self-hosting | Strong | Strong | Strong | Strong | Target |
| No artificial self-host feature gates | Weak | Weak | Weak | Partial | Target |
| Local-first privacy posture | Partial | Strong | Partial | Partial | Target |
| Open provenance manifest | Weak | Weak | Weak | Weak | Target |
| Deterministic evidence bundle | Partial | Weak | Partial | Partial | Target |

## Rating qualifiers

The normalized ratings deliberately separate capability maturity from commercial or product-scope qualifiers.

- **Documenso API/webhooks:** strong signing/workflow developer surface.
- **Stirling API/webhooks:** strong for PDF processing rather than signing orchestration.
- **Documenso embedded signing/authoring/white-label/SSO/action re-auth:** important capabilities are commercial/plan-oriented or present in separately licensed areas, so the rating is `Partial` against the Signthos open-core target.
- **Stirling embedded signing/authoring:** not a primary Stirling product role, therefore `Weak`.
- **Stirling white-label/SSO:** capability exists in an open-core/commercial context, so `Partial`.
- **DocuSeal embed/SSO/white-label and related advanced capabilities:** commercially gated/paid in current product packaging, so `Partial` against the Signthos target.
- **Desktop/iOS/Android:** `Partial` means a mobile-oriented, scanner-oriented, web or limited surface exists but not the complete first-class native Signthos target.
- **Certificate signing:** Documenso/Stirling have strong foundations in their respective signing/PDF domains; DocuSeal/OpenSign are rated `Partial` because the Signthos target includes a broader cryptographic/evidence/verifier contract.
- **Independent CLI verifier:** Stirling provides validation tooling but not the complete Signthos evidence-verifier model, therefore `Partial`.
- **No artificial self-host feature gates:** a `Weak` rating means commercial feature boundaries materially diverge from the Signthos target; `Partial` means the project is closer but still not equivalent to the target policy.
- **Deterministic evidence bundle:** `Partial` covers audit trails/completion certificates that do not yet equal the proposed versioned, canonical Signthos `EvidenceBundle` plus independent verifier contract.

## Strategic interpretation

### What Documenso does best

Documenso is the strongest primary brownfield base for Signthos because its architecture and domain model already cover the hard workflow side of electronic signatures: recipients, fields, templates/envelopes, APIs, embedding, teams, auth, audit and signing.

Signthos should not replace this domain foundation merely to claim a rewrite.

### What Stirling PDF does best

Stirling demonstrates the user demand and product power of a private PDF workstation: edit, convert, OCR, redact, compare, compress, automate and process locally/self-hosted.

Signthos should copy the **capability ambition**, not blindly merge the Stirling application or restricted source trees.

### What DocuSeal contributes to the benchmark

DocuSeal sets a useful bar for form authoring, bulk workflows, conditional logic, payments, identity options and embedding developer experience.

### What OpenSign contributes to the benchmark

OpenSign provides useful patterns around expiration/rejection, guest OTP, document drive/vault concepts, audit certificates and accessible multi-signer workflows.

## Signthos moat

The moat should be the intersection rather than any single checkbox:

1. **Document OS** — one workspace from scan/edit through signing and verification.
2. **Local-first** — meaningful work without account, cloud, or network.
3. **Everywhere** — web, macOS, Windows, Linux, iOS, Android.
4. **Open platform** — self-hosting, API, SDK, embed, SSO and authoring without artificial source feature gates.
5. **Verify, do not trust** — independent evidence verification.
6. **Capability providers** — browser, native, server and heavyweight PDF processing behind stable contracts.
7. **Provenance-first** — exact source lineage is queryable and auditable.

## Anti-goal

Signthos must not compete by accumulating 100 disconnected tools. Every capability must belong to a coherent document lifecycle and reuse the same document model, history, security boundary and automation protocol.
