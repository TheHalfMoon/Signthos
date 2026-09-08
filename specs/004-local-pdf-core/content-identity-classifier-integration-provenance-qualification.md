# Specification 004 — Content Identity Classifier Integration and Provenance Qualification

Status: `PLANNING_CLASSIFIER_INTEGRATION_PROVENANCE_QUALIFICATION_ONLY / ZERO_RUNTIME`
Issue: #7
Canonical base: `2048b349604aa18f9af7a1c4712e378c77483f6f`
Authority: `github:issue-comment:5578655618`
Canonical predecessor: `004C1R_CONTENT_IDENTITY_ADMISSION_SEMANTIC_QUALIFICATION = CLOSED_CANONICAL`

## 1. Purpose

This grain qualifies how an optional probabilistic content classifier may later integrate with the canonical 004C1R content-identity and admission contract. It records exact source evidence, compares feasible integration routes, freezes provenance and offline requirements, and identifies the evidence still required before any dependency, model, binary, or runtime adoption.

This grain is planning and provenance qualification only. It imports no source or model bytes, installs no package, executes no classifier, mutates no package/workspace/lockfile configuration, creates no fixtures, and grants no content-identity or PDF runtime implementation authority.

## 2. Canonical predecessor semantics consumed without reopening

The canonical 004C1R contract remains authoritative.

A probabilistic classifier is advisory evidence only. It cannot become the sole PDF validity or safety authority.

The following invariants remain mandatory:

```text
DECLARED_EXTENSION_OR_MIME = UNTRUSTED_EVIDENCE
CLASSIFIER_UNAVAILABLE != NOT_PDF
CLASSIFIER_LABEL_PDF != CONFIRMED_PDF_BY_ITSELF
CLASSIFIER_LABEL_NON_PDF != TERMINAL_REJECTION_BY_ITSELF
CLASSIFIER_OUTPUT != SAFE_FILE
CLASSIFIER_OUTPUT != MALWARE_FREE
CLASSIFIER_OUTPUT != NO_ACTIVE_CONTENT
CLASSIFIER_OUTPUT != SANITIZED
CLASSIFIER_OUTPUT != REDACTED_SAFELY
CLASSIFIER_OUTPUT != SIGNATURE_VALID
CLASSIFIER_OUTPUT != COMPLIANT
CLASSIFIER_OUTPUT != RELEASE_READY
```

Every classifier observation must bind to the same immutable exact input bytes used by the admission evaluation:

```text
ClassifierEvidenceBinding {
  inputExactBytesDigest: ContentDigest {
    algorithm
    value
  }
  byteLength
}
```

Digest equality requires equality of both `algorithm` and `value`. A path, filename, mutable alias, MIME string, extension, provider request ID, or classifier-local file identity cannot replace canonical exact-byte binding.

TOCTOU identity drift invalidates classifier evidence for the current admission evaluation.

## 3. Authority and allowed surface

