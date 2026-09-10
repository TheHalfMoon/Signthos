# 004C1BC — Stage A APT simulator-output parser qualification

Status: **candidate / static qualification only**
Canonical base: `9c99b2983cf2c022a5efcd469050964bd9f0f0da`
Canonical base tree: `4bea87dd75c6078ca5b15c8d333455b550a4ca21`
Authority: `github:issue-comment:5611324884`
Comparator provenance: `github:issue-comment:5611410202`

## 1. Purpose and authority boundary

Canonical 004C1BB freezes the combined same-container executable-hook recheck and repaired Stage A `apt-get --simulate` harness. It deliberately does not define how observed APT simulator stdout becomes canonical `AptTransactionRecord` evidence. Canonical 004C1AL requires that conversion to be deterministic and fail closed. This unit freezes that parser and mapping method **before any Stage A output is observed**.

This qualification executes only Signthos-authored Python against synthetic fixtures and already-canonical metadata bytes. It performs no Docker container execution, `apt-config`, `apt-get`, dpkg, package action, archive extraction, Stage A solver run, or downstream runtime/build action.

```text
DOCKER_EXECUTION = 0
APT_CONFIG_EXECUTION = 0
APT_GET_EXECUTION = 0
DPKG_EXECUTION = 0
STAGE_A_EXECUTION = 0
OBSERVED_STAGE_A_STDOUT_AVAILABLE_TO_004C1BC = false
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = 0
```

## 2. Exact canonical inputs

The future parser CLI rejects any input file that does not match all frozen byte identities below before JSON decoding or transaction parsing.

```text
004C1BB_STAGE_A_ARGV_SHA256 = dceeccc5096bbc9eb0c661b93be5a5091f459a2ffaeed808b4bebb212ebff96b
004C1AG_RESOLVED_CLOSURE_BYTES = 293999
004C1AG_RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
004C1AG_RESOLVED_CLOSURE_RECORDS = 910
004C1AI_INSTALLED_PACKAGES_BYTES = 25060
004C1AI_INSTALLED_PACKAGES_SHA256 = bdc5c6bbbe47db0313b2281b67e2f152ad75e93ab169bbfccf0b5441444694ba
004C1AI_INSTALLED_PACKAGES_RECORDS = 231
004C1AK_VERIFIED_ARCHIVES_BYTES = 439991
004C1AK_VERIFIED_ARCHIVES_SHA256 = 38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98
004C1AK_VERIFIED_ARCHIVES_RECORDS = 826
```

For every install/upgrade/downgrade action, mapping must resolve exactly one 004C1AG `(package, version, architecture)` row and exactly one 004C1AK row with the same tuple. The parser additionally requires exact equality of `filename`, `size`, `sha256`, `suite`, and `component`, and requires observed 004C1AK size/SHA fields to equal the verified expected values. Any absence, duplicate, or disagreement fails closed.

## 3. Exact APT 2.4.13 output semantics

The parser contract was derived statically from exact APT source commit `581ec5c0aa2c6665d72465040f1465eb93503200`, tree `e9afcae41f88040e93eb7a10a89e72c00b59e245`.

```text
apt-pkg/algorithms.cc SHA256 = 6dd7c7a4bfdb03f269e895f6290e456ed4963bdf91707715d0c54609da97ec1e
apt-pkg/pkgcache.cc SHA256 = e3cd572c385560820ba7d38f259173fa152374133281c18d0450697ee9c162bf
apt-private/private-output.cc SHA256 = 080cfbc2fb7c84526a796ae0c53bb10e4c9ad95844c29800a4a679143c9498f3
apt-private/private-output.h SHA256 = 3bf50d9d2abece6eaf063c10b2277002a8f39d4e65e853a1c5347b199aad0399
apt-private/private-install.cc SHA256 = 70731f4b87a6211600b9573995e41e6b200010d3cd0508f73a0061c45a32fc90
```

`pkgSimulate::RealInstall` emits `Inst` plus `Pkg.FullName(true)`, optional current version in square brackets, and a required candidate description containing candidate version, `RelStr()`, and terminal architecture. `RealConfigure` emits `Conf` with the candidate description, except a broken configuration emits `Conf <package> broken` and an APT error. `RealRemove` emits `Remv` or `Purg` with current version. `ShortBreaks()` can append a second bracketed broken-package suffix; the frozen grammar rejects that suffix. `PkgIterator::FullName(true)` retains `:arch` for foreign architecture and omits it only for native, `all`, or `any`. `RelStr()` can contain multiple comma-separated release descriptions and terminates with `[architecture]`.

Exact APT integration fixtures used only as static grammar corroboration are bound by source commit plus these file identities:

```text
test/integration/test-allow SHA256 = 983f3b697ffefe415ca5114379ace27e6eaaf2aedb0928a7d7a00b9505a183af
test/integration/test-allow-scores-for-all-dependency-types SHA256 = e3b6c508134cce96d7ef627564c4aa4f90c05f83937801c6a003648493df3344
test/integration/test-apt-cdrom SHA256 = 87e39592b04daa85804f11346b10a41934518b8da7847e5581f760c78c84da15
test/integration/test-apt-get-install-virtual-pkgs SHA256 = 0dee66b0b016c54d31f29f4a5fc2d84401d1817f38c0a6c11a43a355684e66e8
```

No upstream source or fixture bytes are committed here; the values above are identities and the test payloads below are Signthos-authored synthetic fixtures.

