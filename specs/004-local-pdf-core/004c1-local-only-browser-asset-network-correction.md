# Specification 004C1 — Local-Only Browser Asset / Network Correction

Status: `FORWARD_ONLY_REVIEW_REPAIR / PLANNING_DISCOVERY_ONLY / ZERO_RUNTIME`
Issue: #7
Owning specification: `004-local-pdf-core`
Predecessor candidate: `004c1-browser-workspace-dependency-acquisition-qualification.md`
Canonical base: `43d2f79476190fbbc6cec65959d06c49405065ba`
Authority source: `github:issue-comment:5562814547`

## 1. Purpose

This correction records a material pinned-upstream discovery found during independent pre-merge self-audit of the 004C1 candidate.

The original 004C1 candidate correctly kept package installation, runtime execution, npm archive integrity, and dependency adoption unproven, but it did not make the selected EmbedPDF v2.15.0 browser candidate's built-in external-network defaults explicit enough for Signthos `LOCAL_ONLY` qualification.

That omission must be repaired before 004C1 can be merge-qualified.

This file supersedes only any 004C1 implication that the selected browser candidate can later be used with its upstream browser defaults while still satisfying Signthos `LOCAL_ONLY` semantics.

It does not change the selected planning candidate, install dependencies, execute the provider, or grant implementation authority.

## 2. Exact pinned evidence

The evidence below is bound to the already-selected immutable upstream source:

```text
repository = https://github.com/embedpdf/embed-pdf-viewer
release = v2.15.0
sourceRevision = 2cf7df3b594dfe46de2d85e6973ff50ea447a1ed
```

No moving upstream branch is used as merge-critical evidence.

### 2.1 Browser worker defaults to CDN font fallback

Pinned file:

```text
packages/engines/src/lib/pdfium/worker.ts
```

The worker imports `cdnFontConfig` and computes its effective font fallback as:

```text
fontFallback === null
  ? undefined
  : (fontFallback ?? cdnFontConfig)
```

The pinned source comments state that this uses CDN font fallback by default in the browser worker and that `null` explicitly disables it.

Therefore an omitted `fontFallback` option is not equivalent to a no-network configuration.

### 2.2 Default CDN font configuration uses jsDelivr and a moving version

Pinned file:

```text
packages/engines/src/lib/pdfium/cdn-fonts.ts
```

The default browser font configuration builds external URLs under:

```text
https://cdn.jsdelivr.net/npm
```

for the seven `@embedpdf/fonts-*` families and exports the default configuration using the version selector:

```text
latest
```

The pinned source states that these fonts are loaded on demand from jsDelivr when PDFium needs them.

Consequences:

1. default browser-worker fallback can cross an external network boundary;
2. the resource is not fully content-addressed by Signthos;
3. `@latest` is a moving dependency selector;
4. upstream source pinning alone does not pin the bytes later returned by that CDN URL;
5. successful rendering could become dependent on network availability and third-party mutable state.

### 2.3 Default font loader performs browser network requests

Pinned file:

```text
packages/engines/src/lib/pdfium/font-fallback.ts
```

When a custom `fontLoader` is not supplied, the fallback manager uses browser `XMLHttpRequest` to load the configured font URL.

Therefore merely listing local font packages as dependency candidates does not prevent a network request if the runtime continues to use the upstream default CDN configuration.

### 2.4 PDFium WASM also has an exported CDN convenience URL

Pinned file:

```text
packages/engines/src/lib/pdfium/index.ts
```

The package exports `DEFAULT_PDFIUM_WASM_URL` pointing at jsDelivr for `@embedpdf/pdfium` after build-time version replacement.

Pinned direct and worker engine factories accept a caller-supplied `wasmUrl` and fetch that URL.

Therefore a future Signthos adapter must not use the upstream CDN convenience URL for a capability declared `LOCAL_ONLY`.

This observation does not mean every URL-valued browser asset reference is forbidden. A browser may load an exact application-bundled/same-origin asset as part of its local software runtime. What is forbidden is an implicit or external network dependency that changes the capability from local execution into a third-party network transition.

## 3. Material finding

The 004C1 candidate must record:

```text
PINNED_UPSTREAM_BROWSER_WORKER_DEFAULT_FONT_NETWORK = PRESENT
PINNED_UPSTREAM_DEFAULT_FONT_HOST = cdn.jsdelivr.net
PINNED_UPSTREAM_DEFAULT_FONT_VERSION_SELECTOR = latest
PINNED_UPSTREAM_DEFAULT_FONT_LOADER = XMLHttpRequest
PINNED_UPSTREAM_PDFIUM_CDN_CONVENIENCE_URL = PRESENT
SIGNTHOS_LOCAL_ONLY_COMPATIBILITY_WITH_UPSTREAM_DEFAULTS = FAIL_CLOSED
```

This is a material planning finding because canonical Signthos rules require:

- `LOCAL_ONLY` for the 004C browser provider;
- no silent network transition;
- exact evidence binding;
- fail-closed unknown/unavailable behavior;
- no moving dependency reference as merge-critical runtime provenance.

The selected upstream candidate remains feasible only if a later acquisition/implementation grain owns and proves an explicit local-asset configuration.

## 4. Corrected future runtime contract

A future authorized 004C browser runtime must satisfy all of the following before it can claim `LOCAL_ONLY`:

```text
PDFIUM_WASM_SOURCE = EXACT_LOCAL_OR_APPLICATION_BUNDLED_ASSET
PDFIUM_WASM_EXTERNAL_CDN = FORBIDDEN
FONT_FALLBACK_MODE = EXPLICITLY_DISABLED_OR_EXACT_LOCAL_ASSETS
FONT_FALLBACK_EXTERNAL_CDN = FORBIDDEN
MOVING_FONT_VERSION_SELECTOR = FORBIDDEN
UNEXPECTED_DOCUMENT_PROCESSING_NETWORK = FAIL
NO_NETWORK_EVIDENCE = REQUIRED
```

### 4.1 WASM

The adapter must provide an explicit PDFium WASM location whose bytes are part of an exact qualified application/package artifact boundary.

The future qualification must bind at least:

- exact package/archive identity;
- exact WASM file path;
- algorithm-tagged digest of the shipped WASM bytes;
- applicable PDFium license/NOTICE obligations;
- application artifact/SBOM inclusion;
- exact adapter/configuration identity that selects those bytes.

The upstream `DEFAULT_PDFIUM_WASM_URL` must not be used by a Signthos `LOCAL_ONLY` runtime.

### 4.2 Font fallback option A — explicitly disabled

A future adapter may explicitly configure:

```text
fontFallback = null
```

if capability acceptance evidence proves that the resulting rendering/text behavior is sufficient for the declared supported corpus and that unsupported/missing-font behavior is surfaced honestly.

Disabling fallback must not convert missing glyphs or degraded rendering into fabricated completeness.

### 4.3 Font fallback option B — exact local assets

If fallback fonts are required, the future adapter may supply a Signthos-owned configuration only after the exact local assets are separately qualified.

That configuration must bind:

- exact font package/version/archive identity;
- exact font file paths;
- algorithm-tagged file digests where used as evidence;
- license expression and required notices for every shipped font family;
- SBOM representation;
- a local loader or local application asset URLs that cannot resolve to external hosts;
- deterministic mapping from charset/weight/style to qualified local file;
- failure behavior when a required local asset is missing.

It must not derive a runtime URL from `latest`, another moving tag, a public CDN, or an unqualified remote base URL.

## 5. Network policy for the browser provider

For 004C semantic capability execution, external network activity is deny-by-default.

The future adapter and test harness must distinguish:

```text
APPLICATION_BUNDLED_ASSET_READ
SAME_ORIGIN_STATIC_ASSET_READ
EXTERNAL_NETWORK_REQUEST
DOCUMENT_INITIATED_NETWORK_REQUEST
PROVIDER_DEFAULT_EXTERNAL_REQUEST
```

Only asset reads whose bytes are inside the exact qualified Signthos application/runtime distribution may be treated as local execution inputs.

No document processing path may silently cause:

- CDN font requests;
- CDN WASM requests;
- remote document fetches;
- document-embedded URI/resource fetches;
- telemetry containing document content;
- fallback to a hosted PDF service.

A request to an external origin during an asserted `LOCAL_ONLY` operation is a qualification failure, even if rendering otherwise succeeds.

## 6. Required future no-network evidence

A later runtime grain must prove the rule rather than relying on configuration review alone.

