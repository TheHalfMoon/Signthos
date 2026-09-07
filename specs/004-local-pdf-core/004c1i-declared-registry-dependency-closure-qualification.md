# Specification 004C1I — Declared Registry Dependency Closure Qualification

Status: `QUALIFICATION_CANDIDATE / PUBLIC_REGISTRY_METADATA_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `554c605d0263061f70032587a859ec2866290c79`
Authority source: `github:issue-comment:5573115172`

## 1. Purpose and authority boundary

004C1I closes one evidence gap left explicit by canonical 004C1B, 004C1C, and 004C1H: the dependency-only declared registry closure for the selected 004C browser provider candidate.

```text
004C1I_AUTHORITY = PUBLIC_REGISTRY_METADATA_QUALIFICATION_ONLY
004C1I_ALLOWED_SURFACE = specs/004-local-pdf-core/**
004C1I_PUBLIC_REGISTRY_METADATA_RESEARCH_AUTHORITY = PRESENT
004C1I_IMMUTABLE_UPSTREAM_METADATA_RESEARCH_AUTHORITY = PRESENT
004C1I_IMPLEMENTATION_AUTHORITY = ABSENT
004C1I_PACKAGE_MANAGER_EXECUTION_AUTHORITY = ABSENT
004C1I_COREPACK_NODE_RESOLVER_EXECUTION_AUTHORITY = ABSENT
004C1I_DEPENDENCY_ADOPTION_AUTHORITY = ABSENT
004C1I_DEPENDENCY_ACQUISITION_INSTALL_AUTHORITY = ABSENT
004C1I_PACKAGE_MANIFEST_WORKSPACE_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1I_PACKAGE_ARCHIVE_DOWNLOAD_IMPORT_AUTHORITY = ABSENT
004C1I_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1I_PROVIDER_PDF_RUNTIME_AUTHORITY = ABSENT
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

No package-manager, Corepack, Node, resolver, registry acquisition, dependency installation, package-control mutation, archive download/import, provider execution, PDF runtime, provenance/NOTICE/SBOM mutation, database mutation, or Specification 005 work is authorized by this grain.

## 2. Canonical predecessor truth consumed without reopening

Canonical 004C1H closed through PR #113 at merge `554c605d0263061f70032587a859ec2866290c79` and intentionally preserved:

```text
ROOT_MANIFEST_EXACT_CONTENT = NOT_AUTHORIZED
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
ROOT_WORKSPACE_MEMBERSHIP = UNRESOLVED_FAIL_CLOSED
EXACT_DEPENDENCY_DECLARATION_SET = NOT_AUTHORIZED
EXACT_PNPM_PROVISIONING_MECHANISM = NOT_AUTHORIZED
EXACT_RESOLVER_COMMAND = NOT_AUTHORIZED
LOCKFILE = NOT_GENERATED
RESOLVED_GRAPH = NOT_GENERATED
PACKAGE_ARCHIVE_IDENTITY_SET = NOT_ESTABLISHED
```

Canonical 004C1C also preserved the distinction:

```text
DECLARED_METADATA != RESOLVED_INSTALLATION_GRAPH
```

004C1I does not weaken either boundary.

## 3. Selected planning roots

The read-only dependency traversal used these exact capability-facing package roots:

```text
@embedpdf/core@2.15.0
@embedpdf/pdfium@2.15.0
@embedpdf/plugin-document-manager@2.15.0
@embedpdf/plugin-render@2.15.0
@embedpdf/plugin-thumbnail@2.15.0
@embedpdf/plugin-search@2.15.0
@embedpdf/plugin-selection@2.15.0
@embedpdf/plugin-interaction-manager@2.15.0
```

These roots are evidence inputs only. They are not a Signthos `package.json` dependency list and are not adopted dependencies.

## 4. Traversal semantics and result

The registry traversal followed only the published `dependencies` field. It did not follow `peerDependencies`, `optionalDependencies`, `devDependencies`, workspace source declarations, package-manager hoisting/deduplication, overrides, platform filters, or a lockfile.

The traversal used a configured depth limit of 3 and returned an observed maximum reachable depth of 2:

```text
ROOT_COUNT = 8
REACHABLE_PACKAGE_IDENTITY_COUNT = 18
TRAVERSAL_DEPTH_LIMIT = 3
OBSERVED_MAX_REACHABLE_DEPTH = 2
UNRESOLVED_COUNT = 0
TRUNCATED = FALSE
VULNERABLE_PACKAGE_COUNT_FROM_OSV_QUERY = 0
```

Because every dependency-only branch terminated by depth 2 in the observed exact-version metadata, the depth-3 traversal did not truncate a deeper dependency-only branch.

This result is a declared dependency closure observation, not a package-manager-resolved installation graph.

## 5. Exact dependency-only reachable identities

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

No package outside this set was dependency-only reachable from the eight selected roots in the observed traversal.

## 6. Exact published dependency maps

The exact version metadata returned the following dependency maps.

### `@embedpdf/core@2.15.0`

```text
@embedpdf/engines = 2.15.0
@embedpdf/models = 2.15.0
```

### `@embedpdf/engines@2.15.0`

```text
@embedpdf/models = 2.15.0
@embedpdf/pdfium = 2.15.0
@embedpdf/fonts-arabic = 1.0.0
@embedpdf/fonts-hebrew = 1.0.0
@embedpdf/fonts-jp = 1.0.0
@embedpdf/fonts-kr = 1.0.0
@embedpdf/fonts-latin = 1.0.0
@embedpdf/fonts-sc = 1.0.0
@embedpdf/fonts-tc = 1.0.0
```

### `@embedpdf/plugin-document-manager@2.15.0`

```text
@embedpdf/models = 2.15.0
```

### `@embedpdf/plugin-render@2.15.0`

```text
@embedpdf/models = 2.15.0
```

### `@embedpdf/plugin-thumbnail@2.15.0`

```text
@embedpdf/models = 2.15.0
```

### `@embedpdf/plugin-search@2.15.0`

```text
@embedpdf/models = 2.15.0
```

### `@embedpdf/plugin-selection@2.15.0`

```text
@embedpdf/models = 2.15.0
@embedpdf/utils = 2.15.0
```

### `@embedpdf/plugin-interaction-manager@2.15.0`

```text
@embedpdf/models = 2.15.0
```

### Leaf package dependency maps

The exact version metadata returned empty published `dependencies` maps for:

```text
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

Therefore:

```text
004C1I_COMPLETE_DEPENDENCY_ONLY_DECLARED_MAP_FOR_SELECTED_ROOTS = ESTABLISHED_FOR_OBSERVED_EXACT_VERSION_RECORDS
004C1I_COMPLETE_PEER_METADATA_CLOSURE = NOT_ESTABLISHED
004C1I_COMPLETE_OPTIONAL_METADATA_CLOSURE = NOT_ESTABLISHED
004C1I_RESOLVED_INSTALLATION_GRAPH = NOT_ESTABLISHED
```

## 7. Registry identity evidence

The observed registry metadata returned the following exact tarball URLs and SHA-1 `shasum` values. These values identify registry metadata records; 004C1I does not download or hash the archives.

| Package | Version | License field | Registry shasum | Tarball |
| --- | --- | --- | --- | --- |
| `@embedpdf/core` | `2.15.0` | `MIT` | `6c3d962910afdd63f88725c92afb872f1cf430e4` | `https://registry.npmjs.org/@embedpdf/core/-/core-2.15.0.tgz` |
| `@embedpdf/engines` | `2.15.0` | `MIT` | `2e068fe4959575d82ec489fae01b9630f15ac6e8` | `https://registry.npmjs.org/@embedpdf/engines/-/engines-2.15.0.tgz` |
| `@embedpdf/models` | `2.15.0` | `MIT` | `dff75043166abf361c850f294ec242ff4eacbdd8` | `https://registry.npmjs.org/@embedpdf/models/-/models-2.15.0.tgz` |
| `@embedpdf/pdfium` | `2.15.0` | `MIT` | `b073cf9cee2252507c4fc81fb47a156cb2a19662` | `https://registry.npmjs.org/@embedpdf/pdfium/-/pdfium-2.15.0.tgz` |
| `@embedpdf/plugin-document-manager` | `2.15.0` | `MIT` | `2a9cfc2a9942c54d23432209942448a1a81b0c12` | `https://registry.npmjs.org/@embedpdf/plugin-document-manager/-/plugin-document-manager-2.15.0.tgz` |
| `@embedpdf/plugin-render` | `2.15.0` | `MIT` | `da1cfac73c3f8f8dcd064a7fc27d953b73eb2d3a` | `https://registry.npmjs.org/@embedpdf/plugin-render/-/plugin-render-2.15.0.tgz` |
| `@embedpdf/plugin-thumbnail` | `2.15.0` | `MIT` | `ca68dc15714a5790295eb569507acdb3b59bf9c5` | `https://registry.npmjs.org/@embedpdf/plugin-thumbnail/-/plugin-thumbnail-2.15.0.tgz` |
| `@embedpdf/plugin-search` | `2.15.0` | `MIT` | `4dc1dc7c80bbf1f121f34cfb5208456439078048` | `https://registry.npmjs.org/@embedpdf/plugin-search/-/plugin-search-2.15.0.tgz` |
| `@embedpdf/plugin-selection` | `2.15.0` | `MIT` | `a2f269c0b66ef96ea06ad68c731cd3233346194f` | `https://registry.npmjs.org/@embedpdf/plugin-selection/-/plugin-selection-2.15.0.tgz` |
| `@embedpdf/plugin-interaction-manager` | `2.15.0` | `MIT` | `d899c14f262358d7120124d5cf9d4e9df4dcf885` | `https://registry.npmjs.org/@embedpdf/plugin-interaction-manager/-/plugin-interaction-manager-2.15.0.tgz` |
| `@embedpdf/utils` | `2.15.0` | `MIT` | `bd7561a76b0117421354c08b15582c1f6791e4f3` | `https://registry.npmjs.org/@embedpdf/utils/-/utils-2.15.0.tgz` |
| `@embedpdf/fonts-arabic` | `1.0.0` | `OFL-1.1` | `32cf6e9b13a73827800278db7ae832981f9764df` | `https://registry.npmjs.org/@embedpdf/fonts-arabic/-/fonts-arabic-1.0.0.tgz` |
| `@embedpdf/fonts-hebrew` | `1.0.0` | `OFL-1.1` | `5ad24258c1606fa95dbb4ba5fa67757502c58edc` | `https://registry.npmjs.org/@embedpdf/fonts-hebrew/-/fonts-hebrew-1.0.0.tgz` |
| `@embedpdf/fonts-jp` | `1.0.0` | `OFL-1.1` | `03c643bde1e0e556bfa1cf4bbb7eafbe555aa9ac` | `https://registry.npmjs.org/@embedpdf/fonts-jp/-/fonts-jp-1.0.0.tgz` |
| `@embedpdf/fonts-kr` | `1.0.0` | `OFL-1.1` | `4652ae3b26a83c3c7e499f0b7b60375fb9bb1d46` | `https://registry.npmjs.org/@embedpdf/fonts-kr/-/fonts-kr-1.0.0.tgz` |
| `@embedpdf/fonts-latin` | `1.0.0` | `OFL-1.1` | `b646560c2c147f0ccbf04ae26ef18c7822506240` | `https://registry.npmjs.org/@embedpdf/fonts-latin/-/fonts-latin-1.0.0.tgz` |
| `@embedpdf/fonts-sc` | `1.0.0` | `OFL-1.1` | `a52a70b3cb36e9e49148f2055f51d0fa387f41bf` | `https://registry.npmjs.org/@embedpdf/fonts-sc/-/fonts-sc-1.0.0.tgz` |
| `@embedpdf/fonts-tc` | `1.0.0` | `OFL-1.1` | `21262bb512ede384c3fb84b952a6812b98e793f4` | `https://registry.npmjs.org/@embedpdf/fonts-tc/-/fonts-tc-1.0.0.tgz` |

The registry license field is metadata, not complete redistribution clearance for bundled binaries or font assets.

## 8. Lifecycle-script metadata

For the 18 exact version records, the observed package metadata returned ordinary project scripts such as `build`, `clean`, and `lint`, but did not return any `preinstall`, `install`, `postinstall`, or `prepare` key for the queried exact records.

```text
OBSERVED_PREINSTALL_KEYS = 0
OBSERVED_INSTALL_KEYS = 0
OBSERVED_POSTINSTALL_KEYS = 0
OBSERVED_PREPARE_KEYS = 0
```

This is registry package metadata observation only. It is not an archive payload scan and cannot prove that an archive contains no executable payload or remote-download behavior outside lifecycle metadata.

The published `@embedpdf/pdfium@2.15.0` metadata includes development/build scripts that reference WASM generation and Docker, but those are not observed installation lifecycle keys and are not executed by 004C1I.

## 9. Deprecation and vulnerability observations

For all 18 exact queried records:

```text
DEPRECATED_FIELD = null
OSV_EXACT_VERSION_FINDINGS = NONE_OBSERVED
```

The dependency traversal independently reported:

```text
VULNERABLE_PACKAGE_COUNT = 0
TOTAL_VULNERABILITIES = 0
UNRESOLVED_COUNT = 0
TRUNCATED = FALSE
```

These are time-bounded public advisory observations. They do not prove future security, absence of unpublished vulnerabilities, runtime safety, or suitability for adoption.

## 10. License metadata classification boundary

Registry metadata reports:

```text
11 software package records -> MIT
7 font package records -> OFL-1.1
```

A registry-license classification check found no default-policy violation for the 18 records, but the seven OFL records required manual classification by that tool. 004C1I therefore does not promote the check into legal clearance.

The following remain separate required evidence:

```text
PDFIUM_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
PDFIUM_WASM_ARCHIVE_SOURCE_BUILD_BINDING = NOT_ESTABLISHED
FONT_EXACT_ASSET_NOTICE_SET = NOT_ESTABLISHED
FONT_EXTRACTED_ASSET_DIGEST_SET = NOT_ESTABLISHED
FONT_REDISTRIBUTION_CLEARANCE = NOT_CLAIMED
```

## 11. Historical evidence reconciliation

Canonical 004C1B and 004C1C were correct to remain fail closed with the evidence available at their closeout. 004C1I supplements, rather than rewrites, those historical records.

The current read-only registry observation now establishes the dependency-only declared map for these exact selected roots and reachable exact versions. It does not retroactively convert historical `UNPROVEN` statements into claims that were known at those earlier commit times.

## 12. Explicitly unproven boundaries

The following remain fail closed after 004C1I:

```text
COMPLETE_PEER_DEPENDENCY_CLOSURE = UNPROVEN
COMPLETE_PEER_DEPENDENCY_META = UNPROVEN
COMPLETE_OPTIONAL_DEPENDENCY_CLOSURE = UNPROVEN
FRAMEWORK_PEER_POLICY = UNRESOLVED
EXACT_SIGNTHOS_DEPENDENCY_DECLARATION_SET = NOT_AUTHORIZED
ROOT_MANIFEST_BYTES = NOT_AUTHORIZED
WORKSPACE_BYTES = NOT_AUTHORIZED
PNPM_CONFIG_BYTES = NOT_AUTHORIZED
PNPM_PROVISIONING = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
LOCKFILE = NOT_GENERATED
PACKAGE_MANAGER_RESOLVED_GRAPH = NOT_GENERATED
PACKAGE_ARCHIVE_PAYLOAD_DIGEST_SET = NOT_ESTABLISHED
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = NOT_ESTABLISHED
PDFIUM_DISTRIBUTION_NOTICE_SET = NOT_ESTABLISHED
PDFIUM_WASM_ARCHIVE_SOURCE_BUILD_BINDING = NOT_ESTABLISHED
FONT_NOTICE_SET = NOT_ESTABLISHED
FONT_EXTRACTED_ASSET_DIGEST_SET = NOT_ESTABLISHED
PROVENANCE_SBOM = NOT_GENERATED
```

A registry `shasum` is not a locally recomputed archive digest and must not be treated as one.

## 13. Required future package-control inputs

A later package-control-content grain, if freshly authorized, must reconcile at least:

- peer and optional metadata closure;
- framework peer policy for the headless provider boundary;
- exact root package declarations;
- exact workspace membership;
- exact pnpm provisioning and package-manager policy bytes;
- source/archive and notice obligations;
- lifecycle execution policy;
- release-age/registry/network policy;
- exact resolver command and writable surface.

004C1I does not authorize that grain.

## 14. Acceptance criteria

004C1I may close canonically only if:

- one Signthos-authored evidence file under `specs/004-local-pdf-core/**` is the complete changed surface;
- the exact eight planning roots and dependency-only reachable identities are recorded;
- exact observed published dependency maps are recorded for every reachable identity;
- traversal limits and observed completeness are explicit;
- registry tarball/shasum/license/lifecycle/deprecation/vulnerability metadata claims remain bounded to what was observed;
- peers, optional dependencies, package-manager resolution, archive payload, source binding, notices, and runtime remain explicitly unproven;
- no package-control, cache, provenance, NOTICE, SBOM, source/runtime, workflow, container, database, or deployment surface is mutated;
- fresh independent substantive exact-head review reports no material findings;
- unresolved material review threads are zero;
- Actions/status/provider accounting is truthful;
- guarded normal merge uses exact `expected_head_sha`;
- merge tree equality, ordered parents, signature, changed surface, and post-merge checks are mechanically verified.

## 15. Current result and successor boundary

```text
004C1I_DEPENDENCY_ONLY_DECLARED_CLOSURE = QUALIFIED_FOR_OBSERVED_EXACT_VERSION_RECORDS
004C1I_PEER_OPTIONAL_CLOSURE = FAIL_CLOSED
004C1I_PACKAGE_CONTROL_READINESS = FAIL_CLOSED
004C1I_RESOLVER_READINESS = FAIL_CLOSED
004C1I_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

After 004C1I canonical closeout, governance must be reread before any peer/optional/package-control/provisioning/resolver successor is authorized.

## 16. Explicit non-claims

004C1I does not claim package-manager availability, Node availability, workspace existence, complete peer metadata, complete optional metadata, dependency adoption, acquisition, archive verification, lockfile generation, resolver determinism, source equivalence, PDFium redistribution readiness, font redistribution readiness, provider readiness, PDF runtime readiness, 004C2 readiness, 004D readiness, or Specification 005 authority.
