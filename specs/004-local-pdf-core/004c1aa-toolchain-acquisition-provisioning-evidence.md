# Specification 004C1AA — Toolchain Acquisition and Provisioning Evidence

Status: `EVIDENCE_CANDIDATE / TOOLCHAIN_BYTES_ONLY / MEASUREMENT_PENDING / ZERO_TOOL_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `ec21df979a7a1b0e8132c47ffc3f6cebcb6879bd`
Canonical predecessor tree: `7159c1e8b081f31c264840053d564c16938466e4`
Authority source: `github:issue-comment:5591296864`

## 1. Purpose and exact authority

004C1AA exists only to acquire, integrity-check, extract, and hash the exact Node and pnpm toolchain artifacts already selected by canonical 004C1Z, using an ephemeral evidence root outside the Signthos repository.

```text
004C1AA_AUTHORITY = BOUNDED_TOOLCHAIN_ACQUISITION_EXTRACTION_HASH_EVIDENCE_ONLY
004C1AA_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1aa-toolchain-acquisition-provisioning-evidence.md
004C1AA_MAX_CHANGED_REPOSITORY_FILES = 1
EXTERNAL_EVIDENCE_ROOT = EPHEMERAL_OUTSIDE_REPOSITORY
NODE_EXECUTION = NOT_AUTHORIZED
PNPM_EXECUTION = NOT_AUTHORIZED
COREPACK_EXECUTION = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
PROJECT_DEPENDENCY_ACQUISITION = NOT_AUTHORIZED
PROJECT_DEPENDENCY_INSTALLATION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_MUTATION = NOT_AUTHORIZED
PACKAGES_PROVIDERS_CREATION = NOT_AUTHORIZED
SOURCE_BINARY_FIXTURE_IMPORT_INTO_REPOSITORY = NOT_AUTHORIZED
PROVENANCE_NOTICE_SBOM_MUTATION = NOT_AUTHORIZED
PROVIDER_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No acquired or extracted toolchain byte may be committed to Signthos by this unit.

## 2. Canonical identities consumed without reopening

```text
PACKAGE_MANAGER = pnpm
PACKAGE_MANAGER_VERSION = 10.34.5
PNPM_SOURCE_TAG = pnpm/pnpm@v10.34.5
PNPM_SOURCE_COMMIT = 702ad5f860ffd50d64a3a711d9f8a3da16fc796e
PNPM_SOURCE_ENTRYPOINT = bin/pnpm.cjs
NODE_VERSION = 24.20.0
NODE_RELEASE_LINE = Krypton
NODE_RELEASE_STATUS = LTS
FIRST_TOOLCHAIN_PLATFORM = linux-x64-glibc
NODE_ARCHIVE_NAME = node-v24.20.0-linux-x64.tar.xz
NODE_ARCHIVE_URL = https://nodejs.org/dist/v24.20.0/node-v24.20.0-linux-x64.tar.xz
NODE_EXPECTED_SHA256 = 2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2
NODE_SHASUMS_URL = https://nodejs.org/dist/v24.20.0/SHASUMS256.txt
PNPM_PACKUMENT_URL = https://registry.npmjs.org/pnpm/10.34.5
PNPM_EXPECTED_TARBALL_URL = https://registry.npmjs.org/pnpm/-/pnpm-10.34.5.tgz
PNPM_EXPECTED_SHA1 = 6a91127a7f2ca72fe53bb9ff54883e0c75b22f17
PNPM_EXPECTED_DIST_INTEGRITY = sha512-pO4F8vc2WCVb1qiYWcBlpFwopX2u+uLIk6Fo7itzFow3uR6D5X6mdlStA/AwMXRkMOi84442LgQmBfuKvIAZLg==
```

These identities are inputs. 004C1AA may verify them; it may not silently replace them.

## 3. Network boundary

Permitted public read origins are exactly:

```text
https://nodejs.org/
https://registry.npmjs.org/
```

The exact artifact requests are limited to the Node checksum list, the exact Node archive, the exact-version pnpm packument, and the packument-bound pnpm tarball. Cross-origin redirects fail closed.

No credential, token, private registry, mirror, proxy, custom CA, GitHub release asset, package-manager self-download, or alternate artifact host is authorized.

## 4. Evidence procedure

A conforming evidence run must execute these operations in order without executing Node or pnpm:

