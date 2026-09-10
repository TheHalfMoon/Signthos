# 004C1BP — Stage B predeclared conflict-transition disposition qualification

Status: `STATIC_TRANSACTION_POLICY_DISPOSITION_CANDIDATE / ZERO_NEW_SOLVER_EXECUTION`

Authority: `github:issue-comment:5625756899`
Canonical base: `de7847fc35c2bd8e260f79f265579985931100ee`
Canonical base tree: `90f74f0b691cefd0c8f2b36e91aaf740e3d146b6`

## 1. Purpose and authority boundary

004C1BP decides one policy question only: whether the exact `REMOVE` finding already parsed from the consumed Stage B Replay A may be accepted at the transaction-policy layer because canonical 004C1BO proved it is exactly the predeclared `pkgconf` / `pkg-config` cross-stage conflict transition.

This unit does not mutate the parser, parser finding policy, root sets, stage order, preserved runtime bytes, or any package metadata. It performs no Docker, APT, dpkg, package, Replay A, Replay B, virtual-state, Stage C, PDFium/provider, 004C2, 004D, or Specification 005 execution.

```text
PARSER_SOURCE_MUTATION = 0
PARSER_FINDING_POLICY_MUTATION = 0
GENERIC_REMOVE_ACCEPTANCE = false
REPLAY_A_RETRY_OR_REPLACEMENT = 0
REPLAY_B_EXECUTION = 0
STAGE_B_VIRTUAL_STATE_DERIVATION = 0
STAGE_C_EXECUTION = 0
DOCKER_APT_DPKG_EXECUTION = 0
PACKAGE_OPERATION_EXECUTION = 0
PDFIUM_OR_PROVIDER_EXECUTION = 0
```

## 2. Exact canonical inputs

```text
004C1AL_BYTES = 21275
004C1AL_LINES = 452
004C1AL_SHA256 = 099260342a77d2fc93404d3cc5babede5eddb9411d0a0a4c4f3d2ec7c101fe2f
004C1BN_BYTES = 38039
004C1BN_LINES = 450
004C1BN_SHA256 = 5f35ec6fdc5db674ed7c56cb835c9f7c726be6b0f478ecfd75e73c4739995587
004C1BO_BYTES = 5215
004C1BO_LINES = 109
004C1BO_SHA256 = 341b91ff20f9a2e805edab81098f6e7003de8ebc363afd962d05d17f59255731
```

Canonical 004C1AL requires every `DOWNGRADE`, `REMOVE`, or `KEEP_BACK` occurrence to be surfaced and reconciled against the deterministic provisioning contract rather than silently accepted merely because APT emitted it.

Canonical 004C1BN preserves the exact parser output from the already-consumed Replay A without changing that policy:

```text
PARSER_RESULT_BYTES = 358163
PARSER_RESULT_SHA256 = af34981afda90530809432af615758c50485a9b4104c3a55d830acdd54d3bee6
CANONICAL_TRANSACTION_JSONL_BYTES = 357404
CANONICAL_TRANSACTION_JSONL_SHA256 = eb4851027ba426113da526f23a6f1b6edcf12a832ab6c9df53c767c2656ec317
SELECTED_ARCHIVE_IDENTITY_SET_BYTES = 173255
SELECTED_ARCHIVE_IDENTITY_SET_SHA256 = fe750ee2b582eb9b709f3857f7b04925ab0646885fa7f2cf69ae67bc3a1bfaa4
RECORD_COUNT = 718
INSTALL = 650
UPGRADE = 59
DOWNGRADE = 0
REMOVE = 1
KEEP_BACK = 0
UNCHANGED_REQUESTED_ROOT = 8
ROOT_ACCOUNTING = 145/145
PARSER_RESULT_QUALIFIES = false
```

The exact preserved findings remain:

```json
[{"code":"REMOVE_SUMMARY","line":184},{"architecture":"amd64","code":"REMOVE","fromVersion":"0.29.2-1ubuntu3","package":"pkg-config"}]
```

## 3. Canonical conflict reconciliation

Canonical 004C1BO proves the sole removal is exactly the predeclared cross-stage transition:

