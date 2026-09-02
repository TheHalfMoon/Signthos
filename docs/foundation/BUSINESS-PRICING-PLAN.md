# Signthos Business and Pricing Plan

Status: FOUNDATION HYPOTHESIS
Date: 2026-09-02

This document defines the intended business architecture, not final pricing or legal commitments.

## Business principle

Signthos should monetize **managed operation and organizational assurance**, not artificial disabling of core self-hosted software capabilities.

A self-hosting user should not encounter a license check whose only purpose is to unlock core API, SSO, white-label, team, embed or authoring behavior already present in the open product.

## What remains open/self-hostable by product principle

Subject to final component licensing and actual implementation:

- document workspace,
- multi-party signing,
- teams/organizations,
- templates,
- API,
- webhooks,
- SDK-compatible server contracts,
- embedded signing,
- embedded authoring,
- white-label configuration,
- OIDC/SAML capability,
- audit/evidence generation,
- verifier,
- workflow engine,
- local/desktop/mobile clients,
- bulk workflows,
- storage/provider adapters.

This principle does not force Signthos to pay third-party provider costs on behalf of a self-hosting user.

## What Signthos can charge for

### Managed cloud infrastructure

- hosted compute,
- database,
- object storage,
- backups,
- high availability,
- upgrades,
- monitoring,
- operational response.

### Managed communication

- email delivery,
- SMS/phone services,
- deliverability management,
- managed sender/domain operations.

### Managed identity and trust providers

- integrated identity-proofing providers,
- managed KMS/HSM,
- managed timestamp/trust services,
- advanced/qualified signature provider connectivity,
- provider procurement/operations.

### Support and assurance

- support response targets,
- enterprise onboarding,
- migration assistance,
- architecture reviews,
- dedicated deployments,
- contractual SLA,
- security/compliance documentation packages,
- procurement assistance.

### Dedicated infrastructure

- isolated environments,
- private networking,
- dedicated region/cluster,
- managed air-gapped/on-prem support where commercially viable.

## Initial managed-cloud packaging hypothesis

### Free

Target: evaluation and light personal use.

Possible boundaries:

- small monthly envelope/document quota,
- modest storage,
- standard email delivery,
- community support.

No source-code feature disablement should be mirrored into self-hosted software merely to enforce this cloud quota.

### Personal

Hypothesis: approximately `$8–$10/month`.

Target:

- individual professionals,
- higher/unlimited normal personal signing within fair-use/operational limits,
- increased storage,
- managed delivery.

### Team

Hypothesis: approximately `$25–$30/month` for a small included team rather than pure per-seat multiplication.

Target:

- small businesses,
- shared templates,
- team administration,
- API/webhook usage,
- higher quotas.

### Business

Hypothesis: approximately `$79–$99/month` base managed service tier, with usage/provider costs where justified.

Target:

- larger managed quotas,
- advanced organization administration,
- priority support,
- managed identity integrations,
- operational reporting.

### Enterprise

Custom.

Target value:

- SLA,
- dedicated deployment/networking,
- advanced trust-provider integrations,
- procurement/security review,
- migration/support,
- contractual terms.

Enterprise pricing should not be justified by hiding core source capability.

## Usage economics

Third-party marginal-cost features may have usage-based pricing even if the software adapter is open.

Examples:

- SMS,
- identity verification,
- qualified trust services,
- timestamp services,
- high-volume email,
- storage/egress,
- heavyweight managed document processing.

Pricing must distinguish:

```text
Software capability != managed provider consumption
```

## API pricing principle

Do not punish developers for choosing the API over the UI.

The managed service may enforce resource/document quotas, but embedded/API workflows should not be structurally priced as a premium permission gate.

The self-hosted API remains governed by the open component's license rather than cloud subscription status.

## White-label principle

White-labeling is strategically important for developer/platform adoption.

The open self-host product should support configurable product identity within trademark policy. Signthos trademarks may still have usage rules; open source does not imply unrestricted trademark rights.

Managed Cloud may charge for hosted custom domains, managed certificates, dedicated sender reputation or support around custom branding.

## Sustainability model

Revenue should fund:

- core maintainers,
- security work,
- release engineering,
- signing/PDF interoperability testing,
- mobile/desktop maintenance,
- infrastructure,
- documentation/community,
- compliance/trust-provider integrations.

The business should remain attractive even when sophisticated users self-host for free because:

- reliable document infrastructure is operationally demanding,
- delivery/identity/trust integrations have real costs,
- many teams prefer managed upgrades/backups/security,
- support/SLA/procurement carry enterprise value.

## Conversion strategy

The open project is the primary acquisition channel.

Healthy funnel:

```text
Discover GitHub
 -> run locally/self-host
 -> trust product
 -> integrate
 -> choose managed cloud when operational convenience becomes valuable
```

Avoid dark patterns that make self-hosting intentionally painful.

## Community trust rules

- publish clear open-vs-managed boundaries,
- do not silently move previously open core capability behind a license server,
- document trademark vs software-license rights separately,
- publish deprecation/migration policies,
- avoid misleading "open source" claims for restricted modules.

## Pricing research before launch

Before committing final pricing, benchmark:

- completion/document volumes,
- email/storage costs,
- SMS costs,
- identity/trust-provider costs,
- support load,
- competitor pricing,
- self-host-to-cloud conversion behavior,
- willingness to pay by individual/team/platform segments.

## Business metrics

Track separately:

- GitHub/community adoption,
- self-host deployments where observable without invasive telemetry,
- cloud activation,
- paid conversion,
- net revenue retention,
- infrastructure gross margin,
- support burden,
- API/embed adoption,
- churn reasons.

Do not optimize cloud conversion by degrading the open product; optimize by making managed operation excellent.
