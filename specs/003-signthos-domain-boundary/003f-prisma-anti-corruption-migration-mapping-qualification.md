# Specification 003F — Prisma Anti-Corruption and Migration Mapping Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_MAPPING_ONLY / ZERO_NEW_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `5a8d1728810c7bb7f9df4ffc170c656d7314fae7`
Owning specification: `003-signthos-domain-boundary`

## Canonical authority

Specification 003A through 003E are canonical predecessors.

The fresh post-003E successor reread in Issue #6 authorizes exactly:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 003F_PRISMA_ANTI_CORRUPTION_MIGRATION_MAPPING_QUALIFICATION
003F_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
003F_IMPLEMENTATION_AUTHORITY = ABSENT
PRISMA_SCHEMA_MUTATION_AUTHORITY = ABSENT
DATABASE_MIGRATION_AUTHORITY = ABSENT
PRISMA_GENERATION_AUTHORITY = ABSENT
DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
SOURCE_IMPORT_AUTHORITY = ABSENT
RUNTIME_DATABASE_AUTHORITY = ABSENT
003G_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact exercises only that bounded planning/mapping authority.

## Purpose

Map the one actually imported domain-adjacent persistence artifact into the canonical Signthos 003A–003E contracts without allowing persistence representation, legacy names, generated-client assumptions, cascade rules, or provider-specific records to redefine product/domain semantics.

003F qualifies:

- the exact imported persistence baseline that may be inspected;
- a complete model-level disposition inventory;
- detailed anti-corruption mappings for domain-relevant persistence concepts;
- missing, overloaded, ambiguous, and implementation-specific concepts;
- adapter boundaries between persistence rows and canonical Signthos identities/state;
- future migration-disposition classes without authorizing any migration;
- preservation, cutover, rollback, and verification evidence required before later migration implementation could be authorized;
- deterministic adversarial cases that prevent persistence/domain conflation.

003F does not edit the Prisma schema, create migrations, generate code, install dependencies, connect to a database, or implement any adapter.

## Exact imported persistence baseline

The canonical imported artifact remains exactly:

```text
UPSTREAM_REPOSITORY = documenso/documenso
UPSTREAM_COMMIT = 2cac63a000e22422bdea449f68b8025e709aa73a
UPSTREAM_PATH = packages/prisma/schema.prisma
UPSTREAM_GIT_BLOB = 13768e34f62331474fce63b1ca67f8d5ead44854
DESTINATION_PATH = packages/prisma/schema.prisma
DESTINATION_GIT_BLOB = 13768e34f62331474fce63b1ca67f8d5ead44854
DESTINATION_SIZE_BYTES = 38099
DESTINATION_SHA256 = 0a8a957d47c50c4b5f33df8c032cadeb54b8a1184dcc9a61ebf53cc9563a6931
TRANSFORMATION = COPY_EXACT
```

Canonical Specification 002 characterization records this exact schema as 51 models, 30 enums, 64 explicit relations, 44 model indexes, 7 compound unique constraints, 49 cascade-delete relations, 8 set-null relations, 4 generators, 1 PostgreSQL datasource, and 10 `@zod.import` annotations.

Those facts are static schema observations only. They do not prove generated-client, runtime, migration, database, authorization, provider, queue, webhook, email, signing, or cryptographic behavior.

## Allowed change surface

This qualification may add only Signthos-authored planning/mapping material under:

`specs/003-signthos-domain-boundary/**`

It authorizes none of:

- changes to `packages/prisma/schema.prisma`;
- creation or modification of migration files;
- Prisma client, Kysely, Zod, JSON type, or other code generation;
- package or lockfile mutation;
- dependency acquisition;
- database connection, introspection, seeding, migration execution, or credential use;
- runtime adapter implementation;
- upstream source import or provenance expansion;
- provider/network execution;
- PDF parsing, editing, rendering, conversion, signing, or verification;
- authentication-provider implementation;
- public API, webhook, SDK, or UI implementation;
- 003G work;
- Specification 004 work.

# Anti-corruption principles

## Persistence is representation, not domain authority

Canonical rules:

1. a Prisma model name does not create a Signthos aggregate;
2. a Prisma primary key does not become a canonical Signthos identifier merely because both concepts need identity;
3. a database enum does not automatically equal a canonical domain state machine;
4. a relation or foreign key proves persistence linkage, not authorization, ownership, intent, legal effect, cryptographic validity, or accepted domain transition;
5. `onDelete: Cascade` and `onDelete: SetNull` are persistence cleanup behavior, not domain deletion/void/revocation semantics;
6. JSON columns are opaque persistence payloads unless an owning canonical contract explicitly versions and validates their semantic shape;
7. timestamps record persistence facts only to the extent their producing operation is qualified; field names such as `signedAt` or `completedAt` are not independently sufficient evidence of canonical signing/completion;
8. provider/job/webhook/mail records cannot redefine canonical workflow state or domain events;
9. authentication/session membership rows may inform a `Principal` or tenant-scope adapter but cannot grant resource authorization by themselves;
10. any ambiguity fails closed at the adapter boundary and is recorded as a migration or owner-spec disposition rather than guessed.

