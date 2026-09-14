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
PDFIUM_PACKAGE_RELATIVE_ROOT = .pnpm/@embedpdf+pdfium@2.15.0/node_modules/@embedpdf/pdfium
PDFIUM_WASM_RELATIVE_PATH = dist/pdfium.wasm

SELECTED_CONTAINER_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_PLATFORM = linux/amd64
```

Current Docker locality is **not** established by this artifact. Immediately before this qualification, read-only `docker version` and `docker info` probes each timed out after five seconds. A future runtime authority must require fresh daemon/image/platform revalidation before any container create/start.

The future prestart gate must prove that the exact selected image already exists locally and resolves to the expected digest/platform before container creation. Container creation and start must use `--pull=never`. A missing or drifted local image is a prestart qualification failure; registry acquisition is forbidden.

## 5. Exact fixture seed and manifest authority

Only these canonical Signthos-authored bytes may be consumed by the first structural runtime attempt, in this exact order:

| Order | Fixture ID | Repository path | Bytes | SHA-256 |
| ---: | --- | --- | ---: | --- |
| 1 | `admission-seed-ordinary-minimal-v1` | `specs/004-local-pdf-core/fixtures/admission/ordinary-minimal.pdf` | 583 | `d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207` |
| 2 | `admission-seed-declared-pdf-nonpdf-v1` | `specs/004-local-pdf-core/fixtures/admission/declared-pdf-nonpdf.bin` | 86 | `fecf1b6f0521397334ff12a71c066129c97bb5458e68cbe2e80aed8a3f92825c` |
| 3 | `admission-seed-truncated-pdf-like-v1` | `specs/004-local-pdf-core/fixtures/admission/truncated-pdf-like.pdf` | 94 | `b315f2c38fee3e1ff098b8e815625bf47a6d8eced917cea06a158bad897e02c1` |
| 4 | `admission-seed-trailing-inert-bytes-v1` | `specs/004-local-pdf-core/fixtures/admission/pdf-with-trailing-inert-bytes.pdf` | 616 | `d21b6163ad783ee0aca73e17e5f1cd7f06183b751312fdce116d6695146ebec0` |

Fixture manifest:

```text
PATH = specs/004-local-pdf-core/fixtures/admission/manifest.json
BYTES = 15598
SHA256 = 34cddff9550b46c011a10a0e474af2f0701d7b4cb1961e4692ae5ceff1e5a841
SCHEMA_VERSION = signthos-admission-fixture-seed/v1
CORPUS_VERSION = synthetic-seed-1
RECORD_COUNT = 4
```

Before any PDFium initialization, the future observer must read the manifest from the read-only repository snapshot, verify its exact byte length and SHA-256, parse it, and require:

```text
recordOrdering = [
  admission-seed-ordinary-minimal-v1,
  admission-seed-declared-pdf-nonpdf-v1,
  admission-seed-truncated-pdf-like-v1,
  admission-seed-trailing-inert-bytes-v1
]
```

The `records` array must contain exactly those four records in the same order. For each record, `fixtureId`, `repositoryPath`, `byteLength`, and `exactBytesDigest` must equal the frozen table above. Missing, extra, reordered, duplicated, or mismatched records fail before PDFium initialization.

Every manifest and fixture path must resolve beneath the read-only `/repo` snapshot. Symlinks, path traversal, or resolved-path escape are forbidden. All four fixtures must be read and independently re-hashed before PDFium initialization; any identity mismatch fails before provider execution. Each fixture must then be re-read and re-hashed again immediately before its individual load and after cleanup.

No fixture may be rewritten, normalized, repaired, truncated, padded, copied into Git under a new identity, or interpreted using filename/MIME metadata as structural truth.

## 6. Exact retained dependency inventory

The runtime may consume only the already-qualified clean deterministic materialization. Its complete retained inventory is frozen by the canonical 004C1FC evidence:

```text
DEPENDENCY_MATERIALIZATION = 004c1fc-clean-materialization-20260914T034932Z
DEPENDENCY_INVENTORY = POSTRUN/materialized-inventory-v2.tsv
DEPENDENCY_INVENTORY_ROWS = 934
DEPENDENCY_INVENTORY_SHA256 = 6490e2adc663d3970ddd1cfacd37f139ebf303a9e5a40daf2665b46f9f66c585
DEPENDENCY_PACKAGE_COUNT = 18
DEPENDENCY_PAYLOAD_BYTE_EXACT_MATCHES = 18
```

Before `/deps` is mounted, the future prestart gate must:

1. re-hash the retained `materialized-inventory-v2.tsv` and require the exact SHA-256 above;
2. reconstruct the complete retained materialized tree inventory without executing Node, pnpm, npm, Corepack, lifecycle scripts, or package code;
3. for every regular file, compare relative path, object type, byte length, and SHA-256 of file bytes with the frozen inventory;
4. for every symlink, compare relative path, object type, target-string byte length, and SHA-256 of the exact symlink-target bytes with the frozen inventory;
5. require exactly 934 inventory entries, with no missing, extra, duplicate, altered, or type-changed entry;
6. reject absolute symlink targets or symlinks whose resolved target escapes the retained materialized dependency root;
7. only after all checks pass, mount that exact tree read-only as `/deps`.

A dependency inventory mismatch is a prestart qualification failure and consumes no provider-runtime attempt because no container may be created or started.

## 7. Static PDFium API and local-WASM binding

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

The future harness MUST resolve the PDFium package root from `/deps/.pnpm/@embedpdf+pdfium@2.15.0/node_modules/@embedpdf/pdfium`, require that its real path remains beneath the verified `/deps` root, then resolve `dist/pdfium.wasm` beneath that exact package root. The WASM candidate must be a regular file, not a symlink, and both the lexical path and resolved real path must remain inside the exact retained PDFium package root. Only after those containment checks may the observer read, hash, and accept the WASM bytes.

The future harness MUST provide `wasmBinary` from those exact retained local bytes. It MUST NOT use `DEFAULT_PDFIUM_WASM_URL`, `fetch`, `XMLHttpRequest`, a CDN URL, a registry URL, or a moving package URL.

## 8. Frozen future observer algorithm

The first runtime observer must implement only the following bounded algorithm. Equivalent refactoring is allowed only if it preserves every gate, lifecycle rule, output field, and failure behavior.

```text
PRE-PDFIUM PREFLIGHT
1. Read and verify the exact manifest bytes, schema/corpus identity, record set, record order, fixture paths, fixture lengths, and fixture SHA-256 values frozen in section 5.
2. Resolve each manifest/fixture path beneath /repo; reject symlink, traversal, duplicate, missing, extra, or resolved-path escape.
3. Read and hash all four fixture files in manifest order. Require all four exact byte lengths and SHA-256 values before any PDFium initialization.
4. Resolve the exact PDFium package/WASM path beneath verified /deps as defined in section 7. Reject symlink or resolved-path escape.
5. Read the exact local PDFium WASM bytes and require byte length 4633788 and SHA-256 c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8.

