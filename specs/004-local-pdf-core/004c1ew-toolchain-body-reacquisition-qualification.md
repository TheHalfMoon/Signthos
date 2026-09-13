# 004C1EW Toolchain Body Reacquisition Qualification

## Authority and scope

This record implements only `004C1EW_TOOLCHAIN_BODY_REACQUISITION_QUALIFICATION` authorized by canonical Issue #7 after 004C1EV closeout. The canonical base is `f3b5e36a9403985fcdd0969a60b41d6d8f1f4939`, tree `465398b71ee1d728a5de6c775a33f207ea3ba1b9`, for platform `linux-x64-glibc`.

The authorized sequence reacquired and statically verified the exact Node and pnpm bodies into a fresh persistent evidence root outside the repository. Neither executable body was run. No project dependency archive was acquired, no resolver ran, and no repository runtime, provider, PDF, distribution, release, or deployment surface was activated.

## Frozen identities

| Body | Required identity | Result |
| --- | --- | --- |
| Node archive | `node-v24.20.0-linux-x64.tar.xz` | PASS |
| Node archive SHA-256 | `2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2` | PASS |
| Node executable SHA-256 | `89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7` | PASS |
| pnpm version | `10.34.5` | PASS |
| pnpm tarball SHA-1 | `6a91127a7f2ca72fe53bb9ff54883e0c75b22f17` | PASS |
| pnpm tarball SHA-256 | `ccb5c479cab1b00621325bfe7d4c9a8a8031e7a525d7249e275ecbec81b08db2` | PASS |
| pnpm tarball SHA-512 | `a4ee05f2f73658255bd6a89859c065a45c28a57daefae2c893a168ee2b73168c37b91e83e57ea67654ad03f03031746430e8bce38e362e042605fb8abc80192e` | PASS |
| pnpm entrypoint SHA-256 | `b276da51dc8ca5b0d3ee3371695b50fc8b3244b281b091c63a3f082a88dadeb9` | PASS |

## Acquisition and verification evidence

The sequence used direct HTTPS with inherited proxy variables removed, no credentials, and cross-origin redirects prohibited. Requests were limited to the canonical Node checksum list, exact Node archive, exact-version pnpm packument, and the packument-bound exact pnpm tarball.

The Node archive reproduced the canonical SHA-256 and exact official checksum-list entry before extraction. The pnpm packument reproduced `name=pnpm`, `version=10.34.5`, the canonical tarball URL, SHA-1, and SHA-512 SRI before extraction. The acquired pnpm tarball reproduced canonical SHA-1, SHA-256, and SHA-512. Static extraction then reproduced both canonical executable/entrypoint SHA-256 identities without executing either body.

A deterministic SHA-256 manifest was frozen after verification. Its SHA-256 is `127463a84d4d66832df0cf93ffcbc8e88e776bb89dd025be8e482e506ea7ef61`. The verified archives and extracted bodies remain retained outside the repository for later authority.

## Fail-closed boundary

```text
004C1EW_EXACT_TOOLCHAIN_BODY_REACQUISITION = PASS
NODE_BODY_RETAINED_AND_STATICALLY_VERIFIED = PASS
PNPM_BODY_RETAINED_AND_STATICALLY_VERIFIED = PASS
NODE_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
PNPM_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
RESOLVER_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
PROJECT_DEPENDENCY_ACQUISITION = PROHIBITED_AND_NOT_PERFORMED
NODE_MODULES_CREATION = PROHIBITED_AND_NOT_PERFORMED
PACKAGE_LIFECYCLE_OR_BUILD_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = PROHIBITED_AND_NOT_PERFORMED
DISTRIBUTION_ACTIVATION = PROHIBITED_AND_NOT_PERFORMED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

This qualification does not grant a dependency-materialization attempt. Any successor requires a fresh canonical Issue #7 reconciliation after exact-head independent substantive review, guarded merge, and mechanical post-merge verification of this record.
