# 004C1ES — NOTICE/License Repository Adoption Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_REPOSITORY_ADOPTION_SURFACE_ONLY / ZERO_BUNDLE_IMPORT`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `b70f7264bd42afa684ef7cbc59aba34553400edf`
Canonical base tree: `82966f5234b60d047a463fdc5b2dd7416d375914`
Authority: `github:issue-comment:5651760671`

## 1. Purpose and authority boundary

004C1ER closed deterministic NOTICE/license inventory completeness outside the repository. 004C1ES defines only the smallest future Signthos repository adoption surface for that already-frozen evidence.

```text
AUTHORITY_CLASS = PLANNING_REPOSITORY_ADOPTION_SURFACE_ONLY
REPOSITORY_CHANGED_FILES_MAX = 1
004C1ER_BUNDLE_IMPORT = 0
ROOT_NOTICE_MUTATION = 0
LICENSES_MUTATION = 0
PROVENANCE_MUTATION = 0
PACKAGE_OR_LOCKFILE_MUTATION = 0
DEPENDENCY_INSTALLATION = 0
RUNTIME_EXECUTION = 0
NETWORK_ACQUISITION = 0
```

This unit does not copy, transform, install, execute, distribute, or adopt any upstream or generated bundle bytes.
## 2. Frozen 004C1ER evidence binding

The future adoption surface is bound to exactly this external evidence result:

```text
004C1ER_EVIDENCE_ROOT = /Users/abdulazizalsh/Signthos-evidence/004c1er-notice-inventory-20260913T064740Z
004C1EQ_INPUT_MAP_SHA256 = 0f642122adb49fcd88ada7dba04eb2cdc9ed2d5cc92a562a0807180d4f824835
CLOSURE_ROWS = 24
UNRESOLVED_ROWS = 0
UNIQUE_EXACT_EVIDENCE_FILES = 21
NOTICE_SHA256 = 9ce821c509d524f0744daa516cb4eb75683db10909b4e7535264a7a030cef5e3
INVENTORY_SHA256 = 2b564bb641ff544e25ecf12eb8e860d4537d5c8ea2faac301e517207bd9b37af
EVIDENCE_MANIFEST_SHA256 = 11f6f106712d0119967933e8049e81963e16c36915e975ce9147ed72da3000a0
NOTICE_BYTE_DETERMINISTIC = PASS
INVENTORY_BYTE_DETERMINISTIC = PASS
```

A later adoption unit must fail closed if any of these identities differ. Regeneration against changed inputs is a new evidence unit, not a repair inside adoption.

## 3. Minimal future repository surface

The later adoption mutation **must** introduce exactly one dedicated immutable-at-adoption subtree, and every changed path in that mutation must be one of the following exact paths:

```text
provenance/components/pdfium-2.15.0/NOTICE.generated.txt
provenance/components/pdfium-2.15.0/inventory.json
provenance/components/pdfium-2.15.0/licenses/01-0e16f9c228558326.txt
provenance/components/pdfium-2.15.0/licenses/02-1a8f1058753f1ba8.txt
provenance/components/pdfium-2.15.0/licenses/03-1fe9dea718fbd75c.txt
provenance/components/pdfium-2.15.0/licenses/04-451167c55c0fa447.txt
provenance/components/pdfium-2.15.0/licenses/05-4bb4d5664fb9d06e.txt
provenance/components/pdfium-2.15.0/licenses/06-539dd7aed86e8a4f.txt
provenance/components/pdfium-2.15.0/licenses/07-5a5ee54c5001bbad.txt
provenance/components/pdfium-2.15.0/licenses/08-620a78084fc7ca97.txt
provenance/components/pdfium-2.15.0/licenses/09-6dbd60437f8ef91d.txt
provenance/components/pdfium-2.15.0/licenses/10-75815e3bf6484201.txt
provenance/components/pdfium-2.15.0/licenses/11-96f5b328adbb78ee.txt
provenance/components/pdfium-2.15.0/licenses/12-a6af136f3e15038a.txt
provenance/components/pdfium-2.15.0/licenses/13-aa75ac798c2d4cd2.txt
provenance/components/pdfium-2.15.0/licenses/14-bc66b32f9a9562b6.txt
provenance/components/pdfium-2.15.0/licenses/15-bd36c8b474855fa2.txt
provenance/components/pdfium-2.15.0/licenses/16-bf5e22b9dce84640.txt
provenance/components/pdfium-2.15.0/licenses/17-c4120c6752c910c2.txt
provenance/components/pdfium-2.15.0/licenses/18-c79a7fea0e3cac04.txt
provenance/components/pdfium-2.15.0/licenses/19-e1cfcc55c325b3f7.txt
provenance/components/pdfium-2.15.0/licenses/20-e2b35be49f7284a4.txt
provenance/components/pdfium-2.15.0/licenses/21-f9bc4423732350eb.txt
provenance/components/pdfium-2.15.0/ADOPTION.json
```

