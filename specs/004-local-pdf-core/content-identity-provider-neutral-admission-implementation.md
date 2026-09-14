# Content Identity Provider-Neutral Admission Implementation

Status: `IMPLEMENTATION_CANDIDATE / BOUNDED_PROVIDER_NEUTRAL_ONLY`
Issue: #7
Primary authority: `github:issue-comment:5660064092`
Execution-control repair authority: `github:issue-comment:5660145374`
Canonical base: `55f2c9fbabfc2f99ea31adc9d0a85bb6789289ff`
Canonical base tree: `2ea51e8f48420b2bab5161ffbfb780ff5b1fdda7`

## 1. Purpose

This candidate implements the already-canonical provider-neutral Content Identity and Admission semantic boundary without selecting or executing a PDF provider, classifier, deterministic signature rule, dependency, or network service.

It consumes canonical 004C1R semantics, the canonical classifier-provenance qualification, the adversarial admission fixture qualification, and the Signthos-authored synthetic fixture seed. It does not reopen those decisions.

## 2. Authorized surface

```text
ALLOWED_PATH_1 = packages/providers/package.json
ALLOWED_PATH_2 = packages/providers/src/content-identity-admission.js
ALLOWED_PATH_3 = packages/providers/test/content-identity-admission.test.js
ALLOWED_PATH_4 = specs/004-local-pdf-core/content-identity-provider-neutral-admission-implementation.md
MAX_CHANGED_FILES = 4
```

No root package, workspace, lockfile, fixture, provenance, workflow, container, database, or unrelated source path is changed.

## 3. Implementation boundary

The module provides provider-neutral semantics only:

- exact SHA-256 plus byte-length observation of supplied bytes;
- explicit canonical-revision or derived-artifact source binding;
- re-hash comparison between supplied bytes and the pre-existing input binding;
- declared identity retained separately as untrusted metadata;
- deterministic, classifier, structural, and conflict evidence validation;
- exact digest-and-length binding for every nested evidence producer;
- classifier evidence treated as optional advisory evidence;
- structural state/result contradiction rejection;
- evidence completeness calculation;
- explicit conflict preservation with independent disposition impact;
- fail-closed identity-drift behavior;
- publication of a disposition only when operation state permits one;
- read-only handling of the input buffer.

The implementation does not parse or render PDF bytes. Structural and classifier evidence used by tests is injected as test-double evidence only.

## 4. Input binding

`createContentInputBinding(bytes, source)` computes the exact byte identity and binds it to exactly one source class:

```text
CANONICAL_DOCUMENT_REVISION
  -> documentId required
  -> inputRevisionId required

DERIVED_ARTIFACT
  -> derivedArtifactRef required
  -> parentOperationRef required
```

The evaluator receives both the bytes and an already-created input binding. It re-hashes the bytes and compares digest algorithm, digest value, and byte length before reconciling any evidence.

A stale binding applied to replacement bytes produces:

```text
operationStatus = FAILED
evidenceCompleteness = INPUT_IDENTITY_INVALIDATED
failureClass = PDF_INPUT_IDENTITY_CHANGED_DURING_ADMISSION
admissionDisposition = ABSENT
```

This prevents the implementation from defeating TOCTOU/substitution tests by always constructing a new binding from the bytes being evaluated.

## 5. Bounded policy input

Every evaluation requires an explicit policy identity and the narrow behavior flags supported by this unit:

```text
policyId
policyVersion
structuralEvidenceRequired = true
classifierRequired = false
deterministicObservationsRequired = false
structuralRejectionDisposition = NOT_PDF | UNSUPPORTED_OR_UNCERTAIN
```

This is not a production policy selection. The unit-test policy identity is a test double only. The module refuses policy inputs that require a classifier or deterministic observation because no classifier runtime or deterministic rule is authorized by this unit.

`structuralRejectionDisposition` is explicit because canonical 004C1R allows `NOT_PDF` only when the exact admission policy treats the available positive rejection evidence as sufficient. The evaluator therefore does not hide that decision as an implementation default.

## 6. Evidence validation

Every supplied deterministic observation, classifier result, structural result, and conflict record must carry the same exact SHA-256 digest and byte length as the evaluated bytes.

Malformed evidence shape fails with no disposition. Evidence bound to different bytes invalidates the evaluation.

Structural evidence obeys the canonical state/result invariant:

```text
STRUCTURAL_INSPECTION_COMPLETE
  -> exactly one valid structuralIdentityResult required

any other structural state
  -> structuralIdentityResult forbidden
```

The provider-neutral implementation accepts only canonical structural result values:

```text
PDF_STRUCTURE_ACCEPTED
PDF_STRUCTURE_REJECTED
PDF_STRUCTURE_UNSUPPORTED_OR_UNCERTAIN
```

## 7. Conflict preservation and disposition impact

