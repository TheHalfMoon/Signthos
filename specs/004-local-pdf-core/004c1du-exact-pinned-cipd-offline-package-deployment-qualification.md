# 004C1DU — Exact Pinned CIPD Offline Package Deployment Qualification

Status: `QUALIFICATION_CANDIDATE / PASS_EXACT_PINNED_CIPD_OFFLINE_PACKAGE_DEPLOYMENT / TWO_BYTE_IDENTICAL_REPLAYS`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `9d772fb74aea2e1aedf5dfa3f5f934f3586ba823`
Runtime authority: `github:issue-comment:5643948017`

## 1. Purpose and authority boundary

Canonical 004C1DT closed the exact pinned Linux/amd64 CIPD client-body acquisition blocker. It deliberately did not execute that client or establish any local package deployment behavior.

004C1DU proves one narrower fact required before full PDFium workspace materialization: the exact pinned client can deploy the six exact already-acquired CIPD package bodies entirely offline inside the exact previously-qualified Linux/amd64 builder snapshot, with deterministic replayed output identities.

This grain does not claim that `cipd pkg-deploy` is equivalent to a full `gclient` CIPD `ensure` transaction. It establishes only an exact local-package deployment primitive with `copy` install mode.

```text
004C1DU_AUTHORITY = EXACT_PINNED_CIPD_OFFLINE_PACKAGE_DEPLOYMENT_QUALIFICATION_ONLY
ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1du-exact-pinned-cipd-offline-package-deployment-qualification.md
MAX_CHANGED_REPOSITORY_FILES = 1
NETWORK_MODE = none
HOST_MOUNTS = 0
IMAGE_PULL = 0
CIPD_SELF_UPDATE = 0
CIPD_REMOTE_RESOLUTION = 0
PACKAGE_PAYLOAD_EXECUTION = 0
GCS_EXTRACTION = 0
GIT_WORKSPACE_MATERIALIZATION = 0
HOOK_EXECUTION = 0
TOOLCHAIN_EXECUTION = 0
PDFIUM_BUILD_OR_RUNTIME = 0
REPOSITORY_SOURCE_IMPORT = 0
WAIVER = NO
```

## 2. Canonical predecessor truth

```text
004C1DT = CLOSED_CANONICAL
004C1DT_PR = #213
004C1DT_REVIEW = github:issue-comment:5643880945
004C1DT_REVIEWED_HEAD = 0f791a2e80f6cf3f6e59e2f79ab8de33f5a0b2f1
004C1DT_REVIEWED_TREE = cb57e1e7d8440816c28c7d42ed33afcafb1de11a
004C1DT_MERGE = 9d772fb74aea2e1aedf5dfa3f5f934f3586ba823
004C1DT_MERGE_TREE = cb57e1e7d8440816c28c7d42ed33afcafb1de11a
004C1DT_MERGE_SIGNATURE = VERIFIED_VALID
POST_MERGE_WORKFLOW_RUNS = 0
POST_MERGE_OPEN_PR_FRONTIER = 0
```

The exact pinned client inherited from 004C1DT is:

```text
CIPD_PLATFORM = linux-amd64
CIPD_CLIENT_VERSION = git_revision:b1f414539ac10cc67a0250890a38712cc06cf102
CIPD_CLIENT_BYTES = 19754946
CIPD_CLIENT_SHA256 = a4245bbd790e00c43756c1c202c21a3d2b5f0a4fe655fdb4d100029dfe9f223a
```

## 3. Exact qualified Linux builder boundary

004C1DU used only the canonical 004C1DJ local builder snapshot:

```text
BUILDER_IMAGE_ID = sha256:ebc4a9202a97820ac8f8780c8e7b89d51952f5ed512a898c52a8576cd38924b4
BUILDER_PARENT = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
BUILDER_OS = linux
BUILDER_ARCHITECTURE = amd64
BUILDER_SIZE_BYTES = 1378457022
BUILDER_WORKING_DIRECTORY = /src
BUILDER_INHERITED_ENTRYPOINT = ["/bin/sh"]
BUILDER_IMAGE_INSPECT_SHA256 = f2285ca1c3d6e8157b8377e83a3ef7b47c61cfde321ce60b27fb60d80c7612a9
```

Fresh passive reconciliation reproduced the exact image identity and exact inspect SHA-256 before any 004C1DU container start. No image pull, tag, push, commit, or replacement occurred.

