# 004C1BJ — Stage A virtual installed-state derivation qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_DETERMINISTIC_DERIVATION_ONLY / ZERO_APT_OR_DOCKER_EXECUTION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `f6e8927eb65fd504b7d81be7b4bbaf5e8c213613`
Authority source: `github:issue-comment:5621837002`
Stage A replay qualification: `github:issue-comment:5621797683`

## 1. Purpose and authority boundary

004C1BH and 004C1BI establish byte-identical canonical Stage A transaction output across two fresh solver replays. Stage B cannot start from the original image status because canonical 004C1AL requires the immediately preceding successful simulation to define the predecessor installed state. This grain qualifies only the deterministic transformation from the exact base status plus the exact Stage A transaction and exact snapshot package stanzas into a virtual Stage A successor state.

```text
004C1BJ_AUTHORITY = STATIC_DETERMINISTIC_DERIVATION_ONLY
004C1BJ_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1bj-stage-a-virtual-installed-state-derivation-qualification.md
DOCKER_EXECUTION = 0
APT_GET_EXECUTION = 0
APT_CONFIG_EXECUTION = 0
DPKG_EXECUTION = 0
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = 0
STAGE_B_SIMULATION = NOT_AUTHORIZED
STAGE_C_SIMULATION = NOT_AUTHORIZED
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Exact input identities

```text
BASE_DPKG_STATUS_BYTES = 231024
BASE_DPKG_STATUS_SHA256 = 49176dcea062ad5a71df28c178ce241a6bcf9a2ec7e1525a1445a143bfd1080b
BASE_INSTALLED_PACKAGE_COUNT = 231
BASE_INSTALLED_PACKAGES_BYTES = 25060
BASE_INSTALLED_PACKAGES_SHA256 = bdc5c6bbbe47db0313b2281b67e2f152ad75e93ab169bbfccf0b5441444694ba
STAGE_A_TRANSACTION_BYTES = 12229
STAGE_A_TRANSACTION_SHA256 = 64de571251fd51da1df513b6be7e588b4479556153d9ce5d58e99bddf2d4fc20
STAGE_A_TRANSACTION_RECORD_COUNT = 25
STAGE_A_INSTALL_COUNT = 24
STAGE_A_UPGRADE_COUNT = 1
STAGE_A_DOWNGRADE_REMOVE_KEEP_BACK_COUNT = 0
```

The uncompressed snapshot index universe is the canonical 004C1AU output. Replay A and Replay B copies are byte-identical for every file:

| Packages index | Bytes | SHA-256 |
| --- | ---: | --- |
| `jammy-security__main__Packages` | 20025980 | `dbd457849762832bbe31a16ebf4bd9589ee199c098dfab9644ff492e93104f91` |
| `jammy-security__multiverse__Packages` | 531283 | `0d2c5a73d67917c70c6aceb3cb8cf6cad539e7b7c9a89a1ff83b48264cf95acf` |
| `jammy-security__restricted__Packages` | 36809356 | `8a8b903ffb5de341a37b3bdf202bf519a7ab0d17c4c1ff66eb8c19363f807ae5` |
| `jammy-security__universe__Packages` | 6183008 | `3230ca3f52e3afccff85b059a60019aa4be26342ca8cdfdda04e0e50f5ac7fbc` |
| `jammy-updates__main__Packages` | 21442327 | `0009b768364a862e7754f782f3f0dda9730f938f300179c86f17e39ba12ffc0b` |
| `jammy-updates__multiverse__Packages` | 568152 | `848df514867b80a7fcbbf0453f7a76eb8e29688b094707e52981c2a7d80722db` |
| `jammy-updates__restricted__Packages` | 38216851 | `68a38a898e28d680b094ef435c212d9664e8441acf01ea652916471f9455b479` |
| `jammy-updates__universe__Packages` | 7269024 | `1679f3823d2077dc6e7d72e16494a33b03c2fbba26b806423af3df05c60eed7b` |
| `jammy__main__Packages` | 6779186 | `12ce0797a6ed39a1fee1321985976c6b78872a8fe4c7ef2fb712f2364c9839a3` |
| `jammy__multiverse__Packages` | 918002 | `3493e180d952143ec601e4c833e54de709473bd636b6a3f6bb94e367e56f4abf` |
| `jammy__restricted__Packages` | 915647 | `b40bcc8340f4a2295e3daa158b7c50001642e843b3559907402c1b0da2d2459b` |
| `jammy__universe__Packages` | 64332414 | `6b8cc68643d18250ab297c4f6d427a8778b1d1534e1a3033fff0f221fa20a419` |

```text
UNCOMPRESSED_PACKAGES_INDEX_COUNT = 12
UNCOMPRESSED_PACKAGES_TOTAL_BYTES = 203991230
004C1AU_A_B_INDEX_BYTE_EQUALITY = TRUE
```

## 3. APT status-file semantics bound from exact source

The retained APT source revision remains commit `581ec5c0aa2c6665d72465040f1465eb93503200`, tree `e9afcae41f88040e93eb7a10a89e72c00b59e245`.

| Source file | Bytes | SHA-256 |
| --- | ---: | --- |
| `apt-pkg/deb/debindexfile.cc` | 12226 | `70ba6d4d5f10bbb3154498eb08aadc10858538e27a398ce0449558aa8a694305` |
| `apt-pkg/deb/deblistparser.cc` | 35440 | `d41a0aac102740a9dfc0a287a81dfb7301337a4fd3781b149838ebcc0991153d` |
| `apt-pkg/deb/debsystem.cc` | 16407 | `c6d0d861c838285496034f6619c8aec7d7773bf8f04cfd741c339fafe1b9edad` |

At this exact revision, `debStatusIndex::CreateListParser()` constructs `debStatusListParser`. `debStatusListParser::ParseStatus()` parses the three-word `Status` field and sets `CurrentVer` for states other than `not-installed` and `config-files`; `install ok installed` therefore marks the corresponding version as the installed current version. The generic status parsing path also explicitly tolerates a `Size` field when the version size is otherwise zero, so preserving the exact Packages stanza rather than inventing a reduced metadata subset is compatible with this parser path. No APT code is executed by this qualification.

## 4. Deterministic transformation

The transformer is deliberately exact-input-specific and fail-closed:

1. Verify the base dpkg status, base installed-package index, Stage A transaction, and all 12 Packages files by exact byte count and SHA-256.
2. Parse the base status into exactly 231 unique `(Package, Architecture)` paragraphs and cross-check every package/version/architecture/status against the canonical base installed-package JSON.
3. Require exactly 25 Stage A records and only `INSTALL` or `UPGRADE` actions.
4. For every transaction record, select exactly one stanza from the declared `selectedSuite` and `selectedComponent` index by `(Package, Version, Architecture)` and require exact `Filename`, `Size`, and `SHA256` equality with the transaction record.
5. Require the selected Packages stanza to contain no existing `Status` field and to begin with the exact `Package:` field.
6. Form the virtual installed stanza by inserting exactly `Status: install ok installed` immediately after the unchanged first `Package:` line; all other source-stanza bytes remain in their original order.
7. For `UPGRADE`, require the base key to exist at the exact `fromVersion` and replace that paragraph in its original base-status position. For `INSTALL`, require the key not to exist in the base state and append new paragraphs sorted by `(package, architecture)`.
8. Serialize paragraphs with exactly one blank line between them and one final blank line. This yields 255 unique installed paragraphs.
9. Independently derive `virtual-installed-packages.json` from the serialized output status as sorted canonical JSON objects containing only `package`, `architecture`, `status`, and `version`.
10. Emit a transition manifest binding every source stanza and virtual stanza by byte count and SHA-256.

The canonical `predecessorStageStateSha256` for a future Stage B is the virtual installed-package JSON SHA-256. The future Stage-B `Dir::State::status` input is separately bound by the virtual dpkg-status SHA-256.

## 5. Frozen transformer

```python
#!/usr/bin/env python3
import argparse, hashlib, json
from pathlib import Path

