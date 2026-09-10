# 004C1BE — Stage A evidence-preserving inventory-gate repair qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_FAILURE_ORDERING_REPAIR_ONLY / ZERO_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `1548c9dee9f12703e7899ef09993cf6b31099d14`
Canonical base tree: `3fd318b5bd263b82998a0bee11f1e4dc1d1cd019`
Authority source: `github:issue-comment:5611755761`
Preserved failure: `github:issue-comment:5611658390`

## 1. Purpose and authority boundary

Canonical 004C1BB freezes the combined same-container hook recheck and Stage A solver harness. Canonical 004C1BC freezes the exact fail-closed parser. The first authorized 004C1BD Replay A reached the 004C1BB post-APT inventory check and exited `71` before the normalized evidence USTAR was written. The attempt remains permanently nonqualifying. Its empty outer stdout means the exact changed path and the inner APT streams cannot be reconstructed from that attempt.

004C1BE repairs only evidence-preservation ordering. It does not weaken the inventory invariant and executes nothing.

```text
004C1BE_AUTHORITY = STATIC_EXACT_HARNESS_FAILURE_ORDERING_REPAIR_ONLY
004C1BE_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1be-stage-a-evidence-preserving-inventory-gate-repair-qualification.md
004C1BE_MAX_CHANGED_REPOSITORY_FILES = 1
DOCKER_EXECUTION = 0
APT_CONFIG_EXECUTION = 0
APT_GET_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = 0
004C1BD_REPLACEMENT_REPLAY_A = NOT_AUTHORIZED
REPLAY_B = NOT_AUTHORIZED
STAGE_B = NOT_AUTHORIZED
STAGE_C = NOT_AUTHORIZED
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Canonical predecessor identities

```text
004C1BB_GUEST_SCRIPT_BYTES = 8931
004C1BB_GUEST_SCRIPT_SHA256 = de3d1add92899dd5fff4ad7f395929fcd27f66d15ddd03285d06c439aa00298a
004C1BB_DOCKER_ARGC = 35
004C1BB_DOCKER_ARGV_JSON_BYTES = 9897
004C1BB_DOCKER_ARGV_SHA256 = ddf10251d79b8adc7117db36813b792043eee9a2e23f9cacc10e0c20ee6ba038
004C1BB_STAGE_A_ARGC = 42
004C1BB_STAGE_A_ARGV_SHA256 = dceeccc5096bbc9eb0c661b93be5a5091f459a2ffaeed808b4bebb212ebff96b
004C1BB_HOOK_ARGC = 32
004C1BB_HOOK_ARGV_SHA256 = c56c77e8d564c9c9d0f89342dc96d7aedeabc527107628d24ec4aa30bbc2a372
004C1BB_INPUT_INVENTORY_SHA256 = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66
004C1BC_PARSER_SHA256 = 87c43b8a318de2b3d353c6c79b4a06abe41670144e1ee36cf7724105ff670550
```

The canonical 004C1BB Docker prefix tokens are preserved byte-for-byte. Therefore selected image, `--pull=never`, platform, network-none, read-only rootfs, dropped capabilities, no-new-privileges, resource bounds, tmpfs, environment, explicit `/bin/sh` entrypoint, and absence of mounts remain unchanged.

## 3. Static source-grounded reconciliation

Exact APT source revision:

```text
APT_SOURCE_COMMIT = 581ec5c0aa2c6665d72465040f1465eb93503200
APT_SOURCE_TREE = e9afcae41f88040e93eb7a10a89e72c00b59e245
```

| Exact source file | Bytes | SHA-256 |
| --- | ---: | --- |
| `apt-private/private-main.cc` | 2619 | `b734390eab4b5ce32b45cb0a7acfebf08ea6f1379de15f8866a5b879d5e53b9b` |
| `apt-private/private-install.cc` | 43268 | `70731f4b87a6211600b9573995e41e6b200010d3cd0508f73a0061c45a32fc90` |
| `apt-pkg/cachefile.cc` | 10813 | `59251a75a691767446824ce5d412e32a0667878129a24dec0e9a1538605d8ca9` |
| `apt-pkg/deb/debsystem.cc` | 16407 | `c6d0d861c838285496034f6619c8aec7d7773bf8f04cfd741c339fafe1b9edad` |
| `apt-pkg/pkgcachegen.cc` | 67195 | `3072484125eaeb9e69429bc966d0d502e99e257b9b9a77b54078c698a4615ef7` |
| `apt-pkg/packagemanager.cc` | 42048 | `af0805eb8ced9971d34486be57f53a389cb87ece504c59ca77ffcc5f61513a8a` |
| `apt-pkg/acquire.cc` | 49155 | `24b13048714cabe41807a6810ba0039dea55554914461e2b4347a2e8cb363225` |
| `apt-pkg/acquire-item.cc` | 146897 | `cf8440c394a97a92efc030f0c96b9456a51b9816081ad71d4408cc3be7f90a54` |
| `apt-pkg/algorithms.cc` | 52846 | `6dd7c7a4bfdb03f269e895f6290e456ed4963bdf91707715d0c54609da97ec1e` |

Static source tracing establishes only the following bounded conclusions:

1. simulation sets `APT::Get::Simulate=true` and `Debug::NoLocking=true`;
2. `OpenForInstall()` requests a cache lock, but `debSystem::Lock()` returns without creating lock files when `Debug::NoLocking` is true;
3. 004C1BB sets both package cache filenames empty, so `MakeStatusCache()` constructs its package cache in memory rather than writing `pkgcache.bin` or `srcpkgcache.bin`;
4. `InstallPackages()` skips the archive-directory `Fetcher.GetLock()` branch in simulation;
5. the simulation branch constructs `SimulateWithActionGroupInhibited`, calls `PM.DoInstall()`, and returns before `AcquireRun()`, package download, package installation, unpack, configuration, or post-install cleanup paths;
6. `pkgSimulate::RealInstall`, `RealConfigure`, `RealRemove`, and `Go` mutate the simulator's in-memory package state and emit text; no filesystem-write operation appears in those functions;
7. historical 004C1AX attempts that stopped before the simulator preserved the exact `61737063...` before/after input inventory;
8. because the 004C1BD container was removed and 004C1BB exited before exporting `bb-before.tsv`/`bb-after.tsv`, the exact changed path remains `NOT_ESTABLISHED` and must not be guessed.

The observability defect is therefore independent of the still-valid fail-closed invariant: the harness destroys the evidence needed to explain its own inventory failure.

## 4. Exact repair delta

The canonical 004C1BB logic is:

```text
compute bb-after.tsv
compute ah
if ah != canonical inventory hash: exit 71
if bh != ah: exit 72
export canonical evidence USTAR
```

The repaired logic is exactly:

```text
compute bb-after.tsv
compute ah
inventory_rc = 0
if ah != canonical inventory hash: inventory_rc = 71
else if bh != ah: inventory_rc = 72
export the same canonical evidence USTAR
exit inventory_rc
```

The repair preserves failure semantics. A mismatched post inventory still exits `71`; a pre/post mismatch with canonical post inventory still exits `72`; an unchanged qualifying inventory exits `0`. Only the location of the failure relative to evidence export changes.

No new executable path is introduced. The set of `/usr/bin/*` helper references in the guest script is identical before and after the repair. No new evidence member is added.

## 5. Exact repaired guest script

```text
004C1BE_GUEST_SCRIPT_BYTES = 9021
004C1BE_GUEST_SCRIPT_SHA256 = 1da42fb5adbaaafd2b4059b5d24ef15f4fd28dd70b66d4b1cae347755316ed75
004C1BE_GUEST_SCRIPT_TRAILING_LF = TRUE
```

The JSON string below decodes to the exact guest script bytes. Do not append or remove bytes after JSON decoding.

```json
"tmp=/tmp/signthos-apt/tmp\nraw=/tmp/signthos-apt/bb-input.tar\numask 022\n[ \"$PATH\" = /emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin ] || exit 10\n[ \"$EMSDK\" = /emsdk ] || exit 11\n[ \"$TMPDIR\" = /tmp/signthos-apt/tmp ] || exit 12\n[ \"$LC_ALL\" = C ] || exit 13\n[ \"$LANG\" = C ] || exit 14\n[ \"$TZ\" = UTC ] || exit 15\nfst=$(/usr/bin/stat -f -c %T /tmp/signthos-apt); [ \"$fst\" = tmpfs ] || exit 21\nx=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ \"$x\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 16\nx=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ \"$x\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 17\nx=$(/usr/bin/sha256sum /usr/bin/cat); x=${x%% *}; [ \"$x\" = 210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba ] || exit 18\nx=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ \"$x\" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 19\nx=$(/usr/bin/sha256sum /usr/bin/rm); x=${x%% *}; [ \"$x\" = 7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682 ] || exit 20\n/usr/bin/cat > \"$raw\"\nrb=$(/usr/bin/stat -c %s \"$raw\"); [ \"$rb\" = 204769280 ] || exit 40\nrh=$(/usr/bin/sha256sum \"$raw\"); rh=${rh%% *}; [ \"$rh\" = f7fd9486a7eadcf82fc5e7f66c166c3de757ff5c108a32aab2bf17cccfbd4755 ] || exit 41\n/usr/bin/tar -xpf \"$raw\" -C /\n/usr/bin/rm -- \"$raw\"\n[ ! -e \"$raw\" ] || exit 42\ndc=$(/usr/bin/find /tmp/signthos-apt -type d | /usr/bin/wc -l); [ \"$dc\" = 10 ] || exit 22\nfc=$(/usr/bin/find /tmp/signthos-apt -type f | /usr/bin/wc -l); [ \"$fc\" = 17 ] || exit 23\nlc=$(/usr/bin/find /tmp/signthos-apt -type l | /usr/bin/wc -l); [ \"$lc\" = 0 ] || exit 24\ninventory() { /usr/bin/find /tmp/signthos-apt -print | /usr/bin/sort | while IFS= read -r p; do case \"$p\" in /tmp/signthos-apt/tmp/bb-*) continue ;; esac; if [ -d \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 31; printf \"D\\t%s\\t%s\\n\" \"$p\" \"$m\"; elif [ -f \"$p\" ]; then m=$(/usr/bin/stat -c \"%s %a %u %g\" \"$p\") || exit 32; h=$(/usr/bin/sha256sum \"$p\") || exit 33; h=${h%% *}; printf \"F\\t%s\\t%s\\t%s\\n\" \"$p\" \"$m\" \"$h\"; elif [ -L \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 34; printf \"L\\t%s\\t%s\\n\" \"$p\" \"$m\"; else m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 35; printf \"O\\t%s\\t%s\\n\" \"$p\" \"$m\"; fi; done; }\ninventory > \"$tmp/bb-before.tsv\"\nbh=$(/usr/bin/sha256sum \"$tmp/bb-before.tsv\"); bh=${bh%% *}; [ \"$bh\" = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66 ] || exit 36\n: > \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /bin/sh); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /bin/sh \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/dash); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/dash \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ \"$x\" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/tar \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ \"$x\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sha256sum \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ \"$x\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/stat \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/find); x=${x%% *}; [ \"$x\" = 791b89c8bffb8101fd7d4d212b80af66a2332834b05a42721104eb47e8fa2eb1 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/find \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/wc); x=${x%% *}; [ \"$x\" = 504463c7a12780b7439321be6e67f43ab61a3ff429cbf916c0722d19f98692a8 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/wc \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sort); x=${x%% *}; [ \"$x\" = 0fc26ce295e8e549635da2129e389f63685745b3be7c1737db6251a296f1cd78 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sort \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/uname); x=${x%% *}; [ \"$x\" = 37df0311d0e24169abfd166bc6018d40b87306f7ff64d9eec256c8331ac26347 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/uname \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/ldd); x=${x%% *}; [ \"$x\" = 6752368e618c98f813bd346846df76021aa5d09caef634ee5dbe7d00c3c200fd ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/ldd \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-get); x=${x%% *}; [ \"$x\" = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196 ] || exit 27; printf \"%s\\t%s\\n\" /usr/bin/apt-get \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-config); x=${x%% *}; [ \"$x\" = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19 ] || exit 29; printf \"%s\\t%s\\n\" /usr/bin/apt-config \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/cat); x=${x%% *}; [ \"$x\" = 210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/cat \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/rm); x=${x%% *}; [ \"$x\" = 7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/rm \"$x\" >> \"$tmp/bb-helpers.tsv\"\nam=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-get); [ \"$am\" = \"51680 755 0 0\" ] || exit 28\ncm=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-config); [ \"$cm\" = \"27024 755 0 0\" ] || exit 30\nkernel=$(/usr/bin/uname -r)\nmachine=$(/usr/bin/uname -m)\n{ printf \"GUEST_KERNEL=%s\\n\" \"$kernel\"; printf \"GUEST_MACHINE=%s\\n\" \"$machine\"; /usr/bin/ldd --version; if [ -x /run/rosetta/rosetta ]; then printf \"ROSETTA_VISIBLE=YES\\n\"; else printf \"ROSETTA_VISIBLE=NO\\n\"; fi; } > \"$tmp/bb-substrate.stdout\" 2> \"$tmp/bb-substrate.stderr\"\ncase \"$kernel\" in 6.12.*rodete1-amd64) printf \"RODETE_PREDICATE=TRUE\\n\" >> \"$tmp/bb-substrate.stdout\"; exit 25 ;; *) printf \"RODETE_PREDICATE=FALSE\\n\" >> \"$tmp/bb-substrate.stdout\" ;; esac\n[ \"$machine\" = x86_64 ] || exit 26\n/usr/bin/apt-get --version > \"$tmp/bb-apt-version.stdout\" 2> \"$tmp/bb-apt-version.stderr\"\nprintf \"/usr/bin/apt-get\\t%s\\t%s\\n\" \"9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196\" \"$am\" > \"$tmp/bb-apt-identity.tsv\"\nset -- /usr/bin/apt-get --simulate -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 install --no-install-recommends pkg-config autoconf automake libtool ragel git yasm subversion lsb-release tzdata keyboard-configuration tini\nset +e\n/usr/bin/apt-config --no-empty -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 dump APT::Install::Pre-Invoke APT::Install::Post-Invoke-Success AptCli::Hooks::Install > \"$tmp/bb-hook.stdout\" 2> \"$tmp/bb-hook.stderr\"\nhook_rc=$?\nset -e\n[ \"$hook_rc\" -eq 0 ] || exit 61\n[ ! -s \"$tmp/bb-hook.stdout\" ] || exit 62\n[ ! -s \"$tmp/bb-hook.stderr\" ] || exit 63\n\"$@\" > \"$tmp/bb-apt.stdout\" 2> \"$tmp/bb-apt.stderr\" &\napt_pid=$!\n: > \"$tmp/bb-process.raw\"\nseen=\"|\"\nwhile kill -0 \"$apt_pid\" 2>/dev/null; do for c in /proc/[0-9]*/comm; do if IFS= read -r n 2>/dev/null < \"$c\"; then case \"$seen\" in *\"|$n|\"*) ;; *) seen=\"${seen}${n}|\"; printf \"%s\\n\" \"$n\" >> \"$tmp/bb-process.raw\" ;; esac; else [ ! -e \"$c\" ] || exit 70; fi; done; done\nset +e\nwait \"$apt_pid\"\napt_rc=$?\nset -e\nprintf \"%s\\n\" \"$hook_rc\" > \"$tmp/bb-hook.exit\"\nprintf \"%s\\n\" \"$apt_rc\" > \"$tmp/bb-apt.exit\"\n/usr/bin/sort -u \"$tmp/bb-process.raw\" > \"$tmp/bb-process.txt\"\ninventory > \"$tmp/bb-after.tsv\"\nah=$(/usr/bin/sha256sum \"$tmp/bb-after.tsv\"); ah=${ah%% *}\ninventory_rc=0\n[ \"$ah\" = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66 ] || inventory_rc=71\nif [ \"$inventory_rc\" -eq 0 ]; then [ \"$bh\" = \"$ah\" ] || inventory_rc=72; fi\n/usr/bin/tar --format=ustar --sort=name --mtime=@0 --owner=0 --group=0 --numeric-owner -cf - -C \"$tmp\" bb-after.tsv bb-apt-identity.tsv bb-apt-version.stderr bb-apt-version.stdout bb-apt.exit bb-apt.stderr bb-apt.stdout bb-before.tsv bb-helpers.tsv bb-hook.exit bb-hook.stderr bb-hook.stdout bb-process.txt bb-substrate.stderr bb-substrate.stdout\nexit \"$inventory_rc\"\n"
```

## 6. Exact repaired Docker argv

```text
004C1BE_DOCKER_ARGC = 35
004C1BE_DOCKER_ARGV_JSON_BYTES = 9994
004C1BE_DOCKER_ARGV_SHA256 = f740e1839ec6be37ccb66d34d42011e73e86399d9c7fda4fb06dcb562830628a
004C1BE_DOCKER_PREFIX_TOKENS_0_THROUGH_33_EQUAL_004C1BB = TRUE
```

The byte identity is compact UTF-8 JSON plus one LF:

```json
["docker","run","--rm","-i","--pull=never","--platform","linux/amd64","--network","none","--read-only","--cap-drop","ALL","--security-opt","no-new-privileges","--pids-limit","64","--memory","512m","--cpus","2","--tmpfs","/tmp/signthos-apt:rw,nosuid,nodev,noexec,size=416m,mode=0755","-e","TMPDIR=/tmp/signthos-apt/tmp","-e","LC_ALL=C","-e","LANG=C","-e","TZ=UTC","--entrypoint","/bin/sh","docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3","-ceu","tmp=/tmp/signthos-apt/tmp\nraw=/tmp/signthos-apt/bb-input.tar\numask 022\n[ \"$PATH\" = /emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin ] || exit 10\n[ \"$EMSDK\" = /emsdk ] || exit 11\n[ \"$TMPDIR\" = /tmp/signthos-apt/tmp ] || exit 12\n[ \"$LC_ALL\" = C ] || exit 13\n[ \"$LANG\" = C ] || exit 14\n[ \"$TZ\" = UTC ] || exit 15\nfst=$(/usr/bin/stat -f -c %T /tmp/signthos-apt); [ \"$fst\" = tmpfs ] || exit 21\nx=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ \"$x\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 16\nx=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ \"$x\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 17\nx=$(/usr/bin/sha256sum /usr/bin/cat); x=${x%% *}; [ \"$x\" = 210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba ] || exit 18\nx=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ \"$x\" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 19\nx=$(/usr/bin/sha256sum /usr/bin/rm); x=${x%% *}; [ \"$x\" = 7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682 ] || exit 20\n/usr/bin/cat > \"$raw\"\nrb=$(/usr/bin/stat -c %s \"$raw\"); [ \"$rb\" = 204769280 ] || exit 40\nrh=$(/usr/bin/sha256sum \"$raw\"); rh=${rh%% *}; [ \"$rh\" = f7fd9486a7eadcf82fc5e7f66c166c3de757ff5c108a32aab2bf17cccfbd4755 ] || exit 41\n/usr/bin/tar -xpf \"$raw\" -C /\n/usr/bin/rm -- \"$raw\"\n[ ! -e \"$raw\" ] || exit 42\ndc=$(/usr/bin/find /tmp/signthos-apt -type d | /usr/bin/wc -l); [ \"$dc\" = 10 ] || exit 22\nfc=$(/usr/bin/find /tmp/signthos-apt -type f | /usr/bin/wc -l); [ \"$fc\" = 17 ] || exit 23\nlc=$(/usr/bin/find /tmp/signthos-apt -type l | /usr/bin/wc -l); [ \"$lc\" = 0 ] || exit 24\ninventory() { /usr/bin/find /tmp/signthos-apt -print | /usr/bin/sort | while IFS= read -r p; do case \"$p\" in /tmp/signthos-apt/tmp/bb-*) continue ;; esac; if [ -d \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 31; printf \"D\\t%s\\t%s\\n\" \"$p\" \"$m\"; elif [ -f \"$p\" ]; then m=$(/usr/bin/stat -c \"%s %a %u %g\" \"$p\") || exit 32; h=$(/usr/bin/sha256sum \"$p\") || exit 33; h=${h%% *}; printf \"F\\t%s\\t%s\\t%s\\n\" \"$p\" \"$m\" \"$h\"; elif [ -L \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 34; printf \"L\\t%s\\t%s\\n\" \"$p\" \"$m\"; else m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 35; printf \"O\\t%s\\t%s\\n\" \"$p\" \"$m\"; fi; done; }\ninventory > \"$tmp/bb-before.tsv\"\nbh=$(/usr/bin/sha256sum \"$tmp/bb-before.tsv\"); bh=${bh%% *}; [ \"$bh\" = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66 ] || exit 36\n: > \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /bin/sh); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /bin/sh \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/dash); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/dash \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ \"$x\" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/tar \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ \"$x\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sha256sum \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ \"$x\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/stat \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/find); x=${x%% *}; [ \"$x\" = 791b89c8bffb8101fd7d4d212b80af66a2332834b05a42721104eb47e8fa2eb1 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/find \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/wc); x=${x%% *}; [ \"$x\" = 504463c7a12780b7439321be6e67f43ab61a3ff429cbf916c0722d19f98692a8 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/wc \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sort); x=${x%% *}; [ \"$x\" = 0fc26ce295e8e549635da2129e389f63685745b3be7c1737db6251a296f1cd78 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sort \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/uname); x=${x%% *}; [ \"$x\" = 37df0311d0e24169abfd166bc6018d40b87306f7ff64d9eec256c8331ac26347 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/uname \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/ldd); x=${x%% *}; [ \"$x\" = 6752368e618c98f813bd346846df76021aa5d09caef634ee5dbe7d00c3c200fd ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/ldd \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-get); x=${x%% *}; [ \"$x\" = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196 ] || exit 27; printf \"%s\\t%s\\n\" /usr/bin/apt-get \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-config); x=${x%% *}; [ \"$x\" = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19 ] || exit 29; printf \"%s\\t%s\\n\" /usr/bin/apt-config \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/cat); x=${x%% *}; [ \"$x\" = 210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/cat \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/rm); x=${x%% *}; [ \"$x\" = 7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/rm \"$x\" >> \"$tmp/bb-helpers.tsv\"\nam=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-get); [ \"$am\" = \"51680 755 0 0\" ] || exit 28\ncm=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-config); [ \"$cm\" = \"27024 755 0 0\" ] || exit 30\nkernel=$(/usr/bin/uname -r)\nmachine=$(/usr/bin/uname -m)\n{ printf \"GUEST_KERNEL=%s\\n\" \"$kernel\"; printf \"GUEST_MACHINE=%s\\n\" \"$machine\"; /usr/bin/ldd --version; if [ -x /run/rosetta/rosetta ]; then printf \"ROSETTA_VISIBLE=YES\\n\"; else printf \"ROSETTA_VISIBLE=NO\\n\"; fi; } > \"$tmp/bb-substrate.stdout\" 2> \"$tmp/bb-substrate.stderr\"\ncase \"$kernel\" in 6.12.*rodete1-amd64) printf \"RODETE_PREDICATE=TRUE\\n\" >> \"$tmp/bb-substrate.stdout\"; exit 25 ;; *) printf \"RODETE_PREDICATE=FALSE\\n\" >> \"$tmp/bb-substrate.stdout\" ;; esac\n[ \"$machine\" = x86_64 ] || exit 26\n/usr/bin/apt-get --version > \"$tmp/bb-apt-version.stdout\" 2> \"$tmp/bb-apt-version.stderr\"\nprintf \"/usr/bin/apt-get\\t%s\\t%s\\n\" \"9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196\" \"$am\" > \"$tmp/bb-apt-identity.tsv\"\nset -- /usr/bin/apt-get --simulate -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 install --no-install-recommends pkg-config autoconf automake libtool ragel git yasm subversion lsb-release tzdata keyboard-configuration tini\nset +e\n/usr/bin/apt-config --no-empty -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 dump APT::Install::Pre-Invoke APT::Install::Post-Invoke-Success AptCli::Hooks::Install > \"$tmp/bb-hook.stdout\" 2> \"$tmp/bb-hook.stderr\"\nhook_rc=$?\nset -e\n[ \"$hook_rc\" -eq 0 ] || exit 61\n[ ! -s \"$tmp/bb-hook.stdout\" ] || exit 62\n[ ! -s \"$tmp/bb-hook.stderr\" ] || exit 63\n\"$@\" > \"$tmp/bb-apt.stdout\" 2> \"$tmp/bb-apt.stderr\" &\napt_pid=$!\n: > \"$tmp/bb-process.raw\"\nseen=\"|\"\nwhile kill -0 \"$apt_pid\" 2>/dev/null; do for c in /proc/[0-9]*/comm; do if IFS= read -r n 2>/dev/null < \"$c\"; then case \"$seen\" in *\"|$n|\"*) ;; *) seen=\"${seen}${n}|\"; printf \"%s\\n\" \"$n\" >> \"$tmp/bb-process.raw\" ;; esac; else [ ! -e \"$c\" ] || exit 70; fi; done; done\nset +e\nwait \"$apt_pid\"\napt_rc=$?\nset -e\nprintf \"%s\\n\" \"$hook_rc\" > \"$tmp/bb-hook.exit\"\nprintf \"%s\\n\" \"$apt_rc\" > \"$tmp/bb-apt.exit\"\n/usr/bin/sort -u \"$tmp/bb-process.raw\" > \"$tmp/bb-process.txt\"\ninventory > \"$tmp/bb-after.tsv\"\nah=$(/usr/bin/sha256sum \"$tmp/bb-after.tsv\"); ah=${ah%% *}\ninventory_rc=0\n[ \"$ah\" = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66 ] || inventory_rc=71\nif [ \"$inventory_rc\" -eq 0 ]; then [ \"$bh\" = \"$ah\" ] || inventory_rc=72; fi\n/usr/bin/tar --format=ustar --sort=name --mtime=@0 --owner=0 --group=0 --numeric-owner -cf - -C \"$tmp\" bb-after.tsv bb-apt-identity.tsv bb-apt-version.stderr bb-apt-version.stdout bb-apt.exit bb-apt.stderr bb-apt.stdout bb-before.tsv bb-helpers.tsv bb-hook.exit bb-hook.stderr bb-hook.stdout bb-process.txt bb-substrate.stderr bb-substrate.stdout\nexit \"$inventory_rc\"\n"]
```

## 7. Evidence member preservation

The repaired USTAR member set remains exactly the canonical 004C1BB set:

```text
bb-after.tsv
bb-apt-identity.tsv
bb-apt-version.stderr
bb-apt-version.stdout
bb-apt.exit
bb-apt.stderr
bb-apt.stdout
bb-before.tsv
bb-helpers.tsv
bb-hook.exit
bb-hook.stderr
bb-hook.stdout
bb-process.txt
bb-substrate.stderr
bb-substrate.stdout
```

No member is added, removed, renamed, reordered, or reinterpreted. On a later separately authorized replacement Replay A, a `71` or `72` outer exit may therefore still carry a complete normalized USTAR whose `bb-before.tsv`, `bb-after.tsv`, `bb-apt.exit`, `bb-apt.stdout`, and `bb-apt.stderr` can explain the failure without changing its classification.

## 8. Static reconstruction checks

The candidate was generated from canonical 004C1BB bytes and checked without Docker/APT execution:

```text
CANONICAL_GUEST_RECONSTRUCTION = PASS
CANONICAL_DOCKER_ARGV_RECONSTRUCTION = PASS
REPAIR_SITE_COUNT = 1
REPAIRED_GUEST_RECONSTRUCTION = PASS
REPAIRED_DOCKER_ARGV_RECONSTRUCTION = PASS
DOCKER_PREFIX_34_TOKENS_EQUAL = PASS
STAGE_A_ARGV_IDENTITY_UNCHANGED = PASS
HOOK_ARGV_IDENTITY_UNCHANGED = PASS
EVIDENCE_MEMBER_SET_UNCHANGED = PASS
USR_BIN_EXECUTABLE_REFERENCE_SET_UNCHANGED = PASS
POST_MISMATCH_EXIT_CODE = 71 / UNCHANGED
PRE_POST_MISMATCH_EXIT_CODE = 72 / UNCHANGED
SUCCESS_EXIT_CODE = 0 / UNCHANGED
EXECUTION_PERFORMED = 0
```

## 9. Exact static contract

Serialization is compact UTF-8 JSON with separators `(',', ':')`, `ensure_ascii=false`, and one trailing LF.

```text
004C1BE_CONTRACT_JSON_BYTES = 1759
004C1BE_CONTRACT_JSON_SHA256 = 972c73abf8faf82104e1d57025ee10d7180ffe454f43ac3cda94d08a7655c2bd
```

```json
{"schema":"signthos.004c1be.evidence-preserving-inventory-gate-repair.v1","authority":"github:issue-comment:5611755761","canonicalBase":"1548c9dee9f12703e7899ef09993cf6b31099d14","canonicalBaseTree":"3fd318b5bd263b82998a0bee11f1e4dc1d1cd019","predecessor":{"bbGuestScript":{"bytes":8931,"sha256":"de3d1add92899dd5fff4ad7f395929fcd27f66d15ddd03285d06c439aa00298a"},"bbDockerArgv":{"argc":35,"jsonBytes":9897,"sha256":"ddf10251d79b8adc7117db36813b792043eee9a2e23f9cacc10e0c20ee6ba038"},"stageAArgv":{"argc":42,"sha256":"dceeccc5096bbc9eb0c661b93be5a5091f459a2ffaeed808b4bebb212ebff96b"},"hookArgv":{"argc":32,"sha256":"c56c77e8d564c9c9d0f89342dc96d7aedeabc527107628d24ec4aa30bbc2a372"},"inputInventorySha256":"61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66","evidenceMembers":["bb-after.tsv","bb-apt-identity.tsv","bb-apt-version.stderr","bb-apt-version.stdout","bb-apt.exit","bb-apt.stderr","bb-apt.stdout","bb-before.tsv","bb-helpers.tsv","bb-hook.exit","bb-hook.stderr","bb-hook.stdout","bb-process.txt","bb-substrate.stderr","bb-substrate.stdout"]},"repair":{"guestScript":{"bytes":9021,"sha256":"1da42fb5adbaaafd2b4059b5d24ef15f4fd28dd70b66d4b1cae347755316ed75","trailingLf":true},"dockerArgv":{"argc":35,"jsonBytes":9994,"sha256":"f740e1839ec6be37ccb66d34d42011e73e86399d9c7fda4fb06dcb562830628a"},"dockerPrefixTokensByteEquivalent":true,"newHelperExecutables":0,"newEvidenceMembers":0,"failureOrdering":"COMPUTE_AFTER_INVENTORY_THEN_EXPORT_CANONICAL_USTAR_THEN_EXIT_STORED_71_OR_72","successExit":0,"postInventoryMismatchExit":71,"prePostMismatchExit":72},"execution":{"docker":false,"aptConfig":false,"aptGet":false,"dpkg":false,"packageAction":false,"stageA":false},"successor":"SEPARATE_ISSUE_7_REPLACEMENT_REPLAY_A_AUTHORITY_ONLY"}
```

## 10. Qualification result and successor boundary

```text
004C1BE_RESULT = PASS_STATIC_EVIDENCE_PRESERVATION_ORDERING_REPAIR_CANDIDATE
INVENTORY_INVARIANT_WEAKENED = NO
EXACT_004C1BD_MUTATED_PATH = NOT_ESTABLISHED
DOCKER_EXECUTION = 0
APT_EXECUTION = 0
REPLACEMENT_REPLAY_A = NOT_AUTHORIZED_BY_THIS_DOCUMENT
REPLAY_B = NOT_AUTHORIZED
```

This candidate may become canonical only after exact-head provider/check accounting, fresh independent substantive review, forward-only repair of every material finding, zero unresolved material review threads, immediate premerge race proof, guarded merge using the exact final `expected_head_sha`, and mechanical post-merge verification. Only a later fresh Issue #7 reconciliation may authorize one replacement 004C1BD Replay A using the exact reviewed 004C1BE repaired Docker argv. Replay B remains separately gated on a qualifying replacement Replay A.
