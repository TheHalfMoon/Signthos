# 004C1BX — Stage C predeclared conflict-transition disposition qualification

Status: `STATIC_TRANSACTION_POLICY_DISPOSITION_CANDIDATE / ZERO_NEW_SOLVER_EXECUTION`

Authority: `github:issue-comment:5628592785`
Canonical base: `bddfd873e64a609e0cbe2a787484e2e86caed403`
Canonical base tree: `1b7945ba176944b4b29f83fb56186541c19fdb2a`

## 1. Purpose and authority boundary

004C1BX decides one policy question only: whether the exact `REMOVE pkgconf:amd64@1.8.0-1` finding preserved from the already-consumed Stage C Replay A may be accepted at a separate transaction-policy layer because canonical 004C1BW proves it is exactly the predeclared reverse-direction `pkgconf` / `pkg-config` cross-stage conflict transition.

This unit does not mutate the parser, parser finding policy, root set, stage order, preserved runtime bytes, package metadata, or transaction bytes. It performs no Docker, APT, dpkg, package operation, Replay A retry/replacement, Replay B, virtual-state derivation, PDFium/provider execution, 004C2, 004D, or Specification 005 execution.

```text
PARSER_SOURCE_MUTATION = 0
PARSER_FINDING_POLICY_MUTATION = 0
GENERIC_REMOVE_ACCEPTANCE = false
REPLAY_A_RETRY_OR_REPLACEMENT = 0
REPLAY_B_EXECUTION = 0
STAGE_C_VIRTUAL_STATE_DERIVATION = 0
DOCKER_APT_DPKG_EXECUTION = 0
PACKAGE_OPERATION_EXECUTION = 0
PDFIUM_OR_PROVIDER_EXECUTION = 0
```

## 2. Exact canonical inputs

```text
004C1AL_BYTES = 21275
004C1AL_LINES = 452
004C1AL_SHA256 = 099260342a77d2fc93404d3cc5babede5eddb9411d0a0a4c4f3d2ec7c101fe2f

004C1BR_BYTES = 414390
004C1BR_LINES = 5451
004C1BR_SHA256 = a0f861d828282771809700645b694ba290a6d6bd1d56918cf496b1025a95cbed

004C1BV_BYTES = 64476
004C1BV_LINES = 1177
004C1BV_SHA256 = 51aa890a4bbc5a4404941df3b6016b51bf2859cc6c221807f789d7259e87018a

004C1BW_BYTES = 139761
004C1BW_LINES = 711
004C1BW_SHA256 = cee625784f0eaa8ee899081621f3c592ecb5fa691375f87aeb6ad8af968d1eb3
```

Canonical 004C1AL requires every `DOWNGRADE`, `REMOVE`, or `KEEP_BACK` occurrence to be surfaced and reconciled against the deterministic provisioning contract rather than silently accepted. It binds Stage C roots exactly to `[curl, build-essential, pkg-config, rsync]`, requires `pkg-config` to remain repeated and stage-visible, and binds the stage order to `[STAGE_A, STAGE_B, STAGE_C]`.

Canonical 004C1BR binds the Stage C predecessor installed-state to `98938 / 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea` with 904 package keys. That state contains `pkgconf:amd64@1.8.0-1` and no `pkg-config` row.

## 3. Exact preserved Stage C parser and transaction facts

Canonical 004C1BV preserves the exact Stage C Replay A parser result and transaction without accepting the removal:

```text
PARSER_RESULT_BYTES = 2793
PARSER_RESULT_SHA256 = 5c336bebb675d2be4f60509da243684dba7e785d654bca5757aa3eda34b06b06
TRANSACTION_JSONL_BYTES = 2059
TRANSACTION_JSONL_SHA256 = 72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f
RECORD_COUNT = 5
INSTALL = 2
UPGRADE = 0
DOWNGRADE = 0
REMOVE = 1
KEEP_BACK = 0
UNCHANGED_REQUESTED_ROOT = 2
ROOT_ACCOUNTING = 4/4
PARSER_RESULT_QUALIFIES = false
```

The exact preserved findings remain:

```json
[{"code":"REMOVE_SUMMARY","line":7},{"architecture":"amd64","code":"REMOVE","fromVersion":"1.8.0-1","package":"pkgconf"}]
```

