# Specification 004C1AC — Exact Archive Payload, Notice, and Provenance Qualification

Status: `QUALIFICATION_CANDIDATE / ACQUISITION_EVIDENCE_AND_PLANNING_ONLY / ZERO_INSTALLATION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `8540bcc0ba261d08a3fbb408012adbc1b5d280a4`
Canonical base tree: `f2916b13fb827d0918545c90e3dca6e1986c5314`
Authority source: `github:issue-comment:5606065115`

## 1. Purpose and authority

004C1AB canonically materialized the deterministic resolver graph as root `pnpm-lock.yaml`. This grain closes the next acquisition prerequisite without installing or executing the resolved packages: it binds the exact published archive bytes to the canonical lockfile, inspects archive payload and redistribution material, and characterizes pinned-source versus published-archive identity without claiming byte equivalence.

```text
004C1AC_AUTHORITY = BOUNDED_ACQUISITION_EVIDENCE_AND_PLANNING_QUALIFICATION_ONLY
004C1AC_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ac-exact-archive-payload-notice-provenance-qualification.md
004C1AC_MAX_CHANGED_REPOSITORY_FILES = 1
EXACT_RESOLVED_PACKAGE_ARCHIVE_ACQUISITION = EXTERNAL_EPHEMERAL_EVIDENCE_ONLY
PACKAGE_INSTALLATION = NOT_AUTHORIZED
NODE_MODULES_MATERIALIZATION = NOT_AUTHORIZED
LIFECYCLE_EXECUTION = NOT_AUTHORIZED
PROVIDER_RUNTIME_EXECUTION = NOT_AUTHORIZED
PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
REPOSITORY_ARCHIVE_OR_UPSTREAM_SOURCE_IMPORT = NOT_AUTHORIZED
NOTICE_SBOM_PROVENANCE_REPOSITORY_MUTATION = NOT_AUTHORIZED
PACKAGE_JSON_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Canonical resolver input

The canonical lockfile consumed by this grain is unchanged from PR #144:

```text
LOCKFILE_PATH = pnpm-lock.yaml
LOCKFILE_BYTES = 9485
LOCKFILE_SHA256 = ee29f5f0f4d1b1b98fbd615de64589a7a5b6a92bee368f4ef8a07255a989479e
RESOLVED_PACKAGE_IDENTITIES = 18
NORMALIZED_RESOLVED_GRAPH_SHA256 = 6d0ab3f8e03ef4af0c56dfafb6f5c7b09b8ade00360c0d5632131c96db54f448
REGISTRY_IDENTITY_SET_SHA256 = f05755127da744c3e195c6ab5654c15f04a79e94e2508b440229fbfb9135a9a4
```

No dependency identity or version is added, removed, or reopened here.

## 3. Acquisition method

Each exact-version npm metadata object and each metadata-declared tarball was fetched directly from `registry.npmjs.org` into a fresh external evidence root. Acquisition used an empty process environment except a minimal system `PATH` and fresh external `HOME`, `curl --noproxy *`, HTTPS-only TLS, and `--max-redirs 0`. No proxy, credential, custom CA, package manager, Node runtime, lifecycle hook, or install command participated.

For each package, qualification required: lockfile SRI = exact-version metadata `dist.integrity` = independently recomputed SHA-512 SRI over acquired tarball bytes. Registry `dist.shasum` was independently checked against acquired SHA-1 when present, and a separate SHA-256 was computed for evidence identity.

```text
ARCHIVE_EVIDENCE_JSON_SHA256 = 2a06026a2742e008661219209526556a98ffba0a211ab3668e09894009fb1329
SOURCE_ARCHIVE_MANIFEST_COMPARISON_SHA256 = 7579e39110d1993b3707392f16d5e87ddc28947b47c228f78d6808b084cfcca4
ACQUIRED_TARBALL_COUNT = 18
ARCHIVE_INTEGRITY_FAILURE_COUNT = 0
UNSAFE_ARCHIVE_PATH_COUNT = 0
EXTRACTED_NODE_MODULES_COUNT = 0
PACKAGE_CODE_EXECUTION_COUNT = 0
```

## 4. Exact archive evidence

