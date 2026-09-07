# Specification 004C1K — Published Peer and Optional Registry Parity Qualification

Status: `QUALIFICATION_CANDIDATE / DIRECT_REGISTRY_EVIDENCE_BOUND / FAIL_CLOSED_SUCCESSOR`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `45c9aa4d7e864e68593406c2eba0588f910ed4c8`
Authority source: `github:issue-comment:5573678962`
Independent direct-registry evidence source: `github:issue-comment:5573766457`

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

Canonical 004C1I established the dependency-only declared registry closure for the selected roots and 18 exact reachable package identities.

Canonical 004C1J established the pinned-source peer/optional structure at immutable EmbedPDF source revision:

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

004C1K exists only to qualify those last three parity states. It does not reopen package-manager, workspace, resolver, provider, or product-framework policy.

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

Canonical 004C1H requires every peer-affecting input to be exact before any future resolver execution and prohibits ambient or automatic peer satisfaction.

Therefore exact published peer fields are resolver-critical declaration evidence. A source `workspace:*` relationship cannot be promoted into a root dependency declaration by inference.

## 4. Exact selected identity set

The parity scope is exactly:

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

No peer name becomes part of the canonical dependency-only closure merely because it appears in a published peer map.

## 5. Independent direct exact-version registry verification

Independent review of the predecessor candidate queried the exact public npm version document for every selected identity, not `latest` and not package-page summaries. Missing fields were normalized as `ABSENT_FIELD` rather than `{}`.

The independently reported aggregate result is:

```text
DIRECT_VERSION_DOCUMENTS_CHECKED = 18
DIRECT_VERSION_DOCUMENT_FAILURES = 0
PUBLISHED_PEER_BEARING_PACKAGE_COUNT = 9
PUBLISHED_NON_PEER_PACKAGE_COUNT = 9
PUBLISHED_FRAMEWORK_PEER_ENTRY_COUNT = 45
PUBLISHED_INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
PUBLISHED_OPTIONAL_DEPENDENCIES_FIELDS = 0
PUBLISHED_PEER_DEPENDENCIES_META_FIELDS = 0
SOURCE_TO_PUBLISHED_MATERIAL_MISMATCH_COUNT = 0
```

All 18 exact version records returned the requested exact `name` and `version`.

```text
DIRECT_EXACT_VERSION_REGISTRY_EVIDENCE = ESTABLISHED
DIRECT_VERSION_DOCUMENT_FAILURES = 0
```

## 6. Exact published framework peer map

Each of the nine published peer-bearing packages carries these five framework peers character-for-character:

```text
preact = ^10.26.4
react = >=16.8.0
react-dom = >=16.8.0
svelte = >=5 <6
vue = >=3.2.0
```

Therefore:

```text
PUBLISHED_UNIQUE_FRAMEWORK_PEER_NAMES = 5
PUBLISHED_FRAMEWORK_PEER_ENTRY_COUNT = 45
PUBLISHED_FRAMEWORK_RANGE_PARITY = EXACT_MATCH
```

This records upstream package metadata only. It does not select React, Preact, Vue, Svelte, or any product framework for Signthos.

## 7. Exact published peer-bearing package maps

The exact published peer-bearing package set is:

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

`@embedpdf/core@2.15.0`, `@embedpdf/engines@2.15.0`, and `@embedpdf/utils@2.15.0` contain exactly the five framework peers from Section 6 and no internal EmbedPDF peer edge.

The six package records whose pinned-source `workspace:*` peers are transformed at publication carry these exact internal published peers in addition to the five framework peers:

```text
@embedpdf/plugin-document-manager@2.15.0
  @embedpdf/core = 2.15.0

@embedpdf/plugin-render@2.15.0
  @embedpdf/core = 2.15.0

@embedpdf/plugin-thumbnail@2.15.0
  @embedpdf/core = 2.15.0
  @embedpdf/plugin-render = 2.15.0

@embedpdf/plugin-search@2.15.0
  @embedpdf/core = 2.15.0

@embedpdf/plugin-selection@2.15.0
  @embedpdf/core = 2.15.0
  @embedpdf/plugin-interaction-manager = 2.15.0

@embedpdf/plugin-interaction-manager@2.15.0
  @embedpdf/core = 2.15.0
```

Therefore:

```text
PUBLISHED_INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
PINNED_SOURCE_INTERNAL_PEER_PROTOCOL = workspace:*
PUBLISHED_INTERNAL_PEER_SERIALIZED_VERSION = 2.15.0
INTERNAL_PEER_PUBLICATION_TRANSFORM = EXACTLY_CHARACTERIZED
```

`workspace:*` remains source-workspace semantics. The exact `2.15.0` values above are independently observed published registry values; they are not inferred from source.

## 8. Exact published non-peer package set

The nine exact published version records below have no `peerDependencies` field:

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

For those nine records:

```text
peerDependencies = ABSENT_FIELD
```

## 9. Optional and peer-meta field parity

Across all 18 exact published version documents:

```text
peerDependenciesMeta = ABSENT_FIELD
optionalDependencies = ABSENT_FIELD
```