## Canonical identity translation

A future persistence adapter, if separately authorized, must expose explicit mapping functions or records rather than type-confusing persistence keys with canonical identifiers.

Conceptually:

```text
PersistenceIdentityMapping {
  persistence_model
  persistence_key
  canonical_kind
  canonical_id
  mapping_version
}
```

This is a semantic mapping requirement, not a proposed table or wire type.

Rules:

- integer/string/CUID encodings in the imported schema remain persistence encodings;
- `Recipient.id`, `Field.id`, `Envelope.id`, `EnvelopeItem.id`, and `DocumentData.id` are not interchangeable with one another or with canonical 003A IDs;
- contact data, tokens, URLs, secondary IDs, external IDs, provider IDs, and job IDs are never implicit canonical identity;
- a migration may preserve an existing persistence key as an adapter key while introducing a distinct canonical identifier later;
- mapping reversibility and uniqueness must be proven before cutover.

## State translation

A future adapter must translate legacy persistence state into canonical 003C/003D semantics explicitly.

It must not use enum-name equality as proof of semantic equality.

Examples:

- `DocumentStatus.COMPLETED` does not by itself prove canonical envelope completion prerequisites were satisfied;
- `SigningStatus.SIGNED` does not establish cryptographic validity, trust, evidence completeness, or legal effect;
- `ReadStatus.OPENED` and `SendStatus.SENT` are interaction/delivery persistence facts, not resource authorization;
- `BackgroundJobStatus.COMPLETED` is provider/runtime state and cannot become canonical workflow state;
- `WebhookCallStatus.SUCCESS` is transport delivery state and cannot become canonical domain success.

# Complete model-level disposition inventory

Every one of the 51 imported models is classified below so no persistence surface silently acquires domain ownership.

Disposition vocabulary:

```text
DOMAIN_ADAPTER_CORE
IDENTITY_AUTHN_ADAPTER
TENANT_AUTHZ_INPUT_ADAPTER
SIGNING_EVIDENCE_DEFERRED
PROVIDER_RUNTIME_DEFERRED
TRANSPORT_INTEGRATION_DEFERRED
PRODUCT_CONFIG_003G_DEFERRED
INFRASTRUCTURE_NONDOMAIN
ENTITLEMENT_LIMIT_INPUT
```

