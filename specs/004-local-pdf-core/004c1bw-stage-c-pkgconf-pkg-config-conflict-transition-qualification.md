# 004C1BW — Stage C `pkgconf` / `pkg-config` conflict-transition qualification

Status: `STATIC_QUALIFICATION_CANDIDATE / ZERO_NEW_SOLVER_EXECUTION`

Authority: `github:issue-comment:5628362530`
Canonical base: `adf799927a9b172624eee708ffb73c3a5e06aefa`
Canonical base tree: `30f9e028e26ce4297b0fd14868f8474319f1875b`

## 1. Purpose and authority boundary

004C1BW answers one question only: whether the sole removal in the already-consumed Stage C Replay A is mechanically explained by the already-canonical staged `pkgconf` / `pkg-config` conflict relation when Stage C reverses the Stage B transition and explicitly requests `pkg-config` again.

This unit performs no Docker, APT, apt-config, dpkg, package download/install/unpack/configure, resolver, Replay A replacement, Replay B, virtual-state derivation, PDFium/provider, 004C2, 004D, or Specification 005 execution. It does not change parser finding policy and does not make Replay A qualifying.

```text
DOCKER_APT_DPKG_EXECUTION = 0
REPLAY_A_RETRY_OR_REPLACEMENT = 0
REPLAY_B_EXECUTION = 0
STAGE_C_VIRTUAL_STATE_DERIVATION = 0
GENERIC_REMOVE_ACCEPTANCE = false
PARSER_FINDING_POLICY_CHANGED = false
```

## 2. Exact canonical inputs

```text
004C1AG = 19265 / 3dc7adc22ac613be2cf7d093aebcaa414afeaadf88aa0aa91b4be07cba589877
004C1AL = 21275 / 099260342a77d2fc93404d3cc5babede5eddb9411d0a0a4c4f3d2ec7c101fe2f
004C1BO = 5215 / 341b91ff20f9a2e805edab81098f6e7003de8ebc363afd962d05d17f59255731
004C1BP = 7473 / 87e04906e56819b3c2e490cac4045078d70a195fabee04ccdab5de7e04c80ae3
004C1BR = 414390 / a0f861d828282771809700645b694ba290a6d6bd1d56918cf496b1025a95cbed
004C1BS = 66559 / a4ec3394391a75814efa2df9b1b0aeb4a8e8d41214cd64dfe97d871eb504bfbc
004C1BV = 64476 / 51aa890a4bbc5a4404941df3b6016b51bf2859cc6c221807f789d7259e87018a
STAGE_C_INPUT_TRANSPORT = 205568000 / 938d500c76b7c31927d70df28c98618d8b23f6e35559018c50ae1a8fc1b698de
STAGE_C_PREDECESSOR_INSTALLED = 98938 / 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea
STAGE_C_PARSER_RESULT = 2793 / 5c336bebb675d2be4f60509da243684dba7e785d654bca5757aa3eda34b06b06
STAGE_C_TRANSACTION_JSONL = 2059 / 72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f
STAGE_C_ROOTS = [curl, build-essential, pkg-config, rsync]
STAGE_C_ROOT_COUNT = 4
STAGE_C_RECOMMENDS_POLICY = NO_INSTALL_RECOMMENDS
```

Canonical 004C1AL requires every `DOWNGRADE`, `REMOVE`, or `KEEP_BACK` to be surfaced and reconciled against the deterministic provisioning contract rather than silently accepted. Canonical 004C1BO proves the same selected `pkgconf` metadata relation for the Stage B direction, while 004C1BP accepts only that prior Stage B transition and does not generalize removal permission to Stage C.

## 3. Exact predecessor and selected metadata

The canonical Stage B-derived predecessor state contains exactly `pkgconf:amd64@1.8.0-1` and contains no `pkg-config` package row. Stage C explicitly requests `pkg-config` and does not request `pkgconf`.

The exact `pkgconf` stanza extracted statically from the canonical Stage C transport's Jammy universe `Packages` member is `984 / c71f02d8833affdc252b73dacbde2f33ec7c855838efeeb69a114887fbaa4e13`:

```text
Package: pkgconf
Architecture: amd64
Version: 1.8.0-1
Multi-Arch: foreign
Priority: optional
Section: universe/devel
Origin: Ubuntu
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Original-Maintainer: Andrej Shadura <andrewsh@debian.org>
Bugs: https://bugs.launchpad.net/ubuntu/+filebug
Installed-Size: 126
Provides: pkg-config (= 0.29-1)
Depends: libdpkg-perl, dpkg-dev, perl:any, libc6 (>= 2.34), libpkgconf3 (>= 1.8.0-1)
Breaks: pkg-config (>= 0.29-1)
Filename: pool/universe/p/pkgconf/pkgconf_1.8.0-1_amd64.deb
Size: 35280
MD5sum: 290c2aa15742ee8c8ec210a952eb8c53
SHA1: 3e1fab0a05563138d64b67aad5c5a6d7fcf699a9
SHA256: 257c91d3c0d18e2e0856cb7e86cb4ddf18b91fc40df5bcc45ebaccb25d4e6d37
SHA512: 589375672e96fdd6e5c3bec7884adfb68acba29cd5b1b1b6e2f6a1512e469f75dcbfe395cb993aefb41fb1ecfc5473bc0c80befd9e507f43cb7a7bd1c7c27681
Homepage: http://pkgconf.org/
Description: manage compile and link flags for libraries
Description-md5: bb6e939dcc5e28020ca3111bf3fb0434
```

The exact selected `pkg-config` stanza extracted statically from the same transport's Jammy main `Packages` member is `996 / cc5d5ed84373c65bb3d36df26f5f8b53fb615ae143e04189b6d341a6d73bf2d9`:

```text
Package: pkg-config
Architecture: amd64
Version: 0.29.2-1ubuntu3
Multi-Arch: foreign
Priority: optional
Section: devel
Origin: Ubuntu
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Original-Maintainer: Tollef Fog Heen <tfheen@debian.org>
Bugs: https://bugs.launchpad.net/ubuntu/+filebug
Installed-Size: 131
Depends: libc6 (>= 2.34), libglib2.0-0 (>= 2.16.0), libdpkg-perl
Suggests: dpkg-dev
Conflicts: pkg-config-bin
Replaces: pkg-config-bin
Filename: pool/main/p/pkg-config/pkg-config_0.29.2-1ubuntu3_amd64.deb
Size: 48218
MD5sum: 10ab97c1aa35f8cb64f6f36021d46b30
SHA1: c255c6ef31028cb4da1d9d669a50d332a62e4d7d
SHA256: 69da4190d948d0bf7444ead040791b7924bd1a08a10ec13cd7f0bb9baab09c53
SHA512: 359062b16f36ca844b9b32e6426847be3fa566ee3c8c5e3e04781ffc2a28f515f9afd4954d83b3e05bdb82ed910561d4cc1527d1c00b1b104e371d8c7014ab93
Homepage: http://pkg-config.freedesktop.org
Description: manage compile and link flags for libraries
Description-md5: 5622d544b680cd37e49d3435959207a2
```

The selected relation is therefore exactly:

```text
INSTALLED_PREDECESSOR = pkgconf:amd64@1.8.0-1
INCOMING_STAGE_C_ROOT = pkg-config:amd64@0.29.2-1ubuntu3
PKGCONF_PROVIDES = pkg-config (= 0.29-1)
PKGCONF_BREAKS = pkg-config (>= 0.29-1)
DEBIAN_VERSION_COMPARE(0.29.2-1ubuntu3, 0.29-1) >= 0 = true
```

The `Breaks` relation is declared by the already-installed `pkgconf` package and applies to the exact incoming `pkg-config` version selected for Stage C. Consequently the two selected package versions cannot coexist in the configured successor state. `Provides` is recorded separately and is not used to erase the explicit Stage C `pkg-config` root.

## 4. Preserved Stage C transaction facts

Canonical 004C1BV reparses the exact preserved Replay A stdout and records five deterministic transaction rows:

```text
INSTALL = 2
UPGRADE = 0
DOWNGRADE = 0
REMOVE = 1
KEEP_BACK = 0
UNCHANGED_REQUESTED_ROOT = 2
ROOT_ACCOUNTING = 4/4
PARSER_RESULT_QUALIFIES = false
```

The exact relevant transition is:

```text
INSTALL pkg-config:amd64 from=null to=0.29.2-1ubuntu3
REMOVE pkgconf:amd64 from=1.8.0-1 to=null
```

The exact preserved findings remain:

```json
[{"code":"REMOVE_SUMMARY","line":7},{"architecture":"amd64","code":"REMOVE","fromVersion":"1.8.0-1","package":"pkgconf"}]
```

There are zero other removals, zero downgrades, and zero keep-backs.

## 5. Narrow reverse-transition predicate

The observed Stage C transition qualifies as the reverse direction of the single predeclared cross-stage conflict relation only when every predicate below is true:

1. the predecessor installed package is exactly `pkgconf:amd64@1.8.0-1` and `pkg-config` is absent;
2. Stage C requests exactly `[curl, build-essential, pkg-config, rsync]`, including `pkg-config` and excluding `pkgconf`;
3. selected metadata is exactly `pkgconf:amd64@1.8.0-1` with `Breaks: pkg-config (>= 0.29-1)`;
4. selected incoming metadata is exactly `pkg-config:amd64@0.29.2-1ubuntu3`;
5. Debian version ordering proves `0.29.2-1ubuntu3 >= 0.29-1`, so the exact `Breaks` relation applies;
6. the preserved transaction installs exactly `pkg-config:amd64@0.29.2-1ubuntu3` and removes exactly `pkgconf:amd64@1.8.0-1`;
7. the transaction contains zero additional removals, zero downgrades, zero keep-backs, and preserves `4/4` requested-root accounting;
8. parser result and findings remain unchanged and `parserQualifies=false` remains preserved;
9. no generic removal permission, root rewrite, stage deduplication, or later execution authority is inferred.

Any different predecessor, package/version/architecture, relation, threshold result, root set, removed package, additional removal, downgrade, keep-back, parser result, or solver output fails closed and requires separate authority.

## 6. Deterministic host-static evaluation

The exact portable evaluator is `4738 / 059552554c401bdbcd8a88aee788899ec41145ad58077f0b3d1d80791eb61cb7`. It binds every input byte identity before use and reuses the canonical Stage C parser's Debian version comparator. Two independent macOS invocations produced identical result bytes. No cross-platform result is claimed by this unit without separately preserved execution evidence.

```text
MACOS_STATIC_EVALUATION_A = PASS
MACOS_STATIC_EVALUATION_B = PASS
QUALIFICATION_RESULT_BYTES = 722
QUALIFICATION_RESULT_SHA256 = 6a208d5806f3f7e162e53c38efada2510f1b38aadaa058f091606fca3160443c
```

```json
{"additionalRemovals":0,"breaksPredicateMatches":true,"breaksThreshold":"0.29-1","conflictCausality":"PROVEN_FROM_BOUND_METADATA_PREDECESSOR_AND_TRANSACTION","downgrades":0,"genericRemoveAcceptance":false,"incomingPkgConfigVersion":"0.29.2-1ubuntu3","keepBacks":0,"originalFindingsPreserved":true,"parserResultQualifies":false,"predecessorPkgConfigAbsent":true,"predecessorPkgconfExact":true,"predeclaredCrossStageTransitionMatch":"PASS","rootAccounting":"4/4","schema":"signthos.004c1bw.stage-c-conflict-transition-causality.v1","selectedPkgconfBreaks":"pkg-config (>= 0.29-1)","stageCPkgConfigRequested":true,"stageCPkgconfRequested":false,"transactionInstallsPkgConfigExact":true,"transactionRemovesPkgconfExact":true}
```

## 7. Exact-head self-contained evaluator inputs

To close the reproducibility finding, this one-file candidate embeds every previously external evaluator input byte below. Together with the already-embedded evaluator and both exact package stanzas, the exact head is self-contained for host-static reproduction. Extract each appendix body with its final LF, verify the identities below, place the seven files in one directory using the stated filenames, and run `python3 qualify.py`. The evaluator must emit exactly `722 / 6a208d5806f3f7e162e53c38efada2510f1b38aadaa058f091606fca3160443c`. This procedure performs no Docker, APT, apt-config, dpkg, package operation, or solver execution.

```text
qualify.py = 4738 / 059552554c401bdbcd8a88aee788899ec41145ad58077f0b3d1d80791eb61cb7
pkgconf.stanza = 984 / c71f02d8833affdc252b73dacbde2f33ec7c855838efeeb69a114887fbaa4e13
pkg-config.stanza = 996 / cc5d5ed84373c65bb3d36df26f5f8b53fb615ae143e04189b6d341a6d73bf2d9
candidate-parser.py = 19234 / 243ebcc662a682c755e0b772ad907b8b059a4fcbb671c66ffedc204e4cc2c203
predecessor-installed.json = 98938 / 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea
transaction.jsonl = 2059 / 72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f
parser-result.json = 2793 / 5c336bebb675d2be4f60509da243684dba7e785d654bca5757aa3eda34b06b06
EXPECTED_STDOUT = 722 / 6a208d5806f3f7e162e53c38efada2510f1b38aadaa058f091606fca3160443c
```

## 8. Qualification result

```text
CONFLICT_CAUSALITY = PROVEN_FROM_BOUND_METADATA_PREDECESSOR_AND_TRANSACTION
PREDECLARED_CROSS_STAGE_TRANSITION_MATCH = PASS
REVERSE_STAGE_C_DIRECTION = PASS
PARSER_RESULT_QUALIFIES = false
ORIGINAL_FINDINGS_PRESERVED = true
GENERIC_REMOVE_ACCEPTANCE = false
PARSER_FINDING_POLICY_CHANGED = false
STAGE_C_TRANSACTION_POLICY_QUALIFIES = NOT_DECIDED_BY_004C1BW
STAGE_C_REPLAY_B_AUTHORITY = ABSENT
```

004C1BW proves only the causality and exact identity of the one observed Stage C `pkgconf` -> `pkg-config` conflict transition. It does not accept the removal at the transaction-policy layer. A separate post-merge disposition is required before Replay B can be considered.

## Appendix A — exact static evaluator

````python
#!/usr/bin/env python3
import hashlib, importlib.util, json, re
from pathlib import Path
W=Path(__file__).resolve().parent
PARSER=W/'candidate-parser.py'; INSTALLED=W/'predecessor-installed.json'; TX=W/'transaction.jsonl'; RESULT=W/'parser-result.json'; PKGCONF=W/'pkgconf.stanza'; PKGCONFIG=W/'pkg-config.stanza'
EXP={
 'parser':(19234,'243ebcc662a682c755e0b772ad907b8b059a4fcbb671c66ffedc204e4cc2c203'),
 'installed':(98938,'42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea'),
 'transaction':(2059,'72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f'),
 'result':(2793,'5c336bebb675d2be4f60509da243684dba7e785d654bca5757aa3eda34b06b06'),
 'pkgconf':(984,'c71f02d8833affdc252b73dacbde2f33ec7c855838efeeb69a114887fbaa4e13'),
 'pkgconfig':(996,'cc5d5ed84373c65bb3d36df26f5f8b53fb615ae143e04189b6d341a6d73bf2d9'),
}
def ident(p):
 b=p.read_bytes(); return len(b),hashlib.sha256(b).hexdigest()
for n,p in [('parser',PARSER),('installed',INSTALLED),('transaction',TX),('result',RESULT),('pkgconf',PKGCONF),('pkgconfig',PKGCONFIG)]:
 assert ident(p)==EXP[n],(n,ident(p),EXP[n])
def stanza(path):
 out={}
 for line in path.read_text().splitlines():
  if ': ' in line:
   k,v=line.split(': ',1); out[k]=v
 return out