The pinned-source selected manifests likewise contain zero `peerDependenciesMeta` fields and zero `optionalDependencies` fields.

Therefore:

```text
PUBLISHED_PEER_DEPENDENCIES_META_FIELDS = 0
PUBLISHED_OPTIONAL_DEPENDENCIES_FIELDS = 0
PUBLISHED_REGISTRY_PEER_META_PARITY = EXACT_MATCH
PUBLISHED_REGISTRY_OPTIONAL_PARITY = EXACT_MATCH
```

An absent field is recorded as an absent field, not as an observed empty object.

## 10. Package parity classification

The following 12 selected package identities are classified `EXACT_MATCH` for the peer/optional fields under qualification:

```text
@embedpdf/core@2.15.0
@embedpdf/engines@2.15.0
@embedpdf/models@2.15.0
@embedpdf/pdfium@2.15.0
@embedpdf/utils@2.15.0
@embedpdf/fonts-arabic@1.0.0
@embedpdf/fonts-hebrew@1.0.0
@embedpdf/fonts-jp@1.0.0
@embedpdf/fonts-kr@1.0.0
@embedpdf/fonts-latin@1.0.0
@embedpdf/fonts-sc@1.0.0
@embedpdf/fonts-tc@1.0.0
```

The following six package identities are classified `PUBLICATION_TRANSFORM_EXPECTED_AND_EXACTLY_CHARACTERIZED` because their pinned-source internal peer values use `workspace:*` and their exact published version records serialize those internal peer ranges as `2.15.0`:

```text
@embedpdf/plugin-document-manager@2.15.0
@embedpdf/plugin-render@2.15.0
@embedpdf/plugin-thumbnail@2.15.0
@embedpdf/plugin-search@2.15.0
@embedpdf/plugin-selection@2.15.0
@embedpdf/plugin-interaction-manager@2.15.0
```

No selected package is classified `MISMATCH_MATERIAL` or `DIRECT_VERSION_DOCUMENT_UNAVAILABLE`.

```text
EXACT_MATCH_PACKAGE_COUNT = 12
PUBLICATION_TRANSFORM_EXACTLY_CHARACTERIZED_PACKAGE_COUNT = 6
MISMATCH_MATERIAL_PACKAGE_COUNT = 0
DIRECT_VERSION_DOCUMENT_UNAVAILABLE_PACKAGE_COUNT = 0
```

## 11. Exact repository-field observation

The direct version-document extraction also inspected `repository` separately from peer parity.

Observed state:

```text
@embedpdf/core@2.15.0
  repository = ABSENT_FIELD

All other 17 selected exact version documents
  repository.type = git
  repository.url = git+https://github.com/embedpdf/embed-pdf-viewer.git
  repository.directory = package-specific directory
```

The observed package-specific directories correspond to the selected package source locations, including `packages/engines`, `packages/models`, `packages/pdfium`, `packages/utils`, each selected `packages/plugin-*` directory, and `packages/fonts/{arabic,hebrew,jp,kr,latin,sc,tc}`.

The absent `repository` field for `@embedpdf/core@2.15.0` is retained as an observed metadata state. It is not treated as a peer/optional parity mismatch and does not establish archive-to-source byte equivalence.

## 12. Source-to-published parity result

The exact field-for-field result is:

```text
PUBLISHED_REGISTRY_PEER_RANGE_PARITY = QUALIFIED
PUBLISHED_REGISTRY_PEER_META_PARITY = QUALIFIED
PUBLISHED_REGISTRY_OPTIONAL_PARITY = QUALIFIED
PUBLISHED_FRAMEWORK_RANGE_PARITY = EXACT_MATCH
PUBLISHED_INTERNAL_WORKSPACE_TRANSFORM = EXACTLY_CHARACTERIZED_AS_2.15.0
SOURCE_TO_PUBLISHED_MATERIAL_MISMATCH_COUNT = 0
```

This qualification is limited to `peerDependencies`, `peerDependenciesMeta`, and `optionalDependencies`, plus the exact identity/repository extraction used for evidence binding. It does not establish complete package archive contents, archive-to-source equality, resolved graph truth, or runtime behavior.

## 13. Public-lockfile corroboration remains secondary

Earlier read-only public npm-generated lockfile evidence corroborated that the internal `workspace:*` relationships were published as exact `2.15.0` peer ranges.

That evidence remains useful as independent secondary corroboration, but direct exact-version npm registry evidence is now the controlling published metadata evidence for this grain.

```text
PUBLIC_LOCKFILE_PEER_RANGE_CORROBORATION = PRESENT
DIRECT_NPM_VERSION_DOCUMENT_EVIDENCE = PRESENT
DIRECT_NPM_VERSION_DOCUMENT_EVIDENCE_PRIORITY = CONTROLLING_FOR_004C1K
```

No public lockfile is imported into Signthos or treated as a Signthos resolved graph.

## 14. Package-manager and framework boundary

004C1K does not select a product framework and does not decide which framework adapters a future Signthos provider package will import.

Canonical planning policy remains:

```text
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
FRAMEWORK_PEER_OMISSIONS = EXPLICITLY_QUALIFIED_ONLY
INTERNAL_EMBEDPDF_PEERS = EXACT_AND_PRESENT
```

