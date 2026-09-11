# 004C1BV — Stage C removal ShortBreaks trailer grammar repair qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_SOURCE_PROVEN_REMV_SHORTBREAKS_GRAMMAR_REPAIR_AND_PRESERVED_REPLAY_A_REPARSE_ONLY`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `d9446535d9ddb51473da4ccd69dc3403d44a9cb5`
Canonical base tree: `812308beaceb01db29613fbd31ee23ca332bf466`
Authority: `github:issue-comment:5627937915`
Preserved Replay A evidence: `github:issue-comment:5627924560`

## 1. Purpose and authority boundary

004C1BU consumed the one authorized Stage C Replay A exactly once. The frozen solver/hook/container/inventory gates completed, but canonical 004C1BT rejected preserved APT stdout line 12 because its removal grammar did not admit the source-produced `ShortBreaks()` trailer. This unit repairs only that removal-line grammar and reparses the already-preserved Replay A bytes. It performs no Docker, APT, apt-config, dpkg, package, provider, or later-stage execution.

```text
NEXT_AUTHORIZED_UNIT = 004C1BV_STAGE_C_REMOVAL_SHORTBREAKS_TRAILER_GRAMMAR_REPAIR_QUALIFICATION
004C1BV_AUTHORITY = STATIC_SOURCE_PROVEN_REMV_SHORTBREAKS_GRAMMAR_REPAIR_AND_PRESERVED_REPLAY_A_REPARSE_ONLY
004C1BV_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1bv-stage-c-removal-shortbreaks-trailer-grammar-repair-qualification.md
004C1BV_MAX_CHANGED_REPOSITORY_FILES = 1
DOCKER_CONTAINER_EXECUTION = NOT_AUTHORIZED
APT_OR_APT_CONFIG_EXECUTION = NOT_AUTHORIZED
DPKG_EXECUTION = NOT_AUTHORIZED
PACKAGE_OPERATION = NOT_AUTHORIZED
REPLAY_A_RETRY_OR_REPLACEMENT = NOT_AUTHORIZED
REPLAY_B = NOT_AUTHORIZED
STAGE_C_VIRTUAL_INSTALLED_STATE_DERIVATION = NOT_AUTHORIZED
PDFIUM_OR_PROVIDER_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
## 2. Exact canonical bindings

```text
004C1BT_DOCUMENT_BYTES = 41767
004C1BT_DOCUMENT_SHA256 = 0d109e325cec557ab3789430ad4ce5f1a57ab00055898c5a9ba432c5e9ef7eda
004C1BT_BASE_STAGE_C_PARSER_BYTES = 19203
004C1BT_BASE_STAGE_C_PARSER_SHA256 = 9111e814a779576a5a522c3cbc2d868228e66d00e00cf7dd36e53e757f5708af
PRESERVED_STAGE_C_REPLAY_A_APT_STDOUT_BYTES = 942
PRESERVED_STAGE_C_REPLAY_A_APT_STDOUT_SHA256 = 0ff3fda2dc1665d5934ed1f1043ae7dcc6499ad3702423b2fd74752f674732a9
RESOLVED_CLOSURE_BYTES = 293999
RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
PREDECESSOR_INSTALLED_STATE_BYTES = 98938
PREDECESSOR_INSTALLED_STATE_SHA256 = 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea
VERIFIED_ARCHIVES_BYTES = 439991
VERIFIED_ARCHIVES_SHA256 = 38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98
APT_SOURCE_COMMIT = 581ec5c0aa2c6665d72465040f1465eb93503200
APT_SOURCE_TREE = e9afcae41f88040e93eb7a10a89e72c00b59e245
APT_PKG_ALGORITHMS_CC_BYTES = 52846
APT_PKG_ALGORITHMS_CC_SHA256 = 6dd7c7a4bfdb03f269e895f6290e456ed4963bdf91707715d0c54609da97ec1e
```

The preserved raw bytes are not normalized, rewritten, rewrapped, or regenerated before parsing. The canonical lookup datasets are passed through the Stage C parser's existing identity-bound reader.

## 3. Exact APT 2.4.13 source proof

The already-qualified immutable APT source shows that `pkgSimulate::RealRemove()` emits `Purg ` or `Remv `, emits the package description, and then invokes the same `ShortBreaks()` routine when the simulator remains broken. That routine emits one space plus `[`, zero or more `FullName(false)` package identifiers each followed by exactly one literal space, then `]` and LF.

This establishes that preserved Replay A line 12 is source-valid `Remv` output using the already-qualified ShortBreaks grammar class. It does not establish that the removal is policy-acceptable.

```text
PRESERVED_BLOCKER_LINE_NUMBER = 12
PRESERVED_BLOCKER_LINE = Remv pkgconf [1.8.0-1] [libglib2.0-dev:amd64 libgudev-1.0-dev:amd64 libfontconfig-dev:amd64 libdatrie-dev:amd64 libatk1.0-dev:amd64 libdbus-1-dev:amd64 libgtk-3-dev:amd64 libpango1.0-dev:amd64 libthai-dev:amd64 ]
```
## 4. Exact mechanical grammar delta

004C1BV changes one parser grammar expression only. The already-qualified `SHORT_BREAKS_TRAILER_RE` atom is reused without modification, and `REMV_RE` gains the same optional one-space-plus-trailer suffix already accepted for `Inst` and `Conf`.

```text
004C1BV_TRANSFORMER_BYTES = 835
004C1BV_TRANSFORMER_SHA256 = 542caac6107316ca8067fe835eeac2eff9f0482989c78632b2cd931e37493b9f
004C1BV_REPAIRED_STAGE_C_PARSER_BYTES = 19234
004C1BV_REPAIRED_STAGE_C_PARSER_SHA256 = 243ebcc662a682c755e0b772ad907b8b059a4fcbb671c66ffedc204e4cc2c203
```

```diff
--- 004C1BT
+++ 004C1BV
@@ -33,7 +33,7 @@
     rf"^Conf {FULL_RE} \((?P<to>[^\s()\[\]]+) (?P<rel>[^\[\]\r\n]*) "
     rf"\[(?P<arch>{ARCH_RE})\]\)(?: {SHORT_BREAKS_TRAILER_RE})?$"
 )
