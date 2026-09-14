# Local PDFium Structural Runtime Execution Qualification

Authority: `github:issue-comment:5670528912`

## 1. Qualification purpose

This artifact qualifies the already-consumed first local PDFium structural runtime execution against the canonical provider-neutral content-identity contract. It does not execute PDFium again and does not authorize a second runtime attempt.

```text
UNIT = CONTENT_IDENTITY_LOCAL_PDFIUM_STRUCTURAL_RUNTIME_EXECUTION_QUALIFICATION
CANONICAL_BASE = 75050035cf76303f7a3e2e64df5b9c1bbd5496bb
CANONICAL_BASE_TREE = 7e1c07843e2a8abae888e0d4efe1ec9494c7a44a
AUTHORITY = github:issue-comment:5670528912
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/content-identity-local-pdfium-structural-runtime-execution-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
RUNTIME_RERUN = FORBIDDEN
```

The execution being qualified is frozen by `github:issue-comment:5670263175` and was performed under the one-shot authority `github:issue-comment:5670184406`.

## 2. Canonical predecessor boundary

The canonical static harness is:

`specs/004-local-pdf-core/content-identity-local-pdfium-structural-runtime-harness-qualification.md`

That harness required raw provider observations before semantic mapping and froze the rule that an unsuccessful open must not be silently normalized into `PDF_STRUCTURE_REJECTED`. It also required any semantic mapping to remain within canonical 004C1R.

Canonical 004C1R is:

`specs/004-local-pdf-core/004c1r-content-identity-admission-semantic-qualification.md`

Relevant 004C1R rules are preserved exactly in meaning:

- `STRUCTURAL_INSPECTION_COMPLETE` is the only structural state that may carry an authoritative `structuralIdentityResult`;
- `PDF_STRUCTURE_ACCEPTED` means only that the separately qualified structural provider accepted the exact bytes as PDF under its bounded contract;
- provider failure or unavailability is not `PDF_STRUCTURE_REJECTED`;
- `NOT_PDF` requires separately qualified admission-policy evidence and is not implied by a provider error alone;
- structural acceptance is not malware absence, sanitization, non-polyglot status, signature validity, certificate trust, or universal safety.

## 3. One-shot execution identity

The first and only authorized runtime attempt was consumed at the single Docker container start.

```text
RUNTIME_AUTHORITY = github:issue-comment:5670184406
RUNTIME_CLOSEOUT = github:issue-comment:5670263175
CONTAINER_CREATE_COUNT = 1
CONTAINER_START_COUNT = 1
SECOND_START = NOT_EXECUTED
SECOND_RUNTIME_ATTEMPT = NOT_AUTHORIZED
CANONICAL_MAIN_AT_EXECUTION = 75050035cf76303f7a3e2e64df5b9c1bbd5496bb
CANONICAL_TREE_AT_EXECUTION = 7e1c07843e2a8abae888e0d4efe1ec9494c7a44a
OPEN_PRS_AT_FINALIZATION = 0
```

A prelaunch observer V1 defect was preserved before any container was created or started:

```text
OBSERVER_V1_NONLAUNCH_SHA256 = d79035c7dedc66d66195ea55d0cb02f40b3d8550e39041aa37b7194fb64ce540
OBSERVER_V1_NONLAUNCH_REASON = double-finalization-control-flow-defect
OBSERVER_FORWARD_REPAIR_RECORD_SHA256 = b8844e548956b3d27fdefd2f45019b969bada28fc4a5b8c2047e5f19252d54ad
CONTAINER_CREATED_DURING_V1 = NO
CONTAINER_STARTED_DURING_V1 = NO
RUNTIME_ATTEMPT_CONSUMED_DURING_V1 = NO
```

The repaired observer V2 was frozen before the single launch:

```text
OBSERVER_V2_BYTES = 11457
OBSERVER_V2_SHA256 = a47353fdb2d5a94840660706a9a2794d5b9ce67e2fec9702570a3b340fc41103
AUTHORITY_ENVELOPE_SHA256 = 837da974d19cc123a261b04ed62661dad80c59c626d8c79e9adfbf8103d5e363
IMMEDIATE_PRESTART_RACE_SHA256 = 2e2d933c7dca4050bb7947324c5cf25dd27e033a5480de3aef69278c90ddc889
LAUNCH_RECORD_SHA256 = 0c930c675613d26c3c57f177c7d10b17641b58367b2ce2759e639ba7c8994ea4
```

## 4. Exact runtime identities and prestart qualification

The execution used only the already-qualified retained runtime bytes:

```text
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_PLATFORM = linux/amd64
NODE = node-v24.20.0-linux-x64
NODE_EXECUTABLE_SHA256 = 89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7
PDFIUM_NPM_IDENTITY = @embedpdf/pdfium@2.15.0
PDFIUM_CJS_SHA256 = 937f65dbde0ebc92f3c1d3d32c909bc1a30146e824d69d6fde4de3a168912602
PDFIUM_WASM_BYTES = 4633788
PDFIUM_WASM_SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
DEPENDENCY_INVENTORY_ENTRIES = 934
DEPENDENCY_INVENTORY_SHA256 = 6490e2adc663d3970ddd1cfacd37f139ebf303a9e5a40daf2665b46f9f66c585
```

Prestart validation was PASS and is frozen by:

```text
PRESTART_VALIDATION_SHA256 = 36e0024dc472ef098b3c5cda5203fc7699e6ba4575acd8147fcc7f22709c09f3
CONTAINER_PRESTART_INSPECT_SHA256 = 80167fe6544c9f23c07f62c1c77dc5ee2d89169b7e61519723a6fa06f4eb7937
```

The container prestart state proved:

```text
ENTRYPOINT = /toolchain/bin/node
OBSERVER_ARGV = /evidence/observer.cjs
NETWORK_MODE = none
READ_ONLY_ROOTFS = true
CAP_DROP = ALL
NO_NEW_PRIVILEGES = true
PIDS_LIMIT = 64
MEMORY_BYTES = 4294967296
MEMORY_SWAP_BYTES = 4294967296
CPU_LIMIT = 2
STOP_TIMEOUT_SECONDS = 5
```

Only four mounts were present: exact canonical repository snapshot read-only at `/repo`, retained Node read-only at `/toolchain`, retained dependency materialization read-only at `/deps`, and the attempt evidence root read-write at `/evidence`.

No package manager, resolver, dependency installer, build command, image pull, or shell wrapper was part of the runtime process path.

## 5. Fixture and manifest identities

The exact canonical fixture manifest remained:

```text
MANIFEST_PATH = specs/004-local-pdf-core/fixtures/admission/manifest.json
MANIFEST_BYTES = 15598
MANIFEST_SHA256 = 34cddff9550b46c011a10a0e474af2f0701d7b4cb1961e4692ae5ceff1e5a841
MANIFEST_RECORD_COUNT = 4
MANIFEST_ORDER_VERIFIED = true
```

The observer proved all four fixture identities before PDFium initialization, revalidated each immediately before load, and re-hashed each after cleanup. `inputMutationCount=0`.

| Order | Fixture | Bytes | SHA-256 |
| ---: | --- | ---: | --- |
| 1 | `admission-seed-ordinary-minimal-v1` | 583 | `d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207` |
| 2 | `admission-seed-declared-pdf-nonpdf-v1` | 86 | `fecf1b6f0521397334ff12a71c066129c97bb5458e68cbe2e80aed8a3f92825c` |
| 3 | `admission-seed-truncated-pdf-like-v1` | 94 | `b315f2c38fee3e1ff098b8e815625bf47a6d8eced917cea06a158bad897e02c1` |
| 4 | `admission-seed-trailing-inert-bytes-v1` | 616 | `d21b6163ad783ee0aca73e17e5f1cd7f06183b751312fdce116d6695146ebec0` |

## 6. Exact execution result

The single consumed execution completed successfully:

```text
DOCKER_START_ATTACH_RETURN_CODE = 0
CONTAINER_EXIT_CODE = 0
CONTAINER_OOM_KILLED = false
OBSERVER_EXIT_CODE = 0
OBSERVER_TERMINATION_KIND = EXITED
TIMEOUT_SECONDS = 120
TIMEOUT_EXCEEDED = false
TERMINATION_ACTION = NONE
ELAPSED_MONOTONIC_SECONDS = 1.3319246669998392
CONTAINER_STDERR_BYTES = 0
CONTAINER_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
CONTAINER_STDOUT_BYTES = 148
CONTAINER_STDOUT_SHA256 = 609f2e3a46f52b9631940d549a777877dd70221b137e2fa5dc1666b78021fa92
```

The host-side supervisor record is frozen by:

```text
SUPERVISOR_SHA256 = 2d7323540906796213355b5806389d371c7fdde67005eba8939689d5874e1500
START_WALL_CLOCK_UTC = 2026-09-14T20:19:19.048007+00:00
CONTAINER_STARTED_AT_UTC = 2026-09-14T20:19:19.123865125Z
CONTAINER_FINISHED_AT_UTC = 2026-09-14T20:19:20.306893209Z
END_WALL_CLOCK_UTC = 2026-09-14T20:19:20.380085+00:00
```

PDFium lifecycle and cleanup evidence:

```text
LIBRARY_INITIALIZED = true
LIBRARY_DESTROYED = true
LIBRARY_DESTROY_FAILURE = null
FIXTURE_RECORD_COUNT = 4
INPUT_MUTATION_COUNT = 0
CLEANUP_FAILURE_COUNT = 0
ATTEMPT_SUCCEEDED = true
```

Every opened document was closed and every allocated fixture buffer was freed. No retry of a close/free operation was required.

## 7. Raw provider observations

The raw observations are preserved before semantic mapping:

| Fixture | `openSucceeded` | Raw provider observation | Cleanup |
| --- | --- | --- | --- |
| `admission-seed-ordinary-minimal-v1` | `true` | `pageCount=1` | document closed; allocation freed |
| `admission-seed-declared-pdf-nonpdf-v1` | `false` | `FPDF_GetLastError()=3` | allocation freed |
| `admission-seed-truncated-pdf-like-v1` | `false` | `FPDF_GetLastError()=3` | allocation freed |
| `admission-seed-trailing-inert-bytes-v1` | `true` | `pageCount=1` | document closed; allocation freed |

A normal provider open rejection did not make the runtime attempt itself fail. The observer completed all four records and all required cleanup.

## 8. Exact-version PDFium error-code semantics

Canonical Signthos provenance already binds EmbedPDF `v2.15.0` to exact source commit:

```text
EMBEDPDF_REPOSITORY = https://github.com/embedpdf/embed-pdf-viewer
EMBEDPDF_V2_15_0_SOURCE_COMMIT = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
PDFIUM_SUBMODULE_REVISION = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
```

Fresh read-only inspection of the retained clean tree at that exact EmbedPDF commit produced these evidence identities:

```text
SOURCE_TREE_STATUS = CLEAN
PACKAGES_MODELS_SRC_PDF_TS_SHA256 = ecd70791936abea92bf3f7095b1593e20a38e5470dfe4ec944dc195d470ce806
FPDF_GET_LAST_ERROR_DOC_SHA256 = 30d22b0e7234b0ecc3474d1ca00e4648599abc1771fca5aee0e67c8dbf749a52
PDFIUM_PACKAGE_JSON_SHA256 = c512e1ec42087592cad2fa513b234d5756a27623ca7f001cf12d4af4a7cc0344
```

At exact source commit `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed`, `packages/models/src/pdf.ts` explicitly states that the enum order maps to the PDFium C defines and defines:

```text
WrongFormat = 3  =>  #define FPDF_ERR_FORMAT 3
```

The exact-version `FPDF_GetLastError` documentation in the same retained source tree maps:

```text
3 = FPDF_ERR_FORMAT = File not in PDF format or corrupted
```

This evidence is sufficient to interpret the raw integer `3` as the provider's format/corruption rejection. It is not sufficient to distinguish the alternatives “not in PDF format” and “corrupted” for a particular rejected input.

