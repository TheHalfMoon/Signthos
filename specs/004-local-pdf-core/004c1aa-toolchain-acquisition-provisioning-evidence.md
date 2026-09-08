# Specification 004C1AA — Toolchain Acquisition and Provisioning Evidence

Status: `EVIDENCE_CANDIDATE / TOOLCHAIN_BYTES_ONLY / MEASUREMENT_COMPLETE / ZERO_TOOL_EXECUTION / AWAITING_EXACT_HEAD_REVIEW`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical predecessor main: `ec21df979a7a1b0e8132c47ffc3f6cebcb6879bd`
Canonical predecessor tree: `7159c1e8b081f31c264840053d564c16938466e4`
Authority source: `github:issue-comment:5591296864`
Raw measurement surface: PR #141 review thread rooted at `github:pull-review-comment:3961925618`

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

These identities are inputs. 004C1AA verifies them; it does not silently replace them.

## 3. Network boundary

Permitted public read origins are exactly:

```text
https://nodejs.org/
https://registry.npmjs.org/
```

The exact artifact requests are limited to the Node checksum list, the exact Node archive, the exact-version pnpm packument, and the packument-bound pnpm tarball. Cross-origin redirects fail closed.

No credential, token, private registry, alternate artifact host, package-manager self-download, or custom package artifact is authorized. A first measurement attempt demonstrated that the external review environment exported proxy settings that rewrote the npm packument tarball URL to an internal Verdaccio address. That attempt failed closed and is preserved as nonqualifying environment evidence. The qualifying pnpm retry explicitly removed all listed proxy variables and used `curl --noproxy '*'`, HTTPS-only transport, and zero redirects.

## 4. Evidence procedure

The completed evidence procedure preserved the 004C1Z contract:

1. bind the staging head and confirm the repository worktree is clean before the measurement attempt;
2. create a unique temporary evidence root outside the repository;
3. fetch official Node `SHASUMS256.txt`;
4. require the exact checksum entry for `node-v24.20.0-linux-x64.tar.xz`;
5. fetch exactly the Node archive with redirects prohibited;
6. compute archive byte length and SHA-256 and reject before extraction unless SHA-256 matches;
7. extract the verified Node archive outside the repository;
8. hash exact extracted `bin/node` without executing it;
9. fetch the exact npm packument for `pnpm@10.34.5`;
10. require exact package identity, tarball URL, SHA-1 and `dist.integrity`;
11. after the proxy-rewritten first attempt failed closed, repeat only the npm portion with proxy variables removed and `--noproxy '*'`;
12. fetch exactly the public packument-bound tarball with redirects prohibited;
13. compute acquired tarball byte length, SHA-1, SHA-256, SHA-512 and SHA-512 SRI;
14. reject before extraction unless acquired SHA-1 and SRI match the exact registry metadata;
15. extract the verified pnpm tarball outside the repository;
16. read package metadata without executing package code;
17. require `name=pnpm`, `version=10.34.5`, and `bin.pnpm=bin/pnpm.cjs`;
18. hash exact extracted `package/bin/pnpm.cjs` without executing it;
19. preserve zero Node, pnpm, Corepack, resolver, lifecycle, provider and PDF execution;
20. write only this repository evidence artifact forward-only after raw measurement completion.

No alternate version, host, checksum, or package was substituted.

## 5. Measurement provenance and environment failures

### 5.1 Local working-container attempt

The local ChatGPT working container could not resolve `nodejs.org`. This is an environment limitation and is not artifact failure evidence.

```text
LOCAL_CONTAINER_NETWORK_ATTEMPT = NONQUALIFYING_ENVIRONMENT_FAILURE
LOCAL_CONTAINER_FAILURE_CLASS = DNS_RESOLUTION_UNAVAILABLE
NODE_OR_PNPM_BYTES_ACQUIRED_BY_LOCAL_CONTAINER = NO
```

### 5.2 External raw-measurement environment

The raw measurements were performed in the external CodeRabbit PR review sandbox against staging head:

```text
MEASUREMENT_STAGING_HEAD = 93201b4cb8c012317e26f5477b56a028b28bdd9e
MEASUREMENT_PROVIDER = CodeRabbit PR review sandbox
MEASUREMENT_THREAD_ROOT = github:pull-review-comment:3961925618
MEASUREMENT_CLASS = RAW_EVIDENCE_ONLY / NONQUALIFYING_AS_FINAL_REVIEW
```

The initial combined attempt successfully completed Node measurement, then failed closed when the npm packument returned a proxy-rewritten internal tarball URL:

```text
INITIAL_PNPM_PACKUMENT_EFFECTIVE_URL = https://registry.npmjs.org/pnpm/10.34.5
INITIAL_PNPM_PACKUMENT_HTTP_CODE = 200
INITIAL_PNPM_PACKUMENT_DIST_TARBALL = http://10.0.0.28:4873/pnpm/-/pnpm-10.34.5.tgz
INITIAL_PNPM_MEASUREMENT_RESULT = MEASUREMENT_FAILED
INITIAL_PNPM_FAILURE_REASON = PNPM_TARBALL_URL_MISMATCH
```

That attempt did not acquire the rewritten pnpm tarball and is not promoted to qualifying pnpm acquisition evidence.

The targeted npm-only retry removed proxy variables and forced direct-origin access:

```text
DIRECT_RETRY_PROXY_VARIABLES = REMOVED
DIRECT_RETRY_CURL_NO_PROXY = *
DIRECT_RETRY_PROTOCOL = HTTPS_ONLY
DIRECT_RETRY_MAX_REDIRECTS = 0
DIRECT_RETRY_RESULT = MEASUREMENT_COMPLETE
DIRECT_RETRY_TEMP_ROOT = /tmp/004c1aa-npm-direct-hash.<random>
DIRECT_RETRY_REPOSITORY_FILE_ACCESS = NONE_REPORTED
DIRECT_RETRY_REPOSITORY_MUTATION = NONE_REPORTED
```

A separate npm-registry metadata read also returned `pnpm@10.34.5` with the same public tarball URL and SHA-1. It is corroborative metadata only and is not substituted for the acquired-byte measurement.

## 6. Exact measured evidence record

### 6.1 Node.js official checksum and archive

```text
NODE_SHASUMS_EFFECTIVE_URL = https://nodejs.org/dist/v24.20.0/SHASUMS256.txt
NODE_SHASUMS_DOWNLOAD_BYTES = 3171
NODE_SHASUMS_HTTP_CODE = 200
NODE_SHASUMS_EXACT_ENTRY = 2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2  node-v24.20.0-linux-x64.tar.xz
NODE_SHASUMS_EXACT_ENTRY_MATCH = PASS
NODE_ARCHIVE_EFFECTIVE_URL = https://nodejs.org/dist/v24.20.0/node-v24.20.0-linux-x64.tar.xz
NODE_ARCHIVE_HTTP_CODE = 200
NODE_ARCHIVE_BYTE_LENGTH = 31838904
NODE_ARCHIVE_SHA256 = 2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2
NODE_ARCHIVE_SHA256_MATCH = PASS
NODE_EXTRACTED_BIN_NODE_BYTE_LENGTH = 126458664
NODE_EXTRACTED_BIN_NODE_SHA256 = 89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7
```

The archive hash matched before extraction. The extracted `bin/node` was measured but never executed.

### 6.2 Exact pnpm packument

The first proxy-affected packument response exposed the following exact metadata fields before failing its tarball URL gate:

```text
PNPM_PACKUMENT_NAME = pnpm
PNPM_PACKUMENT_VERSION = 10.34.5
PNPM_PACKUMENT_LICENSE = MIT
PNPM_PACKUMENT_ENGINES = {"node":">=18.12"}
PNPM_PACKUMENT_BIN = {"pnpm":"bin/pnpm.cjs","pnpx":"bin/pnpx.cjs"}
PNPM_PACKUMENT_SHA1 = 6a91127a7f2ca72fe53bb9ff54883e0c75b22f17
PNPM_PACKUMENT_DIST_INTEGRITY = sha512-pO4F8vc2WCVb1qiYWcBlpFwopX2u+uLIk6Fo7itzFow3uR6D5X6mdlStA/AwMXRkMOi84442LgQmBfuKvIAZLg==
PNPM_PACKUMENT_SIGNATURES_PRESENT = true
PNPM_PACKUMENT_SIGNATURES_EXACT = [{"sig":"MEYCIQDagY1uMGpAKuz0LBXZ/c6qgKx+zeq389sPJlV8pAVAeAIhAJkganpv/PxkckyK55F22+z+lAWniEN+oxY+1S1WoBGR","keyid":"SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U"}]
PNPM_PACKUMENT_ATTESTATIONS_PRESENT = false
PNPM_PACKUMENT_ATTESTATIONS_EXACT = null
```

Presence of the npm registry signature is recorded only as metadata presence; 004C1AA does not claim local cryptographic signature verification. Absence of attestations/provenance is not converted into a positive provenance claim.

The direct-origin retry then re-read the identity-critical public packument fields and passed all required checks:

```text
PNPM_DIRECT_PACKUMENT_EFFECTIVE_URL = https://registry.npmjs.org/pnpm/10.34.5
PNPM_DIRECT_PACKUMENT_HTTP_CODE = 200
PNPM_DIRECT_PACKUMENT_NAME = pnpm
PNPM_DIRECT_PACKUMENT_VERSION = 10.34.5
PNPM_DIRECT_PACKUMENT_TARBALL = https://registry.npmjs.org/pnpm/-/pnpm-10.34.5.tgz
PNPM_DIRECT_PACKUMENT_SHA1 = 6a91127a7f2ca72fe53bb9ff54883e0c75b22f17
PNPM_DIRECT_PACKUMENT_DIST_INTEGRITY = sha512-pO4F8vc2WCVb1qiYWcBlpFwopX2u+uLIk6Fo7itzFow3uR6D5X6mdlStA/AwMXRkMOi84442LgQmBfuKvIAZLg==
PNPM_DIRECT_PACKUMENT_REQUIREMENTS = PASS
```

### 6.3 Acquired pnpm tarball and extracted entry point

```text
PNPM_TARBALL_EFFECTIVE_URL = https://registry.npmjs.org/pnpm/-/pnpm-10.34.5.tgz
PNPM_TARBALL_HTTP_CODE = 200
PNPM_TARBALL_BYTE_LENGTH = 4862438
PNPM_TARBALL_SHA1 = 6a91127a7f2ca72fe53bb9ff54883e0c75b22f17
PNPM_TARBALL_SHA1_MATCH = PASS
PNPM_TARBALL_SHA256 = ccb5c479cab1b00621325bfe7d4c9a8a8031e7a525d7249e275ecbec81b08db2
PNPM_TARBALL_SHA512 = a4ee05f2f73658255bd6a89859c065a45c28a57daefae2c893a168ee2b73168c37b91e83e57ea67654ad03f03031746430e8bce38e362e042605fb8abc80192e
PNPM_TARBALL_SHA512_SRI = sha512-pO4F8vc2WCVb1qiYWcBlpFwopX2u+uLIk6Fo7itzFow3uR6D5X6mdlStA/AwMXRkMOi84442LgQmBfuKvIAZLg==
PNPM_TARBALL_DIST_INTEGRITY_MATCH = PASS
PNPM_EXTRACTED_MANIFEST_NAME = pnpm
PNPM_EXTRACTED_MANIFEST_VERSION = 10.34.5
PNPM_EXTRACTED_MANIFEST_BIN_PNPM = bin/pnpm.cjs
PNPM_EXTRACTED_ENTRYPOINT_BYTE_LENGTH = 1102
PNPM_EXTRACTED_ENTRYPOINT_SHA256 = b276da51dc8ca5b0d3ee3371695b50fc8b3244b281b091c63a3f082a88dadeb9
```

