# Specification 004 — Source-Informed Security Plan Amendment

Status: `FINAL_QUALIFICATION_CANDIDATE / PLANNING_SECURITY_AMENDMENT_ONLY / ZERO_SOURCE_IMPORT`
Issue: #7
Final reconstruction authority: `github:issue-comment:5576200788`
Predecessor finalization authority: `github:issue-comment:5576162442`
Founder source directive: `github:issue-comment:5575823691`
Deep research record: `github:issue-comment:5575892327`
Canonical predecessor: 004C1Q PR #122 / merge `a347ced6ef2ff09f96c0ed01bcef4dc5758414e1`
Exact reconstruction base: `a347ced6ef2ff09f96c0ed01bcef4dc5758414e1`

## 1. Purpose

This amendment strengthens the Specification 004 Local PDF Core plan using five Founder-supplied security sources without importing donor source code, adopting a dependency, executing a scanner, acquiring a model, or changing runtime behavior.

The central architectural correction is:

> Untrusted bytes require an explicit content-identity and admission boundary before general PDF capability execution.

The source set is intentionally treated as five different evidence inputs rather than one security platform:

- `google/magika` — probabilistic content-identity candidate;
- `Tencent/AI-Infra-Guard` — AI/Agent/MCP/Skill security methods and selective-component candidate;
- `Tencent/AICGSecEval` — repository-level AI-generated-code security evaluation methodology;
- `Tencent/secguide` — secure-coding reference input;
- `Tencent/TscanCode` — historical static-analysis reference or isolated tooling candidate.

This amendment changes planning order and evidence requirements only.

## 2. Canonical boundary

This candidate is reconstructed directly from the exact post-004C1Q canonical `main`.

```text
CANONICAL_BASE = a347ced6ef2ff09f96c0ed01bcef4dc5758414e1
004C1Q_STATUS = CLOSED_CANONICAL
ROOT_PACKAGE_JSON = PRESENT_CANONICAL_004C1P
ROOT_PNPM_WORKSPACE_YAML = ABSENT
ROOT_PNPM_LOCK_YAML = ABSENT
ROOT_NPMRC = PRESENT_UNCHANGED
SOURCE_IMPORT = NONE
DEPENDENCY_ACQUISITION = NONE
RESOLVER_EXECUTION = NONE
PROVIDER_PDF_RUNTIME = NONE
```

This amendment may become canonical only after fresh exact-base/exact-head qualification, independent substantive exact-head review, zero unresolved material review threads, immediate premerge race proof, guarded normal merge with exact `expected_head_sha`, and mechanical post-merge verification.

## 3. Source research register

These are research snapshots, not future adoption pins. Every later import or dependency qualification must revalidate the then-current exact source identity, exact intended paths, and exact distribution obligations.

### 3.1 Google Magika

```text
REPOSITORY = https://github.com/google/magika
RESEARCH_REVISION = 26b6a9ba7e92f2b0a3745970a9190ec0dde9bf83
RESEARCH_TREE = 641a57cb590b66a0dd4f296b16dd04548da96271
ROOT_LICENSE = Apache-2.0
DISPOSITION = HIGH_PRIORITY_SELECTIVE_ADOPTION_CANDIDATE
PRIMARY_ROLE = PROBABILISTIC_CONTENT_IDENTITY_SIGNAL
REVIEWED_MODEL_PATH = assets/models/standard_v3_3/model.onnx
REVIEWED_MODEL_GIT_BLOB = e669a1120903d93417f57a1aedd1bc0000819b8b
REVIEWED_MODEL_SIZE_BYTES = 3163737
```

Planning interpretation:

- content classification is useful evidence but not structural PDF validity;
- model output and final tool output can differ because confidence/fallback policy matters;
- model/config/runtime identity is supply-chain evidence;
- no hidden runtime model download is acceptable for local-first behavior;
- Magika must never be the sole PDF admission authority.

Magika does not, by classification alone, prove malware absence, sanitization, active-content absence, polyglot absence, signature validity, certificate trust, or safe downstream execution.