pc=stanza(PKGCONF); old=stanza(PKGCONFIG)
assert (pc['Package'],pc['Architecture'],pc['Version'])==('pkgconf','amd64','1.8.0-1')
assert pc['Breaks']=='pkg-config (>= 0.29-1)'
assert pc['Provides']=='pkg-config (= 0.29-1)'
assert pc['Filename']=='pool/universe/p/pkgconf/pkgconf_1.8.0-1_amd64.deb' and pc['Size']=='35280' and pc['SHA256']=='257c91d3c0d18e2e0856cb7e86cb4ddf18b91fc40df5bcc45ebaccb25d4e6d37'
assert (old['Package'],old['Architecture'],old['Version'])==('pkg-config','amd64','0.29.2-1ubuntu3')
assert old['Filename']=='pool/main/p/pkg-config/pkg-config_0.29.2-1ubuntu3_amd64.deb' and old['Size']=='48218' and old['SHA256']=='69da4190d948d0bf7444ead040791b7924bd1a08a10ec13cd7f0bb9baab09c53'
spec=importlib.util.spec_from_file_location('stagec',PARSER); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
assert m.STAGE_C_ROOTS==['curl','build-essential','pkg-config','rsync'] and 'pkgconf' not in m.STAGE_C_ROOTS
installed=json.loads(INSTALLED.read_text()); pkgconf_inst=[x for x in installed if x['package']=='pkgconf']; pkgconfig_inst=[x for x in installed if x['package']=='pkg-config']
assert pkgconf_inst==[{'architecture':'amd64','package':'pkgconf','status':'install ok installed','version':'1.8.0-1'}] and pkgconfig_inst==[]
match=re.fullmatch(r'pkg-config \(>= ([^)]+)\)',pc['Breaks']); assert match
threshold=match.group(1); incoming='0.29.2-1ubuntu3'; assert m.version_cmp(incoming,threshold)>=0
records=[json.loads(x) for x in TX.read_text().splitlines() if x]
counts={a:sum(r['action']==a for r in records) for a in ['INSTALL','UPGRADE','DOWNGRADE','REMOVE','KEEP_BACK','UNCHANGED_REQUESTED_ROOT']}
assert counts=={'INSTALL':2,'UPGRADE':0,'DOWNGRADE':0,'REMOVE':1,'KEEP_BACK':0,'UNCHANGED_REQUESTED_ROOT':2}
rem=[r for r in records if r['action']=='REMOVE']; assert rem==[{'stageId':'STAGE_C','action':'REMOVE','package':'pkgconf','architecture':'amd64','fromVersion':'1.8.0-1','toVersion':None,'canonicalPackageMetadataSha256':None,'filename':None,'archiveBytes':None,'archiveSha256':None,'selectedSuite':None,'selectedComponent':None,'reasonClass':None}]
install={r['package']:r for r in records if r['action']=='INSTALL'}
assert install['pkg-config']['toVersion']=='0.29.2-1ubuntu3' and install['pkg-config']['archiveSha256']=='69da4190d948d0bf7444ead040791b7924bd1a08a10ec13cd7f0bb9baab09c53'
result=json.loads(RESULT.read_text())
assert result['qualifies'] is False and result['recordCount']==5 and result['recordCountByAction']==counts
assert result['findings']==[{'code':'REMOVE_SUMMARY','line':7},{'architecture':'amd64','code':'REMOVE','fromVersion':'1.8.0-1','package':'pkgconf'}]
out={
 'schema':'signthos.004c1bw.stage-c-conflict-transition-causality.v1',
 'predecessorPkgconfExact':True,'predecessorPkgConfigAbsent':True,'stageCPkgConfigRequested':True,'stageCPkgconfRequested':False,
 'selectedPkgconfBreaks':pc['Breaks'],'breaksThreshold':threshold,'incomingPkgConfigVersion':incoming,'breaksPredicateMatches':True,
 'transactionInstallsPkgConfigExact':True,'transactionRemovesPkgconfExact':True,'additionalRemovals':0,'downgrades':0,'keepBacks':0,
 'rootAccounting':'4/4','parserResultQualifies':False,'originalFindingsPreserved':True,
 'predeclaredCrossStageTransitionMatch':'PASS','conflictCausality':'PROVEN_FROM_BOUND_METADATA_PREDECESSOR_AND_TRANSACTION','genericRemoveAcceptance':False,
}
q=(json.dumps(out,separators=(',',':'),sort_keys=True)+'\n').encode(); (W/'qualification-result.json').write_bytes(q); print(q.decode(),end='')
````

## Appendix B — exact repaired Stage C parser input

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
REMV_RE = re.compile(rf"^(?P<verb>Remv|Purg) {FULL_RE} \[(?P<from>[^\[\]\s]+)\](?: {SHORT_BREAKS_TRAILER_RE})?$")
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


## Appendix C — exact Stage C predecessor installed state

