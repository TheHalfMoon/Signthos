# Specification 004C1K — Published Peer and Optional Registry Parity Qualification

Status: `QUALIFICATION_CANDIDATE / PUBLIC_REGISTRY_METADATA_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `45c9aa4d7e864e68593406c2eba0588f910ed4c8`
Authority source: `github:issue-comment:5573678962`

## 1. Purpose and authority boundary

004C1K closes the smallest unresolved metadata prerequisite left by canonical 004C1J before any future dependency-declaration or resolver-input content may be frozen: exact published npm peer/optional metadata parity for the selected 18-package 004C browser-provider set.

```text
004C1K_AUTHORITY = PUBLIC_REGISTRY_METADATA_QUALIFICATION_ONLY
004C1K_ALLOWED_SURFACE = specs/004-local-pdf-core/**
004C1K_PUBLIC_NPM_VERSION_DOCUMENT_RESEARCH_AUTHORITY = PRESENT
004C1K_PINNED_UPSTREAM_COMPARISON_AUTHORITY = PRESENT
004C1K_PEER_OPTIONAL_PARITY_QUALIFICATION_AUTHORITY = PRESENT
004C1K_IMPLEMENTATION_AUTHORITY = ABSENT
004C1K_PACKAGE_MANAGER_EXECUTION_AUTHORITY = ABSENT
004C1K_NODE_COREPACK_RESOLVER_EXECUTION_AUTHORITY = ABSENT
004C1K_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1K_DEPENDENCY_ACQUISITION_INSTALL_AUTHORITY = ABSENT
004C1K_PACKAGE_MANIFEST_WORKSPACE_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1K_PACKAGE_ARCHIVE_DOWNLOAD_IMPORT_AUTHORITY = ABSENT
004C1K_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1K_PROVIDER_PDF_RUNTIME_AUTHORITY = ABSENT
004C1L_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

No package-control byte, package archive, source file, binary, fixture, lockfile, cache, provenance record, NOTICE/SBOM record, workflow, container, database, provider, or PDF runtime surface is changed by this grain.

## 2. Canonical predecessor truth consumed without reopening

Canonical 004C1I established the exact dependency-only declared registry closure for the selected roots and 18 exact reachable package identities.

Canonical 004C1J then established the pinned-source peer/optional structure at immutable EmbedPDF source revision:

```text
repository = https://github.com/embedpdf/embed-pdf-viewer
release = v2.15.0
sourceRevision = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
```

004C1J canonically established:

```text
SELECTED_PACKAGE_IDENTITY_COUNT = 18
PINNED_SOURCE_PEER_BEARING_PACKAGE_COUNT = 9
PINNED_SOURCE_NON_PEER_PACKAGE_COUNT = 9
UNIQUE_FRAMEWORK_PEER_NAMES = 5
SOURCE_FRAMEWORK_PEER_ENTRY_COUNT = 45
PINNED_SOURCE_INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
PINNED_SOURCE_OPTIONAL_DEPENDENCIES_FIELDS_OBSERVED = 0
PINNED_SOURCE_PEER_DEPENDENCIES_META_FIELDS_OBSERVED = 0
PUBLISHED_REGISTRY_PEER_RANGE_PARITY = UNPROVEN
PUBLISHED_REGISTRY_PEER_META_PARITY = UNPROVEN
PUBLISHED_REGISTRY_OPTIONAL_PARITY = UNPROVEN
```

004C1K exists only to qualify those last three parity states. It does not reopen package-manager or resolver policy.

## 3. Resolver policy that makes parity material

Canonical 004C1G selected the future resolver planning direction:

```text
PACKAGE_MANAGER_FAMILY = pnpm
PACKAGE_MANAGER_VERSION = 10.34.5
RESOLVER_NODE_BASELINE = 24.20.0_LTS
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
COREPACK_POLICY = NOT_USED
```

Canonical 004C1H requires exact peer-affecting inputs before any future resolver execution and prohibits ambient or automatic peer satisfaction.

Therefore the exact published peer fields are not advisory metadata. They are resolver-critical declaration evidence. A source `workspace:*` relationship cannot be converted into a root dependency declaration by guesswork.

## 4. Exact selected identity set

The parity scope is exactly the canonical 18 identities from 004C1I/004C1J:

```text
@embedpdf/core@2.15.0
@embedpdf/engines@2.15.0
@embedpdf/models@2.15.0
@embedpdf/pdfium@2.15.0
@embedpdf/plugin-document-manager@2.15.0
@embedpdf/plugin-render@2.15.0
@embedpdf/plugin-thumbnail@2.15.0
@embedpdf/plugin-search@2.15.0
@embedpdf/plugin-selection@2.15.0
@embedpdf/plugin-interaction-manager@2.15.0
@embedpdf/utils@2.15.0
@embedpdf/fonts-arabic@1.0.0
@embedpdf/fonts-hebrew@1.0.0
@embedpdf/fonts-jp@1.0.0
@embedpdf/fonts-kr@1.0.0
@embedpdf/fonts-latin@1.0.0
@embedpdf/fonts-sc@1.0.0
@embedpdf/fonts-tc@1.0.0
```

No additional package becomes part of the canonical selected dependency-only set merely because a peer name appears in published metadata.

## 5. Pinned-source reference map

The exact pinned-source peer-bearing packages are:

```text
@embedpdf/core@2.15.0
@embedpdf/engines@2.15.0
@embedpdf/plugin-document-manager@2.15.0
@embedpdf/plugin-render@2.15.0
@embedpdf/plugin-thumbnail@2.15.0
@embedpdf/plugin-search@2.15.0
@embedpdf/plugin-selection@2.15.0
@embedpdf/plugin-interaction-manager@2.15.0
@embedpdf/utils@2.15.0
```

The common pinned-source framework peer ranges are:

```text
preact = ^10.26.4
react = >=16.8.0
react-dom = >=16.8.0
svelte = >=5 <6
vue = >=3.2.0
```

Pinned-source internal peer edges are:

```text
@embedpdf/plugin-document-manager -> @embedpdf/core = workspace:*
@embedpdf/plugin-render -> @embedpdf/core = workspace:*
@embedpdf/plugin-thumbnail -> @embedpdf/core = workspace:*
@embedpdf/plugin-thumbnail -> @embedpdf/plugin-render = workspace:*
@embedpdf/plugin-search -> @embedpdf/core = workspace:*
@embedpdf/plugin-selection -> @embedpdf/core = workspace:*
@embedpdf/plugin-selection -> @embedpdf/plugin-interaction-manager = workspace:*
@embedpdf/plugin-interaction-manager -> @embedpdf/core = workspace:*
```

The source protocol value `workspace:*` is publication input, not proof of the serialized npm peer range.

## 6. Current public published-package corroboration

Read-only public evidence from npm-generated lockfiles in independent public repositories records installed registry package entries for exact `@embedpdf/*@2.15.0` artifacts and corroborates that publication transformed internal source-workspace peer relationships into exact `2.15.0` peer ranges.

Observed corroborating examples include:

```text
@embedpdf/plugin-thumbnail@2.15.0 peerDependencies:
  @embedpdf/core = 2.15.0
  @embedpdf/plugin-render = 2.15.0
  preact = ^10.26.4
  react = >=16.8.0
  react-dom = >=16.8.0
  svelte = >=5 <6
  vue = >=3.2.0
```

and:

```text
@embedpdf/plugin-selection@2.15.0 peerDependencies:
  @embedpdf/core = 2.15.0
  @embedpdf/plugin-interaction-manager = 2.15.0
  preact = ^10.26.4
  react = >=16.8.0
  react-dom = >=16.8.0
  svelte = >=5 <6
  vue = >=3.2.0
```

Public lockfile entries also corroborate the same framework ranges for `@embedpdf/core@2.15.0`.

Some corroborating lockfile entries bind the package to `https://registry.npmjs.org/@embedpdf/...` tarball URLs and registry integrity fields, which supports that the lockfile metadata describes installed npm registry artifacts rather than the pinned source workspace directly.

This evidence is useful but remains secondary derived evidence. It is not promoted to authoritative npm version-document evidence.

```text
PUBLIC_LOCKFILE_PEER_RANGE_CORROBORATION = PRESENT
PUBLIC_LOCKFILE_INTERNAL_WORKSPACE_TRANSFORMATION_CORROBORATION = EXACT_2_15_0_OBSERVED
AUTHORITATIVE_NPM_VERSION_DOCUMENT_PEER_PARITY = PENDING_DIRECT_VERIFICATION
```

## 7. Published framework parity candidate

The current evidence supports the following candidate hypothesis for the nine peer-bearing package records:

```text
PUBLISHED_FRAMEWORK_PEER_CANDIDATE = {
  preact: ^10.26.4,
  react: >=16.8.0,
  react-dom: >=16.8.0,
  svelte: >=5 <6,
  vue: >=3.2.0
}
```

The hypothesis matches the pinned source and public npm-generated lockfile observations.

It remains `CANDIDATE_CORROBORATED`, not `DIRECTLY_VERIFIED`, until the exact npm version documents are independently read and compared.

## 8. Published internal-peer parity candidate

The current evidence supports this candidate publication transform:

```text
@embedpdf/plugin-document-manager -> @embedpdf/core = 2.15.0
@embedpdf/plugin-render -> @embedpdf/core = 2.15.0
@embedpdf/plugin-thumbnail -> @embedpdf/core = 2.15.0
@embedpdf/plugin-thumbnail -> @embedpdf/plugin-render = 2.15.0
@embedpdf/plugin-search -> @embedpdf/core = 2.15.0
@embedpdf/plugin-selection -> @embedpdf/core = 2.15.0
@embedpdf/plugin-selection -> @embedpdf/plugin-interaction-manager = 2.15.0
@embedpdf/plugin-interaction-manager -> @embedpdf/core = 2.15.0
```

This is a candidate exact published map supported by derived lockfile evidence. It is not yet treated as first-party registry truth.

## 9. Non-peer selected packages

Pinned-source evidence classifies these nine selected manifests as having no `peerDependencies` field:

```text
@embedpdf/models@2.15.0
@embedpdf/pdfium@2.15.0
@embedpdf/fonts-arabic@1.0.0
@embedpdf/fonts-hebrew@1.0.0
@embedpdf/fonts-jp@1.0.0
@embedpdf/fonts-kr@1.0.0
@embedpdf/fonts-latin@1.0.0
@embedpdf/fonts-sc@1.0.0
@embedpdf/fonts-tc@1.0.0
```

Public package-content evidence observed for selected font packages is consistent with this source-side classification, but 004C1K still requires exact npm version-document comparison before claiming complete published parity across all nine.

## 10. Optional and peer-meta parity candidate

Pinned source contains zero `optionalDependencies` fields and zero `peerDependenciesMeta` fields across the selected 18 manifests.

Current secondary public evidence has not identified a contrary exact selected-version field.

That absence is not sufficient to claim authoritative published parity.

```text
PINNED_SOURCE_OPTIONAL_FIELDS = EMPTY_FOR_SELECTED_18
PINNED_SOURCE_PEER_META_FIELDS = EMPTY_FOR_SELECTED_18
PUBLISHED_OPTIONAL_FIELDS = PENDING_DIRECT_VERSION_DOCUMENT_VERIFICATION
PUBLISHED_PEER_META_FIELDS = PENDING_DIRECT_VERSION_DOCUMENT_VERIFICATION
```

## 11. Direct registry verification procedure

Before this grain can be merge-qualified as a completed parity qualification, an independent reviewer must read the exact public npm version document for every selected identity and mechanically extract only these fields:

```text
name
version
peerDependencies
peerDependenciesMeta
optionalDependencies
repository
```

The reviewer must not use moving `latest` records as a substitute for exact selected versions.

For scoped package names, the exact version-record request must unambiguously bind the scope/package and exact version. The evidence should record failures separately rather than silently treating unavailable fields as empty.

For every selected identity, normalize missing fields as `ABSENT_FIELD`, not `{}` unless the version document actually contains an empty object.

## 12. Required parity classification

Each selected package must receive one of:

```text
EXACT_MATCH
PUBLICATION_TRANSFORM_EXPECTED_AND_EXACTLY_CHARACTERIZED
MISMATCH_MATERIAL
DIRECT_VERSION_DOCUMENT_UNAVAILABLE
```

Rules:

- framework ranges must match character-for-character after JSON string parsing, not by semver-overlap intuition;
- internal `workspace:*` source peers may differ in published metadata only when the exact serialized published value is independently observed;
- missing source field vs missing published field is `EXACT_MATCH` for field-presence semantics;
- missing source field vs populated published field is `MISMATCH_MATERIAL` until explained;
- a published peer disappearing relative to source is `MISMATCH_MATERIAL`;
- an unexpected published optional peer or optional dependency is `MISMATCH_MATERIAL`;
- unavailable direct evidence never becomes an implicit match.

## 13. Expected field-for-field outcome to re-test

The current evidence predicts, but does not yet promote, this outcome:

```text
PREDICTED_PUBLISHED_PEER_BEARING_PACKAGE_COUNT = 9
PREDICTED_PUBLISHED_NON_PEER_PACKAGE_COUNT = 9
PREDICTED_UNIQUE_FRAMEWORK_PEER_NAMES = 5
PREDICTED_FRAMEWORK_PEER_ENTRY_COUNT = 45
PREDICTED_INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
PREDICTED_INTERNAL_PEER_SERIALIZED_VERSION = 2.15.0
PREDICTED_OPTIONAL_DEPENDENCIES_FIELDS = 0
PREDICTED_PEER_DEPENDENCIES_META_FIELDS = 0
```

These are review targets, not canonical facts until direct exact-version evidence establishes them.

## 14. Package-manager and framework boundary

004C1K does not select React, Preact, Vue, Svelte, or any product framework.

It does not decide which framework adapters a future Signthos provider package will import. It only establishes what the selected published package records require or declare as peers.

Canonical policy remains:

```text
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
FRAMEWORK_PEER_OMISSIONS = EXPLICITLY_QUALIFIED_ONLY
INTERNAL_EMBEDPDF_PEERS = EXACT_AND_PRESENT
```

A later declaration-content grain must separately decide the exact direct dependency set needed for the chosen Signthos provider package and must not automatically add all five frameworks just because upstream packages expose adapters for all five.

## 15. Security and supply-chain boundary

Peer metadata can expand effective install requirements outside the 18-package dependency-only closure.

004C1K therefore prohibits these inferences:

```text
EFFECTIVE_RESOLVED_PACKAGE_COUNT = UNKNOWN
FRAMEWORK_INSTALLATION_SET = UNKNOWN
FRAMEWORK_TRANSITIVE_GRAPH = UNKNOWN
RESOLVED_OPTIONAL_PACKAGE_SET = UNKNOWN
RESOLVED_ARCHIVE_SET = UNKNOWN
RESOLVED_LICENSE_NOTICE_SET = UNKNOWN
RESOLVED_VULNERABILITY_SET = UNKNOWN
```

The canonical 004C1I vulnerability observations apply to its dependency-only exact identity set. They must not be represented as a vulnerability clearance for any future peer-expanded resolved graph.

## 16. Adversarial cases

004C1K rejects:

1. Replacing direct npm version-document evidence with source `workspace:*` inference.
2. Replacing direct npm version-document evidence with a third-party lockfile alone.
3. Treating semver-compatible but textually different published ranges as exact parity.
4. Treating an absent JSON field as an observed empty object.
5. Treating all framework peers as product dependencies automatically.
6. Treating strict peer policy as resolver execution authority.
7. Treating exact published peer ranges as exact resolved versions.
8. Treating a peer package name as part of the dependency-only closure without a resolver decision.
9. Treating package-level license metadata as complete binary/font redistribution evidence.
10. Treating a published package record as proof of archive-to-pinned-source byte equality.
11. Treating registry parity as permission to create package-control files.
12. Treating broad founder permission as a substitute for canonical successor authority.

## 17. Merge-critical acceptance gate

004C1K must not merge as a completed parity qualification unless fresh independent exact-head review verifies the exact public npm version documents for all 18 selected identities and reports the exact parity result.

Required independent result fields:

```text
DIRECT_VERSION_DOCUMENTS_CHECKED = 18
DIRECT_VERSION_DOCUMENT_FAILURES = 0
PUBLISHED_PEER_BEARING_PACKAGE_COUNT = exact
PUBLISHED_NON_PEER_PACKAGE_COUNT = exact
PUBLISHED_FRAMEWORK_PEER_ENTRY_COUNT = exact
PUBLISHED_INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = exact
PUBLISHED_OPTIONAL_DEPENDENCIES_FIELDS = exact
PUBLISHED_PEER_DEPENDENCIES_META_FIELDS = exact
SOURCE_TO_PUBLISHED_MATERIAL_MISMATCH_COUNT = exact
```

If any direct version document cannot be read, the candidate remains fail closed and a later evidence path must be derived rather than fabricating parity.

If the reviewer establishes exact published values, this artifact must be repaired forward-only to replace all `PENDING_DIRECT_VERSION_DOCUMENT_VERIFICATION` states with the exact observed map and then receive a fresh independent substantive review on the repaired exact head.

## 18. Current result before direct exact-version verification

```text
PINNED_SOURCE_PEER_MAP = CANONICAL_FROM_004C1J
PUBLIC_LOCKFILE_PEER_RANGE_CORROBORATION = PRESENT
PREDICTED_PUBLISHED_INTERNAL_WORKSPACE_TRANSFORM = 2.15.0
AUTHORITATIVE_NPM_VERSION_DOCUMENT_PEER_PARITY = PENDING_DIRECT_VERIFICATION
AUTHORITATIVE_NPM_VERSION_DOCUMENT_OPTIONAL_PARITY = PENDING_DIRECT_VERIFICATION
AUTHORITATIVE_NPM_VERSION_DOCUMENT_PEER_META_PARITY = PENDING_DIRECT_VERIFICATION
004C1K_PARITY_QUALIFICATION = NOT_YET_COMPLETE
004C1K_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1K_IMPLEMENTATION_AUTHORITY = ABSENT
```

## 19. Successor rule

Canonicalizing a completed 004C1K parity qualification will not itself authorize package-control mutation, resolver execution, dependency acquisition/install, provider runtime, 004C2, 004D, or Specification 005.

Only after exact-head independent substantive review, guarded merge, mechanical post-merge verification, and fresh canonical reread may a later bounded unit be derived to freeze dependency declaration content, package-control bytes, provisioning inputs, or resolver execution.

Until the merge-critical direct-version-document gate is satisfied, no successor is eligible.