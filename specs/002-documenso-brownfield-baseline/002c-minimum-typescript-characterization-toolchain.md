# Specification 002C — Minimum TypeScript Characterization Toolchain Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES / NO_EXECUTION_AUTHORITY`
Issue: #5
Canonical base: `2751d7293e0ac03891c3e4ee360c7af067428bcf`
Pinned upstream: `documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a`

## Purpose

Execute the exact planning-only successor made available by the canonical 002C minimum workspace/dependency closure:

```text
PLANNING_ONLY_002C_MINIMUM_TYPESCRIPT_CHARACTERIZATION_TOOLCHAIN_QUALIFICATION
```

This artifact determines the smallest evidence-supported future TypeScript characterization toolchain for the already selected two-file 002C auth candidate without importing either source file, creating package/config/test bytes, installing dependencies, accessing the npm registry, or executing TypeScript, Zod, WebAuthn, authentication, package-manager, build, provider, database, credential, or runtime behavior.

This is engineering provenance and repository-governance analysis, not legal advice.

## Canonical predecessor and activation evidence

Canonical PR #79 merged the corrected planning-only minimum workspace/dependency closure:

```text
QUALIFIED_HEAD = ba96b7548d305da356569a977fe57e2210e99047
CANONICAL_MAIN = 2751d7293e0ac03891c3e4ee360c7af067428bcf
MERGE_TREE = a134e5f27fc80c5ab2af8a2efacb7c38b11ae11c
QUALIFIED_HEAD_TREE = a134e5f27fc80c5ab2af8a2efacb7c38b11ae11c
TREE_EQUALITY = PASS
MERGE_SIGNATURE = VALID
CI_ACCOUNTING = NO_APPLICABLE_RUN
UNRESOLVED_REVIEW_THREADS = 0
REPOSITORY_RULESETS = NONE
MAIN_BRANCH_PROTECTION = DISABLED
POST_MERGE_EVIDENCE = github:issue-comment:5558874431
```

PR #79 established only planning authority for this exact successor. It did not authorize source import, Stage R, package bytes, dependency acquisition, TypeScript execution, runtime behavior, later 002C implementation, later grains, or a new `S2-T042` task identity.

## Exact selected source evidence

The already qualified future source closure remains exactly:

```text
packages/lib/types/document-auth.ts
packages/lib/types/webauthn.ts
```

Pinned upstream identities:

```text
packages/lib/types/document-auth.ts
blob = e45f578a4c1b1917e9d0a7b25e320436eb691572

packages/lib/types/webauthn.ts
blob = af409ec89e1c94d1b89f2ffe579e9e05afe0c8a7
```

No bytes from either source file are committed by this qualification.

Static inspection of the exact pinned files establishes only these direct requirements:

- both files import the `zod` package;
- `document-auth.ts` imports one local sibling module, `./webauthn`;
- the selected pair uses ordinary TypeScript/JavaScript language constructs and Zod schema/type-inference APIs;
- neither selected file imports React, Vite, Node built-ins, process-environment declarations, browser APIs, DOM APIs, a test runner, a database client, a provider SDK, or an upstream shared package other than `zod`;
- the WebAuthn-shaped file represents JSON-shaped data contracts; its selected source does not itself call the browser WebAuthn API.

These facts support a static TypeScript characterization boundary only. They do not prove runtime behavior, browser compatibility, authentication security, WebAuthn interoperability, or Zod execution semantics.

## Current Signthos package state

At canonical base `2751d7293e0ac03891c3e4ee360c7af067428bcf`:

- no root `package.json` is present;
- no root `package-lock.json` is present;
- no root JavaScript/TypeScript workspace is established;
- no `packages/lib/` destination package is present;
- no Signthos package dependency declaration for `zod` or TypeScript is present;
- canonical root `.npmrc` remains blob `cbc6b6537fba6c69756ad16e69a35cc056791d99` with the already qualified three policy settings;
- source-import authority for the selected 002C files remains absent.

This qualification does not alter any of those facts.

## Pinned upstream TypeScript configuration evidence

Pinned upstream configuration is evidence only and is not approved for copy or adaptation.

### `packages/lib/tsconfig.json`

```text
blob = b7913f6ee7d1075b50a4a2e8d75145b2e9ca42a4
```

