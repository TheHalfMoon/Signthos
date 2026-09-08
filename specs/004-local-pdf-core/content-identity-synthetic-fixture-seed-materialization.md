# Specification 004 — Content Identity Synthetic Admission Fixture Seed Materialization

Status: `SYNTHETIC_FIXTURE_MATERIALIZATION_CANDIDATE / ZERO_PROVIDER_RUNTIME / ZERO_EXTERNAL_BYTES`
Issue: #7
Canonical base: `9953544e878db735f2a10b779babc9837316ecd3`
Authority: `github:issue-comment:5587167635`
Canonical predecessor: `CONTENT_IDENTITY_ADVERSARIAL_ADMISSION_FIXTURE_QUALIFICATION = CLOSED_CANONICAL`

## 1. Purpose

Materialize the smallest Signthos-authored exact-byte fixture seed required before a bounded provider-neutral content-identity/admission implementation can be qualified.

This grain resolves the post-PR #131 sequencing question in the fail-closed direction: exact synthetic test bytes are materialized before implementation qualification, so later tests can bind expectations to immutable known bytes rather than generating or discovering their oracle after implementation.

This grain does not implement admission, select a parser/classifier/provider, execute PDF runtime behavior, acquire a dependency, or import any external fixture bytes.

## 2. Exact authority and surface

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = CONTENT_IDENTITY_SYNTHETIC_ADMISSION_FIXTURE_SEED_MATERIALIZATION
AUTHORITY_CLASS = SYNTHETIC_FIXTURE_MATERIALIZATION_ONLY
CANONICAL_BASE = 9953544e878db735f2a10b779babc9837316ecd3
ALLOWED_PATH_PREFIX = specs/004-local-pdf-core/fixtures/admission/
ALLOWED_EVIDENCE_PATH = specs/004-local-pdf-core/content-identity-synthetic-fixture-seed-materialization.md
MAX_CHANGED_FILES = 6
```

Exact intended changed surface:

```text
specs/004-local-pdf-core/content-identity-synthetic-fixture-seed-materialization.md
specs/004-local-pdf-core/fixtures/admission/manifest.json
specs/004-local-pdf-core/fixtures/admission/ordinary-minimal.pdf
specs/004-local-pdf-core/fixtures/admission/declared-pdf-nonpdf.bin
specs/004-local-pdf-core/fixtures/admission/truncated-pdf-like.pdf
specs/004-local-pdf-core/fixtures/admission/pdf-with-trailing-inert-bytes.pdf
```

## 3. Construction and rights evidence

Every materialized byte is authored specifically for Signthos in this grain.

```text
EXTERNAL_SOURCE_BYTES = 0
THIRD_PARTY_ASSETS = 0
PHI = 0
PERSONAL_DATA = 0
REAL_SIGNING_MATERIAL = 0
CREDENTIALS_OR_SECRETS = 0
MALWARE_OR_EXECUTABLE_PAYLOAD = 0
REDISTRIBUTION_ELIGIBILITY = ALLOWED
RIGHTS_BASIS = SIGNTHOS_AUTHORED_SYNTHETIC
```

No public sample, donor repository fixture, copied PDF, font file, image, script, archive, executable, certificate, private key, or model byte is included.

The ordinary PDF control is deterministically assembled from Signthos-authored ASCII PDF objects, a single built-in Helvetica font reference, one short literal text string, and an internally calculated xref table. `AUTHORED_INTENT = VALID_MINIMAL_PDF`; no parser/provider execution is performed by this grain, so `STRUCTURAL_PROVIDER_VALIDATION = NOT_EXECUTED`.

The trailing-byte fixture is the exact ordinary fixture followed by the inert ASCII marker `SIGNTHOS_TRAILING_INERT_BYTES_v1\n`. It is not claimed to be a true multi-runtime polyglot; it is a bounded mixed/trailing-content ambiguity seed.

## 4. Exact fixture identities

| Fixture | Adversarial purpose | SHA-256 | Byte length |
| --- | --- | --- | ---: |
| `ordinary-minimal.pdf` | `ORDINARY_PDF_CONTROL` | `d88bad0d23edfa87d2ee1dd41f8dc0b3909b8f32d5964e8deb144e87be689207` | 583 |
| `declared-pdf-nonpdf.bin` | `DECLARED_IDENTITY_MISMATCH` | `fecf1b6f0521397334ff12a71c066129c97bb5458e68cbe2e80aed8a3f92825c` | 86 |
| `truncated-pdf-like.pdf` | `STRUCTURAL_MALFORMED_INPUT` | `b315f2c38fee3e1ff098b8e815625bf47a6d8eced917cea06a158bad897e02c1` | 94 |
| `pdf-with-trailing-inert-bytes.pdf` | `POLYGLOT_OR_MIXED_CONTENT_AMBIGUITY` | `d21b6163ad783ee0aca73e17e5f1cd7f06183b751312fdce116d6695146ebec0` | 616 |

Digest equality is algorithm-and-value equality. Byte length is mandatory identity evidence.

## 5. Manifest contract

`fixtures/admission/manifest.json` carries four versioned `AdmissionFixtureRecord`-equivalent records.

Each record binds:

- one closed `adversarialPurpose`;
- `constructionClass = SIGNTHOS_AUTHORED_SYNTHETIC`;
- an operational `handlingClass`;
- exact algorithm-tagged SHA-256 plus byte length;
- authorship, construction, provenance and rights evidence;
- declared identity inputs independently from exact-byte truth;
- a pre-authored `QUALIFICATION` expectation contract;
- provider-neutral classifier and structural invariants;
- admission disposition constraints;
- read-only mutation expectations;
- materialization completeness states;
- `qualificationExecutionPerformed = false`.

No deterministic observation rule is selected in this materialization grain, therefore `deterministicExpectedObservations` is empty in the seed records. A later implementation unit may make one or more deterministic rules required only by creating a new versioned record before qualifying execution. Observed runtime output may not be backfilled into these expectations as an oracle.

Provider-neutral structural expectations intentionally avoid inventing parser-specific results before a provider identity/runtime is qualified.

## 6. Manifest file identity

The exact UTF-8 `manifest.json` file authored by this grain has:

```text
MANIFEST_FILE_SHA256 = e73b8cad3c6472ec360e83f636bf9f672c7b8a0917e21f3452d626e8f4121023
MANIFEST_FILE_BYTE_LENGTH = 14999
```

This is file-identity evidence only.

It is **not** claimed as the canonical `AdmissionCorpusIdentity.manifestDigest`, because the canonical fixture qualification explicitly requires the exact corpus-record serialization algorithm to be frozen separately before that digest becomes merge-critical runtime evidence.

## 7. Execution and dependency accounting

```text
PDF_PROVIDER_RUNTIME_EXECUTION = NOT_PERFORMMED
CLASSIFIER_RUNTIME_EXECUTION = NOT_PERFORMED
STRUCTURAL_PDF_RUNTIME_EXECUTION = NOT_PERFORMED
PDF_RENDERING = NOT_PERFORMED
PDF_PARSING = NOT_PERFORMMED
NETWORK_DOCUMENT_PROCESSING = NOT_PERFORMMED
DEPENDENCY_ACQUISITION_OR_INSTALLATION = NOT_PERFORMED
PACKAGE_JSON_MUTATION = NONE
PN@M_WORKSPACE_MUTATION = NONE
PNPM_LOCKFILE_MUTATION = NONE
NPMRC_MUTATION = NONE
SOURCE_IMPORT = NONE
EXTERNAL_FIXTURE_ACQUISITION = NONE
```

The only executable evidence-generation operations authorized and used by this grain are deterministic byte assembly plus SHA-256 and byte-length calculation over the newly authored synthetic bytes.

## 8. Security handling

All four fixtures are inert Signthos-authored test bytes.

- the non-PDF fixture is plain ASCII text;
- the truncated fixture contains incomplete PDF-like syntax only;
- the trailing-content fixture appends inert ASCII bytes only;
- no JavaScript, launch action, URI action, embedded executable, archive payload, network reference, malware-like payload, secret, or credential is present.

All fixtures remain untrusted input for any later runtime regardless of their synthetic origin.

## 9. Qualification boundary

This grain is complete only if:

1. final diff remains inside the six authorized paths;
2. exact SHA-256 and lengths above match the committed fixture bytes;
3. manifest records match the committed fixture identities;
4. no external or third-party bytes are introduced;
5. no dependency, package, workspace, lockfile, `.npmrc`, source runtime, provider, model, or workflow surface changes;
6. no PDF/classifier/provider runtime is executed as evidence;
7. exact-head independent substantive review finds no unresolved material defect;
8. unresolved material review threads are zero;
9. immediate premerge race proof confirms exact base/head/tree/surface/authority;
10. guarded normal merge uses the exact reviewed `expected_head_sha`;
11. postmerge verification proves canonical main, ordered parents, reviewed-head/merge-tree equality, signature and exact surface.

## 10. Successor boundary

This materialization grain grants no implementation authority by itself.

If it becomes canonical, the source-informed sequence makes a bounded provider-neutral admission implementation the next candidate. Fresh reconciliation must still name exact code/test paths, the exact deterministic rule surface, provider/runtime boundaries, test execution authority, fixture-record versioning requirements, and all applicable evidence gates before implementation begins.

```text
CONTENT_IDENTITY_IMPLEMENTATION = NOT_AUTHORIZED_BY_THIS_GRAIN
ADMISSION_IMPLEMENTATION = NOT_AUTHORIZED_BY_THIS_GRAIN
GENERAL_004C_PDF_RUNTIME = NOT_AUTHORIZED_BY_THIS_GRAIN
004C2 = NOT_AUTHORIZED_BY_THIS_GRAIN
004D = NOT_AUTHORIZED_BY_THIS_GRAIN
SPECIFICATION_005 = NOT_AUTHORIZED
```