Minimum evidence must include deterministic instrumentation capable of observing browser network attempts while executing the relevant corpus.

The evidence must cover at least:

1. initialization of the PDFium worker;
2. loading of the exact WASM asset;
3. ordinary embedded-font rendering;
4. missing-font/fallback-triggering documents for every supported fallback family;
5. Arabic/RTL fixture coverage;
6. malformed input;
7. active-content/URI-bearing input;
8. encrypted input where applicable;
9. cancellation during rendering/search;
10. repeated cold/warm operation behavior.

Qualification must record the exact expected/observed request set.

External request count for document-processing resources must be zero for a `LOCAL_ONLY` claim.

No such runtime evidence exists in 004C1; this section is a future gate, not a result.

## 7. Dependency/provenance consequence

The previously recorded source-declared seven font packages remain relevant closure members because the upstream engine imports their font definitions for CDN fallback.

However their presence in the source dependency graph is not sufficient to authorize Signthos distribution.

Before local fallback assets can be shipped, a future acquisition grain must independently resolve:

```text
EXACT_FONT_REGISTRY_VERSIONS = UNPROVEN
EXACT_FONT_ARCHIVE_INTEGRITIES = UNPROVEN
EXACT_FONT_ARCHIVE_CONTENTS = UNPROVEN
EXACT_FONT_FILE_DIGESTS = UNPROVEN
FONT_LICENSE_NOTICE_SET = NOT_YET_BOUND_IN_SIGNTHOS
FONT_SBOM_ENTRIES = NOT_YET_BOUND_IN_SIGNTHOS
LOCAL_FONT_LOADER_CONFIGURATION = NOT_YET_IMPLEMENTED
```

The local-only correction therefore strengthens rather than relaxes the 004C1 dependency-acquisition gate.

## 8. Moving-reference prohibition

A future merge-critical runtime or distribution contract must not contain:

```text
@latest
latest
moving branch
unversioned public CDN asset
```

as the identity of PDFium/font/provider bytes.

If a public endpoint is used only during non-authoritative discovery, any artifact selected for adoption must still be rebound to exact immutable version/integrity/digest evidence before it can enter Signthos.

## 9. Error and availability semantics

Local asset absence or unsupported font behavior must normalize through canonical Signthos error/availability contracts rather than triggering network fallback.

Examples:

- required exact runtime asset absent -> fail closed as unavailable/invariant error according to the later exact adapter contract;
- unsupported font coverage -> explicit unsupported/degraded observation according to the later capability contract;
- external request attempted by provider configuration -> local-only invariant violation / qualification failure;
- CDN outage -> must be irrelevant to a qualified local-only path because the CDN is not part of that path.

No new stable domain error code is created by this planning correction.

## 10. Security and privacy consequence

Disabling hidden external fetch is security-relevant beyond availability.

External font/WASM requests can disclose operational metadata such as execution timing, application version/package paths, origin/referrer behavior, or document-dependent fallback timing.

004C1 does not claim a demonstrated exploit or disclosure. It records that such third-party requests are outside the permitted `LOCAL_ONLY` trust boundary and therefore must not exist in a qualified implementation.

## 11. Corrected acquisition gate

A later dependency-acquisition/runtime successor is not eligible until fresh live reconciliation can prove at least:

```text
SIGNTHOS_BROWSER_WORKSPACE_BOUNDARY = AUTHORIZED
SIGNTHOS_PACKAGE_MANAGER = AUTHORIZED
EXACT_REGISTRY_PACKAGE_GRAPH = PROVEN
EXACT_ARCHIVE_INTEGRITIES = PROVEN
REGISTRY_ARCHIVE_TO_PINNED_SOURCE_BINDING = PROVEN_OR_EXPLICITLY_CLASSIFIED
PDFIUM_WASM_DISTRIBUTION_NOTICE_SET = PROVEN
FONT_DISTRIBUTION_NOTICE_SET = PROVEN_IF_FONTS_SHIP
LOCAL_PDFIUM_ASSET_PLAN = PROVEN
LOCAL_FONT_FALLBACK_PLAN = EXPLICIT_DISABLED_OR_PROVEN_LOCAL
MOVING_CDN_REFERENCES_IN_QUALIFIED_RUNTIME = ZERO
FIXTURE_CORPUS = AUTHORIZED_AND_BOUND
NO_NETWORK_TEST_PLAN = BOUND
```

