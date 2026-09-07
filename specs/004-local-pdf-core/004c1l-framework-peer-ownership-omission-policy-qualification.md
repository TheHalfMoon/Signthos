# Specification 004C1L — Framework Peer Ownership and Omission Policy Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_POLICY_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `b18dbf5ba3e64044c11376f4952cfc8bca0e5dd8`
Canonical predecessor tree: `c8a0c35d2e6bbd8073128497f1a42e0e5771f9d7`
Authority source: `github:issue-comment:5573986951`

## 1. Purpose and authority boundary

004C1L qualifies the smallest planning-only policy needed to reconcile the canonical strict peer contract with 004C1K's exact published EmbedPDF peer metadata without selecting a Signthos product framework.

```text
004C1L_AUTHORITY = PLANNING_POLICY_QUALIFICATION_ONLY
004C1L_ALLOWED_SURFACE = specs/004-local-pdf-core/**
004C1L_CANONICAL_PEER_METADATA_RESEARCH_AUTHORITY = PRESENT
004C1L_PUBLIC_PNPM_V10_POLICY_METADATA_RESEARCH_AUTHORITY = PRESENT
004C1L_FRAMEWORK_PEER_OMISSION_POLICY_QUALIFICATION_AUTHORITY = PRESENT
004C1L_INTERNAL_PEER_OWNERSHIP_POLICY_QUALIFICATION_AUTHORITY = PRESENT
004C1L_PRODUCT_FRAMEWORK_SELECTION_AUTHORITY = ABSENT
004C1L_IMPLEMENTATION_AUTHORITY = ABSENT
004C1L_PACKAGE_MANAGER_NODE_COREPACK_RESOLVER_EXECUTION_AUTHORITY = ABSENT
004C1L_DEPENDENCY_ADOPTION_ACQUISITION_INSTALL_AUTHORITY = ABSENT
004C1L_PACKAGE_MANIFEST_WORKSPACE_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1L_ARCHIVE_SOURCE_BINARY_FIXTURE_IMPORT_AUTHORITY = ABSENT
004C1L_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1L_PROVIDER_PDF_RUNTIME_AUTHORITY = ABSENT
004C1M_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact is policy evidence only. It does not create or mutate `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `.npmrc`, source, runtime, workflow, cache, provenance, NOTICE/SBOM, container, database, fixture, package archive, or installed dependency state. It executes no pnpm, npm, yarn, bun, Node.js, Corepack, resolver, provider, or PDF runtime command.

## 2. Canonical inputs consumed without reopening

Canonical 004C1G and 004C1H require:

```text
PACKAGE_MANAGER_FAMILY = pnpm
PACKAGE_MANAGER_VERSION = 10.34.5
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
FRAMEWORK_PEER_OMISSIONS = EXPLICITLY_QUALIFIED_ONLY
INTERNAL_EMBEDPDF_PEERS = EXACT_AND_PRESENT
```

Canonical 004C1K directly verified the exact published peer/optional metadata for the selected 18-package set and established:

```text
PUBLISHED_PEER_BEARING_PACKAGE_COUNT = 9
PUBLISHED_NON_PEER_PACKAGE_COUNT = 9
PUBLISHED_FRAMEWORK_PEER_ENTRY_COUNT = 45
PUBLISHED_INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
PUBLISHED_OPTIONAL_DEPENDENCIES_FIELDS = 0
PUBLISHED_PEER_DEPENDENCIES_META_FIELDS = 0
SOURCE_TO_PUBLISHED_MATERIAL_MISMATCH_COUNT = 0
```

The nine exact peer-bearing identities are:

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

Each publishes exactly these five framework peers:

```text
preact = ^10.26.4
react = >=16.8.0
react-dom = >=16.8.0
svelte = >=5 <6
vue = >=3.2.0
```

No selected published manifest marks any of those framework peers optional through `peerDependenciesMeta`.

The exact eight internal EmbedPDF published peer edges are:

```text
@embedpdf/plugin-document-manager@2.15.0 -> @embedpdf/core = 2.15.0
@embedpdf/plugin-render@2.15.0 -> @embedpdf/core = 2.15.0
@embedpdf/plugin-thumbnail@2.15.0 -> @embedpdf/core = 2.15.0
@embedpdf/plugin-thumbnail@2.15.0 -> @embedpdf/plugin-render = 2.15.0
@embedpdf/plugin-search@2.15.0 -> @embedpdf/core = 2.15.0
@embedpdf/plugin-selection@2.15.0 -> @embedpdf/core = 2.15.0
@embedpdf/plugin-selection@2.15.0 -> @embedpdf/plugin-interaction-manager = 2.15.0
@embedpdf/plugin-interaction-manager@2.15.0 -> @embedpdf/core = 2.15.0
```

