# Specification 004 — Source-Informed Security Plan Amendment

Status: `STACKED_PREPARATION_ONLY / NON_CANONICAL / ZERO_SOURCE_IMPORT`
Issue: #7
Preparation authority: `github:issue-comment:5575926697`
Founder source directive: `github:issue-comment:5575823691`
Research record: `github:issue-comment:5575892327`
Stacked predecessor candidate: 004C1Q PR #122

## 1. Purpose

This amendment strengthens the Specification 004 Local PDF Core plan using five Founder-supplied security sources without importing source code, adopting dependencies, executing scanners, or changing canonical runtime behavior.

The central correction is architectural rather than additive: **untrusted bytes require an explicit content-identity and admission boundary before general PDF capability execution**.

The supplied sources are used for different purposes:

- `google/magika`: high-priority content-identity signal candidate;
- `Tencent/AI-Infra-Guard`: AI/Agent/MCP/Skill security methods and selective-component candidate;
- `Tencent/AICGSecEval`: repository-level AI-generated-code security benchmark methodology candidate;
- `Tencent/secguide`: secure-coding knowledge reference;
- `Tencent/TscanCode`: historical static-analysis reference or isolated tooling candidate.

This amendment deliberately rejects a single “security platform” dependency and a wholesale source-import strategy. Signthos should absorb the strongest ideas behind stable Signthos contracts while keeping runtime, licensing, provenance, locality, and failure semantics independently reviewable.

## 2. Canonical and preparation boundary

This file is a stacked preparation artifact. It is intentionally based on the exact current 004C1Q candidate lineage and cannot become canonical before 004C1Q itself is canonically merged and post-merge verified.

While this preparation remains non-canonical:

```text
SOURCE_IMPORT = NONE
NEW_DEPENDENCY_ADOPTION = NONE
MAGIKA_MODEL_IMPORT = NONE
PACKAGE_OR_WORKSPACE_MUTATION = NONE
RESOLVER_EXECUTION = NONE
SECURITY_SCANNER_EXECUTION = NONE
REMOTE_LLM_SECURITY_SCAN = NONE
DYNAMIC_MCP_SCAN = NONE
PDF_PROVIDER_RUNTIME = NONE
ROADMAP_OWNERSHIP_MUTATION = NONE
```

After 004C1Q closes, this amendment must be retargeted to the exact new `main` without history rewriting and must receive fresh exact-base/exact-head qualification and independent substantive review before merge.

## 3. Research source register

These identities are research snapshots, not future import pins. Every later qualification must revalidate the then-current exact source identity and intended paths.

### 3.1 Google Magika

```text
REPOSITORY = https://github.com/google/magika
RESEARCH_REVISION = 26b6a9ba7e92f2b0a3745970a9190ec0dde9bf83
RESEARCH_TREE = 641a57cb590b66a0dd4f296b16dd04548da96271
ROOT_LICENSE = Apache-2.0
DISPOSITION = HIGH_PRIORITY_SELECTIVE_ADOPTION_CANDIDATE
PRIMARY_ROLE = PROBABILISTIC_CONTENT_IDENTITY_SIGNAL
```

Observed research facts:

- supports 200+ content labels including PDF and executable/script/archive classes;
- exposes confidence-aware output rather than only filename-extension inference;
- has local CPU-capable inference paths and multiple language bindings;
- the reviewed standard model directory contains a roughly 3.16 MB ONNX model;
- the exact model/config/package/runtime identity must be treated as supply-chain evidence, not an invisible implementation detail.

Magika is **not** a PDF parser, sanitizer, malware detector, active-content proof, polyglot oracle, or signature validator. It must never become the sole admission authority.

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

- prompt/context injection defenses;
- memory poisoning detection concepts;
- tool poisoning and tool-shadowing risks;
- privilege/scope-creep analysis;
- credential exfiltration detection;
- command-injection and unsafe-execution detection;
- insecure dependency/supply-chain checks;
- Skill description-versus-code consistency auditing;
- SARIF 2.1.0 security-result transport;
- static pre-scan before more capable agent execution;
- multi-stage security review and red-team orchestration.

