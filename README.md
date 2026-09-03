# Signthos

**Open documents. Open signing. Everywhere.**

Signthos is a planned open-source, local-first document platform for PDF editing, document workflows, and electronic signatures across web, desktop, iOS, Android, self-hosted infrastructure, and managed cloud.

## Project status

**FOUNDATION / RESEARCH ONLY**

No upstream application source code may be imported until the foundation specification closes its provenance, licensing, architecture, and execution-readiness gates.

The founding research evaluates two primary upstream references:

- `documenso/documenso` for electronic-signature workflows and developer infrastructure.
- `Stirling-Tools/Stirling-PDF` for local/private PDF tooling and document-processing product patterns.

Signthos is not intended to be a cosmetic fork of either project. The target is a coherent document operating system with local-first execution, verifiable signing, open self-hosting, native desktop/mobile surfaces, and a stable developer platform.

## Founding principles

- Local-first for private document operations.
- Self-host-first without artificial feature gates.
- Cloud is a convenience and operations product, not the source of software freedom.
- Web, desktop, iOS, and Android are first-class product surfaces.
- Signing evidence must be independently verifiable.
- Heavy PDF capabilities must be provider-isolated and fail closed.
- Provenance and licensing are architectural inputs, not release paperwork.
- Big ideas are recursively decomposed into small, bounded, evidence-backed specifications.
- No task is canonically complete until required checks, review, merge, and post-merge verification succeed.

## Planned product surfaces

- Signthos Web
- Signthos Desktop
- Signthos Mobile
- Signthos Server
- Signthos SDK
- Signthos Embed
- Signthos CLI
- Signthos Verify

## Provenance validation

Specification 001 provides the standalone `signthos-provenance` control-plane tool under `tools/provenance/`. Run canonical checks from the repository root:

```sh
cargo fmt --manifest-path tools/provenance/Cargo.toml -- --check
cargo clippy --locked --manifest-path tools/provenance/Cargo.toml --all-targets --all-features -- -D warnings
cargo test --locked --manifest-path tools/provenance/Cargo.toml --all-targets --all-features
cargo run --locked --manifest-path tools/provenance/Cargo.toml -- validate
cargo run --locked --manifest-path tools/provenance/Cargo.toml -- notice --check
```

`validate` is local and offline. `verify-source --record <id> --source-root <path>` may inspect only a caller-supplied local Git checkout and verifies source facts only; it does not authorize an import or grant rights.

Future source-import records belong under `provenance/imports/` and remain fail-closed unless all canonical record, permission, live review, exact-head qualification, and expected-head merge gates are satisfied. Do not place copied upstream product source, credentials, or confidential permission artifacts in provenance metadata directories.

## License

The final repository licensing model is intentionally not declared yet. Imported or derived upstream code must retain all applicable upstream obligations unless Signthos holds explicit written rights permitting different treatment. The foundation specification must resolve this before any upstream code import.
