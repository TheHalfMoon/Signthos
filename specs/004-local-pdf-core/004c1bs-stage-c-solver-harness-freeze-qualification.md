# 004C1BS — Stage C solver harness freeze qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_DETERMINISTIC_STAGE_C_INPUT_AND_HARNESS_FREEZE_ONLY / ZERO_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `eb89121a27e2509ea4fc562921925509f95d14f9`
Canonical base tree: `64dacf23e1d85168c39e0c45eb4395ae2c7a2762`
Authority source: `github:issue-comment:5626398433`

## 1. Authority boundary

This unit freezes the exact Stage C predecessor transport and future solver harness only. It performs no Docker image pull, container execution, APT, apt-config, dpkg, package operation, Stage C replay, provider/PDFium work, 004C2, 004D, or Specification 005 work.

```text
004C1BS_AUTHORITY = STATIC_DETERMINISTIC_STAGE_C_INPUT_AND_HARNESS_FREEZE_ONLY
004C1BS_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1bs-stage-c-solver-harness-freeze-qualification.md
004C1BS_MAX_CHANGED_REPOSITORY_FILES = 1
DOCKER_IMAGE_PULL = NOT_AUTHORIZED
DOCKER_CONTAINER_EXECUTION = NOT_AUTHORIZED
APT_GET_EXECUTION = NOT_AUTHORIZED
APT_CONFIG_EXECUTION = NOT_AUTHORIZED
DPKG_EXECUTION = NOT_AUTHORIZED
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = NOT_AUTHORIZED
STAGE_C_SOLVER_EXECUTION = NOT_AUTHORIZED
STAGE_C_REPLAY_A_OR_B = NOT_AUTHORIZED
STAGE_C_VIRTUAL_STATE_DERIVATION = NOT_AUTHORIZED
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Canonical source bindings

- `004C1AL`: `21275` bytes / `452` lines / SHA-256 `099260342a77d2fc93404d3cc5babede5eddb9411d0a0a4c4f3d2ec7c101fe2f`.
- `004C1AQ`: `33338` bytes / `650` lines / SHA-256 `bf46f47ac6470ab342c89186f8db25feaa1b1355cb1e18961547d608a50a7d33`.
- `004C1BG`: `110780` bytes / `1154` lines / SHA-256 `57d644b78c67592dc663a26bac14d4345bb511e3ae83e075aa288c3d67a9221b`.
- `004C1BK`: `30928` bytes / `151` lines / SHA-256 `aea53bd6682ba109660db639090720452b183db8e3c2231bbb032ecf24aeb7ba`.
- `004C1BN`: `38039` bytes / `450` lines / SHA-256 `5f35ec6fdc5db674ed7c56cb835c9f7c726be6b0f478ecfd75e73c4739995587`.
- `004C1BR`: `414390` bytes / `5451` lines / SHA-256 `a0f861d828282771809700645b694ba290a6d6bd1d56918cf496b1025a95cbed`.

The Stage C predecessor is the exact merged 004C1BR Stage B successor:

```text
STAGE_C_PREDECESSOR_VIRTUAL_DPKG_STATUS_BYTES = 1027229
STAGE_C_PREDECESSOR_VIRTUAL_DPKG_STATUS_SHA256 = ec5039354992576d69fa3529257684d759116385bf958cad36e1adec9a3fe7d3
STAGE_C_PREDECESSOR_INSTALLED_STATE_BYTES = 98938
STAGE_C_PREDECESSOR_INSTALLED_STATE_SHA256 = 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea
STAGE_C_PREDECESSOR_INSTALLED_PACKAGE_COUNT = 904
```

## 3. Stage C root and policy binding

Canonical 004C1AL and 004C1AQ bind exactly the ordered root vector below. No root is added, removed, reordered, aliased, or deduplicated.

```text
STAGE_C_ROOTS = [curl, build-essential, pkg-config, rsync]
STAGE_C_ROOT_COUNT = 4
STAGE_C_ROOTS_JSON_SHA256 = c0ee3f407b0591988df41f7dbe3d0bd975e32312079b221bf8414d74094d19d7
STAGE_C_RECOMMENDS_POLICY = NO_INSTALL_RECOMMENDS
STAGE_C_TARGET_ARCHITECTURE = amd64
STAGE_C_I386_MULTIARCH = false
```

## 4. Deterministic Stage C input transport

The 004C1BK snapshot-only topology is retained exactly. The sole payload substitution is `/tmp/signthos-apt/state/status`, replaced with the exact 004C1BR virtual Stage B dpkg status. Directory/file metadata, immutable snapshot descriptor, three InRelease files, and twelve uncompressed Packages indexes remain otherwise unchanged.

```text
STAGE_C_INPUT_MEMBER_COUNT = 27
STAGE_C_INPUT_DIRECTORY_COUNT = 10
STAGE_C_INPUT_REGULAR_FILE_COUNT = 17
STAGE_C_INPUT_OTHER_MEMBER_COUNT = 0
STAGE_C_INPUT_INVENTORY_BYTES = 3524
STAGE_C_INPUT_INVENTORY_SHA256 = cd1c1f5b548d8617235b99be5c53efaf30d1c440a1ded8a8ec41efd7e8fd438b
STAGE_C_INPUT_TRANSPORT_FORMAT = USTAR
STAGE_C_INPUT_TRANSPORT_BYTES = 205568000
STAGE_C_INPUT_TRANSPORT_SHA256 = 938d500c76b7c31927d70df28c98618d8b23f6e35559018c50ae1a8fc1b698de
```

Exact normalized inventory bytes:

```text
D	/tmp/signthos-apt	755 0 0
D	/tmp/signthos-apt/cache	755 0 0
D	/tmp/signthos-apt/cache/archives	755 0 0
D	/tmp/signthos-apt/cache/archives/partial	700 0 0
D	/tmp/signthos-apt/etc	755 0 0
F	/tmp/signthos-apt/etc/snapshot.sources	242 644 0 0	3fcdd0b5ef962070795738f92f36ea70f8c05a3171ae72e832f46746f7bab199
D	/tmp/signthos-apt/lists	755 0 0
D	/tmp/signthos-apt/lists/partial	700 0 0
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_InRelease	128927 644 0 0	b2eb2336d267611f596e47fe9bad879db22371598047363db841d8f5f586d450
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_main_binary-amd64_Packages	20025980 644 0 0	dbd457849762832bbe31a16ebf4bd9589ee199c098dfab9644ff492e93104f91
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_multiverse_binary-amd64_Packages	531283 644 0 0	0d2c5a73d67917c70c6aceb3cb8cf6cad539e7b7c9a89a1ff83b48264cf95acf
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_restricted_binary-amd64_Packages	36809356 644 0 0	8a8b903ffb5de341a37b3bdf202bf519a7ab0d17c4c1ff66eb8c19363f807ae5
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_universe_binary-amd64_Packages	6183008 644 0 0	3230ca3f52e3afccff85b059a60019aa4be26342ca8cdfdda04e0e50f5ac7fbc
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_InRelease	128049 644 0 0	78e5c7e6f16f418c394d2d6caa4d8d10fafa715b08b038c02a8c73cd6dc4587b
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_main_binary-amd64_Packages	21442327 644 0 0	0009b768364a862e7754f782f3f0dda9730f938f300179c86f17e39ba12ffc0b
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_multiverse_binary-amd64_Packages	568152 644 0 0	848df514867b80a7fcbbf0453f7a76eb8e29688b094707e52981c2a7d80722db
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_restricted_binary-amd64_Packages	38216851 644 0 0	68a38a898e28d680b094ef435c212d9664e8441acf01ea652916471f9455b479
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_universe_binary-amd64_Packages	7269024 644 0 0	1679f3823d2077dc6e7d72e16494a33b03c2fbba26b806423af3df05c60eed7b
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_InRelease	270087 644 0 0	c14060cd8c6d625874dfcb9523a35a395bf4865c28b6b6a82569ef326fe92dc6
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_main_binary-amd64_Packages	6779186 644 0 0	12ce0797a6ed39a1fee1321985976c6b78872a8fe4c7ef2fb712f2364c9839a3
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_multiverse_binary-amd64_Packages	918002 644 0 0	3493e180d952143ec601e4c833e54de709473bd636b6a3f6bb94e367e56f4abf
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_restricted_binary-amd64_Packages	915647 644 0 0	b40bcc8340f4a2295e3daa158b7c50001642e843b3559907402c1b0da2d2459b
F	/tmp/signthos-apt/lists/snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_universe_binary-amd64_Packages	64332414 644 0 0	6b8cc68643d18250ab297c4f6d427a8778b1d1534e1a3033fff0f221fa20a419
D	/tmp/signthos-apt/log	755 0 0
D	/tmp/signthos-apt/state	755 0 0
F	/tmp/signthos-apt/state/status	1027229 644 0 0	ec5039354992576d69fa3529257684d759116385bf958cad36e1adec9a3fe7d3
D	/tmp/signthos-apt/tmp	700 0 0
```

## 5. Exact Stage C solver and hook argv

The Stage C solver argv is derived from the final repaired 004C1BG/004C1BK control surface. It retains the isolated snapshot roots, planner path, `APT::Architectures=amd64`, nonexistent fail-closed dpkg path, `Debug::NoLocking=1`, `Acquire::Languages=none`, and `Acquire::Retries=0`; it changes the request to the exact Stage C roots and includes `--no-install-recommends`.

```text
STAGE_C_ARGC = 40
STAGE_C_ARGV_JSON_BYTES = 806
STAGE_C_ARGV_SHA256 = 09ecbb18acb102a078f88fe533a5641e9fd0cbb080b9f225791f49991434aced
```

```json
["/usr/bin/apt-get","--simulate","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State=/tmp/signthos-apt/state/","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache=/tmp/signthos-apt/cache/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::Cache::pkgcache=","-o","Dir::Cache::srcpkgcache=","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Dir::Log::Planner=/tmp/signthos-apt/tmp/bb-eipp.log.xz","-o","APT::Architectures=amd64","-o","Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","--no-install-recommends","curl","build-essential","pkg-config","rsync"]
```

The immediate same-container hook query is byte-identical to 004C1BK:

```text
STAGE_C_HOOK_ARGC = 38
STAGE_C_HOOK_ARGV_JSON_BYTES = 822
STAGE_C_HOOK_ARGV_SHA256 = 0cd1f39c05acd784eeba444f261b9b8303d9a8e90946eb6d7d58e00c717b1589
```

```json
["/usr/bin/apt-config","--no-empty","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State=/tmp/signthos-apt/state/","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache=/tmp/signthos-apt/cache/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::Cache::pkgcache=","-o","Dir::Cache::srcpkgcache=","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Dir::Log::Planner=/tmp/signthos-apt/tmp/bb-eipp.log.xz","-o","APT::Architectures=amd64","-o","Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","dump","APT::Install::Pre-Invoke","APT::Install::Post-Invoke-Success","AptCli::Hooks::Install"]
```

## 6. Selected image, isolation, helper, and substrate bindings

```text
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
IMAGE_CONFIG_DIGEST = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
PLATFORM = linux/amd64
PULL = never
NETWORK = none
ROOTFS = read-only
CAP_DROP = ALL
NO_NEW_PRIVILEGES = true
PIDS_LIMIT = 64
MEMORY_LIMIT = 512m
CPU_LIMIT = 2
WRITABLE_APT_ROOT = tmpfs:/tmp/signthos-apt
TMPFS_LIMIT = 416m
HOST_BIND_MOUNTS = 0
REPOSITORY_MOUNTS = 0
INPUT_TRANSPORT = STDIN_ONLY
```

Exact inherited helper identities:

| Path | SHA-256 |
| --- | --- |
| `/usr/bin/sha256sum` | `7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3` |
| `/usr/bin/stat` | `9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3` |
| `/usr/bin/cat` | `210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba` |
| `/usr/bin/tar` | `148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f` |
| `/usr/bin/rm` | `7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682` |
| `/bin/sh` | `4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483` |
| `/usr/bin/dash` | `4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483` |
| `/usr/bin/find` | `791b89c8bffb8101fd7d4d212b80af66a2332834b05a42721104eb47e8fa2eb1` |
| `/usr/bin/wc` | `504463c7a12780b7439321be6e67f43ab61a3ff429cbf916c0722d19f98692a8` |
| `/usr/bin/sort` | `0fc26ce295e8e549635da2129e389f63685745b3be7c1737db6251a296f1cd78` |
| `/usr/bin/uname` | `37df0311d0e24169abfd166bc6018d40b87306f7ff64d9eec256c8331ac26347` |
| `/usr/bin/ldd` | `6752368e618c98f813bd346846df76021aa5d09caef634ee5dbe7d00c3c200fd` |
| `/usr/bin/apt-get` | `9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196` |
| `/usr/bin/apt-config` | `ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19` |

The future execution predicate also requires the frozen environment (`PATH`, `EMSDK`, `TMPDIR`, `LC_ALL=C`, `LANG=C`, `TZ=UTC`), tmpfs filesystem type, exact apt executable metadata, `uname -m=x86_64`, and the inherited Rodete-false predicate before any solver invocation.

## 7. Frozen future guest script and Docker argv

```text
STAGE_C_GUEST_SCRIPT_BYTES = 9568
STAGE_C_GUEST_SCRIPT_SHA256 = 08d64ed373122b66149a5552f8d3c1e0c86617439670117b4b747e2a3a04a77e
STAGE_C_GUEST_SCRIPT_TRAILING_LF = true
```

```text
tmp=/tmp/signthos-apt/tmp
raw=/tmp/signthos-apt/bb-input.tar
umask 022
[ "$PATH" = /emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin ] || exit 10
[ "$EMSDK" = /emsdk ] || exit 11
[ "$TMPDIR" = /tmp/signthos-apt/tmp ] || exit 12
[ "$LC_ALL" = C ] || exit 13
[ "$LANG" = C ] || exit 14
[ "$TZ" = UTC ] || exit 15
fst=$(/usr/bin/stat -f -c %T /tmp/signthos-apt); [ "$fst" = tmpfs ] || exit 21
x=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ "$x" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 16
x=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ "$x" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 17
x=$(/usr/bin/sha256sum /usr/bin/cat); x=${x%% *}; [ "$x" = 210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba ] || exit 18
x=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ "$x" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 19
x=$(/usr/bin/sha256sum /usr/bin/rm); x=${x%% *}; [ "$x" = 7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682 ] || exit 20
/usr/bin/cat > "$raw"
rb=$(/usr/bin/stat -c %s "$raw"); [ "$rb" = 205568000 ] || exit 40
rh=$(/usr/bin/sha256sum "$raw"); rh=${rh%% *}; [ "$rh" = 938d500c76b7c31927d70df28c98618d8b23f6e35559018c50ae1a8fc1b698de ] || exit 41
/usr/bin/tar -xpf "$raw" -C /
/usr/bin/rm -- "$raw"
[ ! -e "$raw" ] || exit 42
dc=$(/usr/bin/find /tmp/signthos-apt -type d | /usr/bin/wc -l); [ "$dc" = 10 ] || exit 22
fc=$(/usr/bin/find /tmp/signthos-apt -type f | /usr/bin/wc -l); [ "$fc" = 17 ] || exit 23
lc=$(/usr/bin/find /tmp/signthos-apt -type l | /usr/bin/wc -l); [ "$lc" = 0 ] || exit 24
inventory() { /usr/bin/find /tmp/signthos-apt -print | /usr/bin/sort | while IFS= read -r p; do case "$p" in /tmp/signthos-apt/tmp/bb-*) continue ;; esac; if [ -d "$p" ]; then m=$(/usr/bin/stat -c "%a %u %g" "$p") || exit 31; printf "D\t%s\t%s\n" "$p" "$m"; elif [ -f "$p" ]; then m=$(/usr/bin/stat -c "%s %a %u %g" "$p") || exit 32; h=$(/usr/bin/sha256sum "$p") || exit 33; h=${h%% *}; printf "F\t%s\t%s\t%s\n" "$p" "$m" "$h"; elif [ -L "$p" ]; then m=$(/usr/bin/stat -c "%a %u %g" "$p") || exit 34; printf "L\t%s\t%s\n" "$p" "$m"; else m=$(/usr/bin/stat -c "%a %u %g" "$p") || exit 35; printf "O\t%s\t%s\n" "$p" "$m"; fi; done; }
inventory > "$tmp/bb-before.tsv"
bh=$(/usr/bin/sha256sum "$tmp/bb-before.tsv"); bh=${bh%% *}; [ "$bh" = cd1c1f5b548d8617235b99be5c53efaf30d1c440a1ded8a8ec41efd7e8fd438b ] || exit 36
: > "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /bin/sh); x=${x%% *}; [ "$x" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf "%s\t%s\n" /bin/sh "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/dash); x=${x%% *}; [ "$x" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf "%s\t%s\n" /usr/bin/dash "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ "$x" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 20; printf "%s\t%s\n" /usr/bin/tar "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ "$x" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 20; printf "%s\t%s\n" /usr/bin/sha256sum "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ "$x" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 20; printf "%s\t%s\n" /usr/bin/stat "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/find); x=${x%% *}; [ "$x" = 791b89c8bffb8101fd7d4d212b80af66a2332834b05a42721104eb47e8fa2eb1 ] || exit 20; printf "%s\t%s\n" /usr/bin/find "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/wc); x=${x%% *}; [ "$x" = 504463c7a12780b7439321be6e67f43ab61a3ff429cbf916c0722d19f98692a8 ] || exit 20; printf "%s\t%s\n" /usr/bin/wc "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/sort); x=${x%% *}; [ "$x" = 0fc26ce295e8e549635da2129e389f63685745b3be7c1737db6251a296f1cd78 ] || exit 20; printf "%s\t%s\n" /usr/bin/sort "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/uname); x=${x%% *}; [ "$x" = 37df0311d0e24169abfd166bc6018d40b87306f7ff64d9eec256c8331ac26347 ] || exit 20; printf "%s\t%s\n" /usr/bin/uname "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/ldd); x=${x%% *}; [ "$x" = 6752368e618c98f813bd346846df76021aa5d09caef634ee5dbe7d00c3c200fd ] || exit 20; printf "%s\t%s\n" /usr/bin/ldd "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/apt-get); x=${x%% *}; [ "$x" = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196 ] || exit 27; printf "%s\t%s\n" /usr/bin/apt-get "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/apt-config); x=${x%% *}; [ "$x" = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19 ] || exit 29; printf "%s\t%s\n" /usr/bin/apt-config "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/cat); x=${x%% *}; [ "$x" = 210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba ] || exit 20; printf "%s\t%s\n" /usr/bin/cat "$x" >> "$tmp/bb-helpers.tsv"
x=$(/usr/bin/sha256sum /usr/bin/rm); x=${x%% *}; [ "$x" = 7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682 ] || exit 20; printf "%s\t%s\n" /usr/bin/rm "$x" >> "$tmp/bb-helpers.tsv"
am=$(/usr/bin/stat -c "%s %a %u %g" /usr/bin/apt-get); [ "$am" = "51680 755 0 0" ] || exit 28
cm=$(/usr/bin/stat -c "%s %a %u %g" /usr/bin/apt-config); [ "$cm" = "27024 755 0 0" ] || exit 30
kernel=$(/usr/bin/uname -r)
machine=$(/usr/bin/uname -m)
{ printf "GUEST_KERNEL=%s\n" "$kernel"; printf "GUEST_MACHINE=%s\n" "$machine"; /usr/bin/ldd --version; if [ -x /run/rosetta/rosetta ]; then printf "ROSETTA_VISIBLE=YES\n"; else printf "ROSETTA_VISIBLE=NO\n"; fi; } > "$tmp/bb-substrate.stdout" 2> "$tmp/bb-substrate.stderr"
case "$kernel" in 6.12.*rodete1-amd64) printf "RODETE_PREDICATE=TRUE\n" >> "$tmp/bb-substrate.stdout"; exit 25 ;; *) printf "RODETE_PREDICATE=FALSE\n" >> "$tmp/bb-substrate.stdout" ;; esac
[ "$machine" = x86_64 ] || exit 26
/usr/bin/apt-get --version > "$tmp/bb-apt-version.stdout" 2> "$tmp/bb-apt-version.stderr"
printf "/usr/bin/apt-get\t%s\t%s\n" "9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196" "$am" > "$tmp/bb-apt-identity.tsv"
set -- /usr/bin/apt-get --simulate -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Dir::Log::Planner=/tmp/signthos-apt/tmp/bb-eipp.log.xz -o APT::Architectures=amd64 -o Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 install --no-install-recommends curl build-essential pkg-config rsync
set +e
/usr/bin/apt-config --no-empty -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Dir::Log::Planner=/tmp/signthos-apt/tmp/bb-eipp.log.xz -o APT::Architectures=amd64 -o Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 dump APT::Install::Pre-Invoke APT::Install::Post-Invoke-Success AptCli::Hooks::Install > "$tmp/bb-hook.stdout" 2> "$tmp/bb-hook.stderr"
hook_rc=$?
set -e
[ "$hook_rc" -eq 0 ] || exit 61
[ ! -s "$tmp/bb-hook.stdout" ] || exit 62
[ ! -s "$tmp/bb-hook.stderr" ] || exit 63
"$@" > "$tmp/bb-apt.stdout" 2> "$tmp/bb-apt.stderr" &
apt_pid=$!
: > "$tmp/bb-process.raw"
seen="|"
while kill -0 "$apt_pid" 2>/dev/null; do for c in /proc/[0-9]*/comm; do if IFS= read -r n 2>/dev/null < "$c"; then case "$seen" in *"|$n|"*) ;; *) seen="${seen}${n}|"; printf "%s\n" "$n" >> "$tmp/bb-process.raw" ;; esac; else [ ! -e "$c" ] || exit 70; fi; done; done
set +e
wait "$apt_pid"
apt_rc=$?
set -e
printf "%s\n" "$hook_rc" > "$tmp/bb-hook.exit"
printf "%s\n" "$apt_rc" > "$tmp/bb-apt.exit"
run_rc=0
[ "$apt_rc" -eq 0 ] || run_rc=74
/usr/bin/sort -u "$tmp/bb-process.raw" > "$tmp/bb-process.txt"
inventory > "$tmp/bb-after.tsv"
[ -f "$tmp/bb-eipp.log.xz" ] || exit 73
eb=$(/usr/bin/stat -c %s "$tmp/bb-eipp.log.xz")
eh=$(/usr/bin/sha256sum "$tmp/bb-eipp.log.xz"); eh=${eh%% *}
printf "%s\t%s\n" "$eb" "$eh" > "$tmp/bb-eipp-identity.tsv"
ah=$(/usr/bin/sha256sum "$tmp/bb-after.tsv"); ah=${ah%% *}
inventory_rc=0
[ "$ah" = cd1c1f5b548d8617235b99be5c53efaf30d1c440a1ded8a8ec41efd7e8fd438b ] || inventory_rc=71
if [ "$inventory_rc" -eq 0 ]; then [ "$bh" = "$ah" ] || inventory_rc=72; fi
if [ "$run_rc" -eq 0 ]; then run_rc=$inventory_rc; fi
/usr/bin/tar --format=ustar --sort=name --mtime=@0 --owner=0 --group=0 --numeric-owner -cf - -C "$tmp" bb-after.tsv bb-apt-identity.tsv bb-apt-version.stderr bb-apt-version.stdout bb-apt.exit bb-apt.stderr bb-apt.stdout bb-before.tsv bb-eipp-identity.tsv bb-eipp.log.xz bb-helpers.tsv bb-hook.exit bb-hook.stderr bb-hook.stdout bb-process.txt bb-substrate.stderr bb-substrate.stdout
exit "$run_rc"
```

The Docker envelope is the exact 004C1BK envelope with only the final guest-script token replaced by the Stage C guest script above.

```text
STAGE_C_DOCKER_ARGC = 35
STAGE_C_DOCKER_ARGV_JSON_BYTES = 10568
STAGE_C_DOCKER_ARGV_SHA256 = 608c81601f125c356ea8551272f41ddfda978bf64947c3e063d190f32af7e370
```

```json
["docker","run","--rm","-i","--pull=never","--platform","linux/amd64","--network","none","--read-only","--cap-drop","ALL","--security-opt","no-new-privileges","--pids-limit","64","--memory","512m","--cpus","2","--tmpfs","/tmp/signthos-apt:rw,nosuid,nodev,noexec,size=416m,mode=0755","-e","TMPDIR=/tmp/signthos-apt/tmp","-e","LC_ALL=C","-e","LANG=C","-e","TZ=UTC","--entrypoint","/bin/sh","docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3","-ceu","tmp=/tmp/signthos-apt/tmp\nraw=/tmp/signthos-apt/bb-input.tar\numask 022\n[ \"$PATH\" = /emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin ] || exit 10\n[ \"$EMSDK\" = /emsdk ] || exit 11\n[ \"$TMPDIR\" = /tmp/signthos-apt/tmp ] || exit 12\n[ \"$LC_ALL\" = C ] || exit 13\n[ \"$LANG\" = C ] || exit 14\n[ \"$TZ\" = UTC ] || exit 15\nfst=$(/usr/bin/stat -f -c %T /tmp/signthos-apt); [ \"$fst\" = tmpfs ] || exit 21\nx=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ \"$x\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 16\nx=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ \"$x\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 17\nx=$(/usr/bin/sha256sum /usr/bin/cat); x=${x%% *}; [ \"$x\" = 210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba ] || exit 18\nx=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ \"$x\" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 19\nx=$(/usr/bin/sha256sum /usr/bin/rm); x=${x%% *}; [ \"$x\" = 7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682 ] || exit 20\n/usr/bin/cat > \"$raw\"\nrb=$(/usr/bin/stat -c %s \"$raw\"); [ \"$rb\" = 205568000 ] || exit 40\nrh=$(/usr/bin/sha256sum \"$raw\"); rh=${rh%% *}; [ \"$rh\" = 938d500c76b7c31927d70df28c98618d8b23f6e35559018c50ae1a8fc1b698de ] || exit 41\n/usr/bin/tar -xpf \"$raw\" -C /\n/usr/bin/rm -- \"$raw\"\n[ ! -e \"$raw\" ] || exit 42\ndc=$(/usr/bin/find /tmp/signthos-apt -type d | /usr/bin/wc -l); [ \"$dc\" = 10 ] || exit 22\nfc=$(/usr/bin/find /tmp/signthos-apt -type f | /usr/bin/wc -l); [ \"$fc\" = 17 ] || exit 23\nlc=$(/usr/bin/find /tmp/signthos-apt -type l | /usr/bin/wc -l); [ \"$lc\" = 0 ] || exit 24\ninventory() { /usr/bin/find /tmp/signthos-apt -print | /usr/bin/sort | while IFS= read -r p; do case \"$p\" in /tmp/signthos-apt/tmp/bb-*) continue ;; esac; if [ -d \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 31; printf \"D\\t%s\\t%s\\n\" \"$p\" \"$m\"; elif [ -f \"$p\" ]; then m=$(/usr/bin/stat -c \"%s %a %u %g\" \"$p\") || exit 32; h=$(/usr/bin/sha256sum \"$p\") || exit 33; h=${h%% *}; printf \"F\\t%s\\t%s\\t%s\\n\" \"$p\" \"$m\" \"$h\"; elif [ -L \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 34; printf \"L\\t%s\\t%s\\n\" \"$p\" \"$m\"; else m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 35; printf \"O\\t%s\\t%s\\n\" \"$p\" \"$m\"; fi; done; }\ninventory > \"$tmp/bb-before.tsv\"\nbh=$(/usr/bin/sha256sum \"$tmp/bb-before.tsv\"); bh=${bh%% *}; [ \"$bh\" = cd1c1f5b548d8617235b99be5c53efaf30d1c440a1ded8a8ec41efd7e8fd438b ] || exit 36\n: > \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /bin/sh); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /bin/sh \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/dash); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/dash \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ \"$x\" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/tar \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ \"$x\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sha256sum \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ \"$x\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/stat \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/find); x=${x%% *}; [ \"$x\" = 791b89c8bffb8101fd7d4d212b80af66a2332834b05a42721104eb47e8fa2eb1 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/find \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/wc); x=${x%% *}; [ \"$x\" = 504463c7a12780b7439321be6e67f43ab61a3ff429cbf916c0722d19f98692a8 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/wc \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sort); x=${x%% *}; [ \"$x\" = 0fc26ce295e8e549635da2129e389f63685745b3be7c1737db6251a296f1cd78 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sort \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/uname); x=${x%% *}; [ \"$x\" = 37df0311d0e24169abfd166bc6018d40b87306f7ff64d9eec256c8331ac26347 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/uname \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/ldd); x=${x%% *}; [ \"$x\" = 6752368e618c98f813bd346846df76021aa5d09caef634ee5dbe7d00c3c200fd ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/ldd \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-get); x=${x%% *}; [ \"$x\" = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196 ] || exit 27; printf \"%s\\t%s\\n\" /usr/bin/apt-get \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-config); x=${x%% *}; [ \"$x\" = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19 ] || exit 29; printf \"%s\\t%s\\n\" /usr/bin/apt-config \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/cat); x=${x%% *}; [ \"$x\" = 210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/cat \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/rm); x=${x%% *}; [ \"$x\" = 7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/rm \"$x\" >> \"$tmp/bb-helpers.tsv\"\nam=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-get); [ \"$am\" = \"51680 755 0 0\" ] || exit 28\ncm=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-config); [ \"$cm\" = \"27024 755 0 0\" ] || exit 30\nkernel=$(/usr/bin/uname -r)\nmachine=$(/usr/bin/uname -m)\n{ printf \"GUEST_KERNEL=%s\\n\" \"$kernel\"; printf \"GUEST_MACHINE=%s\\n\" \"$machine\"; /usr/bin/ldd --version; if [ -x /run/rosetta/rosetta ]; then printf \"ROSETTA_VISIBLE=YES\\n\"; else printf \"ROSETTA_VISIBLE=NO\\n\"; fi; } > \"$tmp/bb-substrate.stdout\" 2> \"$tmp/bb-substrate.stderr\"\ncase \"$kernel\" in 6.12.*rodete1-amd64) printf \"RODETE_PREDICATE=TRUE\\n\" >> \"$tmp/bb-substrate.stdout\"; exit 25 ;; *) printf \"RODETE_PREDICATE=FALSE\\n\" >> \"$tmp/bb-substrate.stdout\" ;; esac\n[ \"$machine\" = x86_64 ] || exit 26\n/usr/bin/apt-get --version > \"$tmp/bb-apt-version.stdout\" 2> \"$tmp/bb-apt-version.stderr\"\nprintf \"/usr/bin/apt-get\\t%s\\t%s\\n\" \"9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196\" \"$am\" > \"$tmp/bb-apt-identity.tsv\"\nset -- /usr/bin/apt-get --simulate -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Dir::Log::Planner=/tmp/signthos-apt/tmp/bb-eipp.log.xz -o APT::Architectures=amd64 -o Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 install --no-install-recommends curl build-essential pkg-config rsync\nset +e\n/usr/bin/apt-config --no-empty -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Dir::Log::Planner=/tmp/signthos-apt/tmp/bb-eipp.log.xz -o APT::Architectures=amd64 -o Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 dump APT::Install::Pre-Invoke APT::Install::Post-Invoke-Success AptCli::Hooks::Install > \"$tmp/bb-hook.stdout\" 2> \"$tmp/bb-hook.stderr\"\nhook_rc=$?\nset -e\n[ \"$hook_rc\" -eq 0 ] || exit 61\n[ ! -s \"$tmp/bb-hook.stdout\" ] || exit 62\n[ ! -s \"$tmp/bb-hook.stderr\" ] || exit 63\n\"$@\" > \"$tmp/bb-apt.stdout\" 2> \"$tmp/bb-apt.stderr\" &\napt_pid=$!\n: > \"$tmp/bb-process.raw\"\nseen=\"|\"\nwhile kill -0 \"$apt_pid\" 2>/dev/null; do for c in /proc/[0-9]*/comm; do if IFS= read -r n 2>/dev/null < \"$c\"; then case \"$seen\" in *\"|$n|\"*) ;; *) seen=\"${seen}${n}|\"; printf \"%s\\n\" \"$n\" >> \"$tmp/bb-process.raw\" ;; esac; else [ ! -e \"$c\" ] || exit 70; fi; done; done\nset +e\nwait \"$apt_pid\"\napt_rc=$?\nset -e\nprintf \"%s\\n\" \"$hook_rc\" > \"$tmp/bb-hook.exit\"\nprintf \"%s\\n\" \"$apt_rc\" > \"$tmp/bb-apt.exit\"\nrun_rc=0\n[ \"$apt_rc\" -eq 0 ] || run_rc=74\n/usr/bin/sort -u \"$tmp/bb-process.raw\" > \"$tmp/bb-process.txt\"\ninventory > \"$tmp/bb-after.tsv\"\n[ -f \"$tmp/bb-eipp.log.xz\" ] || exit 73\neb=$(/usr/bin/stat -c %s \"$tmp/bb-eipp.log.xz\")\neh=$(/usr/bin/sha256sum \"$tmp/bb-eipp.log.xz\"); eh=${eh%% *}\nprintf \"%s\\t%s\\n\" \"$eb\" \"$eh\" > \"$tmp/bb-eipp-identity.tsv\"\nah=$(/usr/bin/sha256sum \"$tmp/bb-after.tsv\"); ah=${ah%% *}\ninventory_rc=0\n[ \"$ah\" = cd1c1f5b548d8617235b99be5c53efaf30d1c440a1ded8a8ec41efd7e8fd438b ] || inventory_rc=71\nif [ \"$inventory_rc\" -eq 0 ]; then [ \"$bh\" = \"$ah\" ] || inventory_rc=72; fi\nif [ \"$run_rc\" -eq 0 ]; then run_rc=$inventory_rc; fi\n/usr/bin/tar --format=ustar --sort=name --mtime=@0 --owner=0 --group=0 --numeric-owner -cf - -C \"$tmp\" bb-after.tsv bb-apt-identity.tsv bb-apt-version.stderr bb-apt-version.stdout bb-apt.exit bb-apt.stderr bb-apt.stdout bb-before.tsv bb-eipp-identity.tsv bb-eipp.log.xz bb-helpers.tsv bb-hook.exit bb-hook.stderr bb-hook.stdout bb-process.txt bb-substrate.stderr bb-substrate.stdout\nexit \"$run_rc\"\n"]
```

## 8. Cross-device static replay

The exact same builder bytes were executed independently on macOS and Windows. Both reconstructed the immutable snapshot inputs and 004C1BR predecessor, produced the exact transport, and emitted the same result record.

```text
004C1BS_STATIC_BUILDER_BYTES = 6424
004C1BS_STATIC_BUILDER_SHA256 = 953913c9d410832bce0224dcbf7d88095de597f3feafa8375d12ce2ba0768a56
MACOS_STATIC_REPLAY = PASS
WINDOWS_STATIC_REPLAY = PASS
STATIC_REPLAY_RESULT_EQUAL = true
STATIC_REPLAY_TRANSPORT_EQUAL = true
```

macOS result:

```json
{"canonicalMain":"eb89121a27e2509ea4fc562921925509f95d14f9","currentParserBytes":21835,"currentParserSha256":"8b5b6ac91bcc5de7c809bce9029b33cc02ab584eab87168c0ef46098945db584","currentParserStageCSufficient":false,"currentParserStageId":"STAGE_B","dockerArgc":35,"dockerArgvJsonBytes":10568,"dockerArgvSha256":"608c81601f125c356ea8551272f41ddfda978bf64947c3e063d190f32af7e370","guestScriptBytes":9568,"guestScriptSha256":"08d64ed373122b66149a5552f8d3c1e0c86617439670117b4b747e2a3a04a77e","hookArgc":38,"hookArgvJsonBytes":822,"hookArgvSha256":"0cd1f39c05acd784eeba444f261b9b8303d9a8e90946eb6d7d58e00c717b1589","inputInventoryBytes":3524,"inputInventorySha256":"cd1c1f5b548d8617235b99be5c53efaf30d1c440a1ded8a8ec41efd7e8fd438b","predecessorStateBytes":98938,"predecessorStateCount":904,"predecessorStateSha256":"42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea","schema":"signthos.004c1bs.static-freeze.v1","stageCArgc":40,"stageCArgvJsonBytes":806,"stageCArgvSha256":"09ecbb18acb102a078f88fe533a5641e9fd0cbb080b9f225791f49991434aced","stageCRoots":["curl","build-essential","pkg-config","rsync"],"stageCRootsJsonSha256":"c0ee3f407b0591988df41f7dbe3d0bd975e32312079b221bf8414d74094d19d7","transportBytes":205568000,"transportSha256":"938d500c76b7c31927d70df28c98618d8b23f6e35559018c50ae1a8fc1b698de"}
```

Windows result:

```json
{"canonicalMain":"eb89121a27e2509ea4fc562921925509f95d14f9","currentParserBytes":21835,"currentParserSha256":"8b5b6ac91bcc5de7c809bce9029b33cc02ab584eab87168c0ef46098945db584","currentParserStageCSufficient":false,"currentParserStageId":"STAGE_B","dockerArgc":35,"dockerArgvJsonBytes":10568,"dockerArgvSha256":"608c81601f125c356ea8551272f41ddfda978bf64947c3e063d190f32af7e370","guestScriptBytes":9568,"guestScriptSha256":"08d64ed373122b66149a5552f8d3c1e0c86617439670117b4b747e2a3a04a77e","hookArgc":38,"hookArgvJsonBytes":822,"hookArgvSha256":"0cd1f39c05acd784eeba444f261b9b8303d9a8e90946eb6d7d58e00c717b1589","inputInventoryBytes":3524,"inputInventorySha256":"cd1c1f5b548d8617235b99be5c53efaf30d1c440a1ded8a8ec41efd7e8fd438b","predecessorStateBytes":98938,"predecessorStateCount":904,"predecessorStateSha256":"42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea","schema":"signthos.004c1bs.static-freeze.v1","stageCArgc":40,"stageCArgvJsonBytes":806,"stageCArgvSha256":"09ecbb18acb102a078f88fe533a5641e9fd0cbb080b9f225791f49991434aced","stageCRoots":["curl","build-essential","pkg-config","rsync"],"stageCRootsJsonSha256":"c0ee3f407b0591988df41f7dbe3d0bd975e32312079b221bf8414d74094d19d7","transportBytes":205568000,"transportSha256":"938d500c76b7c31927d70df28c98618d8b23f6e35559018c50ae1a8fc1b698de"}
```

## 9. Stage C parser sufficiency reconciliation

The currently canonical repaired APT simulator parser is exact `21835 / 8b5b6ac91bcc5de7c809bce9029b33cc02ab584eab87168c0ef46098945db584`, but it remains semantically and byte-bound to Stage B:

```text
CURRENT_PARSER_STAGE_ID = STAGE_B
CURRENT_PARSER_INSTALLED_PACKAGES_BYTES = 27625
CURRENT_PARSER_INSTALLED_PACKAGES_SHA256 = 14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7
CURRENT_PARSER_INSTALLED_PACKAGE_COUNT = 255
STAGE_C_REQUIRED_PREDECESSOR_STATE_BYTES = 98938
STAGE_C_REQUIRED_PREDECESSOR_STATE_SHA256 = 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea
STAGE_C_REQUIRED_PREDECESSOR_PACKAGE_COUNT = 904
CURRENT_PARSER_STAGE_C_SUFFICIENT = false
```

The mismatch is fail-closed. 004C1BS therefore **does not authorize Stage C Replay A**. A separately authorized, independently reviewed Stage C parser-freeze/qualification successor is required before any Stage C solver attempt may be authorized.

## 10. Future first-attempt/fail-closed contract

A future Stage C Replay A may occur only after a separately reviewed Stage C parser is canonically merged and Issue #7 separately grants one bounded execution attempt. The future run must reverify canonical main/frontier, local selected image/config/platform, all immutable inputs, the exact transport and Docker argv above, and a clean evidence root before launch.

The same-container order remains: input verification and extraction; helper/substrate checks; pre-inventory; exact hook query requiring exit 0 and empty stdout/stderr; exactly one Stage C `apt-get --simulate` invocation; raw APT/planner/process evidence preservation; post-inventory equality; deterministic evidence export; then host-side parsing only after raw evidence is immutable.

Any identity drift, nonzero hook/solver status, unexpected stderr, inventory mutation, missing planner evidence, helper/substrate mismatch, malformed evidence, parser failure/finding requiring escalation, or authority/frontier movement is nonqualifying and stops without retry. Replay B and virtual-state derivation are never implied by Replay A authority.

## 11. Static qualification result

```text
004C1BS_STAGE_C_INPUT_FREEZE = PASS
004C1BS_STAGE_C_ARGV_FREEZE = PASS
004C1BS_HOOK_FREEZE = PASS
004C1BS_GUEST_SCRIPT_FREEZE = PASS
004C1BS_DOCKER_ARGV_FREEZE = PASS
004C1BS_CROSS_DEVICE_DETERMINISM = PASS
004C1BS_CURRENT_PARSER_STAGE_C_SUFFICIENCY = FAIL_CLOSED_REQUIRES_SUCCESSOR
004C1BS_RESULT = PASS_STATIC_HARNESS_FREEZE_ONLY
STAGE_C_RUNTIME_RESULT = NOT_ESTABLISHED
PROJECT_COMPLETE = false
```

## Appendix A — exact static builder source

The following source is retained verbatim. Its exact identity is `6424 / 953913c9d410832bce0224dcbf7d88095de597f3feafa8375d12ce2ba0768a56`.

```python
#!/usr/bin/env python3
import base64, hashlib, importlib.util, io, json, lzma, pathlib, re, tarfile, urllib.request
P=pathlib.Path(__file__).parent
BASE_BUILDER=P/'signthos-004c1bk-builder.py'
if not BASE_BUILDER.exists(): BASE_BUILDER=pathlib.Path('/tmp/signthos-004c1bk-builder.py')
spec=importlib.util.spec_from_file_location('bk',BASE_BUILDER); bk=importlib.util.module_from_spec(spec); spec.loader.exec_module(bk)
MAIN='eb89121a27e2509ea4fc562921925509f95d14f9'
BR_URL=f'https://raw.githubusercontent.com/TheHalfMoon/Signthos/{MAIN}/specs/004-local-pdf-core/004c1br-stage-b-virtual-installed-state-derivation-qualification.md'
BM_URL=f'https://raw.githubusercontent.com/TheHalfMoon/Signthos/{MAIN}/specs/004-local-pdf-core/004c1bm-stage-b-apt-simulator-output-parser-qualification.md'
NEW_STATUS=(1027229,'ec5039354992576d69fa3529257684d759116385bf958cad36e1adec9a3fe7d3')
PRE_STATE=(98938,'42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea',904)
ROOTS=['curl','build-essential','pkg-config','rsync']
NEW_TRANSPORT=(205568000,'938d500c76b7c31927d70df28c98618d8b23f6e35559018c50ae1a8fc1b698de')
NEW_INVENTORY=(3524,'cd1c1f5b548d8617235b99be5c53efaf30d1c440a1ded8a8ec41efd7e8fd438b')
def sha(b): return hashlib.sha256(b).hexdigest()
def get(u): return urllib.request.urlopen(u,timeout=90).read()
def cjson(v): return (json.dumps(v,separators=(',',':'))+'\n').encode()
def br_status():
 t=get(BR_URL).decode(); payload=re.search(r'```base64\n(.*?)\n```',t,re.S).group(1); x=lzma.decompress(base64.b64decode(''.join(payload.split())))
 with tarfile.open(fileobj=io.BytesIO(x),mode='r:') as tf: b=tf.extractfile('virtual-dpkg-status').read()
 assert (len(b),sha(b))==NEW_STATUS; return b