## 4. Canonical Debian version comparator

Canonical 004C1AG records its exact resolver v2 source as 22,258 bytes with SHA-256 `8c0150e2054091eba165f56a0576fac62b213a618ff2f0b6f885faa59bd581c2`; 004C1AJ independently re-binds that same source identity. The contiguous comparator fragment (`split_deb_version`, `order_char`, `verrevcmp`, `version_cmp`) is 1,525 bytes with SHA-256 `bdfbdd13f20909879bc2ffa27f78d7584cbb16ebe17250fb50aff11ac91644c3`. AST comparison of those four functions against the frozen parser below is exact.

The parser therefore classifies a current-to-target transition strictly as `UPGRADE` when `version_cmp(current, target) < 0`, `DOWNGRADE` when greater than zero, and rejects equal-version `Inst` as noncanonical. This preserves epoch, upstream version, Debian revision, `~`, digit/non-digit ordering, leading-zero, and omitted-revision semantics from the already-canonical resolver.

## 5. Frozen parser source

Serialization of this source is the exact UTF-8 bytes between the Python fence boundaries, excluding the Markdown fence lines and including the final LF before the closing fence.

```text
PARSER_BYTES = 18866
PARSER_SHA256 = 87c43b8a318de2b3d353c6c79b4a06abe41670144e1ee36cf7724105ff670550
```

```python
#!/usr/bin/env python3
import argparse
import hashlib
import json
import re
from pathlib import Path

STAGE_ID = "STAGE_A"
NATIVE_ARCH = "amd64"
STAGE_A_ROOTS = [
    "pkg-config", "autoconf", "automake", "libtool", "ragel", "git",
    "yasm", "subversion", "lsb-release", "tzdata", "keyboard-configuration", "tini",
]
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
    "installed_packages": {"bytes": 25060, "sha256": "bdc5c6bbbe47db0313b2281b67e2f152ad75e93ab169bbfccf0b5441444694ba", "count": 231},
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

def parse_stage_a(raw, closure, installed, archives, *, roots=STAGE_A_ROOTS, native_arch=NATIVE_ARCH):
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
        "schema": "signthos.004c1bc.stage-a-apt-parser-result.v1",
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
    result, _, _ = parse_stage_a(raw, closure, installed, archives)
    print(json.dumps(result, ensure_ascii=False, separators=(",", ":"), sort_keys=True))

if __name__ == "__main__":
    main()
```

## 6. Parser semantics and canonical transaction records

Raw stdout must be non-empty, strict UTF-8, NUL-free, CR-free, and LF-terminated. Its byte count and SHA-256 are computed from the original bytes. Non-action human output is ignored for record construction, except exact keep/hold/downgrade/remove summary headers are surfaced as material findings. Any line beginning `Inst`, `Conf`, `Remv`, or `Purg` that does not match the frozen grammar fails closed.

Each successful `Inst` must have exactly one later matching `Conf` with identical package/architecture/target version. Every AG/AI/AK catalog row is schema-checked before indexing; every selected AK row must explicitly contain `package`, `version`, `architecture`, `filename`, `size`, `sha256`, `suite`, `component`, `observed_size`, and `observed_sha256`, and all AG/AK identity fields plus observed size/SHA must agree exactly. Unqualified `Remv` resolution considers only native, `all`, or `any` installed architectures, matching `FullName(true)` omission semantics. Duplicate `Inst`, duplicate `Conf`, `Conf` without `Inst`, missing `Conf`, `Conf <pkg> broken`, `Purg`, `ShortBreaks()` suffixes, architecture inconsistency, unknown metadata, ambiguous mappings, or equal-version reinstall all fail closed.

Action classification is frozen as follows:

```text
Inst without current version + no installed same package/architecture -> INSTALL
Inst without current version + any installed same package/architecture predecessor -> REJECT
Inst with current < target -> UPGRADE
Inst with current > target -> DOWNGRADE + MATERIAL_FINDING
Remv -> REMOVE + MATERIAL_FINDING
Purg -> REJECT
requested root with no action + exact canonical predecessor version -> UNCHANGED_REQUESTED_ROOT
requested root with no action + absent/older/non-exact predecessor -> REJECT
kept-back / held-change / downgrade / remove summary -> MATERIAL_FINDING
```

`AptTransactionRecord` key order is exactly:

```text
[stageId, action, package, architecture, fromVersion, toVersion,
 canonicalPackageMetadataSha256, filename, archiveBytes, archiveSha256,
 selectedSuite, selectedComponent, reasonClass]
```

Rows are sorted by `[stageId, action, package, architecture, fromVersion, toVersion]`; for sorting only, JSON `null` sorts before any string. Each row is compact UTF-8 JSON followed by one LF. `canonicalPackageMetadataSha256` is SHA-256 of the exact selected 004C1AG metadata row serialized as compact, recursively key-sorted UTF-8 JSON plus one LF. Archive identity-set serialization is a compact JSON array of unique selected `(package, version, architecture, filename, size, sha256)` records sorted in that order plus one LF.

A parser result is qualifying only when `findings` is empty. A future 004C1BD Replay B remains prohibited unless Replay A has Docker/APT/hook/inventory gates satisfied **and** this parser returns `qualifies=true`.

## 7. Synthetic fixture harness