Important qualification caveat: path-level licensing must be revalidated. The reviewed root is Apache-2.0 and includes attribution NOTICE obligations, while at least one nested README advertises a different license label without a corresponding nested LICENSE at the reviewed path. No nested path may be copied from a root-license assumption alone.

### 3.3 Tencent AICGSecEval

```text
REPOSITORY = https://github.com/Tencent/AICGSecEval
RESEARCH_REVISION = 94428ebf45141bf4ecd365a51d596dcd51caa690
RESEARCH_TREE = 1789b060d079a49a436a9affb6237e6c39b9bd9d
ROOT_LICENSE = Apache-2.0
DISPOSITION = SECURITY_BENCHMARK_METHOD_CANDIDATE
PRIMARY_ROLE = AI_GENERATED_CODE_SECURITY_EVALUATION
```

The useful architectural pattern is repository-level evaluation with multiple independent axes:

```text
GENERATED_OR_MODIFIED_CODE
  -> SYNTAX_OR_BUILD_VALIDITY
  -> FUNCTIONAL_BEHAVIOR
  -> STATIC_SECURITY_ANALYSIS
  -> DYNAMIC_SECURITY_OR_POC_ORACLE
  -> CASE_RESULT
```

Signthos should adopt the methodology, not assume that every external benchmark case, upstream repository, CVE artifact, PoC, container image, or dataset entry inherits the root repository license.

### 3.4 Tencent Secure Coding Guide

```text
REPOSITORY = https://github.com/Tencent/secguide
RESEARCH_REVISION = bfda087142e3bb3f5840cbc6af82c1982d1d14e4
RESEARCH_TREE = bff2baab80339c5c1e4b4ecabdc2691f719c41b3
ROOT_LICENSE = CC-BY-SA-4.0
DISPOSITION = REFERENCE_ONLY_BY_DEFAULT
PRIMARY_ROLE = SECURE_CODING_KNOWLEDGE_INPUT
```

Use the guide as a structured reference for secure-coding concerns, not as a wholesale documentation import. Promoted Signthos rules should be independently formulated and corroborated against current OWASP, CWE, language/runtime first-party guidance, and the exact Signthos threat model.

### 3.5 Tencent TscanCode

```text
REPOSITORY = https://github.com/Tencent/TscanCode
RESEARCH_REVISION = 3e3b6b66a7e39283d99add581fb9d54ee80c48f5
RESEARCH_TREE = 4bc95504681dab9a8cce040f29756acc8c1dcb8c
ROOT_LICENSE = GPL-3.0
DISPOSITION = REFERENCE_OR_OUT_OF_PROCESS_TOOL_ONLY_BY_DEFAULT
PRIMARY_ROLE = HISTORICAL_STATIC_ANALYSIS_ARCHITECTURE
```

Its useful ideas include extensible checks, defect normalization, and false-positive handling. It should not enter the permissive product core by default. Any future use must compare actively maintained alternatives and explicitly model GPL distribution obligations and process boundaries.

## 4. Material gap found in the current Specification 004 plan

The current Specification 004 program correctly establishes untrusted-PDF handling, active-content denial, resource limits, malformed-input fixtures, provider isolation, revision semantics, and independent redaction proof.

However, before general PDF provider runtime is trusted, the program still needs a first-class answer to this question:

> How does Signthos prove that the exact bytes being handed to a PDF provider are the same exact bytes that were classified, inspected, and admitted, and what happens when identity signals conflict?

A filename ending in `.pdf`, a caller-provided MIME type, a browser-provided media type, an ML label, or a successful parser open are all individually insufficient.

The missing boundary is **Content Identity and Admission**.

## 5. Required admission architecture

The future implementation architecture should preserve this logical sequence:

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

No stage silently upgrades an earlier signal into stronger evidence than it actually provides.

