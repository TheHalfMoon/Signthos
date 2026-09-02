# Signthos Upstream Provenance Register

Status: PRE-IMPORT
Date: 2026-09-02

No upstream source is currently authorized for import merely by appearing in this register.

## Provenance policy

Every imported or substantially adapted upstream path must have a machine-readable and human-readable record containing:

- upstream repository,
- exact commit SHA,
- upstream path,
- imported Signthos path,
- import date,
- upstream copyright holder where stated,
- governing license / separate permission artifact,
- transformation description,
- Signthos commit/PR that performed the import,
- reviewer verification.

Unknown or conflicting license status is fail-closed: **do not import**.

## U001 — Documenso

Repository: `documenso/documenso`
URL: https://github.com/documenso/documenso
Observed snapshot: `3ec877a68bc423373220f9ee2fda3d93ba368680`
Role: Primary brownfield e-signature/workflow reference and import candidate.

Observed license classes:

1. Community code under AGPL-3.0.
2. `packages/ee/` and identified Enterprise functionality under separate commercial terms.

Required before import:

- exact path-level license inventory,
- preservation of AGPL notices and obligations for AGPL-derived work,
- written permission artifact for any commercial/EE code that will be copied, modified, redistributed or open-sourced,
- explicit decision on Signthos repository licensing compatibility.

Current state: `BLOCKED_PENDING_PROVENANCE_GATE`

## U002 — Stirling PDF

Repository: `Stirling-Tools/Stirling-PDF`
URL: https://github.com/Stirling-Tools/Stirling-PDF
Observed snapshot: `42bdce155c4bc1954a1e3c8ad10a108f2578ad8f`
Role: PDF capability benchmark; selective source import candidate only where clearly permitted.

Observed license classes:

1. MIT for content outside the repository's declared restricted directories.
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
License: AGPL-3.0 with Section 7(b) additional attribution term.

Default policy: do not copy source into Signthos unless a future specification explicitly justifies the dependency and verifies license/attribution consequences.

Current state: `REFERENCE_ONLY`

## U004 — OpenSign

Repository: `OpenSignLabs/OpenSign`
URL: https://github.com/OpenSignLabs/OpenSign
Role: Competitive/reference source.
License: AGPL-3.0 according to observed repository documentation.

Default policy: reference product behavior and independently design Signthos equivalents unless a future bounded specification authorizes source reuse.

Current state: `REFERENCE_ONLY`

## U005 — Tauri

Repository: `tauri-apps/tauri`
URL: https://github.com/tauri-apps/tauri
Role: Candidate application shell/framework dependency.

Tauri 2 supports Linux, macOS, Windows, Android and iOS from a shared web frontend with Rust application logic and Swift/Kotlin plugin integration.

Current state: `DEPENDENCY_CANDIDATE`

## Required machine-readable manifest

Specification 001 must introduce a machine-readable provenance format before the first upstream source import. A conceptual record:

```yaml
id: U001-I0001
upstream:
  repository: documenso/documenso
  commit: <sha>
  path: <path>
license:
  class: AGPL-3.0
  evidence: <path-or-artifact>
import:
  destination: <signthos-path>
  commit: <sha>
  pull_request: <number>
transform:
  kind: copied|adapted|rewritten
  notes: <bounded-description>
review:
  status: verified
  evidence: <review-reference>
```

The final schema must be versioned and validated in CI.
