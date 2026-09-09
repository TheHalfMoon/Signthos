# 004C1AU — APT Snapshot Index Content Transformation Qualification

Status: `QUALIFICATION_CANDIDATE / REPAIRED_TWO_REPLAY_CONTENT_IDENTITY_COMPLETE / NO_APT_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `cf0a034542b79830abc6dfa5e316a09f8e093256`
Canonical base tree: `4bb31c7c9ba1f79df57e18b62cc0e9647e11676a`
Authority: `github:issue-comment:5610091013`
Preserved initial failure: `github:issue-comment:5610111322`
Repair authority: `github:issue-comment:5610111536`
Execution evidence: `github:issue-comment:5610139692`

## 1. Purpose and authority boundary

Canonical 004C1AR requires exact decompressed byte identities before final APT-list placement. Canonical 004C1AS binds the repaired source-discovery descriptor and contract. Canonical 004C1AT binds the exact XZ/liblzma implementation. 004C1AU performs only the separately authorized external reacquisition and content transformation needed to bind the three exact release objects, twelve exact compressed package indexes, and twelve exact uncompressed package-index outputs. It does not create the final APT list root and does not execute APT.

```text
004C1AU_AUTHORITY = EXACT_CANONICAL_SNAPSHOT_INPUT_REACQUISITION_AND_BOUND_XZ_CONTENT_TRANSFORMATION_ONLY
004C1AU_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1au-apt-snapshot-index-content-transformation-qualification.md
004C1AU_MAX_CHANGED_REPOSITORY_FILES = 1
SNAPSHOT = 20260909T180000Z
FINAL_APT_LIST_ROOT_PLACEMENT = NOT_AUTHORIZED / NOT_PERFORMED
FINAL_UID_GID_OWNERSHIP_MATERIALIZATION = NOT_AUTHORIZED / NOT_PERFORMED
WRITABLE_APT_STATE_PREPARATION = NOT_AUTHORIZED / NOT_PERFORMED
APT_GET_APT_CACHE_APT_CONFIG_DPKG_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
PACKAGE_ARCHIVE_DOWNLOAD = NOT_AUTHORIZED / NOT_PERFORMED
PACKAGE_INSTALL_UNPACK_CONFIGURE = NOT_AUTHORIZED / NOT_PERFORMED
PDFIUM_PROVIDER_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Exact predecessor bindings

```text
CANONICAL_MAIN_AT_START = cf0a034542b79830abc6dfa5e316a09f8e093256
CANONICAL_MAIN_TREE_AT_START = 4bb31c7c9ba1f79df57e18b62cc0e9647e11676a
OPEN_PULL_REQUESTS_AT_START = []
PR_142 = CLOSED / UNMERGED / ROUTING_ONLY
SOURCE_DESCRIPTOR_BYTES = 242
SOURCE_DESCRIPTOR_SHA256 = 3fcdd0b5ef962070795738f92f36ea70f8c05a3171ae72e832f46746f7bab199
SOURCE_DISCOVERY_REPAIR_CONTRACT_SHA256 = be5ae85678ffec71afd0fbb8284d882a57245ed576b99c09c88e2fbefd653a79
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
XZ_PATH = /usr/bin/xz
XZ_SHA256 = bf66862cb9945876668da02c1522a57ad1824a4bde7c510df497db7c15cbe2ed
LIBLZMA_TARGET_SHA256 = 493cb401ab4aa3bba611ca464d12996afb3b327940d29476f535f999e167439b
```

## 3. Preserved initial fail-closed attempt and repair

The original Replay A stopped before decompression on the first exact canonical `jammy/main` object because the newly authored 004C1AU contract incorrectly required exactly one XZ stream. The input itself matched canonical byte count and SHA-256, while `xz --robot --list` reported two streams and one block. This failure is preserved and is not promoted into the qualifying replay set.

The forward-only repair in `github:issue-comment:5610111536` recognizes the predecessor requirement precisely: concatenated **unbound** members are forbidden, but every byte inside an exact whole-object size/SHA-256 match is already bound. The repaired contract therefore records stream/block counts and requires robot-reported compressed bytes to equal the exact verified whole-object byte count instead of imposing a one-stream invariant absent from 004C1AR.

```text
INITIAL_REPLAY_A = FAIL_CLOSED_BEFORE_DECOMPRESSION
INITIAL_REPLAY_A_DECOMPRESSION_COUNT = 0
INITIAL_REPLAY_B = NOT_STARTED
REPAIRED_REPLAY_A = FRESH_EXTERNAL_ROOT / PASS
REPAIRED_REPLAY_B = FRESH_INDEPENDENT_REACQUISITION / PASS
```

## 4. Repaired replay controls

