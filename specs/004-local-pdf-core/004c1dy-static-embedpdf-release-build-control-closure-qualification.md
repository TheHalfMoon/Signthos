# 004C1DY — Static EmbedPDF Release Build-Control Closure Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_STATIC_EXACT_RELEASE_BUILD_CONTROL_CLOSURE / TWO_BYTE_IDENTICAL_STATIC_REPLAYS`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `a434de53dd802e77da543e16fddf74843f774004`
Runtime authority: `github:issue-comment:5648072408`
External closeout and repository authority: `github:issue-comment:5648115839`

## 1. Purpose and authority boundary

Canonical 004C1DX closed deterministic exact offline assembly of the admitted PDFium root plus its Git, CIPD, and GCS dependency payloads. It did not materialize the exact EmbedPDF release build-control source surface that orchestrates that payload into the targeted WASM build, and it did not authorize configuration or build execution.

004C1DY closes only the static build-control input-closure boundary. It rebinds the exact immutable EmbedPDF `v2.15.0` source commit, statically traverses the exact release orchestrator and its direct source inputs, distinguishes direct inputs from generated outputs and unreferenced patch artifacts, and records the release command ordering without executing any upstream/acquired source or build tool.

```text
004C1DY_AUTHORITY = READ_ONLY_STATIC_IMMUTABLE_SOURCE_QUALIFICATION_ONLY
UPSTREAM_SOURCE_EXECUTION = 0
GCLIENT_EXECUTIONS = 0
GN_EXECUTIONS = 0
NINJA_EXECUTIONS = 0
NODE_EXECUTIONS = 0
CLANG_EXECUTIONS = 0
EMSCRIPTEN_EXECUTIONS = 0
HOOK_EXECUTIONS = 0
SUBMODULE_OPERATIONS = 0
REPOSITORY_MUTATIONS_DURING_STATIC_QUALIFICATION = 0
WAIVER = NO
```

This qualification does not establish build-control execution, effective GN graph closure, build success, source-to-WASM equality, runtime/provider behavior, release readiness, deployment readiness, or project completion.

## 2. Canonical predecessor truth

```text
004C1DX = CLOSED_CANONICAL
004C1DX_PR = #218
004C1DX_REVIEWED_HEAD = 4b4512a8852016bb0dbf1476b476dfcc4f77b348
004C1DX_REVIEWED_TREE = 6bc9990b00edd483f34a57fcda8595a1b1644158
004C1DX_MERGE = a434de53dd802e77da543e16fddf74843f774004
004C1DX_MERGE_TREE = 6bc9990b00edd483f34a57fcda8595a1b1644158
004C1DX_MERGE_PARENTS = d2300b8a99c0e5a7629377acb6948b6f5a9b9110 4b4512a8852016bb0dbf1476b476dfcc4f77b348
004C1DX_MERGE_SIGNATURE = VERIFIED_VALID
004C1DX_FRESH_EXACT_HEAD_REVIEW = github:issue-comment:5647909084 / NO_MATERIAL_FINDING
POST_MERGE_WORKFLOW_RUNS = 0
POST_MERGE_OPEN_PR_FRONTIER = 0
```

## 3. Exact immutable source identity

```text
EMBEDPDF_ORIGIN = https://github.com/embedpdf/embed-pdf-viewer.git
EMBEDPDF_COMMIT = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
EMBEDPDF_TREE = b5a7d56077a2f805b3f6c4e6856ea69652a6a261
EMBEDPDF_STATUS = clean
PACKAGES_PDFIUM_TREE = 17b975bc6d4c1952b271fb93c9120a3af6c07b7e
PACKAGES_PDFIUM_ENTRIES = 43
PACKAGES_PDFIUM_BLOBS = 42
PACKAGES_PDFIUM_GITLINKS = 1
GIT_FSCK = PASS
CORE_HOOKS_PATH = /dev/null
SUBMODULE_RECURSE = false
```