| Prisma model | 003F disposition | Canonical interpretation / boundary |
| --- | --- | --- |
| `User` | `IDENTITY_AUTHN_ADAPTER` | Authentication/account persistence may identify a future principal mapping; user rows do not grant resource authorization. |
| `TeamProfile` | `PRODUCT_CONFIG_003G_DEFERRED` | Presentation/profile configuration; not a Domain 003 aggregate. |
| `UserSecurityAuditLog` | `IDENTITY_AUTHN_ADAPTER` | Authentication/security audit input; not a canonical 003D domain or evidence event by name alone. |
| `PasswordResetToken` | `IDENTITY_AUTHN_ADAPTER` | Authentication credential lifecycle; outside resource authorization semantics. |
| `Passkey` | `IDENTITY_AUTHN_ADAPTER` | Authentication credential material; does not imply recipient or resource authority. |
| `AnonymousVerificationToken` | `IDENTITY_AUTHN_ADAPTER` | Authentication/verification token persistence only. |
| `VerificationToken` | `IDENTITY_AUTHN_ADAPTER` | Identity verification persistence only; `completed` does not grant domain authorization. |
| `Webhook` | `TRANSPORT_INTEGRATION_DEFERRED` | Public integration configuration; later transport ownership, not canonical event identity. |
| `WebhookCall` | `TRANSPORT_INTEGRATION_DEFERRED` | Delivery attempt persistence; request/response bodies and success state cannot redefine domain events. |
| `ApiToken` | `IDENTITY_AUTHN_ADAPTER` | Credential-to-principal input only; token possession is not canonical authorization. |
| `Subscription` | `ENTITLEMENT_LIMIT_INPUT` | Commercial entitlement persistence; may constrain availability but does not own domain state. |
| `SubscriptionClaim` | `ENTITLEMENT_LIMIT_INPUT` | Quota/feature claim input; JSON flags require adapter validation and do not create canonical capabilities. |
| `OrganisationClaim` | `ENTITLEMENT_LIMIT_INPUT` | Organisation-scoped quota/feature input; distinct from tenant authorization. |
| `OrganisationMonthlyStat` | `INFRASTRUCTURE_NONDOMAIN` | Usage accounting only. |
| `Account` | `IDENTITY_AUTHN_ADAPTER` | External identity-provider account mapping; provider subject is not canonical resource identity. |
| `Session` | `IDENTITY_AUTHN_ADAPTER` | Authentication session persistence; never sufficient for `ALLOW`. |
| `Folder` | `PRODUCT_CONFIG_003G_DEFERRED` | Organisation/navigation container; parent/folder visibility does not grant envelope/resource authority. |
| `Envelope` | `DOMAIN_ADAPTER_CORE` | Legacy overloaded document/template/routing persistence; must adapt to canonical `Envelope` while excluding content-revision ownership. |
| `EnvelopeItem` | `DOMAIN_ADAPTER_CORE` | Ordered persisted content slot; may map an envelope slot to an exact canonical revision only through explicit adapter mapping. |
| `DocumentAuditLog` | `DOMAIN_ADAPTER_CORE` | Legacy audit row requiring 003D event/evidence normalization; free-form `type`/`data` are not canonical event contracts. |
| `DocumentData` | `DOMAIN_ADAPTER_CORE` | Legacy byte/storage representation; not a canonical `DocumentRevision` without exact digest/lineage/media mapping and immutability proof. |
| `DocumentMeta` | `DOMAIN_ADAPTER_CORE` | Routing/presentation/distribution configuration; selected fields may inform workflow adapters but do not own `Workflow`. |
| `EnvelopeAttachment` | `DOMAIN_ADAPTER_CORE` | Attachment persistence; not automatically a `Document` or `DocumentRevision`. |
| `Recipient` | `DOMAIN_ADAPTER_CORE` | Envelope participation persistence; maps to recipient participation identity only through explicit adapter semantics. |
| `Field` | `DOMAIN_ADAPTER_CORE` | Persisted placement/assignment candidate for canonical `Field`; relation consistency must be validated. |
| `Signature` | `SIGNING_EVIDENCE_DEFERRED` | Legacy signature representation; image/text fields are not canonical evidence, trust, or cryptographic validity. |
| `CscCredential` | `SIGNING_EVIDENCE_DEFERRED` | Provider/signing credential cache; Specification 005/later owner, never canonical recipient identity. |
| `CscSession` | `SIGNING_EVIDENCE_DEFERRED` | Provider sign-time persistence; `documentDataId`/hash pinning is adapter evidence, not canonical revision identity by itself. |
| `DocumentShareLink` | `IDENTITY_AUTHN_ADAPTER` | Access-link credential/input; link possession does not imply resource authorization. |
| `Organisation` | `TENANT_AUTHZ_INPUT_ADAPTER` | Candidate tenant-scope source; organisation ownership/membership does not itself grant every action. |
| `OrganisationMember` | `TENANT_AUTHZ_INPUT_ADAPTER` | Tenant membership input to policy; not an authorization decision. |
| `OrganisationMemberInvite` | `IDENTITY_AUTHN_ADAPTER` | Invitation/token lifecycle; not current membership or resource authority until canonical policy accepts it. |
| `OrganisationGroup` | `TENANT_AUTHZ_INPUT_ADAPTER` | Policy-group input; role labels require explicit action/resource policy mapping. |
| `OrganisationGroupMember` | `TENANT_AUTHZ_INPUT_ADAPTER` | Membership relation input; not `ALLOW` by itself. |
| `TeamGroup` | `TENANT_AUTHZ_INPUT_ADAPTER` | Team/group role relation; adapter input only. |
| `OrganisationGlobalSettings` | `PRODUCT_CONFIG_003G_DEFERRED` | Organisation defaults/configuration; JSON defaults cannot override canonical domain invariants. |
| `TeamGlobalSettings` | `PRODUCT_CONFIG_003G_DEFERRED` | Team-level configuration; inherited/default behavior requires later product/config ownership. |
| `Team` | `TENANT_AUTHZ_INPUT_ADAPTER` | Sub-tenant/workspace context candidate; team relation is not implicit resource authority. |
| `TeamEmail` | `TRANSPORT_INTEGRATION_DEFERRED` | Sender identity/configuration; not principal/resource identity. |
| `TeamEmailVerification` | `IDENTITY_AUTHN_ADAPTER` | Email verification lifecycle only. |
| `TemplateDirectLink` | `IDENTITY_AUTHN_ADAPTER` | Direct-link credential/input; not canonical authorization or recipient identity. |
| `SiteSettings` | `PRODUCT_CONFIG_003G_DEFERRED` | Global product configuration; later bounded naming/config owner. |
| `BackgroundJob` | `PROVIDER_RUNTIME_DEFERRED` | Runtime job state; must remain separate from canonical workflow/domain events. |
| `BackgroundJobTask` | `PROVIDER_RUNTIME_DEFERRED` | Runtime task state; cannot define canonical operation success. |
| `AvatarImage` | `PRODUCT_CONFIG_003G_DEFERRED` | Presentation asset persistence. |
| `EmailDomain` | `TRANSPORT_INTEGRATION_DEFERRED` | Email/DKIM configuration including sensitive key material; outside Domain 003 semantics. |
| `OrganisationEmail` | `TRANSPORT_INTEGRATION_DEFERRED` | Sender configuration; transport ownership. |
| `EmailTransport` | `TRANSPORT_INTEGRATION_DEFERRED` | Mail provider configuration with encrypted secrets; not provider capability semantics from 003E. |
| `OrganisationAuthenticationPortal` | `IDENTITY_AUTHN_ADAPTER` | OIDC/authentication configuration; authentication remains separate from resource authorization. |
| `Counter` | `INFRASTRUCTURE_NONDOMAIN` | Generic persistence utility. |
| `RateLimit` | `ENTITLEMENT_LIMIT_INPUT` | Runtime/resource-limit input; not a canonical business/domain state. |

