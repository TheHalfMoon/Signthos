# 004C1BM — Stage B APT simulator-output parser qualification

Status: **candidate / static deterministic qualification only / zero Stage B execution**
Canonical base: `683a07398e3fa195d7f3d1e9bc660529b74307a6`
Canonical base tree: `5a17333ef6b6139f12a2b26322efe368dfdeb411`
Primary authority: `github:issue-comment:5624117054`
Virtual-root clarification authority: `github:issue-comment:5624227215`

## 1. Purpose and authority boundary

004C1BL stopped before Docker launch because the exact canonical 004C1BC parser is Stage-A-specific. This unit mechanically adapts only that proven parser contract to Stage B before any Stage B runtime output exists.

No Docker container, `apt-config`, `apt-get`, dpkg, package action, PDFium/provider, Stage B/C solver, 004C2, 004D, or Specification 005 execution occurs in this qualification.

```text
DOCKER_CONTAINER_EXECUTION = 0
APT_CONFIG_EXECUTION = 0
APT_GET_EXECUTION = 0
DPKG_EXECUTION = 0
STAGE_B_EXECUTION = 0
OBSERVED_STAGE_B_STDOUT_AVAILABLE_TO_004C1BM = false
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = 0
004C1BL_AUTHORIZED_REPLAY_A_ATTEMPTS_USED = 0
004C1BL_AUTHORIZED_REPLAY_A_ATTEMPTS_REMAINING = 1
```

## 2. Exact canonical inputs

```text
004C1BC_PARSER_BYTES = 18866
004C1BC_PARSER_SHA256 = 87c43b8a318de2b3d353c6c79b4a06abe41670144e1ee36cf7724105ff670550
004C1AG_RESOLVED_CLOSURE_BYTES = 293999
004C1AG_RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
004C1AG_RESOLVED_CLOSURE_RECORDS = 910
004C1AK_VERIFIED_ARCHIVES_BYTES = 439991
004C1AK_VERIFIED_ARCHIVES_SHA256 = 38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98
004C1AK_VERIFIED_ARCHIVES_RECORDS = 826
004C1BJ_VIRTUAL_INSTALLED_PACKAGES_BYTES = 27625
004C1BJ_VIRTUAL_INSTALLED_PACKAGES_SHA256 = 14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7
004C1BJ_VIRTUAL_INSTALLED_PACKAGES_RECORDS = 255
004C1BK_STAGE_B_ROOT_COUNT = 145
004C1BK_STAGE_B_ROOTS_SHA256 = f354c23dc9671e5d1daf0db5158b7f1eef0afc205b7620c67ecd948da23b8184
004C1BK_STAGE_B_ARGV_SHA256 = 51eb0c75cdac829daf26acde5dcc3b93dee35bbbd171d5ca77e85b48a2fa8e78
```

Canonical document identities used for this static adaptation:

```text
004C1AG_DOCUMENT = 19265 / 3dc7adc22ac613be2cf7d093aebcaa414afeaadf88aa0aa91b4be07cba589877
004C1AI_DOCUMENT = 20285 / 8c6b73ccabdbb1b87c0eadcb0ffdf8d446df2fb45288194f1b559a0c8a7bb1f6
004C1AQ_DOCUMENT = 33338 / bf46f47ac6470ab342c89186f8db25feaa1b1355cb1e18961547d608a50a7d33
004C1BJ_DOCUMENT = 104338 / 6b27a63b4686371abce70336a20a0c870b5a42a819ed271313391d1b62de7a02
004C1BC_DOCUMENT = 54912 / 5acdd8692ecd4d472d285f3ac4fb19a5d88eeb132235bee01c154a83055b41ea
004C1BK_DOCUMENT = 30928 / aea53bd6682ba109660db639090720452b183db8e3c2231bbb032ecf24aeb7ba
```

## 3. Canonical Stage B root-accounting repair

004C1BC cannot be reused unchanged for Stage B because it hard-codes `STAGE_A`, the twelve Stage A requested roots, the 231-row 004C1AI installed-state binding, and the Stage-A parser-result schema. Using it as though it were Stage-B-aware would make requested-root accounting noncanonical even if a solver replay itself completed.

The Stage B adaptation preserves the parsing grammar, Debian version comparator, AG metadata mapping, AK archive verification, action classification, ordering, serialization, and fail-closed behavior byte-for-byte except where Stage B requires explicit substitutions.

Exactly one Stage B requested root is virtual. Canonical 004C1AG states that `git-core` resolves uniquely to exact package `git@1:2.34.1-1ubuntu1.17`, which provides `git-core`; canonical 004C1AI applies the same provider mapping when evaluating requested roots. Authority `github:issue-comment:5624227215` therefore permits exactly:

```json
{"git-core":"git"}
```

No other alias, Provides resolution, alternative provider, fuzzy package mapping, or dynamic virtual-package resolver is authorized. Any future Stage B requested root lacking either one direct AG metadata row or this exact mapping fails closed.

The six direct Stage B roots without a new AK archive row are `libffi8`, `libfontconfig1`, `libnspr4`, `patch`, `zip`, and `zlib1g`. Each is present in the 004C1BJ predecessor installed state at the exact AG-selected version and architecture. They therefore qualify only as unchanged requested roots unless future solver stdout emits an action; any emitted action would require an exact AG+AK mapping and would fail closed if unavailable.

## 4. Exact transformation contract

The Stage B parser is generated deterministically from the exact 18,866-byte 004C1BC parser source. The transformation is intentionally narrow:

1. `STAGE_ID` becomes `STAGE_B`.
2. the twelve `STAGE_A_ROOTS` become the exact ordered 145-root 004C1AQ/004C1BK list;
3. the exact virtual-root map `git-core -> git` is inserted;
4. the installed-state binding becomes the 255-row 004C1BJ virtual installed-state JSON;
5. `parse_stage_a` becomes `parse_stage_b`;
6. requested-root accounting resolves only the one authorized virtual root before exact metadata/installed-state checks;
7. the result schema becomes `signthos.004c1bm.stage-b-apt-parser-result.v1`;
8. the CLI calls `parse_stage_b`.