The one `packages/pdfium` gitlink is `packages/pdfium/pdfium-src` at exact commit `cb29e78f2ba00c9298714d5f4a8bf7765f1e802f`, which is already the canonical PDFium source identity used by 004C1DX. No submodule initialization, update, recursion, or execution occurred.

## 4. Exact direct release build-control closure

Static traversal yields exactly 11 direct source inputs totaling 52,747 bytes. Paths and identities are derived from the exact immutable Git tree, not from a moving branch or inferred package release.

| Path | Git mode | Git blob | Bytes | SHA-256 | Role |
| --- | --- | --- | ---: | --- | --- |
| `packages/pdfium/build/code/cpp/ext_api.h` | `100644` | `e20f9a0115d901659e094c230919220fe14c8ddc` | 954 | `41c44c6d32ffaf629b4442aac7818e117eae82f023e1c46b05a702ecc30be345` | wrapper declarations appended to generated AST umbrella header |
| `packages/pdfium/build/code/cpp/filewriter.cpp` | `100644` | `4a8b584cf76da7a9c9119196824e3326184b42a4` | 649 | `4eba74b724bbef983c11946f54ac239aef8276cc62ce9f527f052506e2be0d77` | wrapper C++ source selected by compile scripts glob |
| `packages/pdfium/build/code/cpp/filewriter.h` | `100644` | `95b200d761d021fb1edbb36362083421b4e6b903` | 358 | `36120dc4e17630fac81e200c8652bf8b79394f28e4de43b2b4047ca73d9f8263` | local header transitively included by wrapper C++ sources |
| `packages/pdfium/build/code/cpp/main.cpp` | `100644` | `1686f0e1c5e9ae58f0afd7a07389788536e24187` | 2751 | `6f736a615dd1211d1a8703a3e8da367786389772c9457572e5e2421885c39edc` | wrapper C++ source selected by compile scripts glob |
| `packages/pdfium/build/compile.esm.sh` | `100644` | `97a09eebbc60f90ccc6da331d2c089119a74536d` | 639 | `c7f7551a795ba573ca6e7d229ffbf6f168c9ab4b7c842d6620d1af6fce4795dd` | ESM Emscripten link script invoked by build.sh |
| `packages/pdfium/build/compile.sh` | `100644` | `7c87ce6d72a567afeb8a8872dd6e76994a56a826` | 621 | `7e8ba0a5c50cfe0d859b7cd8613c9e4a0bed4e9508b7907be956e54562fc61fc` | CJS Emscripten link script invoked by build.sh |
| `packages/pdfium/build/generate-functions.mjs` | `100644` | `7c3112c912f4b65b228c4bbe0b9dd7f77b932020` | 4170 | `046c2a7c22c907c8bb221caf5593d305120acea569db0062cef99067505a4e01` | AST-to-export-list/function-map generator invoked by build.sh |
| `packages/pdfium/build/generate-runtime-methods.mjs` | `100644` | `ceda038d474aefd78fbf00083114c0d36dacbfb9` | 5285 | `b32930f1eee7ca498649c6cf1f33c04294f6668a9a681d0d531f3e33ff87f63b` | runtime-method export/type generator invoked by build.sh |
| `packages/pdfium/build/patch/build/config/BUILDCONFIG.gn` | `100644` | `5c9a8f72494f16c3f8d4d850d04d700c4f8f85ca` | 33717 | `77d0903797dc9c789a7f7d450b2164cb8d3534f920e87ce51d7f00b7326b5b55` | wasm target BUILDCONFIG replacement applied by build.sh |
| `packages/pdfium/build/patch/build/toolchain/wasm/BUILD.gn` | `100644` | `7d7c76634009508571eef0df683fc7ddd92bff32` | 438 | `852dfac27421a91363898d7d8afe273fd2c50d0318d1019da14e2fc8eba13e9d` | wasm Emscripten toolchain definition applied by build.sh |
| `packages/pdfium/scripts/build.sh` | `100755` | `cb83eb7a63981df7cf4ae7f4ec7493fd4a8fb09e` | 3165 | `91f63a02f4cc79aff4ab3f47ee4203ae8b4ed5be1b8448554d55fe678b752a4e` | release orchestrator |

