# 004C1CB — Package Provisioning Execution Harness Freeze Qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_DETERMINISTIC_PACKAGE_PROVISIONING_EXECUTION_HARNESS_FREEZE_ONLY / ZERO_RUNTIME_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `7d096d947869ed93676c558c3a9c70e25962f46a`
Canonical base tree: `621c6fa3776d60939e16316c58e20aa00b4e919e`
Authority source: `github:issue-comment:5636128786`

## 1. Exact authority boundary

004C1CA closed the immediate pre-provisioning substrate/image-locality freshness gate but granted no installation authority. 004C1BZ closed only the solver-model final virtual installed state. 004C1CB freezes the smallest future package-provisioning execution harness as data and validates it statically.

```text
004C1CB_AUTHORITY = STATIC_DETERMINISTIC_PACKAGE_PROVISIONING_EXECUTION_HARNESS_FREEZE_ONLY
004C1CB_MAX_CHANGED_REPOSITORY_FILES = 1
DOCKER_CONTAINER_EXECUTION = 0
DOCKER_IMAGE_PULL_LOAD_BUILD_COMMIT = 0
APT_GET_APT_CACHE_APT_CONFIG_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = 0
MAINTAINER_SCRIPT_OR_TRIGGER_EXECUTION = 0
NODE_TOOLCHAIN_SOURCE_PDFIUM_PROVIDER_EXECUTION = 0
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No runtime command described below was executed while producing this candidate.

## 2. Offline provisioning is mandatory

The canonical solver chain used `--network none` and deliberately prohibited dpkg. A real installation cannot reuse those simulation argv bytes verbatim. Allowing broad network access solely for APT downloads would weaken the provenance contract. Therefore the frozen future provisioning harness is offline: exact APT index bytes and exact `.deb` archives must be acquired and SHA-256/size verified by a separately authorized predecessor unit, then transported into the container without host or repository mounts.

```text
FUTURE_PROVISIONING_NETWORK = NONE
PACKAGE_ARCHIVE_ACQUISITION_IN_004C1CB = ABSENT
PREVERIFIED_OFFLINE_ARCHIVE_SET_REQUIRED = TRUE
LIVE_MIRROR_FALLBACK = PROHIBITED
UNEXPECTED_OR_UNVERIFIED_ARCHIVE = FAIL_CLOSED
```

This means a successful 004C1CB merge still cannot authorize provisioning execution directly; archive/index acquisition and transport identity remain dependency-ordered prerequisites.

## 3. Frozen immutable inputs

```text
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_CONFIG = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
TARGET_PLATFORM = linux/amd64
APT_GET_SHA256 = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196
APT_CONFIG_SHA256 = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19
SNAPSHOT_ID = 20260909T180000Z
SNAPSHOT_SOURCE_DESCRIPTOR_SHA256 = 3fcdd0b5ef962070795738f92f36ea70f8c05a3171ae72e832f46746f7bab199
STAGE_A_ROOT_COUNT = 12
STAGE_A_ROOTS_SHA256 = 410065f69855eae58ab4daef3cadc253fb3284a9eb4f75537b2c1bace9d5a649
STAGE_B_ROOT_COUNT = 145
STAGE_B_ROOTS_SHA256 = f354c23dc9671e5d1daf0db5158b7f1eef0afc205b7620c67ecd948da23b8184
STAGE_C_ROOT_COUNT = 4
STAGE_C_ROOTS_SHA256 = c0ee3f407b0591988df41f7dbe3d0bd975e32312079b221bf8414d74094d19d7
```

Virtual-state lineage is bound exactly and is never upgraded into a filesystem-side-effect claim:

```text
STAGE_A_TRANSACTION_SHA256 = 64de571251fd51da1df513b6be7e588b4479556153d9ce5d58e99bddf2d4fc20
STAGE_A_OUTPUT = 14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7 / 255 packages
STAGE_B_TRANSACTION_SHA256 = eb4851027ba426113da526f23a6f1b6edcf12a832ab6c9df53c767c2656ec317
STAGE_B_OUTPUT = 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea / 904 packages
STAGE_C_TRANSACTION_SHA256 = 72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f
STAGE_C_OUTPUT = 8801230a86014a849c052da1f85740def6e5fcd204584e914b67017472bb71be / 905 packages
```

## 4. Freshness invalidation

The future execution unit must immediately re-read 004C1CA's measured Docker server/version/kernel/architecture and selected image locality/manifest/config/platform before consuming an attempt. Material drift from Docker server `29.7.2/linux/arm64`, kernel `7.0.12-linuxkit`, or the selected immutable image invalidates executable eligibility and fails closed pending fresh reconciliation.

## 5. Future container envelope

The future container is named and persistent only until evidence extraction completes. It uses the selected image by digest with `--pull=never` and `--platform linux/amd64`, a writable root filesystem, no host/repository mounts, no devices, no privileged mode, no added capabilities, no-new-privileges, and network none.

The solver's `--read-only` is intentionally not inherited because dpkg must mutate the container root filesystem. `--cap-drop ALL` is also not inherited because it could invalidate legitimate package unpack/configuration behavior; no capabilities beyond Docker defaults may be added. This is a frozen future contract, not an execution claim.

## 6. Exact simulation-to-install transformation

Each future stage preserves exact root ordering, architecture, snapshot/list/cache paths, `Acquire::Languages=none`, `Acquire::Retries=0`, and Recommends policy. It removes `--simulate` and the fake `Dir::Bin::dpkg` binding, uses the real image dpkg database, adds `-y --no-download`, and consumes only the preverified offline cache.

```text
STAGE_A_OFFLINE_INSTALL_ARGV_SHA256 = 5b0f1ffb795a128f28a63f2d182e1cbc7970c85187763f2b115c60288db18c7a
STAGE_B_OFFLINE_INSTALL_ARGV_SHA256 = 2ea968eca2e35d46eb4aabd0a00af368d566506533a070871ec7a7123079d84b
STAGE_C_OFFLINE_INSTALL_ARGV_SHA256 = bda16e788ac116f3e376063f7bf7cffe0b0af0bd850a01e09ee06a1b211e51b9
STAGE_ORDER = [STAGE_A, STAGE_B, STAGE_C]
RECOMMENDS_POLICY = [NO_INSTALL_RECOMMENDS, DEFAULT_APT_RECOMMENDS, NO_INSTALL_RECOMMENDS]
```

Any missing archive fails because network is none; no online fallback is permitted.

## 7. Evidence, side effects, and attempt accounting

Before Stage A, a separately authorized future attempt must verify substrate/image freshness, exact transport identity, exact archive inventory, exact index identities, absence of unexpected archives, and every frozen argv hash. Before consuming an attempt, it must also create a fresh empty host evidence directory matching the frozen external-root policy, prove that it is outside the Signthos repository, and fail closed without consuming the attempt if the destination is repository-local or otherwise violates that policy. For every stage it must preserve argv JSON, stdout, stderr, exit status, normalized `dpkg-query` state, `/var/lib/dpkg/status` identity, APT history/terminal logs, dpkg log, and archive inventory.

After each successful stage, observed package state must compare against the corresponding canonical virtual state. Equality is necessary transaction-accounting evidence only; it does not prove filesystem reproducibility or completeness of maintainer-script, trigger, alternatives, diversion, service, or other side effects. Those remain separately evidenced and qualified.

A nonzero stage result stops the attempt and preserves evidence. No silent retry or replacement attempt exists. 004C1CB authorizes zero attempts; a later authority may grant at most the explicitly stated budget.

## 8. Final container/image identity

The named container remains until evidence is extracted. 004C1CB does not authorize `docker commit`. A later authority may separately permit one local commit after qualifying verification; if so, the local image ID/config digest must be recorded and registry push remains prohibited. One image digest from one attempt is not reproducibility evidence.

## 9. Canonical frozen contract

```json
{
  "apt": {
    "aptConfigSha256": "ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19",
    "aptGetSha256": "9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196",
    "simulationTokensForbidden": [
      "--simulate",
      "Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited"
    ]
  },
  "attempts": {
    "authorizedHere": 0,
    "futureDefault": 1,
    "replacementWithoutAuthority": false,
    "silentRetry": false
  },
  "authority": "github:issue-comment:5636128786",
  "base": "7d096d947869ed93676c558c3a9c70e25962f46a",
  "boundaries": {
    "004C2": false,
    "004D": false,
    "005": false,
    "acquisition": false,
    "apt": false,
    "docker": false,
    "dpkg": false,
    "install": false,
    "pdfium": false,
    "provider": false,
    "toolchain": false
  },
  "container": {
    "devices": [],
    "extraCapabilities": [],
    "hostMounts": 0,
    "network": "none",
    "noNewPrivileges": true,
    "privileged": false,
    "pull": "never",
    "repositoryMounts": 0,
    "writableRootfs": true
  },
  "evidenceRoot": {
    "attemptConsumptionOnValidationFailure": false,
    "createFreshBeforeAttempt": true,
    "hostMountIntoProvisioningContainer": false,
    "pathTemplate": "/tmp/signthos-004c1cc-package-provisioning-<UTC>-<PID>",
    "policy": "FRESH_HOST_DIRECTORY_OUTSIDE_SIGNTHOS_REPOSITORY",
    "repositoryLocalPathAllowed": false,
    "requireEmptyBeforeAttempt": true,
    "validateOutsideRepositoryBeforeAttempt": true
  },
  "finalImage": {
    "commitHere": false,
    "futureCommitNeedsSeparateAuthority": true,
    "push": false
  },
  "freshness": {
    "dockerServer": "29.7.2/linux/arm64",
    "invalidateOnMaterialDrift": true,
    "kernel": "7.0.12-linuxkit",
    "source": "004C1CA"
  },
  "image": {
    "config": "sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0",
    "platform": "linux/amd64",
    "ref": "docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3"
  },
  "schema": "signthos.004c1cb.package-provisioning-harness.v1",
  "snapshot": {
    "architecture": "amd64",
    "base": "https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/",
    "descriptorSha256": "3fcdd0b5ef962070795738f92f36ea70f8c05a3171ae72e832f46746f7bab199",
    "id": "20260909T180000Z"
  },
  "stages": [
    {
      "offlineInstallArgv": [
        "/usr/bin/apt-get",
        "-y",
        "--no-download",
        "-o",
        "Dir::Etc::sourcelist=/tmp/signthos-provision/etc/snapshot.sources",
        "-o",
        "Dir::Etc::sourceparts=-",
        "-o",
        "Dir::State::lists=/tmp/signthos-provision/lists/",
        "-o",
        "Dir::Cache::archives=/tmp/signthos-provision/cache/archives/",
        "-o",
        "Dir::Cache::pkgcache=",
        "-o",
        "Dir::Cache::srcpkgcache=",
        "-o",
        "Dir::Log=/tmp/signthos-provision/log/",
        "-o",
        "APT::Architectures=amd64",
        "-o",
        "Debug::NoLocking=1",
        "-o",
        "Acquire::Languages=none",
        "-o",
        "Acquire::Retries=0",
        "install",
        "--no-install-recommends",
        "pkg-config",
        "autoconf",
        "automake",
        "libtool",
        "ragel",
        "git",
        "yasm",
        "subversion",
        "lsb-release",
        "tzdata",
        "keyboard-configuration",
        "tini"
      ],
      "offlineInstallArgvSha256": "5b0f1ffb795a128f28a63f2d182e1cbc7970c85187763f2b115c60288db18c7a",
      "recommends": "NO_INSTALL_RECOMMENDS",
      "roots": [
        "pkg-config",
        "autoconf",
        "automake",
        "libtool",
        "ragel",
        "git",
        "yasm",
        "subversion",
        "lsb-release",
        "tzdata",
        "keyboard-configuration",
        "tini"
      ],
      "rootsSha256": "410065f69855eae58ab4daef3cadc253fb3284a9eb4f75537b2c1bace9d5a649",
      "stageId": "STAGE_A"
    },
    {
      "offlineInstallArgv": [
        "/usr/bin/apt-get",
        "-y",
        "--no-download",
        "-o",
        "Dir::Etc::sourcelist=/tmp/signthos-provision/etc/snapshot.sources",
        "-o",
        "Dir::Etc::sourceparts=-",
        "-o",
        "Dir::State::lists=/tmp/signthos-provision/lists/",
        "-o",
        "Dir::Cache::archives=/tmp/signthos-provision/cache/archives/",
        "-o",
        "Dir::Cache::pkgcache=",
        "-o",
        "Dir::Cache::srcpkgcache=",
        "-o",
        "Dir::Log=/tmp/signthos-provision/log/",
        "-o",
        "APT::Architectures=amd64",
        "-o",
        "Debug::NoLocking=1",
        "-o",
        "Acquire::Languages=none",
        "-o",
        "Acquire::Retries=0",
        "install",
        "at-spi2-core",
        "autoconf",
        "binutils",
        "binutils-aarch64-linux-gnu",
        "binutils-arm-linux-gnueabihf",
        "binutils-mips64el-linux-gnuabi64",
        "binutils-mipsel-linux-gnu",
        "bison",
        "bzip2",
        "cdbs",
        "curl",
        "dbus-x11",
        "devscripts",
        "dpkg-dev",
        "elfutils",
        "fakeroot",
        "fd-find",
        "flex",
        "git-core",
        "gperf",
        "lib32gcc-s1",
        "lib32stdc++6",
        "lib32z1",
        "libasound2",
        "libasound2-dev",
        "libatk1.0-0",
        "libatspi2.0-0",
        "libatspi2.0-dev",
        "libbluetooth-dev",
        "libbrlapi-dev",
        "libbrlapi0.8",
        "libbz2-1.0",
        "libbz2-dev",
        "libc6",
        "libc6-dev",
        "libc6-i386",
        "libcairo2",
        "libcairo2-dev",
        "libcap-dev",
        "libcap2",
        "libcgi-session-perl",
        "libcups2",
        "libcups2-dev",
        "libcurl4-gnutls-dev",
        "libdrm-dev",
        "libdrm2",
        "libegl1",
        "libelf-dev",
        "libevdev-dev",
        "libevdev2",
        "libexpat1",
        "libffi-dev",
        "libffi8",
        "libfontconfig1",
        "libfreetype6",
        "libfuse2",
        "libgbm-dev",
        "libgbm1",
        "libgl1",
        "libglib2.0-0",
        "libglib2.0-dev",
        "libglu1-mesa-dev",
        "libgraphene-1.0-0",
        "libgtk-3-0",
        "libgtk-3-dev",
        "libinput-dev",
        "libinput10",
        "libjpeg-dev",
        "libkrb5-dev",
        "libncurses6",
        "libnspr4",
        "libnspr4-dev",
        "libnss3",
        "libnss3-dev",
        "libpam0g",
        "libpam0g-dev",
        "libpango-1.0-0",
        "libpangocairo-1.0-0",
        "libpci-dev",
        "libpci3",
        "libpixman-1-0",
        "libpng16-16",
        "libpulse-dev",
        "libpulse0",
        "libsctp-dev",
        "libspeechd-dev",
        "libspeechd2",
        "libsqlite3-0",
        "libsqlite3-dev",
        "libssl-dev",
        "libstdc++6",
        "libsystemd-dev",
        "libudev-dev",
        "libudev1",
        "libuuid1",
        "libva-dev",
        "libvulkan-dev",
        "libvulkan1",
        "libwayland-egl1",
        "libwww-perl",
        "libx11-6",
        "libx11-xcb1",
        "libxau6",
        "libxcb1",
        "libxcomposite1",
        "libxcursor1",
        "libxdamage1",
        "libxdmcp6",
        "libxext6",
        "libxfixes3",
        "libxi6",
        "libxinerama1",
        "libxkbcommon-dev",
        "libxrandr2",
        "libxrender1",
        "libxshmfence-dev",
        "libxslt1-dev",
        "libxss-dev",
        "libxt-dev",
        "libxtst-dev",
        "libxtst6",
        "lighttpd",
        "locales",
        "mesa-common-dev",
        "mutter-common",
        "openbox",
        "p7zip",
        "patch",
        "perl",
        "pkgconf",
        "ripgrep",
        "rpm",
        "ruby",
        "uuid-dev",
        "wdiff",
        "x11-utils",
        "x11-xserver-utils",
        "xcompmgr",
        "xserver-xorg-core",
        "xserver-xorg-video-dummy",
        "xvfb",
        "xz-utils",
        "zip",
        "zlib1g",
        "zstd"
      ],
      "offlineInstallArgvSha256": "2ea968eca2e35d46eb4aabd0a00af368d566506533a070871ec7a7123079d84b",
      "recommends": "DEFAULT_APT_RECOMMENDS",
      "roots": [
        "at-spi2-core",
        "autoconf",
        "binutils",
        "binutils-aarch64-linux-gnu",
        "binutils-arm-linux-gnueabihf",
        "binutils-mips64el-linux-gnuabi64",
        "binutils-mipsel-linux-gnu",
        "bison",
        "bzip2",
        "cdbs",
        "curl",
        "dbus-x11",
        "devscripts",
        "dpkg-dev",
        "elfutils",
        "fakeroot",
        "fd-find",
        "flex",
        "git-core",
        "gperf",
        "lib32gcc-s1",
        "lib32stdc++6",
        "lib32z1",
        "libasound2",
        "libasound2-dev",
        "libatk1.0-0",
        "libatspi2.0-0",
        "libatspi2.0-dev",
        "libbluetooth-dev",
        "libbrlapi-dev",
        "libbrlapi0.8",
        "libbz2-1.0",
        "libbz2-dev",
        "libc6",
        "libc6-dev",
        "libc6-i386",
        "libcairo2",
        "libcairo2-dev",
        "libcap-dev",
        "libcap2",
        "libcgi-session-perl",
        "libcups2",
        "libcups2-dev",
        "libcurl4-gnutls-dev",
        "libdrm-dev",
        "libdrm2",
        "libegl1",
        "libelf-dev",
        "libevdev-dev",
        "libevdev2",
        "libexpat1",
        "libffi-dev",
        "libffi8",
        "libfontconfig1",
        "libfreetype6",
        "libfuse2",
        "libgbm-dev",
        "libgbm1",
        "libgl1",
        "libglib2.0-0",
        "libglib2.0-dev",
        "libglu1-mesa-dev",
        "libgraphene-1.0-0",
        "libgtk-3-0",
        "libgtk-3-dev",
        "libinput-dev",
        "libinput10",
        "libjpeg-dev",
        "libkrb5-dev",
        "libncurses6",
        "libnspr4",
        "libnspr4-dev",
        "libnss3",
        "libnss3-dev",
        "libpam0g",
        "libpam0g-dev",
        "libpango-1.0-0",
        "libpangocairo-1.0-0",
        "libpci-dev",
        "libpci3",
        "libpixman-1-0",
        "libpng16-16",
        "libpulse-dev",
        "libpulse0",
        "libsctp-dev",
        "libspeechd-dev",
        "libspeechd2",
        "libsqlite3-0",
        "libsqlite3-dev",
        "libssl-dev",
        "libstdc++6",
        "libsystemd-dev",
        "libudev-dev",
        "libudev1",
        "libuuid1",
        "libva-dev",
        "libvulkan-dev",
        "libvulkan1",
        "libwayland-egl1",
        "libwww-perl",
        "libx11-6",
        "libx11-xcb1",
        "libxau6",
        "libxcb1",
        "libxcomposite1",
        "libxcursor1",
        "libxdamage1",
        "libxdmcp6",
        "libxext6",
        "libxfixes3",
        "libxi6",
        "libxinerama1",
        "libxkbcommon-dev",
        "libxrandr2",
        "libxrender1",
        "libxshmfence-dev",
        "libxslt1-dev",
        "libxss-dev",
        "libxt-dev",
        "libxtst-dev",
        "libxtst6",
        "lighttpd",
        "locales",
        "mesa-common-dev",
        "mutter-common",
        "openbox",
        "p7zip",
        "patch",
        "perl",
        "pkgconf",
        "ripgrep",
        "rpm",
        "ruby",
        "uuid-dev",
        "wdiff",
        "x11-utils",
        "x11-xserver-utils",
        "xcompmgr",
        "xserver-xorg-core",
        "xserver-xorg-video-dummy",
        "xvfb",
        "xz-utils",
        "zip",
        "zlib1g",
        "zstd"
      ],
      "rootsSha256": "f354c23dc9671e5d1daf0db5158b7f1eef0afc205b7620c67ecd948da23b8184",
      "stageId": "STAGE_B"
    },
    {
      "offlineInstallArgv": [
        "/usr/bin/apt-get",
        "-y",
        "--no-download",
        "-o",
        "Dir::Etc::sourcelist=/tmp/signthos-provision/etc/snapshot.sources",
        "-o",
        "Dir::Etc::sourceparts=-",
        "-o",
        "Dir::State::lists=/tmp/signthos-provision/lists/",
        "-o",
        "Dir::Cache::archives=/tmp/signthos-provision/cache/archives/",
        "-o",
        "Dir::Cache::pkgcache=",
        "-o",
        "Dir::Cache::srcpkgcache=",
        "-o",
        "Dir::Log=/tmp/signthos-provision/log/",
        "-o",
        "APT::Architectures=amd64",
        "-o",
        "Debug::NoLocking=1",
        "-o",
        "Acquire::Languages=none",
        "-o",
        "Acquire::Retries=0",
        "install",
        "--no-install-recommends",
        "curl",
        "build-essential",
        "pkg-config",
        "rsync"
      ],
      "offlineInstallArgvSha256": "bda16e788ac116f3e376063f7bf7cffe0b0af0bd850a01e09ee06a1b211e51b9",
      "recommends": "NO_INSTALL_RECOMMENDS",
      "roots": [
        "curl",
        "build-essential",
        "pkg-config",
        "rsync"
      ],
      "rootsSha256": "c0ee3f407b0591988df41f7dbe3d0bd975e32312079b221bf8414d74094d19d7",
      "stageId": "STAGE_C"
    }
  ],
  "states": {
    "A": {
      "count": 255,
      "out": "14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7",
      "tx": "64de571251fd51da1df513b6be7e588b4479556153d9ce5d58e99bddf2d4fc20"
    },
    "B": {
      "count": 904,
      "out": "42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea",
      "tx": "eb4851027ba426113da526f23a6f1b6edcf12a832ab6c9df53c767c2656ec317"
    },
    "C": {
      "count": 905,
      "out": "8801230a86014a849c052da1f85740def6e5fcd204584e914b67017472bb71be",
      "tx": "72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f"
    }
  },
  "transport": {
    "archiveAcquisitionIn004C1CB": false,
    "mode": "PREVERIFIED_OFFLINE_APT_LISTS_AND_DEBS",
    "unexpectedArchive": "FAIL_CLOSED",
    "verify": "size+sha256 against canonical selected archive identities",
    "archiveInventory": {
      "count": 826,
      "totalBytes": 317223784,
      "inventoryBytes": 439991,
      "inventorySha256": "38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98",
      "archiveIdentitySetSha256": "8ac7e3c9a44831e5f8c4a03a81862644990b504f7d2043102a1ab1a0fd69810d",
      "missingExtraChangedPolicy": "FAIL_CLOSED_BEFORE_ATTEMPT_CONSUMPTION"
    },
    "signedIndexIdentitySet": {
      "inRelease": [
        {
          "suite": "jammy",
          "bytes": 270087,
          "sha256": "c14060cd8c6d625874dfcb9523a35a395bf4865c28b6b6a82569ef326fe92dc6"
        },
        {
          "suite": "jammy-updates",
          "bytes": 128049,
          "sha256": "78e5c7e6f16f418c394d2d6caa4d8d10fafa715b08b038c02a8c73cd6dc4587b"
        },
        {
          "suite": "jammy-security",
          "bytes": 128927,
          "sha256": "b2eb2336d267611f596e47fe9bad879db22371598047363db841d8f5f586d450"
        }
      ],
      "packagesXz": [
        {
          "suite": "jammy",
          "component": "main",
          "bytes": 1394768,
          "sha256": "37cb57f1554cbfa71c5a29ee9ffee18a9a8c1782bb0568e0874b7ff4ce8f9c11"
        },
        {
          "suite": "jammy",
          "component": "restricted",
          "bytes": 129256,
          "sha256": "92102b5d9dfb7804293891528d5e57c3d05949df71af613d4f99fcb7d6a3f488"
        },
        {
          "suite": "jammy",
          "component": "universe",
          "bytes": 14090084,
          "sha256": "d29cb24c93fec5f43255706bce7eb46d4779952039d8c68ac1bb14a6f3655ce2"
        },
        {
          "suite": "jammy",
          "component": "multiverse",
          "bytes": 216948,
          "sha256": "e24bf9b5daf5387aa5311f69367b248b1d46d37d72480760f91f5a312c7eb43c"
        },
        {
          "suite": "jammy-updates",
          "component": "main",
          "bytes": 3794492,
          "sha256": "fc3ca7fd8c51bfcaef4c60146d82f07771d5c81843def876d3b4296acffad473"
        },
        {
          "suite": "jammy-updates",
          "component": "restricted",
          "bytes": 6542404,
          "sha256": "a9d99a9e6dd5952ec639e7e28763275c3aa5df18b69f06973cc3c6ab1fac434d"
        },
        {
          "suite": "jammy-updates",
          "component": "universe",
          "bytes": 1282472,
          "sha256": "e63677ef4f3f73a0ac7ac29be177222ddb2bf169ba0fe2bc16448342f71a53db"
        },
        {
          "suite": "jammy-updates",
          "component": "multiverse",
          "bytes": 76800,
          "sha256": "eb52bf4941c406f9d9fe486128453060fadb2d0172750cbe84f2896d1ecf4e71"
        },
        {
          "suite": "jammy-security",
          "component": "main",
          "bytes": 3526324,
          "sha256": "6fed35b19b0a467d391330554308eb2bcfc679a13604635f3298dd8ef383e7a4"
        },
        {
          "suite": "jammy-security",
          "component": "restricted",
          "bytes": 6304508,
          "sha256": "c82967cb499e44f680aa67fd9972db8a396eed44d3733261ccdc8b3dd57a8287"
        },
        {
          "suite": "jammy-security",
          "component": "universe",
          "bytes": 1048048,
          "sha256": "c06fe8a63c3debf947fd2f717d369e9c205f31a0eea25d07e8b92e106ee84757"
        },
        {
          "suite": "jammy-security",
          "component": "multiverse",
          "bytes": 69092,
          "sha256": "8b79f9054d123125a830170dbaea7c7053572dba1a0f9187313c5229245ae384"
        }
      ],
      "packageIndexCount": 12,
      "packageIndexCompressedBytes": 38475196,
      "missingExtraChangedPolicy": "FAIL_CLOSED_BEFORE_ATTEMPT_CONSUMPTION"
    }
  },
  "tree": "621c6fa3776d60939e16316c58e20aa00b4e919e"
}
```

```text
CONTRACT_BYTES = 11837
CONTRACT_SHA256 = c93e4aa4a48f110ec5e8c2fd2ac912273120b3059a164777afac8c9b862e7fe5
```

## 10. Host-static qualification

The following self-contained validator reads the frozen JSON block from this document. It invokes no subprocess and performs no Docker/APT/dpkg/network operation. Thirteen negative fixtures tamper image identity, snapshot origin, stage order, a same-count root set, platform, network mode, final virtual-state identity, two non-root argv controls, Recommends policy, evidence-root isolation, archive inventory identity, and signed package-index identity.

```python
#!/usr/bin/env python3
import copy, hashlib, json, sys
from pathlib import Path