Conflict records preserve the canonical conflict class and add an explicit implementation-level `dispositionImpact` so that evidence disagreement is not collapsed into one generic outcome.

Supported impacts are:

```text
NONE
AMBIGUOUS_CONTENT_IDENTITY
INPUT_IDENTITY_INVALIDATED
```

`NONE` preserves evidence such as declared-metadata mismatch without automatically blocking an otherwise valid structural admission.

`AMBIGUOUS_CONTENT_IDENTITY` marks an unresolved material same-byte identity conflict, including a qualified top-level mixed/polyglot indication.

`INPUT_IDENTITY_INVALIDATED` is restricted to identity-change classes and terminates the evaluation without a disposition.

This distinction fixes the quarantined pre-repair draft behavior that treated every conflict as automatic ambiguity.

## 8. Operation status and disposition publication

Non-publishable operation outcomes do not carry `admissionDisposition`.

The implementation explicitly covers:

```text
PROVIDER_UNAVAILABLE
FAILED
INPUT_REJECTED
UNSUPPORTED
RESOURCE_LIMIT_EXCEEDED
DEADLINE_EXCEEDED
CANCELLED
```

A completed structural evaluation may publish:

```text
PDF_STRUCTURE_ACCEPTED
  -> CONFIRMED_PDF when no material ambiguity remains

PDF_STRUCTURE_REJECTED
  -> exact policy structuralRejectionDisposition

PDF_STRUCTURE_UNSUPPORTED_OR_UNCERTAIN
  -> UNSUPPORTED_OR_UNCERTAIN
```

A completed evaluation with unresolved material conflict publishes `AMBIGUOUS_CONTENT_IDENTITY` with `CONFLICTING_REQUIRED_EVIDENCE`.

Classifier labels never directly determine admission disposition.

## 9. Fail-closed malformed-input behavior

The evaluator does not silently normalize malformed evidence containers to absence.

Examples that fail as invalid evidence include:

- non-array `deterministicObservations`;
- non-array `conflicts`;
- non-object declared identity when supplied;
- non-object classifier evidence when supplied;
- non-object structural evidence when supplied;
- missing nested digest/length binding;
- invalid deterministic result values;
- invalid classifier states;
- contradictory structural state/result combinations;
- contradictory identity-conflict disposition impact.

## 10. Runtime and dependency boundaries

The runtime module imports only:

```text
node:crypto
```

No third-party package is imported by the implementation.

```text
NETWORK_IO = NONE
PACKAGE_INSTALLATION = NONE
DEPENDENCY_ACQUISITION = NONE
CLASSIFIER_EXECUTION = NONE
PDF_PROVIDER_EXECUTION = NONE
PDF_PARSE_OR_RENDER = NONE
DETERMINISTIC_RULE_SELECTION = NONE
FIXTURE_MUTATION = NONE
DOCUMENT_REVISION_MUTATION = NONE
```

## 11. Exact candidate file identities

```text
packages/providers/package.json
SHA256 = d0d54a230580a44b84163c31aa0c3199b899c74035242180bd97fcfc92dea85f

packages/providers/src/content-identity-admission.js
SHA256 = af9cefdfdc4e81aa0619101d938cfd9fa237e5364b67ab821632b26506f0c965

packages/providers/test/content-identity-admission.test.js
SHA256 = 04cc60f1abac62b6aae41dd9a1675897e56d8d478af2d0362eb49525178b27cc
```

Canonical fixture manifest remains unchanged:

```text
specs/004-local-pdf-core/fixtures/admission/manifest.json
SHA256 = 34cddff9550b46c011a10a0e474af2f0701d7b4cb1961e4692ae5ceff1e5a841
```

Canonical repository controls remain unchanged:

```text
package.json
SHA256 = 71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183

pnpm-workspace.yaml
SHA256 = 695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f

pnpm-lock.yaml
SHA256 = ee29f5f0f4d1b1b98fbd615de64589a7a5b6a92bee368f4ef8a07255a989479e
```

## 12. Execution-control lineage

Before execution-control repair authority was issued, two syntax-only Node checks were run accidentally outside the original command allowlist. They exited zero and crossed no dependency/provider/network/canonical-mutation boundary. The deviation is preserved in Issue #7 comment `5660145374` and is not counted as qualification evidence.

After that explicit forward-only reauthorization, the exact authorized commands were executed fresh:

```text
node --check packages/providers/src/content-identity-admission.js
node --check packages/providers/test/content-identity-admission.test.js
node --test packages/providers/test/content-identity-admission.test.js
```

Both fresh syntax checks passed.

Fresh test result:

```text
TOP_LEVEL_SUBTESTS = 31
NODE_TEST_COUNT = 44
PASS = 44
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
```

The test suite reads only the already-canonical Signthos-authored fixture manifest and four exact fixture files. It does not execute a parser or classifier.

## 13. Covered regression boundaries