The live successor authorization is intentionally narrow:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = CONTENT_IDENTITY_CLASSIFIER_INTEGRATION_PROVENANCE_QUALIFICATION
AUTHORITY_CLASS = PLANNING_CLASSIFIER_INTEGRATION_PROVENANCE_QUALIFICATION_ONLY
CANONICAL_BASE = 2048b349604aa18f9af7a1c4712e378c77483f6f
ALLOWED_PATH = specs/004-local-pdf-core/content-identity-classifier-integration-provenance-qualification.md
MAX_CHANGED_FILES = 1
```

No other repository path is authorized by this grain.

## 4. Fresh exact source snapshot

The primary source candidate remains Google Magika.

Freshly revalidated source identity:

```text
SOURCE_REPOSITORY = google/magika
SOURCE_REVISION = 26b6a9ba7e92f2b0a3745970a9190ec0dde9bf83
SOURCE_TREE = 641a57cb590b66a0dd4f296b16dd04548da96271
SOURCE_REVISION_VERIFICATION = GITHUB_VALID_VERIFIED
ROOT_LICENSE_PATH = LICENSE
ROOT_LICENSE_EXPRESSION = Apache-2.0
```

This exact revision is evidence for this qualification only. A future adoption grain must revalidate the exact source and registry artifacts it intends to consume immediately before adoption.

A moving `main` reference is never merge-critical adoption evidence.

## 5. Founder source directive

The recorded Founder source-use directive on Issue #7 is permission input, not a substitute for exact provenance.

For any future Magika reuse or integration, Signthos must still bind:

- exact repository;
- exact revision or immutable release identity;
- exact upstream path or package artifact;
- exact destination or integration boundary;
- exact transformation class;
- root and path-level license evidence;
- NOTICE/attribution obligations where applicable;
- embedded model and third-party asset identities;
- transitive dependency and binary-runtime identities;
- intended distribution surfaces.

This grain relies only on public source metadata and copies no donor bytes.

## 6. Upstream product routes observed at the exact source pin

The upstream README describes Magika as available through:

- a Rust command-line tool;
- a Python API/package;
- a Rust library binding;
- a JavaScript/TypeScript binding through an experimental npm package;
- a Go binding marked work-in-progress;
- a local browser demo.

The README explicitly describes the JavaScript/TypeScript npm package as experimental. Therefore package availability is not equivalent to Signthos adoption readiness.

No route is adopted by this qualification.

## 7. Exact standard model identity

The reviewed model directory at the exact source pin is:

```text
MODEL_DIRECTORY = assets/models/standard_v3_3
```

Exact directory members observed:

```text
README.md
  GIT_BLOB = 240354552f9805e85f88d035456d2d9c23bc6e7a
  SIZE_BYTES = 16448

config.min.json
  GIT_BLOB = f33ef571d83e7c740c2033f7ed39d9d05cec2b77
  SIZE_BYTES = 2141

metadata.json
  GIT_BLOB = 417994b5d89746427e37ca91d437773a5abceb98
  SIZE_BYTES = 19

model.onnx
  GIT_BLOB = e669a1120903d93417f57a1aedd1bc0000819b8b
  SIZE_BYTES = 3163737