This harness executes only the frozen Signthos-authored parser. It hashes the parser bytes before execution, executes those verified bytes directly, loads AG/AI/AK only through the frozen byte-identity gates, uses always-on explicit checks rather than Python `assert`, and verifies the exact final fixture-result byte count and SHA-256 before printing `ALL_FIXTURES=PASS`. Its canonical-data positive fixture is generated from already-bound AG/AI/AK records before any real Stage A solver execution. It deliberately prefixes the synthetic stream with a non-action line to prove human-oriented stdout does not become a transaction record.

```text
FIXTURE_HARNESS_BYTES = 13448
FIXTURE_HARNESS_SHA256 = f7cbf5c230c38f6431fdd6f3bc2d60b10858d0ddd4233637e62638e14c089c31
FIXTURE_CASE_COUNT = 42
FIXTURE_REPLAY_COUNT = 2
FIXTURE_REPLAY_RESULT_BYTE_EQUAL = true
```

```python
#!/usr/bin/env python3
import hashlib
import types
import json
from pathlib import Path

PARSER = Path('/private/tmp/signthos-004c1bc-parser.py')
PARSER_SHA256 = '87c43b8a318de2b3d353c6c79b4a06abe41670144e1ee36cf7724105ff670550'
EXPECTED_FIXTURE_RESULT_BYTES = 7165
EXPECTED_FIXTURE_RESULT_SHA256 = '51d987a189ebf27fa0d387ed0eb60eb1fdfe463ced9600dc4f6f668be377e5a0'
parser_bytes = PARSER.read_bytes()
if hashlib.sha256(parser_bytes).hexdigest() != PARSER_SHA256:
    raise RuntimeError('parser identity mismatch before execution')
p = types.ModuleType('bcparser')
p.__file__ = str(PARSER)
exec(compile(parser_bytes, str(PARSER), 'exec'), p.__dict__)
CLOSURE_PATH = Path('/private/tmp/signthos-004c1ag-final-A.9967/resolved-closure.json')
INSTALLED_PATH = Path('/private/tmp/signthos-004c1ai-A/installed-packages.json')
ARCHIVES_PATH = Path('/private/tmp/signthos-004c1ak-A/verified-archives.json')
closure = p.read_bound_json(CLOSURE_PATH, 'resolved_closure')
installed = p.read_bound_json(INSTALLED_PATH, 'installed_packages')
archives = p.read_bound_json(ARCHIVES_PATH, 'verified_archives')

def require(condition, message):
    if not condition:
        raise AssertionError(message)

def one(rows, desc):
    require(len(rows) == 1, (desc, len(rows)))
    return rows[0]

def cmeta(name, version, arch):
    return one([r for r in closure if r['package']==name and r['version']==version and r['architecture']==arch], 'meta')

def synthetic_catalog(package='fixture', current=None, target='2', arch='amd64'):
    meta={'architecture':arch,'component':'main','filename':f'pool/f/{package}_{target}_{arch}.deb','package':package,'parent':package,'reason':'Root','sha256':'a'*64,'size':123,'suite':'fixture','version':target}
    arc={'architecture':arch,'component':'main','filename':meta['filename'],'observed_sha256':'a'*64,'observed_size':123,'package':package,'sha256':'a'*64,'size':123,'suite':'fixture','version':target}
    ins=[] if current is None else [{'architecture':arch,'package':package,'status':'install ok installed','version':current}]
    return [meta],ins,[arc]

def expect_fail(name, fn, contains=None):
    try: fn()
    except p.ParseFailure as exc:
        if contains is not None:
            require(contains in str(exc), (name, str(exc)))
        return {'name':name,'outcome':'FAIL_CLOSED','errorClass':'ParseFailure','messageSha256':hashlib.sha256(str(exc).encode()).hexdigest()}
    raise AssertionError(f'{name}: expected failure')

# Exact comparator behavior inherited from canonical 004C1AG.
comparators=[
    ('tilde','1.0~rc1','1.0',-1),
    ('epoch','1:1.0','2.0',1),
    ('leading-zero','1.01','1.1',0),
    ('omitted-revision','1.0','1.0-0',0),
    ('debian-revision','1.0-1','1.0-2',-1),
]
for _,a,b,want in comparators:
    require(p.version_cmp(a,b)==want, ('comparator',a,b,want,p.version_cmp(a,b)))

# Canonical-data synthetic Stage A: action text is generated before any real APT run.
lines=[]
for root in p.STAGE_A_ROOTS:
    meta=one([r for r in closure if r['package']==root], root)
    old=[r for r in installed if r['package']==root and r.get('status')=='install ok installed']
    current=f" [{old[0]['version']}]" if old else ''
    rel=f"fixture-{meta['suite']}"
    lines.append(f"Inst {root}{current} ({meta['version']} {rel} [{meta['architecture']}])")
    lines.append(f"Conf {root} ({meta['version']} {rel} [{meta['architecture']}])")
canonical_raw=('Synthetic preface line\n'+'\n'.join(lines)+'\n').encode()
positive, positive_jsonl, positive_archives = p.parse_stage_a(canonical_raw, closure, installed, archives)
require(positive['qualifies'] is True, 'canonical positive did not qualify')
require(positive['recordCountByAction']['INSTALL']==11, 'canonical positive INSTALL count')
require(positive['recordCountByAction']['UPGRADE']==1, 'canonical positive UPGRADE count')
require(positive['recordCount']==12, 'canonical positive record count')
require(positive['selectedArchiveIdentityCount']==12, 'canonical positive archive count')

results=[{'name':'canonical-stage-a-synthetic-positive','outcome':'PASS','result':{k:positive[k] for k in positive if k!='records'}}]

# Multi-release RelStr grammar.
m,i,a=synthetic_catalog('multirel',None,'1','amd64')
r,_,_=p.parse_stage_a(b'Inst multirel (1 fixture-a, fixture-b [amd64])\nConf multirel (1 fixture-a, fixture-b [amd64])\n',m,i,a,roots=[])
require(r['qualifies'] and r['recordCountByAction']['INSTALL']==1, 'multi-release fixture')
results.append({'name':'multi-release','outcome':'PASS'})

# Foreign architecture must be explicit in FullName(true).
m,i,a=synthetic_catalog('foreign',None,'1','i386')
r,_,_=p.parse_stage_a(b'Inst foreign:i386 (1 fixture [i386])\nConf foreign:i386 (1 fixture [i386])\n',m,i,a,roots=[])
require(r['qualifies'], 'foreign architecture explicit fixture')
results.append({'name':'foreign-architecture-explicit','outcome':'PASS'})
results.append(expect_fail('foreign-architecture-omitted',lambda:p.parse_stage_a(b'Inst foreign (1 fixture [i386])\nConf foreign (1 fixture [i386])\n',m,i,a,roots=[]),'foreign architecture omitted'))

# Downgrade and removal parse to explicit material findings, not silent success.
m,i,a=synthetic_catalog('down',current='2',target='1',arch='amd64')
r,_,_=p.parse_stage_a(b'Inst down [2] (1 fixture [amd64])\nConf down (1 fixture [amd64])\n',m,i,a,roots=[])
require(not r['qualifies'] and r['recordCountByAction']['DOWNGRADE']==1 and r['findings'][0]['code']=='DOWNGRADE', 'downgrade material fixture')
results.append({'name':'downgrade-material','outcome':'MATERIAL_FINDING'})
m,i,a=synthetic_catalog('remove',current='2',target='3',arch='amd64')
r,_,_=p.parse_stage_a(b'Remv remove [2]\n',m,i,a,roots=[])
require(not r['qualifies'] and r['recordCountByAction']['REMOVE']==1, 'remove material fixture')
results.append({'name':'remove-material','outcome':'MATERIAL_FINDING'})

# Unqualified Remv follows FullName(true): native/all/any only, never a foreign peer.
m,_,a=synthetic_catalog('nativepeer',None,'3','amd64')
peer_installed=[
    {'architecture':'amd64','package':'nativepeer','status':'install ok installed','version':'2'},
    {'architecture':'i386','package':'nativepeer','status':'install ok installed','version':'2'},
]
r,_,_=p.parse_stage_a(b'Remv nativepeer [2]\n',m,peer_installed,a,roots=[])
require(not r['qualifies'] and r['recordCountByAction']['REMOVE']==1 and r['records'][0]['architecture']=='amd64', 'unqualified native removal resolution')
results.append({'name':'unqualified-removal-native-over-foreign-peer','outcome':'MATERIAL_FINDING'})
foreign_only=[{'architecture':'i386','package':'nativepeer','status':'install ok installed','version':'2'}]
results.append(expect_fail('unqualified-removal-foreign-only',lambda:p.parse_stage_a(b'Remv nativepeer [2]\n',m,foreign_only,a,roots=[]),'expected exactly one row'))

# Inst without [current] is valid only when no predecessor exists for package/architecture.
m,i,a=synthetic_catalog('hiddenpre',current='1',target='2',arch='amd64')
results.append(expect_fail('unversioned-inst-existing-predecessor',lambda:p.parse_stage_a(b'Inst hiddenpre (2 fixture [amd64])\nConf hiddenpre (2 fixture [amd64])\n',m,i,a,roots=[]),'conflicts with predecessor installed state'))

# Exact unchanged-root derivation.
m,i,a=synthetic_catalog('unchanged',current='1',target='1',arch='amd64')
r,_,_=p.parse_stage_a(b'Synthetic no-action line\n',m,i,[],roots=['unchanged'])
require(r['qualifies'] and r['recordCountByAction']['UNCHANGED_REQUESTED_ROOT']==1, 'unchanged requested root fixture')
results.append({'name':'unchanged-requested-root','outcome':'PASS'})
results.append(expect_fail('unexplained-missing-root-action',lambda:p.parse_stage_a(b'Synthetic no-action line\n',m,[],[],roots=['unchanged']),'no solver action'))

# Fail-closed syntax/sequence/mapping fixtures.
def catfoo(current=None,target='2',arch='amd64'): return synthetic_catalog('foo',current,target,arch)
m0,i0,a0=catfoo()
negative=[
 ('missing-lf',lambda:p.parse_stage_a(b'Inst foo (2 fixture [amd64])',m0,i0,a0,roots=[]),'LF-terminated'),
 ('nul',lambda:p.parse_stage_a(b'X\x00\n',m0,i0,a0,roots=[]),'NUL'),
 ('cr',lambda:p.parse_stage_a(b'X\r\n',m0,i0,a0,roots=[]),'CR is prohibited'),
 ('malformed-inst',lambda:p.parse_stage_a(b'Inst foo (2 fixture amd64)\n',m0,i0,a0,roots=[]),'malformed Inst'),
 ('broken-conf',lambda:p.parse_stage_a(b'Inst foo (2 fixture [amd64])\nConf foo broken\n',m0,i0,a0,roots=[]),'broken Conf'),
 ('short-break-suffix',lambda:p.parse_stage_a(b'Inst foo (2 fixture [amd64]) [broken:amd64 ]\nConf foo (2 fixture [amd64])\n',m0,i0,a0,roots=[]),'malformed Inst'),
 ('duplicate-inst',lambda:p.parse_stage_a(b'Inst foo (2 fixture [amd64])\nInst foo (2 fixture [amd64])\nConf foo (2 fixture [amd64])\n',m0,i0,a0,roots=[]),'duplicate Inst'),
 ('missing-conf',lambda:p.parse_stage_a(b'Inst foo (2 fixture [amd64])\n',m0,i0,a0,roots=[]),'missing Conf'),
 ('conf-without-inst',lambda:p.parse_stage_a(b'Conf foo (2 fixture [amd64])\n',m0,i0,a0,roots=[]),'without matching Inst'),
 ('arch-mismatch',lambda:p.parse_stage_a(b'Inst foo:i386 (2 fixture [amd64])\nConf foo:i386 (2 fixture [amd64])\n',m0,i0,a0,roots=[]),'architecture mismatch'),
 ('unknown-metadata',lambda:p.parse_stage_a(b'Inst unknown (9 fixture [amd64])\nConf unknown (9 fixture [amd64])\n',m0,i0,a0,roots=[]),'canonical metadata mapping'),
 ('purg',lambda:p.parse_stage_a(b'Purg foo [1]\n',m0,[{'architecture':'amd64','package':'foo','status':'install ok installed','version':'1'}],a0,roots=[]),'Purg is nonqualifying'),
]
for name,fn,msg in negative: results.append(expect_fail(name,fn,msg))

# Canonical input bindings and cross-catalog archive identity are fail closed.
for bind_name, bind_path in (("resolved_closure", CLOSURE_PATH), ("installed_packages", INSTALLED_PATH), ("verified_archives", ARCHIVES_PATH)):
    loaded=p.read_bound_json(bind_path, bind_name)
    require(isinstance(loaded,list) and len(loaded)==p.BOUND_INPUTS[bind_name]["count"], ('bound input',bind_name))
results.append({'name':'canonical-input-binding-positive','outcome':'PASS'})
bad_input=Path('/private/tmp/signthos-004c1bc-bad-input.json')
bad_input.write_bytes(CLOSURE_PATH.read_bytes()[:-1] + b' ')
results.append(expect_fail('canonical-input-binding-mismatch',lambda:p.read_bound_json(bad_input,'resolved_closure'),'canonical input identity mismatch'))
m,i,a=catfoo(); bad_arc=[dict(a[0], filename='pool/f/DIFFERENT.deb')]
results.append(expect_fail('ag-ak-archive-identity-mismatch',lambda:p.parse_stage_a(b'Inst foo (2 fixture [amd64])\nConf foo (2 fixture [amd64])\n',m,i,bad_arc,roots=[]),'AG/AK archive identity mismatch'))
required_archive_fields=('package','version','architecture','filename','size','sha256','suite','component','observed_size','observed_sha256')
for missing_field in required_archive_fields:
    m,i,a=catfoo()
    broken=dict(a[0]); broken.pop(missing_field)
    results.append(expect_fail(
        f'ak-missing-{missing_field.replace("_","-")}',
        lambda broken=broken:p.parse_stage_a(b'Inst foo (2 fixture [amd64])\nConf foo (2 fixture [amd64])\n',m,i,[broken],roots=[]),
        'missing required fields',
    ))
results.append(expect_fail('non-utf8',lambda:p.parse_stage_a(b'X\xff\n',m0,i0,a0,roots=[]),'strict UTF-8'))

# Equal-version reinstall is noncanonical.
m,i,a=catfoo(current='2',target='2')
results.append(expect_fail('equal-version-inst',lambda:p.parse_stage_a(b'Inst foo [2] (2 fixture [amd64])\nConf foo (2 fixture [amd64])\n',m,i,a,roots=[]),'equal-version'))

# Human-oriented keep/hold summaries are explicit material findings.
for marker,code in p.FORBIDDEN_SUMMARY_MARKERS.items():
    r,_,_=p.parse_stage_a((marker+'\n').encode(),[],[],[],roots=[])
    require(not r['qualifies'] and r['findings']==[{'code':code,'line':1}], ('summary finding',code))
    results.append({'name':code.lower(),'outcome':'MATERIAL_FINDING'})

manifest={
 'schema':'signthos.004c1bc.fixture-results.v1',
 'parserSha256':PARSER_SHA256,
 'canonicalPositiveRawBytes':len(canonical_raw),
 'canonicalPositiveRawSha256':hashlib.sha256(canonical_raw).hexdigest(),
 'canonicalPositiveTransactionJsonlBytes':len(positive_jsonl),
 'canonicalPositiveTransactionJsonlSha256':hashlib.sha256(positive_jsonl).hexdigest(),
 'canonicalPositiveArchiveIdentityBytes':len(positive_archives),
 'canonicalPositiveArchiveIdentitySha256':hashlib.sha256(positive_archives).hexdigest(),
 'comparatorCases':[{'name':n,'a':a,'b':b,'result':want} for n,a,b,want in comparators],
 'results':results,
}
out=(json.dumps(manifest,ensure_ascii=False,separators=(',',':'),sort_keys=True)+'\n').encode()
result_sha256=hashlib.sha256(out).hexdigest()
if len(out) != EXPECTED_FIXTURE_RESULT_BYTES or result_sha256 != EXPECTED_FIXTURE_RESULT_SHA256:
    raise AssertionError(('fixture result identity mismatch', len(out), result_sha256))
Path('/private/tmp/signthos-004c1bc-fixture-results.json').write_bytes(out)
print('FIXTURE_CASE_COUNT',len(results))
print('CANONICAL_POSITIVE_RAW_BYTES',len(canonical_raw))
print('CANONICAL_POSITIVE_RAW_SHA256',hashlib.sha256(canonical_raw).hexdigest())
print('CANONICAL_POSITIVE_RECORDS',positive['recordCount'],positive['recordCountByAction'])
print('CANONICAL_POSITIVE_TRANSACTION_JSONL_BYTES',len(positive_jsonl))
print('CANONICAL_POSITIVE_TRANSACTION_JSONL_SHA256',hashlib.sha256(positive_jsonl).hexdigest())
print('FIXTURE_RESULTS_BYTES',len(out))
print('FIXTURE_RESULTS_SHA256',hashlib.sha256(out).hexdigest())
print('ALL_FIXTURES=PASS')
```

