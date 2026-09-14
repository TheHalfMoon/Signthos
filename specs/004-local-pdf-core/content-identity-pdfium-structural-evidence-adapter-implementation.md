# PDFium Structural-Evidence Adapter Implementation

Authority: `github:issue-comment:5670724463`

## 1. Purpose

This unit implements the smallest source-level adapter between the already-qualified local PDFium structural observations and the canonical provider-neutral content-identity admission evidence contract.

The adapter is pure mapping logic. It does not import or initialize PDFium, execute WASM, parse a PDF, render, search, extract text, install dependencies, or perform network I/O.

```text
UNIT = CONTENT_IDENTITY_PDFIUM_STRUCTURAL_EVIDENCE_ADAPTER_IMPLEMENTATION
CANONICAL_BASE = 5031c351d4617c0924899c67396cf15a93aae5d6
CANONICAL_BASE_TREE = c05cc8c362bb30306256ed022c56e1b6e25aba04
AUTHORITY = github:issue-comment:5670724463
MAX_CHANGED_REPOSITORY_FILES = 4
```

## 2. Authorized repository surface

The candidate is limited to:

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdfium-structural-evidence.js
packages/providers/test/pdfium-structural-evidence.test.js
specs/004-local-pdf-core/content-identity-pdfium-structural-evidence-adapter-implementation.md
```

`packages/providers/package.json` changes only the existing `test` script so it includes both the canonical admission tests and the new adapter tests. No dependency, peer dependency, optional dependency, development dependency, package identity, version, module type, or workspace declaration is added or changed.

## 3. Canonical predecessor contracts

The adapter consumes, without reopening:

- canonical 004C1R content-identity/admission semantics;
- canonical provider-neutral admission implementation;
- canonical synthetic admission fixture seed;
- canonical local PDFium structural runtime harness;
- canonical first local PDFium structural runtime execution qualification.

The runtime qualification established the exact conservative semantic mapping:

```text
openSucceeded = true
  => STRUCTURAL_INSPECTION_COMPLETE
  => PDF_STRUCTURE_ACCEPTED

openSucceeded = false AND FPDF_GetLastError() = 3
  => STRUCTURAL_INSPECTION_INPUT_REJECTED
  => structuralIdentityResult = ABSENT