```text
DIRECT_BUILD_CONTROL_INPUT_COUNT = 11
DIRECT_BUILD_CONTROL_BYTES = 52747
DIRECT_BUILD_CONTROL_CLOSURE_SHA256 = a1bdcab93bccf0992ff2f04ffa4da1faa080ab978f2390bb7de743001ae24853
```

## 5. Historical canonical hash rebind

Six paths had already been SHA-256-bound by canonical predecessor qualifications. Fresh immutable-source rebind produced `6 / 6` exact matches:

| Path | Canonical SHA-256 | Fresh SHA-256 | Result |
| --- | --- | --- | --- |
| `packages/pdfium/build/compile.esm.sh` | `c7f7551a795ba573ca6e7d229ffbf6f168c9ab4b7c842d6620d1af6fce4795dd` | `c7f7551a795ba573ca6e7d229ffbf6f168c9ab4b7c842d6620d1af6fce4795dd` | `MATCH` |
| `packages/pdfium/build/compile.sh` | `7e8ba0a5c50cfe0d859b7cd8613c9e4a0bed4e9508b7907be956e54562fc61fc` | `7e8ba0a5c50cfe0d859b7cd8613c9e4a0bed4e9508b7907be956e54562fc61fc` | `MATCH` |
| `packages/pdfium/build/generate-functions.mjs` | `046c2a7c22c907c8bb221caf5593d305120acea569db0062cef99067505a4e01` | `046c2a7c22c907c8bb221caf5593d305120acea569db0062cef99067505a4e01` | `MATCH` |
| `packages/pdfium/build/generate-runtime-methods.mjs` | `b32930f1eee7ca498649c6cf1f33c04294f6668a9a681d0d531f3e33ff87f63b` | `b32930f1eee7ca498649c6cf1f33c04294f6668a9a681d0d531f3e33ff87f63b` | `MATCH` |
| `packages/pdfium/build/patch/BUILD.gn` | `7c785a835c626ef22e91b46cc18e1dab4149b5008efd844ac7a08e9faf7ac347` | `7c785a835c626ef22e91b46cc18e1dab4149b5008efd844ac7a08e9faf7ac347` | `MATCH` |
| `packages/pdfium/scripts/build.sh` | `91f63a02f4cc79aff4ab3f47ee4203ae8b4ed5be1b8448554d55fe678b752a4e` | `91f63a02f4cc79aff4ab3f47ee4203ae8b4ed5be1b8448554d55fe678b752a4e` | `MATCH` |

The historical `build/patch/BUILD.gn` binding remains true, but that file is not promoted into the direct release closure merely because it exists in the source tree.

## 6. Unreferenced patch artifacts

Two exact patch artifacts are present under `packages/pdfium/build/patch/**` but no reference to either is present in the exact release `build.sh` or `dev.sh` search used by this static qualification:

| Path | SHA-256 | Static disposition |
| --- | --- | --- |
| `packages/pdfium/build/patch/BUILD.gn` | `7c785a835c626ef22e91b46cc18e1dab4149b5008efd844ac7a08e9faf7ac347` | present patch artifact; no reference from exact release build.sh/dev.sh search |
| `packages/pdfium/build/patch/core/fxge/BUILD.gn` | `4ec22208b8d74d8571aca9fab994bf00d4d19d5c566cdee24502897eca6707b4` | present patch artifact; no reference from exact release build.sh/dev.sh search |

```text
UNREFERENCED_PATCH_ARTIFACT_COUNT = 2
UNREFERENCED_PATCH_CLASSIFICATION_SHA256 = 1dbffced9255d1d4bab67a0efe428603044102bca977143378c9d9a71fc7045d
```

004C1DY does not claim that these files are semantically useless in every historical workflow. It establishes only that the exact current release `build.sh` does not reference them, so later exact release execution must not silently copy/apply them without fresh authority.

