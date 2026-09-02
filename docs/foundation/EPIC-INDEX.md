# Signthos Specification Epic Index

Status: CANONICAL PLANNING INDEX
Date: 2026-09-02

GitHub issues are durable planning records. **An open issue does not authorize implementation.** Canonical prerequisite and evidence gates in `.specify/memory/constitution.md`, `ROADMAP.md`, the active specification, and live repository state always control execution authority.

## Foundation

| Specification | GitHub record | State | Authority |
|---|---|---|---|
| 000 — Foundation | PR #2; review gate Issue #3; closeout PR #21 | CLOSED_CANONICAL | Closed; `F0-T021` authorizes Spec 001 after this authorization record is merged and verified |

## v0.1 execution spine

| Spec | Epic | Purpose | Prerequisite summary |
|---:|---|---|---|
| 001 | #4 | Provenance and import system | `AUTHORIZED_PENDING_F0_T021_CANONICALIZATION` — Spec 000 closed; this F0-T021 record must merge and be post-merge verified |
| 002 | #5 | Documenso brownfield baseline | Spec 001 + exact authorized import paths/rights |
| 003 | #6 | Signthos domain/anti-corruption boundary | Spec 002 |
| 004 | #7 | Local PDF core | Spec 003 |
| 005 | #8 | Signing and evidence core | Spec 004 |
| 006 | #9 | Web product convergence | Specs 003/004/005 |
| 007 | #10 | Desktop local-first | Specs 003/004/005 |
| 008 | #11 | Mobile and secure handoff | Specs 004/005 + applicable Spec 007 native contracts |
| 009 | #12 | API, SDK and embed | Spec 003 + qualified applicable 004/005 contracts |
| 010 | #13 | Automation and heavyweight providers | Specs 003/004 |
| 011 | #14 | Self-hosted operations and security | Specs 003/009 + supported server/runtime contracts |
| 012 | #15 | v0.1 qualification and release | every release-critical predecessor included/advertised in v0.1 |

## Post-v0.1 candidate epics

| Spec | Epic | Purpose | Authority |
|---:|---|---|---|
| 013 | #16 | Advanced identity and trust providers | POST_V0.1_PLANNING_ONLY |
| 014 | #17 | Collaboration and sync expansion | POST_V0.1_PLANNING_ONLY |
| 015 | #18 | AI-assisted document workflows | POST_V0.1_PLANNING_ONLY |
| 016 | #19 | Managed cloud | POST_V0.1_PLANNING_ONLY |
| 017 | #20 | Enterprise operations/compliance integrations | POST_V0.1_PLANNING_ONLY |

## Dependency view

```text
Spec 000 CLOSED_CANONICAL
  -> F0-T021 successor authorization record
      -> #4 Spec 001
          -> #5 Spec 002
              -> #6 Spec 003
                  -> #7 Spec 004
                      -> #8 Spec 005
                          -> #9 Spec 006
                          -> #10 Spec 007
                              -> #11 Spec 008
                          -> #12 Spec 009
                      -> #13 Spec 010

#14 Spec 011 requires #6 Spec 003 + #12 Spec 009 + applicable server/runtime predecessors.
#15 Spec 012 waits for every release-critical predecessor included in the release claim.

Post-v0.1: #16–#20 remain candidates until separately authorized by canonical governance.
```

## Issue lifecycle rule

A successor epic remains `PLANNING_ONLY` until its canonical prerequisite is closed and the active governance explicitly establishes successor authority. At activation time, the epic must be re-read against live repository truth and recursively refined into a new specification directory with bounded tasks.

Do not use the existence, age, assignee, label, milestone, checkbox state, or founder's general ordinary approval on an epic as a substitute for an evidence-dependent gate explicitly required by canonical governance.

## Current frontier

Foundation 000 is `CLOSED_CANONICAL` on canonical `main` at `a39bcaf7705ac639d2da52ffd23f2d94ba7461ed`. Its closeout is independently reviewed, exact-head qualified, merged, and post-merge verified. Foundation review-gate Issue #3 is closed.

`F0-T021` has re-read canonical governance and determined that Specification 001 — Provenance and Import System is the next dependency-ordered successor and has no newer blocker to its bounded provenance/import-system work. That authorization becomes canonical only after this F0-T021 record is independently qualified, merged with expected-head protection, and post-merge verified.

Until then, Issue #4 remains the durable successor record and no Spec 001 implementation should begin from this candidate branch.

Even after Spec 001 authorization becomes canonical, no upstream product source is authorized merely to exercise the machinery. No Documenso EE/commercial path, Stirling restricted path, relicensing action, mobile distribution claim, credential/paid-service use, or compliance/legal-effect claim is authorized by F0-T021 or by the existence of the successor epic.