### 5.1 Immutable digest and size preflight

Before classification or parsing:

- bind the exact bytes to a digest;
- bind the exact byte length;
- use the same immutable byte identity for every later admission observation;
- reject path-reuse or file-replacement substitution;
- do not let later providers reopen a mutable path and silently inspect different bytes.

This is a TOCTOU security requirement, not only an audit convenience.

### 5.2 Declared identity capture

Declared metadata is evidence about caller intent, not content truth.

Preserve independently:

```text
declaredFileName?
declaredExtension?
declaredMediaType?
sourceChannel?
```

Do not silently rewrite declared metadata when observed evidence disagrees. Mismatch itself is audit/security evidence.

### 5.3 Deterministic byte-signature observations

Collect bounded deterministic observations appropriate to the exact input and implementation, such as relevant format signatures and structural preconditions.

These observations are stronger than extension/MIME claims but still do not prove full structural validity or safety.

### 5.4 Optional probabilistic content classifier

A future Magika integration may contribute one signal.

Required properties if selected:

- exact package/binary revision;
- exact model bytes and digest;
- exact config bytes and digest;
- exact classification mode/threshold policy;
- exact output label and confidence;
- local execution by default;
- no silent model/config download;
- no silent network access;
- deterministic error taxonomy for unavailable model/runtime;
- explicit behavior for low-confidence/unknown output.

Classifier state must not be represented as structural validity.

### 5.5 Isolated bounded PDF structural inspection

A qualified PDF provider must independently evaluate PDF structure under explicit resource, cancellation, active-content, encryption, and locality constraints.

A successful open/parse may support structural evidence; it does not by itself prove the input is non-malicious, non-polyglot, sanitized, or safe for every operation.

### 5.6 Content identity reconciliation

Reconcile all evidence without hiding conflicts.

Candidate conflict examples:

- extension `.pdf`, classifier `pebin`;
- MIME `application/pdf`, deterministic signatures incompatible;
- classifier `pdf`, structural inspection invalid;
- valid PDF structure with significant appended/alternative-format evidence;
- classifier low confidence or unavailable while structural evidence exists.

Conflict policy must be deterministic and fail closed for the claimed capability.

## 6. Proposed evidence contract

A later semantic qualification should refine a typed contract equivalent to:

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

These names are planning candidates. The semantic qualification grain owns their exact values, meaning, and error mapping.

`CONFIRMED_PDF` must mean only that the exact qualified admission policy accepts the bytes for the claimed downstream PDF capability. It must never imply “malware free,” “sanitized,” “signature valid,” “safe to execute active content,” or “safe for arbitrary external processors.”

## 7. Polyglot and ambiguity policy

Polyglot and mixed-content evidence must be explicit.

A classifier returning `pdf` cannot prove that bytes are not simultaneously interpretable by another parser. A PDF provider successfully opening a document cannot prove that appended or embedded bytes are irrelevant to every future consumer.

Required planning rules:

- preserve all conflicting signals;
- never collapse ambiguity into a generic success state;
- maintain provider-specific safety boundaries;
- reject active interpretation by unrelated runtimes;
- test appended payloads and mixed-format candidates;
- treat downstream export/attachment/conversion consumers as separate trust transitions.

## 8. Extracted and embedded artifacts

Any embedded file or extracted attachment becomes a new untrusted derived artifact.

Required future evidence:

```text
parentDocumentDigest
embeddedObjectIdentity
extractedArtifactDigest
byteLength
contentIdentityEvidenceRef
extractionProviderIdentity
```

Derived artifacts must not inherit the parent PDF’s admission state.

Recursion requires explicit limits:

- maximum aggregate extracted bytes;
- maximum single extracted artifact size;
- maximum artifact count;
- maximum nested depth;
- CPU/memory/time budget;
- cancellation;
- no automatic execution;
- no automatic network fetch.

## 9. Adversarial admission corpus

Before admission implementation can qualify, the corpus should include at least these families where rights/provenance permit:

- ordinary valid PDFs;
- unusual but valid PDFs;
- truncated PDFs;
- malformed xref/object structures;
- encrypted PDFs;
- active-content PDFs;
- renamed executable/script/archive files with `.pdf` extension;
- caller-declared `application/pdf` on non-PDF bytes;
- low-confidence/unknown classifier cases;
- appended payload candidates;
- deliberate mixed/polyglot candidates where safely reproducible;
- large/resource-stress inputs;
- PDFs with embedded files;
- extracted attachment type mismatch cases;
- byte-substitution/TOCTOU regression fixtures.

Synthetic fixtures are preferred where they can provide the required behavior without licensing ambiguity. Real external fixtures require exact rights/provenance qualification.

## 10. Magika qualification plan

Magika should be evaluated in a sequence, never imported opportunistically.

### 10.1 Integration-route qualification

Compare exact feasible routes, for example:

- Rust API/CLI path;
- JavaScript/TypeScript binding path;
- isolated local subprocess path;
- Signthos-owned minimal adapter around a qualified upstream package.

Compare:

- platform coverage;
- package/transitive dependency weight;
- model distribution model;
- browser versus desktop/server availability;
- startup and per-file resource behavior;
- binary/model provenance;
- offline/local behavior;
- update path;
- license/NOTICE obligations;
- failure isolation;
- testability.

No integration route is selected by this amendment.

### 10.2 Model and configuration provenance

If Magika is selected later, qualification must bind exact model and config bytes independently from source-package identity.

No floating model alias, runtime download, mutable remote asset, or undocumented threshold policy is acceptable as merge-critical evidence.

### 10.3 Failure semantics

Future error taxonomy must separate at least:

```text
CLASSIFIER_NOT_CONFIGURED
CLASSIFIER_UNAVAILABLE
CLASSIFIER_EXECUTION_FAILED
CLASSIFIER_UNSUPPORTED_INPUT
CLASSIFIER_LOW_CONFIDENCE
CLASSIFIER_RESULT_AVAILABLE
```

None of the failure states may be silently normalized to `NOT_PDF` or to successful admission.

### 10.4 No hidden single point of failure

The plan must preserve a deterministic provider-only admission route if Magika is unavailable, rejected, or unsupported on a platform, provided that the exact later semantic policy explicitly qualifies such a route.

Magika may improve evidence quality; it must not become an undocumented availability dependency for the entire document domain.

## 11. Security-scanner evidence contract

AI-Infra-Guard-inspired and other scanner output must be treated as evidence from a producer, not as canonical truth merely because it is SARIF or reports a score.

Future scanner admission must distinguish:

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

A crash, API outage, malformed SARIF, timeout, missing target, unsupported language, or truncated result can never become zero findings.

### 11.1 SARIF transport requirements

If SARIF is adopted as an interchange format, each admitted result must bind:

- target exact commit/digest/tree;
- producer/tool identity and version;
- rule/config identity;
- execution completion state;
- file/path containment;
- result/fingerprint identity;
- parse/validation status;
- provenance of generated fixes if present.

SARIF is a transport schema, not a qualification oracle.

## 12. AI, Agent, MCP, and Skill security routing

AI-Infra-Guard-derived concerns should not be forced into Local PDF Core runtime.

The most important cross-spec rule is:

> **Document-derived content is untrusted data, never privileged AI instruction.**

Future AI-assisted workflows must treat text extracted from PDFs, OCR output, metadata, annotations, form values, embedded files, links, and attachment content as tainted context.

Security classes to carry forward include:

- prompt/context injection;
- memory poisoning;
- tool poisoning;
- tool shadowing/name confusion;
- privilege escalation/scope creep;
- credential exfiltration;
- command injection;
- insecure dependency/supply-chain behavior;
- hidden Skill behavior inconsistent with declared intent;
- insufficient auth/authorization;
- missing audit/telemetry;
- context over-sharing.

### 12.1 Remote LLM egress rule