def require(cond, label):
    if not cond:
        raise RuntimeError(label)

def canonical_bytes(value):
    return (json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False) + "\n").encode()

def sha256(value):
    return hashlib.sha256(value).hexdigest()

def validate(c):
    require(c["base"] == "7d096d947869ed93676c558c3a9c70e25962f46a", "base")
    require(c["image"]["ref"].endswith("c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3"), "image")
    require(c["image"]["platform"] == "linux/amd64", "platform")
    require(c["snapshot"]["base"] == "https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/", "snapshot")
    require(c["container"]["network"] == "none", "network")
    require(c["container"]["hostMounts"] == c["container"]["repositoryMounts"] == 0, "mounts")
    er = c["evidenceRoot"]
    require(er["policy"] == "FRESH_HOST_DIRECTORY_OUTSIDE_SIGNTHOS_REPOSITORY", "evidence-root-policy")
    require(er["pathTemplate"].startswith("/tmp/signthos-004c1cc-package-provisioning-"), "evidence-root-template")
    require(er["repositoryLocalPathAllowed"] is False and er["hostMountIntoProvisioningContainer"] is False, "evidence-root-isolation")
    require(er["createFreshBeforeAttempt"] is True and er["requireEmptyBeforeAttempt"] is True, "evidence-root-freshness")
    require(er["validateOutsideRepositoryBeforeAttempt"] is True and er["attemptConsumptionOnValidationFailure"] is False, "evidence-root-preflight")
    archive = c["transport"]["archiveInventory"]
    require(archive == {"count": 826, "totalBytes": 317223784, "inventoryBytes": 439991, "inventorySha256": "38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98", "archiveIdentitySetSha256": "8ac7e3c9a44831e5f8c4a03a81862644990b504f7d2043102a1ab1a0fd69810d", "missingExtraChangedPolicy": "FAIL_CLOSED_BEFORE_ATTEMPT_CONSUMPTION"}, "archive-inventory")
    indexes = c["transport"]["signedIndexIdentitySet"]
    expected_inrelease = [
        {"suite": "jammy", "bytes": 270087, "sha256": "c14060cd8c6d625874dfcb9523a35a395bf4865c28b6b6a82569ef326fe92dc6"},
        {"suite": "jammy-updates", "bytes": 128049, "sha256": "78e5c7e6f16f418c394d2d6caa4d8d10fafa715b08b038c02a8c73cd6dc4587b"},
        {"suite": "jammy-security", "bytes": 128927, "sha256": "b2eb2336d267611f596e47fe9bad879db22371598047363db841d8f5f586d450"},
    ]
    expected_packages = [
        {"suite": "jammy", "component": "main", "bytes": 1394768, "sha256": "37cb57f1554cbfa71c5a29ee9ffee18a9a8c1782bb0568e0874b7ff4ce8f9c11"},
        {"suite": "jammy", "component": "restricted", "bytes": 129256, "sha256": "92102b5d9dfb7804293891528d5e57c3d05949df71af613d4f99fcb7d6a3f488"},
        {"suite": "jammy", "component": "universe", "bytes": 14090084, "sha256": "d29cb24c93fec5f43255706bce7eb46d4779952039d8c68ac1bb14a6f3655ce2"},
        {"suite": "jammy", "component": "multiverse", "bytes": 216948, "sha256": "e24bf9b5daf5387aa5311f69367b248b1d46d37d72480760f91f5a312c7eb43c"},
        {"suite": "jammy-updates", "component": "main", "bytes": 3794492, "sha256": "fc3ca7fd8c51bfcaef4c60146d82f07771d5c81843def876d3b4296acffad473"},
        {"suite": "jammy-updates", "component": "restricted", "bytes": 6542404, "sha256": "a9d99a9e6dd5952ec639e7e28763275c3aa5df18b69f06973cc3c6ab1fac434d"},
        {"suite": "jammy-updates", "component": "universe", "bytes": 1282472, "sha256": "e63677ef4f3f73a0ac7ac29be177222ddb2bf169ba0fe2bc16448342f71a53db"},
        {"suite": "jammy-updates", "component": "multiverse", "bytes": 76800, "sha256": "eb52bf4941c406f9d9fe486128453060fadb2d0172750cbe84f2896d1ecf4e71"},
        {"suite": "jammy-security", "component": "main", "bytes": 3526324, "sha256": "6fed35b19b0a467d391330554308eb2bcfc679a13604635f3298dd8ef383e7a4"},
        {"suite": "jammy-security", "component": "restricted", "bytes": 6304508, "sha256": "c82967cb499e44f680aa67fd9972db8a396eed44d3733261ccdc8b3dd57a8287"},
        {"suite": "jammy-security", "component": "universe", "bytes": 1048048, "sha256": "c06fe8a63c3debf947fd2f717d369e9c205f31a0eea25d07e8b92e106ee84757"},
        {"suite": "jammy-security", "component": "multiverse", "bytes": 69092, "sha256": "8b79f9054d123125a830170dbaea7c7053572dba1a0f9187313c5229245ae384"},
    ]
    require(indexes["inRelease"] == expected_inrelease, "inrelease-identity-set")
    require(indexes["packagesXz"] == expected_packages, "packages-index-identity-set")
    require(indexes["packageIndexCount"] == 12 and indexes["packageIndexCompressedBytes"] == 38475196, "packages-index-summary")
    require(indexes["missingExtraChangedPolicy"] == "FAIL_CLOSED_BEFORE_ATTEMPT_CONSUMPTION", "packages-index-policy")
    require([x["stageId"] for x in c["stages"]] == ["STAGE_A", "STAGE_B", "STAGE_C"], "stage-order")
    require([len(x["roots"]) for x in c["stages"]] == [12, 145, 4], "root-counts")
    require([x["recommends"] for x in c["stages"]] == ["NO_INSTALL_RECOMMENDS", "DEFAULT_APT_RECOMMENDS", "NO_INSTALL_RECOMMENDS"], "recommends")
    expected_root_hashes = [
        "410065f69855eae58ab4daef3cadc253fb3284a9eb4f75537b2c1bace9d5a649",
        "f354c23dc9671e5d1daf0db5158b7f1eef0afc205b7620c67ecd948da23b8184",
        "c0ee3f407b0591988df41f7dbe3d0bd975e32312079b221bf8414d74094d19d7",
    ]
    require(len(c["stages"]) == len(expected_root_hashes), "root-hash-cardinality")
    for x, expected_root_hash in zip(c["stages"], expected_root_hashes):
        require(sha256(canonical_bytes(x["roots"])) == expected_root_hash, "root-set-hash")
        require(x["rootsSha256"] == expected_root_hash, "recorded-root-set-hash")
        argv = x["offlineInstallArgv"]
        require(sha256(canonical_bytes(argv)) == x["offlineInstallArgvSha256"], "argv-hash")
        require("--simulate" not in argv and "--no-download" in argv and "-y" in argv, "simulation-token")
        require("Acquire::Retries=0" in argv, "retry-policy")
        require(not any("Dir::Bin::dpkg=" in y for y in argv), "fake-dpkg")
        require(argv[-len(x["roots"]):] == x["roots"], "root-order")
    require(c["states"]["C"]["out"] == "8801230a86014a849c052da1f85740def6e5fcd204584e914b67017472bb71be", "final-state")
    require(c["states"]["C"]["count"] == 905, "final-count")
    require(c["attempts"]["authorizedHere"] == 0, "attempt-authority")
    require(not any(c["boundaries"].values()), "boundary")

