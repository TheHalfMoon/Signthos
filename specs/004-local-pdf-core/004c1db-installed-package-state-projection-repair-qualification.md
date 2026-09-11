# 004C1DB — Installed Package State Projection Repair Qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_SIGNTHOS_AUTHORED_HARNESS_SEMANTICS_REPAIR_ONLY / ZERO_RUNTIME_EXECUTION`
Issue: #7
Canonical base: `717dbb0bec69ecad169ee63cfbd5af5ea0113c34`
Canonical base tree: `97279872c4dcf546b810de1951a78495137c0623`
Authority source: `github:issue-comment:5641673852`
Recovered runtime source: `004C1DA / github:issue-comment:5641665554`

## 1. Exact authority boundary

004C1DB repairs one observation/canonicalization defect exposed by the consumed 004C1CZ package-provisioning attempt. It does not change package roots, versions, archive identities, solver outputs, expected installed-state hashes, container security, offline/network policy, image identity, attempt accounting, or downstream authority.

```text
004C1DB_AUTHORITY = STATIC_INSTALLED_PACKAGE_STATE_PROJECTION_REPAIR_QUALIFICATION_ONLY
004C1DB_MAX_CHANGED_REPOSITORY_FILES = 1
RUNTIME_EXECUTION = 0
DOCKER_CONTAINER_EXECUTION = 0
APT_DPKG_PACKAGE_ACTION = 0
PACKAGE_DOWNLOAD = 0
SOURCE_OR_DEPENDENCY_ACQUISITION = 0
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

The sole changed repository path is this document.

## 2. Recovered defect

The exact stopped 004C1CZ container was recovered after host reboot without restarting the container. The recovered state is:

```text
CONTAINER_ID = 5c4d37bf794b63edcafd852072c339fc2a9ff0597160b5cceddc288afb00d9d0
CONTAINER_NAME = signthos-004c1cz-replacement-20260911t223530z
CONTAINER_EXIT_CODE = 101
OOM_KILLED = FALSE
ERROR = <empty>
NETWORK_MODE = none
MOUNTS = 0
PRIVILEGED = FALSE
NO_NEW_PRIVILEGES = TRUE
IMAGE = sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
```

Recovered forensic bundle:

```text
RECOVERY_ROOT = /private/tmp/signthos-004c1da-recovery-20260911T230408Z-70909
RECOVERY_FILE_COUNT = 38
SHA256_MANIFEST = 3875 / 066c9b52af01e48c1f95dc61b01e325b1a78a0d1e73ae2878177e4320091364f
RECOVERY_SUMMARY = 1258 / 12f6e3c0762dd9d12f1e93be2268a0ac784bebc41aacc417f728d4d7bf539fe3
```

The transaction evidence proves:

```text
APT_GET_SHA256 = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196
STAGE_A_EXIT = 0
STAGE_A_OBSERVED_INSTALLED_STATE = 27625 / 14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7 / 255
STAGE_A_EXPECTED_INSTALLED_STATE = 14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7 / 255
STAGE_A_EQUALITY = PASS

STAGE_B_APT_EXIT = 0
STAGE_B_RAW_DPKG_QUERY_STATE = 99051 / 07b4564246ead396c4bc653576b49d20363e60956aab3654dd7e3bf518bbcc7c / 905 rows
STAGE_B_EXPECTED_INSTALLED_STATE = 98938 / 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea / 904 packages
STAGE_B_RAW_EQUALITY = FAIL
GUEST_EXIT = 101
STAGE_C = NOT_EXECUTED
```

Exactly one Stage B row is not installed:

```json
{"architecture":"amd64","package":"pkg-config","status":"deinstall ok config-files","version":"0.29.2-1ubuntu3"}
```

All other 904 rows have status exactly `install ok installed`.

Removing only this residual row from the recovered Stage B rows and applying the existing deterministic sort + compact JSON + LF serialization yields exactly:

```text
PROJECTED_STAGE_B_COUNT = 904
PROJECTED_STAGE_B_BYTES = 98938
PROJECTED_STAGE_B_SHA256 = 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea
PROJECTED_STAGE_B_EXPECTED_EQUALITY = PASS
```

This is an exact byte/hash result, not a semantic approximation.

## 3. Why the residual row exists

The recovered dpkg log proves this transition:

```text
Stage A:
  install pkg-config:amd64 <none> 0.29.2-1ubuntu3
  configure pkg-config:amd64 0.29.2-1ubuntu3 <none>
  status installed pkg-config:amd64 0.29.2-1ubuntu3

