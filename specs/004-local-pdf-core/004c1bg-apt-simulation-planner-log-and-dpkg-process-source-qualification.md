# 004C1BG — APT simulation planner-log and dpkg-process source qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_SOURCE_GROUNDED_SIDE_EFFECT_RECONCILIATION_ONLY / ZERO_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `862b4e581bda07a4106ed2d0fe8149d51b65b766`
Canonical base tree: `6d9ff253757a0002fec0883f3b257beb78837fdd`
Authority source: `github:issue-comment:5611862102`
Preserved replacement Replay A: `github:issue-comment:5611861978`

## 1. Purpose and authority boundary

004C1BF preserved a nonqualifying replacement Replay A rather than normalizing two runtime findings away. The exact APT simulation exited internally with `0` and the canonical 004C1BC parser accepted the solver transaction, but the outer repaired harness correctly returned `71` because the post-simulation input inventory changed. The same evidence also observed a `dpkg` process despite the explicit 004C1BF prohibition on dpkg execution.

004C1BG is static-only. It explains both observations from exact retained APT 2.4.13 source and freezes the smallest reviewable repair candidate. It does not execute Docker, APT, dpkg, a replacement Replay A, Replay B, or any downstream stage.

```text
004C1BG_AUTHORITY = STATIC_EXACT_SOURCE_GROUNDED_SIDE_EFFECT_AND_PROCESS_RECONCILIATION_ONLY
004C1BG_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1bg-apt-simulation-planner-log-and-dpkg-process-source-qualification.md
004C1BG_MAX_CHANGED_REPOSITORY_FILES = 1
DOCKER_EXECUTION = 0
APT_CONFIG_EXECUTION = 0
APT_GET_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = 0
REPLACEMENT_REPLAY_A_RETRY = NOT_AUTHORIZED
REPLAY_B = NOT_AUTHORIZED
STAGE_B = NOT_AUTHORIZED
STAGE_C = NOT_AUTHORIZED
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Bound 004C1BF evidence

```text
004C1BF_OUTER_DOCKER_EXIT = 71
004C1BF_OUTER_STDOUT_BYTES = 30720
004C1BF_OUTER_STDOUT_SHA256 = fd8dbd1f68bdbd2108e27c96fe231ba17683c33ed962ee17079a282ea139126a
004C1BF_OUTER_STDERR_BYTES = 0
004C1BF_OUTER_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
004C1BF_EVIDENCE_MEMBER_COUNT = 15
004C1BF_HOOK_EXIT = 0
004C1BF_INNER_APT_EXIT = 0
004C1BF_INNER_APT_STDOUT_BYTES = 4783
004C1BF_INNER_APT_STDOUT_SHA256 = 400d3f527a9e79075c462f93f29d8bfb6949e73cd263b21a0c33a7ef23423e19
004C1BF_BEFORE_INVENTORY_BYTES = 3523
004C1BF_BEFORE_INVENTORY_SHA256 = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66
004C1BF_AFTER_INVENTORY_BYTES = 3638
004C1BF_AFTER_INVENTORY_SHA256 = a0dbf0781159570b1d251d8a1ff553ef19e8a7de3314709d81d2401bad1772d2
004C1BF_INVENTORY_DELTA = ONE_ADDED_FILE
004C1BF_ADDED_PATH = /tmp/signthos-apt/log/eipp.log.xz
004C1BF_ADDED_FILE_BYTES = 11504
004C1BF_ADDED_FILE_SHA256 = 0f2fa71a7a1d10918480ba0ad8c01e4a5b8ded4c81a31ace1044ed59b6bce0be
004C1BF_PROCESS_OBSERVER = $$use_rosetta$$,apt-get,dpkg,https,sh
004C1BF_DPKG_PROCESS_OBSERVED = YES
004C1BC_PARSER_QUALIFIES = TRUE
004C1BC_PARSER_FINDINGS = 0
004C1BC_TRANSACTION_RECORD_COUNT = 25
004C1BC_TRANSACTION_INSTALL = 24
004C1BC_TRANSACTION_UPGRADE = 1
004C1BC_TRANSACTION_DOWNGRADE = 0
004C1BC_TRANSACTION_REMOVE = 0
004C1BC_TRANSACTION_JSONL_BYTES = 12229
004C1BC_TRANSACTION_JSONL_SHA256 = 64de571251fd51da1df513b6be7e588b4479556153d9ce5d58e99bddf2d4fc20
004C1BC_SELECTED_ARCHIVE_IDENTITY_COUNT = 25
004C1BC_SELECTED_ARCHIVE_IDENTITY_SET_SHA256 = dfb22aa56bff78332aed1d6108f7f45be3739a583624feda5831cf773a440962
004C1BF_RESULT = NONQUALIFYING_FAIL_CLOSED
```

The parser result is solver evidence only. It does not override the inventory or process-execution governance findings.

## 3. Exact APT 2.4.13 source identities

Retained source revision: `581ec5c0aa2c6665d72465040f1465eb93503200`.

First-party source provenance is the Ubuntu APT source repository `https://git.launchpad.net/ubuntu/+source/apt`, annotated tag object `27207612b00b302b7b18cfeec355bad1a5de6bca` (`import/2.4.13`), peeled commit `581ec5c0aa2c6665d72465040f1465eb93503200`, and tree `e9afcae41f88040e93eb7a10a89e72c00b59e245`. The Ubuntu source tarball identity remains SHA-256 `8bdb54d6bf07185c8687d4ab8eb66690cdbbea31d1b0afa8778598f1ae9dc8a7`.

