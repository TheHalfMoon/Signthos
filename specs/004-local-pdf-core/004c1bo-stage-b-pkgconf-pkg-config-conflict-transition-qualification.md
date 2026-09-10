# 004C1BO — Stage B `pkgconf` / `pkg-config` conflict-transition qualification

Status: `STATIC_QUALIFICATION_CANDIDATE / ZERO_NEW_SOLVER_EXECUTION`

Authority: `github:issue-comment:5625506050`
Canonical base: `e2f31b56623359ba191fa01a69296fa062614d4c`
Canonical base tree: `46237c81aa9dd3c5937ca93e0d76549ce886e157`

## 1. Purpose and boundary

004C1BO answers one question only: whether the sole removal in the already-consumed Stage B Replay A is mechanically explained by the already-canonical staged `pkgconf` / `pkg-config` conflict relation.

This unit performs no Docker, APT, dpkg, package download/install/unpack/configure, resolver, Replay A replacement, Replay B, Stage C, PDFium/provider, 004C2, 004D, or Specification 005 execution. It does not change parser finding policy and does not make Replay A qualifying.

## 2. Canonical predecessor facts

Canonical 004C1AG records both package identities as an intentional cross-stage relation rather than a simultaneously installable set:

```text
STAGE_A_EXPLICIT_ROOT = pkg-config
STAGE_B_CHROMIUM_ROOT = pkgconf
STAGE_C_EXPLICIT_ROOT = pkg-config
CROSS_STAGE_CONFLICT_RELATION_COUNT = 1
SIMULTANEOUS_INSTALLABLE_SET_CLAIMED = false
CANONICAL_RELATION = pkgconf Breaks: pkg-config (>= 0.29-1)
```

Canonical 004C1AL preserves the same ordering and explicitly requires that `pkg-config` not be deduplicated across stages before solver behavior is observed.

Canonical 004C1BK freezes the Stage B requested-root vector with `pkgconf` present and `pkg-config` absent from the 145 Stage B roots.

## 3. Exact selected-snapshot metadata

The exact already-bound Stage B transport is `204800000` bytes with SHA-256 `bcc764555216562839fe10ef8478832f44cad027ef284c97d8edba65e28d4a72`. Static extraction of its Jammy universe `Packages` member gives the selected `pkgconf` stanza:

```text
Package: pkgconf
Architecture: amd64
Version: 1.8.0-1
Multi-Arch: foreign
Provides: pkg-config (= 0.29-1)
Depends: libdpkg-perl, dpkg-dev, perl:any, libc6 (>= 2.34), libpkgconf3 (>= 1.8.0-1)
Breaks: pkg-config (>= 0.29-1)
Filename: pool/universe/p/pkgconf/pkgconf_1.8.0-1_amd64.deb
Size: 35280
SHA256: 257c91d3c0d18e2e0856cb7e86cb4ddf18b91fc40df5bcc45ebaccb25d4e6d37
```

The `Breaks` predicate applies to the predecessor `pkg-config` version `0.29.2-1ubuntu3`: Debian version ordering places `0.29.2-1ubuntu3` at or above `0.29-1`. Therefore `pkgconf@1.8.0-1` and the predecessor `pkg-config@0.29.2-1ubuntu3` cannot coexist under the selected metadata contract.

`Provides: pkg-config (= 0.29-1)` is recorded separately. It establishes a provided package interface; it is not used to erase the explicit Stage C `pkg-config` root or to generalize removal permission.

## 4. Preserved Stage B transaction facts

Canonical 004C1BN reparses the exact preserved Replay A APT stdout (`132913` bytes; SHA-256 `6f5efa623e9551f1f159db61b014a04b46a20cc69f3037dfb715023c462067e8`) and records:

```text
RECORD_COUNT = 718
INSTALL = 650
UPGRADE = 59
DOWNGRADE = 0
REMOVE = 1
KEEP_BACK = 0
UNCHANGED_REQUESTED_ROOT = 8
ROOT_ACCOUNTING = 145/145
```

The exact relevant action lines are:

```text
Remv pkg-config [0.29.2-1ubuntu3]
Inst pkgconf (1.8.0-1 Ubuntu:22.04/jammy [amd64])
Conf pkgconf (1.8.0-1 Ubuntu:22.04/jammy [amd64])
```

The canonical findings are exactly:

```json
[{"code":"REMOVE_SUMMARY","line":184},{"architecture":"amd64","code":"REMOVE","fromVersion":"0.29.2-1ubuntu3","package":"pkg-config"}]
```

There are zero other removals and zero downgrades.

## 5. Narrow conflict-transition predicate

The observed transition qualifies as the single predeclared cross-stage conflict transition only when every predicate below is true:

1. the predecessor installed package is exactly `pkg-config:amd64@0.29.2-1ubuntu3`;
2. Stage B requests `pkgconf` and does not request `pkg-config`;
3. selected metadata is exactly `pkgconf:amd64@1.8.0-1` with `Breaks: pkg-config (>= 0.29-1)`;
4. the predecessor version satisfies that exact `Breaks` relation;
5. the preserved transaction installs/configures exactly `pkgconf:amd64@1.8.0-1` and removes exactly `pkg-config:amd64@0.29.2-1ubuntu3`;
6. the transaction contains zero additional removals and zero downgrades;
7. the already-canonical Stage C contract continues to request `pkg-config` explicitly and is not rewritten by this qualification.

Any different removed package, version, architecture, conflict expression, additional removal, downgrade, root-set change, or solver output fails closed and requires separate authority.

## 6. Qualification result and nonclaims

```text
CONFLICT_CAUSALITY = PROVEN_FROM_CANONICAL_METADATA_AND_PRESERVED_TRANSACTION
PREDECLARED_CROSS_STAGE_TRANSITION_MATCH = PASS
GENERIC_REMOVE_ACCEPTANCE = false
PARSER_FINDING_POLICY_CHANGED = false
PRESERVED_REPLAY_A_QUALIFIES = false
NEW_SOLVER_EXECUTION = 0
```

004C1BO qualifies only the causality and exact identity of this one `pkgconf` / `pkg-config` transition. The canonical 004C1BN parser findings remain unchanged. A separate post-merge reconciliation is required before any authority may decide whether this named transition can be accepted for Stage B state derivation or whether any further replay or Stage C work is eligible.