Stage B:
  remove pkg-config:amd64 0.29.2-1ubuntu3 <none>
  status config-files pkg-config:amd64 0.29.2-1ubuntu3
  install libpkgconf3:amd64 <none> 1.8.0-1
  install pkgconf:amd64 <none> 1.8.0-1
  configure libpkgconf3:amd64 1.8.0-1 <none>
  configure pkgconf:amd64 1.8.0-1 <none>
```

Stage B stdout independently records `Removing pkg-config (0.29.2-1ubuntu3)` and successful `pkgconf` setup.

`dpkg-query -W` enumerates retained dpkg database records, including packages that are no longer installed but retain configuration-file state. The frozen 004C1CB runtime canonicalizer parsed every `dpkg-query -W` row into the object named `installed-state.json`. The canonical virtual state, by contrast, represents installed packages. Those two sets are not identical when a package is removed without purging its residual configuration record.

Therefore:

```text
PACKAGE_TRANSACTION_CONTRADICTION = NOT_ESTABLISHED
HARNESS_CANONICALIZATION_DEFECT = ESTABLISHED
ROOT_CAUSE = UNFILTERED_DPKG_QUERY_RESIDUAL_CONFIG_ROWS
EXPECTED_INSTALLED_STATE_HASHES = UNCHANGED
```

## 4. Repaired evidence model

A future runtime harness must preserve two separate concepts instead of overloading one file:

```text
RAW_DPKG_QUERY_EVIDENCE
  = every exact dpkg-query row emitted after a successful stage

CANONICAL_INSTALLED_PACKAGE_STATE
  = only rows whose full dpkg status is exactly "install ok installed"

RESIDUAL_DPKG_STATE_EVIDENCE
  = terminal non-installed rows preserved for audit but excluded from installed-package state
```

The raw query output remains immutable audit evidence. The projection does not delete evidence; it prevents non-installed database records from being misclassified as installed packages.

## 5. Closed status policy

The repaired canonicalizer must classify every parsed row by its exact full status string.

Allowed installed class:

```text
install ok installed
```

Allowed terminal residual class for this repaired harness version:

```text
deinstall ok config-files
```

Every other status fails closed during post-stage canonicalization. Examples that must not be hidden by projection include, but are not limited to:

```text
install reinstreq installed
install ok half-installed
install ok unpacked
install ok half-configured
deinstall reinstreq config-files
hold ok installed
unknown ok not-installed
```

The policy intentionally remains narrow. A future observed terminal status not listed above requires fresh evidence and explicit qualification rather than silent acceptance.

## 6. Deterministic row contract

Each raw `dpkg-query -W` line must contain exactly four tab-separated UTF-8 fields:

```text
package
architecture
status
version
```

Malformed rows fail closed.

The future canonicalizer must also fail closed on duplicate `(package, architecture)` keys. A duplicate cannot be resolved by ordering, last-write-wins behavior, or arbitrary selection.

Package, architecture, status, and version strings are evidence values. No Unicode normalization, whitespace normalization, case folding, version parsing/reformatting, package-name rewriting, architecture aliasing, or locale-dependent collation is permitted.

## 7. Canonical serialization

Projected installed rows retain the existing serialization contract:

1. represent each row as:

```json
{"package":"...","architecture":"...","status":"install ok installed","version":"..."}
```

2. sort by `(package, architecture, version)` using deterministic byte-stable Python string ordering under the already frozen C.UTF-8 environment;
3. encode JSON with `ensure_ascii=false`, `separators=(",", ":")`, and `sort_keys=true`;
4. append exactly one LF;
5. hash the exact UTF-8 bytes with SHA-256.

Residual rows use the same deterministic record/ordering/serialization rules but are stored and hashed separately from installed-package state.

Raw TSV remains separately preserved byte-for-byte.

## 8. Reference repair algorithm

The following reference logic defines the semantics. It is static qualification logic; this unit does not execute package management.

```python
import json

INSTALLED = "install ok installed"
ALLOWED_RESIDUAL = {"deinstall ok config-files"}


