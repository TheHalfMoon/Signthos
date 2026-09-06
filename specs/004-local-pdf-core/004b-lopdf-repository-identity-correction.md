# Specification 004B — lopdf Repository Identity Correction

Status: `QUALIFICATION_CANDIDATE / FORWARD_ONLY_REPAIR / ZERO_ADOPTION`
Issue: #7
Parent 004B artifact: `004b-engine-provenance-license-capability-feasibility-qualification.md`
Independent finding source: `github:issue-comment:5562587660`

## 1. Purpose

Independent substantive review of the earlier 004B head identified one material omission that remains applicable to the combined candidate: Candidate D records an exact annotated tag object and release commit for `lopdf`, but the identity block does not explicitly populate the shared `exactRepository` field.

This file repairs that omission forward-only without reopening any other 004B decision.

## 2. Normative repository identity

For Candidate D, the exact repository identity is:

```text
candidateId = lopdf-0.44.0-bounded-structural
exactRepository = https://github.com/J-F-Liu/lopdf
releaseRef = refs/tags/v0.44.0
tagObject = d163e69da979be2d867b6d1adf73ef4a7ceafa07
releaseCommit = 8c454dd93d9c37e608c552a2b304d1d31d1cb2e1
package = lopdf
packageVersion = 0.44.0
```

Fresh public immutable evidence verifies:

- repository `J-F-Liu/lopdf`;
- annotated ref `refs/tags/v0.44.0`;
- tag object `d163e69da979be2d867b6d1adf73ef4a7ceafa07`;
- tag object dereference to source commit `8c454dd93d9c37e608c552a2b304d1d31d1cb2e1`;
- `Cargo.toml` at that source commit declares `name = "lopdf"`, `version = "0.44.0"`, `license = "MIT"`, edition `2024`, and Rust `1.88`;
- root `LICENSE` is MIT.

Evidence class: `VERIFIED_IMMUTABLE_METADATA`.

## 3. Normative precedence

This correction supplements and, where necessary, supersedes Candidate D Section 8.1 of the parent 004B artifact only with respect to the previously omitted `exactRepository` field.

All other Candidate D conclusions remain unchanged:

```text
feasibilityStatus = BOUNDED_STRUCTURAL_CANDIDATE_NOT_ADOPTED
adoptionStatus = BLOCKED_PENDING_EXACT_CAPABILITY_CORPUS_SERIALIZATION_SECURITY_AND_TRANSITIVE_LICENSE_EVIDENCE
```

This repository binding does not make `lopdf` a universal PDF engine, default parser/writer, selected dependency, adopted dependency, or authorized implementation provider.

## 4. Authority remains unchanged

This repair remains entirely within:

```text
004B_AUTHORITY = DISCOVERY_QUALIFICATION_ONLY
```

It grants no implementation, dependency adoption/acquisition, source import, external fixture acquisition, provider execution, package/lockfile/Cargo/workflow/container/database/product mutation, 004C, or Specification 005 authority.

No upstream source or binary bytes are added to Signthos.

## 5. Combined-candidate review rule

The exact 004B candidate must be reviewed as the parent qualification plus both forward-only corrections together:

- `004b-engine-provenance-license-capability-feasibility-qualification.md`;
- `004b-binary-release-provenance-correction.md`;
- `004b-lopdf-repository-identity-correction.md`.

The reviewer must verify that:

1. Candidate D now has an unambiguous exact repository binding;
2. the annotated-tag object and release commit belong to that repository;
3. this correction does not inflate Candidate D into adoption or universal-engine selection;
4. the independent review finding is fully repaired;
5. the prior PDFium release-digest correction and remaining native provenance blockers remain intact;
6. 004C remains unauthorized pending canonical 004B completion and live successor reconciliation.
