# 004C1BZ — Stage C virtual installed-state derivation qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_DETERMINISTIC_STAGE_C_VIRTUAL_INSTALLED_STATE_DERIVATION_ONLY / ZERO_RUNTIME_EXECUTION`
Issue: #7
Canonical base: `602f801e2e2494b242fdf88be44cca53cd9e1e02`
Canonical base tree: `7ebc5265c7a533cfea8d25045da0561460c5dbb9`
Authority: `github:issue-comment:5628745063`

## 1. Purpose and authority boundary

004C1BZ applies the exact byte-identical Stage C transaction established by consumed Replay A and Replay B to the exact 904-package canonical Stage B virtual predecessor installed state. It derives a solver-model-only final Stage C installed-state JSON artifact and a deterministic transition manifest.

```text
004C1BZ_AUTHORITY = STATIC_DETERMINISTIC_STAGE_C_VIRTUAL_INSTALLED_STATE_DERIVATION_ONLY
004C1BZ_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1bz-stage-c-virtual-installed-state-derivation-qualification.md
004C1BZ_MAX_CHANGED_REPOSITORY_FILES = 1
DOCKER_CONTAINER_EXECUTION = 0
APT_GET_EXECUTION = 0
APT_CONFIG_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = 0
STAGE_C_REPLAY_A_RETRY_OR_REPLACEMENT = 0
STAGE_C_REPLAY_B_RETRY_OR_REPLACEMENT = 0
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

The derived state is a solver model only. It does not claim that package payloads were unpacked, maintainer scripts/triggers ran, alternatives/diversions changed, services changed, or a provisioned filesystem exists.

004C1AL requires a canonical virtual installed-state predecessor binding for later APT stages. Stage C is the final APT simulation stage, so 004C1BZ deliberately derives the installed-state artifact and transition manifest only; it does not invent an unauthorized Stage-D virtual dpkg-status consumer.

## 2. Exact canonical sources and inputs

```text
004C1AL_DOCUMENT = 21275 / 099260342a77d2fc93404d3cc5babede5eddb9411d0a0a4c4f3d2ec7c101fe2f
004C1BR_DOCUMENT = 414390 / a0f861d828282771809700645b694ba290a6d6bd1d56918cf496b1025a95cbed
004C1BV_DOCUMENT = 64476 / 51aa890a4bbc5a4404941df3b6016b51bf2859cc6c221807f789d7259e87018a
004C1BW_DOCUMENT = 139761 / cee625784f0eaa8ee899081621f3c592ecb5fa691375f87aeb6ad8af968d1eb3
004C1BX_DOCUMENT = 14303 / c6dc08fbb3b8ed0f66d69d422ab9cb2c3d121b819d3b87a7f56fc1bef683cc30
004C1BY_CLOSEOUT = github:issue-comment:5628745063
PREDECESSOR_INSTALLED_STATE = 98938 / 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea / 904 packages
STAGE_C_TRANSACTION = 2059 / 72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f / 5 records
STAGE_C_TRANSACTION_A_B_BYTE_IDENTITY = PASS
STAGE_C_TRANSACTION_POLICY_QUALIFIES = true
GENERIC_REMOVE_ACCEPTANCE = false
```

The exact predecessor contains `pkgconf:amd64@1.8.0-1`, contains no `pkg-config` or `rsync`, and contains the unchanged roots `build-essential:amd64@12.9ubuntu3` and `curl:amd64@7.81.0-1ubuntu1.27`.

## 3. Deterministic transition semantics

The transformer applies only the exact canonical Stage C action set:

1. Bind predecessor and transaction by exact byte length and SHA-256 before parsing.
2. Require exactly 904 predecessor rows and 904 unique `(package, architecture)` keys, each with `Status = install ok installed`.
3. Require exactly five Stage C transaction records with `2 INSTALL / 0 UPGRADE / 0 DOWNGRADE / 1 REMOVE / 0 KEEP_BACK / 2 UNCHANGED_REQUESTED_ROOT`.
4. Require the installs to be exactly `pkg-config:amd64@0.29.2-1ubuntu3` and `rsync:amd64@3.2.7-0ubuntu0.22.04.7`, both absent from the predecessor.
5. Accept exactly one removal identity only: `pkgconf:amd64@1.8.0-1`, already reconciled by canonical 004C1BW/004C1BX. Any other removal fails closed.
6. Require the unchanged roots to be exactly `build-essential:amd64@12.9ubuntu3` and `curl:amd64@7.81.0-1ubuntu1.27` and emit no mutation for them.
7. Reject duplicate predecessor keys and duplicate transaction package keys.
8. Serialize the final installed-state JSON sorted by `(package, architecture, version)` using UTF-8 canonical JSON plus one LF.
9. Require exactly `904 + 2 INSTALL - 1 REMOVE = 905` unique output package keys.
10. Emit a canonical transition manifest that preserves the input identities, action cardinalities, exact qualified removal/replacement, output identity, and generic-removal prohibition.

## 4. Frozen transformer

```text
TRANSFORMER_BYTES = 6115
TRANSFORMER_SHA256 = cad2d722a49ef90660a10f61d4029201080d45f71aa6293d4962ba033ab4e45c
```

````python
#!/usr/bin/env python3
import argparse, hashlib, json
from pathlib import Path

PRE=(98938,'42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea')
TX=(2059,'72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f')
EXPECTED_COUNTS={'INSTALL':2,'UPGRADE':0,'DOWNGRADE':0,'REMOVE':1,'KEEP_BACK':0,'UNCHANGED_REQUESTED_ROOT':2}
EXPECTED_INSTALLS={('pkg-config','amd64','0.29.2-1ubuntu3'),('rsync','amd64','3.2.7-0ubuntu0.22.04.7')}
EXPECTED_REMOVE=('pkgconf','amd64','1.8.0-1')
EXPECTED_UNCHANGED={('build-essential','amd64','12.9ubuntu3'),('curl','amd64','7.81.0-1ubuntu1.27')}
EXPECTED_OUTPUT_COUNT=905

def sha(b): return hashlib.sha256(b).hexdigest()
def cjson(v): return (json.dumps(v,ensure_ascii=False,separators=(',',':'),sort_keys=True)+'\n').encode()
def require(path, expected, label):
 b=Path(path).read_bytes(); got=(len(b),sha(b))
 if got!=expected: raise RuntimeError(f'{label} identity mismatch {got} expected {expected}')
 return b

def main():
 ap=argparse.ArgumentParser()
 ap.add_argument('predecessor'); ap.add_argument('transaction'); ap.add_argument('out_state'); ap.add_argument('out_manifest')
 a=ap.parse_args()
 pre_b=require(a.predecessor,PRE,'predecessor'); tx_b=require(a.transaction,TX,'transaction')
 pre=json.loads(pre_b)
 if not isinstance(pre,list) or len(pre)!=904: raise RuntimeError('predecessor cardinality mismatch')
 state={}; order=[]
 for i,row in enumerate(pre):
  if set(row)!= {'package','architecture','status','version'}: raise RuntimeError(f'predecessor schema mismatch {i}')
  if row['status']!='install ok installed': raise RuntimeError(f'predecessor status mismatch {i}')
  key=(row['package'],row['architecture'])
  if key in state: raise RuntimeError(f'duplicate predecessor key {key}')
  state[key]=dict(row); order.append(key)
 recs=[json.loads(x) for x in tx_b.decode().splitlines() if x]
 if len(recs)!=5: raise RuntimeError('transaction record count mismatch')
 counts={k:sum(r.get('action')==k for r in recs) for k in EXPECTED_COUNTS}
 if counts!=EXPECTED_COUNTS: raise RuntimeError(f'action counts mismatch {counts}')
 if any(r.get('stageId')!='STAGE_C' for r in recs): raise RuntimeError('stage mismatch')
 installs={(r['package'],r['architecture'],r['toVersion']) for r in recs if r['action']=='INSTALL'}
 removes={(r['package'],r['architecture'],r['fromVersion']) for r in recs if r['action']=='REMOVE'}
 unchanged={(r['package'],r['architecture'],r['fromVersion']) for r in recs if r['action']=='UNCHANGED_REQUESTED_ROOT'}
 if installs!=EXPECTED_INSTALLS: raise RuntimeError(f'install identity mismatch {installs}')
 if removes!={EXPECTED_REMOVE}: raise RuntimeError(f'remove identity mismatch {removes}')
 if unchanged!=EXPECTED_UNCHANGED: raise RuntimeError(f'unchanged identity mismatch {unchanged}')
 manifest=[]; touched=set()
 for n,r in enumerate(recs):
  action=r['action']; key=(r['package'],r['architecture'])
  if key in touched: raise RuntimeError(f'duplicate transaction package key {key}')
  touched.add(key)
  if action=='INSTALL':
   if key in state: raise RuntimeError(f'INSTALL predecessor collision {key}')
   if r.get('fromVersion') is not None or r.get('toVersion') is None: raise RuntimeError(f'INSTALL version shape {key}')
   state[key]={'package':key[0],'architecture':key[1],'status':'install ok installed','version':r['toVersion']}
   manifest.append({'action':action,'package':key[0],'architecture':key[1],'fromVersion':None,'toVersion':r['toVersion'],'archiveSha256':r['archiveSha256'],'canonicalPackageMetadataSha256':r['canonicalPackageMetadataSha256']})
  elif action=='REMOVE':
   if (r['package'],r['architecture'],r.get('fromVersion'))!=EXPECTED_REMOVE: raise RuntimeError('unqualified remove')
   cur=state.get(key)
   if cur is None or cur['version']!=r['fromVersion']: raise RuntimeError('REMOVE predecessor mismatch')
   del state[key]
   manifest.append({'action':action,'package':key[0],'architecture':key[1],'fromVersion':r['fromVersion'],'toVersion':None})
  elif action=='UNCHANGED_REQUESTED_ROOT':
   cur=state.get(key)
   if cur is None or cur['version']!=r.get('fromVersion') or r.get('toVersion')!=r.get('fromVersion'): raise RuntimeError('UNCHANGED predecessor/version mismatch')
   manifest.append({'action':action,'package':key[0],'architecture':key[1],'fromVersion':r['fromVersion'],'toVersion':r['toVersion']})
  else:
   raise RuntimeError(f'unsupported action {action}')
 out=sorted(state.values(),key=lambda r:(r['package'],r['architecture'],r['version']))
 if len(out)!=EXPECTED_OUTPUT_COUNT: raise RuntimeError(f'output cardinality {len(out)}')
 if len({(r['package'],r['architecture']) for r in out})!=EXPECTED_OUTPUT_COUNT: raise RuntimeError('output duplicate keys')
 by={(r['package'],r['architecture']):r for r in out}
 if ('pkgconf','amd64') in by: raise RuntimeError('pkgconf survived')
 if by.get(('pkg-config','amd64'),{}).get('version')!='0.29.2-1ubuntu3': raise RuntimeError('pkg-config output mismatch')
 if by.get(('rsync','amd64'),{}).get('version')!='3.2.7-0ubuntu0.22.04.7': raise RuntimeError('rsync output mismatch')
 for pkg,arch,ver in EXPECTED_UNCHANGED:
  if by.get((pkg,arch),{}).get('version')!=ver: raise RuntimeError(f'unchanged output mismatch {(pkg,arch)}')
 out_b=cjson(out)
 m={'schema':'signthos.004c1bz.stage-c-virtual-installed-state-transition.v1','predecessor':{'bytes':len(pre_b),'sha256':sha(pre_b),'count':904},'transaction':{'bytes':len(tx_b),'sha256':sha(tx_b),'records':5},'actionCounts':counts,'qualifiedRemoval':{'package':'pkgconf','architecture':'amd64','fromVersion':'1.8.0-1','replacementPackage':'pkg-config','replacementArchitecture':'amd64','replacementVersion':'0.29.2-1ubuntu3'},'outputState':{'bytes':len(out_b),'sha256':sha(out_b),'count':len(out)},'records':manifest,'genericRemoveAcceptance':False}
 man_b=cjson(m)
 Path(a.out_state).write_bytes(out_b); Path(a.out_manifest).write_bytes(man_b)
 print(json.dumps({'state':{'bytes':len(out_b),'sha256':sha(out_b),'count':len(out)},'manifest':{'bytes':len(man_b),'sha256':sha(man_b)},'counts':counts},sort_keys=True,separators=(',',':')))
if __name__=='__main__': main()
````

## 5. Host-static qualification harness

The harness invokes the frozen transformer twice from the same exact bytes, requires byte identity with the retained canonical outputs, validates the 905-key delta, and proves exact-input tamper rejection for both predecessor and transaction identities.

```text
QUALIFICATION_HARNESS_BYTES = 3971
QUALIFICATION_HARNESS_SHA256 = 6734571f3e7b1253bdf52e72d36a2c1ddc974a05248b4f700069a23f2881bbfe
```

````python
#!/usr/bin/env python3
import hashlib, json, subprocess, sys, tempfile
from pathlib import Path
W=Path(__file__).resolve().parent
EXPECTED_STATE=(99059,'8801230a86014a849c052da1f85740def6e5fcd204584e914b67017472bb71be')
EXPECTED_MANIFEST=(1770,'df6028b9f45b0982697f34028b4cf366841a3b559a8745c5c184864dde9fb84d')
def require(cond,msg):
 if not cond: raise RuntimeError(msg)
def ident(p):
 b=Path(p).read_bytes(); return len(b),hashlib.sha256(b).hexdigest()
def run(pre,tx,out):
 s=out/'state.json'; m=out/'manifest.json'
 cp=subprocess.run([sys.executable,str(W/'transform.py'),str(pre),str(tx),str(s),str(m)],capture_output=True,text=True)
 return cp,s,m
def main():
 with tempfile.TemporaryDirectory() as td:
  td=Path(td); a=td/'a'; b=td/'b'; a.mkdir(); b.mkdir()
  cpa,sa,ma=run(W/'predecessor-installed.json',W/'transaction.jsonl',a)
  cpb,sb,mb=run(W/'predecessor-installed.json',W/'transaction.jsonl',b)
  require(cpa.returncode==0,f'derivation A failed stdout={cpa.stdout!r} stderr={cpa.stderr!r}')
  require(cpb.returncode==0,f'derivation B failed stdout={cpb.stdout!r} stderr={cpb.stderr!r}')
  require(ident(sa)==EXPECTED_STATE,f'derivation A state identity mismatch {ident(sa)}')
  require(ident(sb)==EXPECTED_STATE,f'derivation B state identity mismatch {ident(sb)}')
  require(ident(ma)==EXPECTED_MANIFEST,f'derivation A manifest identity mismatch {ident(ma)}')
  require(ident(mb)==EXPECTED_MANIFEST,f'derivation B manifest identity mismatch {ident(mb)}')
  retained_state=(W/'virtual-installed-state.json').read_bytes(); retained_manifest=(W/'transition-manifest.json').read_bytes()
  require(sa.read_bytes()==sb.read_bytes()==retained_state,'derived state byte identity mismatch')
  require(ma.read_bytes()==mb.read_bytes()==retained_manifest,'derived manifest byte identity mismatch')
  state=json.loads(sa.read_text()); require(len(state)==905,f'output package count mismatch {len(state)}')
  keys={(r['package'],r['architecture']):r for r in state}; require(len(keys)==905,f'output unique-key count mismatch {len(keys)}')
  require(('pkgconf','amd64') not in keys,'pkgconf survived output state')
  require(keys.get(('pkg-config','amd64'),{}).get('version')=='0.29.2-1ubuntu3','pkg-config output mismatch')
  require(keys.get(('rsync','amd64'),{}).get('version')=='3.2.7-0ubuntu0.22.04.7','rsync output mismatch')
  require(keys.get(('build-essential','amd64'),{}).get('version')=='12.9ubuntu3','build-essential output mismatch')
  require(keys.get(('curl','amd64'),{}).get('version')=='7.81.0-1ubuntu1.27','curl output mismatch')
  require({r['status'] for r in state}=={'install ok installed'},'output status-set mismatch')
  pre_bad=td/'pre-bad.json'; pre_bad.write_bytes((W/'predecessor-installed.json').read_bytes()+b'\n')
  bad1=td/'bad1'; bad1.mkdir(); cp1,_,_=run(pre_bad,W/'transaction.jsonl',bad1)
  require(cp1.returncode!=0,'tampered predecessor was accepted')
  tx_bad=td/'tx-bad.jsonl'; tx_bad.write_bytes((W/'transaction.jsonl').read_bytes()+b'\n')
  bad2=td/'bad2'; bad2.mkdir(); cp2,_,_=run(W/'predecessor-installed.json',tx_bad,bad2)
  require(cp2.returncode!=0,'tampered transaction was accepted')
  result={'schema':'signthos.004c1bz.static-stage-c-virtual-state-qualification.v1','exactDerivationReplayAB':'PASS','predecessorTamperRejected':True,'transactionTamperRejected':True,'predecessorCount':904,'installCount':2,'removeCount':1,'unchangedRequestedRootCount':2,'outputPackageCount':905,'outputUniquePackageKeyCount':905,'pkgconfRemoved':True,'pkgConfigInstalledExact':True,'rsyncInstalledExact':True,'unchangedRootsPreserved':True,'allOutputStatusesInstalled':True,'virtualInstalledState':{'bytes':EXPECTED_STATE[0],'sha256':EXPECTED_STATE[1]},'transitionManifest':{'bytes':EXPECTED_MANIFEST[0],'sha256':EXPECTED_MANIFEST[1]},'genericRemoveAcceptance':False,'dockerAptDpkgExecution':0}
  out=(json.dumps(result,sort_keys=True,separators=(',',':'))+'\n').encode(); sys.stdout.buffer.write(out)
if __name__=='__main__': main()
````

## 6. Qualification result and exact derived state

Two independent host-only derivation runs plus qualification-harness runs under both normal Python and optimized `python -O` produced byte-identical artifacts. No Docker, APT, apt-config, dpkg, package operation, provider, or PDFium execution occurred.

```text
DERIVATION_REPLAY_A_B = PASS
QUALIFICATION_REPLAY_A_B = PASS
PREDECESSOR_TAMPER_REJECTED = true
TRANSACTION_TAMPER_REJECTED = true
VIRTUAL_STAGE_C_INSTALLED_STATE_BYTES = 99059
VIRTUAL_STAGE_C_INSTALLED_STATE_SHA256 = 8801230a86014a849c052da1f85740def6e5fcd204584e914b67017472bb71be
VIRTUAL_STAGE_C_INSTALLED_PACKAGE_COUNT = 905
VIRTUAL_STAGE_C_UNIQUE_PACKAGE_KEY_COUNT = 905
TRANSITION_MANIFEST_BYTES = 1770
TRANSITION_MANIFEST_SHA256 = df6028b9f45b0982697f34028b4cf366841a3b559a8745c5c184864dde9fb84d
QUALIFICATION_RESULT_BYTES = 754
QUALIFICATION_RESULT_SHA256 = bee4e62f2d9be05f90bb26db021061a3d83cd2f67c96157f4ca839a346f70ea2
```

Exact package-key delta:

```text
REMOVE = pkgconf:amd64@1.8.0-1
INSTALL = pkg-config:amd64@0.29.2-1ubuntu3
INSTALL = rsync:amd64@3.2.7-0ubuntu0.22.04.7
UNCHANGED = build-essential:amd64@12.9ubuntu3
UNCHANGED = curl:amd64@7.81.0-1ubuntu1.27
OUTPUT_pkgconf = ABSENT
OUTPUT_pkg-config = PRESENT_EXACT
OUTPUT_rsync = PRESENT_EXACT
ALL_OUTPUT_STATUS = install ok installed
GENERIC_REMOVE_ACCEPTANCE = false
```

Canonical qualification result:

```json
{"allOutputStatusesInstalled":true,"dockerAptDpkgExecution":0,"exactDerivationReplayAB":"PASS","genericRemoveAcceptance":false,"installCount":2,"outputPackageCount":905,"outputUniquePackageKeyCount":905,"pkgConfigInstalledExact":true,"pkgconfRemoved":true,"predecessorCount":904,"predecessorTamperRejected":true,"removeCount":1,"rsyncInstalledExact":true,"schema":"signthos.004c1bz.static-stage-c-virtual-state-qualification.v1","transactionTamperRejected":true,"transitionManifest":{"bytes":1770,"sha256":"df6028b9f45b0982697f34028b4cf366841a3b559a8745c5c184864dde9fb84d"},"unchangedRequestedRootCount":2,"unchangedRootsPreserved":true,"virtualInstalledState":{"bytes":99059,"sha256":"8801230a86014a849c052da1f85740def6e5fcd204584e914b67017472bb71be"}}
```

## 7. Retained deterministic artifact bundle

The retained payload is a deterministic USTAR compressed with XZ/SHA-256 check. USTAR members are lexicographically ordered regular files with `uid=0`, `gid=0`, `mtime=0`, empty owner/group names, and mode `0644`.

```text
BUNDLE_MEMBER_COUNT = 5
BUNDLE_MEMBERS = [predecessor-installed.json, qualification-result.final.json, transaction.jsonl, transition-manifest.json, virtual-installed-state.json]
BUNDLE_USTAR_BYTES = 215040
BUNDLE_USTAR_SHA256 = a4ec9643e9e3d26287a4e8c33b576f6fe88772ec10fe15d69b945fe0680daba8
BUNDLE_XZ_BYTES = 10328
BUNDLE_XZ_SHA256 = 43ea2be5cc06a6a9b1ddb04bd2114eac72d5605cf911ccd3ba44ba961142ac8c
```

```base64
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
6d8cAgAAAAAKWVo=
```

## 8. Reproduction contract

A reviewer can reproduce 004C1BZ from this document alone:

1. extract and base64-decode the retained XZ payload;
2. require exact XZ and decompressed USTAR identities above;
3. require the exact five-member sorted USTAR set and normalized metadata;
4. extract the frozen transformer and qualification harness from their four-backtick Python fences with one terminal LF;
5. place the extracted scripts beside the five retained files;
6. run `qualify.py` with the active Python interpreter and again with optimization enabled (`python -O`);
7. require both executions to return exact `754 / bee4e62f2d9be05f90bb26db021061a3d83cd2f67c96157f4ca839a346f70ea2` output.

Any identity mismatch, duplicate key, action-cardinality drift, unexpected removal, install collision, unchanged-root mismatch, output cardinality drift, or tampering fails closed.

## 9. Qualification conclusion

```text
004C1BZ_RESULT = QUALIFIED_STATIC_DETERMINISTIC_STAGE_C_VIRTUAL_INSTALLED_STATE
STAGE_C_REPLAY_A_RETRY_OR_REPLACEMENT = NOT_AUTHORIZED
STAGE_C_REPLAY_B_RETRY_OR_REPLACEMENT = NOT_AUTHORIZED
DOCKER_APT_DPKG_EXECUTION = 0
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = 0
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

004C1BZ establishes only the exact final Stage C solver-model installed state. It does not itself authorize provisioning, package extraction/installation, toolchain acquisition/execution, PDFium build/runtime, provider implementation, 004C2, 004D, or Specification 005. Fresh post-merge Issue #7 reconciliation is mandatory.
