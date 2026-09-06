# Specification 004 — Local PDF Core Plan

Status: `STAGE_P_CANDIDATE / PLANNING_ONLY`
Issue: #7
Canonical predecessor merge: `dd996f11b701679b941c1fb3fd3e8bdc880f2506`

## Planning rule

This plan decomposes Specification 004 into bounded qualification grains. Ordering expresses dependency, not implementation authority. A successor becomes eligible only after fresh canonical governance reread explicitly authorizes it.

No grain may silently add a dependency, binary, source import, network provider, migration, signing behavior, or deployment surface outside its exact authorized contract.

## Dependency graph

```text
Stage P shaping
  -> mandatory Stage P closeout
      -> 004A corpus + provider-adoption contract qualification
          -> 004B inspect/render contract qualification
              -> 004C page operation contract qualification
              -> 004D merge/split contract qualification
                  -> 004E content/forms/stamp contract qualification
                      -> 004F metadata/attachments contract qualification
                          -> 004G redaction/sanitize safety contract qualification
                              -> 004H compare/compression/repair contract qualification
                                  -> 004I OCR/conversion optional-provider contract qualification
                                      -> 004J cross-provider convergence qualification
                                          -> 004K Specification 004 convergence closeout
```

Where a later canonical reread proves two units genuinely independent and non-overlapping, they may proceed in parallel only under explicit bounded authority.

## Stage P — Shaping

Purpose: freeze problem statement, inherited contracts, capability taxonomy, locality/trust model, corpus requirements, adoption evidence, security invariants, grain ordering, and Diffciplane gates.

Allowed surface:

- `specs/004-local-pdf-core/spec.md`
- `specs/004-local-pdf-core/plan.md`
- `specs/004-local-pdf-core/tasks.md`

Explicitly absent: implementation/dependency/import/runtime authority.

Exit: independently reviewed exact-head planning package, guarded merge, post-merge proof, then separate Stage P closeout reconciliation.

## Mandatory Stage P closeout

Purpose: reconcile exact Stage P evidence into the canonical ledger and derive the next unit from live governance.

Must prove:

- exact reviewed base/head/tree;
- final changed surface;
- independent substantive review result;
- exact workflow/check accounting;
- unresolved-thread count;
- expected-head guarded merge;
- signed/verified canonical merge and parent/tree relation;
- zero unauthorized implementation/dependency/import mutation.

No 004A authority exists until this closeout becomes canonical and the successor reread explicitly grants it.

## 004A — Corpus and provider-adoption contract qualification

Purpose: define the exact qualification contract that any future PDF provider and fixture corpus must satisfy before implementation selection.

Scope-in:

- fixture metadata schema and corpus classes;
- rights/redistribution classification requirements;
- exact provider/package/binary provenance fields;
- SBOM/notice/vulnerability/update-path evidence contract;
- platform/runtime classification;
- stable capability identifiers;
- resource-limit categories;
- provider result-state vocabulary;
- evidence binding and reproducibility requirements.

Scope-out:

- selecting or installing a provider;
- downloading binaries;
- creating runtime fixtures from unqualified third-party documents;
- benchmarks or execution claims.

Dependency: Stage P closed canonically.

## 004B — Inspect and render contract qualification

Purpose: define provider-neutral read-only inspection/render semantics.

Scope-in:

- page count/geometry/box facts;
- basic metadata/structure inspection outputs;
- render request/result contract;
- DPI/scale/page selection semantics;
- unsupported font/color/transparency states;
- active-content non-execution;
- encrypted-input behavior;
- malformed/resource-limit behavior;
- cancellation/timeout semantics;
- browser/native semantic convergence requirements.

Operation class: primarily `READ_ONLY`.

Scope-out: persistent edits, signing conclusions, OCR, remote provider behavior unless separately authorized.

Dependencies: 004A plus exact provider/corpus qualification authority if implementation is later contemplated.

## 004C — Page operation contract qualification

Purpose: define reorder/rotate/remove/extract semantics as explicit revision-creating operations when persisted.

Must define:

- page identity/reference semantics within an input revision;
- deterministic request ordering;
- empty/duplicate/out-of-range handling;
- output revision/source lineage;
- signed-input preservation rules;
- resource/output limits;
- single-page extraction versus multi-output semantics.

Operation class: `REVISION_CREATING` for persisted outputs.

Dependency: 004B stable enough to define page identity/geometry facts.

## 004D — Merge and split contract qualification

Purpose: define multi-input and multi-output revision semantics.

Must define:

- ordered source revision list;
- page-range semantics;
- metadata/attachment/form collision policy as explicit later-qualified behavior rather than implicit engine defaults;
- encrypted/unsupported input handling;
- output count and lineage;
- signed source revision preservation;
- cancellation/partial-output rules;
- resource amplification limits.

Operation class: `REVISION_CREATING`.

Dependencies: 004B and 004C semantics.

## 004E — Content, forms, watermark/stamp/page-number qualification

Purpose: define bounded content-producing operations without conflating them with cryptographic signatures.

Candidate subgrains must be split when implementation begins:

- annotations/text/image placement;
- form inspection/fill;
- watermark/stamp;
- page numbering.

Must distinguish visual signature-like marks from Specification 005 cryptographic signing.

Operation class: `REVISION_CREATING` when output is persisted.

Dependencies: 004B–004D as applicable.

