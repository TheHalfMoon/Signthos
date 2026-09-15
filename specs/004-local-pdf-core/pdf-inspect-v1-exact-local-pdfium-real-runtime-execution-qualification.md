# PDF_INSPECT_V1 Exact Local PDFium Real-Runtime Execution Qualification

Status: `QUALIFICATION_CANDIDATE / EXACT_LOCAL_REAL_RUNTIME_EXECUTION_PASS`
Issue: #7
Authority: `github:issue-comment:5673578532`
Fresh execution evidence: `github:issue-comment:5673601717`
Preserved failed attempt: `github:issue-comment:5673176139`
Owning specification: `004-local-pdf-core`

## 1. Purpose and authority

This artifact records the first successful exact-package real-PDFium execution through the canonical `PDF_INSPECT_V1` raw runtime and supervised semantic orchestrator after the initializer-options compatibility repair became canonical.

```text
UNIT = PDF_INSPECT_V1_EXACT_LOCAL_PDFIUM_REAL_RUNTIME_EXECUTION_QUALIFICATION
AUTHORITY_CLASS = EXECUTION_QUALIFICATION_ONLY
CANONICAL_BASE = 1a30102f6fe118c54214791e03ba4e5caf5a19c0
CANONICAL_BASE_TREE = 120b8cd8c96a6129cf52e44460af3800b3d5ba6d
MAX_CHANGED_REPOSITORY_FILES = 1
AUTHORIZED_REPOSITORY_PATH = specs/004-local-pdf-core/pdf-inspect-v1-exact-local-pdfium-real-runtime-execution-qualification.md
```

No product source, package manifest, lockfile, dependency adoption, production loader, browser/worker integration, or unrelated repository surface is changed by this qualification.

## 2. Predecessor failure remains preserved

Attempt 1 is preserved at `github:issue-comment:5673176139` as a failed, non-qualifying real-runtime attempt. Its package/archive/WASM integrity gates passed and runtime network attempts were zero, but the canonical runtime then passed a frozen initializer-options object to the exact `@embedpdf/pdfium@2.15.0` initializer. The initializer attempted to write its captured override back into that object and failed before PDF document execution.

The repository-owned compatibility defect was repaired forward-only and canonically closed by `github:issue-comment:5673560218`. Attempt 1 is not reclassified as success and none of its failed output is used as successful qualification evidence.

## 3. Fresh isolated execution root

Attempt 2 began from a fresh isolated checkout of the exact canonical base:

```text
CANONICAL_BASE = 1a30102f6fe118c54214791e03ba4e5caf5a19c0
CANONICAL_BASE_TREE = 120b8cd8c96a6129cf52e44460af3800b3d5ba6d
PRE_EXECUTION_REPOSITORY_STATUS_BYTES = 0
```

Historical extracted package bytes were not trusted directly. The exact previously acquired package archive was copied into the fresh external evidence root, re-hashed, and freshly extracted there before execution.

The runtime phase did not invoke npm, pnpm, Corepack, a package installer, a registry client, or a dependency resolver.

## 4. Exact Node identity

The temporary exact Node executable had expired from `/tmp`, so the official Darwin arm64 archive was reacquired outside the repository and the executable was reverified before qualification.

```text
NODE_VERSION = v24.20.0
NODE_DARWIN_ARM64_EXECUTABLE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
NODE_DARWIN_ARM64_ARCHIVE_SHA256 = 40e5607e5ecb3db9192723776da2d75d966260fc74a7a9e731c1bd67dda96bc8
```

The earlier missing-executable command performed no candidate execution and is not an attempt result.

## 5. Exact PDFium package and WASM identity

Fresh preflight checks on the newly extracted package established:

```text
PDFIUM_NPM_IDENTITY = @embedpdf/pdfium@2.15.0
PDFIUM_TARBALL_SHA1 = b073cf9cee2252507c4fc81fb47a156cb2a19662
PDFIUM_TARBALL_SHA256 = fe0cb4677782a58b67f555df9a1257742bcfbf390b9a3e08bd8ad976eea436bb
EXTRACTED_DEPENDENCIES = 0
PDFIUM_INDEX_CJS_SHA256 = 937f65dbde0ebc92f3c1d3d32c909bc1a30146e824d69d6fde4de3a168912602
PDFIUM_WASM_BYTES = 4633788
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
```