### 3.2 Tencent AI-Infra-Guard

```text
REPOSITORY = https://github.com/Tencent/AI-Infra-Guard
RESEARCH_REVISION = e4e622af3ad2b8228ce82dd62b01415dd8ce2b9c
RESEARCH_TREE = 19aca1c5f39358e59c80b0e4f282d69b048134d3
ROOT_LICENSE = Apache-2.0
ROOT_NOTICE = ATTRIBUTION_REQUIRED
DISPOSITION = METHOD_AND_SELECTIVE_COMPONENT_CANDIDATE
PRIMARY_ROLE = AI_AGENT_MCP_SKILL_SECURITY
```

High-value concepts include:

- prompt/context injection;
- memory poisoning;
- tool poisoning;
- tool shadowing and name confusion;
- privilege/scope creep;
- credential exfiltration;
- command injection;
- dependency/supply-chain risk;
- Skill intent-versus-implementation consistency;
- static pre-scan before more capable agent execution;
- SARIF 2.1.0 result transport;
- multi-stage audit/review/red-team patterns.

The reviewed root NOTICE requires visible attribution for integrations or derivative redistribution. Path-level licensing remains mandatory: a nested README label is not sufficient proof of the exact license for copied paths when a matching nested license artifact is absent.

### 3.3 Tencent AICGSecEval

```text
REPOSITORY = https://github.com/Tencent/AICGSecEval
RESEARCH_REVISION = 94428ebf45141bf4ecd365a51d596dcd51caa690
RESEARCH_TREE = 1789b060d079a49a436a9affb6237e6c39b9bd9d
ROOT_LICENSE = Apache-2.0
DISPOSITION = SECURITY_BENCHMARK_METHOD_CANDIDATE
PRIMARY_ROLE = AI_GENERATED_CODE_SECURITY_EVALUATION
```

Useful methodology:

```text
GENERATED_OR_MODIFIED_CODE
  -> SYNTAX_OR_BUILD_VALIDITY
  -> FUNCTIONAL_BEHAVIOR
  -> STATIC_SECURITY_ANALYSIS
  -> DYNAMIC_SECURITY_OR_POC_ORACLE
  -> CASE_RESULT
```

The methodology may inform Signthos-owned evaluation design. Individual external repositories, CVEs, patches, PoCs, datasets, scripts, and container images remain independent provenance surfaces and must not inherit rights from the root repository by assumption.

### 3.4 Tencent Secure Coding Guide

```text
REPOSITORY = https://github.com/Tencent/secguide
RESEARCH_REVISION = bfda087142e3bb3f5840cbc6af82c1982d1d14e4
RESEARCH_TREE = bff2baab80339c5c1e4b4ecabdc2691f719c41b3
ROOT_LICENSE = CC-BY-SA-4.0
DISPOSITION = REFERENCE_ONLY_BY_DEFAULT
PRIMARY_ROLE = SECURE_CODING_KNOWLEDGE_INPUT
```

Use as a threat-discovery/reference input. Mature Signthos rules should be independently formulated and corroborated against current OWASP, CWE, language/runtime first-party guidance, and the exact Signthos threat model.

### 3.5 Tencent TscanCode

```text
REPOSITORY = https://github.com/Tencent/TscanCode
RESEARCH_REVISION = 3e3b6b66a7e39283d99add581fb9d54ee80c48f5
RESEARCH_TREE = 4bc95504681dab9a8cce040f29756acc8c1dcb8c
ROOT_LICENSE = GPL-3.0
DISPOSITION = REFERENCE_OR_OUT_OF_PROCESS_TOOL_ONLY_BY_DEFAULT
PRIMARY_ROLE = HISTORICAL_STATIC_ANALYSIS_ARCHITECTURE
```

Useful ideas include extensible checks, normalized findings, and false-positive handling. Direct product-core incorporation is not selected. Any later use must compare actively maintained alternatives and explicitly qualify process boundaries and GPL distribution implications.

## 4. Material planning gap

