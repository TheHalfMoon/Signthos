# Stirling PDF → Signthos Capability Map

Status: FOUNDING RESEARCH
Date: 2026-09-02

Source benchmark: https://docs.stirlingpdf.com/functionality/
Observed Stirling snapshot: `42bdce155c4bc1954a1e3c8ad10a108f2578ad8f`

This file maps Stirling-class PDF functionality into the Signthos architecture. It is a product/capability plan, not authorization to copy Stirling restricted source.

## Priority model

- `P0` — required for the first coherent Signthos document workspace.
- `P1` — important v0.1/v0.x expansion.
- `P2` — advanced or specialist capability.
- `Heavy` — should normally execute through an optional heavyweight provider/worker.
- `Local` — should be available without uploading where the platform/provider supports it.

| Stirling-class capability | Signthos priority | Preferred provider | Product role |
|---|---:|---|---|
| Read/view PDF | P0 | Browser + Native | Core workspace |
| Annotate | P0 | Browser + Native | Core workspace |
| Fill forms | P0 | Browser + Native | Core workspace/signing |
| Merge | P0 | Browser + Native + Server | Document preparation |
| Split | P0 | Browser + Native + Server | Document preparation |
| Rotate pages | P0 | Browser + Native | Document preparation |
| Extract pages | P0 | Browser + Native | Document preparation |
| Reorganize pages | P0 | Browser + Native | Document preparation |
| Remove pages | P0 | Browser + Native | Document preparation |
| Add page numbers | P1 | Browser + Native + Server | Document preparation |
| Add watermark | P1 | Browser + Native + Server | Security/workflow |
| Add stamp | P1 | Browser + Native | Review/workflow |
| Add/extract images | P1 | Browser + Native | Editing |
| Edit metadata | P1 | Browser + Native | Document hygiene |
| Get PDF info | P0 | Browser + Native | Inspection/verifier |
| Handwritten signature appearance | P0 | Browser + Native | Signing UX |
| Certificate signing | P0/P1 | Native + Server signer providers | Cryptographic signing |
| Validate signature | P0 | Browser where feasible + Native + Server | Signthos Verify |
| Password add/remove | P1 | Native + Server | Security |
| Change permissions | P1 | Native + Server | Security |
| Redaction | P0 | Browser preview + Native/Server apply | Privacy |
| Sanitize PDF | P1 | Native + Server | Security |
| Compress | P1 | Native + Server | Optimization |
| Compare PDFs | P1 | Browser UI + Native/Server analysis | Review |
| OCR | P1 | Heavy provider | Searchability/scans |
| Convert Office/images/HTML/etc. to PDF | P1 | Heavy provider | Ingestion |
| Convert PDF to Office/text/images/etc. | P1/P2 | Heavy provider | Export |
| PDF/A conversion | P2 | Heavy provider | Archival/compliance |
| Replace colors | P2 | Browser/Native | Specialist editing |
| Remove annotations | P1 | Browser/Native | Sanitization |
| Overlay PDFs | P2 | Native/Server | Advanced prep |
| Booklet imposition | P2 | Native/Server | Print workflow |
| Multi-page layout | P2 | Native/Server | Print workflow |
| Scale pages | P2 | Native/Server | Print/prep |
| Auto rename | P2 | Local workflow | Automation |
| Inspect embedded JavaScript | P1 | Browser/Native inspection | Security |
| Scanner effect | P2 | Native/Server | Cosmetic workflow |
| Multi-tool workbench | P1 | Workflow engine | Automation UX |
| Pipeline automation | P1 | Local + Server workflow runners | Automation |
| Mobile scanner | P0 mobile | Native mobile | Capture |

## P0 local document workspace

The first PDF experience should not try to reproduce every Stirling operation. P0 establishes the continuous document lifecycle needed by Signthos:

```text
Open / Scan
 -> Inspect
 -> Reorder / Rotate / Remove
 -> Merge / Split
 -> Annotate / Fill
 -> Redact
 -> Prepare signature fields
 -> Sign
 -> Verify
 -> Export
```

P0 is successful only if these operations feel like one document workspace rather than links to independent tools.

## Heavy processing boundary

The following must not become accidental mandatory dependencies of the core desktop/server runtime:

- OCR engines,
- LibreOffice/office conversion,
- advanced compression engines,
- complex repair tooling,
- specialist archival conversion.

The canonical model should expose them through capability discovery:

```json
{
  "provider": "local-heavy",
  "capabilities": ["ocr", "office-to-pdf", "repair"],
  "versions": {
    "ocr": "...",
    "office": "..."
  }
}
```

The UI can then explain that a capability is unavailable instead of failing unpredictably.

## Redaction rule

Redaction is security-sensitive and must distinguish:

1. selecting/previewing a redaction region,
2. permanently applying content removal,
3. verifying that targeted content is no longer recoverable through supported extraction paths.

A black rectangle drawn over visible text is not a valid redaction implementation.

## Signature rule

Stirling's handwritten-sign and certificate-sign concepts belong to two distinct Signthos layers:

- visual/electronic signature appearance and intent,
- cryptographic PDF signing and certificate verification.

Signthos must not conflate them in UI, API or evidence claims.

## Mobile scanner rule

Mobile capture is first-class Signthos functionality, not merely a web helper.

Target flow:

```text
Camera
 -> edge detection/crop
 -> perspective correction
 -> page batch
 -> document workspace
 -> optional OCR
 -> fill/edit
 -> sign or route
```

Desktop QR handoff should be able to launch this capture/signing flow without exposing a long-lived bearer token in the QR payload.

## Workflow rule

Stirling's multi-tool/pipeline concept should become a typed Signthos workflow protocol shared by PDF processing and signing.

Example:

```text
Scan
 -> OCR
 -> Detect sensitive pattern
 -> Human-reviewed redaction
 -> Compress
 -> Prepare envelope
 -> Route for approval/signature
 -> Verify completion
 -> Export
```

A workflow step must declare capability requirements and side effects so that the same workflow can fail clearly when a local/mobile/server provider lacks a requested capability.

## Feature-import rule

For every Stirling capability adopted by Signthos, implementation selection follows this order:

1. define the Signthos behavior/acceptance contract,
2. identify direct independently licensed libraries,
3. inspect whether relevant Stirling implementation paths are MIT-covered or restricted,
4. reuse only clearly permitted source with provenance/notice evidence,
5. otherwise implement the behavior independently,
6. add fixture/corpus tests before claiming parity.

## v0.1 recommendation

Target a smaller, excellent PDF workspace instead of 60 mediocre operations.

Recommended v0.1 capability target:

- viewer + annotation,
- form fill,
- page organization,
- merge/split,
- basic metadata/info,
- safe redaction,
- handwritten/self-sign UX,
- cryptographic sign/verify foundation,
- mobile scan,
- at least one optional OCR provider,
- workflow foundation.

Then expand toward broad Stirling-class parity through bounded capability specs after the core workspace and signing evidence model are stable.
