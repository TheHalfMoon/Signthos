# 004C1AW — APT Container-Visible Input-Root Placement Qualification

Status: `QUALIFIED / TWO_REPLAY_PLACEMENT_PASS / NO_APT_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Authority: `github:issue-comment:5610324830`
Execution evidence: `github:issue-comment:5610392661`
Canonical base: `674cf370e12493a53d946ba7d36547418c3f0a3a`
Canonical base tree: `432bb9a9b4a409400ac9cc59f424477788f41ea3`

## 1. Purpose and boundary

004C1AW closes only the container-visible placement prerequisite left by canonical 004C1AV. It proves that the exact Signthos-authored source descriptor, canonical snapshot release/index bytes, canonical initial dpkg status bytes, directory topology, modes, and ownership can be transported without host/repository mounts and reconstructed in a fresh isolated tmpfs inside the exact selected image.

This grain does **not** execute APT or dpkg, does not perform a solver simulation, and does not authorize package actions, image provisioning, PDFium/provider execution, 004C2, 004D, or Specification 005.

```text
004C1AW_AUTHORITY = CONTAINER_VISIBLE_INPUT_ROOT_PLACEMENT_QUALIFICATION_ONLY
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
IMAGE_CONFIG_DIGEST = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
PLATFORM = linux/amd64
INPUT_TRANSPORT = STDIN_ONLY
HOST_BIND_MOUNTS = 0
REPOSITORY_MOUNTS = 0
WRITABLE_APT_ROOT = tmpfs:/tmp/signthos-apt
APT_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_ACTION = 0
```

## 2. Preflight binding

Immediately before transport construction and Replay A, live repository state was rebound:

```text
CANONICAL_MAIN = 674cf370e12493a53d946ba7d36547418c3f0a3a
CANONICAL_MAIN_TREE = 432bb9a9b4a409400ac9cc59f424477788f41ea3
OPEN_PULL_REQUESTS = []
CONTAINER_COUNT_BEFORE = 14
```

Retained predecessor bytes were accepted only after rechecking against canonical 004C1AU and 004C1AI byte identities. Replay A uses AU Replay A plus AI status Replay A; Replay B independently uses AU Replay B plus AI status Replay B. The 242-byte descriptor is reconstructed independently from canonical 004C1AS for each transport.

## 3. Deterministic normalized USTAR transport

Each archive contains exactly 27 members: 10 directories and 17 regular files. Every member has uid/gid 0, empty uname/gname, mtime 0, the exact 004C1AV mode, deterministic lexicographic path order, and no symlink, hardlink, device, FIFO, or other member type.

```text
TRANSPORT_TAR_A_BYTES = 204769280
TRANSPORT_TAR_B_BYTES = 204769280
TRANSPORT_TAR_A_SHA256 = f7fd9486a7eadcf82fc5e7f66c166c3de757ff5c108a32aab2bf17cccfbd4755
TRANSPORT_TAR_B_SHA256 = f7fd9486a7eadcf82fc5e7f66c166c3de757ff5c108a32aab2bf17cccfbd4755
TRANSPORT_A_EQUALS_B = PASS
USTAR_MEMBER_COUNT = 27
USTAR_DIRECTORY_COUNT = 10
USTAR_REGULAR_FILE_COUNT = 17
USTAR_NONREGULAR_NONDIRECTORY_COUNT = 0
NORMALIZED_MEMBER_METADATA = PASS
```

### Directory inventory

| Path | Mode | UID | GID |
| --- | --- | ---: | ---: |
| `/tmp/signthos-apt` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/cache` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/cache/archives` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/cache/archives/partial` | `0700` | 0 | 0 |
| `/tmp/signthos-apt/etc` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/lists` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/lists/partial` | `0700` | 0 | 0 |
| `/tmp/signthos-apt/log` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/state` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/tmp` | `0700` | 0 | 0 |

### File inventory

