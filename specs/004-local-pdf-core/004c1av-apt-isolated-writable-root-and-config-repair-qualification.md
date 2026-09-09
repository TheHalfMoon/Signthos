# 004C1AV — APT Isolated Writable Root and Config Repair Qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_ONLY / PASS`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `dcfc02f719cb09d11616219fa3239ee40084e553`
Canonical base tree: `4ab77501cda956df27634600d95c1084c875d566`
Authority: `github:issue-comment:5610253783`

## 1. Purpose and authority boundary

Canonical 004C1AU closes exact content identities for the three snapshot release objects and twelve uncompressed `Packages` indexes, but intentionally leaves container-visible placement and writable APT state unresolved. Before placement, canonical 004C1AL still requires isolated cache/state/temp roots. Exact APT 2.4.13 defaults show that the 004C1AS repaired argv leaves the parent `Dir::State` and `Dir::Cache` values at image defaults and leaves persistent `pkgcache`/`srcpkgcache` filenames enabled by default.

004C1AV repairs only that static execution contract. No APT, container, package, materialization, or provider operation is executed by this grain.

```text
004C1AV_AUTHORITY = STATIC_APT_ROOT_CONFIG_AND_EXECUTION_ENVIRONMENT_REPAIR_ONLY
004C1AV_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1av-apt-isolated-writable-root-and-config-repair-qualification.md
004C1AV_MAX_CHANGED_REPOSITORY_FILES = 1
APT_GET_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_CACHE_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_CONFIG_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
DPKG_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
CONTAINER_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
SOURCE_LIST_OR_STATUS_MATERIALIZATION = NOT_AUTHORIZED / NOT_PERFORMED
PACKAGE_ACTION = NOT_AUTHORIZED / NOT_PERFORMED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Canonical predecessor bindings

```text
CANONICAL_MAIN_AT_AV_START = dcfc02f719cb09d11616219fa3239ee40084e553
CANONICAL_MAIN_TREE_AT_AV_START = 4ab77501cda956df27634600d95c1084c875d566
OPEN_PULL_REQUESTS_AT_AV_PREFLIGHT = 0
004C1AS_REPAIR_CONTRACT_SHA256 = be5ae85678ffec71afd0fbb8284d882a57245ed576b99c09c88e2fbefd653a79
004C1AU_DOCUMENT_SHA256 = b3ecf630ca8d226eae0f53a9109f99cce8e2f56b47180e86ebdfa0b8f3b63cee
004C1AU_TRANSFORMATION_INVENTORY_SHA256 = 7ae814d3d293557da0b64f87fdffdca14c5a401a8c0585f22900c61ba0fcf078
004C1AI_DPKG_STATUS_BYTES = 231024
004C1AI_DPKG_STATUS_SHA256 = 49176dcea062ad5a71df28c178ce241a6bcf9a2ec7e1525a1445a143bfd1080b
SOURCE_DESCRIPTOR_BYTES = 242
SOURCE_DESCRIPTOR_SHA256 = 3fcdd0b5ef962070795738f92f36ea70f8c05a3171ae72e832f46746f7bab199
```

The 004C1AS source descriptor, 004C1AU package-index contents, stage roots, stage order, and Recommends policies are not reopened.

## 3. Exact APT 2.4.13 source evidence

```text
APT_SOURCE_REPOSITORY = https://git.launchpad.net/ubuntu/+source/apt
APT_SOURCE_TAG = import/2.4.13
APT_SOURCE_COMMIT = 581ec5c0aa2c6665d72465040f1465eb93503200
APT_SOURCE_TREE = e9afcae41f88040e93eb7a10a89e72c00b59e245
```

Relevant file identities:

| Path | Git blob | SHA-256 |
| --- | --- | --- |
| `apt-pkg/init.cc` | `3990a1f3926866e741a1d0713722c57e678f964a` | `e231c4a740d0ce656dd2b501bb2ee3900b312477dafae6b482f11195535c7fad` |
| `apt-pkg/pkgcachegen.cc` | `9e47ef369504a2b296e2cb77ceab6c70af8982af` | `3072484125eaeb9e69429bc966d0d502e99e257b9b9a77b54078c698a4615ef7` |
| `apt-pkg/contrib/fileutl.cc` | `eb5dc859df790384226939bdca53b747a5b228d7` | `bd7b4adc87b751a916af4eb67c560b4bc91371b9ea09b47d2e0f5b7557398ef6` |

Exact defaults in `pkgInitConfig()` are:

```text
Dir = /
Dir::State = <compiled state dir, /var/lib/apt in the selected Ubuntu package>
Dir::State::lists = lists/
Dir::Cache = <compiled cache dir, /var/cache/apt in the selected Ubuntu package>
Dir::Cache::archives = archives/
Dir::Cache::srcpkgcache = srcpkgcache.bin
Dir::Cache::pkgcache = pkgcache.bin
```

Canonical 004C1AI's selected-image filesystem inventory independently shows `var/cache/apt` and `var/cache/apt/archives` exist and shows no `pkgcache.bin` or `srcpkgcache.bin` file. This means no stale persistent cache file has been observed, but the parent path remains outside the isolated execution root unless repaired.

## 4. Persistent cache suppression is supported by exact source

`pkgCacheGenerator::MakeStatusCache()` resolves `Dir::Cache::pkgcache` and `Dir::Cache::srcpkgcache`. It only prepares cache directories when at least one filename is non-empty. It determines filesystem writability only for a non-empty cache filename. Regardless of file-cache availability it creates a `DynamicMMap`; write-back occurs only when `Writeable == true` and the corresponding cache filename is non-empty.

Therefore setting both filenames to an empty string is a supported fail-closed way to prevent persistent package-cache file reads/writes while retaining in-memory cache generation:

```text
Dir::Cache::pkgcache=
Dir::Cache::srcpkgcache=
PERSISTENT_PKGCACHE_FILE_READ = DISABLED_BY_EMPTY_PATH
PERSISTENT_PKGCACHE_FILE_WRITE = DISABLED_BY_EMPTY_PATH
CACHE_CONSTRUCTION = IN_MEMORY_DYNAMIC_MMAP
```

This does not disable package-list parsing or status-cache construction.

## 5. Temp-root binding

Exact APT 2.4.13 `GetTempDir()` delegates to `GetTempDirEnv("TMPDIR")`. APT temporary-file helpers therefore honor an explicit `TMPDIR` environment value.

The future execution-control environment overrides are frozen as the ordered set:

```text
TMPDIR=/tmp/signthos-apt/tmp
LC_ALL=C
LANG=C
TZ=UTC
```

`TMPDIR` isolates APT temporary files. `LC_ALL=C` and `LANG=C` freeze message/parse locale for replay comparison. `TZ=UTC` removes host timezone dependence from any human-readable time output. The exact selected-image config digest `sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0` contributes its canonical inherited environment: `PATH=/emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin` and `EMSDK=/emsdk`. Those inherited image values are not user-supplied overrides. No additional `-e` override, proxy, credential, custom CA, source, package-manager, or network-routing environment value is admitted.

## 6. Exact configuration delta

Starting from canonical 004C1AS, exactly four APT configuration values are added:

```text
Dir::State=/tmp/signthos-apt/state/
Dir::Cache=/tmp/signthos-apt/cache/
Dir::Cache::pkgcache=
Dir::Cache::srcpkgcache=
```

The already-canonical values remain unchanged:

```text
Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources
Dir::Etc::sourceparts=-
Dir::State::lists=/tmp/signthos-apt/lists/
Dir::Cache::archives=/tmp/signthos-apt/cache/archives/
Dir::State::status=/tmp/signthos-apt/state/status
Dir::Log=/tmp/signthos-apt/log/
Debug::NoLocking=1
Acquire::Languages=none
Acquire::Retries=0
```

No source-discovery, snapshot, package-root, stage-order, Recommends, `--simulate`, or `--no-download` token is changed.

## 7. Intended isolated container-visible root

A later separately authorized materializer must create exactly this initial directory contract inside its fresh isolated writable root:

| Path | Mode | UID | GID |
| --- | --- | ---: | ---: |
| `/tmp/signthos-apt` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/etc` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/lists` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/lists/partial` | `0700` | 0 | 0 |
| `/tmp/signthos-apt/state` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/cache` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/cache/archives` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/cache/archives/partial` | `0700` | 0 | 0 |
| `/tmp/signthos-apt/log` | `0755` | 0 | 0 |
| `/tmp/signthos-apt/tmp` | `0700` | 0 | 0 |

The future materializer must place the source descriptor and initial status file as:

```text
/tmp/signthos-apt/etc/snapshot.sources = mode 0644, uid 0, gid 0, 242 bytes, sha256 3fcdd0b5ef962070795738f92f36ea70f8c05a3171ae72e832f46746f7bab199
/tmp/signthos-apt/state/status = mode 0644, uid 0, gid 0, 231024 bytes, sha256 49176dcea062ad5a71df28c178ce241a6bcf9a2ec7e1525a1445a143bfd1080b
```

The three canonical `InRelease` files and twelve canonical uncompressed `Packages` files must use their already-bound 004C1AS basenames and 004C1AU byte identities, each mode `0644`, uid `0`, gid `0`. 004C1AV does not materialize any of them.

## 8. Repaired Stage argv identities

The four configuration additions are inserted without changing any predecessor token. Each added value is introduced as its own `-o` pair.

| Stage | Predecessor argv SHA-256 | Repaired argv count | Repaired argv SHA-256 | Roots SHA-256 | Recommends |
| --- | --- | ---: | --- | --- | --- |
| `STAGE_A` | `72f26c68f4117cecbb9a75c8bd9dd63b5881968e33d79ee6708569c74c4ba349` | 43 | `b1a87226bdb1ad54f826565e50e584dc0736394c0f5931b07a3fe4aaa10091e5` | `410065f69855eae58ab4daef3cadc253fb3284a9eb4f75537b2c1bace9d5a649` | `NO_INSTALL_RECOMMENDS` |
| `STAGE_B` | `a9ca35a1ca616f4603cb17cceedbb7d5c37c2525fb1f306da908e982e01d7414` | 175 | `6a807b2ca010fef130e7f0f952e649732152c41cedbf615b7eda49169bdd2591` | `f354c23dc9671e5d1daf0db5158b7f1eef0afc205b7620c67ecd948da23b8184` | `DEFAULT_APT_RECOMMENDS` |
| `STAGE_C` | `de893ea184fb9be2ca834ce6bbf7b92c8191ee62c4251f99d84ac2ea7036ef4c` | 35 | `50624172bebefc5aeb1b4181e31ee33570d4a4ff0a9b334d9f91f6ad2b4d2b77` | `c0ee3f407b0591988df41f7dbe3d0bd975e32312079b221bf8414d74094d19d7` | `NO_INSTALL_RECOMMENDS` |

## 9. Deterministic AV contract

Serialization is UTF-8 compact JSON with `sort_keys=true`, separators `(',', ':')`, `ensure_ascii=false`, preserved array order, and exactly one trailing LF.

```text
004C1AV_CONTRACT_JSON_BYTES = 9742
004C1AV_CONTRACT_JSON_SHA256 = 9643c185fd611a47e6205098bc49d55ab6d80aa8df0d1f563a229d5b8a2c8b5c
```

### Exact canonical JSON payload

```json
{"aptSource":{"commit":"581ec5c0aa2c6665d72465040f1465eb93503200","tree":"e9afcae41f88040e93eb7a10a89e72c00b59e245","version":"2.4.13"},"canonicalBase":"dcfc02f719cb09d11616219fa3239ee40084e553","configDeltaOrdered":["Dir::State=/tmp/signthos-apt/state/","Dir::Cache=/tmp/signthos-apt/cache/","Dir::Cache::pkgcache=","Dir::Cache::srcpkgcache="],"executionControlEnvironmentOverridesOrdered":["TMPDIR=/tmp/signthos-apt/tmp","LC_ALL=C","LANG=C","TZ=UTC"],"immutableFiles":[{"bytes":242,"gid":0,"mode":"0644","path":"/tmp/signthos-apt/etc/snapshot.sources","sha256":"3fcdd0b5ef962070795738f92f36ea70f8c05a3171ae72e832f46746f7bab199","uid":0},{"bytes":231024,"gid":0,"mode":"0644","path":"/tmp/signthos-apt/state/status","sha256":"49176dcea062ad5a71df28c178ce241a6bcf9a2ec7e1525a1445a143bfd1080b","uid":0}],"isolatedDirectories":[{"gid":0,"mode":"0755","path":"/tmp/signthos-apt","uid":0},{"gid":0,"mode":"0755","path":"/tmp/signthos-apt/etc","uid":0},{"gid":0,"mode":"0755","path":"/tmp/signthos-apt/lists","uid":0},{"gid":0,"mode":"0700","path":"/tmp/signthos-apt/lists/partial","uid":0},{"gid":0,"mode":"0755","path":"/tmp/signthos-apt/state","uid":0},{"gid":0,"mode":"0755","path":"/tmp/signthos-apt/cache","uid":0},{"gid":0,"mode":"0755","path":"/tmp/signthos-apt/cache/archives","uid":0},{"gid":0,"mode":"0700","path":"/tmp/signthos-apt/cache/archives/partial","uid":0},{"gid":0,"mode":"0755","path":"/tmp/signthos-apt/log","uid":0},{"gid":0,"mode":"0700","path":"/tmp/signthos-apt/tmp","uid":0}],"persistentAptCacheFiles":{"cacheConstruction":"in-memory DynamicMMap","pkgcache":"disabled-empty-path","srcpkgcache":"disabled-empty-path"},"predecessors":{"asRepairContractSha256":"be5ae85678ffec71afd0fbb8284d882a57245ed576b99c09c88e2fbefd653a79","auDocumentSha256":"b3ecf630ca8d226eae0f53a9109f99cce8e2f56b47180e86ebdfa0b8f3b63cee","auTransformationInventorySha256":"7ae814d3d293557da0b64f87fdffdca14c5a401a8c0585f22900c61ba0fcf078"},"schema":"signthos.004c1av.apt-isolated-root-config.v1","selectedImage":{"configDigest":"sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0","digest":"sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3","inheritedEnv":["PATH=/emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","EMSDK=/emsdk"]},"serialization":{"encoding":"UTF-8","json":"sort_keys=true,separators=(comma,colon),ensure_ascii=false","lineEnding":"LF","trailingNewline":true},"stages":[{"predecessorArgvSha256":"72f26c68f4117cecbb9a75c8bd9dd63b5881968e33d79ee6708569c74c4ba349","recommendsPolicy":"NO_INSTALL_RECOMMENDS","repairedArgv":["/usr/bin/apt-get","--simulate","--no-download","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State=/tmp/signthos-apt/state/","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache=/tmp/signthos-apt/cache/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::Cache::pkgcache=","-o","Dir::Cache::srcpkgcache=","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","--no-install-recommends","pkg-config","autoconf","automake","libtool","ragel","git","yasm","subversion","lsb-release","tzdata","keyboard-configuration","tini"],"repairedArgvSha256":"b1a87226bdb1ad54f826565e50e584dc0736394c0f5931b07a3fe4aaa10091e5","requestedRootsOrdered":["pkg-config","autoconf","automake","libtool","ragel","git","yasm","subversion","lsb-release","tzdata","keyboard-configuration","tini"],"requestedRootsSha256":"410065f69855eae58ab4daef3cadc253fb3284a9eb4f75537b2c1bace9d5a649","stageId":"STAGE_A"},{"predecessorArgvSha256":"a9ca35a1ca616f4603cb17cceedbb7d5c37c2525fb1f306da908e982e01d7414","recommendsPolicy":"DEFAULT_APT_RECOMMENDS","repairedArgv":["/usr/bin/apt-get","--simulate","--no-download","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State=/tmp/signthos-apt/state/","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache=/tmp/signthos-apt/cache/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::Cache::pkgcache=","-o","Dir::Cache::srcpkgcache=","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","at-spi2-core","autoconf","binutils","binutils-aarch64-linux-gnu","binutils-arm-linux-gnueabihf","binutils-mips64el-linux-gnuabi64","binutils-mipsel-linux-gnu","bison","bzip2","cdbs","curl","dbus-x11","devscripts","dpkg-dev","elfutils","fakeroot","fd-find","flex","git-core","gperf","lib32gcc-s1","lib32stdc++6","lib32z1","libasound2","libasound2-dev","libatk1.0-0","libatspi2.0-0","libatspi2.0-dev","libbluetooth-dev","libbrlapi-dev","libbrlapi0.8","libbz2-1.0","libbz2-dev","libc6","libc6-dev","libc6-i386","libcairo2","libcairo2-dev","libcap-dev","libcap2","libcgi-session-perl","libcups2","libcups2-dev","libcurl4-gnutls-dev","libdrm-dev","libdrm2","libegl1","libelf-dev","libevdev-dev","libevdev2","libexpat1","libffi-dev","libffi8","libfontconfig1","libfreetype6","libfuse2","libgbm-dev","libgbm1","libgl1","libglib2.0-0","libglib2.0-dev","libglu1-mesa-dev","libgraphene-1.0-0","libgtk-3-0","libgtk-3-dev","libinput-dev","libinput10","libjpeg-dev","libkrb5-dev","libncurses6","libnspr4","libnspr4-dev","libnss3","libnss3-dev","libpam0g","libpam0g-dev","libpango-1.0-0","libpangocairo-1.0-0","libpci-dev","libpci3","libpixman-1-0","libpng16-16","libpulse-dev","libpulse0","libsctp-dev","libspeechd-dev","libspeechd2","libsqlite3-0","libsqlite3-dev","libssl-dev","libstdc++6","libsystemd-dev","libudev-dev","libudev1","libuuid1","libva-dev","libvulkan-dev","libvulkan1","libwayland-egl1","libwww-perl","libx11-6","libx11-xcb1","libxau6","libxcb1","libxcomposite1","libxcursor1","libxdamage1","libxdmcp6","libxext6","libxfixes3","libxi6","libxinerama1","libxkbcommon-dev","libxrandr2","libxrender1","libxshmfence-dev","libxslt1-dev","libxss-dev","libxt-dev","libxtst-dev","libxtst6","lighttpd","locales","mesa-common-dev","mutter-common","openbox","p7zip","patch","perl","pkgconf","ripgrep","rpm","ruby","uuid-dev","wdiff","x11-utils","x11-xserver-utils","xcompmgr","xserver-xorg-core","xserver-xorg-video-dummy","xvfb","xz-utils","zip","zlib1g","zstd"],"repairedArgvSha256":"6a807b2ca010fef130e7f0f952e649732152c41cedbf615b7eda49169bdd2591","requestedRootsOrdered":["at-spi2-core","autoconf","binutils","binutils-aarch64-linux-gnu","binutils-arm-linux-gnueabihf","binutils-mips64el-linux-gnuabi64","binutils-mipsel-linux-gnu","bison","bzip2","cdbs","curl","dbus-x11","devscripts","dpkg-dev","elfutils","fakeroot","fd-find","flex","git-core","gperf","lib32gcc-s1","lib32stdc++6","lib32z1","libasound2","libasound2-dev","libatk1.0-0","libatspi2.0-0","libatspi2.0-dev","libbluetooth-dev","libbrlapi-dev","libbrlapi0.8","libbz2-1.0","libbz2-dev","libc6","libc6-dev","libc6-i386","libcairo2","libcairo2-dev","libcap-dev","libcap2","libcgi-session-perl","libcups2","libcups2-dev","libcurl4-gnutls-dev","libdrm-dev","libdrm2","libegl1","libelf-dev","libevdev-dev","libevdev2","libexpat1","libffi-dev","libffi8","libfontconfig1","libfreetype6","libfuse2","libgbm-dev","libgbm1","libgl1","libglib2.0-0","libglib2.0-dev","libglu1-mesa-dev","libgraphene-1.0-0","libgtk-3-0","libgtk-3-dev","libinput-dev","libinput10","libjpeg-dev","libkrb5-dev","libncurses6","libnspr4","libnspr4-dev","libnss3","libnss3-dev","libpam0g","libpam0g-dev","libpango-1.0-0","libpangocairo-1.0-0","libpci-dev","libpci3","libpixman-1-0","libpng16-16","libpulse-dev","libpulse0","libsctp-dev","libspeechd-dev","libspeechd2","libsqlite3-0","libsqlite3-dev","libssl-dev","libstdc++6","libsystemd-dev","libudev-dev","libudev1","libuuid1","libva-dev","libvulkan-dev","libvulkan1","libwayland-egl1","libwww-perl","libx11-6","libx11-xcb1","libxau6","libxcb1","libxcomposite1","libxcursor1","libxdamage1","libxdmcp6","libxext6","libxfixes3","libxi6","libxinerama1","libxkbcommon-dev","libxrandr2","libxrender1","libxshmfence-dev","libxslt1-dev","libxss-dev","libxt-dev","libxtst-dev","libxtst6","lighttpd","locales","mesa-common-dev","mutter-common","openbox","p7zip","patch","perl","pkgconf","ripgrep","rpm","ruby","uuid-dev","wdiff","x11-utils","x11-xserver-utils","xcompmgr","xserver-xorg-core","xserver-xorg-video-dummy","xvfb","xz-utils","zip","zlib1g","zstd"],"requestedRootsSha256":"f354c23dc9671e5d1daf0db5158b7f1eef0afc205b7620c67ecd948da23b8184","stageId":"STAGE_B"},{"predecessorArgvSha256":"de893ea184fb9be2ca834ce6bbf7b92c8191ee62c4251f99d84ac2ea7036ef4c","recommendsPolicy":"NO_INSTALL_RECOMMENDS","repairedArgv":["/usr/bin/apt-get","--simulate","--no-download","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State=/tmp/signthos-apt/state/","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache=/tmp/signthos-apt/cache/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::Cache::pkgcache=","-o","Dir::Cache::srcpkgcache=","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","--no-install-recommends","curl","build-essential","pkg-config","rsync"],"repairedArgvSha256":"50624172bebefc5aeb1b4181e31ee33570d4a4ff0a9b334d9f91f6ad2b4d2b77","requestedRootsOrdered":["curl","build-essential","pkg-config","rsync"],"requestedRootsSha256":"c0ee3f407b0591988df41f7dbe3d0bd975e32312079b221bf8414d74094d19d7","stageId":"STAGE_C"}]}
```

## 10. Fail-closed invariants

```text
NON_ISOLATED_DIR_STATE = REJECT
NON_ISOLATED_DIR_CACHE = REJECT
NONEMPTY_PERSISTENT_PKGCACHE = REJECT
NONEMPTY_PERSISTENT_SRCPKGCACHE = REJECT
TMPDIR_OUTSIDE_ISOLATED_ROOT = REJECT
UNBOUND_EXECUTION_CONTROL_ENVIRONMENT_OVERRIDE = REJECT
SELECTED_IMAGE_CONFIG_OR_INHERITED_ENV_CHANGE = REJECT
PROXY_ENVIRONMENT_ENTRY = REJECT
CREDENTIAL_ENVIRONMENT_ENTRY = REJECT
CUSTOM_CA_ENVIRONMENT_ENTRY = REJECT
SOURCE_DESCRIPTOR_CHANGE = REJECT
SOURCEPARTS_CHANGE = REJECT
SNAPSHOT_CHANGE = REJECT
STAGE_ROOT_CHANGE = REJECT
STAGE_ORDER_CHANGE = REJECT
RECOMMENDS_POLICY_CHANGE = REJECT
SIMULATE_OR_NO_DOWNLOAD_REMOVAL = REJECT
```

## 11. Qualification result

```text
APT_DEFAULT_PARENT_STATE_CACHE_RECONCILIATION = PASS
PERSISTENT_PKGCACHE_SUPPRESSION_SOURCE_PROOF = PASS
TMPDIR_SOURCE_PROOF = PASS
ISOLATED_STATE_PARENT_REPAIR = PASS_STATIC
ISOLATED_CACHE_PARENT_REPAIR = PASS_STATIC
DETERMINISTIC_EXECUTION_ENVIRONMENT = PASS_STATIC
INTENDED_DIRECTORY_MODE_UID_GID_CONTRACT = PASS_STATIC
REPAIRED_STAGE_A_ARGV_IDENTITY = PASS
REPAIRED_STAGE_B_ARGV_IDENTITY = PASS
REPAIRED_STAGE_C_ARGV_IDENTITY = PASS
BYTE_COMPLETE_AV_CONTRACT = PASS
004C1AV_RESULT = PASS_STATIC_ONLY
APT_EXECUTION = 0
CONTAINER_EXECUTION = 0
MATERIALIZATION = 0
PACKAGE_ACTION = 0
```

## 12. Successor boundary

004C1AV authorizes no placement or execution. The next unit must be separately reconciled. A later placement qualification must prove the exact descriptor, fifteen snapshot list objects, initial dpkg status, directory modes/ownership, no-host-mount transport, writable-root boundaries, and replay determinism inside the exact selected image without executing APT. Only after that placement is canonical may solver execution be considered.

```text
CONTAINER_VISIBLE_APT_ROOT_PLACEMENT = NOT_AUTHORIZED
APT_GET_EXECUTION = NOT_AUTHORIZED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED
PACKAGE_ACTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
