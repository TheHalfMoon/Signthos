# 004C1AQ — APT Configuration and Static Argv Contract Qualification

Status: `QUALIFICATION_CANDIDATE / EFFECTIVE_APT_CONFIG_PASS / STATIC_ARGV_CONTRACT_ONLY / ZERO_APT_GET_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `05cb911098dbf51f9e1965e1a5b897eaa25d7186`
Canonical base tree: `df8287090c69664e12ca10a21bff69d1b34c2fe1`
Primary authority source: `github:issue-comment:5609360956`
Repair authority source: `github:issue-comment:5609408547`

## 1. Purpose and exact authority

Canonical 004C1AP closes the exact `apt-get` executable identity required by 004C1AL. 004C1AQ closes only the next configuration-and-static-argv prerequisite: it measures `apt-config dump` under the exact bounded configuration overrides, repairs the two evidence gaps discovered during that measurement, and freezes deterministic future Stage A/B/C `apt-get` argv templates without executing `apt-get`.

```text
004C1AQ_AUTHORITY = BOUNDED_APT_CONFIG_MEASUREMENT_AND_STATIC_ARGV_CONTRACT_ONLY
004C1AQ_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1aq-apt-configuration-and-argv-contract-qualification.md
004C1AQ_MAX_CHANGED_REPOSITORY_FILES = 1
004C1AQ_INITIAL_CONFIG_REPLAYS = RETAINED_AS_EVIDENCE / NOT_RERUN_TO_GREEN
004C1AQ_LANGUAGE_RECHECK_REPLAYS = EXACTLY_TWO / COMPLETE
004C1AQ_004C1AG_METADATA_REPLAY = EXACT_CANONICAL_REPLAY / COMPLETE
APT_GET_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_CACHE_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
DPKG_OR_DPKG_QUERY_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_SOURCE_OR_LIST_READ_COMMAND = NOT_AUTHORIZED / NOT_PERFORMED
SNAPSHOT_LIST_MATERIALIZATION = NOT_AUTHORIZED / NOT_PERFORMED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = NOT_AUTHORIZED / NOT_PERFORMED
ROOTFS_EXTRACTION = NOT_AUTHORIZED / NOT_PERFORMED
NODE_TOOLCHAIN_PDFIUM_PROVIDER_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
REPOSITORY_EXTERNAL_BYTE_IMPORT = NOT_AUTHORIZED / NOT_PERFORMED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No external replay byte, package index, image layer, package archive, generated APT state, or static contract JSON is committed by this grain.

## 2. Canonical predecessor bindings

```text
CANONICAL_MAIN_AT_AQ_START = 05cb911098dbf51f9e1965e1a5b897eaa25d7186
CANONICAL_MAIN_TREE_AT_AQ_START = df8287090c69664e12ca10a21bff69d1b34c2fe1
004C1AP_PR = #160
004C1AP_REVIEWED_HEAD = fa42159123a38dd6ee1bf4c1780ad0f6d96f0a8b
004C1AP_MERGE = 05cb911098dbf51f9e1965e1a5b897eaa25d7186
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
TARGET_PLATFORM = linux/amd64
EXACT_APT_GET_PATH = /usr/bin/apt-get
EXACT_APT_GET_VERSION = apt 2.4.13 (amd64)
EXACT_APT_GET_SHA256 = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196
EXACT_APT_GET_FILE_BYTES = 51680
EXACT_APT_GET_MODE = 755
EXACT_APT_GET_UID_GID = 0:0
UBUNTU_SNAPSHOT_ID = 20260909T180000Z
004C1AG_ROOT_PACKAGE_SET_SHA256 = 2d3674e9676c03150f515de07a750f772e37925311bf2f11395d0c502616a8e0
004C1AG_RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
APT_STAGE_ORDER = [STAGE_A, STAGE_B, STAGE_C]
FLATTENED_SINGLE_TRANSACTION_MODEL = PROHIBITED
```

## 3. Initial execution preflight and exact config probe envelope

Immediately before the initial authorized Probe A:

```text
PREFLIGHT_TIME_UTC = 2026-09-09T22:03:36Z
CANONICAL_MAIN = 05cb911098dbf51f9e1965e1a5b897eaa25d7186
OPEN_PULL_REQUESTS = []
DOCKER_CLIENT_VERSION = 29.5.1
DOCKER_SERVER_VERSION = 29.7.2
DOCKER_SERVER_KERNEL = 7.0.12-linuxkit
DOCKER_SERVER_ARCH = arm64
SELECTED_IMAGE_LOCAL_INSPECT_RC = 0
SELECTED_IMAGE_PLATFORM = linux/amd64
```

Both initial probes used only `/usr/bin/apt-config dump`; no `apt-get`, `apt-cache`, `dpkg`, source-list reader, or package operation was invoked.

```text
PROBE_PULL_POLICY = never
PROBE_PLATFORM = linux/amd64
PROBE_NETWORK = none
PROBE_FILESYSTEM = read-only
PROBE_CAPABILITIES = drop-all
PROBE_NO_NEW_PRIVILEGES = required
PROBE_PIDS_LIMIT = 64
PROBE_HOST_MOUNTS = 0
PROBE_REPOSITORY_MOUNTS = 0
PROBE_ENTRYPOINT = /bin/sh
AUTHORIZED_GUEST_EXECUTABLE = /usr/bin/apt-config
AUTHORIZED_GUEST_OPERATION = dump
```

