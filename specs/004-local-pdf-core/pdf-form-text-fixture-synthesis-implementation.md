# PDF_FORM_TEXT_FIXTURE_SYNTHESIS Implementation

Status: `IMPLEMENTATION_CANDIDATE / FORM_TEXT_FIXTURE_QUALIFIED`
Issue: #7
Authority: bounded fixture-synthesis-and-admission authority recorded on
Issue #7 in the successor reconciliation `github:issue-comment:5714176295`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit synthesizes exactly one deterministic admission fixture carrying a
fillable AcroForm text field, and admits it into the fixture manifest. It is
the precondition grain for the bounded form-fill runtime successor: no corpus
fixture carries a fillable text field (census: ordinary/multipage/trailing 0
annots; active 1 Link; signed 1 signature Widget, never fill-targeted), and
field creation is provider-blocked through the adopted binding
(`EPDFPage_CreateFormField` returns 0 under every locally determinable arg
convention, ~15 variants probed first-hand with and without the form
environment).

```text
UNIT = PDF_FORM_TEXT_FIXTURE_SYNTHESIS
AUTHORITY_CLASS = BOUNDED_FIXTURE_SYNTHESIS_AND_ADMISSION
CANONICAL_BASE = d3f477ef175bcde45c42acc77c43eb3e5ca50e74
CANONICAL_BASE_TREE = 95449c061382c57850e5003aa65acbaaf0c1cc9a
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 3
```

Authorized paths are exactly:

```text
specs/004-local-pdf-core/fixtures/admission/form-text-synthetic-v1.pdf
specs/004-local-pdf-core/fixtures/admission/manifest.json
specs/004-local-pdf-core/pdf-form-text-fixture-synthesis-implementation.md
```

## 2. Fixture construction contract

Byte-exact deterministic output of the generator embedded in the authority
record (fixed content, computed 10-digit xref offsets, no timestamps, no
third-party bytes): Catalog with AcroForm `/Fields`, one Page with one
Widget annot (`FT /Tx`, `T (grainfield)`, empty `/V`, `DA`, `Rect`), one
text content stream. The generator file itself stays outside the repo, per
the signed-structure precedent.

Fixture identity (measured, regeneration reproduces identical bytes):

```text
FIXTURE_BYTES = 653
FIXTURE_SHA256 = 5ed4505d2758e46d84e50647c5bd34296a127500bf4a5f265e76d588a73e3778
```

Manifest change only appends record `admission-seed-form-text-synthetic-v1`
(schema v1, class `FORM_TEXT_SYNTHETIC_PDF`, purpose
`FILLABLE_TEXT_FIELD_CONTROL`, exact digest + byte length, source/provenance
refs to the authority reconciliation, embedded-generator construction
evidence) plus the `recordOrdering` entry. No other record is touched. The
manifest digest is not merge-critical runtime evidence per the manifest's
own `corpusIdentityNote`.

## 3. Admission evidence (first-hand, Node v22.22.3, exact adopted package)

Canonical runtimes against the committed fixture bytes:

```text
inspect: openSucceeded true, pageCount 1
text extract: openSucceeded true, text "fill me"
render: openSucceeded true, 200x200
form surface: 1 annot of subtype Widget; FPDF_GetFormType 1 (AcroForm)
interactive fill: focus(true) + OnChar('H','I', true) + killFocus(true)
  persists /V (HI) in saved output
```

## 4. Complete applicable provider qualification

The manifest identity test iterates records dynamically, so the new record
is covered with zero new test files.

```text
TOTAL_TESTS = 1118
PASS = 1118
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = b22a63a11ebf41f3f8d8c4e37af2c5bd7608e86e2c31a6c29f844afc521bc21f
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 5. Network-denied execution evidence

Full suite under the external deny preload
(`/private/tmp/signthos-deny-preload.mjs`; macOS provides no `unshare`).

```text
NETWORK_TESTS = 1118
NETWORK_PASS = 1118
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = b60cc7a683544585d44bda0d1095e23af30b97b6337870f227a5d879fa208b79
NETWORK_STDOUT_SHA256 = 74cc07ea6891de8728e18f9de4a8310bc8d86f5f69d3f476b87644f6e1ed01d2
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The network log file is absent (no attempt was recorded); the absent-file
hash recorded is the empty-digest convention shared with prior grains.

## 6. Candidate file identities

```text
FIXTURE_SHA256 = 5ed4505d2758e46d84e50647c5bd34296a127500bf4a5f265e76d588a73e3778
MANIFEST_SHA256 = 98a471192fb61c4e802fa39e02e699fdc791814a9458fc27331ab77533145b56
```

## 7. Exact qualification claim

This candidate proves only that the synthetic form-text fixture is
deterministic, admitted into the manifest with exact identity, opens in all
three canonical read runtimes with the expected shape, and exposes one
fillable Widget field through the proven interactive FORM path — with zero
test changes and zero observed network attempts.

It does not prove the fill runtime (separate successor grain), field
creation, name-targeted fill (introspection getters return type -1 / name
length 0; recorded block), encoded content, or native/server parity.

## 8. Explicit non-grants

```text
FILL_RUNTIME = NOT_AUTHORIZED (separate successor grain)
FIELD_CREATION = NOT_AUTHORIZED / PROVIDER_BLOCKED
FORM_ENVIRONMENT_RUNTIME = NOT_AUTHORIZED
NAME_TARGETED_FILL = NOT_AUTHORIZED / PROVIDER_BLOCKED (getters unusable)
SUPERVISION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
REVISION_MINTING = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004G_K = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 9. Merge and successor gates

Same gates as prior grains on the three authorized paths. No successor
authority is inherited from this document; the fill-runtime reconciliation
follows canonical closure separately.

The final document SHA-256 is recorded in external GitHub qualification
evidence after the file is complete; the document does not contain a
self-referential digest.
