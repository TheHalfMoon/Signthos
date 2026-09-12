# 004C1EA — Exact Offline Release Execution-Envelope Preflight Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_STOPPED_CONTAINER_PREFLIGHT / ZERO_TOOL_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `9b0b7b97ef9c12ec27062280fbb2e8dcc78034d1`
Runtime authority: `github:issue-comment:5648665987`
Non-consuming inspect-format correction: `github:issue-comment:5648673138`
Runtime closeout and repository authority: `github:issue-comment:5648709192`

## 1. Purpose and authority boundary

Canonical 004C1DZ proved that the exact combined PDFium workspace and the exact 11-file EmbedPDF release-control closure can be materialized deterministically into the release execution topology. It deliberately did not execute the release script or any build tool.

004C1EA closes the next smaller prerequisite: freeze the exact command-resolution and environment envelope required before a first build attempt can be meaningful. The preflight uses canonical 004C1DZ inventory plus filesystem bytes copied from one fresh **stopped** container created from the exact canonical builder snapshot. The container was never started or exec'd.

```text
004C1EA_AUTHORITY = READ_ONLY_STOPPED_CONTAINER_AND_CANONICAL_EVIDENCE_PREFLIGHT_ONLY
BUILDER_IMAGE = sha256:ebc4a9202a97820ac8f8780c8e7b89d51952f5ed512a898c52a8576cd38924b4
CONTAINER_STARTS = 0
CONTAINER_EXECS = 0
NETWORK_MODE = none
HOST_MOUNTS = 0
BUILD_OR_TOOL_EXECUTION = 0
WAIVER = NO
```

This qualification does not prove that any selected executable runs successfully, that GN generates the intended effective graph, that Ninja regenerates after later script mutations, that PDFium builds, or that generated WASM matches any published artifact.

## 2. Canonical predecessor truth

```text
004C1DZ = CLOSED_CANONICAL
004C1DZ_PR = #220
004C1DZ_REVIEWED_HEAD = ab1592d1e887275c1bd7c76a2b3bd2d56802a667
004C1DZ_REVIEWED_TREE = 7580c8e7063074f5167a58ec5d47cc56afca2dda
004C1DZ_REVIEW = github:issue-comment:5648606788 / NO_MATERIAL_FINDINGS
004C1DZ_MERGE = 9b0b7b97ef9c12ec27062280fbb2e8dcc78034d1
004C1DZ_MERGE_TREE = 7580c8e7063074f5167a58ec5d47cc56afca2dda
004C1DZ_MERGE_SIGNATURE = VERIFIED_VALID
POST_MERGE_WORKFLOW_RUNS = 0
POST_MERGE_OPEN_PR_FRONTIER = 0
```

## 3. Why a separate execution-envelope gate is required

The exact release script invokes `gn`, `ninja`, `clang`, `node`, and `em++` by bare command name. The canonical builder snapshot's image PATH is:

```text
/emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

The exact qualified GN, Ninja, and PDFium Clang binaries are inside the canonical PDFium workspace and are **not** in that image PATH. Allowing the script to execute with the inherited PATH would therefore fail to bind those bare names to the already-qualified artifacts.

The inherited PATH also places `/emsdk` before the exact Node bin directory. `/emsdk/node` is a directory, so leaving `/emsdk` in the future bare-name search is unnecessary ambiguity. 004C1EA removes `/emsdk` from PATH while preserving `EMSDK=/emsdk` as an explicit environment variable.

## 4. Stopped-container inspection record

One fresh container was created with `NetworkMode=none`, no mounts, and an inert command. A host-side Docker Go-template lookup for absent `.Config.User` stopped the first inspection command before any filesystem-copy probe. Issue #7 comment `5648673138` records that non-consuming formatting correction. The same container was then inspected through raw JSON and `docker cp` only.

```text
INSPECTION_CONTAINER = 4da6053f276776b2712ddf71966c3b4d96e0c0da52fbd176cf668093cb1962a5
STATE_BEFORE_REMOVAL = created / stopped
STARTED_AT = 0001-01-01T00:00:00Z
NETWORK_MODE = none
MOUNTS = 0
ENTRYPOINT = /bin/sh
INERT_ARGS = ["-c", "exit 97"]
STARTS_CONSUMED = 0
EXECS_CONSUMED = 0
```

After copied evidence was independently hash-verified, only this fresh stopped inspection container was removed. The canonical builder image remains present.

## 5. Exact workspace build-tool identities

Canonical 004C1DZ topology inventory binds the build tools that must win bare-name resolution during a future execution:

| Command | Exact path | Mode | SHA-256 |
| --- | --- | --- | --- |
| `gn` | `/workspace/packages/pdfium/pdfium-src/buildtools/linux64/gn` | `0555` | `f1a4546385818b08c8c792ce5cb5c46bfd5f46d663e8b2734c7307c4a5c6da7e` |
| `ninja` | `/workspace/packages/pdfium/pdfium-src/third_party/ninja/ninja` | `0555` | `09f0e5a8a2cf762b24b4d3ed464ffb2529e650d2efc36bab31da36aa93791efc` |
| `clang` | `/workspace/packages/pdfium/pdfium-src/third_party/llvm-build/Release+Asserts/bin/clang` | `0755` | `841fd88c234ac9e4dd346c99ba21137a8cd62f0d0e243b8b6a29cc84cbe2784a` |

The adjacent `clang++` is a symlink to `clang`; no alternate Clang identity is selected here.

## 6. Exact image-resident runtime identities

Stopped-container byte copies establish:

| Surface | Exact path | SHA-256 |
| --- | --- | --- |
| Bash | `/bin/bash` | `59474588a312b6b6e73e5a42a59bf71e62b55416b6c9d5e4a6e1c630c2a9ecd4` |
| Node 20.18.0 | `/emsdk/node/20.18.0_64bit/bin/node` | `94ea6cc6b866ec29a0f5924eb636783f814e0ef0e5925a1d3ccb5f55b91ac633` |
| `em++` shell entry | `/emsdk/upstream/emscripten/em++` | `b0c9551f9155fa9c028efa24591acdfd30f02f32fb247cf9266f5f0f2ede7589` |
| `em++.py` | `/emsdk/upstream/emscripten/em++.py` | `017f735c953318fdaaa4af68c8d4bf13936a787ddbd5dad804d532b0223b6c2f` |
| `emcc.py` | `/emsdk/upstream/emscripten/emcc.py` | `b8dd8bb2fa242301c894072ae91fa7c721bde080b8f2df8a39f44ad6cfaec2db` |
| Python 3.10 | `/usr/bin/python3.10` | `b94e9b56bc1f96b18d36a0f1d14308575bb7b5960eda94ae0520f0376e95d12d` |
| Emscripten config | `/emsdk/.emscripten` | `c6ea9c86006871df94395ed3214ebd6dea53064946a3cb0b99002fd75bf2ba1b` |

`/usr/bin/python3` is a symlink to `python3.10`.

The copied Emscripten shell entry proves its interpreter selection order is `$PYTHON`, then `$EMSDK_PYTHON`, then PATH lookup. The future envelope therefore binds both `PYTHON` and `EMSDK_PYTHON` to `/usr/bin/python3` instead of depending on fallback resolution.

The exact Emscripten config binds:

```text
NODE_JS = /emsdk/node/20.18.0_64bit/bin/node
LLVM_ROOT = /emsdk/upstream/bin
BINARYEN_ROOT = /emsdk/upstream
EMSCRIPTEN_ROOT = /emsdk/upstream/emscripten
```

The complete internal Emscripten filesystem remains bound by the exact builder-image identity; 004C1EA does not claim separate hashes for every internally invoked compiler helper.

## 7. Frozen future execution envelope

A later execution unit must use exactly this command/environment envelope unless a fresh Issue #7 repair changes it:

```text
USER = root
ENTRYPOINT = /bin/bash
WORKING_DIRECTORY = /workspace/packages/pdfium
HOME = /tmp/signthos-home
EMSDK = /emsdk
EM_CONFIG = /emsdk/.emscripten
EMSDK_PYTHON = /usr/bin/python3
PYTHON = /usr/bin/python3
PATH = /workspace/packages/pdfium/pdfium-src/buildtools/linux64:/workspace/packages/pdfium/pdfium-src/third_party/ninja:/workspace/packages/pdfium/pdfium-src/third_party/llvm-build/Release+Asserts/bin:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
SCRIPT = /workspace/packages/pdfium/scripts/build.sh
```

The future execution wrapper must create the fresh `HOME` before invoking the release script. The exact upstream script then prepends `$HOME/.cargo/bin`; because the selected HOME starts fresh, that prefix cannot contain a preexisting shadow executable.

## 8. Qualified bare-name resolution

Under the frozen envelope:

```text
gn -> /workspace/packages/pdfium/pdfium-src/buildtools/linux64/gn
ninja -> /workspace/packages/pdfium/pdfium-src/third_party/ninja/ninja
clang -> /workspace/packages/pdfium/pdfium-src/third_party/llvm-build/Release+Asserts/bin/clang
node -> /emsdk/node/20.18.0_64bit/bin/node
em++ -> /emsdk/upstream/emscripten/em++
bash -> /usr/bin/bash
python3 -> /usr/bin/python3 -> python3.10
```

Stopped-image probing found no image-path `gn`, `ninja`, or `clang` candidate in the future path directories. The only original PATH observation requiring correction was the `/emsdk/node` directory candidate, which is removed by omitting `/emsdk` itself from future PATH.

## 9. Exact pre-build topology state

Canonical 004C1DZ evidence establishes:

```text
pdfium-src/third_party/llvm-build = PRESENT_DIRECTORY
pdfium-src/out = ABSENT
pdfium-src/out/wasm = ABSENT
pdfium-src/out/wasm/args.gn = ABSENT
build/wasm = ABSENT
src/vendor = PRESENT_EMPTY_DIRECTORY
```

Therefore the exact release script is expected to skip its `gclient` branch and enter its initial `gn gen` branch on the first qualified build attempt.

The pre-build source patch destinations exist as exact canonical source bytes:

```text
pdfium-src/build/config/BUILDCONFIG.gn
  sha256 = 43717a3579822874c6150c817afad7095daa2e970f5d18db760eab1329b21260