It extends the broad shared Documenso React-library configuration and adds process-environment and Vite client type surfaces plus bundler module resolution. Those ambient/browser-oriented dependencies are not statically required by the selected two source files.

### `packages/tsconfig/react-library.json`

```text
blob = cdc684e3d0b80bdcecd5cc10bf117e661d32dfbc
```

It introduces React-library concerns such as JSX preservation and DOM libraries in addition to general TypeScript settings. React, JSX, and DOM ambient types are not required by the selected source pair on current static evidence.

### `packages/tsconfig/base.json`

```text
blob = aaa62ea73c63ce2a501bef3b2e7af323e68a258c
```

Relevant general evidence includes strict checking, ES2018 target, bundler module resolution, and isolated-module/consistency settings. The complete shared config remains broader than the selected two-file characterization need.

Therefore:

```text
002C_UPSTREAM_LIB_TSCONFIG_COPY = REJECTED_AS_MINIMUM
002C_UPSTREAM_REACT_LIBRARY_TSCONFIG_COPY = REJECTED_AS_MINIMUM
002C_UPSTREAM_SHARED_BASE_TSCONFIG_COPY = REJECTED_AS_MINIMUM
002C_REACT_TYPES_REQUIREMENT = NOT_ESTABLISHED
002C_DOM_LIB_REQUIREMENT = NOT_ESTABLISHED
002C_VITE_TYPES_REQUIREMENT = NOT_ESTABLISHED
002C_PROCESS_ENV_TYPES_REQUIREMENT = NOT_ESTABLISHED
```

## TypeScript compiler version evidence

Pinned upstream root package metadata records exact TypeScript `5.6.2` and uses that version across the upstream workspace policy.

Independent compiler metadata for `microsoft/TypeScript@v5.6.2` records:

```text
version = 5.6.2
node engine = >=14.17
license metadata = Apache-2.0
```

The exact compiler version is therefore the narrowest behavior-preserving characterization candidate supported directly by the pinned upstream evidence:

```text
002C_TYPESCRIPT_COMPILER_VERSION_CANDIDATE = 5.6.2_EXACT
002C_TYPESCRIPT_COMPILER_ACQUISITION_AUTHORITY = ABSENT
002C_TYPESCRIPT_EXECUTION_AUTHORITY = ABSENT
```

The compiler's Node engine metadata is compatibility evidence only. It does not establish Signthos product/runtime support and does not select a final Node patch release.

## `zod` dependency evidence

The canonical predecessor selected exact `zod 3.25.76` only as a future reproducibility candidate.

Independent package metadata for `colinhacks/zod@v3.25.76` records:

```text
package = zod
version = 3.25.76
package type = module
license metadata = MIT
type declaration surface = published
ESM and CommonJS entry surfaces = published
```

This supports TypeScript module/type-resolution planning only.

```text
002C_ZOD_CHARACTERIZATION_VERSION_CANDIDATE = 3.25.76_EXACT
002C_ZOD_ACQUISITION_AUTHORITY = ABSENT
002C_ZOD_RUNTIME_EXECUTION_AUTHORITY = ABSENT
```

Zod package metadata does not resolve the independent rights conflict for the selected Documenso source paths.

## Minimum compiler-option semantics

The selected source pair requires a module-aware static checker that can resolve:

- one bare package import: `zod`;
- one extensionless sibling import: `./webauthn`.

Pinned upstream configuration uses `moduleResolution = Bundler`. Current official TypeScript module guidance describes bundler resolution as supporting package `exports` and extensionless relative imports while warning that it must not be treated as proof that emitted JavaScript is valid for every Node.js runtime.

Because this characterization is explicitly static and no-emit, the minimum behavior-preserving candidate is:

```text
compilerOptions.strict = true
compilerOptions.target = ES2018
compilerOptions.module = ESNext
compilerOptions.moduleResolution = Bundler
compilerOptions.noEmit = true
compilerOptions.lib = [ES2018]
compilerOptions.types = []
```

Meaning:

- `strict = true` keeps the characterization fail-closed at the type boundary;
- `target = ES2018` follows the pinned upstream base target without adding a newer language assumption;
- `module = ESNext` supplies the module model paired with the selected upstream bundler-resolution behavior;
- `moduleResolution = Bundler` preserves the pinned source-resolution model for the extensionless sibling import and package resolution;
- `noEmit = true` makes the future lane a static check rather than a JavaScript production path;
- `lib = [ES2018]` intentionally excludes DOM ambient globals from the minimum candidate;
- `types = []` intentionally prevents unrelated globally installed `@types/*` packages from silently satisfying an ambient dependency.

This is a future independently authored configuration design candidate only. This artifact creates no `tsconfig.json` bytes.

The following upstream settings are not established as minimum requirements for the selected pair and remain excluded or deferred:

```text
jsx = NOT_REQUIRED
DOM_LIBS = NOT_REQUIRED
vite/client types = NOT_REQUIRED
process-env types = NOT_REQUIRED
resolveJsonModule = NOT_REQUIRED
React type packages = NOT_REQUIRED
declaration emit = NOT_REQUIRED
source maps = NOT_REQUIRED
watch mode = NOT_REQUIRED
incremental/composite build = NOT_REQUIRED
```

`skipLibCheck` is intentionally not selected by this planning qualification. The upstream shared config enables it, but the selected source pair does not itself prove that dependency declaration checking must be skipped. Its value must be decided by the later executable characterization qualification, based on observed exact-compiler behavior rather than convenience.

Likewise, `isolatedModules`, `alwaysStrict`, `esModuleInterop`, and additional consistency flags may be defensible quality settings, but they are not currently proven necessary to express the minimum static contract. They may be reconsidered only if later exact evidence demonstrates a characterization requirement.

## Minimum file-set semantics

A future static characterization configuration need include only:

```text
selected document-auth source
selected webauthn source
future independently authored compile-time characterization file(s), if separately authorized
```

Broad `**/*.ts`, `**/*.tsx`, or repository-wide includes are not required by the selected two-file scope.

```text
002C_CHARACTERIZATION_FILESET = EXACT_SELECTED_PAIR_PLUS_SEPARATELY_AUTHORIZED_SIGNTHOS_TESTS_ONLY
002C_BROAD_INCLUDE_GLOBS = REJECTED_AS_MINIMUM
```

## Minimum command class

Once and only once source rights, destination bytes, dependency acquisition, compiler acquisition, and execution are separately authorized, the minimum future static command class is equivalent to:

```text
tsc --noEmit -p <future-characterization-config>
```

No npm script, task runner, bundler, Vite process, test runner, dev server, database, browser, provider, credential, or network service is required merely to perform that future static type characterization.

This command is specification text only. It is not executed by this qualification.

```text
002C_STATIC_CHARACTERIZATION_COMMAND_CLASS = TSC_NO_EMIT_PROJECT_CHECK
002C_TEST_RUNNER_REQUIREMENT = NOT_ESTABLISHED
002C_BUNDLER_EXECUTION_REQUIREMENT = NOT_ESTABLISHED
002C_RUNTIME_SERVICE_REQUIREMENT = NONE_ESTABLISHED
```

## Node compatibility result

There are two distinct future tool-runtime concerns and they must not be conflated.

### Compiler-only compatibility

TypeScript `5.6.2` metadata supports Node `>=14.17`.

```text
002C_TSC_5_6_2_NODE_ENGINE_EVIDENCE = >=14.17
```

This is not a selected Signthos runtime floor.

### Package-acquisition compatibility

Pinned upstream package-manager metadata names npm `11.19.1`. Independent `npm/cli@v11.19.1` metadata records:

```text
node engine = ^20.17.0 || >=22.9.0
```

Therefore, if a later independently authorized acquisition lane chooses npm `11.19.1`, its Node runtime must satisfy that npm engine range.

The pinned Documenso root policy separately declares Node `>=24.0.0` and npm `>=11.17.0`, but those are broad upstream workspace constraints. Current evidence does not establish Node `>=24.0.0` as a requirement for static characterization of these two selected files.

```text
002C_UPSTREAM_ROOT_NODE_24_POLICY = EVIDENCE_ONLY
002C_UPSTREAM_ROOT_NPM_ENGINE_POLICY = EVIDENCE_ONLY
002C_FUTURE_NPM_11_19_1_NODE_COMPATIBILITY = ^20.17.0_OR_>=22.9.0
002C_FINAL_NODE_PATCH_PIN = DEFERRED_TO_EXECUTABLE_TOOLCHAIN_QUALIFICATION
```