A later declaration-content grain must separately decide the exact direct dependency set required by the chosen Signthos provider package. It must not automatically add all five frameworks merely because the upstream packages publish adapter peer ranges for all five.

## 15. Security and supply-chain boundary

Exact peer parity still does not define a package-manager-resolved graph.

004C1K therefore preserves:

```text
EFFECTIVE_RESOLVED_PACKAGE_COUNT = UNKNOWN
FRAMEWORK_INSTALLATION_SET = UNKNOWN
FRAMEWORK_TRANSITIVE_GRAPH = UNKNOWN
RESOLVED_OPTIONAL_PACKAGE_SET = UNKNOWN
RESOLVED_ARCHIVE_SET = UNKNOWN
RESOLVED_LICENSE_NOTICE_SET = UNKNOWN
RESOLVED_VULNERABILITY_SET = UNKNOWN
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = UNPROVEN
PDFIUM_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
FONT_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
```

Canonical 004C1I vulnerability observations apply to its exact dependency-only identity set. They are not vulnerability clearance for a future peer-expanded resolved graph.

## 16. Adversarial cases

004C1K rejects:

1. Replacing direct exact-version npm evidence with source `workspace:*` inference.
2. Replacing direct exact-version npm evidence with third-party lockfile evidence alone.
3. Treating semver-compatible but textually different framework ranges as exact parity.
4. Treating an absent JSON field as an observed empty object.
5. Treating all framework peers as product dependencies automatically.
6. Treating strict peer policy as resolver execution authority.
7. Treating exact published peer ranges as exact resolved versions.
8. Treating a peer package name as part of the dependency-only closure without a resolver/declaration decision.
9. Treating package-level metadata as complete binary/font redistribution evidence.
10. Treating a published version record as proof of archive-to-pinned-source byte equality.
11. Treating registry parity as permission to create package-control files.
12. Treating broad founder permission as a substitute for canonical successor authority.
13. Treating the absence of optional fields as cross-platform resolver closure.
14. Treating the observed `repository` field as a cryptographic source-binding proof.

## 17. Merge-critical acceptance gate

The predecessor head received independent direct exact-version registry verification but also a material finding because it had not incorporated that now-available evidence.

This repaired exact head may merge only after a fresh independent substantive review confirms all of the following on the repaired base-to-head range:

```text
DIRECT_VERSION_DOCUMENTS_CHECKED = 18
DIRECT_VERSION_DOCUMENT_FAILURES = 0
PUBLISHED_PEER_BEARING_PACKAGE_COUNT = 9
PUBLISHED_NON_PEER_PACKAGE_COUNT = 9
PUBLISHED_FRAMEWORK_PEER_ENTRY_COUNT = 45
PUBLISHED_INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
PUBLISHED_OPTIONAL_DEPENDENCIES_FIELDS = 0
PUBLISHED_PEER_DEPENDENCIES_META_FIELDS = 0
SOURCE_TO_PUBLISHED_MATERIAL_MISMATCH_COUNT = 0
```

The fresh review must also verify that the repair faithfully records the direct evidence, that no PENDING direct-verification state remains, that `git diff --check` is clean, and that no unauthorized repository surface changed.

The old review on predecessor head `1ba6507e7b2eb2edd3716631db7a9ff94a6982f7` cannot qualify this repaired head.

## 18. Current result after direct exact-version verification

```text
PINNED_SOURCE_PEER_MAP = CANONICAL_FROM_004C1J
DIRECT_NPM_VERSION_DOCUMENTS_CHECKED = 18
DIRECT_NPM_VERSION_DOCUMENT_FAILURES = 0
AUTHORITATIVE_NPM_VERSION_DOCUMENT_PEER_PARITY = QUALIFIED
AUTHORITATIVE_NPM_VERSION_DOCUMENT_OPTIONAL_PARITY = QUALIFIED
AUTHORITATIVE_NPM_VERSION_DOCUMENT_PEER_META_PARITY = QUALIFIED
PUBLISHED_INTERNAL_WORKSPACE_TRANSFORM = EXACTLY_CHARACTERIZED_AS_2.15.0
SOURCE_TO_PUBLISHED_MATERIAL_MISMATCH_COUNT = 0
004C1K_PARITY_QUALIFICATION = DIRECT_EVIDENCE_ESTABLISHED_AWAITING_REPAIRED_HEAD_REVIEW
004C1K_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1K_IMPLEMENTATION_AUTHORITY = ABSENT
```

004C1K remains a candidate until this repaired exact head receives fresh independent review, guarded merge, and mechanical post-merge verification.

## 19. Successor rule

Canonicalizing 004C1K will not itself authorize package-control mutation, resolver execution, dependency acquisition/install, provider runtime, 004C2, 004D, or Specification 005.

Only after repaired-head independent substantive review, guarded merge, mechanical post-merge verification, and fresh canonical reread may a later bounded unit be derived to freeze dependency declaration content, package-control bytes, provisioning inputs, or resolver execution.

Until those gates are satisfied, no successor is eligible.
