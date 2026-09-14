# Local PDFium Structural Runtime Harness Qualification

Authority: `github:issue-comment:5661180680`

## 1. Qualification purpose

This artifact freezes the smallest runtime harness required after canonical provider-neutral content-identity admission implementation and before any PDFium/provider execution.

It is a **static harness qualification only**. No Docker container, Node runtime, PDFium runtime, fixture parser, classifier, render, search, dependency acquisition, or network operation is executed by this unit.

```text
UNIT = CONTENT_IDENTITY_LOCAL_PDFIUM_STRUCTURAL_RUNTIME_HARNESS_QUALIFICATION
CANONICAL_BASE = efb9b5cd4767cdf9b5e66f11839ebd277af52f98
CANONICAL_BASE_TREE = 4856e4d4668084125a45611c7e78ccb0e9b61149
AUTHORITY = github:issue-comment:5661180680
CHANGED_PATH_LIMIT = 1
```

## 2. Why this is the next dependency-ordered boundary

Canonical source-informed ordering places general inspect/render/search runtime qualification after content-identity/admission semantics, classifier-route provenance qualification, adversarial fixture qualification, synthetic fixture materialization, package/control closure, dependency materialization, and bounded provider-neutral admission implementation.

Those prerequisites are now canonical. A broad render/search runtime remains too large for the first provider execution because `CONFIRMED_PDF` first requires separately qualified structural evidence. The first runtime must therefore prove only that exact local PDFium bytes can be initialized locally and can produce bounded structural-open observations for the already-canonical fixture seed.

This artifact does not name or authorize `004C2`; numbering remains a later governance decision.

## 3. Canonical repository controls

The future runtime attempt must begin only if these canonical controls still match exactly:

| Path | SHA-256 |
| --- | --- |
| `package.json` | `71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183` |
| `pnpm-workspace.yaml` | `695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f` |
| `pnpm-lock.yaml` | `ee29f5f0f4d1b1b98fbd615de64589a7a5b6a92bee368f4ef8a07255a989479e` |
| `provenance/components/pdfium-2.15.0/ADOPTION.json` | `e05b64a2dba4a319aef8d2978898b6db966e5bed5b6fef2264af6c1ce731bb36` |
| `packages/providers/package.json` | `d0d54a230580a44b84163c31aa0c3199b899c74035242180bd97fcfc92dea85f` |
| `packages/providers/src/content-identity-admission.js` | `af9cefdfdc4e81aa0619101d938cfd9fa237e5364b67ab821632b26506f0c965` |

## 4. Exact retained runtime identities

The future attempt is bound to these exact retained bytes only:

```text
NODE = node-v24.20.0-linux-x64
NODE_EXECUTABLE_SHA256 = 89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7

PDFIUM_NPM_IDENTITY = @embedpdf/pdfium@2.15.0
PDFIUM_CJS_SHA256 = 937f65dbde0ebc92f3c1d3d32c909bc1a30146e824d69d6fde4de3a168912602
PDFIUM_WASM_BYTES = 4633788
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8

SELECTED_CONTAINER_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_PLATFORM = linux/amd64
```

Current Docker locality is **not** established by this artifact. Immediately before this qualification, read-only `docker version` and `docker info` probes each timed out after five seconds. A future runtime authority must require fresh daemon/image/platform revalidation before any container create/start.

## 5. Exact fixture seed

Only these canonical Signthos-authored bytes may be consumed by the first structural runtime attempt:

| Fixture | Bytes | SHA-256 |
| --- | ---: | --- |
| `ordinary-minimal.pdf` | 583 | `d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207` |
| `declared-pdf-nonpdf.bin` | 86 | `fecf1b6f0521397334ff12a71c066129c97bb5458e68cbe2e80aed8a3f92825c` |
| `truncated-pdf-like.pdf` | 94 | `b315f2c38fee3e1ff098b8e815625bf47a6d8eced917cea06a158bad897e02c1` |
| `pdf-with-trailing-inert-bytes.pdf` | 616 | `d21b6163ad783ee0aca73e17e5f1cd7f06183b751312fdce116d6695146ebec0` |

Fixture manifest:

```text
PATH = specs/004-local-pdf-core/fixtures/admission/manifest.json
BYTES = 15598
SHA256 = 34cddff9550b46c011a10a0e474af2f0701d7b4cb1961e4692ae5ceff1e5a841
```

No fixture may be rewritten, normalized, repaired, truncated, padded, copied into Git under a new identity, or interpreted using filename/MIME metadata as structural truth.

## 6. Static PDFium API binding

Static inspection of the exact retained `@embedpdf/pdfium@2.15.0` package proves:

```text
init(moduleOverrides: Partial<PdfiumModule>): Promise<WrappedPdfiumModule>
PDFiumExt_Init() -> void
FPDF_LoadMemDocument(pointer, length, password) -> document pointer
FPDF_GetLastError() -> number
FPDF_GetPageCount(document pointer) -> number
FPDF_CloseDocument(document pointer) -> void
FPDF_DestroyLibrary() -> void
pdfium.wasmExports.malloc(size) -> pointer
pdfium.wasmExports.free(pointer) -> void
pdfium.HEAPU8.set(bytes, pointer)
```

