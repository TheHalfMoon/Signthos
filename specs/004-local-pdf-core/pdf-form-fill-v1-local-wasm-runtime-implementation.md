# PDF_FORM_FILL_V1 Local WASM Runtime Implementation

Status: `IMPLEMENTATION_CANDIDATE / FORM_FILL_RUNTIME_QUALIFIED`
Issue: #7
Authority: bounded implementation-and-qualification authority recorded on Issue #7
in the successor reconciliation `github:issue-comment:5714225324`
Owning specification: `004-local-pdf-core`

## 1. Purpose and bounded authority

This unit implements the fourth 004F content grain: single-widget text fill
through the interactive FORM path (focus, per-character typing, release),
saving through the flatten-grain-proven `PDFiumExt` writer path. On canonical
closure of this unit, the fourth 004F grain is established; 004F then holds
text placement, image placement, page flatten, and form-text fill, with field
creation and name-targeted fill recorded provider-blocked.

```text
UNIT = PDF_FORM_FILL_V1_LOCAL_WASM_RUNTIME_IMPLEMENTATION
AUTHORITY_CLASS = BOUNDED_IMPLEMENTATION_AND_QUALIFICATION
CANONICAL_BASE = 7e6ea2181f8f8dc2f212fd3e56ff676aa1467cee
CANONICAL_BASE_TREE = 60be73ea5b9d1f7211ef49fab62fdd5f5f398bdb
SIDE_EFFECT_CLASS = REVISION_CREATING
MAX_CHANGED_FILES = 4
EXACT_ENTRY_POINT = fillPdfFormTextWithLocalWasm
```

Authorized paths are exactly (no new fixture required):

```text
packages/providers/package.json
packages/providers/src/pdf/browser/pdf-form-fill-runtime.js
packages/providers/test/pdf-form-fill-runtime.test.js
specs/004-local-pdf-core/pdf-form-fill-v1-local-wasm-runtime-implementation.md
```

## 2. Implementation contract

The runtime exports `fillPdfFormTextWithLocalWasm` and the frozen
`FORM_FILL_RESOURCE_BUDGETS` constant (`maxInputBytes`/`maxOutputBytes`
64 MiB, `maxFillChars` 500), and nothing else. The module object is frozen.

Inputs are validated before any PDFium call: `wasmBinary` non-empty bytes
(max 64 MiB, budget error names the exact byte length), `bytes` non-empty
(max 64 MiB), `pageIndex` and `widgetIndex` safe integers >= 0, `value`
1..500 printable ASCII 0x20..0x7E excluding `(` `)` `\` (PDF
string-literal metacharacters; the `/V`-literal proof needs the value to
persist verbatim, so anything else is INVALID_INPUT with exact
diagnostics). Option-surface discipline mirrors prior grains: only the six
declared keys are read, unknown keys throw, accessor values throw, and
per-read getters are never invoked more than once.

Gates, all before any mutation: `FPDF_GetFormType` must report AcroForm (1),
else "document has no AcroForm form to fill"; `signatureCount` must be 0,
else "signed documents are not fill targets" (filling would break
signatures, and the only corpus signature carrier is a Widget the runtime
must never touch); `pageIndex` in range; the `widgetIndex`-th
Widget-subtype annot must exist on the page, else "no widget annotation at
widgetIndex" (non-widget annots are skipped by subtype and closed
immediately, never focused).

Mechanism: single `initPdfium` call; open the input allocation with the
proven exact-head-decode readback; pass the gates; open the form-fill info
and initialize the form environment; load the target page; notify page load;
iterate annotations (non-targets closed immediately, target kept); focus the
target with per-call success gate; type each character with a per-character
success gate; release focus with a success gate; close the target annot;
notify pre-close; close the page; read the output signature count; save
through the `PDFiumExt` writer with readout and output budget; require the
`/V(value)` literal (spaced form accepted as the same object) in the saved
bytes — a missing proof fails closed in the safe direction; decode the
output head-exactly and validate it by reopening before publish.

Failure hygiene: every gate and every focus/type/release failure publishes
nothing; annot handles are closed exactly once on all paths (immediate
close during iteration plus tracked-slot cleanup); the form environment is
exited and its info closed on all paths after opening; pre-close runs on
failure paths that passed page-load notification. Save-gate errors never
touch the mutation surface: out-of-range indices, non-form documents, and
signed documents fail with zero form-environment allocation. JS-action
functions appear nowhere in the surface; the interactive path types
characters only.

The result is one frozen object: input identity (`inputByteLength`, sha256
`inputDigest`, `pageCount`, `signatureCount` 0,
`signatureStructurePresent` false by gate), `pageIndex`, `widgetIndex`,
`filledValue`, caller-owned `outputBytes`, `outputByteLength`, sha256
`outputDigest`, and frozen `providerIdentity`. No preservation fields. No
revision minting.

Recorded provider blocks constraining this contract (all probed first-hand,
~25 variants): field creation returns 0 under every convention;
`SetFormFieldValue` false/OOB under every convention; classic
`SetStringValue('V')` returns true but persists nothing; field-introspection
getters return type -1 / name length 0 / value length 0. Hence widget-index
(not name) targeting and the `/V`-literal (not getter) proof.

Stable errors use the 004A vocabulary; `AggregateError` discipline; no
retry.

## 3. Local-only boundary

Only `node:crypto` and `node:util` imports; no package import in src; no
network/asset/active-content/JS-action identifiers (static assertions in
the suite).

## 4. Focused form-fill qualification

Environment mirrors prior grains (external `NODE_PATH`, Node v22.22.3, exact
adopted package + WASM).

Focused coverage proves, at minimum:

```text
exact option surface (six keys); proxy/accessor/unknown-key rejection;
  paren/backslash/non-ASCII rejection with exact diagnostics
