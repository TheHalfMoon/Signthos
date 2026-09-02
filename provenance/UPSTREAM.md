# Signthos Upstream Provenance Register

Status: PRE-IMPORT
Date: 2026-09-02

No upstream source is currently authorized for import merely by appearing in this register.

## Provenance policy

Every imported or substantially adapted upstream path must have a machine-readable and human-readable record containing:

- upstream repository,
- exact commit SHA,
- upstream path,
- upstream copyright holder when stated or an explicit `unknown` value,
- imported Signthos path,
- import date,
- unambiguous SPDX license expression,
- license evidence,
- separate permission-artifact reference when required,
- explicit permission scope when separate permission is relied upon,
- transformation description,
- Signthos commit/PR that performed the import,
- reviewer verification.

Unknown, ambiguous, conflicting, or syntactically invalid license status is fail-closed: **do not import**.

License identifiers such as `AGPL-3.0` that do not distinguish `AGPL-3.0-only` from `AGPL-3.0-or-later` are not accepted in the machine-readable import manifest.

## U001 — Documenso

Repository: `documenso/documenso`
URL: https://github.com/documenso/documenso
Observed snapshot: `3ec877a68bc423373220f9ee2fda3d93ba368680`
Role: Primary brownfield e-signature/workflow reference and import candidate.

Observed license classes:

1. Community code under the repository's observed AGPL-3.0 licensing terms; Specification 001 must classify the exact SPDX expression/path evidence before import.
2. `packages/ee/` and identified Enterprise functionality under separate commercial terms.

Required before import:

- exact path-level license inventory,
- preservation of AGPL notices and obligations for AGPL-derived work,
- written permission artifact for any commercial/EE code that will be copied, modified, redistributed or open-sourced,
- explicit permission-scope record,
- explicit decision on Signthos repository/component licensing compatibility.

Current state: `BLOCKED_PENDING_PROVENANCE_GATE`

## U002 — Stirling PDF

Repository: `Stirling-Tools/Stirling-PDF`
URL: https://github.com/Stirling-Tools/Stirling-PDF
Observed snapshot: `42bdce155c4bc1954a1e3c8ad10a108f2578ad8f`
Role: PDF capability benchmark; selective source import candidate only where clearly permitted.

Observed license classes:

1. MIT for content outside the repository's declared restricted directories, subject to exact path verification.
2. Separate Stirling PDF User License for multiple directories including `engine/` and `frontend/editor/src/desktop/`.
3. Additional restricted SaaS/proprietary/cloud/portal/prototype paths listed in the root license.

Required before any Stirling import:

- per-path license classification,
- preservation of MIT notices for MIT imports,
- no restricted source import without explicit separate rights,
- prefer direct use of independently licensed third-party libraries where that gives equivalent capability.

Current state: `REFERENCE_ONLY_PENDING_PATH_CLASSIFICATION`

## U003 — DocuSeal

Repository: `docusealco/docuseal`
URL: https://github.com/docusealco/docuseal
Role: Competitive/reference source only by default.
License observation: AGPL family with an additional attribution term; exact SPDX/additional-term representation must be reverified if source reuse is ever proposed.

Default policy: do not copy source into Signthos unless a future specification explicitly justifies the dependency and verifies license/attribution consequences.

Current state: `REFERENCE_ONLY`

## U004 — OpenSign

Repository: `OpenSignLabs/OpenSign`
URL: https://github.com/OpenSignLabs/OpenSign
Role: Competitive/reference source.
License observation: AGPL family according to observed repository documentation; exact path/expression must be reverified before any reuse.

Default policy: reference product behavior and independently design Signthos equivalents unless a future bounded specification authorizes source reuse.

Current state: `REFERENCE_ONLY`

## U005 — Tauri

Repository: `tauri-apps/tauri`
URL: https://github.com/tauri-apps/tauri
Role: Candidate application shell/framework dependency.

Tauri 2 is the foundation framework hypothesis for shared desktop/mobile application shells. Exact dependency version, transitive-license graph and mobile-store distribution posture remain successor-spec gates.

Current state: `DEPENDENCY_CANDIDATE`

## Required machine-readable manifest

Specification 001 must introduce a versioned machine-readable provenance schema before the first upstream source import. The conceptual minimum record is:

```yaml
schema_version: 1
id: U001-I0001
upstream:
  repository: documenso/documenso
  commit: <40-char-sha>
  path: <path>
  copyright_holder: <value-or-unknown>
license:
  spdx: AGPL-3.0-only
  evidence: <repository-path-or-evidence-reference>
  permission_artifact: <non-secret-reference-or-null>
  permission_scope:
    - copy
    - modify
    - redistribute
    - sublicense
    - publish
    - derivative
import:
  destination: <signthos-path>
  date: <YYYY-MM-DD>
  commit: <signthos-commit-sha>
  pull_request: <number>
transform:
  kind: copied|adapted|rewritten
  notes: <bounded-description>
review:
  status: verified
  evidence: <review-reference>
```

### Validation requirements

The Specification 001 validator must reject an import authorization record when any of the following is true:

- repository is missing,
- upstream commit is absent or not an exact accepted SHA form,
- upstream or destination path is missing,
- copyright-holder field is absent,
- import date is absent or invalid,
- SPDX expression is absent, invalid, or intentionally ambiguous,
- a deprecated/ambiguous shorthand such as bare `AGPL-3.0` is used,
- required license evidence is absent,
- a restricted/commercial path relies on separate permission but the permission-artifact reference is absent,
- the permission scope does not contain every right required by the intended transformation/distribution,
- transformation kind is unknown,
- review verification/evidence is absent.

A permission artifact may remain private/confidential; the repository record should contain a stable non-secret reference and a reviewable scope summary rather than publishing confidential material.

The exact final schema, allowed SPDX expressions, additional-license-term representation, and permission-scope vocabulary must be specified and tested by Specification 001. CI must treat invalid or incomplete records as import failures rather than warnings.