## 9. Qualified provider-neutral semantic mapping

The mapping authorized by `github:issue-comment:5670528912` is intentionally conservative:

```text
openSucceeded = true
  => state = STRUCTURAL_INSPECTION_COMPLETE
  => structuralIdentityResult = PDF_STRUCTURE_ACCEPTED

openSucceeded = false AND FPDF_GetLastError() = 3
  => providerSemantic = FPDF_ERR_FORMAT / File not in PDF format or corrupted
  => state = STRUCTURAL_INSPECTION_INPUT_REJECTED
  => structuralIdentityResult = ABSENT
```

The resulting exact fixture mapping is:

| Fixture | Qualified structural state | Structural identity result | Preserved provider evidence |
| --- | --- | --- | --- |
| `admission-seed-ordinary-minimal-v1` | `STRUCTURAL_INSPECTION_COMPLETE` | `PDF_STRUCTURE_ACCEPTED` | `openSucceeded=true`, `pageCount=1` |
| `admission-seed-declared-pdf-nonpdf-v1` | `STRUCTURAL_INSPECTION_INPUT_REJECTED` | absent | `openSucceeded=false`, `FPDF_ERR_FORMAT(3)` |
| `admission-seed-truncated-pdf-like-v1` | `STRUCTURAL_INSPECTION_INPUT_REJECTED` | absent | `openSucceeded=false`, `FPDF_ERR_FORMAT(3)` |
| `admission-seed-trailing-inert-bytes-v1` | `STRUCTURAL_INSPECTION_COMPLETE` | `PDF_STRUCTURE_ACCEPTED` | `openSucceeded=true`, `pageCount=1` |

Why the rejected inputs do not become `PDF_STRUCTURE_REJECTED`:

1. canonical 004C1R permits an authoritative `structuralIdentityResult` only with `STRUCTURAL_INSPECTION_COMPLETE`;
2. the exact provider reports a load/input rejection, not a completed structural inspection result;
3. `FPDF_ERR_FORMAT` combines “not in PDF format” and “corrupted”, so the raw provider code does not distinguish top-level non-PDF identity from a malformed/corrupted PDF candidate;
4. preserving `STRUCTURAL_INSPECTION_INPUT_REJECTED` therefore avoids fabricating certainty not supplied by the provider.

## 10. Admission and safety boundaries

This qualification does **not** publish `NOT_PDF` for either rejected fixture. Under 004C1R, `NOT_PDF` is an admission disposition requiring separately qualified policy evidence sufficient to reject PDF identity for the exact bytes.

This qualification also does not independently publish `CONFIRMED_PDF` for the accepted fixtures. It supplies qualified structural evidence for provider-neutral reconciliation; broader admission disposition remains governed by the exact canonical admission policy and implementation.

For the trailing-inert-bytes fixture specifically:

```text
PDFIUM_STRUCTURAL_ACCEPTANCE = PROVEN
NON_POLYGLOT_STATUS = NOT_PROVEN
POLICY_VISIBLE_AMBIGUITY = MUST_REMAIN_AVAILABLE
```

Parser acceptance cannot erase unrelated-format, polyglot, mixed-content, or other policy-visible evidence. No malware, active-content, signature, certificate, or universal-safety claim is derived from structural acceptance.

## 11. Locality and network boundary

The frozen container used Docker network mode `none`. Therefore no successful external connection was available from that network namespace during the attempt and the attempt record reports `externalNetworkSuccessCount=0`.

This qualification intentionally makes no stronger claim that application code made zero networking API attempts. Container stderr was empty and the exact local PDFium WASM bytes were supplied through `wasmBinary`; no external URL was required for the successful execution.

## 12. Evidence finalization

The review-critical evidence is bound by these immutable digests:

