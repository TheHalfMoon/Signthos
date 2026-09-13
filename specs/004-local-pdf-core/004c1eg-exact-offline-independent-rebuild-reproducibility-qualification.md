# 004C1EG — Exact Offline Independent Rebuild Reproducibility Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_TWO_EXACT_OFFLINE_REBUILDS / FIVE_OUTPUT_REPRODUCIBILITY`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `aff931412338a6ee9b6e3bf0e6cde3969555633b`
Canonical base tree: `f963de9b21fbd5e5f9aa4532495744ef63940067`
Runtime authority: `github:issue-comment:5649749560`
Prelaunch freeze: `github:issue-comment:5649802458`
Repository authority: `github:issue-comment:5649938113`

## 1. Purpose and authority boundary

Canonical 004C1EF records the first successful exact offline EmbedPDF/PDFium release build and the exact SHA-256/byte-size identity of its five generated vendor outputs. It explicitly did not prove independent rebuild reproducibility.

004C1EG closes that single unresolved identity claim by executing one separately authorized fresh-container replay from the same qualified retained inputs and exact same build-control bytes, then comparing every required output against canonical 004C1EF.

```text
004C1EG_AUTHORITY = DOCUMENTATION_AND_COMPACT_EVIDENCE_ONLY
RUNTIME_REEXECUTION_BY_THIS_CANDIDATE = NOT_AUTHORIZED
UPSTREAM_SOURCE_BYTES_ADDED_TO_REPOSITORY = 0
GENERATED_VENDOR_BINARY_BYTES_ADDED_TO_REPOSITORY = 0
PACKAGE_OR_LOCKFILE_MUTATION = 0
ARTIFACT_ADOPTION = NOT_AUTHORIZED
PROVIDER_BROWSER_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
PROJECT_COMPLETE = FALSE
```

This qualification proves reproducibility only for the exact frozen source/control/input topology and exact builder image represented by the two successful executions. It does not prove equality with a published package/runtime artifact, functional browser/provider behavior, PDF correctness, security, performance, release readiness, deployment readiness, or Specification 004 completion.

## 2. Canonical predecessor

```text
004C1EF = CLOSED_CANONICAL
004C1EF_PR = #222
004C1EF_REVIEWED_HEAD = 15333735281c31ec5208507a8c25bd12b7198b27
004C1EF_MERGE = aff931412338a6ee9b6e3bf0e6cde3969555633b
004C1EF_MERGE_TREE = f963de9b21fbd5e5f9aa4532495744ef63940067
004C1EF_MERGE_SIGNATURE = VERIFIED_VALID
004C1EF_SUCCESSFUL_BUILD_COUNT = 1
```

The first canonical build bound these exact outputs:

| Output | Bytes | SHA-256 |
| --- | ---: | --- |
| `runtime-methods.ts` | 948 | `95265b81272a7227add74105c1083a6b08ccc0d31bd207df3508a0130251087b` |
| `functions.ts` | 50,754 | `a099440e877ad8ab21fccc914f2d9cdc6e029451e1201b64ec58e631d48d8f50` |
| `pdfium.wasm` | 4,633,788 | `c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8` |
| `pdfium.js` | 279,742 | `ac8f3b5f46b182c67807100632687fd592375f286d90fec41849df8926170d92` |
| `pdfium.cjs` | 279,438 | `3764d21da0fb2cd0b10f595c5bb68b77b8502fd6d0200ed6637da40ec8cfe861` |


## 3. Independent replay identity

The separately authorized replay used a fresh never-started container created from the same builder image and populated only from the retained qualified input bytes. Previous generated build outputs and the previous generated Emscripten cache were not reused.

```text
REPLAY_CONTAINER = c84d7613f6167357a7e4f69533b695185741c5ebd0e8bf66cec3d45f36d51619
BUILDER_IMAGE = sha256:ebc4a9202a97820ac8f8780c8e7b89d51952f5ed512a898c52a8576cd38924b4
BUILD_CONTROL_SHA256 = 954c0197dfcdc392ac5db59898af1dcf6c60c4efe99059e9de4497e0d9cff1da
COPY_PLAN_ROWS = 58
COPY_LOG_ROWS = 58
COPY_PLAN_SHA256 = a38534f14a2b3eeb619f13dfd8aeea801fe0e25e5ec5414c4c12dc335e847d31
COPY_LOG_SHA256 = a38534f14a2b3eeb619f13dfd8aeea801fe0e25e5ec5414c4c12dc335e847d31
PREVIOUS_BUILD_OUTPUT_REUSE = PROHIBITED
PREVIOUS_GENERATED_EMSCRIPTEN_CACHE_REUSE = PROHIBITED
QUALIFIED_INPUT_BYTE_REUSE = ALLOWED
```

The retained wrapper intentionally self-labels as 004C1EF because its bytes were reused unchanged. External authority and evidence identify this execution as 004C1EG replay 2.

## 4. Replay execution result

```text
NETWORK_MODE = none
HOST_MOUNTS = 0
CONTAINER_EXECS = 0
CONTAINER_EXIT = 0
OOM_KILLED = false
STARTED_AT = 2026-09-13T00:56:26.433285423Z
FINISHED_AT = 2026-09-13T01:16:52.565772754Z
BUILD_STARTED_AT = 2026-09-13T01:02:46Z
BUILD_FINISHED_AT = 2026-09-13T01:16:52Z
RETRIEVING_PORT_LINES = 0
TEMPORARY_FAILURE_LINES = 0
RESULT = PASS_BUILD_SCRIPT_AND_VENDOR_OUTPUTS
```

