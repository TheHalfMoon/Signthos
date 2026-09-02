# Signthos Signing Standards Strategy

Status: PROPOSED FOUNDATION
Date: 2026-09-02

This is a technical standards roadmap, not legal advice and not a claim that Signthos currently satisfies any legal signature level.

## 1. Core rule

Signthos must distinguish four layers that products often blur:

1. **signature appearance** — the visual mark rendered on a document;
2. **electronic-signature evidence** — intent, consent, identity/authentication and association with the signed content;
3. **cryptographic PDF signature** — a digital signature embedded in PDF structures;
4. **regulated trust level** — legal/standards classifications such as advanced or qualified electronic signatures that depend on requirements beyond a cryptographic blob.

No UI label, certificate icon or PAdES file format alone proves a regulated legal level.

## 2. PDF standards baseline

The current PDF 2.0 reference baseline is ISO 32000-2:2020, confirmed current by ISO in 2026.

Signthos should track:

- ISO 32000-2:2020 — PDF 2.0;
- ISO/TS 32001:2022 — extensions to hash algorithm support;
- ISO/TS 32002:2022 — extensions to digital signatures in PDF 2.0;
- relevant future amendments only after publication/finality.

Reference:

- https://www.iso.org/standard/75839.html

## 3. PAdES target

The preferred interoperable PDF-signature family is PAdES baseline signatures as defined by ETSI EN 319 142-1 and related ETSI specifications.

The architecture should model support levels explicitly:

- `PAdES-B-B`
- `PAdES-B-T`
- `PAdES-B-LT`
- `PAdES-B-LTA`

These are implementation/evidence targets, not marketing aliases.

Broad intent:

- B-B: baseline signed attributes and cryptographic signature;
- B-T: adds trusted signature timestamp evidence;
- B-LT: carries long-term validation material needed to validate after certificate status information would otherwise disappear;
- B-LTA: adds archival timestamp material for longer-term preservation.

Exact conformance must be taken from the pinned ETSI edition in Specification 005, not from this summary.

Reference:

- ETSI EN 319 142-1: https://www.etsi.org/deliver/etsi_en/319100_319199/31914201/

## 4. CMS and timestamp foundations

PDF digital signatures rely on established cryptographic container/protocol standards.

Signthos should treat the following as foundational references:

- RFC 5652 — Cryptographic Message Syntax (CMS);
- RFC 3161 — Time-Stamp Protocol (TSP);
- RFC 5280 — X.509 certificate/profile and revocation foundations where applicable;
- current updates/algorithm guidance applicable to those standards.

The signature implementation must not invent a proprietary cryptographic envelope when a standard mechanism exists.

References:

- https://www.rfc-editor.org/info/rfc5652
- https://www.rfc-editor.org/rfc/rfc3161

## 5. eIDAS / European trust levels

The consolidated EU eIDAS framework distinguishes ordinary, advanced and qualified electronic signatures.

Current consolidated Article 26 requirements for an advanced electronic signature include being uniquely linked to the signatory, capable of identifying the signatory, created with signature-creation data under the signatory's high-confidence sole control, and linked so later changes to signed data are detectable.

A qualified electronic signature has specific additional trust-service/device/certificate requirements and is given the equivalent legal effect of a handwritten signature under Article 25(2).

Signthos rule:

> Do not claim `AdES`, `QES`, or equivalent merely because the PDF contains a valid certificate signature.

These levels require the complete identity, key-control, certificate/trust-service, validation and applicable policy story.

Primary reference:

- https://eur-lex.europa.eu/eli/reg/2014/910

## 6. Remote signing provider interoperability

Signthos should not build its own qualified trust-service infrastructure as a prerequisite for advanced/qualified remote signing.

Preferred provider boundary:

```text
Signthos Signing Orchestrator
          |
          +-- Local/organization signer
          |
          +-- KMS signer
          |
          +-- CSC remote signer adapter
                  |
                  +-- trust service provider(s)
```

The Cloud Signature Consortium currently publishes CSC API V2.2 for interoperable remote electronic signatures and seals.

Specification 013 should evaluate CSC API V2.2 as the default public adapter contract for external remote trust providers instead of creating a Signthos-only trust-provider API.

Reference:

- https://cloudsignatureconsortium.org/resources/csc-api-v2-2/

## 7. Signer provider contract

A Signthos signer provider must expose capability facts rather than a generic `sign()` boolean.

Conceptual capability data:

```json
{
  "signature_formats": ["PAdES-B-B", "PAdES-B-T"],
  "key_location": "local|kms|remote_qscd|other",
  "certificate_type": "none|x509|qualified|other",
  "timestamp": "none|rfc3161",
  "revocation_material": ["ocsp", "crl"],
  "remote_protocol": "none|CSC-2.2",
  "identity_assurance": "provider-defined"
}
```

These fields are evidence inputs. They are not sufficient by themselves to promote a regulatory claim.

## 8. Verification model

`Signthos Verify` must report orthogonal results instead of one green checkmark.

Conceptual output dimensions:

```text
PDF structure                 VALID / INVALID / UNSUPPORTED
Byte-range integrity          VALID / INVALID
CMS signature                 VALID / INVALID / UNSUPPORTED
Signer certificate            VALID / INVALID / UNTRUSTED / UNKNOWN
Certificate status at signing GOOD / REVOKED / UNKNOWN / UNAVAILABLE
Timestamp                     VALID / INVALID / ABSENT / UNKNOWN
PAdES conformance             B-B / B-T / B-LT / B-LTA / NONCONFORMING / UNKNOWN
Evidence bundle               VALID / INVALID / INCOMPLETE / ABSENT
Identity evidence             PRESENT / INCOMPLETE / NOT_EVALUATED
Regulatory trust claim        PROVEN_BY_PROVIDER_EVIDENCE / NOT_PROVEN / NOT_EVALUATED
```

A cryptographically valid signature with an untrusted certificate must not collapse into a generic `VALID` result.

## 9. Independent verification rule

A Signthos-generated signature must be tested with at least one verifier implementation/toolchain that is independent of the code path that generated it.

For important conformance levels, prefer multiple independent validators where practical.

This requirement applies especially to:

- byte ranges,
- incremental updates,
- CMS encoding,
- timestamp tokens,
- embedded revocation data,
- long-term/archival validation material.

## 10. Signature lifecycle and document revisions

The canonical lifecycle is:

```text
editable revision
      |
      +-- freeze signing input digest
      |
      +-- signature 1 incremental update
      |
      +-- signature 2 incremental update
      |
      +-- timestamp/LTV enrichment if supported
      |
      +-- immutable completed revision
```

Any later content-changing edit creates a new document revision. It must never be presented as though the old signatures directly cover the changed content.

## 11. Evidence beyond the PDF signature

A multi-party electronic-signature product needs evidence that a cryptographic PDF signature alone does not express.

The `EvidenceBundle` should be capable of binding:

- exact source/final document digests,
- envelope and immutable signing revision,
- signer/recipient role,
- consent disclosure version,
- intent/affirmative action,
- authentication method and result,
- field completion sequence,
- timestamps and their sources,
- delivery/access events where policy requires,
- rejection/decline events,
- signature/certificate metadata,
- relevant provider attestations,
- application/protocol version,
- canonical bundle digest.

Privacy policy must control which identifiers, IP/network data and device metadata are collected; "more audit data" is not automatically better evidence.

## 12. Algorithm policy

Specification 005 must maintain an explicit algorithm policy rather than inheriting whatever a PDF library accepts.

The policy must define:

- allowed digest algorithms,
- allowed signature algorithms,
- minimum key strengths,
- deprecated/rejected algorithms,
- certificate-chain validation policy,
- timestamp algorithms,
- crypto provider/version provenance.

Weak legacy algorithms may need to be parsed for verification while remaining forbidden for new signatures.

## 13. Trust stores and validation time

Verification must distinguish:

- current-time validity,
- claimed signing-time validity,
- trusted timestamp time,
- certificate validity interval,
- revocation information availability/freshness,
- configured trust store.

Trust stores are policy inputs. A certificate being mathematically self-consistent does not make its issuer trusted.

## 14. Offline verification

Local-first verification should work offline for all claims whose evidence is embedded or locally configured.

The result must explicitly mark network-dependent information as unavailable when offline, for example current OCSP status or external trusted-list data not cached in the evidence set.

No network fallback may occur silently in local-only mode.

## 15. United States electronic-signature track

Signthos should support evidence requirements needed for common US electronic-signature workflows, but legal-effect marketing must be reviewed separately.

Product design should at minimum preserve explicit evidence for:

- intent to sign,
- consent to electronic records where the workflow requires it,
- association of the signature/evidence with the record,
- ability to retain/reproduce the signed record.

Specification 005/017 should map these product behaviors to applicable federal/state requirements before making jurisdiction-specific compliance claims.

## 16. No proprietary trust lock-in

Signthos Cloud must not be the only authority capable of validating Signthos signatures.

Where external trust providers are required, evidence should identify the provider and standard artifacts/protocols used. The public verifier should remain capable of validating all locally available layers independently.

## 17. Roadmap impact

### Specification 005 — Signing + Evidence Core

Must include:

- PAdES B-B baseline target first,
- RFC 3161 timestamp adapter before B-T claim,
- independent verifier,
- multi-signature incremental-update fixtures,
- algorithm policy,
- evidence bundle v1,
- explicit non-claims for unsupported trust levels.

B-LT/B-LTA may be split into later grains if their validation material and archival requirements make the unit too broad.

### Specification 013 — Advanced Identity / Trust Providers

Must evaluate:

- CSC API V2.2,
- qualified certificate/provider metadata,
- remote signing authorization,
- trusted-list/status integration,
- advanced/qualified validation evidence,
- jurisdiction-specific claim policy.

## 18. Foundation conclusion

Signthos should compete on **transparent evidence and interoperable verification**, not on a vague claim that every drawn signature is a digital signature or that every certificate signature is legally qualified.

The standards stack should be explicit, versioned, testable and replaceable at provider boundaries.