The relevant transaction actions remain exactly:

```text
INSTALL pkg-config:amd64 from null to 0.29.2-1ubuntu3
REMOVE pkgconf:amd64 from 1.8.0-1 to null
```

There are zero additional removals, zero downgrades, and zero keep-backs.

## 4. Canonical named-transition causality

Canonical 004C1BW proves the sole removal is exactly the predeclared Stage C conflict transition:

```text
PREDECESSOR_INSTALLED = pkgconf:amd64@1.8.0-1
PREDECESSOR_PKG_CONFIG_PRESENT = false
STAGE_C_REQUESTED_REPLACEMENT = pkg-config
STAGE_C_PKGCONF_REQUESTED = false
SELECTED_PKGCONF_BREAKS = pkg-config (>= 0.29-1)
SELECTED_PKGCONF_PROVIDES = pkg-config (= 0.29-1)
INCOMING_PKG_CONFIG = pkg-config:amd64@0.29.2-1ubuntu3
BREAKS_PREDICATE_MATCH = true
TRANSACTION_INSTALLS_PKG_CONFIG_EXACT = true
TRANSACTION_REMOVES_PKGCONF_EXACT = true
ADDITIONAL_REMOVALS = 0
DOWNGRADES = 0
KEEP_BACKS = 0
PREDECLARED_CROSS_STAGE_TRANSITION_MATCH = PASS
GENERIC_REMOVE_ACCEPTANCE = false
```

004C1BW proves causality only; it deliberately leaves transaction-policy acceptance undecided.

## 5. Seven-part disposition predicate

The consumed Stage C Replay A may qualify at the transaction-policy layer only when every predicate below is true:

1. `parser_result_identity`: the parser result remains exactly `2793 / 5c336bebb675d2be4f60509da243684dba7e785d654bca5757aa3eda34b06b06`, `qualifies=false`, with the original findings unchanged;
2. `forbidden_action_cardinality`: `DOWNGRADE=0`, `KEEP_BACK=0`, `REMOVE=1`, and there is no additional removal;
3. `sole_remove_identity`: the only removed package is exactly `pkgconf:amd64@1.8.0-1`;
4. `predeclared_transition`: canonical 004C1BW's exact causality predicate passes without modification;
5. `replacement_and_root_accounting`: the exact transaction installs `pkg-config:amd64@0.29.2-1ubuntu3` and preserves `4/4` Stage C requested-root accounting;
6. `ordered_stage_contract`: canonical 004C1AL still binds Stage C roots exactly to `[curl, build-essential, pkg-config, rsync]`, preserves repeated `pkg-config` visibility, and retains `[STAGE_A, STAGE_B, STAGE_C]` ordering;
7. `non_generalization`: the disposition is keyed to the exact parser-result identity, transaction identity, removed identity, installed replacement identity, `Breaks` expression, root accounting, and stage contract above and cannot match another removal or future solver output.

Any failed predicate fails closed. A different parser result, transaction hash, removed identity, replacement identity, package version, architecture, conflict expression, root accounting, additional removal, downgrade, keep-back, root set, stage order, or solver output requires separate authority.

## 6. Deterministic repository-bound evaluation

The evaluator below reads only the four canonical repository documents permitted by authority, verifies their complete byte identities before use, extracts the already-canonical Stage C parser result/transaction and 004C1BW causality result, and evaluates the seven predicates. It performs no Docker/APT/dpkg or package operation.

Evaluator identity before embedding: `5097 / 1f7e01e6e67b81b700da756936ab29417e8bc27e053bb98f551d58f2fc965752`.