Every compressed object was reacquired from the exact canonical snapshot path and checked for exact predecessor byte length and SHA-256 before XZ. Each XZ invocation used the already-local exact selected image with `--pull=never`, `--platform linux/amd64`, `--network none`, read-only rootfs, `--cap-drop ALL`, `no-new-privileges`, PID limit 64, memory limit 512 MiB, CPU limit 2, and only one exact verified input file mounted read-only. No repository mount was present. `xz --robot --list` preceded `xz --decompress --stdout`; decompressed stdout was captured only to fresh external staging.

## 5. Canonical release identities

| Suite | Bytes | SHA-256 |
| --- | ---: | --- |
| `jammy` | 270087 | `c14060cd8c6d625874dfcb9523a35a395bf4865c28b6b6a82569ef326fe92dc6` |
| `jammy-security` | 128927 | `b2eb2336d267611f596e47fe9bad879db22371598047363db841d8f5f586d450` |
| `jammy-updates` | 128049 | `78e5c7e6f16f418c394d2d6caa4d8d10fafa715b08b038c02a8c73cd6dc4587b` |

## 6. Canonical compressed-to-uncompressed transformation identities

| Target | Streams | Blocks | Compressed bytes | Compressed SHA-256 | Uncompressed bytes | Uncompressed SHA-256 |
| --- | ---: | ---: | ---: | --- | ---: | --- |
| `jammy-security/main/binary-amd64/Packages` | 1 | 1 | 3526324 | `6fed35b19b0a467d391330554308eb2bcfc679a13604635f3298dd8ef383e7a4` | 20025980 | `dbd457849762832bbe31a16ebf4bd9589ee199c098dfab9644ff492e93104f91` |
| `jammy-security/multiverse/binary-amd64/Packages` | 1 | 1 | 69092 | `8b79f9054d123125a830170dbaea7c7053572dba1a0f9187313c5229245ae384` | 531283 | `0d2c5a73d67917c70c6aceb3cb8cf6cad539e7b7c9a89a1ff83b48264cf95acf` |
| `jammy-security/restricted/binary-amd64/Packages` | 1 | 1 | 6304508 | `c82967cb499e44f680aa67fd9972db8a396eed44d3733261ccdc8b3dd57a8287` | 36809356 | `8a8b903ffb5de341a37b3bdf202bf519a7ab0d17c4c1ff66eb8c19363f807ae5` |
| `jammy-security/universe/binary-amd64/Packages` | 1 | 1 | 1048048 | `c06fe8a63c3debf947fd2f717d369e9c205f31a0eea25d07e8b92e106ee84757` | 6183008 | `3230ca3f52e3afccff85b059a60019aa4be26342ca8cdfdda04e0e50f5ac7fbc` |
| `jammy-updates/main/binary-amd64/Packages` | 1 | 1 | 3794492 | `fc3ca7fd8c51bfcaef4c60146d82f07771d5c81843def876d3b4296acffad473` | 21442327 | `0009b768364a862e7754f782f3f0dda9730f938f300179c86f17e39ba12ffc0b` |
| `jammy-updates/multiverse/binary-amd64/Packages` | 1 | 1 | 76800 | `eb52bf4941c406f9d9fe486128453060fadb2d0172750cbe84f2896d1ecf4e71` | 568152 | `848df514867b80a7fcbbf0453f7a76eb8e29688b094707e52981c2a7d80722db` |
| `jammy-updates/restricted/binary-amd64/Packages` | 1 | 1 | 6542404 | `a9d99a9e6dd5952ec639e7e28763275c3aa5df18b69f06973cc3c6ab1fac434d` | 38216851 | `68a38a898e28d680b094ef435c212d9664e8441acf01ea652916471f9455b479` |
| `jammy-updates/universe/binary-amd64/Packages` | 1 | 1 | 1282472 | `e63677ef4f3f73a0ac7ac29be177222ddb2bf169ba0fe2bc16448342f71a53db` | 7269024 | `1679f3823d2077dc6e7d72e16494a33b03c2fbba26b806423af3df05c60eed7b` |
| `jammy/main/binary-amd64/Packages` | 2 | 1 | 1394768 | `37cb57f1554cbfa71c5a29ee9ffee18a9a8c1782bb0568e0874b7ff4ce8f9c11` | 6779186 | `12ce0797a6ed39a1fee1321985976c6b78872a8fe4c7ef2fb712f2364c9839a3` |
| `jammy/multiverse/binary-amd64/Packages` | 2 | 1 | 216948 | `e24bf9b5daf5387aa5311f69367b248b1d46d37d72480760f91f5a312c7eb43c` | 918002 | `3493e180d952143ec601e4c833e54de709473bd636b6a3f6bb94e367e56f4abf` |
| `jammy/restricted/binary-amd64/Packages` | 2 | 1 | 129256 | `92102b5d9dfb7804293891528d5e57c3d05949df71af613d4f99fcb7d6a3f488` | 915647 | `b40bcc8340f4a2295e3daa158b7c50001642e843b3559907402c1b0da2d2459b` |
| `jammy/universe/binary-amd64/Packages` | 2 | 1 | 14090084 | `d29cb24c93fec5f43255706bce7eb46d4779952039d8c68ac1bb14a6f3655ce2` | 64332414 | `6b8cc68643d18250ab297c4f6d427a8778b1d1534e1a3033fff0f221fa20a419` |