The 42 cases cover canonical-data new installs and upgrade, multi-release `RelStr`, explicit and omitted foreign architecture, downgrade, removal, native-vs-foreign unqualified removal resolution, foreign-only unqualified removal rejection, unversioned-install predecessor rejection, exact unchanged root, unexplained missing root action, LF/NUL/CR/UTF-8 failures, malformed action syntax, broken configuration, `ShortBreaks`, duplicate/missing actions, architecture mismatch, unknown metadata, purge, equal-version reinstall, canonical input binding, AG/AK archive-identity disagreement, every required AK archive field missing one-at-a-time, and kept/held/downgrade/remove summary findings.

## 8. Deterministic fixture result

Both fresh fixture executions emitted this exact canonical result manifest byte-for-byte. The embedded JSON below is serialized compactly with recursively sorted keys and one trailing LF.

```text
FIXTURE_RESULT_BYTES = 7165
FIXTURE_RESULT_SHA256 = 51d987a189ebf27fa0d387ed0eb60eb1fdfe463ced9600dc4f6f668be377e5a0
```

```json
{"canonicalPositiveArchiveIdentityBytes":2755,"canonicalPositiveArchiveIdentitySha256":"a696e0035f5a14970b3c47caa74874577380eb4786d3c8b126b3158818183df8","canonicalPositiveRawBytes":1348,"canonicalPositiveRawSha256":"29fe6a40ed8aaf652a21b6cd536fff6f2fc80c0783f911a45ff10faa7148b2dd","canonicalPositiveTransactionJsonlBytes":5778,"canonicalPositiveTransactionJsonlSha256":"5ab6b85df88dc27a6be9aeb6dcddf918099969124a8b98592ccd5d37eeb42adf","comparatorCases":[{"a":"1.0~rc1","b":"1.0","name":"tilde","result":-1},{"a":"1:1.0","b":"2.0","name":"epoch","result":1},{"a":"1.01","b":"1.1","name":"leading-zero","result":0},{"a":"1.0","b":"1.0-0","name":"omitted-revision","result":0},{"a":"1.0-1","b":"1.0-2","name":"debian-revision","result":-1}],"parserSha256":"87c43b8a318de2b3d353c6c79b4a06abe41670144e1ee36cf7724105ff670550","results":[{"name":"canonical-stage-a-synthetic-positive","outcome":"PASS","result":{"canonicalTransactionJsonlBytes":5778,"canonicalTransactionJsonlSha256":"5ab6b85df88dc27a6be9aeb6dcddf918099969124a8b98592ccd5d37eeb42adf","findings":[],"qualifies":true,"rawStdoutBytes":1348,"rawStdoutSha256":"29fe6a40ed8aaf652a21b6cd536fff6f2fc80c0783f911a45ff10faa7148b2dd","recordCount":12,"recordCountByAction":{"DOWNGRADE":0,"INSTALL":11,"KEEP_BACK":0,"REMOVE":0,"UNCHANGED_REQUESTED_ROOT":0,"UPGRADE":1},"schema":"signthos.004c1bc.stage-a-apt-parser-result.v1","selectedArchiveIdentityCount":12,"selectedArchiveIdentitySetSha256":"a696e0035f5a14970b3c47caa74874577380eb4786d3c8b126b3158818183df8"}},{"name":"multi-release","outcome":"PASS"},{"name":"foreign-architecture-explicit","outcome":"PASS"},{"errorClass":"ParseFailure","messageSha256":"cb7ae5b84b077421bc53ed10b47239d9cee4bbd6ab27ee0540aa663b0eb715ea","name":"foreign-architecture-omitted","outcome":"FAIL_CLOSED"},{"name":"downgrade-material","outcome":"MATERIAL_FINDING"},{"name":"remove-material","outcome":"MATERIAL_FINDING"},{"name":"unqualified-removal-native-over-foreign-peer","outcome":"MATERIAL_FINDING"},{"errorClass":"ParseFailure","messageSha256":"92fe4c928957f9b7fb92f739326f8f20dd3f4efc8fbcdf28bd7c0175434d5751","name":"unqualified-removal-foreign-only","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"31aa4e6637eef1782a0023c80324c0353ca6cbcd69d78b5beecc3bedf032aaa1","name":"unversioned-inst-existing-predecessor","outcome":"FAIL_CLOSED"},{"name":"unchanged-requested-root","outcome":"PASS"},{"errorClass":"ParseFailure","messageSha256":"22615184c80fba9727746d1e023e2ffba0c14b2057088412897d15c931f44e93","name":"unexplained-missing-root-action","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"e1f50e3162f948ea0109c08d9cd31850175431996f04a5dfbccea4f73ad23786","name":"missing-lf","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"79a75767ae0c1bcae21c1054c924c374037e67604c436ac56f59117a32d93eb9","name":"nul","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"4d830ffc5b76e2ecd9b3dbd37f03c911e3f09408520b98fc99f2eb22019d4fb5","name":"cr","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"e87f452a21b14222fba249c667ddbd4e2ab1bb800a2c83afc4e48a58cd7b50db","name":"malformed-inst","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"45e85307dfc355ef49df17987f67185abe15553aca85b8da92fa2d81d1b359db","name":"broken-conf","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"4a0e457bc08318e59c1e4aee11ae482052f4f4c128c5e37991ccbe1d631c0d8b","name":"short-break-suffix","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"85827b925122a6ad882a337266a394189024b3d16c27a70d7e130aff007091f0","name":"duplicate-inst","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"bcc34d2684eedf130d5ac21fc8c5d0879498fa6b7ef2759dce8518bb1b683272","name":"missing-conf","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"d7d43923e83d66958b7644f3ef913cddcb470b48bd79a17c0933fe4c3fad6c95","name":"conf-without-inst","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"4af512db6f29c09efc9fef2eb3f7d351689b46d2797f01ccdc58dc21ca3d6bac","name":"arch-mismatch","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"62aa1b025b0a47f3ff80e68ce587048ed934f69811c339c33e445a7272f7ad9b","name":"unknown-metadata","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"ba95bfbd8a7c6e6a85319681f2a33e60ba7bc6337fca489c875a8e41da5a9b80","name":"purg","outcome":"FAIL_CLOSED"},{"name":"canonical-input-binding-positive","outcome":"PASS"},{"errorClass":"ParseFailure","messageSha256":"fa5b8b8f3eb7086daa70b0307c77f4d25fbfbee6c81da093e0f0266e7192537e","name":"canonical-input-binding-mismatch","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"875d4975f4e45e85d12d012715babc52063ffa4c98570692f8058f0717cddd6d","name":"ag-ak-archive-identity-mismatch","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"f8144d7a3234e83ddd18e6c16f28f0b713b58cde46edb3f0f3f9bc213e273942","name":"ak-missing-package","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"76c965ca819f5b5192c18a7f47c274934e5e82b96b7ee8ee809a6623bb4dee55","name":"ak-missing-version","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"9333c09a6aa042e54faee71d784c2dbb80b0889b14c78b223e56794977405e2f","name":"ak-missing-architecture","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"724ccfc8a47bc074180fb6f7b2afe2af4d98383e1bbafa00abd13bbd928d998a","name":"ak-missing-filename","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"d11782ea49cb49fdc0c9ca2ad167af117f5b5232b7a67a0bf2c881c5fba18cbc","name":"ak-missing-size","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"9cd0413d0846299f7bab8952ffc572d06e636b5058ab391ad6e5a2399c658097","name":"ak-missing-sha256","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"d90b563e9c4982df30edd53933112365abe994e3e8f9721f2caf5092a8d6d973","name":"ak-missing-suite","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"5313beb1cfa50953e104e8ee9133980ba30622f53a12faf3793e4e4a6d5fc7df","name":"ak-missing-component","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"56ad57677215fd3b857898b17ab85c28aef55a365343a9d0f7db274b21ac0f19","name":"ak-missing-observed-size","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"2d1a0e8d0e48fa536fe2b2889cb2a9bdef5372ed1a4f3f1834b2f0b9f5ca0d8e","name":"ak-missing-observed-sha256","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"0500838adc27572d2bb3f2d325eb06263a1672ecbeae4be1a158aab306f5d7e7","name":"non-utf8","outcome":"FAIL_CLOSED"},{"errorClass":"ParseFailure","messageSha256":"07fad149c8e6148e9ec62fa58bc21de19416d943337290684d9909825c8f4e50","name":"equal-version-inst","outcome":"FAIL_CLOSED"},{"name":"kept_back_summary","outcome":"MATERIAL_FINDING"},{"name":"held_change_summary","outcome":"MATERIAL_FINDING"},{"name":"downgrade_summary","outcome":"MATERIAL_FINDING"},{"name":"remove_summary","outcome":"MATERIAL_FINDING"}],"schema":"signthos.004c1bc.fixture-results.v1"}
```

