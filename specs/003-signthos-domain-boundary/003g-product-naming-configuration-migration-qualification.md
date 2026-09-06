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

003G exists to prevent a broad cosmetic rename from corrupting provenance, external compatibility, persistence semantics, legal evidence, provider identity, or later protocol contracts.

The canonical repository already uses `Signthos` as the product name. Therefore 003G is not a `Documenso -> Signthos` search-and-replace plan. It is a classification and compatibility contract that determines which names are product-facing and changeable, which are stable domain names, which may need aliases later, and which historical/upstream/legal literals must remain exact.

003G does not rename any product surface or mutate any configuration.

## Canonical brand facts consumed without reopening

Canonical `README.md` names the product `Signthos` and describes planned surfaces including:

```text
Signthos Web
Signthos Desktop
Signthos Mobile
Signthos Server
Signthos SDK
Signthos Embed
Signthos CLI
Signthos Verify
```

Canonical `docs/foundation/BRAND-PRODUCT-LANGUAGE.md` records:

- brand name: `Signthos`;
- primary tagline: `Open documents. Open signing. Everywhere.`;
- canonical candidate product family including `Signthos Cloud` and `Signthos API` in addition to the surfaces above;
- trademark/domain clearance remains a separate pre-launch task;
- technical code symbols should prefer stable domain language rather than unnecessary brand prefixes;
- visual identity must avoid confusion with Documenso, Stirling, or DocuSign.

003G consumes those brand-language decisions as planning inputs. It does not claim trademark clearance, domain ownership, package-registry availability, app-store availability, or release readiness.

# Naming classes

Every naming/configuration seam must be assigned one of these classes before a future implementation can change it.

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

## `CANONICAL_SIGNTHOS_PRODUCT_NAME`

Use for the product family and owned presentation surfaces.

Rules:

1. the canonical working product brand is `Signthos`;
2. product-family names use one coherent brand rather than a different brand for every subsystem;
3. brand use does not imply trademark/domain clearance;
4. no later implementation may claim upstream affiliation or confusing visual identity merely because upstream code or references exist;
5. a future product rename would require a separately qualified successor; 003G does not authorize one.

## `CANONICAL_DOMAIN_LANGUAGE`

Use for stable semantic symbols such as:

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

Rules:

1. stable domain terminology is not branded by default;
2. do not mechanically prefix domain symbols with `Signthos`;
3. do not mechanically rename canonical domain terms to legacy upstream names;
4. transport, persistence, provider, and UI aliases must map into canonical domain language rather than redefine it.

## `PRODUCT_PRESENTATION_NAME`

Use for user-facing labels, titles, marketing copy, menu names, app names, documentation headings, and installable-product display names owned by Signthos.

A future change may be cosmetic only if it does not change:

- stable machine identifiers;
- configuration keys;
- stored data;
- package coordinates;
- API/webhook wire names;
- provider identities;
- provenance/legal records;
- external links relied on for compatibility.

## `INTERNAL_IMPLEMENTATION_IDENTIFIER`

Use for future Signthos-owned package names, module names, binary names, crate names, process names, internal service names, internal config section names, and code-only symbols that are not external compatibility contracts.

Rules:

- internal names may be normalized only when their external exposure has been disproven;
- package/binary names are compatibility-sensitive if scripts, deployment manifests, users, plugins, or external tooling invoke them;
- no internal rename may be bundled with feature implementation or persistence migration merely for convenience.

## `CONFIG_KEY_COMPATIBILITY_SENSITIVE`

Use for environment variables, config-file keys, command-line flags, persisted preferences, service names, ports/URLs encoded under stable keys, and deployment parameters.

Rules:

1. changing a config key is behavior-affecting even when the value semantics are unchanged;
2. silent key replacement is prohibited where deployed users may still supply the old key;
3. a future migration normally follows `ADD_NEW -> DUAL_ACCEPT -> DEPRECATE -> REMOVE` with explicit precedence and conflict handling;
4. secrets must not be copied into logs or migration evidence merely to prove alias use;
5. a config-key alias may not weaken authorization, locality, provider, privacy, or security semantics.