004C1L does not reinterpret or weaken those eight edges.

## 3. First-party pnpm v10 policy evidence

The canonical pnpm version is pinned to `10.34.5`. The first-party pnpm Git tag resolves exactly as follows:

```text
PNPM_TAG = v10.34.5
PNPM_TAG_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
```

First-party evidence consulted without executing pnpm:

1. pnpm 10.x settings documentation:
   - `https://pnpm.io/10.x/settings`
   - `packageExtensions` accepts package-name or package-name-plus-semver selectors and may extend `peerDependenciesMeta`.
   - `autoInstallPeers=true` automatically installs missing non-optional peers; canonical Signthos policy keeps it `false`.
   - `strictPeerDependencies=true` makes missing or invalid peers fail; canonical Signthos policy keeps it `true`.
   - `peerDependencyRules.ignoreMissing` suppresses missing-peer reporting by peer-name matcher, including patterns.
   - `peerDependencyRules.allowAny` permits matching peers regardless of declared range.
2. pnpm `v10.34.5` source at commit `702ad5f860ffd50d64a3a711d9f8a3da16fc796e`:
   - `hooks/read-package-hook/src/createPackageExtender.ts`
     - groups extensions by package name;
     - applies a versioned extension only when the manifest version satisfies that selector;
     - permits extension of `peerDependenciesMeta`.
   - `pkg-manager/resolve-dependencies/src/mergePeers.ts`
     - excludes a missing peer from intersection/conflict aggregation when every issue for that peer is optional.
   - `pkg-manager/core/src/install/reportPeerDependencyIssues.ts`
     - filters missing peers when every corresponding issue is optional;
     - throws `PeerDependencyIssuesError` when remaining peer issues exist and `strictPeerDependencies` is enabled;
     - applies `peerDependencyRules.ignoreMissing` by peer-name matcher rather than by exact dependent-package identity.

The evidence establishes a policy mechanism that can scope framework omission to exact dependent package identities while retaining strict failure outside that scope.

No resolver execution is claimed by this qualification.

## 4. Rejected broad suppression mechanisms

004C1L rejects all of the following as canonical Signthos policy:

```text
peerDependencyRules.ignoreMissing = REJECTED
peerDependencyRules.allowAny = REJECTED
WILDCARD_FRAMEWORK_PEER_SUPPRESSION = REJECTED
GLOBAL_FRAMEWORK_PEER_SUPPRESSION_BY_NAME = REJECTED
STRICT_PEER_DEPENDENCIES_FALSE = REJECTED
AUTO_INSTALL_PEERS_TRUE = REJECTED
IMPLICIT_FRAMEWORK_INSTALLATION = REJECTED
PRODUCT_FRAMEWORK_SELECTION_BY_RESOLVER = REJECTED
BROAD_PACKAGE_EXTENSION_VERSION_RANGE = REJECTED
```

Rationale:

- peer-name-only suppression is broader than the nine exact EmbedPDF identities under qualification;
- wildcard suppression could hide unrelated future packages with the same peer names;
- `allowAny` weakens range validation rather than solving deliberate absence;
- disabling strict peer enforcement would weaken all peers, including the eight internal exact-and-present edges;
- enabling automatic peer installation could silently acquire or select framework packages;
- using broad dependent-package version ranges would extend the exception to unqualified future EmbedPDF releases.

## 5. Canonical peer ownership classes

004C1L defines two disjoint ownership classes for the exact 004C1K peer-bearing package set.

### 5.1 Internal EmbedPDF peer edges — declaration owned

All eight internal EmbedPDF edges in Section 2 remain required.

```text
INTERNAL_EMBEDPDF_PEER_OWNERSHIP = FUTURE_SIGNTHOS_DECLARATION_SET
INTERNAL_EMBEDPDF_PEER_PRESENCE = REQUIRED
INTERNAL_EMBEDPDF_PEER_VERSION = EXACT_2.15.0
INTERNAL_EMBEDPDF_PEER_OMISSION_EXCEPTION = FORBIDDEN
INTERNAL_EMBEDPDF_PEER_RANGE_SUPPRESSION = FORBIDDEN
```