The exact ordered overrides were:

```text
Dir::Etc::sourcelist=/dev/null
Dir::Etc::sourceparts=-
Dir::State::lists=/tmp/signthos-apt/lists/
Dir::Cache::archives=/tmp/signthos-apt/cache/archives/
Dir::State::status=/tmp/signthos-apt/state/status
Dir::Log=/tmp/signthos-apt/log/
Debug::NoLocking=1
Acquire::Languages=none
Acquire::Retries=0
```

## 4. Initial `apt-config dump` replay pair

Probe A:

```text
PROBE_A_START_UTC = 2026-09-09T22:03:36Z
PROBE_A_END_UTC = 2026-09-09T22:03:37Z
PROBE_A_EXIT_STATUS = 0
PROBE_A_STDOUT_BYTES = 10891
PROBE_A_STDOUT_SHA256 = ecc166b8ba13022afe1923d3e2012d5eea86424d568142f8022535932e9f148f
PROBE_A_STDERR_BYTES = 0
PROBE_A_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
PROBE_A_CONTAINER_SET_UNCHANGED = TRUE
```

Probe B:

```text
PROBE_B_START_UTC = 2026-09-09T22:03:37Z
PROBE_B_END_UTC = 2026-09-09T22:03:37Z
PROBE_B_EXIT_STATUS = 0
PROBE_B_STDOUT_BYTES = 10891
PROBE_B_STDOUT_SHA256 = ecc166b8ba13022afe1923d3e2012d5eea86424d568142f8022535932e9f148f
PROBE_B_STDERR_BYTES = 0
PROBE_B_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
PROBE_B_CONTAINER_SET_UNCHANGED = TRUE
RAW_STDOUT_EQUAL = TRUE
FINAL_CONTAINER_SET_UNCHANGED = TRUE
```

The initial scalar extraction established every override except that `Acquire::Languages` had an empty parent scalar. Treating that scalar as equivalent to `none` would have been an unsupported inference, so completion stopped and Issue #7 repair authority `github:issue-comment:5609408547` was obtained.

## 5. Repair recheck — exact `Acquire::Languages` serialization

The repair authority permitted exactly two identical replays of the original `apt-config dump` argv, with host-side filtering only. No new guest executable was introduced.

```text
REPAIR_PREFLIGHT_UTC = 2026-09-09T22:08:06Z
CANONICAL_MAIN = 05cb911098dbf51f9e1965e1a5b897eaa25d7186
OPEN_PULL_REQUESTS = []
RECHECK_A_EXIT_STATUS = 0
RECHECK_A_STDOUT_BYTES = 10891
RECHECK_A_STDOUT_SHA256 = ecc166b8ba13022afe1923d3e2012d5eea86424d568142f8022535932e9f148f
RECHECK_A_MATCH_INITIAL_HASH = TRUE
RECHECK_B_EXIT_STATUS = 0
RECHECK_B_STDOUT_BYTES = 10891
RECHECK_B_STDOUT_SHA256 = ecc166b8ba13022afe1923d3e2012d5eea86424d568142f8022535932e9f148f
RECHECK_B_MATCH_INITIAL_HASH = TRUE
RECHECK_OUTPUTS_EQUAL = TRUE
ALL_RECHECKS_MATCH_INITIAL = TRUE
```

The exact serialization contains both lines below, in this order:

```text
Acquire::Languages "";
Acquire::Languages:: "none";
```

Therefore 004C1AQ records the serialization exactly. It does **not** rewrite the empty parent scalar as `none`. The command-line override remains exactly `Acquire::Languages=none`, and the observed child-list member is exactly `Acquire::Languages:: "none";`.

The effective observed configuration facts used by the static contract are:

```text
Dir::Etc::sourcelist = /dev/null
Dir::Etc::sourceparts = -
Dir::State::lists = /tmp/signthos-apt/lists/
Dir::Cache::archives = /tmp/signthos-apt/cache/archives/
Dir::State::status = /tmp/signthos-apt/state/status
Dir::Log = /tmp/signthos-apt/log/
Debug::NoLocking = 1
Acquire::Languages parent scalar = ""
Acquire::Languages list member = "none"
Acquire::Retries = 0
APT_CONFIG_DUMP_BYTES = 10891
APT_CONFIG_DUMP_SHA256 = ecc166b8ba13022afe1923d3e2012d5eea86424d568142f8022535932e9f148f
```

## 6. Repair replay — canonical 004C1AG metadata and root-set recovery

Issue #7 repair authority required the exact canonical 004C1AG resolver v2, not a newly invented root policy.