Specification 004 already covers untrusted PDFs, malformed structures, active-content default denial, resource limits, provider isolation, revision semantics, and independent redaction proof.

It still needs a first-class answer to:

> How does Signthos prove that the exact bytes presented to a PDF provider are the same exact bytes classified and inspected, and what happens when declared, deterministic, probabilistic, and structural identity signals disagree?

A filename, extension, caller-supplied MIME type, browser media type, classifier label, or successful parser open is individually insufficient.

The missing boundary is **Content Identity and Admission**.

## 5. Required admission architecture

```text
UNTRUSTED_INPUT_BYTES
  -> IMMUTABLE_DIGEST_AND_SIZE_PREFLIGHT
  -> DECLARED_IDENTITY_CAPTURE
  -> DETERMINISTIC_BYTE_SIGNATURE_OBSERVATIONS
  -> OPTIONAL_PROBABILISTIC_CONTENT_CLASSIFIER
  -> ISOLATED_BOUNDED_PDF_STRUCTURAL_INSPECTION
  -> CONTENT_IDENTITY_RECONCILIATION
  -> ADMISSION_DISPOSITION
  -> GENERAL_004C_CAPABILITY_EXECUTION
```

No stage may silently upgrade an evidence signal into a stronger claim than it proves.

## 6. Evidence-strength rules

Evidence is intentionally non-collapsible.

```text
DECLARED_METADATA != CONTENT_TRUTH
BYTE_SIGNATURE != FULL_STRUCTURAL_VALIDITY
CLASSIFIER_LABEL != PDF_VALIDITY
PARSER_OPEN_SUCCESS != MALWARE_FREE
PARSER_OPEN_SUCCESS != NON_POLYGLOT
SCANNER_NO_FINDINGS != SAFE_FILE
SARIF_PRESENT != SCAN_COMPLETE
SIGNATURE_BYTES_PARSE != CERTIFICATE_TRUST
```

Downstream capability admission must use the minimum evidence set explicitly qualified for that capability.

## 7. Proposed content-identity evidence contract

A later semantic grain should refine a typed contract equivalent to:

```text
ContentIdentityEvidence {
  inputDigest
  byteLength
  originalFileName?
  declaredExtension?
  declaredMediaType?
  sourceChannel?
  deterministicSignatureObservations[]
  classifierProvider?
  classifierVersion?
  classifierPackageIdentity?
  classifierModelIdentity?
  classifierConfigIdentity?
  classifierMode?
  classifierLabel?
  classifierConfidence?
  classifierDisposition?
  isolatedPdfInspectionProvider?
  isolatedPdfInspectionVersion?
  structuralInspectionResult?
  activeContentIndicators[]
  embeddedArtifactIndicators[]
  conflictingIdentitySignals[]
  evidenceCompleteness
  admissionDisposition
}
```

Candidate top-level dispositions:

```text
CONFIRMED_PDF
AMBIGUOUS_CONTENT_IDENTITY
NOT_PDF
UNSUPPORTED_OR_UNCERTAIN
```

The future semantic grain owns exact names and meanings. `CONFIRMED_PDF` may mean only that exact qualified admission policy permits the exact bytes for the claimed PDF capability. It must not imply broader safety, sanitization, trust, or compliance.

## 8. Immutable-byte and TOCTOU contract

Before classification or parsing:

- compute and bind the exact input digest;
- bind exact byte length;
- ensure every admission observation references that identity;
- prevent path-reuse or file-replacement substitution;
- prevent downstream providers from silently reopening mutable paths and inspecting different bytes;
- re-hash or use immutable storage handles where the eventual implementation requires it.

Any digest mismatch is a new input identity, not a warning on the old one.

## 9. Declared identity contract

Preserve caller intent independently:

```text
declaredFileName?
declaredExtension?
declaredMediaType?
sourceChannel?
```

Declared values are untrusted metadata. Mismatch against observed evidence is itself security/audit evidence and must not be silently normalized away.

## 10. Deterministic signature observations