PDFIUM LIFECYCLE
6. Initialize @embedpdf/pdfium exactly once with init({ wasmBinary }).
7. Call PDFiumExt_Init exactly once. Set libraryInitialized=true only after this call returns successfully.
8. Enter an outer try/finally scope. If libraryInitialized=true, FPDF_DestroyLibrary must be called exactly once from the outer finally block on success or failure. Record destruction success/failure. No attempt summary may be finalized before this outer cleanup finishes.

PER-FIXTURE LIFECYCLE
9. For each of the four fixtures in exact manifest order:
   a. Re-read the exact fixture from /repo and revalidate path containment, byte length, and SHA-256 immediately before allocation.
   b. Initialize documentPointer=0, allocationPointer=0, allocationFreed=false, documentClosed=false, cleanupFailures=[].
   c. In a fixture try/finally scope, allocate exactly fixture.byteLength bytes using pdfium.wasmExports.malloc and store the nonzero allocationPointer.
   d. Copy the fixture bytes with pdfium.HEAPU8.set(bytes, allocationPointer).
   e. Call FPDF_LoadMemDocument(allocationPointer, fixture.byteLength, "") and store documentPointer.
   f. If documentPointer is zero, record openSucceeded=false and FPDF_GetLastError; publish no page-count claim.
   g. If documentPointer is nonzero, record openSucceeded=true and call FPDF_GetPageCount(documentPointer).
   h. In the fixture finally block, if documentPointer is nonzero and has not been closed, call FPDF_CloseDocument exactly once and mark documentClosed=true only on successful return.
   i. In the same fixture finally block, if allocationPointer is nonzero and has not been freed, call pdfium.wasmExports.free exactly once and mark allocationFreed=true only after the call is issued successfully.
   j. Record every cleanup exception or failure without retrying the same close/free operation. Never double-close or double-free.
   k. After fixture cleanup completes, re-read and re-hash the fixture from /repo and require exact pre/post digest and length equality.
   l. Emit one deterministic fixture record including execution and cleanup state.
   m. A normal document-open rejection is raw evidence and may proceed to the next fixture after cleanup. Any unexpected exception, identity drift, page-count failure, post-hash failure, or cleanup failure marks the attempt failed and aborts further fixture execution only after current-fixture cleanup completes.