No APT grammar, comparator, record field, archive mapping, action policy, finding policy, sort order, canonical JSON encoding, or parser CLI input structure is broadened.

```text
004C1BM_TRANSFORMATION_BUILDER_BYTES = 4141
004C1BM_TRANSFORMATION_BUILDER_SHA256 = a6d9225b1bb86fe8ad915f650777ef5ec949c5ba5f50bf5b77c1a33c664cb7a5
004C1BM_STAGE_B_PARSER_BYTES = 21669
004C1BM_STAGE_B_PARSER_SHA256 = 2fe9378cd97621ae141fa7f5252ac7741522ba930753fa5f25b557c3589e1e40
```

## 5. Static qualification suite

The qualification suite uses only synthetic APT stdout plus already-canonical AG/AK/BJ JSON inputs. It performs no Docker/APT/dpkg execution. The parser output and serialized transaction bytes are regenerated twice where determinism is asserted.

```text
004C1BM_TEST_HARNESS_BYTES = 7366
004C1BM_TEST_HARNESS_SHA256 = 59166937ef430f99f6aa8cb4e331dde680c81ceaa6b9b4ea19d220ab606d451f
004C1BM_TEST_RESULT_BYTES = 1067
004C1BM_TEST_RESULT_SHA256 = cc0638a06176ed55d7e64d83e3ba88aaa8c2b303e47d6f06b575da4cf72d2253
```

Exact qualification result:

```json
{"archiveGapsExactInstalled":["libffi8","libfontconfig1","libnspr4","patch","zip","zlib1g"],"canonicalArchiveRows":826,"canonicalMetadataRows":910,"canonicalRootCount":145,"canonicalRootMetadataCoverage":"145/145 via one bound virtual provider","deterministicResultAndSerialization":"PASS","downgradeFinding":"PASS","full145RootAccounting":"PASS","fullRootTransactionJsonlBytes":53861,"fullRootTransactionJsonlSha256":"f404f7d74bb8303aa9d0762e3f48dcefe749debf827728ba8034e62361b44911","malformedActionRejection":"PASS","parserBytes":21669,"parserSha256":"2fe9378cd97621ae141fa7f5252ac7741522ba930753fa5f25b557c3589e1e40","positiveInstallUpgradeUnchanged":"PASS","positiveTransactionJsonlBytes":1227,"positiveTransactionJsonlSha256":"f0a2e472d970d118b1b6e9611429c6e729c3ae4e2a096b42a55f80c0915e2b1d","predecessorInstalledRows":255,"removalFinding":"PASS","schema":"signthos.004c1bm.static-parser-qualification.v1","tamperedPredecessorBindingRejection":"PASS","unboundVirtualRootRejection":"PASS","virtualProviderAccounting":"PASS","virtualRootMap":{"git-core":"git"}}
```

The suite proves all 145 requested roots are accountably resolvable for parser purposes through 144 direct metadata names plus the single canonical `git-core -> git` provider binding. It separately exercises install, upgrade, unchanged-root, downgrade finding, removal finding, malformed action rejection, unauthorized virtual-root rejection, tampered predecessor-state binding rejection, and deterministic result/transaction serialization.

These are parser qualification fixtures only. Their synthetic transaction hashes are not Stage B solver results and must never be promoted into runtime evidence.

## 6. Frozen Stage B parser source

Serialization is the exact UTF-8 bytes between the Python fence boundaries, excluding the Markdown fence lines and including the final LF before the closing fence.

