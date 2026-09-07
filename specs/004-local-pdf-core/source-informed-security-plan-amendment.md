# Specification 004 — Source-Informed Security Plan Amendment

Status: `STACKED_PREPARATION_CANDIDATE / PLANNING_ONLY / NON_CANONICAL_UNTIL_PREDECESSOR_CLOSEOUT_AND_FRESH_REVIEW`
Issue: #7
Owning specification: `004-local-pdf-core`
Stack base: `c6a37ef57fd7c37252032c42fee5268e021758e2`
Canonical predecessor required before merge: `004C1Q = CLOSED_CANONICAL`
Authority source: `github:issue-comment:5575926697`
Research source: `github:issue-comment:5575892327`
Founder source-use attestation: `github:issue-comment:5575823691`

## 1. Purpose and authority boundary

This amendment supplements the canonical Specification 004 plan with a source-informed content-identity, admission, and security-evidence dependency gate before general PDF capability execution.

It is a planning artifact only. It does not rewrite already-canonical Specification 004 history and does not modify `plan.md`, `tasks.md`, `ROADMAP.md`, package-control files, source, runtime, provenance manifests, workflows, fixtures, provider state, or dependency state.

```text
AMENDMENT_AUTHORITY = STACKED_PLANNING_PREPARATION_ONLY
ALLOWED_NEW_PATH = specs/004-local-pdf-core/source-informed-security-plan-amendment.md
CANONICAL_PREDECESSOR_REQUIRED = 004C1Q_CLOSED_CANONICAL
PACKAGE_JSON_MUTATION = NONE
PNPM_WORKSPACE_MUTATION = NONE
PNPM_LOCKFILE_MUTATION = NONE
NPMRC_MUTATION = NONE
SOURCE_IMPORT = NONE
DEPENDENCY_ADOPTION_ACQUISITION_INSTALL = NONE
CLASSIFIER_MODEL_IMPORT = NONE
SECURITY_SCANNER_EXECUTION = NONE
REMOTE_LLM_SECURITY_SCAN = NONE
DYNAMIC_MCP_SCAN = NONE
PDF_PROVIDER_RUNTIME = NONE
ROADMAP_OWNERSHIP_MUTATION = NONE
SUCCESSOR_IMPLEMENTATION_AUTHORITY = ABSENT
```

No source permission, repository license, README claim, scanner score, classifier confidence, or Founder approval by itself authorizes copying, dependency adoption, runtime execution, or redistribution.

## 2. Exact research snapshots and dispositions

These are research snapshots, not import pins. Every future adoption or reuse decision must revalidate then-live exact repository revision, path, license/NOTICE state, embedded assets, transitive dependencies, security posture, and intended distribution mode.

### 2.1 google/magika

```text
REPOSITORY = google/magika
RESEARCH_REVISION = 26b6a9ba7e92f2b0a3745970a9190ec0dde9bf83
ROOT_LICENSE = Apache-2.0
PRIMARY_FIT = LOCAL_CONTENT_IDENTITY_SIGNAL
DISPOSITION = HIGH_PRIORITY_SELECTIVE_ADOPTION_CANDIDATE
MODEL_PATH_OBSERVED = assets/models/standard_v3_3/model.onnx
MODEL_GIT_BLOB = e669a1120903d93417f57a1aedd1bc0000819b8b
MODEL_SIZE_BYTES = 3163737
```

Magika is a candidate for an optional probabilistic content classifier only. It must never become sole PDF validity, safety, active-content, polyglot, signing-validity, or release-readiness authority.

### 2.2 Tencent/AI-Infra-Guard