| Path | Bytes | SHA-256 | Mode | UID | GID |
| --- | ---: | --- | --- | ---: | ---: |
| `/tmp/signthos-apt/etc/snapshot.sources` | 242 | `3fcdd0b5ef962070795738f92f36ea70f8c05a3171ae72e832f46746f7bab199` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_InRelease` | 128927 | `b2eb2336d267611f596e47fe9bad879db22371598047363db841d8f5f586d450` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_main_binary-amd64_Packages` | 20025980 | `dbd457849762832bbe31a16ebf4bd9589ee199c098dfab9644ff492e93104f91` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_multiverse_binary-amd64_Packages` | 531283 | `0d2c5a73d67917c70c6aceb3cb8cf6cad539e7b7c9a89a1ff83b48264cf95acf` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_restricted_binary-amd64_Packages` | 36809356 | `8a8b903ffb5de341a37b3bdf202bf519a7ab0d17c4c1ff66eb8c19363f807ae5` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_universe_binary-amd64_Packages` | 6183008 | `3230ca3f52e3afccff85b059a60019aa4be26342ca8cdfdda04e0e50f5ac7fbc` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_InRelease` | 128049 | `78e5c7e6f16f418c394d2d6caa4d8d10fafa715b08b038c02a8c73cd6dc4587b` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_main_binary-amd64_Packages` | 21442327 | `0009b768364a862e7754f782f3f0dda9730f938f300179c86f17e39ba12ffc0b` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_multiverse_binary-amd64_Packages` | 568152 | `848df514867b80a7fcbbf0453f7a76eb8e29688b094707e52981c2a7d80722db` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_restricted_binary-amd64_Packages` | 38216851 | `68a38a898e28d680b094ef435c212d9664e8441acf01ea652916471f9455b479` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_universe_binary-amd64_Packages` | 7269024 | `1679f3823d2077dc6e7d72e16494a33b03c2fbba26b806423af3df05c60eed7b` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_InRelease` | 270087 | `c14060cd8c6d625874dfcb9523a35a395bf4865c28b6b6a82569ef326fe92dc6` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_main_binary-amd64_Packages` | 6779186 | `12ce0797a6ed39a1fee1321985976c6b78872a8fe4c7ef2fb712f2364c9839a3` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_multiverse_binary-amd64_Packages` | 918002 | `3493e180d952143ec601e4c833e54de709473bd636b6a3f6bb94e367e56f4abf` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_restricted_binary-amd64_Packages` | 915647 | `b40bcc8340f4a2295e3daa158b7c50001642e843b3559907402c1b0da2d2459b` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_universe_binary-amd64_Packages` | 64332414 | `6b8cc68643d18250ab297c4f6d427a8778b1d1534e1a3033fff0f221fa20a419` | `0644` | 0 | 0 |
| `/tmp/signthos-apt/state/status` | 231024 | `49176dcea062ad5a71df28c178ce241a6bcf9a2ec7e1525a1445a143bfd1080b` | `0644` | 0 | 0 |

## 4. Container envelope

Both replays use the same exact containment contract:

```text
--rm
-i
--pull=never
--platform linux/amd64
--network none
--read-only
--cap-drop ALL
--security-opt no-new-privileges
--pids-limit 64
--memory 512m
--cpus 2
--tmpfs /tmp/signthos-apt:rw,nosuid,nodev,noexec,size=384m,mode=0755
-e TMPDIR=/tmp/signthos-apt/tmp
-e LC_ALL=C
-e LANG=C
-e TZ=UTC
HOST_BIND_OR_VOLUME_FLAGS = 0
REPOSITORY_MOUNTS = 0
```

The selected image contributes its canonical inherited environment unchanged:

```text
PATH=/emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
EMSDK=/emsdk
```

No proxy, credential, custom CA, source-routing, or other user-supplied environment entry is introduced.

```text
DOCKER_ARGV_SHA256 = 9af0a125284ad0ccc949ee81d28246504798a70cf9259d3c719f6f4a3f536b62
GUEST_SCRIPT_BYTES = 19860
GUEST_SCRIPT_SHA256 = 346dd8701dad93001a9d8beeaa3eee6686eb1718347347d9a6b2bc4bac5384b8
```

## 5. Guest helper identity

Before extraction, each replay hashes the exact helpers it will use and fails closed on any mismatch.

| Helper | SHA-256 |
| --- | --- |
| `/bin/sh` | `4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483` |
| `/usr/bin/dash` | `4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483` |
| `/usr/bin/find` | `791b89c8bffb8101fd7d4d212b80af66a2332834b05a42721104eb47e8fa2eb1` |
| `/usr/bin/sha256sum` | `7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3` |
| `/usr/bin/stat` | `9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3` |
| `/usr/bin/tar` | `148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f` |
| `/usr/bin/wc` | `504463c7a12780b7439321be6e67f43ab61a3ff429cbf916c0722d19f98692a8` |

The `/bin/sh` hash follows the canonical `/bin -> usr/bin` and `/usr/bin/sh -> dash` symlinks and therefore equals the bound `dash` content identity.

## 6. Replay observations

```text
REPLAY_A_START_UTC = 2026-09-09T23:49:11.879667Z
REPLAY_A_END_UTC = 2026-09-09T23:49:17.568695Z
REPLAY_A_EXIT = 0
REPLAY_A_STDOUT_BYTES = 4506
REPLAY_A_STDOUT_SHA256 = 7dbbd789e2a1a36e5f6cb73973ef8d24b5617fa44c51f24e425633718743989d
REPLAY_A_STDERR_BYTES = 0
REPLAY_A_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
REPLAY_B_START_UTC = 2026-09-09T23:49:17.575717Z
REPLAY_B_END_UTC = 2026-09-09T23:49:20.912986Z
REPLAY_B_EXIT = 0
REPLAY_B_STDOUT_BYTES = 4506
REPLAY_B_STDOUT_SHA256 = 7dbbd789e2a1a36e5f6cb73973ef8d24b5617fa44c51f24e425633718743989d
REPLAY_B_STDERR_BYTES = 0
REPLAY_B_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
REPLAY_STDOUT_A_EQUALS_B = PASS
CONTAINER_COUNT_AFTER = 14
```

Both stdout inventories independently establish:

```text
TMPFS_FILESYSTEM_TYPE = tmpfs
DIRECTORY_COUNT = 10
REGULAR_FILE_COUNT = 17
SYMLINK_COUNT = 0
ALL_DIRECTORY_MODE_UID_GID = PASS
ALL_FILE_BYTES_SHA256_MODE_UID_GID = PASS
SOURCE_DESCRIPTOR_IDENTITY = PASS
INITIAL_DPKG_STATUS_IDENTITY = PASS
THREE_INRELEASE_IDENTITIES = PASS
TWELVE_UNCOMPRESSED_PACKAGES_IDENTITIES = PASS
BOUND_HELPER_IDENTITIES = PASS
CANONICAL_INHERITED_PATH_EMSDK = PASS
FOUR_EXECUTION_CONTROL_OVERRIDES = PASS
ROOTFS_WRITE_OUTSIDE_APT_ROOT = EXPECTED_READ_ONLY_FAILURE / PASS
PLACEMENT_RESULT = PASS
```

The negative rootfs write probe targeted `/signthos-aw-rootfs-write-probe`, outside the tmpfs. The write failed as expected under `--read-only`; the error was captured by the shell for the qualification decision and was not emitted as unexpected container stderr. No probe file was created.

## 7. Execution accounting

```text
PLACEMENT_CONTAINER_REPLAY_COUNT = 2
IMAGE_PULL = 0
IMAGE_LOAD = 0
IMAGE_BUILD = 0
NETWORK_ACTION_INSIDE_CONTAINER = 0
HOST_BIND_MOUNT = 0
REPOSITORY_MOUNT = 0
APT_GET_EXECUTION = 0
APT_CACHE_EXECUTION = 0
APT_CONFIG_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_DOWNLOAD = 0
PACKAGE_INSTALL = 0
PACKAGE_UNPACK = 0
PACKAGE_CONFIGURE = 0
PDFIUM_PROVIDER_EXECUTION = 0
REPOSITORY_EXTERNAL_BYTE_IMPORT = 0
```

Transport tar files, raw replay stdout/stderr, and predecessor byte material remain external ephemeral evidence only. No snapshot, status, package-list, tar, or runtime byte is committed to Signthos.

## 8. Qualification result

```text
PREDECESSOR_BYTE_RECHECK = PASS
NORMALIZED_TRANSPORT_DETERMINISM = PASS
CONTAINER_TMPFS_PLACEMENT = PASS
CONTAINER_VISIBLE_DIRECTORY_METADATA = PASS
CONTAINER_VISIBLE_FILE_IDENTITY = PASS
NO_SYMLINK_OR_EXTRA_FILE = PASS
ROOTFS_READ_ONLY_NEGATIVE_PROBE = PASS
TWO_REPLAY_STDOUT_DETERMINISM = PASS
NO_APT_OR_PACKAGE_ACTION = PASS
004C1AW_RESULT = PASS_CONTAINER_VISIBLE_INPUT_ROOT_PLACEMENT_ONLY
```

## 9. Successor boundary

004C1AW proves only container-visible input-root placement. It does not prove that `apt-get --simulate` consumes the placed state correctly, does not establish any Stage A/B/C transaction, and does not create a virtual next-stage status model.

A fresh post-merge Issue #7 reconciliation is mandatory before any solver execution. That successor must rebind current main, selected image/substrate, canonical 004C1AV Stage argv, this exact placement identity, initial dpkg status, snapshot inputs, zero-network/no-download/no-install containment, process/filesystem accounting, and two-replay determinism before authorizing even Stage A simulation.

```text
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED
STAGE_A_SOLVER_TRANSACTION = NOT_ESTABLISHED
VIRTUAL_NEXT_STAGE_STATUS = NOT_ESTABLISHED
PACKAGE_ACTION = NOT_AUTHORIZED
IMAGE_PROVISIONING = NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