| Source file | Bytes | SHA-256 |
| --- | ---: | --- |
| `apt-pkg/init.cc` | 11966 | `e231c4a740d0ce656dd2b501bb2ee3900b312477dafae6b482f11195535c7fad` |
| `apt-pkg/edsp.cc` | 45700 | `0cd609aa41a9dc07beb414bd5d6f94958c5e6bf5ffad794df2f8d9edc7f506c2` |
| `apt-pkg/deb/debsystem.cc` | 16407 | `c6d0d861c838285496034f6619c8aec7d7773bf8f04cfd741c339fafe1b9edad` |
| `apt-pkg/packagemanager.cc` | 42048 | `af0805eb8ced9971d34486be57f53a389cb87ece504c59ca77ffcc5f61513a8a` |
| `apt-pkg/aptconfiguration.cc` | 20205 | `9220c9d6c8ca599a85fe64f4e346c9a44097745b8733660b8d739673641f8e9b` |
| `apt-private/private-cmndline.cc` | 24949 | `ac94ee0b1462654f263a0ed6ca482d5dc1c0c999caf9a131856fa469b82d8541` |
| `apt-pkg/contrib/cmndline.cc` | 12491 | `29d1d858d31f993a9137ad1c581d92e4caeaf99f961f49a75b7eacfe3e943134` |
| `apt-pkg/contrib/configuration.cc` | 33669 | `95c780ce50510038b2e9f1ba7bb868672eaeec363575cafd2c4c328f83cd936f` |
| `cmdline/apt-config.cc` | 5282 | `22fe9785ec231590698bf8bc032df21029638357a9b20590ae276be51aa96d30` |
| `apt-private/private-install.cc` | 43268 | `70731f4b87a6211600b9573995e41e6b200010d3cd0508f73a0061c45a32fc90` |
| `apt-pkg/deb/dpkgpm.cc` | 84151 | `5613f7e7b4d0f09289739fe3fa7156afa09b46948ec86c4a2e8f57dac661fc18` |
| `apt-pkg/statechanges.cc` | 6993 | `70d4cf3f3d824628ebad2910e7b6ded43147271ded4d124ba23d48a5bb4f3855` |
| `apt-pkg/pkgsystem.cc` | 2084 | `d78acdb6ac2366ce878980f60a1035b9931f38b5e15f4ef77d7be7cfc4b4bf36` |
| `apt-pkg/edsp/edspsystem.cc` | 4917 | `3fbf34d2fecca4dba50e9733d6e59b2a95f308144c2eac3d01dad7893e363f50` |

### 3.1 Planner-log creation is required by the selected internal-planner path

`apt-pkg/init.cc` conditionally defaults `Dir::Log::Planner` to `eipp.log.xz`. The 004C1BE/004C1BF Stage A command sets `Dir::Log=/tmp/signthos-apt/log/`, so the effective planner path becomes `/tmp/signthos-apt/log/eipp.log.xz`.

`pkgPackageManager::OrderInstall()` in `apt-pkg/packagemanager.cc` selects `APT::Planner` with default `internal` and calls `EIPP::OrderInstall(...)`. In `apt-pkg/edsp.cc`, the internal-planner branch calls `CreateDumpFile("EIPP::OrderInstall", "planner", output)`. `CreateDumpFile` resolves `Dir::Log::Planner` and creates the file. For `pkgSimulate`, failure to create that dump file is itself fatal to the internal-planner path. Therefore simply emptying or ignoring `Dir::Log::Planner` is not a valid equivalent repair.

This source path explains the exact observed `eipp.log.xz` creation without asserting any unobserved package action.

### 3.2 The observed dpkg process is architecture discovery, not package installation evidence

`APT::Configuration::getArchitectures()` in `apt-pkg/aptconfiguration.cc` first reads the configured `APT::Architectures` vector. Only when that vector is empty does it call `_system->ArchitecturesSupported()`.

`debSystem::ArchitecturesSupported()` in `apt-pkg/deb/debsystem.cc` then constructs the dpkg base command, appends `--print-foreign-architectures`, invokes `ExecDpkg`, and waits for that process. The frozen 004C1BF command specified neither `APT::Architectures` nor a replacement architecture vector. This exact source branch therefore accounts for the observed `dpkg` process.