A future implementation may collect bounded deterministic format observations before a full parser runs.

Requirements:

- observations are explicit and reproducible;
- absence/presence semantics are documented;
- no heuristic is marketed as full validity;
- checks remain resource bounded;
- checks do not mutate the input;
- format ambiguity remains representable.

## 11. Probabilistic classifier policy

If Magika or another classifier is later selected, qualification must bind:

- exact package/binary route;
- exact source/package revision;
- exact model bytes and digest;
- exact config bytes and digest;
- classification mode;
- threshold/fallback policy;
- label and confidence semantics;
- local/offline behavior;
- platform availability;
- startup/per-file resource behavior;
- no silent model/config/network fetch;
- deterministic unavailable/error states.

Minimum failure taxonomy candidates:

```text
CLASSIFIER_NOT_CONFIGURED
CLASSIFIER_UNAVAILABLE
CLASSIFIER_EXECUTION_FAILED
CLASSIFIER_UNSUPPORTED_INPUT
CLASSIFIER_LOW_CONFIDENCE
CLASSIFIER_RESULT_AVAILABLE
```

No failure state may silently become `NOT_PDF` or successful admission.

A qualified deterministic provider-only route should remain possible when the classifier is absent, if a later semantic policy explicitly proves that route safe for the claimed capability.

## 12. Structural inspection boundary

A qualified PDF provider must independently inspect structure under explicit:

- file/page/object limits;
- memory/CPU/time budgets;
- cancellation/deadline behavior;
- malformed-input handling;
- encryption/password behavior;
- active-content non-execution;
- no-silent-network behavior;
- provider isolation.

Successful structural open is one evidence component. It is not a universal safety result.

## 13. Polyglot and ambiguity policy

Required rules:

- preserve conflicting identity signals;
- never collapse ambiguity into generic success;
- test safely reproducible appended/mixed-format cases;
- distinguish embedded content from top-level identity;
- reject active interpretation by unrelated runtimes;
- keep provider-specific trust boundaries explicit;
- require a deterministic disposition for conflicting signals.

A classifier returning `pdf` cannot prove non-polyglot status. A PDF parser accepting bytes cannot prove those bytes are harmless to another consumer.

## 14. Derived and embedded artifacts

Any embedded file or extracted attachment becomes a new untrusted derived artifact.

Required evidence candidates:

```text
parentDocumentDigest
embeddedObjectIdentity
extractedArtifactDigest
byteLength
contentIdentityEvidenceRef
extractionProviderIdentity
```

Derived artifacts must not inherit the parent PDF admission state.

Recursion requires explicit budgets:

- maximum aggregate extracted bytes;
- maximum single-artifact size;
- maximum artifact count;
- maximum nested depth;
- CPU/memory/time budget;
- cancellation;
- no automatic execution;
- no automatic network fetch.

## 15. No mutation during admission

Content classification and admission inspection are `READ_ONLY` with respect to the input revision.

Admission must not sanitize, repair, normalize, rewrite, convert, redact, decompress-and-repackage, or otherwise alter the document while claiming to inspect the original revision.

Sanitize, repair, compression, conversion, redaction, and similar operations remain separate `REVISION_CREATING` capabilities with separate authority and evidence.

## 16. Adversarial admission corpus

Before admission implementation qualification, the fixture program should cover, where rights/provenance permit:

- ordinary valid PDFs;
- unusual but valid PDFs;
- truncated PDFs;
- malformed xref/object structures;
- encrypted PDFs;
- active-content PDFs;
- executable/script/archive bytes renamed to `.pdf`;
- non-PDF bytes declared as `application/pdf`;
- low-confidence/unknown classifier cases;
- classifier unavailable/error cases;
- appended payload candidates;
- safely reproducible mixed/polyglot candidates;
- large/resource-stress inputs;
- PDFs with embedded files;
- extracted-attachment type mismatch cases;
- byte-substitution/TOCTOU regression fixtures.

Synthetic Signthos-authored fixtures are preferred where they provide required behavior without rights ambiguity. External fixtures require exact provenance/rights qualification.

