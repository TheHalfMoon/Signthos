# Specification 004C1O — Exact Root Manifest Byte Serialization Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_ROOT_MANIFEST_BYTE_SERIALIZATION_ONLY / FAIL_CLOSED`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `ad24c7f420df8b3dcc19273a752772d669015043`
Canonical predecessor tree: `921a90a5a8861fce4ea1d2a2c6b884e781fb97e1`
Authority source: `github:issue-comment:5574826611`

## 1. Purpose and authority boundary

004C1O freezes one exact proposed UTF-8 byte serialization of the repository-root `package.json` semantic object already qualified by canonical 004C1M and 004C1N. It does not reopen package identities, versions, dependency classifications, peer ownership, framework-peer omission policy, root-manifest field ownership, or root-manifest semantic values.

```text
004C1O_AUTHORITY = PLANNING_ROOT_MANIFEST_BYTE_SERIALIZATION_QUALIFICATION_ONLY
004C1O_ALLOWED_SURFACE = specs/004-local-pdf-core/**
004C1O_CANONICAL_004C1M_N_RECONCILIATION_AUTHORITY = PRESENT
004C1O_EXACT_PROPOSED_PACKAGE_JSON_BYTES_QUALIFICATION_AUTHORITY = PRESENT
004C1O_EXACT_PROPOSED_PACKAGE_JSON_SHA256_QUALIFICATION_AUTHORITY = PRESENT
004C1O_SEMANTIC_DRIFT_AUTHORITY = ABSENT
004C1O_PACKAGE_JSON_MUTATION_AUTHORITY = ABSENT
004C1O_PNPM_WORKSPACE_MUTATION_AUTHORITY = ABSENT
004C1O_PNPM_LOCKFILE_MUTATION_AUTHORITY = ABSENT
004C1O_NPMRC_MUTATION_AUTHORITY = ABSENT
004C1O_PACKAGE_EXTENSION_SERIALIZATION_AUTHORITY = ABSENT
004C1O_PACKAGE_MANAGER_NODE_COREPACK_RESOLVER_EXECUTION_AUTHORITY = ABSENT
004C1O_DEPENDENCY_ADOPTION_ACQUISITION_INSTALL_AUTHORITY = ABSENT
004C1O_ARCHIVE_SOURCE_BINARY_FIXTURE_IMPORT_AUTHORITY = ABSENT
004C1O_PROVENANCE_NOTICE_SBOM_MUTATION_AUTHORITY = ABSENT
004C1O_PROVIDER_PDF_RUNTIME_AUTHORITY = ABSENT
004C1P_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact does not create `/package.json`. It executes no package manager, Node.js, Corepack, resolver, provider, or PDF runtime command and acquires no dependency or package archive.

## 2. Canonical inputs consumed without reopening

Canonical 004C1M fixes the only direct dependency section to eight exact runtime dependencies at literal `2.15.0`.

Canonical 004C1N fixes the complete root-manifest semantic object to exactly:

```text
name = signthos
private = true
packageManager = pnpm@10.34.5
type = commonjs
engines.node = 24.20.0
dependencies = EXACT_004C1M_8_RUNTIME_SET
version = ABSENT
scripts = ABSENT
workspaces = ABSENT
devDependencies = ABSENT
peerDependencies = ABSENT
optionalDependencies = ABSENT
root package-manager policy fields = ABSENT
entrypoint/publication metadata = ABSENT
root license simplification metadata = ABSENT
unqualified extra fields = ABSENT
```

004C1O changes none of those semantics. Its only job is to remove byte-level ambiguity for a later mutation-authorizing unit.

## 3. Live root fact boundary

At canonical predecessor `ad24c7f420df8b3dcc19273a752772d669015043`:

```text
ROOT_PACKAGE_JSON = ABSENT
ROOT_PNPM_WORKSPACE_YAML = ABSENT
ROOT_PNPM_LOCK_YAML = ABSENT
ROOT_NPMRC = PRESENT
```

The live root still contains no `package.json` bytes. This artifact remains under `specs/004-local-pdf-core/**` only.

## 4. Exact serialization policy

The proposed root-manifest bytes are qualified with all of the following properties:

```text
ENCODING = UTF-8
BYTE_ORDER_MARK = ABSENT
LINE_ENDING = LF / 0x0A
INDENTATION = TWO_ASCII_SPACES
JSON_KEY_ORDER = EXACT_AS_RECORDED_BELOW
TRAILING_WHITESPACE = ABSENT
TERMINAL_NEWLINE = PRESENT / exactly one LF
BYTE_LENGTH = 509
SHA256 = 71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183
```

No JSON canonicalization standard is claimed. This is an intentionally simple repository-owned exact serialization contract: the literal byte sequence below is the authority.

## 5. Exact proposed `/package.json` bytes

The following fenced content represents the exact UTF-8 text bytes, followed by exactly one terminal LF after the closing `}`. The Markdown fence itself is not part of the proposed file.

```json
{
  "name": "signthos",
  "private": true,
  "packageManager": "pnpm@10.34.5",
  "type": "commonjs",
  "engines": {
    "node": "24.20.0"
  },
  "dependencies": {
    "@embedpdf/core": "2.15.0",
    "@embedpdf/pdfium": "2.15.0",
    "@embedpdf/plugin-document-manager": "2.15.0",
    "@embedpdf/plugin-interaction-manager": "2.15.0",
    "@embedpdf/plugin-render": "2.15.0",
    "@embedpdf/plugin-search": "2.15.0",
    "@embedpdf/plugin-selection": "2.15.0",
    "@embedpdf/plugin-thumbnail": "2.15.0"
  }
}
```

The exact proposed byte identity is:

```text
PROPOSED_ROOT_PACKAGE_JSON_BYTE_LENGTH = 509
PROPOSED_ROOT_PACKAGE_JSON_SHA256 = 71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183
```

## 6. Field and key order

The top-level key order is exactly:

1. `name`
2. `private`
3. `packageManager`
4. `type`
5. `engines`
6. `dependencies`

The `engines` object contains exactly one key:

1. `node`

The `dependencies` key order is exactly:

1. `@embedpdf/core`
2. `@embedpdf/pdfium`
3. `@embedpdf/plugin-document-manager`
4. `@embedpdf/plugin-interaction-manager`
5. `@embedpdf/plugin-render`
6. `@embedpdf/plugin-search`
7. `@embedpdf/plugin-selection`
8. `@embedpdf/plugin-thumbnail`

This order is a byte-identity choice only. It does not create semantic priority among dependencies.

## 7. Byte identity derivation contract

A conforming mechanical verifier for the proposed bytes must:

1. construct or read the exact literal UTF-8 bytes specified in Section 5;
2. preserve LF line endings and exactly one terminal LF;
3. reject a UTF-8 BOM;
4. count exactly `509` bytes;
5. compute SHA-256 over those exact bytes;
6. obtain exactly `71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183`;
7. parse the bytes as JSON;
8. verify semantic equality with canonical 004C1N and exact dependency equality with canonical 004C1M.

Any mismatch is fail-closed.

The hash binds the proposed bytes, not this Markdown artifact and not a future filesystem file unless that future file is independently proven byte-identical.

## 8. Semantic drift prohibition

A later serializer must not use byte qualification as permission to alter semantics. All of these are failures even if the result is valid JSON:

```text
NAME_DRIFT = FAIL
PRIVATE_DRIFT = FAIL
PACKAGE_MANAGER_DRIFT = FAIL
TYPE_DRIFT = FAIL
NODE_ENGINE_DRIFT = FAIL
DEPENDENCY_IDENTITY_DRIFT = FAIL
DEPENDENCY_VERSION_DRIFT = FAIL
EXTRA_DEPENDENCY_CLASS = FAIL
SCRIPTS_ADDED = FAIL_UNLESS_LATER_AUTHORIZED
WORKSPACES_ADDED = FAIL
PACKAGE_MANAGER_POLICY_FIELD_ADDED = FAIL_UNLESS_LATER_AUTHORIZED
ENTRYPOINT_OR_PUBLICATION_METADATA_ADDED = FAIL_UNLESS_LATER_AUTHORIZED
ROOT_LICENSE_SIMPLIFICATION_ADDED = FAIL_UNLESS_LATER_AUTHORIZED
UNQUALIFIED_EXTRA_FIELD = FAIL
```

004C1N remains semantic authority; 004C1O only binds one exact serialization of it.

## 9. Byte drift failure rules

For a future candidate that claims exact 004C1O byte compatibility:

```text
NON_UTF8_ENCODING = FAIL
UTF8_BOM_PRESENT = FAIL
CRLF_OR_CR_LINE_ENDING = FAIL
INDENTATION_DRIFT = FAIL
KEY_ORDER_DRIFT = FAIL
TRAILING_WHITESPACE = FAIL
TERMINAL_NEWLINE_ABSENT = FAIL
MULTIPLE_TERMINAL_NEWLINES = FAIL
BYTE_LENGTH_NOT_509 = FAIL
SHA256_MISMATCH = FAIL
JSON_PARSE_FAILURE = FAIL
SEMANTIC_MISMATCH_WITH_004C1N = FAIL
DEPENDENCY_MISMATCH_WITH_004C1M = FAIL
```

Semantically equivalent but byte-different JSON does not satisfy an **exact-byte** claim. A later canonical unit may deliberately authorize a different byte serialization only by reopening byte identity explicitly; it may not silently treat a different digest as equivalent evidence.

## 10. Future mutation acceptance boundary

A future separately authorized `/package.json` mutation may cite 004C1O only if it proves, after the mutation:

```text
PATH = /package.json
BYTE_LENGTH = 509
SHA256 = 71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183
JSON_PARSE = PASS
SEMANTIC_MATCH_004C1N = PASS
DEPENDENCY_MATCH_004C1M = PASS
UNAUTHORIZED_ADDITIONAL_PATH_MUTATIONS = 0
```

004C1O does not authorize that mutation. It only makes its future acceptance condition deterministic.

## 11. Workspace and policy separation

004C1O intentionally does not serialize any workspace or pnpm policy into the root manifest.

Still unresolved:

```text
PNPM_WORKSPACE_EXACT_CONTENT = NOT_AUTHORIZED
PNPM_WORKSPACE_SHA256 = NOT_ESTABLISHED
ROOT_WORKSPACE_MEMBERSHIP = UNRESOLVED_FAIL_CLOSED
EXACT_PACKAGE_EXTENSION_SERIALIZATION_LOCATION = NOT_AUTHORIZED
EXACT_NPMRC_RECONCILIATION = NOT_AUTHORIZED
```

The absence of a root `workspaces` field remains canonical. `pnpm-workspace.yaml` is the future workspace-membership authority once separately qualified.

## 12. Provisioning and resolver separation

004C1O does not close any execution-bearing resolver gate:

```text
EXACT_PNPM_PROVISIONING_MECHANISM = NOT_AUTHORIZED
EXACT_PNPM_DISTRIBUTION_SHA256 = NOT_ESTABLISHED
EXACT_NODE_DISTRIBUTION_SHA256 = NOT_ESTABLISHED
EXACT_RESOLVER_COMMAND = NOT_AUTHORIZED
EXACT_NETWORK_ALLOWLIST = NOT_AUTHORIZED
EXACT_CACHE_MODE = NOT_AUTHORIZED
EXACT_WRITABLE_SURFACE = NOT_AUTHORIZED
LOCKFILE = NOT_GENERATED
RESOLVED_GRAPH = NOT_GENERATED
PACKAGE_ARCHIVE_IDENTITY_SET = NOT_ESTABLISHED
DEPENDENCY_ADOPTION = NOT_AUTHORIZED
```

No resolver readiness, installation readiness, package acquisition, runtime support, or release readiness is claimed.

## 13. Current root-manifest state after this grain

If 004C1O becomes canonical, the intended evidence state is:

```text
ROOT_MANIFEST_SEMANTIC_SHAPE = CANONICAL_004C1N
PROPOSED_ROOT_MANIFEST_EXACT_BYTES = QUALIFIED
PROPOSED_ROOT_MANIFEST_BYTE_LENGTH = 509
PROPOSED_ROOT_MANIFEST_SHA256 = 71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183
ROOT_PACKAGE_JSON_BYTES = STILL_NOT_CREATED
ROOT_PACKAGE_JSON_LIVE_SHA256 = NOT_ESTABLISHED
ROOT_PACKAGE_JSON_MUTATION_AUTHORITY = ABSENT
```

The distinction between **proposed qualified bytes** and **live repository bytes** is mandatory.

## 14. Acceptance criteria

004C1O may close canonically only if:

- the candidate remains one Signthos-authored planning qualification file under `specs/004-local-pdf-core/**`;
- canonical main at branch creation is exactly `ad24c7f420df8b3dcc19273a752772d669015043`;
- the artifact reproduces canonical 004C1N semantics with zero drift;
- the exact proposed serialization is UTF-8 without BOM, LF-only, two-space-indented, and has exactly one terminal LF;
- byte length is independently reproducible as `509`;
- SHA-256 is independently reproducible as `71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183`;
- no `/package.json`, workspace, lockfile, `.npmrc`, provenance, NOTICE, SBOM, workflow, source, runtime, cache, database, container, or fixture file is created or mutated;
- no package manager, Node, Corepack, resolver, registry, provider, or PDF engine is executed;
- no dependency is adopted, acquired, downloaded, installed, or imported;
- exact base/head/tree and changed-surface evidence is recorded;
- exact-head provider/check state is accounted truthfully;
- a fresh independent substantive exact-head review is obtained;
- all material findings are repaired forward-only and every changed head is re-reviewed;
- unresolved material review threads are zero;
- mandatory exact-head pre-merge proof is recorded;
- guarded normal merge uses the exact reviewed head;
- post-merge verification proves reviewed-head/merge-tree equality and exact changed surface;
- fresh canonical reconciliation derives any successor rather than assuming it.

## 15. Explicit non-claims

004C1O does not claim:

- that `/package.json` exists;
- that any package-control mutation is authorized;
- that pnpm or Node is provisioned;
- that dependency resolution is executable or reproducible;
- that a lockfile or resolved graph exists;
- that package archives have been acquired;
- that dependencies are installed or adopted;
- that provider/PDF runtime behavior exists;
- that CI, tests, resolver execution, installation, browser behavior, PDF behavior, redistribution, or release readiness passed;
- that 004C1P, 004C2, 004D, or Specification 005 is authorized.

## 16. Qualification result

```text
004C1O_EXACT_ROOT_MANIFEST_BYTE_SERIALIZATION = QUALIFIED_CANDIDATE
PROPOSED_ROOT_MANIFEST_BYTE_LENGTH = 509
PROPOSED_ROOT_MANIFEST_SHA256 = 71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183
ROOT_PACKAGE_JSON_BYTES = NOT_CREATED
ROOT_PACKAGE_JSON_MUTATION_AUTHORITY = ABSENT
WORKSPACE_CONTROL = UNRESOLVED_FAIL_CLOSED
NPMRC_RECONCILIATION = UNRESOLVED_FAIL_CLOSED
PACKAGE_MANAGER_PROVISIONING = UNRESOLVED_FAIL_CLOSED
RESOLVER_EXECUTION = UNRESOLVED_FAIL_CLOSED
DEPENDENCY_ADOPTION = NOT_AUTHORIZED
PROVIDER_PDF_RUNTIME = NOT_AUTHORIZED
004C1P_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004C2_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

The exact bytes and digest become canonical only after this candidate passes fresh independent exact-head review, guarded merge, post-merge verification, and mandatory successor reconciliation.