The test suite covers at least:

- exact fixture digest and byte-length preservation;
- canonical-revision source-binding validation;
- derived-artifact source-binding validation;
- structural acceptance before confirmation;
- explicit policy control over structural rejection disposition;
- input-rejected outcome with no disposition;
- classifier `pdf` label unable to bypass missing structural evidence;
- classifier/structural disagreement in either direction requiring explicit `CLASSIFIER_VS_STRUCTURAL_MISMATCH` reconciliation before any disposition publishes;
- advisory classifier disagreement with `dispositionImpact = NONE` preserving the structural result without granting classifier authority;
- classifier disagreement with `dispositionImpact = AMBIGUOUS_CONTENT_IDENTITY` remaining explicit ambiguity;
- false classifier/structural mismatch records rejected when the signals agree;
- `CLASSIFIER_RESULT_AVAILABLE` rejected when no explicit classifier label is present;
- non-material declared-metadata conflict preservation;
- material mixed-content ambiguity;
- explicit rejection of `POLYGLOT_OR_MIXED_CONTENT_INDICATOR` when its disposition impact is `NONE`;
- explicit input-identity-change invalidation;
- stale input binding against replacement bytes;
- evidence bound to different bytes;
- missing nested evidence binding;
- structural complete/result contradiction handling;
- invalid classifier state handling;
- invalid deterministic observation result handling;
- completed structural uncertainty;
- all bounded non-publishable structural states;
- unsupported policy requirement rejection;
- read-only input-byte preservation;
- malformed top-level evidence-container rejection.

CodeRabbit review thread `PRRT_kwDOUMBFqc6iBCXC` / comment `4002877313` identified that `POLYGLOT_OR_MIXED_CONTENT_INDICATOR` could previously declare `dispositionImpact = NONE` and therefore evade the ambiguity gate. The candidate was repaired forward-only: that conflict class now requires `AMBIGUOUS_CONTENT_IDENTITY`, and a dedicated regression test proves `NONE` fails evidence validation and publishes no admission disposition.

A later fresh CodeRabbit review of exact head `9ab3a13b6289055be9eb80ea799b32fe746f8c7d` identified that completed classifier/structural disagreement could still be silently discarded. The forward-only repair authorized by Issue #7 comment `5660671269` now requires exactly one explicit `CLASSIFIER_VS_STRUCTURAL_MISMATCH` record whenever an available classifier label disagrees with a determinate completed structural result. Missing reconciliation fails closed with `PDF_ADMISSION_EVIDENCE_CONFLICT`; a mismatch record with no actual disagreement is invalid evidence. The classifier remains advisory: a valid mismatch record with `dispositionImpact = NONE` preserves the structural disposition, while `AMBIGUOUS_CONTENT_IDENTITY` preserves the disagreement as admission ambiguity.

## 14. Non-grants

```text
GENERAL_004C_INSPECT_RENDER_SEARCH_RUNTIME = NOT_AUTHORIZED
PDF_PROVIDER_SOURCE_IMPLEMENTATION = NOT_AUTHORIZED
PDF_PROVIDER_EXECUTION = NOT_AUTHORIZED
CLASSIFIER_SELECTION = NOT_AUTHORIZED
CLASSIFIER_PACKAGE_OR_MODEL_ADOPTION = NOT_AUTHORIZED
CLASSIFIER_EXECUTION = NOT_AUTHORIZED
DETERMINISTIC_RULE_SELECTION = NOT_AUTHORIZED
DEPENDENCY_ACQUISITION = NOT_AUTHORIZED
DEPENDENCY_INSTALLATION = NOT_AUTHORIZED
NETWORK_EXECUTION = NOT_AUTHORIZED
ROOT_PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_MUTATION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
FIXTURE_BYTES_MUTATION = NOT_AUTHORIZED
FIXTURE_MANIFEST_MUTATION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 15. Qualification gate

This candidate may become canonical only after all of the following remain true:

1. exact canonical base remains `55f2c9fbabfc2f99ea31adc9d0a85bb6789289ff`;
2. final surface is no more than the four authorized paths;
3. root package/workspace/lockfile and canonical fixture bytes remain unchanged;
4. only the explicitly authorized Node commands are used as qualification execution;
5. the fresh test run remains fully passing;
6. `git diff --check` passes;
7. fresh independent substantive exact-head review reports no material findings;
8. every material finding is repaired forward-only and any changed head receives fresh review;
9. unresolved material review threads are zero;
10. immediate premerge race proof confirms unchanged base/head/tree/scope/authority and current mergeability;
11. guarded normal merge uses the exact reviewed head SHA;
12. post-merge verification proves canonical main, ordered parents, reviewed-head/merge-tree equality, valid signature, exact surface, and truthful workflow/status accounting;
13. Issue #7 performs a fresh successor reconciliation before any runtime/provider successor is inferred.