## 17. Security-scanner evidence contract

Scanner output is evidence from a producer, not canonical truth merely because it is SARIF or reports a score.

Future scanner state must distinguish at least:

```text
SCANNER_CONFIGURED
SCANNER_EXECUTED
SCANNER_APPLICABLE
SCANNER_OUTPUT_PARSED
SCANNER_OUTPUT_COMPLETE
SCANNER_FINDINGS_PRESENT
SCANNER_CLEAN
SCANNER_FAILED
SCANNER_UNAVAILABLE
```

A crash, API outage, malformed SARIF, timeout, unsupported language, missing target, truncated output, or parser failure can never become zero findings.

If SARIF is used, bind:

- exact target commit/tree/digest;
- producer/tool identity/version;
- rule/config identity;
- execution completion;
- path containment;
- finding/fingerprint identity;
- parse/validation state;
- generated-fix provenance where applicable.

SARIF is transport, not a qualification oracle.

## 18. AI, Agent, MCP, and Skill security routing

The most important cross-spec rule is:

> Document-derived content is untrusted data, never privileged AI instruction.

Future AI workflows must treat PDF text, OCR output, metadata, annotations, form values, links, embedded files, and attachments as tainted context.

Security classes to carry forward include:

- prompt/context injection;
- memory poisoning;
- tool poisoning;
- tool shadowing/name confusion;
- privilege escalation/scope creep;
- credential exfiltration;
- command injection;
- supply-chain behavior;
- hidden Skill behavior inconsistent with declared intent;
- insufficient authorization;
- missing audit/telemetry;
- context over-sharing.

No Local PDF Core feature should silently invoke a remote LLM scanner.

Dynamic MCP/server security testing requires an exact authorized target, containment, rate/resource limits, secrets boundary, network authority, and stop conditions. Tool capability alone is not test authorization.

## 19. AI-generated-code security benchmark plan

A future Signthos security benchmark should separate functional correctness from security correctness.

Candidate case contract:

```text
SecurityCase {
  caseId
  exactSourceRevision
  taskDescription
  allowedContext
  hiddenContext
  affectedPaths
  language
  vulnerabilityClass
  expectedFunctionalOracle
  expectedSecurityOracle
  staticAnalyzerEvidence?
  dynamicPoCEvidence?
  timeResourceBudget
  immutableEnvironmentIdentity
  provenanceRecord
}
```

Result semantics:

| Build/Syntax | Function | Security Oracle | Result |
| --- | --- | --- | --- |
| pass | pass | pass | candidate security success |
| pass | fail | pass | fail — functionality regression |
| pass | pass | fail | fail — vulnerability remains |
| fail | n/a | n/a | fail — nonfunctional candidate |
| unavailable | unknown | unknown | incomplete evidence |

Public CVE/patch cases may be useful regression inputs but can be contaminated by model memorization. Future evaluation should distinguish public development cases from genuinely held-out evaluation evidence where lawful and justified.

Mutable container tags such as `latest` are insufficient for final benchmark evidence. Bind immutable image digests, scripts, PoCs, dependencies, architecture, and result artifacts.

## 20. Secure-coding reference policy

A mature Signthos secure-coding rule should record:

```text
ruleId
riskClass
applicableLanguagesOrComponents
currentReferenceSet
lastReviewedDate
positiveExampleRef
negativeExampleRef
scannerOrTestCoverage?
knownLimitations
```

Current normative guidance should prefer OWASP, CWE, and language/runtime first-party sources. Older reference material may aid discovery but should not become normative merely by citation.

## 21. Static-analysis isolation policy

TscanCode does not become a product-core dependency through this amendment.

If later C/C++ or native-provider surface justifies additional static analysis, compare candidates by:

- maintenance activity;
- language/compiler coverage;
- deterministic CLI behavior;
- normalized/SARIF output;
- ruleset reproducibility;
- CI/out-of-process isolation;
- false-positive management;
- license/distribution effect.

