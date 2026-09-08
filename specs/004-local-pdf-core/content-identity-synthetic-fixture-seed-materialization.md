# Specification 004 — Content Identity Synthetic Admission Fixture Seed Materialization

Status: `SYNTHETIC_FIXTURE_MATERIALIZATION_CANDIDATE / ZERO_PROVIDER_RUNTIME / ZERO_EXTERNAL_BYTES`
Issue: #7
Canonical base: `9953544e878db735f2a10b779babc9837316ecd3`
Authority: `github:issue-comment:5587167635`
Canonical predecessor: `CONTENT_IDENTITY_ADVERSARIAL_ADMISSION_FIXTURE_QUALIFICATION = CLOSED_CANONICAL`

## 1. Purpose

Materialize the smallest Signthos-authored exact-byte fixture seed required before a bounded provider-neutral content-identity/admission implementation can be qualified.

This grain creates only inert synthetic fixture bytes, one manifest, and this evidence document. It does not implement admission, select or execute a classifier or PDF provider, acquire a dependency, import external fixture bytes, or claim runtime behavior.

## 2. Exact authority and surface

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = CONTENT_IDENTITY_SYNTHETIC_ADMISSION_FIXTURE_SEED_MATERIALIZATION
AUTHORITY_CLASS = SYNTHETIC_FIXTURE_MATERIALIZATION_ONLY
CANONICAL_BASE = 9953544e878db735f2a10b779babc9837316ecd3
ALLOWED_PATH_PREFIX = specs/004-local-pdf-core/fixtures/admission/
ALLOWED_EVIDENCE_PATH = specs/004-local-pdf-core/content-identity-synthetic-fixture-seed-materialization.md
MAX_CHANGED_FILES = 6
```

Exact intended surface:

```text
specs/004-local-pdf-core/content-identity-synthetic-fixture-seed-materialization.md
specs/004-local-pdf-core/fixtures/admission/manifest.json
specs/004-local-pdf-core/fixtures/admission/ordinary-minimal.pdf
specs/004-local-pdf-core/fixtures/admission/declared-pdf-nonpdf.bin
specs/004-local-pdf-core/fixtures/admission/truncated-pdf-like.pdf
specs/004-local-pdf-core/fixtures/admission/pdf-with-trailing-inert-bytes.pdf
```

## 3. Construction and rights evidence

Every materialized byte in this grain is authored specifically for Signthos.

```text
EXTERNAL_SOURCE_BYTES = 0
THIRD_PARTY_ASSETS = 0
PHI = 0
PERSONAL_DATA = 0
REAL_SIGNING_MATERIAL = 0
CREDENTIALS_OR_SECRETS = 0
MALWARE_OR_EXECUTABLE_PAYLOAD = 0
RIGHTS_BASIS = SIGNTHOS_AUTHORED_SYNTHETIC
REDISTRIBUTION_ELIGIBILITY = ALLOWED
```

No public sample, donor-repository fixture, copied PDF, image, font file, archive, executable, certificate, private key, model, or external binary is included.

The ordinary control is deterministically assembled from Signthos-authored ASCII PDF objects and a reference to the PDF built-in Helvetica font name. Its authored intent is `VALID_MINIMAL_PDF`. No parser/provider execution is performed by this grain, so:

```text
AUTHORED_INTENT = VALID_MINIMAL_PDF
STRUCTURAL_PROVIDER_VALIDATION = NOT_EXECUTED
```

The trailing-content fixture is the exact ordinary control followed by the inert ASCII marker `SIGNTHOS_TRAILING_INERT_BYTES_v1\n`. It is a bounded mixed/trailing-content ambiguity seed, not a claim that the bytes form a meaningful polyglot in another runtime.

## 4. Exact fixture identities

| Fixture | `adversarialPurpose` | SHA-256 | Byte length |
| --- | --- | --- | ---: |
| `ordinary-minimal.pdf` | `ORDINARY_PDF_CONTROL` | `d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207` | 583 |
| `declared-pdf-nonpdf.bin` | `DECLARED_IDENTITY_MISMATCH` | `fecf1b6f0521397334ff12a71c066129c97bb5458e68cbe2e80aed8a3f92825c` | 86 |
| `truncated-pdf-like.pdf` | `STRUCTURAL_MALFORMED_INPUT` | `b315f2c38fee3e1ff098b8e815625bf47a6d8eced917cea06a158bad897e02c1` | 94 |
| `pdf-with-trailing-inert-bytes.pdf` | `POLYGLOT_OR_MIXED_CONTENT_AMBIGUITY` | `d21b6163ad783ee0aca73e17e5f1cd7f06183b751312fdce116d6695146ebec0` | 616 |

Digest equality is algorithm-and-value equality. Byte length is mandatory identity evidence.

## 5. Manifest contract

`fixtures/admission/manifest.json` contains four versioned `AdmissionFixtureRecord`-equivalent records.

Each record binds:

- one closed `adversarialPurpose`;
- `constructionClass = SIGNTHOS_AUTHORED_SYNTHETIC`;
- `handlingClass = ORDINARY_TEST_BYTES`;
- exact algorithm-tagged SHA-256 and byte length;
- Signthos authorship, provenance, construction, and redistribution evidence;
- declared identity inputs independently from exact-byte truth;
- a pre-authored `QUALIFICATION` expectation contract;
- provider-neutral classifier and structural invariants;
- admission disposition constraints;
- read-only mutation expectations;
- materialization completeness states;
- `qualificationExecutionPerformed = false`.

### 5.1 Manifest-local reference resolution

The manifest uses immutable manifest-local shared templates to avoid duplicating identical evidence objects. These references are not external aliases and cannot float independently from the exact manifest bytes.

Resolution is mandatory before interpreting a record as `AdmissionFixtureRecord`-equivalent:

```text
record.rightsEvidenceRef = "shared.rightsEvidence"
  -> rightsEvidence = exact shared.rightsEvidence object
     + coveredArtifactOrComponentScope = record.repositoryPath

