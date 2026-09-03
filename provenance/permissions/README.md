# Permission artifact references

Specification 001 stores only non-secret references to permission evidence. Confidential permission documents, private correspondence, credentials, tokens, personal data, and document contents do not belong in this repository.

## Canonical v1 reference

A public provenance record may use:

`permission-artifact:<opaque-public-id>`

The opaque public id:

- uses lowercase ASCII letters, digits, `.`, `_`, and `-` only;
- begins and ends with an ASCII letter or digit;
- is 1–96 characters long after the prefix;
- is only a stable lookup identifier and must not encode confidential contents.

Example:

`permission-artifact:synthetic-documenso-ee-v1`

The validator checks the public reference grammar and required permission scopes. It does not publish, retrieve, or infer the contents of the controlled artifact. External qualification must separately establish that the referenced artifact exists and grants the scopes claimed by the provenance record.

## Scope vocabulary

Canonical v1 permission scopes are:

- `copy`
- `modify`
- `create_derivative`
- `redistribute`
- `publish_source`
- `sublicense`
- `relicense`
- `commercial_use`

The restricted-path policy may require distribution scopes for a path. The source-import transformation kind adds its minimum transformation scopes. A record passes only when the referenced permission scope set contains the complete derived minimum.