The command-line binding is source-complete. `apt-private/private-cmndline.cc` registers `-o`/`--option` as `CommandLine::ArbItem`; `apt-pkg/contrib/cmndline.cc` splits the supplied `key=value` at the first `=` and calls `Configuration::Set(key, value)`; and `Configuration::FindVector()` in `apt-pkg/contrib/configuration.cc` returns a comma-split vector directly when the configured top-level scalar value is non-empty. Therefore `-o APT::Architectures=amd64` deterministically makes `getArchitectures()` observe a non-empty vector containing `amd64`, so the `ArchitecturesSupported()` fallback is not reached. `cmdline/apt-config.cc` itself calls `getArchitectures()` during command initialization, which is why the same explicit architecture binding is required in the hook-query command as well as the Stage A command.

The observation does not establish package unpack/configure execution. It does establish that 004C1BF's broader `DPKG_EXECUTION = PROHIBITED` gate was violated and must remain fail-closed.

The system-selection ordering is also source-grounded. `ParseCommandLine()` in `apt-private/private-cmndline.cc` first initializes configuration, then parses the command line (including `-o` overrides), and only after successful parsing calls `pkgInitSystem()`. Therefore `Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited` is already effective when system scoring runs. At this exact source revision the registered automatic system candidates are the Debian dpkg system and the EDSP/EIPP systems. `edspLikeSystem::Score()` returns `-1000` unconditionally (“Never use the EDSP system automatically”). `debSystem::Score()` awards `+10` for the configured status file, `+10` when the configured dpkg path exists, and `+10` for `/etc/debian_version`. The canonical AW state contains `/tmp/signthos-apt/state/status`, and the retained 004C1AI rootfs inventory contains `/etc/debian_version`; the deliberately nonexistent dpkg path therefore removes only the middle `+10`, leaving a positive Debian score of `20` versus `-1000` for EDSP/EIPP. The sentinel cannot redirect automatic system selection away from the Debian backend.

`debSystem::GetDpkgExecutable()` resolves `Dir::Bin::dpkg`, and `debSystem::GetDpkgBaseCommand()` uses that result. The exact-source architecture probe, feature assertions, state-change helpers, and real `pkgDPkgPM` command construction all derive their configured dpkg executable from this base-command path. Separately, `apt-private/private-install.cc` constructs `SimulateWithActionGroupInhibited`, a `pkgSimulate`, for `APT::Get::Simulate` and returns from that simulation branch before the real `pkgDPkgPM` execution path. The nonexistent configured dpkg path is therefore a fail-closed control for any unexpected configured-dpkg call while preserving the selected Debian package-system backend.

## 4. Smallest static repair candidate

The candidate preserves the internal EIPP planner rather than disabling it, preserves its output as explicit evidence, and avoids the dpkg architecture-discovery branch by explicitly freezing the already-selected architecture universe.

Exactly two effective APT configuration sites are changed—the same configuration fragment in the same-container hook query and Stage A `apt-get --simulate` command:

```text
ADD = -o Dir::Log::Planner=/tmp/signthos-apt/tmp/bb-eipp.log.xz
ADD = -o APT::Architectures=amd64
ADD = -o Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited
```

`Dir::Log::Planner` is redirected into the existing isolated evidence tmpfs namespace under a `bb-*` path. The canonical inventory function already excludes `tmp/bb-*` evidence artifacts, so the planner file is no longer an input-state mutation. Unlike a silent exclusion, the candidate adds `bb-eipp.log.xz` to the normalized evidence USTAR and requires the file to exist before export. The candidate preserves the planner log plus a dedicated `bb-eipp-identity.tsv` record containing its observed byte count and SHA-256. This changes the evidence set from 15 to 17 members intentionally and reviewably. The same `CommandLine::ArbItem` source path proves that `-o Dir::Log::Planner=/tmp/signthos-apt/tmp/bb-eipp.log.xz` overrides the planner-log key used by `CreateDumpFile`; the repair therefore redirects the output rather than merely describing an intended path.

`APT::Architectures=amd64` is source-grounded to bypass the empty-vector call to `ArchitecturesSupported()` and therefore the `dpkg --print-foreign-architectures` discovery path. Its scalar-to-vector behavior is bound above from exact 2.4.13 source. The candidate additionally sets `Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited` at both APT command sites. Exact `debSystem::GetDpkgBaseCommand()` source resolves the dpkg executable through `Dir::Bin::dpkg`; therefore any later reachable dpkg invocation through that mechanism fails closed instead of executing `/usr/bin/dpkg`. This is still a static qualification only; successful runtime validation requires separate authority.