````python
#!/usr/bin/env python3
import hashlib, json, re, sys
from pathlib import Path

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else '.').resolve()
DOCS = {
    'al': ('specs/004-local-pdf-core/004c1al-pdfium-staged-apt-transaction-simulation-contract-qualification.md', 21275, '099260342a77d2fc93404d3cc5babede5eddb9411d0a0a4c4f3d2ec7c101fe2f'),
    'br': ('specs/004-local-pdf-core/004c1br-stage-b-virtual-installed-state-derivation-qualification.md', 414390, 'a0f861d828282771809700645b694ba290a6d6bd1d56918cf496b1025a95cbed'),
    'bv': ('specs/004-local-pdf-core/004c1bv-stage-c-removal-shortbreaks-trailer-grammar-repair-qualification.md', 64476, '51aa890a4bbc5a4404941df3b6016b51bf2859cc6c221807f789d7259e87018a'),
    'bw': ('specs/004-local-pdf-core/004c1bw-stage-c-pkgconf-pkg-config-conflict-transition-qualification.md', 139761, 'cee625784f0eaa8ee899081621f3c592ecb5fa691375f87aeb6ad8af968d1eb3'),
}

def ident(data):
    return len(data), hashlib.sha256(data).hexdigest()

def bound(name):
    rel, n, h = DOCS[name]
    data = (ROOT / rel).read_bytes()
    assert ident(data) == (n, h), (name, ident(data), (n, h))
    return data.decode('utf-8')

def fenced(text, lang, contains):
    vals = re.findall(r'`{3,4}' + re.escape(lang) + r'\n(.*?)\n`{3,4}', text, re.S)
    matches = [v for v in vals if contains in v]
    assert len(matches) == 1, (lang, contains, len(matches))
    return matches[0]

al = bound('al'); br = bound('br'); bv = bound('bv'); bw = bound('bw')
assert 'STAGE_C_ROOTS = [curl, build-essential, pkg-config, rsync]' in al
assert 'APT_STAGE_ORDER = [STAGE_A, STAGE_B, STAGE_C]' in al
assert '`pkg-config` is intentionally repeated and must not be deduplicated across stages before solver behavior is observed.' in al
assert '`DOWNGRADE`, `REMOVE`, or `KEEP_BACK` is never silently accepted merely because APT emitted it.' in al
assert 'virtual-installed-packages.json = 98938 / 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea' in br

parser = json.loads(fenced(bv, 'json', '"schema":"signthos.004c1bt.stage-c-apt-parser-result.v1"'))
tx = [json.loads(x) for x in fenced(bv, 'jsonl', '"stageId":"STAGE_C"').splitlines()]
bwq = json.loads(fenced(bw, 'json', '"schema":"signthos.004c1bw.stage-c-conflict-transition-causality.v1"'))

expected_findings = [
    {'code':'REMOVE_SUMMARY','line':7},
    {'architecture':'amd64','code':'REMOVE','fromVersion':'1.8.0-1','package':'pkgconf'},
]
assert parser['qualifies'] is False
assert parser['findings'] == expected_findings
assert parser['canonicalTransactionJsonlBytes'] == 2059
assert parser['canonicalTransactionJsonlSha256'] == '72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f'

counts = {k: sum(r['action'] == k for r in tx) for k in ['INSTALL','UPGRADE','DOWNGRADE','REMOVE','KEEP_BACK','UNCHANGED_REQUESTED_ROOT']}
assert counts == {'INSTALL':2,'UPGRADE':0,'DOWNGRADE':0,'REMOVE':1,'KEEP_BACK':0,'UNCHANGED_REQUESTED_ROOT':2}
removes = [r for r in tx if r['action'] == 'REMOVE']
assert removes == [{'stageId':'STAGE_C','action':'REMOVE','package':'pkgconf','architecture':'amd64','fromVersion':'1.8.0-1','toVersion':None,'canonicalPackageMetadataSha256':None,'filename':None,'archiveBytes':None,'archiveSha256':None,'selectedSuite':None,'selectedComponent':None,'reasonClass':None}]
pkg_config = [r for r in tx if r['action'] == 'INSTALL' and r['package'] == 'pkg-config']
assert len(pkg_config) == 1 and pkg_config[0]['architecture'] == 'amd64' and pkg_config[0]['toVersion'] == '0.29.2-1ubuntu3'