## 22. Source, permission, NOTICE, and provenance rules

Founder source-use permission is valuable permission input but does not erase exact provenance accounting.

Every future copied or derived path must bind:

```text
sourceRepository
sourceRevision
sourcePath
sourceBlobIdentity
destinationPath
transformationClass
permissionArtifactRef?
publicLicenseExpression
requiredNotices
embeddedThirdPartyComponents
intendedDistributionMode
reviewedObligations
```

If special permission is relied upon to broaden or replace public GPL/CC-BY-SA obligations, the attributable permission artifact must explicitly cover the exact paths, rights, transformations, open-source publication, and intended distribution model. Otherwise public-license obligations remain the baseline.

Attribution/NOTICE is architecture, not release cleanup. Required notices must flow through provenance and deterministic NOTICE generation from the moment reuse is admitted.

## 23. Security-tool and model update policy

A classifier model, prompt, ruleset, scanner, package, or container that influences security disposition must not silently auto-update.

Every material update requires:

- exact old/new identity;
- change/risk review;
- regression corpus execution when implementation exists;
- changed-finding analysis;
- material false-positive/false-negative review;
- provenance/NOTICE update where applicable;
- explicit canonical adoption.

## 24. Cross-spec routing recommendations

These are recommendations only and do not mutate `ROADMAP.md` ownership.

| Concern | Recommended owner/consumer |
| --- | --- |
| content identity and PDF admission | 004 Local PDF Core |
| extracted attachment identity | 004 Local PDF Core |
| public upload/media-type semantics | 009 API / SDK / Embed |
| OCR/converter output re-admission | 010 Automation + Heavy Providers |
| SARIF/security scan admission | 011 Self-Hosted Operations + Security |
| SBOM/vulnerability/secret scanning | 011 Self-Hosted Operations + Security |
| repository AI-code benchmark release evidence | 012 Release Qualification |
| prompt/context injection | 015 AI-Assisted Document Workflows |
| MCP/tool/Skill security | 015 AI-Assisted Document Workflows |
| AI memory poisoning/context over-sharing | 015 AI-Assisted Document Workflows |

A separate roadmap amendment is required before these recommendations change canonical ownership.

## 25. Thirty gaps and required controls

The source-informed review identified the following required planning controls before the corresponding behaviors may be claimed:

1. Do not trust extension or MIME as content truth.
2. Bind every admission observation to one immutable input digest.
3. Model path substitution and TOCTOU explicitly.
4. Separate deterministic format signatures from full structural validity.
5. Treat probabilistic classifier output as advisory evidence.
6. Record classifier confidence and policy, not only label.
7. Represent classifier unavailable/error separately from `NOT_PDF`.
8. Forbid silent classifier model/config downloads.
9. Forbid silent network use in local admission.
10. Pin classifier package, model, and config independently.
11. Preserve conflicting identity signals rather than normalizing them.
12. Represent polyglot/mixed-content ambiguity explicitly.
13. Require bounded isolated PDF structural inspection.
14. Keep active-content execution deny-by-default during admission.
15. Keep admission read-only with respect to the input revision.
16. Reclassify extracted attachments as new untrusted artifacts.
17. Add extraction count/size/depth/resource budgets.
18. Distinguish scanner failure/unavailable from clean scan.
19. Treat SARIF as transport, not security truth.
20. Bind scanner output to exact target/tool/rules/config/completion state.
21. Treat document-derived AI context as tainted data.
22. Require explicit provider/network authority for remote LLM scanning.
23. Require explicit target authority for dynamic MCP/server testing.
24. Evaluate AI-generated code on build, function, and security axes.
25. Account for benchmark contamination and held-out evidence.
26. Pin benchmark/container execution environments immutably.
27. Revalidate path-level license and NOTICE obligations before reuse.
28. Keep older secure-coding/static-analysis sources reference-only by default when maintenance/licensing makes direct adoption unattractive.
29. Qualify security-tool/model/ruleset updates as controlled changes.
30. Never infer signing validity, compliance, sanitization, or release readiness from classifier/scanner output.