def canonical_json_lf(rows):
    ordered = sorted(
        rows,
        key=lambda row: (
            row["package"],
            row["architecture"],
            row["version"],
        ),
    )
    return (
        json.dumps(
            ordered,
            ensure_ascii=False,
            separators=(",", ":"),
            sort_keys=True,
        )
        + "\n"
    ).encode("utf-8")


def project_dpkg_query(raw_tsv_text):
    installed = []
    residual = []
    seen = set()

    for line_number, line in enumerate(raw_tsv_text.splitlines(), 1):
        fields = line.split("\t")
        if len(fields) != 4:
            raise ValueError(f"malformed dpkg-query row {line_number}")

        package, architecture, status, version = fields
        key = (package, architecture)
        if key in seen:
            raise ValueError(f"duplicate package/architecture key {key!r}")
        seen.add(key)

        row = {
            "package": package,
            "architecture": architecture,
            "status": status,
            "version": version,
        }

        if status == INSTALLED:
            installed.append(row)
        elif status in ALLOWED_RESIDUAL:
            residual.append(row)
        else:
            raise ValueError(
                f"unexpected terminal dpkg status at row {line_number}: {status!r}"
            )

    return {
        "installed": canonical_json_lf(installed),
        "residual": canonical_json_lf(residual),
    }
```

A future implementation may use equivalent code, but it must produce identical bytes and fail-closed behavior.

## 9. Recovered positive validation

Applying the repaired projection to the recovered 004C1DA evidence produces:

```text
STAGE_A_RAW_ROW_COUNT = 255
STAGE_A_INSTALLED_ROW_COUNT = 255
STAGE_A_RESIDUAL_ROW_COUNT = 0
STAGE_A_PROJECTED_BYTES = 27625
STAGE_A_PROJECTED_SHA256 = 14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7
STAGE_A_EXPECTED_EQUALITY = PASS