BASE_STATUS = (231024, '49176dcea062ad5a71df28c178ce241a6bcf9a2ec7e1525a1445a143bfd1080b')
BASE_INSTALLED = (25060, 'bdc5c6bbbe47db0313b2281b67e2f152ad75e93ab169bbfccf0b5441444694ba')
STAGE_A_TRANSACTION = (12229, '64de571251fd51da1df513b6be7e588b4479556153d9ce5d58e99bddf2d4fc20')
INDEXES = {
 'jammy-security__main__Packages': (20025980,'dbd457849762832bbe31a16ebf4bd9589ee199c098dfab9644ff492e93104f91'),
 'jammy-security__multiverse__Packages': (531283,'0d2c5a73d67917c70c6aceb3cb8cf6cad539e7b7c9a89a1ff83b48264cf95acf'),
 'jammy-security__restricted__Packages': (36809356,'8a8b903ffb5de341a37b3bdf202bf519a7ab0d17c4c1ff66eb8c19363f807ae5'),
 'jammy-security__universe__Packages': (6183008,'3230ca3f52e3afccff85b059a60019aa4be26342ca8cdfdda04e0e50f5ac7fbc'),
 'jammy-updates__main__Packages': (21442327,'0009b768364a862e7754f782f3f0dda9730f938f300179c86f17e39ba12ffc0b'),
 'jammy-updates__multiverse__Packages': (568152,'848df514867b80a7fcbbf0453f7a76eb8e29688b094707e52981c2a7d80722db'),
 'jammy-updates__restricted__Packages': (38216851,'68a38a898e28d680b094ef435c212d9664e8441acf01ea652916471f9455b479'),
 'jammy-updates__universe__Packages': (7269024,'1679f3823d2077dc6e7d72e16494a33b03c2fbba26b806423af3df05c60eed7b'),
 'jammy__main__Packages': (6779186,'12ce0797a6ed39a1fee1321985976c6b78872a8fe4c7ef2fb712f2364c9839a3'),
 'jammy__multiverse__Packages': (918002,'3493e180d952143ec601e4c833e54de709473bd636b6a3f6bb94e367e56f4abf'),
 'jammy__restricted__Packages': (915647,'b40bcc8340f4a2295e3daa158b7c50001642e843b3559907402c1b0da2d2459b'),
 'jammy__universe__Packages': (64332414,'6b8cc68643d18250ab297c4f6d427a8778b1d1534e1a3033fff0f221fa20a419'),
}
EXPECTED_OUTPUT_COUNT = 255


