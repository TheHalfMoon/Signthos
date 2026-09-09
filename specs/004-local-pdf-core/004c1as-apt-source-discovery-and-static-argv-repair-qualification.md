# 004C1AS — APT Source Discovery and Static argv Repair Qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_SOURCE_DISCOVERY_REPAIR_COMPLETE / PASS_STATIC_ONLY`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `865878dcc10903d681a59cc8d7ee5ffb6858a16a`
Canonical base tree: `721560c3fdfddc6bd0198dea9d409e4cfa41f0a1`
Authority source: `github:issue-comment:5609822639`

## 1. Purpose and authority boundary

Canonical 004C1AR proved that the frozen 004C1AQ argv cannot discover pre-materialized snapshot indexes because both normal source-list inputs are disabled and no `APT::Sources::With` registration exists. 004C1AS is authorized only to select a source-discovery repair, define the exact Signthos-authored source descriptor, derive the repaired static Stage A/B/C argv, and bind a byte-complete repair contract.

```text
NEXT_AUTHORIZED_REPOSITORY_UNIT = 004C1AS_APT_SOURCE_DISCOVERY_AND_STATIC_ARGV_REPAIR_QUALIFICATION
004C1AS_AUTHORITY = STATIC_SOURCE_DESCRIPTOR_AND_ARGV_REPAIR_QUALIFICATION_ONLY
004C1AS_CANONICAL_BASE = 865878dcc10903d681a59cc8d7ee5ffb6858a16a
004C1AS_CANONICAL_BASE_TREE = 721560c3fdfddc6bd0198dea9d409e4cfa41f0a1
004C1AS_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1as-apt-source-discovery-and-static-argv-repair-qualification.md
004C1AS_MAX_CHANGED_REPOSITORY_FILES = 1
APT_GET_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_CACHE_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_CONFIG_ADDITIONAL_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
DPKG_OR_DPKG_QUERY_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_SOURCE_DESCRIPTOR_MATERIALIZATION = NOT_AUTHORIZED / NOT_PERFORMED
APT_SNAPSHOT_LIST_MATERIALIZATION = NOT_AUTHORIZED / NOT_PERFORMED
WRITABLE_APT_STATE_PREPARATION = NOT_AUTHORIZED / NOT_PERFORMED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = NOT_AUTHORIZED / NOT_PERFORMED
IMAGE_OR_CONTAINER_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
NODE_TOOLCHAIN_PDFIUM_PROVIDER_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No APT command, package command, source/list materialization, container execution, image execution, or runtime/provider action was executed by this grain.

## 2. Canonical predecessor bindings

```text
CANONICAL_MAIN_AT_AS_START = 865878dcc10903d681a59cc8d7ee5ffb6858a16a
CANONICAL_MAIN_TREE_AT_AS_START = 721560c3fdfddc6bd0198dea9d409e4cfa41f0a1
OPEN_PULL_REQUESTS_AT_AS_PREFLIGHT = 0
004C1AQ_STATIC_CONTRACT_SHA256 = 8be0106e5ab1ff0770e60c41d26a7ecf41c8abd9f1829e8f857a9f5372a3c2e9
004C1AQ_MEASURED_APT_CONFIG_DUMP_BYTES = 10891
004C1AQ_MEASURED_APT_CONFIG_DUMP_SHA256 = ecc166b8ba13022afe1923d3e2012d5eea86424d568142f8022535932e9f148f
004C1AR_DOCUMENT_SHA256 = af50db2cfecd791bf11c6820eaf0f9939332dfbce3e1a7029a742349c477abfe
UBUNTU_SNAPSHOT_ID = 20260909T180000Z
UBUNTU_SNAPSHOT_BASE = https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/
UBUNTU_SUITES = [jammy, jammy-updates, jammy-security]
UBUNTU_COMPONENTS = [main, restricted, universe, multiverse]
TARGET_INDEX_ARCHITECTURE = amd64
ADMITTED_PACKAGE_RECORD_ARCHITECTURES_FROM_004C1AG = [amd64, all]
SIGNED_INRELEASE_COUNT = 3
SIGNED_PACKAGES_XZ_COUNT = 12
```

004C1AS does not reopen snapshot selection, package metadata closure, stage root selection, recommends policy, or exact `apt-get` identity.

## 3. Exact APT 2.4.13 source identity

The static repair is derived from the same immutable first-party Ubuntu APT source bound by 004C1AR:

```text
APT_SOURCE_REPOSITORY = https://git.launchpad.net/ubuntu/+source/apt
APT_SOURCE_TAG = import/2.4.13
APT_SOURCE_TAG_OBJECT = 27207612b00b302b7b18cfeec355bad1a5de6bca
APT_SOURCE_COMMIT = 581ec5c0aa2c6665d72465040f1465eb93503200
APT_SOURCE_TREE = e9afcae41f88040e93eb7a10a89e72c00b59e245
APT_VERSION = apt 2.4.13 (amd64)
```

Relevant already-bound source files:

| Path | Git blob | SHA-256 |
| --- | --- | --- |
| `apt-pkg/sourcelist.cc` | `055cf4142db457a94564df348ee14079c43b6953` | `d4a63c87320cb261f8ebaa77f10e0f12525914e129787295ed3ba66ccc103ef2` |
| `apt-pkg/deb/debmetaindex.cc` | `c78da494668225bc999747233104ae38b80b7751` | `c39c41d1de05cf4b102592412294ff4ea90af1ed5a2b88af6dbe0501cfdf98c3` |
| `apt-pkg/cachefile.cc` | `4c3cc95867a40f82199159df316ccd806a2f7a57` | `59251a75a691767446824ce5d412e32a0667878129a24dec0e9a1538605d8ca9` |
| `apt-pkg/pkgcachegen.cc` | `9e47ef369504a2b296e2cb77ceab6c70af8982af` | `3072484125eaeb9e69429bc966d0d502e99e257b9b9a77b54078c698a4615ef7` |
| `apt-pkg/deb/deblistparser.cc` | `2f0ebaa7be64691369f40a047479c9dfc1701f04` | `d41a0aac102740a9dfc0a287a81dfb7301337a4fd3781b149838ebcc0991153d` |
| `apt-pkg/indexfile.cc` | `1176903f4a7d54d44279ac6a5b924b0367c5e1e1` | `e5511c2efa0ccf4ff5dd44c254b7fda2052d5cffe3ca25da9b413af7a1c4fd4a` |

No APT source byte is imported into Signthos.

## 4. Discovery-mechanism comparison

Exact APT 2.4.13 provides two relevant ways for the AQ/AR scenario to make package indexes visible to cache generation.

### 4.1 `APT::Sources::With` volatile package-index registration — rejected

`pkgSourceList::ReadMainList()` iterates `APT::Sources::With` and sends each path to `AddVolatileFile()`. A matching `Packages` file becomes a `debPackagesIndex` backed by an `IndexTarget` whose repository URI is a local `file:` directory and whose component is `volatile-packages-file`.

That mechanism can make package records visible, but it does not create the canonical snapshot `debReleaseIndex` relationship for each Jammy suite. Its archive URI is the local file directory rather than the canonical snapshot repository URI. It therefore loses the repository/release association required by 004C1AS authority and is not selected.

```text
APT_SOURCES_WITH_VOLATILE_REGISTRATION = SUPPORTED_BY_APT_2_4_13
APT_SOURCES_WITH_PRESERVES_CANONICAL_SNAPSHOT_RELEASE_ASSOCIATION = FALSE
APT_SOURCES_WITH_SELECTED = FALSE
```

### 4.2 Normal main-source descriptor — selected

`pkgSourceList::ReadMainList()` reads `Dir::Etc::sourcelist` when it names a real file. A filename ending in `.sources` is parsed as Deb822. `ParseStanza()` expands the declared URIs, suites, and components and calls the normal Debian source type, which creates or reuses a `debReleaseIndex` for each URI/suite and adds the component entry to that release.

`debReleaseIndex::ArchiveURI()` returns the canonical repository URI plus the encoded package pool path. Package indexes are therefore associated with their snapshot release rather than a local volatile source.

```text
SELECTED_SOURCE_DISCOVERY_MECHANISM = deb822-main-source-descriptor
SELECTED_SOURCE_DISCOVERY_PATH = /tmp/signthos-apt/etc/snapshot.sources
SELECTED_SOURCE_DISCOVERY_PRESERVES_RELEASE_ASSOCIATION = TRUE
SELECTED_SOURCE_DISCOVERY_PRESERVES_SNAPSHOT_ARCHIVE_URI = TRUE
```

## 5. Exact Signthos-authored Deb822 source descriptor

The future descriptor is exactly the following UTF-8 bytes, including exactly one LF after the final line:

```text
Types: deb
URIs: https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/
Suites: jammy jammy-updates jammy-security
Components: main restricted universe multiverse
Architectures: amd64
Architectures-Remove: all
Languages: none
Targets: Packages
```

```text
SOURCE_DESCRIPTOR_PATH = /tmp/signthos-apt/etc/snapshot.sources
SOURCE_DESCRIPTOR_FORMAT = deb822
SOURCE_DESCRIPTOR_ENCODING = UTF-8
SOURCE_DESCRIPTOR_LINE_ENDING = LF
SOURCE_DESCRIPTOR_TRAILING_NEWLINE = TRUE
SOURCE_DESCRIPTOR_BYTES = 242
SOURCE_DESCRIPTOR_SHA256 = 3fcdd0b5ef962070795738f92f36ea70f8c05a3171ae72e832f46746f7bab199
```

The descriptor contains no live archive mirror, no unconstrained snapshot endpoint, no source package type, no trust override, no valid-until bypass, no `Signed-By` substitution, and no source-parts directory.

### 5.1 Why `Architectures-Remove: all` is required

APT 2.4.13 maps Deb822 `Architectures-Remove` to the internal `arch-` option. `parsePlusMinusArchOptions()` normally appends `implicit:all` when `all` is absent. However, when the explicit removal set contains `all`, it returns the plus/minus-applied architecture vector without appending `implicit:all`.

For this descriptor:

```text
ARCH_OPTION = amd64
ARCH_REMOVE_OPTION = all
RESULTING_APT_SOURCE_ARCHITECTURE_VECTOR = [amd64]
```

This matters because 004C1AG qualified exactly the twelve `binary-amd64/Packages.xz` indexes and showed that their admitted package-record architectures include both `amd64` and `all`. The repair must not introduce an unqualified `binary-all/Packages` target merely because APT normally injects `implicit:all`.

Suppressing the separate `implicit:all` index target does not discard `Architecture: all` records already present in the qualified `binary-amd64/Packages` inputs. Exact APT 2.4.13 `debListParser::ArchitectureAll()` recognizes records whose `Architecture` field is `all`, and `pkgCacheGenerator` maps an `Arch == "all"` package record to the cache native architecture. This preserves the 004C1AG `[amd64, all]` record-admission semantics while preventing construction of an additional unqualified `binary-all/Packages` target.

### 5.2 Why `Targets: Packages` and `Languages: none` are explicit

Deb822 `Targets` maps to APT's source-entry `target` option. Freezing it to `Packages` prevents unrelated index-target families from entering the static source-discovery contract. `Languages: none` reinforces the predecessor `Acquire::Languages=none` posture and prevents translation target construction.

The solver-relevant source index target family is therefore exactly `Packages`.

## 6. Exact source-to-target expansion

The descriptor expands as follows:

```text
URI_COUNT = 1
SUITE_COUNT = 3
COMPONENT_COUNT = 4
SOURCE_ARCHITECTURE_VECTOR = [amd64]
SOURCE_TARGET_VECTOR = [Packages]
RELEASE_INDEX_COUNT = 3
PACKAGES_INDEX_TARGET_COUNT = 12
```

`GetDebReleaseIndexBy()` deduplicates the four components of each suite onto one release index by the release-file URI identity, producing exactly three snapshot release identities. Each suite/component pair produces one `Packages` target with meta-key `$(COMPONENT)/binary-$(ARCHITECTURE)/Packages` and architecture `amd64`.

| Role | Suite | Component | Canonical target URI | APT list basename |
| --- | --- | --- | --- | --- |
| `InRelease` | `jammy` | — | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/InRelease` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_InRelease` |
| `Packages` | `jammy` | `main` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/main/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_main_binary-amd64_Packages` |
| `Packages` | `jammy` | `restricted` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/restricted/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_restricted_binary-amd64_Packages` |
| `Packages` | `jammy` | `universe` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/universe/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_universe_binary-amd64_Packages` |
| `Packages` | `jammy` | `multiverse` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/multiverse/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_multiverse_binary-amd64_Packages` |
| `InRelease` | `jammy-updates` | — | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/InRelease` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_InRelease` |
| `Packages` | `jammy-updates` | `main` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/main/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_main_binary-amd64_Packages` |
| `Packages` | `jammy-updates` | `restricted` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/restricted/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_restricted_binary-amd64_Packages` |
| `Packages` | `jammy-updates` | `universe` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/universe/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_universe_binary-amd64_Packages` |
| `Packages` | `jammy-updates` | `multiverse` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/multiverse/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_multiverse_binary-amd64_Packages` |
| `InRelease` | `jammy-security` | — | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/InRelease` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_InRelease` |
| `Packages` | `jammy-security` | `main` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/main/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_main_binary-amd64_Packages` |
| `Packages` | `jammy-security` | `restricted` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/restricted/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_restricted_binary-amd64_Packages` |
| `Packages` | `jammy-security` | `universe` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/universe/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_universe_binary-amd64_Packages` |
| `Packages` | `jammy-security` | `multiverse` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/multiverse/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_multiverse_binary-amd64_Packages` |

The 12 `Packages` basenames exactly match the 004C1AR candidate uncompressed list basenames. The three `InRelease` basenames exactly match the 004C1AR release metadata basenames.

## 7. Release and trust semantics

The selected normal source descriptor creates real `debReleaseIndex` objects. `ReleaseFileName()` prefers the pre-materialized `InRelease` file and falls back to `Release`. `debReleaseIndex::Merge()` reads suite/origin/codename/label and automatic-upgrade policy fields from that release metadata when building the cache. `debReleaseIndex::ArchiveURI()` retains the canonical snapshot repository URI for package archive paths.

004C1AS does **not** claim that a future `apt-get --simulate` invocation re-verifies the OpenPGP signature. Canonical 004C1AG already verified the exact three `InRelease` signatures, and any future materializer must fail closed unless the exact qualified bytes and SHA-256 identities are placed. This grain makes no new trust override and performs no `apt-get update`.

```text
RUNTIME_APT_SIGNATURE_REVERIFICATION_IN_004C1AS = NOT_PERFORMED / NOT_CLAIMED
CANONICAL_004C1AG_INRELEASE_SIGNATURE_VERIFICATION = PRESERVED_PREDECESSOR_EVIDENCE
FUTURE_INRELEASE_EXACT_BYTE_MATERIALIZATION = REQUIRED_PRECONDITION
TRUSTED_YES_OVERRIDE = ABSENT
CHECK_VALID_UNTIL_BYPASS = ABSENT
```

## 8. Repaired APT configuration delta

004C1AQ's measured `apt-config dump` is retained as predecessor evidence only. Additional `apt-config` execution is forbidden in 004C1AS, so no repaired effective dump byte count or hash is claimed.

The committed AQ artifact binds the measured dump by byte count and SHA-256 but does not embed the complete dump bytes. 004C1AS therefore does not infer absence for unlisted configuration keys. Its selected contract requires the future effective `APT::Sources::With` entry count to equal zero; any non-empty effective registration is a fail-closed rejection.

The repaired static override list changes exactly one predecessor value:

```diff
- Dir::Etc::sourcelist=/dev/null
+ Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources
```

All other predecessor overrides remain exactly:

```text
Dir::Etc::sourceparts=-
Dir::State::lists=/tmp/signthos-apt/lists/
Dir::Cache::archives=/tmp/signthos-apt/cache/archives/
Dir::State::status=/tmp/signthos-apt/state/status
Dir::Log=/tmp/signthos-apt/log/
Debug::NoLocking=1
Acquire::Languages=none
Acquire::Retries=0
```

```text
REPAIRED_EFFECTIVE_APT_CONFIG_DUMP = NOT_EXECUTED / NOT_CLAIMED
STATIC_OVERRIDE_DELTA_COUNT = 1
SOURCE_PARTS_DISCOVERY = DISABLED
HOST_OR_IMAGE_DEFAULT_SOURCE_PARTS = PROHIBITED
```

## 9. Repaired Stage A/B/C static argv identities

The repaired argv preserve every 004C1AQ token except the single `Dir::Etc::sourcelist` value. Stage root arrays, root order, recommends policy, `--simulate`, `--no-download`, isolated paths, retry/language posture, and stage ordering are unchanged.

| Stage | argv count | predecessor argv SHA-256 | repaired argv SHA-256 | requested roots SHA-256 | recommends policy |
| --- | ---: | --- | --- | --- | --- |
| `STAGE_A` | 35 | `f9f089dfe777ef80d1f08031cea31fb9dfc4b3442bba6b79d10f8d6256417874` | `72f26c68f4117cecbb9a75c8bd9dd63b5881968e33d79ee6708569c74c4ba349` | `410065f69855eae58ab4daef3cadc253fb3284a9eb4f75537b2c1bace9d5a649` | `NO_INSTALL_RECOMMENDS` |
| `STAGE_B` | 167 | `879202f796dbbbc0241e031cdadae958ff4eb39e8f2c72650f807ce0773ba4ec` | `a9ca35a1ca616f4603cb17cceedbb7d5c37c2525fb1f306da908e982e01d7414` | `f354c23dc9671e5d1daf0db5158b7f1eef0afc205b7620c67ecd948da23b8184` | `DEFAULT_APT_RECOMMENDS` |
| `STAGE_C` | 27 | `22b0700f2018ca84b2bdd0debe44a78108dcd542fce7831bad4eebb344eb4e58` | `de893ea184fb9be2ca834ce6bbf7b92c8191ee62c4251f99d84ac2ea7036ef4c` | `c0ee3f407b0591988df41f7dbe3d0bd975e32312079b221bf8414d74094d19d7` | `NO_INSTALL_RECOMMENDS` |

Repaired common prefix:

```text
/usr/bin/apt-get
--simulate
--no-download
-o Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources
-o Dir::Etc::sourceparts=-
-o Dir::State::lists=/tmp/signthos-apt/lists/
-o Dir::Cache::archives=/tmp/signthos-apt/cache/archives/
-o Dir::State::status=/tmp/signthos-apt/state/status
-o Dir::Log=/tmp/signthos-apt/log/
-o Debug::NoLocking=1
-o Acquire::Languages=none
-o Acquire::Retries=0
install
```

Stage A and Stage C then preserve their predecessor `--no-install-recommends` token and exact ordered root arrays. Stage B preserves default APT Recommends behavior and the exact canonical 145-root sequence.

No repaired argv was executed.

## 10. Fail-closed repair invariants

Any later materialization or execution must reject the run if any of the following is true:

```text
SOURCE_DESCRIPTOR_PATH_MISMATCH = REJECT
SOURCE_DESCRIPTOR_BYTES_MISMATCH = REJECT
SOURCE_DESCRIPTOR_SHA256_MISMATCH = REJECT
SOURCE_DESCRIPTOR_FORMAT_MISMATCH = REJECT
SOURCE_DESCRIPTOR_EXTRA_STANZA = REJECT
SNAPSHOT_ID_BROADENING = REJECT
SNAPSHOT_URI_SUBSTITUTION = REJECT
SUITE_ADDITION_OR_SUBSTITUTION = REJECT
COMPONENT_ADDITION_OR_SUBSTITUTION = REJECT
ARCHITECTURE_ADDITION_OR_SUBSTITUTION = REJECT
IMPLICIT_ARCHITECTURE_ALL_TARGET = REJECT
TARGET_FAMILY_ADDITION = REJECT
LIVE_ARCHIVE_UBUNTU_COM = REJECT
LIVE_SECURITY_UBUNTU_COM = REJECT
HOST_SOURCE_LIST = REJECT
IMAGE_DEFAULT_SOURCE_LIST = REJECT
SOURCE_PARTS_DIRECTORY = REJECT
APT_SOURCES_WITH_VOLATILE_SUBSTITUTION = REJECT
EFFECTIVE_APT_SOURCES_WITH_NONEMPTY = REJECT
UNBOUND_INRELEASE = REJECT
UNBOUND_RELEASE_OR_RELEASE_GPG = REJECT
UNBOUND_PACKAGES_INDEX = REJECT
UNEXPECTED_LIST_BASENAME = REJECT
MISSING_EXPECTED_RELEASE_TARGET = REJECT
MISSING_EXPECTED_PACKAGE_TARGET = REJECT
```

The repair does not authorize a fallback to volatile indexes if the descriptor is absent or invalid.

## 11. Byte-complete deterministic repair contract

Serialization rule:

```text
encoding = UTF-8
json object key order = lexicographic / sort_keys=true
json separators = comma + colon / no insignificant whitespace
ensure_ascii = false
array order = preserved exactly
line ending = LF
trailing newline = exactly one LF
```

```text
REPAIR_CONTRACT_JSON_BYTES = 13912
REPAIR_CONTRACT_JSON_SHA256 = be5ae85678ffec71afd0fbb8284d882a57245ed576b99c09c88e2fbefd653a79
```

### Exact canonical repair-contract JSON payload

The byte identity above is defined by the exact one-line JSON payload below. To reconstruct it, take only the UTF-8 content between the `json` fences, exclude the fences, and append exactly one LF byte. Do not pretty-print, normalize, rename, reorder, or reinterpret any field or array.

```json
{"aptConfiguration":{"effectiveDumpStatus":"NOT_EXECUTED_NOT_CLAIMED_IN_004C1AS","repairedOverridesOrdered":["Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","Dir::Etc::sourceparts=-","Dir::State::lists=/tmp/signthos-apt/lists/","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","Dir::State::status=/tmp/signthos-apt/state/status","Dir::Log=/tmp/signthos-apt/log/","Debug::NoLocking=1","Acquire::Languages=none","Acquire::Retries=0"]},"aptGet":{"bytes":51680,"gid":0,"mode":"755","path":"/usr/bin/apt-get","sha256":"9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196","uid":0,"version":"apt 2.4.13 (amd64)"},"aptSource":{"commit":"581ec5c0aa2c6665d72465040f1465eb93503200","repository":"https://git.launchpad.net/ubuntu/+source/apt","tag":"import/2.4.13","tagObject":"27207612b00b302b7b18cfeec355bad1a5de6bca","tree":"e9afcae41f88040e93eb7a10a89e72c00b59e245"},"containerEnvelope":{"capDrop":["ALL"],"hostMounts":0,"network":"none","noNewPrivileges":true,"pidsLimit":64,"platform":"linux/amd64","pull":"never","readOnly":true,"repositoryMounts":0},"failClosedInvariants":["SOURCE_DESCRIPTOR_EXACT_IDENTITY_REQUIRED","APT_SOURCES_WITH_EFFECTIVE_ENTRY_COUNT_MUST_EQUAL_0","SOURCE_PARTS_DIRECTORY_PROHIBITED","UNBOUND_RELEASE_OR_RELEASE_GPG_PROHIBITED","EXACT_THREE_INRELEASE_REQUIRED","EXACT_TWELVE_AMD64_PACKAGES_REQUIRED","LIVE_ARCHIVE_OR_SECURITY_MIRROR_PROHIBITED","IMPLICIT_ARCHITECTURE_ALL_TARGET_PROHIBITED","UNBOUND_INDEX_TARGET_PROHIBITED"],"predecessor":{"aqMeasuredAptConfigDumpBytes":10891,"aqMeasuredAptConfigDumpSha256":"ecc166b8ba13022afe1923d3e2012d5eea86424d568142f8022535932e9f148f","aqStaticContractSha256":"8be0106e5ab1ff0770e60c41d26a7ecf41c8abd9f1829e8f857a9f5372a3c2e9","arDocumentSha256":"af50db2cfecd791bf11c6820eaf0f9939332dfbce3e1a7029a742349c477abfe","canonicalBase":"865878dcc10903d681a59cc8d7ee5ffb6858a16a"},"schema":"signthos.004c1as.apt-source-discovery-repair.v1","serialization":{"encoding":"UTF-8","json":"sort_keys=true,separators=(comma,colon),ensure_ascii=false","lineEnding":"LF","trailingNewline":true},"sourceDiscovery":{"descriptor":{"bytes":242,"content":"Types: deb\nURIs: https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/\nSuites: jammy jammy-updates jammy-security\nComponents: main restricted universe multiverse\nArchitectures: amd64\nArchitectures-Remove: all\nLanguages: none\nTargets: Packages\n","encoding":"UTF-8","format":"deb822","lineEnding":"LF","path":"/tmp/signthos-apt/etc/snapshot.sources","sha256":"3fcdd0b5ef962070795738f92f36ea70f8c05a3171ae72e832f46746f7bab199","trailingNewline":true},"expectedAptSourcesWithEntries":0,"expectedPackageTargetCount":12,"expectedReleaseTargetCount":3,"expectedTargets":[{"basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_InRelease","role":"InRelease","suite":"jammy","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/InRelease"},{"architecture":"amd64","basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_main_binary-amd64_Packages","component":"main","role":"Packages","suite":"jammy","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/main/binary-amd64/Packages"},{"architecture":"amd64","basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_restricted_binary-amd64_Packages","component":"restricted","role":"Packages","suite":"jammy","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/restricted/binary-amd64/Packages"},{"architecture":"amd64","basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_universe_binary-amd64_Packages","component":"universe","role":"Packages","suite":"jammy","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/universe/binary-amd64/Packages"},{"architecture":"amd64","basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_multiverse_binary-amd64_Packages","component":"multiverse","role":"Packages","suite":"jammy","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/multiverse/binary-amd64/Packages"},{"basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_InRelease","role":"InRelease","suite":"jammy-updates","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/InRelease"},{"architecture":"amd64","basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_main_binary-amd64_Packages","component":"main","role":"Packages","suite":"jammy-updates","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/main/binary-amd64/Packages"},{"architecture":"amd64","basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_restricted_binary-amd64_Packages","component":"restricted","role":"Packages","suite":"jammy-updates","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/restricted/binary-amd64/Packages"},{"architecture":"amd64","basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_universe_binary-amd64_Packages","component":"universe","role":"Packages","suite":"jammy-updates","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/universe/binary-amd64/Packages"},{"architecture":"amd64","basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_multiverse_binary-amd64_Packages","component":"multiverse","role":"Packages","suite":"jammy-updates","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/multiverse/binary-amd64/Packages"},{"basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_InRelease","role":"InRelease","suite":"jammy-security","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/InRelease"},{"architecture":"amd64","basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_main_binary-amd64_Packages","component":"main","role":"Packages","suite":"jammy-security","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/main/binary-amd64/Packages"},{"architecture":"amd64","basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_restricted_binary-amd64_Packages","component":"restricted","role":"Packages","suite":"jammy-security","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/restricted/binary-amd64/Packages"},{"architecture":"amd64","basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_universe_binary-amd64_Packages","component":"universe","role":"Packages","suite":"jammy-security","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/universe/binary-amd64/Packages"},{"architecture":"amd64","basename":"snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_multiverse_binary-amd64_Packages","component":"multiverse","role":"Packages","suite":"jammy-security","uri":"https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/multiverse/binary-amd64/Packages"}],"rejectedMechanism":"APT::Sources::With volatile package-index registration","selectedMechanism":"deb822-main-source-descriptor"},"stages":[{"predecessorArgvSha256":"f9f089dfe777ef80d1f08031cea31fb9dfc4b3442bba6b79d10f8d6256417874","recommendsPolicy":"NO_INSTALL_RECOMMENDS","repairedArgv":["/usr/bin/apt-get","--simulate","--no-download","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","--no-install-recommends","pkg-config","autoconf","automake","libtool","ragel","git","yasm","subversion","lsb-release","tzdata","keyboard-configuration","tini"],"repairedArgvSha256":"72f26c68f4117cecbb9a75c8bd9dd63b5881968e33d79ee6708569c74c4ba349","requestedRootsOrdered":["pkg-config","autoconf","automake","libtool","ragel","git","yasm","subversion","lsb-release","tzdata","keyboard-configuration","tini"],"requestedRootsSha256":"410065f69855eae58ab4daef3cadc253fb3284a9eb4f75537b2c1bace9d5a649","stageId":"STAGE_A"},{"predecessorArgvSha256":"879202f796dbbbc0241e031cdadae958ff4eb39e8f2c72650f807ce0773ba4ec","recommendsPolicy":"DEFAULT_APT_RECOMMENDS","repairedArgv":["/usr/bin/apt-get","--simulate","--no-download","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","at-spi2-core","autoconf","binutils","binutils-aarch64-linux-gnu","binutils-arm-linux-gnueabihf","binutils-mips64el-linux-gnuabi64","binutils-mipsel-linux-gnu","bison","bzip2","cdbs","curl","dbus-x11","devscripts","dpkg-dev","elfutils","fakeroot","fd-find","flex","git-core","gperf","lib32gcc-s1","lib32stdc++6","lib32z1","libasound2","libasound2-dev","libatk1.0-0","libatspi2.0-0","libatspi2.0-dev","libbluetooth-dev","libbrlapi-dev","libbrlapi0.8","libbz2-1.0","libbz2-dev","libc6","libc6-dev","libc6-i386","libcairo2","libcairo2-dev","libcap-dev","libcap2","libcgi-session-perl","libcups2","libcups2-dev","libcurl4-gnutls-dev","libdrm-dev","libdrm2","libegl1","libelf-dev","libevdev-dev","libevdev2","libexpat1","libffi-dev","libffi8","libfontconfig1","libfreetype6","libfuse2","libgbm-dev","libgbm1","libgl1","libglib2.0-0","libglib2.0-dev","libglu1-mesa-dev","libgraphene-1.0-0","libgtk-3-0","libgtk-3-dev","libinput-dev","libinput10","libjpeg-dev","libkrb5-dev","libncurses6","libnspr4","libnspr4-dev","libnss3","libnss3-dev","libpam0g","libpam0g-dev","libpango-1.0-0","libpangocairo-1.0-0","libpci-dev","libpci3","libpixman-1-0","libpng16-16","libpulse-dev","libpulse0","libsctp-dev","libspeechd-dev","libspeechd2","libsqlite3-0","libsqlite3-dev","libssl-dev","libstdc++6","libsystemd-dev","libudev-dev","libudev1","libuuid1","libva-dev","libvulkan-dev","libvulkan1","libwayland-egl1","libwww-perl","libx11-6","libx11-xcb1","libxau6","libxcb1","libxcomposite1","libxcursor1","libxdamage1","libxdmcp6","libxext6","libxfixes3","libxi6","libxinerama1","libxkbcommon-dev","libxrandr2","libxrender1","libxshmfence-dev","libxslt1-dev","libxss-dev","libxt-dev","libxtst-dev","libxtst6","lighttpd","locales","mesa-common-dev","mutter-common","openbox","p7zip","patch","perl","pkgconf","ripgrep","rpm","ruby","uuid-dev","wdiff","x11-utils","x11-xserver-utils","xcompmgr","xserver-xorg-core","xserver-xorg-video-dummy","xvfb","xz-utils","zip","zlib1g","zstd"],"repairedArgvSha256":"a9ca35a1ca616f4603cb17cceedbb7d5c37c2525fb1f306da908e982e01d7414","requestedRootsOrdered":["at-spi2-core","autoconf","binutils","binutils-aarch64-linux-gnu","binutils-arm-linux-gnueabihf","binutils-mips64el-linux-gnuabi64","binutils-mipsel-linux-gnu","bison","bzip2","cdbs","curl","dbus-x11","devscripts","dpkg-dev","elfutils","fakeroot","fd-find","flex","git-core","gperf","lib32gcc-s1","lib32stdc++6","lib32z1","libasound2","libasound2-dev","libatk1.0-0","libatspi2.0-0","libatspi2.0-dev","libbluetooth-dev","libbrlapi-dev","libbrlapi0.8","libbz2-1.0","libbz2-dev","libc6","libc6-dev","libc6-i386","libcairo2","libcairo2-dev","libcap-dev","libcap2","libcgi-session-perl","libcups2","libcups2-dev","libcurl4-gnutls-dev","libdrm-dev","libdrm2","libegl1","libelf-dev","libevdev-dev","libevdev2","libexpat1","libffi-dev","libffi8","libfontconfig1","libfreetype6","libfuse2","libgbm-dev","libgbm1","libgl1","libglib2.0-0","libglib2.0-dev","libglu1-mesa-dev","libgraphene-1.0-0","libgtk-3-0","libgtk-3-dev","libinput-dev","libinput10","libjpeg-dev","libkrb5-dev","libncurses6","libnspr4","libnspr4-dev","libnss3","libnss3-dev","libpam0g","libpam0g-dev","libpango-1.0-0","libpangocairo-1.0-0","libpci-dev","libpci3","libpixman-1-0","libpng16-16","libpulse-dev","libpulse0","libsctp-dev","libspeechd-dev","libspeechd2","libsqlite3-0","libsqlite3-dev","libssl-dev","libstdc++6","libsystemd-dev","libudev-dev","libudev1","libuuid1","libva-dev","libvulkan-dev","libvulkan1","libwayland-egl1","libwww-perl","libx11-6","libx11-xcb1","libxau6","libxcb1","libxcomposite1","libxcursor1","libxdamage1","libxdmcp6","libxext6","libxfixes3","libxi6","libxinerama1","libxkbcommon-dev","libxrandr2","libxrender1","libxshmfence-dev","libxslt1-dev","libxss-dev","libxt-dev","libxtst-dev","libxtst6","lighttpd","locales","mesa-common-dev","mutter-common","openbox","p7zip","patch","perl","pkgconf","ripgrep","rpm","ruby","uuid-dev","wdiff","x11-utils","x11-xserver-utils","xcompmgr","xserver-xorg-core","xserver-xorg-video-dummy","xvfb","xz-utils","zip","zlib1g","zstd"],"requestedRootsSha256":"f354c23dc9671e5d1daf0db5158b7f1eef0afc205b7620c67ecd948da23b8184","stageId":"STAGE_B"},{"predecessorArgvSha256":"22b0700f2018ca84b2bdd0debe44a78108dcd542fce7831bad4eebb344eb4e58","recommendsPolicy":"NO_INSTALL_RECOMMENDS","repairedArgv":["/usr/bin/apt-get","--simulate","--no-download","-o","Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources","-o","Dir::Etc::sourceparts=-","-o","Dir::State::lists=/tmp/signthos-apt/lists/","-o","Dir::Cache::archives=/tmp/signthos-apt/cache/archives/","-o","Dir::State::status=/tmp/signthos-apt/state/status","-o","Dir::Log=/tmp/signthos-apt/log/","-o","Debug::NoLocking=1","-o","Acquire::Languages=none","-o","Acquire::Retries=0","install","--no-install-recommends","curl","build-essential","pkg-config","rsync"],"repairedArgvSha256":"de893ea184fb9be2ca834ce6bbf7b92c8191ee62c4251f99d84ac2ea7036ef4c","requestedRootsOrdered":["curl","build-essential","pkg-config","rsync"],"requestedRootsSha256":"c0ee3f407b0591988df41f7dbe3d0bd975e32312079b221bf8414d74094d19d7","stageId":"STAGE_C"}]}
```

The embedded payload includes every repaired Stage A/B/C argv array, their exact ordered roots, the exact descriptor content and identity, the expected three release and twelve package targets, the single repaired configuration delta, the predecessor identities, and the unchanged container envelope.

## 12. Independent reconstruction rules

An independent reviewer can reconstruct every new identity without invoking APT:

1. extract the exact descriptor text from section 5 including one final LF and verify `242` bytes and SHA-256 `3fcdd0b5ef962070795738f92f36ea70f8c05a3171ae72e832f46746f7bab199`;
2. parse the 004C1AQ canonical static-contract payload and replace only the exact string `Dir::Etc::sourcelist=/dev/null` with `Dir::Etc::sourcelist=/tmp/signthos-apt/etc/snapshot.sources` in each Stage argv;
3. serialize each repaired argv as compact UTF-8 JSON plus one LF and verify the three repaired hashes in section 9;
4. extract the one-line canonical 004C1AS repair payload, append one LF, and verify `13912` bytes and SHA-256 `be5ae85678ffec71afd0fbb8284d882a57245ed576b99c09c88e2fbefd653a79`;
5. verify the payload's `sourceDiscovery.expectedTargets` contains exactly three `InRelease` and twelve `Packages` records and that all basenames match section 6;
6. verify every root array and root SHA-256 is unchanged from canonical 004C1AQ.

No execution-derived value is required for those static identities.

## 13. Qualification result

```text
APT_2_4_13_SOURCE_DISCOVERY_MECHANISM_RECONCILIATION = PASS
VOLATILE_APT_SOURCES_WITH_MECHANISM = REJECTED_FOR_RELEASE_ASSOCIATION_LOSS
DEB822_MAIN_SOURCE_DESCRIPTOR_SELECTION = PASS
SOURCE_DESCRIPTOR_BYTE_IDENTITY = PASS
IMPLICIT_ARCHITECTURE_ALL_SUPPRESSION = PASS
PACKAGES_ONLY_TARGET_RESTRICTION = PASS
CANONICAL_RELEASE_ASSOCIATION = PASS
CANONICAL_SNAPSHOT_ARCHIVE_URI_ASSOCIATION = PASS
EXPECTED_RELEASE_TARGET_COUNT = 3
EXPECTED_PACKAGE_TARGET_COUNT = 12
004C1AR_LIST_BASENAME_RECONCILIATION = PASS
REPAIRED_STAGE_A_STATIC_ARGV_IDENTITY = PASS
REPAIRED_STAGE_B_STATIC_ARGV_IDENTITY = PASS
REPAIRED_STAGE_C_STATIC_ARGV_IDENTITY = PASS
BYTE_COMPLETE_REPAIR_CONTRACT = PASS
REPAIRED_EFFECTIVE_APT_CONFIG_DUMP = NOT_EXECUTED / NOT_CLAIMED
APT_SOURCE_DESCRIPTOR_MATERIALIZATION = 0
APT_SNAPSHOT_LIST_MATERIALIZATION = 0
APT_GET_EXECUTION = 0
APT_CACHE_EXECUTION = 0
APT_CONFIG_ADDITIONAL_EXECUTION = 0
DPKG_EXECUTION = 0
APT_SIMULATION_EXECUTION = 0
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = 0
IMAGE_OR_CONTAINER_EXECUTION = 0
NODE_TOOLCHAIN_PDFIUM_PROVIDER_EXECUTION = 0
004C1AS_RESULT = PASS_STATIC_SOURCE_DISCOVERY_AND_ARGV_REPAIR_CONTRACT
```

004C1AS proves a statically coherent source-discovery repair. It does not prove that the descriptor or list bytes have been materialized and does not prove that `apt-get --simulate` succeeds.

## 14. Successor boundary

004C1AS authorizes no execution. A fresh post-merge Issue #7 reconciliation is required before any source descriptor materialization, snapshot-list materialization, writable APT-state preparation, APT solver simulation, or package action.

```text
APT_SOURCE_DESCRIPTOR_MATERIALIZATION = NOT_AUTHORIZED
APT_SNAPSHOT_LIST_MATERIALIZATION = NOT_AUTHORIZED
WRITABLE_APT_STATE_PREPARATION = NOT_AUTHORIZED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED
APT_GET_EXECUTION = NOT_AUTHORIZED
APT_CACHE_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