```

The Git blob IDs above identify Git objects, not canonical distribution SHA-256 identities. A future asset-adoption grain must calculate and record cryptographic distribution digests over the exact bytes actually shipped or acquired.

No ONNX model bytes are imported by this grain.

## 8. Exact model configuration observations

`assets/models/standard_v3_3/config.min.json` at the reviewed source pin records, among other values:

```text
beg_size = 1024
mid_size = 0
end_size = 1024
medium_confidence_threshold = 0.5
min_file_size_for_dl = 8
padding_token = 256
block_size = 4096
version_major = 3
```

The configured target label space includes `pdf`.

The configuration also contains content-specific thresholds and overwrite behavior. Therefore a future Signthos integration must treat the model bytes and the effective configuration/prediction mode as one versioned classifier identity. Pinning only the ONNX file is insufficient.

A classifier evidence record must be able to distinguish at least:

```text
ClassifierIdentity {
  providerId
  packageOrBinaryIdentity
  packageOrBinaryVersion
  sourceRevision
  modelName
  modelDigest
  configDigest
  predictionMode
  effectiveThresholdPolicyIdentity
  runtimeIdentity
}
```

## 9. Output semantics observation

The reviewed model documentation includes `pdf` as a possible content-type label.

Upstream documentation also distinguishes raw model output from final tool output because low-confidence predictions or overwrite rules may change the final label. Signthos must therefore never reduce classifier evidence to a single opaque label.

Future classifier evidence should preserve, where the selected route can expose it:

```text
ProbabilisticClassifierEvidence {
  state
  classifierIdentity
  effectiveOutputLabel?
  rawModelLabel?
  confidenceOrScore?
  overwriteOrFallbackReason?
  inputExactBytesDigest
  byteLength
  executionLocality
  networkUseEvidence
  evidenceRef?
}
```

The canonical 004C1R schema remains authoritative if this illustrative structure differs from it.

## 10. JavaScript/TypeScript source package route

At the exact source pin:

```text
PATH = js/package.json
GIT_BLOB = d29b797394333052188e2f3ed1a187167eb402cd
NAME = magika
SOURCE_TREE_VERSION = 1.1.0
LICENSE = Apache-2.0
NODE_ENGINE = >=20
```

Direct dependency:

```text
@tensorflow/tfjs = ^4.22.0
```

Optional dependencies:

```text
@tensorflow/tfjs-node = ^4.22.0
chalk = ^5.3.0
commander = ^14.0.3
```

Exports include a general module and a Node-specific route.

Qualification interpretation:

- this is a credible browser/Node integration candidate because upstream maintains JavaScript/TypeScript bindings and uses them for a browser demo;
- upstream itself labels the npm package experimental;
- source-tree version metadata is not enough to adopt the registry package;
- semver ranges in upstream dependencies are not acceptable as Signthos's final exact resolved dependency evidence;
- TensorFlow.js and any native Node acceleration path create additional transitive/license/platform/resource qualification requirements;
- exact npm tarball identity, registry integrity, transitive graph, browser bundle behavior and Node native-addon behavior remain unresolved.

Result:

```text
JS_ROUTE = FEASIBLE_CANDIDATE_NOT_ADOPTED
BROWSER_ROUTE_CONFIDENCE = PLAUSIBLE_REQUIRES_SEPARATE_EXACT_PACKAGE_QUALIFICATION
NODE_ROUTE_CONFIDENCE = PLAUSIBLE_REQUIRES_SEPARATE_EXACT_PACKAGE_AND_RUNTIME_QUALIFICATION
```

## 11. Rust library route

At the exact source pin:

```text
PATH = rust/lib/Cargo.toml
GIT_BLOB = 40b693d81036bacbde16a145ec212bc4991b6b2a
NAME = magika
SOURCE_TREE_VERSION = 1.1.1-dev
LICENSE = Apache-2.0
RUST_EDITION = 2021
```

Important runtime dependency:

```text
ort = =2.0.0-rc.12
DEFAULT_FEATURES = false
FEATURES = [ndarray, std]
```

Other direct dependencies at the reviewed source pin include `ndarray`, `serde` as optional, `thiserror`, and `tokio`.

The library documentation explicitly states that the final user is responsible for making ONNX Runtime available. It identifies `ort` as the integration mechanism and notes that the final binary may enable `ort` features to obtain a runtime.

Qualification interpretation:

- the Rust library is a credible native/server integration candidate;
- the reviewed source tree is on `1.1.1-dev`, which is not by itself an immutable published stable crate selection;
- ONNX Runtime binary/source provenance is a separate material dependency boundary;
- `ort` release-candidate status and its linking/download choices require exact future qualification;
- automatic runtime downloads are incompatible with Signthos's no-silent-network policy unless separately authorized and made explicit;
- final platform/architecture support depends on the exact ONNX Runtime acquisition/linking strategy, not just the Rust crate.

Result:

```text
RUST_LIBRARY_ROUTE = FEASIBLE_CANDIDATE_NOT_ADOPTED
NATIVE_ROUTE_CONFIDENCE = PLAUSIBLE_REQUIRES_STABLE_CRATE_AND_ONNX_RUNTIME_QUALIFICATION
SERVER_ROUTE_CONFIDENCE = PLAUSIBLE_REQUIRES_STABLE_CRATE_AND_ONNX_RUNTIME_QUALIFICATION
```

## 12. Rust CLI/subprocess route

The upstream README documents a Rust CLI and `cargo install --locked magika-cli`. Public GitHub releases include a non-prerelease `cli/v1.1.0` release with platform-specific artifacts and published SHA-256 sidecar assets.

A subprocess route could provide a stronger process-isolation boundary than in-process embedding on some Signthos surfaces, but it also introduces:

- external executable lifecycle management;
- platform-specific binary provenance;
- child-process resource/cancellation enforcement;
- stdin/file-path handling and TOCTOU risks;
- structured output/version compatibility requirements;
- update/signature/digest verification responsibilities.

No binary is downloaded or selected here.

Result:

```text
CLI_SUBPROCESS_ROUTE = FEASIBLE_CANDIDATE_NOT_ADOPTED
DEFAULT_ROUTE = NOT_SELECTED
```

## 13. Python route

The upstream README documents a Python package and API. Python is a viable external integration route but would add a Python runtime/package boundary to a repository whose current qualified root package-manager direction is pnpm/Node for the present browser-oriented surface.

This grain finds no evidence requiring Python as the default classifier integration route.

Result:

```text
PYTHON_ROUTE = FEASIBLE_OPTIONAL_PROVIDER_CANDIDATE
PYTHON_AS_DEFAULT_CORE_ROUTE = NOT_SELECTED
```

This is a planning result, not a prohibition on a future separately qualified heavy/server provider.

## 14. Go route

The upstream README identifies Go bindings as work-in-progress. The reviewed source also demonstrates an ONNX Runtime requirement for Go examples.

Result:

```text
GO_ROUTE = DISCOVERY_ONLY_NOT_SELECTED
```

It is not dependency-ready for Signthos based on the evidence reviewed in this grain.

## 15. Cross-surface integration decision

Signthos must not force a single classifier implementation route across every execution locality merely for architectural symmetry.

Canonical product architecture requires one provider-neutral domain/evidence contract with explicit provider implementations.

This qualification therefore freezes this planning decision:

```text
ONE_CLASSIFIER_EVIDENCE_CONTRACT = REQUIRED
ONE_UNIVERSAL_MAGIKA_RUNTIME_ROUTE = NOT_REQUIRED
```

Candidate route mapping for later qualification:

| Signthos locality | Candidate route | Current status |
| --- | --- | --- |
| `BROWSER_LOCAL` | Magika JS/TS npm package + exact model/config assets | candidate, experimental upstream, not adopted |
| `NATIVE_LOCAL` | Magika Rust library + explicitly provisioned ONNX Runtime | candidate, not adopted |
| `SERVER_SELF_HOSTED` | Rust library or isolated Rust CLI subprocess | candidates, not adopted |
| `MANAGED_NETWORK` | no classifier route selected by this grain | not authorized |
| `ISOLATED_HEAVY_WORKER` | Rust CLI or Python provider only if later justified | candidates only |

A future adoption may choose fewer routes. Unsupported localities must remain explicit rather than silently falling back to network execution.

## 16. Preferred qualification direction

The evidence supports a split qualification strategy rather than an immediate dependency choice:

1. for browser-local feasibility, qualify the exact npm `magika` artifact and its TensorFlow.js/model packaging chain;
2. for native/server feasibility, qualify an exact stable Rust `magika` crate/release together with the exact ONNX Runtime provision/link strategy;
3. retain an isolated CLI subprocess as a fallback candidate where process isolation is more valuable than in-process integration;
4. do not select Python or Go as the default core path absent new evidence;
5. do not require the classifier on a platform where no route can satisfy local/offline/provenance/resource constraints.

This is not adoption authority.

## 17. No-silent-network and model delivery rule

Future classifier integration must default to local/offline operation for local capabilities.

```text
RUNTIME_MODEL_DOWNLOAD = DENY_BY_DEFAULT
RUNTIME_PACKAGE_DOWNLOAD = DENY
SILENT_ONNX_RUNTIME_DOWNLOAD = DENY
SILENT_REMOTE_CLASSIFICATION = DENY
SILENT_TELEMETRY_WITH_DOCUMENT_CONTENT = DENY
```

Any required classifier/model/runtime assets must be present through a separately qualified build/package/update path before local execution starts.

If classifier assets are missing, corrupt, unsupported, or unavailable, the canonical state is classifier unavailable/incomplete. It is not `NOT_PDF`, and it must not silently trigger remote classification.

## 18. Exact artifact identity requirements for future adoption

Before dependency adoption, each selected route must freeze exact identities.

For a registry package:

```text
RegistryArtifactEvidence {
  registry
  packageName
  exactVersion
  immutableArtifactDigest
  registryIntegrityMetadata
  sourceRepository
  sourceRevisionOrRelease
  licenseExpression
  noticeEvidence
  transitiveDependencyLockEvidence
}
```

For an embedded model/config package:

```text
ClassifierAssetEvidence {
  modelName
  modelVersion
  modelExactDigest
  modelByteLength
  configExactDigest
  configByteLength
  metadataExactDigest?
  sourceRepository
  sourceRevision
  sourcePaths[]
  licenseEvidence
  distributionDestination
  updatePolicyIdentity
}
```

For native runtime components:

```text
NativeRuntimeEvidence {
  componentName
  exactVersionOrRevision
  exactArtifactDigest
  sourceOrBinaryOrigin
  platform
  architecture
  licenseExpression
  notices
  buildOrDistributionMethod
  updatePolicyIdentity
}
```

Git blob identity may supplement but may not replace final distributed-byte digest evidence.

## 19. Transitive dependency qualification

No direct package is qualified in isolation from its effective runtime graph.

Future qualification must account for, as applicable:

- TensorFlow.js packages and browser/runtime backends;
- optional native TensorFlow.js Node acceleration dependencies;
- `ort` and ONNX Runtime source/binary components;
- native libraries loaded dynamically;
- postinstall/build/download behavior;
- platform-specific optional packages;
- generated bindings/assets;
- model/config assets bundled by registry packages;
- licenses, notices and third-party attribution;
- SBOM entries;
- known-advisory/update path.

Unknown transitive or embedded asset rights fail closed for adoption.

## 20. Model/config coupling

Magika model bytes, configuration, prediction mode and effective threshold behavior form one classifier policy identity.

A model update without corresponding config evidence is a classifier identity change.

A config update without model evidence is also a classifier identity change.

A future upgrade must not reuse old benchmark/admission evidence automatically when any of these change:

- model digest;
- config digest;
- package/binary version;
- runtime version;
- prediction mode;
- effective threshold/overwrite behavior;
- preprocessing window behavior.

## 21. Resource evidence required before runtime

A future implementation/adoption grain must prove bounded resource behavior on exact selected routes.

At minimum, applicable evidence must cover:

- model initialization memory;
- steady-state memory;
- CPU time per representative file class;
- concurrency behavior;
- initialization/cold-start cost;
- input read budget;
- timeout/cancellation behavior;
- worker/process termination behavior where subprocess isolation is used;
- browser main-thread/worker behavior where applicable;
- native runtime thread configuration;
- malformed/tiny/large input behavior.

Upstream performance claims are discovery inputs, not Signthos benchmark results.

## 22. Failure semantics

Provider errors must map into canonical classifier evidence states without redefining admission semantics.

Future implementations must distinguish at least:

```text
CLASSIFIER_AVAILABLE_RESULT
CLASSIFIER_UNAVAILABLE
CLASSIFIER_INITIALIZATION_FAILED
CLASSIFIER_ASSET_IDENTITY_MISMATCH
CLASSIFIER_RUNTIME_UNSUPPORTED
CLASSIFIER_TIMED_OUT
CLASSIFIER_CANCELLED
CLASSIFIER_RESOURCE_EXHAUSTED
CLASSIFIER_INPUT_IDENTITY_INVALIDATED
CLASSIFIER_INTERNAL_FAILURE
```

Exact final names remain owned by the canonical 004C1R stable error/evidence contract where already defined.

No failure state may be silently converted into `NOT_PDF`, `CONFIRMED_PDF`, or success.

## 23. Browser-local security requirements

A future browser integration must prove:

- the classifier runs locally without document upload;
- model/config assets are locally packaged or explicitly pre-provisioned;
- no runtime CDN/model fetch occurs silently;
- worker/main-thread execution behavior is explicit;
- document bytes are not exposed to unrelated origins;
- effective bundle dependencies are pinned and audited;
- Content Security Policy/worker requirements are documented where applicable;
- unsupported browser/runtime states fail explicitly.

The existence of an upstream browser demo is feasibility evidence only.

## 24. Native/server security requirements

A future native/server integration must prove:

- exact executable/library/model/runtime provenance;
- no signing key or control-plane secret access;
- file-path inputs cannot create path-substitution evidence gaps;
- exact bytes are digest-bound before and after classification as required by 004C1R;
- process/library resource limits are explicit;
- cancellation and timeout are observable;
- runtime search/load paths cannot silently load an unqualified ONNX Runtime;
- network access is denied or explicitly bounded according to locality;
- crash/failure cannot publish a terminal admission success.

## 25. Input transport decision

Where a route permits direct byte-buffer or stream classification, Signthos should prefer exact already-bound bytes over reopening a mutable filesystem path.

```text
PREFERRED_INPUT_TRANSPORT = EXACT_BOUND_BYTES_OR_BOUNDED_STREAM
PATH_REOPEN_AFTER_DIGEST = DISCOURAGED_AND_REQUIRES_IDENTITY_RECHECK
```

This minimizes TOCTOU/path substitution risk.

If a subprocess route requires a path, the implementation must either operate on an immutable controlled copy bound to the canonical digest or revalidate exact digest/length around the provider boundary.

## 26. Update policy

Classifier updates are controlled evidence transitions, not transparent library refreshes.

A future update must requalify the affected evidence whenever any selected component identity changes.

```text
MOVING_MAIN = NOT_ALLOWED_AS_RUNTIME_IDENTITY
FLOATING_REGISTRY_VERSION = NOT_ALLOWED
UNVERIFIED_MODEL_REPLACEMENT = NOT_ALLOWED
SILENT_AUTO_UPDATE = NOT_ALLOWED
```

An update record must bind previous/new package, runtime, model and config identities plus applicable fixture/benchmark evidence.

## 27. Reproducibility and offline packaging

A selected route must support reproducible identification of the exact artifacts included in a Signthos build or installation.

Required future evidence includes:

- exact dependency lock;
- exact model/config digests;
- exact native binary/runtime digests where present;
- package provenance metadata where available;
- SBOM coverage;
- deterministic NOTICE generation/input evidence where applicable;
- offline-start behavior after installation;
- proof that model/runtime initialization does not require an unrecorded network fetch.

## 28. Fixture dependency boundary

This qualification does not create or import admission fixtures.

The next research dependency in the source-informed sequence is adversarial admission fixture qualification, but it is not authorized merely because this candidate exists.

Before fixture bytes can enter the repository, a separate canonical unit must bind:

- exact fixture source or synthetic generation method;
- rights basis;
- exact bytes/digest/length;
- expected deterministic observations;
- expected classifier evidence where applicable;
- expected structural evidence;
- expected admission disposition;
- adversarial purpose;
- resource expectations;
- redistribution eligibility.

## 29. Adoption decision state

This grain intentionally does not select a dependency for installation.

```text
MAGIKA_AS_ADVISORY_CLASSIFIER_CANDIDATE = RETAINED
MAGIKA_REQUIRED_FOR_ALL_PLATFORMS = FALSE
JS_NPM_ROUTE = FEASIBLE_CANDIDATE_NOT_ADOPTED
RUST_LIBRARY_ROUTE = FEASIBLE_CANDIDATE_NOT_ADOPTED
RUST_CLI_SUBPROCESS_ROUTE = FEASIBLE_CANDIDATE_NOT_ADOPTED
PYTHON_ROUTE = OPTIONAL_PROVIDER_CANDIDATE_NOT_ADOPTED
GO_ROUTE = DISCOVERY_ONLY_NOT_SELECTED
EXACT_BROWSER_PACKAGE_ADOPTION = UNRESOLVED_FAIL_CLOSED
EXACT_NATIVE_PACKAGE_ADOPTION = UNRESOLVED_FAIL_CLOSED
EXACT_SERVER_PACKAGE_ADOPTION = UNRESOLVED_FAIL_CLOSED
EXACT_MODEL_DISTRIBUTION_ADOPTION = UNRESOLVED_FAIL_CLOSED
EXACT_ONNX_RUNTIME_ADOPTION = UNRESOLVED_FAIL_CLOSED
```

This is the correct state because exact registry/distribution/transitive/runtime evidence has not yet been qualified under dependency-adoption authority.

## 30. Acceptance criteria

This planning grain qualifies only if all of the following are true:

1. canonical base remains `2048b349604aa18f9af7a1c4712e378c77483f6f` through premerge race verification;
2. changed surface is exactly this one Signthos-authored planning file;
3. no source, model, package, binary, fixture or dependency bytes are imported;
4. the exact Magika source revision/tree and root license are recorded;
5. exact reviewed model/config Git identities and byte sizes are recorded;
6. feasible JS, Rust library, CLI/subprocess, Python and Go routes are distinguished without pretending adoption;
7. the experimental status of the upstream npm route is preserved;
8. the Rust/ONNX Runtime dependency boundary is explicit;
9. exact registry artifacts and runtime binaries remain fail-closed until separately qualified;
10. classifier evidence remains advisory and bound to canonical exact input bytes;
11. no-silent-network/model-download policy is preserved;
12. model/config/runtime/prediction-policy coupling is explicit;
13. failure/unavailable states cannot become terminal admission success or `NOT_PDF` by inference;
14. the route matrix preserves provider-neutral semantics across localities;
15. explicit non-grants remain intact;
16. exact-head Actions/check/provider state is accounted truthfully;
17. fresh independent substantive exact-head review covers the complete candidate;
18. every material review finding is repaired forward-only and the final head is freshly reviewed;
19. unresolved material review threads are zero;
20. immediate premerge race proof is recorded;
21. merge is guarded normal merge with exact expected head;
22. postmerge canonical main, parents, tree, signature and exact changed surface are mechanically verified;
23. successor authority is freshly re-derived from postmerge truth.

## 31. Explicit non-grants

```text
SOURCE_IMPORT = NOT_AUTHORIZED
MAGIKA_SOURCE_COPY = NOT_AUTHORIZED
MAGIKA_DEPENDENCY_ADOPTION = NOT_AUTHORIZED
MAGIKA_PACKAGE_ACQUISITION = NOT_AUTHORIZED
MAGIKA_MODEL_IMPORT_OR_DOWNLOAD = NOT_AUTHORIZED
MAGIKA_RUNTIME_EXECUTION = NOT_AUTHORIZED
TENSORFLOW_DEPENDENCY_ADOPTION = NOT_AUTHORIZED
ONNX_RUNTIME_DEPENDENCY_ADOPTION = NOT_AUTHORIZED
PACKAGE_JSON_MUTATION = NOT_AUTHORIZED
PNPM_WORKSPACE_MUTATION = NOT_AUTHORIZED
PNPM_LOCKFILE_MUTATION = NOT_AUTHORIZED
NPMRC_MUTATION = NOT_AUTHORIZED
CARGO_MANIFEST_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
PACKAGE_MANAGER_OR_RESOLVER_EXECUTION = NOT_AUTHORIZED
DEPENDENCY_INSTALLATION = NOT_AUTHORIZED
EXTERNAL_FIXTURE_ACQUISITION = NOT_AUTHORIZED
SYNTHETIC_ADVERSARIAL_FIXTURE_GENERATION = NOT_AUTHORIZED
CONTENT_IDENTITY_IMPLEMENTATION = NOT_AUTHORIZED
ADMISSION_IMPLEMENTATION = NOT_AUTHORIZED
PDF_PROVIDER_RUNTIME = NOT_AUTHORIZED
SECURITY_SCANNER_EXECUTION = NOT_AUTHORIZED
REMOTE_LLM_SECURITY_SCAN = NOT_AUTHORIZED
DYNAMIC_MCP_SCAN = NOT_AUTHORIZED
WORKFLOW_OR_CONTAINER_MUTATION = NOT_AUTHORIZED
DATABASE_OR_MIGRATION_MUTATION = NOT_AUTHORIZED
ROADMAP_OWNERSHIP_CHANGE = NOT_AUTHORIZED
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 32. Qualification result

Current candidate result before independent exact-head review:

```text
CLASSIFIER_INTEGRATION_PROVENANCE_SEMANTICS = QUALIFIED_CANDIDATE
DEPENDENCY_ADOPTION_READINESS = FAIL_CLOSED
MODEL_IMPORT_READINESS = FAIL_CLOSED
RUNTIME_EXECUTION_READINESS = FAIL_CLOSED
FIXTURE_EXECUTION_READINESS = FAIL_CLOSED
IMPLEMENTATION_AUTHORITY = ABSENT
CANONICAL_STATUS = CANDIDATE_ONLY
```

The file becomes canonical only after fresh independent substantive exact-head review, zero unresolved material threads, immediate premerge race proof, guarded normal merge, postmerge verification and fresh successor reconciliation.
