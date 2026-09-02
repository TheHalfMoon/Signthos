# Signthos Self-Hosted and Managed Cloud Plan

Status: FOUNDATION PLAN
Date: 2026-09-02

## Objective

Provide one coherent server/control-plane architecture that can run as:

- developer-local deployment,
- production self-hosted deployment,
- managed Signthos Cloud,
- dedicated enterprise deployment.

Managed Cloud must not depend on undocumented private product semantics that make the open server a second-class implementation.

## Core server responsibilities

- authentication and organizations,
- authorization/tenant isolation,
- document metadata/revision references,
- envelope/routing state,
- template/workflow state,
- API/webhooks,
- job orchestration,
- email/provider adapters,
- evidence/audit metadata,
- storage coordination,
- sync endpoints,
- admin/operational interfaces.

## Persistence baseline

### PostgreSQL

Retain PostgreSQL as the baseline relational persistence unless a later spec demonstrates a stronger requirement.

Use for:

- identities/orgs/memberships,
- envelope/workflow state,
- document metadata,
- permissions,
- idempotency records,
- webhook/delivery state,
- configuration references.

### Object storage

Use S3-compatible/object storage abstraction for:

- immutable document revisions,
- signed documents,
- evidence bundles,
- exports,
- large processing artifacts where policy permits.

Preserve content digests independently from object keys.

### Queue/jobs

Use an explicit job abstraction for:

- email delivery,
- reminders,
- webhook delivery,
- heavy document processing,
- scheduled workflows,
- retention/purge operations.

The exact queue technology is an implementation decision, not a domain contract.

## Deployment profiles

### Developer

Goal: shortest reliable local setup.

Possible profile:

- app/server,
- PostgreSQL,
- local/S3-compatible object storage,
- development mail sink,
- optional heavy workers disabled by default.

### Standard self-host

Goal: small/medium organization production deployment.

- OCI containers,
- PostgreSQL,
- S3-compatible storage,
- configured email provider,
- optional Redis/queue if architecture requires,
- optional document workers,
- reverse proxy/TLS.

### Scaled self-host

- multiple stateless app replicas,
- dedicated worker pools,
- managed/external PostgreSQL,
- object storage,
- queue,
- centralized observability,
- rate limiting,
- backup/restore automation.

### Managed Cloud

Same public product contracts plus managed:

- provisioning,
- upgrades,
- backups,
- monitoring,
- delivery providers,
- security operations,
- billing/quotas,
- support/SLA.

## Configuration

Configuration must be documented and schema-validated.

Categories:

- public base URLs,
- database/storage,
- auth/session,
- email,
- feature/provider availability,
- queue/workers,
- security/resource limits,
- telemetry/observability,
- retention,
- integrations.

Unknown/deprecated critical configuration should fail visibly rather than be silently ignored.

## Secrets

Secrets include:

- database credentials,
- object-storage credentials,
- email/SMS keys,
- OAuth/OIDC secrets,
- KMS/HSM credentials,
- signing secrets,
- webhook secrets.

Requirements:

- no secrets in source/default images,
- environment/secret-manager integration,
- rotation strategy,
- redaction from logs/errors,
- least-privilege provider credentials.

## Authentication

Core self-host capabilities should include:

- password/email flows where product supports them,
- passkeys/WebAuthn where supported,
- TOTP/action re-auth when required,
- OIDC,
- SAML architecture for organizations if chosen.

Organization SSO should not require closed server code merely to function.

## Authorization and tenancy

Every server-side resource access must be tenant/ownership authorized independently of client UI.

Model categories:

- user-owned local/connected resources,
- organization resources,
- shared documents/envelopes,
- external recipient scoped access,
- embed session scoped access,
- service/API credentials.

Tests must include cross-tenant negative cases.

## Storage provider abstraction

Support at least:

- local filesystem for development/small self-host where appropriate,
- S3-compatible storage.

Additional providers are adapters, not hard-coded domain assumptions.

## Email and communications

Provider abstraction should support standard SMTP and managed APIs where useful.

Requirements:

- template localization,
- sender configuration,
- retries,
- delivery status,
- bounce/failure handling where provider supports,
- abuse/rate controls,
- no secrets in templates/logs.

SMS is optional provider-backed functionality with explicit cost/abuse controls.

## Heavy workers

OCR/office conversion/repair/advanced compression should be separable worker capabilities.

Benefits:

- smaller core image,
- stronger sandboxing,
- independent scaling,
- optional installation,
- dependency/license isolation.

Workers advertise capability/version information to the control plane.

## Observability

Production readiness requires:

- structured logs,
- request/job correlation IDs,
- metrics,
- health/readiness endpoints,
- job queue health,
- delivery/webhook metrics,
- provider latency/errors,
- storage/database health,
- security-relevant audit events.

Do not include document contents or sensitive signature data in observability by default.

## Backup and restore

Documented backup unit includes:

- PostgreSQL,
- object storage,
- configuration/version metadata,
- required encryption/key dependencies.

Required proof:

- automated backup success alone is insufficient,
- restore tests must reconstruct a usable deployment,
- signed document bytes/digests remain intact,
- evidence references remain valid.

## Upgrade and migration

Self-host upgrades need:

- supported upgrade paths,
- database migrations,
- preflight checks,
- backup recommendation/gate,
- rollback limits documented,
- release notes,
- data migration tests.

Do not modify immutable signed revision bytes as part of routine migration.

## Security headers/network

Server specs should cover:

- TLS assumptions,
- secure cookies,
- CSRF where applicable,
- CORS/origin policy,
- CSP for web/embed,
- proxy awareness,
- trusted-host configuration,
- outbound network policy for document processors.

## Rate and resource limits

Configurable limits for:

- request size,
- PDF size/pages,
- recipient counts,
- bulk sends,
- webhook attempts,
- concurrent processing,
- OCR/conversion time,
- storage quotas,
- auth attempts.

Managed Cloud uses quotas commercially; self-host uses them for safety/operations.

## Managed cloud separation

Cloud-specific code may include:

- billing,
- plan quotas,
- Signthos-operated provider credentials,
- internal operations tooling,
- support/SLA automation.

It must not become the only implementation of core document/signing contracts.

## Air-gapped / restricted-network direction

Enterprise support may later include disconnected/restricted deployments.

Architecture prerequisites:

- no mandatory external telemetry,
- local assets/dependencies,
- configurable outbound providers,
- offline verification semantics,
- explicit trust-list/update import process where needed.

## Success criteria

Self-hosting succeeds when an operator can deploy, upgrade, back up, restore and observe Signthos using documented open contracts without depending on an undocumented SaaS control plane.