```text
RESOLVER_SOURCE = github:issue-comment:5607783345 / exact python code fence
RESOLVER_BYTES = 22258
RESOLVER_SHA256 = 8c0150e2054091eba165f56a0576fac62b213a618ff2f0b6f885faa59bd581c2
RESOLVER_EXPECTED_SHA256 = 8c0150e2054091eba165f56a0576fac62b213a618ff2f0b6f885faa59bd581c2
RESOLVER_IDENTITY_MATCH = PASS
REPLAY_PREFLIGHT_UTC = 2026-09-09T22:18:20Z
REPLAY_CANONICAL_MAIN = 05cb911098dbf51f9e1965e1a5b897eaa25d7186
REPLAY_OPEN_PULL_REQUESTS = []
REPLAY_START_UTC = 2026-09-09T22:18:20Z
REPLAY_END_UTC = 2026-09-09T22:19:50Z
REPLAY_EXIT_STATUS = 0
REPLAY_STDOUT_BYTES = 427
REPLAY_STDOUT_SHA256 = 9d3f5739c6c14c36f4fcdef01a3fc169433c84f8c6b7aa78a77fd49d23b29b84
REPLAY_STDERR_BYTES = 0
REPLAY_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The exact Ubuntu archive key binding passed:

```text
UBUNTU_ARCHIVE_KEYRING_BYTES = 3607
UBUNTU_ARCHIVE_KEYRING_SHA256 = 80a36b0a6de2f69f49d2df75ef473ccde121e9e190b9ea01d20a4f63778d5c31
KEY_IDENTITY_BINDING = PASS
KEY_FINGERPRINTS = [
  790BC7277767219C42C86F933B4FE6ACC0B21F32,
  843938DF228D22F7B3742BC0D94AA3F0EFE21092,
  F6ECB3762474EDA9D21B7022871920D1991BC93C
]
```

All three exact InRelease objects passed `gpgv` verification with the Ubuntu Archive Automatic Signing Key (2018):

| Suite | Bytes | SHA-256 |
| --- | ---: | --- |
| `jammy` | 270087 | `c14060cd8c6d625874dfcb9523a35a395bf4865c28b6b6a82569ef326fe92dc6` |
| `jammy-updates` | 128049 | `78e5c7e6f16f418c394d2d6caa4d8d10fafa715b08b038c02a8c73cd6dc4587b` |
| `jammy-security` | 128927 | `b2eb2336d267611f596e47fe9bad879db22371598047363db841d8f5f586d450` |

The twelve signed package-index identities also matched the canonical 004C1AG replay:

| Suite | Component | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `jammy` | `main` | 1394768 | `37cb57f1554cbfa71c5a29ee9ffee18a9a8c1782bb0568e0874b7ff4ce8f9c11` |
| `jammy` | `restricted` | 129256 | `92102b5d9dfb7804293891528d5e57c3d05949df71af613d4f99fcb7d6a3f488` |
| `jammy` | `universe` | 14090084 | `d29cb24c93fec5f43255706bce7eb46d4779952039d8c68ac1bb14a6f3655ce2` |
| `jammy` | `multiverse` | 216948 | `e24bf9b5daf5387aa5311f69367b248b1d46d37d72480760f91f5a312c7eb43c` |
| `jammy-updates` | `main` | 3794492 | `fc3ca7fd8c51bfcaef4c60146d82f07771d5c81843def876d3b4296acffad473` |
| `jammy-updates` | `restricted` | 6542404 | `a9d99a9e6dd5952ec639e7e28763275c3aa5df18b69f06973cc3c6ab1fac434d` |
| `jammy-updates` | `universe` | 1282472 | `e63677ef4f3f73a0ac7ac29be177222ddb2bf169ba0fe2bc16448342f71a53db` |
| `jammy-updates` | `multiverse` | 76800 | `eb52bf4941c406f9d9fe486128453060fadb2d0172750cbe84f2896d1ecf4e71` |
| `jammy-security` | `main` | 3526324 | `6fed35b19b0a467d391330554308eb2bcfc679a13604635f3298dd8ef383e7a4` |
| `jammy-security` | `restricted` | 6304508 | `c82967cb499e44f680aa67fd9972db8a396eed44d3733261ccdc8b3dd57a8287` |
| `jammy-security` | `universe` | 1048048 | `c06fe8a63c3debf947fd2f717d369e9c205f31a0eea25d07e8b92e106ee84757` |
| `jammy-security` | `multiverse` | 69092 | `8b79f9054d123125a830170dbaea7c7053572dba1a0f9187313c5229245ae384` |

Replay outputs matched canonical 004C1AG exactly:

```text
ROOT_COUNT = 158
CHROMIUM_ROOT_COUNT = 145
DOCKER_ROOT_COUNT = 15
RESOLVED_PACKAGE_COUNT = 910
RESOLVED_ARCHIVE_TOTAL_BYTES = 339373120
ROOT_PACKAGE_SET_BYTES = 21892
ROOT_PACKAGE_SET_SHA256 = 2d3674e9676c03150f515de07a750f772e37925311bf2f11395d0c502616a8e0
RESOLVED_CLOSURE_BYTES = 293999
RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
EVIDENCE_MANIFEST_BYTES = 4640
EVIDENCE_MANIFEST_SHA256 = b81ab60d70f3afa0027e6b688d38162c40d726a55ea9ae544f08169ffd09332f
004C1AQ_METADATA_REPLAY_RESULT = PASS
```

This replay was external evidence only. None of these bytes is imported into Signthos.

## 7. Exact ordered release stage roots

Stage order remains exactly:

```text
APT_STAGE_ORDER = [STAGE_A, STAGE_B, STAGE_C]
CANONICAL_RELEASE_APT_STAGE_COUNT = 3
FLATTENED_SINGLE_TRANSACTION_MODEL = PROHIBITED
REPEATED_ROOTS_MUST_REMAIN_STAGE_VISIBLE = true
CROSS_STAGE_CONFLICTS_BREAKS_MUST_REMAIN_VISIBLE = true
```

### Stage A — EmbedPDF `emsdk-base`

```text
STAGE_A_ROOT_COUNT = 12
STAGE_A_RECOMMENDS_POLICY = NO_INSTALL_RECOMMENDS
STAGE_A_ROOTS = [
  pkg-config
  autoconf
  automake
  libtool
  ragel
  git
  yasm
  subversion
  lsb-release
  tzdata
  keyboard-configuration
  tini
]
```

### Stage B — canonical Chromium build dependencies

The sequence below is consumed directly from the exact replayed canonical 004C1AG `chromium_roots` array. No new root-selection policy is applied.

```text
STAGE_B_ROOT_COUNT = 145
STAGE_B_RECOMMENDS_POLICY = DEFAULT_APT_RECOMMENDS
STAGE_B_I386_MULTIARCH = false
STAGE_B_TARGET_ARCHITECTURE = amd64
STAGE_B_ROOTS = [
  at-spi2-core
  autoconf
  binutils
  binutils-aarch64-linux-gnu
  binutils-arm-linux-gnueabihf
  binutils-mips64el-linux-gnuabi64
  binutils-mipsel-linux-gnu
  bison
  bzip2
  cdbs
  curl
  dbus-x11
  devscripts
  dpkg-dev
  elfutils
  fakeroot
  fd-find
  flex
  git-core
  gperf
  lib32gcc-s1
  lib32stdc++6
  lib32z1
  libasound2
  libasound2-dev
  libatk1.0-0
  libatspi2.0-0
  libatspi2.0-dev
  libbluetooth-dev
  libbrlapi-dev
  libbrlapi0.8
  libbz2-1.0
  libbz2-dev
  libc6
  libc6-dev
  libc6-i386
  libcairo2
  libcairo2-dev
  libcap-dev
  libcap2
  libcgi-session-perl
  libcups2
  libcups2-dev
  libcurl4-gnutls-dev
  libdrm-dev
  libdrm2
  libegl1
  libelf-dev
  libevdev-dev
  libevdev2
  libexpat1
  libffi-dev
  libffi8
  libfontconfig1
  libfreetype6
  libfuse2
  libgbm-dev
  libgbm1
  libgl1
  libglib2.0-0
  libglib2.0-dev
  libglu1-mesa-dev
  libgraphene-1.0-0
  libgtk-3-0
  libgtk-3-dev
  libinput-dev
  libinput10
  libjpeg-dev
  libkrb5-dev
  libncurses6
  libnspr4
  libnspr4-dev
  libnss3
  libnss3-dev
  libpam0g
  libpam0g-dev
  libpango-1.0-0
  libpangocairo-1.0-0
  libpci-dev
  libpci3
  libpixman-1-0
  libpng16-16
  libpulse-dev
  libpulse0
  libsctp-dev
  libspeechd-dev
  libspeechd2
  libsqlite3-0
  libsqlite3-dev
  libssl-dev
  libstdc++6
  libsystemd-dev
  libudev-dev
  libudev1
  libuuid1
  libva-dev
  libvulkan-dev
  libvulkan1
  libwayland-egl1
  libwww-perl
  libx11-6
  libx11-xcb1
  libxau6
  libxcb1
  libxcomposite1
  libxcursor1
  libxdamage1
  libxdmcp6
  libxext6
  libxfixes3
  libxi6
  libxinerama1
  libxkbcommon-dev
  libxrandr2
  libxrender1
  libxshmfence-dev
  libxslt1-dev
  libxss-dev
  libxt-dev
  libxtst-dev
  libxtst6
  lighttpd
  locales
  mesa-common-dev
  mutter-common
  openbox
  p7zip
  patch
  perl
  pkgconf
  ripgrep
  rpm
  ruby
  uuid-dev
  wdiff
  x11-utils
  x11-xserver-utils
  xcompmgr
  xserver-xorg-core
  xserver-xorg-video-dummy
  xvfb
  xz-utils
  zip
  zlib1g
  zstd
]
```

### Stage C — EmbedPDF `pdfium-deps`

```text
STAGE_C_ROOT_COUNT = 4
STAGE_C_RECOMMENDS_POLICY = NO_INSTALL_RECOMMENDS
STAGE_C_ROOTS = [
  curl
  build-essential
  pkg-config
  rsync
]
```

`pkg-config` remains intentionally repeated in Stage A and Stage C. It is not deduplicated across stages.

## 8. Static future `apt-get` argv contract — not executed

Every argv below is a static template only. 004C1AQ did not execute `/usr/bin/apt-get` in any mode.

The common prefix is:

```text
/usr/bin/apt-get
--simulate
--no-download
-o Dir::Etc::sourcelist=/dev/null
-o Dir::Etc::sourceparts=-
-o Dir::State::lists=/tmp/signthos-apt/lists/
-o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/
-o Dir::State::status=/tmp/signthos-apt/state/status
-o Dir::Log=/tmp/signthos-apt/log/
-o Debug::NoLocking=1
-o Acquire::Languages=none
-o Acquire::Retries=0
install
```

Stage A and Stage C then append `--no-install-recommends` and their exact ordered roots. Stage B appends no recommends override and therefore preserves default APT Recommends behavior before its exact 145 ordered roots.

### Stage A exact argv

```json
["/usr/bin/apt-get","--simulate","--no-download","-o","Dir::Etc::sourcelist=/dev/null","-o","Dir::Etc::sourceparts=-","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","--no-install-recommends","pkg-config","autoconf","automake","libtool","ragel","git","yasm","subversion","lsb-release","tzdata","keyboard-configuration","tini"]

