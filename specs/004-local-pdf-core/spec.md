# Specification 004 — Local PDF Core

Status: `STAGE_P_CANDIDATE / PLANNING_ONLY / ZERO_IMPLEMENTATION_AUTHORITY`
Issue: #7
Canonical predecessor: Specification 003 `CLOSED_CANONICAL`
Predecessor merge: `dd996f11b701679b941c1fb3fd3e8bdc880f2506`

## Authority boundary

This Stage P artifact is authorized by `github:issue-comment:5562123379` only for Signthos-authored planning under `specs/004-local-pdf-core/**`.

It does not authorize product/runtime code, source import, dependency acquisition, package or lockfile mutation, Cargo changes, PDF engine execution, provider/network execution, Prisma/database mutation, signing implementation, deployment, credentials, or Specification 005 work.

Candidate engines and versions mentioned here are discovery inputs only. No candidate is adopted by this specification.

## Problem

Signthos needs a local-first PDF capability layer that can inspect, render, transform, compare, redact, and prepare document revisions without coupling domain semantics to one parser, renderer, native binary, browser library, or heavyweight external processor.

PDF input is untrusted. Engines may disagree, malformed inputs may trigger unsafe behavior, document transformations may invalidate or supersede signed bytes, and local-mode privacy would be violated by silent remote processing. The PDF core therefore needs stable capability contracts, explicit revision semantics, bounded resource behavior, exact provider provenance, and independently verifiable safety claims before implementation is authorized.

## Goals

1. Consume canonical Specification 003 domain contracts without reopening them.
2. Define a provider-neutral PDF capability model for browser, native/server, and optional heavyweight processors.
3. Classify every operation by its effect on document revision identity and signing eligibility.
4. Preserve local-first behavior: supported local operations never silently upload document bytes.
5. Treat every PDF as untrusted input with explicit resource, cancellation, timeout, and isolation contracts.
6. Define a legally redistributable, versioned fixture corpus sufficient for deterministic contract/security/performance qualification.
7. Require exact package/crate/source/binary provenance, licenses, notices, SBOM evidence, vulnerability posture, and update path before engine adoption.
8. Make redaction safety, signature-preservation behavior, and cross-provider equivalence independently testable rather than inferred from UI output.
9. Decompose implementation into bounded dependency-ordered grains instead of one PDF monolith.

## Non-goals

Stage P does not:

- select or install EmbedPDF, PDFium, `@libpdf/core`, `pdfium-render`, `lopdf`, MuPDF, Stirling, OCR engines, office converters, repair/compression tools, or archival processors;
- add implementation packages, binaries, bindings, workers, APIs, UI, migrations, workflows, or deployment assets;
- execute PDF parsing/rendering/editing/redaction/OCR/conversion/signing/verification;
- prove browser/native performance, redaction safety, signature preservation, PDF/A conformance, release readiness, or redistribution compatibility;
- alter Specification 003 `Document`, `DocumentRevision`, `Envelope`, provider, authorization/error, persistence, or naming contracts;
- define cryptographic signing semantics owned by Specification 005;
- infer Specification 005 implementation authority from roadmap ordering.

## Canonical predecessor contracts consumed

Specification 004 consumes, but does not redefine:

- immutable `DocumentRevision` identity and exact-content digest semantics;
- explicit new-revision behavior for content-changing output;
- stable provider capability/result/error boundaries;
- authorization/resource identity and tenant-scoping contracts;
- stable machine-readable error and retry classes;
- persistence anti-corruption boundaries around imported Prisma state;
- bounded product naming/configuration semantics.

Any apparent conflict with canonical Specification 003 must fail closed and be reconciled in a separately authorized governance unit rather than silently overridden here.

## Operation effect taxonomy

Every future PDF capability must declare exactly one primary operation class and any applicable constraints.

### `READ_ONLY`

The operation may inspect or render bytes without producing a canonical replacement revision. Examples include metadata inspection, page geometry inspection, rendering, text extraction for local display, and comparison analysis when no output PDF is produced.

Requirements:

- source `DocumentRevision` identity remains unchanged;
- provider output is non-authoritative unless a later contract explicitly promotes it;
- no persistent mutation is implied by successful analysis.

### `REVISION_CREATING`

The operation produces new document bytes and therefore must create a new `DocumentRevision` whose digest is computed from the exact resulting bytes. Examples include page reorder/rotate/remove/extract when persisted, merge/split outputs, annotations baked into output, form filling, watermark/stamp/page numbering, metadata/attachment mutation, sanitization, redaction, compression, repair, OCR-overlay output, and conversion.

Requirements:

- original revision remains addressable and unchanged;
- no in-place overwrite of a signed or otherwise canonical revision;
- output provenance binds source revision(s), operation request, provider identity/version, and exact output digest where later implementation authority permits persistence.

### `SIGNATURE_CREATING`

Cryptographic signature creation is outside Specification 004 and belongs to Specification 005. Specification 004 may preserve or inspect existing signature-related structure only under explicitly qualified capability semantics.

### `VERIFICATION_ONLY`

Independent signature/evidence verification is owned by Specification 005. Specification 004 may expose parser facts needed by a verifier only when a later bounded contract authorizes them.

### `OUT_OF_SPEC_004`

Any operation that primarily changes routing/envelope state, identity/authentication, legal-effect assertions, trust-provider behavior, delivery, workflow automation, public API contracts, or deployment operations is outside Specification 004.

## Capability groups

The planned PDF capability surface is partitioned as follows. These groups are planning candidates, not implementation authority.

1. Inspect and render.
2. Page reorder, rotate, remove, and extract.
3. Merge and split.
4. Annotation, text, and image placement.
5. Form inspection and fill.
6. Watermark, stamp, and page numbering.
7. Metadata and attachments.
8. Redaction and sanitize.
9. Compare.
10. Compression and repair.
11. OCR and conversion through optional bounded providers.
12. Cross-provider convergence and corpus qualification.
13. Specification 004 convergence closeout.

No capability group may inherit authority merely because a prior numbered group becomes canonical.

## Provider model

Specification 004 preserves a multi-engine architecture until later evidence proves a narrower choice.

A future provider contract must declare at least:

- stable provider identity;
- exact implementation/version identity;
- platform/runtime class;
- supported capability IDs;
- operation effect classes;
- input constraints;
- output contract;
- deterministic or nondeterministic characteristics;
- timeout/cancellation behavior;
- resource-limit behavior;
- encrypted-input behavior;
- malformed-input behavior;
- active-content handling;
- network behavior;
- sandbox/isolation expectations;
- logging/telemetry behavior;
- license/provenance evidence references;
- unsupported/unknown states without coercion to success.

Browser, native/server, and heavyweight providers must not create hidden domain forks. When multiple providers claim the same capability, later qualification must prove semantic convergence on a shared fixture set or narrow the advertised capability.

## Trust and locality boundaries

### Untrusted document boundary

All uploaded, opened, imported, generated-by-third-party, or externally supplied PDFs are untrusted input.

Future implementations must fail safely on malformed structures, recursive/cyclic objects, huge object counts, extreme dimensions, decompression bombs, pathological fonts/images, malformed incremental updates, embedded files, and unsupported encryption.

### Active content

JavaScript, launch actions, embedded files, external references, rich media, forms with active behavior, and similar active-content features must be classified explicitly. No active content may execute merely because a document is inspected or rendered.

### Encrypted inputs

Encrypted/password-protected PDFs require explicit capability behavior. Unsupported encryption must return a stable unsupported/error result, not partial silent success. Password/key material must never appear in ordinary logs or telemetry.

### Resource exhaustion

Future capabilities must define bounded file size, page count, object count, decoded image limits, memory, CPU/time, recursion/depth, temporary storage, and output-size limits appropriate to the provider/runtime.

Limit exhaustion must be distinguishable from malformed input and provider failure.

### Cancellation and timeout

Long-running work must be cancellable where technically possible. Timeout/cancellation results must not be represented as completed output. Operations with uncertain side effects must obey the stable retry semantics inherited from Specification 003.

### Sandbox and isolation

Native parsers/renderers and heavyweight converters are separate trust boundaries. A later implementation grain must justify process/worker isolation and privilege scope for each selected provider. Parser/converter workers must have no ambient access to signing keys or unrelated control-plane secrets.

### Local-first and network behavior

A local capability must not upload document bytes, extracted text, page images, metadata, or derived content without an explicit network transition authorized by a later specification. Network-capable optional providers require explicit invocation and observable data-flow semantics.

### Logging and privacy

Logs and diagnostics must be content-minimizing. Raw document bytes, passwords, signing material, extracted document text, or sensitive embedded content must not be logged by default.

## Fixture and corpus contract

A future canonical corpus must be versioned, legally redistributable, deterministic to acquire or reproduce, and provenance-classified. Each fixture needs a stable ID, origin/generation method, license/permission basis, expected structural properties, sensitivity classification, and intended assertions.

The minimum corpus classes are:

- minimal valid PDFs;
- representative typical documents;
- forms and annotations;
- fonts, Unicode, images, transparency, and mixed page geometry;
- Arabic and RTL content/rendering cases;
- malformed and truncated inputs;
- encrypted/password-protected inputs;
- incremental-update and signed-document structures;
- attachments and active-content cases;
- redaction-recovery adversarial cases;
- large files/pages/object graphs and decompression/resource-limit cases;
- provider-differential cases known to expose parser/rendering disagreement.

No fixture may be added merely because it is downloadable. Rights and redistribution basis are part of corpus qualification.

## Redaction safety invariant

Redaction is not proven by visual appearance.

Any future redaction implementation must create a new revision and must be independently checked at exported-file level using a parser/toolchain independent from the producing path where practical. Qualification must attempt recovery from content streams, alternate representations, annotations, metadata, attachments, incremental updates, object remnants, and other recoverable structures relevant to the redaction target.

A redaction capability cannot be advertised as safe while independent recovery evidence is absent or inconclusive.

## Existing signatures and incremental updates

Specification 004 must not silently claim that a transformation preserves cryptographic validity or legal meaning.

Future providers must classify whether an operation:

- is read-only and leaves bytes untouched;
- creates a new revision while retaining prior signed revision history separately;
- performs an incremental update whose effect on existing signatures must be independently evaluated;
- requires rejecting the operation because semantics are not safely characterized.

Specification 005 owns signing and verification conclusions.

## Provenance and adoption gate

Before any engine, library, crate, native binary, WASM artifact, font package, converter, OCR tool, or processing service is adopted, a later bounded qualification must establish exact evidence including:

- repository/package identity;
- exact version and, when relevant, upstream commit;
- exact artifact/binary origin and checksum;
- path/package license classification;
- required notices and redistribution obligations;
- source/import classification under Signthos provenance rules;
- transitive/native dependency inventory where applicable;
- SBOM contribution;
- vulnerability/security posture at qualification time;
- update and patch path;
- supported target/platform matrix;
- capability evidence against the canonical corpus.

Ambiguous rights or binary provenance are fail-closed for the affected adoption.

## Candidate engine observations

Current public observations are non-authoritative discovery inputs:

- EmbedPDF stable `v2.15.0` remains the Foundation-pinned interactive candidate; observed `v3.0.0-next.*` prereleases do not supersede it by implication.
- `@libpdf/core` `v0.4.2` is a structural-operation candidate requiring exact qualification.
- `pdfium-render` public documentation exposes explicit Pdfium API-version selection and remains only a native binding candidate.
- bounded Rust structural libraries may be considered only where revision/signature safety remains compatible with canonical contracts.
- heavyweight OCR/conversion/repair/compression/archival processors remain optional isolated-provider candidates.

Stage P adopts none of them.

## Determinism and evidence requirements

Every future implementation grain must define which outputs are expected to be byte-deterministic, semantically deterministic, provider-dependent, or intentionally nondeterministic.

Qualification must bind evidence to the exact candidate head/provider version/corpus version. Claims must be recorded as PASS, FAIL, UNSUPPORTED, UNKNOWN, or NOT_APPLICABLE without converting unavailable evidence into success.

## Performance evidence

Performance is an evidence requirement, not a Stage P claim. Future provider qualifications must define representative platform/corpus classes and capture at least latency, peak memory where measurable, output size where relevant, cancellation behavior, and resource-limit enforcement.

No provider may be described as performant across browser/native/server platforms from one environment or synthetic microbenchmark alone.

## Security acceptance principles

Future work must preserve these invariants:

- untrusted PDFs do not execute active content by default;
- parser/render/converter boundaries use least privilege;
- no PDF processor receives signing keys merely for convenience;
- local operations have no silent network transition;
- malformed/resource-exhausting inputs fail boundedly;
- output-producing operations create explicit new revisions;
- signed revisions are not silently overwritten;
- redaction requires independent recovery testing;
- unsupported/unknown behavior remains explicit;
- engine/provider adoption is impossible without exact provenance and rights evidence.

## Stage P acceptance

Stage P itself is complete only when:

1. `spec.md`, `plan.md`, and `tasks.md` form a coherent bounded planning package;
2. the package preserves Specification 003 contracts and authority boundaries;
3. capability/effect/provider/trust/corpus/provenance/security gates are explicit;
4. dependency-ordered grains are recursively defined without implementation authority inflation;
5. the exact candidate head receives independent substantive review;
6. every material finding is reconciled forward-only;
7. exact-head workflow/check accounting is truthful;
8. mandatory premerge proof is recorded;
9. merge uses expected-head protection;
10. post-merge verification proves the reviewed planning surface became canonical;
11. a separate Stage P closeout/successor reconciliation determines whether any 004 capability unit is authorized next.

Until all of the above become canonical, Specification 004 remains `PLANNING_ONLY`.