# Detailed core mapping

## `Envelope`

The imported `Envelope` row is overloaded relative to canonical Signthos semantics.

Relevant persistence fields/relations include:

- `id`, `secondaryId`, `externalId`;
- `type`, `title`, `status`, `source`;
- `createdAt`, `updatedAt`, `completedAt`, `deletedAt`;
- `signatureLevel`, `internalVersion`, `useLegacyFieldInsertion`;
- `envelopeItems`, `recipients`, `fields`, `shareLinks`, `auditLogs`, `envelopeAttachments`;
- `authOptions`, `formValues`, `visibility`;
- user/team/folder relations;
- `documentMeta` and template-specific fields.

Canonical mapping rules:

1. the persistence `Envelope.id` may be retained as an adapter key, but canonical `EnvelopeId` semantics come from 003A and remain opaque/domain-owned;
2. `secondaryId` and `externalId` are aliases/integration keys, not alternate canonical identity;
3. `DocumentStatus` requires explicit translation into the 003C state machine; enum-name overlap is insufficient;
4. `internalVersion` may be useful as a future optimistic-concurrency persistence token, but it is not `DocumentRevisionId`, revision lineage, or content identity;
5. `Envelope.type` and template fields show that the imported table mixes document/template concerns; those names cannot force a canonical aggregate merge;
6. `envelopeItems` are persistence slots and must not be treated as canonical revisions without an exact mapping;
7. `authOptions` is authentication configuration, not an authorization decision;
8. user/team/folder linkage supplies policy/context inputs only;
9. `completedAt` is not sufficient proof of canonical completion or evidence validity;
10. deleting or cascading an envelope row cannot be treated as canonical cancel/void/revoke semantics.

Disposition: `COMPATIBILITY_ADAPTER_FIRST`; explicit canonical structures may be additive later if separately authorized.

## `EnvelopeItem`

Relevant persistence facts:

- string primary key;
- `title`, `order`;
- unique `documentDataId` relation;
- `envelopeId` relation;
- field relation.

Canonical mapping rules:

1. `order` is a candidate persisted ordering input for the exact revision set governed by 003C;
2. `documentDataId` is a legacy content-record reference, not a `DocumentRevisionId`;
3. a future adapter must resolve one envelope item to one exact accepted canonical revision mapping before signing/evidence-sensitive use;
4. the current unique relation does not prove immutable content or digest stability;
5. cascade behavior is persistence cleanup only.

Disposition: `COMPATIBILITY_ADAPTER_FIRST` plus likely `ADDITIVE_SCHEMA_LATER` for explicit revision mapping.

## `DocumentData`

Relevant persistence facts:

```text
id
DocumentDataType = S3_PATH | BYTES | BYTES_64
data
initialData
```

Canonical mapping rules:

1. `DocumentData` is not a canonical `DocumentRevision`;
2. the schema has no declarative algorithm-tagged content digest field, parent revision identity, conversion provenance, canonical media type, or explicit byte-length field;
3. storage mode (`S3_PATH`, `BYTES`, `BYTES_64`) is representation, not content identity;
4. `data` and `initialData` cannot be assumed immutable from schema declaration alone;
5. a future migration/backfill must derive and verify canonical exact-byte identity without changing source bytes;
6. signed/signing-bound bytes must never be rewritten in place during migration;
7. storage-key equality is not content equality.

Disposition: `ADDITIVE_SCHEMA_LATER + BACKFILL_REQUIRED_LATER`, preceded by a non-mutating compatibility adapter. No such mutation is authorized by 003F.

## `DocumentMeta`

Persistence includes routing/distribution defaults such as signing order, notification settings, language/timezone, redirects, expiration/reminder settings, and signature-input presentation options.

Canonical mapping rules:

- `signingOrder` may be an adapter input to 003C workflow/routing semantics but is not the `Workflow` aggregate itself;
- email/distribution/reminder settings belong to transport/product configuration and cannot define domain state;
- typed/upload/draw signature enablement is capability/product configuration, not cryptographic or legal signature semantics;
- JSON settings require explicit version/validation at an adapter boundary;
- redirect/email identifiers are transport concerns.

Disposition: mixed `DOMAIN_ADAPTER_CORE` and later transport/config ownership; no direct canonical equivalence.

