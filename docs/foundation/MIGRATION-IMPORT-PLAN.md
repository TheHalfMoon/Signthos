# Signthos Migration and Upstream Import Plan

Status: FOUNDATION PLAN
Date: 2026-09-02

## Objective

Reuse mature upstream behavior without turning Signthos into an untraceable fork or creating licensing ambiguity.

Primary upstream roles:

- Documenso: brownfield signing/workflow base and controlled import candidate.
- Stirling PDF: PDF capability benchmark and selective permitted-source reference.

## Non-negotiable rule

No upstream application/product source import before Foundation 000 closes and Specification 001 establishes the provenance/import system.

## Import sequence

### Step 1 — freeze exact upstream snapshot

For every import unit record:

- repository,
- exact commit SHA,
- upstream path list,
- upstream license class,
- permission evidence where needed.

No moving-branch import such as "latest main" without a captured SHA.

### Step 2 — path-level classification

Each upstream path is classified:

- permitted OSS source,
- permitted under explicit separate written rights,
- restricted/not importable,
- unknown/blocked.

Unknown is fail-closed.

### Step 3 — bounded subsystem import

Do not import all Documenso code and redesign simultaneously.

Candidate subsystem grains:

1. repository/workspace/tooling baseline,
2. database/domain baseline,
3. auth baseline,
4. documents/envelopes,
5. editor/signing,
6. API/webhooks,
7. mail/storage/jobs,
8. explicitly permission-authorized EE paths if the legal/provenance gate permits.

Each grain has an allowlist.

### Step 4 — characterize behavior

Before redesign, preserve or add tests proving inherited behavior:

- unit/integration tests,
- API snapshots/contracts,
- database/schema expectations,
- signing fixtures,
- authorization behavior.

The goal is to know what changes later rather than relying on upstream assumptions.

### Step 5 — mechanical identity change separately

Product naming/branding replacements should be isolated from domain redesign where feasible.

Do not combine:

- global rename,
- database migration,
- architecture rewrite,
- feature behavior changes,
- license boundary movement

into one PR.

### Step 6 — anti-corruption boundary

Introduce Signthos domain contracts/adapters around inherited behavior.

Examples:

- `Document` / `DocumentRevision`,
- `Envelope`,
- `EvidenceBundle`,
- PDF provider interfaces,
- signing provider interfaces,
- public event/error taxonomy.

### Step 7 — migrate incrementally

New Signthos capabilities target canonical contracts while inherited internals are replaced only when evidence justifies the cost/risk.

## Provenance manifest

Specification 001 should implement a machine-readable manifest entry per imported/adapted unit.

Required fields conceptually:

```yaml
id: U001-I0001
upstream:
  repository: documenso/documenso
  commit: <exact-sha>
  paths:
    - <path>
license:
  class: AGPL-3.0
  evidence: <license-or-permission-reference>
import:
  destination: <path>
  signthos_commit: <sha>
  pull_request: <number>
transformation:
  kind: copied|adapted
  notes: <bounded-summary>
review:
  status: verified
  evidence: <reference>
```

## Permission artifacts

Restricted/commercial source may be used only when the preserved permission actually covers the intended activity.

For Documenso EE/commercial paths, verify rights covering as applicable:

- copying,
- modification,
- redistribution,
- derivative works,
- open-source publication,
- sublicensing/relicensing if the intended license requires it.

Do not infer these rights from conversational permission or access to a private repository.

Sensitive/private permission documents should not be publicly exposed if confidentiality terms prohibit it. The provenance manifest may reference a controlled evidence identifier while preserving enough public status to show the gate is satisfied.

## Documenso import policy

### Community/AGPL code

- preserve applicable copyright/license notices,
- keep derivation traceable,
- do not claim permissive relicensing without rights evidence,
- analyze network-copyleft obligations in the actual combined work.

### Enterprise/commercial code

- blocked until explicit rights evidence is accepted,
- imported only by exact allowlist,
- provenance records distinguish it from AGPL upstream.

## Stirling reuse policy

Default strategy:

1. define the capability Signthos needs,
2. identify direct third-party library options,
3. classify relevant Stirling paths,
4. import only clearly permitted source if valuable,
5. otherwise independently implement behavior behind Signthos capability contracts.

Restricted Stirling `engine/`, desktop and other separately licensed areas remain reference-only without separate rights.

## Third-party dependency strategy

Prefer depending directly on the original independently licensed library rather than copying a wrapper from an upstream application when:

- the library exposes the needed capability,
- the license is clearer,
- it reduces inherited application coupling.

Examples may include PDF rendering/processing libraries selected by later specs.

## History strategy

Do not rewrite `main` history to pretend Signthos was authored independently.

Possible import approaches must be evaluated for reviewability:

- commit-based copied import with provenance,
- subtree/history preservation for large exact-source units,
- scripted deterministic import.

The chosen method must keep future upstream diffing practical.

## Upstream update strategy

After initial import, maintain an upstream tracking process:

- recorded upstream baseline SHA,
- periodic security/bugfix review,
- path-level diffing,
- selective forward-port rather than blind merges,
- provenance update for incorporated patches.

Signthos should progressively reduce direct coupling through stable domain boundaries, but security fixes must remain trackable.

## Database migration

Imported database models require:

- schema baseline,
- migration history strategy,
- compatibility tests,
- no accidental production assumptions from Documenso SaaS environment.

Do not rename every table/column for branding value alone if the migration risk outweighs benefit.

## Auth migration

Preserve mature security behavior first.

Later Signthos changes should explicitly test:

- session invalidation,
- account/org membership,
- recipient auth,
- passkey/2FA action auth,
- API credentials,
- cross-tenant denial.

## Signing migration

Signing changes are high-risk.

Before altering inherited signing behavior:

- capture representative signed-PDF fixtures,
- validate with independent tools,
- document certificate/byte-range behavior,
- separate evidence semantics from cryptographic signature implementation.

## UI migration

Sequence:

1. establish functionality baseline,
2. mechanical Signthos identity changes,
3. introduce shared design system,
4. build unified document workspace,
5. remove inherited product assumptions incrementally.

Do not let rebranding hide behavior regressions.

## Upstream removal criteria

A copied/adapted subsystem may later be replaced when:

- Signthos requirements differ materially,
- security/trusted-computing-base reduction justifies it,
- dependency maintenance becomes unsustainable,
- a simpler independently licensed component is superior.

Replacement still preserves historical provenance records.

## Migration success criteria

The migration succeeds when:

- every inherited path is traceable,
- no restricted code entered accidentally,
- inherited signing/workflow behavior is characterized,
- Signthos can evolve through its own domain contracts,
- future upstream fixes can be evaluated without giant blind merges.