STAGE_B_RAW_ROW_COUNT = 905
STAGE_B_INSTALLED_ROW_COUNT = 904
STAGE_B_RESIDUAL_ROW_COUNT = 1
STAGE_B_PROJECTED_BYTES = 98938
STAGE_B_PROJECTED_SHA256 = 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea
STAGE_B_EXPECTED_EQUALITY = PASS
```

The exact residual set is:

```json
[{"architecture":"amd64","package":"pkg-config","status":"deinstall ok config-files","version":"0.29.2-1ubuntu3"}]
```

Stage C did not execute in 004C1CZ and receives no runtime PASS from this document.

## 10. Mandatory negative cases

A future static validator for this repair must prove at least these cases:

| Case | Required result |
| --- | --- |
| recovered Stage A raw state | projected expected hash/count PASS |
| recovered Stage B raw state | projected expected hash/count PASS |
| malformed three-field row | reject |
| malformed five-field row | reject |
| duplicate package/architecture key | reject |
| unexpected `half-installed` status | reject |
| unexpected `unpacked` status | reject |
| unexpected `half-configured` status | reject |
| `reinstreq` status | reject |
| residual `pkg-config` promoted to `install ok installed` | projected expected identity must fail |
| mutate one installed package version | projected expected identity must fail |
| mutate one installed package name | projected expected identity must fail |
| mutate one architecture | projected expected identity must fail |
| delete one installed row | projected expected identity must fail |
| add one installed row | projected expected identity must fail |
| alter residual package/version/status | residual evidence identity must change |

The validator must compare exact bytes/count/SHA-256, not only semantic object equality.

## 11. Stage C implications

004C1DB does not claim Stage C success or infer its runtime output.

The repair applies uniformly when a future authorized attempt reaches Stage C because Stage C also compares a virtual **installed-package** state with a real dpkg database. Existing Specification 004 Stage C planning already models an explicit `pkgconf` / `pkg-config` transition. If Stage C leaves a terminal residual config-file row for a removed package, that row must be preserved as residual evidence and excluded from installed-package projection under the same exact status policy.

Any Stage C raw status outside the qualified classes fails closed and requires fresh reconciliation.

## 12. Invariants unchanged

004C1DB does not change these canonical identities or rules:

```text
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
SELECTED_CONFIG = sha256:6c08d5b78c2a32982d454cd13735f2370941c81040fccc667ac3c7f8482928d0
TARGET_PLATFORM = linux/amd64
APT_GET_SHA256 = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196
SNAPSHOT_ID = 20260909T180000Z
STAGE_A_OFFLINE_INSTALL_ARGV_SHA256 = 5b0f1ffb795a128f28a63f2d182e1cbc7970c85187763f2b115c60288db18c7a
STAGE_B_OFFLINE_INSTALL_ARGV_SHA256 = 2ea968eca2e35d46eb4aabd0a00af368d566506533a070871ec7a7123079d84b
STAGE_C_OFFLINE_INSTALL_ARGV_SHA256 = bda16e788ac116f3e376063f7bf7cffe0b0af0bd850a01e09ee06a1b211e51b9
STAGE_A_EXPECTED_STATE = 14d0da8d33b804702e4b23fa0a8ee99da33feb32641afe5c8e8649504f731ae7 / 255
STAGE_B_EXPECTED_STATE = 42d5059095be4a8cff9661702803ce17a1b504e0fd425231cd746ae928e608ea / 904
STAGE_C_EXPECTED_STATE = 8801230a86014a849c052da1f85740def6e5fcd204584e914b67017472bb71be / 905
FUTURE_PROVISIONING_NETWORK = NONE
LIVE_MIRROR_FALLBACK = PROHIBITED
NO_SILENT_RETRY = TRUE
```

Container/network/security/provenance boundaries remain cumulative.

## 13. Future harness evidence requirements

A separately authorized future harness repair/execution unit must preserve, for every stage:

```text
<STAGE>.dpkg-query.raw.tsv
<STAGE>.installed-state.json
<STAGE>.residual-state.json
<STAGE>.installed-state.sha256
<STAGE>.residual-state.sha256
<STAGE>.argv.json
<STAGE>.stdout
<STAGE>.stderr
<STAGE>.exit.txt
<STAGE>.dpkg-status
<STAGE>.dpkg.log
<STAGE>.apt-history.log
<STAGE>.apt-term.log
<STAGE>.archive-paths.txt
<STAGE>.archive-sha256.txt
```

The raw TSV is evidence input to the projection and may not be replaced by the projected JSON.

An APT exit of zero is necessary but not sufficient. Installed-state equality, residual-state policy compliance, archive/input identity, and evidence completeness must all pass.

## 14. Non-grants

Closing 004C1DB does not authorize any runtime action.

```text
SECOND_OR_REPLACEMENT_PROVISIONING_ATTEMPT = NOT_AUTHORIZED
DOCKER_CONTAINER_START_OR_RESTART = NOT_AUTHORIZED
DOCKER_IMAGE_COMMIT_PUSH_REMOVE = NOT_AUTHORIZED
APT_DPKG_PACKAGE_ACTION = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
LIVE_PACKAGE_DOWNLOAD = NOT_AUTHORIZED
DEPENDENCY_OR_SOURCE_ACQUISITION = NOT_AUTHORIZED
TOOLCHAIN_DEPOT_TOOLS_GCLIENT_GN_NINJA_CLANG_EXECUTION = NOT_AUTHORIZED
PDFIUM_BUILD = NOT_AUTHORIZED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
PRODUCT_IMPLEMENTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

A fresh successor must separately authorize any harness implementation and any new attempt budget.

## 15. Qualification and closeout gates

This candidate is eligible for canonical merge only after all of the following are proven against its exact final head:

1. live canonical base and Issue #7 authority remain unchanged;
2. exact changed repository path count is one and equals this document;
3. deterministic static validation reproduces the recovered Stage A and Stage B projection identities;
4. mandatory negative cases pass fail-closed;
5. diff cleanliness passes;
6. independent substantive exact-head review reports no unresolved material finding;
7. unresolved material review threads are zero;
8. exact-head qualification proof is posted;
9. fresh premerge race guard passes;
10. merge uses normal expected-head protection;
11. post-merge verification proves ordered parents, merge tree, signature, exact merged blob, and truthful CI/status state;
12. an external post-merge closeout reconciles the next authority from live truth.

Until those gates close:

```text
004C1DB = QUALIFICATION_CANDIDATE_ONLY
004C1DB_CANONICAL = FALSE
NEXT_RUNTIME_AUTHORITY = ABSENT
```