Any future LLM-driven scanner requires separately authorized provider/network behavior.

At minimum bind:

- exact provider/base URL;
- exact model identity;
- credential scope;
- exact content/code sent;
- retention/privacy policy evidence where required;
- redaction/minimization policy;
- target authorization;
- timeout/retry behavior;
- local/offline alternative where product promises require it.

No local-only document operation may silently use an LLM security scanner.

### 12.2 Dynamic MCP scan rule

Tool support for scanning a remote `server_url` does not authorize Signthos to probe that target.

Dynamic testing requires an exact authorized target, containment, rate/resource limits, secrets boundary, and explicit stop conditions. Production or unrelated systems are not implicit test targets.

## 13. AI-generated-code security benchmark plan

AICGSecEval provides a useful methodology for evaluating agent-generated or AI-assisted code changes.

Signthos should eventually maintain security cases in which success requires both functional correctness and security correctness.

Candidate benchmark structure:

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

### 13.1 Result semantics

A candidate does not pass because it removed a vulnerability while breaking the intended feature.

Conceptual matrix:

| Build/Syntax | Function | Security Oracle | Result |
| --- | --- | --- | --- |
| pass | pass | pass | candidate security success |
| pass | fail | pass | fail — functionality regression |
| pass | pass | fail | fail — vulnerability remains |
| fail | n/a | n/a | fail — nonfunctional candidate |
| unavailable | unknown | unknown | incomplete evidence |

### 13.2 Contamination and holdout

Public CVEs and patches are valuable development fixtures but may be memorized by models.

Future benchmark governance should separate:

- public development/security regression cases;
- private or sealed held-out cases where justified and lawful;
- explicit contamination observations;
- exact generator-visible context;
- hidden oracles/expected patches;
- evaluation-only evidence unavailable to the generation agent.

No claim of model/agent security superiority should rely only on publicly memorized CVE patches.

### 13.3 Container and environment identity

Mutable tags such as `latest` are insufficient for final evidence.

Dynamic benchmark runs must bind exact immutable container image digests, test scripts, PoCs, dependency versions, runtime architecture, and result artifacts.

## 14. Secure-coding reference policy

Tencent `secguide` may inform threat discovery and checklist design, but promoted Signthos rules must carry a current source set.

Each mature secure-coding rule should record:

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

Current OWASP/CWE/language/runtime first-party guidance should be preferred for normative statements. The older guide may contribute historical context and examples, subject to licensing obligations if copied or adapted.

## 15. Static-analysis tool isolation policy

TscanCode’s GPL-3.0 licensing and age make direct product-core incorporation undesirable by default.

If future native PDF/provider glue introduces enough C/C++ surface to justify another static analyzer, evaluate candidates by:

- active maintenance;
- language/compiler coverage;
- deterministic CLI output;
- SARIF or normalized output support;
- incremental/full scan behavior;
- license/distribution effect;
- ability to run purely as CI/out-of-process tooling;
- false-positive management;
- reproducible ruleset identity.

No decision is made by this amendment.

## 16. Source and rights rules

Founder permission is valuable evidence but does not replace exact provenance accounting.

Every future copied or derived source path must bind:

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

If a special permission is intended to override or broaden public GPL/CC-BY-SA terms, the permission artifact itself must be attributable and explicitly cover the exact rights, paths, transformations, and distribution model being relied upon.

Otherwise the public license obligations remain the applicable baseline.

### 16.1 Attribution as architecture

Required NOTICE/attribution is not release cleanup. It must be carried through provenance and deterministic NOTICE generation from the time source reuse is admitted.

## 17. Security-tool update policy

Security decisions must not silently change because an external classifier model, prompt, ruleset, package, scanner, or container auto-updated.

Every update that can change security disposition requires:

- exact old/new identity;
- changelog/risk review where available;
- regression corpus execution;
- changed-finding analysis;
- false-positive/false-negative review where material;
- provenance/NOTICE update where needed;
- explicit canonical adoption.