```text
REPOSITORY = Tencent/AI-Infra-Guard
RESEARCH_REVISION = e4e622af3ad2b8228ce82dd62b01415dd8ce2b9c
ROOT_LICENSE = Apache-2.0
ROOT_NOTICE = ATTRIBUTION_REQUIRED
NOTICE_INTEGRATION_TEXT = Based on Tencent Zhuque Lab AI-Infra-Guard
NOTICE_ORIGINAL_REPOSITORY_LINK = REQUIRED
PRIMARY_FIT = AI_AGENT_MCP_SKILL_SECURITY_METHODS_AND_SELECTED_COMPONENTS
DISPOSITION = HIGH_PRIORITY_METHOD_AND_SELECTIVE_COMPONENT_CANDIDATE
```

The reviewed `mcp-scan/README.md` states MIT while no `mcp-scan/LICENSE` was found at the reviewed pin. Any source reuse therefore requires path-level license qualification. Root Apache-2.0 metadata is insufficient to infer rights for that subtree.

### 2.3 Tencent/AICGSecEval

```text
REPOSITORY = Tencent/AICGSecEval
RESEARCH_REVISION = 94428ebf45141bf4ecd365a51d596dcd51caa690
ROOT_LICENSE = Apache-2.0
PRIMARY_FIT = REPOSITORY_LEVEL_AI_GENERATED_CODE_SECURITY_BENCHMARK_METHOD
DISPOSITION = HIGH_PRIORITY_BENCHMARK_METHOD_CANDIDATE
```

The useful planning pattern is multi-axis qualification: syntax/build validity, functional behavior, and vulnerability oracle/static/dynamic security evidence. Individual CVE cases, upstream repositories, PoCs, scripts, datasets, and container images require their own exact provenance and immutable identity.

### 2.4 Tencent/secguide

```text
REPOSITORY = Tencent/secguide
RESEARCH_REVISION = bfda087142e3bb3f5840cbc6af82c1982d1d14e4
ROOT_LICENSE = CC-BY-SA-4.0
PRIMARY_FIT = SECURE_CODING_KNOWLEDGE_REFERENCE
DISPOSITION = REFERENCE_ONLY_BY_DEFAULT
```

The reviewed material is old. Any Signthos rule promoted from its ideas must be independently formulated and corroborated against current OWASP, CWE, and first-party platform guidance, with source set and review date recorded.

### 2.5 Tencent/TscanCode

```text
REPOSITORY = Tencent/TscanCode
RESEARCH_REVISION = 3e3b6b66a7e39283d99add581fb9d54ee80c48f5
ROOT_LICENSE = GPL-3.0
PRIMARY_FIT = HISTORICAL_STATIC_ANALYSIS_REFERENCE_OR_EXTERNAL_TOOL_CANDIDATE
DISPOSITION = REFERENCE_OR_OUT_OF_PROCESS_TOOL_ONLY_BY_DEFAULT
```

TscanCode must not enter the permissive Signthos core by default. If it is later useful for native C/C++ glue, qualify it as an out-of-process or CI-tool candidate against maintained alternatives and record GPL distribution obligations explicitly.

## 3. Content-identity and admission architecture correction

Specification 004 already treats documents as untrusted. This amendment adds a missing explicit contract between raw imported bytes and general PDF capability execution.

The dependency-ordered admission architecture is:

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

All evidence producers that inspect the same source document must bind to the exact same immutable input digest and byte length. Path names, mutable filesystem locations, user-supplied MIME values, extensions, classifier labels, and provider-local identifiers are not substitutes for byte identity.

## 4. ContentIdentityEvidence planning contract

A future bounded semantic qualification should freeze a contract no weaker than:

```text
ContentIdentityEvidence {
  inputDigest
  byteLength
  originalFileName?
  declaredExtension?
  declaredMediaType?
  deterministicSignatureObservations[]
  classifierProvider?
  classifierVersion?
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

Candidate admission states are:

```text
CONFIRMED_PDF
AMBIGUOUS_CONTENT_IDENTITY
NOT_PDF
UNSUPPORTED_OR_UNCERTAIN
```

`AMBIGUOUS_CONTENT_IDENTITY` is fail-closed for general PDF capability execution. It is not authority to create a persistent quarantine subsystem.

Classifier unavailability must remain distinct from `NOT_PDF`. A classifier may improve confidence but cannot be a hidden single point of failure; a separately qualified deterministic provider-only admission path must remain possible.

## 5. Mandatory source-driven security gaps and controls

The following controls become required planning inputs for future bounded qualifications. They are not implementation authority.

1. **Declared type is not content truth.** Extension and caller-supplied MIME are untrusted metadata.
2. **No single classifier is authoritative.** ML confidence is probabilistic evidence only.
3. **Polyglot ambiguity is explicit.** A PDF classification does not prove absence of another interpretable format or appended/embedded payload behavior.
4. **Structural inspection is a separate evidence class.** General PDF operations must not begin merely from extension, MIME, or ML classification.
5. **Exact-byte TOCTOU prevention.** Classification, structural inspection, and later provider operations must bind to the same immutable input digest; path reuse or file replacement cannot silently substitute bytes.
6. **Classifier supply-chain identity.** Exact package, binary, model, and configuration identities and digests require separate qualification. Model assets are first-class provenance inputs.
7. **No runtime model download by default.** A selected classifier must not silently fetch model or configuration bytes or use network access during local document admission.
8. **Classifier availability is not document validity.** `CLASSIFIER_UNAVAILABLE` is distinct from `NOT_PDF`; fallback behavior must be explicit and evidence-based rather than fail-open.
9. **Adversarial classifier corpus.** Future fixtures must include renamed executables/scripts, HTML/JavaScript masquerading as PDF, truncated/malformed PDFs, unusual valid PDFs, mixed/polyglot candidates, appended payloads, and low-confidence cases.
10. **Derived attachment identity.** Every extracted embedded file is a new untrusted derived artifact with its own digest and type evidence and is never automatically executed.
11. **Attachment recursion budgets.** Exact byte, count, depth, CPU, memory, and time budgets are required before recursively classifying or inspecting embedded artifacts.
12. **Mismatch auditability.** Preserve declared extension/MIME alongside observed evidence; do not silently rewrite metadata as if it had always been correct.
13. **Security score containment.** Classifier confidence, scanner scores, benchmark accuracy, or aggregate ratings cannot become canonical `safe`, signing-valid, or release-ready truth.
14. **Scanner execution truth.** Future scanner evidence must distinguish `EXECUTED`, `APPLICABLE`, `PARSED`, `COMPLETE`, `FINDINGS_PRESENT`, and `CLEAN`; crash, outage, timeout, or parse failure must never normalize to zero findings.
15. **SARIF is transport, not authority.** Target digest, tool/version/config, producer success, path containment, and result provenance must be validated before findings are admitted.
16. **AI/Agent/MCP security is cross-spec, not PDF-core runtime.** AI-Infra-Guard risk families should inform future API, automation, self-hosted, and AI-workflow security without expanding Specification 004 runtime scope.
17. **Document content is untrusted AI context.** PDF text, metadata, annotations, OCR output, and attachments are tainted data and never privileged instructions.
18. **Remote LLM scanner egress is explicit.** Provider, base URL, model, credentials, document/code upload scope, and network policy require separate authority; local-first paths remain preferred.
19. **Dynamic MCP/red-team execution is isolated.** No scanner may probe production or unrelated targets merely because it accepts a `server_url`; dynamic targets require explicit scope and containment.
20. **Repository AI-code benchmark has independent axes.** Syntax/build success, functional correctness, and vulnerability/security evidence must be evaluated separately.
21. **Benchmark contamination and holdout discipline.** Public CVE/patch examples must be separated from sealed or held-out cases; expected fixes and oracles must not be exposed to the generating agent.
22. **Per-case data and image provenance.** Root repository licensing does not establish rights for every upstream repository, CVE artifact, PoC, dataset, or container image.
23. **Mutable container tags are insufficient evidence.** Future dynamic security benchmarks must pin immutable image digests and exact scripts/oracles rather than mutable tags.
24. **Secure-coding knowledge freshness.** Old secure-coding references require current corroboration and independent Signthos formulation before becoming normative rules.
25. **GPL/static-analysis isolation.** GPL tooling remains outside the permissive core by default; any use requires explicit process/distribution qualification.
26. **Path-level licensing can differ from repository labels.** Every reused path must have exact license/permission evidence; root labels are not enough.
27. **Attribution is part of architecture.** Required attribution and repository links must flow into deterministic NOTICE/product documentation when selected reuse triggers those obligations.
28. **Founder permission is auditable evidence, not a license eraser.** Exact intended paths, transformations, redistribution rights, and provenance remain required; public-license obligations remain unless an attributable alternative permission artifact proves the exact rights used.
29. **Security-tool updates are controlled changes.** Classifier models, rules, prompts, scanners, and benchmark oracles require qualification and regression evidence; no silent auto-update may change security decisions.
30. **Security producers are read-only during admission.** Classification and inspection must not mutate input bytes; sanitize, repair, and conversion remain separate revision-creating operations with distinct authority.

## 6. Derived-artifact handling contract

Extracted attachments, embedded files, decompressed members, and provider-produced derivative artifacts must not inherit admission from their parent document.

Future qualifications must require:

```text
DERIVED_ARTIFACT_PARENT_DIGEST = REQUIRED
DERIVED_ARTIFACT_OWN_DIGEST = REQUIRED
DERIVED_ARTIFACT_BYTE_LENGTH = REQUIRED
DERIVED_ARTIFACT_DECLARED_IDENTITY = OPTIONAL_UNTRUSTED
DERIVED_ARTIFACT_OBSERVED_IDENTITY_EVIDENCE = REQUIRED_WHEN_ADMITTED
DERIVED_ARTIFACT_AUTO_EXECUTION = FORBIDDEN
RECURSION_DEPTH_BUDGET = REQUIRED
RECURSION_COUNT_BUDGET = REQUIRED
RECURSION_TOTAL_BYTES_BUDGET = REQUIRED
RESOURCE_BUDGET = REQUIRED
```

The existence of embedded content may contribute to admission ambiguity or later provider restrictions, but it does not by itself establish maliciousness or safety.

## 7. Security evidence semantics

Future security producers and release gates must preserve uncertainty and execution truth.

A security result must not claim `CLEAN` unless the producer actually executed, was applicable, completed, produced parseable output, and covered the declared target/configuration scope.

Recommended evidence dimensions:

```text
SecurityProducerEvidence {
  targetDigest
  producerIdentity
  producerVersion
  producerConfigIdentity
  executed
  applicable
  completed
  parsed
  coverageScope
  findingsPresent
  clean
  failureOrUnavailabilityReason?
  resultArtifactIdentity?
  provenanceRef
}
```

SARIF, JSON, console output, dashboards, and aggregate scores are representations of evidence, not independent truth sources.

## 8. Future Magika qualification route

Magika remains optional and advisory. A future bounded qualification must independently establish, at minimum:

```text
EXACT_REPOSITORY_REVISION
EXACT_PACKAGE_OR_BINARY_VERSION
EXACT_SOURCE_PATHS_USED
EXACT_MODEL_PATH
EXACT_MODEL_DIGEST
EXACT_MODEL_SIZE
EXACT_CONFIG_IDENTITY
EXECUTION_MODE
SUPPORTED_PLATFORMS
NETWORK_BEHAVIOR
MODEL_PROVISIONING_BEHAVIOR
RUNTIME_DOWNLOAD_BEHAVIOR
LICENSE_AND_NOTICE_OBLIGATIONS
TRANSITIVE_DEPENDENCIES
FAILURE_AND_UNAVAILABLE_SEMANTICS
DETERMINISTIC_PROVIDER_ONLY_FALLBACK
ADVERSARIAL_CORPUS_EVIDENCE
```

A future implementation must not download or replace model bytes silently at runtime. A model change is a security-significant controlled change requiring fresh qualification and regression evidence.

## 9. AI, MCP, and tool-security routing

The Founder-supplied AI security sources expose controls that are relevant to Signthos but do not belong inside PDF-core implementation merely because documents may later interact with AI workflows.

Routing recommendations remain non-grants:

```text
004 Local PDF Core
  content identity
  PDF admission
  derived attachment identity
  parser boundary