| Package | Tarball bytes | Acquired SHA-256 | License | Files | Lifecycle hooks |
|---|---:|---|---|---:|---|
| `@embedpdf/core@2.15.0` | 154567 | `9dd8825fea07a3a48b1befe4ba08d4841693f26bc2a4c1f0cab347126179a73d` | `MIT` | 116 | none |
| `@embedpdf/engines@2.15.0` | 713626 | `044aeff2b0b453666c73def7cd06843d5f4510b028a4019785c2f1d814d24983` | `MIT` | 124 | none |
| `@embedpdf/fonts-arabic@1.0.0` | 151443 | `6877696b89128ba8c488c96456f80dc0a5154d6ea9530148e0ba515fb6b88046` | `OFL-1.1` | 10 | none |
| `@embedpdf/fonts-hebrew@1.0.0` | 23659 | `af0780c63bf2058337fddce3059722811f992137e66537383881a0da3923aac2` | `OFL-1.1` | 10 | none |
| `@embedpdf/fonts-jp@1.0.0` | 27101289 | `df8af067c031e5dea31dab7105bf01560cccfe007fe055d7d69b395fc1526b58` | `OFL-1.1` | 15 | none |
| `@embedpdf/fonts-kr@1.0.0` | 25473302 | `c6e93dac723b37c743af2007fb3e18ac9ce8dce10f65beb100b3c8327571fcec` | `OFL-1.1` | 15 | none |
| `@embedpdf/fonts-latin@1.0.0` | 5623839 | `474d091abd00f943422546462277ad3a3f29fdb4f44019a575888d5d8b763f18` | `OFL-1.1` | 26 | none |
| `@embedpdf/fonts-sc@1.0.0` | 36514660 | `589e6a5f2168430b4ae5a46bfdc4606f1798f5c06be5a2369ab89f75b804a0ad` | `OFL-1.1` | 13 | none |
| `@embedpdf/fonts-tc@1.0.0` | 34078976 | `3627a6a23f0cb07dca9a72db07e2e47afb15b934b850529367458b64b322e8a4` | `OFL-1.1` | 15 | none |
| `@embedpdf/models@2.15.0` | 165290 | `ce7859614d73cd2356329ce5b5b9685de0563ab1fcd1bab519ae1efcf2318fd9` | `MIT` | 28 | none |
| `@embedpdf/pdfium@2.15.0` | 2665003 | `fe0cb4677782a58b67f555df9a1257742bcfbf390b9a3e08bd8ad976eea436bb` | `MIT` | 18 | none |
| `@embedpdf/plugin-document-manager@2.15.0` | 49369 | `627e3b189fd7ee6401c6878636bc3bf6cc4a86450871dd448dbc6cb8c68a9951` | `MIT` | 68 | none |
| `@embedpdf/plugin-interaction-manager@2.15.0` | 77815 | `c847529a63afcad49092875768526ea58ee28807f1925f8443625c44f5f9c1dc` | `MIT` | 70 | none |
| `@embedpdf/plugin-render@2.15.0` | 23143 | `f594e90916168c952433c410582519caa4704c990f31a0ccfcf6e7e14b4c44de` | `MIT` | 58 | none |
| `@embedpdf/plugin-search@2.15.0` | 43625 | `307118b067cd30fd97251be46fe7ae917f29bc20603d9bd371461b5481f3eeda` | `MIT` | 60 | none |
| `@embedpdf/plugin-selection@2.15.0` | 126997 | `4bab888db26e696ac6ce9457a3aea03246929802f6721e43d5c58e2c15101f28` | `MIT` | 89 | none |
| `@embedpdf/plugin-thumbnail@2.15.0` | 47528 | `40f1155ad6de9805441e9b2d2179ffd8db784ea59172bb7a796c80475f28bee5` | `MIT` | 65 | none |
| `@embedpdf/utils@2.15.0` | 243717 | `fc64ec73a43fdcf4727874b188c1c291489f61ca5a9fe673aefdd30a21ae3172` | `MIT` | 98 | none |

All 18 exact metadata records exposed npm `dist.signatures`; no exact-version metadata object exposed npm attestations in the observed snapshot. Signature presence is recorded as registry metadata evidence, not represented as Sigstore provenance or source equivalence.

## 5. Lifecycle and package-download behavior

Archive `package.json` inspection found zero `preinstall`, `install`, `postinstall`, `prepare`, or `prepublish` lifecycle hooks across the resolved 18-package graph. No package code was executed, and no secondary/native/platform download hook was invoked. This establishes archive-payload feasibility only; it does not authorize a later install command.

## 6. PDFium archive and redistribution evidence

Exact `@embedpdf/pdfium@2.15.0` acquired archive identity:

```text
TARBALL_SHA256 = fe0cb4677782a58b67f555df9a1257742bcfbf390b9a3e08bd8ad976eea436bb
TARBALL_BYTES = 2665003
PACKAGE_LICENSE = MIT
PACKAGE_LICENSE_SHA256 = f5031b66adba8ef5ef57666deff980a7f2ccff5c8a8c22a8117e854d2b8dfcd3
PDFIUM_LICENSE_BUNDLE_PATH = package/LICENSE.pdfium
PDFIUM_LICENSE_BUNDLE_SHA256 = b033ffb8fc19c23ca81f7e98019ab658cc6f4cf14587c7c6a2a67fb0f6ac0f5a
PDFIUM_WASM_PATH = package/dist/pdfium.wasm
PDFIUM_WASM_BYTES = 4633788
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
```

The published package therefore does not rely solely on the wrapper MIT declaration: it ships a separate PDFium redistribution license bundle alongside the WASM payload. The bundle includes the PDFium BSD-style redistribution terms and additional third-party license text. A future shipping/adoption grain must preserve the applicable bundled redistribution material; this artifact does not mutate repository `NOTICE` or SBOM files.