## 26. Corrected dependency sequence before general 004C runtime

Do not reopen already canonical 004A/004B decisions.

The dependency correction is:

```text
remaining authorized 004C package/control prerequisites
  -> canonical source-informed security plan amendment
      -> content-identity/admission semantic qualification
          -> classifier integration-route and package/model/config provenance qualification
              -> adversarial admission fixture qualification
                  -> bounded provider-neutral admission implementation
                      -> general inspect/render/search runtime qualification
```

Every arrow requires fresh live successor authority. The sequence is not automatic implementation authorization.

If Magika is rejected or unavailable, the admission contract must remain valid and may use a separately qualified deterministic provider-only route rather than weakening evidence semantics.

## 27. Future grain requirements

### 27.1 Content-identity/admission semantic qualification

Must freeze:

- exact evidence fields;
- exact disposition/error taxonomy;
- immutable-byte/TOCTOU semantics;
- declared metadata semantics;
- deterministic observation semantics;
- classifier evidence semantics;
- structural-provider evidence semantics;
- conflict/polyglot policy;
- embedded/derived artifact policy;
- locality/network rules;
- no-mutation rule.

No dependency adoption is implied.

### 27.2 Classifier integration and provenance qualification

Must compare exact feasible routes and establish:

- exact repository/revision/path;
- package/crate/npm/pip/binary/subprocess route as applicable;
- exact model/config bytes and digests;
- transitive dependencies;
- license/NOTICE/SBOM;
- supported platforms;
- local/offline behavior;
- update path;
- resource behavior;
- failure behavior.

No runtime implementation is implied.

### 27.3 Admission fixture qualification

Must establish exact fixture identities, rights/provenance, expected observations/dispositions, adversarial coverage, and resource expectations before implementation claims rely on them.

### 27.4 Bounded admission implementation

Only after separately explicit implementation authority:

- implement the narrowest provider-neutral contract;
- integrate only qualified dependencies/assets;
- prove exact-byte binding;
- prove no silent network;
- prove resource/cancellation limits;
- prove fail-closed conflict/unavailable states;
- prove no input mutation;
- prove derived-artifact behavior where in scope;
- obtain exact-head tests/CI/review and guarded merge evidence.

## 28. Security claims explicitly prohibited from classifier/scanner inference

```text
SAFE_FILE
MALWARE_FREE
NO_ACTIVE_CONTENT
SANITIZED
REDACTED_SAFELY
SIGNATURE_VALID
CERTIFICATE_TRUSTED
COMPLIANT
PRODUCTION_READY
RELEASE_READY
```

Each claim requires its own qualified evidence and owning specification.

## 29. Quality strategy additions

Future implementation should keep distinct evidence suites for:

1. content identity/admission;
2. parser/provider robustness;
3. operation correctness;
4. revision/signed-input safety;
5. redaction recovery;
6. resource/cancellation behavior;
7. locality/network behavior;
8. dependency/source/provenance drift;
9. repository security scanning;
10. AI-generated-code security cases;
11. AI/MCP/tool security when those capabilities exist.

A PASS in one suite never replaces another applicable evidence class.

## 30. Observability and privacy

Prefer audit evidence that does not disclose document contents:

- digests;
- byte lengths;
- provider/tool identities;
- bounded labels/codes;
- error classes;
- resource counters/timings where permitted;
- finding identifiers/path metadata where appropriate.

Do not log raw PDF content, extracted text, passwords, signing material, embedded secrets, API keys, or complete LLM prompts containing sensitive document content by default.

## 31. Open design questions for bounded successors

This amendment intentionally leaves implementation-specific decisions unresolved:

- Which classifier integration route best fits browser, desktop, and server surfaces?
- Is classifier use required everywhere or only on qualified platforms?
- Which deterministic observations are justified before a full parser?
- Which qualified PDF provider should own structural admission inspection?
- Which polyglot cases can be safely and legally maintained as fixtures?
- What exact recursion budgets should apply to embedded artifacts?
- Which SARIF producers belong in release-critical CI?
- Which security benchmark cases can remain meaningfully held out from coding agents?
- Is any AI-Infra-Guard source component worth reuse after exact path-level qualification, or should only methods be reproduced in Signthos-owned code?