text = Path(sys.argv[1]).read_text()
heading = "## 9. Canonical frozen contract"
start = text.index(heading) + len(heading)
start = text.index("{", start)
contract, _ = json.JSONDecoder().raw_decode(text[start:])
validate(contract)
mutations = [
    ("image", lambda x: x["image"].__setitem__("ref", "bad")),
    ("snapshot", lambda x: x["snapshot"].__setitem__("base", "https://archive.ubuntu.com/")),
    ("order", lambda x: x["stages"].__setitem__(0, copy.deepcopy(x["stages"][2]))),
    ("root-set-same-count", lambda x: x["stages"][2]["roots"].__setitem__(0, "wget")),
    ("platform", lambda x: x["image"].__setitem__("platform", "linux/arm64")),
    ("network", lambda x: x["container"].__setitem__("network", "bridge")),
    ("state", lambda x: x["states"]["C"].__setitem__("out", "0" * 64)),
    ("argv-y", lambda x: x["stages"][0]["offlineInstallArgv"].remove("-y")),
    ("argv-retries", lambda x: x["stages"][1]["offlineInstallArgv"].__setitem__(x["stages"][1]["offlineInstallArgv"].index("Acquire::Retries=0"), "Acquire::Retries=9")),
    ("recommends", lambda x: x["stages"][1].__setitem__("recommends", "NO_INSTALL_RECOMMENDS")),
    ("evidence-root", lambda x: x["evidenceRoot"].__setitem__("repositoryLocalPathAllowed", True)),
    ("archive-inventory", lambda x: x["transport"]["archiveInventory"].__setitem__("count", 825)),
    ("package-index", lambda x: x["transport"]["signedIndexIdentitySet"]["packagesXz"][0].__setitem__("sha256", "0" * 64)),
]
for name, mutate in mutations:
    candidate = copy.deepcopy(contract)
    mutate(candidate)
    try:
        validate(candidate)
    except RuntimeError:
        continue
    raise RuntimeError("tamper accepted: " + name)