## 7. Already-canonical dynamic source inputs

The release orchestrator dynamically enumerates PDFium public headers for AST generation and later consumes the PDFium source/dependency workspace. Those source/dependency bytes are already identity-bound by canonical 004C1DX and are not duplicated into the 11-file control closure.

The exact `build.sh` takes its `gclient` branch only if `$SRC/third_party/llvm-build` is absent. The canonical 004C1DX inventory contains `pdfium/third_party/llvm-build` as a directory. Therefore the current exact materialized workspace satisfies the static skip predicate for the `gclient sync --no-history --shallow --nohooks --deps=builder` branch. This is only a static branch-condition result; no `gclient` execution or equivalence claim is made.

## 8. Release sequencing contract

Exact static source inspection establishes this order:

```text
1. conditional gclient branch
2. initial gn gen if out/wasm/args.gn is absent
3. append target_os="wasm" and target_cpu="wasm" to args.gn
4. copy build/patch/build/config/BUILDCONFIG.gn into the PDFium workspace
5. copy build/patch/build/toolchain/wasm/BUILD.gn into the PDFium workspace
6. ninja -C <out> pdfium -v
7. clang AST generation over PDFium public headers plus ext_api.h
8. Node export generator execution
9. Emscripten ESM/CJS link execution
10. copy generated vendor outputs
```

The ordering creates a material evidence boundary:

```text
INITIAL_GN_GEN_BEFORE_WASM_ARGS_APPEND = TRUE
WASM_ARGS_APPENDED_AFTER_INITIAL_GN_GEN = TRUE
USED_WASM_PATCHES_APPLIED_AFTER_INITIAL_GN_GEN = TRUE
FIRST_GN_GEN_ALONE_IS_EFFECTIVE_RELEASE_GRAPH_EVIDENCE = FALSE
```

004C1DY does not infer GN/Ninja regeneration semantics. A later execution grain must prove the effective release graph from real execution evidence rather than treating the first `gn gen` as sufficient merely because it exits successfully.

## 9. Generated/output-only paths

The static closure distinguishes source inputs from generated or output-only paths, including `out/wasm/args.gn`, `build/wasm/all.h`, `build/wasm/ast.json`, both generated export-list files, both generated TypeScript maps, Emscripten `pdfium.js`/`pdfium.cjs`/`pdfium.wasm`, and the final `src/vendor/**` copies. None of these generated outputs is promoted into an input identity by this qualification.

## 10. Required future tool surface

| Tool | Static role |
| --- | --- |
| `bash` | orchestrator and link-script interpreter |
| `gn` | initial generation; exact script later mutates args.gn after first generation |
| `ninja` | pdfium target build; may trigger GN regeneration, behavior not claimed by static unit |
| `clang` | AST JSON generation over PDFium public headers plus ext_api.h |
| `node` | two export generator scripts |
| `em++` | ESM/CJS final link scripts |
| `emcc` | wasm GN toolchain C compiler |
| `emar` | wasm GN toolchain archiver |
| `emnm` | wasm GN toolchain nm |
| `llvm-readobj` | wasm GN toolchain readelf |

This table is a command-surface discovery result only. It does not prove exact executable identity, availability in the eventual execution topology, invocation success, or effective graph necessity beyond the direct source references shown here.

## 11. Deterministic static replay evidence

The Signthos-authored static analyzer was run twice over the same exact clean immutable checkout. The complete generated evidence sets were byte-identical.