This is the complete permitted changed-path set for the future adoption mutation: 24 files total. No path outside `provenance/components/pdfium-2.15.0/**` may change in that mutation. Any root `NOTICE`, `LICENSES/**`, package, lockfile, workflow, source/runtime, database, fixture, or deployment change requires separate later authority.

The 21 license filenames above are the exact frozen 004C1ER byte-derived names. Byte-identical evidence remains deduplicated exactly as 004C1ER proved; byte-different evidence remains separate. Human renaming or license-family normalization is prohibited.

`ADOPTION.json` is the repository provenance bridge. It must bind and exact-match:

- npm identity `@embedpdf/pdfium@2.15.0`;
- published WASM path `package/dist/pdfium.wasm`;
- published WASM byte size `4633788`;
- published WASM SHA-256 `c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8`;
- immutable 004C1EH evidence path `specs/004-local-pdf-core/evidence/004c1eh-published-wasm-identity-evidence-bundle.json`, byte size `2004`, and SHA-256 `9f8ebcefb7b9a1d8bda205bf0171f124d66b4437239fe9eeb31249e05edc9f34`;
- the canonical 004C1ER NOTICE, inventory, and evidence-manifest SHA-256 values;
- all adopted file paths, sizes, and SHA-256 values;
- the 24/24 closure coverage and zero-unresolved result;
- the canonical source/rebuild binding established by 004C1EH;
- the predecessor evidence authorities 004C1EP, 004C1EQ, and 004C1ER.

## 4. Existing repository licensing surfaces

The later adoption mutation must preserve existing repository semantics:

1. root `NOTICE` remains the Signthos project notice and must not be silently replaced by generated third-party material;
2. `LICENSES/AGPL-3.0-only.txt` remains the Signthos project license text;
3. the PDFium bundle belongs under `provenance/components/**` because it is dependency-specific redistribution/provenance evidence;
4. root `NOTICE` may gain only a short deterministic reference to the component subtree if a later explicit unit proves that reference is required;
5. package manifests, lockfiles, workflows, source/runtime packages, and deployment surfaces remain outside this adoption grain.

No SPDX or license-family normalization may discard exact evidence text. The repository copy must preserve the exact 004C1ER bytes for every adopted NOTICE, inventory, and license/attribution file.
## 5. Future adoption acceptance gates

A later repository adoption candidate may pass only if all of the following are proven on its exact head:

- canonical base and predecessor authority are reverified immediately before mutation;
- adopted `NOTICE.generated.txt` SHA-256 is exactly `9ce821c509d524f0744daa516cb4eb75683db10909b4e7535264a7a030cef5e3`;
- adopted `inventory.json` SHA-256 is exactly `2b564bb641ff544e25ecf12eb8e860d4537d5c8ea2faac301e517207bd9b37af`;
- every inventory-referenced license/attribution file exists under the component subtree and matches its frozen SHA-256;
- closure coverage remains exactly 24/24 with zero unresolved rows;
- adopted license/attribution files are exactly the 21 byte-distinct 004C1ER evidence objects, with no lossy normalization;
- `ADOPTION.json` deterministically binds all adopted paths and predecessor evidence identities;
- no unrelated source, runtime, package, lockfile, workflow, database, fixture, or deployment file changes;
- `git diff --check` passes and the exact changed surface matches the authorized adoption set;
- fresh independent substantive exact-head review reports no unresolved material finding;
- guarded normal merge uses the exact reviewed head and immediate premerge race proof;
- post-merge verification proves merge SHA/tree/parents/signature and exact changed paths.

## 6. Explicit non-grants

004C1ES does not authorize bundle import, root `NOTICE` mutation, `LICENSES/**` mutation, dependency installation, provider/browser runtime, PDF runtime, fixture execution, package or lockfile changes, network acquisition, container execution, Docker prune/reset, preserved-clone mutation, 004C2, 004D, Specification 005, release, deployment, or project completion.

## 7. Governance result and successor boundary

```text
004C1ES_RESULT = QUALIFIED_FUTURE_REPOSITORY_ADOPTION_SURFACE
004C1AD_ITEMS_1_TO_5 = EVIDENCE_CLOSED
004C1ER_BUNDLE_IMPORT = NOT_AUTHORIZED_BY_THIS_UNIT
DISTRIBUTION_ADOPTION_GATE = FAIL_CLOSED_PENDING_EXPLICIT_ADOPTION_MUTATION_AUTHORITY
PROVIDER_RUNTIME = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

After canonical merge, fresh Issue #7 reconciliation must decide whether to authorize the exact byte-for-byte component-subtree adoption mutation. No installation, runtime, distribution, or release authority follows from this planning qualification.