Every 004C1DU started container used:

```text
--platform linux/amd64
--network none
--entrypoint /bin/sh
HOST_MOUNTS = 0
```

The inherited historical provisioning command was never allowed to run implicitly.

## 4. Exact six package-body inputs

| Logical root | Package | Instance ID | Body bytes | Body SHA-256 |
| --- | --- | --- | ---: | --- |
| `buildtools/linux64` | `gn/gn/linux-amd64` | `qdyvoyVF792YFWTtJi04a3sw6x7Dffk3mrD7x0Ey0_sC` | 3395003 | `a9dcafa32545efdd981564ed262d386b7b30eb1ec37df9379ab0fbc74132d3fb` |
| `buildtools/reclient` | `infra/rbe/client/linux-amd64` | `ADvz6sQzvQcUUOl6LmYz9_kwRoKMi-QopcOTjGPdF2QC` | 171776820 | `003bf3eac433bd071450e97a2e6633f7f93046828c8be428a5c3938c63dd1764` |
| `third_party/ninja` | `infra/3pp/tools/ninja/linux-amd64` | `Px8cwPaaG8_fZ_tsK8dBmx3YEruNDnmvqb-oo1U7UIIC` | 182403 | `3f1f1cc0f69a1bcfdf67fb6c2bc7419b1dd812bb8d0e79afa9bfa8a3553b5082` |
| `third_party/siso/cipd` | `build/siso/linux-amd64` | `MF0YOMnae3v_65ZGQClhx1E-zz_I_O7jmYzSNpEfhqkC` | 27566530 | `305d1838c9da7b7bffeb9646402961c7513ecf3fc8fceee3998cd236911f86a9` |
| `tools/resultdb` | `infra/tools/result_adapter/linux-amd64` | `v9d06vVBFkAEPeZc_T_Hlp7dru37V52eI1N19xBapo4C` | 12405175 | `bfd774eaf5411640043de65cfd3fc7969eddaeedfb579d9e235375f7105aa68e` |
| `tools/skia_goldctl/linux` | `skia/tools/goldctl/linux-amd64` | `-kBgGbJiTOk-cPfW3Hk9s0VTgDJ_LLFD0GjjiFdxQxMC` | 24230073 | `fa406019b2624ce93e70f7d6dc793db3455380327f2cb143d068e38857714313` |

No tag, ref, package name, instance ID, body, body hash, or logical destination was resolved dynamically by 004C1DU.

## 5. Preserved pre-start discovery failure

The first discovery launcher created a valid network-disabled container but attempted to copy the client to `/inputs/cipd`. The image did not contain `/inputs`, so `docker cp` failed before the container was ever started.

```text
DISCOVERY_V1_RESULT = PRESTART_FAIL_CLOSED
DISCOVERY_V1_CONTAINER_ID = a95f49d03d742978174055cdd1dbb9e2eefbd0f0d8f2803883c4f5fc45c30577
DISCOVERY_V1_STATUS = created
DISCOVERY_V1_STARTED_AT = 0001-01-01T00:00:00Z
DISCOVERY_V1_NETWORK_MODE = none
DISCOVERY_V1_MOUNTS = 0
DISCOVERY_V1_CLIENT_EXECUTIONS = 0
DISCOVERY_V1_RESTARTED = FALSE
FAILURE_CAUSE = docker cp destination /inputs absent
DOCKER_CP_STDERR_SHA256 = e3ae70a5859692abe6e54907d7c9427b8b5253145522526c4f4d7f306c35175b
```

The failed container was not started or reused. The repair changed only the pre-start transport destination to the existing `/tmp` directory and used a fresh container.

## 6. Exact client CLI discovery

The fresh discovery container was:

```text
DISCOVERY_V2_CONTAINER_ID = 06157cc989d34820cfd7b2993214c3bf6abb3948c5948e037f643682b162653a
DISCOVERY_V2_PRE = created / network=none / mounts=0
DISCOVERY_V2_POST = exited / exit=0 / oom=false / network=none / mounts=0
DISCOVERY_V2_CLIENT_INPUT_SHA256 = a4245bbd790e00c43756c1c202c21a3d2b5f0a4fe655fdb4d100029dfe9f223a
```

The only client discovery command was equivalent to:

```text
cipd help pkg-deploy
```

The exact client reported:

```text
Deploys a *.cipd package instance into a site root.
usage: cipd pkg-deploy <package instance file> [options]
-install-mode value
-root string
-json-output path
```