The candidate also makes nonzero `apt-get --simulate` status fail closed as stored exit `74`. It still exports the evidence bundle first, so failure evidence is preserved; an APT failure can no longer be normalized to outer success.

No Docker-envelope token changes. Docker argv tokens 0 through 33 remain byte-equivalent to 004C1BE; only the final guest-script token changes.

## 5. Exact candidate guest script

```text
004C1BG_CANDIDATE_GUEST_SCRIPT_BYTES = 9640
004C1BG_CANDIDATE_GUEST_SCRIPT_SHA256 = c21cd9bc873daa1be481f8be797354acc7f9e4db5b22ddf602c1e8f3e5c44fd7
004C1BG_CANDIDATE_GUEST_SCRIPT_TRAILING_LF = TRUE
```

```json
"tmp=/tmp/signthos-apt/tmp\nraw=/tmp/signthos-apt/bb-input.tar\numask 022\n[ \"$PATH\" = /emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin ] || exit 10\n[ \"$EMSDK\" = /emsdk ] || exit 11\n[ \"$TMPDIR\" = /tmp/signthos-apt/tmp ] || exit 12\n[ \"$LC_ALL\" = C ] || exit 13\n[ \"$LANG\" = C ] || exit 14\n[ \"$TZ\" = UTC ] || exit 15\nfst=$(/usr/bin/stat -f -c %T /tmp/signthos-apt); [ \"$fst\" = tmpfs ] || exit 21\nx=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ \"$x\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 16\nx=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ \"$x\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 17\nx=$(/usr/bin/sha256sum /usr/bin/cat); x=${x%% *}; [ \"$x\" = 210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba ] || exit 18\nx=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ \"$x\" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 19\nx=$(/usr/bin/sha256sum /usr/bin/rm); x=${x%% *}; [ \"$x\" = 7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682 ] || exit 20\n/usr/bin/cat > \"$raw\"\nrb=$(/usr/bin/stat -c %s \"$raw\"); [ \"$rb\" = 204769280 ] || exit 40\nrh=$(/usr/bin/sha256sum \"$raw\"); rh=${rh%% *}; [ \"$rh\" = f7fd9486a7eadcf82fc5e7f66c166c3de757ff5c108a32aab2bf17cccfbd4755 ] || exit 41\n/usr/bin/tar -xpf \"$raw\" -C /\n/usr/bin/rm -- \"$raw\"\n[ ! -e \"$raw\" ] || exit 42\ndc=$(/usr/bin/find /tmp/signthos-apt -type d | /usr/bin/wc -l); [ \"$dc\" = 10 ] || exit 22\nfc=$(/usr/bin/find /tmp/signthos-apt -type f | /usr/bin/wc -l); [ \"$fc\" = 17 ] || exit 23\nlc=$(/usr/bin/find /tmp/signthos-apt -type l | /usr/bin/wc -l); [ \"$lc\" = 0 ] || exit 24\ninventory() { /usr/bin/find /tmp/signthos-apt -print | /usr/bin/sort | while IFS= read -r p; do case \"$p\" in /tmp/signthos-apt/tmp/bb-*) continue ;; esac; if [ -d \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 31; printf \"D\\t%s\\t%s\\n\" \"$p\" \"$m\"; elif [ -f \"$p\" ]; then m=$(/usr/bin/stat -c \"%s %a %u %g\" \"$p\") || exit 32; h=$(/usr/bin/sha256sum \"$p\") || exit 33; h=${h%% *}; printf \"F\\t%s\\t%s\\t%s\\n\" \"$p\" \"$m\" \"$h\"; elif [ -L \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 34; printf \"L\\t%s\\t%s\\n\" \"$p\" \"$m\"; else m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 35; printf \"O\\t%s\\t%s\\n\" \"$p\" \"$m\"; fi; done; }\ninventory > \"$tmp/bb-before.tsv\"\nbh=$(/usr/bin/sha256sum \"$tmp/bb-before.tsv\"); bh=${bh%% *}; [ \"$bh\" = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66 ] || exit 36\n: > \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /bin/sh); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /bin/sh \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/dash); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/dash \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ \"$x\" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/tar \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ \"$x\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sha256sum \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ \"$x\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/stat \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/find); x=${x%% *}; [ \"$x\" = 791b89c8bffb8101fd7d4d212b80af66a2332834b05a42721104eb47e8fa2eb1 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/find \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/wc); x=${x%% *}; [ \"$x\" = 504463c7a12780b7439321be6e67f43ab61a3ff429cbf916c0722d19f98692a8 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/wc \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sort); x=${x%% *}; [ \"$x\" = 0fc26ce295e8e549635da2129e389f63685745b3be7c1737db6251a296f1cd78 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sort \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/uname); x=${x%% *}; [ \"$x\" = 37df0311d0e24169abfd166bc6018d40b87306f7ff64d9eec256c8331ac26347 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/uname \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/ldd); x=${x%% *}; [ \"$x\" = 6752368e618c98f813bd346846df76021aa5d09caef634ee5dbe7d00c3c200fd ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/ldd \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-get); x=${x%% *}; [ \"$x\" = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196 ] || exit 27; printf \"%s\\t%s\\n\" /usr/bin/apt-get \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-config); x=${x%% *}; [ \"$x\" = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19 ] || exit 29; printf \"%s\\t%s\\n\" /usr/bin/apt-config \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/cat); x=${x%% *}; [ \"$x\" = 210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/cat \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/rm); x=${x%% *}; [ \"$x\" = 7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/rm \"$x\" >> \"$tmp/bb-helpers.tsv\"\nam=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-get); [ \"$am\" = \"51680 755 0 0\" ] || exit 28\ncm=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-config); [ \"$cm\" = \"27024 755 0 0\" ] || exit 30\nkernel=$(/usr/bin/uname -r)\nmachine=$(/usr/bin/uname -m)\n{ printf \"GUEST_KERNEL=%s\\n\" \"$kernel\"; printf \"GUEST_MACHINE=%s\\n\" \"$machine\"; /usr/bin/ldd --version; if [ -x /run/rosetta/rosetta ]; then printf \"ROSETTA_VISIBLE=YES\\n\"; else printf \"ROSETTA_VISIBLE=NO\\n\"; fi; } > \"$tmp/bb-substrate.stdout\" 2> \"$tmp/bb-substrate.stderr\"\ncase \"$kernel\" in 6.12.*rodete1-amd64) printf \"RODETE_PREDICATE=TRUE\\n\" >> \"$tmp/bb-substrate.stdout\"; exit 25 ;; *) printf \"RODETE_PREDICATE=FALSE\\n\" >> \"$tmp/bb-substrate.stdout\" ;; esac\n[ \"$machine\" = x86_64 ] || exit 26\n/usr/bin/apt-get --version > \"$tmp/bb-apt-version.stdout\" 2> \"$tmp/bb-apt-version.stderr\"\nprintf \"/usr/bin/apt-get\\t%s\\t%s\\n\" \"9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196\" \"$am\" > \"$tmp/bb-apt-identity.tsv\"\nset -- /usr/bin/apt-get --simulate -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Dir::Log::Planner=/tmp/signthos-apt/tmp/bb-eipp.log.xz -o APT::Architectures=amd64 -o Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 install --no-install-recommends pkg-config autoconf automake libtool ragel git yasm subversion lsb-release tzdata keyboard-configuration tini\nset +e\n/usr/bin/apt-config --no-empty -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Dir::Log::Planner=/tmp/signthos-apt/tmp/bb-eipp.log.xz -o APT::Architectures=amd64 -o Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 dump APT::Install::Pre-Invoke APT::Install::Post-Invoke-Success AptCli::Hooks::Install > \"$tmp/bb-hook.stdout\" 2> \"$tmp/bb-hook.stderr\"\nhook_rc=$?\nset -e\n[ \"$hook_rc\" -eq 0 ] || exit 61\n[ ! -s \"$tmp/bb-hook.stdout\" ] || exit 62\n[ ! -s \"$tmp/bb-hook.stderr\" ] || exit 63\n\"$@\" > \"$tmp/bb-apt.stdout\" 2> \"$tmp/bb-apt.stderr\" &\napt_pid=$!\n: > \"$tmp/bb-process.raw\"\nseen=\"|\"\nwhile kill -0 \"$apt_pid\" 2>/dev/null; do for c in /proc/[0-9]*/comm; do if IFS= read -r n 2>/dev/null < \"$c\"; then case \"$seen\" in *\"|$n|\"*) ;; *) seen=\"${seen}${n}|\"; printf \"%s\\n\" \"$n\" >> \"$tmp/bb-process.raw\" ;; esac; else [ ! -e \"$c\" ] || exit 70; fi; done; done\nset +e\nwait \"$apt_pid\"\napt_rc=$?\nset -e\nprintf \"%s\\n\" \"$hook_rc\" > \"$tmp/bb-hook.exit\"\nprintf \"%s\\n\" \"$apt_rc\" > \"$tmp/bb-apt.exit\"\nrun_rc=0\n[ \"$apt_rc\" -eq 0 ] || run_rc=74\n/usr/bin/sort -u \"$tmp/bb-process.raw\" > \"$tmp/bb-process.txt\"\ninventory > \"$tmp/bb-after.tsv\"\n[ -f \"$tmp/bb-eipp.log.xz\" ] || exit 73\neb=$(/usr/bin/stat -c %s \"$tmp/bb-eipp.log.xz\")\neh=$(/usr/bin/sha256sum \"$tmp/bb-eipp.log.xz\"); eh=${eh%% *}\nprintf \"%s\\t%s\\n\" \"$eb\" \"$eh\" > \"$tmp/bb-eipp-identity.tsv\"\nah=$(/usr/bin/sha256sum \"$tmp/bb-after.tsv\"); ah=${ah%% *}\ninventory_rc=0\n[ \"$ah\" = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66 ] || inventory_rc=71\nif [ \"$inventory_rc\" -eq 0 ]; then [ \"$bh\" = \"$ah\" ] || inventory_rc=72; fi\nif [ \"$run_rc\" -eq 0 ]; then run_rc=$inventory_rc; fi\n/usr/bin/tar --format=ustar --sort=name --mtime=@0 --owner=0 --group=0 --numeric-owner -cf - -C \"$tmp\" bb-after.tsv bb-apt-identity.tsv bb-apt-version.stderr bb-apt-version.stdout bb-apt.exit bb-apt.stderr bb-apt.stdout bb-before.tsv bb-eipp-identity.tsv bb-eipp.log.xz bb-helpers.tsv bb-hook.exit bb-hook.stderr bb-hook.stdout bb-process.txt bb-substrate.stderr bb-substrate.stdout\nexit \"$run_rc\"\n"
```

