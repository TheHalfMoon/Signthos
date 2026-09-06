# Specification 004 — Canonical Task Ledger

Status: `STAGE_P_SHAPING_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #7
Canonical shaping base: `dd996f11b701679b941c1fb3fd3e8bdc880f2506`
Canonical predecessor: Specification 003 `CLOSED_CANONICAL`
Authority source: `github:issue-comment:5562123379`

## Ledger contract

This ledger tracks bounded Specification 004 planning/qualification work.

- `[x]` means the current candidate contains the stated planning result/evidence.
- `[ ]` means incomplete, blocked, or not yet authorized/proven.
- Candidate `[x]` items are not canonical until the exact shaping package passes required review, guarded merge, post-merge verification, and mandatory Stage P closeout.
- A checked planning task grants no implementation, dependency, source-import, provider-runtime, PDF-runtime, migration, signing, deployment, or downstream authority.
- Historical predecessor evidence remains immutable and is referenced rather than rewritten.

## Stage P — shaping tasks

- [x] `S4-T001` Re-read canonical Constitution, `AGENTS.md`, `ROADMAP.md`, Issue #7, exact current `main`, and Specification 003 closeout before shaping.
- [x] `S4-T002` Verify Specification 003 is `CLOSED_CANONICAL` through PR #97 / merge `dd996f11b701679b941c1fb3fd3e8bdc880f2506`, with Issue #6 closed completed.
- [x] `S4-T003` Bind Stage P authority to Issue #7 comment `5562123379 = PLANNING_SHAPING_ONLY` and record all absent implementation/dependency/import/runtime authorities.
- [x] `S4-T004` Confirm no `specs/004-*` directory and no open Specification 004 PR existed on the shaping base.
- [x] `S4-T005` Consume canonical Specification 003 document/revision/provider/authorization/error/persistence/naming contracts without reopening them.
- [x] `S4-T006` Preserve Specification 002 imported-source/rights boundary; Stage P adds zero upstream-derived source bytes and no new provenance imports.
- [x] `S4-T007` Re-read Foundation PDF engine strategy as candidate architecture rather than adoption authority.
- [x] `S4-T008` Revalidate selected public candidate freshness without adopting dependencies: EmbedPDF v2.15.0 stable candidate remains available while v3 is prerelease; LibPDF v0.4.2 remains latest observed stable release; native PDFium/Rust bindings remain unselected candidates.
- [x] `S4-T009` Define Local PDF Core problem, goal, planning scope-in/scope-out, and explicit zero-implementation Stage P boundary.
- [x] `S4-T010` Define PDF semantic side-effect classes `READ_ONLY`, `REVISION_CREATING`, `SIGNATURE_CREATING`, and `VERIFICATION_ONLY`, preserving Specification 005 ownership for cryptographic signing/verification implementation.
- [x] `S4-T011` Define future operation-request/result semantic requirements for exact revision/digest inputs, provider/capability identity, locality, resource budget, cancellation/deadline, stable errors, output digest and lineage evidence.
- [x] `S4-T012` Define untrusted-PDF threat model covering malformed structures, deep/cyclic graphs, object/xref streams, decompression/resource bombs, oversized images/fonts/attachments, incremental chains, encryption, active content, forms/XFA, embedded files and signed inputs.
- [x] `S4-T013` Define active-content default-deny and no-automatic-network policy for JavaScript/actions/launch/URI/embedded execution.
- [x] `S4-T014` Define resource-budget, timeout, cancellation, isolation and partial-output fail-closed requirements.
- [x] `S4-T015` Define encrypted-document password/secret handling and explicit unsupported/invalid-credential semantics.
- [x] `S4-T016` Define signed/signing-bound revision safety so ordinary PDF changes create distinct revisions and no engine save result implies signature preservation.
- [x] `S4-T017` Define explicit execution-locality boundary and no-silent-upload/network requirements.
- [x] `S4-T018` Define versioned legally redistributable fixture/corpus record contract and required fixture families, including Arabic/RTL, malformed/encrypted/signed/redaction/resource/active-content cases.
- [x] `S4-T019` Define independent exported-file redaction recovery proof and separate sanitize semantics.
- [x] `S4-T020` Define compare dimensions rather than generic equality.
- [x] `S4-T021` Define repair/compression as revision-creating potentially lossy operations requiring before/after and side-effect evidence.
- [x] `S4-T022` Define OCR/conversion as explicit provider/revision boundaries with isolation/resource/locality/evidence requirements.
- [x] `S4-T023` Define engine/source/package/crate/WASM/native-binary provenance, license/NOTICE/SBOM/CVE/update/platform qualification prerequisites before adoption.
- [x] `S4-T024` Preserve multi-engine capability-contract architecture as a candidate strategy while prohibiting provider-specific hidden domain forks.
- [x] `S4-T025` Define performance evidence categories without fabricating targets or benchmark results.
- [x] `S4-T026` Define stable candidate error/uncertainty categories and fail-closed unsupported/unknown behavior.
- [x] `S4-T027` Define privacy/logging defaults excluding raw document content, extracted text, passwords, keys, attachments and signing material.
- [x] `S4-T028` Recursively decompose Specification 004 into dependency-ordered candidate grains 004A–004L.
- [x] `S4-T029` Define 004A corpus + operation/security contract qualification as planning-only potential successor after mandatory Stage P closeout.
- [x] `S4-T030` Define 004B exact engine provenance/license/capability feasibility qualification before adoption.
- [x] `S4-T031` Define future bounded capability grains for inspect/render/search, page transforms, merge/split, content/forms, marks/metadata/attachments, redaction/sanitize, compare, compression/repair and OCR/conversion.
- [x] `S4-T032` Define cross-provider convergence/Specification 004 closeout grain and fail-closed Specification 005 successor semantics.
- [x] `S4-T033` Define shared exact-artifact, functional, adversarial/security, preservation, performance and qualification evidence classes for later implementation grains.
- [x] `S4-T034` Define exact-head independent-review, forward-only repair, guarded merge and post-merge requirements.
- [x] `S4-T035` Define mandatory Stage P closeout after shaping merge; shaping merge alone cannot authorize 004A.
- [x] `S4-T036` Prove Stage P candidate change surface is intended to be exactly `spec.md`, `plan.md`, and `tasks.md` under `specs/004-local-pdf-core/**`, with zero dependency/source/runtime/provenance mutation.
- [ ] `S4-T037` Verify the exact final Stage P base/head diff and `git diff --check` equivalent evidence after the candidate head is complete.
- [ ] `S4-T038` Account truthfully for exact-head GitHub Actions/check/provider state; do not convert skip/unavailable/neutral/billing/rate-limit output into PASS.
- [ ] `S4-T039` Obtain independent substantive review of the exact final Stage P head against exact canonical base and relevant predecessor/foundation/public-candidate evidence.
- [ ] `S4-T040` Repair every material review finding forward-only; if the head changes, obtain fresh exact-head substantive review.
- [ ] `S4-T041` Confirm unresolved material review threads are zero and reverify exact base/head, mergeability, rulesets, branch protection and competing authority immediately before merge.
- [ ] `S4-T042` Record mandatory exact-head English premerge proof and perform guarded normal merge using exact `expected_head_sha`.
- [ ] `S4-T043` Post-merge verify canonical main, ordered parents, reviewed-head/merge-tree equality, valid signature, exact changed surface and truthful workflow/status accounting.
- [ ] `S4-T044` Create and qualify mandatory Stage P closeout package from live post-merge truth.
- [ ] `S4-T045` Derive the next bounded Specification 004 successor only after canonical closeout; do not infer 004A authority from task numbering.

## Stage P exact authority state

Before this candidate itself becomes canonical:

```text
SPEC_004_STAGE_P = CANDIDATE_ONLY
SPEC_004_STATUS = PLANNING_ONLY
SPEC_004_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SOURCE_IMPORT_AUTHORITY = ABSENT
SPEC_004_DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
SPEC_004_PROVIDER_RUNTIME_AUTHORITY = ABSENT
SPEC_004_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004A_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

## Canonical predecessor evidence

```text
SPEC_003_CLOSEOUT_PR = #97
SPEC_003_EXACT_REVIEWED_HEAD = 4096d99b29cad7a4fb9901afe029900fae02b691
SPEC_003_EXACT_REVIEWED_HEAD_TREE = e6643f639bd7f3369f9b52bad839d8a12a9bdf0d
SPEC_003_REVIEW = github:issue-comment:5562080885 = NO_MATERIAL_FINDINGS
SPEC_003_MERGE = dd996f11b701679b941c1fb3fd3e8bdc880f2506
SPEC_003_MERGE_TREE = e6643f639bd7f3369f9b52bad839d8a12a9bdf0d
SPEC_003_ISSUE = #6 CLOSED_COMPLETED
SPEC_004_STAGE_P_AUTHORITY = github:issue-comment:5562123379
```

## Candidate dependency graph

```text
Stage P shaping
  -> mandatory Stage P closeout
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

The graph orders candidate dependencies. It creates no implementation authority.

## 004A candidate — corpus + operation/security contracts

Potential authority class after canonical Stage P closeout:

`PLANNING_CONTRACT_QUALIFICATION_ONLY`

Purpose:

- freeze shared fixture/corpus, operation, revision/digest/lineage, resource, locality, cancellation, active-content and error contracts before engine selection;
- define deterministic/adversarial contract examples;
- define how real fixture rights/provenance must be established before acquisition.

No engine adoption or runtime implementation authority is implied.

## 004B candidate — engine feasibility/provenance

Dependency: canonical 004A plus fresh live authority.

Purpose:

- qualify exact immutable candidate engines/packages/binaries against the shared contracts;
- bind licenses/notices/SBOM/CVE/update/platform/capability/corpus evidence;
- select no dependency until exact adoption authority exists.

Candidate directions only:

- EmbedPDF v2 + exact PDFium runtime;
- LibPDF exact release;
- PDFium native + Rust binding;
- bounded Rust structural utility;
- optional heavy-provider classes.

No moving branch, prerelease upgrade, wrapper-license inference, or marketing claim is sufficient evidence.

## 004C candidate — inspect/render/search

Potential later implementation surface only after exact provider selection and authority:

- parse/inspect;
- render/thumbnail;
- text selection/extraction/search;
- active-content non-execution;
- resource/cancellation/no-network behavior;
- exact input bytes remain unchanged.

No signature validity claim.

## 004D candidate — page structure transforms

Candidate capabilities:

- reorder;
- rotate;
- remove;
- extract pages.

All mutations are `REVISION_CREATING`. Output needs exact digest/revision/lineage evidence and explicit signed-source behavior.

## 004E candidate — merge/split

Merge records every exact input revision/digest in deterministic order. Split records exact source and deterministic ranges; every output has independent digest/revision lineage.

Authorization must cover every input before processing.

## 004F candidate — annotations/content/forms

Likely recursively split where needed:

- annotations;
- text placement;
- image placement;
- AcroForm inspect/fill;
- flattening.

Unsupported XFA/other systems fail explicitly.

## 004G candidate — marks/metadata/attachments

Candidate capabilities:

- watermark/stamp/page numbering;
- metadata mutation;
- attachment add/remove/extract.

Every PDF-byte mutation is revision-creating even when rendered pages appear unchanged.

## 004H candidate — redaction/sanitize

High-assurance grain only after required independent inspection/recovery paths exist.

No safe-redaction claim without exported-file recovery attempts through independent parser/raw/text/image/form/layer/metadata/attachment/incremental/render paths applicable to the targeted data.

Sanitize remains a separately enumerated feature-removal contract.

## 004I candidate — compare

Comparison dimensions must state exactly what is checked: bytes, structure, geometry, render, text, forms/annotations, metadata/attachments.

No generic equality claim beyond inspected dimensions.

## 004J candidate — compression/repair

Both are revision-creating and may be lossy.

Evidence must identify exact input/output, provider/version, data-loss warnings, resource behavior and affected PDF features.

## 004K candidate — OCR/conversion

Candidate sub-grains may include OCR, image-to-PDF, office-to-PDF and later archival/conformance provider planning.

Heavy-provider isolation, resource/deadline/cancellation, locality/network and no-secret rules apply. Output is a new revision.

Specification 010 owns generic automation/provider orchestration.

## 004L candidate — convergence + closeout

Converge only the 004 grains actually authorized and canonical.

Required closeout evidence eventually includes:

- exact provider/dependency/source/license/notice/SBOM inventory;
- shared corpus revisions/results;
- cross-provider contract compatibility;
- unsupported capability ledger;
- resource/security/locality evidence;
- performance evidence where targets exist;
- redaction independent proof where claimed;
- exact review/merge/post-merge evidence;
- live Specification 005 successor analysis.

Specification 005 remains unauthorized until the final live 004 closeout proves eligibility.

## Security invariants carried into every 004 grain

- every PDF is untrusted input;
- active content and automatic external fetch are deny-by-default;
- resource limits are explicit and tested when implementation exists;
- timeout/cancellation cannot publish partial output as success;
- passwords/secrets/document content are excluded from ordinary logs;
- local operations do not silently upload;
- heavy/untrusted processors do not receive signing keys/control-plane secrets;
- content-changing output creates a distinct revision;
- signed/signing-bound input bytes remain immutable;
- provider status cannot redefine canonical workflow/domain state;
- authentication/provider identity is not resource authorization;
- unsupported/unknown states fail closed;
- no engine API is canonical domain authority.

## Completion boundary

Specification 004 is not canonically complete when Stage P closes.

Stage P establishes a reviewable PDF-core program. It does not choose an engine, create runtime behavior, or authorize implementation.

No implementation grain may be invented or started until live canonical successor analysis explicitly authorizes its exact bounded surface and evidence requirements.