```python
#!/usr/bin/env python3
import argparse
import hashlib
import json
import re
from pathlib import Path

STAGE_ID = "STAGE_B"
NATIVE_ARCH = "amd64"
STAGE_B_ROOTS = [
    'at-spi2-core',
    'autoconf',
    'binutils',
    'binutils-aarch64-linux-gnu',
    'binutils-arm-linux-gnueabihf',
    'binutils-mips64el-linux-gnuabi64',
    'binutils-mipsel-linux-gnu',
    'bison',
    'bzip2',
    'cdbs',
    'curl',
    'dbus-x11',
    'devscripts',
    'dpkg-dev',
    'elfutils',
    'fakeroot',
    'fd-find',
    'flex',
    'git-core',
    'gperf',
    'lib32gcc-s1',
    'lib32stdc++6',
    'lib32z1',
    'libasound2',
    'libasound2-dev',
    'libatk1.0-0',
    'libatspi2.0-0',
    'libatspi2.0-dev',
    'libbluetooth-dev',
    'libbrlapi-dev',
    'libbrlapi0.8',
    'libbz2-1.0',
    'libbz2-dev',
    'libc6',
    'libc6-dev',
    'libc6-i386',
    'libcairo2',
    'libcairo2-dev',
    'libcap-dev',
    'libcap2',
    'libcgi-session-perl',
    'libcups2',
    'libcups2-dev',
    'libcurl4-gnutls-dev',
    'libdrm-dev',
    'libdrm2',
    'libegl1',
    'libelf-dev',
    'libevdev-dev',
    'libevdev2',
    'libexpat1',
    'libffi-dev',
    'libffi8',
    'libfontconfig1',
    'libfreetype6',
    'libfuse2',
    'libgbm-dev',
    'libgbm1',
    'libgl1',
    'libglib2.0-0',
    'libglib2.0-dev',
    'libglu1-mesa-dev',
    'libgraphene-1.0-0',
    'libgtk-3-0',
    'libgtk-3-dev',
    'libinput-dev',
    'libinput10',
    'libjpeg-dev',
    'libkrb5-dev',
    'libncurses6',
    'libnspr4',
    'libnspr4-dev',
    'libnss3',
    'libnss3-dev',
    'libpam0g',
    'libpam0g-dev',
    'libpango-1.0-0',
    'libpangocairo-1.0-0',
    'libpci-dev',
    'libpci3',
    'libpixman-1-0',
    'libpng16-16',
    'libpulse-dev',
    'libpulse0',
    'libsctp-dev',
    'libspeechd-dev',
    'libspeechd2',
    'libsqlite3-0',
    'libsqlite3-dev',
    'libssl-dev',
    'libstdc++6',
    'libsystemd-dev',
    'libudev-dev',
    'libudev1',
    'libuuid1',
    'libva-dev',
    'libvulkan-dev',
    'libvulkan1',
    'libwayland-egl1',
    'libwww-perl',
    'libx11-6',
    'libx11-xcb1',
    'libxau6',
    'libxcb1',
    'libxcomposite1',
    'libxcursor1',
    'libxdamage1',
    'libxdmcp6',
    'libxext6',
    'libxfixes3',
    'libxi6',
    'libxinerama1',
    'libxkbcommon-dev',
    'libxrandr2',
    'libxrender1',
    'libxshmfence-dev',
    'libxslt1-dev',
    'libxss-dev',
    'libxt-dev',
    'libxtst-dev',
    'libxtst6',
    'lighttpd',
    'locales',
    'mesa-common-dev',
    'mutter-common',
    'openbox',
    'p7zip',
    'patch',
    'perl',
    'pkgconf',
    'ripgrep',
    'rpm',
    'ruby',
    'uuid-dev',
    'wdiff',
    'x11-utils',
    'x11-xserver-utils',
    'xcompmgr',
    'xserver-xorg-core',
    'xserver-xorg-video-dummy',
    'xvfb',
    'xz-utils',
    'zip',
    'zlib1g',
    'zstd',
]
STAGE_B_VIRTUAL_ROOT_PROVIDER_MAP = {"git-core": "git"}
ACTIONS = ["INSTALL", "UPGRADE", "DOWNGRADE", "REMOVE", "KEEP_BACK", "UNCHANGED_REQUESTED_ROOT"]
RECORD_KEYS = [
    "stageId", "action", "package", "architecture", "fromVersion", "toVersion",
    "canonicalPackageMetadataSha256", "filename", "archiveBytes", "archiveSha256",
    "selectedSuite", "selectedComponent", "reasonClass",
]
PKG_RE = r"[A-Za-z0-9][A-Za-z0-9+.-]*"
ARCH_RE = r"[A-Za-z0-9][A-Za-z0-9-]*"
FULL_RE = rf"(?P<full>{PKG_RE}(?::{ARCH_RE})?)"
INST_RE = re.compile(
    rf"^Inst {FULL_RE}(?: \[(?P<from>[^\[\]\s]+)\])? "
    rf"\((?P<to>[^\s()\[\]]+) (?P<rel>[^\[\]\r\n]*) \[(?P<arch>{ARCH_RE})\]\)$"
)
CONF_RE = re.compile(
    rf"^Conf {FULL_RE} \((?P<to>[^\s()\[\]]+) (?P<rel>[^\[\]\r\n]*) "
    rf"\[(?P<arch>{ARCH_RE})\]\)$"
)
REMV_RE = re.compile(rf"^(?P<verb>Remv|Purg) {FULL_RE} \[(?P<from>[^\[\]\s]+)\]$")
ACTION_PREFIXES = ("Inst ", "Conf ", "Remv ", "Purg ")
FORBIDDEN_SUMMARY_MARKERS = {
    "The following packages have been kept back:": "KEPT_BACK_SUMMARY",
    "The following held packages will be changed:": "HELD_CHANGE_SUMMARY",
    "The following packages will be DOWNGRADED:": "DOWNGRADE_SUMMARY",
    "The following packages will be REMOVED:": "REMOVE_SUMMARY",
}
BOUND_INPUTS = {
    "resolved_closure": {"bytes": 293999, "sha256": "bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970", "count": 910},
    "installed_packages": {"bytes": 27625, "sha256": "14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7", "count": 255},
    "verified_archives": {"bytes": 439991, "sha256": "38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98", "count": 826},
}

class ParseFailure(RuntimeError):
    pass

def sha256_bytes(data):
    return hashlib.sha256(data).hexdigest()

def canonical_json_bytes(value, *, sort_keys=True):
    return (json.dumps(value, ensure_ascii=False, separators=(",", ":"), sort_keys=sort_keys) + "\n").encode("utf-8")

# Exact comparator copied byte-for-byte in semantics from canonical 004C1AG resolver v2.
def split_deb_version(v):
    if ':' in v:
        ep, rest=v.split(':',1); epoch=int(ep)
    else: epoch=0; rest=v
    if '-' in rest: up, rev=rest.rsplit('-',1)
    else: up, rev=rest, ''
    return epoch, up, rev

def order_char(c):
    if c == '~': return -1
    if c == '': return 0
    if c.isalpha(): return ord(c)
    return ord(c)+256

def verrevcmp(a,b):
    ia=ib=0
    while ia < len(a) or ib < len(b):
        while (ia < len(a) and not a[ia].isdigit()) or (ib < len(b) and not b[ib].isdigit()):
            ca=a[ia] if ia < len(a) and not a[ia].isdigit() else ''
            cb=b[ib] if ib < len(b) and not b[ib].isdigit() else ''
            oa,ob=order_char(ca),order_char(cb)
            if oa != ob: return -1 if oa < ob else 1
            if ca: ia+=1
            if cb: ib+=1
        za=ia
        while za < len(a) and a[za]=='0': za+=1
        zb=ib
        while zb < len(b) and b[zb]=='0': zb+=1
        ea=za
        while ea < len(a) and a[ea].isdigit(): ea+=1
        eb=zb
        while eb < len(b) and b[eb].isdigit(): eb+=1
        la,lb=ea-za,eb-zb
        if la != lb: return -1 if la < lb else 1
        sa,sb=a[za:ea],b[zb:eb]
        if sa != sb: return -1 if sa < sb else 1
        while ia < len(a) and a[ia].isdigit(): ia+=1
        while ib < len(b) and b[ib].isdigit(): ib+=1
    return 0

def version_cmp(a,b):
    ea,ua,ra=split_deb_version(a); eb,ub,rb=split_deb_version(b)
    if ea != eb: return -1 if ea < eb else 1
    c=verrevcmp(ua,ub)
    return c if c else verrevcmp(ra,rb)

def split_full_name(full, arch_hint=None, native_arch=NATIVE_ARCH):
    if ":" in full:
        package, explicit_arch = full.rsplit(":", 1)
        if not re.fullmatch(PKG_RE, package) or not re.fullmatch(ARCH_RE, explicit_arch):
            raise ParseFailure(f"invalid full package name: {full!r}")
        if arch_hint is not None and explicit_arch != arch_hint:
            raise ParseFailure(f"explicit architecture mismatch: {full!r} vs {arch_hint!r}")
        return package, explicit_arch
    if not re.fullmatch(PKG_RE, full):
        raise ParseFailure(f"invalid package name: {full!r}")
    if arch_hint is not None and arch_hint not in (native_arch, "all", "any"):
        raise ParseFailure(f"foreign architecture omitted from FullName(true): {full!r} / {arch_hint!r}")
    return full, arch_hint

def unique(rows, description):
    if len(rows) != 1:
        raise ParseFailure(f"{description}: expected exactly one row, got {len(rows)}")
    return rows[0]

def require_fields(row, fields, description):
    if not isinstance(row, dict):
        raise ParseFailure(f"{description}: expected object row")
    missing = [field for field in fields if field not in row]
    if missing:
        raise ParseFailure(f"{description}: missing required fields: {','.join(missing)}")

def metadata_row_hash(row):
    return sha256_bytes(canonical_json_bytes(row, sort_keys=True))

def verify_archive_mapping(metadata, archive):
    pairs = (
        ("package", "package"), ("version", "version"), ("architecture", "architecture"),
        ("filename", "filename"), ("size", "size"), ("sha256", "sha256"),
        ("suite", "suite"), ("component", "component"),
    )
    require_fields(metadata, tuple(mk for mk, _ in pairs), "AG metadata row")
    require_fields(archive, tuple(ak for _, ak in pairs) + ("observed_size", "observed_sha256"), "AK archive row")
    for mk, ak in pairs:
        if metadata[mk] != archive[ak]:
            raise ParseFailure(f"AG/AK archive identity mismatch for {metadata['package']}: {mk}")
    if archive["observed_size"] != archive["size"]:
        raise ParseFailure(f"AK observed size mismatch for {metadata['package']}")
    if archive["observed_sha256"] != archive["sha256"]:
        raise ParseFailure(f"AK observed SHA-256 mismatch for {metadata['package']}")

def read_bound_json(path, binding_name):
    data = Path(path).read_bytes()
    binding = BOUND_INPUTS[binding_name]
    if len(data) != binding["bytes"] or sha256_bytes(data) != binding["sha256"]:
        raise ParseFailure(f"canonical input identity mismatch: {binding_name}")
    try:
        value = json.loads(data.decode("utf-8", errors="strict"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        raise ParseFailure(f"invalid canonical JSON input: {binding_name}") from exc
    if not isinstance(value, list) or len(value) != binding["count"]:
        raise ParseFailure(f"canonical input record-count mismatch: {binding_name}")
    return value

def record_sort_key(row):
    def part(v):
        return (0, "") if v is None else (1, str(v))
    return tuple(part(row[k]) for k in ("stageId", "action", "package", "architecture", "fromVersion", "toVersion"))

def make_record(action, package, architecture, from_version, to_version, metadata, archive):
    values = {
        "stageId": STAGE_ID,
        "action": action,
        "package": package,
        "architecture": architecture,
        "fromVersion": from_version,
        "toVersion": to_version,
        "canonicalPackageMetadataSha256": metadata_row_hash(metadata) if metadata is not None else None,
        "filename": archive["filename"] if archive is not None else None,
        "archiveBytes": archive["size"] if archive is not None else None,
        "archiveSha256": archive["sha256"] if archive is not None else None,
        "selectedSuite": metadata["suite"] if metadata is not None else None,
        "selectedComponent": metadata["component"] if metadata is not None else None,
        "reasonClass": metadata["reason"] if metadata is not None else None,
    }
    return {k: values[k] for k in RECORD_KEYS}

def parse_stage_b(raw, closure, installed, archives, *, roots=STAGE_B_ROOTS, native_arch=NATIVE_ARCH):
    if not isinstance(raw, (bytes, bytearray)):
        raise ParseFailure("raw stdout must be bytes")
    raw = bytes(raw)
    if not raw or not raw.endswith(b"\n"):
        raise ParseFailure("raw stdout must be non-empty and LF-terminated")
    if b"\x00" in raw:
        raise ParseFailure("NUL byte in raw stdout")
    try:
        text = raw.decode("utf-8", errors="strict")
    except UnicodeDecodeError as exc:
        raise ParseFailure("raw stdout is not strict UTF-8") from exc
    if "\r" in text:
        raise ParseFailure("CR is prohibited; raw stdout must use LF")

    closure_by_key = {}
    for index, row in enumerate(closure):
        require_fields(
            row,
            ("package", "version", "architecture", "filename", "size", "sha256", "suite", "component", "reason"),
            f"AG metadata row {index}",
        )
        key = (row["package"], row["version"], row["architecture"])
        closure_by_key.setdefault(key, []).append(row)
    for index, row in enumerate(installed):
        require_fields(row, ("package", "version", "architecture", "status"), f"AI installed row {index}")
    installed_rows = [r for r in installed if r["status"] == "install ok installed"]
    installed_by_key = {}
    for row in installed_rows:
        key = (row["package"], row["version"], row["architecture"])
        installed_by_key.setdefault(key, []).append(row)
    archives_by_key = {}
    archive_fields = (
        "package", "version", "architecture", "filename", "size", "sha256",
        "suite", "component", "observed_size", "observed_sha256",
    )
    for index, row in enumerate(archives):
        require_fields(row, archive_fields, f"AK archive row {index}")
        key = (row["package"], row["version"], row["architecture"])
        archives_by_key.setdefault(key, []).append(row)

    installs = {}
    confs = {}
    removals = {}
    findings = []
    lines = text[:-1].split("\n")

    for line_no, line in enumerate(lines, 1):
        if line in FORBIDDEN_SUMMARY_MARKERS:
            findings.append({"code": FORBIDDEN_SUMMARY_MARKERS[line], "line": line_no})
            continue
        if line.startswith("Inst "):
            match = INST_RE.fullmatch(line)
            if match is None:
                raise ParseFailure(f"malformed Inst line {line_no}: {line!r}")
            package, arch = split_full_name(match.group("full"), match.group("arch"), native_arch)
            key = (package, arch)
            if key in installs:
                raise ParseFailure(f"duplicate Inst for {key}")
            installs[key] = {
                "line": line_no, "package": package, "architecture": arch,
                "fromVersion": match.group("from"), "toVersion": match.group("to"),
                "releaseDescription": match.group("rel"),
            }
            continue
        if line.startswith("Conf "):
            if re.fullmatch(rf"Conf {PKG_RE}(?::{ARCH_RE})? broken", line):
                raise ParseFailure(f"broken Conf line {line_no}")
            match = CONF_RE.fullmatch(line)
            if match is None:
                raise ParseFailure(f"malformed Conf line {line_no}: {line!r}")
            package, arch = split_full_name(match.group("full"), match.group("arch"), native_arch)
            key = (package, arch)
            if key in confs:
                raise ParseFailure(f"duplicate Conf for {key}")
            confs[key] = {
                "line": line_no, "package": package, "architecture": arch,
                "toVersion": match.group("to"), "releaseDescription": match.group("rel"),
            }
            continue
        if line.startswith(("Remv ", "Purg ")):
            match = REMV_RE.fullmatch(line)
            if match is None:
                raise ParseFailure(f"malformed removal line {line_no}: {line!r}")
            if match.group("verb") == "Purg":
                raise ParseFailure(f"Purg is nonqualifying at line {line_no}")
            full = match.group("full")
            current = match.group("from")
            if ":" in full:
                package, arch = split_full_name(full)
            else:
                package = full
                matches = [
                    r for r in installed_rows
                    if r["package"] == package
                    and r["version"] == current
                    and r["architecture"] in (native_arch, "all", "any")
                ]
                arch = unique(matches, f"removal installed-state resolution for {package} {current}")["architecture"]
            key = (package, arch)
            if key in removals:
                raise ParseFailure(f"duplicate Remv for {key}")
            removals[key] = {"line": line_no, "package": package, "architecture": arch, "fromVersion": current}
            continue
        if line.startswith(ACTION_PREFIXES):
            raise ParseFailure(f"unparsed action-looking line {line_no}: {line!r}")

    records = []
    action_keys = set()
    for key, inst in installs.items():
        if key in removals:
            raise ParseFailure(f"same package/architecture both installed and removed: {key}")
        conf = confs.get(key)
        if conf is None:
            raise ParseFailure(f"missing Conf for {key}")
        if conf["line"] <= inst["line"]:
            raise ParseFailure(f"Conf does not follow Inst for {key}")
        if conf["toVersion"] != inst["toVersion"]:
            raise ParseFailure(f"Conf target mismatch for {key}")
        package, arch = key
        target = inst["toVersion"]
        metadata = unique(closure_by_key.get((package, target, arch), []), f"canonical metadata mapping for {package} {target} {arch}")
        archive = unique(archives_by_key.get((package, target, arch), []), f"verified archive mapping for {package} {target} {arch}")
        verify_archive_mapping(metadata, archive)
        current = inst["fromVersion"]
        if current is None:
            predecessors = [
                row for row in installed_rows
                if row["package"] == package and row["architecture"] == arch
            ]
            if predecessors:
                raise ParseFailure(f"Inst without current version conflicts with predecessor installed state for {key}")
            action = "INSTALL"
        else:
            unique(installed_by_key.get((package, current, arch), []), f"predecessor installed mapping for {package} {current} {arch}")
            cmpv = version_cmp(current, target)
            if cmpv < 0:
                action = "UPGRADE"
            elif cmpv > 0:
                action = "DOWNGRADE"
                findings.append({"code": "DOWNGRADE", "package": package, "architecture": arch, "fromVersion": current, "toVersion": target})
            else:
                raise ParseFailure(f"equal-version Inst is not a canonical action for {key}")
        records.append(make_record(action, package, arch, current, target, metadata, archive))
        action_keys.add(key)

    for key in confs:
        if key not in installs:
            raise ParseFailure(f"Conf without matching Inst for {key}")

    for key, rem in removals.items():
        package, arch = key
        current = rem["fromVersion"]
        unique(installed_by_key.get((package, current, arch), []), f"remove predecessor mapping for {package} {current} {arch}")
        records.append(make_record("REMOVE", package, arch, current, None, None, None))
        action_keys.add(key)
        findings.append({"code": "REMOVE", "package": package, "architecture": arch, "fromVersion": current})

    root_seen = set()
    for root in roots:
        resolved_package = STAGE_B_VIRTUAL_ROOT_PROVIDER_MAP.get(root, root)
        root_meta = [r for r in closure if r["package"] == resolved_package]
        metadata = unique(root_meta, f"requested-root metadata selection for {root} -> {resolved_package}")
        key = (resolved_package, metadata["architecture"])
        if key in action_keys:
            root_seen.add(root)
            continue
        exact_installed = installed_by_key.get((resolved_package, metadata["version"], metadata["architecture"]), [])
        if len(exact_installed) != 1:
            raise ParseFailure(
                f"requested root has no solver action and its resolved package is not exact in predecessor: {root} -> {resolved_package}"
            )
        records.append(make_record(
            "UNCHANGED_REQUESTED_ROOT", resolved_package, metadata["architecture"], metadata["version"],
            metadata["version"], metadata, None,
        ))
        root_seen.add(root)
    if len(root_seen) != len(roots):
        raise ParseFailure("requested-root accounting incomplete")

    records.sort(key=record_sort_key)
    jsonl = b"".join(canonical_json_bytes(row, sort_keys=False) for row in records)
    archive_identities = []
    seen_archive = set()
    for row in records:
        if row["archiveSha256"] is None:
            continue
        ident = {
            "package": row["package"], "version": row["toVersion"], "architecture": row["architecture"],
            "filename": row["filename"], "size": row["archiveBytes"], "sha256": row["archiveSha256"],
        }
        key = tuple(ident[k] for k in ("package", "version", "architecture", "filename", "size", "sha256"))
        if key not in seen_archive:
            seen_archive.add(key); archive_identities.append(ident)
    archive_identities.sort(key=lambda r: (r["package"], r["version"], r["architecture"], r["filename"], r["size"], r["sha256"]))
    archive_bytes = canonical_json_bytes(archive_identities, sort_keys=False)
    counts = {action: sum(1 for r in records if r["action"] == action) for action in ACTIONS}
    return {
        "schema": "signthos.004c1bm.stage-b-apt-parser-result.v1",
        "qualifies": len(findings) == 0,
        "rawStdoutBytes": len(raw),
        "rawStdoutSha256": sha256_bytes(raw),
        "recordCount": len(records),
        "recordCountByAction": counts,
        "canonicalTransactionJsonlBytes": len(jsonl),
        "canonicalTransactionJsonlSha256": sha256_bytes(jsonl),
        "selectedArchiveIdentityCount": len(archive_identities),
        "selectedArchiveIdentitySetSha256": sha256_bytes(archive_bytes),
        "findings": findings,
        "records": records,
    }, jsonl, archive_bytes

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("raw_stdout")
    ap.add_argument("resolved_closure")
    ap.add_argument("installed_packages")
    ap.add_argument("verified_archives")
    args = ap.parse_args()
    raw = Path(args.raw_stdout).read_bytes()
    closure = read_bound_json(args.resolved_closure, "resolved_closure")
    installed = read_bound_json(args.installed_packages, "installed_packages")
    archives = read_bound_json(args.verified_archives, "verified_archives")
    result, _, _ = parse_stage_b(raw, closure, installed, archives)
    print(json.dumps(result, ensure_ascii=False, separators=(",", ":"), sort_keys=True))

if __name__ == "__main__":
    main()
```