```text
STATIC_REPLAY_EQUIVALENCE = PASS
PDFIUM_SUBTREE_MANIFEST_SHA256 = 631bb33d998ee40db77c981dbf8b4cba51953d507ecfc6a139b7a71da50976bc
DIRECT_BUILD_CONTROL_CLOSURE_SHA256 = a1bdcab93bccf0992ff2f04ffa4da1faa080ab978f2390bb7de743001ae24853
UNREFERENCED_PATCHES_SHA256 = 1dbffced9255d1d4bab67a0efe428603044102bca977143378c9d9a71fc7045d
CANONICAL_HASH_REBIND_SHA256 = 48e354538a31f93470b1611aaf5c36ce7eb0c4fa09b0fbc48e877baa4040b49a
GENERATED_OUTPUT_CLASSIFICATION_SHA256 = f5b30cf524b95e310b9a7d68b1f11397210216c84e369f2d15f2875c29c11fc4
ALREADY_CANONICAL_DYNAMIC_INPUTS_SHA256 = e545f90b3f4767ef6648261774c03d7843b5032e8c5d478bfcf3f3e6c43c1601
REQUIRED_TOOL_SURFACE_SHA256 = 6d8502c33911aaaa3f4a43448b40ee7e7433ade59be31deb019f42d55b13a5b1
QUALIFICATION_SUMMARY_SHA256 = 238778250bcce4774ae69e2dc58946057061bd95996e2b496c788001f50b0cb4
FULL_REPLAY_EVIDENCE_MANIFEST_SHA256 = c39c2465a3534d8928e0d4bd88b7628308589f8d985a119c0679471e2f1b4c38
FULL_REPLAY_EVIDENCE_BYTES = 22665
SECRET_LIKE_FINDINGS = 0
```

External evidence remains outside the Signthos repository at `/private/tmp/signthos-004c1dy-static-build-control-OhDnca`. No acquired EmbedPDF source byte, analyzer, generated evidence file, PDFium workspace, binary, or toolchain payload is committed by this document.

## 12. Qualification result

```text
004C1DY_RESULT = PASS_STATIC_EXACT_RELEASE_BUILD_CONTROL_CLOSURE
DIRECT_BUILD_CONTROL_CLOSURE = 11 / 11 IDENTITY_BOUND
CANONICAL_HISTORICAL_HASH_REBIND = 6 / 6 MATCH
STATIC_REPLAY_EQUIVALENCE = PASS
UPSTREAM_SOURCE_EXECUTION = 0
BUILD_TOOL_EXECUTION = 0
REPOSITORY_SOURCE_OR_PAYLOAD_IMPORT = 0
WAIVER = NO
```

The remaining prerequisite is not source identity discovery. The exact 11 build-control bytes are now identity-bound and retained externally, but the canonical 004C1DX workspace was qualified at `/work/pdfium`, while the exact release orchestrator expects `/workspace/packages/pdfium/pdfium-src` plus sibling `build/**` and `scripts/build.sh`. That execution topology has not yet been materialized or qualified.

## 13. Explicit non-grants

004C1DY does **not** authorize or establish:

- copying the 11 build-control inputs into a build execution workspace;
- executing `build.sh`, `dev.sh`, any Node generator, or any upstream/acquired source;
- `gclient`, hook, or submodule execution;
- GN, Ninja, Clang, Node, Emscripten, Rust, Siso, or reclient execution;
- PDFium configuration, compilation, linking, tests, runtime, or provider execution;
- source-to-acquired-WASM equivalence or reproducibility;
- 004C2 or 004D authority;
- Specification 005 authority;
- release/deployment readiness;
- project completion.

## 14. Merge discipline

This document becomes canonical only after exact final base/head/tree/path verification, truthful workflow/check/provider accounting, fresh independent substantive exact-head review, forward-only repair of every material finding, zero unresolved material review threads, immediate premerge race verification, guarded normal merge using the exact reviewed head, mechanical post-merge proof, and fresh Issue #7 successor reconciliation.

Bot summaries, reactions, automatic skip states, unavailable/billing/quota states, owner self-review, and historical review of another head are not substantive exact-head review evidence.

## 15. Successor boundary

004C1DY does not authorize its successor. After canonical merge, fresh Issue #7 reconciliation must select the smallest remaining prerequisite. Based on current evidence, the likely frontier is exact offline materialization of the canonical 004C1DX PDFium workspace plus the 11 exact build-control inputs into the release-script execution topology, with zero source/tool execution. That candidate is informational only and gains no authority by being named here.