1. create a unique empty evidence root outside the repository;
2. fetch official Node `SHASUMS256.txt`;
3. extract the checksum for `node-v24.20.0-linux-x64.tar.xz` and require exact equality with the canonical expected SHA-256;
4. fetch exactly the Node archive with cross-origin redirects prohibited;
5. compute archive byte length and SHA-256;
6. reject before extraction unless the local SHA-256 equals the official expected SHA-256;
7. extract the verified archive outside the repository;
8. locate exact extracted `bin/node` and compute its byte length and SHA-256 without executing it;
9. immediately fetch the exact npm packument for `pnpm@10.34.5`;
10. record package `name`, `version`, `license`, `engines`, `bin`, and exact `dist` metadata relevant to tarball identity, integrity, signatures, and attestations;
11. require exact `name=pnpm`, `version=10.34.5`, exact tarball URL, exact SHA-1, and exact `dist.integrity`;
12. fetch exactly the packument-bound pnpm tarball with cross-origin redirects prohibited;
13. compute tarball byte length, SHA-1, SHA-256, and SHA-512/SRI from acquired bytes;
14. reject before extraction unless acquired SHA-1 and SHA-512/SRI equal the authoritative packument values;
15. extract the verified pnpm tarball outside the repository;
16. read the extracted package manifest without executing package code;
17. require exact `name=pnpm`, `version=10.34.5`, and `bin.pnpm=bin/pnpm.cjs`;
18. compute byte length and SHA-256 of exact extracted `bin/pnpm.cjs` without executing it;
19. inventory the evidence root and confirm no path under the Signthos repository was modified by acquisition/extraction;
20. record all measured values and evidence provenance below.

Any failed precondition terminates the evidence run. No retry with a different artifact, version, host, checksum, or extraction target can be promoted as the same qualifying attempt.

## 5. Measurement provenance

The local ChatGPT working container attempted to begin the authorized public read but its container network could not resolve `nodejs.org`. That failed environmental attempt is not evidence of artifact failure and is not promoted to qualification evidence.

```text
LOCAL_CONTAINER_NETWORK_ATTEMPT = NONQUALIFYING_ENVIRONMENT_FAILURE
LOCAL_CONTAINER_FAILURE_CLASS = DNS_RESOLUTION_UNAVAILABLE
NODE_OR_PNPM_BYTES_ACQUIRED_BY_LOCAL_CONTAINER = NO
```

Because 004C1AA requires real acquired-byte evidence, this candidate remains fail closed until an external review/evidence environment with public read access performs the exact procedure and records reproducible command outputs. Evidence generated by such an environment must identify the exact commands, URLs, byte lengths, hashes, package metadata, and non-execution boundary. It must not modify repository files directly.

## 6. Required measured evidence record

Current candidate state before external measurement:

```text
EVIDENCE_EXECUTION_ENVIRONMENT = PENDING
EVIDENCE_EXECUTION_PROVIDER = PENDING
NODE_SHASUMS_EXACT_ENTRY = PENDING
NODE_ARCHIVE_ACQUISITION = PENDING
NODE_ARCHIVE_BYTE_LENGTH = PENDING
NODE_ARCHIVE_SHA256 = PENDING
NODE_ARCHIVE_SHA256_MATCH = PENDING
NODE_EXTRACTED_BIN_NODE_BYTE_LENGTH = PENDING
NODE_EXTRACTED_BIN_NODE_SHA256 = PENDING
PNPM_PACKUMENT_REREAD = PENDING
PNPM_PACKUMENT_NAME = PENDING
PNPM_PACKUMENT_VERSION = PENDING
PNPM_PACKUMENT_LICENSE = PENDING
PNPM_PACKUMENT_ENGINES = PENDING
PNPM_PACKUMENT_BIN = PENDING
PNPM_PACKUMENT_TARBALL = PENDING
PNPM_PACKUMENT_SHA1 = PENDING
PNPM_PACKUMENT_DIST_INTEGRITY = PENDING
PNPM_PACKUMENT_SIGNATURES = PENDING
PNPM_PACKUMENT_ATTESTATIONS = PENDING
PNPM_TARBALL_ACQUISITION = PENDING
PNPM_TARBALL_BYTE_LENGTH = PENDING
PNPM_TARBALL_SHA1 = PENDING
PNPM_TARBALL_SHA1_MATCH = PENDING
PNPM_TARBALL_SHA256 = PENDING
PNPM_TARBALL_SHA512_SRI = PENDING
PNPM_TARBALL_DIST_INTEGRITY_MATCH = PENDING
PNPM_EXTRACTED_MANIFEST_NAME = PENDING
PNPM_EXTRACTED_MANIFEST_VERSION = PENDING
PNPM_EXTRACTED_MANIFEST_BIN_PNPM = PENDING
PNPM_EXTRACTED_ENTRYPOINT_BYTE_LENGTH = PENDING
PNPM_EXTRACTED_ENTRYPOINT_SHA256 = PENDING
NODE_EXECUTED = NO
PNPM_EXECUTED = NO
COREPACK_EXECUTED = NO
RESOLVER_EXECUTED = NO
PROJECT_DEPENDENCIES_ACQUIRED = NO
REPOSITORY_ARTIFACT_BYTES_IMPORTED = NO
QUALIFICATION = FAIL_CLOSED_PENDING_REAL_MEASUREMENT
```

