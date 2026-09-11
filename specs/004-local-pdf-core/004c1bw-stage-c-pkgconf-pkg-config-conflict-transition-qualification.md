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

## 7. Qualification result

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