Each question becomes a separate grain only when predecessor evidence makes it actionable.

## 32. Final qualification checklist

For this planning amendment itself:

- [x] exact post-004C1Q canonical base recorded;
- [x] Founder source directive recorded;
- [x] deep research record preserved;
- [x] exact research source revisions/trees recorded;
- [x] root license/NOTICE caveats recorded;
- [x] per-source disposition recorded;
- [x] content-identity gap identified;
- [x] provider-neutral admission architecture defined;
- [x] Magika remains advisory-only;
- [x] TOCTOU/digest binding added;
- [x] extension/MIME distrust added;
- [x] polyglot/conflict handling added;
- [x] classifier supply-chain/model/config qualification added;
- [x] no-silent-network/model-fetch rule added;
- [x] derived-artifact reclassification/budgets added;
- [x] scanner/SARIF evidence semantics added;
- [x] tainted-document AI-context rule added;
- [x] remote LLM/dynamic MCP authority boundaries added;
- [x] AI-code benchmark functional/security separation added;
- [x] contamination/holdout and immutable-environment rules added;
- [x] secure-coding freshness policy added;
- [x] GPL/static-analysis isolation rule added;
- [x] path-level licensing/NOTICE/provenance rules added;
- [x] security-tool controlled-update rule added;
- [x] no mutation during admission rule added;
- [x] 30-gap control ledger frozen;
- [x] corrected future dependency sequence defined;
- [x] implementation/source/dependency/runtime non-grants preserved;
- [ ] exact final candidate head/tree/diff verified;
- [ ] exact-head Actions/check/provider state accounted truthfully;
- [ ] fresh independent substantive exact-head review completed;
- [ ] every material finding repaired forward-only;
- [ ] unresolved material review threads = 0;
- [ ] immediate premerge race proof recorded;
- [ ] guarded normal merge with exact `expected_head_sha` completed;
- [ ] post-merge main/parents/tree/signature/surface verified;
- [ ] live successor authority re-derived.

## 33. Non-grants

Even after canonicalization, this amendment does not authorize implementation or donor code reuse.

```text
MAGIKA_DEPENDENCY_ADOPTION = NOT_AUTHORIZED
MAGIKA_MODEL_IMPORT = NOT_AUTHORIZED
MAGIKA_RUNTIME = NOT_AUTHORIZED
AI_INFRA_GUARD_SOURCE_IMPORT = NOT_AUTHORIZED
AI_INFRA_GUARD_RUNTIME = NOT_AUTHORIZED
AICGSECEVAL_DATASET_IMPORT = NOT_AUTHORIZED
AICGSECEVAL_BENCHMARK_EXECUTION = NOT_AUTHORIZED
SECGUIDE_CONTENT_COPY = NOT_AUTHORIZED
TSCANCODE_SOURCE_IMPORT = NOT_AUTHORIZED
SECURITY_SCANNER_EXECUTION = NOT_AUTHORIZED
REMOTE_LLM_SECURITY_SCAN = NOT_AUTHORIZED
DYNAMIC_MCP_SCAN = NOT_AUTHORIZED
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_MUTATION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
NPMRC_MUTATION = NOT_AUTHORIZED
PACKAGE_MANAGER_OR_RESOLVER_EXECUTION = NOT_AUTHORIZED
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED
ROADMAP_OWNERSHIP_CHANGE = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 34. Completion boundary

This amendment is complete only when the exact final candidate passes fresh independent substantive exact-head review, immediate race verification, guarded normal merge, mechanical post-merge proof, and live successor reconciliation.

Its purpose is to make the next security-critical decisions smaller, safer, auditable, local-first, and provenance-complete. It is not a shortcut into dependency adoption, source import, model acquisition, scanner execution, or provider runtime.