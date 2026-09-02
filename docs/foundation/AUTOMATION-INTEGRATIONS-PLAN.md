# Signthos Automation and Integrations Plan

Status: FOUNDATION PLAN
Date: 2026-09-02

## Objective

Unify document processing and signing orchestration under one typed, deterministic workflow model.

Signthos automation should be more powerful than a PDF macro tool and safer than arbitrary user-supplied server scripting.

## Workflow model

A workflow is a versioned directed graph or ordered pipeline of typed steps.

Example:

```text
Import
 -> OCR
 -> Detect sensitive pattern
 -> Human review
 -> Apply redaction
 -> Compress
 -> Prepare envelope
 -> Approval
 -> Signature
 -> Verify
 -> Export
```

## Step contract

Every workflow step declares:

- stable step type/version,
- input contract,
- output contract,
- required capabilities,
- allowed execution providers,
- side effects,
- idempotency behavior,
- timeout/cancellation behavior,
- retry policy,
- evidence/audit output,
- permission requirements.

## Execution providers

### Local runner

For local-only pipelines using available browser/native capabilities.

Examples:

- merge,
- reorder,
- watermark,
- local redaction,
- verify,
- metadata transforms.

### Server runner

For connected workflows involving:

- signing/routing,
- team state,
- email/webhooks,
- server storage,
- scheduled operations.

### Heavy worker

For capabilities such as:

- OCR,
- Office conversion,
- complex repair,
- large compression jobs.

Heavy document processors are a separate untrusted-processing boundary. They must:

- receive only the document/input references and narrowly scoped processing parameters needed for the step,
- never receive raw signing keys, KMS/HSM signing authority, signer-provider credentials, account/session secrets, or unrelated control-plane/tenant credentials,
- execute with explicit file/page/object/memory/CPU/time limits,
- use sandbox/process/container isolation where feasible for the selected processor,
- return outputs through bounded artifact references and create a new document revision for content-changing results,
- expose timeout/cancellation/failure semantics without gaining authority to perform signing or routing side effects.

## Capability discovery

Workers/providers advertise:

- capability identifiers,
- implementation/version,
- supported options/limits,
- health/availability.

The workflow validator should reject an unsatisfiable plan before destructive execution when possible.

## Determinism

Where technically possible, record:

- input content digests,
- normalized parameters,
- provider/version,
- output digests,
- execution timestamps/status.

Not every converter produces byte-identical output across platforms, so deterministic **evidence of what ran** is required even where byte determinism is impossible.

## Human-in-the-loop steps

Some operations must stop for human judgment.

Examples:

- confirm AI-detected signature fields,
- approve redaction regions,
- approve recipient list,
- confirm high-impact document conversion result.

A model suggestion is not treated as a completed human decision.

## Signing workflow steps

Candidate steps:

- PrepareEnvelope
- AddRecipient
- FreezeRevision
- SendEnvelope
- AwaitRecipient
- RequireApproval
- VerifyCompletion
- ExportEvidence

Workflow automation must not create a signer intent event on behalf of a human without the appropriate explicit action/authorization.

## Batch processing

Support bounded batch execution for:

- bulk PDF transforms,
- bulk envelope creation,
- template population,
- CSV/data-driven sends.

Controls:

- preview/dry-run,
- batch size limits,
- validation before send,
- per-item results,
- resumability,
- duplicate prevention.

## Scheduling

Scheduled server workflows may support:

- reminders,
- expirations,
- recurring document generation/sends where explicitly configured,
- retention/purge jobs.

Scheduling behavior must be visible and cancellable according to policy.

## Integration categories

### Storage

- S3-compatible,
- filesystem,
- future Drive/Dropbox/OneDrive adapters through public contracts.

### Communication

- SMTP,
- transactional email APIs,
- SMS providers.

### Identity

- OIDC,
- SAML,
- WebAuthn/passkeys,
- identity-proofing adapters.

### Trust/signature

- local key,
- KMS/HSM,
- remote trust providers,
- timestamp authorities.

### Business/productivity

Future adapters may include:

- CRM,
- ERP,
- HR systems,
- automation platforms,
- webhooks/general HTTP actions.

## Integration security

- scoped credentials,
- tenant isolation,
- secret-manager compatible storage,
- egress allowlist controls where appropriate,
- signed inbound webhook verification,
- SSRF protection for user-configured destinations,
- timeouts/size limits,
- audit credential/config changes.

## Generic HTTP/webhook step

A generic outbound HTTP action is powerful but high risk.

If implemented, require:

- explicit admin permission,
- destination validation,
- private-network/metadata endpoint blocking by default,
- secret reference system rather than literal secret values in workflow definitions,
- response size/time limits.

## AI-assisted automation

AI may help draft a workflow from natural language, e.g.:

> OCR incoming contracts, suggest redactions for national ID numbers, then request approval before sending to legal.

The generated workflow must be displayed as explicit typed steps and validated before activation.

AI may not create a hidden execution path.

## Workflow versioning

Running workflows bind to a specific workflow definition/version.

Editing a workflow creates a new version rather than retroactively changing evidence for a prior run.

## Workflow observability

Per run expose:

- status,
- current step,
- inputs/outputs by safe references,
- duration,
- retries,
- provider/version,
- failure class,
- audit/evidence references.

## Failure semantics

Distinguish:

- validation failure,
- provider unavailable,
- timeout,
- partial side effect,
- authorization failure,
- document invalid,
- human rejection,
- delivery failure.

A retry must not duplicate irreversible side effects.

## Marketplace direction

Do not build a marketplace before stable integration contracts exist.

Later ecosystem may support:

- workflow templates,
- provider adapters,
- storage/integration connectors.

Third-party code execution requires a separate plugin security/sandbox model.

## Success criteria

Automation succeeds when PDF preparation, signing, verification and external integrations can be composed through inspectable typed contracts without turning the server into an unrestricted script runner.