## 7. Reproducible transformation builder

The builder below reconstructs the frozen Stage B parser from the exact canonical 004C1BC parser and 004C1AQ root list. It is retained as qualification evidence, not product/runtime source.

```python
#!/usr/bin/env python3
import hashlib, importlib.util, pathlib

ORIGINAL = pathlib.Path('/private/tmp/004c1bh-parser.py')
OUTPUT = pathlib.Path('/private/tmp/004c1bm-stage-b-parser.py')
BUILDER = pathlib.Path('/tmp/signthos-004c1bk-builder.py')
ORIGINAL_BYTES = 18866
ORIGINAL_SHA256 = '87c43b8a318de2b3d353c6c79b4a06abe41670144e1ee36cf7724105ff670550'
VIRTUAL_INSTALLED_BYTES = 27625
VIRTUAL_INSTALLED_SHA256 = '14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7'
VIRTUAL_INSTALLED_COUNT = 255

def sha(data):
    return hashlib.sha256(data).hexdigest()

raw = ORIGINAL.read_bytes()
assert len(raw) == ORIGINAL_BYTES and sha(raw) == ORIGINAL_SHA256
src = raw.decode('utf-8')
spec = importlib.util.spec_from_file_location('bk', BUILDER)
bk = importlib.util.module_from_spec(spec); spec.loader.exec_module(bk)
roots = bk.parse_roots(bk.get_doc('aq'))
assert len(roots) == 145
start = src.index('STAGE_A_ROOTS = [')
end = src.index(']\nACTIONS', start) + 2
root_block = 'STAGE_B_ROOTS = [\n' + ''.join(f'    {root!r},\n' for root in roots) + ']\n'
root_block += 'STAGE_B_VIRTUAL_ROOT_PROVIDER_MAP = {"git-core": "git"}\n'
out = src[:start] + root_block + src[end:]
out = out.replace('STAGE_ID = "STAGE_A"', 'STAGE_ID = "STAGE_B"', 1)
out = out.replace(
    '"installed_packages": {"bytes": 25060, "sha256": "bdc5c6bbbe47db0313b2281b67e2f152ad75e93ab169bbfccf0b5441444694ba", "count": 231}',
    '"installed_packages": {"bytes": 27625, "sha256": "14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7", "count": 255}',
    1,
)
out = out.replace('parse_stage_a', 'parse_stage_b')
out = out.replace('STAGE_A_ROOTS', 'STAGE_B_ROOTS')
out = out.replace(
    'signthos.004c1bc.stage-a-apt-parser-result.v1',
    'signthos.004c1bm.stage-b-apt-parser-result.v1',
)
old_root_loop = '''    root_seen = set()
    for root in roots:
        root_meta = [r for r in closure if r["package"] == root]
        metadata = unique(root_meta, f"requested-root metadata selection for {root}")
        key = (root, metadata["architecture"])
        if key in action_keys:
            root_seen.add(root)
            continue
        exact_installed = installed_by_key.get((root, metadata["version"], metadata["architecture"]), [])
        if len(exact_installed) != 1:
            raise ParseFailure(f"requested root has no solver action and is not exact in predecessor: {root}")
        records.append(make_record(
            "UNCHANGED_REQUESTED_ROOT", root, metadata["architecture"], metadata["version"],
            metadata["version"], metadata, None,
        ))
        root_seen.add(root)
'''
new_root_loop = '''    root_seen = set()
    for root in roots:
        resolved_package = STAGE_B_VIRTUAL_ROOT_PROVIDER_MAP.get(root, root)
        root_meta = [r for r in closure if r["package"] == resolved_package]
        metadata = unique(root_meta, f"requested-root metadata selection for {root} -> {resolved_package}")
        key = (resolved_package, metadata["architecture"])
        if key in action_keys:
            root_seen.add(root)
            continue
'''
assert out.count(old_root_loop) == 1
new_root_loop += '''        exact_installed = installed_by_key.get((resolved_package, metadata["version"], metadata["architecture"]), [])
        if len(exact_installed) != 1:
            raise ParseFailure(
                f"requested root has no solver action and its resolved package is not exact in predecessor: {root} -> {resolved_package}"
            )
        records.append(make_record(
            "UNCHANGED_REQUESTED_ROOT", resolved_package, metadata["architecture"], metadata["version"],
            metadata["version"], metadata, None,
        ))
        root_seen.add(root)
'''
out = out.replace(old_root_loop, new_root_loop, 1)
assert 'STAGE_A' not in out and 'stage_a' not in out and 'stage-a' not in out
assert out.count('STAGE_B_VIRTUAL_ROOT_PROVIDER_MAP') == 2
assert out.count('git-core') == 2 and out.count('"git"') >= 1
OUTPUT.write_text(out, encoding='utf-8')
rendered = OUTPUT.read_bytes()
print(f'PARSER_BYTES={len(rendered)}')
print(f'PARSER_SHA256={sha(rendered)}')
print(f'ROOT_COUNT={len(roots)}')
```