The exact package implementation reads `moduleOverrides.wasmBinary`. When `wasmBinary` is supplied, the initialization path can instantiate the provided bytes rather than requiring the package's CDN convenience URL.

The future harness MUST provide `wasmBinary` from the exact retained local `dist/pdfium.wasm`. It MUST NOT use `DEFAULT_PDFIUM_WASM_URL`, `fetch`, a CDN URL, or a moving package URL.

## 7. Frozen future observer algorithm

The first runtime observer must implement only the following bounded algorithm. Equivalent refactoring is allowed only if it preserves every step and output field.

```text
1. Read the exact local PDFium WASM bytes from the read-only retained package tree.
2. Recompute WASM SHA-256 and byte length; abort before PDFium if either differs.
3. Initialize @embedpdf/pdfium exactly once with init({ wasmBinary }).
4. Call PDFiumExt_Init exactly once after module initialization.
5. For each of the four fixtures, in manifest order:
   a. Read the exact fixture bytes from the read-only repository snapshot.
   b. Recompute fixture SHA-256 and byte length; abort the attempt if either differs.
   c. Allocate exactly fixture.byteLength bytes using pdfium.wasmExports.malloc.
   d. Copy the fixture bytes with pdfium.HEAPU8.set(bytes, pointer).
   e. Call FPDF_LoadMemDocument(pointer, fixture.byteLength, "").
   f. If the returned document pointer is zero:
      - record openSucceeded=false;
      - record FPDF_GetLastError();
      - publish no page-count claim;
      - free the fixture allocation exactly once.
   g. If the returned document pointer is nonzero:
      - record openSucceeded=true;
      - record FPDF_GetPageCount(documentPointer);
      - close the document exactly once with FPDF_CloseDocument;
      - free the fixture allocation exactly once.
   h. Re-read and re-hash the fixture bytes from the read-only repository mount.
   i. Require pre/post fixture digest and length equality.
   j. Emit one deterministic JSON record for the fixture.
   k. Continue only after that fixture cleanup completes.
6. After all four fixture records are finalized, call FPDF_DestroyLibrary exactly once.
7. Emit the attempt summary only after library destruction completes.
```

This observer performs structural open/page-count evidence only. It does not render, extract text, search, mutate, save, repair, execute JavaScript, inspect signatures, classify malware, or claim polyglot absence.

## 8. Structural evidence mapping boundary

The observer result is not itself an admission disposition. A later runtime qualification may map it into provider-neutral structural evidence only under these rules:

```text
openSucceeded=true
  => candidate STRUCTURAL_INSPECTION_COMPLETE evidence
  => structuralIdentityResult may be PDF_STRUCTURE_ACCEPTED only if the runtime qualification proves this mapping for the exact provider contract

openSucceeded=false
  => MUST NOT be silently normalized into PDF_STRUCTURE_REJECTED
  => FPDF_GetLastError plus exact provider/runtime state must be preserved
  => mapping may be STRUCTURAL_INSPECTION_INPUT_REJECTED, EXECUTION_FAILED, UNSUPPORTED, or another canonical non-success state only after explicit evidence-backed qualification
```

The first runtime attempt must report raw PDFium observations before applying any semantic mapping. This prevents a provider-specific error code from silently redefining canonical admission meaning.

## 9. Fixture expectation gates

The canonical fixture manifest remains the expectation authority.

Required gates include:

- `ordinary-minimal.pdf`: structural evidence must become complete before `CONFIRMED_PDF`; `NOT_PDF` is forbidden.
- `declared-pdf-nonpdf.bin`: misleading declared metadata cannot confirm the bytes as PDF; structural completion or input rejection is permitted by the fixture contract.
- `truncated-pdf-like.pdf`: marker-like bytes cannot establish PDF validity; `CONFIRMED_PDF` is forbidden.
- `pdf-with-trailing-inert-bytes.pdf`: parser acceptance does not prove non-polyglot status; policy-visible ambiguity must remain available.

The runtime harness must not invent a stronger oracle than the manifest. Unexpected PDFium behavior is preserved as evidence and fails qualification closed; it is not repaired by changing fixture expectations in the same unit.

## 10. Future container topology

The first runtime attempt must use the exact selected `linux/amd64` image only after fresh locality/platform verification.

Minimum container controls:

```text
--platform linux/amd64
--pull=never
--network none
--read-only
--cap-drop ALL
--security-opt no-new-privileges
```

Allowed mounts:

```text
/repo        read-only exact canonical repository snapshot
/toolchain   read-only exact retained Node toolchain
/deps        read-only exact clean materialized dependency tree
/evidence    read-write fresh attempt-specific evidence root only
```

No Docker socket, host home, SSH agent, credential store, package cache, registry credential, proxy credential, or arbitrary host directory may be mounted.