| Evidence record | SHA-256 |
| --- | --- |
| observer result | `9652a9882129c7c0adee2c6c4f7ef1b9e6d5dac4199f343369f03c04d6845075` |
| attempt result | `78413ea2af9dd12c58553ad79b84a040acd5e9794622fb4b05bc3d9b5beac31b` |
| supervisor | `2d7323540906796213355b5806389d371c7fdde67005eba8939689d5874e1500` |
| prestart validation | `36e0024dc472ef098b3c5cda5203fc7699e6ba4575acd8147fcc7f22709c09f3` |
| container prestart inspect | `80167fe6544c9f23c07f62c1c77dc5ee2d89169b7e61519723a6fa06f4eb7937` |
| container postrun inspect | `77e597f6b38f6d144f21430f95fc8f2f4efcbd970c5ca566b1a00ac3bb59c230` |
| evidence manifest | `eb1c584da53230b14ebed6ae9c640e2793898126f8fc28c918a6e6b1a7840f37` |
| finalization | `8ba55f0b1090547c420eb3cc24e21087be1dd5c4a5b721d99672ba8bf6350bf1` |
| lock release | `42885c8d8222baa06a32f2bc85e1c761111f52225f0568e162e401be54a98b5a` |

The evidence manifest contains 22 entries. Finalization occurred while the coordination lock was still held. The lock was released only after the runtime closeout was posted to Issue #7.

The external evidence root label is:

`local-pdfium-structural-runtime-20260914T201629Z`

No external evidence bytes are adopted into the repository by this qualification.

## 13. Qualification result

The exact one-shot runtime execution satisfies the frozen structural harness acceptance conditions for this bounded structural-open capability.

```text
FIRST_LOCAL_PDFIUM_STRUCTURAL_RUNTIME_EXECUTION = QUALIFIED_CANDIDATE
PDFIUM_RUNTIME_ATTEMPT = PASS
RUNTIME_ATTEMPT_AUTHORITY = CONSUMED
RUNTIME_RERUN = FORBIDDEN
ORDINARY_MINIMAL_STRUCTURAL_STATE = STRUCTURAL_INSPECTION_COMPLETE
ORDINARY_MINIMAL_STRUCTURAL_RESULT = PDF_STRUCTURE_ACCEPTED
DECLARED_NONPDF_STRUCTURAL_STATE = STRUCTURAL_INSPECTION_INPUT_REJECTED
DECLARED_NONPDF_STRUCTURAL_RESULT = ABSENT
TRUNCATED_PDF_LIKE_STRUCTURAL_STATE = STRUCTURAL_INSPECTION_INPUT_REJECTED
TRUNCATED_PDF_LIKE_STRUCTURAL_RESULT = ABSENT
TRAILING_INERT_STRUCTURAL_STATE = STRUCTURAL_INSPECTION_COMPLETE
TRAILING_INERT_STRUCTURAL_RESULT = PDF_STRUCTURE_ACCEPTED
```

Canonicalization of this candidate still requires independent substantive exact-head review, zero unresolved material review threads, immediate premerge race proof, guarded normal merge with exact expected head, mechanical post-merge verification, and fresh Issue #7 successor reconciliation.

## 14. Explicit non-grants

```text
SECOND_RUNTIME_ATTEMPT = NOT_AUTHORIZED
DOCKER_CONTAINER_CREATE_OR_START = NOT_AUTHORIZED
NODE_EXECUTION = NOT_AUTHORIZED
PDFIUM_INITIALIZATION = NOT_AUTHORIZED
PDFIUM_PROVIDER_RUNTIME_EXECUTION = NOT_AUTHORIZED
PRODUCT_CODE_MUTATION = NOT_AUTHORIZED
FIXTURE_MUTATION = NOT_AUTHORIZED
PACKAGE_WORKSPACE_LOCKFILE_MUTATION = NOT_AUTHORIZED
PROVENANCE_NOTICE_SBOM_MUTATION = NOT_AUTHORIZED
RENDER_EXECUTION = NOT_AUTHORIZED
THUMBNAIL_EXECUTION = NOT_AUTHORIZED
TEXT_EXTRACTION = NOT_AUTHORIZED
SEARCH_EXECUTION = NOT_AUTHORIZED
NOT_PDF_DISPOSITION_FROM_ERROR_3 = NOT_AUTHORIZED
GENERAL_INSPECT_RENDER_SEARCH_RUNTIME = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

No successor authority is inferred from this candidate.