SHA-1 and SHA-512 were calculated with Python standard-library `hashlib` in the direct retry because `sha1sum` and `sha512sum` were unavailable in that sandbox; SHA-256 used `sha256sum`. The computed SHA-1 and SHA-512 SRI both matched registry metadata before extraction.

### 6.4 Non-execution and repository boundary

```text
NODE_EXECUTED = NO
PNPM_EXECUTED = NO
COREPACK_EXECUTED = NO
RESOLVER_EXECUTED = NO
PACKAGE_LIFECYCLE_CODE_EXECUTED = NO
PROVIDER_PDF_CODE_EXECUTED = NO
PROJECT_DEPENDENCIES_ACQUIRED = NO
REPOSITORY_ARTIFACT_BYTES_IMPORTED = NO
TOOLCHAIN_ARCHIVES_COMMITTED = NO
```

The staging branch remained unchanged during raw measurement and all toolchain bytes/extractions were external temporary artifacts. The first failed npm attempt stopped before its final in-sandbox status check; therefore this artifact does not pretend that missing check occurred. Instead, the qualifying direct npm retry explicitly reports no repository file access/mutation, and live GitHub branch identity remained the same staging head until this forward-only evidence-record commit.

## 7. Acceptance-gate result

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
REPOSITORY_MUTATION_FROM_ACQUISITION = ZERO_SUPPORTED_BY_EXTERNAL_TEMP_BOUNDARY_AND_STAGING_HEAD_STABILITY
NODE_EXECUTION = ZERO
PNPM_EXECUTION = ZERO
COREPACK_EXECUTION = ZERO
RESOLVER_EXECUTION = ZERO
PROJECT_DEPENDENCY_ACQUISITION = ZERO
RAW_MEASUREMENT = COMPLETE
FINAL_EXACT_HEAD_SUBSTANTIVE_REVIEW = PENDING
QUALIFICATION = CANDIDATE_AWAITING_INDEPENDENT_EXACT_HEAD_REVIEW
```

The failed proxy-affected pnpm attempt is retained transparently and is not counted as a passing acquisition attempt. The passing pnpm evidence is only the later direct-origin retry.

## 8. Repository-surface proof

The only repository mutation authorized for 004C1AA remains this evidence artifact. No downloaded archive or extracted byte is added to the repository.

Final base-to-head accounting must prove:

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

This measurement record is not self-approving. The measurement-producing environment and owner-authored routing reviews are raw evidence only.

The final exact head must now receive:

- exact base/head/tree mechanical accounting;
- truthful exact-head Actions/check/provider accounting;
- a fresh independent substantive review of this complete artifact and the underlying raw measurement evidence;
- forward-only repair of every material finding;
- fresh review after every changed head;
- zero unresolved material review threads;
- immediate premerge race proof;
- guarded normal merge using exact reviewed head SHA;
- post-merge verification of ordered parents, signature, tree equality, exact surface and workflow/check state;
- fresh Issue #7 successor reconciliation.

No review or measurement attached to staging head `93201b4cb8c012317e26f5477b56a028b28bdd9e` can qualify a later changed head by implication.

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
004C1AA_TOOLCHAIN_ACQUISITION_PROVISIONING_EVIDENCE = MEASUREMENT_COMPLETE_CANDIDATE
TOOLCHAIN_IDENTITY_INPUTS = CANONICAL_004C1Z
REAL_ACQUIRED_BYTE_EVIDENCE = PRESENT_FOR_EXACT_NODE_AND_PNPM_TOOLCHAIN_ARTIFACTS
NODE_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
PNPM_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
RESOLVER_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
LOCKFILE_GENERATION = NOT_AUTHORIZED
PROJECT_DEPENDENCY_ACQUISITION = NOT_AUTHORIZED
MERGE_AUTHORITY = ABSENT_UNTIL_FRESH_EXACT_HEAD_REVIEW_AND_PREMERGE_PROOF
SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
```

The candidate remains unmerged until fresh independent substantive exact-head review and all canonical merge gates are satisfied.