```text
PREDECESSOR_REMOVED = pkg-config:amd64@0.29.2-1ubuntu3
STAGE_B_REQUESTED_REPLACEMENT = pkgconf
STAGE_B_PKG_CONFIG_REQUESTED = false
SELECTED_PKGCONF = pkgconf:amd64@1.8.0-1
SELECTED_PKGCONF_PROVIDES = pkg-config (= 0.29-1)
SELECTED_PKGCONF_BREAKS = pkg-config (>= 0.29-1)
TRANSACTION_PKGCONF_INSTALL = pkgconf:amd64@1.8.0-1
TRANSACTION_PKGCONF_CONFIGURE = pkgconf:amd64@1.8.0-1
ADDITIONAL_REMOVALS = 0
DOWNGRADES = 0
PREDECLARED_CROSS_STAGE_TRANSITION_MATCH = PASS
GENERIC_REMOVE_ACCEPTANCE = false
```

The predecessor version `0.29.2-1ubuntu3` satisfies the exact selected `Breaks: pkg-config (>= 0.29-1)` relation. Stage C remains explicitly bound to request `pkg-config` again; no stage deduplication or root rewrite is introduced.

## 4. Seven-part disposition predicate

The consumed Stage B Replay A may qualify at the transaction-policy layer only when every predicate below is true:

1. `parser_result_identity`: the parser result remains exactly `358163 / af34981afda90530809432af615758c50485a9b4104c3a55d830acdd54d3bee6` and its original findings remain unchanged;
2. `forbidden_action_cardinality`: `DOWNGRADE=0`, `KEEP_BACK=0`, `REMOVE=1`, and there is no additional removal;
3. `sole_remove_identity`: the only removed package is exactly `pkg-config:amd64@0.29.2-1ubuntu3`;
4. `predeclared_transition`: canonical 004C1BO's seven-part conflict-transition predicate passes without modification;
5. `replacement_and_root_accounting`: the exact transaction installs/configures `pkgconf:amd64@1.8.0-1` and preserves `145/145` Stage B requested-root accounting;
6. `stage_c_visibility`: canonical Stage C still explicitly requests `pkg-config` and stage order remains `[STAGE_A, STAGE_B, STAGE_C]`;
7. `non_generalization`: the disposition is keyed to the exact package/version/architecture/conflict/transaction identities above and cannot match any other removal or future solver output.

Any failed predicate fails closed. A different parser result, transaction hash, removed identity, package version, architecture, conflict expression, root accounting result, additional removal, downgrade, keep-back, stage order, or solver output requires separate authority.

## 5. Deterministic host-only predicate evaluation

A fresh static read of canonical `main@de7847fc35c2bd8e260f79f265579985931100ee` evaluated the required evidence predicates without running Docker, APT, dpkg, or any solver:

```json
{"al_requires_reconciliation":true,"bo_predicate_exact_pass":true,"no_downgrade_keepback_extra_remove":true,"original_findings_preserved":true,"parser_result_identity":true,"pkgconf_install_config_exact":true,"sole_remove_exact":true,"stage_c_pkg_config_preserved":true}
```

All required evidence predicates are true.

## 6. Qualification result

```text
PARSER_RESULT_QUALIFIES = false
PARSER_FINDINGS_PRESERVED = true
NAMED_TRANSITION_RECONCILED = true
STAGE_B_REPLAY_A_TRANSACTION_POLICY_QUALIFIES = true
GENERIC_REMOVE_ACCEPTANCE = false
PARSER_FINDING_POLICY_CHANGED = false
STAGE_B_TRANSACTION_IDENTITY_CHANGED = false
STAGE_B_ROOT_ACCOUNTING = 145/145
```

This result does not rewrite the parser's `qualifies=false` field. Instead, it records a separate higher-level transaction-policy disposition: the sole `REMOVE` finding is accepted only because it is byte- and identity-bound to the exact conflict transition already proven by 004C1BO. The original parser result and findings remain evidence.

## 7. What this result does and does not establish

004C1BP establishes only that the already-consumed Replay A is acceptable at the Stage B transaction-policy layer under this one named transition. It does not establish Stage B determinism by itself: canonical 004C1AL still requires two independent fresh simulation replays with byte-identical canonical transaction outputs for the same stage inputs.

A separately authorized Replay B may therefore be considered only after 004C1BP receives exact-head independent substantive review, guarded merge, post-merge mechanical verification, and canonical closeout. That future authority must not permit Replay A replacement or retry and must require Replay B to use the same frozen Stage B input/harness and the canonical repaired parser, then compare its canonical transaction bytes against the already-preserved Replay A transaction.

No Replay B, Stage B virtual installed-state derivation, Stage C execution, package acquisition, package installation, PDFium/provider execution, 004C2, 004D, or Specification 005 work is authorized by this document.
