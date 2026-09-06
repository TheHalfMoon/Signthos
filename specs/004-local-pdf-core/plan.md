# Specification 004 — Local PDF Core Plan

Status: `SHAPING_CANDIDATE / PLANNING_ONLY`
Issue: #7
Canonical shaping base: `dd996f11b701679b941c1fb3fd3e8bdc880f2506`
Canonical predecessor: Specification 003 `CLOSED_CANONICAL`
Authority source: `github:issue-comment:5562123379`

## Planning contract

This plan recursively decomposes Local PDF Core using SpecGrain and qualifies each transition using Diffciplane.

Naming a grain does not authorize implementation. Every implementation transition requires a fresh canonical authorization whose exact scope, paths, dependencies, tests, security boundaries, provenance/rights basis, and merge evidence are explicit.

Stage P is Signthos-authored planning only. Its exact initial allowed change surface is:

```text
specs/004-local-pdf-core/spec.md
specs/004-local-pdf-core/plan.md
specs/004-local-pdf-core/tasks.md
```

No package/source/runtime/provenance/workflow/container/dependency file is part of Stage P.

## Stage P objective

Make the full Local PDF Core problem reviewable before engine adoption or implementation.

Stage P must establish:

- exact predecessor contracts consumed from Specification 003;
- PDF operation side-effect classes and revision invariants;
- untrusted-document threat model;
- local/network/provider trust boundaries;
- fixture/corpus contract;
- engine/source/binary qualification requirements;
- security/resource/cancellation/isolation requirements;
- independent redaction proof requirements;
- candidate provider/engine roles without adoption;
- dependency-ordered future grains;
- evidence classes and completion gates;
- mandatory Stage P closeout before any successor authority.

## Current repository truth

At Stage P shaping base:

- canonical `main` is `dd996f11b701679b941c1fb3fd3e8bdc880f2506`;
- Specification 003 is `CLOSED_CANONICAL` for its current planning/contract scope;
- Issue #6 is closed completed;
- Issue #7 is open and authorizes Stage P shaping only through `github:issue-comment:5562123379`;
- there is no pre-existing `specs/004-*` directory on canonical main;
- no 004 implementation PR is open;
- canonical imported upstream source remains limited to Specification 002's already-qualified `.npmrc` and `packages/prisma/schema.prisma` surface;
- no PDF engine/provider dependency has been adopted by Specification 004;
- `docs/foundation/PDF-ENGINE-STRATEGY.md` is a proposed candidate strategy, not an adoption record.

## Fresh candidate observations — discovery only

Observed on 2026-09-06 from public first-party release/project metadata:

### EmbedPDF

- Foundation candidate: `v2.15.0`;
- public `v2.15.0` remains a non-prerelease release;
- public releases also expose `v3.0.0-next.11` as a prerelease;
- no automatic upgrade or `main` substitution is permitted;
- Foundation candidate source commit remains `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed` pending later exact revalidation;
- Foundation PDFium runtime candidate remains `embedpdf/pdfium@cb29e78f2ba00c9298714d5f4a8bf7765f1e802f` pending later exact revalidation.

### LibPDF

- public latest observed non-prerelease release is `v0.4.2`;
- Foundation reference commit is `2144a0a5c4b4ef26373f0f8c30af613c1f17802d`;
- Foundation records root MIT plus Apache-2.0/third-party notice obligations for the fontbox subtree;
- no package acquisition is authorized.

### PDFium / Rust binding direction

- `pdfium-render` is a discovery candidate for a Rust-facing PDFium provider;
- exact crate release, Pdfium API level, source/binary distribution path, platform architecture, CVE/update and bundled-license evidence must be independently qualified;
- no crate/binary selection is authorized by Stage P.

### Other candidates

- bounded Rust structural utilities such as `lopdf` remain hypothesis-only;
- MuPDF remains non-default due AGPL/commercial dual-license complexity;
- OCR/office conversion/repair/compression/archival tools remain optional isolated-provider hypotheses.

These observations may become stale. A later grain must re-read live public metadata immediately before candidate qualification.

## Dependency spine

```text
Stage P shaping
  -> Stage P mandatory closeout
      -> 004A Corpus + operation/security contract qualification
          -> 004B Engine provenance/license/capability feasibility qualification
              -> 004C Inspect/render/search provider qualification
                  -> 004D Page structure transforms
                  -> 004E Merge/split
                  -> 004F Annotation/content/forms
                  -> 004G Marks/metadata/attachments
                  -> 004H High-assurance redaction/sanitize
                  -> 004I Compare
                  -> 004J Compression/repair
                  -> 004K OCR/conversion provider boundary
                      -> 004L Cross-provider convergence + Specification 004 closeout
```