-REMV_RE = re.compile(rf"^(?P<verb>Remv|Purg) {FULL_RE} \[(?P<from>[^\[\]\s]+)\]$")
+REMV_RE = re.compile(rf"^(?P<verb>Remv|Purg) {FULL_RE} \[(?P<from>[^\[\]\s]+)\](?: {SHORT_BREAKS_TRAILER_RE})?$")
 ACTION_PREFIXES = ("Inst ", "Conf ", "Remv ", "Purg ")
 FORBIDDEN_SUMMARY_MARKERS = {
     "The following packages have been kept back:": "KEPT_BACK_SUMMARY",
```

`Purg` remains syntactically recognized by the same expression but semantically fail-closed by unchanged parser logic. Stage ID, four Stage C roots, predecessor identity, AG/AK lookup bindings, Debian version comparison, findings policy, record schema/order, root accounting, archive mapping, and canonical serialization remain unchanged.

## 5. Static qualification methodology

The exact qualification harness is `6942 / db1c4ada67e5b83a24429b220a94f4588cc7ce820a97fbcefd33de02b22783ba`. It verifies all bound input identities before use, verifies the exact APT source markers and ordering for `RealRemove()`/`ShortBreaks()`, reproduces the candidate parser from the transformer, exercises positive and strict-negative `Remv` trailer fixtures, proves `Purg` remains fail-closed, passes the canonical lookup datasets through `read_bound_json`, reparses the exact preserved Replay A bytes twice, requires byte-identical outputs, and rejects a tampered predecessor input.

The same input/parser/transformer/harness bytes were exercised on macOS Python 3.14.5 and Windows Python 3.14.7. Both runs produced the same canonical `qualification-result.json` bytes and the same parser result, transaction JSONL, and selected archive identity set.

```text
MACOS_STATIC_QUALIFICATION = PASS
WINDOWS_STATIC_QUALIFICATION = PASS
CROSS_ENVIRONMENT_CANONICAL_RESULT_BYTES_EQUAL = TRUE
QUALIFICATION_RESULT_BYTES = 1573
QUALIFICATION_RESULT_SHA256 = cbc366def3710645f0e197ba6cd83006ad8279a5a5d3687f309e7f1dc04a3fb6
PARSER_RESULT_BYTES = 2793
PARSER_RESULT_SHA256 = 5c336bebb675d2be4f60509da243684dba7e785d654bca5757aa3eda34b06b06
TRANSACTION_JSONL_BYTES = 2059
TRANSACTION_JSONL_SHA256 = 72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f
SELECTED_ARCHIVE_SET_BYTES = 478
SELECTED_ARCHIVE_SET_SHA256 = 223b7421ddd372e0660562922ad99a3ff42af73188082efeb7d17d00054233f4
```
## 6. Preserved Replay A raw stdout retention

The exact 942-byte APT stdout from the already-consumed Replay A is retained below as base64 solely for deterministic review and reproduction. The decoded raw bytes are the parser input; the base64 representation itself is not parser input.

```text
RAW_APT_STDOUT_BYTES = 942
RAW_APT_STDOUT_SHA256 = 0ff3fda2dc1665d5934ed1f1043ae7dcc6499ad3702423b2fd74752f674732a9
RAW_APT_STDOUT_COMPACT_BASE64_PLUS_LF_BYTES = 1257
RAW_APT_STDOUT_COMPACT_BASE64_PLUS_LF_SHA256 = 0089b8997df5c546df258d390a5de05f27dbc3409656802987b59d19775d1df5
RAW_APT_STDOUT_WRAPPED_BASE64_BYTES = 1273
RAW_APT_STDOUT_WRAPPED_BASE64_SHA256 = abf979a66c105c8732283dcdc8da15fdb4c995146f5d5e968397d3b465245dd2
```

```base64
UmVhZGluZyBwYWNrYWdlIGxpc3RzLi4uCkJ1aWxkaW5nIGRlcGVuZGVuY3kgdHJlZS4uLgpidWls
ZC1lc3NlbnRpYWwgaXMgYWxyZWFkeSB0aGUgbmV3ZXN0IHZlcnNpb24gKDEyLjl1YnVudHUzKS4K
Y3VybCBpcyBhbHJlYWR5IHRoZSBuZXdlc3QgdmVyc2lvbiAoNy44MS4wLTF1YnVudHUxLjI3KS4K
U3VnZ2VzdGVkIHBhY2thZ2VzOgogIG9wZW5zc2gtc2VydmVyIHB5dGhvbjMtYnJhY2VleHBhbmQK
VGhlIGZvbGxvd2luZyBwYWNrYWdlcyB3aWxsIGJlIFJFTU9WRUQ6CiAgcGtnY29uZgpUaGUgZm9s
bG93aW5nIE5FVyBwYWNrYWdlcyB3aWxsIGJlIGluc3RhbGxlZDoKICBwa2ctY29uZmlnIHJzeW5j
CjAgdXBncmFkZWQsIDIgbmV3bHkgaW5zdGFsbGVkLCAxIHRvIHJlbW92ZSBhbmQgNTkgbm90IHVw
Z3JhZGVkLgpSZW12IHBrZ2NvbmYgWzEuOC4wLTFdIFtsaWJnbGliMi4wLWRldjphbWQ2NCBsaWJn
dWRldi0xLjAtZGV2OmFtZDY0IGxpYmZvbnRjb25maWctZGV2OmFtZDY0IGxpYmRhdHJpZS1kZXY6
YW1kNjQgbGliYXRrMS4wLWRldjphbWQ2NCBsaWJkYnVzLTEtZGV2OmFtZDY0IGxpYmd0ay0zLWRl
djphbWQ2NCBsaWJwYW5nbzEuMC1kZXY6YW1kNjQgbGlidGhhaS1kZXY6YW1kNjQgXQpJbnN0IHBr
Zy1jb25maWcgKDAuMjkuMi0xdWJ1bnR1MyBVYnVudHU6MjIuMDQvamFtbXkgW2FtZDY0XSkKSW5z
dCByc3luYyAoMy4yLjctMHVidW50dTAuMjIuMDQuNyBVYnVudHU6MjIuMDQvamFtbXktdXBkYXRl
cywgVWJ1bnR1OjIyLjA0L2phbW15LXNlY3VyaXR5IFthbWQ2NF0pCkNvbmYgcGtnLWNvbmZpZyAo
MC4yOS4yLTF1YnVudHUzIFVidW50dToyMi4wNC9qYW1teSBbYW1kNjRdKQpDb25mIHJzeW5jICgz
LjIuNy0wdWJ1bnR1MC4yMi4wNC43IFVidW50dToyMi4wNC9qYW1teS11cGRhdGVzLCBVYnVudHU6
MjIuMDQvamFtbXktc2VjdXJpdHkgW2FtZDY0XSkK
```

## 7. Exact repaired-parser result on preserved Replay A

The repaired parser completes on the preserved bytes but remains nonqualifying. Grammar repair does not suppress or reinterpret findings.

```text
PARSER_QUALIFIES = false
ROOT_ACCOUNTING = 4/4
RECORD_COUNT = 5
INSTALL = 2
UPGRADE = 0
DOWNGRADE = 0
REMOVE = 1
KEEP_BACK = 0
UNCHANGED_REQUESTED_ROOT = 2
```

Exact findings:

```json
[{"code":"REMOVE_SUMMARY","line":7},{"architecture":"amd64","code":"REMOVE","fromVersion":"1.8.0-1","package":"pkgconf"}]
```

Exact parser result:

```json
{"canonicalTransactionJsonlBytes":2059,"canonicalTransactionJsonlSha256":"72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f","findings":[{"code":"REMOVE_SUMMARY","line":7},{"architecture":"amd64","code":"REMOVE","fromVersion":"1.8.0-1","package":"pkgconf"}],"qualifies":false,"rawStdoutBytes":942,"rawStdoutSha256":"0ff3fda2dc1665d5934ed1f1043ae7dcc6499ad3702423b2fd74752f674732a9","recordCount":5,"recordCountByAction":{"DOWNGRADE":0,"INSTALL":2,"KEEP_BACK":0,"REMOVE":1,"UNCHANGED_REQUESTED_ROOT":2,"UPGRADE":0},"records":[{"action":"INSTALL","architecture":"amd64","archiveBytes":48218,"archiveSha256":"69da4190d948d0bf7444ead040791b7924bd1a08a10ec13cd7f0bb9baab09c53","canonicalPackageMetadataSha256":"2288496bfe1a13e14b0d33d20db794b729cc66904e90372e48acfa3a8811bf15","filename":"pool/main/p/pkg-config/pkg-config_0.29.2-1ubuntu3_amd64.deb","fromVersion":null,"package":"pkg-config","reasonClass":"ROOT","selectedComponent":"main","selectedSuite":"jammy","stageId":"STAGE_C","toVersion":"0.29.2-1ubuntu3"},{"action":"INSTALL","architecture":"amd64","archiveBytes":444910,"archiveSha256":"0f1f6c57367d67027f735171e69c769fe4c5552e267314a31f5e92064e36c153","canonicalPackageMetadataSha256":"8c9f22a1939b9755fd0851dbee489c412f92c991943b21e381ef7c4ce7a1e6f4","filename":"pool/main/r/rsync/rsync_3.2.7-0ubuntu0.22.04.7_amd64.deb","fromVersion":null,"package":"rsync","reasonClass":"ROOT","selectedComponent":"main","selectedSuite":"jammy-security","stageId":"STAGE_C","toVersion":"3.2.7-0ubuntu0.22.04.7"},{"action":"REMOVE","architecture":"amd64","archiveBytes":null,"archiveSha256":null,"canonicalPackageMetadataSha256":null,"filename":null,"fromVersion":"1.8.0-1","package":"pkgconf","reasonClass":null,"selectedComponent":null,"selectedSuite":null,"stageId":"STAGE_C","toVersion":null},{"action":"UNCHANGED_REQUESTED_ROOT","architecture":"amd64","archiveBytes":null,"archiveSha256":null,"canonicalPackageMetadataSha256":"3b8324f8f70fd1af76c59cc4b0a5cd8addd1eeb15d408efa9baf8d77fbc13393","filename":null,"fromVersion":"12.9ubuntu3","package":"build-essential","reasonClass":"ROOT","selectedComponent":"main","selectedSuite":"jammy","stageId":"STAGE_C","toVersion":"12.9ubuntu3"},{"action":"UNCHANGED_REQUESTED_ROOT","architecture":"amd64","archiveBytes":null,"archiveSha256":null,"canonicalPackageMetadataSha256":"210986fa8d0b67a7babc91b3a6ffb52a1303f6a03692e4b1b861ae241d869238","filename":null,"fromVersion":"7.81.0-1ubuntu1.27","package":"curl","reasonClass":"ROOT","selectedComponent":"main","selectedSuite":"jammy-security","stageId":"STAGE_C","toVersion":"7.81.0-1ubuntu1.27"}],"schema":"signthos.004c1bt.stage-c-apt-parser-result.v1","selectedArchiveIdentityCount":2,"selectedArchiveIdentitySetSha256":"223b7421ddd372e0660562922ad99a3ff42af73188082efeb7d17d00054233f4"}
```

## 8. Exact canonical transaction and selected archive set

```jsonl
{"stageId":"STAGE_C","action":"INSTALL","package":"pkg-config","architecture":"amd64","fromVersion":null,"toVersion":"0.29.2-1ubuntu3","canonicalPackageMetadataSha256":"2288496bfe1a13e14b0d33d20db794b729cc66904e90372e48acfa3a8811bf15","filename":"pool/main/p/pkg-config/pkg-config_0.29.2-1ubuntu3_amd64.deb","archiveBytes":48218,"archiveSha256":"69da4190d948d0bf7444ead040791b7924bd1a08a10ec13cd7f0bb9baab09c53","selectedSuite":"jammy","selectedComponent":"main","reasonClass":"ROOT"}
{"stageId":"STAGE_C","action":"INSTALL","package":"rsync","architecture":"amd64","fromVersion":null,"toVersion":"3.2.7-0ubuntu0.22.04.7","canonicalPackageMetadataSha256":"8c9f22a1939b9755fd0851dbee489c412f92c991943b21e381ef7c4ce7a1e6f4","filename":"pool/main/r/rsync/rsync_3.2.7-0ubuntu0.22.04.7_amd64.deb","archiveBytes":444910,"archiveSha256":"0f1f6c57367d67027f735171e69c769fe4c5552e267314a31f5e92064e36c153","selectedSuite":"jammy-security","selectedComponent":"main","reasonClass":"ROOT"}
{"stageId":"STAGE_C","action":"REMOVE","package":"pkgconf","architecture":"amd64","fromVersion":"1.8.0-1","toVersion":null,"canonicalPackageMetadataSha256":null,"filename":null,"archiveBytes":null,"archiveSha256":null,"selectedSuite":null,"selectedComponent":null,"reasonClass":null}
{"stageId":"STAGE_C","action":"UNCHANGED_REQUESTED_ROOT","package":"build-essential","architecture":"amd64","fromVersion":"12.9ubuntu3","toVersion":"12.9ubuntu3","canonicalPackageMetadataSha256":"3b8324f8f70fd1af76c59cc4b0a5cd8addd1eeb15d408efa9baf8d77fbc13393","filename":null,"archiveBytes":null,"archiveSha256":null,"selectedSuite":"jammy","selectedComponent":"main","reasonClass":"ROOT"}
{"stageId":"STAGE_C","action":"UNCHANGED_REQUESTED_ROOT","package":"curl","architecture":"amd64","fromVersion":"7.81.0-1ubuntu1.27","toVersion":"7.81.0-1ubuntu1.27","canonicalPackageMetadataSha256":"210986fa8d0b67a7babc91b3a6ffb52a1303f6a03692e4b1b861ae241d869238","filename":null,"archiveBytes":null,"archiveSha256":null,"selectedSuite":"jammy-security","selectedComponent":"main","reasonClass":"ROOT"}
```

```json
[{"package":"pkg-config","version":"0.29.2-1ubuntu3","architecture":"amd64","filename":"pool/main/p/pkg-config/pkg-config_0.29.2-1ubuntu3_amd64.deb","size":48218,"sha256":"69da4190d948d0bf7444ead040791b7924bd1a08a10ec13cd7f0bb9baab09c53"},{"package":"rsync","version":"3.2.7-0ubuntu0.22.04.7","architecture":"amd64","filename":"pool/main/r/rsync/rsync_3.2.7-0ubuntu0.22.04.7_amd64.deb","size":444910,"sha256":"0f1f6c57367d67027f735171e69c769fe4c5552e267314a31f5e92064e36c153"}]
```
## 9. Exact static qualification result

```json
{"aptSource":{"algorithmsCcBytes":52846,"algorithmsCcSha256":"6dd7c7a4bfdb03f269e895f6290e456ed4963bdf91707715d0c54609da97ec1e","commit":"581ec5c0aa2c6665d72465040f1465eb93503200","tree":"e9afcae41f88040e93eb7a10a89e72c00b59e245"},"baseParser":{"bytes":19203,"sha256":"9111e814a779576a5a522c3cbc2d868228e66d00e00cf7dd36e53e757f5708af"},"candidateParser":{"bytes":19234,"sha256":"243ebcc662a682c755e0b772ad907b8b059a4fcbb671c66ffedc204e4cc2c203"},"canonicalInputBinding":"PASS","deterministicReparseAB":"PASS","findings":[{"code":"REMOVE_SUMMARY","line":7},{"architecture":"amd64","code":"REMOVE","fromVersion":"1.8.0-1","package":"pkgconf"}],"grammarNegativeRemvFixtures":8,"grammarPositiveRemvFixtures":4,"parserQualifies":false,"parserResult":{"bytes":2793,"sha256":"5c336bebb675d2be4f60509da243684dba7e785d654bca5757aa3eda34b06b06"},"preservedReplayAStdout":{"bytes":942,"sha256":"0ff3fda2dc1665d5934ed1f1043ae7dcc6499ad3702423b2fd74752f674732a9"},"purgFailClosedFixtures":3,"rawBytesUnchanged":"PASS","recordCount":5,"recordCountByAction":{"DOWNGRADE":0,"INSTALL":2,"KEEP_BACK":0,"REMOVE":1,"UNCHANGED_REQUESTED_ROOT":2,"UPGRADE":0},"rootAccounting":"4/4","schema":"signthos.004c1bv.static-remv-shortbreaks-qualification.v1","selectedArchiveIdentitySet":{"bytes":478,"count":2,"sha256":"223b7421ddd372e0660562922ad99a3ff42af73188082efeb7d17d00054233f4"},"transactionJsonl":{"bytes":2059,"sha256":"72585f7eac1b14089c69f3c35167bd2e75108435e8b84c3d53456e7757307f7f"},"transformer":{"bytes":835,"sha256":"542caac6107316ca8067fe835eeac2eff9f0482989c78632b2cd931e37493b9f"}}
```

The qualification result deliberately preserves `parserQualifies=false`. 004C1BV proves that the removal trailer is parseable under the exact source-proven grammar; it does not establish that removing `pkgconf` is allowed by Stage C transaction policy.

## 10. Acceptance and nonclaims

```text
004C1BV_SOURCE_PROOF = PASS
004C1BV_MECHANICAL_REPAIR = PASS
004C1BV_STRICT_REMV_TRAILER_FIXTURES = PASS
004C1BV_PURG_FAIL_CLOSED = PASS
004C1BV_PRESERVED_REPLAY_A_REPARSE = PASS
004C1BV_DETERMINISTIC_REPARSE = PASS
004C1BV_CROSS_ENVIRONMENT_STATIC_QUALIFICATION = PASS
004C1BV_RESULT = PASS_STATIC_GRAMMAR_REPAIR_ONLY
PRESERVED_REPLAY_A_PARSER_QUALIFIES = false
PRESERVED_REPLAY_A_REMOVE_FINDING = pkgconf:amd64@1.8.0-1
REPLAY_A_RETRY_OR_REPLACEMENT = NOT_AUTHORIZED
REPLAY_B = NOT_AUTHORIZED
STAGE_C_VIRTUAL_INSTALLED_STATE_DERIVATION = NOT_AUTHORIZED
PROJECT_COMPLETE = FALSE
```

After exact-head review, guarded merge, and post-merge verification, Issue #7 must separately reconcile the preserved `REMOVE_SUMMARY` and exact `REMOVE pkgconf:amd64@1.8.0-1` finding. No named-transition acceptance, Replay B, virtual-state derivation, or later-stage authority is inherited from this document.

## Appendix A — exact 004C1BT base Stage C parser

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

## Appendix B — exact 004C1BV transformer

````python
#!/usr/bin/env python3
import hashlib,sys
from pathlib import Path
EXPECTED=(19203,"9111e814a779576a5a522c3cbc2d868228e66d00e00cf7dd36e53e757f5708af")
def ident(b): return len(b),hashlib.sha256(b).hexdigest()
if len(sys.argv)!=3: raise SystemExit("usage: transform INPUT OUTPUT")
b=Path(sys.argv[1]).read_bytes()
if ident(b)!=EXPECTED: raise SystemExit(f"INPUT_IDENTITY_MISMATCH {ident(b)}")
s=b.decode("utf-8")
old='REMV_RE = re.compile(rf"^(?P<verb>Remv|Purg) {FULL_RE} \\[(?P<from>[^\\[\\]\\s]+)\\]$")'
new='REMV_RE = re.compile(rf"^(?P<verb>Remv|Purg) {FULL_RE} \\[(?P<from>[^\\[\\]\\s]+)\\](?: {SHORT_BREAKS_TRAILER_RE})?$")'
if s.count(old)!=1: raise SystemExit(f"REMV_REGEX_COUNT {s.count(old)}")
out=s.replace(old,new,1).encode("utf-8")
Path(sys.argv[2]).write_bytes(out)
print(f"{len(out)} {hashlib.sha256(out).hexdigest()}")
````

## Appendix C — exact repaired Stage C parser

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

## Appendix D — exact qualification harness

````python
#!/usr/bin/env python3
import hashlib, importlib.util, json, re, subprocess, tempfile
from pathlib import Path
W=Path('/private/tmp/signthos-004c1bv-static')
BASE=W/'base-parser.py'; CAND=W/'candidate-parser.py'; TRANS=W/'transform.py'; RAW=W/'replay-a-apt.stdout'; CLOSURE=W/'resolved-closure.json'; INSTALLED=W/'predecessor-installed.json'; ARCHIVES=W/'verified-archives.json'; SOURCE=W/'algorithms.cc'
EXP={
'base':(19203,'9111e814a779576a5a522c3cbc2d868228e66d00e00cf7dd36e53e757f5708af'),
'cand':(19234,'243ebcc662a682c755e0b772ad907b8b059a4fcbb671c66ffedc204e4cc2c203'),
'trans':(835,'542caac6107316ca8067fe835eeac2eff9f0482989c78632b2cd931e37493b9f'),
'raw':(942,'0ff3fda2dc1665d5934ed1f1043ae7dcc6499ad3702423b2fd74752f674732a9'),
'closure':(293999,'bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970'),
'installed':(98938,'42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea'),
'archives':(439991,'38b36863380150df62a42e6e77c3582244b61f4a083da52619de6e56ccf7ef98'),
'source':(52846,'6dd7c7a4bfdb03f269e895f6290e456ed4963bdf91707715d0c54609da97ec1e'),
}
def ident(p):
 b=p.read_bytes(); return len(b),hashlib.sha256(b).hexdigest()
for n,p in [('base',BASE),('cand',CAND),('trans',TRANS),('raw',RAW),('closure',CLOSURE),('installed',INSTALLED),('archives',ARCHIVES),('source',SOURCE)]:
 assert ident(p)==EXP[n],(n,ident(p),EXP[n])
# Source proof: exact RealRemove sequence plus ShortBreaks grammar.
s=SOURCE.read_text()
markers=['bool pkgSimulate::RealRemove(PkgIterator iPkg,bool Purge)','cout << "Purg ";','cout << "Remv ";','Describe(Pkg,cout,true,false);','if (Sim.BrokenCount() != 0)','ShortBreaks();','void pkgSimulate::ShortBreaks()','cout << " [";','cout << I.FullName(false) << \' \';',"cout << ']' << endl;"]
assert all(x in s for x in markers)
assert s.index('Describe(Pkg,cout,true,false);') < s.index('ShortBreaks();',s.index('bool pkgSimulate::RealRemove'))
# Transformer reproduces candidate exactly.
with tempfile.TemporaryDirectory() as td:
 out=Path(td)/'p.py'; cp=subprocess.run(['python3',str(TRANS),str(BASE),str(out)],capture_output=True,text=True)
 assert cp.returncode==0,(cp.returncode,cp.stdout,cp.stderr); assert out.read_bytes()==CAND.read_bytes()
# Import candidate.
spec=importlib.util.spec_from_file_location('p',CAND); p=importlib.util.module_from_spec(spec); spec.loader.exec_module(p)
assert p.STAGE_ID=='STAGE_C'; assert p.STAGE_C_ROOTS==['curl','build-essential','pkg-config','rsync']; assert p.STAGE_C_VIRTUAL_ROOT_PROVIDER_MAP=={}
# Positive grammar fixtures.
valid=[
 'Remv foo [1.0]',
 'Remv foo [1.0] []',
 'Remv foo [1.0] [bar:amd64 ]',
 'Remv foo:amd64 [1.0] [bar:amd64 baz ]',
]
for x in valid: assert p.REMV_RE.fullmatch(x),x
# Strict negative trailer fixtures.
invalid=[
 'Remv foo [1.0] [bar:amd64]',
 'Remv foo [1.0] [ bar:amd64 ]',
 'Remv foo [1.0] [bar:amd64  ]',
 'Remv foo [1.0] [bar:amd64  baz:amd64 ]',
 'Remv foo [1.0] [[bar:amd64 ]]',
 'Remv foo [1.0] [bar/amd64 ]',
 'Remv foo [1.0] [bar:amd64 ] extra',
 'Remv foo [1.0] [bar:amd64\tbaz:amd64 ]',
]
for x in invalid: assert p.REMV_RE.fullmatch(x) is None,x
# Syntactically valid Purg variants remain semantically fail-closed.
def installed(name,ver='1.0',arch='amd64'): return {'package':name,'version':ver,'architecture':arch,'status':'install ok installed'}
for raw in [b'Purg foo [1.0]\n',b'Purg foo [1.0] []\n',b'Purg foo [1.0] [bar:amd64 ]\n']:
 try: p.parse_stage_c(raw,[],[installed('foo')],[],roots=[])
 except p.ParseFailure as e: assert 'Purg is nonqualifying' in str(e)
 else: raise AssertionError('Purg accepted')
# Canonical inputs must pass parser identity-bound reader.
closure=p.read_bound_json(CLOSURE,'resolved_closure'); installed_rows=p.read_bound_json(INSTALLED,'installed_packages'); archives=p.read_bound_json(ARCHIVES,'verified_archives')
assert (len(closure),len(installed_rows),len(archives))==(910,904,826)
raw=RAW.read_bytes()
r1,t1,a1=p.parse_stage_c(raw,closure,installed_rows,archives)
r2,t2,a2=p.parse_stage_c(raw,closure,installed_rows,archives)
assert r1==r2 and t1==t2 and a1==a2
result_bytes=(json.dumps(r1,ensure_ascii=False,separators=(',',':'),sort_keys=True)+'\n').encode()
(W/'parser-result.json').write_bytes(result_bytes); (W/'transaction.jsonl').write_bytes(t1); (W/'selected-archive-set.json').write_bytes(a1)
# Raw bytes remain unchanged.
assert ident(RAW)==EXP['raw']
# Exact root accounting from records/actions or predecessor exact state.
record_pkgs={(x['package'],x['architecture']) for x in r1['records']}
assert all((root,'amd64') in record_pkgs for root in p.STAGE_C_ROOTS)
# Expected findings are measured, then exact-asserted to protect evidence.
expected=[{'code':'REMOVE_SUMMARY','line':7},{'code':'REMOVE','package':'pkgconf','architecture':'amd64','fromVersion':'1.8.0-1'}]
assert r1['findings']==expected,r1['findings']
assert r1['qualifies'] is False
counts=r1['recordCountByAction']
assert counts=={'INSTALL':2,'UPGRADE':0,'DOWNGRADE':0,'REMOVE':1,'KEEP_BACK':0,'UNCHANGED_REQUESTED_ROOT':2},counts
assert r1['recordCount']==5
# Action/metadata sanity.
remove=[x for x in r1['records'] if x['action']=='REMOVE']; assert len(remove)==1 and remove[0]['package']=='pkgconf'
installs=[x for x in r1['records'] if x['action']=='INSTALL']; assert [x['package'] for x in installs]==['pkg-config','rsync']
# Tampered canonical inputs still rejected.
with tempfile.TemporaryDirectory() as td:
 q=Path(td)/'bad.json'; b=INSTALLED.read_bytes(); q.write_bytes(b[:-1]+b' ')
 try: p.read_bound_json(q,'installed_packages')
 except p.ParseFailure: pass
 else: raise AssertionError('tampered canonical input accepted')
out={
'schema':'signthos.004c1bv.static-remv-shortbreaks-qualification.v1',
'baseParser':{'bytes':EXP['base'][0],'sha256':EXP['base'][1]},
'candidateParser':{'bytes':EXP['cand'][0],'sha256':EXP['cand'][1]},
'transformer':{'bytes':EXP['trans'][0],'sha256':EXP['trans'][1]},
'aptSource':{'commit':'581ec5c0aa2c6665d72465040f1465eb93503200','tree':'e9afcae41f88040e93eb7a10a89e72c00b59e245','algorithmsCcBytes':EXP['source'][0],'algorithmsCcSha256':EXP['source'][1]},
'preservedReplayAStdout':{'bytes':EXP['raw'][0],'sha256':EXP['raw'][1]},
'grammarPositiveRemvFixtures':len(valid),'grammarNegativeRemvFixtures':len(invalid),'purgFailClosedFixtures':3,
'canonicalInputBinding':'PASS','deterministicReparseAB':'PASS','rawBytesUnchanged':'PASS','rootAccounting':'4/4',
'parserQualifies':r1['qualifies'],'recordCount':r1['recordCount'],'recordCountByAction':counts,'findings':r1['findings'],
'parserResult':{'bytes':len(result_bytes),'sha256':hashlib.sha256(result_bytes).hexdigest()},
'transactionJsonl':{'bytes':len(t1),'sha256':hashlib.sha256(t1).hexdigest()},
'selectedArchiveIdentitySet':{'bytes':len(a1),'sha256':hashlib.sha256(a1).hexdigest(),'count':r1['selectedArchiveIdentityCount']},
}
q=(json.dumps(out,separators=(',',':'),sort_keys=True)+'\n').encode(); (W/'qualification-result.json').write_bytes(q); print(q.decode(),end='')
````