```

It also proved that PDFium error `3` is `FPDF_ERR_FORMAT`, meaning `File not in PDF format or corrupted`, and therefore does not distinguish a top-level non-PDF input from a malformed/corrupted PDF candidate.

## 4. Exact provider identity

The adapter is fixed to the exact already-qualified provider identity:

```text
providerId = @embedpdf/pdfium
providerVersion = 2.15.0
packageIdentity = @embedpdf/pdfium@2.15.0
providerCapabilityVersion = signthos.pdfium.structural-open.v1
EmbedPDF source commit = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
PDFium submodule revision = cb29e78f2ba00c9298714d5f4a8bf7765f1e802f
published WASM SHA256 = c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8
```

No moving version, alternate package, alternate PDFium binary, or inferred provider identity is accepted by this unit.

## 5. Exact input binding

`mapPdfiumStructuralObservation(bytes, rawObservation)` requires `bytes` to be a Node `Buffer` and derives its evidence binding through the already-canonical `exactByteIdentity()` implementation.

Every emitted structural evidence object therefore carries:

```text
inputExactBytesDigest.algorithm = sha256
inputExactBytesDigest.value = SHA256(exact supplied bytes)
byteLength = exact supplied byte length
```

The adapter does not accept a caller-supplied digest or length as authority and therefore cannot silently bind a mapping result to a caller-invented byte identity.

## 6. Successful-open mapping

The only qualified successful-open shape is:

```text
openSucceeded = true
pageCount = nonnegative safe integer
pdfiumLastError = ABSENT
```

It maps to:

```text
state = STRUCTURAL_INSPECTION_COMPLETE
structuralIdentityResult = PDF_STRUCTURE_ACCEPTED
providerObservation.openSucceeded = true
providerObservation.pageCount = exact raw pageCount
```

`pageCount` is preserved as raw provider evidence. It is not converted into document safety, signature, conformance, or non-polyglot evidence.

A successful-open record is rejected if `pageCount` is absent, negative, fractional, unsafe as an integer, or accompanied by `pdfiumLastError`.

## 7. Format-error mapping

The only qualified failed-open shape is:

```text
openSucceeded = false
pdfiumLastError = 3
pageCount = ABSENT
```

It maps to:

```text
state = STRUCTURAL_INSPECTION_INPUT_REJECTED
structuralIdentityResult = ABSENT
providerObservation.openSucceeded = false
providerObservation.pdfiumLastError = 3
providerObservation.pdfiumErrorConstant = FPDF_ERR_FORMAT
providerObservation.pdfiumErrorMeaning = File not in PDF format or corrupted
```

The adapter does not map this provider input rejection to `PDF_STRUCTURE_REJECTED` or `NOT_PDF`.

All other PDFium error codes are unqualified by this unit and fail closed rather than being guessed into canonical evidence.

## 8. Contradiction and malformed-input handling

The mapper throws before publishing evidence for raw shapes including:

- any raw observation whose prototype is neither `Object.prototype` nor `null`;
- missing, inherited, or non-boolean `openSucceeded`;
- successful open without an own valid nonnegative integer `pageCount`;
- successful open carrying an own or inherited `pdfiumLastError`;
- failed open carrying an own or inherited `pageCount`;
- failed open missing an own `pdfiumLastError`;
- failed open with any PDFium error code other than `3`;
- non-Buffer input bytes;
- non-object raw observation input.

The standard-prototype restriction plus own-field requirements prevent custom prototype chains from supplying required fields or hiding contradictory forbidden fields. A null-prototype record remains valid only when every required field is present as an own property.

This fail-closed behavior prevents an unqualified raw provider state from being normalized into authoritative provider-neutral structural evidence.

## 9. Admission composition boundary

The emitted evidence shape is intentionally compatible with the canonical provider-neutral admission evaluator.

A mapped accepted observation may participate in a later admission evaluation as:

```text
STRUCTURAL_INSPECTION_COMPLETE + PDF_STRUCTURE_ACCEPTED
```

The canonical admission evaluator, not this adapter, decides whether all policy-required evidence is complete enough to publish `CONFIRMED_PDF`.

A mapped format/input rejection composes as:

```text
STRUCTURAL_INSPECTION_INPUT_REJECTED
operationStatus = INPUT_REJECTED
admissionDisposition = ABSENT
```

The adapter itself never publishes an admission disposition.

## 10. Polyglot and mixed-content boundary

The canonical trailing-inert fixture is structurally accepted by the qualified PDFium runtime, but that acceptance does not prove top-level non-polyglot status.

The regression suite proves that mapped accepted evidence remains compatible with an explicit canonical conflict:

```text
POLYGLOT_OR_MIXED_CONTENT_INDICATOR
  + dispositionImpact = AMBIGUOUS_CONTENT_IDENTITY
  => admissionDisposition = AMBIGUOUS_CONTENT_IDENTITY
```

Therefore parser acceptance cannot erase later independently qualified mixed-content or polyglot evidence.

## 11. Mutation boundary

The implementation creates new frozen evidence objects and does not mutate:

- the supplied input `Buffer`;
- the supplied raw observation object;
- canonical fixture bytes;
- provider-neutral admission state;
- package dependencies or lockfile state.

The tests explicitly compare input bytes and raw observation serialization before and after mapping.

## 12. Validation toolchain provenance

The host default Node and previously installed Node 24 variants were not accepted as qualification evidence because they were not the canonical project engine `24.20.0`.

Under the explicit toolchain authority in `github:issue-comment:5670724463`, the exact official macOS arm64 Node archive was acquired outside Git from `nodejs.org` only after binding the official `SHASUMS256.txt` value.

```text
artifact = node-v24.20.0-darwin-arm64.tar.gz
official source = https://nodejs.org/dist/v24.20.0/
SHASUMS256.txt SHA256 = c614a913a302d35d1c3a1348d07d84c52e28dceb0b97fd91e4ade05906ca2bd7
archive SHA256 = 40e5607e5ecb3db9192723776da2d75d966260fc74a7a9e731c1bd67dda96bc8
archive bytes = 52813331
extracted bin/node SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
extracted bin/node bytes = 121911744
node --version = v24.20.0
TLS verification = true
proxy bypass = direct-origin-only
qualification record SHA256 = 18fe06392700a2026bce899f949a18e09ca6d0817b487a650071f1019640a39b
```

No npm, pnpm, Corepack, registry, dependency installation, or repository mutation was part of toolchain acquisition.

## 13. Preserved first validation failure

The first authorized exact-Node validation sequence stopped before commit/push/PR creation because the newly authored adapter file accidentally began with a literal backslash.

```text
CHECK_ADMISSION_RC = 0
CHECK_ADAPTER_RC = 1
CHECK_ADAPTER_FAILURE = SyntaxError: Invalid or unexpected token at line 1
CHECK_ADAPTER_STDERR_SHA256 = 8fbf70c6710fdd4538653304f524387257d0b15876157d05be2137eaaefa03c7
COMMIT_CREATED = NO
PUSH_PERFORMED = NO
PR_CREATED = NO
PDFIUM_RUNTIME_EXECUTION = NO
```

The failure is preserved by `github:issue-comment:5670834631`. The authoring artifact was removed forward-only from the two newly authored source/test files before fresh validation.

The failed sequence is not qualification evidence.

## 14. Initial exact-Node qualification result before independent review

After the forward-only source repair, the exact authorized validation commands were executed fresh using only the verified Node `v24.20.0` executable:

```text
node --check packages/providers/src/content-identity-admission.js = PASS / RC 0
node --check packages/providers/src/pdf/browser/pdfium-structural-evidence.js = PASS / RC 0
node --check packages/providers/test/content-identity-admission.test.js = PASS / RC 0
node --check packages/providers/test/pdfium-structural-evidence.test.js = PASS / RC 0
node --test packages/providers/test/content-identity-admission.test.js packages/providers/test/pdfium-structural-evidence.test.js = PASS / RC 0
```

Combined Node test result:

```text
TESTS = 58
PASS = 58
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
TEST_STDOUT_SHA256 = f713072b8f2d882d381908b6669a5cf9fa64713f04d5cb3c99fb47bf1b333501
TEST_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