No `PENDING` field may be converted to `PASS` without real evidence from the exact authorized operation.

## 7. Evidence acceptance rules

004C1AA measurement can be accepted only if all of the following are true:

```text
OFFICIAL_NODE_SHASUM_ENTRY_MATCH = PASS
NODE_ARCHIVE_LOCAL_SHA256_MATCH = PASS
NODE_EXTRACTED_EXECUTABLE_HASH = PRESENT
PNPM_EXACT_VERSION_PACKUMENT_REREAD = PASS
PNPM_TARBALL_URL_MATCH = PASS
PNPM_REGISTRY_SHA1_MATCH = PASS
PNPM_REGISTRY_DIST_INTEGRITY_MATCH = PASS
PNPM_ACQUIRED_SHA1_MATCH = PASS
PNPM_ACQUIRED_SHA512_SRI_MATCH = PASS
PNPM_ACQUIRED_LOCAL_SHA256 = PRESENT
PNPM_EXTRACTED_PACKAGE_IDENTITY = PASS
PNPM_EXTRACTED_ENTRYPOINT_HASH = PRESENT
REPOSITORY_MUTATION_FROM_ACQUISITION = ZERO
NODE_EXECUTION = ZERO
PNPM_EXECUTION = ZERO
COREPACK_EXECUTION = ZERO
RESOLVER_EXECUTION = ZERO
PROJECT_DEPENDENCY_ACQUISITION = ZERO
```

Registry signature or attestation metadata must be reported exactly as observed. Presence is not equivalent to local cryptographic verification unless such verification is separately performed and evidenced.

## 8. Repository-surface proof

The only repository mutation authorized for 004C1AA is this evidence artifact. All downloaded archives and extracted bytes must remain outside the repository.

A final candidate must prove from canonical base to exact head:

```text
CHANGED_FILES = 1
CHANGED_PATH = specs/004-local-pdf-core/004c1aa-toolchain-acquisition-provisioning-evidence.md
PACKAGE_JSON_MUTATION = 0
PNPM_WORKSPACE_MUTATION = 0
PNPM_LOCKFILE_MUTATION = 0
PACKAGES_PROVIDERS_MUTATION = 0
WORKFLOW_MUTATION = 0
SOURCE_MUTATION = 0
FIXTURE_MUTATION = 0
PROVENANCE_NOTICE_SBOM_MUTATION = 0
```

## 9. Qualification and review boundary

A final 004C1AA candidate must receive:

- exact base/head/tree mechanical accounting;
- truthful exact-head Actions/check/provider accounting;
- a fresh independent substantive review of the complete evidence artifact and the underlying real measurement procedure/results;
- forward-only repair of every material finding;
- fresh review after every changed head;
- zero unresolved material review threads;
- immediate premerge race proof;
- guarded normal merge using the exact reviewed head SHA;
- post-merge verification of ordered parents, signature, tree equality, exact surface, and workflow/check state;
- fresh Issue #7 successor reconciliation.

An evidence provider that performs the measurements may provide the raw measurements, but after those measurements are written into a new candidate head, a fresh exact-head substantive review must still independently validate the final recorded artifact.

## 10. Explicit non-claims

004C1AA does not claim that:

- Node or pnpm has been executed;
- pnpm is installed globally or in the repository;
- Corepack is available or used;
- the resolver is ready to run;
- a lockfile exists;
- project dependencies have been acquired or installed;
- the resolved dependency graph is known;
- package archives for project dependencies have been acquired;
- `packages/providers` exists;
- EmbedPDF or PDFium runtime behavior exists;
- the first resolver execution is authorized;
- 004C2, 004D, or Specification 005 is authorized.

## 11. Candidate result

```text
004C1AA_TOOLCHAIN_ACQUISITION_PROVISIONING_EVIDENCE = CANDIDATE_PENDING_REAL_MEASUREMENT
TOOLCHAIN_IDENTITY_INPUTS = CANONICAL_004C1Z
REAL_ACQUIRED_BYTE_EVIDENCE = ABSENT
NODE_EXECUTION = NOT_AUTHORIZED
PNPM_EXECUTION = NOT_AUTHORIZED
RESOLVER_EXECUTION = NOT_AUTHORIZED
LOCKFILE_GENERATION = NOT_AUTHORIZED
PROJECT_DEPENDENCY_ACQUISITION = NOT_AUTHORIZED
SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
```

This candidate must remain unmerged until its real measurement record is complete and independently reviewed.