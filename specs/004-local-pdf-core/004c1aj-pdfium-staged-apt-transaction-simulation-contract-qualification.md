# 004C1AJ — PDFium Staged APT Transaction Simulation Contract Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_AND_STATIC_TRANSACTION_CONTRACT_ONLY / ZERO_APT_OR_DOCKER_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `392fd361d7c9b1600dd1680e0b54ee5483eeeeca`
Canonical base tree: `f8d9ff239b7cb19af477e8a25c8f42027a6d2fcc`
Authority source: `github:issue-comment:5608529849`

## 1. Purpose and exact authority

Canonical 004C1AF defines the deterministic PDFium release-builder provisioning contract. Canonical 004C1AG establishes the exact selected Ubuntu/Jammy metadata closure but explicitly does not claim to be APT or a simultaneously installed final filesystem. Canonical 004C1AH binds the Chromium Rodete kernel predicate for the last measured build substrate, with a mandatory recheck before later provisioning. Canonical 004C1AI establishes the exact content-addressed Emscripten base-image filesystem, installed dpkg state, canonical 004C1AG comparison, and embedded selected Node byte identity without executing image content.

The remaining package blocker is now narrower: the exact staged APT install/upgrade/remove transaction has not been established. 004C1AJ closes only the planning/static contract required to make a later solver-simulation evidence run reviewable before any Docker/APT execution is authorized.