## `Recipient`

Persistence combines participation identity, contact data, delivery state, signing interaction state, reminders, authentication options, and provider-specific signing relations.

Canonical mapping rules:

1. `Recipient.id` is a persistence key that may map to one envelope-scoped canonical `RecipientId`; it is not a global person identity;
2. `email`, `name`, `token`, authentication options, or provider credentials cannot substitute for canonical recipient identity;
3. `role` requires translation to canonical role semantics and does not grant authorization;
4. `readStatus`, `sendStatus`, and `signingStatus` are separate legacy persistence dimensions and cannot independently redefine 003C recipient state;
5. `signedAt` does not establish evidence validity;
6. `documentDeletedAt`, expiration/reminder fields, and rejection text require explicit state/transport adapters;
7. CSC relations remain later signing/provider ownership.

Disposition: `COMPATIBILITY_ADAPTER_FIRST`; any canonical state columns/tables are `ADDITIVE_SCHEMA_LATER` candidates only.

## `Field`

Persistence includes:

- `id` plus `secondaryId`;
- `envelopeId`, `envelopeItemId`, `recipientId`;
- field type;
- page/position/size;
- `customText`, `inserted`, `fieldMeta`;
- optional signature relation.

Canonical mapping rules:

1. all three parent relations must agree with canonical envelope/item/revision/recipient bindings; separate valid foreign keys do not prove cross-relation consistency;
2. page and placement data must bind to the exact canonical revision context before becoming accepted field placement;
3. `inserted` is not canonical completion/evidence by itself;
4. `fieldMeta` is an opaque legacy payload until versioned/validated by an owning adapter;
5. `secondaryId` is an alias, not a second canonical field identity.

Disposition: `COMPATIBILITY_ADAPTER_FIRST` with invariant validation; explicit canonical revision placement linkage may require `ADDITIVE_SCHEMA_LATER`.

## `Signature`

The imported row stores a recipient/field relation plus optional base64 image or typed signature text.

Canonical rules:

- it is not an `EvidenceBundle`;
- it does not prove cryptographic validity, certificate trust, identity assurance, regulated signature level, or legal effect;
- field/recipient relation is insufficient to prove accepted signing intent;
- image/text persistence must remain behind a later signing/evidence anti-corruption boundary.

Disposition: `DEFER_OWNER_SPEC` to Specification 005/later signing/evidence work.

## `CscCredential` and `CscSession`

These records are provider/signing implementation persistence.

The `CscSession.itemsJson` comment describes pinning `envelopeItemId`, `documentDataId`, and `hashB64`, but 003F treats that only as legacy/provider persistence evidence.

Canonical rules:

- `documentDataId` is not canonical revision identity;
- hash material must be algorithm-tagged and bound through canonical revision semantics before reuse as domain evidence;
- provider ID/credential ID/SAD/session state cannot become canonical resource identity;
- signing-key/provider-secret access remains outside 003F and under later owner specifications;
- provider session state cannot redefine envelope/workflow state.

Disposition: `DEFER_OWNER_SPEC` to signing/evidence/provider implementation work.

## `DocumentAuditLog`

Persistence has a free-form string `type`, JSON `data`, optional actor metadata, timestamp, and optional envelope relation.

Canonical rules:

1. the row is not automatically a 003D `DomainEvent`;
2. its free-form `type` is not a stable event code/version contract;
3. JSON `data` must not be exposed as canonical event payload without schema/version/minimization validation;
4. actor email/name/IP/user agent are sensitive audit context and must not leak into ordinary domain events/errors;
5. a future adapter may normalize selected records into audit/evidence event views while retaining original legacy rows unchanged;
6. audit existence does not prove cryptographic evidence completeness.

Disposition: `COMPATIBILITY_ADAPTER_ONLY` initially; future event/evidence persistence requires separate authority.

# Tenant, identity, and authorization mapping

## Organisation/team hierarchy

`Organisation`, `OrganisationMember`, `OrganisationGroup`, `OrganisationGroupMember`, `Team`, and `TeamGroup` provide persistence relationships that may inform canonical tenant scope and policy context.

Rules:

- organisation/team IDs are adapter inputs to tenant/resource scope, not automatic canonical authorization;
- member/group/team role enums do not imply wildcard permissions;
- owner relations do not automatically bypass recipient-specific authorization;
- caller-supplied organisation/team IDs remain untrusted until resolved against protected resource scope;
- cross-tenant access remains deny-by-default as required by 003D;
- migration of these rows must preserve membership uniqueness and must not broaden access.

## Authentication persistence

`User`, `Account`, `Session`, `Passkey`, verification/reset tokens, API tokens, direct/share links, and authentication portal configuration are authentication/credential surfaces.

Rules:

- a future adapter may derive a `Principal` context from qualified authentication evidence;
- no authentication row can independently produce an authorization `ALLOW`;
- recipient participation remains separate from user/account identity;
- link/token knowledge does not imply tenant/resource permission;
- secrets/tokens must never appear in migration evidence logs or mapping reports.