The replay reconstructed the offline topology, applied the same already-qualified minimal build-control repairs, materialized the same qualified zlib 1.2.13 port source, rebuilt PDFium and both JS/WASM variants, and emitted all five required outputs without network access.

## 5. Exact reproducibility comparison

| Output | Canonical 004C1EF | Replay 2 | Result |
| --- | --- | --- | --- |
| `runtime-methods.ts` | `95265b81272a7227add74105c1083a6b08ccc0d31bd207df3508a0130251087b` / 948 bytes | `95265b81272a7227add74105c1083a6b08ccc0d31bd207df3508a0130251087b` / 948 bytes | MATCH |
| `functions.ts` | `a099440e877ad8ab21fccc914f2d9cdc6e029451e1201b64ec58e631d48d8f50` / 50,754 bytes | `a099440e877ad8ab21fccc914f2d9cdc6e029451e1201b64ec58e631d48d8f50` / 50,754 bytes | MATCH |
| `pdfium.wasm` | `c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8` / 4,633,788 bytes | `c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8` / 4,633,788 bytes | MATCH |
| `pdfium.js` | `ac8f3b5f46b182c67807100632687fd592375f286d90fec41849df8926170d92` / 279,742 bytes | `ac8f3b5f46b182c67807100632687fd592375f286d90fec41849df8926170d92` / 279,742 bytes | MATCH |
| `pdfium.cjs` | `3764d21da0fb2cd0b10f595c5bb68b77b8502fd6d0200ed6637da40ec8cfe861` / 279,438 bytes | `3764d21da0fb2cd0b10f595c5bb68b77b8502fd6d0200ed6637da40ec8cfe861` / 279,438 bytes | MATCH |


```text
EXACT_OFFLINE_RELEASE_BUILD_SUCCESS_COUNT = 2
INDEPENDENT_FRESH_CONTAINER_REBUILD = PASS
ALL_FIVE_OUTPUT_SHA256_MATCH = TRUE
ALL_FIVE_OUTPUT_BYTE_SIZE_MATCH = TRUE
RESULT = PASS_EXACT_FIVE_OUTPUT_SHA256_AND_SIZE_REPRODUCIBILITY
```

The independently regenerated Emscripten zlib cache library also matched the first successful build:

```text
LIBZ_SHA256 = b16764a437491089095f9c00ca95b9630315dd999e1cbde523f27045a0656a6a
LIBZ_BYTES = 285614
```

## 6. External evidence binding

```text
HOST_EVIDENCE_ROOT = /private/tmp/signthos-004c1eg-rebuild-5phCPVDF/postexit
EVIDENCE_MANIFEST_ROWS = 71
EVIDENCE_MANIFEST_SHA256 = d7c344dd3b5da0c67f71466d2c99a61eab91f18251547ccb24b802a1832b344f
REPRODUCIBILITY_COMPARISON_SHA256 = 2059492129897bff413ac45a674c4d3e64766de8029f9f4207df34b95f0bab91
```

The evidence bundle includes the replay comparison JSON, copied internal execution/materialization evidence, output hashes, generated zlib cache library identity, and host-side launch/prelaunch records. After the stopped replay container was fully copied and hash-bound, that exact container was removed; the evidence and qualified builder image remain retained externally.

## 7. Claims established

004C1EG establishes only the following bounded claims:

```text
TWO_EXACT_OFFLINE_SUCCESSFUL_BUILDS = YES
SECOND_BUILD_USES_FRESH_CONTAINER = YES
SAME_QUALIFIED_INPUT_BYTES = YES
SAME_EXACT_BUILD_CONTROL_BYTES = YES
PREVIOUS_GENERATED_OUTPUT_REUSE = NO
PREVIOUS_GENERATED_EMSCRIPTEN_CACHE_REUSE = NO
FIVE_REQUIRED_OUTPUTS_REPRODUCIBLE_BY_SHA256_AND_SIZE = YES
```

Within this exact frozen environment, the five required release outputs are reproducible across the two successful builds.

## 8. Explicit non-grants

004C1EG does not establish or authorize:

- equality with any npm, GitHub Release, CDN, or otherwise published EmbedPDF/PDFium artifact;
- that the generated five files are the artifacts actually distributed by EmbedPDF v2.15.0;
- import or adoption of the five generated files into Signthos product/runtime source;
- package/workspace/lockfile mutation;
- browser loading, rendering, text extraction, search, editing, worker, or provider contract behavior;
- native PDFium/Rust binding behavior;
- arbitrary/untrusted-PDF safety or sandbox sufficiency;
- fixture/corpus functional correctness;
- resource-limit, cancellation, performance, or preservation claims;
- release or deployment readiness;
- 004C2, 004D, Specification 005, or project completion.

## 9. Merge discipline and successor boundary

This candidate becomes canonical only after exact base/head/tree/path verification, `git diff --check`, truthful workflow/check/provider accounting, fresh independent substantive exact-head review, forward-only repair of every material finding, zero unresolved material review threads, immediate premerge race proof, guarded normal merge using the exact reviewed head, and mechanical post-merge verification.

After canonical merge, Issue #7 must be reread from fresh live truth. The next unit must be derived from the remaining exact-artifact/provider prerequisites in canonical Specification 004. Published-artifact comparison, artifact adoption, provider runtime, 004C2, or any other successor must not be inferred from numbering or from this reproducibility result alone.