The graph is a planning dependency model. Post-closeout live authority can narrow, reorder, split or block grains.

## Stage P — shaping

### Scope

Only the three canonical planning files listed above.

### Required evidence

- exact `main`/Issue #7/predecessor reread;
- zero upstream-derived source bytes;
- zero dependency acquisition;
- zero package/lockfile/workflow/container mutation;
- exact diff accounting;
- exact-head provider/check accounting;
- independent substantive exact-head review;
- zero unresolved material review threads;
- guarded expected-head merge;
- post-merge verification;
- mandatory closeout package before 004A authority.

### Explicitly not Stage P evidence

- engine runtime tests;
- PDF corpus execution;
- performance benchmarks;
- redaction safety results;
- native/WASM binary distribution support;
- product/browser/native feature behavior;
- signing/verification behavior.

Those evidence classes are `NOT_APPLICABLE` to Stage P because no implementation exists.

## Mandatory Stage P closeout

Stage P shaping merge does **not** automatically authorize 004A.

A closeout package must reconcile:

- exact reviewed Stage P head and tree;
- merge object and ordered parents;
- signature;
- exact changed surface;
- post-merge workflow/status accounting;
- independent review result;
- unresolved thread state;
- live Issue #7 and roadmap state;
- any authority race/competing PR state;
- exact successor authorization or explicit lack thereof.

Only that live post-closeout truth can authorize 004A or another bounded successor.

## 004A — Corpus + operation/security contract qualification

Candidate authority class after canonical Stage P closeout:

`PLANNING_CONTRACT_QUALIFICATION_ONLY`

### Purpose

Freeze shared evidence and semantic contracts before choosing an engine or implementing operations.

### Candidate outputs

Signthos-authored artifacts under `specs/004-local-pdf-core/**` defining:

- versioned fixture record schema;
- fixture rights/source/digest rules;
- corpus family matrix;
- lifecycle classes `READ_ONLY`, `REVISION_CREATING`, `SIGNATURE_CREATING`, `VERIFICATION_ONLY`;
- canonical operation request/result semantic fields;
- revision/digest/lineage invariants;
- stable error/uncertainty categories;
- active-content default-deny policy;
- encrypted-input secret handling;
- resource-budget taxonomy;
- cancellation/deadline semantics;
- locality/network-evidence requirements;
- provider isolation/no-secret rules;
- signed-input safety cases;
- deterministic/adversarial contract examples.

### Important boundary

004A may create fixture **specification/manifest format planning**, but real external fixture acquisition/import requires exact rights/provenance authority. Synthetic/Signthos-authored fixtures may later be separately authorized.

No parser/renderer dependency or product implementation is authorized by merely closing 004A.

## 004B — Engine provenance/license/capability feasibility qualification

Dependency: canonical 004A and live authorization.

Candidate authority initially: discovery/qualification only.

### Purpose

Compare exact immutable engine/provider candidates against the 004A contract without adopting them prematurely.

### Candidate families

- EmbedPDF v2 line + exact PDFium WASM/runtime;
- LibPDF exact release;
- PDFium exact native source/binary + Rust binding candidate;
- bounded Rust structural library candidate where justified;
- optional heavy provider candidates only for operations that cannot remain in the core.

### Required candidate matrix

For each candidate:

```text
CandidateEngineEvidence {
  exactRepository
  exactSourceRevision
  exactPackageOrCrateVersion
  exactPathsOrArtifacts
  binaryOrWasmProvenance
  transitiveBundledComponents
  licenseExpressions
  requiredNotices
  distributionObligations
  advisoryCveUpdatePath
  supportedPlatformsArchitectures
  capabilityClaims
  unsupportedOrPartialClaims
  executionLocality
  isolationBoundary
  resourceControls
  cancellationBehavior
  corpusEvidenceRef
  performanceEvidenceRef
}
```

### Fail-closed rules

- no moving branch reference as merge-critical evidence;
- no wrapper-license inference for bundled binaries;
- no proprietary/restricted path use without explicit rights;
- no adoption from README/marketing claims alone;
- no engine implementation authority unless a separately canonical unit names exact dependencies/change surfaces;
- no v3 prerelease substitution for EmbedPDF v2 without a new explicit decision and evidence.

## 004C — Inspect/render/search provider qualification

Dependency: canonical 004A + 004B and a selected exact provider candidate authorized for this grain.

Potential implementation scope, if later explicitly authorized:

- inspect exact revision;
- render page/thumbnail;
- text selection/extraction/search;
- bounded document/page metadata reads;
- active-content non-execution;
- cancellation/resource limits;
- browser/local provider behavior;
- later native provider parity where separately authorized.

### Evidence

- exact corpus;
- malformed/encrypted/active-content cases;
- deterministic extraction metadata where possible;
- render reference evidence/tolerances;
- resource/cancellation/no-network evidence;
- revision bytes unchanged;
- browser/native comparison only where both implementations exist;
- no signature validity claim.

## 004D — Page structure transforms

Dependency: canonical 004A/B plus read/inspection prerequisites needed for validation.

Candidate capabilities:

- reorder;
- rotate;
- remove;
- extract pages.

All output mutations are `REVISION_CREATING`.

Required evidence:

- deterministic lineage from exact input revision;
- output digest/new revision identity;
- page order/geometry validation through independent or secondary inspection;
- form/annotation/attachment side-effect characterization;
- signed-source behavior explicitly tested and never silently presented as signature-preserving;
- malformed/resource limits.

## 004E — Merge/split

Dependencies: 004A/B and relevant inspection primitives.

### Merge

- every input exact revision/digest ordered explicitly;
- deterministic input ordering;
- output is a new revision;
- mixed metadata/forms/attachments/encryption behavior is specified;
- cross-tenant/authorization policy is explicit before reading all inputs.

### Split

- exact source revision;
- deterministic page ranges/order;
- each output has independent digest/revision lineage;
- partial success semantics are explicit rather than ambiguous.

## 004F — Annotation/content/forms

Dependencies: 004A/B and appropriate render/inspection provider qualification.

Candidate sub-grains should be split if review scope is too broad:

- annotations;
- bounded text placement;
- bounded image placement;
- AcroForm inspection/fill;
- flattening.

XFA or other unsupported form systems fail explicitly rather than silently degrading.

Each save is `REVISION_CREATING`.

## 004G — Marks, metadata and attachments

Dependencies: 004A/B and relevant structural provider.

Candidate operations:

- watermark;
- stamp;
- page numbering;
- metadata mutation;
- attachment add/remove/extract.

Mutation operations create new revisions even when visual pages appear unchanged.

Attachment extraction is read-only only if the exact PDF input bytes are not changed; extracted attachment bytes are derived artifacts and require their own digest/evidence.

## 004H — High-assurance redaction and sanitization

Dependencies: 004A/B/C and all secondary inspection paths required for independent recovery testing.

This is intentionally later because safe-redaction claims require more than editor implementation.

### Required evidence

- exact targeted content definition;
- exact input and output revision/digests;
- independent parser/raw-object recovery attempt;
- text extraction/copy attempt;
- image/object extraction attempt where relevant;
- form/annotation/layer inspection;
- metadata/attachment inspection;
- incremental-history inspection;
- rendered output inspection;
- malformed/active-content/resource cases;
- no target recoverability through any required qualified path.

If independent recovery remains possible, result must fail safe-redaction qualification.

Sanitize is separately scoped; it must enumerate removed/disabled feature classes and does not automatically imply redaction.

## 004I — Compare

Dependency: qualified read/inspection/render providers relevant to claimed dimensions.

Comparison dimensions must be explicit:

- exact bytes;
- normalized structure;
- page geometry;
- rendered visual output;
- extracted text;
- forms/annotations;
- metadata/attachments.

A provider cannot report generic equality if it did not inspect all dimensions implied by that word.

## 004J — Compression and repair

Dependency: 004A/B plus validators capable of checking affected features.

Both are `REVISION_CREATING`.

Required evidence:

- exact before/after revision/digest;
- output byte change;
- page/render/text/form/attachment side-effect evidence;
- corruption/repair warnings;
- lossy behavior disclosure;
- resource/time limits;
- no signature-preservation claim without Specification 005 evidence.

## 004K — OCR/conversion provider boundary

Dependency: 004A/B and qualified provider/isolation planning.

Likely split into smaller grains:

- image/PDF OCR;
- image-to-PDF;
- office-to-PDF;
- optional archival/conformance provider planning.

These are explicit provider transitions and revision creation.

Heavy provider rules:

- isolated where practical;
- bounded CPU/memory/time/output;
- cancellation;
- no signing key/control-plane-secret access;
- no unrelated tenant access;
- explicit network behavior;
- provider/version/config/language/model evidence;
- independent output validation for conformance claims.

Specification 010 owns the later generic heavy-provider automation platform.