# Event, transport, and runtime mapping

## Webhooks

`Webhook` and `WebhookCall` are transport/integration persistence.

- webhook trigger names are not canonical domain-event definitions;
- webhook delivery success/failure does not affect canonical state;
- request/response bodies may contain sensitive data and are not canonical audit payloads by default;
- callback replay must not duplicate canonical transitions or revision creation.

## Background jobs

`BackgroundJob` and `BackgroundJobTask` are provider/runtime state.

- job/task `PENDING`, `PROCESSING`, `COMPLETED`, or `FAILED` cannot become canonical workflow state;
- retry counters are runtime policy, not canonical command idempotency proof;
- job `name`/`version` are implementation identity, not 003E capability identity unless explicitly adapted;
- result/payload JSON remains opaque implementation data.

## Mail and integration configuration

`EmailDomain`, `OrganisationEmail`, `TeamEmail`, `EmailTransport`, and related verification rows remain transport/configuration persistence.

- private keys and encrypted transport config are sensitive secrets;
- these rows do not own tenant authorization or provider capability semantics;
- no migration evidence may disclose secret values;
- naming/configuration normalization belongs to later bounded owners, including 003G where appropriate.

# Canonical concepts missing or structurally overloaded

The imported schema does not directly provide canonical persistence for several Domain 003 concepts.

| Canonical concept | Imported representation status | 003F disposition |
| --- | --- | --- |
| `Document` | No clean independent canonical root; document/template concerns are overloaded into `Envelope`/`EnvelopeItem`/`DocumentData`. | Explicit compatibility adapter now; likely additive canonical persistence later. |
| `DocumentRevision` | No explicit revision entity with canonical identity/digest/lineage contract. | `ADDITIVE_SCHEMA_LATER + BACKFILL_REQUIRED_LATER`. |
| Algorithm-tagged exact-content digest | CSC JSON may carry hashes, but no canonical revision digest field/contract exists in the schema. | Additive/backfill later; never infer from provider hash without validation. |
| Revision lineage/conversion provenance | Not represented as canonical parent/source revision semantics. | Additive later. |
| Immutable signing-bound exact revision set | `EnvelopeItem -> DocumentData` exists, but canonical exact-revision mapping is absent. | Compatibility mapping plus likely additive binding later. |
| `EvidenceBundle` | No explicit canonical aggregate. `Signature`, audit logs, CSC records are partial/legacy concerns. | Defer to later evidence/signing owner; additive later if authorized. |
| `Workflow` | Routing/state is distributed across envelope/recipient/meta/job records; no explicit canonical workflow identity/version. | Compatibility adapter first; explicit persistence later if needed. |
| `Principal` | Auth/account/session rows exist but no canonical 003D principal representation. | Identity adapter; persistence choice deferred. |
| Tenant/resource authorization decision | Organisation/team/membership inputs exist; canonical `ALLOW`/`DENY` decision is not a persistence row. | Policy adapter; do not materialize merely for schema symmetry. |
| Stable domain event identity/version/correlation/causation | `DocumentAuditLog`, webhooks, jobs exist but are not canonical event contracts. | Adapter/deferred event persistence. |
| 003E provider/capability registry | Provider-specific IDs/jobs/config exist; no canonical `ProviderId`/versioned `CapabilityRef` registry. | Provider adapter/deferred implementation. |

Missing persistence is not a defect by itself. 003F records where a later implementation may require additive structures; it does not pre-authorize them.

# Future migration-disposition classes

Any future implementation proposal must classify each persistence change using one of these stable planning dispositions:

```text
COMPATIBILITY_ADAPTER_ONLY
ADDITIVE_SCHEMA_LATER
BACKFILL_REQUIRED_LATER
RENAME_ONLY_LATER
DUAL_READ_WRITE_TRANSITION_LATER
BREAKING_MIGRATION_LATER
KEEP_LEGACY_OPAQUE
DEFER_OWNER_SPEC
```

Semantics:

- `COMPATIBILITY_ADAPTER_ONLY`: canonical semantics can be projected without persistence mutation;
- `ADDITIVE_SCHEMA_LATER`: new nullable/table/index/constraint structure may be required without deleting legacy data;
- `BACKFILL_REQUIRED_LATER`: deterministic canonical mapping must be materialized for existing rows;
- `RENAME_ONLY_LATER`: naming may change without intended semantic change, subject to 003G compatibility policy;
- `DUAL_READ_WRITE_TRANSITION_LATER`: a bounded compatibility period may be required before cutover;
- `BREAKING_MIGRATION_LATER`: semantics or shape cannot be preserved transparently and need explicit migration/cutover authority;
- `KEEP_LEGACY_OPAQUE`: preserve legacy data behind an adapter because canonicalizing it adds no value or exceeds owner scope;
- `DEFER_OWNER_SPEC`: another specification owns the concept.