def sha(b): return hashlib.sha256(b).hexdigest()
def ident(b): return len(b), sha(b)
def require_ident(path, expected, label):
    b=Path(path).read_bytes(); got=ident(b)
    if got != expected: raise RuntimeError(f'{label} identity mismatch: {got}')
    return b

def paragraphs(data, label):
    if not data.endswith(b'\n\n'): raise RuntimeError(f'{label} missing final blank line')
    out=data[:-2].split(b'\n\n') if data[:-2] else []
    if any(not p for p in out): raise RuntimeError(f'{label} empty paragraph')
    return out

def parse_fields(stanza, label):
    out={}; current=None
    for line in stanza.split(b'\n'):
        if line[:1] in (b' ',b'\t'):
            if current is None: raise RuntimeError(f'{label} orphan continuation')
            continue
        if b':' not in line: raise RuntimeError(f'{label} malformed field')
        k,v=line.split(b':',1)
        try: key=k.decode('ascii')
        except UnicodeDecodeError as e: raise RuntimeError(f'{label} non-ascii field name') from e
        if key in out: raise RuntimeError(f'{label} duplicate field {key}')
        val=v[1:] if v.startswith(b' ') else v
        out[key]=val.decode('utf-8')
        current=key
    return out

def canonical_json(value):
    return (json.dumps(value,ensure_ascii=False,separators=(',',':'),sort_keys=True)+'\n').encode()