A later executable qualification must select and prove one exact Node binary/toolchain identity before running package-manager or compiler commands. This planning artifact does not select executable bytes.

## npm and `.npmrc` policy result

Official npm documentation defines per-project `.npmrc` configuration at the root of the npm project, alongside that project's `package.json` and `node_modules`.

The canonical 002C predecessor selected a future standalone `packages/lib` npm project and explicitly did not establish a root npm workspace.

Therefore the existing repository-root `.npmrc` must not be assumed to become the effective project configuration for a future standalone `packages/lib` npm command without separate command/configuration characterization.

```text
002C_ROOT_NPMRC_APPLICABILITY_TO_STANDALONE_PACKAGES_LIB = NOT_ESTABLISHED
002C_PACKAGE_LOCAL_NPMRC_REQUIREMENT = NOT_ESTABLISHED
002C_NPM_CLI_CONFIG_OVERRIDE_REQUIREMENT = NOT_ESTABLISHED
```

A later package-acquisition qualification may evaluate explicit command/environment configuration or a separately authorized package-local policy artifact. This unit grants neither.

## Static characterization cases for a later authorized implementation

A later independently authored characterization suite should prove at least:

1. the exact selected pair type-checks using only the selected local sibling relationship plus the exact admitted `zod` dependency;
2. no React, JSX, DOM, Vite, process-environment, Node ambient, database, or provider type surface is required to satisfy the selected pair;
3. the extensionless `./webauthn` sibling relationship resolves under the selected bundler-resolution model;
4. the exported Zod-inferred type surfaces remain type-resolvable under the exact selected compiler and dependency versions;
5. an undeclared bare import or newly introduced ambient-global dependency fails rather than being satisfied accidentally by broad workspace types;
6. the characterization remains static/no-emit and creates no runtime output;
7. independently authored compile-time assertions, if separately authorized, bind only the observable selected contract and do not copy upstream tests.

These cases are planning requirements only. No test/config/source bytes are created now.

## Security and provenance boundaries

The future toolchain must preserve these fail-closed properties:

- no package installation before dependency/toolchain acquisition authority;
- no registry/network access during this planning unit;
- no lifecycle-script execution by implication;
- no broad ambient type packages that can hide an undeclared dependency;
- no copying of upstream tests or configuration for convenience;
- no generated output mistaken for source or characterization truth;
- no source import before path-specific rights and Stage R authorization;
- no TypeScript PASS claim until exact compiler/dependency/source/config bytes are admitted and actually executed under a later authorization.

## Rights blocker remains unchanged

The public rights evidence for the two selected Documenso source files remains unresolved between repository/community AGPL signals and package-level MIT metadata.

The 002B private Prisma permission artifact does not extend to this 002C source pair.

```text
002C_DOCUMENT_AUTH_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED
002C_WEBAUTHN_COPY_EXACT_RIGHTS_BASIS = NOT_ESTABLISHED
002C_PRIVATE_PERMISSION_INHERITANCE_FROM_002B = PROHIBITED
STAGE_R_ELIGIBLE_IMPORT_ALLOWLIST = EMPTY
SOURCE_IMPORT_AUTHORITY = ABSENT
002C_IMPLEMENTATION_AUTHORITY = ABSENT
```

Toolchain planning cannot bypass this rights gate.

## Result

Current evidence is sufficient to define the minimum future static characterization toolchain candidate without creating executable bytes:

```text
SOURCE_SET = EXACT_SELECTED_TWO_FILES_ONLY
DIRECT_EXTERNAL_DEPENDENCY = zod@3.25.76_CANDIDATE_ONLY
COMPILER = typescript@5.6.2_CANDIDATE_ONLY
TYPECHECK_MODE = STRICT_NO_EMIT
TARGET = ES2018
MODULE = ESNext
MODULE_RESOLUTION = Bundler
AMBIENT_LIB = ES2018_ONLY
GLOBAL_TYPES = NONE
REACT_DOM_VITE_PROCESS_TYPES = NOT_REQUIRED
TEST_RUNNER = NOT_REQUIRED_FOR_STATIC_CHARACTERIZATION
ROOT_WORKSPACE = NOT_REQUIRED
ROOT_NPMRC_APPLICABILITY = NOT_ESTABLISHED
SOURCE_IMPORT = NOT_AUTHORIZED
DEPENDENCY_ACQUISITION = NOT_AUTHORIZED
TOOLCHAIN_ACQUISITION = NOT_AUTHORIZED
TYPESCRIPT_EXECUTION = NOT_AUTHORIZED
STAGE_R = CLOSED
S2_T042 = NOT_CREATED
```

