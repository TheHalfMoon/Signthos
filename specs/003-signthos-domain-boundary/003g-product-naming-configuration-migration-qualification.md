# Specification 003G — Bounded Product Naming and Configuration Migration Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_MAPPING_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `2a4acb8d788b24ecd2034b8f1b00faf7dbca55b7`
Owning specification: `003-signthos-domain-boundary`

## Canonical authority

Specification 003A through 003F are canonical predecessors.

The fresh post-003F successor reread in Issue #6 authorizes exactly:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 003G_PRODUCT_NAMING_CONFIGURATION_MIGRATION_QUALIFICATION
003G_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
003G_IMPLEMENTATION_AUTHORITY = ABSENT
PRODUCT_RENAME_IMPLEMENTATION_AUTHORITY = ABSENT
CONFIG_MUTATION_AUTHORITY = ABSENT
PERSISTENCE_MIGRATION_AUTHORITY = ABSENT
SOURCE_IMPORT_AUTHORITY = ABSENT
LICENSE_BOUNDARY_MUTATION_AUTHORITY = ABSENT
PROVIDER_RUNTIME_AUTHORITY = ABSENT
003H_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact exercises only that bounded planning/mapping authority.

## Purpose

Freeze a migration-safe naming and configuration policy before future application/package/config surfaces proliferate.

The canonical repository already uses `Signthos` as the working product name. Therefore 003G is not a `Documenso -> Signthos` search-and-replace plan. It classifies naming/configuration seams, defines compatibility rules, and protects upstream/provenance/legal/persistence identity from cosmetic rewrite.

003G does not rename a product surface or mutate configuration.

## Canonical brand facts consumed without reopening

Canonical `README.md` names the product `Signthos` and describes planned surfaces including Signthos Web, Desktop, Mobile, Server, SDK, Embed, CLI, and Verify.

Canonical `docs/foundation/BRAND-PRODUCT-LANGUAGE.md` records:

- brand name: `Signthos`;
- primary tagline: `Open documents. Open signing. Everywhere.`;
- candidate product family also including Signthos Cloud and Signthos API;
- trademark/domain clearance remains a separate pre-launch task;
- stable technical domain symbols should not receive unnecessary brand prefixes;
- visual identity must avoid confusion with Documenso, Stirling, or DocuSign.

003G does not claim trademark clearance, domain ownership, package-registry availability, app-store availability, implementation, or release readiness.

# Classification model

## Cumulative dimensions, not mutually exclusive classes

Naming/configuration protections are **cumulative dimensions**.

A seam has:

```text
NamingClassification {
  primary_role
  constraints[]
}
```

This is a semantic review model, not a wire or storage schema.

Rules:

1. `primary_role` states why the seam exists in the current Signthos repository;
2. `constraints[]` adds every independently applicable protection;
3. one constraint never cancels another;
4. a future change must satisfy the **intersection** of all applicable constraints;
5. when classification is ambiguous, the more restrictive compatible protections apply until ownership is resolved;
6. provenance/source/legal/persistence constraints cannot be discarded merely because another role is more convenient for a proposed migration.

Example:

```text
packages/prisma/schema.prisma
  primary_role = PERSISTENCE_IDENTIFIER
  constraints = [
    IMPORTED_SOURCE_LITERAL_PRESERVE_EXACT,
    UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT
  ]
```

Its `@documenso/lib/...` literals additionally carry their exact upstream/source identity constraints. A future persistence migration therefore does **not** gain authority to rewrite imported-source literals merely because persistence ownership also applies.

## Available roles and constraints

```text
CANONICAL_SIGNTHOS_PRODUCT_NAME
CANONICAL_DOMAIN_LANGUAGE
PRODUCT_PRESENTATION_NAME
INTERNAL_IMPLEMENTATION_IDENTIFIER
CONFIG_KEY_COMPATIBILITY_SENSITIVE
EXTERNAL_COMPATIBILITY_IDENTIFIER
PERSISTENCE_IDENTIFIER
UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT
IMPORTED_SOURCE_LITERAL_PRESERVE_EXACT
LEGAL_LICENSE_IDENTITY_PRESERVE_EXACT
GOVERNANCE_IDENTIFIER_PRESERVE
DEFER_OWNER_SPEC
```