After all five Node commands completed and their individual return codes/output were frozen, the host zsh wrapper encountered a terminal aggregation defect because `status` is a reserved read-only variable. No Node command was rerun to hide that wrapper error.

A separate host-only read-only post-validator inspected the already-frozen command evidence without executing Node again:

```text
POST_VALIDATOR_RESULT = PASS
ALL_AUTHORIZED_NODE_COMMANDS_PASSED = true
NODE_RERUN_FOR_POST_VALIDATION = false
POST_VALIDATOR_SHA256 = b7db1dd436813b4496246869960a0dda6751cf25a0f5c8293f7a23382e4a4712
EVIDENCE_MANIFEST_ENTRIES = 18
EVIDENCE_MANIFEST_SHA256 = 236cb6b568be01725853aaf56a70b112598cb2c9ec482394927d1ec599266b62
```

The wrapper defect and post-validation result are preserved by `github:issue-comment:5670856131`.

## 15. Independent review finding, concurrent repair, and fresh validation

Fresh CodeRabbit review `github:issue-comment:5670906469` was bound to exact candidate head `8d1f597aef0055fdf24242a1fd8ae22fbbbe5bcb` and tree `6eb120de30041620a53a4700607c470e24810f74`. It reported one material fail-closed defect: custom-prototype raw observation objects could supply required fields through inheritance or hide contradictory inherited fields from own-property checks.

The finding was accepted under `github:issue-comment:5670916641`. During the forward-only repair, a same-unit writer advanced the shared PR branch independently. The shared repair was preserved and adopted rather than overwritten:

```text
SHARED_REPAIR_HEAD = 8d99a540d23fb7ca96175880771e905ead8db51e
SHARED_REPAIR_TREE = ddb1c8243355783eade3eb35585edc3fa52c8f3b
SHARED_REPAIR_PARENT = 8d1f597aef0055fdf24242a1fd8ae22fbbbe5bcb
SHARED_REPAIR_RECORD = github:issue-comment:5670941351
CONCURRENCY_RECONCILIATION = github:issue-comment:5671041039
FORCE_PUSH = NOT_USED
REBASE = NOT_USED
HISTORY_REWRITE = NOT_USED
```

The shared repair:

- restricts accepted raw observations to objects whose prototype is exactly `Object.prototype` or `null`;
- requires `openSucceeded` to be an own boolean field;
- requires successful `pageCount` to be an own nonnegative safe integer;
- rejects successful observations carrying an inherited or own `pdfiumLastError`;
- rejects failed observations carrying an inherited or own `pageCount`;
- requires failed `pdfiumLastError` to be an own field equal to `3`;
- adds regressions for inherited forbidden/required fields and valid null-prototype observations.

A fresh complete exact-Node validation sequence was executed independently on the exact shared repair bytes at `8d99a540...`:

```text
VALIDATION_NODE_VERSION = v24.20.0
VALIDATION_NODE_SHA256 = 9d050fd455b56426e25d4d603c7c501cbb2630348e836cf221dcce748e90588a
CHECK_ADMISSION_RC = 0
CHECK_ADAPTER_RC = 0
CHECK_ADMISSION_TEST_RC = 0
CHECK_ADAPTER_TEST_RC = 0
TEST_ALL_RC = 0
TESTS = 60
PASS = 60
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
TEST_STDOUT_SHA256 = e1fbf9810e8be783770c5ddabb0a8623fb3b5b9f78504968e042e64150e6f64a
TEST_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
VALIDATION_SUMMARY_SHA256 = 3b9805d64b879cee3b191e2b1265d007403597cadca13d29226f9e63e9ffb13e
EVIDENCE_MANIFEST_ENTRIES = 18
EVIDENCE_MANIFEST_SHA256 = 8370c69e403bcabca9307d77f415d152bb53fa13bff6be7eaa6fb216d50fe4d6
```