def build_transport():
 aw,aq,bg,bj=(bk.get_doc(k) for k in ('aw','aq','bg','bj')); dirs,files=bk.parse_inputs(aw); rows=bk.parse_xz_rows(aq); content=bk.snapshot_content(files,rows)
 descriptor=b'Types: deb\nURIs: https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/\nSuites: jammy jammy-updates jammy-security\nComponents: main restricted universe multiverse\nArchitectures: amd64\nArchitectures-Remove: all\nLanguages: none\nTargets: Packages\n'
 status=br_status(); data={'/tmp/signthos-apt/etc/snapshot.sources':descriptor,'/tmp/signthos-apt/state/status':status,**content}
 new_files=dict(files); new_files['/tmp/signthos-apt/state/status']=(len(status),sha(status),0o644); inv=bk.inventory(dirs,new_files); transport=bk.make_transport(dirs,data)
 assert (len(inv),sha(inv))==NEW_INVENTORY; assert (len(transport),sha(transport))==NEW_TRANSPORT
 return aq,bg,inv,transport

def harness(aq,bg):
 roots_b=bk.parse_roots(aq); stage_b,_,hook,hook_json,bg_script,old_set=bk.control_surface(bg,roots_b); guest_b,docker_b,_=bk.freeze_harness(bg,stage_b,bg_script,old_set)
 i=stage_b.index('install'); stage_c=stage_b[:i+1]+['--no-install-recommends',*ROOTS]; old='set -- '+' '.join(stage_b); new='set -- '+' '.join(stage_c)
 guest=guest_b.replace('204800000',str(NEW_TRANSPORT[0])).replace(bk.NEW_TRANSPORT_SHA,NEW_TRANSPORT[1]).replace(bk.NEW_INVENTORY_SHA,NEW_INVENTORY[1]).replace(old,new)
 if old in guest or guest.count(new)!=1: raise RuntimeError('guest command replacement mismatch')
 docker=docker_b[:-1]+[guest]
 return stage_c,cjson(stage_c),hook,hook_json,guest,docker,cjson(docker)