This established an explicitly local package-instance-file primitive. No remote package resolution was required for that command surface.

## 7. Deployment command contract

For each package body, both deployment runs used the exact client and the exact local body with this command shape:

```text
/tmp/cipd pkg-deploy <exact-local-package.cipd> \
  -root <exact-logical-root> \
  -install-mode copy \
  -json-output <local-evidence-json> \
  -log-level info
```

`-install-mode copy` is explicit because the pinned `gclient_scm.py` CIPD ensure contract uses `$OverrideInstallMode copy`.

Before any client invocation, the guest re-hashed and byte-counted all seven inputs: the pinned client plus the six package bodies. All exact identities matched.

No package payload executable was invoked after deployment.

## 8. Deployment Run 1

```text
RUN1_CONTAINER_ID = 10a62d1c9a8cc8103e2c46c001f0bbb116744647b7b9995a73235fa8c30ca07f
RUN1_PRE = created / network=none / mounts=0
RUN1_POST = exited / exit=0 / oom=false / network=none / mounts=0
RUN1_PACKAGES_ATTEMPTED = 6
RUN1_PACKAGES_PASSED = 6
RUN1_INVENTORY_ROWS = 103
RUN1_INVENTORY_SHA256 = 2c826600de5ba31f844c3e76b40357d5e64717921969a1e6724d60f8c34f1cf8
RUN1_GUEST_SCRIPT_SHA256 = 92d706afb0408aac6dbb4c26ec89ada0b7673c1bf50bef65356cd0dab2b8da32
RUN1_GUEST_INPUT_IDENTITIES_SHA256 = 3c320381c8ed14e01b7df18f22a2857cbaaf0a2e85deb4c186a017bd53b71c02
RUN1_VERSION_FILES_SHA256 = d98f81a697d3a791cb77f78e32b70ef1d4383f0f68f134b0c36247226fa8eddd
```

All six client JSON results returned the exact expected package and exact expected instance ID.

The three packages whose manifests require version files produced exact instance-bearing records:

```text
/work/buildtools/linux64/.versions/gn.cipd_version
  package_name = gn/gn/linux-amd64
  instance_id = qdyvoyVF792YFWTtJi04a3sw6x7Dffk3mrD7x0Ey0_sC

/work/third_party/siso/cipd/.versions/siso.cipd_version
  package_name = build/siso/linux-amd64
  instance_id = MF0YOMnae3v_65ZGQClhx1E-zz_I_O7jmYzSNpEfhqkC

/work/tools/resultdb/.versions/result_adapter.cipd_version
  package_name = infra/tools/result_adapter/linux-amd64
  instance_id = v9d06vVBFkAEPeZc_T_Hlp7dru37V52eI1N19xBapo4C
```

The inventory also preserved the client-created `.cipd` state, `_current` instance symlinks, package manifests, modes, payload hashes, and all package files.

## 9. Deployment Run 2 independent replay

Run 2 used a fresh container and an independently empty `/work` tree. It received the same exact local inputs before start and used the same guest script bytes.

```text
RUN2_CONTAINER_ID = fd1d02392ee68c8adc9ec022f5a30328dc082c724a64a098f21293c15334d406
RUN2_PRE = created / network=none / mounts=0
RUN2_POST = exited / exit=0 / oom=false / network=none / mounts=0
RUN2_PACKAGES_ATTEMPTED = 6
RUN2_PACKAGES_PASSED = 6
RUN2_INVENTORY_ROWS = 103
RUN2_INVENTORY_SHA256 = 2c826600de5ba31f844c3e76b40357d5e64717921969a1e6724d60f8c34f1cf8
RUN2_GUEST_SCRIPT_SHA256 = 92d706afb0408aac6dbb4c26ec89ada0b7673c1bf50bef65356cd0dab2b8da32
RUN2_GUEST_INPUT_IDENTITIES_SHA256 = 3c320381c8ed14e01b7df18f22a2857cbaaf0a2e85deb4c186a017bd53b71c02
RUN2_VERSION_FILES_SHA256 = d98f81a697d3a791cb77f78e32b70ef1d4383f0f68f134b0c36247226fa8eddd
```

All six Run 2 JSON results again returned the exact expected package and exact expected instance ID.