## 6. Exact candidate Docker argv

```text
004C1BG_CANDIDATE_DOCKER_ARGC = 35
004C1BG_CANDIDATE_DOCKER_ARGV_JSON_BYTES = 10640
004C1BG_CANDIDATE_DOCKER_ARGV_SHA256 = 069361c37995b9ad04daa4b34f922044825eaf78546455f06786dec8afba99e2
004C1BG_DOCKER_PREFIX_TOKENS_0_THROUGH_33_EQUAL_004C1BE = TRUE
```

```json
["docker","run","--rm","-i","--pull=never","--platform","linux/amd64","--network","none","--read-only","--cap-drop","ALL","--security-opt","no-new-privileges","--pids-limit","64","--memory","512m","--cpus","2","--tmpfs","/tmp/signthos-apt:rw,nosuid,nodev,noexec,size=416m,mode=0755","-e","TMPDIR=/tmp/signthos-apt/tmp","-e","LC_ALL=C","-e","LANG=C","-e","TZ=UTC","--entrypoint","/bin/sh","docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3","-ceu","tmp=/tmp/signthos-apt/tmp\nraw=/tmp/signthos-apt/bb-input.tar\numask 022\n[ \"$PATH\" = /emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin ] || exit 10\n[ \"$EMSDK\" = /emsdk ] || exit 11\n[ \"$TMPDIR\" = /tmp/signthos-apt/tmp ] || exit 12\n[ \"$LC_ALL\" = C ] || exit 13\n[ \"$LANG\" = C ] || exit 14\n[ \"$TZ\" = UTC ] || exit 15\nfst=$(/usr/bin/stat -f -c %T /tmp/signthos-apt); [ \"$fst\" = tmpfs ] || exit 21\nx=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ \"$x\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 16\nx=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ \"$x\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 17\nx=$(/usr/bin/sha256sum /usr/bin/cat); x=${x%% *}; [ \"$x\" = 210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba ] || exit 18\nx=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ \"$x\" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 19\nx=$(/usr/bin/sha256sum /usr/bin/rm); x=${x%% *}; [ \"$x\" = 7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682 ] || exit 20\n/usr/bin/cat > \"$raw\"\nrb=$(/usr/bin/stat -c %s \"$raw\"); [ \"$rb\" = 204769280 ] || exit 40\nrh=$(/usr/bin/sha256sum \"$raw\"); rh=${rh%% *}; [ \"$rh\" = f7fd9486a7eadcf82fc5e7f66c166c3de757ff5c108a32aab2bf17cccfbd4755 ] || exit 41\n/usr/bin/tar -xpf \"$raw\" -C /\n/usr/bin/rm -- \"$raw\"\n[ ! -e \"$raw\" ] || exit 42\ndc=$(/usr/bin/find /tmp/signthos-apt -type d | /usr/bin/wc -l); [ \"$dc\" = 10 ] || exit 22\nfc=$(/usr/bin/find /tmp/signthos-apt -type f | /usr/bin/wc -l); [ \"$fc\" = 17 ] || exit 23\nlc=$(/usr/bin/find /tmp/signthos-apt -type l | /usr/bin/wc -l); [ \"$lc\" = 0 ] || exit 24\ninventory() { /usr/bin/find /tmp/signthos-apt -print | /usr/bin/sort | while IFS= read -r p; do case \"$p\" in /tmp/signthos-apt/tmp/bb-*) continue ;; esac; if [ -d \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 31; printf \"D\\t%s\\t%s\\n\" \"$p\" \"$m\"; elif [ -f \"$p\" ]; then m=$(/usr/bin/stat -c \"%s %a %u %g\" \"$p\") || exit 32; h=$(/usr/bin/sha256sum \"$p\") || exit 33; h=${h%% *}; printf \"F\\t%s\\t%s\\t%s\\n\" \"$p\" \"$m\" \"$h\"; elif [ -L \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 34; printf \"L\\t%s\\t%s\\n\" \"$p\" \"$m\"; else m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 35; printf \"O\\t%s\\t%s\\n\" \"$p\" \"$m\"; fi; done; }\ninventory > \"$tmp/bb-before.tsv\"\nbh=$(/usr/bin/sha256sum \"$tmp/bb-before.tsv\"); bh=${bh%% *}; [ \"$bh\" = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66 ] || exit 36\n: > \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /bin/sh); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /bin/sh \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/dash); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/dash \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ \"$x\" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/tar \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ \"$x\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sha256sum \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ \"$x\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/stat \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/find); x=${x%% *}; [ \"$x\" = 791b89c8bffb8101fd7d4d212b80af66a2332834b05a42721104eb47e8fa2eb1 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/find \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/wc); x=${x%% *}; [ \"$x\" = 504463c7a12780b7439321be6e67f43ab61a3ff429cbf916c0722d19f98692a8 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/wc \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sort); x=${x%% *}; [ \"$x\" = 0fc26ce295e8e549635da2129e389f63685745b3be7c1737db6251a296f1cd78 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sort \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/uname); x=${x%% *}; [ \"$x\" = 37df0311d0e24169abfd166bc6018d40b87306f7ff64d9eec256c8331ac26347 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/uname \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/ldd); x=${x%% *}; [ \"$x\" = 6752368e618c98f813bd346846df76021aa5d09caef634ee5dbe7d00c3c200fd ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/ldd \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-get); x=${x%% *}; [ \"$x\" = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196 ] || exit 27; printf \"%s\\t%s\\n\" /usr/bin/apt-get \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-config); x=${x%% *}; [ \"$x\" = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19 ] || exit 29; printf \"%s\\t%s\\n\" /usr/bin/apt-config \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/cat); x=${x%% *}; [ \"$x\" = 210ffa7daedb3ef6e9230d391e9a10043699ba81080ebf40c6de70ed77e278ba ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/cat \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/rm); x=${x%% *}; [ \"$x\" = 7477c0f734a465a39a4fe40f6a9bb9d7431827e0a1d799ad1f25855b5dc63682 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/rm \"$x\" >> \"$tmp/bb-helpers.tsv\"\nam=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-get); [ \"$am\" = \"51680 755 0 0\" ] || exit 28\ncm=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-config); [ \"$cm\" = \"27024 755 0 0\" ] || exit 30\nkernel=$(/usr/bin/uname -r)\nmachine=$(/usr/bin/uname -m)\n{ printf \"GUEST_KERNEL=%s\\n\" \"$kernel\"; printf \"GUEST_MACHINE=%s\\n\" \"$machine\"; /usr/bin/ldd --version; if [ -x /run/rosetta/rosetta ]; then printf \"ROSETTA_VISIBLE=YES\\n\"; else printf \"ROSETTA_VISIBLE=NO\\n\"; fi; } > \"$tmp/bb-substrate.stdout\" 2> \"$tmp/bb-substrate.stderr\"\ncase \"$kernel\" in 6.12.*rodete1-amd64) printf \"RODETE_PREDICATE=TRUE\\n\" >> \"$tmp/bb-substrate.stdout\"; exit 25 ;; *) printf \"RODETE_PREDICATE=FALSE\\n\" >> \"$tmp/bb-substrate.stdout\" ;; esac\n[ \"$machine\" = x86_64 ] || exit 26\n/usr/bin/apt-get --version > \"$tmp/bb-apt-version.stdout\" 2> \"$tmp/bb-apt-version.stderr\"\nprintf \"/usr/bin/apt-get\\t%s\\t%s\\n\" \"9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196\" \"$am\" > \"$tmp/bb-apt-identity.tsv\"\nset -- /usr/bin/apt-get --simulate -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Dir::Log::Planner=/tmp/signthos-apt/tmp/bb-eipp.log.xz -o APT::Architectures=amd64 -o Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 install --no-install-recommends pkg-config autoconf automake libtool ragel git yasm subversion lsb-release tzdata keyboard-configuration tini\nset +e\n/usr/bin/apt-config --no-empty -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Dir::Log::Planner=/tmp/signthos-apt/tmp/bb-eipp.log.xz -o APT::Architectures=amd64 -o Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 dump APT::Install::Pre-Invoke APT::Install::Post-Invoke-Success AptCli::Hooks::Install > \"$tmp/bb-hook.stdout\" 2> \"$tmp/bb-hook.stderr\"\nhook_rc=$?\nset -e\n[ \"$hook_rc\" -eq 0 ] || exit 61\n[ ! -s \"$tmp/bb-hook.stdout\" ] || exit 62\n[ ! -s \"$tmp/bb-hook.stderr\" ] || exit 63\n\"$@\" > \"$tmp/bb-apt.stdout\" 2> \"$tmp/bb-apt.stderr\" &\napt_pid=$!\n: > \"$tmp/bb-process.raw\"\nseen=\"|\"\nwhile kill -0 \"$apt_pid\" 2>/dev/null; do for c in /proc/[0-9]*/comm; do if IFS= read -r n 2>/dev/null < \"$c\"; then case \"$seen\" in *\"|$n|\"*) ;; *) seen=\"${seen}${n}|\"; printf \"%s\\n\" \"$n\" >> \"$tmp/bb-process.raw\" ;; esac; else [ ! -e \"$c\" ] || exit 70; fi; done; done\nset +e\nwait \"$apt_pid\"\napt_rc=$?\nset -e\nprintf \"%s\\n\" \"$hook_rc\" > \"$tmp/bb-hook.exit\"\nprintf \"%s\\n\" \"$apt_rc\" > \"$tmp/bb-apt.exit\"\nrun_rc=0\n[ \"$apt_rc\" -eq 0 ] || run_rc=74\n/usr/bin/sort -u \"$tmp/bb-process.raw\" > \"$tmp/bb-process.txt\"\ninventory > \"$tmp/bb-after.tsv\"\n[ -f \"$tmp/bb-eipp.log.xz\" ] || exit 73\neb=$(/usr/bin/stat -c %s \"$tmp/bb-eipp.log.xz\")\neh=$(/usr/bin/sha256sum \"$tmp/bb-eipp.log.xz\"); eh=${eh%% *}\nprintf \"%s\\t%s\\n\" \"$eb\" \"$eh\" > \"$tmp/bb-eipp-identity.tsv\"\nah=$(/usr/bin/sha256sum \"$tmp/bb-after.tsv\"); ah=${ah%% *}\ninventory_rc=0\n[ \"$ah\" = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66 ] || inventory_rc=71\nif [ \"$inventory_rc\" -eq 0 ]; then [ \"$bh\" = \"$ah\" ] || inventory_rc=72; fi\nif [ \"$run_rc\" -eq 0 ]; then run_rc=$inventory_rc; fi\n/usr/bin/tar --format=ustar --sort=name --mtime=@0 --owner=0 --group=0 --numeric-owner -cf - -C \"$tmp\" bb-after.tsv bb-apt-identity.tsv bb-apt-version.stderr bb-apt-version.stdout bb-apt.exit bb-apt.stderr bb-apt.stdout bb-before.tsv bb-eipp-identity.tsv bb-eipp.log.xz bb-helpers.tsv bb-hook.exit bb-hook.stderr bb-hook.stdout bb-process.txt bb-substrate.stderr bb-substrate.stdout\nexit \"$run_rc\"\n"]
```