A token may be a primary role in one seam and a cumulative constraint in another.

# Classification semantics

## `CANONICAL_SIGNTHOS_PRODUCT_NAME`

The current working product brand is `Signthos`.

- use one coherent product family rather than independent subsystem brands by default;
- brand use does not imply legal clearance;
- upstream references do not imply affiliation;
- a future product rename needs separate qualification.

## `CANONICAL_DOMAIN_LANGUAGE`

Stable semantic terms include:

```text
Document
DocumentRevision
Envelope
Recipient
Field
EvidenceBundle
Workflow
Principal
ProviderId
CapabilityRef
```

Do not mechanically prefix them with `Signthos` or rename them to legacy upstream vocabulary. Product identity belongs primarily at product/package boundaries.

## `PRODUCT_PRESENTATION_NAME`

User-facing display labels, app names, documentation headings, and marketing copy may be cosmetic only when stable machine/config/persistence/provenance/legal/external identifiers and behavior are unchanged.

## `INTERNAL_IMPLEMENTATION_IDENTIFIER`

Future Signthos-owned package/module/binary/process/service names may be normalized only after external exposure is disproven. Package or binary names become compatibility-sensitive if scripts, users, plugins, deployments, or external tooling invoke them.

## `CONFIG_KEY_COMPATIBILITY_SENSITIVE`

Environment variables, config keys, CLI flags, persisted preferences, service settings, and deployment parameters are behavior-affecting machine interfaces.

A future rename normally requires:

```text
ADD_CANONICAL_KEY
DUAL_ACCEPT_LEGACY_ALIAS
DEFINE_CONFLICT_PRECEDENCE
DEPRECATE_WITHOUT_SECRET_LEAKAGE
REMOVE_ONLY_AFTER_EXPLICIT_EVIDENCE
```

Aliases cannot weaken authorization, privacy, provider locality, resource limits, or other security semantics.

## `EXTERNAL_COMPATIBILITY_IDENTIFIER`

Public API paths/fields, webhook codes, SDK namespaces, plugin/package IDs, externally used CLI names, provider IDs, format identifiers, and durable integration keys are not changed by cosmetic presentation work. Their owner specifications control compatibility and deprecation.

## `PERSISTENCE_IDENTIFIER`

Prisma model/field/enum names, tables, columns, indexes, constraints, migration IDs, storage identifiers, and persistence aliases are owned by 003F/separately authorized migration work.

A product rename never authorizes a persistence rename.

## `UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT`

Upstream repository/package names, commits, blobs, source paths, provenance record IDs, historical source references, and exact review evidence remain exact.

Examples:

```text
documenso/documenso
Stirling-Tools/Stirling-PDF
@documenso/prisma
@documenso/lib
exact upstream commits/blobs/paths
```

These are source identity, not Signthos branding debt.

## `IMPORTED_SOURCE_LITERAL_PRESERVE_EXACT`

Exact imported artifacts and literals cannot be cosmetically rewritten under 003G.

Current examples:

- `.npmrc`;
- `packages/prisma/schema.prisma`;
- `@zod.import` references inside the Prisma schema to `@documenso/lib/...`.

Any later change requires the appropriate source/provenance authority plus the owning implementation/persistence/config authority.

## `LEGAL_LICENSE_IDENTITY_PRESERVE_EXACT`

SPDX/license/copyright/attribution/rights/NOTICE evidence is never cosmetic branding. Conflicting or unresolved rights evidence remains visible rather than being normalized away.

## `GOVERNANCE_IDENTIFIER_PRESERVE`

Specification IDs, grain/task IDs, evidence IDs, PR/issue references, commit hashes, provenance schema versions, and machine control-plane identifiers are governance identity, not product branding.

# Current canonical repository seam inventory

