# 004C1BB — Combined Stage A Hook Recheck and Solver Harness Qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_EXACT_HARNESS_FREEZE / ZERO_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `eb1f93515d8aa2f1d312ec2ca8bb896ad0f039a3`
Canonical base tree: `db06cbfc473867ab323eac3782e983c3388056c0`
Authority source: `github:issue-comment:5611114647`

## 1. Purpose and authority

Canonical 004C1BA proves that the exact 004C1AZ hook query is deterministic and currently returns zero executable-hook entries in standalone fresh containers. Canonical 004C1AZ still requires the same query inside the same Stage A container immediately before `apt-get`. 004C1BB freezes that combined harness byte-for-byte. It executes nothing.

```text
004C1BB_AUTHORITY = STATIC_EXACT_COMBINED_HARNESS_FREEZE_ONLY
DOCKER_EXECUTION = 0
APT_CONFIG_EXECUTION = 0
APT_GET_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = 0
STAGE_A_EXECUTION = 0
STAGE_B_EXECUTION = NOT_AUTHORIZED
STAGE_C_EXECUTION = NOT_AUTHORIZED
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Canonical inputs

```text
CANONICAL_MAIN = eb1f93515d8aa2f1d312ec2ca8bb896ad0f039a3
CANONICAL_MAIN_TREE = db06cbfc473867ab323eac3782e983c3388056c0
OPEN_PULL_REQUESTS_AT_FREEZE = 0
AW_TRANSPORT_BYTES = 204769280
AW_TRANSPORT_SHA256 = f7fd9486a7eadcf82fc5e7f66c166c3de757ff5c108a32aab2bf17cccfbd4755
AW_A_B_BYTE_EQUAL = TRUE
INITIAL_INPUT_INVENTORY_LINES = 27
INITIAL_INPUT_INVENTORY_BYTES = 3523
INITIAL_INPUT_INVENTORY_SHA256 = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
IMAGE_CONFIG_DIGEST = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
PLATFORM = linux/amd64
```

The canonical AW transport contains exactly the qualified isolated APT tree: 10 directories, 17 regular files, no links, exact snapshot source descriptor, three `InRelease` files, twelve uncompressed `Packages` files, and the exact initial dpkg status bytes.

## 3. Exact Stage A and hook argv

The repaired Stage A vector is exactly 42 tokens, UTF-8 compact JSON plus one LF, and is inherited unchanged from canonical 004C1AY:

```text
STAGE_A_ARGC = 42
STAGE_A_ARGV_SHA256 = dceeccc5096bbc9eb0c661b93be5a5091f459a2ffaeed808b4bebb212ebff96b
```

```json
["/usr/bin/apt-get","--simulate","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State=/tmp/signthos-apt/state/","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache=/tmp/signthos-apt/cache/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::Cache::pkgcache=","-o","Dir::Cache::srcpkgcache=","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","--no-install-recommends","pkg-config","autoconf","automake","libtool","ragel","git","yasm","subversion","lsb-release","tzdata","keyboard-configuration","tini"]
```

The immediate hook recheck is exactly the canonical 32-token 004C1AZ query:

```text
HOOK_ARGC = 32
HOOK_ARGV_SHA256 = c56c77e8d564c9c9d0f89342dc96d7aedeabc527107628d24ec4aa30bbc2a372
HOOK_REQUIRED_EXIT = 0
HOOK_REQUIRED_STDOUT_BYTES = 0
HOOK_REQUIRED_STDERR_BYTES = 0
```

```json
["/usr/bin/apt-config","--no-empty","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State=/tmp/signthos-apt/state/","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache=/tmp/signthos-apt/cache/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::Cache::pkgcache=","-o","Dir::Cache::srcpkgcache=","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","dump","APT::Install::Pre-Invoke","APT::Install::Post-Invoke-Success","AptCli::Hooks::Install"]
```

## 4. Helper and executable bindings

The combined harness verifies these exact selected-image bytes before the hook query or Stage A:

| Path | SHA-256 |
| --- | --- |
| `/bin/sh` | `4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483` |
| `/usr/bin/dash` | `4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483` |
| `/usr/bin/tar` | `148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f` |
| `/usr/bin/sha256sum` | `7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3` |
| `/usr/bin/stat` | `9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3` |
| `/usr/bin/find` | `791b89c8bffb8101fd7d4d212b80af66a2332834b05a42721104eb47e8fa2eb1` |
| `/usr/bin/wc` | `504463c7a12780b7439321be6e67f43ab61a3ff429cbf916c0722d19f98692a8` |
| `/usr/bin/sort` | `0fc26ce295e8e549635da2129e389f63685745b3be7c1737db6251a296f1cd78` |
| `/usr/bin/uname` | `37df0311d0e24169abfd166bc6018d40b87306f7ff64d9eec256c8331ac26347` |
| `/usr/bin/ldd` | `6752368e618c98f813bd346846df76021aa5d09caef634ee5dbe7d00c3c200fd` |
| `/usr/bin/apt-get` | `9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196` |
| `/usr/bin/apt-config` | `ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19` |

Additional executable metadata gates are:

```text
APT_GET_METADATA = 51680 755 0 0
APT_CONFIG_METADATA = 27024 755 0 0
```

## 5. Same-container immediacy and fail-closed ordering

The harness order is fixed:

1. verify environment;
2. extract the exact AW stdin USTAR into the isolated tmpfs;
3. verify tmpfs type and exact 10-directory/17-file/0-link structure;
4. compute the canonical input inventory and require SHA-256 `61737063...`;
5. verify helper, `apt-get`, and `apt-config` identities;
6. record fresh substrate facts and reject the Rodete predicate or non-`x86_64` machine;
7. freeze the exact Stage A positional argv;
8. execute the exact hook query and capture raw streams;
9. reject unless hook exit is `0`, stdout is empty, and stderr is empty;
10. **immediately start the exact Stage A `apt-get` process on the next command line**;
11. observe only numeric-PID `/proc/<pid>/comm` with the canonical fail-closed disappearance rule;
12. capture APT exit/raw streams, recompute the canonical input inventory, require exact pre/post identity, and export deterministic evidence.

Between successful hook validation and `apt-get` start, the harness performs no environment mutation, APT configuration mutation, input-root mutation, image mutation, source/list/status change, helper invocation, hashing operation, or evidence-file write. The next command is the Stage A process start itself.

The observer may suppress only a read error for an enumerated `/proc/<pid>/comm` path that has disappeared. If that exact path still exists after a failed read, the harness exits `70`.

## 6. Exact guest script

The script is UTF-8 and ends in exactly one LF.

```text
GUEST_SCRIPT_BYTES = 7531
GUEST_SCRIPT_SHA256 = d2c9794da6e9482d2d9a0f9acc7aa7cd7534a8587f1fa118449862aca1945d6d
GUEST_SCRIPT_TRAILING_LF = TRUE
```

The exact script bytes are represented as one JSON string below. JSON-decode the string value; do not append or remove bytes. The decoded value must be exactly 7,531 UTF-8 bytes with the SHA-256 above.

```json
"tmp=/tmp/signthos-apt/tmp\numask 022\n[ \"$PATH\" = /emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin ] || exit 10\n[ \"$EMSDK\" = /emsdk ] || exit 11\n[ \"$TMPDIR\" = /tmp/signthos-apt/tmp ] || exit 12\n[ \"$LC_ALL\" = C ] || exit 13\n[ \"$LANG\" = C ] || exit 14\n[ \"$TZ\" = UTC ] || exit 15\n/usr/bin/tar -xpf - -C /\nfst=$(/usr/bin/stat -f -c %T /tmp/signthos-apt); [ \"$fst\" = tmpfs ] || exit 21\ndc=$(/usr/bin/find /tmp/signthos-apt -type d | /usr/bin/wc -l); [ \"$dc\" = 10 ] || exit 22\nfc=$(/usr/bin/find /tmp/signthos-apt -type f | /usr/bin/wc -l); [ \"$fc\" = 17 ] || exit 23\nlc=$(/usr/bin/find /tmp/signthos-apt -type l | /usr/bin/wc -l); [ \"$lc\" = 0 ] || exit 24\ninventory() { /usr/bin/find /tmp/signthos-apt -print | /usr/bin/sort | while IFS= read -r p; do case \"$p\" in /tmp/signthos-apt/tmp/bb-*) continue ;; esac; if [ -d \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 31; printf \"D\\t%s\\t%s\\n\" \"$p\" \"$m\"; elif [ -f \"$p\" ]; then m=$(/usr/bin/stat -c \"%s %a %u %g\" \"$p\") || exit 32; h=$(/usr/bin/sha256sum \"$p\") || exit 33; h=${h%% *}; printf \"F\\t%s\\t%s\\t%s\\n\" \"$p\" \"$m\" \"$h\"; elif [ -L \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 34; printf \"L\\t%s\\t%s\\n\" \"$p\" \"$m\"; else m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 35; printf \"O\\t%s\\t%s\\n\" \"$p\" \"$m\"; fi; done; }\ninventory > \"$tmp/bb-before.tsv\"\nbh=$(/usr/bin/sha256sum \"$tmp/bb-before.tsv\"); bh=${bh%% *}; [ \"$bh\" = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66 ] || exit 36\n: > \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /bin/sh); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /bin/sh \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/dash); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/dash \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ \"$x\" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/tar \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ \"$x\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sha256sum \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ \"$x\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/stat \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/find); x=${x%% *}; [ \"$x\" = 791b89c8bffb8101fd7d4d212b80af66a2332834b05a42721104eb47e8fa2eb1 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/find \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/wc); x=${x%% *}; [ \"$x\" = 504463c7a12780b7439321be6e67f43ab61a3ff429cbf916c0722d19f98692a8 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/wc \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sort); x=${x%% *}; [ \"$x\" = 0fc26ce295e8e549635da2129e389f63685745b3be7c1737db6251a296f1cd78 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sort \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/uname); x=${x%% *}; [ \"$x\" = 37df0311d0e24169abfd166bc6018d40b87306f7ff64d9eec256c8331ac26347 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/uname \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/ldd); x=${x%% *}; [ \"$x\" = 6752368e618c98f813bd346846df76021aa5d09caef634ee5dbe7d00c3c200fd ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/ldd \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-get); x=${x%% *}; [ \"$x\" = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196 ] || exit 27; printf \"%s\\t%s\\n\" /usr/bin/apt-get \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-config); x=${x%% *}; [ \"$x\" = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19 ] || exit 29; printf \"%s\\t%s\\n\" /usr/bin/apt-config \"$x\" >> \"$tmp/bb-helpers.tsv\"\nam=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-get); [ \"$am\" = \"51680 755 0 0\" ] || exit 28\ncm=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-config); [ \"$cm\" = \"27024 755 0 0\" ] || exit 30\nkernel=$(/usr/bin/uname -r)\nmachine=$(/usr/bin/uname -m)\n{ printf \"GUEST_KERNEL=%s\\n\" \"$kernel\"; printf \"GUEST_MACHINE=%s\\n\" \"$machine\"; /usr/bin/ldd --version; if [ -x /run/rosetta/rosetta ]; then printf \"ROSETTA_VISIBLE=YES\\n\"; else printf \"ROSETTA_VISIBLE=NO\\n\"; fi; } > \"$tmp/bb-substrate.stdout\" 2> \"$tmp/bb-substrate.stderr\"\ncase \"$kernel\" in 6.12.*rodete1-amd64) printf \"RODETE_PREDICATE=TRUE\\n\" >> \"$tmp/bb-substrate.stdout\"; exit 25 ;; *) printf \"RODETE_PREDICATE=FALSE\\n\" >> \"$tmp/bb-substrate.stdout\" ;; esac\n[ \"$machine\" = x86_64 ] || exit 26\n/usr/bin/apt-get --version > \"$tmp/bb-apt-version.stdout\" 2> \"$tmp/bb-apt-version.stderr\"\nprintf \"/usr/bin/apt-get\\t%s\\t%s\\n\" \"9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196\" \"$am\" > \"$tmp/bb-apt-identity.tsv\"\nset -- /usr/bin/apt-get --simulate -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 install --no-install-recommends pkg-config autoconf automake libtool ragel git yasm subversion lsb-release tzdata keyboard-configuration tini\nset +e\n/usr/bin/apt-config --no-empty -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 dump APT::Install::Pre-Invoke APT::Install::Post-Invoke-Success AptCli::Hooks::Install > \"$tmp/bb-hook.stdout\" 2> \"$tmp/bb-hook.stderr\"\nhook_rc=$?\nset -e\n[ \"$hook_rc\" -eq 0 ] || exit 61\n[ ! -s \"$tmp/bb-hook.stdout\" ] || exit 62\n[ ! -s \"$tmp/bb-hook.stderr\" ] || exit 63\n\"$@\" > \"$tmp/bb-apt.stdout\" 2> \"$tmp/bb-apt.stderr\" &\napt_pid=$!\n: > \"$tmp/bb-process.raw\"\nseen=\"|\"\nwhile kill -0 \"$apt_pid\" 2>/dev/null; do for c in /proc/[0-9]*/comm; do if IFS= read -r n 2>/dev/null < \"$c\"; then case \"$seen\" in *\"|$n|\"*) ;; *) seen=\"${seen}${n}|\"; printf \"%s\\n\" \"$n\" >> \"$tmp/bb-process.raw\" ;; esac; else [ ! -e \"$c\" ] || exit 70; fi; done; done\nset +e\nwait \"$apt_pid\"\napt_rc=$?\nset -e\nprintf \"%s\\n\" \"$hook_rc\" > \"$tmp/bb-hook.exit\"\nprintf \"%s\\n\" \"$apt_rc\" > \"$tmp/bb-apt.exit\"\n/usr/bin/sort -u \"$tmp/bb-process.raw\" > \"$tmp/bb-process.txt\"\ninventory > \"$tmp/bb-after.tsv\"\nah=$(/usr/bin/sha256sum \"$tmp/bb-after.tsv\"); ah=${ah%% *}; [ \"$ah\" = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66 ] || exit 71\n[ \"$bh\" = \"$ah\" ] || exit 72\n/usr/bin/tar --format=ustar --sort=name --mtime=@0 --owner=0 --group=0 --numeric-owner -cf - -C \"$tmp\" bb-after.tsv bb-apt-identity.tsv bb-apt-version.stderr bb-apt-version.stdout bb-apt.exit bb-apt.stderr bb-apt.stdout bb-before.tsv bb-helpers.tsv bb-hook.exit bb-hook.stderr bb-hook.stdout bb-process.txt bb-substrate.stderr bb-substrate.stdout\n"
```

## 7. Exact Docker argv

The Docker envelope preserves the canonical isolation posture: `--pull=never`, explicit `linux/amd64`, `--network none`, read-only rootfs, all capabilities dropped, `no-new-privileges`, bounded pids/memory/cpu, isolated tmpfs, four execution-control environment overrides, explicit `/bin/sh` entrypoint, no bind/volume/repository/host mounts, and stdin transport only.

```text
DOCKER_ARGC = 35
DOCKER_ARGV_JSON_BYTES = 8438
DOCKER_ARGV_SHA256 = 4b6e253487a77b490bc8c6522ef442c3471f98cd1178ac6e6cd0a5e19c100da4
```

The byte identity is compact UTF-8 JSON plus one LF:

```json
["docker","run","--rm","-i","--pull=never","--platform","linux/amd64","--network","none","--read-only","--cap-drop","ALL","--security-opt","no-new-privileges","--pids-limit","64","--memory","512m","--cpus","2","--tmpfs","/tmp/signthos-apt:rw,nosuid,nodev,noexec,size=384m,mode=0755","-e","TMPDIR=/tmp/signthos-apt/tmp","-e","LC_ALL=C","-e","LANG=C","-e","TZ=UTC","--entrypoint","/bin/sh","docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3","-ceu","tmp=/tmp/signthos-apt/tmp\numask 022\n[ \"$PATH\" = /emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin ] || exit 10\n[ \"$EMSDK\" = /emsdk ] || exit 11\n[ \"$TMPDIR\" = /tmp/signthos-apt/tmp ] || exit 12\n[ \"$LC_ALL\" = C ] || exit 13\n[ \"$LANG\" = C ] || exit 14\n[ \"$TZ\" = UTC ] || exit 15\n/usr/bin/tar -xpf - -C /\nfst=$(/usr/bin/stat -f -c %T /tmp/signthos-apt); [ \"$fst\" = tmpfs ] || exit 21\ndc=$(/usr/bin/find /tmp/signthos-apt -type d | /usr/bin/wc -l); [ \"$dc\" = 10 ] || exit 22\nfc=$(/usr/bin/find /tmp/signthos-apt -type f | /usr/bin/wc -l); [ \"$fc\" = 17 ] || exit 23\nlc=$(/usr/bin/find /tmp/signthos-apt -type l | /usr/bin/wc -l); [ \"$lc\" = 0 ] || exit 24\ninventory() { /usr/bin/find /tmp/signthos-apt -print | /usr/bin/sort | while IFS= read -r p; do case \"$p\" in /tmp/signthos-apt/tmp/bb-*) continue ;; esac; if [ -d \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 31; printf \"D\\t%s\\t%s\\n\" \"$p\" \"$m\"; elif [ -f \"$p\" ]; then m=$(/usr/bin/stat -c \"%s %a %u %g\" \"$p\") || exit 32; h=$(/usr/bin/sha256sum \"$p\") || exit 33; h=${h%% *}; printf \"F\\t%s\\t%s\\t%s\\n\" \"$p\" \"$m\" \"$h\"; elif [ -L \"$p\" ]; then m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 34; printf \"L\\t%s\\t%s\\n\" \"$p\" \"$m\"; else m=$(/usr/bin/stat -c \"%a %u %g\" \"$p\") || exit 35; printf \"O\\t%s\\t%s\\n\" \"$p\" \"$m\"; fi; done; }\ninventory > \"$tmp/bb-before.tsv\"\nbh=$(/usr/bin/sha256sum \"$tmp/bb-before.tsv\"); bh=${bh%% *}; [ \"$bh\" = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66 ] || exit 36\n: > \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /bin/sh); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /bin/sh \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/dash); x=${x%% *}; [ \"$x\" = 4f291296e89b784cd35479fca606f228126e3641f5bcaee68dee36583d7c9483 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/dash \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/tar); x=${x%% *}; [ \"$x\" = 148313667aa9111de45fe3c70a1c7c963ae5f015071a106c4cdabea749d2db9f ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/tar \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sha256sum); x=${x%% *}; [ \"$x\" = 7645c8e76d75515ccb75c9086bdcf0d4071f2985f380f249253ead7d7c6810b3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sha256sum \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/stat); x=${x%% *}; [ \"$x\" = 9b571b54bd2f17f5fbb841e1886c2d364f5138a02533f4ac3dbfbdaf4dddbea3 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/stat \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/find); x=${x%% *}; [ \"$x\" = 791b89c8bffb8101fd7d4d212b80af66a2332834b05a42721104eb47e8fa2eb1 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/find \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/wc); x=${x%% *}; [ \"$x\" = 504463c7a12780b7439321be6e67f43ab61a3ff429cbf916c0722d19f98692a8 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/wc \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/sort); x=${x%% *}; [ \"$x\" = 0fc26ce295e8e549635da2129e389f63685745b3be7c1737db6251a296f1cd78 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/sort \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/uname); x=${x%% *}; [ \"$x\" = 37df0311d0e24169abfd166bc6018d40b87306f7ff64d9eec256c8331ac26347 ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/uname \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/ldd); x=${x%% *}; [ \"$x\" = 6752368e618c98f813bd346846df76021aa5d09caef634ee5dbe7d00c3c200fd ] || exit 20; printf \"%s\\t%s\\n\" /usr/bin/ldd \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-get); x=${x%% *}; [ \"$x\" = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196 ] || exit 27; printf \"%s\\t%s\\n\" /usr/bin/apt-get \"$x\" >> \"$tmp/bb-helpers.tsv\"\nx=$(/usr/bin/sha256sum /usr/bin/apt-config); x=${x%% *}; [ \"$x\" = ba6db2a7564f9fcd73e48d33c8aeb63c0623e18bbf091008e39eb1bbfce25d19 ] || exit 29; printf \"%s\\t%s\\n\" /usr/bin/apt-config \"$x\" >> \"$tmp/bb-helpers.tsv\"\nam=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-get); [ \"$am\" = \"51680 755 0 0\" ] || exit 28\ncm=$(/usr/bin/stat -c \"%s %a %u %g\" /usr/bin/apt-config); [ \"$cm\" = \"27024 755 0 0\" ] || exit 30\nkernel=$(/usr/bin/uname -r)\nmachine=$(/usr/bin/uname -m)\n{ printf \"GUEST_KERNEL=%s\\n\" \"$kernel\"; printf \"GUEST_MACHINE=%s\\n\" \"$machine\"; /usr/bin/ldd --version; if [ -x /run/rosetta/rosetta ]; then printf \"ROSETTA_VISIBLE=YES\\n\"; else printf \"ROSETTA_VISIBLE=NO\\n\"; fi; } > \"$tmp/bb-substrate.stdout\" 2> \"$tmp/bb-substrate.stderr\"\ncase \"$kernel\" in 6.12.*rodete1-amd64) printf \"RODETE_PREDICATE=TRUE\\n\" >> \"$tmp/bb-substrate.stdout\"; exit 25 ;; *) printf \"RODETE_PREDICATE=FALSE\\n\" >> \"$tmp/bb-substrate.stdout\" ;; esac\n[ \"$machine\" = x86_64 ] || exit 26\n/usr/bin/apt-get --version > \"$tmp/bb-apt-version.stdout\" 2> \"$tmp/bb-apt-version.stderr\"\nprintf \"/usr/bin/apt-get\\t%s\\t%s\\n\" \"9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196\" \"$am\" > \"$tmp/bb-apt-identity.tsv\"\nset -- /usr/bin/apt-get --simulate -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 install --no-install-recommends pkg-config autoconf automake libtool ragel git yasm subversion lsb-release tzdata keyboard-configuration tini\nset +e\n/usr/bin/apt-config --no-empty -o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources -o Dir::Etc::sourceparts=- -o Dir::State=/tmp/signthos-apt/state/ -o Dir::State::lists=/tmp/signthos-apt/lists/ -o Dir::Cache=/tmp/signthos-apt/cache/ -o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/ -o Dir::Cache::pkgcache= -o Dir::Cache::srcpkgcache= -o Dir::State::status=/tmp/signthos-apt/state/status -o Dir::Log=/tmp/signthos-apt/log/ -o Debug::NoLocking=1 -o Acquire::Languages=none -o Acquire::Retries=0 dump APT::Install::Pre-Invoke APT::Install::Post-Invoke-Success AptCli::Hooks::Install > \"$tmp/bb-hook.stdout\" 2> \"$tmp/bb-hook.stderr\"\nhook_rc=$?\nset -e\n[ \"$hook_rc\" -eq 0 ] || exit 61\n[ ! -s \"$tmp/bb-hook.stdout\" ] || exit 62\n[ ! -s \"$tmp/bb-hook.stderr\" ] || exit 63\n\"$@\" > \"$tmp/bb-apt.stdout\" 2> \"$tmp/bb-apt.stderr\" &\napt_pid=$!\n: > \"$tmp/bb-process.raw\"\nseen=\"|\"\nwhile kill -0 \"$apt_pid\" 2>/dev/null; do for c in /proc/[0-9]*/comm; do if IFS= read -r n 2>/dev/null < \"$c\"; then case \"$seen\" in *\"|$n|\"*) ;; *) seen=\"${seen}${n}|\"; printf \"%s\\n\" \"$n\" >> \"$tmp/bb-process.raw\" ;; esac; else [ ! -e \"$c\" ] || exit 70; fi; done; done\nset +e\nwait \"$apt_pid\"\napt_rc=$?\nset -e\nprintf \"%s\\n\" \"$hook_rc\" > \"$tmp/bb-hook.exit\"\nprintf \"%s\\n\" \"$apt_rc\" > \"$tmp/bb-apt.exit\"\n/usr/bin/sort -u \"$tmp/bb-process.raw\" > \"$tmp/bb-process.txt\"\ninventory > \"$tmp/bb-after.tsv\"\nah=$(/usr/bin/sha256sum \"$tmp/bb-after.tsv\"); ah=${ah%% *}; [ \"$ah\" = 61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66 ] || exit 71\n[ \"$bh\" = \"$ah\" ] || exit 72\n/usr/bin/tar --format=ustar --sort=name --mtime=@0 --owner=0 --group=0 --numeric-owner -cf - -C \"$tmp\" bb-after.tsv bb-apt-identity.tsv bb-apt-version.stderr bb-apt-version.stdout bb-apt.exit bb-apt.stderr bb-apt.stdout bb-before.tsv bb-helpers.tsv bb-hook.exit bb-hook.stderr bb-hook.stdout bb-process.txt bb-substrate.stderr bb-substrate.stdout\n"]
```

## 8. Deterministic evidence contract

The normalized USTAR exported on Docker stdout contains exactly these members, sorted by name and normalized to mtime 0 / uid 0 / gid 0:

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

A later execution successor must treat Docker stderr as a raw outer-harness error stream and must fail closed on nonzero Docker exit, absent/truncated/non-USTAR stdout, unexpected archive members, hook predicate failure, Rodete predicate true, input inventory mismatch, observer failure, or any pre/post input-root difference. APT exit and APT streams are solver evidence; a nonzero APT exit is a Stage A failure and must not be normalized into success.

## 9. Exact static contract

Serialization is UTF-8 JSON with lexicographically sorted object keys, separators `(',', ':')`, `ensure_ascii=false`, and exactly one trailing LF.

```text
004C1BB_CONTRACT_JSON_BYTES = 1960
004C1BB_CONTRACT_JSON_SHA256 = 8ac21b05f09b001615f6c46b2eb82f5073135910a578b00fa9836cb0d60c165f
```

```json
{"awTransport":{"bytes":204769280,"sha256":"f7fd9486a7eadcf82fc5e7f66c166c3de757ff5c108a32aab2bf17cccfbd4755"},"canonicalBase":"eb1f93515d8aa2f1d312ec2ca8bb896ad0f039a3","containment":{"entrypoint":"/bin/sh","hostMounts":0,"network":"none","platform":"linux/amd64","pull":"never","readOnlyRootfs":true,"tmpfs":"/tmp/signthos-apt:rw,nosuid,nodev,noexec,size=384m,mode=0755"},"dockerArgv":{"argc":35,"jsonBytes":8438,"sha256":"4b6e253487a77b490bc8c6522ef442c3471f98cd1178ac6e6cd0a5e19c100da4"},"evidenceMembers":["bb-after.tsv","bb-apt-identity.tsv","bb-apt-version.stderr","bb-apt-version.stdout","bb-apt.exit","bb-apt.stderr","bb-apt.stdout","bb-before.tsv","bb-helpers.tsv","bb-hook.exit","bb-hook.stderr","bb-hook.stdout","bb-process.txt","bb-substrate.stderr","bb-substrate.stdout"],"guestScript":{"bytes":7531,"sha256":"d2c9794da6e9482d2d9a0f9acc7aa7cd7534a8587f1fa118449862aca1945d6d","trailingLf":true},"hookRecheck":{"argc":32,"argvSha256":"c56c77e8d564c9c9d0f89342dc96d7aedeabc527107628d24ec4aa30bbc2a372","immediatelyBeforeStageA":true,"requiredExit":0,"requiredStderrBytes":0,"requiredStdoutBytes":0},"inputInventory":{"bytes":3523,"lines":27,"sha256":"61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66"},"observer":{"survivingProcCommReadFailureExit":70,"vanishedProcCommSkippable":true},"schema":"signthos.004c1bb.combined-stage-a-harness.v1","selectedImage":{"configDigest":"sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0","platform":"linux/amd64","ref":"docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3"},"stageA":{"argc":42,"argvSha256":"dceeccc5096bbc9eb0c661b93be5a5091f459a2ffaeed808b4bebb212ebff96b"},"successPreconditions":{"afterInventorySha256":"61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66","beforeInventorySha256":"61737063acecabc925876810e67f9476020ca161050083c088337e835e14ee66","machine":"x86_64","rodetePredicate":false}}
```

## 10. Qualification result

```text
AW_TRANSPORT_IDENTITY = PASS
INITIAL_INPUT_INVENTORY_BINDING = PASS
REPAIRED_STAGE_A_ARGV_BINDING = PASS
EXACT_HOOK_QUERY_BINDING = PASS
SAME_CONTAINER_IMMEDIATE_RECHECK_ORDER = PASS_STATIC
HELPER_AND_APT_EXECUTABLE_BINDING = PASS_STATIC
RACE_SAFE_PROCESS_OBSERVER = PASS_STATIC
PRE_POST_INPUT_IDENTITY_GATE = PASS_STATIC
DETERMINISTIC_EVIDENCE_EXPORT = PASS_STATIC
DOCKER_CONTAINMENT = PASS_STATIC
004C1BB_RESULT = PASS_STATIC_COMBINED_STAGE_A_HARNESS_FREEZE
DOCKER_EXECUTION = 0
APT_CONFIG_EXECUTION = 0
APT_GET_EXECUTION = 0
```

## 11. Successor boundary

004C1BB authorizes no execution. A later Stage A execution unit requires fresh Issue #7 authority after exact-head independent substantive review, guarded merge, and post-merge verification.

```text
STAGE_A_REPLAY_PAIR = NOT_AUTHORIZED_BY_004C1BB
STAGE_B_EXECUTION = NOT_AUTHORIZED
STAGE_C_EXECUTION = NOT_AUTHORIZED
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = NOT_AUTHORIZED
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
