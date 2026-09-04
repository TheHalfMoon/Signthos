# Specification 002 — Upstream Snapshot Record

Status: `PLANNING_EVIDENCE / NOT_IMPORT_AUTHORIZATION`
Captured for Issue: #5

## Signthos binding

Canonical Signthos planning base:

`8e3a3ab8f1b889a6e13a82a5449f4a3b8c3a6167`

Specification 001 at that base is `CLOSED_CANONICAL`. Specification 002 remains planning-only.

## Upstream identity

Repository:

`documenso/documenso`

Repository visibility observed: public.

Default branch observed: `main`.

Exact captured commit:

`2cac63a000e22422bdea449f68b8025e709aa73a`

Observed commit subject:

`fix: block SSRF via IPv4-mapped IPv6 webhook URLs (#2901) (#3166)`

Observed parent:

`4aa3583e89432e5aec23b57a2a8739e245b27033`

The exact commit was re-read before the shaping branch was created. This record freezes the candidate identity for planning; it does not claim that the moving upstream branch will remain at this SHA.

## Root licensing evidence

The captured root contains a `LICENSE` file with the GNU Affero General Public License version 3 text.

GitHub repository metadata reports license SPDX id `AGPL-3.0`. Signthos does not treat that repository-level shorthand as sufficient path-level import authorization. The Specification 001 policy rejects ambiguous/deprecated shorthand where an explicit canonical SPDX expression is required.

A future path classifier must establish the exact applicable expression and notices for each imported path.

## More-specific commercial boundary

The captured tree contains:

`packages/ee/LICENSE`

That file is titled `The Documenso Commercial License` and states a separate commercial-license regime for the software to which it applies. It limits production use to the applicable agreement/subscription, permits development/testing copying/modification only within stated terms, retains rights in modifications/patches, and otherwise forbids copying, merging, publishing, distributing, sublicensing, and selling except as expressly stated.

The same license says it applies only to the part of the software not distributed under AGPLv3 and contains carve-outs for specified client-side/MIT material. Therefore the presence of `packages/ee/` cannot safely be classified by directory name alone at individual-file granularity, but the entire directory is conservatively restricted until exact file-level evidence proves a narrower permitted case.

Planning classification:

```text
packages/ee/** = RESTRICTED / NOT_IMPORT_AUTHORIZED
```

No path in this directory may be copied into Signthos under this shaping authority.

## Observed top-level application layout

At the captured SHA, `apps/` contains:

- `apps/docs/`
- `apps/openpage-api/`
- `apps/remix/`

These names describe tree structure only. They are not path-level license classifications or import allowlists.

## Observed top-level package layout

At the captured SHA, `packages/` contains:

- `packages/api/`
- `packages/app-tests/`
- `packages/assets/`
- `packages/auth/`
- `packages/ee/`
- `packages/email/`
- `packages/lib/`
- `packages/prisma/`
- `packages/signing/`
- `packages/tailwind-config/`
- `packages/trpc/`
- `packages/tsconfig/`
- `packages/ui/`

Except for the explicit fail-closed `packages/ee/**` classification above, these paths are not yet import-authorized.

Planning classification for all other upstream product/workspace paths:

```text
UNCLASSIFIED_PENDING_PATH_LEVEL_EVIDENCE
```

A later pre-import qualification packet must examine exact files, the most-specific applicable license/notice evidence, embedded/generated/third-party status, destination, and transformation before any allowlist is authorized.

## Observed root workspace indicators

The captured root includes workspace/build/configuration artifacts such as:

- `package.json`
- `package-lock.json`
- `turbo.json`
- `.npmrc`
- `.github/`
- `docker/`
- `scripts/`
- `patches/`

Their presence does not mean they are all needed or authorized for 002A. The future 002A qualification packet must minimize the imported workspace surface and justify each exact path.

## Evidence limitations

This planning record intentionally does not claim:

- that every non-EE path is AGPL-3.0-only;
- that every file under `packages/ee/**` has identical effective rights in every distribution form;
- that copied community code may be relicensed;
- that the captured snapshot is implementation-authorized;
- that dependencies in `package-lock.json` have been classified;
- that upstream tests may be copied without their own path-level provenance;
- that App Store, Google Play, managed-cloud, signing-standard, or regulatory distribution is compatible;
- that private/separate permission evidence exists for any restricted path.

Unknown facts remain fail-closed.

## Zero-source-import statement

This snapshot record contains only planning facts and identifiers derived from live public repository metadata/license evidence. No Documenso application/product source file is copied into this shaping candidate.