No PDFium/WASM, Docker, package-manager, dependency-installation, or additional network execution occurred during the review repair or reconciliation validation. The review of `8d1f597...` is stale for merge qualification; the final documentation-synchronized head requires a fresh independent substantive exact-head review.

## 16. Final candidate file identities after inherited-field repair

```text
packages/providers/package.json
SHA256 = 42e34bd4f7b4aa0a045a49c4538ffec79eaff28bc136e42adddc486ee2e47b80

packages/providers/src/pdf/browser/pdfium-structural-evidence.js
SHA256 = 64c377b979c9887bdaf85731196f9703a9cbbe51aeec6c2442e149c5e345824f

packages/providers/test/pdfium-structural-evidence.test.js
SHA256 = a2d293493609dbb9b2e67e7e6e4503260c35b931be1682a248a9e14f7f6d1a73
```

The canonical provider-neutral implementation remains unchanged:

```text
packages/providers/src/content-identity-admission.js
SHA256 = af9cefdfdc4e81aa0619101d938cfd9fa237e5364b67ab821632b26506f0c965
```

## 17. Regression coverage

The fresh combined suite proves at minimum:

- both qualified PDFium successful fixture observations map to complete accepted structural evidence;
- both qualified `FPDF_ERR_FORMAT(3)` fixture observations map to input rejection with no structural identity result;
- exact provider/version/source/submodule/WASM/capability evidence is published;
- unknown PDFium error codes fail closed;
- contradictory and incomplete raw observation shapes fail closed;
- custom-prototype observations with inherited required or forbidden fields fail closed;
- null-prototype observations are accepted only when required fields are valid own properties;
- emitted digest and length equal exact fixture bytes;
- mapped accepted evidence composes with canonical provider-neutral admission;
- mapped input rejection publishes no admission disposition;
- trailing-inert structural acceptance remains compatible with explicit polyglot ambiguity;
- input bytes and raw observation objects remain unchanged;
- non-Buffer and non-object inputs fail closed;
- all four fixture mappings independently match canonical exact-byte identity computation.

## 18. Explicit non-grants

```text
PDFIUM_IMPORT_OR_INITIALIZATION = NOT_AUTHORIZED
PDFIUM_WASM_EXECUTION = NOT_AUTHORIZED
SECOND_STRUCTURAL_RUNTIME_ATTEMPT = NOT_AUTHORIZED
DOCKER_EXECUTION = NOT_AUTHORIZED
NPM_EXECUTION = NOT_AUTHORIZED
PNPM_EXECUTION = NOT_AUTHORIZED
COREPACK_EXECUTION = NOT_AUTHORIZED
DEPENDENCY_INSTALLATION = NOT_AUTHORIZED
DEPENDENCY_DECLARATION_MUTATION = NOT_AUTHORIZED
ROOT_PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_MUTATION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
FIXTURE_MUTATION = NOT_AUTHORIZED
PROVENANCE_NOTICE_SBOM_MUTATION = NOT_AUTHORIZED
GENERAL_INSPECT_RENDER_SEARCH_RUNTIME = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

No statement in this unit grants provider execution merely because provider observations can now be mapped.

## 19. Canonicalization gate

This candidate may become canonical only if all of the following remain true:

1. canonical base remains `5031c351d4617c0924899c67396cf15a93aae5d6`;
2. the base-to-head diff changes only the four authorized repository paths;
3. no dependency declaration is added or changed;
4. the exact verified Node validation evidence remains bound to the candidate bytes;
5. `git diff --check` passes;
6. fresh independent substantive exact-head review reports no material findings;
7. every material review finding is repaired forward-only and any changed head receives fresh review;
8. unresolved material review threads are zero;
9. immediate premerge race proof confirms unchanged base/head/tree/scope/authority and mergeability;
10. guarded normal merge uses the exact reviewed head SHA;
11. post-merge verification proves ordered parents, merge-tree equality, valid GitHub signature, exact changed surface, and truthful workflow/status accounting;
12. Issue #7 performs a fresh successor reconciliation before any broader provider/runtime/004D authority is inferred.

```text
IMPLEMENTATION_RESULT = CANDIDATE_PASS_AWAITING_INDEPENDENT_EXACT_HEAD_REVIEW
PROJECT_COMPLETION = NOT_ESTABLISHED
```
