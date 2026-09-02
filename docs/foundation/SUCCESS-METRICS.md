# Signthos Success Metrics

Status: FOUNDATION PLAN
Date: 2026-09-02

## Objective

Define success using trustworthy product, technical, community and business signals rather than vanity metrics alone.

## Metric principles

- separate adoption from quality,
- separate self-host/open-source health from managed-cloud revenue,
- do not require invasive telemetry to prove open-source value,
- never optimize a metric by weakening security, privacy or the open product.

## North-star product outcome

A user can complete a trustworthy document lifecycle with minimal friction:

`open/import -> prepare/edit -> sign/route -> verify -> export/archive`

Measure successful completion and failure reasons by surface where ethically/operationally observable.

## Product metrics

### Activation

Examples:

- first document opened/imported,
- first local edit/export,
- first self-sign,
- first envelope sent,
- first completed envelope,
- first verification,
- first API call/webhook integration.

### Journey completion

Track completion/failure for critical flows in managed environments and opt-in diagnostics:

- local self-sign,
- prepare/send,
- recipient completion,
- mobile scan/sign,
- desktop QR handoff,
- verify/export.

### Reliability

- envelope completion failure rate,
- job retry/failure rate,
- webhook delivery success,
- email delivery failure,
- document processing failure by capability/provider,
- crash-free native sessions where telemetry is enabled appropriately.

## Local-first metrics

Qualitative/diagnostic goals:

- percentage of P0 document operations capable of running without server,
- local workflow completion success,
- no-network test coverage,
- number of hidden/unintended outbound network dependencies: target zero for declared local operations.

Avoid mandatory analytics merely to count local users.

## Performance metrics

Per supported hardware/environment class:

- app startup,
- first-page render,
- document open latency,
- page navigation responsiveness,
- local transform duration,
- sign/verify duration,
- API latency,
- worker throughput,
- memory use on defined PDF corpus.

Budgets are set per successor spec and hardware class.

## Security metrics

- cross-tenant authorization regression count,
- dependency/security findings by severity and remediation time,
- release SBOM/provenance coverage,
- signed release artifact coverage,
- vulnerability disclosure response time,
- secret exposure incidents,
- malformed/adversarial corpus pass rate.

Security metrics are not a substitute for threat modeling/review.

## Verification quality metrics

- supported signature/profile fixture coverage,
- false-valid rate: target zero in test corpus,
- tamper detection pass rate,
- independent verifier agreement rate for supported scenarios,
- proportion of results correctly classified as unknown/unavailable/unsupported rather than forced into valid/invalid.

## PDF capability quality

For each advertised capability:

- corpus compatibility pass rate,
- data-loss/corruption regressions,
- provider parity where multiple providers exist,
- resource-limit behavior,
- signature-preservation correctness where applicable.

## Developer platform metrics

- API activation,
- SDK downloads/usage signals from public registries,
- webhook delivery reliability,
- time-to-first-successful integration from docs/usability tests,
- API breaking-change frequency,
- public-contract coverage of product capabilities.

## Self-host health

Non-invasive signals:

- Docker/package downloads where available,
- GitHub issues/discussions from operators,
- upgrade success reports,
- deployment documentation success,
- release migration defects,
- backup/restore test quality.

Do not require a self-host deployment to phone home solely for business analytics.

## Community metrics

- unique contributors,
- repeat contributors,
- contributor retention,
- PR review/merge cycle quality,
- number of community-maintained integrations/docs,
- issue response time,
- good-first-issue completion,
- documentation contributions,
- security reports handled responsibly.

### Stars

Track GitHub stars as awareness, not product correctness.

A target such as 10k/50k/100k+ stars can motivate distribution, but it does not override quality gates or justify misleading launch claims.

## Release metrics

- release frequency,
- release-blocking regression count,
- post-release hotfix rate,
- upgrade defect rate,
- artifact/build coverage across supported platforms,
- release evidence completeness.

## Business metrics

For managed Cloud:

- free-to-paid conversion,
- MRR/ARR,
- gross margin after provider/infrastructure costs,
- retention/churn,
- expansion/net revenue retention,
- support cost per customer,
- storage/email/SMS/trust-provider unit economics,
- cloud vs self-host user reasons.

## Business guardrails

Do not improve paid conversion by:

- disabling open self-host core features,
- making exports intentionally difficult,
- hiding API contracts,
- degrading self-host documentation,
- trapping verification behind cloud.

## Trust metrics

Qualitative but important:

- provenance coverage,
- percentage of imported paths classified,
- unresolved license ambiguities,
- number of unsupported compliance claims found in docs/marketing: target zero,
- verification evidence completeness.

## v0.1 success criteria

v0.1 is successful if it proves the product thesis even at modest adoption:

- stable self-host signing workflow,
- useful local PDF workspace,
- desktop local-first completion,
- mobile bounded value,
- API/webhook integration,
- independent verification,
- clean provenance,
- no critical known integrity/security blockers.

## Post-launch review cadence

At each major release, review metrics across four categories:

1. Trust/quality
2. Product adoption
3. Community health
4. Business sustainability

No single category may silently redefine the project's mission.