## 18. No mutation during admission

Content classification and admission inspection are `READ_ONLY` with respect to the input revision.

A classifier, scanner, parser preflight, or admission gate must not sanitize, repair, rewrite, normalize, convert, decompress-and-repackage, or otherwise mutate the document while still reporting the original revision as the inspected object.

Sanitize, repair, compression, conversion, redaction, and other content-changing behavior remain separate `REVISION_CREATING` operations with their own authority and evidence.

## 19. Cross-spec routing recommendations

This amendment records routing recommendations only; it does not change canonical roadmap ownership.

| Concern | Recommended owning/consuming specification |
| --- | --- |
| content identity and PDF admission | 004 Local PDF Core |
| extracted attachment identity | 004 Local PDF Core |
| public upload/media-type contract | 009 API / SDK / Embed |
| converter/OCR output re-admission | 010 Automation + Heavy Providers |
| SARIF/security scan admission | 011 Self-Hosted Operations + Security |
| SBOM/vulnerability/secret scanning | 011 Self-Hosted Operations + Security |
| repository AI-code security benchmark release evidence | 012 Release Qualification |
| prompt/context injection | 015 AI-Assisted Document Workflows |
| MCP/tool/Skill security | 015 AI-Assisted Document Workflows |
| AI memory poisoning / context over-sharing | 015 AI-Assisted Document Workflows |

A later roadmap amendment is required before any recommendation changes canonical specification ownership.

## 20. Required dependency correction before general 004C runtime

Do not reopen already canonical 004A/004B decisions.

Instead, before general inspect/render/search runtime becomes eligible, insert a bounded content-admission program that consumes their established contracts and provider evidence.

Logical planning sequence:

```text
remaining canonical 004C package/control prerequisites
  -> source-informed security plan amendment
      -> content-identity/admission semantic qualification
          -> exact Magika integration-route + package/model/config provenance qualification
              -> adversarial admission fixture qualification
                  -> bounded admission implementation
                      -> general inspect/render/search runtime qualification
```

This sequence is a dependency hypothesis, not automatic authority. Every arrow requires fresh live successor derivation.

If Magika is later rejected or unavailable, the plan must preserve a qualified deterministic provider-only route rather than weakening the admission contract.

## 21. Future grain acceptance requirements

### 21.1 Content-identity semantic qualification

Must establish:

- exact evidence fields and stable error/disposition taxonomy;
- byte-identity/TOCTOU contract;
- declared metadata semantics;
- deterministic signature-observation semantics;
- classifier evidence semantics;
- structural-provider evidence semantics;
- polyglot/conflict policy;
- embedded/derived artifact policy;
- local/network rules;
- no mutation during admission.

No dependency adoption is implied.

### 21.2 Classifier/provider provenance qualification

Must establish:

- exact repository/revision/path;
- package/crate/npm/pip/binary route as applicable;
- exact model/config bytes and digests;
- transitive dependencies;
- license/NOTICE/SBOM;
- supported platforms;
- offline/local behavior;
- update path;
- resource behavior;
- failure behavior.

No runtime implementation is implied.

### 21.3 Admission fixture qualification

Must establish exact fixture identities, rights/provenance, expected evidence/dispositions, and adversarial coverage before implementation claims rely on them.

### 21.4 Bounded admission implementation

Only after exact implementation authority exists:

- implement the narrowest provider-neutral admission contract;
- integrate only separately qualified dependencies/assets;
- prove exact-byte binding;
- prove no silent network;
- prove resource/cancellation limits;
- prove fail-closed conflicts and unavailable states;
- prove no input mutation;
- prove derived attachment handling where in scope;
- obtain exact-head tests/CI/review and guarded merge evidence.

## 22. Security claims explicitly prohibited

No future grain may infer any of the following solely from content classification or scanner output:

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

Every such claim requires its own qualified evidence class and owning specification.

## 23. Quality strategy improvements

The strengthened plan should eventually create distinct regression suites for:

1. content identity/admission;
2. PDF parser/provider robustness;
3. PDF operation correctness;
4. revision/signed-input safety;
5. redaction recovery;
6. resource/cancellation behavior;
7. provider locality/network behavior;
8. dependency/source/provenance drift;
9. repository security scanning;
10. AI-generated-code security cases;
11. AI/MCP/tool security when those features exist.

A passing suite in one class does not replace another applicable class.

## 24. Observability and privacy

Admission and security evidence should be auditable without leaking document content.

Default logs should prefer:

- digests;
- byte lengths;
- provider/tool identities;
- bounded labels/codes;
- error classes;
- timings/resource counters where permitted;
- finding identifiers/path metadata where appropriate.

Do not log raw PDF content, extracted text, passwords, signing material, embedded secrets, API keys, or whole LLM prompts containing sensitive document content by default.

## 25. Open design questions for later bounded qualification

This amendment intentionally does not answer implementation-specific questions that require exact candidate evidence:

- Which Magika binding/integration route best fits browser, desktop and server surfaces?
- Is the classifier required on every supported platform or only where qualified?
- Which deterministic byte-signature observations are justified without duplicating a full parser?
- Which qualified PDF structural provider should own the admission inspection?
- What exact polyglot cases can be safely and legally maintained in the fixture corpus?
- What recursion budgets are appropriate for embedded artifacts?
- Which SARIF producer set belongs in release-critical CI?
- What security benchmark cases can remain truly held out from AI coding agents?
- Whether any AI-Infra-Guard component is worth source reuse after path-level license and dependency review, versus reproducing only the architectural method in Signthos-owned code.

Each question should become a small grain only when its predecessor evidence makes it actionable.

## 26. Preparation acceptance checklist

For this planning amendment itself:

- [x] Founder source directive recorded.
- [x] exact research source revisions recorded.
- [x] root license/NOTICE caveats recorded.
- [x] per-source disposition recorded.
- [x] current content-identity gap identified.
- [x] provider-neutral admission architecture proposed.
- [x] Magika is advisory-only and non-authoritative.
- [x] TOCTOU/digest binding requirement added.
- [x] polyglot/conflict handling added.
- [x] classifier supply-chain/model/config qualification added.
- [x] no-silent-network/model-download requirement added.
- [x] extracted-artifact identity and recursion budget added.
- [x] scanner/SARIF evidence semantics added.
- [x] AI/Agent/MCP/Skill security routing added.
- [x] tainted-document AI-context rule added.
- [x] repository AI-code benchmark methodology added.
- [x] contamination/holdout and immutable environment requirements added.
- [x] secure-coding freshness policy added.
- [x] GPL/static-analysis isolation rule added.
- [x] path-level licensing and attribution rules added.
- [x] security-tool controlled-update rule added.
- [x] no mutation during admission rule added.
- [x] future dependency hypothesis defined.
- [x] implementation/source/dependency/runtime non-grants preserved.
- [ ] 004C1Q canonical predecessor merge/post-merge proof established.
- [ ] amendment retargeted to exact post-004C1Q `main` without history rewrite.
- [ ] final base/head/tree/diff verified.
- [ ] exact-head provider/check accounting completed truthfully.
- [ ] fresh independent substantive review completed on final base/head.
- [ ] every material finding repaired forward-only.
- [ ] unresolved material review threads = 0.
- [ ] immediate premerge race proof recorded.
- [ ] guarded expected-head normal merge completed.
- [ ] post-merge main/parents/tree/signature/surface verified.
- [ ] live successor authority re-derived.

## 27. Non-grants

This amendment, even after canonicalization, does not itself authorize implementation.

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
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED
ROADMAP_OWNERSHIP_CHANGE = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 28. Completion boundary

This amendment is complete only when it is canonically adopted after 004C1Q with final-base exact-head independent review and mechanical post-merge proof.

Its purpose is to make the next security-critical decisions smaller and safer. It is not a shortcut into source import or runtime execution.