## 8. Static qualification harness

```python
#!/usr/bin/env python3
import hashlib, importlib.util, json, pathlib, tempfile

PARSER = pathlib.Path('/private/tmp/004c1bm-stage-b-parser.py')
CLOSURE = pathlib.Path('/private/tmp/signthos-004c1ag-final-A.9967/resolved-closure.json')
ARCHIVES = pathlib.Path('/private/tmp/signthos-004c1ak-A/verified-archives.json')
VINST = pathlib.Path('/private/tmp/signthos-004c1bm-virtual-installed-packages.json')
EXPECTED_PARSER = (21669, '2fe9378cd97621ae141fa7f5252ac7741522ba930753fa5f25b557c3589e1e40')

def ident(path):
    data = path.read_bytes(); return len(data), hashlib.sha256(data).hexdigest()

assert ident(PARSER) == EXPECTED_PARSER
assert ident(CLOSURE) == (293999, 'bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970')
assert ident(ARCHIVES) == (439991, '38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98')
assert ident(VINST) == (27625, '14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7')
spec = importlib.util.spec_from_file_location('p', PARSER)
p = importlib.util.module_from_spec(spec); spec.loader.exec_module(p)
closure = json.loads(CLOSURE.read_bytes()); archives = json.loads(ARCHIVES.read_bytes()); vinst = json.loads(VINST.read_bytes())
assert (len(closure), len(archives), len(vinst)) == (910, 826, 255)
assert p.STAGE_ID == 'STAGE_B' and len(p.STAGE_B_ROOTS) == 145
assert p.STAGE_B_VIRTUAL_ROOT_PROVIDER_MAP == {'git-core': 'git'}
resolved = {}
for root in p.STAGE_B_ROOTS:
    package = p.STAGE_B_VIRTUAL_ROOT_PROVIDER_MAP.get(root, root)
    rows = [row for row in closure if row['package'] == package]
    assert len(rows) == 1, (root, package, len(rows))
    resolved[root] = rows[0]
assert resolved['git-core']['package'] == 'git'
assert resolved['git-core']['version'] == '1:2.34.1-1ubuntu1.17'
assert resolved['git-core']['architecture'] == 'amd64'
assert resolved['git-core']['reason'] == 'ROOT'

archive_keys = {(row['package'], row['version'], row['architecture']) for row in archives}
archive_gaps = []
for root, row in resolved.items():
    key = (row['package'], row['version'], row['architecture'])
    if key not in archive_keys:
        exact = [x for x in vinst if (x['package'], x['version'], x['architecture']) == key and x['status'] == 'install ok installed']
        assert len(exact) == 1, (root, key)
        archive_gaps.append(root)
assert archive_gaps == ['libffi8', 'libfontconfig1', 'libnspr4', 'patch', 'zip', 'zlib1g']

def meta(package, version='2.0', arch='amd64'):
    return {'package':package,'version':version,'architecture':arch,'filename':f'pool/{package}_{version}_{arch}.deb','size':123,'sha256':'a'*64,'suite':'jammy','component':'main','reason':'ROOT','parent':None}
def archive(row):
    return {'package':row['package'],'version':row['version'],'architecture':row['architecture'],'filename':row['filename'],'size':row['size'],'sha256':row['sha256'],'suite':row['suite'],'component':row['component'],'observed_size':row['size'],'observed_sha256':row['sha256']}

def installed(package, version, arch='amd64'):
    return {'package':package,'version':version,'architecture':arch,'status':'install ok installed'}

a = meta('alpha','2.0'); b = meta('beta','2.0'); g = meta('gamma','1.0')
pos_raw = (
    b'Inst alpha (2.0 jammy [amd64])\nConf alpha (2.0 jammy [amd64])\n'
    b'Inst beta [1.0] (2.0 jammy [amd64])\nConf beta (2.0 jammy [amd64])\n'
)
pos_inputs = ([a,b,g], [installed('beta','1.0'), installed('gamma','1.0')], [archive(a),archive(b)])
res1, jsonl1, arc1 = p.parse_stage_b(pos_raw, *pos_inputs, roots=['alpha','beta','gamma'])
res2, jsonl2, arc2 = p.parse_stage_b(pos_raw, *pos_inputs, roots=['alpha','beta','gamma'])
assert res1['qualifies'] and res1['findings'] == []
assert res1['recordCountByAction']['INSTALL'] == 1
assert res1['recordCountByAction']['UPGRADE'] == 1
assert res1['recordCountByAction']['UNCHANGED_REQUESTED_ROOT'] == 1
assert res1 == res2 and jsonl1 == jsonl2 and arc1 == arc2
# Full default-root accounting, including the sole canonical virtual provider.
full_closure = []
full_installed = []
seen = set()
for root in p.STAGE_B_ROOTS:
    package = p.STAGE_B_VIRTUAL_ROOT_PROVIDER_MAP.get(root, root)
    assert package not in seen; seen.add(package)
    row = meta(package, '1.0')
    full_closure.append(row); full_installed.append(installed(package, '1.0'))
full_res, full_jsonl, full_arc = p.parse_stage_b(b'\n', full_closure, full_installed, [], roots=p.STAGE_B_ROOTS)
assert full_res['qualifies'] and full_res['recordCount'] == 145
assert full_res['recordCountByAction']['UNCHANGED_REQUESTED_ROOT'] == 145
assert any(row['package'] == 'git' and row['action'] == 'UNCHANGED_REQUESTED_ROOT' for row in full_res['records'])
assert not any(row['package'] == 'git-core' for row in full_res['records'])

# Downgrade and removal are preserved as explicit nonqualifying findings.
d = meta('delta','1.0'); dr = b'Inst delta [2.0] (1.0 jammy [amd64])\nConf delta (1.0 jammy [amd64])\n'
down, _, _ = p.parse_stage_b(dr, [d], [installed('delta','2.0')], [archive(d)], roots=[])
assert not down['qualifies'] and any(x['code']=='DOWNGRADE' for x in down['findings'])
rem, _, _ = p.parse_stage_b(b'Remv delta [2.0]\n', [], [installed('delta','2.0')], [], roots=[])
assert not rem['qualifies'] and any(x['code']=='REMOVE' for x in rem['findings'])
# Malformed action-looking lines and unbound virtual roots fail closed.
try:
    p.parse_stage_b(b'Inst ???\n', [], [], [], roots=[])
    raise AssertionError('malformed action accepted')
except p.ParseFailure:
    pass
try:
    p.parse_stage_b(b'\n', [meta('provider','1.0')], [installed('provider','1.0')], [], roots=['unbound-virtual-root'])
    raise AssertionError('unbound virtual root accepted')
except p.ParseFailure:
    pass

# Exact predecessor installed-state file identity is enforced before JSON parsing.
tampered = VINST.read_bytes()[:-1] + (b' ' if VINST.read_bytes()[-1:] != b' ' else b'\n')
with tempfile.TemporaryDirectory() as td:
    path = pathlib.Path(td) / 'installed.json'; path.write_bytes(tampered)
    try:
        p.read_bound_json(path, 'installed_packages')
        raise AssertionError('tampered predecessor state accepted')
    except p.ParseFailure:
        pass

summary = {
    'schema':'signthos.004c1bm.static-parser-qualification.v1',
    'parserBytes':ident(PARSER)[0], 'parserSha256':ident(PARSER)[1],
    'canonicalRootCount':len(p.STAGE_B_ROOTS), 'virtualRootMap':p.STAGE_B_VIRTUAL_ROOT_PROVIDER_MAP,
    'canonicalMetadataRows':len(closure), 'canonicalArchiveRows':len(archives), 'predecessorInstalledRows':len(vinst),
}
summary.update({
    'canonicalRootMetadataCoverage':'145/145 via one bound virtual provider',
    'archiveGapsExactInstalled':archive_gaps,
    'positiveInstallUpgradeUnchanged':'PASS',
    'full145RootAccounting':'PASS',
    'virtualProviderAccounting':'PASS',
    'downgradeFinding':'PASS',
    'removalFinding':'PASS',
    'malformedActionRejection':'PASS',
    'unboundVirtualRootRejection':'PASS',
    'tamperedPredecessorBindingRejection':'PASS',
    'deterministicResultAndSerialization':'PASS',
    'positiveTransactionJsonlBytes':len(jsonl1),
    'positiveTransactionJsonlSha256':hashlib.sha256(jsonl1).hexdigest(),
    'fullRootTransactionJsonlBytes':len(full_jsonl),
    'fullRootTransactionJsonlSha256':hashlib.sha256(full_jsonl).hexdigest(),
})
print(json.dumps(summary,sort_keys=True,separators=(',',':')))
```