```text
RUN1_RUN2_INVENTORY_BYTES_IDENTICAL = TRUE
RUN1_RUN2_INVENTORY_SHA256_IDENTICAL = TRUE
RUN1_RUN2_INPUT_IDENTITY_BYTES_IDENTICAL = TRUE
RUN1_RUN2_VERSION_FILE_BYTES_IDENTICAL = TRUE
```

## 10. Output inventory semantics

The deterministic inventory excludes timestamps and records identity-bearing filesystem properties only:

- relative path;
- type;
- permission mode;
- regular-file byte count and SHA-256;
- symlink target.

The common 103-row inventory SHA-256 is:

```text
2c826600de5ba31f844c3e76b40357d5e64717921969a1e6724d60f8c34f1cf8
```

Representative exact deployed payload identities include:

```text
buildtools/linux64/gn
  mode = 0555
  bytes = 8616104
  sha256 = f1a4546385818b08c8c792ce5cb5c46bfd5f46d663e8b2734c7307c4a5c6da7e

third_party/ninja/ninja
  mode = 0555
  bytes = 416480
  sha256 = 09f0e5a8a2cf762b24b4d3ed464ffb2529e650d2efc36bab31da36aa93791efc

third_party/siso/cipd/siso
  mode = 0555
  bytes = 58814412
  sha256 = 55f667686a08b580eaa2c95145c71c9b267b7ac0dc812291f55ae418b3afc2c7

tools/resultdb/result_adapter
  mode = 0555
  bytes = 25942635
  sha256 = 429a8867bede30b05dd7761b6c605b70ff9967a0d912551838e12e9f1f6fb8f1

tools/skia_goldctl/linux/goldctl
  mode = 0555
  bytes = 55001672
  sha256 = aef831d37048676ccc814fb2efc4cb4d65be0fb77036e086f0993c0ed9495cf8
```

No deployed payload executable was run to obtain these identities.

## 11. Container-write confinement

Passive `docker diff` was captured after execution. The pre-start failed discovery container had zero diff rows. Every later observed changed path was confined to `/tmp` or `/work`.

```text
DISCOVERY_V1_DIFF_ROWS = 0
DISCOVERY_V1_DIFF_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
DISCOVERY_V2_DIFF_ROWS = 2
DISCOVERY_V2_UNEXPECTED_PATHS = 0
RUN1_DIFF_ROWS = 145
RUN1_UNEXPECTED_PATHS = 0
RUN2_DIFF_ROWS = 145
RUN2_UNEXPECTED_PATHS = 0
```

Run 1 and Run 2 raw Docker diff hashes differ because Docker diff ordering is not used as an output identity. The normalized deterministic `/work` inventories are the replay identity and are byte-identical.

## 12. Offline and no-payload-execution proof

All three started containers had `NetworkMode=none` and zero mounts before start and after exit. The failed discovery container never started and also had `NetworkMode=none` and zero mounts.

```text
STARTED_CONTAINERS = 3
STARTED_CONTAINERS_NETWORK_NONE = 3
STARTED_CONTAINERS_ZERO_MOUNTS = 3
STARTED_CONTAINERS_EXIT_ZERO = 3
STARTED_CONTAINERS_OOM_FALSE = 3
IMAGE_PULLS = 0
CLIENT_SELF_UPDATES = 0
REMOTE_PACKAGE_RESOLUTIONS = 0
REMOTE_PACKAGE_DOWNLOADS = 0
PACKAGE_PAYLOAD_EXECUTIONS = 0
```

Network isolation is established by the Docker execution boundary, not by assuming that the client would avoid network if it were available.

## 13. Evidence root and closure

```text
EVIDENCE_ROOT = /private/tmp/signthos-004c1du-cipd-offline-deploy-20260912T054718Z-64783
QUALIFICATION_SUMMARY_SHA256 = 3108c6f380f082983ca81b994fc85bf95e3c87907dbe7001ef8d4c75c4386c12
ATTEMPT_HISTORY_SHA256 = 7584ab1eb1ca942a4337a15f212a407cde83f74349e4dee7cd1c601e8c41b228
CONTAINER_DIFF_SUMMARY_SHA256 = 96bbbf58b103f5eaa95579374c51c0ed3d0d838bc2b686d12866759db913f23a
SELECTED_ARTIFACT_IDENTITIES_SHA256 = 2db4d0d41f1ff29266aa395a9c7f89192b76876a72630dc5fffc0abfa6ffcf9b
EVIDENCE_FILES = 135
EVIDENCE_BYTES = 153697
EVIDENCE_INVENTORY_SHA256 = d6f0953f161a7edf8720fcc4f2ba3ccab2c75acdc8233305087de50d98a13212
EVIDENCE_SUMMARY_SHA256 = 936598fa3ae0e99eff867d4fa480d04dc9a189d1f1bc2b351b22c0c58c7b7920
```