ATTEMPT FINALIZATION
10. The outer finally block must execute library destruction exactly once whenever libraryInitialized=true, including after any fixture/runtime failure.
11. Record observer termination state and cleanup state before process exit.
12. Emit/finalize the attempt summary only after all applicable fixture cleanup and library destruction have completed.
```

If `init({ wasmBinary })` fails before `PDFiumExt_Init` succeeds, record `PDFIUM_MODULE_INIT_FAILED`, do not fabricate `libraryInitialized=true`, and fail the attempt. If `PDFiumExt_Init` is attempted but does not return successfully, record `PDFIUM_EXTENSION_INIT_FAILED`; no structural fixture observation is permitted. Cleanup must never claim a successful destruction call that was not actually made.

This observer performs structural open/page-count evidence only. It does not render, extract text, search, mutate, save, repair, execute JavaScript, inspect signatures, classify malware, or claim polyglot absence.

## 9. Structural evidence mapping boundary

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

## 10. Fixture expectation gates

The canonical fixture manifest remains the expectation authority.

Required gates include:

- `ordinary-minimal.pdf`: structural evidence must become complete before `CONFIRMED_PDF`; `NOT_PDF` is forbidden.
- `declared-pdf-nonpdf.bin`: misleading declared metadata cannot confirm the bytes as PDF; structural completion or input rejection is permitted by the fixture contract.
- `truncated-pdf-like.pdf`: marker-like bytes cannot establish PDF validity; `CONFIRMED_PDF` is forbidden.
- `pdf-with-trailing-inert-bytes.pdf`: parser acceptance does not prove non-polyglot status; policy-visible ambiguity must remain available.

The runtime harness must not invent a stronger oracle than the manifest. Unexpected PDFium behavior is preserved as evidence and fails qualification closed; it is not repaired by changing fixture expectations in the same unit.

## 11. Future container topology and resource bounds

The first runtime attempt must use the exact selected `linux/amd64` image only after fresh locality/platform verification and the complete `/deps` prestart validation in section 6.

Minimum container controls:

```text
--platform linux/amd64
--pull=never
--network none
--read-only
--cap-drop ALL
--security-opt no-new-privileges
--pids-limit 64
--memory 4g
--memory-swap 4g
--cpus 2
--stop-timeout 5
```

Allowed mounts:

```text
/repo        read-only exact canonical repository snapshot
/toolchain   read-only exact retained Node toolchain
/deps        read-only exact verified clean materialized dependency tree
/evidence    read-write fresh attempt-specific evidence root only
```

No Docker socket, host home, SSH agent, credential store, package cache, registry credential, proxy credential, or arbitrary host directory may be mounted.

The future container command must execute the exact retained Node executable directly as the container entrypoint/process, with no shell wrapper between Docker and Node. `pnpm`, `npm`, Corepack, lifecycle scripts, resolver execution, dependency installation, and package build commands are prohibited.

## 12. Hard wall-clock timeout and cancellation contract

The single runtime attempt is bounded by an outer host-side monotonic wall-clock deadline:

```text
RUNTIME_WALL_CLOCK_TIMEOUT_SECONDS = 120
CONTAINER_STOP_GRACE_SECONDS = 5
CPU_LIMIT = 2
MEMORY_LIMIT_BYTES = 4294967296
MEMORY_SWAP_LIMIT_BYTES = 4294967296
PIDS_LIMIT = 64
```

The 120-second deadline begins immediately before the first and only authorized container start and includes Node startup, `init({ wasmBinary })`, `PDFiumExt_Init`, all four fixture observations, cleanup, `FPDF_DestroyLibrary`, and observer evidence serialization.

A future execution authority must explicitly authorize the following cancellation behavior before launch; this static unit does not execute it:

1. supervise the container with a host-side monotonic deadline that does not depend on the observer event loop;
2. if the container has not exited by 120 seconds, record `timeoutExceeded=true` and issue exactly one graceful container stop using the frozen five-second stop grace;
3. if the process still has not exited after that bounded grace, issue exactly one container SIGKILL as terminal cleanup;
4. never restart the observer, container, Node, or PDFium under the same authority after a timeout;
5. record start/deadline/stop/kill/exit timestamps and actions, final Docker exit state, OOM state, and any partial observer output;
6. classify any timeout, stop, SIGKILL, OOM, or resource-limit termination as qualification failure.

If the later Issue #7 runtime authority does not explicitly grant the required bounded stop/SIGKILL cancellation actions, the attempt must not launch. Docker Desktop process kill/force-quit, factory reset, prune, or settings mutation are outside this contract.

## 13. No-network proof

`--network none` and `--pull=never` are mandatory but are not the sole evidence.

The future attempt must also freeze:

- local image prestart inspect proving exact digest/platform before container creation;
- exact Docker argv and exact process argv;
- container prestart inspect showing network mode `none` and all resource/security controls from section 11;
- environment manifest proving no proxy, credential, registry, or external URL environment is intentionally supplied;
- stdout and stderr;
- postrun container inspect including exit code/OOM state;
- any observed network-related Node/PDFium messages;
- a final statement distinguishing `network namespace disabled` from `application made no networking API attempt` when the latter cannot be independently observed.

Any image pull, external URL fetch attempt, CDN path, DNS/network dependency, registry dependency, or successful external connection is a qualification failure.

## 14. Evidence root and one-attempt discipline

The future runtime authority must create a fresh attempt-specific evidence root and a fresh coordination lock before any container creation.

It must freeze before the first container start:

- canonical base/head/tree;
- open-PR frontier;
- repository pre-status;
- exact repository controls and manifest/fixture hashes;
- exact toolchain/package/WASM hashes;
- exact dependency inventory manifest hash and reconstructed `/deps` inventory result;
- exact local image identity/platform result;
- observer source bytes and SHA-256;
- container name/id/image/platform/network/mount/security/resource configuration;
- exact argv/environment;
- wall-clock deadline and cancellation policy;
- launch record with attempt count `1`.

The authority is consumed by the first provider-runtime container start whether it passes or fails. No rerun is allowed under the same authority.

Read-only postrun validators may be separately repaired only by explicit forward-only Issue #7 authority and must never restart PDFium or Node.

## 15. Required future runtime result schema

Each fixture record must contain at least:

```text
fixtureId
repositoryPath
manifestRecordIndex
inputSha256
inputByteLength
postSha256
postByteLength
openSucceeded
pdfiumLastError?       # required on open failure
pageCount?             # allowed only on open success
allocationAttempted
allocationFreed
closedDocument         # true only when a document pointer was opened and closed
cleanupFailureCount
cleanupFailures[]
wasmSha256
wasmByteLength
providerIdentity
nodeExecutableSha256
fixtureFailureState?
```

The attempt-level record must contain at least:

```text
manifestSha256
manifestByteLength
manifestRecordCount = 4
manifestOrderVerified
allFixtureIdentitiesPreflightVerified
wasmResolvedPathContained
wasmSha256
wasmByteLength
dependencyInventorySha256
dependencyInventoryEntryCount = 934
dependencyInventoryVerified
containerExitCode
containerOomKilled
observerProcessIsContainerInit = true
observerExitCode
observerTerminationKind       # EXITED | SIGNALED | TIMEOUT_TERMINATED | START_FAILED
observerFailureState?         # deterministic failure phase/code when not successful
observerSignal?
timeoutSeconds = 120
timeoutExceeded
terminationAction             # NONE | STOP | KILL
networkMode
imageDigest
platform
observerSha256
fixtureRecordCount
inputMutationCount
externalNetworkSuccessCount
libraryInitialized
libraryDestroyed
libraryDestroyFailure?
attemptSucceeded
```

Because the exact retained Node executable is the container entrypoint with no shell wrapper, the observer process is the container init process. The recorded `observerExitCode` must equal the final Docker `containerExitCode` exactly for every exited attempt, including nonzero failure exits. Signal/timeout termination must additionally record `observerTerminationKind`, `observerSignal` when observable, the host supervisor action, and the same final container exit result. A missing or contradictory observer/container termination record is a qualification failure.

The observer must use deterministic failure states for at least:

```text
PREFLIGHT_INTEGRITY_FAILED
PDFIUM_MODULE_INIT_FAILED
PDFIUM_EXTENSION_INIT_FAILED
FIXTURE_OBSERVATION_FAILED
CLEANUP_FAILED
TIMEOUT_TERMINATED
RESOURCE_LIMIT_TERMINATED
EVIDENCE_FINALIZATION_FAILED
```

## 16. Acceptance conditions for a later runtime attempt

A future runtime attempt can qualify only if all of the following are proven from the single consumed run:

1. exact canonical base/head and expected repository surface remain unchanged;
2. selected image/platform and exact Node/package/WASM identities match, with local image presence proven before create/start and no pull;
3. the complete retained `/deps` inventory matches the frozen 934-entry manifest before mount;
4. container network mode is `none` and all frozen resource/security controls are present;
5. exact manifest bytes/schema/corpus/record count/order and all four fixture identities match before PDFium execution;
6. PDFium WASM lexical/resolved paths remain contained beneath the exact retained package root and PDFium initializes only from the provided local `wasmBinary`;
7. all four fixtures produce a complete raw observation record for a qualifying success;
8. every opened document is closed at most/exactly once as applicable and every allocated fixture buffer is freed at most/exactly once as applicable, with zero cleanup failures for qualification;
9. all fixture bytes match exactly before initialization, immediately before each load, and after each fixture cleanup;
10. `FPDF_DestroyLibrary` runs exactly once after successful extension initialization, including failure paths, and library cleanup succeeds;
11. no package-manager, dependency-acquisition, build, render, search, mutation, classifier, image-pull, or external-network path executes;
12. the 120-second hard deadline and resource limits are evidenced; timeout/OOM/signal/resource-limit termination fails qualification;
13. observer/container termination is preserved exactly, with direct-process exit equality and failure state evidence;
14. evidence finalization occurs while the coordination lock is still held;
15. any semantic mapping to provider-neutral admission remains within the canonical 004C1R contract.

No specific PDFium open/reject result for the three adversarial fixtures is assumed before the first authorized run.

## 17. Explicit non-grants

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

## 18. Qualification result

```text
STATIC_LOCAL_PDFIUM_STRUCTURAL_RUNTIME_HARNESS = QUALIFIED_CANDIDATE
RUNTIME_ATTEMPT_AUTHORITY = ABSENT
DOCKER_RECOVERY_AUTHORITY = ABSENT
GENERAL_INSPECT_RENDER_SEARCH_RUNTIME = NOT_AUTHORIZED
NEXT_SUCCESSOR = NOT_YET_DERIVED
```

Canonicalization requires exact-head independent substantive review, zero unresolved material review threads, immediate race proof, guarded normal merge with exact expected head, mechanical post-merge verification, and fresh Issue #7 successor reconciliation.