## 9. Acceptance, nonclaims, and successor boundary

```text
004C1BM_004C1BC_SEMANTIC_BASE = PRESERVED_EXCEPT_EXPLICIT_STAGE_B_BINDINGS
004C1BM_STAGE_B_ROOT_ACCOUNTING = PASS_STATIC
004C1BM_VIRTUAL_ROOT_PROVIDER_MAPPING = PASS_EXACT_ONE_MAPPING
004C1BM_PREDECESSOR_STATE_BINDING = PASS
004C1BM_ARCHIVE_MAPPING_FAIL_CLOSED = PASS_STATIC
004C1BM_DOWNGRADE_REMOVE_FINDINGS = PASS_STATIC
004C1BM_MALFORMED_INPUT_REJECTION = PASS_STATIC
004C1BM_TAMPERED_INPUT_REJECTION = PASS_STATIC
004C1BM_DETERMINISTIC_SERIALIZATION = PASS_STATIC
004C1BM_RESULT = PASS_STATIC_PARSER_QUALIFICATION_ONLY
STAGE_B_RUNTIME_RESULT = NOT_ESTABLISHED
004C1BL_REPLAY_A_ATTEMPTS_USED = 0
004C1BL_REPLAY_A_ATTEMPTS_REMAINING = 1
REPLAY_B = NOT_AUTHORIZED
STAGE_C = NOT_AUTHORIZED
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
PROJECT_COMPLETE = FALSE
```

Guarded merge of this document does not itself revive or consume 004C1BL execution authority. After merge and mechanical post-merge verification, Issue #7 must separately reconcile whether the previously unconsumed Replay-A authority can be reissued against the new canonical main and the exact 004C1BM parser identity. Any Stage B execution before that reconciliation remains prohibited.