````json
[{"architecture":"all","package":"adduser","status":"install ok installed","version":"3.118ubuntu5"},{"architecture":"all","package":"adwaita-icon-theme","status":"install ok installed","version":"41.0-1ubuntu1"},{"architecture":"all","package":"ant","status":"install ok installed","version":"1.10.12-1"},{"architecture":"amd64","package":"apt","status":"install ok installed","version":"2.4.13"},{"architecture":"amd64","package":"at-spi2-core","status":"install ok installed","version":"2.44.0-3"},{"architecture":"all","package":"autoconf","status":"install ok installed","version":"2.71-2"},{"architecture":"all","package":"automake","status":"install ok installed","version":"1:1.16.5-1.3"},{"architecture":"all","package":"autopoint","status":"install ok installed","version":"0.21-4ubuntu4"},{"architecture":"all","package":"autotools-dev","status":"install ok installed","version":"20220109.1"},{"architecture":"amd64","package":"base-files","status":"install ok installed","version":"12ubuntu4.7"},{"architecture":"amd64","package":"base-passwd","status":"install ok installed","version":"3.5.52build1"},{"architecture":"amd64","package":"bash","status":"install ok installed","version":"5.1-6ubuntu1.1"},{"architecture":"amd64","package":"binutils","status":"install ok installed","version":"2.38-4ubuntu2.12"},{"architecture":"amd64","package":"binutils-aarch64-linux-gnu","status":"install ok installed","version":"2.38-4ubuntu2.12"},{"architecture":"amd64","package":"binutils-arm-linux-gnueabihf","status":"install ok installed","version":"2.38-4ubuntu2.12"},{"architecture":"amd64","package":"binutils-common","status":"install ok installed","version":"2.38-4ubuntu2.12"},{"architecture":"amd64","package":"binutils-mips64el-linux-gnuabi64","status":"install ok installed","version":"2.38-1ubuntu1cross2"},{"architecture":"amd64","package":"binutils-mipsel-linux-gnu","status":"install ok installed","version":"2.38-1ubuntu1cross2"},{"architecture":"amd64","package":"binutils-x86-64-linux-gnu","status":"install ok installed","version":"2.38-4ubuntu2.12"},{"architecture":"amd64","package":"bison","status":"install ok installed","version":"2:3.8.2+dfsg-1build1"},{"architecture":"amd64","package":"bsdextrautils","status":"install ok installed","version":"2.37.2-4ubuntu3.6"},{"architecture":"amd64","package":"bsdutils","status":"install ok installed","version":"1:2.37.2-4ubuntu3.4"},{"architecture":"amd64","package":"build-essential","status":"install ok installed","version":"12.9ubuntu3"},{"architecture":"amd64","package":"bzip2","status":"install ok installed","version":"1.0.8-5ubuntu0.1"},{"architecture":"all","package":"bzip2-doc","status":"install ok installed","version":"1.0.8-5ubuntu0.1"},{"architecture":"all","package":"ca-certificates","status":"install ok installed","version":"20240203~22.04.1"},{"architecture":"all","package":"ca-certificates-java","status":"install ok installed","version":"20190909ubuntu1.2"},{"architecture":"all","package":"cdbs","status":"install ok installed","version":"0.4.163ubuntu2"},{"architecture":"amd64","package":"cmake","status":"install ok installed","version":"3.22.1-1ubuntu1.22.04.2"},{"architecture":"all","package":"cmake-data","status":"install ok installed","version":"3.22.1-1ubuntu1.22.04.2"},{"architecture":"amd64","package":"comerr-dev","status":"install ok installed","version":"2.1-1.46.5-2ubuntu1.2"},{"architecture":"amd64","package":"coreutils","status":"install ok installed","version":"8.32-4.1ubuntu1.2"},{"architecture":"amd64","package":"cpp","status":"install ok installed","version":"4:11.2.0-1ubuntu1"},{"architecture":"amd64","package":"cpp-11","status":"install ok installed","version":"11.4.0-1ubuntu1~22.04"},{"architecture":"amd64","package":"curl","status":"install ok installed","version":"7.81.0-1ubuntu1.27"},{"architecture":"amd64","package":"dash","status":"install ok installed","version":"0.5.11+git20210903+057cd650a4ed-3build1"},{"architecture":"amd64","package":"dbus","status":"install ok installed","version":"1.12.20-2ubuntu4.1"},{"architecture":"amd64","package":"dbus-x11","status":"install ok installed","version":"1.12.20-2ubuntu4.1"},{"architecture":"amd64","package":"dconf-gsettings-backend","status":"install ok installed","version":"0.40.0-3ubuntu0.1"},{"architecture":"amd64","package":"dconf-service","status":"install ok installed","version":"0.40.0-3ubuntu0.1"},{"architecture":"amd64","package":"dctrl-tools","status":"install ok installed","version":"2.24-3build2"},{"architecture":"all","package":"debconf","status":"install ok installed","version":"1.5.79ubuntu1"},{"architecture":"all","package":"debhelper","status":"install ok installed","version":"13.6ubuntu1"},{"architecture":"amd64","package":"debianutils","status":"install ok installed","version":"5.5-1ubuntu2"},{"architecture":"amd64","package":"debugedit","status":"install ok installed","version":"1:5.0-4build1"},{"architecture":"amd64","package":"devscripts","status":"install ok installed","version":"2.22.1ubuntu1.2"},{"architecture":"all","package":"dh-autoreconf","status":"install ok installed","version":"20"},{"architecture":"all","package":"dh-elpa-helper","status":"install ok installed","version":"2.0.9ubuntu1"},{"architecture":"all","package":"dh-strip-nondeterminism","status":"install ok installed","version":"1.13.0-1"},{"architecture":"all","package":"dh-translations","status":"install ok installed","version":"149.22.04.0"},{"architecture":"amd64","package":"diffstat","status":"install ok installed","version":"1.64-1build2"},{"architecture":"amd64","package":"diffutils","status":"install ok installed","version":"1:3.8-0ubuntu2"},{"architecture":"amd64","package":"dirmngr","status":"install ok installed","version":"2.2.27-3ubuntu2.5"},{"architecture":"all","package":"distro-info-data","status":"install ok installed","version":"0.72-0ubuntu0.22.04.1"},{"architecture":"amd64","package":"dmsetup","status":"install ok installed","version":"2:1.02.175-2.1ubuntu5"},{"architecture":"amd64","package":"dpkg","status":"install ok installed","version":"1.21.1ubuntu2.3"},{"architecture":"all","package":"dpkg-dev","status":"install ok installed","version":"1.21.1ubuntu2.6"},{"architecture":"all","package":"dput","status":"install ok installed","version":"1.1.0ubuntu2.1"},{"architecture":"amd64","package":"dwz","status":"install ok installed","version":"0.14-1build2"},{"architecture":"amd64","package":"e2fsprogs","status":"install ok installed","version":"1.46.5-2ubuntu1.2"},{"architecture":"amd64","package":"elfutils","status":"install ok installed","version":"0.186-1ubuntu0.1"},{"architecture":"all","package":"emacsen-common","status":"install ok installed","version":"3.0.4"},{"architecture":"amd64","package":"fakeroot","status":"install ok installed","version":"1.28-1ubuntu1"},{"architecture":"amd64","package":"fd-find","status":"install ok installed","version":"8.3.1-1ubuntu0.1"},{"architecture":"amd64","package":"file","status":"install ok installed","version":"1:5.41-3ubuntu0.1"},{"architecture":"amd64","package":"findutils","status":"install ok installed","version":"4.8.0-1ubuntu3"},{"architecture":"amd64","package":"flex","status":"install ok installed","version":"2.6.4-8build2"},{"architecture":"amd64","package":"fontconfig","status":"install ok installed","version":"2.13.1-4.2ubuntu5"},{"architecture":"all","package":"fontconfig-config","status":"install ok installed","version":"2.13.1-4.2ubuntu5"},{"architecture":"all","package":"fonts-dejavu-core","status":"install ok installed","version":"2.37-2build1"},{"architecture":"all","package":"fonts-lato","status":"install ok installed","version":"2.0-2.1"},{"architecture":"amd64","package":"g++","status":"install ok installed","version":"4:11.2.0-1ubuntu1"},{"architecture":"amd64","package":"g++-11","status":"install ok installed","version":"11.4.0-1ubuntu1~22.04"},{"architecture":"amd64","package":"gcc","status":"install ok installed","version":"4:11.2.0-1ubuntu1"},{"architecture":"amd64","package":"gcc-11","status":"install ok installed","version":"11.4.0-1ubuntu1~22.04"},{"architecture":"amd64","package":"gcc-11-base","status":"install ok installed","version":"11.4.0-1ubuntu1~22.04"},{"architecture":"amd64","package":"gcc-12-base","status":"install ok installed","version":"12.3.0-1ubuntu1~22.04.3"},{"architecture":"amd64","package":"gettext","status":"install ok installed","version":"0.21-4ubuntu4"},{"architecture":"amd64","package":"gettext-base","status":"install ok installed","version":"0.21-4ubuntu4"},{"architecture":"amd64","package":"gir1.2-atk-1.0","status":"install ok installed","version":"2.36.0-3build1"},{"architecture":"amd64","package":"gir1.2-atspi-2.0","status":"install ok installed","version":"2.44.0-3"},{"architecture":"amd64","package":"gir1.2-freedesktop","status":"install ok installed","version":"1.72.0-1"},{"architecture":"amd64","package":"gir1.2-gdkpixbuf-2.0","status":"install ok installed","version":"2.42.8+dfsg-1ubuntu0.5"},{"architecture":"amd64","package":"gir1.2-glib-2.0","status":"install ok installed","version":"1.72.0-1"},{"architecture":"amd64","package":"gir1.2-gtk-3.0","status":"install ok installed","version":"3.24.33-1ubuntu2.2"},{"architecture":"amd64","package":"gir1.2-gudev-1.0","status":"install ok installed","version":"1:237-2build1"},{"architecture":"amd64","package":"gir1.2-harfbuzz-0.0","status":"install ok installed","version":"2.7.4-1ubuntu3.2"},{"architecture":"amd64","package":"gir1.2-pango-1.0","status":"install ok installed","version":"1.50.6+ds-2ubuntu1"},{"architecture":"amd64","package":"git","status":"install ok installed","version":"1:2.34.1-1ubuntu1.17"},{"architecture":"amd64","package":"git-lfs","status":"install ok installed","version":"3.0.2-1ubuntu0.2"},{"architecture":"all","package":"git-man","status":"install ok installed","version":"1:2.34.1-1ubuntu1.11"},{"architecture":"all","package":"gnupg","status":"install ok installed","version":"2.2.27-3ubuntu2.5"},{"architecture":"all","package":"gnupg-l10n","status":"install ok installed","version":"2.2.27-3ubuntu2.5"},{"architecture":"amd64","package":"gnupg-utils","status":"install ok installed","version":"2.2.27-3ubuntu2.5"},{"architecture":"amd64","package":"gperf","status":"install ok installed","version":"3.1-1build1"},{"architecture":"amd64","package":"gpg","status":"install ok installed","version":"2.2.27-3ubuntu2.5"},{"architecture":"amd64","package":"gpg-agent","status":"install ok installed","version":"2.2.27-3ubuntu2.5"},{"architecture":"amd64","package":"gpg-wks-client","status":"install ok installed","version":"2.2.27-3ubuntu2.5"},{"architecture":"amd64","package":"gpg-wks-server","status":"install ok installed","version":"2.2.27-3ubuntu2.5"},{"architecture":"amd64","package":"gpgconf","status":"install ok installed","version":"2.2.27-3ubuntu2.5"},{"architecture":"amd64","package":"gpgsm","status":"install ok installed","version":"2.2.27-3ubuntu2.5"},{"architecture":"amd64","package":"gpgv","status":"install ok installed","version":"2.2.27-3ubuntu2.5"},{"architecture":"amd64","package":"grep","status":"install ok installed","version":"3.7-1build1"},{"architecture":"amd64","package":"groff-base","status":"install ok installed","version":"1.22.4-8build1"},{"architecture":"all","package":"gsettings-desktop-schemas","status":"install ok installed","version":"42.0-1ubuntu1"},{"architecture":"amd64","package":"gtk-update-icon-cache","status":"install ok installed","version":"3.24.33-1ubuntu2.2"},{"architecture":"amd64","package":"gzip","status":"install ok installed","version":"1.10-4ubuntu4.1"},{"architecture":"all","package":"hicolor-icon-theme","status":"install ok installed","version":"0.17-2"},{"architecture":"amd64","package":"hostname","status":"install ok installed","version":"3.23ubuntu2"},{"architecture":"all","package":"humanity-icon-theme","status":"install ok installed","version":"0.6.16"},{"architecture":"amd64","package":"i965-va-driver","status":"install ok installed","version":"2.4.1+dfsg1-1"},{"architecture":"amd64","package":"icu-devtools","status":"install ok installed","version":"70.1-2"},{"architecture":"all","package":"init-system-helpers","status":"install ok installed","version":"1.62"},{"architecture":"amd64","package":"intel-media-va-driver","status":"install ok installed","version":"22.3.1+dfsg1-1ubuntu2"},{"architecture":"all","package":"intltool","status":"install ok installed","version":"0.51.0-6"},{"architecture":"all","package":"intltool-debian","status":"install ok installed","version":"0.35.0+20060710.5"},{"architecture":"all","package":"iso-codes","status":"install ok installed","version":"4.9.0-1"},{"architecture":"all","package":"java-common","status":"install ok installed","version":"0.72build2"},{"architecture":"all","package":"javascript-common","status":"install ok installed","version":"11+nmu1"},{"architecture":"amd64","package":"jq","status":"install ok installed","version":"1.6-2.1ubuntu3.2"},{"architecture":"all","package":"keyboard-configuration","status":"install ok installed","version":"1.205ubuntu3"},{"architecture":"amd64","package":"krb5-multidev","status":"install ok installed","version":"1.19.2-2ubuntu0.8"},{"architecture":"amd64","package":"lib32gcc-s1","status":"install ok installed","version":"12.3.0-1ubuntu1~22.04.3"},{"architecture":"amd64","package":"lib32stdc++6","status":"install ok installed","version":"12.3.0-1ubuntu1~22.04.3"},{"architecture":"amd64","package":"lib32z1","status":"install ok installed","version":"1:1.2.11.dfsg-2ubuntu9.2"},{"architecture":"amd64","package":"libacl1","status":"install ok installed","version":"2.3.1-1"},{"architecture":"all","package":"libaliased-perl","status":"install ok installed","version":"0.34-1.1"},{"architecture":"amd64","package":"libapparmor1","status":"install ok installed","version":"3.0.4-2ubuntu2.5"},{"architecture":"amd64","package":"libapr1","status":"install ok installed","version":"1.7.0-8ubuntu0.22.04.2"},{"architecture":"amd64","package":"libaprutil1","status":"install ok installed","version":"1.6.1-5ubuntu4.22.04.3"},{"architecture":"amd64","package":"libapt-pkg-perl","status":"install ok installed","version":"0.1.40build2"},{"architecture":"amd64","package":"libapt-pkg6.0","status":"install ok installed","version":"2.4.13"},{"architecture":"all","package":"libarchive-cpio-perl","status":"install ok installed","version":"0.10-1.1"},{"architecture":"all","package":"libarchive-zip-perl","status":"install ok installed","version":"1.68-1"},{"architecture":"amd64","package":"libarchive13","status":"install ok installed","version":"3.6.0-1ubuntu1.2"},{"architecture":"amd64","package":"libargon2-1","status":"install ok installed","version":"0~20171227-0.3"},{"architecture":"all","package":"libarray-intspan-perl","status":"install ok installed","version":"2.004-1"},{"architecture":"amd64","package":"libasan6","status":"install ok installed","version":"11.4.0-1ubuntu1~22.04"},{"architecture":"amd64","package":"libasm1","status":"install ok installed","version":"0.186-1ubuntu0.1"},{"architecture":"amd64","package":"libasound2","status":"install ok installed","version":"1.2.6.1-1ubuntu1.2"},{"architecture":"all","package":"libasound2-data","status":"install ok installed","version":"1.2.6.1-1ubuntu1.2"},{"architecture":"amd64","package":"libasound2-dev","status":"install ok installed","version":"1.2.6.1-1ubuntu1.2"},{"architecture":"amd64","package":"libassuan0","status":"install ok installed","version":"2.5.5-1build1"},{"architecture":"amd64","package":"libasyncns0","status":"install ok installed","version":"0.8-6build2"},{"architecture":"amd64","package":"libatk-bridge2.0-0","status":"install ok installed","version":"2.38.0-3"},{"architecture":"amd64","package":"libatk-bridge2.0-dev","status":"install ok installed","version":"2.38.0-3"},{"architecture":"amd64","package":"libatk1.0-0","status":"install ok installed","version":"2.36.0-3build1"},{"architecture":"all","package":"libatk1.0-data","status":"install ok installed","version":"2.36.0-3build1"},{"architecture":"amd64","package":"libatk1.0-dev","status":"install ok installed","version":"2.36.0-3build1"},{"architecture":"amd64","package":"libatomic1","status":"install ok installed","version":"12.3.0-1ubuntu1~22.04.3"},{"architecture":"amd64","package":"libatspi2.0-0","status":"install ok installed","version":"2.44.0-3"},{"architecture":"amd64","package":"libatspi2.0-dev","status":"install ok installed","version":"2.44.0-3"},{"architecture":"amd64","package":"libattr1","status":"install ok installed","version":"1:2.5.1-1build1"},{"architecture":"all","package":"libaudit-common","status":"install ok installed","version":"1:3.0.7-1build1"},{"architecture":"amd64","package":"libaudit1","status":"install ok installed","version":"1:3.0.7-1build1"},{"architecture":"all","package":"libauthen-sasl-perl","status":"install ok installed","version":"2.1600-1.1"},{"architecture":"amd64","package":"libavahi-client3","status":"install ok installed","version":"0.8-5ubuntu5.2"},{"architecture":"amd64","package":"libavahi-common-data","status":"install ok installed","version":"0.8-5ubuntu5.2"},{"architecture":"amd64","package":"libavahi-common3","status":"install ok installed","version":"0.8-5ubuntu5.2"},{"architecture":"all","package":"libb-hooks-endofscope-perl","status":"install ok installed","version":"0.25-1"},{"architecture":"amd64","package":"libb-hooks-op-check-perl","status":"install ok installed","version":"0.22-1build5"},{"architecture":"amd64","package":"libbinutils","status":"install ok installed","version":"2.38-4ubuntu2.12"},{"architecture":"amd64","package":"libblkid-dev","status":"install ok installed","version":"2.37.2-4ubuntu3.6"},{"architecture":"amd64","package":"libblkid1","status":"install ok installed","version":"2.37.2-4ubuntu3.6"},{"architecture":"amd64","package":"libbluetooth-dev","status":"install ok installed","version":"5.64-0ubuntu1.4"},{"architecture":"amd64","package":"libbluetooth3","status":"install ok installed","version":"5.64-0ubuntu1.4"},{"architecture":"amd64","package":"libbrlapi-dev","status":"install ok installed","version":"6.4-4ubuntu3"},{"architecture":"amd64","package":"libbrlapi0.8","status":"install ok installed","version":"6.4-4ubuntu3"},{"architecture":"amd64","package":"libbrotli-dev","status":"install ok installed","version":"1.0.9-2build6"},{"architecture":"amd64","package":"libbrotli1","status":"install ok installed","version":"1.0.9-2build6"},{"architecture":"amd64","package":"libbsd0","status":"install ok installed","version":"0.11.5-1"},{"architecture":"amd64","package":"libbz2-1.0","status":"install ok installed","version":"1.0.8-5ubuntu0.1"},{"architecture":"amd64","package":"libbz2-dev","status":"install ok installed","version":"1.0.8-5ubuntu0.1"},{"architecture":"amd64","package":"libc-bin","status":"install ok installed","version":"2.35-0ubuntu3.8"},{"architecture":"amd64","package":"libc-dev-bin","status":"install ok installed","version":"2.35-0ubuntu3.15"},{"architecture":"amd64","package":"libc6","status":"install ok installed","version":"2.35-0ubuntu3.15"},{"architecture":"amd64","package":"libc6-dev","status":"install ok installed","version":"2.35-0ubuntu3.15"},{"architecture":"amd64","package":"libc6-i386","status":"install ok installed","version":"2.35-0ubuntu3.15"},{"architecture":"amd64","package":"libcairo-gobject2","status":"install ok installed","version":"1.16.0-5ubuntu2.1"},{"architecture":"amd64","package":"libcairo-script-interpreter2","status":"install ok installed","version":"1.16.0-5ubuntu2.1"},{"architecture":"amd64","package":"libcairo2","status":"install ok installed","version":"1.16.0-5ubuntu2.1"},{"architecture":"amd64","package":"libcairo2-dev","status":"install ok installed","version":"1.16.0-5ubuntu2.1"},{"architecture":"amd64","package":"libcap-dev","status":"install ok installed","version":"1:2.44-1ubuntu0.22.04.3"},{"architecture":"amd64","package":"libcap-ng0","status":"install ok installed","version":"0.7.9-2.2build3"},{"architecture":"amd64","package":"libcap2","status":"install ok installed","version":"1:2.44-1ubuntu0.22.04.3"},{"architecture":"all","package":"libcapture-tiny-perl","status":"install ok installed","version":"0.48-1"},{"architecture":"amd64","package":"libcbor0.8","status":"install ok installed","version":"0.8.0-2ubuntu1"},{"architecture":"amd64","package":"libcc1-0","status":"install ok installed","version":"12.3.0-1ubuntu1~22.04.3"},{"architecture":"all","package":"libcgi-fast-perl","status":"install ok installed","version":"1:2.15-1"},{"architecture":"all","package":"libcgi-pm-perl","status":"install ok installed","version":"4.54-1"},{"architecture":"all","package":"libcgi-session-perl","status":"install ok installed","version":"4.48-3"},{"architecture":"all","package":"libclass-data-inheritable-perl","status":"install ok installed","version":"0.08-3"},{"architecture":"all","package":"libclass-method-modifiers-perl","status":"install ok installed","version":"2.13-1"},{"architecture":"amd64","package":"libclass-xsaccessor-perl","status":"install ok installed","version":"1.19-3build9"},{"architecture":"amd64","package":"libclone-perl","status":"install ok installed","version":"0.45-1build3"},{"architecture":"amd64","package":"libcolord2","status":"install ok installed","version":"1.4.6-1"},{"architecture":"amd64","package":"libcom-err2","status":"install ok installed","version":"1.46.5-2ubuntu1.2"},{"architecture":"amd64","package":"libcommon-sense-perl","status":"install ok installed","version":"3.75-2build1"},{"architecture":"all","package":"libconfig-tiny-perl","status":"install ok installed","version":"2.28-1"},{"architecture":"all","package":"libconst-fast-perl","status":"install ok installed","version":"0.014-1.1"},{"architecture":"all","package":"libcontextual-return-perl","status":"install ok installed","version":"0.004014-2"},{"architecture":"amd64","package":"libcpanel-json-xs-perl","status":"install ok installed","version":"4.27-1ubuntu0.2"},{"architecture":"amd64","package":"libcrypt-dev","status":"install ok installed","version":"1:4.4.27-1"},{"architecture":"amd64","package":"libcrypt1","status":"install ok installed","version":"1:4.4.27-1"},{"architecture":"amd64","package":"libcryptsetup12","status":"install ok installed","version":"2:2.4.3-1ubuntu1.3"},{"architecture":"amd64","package":"libctf-nobfd0","status":"install ok installed","version":"2.38-4ubuntu2.6"},{"architecture":"amd64","package":"libctf0","status":"install ok installed","version":"2.38-4ubuntu2.12"},{"architecture":"amd64","package":"libcups2","status":"install ok installed","version":"2.4.1op1-1ubuntu4.21"},{"architecture":"amd64","package":"libcups2-dev","status":"install ok installed","version":"2.4.1op1-1ubuntu4.21"},{"architecture":"amd64","package":"libcupsfilters-dev","status":"install ok installed","version":"1.28.15-0ubuntu1.5"},{"architecture":"amd64","package":"libcupsfilters1","status":"install ok installed","version":"1.28.15-0ubuntu1.5"},{"architecture":"amd64","package":"libcupsimage2","status":"install ok installed","version":"2.4.1op1-1ubuntu4.21"},{"architecture":"amd64","package":"libcupsimage2-dev","status":"install ok installed","version":"2.4.1op1-1ubuntu4.21"},{"architecture":"amd64","package":"libcurl3-gnutls","status":"install ok installed","version":"7.81.0-1ubuntu1.27"},{"architecture":"amd64","package":"libcurl4","status":"install ok installed","version":"7.81.0-1ubuntu1.27"},{"architecture":"amd64","package":"libcurl4-gnutls-dev","status":"install ok installed","version":"7.81.0-1ubuntu1.27"},{"architecture":"all","package":"libdata-dpath-perl","status":"install ok installed","version":"0.58-1"},{"architecture":"all","package":"libdata-dump-perl","status":"install ok installed","version":"1.25-1"},{"architecture":"amd64","package":"libdata-messagepack-perl","status":"install ok installed","version":"1.01-2build1"},{"architecture":"all","package":"libdata-optlist-perl","status":"install ok installed","version":"0.112-1"},{"architecture":"all","package":"libdata-validate-domain-perl","status":"install ok installed","version":"0.10-1.1"},{"architecture":"all","package":"libdata-validate-ip-perl","status":"install ok installed","version":"0.30-1"},{"architecture":"all","package":"libdata-validate-uri-perl","status":"install ok installed","version":"0.07-2"},{"architecture":"amd64","package":"libdatrie-dev","status":"install ok installed","version":"0.2.13-2"},{"architecture":"amd64","package":"libdatrie1","status":"install ok installed","version":"0.2.13-2"},{"architecture":"amd64","package":"libdb5.3","status":"install ok installed","version":"5.3.28+dfsg1-0.8ubuntu3"},{"architecture":"amd64","package":"libdbd-pg-perl","status":"install ok installed","version":"3.15.1-1"},{"architecture":"amd64","package":"libdbi-perl","status":"install ok installed","version":"1.643-3ubuntu0.1"},{"architecture":"amd64","package":"libdbus-1-3","status":"install ok installed","version":"1.12.20-2ubuntu4.1"},{"architecture":"amd64","package":"libdbus-1-dev","status":"install ok installed","version":"1.12.20-2ubuntu4.1"},{"architecture":"amd64","package":"libdconf1","status":"install ok installed","version":"0.40.0-3ubuntu0.1"},{"architecture":"amd64","package":"libdebconfclient0","status":"install ok installed","version":"0.261ubuntu1"},{"architecture":"all","package":"libdebhelper-perl","status":"install ok installed","version":"13.6ubuntu1"},{"architecture":"amd64","package":"libdeflate-dev","status":"install ok installed","version":"1.10-2"},{"architecture":"amd64","package":"libdeflate0","status":"install ok installed","version":"1.10-2"},{"architecture":"amd64","package":"libdevel-callchecker-perl","status":"install ok installed","version":"0.008-1ubuntu4"},{"architecture":"amd64","package":"libdevel-size-perl","status":"install ok installed","version":"0.83-1build4"},{"architecture":"all","package":"libdevel-stacktrace-perl","status":"install ok installed","version":"2.0400-1"},{"architecture":"amd64","package":"libdevmapper1.02.1","status":"install ok installed","version":"2:1.02.175-2.1ubuntu5"},{"architecture":"all","package":"libdistro-info-perl","status":"install ok installed","version":"1.1ubuntu0.2"},{"architecture":"all","package":"libdpkg-perl","status":"install ok installed","version":"1.21.1ubuntu2.6"},{"architecture":"amd64","package":"libdrm-amdgpu1","status":"install ok installed","version":"2.4.113-2~ubuntu0.22.04.1"},{"architecture":"all","package":"libdrm-common","status":"install ok installed","version":"2.4.113-2~ubuntu0.22.04.1"},{"architecture":"amd64","package":"libdrm-dev","status":"install ok installed","version":"2.4.113-2~ubuntu0.22.04.1"},{"architecture":"amd64","package":"libdrm-intel1","status":"install ok installed","version":"2.4.113-2~ubuntu0.22.04.1"},{"architecture":"amd64","package":"libdrm-nouveau2","status":"install ok installed","version":"2.4.113-2~ubuntu0.22.04.1"},{"architecture":"amd64","package":"libdrm-radeon1","status":"install ok installed","version":"2.4.113-2~ubuntu0.22.04.1"},{"architecture":"amd64","package":"libdrm2","status":"install ok installed","version":"2.4.113-2~ubuntu0.22.04.1"},{"architecture":"amd64","package":"libdw1","status":"install ok installed","version":"0.186-1ubuntu0.1"},{"architecture":"all","package":"libdynaloader-functions-perl","status":"install ok installed","version":"0.003-1.1"},{"architecture":"amd64","package":"libedit2","status":"install ok installed","version":"3.1-20210910-1build1"},{"architecture":"amd64","package":"libegl-dev","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libegl-mesa0","status":"install ok installed","version":"23.2.1-1ubuntu3.1~22.04.4"},{"architecture":"amd64","package":"libegl1","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libegl1-mesa-dev","status":"install ok installed","version":"23.2.1-1ubuntu3.1~22.04.4"},{"architecture":"amd64","package":"libelf-dev","status":"install ok installed","version":"0.186-1ubuntu0.1"},{"architecture":"amd64","package":"libelf1","status":"install ok installed","version":"0.186-1ubuntu0.1"},{"architecture":"amd64","package":"libemail-address-xs-perl","status":"install ok installed","version":"1.04-1build6"},{"architecture":"all","package":"libencode-locale-perl","status":"install ok installed","version":"1.05-1.1"},{"architecture":"amd64","package":"libepoxy-dev","status":"install ok installed","version":"1.5.10-1"},{"architecture":"amd64","package":"libepoxy0","status":"install ok installed","version":"1.5.10-1"},{"architecture":"all","package":"liberror-perl","status":"install ok installed","version":"0.17029-1"},{"architecture":"amd64","package":"libevdev-dev","status":"install ok installed","version":"1.12.1+dfsg-1"},{"architecture":"amd64","package":"libevdev2","status":"install ok installed","version":"1.12.1+dfsg-1"},{"architecture":"all","package":"libexception-class-perl","status":"install ok installed","version":"1.45-1"},{"architecture":"amd64","package":"libexpat1","status":"install ok installed","version":"2.4.7-1ubuntu0.7"},{"architecture":"amd64","package":"libexpat1-dev","status":"install ok installed","version":"2.4.7-1ubuntu0.7"},{"architecture":"all","package":"libexporter-tiny-perl","status":"install ok installed","version":"1.002002-1"},{"architecture":"amd64","package":"libext2fs2","status":"install ok installed","version":"1.46.5-2ubuntu1.2"},{"architecture":"amd64","package":"libfakeroot","status":"install ok installed","version":"1.28-1ubuntu1"},{"architecture":"amd64","package":"libfcgi-bin","status":"install ok installed","version":"2.4.2-2ubuntu0.1"},{"architecture":"amd64","package":"libfcgi-perl","status":"install ok installed","version":"0.82+ds-1build1"},{"architecture":"amd64","package":"libfcgi0ldbl","status":"install ok installed","version":"2.4.2-2ubuntu0.1"},{"architecture":"amd64","package":"libffi-dev","status":"install ok installed","version":"3.4.2-4"},{"architecture":"amd64","package":"libffi8","status":"install ok installed","version":"3.4.2-4"},{"architecture":"amd64","package":"libfido2-1","status":"install ok installed","version":"1.10.0-1"},{"architecture":"all","package":"libfile-basedir-perl","status":"install ok installed","version":"0.09-1"},{"architecture":"all","package":"libfile-chdir-perl","status":"install ok installed","version":"0.1008-1.1"},{"architecture":"all","package":"libfile-dirlist-perl","status":"install ok installed","version":"0.05-2"},{"architecture":"all","package":"libfile-find-rule-perl","status":"install ok installed","version":"0.34-1ubuntu0.22.04.1"},{"architecture":"all","package":"libfile-homedir-perl","status":"install ok installed","version":"1.006-1"},{"architecture":"all","package":"libfile-listing-perl","status":"install ok installed","version":"6.14-1"},{"architecture":"all","package":"libfile-stripnondeterminism-perl","status":"install ok installed","version":"1.13.0-1"},{"architecture":"all","package":"libfile-touch-perl","status":"install ok installed","version":"0.12-1"},{"architecture":"all","package":"libfile-which-perl","status":"install ok installed","version":"1.23-1"},{"architecture":"amd64","package":"libfl-dev","status":"install ok installed","version":"2.6.4-8build2"},{"architecture":"amd64","package":"libfl2","status":"install ok installed","version":"2.6.4-8build2"},{"architecture":"amd64","package":"libflac8","status":"install ok installed","version":"1.3.3-2ubuntu0.2"},{"architecture":"all","package":"libfont-afm-perl","status":"install ok installed","version":"1.20-3"},{"architecture":"all","package":"libfont-ttf-perl","status":"install ok installed","version":"1.06-1.1"},{"architecture":"amd64","package":"libfontconfig-dev","status":"install ok installed","version":"2.13.1-4.2ubuntu5"},{"architecture":"amd64","package":"libfontconfig1","status":"install ok installed","version":"2.13.1-4.2ubuntu5"},{"architecture":"amd64","package":"libfontconfig1-dev","status":"install ok installed","version":"2.13.1-4.2ubuntu5"},{"architecture":"amd64","package":"libfontenc1","status":"install ok installed","version":"1:1.1.4-1build3"},{"architecture":"amd64","package":"libfreetype-dev","status":"install ok installed","version":"2.11.1+dfsg-1ubuntu0.3"},{"architecture":"amd64","package":"libfreetype6","status":"install ok installed","version":"2.11.1+dfsg-1ubuntu0.3"},{"architecture":"amd64","package":"libfreetype6-dev","status":"install ok installed","version":"2.11.1+dfsg-1ubuntu0.3"},{"architecture":"all","package":"libfreezethaw-perl","status":"install ok installed","version":"0.5001-2.1"},{"architecture":"amd64","package":"libfribidi-dev","status":"install ok installed","version":"1.0.8-2ubuntu3.1"},{"architecture":"amd64","package":"libfribidi0","status":"install ok installed","version":"1.0.8-2ubuntu3.1"},{"architecture":"amd64","package":"libfsverity0","status":"install ok installed","version":"1.4-1~exp1build1"},{"architecture":"amd64","package":"libfuse2","status":"install ok installed","version":"2.9.9-5ubuntu3"},{"architecture":"amd64","package":"libgbm-dev","status":"install ok installed","version":"23.2.1-1ubuntu3.1~22.04.4"},{"architecture":"amd64","package":"libgbm1","status":"install ok installed","version":"23.2.1-1ubuntu3.1~22.04.4"},{"architecture":"amd64","package":"libgcc-11-dev","status":"install ok installed","version":"11.4.0-1ubuntu1~22.04"},{"architecture":"amd64","package":"libgcc-s1","status":"install ok installed","version":"12.3.0-1ubuntu1~22.04.3"},{"architecture":"amd64","package":"libgcrypt20","status":"install ok installed","version":"1.9.4-3ubuntu3"},{"architecture":"amd64","package":"libgdbm-compat4","status":"install ok installed","version":"1.23-1"},{"architecture":"amd64","package":"libgdbm6","status":"install ok installed","version":"1.23-1"},{"architecture":"amd64","package":"libgdk-pixbuf-2.0-0","status":"install ok installed","version":"2.42.8+dfsg-1ubuntu0.5"},{"architecture":"amd64","package":"libgdk-pixbuf-2.0-dev","status":"install ok installed","version":"2.42.8+dfsg-1ubuntu0.5"},{"architecture":"amd64","package":"libgdk-pixbuf2.0-bin","status":"install ok installed","version":"2.42.8+dfsg-1ubuntu0.5"},{"architecture":"all","package":"libgdk-pixbuf2.0-common","status":"install ok installed","version":"2.42.8+dfsg-1ubuntu0.5"},{"architecture":"amd64","package":"libgif7","status":"install ok installed","version":"5.1.9-2ubuntu0.3"},{"architecture":"amd64","package":"libgirepository-1.0-1","status":"install ok installed","version":"1.72.0-1"},{"architecture":"all","package":"libgit-wrapper-perl","status":"install ok installed","version":"0.048-1"},{"architecture":"all","package":"libgitlab-api-v4-perl","status":"install ok installed","version":"0.26-1"},{"architecture":"amd64","package":"libgl-dev","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libgl1","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libgl1-amber-dri","status":"install ok installed","version":"21.3.9-0ubuntu1~22.04.2"},{"architecture":"amd64","package":"libgl1-mesa-dri","status":"install ok installed","version":"23.2.1-1ubuntu3.1~22.04.4"},{"architecture":"amd64","package":"libglapi-mesa","status":"install ok installed","version":"23.2.1-1ubuntu3.1~22.04.4"},{"architecture":"amd64","package":"libgles-dev","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libgles1","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libgles2","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libglib2.0-0","status":"install ok installed","version":"2.72.4-0ubuntu2.9"},{"architecture":"amd64","package":"libglib2.0-bin","status":"install ok installed","version":"2.72.4-0ubuntu2.9"},{"architecture":"all","package":"libglib2.0-data","status":"install ok installed","version":"2.72.4-0ubuntu2.9"},{"architecture":"amd64","package":"libglib2.0-dev","status":"install ok installed","version":"2.72.4-0ubuntu2.9"},{"architecture":"amd64","package":"libglib2.0-dev-bin","status":"install ok installed","version":"2.72.4-0ubuntu2.9"},{"architecture":"amd64","package":"libglu1-mesa","status":"install ok installed","version":"9.0.2-1"},{"architecture":"amd64","package":"libglu1-mesa-dev","status":"install ok installed","version":"9.0.2-1"},{"architecture":"amd64","package":"libglvnd-core-dev","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libglvnd-dev","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libglvnd0","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libglx-dev","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libglx-mesa0","status":"install ok installed","version":"23.2.1-1ubuntu3.1~22.04.4"},{"architecture":"amd64","package":"libglx0","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libgmp10","status":"install ok installed","version":"2:6.2.1+dfsg-3ubuntu1"},{"architecture":"amd64","package":"libgnutls30","status":"install ok installed","version":"3.7.3-4ubuntu1.5"},{"architecture":"amd64","package":"libgomp1","status":"install ok installed","version":"12.3.0-1ubuntu1~22.04.3"},{"architecture":"amd64","package":"libgpg-error0","status":"install ok installed","version":"1.43-3"},{"architecture":"amd64","package":"libgpgme11","status":"install ok installed","version":"1.16.0-1.2ubuntu4.2"},{"architecture":"amd64","package":"libgraphene-1.0-0","status":"install ok installed","version":"1.10.8-1"},{"architecture":"amd64","package":"libgraphite2-3","status":"install ok installed","version":"1.3.14-1ubuntu0.1"},{"architecture":"amd64","package":"libgraphite2-dev","status":"install ok installed","version":"1.3.14-1ubuntu0.1"},{"architecture":"amd64","package":"libgssapi-krb5-2","status":"install ok installed","version":"1.19.2-2ubuntu0.8"},{"architecture":"amd64","package":"libgssrpc4","status":"install ok installed","version":"1.19.2-2ubuntu0.8"},{"architecture":"amd64","package":"libgtk-3-0","status":"install ok installed","version":"3.24.33-1ubuntu2.2"},{"architecture":"amd64","package":"libgtk-3-bin","status":"install ok installed","version":"3.24.33-1ubuntu2.2"},{"architecture":"all","package":"libgtk-3-common","status":"install ok installed","version":"3.24.33-1ubuntu2.2"},{"architecture":"amd64","package":"libgtk-3-dev","status":"install ok installed","version":"3.24.33-1ubuntu2.2"},{"architecture":"amd64","package":"libgudev-1.0-0","status":"install ok installed","version":"1:237-2build1"},{"architecture":"amd64","package":"libgudev-1.0-dev","status":"install ok installed","version":"1:237-2build1"},{"architecture":"amd64","package":"libharfbuzz-dev","status":"install ok installed","version":"2.7.4-1ubuntu3.2"},{"architecture":"amd64","package":"libharfbuzz-gobject0","status":"install ok installed","version":"2.7.4-1ubuntu3.2"},{"architecture":"amd64","package":"libharfbuzz-icu0","status":"install ok installed","version":"2.7.4-1ubuntu3.2"},{"architecture":"amd64","package":"libharfbuzz0b","status":"install ok installed","version":"2.7.4-1ubuntu3.2"},{"architecture":"amd64","package":"libhash-fieldhash-perl","status":"install ok installed","version":"0.15-1build5"},{"architecture":"amd64","package":"libhogweed6","status":"install ok installed","version":"3.7.3-1build2"},{"architecture":"all","package":"libhtml-form-perl","status":"install ok installed","version":"6.07-1"},{"architecture":"all","package":"libhtml-format-perl","status":"install ok installed","version":"2.12-1.1"},{"architecture":"all","package":"libhtml-html5-entities-perl","status":"install ok installed","version":"0.004-1.1"},{"architecture":"amd64","package":"libhtml-parser-perl","status":"install ok installed","version":"3.76-1ubuntu0.1"},{"architecture":"all","package":"libhtml-tagset-perl","status":"install ok installed","version":"3.20-4"},{"architecture":"all","package":"libhtml-tree-perl","status":"install ok installed","version":"5.07-2"},{"architecture":"all","package":"libhttp-cookies-perl","status":"install ok installed","version":"6.10-1"},{"architecture":"all","package":"libhttp-daemon-perl","status":"install ok installed","version":"6.13-1ubuntu0.2"},{"architecture":"all","package":"libhttp-date-perl","status":"install ok installed","version":"6.05-1ubuntu0.1"},{"architecture":"all","package":"libhttp-message-perl","status":"install ok installed","version":"6.36-1"},{"architecture":"all","package":"libhttp-negotiate-perl","status":"install ok installed","version":"6.01-1"},{"architecture":"all","package":"libhttp-tiny-multipart-perl","status":"install ok installed","version":"0.08-1.1"},{"architecture":"amd64","package":"libice-dev","status":"install ok installed","version":"2:1.0.10-1build2"},{"architecture":"amd64","package":"libice6","status":"install ok installed","version":"2:1.0.10-1build2"},{"architecture":"amd64","package":"libicu-dev","status":"install ok installed","version":"70.1-2"},{"architecture":"amd64","package":"libicu70","status":"install ok installed","version":"70.1-2"},{"architecture":"amd64","package":"libid3tag0","status":"install ok installed","version":"0.15.1b-14"},{"architecture":"amd64","package":"libidn12","status":"install ok installed","version":"1.38-4ubuntu1"},{"architecture":"amd64","package":"libidn2-0","status":"install ok installed","version":"2.3.2-2build1"},{"architecture":"amd64","package":"libigdgmm12","status":"install ok installed","version":"22.1.2+ds1-1"},{"architecture":"amd64","package":"libimlib2","status":"install ok installed","version":"1.7.4-1build1"},{"architecture":"all","package":"libimport-into-perl","status":"install ok installed","version":"1.002005-1"},{"architecture":"amd64","package":"libinput-bin","status":"install ok installed","version":"1.20.0-1ubuntu0.4"},{"architecture":"amd64","package":"libinput-dev","status":"install ok installed","version":"1.20.0-1ubuntu0.4"},{"architecture":"amd64","package":"libinput10","status":"install ok installed","version":"1.20.0-1ubuntu0.4"},{"architecture":"all","package":"libio-html-perl","status":"install ok installed","version":"1.004-2"},{"architecture":"all","package":"libio-interactive-perl","status":"install ok installed","version":"1.023-1"},{"architecture":"all","package":"libio-prompt-tiny-perl","status":"install ok installed","version":"0.003-1"},{"architecture":"all","package":"libio-prompter-perl","status":"install ok installed","version":"0.004015-1"},{"architecture":"amd64","package":"libio-pty-perl","status":"install ok installed","version":"1:1.15-2build2"},{"architecture":"all","package":"libio-socket-ssl-perl","status":"install ok installed","version":"2.074-2"},{"architecture":"all","package":"libio-string-perl","status":"install ok installed","version":"1.08-3.1"},{"architecture":"amd64","package":"libip4tc2","status":"install ok installed","version":"1.8.7-1ubuntu5.2"},{"architecture":"all","package":"libipc-run-perl","status":"install ok installed","version":"20200505.0-1"},{"architecture":"all","package":"libipc-run3-perl","status":"install ok installed","version":"0.048-2"},{"architecture":"all","package":"libipc-system-simple-perl","status":"install ok installed","version":"1.30-1"},{"architecture":"amd64","package":"libisl23","status":"install ok installed","version":"0.24-2build1"},{"architecture":"all","package":"libiterator-perl","status":"install ok installed","version":"0.03+ds1-1.1"},{"architecture":"all","package":"libiterator-util-perl","status":"install ok installed","version":"0.02+ds1-1.1"},{"architecture":"amd64","package":"libitm1","status":"install ok installed","version":"12.3.0-1ubuntu1~22.04.3"},{"architecture":"amd64","package":"libjbig-dev","status":"install ok installed","version":"2.1-3.1ubuntu0.22.04.1"},{"architecture":"amd64","package":"libjbig0","status":"install ok installed","version":"2.1-3.1ubuntu0.22.04.1"},{"architecture":"amd64","package":"libjpeg-dev","status":"install ok installed","version":"8c-2ubuntu10"},{"architecture":"amd64","package":"libjpeg-turbo8","status":"install ok installed","version":"2.1.2-0ubuntu1"},{"architecture":"amd64","package":"libjpeg-turbo8-dev","status":"install ok installed","version":"2.1.2-0ubuntu1"},{"architecture":"amd64","package":"libjpeg8","status":"install ok installed","version":"8c-2ubuntu10"},{"architecture":"amd64","package":"libjpeg8-dev","status":"install ok installed","version":"8c-2ubuntu10"},{"architecture":"amd64","package":"libjq1","status":"install ok installed","version":"1.6-2.1ubuntu3.2"},{"architecture":"all","package":"libjs-jquery","status":"install ok installed","version":"3.6.0+dfsg+~3.5.13-1"},{"architecture":"amd64","package":"libjson-c5","status":"install ok installed","version":"0.15-3~ubuntu1.22.04.2"},{"architecture":"all","package":"libjson-maybexs-perl","status":"install ok installed","version":"1.004003-1"},{"architecture":"all","package":"libjson-perl","status":"install ok installed","version":"4.04000-1"},{"architecture":"amd64","package":"libjson-xs-perl","status":"install ok installed","version":"4.040-0ubuntu0.22.04.1"},{"architecture":"amd64","package":"libjsoncpp25","status":"install ok installed","version":"1.9.5-3"},{"architecture":"amd64","package":"libk5crypto3","status":"install ok installed","version":"1.19.2-2ubuntu0.8"},{"architecture":"amd64","package":"libkadm5clnt-mit12","status":"install ok installed","version":"1.19.2-2ubuntu0.8"},{"architecture":"amd64","package":"libkadm5srv-mit12","status":"install ok installed","version":"1.19.2-2ubuntu0.8"},{"architecture":"amd64","package":"libkdb5-10","status":"install ok installed","version":"1.19.2-2ubuntu0.8"},{"architecture":"amd64","package":"libkeyutils1","status":"install ok installed","version":"1.6.1-2ubuntu3"},{"architecture":"amd64","package":"libkmod2","status":"install ok installed","version":"29-1ubuntu1.1"},{"architecture":"amd64","package":"libkrb5-3","status":"install ok installed","version":"1.19.2-2ubuntu0.8"},{"architecture":"amd64","package":"libkrb5-dev","status":"install ok installed","version":"1.19.2-2ubuntu0.8"},{"architecture":"amd64","package":"libkrb5support0","status":"install ok installed","version":"1.19.2-2ubuntu0.8"},{"architecture":"amd64","package":"libksba8","status":"install ok installed","version":"1.6.0-2ubuntu0.2"},{"architecture":"amd64","package":"liblcms2-2","status":"install ok installed","version":"2.12~rc1-2build2"},{"architecture":"amd64","package":"libldap-2.5-0","status":"install ok installed","version":"2.5.18+dfsg-0ubuntu0.22.04.2"},{"architecture":"all","package":"liblist-compare-perl","status":"install ok installed","version":"0.55-1"},{"architecture":"all","package":"liblist-moreutils-perl","status":"install ok installed","version":"0.430-2"},{"architecture":"amd64","package":"liblist-moreutils-xs-perl","status":"install ok installed","version":"0.430-2build2"},{"architecture":"all","package":"liblist-someutils-perl","status":"install ok installed","version":"0.58-1"},{"architecture":"amd64","package":"liblist-someutils-xs-perl","status":"install ok installed","version":"0.58-2build3"},{"architecture":"all","package":"liblist-utilsby-perl","status":"install ok installed","version":"0.11-1"},{"architecture":"amd64","package":"libllvm15","status":"install ok installed","version":"1:15.0.7-0ubuntu0.22.04.3"},{"architecture":"amd64","package":"liblocale-gettext-perl","status":"install ok installed","version":"1.07-4build3"},{"architecture":"all","package":"liblog-any-adapter-screen-perl","status":"install ok installed","version":"0.140-2"},{"architecture":"all","package":"liblog-any-perl","status":"install ok installed","version":"1.710-1"},{"architecture":"amd64","package":"liblsan0","status":"install ok installed","version":"12.3.0-1ubuntu1~22.04.3"},{"architecture":"amd64","package":"liblua5.3-0","status":"install ok installed","version":"5.3.6-1build1"},{"architecture":"all","package":"liblwp-mediatypes-perl","status":"install ok installed","version":"6.04-1"},{"architecture":"all","package":"liblwp-protocol-https-perl","status":"install ok installed","version":"6.10-1"},{"architecture":"amd64","package":"liblz4-1","status":"install ok installed","version":"1.9.3-2build2"},{"architecture":"amd64","package":"liblzma-dev","status":"install ok installed","version":"5.2.5-2ubuntu1.1"},{"architecture":"amd64","package":"liblzma5","status":"install ok installed","version":"5.2.5-2ubuntu1.1"},{"architecture":"amd64","package":"liblzo2-2","status":"install ok installed","version":"2.10-2build3"},{"architecture":"amd64","package":"libmagic-mgc","status":"install ok installed","version":"1:5.41-3ubuntu0.1"},{"architecture":"amd64","package":"libmagic1","status":"install ok installed","version":"1:5.41-3ubuntu0.1"},{"architecture":"all","package":"libmail-sendmail-perl","status":"install ok installed","version":"0.80-1.1"},{"architecture":"all","package":"libmailtools-perl","status":"install ok installed","version":"2.21-1"},{"architecture":"amd64","package":"libmarkdown2","status":"install ok installed","version":"2.2.7-2"},{"architecture":"all","package":"libmath-base85-perl","status":"install ok installed","version":"0.5+dfsg-1"},{"architecture":"amd64","package":"libmd0","status":"install ok installed","version":"1.0.4-1build1"},{"architecture":"all","package":"libmodule-implementation-perl","status":"install ok installed","version":"0.09-1.1"},{"architecture":"all","package":"libmodule-runtime-perl","status":"install ok installed","version":"0.016-1"},{"architecture":"all","package":"libmoo-perl","status":"install ok installed","version":"2.005004-3"},{"architecture":"all","package":"libmoox-aliases-perl","status":"install ok installed","version":"0.001006-1.1"},{"architecture":"all","package":"libmoox-struct-perl","status":"install ok installed","version":"0.020-1"},{"architecture":"amd64","package":"libmount-dev","status":"install ok installed","version":"2.37.2-4ubuntu3.6"},{"architecture":"amd64","package":"libmount1","status":"install ok installed","version":"2.37.2-4ubuntu3.6"},{"architecture":"amd64","package":"libmouse-perl","status":"install ok installed","version":"2.5.10-1build4"},{"architecture":"amd64","package":"libmpc3","status":"install ok installed","version":"1.2.1-2build1"},{"architecture":"amd64","package":"libmpdec3","status":"install ok installed","version":"2.5.1-2build2"},{"architecture":"amd64","package":"libmpfr6","status":"install ok installed","version":"4.1.0-3build3"},{"architecture":"amd64","package":"libmtdev-dev","status":"install ok installed","version":"1.1.6-1build4"},{"architecture":"amd64","package":"libmtdev1","status":"install ok installed","version":"1.1.6-1build4"},{"architecture":"all","package":"libnamespace-autoclean-perl","status":"install ok installed","version":"0.29-1"},{"architecture":"all","package":"libnamespace-clean-perl","status":"install ok installed","version":"0.27-1"},{"architecture":"amd64","package":"libncurses6","status":"install ok installed","version":"6.3-2ubuntu0.3"},{"architecture":"amd64","package":"libncursesw6","status":"install ok installed","version":"6.3-2ubuntu0.3"},{"architecture":"all","package":"libnet-domain-tld-perl","status":"install ok installed","version":"1.75-1.1"},{"architecture":"all","package":"libnet-http-perl","status":"install ok installed","version":"6.22-1"},{"architecture":"all","package":"libnet-ipv6addr-perl","status":"install ok installed","version":"1.02-1"},{"architecture":"all","package":"libnet-netmask-perl","status":"install ok installed","version":"2.0001-1"},{"architecture":"all","package":"libnet-smtp-ssl-perl","status":"install ok installed","version":"1.04-1"},{"architecture":"amd64","package":"libnet-ssleay-perl","status":"install ok installed","version":"1.92-1build2"},{"architecture":"amd64","package":"libnetaddr-ip-perl","status":"install ok installed","version":"4.079+dfsg-1build7"},{"architecture":"amd64","package":"libnettle8","status":"install ok installed","version":"3.7.3-1build2"},{"architecture":"amd64","package":"libnghttp2-14","status":"install ok installed","version":"1.43.0-1ubuntu0.2"},{"architecture":"amd64","package":"libnpth0","status":"install ok installed","version":"1.6-3build2"},{"architecture":"amd64","package":"libnsl-dev","status":"install ok installed","version":"1.3.0-2build2"},{"architecture":"amd64","package":"libnsl2","status":"install ok installed","version":"1.3.0-2build2"},{"architecture":"amd64","package":"libnspr4","status":"install ok installed","version":"2:4.35-0ubuntu0.22.04.1"},{"architecture":"amd64","package":"libnspr4-dev","status":"install ok installed","version":"2:4.35-0ubuntu0.22.04.1"},{"architecture":"amd64","package":"libnss-systemd","status":"install ok installed","version":"249.11-0ubuntu3.22"},{"architecture":"amd64","package":"libnss3","status":"install ok installed","version":"2:3.98-0ubuntu0.22.04.4"},{"architecture":"amd64","package":"libnss3-dev","status":"install ok installed","version":"2:3.98-0ubuntu0.22.04.4"},{"architecture":"all","package":"libnumber-compare-perl","status":"install ok installed","version":"0.03-2"},{"architecture":"all","package":"libobject-id-perl","status":"install ok installed","version":"0.1.2-2.1ubuntu1"},{"architecture":"amd64","package":"libobrender32v5","status":"install ok installed","version":"3.6.1-10"},{"architecture":"amd64","package":"libobt2v5","status":"install ok installed","version":"3.6.1-10"},{"architecture":"amd64","package":"libogg0","status":"install ok installed","version":"1.3.5-0ubuntu3"},{"architecture":"amd64","package":"libonig5","status":"install ok installed","version":"6.9.7.1-2build1"},{"architecture":"amd64","package":"libopengl-dev","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libopengl0","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libopus0","status":"install ok installed","version":"1.3.1-0.1build2"},{"architecture":"amd64","package":"libp11-kit0","status":"install ok installed","version":"0.24.0-6build1"},{"architecture":"all","package":"libpackage-stash-perl","status":"install ok installed","version":"0.39-1"},{"architecture":"amd64","package":"libpackage-stash-xs-perl","status":"install ok installed","version":"0.29-1build5"},{"architecture":"amd64","package":"libpam-modules","status":"install ok installed","version":"1.4.0-11ubuntu2.4"},{"architecture":"amd64","package":"libpam-modules-bin","status":"install ok installed","version":"1.4.0-11ubuntu2.4"},{"architecture":"all","package":"libpam-runtime","status":"install ok installed","version":"1.4.0-11ubuntu2.4"},{"architecture":"amd64","package":"libpam-systemd","status":"install ok installed","version":"249.11-0ubuntu3.22"},{"architecture":"amd64","package":"libpam0g","status":"install ok installed","version":"1.4.0-11ubuntu2.8"},{"architecture":"amd64","package":"libpam0g-dev","status":"install ok installed","version":"1.4.0-11ubuntu2.8"},{"architecture":"amd64","package":"libpango-1.0-0","status":"install ok installed","version":"1.50.6+ds-2ubuntu1"},{"architecture":"amd64","package":"libpango1.0-dev","status":"install ok installed","version":"1.50.6+ds-2ubuntu1"},{"architecture":"amd64","package":"libpangocairo-1.0-0","status":"install ok installed","version":"1.50.6+ds-2ubuntu1"},{"architecture":"amd64","package":"libpangoft2-1.0-0","status":"install ok installed","version":"1.50.6+ds-2ubuntu1"},{"architecture":"amd64","package":"libpangoxft-1.0-0","status":"install ok installed","version":"1.50.6+ds-2ubuntu1"},{"architecture":"amd64","package":"libparams-classify-perl","status":"install ok installed","version":"0.015-1build5"},{"architecture":"amd64","package":"libparams-util-perl","status":"install ok installed","version":"1.102-1build3"},{"architecture":"all","package":"libpath-iterator-rule-perl","status":"install ok installed","version":"1.015-1"},{"architecture":"all","package":"libpath-tiny-perl","status":"install ok installed","version":"0.122-1"},{"architecture":"amd64","package":"libpci-dev","status":"install ok installed","version":"1:3.7.0-6"},{"architecture":"amd64","package":"libpci3","status":"install ok installed","version":"1:3.7.0-6"},{"architecture":"amd64","package":"libpciaccess-dev","status":"install ok installed","version":"0.16-3"},{"architecture":"amd64","package":"libpciaccess0","status":"install ok installed","version":"0.16-3"},{"architecture":"amd64","package":"libpcre16-3","status":"install ok installed","version":"2:8.39-13ubuntu0.22.04.1"},{"architecture":"amd64","package":"libpcre2-16-0","status":"install ok installed","version":"10.39-3ubuntu0.1"},{"architecture":"amd64","package":"libpcre2-32-0","status":"install ok installed","version":"10.39-3ubuntu0.1"},{"architecture":"amd64","package":"libpcre2-8-0","status":"install ok installed","version":"10.39-3ubuntu0.1"},{"architecture":"amd64","package":"libpcre2-dev","status":"install ok installed","version":"10.39-3ubuntu0.1"},{"architecture":"amd64","package":"libpcre2-posix3","status":"install ok installed","version":"10.39-3ubuntu0.1"},{"architecture":"amd64","package":"libpcre3","status":"install ok installed","version":"2:8.39-13ubuntu0.22.04.1"},{"architecture":"amd64","package":"libpcre3-dev","status":"install ok installed","version":"2:8.39-13ubuntu0.22.04.1"},{"architecture":"amd64","package":"libpcre32-3","status":"install ok installed","version":"2:8.39-13ubuntu0.22.04.1"},{"architecture":"amd64","package":"libpcrecpp0v5","status":"install ok installed","version":"2:8.39-13ubuntu0.22.04.1"},{"architecture":"amd64","package":"libpcsclite1","status":"install ok installed","version":"1.9.5-3ubuntu1"},{"architecture":"amd64","package":"libperl5.34","status":"install ok installed","version":"5.34.0-3ubuntu1.9"},{"architecture":"amd64","package":"libperlio-gzip-perl","status":"install ok installed","version":"0.19-1build8"},{"architecture":"amd64","package":"libperlio-utf8-strict-perl","status":"install ok installed","version":"0.009-1build1"},{"architecture":"amd64","package":"libpipeline1","status":"install ok installed","version":"1.5.5-1"},{"architecture":"amd64","package":"libpixman-1-0","status":"install ok installed","version":"0.40.0-1ubuntu0.22.04.1"},{"architecture":"amd64","package":"libpixman-1-dev","status":"install ok installed","version":"0.40.0-1ubuntu0.22.04.1"},{"architecture":"amd64","package":"libpkgconf3","status":"install ok installed","version":"1.8.0-1"},{"architecture":"amd64","package":"libpng-dev","status":"install ok installed","version":"1.6.37-3ubuntu0.6"},{"architecture":"amd64","package":"libpng-tools","status":"install ok installed","version":"1.6.37-3ubuntu0.6"},{"architecture":"amd64","package":"libpng16-16","status":"install ok installed","version":"1.6.37-3ubuntu0.6"},{"architecture":"all","package":"libpod-constants-perl","status":"install ok installed","version":"0.19-2"},{"architecture":"all","package":"libpod-parser-perl","status":"install ok installed","version":"1.63-2"},{"architecture":"amd64","package":"libpopt0","status":"install ok installed","version":"1.18-3build1"},{"architecture":"amd64","package":"libpq5","status":"install ok installed","version":"14.24-0ubuntu0.22.04.1"},{"architecture":"amd64","package":"libproc-processtable-perl","status":"install ok installed","version":"0.634-1build1"},{"architecture":"amd64","package":"libprocps8","status":"install ok installed","version":"2:3.3.17-6ubuntu2.1"},{"architecture":"amd64","package":"libpsl5","status":"install ok installed","version":"0.21.0-1.2build2"},{"architecture":"amd64","package":"libpthread-stubs0-dev","status":"install ok installed","version":"0.4-1build2"},{"architecture":"amd64","package":"libpulse-dev","status":"install ok installed","version":"1:15.99.1+dfsg1-1ubuntu2.2"},{"architecture":"amd64","package":"libpulse-mainloop-glib0","status":"install ok installed","version":"1:15.99.1+dfsg1-1ubuntu2.2"},{"architecture":"amd64","package":"libpulse0","status":"install ok installed","version":"1:15.99.1+dfsg1-1ubuntu2.2"},{"architecture":"amd64","package":"libpython3-stdlib","status":"install ok installed","version":"3.10.6-1~22.04.1"},{"architecture":"amd64","package":"libpython3.10-minimal","status":"install ok installed","version":"3.10.12-1~22.04.6"},{"architecture":"amd64","package":"libpython3.10-stdlib","status":"install ok installed","version":"3.10.12-1~22.04.6"},{"architecture":"amd64","package":"libquadmath0","status":"install ok installed","version":"12.3.0-1ubuntu1~22.04.3"},{"architecture":"amd64","package":"libre-engine-re2-perl","status":"install ok installed","version":"0.14-1build2"},{"architecture":"amd64","package":"libre2-9","status":"install ok installed","version":"20220201+dfsg-1"},{"architecture":"amd64","package":"libreadline8","status":"install ok installed","version":"8.1.2-1"},{"architecture":"all","package":"libreadonly-perl","status":"install ok installed","version":"2.050-3"},{"architecture":"all","package":"libref-util-perl","status":"install ok installed","version":"0.204-1"},{"architecture":"amd64","package":"libref-util-xs-perl","status":"install ok installed","version":"0.117-1build5"},{"architecture":"all","package":"libregexp-pattern-license-perl","status":"install ok installed","version":"3.9.3-1"},{"architecture":"all","package":"libregexp-pattern-perl","status":"install ok installed","version":"0.2.14-1"},{"architecture":"amd64","package":"librhash0","status":"install ok installed","version":"1.4.2-1ubuntu1"},{"architecture":"all","package":"librole-tiny-perl","status":"install ok installed","version":"2.002004-1"},{"architecture":"amd64","package":"librpm9","status":"install ok installed","version":"4.17.0+dfsg1-4build1"},{"architecture":"amd64","package":"librpmbuild9","status":"install ok installed","version":"4.17.0+dfsg1-4build1"},{"architecture":"amd64","package":"librpmio9","status":"install ok installed","version":"4.17.0+dfsg1-4build1"},{"architecture":"amd64","package":"librpmsign9","status":"install ok installed","version":"4.17.0+dfsg1-4build1"},{"architecture":"amd64","package":"librsvg2-2","status":"install ok installed","version":"2.52.5+dfsg-3ubuntu0.2"},{"architecture":"amd64","package":"librsvg2-common","status":"install ok installed","version":"2.52.5+dfsg-3ubuntu0.2"},{"architecture":"amd64","package":"librtmp1","status":"install ok installed","version":"2.4+20151223.gitfa8646d.1-2build4"},{"architecture":"amd64","package":"libruby3.0","status":"install ok installed","version":"3.0.2-7ubuntu2.13"},{"architecture":"amd64","package":"libsasl2-2","status":"install ok installed","version":"2.1.27+dfsg2-3ubuntu1.2"},{"architecture":"amd64","package":"libsasl2-modules-db","status":"install ok installed","version":"2.1.27+dfsg2-3ubuntu1.2"},{"architecture":"amd64","package":"libsctp-dev","status":"install ok installed","version":"1.0.19+dfsg-1build1"},{"architecture":"amd64","package":"libsctp1","status":"install ok installed","version":"1.0.19+dfsg-1build1"},{"architecture":"amd64","package":"libseccomp2","status":"install ok installed","version":"2.5.3-2ubuntu2"},{"architecture":"amd64","package":"libselinux1","status":"install ok installed","version":"3.3-1build2"},{"architecture":"amd64","package":"libselinux1-dev","status":"install ok installed","version":"3.3-1build2"},{"architecture":"all","package":"libsemanage-common","status":"install ok installed","version":"3.3-1build2"},{"architecture":"amd64","package":"libsemanage2","status":"install ok installed","version":"3.3-1build2"},{"architecture":"all","package":"libsensors-config","status":"install ok installed","version":"1:3.6.0-7ubuntu1"},{"architecture":"amd64","package":"libsensors5","status":"install ok installed","version":"1:3.6.0-7ubuntu1"},{"architecture":"amd64","package":"libsepol-dev","status":"install ok installed","version":"3.3-1build1"},{"architecture":"amd64","package":"libsepol2","status":"install ok installed","version":"3.3-1build1"},{"architecture":"amd64","package":"libsereal-decoder-perl","status":"install ok installed","version":"4.023+ds-1"},{"architecture":"amd64","package":"libsereal-encoder-perl","status":"install ok installed","version":"4.023+ds-1"},{"architecture":"amd64","package":"libserf-1-1","status":"install ok installed","version":"1.3.9-10ubuntu2"},{"architecture":"all","package":"libset-intspan-perl","status":"install ok installed","version":"1.19-2"},{"architecture":"all","package":"libset-scalar-perl","status":"install ok installed","version":"1.29-2"},{"architecture":"amd64","package":"libsigsegv2","status":"install ok installed","version":"2.13-1ubuntu3"},{"architecture":"amd64","package":"libsm-dev","status":"install ok installed","version":"2:1.2.3-1build2"},{"architecture":"amd64","package":"libsm6","status":"install ok installed","version":"2:1.2.3-1build2"},{"architecture":"amd64","package":"libsmartcols1","status":"install ok installed","version":"2.37.2-4ubuntu3.4"},{"architecture":"amd64","package":"libsndfile1","status":"install ok installed","version":"1.0.31-2ubuntu0.2"},{"architecture":"amd64","package":"libsocket6-perl","status":"install ok installed","version":"0.29-1build4"},{"architecture":"all","package":"libsort-versions-perl","status":"install ok installed","version":"1.62-1"},{"architecture":"amd64","package":"libspeechd-dev","status":"install ok installed","version":"0.11.1-1ubuntu3"},{"architecture":"amd64","package":"libspeechd2","status":"install ok installed","version":"0.11.1-1ubuntu3"},{"architecture":"amd64","package":"libsqlite3-0","status":"install ok installed","version":"3.37.2-2ubuntu0.7"},{"architecture":"amd64","package":"libsqlite3-dev","status":"install ok installed","version":"3.37.2-2ubuntu0.7"},{"architecture":"amd64","package":"libss2","status":"install ok installed","version":"1.46.5-2ubuntu1.2"},{"architecture":"amd64","package":"libssh-4","status":"install ok installed","version":"0.9.6-2ubuntu0.22.04.3"},{"architecture":"amd64","package":"libssl-dev","status":"install ok installed","version":"3.0.2-0ubuntu1.29"},{"architecture":"amd64","package":"libssl3","status":"install ok installed","version":"3.0.2-0ubuntu1.29"},{"architecture":"amd64","package":"libstartup-notification0","status":"install ok installed","version":"0.12-6build2"},{"architecture":"amd64","package":"libstdc++-11-dev","status":"install ok installed","version":"11.4.0-1ubuntu1~22.04"},{"architecture":"amd64","package":"libstdc++6","status":"install ok installed","version":"12.3.0-1ubuntu1~22.04.3"},{"architecture":"all","package":"libstrictures-perl","status":"install ok installed","version":"2.000006-1"},{"architecture":"all","package":"libstring-copyright-perl","status":"install ok installed","version":"0.003012-1"},{"architecture":"all","package":"libstring-escape-perl","status":"install ok installed","version":"2010.002-2"},{"architecture":"all","package":"libstring-shellquote-perl","status":"install ok installed","version":"1.04-1"},{"architecture":"all","package":"libsub-exporter-perl","status":"install ok installed","version":"0.988-1"},{"architecture":"all","package":"libsub-exporter-progressive-perl","status":"install ok installed","version":"0.001013-1"},{"architecture":"amd64","package":"libsub-identify-perl","status":"install ok installed","version":"0.14-1build5"},{"architecture":"all","package":"libsub-install-perl","status":"install ok installed","version":"0.928-1.1"},{"architecture":"amd64","package":"libsub-name-perl","status":"install ok installed","version":"0.26-1build3"},{"architecture":"all","package":"libsub-override-perl","status":"install ok installed","version":"0.09-2"},{"architecture":"all","package":"libsub-quote-perl","status":"install ok installed","version":"2.006006-1"},{"architecture":"amd64","package":"libsvn1","status":"install ok installed","version":"1.14.1-3ubuntu0.22.04.1"},{"architecture":"amd64","package":"libsyntax-keyword-try-perl","status":"install ok installed","version":"0.26-1build1"},{"architecture":"all","package":"libsys-hostname-long-perl","status":"install ok installed","version":"1.5-2"},{"architecture":"amd64","package":"libsystemd-dev","status":"install ok installed","version":"249.11-0ubuntu3.22"},{"architecture":"amd64","package":"libsystemd0","status":"install ok installed","version":"249.11-0ubuntu3.22"},{"architecture":"amd64","package":"libtasn1-6","status":"install ok installed","version":"4.18.0-4build1"},{"architecture":"amd64","package":"libterm-readkey-perl","status":"install ok installed","version":"2.38-1build4"},{"architecture":"all","package":"libtext-glob-perl","status":"install ok installed","version":"0.11-2"},{"architecture":"amd64","package":"libtext-levenshteinxs-perl","status":"install ok installed","version":"0.03-4build10"},{"architecture":"amd64","package":"libtext-markdown-discount-perl","status":"install ok installed","version":"0.13-1build1"},{"architecture":"amd64","package":"libtext-xslate-perl","status":"install ok installed","version":"3.5.9-1build1"},{"architecture":"all","package":"libthai-data","status":"install ok installed","version":"0.1.29-1build1"},{"architecture":"amd64","package":"libthai-dev","status":"install ok installed","version":"0.1.29-1build1"},{"architecture":"amd64","package":"libthai0","status":"install ok installed","version":"0.1.29-1build1"},{"architecture":"amd64","package":"libtiff-dev","status":"install ok installed","version":"4.3.0-6ubuntu0.13"},{"architecture":"amd64","package":"libtiff5","status":"install ok installed","version":"4.3.0-6ubuntu0.13"},{"architecture":"amd64","package":"libtiffxx5","status":"install ok installed","version":"4.3.0-6ubuntu0.13"},{"architecture":"all","package":"libtime-duration-perl","status":"install ok installed","version":"1.21-1"},{"architecture":"amd64","package":"libtime-moment-perl","status":"install ok installed","version":"0.44-1build6"},{"architecture":"all","package":"libtimedate-perl","status":"install ok installed","version":"2.3300-2"},{"architecture":"amd64","package":"libtinfo6","status":"install ok installed","version":"6.3-2ubuntu0.3"},{"architecture":"all","package":"libtirpc-common","status":"install ok installed","version":"1.3.2-2ubuntu0.1"},{"architecture":"amd64","package":"libtirpc-dev","status":"install ok installed","version":"1.3.2-2ubuntu0.1"},{"architecture":"amd64","package":"libtirpc3","status":"install ok installed","version":"1.3.2-2ubuntu0.1"},{"architecture":"all","package":"libtool","status":"install ok installed","version":"2.4.6-15build2"},{"architecture":"all","package":"libtry-tiny-perl","status":"install ok installed","version":"0.31-1"},{"architecture":"amd64","package":"libtsan0","status":"install ok installed","version":"11.4.0-1ubuntu1~22.04"},{"architecture":"all","package":"libtype-tiny-perl","status":"install ok installed","version":"1.012004-1"},{"architecture":"amd64","package":"libtype-tiny-xs-perl","status":"install ok installed","version":"0.022-1build2"},{"architecture":"all","package":"libtypes-serialiser-perl","status":"install ok installed","version":"1.01-1"},{"architecture":"amd64","package":"libubsan1","status":"install ok installed","version":"12.3.0-1ubuntu1~22.04.3"},{"architecture":"amd64","package":"libuchardet0","status":"install ok installed","version":"0.0.7-1build2"},{"architecture":"amd64","package":"libudev-dev","status":"install ok installed","version":"249.11-0ubuntu3.22"},{"architecture":"amd64","package":"libudev1","status":"install ok installed","version":"249.11-0ubuntu3.22"},{"architecture":"amd64","package":"libunicode-utf8-perl","status":"install ok installed","version":"0.62-1build4"},{"architecture":"amd64","package":"libunistring2","status":"install ok installed","version":"1.0-1"},{"architecture":"amd64","package":"libunwind8","status":"install ok installed","version":"1.3.2-2build2.1"},{"architecture":"all","package":"liburi-perl","status":"install ok installed","version":"5.10-1"},{"architecture":"amd64","package":"libutf8proc2","status":"install ok installed","version":"2.7.0-3"},{"architecture":"amd64","package":"libuuid1","status":"install ok installed","version":"2.37.2-4ubuntu3.6"},{"architecture":"amd64","package":"libuv1","status":"install ok installed","version":"1.43.0-1ubuntu0.1"},{"architecture":"amd64","package":"libva-dev","status":"install ok installed","version":"2.14.0-1"},{"architecture":"amd64","package":"libva-drm2","status":"install ok installed","version":"2.14.0-1"},{"architecture":"amd64","package":"libva-glx2","status":"install ok installed","version":"2.14.0-1"},{"architecture":"amd64","package":"libva-wayland2","status":"install ok installed","version":"2.14.0-1"},{"architecture":"amd64","package":"libva-x11-2","status":"install ok installed","version":"2.14.0-1"},{"architecture":"amd64","package":"libva2","status":"install ok installed","version":"2.14.0-1"},{"architecture":"amd64","package":"libvariable-magic-perl","status":"install ok installed","version":"0.62-1build5"},{"architecture":"amd64","package":"libvorbis0a","status":"install ok installed","version":"1.3.7-1build2"},{"architecture":"amd64","package":"libvorbisenc2","status":"install ok installed","version":"1.3.7-1build2"},{"architecture":"amd64","package":"libvulkan-dev","status":"install ok installed","version":"1.3.204.1-2"},{"architecture":"amd64","package":"libvulkan1","status":"install ok installed","version":"1.3.204.1-2"},{"architecture":"amd64","package":"libwacom-bin","status":"install ok installed","version":"2.2.0-1"},{"architecture":"all","package":"libwacom-common","status":"install ok installed","version":"2.2.0-1"},{"architecture":"amd64","package":"libwacom-dev","status":"install ok installed","version":"2.2.0-1"},{"architecture":"amd64","package":"libwacom9","status":"install ok installed","version":"2.2.0-1"},{"architecture":"amd64","package":"libwant-perl","status":"install ok installed","version":"0.29-1build7"},{"architecture":"amd64","package":"libwayland-bin","status":"install ok installed","version":"1.20.0-1ubuntu0.1"},{"architecture":"amd64","package":"libwayland-client0","status":"install ok installed","version":"1.20.0-1ubuntu0.1"},{"architecture":"amd64","package":"libwayland-cursor0","status":"install ok installed","version":"1.20.0-1ubuntu0.1"},{"architecture":"amd64","package":"libwayland-dev","status":"install ok installed","version":"1.20.0-1ubuntu0.1"},{"architecture":"amd64","package":"libwayland-egl1","status":"install ok installed","version":"1.20.0-1ubuntu0.1"},{"architecture":"amd64","package":"libwayland-server0","status":"install ok installed","version":"1.20.0-1ubuntu0.1"},{"architecture":"amd64","package":"libwebp7","status":"install ok installed","version":"1.2.2-2ubuntu0.22.04.2"},{"architecture":"all","package":"libwww-perl","status":"install ok installed","version":"6.61-1ubuntu0.1"},{"architecture":"all","package":"libwww-robotrules-perl","status":"install ok installed","version":"6.02-1"},{"architecture":"amd64","package":"libx11-6","status":"install ok installed","version":"2:1.7.5-1ubuntu0.3"},{"architecture":"all","package":"libx11-data","status":"install ok installed","version":"2:1.7.5-1ubuntu0.3"},{"architecture":"amd64","package":"libx11-dev","status":"install ok installed","version":"2:1.7.5-1ubuntu0.3"},{"architecture":"amd64","package":"libx11-xcb1","status":"install ok installed","version":"2:1.7.5-1ubuntu0.3"},{"architecture":"amd64","package":"libxau-dev","status":"install ok installed","version":"1:1.0.9-1build5"},{"architecture":"amd64","package":"libxau6","status":"install ok installed","version":"1:1.0.9-1build5"},{"architecture":"amd64","package":"libxaw7","status":"install ok installed","version":"2:1.0.14-1"},{"architecture":"amd64","package":"libxcb-dri2-0","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb-dri3-0","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb-glx0","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb-present0","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb-randr0","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb-render0","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb-render0-dev","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb-shape0","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb-shm0","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb-shm0-dev","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb-sync1","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb-util1","status":"install ok installed","version":"0.4.0-1build2"},{"architecture":"amd64","package":"libxcb-xfixes0","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb1","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcb1-dev","status":"install ok installed","version":"1.14-3ubuntu3"},{"architecture":"amd64","package":"libxcomposite-dev","status":"install ok installed","version":"1:0.4.5-1build2"},{"architecture":"amd64","package":"libxcomposite1","status":"install ok installed","version":"1:0.4.5-1build2"},{"architecture":"amd64","package":"libxcursor-dev","status":"install ok installed","version":"1:1.2.0-2build4"},{"architecture":"amd64","package":"libxcursor1","status":"install ok installed","version":"1:1.2.0-2build4"},{"architecture":"amd64","package":"libxcvt0","status":"install ok installed","version":"0.1.1-3"},{"architecture":"amd64","package":"libxdamage-dev","status":"install ok installed","version":"1:1.1.5-2build2"},{"architecture":"amd64","package":"libxdamage1","status":"install ok installed","version":"1:1.1.5-2build2"},{"architecture":"amd64","package":"libxdmcp-dev","status":"install ok installed","version":"1:1.1.3-0ubuntu5"},{"architecture":"amd64","package":"libxdmcp6","status":"install ok installed","version":"1:1.1.3-0ubuntu5"},{"architecture":"amd64","package":"libxext-dev","status":"install ok installed","version":"2:1.3.4-1build1"},{"architecture":"amd64","package":"libxext6","status":"install ok installed","version":"2:1.3.4-1build1"},{"architecture":"amd64","package":"libxfixes-dev","status":"install ok installed","version":"1:6.0.0-1"},{"architecture":"amd64","package":"libxfixes3","status":"install ok installed","version":"1:6.0.0-1"},{"architecture":"amd64","package":"libxfont2","status":"install ok installed","version":"1:2.0.5-1ubuntu0.2"},{"architecture":"amd64","package":"libxft-dev","status":"install ok installed","version":"2.3.4-1"},{"architecture":"amd64","package":"libxft2","status":"install ok installed","version":"2.3.4-1"},{"architecture":"amd64","package":"libxi-dev","status":"install ok installed","version":"2:1.8-1build1"},{"architecture":"amd64","package":"libxi6","status":"install ok installed","version":"2:1.8-1build1"},{"architecture":"amd64","package":"libxinerama-dev","status":"install ok installed","version":"2:1.1.4-3"},{"architecture":"amd64","package":"libxinerama1","status":"install ok installed","version":"2:1.1.4-3"},{"architecture":"amd64","package":"libxkbcommon-dev","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libxkbcommon0","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"libxkbfile1","status":"install ok installed","version":"1:1.1.0-1build3"},{"architecture":"amd64","package":"libxml-libxml-perl","status":"install ok installed","version":"2.0207+dfsg+really+2.0134-1"},{"architecture":"all","package":"libxml-namespacesupport-perl","status":"install ok installed","version":"1.12-1.1"},{"architecture":"amd64","package":"libxml-parser-perl","status":"install ok installed","version":"2.46-3ubuntu0.1"},{"architecture":"all","package":"libxml-sax-base-perl","status":"install ok installed","version":"1.09-1.1"},{"architecture":"all","package":"libxml-sax-expat-perl","status":"install ok installed","version":"0.51-1"},{"architecture":"all","package":"libxml-sax-perl","status":"install ok installed","version":"1.02+dfsg-3"},{"architecture":"amd64","package":"libxml2","status":"install ok installed","version":"2.9.13+dfsg-1ubuntu0.12"},{"architecture":"amd64","package":"libxml2-dev","status":"install ok installed","version":"2.9.13+dfsg-1ubuntu0.12"},{"architecture":"amd64","package":"libxmu6","status":"install ok installed","version":"2:1.1.3-3"},{"architecture":"amd64","package":"libxmuu1","status":"install ok installed","version":"2:1.1.3-3"},{"architecture":"amd64","package":"libxpm4","status":"install ok installed","version":"1:3.5.12-1ubuntu0.22.04.3"},{"architecture":"amd64","package":"libxrandr-dev","status":"install ok installed","version":"2:1.5.2-1build1"},{"architecture":"amd64","package":"libxrandr2","status":"install ok installed","version":"2:1.5.2-1build1"},{"architecture":"amd64","package":"libxrender-dev","status":"install ok installed","version":"1:0.9.10-1build4"},{"architecture":"amd64","package":"libxrender1","status":"install ok installed","version":"1:0.9.10-1build4"},{"architecture":"amd64","package":"libxs-parse-keyword-perl","status":"install ok installed","version":"0.21-1build1"},{"architecture":"amd64","package":"libxshmfence-dev","status":"install ok installed","version":"1.3-1build4"},{"architecture":"amd64","package":"libxshmfence1","status":"install ok installed","version":"1.3-1build4"},{"architecture":"amd64","package":"libxslt1-dev","status":"install ok installed","version":"1.1.34-4ubuntu0.22.04.5"},{"architecture":"amd64","package":"libxslt1.1","status":"install ok installed","version":"1.1.34-4ubuntu0.22.04.5"},{"architecture":"amd64","package":"libxss-dev","status":"install ok installed","version":"1:1.2.3-1build2"},{"architecture":"amd64","package":"libxss1","status":"install ok installed","version":"1:1.2.3-1build2"},{"architecture":"amd64","package":"libxt-dev","status":"install ok installed","version":"1:1.2.1-1"},{"architecture":"amd64","package":"libxt6","status":"install ok installed","version":"1:1.2.1-1"},{"architecture":"amd64","package":"libxtst-dev","status":"install ok installed","version":"2:1.2.3-1build4"},{"architecture":"amd64","package":"libxtst6","status":"install ok installed","version":"2:1.2.3-1build4"},{"architecture":"amd64","package":"libxv1","status":"install ok installed","version":"2:1.0.11-1build2"},{"architecture":"amd64","package":"libxxf86dga1","status":"install ok installed","version":"2:1.1.5-0ubuntu3"},{"architecture":"amd64","package":"libxxf86vm1","status":"install ok installed","version":"1:1.1.4-1build3"},{"architecture":"amd64","package":"libxxhash0","status":"install ok installed","version":"0.8.1-1"},{"architecture":"amd64","package":"libyaml-0-2","status":"install ok installed","version":"0.2.2-1build2"},{"architecture":"amd64","package":"libyaml-libyaml-perl","status":"install ok installed","version":"0.83+ds-1ubuntu0.22.04.1"},{"architecture":"amd64","package":"libzstd1","status":"install ok installed","version":"1.4.8+dfsg-3build1"},{"architecture":"all","package":"licensecheck","status":"install ok installed","version":"3.2.14-2"},{"architecture":"amd64","package":"lighttpd","status":"install ok installed","version":"1.4.63-1ubuntu3.1"},{"architecture":"amd64","package":"lighttpd-mod-deflate","status":"install ok installed","version":"1.4.63-1ubuntu3.1"},{"architecture":"amd64","package":"lighttpd-mod-openssl","status":"install ok installed","version":"1.4.63-1ubuntu3.1"},{"architecture":"all","package":"lintian","status":"install ok installed","version":"2.114.0ubuntu1.8"},{"architecture":"amd64","package":"linux-libc-dev","status":"install ok installed","version":"5.15.0-124.134"},{"architecture":"all","package":"locales","status":"install ok installed","version":"2.35-0ubuntu3.15"},{"architecture":"amd64","package":"login","status":"install ok installed","version":"1:4.8.1-2ubuntu2.2"},{"architecture":"amd64","package":"logsave","status":"install ok installed","version":"1.46.5-2ubuntu1.2"},{"architecture":"all","package":"lsb-base","status":"install ok installed","version":"11.1.0ubuntu4"},{"architecture":"all","package":"lsb-release","status":"install ok installed","version":"11.1.0ubuntu4"},{"architecture":"all","package":"lto-disabled-list","status":"install ok installed","version":"24"},{"architecture":"amd64","package":"lzip","status":"install ok installed","version":"1.23-1"},{"architecture":"amd64","package":"lzop","status":"install ok installed","version":"1.04-2build2"},{"architecture":"amd64","package":"m4","status":"install ok installed","version":"1.4.18-5ubuntu2"},{"architecture":"amd64","package":"make","status":"install ok installed","version":"4.3-4.1build1"},{"architecture":"amd64","package":"man-db","status":"install ok installed","version":"2.10.2-1"},{"architecture":"amd64","package":"mawk","status":"install ok installed","version":"1.3.4.20200120-3"},{"architecture":"all","package":"media-types","status":"install ok installed","version":"7.0.0"},{"architecture":"amd64","package":"mesa-common-dev","status":"install ok installed","version":"23.2.1-1ubuntu3.1~22.04.4"},{"architecture":"amd64","package":"mesa-va-drivers","status":"install ok installed","version":"23.2.1-1ubuntu3.1~22.04.4"},{"architecture":"amd64","package":"mesa-vulkan-drivers","status":"install ok installed","version":"23.2.1-1ubuntu3.1~22.04.4"},{"architecture":"amd64","package":"mount","status":"install ok installed","version":"2.37.2-4ubuntu3.4"},{"architecture":"all","package":"mutter-common","status":"install ok installed","version":"42.9-0ubuntu9"},{"architecture":"all","package":"ncurses-base","status":"install ok installed","version":"6.3-2ubuntu0.1"},{"architecture":"amd64","package":"ncurses-bin","status":"install ok installed","version":"6.3-2ubuntu0.1"},{"architecture":"all","package":"netbase","status":"install ok installed","version":"6.3"},{"architecture":"all","package":"networkd-dispatcher","status":"install ok installed","version":"2.1-2ubuntu0.22.04.2"},{"architecture":"amd64","package":"obconf","status":"install ok installed","version":"1:2.0.4+git20150213-2build1"},{"architecture":"amd64","package":"openbox","status":"install ok installed","version":"3.6.1-10"},{"architecture":"amd64","package":"openjdk-11-jre-headless","status":"install ok installed","version":"11.0.24+8-1ubuntu3~22.04"},{"architecture":"amd64","package":"openssh-client","status":"install ok installed","version":"1:8.9p1-3ubuntu0.10"},{"architecture":"amd64","package":"openssl","status":"install ok installed","version":"3.0.2-0ubuntu1.18"},{"architecture":"amd64","package":"p7zip","status":"install ok installed","version":"16.02+dfsg-8"},{"architecture":"amd64","package":"pango1.0-tools","status":"install ok installed","version":"1.50.6+ds-2ubuntu1"},{"architecture":"amd64","package":"passwd","status":"install ok installed","version":"1:4.8.1-2ubuntu2.2"},{"architecture":"amd64","package":"patch","status":"install ok installed","version":"2.7.6-7build2"},{"architecture":"amd64","package":"patchutils","status":"install ok installed","version":"0.4.2-1build2"},{"architecture":"all","package":"pci.ids","status":"install ok installed","version":"0.0~2022.01.22-1ubuntu0.1"},{"architecture":"amd64","package":"perl","status":"install ok installed","version":"5.34.0-3ubuntu1.9"},{"architecture":"amd64","package":"perl-base","status":"install ok installed","version":"5.34.0-3ubuntu1.9"},{"architecture":"all","package":"perl-modules-5.34","status":"install ok installed","version":"5.34.0-3ubuntu1.9"},{"architecture":"amd64","package":"perl-openssl-defaults","status":"install ok installed","version":"5build2"},{"architecture":"amd64","package":"pinentry-curses","status":"install ok installed","version":"1.1.1-1build2"},{"architecture":"amd64","package":"pkgconf","status":"install ok installed","version":"1.8.0-1"},{"architecture":"all","package":"po-debconf","status":"install ok installed","version":"1.0.21+nmu1"},{"architecture":"amd64","package":"procps","status":"install ok installed","version":"2:3.3.17-6ubuntu2.1"},{"architecture":"all","package":"python-apt-common","status":"install ok installed","version":"2.4.0ubuntu4.1"},{"architecture":"amd64","package":"python3","status":"install ok installed","version":"3.10.6-1~22.04.1"},{"architecture":"amd64","package":"python3-apt","status":"install ok installed","version":"2.4.0ubuntu4.1"},{"architecture":"all","package":"python3-certifi","status":"install ok installed","version":"2020.6.20-1"},{"architecture":"all","package":"python3-chardet","status":"install ok installed","version":"4.0.0-1"},{"architecture":"amd64","package":"python3-dbus","status":"install ok installed","version":"1.2.18-3build1"},{"architecture":"all","package":"python3-debian","status":"install ok installed","version":"0.1.43ubuntu1.1"},{"architecture":"all","package":"python3-distutils","status":"install ok installed","version":"3.10.8-1~22.04"},{"architecture":"amd64","package":"python3-gi","status":"install ok installed","version":"3.42.1-0ubuntu1"},{"architecture":"amd64","package":"python3-gpg","status":"install ok installed","version":"1.16.0-1.2ubuntu4.2"},{"architecture":"all","package":"python3-idna","status":"install ok installed","version":"3.3-1ubuntu0.2"},{"architecture":"all","package":"python3-lib2to3","status":"install ok installed","version":"3.10.8-1~22.04"},{"architecture":"all","package":"python3-magic","status":"install ok installed","version":"2:0.4.24-2"},{"architecture":"amd64","package":"python3-minimal","status":"install ok installed","version":"3.10.6-1~22.04.1"},{"architecture":"all","package":"python3-pip","status":"install ok installed","version":"22.0.2+dfsg-1ubuntu0.4"},{"architecture":"all","package":"python3-pkg-resources","status":"install ok installed","version":"59.6.0-1.2ubuntu0.22.04.2"},{"architecture":"all","package":"python3-requests","status":"install ok installed","version":"2.25.1+dfsg-2ubuntu0.3"},{"architecture":"all","package":"python3-scour","status":"install ok installed","version":"0.38.2-2"},{"architecture":"all","package":"python3-setuptools","status":"install ok installed","version":"59.6.0-1.2ubuntu0.22.04.2"},{"architecture":"all","package":"python3-six","status":"install ok installed","version":"1.16.0-3ubuntu1"},{"architecture":"all","package":"python3-unidiff","status":"install ok installed","version":"0.5.5-2"},{"architecture":"all","package":"python3-urllib3","status":"install ok installed","version":"1.26.5-1~exp1ubuntu0.7"},{"architecture":"all","package":"python3-wheel","status":"install ok installed","version":"0.37.1-2ubuntu0.22.04.1"},{"architecture":"all","package":"python3-xdg","status":"install ok installed","version":"0.27-2"},{"architecture":"amd64","package":"python3.10","status":"install ok installed","version":"3.10.12-1~22.04.6"},{"architecture":"amd64","package":"python3.10-minimal","status":"install ok installed","version":"3.10.12-1~22.04.6"},{"architecture":"amd64","package":"ragel","status":"install ok installed","version":"6.10-1build1"},{"architecture":"all","package":"rake","status":"install ok installed","version":"13.0.6-2"},{"architecture":"all","package":"readline-common","status":"install ok installed","version":"8.1.2-1"},{"architecture":"amd64","package":"ripgrep","status":"install ok installed","version":"13.0.0-2ubuntu0.1"},{"architecture":"amd64","package":"rpcsvc-proto","status":"install ok installed","version":"1.4.2-0ubuntu6"},{"architecture":"amd64","package":"rpm","status":"install ok installed","version":"4.17.0+dfsg1-4build1"},{"architecture":"amd64","package":"rpm-common","status":"install ok installed","version":"4.17.0+dfsg1-4build1"},{"architecture":"amd64","package":"rpm2cpio","status":"install ok installed","version":"4.17.0+dfsg1-4build1"},{"architecture":"amd64","package":"ruby","status":"install ok installed","version":"1:3.0~exp1"},{"architecture":"all","package":"ruby-net-telnet","status":"install ok installed","version":"0.1.1-2"},{"architecture":"all","package":"ruby-rubygems","status":"install ok installed","version":"3.3.5-2ubuntu1.2"},{"architecture":"all","package":"ruby-webrick","status":"install ok installed","version":"1.7.0-3ubuntu0.2"},{"architecture":"all","package":"ruby-xmlrpc","status":"install ok installed","version":"0.3.2-1ubuntu0.1"},{"architecture":"amd64","package":"ruby3.0","status":"install ok installed","version":"3.0.2-7ubuntu2.13"},{"architecture":"all","package":"rubygems-integration","status":"install ok installed","version":"1.18"},{"architecture":"all","package":"scour","status":"install ok installed","version":"0.38.2-2"},{"architecture":"amd64","package":"scrot","status":"install ok installed","version":"1.7-1"},{"architecture":"amd64","package":"sed","status":"install ok installed","version":"4.8-1ubuntu2"},{"architecture":"all","package":"sensible-utils","status":"install ok installed","version":"0.0.17"},{"architecture":"amd64","package":"session-migration","status":"install ok installed","version":"0.3.6"},{"architecture":"amd64","package":"shared-mime-info","status":"install ok installed","version":"2.1-2"},{"architecture":"amd64","package":"spawn-fcgi","status":"install ok installed","version":"1.6.4-2"},{"architecture":"amd64","package":"strace","status":"install ok installed","version":"5.16-0ubuntu3"},{"architecture":"amd64","package":"subversion","status":"install ok installed","version":"1.14.1-3ubuntu0.22.04.1"},{"architecture":"amd64","package":"sudo","status":"install ok installed","version":"1.9.9-1ubuntu2.4"},{"architecture":"amd64","package":"systemd","status":"install ok installed","version":"249.11-0ubuntu3.22"},{"architecture":"all","package":"systemd-hwe-hwdb","status":"install ok installed","version":"249.11.6"},{"architecture":"amd64","package":"systemd-sysv","status":"install ok installed","version":"249.11-0ubuntu3.22"},{"architecture":"amd64","package":"systemd-timesyncd","status":"install ok installed","version":"249.11-0ubuntu3.22"},{"architecture":"amd64","package":"sysvinit-utils","status":"install ok installed","version":"3.01-1ubuntu1"},{"architecture":"amd64","package":"t1utils","status":"install ok installed","version":"1.41-4build2"},{"architecture":"amd64","package":"tar","status":"install ok installed","version":"1.34+dfsg-1ubuntu0.1.22.04.2"},{"architecture":"amd64","package":"tini","status":"install ok installed","version":"0.19.0-1"},{"architecture":"all","package":"tzdata","status":"install ok installed","version":"2026c-0ubuntu0.22.04.1"},{"architecture":"all","package":"ubuntu-keyring","status":"install ok installed","version":"2021.03.26"},{"architecture":"all","package":"ubuntu-mono","status":"install ok installed","version":"20.10-0ubuntu2"},{"architecture":"all","package":"ucf","status":"install ok installed","version":"3.0043"},{"architecture":"amd64","package":"udev","status":"install ok installed","version":"249.11-0ubuntu3.22"},{"architecture":"amd64","package":"unzip","status":"install ok installed","version":"6.0-26ubuntu3.2"},{"architecture":"all","package":"usrmerge","status":"install ok installed","version":"25ubuntu2"},{"architecture":"amd64","package":"util-linux","status":"install ok installed","version":"2.37.2-4ubuntu3.4"},{"architecture":"amd64","package":"uuid-dev","status":"install ok installed","version":"2.37.2-4ubuntu3.6"},{"architecture":"amd64","package":"va-driver-all","status":"install ok installed","version":"2.14.0-1"},{"architecture":"all","package":"wayland-protocols","status":"install ok installed","version":"1.25-1"},{"architecture":"amd64","package":"wdiff","status":"install ok installed","version":"1.2.2-2build3"},{"architecture":"amd64","package":"wget","status":"install ok installed","version":"1.21.2-2ubuntu1.1"},{"architecture":"all","package":"x11-common","status":"install ok installed","version":"1:7.7+23ubuntu2"},{"architecture":"amd64","package":"x11-utils","status":"install ok installed","version":"7.7+5build2"},{"architecture":"amd64","package":"x11-xkb-utils","status":"install ok installed","version":"7.7+5build4"},{"architecture":"amd64","package":"x11-xserver-utils","status":"install ok installed","version":"7.7+9build1"},{"architecture":"all","package":"x11proto-dev","status":"install ok installed","version":"2021.5-1"},{"architecture":"amd64","package":"xauth","status":"install ok installed","version":"1:1.1-1build2"},{"architecture":"amd64","package":"xcompmgr","status":"install ok installed","version":"1.1.8-1"},{"architecture":"amd64","package":"xcvt","status":"install ok installed","version":"0.1.1-3"},{"architecture":"all","package":"xfonts-base","status":"install ok installed","version":"1:1.0.5"},{"architecture":"all","package":"xfonts-encodings","status":"install ok installed","version":"1:1.0.5-0ubuntu2"},{"architecture":"amd64","package":"xfonts-utils","status":"install ok installed","version":"1:7.7+6build2"},{"architecture":"all","package":"xkb-data","status":"install ok installed","version":"2.33-1"},{"architecture":"all","package":"xorg-sgml-doctools","status":"install ok installed","version":"1:1.11-1.1"},{"architecture":"all","package":"xserver-common","status":"install ok installed","version":"2:21.1.4-2ubuntu1.7~22.04.16"},{"architecture":"amd64","package":"xserver-xorg-core","status":"install ok installed","version":"2:21.1.4-2ubuntu1.7~22.04.16"},{"architecture":"amd64","package":"xserver-xorg-video-dummy","status":"install ok installed","version":"1:0.3.8-2build1"},{"architecture":"all","package":"xtrans-dev","status":"install ok installed","version":"1.4.0-1"},{"architecture":"amd64","package":"xvfb","status":"install ok installed","version":"2:21.1.4-2ubuntu1.7~22.04.16"},{"architecture":"amd64","package":"xz-utils","status":"install ok installed","version":"5.2.5-2ubuntu1.1"},{"architecture":"amd64","package":"yasm","status":"install ok installed","version":"1.3.0-2.1"},{"architecture":"amd64","package":"zip","status":"install ok installed","version":"3.0-12build2"},{"architecture":"amd64","package":"zlib1g","status":"install ok installed","version":"1:1.2.11.dfsg-2ubuntu9.2"},{"architecture":"amd64","package":"zlib1g-dev","status":"install ok installed","version":"1:1.2.11.dfsg-2ubuntu9.2"},{"architecture":"amd64","package":"zstd","status":"install ok installed","version":"1.4.8+dfsg-3build1"}]
````


## Appendix D — exact preserved Stage C transaction

````jsonl
{"stageId":"STAGE_C","action":"INSTALL","package":"pkg-config","architecture":"amd64","fromVersion":null,"toVersion":"0.29.2-1ubuntu3","canonicalPackageMetadataSha256":"2288496bfe1a13e14b0d33d20db794b729cc66904e90372e48acfa3a8811bf15","filename":"pool/main/p/pkg-config/pkg-config_0.29.2-1ubuntu3_amd64.deb","archiveBytes":48218,"archiveSha256":"69da4190d948d0bf7444ead040791b7924bd1a08a10ec13cd7f0bb9baab09c53","selectedSuite":"jammy","selectedComponent":"main","reasonClass":"ROOT"}
{"stageId":"STAGE_C","action":"INSTALL","package":"rsync","architecture":"amd64","fromVersion":null,"toVersion":"3.2.7-0ubuntu0.22.04.7","canonicalPackageMetadataSha256":"8c9f22a1939b9755fd0851dbee489c412f92c991943b21e381ef7c4ce7a1e6f4","filename":"pool/main/r/rsync/rsync_3.2.7-0ubuntu0.22.04.7_amd64.deb","archiveBytes":444910,"archiveSha256":"0f1f6c57367d67027f735171e69c769fe4c5552e267314a31f5e92064e36c153","selectedSuite":"jammy-security","selectedComponent":"main","reasonClass":"ROOT"}
{"stageId":"STAGE_C","action":"REMOVE","package":"pkgconf","architecture":"amd64","fromVersion":"1.8.0-1","toVersion":null,"canonicalPackageMetadataSha256":null,"filename":null,"archiveBytes":null,"archiveSha256":null,"selectedSuite":null,"selectedComponent":null,"reasonClass":null}
{"stageId":"STAGE_C","action":"UNCHANGED_REQUESTED_ROOT","package":"build-essential","architecture":"amd64","fromVersion":"12.9ubuntu3","toVersion":"12.9ubuntu3","canonicalPackageMetadataSha256":"3b8324f8f70fd1af76c59cc4b0a5cd8addd1eeb15d408efa9baf8d77fbc13393","filename":null,"archiveBytes":null,"archiveSha256":null,"selectedSuite":"jammy","selectedComponent":"main","reasonClass":"ROOT"}
{"stageId":"STAGE_C","action":"UNCHANGED_REQUESTED_ROOT","package":"curl","architecture":"amd64","fromVersion":"7.81.0-1ubuntu1.27","toVersion":"7.81.0-1ubuntu1.27","canonicalPackageMetadataSha256":"210986fa8d0b67a7babc91b3a6ffb52a1303f6a03692e4b1b861ae241d869238","filename":null,"archiveBytes":null,"archiveSha256":null,"selectedSuite":"jammy-security","selectedComponent":"main","reasonClass":"ROOT"}
````


## Appendix E — exact preserved Stage C parser result

````json
{"canonicalTransactionJsonlBytes":2059,"canonicalTransactionJsonlSha256":"72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f","findings":[{"code":"REMOVE_SUMMARY","line":7},{"architecture":"amd64","code":"REMOVE","fromVersion":"1.8.0-1","package":"pkgconf"}],"qualifies":false,"rawStdoutBytes":942,"rawStdoutSha256":"0ff3fda2dc1665d5934ed1f1043ae7dcc6499ad3702423b2fd74752f674732a9","recordCount":5,"recordCountByAction":{"DOWNGRADE":0,"INSTALL":2,"KEEP_BACK":0,"REMOVE":1,"UNCHANGED_REQUESTED_ROOT":2,"UPGRADE":0},"records":[{"action":"INSTALL","architecture":"amd64","archiveBytes":48218,"archiveSha256":"69da4190d948d0bf7444ead040791b7924bd1a08a10ec13cd7f0bb9baab09c53","canonicalPackageMetadataSha256":"2288496bfe1a13e14b0d33d20db794b729cc66904e90372e48acfa3a8811bf15","filename":"pool/main/p/pkg-config/pkg-config_0.29.2-1ubuntu3_amd64.deb","fromVersion":null,"package":"pkg-config","reasonClass":"ROOT","selectedComponent":"main","selectedSuite":"jammy","stageId":"STAGE_C","toVersion":"0.29.2-1ubuntu3"},{"action":"INSTALL","architecture":"amd64","archiveBytes":444910,"archiveSha256":"0f1f6c57367d67027f735171e69c769fe4c5552e267314a31f5e92064e36c153","canonicalPackageMetadataSha256":"8c9f22a1939b9755fd0851dbee489c412f92c991943b21e381ef7c4ce7a1e6f4","filename":"pool/main/r/rsync/rsync_3.2.7-0ubuntu0.22.04.7_amd64.deb","fromVersion":null,"package":"rsync","reasonClass":"ROOT","selectedComponent":"main","selectedSuite":"jammy-security","stageId":"STAGE_C","toVersion":"3.2.7-0ubuntu0.22.04.7"},{"action":"REMOVE","architecture":"amd64","archiveBytes":null,"archiveSha256":null,"canonicalPackageMetadataSha256":null,"filename":null,"fromVersion":"1.8.0-1","package":"pkgconf","reasonClass":null,"selectedComponent":null,"selectedSuite":null,"stageId":"STAGE_C","toVersion":null},{"action":"UNCHANGED_REQUESTED_ROOT","architecture":"amd64","archiveBytes":null,"archiveSha256":null,"canonicalPackageMetadataSha256":"3b8324f8f70fd1af76c59cc4b0a5cd8addd1eeb15d408efa9baf8d77fbc13393","filename":null,"fromVersion":"12.9ubuntu3","package":"build-essential","reasonClass":"ROOT","selectedComponent":"main","selectedSuite":"jammy","stageId":"STAGE_C","toVersion":"12.9ubuntu3"},{"action":"UNCHANGED_REQUESTED_ROOT","architecture":"amd64","archiveBytes":null,"archiveSha256":null,"canonicalPackageMetadataSha256":"210986fa8d0b67a7babc91b3a6ffb52a1303f6a03692e4b1b861ae241d869238","filename":null,"fromVersion":"7.81.0-1ubuntu1.27","package":"curl","reasonClass":"ROOT","selectedComponent":"main","selectedSuite":"jammy-security","stageId":"STAGE_C","toVersion":"7.81.0-1ubuntu1.27"}],"schema":"signthos.004c1bt.stage-c-apt-parser-result.v1","selectedArchiveIdentityCount":2,"selectedArchiveIdentitySetSha256":"223b7421ddd372e0660562922ad99a3ff42af73188082efeb7d17d00054233f4"}
````
