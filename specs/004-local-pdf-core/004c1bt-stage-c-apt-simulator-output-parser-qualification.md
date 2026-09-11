# 004C1BT — Stage C APT simulator output parser qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_DETERMINISTIC_STAGE_C_PARSER_DERIVATION_AND_FIXTURE_QUALIFICATION_ONLY / ZERO_RUNTIME_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `9604c959f23d8ff89b9d5b6885a6748633fe96c2`
Canonical base tree: `f36219f15be855c7cab740abcbd6f83eb125e278`
Authority source: `github:issue-comment:5627104217`

## 1. Authority boundary

004C1BT derives and qualifies a Stage-C-specific parser from the already-canonical repaired Stage B grammar. It performs no Docker image pull, Docker/container execution, APT, apt-config, dpkg, package operation, Stage C Replay A/B, virtual-state derivation, PDFium/provider execution, 004C2, 004D, or Specification 005 work.

```text
004C1BT_AUTHORITY = STATIC_DETERMINISTIC_STAGE_C_PARSER_DERIVATION_AND_FIXTURE_QUALIFICATION_ONLY
004C1BT_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1bt-stage-c-apt-simulator-output-parser-qualification.md
004C1BT_MAX_CHANGED_REPOSITORY_FILES = 1
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

- `004C1AG`: `19265` bytes / `337` LF lines / SHA-256 `3dc7adc22ac613be2cf7d093aebcaa414afeaadf88aa0aa91b4be07cba589877`.
- `004C1AK`: `8726` bytes / `188` LF lines / SHA-256 `c78818f6744c2d173e048436103b518be362f18b0589ef01aec25ef07a5033d8`.
- `004C1AL`: `21275` bytes / `452` LF lines / SHA-256 `099260342a77d2fc93404d3cc5babede5eddb9411d0a0a4c4f3d2ec7c101fe2f`.
- `004C1AQ`: `33338` bytes / `650` LF lines / SHA-256 `bf46f47ac6470ab342c89186f8db25feaa1b1355cb1e18961547d608a50a7d33`.
- `004C1BM`: `42898` bytes / `931` LF lines / SHA-256 `9c900b0005c11a866024eead485fc4f13263016527fadcfd77008cd17c68fd35`.
- `004C1BN`: `38039` bytes / `450` LF lines / SHA-256 `5f35ec6fdc5db674ed7c56cb835c9f7c726be6b0f478ecfd75e73c4739995587`.
- `004C1BR`: `414390` bytes / `5451` LF lines / SHA-256 `a0f861d828282771809700645b694ba290a6d6bd1d56918cf496b1025a95cbed`.
- `004C1BS`: `66559` bytes / `696` LF lines / SHA-256 `a4ec3394391a75814efa2df9b1b0aeb4a8e8d41214cd64dfe97d871eb504bfbc`.

The repaired parser semantic source is the canonical 004C1BN Stage B parser after the source-proven `ShortBreaks()` trailer repair:

```text
REPAIRED_STAGE_B_PARSER_BYTES = 21835
REPAIRED_STAGE_B_PARSER_SHA256 = 8b5b6ac91bcc5de7c809bce9029b33cc02ab584eab87168c0ef46098945db584
```

## 3. Global metadata/archive universe determination

No new Stage-C-only closure or archive projection is introduced. Canonical 004C1AG explicitly combines the Chromium root set with release-reachable explicit APT package names from the exact EmbedPDF Dockerfile while preserving stage provenance. Its 910-record resolved closure therefore spans the staged package metadata universe rather than Stage B alone. It explicitly retains the cross-stage `pkgconf` / `pkg-config` relation and states that these archive metadata identities are needed by the staged package transactions.

Canonical 004C1AK verifies the complete 826-record immutable archive-acquisition candidate universe derived from that canonical closure/base-image delta. The parser uses the closure and archive inventories only as exact `(package, version, architecture)` lookup universes and validates every selected archive back to its canonical metadata row. It does not assume that the whole union is simultaneously installed.

The exact reusable global inputs are:

```text
RESOLVED_CLOSURE_BYTES = 293999
RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
RESOLVED_CLOSURE_RECORDS = 910
VERIFIED_ARCHIVES_BYTES = 439991
VERIFIED_ARCHIVES_SHA256 = 38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98
VERIFIED_ARCHIVES_RECORDS = 826
GLOBAL_LOOKUP_UNIVERSES_REUSED_FOR_STAGE_C = true
STAGE_C_SPECIFIC_METADATA_PROJECTION_REQUIRED = false
```

Static lookup checks against those exact bytes establish the Stage C root state before any runtime:

```text
curl = UNCHANGED_EXACT
build-essential = UNCHANGED_EXACT
pkg-config = ABSENT_REQUIRES_SOLVER_ACTION
rsync = ABSENT_REQUIRES_SOLVER_ACTION
pkg-config_target_archive = VERIFIED_PRESENT
rsync_target_archive = VERIFIED_PRESENT
```

## 4. Stage C specialization contract

The transformation changes only stage specialization. Grammar, Debian version comparison, metadata/archive validation, action/finding semantics, canonical serialization, and input-identity enforcement remain inherited from the repaired parser.

```text
STAGE_ID = STAGE_C
STAGE_C_ROOTS = [curl, build-essential, pkg-config, rsync]
STAGE_C_ROOT_COUNT = 4
STAGE_C_VIRTUAL_ROOT_PROVIDER_MAP = {{}}
STAGE_C_RECOMMENDS_POLICY = NO_INSTALL_RECOMMENDS
NATIVE_ARCH = amd64
PREDECESSOR_INSTALLED_PACKAGES_BYTES = 98938
PREDECESSOR_INSTALLED_PACKAGES_SHA256 = 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea
PREDECESSOR_INSTALLED_PACKAGE_COUNT = 904
PARSER_RESULT_SCHEMA = signthos.004c1bt.stage-c-apt-parser-result.v1
```

The Stage B-only `git-core -> git` virtual-root mapping is removed because all four Stage C roots are exact real package names in the canonical closure. No provider alias is needed or permitted for Stage C root accounting.

## 5. Candidate parser identity and invariants

```text
004C1BT_STAGE_C_PARSER_BYTES = 19203
004C1BT_STAGE_C_PARSER_SHA256 = 9111e814a779576a5a522c3cbc2d868228e66d00e00cf7dd36e53e757f5708af
```

The candidate preserves:

- strict UTF-8/LF/no-NUL raw-stdout requirements;
- exact `Inst`, `Conf`, `Remv`, and fail-closed `Purg` grammar;
- the 004C1BN source-proven optional `ShortBreaks()` trailer grammar only;
- exact architecture handling and Debian version ordering;
- unique canonical metadata mapping and exact verified archive mapping;
- explicit `DOWNGRADE`, `REMOVE`, `KEEP_BACK`, held-change, and related findings;
- complete explicit-root accounting, including `UNCHANGED_REQUESTED_ROOT` only when the exact canonical root version is already present in the predecessor;
- stable record ordering, JSONL serialization, selected-archive serialization, and raw-stdout identity reporting;
- exact canonical-input byte/hash/count validation before parsing through the CLI path.

## 6. Host-only qualification result

The exact candidate parser was qualified using the exact global closure, exact verified archive universe, and exact 004C1BR installed-state predecessor. No Stage C runtime output exists or was used. The positive stdout records are synthetic parser fixtures only.

The positive canonical-root fixture models the known static pre-state: `pkg-config` and `rsync` receive `INSTALL`/`Conf` actions, while `curl` and `build-essential` are accounted as exact unchanged requested roots.

```text
POSITIVE_ACTION_INSTALL = 2
POSITIVE_ACTION_UPGRADE = 0
POSITIVE_ACTION_DOWNGRADE = 0
POSITIVE_ACTION_REMOVE = 0
POSITIVE_ACTION_KEEP_BACK = 0
POSITIVE_ACTION_UNCHANGED_REQUESTED_ROOT = 2
POSITIVE_RECORD_COUNT = 4
POSITIVE_SELECTED_ARCHIVE_COUNT = 2
POSITIVE_TRANSACTION_JSONL_BYTES = 1775
POSITIVE_TRANSACTION_JSONL_SHA256 = e25587ebb50c380490c695421cec9d841ee1860f3ff85dd66dee314e1045deb9
POSITIVE_ARCHIVE_SET_BYTES = 478
POSITIVE_ARCHIVE_SET_SHA256 = 223b7421ddd372e0660562922ad99a3ff42af73188082efeb7d17d00054233f4
```

The same semantic fixture with valid source-proven `ShortBreaks()` trailers produces byte-identical canonical transaction JSONL and selected archive bytes. Negative fixtures prove that a different `[X on Y]` diagnostic shape is rejected, missing `Conf` is rejected, missing actions for absent explicit roots fail root accounting, and tampering any of the three canonical input files fails before parse. `REMOVE`, kept-back summary, and `DOWNGRADE` remain explicit nonqualifying findings.

Cross-device host-only execution used byte-identical parser, transformer, qualification harness, and canonical input evidence on macOS and Windows. Both emitted the exact same qualification result object.

```text
MACOS_STATIC_QUALIFICATION = PASS
WINDOWS_STATIC_QUALIFICATION = PASS
CROSS_DEVICE_RESULT_EQUAL = true
STAGE_C_RUNTIME_STDOUT_USED = false
```

Exact qualification result:

```json
{"absentRootAccountingRejection":"PASS","canonicalInputTamperRejection":"PASS","canonicalStageCRootState":{"build-essential":"UNCHANGED_EXACT","curl":"UNCHANGED_EXACT","pkg-config":"ABSENT_REQUIRES_ACTION","rsync":"ABSENT_REQUIRES_ACTION"},"downgradeFinding":"PASS","keepBackFinding":"PASS","missingConfRejection":"PASS","nonShortBreaksRejection":"PASS","parserBytes":19203,"parserSha256":"9111e814a779576a5a522c3cbc2d868228e66d00e00cf7dd36e53e757f5708af","plainTrailerCanonicalTransactionIdentity":"PASS","positiveActionCounts":{"DOWNGRADE":0,"INSTALL":2,"KEEP_BACK":0,"REMOVE":0,"UNCHANGED_REQUESTED_ROOT":2,"UPGRADE":0},"positiveArchiveSetBytes":478,"positiveArchiveSetSha256":"223b7421ddd372e0660562922ad99a3ff42af73188082efeb7d17d00054233f4","positivePlainRawBytes":266,"positivePlainRawSha256":"f8df57f37611d9d7cad6af1c648edffd5f795b02e5d79b2831486583c36025ef","positiveTrailerRawBytes":306,"positiveTrailerRawSha256":"0310a8ed151b67fd5101580e02856c2fba767a0e051395fd9a3e6bcfffa8373b","positiveTransactionJsonlBytes":1775,"positiveTransactionJsonlSha256":"e25587ebb50c380490c695421cec9d841ee1860f3ff85dd66dee314e1045deb9","predecessorBytes":98938,"predecessorCount":904,"predecessorSha256":"42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea","removeFinding":"PASS","repeatDeterminism":"PASS","resolvedClosureBytes":293999,"resolvedClosureCount":910,"resolvedClosureSha256":"bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970","schema":"signthos.004c1bt.static-stage-c-parser-qualification.v1","shortBreaksGrammar":"PASS","stageCRootCount":4,"stageCRoots":["curl","build-essential","pkg-config","rsync"],"stageId":"STAGE_C","verifiedArchivesBytes":439991,"verifiedArchivesCount":826,"verifiedArchivesSha256":"38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98","virtualRootProviderMap":{}}
```

## 7. Deterministic transformer

The following Signthos-authored transformer takes only the exact repaired Stage B parser identity and applies the bounded Stage C specialization described above.

```text
TRANSFORMER_BYTES = 2081
TRANSFORMER_SHA256 = 173d418f1d85b5e82f21d133bd4610573d378e77eb24e1c6806de74ad7bca402
```

````python
#!/usr/bin/env python3
import hashlib, pathlib
P=pathlib.Path(__file__).parent
SOURCE=P/'stage-b-repaired-parser.py'
OUTPUT=P/'004c1bt-stage-c-parser.py'
SOURCE_ID=(21835,'8b5b6ac91bcc5de7c809bce9029b33cc02ab584eab87168c0ef46098945db584')
STAGE_C_ROOTS=['curl','build-essential','pkg-config','rsync']
STAGE_C_INSTALLED='"installed_packages": {"bytes": 98938, "sha256": "42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea", "count": 904}'
sha=lambda b:hashlib.sha256(b).hexdigest()
raw=SOURCE.read_bytes()
if (len(raw),sha(raw))!=SOURCE_ID: raise RuntimeError('repaired parser source identity mismatch')
s=raw.decode('utf-8')
start=s.index('STAGE_B_ROOTS = [')
end=s.index('ACTIONS = [',start)
old=s[start:end]
new='STAGE_C_ROOTS = [\n'+''.join(f'    {r!r},\n' for r in STAGE_C_ROOTS)+']\nSTAGE_C_VIRTUAL_ROOT_PROVIDER_MAP = {}\n'
if s.count(old)!=1: raise RuntimeError('stage root block mismatch')
s=s.replace(old,new,1)
repls=[
('STAGE_ID = "STAGE_B"','STAGE_ID = "STAGE_C"',1),
('"installed_packages": {"bytes": 27625, "sha256": "14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7", "count": 255}',STAGE_C_INSTALLED,1),
('parse_stage_b','parse_stage_c',2),
('STAGE_B_ROOTS','STAGE_C_ROOTS',1),
('STAGE_B_VIRTUAL_ROOT_PROVIDER_MAP','STAGE_C_VIRTUAL_ROOT_PROVIDER_MAP',1),
('signthos.004c1bm.stage-b-apt-parser-result.v1','signthos.004c1bt.stage-c-apt-parser-result.v1',1),
]
for old,new,count in repls:
    if s.count(old)!=count: raise RuntimeError(f'replacement count mismatch for {old!r}: {s.count(old)} != {count}')
    s=s.replace(old,new)
for forbidden in ['STAGE_B_ROOTS','STAGE_B_VIRTUAL_ROOT_PROVIDER_MAP','parse_stage_b','signthos.004c1bm.stage-b-apt-parser-result.v1','STAGE_ID = "STAGE_B"']:
    if forbidden in s: raise RuntimeError(f'stage-b specialization remains: {forbidden}')
out=s.encode('utf-8')
OUTPUT.write_bytes(out)
print(f'PARSER_BYTES={len(out)}')
print(f'PARSER_SHA256={sha(out)}')
print(f'TRANSFORMER_BYTES={len(pathlib.Path(__file__).read_bytes())}')
print(f'TRANSFORMER_SHA256={sha(pathlib.Path(__file__).read_bytes())}')
````

## 8. Exact Stage C parser source

````python
#!/usr/bin/env python3
import argparse
import hashlib
import json
import re
from pathlib import Path

STAGE_ID = "STAGE_C"
NATIVE_ARCH = "amd64"
STAGE_C_ROOTS = [
    'curl',
    'build-essential',
    'pkg-config',
    'rsync',
]
STAGE_C_VIRTUAL_ROOT_PROVIDER_MAP = {}
ACTIONS = ["INSTALL", "UPGRADE", "DOWNGRADE", "REMOVE", "KEEP_BACK", "UNCHANGED_REQUESTED_ROOT"]
RECORD_KEYS = [
    "stageId", "action", "package", "architecture", "fromVersion", "toVersion",
    "canonicalPackageMetadataSha256", "filename", "archiveBytes", "archiveSha256",
    "selectedSuite", "selectedComponent", "reasonClass",
]
PKG_RE = r"[A-Za-z0-9][A-Za-z0-9+.-]*"
ARCH_RE = r"[A-Za-z0-9][A-Za-z0-9-]*"
FULL_RE = rf"(?P<full>{PKG_RE}(?::{ARCH_RE})?)"
TRAILER_FULL_RE = rf"{PKG_RE}(?::{ARCH_RE})?"
SHORT_BREAKS_TRAILER_RE = rf"\[(?:{TRAILER_FULL_RE} )*\]"
INST_RE = re.compile(
    rf"^Inst {FULL_RE}(?: \[(?P<from>[^\[\]\s]+)\])? "
    rf"\((?P<to>[^\s()\[\]]+) (?P<rel>[^\[\]\r\n]*) \[(?P<arch>{ARCH_RE})\]\)(?: {SHORT_BREAKS_TRAILER_RE})?$"
)
CONF_RE = re.compile(
    rf"^Conf {FULL_RE} \((?P<to>[^\s()\[\]]+) (?P<rel>[^\[\]\r\n]*) "
    rf"\[(?P<arch>{ARCH_RE})\]\)(?: {SHORT_BREAKS_TRAILER_RE})?$"
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
    "installed_packages": {"bytes": 98938, "sha256": "42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea", "count": 904},
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

def parse_stage_c(raw, closure, installed, archives, *, roots=STAGE_C_ROOTS, native_arch=NATIVE_ARCH):
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
        resolved_package = STAGE_C_VIRTUAL_ROOT_PROVIDER_MAP.get(root, root)
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
        "schema": "signthos.004c1bt.stage-c-apt-parser-result.v1",
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
    result, _, _ = parse_stage_c(raw, closure, installed, archives)
    print(json.dumps(result, ensure_ascii=False, separators=(",", ":"), sort_keys=True))

if __name__ == "__main__":
    main()
````

## 9. Static qualification harness

The following host-only harness contains no Docker/APT/dpkg execution. It treats all canonical package evidence as JSON data and exercises both positive and negative parser behavior.

```text
QUALIFICATION_HARNESS_BYTES = 7789
QUALIFICATION_HARNESS_SHA256 = 13c1f805c87aecc35a53bd952dc693d1884b776378cffc5382051fd5d960575c
```

````python
#!/usr/bin/env python3
import hashlib, importlib.util, json, pathlib, tempfile
ROOT=pathlib.Path(__file__).parent
PARSER=ROOT/'004c1bt-stage-c-parser.py'
CLOSURE=ROOT/'resolved-closure.json'
ARCHIVES=ROOT/'verified-archives.json'
INSTALLED=ROOT/'stage-c-predecessor-installed.json'
sha=lambda b:hashlib.sha256(b).hexdigest()
def ident(p):
 b=p.read_bytes(); return len(b),sha(b)
def load_module():
 spec=importlib.util.spec_from_file_location('stagec_parser',PARSER); p=importlib.util.module_from_spec(spec); spec.loader.exec_module(p); return p
assert ident(PARSER)==(19203,'9111e814a779576a5a522c3cbc2d868228e66d00e00cf7dd36e53e757f5708af')
assert ident(CLOSURE)==(293999,'bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970')
assert ident(ARCHIVES)==(439991,'38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98')
assert ident(INSTALLED)==(98938,'42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea')
p=load_module(); closure=json.loads(CLOSURE.read_bytes()); archives=json.loads(ARCHIVES.read_bytes()); installed=json.loads(INSTALLED.read_bytes())
assert (len(closure),len(archives),len(installed))==(910,826,904)
assert p.STAGE_ID=='STAGE_C'; assert p.STAGE_C_ROOTS==['curl','build-essential','pkg-config','rsync']; assert p.STAGE_C_VIRTUAL_ROOT_PROVIDER_MAP=={}
# Verify exact global lookup universes cover all Stage C roots and archive-needing roots.
meta={r:next(x for x in closure if x['package']==r) for r in p.STAGE_C_ROOTS}
assert all(sum(1 for x in closure if x['package']==r)==1 for r in p.STAGE_C_ROOTS)
installed_exact={(x['package'],x['version'],x['architecture']) for x in installed if x['status']=='install ok installed'}
archive_keys={(x['package'],x['version'],x['architecture']) for x in archives}
assert (meta['curl']['package'],meta['curl']['version'],meta['curl']['architecture']) in installed_exact
assert (meta['build-essential']['package'],meta['build-essential']['version'],meta['build-essential']['architecture']) in installed_exact
assert (meta['pkg-config']['package'],meta['pkg-config']['version'],meta['pkg-config']['architecture']) not in installed_exact
assert (meta['rsync']['package'],meta['rsync']['version'],meta['rsync']['architecture']) not in installed_exact
assert (meta['pkg-config']['package'],meta['pkg-config']['version'],meta['pkg-config']['architecture']) in archive_keys
assert (meta['rsync']['package'],meta['rsync']['version'],meta['rsync']['architecture']) in archive_keys
pkg=meta['pkg-config']; rs=meta['rsync']
def line_pair(row,trailer=''):
 rel=f"Ubuntu:22.04/{row['suite']}"
 suf=f' {trailer}' if trailer else ''
 return f"Inst {row['package']} ({row['version']} {rel} [{row['architecture']}]){suf}\nConf {row['package']} ({row['version']} {rel} [{row['architecture']}]){suf}\n"
plain=(line_pair(pkg)+line_pair(rs)).encode()
trail=(line_pair(pkg,'[pkgconf:amd64 ]')+line_pair(rs,'[]')).encode()
r1,j1,a1=p.parse_stage_c(plain,closure,installed,archives)
r2,j2,a2=p.parse_stage_c(plain,closure,installed,archives)
rt,jt,at=p.parse_stage_c(trail,closure,installed,archives)
assert r1['qualifies'] and r1['findings']==[] and r1['recordCount']==4
assert r1['recordCountByAction']=={'INSTALL':2,'UPGRADE':0,'DOWNGRADE':0,'REMOVE':0,'KEEP_BACK':0,'UNCHANGED_REQUESTED_ROOT':2}
assert r1['selectedArchiveIdentityCount']==2
assert j1==j2==jt and a1==a2==at
# Trailer bytes alter only raw stdout fields, not canonical transaction/archive selection.
assert r1['canonicalTransactionJsonlSha256']==rt['canonicalTransactionJsonlSha256'] and r1['selectedArchiveIdentitySetSha256']==rt['selectedArchiveIdentitySetSha256']
# Strict grammar rejection for a different APT diagnostic form that is not ShortBreaks().
try:
 p.parse_stage_c((line_pair(pkg,'[X on Y]')+line_pair(rs)).encode(),closure,installed,archives); raise AssertionError('non-ShortBreaks trailer accepted')
except p.ParseFailure: pass
# Missing action for absent explicit root must fail root accounting.
try:
 p.parse_stage_c(b'\n',closure,installed,archives); raise AssertionError('absent requested roots accepted without solver action')
except p.ParseFailure: pass
# Missing Conf must fail.
try:
 p.parse_stage_c(f"Inst {pkg['package']} ({pkg['version']} jammy [amd64])\n".encode(),closure,installed,archives,roots=[]); raise AssertionError('Inst without Conf accepted')
except p.ParseFailure: pass
# Removal is preserved as a nonqualifying finding.
rem,_,_=p.parse_stage_c(f"Remv curl [{meta['curl']['version']}]\n".encode(),closure,installed,archives,roots=[])
assert not rem['qualifies'] and rem['recordCountByAction']['REMOVE']==1 and any(x['code']=='REMOVE' for x in rem['findings'])
# Kept-back summary remains a nonqualifying finding.
keep,_,_=p.parse_stage_c(b'The following packages have been kept back:\n',closure,installed,archives,roots=[])
assert not keep['qualifies'] and any(x['code']=='KEPT_BACK_SUMMARY' for x in keep['findings'])
# Downgrade remains a nonqualifying finding using a bounded synthetic row.
def m(package,version): return {'package':package,'version':version,'architecture':'amd64','filename':f'pool/{package}_{version}_amd64.deb','size':1,'sha256':'a'*64,'suite':'jammy','component':'main','reason':'ROOT','parent':None}
def ar(row): return {k:row[k] for k in ('package','version','architecture','filename','size','sha256','suite','component')}|{'observed_size':row['size'],'observed_sha256':row['sha256']}
d=m('delta','1.0'); di={'package':'delta','version':'2.0','architecture':'amd64','status':'install ok installed'}
down,_,_=p.parse_stage_c(b'Inst delta [2.0] (1.0 jammy [amd64])\nConf delta (1.0 jammy [amd64])\n',[d],[di],[ar(d)],roots=[])
assert not down['qualifies'] and any(x['code']=='DOWNGRADE' for x in down['findings'])
# Canonical-input identity enforcement rejects same-shape tampering before parse.
with tempfile.TemporaryDirectory() as td:
 for name,path,binding in [('closure',CLOSURE,'resolved_closure'),('installed',INSTALLED,'installed_packages'),('archives',ARCHIVES,'verified_archives')]:
  b=path.read_bytes(); q=pathlib.Path(td)/f'{name}.json'; q.write_bytes(b[:-1]+(b' ' if b[-1:]!=b' ' else b'\n'))
  try: p.read_bound_json(q,binding); raise AssertionError(f'tampered {binding} accepted')
  except p.ParseFailure: pass
summary={
 'schema':'signthos.004c1bt.static-stage-c-parser-qualification.v1',
 'parserBytes':ident(PARSER)[0],'parserSha256':ident(PARSER)[1],
 'stageId':p.STAGE_ID,'stageCRoots':p.STAGE_C_ROOTS,'stageCRootCount':len(p.STAGE_C_ROOTS),'virtualRootProviderMap':p.STAGE_C_VIRTUAL_ROOT_PROVIDER_MAP,
 'resolvedClosureBytes':ident(CLOSURE)[0],'resolvedClosureSha256':ident(CLOSURE)[1],'resolvedClosureCount':len(closure),
 'verifiedArchivesBytes':ident(ARCHIVES)[0],'verifiedArchivesSha256':ident(ARCHIVES)[1],'verifiedArchivesCount':len(archives),
 'predecessorBytes':ident(INSTALLED)[0],'predecessorSha256':ident(INSTALLED)[1],'predecessorCount':len(installed),
 'canonicalStageCRootState':{'curl':'UNCHANGED_EXACT','build-essential':'UNCHANGED_EXACT','pkg-config':'ABSENT_REQUIRES_ACTION','rsync':'ABSENT_REQUIRES_ACTION'},
 'positivePlainRawBytes':len(plain),'positivePlainRawSha256':sha(plain),'positiveTrailerRawBytes':len(trail),'positiveTrailerRawSha256':sha(trail),
 'positiveTransactionJsonlBytes':len(j1),'positiveTransactionJsonlSha256':sha(j1),'positiveArchiveSetBytes':len(a1),'positiveArchiveSetSha256':sha(a1),
 'positiveActionCounts':r1['recordCountByAction'],'plainTrailerCanonicalTransactionIdentity':'PASS','repeatDeterminism':'PASS',
 'shortBreaksGrammar':'PASS','nonShortBreaksRejection':'PASS','absentRootAccountingRejection':'PASS','missingConfRejection':'PASS','removeFinding':'PASS','keepBackFinding':'PASS','downgradeFinding':'PASS','canonicalInputTamperRejection':'PASS'
}
print(json.dumps(summary,sort_keys=True,separators=(',',':')))
````

## 10. Qualification result and successor boundary

```text
004C1BT_GLOBAL_LOOKUP_UNIVERSE_REUSE = PASS
004C1BT_STAGE_C_SPECIALIZATION = PASS
004C1BT_REPAIRED_TRAILER_GRAMMAR_PRESERVED = PASS
004C1BT_CANONICAL_INPUT_BINDING = PASS
004C1BT_STAGE_C_ROOT_ACCOUNTING = PASS_STATIC
004C1BT_METADATA_ARCHIVE_MAPPING = PASS_STATIC
004C1BT_REMOVE_KEEPBACK_DOWNGRADE_FINDINGS = PASS_STATIC
004C1BT_MALFORMED_TRAILER_REJECTION = PASS_STATIC
004C1BT_MISSING_CONF_REJECTION = PASS_STATIC
004C1BT_TAMPERED_INPUT_REJECTION = PASS_STATIC
004C1BT_DETERMINISTIC_SERIALIZATION = PASS_STATIC
004C1BT_CROSS_DEVICE_DETERMINISM = PASS
004C1BT_RESULT = PASS_STATIC_STAGE_C_PARSER_QUALIFICATION_ONLY
STAGE_C_RUNTIME_RESULT = NOT_ESTABLISHED
STAGE_C_REPLAY_A_ATTEMPTS_USED = 0
STAGE_C_REPLAY_A = NOT_AUTHORIZED_BY_004C1BT
STAGE_C_REPLAY_B = NOT_AUTHORIZED
STAGE_C_VIRTUAL_STATE_DERIVATION = NOT_AUTHORIZED
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

A passing 004C1BT does not authorize Stage C Replay A. After guarded merge and mechanical post-merge verification, Issue #7 must separately reconcile whether exactly one fresh Stage C Replay A attempt is authorized. Any later execution must bind the exact merged parser identity, the exact 004C1BS transport/harness identities, current substrate/helper predicates, the 180-second host deadline, a clean evidence root, and a no-retry first-attempt rule before the solver is launched.
