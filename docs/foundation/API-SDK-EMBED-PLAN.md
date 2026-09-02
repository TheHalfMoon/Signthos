# Signthos API, SDK, and Embed Plan

Status: FOUNDATION PLAN
Date: 2026-09-02

## Objective

Make Signthos a developer platform whose public contracts are first-class product interfaces rather than secondary wrappers around private UI endpoints.

## API principles

- contract-first,
- versioned,
- idempotent mutations,
- explicit errors,
- stable resource identifiers,
- tenant-aware authorization,
- webhook-first event delivery,
- sandbox/test mode,
- self-host and managed-cloud parity for core contracts.

## Primary API resources

Candidate public resource model:

- documents,
- document revisions,
- envelopes,
- recipients,
- fields,
- templates,
- signing links/sessions,
- evidence bundles,
- verification reports,
- workflows,
- workflow runs,
- organizations/members,
- webhooks,
- storage/provider configuration where safe.

## REST/OpenAPI

REST/OpenAPI is the default broad-compatibility public interface.

Requirements:

- generated OpenAPI artifact checked in/reproducible,
- explicit version strategy,
- pagination contract,
- filtering/sorting semantics,
- request/response size limits,
- idempotency key behavior,
- retry guidance,
- rate-limit response semantics,
- stable error taxonomy.

Internal tRPC or framework-specific APIs may exist during brownfield migration but may not become the only specification of external behavior.

## Authentication

Developer auth models may include:

- user/session auth,
- scoped API keys,
- OAuth/OIDC application authorization where justified,
- short-lived embed/session tokens,
- service credentials.

Requirements:

- scopes/permissions,
- tenant binding,
- key rotation/revocation,
- last-used metadata where safe,
- no plaintext credential recovery after creation,
- audit events for credential lifecycle.

## Idempotency

High-risk mutations require idempotency semantics, especially:

- create/send envelope,
- resend invitation,
- run workflow,
- create signing session,
- external delivery/provider invocation.

The contract must define retention window and conflict behavior for reused keys.

## Webhooks

Webhook system should support lifecycle events such as:

- document.created/revision.created,
- envelope.created/sent/viewed,
- recipient.completed/declined,
- envelope.completed/expired/cancelled,
- verification.completed,
- workflow.started/completed/failed.

Security requirements:

- signed payloads,
- replay protection guidance,
- delivery IDs,
- timestamp/version,
- retries/backoff,
- endpoint disablement after persistent failure policy,
- inspectable delivery history.

## SDKs

Priority:

1. TypeScript,
2. Python,
3. Go,
4. Rust where it adds local/native/verifier value rather than checklist parity.

SDK quality requirements:

- generated or contract-tested against OpenAPI,
- typed errors,
- pagination helpers,
- webhook verification helpers,
- idempotency support,
- examples,
- version compatibility policy.

## CLI

`signthos` CLI should eventually expose both local and connected operations.

Candidate families:

```text
signthos verify
signthos pdf ...
signthos documents ...
signthos envelopes ...
signthos workflows ...
signthos auth ...
```

Local verification should not require server credentials.

## Embedded signing

Embed flow must be scoped to a specific signing session/envelope recipient and avoid exposing broad account credentials.

Requirements:

- short-lived scoped token/session,
- origin/domain policy,
- completion/error events,
- mobile responsiveness,
- accessible controls,
- parent application cannot silently alter signed revision after signer intent is established.

## Embedded authoring

Authoring embed enables partner products to:

- load/upload a document,
- place fields,
- assign recipients/roles,
- configure bounded envelope settings,
- return a prepared envelope/template result.

Open-product principle: authoring contracts should not exist only as closed enterprise source if Signthos claims to be an open developer platform.

## White-labeling

Embed and hosted signing surfaces should support configurable:

- logo/brand name,
- accent/theme within accessibility constraints,
- custom email/sender/domain through appropriate providers,
- custom completion links,
- locale.

Trademark policy remains distinct from source-code licensing.

## Sandbox / test mode

Developer onboarding needs safe test workflows.

Test mode should support:

- non-production envelopes/events,
- predictable fixture identities/documents,
- webhook testing,
- no accidental production delivery/provider charges,
- explicit test markers in objects/events.

Test mode must not create a hidden implementation that diverges substantially from production contracts.

## API versioning

Preferred principles:

- additive evolution when possible,
- explicit breaking-change versioning,
- published deprecation window,
- machine-readable schema diff in CI,
- SDK compatibility matrix.

## Error taxonomy

Example high-level categories:

- `invalid_request`,
- `authentication_required`,
- `permission_denied`,
- `resource_not_found`,
- `conflict`,
- `precondition_failed`,
- `rate_limited`,
- `provider_unavailable`,
- `document_invalid`,
- `signature_invalid`,
- `unsupported_operation`,
- `internal_error`.

Do not leak tenant existence through authorization-sensitive error distinctions.

## Developer documentation

Required for production readiness:

- quickstart,
- API reference,
- webhook guide,
- SDK examples,
- embed guide,
- self-host endpoint/config guide,
- migration/versioning policy,
- security/auth guide,
- sample applications.

## MCP/agent integrations

Do not prioritize agent/MCP surfaces before stable public contracts.

Once API/workflow contracts stabilize, adapters can expose safe bounded tools such as:

- create draft envelope,
- inspect status,
- verify document,
- execute pre-approved PDF workflow.

Agent actions that send/sign/alter documents require explicit authorization boundaries and must never infer legal intent from model output alone.

## Success criteria

The developer platform succeeds when a partner can build a production signing/document flow from documented public contracts without reverse-engineering Signthos UI network traffic or purchasing a source-code feature unlock.