The canonical-data synthetic Stage A fixture itself is 1,348 bytes with SHA-256 `29fe6a40ed8aaf652a21b6cd536fff6f2fc80c0783f911a45ff10faa7148b2dd`. It produces 12 records: 11 `INSTALL`, 1 `UPGRADE`, and zero downgrade/remove/keep-back/unchanged records. Its canonical transaction JSONL is 5,778 bytes with SHA-256 `5ab6b85df88dc27a6be9aeb6dcddf918099969124a8b98592ccd5d37eeb42adf`. These are synthetic expected-method outputs, not observed APT results and not evidence that Stage A has run or will produce that transaction.

## 9. Frozen 004C1BC contract

The contract below is compact recursively key-sorted UTF-8 JSON plus one trailing LF.

```text
004C1BC_CONTRACT_JSON_BYTES = 2485
004C1BC_CONTRACT_JSON_SHA256 = f3c1240e6eefa70abbf8f6804c575d847a97cb10e1860505878ed3f5eca87f64
```

```json
{"aptSource":{"algorithmsCcSha256":"6dd7c7a4bfdb03f269e895f6290e456ed4963bdf91707715d0c54609da97ec1e","commit":"581ec5c0aa2c6665d72465040f1465eb93503200","pkgcacheCcSha256":"e3cd572c385560820ba7d38f259173fa152374133281c18d0450697ee9c162bf","privateInstallCcSha256":"70731f4b87a6211600b9573995e41e6b200010d3cd0508f73a0061c45a32fc90","privateOutputCcSha256":"080cfbc2fb7c84526a796ae0c53bb10e4c9ad95844c29800a4a679143c9498f3","privateOutputHSha256":"3bf50d9d2abece6eaf063c10b2277002a8f39d4e65e853a1c5347b199aad0399","tree":"e9afcae41f88040e93eb7a10a89e72c00b59e245"},"authority":"github:issue-comment:5611324884","canonicalBase":"9c99b2983cf2c022a5efcd469050964bd9f0f0da","canonicalInputs":{"installedPackages":{"bytes":25060,"records":231,"sha256":"bdc5c6bbbe47db0313b2281b67e2f152ad75e93ab169bbfccf0b5441444694ba"},"resolvedClosure":{"bytes":293999,"records":910,"sha256":"bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970"},"verifiedArchives":{"bytes":439991,"records":826,"sha256":"38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98"}},"comparator":{"astEqual":true,"fragmentBytes":1525,"fragmentSha256":"bdfbdd13f20909879bc2ffa27f78d7584cbb16ebe17250fb50aff11ac91644c3","resolverSha256":"8c0150e2054091eba165f56a0576fac62b213a618ff2f0b6f885faa59bd581c2"},"comparatorProvenance":"github:issue-comment:5611410202","execution":{"aptConfig":false,"aptGet":false,"docker":false,"dpkg":false,"packageAction":false,"stageA":false},"fixtureHarness":{"assertStatements":0,"bytes":13448,"canonicalInputsBoundBeforeUse":true,"caseCount":42,"parserIdentityBeforeExecution":true,"replayCount":2,"replayResultEqual":true,"resultIdentityBeforePass":true,"sha256":"f7cbf5c230c38f6431fdd6f3bc2d60b10858d0ddd4233637e62638e14c089c31"},"fixtureResult":{"bytes":7165,"sha256":"51d987a189ebf27fa0d387ed0eb60eb1fdfe463ced9600dc4f6f668be377e5a0"},"nextExecution":"SEPARATE_POST_MERGE_SUCCESSOR_ONLY","parser":{"archiveRequiredFields":["package","version","architecture","filename","size","sha256","suite","component","observed_size","observed_sha256"],"bytes":18866,"sha256":"87c43b8a318de2b3d353c6c79b4a06abe41670144e1ee36cf7724105ff670550","unqualifiedRemovalArchitectures":["amd64","all","any"],"unversionedInstallPredecessorPolicy":"REJECT_ANY_SAME_PACKAGE_ARCH"},"schema":"signthos.004c1bc.stage-a-apt-simulator-parser.v1","stageA":{"argvSha256":"dceeccc5096bbc9eb0c661b93be5a5091f459a2ffaeed808b4bebb212ebff96b","recommendsPolicy":"NO_INSTALL_RECOMMENDS","rootCount":12}}
```