A future authorized declaration candidate must explicitly satisfy every one of those eight edges with the already qualified exact selected package identity. Missing, invalid, drifted, or implicitly satisfied internal peers remain a fail-closed condition.

### 5.2 Unselected product-framework peers — package-scoped omission owned

The following five framework peer names are not selected as Signthos product frameworks by this grain:

```text
preact
react
react-dom
svelte
vue
```

Until a later explicit product-framework authority selects one or more of them, their deliberate absence may be represented only by a package-scoped, exact-version `peerDependenciesMeta.optional = true` extension for the nine exact peer-bearing EmbedPDF identities in Section 2.

```text
FRAMEWORK_PEER_SELECTION = UNDECIDED / NOT_AUTHORIZED
FRAMEWORK_PEER_DECLARATION_OWNERSHIP = ABSENT_UNTIL_EXPLICIT_SELECTION
FRAMEWORK_PEER_OMISSION_MECHANISM = EXACT_PACKAGE_EXTENSION_PEER_META_ONLY
FRAMEWORK_PEER_OMISSION_SCOPE = 9_EXACT_EMBEDPDF_IDENTITIES_X_5_EXACT_FRAMEWORK_PEERS
FRAMEWORK_PEER_OMISSION_ENTRY_COUNT = 45
```

This is an omission policy, not a framework choice and not an installation authorization.

## 6. Exact qualified future omission matrix

The only dependent package identities eligible for the omission policy are:

| Exact dependent identity | `preact` | `react` | `react-dom` | `svelte` | `vue` |
| --- | --- | --- | --- | --- | --- |
| `@embedpdf/core@2.15.0` | optional | optional | optional | optional | optional |
| `@embedpdf/engines@2.15.0` | optional | optional | optional | optional | optional |
| `@embedpdf/plugin-document-manager@2.15.0` | optional | optional | optional | optional | optional |
| `@embedpdf/plugin-render@2.15.0` | optional | optional | optional | optional | optional |
| `@embedpdf/plugin-thumbnail@2.15.0` | optional | optional | optional | optional | optional |
| `@embedpdf/plugin-search@2.15.0` | optional | optional | optional | optional | optional |
| `@embedpdf/plugin-selection@2.15.0` | optional | optional | optional | optional | optional |
| `@embedpdf/plugin-interaction-manager@2.15.0` | optional | optional | optional | optional | optional |
| `@embedpdf/utils@2.15.0` | optional | optional | optional | optional | optional |

No other dependent identity, version, peer name, peer range, or peer class is cleared by 004C1L.

For future implementation authority, the qualified semantic shape is equivalent to exact-version `packageExtensions` entries whose only added field is:

```yaml
peerDependenciesMeta:
  preact:
    optional: true
  react:
    optional: true
  react-dom:
    optional: true
  svelte:
    optional: true
  vue:
    optional: true
```

That field must be attached independently to each exact package selector from the table. This YAML fragment is a planning contract only. 004C1L does not authorize creating or mutating any package-manager configuration file.

## 7. Deterministic acceptance and failure rules

A future resolver input may treat a missing peer as an intentionally omitted unselected framework peer only when **all** of the following are true:

1. the dependent package identity is one of the nine exact `@embedpdf/*@2.15.0` identities in Section 6;
2. the missing peer name is exactly one of `preact`, `react`, `react-dom`, `svelte`, or `vue`;
3. no later canonical product-framework decision requires that peer to be present;
4. the omission is represented through exact dependent-package `packageExtensions.peerDependenciesMeta.optional = true` policy, not a peer-name-only or wildcard suppression rule;
5. canonical `AUTO_INSTALL_PEERS = false` remains unchanged;
6. canonical `STRICT_PEER_DEPENDENCIES = true` remains unchanged.

Any peer issue outside that six-part predicate remains unsuppressed and must preserve pnpm's strict failure semantics.

In particular:

```text
MISSING_INTERNAL_EMBEDPDF_PEER = FAIL
INVALID_INTERNAL_EMBEDPDF_PEER_VERSION = FAIL
MISSING_UNCLEARED_PEER = FAIL
INVALID_PRESENT_FRAMEWORK_PEER_VERSION = FAIL
UNQUALIFIED_DEPENDENT_PACKAGE_VERSION = FAIL
UNQUALIFIED_PEER_NAME = FAIL
WILDCARD_OR_GLOBAL_SUPPRESSION = FAIL
AUTO_INSTALL_PEERS_DRIFT = FAIL
STRICT_PEER_DEPENDENCIES_DRIFT = FAIL
```