## `EXTERNAL_COMPATIBILITY_IDENTIFIER`

Use for future public API paths/fields, webhook event codes, SDK namespaces, plugin identifiers, package coordinates, CLI binary/flag names relied on externally, provider identifiers, import/export formats, app URLs, protocol identifiers, and durable integration keys.

Rules:

- presentation renames do not change these identifiers implicitly;
- deprecation needs explicit compatibility evidence and an owning specification;
- an alias must preserve one canonical semantic meaning rather than create two divergent behaviors;
- wire/protocol identifiers belong to their owning specifications and cannot be changed by cosmetic 003G implementation work.

## `PERSISTENCE_IDENTIFIER`

Use for table/model/column/index/constraint/migration/storage identifiers and legacy persistence aliases.

Rules:

1. persistence identifiers are governed by 003F and any separately authorized migration work;
2. changing them is not a cosmetic brand operation;
3. do not combine persistence rename with broad product naming migration;
4. imported Prisma identifiers remain exact until a separately authorized persistence migration establishes a compatibility path.

## `UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT`

Use for upstream repository names, commits, blobs, paths, package identities, provenance record IDs, source references, review evidence, and historical qualification text.

Examples include:

```text
documenso/documenso
Stirling-Tools/Stirling-PDF
@documenso/prisma
@documenso/lib
exact upstream commit IDs
exact source paths and blob IDs
```

Rules:

- these are source identities, not legacy Signthos branding;
- never search-and-replace them to `Signthos`;
- preserving them is necessary for auditability and source truth;
- historical Spec002 documents remain historical evidence even after Signthos product identity matures.

## `IMPORTED_SOURCE_LITERAL_PRESERVE_EXACT`

Use for literals inside exact imported artifacts.

Current canonical examples:

- `packages/prisma/schema.prisma`, including its `@zod.import` references to `@documenso/lib/...`;
- `.npmrc`, which is an exact imported configuration artifact and currently contains only package-manager behavior settings.

Rules:

1. 003G may classify these literals but cannot edit them;
2. an imported literal is not renamed merely because it names upstream technology;
3. changing an exact imported byte requires the appropriate source/provenance and, when relevant, persistence/config authority;
4. source-derived replacements must retain required provenance/license obligations.

## `LEGAL_LICENSE_IDENTITY_PRESERVE_EXACT`

Use for SPDX identifiers, copyright/attribution text, license names, rights evidence, NOTICE entries, and legal-source identity.

Rules:

- never cosmetic-rename legal identities;
- trademark/product naming does not rewrite source-license evidence;
- unresolved or conflicting rights evidence remains recorded as such rather than being normalized away.

## `GOVERNANCE_IDENTIFIER_PRESERVE`

Use for canonical specification IDs, task/grain IDs, evidence IDs, commit hashes, PR/issue references, provenance schema versions, governance tool command names, and machine-readable control-plane identifiers.

Presentation text may describe these identifiers, but their machine identity is not product branding.

# Current canonical repository seam inventory

The current repository is foundation/governance heavy and contains no imported application codebase requiring a broad rename.

## Root product surfaces

| Surface | Current truth | Class | 003G disposition |
| --- | --- | --- | --- |
| `README.md` | Product heading and prose already use `Signthos`; upstream projects appear only as research/source references. | `CANONICAL_SIGNTHOS_PRODUCT_NAME` plus provenance references | No migration required now. Preserve upstream names where they identify references. |
| `ROADMAP.md` | Signthos-owned roadmap/governance planning. | `CANONICAL_SIGNTHOS_PRODUCT_NAME` / `GOVERNANCE_IDENTIFIER_PRESERVE` | No broad rename. Future copy edits remain bounded documentation work. |
| `docs/foundation/**` | Signthos foundation plans, including explicit brand/product language. | Product planning / canonical domain language | Preserve current Signthos naming; do not reinterpret competitor names as rename targets. |
| `AGENTS.md` | Repository governance/agent instructions. | `GOVERNANCE_IDENTIFIER_PRESERVE` | Not a product-brand migration surface. |
| `.specify/**` | Canonical specification governance and templates. | `GOVERNANCE_IDENTIFIER_PRESERVE` | Not a cosmetic rename surface. |
| `.github/workflows/provenance.yml` | Provenance qualification workflow. | `GOVERNANCE_IDENTIFIER_PRESERVE` | Workflow identity is governance tooling; changes require workflow/governance authority, not brand cleanup. |
| `tools/provenance/**` | `signthos-provenance` control-plane tooling. | `INTERNAL_IMPLEMENTATION_IDENTIFIER` with documented CLI compatibility | Treat command/binary name as compatibility-sensitive if later changed; no current rename need. |

