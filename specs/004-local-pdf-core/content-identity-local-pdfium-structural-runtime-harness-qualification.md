# Specification 004 — Content Identity Local PDFium Structural Runtime Harness Qualification

Status: `STATIC_RUNTIME_HARNESS_QUALIFICATION_CANDIDATE / ZERO_RUNTIME_EXECUTION`
Issue: #7
Canonical base: `efb9b5cd4767cdf9b5e66f11839ebd277af52f98`
Canonical base tree: `4856e4d4668084125a45611c7e78ccb0e9b61149`
Authority: `github:issue-comment:5661180680`

## 1. Purpose

Freeze the smallest deterministic, provider-local harness contract required before any later one-shot structural PDFium runtime attempt may be considered.

This grain is static only. It does not start or recover Docker, create or start a container, execute Node, initialize PDFium, execute a fixture, render a page, extract text, search, classify content, mutate fixtures, acquire dependencies, use the network, or change any package, lockfile, provenance, notice, runtime, or workflow surface.

## 2. Authorized repository surface

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = CONTENT_IDENTITY_LOCAL_PDFIUM_STRUCTURAL_RUNTIME_HARNESS_QUALIFICATION
AUTHORITY_CLASS = STATIC_RUNTIME_HARNESS_QUALIFICATION_ONLY
CANONICAL_BASE = efb9b5cd4767cdf9b5e66f11839ebd277af52f98
CANONICAL_BASE_TREE = 4856e4d4668084125a45611c7e78ccb0e9b61149
ALLOWED_PATH = specs/004-local-pdf-core/content-identity-local-pdfium-structural-runtime-harness-qualification.md
MAX_CHANGED_FILES = 1
```

No other repository path is authorized by this grain.

## 3. Exact retained runtime identities

A later runtime attempt, if separately authorized, must fail closed unless every retained identity below is reverified exactly before execution.

```text
NODE_IDENTITY = node-v24.20.0-linux-x64
NODE_EXECUTABLE_SHA256 = 89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7
PDFIUM_NPM_IDENTITY = @embedpdf/pdfium@2.15.0
PDFIUM_CJS_SHA256 = 937f65dbde0ebc92f3c1d3d32c909bc1a30146e824d69d6fde4de3a168912602
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
PDFIUM_WASM_BYTES = 4633788
SELECTED_LINUX_AMD64_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
```

Identity mismatch is a hard pre-start failure. No substitution by package range, mutable tag, alternate Node executable, alternate WASM, alternate CJS bundle, alternate image digest, CDN URL, or fetched replacement is permitted.

## 4. Canonical admission fixture bindings

Only the four already-canonical Signthos-authored admission fixtures are in scope for the future structural attempt.

| Fixture | Purpose | SHA-256 | Bytes |
| --- | --- | --- | ---: |
| `specs/004-local-pdf-core/fixtures/admission/ordinary-minimal.pdf` | `ORDINARY_PDF_CONTROL` | `d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207` | 583 |
| `specs/004-local-pdf-core/fixtures/admission/declared-pdf-nonpdf.bin` | `DECLARED_IDENTITY_MISMATCH` | `fecf1b6f0521397334ff12a71c066129c97bb5458e68cbe2e80aed8a3f92825c` | 86 |
| `specs/004-local-pdf-core/fixtures/admission/truncated-pdf-like.pdf` | `STRUCTURAL_MALFORMED_INPUT` | `b315f2c38fee3e1ff098b8e815625bf47a6d8eced917cea06a158bad897e02c1` | 94 |
| `specs/004-local-pdf-core/fixtures/admission/pdf-with-trailing-inert-bytes.pdf` | `POLYGLOT_OR_MIXED_CONTENT_AMBIGUITY` | `d21b6163ad783ee0aca73e17e5f1cd7f06183b751312fdce116d6695146ebec0` | 616 |

Before any future runtime start, SHA-256 and byte length must match for all four files. After the attempt, the same four SHA-256 values and lengths must match again. Any mismatch is a qualification failure and must not be repaired by rewriting fixture bytes.

## 5. Future single-attempt topology

This section freezes topology only. It does not authorize execution.

A later Issue #7 authority may consume at most one runtime attempt against the exact retained identities above. The future attempt must use one disposable `linux/amd64` container from the exact selected immutable image and must satisfy all of the following before container start:

```text
PLATFORM = linux/amd64
NETWORK = none
EXTERNAL_URLS = 0
CDN_FETCH = PROHIBITED
PACKAGE_INSTALL = PROHIBITED
DEPENDENCY_ACQUISITION = PROHIBITED
HOST_WRITEABLE_SOURCE_MOUNTS = 0
INPUT_FIXTURE_MUTATION = PROHIBITED
ATTEMPT_COUNT_MAX = 1
```

Permitted mounts are limited to:

1. a read-only canonical repository snapshot containing the exact four fixtures;
2. a read-only retained dependency tree containing exact `@embedpdf/pdfium@2.15.0` CJS and WASM bytes;
3. a read-only retained exact Node toolchain containing the executable identity above;
4. one isolated writeable evidence-output directory that contains no repository source or dependency bytes before execution.

No Docker socket, host home directory, package-manager cache, credential store, SSH material, cloud configuration, unrelated repository, or mutable package source may be mounted.

## 6. Required local WASM initialization route

The only admissible initialization route for the later attempt is local exact-byte initialization:

```text
const wasmBinary = readExactVerifiedWasmBytes();
const pdfium = await init({ wasmBinary });
```

The harness must verify the WASM byte length and SHA-256 before calling `init({ wasmBinary })`.

No URL-valued `locateFile`, `fetch`, XHR, CDN fallback, package download, dynamic dependency acquisition, or remote WASM resolution is permitted. Any observed network attempt is an immediate qualification failure, even if the request fails or no bytes are received.

## 7. Bounded structural call surface

The later runtime attempt is limited to structural open classification. The harness may invoke only the minimum raw wrapped PDFium operations required for that purpose:

```text
FPDF_LoadMemDocument
FPDF_GetPageCount
FPDF_GetLastError
FPDF_CloseDocument
```

The harness must not invoke rendering, bitmap generation, thumbnail generation, text extraction, search, annotation editing, forms mutation, page mutation, save/export, signing, verification, OCR, conversion, repair, compression, classifier execution, or any unrelated provider API.

For each fixture, the harness must record a deterministic observation record containing at least:

```text
fixturePath
fixtureSha256Before
fixtureByteLengthBefore
loadSucceeded
lastError
pageCount
closeAttempted
closeCompleted
fixtureSha256After
fixtureByteLengthAfter
inputMutationDetected
```

`pageCount` may be recorded only when a non-null document handle is returned. `FPDF_CloseDocument` must be called exactly once for every successfully opened document handle. A null document handle must not be closed.

The harness must not predeclare parser-specific success/failure outcomes for malformed or ambiguous fixtures. The purpose of the later attempt is to collect bounded structural observations, not to backfill expected runtime results into canonical fixture records.

## 8. Failure semantics

The future attempt must fail closed for any of the following:

- exact Node, CJS, WASM, image, fixture digest, or fixture length mismatch;
- Docker/container topology mismatch;
- provider initialization failure;
- unhandled exception or process crash;
- timeout, cancellation, OOM, signal termination, or resource-limit termination;
- any network attempt;
- any unexpected mount;
- any fixture mutation;
- output/evidence write outside the isolated evidence directory;
- missing last-error evidence for a failed structural open;
- missing page-count evidence for a successful structural open;
- missing or duplicate document cleanup;
- nondeterministic or unparsable stdout evidence;
- missing container-inspection evidence;
- incomplete evidence manifest.

A failed attempt is consumed. Re-execution requires fresh Issue #7 authority.

## 9. Deterministic evidence contract

The future execution, if authorized, must freeze exact raw bytes or exact hashes plus lengths for every evidence object necessary to reproduce the qualification claim.

Minimum evidence set:

```text
canonical-main.txt
canonical-tree.txt
container-create-command.bin
container-inspect-pre.json
container-inspect-post.json
image-inspect.json
node-identity.txt
pdfium-cjs-identity.txt
pdfium-wasm-identity.txt
fixture-preflight.tsv
fixture-postflight.tsv
stdout.bin
stderr.bin
process-exit.txt
container-events.json
network-observer.txt
structural-observations.json
cleanup-state.txt
evidence-manifest.tsv
```

Requirements:

- stdout and stderr are captured as raw byte streams, including explicit zero-byte length when empty;
- structured observations use one frozen deterministic serialization format for the attempt;
- the evidence manifest binds each evidence filename to SHA-256 and byte length;
- the manifest is finalized only after all post-execution fixture checks, container inspection, network evidence, and cleanup evidence are complete;
- no evidence object may be silently regenerated or normalized after manifest finalization;
- the evidence root must not contain credentials, secrets, unrelated host data, or mutable repository state.

## 10. Resource, timeout, and cancellation boundary

This grain does not choose host-specific runtime values because no execution is authorized. A later one-shot authority must state exact timeout, memory, CPU, process, and cancellation controls before execution begins. Missing controls are a pre-start failure.

Those controls must be strict enough that malformed input cannot create an unbounded parse or host-resource commitment, and they must not be changed after the attempt begins.

## 11. Static qualification assertions

This candidate claims only that the future harness contract is sufficiently bounded to permit later consideration of a one-shot runtime attempt.

```text
DOCKER_DAEMON_START_OR_RECOVERY = NOT_PERFORMED
DOCKER_CONTAINER_CREATE_OR_START = NOT_PERFORMED
NODE_EXECUTION = NOT_PERFORMED
PDFIUM_INITIALIZATION = NOT_PERFORMED
PDFIUM_OR_PROVIDER_RUNTIME_EXECUTION = NOT_PERFORMED
FIXTURE_EXECUTION = NOT_PERFORMED
RENDER_OR_THUMBNAIL_EXECUTION = NOT_PERFORMED
TEXT_EXTRACTION_OR_SEARCH_EXECUTION = NOT_PERFORMED
CLASSIFIER_EXECUTION = NOT_PERFORMED
PACKAGE_OR_LOCKFILE_MUTATION = NONE
DEPENDENCY_ACQUISITION_OR_INSTALLATION = NONE
NETWORK_EXECUTION = NOT_PERFORMED
FIXTURE_MUTATION = NONE
PROVENANCE_OR_NOTICE_MUTATION = NONE
```

## 12. Merge qualification gate

This static harness candidate is merge-qualified only if all of the following are proven on the exact candidate head:

1. canonical base remains `efb9b5cd4767cdf9b5e66f11839ebd277af52f98` and tree `4856e4d4668084125a45611c7e78ccb0e9b61149`;
2. exactly one changed file exists, and it is the authorized path named above;
3. `git diff --check` is clean;
4. no runtime/provider/container/fixture execution was used as qualification evidence;
5. no dependency, package, lockfile, workflow, provenance, notice, fixture, or source-runtime mutation occurred;
6. one fresh independent substantive exact-head review reports no unresolved material finding;
7. unresolved material review threads are zero;
8. immediate premerge race proof reconfirms base/head/tree/surface/authority/check accounting;
9. guarded normal merge uses the exact reviewed `expected_head_sha`;
10. post-merge verification proves merge SHA, ordered parents, reviewed-head tree equality, canonical tree, signature validity, exact changed path, and truthful workflow/check accounting;
11. fresh Issue #7 successor reconciliation is performed after merge.

## 13. Successor boundary

Canonicalizing this document does not itself authorize any runtime attempt.

Only fresh Issue #7 reconciliation after guarded merge may authorize either Docker recovery or exactly one structural runtime attempt, and that authority must explicitly name the permitted action, retained identities, topology, timeout/resource limits, evidence root, and one-shot consumption rule.

```text
DOCKER_DAEMON_START_OR_RECOVERY = NOT_AUTHORIZED_BY_THIS_GRAIN
DOCKER_CONTAINER_CREATE_OR_START = NOT_AUTHORIZED_BY_THIS_GRAIN
NODE_EXECUTION = NOT_AUTHORIZED_BY_THIS_GRAIN
PDFIUM_INITIALIZATION = NOT_AUTHORIZED_BY_THIS_GRAIN
PDFIUM_OR_PROVIDER_RUNTIME_EXECUTION = NOT_AUTHORIZED_BY_THIS_GRAIN
FIXTURE_EXECUTION = NOT_AUTHORIZED_BY_THIS_GRAIN
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```