Passing 004C1 planning does not itself satisfy any runtime evidence row.

## 12. Adversarial cases added by this correction

A later implementation/evidence grain must include at least these cases:

### Case A — omitted upstream fontFallback option

Given the unmodified upstream browser worker factory configuration with no `fontFallback` option, qualification must expect a CDN fallback configuration to be selected and therefore reject that configuration for Signthos `LOCAL_ONLY` use.

### Case B — explicit null fallback

Given `fontFallback = null`, verify no font fallback network request occurs and characterize missing-font rendering honestly.

### Case C — exact local fallback assets

Given a future qualified local font config, verify every requested fallback file resolves only to exact local/application-bundled bytes and no external request occurs.

### Case D — moving CDN URL

Any `cdn.jsdelivr.net`, `@latest`, or equivalent moving external fallback reference in the actual qualified runtime configuration fails the local-only/provenance gate.

### Case E — remote PDFium WASM URL

A runtime configuration that initializes PDFium from an external CDN fails Signthos `LOCAL_ONLY` qualification even when the returned WASM happens to match an expected version.

### Case F — document-triggered missing font

A document that triggers a previously unused charset must not cause a new external request. The path must either use exact local assets or fail/degrade explicitly.

## 13. Explicit non-claims

This correction does not claim:

- that EmbedPDF is insecure generally;
- that upstream behavior violates upstream's own product contract;
- that any network request was executed by Signthos;
- that any dependency has been downloaded, installed, imported, or adopted;
- that exact npm archive integrities are known;
- that PDFium/font distribution rights/notices are complete;
- that a local font configuration has been implemented;
- that no-network runtime evidence has passed;
- that rendering is deterministic or complete;
- that 004C runtime implementation is authorized;
- that 004D or Specification 005 is authorized.

The finding is about incompatibility between observed pinned upstream defaults and Signthos's stricter local-only contract unless the future adapter overrides those defaults.

## 14. Corrected 004C1 state

After this forward-only correction, the candidate must be interpreted as:

```text
004C1_PINNED_UPSTREAM_NETWORK_DEFAULT_DISCOVERY = PRESENT
UPSTREAM_BROWSER_WORKER_DEFAULT_CDN_FONT_FALLBACK = PRESENT
UPSTREAM_CDN_FONT_SELECTOR = latest
UPSTREAM_DEFAULT_FONT_LOADER_CAN_REQUEST_NETWORK = PRESENT
UPSTREAM_PDFIUM_CDN_CONVENIENCE_URL = PRESENT
SIGNTHOS_ACCEPTS_UPSTREAM_BROWSER_NETWORK_DEFAULTS = NO
SIGNTHOS_QUALIFIED_WASM_SOURCE = LOCAL_EXACT_ASSET_REQUIRED
SIGNTHOS_QUALIFIED_FONT_FALLBACK = EXPLICIT_DISABLED_OR_LOCAL_EXACT_ASSETS_REQUIRED
EXTERNAL_CDN_IN_LOCAL_ONLY_RUNTIME = FORBIDDEN
NO_NETWORK_RUNTIME_EVIDENCE = ABSENT
DEPENDENCY_ADOPTION = NONE
DEPENDENCY_INSTALLATION = NONE
RUNTIME_EXECUTION = NONE
004C1_IMPLEMENTATION_AUTHORITY = ABSENT
004C2_RUNTIME_IMPLEMENTATION_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
004D_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_005_SUCCESSOR_AUTHORITY = ABSENT
```

## 15. Review consequence

The prior exact-head candidate `f7ea575f0e2b3dd3b86c7d5ab5c4cc1f15800501` is stale for merge qualification after this file is committed.

Any summary, status, review request, or future verdict attached only to that old head must not be reused as exact-head approval.

The complete amended head must receive:

1. exact final base/head/tree accounting;
2. clean diff-whitespace validation;
3. truthful Actions/status/provider accounting;
4. fresh independent substantive exact-head review covering both 004C1 files and this network correction;
5. zero unresolved material review conversations;
6. mandatory premerge proof;
7. guarded expected-head merge;
8. post-merge tree/parent/signature/surface/check verification;
9. fresh successor reconciliation before any acquisition/runtime/004D work.

No merge is authorized until those gates are satisfied.
