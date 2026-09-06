# Specification 004 — Stage P Closeout Reconciliation

Status: `CLOSEOUT_CANDIDATE / PLANNING_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #7
Canonical predecessor main: `4b1bbe57ff1878fc573b6d3d8b6bebf3baad38a6`
Stage P PR: #98
Stage P reviewed head: `8ea9bb1963c4e7b59befe85310e92ec962069a4c`
Stage P reviewed tree: `8f4bf0470ea9954a2deb2bcd62cc5f5a691785f1`

## Authority

This unit exists only to reconcile the already-merged Specification 004 Stage P shaping evidence, close the Stage P governance transition, and derive the next bounded planning successor from live post-merge truth.

It is authorized by Issue #7 comment `github:issue-comment:5562251940` as:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = SPEC_004_STAGE_P_CLOSEOUT_RECONCILIATION
SPEC_004_STAGE_P_CLOSEOUT_AUTHORITY = PLANNING_CLOSEOUT_RECONCILIATION_ONLY
SPEC_004_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SOURCE_IMPORT_AUTHORITY = ABSENT
SPEC_004_DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
SPEC_004_PROVIDER_RUNTIME_AUTHORITY = ABSENT
SPEC_004_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
004A_AUTHORITY = NOT_YET_CANONICAL_SUCCESSOR_AUTHORITY
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

This closeout grants no product/runtime implementation, source import, dependency acquisition, package/lockfile/Cargo mutation, PDF engine adoption or execution, provider/network execution, database migration, signing/verification implementation, credentials, deployment, public API work, Specification 005 work, or 004A implementation authority.

## Exact Stage P evidence

The following Stage P evidence is already established and is reconciled here without rewriting historical artifacts:

```text
STAGE_P_BASE = dd996f11b701679b941c1fb3fd3e8bdc880f2506
STAGE_P_REVIEWED_HEAD = 8ea9bb1963c4e7b59befe85310e92ec962069a4c
STAGE_P_REVIEWED_HEAD_TREE = 8f4bf0470ea9954a2deb2bcd62cc5f5a691785f1
STAGE_P_MERGE = 4b1bbe57ff1878fc573b6d3d8b6bebf3baad38a6
STAGE_P_MERGE_TREE = 8f4bf0470ea9954a2deb2bcd62cc5f5a691785f1
TREE_EQUALITY = PASS
STAGE_P_REVIEW = github:issue-comment:5562226996
STAGE_P_REVIEW_VERDICT = NO_MATERIAL_FINDINGS
PREMERGE_PROOF = github:issue-comment:5562245482
POSTMERGE_PROOF = github:issue-comment:5562250511
AUTHORITY_RACE_RECONCILIATION = github:issue-comment:5562240404
```

### Exact candidate surface

The reviewed Stage P range was exactly three commits ahead and zero behind its canonical base.

Exact changed paths were only:

- `specs/004-local-pdf-core/spec.md` — `+564 / -0`;
- `specs/004-local-pdf-core/plan.md` — `+590 / -0`;
- `specs/004-local-pdf-core/tasks.md` — `+271 / -0`.

Total Stage P delta was `+1425 / -0`.

The range changed zero product/runtime, dependency, package/lockfile, source-import, provenance, NOTICE, workflow, container, database, provider-runtime, or signing implementation bytes.

The independent review explicitly ran `git diff --check` on the exact range and reported it clean.

## Exact review and check accounting

Stage P qualification did not convert unavailable provider output into PASS.

- CodeRabbit automatic review was skipped because this repository requires manual review triggering.
- CodeRabbit manual full review at `github:issue-comment:5562226996` reviewed exact base `dd996f11b701679b941c1fb3fd3e8bdc880f2506` through exact head `8ea9bb1963c4e7b59befe85310e92ec962069a4c` and reported `NO_MATERIAL_FINDINGS`.
- Qodo at `github:issue-comment:5562196112` was billing-blocked and was classified `UNAVAILABLE_NONQUALIFYING`, not PASS.
- Cubic check run `101559368202` completed `neutral` because the monthly review-line limit was exhausted and was classified `UNAVAILABLE_NONQUALIFYING`, not PASS.
- Exact-head GitHub Actions workflow runs were `0`, classified `NO_APPLICABLE_RUN`.
- The CodeRabbit commit status context was `success`, but that status was not used as a substitute for the substantive manual review verdict.
- Unresolved material review threads immediately before merge were `0`.
- Repository rulesets immediately before merge were none.
- `main` branch protection was disabled/unprotected.
- PR #98 was open, non-draft, mergeable, and still bound to the exact reviewed head immediately before merge.

## Authority-race reconciliation

Immediate premerge verification discovered later competing PR #99 from the same canonical base under the same Stage P planning authority.

The race was resolved fail-closed before PR #98 merged:

```text
PR_98 = SELECTED_CANONICAL_STAGE_P_CANDIDATE
PR_98_HEAD = 8ea9bb1963c4e7b59befe85310e92ec962069a4c
PR_99_HEAD = 4834a23d7d8069ed65a784c2c75a4bcef986c635
PR_99 = CLOSED_UNMERGED_NONCANONICAL_RACE_CANDIDATE
PR_99_QUALIFICATION_REUSE = PROHIBITED
```

PR #99 closure evidence is `github:issue-comment:5562238802`.
Issue #7 canonical race reconciliation is `github:issue-comment:5562240404`.

PR #99's branch, review, status, check, or bot output must not be used as qualification evidence for Stage P, this closeout, 004A, or any later grain.

## Guarded merge evidence

The mandatory premerge proof was recorded at `github:issue-comment:5562245482`.

The merge used:

```text
MERGE_METHOD = NORMAL_MERGE
EXPECTED_HEAD_SHA = 8ea9bb1963c4e7b59befe85310e92ec962069a4c
```

GitHub accepted the guarded merge and produced:

```text
MERGE_SHA = 4b1bbe57ff1878fc573b6d3d8b6bebf3baad38a6
PARENT_1 = dd996f11b701679b941c1fb3fd3e8bdc880f2506
PARENT_2 = 8ea9bb1963c4e7b59befe85310e92ec962069a4c
MERGE_TREE = 8f4bf0470ea9954a2deb2bcd62cc5f5a691785f1
MERGE_SIGNATURE_VERIFIED = true
MERGE_SIGNATURE_REASON = valid
```

The ordered parents are correct and the merge tree equals the exact reviewed-head tree.

Post-merge canonical state:

```text
CANONICAL_MAIN = 4b1bbe57ff1878fc573b6d3d8b6bebf3baad38a6
PR_98_STATE = CLOSED_MERGED
POSTMERGE_ACTIONS = NO_APPLICABLE_RUN
POSTMERGE_STATUSES = NO_APPLICABLE_RUN
TREE_EQUALITY = PASS
```

## Canonical Stage P planning result

Stage P established a reviewable Local PDF Core program only.

It canonically shaped:

- the PDF operation effect taxonomy;
- exact revision/digest/lineage evidence expectations;
- untrusted-PDF threat and resource boundaries;
- active-content default-deny and no-silent-network requirements;
- encrypted-input and secret-handling semantics;
- cancellation, deadline, isolation, partial-output, logging, and privacy requirements;
- versioned legally redistributable corpus requirements;
- independent exported-file redaction recovery requirements;
- compare dimensions and lossy repair/compression semantics;
- OCR/conversion provider boundaries;
- candidate multi-engine architecture behind stable Signthos capability contracts;
- exact source/package/crate/WASM/native-binary provenance, license/NOTICE/SBOM/CVE/update/platform gates before any adoption;
- performance evidence categories without fabricated targets;
- bounded candidate dependency order through final Specification 004 convergence.

Stage P adopted no PDF engine, package, crate, binary, provider, fixture corpus, workflow, network service, or implementation.

## Candidate-engine discovery disposition

Stage P public discovery observations remain non-adoption evidence only.

- EmbedPDF tag `v2.15.0` resolves to commit `2cf7df3b594dfe46de2d85e6973ff50ea447a1ed`.
- The Foundation-pinned EmbedPDF v2.15.0 candidate remains distinct from current v3 prerelease/moving-main work.
- LibPDF tag `v0.4.2` resolves to commit `2144a0a5c4b4ef26373f0f8c30af613c1f17802d`.
- LibPDF v0.4.2 root license is MIT while `src/fontbox/LICENSE.md` carries Apache-2.0 terms, so component-level notice accounting remains mandatory.
- `@embedpdf/pdfium@2.15.0` identifies an MIT wrapper/package while `LICENSE.pdfium` carries PDFium and bundled third-party notice obligations; wrapper-license inference remains prohibited.
- `pdfium-render` remains an unselected Rust binding candidate; its current repository manifest exposes version `0.9.4` and explicit PDFium API pinning features, but no adoption authority exists.

Every item above must be revalidated at the exact later adoption grain. No moving branch or current-version observation is automatically canonical dependency selection.

## Ledger reconciliation

This closeout reconciles the Stage P obligations represented by `S4-T037` through `S4-T045` as follows:

- `S4-T037`: exact Stage P base/head, three-file delta, ahead/behind state, and clean `git diff --check` were verified on the final head.
- `S4-T038`: exact-head Actions/check/provider states were truthfully accounted without converting neutral, billing-blocked, unavailable, or skipped states into PASS.
- `S4-T039`: fresh independent substantive review of the exact final Stage P candidate was obtained at `github:issue-comment:5562226996`.
- `S4-T040`: the independent review reported `NO_MATERIAL_FINDINGS`; no forward-only repair or changed-head re-review was required.
- `S4-T041`: unresolved threads, exact base/head, mergeability, rulesets, branch protection, and competing authority were reverified immediately before merge; the discovered PR #99 race was resolved before proceeding.
- `S4-T042`: mandatory premerge proof was recorded and guarded normal merge used the exact expected head.
- `S4-T043`: canonical main, ordered parents, tree equality, signature, exact surface, and post-merge workflow/status state were verified.
- `S4-T044`: this separately reviewable closeout candidate performs the mandatory Stage P closeout reconciliation.
- `S4-T045`: successor authority is **not** treated as canonical until this exact closeout candidate itself passes independent substantive review, guarded merge, post-merge verification, and a fresh live governance reread.

## Stage P canonical result if this closeout qualifies

If and only if this exact closeout candidate independently qualifies, guarded-merges, and passes post-merge verification, the resulting Stage P state is expected to be:

```text
SPEC_004_STAGE_P = CLOSED_CANONICAL
SPEC_004_STATUS = PLANNING_ACTIVE
SPEC_004_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SOURCE_IMPORT_AUTHORITY = ABSENT
SPEC_004_DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
SPEC_004_PROVIDER_RUNTIME_AUTHORITY = ABSENT
SPEC_004_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

