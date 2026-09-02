# Signthos Release and Distribution Plan

Status: FOUNDATION PLAN
Date: 2026-09-02

## Objective

Release Signthos through reproducible, signed, versioned artifacts across server, desktop, mobile and developer packages without weakening provenance or upgrade safety.

## Versioning

Use semantic versioning for public product/API packages where practical.

Pre-1.0 may evolve faster, but breaking changes still require explicit release notes and migration guidance.

Version dimensions may include:

- product release,
- API contract version,
- evidence schema version,
- workflow schema version,
- SDK versions.

They must not be conflated unnecessarily.

## Release channels

### Stable

Default supported production release.

### Beta

For significant new surfaces such as early mobile support or new providers.

### Nightly / development

Optional later channel for contributors; never represented as production-qualified.

## Server distribution

Target:

- OCI/Docker images,
- GitHub Releases metadata,
- documented Compose/deployment examples,
- checksums/signatures/SBOM.

Images should separate core server from optional heavy workers where architecture permits.

## Desktop distribution

Target channels:

- GitHub Releases,
- signed platform installers,
- Homebrew Cask,
- Winget,
- Linux package/AppImage/deb/rpm choices based on maintainability.

Requirements:

- macOS code signing/notarization,
- Windows signing when production distribution begins,
- authenticated updater metadata,
- rollback/update policy,
- release artifact checksum/provenance.

## iOS distribution

Before App Store submission:

- actual source/dependency license compatibility review,
- privacy manifest/labels aligned with behavior,
- cryptography/export declarations as applicable,
- account deletion/subscription behavior if applicable,
- camera/files/biometric permissions justified,
- background capability use justified.

TestFlight is a beta distribution channel, not evidence that licensing/compliance gates are satisfied.

## Android distribution

Target:

- Google Play,
- potentially signed APK/alternative distribution later if supportable.

Before release:

- data-safety declarations,
- signing-key security,
- file/camera/biometric permission review,
- target API/platform policy compliance,
- dependency/license review.

## CLI distribution

Candidate channels:

- GitHub Releases binaries,
- Homebrew,
- cargo/npm/pip only if the actual CLI packaging language/architecture justifies those registries.

Do not duplicate incompatible CLIs merely to appear in more package managers.

## SDK distribution

- npm for TypeScript,
- PyPI for Python,
- Go modules,
- crates.io for independent Rust libraries where appropriate.

Every SDK release should identify compatible API versions.

## Release provenance

Release artifacts should bind to:

- exact Git commit/tag,
- source provenance manifest state,
- dependency lock state,
- build workflow/run,
- SBOM,
- artifact checksum/signature.

## Reproducibility

Aim for reproducible builds where ecosystem/platform permits.

Where byte-for-byte reproducibility is blocked by platform signing/notarization, preserve deterministic unsigned build evidence plus signed artifact provenance.

## Signing release artifacts

Use modern release signing/provenance mechanisms selected by implementation specs.

Requirements:

- keys/identity protected outside repository,
- least privilege,
- release workflow only from trusted/tagged refs,
- verify signatures in release qualification.

## Changelog

Maintain user-facing changes grouped by:

- added,
- changed,
- fixed,
- security,
- deprecated,
- removed,
- migration notes.

Do not use generated commit dumps as the only release communication.

## Database migration release policy

Every release with migrations must document:

- migration requirement,
- supported source versions,
- backup/preflight guidance,
- expected duration/risk for large deployments,
- rollback limitations.

## API compatibility policy

Before stable API maturity:

- mark experimental endpoints clearly,
- provide deprecation notices,
- SDKs expose compatibility.

After stable contract declaration:

- breaking changes require version strategy and migration path.

## Security release policy

Security fixes may require coordinated disclosure and accelerated release.

Provide:

- supported-version policy,
- private disclosure channel,
- CVE/advisory process when appropriate,
- clear upgrade recommendation.

## Release qualification evidence

A release candidate requires:

- exact-head/tag CI,
- provenance/license validation,
- full relevant tests,
- platform build matrix,
- signing/verifier interoperability evidence,
- migration tests,
- SBOM/security scans,
- independent release review,
- release notes/migration docs.

## Post-release verification

After publishing:

- verify tag/commit relationship,
- verify downloadable artifacts/signatures/checksums,
- smoke install server/desktop packages,
- verify package registry versions,
- verify update channel metadata,
- verify documentation references correct release.

A release is not canonically closed because a tag exists.

## Rollback

Rollback plans differ by surface:

- desktop/mobile app rollback may be constrained by store/update systems,
- server rollback may be blocked by irreversible data migrations,
- API rollback may affect active clients.

Release notes must state limitations rather than promise universal rollback.

## Support window

Before 1.0, define a small supported set such as latest stable plus critical security fixes for a limited predecessor if capacity allows.

Do not promise long-term maintenance branches before the project can sustain them.

## Release cadence

Prefer quality-driven regular releases over artificial weekly version churn.

Security and critical correctness fixes override ordinary cadence.

## v0.1 launch artifacts

Target public launch package:

- source repository,
- self-host OCI images,
- desktop builds for supported platforms,
- mobile beta/stable according to actual qualification,
- CLI/verifier,
- API docs + initial SDK,
- migration/install docs,
- architecture/security/licensing/provenance docs,
- demo screenshots/video based on real behavior.

## Success criterion

A user can trace a released Signthos artifact from download/store/package registry back to an exact qualified source revision and understand how to install, upgrade, verify and report security issues.
