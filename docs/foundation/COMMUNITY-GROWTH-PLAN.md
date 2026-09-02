# Signthos Community and Growth Plan

Status: FOUNDATION PLAN
Date: 2026-09-02

## Objective

Build Signthos into a respected open-source project through technical quality, contributor trust, distribution and a clear category—not artificial star-chasing.

GitHub growth is an outcome of product value and community execution.

## Community promise

Contributors should be able to understand:

- what Signthos is,
- what is open,
- what is managed/commercial,
- where upstream code came from,
- how decisions are made,
- how to run/test the project,
- how work becomes canonically complete.

## Public positioning

Core message:

> **Open documents. Open signing. Everywhere.**

Supporting message:

> A local-first open document and signing platform for web, desktop, mobile, self-hosted infrastructure and developers.

Avoid launching primarily as:

> "A cheaper Documenso fork."

The upstream story should be transparent but not the product identity.

## Contributor onboarding

Before broad contributor recruitment, provide:

- `CONTRIBUTING.md`,
- `CODE_OF_CONDUCT.md`,
- `SECURITY.md`,
- architecture/index docs,
- development setup,
- test commands,
- issue/PR templates,
- provenance/import rules,
- task-grain guidance.

## Issue taxonomy

Candidate labels:

- `spec`
- `architecture`
- `bug`
- `security`
- `pdf`
- `signing`
- `desktop`
- `mobile`
- `api`
- `self-host`
- `docs`
- `good first issue`
- `help wanted`
- `blocked`
- `needs evidence`

Do not create `good first issue` tasks that require reconstructing hidden architecture context.

## Good first issue design

Good starter tasks should have:

- small change surface,
- clear expected behavior,
- deterministic test/evidence,
- no unresolved licensing authority,
- no critical cryptographic/security design ownership.

Examples later may include:

- localized strings,
- deterministic fixture additions,
- documentation examples,
- bounded UI accessibility fixes,
- SDK sample improvements.

## RFC / design process

Large public architecture changes should be reviewable before implementation.

A future RFC format may include:

- problem,
- constraints,
- alternatives,
- decision,
- migration,
- security/licensing impact.

SpecGrain remains the implementation authority; RFC discussion does not bypass active specs.

## Upstream respect

Because Signthos begins with upstream references/reuse:

- preserve attribution/license obligations,
- credit upstream projects clearly,
- submit useful fixes upstream when appropriate and legally/practically possible,
- avoid misleading claims that inherited work was created from scratch.

## Launch readiness

Do not launch a viral campaign on architecture docs alone.

Public launch should have a compelling real demo:

1. open a local PDF,
2. edit/prepare it,
3. sign locally or route for signatures,
4. complete on mobile/desktop,
5. verify independently,
6. self-host via clear instructions.

## Demo strategy

High-value demos:

- 60-second local self-sign without account,
- desktop-to-phone QR signing,
- "edit + redact + send + verify" lifecycle,
- self-host in minutes,
- `signthos verify` tamper demonstration,
- API/embed quickstart.

Demos must use real implemented behavior, not mock claims presented as complete.

## Documentation strategy

Documentation audiences:

- end user,
- self-host operator,
- developer/API integrator,
- contributor,
- security/compliance evaluator.

Structure documentation around jobs, not internal package names.

## Distribution-led growth

Growth channels:

- GitHub,
- Homebrew/Winget/Linux packages,
- App Store/Play Store,
- Docker/OCI registries,
- SDK registries,
- developer examples,
- integrations.

Every distribution surface creates a user acquisition path.

## Ecosystem strategy

After stable contracts:

- SDK examples,
- framework components,
- workflow templates,
- storage/provider integrations,
- automation platform adapters,
- MCP/agent integrations with safe authorization,
- community provider plugins under a defined security model.

## Content strategy

Useful technical content:

- PDF signing verification explained,
- local-first document security,
- self-hosting guides,
- PAdES interoperability experiments,
- open signing architecture,
- reproducible document-processing benchmarks.

Prefer engineering substance over generic marketing posts.

## Benchmark/open research strategy

Publish non-sensitive fixture corpora and interoperability reports when mature.

This can make Signthos useful even to developers who do not deploy the whole application.

Potential artifacts:

- signed-PDF interoperability corpus,
- redaction verification corpus,
- PDF engine compatibility matrix,
- cross-platform performance benchmarks.

## Governance trust

Community confidence increases when the project consistently:

- records exact evidence,
- does not fake review/CI results,
- acknowledges blocked work,
- publishes license boundaries,
- avoids surprise feature closures,
- responds constructively to security reports.

## Star/repository growth goals

Stars are a lagging signal.

Track:

- contributors,
- retained contributors,
- successful self-hosts,
- release downloads,
- Docker pulls where meaningful,
- API/SDK adoption,
- issue response/closure quality,
- documentation success,
- community-created integrations.

A large star count with low real usage is not the target.

## Maintainer scaling

As community grows:

- define code owners by domain,
- create reviewer qualification expectations for security/signing areas,
- separate routine contributions from trust-critical changes,
- document release roles,
- avoid single-founder hidden knowledge.

## Community success criterion

Signthos succeeds as an open-source project when users can trust the governance, contributors can safely extend bounded areas, and the ecosystem grows around public contracts rather than private founder context.