pdfium-src/build/toolchain/wasm/BUILD.gn
  sha256 = 88f7059bd9c04bdd9cdcd47984e7f7851ce47016b22f00e35abe5d44639d1f42
```

The exact release script later replaces them with the already-qualified control inputs:

```text
BUILDCONFIG.gn patch sha256 = 77d0903797dc9c789a7f7d450b2164cb8d3534f920e87ce51d7f00b7326b5b55
wasm/BUILD.gn patch sha256 = 852dfac27421a91363898d7d8afe273fd2c50d0318d1019da14e2fc8eba13e9d
```

Those mutations are expected only inside a future ephemeral build workspace and are not authorization to mutate canonical source or repository state.

## 10. Static `ext_api.h` include-path check

The generated header is expected at:

```text
/workspace/packages/pdfium/build/wasm/all.h
```

Its appended include is:

```text
../build/code/cpp/ext_api.h
```

The file-directory candidate is absent, but the release script passes `-I$SRC`. Resolving the include relative to that exact include root yields:

```text
/workspace/packages/pdfium/pdfium-src/../build/code/cpp/ext_api.h
= /workspace/packages/pdfium/build/code/cpp/ext_api.h
```

That exact file is present and bound by canonical 004C1DY with SHA-256 `41c44c6d32ffaf629b4442aac7818e117eae82f023e1c46b05a702ecc30be345`. The separate `-I$ROOT/build/code/cpp` directory is absent and is not used as the basis for this qualification claim.

## 11. External evidence binding

```text
HOST_EVIDENCE_ROOT = /private/tmp/signthos-004c1ea-preflight-AnJPRHLg
PREFLIGHT_SUMMARY_SHA256 = ccc271d04ed104ea61d715b2109af7049b10e2bde1981aacbdf173ba9504b82d
EXTERNAL_EVIDENCE_MANIFEST_SHA256 = 03c2730040d2b0aa06a6bbe2c9be3892fc3b3ea5684ed131560d42d3939a9503
EXTERNAL_EVIDENCE_FILE_COUNT = 4376
```

The large external evidence count is not a repository payload. It includes a host-side `docker cp` expansion of `/emsdk/node` during a same-name existence probe. No guest process executed, and none of those copied runtime files are committed.

## 12. What 004C1EA establishes

```text
004C1EA_RESULT = PASS_EXECUTION_ENVELOPE_PREFLIGHT_NO_TOOL_EXECUTION
EXACT_EXECUTION_ENVIRONMENT = FROZEN_FOR_FUTURE_AUTHORIZATION
BARE_BUILD_COMMANDS = BOUND_TO_QUALIFIED_ARTIFACTS
GCLIENT_BRANCH_EXPECTATION = SKIPPED
INITIAL_GN_GEN_EXPECTATION = REQUIRED
PREBUILD_OUTPUT_COLLISIONS = NONE_OBSERVED_IN_CANONICAL_TOPOLOGY
INHERITED_SNAPSHOT_CMD_USED = FALSE
```

This closes the execution-envelope ambiguity without consuming a build attempt.

## 13. Explicit non-grants

004C1EA does **not** authorize or establish:

- execution of `scripts/build.sh` or `dev.sh`;
- gclient, hook, or submodule execution;
- GN, Ninja, Siso, reclient, Clang, Node, Emscripten, Rust, or PDFium execution;
- effective GN graph correctness;
- configuration, compilation, linking, test, provider, or PDF runtime success;
- source-to-published-WASM equality;
- 004C2 or 004D authority;
- Specification 005 authority;
- release or deployment readiness;
- project completion.

## 14. Merge discipline

This candidate becomes canonical only after exact base/head/tree/path verification, compact evidence validation, truthful workflow/check/provider accounting, fresh independent substantive exact-head review, forward-only repair of every material finding, zero unresolved material review threads, immediate premerge race proof, guarded normal merge using the exact reviewed head, mechanical post-merge verification, and fresh Issue #7 successor reconciliation.

Bot summaries, automatic skip states, reactions, stale review of a prior head, owner self-review, unavailable checks, or billing/rate-limit output do not satisfy the independent review gate.

## 15. Successor boundary

004C1EA does not authorize build execution. After canonical merge, fresh Issue #7 reconciliation must decide whether the first bounded exact offline release execution attempt is eligible. Any such authority must preserve the frozen envelope, permit only one attempt unless explicitly stated otherwise, preserve failed evidence, and treat the initial-GN / later-WASM-args-and-patches ordering as an observed execution question rather than a presumed success condition.