if __name__=='__main__':
 import sys,ast
 aq,bg,inv,transport=build_transport()
 stage_c,stage_c_json,hook,hook_json,guest,docker,docker_json=harness(aq,bg)
 assert (len(stage_c),len(stage_c_json),sha(stage_c_json))==(40,806,'09ecbb18acb102a078f88fe533a5641e9fd0cbb080b9f225791f49991434aced')
 assert (len(hook),len(hook_json),sha(hook_json))==(38,822,'0cd1f39c05acd784eeba444f261b9b8303d9a8e90946eb6d7d58e00c717b1589')
 assert (len(guest.encode()),sha(guest.encode()))==(9568,'08d64ed373122b66149a5552f8d3c1e0c86617439670117b4b747e2a3a04a77e')
 assert (len(docker),len(docker_json),sha(docker_json))==(35,10568,'608c81601f125c356ea8551272f41ddfda978bf64947c3e063d190f32af7e370')
 bm=get(BM_URL); assert (len(bm),sha(bm))==(42898,'9c900b0005c11a866024eead485fc4f13263016527fadcfd77008cd17c68fd35')
 bm_parser=next(m.group(1) for m in re.finditer(rb'```python\n(.*?)```',bm,re.S) if sha(m.group(1))=='2fe9378cd97621ae141fa7f5252ac7741522ba930753fa5f25b557c3589e1e40')
 assert len(bm_parser)==21669
 bn=get(f'https://raw.githubusercontent.com/TheHalfMoon/Signthos/{MAIN}/specs/004-local-pdf-core/004c1bn-stage-b-apt-simulator-trailer-grammar-repair-qualification.md')
 assert (len(bn),sha(bn))==(38039,'5f35ec6fdc5db674ed7c56cb835c9f7c726be6b0f478ecfd75e73c4739995587')
 bn_py=[m.group(1).decode() for m in re.finditer(rb'```python\n(.*?)```',bn,re.S)]
 tree=ast.parse(bn_py[1]); vals={}
 for node in tree.body:
  if isinstance(node,ast.Assign) and len(node.targets)==1 and isinstance(node.targets[0],ast.Name) and node.targets[0].id in ('old','new') and isinstance(node.value,ast.Constant): vals[node.targets[0].id]=node.value.value
 parser_text=bm_parser.decode(); assert parser_text.count(vals['old'])==1; parser=(parser_text.replace(vals['old'],vals['new'],1)).encode()
 assert (len(parser),sha(parser))==(21835,'8b5b6ac91bcc5de7c809bce9029b33cc02ab584eab87168c0ef46098945db584')
 parser=parser.decode(); assert 'STAGE_ID = "STAGE_B"' in parser and '"installed_packages": {"bytes": 27625' in parser and '"count": 255' in parser
 if len(sys.argv)==3 and sys.argv[1]=='--output': pathlib.Path(sys.argv[2]).write_bytes(transport)
 result={'schema':'signthos.004c1bs.static-freeze.v1','canonicalMain':MAIN,'predecessorStateBytes':PRE_STATE[0],'predecessorStateSha256':PRE_STATE[1],'predecessorStateCount':PRE_STATE[2],'stageCRoots':ROOTS,'stageCRootsJsonSha256':sha(cjson(ROOTS)),'inputInventoryBytes':len(inv),'inputInventorySha256':sha(inv),'transportBytes':len(transport),'transportSha256':sha(transport),'stageCArgc':len(stage_c),'stageCArgvJsonBytes':len(stage_c_json),'stageCArgvSha256':sha(stage_c_json),'hookArgc':len(hook),'hookArgvJsonBytes':len(hook_json),'hookArgvSha256':sha(hook_json),'guestScriptBytes':len(guest.encode()),'guestScriptSha256':sha(guest.encode()),'dockerArgc':len(docker),'dockerArgvJsonBytes':len(docker_json),'dockerArgvSha256':sha(docker_json),'currentParserBytes':21835,'currentParserSha256':'8b5b6ac91bcc5de7c809bce9029b33cc02ab584eab87168c0ef46098945db584','currentParserStageId':'STAGE_B','currentParserStageCSufficient':False}
 print(json.dumps(result,sort_keys=True,separators=(',',':')))
```