The four base-suite `jammy` objects are canonical two-stream files; the eight updates/security objects are one-stream files. Every complete compressed file remains bound by its exact predecessor whole-object SHA-256, and robot-reported compressed bytes equal the verified whole-object byte count.

```text
SIGNED_INRELEASE_COUNT_PER_REPLAY = 3
SIGNED_PACKAGES_XZ_COUNT_PER_REPLAY = 12
TOTAL_COMPRESSED_BYTES_PER_REPLAY = 38475196
TOTAL_UNCOMPRESSED_BYTES_PER_REPLAY = 203991230
REPLAY_CANONICAL_FIELDS_EQUAL = PASS
CANONICAL_TRANSFORMATION_INVENTORY_BYTES = 15168
CANONICAL_TRANSFORMATION_INVENTORY_SHA256 = 7ae814d3d293557da0b64f87fdffdca14c5a401a8c0585f22900c61ba0fcf078
```

## 7. Descriptor and source-discovery binding

The exact 004C1AS Deb822 descriptor was reconstructed externally as 242 UTF-8 bytes with one trailing LF and independently matched SHA-256 `3fcdd0b5ef962070795738f92f36ea70f8c05a3171ae72e832f46746f7bab199`. The canonical transformation inventory binds source-discovery repair-contract SHA-256 `be5ae85678ffec71afd0fbb8284d882a57245ed576b99c09c88e2fbefd653a79`. The descriptor was not placed into any APT root.

## 8. Deterministic replay result and accounting

The two repaired replays used distinct fresh input/output/log directories and independently reacquired all 15 snapshot objects. Their canonical evidence fields are equal target-for-target. Replay-local manifest hashes differ only because the replay label is intentionally part of each local manifest; the replay-neutral canonical transformation inventory is the merge-critical aggregate identity.

```text
REPAIRED_REPLAY_A = PASS
REPAIRED_REPLAY_B = PASS
REPLAY_CANONICAL_FIELDS_EQUAL = PASS
FINAL_DOCKER_CONTAINER_COUNT = 14
APT_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_ARCHIVE_DOWNLOAD = 0
PACKAGE_ACTION = 0
FINAL_APT_LIST_ROOT_PLACEMENT = 0
WRITABLE_APT_STATE_PREPARATION = 0
REPOSITORY_EXTERNAL_BYTE_IMPORT = 0
PDFIUM_PROVIDER_EXECUTION = 0
```

## 9. Qualification result

```text
CANONICAL_SNAPSHOT_RELEASE_REACQUISITION = PASS
CANONICAL_PACKAGES_XZ_REACQUISITION = PASS
BOUND_XZ_IMPLEMENTATION_USE = PASS
COMPRESSED_WHOLE_OBJECT_IDENTITY = PASS
UNCOMPRESSED_INDEX_CONTENT_IDENTITY = PASS
TWO_REPLAY_CONTENT_DETERMINISM = PASS
SOURCE_DESCRIPTOR_IDENTITY = PASS
SOURCE_DISCOVERY_CONTRACT_BINDING = PASS
004C1AU_RESULT = PASS_EXACT_SNAPSHOT_INDEX_CONTENT_TRANSFORMATION_ONLY
```

## 10. Successor boundary

004C1AU closes only exact snapshot input and uncompressed index-content identities. It deliberately does not place descriptor, release, or package-index bytes into the final container-visible APT list root and does not establish final mode/uid/gid ownership. A fresh post-merge Issue #7 reconciliation must determine the smallest remaining prerequisite, such as final isolated list-root placement/ownership and writable APT-state preparation, before any solver execution can be considered.

```text
FINAL_APT_LIST_ROOT_PLACEMENT = NOT_AUTHORIZED
FINAL_UID_GID_OWNERSHIP_MATERIALIZATION = NOT_AUTHORIZED
WRITABLE_APT_STATE_PREPARATION = NOT_AUTHORIZED
APT_GET_EXECUTION = NOT_AUTHORIZED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED
PACKAGE_ACTIONS = NOT_AUTHORIZED
IMAGE_PROVISIONING = NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