## 004L — Cross-provider convergence and Specification 004 closeout

Dependencies: every grain actually authorized and canonical for the current Specification 004 scope.

Purpose:

- prove provider implementations conform to one capability/revision/error/locality model;
- reconcile browser/native/server differences explicitly;
- reconcile exact engine/source/license/notice/SBOM evidence;
- reconcile corpus versions/results;
- prove no hidden provider domain fork;
- document unsupported capabilities honestly;
- reconcile performance/resource/security evidence;
- close Specification 004 only for actually completed authorized scope;
- derive Specification 005 eligibility from live post-closeout truth only.

No roadmap number can replace this closeout evidence.

## Candidate provider-role matrix

This matrix is hypothesis only:

| Capability family | Candidate direction | Stage P status |
| --- | --- | --- |
| browser render/editor | EmbedPDF v2 + exact PDFium runtime | candidate, not adopted |
| browser/server structural operations | LibPDF exact release | candidate, not adopted |
| native render/inspect | exact PDFium build + Rust binding | candidate, not adopted |
| bounded structural tooling | exact Rust library or Signthos utility | candidate, not adopted |
| OCR | isolated optional provider | candidate class only |
| office conversion | isolated optional provider | candidate class only |
| repair/compression | capability-specific provider | candidate class only |
| archival/conformance | provider + independent validator | candidate class only |
| signing | Specification 005 | out of 004 implementation scope |
| signature verification | Specification 005 | out of 004 implementation scope |

## Shared acceptance evidence for future implementation grains

Every future implementation grain selects only evidence classes applicable to its surface, but no required class may be silently dropped.

### Exact artifact binding

- exact repository commit;
- exact package/crate/binary version;
- exact configuration;
- exact corpus revision/digest;
- exact implementation head/tree.

### Functional contract

- positive cases;
- deterministic negative cases;
- unsupported feature cases;
- byte-effect class;
- exact revision/digest lineage;
- stable result/error semantics.

### Security/adversarial

- malformed input;
- active content;
- resource exhaustion;
- cancellation/deadline;
- encrypted input/secrets;
- no-silent-network;
- tenant authorization;
- isolation/no-secret leakage.

### Preservation/safety

- signed/signing-bound source behavior;
- metadata/forms/attachments/annotations side effects where applicable;
- partial output atomicity;
- independent exported-file validation for redaction or conformance claims.

### Performance

Only when a target/budget is declared:

- representative runtime/hardware;
- corpus category;
- cold/warm behavior;
- latency/throughput/memory/output-size;
- resource-limit behavior.

### Qualification

- exact-head CI/check accounting;
- independent substantive exact-head review;
- unresolved material threads zero;
- premerge proof;
- expected-head merge;
- post-merge verification;
- ledger/successor reconciliation.

## Review policy

Independent review must inspect the complete exact candidate and relevant canonical contracts, not only a summary.

A reviewer must treat these as non-approval:

- skipped review;
- unavailable review;
- billing-blocked bot output;
- rate-limit output;
- neutral/provider-only status;
- stale-head review;
- self-authored review.

Material findings require forward-only repair. The repaired exact head requires fresh substantive review before merge.

## Merge policy

No squash/rebase/force/admin bypass to evade exact-head evidence.

Immediately before merge verify:

- canonical main unchanged from qualified base or candidate reconciled appropriately;
- exact reviewed head unchanged;
- PR open/non-draft/mergeable;
- required checks/contexts classified truthfully;
- unresolved material review threads zero;
- competing authority race state;
- rulesets/branch protection;
- exact diff/change surface;
- mandatory English premerge proof.

Use guarded normal merge with `expected_head_sha` when supported.

## Post-merge policy

Verify:

- returned merge SHA equals canonical main;
- ordered parents `[premerge main, exact reviewed head]`;
- merge tree equals reviewed-head tree for ordinary normal merge or exact intended bounded delta is otherwise proven;
- GitHub signature is valid/verified where expected;
- exact changed surface;
- post-merge workflows/statuses are accounted truthfully;
- task/issue/successor state is reconciled.

## Stage P candidate result

Before Stage P shaping itself becomes canonical:

```text
SPEC_004_STAGE_P = CANDIDATE_ONLY
SPEC_004_STATUS = PLANNING_ONLY
SPEC_004_IMPLEMENTATION_AUTHORITY = ABSENT
004A_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

If and only if the Stage P shaping package passes exact-head review, guarded merge, post-merge verification, and its **mandatory closeout package** becomes canonical, live governance may authorize a bounded 004A or another successor.

The actual post-closeout reread controls.