## Imported/config surfaces

| Surface | Current truth | Class | 003G disposition |
| --- | --- | --- | --- |
| `.npmrc` | Exact imported file; content is `legacy-peer-deps`, `prefer-dedupe`, and `min-release-age` settings with no product brand. | `IMPORTED_SOURCE_LITERAL_PRESERVE_EXACT` | No naming migration; do not mutate under 003G. |
| `packages/prisma/schema.prisma` | Exact imported Prisma schema, sole file under `packages/`; includes upstream package literals in `@zod.import`. | `IMPORTED_SOURCE_LITERAL_PRESERVE_EXACT` + `PERSISTENCE_IDENTIFIER` | No search/replace. Any future identifier change is persistence/source work, not cosmetic naming. |

## Historical/provenance surfaces

| Surface | Current truth | Class | 003G disposition |
| --- | --- | --- | --- |
| `specs/002-documenso-brownfield-baseline/**` | Historical exact qualification of Documenso source candidates/imports and rights evidence. | `UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT` | Preserve `Documenso`, `documenso/documenso`, package names, paths, hashes, and rights evidence exactly. |
| `provenance/**` | Machine-readable source, qualification, import, permission, license, and evidence records. | `UPSTREAM_PROVENANCE_IDENTITY_PRESERVE_EXACT` / `GOVERNANCE_IDENTIFIER_PRESERVE` | No cosmetic rename of source IDs or record IDs. |
| `NOTICE` | Generated/controlled attribution record. | `LEGAL_LICENSE_IDENTITY_PRESERVE_EXACT` | Never product-search-and-replace. Changes require provenance/legal truth. |
| `LICENSES/**` | License texts/evidence. | `LEGAL_LICENSE_IDENTITY_PRESERVE_EXACT` | Never product-search-and-replace. |

## Domain specification surfaces

`specs/003-signthos-domain-boundary/**` owns canonical semantic language.

Its terms are not legacy branding and should not be prefixed merely to expose product identity.

Examples:

```text
DocumentRevision        preferred stable domain term
Envelope                preferred stable domain term
EvidenceBundle          preferred stable domain term
SignthosDocumentRevision unnecessary brand coupling
SignthosEnvelope         unnecessary brand coupling
```

# Bounded future migration clusters

A future naming/config implementation must select one bounded cluster. Combining unrelated clusters requires separate authority.

## G1 — Signthos-owned presentation/documentation copy

Potential future surface:

- product display titles;
- documentation headings;
- screenshots/marketing copy;
- non-machine-readable UI labels.

Risk class: low only when machine identifiers and behavior are provably unchanged.

Prohibitions:

- no provenance/legal edits;
- no source-derived literal rewrites;
- no package/config/API/persistence identifier changes;
- no unsupported capability/release claims.

## G2 — Signthos-owned internal package/module/binary identifiers

Potential future surface:

- package/module/crate names;
- internal executable/process/service names;
- internal namespaces.

Risk class: compatibility-sensitive.

Before change, later implementation must prove:

- whether users/scripts invoke the old identifier;
- package-registry/container/app-store implications;
- import paths and workspace references;
- deployment/service discovery references;
- rollback/alias strategy.

Current disposition: no broad application/package surface exists to migrate now.

## G3 — Configuration keys and environment variables

Potential future surface:

- environment variables;
- config-file keys;
- CLI flags;
- deployment settings;
- persisted preferences.

Risk class: behavior-affecting.