for key, value in {
    'predecessorPkgconfExact': True,
    'predecessorPkgConfigAbsent': True,
    'stageCPkgConfigRequested': True,
    'stageCPkgconfRequested': False,
    'selectedPkgconfBreaks': 'pkg-config (>= 0.29-1)',
    'incomingPkgConfigVersion': '0.29.2-1ubuntu3',
    'breaksPredicateMatches': True,
    'transactionInstallsPkgConfigExact': True,
    'transactionRemovesPkgconfExact': True,
    'additionalRemovals': 0,
    'downgrades': 0,
    'keepBacks': 0,
    'rootAccounting': '4/4',
    'parserResultQualifies': False,
    'originalFindingsPreserved': True,
    'genericRemoveAcceptance': False,
    'predeclaredCrossStageTransitionMatch': 'PASS',
}.items():
    assert bwq[key] == value, (key, bwq.get(key), value)

result = {
    'forbiddenActionCardinality': 'PASS',
    'genericRemoveAcceptance': False,
    'namedTransitionReconciled': True,
    'nonGeneralization': 'PASS',
    'orderedStageContract': 'PASS',
    'originalFindingsPreserved': True,
    'parserResultQualifies': False,
    'parserResultSha256': '5c336bebb675d2be4f60509da243684dba7e785d654bca5757aa3eda34b06b06',
    'predeclaredTransitionCausality': 'PASS',
    'replacementAndRootAccounting': 'PASS',
    'schema': 'signthos.004c1bx.stage-c-conflict-transition-disposition.v1',
    'soleRemoveIdentity': 'pkgconf:amd64@1.8.0-1',
    'stageCReplayATransactionPolicyQualifies': True,
    'transactionSha256': '72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f',
}
out = (json.dumps(result, sort_keys=True, separators=(',', ':')) + '\n').encode()
sys.stdout.buffer.write(out)
````

Two fresh invocations from canonical base `bddfd873e64a609e0cbe2a787484e2e86caed403` produced byte-identical result bytes.

```json
{"forbiddenActionCardinality":"PASS","genericRemoveAcceptance":false,"namedTransitionReconciled":true,"nonGeneralization":"PASS","orderedStageContract":"PASS","originalFindingsPreserved":true,"parserResultQualifies":false,"parserResultSha256":"5c336bebb675d2be4f60509da243684dba7e785d654bca5757aa3eda34b06b06","predeclaredTransitionCausality":"PASS","replacementAndRootAccounting":"PASS","schema":"signthos.004c1bx.stage-c-conflict-transition-disposition.v1","soleRemoveIdentity":"pkgconf:amd64@1.8.0-1","stageCReplayATransactionPolicyQualifies":true,"transactionSha256":"72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f"}
```

```text
QUALIFICATION_RESULT_BYTES = 639
QUALIFICATION_RESULT_SHA256 = 03f85bf68c5c51c14472baace77e9f3fb537ee438483686dd0a9788ebc519339
```

## 7. Qualification result

```text
PARSER_RESULT_QUALIFIES = false
PARSER_FINDINGS_PRESERVED = true
NAMED_TRANSITION_RECONCILED = true
STAGE_C_REPLAY_A_TRANSACTION_POLICY_QUALIFIES = true
GENERIC_REMOVE_ACCEPTANCE = false
PARSER_FINDING_POLICY_CHANGED = false
STAGE_C_TRANSACTION_IDENTITY_CHANGED = false
STAGE_C_ROOT_ACCOUNTING = 4/4
```

This result does not rewrite the parser's `qualifies=false` field. It records a separate higher-level transaction-policy disposition: the sole `REMOVE` finding is accepted only because it is byte- and identity-bound to the exact Stage C reverse-direction conflict transition already proven by 004C1BW. The original parser result and findings remain evidence.

## 8. What this result does and does not establish

004C1BX establishes only that the already-consumed Stage C Replay A is acceptable at the transaction-policy layer under this one named transition. It does not establish Stage C determinism by itself. The canonical staged transaction contract still requires two independent fresh simulation replays with byte-identical canonical transaction outputs before Stage C transaction determinism can be claimed.

A separately authorized Replay B may be considered only after 004C1BX receives exact-head independent substantive review, guarded merge, post-merge mechanical verification, and canonical closeout. Any future Replay B authority must not permit Replay A replacement or retry and must require the same frozen Stage C input/harness, the canonical repaired Stage C parser, and byte-for-byte comparison against the already-preserved Replay A transaction.

No Replay B, Stage C virtual installed-state derivation, package acquisition, package installation, PDFium/provider execution, 004C2, 004D, or Specification 005 work is authorized by this document.
