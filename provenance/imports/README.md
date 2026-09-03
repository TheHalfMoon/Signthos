# Canonical Source Import Records

This directory is the canonical repository location for Specification 001 v1 `source_import` JSON records.

No upstream product or application source is stored here. A record in this directory is metadata and authorization evidence only; it does not itself grant permission to copy, modify, relicense, redistribute, or publish upstream source.

Before a source-import record may be treated as import-ready:

- its JSON must satisfy the canonical v1 source-import schema and executable `signthos-provenance validate` rules;
- `review.status` must be `qualified_exact_head` with a positive immutable Signthos pull-request number and canonical immutable review-evidence reference;
- any required permission artifact must be referenced by a stable non-secret identifier and must cover every required scope;
- restricted, unknown, contradictory, or incomplete license/permission states remain fail-closed;
- live Diffciplane evidence must separately prove that the referenced review exists, is substantive and independent, belongs to the declared pull request, and applies to the relevant exact head;
- `verify-source` may verify source facts against a caller-supplied local Git checkout, but that verification does not grant import authorization.

Confidential permission documents, credentials, copied upstream product source, and mutable review references must not be committed to this directory.