```

### Stage B exact argv

```json
["/usr/bin/apt-get","--simulate","--no-download","-o","Dir::Etc::sourcelist=/dev/null","-o","Dir::Etc::sourceparts=-","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","at-spi2-core","autoconf","binutils","binutils-aarch64-linux-gnu","binutils-arm-linux-gnueabihf","binutils-mips64el-linux-gnuabi64","binutils-mipsel-linux-gnu","bison","bzip2","cdbs","curl","dbus-x11","devscripts","dpkg-dev","elfutils","fakeroot","fd-find","flex","git-core","gperf","lib32gcc-s1","lib32stdc++6","lib32z1","libasound2","libasound2-dev","libatk1.0-0","libatspi2.0-0","libatspi2.0-dev","libbluetooth-dev","libbrlapi-dev","libbrlapi0.8","libbz2-1.0","libbz2-dev","libc6","libc6-dev","libc6-i386","libcairo2","libcairo2-dev","libcap-dev","libcap2","libcgi-session-perl","libcups2","libcups2-dev","libcurl4-gnutls-dev","libdrm-dev","libdrm2","libegl1","libelf-dev","libevdev-dev","libevdev2","libexpat1","libffi-dev","libffi8","libfontconfig1","libfreetype6","libfuse2","libgbm-dev","libgbm1","libgl1","libglib2.0-0","libglib2.0-dev","libglu1-mesa-dev","libgraphene-1.0-0","libgtk-3-0","libgtk-3-dev","libinput-dev","libinput10","libjpeg-dev","libkrb5-dev","libncurses6","libnspr4","libnspr4-dev","libnss3","libnss3-dev","libpam0g","libpam0g-dev","libpango-1.0-0","libpangocairo-1.0-0","libpci-dev","libpci3","libpixman-1-0","libpng16-16","libpulse-dev","libpulse0","libsctp-dev","libspeechd-dev","libspeechd2","libsqlite3-0","libsqlite3-dev","libssl-dev","libstdc++6","libsystemd-dev","libudev-dev","libudev1","libuuid1","libva-dev","libvulkan-dev","libvulkan1","libwayland-egl1","libwww-perl","libx11-6","libx11-xcb1","libxau6","libxcb1","libxcomposite1","libxcursor1","libxdamage1","libxdmcp6","libxext6","libxfixes3","libxi6","libxinerama1","libxkbcommon-dev","libxrandr2","libxrender1","libxshmfence-dev","libxslt1-dev","libxss-dev","libxt-dev","libxtst-dev","libxtst6","lighttpd","locales","mesa-common-dev","mutter-common","openbox","p7zip","patch","perl","pkgconf","ripgrep","rpm","ruby","uuid-dev","wdiff","x11-utils","x11-xserver-utils","xcompmgr","xserver-xorg-core","xserver-xorg-video-dummy","xvfb","xz-utils","zip","zlib1g","zstd"]