The actual post-merge reread controls.

## Successor candidate — fail closed until closeout merge

The Stage P plan and task ledger identify the first dependency-ordered candidate after successful closeout as:

`004A_CORPUS_OPERATION_SECURITY_CONTRACT_QUALIFICATION`

Expected authority class only after this closeout becomes canonical and live Issue #7 governance is reread:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 004A_CORPUS_OPERATION_SECURITY_CONTRACT_QUALIFICATION
004A_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
004A_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_004_SOURCE_IMPORT_AUTHORITY = ABSENT
SPEC_004_DEPENDENCY_ACQUISITION_AUTHORITY = ABSENT
SPEC_004_PROVIDER_RUNTIME_AUTHORITY = ABSENT
SPEC_004_PDF_RUNTIME_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

This is a candidate successor, not current authority.

A future 004A unit may qualify shared corpus-record, operation, revision/digest/lineage, resource, locality, cancellation, active-content, encryption, stable-error, and security contracts at planning level only if live post-closeout governance explicitly authorizes it.

It may define deterministic synthetic examples and rules for future fixture rights/provenance qualification. It may not acquire real external fixtures, install/adopt engines, mutate packages/lockfiles, execute PDF providers, create product/runtime code, or consume later implementation authority unless separately granted.

## Security and rights boundaries preserved