No disposition is implementation authority.

# Proposed future migration order

If and only if a later canonical implementation authorization exists, the safe dependency order is:

1. **Read-only characterization and mapping proof** — prove model/field/relation inventory and canonical mapping without writes.
2. **Compatibility adapter** — expose canonical semantics while legacy storage remains authoritative only as representation.
3. **Additive canonical structures** — add new identity/revision/mapping structures without destructive changes.
4. **Deterministic backfill** — populate canonical mappings from immutable source snapshots with explicit reject buckets for ambiguity.
5. **Dual-read verification** — compare legacy projection and canonical projection across representative and adversarial fixtures/data snapshots.
6. **Optional bounded dual-write** — only if separately authorized and idempotent; never rewrite signed/signing-bound bytes.
7. **Cutover** — switch canonical reads only after completeness, consistency, performance, authorization, and rollback gates pass.
8. **Legacy freeze** — prevent new legacy-only writes before removal.
9. **Removal/rename** — only after compatibility windows and 003G naming policy permit it.

Destructive migration is never the first step.

# Data-preservation and rollback evidence contract

Any future migration implementation must produce evidence at least equivalent to the following before destructive cutover.

## Structural preservation

- pre/post row counts by affected model;
- primary-key and canonical-mapping uniqueness checks;
- foreign-key/orphan reports;
- nullable/non-null transition accounting;
- duplicate and collision reports;
- index/constraint disposition;
- exact affected-schema diff;
- explicit list of cascade/set-null changes, if any.

## Domain preservation

- every legacy envelope maps deterministically or enters an explicit reject/manual-review bucket;
- every envelope item mapping preserves order and exact content association;
- signed/signing-bound content bytes are byte-identical before and after migration;
- canonical revision digest recomputation matches stored mapping for every migrated accepted revision;
- recipient-envelope and field-recipient/envelope/item associations remain intact;
- external/secondary/integration identifiers preserve lookup compatibility or have an explicit versioned redirect mapping;
- tenant/team ownership context does not broaden;
- legacy audit rows remain available even if a canonical event view is added;
- provider/signing secret material is neither logged nor transformed outside its owning authorization.

## Behavioral preservation

- stale-write/conflict behavior remains fail-closed;
- authentication does not become authorization through migration shortcuts;
- legacy statuses are translated explicitly and ambiguous rows do not silently become canonical success states;
- provider/job/webhook completion cannot trigger implicit canonical state backfill;
- retry/replay cannot duplicate output revisions or accepted transitions.

## Rollback evidence

Before an irreversible step, later implementation evidence must include:

- a tested rollback or restore procedure for every reversible phase;
- backup/snapshot identity and restore verification without exposing credentials or sensitive content in logs;
- proof that rollback does not overwrite newly created canonical revisions with stale bytes;
- a cutover watermark/version so mixed old/new records are detectable;
- explicit handling for writes occurring during migration windows;
- rollback boundary for any operation declared irreversible;
- owner approval for any truly irreversible destructive phase, if canonical governance later requires it.

# Adversarial qualification cases

The following cases are mandatory constraints for any later adapter/migration design.

| Case | Unsafe persistence shortcut | Required outcome |
| --- | --- | --- |
| F-A01 | Treat `Envelope.internalVersion` as `DocumentRevisionId`. | Reject; persistence concurrency token and exact content revision identity remain distinct. |
| F-A02 | Treat `DocumentData.id` or storage path as exact content identity without canonical digest mapping. | Reject. |
| F-A03 | Rewrite `DocumentData.data` in place during canonical backfill. | Reject; content-changing migration must preserve immutable signing-bound bytes and create explicitly governed structures later. |
| F-A04 | Use `onDelete: Cascade` as proof a domain envelope was cancelled/voided/deleted. | Reject; persistence cleanup is not a domain transition. |
| F-A05 | Use recipient email equality to merge recipient identities across envelopes. | Reject; canonical recipient identity is envelope-scoped participation identity. |
| F-A06 | Treat `SigningStatus.SIGNED` or `signedAt` as evidence validity. | Reject; signing/evidence validity is later owner-spec semantics. |
| F-A07 | Treat `DocumentAuditLog.type` text as a canonical 003D event code. | Reject unless an explicit versioned normalization adapter maps it. |
| F-A08 | Treat a successful webhook call as canonical domain success. | Reject. |
| F-A09 | Treat `BackgroundJob.status=COMPLETED` as canonical workflow completion. | Reject. |
| F-A10 | Treat organisation/team membership or role as automatic resource `ALLOW`. | Reject; 003D authorization remains explicit. |
| F-A11 | Treat a direct/share/API token as both authentication and authorization. | Reject. |
| F-A12 | Parse unversioned JSON (`authOptions`, `fieldMeta`, job payload/result, audit data) directly as canonical domain state. | Reject or route through an explicit versioned adapter. |
| F-A13 | Reuse `CscSession.documentDataId` as canonical revision identity merely because a hash is also present. | Reject; canonical revision identity/digest algorithm binding must be proven. |
| F-A14 | Let provider credential/job IDs become canonical `ProviderId`, workflow, recipient, or revision identity. | Reject. |
| F-A15 | Rename broad `Document*` persistence concepts during the same unit as schema migration/cutover. | Reject; naming/config migration is separately bounded by 003G. |
| F-A16 | Drop legacy aliases/external IDs before proving all callers are migrated. | Reject. |
| F-A17 | Backfill ambiguous legacy state to the most permissive canonical state. | Reject; ambiguity fails closed into explicit reconciliation. |
| F-A18 | Emit document bytes, bearer tokens, CSC secrets, email transport secrets, passkey material, or auth tokens into migration evidence. | Reject as sensitive-data leakage. |
| F-A19 | Create duplicate canonical revisions during retry/replay of a backfill batch. | Reject; mapping/backfill must be idempotent. |
| F-A20 | Run Prisma generation, migration, database introspection, or network access to “validate” this planning grain. | Reject as unauthorized execution. |

