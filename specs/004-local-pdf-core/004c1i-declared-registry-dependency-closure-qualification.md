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

The traversal was bounded to depth 3 and returned:

```text
ROOT_COUNT = 8
REACHABLE_PACKAGE_IDENTITY_COUNT = 18
MAX_DEPTH = 3
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

## 11. Reconciliation with 004C1B and 004C1C

Historical 004C1B and 004C1C were correct to fail closed because their exact runs did not establish a complete declared dependency closure.

004C1I adds later evidence without rewriting those historical records:

```text
004C1B_ENGINE_COMPLETE_PUBLISHED_DEPENDENCY_MAP = HISTORICALLY_NOT_ESTABLISHED
004C1C_COMPLETE_DECLARED_TRANSITIVE_METADATA_CLOSURE = HISTORICALLY_NOT_ESTABLISHED
004C1I_DEPENDENCY_ONLY_DECLARED_CLOSURE = ESTABLISHED_FOR_THE_SELECTED_EIGHT_ROOTS_AND_OBSERVED_EXACT_VERSION_RECORDS
```

This supersedes only the missing dependency-only metadata fact. It does not supersede the peer, optional, resolver, archive, source-binding, notice, or runtime blockers.

## 12. Explicit unresolved evidence

```text
COMPLETE_PEER_DEPENDENCY_METADATA_CLOSURE = NOT_ESTABLISHED
COMPLETE_PEER_DEPENDENCIES_META_CLOSURE = NOT_ESTABLISHED
COMPLETE_OPTIONAL_DEPENDENCY_METADATA_CLOSURE = NOT_ESTABLISHED
FRAMEWORK_PEER_INSTALLATION_SET = UNRESOLVED
FRAMEWORK_ADOPTION_AUTHORITY = ABSENT
ROOT_MANIFEST_EXACT_CONTENT = NOT_AUTHORIZED
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
ROOT_WORKSPACE_MEMBERSHIP = UNRESOLVED_FAIL_CLOSED
EXACT_DEPENDENCY_DECLARATION_SET = NOT_AUTHORIZED
EXACT_PNPM_PROVISIONING_MECHANISM = NOT_AUTHORIZED
EXACT_NODE_DISTRIBUTION_SHA256 = NOT_ESTABLISHED
EXACT_RESOLVER_COMMAND = NOT_AUTHORIZED
EXACT_NETWORK_ALLOWLIST = NOT_AUTHORIZED
EXACT_CACHE_MODE = NOT_AUTHORIZED
EXACT_WRITABLE_SURFACE = NOT_AUTHORIZED
LOCKFILE = NOT_GENERATED
RESOLVED_GRAPH = NOT_GENERATED
COMPLETE_ARCHIVE_INTEGRITY_SET_FOR_RESOLVED_GRAPH = NOT_ESTABLISHED
REGISTRY_ARCHIVE_PAYLOAD_CHARACTERIZATION = NOT_ESTABLISHED
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = UNPROVEN
PDFIUM_WASM_EXACT_ACQUISITION_DIGEST = NOT_ESTABLISHED
PDFIUM_WASM_ARCHIVE_SOURCE_BUILD_BINDING = NOT_ESTABLISHED
PDFIUM_DISTRIBUTION_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
FONT_EXACT_ASSET_NOTICE_SET = NOT_ESTABLISHED
FONT_EXTRACTED_ASSET_DIGEST_SET = NOT_ESTABLISHED
```

Therefore:

```text
004C1I_DEPENDENCY_ACQUISITION_ELIGIBILITY = FAIL_CLOSED
004C1I_RESOLVER_READINESS = FAIL_CLOSED
004C1I_PROVIDER_RUNTIME_ELIGIBILITY = FAIL_CLOSED
```

## 13. Acceptance criteria

004C1I may close canonically only if:

- the final candidate remains one Signthos-authored qualification file under `specs/004-local-pdf-core/**`;
- the canonical PR base remains exact live `main` at immediate premerge qualification;
- the dependency-only traversal scope and exclusions remain explicit;
- all 18 reachable exact package/version identities and dependency maps are represented without promoting them to a lockfile graph;
- registry tarball/shasum/license/lifecycle/deprecation/vulnerability observations are identified as metadata rather than archive or runtime proof;
- peer/optional/framework/resolver/archive/source-binding/PDFium/font-notice gaps remain fail closed;
- no package-control, dependency, source, archive, provenance, NOTICE, SBOM, workflow, runtime, database, or deployment mutation occurs;
- no package manager, Node, Corepack, resolver, registry acquisition, provider, or PDF engine executes;
- fresh independent substantive exact-head review reports no material findings;
- unresolved material review threads are zero;
- workflow/check/provider accounting is truthful;
- guarded normal merge uses exact `expected_head_sha`;
- merge SHA, signature, ordered parents, tree, and exact canonical surface are mechanically verified post-merge.

## 14. Required successor reconciliation

Canonical 004C1I closeout does not authorize package-control mutation or resolver execution.

After canonicalization, live governance must reconcile the remaining peer/optional/framework policy and package-control/provisioning blockers before any future `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, package acquisition, or resolver execution authority may be considered.

A possible later grain may qualify peer/optional metadata and the exact Signthos framework-facing dependency declaration policy. Another later grain may freeze package-control bytes and provisioning inputs. Neither is authorized by 004C1I by name or implication.

## 15. Explicit non-claims

004C1I does not claim dependency adoption, installation, package-manager availability, Node availability, lockfile generation, resolved installation layout, peer resolution, optional-dependency resolution, framework selection, archive contents, archive/source equivalence, PDFium redistribution completion, font redistribution completion, provider runtime safety, PDF behavior, 004C2 readiness, 004D readiness, Specification 004 completion, or Specification 005 authority.