## 7. Font archive and redistribution evidence

All seven resolved font packages declare `OFL-1.1` and each exact archive contains `package/LICENSE`. The observed license bytes are identical across the seven packages:

```text
FONT_LICENSE_SHA256 = cea028c0b5185b804ae79f1eab96ca5ee469d61d44925972a2379430890bbec1
FONT_LICENSE_BYTES = 4484
LICENSE_CLASS = SIL Open Font License 1.1
RESERVED_FONT_NAME_OBSERVATION = Noto Sans
```

The archives contain actual `.ttf`/`.otf` font payloads rather than merely references. Redistribution planning must therefore account for OFL obligations for the shipped font files and must not collapse those obligations into EmbedPDF wrapper MIT metadata.

## 8. Source-to-published-archive relationship

The immutable EmbedPDF source revision remains `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed`. Each of the 18 archive package identities was compared to the corresponding source `package.json` at that revision.

```text
SOURCE_MANIFESTS_PRESENT = 18/18
NAME_VERSION_IDENTITY_MATCH = 18/18
SOURCE_VS_PUBLISHED_PACKAGE_JSON_BYTE_EQUAL = 0/18
ARCHIVE_TO_PINNED_SOURCE_BYTE_EQUIVALENCE = NOT_CLAIMED
PROVENANCE_MODEL = DUAL_IDENTITY / PINNED_GIT_SOURCE_PLUS_VERIFIED_NPM_ARCHIVE
```

The non-equality is expected for published workspace packages whose manifests and file surfaces are transformed for publication. Version/name alignment and repository-directory metadata corroborate lineage, but they do not prove archive bytes are a byte-for-byte projection of the pinned Git subtree. Future provenance/SBOM records must bind both identities instead of substituting one for the other.

## 9. Repository metadata observations

Seventeen archives expose repository metadata pointing to `https://github.com/embedpdf/embed-pdf-viewer` with package directories matching the pinned monorepo. `@embedpdf/core@2.15.0` lacks repository metadata in the observed published manifest; its exact package identity, lockfile integrity, archive integrity, and matching pinned-source name/version remain independently bound. The missing published repository field is recorded rather than reconstructed as package metadata.

## 10. Security and provenance interpretation

- archive extraction rejected absolute or parent-traversal member paths; none were observed;
- archive bytes remain outside Signthos and are not dependency adoption;
- package contents were inspected but never executed;
- zero lifecycle hooks does not imply arbitrary future install behavior is authorized;
- registry signatures are metadata observations, not a substitute for archive hashes;
- absence of npm attestations is not converted into a provenance failure or success claim;
- source/package version equality is not byte-equivalence evidence;
- PDFium and font redistribution material is explicit and must survive later packaging if those payloads are adopted;
- no provider/PDF capability has been exercised by this grain.

## 11. Remaining gates before dependency installation or runtime

004C1AC closes archive-byte identity, archive payload characterization, lifecycle-hook inspection, and the previously unresolved PDFium/font license-file evidence. It does not itself create a distributable NOTICE/SBOM/provenance package, install dependencies, create `packages/providers`, acquire/generate PDF fixtures, or prove runtime behavior.

A fresh successor reconciliation must decide the smallest next bounded unit from live truth. At minimum, runtime remains blocked on explicit dependency-adoption/install authority, repository provenance/NOTICE/SBOM materialization where required, provider package/workspace creation authority, bounded synthetic-fixture authority, and exact runtime security/corpus evidence.

## 12. Acceptance criteria

This candidate is qualified only if its exact final head proves:

1. canonical base and tree remain the verified PR #144 merge;
2. exactly this one Signthos-authored qualification file changes;
3. all 18 lockfile identities are acquired from exact registry metadata and all acquired tarballs verify against lockfile/metadata SRI;
4. acquired SHA-256 identities and archive file counts are recorded;
5. archive package identities match expected exact names/versions;
6. lifecycle/install/download-hook inspection is complete and reports zero unresolved execution hooks;
7. PDFium WASM plus wrapper/PDFium license files are exact-hash bound;
8. all seven font archive licenses are bound and OFL obligations remain visible;
9. source versus published manifest non-equivalence is represented truthfully with dual provenance;
10. no archive/source bytes, dependencies, lockfile changes, NOTICE/SBOM mutations, provider/runtime code, fixtures, workflows, containers, or database changes enter the candidate;
11. exact-head Actions/check/provider state is recorded truthfully;
12. fresh independent substantive exact-head review reports no unresolved material finding;
13. guarded normal merge uses the exact reviewed head;
14. post-merge verification proves tree/parents/signature/surface;
15. fresh Issue #7 successor reconciliation occurs before any installation or runtime authority.

Until all candidate gates close:

```text
004C1AC = CANDIDATE_ONLY
DEPENDENCY_INSTALLATION_AUTHORITY = ABSENT
PROVIDER_RUNTIME_AUTHORITY = ABSENT
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