record.constructionEvidenceBindingRef = "shared.constructionEvidence"
  -> constructionEvidenceBinding = exact shared.constructionEvidence object
     + exactProducedBytesDigest = record.exactBytesDigest
     + producedByteLength = record.byteLength

record.expectationContract.classifierExpectedEvidenceRef = "shared.classifierExpectedEvidence"
  -> classifierExpectedEvidence = exact shared.classifierExpectedEvidence object

record.expectationContract.mutationExpectationRef = "shared.mutationExpectation"
  -> mutationExpectation = exact shared.mutationExpectation object
```

`record.repositoryPath`, `record.exactBytesDigest`, and `record.byteLength` are part of the same immutable JSON record. Therefore the resolved rights scope and exact-produced-byte construction binding are record-local and cannot be substituted from another fixture.

A missing shared template, unknown reference name, missing repository path, missing digest/length, or contradictory resolved value makes the record invalid rather than falling back to implicit evidence.

This reference-resolution rule is a representation rule for this seed manifest only. It does not create a general runtime serialization format or authorize a manifest loader implementation.

No deterministic observation rule is selected in this materialization grain, so `deterministicExpectedObservations` is intentionally empty. If a later implementation makes a deterministic rule required for qualification, it must create a new versioned fixture record before qualifying execution. Observed runtime output may not be backfilled into these records as an oracle.

Provider-neutral structural expectations intentionally avoid inventing parser-specific results before a structural provider is qualified.

Exact UTF-8 manifest file identity for this candidate:

```text
MANIFEST_FILE_SHA256 = 34cddff9550b46c011a10a0e474af2f0701d7b4cb1961e4692ae5ceff1e5a841
MANIFEST_FILE_BYTE_LENGTH = 15598
```

This is file-identity evidence only. It is **not** claimed as the canonical `AdmissionCorpusIdentity.manifestDigest`; the canonical fixture qualification requires the exact corpus-record serialization algorithm to be separately frozen before such a digest becomes merge-critical runtime evidence.

## 6. Execution and dependency accounting

```text
PDF_PROVIDER_RUNTIME_EXECUTION = NOT_PERFORMED
CLASSIFIER_RUNTIME_EXECUTION = NOT_PERFORMED
STRUCTURAL_PDF_RUNTIME_EXECUTION = NOT_PERFORMED
PDF_RENDERING = NOT_PERFORMED
PDF_PARSING = NOT_PERFORMED
NETWORK_DOCUMENT_PROCESSING = NOT_PERFORMED
DEPENDENCY_ACQUISITION_OR_INSTALLATION = NOT_PERFORMED
PACKAGE_JSON_MUTATION = NONE
PNPM_WORKSPACE_MUTATION = NONE
PNPM_LOCKFILE_MUTATION = NONE
NPMRC_MUTATION = NONE
SOURCE_IMPORT = NONE
EXTERNAL_FIXTURE_ACQUISITION = NONE
```

The only evidence-generation operations are deterministic authoring of the synthetic bytes plus SHA-256 and byte-length calculation over those exact bytes and the manifest.

## 7. Security handling

All four fixtures are inert Signthos-authored test bytes and use `handlingClass = ORDINARY_TEST_BYTES`.

- the non-PDF fixture is plain ASCII text;
- the truncated fixture contains incomplete PDF-like syntax only;
- the trailing-content fixture appends inert ASCII bytes only;
- no JavaScript, launch action, URI action, embedded executable, archive payload, network reference, malware-like payload, secret, or credential is present.

All fixtures remain untrusted input for any later runtime despite their synthetic origin.

## 8. Qualification boundary

This grain is merge-qualified only if:

1. the final diff remains exactly inside the six authorized paths;
2. the exact SHA-256 values and byte lengths above match committed fixture bytes;
3. manifest records and mandatory manifest-local resolution rules match those committed identities;
4. no external or third-party bytes are introduced;
5. no dependency, package, workspace, lockfile, `.npmrc`, source-runtime, provider, model, or workflow surface changes;
6. no PDF/classifier/provider runtime is executed as qualification evidence;
7. a fresh independent substantive exact-head review finds no unresolved material defect;
8. unresolved material review threads are zero;
9. immediate premerge race proof confirms exact base/head/tree/surface/authority;
10. guarded normal merge uses the exact reviewed `expected_head_sha`;
11. postmerge verification proves canonical main, ordered parents, reviewed-head/merge-tree equality, signature, exact surface, and truthful check accounting.

## 9. Successor boundary

This materialization grain grants no implementation authority by itself.

If it becomes canonical, fresh reconciliation may consider a bounded provider-neutral admission implementation as the next candidate because the canonical source-informed sequence places that unit after adversarial fixture qualification. The reconciliation must still name exact code/test paths, deterministic rule surface, provider/runtime boundaries, fixture-record versioning requirements, test-execution authority, and evidence gates before implementation begins.

```text
CONTENT_IDENTITY_IMPLEMENTATION = NOT_AUTHORIZED_BY_THIS_GRAIN
ADMISSION_IMPLEMENTATION = NOT_AUTHORIZED_BY_THIS_GRAIN
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED_BY_THIS_GRAIN
004C2 = NOT_AUTHORIZED_BY_THIS_GRAIN
004D = NOT_AUTHORIZED_BY_THIS_GRAIN
SPECIFICATION_005 = NOT_AUTHORIZED
```