009 API / SDK / Embed
  public artifact and media-type semantics
  safe upload contracts

010 Automation + Heavy Providers
  untrusted OCR/converter/provider-output validation
  provider sandbox and evidence

011 Self-Hosted Operations + Security
  SARIF admission
  SBOM/vulnerability/secret scanning
  scanner execution truth
  egress controls

012 Release Qualification
  repository security benchmark evidence as an applicable release gate

015 AI-Assisted Document Workflows
  prompt/context injection
  tainted document context
  tool/MCP/skill security
  memory poisoning
  privilege and credential boundaries
```

These recommendations do not mutate `ROADMAP.md` or transfer canonical ownership. A separately authorized roadmap amendment is required before any ownership change becomes canonical.

## 10. Repository-level security benchmark planning

A future applicable release-security benchmark should use the source-informed pattern:

```text
BUILD_OR_SYNTAX_AXIS
FUNCTIONAL_BEHAVIOR_AXIS
VULNERABILITY_SECURITY_AXIS
```

A generated change that removes a vulnerable feature by breaking required behavior is not a security success.

Future benchmark adoption must separately qualify:

- exact benchmark cases and provenance;
- held-out versus public development fixtures;
- exact vulnerability oracles;
- exact static/dynamic tools and configurations;
- immutable container image digests;
- exact runner scripts;
- expected network and privilege surfaces;
- result completeness semantics;
- rights for every adopted upstream case or artifact.

## 11. Dependency-order amendment

Do not reopen already-canonical 004A or 004B decisions. Insert a bounded admission/security planning sequence before first general 004C provider runtime.

The intended dependency correction is:

```text
canonical 004C package/control prerequisites
  -> source-informed security plan amendment
      -> content-identity/admission semantic qualification
          -> exact Magika integration-route + package/model/config provenance qualification
              -> adversarial admission fixture qualification
                  -> bounded admission implementation
                      -> general inspect/render/search runtime qualification