The future container command must use the exact retained Node executable directly. `pnpm`, `npm`, Corepack, lifecycle scripts, resolver execution, dependency installation, and package build commands are prohibited.

## 11. No-network proof

`--network none` is mandatory but is not the sole evidence.

The future attempt must also freeze:

- container prestart inspect showing network mode `none`;
- exact Docker argv and exact process argv;
- environment manifest proving no proxy or credential environment is intentionally supplied;
- stdout and stderr;
- postrun container inspect including exit code/OOM state;
- any observed network-related Node/PDFium messages;
- a final statement distinguishing `network namespace disabled` from `application made no networking API attempt` when the latter cannot be independently observed.

Any external URL fetch attempt, CDN path, DNS/network dependency, or successful external connection is a qualification failure.

## 12. Evidence root and one-attempt discipline

The future runtime authority must create a fresh attempt-specific evidence root and a fresh coordination lock before any container creation.

It must freeze before the first container start:

- canonical base/head/tree;
- open-PR frontier;
- repository pre-status;
- exact toolchain/package/WASM/fixture hashes;
- observer source bytes and SHA-256;
- container name/id/image/platform/network/mount/security configuration;
- exact argv/environment;
- launch record with attempt count `1`.

The authority is consumed by the first provider-runtime container start whether it passes or fails. No rerun is allowed under the same authority.

Read-only postrun validators may be separately repaired only by explicit forward-only Issue #7 authority and must never restart PDFium or Node.

## 13. Required future runtime result schema

Each fixture record must contain at least:

```text
fixtureId
repositoryPath
inputSha256
inputByteLength
postSha256
postByteLength
openSucceeded
pdfiumLastError?       # required on open failure
pageCount?             # allowed only on open success
allocationFreed
closedDocument         # true only when a document pointer was opened and closed
wasmSha256
wasmByteLength
providerIdentity
nodeExecutableSha256
```

The attempt-level record must contain at least:

```text
containerExitCode
containerOomKilled
networkMode
imageDigest
platform
observerSha256
fixtureRecordCount = 4
inputMutationCount = 0
externalNetworkSuccessCount = 0
```

## 14. Acceptance conditions for a later runtime attempt

A future runtime attempt can qualify only if all of the following are proven from the single consumed run:

1. exact canonical base/head and expected repository surface remain unchanged;
2. selected image/platform and exact Node/package/WASM identities match;
3. container network mode is `none`;
4. exact four fixture identities match before execution;
5. PDFium initializes from the provided local `wasmBinary`;
6. all four fixtures produce a complete raw observation record;
7. every opened document is closed and every allocated fixture buffer is freed;
8. all fixture bytes match exactly before and after;
9. no package-manager, dependency-acquisition, build, render, search, mutation, classifier, or external network path executes;
10. observer/container exits are preserved exactly, including failures;
11. evidence finalization occurs while the coordination lock is still held;
12. any semantic mapping to provider-neutral admission remains within the canonical 004C1R contract.

No specific PDFium open/reject result for the three adversarial fixtures is assumed before the first authorized run.

## 15. Explicit non-grants

```text
DOCKER_DAEMON_START_OR_RECOVERY = NOT_AUTHORIZED
DOCKER_CONTAINER_CREATE_OR_START = NOT_AUTHORIZED
NODE_EXECUTION = NOT_AUTHORIZED
PDFIUM_INITIALIZATION = NOT_AUTHORIZED
PDFIUM_PROVIDER_RUNTIME_EXECUTION = NOT_AUTHORIZED
FIXTURE_EXECUTION = NOT_AUTHORIZED
RENDER_EXECUTION = NOT_AUTHORIZED
THUMBNAIL_EXECUTION = NOT_AUTHORIZED
TEXT_EXTRACTION = NOT_AUTHORIZED
SEARCH_EXECUTION = NOT_AUTHORIZED
CLASSIFIER_EXECUTION = NOT_AUTHORIZED
PACKAGE_MANAGER_EXECUTION = NOT_AUTHORIZED
DEPENDENCY_ACQUISITION_OR_INSTALLATION = NOT_AUTHORIZED
NETWORK_EXECUTION = NOT_AUTHORIZED
FIXTURE_MUTATION = NOT_AUTHORIZED
PACKAGE_WORKSPACE_LOCKFILE_MUTATION = NOT_AUTHORIZED
PROVENANCE_NOTICE_MUTATION = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 16. Qualification result

```text
STATIC_LOCAL_PDFIUM_STRUCTURAL_RUNTIME_HARNESS = QUALIFIED_CANDIDATE
RUNTIME_ATTEMPT_AUTHORITY = ABSENT
DOCKER_RECOVERY_AUTHORITY = ABSENT
GENERAL_INSPECT_RENDER_SEARCH_RUNTIME = NOT_AUTHORIZED
NEXT_SUCCESSOR = NOT_YET_DERIVED
```

Canonicalization requires exact-head independent substantive review, zero unresolved material review threads, immediate race proof, guarded normal merge with exact expected head, mechanical post-merge verification, and fresh Issue #7 successor reconciliation.