```

### Stage C exact argv

```json
["/usr/bin/apt-get","--simulate","--no-download","-o","Dir::Etc::sourcelist=/dev/null","-o","Dir::Etc::sourceparts=-","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","--no-install-recommends","curl","build-essential","pkg-config","rsync"]

```

The static argv templates deliberately include `--simulate` and `--no-download`. They do not contain `update`, `download`, `clean`, package installation authorization, source refresh, or live-network behavior.

## 9. Deterministic serialization and identities

The contract uses the following deterministic serialization rule:

```text
schema = signthos.004c1aq.apt-simulation-contract.v1
encoding = UTF-8
json_object_key_order = lexicographic / sort_keys=true
json_separators = comma + colon / no insignificant whitespace
ensure_ascii = false
array_order = preserved exactly
line_ending = LF
trailing_newline = true
```

Arrays are semantically ordered. Reordering roots, overrides, argv elements, stages, or capability entries changes identity.

```text
APT_CONFIG_DUMP_BYTES = 10891
APT_CONFIG_DUMP_SHA256 = ecc166b8ba13022afe1923d3e2012d5eea86424d568142f8022535932e9f148f
STAGE_A_ROOTS_SHA256 = 410065f69855eae58ab4daef3cadc253fb3284a9eb4f75537b2c1bace9d5a649
STAGE_A_ARGV_COUNT = 35
STAGE_A_ARGV_SHA256 = f9f089dfe777ef80d1f08031cea31fb9dfc4b3442bba6b79d10f8d6256417874
STAGE_B_ROOTS_SHA256 = f354c23dc9671e5d1daf0db5158b7f1eef0afc205b7620c67ecd948da23b8184
STAGE_B_ARGV_COUNT = 167
STAGE_B_ARGV_SHA256 = 879202f796dbbbc0241e031cdadae958ff4eb39e8f2c72650f807ce0773ba4ec
STAGE_C_ROOTS_SHA256 = c0ee3f407b0591988df41f7dbe3d0bd975e32312079b221bf8414d74094d19d7
STAGE_C_ARGV_COUNT = 27
STAGE_C_ARGV_SHA256 = 22b0700f2018ca84b2bdd0debe44a78108dcd542fce7831bad4eebb344eb4e58
STATIC_CONTRACT_JSON_BYTES = 7582
STATIC_CONTRACT_JSON_SHA256 = 8be0106e5ab1ff0770e60c41d26a7ecf41c8abd9f1829e8f857a9f5372a3c2e9
```

The external static contract object contains exactly these classes of fields:

```text
schema
serialization
aptGet { path, version, sha256, bytes, mode, uid, gid }
aptConfiguration { probeExecutable, operation, overridesOrdered, dumpBytes, dumpSha256, languageSerializationLines }
containerEnvelope { platform, pull, network, readOnly, capDrop, noNewPrivileges, pidsLimit, hostMounts, repositoryMounts }
stages[] { stageId, requestedRootsOrdered, requestedRootsSha256, recommendsPolicy, argv, argvSha256 }
```

### Exact canonical static-contract JSON payload

The byte identity above is defined by the exact payload below. To reconstruct it, take only the UTF-8 content between the `json` fences, excluding the fences themselves, and append exactly one `LF` byte (`0x0A`) after the single JSON line. Do not pretty-print, normalize, rename, reinterpret, or reorder any field or array.

```json
{"aptConfiguration":{"dumpBytes":10891,"dumpSha256":"ecc166b8ba13022afe1923d3e2012d5eea86424d568142f8022535932e9f148f","languageSerializationLines":["Acquire::Languages \"\";","Acquire::Languages:: \"none\";"],"operation":"dump","overridesOrdered":["Dir::Etc::sourcelist=/dev/null","Dir::Etc::sourceparts=-","Dir::State::lists=/tmp/signthos-apt/lists/","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","Dir::State::status=/tmp/signthos-apt/state/status","Dir::Log=/tmp/signthos-apt/log/","Debug::NoLocking=1","Acquire::Languages=none","Acquire::Retries=0"],"probeExecutable":"/usr/bin/apt-config"},"aptGet":{"bytes":51680,"gid":0,"mode":"755","path":"/usr/bin/apt-get","sha256":"9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196","uid":0,"version":"apt 2.4.13 (amd64)"},"containerEnvelope":{"capDrop":["ALL"],"hostMounts":0,"network":"none","noNewPrivileges":true,"pidsLimit":64,"platform":"linux/amd64","pull":"never","readOnly":true,"repositoryMounts":0},"schema":"signthos.004c1aq.apt-simulation-contract.v1","serialization":{"encoding":"UTF-8","json":"sort_keys=true,separators=(comma,colon),ensure_ascii=false","lineEnding":"LF","trailingNewline":true},"stages":[{"argv":["/usr/bin/apt-get","--simulate","--no-download","-o","Dir::Etc::sourcelist=/dev/null","-o","Dir::Etc::sourceparts=-","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","--no-install-recommends","pkg-config","autoconf","automake","libtool","ragel","git","yasm","subversion","lsb-release","tzdata","keyboard-configuration","tini"],"argvSha256":"f9f089dfe777ef80d1f08031cea31fb9dfc4b3442bba6b79d10f8d6256417874","recommendsPolicy":"NO_INSTALL_RECOMMENDS","requestedRootsOrdered":["pkg-config","autoconf","automake","libtool","ragel","git","yasm","subversion","lsb-release","tzdata","keyboard-configuration","tini"],"requestedRootsSha256":"410065f69855eae58ab4daef3cadc253fb3284a9eb4f75537b2c1bace9d5a649","stageId":"STAGE_A"},{"argv":["/usr/bin/apt-get","--simulate","--no-download","-o","Dir::Etc::sourcelist=/dev/null","-o","Dir::Etc::sourceparts=-","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","at-spi2-core","autoconf","binutils","binutils-aarch64-linux-gnu","binutils-arm-linux-gnueabihf","binutils-mips64el-linux-gnuabi64","binutils-mipsel-linux-gnu","bison","bzip2","cdbs","curl","dbus-x11","devscripts","dpkg-dev","elfutils","fakeroot","fd-find","flex","git-core","gperf","lib32gcc-s1","lib32stdc++6","lib32z1","libasound2","libasound2-dev","libatk1.0-0","libatspi2.0-0","libatspi2.0-dev","libbluetooth-dev","libbrlapi-dev","libbrlapi0.8","libbz2-1.0","libbz2-dev","libc6","libc6-dev","libc6-i386","libcairo2","libcairo2-dev","libcap-dev","libcap2","libcgi-session-perl","libcups2","libcups2-dev","libcurl4-gnutls-dev","libdrm-dev","libdrm2","libegl1","libelf-dev","libevdev-dev","libevdev2","libexpat1","libffi-dev","libffi8","libfontconfig1","libfreetype6","libfuse2","libgbm-dev","libgbm1","libgl1","libglib2.0-0","libglib2.0-dev","libglu1-mesa-dev","libgraphene-1.0-0","libgtk-3-0","libgtk-3-dev","libinput-dev","libinput10","libjpeg-dev","libkrb5-dev","libncurses6","libnspr4","libnspr4-dev","libnss3","libnss3-dev","libpam0g","libpam0g-dev","libpango-1.0-0","libpangocairo-1.0-0","libpci-dev","libpci3","libpixman-1-0","libpng16-16","libpulse-dev","libpulse0","libsctp-dev","libspeechd-dev","libspeechd2","libsqlite3-0","libsqlite3-dev","libssl-dev","libstdc++6","libsystemd-dev","libudev-dev","libudev1","libuuid1","libva-dev","libvulkan-dev","libvulkan1","libwayland-egl1","libwww-perl","libx11-6","libx11-xcb1","libxau6","libxcb1","libxcomposite1","libxcursor1","libxdamage1","libxdmcp6","libxext6","libxfixes3","libxi6","libxinerama1","libxkbcommon-dev","libxrandr2","libxrender1","libxshmfence-dev","libxslt1-dev","libxss-dev","libxt-dev","libxtst-dev","libxtst6","lighttpd","locales","mesa-common-dev","mutter-common","openbox","p7zip","patch","perl","pkgconf","ripgrep","rpm","ruby","uuid-dev","wdiff","x11-utils","x11-xserver-utils","xcompmgr","xserver-xorg-core","xserver-xorg-video-dummy","xvfb","xz-utils","zip","zlib1g","zstd"],"argvSha256":"879202f796dbbbc0241e031cdadae958ff4eb39e8f2c72650f807ce0773ba4ec","recommendsPolicy":"DEFAULT_APT_RECOMMENDS","requestedRootsOrdered":["at-spi2-core","autoconf","binutils","binutils-aarch64-linux-gnu","binutils-arm-linux-gnueabihf","binutils-mips64el-linux-gnuabi64","binutils-mipsel-linux-gnu","bison","bzip2","cdbs","curl","dbus-x11","devscripts","dpkg-dev","elfutils","fakeroot","fd-find","flex","git-core","gperf","lib32gcc-s1","lib32stdc++6","lib32z1","libasound2","libasound2-dev","libatk1.0-0","libatspi2.0-0","libatspi2.0-dev","libbluetooth-dev","libbrlapi-dev","libbrlapi0.8","libbz2-1.0","libbz2-dev","libc6","libc6-dev","libc6-i386","libcairo2","libcairo2-dev","libcap-dev","libcap2","libcgi-session-perl","libcups2","libcups2-dev","libcurl4-gnutls-dev","libdrm-dev","libdrm2","libegl1","libelf-dev","libevdev-dev","libevdev2","libexpat1","libffi-dev","libffi8","libfontconfig1","libfreetype6","libfuse2","libgbm-dev","libgbm1","libgl1","libglib2.0-0","libglib2.0-dev","libglu1-mesa-dev","libgraphene-1.0-0","libgtk-3-0","libgtk-3-dev","libinput-dev","libinput10","libjpeg-dev","libkrb5-dev","libncurses6","libnspr4","libnspr4-dev","libnss3","libnss3-dev","libpam0g","libpam0g-dev","libpango-1.0-0","libpangocairo-1.0-0","libpci-dev","libpci3","libpixman-1-0","libpng16-16","libpulse-dev","libpulse0","libsctp-dev","libspeechd-dev","libspeechd2","libsqlite3-0","libsqlite3-dev","libssl-dev","libstdc++6","libsystemd-dev","libudev-dev","libudev1","libuuid1","libva-dev","libvulkan-dev","libvulkan1","libwayland-egl1","libwww-perl","libx11-6","libx11-xcb1","libxau6","libxcb1","libxcomposite1","libxcursor1","libxdamage1","libxdmcp6","libxext6","libxfixes3","libxi6","libxinerama1","libxkbcommon-dev","libxrandr2","libxrender1","libxshmfence-dev","libxslt1-dev","libxss-dev","libxt-dev","libxtst-dev","libxtst6","lighttpd","locales","mesa-common-dev","mutter-common","openbox","p7zip","patch","perl","pkgconf","ripgrep","rpm","ruby","uuid-dev","wdiff","x11-utils","x11-xserver-utils","xcompmgr","xserver-xorg-core","xserver-xorg-video-dummy","xvfb","xz-utils","zip","zlib1g","zstd"],"requestedRootsSha256":"f354c23dc9671e5d1daf0db5158b7f1eef0afc205b7620c67ecd948da23b8184","stageId":"STAGE_B"},{"argv":["/usr/bin/apt-get","--simulate","--no-download","-o","Dir::Etc::sourcelist=/dev/null","-o","Dir::Etc::sourceparts=-","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","--no-install-recommends","curl","build-essential","pkg-config","rsync"],"argvSha256":"22b0700f2018ca84b2bdd0debe44a78108dcd542fce7831bad4eebb344eb4e58","recommendsPolicy":"NO_INSTALL_RECOMMENDS","requestedRootsOrdered":["curl","build-essential","pkg-config","rsync"],"requestedRootsSha256":"c0ee3f407b0591988df41f7dbe3d0bd975e32312079b221bf8414d74094d19d7","stageId":"STAGE_C"}]}
```

The resulting payload is exactly `7582` bytes and SHA-256 `8be0106e5ab1ff0770e60c41d26a7ecf41c8abd9f1829e8f857a9f5372a3c2e9`. This embedded byte-complete representation is the canonical static-contract object for 004C1AQ. The separately generated external JSON file is not committed.

The object is evidence-derived and external except for this exact textual representation inside the Signthos-authored qualification record. No runtime or package byte is imported.

## 10. Execution and mutation accounting

```text
INITIAL_APT_CONFIG_PROBE_COUNT = 2
AUTHORIZED_LANGUAGE_RECHECK_APT_CONFIG_PROBE_COUNT = 2
TOTAL_APT_CONFIG_DUMP_EXECUTIONS = 4
APT_CONFIG_REPAIR_RERUN_TO_GREEN = false
APT_GET_EXECUTION_COUNT = 0
APT_CACHE_EXECUTION_COUNT = 0
DPKG_EXECUTION_COUNT = 0
APT_SIMULATION_EXECUTION_COUNT = 0
SNAPSHOT_LIST_MATERIALIZATION_COUNT = 0
PACKAGE_ARCHIVE_DOWNLOAD_COUNT = 0
PACKAGE_INSTALL_COUNT = 0
PACKAGE_UNPACK_COUNT = 0
PACKAGE_CONFIGURE_COUNT = 0
IMAGE_PROVISIONING_COUNT = 0
PDFIUM_BUILD_EXECUTION_COUNT = 0
REPOSITORY_EXTERNAL_BYTE_IMPORT_COUNT = 0
```

The metadata replay performed authorized HTTPS reads of exact immutable/public Ubuntu snapshot and already-bound upstream metadata only. That is not an APT source/list command, package archive acquisition, package installation, or repository import.

## 11. Qualification result

```text
004C1AQ_RESULT = PASS_EFFECTIVE_APT_CONFIGURATION_AND_STATIC_ARGV_CONTRACT
APT_CONFIG_REPLAY_DETERMINISM = PASS
LANGUAGE_SERIALIZATION_REPAIR = PASS
004C1AG_METADATA_REPLAY = PASS
CANONICAL_STAGE_ROOT_RECOVERY = PASS
STATIC_ARGV_IDENTITY = PASS
APT_GET_EXECUTED = false
APT_SIMULATION_EXECUTED = false
SNAPSHOT_LIST_MATERIALIZED_FOR_APT = false
WRITABLE_APT_STATE_PREPARED = false
EFFECTIVE_APT_TRANSACTION = NOT_ESTABLISHED
```

004C1AQ closes only configuration and static argv identity for the exact current predecessor state. It does not establish solver behavior, package actions, an effective transaction, package filesystem effects, or a provisioned image.

## 12. Successor boundary

A successful 004C1AQ merge grants no authority by numbering. Fresh post-merge Issue #7 reconciliation must choose the smallest next prerequisite from live canonical truth.

At minimum, future solver execution still lacks separately authorized snapshot-list materialization into isolated APT state and any writable-state preparation required to make the static argv executable under the 004C1AL zero-network contract.

```text
SNAPSHOT_LIST_MATERIALIZATION_AUTHORITY = ABSENT
WRITABLE_APT_STATE_PREPARATION_AUTHORITY = ABSENT
APT_GET_EXECUTION_AUTHORITY = ABSENT
APT_SIMULATION_EXECUTION_AUTHORITY = ABSENT
PACKAGE_ACTION_AUTHORITY = ABSENT
IMAGE_PROVISIONING_AUTHORITY = ABSENT
PDFIUM_BUILD_EXECUTION_AUTHORITY = ABSENT
004C2_AUTHORITY = ABSENT
004D_AUTHORITY = ABSENT
SPECIFICATION_005_AUTHORITY = ABSENT
```

## 13. Merge gates

004C1AQ remains a candidate until one exact final head satisfies all of the following:

1. re-read canonical `main`, Issue #7 authority, and zero-competing-successor-PR state;
2. prove the base-to-head surface is exactly this one authorized file;
3. run `git diff --check` successfully;
4. bind exact document byte count, line count, SHA-256, head SHA, tree SHA, and commit ancestry;
5. account for every exact-head provider/check result without treating skipped, neutral, unavailable, billing-blocked, rate-limited, or summary-only output as approval;
6. obtain a fresh independent substantive exact-head review covering both base authority and repair authority;
7. repair every material finding forward-only and repeat exact-head evidence/review after each repair;
8. have zero unresolved material review threads;
9. perform an immediate premerge main/base/head/open-PR race proof;
10. merge normally using the exact reviewed `expected_head_sha` without rebase, squash, force push, or history rewrite;
11. mechanically verify the post-merge tree, ordered parents, signature, changed surface, and PR state;
12. perform fresh Issue #7 successor reconciliation before any snapshot materialization or APT execution authority is inferred.