```text
004C1AJ_AUTHORITY = PLANNING_AND_STATIC_TRANSACTION_CONTRACT_QUALIFICATION_ONLY
004C1AJ_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1aj-pdfium-staged-apt-transaction-simulation-contract-qualification.md
004C1AJ_MAX_CHANGED_REPOSITORY_FILES = 1
CANONICAL_004C1AF_AG_AH_AI_EVIDENCE_READ = AUTHORIZED
PUBLIC_IMMUTABLE_SOURCE_READ_FOR_ALREADY_BOUND_EXACT_REVISIONS = AUTHORIZED_STATIC_ONLY
EXACT_EMBEDPDF_DOCKER_APT_STAGE_ORDER_RECONCILIATION = AUTHORIZED_STATIC_ONLY
EXACT_CHROMIUM_INSTALL_BUILD_DEPS_SEMANTIC_RECONCILIATION = AUTHORIZED_STATIC_ONLY
SIGNTHOS_AUTHORED_FUTURE_APT_SIMULATION_CONTRACT_DESIGN = AUTHORIZED
DOCKER_IMAGE_PULL = NOT_AUTHORIZED
DOCKER_IMAGE_LOAD = NOT_AUTHORIZED
DOCKER_CONTAINER_EXECUTION = NOT_AUTHORIZED
APT_GET_EXECUTION = NOT_AUTHORIZED
APT_CACHE_EXECUTION = NOT_AUTHORIZED
DPKG_EXECUTION = NOT_AUTHORIZED
PACKAGE_ARCHIVE_ACQUISITION_OUTSIDE_SELECTED_OCI_LAYERS = NOT_AUTHORIZED
PACKAGE_INSTALLATION = NOT_AUTHORIZED
IMAGE_PROVISIONING = NOT_AUTHORIZED
NODE_EXECUTION = NOT_AUTHORIZED
EMSCRIPTEN_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
DEPOT_TOOLS_ACQUISITION_OR_EXECUTION = NOT_AUTHORIZED
GN_NINJA_CLANG_ACQUISITION_OR_EXECUTION = NOT_AUTHORIZED
PDFIUM_SOURCE_SYNC_OR_BUILD_LINK_EXECUTION = NOT_AUTHORIZED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
REPOSITORY_UPSTREAM_BINARY_OR_SOURCE_IMPORT = NOT_AUTHORIZED
PACKAGE_JSON_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
NOTICE_SBOM_PROVENANCE_REPOSITORY_MUTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No package index, `.deb`, image layer, source tree, toolchain, cache, lockfile, generated runtime artifact, or external evidence byte is committed by this grain.

## 2. Canonical predecessor identities

004C1AJ consumes these already-canonical identities without reopening their selection:

```text
SELECTED_BASE_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_BASE_IMAGE_MANIFEST_SHA256 = c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_BASE_IMAGE_CONFIG_SHA256 = 6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
TARGET_PLATFORM = linux/amd64
UBUNTU_SNAPSHOT_ID = 20260909T180000Z
UBUNTU_SNAPSHOT_BASE = https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/
UBUNTU_SUITES = [jammy, jammy-updates, jammy-security]
UBUNTU_COMPONENTS = [main, restricted, universe, multiverse]
004C1AG_ROOT_PACKAGE_SET_SHA256 = 2d3674e9676c03150f515de07a750f772e37925311bf2f11395d0c502616a8e0
004C1AG_RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
004C1AG_RESOLVED_PACKAGE_COUNT = 910
004C1AI_DPKG_STATUS_SHA256 = 49176dcea062ad5a71df28c178ce241a6bcf9a2ec7e1525a1445a143bfd1080b
004C1AI_INSTALLED_PACKAGE_COUNT = 231
004C1AI_INSTALLED_PACKAGES_SHA256 = bdc5c6bbbe47db0313b2281b67e2f152ad75e93ab169bbfccf0b5441444694ba
004C1AI_ROOTFS_INVENTORY_SHA256 = f5362f12e52f0ef7d4fa42bca401be0c3cf99a2bc9962a085fd6b4eb4d6e658d
SELECTED_NODE_PATH = /emsdk/node/20.18.0_64bit/bin/node
SELECTED_NODE_SHA256 = 94ea6cc6b866ec29a0f5924eb636783f814e0ef0e5925a1d3ccb5f55b91ac633
LAST_MEASURED_GUEST_MACHINE = x86_64
LAST_MEASURED_GUEST_LIBC = glibc 2.36
LAST_MEASURED_RODETE_PREDICATE = FALSE
SUBSTRATE_RECHECK_BEFORE_PROVISIONING = REQUIRED
```

The exact already-bound EmbedPDF source inputs are:

```text
EMBEDPDF_SOURCE_COMMIT = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
EMBEDPDF_DOCKERFILE_PATH = packages/pdfium/Dockerfile
EMBEDPDF_DOCKERFILE_BYTES = 3831
EMBEDPDF_DOCKERFILE_SHA256 = c6a7f6a71cd75abee90a1262526240ca811417f9f3bd060d3f429ed7f1d5ef0c
CHROMIUM_BUILD_REVISION = 06d247cb917bb5fac3103b1b7dccb75368a553ce
INSTALL_BUILD_DEPS_PY_SHA256 = 6ba801d9f651af8148a9c2627d666dfe29d01adc81236454ba193b1d773d5566
```

A fresh static reread of the exact immutable EmbedPDF Dockerfile confirmed the same release-reachable APT stage ordering already characterized by canonical 004C1AF/AG. No upstream code was executed or imported.

## 3. Why the 004C1AG closure is not an APT transaction

Canonical 004C1AG intentionally uses a Signthos-authored deterministic metadata resolver. It resolves one metadata closure from signed snapshot records, but it explicitly does not claim to implement APT solver behavior.

Canonical unresolved state after 004C1AI is:

```text
EFFECTIVE_PACKAGE_DOWNLOAD_SET = NOT_ESTABLISHED
EFFECTIVE_INSTALL_UPGRADE_REMOVE_TRANSACTION = NOT_ESTABLISHED
APT_SOLVER_BEHAVIOR = NOT_EXECUTED / NOT_INFERRED
SIMULTANEOUS_INSTALLABLE_SET_CLAIMED = false
```

This distinction matters because the selected deterministic build path contains multiple ordered APT stages and at least one canonical cross-stage relation:

```text
pkgconf Breaks: pkg-config (>= 0.29-1)
```

The selected base image also already contains some requested packages at exact versions, some at older versions, and leaves many requested roots absent. Flattening all 158 combined requested roots into one unordered closure would erase the Dockerfile's actual transaction ordering and could misstate upgrade/removal behavior.

## 4. Canonical release APT stage sequence

The deterministic release-builder contract excludes the moving NodeSource `setup_22.x` path and development-only Rustup/watchexec path. The selected Node runtime comes from the content-addressed Emscripten image. The remaining release-reachable OS-package transactions must therefore be modeled as three ordered stages.

### Stage A — EmbedPDF `emsdk-base` explicit packages

Exact upstream semantic form:

```text
apt-get update
apt-get install -y --no-install-recommends <STAGE_A_ROOTS>
apt-get clean
rm -rf /var/lib/apt/lists/*
```

Canonical root set:

```text
STAGE_A_ROOTS = [
  pkg-config,
  autoconf,
  automake,
  libtool,
  ragel,
  git,
  yasm,
  subversion,
  lsb-release,
  tzdata,
  keyboard-configuration,
  tini
]
STAGE_A_ROOT_COUNT = 12
STAGE_A_RECOMMENDS_POLICY = NO_INSTALL_RECOMMENDS
```

The future simulation starts Stage A from the exact canonical 004C1AI dpkg state, not from an empty Jammy installation and not from host package state.

### Stage B — canonical Chromium build dependencies

The exact selected Chromium `install-build-deps.sh --no-prompt` semantics produce the canonical 004C1AG Jammy/amd64 request set.

```text
STAGE_B_ROOT_SET_IDENTITY = CANONICAL_004C1AG_CHROMIUM_REQUEST_SET
STAGE_B_ROOT_COUNT = 145
STAGE_B_RECOMMENDS_POLICY = DEFAULT_APT_RECOMMENDS
STAGE_B_I386_MULTIARCH = false
STAGE_B_TARGET_ARCHITECTURE = amd64
STAGE_B_RODETE_SPECIAL_CASE = FALSE_ONLY_IF_FRESH_SUBSTRATE_RECHECK_MATCHES_004C1AH
```

The exact 145-root list remains bound by canonical 004C1AG evidence. 004C1AJ does not regenerate or alter it.

### Stage C — EmbedPDF `pdfium-deps` post roots

Exact upstream semantic form:

```text
apt-get update
apt-get install -y --no-install-recommends <STAGE_C_ROOTS>
apt-get clean
rm -rf /var/lib/apt/lists/*
```

Canonical root set:

```text
STAGE_C_ROOTS = [curl, build-essential, pkg-config, rsync]
STAGE_C_ROOT_COUNT = 4
STAGE_C_RECOMMENDS_POLICY = NO_INSTALL_RECOMMENDS
```

`pkg-config` is intentionally repeated and must not be deduplicated across stages before solver behavior is observed.

### Ordered contract

```text
CANONICAL_RELEASE_APT_STAGE_COUNT = 3
APT_STAGE_ORDER = [STAGE_A, STAGE_B, STAGE_C]
COMBINED_UNIQUE_ROOT_IDENTITY_COUNT = 158
FLATTENED_SINGLE_TRANSACTION_MODEL = PROHIBITED
REPEATED_ROOTS_MUST_REMAIN_STAGE_VISIBLE = true
CROSS_STAGE_CONFLICTS_BREAKS_MUST_REMAIN_VISIBLE = true
```

NodeSource `nodejs`, Rustup, `watchexec-cli`, moving `depot_tools/main`, bootstrap-current PDFium, and development watch-loop provisioning are not admitted into this transaction contract.

## 5. Exact future simulation input contract

A future execution grain may simulate one stage only when every input below is bound to exact evidence.

```text
AptSimulationStageInput {
  stageId
  predecessorStageStateSha256
  dpkgStatusSha256
  targetArchitecture
  selectedImageManifestSha256
  selectedImageConfigSha256
  ubuntuSnapshotId
  inReleaseIdentitySet
  packagesIndexIdentitySet
  requestedRootIdentity
  requestedRootsOrdered
  recommendsPolicy
  rodetePredicate
  aptArgvIdentity
  aptConfigurationIdentity
  isolatedListsRoot
  isolatedCacheRoot
  isolatedStateRoot
  networkPolicy
}
```

For Stage A:

```text
predecessorStageStateSha256 = 004C1AI_INSTALLED_PACKAGES_SHA256
DPKG_STATUS_SHA256 = 49176dcea062ad5a71df28c178ce241a6bcf9a2ec7e1525a1445a143bfd1080b
```

For Stage B and Stage C, `predecessorStageStateSha256` must be the canonical virtual installed-state output derived from the immediately preceding successful simulation. Skipping a stage, reordering stages, or silently starting from the original base status is nonqualifying.

The future execution unit must bind the exact `apt-get` executable through the selected content-addressed image and must record the executable path/version/byte identity available to that exact execution before treating any simulation as merge-critical evidence.

## 6. Snapshot-only package universe

A future simulation must use only the exact signed Ubuntu snapshot package universe already qualified by 004C1AG.

```text
ALLOWED_SNAPSHOT = 20260909T180000Z
ALLOWED_SUITES = [jammy, jammy-updates, jammy-security]
ALLOWED_COMPONENTS = [main, restricted, universe, multiverse]
ALLOWED_ARCHITECTURES = [amd64, all]
LIVE_ARCHIVE_UBUNTU_COM = PROHIBITED
LIVE_SECURITY_UBUNTU_COM = PROHIBITED
UNCONSTRAINED_SNAPSHOT = PROHIBITED
HOST_APT_LISTS = PROHIBITED
HOST_APT_CACHE = PROHIBITED
HOST_DPKG_STATUS = PROHIBITED
UNBOUND_MIRROR = PROHIBITED
```

Every package version selected by future simulation must map back to one exact canonical 004C1AG metadata identity and its published filename, size, and SHA-256. A solver-selected package absent from that closure is a failure, not permission to extend the package universe during the run.

## 7. Future zero-network/no-download/no-install envelope

004C1AJ does not execute this envelope. It defines the minimum requirements for a later separately authorized execution grain.

The future run must:

1. use the exact selected linux/amd64 Emscripten image identity and fail if its manifest/config identity changes;
2. perform a fresh substrate/kernel recheck before solver execution and require the exact Chromium Rodete predicate to remain false, or stop before simulation;
3. run with container network disabled and no host or Signthos repository mount;
4. use fresh isolated writable roots outside Signthos for APT lists, cache, state, temp files, logs, and evidence;
5. disable default source-list and source-parts lookup so the simulation cannot consult image-default live repositories;
6. populate the isolated APT package-list universe only from the exact already-qualified snapshot metadata identities;
7. use simulation/print-only APT behavior with package download and package installation/configuration prohibited;
8. prohibit `dpkg --unpack`, `dpkg --configure`, maintainer scripts, triggers, service starts, package post-install actions, and package payload extraction;
9. record exact argv, environment, process exit status, stdout, stderr, relevant created/modified files, and filesystem roots for every attempt;
10. perform two independent fresh simulation replays and require byte-identical canonical transaction outputs for the same stage inputs.

```text
FUTURE_CONTAINER_NETWORK = NONE
FUTURE_HOST_REPOSITORY_MOUNT = NONE
FUTURE_PACKAGE_DOWNLOAD = 0
FUTURE_PACKAGE_INSTALL = 0
FUTURE_PACKAGE_UNPACK = 0
FUTURE_PACKAGE_CONFIGURE = 0
FUTURE_MAINTAINER_SCRIPT_EXECUTION = 0
FUTURE_APT_DEFAULT_LIVE_SOURCE_USE = 0
```

The exact future Docker/Apt command line is not authorized by 004C1AJ. It must be frozen in the execution successor from the then-current exact substrate/image facts before execution.

## 8. Canonical transaction output model

Future solver output must be parsed into a deterministic Signthos-authored representation rather than treated as an opaque log.

```text
AptTransactionRecord {
  stageId
  action
  package
  architecture
  fromVersion
  toVersion
  canonicalPackageMetadataSha256
  filename
  archiveBytes
  archiveSha256
  selectedSuite
  selectedComponent
  reasonClass
}
```

Allowed `action` values are exactly:

```text
INSTALL
UPGRADE
DOWNGRADE
REMOVE
KEEP_BACK
UNCHANGED_REQUESTED_ROOT
```

`DOWNGRADE`, `REMOVE`, or `KEEP_BACK` is never silently accepted merely because APT emitted it. Each occurrence must be surfaced as an explicit candidate finding and reconciled against the deterministic provisioning contract before later package acquisition can be considered.

Canonical output ordering must be deterministic:

```text
sort_key = [stageId, action, package, architecture, fromVersion, toVersion]
encoding = UTF-8 JSON Lines
line_ending = LF
json_key_order = FIXED_BY_SCHEMA
```

The future evidence record must include at minimum:

```text
stage_input_sha256
raw_stdout_sha256
raw_stderr_sha256
canonical_transaction_jsonl_sha256
record_count_by_action
selected_archive_identity_set_sha256
next_virtual_installed_state_sha256
```

Any unparsed package action, unknown version, architecture mismatch, package outside the canonical snapshot universe, or ambiguous mapping to canonical metadata fails closed.

## 9. Virtual installed-state transition contract

A future Signthos-authored transition helper may construct the next stage's solver-only installed-state model from:

- the exact predecessor dpkg status model;
- the exact canonical transaction records emitted by the immediately preceding simulation;
- exact package metadata fields already bound by 004C1AG.

The helper may change only solver-relevant package-state fields needed to present the previous stage's planned result to the next stage. It must preserve deterministic canonical ordering and emit a SHA-256-bound next-state artifact in an external ephemeral evidence root.

It must not claim that package payloads were unpacked, maintainer scripts ran, diversions/alternatives were applied, triggers fired, services changed, filesystem bytes changed, or a real dpkg database was produced.

```text
VIRTUAL_STAGE_STATE = SOLVER_MODEL_ONLY
REAL_PACKAGE_FILESYSTEM_EFFECTS = NOT_EXECUTED / NOT_ESTABLISHED
MAINTAINER_SCRIPT_EFFECTS = NOT_EXECUTED / NOT_ESTABLISHED
DPKG_TRIGGER_EFFECTS = NOT_EXECUTED / NOT_ESTABLISHED
ALTERNATIVES_OR_DIVERSION_EFFECTS = NOT_EXECUTED / NOT_ESTABLISHED
FINAL_PROVISIONED_IMAGE_IDENTITY = NOT_ESTABLISHED
```

If a later stage's APT behavior cannot be simulated faithfully from this constrained virtual state, the execution successor must fail closed and require a different bounded evidence strategy rather than claiming transaction completeness.

## 10. Required future solver-execution identities

Before any APT simulation execution can be canonically authorized, fresh reconciliation must bind at minimum:

```text
CURRENT_MAIN_AND_PREDECESSOR_CANONICALITY = REQUIRED
SELECTED_IMAGE_MANIFEST_AND_CONFIG_RECHECK = REQUIRED
CURRENT_EXECUTION_SUBSTRATE_RECHECK = REQUIRED
RODETE_PREDICATE_RECHECK = REQUIRED
EXACT_APT_EXECUTABLE_PATH_VERSION_BYTE_IDENTITY = REQUIRED
EXACT_APT_CONFIGURATION_AND_ARGV = REQUIRED
EXACT_SNAPSHOT_LIST_MATERIALIZATION_METHOD = REQUIRED
EXACT_INITIAL_DPKG_STATUS_IDENTITY = REQUIRED
EXACT_STAGE_ROOT_IDENTITIES = REQUIRED
ISOLATED_WRITABLE_ROOTS = REQUIRED
NETWORK_NONE_ENFORCEMENT = REQUIRED
NO_HOST_OR_REPOSITORY_MOUNT = REQUIRED
PROCESS_AND_FILESYSTEM_ACCOUNTING = REQUIRED
TWO_REPLAY_DETERMINISM = REQUIRED
```

A changed Docker server/kernel, selected image identity, snapshot identity, package root set, or canonical predecessor invalidates inherited assumptions and requires fresh fail-closed reconciliation.

## 11. Explicit non-claims

004C1AJ establishes no runtime or provisioning result.

```text
APT_SIMULATION_EXECUTED = false
APT_SOLVER_RESULT = NOT_ESTABLISHED
EFFECTIVE_PACKAGE_DOWNLOAD_SET = NOT_ESTABLISHED
EFFECTIVE_INSTALL_UPGRADE_REMOVE_TRANSACTION = NOT_ESTABLISHED
PACKAGE_ARCHIVE_ACQUISITION = 0
PACKAGE_INSTALLATION = 0
IMAGE_PROVISIONING = 0
FINAL_FILESYSTEM_IDENTITY = NOT_ESTABLISHED
DEPOT_TOOLS_ACQUISITION = 0
GN_NINJA_CLANG_ACQUISITION = 0
PDFIUM_SOURCE_SYNC = 0
PDFIUM_BUILD_EXECUTION = 0
PROVIDER_OR_PDF_RUNTIME_EXECUTION = 0
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No future unit may treat this planning contract itself as evidence that packages are installable, mutually compatible, downloadable, installed, or build-ready.

## 12. Candidate acceptance and closeout gates

### Pre-merge eligibility and guarded merge procedure

Gates 1–15 must be established on the exact final head before invoking merge. Gate 16 is enforced atomically by the merge invocation itself. Only gates 1–16 govern whether this candidate may proceed through canonical merge; post-merge gates 17–18 are not pre-merge eligibility conditions.

1. canonical base remains `392fd361d7c9b1600dd1680e0b54ee5483eeeeca` with tree `f8d9ff239b7cb19af477e8a25c8f42027a6d2fcc`;
2. Issue #7 authority remains exactly `github:issue-comment:5608529849` for 004C1AJ;
3. exactly one repository file changes, at the authorized 004C1AJ path;
4. no upstream source/package/image/index/toolchain/runtime byte is committed;
5. the three-stage transaction order and recommends policies remain faithful to canonical 004C1AF/AG and the exact immutable EmbedPDF Dockerfile;
6. NodeSource and development-only Rustup/watchexec paths remain excluded by the deterministic release contract;
7. the contract preserves exact 004C1AI starting installed-state identity and does not flatten stages into one package set;
8. the future simulation envelope is zero-network, no-download, no-install, isolated from host/repository state, and snapshot-only;
9. future virtual-state modeling is explicitly solver-only and does not claim package filesystem or maintainer-script effects;
10. Docker/APT/dpkg/package/toolchain/PDFium/provider execution remains absent;
11. exact-head provider/check accounting is truthful and does not convert skipped/unavailable/neutral/billing output into approval;
12. fresh independent substantive exact-head review covers this document and canonical predecessor evidence;
13. any material finding is repaired forward-only and triggers fresh exact-head review;
14. unresolved material review threads are zero;
15. immediate premerge base/head/race proof passes;
16. the normal merge invocation is guarded with the exact final `expected_head_sha` and must fail closed if the head moved.

### Mandatory post-merge closeout gates

After a successful guarded merge, both post-merge gates below are mandatory before any successor execution authority may be inferred. They do not retroactively determine pre-merge eligibility.

17. mechanical post-merge SHA/tree/parent/signature/surface verification passes;
18. fresh Issue #7 successor reconciliation occurs before any Docker/APT execution, package archive acquisition, installation, provisioning, toolchain/source acquisition, PDFium build/runtime, 004C2, 004D, or Specification 005 authority is inferred.