print("STATIC_VALIDATION=PASS")
print("NEGATIVE_TAMPER_CASES=13/13_REJECTED")
```

```text
VALIDATOR_BYTES = 8194
VALIDATOR_SHA256 = 72f6b58fedecfff98e170b4a01e5bc8b9700f231ea8d313bcd1233d0b9803ce1
STATIC_VALIDATION = PASS
NEGATIVE_TAMPER_CASES = 13/13_REJECTED
DOCKER_EXECUTION_DURING_VALIDATION = 0
APT_DPKG_EXECUTION_DURING_VALIDATION = 0
```

## 11. Qualification result and successor boundary

```text
004C1CB_RESULT = QUALIFIED_STATIC_PACKAGE_PROVISIONING_EXECUTION_HARNESS_FREEZE
PROVISIONING_HARNESS_FROZEN = TRUE
PROVISIONING_EXECUTION_ATTEMPTS_AUTHORIZED_OR_CONSUMED = 0
PACKAGE_ARCHIVE_INDEX_ACQUISITION_AUTHORITY = ABSENT
PREVERIFIED_OFFLINE_PACKAGE_BYTE_SET_PRESENT = NOT_ESTABLISHED
PACKAGE_INSTALLATION_AUTHORITY = ABSENT
FINAL_PROVISIONED_IMAGE_IDENTITY = NOT_ESTABLISHED
PDFIUM_BUILD_EXECUTION_AUTHORITY = ABSENT
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
SIGNTHOS_PROJECT_COMPLETE = FALSE
```

Fresh Issue #7 reconciliation after guarded merge must determine the smallest archive/index acquisition and retained-byte transport prerequisite. No acquisition, package installation, PDFium build, provider runtime, 004C2, 004D, or Specification 005 authority is inherited from this candidate.

## 12. Merge gates

1. canonical base remains the exact recorded base/tree and there is no competing successor PR;
2. exactly this one qualification file changes;
3. all frozen identities and static validation remain byte-exact;
4. no Docker/APT/dpkg/package/toolchain/PDFium/provider execution occurs;
5. fresh independent substantive exact-head review reports no unresolved material finding;
6. any repair is forward-only and triggers fresh exact-head re-review;
7. immediate premerge base/head/open-frontier race proof passes;
8. guarded normal merge uses the exact reviewed head;
9. mechanical post-merge SHA/tree/parent/signature/surface verification passes;
10. fresh Issue #7 successor reconciliation occurs before any package acquisition or provisioning authority is inferred.