def transform(base_status, base_installed, transaction, index_dir):
    base_paras=paragraphs(base_status,'base status')
    base_fields=[parse_fields(p,f'base[{i}]') for i,p in enumerate(base_paras)]
    base_keys={}
    for i,f in enumerate(base_fields):
        for need in ('Package','Architecture','Version','Status'):
            if need not in f: raise RuntimeError(f'base[{i}] missing {need}')
        k=(f['Package'],f['Architecture'])
        if k in base_keys: raise RuntimeError(f'duplicate base key {k}')
        base_keys[k]=i
    installed=json.loads(base_installed)
    derived_base=sorted(({'package':f['Package'],'architecture':f['Architecture'],'status':f['Status'],'version':f['Version']} for f in base_fields),key=lambda r:(r['package'],r['architecture'],r['version']))
    if derived_base != sorted(installed,key=lambda r:(r['package'],r['architecture'],r['version'])):
        raise RuntimeError('base installed index mismatch')
    records=[json.loads(x) for x in transaction.decode().splitlines() if x]
    if len(records)!=25: raise RuntimeError('Stage A transaction record count mismatch')
    index_cache={}; source_maps={}
    for name,expected in INDEXES.items():
        data=require_ident(Path(index_dir)/name,expected,f'index {name}')
        suite,component,_=name.split('__')
        mapping={}
        for i,stanza in enumerate(paragraphs(data,name)):
            f=parse_fields(stanza,f'{name}[{i}]')
            if not all(k in f for k in ('Package','Version','Architecture')): continue
            k=(f['Package'],f['Version'],f['Architecture'])
            mapping.setdefault(k,[]).append((stanza,f))
        index_cache[(suite,component)]=mapping
    upgrades={}; installs=[]; manifest=[]
    for n,r in enumerate(records):
        if r.get('stageId')!='STAGE_A' or r.get('action') not in ('INSTALL','UPGRADE'):
            raise RuntimeError(f'unsupported Stage A action at record {n}')
        for need in ('package','architecture','toVersion','filename','archiveBytes','archiveSha256','selectedSuite','selectedComponent'):
            if r.get(need) is None: raise RuntimeError(f'transaction record {n} missing {need}')
        smap=index_cache.get((r['selectedSuite'],r['selectedComponent']))
        if smap is None: raise RuntimeError(f'unbound suite/component at record {n}')
        hits=smap.get((r['package'],r['toVersion'],r['architecture']),[])
        if len(hits)!=1: raise RuntimeError(f'non-unique Packages stanza at record {n}: {len(hits)}')
        source,fields=hits[0]
        for field,expected in (('Filename',r['filename']),('Size',str(r['archiveBytes'])),('SHA256',r['archiveSha256'])):
            if fields.get(field)!=expected: raise RuntimeError(f'{field} mismatch at record {n}')
        if 'Status' in fields: raise RuntimeError(f'Packages stanza already has Status at record {n}')
        lines=source.split(b'\n')
        if not lines or lines[0] != f"Package: {r['package']}".encode(): raise RuntimeError(f'Package field is not first at record {n}')
        virtual=b'\n'.join((lines[0],b'Status: install ok installed',*lines[1:]))
        vf=parse_fields(virtual,f'virtual[{n}]')
        key=(r['package'],r['architecture'])
        if r['action']=='INSTALL':
            if key in base_keys: raise RuntimeError(f'INSTALL predecessor exists at record {n}')
            installs.append((key,virtual))
        else:
            if key not in base_keys: raise RuntimeError(f'UPGRADE predecessor absent at record {n}')
            old=base_fields[base_keys[key]]
            if old['Version'] != r.get('fromVersion'): raise RuntimeError(f'UPGRADE fromVersion mismatch at record {n}')
            if key in upgrades: raise RuntimeError(f'duplicate UPGRADE key at record {n}')
            upgrades[key]=virtual
        manifest.append({'action':r['action'],'package':r['package'],'architecture':r['architecture'],'fromVersion':r.get('fromVersion'),'toVersion':r['toVersion'],'sourceIndex':f"{r['selectedSuite']}__{r['selectedComponent']}__Packages",'sourceStanzaBytes':len(source),'sourceStanzaSha256':sha(source),'virtualStanzaBytes':len(virtual),'virtualStanzaSha256':sha(virtual)})
    if len(installs)!=24 or len(upgrades)!=1: raise RuntimeError('Stage A action cardinality mismatch')
    out=[]
    for p,f in zip(base_paras,base_fields): out.append(upgrades.get((f['Package'],f['Architecture']),p))
    out.extend(v for _,v in sorted(installs,key=lambda x:x[0]))
    status=b'\n\n'.join(out)+b'\n\n'
    result_fields=[parse_fields(p,f'output[{i}]') for i,p in enumerate(paragraphs(status,'output status'))]
    state=sorted(({'package':f['Package'],'architecture':f['Architecture'],'status':f['Status'],'version':f['Version']} for f in result_fields),key=lambda r:(r['package'],r['architecture'],r['version']))
    state_bytes=canonical_json(state)
    if len(state)!=EXPECTED_OUTPUT_COUNT: raise RuntimeError('virtual state count mismatch')
    manifest_obj={'schema':'signthos.004c1bj.virtual-state-transition-manifest.v1','baseStatus':{'bytes':len(base_status),'sha256':sha(base_status)},'stageATransaction':{'bytes':len(transaction),'sha256':sha(transaction)},'installCount':len(installs),'upgradeCount':len(upgrades),'outputStatus':{'bytes':len(status),'sha256':sha(status)},'outputState':{'bytes':len(state_bytes),'sha256':sha(state_bytes),'count':len(state)},'records':manifest}
    return status,state_bytes,canonical_json(manifest_obj)

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('base_status'); ap.add_argument('base_installed'); ap.add_argument('transaction'); ap.add_argument('index_dir'); ap.add_argument('out_status'); ap.add_argument('out_state'); ap.add_argument('out_manifest')
    a=ap.parse_args()
    base=require_ident(a.base_status,BASE_STATUS,'base status')
    installed=require_ident(a.base_installed,BASE_INSTALLED,'base installed')
    tx=require_ident(a.transaction,STAGE_A_TRANSACTION,'Stage A transaction')
    status,state,manifest=transform(base,installed,tx,Path(a.index_dir))
    Path(a.out_status).write_bytes(status); Path(a.out_state).write_bytes(state); Path(a.out_manifest).write_bytes(manifest)
    print(json.dumps({'status':{'bytes':len(status),'sha256':sha(status)},'state':{'bytes':len(state),'sha256':sha(state)},'manifest':{'bytes':len(manifest),'sha256':sha(manifest)}},separators=(',',':'),sort_keys=True))