The WASM file was re-hashed again after execution and retained the same SHA-256.

## 6. Canonical fixture identity

Attempt 2 used only the already-canonical ordinary-minimal admission fixture.

```text
MANIFEST_PATH = specs/004-local-pdf-core/fixtures/admission/manifest.json
MANIFEST_BYTES = 15598
MANIFEST_SHA256 = 34cddff9550b46c011a10a0e474af2f0701d7b4cb1961e4692ae5ceff1e5a841
FIXTURE_ID = admission-seed-ordinary-minimal-v1
FIXTURE_PATH = specs/004-local-pdf-core/fixtures/admission/ordinary-minimal.pdf
FIXTURE_BYTES = 583
FIXTURE_SHA256 = d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207
```

This qualification does not generalize the observed result to malformed, encrypted, active-content, trailing-byte, large/resource-limit, render, text, or search fixtures.

## 7. Canonical runtime identities

The exact canonical execution surfaces used by attempt 2 were:

```text
PDF_INSPECT_RUNTIME_SHA256 = 4f98df59f85c9e493513afda7ef5e254e578af64c5b368f7a55eebf6f9c4b462
PDF_INSPECT_RUNTIME_SUPERVISOR_SHA256 = f258accd7998ef08a9c6f1dd6f26325697c01e5206534d27952e797bee7c1922
PDF_INSPECT_RUNTIME_BRIDGE_SHA256 = 43c58ae68d41f9e8fe9bfa5497e9d8e04069db4f384cfbe0fb258550ed8c2cbe
PDF_INSPECT_ORCHESTRATOR_SHA256 = 4ac859e02ba729a73b380fc266a5f50cc000e973cca66d9b2d5872c7491f31ee
PDF_INSPECT_PROVIDER_SHA256 = aa0ec7816a305a8a0abc1e221e4ebfa1a227f42f0c9015cbbd914e256e6f493a
```

The raw runtime consumed caller-supplied local WASM bytes and the exact package initializer. The semantic path used the canonical orchestrator with an injected `runRuntime` that invoked that same canonical raw runtime.

No production runtime loader or adapter was introduced.

## 8. External qualification harness and network denial

The execution harness and network-denial preload lived outside the repository. Their exact identities were:

```text
REAL_RUNTIME_HARNESS_SHA256 = fa3a8380a4426e3a091b406b245a6d72bb657f05bed262c0e079e8069a9fa076
NETWORK_DENY_HARNESS_SHA256 = 50e32fb205cb0cdc17f09e06edbb94bd447461492e1b9198a0d61480a98fdcc6
```

The preload denied and recorded normal Node/global network surfaces including `fetch`, HTTP, HTTPS, TCP, TLS, UDP, and DNS calls. The runtime attempt supplied exact local `wasmBinary` bytes and did not use the package CDN convenience path.

```text
NETWORK_ATTEMPTS = 0
NETWORK_LOG_SHA256 = e734d5d0959ce875042011a852db9034d201588636b6cb6fbde4ed37d41c678a
```

This is evidence for the exercised Node/Darwin qualification path. It is not browser-network or worker-network qualification.

## 9. Attempt 2 raw runtime result

The exact package initializer and canonical raw runtime completed successfully:

```text
ATTEMPT_2_RC = 0
RAW_OPEN_SUCCEEDED = true
RAW_PAGE_COUNT = 1
STDERR_BYTES = 0
```

The raw observation was a frozen provider-runtime result. It was kept separate from semantic admission/output composition.

## 10. Attempt 2 supervised semantic result

The canonical orchestrator then invoked the real raw runtime through the injected runtime boundary exactly once. The semantic result established:

```text
SEMANTIC_OUTCOME = SUCCEEDED
SEMANTIC_PAGE_COUNT = 1
SEMANTIC_LOCALITY = LOCAL_ONLY
NEW_CANONICAL_REVISION_CREATED = false
RUN_RUNTIME = 1
SUPERVISOR_SUBSCRIBE = 1
SUPERVISOR_DISPOSE = 1
TERMINATE_RUNTIME = 0
```

The exact provider identity was `signthos.pdf.browser.embedpdf-v2.15.0-pdfium`; the provider capability version was `signthos.pdf.inspect.v1`; and the provider-version evidence retained the exact package identity, EmbedPDF source commit, PDFium submodule revision, and WASM digest already frozen by the canonical provider contract.

This proves the exact ordinary-minimal bytes can pass through the real local PDFium runtime and the canonical supervised semantic stack without creating a new canonical revision.

## 11. Repository and byte integrity

Repository state was captured immediately before and after the attempt:

```text
PRE_EXECUTION_STATUS_BYTES = 0
POST_EXECUTION_STATUS_BYTES = 0
PRE_POST_REPOSITORY_STATUS_BYTE_EQUAL = YES
POST_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
```

No tracked or untracked repository mutation occurred during execution.

## 12. Fresh evidence identities

```text
ATTEMPT_STDOUT_BYTES = 2322
ATTEMPT_STDOUT_SHA256 = 208e6f8795f183984d340d6b9d4d1636fc1b1fbace12aa52701ccfd8cc173a0f
ATTEMPT_STDERR_BYTES = 0
ATTEMPT_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
PARSED_SUMMARY_SHA256 = 8e59fb9532501fcba80968b76a62487b8c42d951863f1df854e923d3c648caed
PREFLIGHT_SUMMARY_SHA256 = db22cdf4c74ed4d9df62fc06822cd745f1038601698f62fd8e7cc3d67c1531ec
EVIDENCE_MANIFEST_ROWS = 11
EVIDENCE_MANIFEST_SHA256 = f16cc65f4af67246b477f5cc33677c58f40ab364462314c80910e218efdcd665
```

The evidence manifest excludes itself from its hashed row set and separately includes the two external harness identities. The earlier transient self-referential manifest draft was superseded before any qualification claim was recorded and is not evidence.

## 13. Qualified claim

The bounded claim established by attempt 2 is:

> On the exact canonical Signthos base, under exact Node `v24.20.0`, exact `@embedpdf/pdfium@2.15.0` package bytes, exact local PDFium WASM bytes, and the exact canonical ordinary-minimal fixture, the canonical raw `PDF_INSPECT_V1` runtime successfully opened the PDF and observed one page; the canonical supervised semantic orchestrator then produced a local-only `SUCCEEDED` result with page count one, with zero observed runtime network attempts and no repository or input-WASM drift.

No broader provider/runtime claim is inferred.

## 14. Explicit non-grants

```text
PRODUCTION_RUNTIME_LOADER_OR_ADAPTER = NOT_AUTHORIZED / NOT_IMPLEMENTED
PACKAGE_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED / NOT_PERFORMED
DEPENDENCY_ADOPTION_CHANGE = NOT_AUTHORIZED / NOT_PERFORMED
BROWSER_OR_WORKER_QUALIFICATION = NOT_AUTHORIZED / NOT_ESTABLISHED
MALFORMED_ENCRYPTED_ACTIVE_CONTENT_QUALIFICATION = NOT_ESTABLISHED_BY_THIS ATTEMPT
PDF_PAGE_RENDER_V1 = NOT_AUTHORIZED
PDF_THUMBNAIL_RENDER_V1 = NOT_AUTHORIZED
PDF_TEXT_EXTRACT_V1 = NOT_AUTHORIZED
PDF_TEXT_SELECT_V1 = NOT_AUTHORIZED
PDF_TEXT_SEARCH_V1 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 15. Canonicalization gate

This execution qualification remains a candidate until the exact one-file documentation diff receives independent substantive exact-head review, zero unresolved material review threads, immediate live race proof, guarded normal merge, post-merge tree/parent/path/signature verification, and Issue #7 closeout.

Successful execution does not itself authorize a production loader/adapter or any later capability. A fresh successor reconciliation is mandatory after canonical closeout.