```

This sequence is a planning dependency model only. Each arrow requires fresh canonical authority from then-live repository truth. No later unit is authorized merely because it appears here.

The sequence must preserve a deterministic admission route even if Magika is unavailable, rejected, unsupported on a platform, or later removed.

## 12. Reconciliation with existing Specification 004 contracts

This amendment supplements rather than replaces the canonical Specification 004 plan:

- 004A remains the source of untrusted-input, corpus, lifecycle, resource, locality, and shared operation/security contracts.
- 004B remains the source of exact engine/provider provenance, license, binary, and capability feasibility qualification.
- package/control prerequisites already canonicalized under 004C1 remain intact.
- general 004C inspect/render/search runtime must consume a future canonical content-identity/admission contract before accepting untrusted input.
- 004G attachment extraction must treat extracted bytes as new untrusted derived artifacts with their own identity evidence.
- 004H sanitization/redaction remains revision-creating and cannot be conflated with read-only admission inspection.
- 004K provider output must be revalidated as untrusted derivative data where applicable.
- Specification 005 signing/verification truth remains outside this amendment.

## 13. Provenance and permission discipline

The Founder source-use attestation is a permission input and must remain auditable. It does not automatically prove path-level license status, embedded-asset rights, transitive rights, or alternative relicensing rights.

For every future source reuse, import, vendoring, model inclusion, fixture adoption, benchmark case, or redistributed component, require:

```text
EXACT_SOURCE_REPOSITORY
EXACT_SOURCE_REVISION
EXACT_SOURCE_PATH
EXACT_DESTINATION_PATH
EXACT_TRANSFORMATION_DESCRIPTION
PATH_LEVEL_LICENSE_OR_PERMISSION_BASIS
COPYRIGHT_NOTICE_REQUIREMENTS
NOTICE_OR_ATTRIBUTION_REQUIREMENTS
EMBEDDED_ASSET_RIGHTS
TRANSITIVE_DEPENDENCY_RIGHTS
INTENDED_DISTRIBUTION_MODE
PROVENANCE_RECORD
```

If a claimed special permission changes GPL, CC-BY-SA, or other public-license obligations, require a separately attributable exact permission artifact that proves the rights used for the intended paths and distribution. Otherwise preserve the public-license obligations.

## 14. Acceptance criteria for this amendment

This stacked preparation candidate is internally complete only if all of the following remain true:

1. exactly one new Signthos-authored planning file is changed relative to the exact 004C1Q head;
2. all five Founder-supplied source snapshots and dispositions are recorded without claiming adoption;
3. all 30 source-informed gaps and controls are represented without weakening fail-closed behavior;
4. the content-identity/admission architecture precedes general PDF capability execution;
5. Magika is explicitly advisory, optional, exact-artifact-bound, and never sole PDF authority;
6. classifier unavailability remains distinct from `NOT_PDF`;
7. TOCTOU prevention binds evidence producers to exact immutable input bytes;
8. derived attachments/artifacts receive new untrusted identity evidence and recursion budgets;
9. scanner execution truth and SARIF non-authority semantics are preserved;
10. AI/MCP/security routing remains recommendation-only and does not mutate roadmap ownership;
11. source licenses, NOTICE obligations, path-level qualification, and Founder-permission limits are explicit;
12. no package, workspace, lockfile, `.npmrc`, source, runtime, provider, provenance-manifest, workflow, fixture, model, or dependency mutation occurs;
13. 004C1Q remains the required canonical predecessor;
14. after 004C1Q closes, this PR must be retargeted to `main` without history rewriting and all exact-base review evidence must be refreshed;
15. merge requires a fresh independent substantive exact-head review, zero unresolved material review threads, immediate premerge race proof, guarded normal merge with exact expected head, and mechanical post-merge proof.

## 15. Current non-grants

```text
004C1Q = ACTIVE_UNTIL_CANONICAL_CLOSEOUT
THIS_AMENDMENT = STACKED_PREPARATION_ONLY
MAGIKA_DEPENDENCY_ADOPTION = NOT_AUTHORIZED
MAGIKA_MODEL_IMPORT = NOT_AUTHORIZED
AI_INFRA_GUARD_SOURCE_IMPORT = NOT_AUTHORIZED
AICGSECEVAL_DATASET_OR_CASE_IMPORT = NOT_AUTHORIZED
SECGUIDE_CONTENT_COPY = NOT_AUTHORIZED
TSCANCODE_SOURCE_IMPORT = NOT_AUTHORIZED
SECURITY_SCANNER_EXECUTION = NOT_AUTHORIZED
SARIF_RELEASE_GATE_IMPLEMENTATION = NOT_AUTHORIZED
REMOTE_LLM_SECURITY_SCAN = NOT_AUTHORIZED
DYNAMIC_MCP_SCAN = NOT_AUTHORIZED
ROADMAP_MUTATION = NOT_AUTHORIZED
CONTENT_IDENTITY_IMPLEMENTATION = NOT_AUTHORIZED
PDF_ADMISSION_IMPLEMENTATION = NOT_AUTHORIZED
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED
004C2_SUCCESSOR_AUTHORITY = NOT_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_DERIVED
SPECIFICATION_005_AUTHORITY = ABSENT
```

This amendment exists to improve the plan without converting research, scores, source availability, or broad Founder approval into implementation or trust authority.