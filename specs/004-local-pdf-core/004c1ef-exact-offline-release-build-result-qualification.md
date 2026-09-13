# 004C1EF — Exact Offline Release Build Result Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_EXACT_OFFLINE_RELEASE_BUILD / NO_PROVIDER_ADOPTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `6a4413b421028a2d227efbc5b19a8d54c5304dea`
Canonical base tree: `08b745c1870a79b508d6c9170362f8aa4fd0cbe6`
Runtime closeout and repository authority: `github:issue-comment:5649665268`

## 1. Purpose and authority boundary

Canonical 004C1EA froze the exact execution envelope without running the release build. Subsequent Issue #7 runtime grains consumed bounded attempts, preserved each failure, and repaired only the first proven blocker before the next separately authorized attempt.

004C1EF records the first successful exact offline execution of the retained EmbedPDF release build control against the already-qualified PDFium source topology and builder image. It binds the resulting five vendor artifacts to exact hashes and records the local Emscripten zlib-port materialization required for `-sUSE_ZLIB=1` under `network=none`.

```text
004C1EF_AUTHORITY = DOCUMENTATION_AND_COMPACT_EVIDENCE_ONLY
RUNTIME_REEXECUTION = NOT_AUTHORIZED_BY_THIS_CANDIDATE
UPSTREAM_SOURCE_BYTES_ADDED_TO_REPOSITORY = 0
GENERATED_VENDOR_BINARY_BYTES_ADDED_TO_REPOSITORY = 0
PACKAGE_OR_LOCKFILE_MUTATION = 0
PROVIDER_ADOPTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

This qualification proves one exact offline build result. It does not prove browser/provider behavior, source-to-published-artifact equality, independent rebuild reproducibility, performance, release readiness, deployment readiness, or Specification 004 completion.

## 2. Canonical predecessor truth

```text
004C1EA = CLOSED_CANONICAL
004C1EA_PR = #221
004C1EA_REVIEWED_HEAD = fa08bad51ee996060567b40fe2b7edc67cce9b74
004C1EA_REVIEWED_TREE = 08b745c1870a79b508d6c9170362f8aa4fd0cbe6
004C1EA_MERGE = 6a4413b421028a2d227efbc5b19a8d54c5304dea
004C1EA_MERGE_TREE = 08b745c1870a79b508d6c9170362f8aa4fd0cbe6
004C1EA_MERGE_SIGNATURE = VERIFIED_VALID
POST_MERGE_OPEN_PRS_AT_RUNTIME_CLOSEOUT = 0
```

The exact builder image remained:

```text
sha256:ebc4a9202a97820ac8f8780c8e7b89d51952f5ed512a898c52a8576cd38924b4
OS = linux
ARCHITECTURE = amd64
SIZE_BYTES = 1378457022
```

## 3. Forward-only runtime attempt history

The runtime path did not reinterpret failure as success and did not silently retry.

| Unit | Result | First proven blocker | Successor discipline |
| --- | --- | --- | --- |
| `004C1EB` | fail closed | pinned GN requires `--root=<path>` rather than `--root <path>` | one-token ephemeral build-control repair only |
| `004C1EC` | fail closed | skipped `gclient` branch omitted generated `build/config/gclient_args.gni` | exact 97-byte generated side effect reconstructed only |
| `004C1ED` | fail closed | Emscripten `-sUSE_ZLIB=1` attempted network retrieval of zlib 1.2.13 under `network=none` | no fourth attempt until zlib source was separately qualified |
| `004C1EE` | static qualification pass | exact zlib 1.2.13 archive matched Emscripten's pinned SHA-512 and safe archive structure | exact offline cache payload qualified without executing acquired source |
| `004C1EF` | pass | none | build exited zero and emitted all five required vendor outputs |

Relevant Issue #7 evidence includes:

```text
004C1EB_AUTHORITY = github:issue-comment:5648948400
004C1EC_CLOSEOUT_AND_004C1ED_AUTHORITY = github:issue-comment:5649144256
004C1ED_CLOSEOUT_AND_004C1EE_AUTHORITY = github:issue-comment:5649525428
004C1EE_CLOSEOUT_AND_004C1EF_AUTHORITY = github:issue-comment:5649534495
004C1EF_AUTHORITY_CORRECTION = github:issue-comment:5649535159
004C1EF_PRELAUNCH_FREEZE = github:issue-comment:5649554011
004C1EF_RUNTIME_CLOSEOUT = github:issue-comment:5649665268
```

## 4. Exact successful execution envelope

The successful attempt preserved the canonical execution envelope and isolation boundary:

```text
CONTAINER = 43837bf25060b901f65218ced2417d5a53e59a0113fca910b44f29d022e55c14
BUILDER_IMAGE = sha256:ebc4a9202a97820ac8f8780c8e7b89d51952f5ed512a898c52a8576cd38924b4
NETWORK_MODE = none
HOST_MOUNTS = 0
CONTAINER_EXECS = 0
START_ATTEMPT = 4
STATE = exited
EXIT_CODE = 0
OOM_KILLED = false
STARTED_AT = 2026-09-13T00:03:40.428467256Z
FINISHED_AT = 2026-09-13T00:17:50.355165802Z
BUILD_STARTED_AT = 2026-09-13T00:08:14Z
BUILD_FINISHED_AT = 2026-09-13T00:17:49Z
```

No host path was mounted into the guest and no `docker exec` was used. External monitoring observed zero network I/O while the container was running.

## 5. Exact ephemeral repairs retained from prior failures

The successful attempt used the same two previously proven minimal repairs:

```text
ORIGINAL_BUILD_SH_SHA256 = 91f63a02f4cc79aff4ab3f47ee4203ae8b4ed5be1b8448554d55fe678b752a4e
REPAIRED_BUILD_SH_SHA256 = 10f84069467b7b01df88693f4e5682298dd4739dedf0b277b3847d12cd6556a1
GN_ROOT_SWITCH_REPAIR = --root "$SRC" -> --root="$SRC"
GCLIENT_ARGS_GNI_BYTES = 97
GCLIENT_ARGS_GNI_SHA256 = 7ae4848e11076dd4233d83005fe0ce0ac09ea9017b7bed30cf3febafa1cd5064
```

The `gclient_args.gni` content is the exact generated side effect implied by the pinned PDFium `DEPS` defaults:

```text
# Generated from 'DEPS'
build_with_chromium = false
checkout_android = false
checkout_skia = true
```

These repairs existed only in the ephemeral build workspace. They are not repository source mutations or authority to change the retained upstream release script.

## 6. Offline Emscripten zlib-port qualification

The exact Emscripten port definition requires zlib `1.2.13` and pins this archive SHA-512:

```text
44b834fbfb50cca229209b8dbe1f96b258f19a49f5df23b80970b716371d856a4adf525edb4c6e0e645b180ea949cb90f5365a1d896160f297f56794dd888659
```

004C1EE acquired exactly that archive outside the build container, verified the pinned SHA-512, checked safe archive paths, found one top-level `zlib-1.2.13` root, zero symlinks, and all 15 source files named by the pinned Emscripten port implementation. The resulting cache payload inventory is:

```text
ZLIB_PAYLOAD_REGULAR_FILES = 248
ZLIB_PAYLOAD_REGULAR_BYTES = 4190083
ZLIB_PAYLOAD_INVENTORY_SHA256 = 93d00e611bb988285b8877ff979af96e2ae83d804a0e8b651454e9aea601cb2f
ZLIB_MARKER_SHA256 = 999a41ecee60bc82c2778446233c84f57fc758c901308cf2d839e161158b07d1
```

During 004C1EF, Emscripten accepted the local port source, generated its cache library, and did not emit a `retrieving port:` line:

```text
RETRIEVING_PORT_LINES = 0
TEMPORARY_FAILURE_LINES = 0
LIBZ_SHA256 = b16764a437491089095f9c00ca95b9630315dd999e1cbde523f27045a0656a6a
LIBZ_BYTES = 285614
```

The acquired zlib source and generated `libz.a` are external evidence only; neither is added to this repository candidate.

## 7. Build graph result

The exact release build completed the expected sequence:

1. reconstruct the exact qualified offline topology;
2. apply the one-token GN root-switch repair;
3. reconstruct the exact `gclient_args.gni` generated side effect;
4. materialize the qualified zlib port source into the Emscripten cache;
5. generate the PDFium GN graph;
6. apply the already-qualified WASM build-system patches;
7. build PDFium with Ninja/Emscripten;
8. generate the Clang AST and TypeScript export maps;
9. run `compile.esm.sh` and `compile.sh`;
10. copy exactly five outputs into the ephemeral `src/vendor` sink.

The wrapper result was:

```text
MATERIALIZATION_EXIT = 0
GN_ROOT_SWITCH_REPAIR_EXIT = 0
ZLIB_PAYLOAD_VERIFY_EXIT = 0
ZLIB_CACHE_MATERIALIZATION = PASS
PREBUILD_TOPOLOGY = PASS
BUILD_EXIT = 0
RESULT = PASS_BUILD_SCRIPT_AND_VENDOR_OUTPUTS
```

## 8. Exact output identities

| Output | Bytes | SHA-256 |
| --- | ---: | --- |
| `runtime-methods.ts` | 948 | `95265b81272a7227add74105c1083a6b08ccc0d31bd207df3508a0130251087b` |
| `functions.ts` | 50,754 | `a099440e877ad8ab21fccc914f2d9cdc6e029451e1201b64ec58e631d48d8f50` |
| `pdfium.wasm` | 4,633,788 | `c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8` |
| `pdfium.js` | 279,742 | `ac8f3b5f46b182c67807100632687fd592375f286d90fec41849df8926170d92` |
| `pdfium.cjs` | 279,438 | `3764d21da0fb2cd0b10f595c5bb68b77b8502fd6d0200ed6637da40ec8cfe861` |

The five files copied to `src/vendor` are byte-identical to the corresponding generated build outputs:

```text
GENERATED_VENDOR_EQUALITY = PASS
VENDOR_FILE_COUNT = 5
```

No generated vendor output is committed by this candidate. The table is an evidence binding, not a dependency import.

## 9. External evidence binding

```text
HOST_EVIDENCE_ROOT = /private/tmp/signthos-004c1ef-postexit-armcU8ig
EVIDENCE_MANIFEST_ROWS = 329
EVIDENCE_MANIFEST_SHA256 = 46b8a6e181fd1fd4a94c59a4e2cabc26b7eeedc90dba477a0db2525aec06eb22
```

The external bundle includes post-exit container inspection, sorted Docker diff, build stdout/stderr, materialization evidence, generated-control evidence, zlib cache evidence, final vendor outputs, and their exact hashes. Large/generated/runtime bytes remain outside the repository.

After the runtime closeout was recorded and the evidence was copied and hash-bound, the exact stopped successful container was removed. The qualified builder image remains preserved.

## 10. Claims established

```text
EXACT_OFFLINE_RELEASE_BUILD = PASS_ONCE
NETWORK_MODE = none
SILENT_PORT_DOWNLOAD = NOT_OBSERVED
REQUIRED_VENDOR_OUTPUTS = FIVE_PRESENT
GENERATED_TO_VENDOR_BYTE_EQUALITY = PASS
ZLIB_PORT_SOURCE_IDENTITY = PINNED_AND_QUALIFIED
FAILED_ATTEMPTS = PRESERVED_AND_FORWARD_ONLY
```

This is sufficient to record that the exact retained release build can complete in the qualified offline topology with the explicitly documented minimal repairs and exact zlib port source.

## 11. Explicit non-grants

004C1EF does not establish or authorize:

- equality with any previously published EmbedPDF/PDFium WASM artifact;
- reproducibility across two independent successful rebuilds;
- browser loading, rendering, text extraction, search, or provider contract behavior;
- safe handling of arbitrary/untrusted PDFs;
- resource-limit, cancellation, performance, or corpus conformance claims;
- package/workspace/lockfile mutation;
- import or adoption of the generated five vendor artifacts;
- 004C2 or 004D implementation authority;
- Specification 005 authority;
- release or deployment readiness;
- project completion.

## 12. Merge discipline and successor boundary

This candidate becomes canonical only after exact base/head/tree/path verification, `git diff --check`, truthful workflow/check/provider accounting, fresh independent substantive exact-head review, forward-only repair of every material finding, zero unresolved material review threads, immediate premerge race proof, guarded normal merge using the exact reviewed head, and mechanical post-merge verification.

After canonical merge, Issue #7 must be reread from fresh live truth. No numbering convention may be used to infer 004C2 or any other successor authority. The next bounded unit must be derived from the remaining proven gap between this build result and the provider/capability evidence required by canonical Specification 004.