This result does not claim that the candidate config compiles successfully. That claim requires future admitted bytes and actual exact-toolchain execution.

## Successor authority

This qualification intentionally creates no automatic implementation successor.

If this planning result becomes canonical, live repository truth must be re-read before choosing any next 002C unit. Remaining independent gates include at least:

- exact source-path rights resolution for both selected Documenso files;
- separate authorization for any Signthos-authored package/config/characterization bytes;
- separate dependency/toolchain acquisition qualification;
- separate execution authority before `tsc` or npm may run;
- Stage R import authorization before upstream source bytes may enter the repository.

```text
SUCCESSOR_AUTHORITY_AFTER_THIS_QUALIFICATION = UNRESOLVED_PENDING_POSTMERGE_REANALYSIS
```

Do not infer a later 002C unit, source import, dependency acquisition, TypeScript execution, Stage R, 002D–002H work, Specification 003, or a new `S2-T042` identity from this artifact.

## Explicit non-grants

This qualification does not authorize or create:

- upstream source bytes;
- upstream test bytes;
- copied/adapted upstream tsconfig bytes;
- `packages/lib/package.json`;
- `packages/lib/package-lock.json`;
- any `tsconfig.json` or test file;
- dependency or compiler installation;
- npm registry or other package-network access;
- npm install/ci/update execution;
- TypeScript execution;
- Zod runtime execution;
- WebAuthn/browser execution;
- auth behavior execution;
- lifecycle scripts;
- source-import records;
- NOTICE/provenance mutations;
- source-path license selection;
- private-permission expansion;
- Stage R;
- application/runtime implementation;
- database/provider/credential behavior;
- EE access;
- 002D–002H implementation;
- Specification 003;
- `S2-T042`.

## Exact-head qualification requirements

Before this result may become canonical, require on one unchanged exact PR head:

1. final diff remains exactly this one Signthos-authored planning artifact;
2. upstream-derived bytes committed remain `0`;
3. source-import records created/modified remain `0`;
4. no package manifest, lockfile, `.npmrc`, TypeScript config, test, source, NOTICE, provenance schema/tool, workflow, runtime, or product surface changes;
5. no npm/package-network/compiler/runtime execution evidence is claimed;
6. exact-head workflow/check accounting is accurate, including `NO_APPLICABLE_RUN` rather than PASS when no workflow applies;
7. neutral, skipped, unavailable, billing-blocked, rate-limited, or summary-only automated results are not counted as substantive PASS;
8. fresh independent substantive review verifies at least:
   - source-pair static requirements;
   - rejection of broad React/DOM/Vite/process/shared-config surfaces;
   - exact TypeScript `5.6.2` evidence boundary;
   - exact Zod `3.25.76` evidence boundary;
   - static compiler-option candidate and no-emit boundary;
   - Node/npm compatibility distinctions;
   - root `.npmrc` non-assumption;
   - continued source-rights blocker;
   - zero execution/import/later-grain authority;
9. all material findings are corrected forward-only and any prior-head review becomes historical after head movement;
10. unresolved material review threads are `0`;
11. live ruleset/branch-protection state is recorded truthfully;
12. merge uses exact `expected_head_sha` protection;
13. post-merge verification proves ordered parents, tree equality, signature, exact merged path, accurate check accounting, unresolved-thread count, and then-live governance before any successor-authority decision.

## External evidence references

Planning references used without importing their bytes:

```text
documenso/documenso@2cac63a000e22422bdea449f68b8025e709aa73a
microsoft/TypeScript@v5.6.2
npm/cli@v11.19.1
colinhacks/zod@v3.25.76
https://www.typescriptlang.org/docs/handbook/compiler-options
https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options
https://docs.npmjs.com/files/npmrc/
```

These references provide engineering evidence only and create no dependency, license, execution, or import authority.