# Adapter boundary requirements

A later adapter implementation must, at minimum:

1. accept persistence records only through explicit model-specific translation boundaries;
2. return canonical 003A–003E semantic values rather than leaking raw Prisma enums/models into domain interfaces;
3. validate cross-row invariants that foreign keys alone do not prove;
4. preserve exact content/revision identity and stale-write semantics;
5. normalize authentication/tenant inputs without manufacturing authorization;
6. normalize legacy audit/provider/runtime records without manufacturing domain events;
7. keep raw provider, webhook, job, mail, and signing implementation status outside canonical workflow state;
8. use stable canonical errors from 003D for mapping ambiguity/unsupported/unavailable conditions;
9. reject unknown legacy enum/JSON variants fail-closed;
10. expose enough provenance/mapping metadata for reversible migration audits without exposing secrets or document content.

# Deferred ownership

003F explicitly defers:

- actual Prisma schema edits, client generation, SQL, migration scripts, database execution, backfills, dual-write, cutover, or rollback execution to separately authorized implementation work;
- product naming/configuration migration to 003G;
- PDF capability implementation to Specification 004/010 as later authorized;
- signing, evidence, trust, and cryptographic implementation to Specification 005/later work;
- public API/webhook transport contracts and implementation to Specification 009/later work;
- provider execution mechanics to separately authorized provider implementation work;
- source/provenance expansion to the canonical provenance/import governance;
- any external-license/rights expansion to explicit rights qualification.

# Qualification acceptance criteria

003F is substantively acceptable only if independent exact-head review confirms all of the following:

1. the exact imported schema identity is recorded without modifying imported bytes;
2. all 51 imported models are disposition-classified;
3. persistence model/key/state names are not promoted to canonical domain authority by implication;
4. `Envelope`, `EnvelopeItem`, `DocumentData`, `DocumentMeta`, `Recipient`, and `Field` mappings preserve 003A–003C ownership boundaries;
5. authentication/organisation/team persistence cannot bypass 003D authorization;
6. audit/webhook/job/provider persistence cannot redefine 003D event/error or 003C workflow semantics;
7. provider/signing persistence does not steal 003E or later signing/evidence ownership;
8. missing `DocumentRevision`, digest/lineage, workflow, evidence, event, and provider-capability persistence is identified without inventing implementation authority;
9. future migration dispositions are planning labels only;
10. preservation and rollback evidence is strong enough to make a later migration proposal reviewable;
11. signed/signing-bound bytes are explicitly protected from in-place mutation;
12. JSON, cascade, timestamps, statuses, contact data, and provider IDs are treated as adapter inputs rather than domain truth;
13. 003G and Specification 004 remain unauthorized successors until post-merge reread;
14. the exact diff contains only Signthos-authored planning/mapping material with zero new upstream-derived bytes.

# Qualification workflow

For this grain:

1. branch from exact canonical `main@5a8d1728810c7bb7f9df4ffc170c656d7314fae7`;
2. add only this planning/mapping artifact;
3. perform static self-audit against the exact imported schema and canonical 003A–003E contracts;
4. open one bounded PR;
5. account truthfully for applicable Actions/statuses/provider limits;
6. obtain a fresh independent substantive review of the complete exact base/head candidate;
7. repair every material finding forward-only and re-review the resulting exact head;
8. require zero unresolved material review threads;
9. record mandatory exact-head pre-merge proof;
10. merge only with exact `expected_head_sha`;
11. verify merge tree equality, ordered parents, signature, changed surface, Actions/statuses, and canonical `main` after merge;
12. derive 003G authority only from the fresh canonical post-003F reread.

Until all merge and post-merge gates succeed:

```text
003F_STATUS = QUALIFICATION_CANDIDATE_ONLY
003F_IMPLEMENTATION_AUTHORITY = ABSENT
003G_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```