This closeout preserves all canonical boundaries:

- every PDF remains untrusted input;
- active content and automatic external fetch remain deny-by-default;
- local operations cannot silently upload;
- resource limits, cancellation, deadlines, isolation, and partial-output behavior remain explicit future implementation requirements;
- passwords, keys, document content, attachments, and signing material remain excluded from ordinary logs;
- content-changing output creates a distinct revision;
- signed/signing-bound source bytes remain immutable;
- authentication/provider identity is not resource authorization;
- provider status cannot redefine canonical domain/workflow state;
- unsupported/unknown states fail closed;
- no engine API becomes canonical domain authority;
- Specification 002 source-import/rights boundaries are not broadened;
- no public-repository license observation substitutes for exact future provenance/redistribution qualification;
- Specification 005 signing/verification implementation remains separately unauthorized.

## Completion boundary

This closeout is itself planning-only evidence.

It is not canonically complete merely because this file exists on a branch. It must receive fresh independent substantive exact-head review, truthful provider/check accounting, zero unresolved material review threads, mandatory premerge proof, guarded expected-head merge, post-merge verification, and a fresh live successor-authority reconciliation.

Until then:

```text
SPEC_004_STAGE_P_CLOSEOUT = CANDIDATE_ONLY
004A_AUTHORITY = NOT_YET_CANONICAL_SUCCESSOR_AUTHORITY
SPEC_004_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```