The evidence root preserves container argv/state/inspect/diff records, exact guest script bytes, input identities, per-package JSON/stdout/stderr/exit results, both deterministic inventories, version-file records, the pre-start failure, and closeout summaries.

## 14. Qualification result

```text
EXACT_PINNED_CLIENT_EXECUTION_IN_QUALIFIED_LINUX_BOUNDARY = PASS
LOCAL_PACKAGE_FILE_DEPLOYMENT_PRIMITIVE = ESTABLISHED
SIX_EXACT_PACKAGE_INSTANCE_IDENTITIES = PASS
EXPLICIT_INSTALL_MODE_COPY = PASS
RUN1 = PASS
RUN2 = PASS
DETERMINISTIC_REPLAY = PASS
NETWORK_ISOLATION = PASS
ZERO_HOST_MOUNTS = PASS
ZERO_PACKAGE_PAYLOAD_EXECUTION = PASS
004C1DU_RESULT = PASS
```

004C1DU establishes that the six exact local package bodies can be deployed with the exact pinned client in two fresh, network-disabled Linux/amd64 containers with byte-identical deterministic output inventories.

## 15. Explicit non-claims and non-grants

004C1DU does **not** establish or authorize:

- equivalence of `cipd pkg-deploy` to a complete `gclient` CIPD `ensure` transaction;
- online CIPD service behavior;
- package ref/tag resolution;
- client self-update;
- execution of GN, Ninja, Siso, reclient, result_adapter, goldctl, or any other deployed package payload;
- GCS object extraction or materialization;
- materialization of the 33 admitted Git roots;
- nested FreeType `subprojects/dlg` acquisition;
- hook execution;
- Clang or Rust toolchain execution;
- PDFium GN configuration, compilation, linking, tests, rendering, or runtime;
- repository source import;
- 004C2, 004D, Specification 005, release, deployment, or project completion.

## 16. Successor boundary

After canonical merge, Issue #7 must perform fresh successor reconciliation from the actual remaining dependency materialization frontier.

The currently known remaining raw materialization classes are:

```text
GIT_ROOTS = 33 exact acquired roots
GCS_OBJECTS = 8 exact acquired bodies
CIPD_PACKAGES = 6 exact bodies with offline deployment primitive now qualified
NESTED_FREETYPE_GITLINK = 1 observed / intentionally not acquired
```

A likely next smallest prerequisite is offline GCS materialization using the exact pinned `gclient.py` extraction/direct-output semantics already statically bound by 004C1DS. That is a candidate direction only.

```text
CANDIDATE_SUCCESSOR = EXACT_OFFLINE_GCS_OBJECT_MATERIALIZATION_QUALIFICATION
SUCCESSOR_AUTHORITY = NOT_GRANTED_BY_004C1DU
```

## 17. Merge discipline

This candidate may merge only if:

1. canonical `main` remains `9d772fb74aea2e1aedf5dfa3f5f934f3586ba823` through immediate premerge race proof;
2. exactly one qualification commit and exactly one authorized repository path change;
3. the discovery V1 pre-start failure remains preserved and is not rewritten as success;
4. the exact 004C1DJ image and exact 004C1DT client identities remain bound;
5. both independent deployments and the byte-identical deterministic inventories remain exact;
6. no claim upgrades this local primitive into full `gclient ensure` equivalence;
7. `git diff --check` passes;
8. applicable exact-head checks are accounted truthfully;
9. a fresh independent substantive exact-head review reports no material/actionable finding;
10. any repair is forward-only and any changed head receives a fresh review;
11. unresolved material review threads are zero;
12. guarded normal merge uses the exact reviewed head;
13. post-merge tree, ordered parents, signature, path/blob, workflow state, and open-PR frontier are mechanically verified;
14. fresh Issue #7 successor reconciliation occurs before any GCS/Git workspace materialization, hook/toolchain execution, PDFium build/runtime, 004C2, 004D, or Specification 005 authority is inferred.

No statement in this document claims that a complete PDFium workspace has been materialized, built, tested, or run.