Because `reportPeerDependencyIssues.ts` only filters missing issues that are optional while still evaluates bad peer issues under strict mode, marking an unselected framework peer optional does not authorize an incompatible installed framework version.

## 8. Product-framework neutrality

004C1L deliberately makes no choice among React, Preact, Vue, Svelte, another framework, or no framework.

```text
REACT_SELECTION = NOT_AUTHORIZED
PREACT_SELECTION = NOT_AUTHORIZED
VUE_SELECTION = NOT_AUTHORIZED
SVELTE_SELECTION = NOT_AUTHORIZED
OTHER_PRODUCT_FRAMEWORK_SELECTION = NOT_AUTHORIZED
```

If future product authority selects a framework peer, that peer must leave omission status for every dependent identity that requires it and must be qualified as an explicit declaration under then-current canonical policy. 004C1L grants no such successor authority itself.

## 9. Drift and fail-closed rules

Before any later authorized package-control or resolver execution uses this policy, all of these conditions must still match canonical evidence:

```text
PNPM_VERSION = 10.34.5
PNPM_POLICY_SOURCE_REVISION = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
EMBEDPDF_PEER_BEARING_PACKAGE_SET = EXACT_9_IDENTITY_SET
EMBEDPDF_FRAMEWORK_PEER_MAP = EXACT_45_ENTRY_004C1K_MAP
EMBEDPDF_INTERNAL_PEER_MAP = EXACT_8_EDGE_004C1K_MAP
AUTO_INSTALL_PEERS = false
STRICT_PEER_DEPENDENCIES = true
```

Any mismatch is a qualification blocker. No later unit may infer that this policy applies to another pnpm version, another EmbedPDF version, another peer-bearing package, another peer name, or modified published peer metadata.

## 10. 004C1L qualification result

The bounded policy result is:

```text
PNPM_PACKAGE_EXTENSION_PEER_META_MECHANISM = QUALIFIED_FOR_PLANNING
FRAMEWORK_PEER_OMISSION_POLICY = EXACT_PACKAGE_SCOPED
FRAMEWORK_PEER_OMISSION_DEPENDENT_IDENTITY_COUNT = 9
FRAMEWORK_PEER_OMISSION_PEER_NAME_COUNT = 5
FRAMEWORK_PEER_OMISSION_ENTRY_COUNT = 45
GLOBAL_PEER_SUPPRESSION = FORBIDDEN
WILDCARD_PEER_SUPPRESSION = FORBIDDEN
INTERNAL_EMBEDPDF_PEER_EDGE_COUNT = 8
INTERNAL_EMBEDPDF_PEER_POLICY = EXACT_AND_PRESENT
PRODUCT_FRAMEWORK_SELECTION = UNCHANGED_NOT_AUTHORIZED
RESOLVER_EXECUTION_EVIDENCE = NOT_CLAIMED
IMPLEMENTATION_EVIDENCE = NOT_CLAIMED
004C1L_POLICY = QUALIFIED_CANDIDATE
```

The canonical strict-peer/no-auto-install contract is therefore reconcilable without selecting or automatically installing a product framework and without weakening unrelated peer enforcement.

## 11. Successor boundary

004C1L closes only the peer ownership/omission policy prerequisite.

The exact next dependency-ordered repository unit is **not derived by this artifact**. Canonical governance requires fresh post-merge reconciliation before any successor is authorized.

At minimum, an exact dependency declaration set remains not yet authorized here. `004C1M`, `004C2`, `004D`, and Specification 005 remain unavailable unless a fresh canonical authority explicitly opens them.

```text
EXACT_DEPENDENCY_DECLARATION_SET = NOT_AUTHORIZED_BY_004C1L
PACKAGE_CONTROL_MUTATION = NOT_AUTHORIZED_BY_004C1L
RESOLVER_EXECUTION = NOT_AUTHORIZED_BY_004C1L
004C1M = NOT_AUTHORIZED_BY_004C1L
004C2 = NOT_AUTHORIZED_BY_004C1L
004D = NOT_AUTHORIZED_BY_004C1L
SPECIFICATION_005 = NOT_AUTHORIZED_BY_004C1L
```

No readiness, CI, runtime, provider, PDF behavior, package installation, dependency adoption, or merge qualification claim is made by this artifact.