## 10. Fail-closed result and successor boundary

```text
004C1BC_RESULT = QUALIFIED_CANDIDATE_STATIC_PARSER_METHOD
OBSERVED_STAGE_A_TRANSACTION = NOT_ESTABLISHED
DOCKER_EXECUTION = NOT_AUTHORIZED_BY_004C1BC / NOT_PERFORMED
APT_CONFIG_EXECUTION = NOT_AUTHORIZED_BY_004C1BC / NOT_PERFORMED
APT_GET_EXECUTION = NOT_AUTHORIZED_BY_004C1BC / NOT_PERFORMED
DPKG_EXECUTION = NOT_AUTHORIZED_BY_004C1BC / NOT_PERFORMED
PACKAGE_ACTION = NOT_AUTHORIZED_BY_004C1BC / NOT_PERFORMED
STAGE_A_REPLAY_A = NOT_AUTHORIZED_BY_004C1BC / NOT_PERFORMED
STAGE_A_REPLAY_B = NOT_AUTHORIZED_BY_004C1BC / NOT_PERFORMED
STAGE_B = NOT_AUTHORIZED
STAGE_C = NOT_AUTHORIZED
PDFIUM_BUILD = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

This candidate may become canonical only after exact-head provider/check accounting, fresh independent substantive review, forward-only repair of every material finding, zero unresolved material review threads, immediate premerge race proof, guarded merge using exact `expected_head_sha`, mechanical post-merge verification, and fresh Issue #7 reconciliation. Only that later reconciliation may authorize 004C1BD Stage A Replay A; Replay B must remain conditional on a qualifying Replay A.