The live repository is foundation/governance heavy and contains no imported application codebase requiring a broad product rename.

| Surface | Primary role | Cumulative constraints | 003G disposition |
| --- | --- | --- | --- |
| `README.md` | `CANONICAL_SIGNTHOS_PRODUCT_NAME` | upstream references carry `UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT` | Already Signthos; no migration required. |
| `ROADMAP.md` | `GOVERNANCE_IDENTIFIER_PRESERVE` | Signthos product presentation where applicable | No broad rename. |
| `docs/foundation/**` | `PRODUCT_PRESENTATION_NAME` / governance planning | competitor/upstream references preserve exact identity | Current Signthos naming is canonical planning truth. |
| `docs/foundation/BRAND-PRODUCT-LANGUAGE.md` | `CANONICAL_SIGNTHOS_PRODUCT_NAME` | `GOVERNANCE_IDENTIFIER_PRESERVE` | Source of brand-language constraints; no implementation claim. |
| `AGENTS.md` | `GOVERNANCE_IDENTIFIER_PRESERVE` | none implying product rename | Not a branding migration surface. |
| `.specify/**` | `GOVERNANCE_IDENTIFIER_PRESERVE` | canonical governance | Not a cosmetic rename surface. |
| `.github/workflows/provenance.yml` | `GOVERNANCE_IDENTIFIER_PRESERVE` | workflow behavior is configuration-sensitive | No product rename authority. |
| `tools/provenance/**` | `INTERNAL_IMPLEMENTATION_IDENTIFIER` | CLI names are compatibility-sensitive once externally used | No current rename need. |
| `.npmrc` | `CONFIG_KEY_COMPATIBILITY_SENSITIVE` | `IMPORTED_SOURCE_LITERAL_PRESERVE_EXACT`, `UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT` | Exact 65-byte imported config; contains package-manager settings only and no product naming seam. |
| `packages/prisma/schema.prisma` | `PERSISTENCE_IDENTIFIER` | `IMPORTED_SOURCE_LITERAL_PRESERVE_EXACT`, `UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT` | Exact imported persistence source; no cosmetic rewrite. |
| `schema.prisma` `@documenso/lib/...` literals | upstream dependency/source identity | `IMPORTED_SOURCE_LITERAL_PRESERVE_EXACT`, `UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT` | Preserve exact unless source/provenance plus owning implementation authority later permits change. |
| `specs/002-documenso-brownfield-baseline/**` | `GOVERNANCE_IDENTIFIER_PRESERVE` | `UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT`, legal/source evidence constraints | Preserve historical Documenso names, paths, hashes, packages, rights evidence. |
| `provenance/**` | `GOVERNANCE_IDENTIFIER_PRESERVE` | `UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT`, legal constraints where applicable | No cosmetic rename of source or record identity. |
| `NOTICE` | legal/attribution record | `LEGAL_LICENSE_IDENTITY_PRESERVE_EXACT`, `UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT` | Never product-search-and-replace. |
| `LICENSES/**` | legal evidence | `LEGAL_LICENSE_IDENTITY_PRESERVE_EXACT` | Never product-search-and-replace. |
| `specs/003-signthos-domain-boundary/**` | `CANONICAL_DOMAIN_LANGUAGE` / governance | `GOVERNANCE_IDENTIFIER_PRESERVE` | Stable semantic vocabulary; avoid unnecessary brand prefixes. |

# Current implementation disposition

Canonical repository truth shows:

- product-facing foundation documentation already uses `Signthos`;
- `packages/` contains only the exact imported Prisma schema;
- no broad imported application package set exists;
- no application environment/config-key surface has been established that requires a rename migration;
- `.npmrc` has no product naming seam;
- historical/upstream/provenance/legal uses of Documenso/Stirling are deliberate exact identity.

Therefore:

```text
CURRENT_BROAD_RENAME_NEEDED = NO
CURRENT_CONFIG_KEY_MIGRATION_NEEDED = NO_EVIDENCE
CURRENT_IMPORTED_SOURCE_RENAME_NEEDED = NO
CURRENT_003G_IMPLEMENTATION_CHANGE_REQUIRED = NO
```

