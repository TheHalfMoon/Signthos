# Specification 004B — PDFium Release Provenance Correction

Status: `QUALIFICATION_CANDIDATE / FORWARD_ONLY_REPAIR / ZERO_ADOPTION`
Issue: #7
Parent 004B artifact: `004b-engine-provenance-license-capability-feasibility-qualification.md`
Repair reason: fresh self-audit against immutable `bblanchon/pdfium-binaries` release metadata

## 1. Normative precedence

This file is a forward-only correction within the same bounded 004B discovery/qualification unit.

Where the parent 004B artifact implies that the public `bblanchon/pdfium-binaries` `chromium/7881` release does not expose per-asset digests, this correction supersedes that implication.

The following parent statements are therefore stale for the exact combined candidate and must be interpreted through this correction:

- Section 7.4 bullet `per-platform asset digest/checksum` as an unproven item;
- Section 7.6 blocker `EXACT_PDFIUM_ASSET_SOURCE_BUILD_DIGEST_NOTICE_MATRIX_INCOMPLETE` to the extent it treats asset digest availability itself as missing;
- Section 10 native-candidate blocker wording to the same extent;
- Section 11.3 requirement for an exact binary digest to the extent it implies no immutable public digest is available;
- Section 16 item 5 to the extent it treats per-platform digest availability itself as incomplete.

All other fail-closed boundaries in the parent artifact remain in force.

This correction does not adopt, install, download into Signthos, execute, package, ship, or select any PDFium binary, Rust binding, or provider.

## 2. Fresh immutable release evidence

Fresh GitHub release evidence for:

```text
repository = https://github.com/bblanchon/pdfium-binaries
releaseTag = chromium/7881
releaseName = PDFium 151.0.7881.0
releaseId = 336103186
immutable = true
prerelease = false
publishedAt = 2026-06-08T17:07:25Z
```

shows that the release contains platform artifacts whose GitHub release-asset metadata exposes SHA-256 digests.

Examples observed directly in immutable release metadata include:

```text
pdfium-android-arm.tgz
  sha256 = 57f7f5c349a3268f39b1737f830e50e271aa3116417abed2c30d0c0840b1b58b

pdfium-android-arm64.tgz
  sha256 = 16d23bb86c4188d59326dc509938f59df3c417ecfdd3d2ca2f160dc5bd49a839

pdfium-android-x64.tgz
  sha256 = 58bd708d6083173008c63860dbffa93396a2fee00dd76747cbd782bcf4ff9bd4

pdfium-android-x86.tgz
  sha256 = 55be706424a3276176642ae36f05d6ab89f84e2f149f5d7149a086850157cb23

pdfium-attestation.json
  sha256 = 24dec7cd76acb81106a0c29b908cceceef8215b050f6ff6ffbf875465811ef60
```

The same release metadata exposes SHA-256 digest fields for additional platform assets.

Evidence class: `VERIFIED_IMMUTABLE_METADATA`.

Therefore:

```text
CHROMIUM_7881_RELEASE_IMMUTABLE = VERIFIED
CHROMIUM_7881_RELEASE_ASSET_DIGEST_METADATA = PRESENT
CHROMIUM_7881_PER_ASSET_SHA256_AVAILABILITY = VERIFIED
CHROMIUM_7881_ATTESTATION_ASSET = PRESENT
```

004B must not continue to classify public digest availability itself as missing.

## 3. Build-pipeline evidence

At the immutable repository commit associated with the `chromium/7881` tag, the public build workflow documents a pipeline that:

- checks out the binary-build repository;
- configures a PDFium source checkout from `https://pdfium.googlesource.com/pdfium.git`;
- accepts a PDFium branch/version input;
- applies repository patches;
- configures and builds target artifacts;
- stages outputs;
- collects licenses;
- tests the build;
- creates release artifacts;
- generates SHA-256 checksums for `pdfium-*.tgz`;
- invokes GitHub build-provenance attestation for those artifacts.

The checkout script uses:

```text
gclient sync -r "origin/${PDFium_BRANCH:-main}" --no-history --shallow
```

and the release workflow only publishes through the release path when the branch begins with `chromium/` and a version is supplied.

Evidence class: `VERIFIED_IMMUTABLE_METADATA` for the workflow and scripts.

This proves the existence and declared shape of a source/build/checksum/attestation pipeline. It does not by itself prove that every semantic input for the exact `chromium/7881` release has been independently reconstructed or verified by Signthos.

## 4. Remaining provenance gaps

The repair narrows the blocker; it does not remove the adoption gate.

Before Signthos could adopt a native PDFium asset from this release family, a separately authorized unit must still bind and verify, for the exact selected target artifact:

1. the exact upstream PDFium source revision resolved by the `chromium/7881` build input;
2. the exact build-repository revision and patch set used by the release run;
3. the exact target OS, architecture, environment, V8/XFA/Skia and other compile-time feature disposition;
4. the release asset SHA-256 selected by Signthos;
5. the attestation statement and its subject digest against that exact asset;
6. the attestation builder/source/workflow identity and relevant build parameters;
7. the exact collected license/NOTICE payload distributed with the selected asset;
8. bundled/transitive component inventory and SBOM mapping;
9. update/advisory response path for both upstream PDFium and the prebuilt distribution;
10. Signthos platform compatibility and packaging evidence;
11. hostile-input, resource, cancellation, isolation and no-silent-network evidence;
12. corpus/performance evidence required by canonical 004A.

