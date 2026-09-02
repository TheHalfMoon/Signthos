# Signthos Test and Qualification Plan

Status: FOUNDATION PLAN
Date: 2026-09-02

## Objective

Build confidence through layered evidence rather than relying on unit-test counts or one CI status.

Signthos handles untrusted documents, cryptographic signatures, multi-tenant authorization, native apps and external providers. Qualification must match those risks.

## Test layers

### Unit tests

For pure logic and bounded components:

- domain state transitions,
- validation,
- serializers,
- workflow step logic,
- evidence canonicalization,
- error mapping.

### Contract tests

For stable boundaries:

- PDF provider interface,
- signing provider interface,
- storage provider,
- email provider,
- webhook signature contract,
- API/OpenAPI contract,
- SDK compatibility,
- sync/idempotency semantics.

### Integration tests

- PostgreSQL persistence,
- object storage,
- auth/org authorization,
- envelope lifecycle,
- worker/job behavior,
- provider adapters,
- migrations.

### End-to-end tests

Critical user journeys:

- local self-sign/edit/verify,
- prepare/send/recipient sign/completion,
- template reuse,
- webhook delivery,
- self-host deployment smoke,
- mobile/desktop bounded journeys.

### Security tests

- cross-tenant negative cases,
- recipient token scoping,
- SSRF prevention,
- webhook replay/signature validation,
- malformed PDF/resource limits,
- deep-link/QR replay cases,
- authorization regression tests.

### Interoperability tests

- PDF rendering across representative files,
- generated signatures checked by independent verifier(s),
- externally signed PDFs verified by Signthos where supported,
- PAdES level fixtures,
- certificate/trust/revocation edge cases.

### Accessibility/i18n tests

- keyboard flows,
- semantic labels,
- contrast/target/focus checks,
- screen-reader smoke tests,
- RTL layouts,
- Arabic locale qualification,
- timezone/date formatting.

## Fixture corpus

Maintain a versioned non-sensitive corpus.

Categories:

- minimal valid PDFs,
- large/many-page PDFs,
- encrypted PDFs,
- malformed/truncated PDFs,
- annotations/forms,
- embedded fonts/images,
- attachments/metadata,
- existing signatures,
- multiple signatures/incremental updates,
- post-sign modifications,
- redaction test documents,
- OCR scans,
- RTL/Arabic content,
- PDF/A or archival examples when supported.

Fixtures must be synthetic, generated, or legally redistributable.

## Golden outputs

Use golden/snapshot outputs only where determinism is meaningful.

For nondeterministic binary processing, compare semantic properties instead of exact bytes unless the operation guarantees byte determinism.

## PDF provider qualification

A provider capability may be advertised only when the provider passes the capability's contract suite.

Examples:

### Merge

- page order preserved,
- dimensions/rotation retained,
- representative annotations/forms behavior documented,
- malformed inputs fail safely.

### Redaction

A provider may claim safe redaction only when the **exported PDF** passes an independent file-level verification invariant:

- targeted text/content is absent when inspected by a parser/toolchain independent from the redaction implementation where practicable,
- recovery attempts cover object/content streams and other recoverable layers relevant to the claimed scope rather than only the provider's own extraction API,
- rendered appearance is correct but is treated as necessary and insufficient by itself,
- metadata/attachments/annotations/forms scope is documented and tested where included in the claim,
- a fixture proving recovery from a visual-overlay-only redaction fails the safe-redaction qualification,
- if independent verification cannot cover the advertised redaction scope, qualification fails closed and the product reports the verification as unsupported/incomplete rather than safe.

### Signature-preserving operations

- operations either preserve signed byte ranges correctly or explicitly create a new unsigned revision,
- no silent invalidation represented as valid.

## Signing qualification

For each advertised signing profile:

- exact generated fixture,
- expected byte-range behavior,
- certificate chain fixture,
- independent verifier result,
- Signthos verifier result,
- tampered-document negative case,
- unsupported/revocation-unavailable case.

Do not infer standard conformance solely from library claims.

## Verification qualification

Verifier test matrix includes:

- valid trusted signature,
- valid cryptography/untrusted certificate,
- broken signature,
- modified after signing,
- multiple signatures,
- timestamp valid/invalid/unavailable,
- revocation good/revoked/unknown/unavailable,
- unsupported algorithm/profile,
- malformed signature object.

Expected output distinguishes dimensions rather than one ambiguous boolean.

## Authorization matrix

Maintain explicit role/resource test matrix covering:

- owner,
- organization admin/member,
- external recipient,
- API service credential,
- embed session,
- anonymous/public signing link where supported.

Every allow case should have corresponding cross-tenant/role denial cases.

## Migration tests

Every schema/data migration should test:

- forward migration,
- representative existing data,
- constraints/indexes,
- application compatibility,
- signed artifact byte preservation where relevant.

Rollback behavior is documented if technically impossible after destructive migrations.

## Native platform matrix

### Desktop

At minimum release qualification across supported current versions/classes of:

- Windows,
- macOS,
- Linux distribution baseline(s).

Check:

- install/update,
- file open/save,
- secure storage,
- local PDF workflow,
- signing/verification,
- deep links.

### Mobile

- current supported iOS range,
- representative Android API/device range,
- camera/share/deep link,
- secure storage/biometric,
- offline queue,
- signing flow.

## Performance tests

Define budgets per capability rather than one global benchmark.

Measure:

- app startup,
- document open/render,
- page navigation,
- merge/split,
- signing,
- verification,
- API envelope creation,
- worker throughput,
- memory usage on large PDFs.

## Resource/adversarial tests

- oversized file,
- huge page count,
- deeply nested object structures,
- decompression bombs,
- slow/hanging converter,
- webhook endpoint timeout,
- repeated failed auth,
- bulk-send abuse limits.

## CI stages

Proposed progression:

### PR fast gate

- format/lint,
- type checks,
- focused unit/contract tests,
- provenance/license validator,
- docs/link/schema checks.

### Full PR gate

- integration tests,
- security negatives,
- representative PDF corpus,
- build matrix as scope grows.

### Release qualification

- full platform builds,
- end-to-end suites,
- migration tests,
- signing interoperability suite,
- SBOM/security scans,
- release artifact signing verification.

## Exact-head discipline

Merge-critical evidence must be tied to the exact candidate head.

If normative implementation changes after review/test qualification:

- rerun affected tests,
- refresh review as governance requires,
- do not reuse stale PASS evidence from a different SHA.

## Independent review

Substantive independent review is a separate gate from CI.

A bot status saying `success` while the review was skipped is not an independent review PASS.

## Flaky test policy

- do not normalize flakes by blind retry until green,
- classify root cause,
- quarantine only with explicit issue/owner and no false release confidence,
- deterministic fixture/control design preferred.

## Test evidence retention

Release-critical evidence should remain inspectable through GitHub Actions/artifacts/reports or durable repository evidence as appropriate.

Never claim a runtime result that cannot be traced to an execution record.

## v0.1 release qualification minimum

- provenance/license audit PASS,
- unit/contract/integration suites PASS,
- critical end-to-end signing flow PASS,
- PDF P0 capability corpus PASS,
- verifier interoperability suite PASS,
- cross-tenant security tests PASS,
- supported platform build/install smoke PASS,
- migration/backup restore evidence where applicable,
- independent substantive release review,
- no unresolved release blockers.