This is a convergence result. 003G must not invent implementation work merely to create a rename diff.

# Bounded future migration clusters

## G1 — presentation/documentation copy

Signthos-owned display text only. Low risk only when machine identifiers and behavior are proven unchanged. No provenance/legal/source/persistence/protocol changes.

## G2 — internal package/module/binary identifiers

Compatibility-sensitive. Future work must inventory scripts/imports/deployments/external use and define rollback/alias behavior.

## G3 — config/environment/CLI machine keys

Behavior-affecting. Requires canonical+legacy alias lifecycle, deterministic precedence, tests, and non-secret deprecation evidence.

## G4 — persistence identifiers

Owned by 003F/separately authorized migration. Never combine with broad product rename.

## G5 — API/webhook/SDK/plugin/protocol identifiers

Owned by Specification 009/later public-interface work. Presentation labels cannot silently change wire identity.

## G6 — upstream/provenance/legal identities

No cosmetic migration. Preserve exact.

## G7 — imported source literals

No cosmetic migration absent exact source/provenance plus owning implementation authority.

# Alias and deprecation contract

A compatibility alias is a temporary adapter, not a second canonical semantic identity.

```text
CANONICAL_IDENTIFIER_DEFINED
LEGACY_ALIAS_ACCEPTED
ONE_CANONICAL_SEMANTIC_RESULT
CONFLICT_PRECEDENCE_DEFINED
DEPRECATION_OBSERVABLE_WITHOUT_SECRET_LEAKAGE
REMOVAL_CRITERIA_PROVEN
LEGACY_ALIAS_REMOVED
```

Rules:

1. aliases cannot produce divergent domain semantics;
2. conflicting old/new security-sensitive values are resolved deterministically and fail closed where ambiguity could weaken safety;
3. aliases cannot silently select network processing, weaker auth, broader permissions, or weaker resource limits;
4. telemetry/logging cannot expose document bytes, credentials, secrets, recipient data, or protected identifiers;
5. historical/provenance/legal identities are not aliases and have no cosmetic deprecation lifecycle;
6. persistence aliases remain owned by persistence migration work.

# Product-family naming contract

Canonical candidate family:

```text
Signthos Web
Signthos Desktop
Signthos Mobile
Signthos Server
Signthos Cloud
Signthos API
Signthos SDK
Signthos Embed
Signthos CLI
Signthos Verify
```

These are planning names only. They do not prove implementation, release, registry availability, or legal clearance.

# Naming and provenance separation

Invalid transformation when text describes source origin:

```text
documenso/documenso -> TheHalfMoon/Signthos
```

Correct simultaneous truths:

```text
product identity = Signthos
source provenance identity = documenso/documenso@<exact commit>
```

The same principle applies to `@documenso/prisma`, `@documenso/lib`, source paths, hashes, and provenance records.

# Adversarial qualification cases

| Case | Unsafe shortcut | Required outcome |
| --- | --- | --- |
| G-A01 | Global replace `Documenso` with `Signthos`. | Reject; corrupts provenance/history/legal/source identity. |
| G-A02 | Rename `@documenso/lib` inside imported Prisma source. | Reject absent cumulative source/provenance plus owning implementation authority. |
| G-A03 | Treat Prisma schema as only `PERSISTENCE_IDENTIFIER` and ignore imported-source constraints. | Reject; cumulative constraints all apply. |
| G-A04 | Rename imported Prisma models/fields during product branding cleanup. | Reject; persistence migration is separate. |
| G-A05 | Rename `.npmrc` settings under brand authority. | Reject; exact imported config and no brand seam. |
| G-A06 | Prefix every domain type with `Signthos`. | Reject; domain language remains stable/unbranded. |
| G-A07 | Remove a legacy config key immediately after introducing a new one without compatibility evidence. | Reject. |
| G-A08 | Accept old/new sensitive keys without deterministic conflict precedence. | Reject. |
| G-A09 | Let an alias silently switch local-only work to a network provider. | Reject. |
| G-A10 | Use a UI rename to rename API/webhook/provider capability IDs. | Reject; owner-spec boundary. |
| G-A11 | Rename provenance record IDs or historical Spec002 evidence to look Signthos-native. | Reject. |
| G-A12 | Rewrite NOTICE/license identities to match branding. | Reject. |
| G-A13 | Publish planned product-family names as implemented features. | Reject. |
| G-A14 | Rename a package/binary without external-use inventory. | Reject. |
| G-A15 | Rename persisted config without persistence compatibility evidence. | Reject. |
| G-A16 | Log secret old/new values as migration evidence. | Reject. |
| G-A17 | Rewrite a source literal while provenance still claims exact copy. | Reject. |
| G-A18 | Combine rename, schema migration, source import, provider behavior, and feature work. | Reject; violates bounded-grain separation. |

