# Signthos Constitution

Version: 0.1-foundation
Status: CANONICAL

## I. Product integrity

Signthos is an open, local-first document and signing platform. Product decisions must preserve privacy, verifiability, portability, self-hostability and coherent cross-platform behavior.

## II. Big ideas, small specs

Every implementation unit must be recursively refined until it has:

- one bounded purpose,
- explicit scope-in and scope-out,
- explicit change surface,
- explicit dependencies,
- explicit risks,
- deterministic acceptance criteria,
- required evidence,
- a reviewable completion boundary.

Oversized work must be decomposed rather than compensated for with broader prompts, longer context or weaker review.

## III. Brownfield truth before transformation

Before modifying imported or inherited code, a specification must establish exact live repository truth and characterization evidence for the affected behavior.

No large mechanical rebrand may be combined with architectural migration, behavior change or license-boundary change in one unit.

## IV. Provenance before import

No upstream source code may enter Signthos unless its exact source commit, path, license/permission basis and destination are known and recorded.

Ambiguous, conflicting or missing rights are fail-closed.

Commercial/restricted upstream code requires explicit written rights that cover the intended copying, modification, redistribution and open-source publication.

## V. One domain model, explicit providers

Product behavior must be expressed through stable domain contracts. Browser, native, server and heavy-processing implementations must conform through explicit provider interfaces instead of creating hidden platform-specific domain forks.

## VI. Local-first is a real execution mode

Supported local operations must not silently upload user documents or require an account. Network transitions must be explicit and observable.

## VII. Signing evidence is not marketing

Electronic-signature, cryptographic-signature, advanced-signature and qualified-signature claims must remain technically distinct. Compliance or legal-effect claims require explicit evidence and may not be inferred from UI behavior.

## VIII. Verify, do not trust

Where a claim can be independently verified, Signthos should expose a verifier and public evidence contract. Verification must distinguish valid, invalid, incomplete, unsupported and unavailable states. Uncertainty must never be converted into success.

## IX. Determinism and evidence binding

Specifications, tests, migrations, import manifests and verification records must bind evidence to the exact code/configuration under review. Exact-head qualification is required for merge-critical evidence.

## X. Diffciplane merge discipline

A task is not canonically complete because implementation exists locally or because CI once passed.

Where applicable, completion requires:

1. canonical task ordering satisfied,
2. readiness gates satisfied,
3. bounded implementation complete,
4. required focused/full tests pass,
5. required CI passes on the exact head,
6. independent substantive review is obtained,
7. review conversations are resolved,
8. mandatory premerge proof is recorded,
9. merge uses expected-head protection when supported,
10. post-merge verification passes,
11. canonical task/roadmap state is reconciled.

Unavailable, skipped or self-authored review is not equivalent to an independent PASS.

## XI. No authority inflation

General founder approval authorizes ordinary work inside the canonical bounded roadmap. It does not automatically authorize actions that governance marks as requiring separate evidence or rights, including restricted-source import, relicensing, credential use, paid external services, regulated identity/compliance claims, or destructive history rewriting.

## XII. No hidden feature gates in the open product

The intended open/self-hosted product must not intentionally disable core software capabilities solely to force a commercial upgrade. Managed cloud, support, SLA, managed delivery, hosted identity/trust integrations and operational services may be commercial products.

## XIII. Security boundaries are explicit

Untrusted documents, parsers/renderers, heavy converters, signing keys, native capabilities, external identity providers and outbound delivery systems are separate trust boundaries.

Least privilege, resource limits, secret isolation, safe parsing and fail-closed behavior are required design inputs.

## XIV. No implementation before Foundation 000 closes

Until Specification 000 is canonically complete, Signthos may contain research, governance, architecture, fixtures and non-product scaffolding only. Upstream application source import and production feature implementation are prohibited.