Therefore the accurate blocker is not `asset digest unavailable`.

It is:

```text
EXACT_SELECTED_ASSET_SOURCE_BUILD_ATTESTATION_NOTICE_BINDING = INCOMPLETE
```

## 5. `pdfium-render` separation remains unchanged

The crates.io evidence for `pdfium-render 0.9.4` remains distinct from the prebuilt PDFium release evidence.

```text
crate = pdfium-render
version = 0.9.4
registryChecksum = 8948a803616a9e936b15a6637af2cd48c5fb8ae0fcdeb3c32eac3a540e255a19
pdfium_latest = pdfium_7881
```

The public Git repository still lacks an exact `0.9.4` or `v0.9.4` Git ref in the evidence gathered by 004B. Commit `4176e8a53511fa4c3647c7772ad481be07ec030c` declares version `0.9.4`, but 004B has not proven byte/source equivalence between that untagged Git tree and the crates.io archive identified by the registry checksum.

Therefore:

```text
CRATE_0_9_4_TO_GIT_COMMIT_EQUIVALENCE = UNPROVEN
```

remains a valid adoption blocker.

The `pdfium_7881` feature remains an API-definition/release-family pin, not proof that any particular native binary is the binary Signthos would ship.

## 6. Corrected candidate disposition

The combined 004B candidate must now be read as:

```text
PDFIUM_RENDER_0_9_4 = FEASIBLE_NATIVE_BINDING_CANDIDATE_WITH_BLOCKING_SOURCE_BUILD_ATTESTATION_AND_RUNTIME_GAPS

CHROMIUM_7881_RELEASE = IMMUTABLE_RELEASE_WITH_PUBLIC_ASSET_SHA256_AND_ATTESTATION_ASSET

PDFIUM_NATIVE_ADOPTION = BLOCKED_PENDING_EXACT_SELECTED_ASSET_SOURCE_BUILD_ATTESTATION_NOTICE_PLATFORM_AND_RUNTIME_BINDING
```

This is more precise than the parent wording because it preserves evidence that actually exists while retaining the adoption blockers that remain genuinely unproven.

## 7. Security and runtime claims remain deferred

Neither public SHA-256 release metadata nor the existence of an attestation artifact proves:

- runtime correctness;
- hostile-input safety;
- parser/renderer isolation;
- resource-budget compliance;
- cancellation/deadline compliance;
- no-silent-network behavior;
- active-content non-execution;
- browser/native convergence;
- redaction safety;
- signature preservation;
- performance targets;
- Signthos packaging/distribution compatibility.

Those remain `DEFERRED_RUNTIME_EVIDENCE` or later-specification evidence as applicable.

## 8. Corrected blocker ledger

For the native PDFium direction, current 004B blockers are:

```text
NATIVE_PDFIUM_BLOCKERS = [
  CRATE_0_9_4_TO_GIT_COMMIT_EQUIVALENCE_UNPROVEN,
  EXACT_SELECTED_ASSET_SOURCE_REVISION_BINDING_INCOMPLETE,
  EXACT_SELECTED_ASSET_BUILD_INPUT_AND_PATCH_BINDING_INCOMPLETE,
  EXACT_SELECTED_ASSET_ATTESTATION_VERIFICATION_INCOMPLETE,
  EXACT_SELECTED_ASSET_NOTICE_AND_TRANSITIVE_COMPONENT_BINDING_INCOMPLETE,
  EXACT_SELECTED_PLATFORM_COMPATIBILITY_UNPROVEN,
  CORPUS_RUNTIME_SECURITY_PERFORMANCE_EVIDENCE_ABSENT
]
```

`PER_ASSET_SHA256_AVAILABILITY` is intentionally absent from this blocker list because the immutable release metadata proves those digest fields exist.

## 9. Authority remains unchanged

This repair is still entirely within:

```text
004B_AUTHORITY = DISCOVERY_QUALIFICATION_ONLY
```

It creates no:

- implementation authority;
- dependency adoption or acquisition authority;
- source import authority;
- external fixture acquisition authority;
- provider execution authority;
- package/lockfile/Cargo/workflow/container/database/product mutation authority;
- 004C authority;
- Specification 005 authority.

No upstream binary or source bytes are added to Signthos by this repair.

## 10. Changed-head review requirement

Because this correction changes the exact PR head, every substantive verdict for the previous head is stale for merge qualification.

A fresh independent review of the complete new base-to-head range must verify both the parent 004B artifact and this correction together.

The reviewer must specifically confirm that:

1. the correction accurately records immutable release/digest evidence;
2. stale parent statements are normatively superseded rather than silently retained as current conclusions;
3. public asset digests are not confused with complete source/build provenance;
4. attestation-asset existence is not confused with independent verification of the attestation statement;
5. no dependency/provider/adoption authority is inferred;
6. the remaining blocker ledger is fail-closed and evidence-based;
7. 004C remains unauthorized pending canonical 004B completion and live successor reconciliation.