# Evidence required for any future implementation

A separately authorized naming/config implementation must record, as applicable:

- exact old/new identifier;
- primary role and every cumulative constraint;
- consuming repository/external surfaces;
- compatibility/alias lifecycle and conflict precedence;
- security/privacy/provider/locality impact;
- persistence impact;
- source/provenance/license impact;
- rollback strategy;
- focused and regression tests for canonical and legacy paths;
- exact-head review and merge/post-merge evidence.

No such implementation is authorized by 003G.

# Deferred ownership

003G explicitly defers:

- persistence changes to 003F/separately authorized migration;
- public API/webhook/SDK/plugin wire naming to Specification 009/later owners;
- provider/capability machine identity to 003E/separately authorized provider implementation;
- signing/evidence/trust behavior to Specification 005/later owners;
- PDF capability behavior to Specification 004/010 or successors;
- visual identity implementation to later bounded design/product work;
- trademark/domain/app-store/package-registry clearance to explicit pre-launch work;
- imported-source changes to provenance/import governance plus owning implementation authority;
- NOTICE/license/provenance changes to exact evidence/legal governance;
- feature implementation of any named product surface.

# Qualification acceptance criteria

003G is acceptable only if fresh independent exact-head review confirms:

1. Signthos is the canonical working product name without legal-clearance inflation;
2. domain terms remain stable and generally unbranded;
3. classification is cumulative: a primary role plus all applicable constraints;
4. the Prisma schema and its `@documenso/lib` literals retain persistence **and** imported-source/provenance protections simultaneously;
5. historical/upstream/provenance/legal identities are preserved exactly;
6. `.npmrc` and imported Prisma source are classified without mutation;
7. live repository truth supports no current broad rename/config migration implementation;
8. alias/deprecation/conflict rules remain deterministic and security-safe;
9. persistence/public-interface/provider/signing/source/legal owners remain separate;
10. product-family names do not imply implementation/release availability;
11. no 003H or Specification 004 authority is consumed;
12. the exact diff contains only Signthos-authored planning/mapping material with zero upstream-derived bytes.

# Qualification workflow

1. branch from exact canonical `main@2a4acb8d788b24ecd2034b8f1b00faf7dbca55b7`;
2. change only bounded 003G planning/mapping material;
3. self-audit canonical brand/import/provenance/config surfaces and 003A–003F ownership;
4. open one bounded PR;
5. account truthfully for Actions/statuses/provider limits;
6. obtain fresh independent substantive review of the complete exact candidate;
7. repair every material finding forward-only and re-review the resulting exact head;
8. require zero unresolved material review threads;
9. record exact-head pre-merge proof;
10. merge only with exact `expected_head_sha`;
11. verify merge tree equality, ordered parents, signature, changed surface, Actions/statuses, and canonical main;
12. derive 003H authority only from a fresh post-003G canonical reread.

Until all merge/post-merge gates succeed:

```text
003G_STATUS = QUALIFICATION_CANDIDATE_ONLY
003G_IMPLEMENTATION_AUTHORITY = ABSENT
003H_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```