## 004F — Metadata and attachments qualification

Purpose: define safe metadata and embedded-file inspection/mutation semantics.

Must define:

- metadata namespace/value constraints;
- read-only versus mutation behavior;
- attachment enumeration/extraction safety;
- attachment size/type limits;
- active-content treatment;
- filename/path traversal defenses for extracted attachments;
- mutation lineage/new-revision behavior.

Operation class: mixed `READ_ONLY` and `REVISION_CREATING`, explicitly per capability.

Dependencies: 004A/004B and revision semantics from prior grains.

## 004G — Redaction and sanitize safety qualification

Purpose: define a high-assurance file-level redaction/sanitization contract.

Required gates:

- redaction always creates a new revision;
- visual overlay alone is insufficient;
- target semantics are explicit;
- independent recovery toolchain/parser is required where practical;
- recovery attempts cover content streams, alternate representations, annotations, metadata, attachments, incremental updates, object remnants, and applicable caches/resources;
- output must not retain recoverable targeted content under the qualified threat model;
- failure/inconclusive independent validation blocks safe-redaction claims;
- sanitize semantics are distinct from redaction and list exactly which active/embedded structures are removed or retained.

Operation class: `REVISION_CREATING`.

Dependencies: 004B, 004E, 004F and corpus/adoption contract.

## 004H — Compare, compression, and repair qualification

Purpose: define three distinct capability families without treating engine convenience as shared semantics.

Compare:

- read-only analytical output unless a report artifact is separately persisted;
- structural/text/visual comparison modes must be explicit;
- provider-dependent uncertainty must be preserved.

Compression:

- output is a new revision;
- quality/loss characteristics and metadata/image/font effects must be explicit;
- byte-size reduction is not guaranteed success.

Repair:

- input damage classification and repair confidence/state must be explicit;
- repaired output is a new revision;
- unsupported/inconclusive repair cannot be represented as faithful restoration.

Dependencies: prior structural and safety contracts as applicable.

## 004I — OCR and conversion optional-provider qualification

Purpose: define optional heavyweight/local-or-explicit-network provider contracts without absorbing them into the trusted core.

Scope-in:

- OCR request/result contract;
- image/PDF-to-searchable-PDF semantics;
- office/image conversion contract;
- explicit network/local provider classification;
- isolation/resource/timeout/cancellation behavior;
- output revision/provenance;
- language/script capability metadata including Arabic/RTL where claimed;
- nondeterminism/confidence/unsupported states.

Scope-out:

- provider installation or execution absent separate authority;
- archival/PDF-A claims without independent conformance validation;
- silent remote processing.

Operation class: generally `REVISION_CREATING`.

Dependencies: 004A, revision semantics, security/locality contract.

## 004J — Cross-provider convergence qualification

Purpose: prove that providers claiming the same Signthos capability implement sufficiently equivalent semantics on the canonical corpus.

Evidence must cover:

- capability-by-capability corpus matrix;
- result-state normalization;
- malformed/encrypted/resource-limit cases;
- revision digest/output lineage semantics;
- provider-specific divergences;
- unsupported capability boundaries;
- representative platform performance evidence;
- no silent network behavior in local providers.

A provider may expose a narrower capability set rather than forcing false equivalence.

Dependency: all capability groups included in the current Specification 004 release surface must be canonical and implementation-qualified before convergence can be claimed.

## 004K — Specification 004 convergence closeout

Purpose: reconcile every canonically authorized Specification 004 grain and determine whether the Local PDF Core is closed for its exact authorized scope.

Must prove:

- complete canonical grain/evidence chain;
- exact selected provider/dependency/binary provenance for implemented capabilities;
- corpus version and rights state;
- deterministic/security/performance evidence required by each grain;
- redaction independent-recovery evidence if redaction is included;
- no unauthorized source/dependency/provider surface;
- explicit unsupported/deferred capabilities;
- no silent Specification 005 signing authority;
- exact successor eligibility derived from live roadmap/governance only after closeout.

## Common future-grain template

Every implementation or qualification grain must declare:

1. authority source;
2. exact canonical base;
3. scope-in;
4. scope-out;
5. allowed paths/change surface;
6. dependencies;
7. operation effect class;
8. selected provider/corpus evidence when applicable;
9. security/locality/resource constraints;
10. deterministic acceptance criteria;
11. focused/full test requirements;
12. exact-head workflow/check accounting;
13. independent substantive review requirement;
14. unresolved-thread reconciliation;
15. premerge proof;
16. expected-head guarded merge;
17. post-merge verification;
18. task-ledger and successor reread.

## Cross-cutting evidence gates

No future grain can claim completion without applicable evidence for:

- provenance and license/notice correctness;
- exact provider/artifact identity;
- corpus fixture identity and rights;
- malformed/untrusted input safety;
- resource-limit enforcement;
- cancellation/timeout behavior;
- local/no-silent-network behavior;
- immutable source revision preservation;
- explicit new-revision outputs;
- cross-provider semantics where claimed;
- independent validation for high-risk claims such as redaction;
- representative performance evidence when performance is claimed.

## Explicit successor boundary

Completion of Stage P does not authorize 004A. Completion of 004A does not authorize provider adoption or 004B implementation. Completion of any numbered grain does not authorize the next by numbering alone.

Every successor requires a fresh canonical reread and explicit bounded authority.