if __name__=='__main__': main()
```

```text
004C1BJ_TRANSFORMER_BYTES = 9491
004C1BJ_TRANSFORMER_SHA256 = 4a41b45a8c46114173b9dd18e7556f9d86b1d91c34bf07bc21970011f54e5fdd
```

The transformer does not contain the observed output SHA-256 values as preconditions. Output identities below are therefore observations from the independent static derivations, not circular acceptance constants.

## 6. Independent static derivation replay evidence

Replay A used the canonical 004C1AU Replay-A uncompressed index directory. Replay B used the independently materialized canonical 004C1AU Replay-B uncompressed index directory. Both used the same exact canonical base status, base installed index, and replay-qualified Stage A transaction.

```text
STATIC_REPLAY_A_EXIT = 0
STATIC_REPLAY_B_EXIT = 0
STATIC_REPLAY_A_STDERR_BYTES = 0
STATIC_REPLAY_B_STDERR_BYTES = 0
A_B_VIRTUAL_DPKG_STATUS_BYTE_EQUALITY = TRUE
A_B_VIRTUAL_INSTALLED_STATE_BYTE_EQUALITY = TRUE
A_B_TRANSITION_MANIFEST_BYTE_EQUALITY = TRUE
VIRTUAL_DPKG_STATUS_BYTES = 255642
VIRTUAL_DPKG_STATUS_SHA256 = 92b3ce89044000c132ac935dd8677f9306f112c14fba45a500b7af8c8edf3263
VIRTUAL_INSTALLED_PACKAGE_COUNT = 255
VIRTUAL_INSTALLED_STATE_BYTES = 27625
VIRTUAL_INSTALLED_STATE_SHA256 = 14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7
TRANSITION_MANIFEST_BYTES = 10195
TRANSITION_MANIFEST_SHA256 = 8324f70e0137114ea6080df460586089e01a608e3bea1a5d64eb8c084861f3a3
BASE_PARAGRAPHS_PRESERVED_OR_REPLACED_IN_PLACE = 231
APPENDED_INSTALL_PARAGRAPHS = 24
REPLACED_UPGRADE_PARAGRAPHS = 1
GIT_VIRTUAL_VERSION = 1:2.34.1-1ubuntu1.17
```

Fail-closed negative checks changed one byte in each input class independently. The transaction tamper, base-status tamper, and Packages-index tamper each returned nonzero before any accepted output and reported the corresponding identity mismatch.

## 7. Retained derived-output bundle

The exact derived outputs are retained inside this document so a future Stage-B qualification does not depend on ephemeral host paths. The bundle contains exactly three regular files with no directory, link, absolute-path, or traversal member:

| Member | Bytes | SHA-256 |
| --- | ---: | --- |
| `transition-manifest.json` | 10195 | `8324f70e0137114ea6080df460586089e01a608e3bea1a5d64eb8c084861f3a3` |
| `virtual-dpkg-status` | 255642 | `92b3ce89044000c132ac935dd8677f9306f112c14fba45a500b7af8c8edf3263` |
| `virtual-installed-packages.json` | 27625 | `14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7` |

```text
DERIVED_BUNDLE_FORMAT = USTAR
DERIVED_BUNDLE_MEMBER_COUNT = 3
DERIVED_BUNDLE_TAR_BYTES = 296960
DERIVED_BUNDLE_TAR_SHA256 = 854e013e2879f5447d6d6ac46f2c166536f9331ba2f1138fc75128e6367ae91c
DERIVED_BUNDLE_XZ_BYTES = 61616
DERIVED_BUNDLE_XZ_SHA256 = 8b392532a07f96b4d48edbfa0b7262847a0bc9f047bb04eadef119bea634f28f
DERIVED_BUNDLE_BASE64_CHARS = 82156
```

Reconstruction rule: concatenate the Base64 lines below without whitespace, Base64-decode to the exact XZ bytes, XZ-decompress to the exact USTAR bytes, reject any non-regular/unsafe member, and verify the three member identities above before use.

```base64
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
```

## 8. Fail-closed successor contract

004C1BJ qualifies only these exact derived bytes. A later Stage-B unit must not regenerate, normalize, edit, or silently substitute the virtual status. It must reconstruct and verify the retained bundle first, then bind:

```text
STAGE_B_PREDECESSOR_STAGE_STATE_SHA256 = 14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7
STAGE_B_VIRTUAL_DPKG_STATUS_SHA256 = 92b3ce89044000c132ac935dd8677f9306f112c14fba45a500b7af8c8edf3263
STAGE_B_PREDECESSOR_INSTALLED_PACKAGE_COUNT = 255
```

Any failure to reconstruct the retained bytes, any source/index/status/transaction identity mismatch, any duplicate installed key, any unsupported Stage A action, any missing/non-unique Packages stanza, or any transaction-to-stanza archive identity mismatch is a hard rejection.

A future Stage B must still independently freeze its exact root list, recommends policy, APT argv, hook query, source/list/cache/state layout, substrate recheck, and execution envelope before any solver run. This document does not authorize that execution.

## 9. Result

```text
004C1BJ_STATIC_VIRTUAL_STATE_DERIVATION = PASS_CANDIDATE
004C1BJ_RUNTIME_APT_VALIDATION = NOT_PERFORMED
STAGE_A_REPLAY_QUALIFICATION = PRESERVED
STAGE_B_SIMULATION = NOT_AUTHORIZED
STAGE_C_SIMULATION = NOT_AUTHORIZED
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