full lifecycle order with per-character typing events and exact cleanup
  order (writer, target annot, page, form exit, form info, doc, library)
gate failures (non-form, signed, out-of-range page, no-widget) stop before
  any mutation surface with full teardown
focus/type/release failures publish nothing with environment teardown
missing /V proof fails closed after a complete save
input/output budgets; aggregation; caller-mutation immunity
real fill persists /V(HI Brown), preserves text, reopens valid, renders
real ordinary/signed/active negatives fail at the documented gate with
  sources unchanged (widget gate covered by stubs: no corpus fixture pairs
  AcroForm with a non-widget annot)
real out-of-range/truncated/non-PDF failures; source bytes unchanged
adopted package 2.15.0 + WASM 4633788 bytes c0af5a6a pinned in-suite
```

Focused results:

```text
FOCUSED_TESTS = 14
FOCUSED_PASS = 14
FOCUSED_FAIL = 0
FOCUSED_STDOUT_SHA256 = 4b4fdc5a771f604cfcf01cad1f52664898a9b8013123a8f3b4e50d5fbb98c2b9
FOCUSED_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

## 5. Network-denied execution evidence

Same external deny preload method as prior grains
(`/private/tmp/signthos-deny-preload.mjs`; macOS provides no `unshare`).

```text
NETWORK_TESTS = 14
NETWORK_PASS = 14
NETWORK_FAIL = 0
NETWORK_ATTEMPTS = 0
NETWORK_DENY_SHA256 = b60cc7a683544585d44bda0d1095e23af30b97b6337870f227a5d879fa208b79
NETWORK_STDOUT_SHA256 = 15342807e91dc62b2c904d257b67f6faec111fcc1e8e0311786a8744ac94a3ed
NETWORK_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
NETWORK_LOG_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

The network log file is absent (no attempt was recorded); the absent-file
hash recorded is the empty-digest convention shared with prior grains.

## 6. Complete applicable provider qualification

```text
TOTAL_TESTS = 1132
PASS = 1132
FAIL = 0
CANCELLED = 0
SKIPPED = 0
TODO = 0
FULL_STDOUT_SHA256 = a2f2eac081eb9ee3eb1272a7d35e52087e2a6b1b4fa4989719349b0e922c7863
FULL_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
GIT_DIFF_CHECK = PASS
PRE_POST_GIT_STATUS_BYTE_EQUAL = YES
```

## 7. Candidate file identities

```text
FORM_FILL_SOURCE_SHA256 = 162c5c5657ed8bad663c7a5c0b1b52e1973c02f16edef4ac43dfd84e4ef757af
FORM_FILL_TEST_SHA256 = 520daaa9319e5fed6c936dae0c84051fbef33771c0ad01b71e8b2aadee4c558e
PROVIDERS_PACKAGE_JSON_SHA256 = 967ad397b0bcacc84d2eca49254e5f638beb898a1fc3b224daf3e200549849f0
```

The package-manifest change only appends `test/pdf-form-fill-runtime.test.js`.
It changes no dependency declaration.

## 8. Exact qualification claim

This candidate proves only that single-widget interactive text fill through
the exact adopted runtime produces one independently valid revision
candidate with the value persisted as `/V(value)`, validates it through
independent canonical paths, refuses non-form and signed documents and
missing widgets closed with zero publication, fails every invalid input
closed, and performs no observed network attempt.

It does not prove field creation, name-targeted fill, non-ASCII fill,
checkbox/radio/choice semantics, fill-plus-flatten composition, supervision
layers, revision minting, signature preservation, corpus-wide
compatibility, performance bounds, or native/server parity.

## 9. Explicit non-grants

```text
FIELD_CREATION = NOT_AUTHORIZED / PROVIDER_BLOCKED
NAME_TARGETED_FILL = NOT_AUTHORIZED / PROVIDER_BLOCKED
NON_ASCII_FILL = NOT_AUTHORIZED / NOT_IMPLEMENTED
NON_TEXT_WIDGET_SEMANTICS = NOT_AUTHORIZED / NOT_CLAIMED
FILL_PLUS_FLATTEN_COMPOSITION = NOT_AUTHORIZED
JS_ACTION_EXECUTION = NOT_AUTHORIZED (no such surface anywhere)
MUTATION_SUPERVISION_COMPOSITION_LAYERS = NOT_AUTHORIZED / NOT_IMPLEMENTED
DOCUMENT_REVISION_MINTING_OR_ALIAS_MOVEMENT = NOT_AUTHORIZED
SIGNATURE_VALIDITY_OR_PRESERVATION_CLAIM = NOT_AUTHORIZED / NOT_MADE
SPECIFICATION_005 = NOT_AUTHORIZED
004G_K = NOT_AUTHORIZED (beyond 004F fourth grain)
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

## 10. Merge and successor gates

Same gates as prior grains on the four authorized paths. No successor
authority is inherited from this document; the next reconciliation follows
canonical closure separately.

The final document SHA-256 is recorded in external GitHub qualification
evidence after the file is complete; the document does not contain a
self-referential digest.
