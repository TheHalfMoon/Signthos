# Signthos Competitor Matrix

Status: FOUNDING RESEARCH
Date: 2026-09-02

Legend:

- `Strong` = mature or prominently offered.
- `Partial` = present but limited, gated, or not a first-class product surface.
- `Weak` = materially below the Signthos target.
- `Target` = a founding Signthos requirement, not a claim of current implementation.

| Capability | Documenso | Stirling PDF | DocuSeal | OpenSign | Signthos Target |
|---|---|---|---|---|---|
| Multi-party e-signature | Strong | Weak | Strong | Strong | Strong |
| Templates / reusable sending | Strong | Weak | Strong | Strong | Strong |
| Signing order / recipient roles | Strong | Weak | Strong | Strong | Strong |
| API / webhooks | Strong | Strong for PDF processing | Strong | Strong | Strong |
| Embedded signing | Strong but plan-gated | N/A | Strong but paid | Partial | Open core |
| Embedded authoring | Enterprise-gated | N/A | Paid | Partial | Open core |
| White-label | Enterprise/platform-gated | Partial/gated | Paid | Partial | Open core |
| SSO | Enterprise-oriented | Paid tiers | Paid | Partial | Open core |
| Passkeys / action re-auth | Enterprise package | Partial | Partial | Weak | Strong |
| Bulk send | Partial | Batch PDF tooling, not signing | Strong | Strong | Strong |
| PDF merge/split/reorder | Weak | Strong | Weak | Weak | Strong |
| PDF OCR | Weak | Strong | Weak | Weak | Strong |
| PDF conversion | Weak | Strong | Weak | Weak | Strong |
| PDF redaction/sanitize | Weak | Strong | Weak | Weak | Strong |
| PDF compare/repair/compress | Weak | Strong | Weak | Weak | Strong |
| General PDF editor | Signing-oriented | Strong | Form-oriented | Signing-oriented | Strong |
| Certificate signing | Strong signing foundation | Strong PDF tool | Supported verification/signing concepts | Signing-focused | Strong |
| Independent CLI verifier | Weak | Validation tools but not Signthos-style evidence verifier | Weak | Weak | Strong |
| Desktop application | Weak | Strong | Weak | Weak | First-class |
| iOS application | Weak | Web/mobile-oriented | Mobile web | Mobile web | First-class |
| Android application | Weak | Web/mobile-oriented | Mobile web | Mobile web | First-class |
| No-account local workflow | Weak | Strong | Weak | Weak | Strong |
| Offline document workspace | Weak | Strong desktop/local | Weak | Weak | Strong |
| Camera scan + share sheet | Weak | Emerging scanner workflow | Weak | Weak | Strong |
| Desktop-to-phone QR handoff | Weak | Partial scanner/mobile flow | Weak | Weak | Strong |
| Visual PDF automation | Weak | Strong | Weak | Weak | Strong |
| Signing workflow automation | Strong API | Weak | Strong | Strong | Strong |
| Self-hosting | Strong community edition | Strong, open-core | Strong | Strong | Strong |
| No artificial self-host feature gates | No | No | No | Better, varies | Required |
| Local-first privacy posture | Partial | Strong | Partial | Partial | Required |
| Open provenance manifest | Weak | Weak | Weak | Weak | Required |
| Deterministic evidence bundle | Partial | N/A | Audit trail | Audit certificate | Required |

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
