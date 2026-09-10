# 004C1BN — Stage B APT simulator trailer grammar repair qualification
Status: **candidate / static deterministic parser repair / preserved Replay A reparse only / zero new solver execution**
Canonical base: `7e80c02836361cbccb3eeec0af4b62fdee676b40`
Canonical base tree: `e19b88f02f5934427a26c694f7f83b5977e55577`
Authority: `github:issue-comment:5625049131`
## 1. Scope and authority boundary
004C1BN repairs one fail-closed grammar defect discovered by the already-consumed 004C1BL Stage B Replay A. It performs no Docker, APT, dpkg, package, provider, PDFium, Stage B solver, Stage C, 004C2, 004D, or Specification 005 execution. The only runtime bytes consumed here are the immutable Replay A bytes already preserved before this unit was authorized.
```text
DOCKER_CONTAINER_EXECUTION = 0
APT_CONFIG_EXECUTION = 0
APT_GET_EXECUTION = 0
DPKG_EXECUTION = 0
REPLAY_A_RETRY_OR_REPLACEMENT = 0
REPLAY_B_EXECUTION = 0
STAGE_C_EXECUTION = 0
PRESERVED_REPLAY_A_ATTEMPTS_USED = 1
PRESERVED_REPLAY_A_ATTEMPTS_REMAINING = 0
```
## 2. Canonical and preserved inputs
```text
004C1BM_PARSER_BYTES = 21669
004C1BM_PARSER_SHA256 = 2fe9378cd97621ae141fa7f5252ac7741522ba930753fa5f25b557c3589e1e40
PRESERVED_REPLAY_A_DOCKER_STDOUT_BYTES = 194560
PRESERVED_REPLAY_A_DOCKER_STDOUT_SHA256 = a8431247f73cc6fd9f3a8e2eb16c608a9c10cef6cda6c2451a784b109264ac35
PRESERVED_REPLAY_A_APT_STDOUT_BYTES = 132913
PRESERVED_REPLAY_A_APT_STDOUT_SHA256 = 6f5efa623e9551f1f159db61b014a04b46a20cc69f3037dfb715023c462067e8
PRESERVED_004C1BM_FAILURE_JSON_BYTES = 730
PRESERVED_004C1BM_FAILURE_JSON_SHA256 = 77448e965a26313ba81c7f0c588e3dca51d751fb0f454f34a0d4a0f3854378f1
004C1AG_RESOLVED_CLOSURE_BYTES = 293999
004C1AG_RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
004C1AK_VERIFIED_ARCHIVES_BYTES = 439991
004C1AK_VERIFIED_ARCHIVES_SHA256 = 38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98
004C1BJ_PREDECESSOR_INSTALLED_BYTES = 27625
004C1BJ_PREDECESSOR_INSTALLED_SHA256 = 14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7
```
The preserved parser failure is exact and occurs at APT stdout line 342, where canonical 004C1BM rejects a source-produced `Inst` line ending in `[perl:amd64 ]`. No solver rerun was used to obtain any 004C1BN evidence.
## 3. Exact APT 2.4.13 source proof
The APT source revision was already qualified by the predecessor chain. 004C1BN reuses that exact immutable revision:
```text
APT_SOURCE_REPOSITORY = https://git.launchpad.net/ubuntu/+source/apt
APT_SOURCE_TAG = import/2.4.13
APT_SOURCE_TAG_OBJECT = 27207612b00b302b7b18cfeec355bad1a5de6bca
APT_SOURCE_COMMIT = 581ec5c0aa2c6665d72465040f1465eb93503200
APT_SOURCE_TREE = e9afcae41f88040e93eb7a10a89e72c00b59e245
APT_PKG_ALGORITHMS_CC_BYTES = 52846
APT_PKG_ALGORITHMS_CC_SHA256 = 6dd7c7a4bfdb03f269e895f6290e456ed4963bdf91707715d0c54609da97ec1e
```
Static inspection of this exact `apt-pkg/algorithms.cc` establishes the bounded syntax and semantics:
- `RealInstall` prints `Inst ` at line 126 and completes `Describe(Pkg, cout, true, true)` at line 127 before the later broken-state check at line 154.
- `RealConfigure` prints `Conf ` and completes `Describe(Pkg, cout, false, true)` at lines 208–209 before the broken-state check at line 212.
- when `Sim.BrokenCount() != 0`, both paths call `ShortBreaks()`; `ShortBreaks` begins at line 260, writes ` [` at line 262, emits zero or more `I.FullName(false)` values each followed by one literal space at line 268, and closes with `]` plus newline at line 273.
- the same source also contains a different `RealInstall` conflict/pre-dependency diagnostic of the form `[X on Y]` near line 146. 004C1BN deliberately does **not** accept that form because it is neither the qualified `ShortBreaks` grammar nor observed in preserved Replay A.
Therefore the only newly accepted trailer grammar is exactly `[]` or `[FULLNAME FULLNAME ... ]`, with each non-empty item using the existing package-name grammar and exactly one trailing space. The trailer is safe to ignore for transaction identity because the current action target/current version/candidate version/release/architecture description is emitted before `ShortBreaks`; the trailer is an intermediate broken-package diagnostic emitted afterward. The raw trailer bytes remain preserved and syntax-validated rather than discarded from evidence.
## 4. Exact mechanical parser repair
The repair changes only the `Inst`/`Conf` regex surface. It introduces a non-capturing package-full-name trailer atom and an exact `ShortBreaks` trailer atom, then makes one space plus that trailer optional after the existing closing `)`. `REMV_RE`, action interpretation, Debian version comparison, AG/AK/BJ bindings, 145-root accounting, `git-core -> git`, findings, ordering, and serialization are unchanged.
```text
004C1BN_TRANSFORMER_BYTES = 1935
004C1BN_TRANSFORMER_SHA256 = 8958a443673666dfd94149686037ba1645a3068888a810775f02d1a040c63539
004C1BN_REPAIRED_PARSER_BYTES = 21835
004C1BN_REPAIRED_PARSER_SHA256 = 8b5b6ac91bcc5de7c809bce9029b33cc02ab584eab87168c0ef46098945db584
PARSER_DELTA_BYTES = +166
```
The exact added grammar is:
```python
TRAILER_FULL_RE = rf"{PKG_RE}(?::{ARCH_RE})?"
SHORT_BREAKS_TRAILER_RE = rf"\[(?:{TRAILER_FULL_RE} )*\]"
```
and both existing `Inst` and `Conf` expressions gain only `(?: {SHORT_BREAKS_TRAILER_RE})?` immediately after their existing closing `)` anchor position.
## 5. Static qualification and strict-negative coverage
```text
004C1BN_TEST_HARNESS_BYTES = 6820
004C1BN_TEST_HARNESS_SHA256 = ab40651e322818d54156e65d57803ff80506162ab10a6df82ffa30627053698a
004C1BN_TEST_RESULT_BYTES = 1428
004C1BN_TEST_RESULT_SHA256 = 57056ef5d79c4d66285b5315d9992abbda47206d8f55ef8b6097b00bec37cdcb
POSITIVE_GRAMMAR_FIXTURES = 6
NEGATIVE_TRAILER_FIXTURES = 9
OBSERVED_INST_LINES = 709
OBSERVED_CONF_LINES = 709
OBSERVED_REMOVAL_LINES = 1
OBSERVED_INST_SHORTBREAKS_TRAILERS = 40
OBSERVED_CONF_SHORTBREAKS_TRAILERS = 6
ROOT_ACCOUNTING = 145/145
DETERMINISTIC_REPARSE_A_B = PASS
```
Positive fixtures cover no trailer, `[]`, and `[perl:amd64 ]` on both `Inst` and `Conf`. Negative fixtures reject missing trailing space, leading internal space, double trailing space, double inter-item space, nested brackets, invalid `/` package syntax, multiline input, extra text after the trailer, and the distinct source diagnostic `[foo:amd64 on bar:amd64]`.
## 6. Canonical interpretation of the preserved Replay A
The repaired parser is run twice against the exact same 132,913 preserved APT stdout bytes with the exact canonical AG, AK, and BJ inputs. Both runs are byte-identical for parser result, transaction JSONL, and selected archive identity set.
```text
PARSER_REPAIR_QUALIFIES = true
PRESERVED_REPLAY_A_PARSER_COMPLETES = true
PRESERVED_REPLAY_A_QUALIFIES = false
RECORD_COUNT = 718
INSTALL = 650
UPGRADE = 59
DOWNGRADE = 0
REMOVE = 1
KEEP_BACK = 0
UNCHANGED_REQUESTED_ROOT = 8
PARSER_RESULT_BYTES = 358163
PARSER_RESULT_SHA256 = af34981afda90530809432af615758c50485a9b4104c3a55d830acdd54d3bee6
CANONICAL_TRANSACTION_JSONL_BYTES = 357404
CANONICAL_TRANSACTION_JSONL_SHA256 = eb4851027ba426113da526f23a6f1b6edcf12a832ab6c9df53c767c2656ec317
SELECTED_ARCHIVE_IDENTITY_COUNT = 709
SELECTED_ARCHIVE_IDENTITY_SET_BYTES = 173255
SELECTED_ARCHIVE_IDENTITY_SET_SHA256 = fe750ee2b582eb9b709f3857f7b04925ab0646885fa7f2cf69ae67bc3a1bfaa4
```
Exact findings:
```json
[{"code":"REMOVE_SUMMARY","line":184},{"architecture":"amd64","code":"REMOVE","fromVersion":"0.29.2-1ubuntu3","package":"pkg-config"}]
```
The first finding is the preserved APT summary marker `The following packages will be REMOVED:`. The second is the exact action record `Remv pkg-config [0.29.2-1ubuntu3]`, resolved against the canonical predecessor installed state as `amd64`. Consequently, the grammar repair itself qualifies, but the already-consumed Stage B Replay A remains nonqualifying. 004C1BN does not authorize replacing or retrying that replay.
## 7. Retained preserved stdout evidence
The exact preserved APT stdout is retained here as deterministic XZ bytes encoded with base64 solely for review/reproduction. Two independent compression calls in the same static process produced identical XZ bytes.
```text
RAW_APT_STDOUT_BYTES = 132913
RAW_APT_STDOUT_SHA256 = 6f5efa623e9551f1f159db61b014a04b46a20cc69f3037dfb715023c462067e8
RETAINED_XZ_BYTES = 13356
RETAINED_XZ_SHA256 = b9a0460e11ccc614838f5f322644cea074802f239a59fd0a70f4c79c6defb6ec
RETAINED_BASE64_PLUS_LF_BYTES = 17809
RETAINED_BASE64_PLUS_LF_SHA256 = 7b7fd21a683e9b3d1c9dce1a650764b927549393659ade72a58a8bbad786d839
```
```base64
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
CABMWR7vscRn+wIAAAAABFla
```
## 8. Frozen transformation builder
```python
#!/usr/bin/env python3
import hashlib,sys
from pathlib import Path
EXPECTED=(21669,'2fe9378cd97621ae141fa7f5252ac7741522ba930753fa5f25b557c3589e1e40')
def ident(b): return len(b),hashlib.sha256(b).hexdigest()
if len(sys.argv)!=3: raise SystemExit('usage: 004c1bn-transform.py INPUT OUTPUT')
src=Path(sys.argv[1]); out=Path(sys.argv[2]); b=src.read_bytes()
if ident(b)!=EXPECTED: raise SystemExit(f'INPUT_IDENTITY_MISMATCH {ident(b)}')
text=b.decode('utf-8')
old='''PKG_RE = r"[A-Za-z0-9][A-Za-z0-9+.-]*"\nARCH_RE = r"[A-Za-z0-9][A-Za-z0-9-]*"\nFULL_RE = rf"(?P<full>{PKG_RE}(?::{ARCH_RE})?)"\nINST_RE = re.compile(\n    rf"^Inst {FULL_RE}(?: \\[(?P<from>[^\\[\\]\\s]+)\\])? "\n    rf"\\((?P<to>[^\\s()\\[\\]]+) (?P<rel>[^\\[\\]\\r\\n]*) \\[(?P<arch>{ARCH_RE})\\]\\)$"\n)\nCONF_RE = re.compile(\n    rf"^Conf {FULL_RE} \\((?P<to>[^\\s()\\[\\]]+) (?P<rel>[^\\[\\]\\r\\n]*) "\n    rf"\\[(?P<arch>{ARCH_RE})\\]\\)$"\n)\nREMV_RE = re.compile(rf"^(?P<verb>Remv|Purg) {FULL_RE} \\[(?P<from>[^\\[\\]\\s]+)\\]$")\n'''
new='''PKG_RE = r"[A-Za-z0-9][A-Za-z0-9+.-]*"\nARCH_RE = r"[A-Za-z0-9][A-Za-z0-9-]*"\nFULL_RE = rf"(?P<full>{PKG_RE}(?::{ARCH_RE})?)"\nTRAILER_FULL_RE = rf"{PKG_RE}(?::{ARCH_RE})?"\nSHORT_BREAKS_TRAILER_RE = rf"\\[(?:{TRAILER_FULL_RE} )*\\]"\nINST_RE = re.compile(\n    rf"^Inst {FULL_RE}(?: \\[(?P<from>[^\\[\\]\\s]+)\\])? "\n    rf"\\((?P<to>[^\\s()\\[\\]]+) (?P<rel>[^\\[\\]\\r\\n]*) \\[(?P<arch>{ARCH_RE})\\]\\)(?: {SHORT_BREAKS_TRAILER_RE})?$"\n)\nCONF_RE = re.compile(\n    rf"^Conf {FULL_RE} \\((?P<to>[^\\s()\\[\\]]+) (?P<rel>[^\\[\\]\\r\\n]*) "\n    rf"\\[(?P<arch>{ARCH_RE})\\]\\)(?: {SHORT_BREAKS_TRAILER_RE})?$"\n)\nREMV_RE = re.compile(rf"^(?P<verb>Remv|Purg) {FULL_RE} \\[(?P<from>[^\\[\\]\\s]+)\\]$")\n'''
if text.count(old)!=1: raise SystemExit(f'REGEX_BLOCK_COUNT {text.count(old)}')
result=text.replace(old,new,1).encode()
out.write_bytes(result)
print(f'{len(result)} {hashlib.sha256(result).hexdigest()}')
```
## 9. Frozen static qualification harness
```python
#!/usr/bin/env python3
import hashlib,importlib.util,json,re,subprocess,tempfile
from pathlib import Path
BASE=Path('/private/tmp/004c1bl-stage-b-parser.py')
CAND=Path('/private/tmp/004c1bn-stage-b-parser.py')
BUILDER=Path('/private/tmp/004c1bn-transform.py')
APT_SOURCE=Path('/private/tmp/signthos-apt-source-2.4.13/apt-pkg/algorithms.cc')
RAW=Path('/private/tmp/signthos-004c1bl-replay-A-reissued-20260910T201836Z/host-static/apt.stdout')
CLOSURE=Path('/private/tmp/signthos-004c1ag-final-A.9967/resolved-closure.json')
INSTALLED=Path('/private/tmp/signthos-004c1bm-virtual-installed-packages.json')
ARCHIVES=Path('/private/tmp/signthos-004c1ak-A/verified-archives.json')
EXP={'base':(21669,'2fe9378cd97621ae141fa7f5252ac7741522ba930753fa5f25b557c3589e1e40'),'source':(52846,'6dd7c7a4bfdb03f269e895f6290e456ed4963bdf91707715d0c54609da97ec1e'),'raw':(132913,'6f5efa623e9551f1f159db61b014a04b46a20cc69f3037dfb715023c462067e8'),'closure':(293999,'bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970'),'installed':(27625,'14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7'),'archives':(439991,'38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98')}
def ident(p):
 b=p.read_bytes(); return len(b),hashlib.sha256(b).hexdigest()
for name,p in [('base',BASE),('source',APT_SOURCE),('raw',RAW),('closure',CLOSURE),('installed',INSTALLED),('archives',ARCHIVES)]:
 if ident(p)!=EXP[name]: raise SystemExit(f'IDENTITY_MISMATCH {name} {ident(p)}')
source=APT_SOURCE.read_text()
markers=['cout << "Inst ";','Describe(Pkg,cout,true,true);','cout << "Conf ";','Describe(Pkg,cout,false,true);','void pkgSimulate::ShortBreaks()','cout << " [";','cout << I.FullName(false) << \' \';',"cout << ']' << endl;"]
if not all(x in source for x in markers): raise SystemExit('APT_SOURCE_MARKER_MISSING')
with tempfile.TemporaryDirectory() as td:
 regen=Path(td)/'parser.py'
 cp=subprocess.run(['python3',str(BUILDER),str(BASE),str(regen)],capture_output=True,text=True)
 if cp.returncode!=0 or regen.read_bytes()!=CAND.read_bytes(): raise SystemExit('BUILDER_REGEN_MISMATCH')
spec=importlib.util.spec_from_file_location('bn',CAND); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
pos_inst=['Inst foo (1.0 Ubuntu:22.04/jammy [amd64])','Inst foo (1.0 Ubuntu:22.04/jammy [amd64]) []','Inst foo (1.0 Ubuntu:22.04/jammy [amd64]) [perl:amd64 ]']
pos_conf=['Conf foo (1.0 Ubuntu:22.04/jammy [amd64])','Conf foo (1.0 Ubuntu:22.04/jammy [amd64]) []','Conf foo (1.0 Ubuntu:22.04/jammy [amd64]) [perl:amd64 ]']
for x in pos_inst:
 if m.INST_RE.fullmatch(x) is None: raise SystemExit(f'POS_INST_REJECT {x!r}')
for x in pos_conf:
 if m.CONF_RE.fullmatch(x) is None: raise SystemExit(f'POS_CONF_REJECT {x!r}')
neg=[' [perl:amd64]',' [ perl:amd64 ]',' [perl:amd64  ]',' [perl:amd64  foo:amd64 ]',' [[perl:amd64 ]]',' [perl/amd64 ]',' [perl:amd64\n]',' [perl:amd64 ] extra',' [foo:amd64 on bar:amd64]']
inst_core='Inst foo (1.0 Ubuntu:22.04/jammy [amd64])'
conf_core='Conf foo (1.0 Ubuntu:22.04/jammy [amd64])'
for suf in neg:
 if m.INST_RE.fullmatch(inst_core+suf) is not None: raise SystemExit(f'NEG_INST_ACCEPT {suf!r}')
 if m.CONF_RE.fullmatch(conf_core+suf) is not None: raise SystemExit(f'NEG_CONF_ACCEPT {suf!r}')
raw=RAW.read_bytes(); lines=raw.decode().splitlines()
inst=[x for x in lines if x.startswith('Inst ')]; conf=[x for x in lines if x.startswith('Conf ')]; rem=[x for x in lines if x.startswith(('Remv ','Purg '))]
if not all(m.INST_RE.fullmatch(x) for x in inst): raise SystemExit('OBSERVED_INST_REJECT')
if not all((re.fullmatch(rf'Conf {m.PKG_RE}(?::{m.ARCH_RE})? broken',x) or m.CONF_RE.fullmatch(x)) for x in conf): raise SystemExit('OBSERVED_CONF_REJECT')
trail_inst=sum(1 for x in inst if re.search(r'\) \[[^\n]*\]$',x)); trail_conf=sum(1 for x in conf if re.search(r'\) \[[^\n]*\]$',x))
if (len(inst),len(conf),len(rem),trail_inst,trail_conf)!=(709,709,1,40,6): raise SystemExit('OBSERVED_CENSUS_MISMATCH')
closure=json.loads(CLOSURE.read_text()); installed=json.loads(INSTALLED.read_text()); archives=json.loads(ARCHIVES.read_text())
r1,t1,a1=m.parse_stage_b(raw,closure,installed,archives); r2,t2,a2=m.parse_stage_b(raw,closure,installed,archives)
b1=(json.dumps(r1,ensure_ascii=False,separators=(',',':'),sort_keys=True)+'\n').encode(); b2=(json.dumps(r2,ensure_ascii=False,separators=(',',':'),sort_keys=True)+'\n').encode()
if b1!=b2 or t1!=t2 or a1!=a2: raise SystemExit('NONDETERMINISTIC_REPARSE')
expected_counts={'INSTALL':650,'UPGRADE':59,'DOWNGRADE':0,'REMOVE':1,'KEEP_BACK':0,'UNCHANGED_REQUESTED_ROOT':8}
if r1['qualifies'] is not False or r1['recordCountByAction']!=expected_counts: raise SystemExit('UNEXPECTED_REPLAY_RESULT')
expected_findings=[{'code':'REMOVE_SUMMARY','line':184},{'code':'REMOVE','package':'pkg-config','architecture':'amd64','fromVersion':'0.29.2-1ubuntu3'}]
if r1['findings']!=expected_findings: raise SystemExit(f'UNEXPECTED_FINDINGS {r1["findings"]!r}')
records={(x['package'],x['architecture']) for x in r1['records']}
coverage=0
for root in m.STAGE_B_ROOTS:
 rp=m.STAGE_B_VIRTUAL_ROOT_PROVIDER_MAP.get(root,root)
 meta=[x for x in closure if x['package']==rp]
 if len(meta)!=1: raise SystemExit(f'ROOT_META {root} {len(meta)}')
 if (rp,meta[0]['architecture']) not in records: raise SystemExit(f'ROOT_UNACCOUNTED {root}')
 coverage+=1
out={'schema':'signthos.004c1bn.static-qualification.v1','baseParser':{'bytes':ident(BASE)[0],'sha256':ident(BASE)[1]},'candidateParser':{'bytes':ident(CAND)[0],'sha256':ident(CAND)[1]},'aptSource':{'commit':'581ec5c0aa2c6665d72465040f1465eb93503200','tree':'e9afcae41f88040e93eb7a10a89e72c00b59e245','algorithmsCcBytes':ident(APT_SOURCE)[0],'algorithmsCcSha256':ident(APT_SOURCE)[1]},'grammarPositiveFixtures':6,'grammarNegativeSuffixFixtures':len(neg),'observedInstLines':len(inst),'observedConfLines':len(conf),'observedRemovalLines':len(rem),'observedInstShortBreaksTrailers':trail_inst,'observedConfShortBreaksTrailers':trail_conf,'rootAccounting':f'{coverage}/{len(m.STAGE_B_ROOTS)}','deterministicReparseAB':'PASS','replayAQualifies':r1['qualifies'],'recordCount':r1['recordCount'],'recordCountByAction':r1['recordCountByAction'],'findings':r1['findings'],'parserResult':{'bytes':len(b1),'sha256':hashlib.sha256(b1).hexdigest()},'transactionJsonl':{'bytes':len(t1),'sha256':hashlib.sha256(t1).hexdigest()},'selectedArchiveIdentitySet':{'bytes':len(a1),'sha256':hashlib.sha256(a1).hexdigest(),'count':r1['selectedArchiveIdentityCount']}}
q=(json.dumps(out,separators=(',',':'),sort_keys=True)+'\n').encode(); Path('/private/tmp/004c1bn-test-result.json').write_bytes(q)
Path('/private/tmp/004c1bn-parser-result.json').write_bytes(b1); Path('/private/tmp/004c1bn-transaction.jsonl').write_bytes(t1); Path('/private/tmp/004c1bn-selected-archives.json').write_bytes(a1)
print(q.decode(),end='')
```
## 10. Exact static qualification result
```json
{"aptSource":{"algorithmsCcBytes":52846,"algorithmsCcSha256":"6dd7c7a4bfdb03f269e895f6290e456ed4963bdf91707715d0c54609da97ec1e","commit":"581ec5c0aa2c6665d72465040f1465eb93503200","tree":"e9afcae41f88040e93eb7a10a89e72c00b59e245"},"baseParser":{"bytes":21669,"sha256":"2fe9378cd97621ae141fa7f5252ac7741522ba930753fa5f25b557c3589e1e40"},"candidateParser":{"bytes":21835,"sha256":"8b5b6ac91bcc5de7c809bce9029b33cc02ab584eab87168c0ef46098945db584"},"deterministicReparseAB":"PASS","findings":[{"code":"REMOVE_SUMMARY","line":184},{"architecture":"amd64","code":"REMOVE","fromVersion":"0.29.2-1ubuntu3","package":"pkg-config"}],"grammarNegativeSuffixFixtures":9,"grammarPositiveFixtures":6,"observedConfLines":709,"observedConfShortBreaksTrailers":6,"observedInstLines":709,"observedInstShortBreaksTrailers":40,"observedRemovalLines":1,"parserResult":{"bytes":358163,"sha256":"af34981afda90530809432af615758c50485a9b4104c3a55d830acdd54d3bee6"},"recordCount":718,"recordCountByAction":{"DOWNGRADE":0,"INSTALL":650,"KEEP_BACK":0,"REMOVE":1,"UNCHANGED_REQUESTED_ROOT":8,"UPGRADE":59},"replayAQualifies":false,"rootAccounting":"145/145","schema":"signthos.004c1bn.static-qualification.v1","selectedArchiveIdentitySet":{"bytes":173255,"count":709,"sha256":"fe750ee2b582eb9b709f3857f7b04925ab0646885fa7f2cf69ae67bc3a1bfaa4"},"transactionJsonl":{"bytes":357404,"sha256":"eb4851027ba426113da526f23a6f1b6edcf12a832ab6c9df53c767c2656ec317"}}
```
## 11. Acceptance and nonclaims
004C1BN qualifies only the narrow Stage B `ShortBreaks` trailer grammar repair and the deterministic interpretation of the already-preserved Replay A bytes. It does not make Replay A qualifying, does not authorize a replacement replay, and does not authorize Replay B, Stage C, package provisioning, PDFium/provider execution, 004C2, 004D, or Specification 005.
The canonical next step after exact-head review, guarded merge, and post-merge closeout is a fresh Issue #7 successor reconciliation based on the actual parser-qualified Replay A findings. No execution authority is inherited from this candidate.
