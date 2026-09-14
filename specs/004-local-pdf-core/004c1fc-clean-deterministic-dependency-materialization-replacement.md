# 004C1FC Clean Deterministic Dependency Materialization Replacement Qualification

Status: `QUALIFICATION_CANDIDATE / CLEAN_REPLACEMENT_EXECUTION_PASS / EVIDENCE_FROZEN / REVIEW_REQUIRED`
Issue: #7
Execution authority: `github:issue-comment:5658708308`
Postrun validator repair authority: `github:issue-comment:5658759990`
Execution-pass reconciliation: `github:issue-comment:5658781534`
Predecessor nonqualifying closeout: `github:issue-comment:5658699945`

This record qualifies only the single clean replacement dependency-materialization attempt. It grants no provider/PDF runtime, source import, Git adoption of `node_modules`, 004C2, 004D, Specification 005, release, or deployment authority.

## 1. Authority boundary

```text
UNIT = 004C1FC_CLEAN_DETERMINISTIC_DEPENDENCY_MATERIALIZATION_REPLACEMENT
CANONICAL_BASE = adf6860961c91e8110d045b7dad6db73b230cde0
CANONICAL_BASE_TREE = 3344138e2b1af05e1ee0e0a3d98edecb170a1e05
AUTHORIZED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1fc-clean-deterministic-dependency-materialization-replacement.md
MAX_CHANGED_REPOSITORY_FILES = 1
ARCHIVE_ADMISSION_RUNS = 1
MATERIALIZATION_LAUNCHES = 1
SECOND_ARCHIVE_ADMISSION_RUN = NOT_AUTHORIZED
SECOND_MATERIALIZATION_LAUNCH = NOT_AUTHORIZED
NODE_MODULES_GIT_ADOPTION = NOT_AUTHORIZED
PROVIDER_RUNTIME_EXECUTION = NOT_AUTHORIZED
PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

The predecessor 004C1FB attempt remains permanently nonqualifying. 004C1FC used a fresh worktree, fresh evidence root, fresh exclusive lock, fresh archive-admission run, and a fresh one-shot materialization launch.

## 2. Pre-execution repository proof

```text
# branch.oid adf6860961c91e8110d045b7dad6db73b230cde0
# branch.head (detached)
```

The frozen preflight object is:

```json
{"archive_admission_runs_authorized":1,"authority":"github:issue-comment:5658708308","build_execution":"DENY_BY_DEFAULT","canonical_main":"adf6860961c91e8110d045b7dad6db73b230cde0","canonical_tree":"3344138e2b1af05e1ee0e0a3d98edecb170a1e05","control_hashes":{"package.json":"71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183","pnpm-lock.yaml":"ee29f5f0f4d1b1b98fbd615de64589a7a5b6a92bee368f4ef8a07255a989479e","pnpm-workspace.yaml":"695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f","provenance/components/pdfium-2.15.0/ADOPTION.json":"e05b64a2dba4a319aef8d2978898b6db966e5bed5b6fef2264af6c1ce731bb36"},"credentials":"NONE","evidence_root":"004c1fc-clean-materialization-20260914T034932Z","lifecycle_execution":"DENY_BY_DEFAULT","lock_path":"/tmp/signthos-004c1fc-20260914T034932Z.lock","materialization_launches_authorized":1,"pre_git_status_clean":true,"pre_git_status_sha256":"49560a1aaedb1ec6040e6e751ce3f1c72b197a5a927346fb259071b31db394fb","proxy":"NONE","redirects":"PROHIBITED","registry_allowlist":"registry.npmjs.org:443","root_npmrc":"ABSENT","schema":"signthos.004c1fc.preflight.v1","toolchain_hashes":{"tool_node_archive":"2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2","tool_node_executable":"89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7","tool_pnpm_entrypoint":"b276da51dc8ca5b0d3ee3371695b50fc8b3244b281b091c63a3f082a88dadeb9","tool_pnpm_tarball":"ccb5c479cab1b00621325bfe7d4c9a8a8031e7a525d7249e275ecbec81b08db2"},"unit":"004C1FC_CLEAN_DETERMINISTIC_DEPENDENCY_MATERIALIZATION_REPLACEMENT","worktree":"/Users/abdulazizalsh/Signthos-worktrees/004c1fc-clean-materialization-20260914T034932Z"}
```

| Canonical control | SHA-256 |
| --- | --- |
| `package.json` | `71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183` |
| `pnpm-workspace.yaml` | `695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f` |
| `pnpm-lock.yaml` | `ee29f5f0f4d1b1b98fbd615de64589a7a5b6a92bee368f4ef8a07255a989479e` |
| `provenance/components/pdfium-2.15.0/ADOPTION.json` | `e05b64a2dba4a319aef8d2978898b6db966e5bed5b6fef2264af6c1ce731bb36` |

`/.npmrc` was absent before execution and remained absent afterward.

## 3. Exact toolchain and substrate

```text
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
TARGET_PLATFORM = linux/amd64
GUEST_MACHINE = x86_64
GUEST_LIBC = ldd (Ubuntu GLIBC 2.35-0ubuntu3.8) 2.35
ROSETTA_VISIBLE = NO
NODE_VERSION = 24.20.0
NODE_ARCHIVE_SHA256 = 2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2
NODE_EXECUTABLE_SHA256 = 89af8424dd53e560b1933f87ba650d8bf57c83ca5a04600eefb31f416aabbae7
PNPM_VERSION = 10.34.5
PNPM_TARBALL_SHA256 = ccb5c479cab1b00621325bfe7d4c9a8a8031e7a525d7249e275ecbec81b08db2
PNPM_ENTRYPOINT_SHA256 = b276da51dc8ca5b0d3ee3371695b50fc8b3244b281b091c63a3f082a88dadeb9
```

## 4. Exact 18-package admission set

| Package | Bytes | License | Canonical SHA-256 | Registry SHA-1 | Lockfile SHA-512 SRI |
| --- | ---: | --- | --- | --- | --- |
| `@embedpdf/core@2.15.0` | 154567 | `MIT` | `9dd8825fea07a3a48b1befe4ba08d4841693f26bc2a4c1f0cab347126179a73d` | `6c3d962910afdd63f88725c92afb872f1cf430e4` | `sha512-0yaPCgvbE5/cBf+5rHBUsRUm8i6hSl894xjC19HTOmb8DqrhxOxbOQSyjiTbJTQK52zZrNL79SigsPgGHPrYWA==` |
| `@embedpdf/engines@2.15.0` | 713626 | `MIT` | `044aeff2b0b453666c73def7cd06843d5f4510b028a4019785c2f1d814d24983` | `2e068fe4959575d82ec489fae01b9630f15ac6e8` | `sha512-fW5UoqpDRkAWDbGMl3y6ril3l2qXzoYz+klt4O2P8gWzYzhG3fmr0L2+qzjD+BPO+QfYMNNvmBI+teT/nYjm/g==` |
| `@embedpdf/fonts-arabic@1.0.0` | 151443 | `OFL-1.1` | `6877696b89128ba8c488c96456f80dc0a5154d6ea9530148e0ba515fb6b88046` | `32cf6e9b13a73827800278db7ae832981f9764df` | `sha512-SnGvQb+LwPZQO2WjjvlmXrJZolJUfLYbLZQSaYUw1vrQyMyJKT4LewvJGG+hZ+Yz2fz7OMIQ+4Gc98mGODZtOg==` |
| `@embedpdf/fonts-hebrew@1.0.0` | 23659 | `OFL-1.1` | `af0780c63bf2058337fddce3059722811f992137e66537383881a0da3923aac2` | `5ad24258c1606fa95dbb4ba5fa67757502c58edc` | `sha512-5HVAKGL7VqPeTxxADDrSqAFBxfmAXdP8fIqrPwJIKkqdK2643bOer8CqnnpO3/nPoFhkzxhttWMB9BGiqSW62w==` |
| `@embedpdf/fonts-jp@1.0.0` | 27101289 | `OFL-1.1` | `df8af067c031e5dea31dab7105bf01560cccfe007fe055d7d69b395fc1526b58` | `03c643bde1e0e556bfa1cf4bbb7eafbe555aa9ac` | `sha512-BY2tv/mcICUUKf+M/bizf3RU65PMqKClJ/e5o9mgMibxyML0OQvEDwYMRPODQkKgJKXCO3ScHmVvcmXp6kt+fA==` |
| `@embedpdf/fonts-kr@1.0.0` | 25473302 | `OFL-1.1` | `c6e93dac723b37c743af2007fb3e18ac9ce8dce10f65beb100b3c8327571fcec` | `4652ae3b26a83c3c7e499f0b7b60375fb9bb1d46` | `sha512-bh88HXSvOBS581kgmihWY7Ijp9hBsvlmXogFG5LSNx9UBAobRcakZiFMGieRBc06hUSkpo7WhjaFM/z/SfQ8dQ==` |
| `@embedpdf/fonts-latin@1.0.0` | 5623839 | `OFL-1.1` | `474d091abd00f943422546462277ad3a3f29fdb4f44019a575888d5d8b763f18` | `b646560c2c147f0ccbf04ae26ef18c7822506240` | `sha512-LLYysdr8O6sRNzhmW3PbF3AeA8xnqvOi4XLFfIfNlW5uEZ+qsJdcfd78Q78sFJMhlaOAYFMziMMsnOzmx463rA==` |
| `@embedpdf/fonts-sc@1.0.0` | 36514660 | `OFL-1.1` | `589e6a5f2168430b4ae5a46bfdc4606f1798f5c06be5a2369ab89f75b804a0ad` | `a52a70b3cb36e9e49148f2055f51d0fa387f41bf` | `sha512-ETXl7XCwaQLSSvMO3EUDwMNqtL64kX2LlFxarTRi/NsIGGOIxUurGfKtrkmtnKHrWy1jAJSt6oxK2uJhvdvQIw==` |
| `@embedpdf/fonts-tc@1.0.0` | 34078976 | `OFL-1.1` | `3627a6a23f0cb07dca9a72db07e2e47afb15b934b850529367458b64b322e8a4` | `21262bb512ede384c3fb84b952a6812b98e793f4` | `sha512-rGZJbVD6DYS5BbXdpEMnWkpVF0Knar+bsiyb2o3+YRx7O8eyFubEBQUSUInirQk69HA6fc3GhYCg7TyC/oD76Q==` |
| `@embedpdf/models@2.15.0` | 165290 | `MIT` | `ce7859614d73cd2356329ce5b5b9685de0563ab1fcd1bab519ae1efcf2318fd9` | `dff75043166abf361c850f294ec242ff4eacbdd8` | `sha512-gHr+hAN094kmzCB+6J2zaiHS8o4tKeY0IfTOxVEGwqntgKk8LCWD3s+P7dlVY3V8XUVmdyFWhFt7zwm0uw+VMg==` |
| `@embedpdf/pdfium@2.15.0` | 2665003 | `MIT` | `fe0cb4677782a58b67f555df9a1257742bcfbf390b9a3e08bd8ad976eea436bb` | `b073cf9cee2252507c4fc81fb47a156cb2a19662` | `sha512-KgpRND2MYcdbhzb2EMb4WzWcJYrR0A6JXvhMv4WthEHKt6qmNo2v/MC68bpYvpveYT9GNnUnY/+TG5MpXY3pRw==` |
| `@embedpdf/plugin-document-manager@2.15.0` | 49369 | `MIT` | `627e3b189fd7ee6401c6878636bc3bf6cc4a86450871dd448dbc6cb8c68a9951` | `2a9cfc2a9942c54d23432209942448a1a81b0c12` | `sha512-M8EwOuonICSHfOklTMwk0XfyPhG9v9EMDRU9Pvz0zAe1DJzUPtIxUh+CgxtFSSnUeKSfxE7JpTRryrbUW0XcGg==` |
| `@embedpdf/plugin-interaction-manager@2.15.0` | 77815 | `MIT` | `c847529a63afcad49092875768526ea58ee28807f1925f8443625c44f5f9c1dc` | `d899c14f262358d7120124d5cf9d4e9df4dcf885` | `sha512-YCMvTvu4Fm1KNuEhj+CftzG+T6F1+/QhI7eaYft9Lp5xm3CYSXdR3pNfGwNFy5XkDUDwB1IscLTiU0q75viMCw==` |
| `@embedpdf/plugin-render@2.15.0` | 23143 | `MIT` | `f594e90916168c952433c410582519caa4704c990f31a0ccfcf6e7e14b4c44de` | `da1cfac73c3f8f8dcd064a7fc27d953b73eb2d3a` | `sha512-EVfn8XsdU10VgrSs9qKo8nqjfUyt2/NWFJtlW3nX4sZ74Pi9xSvEa7/B99/LYZZMa0ENzi+4HKAXiQ6NUXisDg==` |
| `@embedpdf/plugin-search@2.15.0` | 43625 | `MIT` | `307118b067cd30fd97251be46fe7ae917f29bc20603d9bd371461b5481f3eeda` | `4dc1dc7c80bbf1f121f34cfb5208456439078048` | `sha512-mMzy8uo3xvDMjSc+xuBMgdI/mmmpgbZ6xKTmNxpF0d8BcaWu6Zp9a4ewamfjBwg8WF/qUW49U6HYZsiRr3NUEQ==` |
| `@embedpdf/plugin-selection@2.15.0` | 126997 | `MIT` | `4bab888db26e696ac6ce9457a3aea03246929802f6721e43d5c58e2c15101f28` | `a2f269c0b66ef96ea06ad68c731cd3233346194f` | `sha512-iEnhx0jeQrbze7WHkHhZtF21yfGBuqF2B+V2efLHT2O0a2fnof+PEVaQQRgERSfrwRvLvyEJL9ud54E41ahsRQ==` |
| `@embedpdf/plugin-thumbnail@2.15.0` | 47528 | `MIT` | `40f1155ad6de9805441e9b2d2179ffd8db784ea59172bb7a796c80475f28bee5` | `ca68dc15714a5790295eb569507acdb3b59bf9c5` | `sha512-39EojqobHmvSvk2ejKeh58m43ApGS3cie/sVZP+pkXr6MRogX6+ivMa5GfoqBzh9wdZAZ3l4XTd+RQ4kFZ4aqQ==` |
| `@embedpdf/utils@2.15.0` | 243717 | `MIT` | `fc64ec73a43fdcf4727874b188c1c291489f61ca5a9fe673aefdd30a21ae3172` | `bd7561a76b0117421354c08b15582c1f6791e4f3` | `sha512-13UEMPpu5XrxmYI/MPiLtJC3R3b1g8ii3zfhQ3g1WpECybnwTuhBgwqaOvqw3rVCKCnXEgNMs4PBCzLyFpZZTw==` |

The single fresh archive-admission run returned `PASS_18_OF_18`, total tarball bytes `133277848`, zero unsafe paths, and zero prohibited lifecycle hooks. Every metadata and tarball request recorded HTTP 200, zero redirects, TLS verification success, exact effective URL, no emitted credential header, and `registry.npmjs.org` as the exact registry host.

```text
ARCHIVE_ADMISSION_SUMMARY_SHA256 = 01088326d31aa638ba3e69e1f1a62daaac34b1eba8c57b799653dc4bc6c75244
ARCHIVE_ADMISSION_SCRIPT_SHA256 = dadbbdb55e7d4e31106600eb811d61fb721bf494f61006fe6083650bc3c20eca
EXPECTED_PACKAGES_JSON_SHA256 = 055f5c21ab8d6396db0d49596fecec4190ce442c3a243e421407ced06e66270b
CONTROL_SCRIPT_MANIFEST_SHA256 = c9962de5a8a3d3d74f693124dfe3e29fc94c3318ab28533b678dfd21c6acd517
```

### Exact archive-admission summary

```json
{"authority":"github:issue-comment:5658708308","lifecycle_hooks":0,"package_count":18,"result":"PASS_18_OF_18","results":[{"bytes":154567,"key":"@embedpdf/core@2.15.0","license":"MIT","metadata_request_headers":["GET /%40embedpdf%2Fcore/2.15.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:322","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Fcore/2.15.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Fcore/2.15.0","sha1":"6c3d962910afdd63f88725c92afb872f1cf430e4","sha256":"9dd8825fea07a3a48b1befe4ba08d4841693f26bc2a4c1f0cab347126179a73d","sri":"sha512-0yaPCgvbE5/cBf+5rHBUsRUm8i6hSl894xjC19HTOmb8DqrhxOxbOQSyjiTbJTQK52zZrNL79SigsPgGHPrYWA==","tarball_request_headers":["GET /@embedpdf/core/-/core-2.15.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:922","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/core/-/core-2.15.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/core/-/core-2.15.0.tgz"},{"bytes":713626,"key":"@embedpdf/engines@2.15.0","license":"MIT","metadata_request_headers":["GET /%40embedpdf%2Fengines/2.15.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:422","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Fengines/2.15.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Fengines/2.15.0","sha1":"2e068fe4959575d82ec489fae01b9630f15ac6e8","sha256":"044aeff2b0b453666c73def7cd06843d5f4510b028a4019785c2f1d814d24983","sri":"sha512-fW5UoqpDRkAWDbGMl3y6ril3l2qXzoYz+klt4O2P8gWzYzhG3fmr0L2+qzjD+BPO+QfYMNNvmBI+teT/nYjm/g==","tarball_request_headers":["GET /@embedpdf/engines/-/engines-2.15.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:a22","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/engines/-/engines-2.15.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/engines/-/engines-2.15.0.tgz"},{"bytes":151443,"key":"@embedpdf/fonts-arabic@1.0.0","license":"OFL-1.1","metadata_request_headers":["GET /%40embedpdf%2Ffonts-arabic/1.0.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"104.16.9.34","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Ffonts-arabic/1.0.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Ffonts-arabic/1.0.0","sha1":"32cf6e9b13a73827800278db7ae832981f9764df","sha256":"6877696b89128ba8c488c96456f80dc0a5154d6ea9530148e0ba515fb6b88046","sri":"sha512-SnGvQb+LwPZQO2WjjvlmXrJZolJUfLYbLZQSaYUw1vrQyMyJKT4LewvJGG+hZ+Yz2fz7OMIQ+4Gc98mGODZtOg==","tarball_request_headers":["GET /@embedpdf/fonts-arabic/-/fonts-arabic-1.0.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:522","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/fonts-arabic/-/fonts-arabic-1.0.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/fonts-arabic/-/fonts-arabic-1.0.0.tgz"},{"bytes":23659,"key":"@embedpdf/fonts-hebrew@1.0.0","license":"OFL-1.1","metadata_request_headers":["GET /%40embedpdf%2Ffonts-hebrew/1.0.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"104.16.9.34","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Ffonts-hebrew/1.0.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Ffonts-hebrew/1.0.0","sha1":"5ad24258c1606fa95dbb4ba5fa67757502c58edc","sha256":"af0780c63bf2058337fddce3059722811f992137e66537383881a0da3923aac2","sri":"sha512-5HVAKGL7VqPeTxxADDrSqAFBxfmAXdP8fIqrPwJIKkqdK2643bOer8CqnnpO3/nPoFhkzxhttWMB9BGiqSW62w==","tarball_request_headers":["GET /@embedpdf/fonts-hebrew/-/fonts-hebrew-1.0.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:722","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/fonts-hebrew/-/fonts-hebrew-1.0.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/fonts-hebrew/-/fonts-hebrew-1.0.0.tgz"},{"bytes":27101289,"key":"@embedpdf/fonts-jp@1.0.0","license":"OFL-1.1","metadata_request_headers":["GET /%40embedpdf%2Ffonts-jp/1.0.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:222","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Ffonts-jp/1.0.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Ffonts-jp/1.0.0","sha1":"03c643bde1e0e556bfa1cf4bbb7eafbe555aa9ac","sha256":"df8af067c031e5dea31dab7105bf01560cccfe007fe055d7d69b395fc1526b58","sri":"sha512-BY2tv/mcICUUKf+M/bizf3RU65PMqKClJ/e5o9mgMibxyML0OQvEDwYMRPODQkKgJKXCO3ScHmVvcmXp6kt+fA==","tarball_request_headers":["GET /@embedpdf/fonts-jp/-/fonts-jp-1.0.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/fonts-jp/-/fonts-jp-1.0.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/fonts-jp/-/fonts-jp-1.0.0.tgz"},{"bytes":25473302,"key":"@embedpdf/fonts-kr@1.0.0","license":"OFL-1.1","metadata_request_headers":["GET /%40embedpdf%2Ffonts-kr/1.0.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:22","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Ffonts-kr/1.0.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Ffonts-kr/1.0.0","sha1":"4652ae3b26a83c3c7e499f0b7b60375fb9bb1d46","sha256":"c6e93dac723b37c743af2007fb3e18ac9ce8dce10f65beb100b3c8327571fcec","sri":"sha512-bh88HXSvOBS581kgmihWY7Ijp9hBsvlmXogFG5LSNx9UBAobRcakZiFMGieRBc06hUSkpo7WhjaFM/z/SfQ8dQ==","tarball_request_headers":["GET /@embedpdf/fonts-kr/-/fonts-kr-1.0.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:822","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/fonts-kr/-/fonts-kr-1.0.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/fonts-kr/-/fonts-kr-1.0.0.tgz"},{"bytes":5623839,"key":"@embedpdf/fonts-latin@1.0.0","license":"OFL-1.1","metadata_request_headers":["GET /%40embedpdf%2Ffonts-latin/1.0.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:122","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Ffonts-latin/1.0.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Ffonts-latin/1.0.0","sha1":"b646560c2c147f0ccbf04ae26ef18c7822506240","sha256":"474d091abd00f943422546462277ad3a3f29fdb4f44019a575888d5d8b763f18","sri":"sha512-LLYysdr8O6sRNzhmW3PbF3AeA8xnqvOi4XLFfIfNlW5uEZ+qsJdcfd78Q78sFJMhlaOAYFMziMMsnOzmx463rA==","tarball_request_headers":["GET /@embedpdf/fonts-latin/-/fonts-latin-1.0.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/fonts-latin/-/fonts-latin-1.0.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/fonts-latin/-/fonts-latin-1.0.0.tgz"},{"bytes":36514660,"key":"@embedpdf/fonts-sc@1.0.0","license":"OFL-1.1","metadata_request_headers":["GET /%40embedpdf%2Ffonts-sc/1.0.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Ffonts-sc/1.0.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Ffonts-sc/1.0.0","sha1":"a52a70b3cb36e9e49148f2055f51d0fa387f41bf","sha256":"589e6a5f2168430b4ae5a46bfdc4606f1798f5c06be5a2369ab89f75b804a0ad","sri":"sha512-ETXl7XCwaQLSSvMO3EUDwMNqtL64kX2LlFxarTRi/NsIGGOIxUurGfKtrkmtnKHrWy1jAJSt6oxK2uJhvdvQIw==","tarball_request_headers":["GET /@embedpdf/fonts-sc/-/fonts-sc-1.0.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/fonts-sc/-/fonts-sc-1.0.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/fonts-sc/-/fonts-sc-1.0.0.tgz"},{"bytes":34078976,"key":"@embedpdf/fonts-tc@1.0.0","license":"OFL-1.1","metadata_request_headers":["GET /%40embedpdf%2Ffonts-tc/1.0.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"104.16.9.34","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Ffonts-tc/1.0.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Ffonts-tc/1.0.0","sha1":"21262bb512ede384c3fb84b952a6812b98e793f4","sha256":"3627a6a23f0cb07dca9a72db07e2e47afb15b934b850529367458b64b322e8a4","sri":"sha512-rGZJbVD6DYS5BbXdpEMnWkpVF0Knar+bsiyb2o3+YRx7O8eyFubEBQUSUInirQk69HA6fc3GhYCg7TyC/oD76Q==","tarball_request_headers":["GET /@embedpdf/fonts-tc/-/fonts-tc-1.0.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/fonts-tc/-/fonts-tc-1.0.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/fonts-tc/-/fonts-tc-1.0.0.tgz"},{"bytes":165290,"key":"@embedpdf/models@2.15.0","license":"MIT","metadata_request_headers":["GET /%40embedpdf%2Fmodels/2.15.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Fmodels/2.15.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Fmodels/2.15.0","sha1":"dff75043166abf361c850f294ec242ff4eacbdd8","sha256":"ce7859614d73cd2356329ce5b5b9685de0563ab1fcd1bab519ae1efcf2318fd9","sri":"sha512-gHr+hAN094kmzCB+6J2zaiHS8o4tKeY0IfTOxVEGwqntgKk8LCWD3s+P7dlVY3V8XUVmdyFWhFt7zwm0uw+VMg==","tarball_request_headers":["GET /@embedpdf/models/-/models-2.15.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/models/-/models-2.15.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/models/-/models-2.15.0.tgz"},{"bytes":2665003,"key":"@embedpdf/pdfium@2.15.0","license":"MIT","metadata_request_headers":["GET /%40embedpdf%2Fpdfium/2.15.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Fpdfium/2.15.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Fpdfium/2.15.0","sha1":"b073cf9cee2252507c4fc81fb47a156cb2a19662","sha256":"fe0cb4677782a58b67f555df9a1257742bcfbf390b9a3e08bd8ad976eea436bb","sri":"sha512-KgpRND2MYcdbhzb2EMb4WzWcJYrR0A6JXvhMv4WthEHKt6qmNo2v/MC68bpYvpveYT9GNnUnY/+TG5MpXY3pRw==","tarball_request_headers":["GET /@embedpdf/pdfium/-/pdfium-2.15.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/pdfium/-/pdfium-2.15.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/pdfium/-/pdfium-2.15.0.tgz"},{"bytes":49369,"key":"@embedpdf/plugin-document-manager@2.15.0","license":"MIT","metadata_request_headers":["GET /%40embedpdf%2Fplugin-document-manager/2.15.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Fplugin-document-manager/2.15.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Fplugin-document-manager/2.15.0","sha1":"2a9cfc2a9942c54d23432209942448a1a81b0c12","sha256":"627e3b189fd7ee6401c6878636bc3bf6cc4a86450871dd448dbc6cb8c68a9951","sri":"sha512-M8EwOuonICSHfOklTMwk0XfyPhG9v9EMDRU9Pvz0zAe1DJzUPtIxUh+CgxtFSSnUeKSfxE7JpTRryrbUW0XcGg==","tarball_request_headers":["GET /@embedpdf/plugin-document-manager/-/plugin-document-manager-2.15.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/plugin-document-manager/-/plugin-document-manager-2.15.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/plugin-document-manager/-/plugin-document-manager-2.15.0.tgz"},{"bytes":77815,"key":"@embedpdf/plugin-interaction-manager@2.15.0","license":"MIT","metadata_request_headers":["GET /%40embedpdf%2Fplugin-interaction-manager/2.15.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Fplugin-interaction-manager/2.15.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Fplugin-interaction-manager/2.15.0","sha1":"d899c14f262358d7120124d5cf9d4e9df4dcf885","sha256":"c847529a63afcad49092875768526ea58ee28807f1925f8443625c44f5f9c1dc","sri":"sha512-YCMvTvu4Fm1KNuEhj+CftzG+T6F1+/QhI7eaYft9Lp5xm3CYSXdR3pNfGwNFy5XkDUDwB1IscLTiU0q75viMCw==","tarball_request_headers":["GET /@embedpdf/plugin-interaction-manager/-/plugin-interaction-manager-2.15.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/plugin-interaction-manager/-/plugin-interaction-manager-2.15.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/plugin-interaction-manager/-/plugin-interaction-manager-2.15.0.tgz"},{"bytes":23143,"key":"@embedpdf/plugin-render@2.15.0","license":"MIT","metadata_request_headers":["GET /%40embedpdf%2Fplugin-render/2.15.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Fplugin-render/2.15.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Fplugin-render/2.15.0","sha1":"da1cfac73c3f8f8dcd064a7fc27d953b73eb2d3a","sha256":"f594e90916168c952433c410582519caa4704c990f31a0ccfcf6e7e14b4c44de","sri":"sha512-EVfn8XsdU10VgrSs9qKo8nqjfUyt2/NWFJtlW3nX4sZ74Pi9xSvEa7/B99/LYZZMa0ENzi+4HKAXiQ6NUXisDg==","tarball_request_headers":["GET /@embedpdf/plugin-render/-/plugin-render-2.15.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"104.16.9.34","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/plugin-render/-/plugin-render-2.15.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/plugin-render/-/plugin-render-2.15.0.tgz"},{"bytes":43625,"key":"@embedpdf/plugin-search@2.15.0","license":"MIT","metadata_request_headers":["GET /%40embedpdf%2Fplugin-search/2.15.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Fplugin-search/2.15.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Fplugin-search/2.15.0","sha1":"4dc1dc7c80bbf1f121f34cfb5208456439078048","sha256":"307118b067cd30fd97251be46fe7ae917f29bc20603d9bd371461b5481f3eeda","sri":"sha512-mMzy8uo3xvDMjSc+xuBMgdI/mmmpgbZ6xKTmNxpF0d8BcaWu6Zp9a4ewamfjBwg8WF/qUW49U6HYZsiRr3NUEQ==","tarball_request_headers":["GET /@embedpdf/plugin-search/-/plugin-search-2.15.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/plugin-search/-/plugin-search-2.15.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/plugin-search/-/plugin-search-2.15.0.tgz"},{"bytes":126997,"key":"@embedpdf/plugin-selection@2.15.0","license":"MIT","metadata_request_headers":["GET /%40embedpdf%2Fplugin-selection/2.15.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Fplugin-selection/2.15.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Fplugin-selection/2.15.0","sha1":"a2f269c0b66ef96ea06ad68c731cd3233346194f","sha256":"4bab888db26e696ac6ce9457a3aea03246929802f6721e43d5c58e2c15101f28","sri":"sha512-iEnhx0jeQrbze7WHkHhZtF21yfGBuqF2B+V2efLHT2O0a2fnof+PEVaQQRgERSfrwRvLvyEJL9ud54E41ahsRQ==","tarball_request_headers":["GET /@embedpdf/plugin-selection/-/plugin-selection-2.15.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/plugin-selection/-/plugin-selection-2.15.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/plugin-selection/-/plugin-selection-2.15.0.tgz"},{"bytes":47528,"key":"@embedpdf/plugin-thumbnail@2.15.0","license":"MIT","metadata_request_headers":["GET /%40embedpdf%2Fplugin-thumbnail/2.15.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Fplugin-thumbnail/2.15.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Fplugin-thumbnail/2.15.0","sha1":"ca68dc15714a5790295eb569507acdb3b59bf9c5","sha256":"40f1155ad6de9805441e9b2d2179ffd8db784ea59172bb7a796c80475f28bee5","sri":"sha512-39EojqobHmvSvk2ejKeh58m43ApGS3cie/sVZP+pkXr6MRogX6+ivMa5GfoqBzh9wdZAZ3l4XTd+RQ4kFZ4aqQ==","tarball_request_headers":["GET /@embedpdf/plugin-thumbnail/-/plugin-thumbnail-2.15.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/plugin-thumbnail/-/plugin-thumbnail-2.15.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/plugin-thumbnail/-/plugin-thumbnail-2.15.0.tgz"},{"bytes":243717,"key":"@embedpdf/utils@2.15.0","license":"MIT","metadata_request_headers":["GET /%40embedpdf%2Futils/2.15.0 HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"metadata_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/%40embedpdf%2Futils/2.15.0"},"metadata_url":"https://registry.npmjs.org/%40embedpdf%2Futils/2.15.0","sha1":"bd7561a76b0117421354c08b15582c1f6791e4f3","sha256":"fc64ec73a43fdcf4727874b188c1c291489f61ca5a9fe673aefdd30a21ae3172","sri":"sha512-13UEMPpu5XrxmYI/MPiLtJC3R3b1g8ii3zfhQ3g1WpECybnwTuhBgwqaOvqw3rVCKCnXEgNMs4PBCzLyFpZZTw==","tarball_request_headers":["GET /@embedpdf/utils/-/utils-2.15.0.tgz HTTP/2","Host: registry.npmjs.org","User-Agent: curl/8.7.1","Accept: */*",""],"tarball_transport":{"http_code":"200","num_redirects":"0","remote_ip":"2606:4700::6810:622","ssl_verify_result":"0","url_effective":"https://registry.npmjs.org/@embedpdf/utils/-/utils-2.15.0.tgz"},"tarball_url":"https://registry.npmjs.org/@embedpdf/utils/-/utils-2.15.0.tgz"}],"schema":"signthos.004c1fc.archive-admission.v1","total_bytes":133277848,"unsafe_members":0}
```

### Exact immutable archive-admission control source

```python
#!/usr/bin/env python3
from pathlib import Path, PurePosixPath
import base64, hashlib, json, os, subprocess, sys, tarfile, urllib.parse, io, time
root=Path(sys.argv[1]).resolve()
expected=json.loads((root/'CONTROL/expected-packages.json').read_text())
outdir=root/'ARCHIVE_EVIDENCE'; outdir.mkdir(parents=True,exist_ok=True)
prohibited={'preinstall','install','postinstall','prepare','prepublish'}
font_names={x['name'] for x in expected if x['license']=='OFL-1.1'}
PDF_LICENSE='f5031b66adba8ef5ef57666deff980a7f2ccff5c8a8c22a8117e854d2b8dfcd3'
PDFIUM_LICENSE='b033ffb8fc19c23ca81f7e98019ab658cc6f4cf14587c7c6a2a67fb0f6ac0f5a'
PDFIUM_WASM='c0af5a6aca30d7e54a149c3a68e317116ca906d6edc28fd3318b12c7d9478ac8'
FONT_LICENSE='cea028c0b5185b804ae79f1eab96ca5ee469d61d44925972a2379430890bbec1'
def sha256(b): return hashlib.sha256(b).hexdigest()
def sha1(b): return hashlib.sha1(b).hexdigest()
def sri512(b): return 'sha512-'+base64.b64encode(hashlib.sha512(b).digest()).decode()
def curl(url, stem):
    body=outdir/f'{stem}.body'; headers=outdir/f'{stem}.headers'; verbose=outdir/f'{stem}.verbose'; metrics=outdir/f'{stem}.metrics'
    cmd=['/usr/bin/curl','--disable','--noproxy','*','--proto','=https','--proto-redir','=https','--max-redirs','0','--connect-timeout','20','--max-time','180','--retry','0','--fail-with-body','--silent','--show-error','--dump-header',str(headers),'--output',str(body),'--write-out','http_code=%{http_code}\nurl_effective=%{url_effective}\nnum_redirects=%{num_redirects}\nssl_verify_result=%{ssl_verify_result}\nremote_ip=%{remote_ip}\n', '--verbose', url]
    env={'PATH':'/usr/bin:/bin','HOME':str(root/'HOME'),'TMPDIR':str(root/'TMPDIR'),'LANG':'C','LC_ALL':'C'}
    p=subprocess.run(cmd,env=env,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    metrics.write_bytes(p.stdout); verbose.write_bytes(p.stderr)
    if p.returncode!=0: raise RuntimeError(f'curl rc={p.returncode} url={url}')
    m={}
    for ln in p.stdout.decode().splitlines():
        if '=' in ln: k,v=ln.split('=',1); m[k]=v
    if m.get('http_code')!='200' or m.get('num_redirects')!='0' or m.get('url_effective')!=url or m.get('ssl_verify_result')!='0': raise RuntimeError(f'transport predicate failed {url} {m}')
    request_headers=[]
    for ln in p.stderr.decode(errors='replace').splitlines():
        if ln.startswith('> '): request_headers.append(ln[2:])
    lowered='\n'.join(request_headers).lower()
    for h in ('authorization:','proxy-authorization:','cookie:'):
        if h in lowered: raise RuntimeError(f'credential header emitted: {h}')
    return body.read_bytes(),m,request_headers
results=[]
for i,e in enumerate(expected,1):
    name=e['name']; version=e['version']; key=f'{name}@{version}'
    encoded=urllib.parse.quote(name,safe='')
    meta_url=f'https://registry.npmjs.org/{encoded}/{version}'
    meta_raw,mm,mh=curl(meta_url,f'{i:02d}-metadata')
    meta=json.loads(meta_raw)
    if meta.get('name')!=name or meta.get('version')!=version: raise RuntimeError(f'metadata identity {key}')
    if meta.get('license')!=e['license']: raise RuntimeError(f'license {key}: {meta.get("license")}')
    dist=meta.get('dist') or {}
    if dist.get('integrity')!=e['sri'] or dist.get('shasum')!=e['sha1']: raise RuntimeError(f'dist identity {key}')
    scripts=meta.get('scripts') or {}
    if prohibited.intersection(scripts): raise RuntimeError(f'metadata lifecycle hooks {key}')
    tar_url=dist.get('tarball',''); u=urllib.parse.urlparse(tar_url)
    if u.scheme!='https' or u.hostname!='registry.npmjs.org' or (u.port not in (None,443)): raise RuntimeError(f'tar host {key}: {tar_url}')
    tar_raw,tm,th=curl(tar_url,f'{i:02d}-tarball')
    if len(tar_raw)!=e['bytes'] or sha256(tar_raw)!=e['sha256'] or sha1(tar_raw)!=e['sha1'] or sri512(tar_raw)!=e['sri']: raise RuntimeError(f'tar digest/bytes {key}')
    with tarfile.open(fileobj=io.BytesIO(tar_raw),mode='r:gz') as tf:
        members=tf.getmembers()
        if len(members)!=e['files']: raise RuntimeError(f'file count {key}: {len(members)} != {e["files"]}')
        for x in members:
            pp=PurePosixPath(x.name)
            if pp.is_absolute() or '..' in pp.parts: raise RuntimeError(f'unsafe path {key}: {x.name}')
        pm=tf.extractfile('package/package.json')
        if not pm: raise RuntimeError(f'package.json missing {key}')
        pkg=json.load(pm)
        if pkg.get('name')!=name or pkg.get('version')!=version: raise RuntimeError(f'archive identity {key}')
        if prohibited.intersection((pkg.get('scripts') or {})): raise RuntimeError(f'archive lifecycle hooks {key}')
        if pkg.get('license')!=e['license']: raise RuntimeError(f'archive license {key}')
        if name=='@embedpdf/pdfium':
            for path,exp in [('package/LICENSE',PDF_LICENSE),('package/LICENSE.pdfium',PDFIUM_LICENSE),('package/dist/pdfium.wasm',PDFIUM_WASM)]:
                f=tf.extractfile(path)
                if not f or sha256(f.read())!=exp: raise RuntimeError(f'pdfium payload identity {path}')
        if name in font_names:
            f=tf.extractfile('package/LICENSE')
            if not f or sha256(f.read())!=FONT_LICENSE: raise RuntimeError(f'font license identity {key}')
    results.append({'key':key,'metadata_url':meta_url,'tarball_url':tar_url,'bytes':len(tar_raw),'sha256':sha256(tar_raw),'sha1':sha1(tar_raw),'sri':sri512(tar_raw),'license':e['license'],'metadata_transport':mm,'tarball_transport':tm,'metadata_request_headers':mh,'tarball_request_headers':th})
summary={'schema':'signthos.004c1fc.archive-admission.v1','authority':'github:issue-comment:5658708308','result':'PASS_18_OF_18','package_count':len(results),'total_bytes':sum(x['bytes'] for x in results),'unsafe_members':0,'lifecycle_hooks':0,'results':results}
sp=outdir/'archive-admission-summary.json'; sp.write_text(json.dumps(summary,sort_keys=True,separators=(',',':'))+'\n')
print('ARCHIVE_ADMISSION=PASS_18_OF_18')
print('PACKAGE_COUNT='+str(len(results)))
print('TOTAL_BYTES='+str(summary['total_bytes']))
print('SUMMARY_SHA256='+sha256(sp.read_bytes()))
```

## 5. Single materialization launch

The only writable mount was the fresh external evidence root at `/attempt`; the retained toolchain mount at `/toolchain` was read-only; no repository worktree was mounted.

Frozen environment policy:

```text
ENTRYPOINT=/usr/bin/env -i
PATH=/toolchain/node/node-v24.20.0-linux-x64/bin:/usr/bin:/bin
HOME=/attempt/HOME
XDG_CACHE_HOME=/attempt/XDG_CACHE_HOME
TMPDIR=/attempt/TMPDIR
PNPM_HOME=/attempt/HOME/.pnpm
NPM_CONFIG_REGISTRY=https://registry.npmjs.org/
npm_config_registry=https://registry.npmjs.org/
HTTP_PROXY=<UNSET>
HTTPS_PROXY=<UNSET>
ALL_PROXY=<UNSET>
NO_PROXY=<UNSET>
http_proxy=<UNSET>
https_proxy=<UNSET>
all_proxy=<UNSET>
no_proxy=<UNSET>
NPM_CONFIG_USERCONFIG=<UNSET>
npm_config_userconfig=<UNSET>
NODE_AUTH_TOKEN=<UNSET>
NPM_TOKEN=<UNSET>
COREPACK_HOME=<UNSET>
NODE_DEBUG=http,https,net,tls
```

Frozen exact command:

```text
/toolchain/node/node-v24.20.0-linux-x64/bin/node /toolchain/pnpm/package/bin/pnpm.cjs install --frozen-lockfile --ignore-scripts --strict-peer-dependencies --reporter=ndjson --store-dir=/attempt/PNPM_STORE_DIR --modules-dir=/attempt/MATERIALIZED_NODE_MODULES_ROOT --registry=https://registry.npmjs.org/
```

```text
CONTAINER_ID = afce2c9095943f89cb411a7d4f361c68f298c21b0584fd6ea114aa513f649002
READ_ONLY_ROOTFS = true
CAP_DROP = ALL
NO_NEW_PRIVILEGES = true
PIDS_LIMIT = 512
MEMORY = 4g
CPUS = 2
NETWORK_MODE = bridge
REGISTRY_ALLOWLIST = registry.npmjs.org:443
PROXY = NONE
CREDENTIALS = NONE
CROSS_ORIGIN_REDIRECT = PROHIBITED
LIFECYCLE_EXECUTION = DENY_BY_DEFAULT
BUILD_EXECUTION = DENY_BY_DEFAULT
DOCKER_START_ATTACH_EXIT = 0
CONTAINER_EXIT = 0
OOM_KILLED = false
MATERIALIZATION_ATTEMPT_COUNT = 1
MATERIALIZATION_ARGV_SHA256 = 7ecfe9eab67e486dcca31b1a5752ec08b057b1567683441e3283dbd2d6e6b125
MATERIALIZATION_CONTROL_MANIFEST_SHA256 = 5f075a19313d1759cbd64050c706741cf04e31031ce0a190f707de201eebf20e
```

## 6. V1 validator control failure and authorized V2 repair

The pre-frozen V1 validator remained immutable and returned exit `1` only because it added a non-authority reporter-shape predicate requiring `status=started` for all 18 identities. It still observed exact `resolved=18` and `fetched=18` sets. Issue #7 comment `5658759990` authorized exactly one new read-only V2 validator over the already-consumed attempt bytes with zero network, Node, pnpm, archive-admission, or Docker-start authority.

V1 frozen stderr:

```text
Traceback (most recent call last):
  File "/Users/abdulazizalsh/Signthos-evidence/004c1fc-clean-materialization-20260914T034932Z/CONTROL/postrun-validator.py", line 19, in <module>
    if sets['resolved']!=expected_keys or sets['fetched']!=expected_keys or sets['started']!=expected_keys: raise RuntimeError(f'reporter identity mismatch { {k:(len(v), sorted(expected_keys-v), sorted(v-expected_keys)) for k,v in sets.items()} }')
RuntimeError: reporter identity mismatch {'resolved': (18, [], []), 'fetched': (18, [], []), 'started': (0, ['@embedpdf/core@2.15.0', '@embedpdf/engines@2.15.0', '@embedpdf/fonts-arabic@1.0.0', '@embedpdf/fonts-hebrew@1.0.0', '@embedpdf/fonts-jp@1.0.0', '@embedpdf/fonts-kr@1.0.0', '@embedpdf/fonts-latin@1.0.0', '@embedpdf/fonts-sc@1.0.0', '@embedpdf/fonts-tc@1.0.0', '@embedpdf/models@2.15.0', '@embedpdf/pdfium@2.15.0', '@embedpdf/plugin-document-manager@2.15.0', '@embedpdf/plugin-interaction-manager@2.15.0', '@embedpdf/plugin-render@2.15.0', '@embedpdf/plugin-search@2.15.0', '@embedpdf/plugin-selection@2.15.0', '@embedpdf/plugin-thumbnail@2.15.0', '@embedpdf/utils@2.15.0'], [])}
```

V2 SHA-256: `846b7a0dbfc5d07f3cfbaa55dd2744d7812e788c094e62a4d55054dffb3e1f8a`. It was frozen read-only before its only execution and retained the same hash afterward.

### Exact V2 control source

```python
#!/usr/bin/env python3
from pathlib import Path
import hashlib,json,tarfile,sys,os,re,urllib.parse
root=Path(sys.argv[1]).resolve()
expected=json.loads((root/'CONTROL/expected-packages.json').read_text())
expected_keys={f"{e['name']}@{e['version']}" for e in expected}
def sha_bytes(b): return hashlib.sha256(b).hexdigest()
def sha(p): return sha_bytes(Path(p).read_bytes())
# container result
ci=json.loads((root/'POSTRUN/container-postrun-inspect.json').read_text())[0]
if ci['State']['Status']!='exited' or ci['State']['ExitCode']!=0 or ci['State']['OOMKilled'] is not False: raise RuntimeError('container result gate')
if (root/'POSTRUN/docker-start-attach.exit').read_text().strip()!='0': raise RuntimeError('docker start attach gate')
# pnpm reporter
report=[]
for ln in (root/'POSTRUN/materialization.stdout.ndjson').read_text(errors='replace').splitlines():
    try: report.append(json.loads(ln))
    except Exception: pass
sets={s:set() for s in ('resolved','fetched','started')}; lifecycle=[]
for x in report:
    name=x.get('name',''); status=x.get('status'); pkg=x.get('packageId')
    if name=='pnpm:progress' and status in sets and pkg: sets[status].add(pkg)
    if 'lifecycle' in name or 'script' in name: lifecycle.append(x)
for gate in ('resolved','fetched'):
    if sets[gate]!=expected_keys: raise RuntimeError(f'{gate} identities mismatch missing={sorted(expected_keys-sets[gate])} extra={sorted(sets[gate]-expected_keys)}')
for x in lifecycle:
    if x.get('name')!='pnpm:ignored-scripts' or x.get('packageNames') not in ([],None): raise RuntimeError(f'lifecycle execution/event mismatch {x}')
# network observations from Node debug
err=(root/'POSTRUN/materialization.stderr.log').read_text(errors='replace')
urls=set(re.findall(r"https://[^'\s)]+",err)); url_hosts=set()
for u in urls:
    try:
        h=urllib.parse.urlparse(u).hostname
        if h: url_hosts.add(h)
    except Exception: pass
find_hosts=set(re.findall(r'connect: find host ([A-Za-z0-9._-]+)',err))
create_hosts=set(re.findall(r'createConnection ([A-Za-z0-9._-]+):\d+',err))
all_hosts=url_hosts|find_hosts|create_hosts
if not all_hosts or all_hosts!={'registry.npmjs.org'}: raise RuntimeError(f'network hosts {sorted(all_hosts)}')
proxy_lines=[ln for ln in err.splitlines() if 'should use proxy for registry.npmjs.org:443:' in ln]
if not proxy_lines or any(not ln.rstrip().endswith('null') for ln in proxy_lines): raise RuntimeError('proxy observation gate')
low=err.lower()
for h in ('authorization:','proxy-authorization:','cookie:'):
    if h in low: raise RuntimeError(f'credential header observation {h}')
# map materialized exact package roots
mods=root/'MATERIALIZED_NODE_MODULES_ROOT/.pnpm'; materialized={}
for pj in mods.glob('*/node_modules/**/package.json'):
    try: pkg=json.loads(pj.read_text())
    except Exception: continue
    k=f"{pkg.get('name')}@{pkg.get('version')}"
    if k in expected_keys:
        prev=materialized.get(k)
        if prev is not None and prev!=pj.parent: raise RuntimeError(f'duplicate materialized root {k}: {prev} {pj.parent}')
        materialized[k]=pj.parent
if set(materialized)!=expected_keys: raise RuntimeError(f'materialized identities mismatch missing={sorted(expected_keys-set(materialized))} extra={sorted(set(materialized)-expected_keys)}')
# byte-exact compare admitted archive package payload vs materialized package root
pkg_rows=[]
for idx,e in enumerate(expected,1):
    k=f"{e['name']}@{e['version']}"; pkgroot=materialized[k]; tarpath=root/'ARCHIVE_EVIDENCE'/f'{idx:02d}-tarball.body'
    with tarfile.open(tarpath,'r:gz') as tf:
        exp_files={}; exp_links={}
        for m in tf.getmembers():
            if not m.name.startswith('package/'): continue
            rel=m.name[8:]
            if not rel: continue
            if m.isfile(): exp_files[rel]=tf.extractfile(m).read()
            elif m.issym(): exp_links[rel]=m.linkname
    act_files={}; act_links={}
    for p in pkgroot.rglob('*'):
        rel=p.relative_to(pkgroot).as_posix()
        if p.is_symlink(): act_links[rel]=os.readlink(p)
        elif p.is_file(): act_files[rel]=p.read_bytes()
    if set(exp_files)!=set(act_files) or set(exp_links)!=set(act_links): raise RuntimeError(f'payload path set mismatch {k}')
    for rel,b in exp_files.items():
        if act_files[rel]!=b: raise RuntimeError(f'payload bytes mismatch {k} {rel}')
    for rel,t in exp_links.items():
        if act_links[rel]!=t: raise RuntimeError(f'symlink target mismatch {k} {rel}')
    pkg_rows.append((k,len(exp_files),len(exp_links),e['sha256'],str(pkgroot.relative_to(root))))
# controls unchanged
controls={'package.json':'71958436cd14112a9c6ebc446736fab5c428c66f174c08761a3f1bf3a0b96183','pnpm-workspace.yaml':'695902f9017995a41632315d6e83926f26b66ac610b4a77591e4fad495c8fd6f','pnpm-lock.yaml':'ee29f5f0f4d1b1b98fbd615de64589a7a5b6a92bee368f4ef8a07255a989479e','provenance/components/pdfium-2.15.0/ADOPTION.json':'e05b64a2dba4a319aef8d2978898b6db966e5bed5b6fef2264af6c1ce731bb36'}
for rel,h in controls.items():
    if sha(root/'snapshot'/rel)!=h: raise RuntimeError('control hash drift '+rel)
if (root/'snapshot/.npmrc').exists(): raise RuntimeError('root npmrc appeared')
# deterministic materialized inventory, including symlink targets
inv=[]
for p in sorted((root/'MATERIALIZED_NODE_MODULES_ROOT').rglob('*')):
    rel=p.relative_to(root).as_posix()
    if p.is_symlink():
        b=os.readlink(p).encode(); inv.append((rel,'symlink',len(b),sha_bytes(b)))
    elif p.is_file():
        b=p.read_bytes(); inv.append((rel,'file',len(b),sha_bytes(b)))
invp=root/'POSTRUN/materialized-inventory-v2.tsv'; invp.write_text('path\ttype\tbytes\tsha256\n'+'\n'.join('\t'.join(map(str,x)) for x in inv)+'\n')
pp=root/'POSTRUN/package-summary-v2.tsv'; pp.write_text('package\tregular_files\tsymlinks\tadmitted_tarball_sha256\tmaterialized_root\n'+'\n'.join('\t'.join(map(str,x)) for x in pkg_rows)+'\n')
summary={'schema':'signthos.004c1fc.postrun-validation.v2','authority':'github:issue-comment:5658759990','parent_authority':'github:issue-comment:5658708308','result':'PASS','container_exit':0,'oom_killed':False,'resolved':len(sets['resolved']),'fetched':len(sets['fetched']),'started_observation':len(sets['started']),'materialized':len(materialized),'payload_byte_exact_matches':18,'lifecycle_execution':0,'network_hosts':sorted(all_hosts),'proxy_observations':len(proxy_lines),'control_hashes':'PASS_4_OF_4','root_npmrc':'ABSENT','materialized_inventory_entries':len(inv),'materialized_inventory_sha256':sha(invp),'package_summary_sha256':sha(pp)}
out=root/'POSTRUN/final-validation-v2.json'; out.write_text(json.dumps(summary,sort_keys=True,separators=(',',':'))+'\n')
print('FINAL_VALIDATION_V2=PASS')
for k in ('resolved','fetched','started_observation','materialized','payload_byte_exact_matches','lifecycle_execution','materialized_inventory_entries'): print(k.upper()+'='+str(summary[k]))
print('NETWORK_HOSTS='+','.join(summary['network_hosts']))
print('MATERIALIZED_INVENTORY_SHA256='+summary['materialized_inventory_sha256'])
print('PACKAGE_SUMMARY_SHA256='+summary['package_summary_sha256'])
print('FINAL_VALIDATION_V2_SHA256='+sha(out))
```

## 7. Postrun V2 result

```json
{"authority":"github:issue-comment:5658759990","container_exit":0,"control_hashes":"PASS_4_OF_4","fetched":18,"lifecycle_execution":0,"materialized":18,"materialized_inventory_entries":934,"materialized_inventory_sha256":"6490e2adc663d3970ddd1cfacd37f139ebf303a9e5a40daf2665b46f9f66c585","network_hosts":["registry.npmjs.org"],"oom_killed":false,"package_summary_sha256":"ee83a2695cf9f217d3bb8ec3e33f6515d5dd27543dc17c857ea7de84f3f60ead","parent_authority":"github:issue-comment:5658708308","payload_byte_exact_matches":18,"proxy_observations":17,"resolved":18,"result":"PASS","root_npmrc":"ABSENT","schema":"signthos.004c1fc.postrun-validation.v2","started_observation":0}
```

The V2 result establishes exact `resolved=18`, `fetched=18`, `materialized=18`, byte-exact archive-to-materialized payload equality `18/18`, no extra package identity, zero lifecycle/build execution, and `registry.npmjs.org` as the only observed project-dependency network host. `started=0` is retained only as a non-gating reporter observation.

## 8. Repository nonmutation proof

The exact postrun Git-status bytes from the same detached worktree are:

```text
# branch.oid adf6860961c91e8110d045b7dad6db73b230cde0
# branch.head (detached)
```

```text
PRE_POST_GIT_STATUS_BYTE_EQUAL = PASS
POST_WORKTREE_CHANGED_OR_UNTRACKED = 0
WORKTREE_CONTROL_HASHES_POST = PASS_4_OF_4
WORKTREE_ROOT_NPMRC_POST = ABSENT
REMOTE_MAIN_POST = adf6860961c91e8110d045b7dad6db73b230cde0
REMOTE_MAIN_TREE_POST = 3344138e2b1af05e1ee0e0a3d98edecb170a1e05
OPEN_PULL_REQUESTS_POST = 0
```

## 9. Evidence finalization and lock release

```text
MATERIALIZED_INVENTORY_ENTRIES = 934
MATERIALIZED_INVENTORY_SHA256 = 6490e2adc663d3970ddd1cfacd37f139ebf303a9e5a40daf2665b46f9f66c585
PACKAGE_SUMMARY_SHA256 = ee83a2695cf9f217d3bb8ec3e33f6515d5dd27543dc17c857ea7de84f3f60ead
FINAL_VALIDATION_V2_SHA256 = 2ddef5a4198cd658021d8e3c9a2a90fe85b2f43afe259c0584b5da8cbe2b6a0e
PRIMARY_EVIDENCE_MANIFEST_ROWS = 2290
PRIMARY_EVIDENCE_MANIFEST_SHA256 = abe74dfab2d99d5e9f100277d2b805c534cfd1db675e4405b7d5f7d99b46b2df
FINALIZATION_SHA256 = 4e68e550b87348740e53b0829db89537d07e4ee8245f639c7e4d4742a8cc6d0d
LOCK_HELD_AT_FINALIZATION = true
FAILED_RELEASE_RECORD_SHA256 = ffba88f6fdcb1fd22c9c5dd9b5aff77c6dd2c6792929de8eccdb4494a5986cb3
FINAL_LOCK_RELEASE = PASS
LOCK_RELEASE_SHA256 = b590f9bf3db09b92e462326627380d9600ba6933144782926596d44608214974
```

The first mechanical `rmdir` release attempt failed because the lock owner record was still present. That failed release attempt is preserved. The owner record was then removed as the release operation and the same lock was released successfully after finalization. No dependency, network, Docker-start, Node, or pnpm execution occurred during that release correction.

Exact finalization object:

```json
{"archive_admission":"PASS_18_OF_18","archive_admission_script_mode":"0o444","archive_admission_script_sha256":"dadbbdb55e7d4e31106600eb811d61fb721bf494f61006fe6083650bc3c20eca","archive_admission_summary_sha256":"01088326d31aa638ba3e69e1f1a62daaac34b1eba8c57b799653dc4bc6c75244","authority":"github:issue-comment:5658708308","candidate_creation_authority":"PRESENT_IF_REPOSITORY_BASE_REMAINS_EXACT","container_exit":0,"control_hashes":"PASS_4_OF_4","docker_start_attach_exit":0,"evidence_root":"004c1fc-clean-materialization-20260914T034932Z","fetched":18,"finalization_utc":"2026-09-14T03:58:39.910021Z","lifecycle_execution":0,"lock_held_at_finalization":true,"materialization_attempt_count":1,"materialization_retry_authority":"ABSENT","materialized":18,"materialized_inventory_sha256":"6490e2adc663d3970ddd1cfacd37f139ebf303a9e5a40daf2665b46f9f66c585","network_hosts":["registry.npmjs.org"],"oom_killed":false,"open_pull_requests_post":[],"package_summary_sha256":"ee83a2695cf9f217d3bb8ec3e33f6515d5dd27543dc17c857ea7de84f3f60ead","payload_byte_exact_matches":18,"postrun_validator_v1_exit":1,"postrun_validator_v1_preserved":true,"postrun_validator_v2_exit":0,"postrun_validator_v2_result":"PASS","postrun_validator_v2_sha256":"846b7a0dbfc5d07f3cfbaa55dd2744d7812e788c094e62a4d55054dffb3e1f8a","pre_post_git_status_byte_equal":true,"primary_evidence_manifest_sha256":"abe74dfab2d99d5e9f100277d2b805c534cfd1db675e4405b7d5f7d99b46b2df","project_complete":false,"qualification_result":"PASS_FOR_REPOSITORY_CANDIDATE","remote_main_post":"adf6860961c91e8110d045b7dad6db73b230cde0","remote_tree_post":"3344138e2b1af05e1ee0e0a3d98edecb170a1e05","resolved":18,"schema":"signthos.004c1fc.finalization.v1","started_observation":0,"unit":"004C1FC_CLEAN_DETERMINISTIC_DEPENDENCY_MATERIALIZATION_REPLACEMENT","validator_repair_authority":"github:issue-comment:5658759990","worktree_clean_post":true}
```

Exact successful lock-release record:

```text
LOCK_RELEASE_BEGIN_UTC=2026-09-14T03:59:25.059633000Z
LOCK_RELEASE_END_UTC=2026-09-14T03:59:25.109978000Z
LOCK_PATH=/tmp/signthos-004c1fc-20260914T034932Z.lock
OWNER_RECORD_SHA256=27a383187627c3491f1bf3e6afe89513afe1381dc74251a70efad3a0f7589659
FINALIZATION_SHA256=4e68e550b87348740e53b0829db89537d07e4ee8245f639c7e4d4742a8cc6d0d
PRIMARY_EVIDENCE_MANIFEST_SHA256=abe74dfab2d99d5e9f100277d2b805c534cfd1db675e4405b7d5f7d99b46b2df
RESULT=PASS
```

## 10. Evidence accessibility and independent verification contract

The immutable review evidence pack is published as a public GitHub Gist at an exact single revision. Reviewers must bind verification to that revision rather than to a moving Gist tip.

```text
REVIEW_PACK_GIST_ID = c2ab7782e739ab95648eb8539db4d673
REVIEW_PACK_GIST_REVISION = a7c3549202c18ed077c8fc9f303250670f3907a0
REVIEW_PACK_GIST_HISTORY_COUNT_AT_PUBLICATION = 1
REVIEW_PACK_GIST_URL = https://gist.github.com/TheHalfMoon/c2ab7782e739ab95648eb8539db4d673/a7c3549202c18ed077c8fc9f303250670f3907a0
REVIEW_PACK_GIT_URL = https://gist.github.com/c2ab7782e739ab95648eb8539db4d673.git
REVIEW_PACK_FILE_COUNT = 60
REVIEW_PACK_MANIFEST_SHA256 = 5b2800c8015b015022caa9dcab367ddaf7539a06d599c28764005e80dcb84d0b
REVIEW_PACK_VERIFIER_SHA256 = eaecc34bc4e860c61dae37e88c76316c748e5c8bff728d35b101e5769d41ced5
PRIMARY_EVIDENCE_MANIFEST_OBJECTS = 2290
PRIMARY_EVIDENCE_MANIFEST_SHA256 = abe74dfab2d99d5e9f100277d2b805c534cfd1db675e4405b7d5f7d99b46b2df
PUBLISHED_ARCHIVE_PACKAGE_RECORDS = 18
OMITTED_LARGE_OBJECT_IDENTITIES = 952
RECONSTRUCTED_ZERO_BYTE_OBJECTS = 3
ZERO_BYTE_EVIDENCE_SHA256 = 40fa4cf211a12cb78feb57abbd53c57e9417fd1bf65b6fc1dd36c057d72a75e7
```

The review pack publishes the primary evidence manifest, execution controls, archive metadata/headers/transport observations, materialization stdout/stderr, container inspect records, V1 failure evidence, V2 source and result, deterministic package/materialized inventories, pre/post Git status, lock/finalization/release records, and verification tooling. Large registry tarball bodies and the external materialized dependency tree are not republished; their 952 exact path/byte/SHA-256 identities are frozen in `omitted-large-object-identities.tsv`. The 18 public registry tarballs can optionally be re-fetched by the verifier and checked against the published byte length, SHA-256, SHA-1, and SHA-512 SRI values without Node, pnpm, or product-runtime execution.

GitHub Gist does not accept empty files. Three frozen zero-byte evidence objects are therefore represented by `zero-byte-evidence.tsv`; the verifier reconstructs `b''` and requires both byte length `0` and SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` to match the primary manifest.

The authority-required pre-network zero-open-PR observation was not persisted as a standalone object in the original evidence root. Issue #7 comment `5658940799` authorizes only a historical read-only reconstruction. That reconstruction uses the frozen archive-admission cutoff and GitHub server-side PR timestamps across the retrieved pull-request history:

```text
HISTORICAL_RECONSTRUCTION_AUTHORITY = github:issue-comment:5658940799
ARCHIVE_ADMISSION_CUTOFF_UTC = 2026-09-14T03:52:24.298289000Z
GITHUB_PR_HISTORY_COUNT = 209
GITHUB_PR_HISTORY_FIRST_NUMBER = 1
GITHUB_PR_HISTORY_LAST_NUMBER = 241
GITHUB_PR_HISTORY_SHA256 = e3931ae0099b0369e4f0cf89933760009ed8495dcf253839eade83e9592fc6f2
HISTORICAL_RECONSTRUCTOR_SHA256 = ae5ada63702fdf8f25d312cc2b11b2f1f66e34983057959d63f9726d3a0608c0
HISTORICAL_ZERO_OPEN_PR_PROOF_SHA256 = e9bf2cea057b0d3bbcb76688a39cb630f6e64ce35b3920255e3bd2ce020ad136
OPEN_PULL_REQUEST_COUNT_AT_CUTOFF = 0
HISTORICAL_ZERO_OPEN_PR_RESULT = PASS_ZERO_OPEN_PRS
```

The historical reconstruction is not represented as contemporaneously frozen execution evidence. It is explicitly a later authority-approved reconstruction from immutable GitHub server timestamps and the previously frozen admission cutoff.

Independent verification procedure:

```bash
git clone https://gist.github.com/c2ab7782e739ab95648eb8539db4d673.git signthos-004c1fc-review-pack
cd signthos-004c1fc-review-pack
git checkout --detach a7c3549202c18ed077c8fc9f303250670f3907a0
python3 verify_review_pack.py \
  --pack . \
  --expected-pack-manifest-sha 5b2800c8015b015022caa9dcab367ddaf7539a06d599c28764005e80dcb84d0b \
  --expected-gist-revision a7c3549202c18ed077c8fc9f303250670f3907a0
```

The expected offline result is:

```text
REVIEW_PACK_VERIFICATION=PASS
PUBLISHED_FILES=59
PRIMARY_MANIFEST_OBJECTS=2290
ARCHIVE_PACKAGES=18
HISTORICAL_ZERO_OPEN_PR_PROOF=PASS_ZERO_OPEN_PRS
OMITTED_LARGE_OBJECT_IDENTITIES=952
RECONSTRUCTED_ZERO_BYTE_OBJECTS=3
REGISTRY_REFETCH=SKIPPED
```

A reviewer may additionally pass `--verify-registry` to re-fetch and digest-check all 18 public tarballs. That optional reviewer action is not a Signthos materialization rerun and is not required for the offline pack-integrity proof.

## 11. Candidate result and merge gate

```text
004C1FC_EXECUTION = PASS
ARCHIVE_ADMISSION = PASS_18_OF_18
MATERIALIZATION = PASS_EXIT_0
POSTRUN_VALIDATION_V2 = PASS
REPOSITORY_NONMUTATION = PASS
EVIDENCE_FINALIZATION = PASS
004C1FC = QUALIFICATION_CANDIDATE_ONLY
INDEPENDENT_EXACT_HEAD_REVIEW = REQUIRED
MERGE_AUTHORITY = ABSENT_UNTIL_REVIEW_PASS
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

This candidate may merge only after fresh independent substantive review of the exact final head reports no material findings, every material finding is repaired forward-only with fresh exact-head review, unresolved material review threads are zero, immediate premerge race proof succeeds, and a guarded normal merge uses the exact reviewed head SHA. Mechanical post-merge verification and a fresh Issue #7 successor reconciliation are mandatory before any runtime successor is inferred.

## 12. Post-merge extra-identity evidence repair

This section is a forward-only post-merge repair authorized by Issue #7 comment `5659570287`. It preserves the original execution and V1→V2 validator lineage exactly as it occurred; it does not rewrite or rerun the consumed materialization attempt.

A late CodeRabbit review thread on merged PR #240 identified a valid proof defect in the embedded V2 validator. The V2 collector at Lines 315–325 inserted a discovered package root into `materialized` only when its identity was already present in `expected_keys`. Consequently, the subsequent equality check proved that every expected package identity was present, but it could not independently prove that no unadmitted package identity also existed.

The affected historical claim is therefore narrowed as follows:

```text
POSTRUN_VALIDATION_V2_EXPECTED_PACKAGE_PRESENCE = PASS
POSTRUN_VALIDATION_V2_ADMITTED_PACKAGE_PAYLOAD_EQUALITY = PASS_18_OF_18
POSTRUN_VALIDATION_V2_NO_EXTRA_PACKAGE_IDENTITY_PROOF = SUPERSEDED
NO_EXTRA_PACKAGE_IDENTITY_PROOF = IMMUTABLE_INVENTORY_RECONSTRUCTION_V1
```

The underlying materialization bytes are not re-executed. Absence of extra package identities is re-established read-only from the already-frozen complete `materialized-inventory-v2.tsv`. That inventory was produced by traversing all files and symlinks under `MATERIALIZED_NODE_MODULES_ROOT` and is independently bound by both immutable manifests:

```text
REPAIR_AUTHORITY = github:issue-comment:5659570287
REVIEW_PACK_GIST_REVISION = a7c3549202c18ed077c8fc9f303250670f3907a0
REVIEW_PACK_MANIFEST_SHA256 = 5b2800c8015b015022caa9dcab367ddaf7539a06d599c28764005e80dcb84d0b
PRIMARY_EVIDENCE_MANIFEST_SHA256 = abe74dfab2d99d5e9f100277d2b805c534cfd1db675e4405b7d5f7d99b46b2df
MATERIALIZED_INVENTORY_BYTES = 210555
MATERIALIZED_INVENTORY_ROWS = 934
MATERIALIZED_INVENTORY_SHA256 = 6490e2adc663d3970ddd1cfacd37f139ebf303a9e5a40daf2665b46f9f66c585
RECONSTRUCTION_SCRIPT_SHA256 = b875c626ad53885c711ec919bf2a2068d310a3f6d5fc9bdc56a7e86a766e6bde
RECONSTRUCTION_RESULT_SHA256 = bf1a126b9fd7671828017609a84db425b1811e046debbf7f319eeec99917dd97
RECONSTRUCTION_STDERR_SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
RECONSTRUCTION_EXIT = 0
```

The reconstruction treats `.pnpm/node_modules` as pnpm linkage infrastructure rather than a package-store identity. In the frozen inventory that component contains ten symlink rows and no `package.json`. Every other top-level `.pnpm/<store>/...` component must parse deterministically to a package identity. The reconstruction also enumerates every frozen `.pnpm/.../package.json` path and requires its path-derived package name to agree with the store-derived identity. Any extra store component, extra package manifest, malformed identity, missing admitted identity, or unexpected identity fails the repair.

Exact read-only reconstruction source:

```python
#!/usr/bin/env python3
import argparse, hashlib, json, re, subprocess
from pathlib import Path

EXPECTED_REVISION = 'a7c3549202c18ed077c8fc9f303250670f3907a0'
EXPECTED_PACK_MANIFEST_SHA256 = '5b2800c8015b015022caa9dcab367ddaf7539a06d599c28764005e80dcb84d0b'
EXPECTED_PRIMARY_MANIFEST_SHA256 = 'abe74dfab2d99d5e9f100277d2b805c534cfd1db675e4405b7d5f7d99b46b2df'
EXPECTED_INVENTORY_SHA256 = '6490e2adc663d3970ddd1cfacd37f139ebf303a9e5a40daf2665b46f9f66c585'

def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()

def store_to_key(store: str) -> str:
    base = store.split('_', 1)[0]
    if base.startswith('@'):
        m = re.fullmatch(r'@([^+@]+)\+(.+)@([^@]+)', base)
        if not m:
            raise ValueError(f'malformed scoped pnpm store component: {store}')
        scope, name, version = m.groups()
        return f'@{scope}/{name}@{version}'
    m = re.fullmatch(r'(.+)@([^@]+)', base)
    if not m:
        raise ValueError(f'malformed pnpm store component: {store}')
    name, version = m.groups()
    return f'{name}@{version}'

def key_name(key: str) -> str:
    if key.startswith('@'):
        return key.rsplit('@', 1)[0]
    return key.rsplit('@', 1)[0]

def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('--pack', required=True)
    ns = ap.parse_args()
    root = Path(ns.pack).resolve()
    revision = subprocess.check_output(['git', '-C', str(root), 'rev-parse', 'HEAD'], text=True).strip()
    if revision != EXPECTED_REVISION:
        raise RuntimeError(f'pack revision mismatch: {revision}')
    pack_manifest = root / 'review-pack-file-manifest.tsv'
    primary_manifest = root / 'primary-evidence-manifest.tsv'
    inventory = root / 'materialized-inventory-v2.tsv'
    archive = root / 'archive-admission-summary.json'
    if sha(pack_manifest) != EXPECTED_PACK_MANIFEST_SHA256:
        raise RuntimeError('review pack manifest hash mismatch')
    if sha(primary_manifest) != EXPECTED_PRIMARY_MANIFEST_SHA256:
        raise RuntimeError('primary evidence manifest hash mismatch')
    if sha(inventory) != EXPECTED_INVENTORY_SHA256:
        raise RuntimeError('materialized inventory hash mismatch')
    inv_size = inventory.stat().st_size
    pack_line = f'materialized-inventory-v2.tsv\t{inv_size}\t{EXPECTED_INVENTORY_SHA256}'
    if pack_line not in pack_manifest.read_text().splitlines():
        raise RuntimeError('inventory not bound by review-pack manifest')
    primary_line = f'POSTRUN/materialized-inventory-v2.tsv\tfile\t{inv_size}\t{EXPECTED_INVENTORY_SHA256}'
    if primary_line not in primary_manifest.read_text().splitlines():
        raise RuntimeError('inventory not bound by primary evidence manifest')
    lines = inventory.read_text().splitlines()
    if not lines or lines[0] != 'path\ttype\tbytes\tsha256':
        raise RuntimeError('inventory header mismatch')
    rows = []
    for number, line in enumerate(lines[1:], 2):
        fields = line.split('\t')
        if len(fields) != 4:
            raise RuntimeError(f'malformed inventory row {number}')
        path, kind, size, digest = fields
        if kind not in {'file', 'symlink'} or not size.isdigit() or not re.fullmatch(r'[0-9a-f]{64}', digest):
            raise RuntimeError(f'invalid inventory row {number}')
        rows.append((path, kind, int(size), digest))
    prefix = 'MATERIALIZED_NODE_MODULES_ROOT/.pnpm/'
    components = {}
    for path, kind, size, digest in rows:
        if not path.startswith(prefix):
            continue
        rest = path[len(prefix):]
        component = rest.split('/', 1)[0]
        components.setdefault(component, []).append((path, kind, size, digest))
    if 'node_modules' not in components:
        raise RuntimeError('pnpm infrastructure node_modules component missing')
    infra_rows = components['node_modules']
    if any(kind != 'symlink' for _, kind, _, _ in infra_rows):
        raise RuntimeError('pnpm infrastructure contains non-symlink inventory rows')
    if any(path.endswith('/package.json') for path, *_ in infra_rows):
        raise RuntimeError('pnpm infrastructure unexpectedly contains package.json')
    store_components = sorted(c for c in components if c != 'node_modules')
    derived = {}
    for component in store_components:
        key = store_to_key(component)
        if key in derived:
            raise RuntimeError(f'duplicate derived identity: {key}')
        derived[key] = component
    admitted = json.loads(archive.read_text())
    expected = sorted(row['key'] for row in admitted['results'])
    if len(expected) != len(set(expected)):
        raise RuntimeError('duplicate expected archive identity')
    package_json_rows = []
    package_json_identity_errors = []
    pattern = re.compile(r'^MATERIALIZED_NODE_MODULES_ROOT/\.pnpm/([^/]+)/node_modules/(?:@([^/]+)/([^/]+)|([^/]+))/package\.json$')
    for path, kind, size, digest in rows:
        if not (path.startswith(prefix) and path.endswith('/package.json')):
            continue
        m = pattern.fullmatch(path)
        if not m:
            package_json_identity_errors.append({'path': path, 'reason': 'unparseable-package-json-path'})
            continue
        store, scope, scoped_name, plain_name = m.groups()
        if store == 'node_modules':
            package_json_identity_errors.append({'path': path, 'reason': 'package-json-in-infrastructure'})
            continue
        derived_key = store_to_key(store)
        path_name = f'@{scope}/{scoped_name}' if scope is not None else plain_name
        if key_name(derived_key) != path_name:
            package_json_identity_errors.append({'path': path, 'reason': f'path-name-mismatch:{derived_key}'})
        package_json_rows.append({'path': path, 'derived_identity': derived_key})
    derived_set = set(derived)
    expected_set = set(expected)
    missing = sorted(expected_set - derived_set)
    extra = sorted(derived_set - expected_set)
    package_json_identities = sorted(row['derived_identity'] for row in package_json_rows)
    result = 'PASS_EXACT_IDENTITY_SET'
    if missing or extra or package_json_identity_errors or set(package_json_identities) != expected_set or len(package_json_rows) != len(expected):
        result = 'FAIL'
    output = {
        'schema': 'signthos.004c1fc.postmerge-extra-identity-reconstruction.v1',
        'authority': 'github:issue-comment:5659570287',
        'review_pack_revision': revision,
        'review_pack_manifest_sha256': sha(pack_manifest),
        'primary_evidence_manifest_sha256': sha(primary_manifest),
        'materialized_inventory_sha256': sha(inventory),
        'materialized_inventory_bytes': inv_size,
        'materialized_inventory_rows': len(rows),
        'pnpm_top_components': sorted(components),
        'pnpm_infrastructure_components': ['node_modules'],
        'pnpm_infrastructure_rows': len(infra_rows),
        'package_store_directory_count': len(store_components),
        'derived_package_identity_count': len(derived_set),
        'expected_package_identity_count': len(expected_set),
        'package_json_row_count': len(package_json_rows),
        'package_json_identity_errors': package_json_identity_errors,
        'missing_package_identities': missing,
        'extra_package_identities': extra,
        'derived_package_identities': sorted(derived_set),
        'result': result,
    }
    print(json.dumps(output, sort_keys=True, separators=(',', ':')))
    if result != 'PASS_EXACT_IDENTITY_SET':
        raise SystemExit(1)
if __name__ == '__main__':
    main()
```

Exact reconstruction result:

```json
{"authority":"github:issue-comment:5659570287","derived_package_identities":["@embedpdf/core@2.15.0","@embedpdf/engines@2.15.0","@embedpdf/fonts-arabic@1.0.0","@embedpdf/fonts-hebrew@1.0.0","@embedpdf/fonts-jp@1.0.0","@embedpdf/fonts-kr@1.0.0","@embedpdf/fonts-latin@1.0.0","@embedpdf/fonts-sc@1.0.0","@embedpdf/fonts-tc@1.0.0","@embedpdf/models@2.15.0","@embedpdf/pdfium@2.15.0","@embedpdf/plugin-document-manager@2.15.0","@embedpdf/plugin-interaction-manager@2.15.0","@embedpdf/plugin-render@2.15.0","@embedpdf/plugin-search@2.15.0","@embedpdf/plugin-selection@2.15.0","@embedpdf/plugin-thumbnail@2.15.0","@embedpdf/utils@2.15.0"],"derived_package_identity_count":18,"expected_package_identity_count":18,"extra_package_identities":[],"materialized_inventory_bytes":210555,"materialized_inventory_rows":934,"materialized_inventory_sha256":"6490e2adc663d3970ddd1cfacd37f139ebf303a9e5a40daf2665b46f9f66c585","missing_package_identities":[],"package_json_identity_errors":[],"package_json_row_count":18,"package_store_directory_count":18,"pnpm_infrastructure_components":["node_modules"],"pnpm_infrastructure_rows":10,"pnpm_top_components":["@embedpdf+core@2.15.0","@embedpdf+engines@2.15.0","@embedpdf+fonts-arabic@1.0.0","@embedpdf+fonts-hebrew@1.0.0","@embedpdf+fonts-jp@1.0.0","@embedpdf+fonts-kr@1.0.0","@embedpdf+fonts-latin@1.0.0","@embedpdf+fonts-sc@1.0.0","@embedpdf+fonts-tc@1.0.0","@embedpdf+models@2.15.0","@embedpdf+pdfium@2.15.0","@embedpdf+plugin-document-manager@2.15.0_@embedpdf+core@2.15.0","@embedpdf+plugin-interaction-manager@2.15.0_@embedpdf+core@2.15.0","@embedpdf+plugin-render@2.15.0_@embedpdf+core@2.15.0","@embedpdf+plugin-search@2.15.0_@embedpdf+core@2.15.0","@embedpdf+plugin-selection@2.15.0_@embedpdf+core@2.15.0_@embedpdf+plugin-interaction-ma_d894779c888c0def23c952a35b06eeb5","@embedpdf+plugin-thumbnail@2.15.0_@embedpdf+core@2.15.0_@embedpdf+plugin-render@2.15.0_@embedpdf+core@2.15.0_","@embedpdf+utils@2.15.0","node_modules"],"primary_evidence_manifest_sha256":"abe74dfab2d99d5e9f100277d2b805c534cfd1db675e4405b7d5f7d99b46b2df","result":"PASS_EXACT_IDENTITY_SET","review_pack_manifest_sha256":"5b2800c8015b015022caa9dcab367ddaf7539a06d599c28764005e80dcb84d0b","review_pack_revision":"a7c3549202c18ed077c8fc9f303250670f3907a0","schema":"signthos.004c1fc.postmerge-extra-identity-reconstruction.v1"}
```

The result establishes:

```text
PACKAGE_STORE_DIRECTORY_COUNT = 18
PACKAGE_JSON_ROW_COUNT = 18
DERIVED_PACKAGE_IDENTITY_COUNT = 18
EXPECTED_PACKAGE_IDENTITY_COUNT = 18
PACKAGE_JSON_IDENTITY_ERRORS = []
MISSING_PACKAGE_IDENTITIES = []
EXTRA_PACKAGE_IDENTITIES = []
PNPM_INFRASTRUCTURE_COMPONENTS = ["node_modules"]
READ_ONLY_RECONSTRUCTION_RESULT = PASS_EXACT_IDENTITY_SET
```

This repair does not broaden the original qualification. It does not authorize or perform another archive admission, materialization, Node invocation, pnpm invocation, Docker start, registry request, source import, classifier execution, PDF provider execution, general 004C runtime, 004C2, 004D, Specification 005, release, or deployment.

The post-merge repair is itself a repository qualification candidate. `004C1FC` may return to canonical closed status only after this exact repair head receives fresh independent substantive review with no material findings, the repair candidate has zero unresolved material review threads, immediate race proof passes, the repair merges normally with exact expected-head protection, the merge is mechanically verified, and Issue #7 performs fresh successor reconciliation. The historical PR #240 finding remains preserved and may be resolved only after this forward-only repair is canonically merged.