## 7. Static fail-closed contract

A later execution successor may use this candidate only after this exact document receives fresh exact-head independent substantive review, guarded merge, post-merge verification, and fresh Issue #7 authorization. Any such future replay must fail closed unless all predecessor byte identities remain exact.

The later runtime acceptance predicate must at minimum require:

1. exact repaired guest and Docker argv identities from this document;
2. exact canonical AW transport, image descriptor/config/platform, AG/AI/AK inputs, and 004C1BC parser identities;
3. same-container hook recheck success with empty raw hook streams;
4. inner APT exit `0` with zero raw stderr;
5. exact before and after input inventories equal to canonical `61737063...` and byte-identical;
6. `bb-eipp.log.xz` and `bb-eipp-identity.tsv` present as separately preserved 16th/17th evidence members, with the identity record containing the observed planner-log byte count and SHA-256;
7. both APT invocations retain `APT::Architectures=amd64` and `Dir::Bin::dpkg=/nonexistent-signthos-dpkg-prohibited`; `bb-process.txt` remains diagnostic evidence but is not used as a completeness proof for absence of short-lived processes;
8. canonical 004C1BC parser returns `qualifies=true` with zero findings;
9. no package download, unpack, configure, maintainer-script, trigger, service, network, or mount activity;
10. Replay B remains prohibited until a qualifying Replay A is separately reconciled and authorized.

This candidate has not been executed. Its static source reasoning must not be upgraded into runtime evidence.

```text
004C1BG_STATIC_SOURCE_RECONCILIATION = PASS_CANDIDATE
004C1BG_RUNTIME_REPAIR_VALIDATION = NOT_PERFORMED
DOCKER_EXECUTION_IN_004C1BG = 0
APT_EXECUTION_IN_004C1BG = 0
DPKG_EXECUTION_IN_004C1BG = 0
REPLAY_A_RETRY_IN_004C1BG = 0
REPLAY_B = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
```