Required future sequence unless a stricter owner spec applies:

```text
INTRODUCE_CANONICAL_KEY
ACCEPT_LEGACY_ALIAS
DEFINE_PRECEDENCE_ON_CONFLICT
EMIT_NON_SECRET_DEPRECATION_SIGNAL
MEASURE_COMPATIBILITY_IF_AUTHORIZED
REMOVE_ONLY_AFTER_EXPLICIT_WINDOW_AND_EVIDENCE
```

Current disposition: there is no application configuration surface to rename; `.npmrc` is an imported exact artifact and is not a candidate.

## G4 — Persistence identifiers

Owned by 003F/separately authorized persistence migration.

Examples:

- Prisma model names;
- columns/relations/enums;
- database tables/indexes/constraints;
- migration names;
- storage key formats.

003G classification: `DEFER_OWNER_SPEC`.

Never combine G4 with a broad product rename.

## G5 — Public API/webhook/SDK/plugin/protocol identifiers

Owned by Specification 009/later public interface work and relevant integration specifications.

003G may require those owners to distinguish presentation names from stable wire identifiers but cannot define or rename future wire contracts prematurely.

## G6 — Upstream/provenance/legal identities

No cosmetic migration is permitted.

Examples:

- upstream repository names;
- package names used as source evidence;
- source paths/commits/blobs;
- provenance record IDs;
- NOTICE/license identifiers;
- historical review/qualification evidence.

Disposition: preserve exact.

## G7 — Imported source literals

No cosmetic migration is permitted absent exact source/provenance plus owning implementation authority.

Current imported Prisma literals are an explicit example.

# Alias and deprecation contract

A compatibility alias is a temporary adapter, not a second canonical identity.

## General lifecycle

A future compatibility-sensitive rename normally follows:

```text
CANONICAL_NEW_IDENTIFIER_DEFINED
LEGACY_IDENTIFIER_ACCEPTED_AS_ALIAS
ONE_CANONICAL_SEMANTIC_RESULT
CONFLICT_PRECEDENCE_DEFINED
DEPRECATION_STATE_OBSERVABLE_WITHOUT_SECRET_LEAKAGE
REMOVAL_CRITERIA_PROVEN
LEGACY_IDENTIFIER_REMOVED
```

Rules:

1. aliases cannot produce divergent domain semantics;
2. if legacy and new keys are supplied with conflicting values, behavior must be deterministic and fail closed where security/privacy/provider locality could change;
3. aliases do not authorize silent network transitions, weaker auth, weaker resource limits, or broader permissions;
4. deprecation logging/telemetry may not leak document bytes, credentials, secrets, recipient data, or protected identifiers;
5. alias removal requires evidence that the relevant compatibility window and owner-spec requirements were satisfied;
6. historical/provenance/legal identities are not aliases and have no cosmetic deprecation lifecycle.

## Documentation aliases

Human-readable terminology may explain former names where migration actually occurred, but documentation must not imply that an upstream source identity itself was renamed or owned by Signthos.

## Persistence aliases

Persistence aliases or compatibility columns/tables belong to 003F implementation/migration authority. 003G cannot create them.

# Product family naming contract

The current canonical candidate family is:

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

Rules:

1. these are planning/product-family names, not proof the products are implemented or released;
2. do not invent independent subsystem brands without a product reason and separate qualification;
3. code-level domain types remain unbranded where stable domain terminology suffices;
4. public package/binary coordinates, when later selected, require availability and compatibility qualification rather than assuming display names can be used verbatim;
5. trademark/domain/app-store/package-registry clearance is outside 003G and remains a pre-launch/owning-work requirement.

# Configuration naming contract

Future configuration must distinguish:

```text
DISPLAY_LABEL
CANONICAL_MACHINE_KEY
LEGACY_ALIAS
SECRET_VALUE
DEFAULT_VALUE
SOURCE_OF_VALUE
```

This is a semantic distinction, not a wire/schema definition.

Rules:

- display labels can be localized without changing machine keys;
- secret values are never embedded in names or evidence;
- environment/config aliases must have explicit precedence;
- defaults cannot silently change when a key is renamed;
- machine keys involving provider/locality/security semantics cannot be renamed through cosmetic UI work;
- persisted config-key migration is persistence work when storage changes are required.

# Naming and provenance separation

The following transformation is explicitly invalid:

```text
source identity: documenso/documenso
cosmetic replacement: TheHalfMoon/Signthos
```

when the text is describing where imported or evaluated source originated.

The correct model is:

```text
product identity: Signthos
source/provenance identity: documenso/documenso@<exact commit>
```

Both can be true simultaneously.

Similarly, `@documenso/prisma` or `@documenso/lib` in historical rights/dependency evidence remain exact upstream package identities even if future Signthos-owned packages use different coordinates.

# Adversarial qualification cases

| Case | Unsafe naming/config shortcut | Required outcome |
| --- | --- | --- |
| G-A01 | Global replace `Documenso` with `Signthos` across the repository. | Reject; corrupts provenance/history/legal/source identity. |
| G-A02 | Rename `@documenso/lib` literals inside imported `schema.prisma` because Signthos is the product name. | Reject; exact imported source mutation and unresolved dependency/source ownership. |
| G-A03 | Rename imported Prisma models/fields during product branding cleanup. | Reject; persistence migration is separate 003F-owned work. |
| G-A04 | Rename `.npmrc` settings under product-brand authority. | Reject; no naming seam exists and exact imported config mutation is unauthorized. |
| G-A05 | Prefix every domain type with `Signthos`. | Reject; canonical domain language remains stable and brand-independent. |
| G-A06 | Remove an old environment variable immediately after introducing a new branded key. | Reject unless separate implementation authority proves no compatibility window is required. |
| G-A07 | Accept both old/new security-sensitive config keys without conflict precedence. | Reject. |
| G-A08 | Let a legacy alias select a network provider when canonical config requires local-only execution. | Reject as semantic/security drift. |
| G-A09 | Treat a UI label rename as authority to rename API/webhook event codes. | Reject; public wire contracts have separate owners. |
| G-A10 | Treat a UI label rename as authority to rename provider IDs/capability codes. | Reject; 003E semantics and later implementation ownership remain separate. |
| G-A11 | Rename provenance record IDs to make them look Signthos-native. | Reject; evidence identity must remain stable. |
| G-A12 | Rewrite NOTICE/license names to match current product branding. | Reject. |
| G-A13 | Rename historical Spec002 titles/references so upstream heritage is less visible. | Reject; historical evidence is immutable in meaning. |
| G-A14 | Publish `Signthos Cloud` or `Signthos Verify` as an available capability merely because the product family name exists. | Reject; naming is not implementation/release evidence. |
| G-A15 | Introduce distinct brands for server, CLI, verifier, and SDK solely because they are separate technical components. | Reject absent separate product justification. |
| G-A16 | Rename package/binary identifiers without checking scripts/imports/deployments/external users. | Reject; compatibility-sensitive. |
| G-A17 | Rename a persisted config key without data migration/dual-read evidence. | Reject; defer to persistence/config implementation owner. |
| G-A18 | Log old/new secret values to prove config migration. | Reject as sensitive-data leakage. |
| G-A19 | Rename a source-derived literal while leaving its provenance record claiming `COPY_EXACT`. | Reject; destroys provenance truth. |
| G-A20 | Combine broad rename, provider feature change, schema migration, and source import in one PR. | Reject; violates bounded-grain separation. |

# Current 003G implementation disposition

The live canonical repository does not contain a broad imported application codebase, runtime app manifest, environment-variable surface, or deployed package set that needs immediate product rename implementation.

Current product-facing documentation already uses `Signthos`.

The only `packages/` content is the exact imported Prisma schema, which is deliberately not a cosmetic rename target.

Therefore:

```text
CURRENT_BROAD_RENAME_NEEDED = NO
CURRENT_CONFIG_KEY_MIGRATION_NEEDED = NO_EVIDENCE
CURRENT_IMPORTED_SOURCE_RENAME_NEEDED = NO
CURRENT_PERSISTENCE_RENAME_NEEDED = NO_AUTHORITY_AND_NO_003G_JUSTIFICATION
CURRENT_003G_IMPLEMENTATION_CHANGE_REQUIRED = NO
```

