# Specification 003E — Provider Capability Contract Qualification

Status: `QUALIFICATION_CANDIDATE / PLANNING_CONTRACT_ONLY / ZERO_UPSTREAM_BYTES`
Issue: #6
Canonical predecessor main: `59c459fcc2d9068cc96c1f7ff95055e26020162a`
Owning specification: `003-signthos-domain-boundary`

## Canonical authority

Specification 003A through 003D are canonical predecessors.

The fresh post-003D successor reread in Issue #6 authorizes exactly:

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 003E_PROVIDER_CAPABILITY_CONTRACT_QUALIFICATION
003E_AUTHORITY = PLANNING_CONTRACT_QUALIFICATION_ONLY
003E_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
003F_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```

This artifact exercises only that bounded planning/contract authority.

## Purpose

Freeze the minimum implementation-independent provider contract needed to prevent browser, native, server, and heavy processors from creating separate hidden domain models.

003E defines:

- provider identity and provider kind;
- declared and versioned capability semantics;
- semantic operation requests and results;
- read-only versus revision-creating classification;
- capability support versus runtime availability;
- cancellation, timeout, and resource-limit semantics;
- local/network transition disclosure and consent boundaries;
- exact input/output revision binding;
- trust and secret-isolation constraints for heavy/network providers;
- normalization into the canonical 003D event and stable-error model.

003E does not implement a provider, PDF engine, worker, network adapter, queue, sandbox, or capability.

## Allowed change surface

This qualification may add only Signthos-authored planning/contract material under:

`specs/003-signthos-domain-boundary/**`

It authorizes none of:

- source import or provenance expansion;
- package or lockfile mutation;
- dependency acquisition or binary download;
- TypeScript, Rust, SQL, Prisma, JSON Schema, OpenAPI, generated code, or runtime types;
- database migration or persistence mapping;
- browser/native/server/heavy provider implementation;
- worker, queue, process, container, sandbox, network, or credential execution;
- PDF parsing, rendering, editing, conversion, OCR, signing, verification, or cryptographic execution;
- signing-key or control-plane-secret access;
- API, webhook, SDK, UI, or transport implementation;
- 003F work;
- Specification 004 work.

## Evidence class

Every rule below is `SIGNTHOS_OWNED_DESIRED_CONTRACT` derived from canonical Stage P and 003A–003D contracts.

No rule claims that equivalent Documenso application behavior or any external provider implementation was imported. The canonical imported Documenso source surface remains limited to `.npmrc` and `packages/prisma/schema.prisma`.

## Predecessor contracts consumed without reopening

003E consumes these canonical facts:

1. `DocumentRevision` identifies immutable exact content.
2. content-changing operations create new revisions and cannot overwrite an existing revision.
3. envelope/signing-sensitive bindings use exact revision identities and cannot silently follow mutable aliases.
4. provider-local identifiers are adapter mappings rather than canonical Signthos domain identity.
5. provider/runtime state cannot redefine canonical envelope/workflow state.
6. provider/runtime events are distinct from domain events and audit/evidence events.
7. provider status or raw provider errors cannot override canonical authorization, domain preconditions, or stable error semantics.
8. authentication and authorization are separate, and provider selection cannot grant resource authority.
9. unsupported, unavailable, resource-limit, malformed-untrusted-document, and verification uncertainty states remain distinct.
10. sensitive event/error payloads exclude document bytes, credentials, signing keys, bearer tokens, OTPs, and unnecessary field/contact data by default.

003E owns provider capability semantics while preserving 003F persistence ownership and later PDF/signing/API implementation ownership.

# Provider identity and classification

## Provider identity

A provider instance/registration has a stable opaque `ProviderId` within the owning Signthos provider registry boundary.

Conceptually:

```text
ProviderDescriptor {
  provider_id
  provider_kind
  capability_contract_version
  locality
  trust_class
  declared_capabilities[]
}
```

This is a semantic descriptor, not a storage or wire schema.

Rules:

1. `ProviderId` is not a `WorkflowId`, provider job ID, package name, process ID, URL, hostname, or vendor account ID;
2. provider-local execution/job IDs remain adapter/runtime metadata;
3. changing provider configuration does not silently change provider identity unless the owning registration contract explicitly creates a new identity;
4. provider identity never owns document bytes, envelope lifecycle, recipient state, field state, or authorization policy;
5. a provider descriptor is not proof that the provider is currently available or trustworthy for every operation;
6. concrete identifier encoding and registry persistence remain deferred.

## Provider kind

Canonical minimum provider kinds are:

```text
BROWSER
NATIVE
SERVER
HEAVY
```

Semantic intent:

- `BROWSER`: execution inside a browser/local web execution boundary;
- `NATIVE`: execution through a local native/desktop/mobile boundary;
- `SERVER`: ordinary server-side provider execution;
- `HEAVY`: isolated or separately constrained processing intended for heavyweight/untrusted document operations.

Rules:

1. provider kind is a deployment/trust classification, not a capability grant;
2. two providers of different kinds may implement the same semantic capability without changing domain meaning;
3. provider kind cannot redefine revision, envelope, authorization, event, or error semantics;
4. `HEAVY` does not imply network execution by itself; locality is explicit separately;
5. a later specification may add another provider kind only with explicit trust/locality semantics.

## Execution locality

Canonical locality classes are:

```text
LOCAL_ONLY
NETWORK_REQUIRED
NETWORK_OPTIONAL_EXPLICIT
```

Rules:

1. `LOCAL_ONLY` means the operation cannot initiate network processing or transmit document content as part of the capability execution;
2. `NETWORK_REQUIRED` means network/provider transmission is a semantic requirement and must be visible before execution;
3. `NETWORK_OPTIONAL_EXPLICIT` means local execution may be possible but choosing network execution requires an explicit provider-path decision rather than silent fallback;
4. loss of local capability cannot silently convert `LOCAL_ONLY` into network execution;
5. a provider registry default, feature flag, UI preference, retry path, or availability fallback cannot silently change locality;
6. telemetry/updates unrelated to document processing remain separately governed and cannot be used as a hidden document-upload channel;
7. exact UI wording and consent mechanics remain later product work, but the local-to-network transition must be semantically observable and authorizable.

# Capability contract

## Capability identity

A capability is named by a stable machine-readable `CapabilityCode` and a semantic contract version.

Conceptually:

```text
CapabilityRef {
  capability_code
  capability_version
}
```

Rules:

1. capability code identifies semantic behavior, not a provider/vendor implementation name;
2. equal capability codes at incompatible versions are not interchangeable;
3. a provider-specific alias maps to a canonical capability reference rather than creating hidden domain meaning;
4. capability naming does not prove support, availability, quality, or legal/compliance status;
5. Specification 004 and later owning specifications define concrete PDF/signing capability catalogs; 003E defines only the cross-provider contract shape.

## Declared capability support

A provider declaration distinguishes support from runtime availability.

Canonical support states are:

```text
SUPPORTED
UNSUPPORTED
```

Canonical runtime availability states are:

```text
AVAILABLE
UNAVAILABLE
UNKNOWN
```

Rules:

1. `SUPPORTED` means the provider declares conformance to the named semantic capability/version;
2. `UNSUPPORTED` means that semantic capability/version is not implemented by the provider;
3. `AVAILABLE` means a supported capability is presently eligible for attempted execution under provider/runtime checks;
4. `UNAVAILABLE` means a supported capability cannot presently execute;
5. `UNKNOWN` fails closed for execution eligibility and cannot be treated as available;
6. support and availability are independent dimensions;
7. a temporary outage is not `UNSUPPORTED`;
8. an unsupported capability is not made supported by retry;
9. capability mismatch maps through the 003D stable error boundary and cannot be hidden as generic success or best-effort substitution.

## Capability descriptor

A declared capability has, at minimum, semantic metadata equivalent to:

```text
CapabilityDescriptor {
  capability_ref
  effect_class
  locality
  cancellation_semantics
  timeout_semantics
  resource_limit_contract
  input_contract
  output_contract
}
```

Rules:

1. descriptor metadata is stable for the declared capability version;
2. a provider cannot claim one capability version while executing materially different semantics;
3. runtime constraints may become stricter than an advertised maximum but cannot silently weaken safety invariants;
4. capability metadata is not authorization and cannot grant resource access;
5. provider descriptor/capability metadata must be inspectable before a network transition or destructive/revision-creating choice;
6. representation/serialization remains deferred.

# Operation effect classification

Every provider capability is classified as exactly one of:

```text
READ_ONLY
REVISION_CREATING
```

## READ_ONLY

A read-only operation may inspect, render, validate, measure, or derive non-canonical observations without changing canonical document bytes.

Rules:

1. it cannot overwrite a `DocumentRevision`;
2. it cannot create a new canonical content revision merely because temporary/render/cache bytes exist;
3. provider caches, thumbnails, indexes, or temporary files are not canonical revisions unless a separately owning contract explicitly promotes an output as document content;
4. a read-only provider result binds the exact input revision identities it observed;
5. if the provider changes content bytes intended to enter the document lineage, the capability is `REVISION_CREATING`, not read-only.

## REVISION_CREATING

A revision-creating operation produces content intended to become a distinct immutable `DocumentRevision` after canonical acceptance.

Rules:

1. every canonical accepted output gets a new `DocumentRevisionId`;
2. an input revision is never overwritten or retargeted;
3. output identity cannot reuse the input revision ID even if rendered appearance is visually equivalent;
4. exact output content identity includes the canonical `ContentDigest` contract from 003A;
5. a provider-local output ID, path, object-store key, URL, or job ID is not the output revision identity;
6. failure/cancellation/timeout cannot silently publish a partially produced output as a successful canonical revision;
7. if multiple output documents/revisions are semantically supported later, their cardinality/order must be explicit in the owning capability version;
8. persistence/transaction mechanics for accepting the new revision remain deferred to 003F/later implementation.

# Semantic provider operation contract

## Operation request

A provider operation request is conceptually:

```text
ProviderOperationRequest {
  operation_id
  provider_id
  capability_ref
  exact_input_revision_ids[]
  resource_refs[]
  parameters
  execution_constraints
}
```

This is not a public API or runtime schema.

Rules:

1. `operation_id` names one Signthos provider-operation attempt and is distinct from provider job identity;
2. capability and version are explicit;
3. content-sensitive inputs are exact `DocumentRevisionId` values, never mutable aliases;
4. every input revision belongs to the caller-authorized resource scope under 003D;
5. provider selection does not bypass authorization or domain preconditions;
6. parameters are capability-version-governed rather than an arbitrary vendor option bag;
7. provider-specific escape-hatch options cannot weaken canonical security/revision/locality semantics;
8. empty/multiple input cardinality is defined by the owning capability contract rather than guessed by the adapter;
9. request serialization and transport remain deferred.

## Execution constraints

Semantic execution constraints may include:

```text
ExecutionConstraints {
  locality_requirement
  timeout_limit
  resource_limits
  cancellation_requirement
}
```

Rules:

1. constraints are requirements/caps, not best-effort hints when marked required by the owning capability;
2. a provider that cannot satisfy a required constraint yields a canonical unsupported/unavailable/resource-limit outcome as appropriate;
3. it cannot silently relax a timeout, locality, or secret-isolation requirement;
4. resource limits are explicit enough for later implementation to distinguish input-size/page/memory/time/concurrency/provider-quota classes where relevant;
5. capability-specific concrete limits remain owned by the capability implementation/specification.

## Operation result

A provider operation result is conceptually:

```text
ProviderOperationResult {
  operation_id
  provider_id
  capability_ref
  exact_input_revision_ids[]
  outcome
  exact_output_revision_ids[]?
  observations?
  provider_diagnostics?
}
```

Rules:

1. result identity matches the originating Signthos operation, not merely a provider job ID;
2. exact input revision binding is preserved in every terminal result;
3. a `READ_ONLY` success has no canonical content-changing output revision;
4. a `REVISION_CREATING` success accepted into the domain binds one or more explicitly ordered exact new output revisions as defined by the capability contract;
5. an output revision must not become canonical before its exact bytes/content digest and required domain invariants are established;
6. provider diagnostics are bounded metadata and cannot redefine canonical outcome/error semantics;
7. provider success does not prove authorization, signature validity, certificate trust, regulated signature level, legal effect, or PDF conformance unless an owning later verification contract independently proves the relevant claim;
8. failed/cancelled/timed-out execution does not fabricate a successful output revision.

# Provider execution state

Provider runtime state is operational and non-canonical with respect to envelope/workflow lifecycle.

Minimum runtime execution states are:

```text
QUEUED
RUNNING
SUCCEEDED
FAILED
CANCELLED
TIMED_OUT
```

Rules:

1. these states describe only the provider operation;
2. they do not replace 003C envelope/recipient/field/workflow states;
3. `SUCCEEDED` means the provider operation completed under its capability contract, not that a domain transition is authorized/accepted;
4. `FAILED`, `CANCELLED`, and `TIMED_OUT` are terminal for that provider-operation attempt;
5. retry creates/reuses semantic operation identity only according to the owning idempotency contract; it cannot duplicate a revision-creating semantic result;
6. queue/process persistence remains deferred.

# Cancellation contract

Capabilities declare cancellation semantics as one of:

```text
NOT_CANCELLABLE
BEST_EFFORT_CANCELLABLE
CANCELLABLE_BEFORE_COMMIT
```

Rules:

1. cancellation support is declared before execution;
2. a cancellation request is not proof that execution stopped;
3. terminal `CANCELLED` requires provider/runtime confirmation under the owning capability contract;
4. `CANCELLABLE_BEFORE_COMMIT` guarantees no successful canonical revision is accepted after cancellation wins the commit race;
5. races between cancellation and completion resolve to one canonical provider-operation terminal outcome;
6. cancellation cannot erase already accepted canonical revisions/events/evidence;
7. provider-specific kill/process mechanics remain implementation-owned.

# Timeout contract

A capability declares whether a bounded timeout is required and how timeout is surfaced.

Rules:

1. timeout is a provider-operation outcome, not silent cancellation or success;
2. timeout maps through canonical stable error/event semantics;
3. a timed-out revision-creating operation cannot publish partial output as a successful canonical revision;
4. later discovery that a remote worker completed after Signthos declared timeout does not silently mutate canonical state;
5. reconciliation of late provider completion must be explicit and idempotent under a later implementation contract;
6. concrete durations and scheduling mechanisms remain deferred.

# Resource-limit contract

Every capability that processes untrusted or potentially unbounded content declares the resource-limit dimensions relevant to safe execution.

Potential dimensions include:

```text
INPUT_BYTES
OUTPUT_BYTES
PAGE_COUNT
MEMORY
CPU_TIME
WALL_TIME
CONCURRENCY
PROVIDER_QUOTA
OTHER_EXPLICIT
```

Rules:

1. exceeding a declared safety limit fails explicitly;
2. a limit breach does not become malformed-document success, unsupported, or invariant violation by default;
3. provider quota and local safety limits remain distinguishable diagnostic refinements while normalizing to the canonical 003D class where appropriate;
4. `OTHER_EXPLICIT` requires a stable machine-readable dimension;
5. exact numeric limits remain capability/provider implementation work.

# Local/network transition contract

## No silent upload

A provider path that starts from a local-only user/document context cannot transmit document bytes or content-bearing derivatives to a network provider without an explicit authorized transition.

Required semantics:

1. the selected provider locality is known before content transmission;
2. a fallback from local provider failure/unavailability to network execution is never automatic for document content;
3. user/workflow authorization for a network-capable action is separate from provider availability;
4. a provider may not hide network processing behind a nominal `BROWSER` or `NATIVE` classification;
5. content-bearing temporary files, images, page renders, OCR inputs, and extracted text count as document content for this boundary unless an owning policy explicitly proves otherwise;
6. network transition auditing uses minimized identifiers/metadata and does not itself duplicate content into logs/events;
7. product UI mechanics are deferred, but later UI must make the transition visible before execution.

# Heavy-provider trust boundary

`HEAVY` providers process complex or resource-intensive content in a separately constrained trust boundary.

Security rules:

1. no signing private key access by default;
2. no control-plane secret access by default;
3. no ambient credential inheritance merely because the provider runs in a server environment;
4. input access is scoped to the exact authorized operation and exact revisions required;
5. output access is scoped to the bounded result channel;
6. malformed/untrusted document input remains untrusted throughout provider processing;
7. provider compromise must not automatically imply authorization to mutate canonical domain state;
8. later implementation should use sandbox/process/container isolation where feasible, but 003E does not choose the mechanism;
9. any exception granting signing-key or broader secret access requires separately owned explicit authorization and security review; 003E grants none.

# Malformed and untrusted input boundary

Rules:

1. document input supplied to a parsing/rendering/conversion provider is untrusted unless independently qualified otherwise;
2. parser/provider exceptions caused by malformed input normalize to `MALFORMED_UNTRUSTED_DOCUMENT` when semantically appropriate, not `INVARIANT_VIOLATION` merely because the implementation threw;
3. malformed input cannot relax resource limits, locality, authorization, or secret isolation;
4. a provider that cannot safely determine whether input is supported fails closed;
5. provider crash does not imply document invalidity; adapter normalization distinguishes provider unavailability/failure from malformed content when evidence permits;
6. concrete file-format validation belongs to Specification 004/later capability owners.

# Capability mismatch and selection

Provider selection must prove all of:

```text
provider declares requested capability/version
AND provider is eligible under required locality/trust constraints
AND current availability is AVAILABLE
AND requested input/parameter shape is supported
AND required execution constraints can be honored
```

If any predicate is unknown or false, execution does not start under that provider.

Rules:

1. version mismatch fails explicitly;
2. capability mismatch does not silently choose a semantically different capability;
3. provider substitution is allowed only when the substitute satisfies the same canonical capability/version and constraints;
4. substitution cannot change local/network locality without a new explicit transition decision;
5. selection logic cannot weaken authorization or 003C domain preconditions.

# Stable error normalization

003E consumes the 003D error classes.

Required mappings at semantic level include:

- declared lack of capability/version -> `UNSUPPORTED_CAPABILITY`;
- supported capability temporarily ineligible/unreachable -> `UNAVAILABLE`;
- declared safety/quota limit exceeded -> `RESOURCE_LIMIT_EXCEEDED`;
- safely classified malformed document input -> `MALFORMED_UNTRUSTED_DOCUMENT`;
- stale/domain race after provider work -> `CONFLICT` where the canonical state contract says so;
- internal Signthos invariant breach -> `INVARIANT_VIOLATION`;
- provider-specific errors -> normalized class/code plus bounded diagnostics.

Rules:

1. provider raw status codes, exception classes, numeric codes, or text are not canonical error semantics;
2. a provider `404` does not automatically mean canonical resource not found;
3. a provider `401/403` does not replace Signthos authentication/authorization evaluation;
4. a timeout is not automatically unsupported;
5. a quota limit is not automatically malformed input;
6. diagnostic details obey 003D disclosure/data-minimization rules;
7. unknown mapping fails closed rather than converting to success.

# Event normalization

Provider operation activity uses the 003D event classes without creating a new hidden event model.

Rules:

1. queued/running/progress/completion observations are `PROVIDER_RUNTIME_EVENT` semantics where recorded;
2. provider completion becomes a `DOMAIN_EVENT` only after the owning Signthos domain operation is accepted and a canonical domain fact actually occurs;
3. rejected authorization/domain preconditions produce no success-domain event;
4. an audit/evidence event may record a provider interaction under the owning policy without becoming the provider runtime event or domain event;
5. provider-local job IDs may be bounded diagnostics/correlation metadata but are not canonical event identity;
6. duplicate provider callbacks are idempotently normalized and cannot duplicate canonical revisions/domain transitions;
7. event payloads remain minimized under 003D.

# Exact input/output revision binding

## Read-only proof

A successful read-only provider observation is meaningful only against the exact input revision set it inspected.

A later alias movement or newer revision does not retarget that observation.

## Revision-creating proof

For an accepted revision-creating result:

```text
Input revisions:  R1..Rn (exact, immutable)
Provider operation: O
Output revisions: Rm..Rk (new, exact, immutable)
```

Required invariants:

1. every input ID is preserved exactly in the operation/result record;
2. every accepted content-changing output uses a fresh revision identity;
3. every output exact content digest is established before canonical acceptance;
4. outputs do not overwrite inputs;
5. provider-local output identities are mapped, not promoted to canonical revision identity;
6. retry/replay cannot create duplicate semantic output revisions for the same already-accepted idempotent operation;
7. a stale write/race cannot silently bind output against a newer alias/revision than the exact request inputs;
8. if domain state no longer permits acceptance when provider work completes, the result fails/conflicts explicitly rather than mutating canonical state.

# Deterministic adversarial cases

## Case A — silent network fallback

A local browser capability becomes unavailable and a compatible remote provider exists.

Result: no automatic upload. Network execution requires a new explicit provider-path transition satisfying authorization/locality policy.

## Case B — vendor capability alias

Provider X calls its operation `smartOptimizeV9`, but the requested canonical capability/version is different.

Result: adapter mapping must prove semantic equivalence to the exact canonical capability/version or return `UNSUPPORTED_CAPABILITY`.

## Case C — read-only provider emits changed bytes

A capability declared `READ_ONLY` returns bytes intended to replace the document.

Result: contract violation. Those bytes cannot overwrite/create canonical document content under the read-only operation.

## Case D — revision-creating overwrite

A provider asks to save converted bytes under the input `DocumentRevisionId`.

Result: reject. Accepted changed content requires a fresh revision identity and digest.

## Case E — timeout with late completion

A remote job times out, then later reports success.

Result: timeout remains the terminal outcome for that attempt unless a later explicit reconciliation contract authorizes a bounded recovery. Late callback does not silently publish output.

## Case F — cancellation race

Cancellation and provider completion race.

Result: exactly one terminal provider-operation outcome wins under the owning atomic/idempotent boundary. No duplicate canonical revision or contradictory terminal outcomes.

## Case G — heavy processor requests signing key

An OCR/conversion/repair worker asks for a signing private key because both run server-side.

Result: deny by default. 003E grants no signing-key/control-plane-secret access.

## Case H — provider 403

A provider returns HTTP 403.

Result: adapter does not infer canonical `AUTHORIZATION_DENIED` automatically. Signthos authorization remains independent; provider error is semantically normalized based on the actual failure cause.

## Case I — malformed parser crash

Untrusted malformed content triggers a parser exception.

Result: if evidence supports malformed input, normalize to `MALFORMED_UNTRUSTED_DOCUMENT`; do not label it `INVARIANT_VIOLATION` solely because an exception occurred.

## Case J — provider success after stale domain state

Provider work succeeds, but the target envelope/revision relationship changed or became terminal under canonical rules before acceptance.

Result: provider success is retained as runtime evidence, canonical domain mutation is rejected/conflicted, and no false success-domain event is emitted.

## Case K — same capability, different locality

A local and remote provider both support the same capability/version.

Result: they share semantic capability meaning but remain distinguishable by locality; selection cannot silently switch to remote execution.

## Case L — duplicate completion callback

The same provider completion callback is delivered twice.

Result: one semantic provider completion and at most one accepted domain result/revision set; duplicate delivery does not duplicate state.

# Deferred decisions and ownership

003E intentionally does not choose:

- concrete PDF/edit/render/OCR/conversion capability catalog — Specification 004/010 as applicable;
- signing/verifier/provider cryptographic capability catalog — Specification 005;
- provider implementation language/library/binary/process — later implementation;
- provider registry persistence/schema — 003F/later implementation;
- queue/job/outbox/database transaction mechanics — 003F/later implementation;
- sandbox/container/process isolation technology — later security/runtime implementation;
- concrete timeout/resource-limit values — owning capability implementation;
- retry/backoff scheduling — later runtime/provider implementation;
- UI for local/network disclosure/consent — later product work;
- public API/webhook/SDK representation — Specification 009;
- dependency/package/binary provenance acquisition — separately authorized provenance/import work where needed;
- credentials, secret stores, signing-key access, network endpoints, deployments — separately authorized implementation/security work.

Deferral is explicit and cannot be treated as permission to make these choices implicitly.

# Required negative cases for later implementations

Any implementation derived from 003E must reject or make impossible:

1. provider-local IDs becoming canonical document/workflow/event identity;
2. provider kind becoming a capability or authorization grant;
3. treating capability support as proof of current availability;
4. treating unknown availability as available;
5. silently substituting an incompatible capability version;
6. silently falling back from local to network document processing;
7. marking content-changing output as read-only;
8. overwriting an existing exact revision with provider output;
9. publishing partial output after failure/cancellation/timeout as successful canonical content;
10. allowing provider success to bypass authorization or 003C state/preconditions;
11. allowing heavy providers signing-key/control-plane-secret access by default;
12. treating malformed untrusted input as an internal invariant failure solely because a parser throws;
13. using provider HTTP/status/error text directly as canonical stable error semantics;
14. treating provider runtime state as envelope/workflow domain state;
15. duplicating domain transitions or output revisions on provider callback replay;
16. losing exact input-revision binding when an alias/current revision changes;
17. accepting a revision-creating output without exact new revision identity/content digest;
18. hiding document-content transmission in telemetry/cache/render/OCR side channels;
19. relaxing a required timeout/locality/resource/security constraint silently;
20. treating timeout, unsupported, unavailable, resource-limit, authorization denial, and malformed input as interchangeable failure states.

# Acceptance criteria

003E may become canonical only if exact-head independent substantive review confirms all of the following:

1. browser/native/server/heavy providers share one semantic capability contract rather than separate domain models;
2. provider identity is distinct from workflow/domain/event/job identity;
3. capability identity/version, support, and runtime availability are distinct;
4. every capability is explicitly `READ_ONLY` or `REVISION_CREATING`;
5. revision-creating results preserve immutable exact input/output revision identity and cannot overwrite inputs;
6. provider success cannot bypass authorization or canonical domain state/preconditions;
7. cancellation, timeout, and resource-limit outcomes fail closed and cannot publish partial success;
8. local-to-network execution cannot happen silently, including fallback paths;
9. heavy providers have no signing-key/control-plane-secret access by default;
10. malformed/untrusted input remains a distinct trust/error boundary;
11. provider errors and runtime events normalize into 003D semantics without becoming canonical domain state/error text;
12. retry/replay/callback duplication cannot duplicate semantic transitions or accepted output revisions;
13. 003E does not consume 003F, Specification 004, 005, 009, or 010 implementation authority;
14. the exact diff remains planning-only under `specs/003-signthos-domain-boundary/**` with zero upstream-derived source bytes and zero implementation/provenance/dependency/runtime mutation.

# Qualification workflow

This candidate requires:

1. exact current canonical base/head verification;
2. exact planning-only changed-surface verification;
3. truthful GitHub Actions/check/provider accounting;
4. fresh independent substantive exact-head review;
5. forward-only repair of every material finding, with fresh re-review after any head change;
6. zero unresolved material review threads;
7. final ruleset/branch-protection/mergeability race check;
8. mandatory exact-head premerge proof;
9. guarded merge using exact `expected_head_sha`;
10. post-merge verification of ordered parents, tree equality/bounded delta, signature, exact surface, and workflow/status truth;
11. live canonical successor derivation.

# Candidate successor

003F is not pre-authorized merely by numbering.

If and only if this exact 003E candidate becomes canonical and the live post-merge reread confirms the dependency frontier, the next candidate may be:

```text
003F_PRISMA_ANTI_CORRUPTION_MIGRATION_MAPPING_QUALIFICATION
```

Any such successor remains planning/contract qualification only unless separately authorized.

Candidate state before merge:

```text
003E_STATUS = QUALIFICATION_CANDIDATE
003E_IMPLEMENTATION_AUTHORITY = ABSENT
SPEC_003_IMPLEMENTATION_AUTHORITY = ABSENT
003F_SUCCESSOR_AUTHORITY = NOT_YET_DERIVED
SPEC_004_SUCCESSOR_AUTHORITY = ABSENT
```