This is a positive convergence result, not a reason to invent implementation work.

Future Signthos-owned application/package surfaces should adopt canonical Signthos product naming and stable domain language from inception so a later cosmetic fork-style rename is unnecessary.

# Evidence required for any future naming/config implementation

A later authorized implementation must record, as applicable:

- exact old and new identifiers;
- identifier class from this contract;
- all repository paths and external surfaces that consume the identifier;
- proof whether the identifier is user/public/machine/persistence/provenance exposed;
- compatibility and alias lifecycle;
- conflict precedence;
- security/privacy/provider/locality effect analysis;
- persistence impact;
- source/provenance/license impact;
- rollback plan;
- focused and regression tests for both canonical and legacy paths while aliases exist;
- exact-head review and merge/post-merge evidence.

No such implementation is authorized by this planning grain.

# Deferred ownership

003G explicitly defers:

- Prisma/table/model/column/data migration to 003F/separately authorized persistence work;
- public API/webhook/SDK/plugin/wire naming to Specification 009/later owners;
- provider/capability machine identity to 003E and separately authorized provider implementation;
- signing/evidence/trust terminology with behavioral consequences to Specification 005/later owners;
- PDF capability naming tied to actual implemented behavior to Specification 004/010 or their successors;
- visual identity implementation to later bounded design/product work;
- trademark/domain/app-store/package-registry clearance to explicit pre-launch/owning work;
- imported source literal changes to provenance/import governance plus the owning implementation specification;
- NOTICE/license/provenance changes to exact evidence/legal governance;
- feature implementation of any named product surface.

# Qualification acceptance criteria

003G is substantively acceptable only if independent exact-head review confirms all of the following:

1. `Signthos` is treated as the canonical working product name without claiming legal clearance;
2. canonical domain terms remain stable and unbranded where appropriate;
3. historical/upstream/provenance/legal identities containing `Documenso`, `Stirling`, `@documenso/*`, hashes, paths, or record IDs are preserved rather than treated as branding debt;
4. exact imported `.npmrc` and `packages/prisma/schema.prisma` are classified without mutation;
5. current repository truth supports the conclusion that no broad product/config rename implementation is required now;
6. presentation, internal, config, external, persistence, provenance, imported-source, legal, and governance identifiers remain distinct classes;
7. future compatibility-sensitive aliases have deterministic, security-safe lifecycle and conflict semantics;
8. persistence identifiers remain owned by 003F/separately authorized migration work;
9. future API/webhook/provider identifiers remain owned by their respective specifications;
10. product-family names do not claim implementation/release availability;
11. no source/provenance/legal/history is rewritten to obscure upstream heritage;
12. no 003H or Specification 004 authority is consumed;
13. the exact diff contains only one Signthos-authored planning/mapping artifact with zero upstream-derived bytes.

# Qualification workflow

For this grain:

1. branch from exact canonical `main@2a4acb8d788b24ecd2034b8f1b00faf7dbca55b7`;
2. add only this planning/mapping artifact;
3. self-audit against README, canonical brand language, exact imported/config surfaces, provenance/history, and 003A–003F ownership boundaries;
4. open one bounded PR;
5. account truthfully for applicable Actions/statuses/provider limits;
6. obtain fresh independent substantive exact-head review of the complete candidate;
7. repair every material finding forward-only and re-review the resulting exact head;
8. require zero unresolved material review threads;
9. record exact-head pre-merge proof;
10. merge only with exact `expected_head_sha`;
11. verify merge tree equality, ordered parents, signature, exact changed surface, Actions/statuses, and canonical main after merge;
12. derive 003H authority only from a fresh post-003G canonical reread.

Until all merge and post-merge gates succeed:

```text
003G_STATUS = QUALIFICATION_CANDIDATE_ONLY
003G_IMPLEMENTATION_AUTHORITY = ABSENT
003H_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```
