# 004C1AR — APT Snapshot List Layout and Materialization Contract Qualification

Status: `QUALIFICATION_CANDIDATE / STATIC_SOURCE_RECONCILIATION_COMPLETE / FAIL_CLOSED_ON_AQ_SOURCE_DISCOVERY_CONTRACT`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `c03a00fad4b0bb7c1ee9e9870972eaadc951ce7d`
Canonical base tree: `75e8618d6727a5d8b56f346a7016796afd29fcc5`
Authority source: `github:issue-comment:5609654318`

## 1. Purpose and exact authority

Canonical 004C1AL requires a deterministic isolated APT list universe before any solver simulation. Canonical 004C1AQ freezes the effective APT configuration and Stage A/B/C static argv, including `Dir::Etc::sourcelist=/dev/null`, `Dir::Etc::sourceparts=-`, and `Dir::State::lists=/tmp/signthos-apt/lists/`. 004C1AR performs only the authorized static qualification needed to determine whether the exact APT 2.4.13 implementation can discover and consume pre-materialized snapshot indexes under that frozen configuration.

```text
004C1AR_AUTHORITY = PLANNING_AND_STATIC_LIST_LAYOUT_QUALIFICATION_ONLY
004C1AR_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ar-apt-snapshot-list-layout-and-materialization-contract-qualification.md
004C1AR_MAX_CHANGED_REPOSITORY_FILES = 1
CANONICAL_004C1AG_004C1AL_004C1AQ_EVIDENCE_READ = AUTHORIZED
PUBLIC_IMMUTABLE_APT_2_4_13_SOURCE_OR_DOCUMENTATION_READ = AUTHORIZED_STATIC_ONLY
PUBLIC_CANONICAL_UBUNTU_SNAPSHOT_METADATA_READ = AUTHORIZED_STATIC_ONLY
SIGNTHOS_AUTHORED_LIST_LAYOUT_AND_TRANSFORM_DESIGN = AUTHORIZED_STATIC_ONLY
APT_GET_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_CACHE_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_CONFIG_ADDITIONAL_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
DPKG_OR_DPKG_QUERY_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
APT_SNAPSHOT_LIST_MATERIALIZATION = NOT_AUTHORIZED / NOT_PERFORMED
WRITABLE_APT_STATE_PREPARATION = NOT_AUTHORIZED / NOT_PERFORMED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED / NOT_PERFORMED
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = NOT_AUTHORIZED / NOT_PERFORMED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

No APT command, package command, container command, materialization run, package acquisition, installation, or provider/runtime operation was executed by this grain.

## 2. Canonical predecessor bindings

```text
CANONICAL_MAIN_AT_AR_START = c03a00fad4b0bb7c1ee9e9870972eaadc951ce7d
CANONICAL_MAIN_TREE_AT_AR_START = 75e8618d6727a5d8b56f346a7016796afd29fcc5
OPEN_PULL_REQUESTS_AT_AR_PREFLIGHT = 0
UBUNTU_SNAPSHOT_ID = 20260909T180000Z
UBUNTU_SNAPSHOT_BASE = https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/
TARGET_INDEX_ARCHITECTURE = amd64
ADMITTED_BINARY_RECORD_ARCHITECTURES = [amd64, all]
UBUNTU_SUITES = [jammy, jammy-updates, jammy-security]
UBUNTU_COMPONENTS = [main, restricted, universe, multiverse]
EXACT_APT_GET_PATH = /usr/bin/apt-get
EXACT_APT_GET_VERSION = apt 2.4.13 (amd64)
EXACT_APT_GET_SHA256 = 9d1fc8d54586a897939bcd833071067dd32dd820c33736e4d4ed95016afdc196
004C1AG_ROOT_PACKAGE_SET_SHA256 = 2d3674e9676c03150f515de07a750f772e37925311bf2f11395d0c502616a8e0
004C1AG_RESOLVED_CLOSURE_SHA256 = bcbc2ffeccfea0653b9c8a1265e18d9ce1787e4679f9bcd64a39e3a3b3cbe970
004C1AQ_STATIC_CONTRACT_SHA256 = 8be0106e5ab1ff0770e60c41d26a7ecf41c8abd9f1829e8f857a9f5372a3c2e9
APT_STAGE_ORDER = [STAGE_A, STAGE_B, STAGE_C]
```

The frozen 004C1AQ source/list-related overrides are:

```text
Dir::Etc::sourcelist=/dev/null
Dir::Etc::sourceparts=-
Dir::State::lists=/tmp/signthos-apt/lists/
Dir::Cache::archives=/tmp/signthos-apt/cache/archives/
Dir::State::status=/tmp/signthos-apt/state/status
Dir::Log=/tmp/signthos-apt/log/
Debug::NoLocking=1
Acquire::Languages=none
Acquire::Retries=0
```

No Stage A/B/C argv contains `APT::Sources::With`, a non-null source-list path, an alternate package-index injection option, or a prebuilt package-cache identity.

## 3. Exact canonical snapshot metadata identities

The three already-qualified signed `InRelease` objects remain:

| Suite | Bytes | SHA-256 |
| --- | ---: | --- |
| `jammy` | 270087 | `c14060cd8c6d625874dfcb9523a35a395bf4865c28b6b6a82569ef326fe92dc6` |
| `jammy-updates` | 128049 | `78e5c7e6f16f418c394d2d6caa4d8d10fafa715b08b038c02a8c73cd6dc4587b` |
| `jammy-security` | 128927 | `b2eb2336d267611f596e47fe9bad879db22371598047363db841d8f5f586d450` |

The twelve already-qualified signed `binary-amd64/Packages.xz` objects remain:

| Suite | Component | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `jammy` | `main` | 1394768 | `37cb57f1554cbfa71c5a29ee9ffee18a9a8c1782bb0568e0874b7ff4ce8f9c11` |
| `jammy` | `restricted` | 129256 | `92102b5d9dfb7804293891528d5e57c3d05949df71af613d4f99fcb7d6a3f488` |
| `jammy` | `universe` | 14090084 | `d29cb24c93fec5f43255706bce7eb46d4779952039d8c68ac1bb14a6f3655ce2` |
| `jammy` | `multiverse` | 216948 | `e24bf9b5daf5387aa5311f69367b248b1d46d37d72480760f91f5a312c7eb43c` |
| `jammy-updates` | `main` | 3794492 | `fc3ca7fd8c51bfcaef4c60146d82f07771d5c81843def876d3b4296acffad473` |
| `jammy-updates` | `restricted` | 6542404 | `a9d99a9e6dd5952ec639e7e28763275c3aa5df18b69f06973cc3c6ab1fac434d` |
| `jammy-updates` | `universe` | 1282472 | `e63677ef4f3f73a0ac7ac29be177222ddb2bf169ba0fe2bc16448342f71a53db` |
| `jammy-updates` | `multiverse` | 76800 | `eb52bf4941c406f9d9fe486128453060fadb2d0172750cbe84f2896d1ecf4e71` |
| `jammy-security` | `main` | 3526324 | `6fed35b19b0a467d391330554308eb2bcfc679a13604635f3298dd8ef383e7a4` |
| `jammy-security` | `restricted` | 6304508 | `c82967cb499e44f680aa67fd9972db8a396eed44d3733261ccdc8b3dd57a8287` |
| `jammy-security` | `universe` | 1048048 | `c06fe8a63c3debf947fd2f717d369e9c205f31a0eea25d07e8b92e106ee84757` |
| `jammy-security` | `multiverse` | 69092 | `8b79f9054d123125a830170dbaea7c7053572dba1a0f9187313c5229245ae384` |

```text
SIGNED_INRELEASE_COUNT = 3
SIGNED_PACKAGES_XZ_COUNT = 12
SIGNED_PACKAGES_XZ_COMPRESSED_BYTES = 38475196
```

004C1AR does not reacquire, decompress, parse, or materialize any of these objects.

## 4. Exact immutable APT 2.4.13 source identity

Static source reconciliation used the first-party Ubuntu git-import repository only:

```text
APT_SOURCE_REPOSITORY = https://git.launchpad.net/ubuntu/+source/apt
APT_SOURCE_TAG = import/2.4.13
APT_SOURCE_TAG_OBJECT = 27207612b00b302b7b18cfeec355bad1a5de6bca
APT_SOURCE_COMMIT = 581ec5c0aa2c6665d72465040f1465eb93503200
APT_SOURCE_TREE = e9afcae41f88040e93eb7a10a89e72c00b59e245
APT_SOURCE_CHANGELOG_VERSION = apt (2.4.13) jammy; urgency=medium
APT_SOURCE_PACKAGE_TARBALL_SHA256 = 8bdb54d6bf07185c8687d4ab8eb66690cdbbea31d1b0afa8778598f1ae9dc8a7
```

Relevant exact source-file identities:

| Path | Git blob | SHA-256 |
| --- | --- | --- |
| `apt-pkg/init.cc` | `3990a1f3926866e741a1d0713722c57e678f964a` | `e231c4a740d0ce656dd2b501bb2ee3900b312477dafae6b482f11195535c7fad` |
| `apt-pkg/sourcelist.cc` | `055cf4142db457a94564df348ee14079c43b6953` | `d4a63c87320cb261f8ebaa77f10e0f12525914e129787295ed3ba66ccc103ef2` |
| `apt-pkg/cachefile.cc` | `4c3cc95867a40f82199159df316ccd806a2f7a57` | `59251a75a691767446824ce5d412e32a0667878129a24dec0e9a1538605d8ca9` |
| `apt-pkg/pkgcachegen.cc` | `9e47ef369504a2b296e2cb77ceab6c70af8982af` | `3072484125eaeb9e69429bc966d0d502e99e257b9b9a77b54078c698a4615ef7` |
| `apt-pkg/contrib/strutl.cc` | `3a0a6eaa321d7912c90dc989638e177ae246e736` | `14de292ea5d5b55f2db3d4ac8d0b08a05e77f75779c17f37673338edc44054fc` |
| `apt-pkg/indexfile.cc` | `1176903f4a7d54d44279ac6a5b924b0367c5e1e1` | `e5511c2efa0ccf4ff5dd44c254b7fda2052d5cffe3ca25da9b413af7a1c4fd4a` |
| `apt-pkg/acquire-item.cc` | `f9362b0d540bf9fee47eaa9f484ec1be9b73f6cb` | `cf8440c394a97a92efc030f0c96b9456a51b9816081ad71d4408cc3be7f90a54` |
| `apt-pkg/deb/debmetaindex.cc` | `c78da494668225bc999747233104ae38b80b7751` | `c39c41d1de05cf4b102592412294ff4ea90af1ed5a2b88af6dbe0501cfdf98c3` |

The `import/2.4.13` and `applied/2.4.13` peeled trees have no file diff for this native source version. No APT source byte is imported into Signthos.

## 5. Static APT list naming contract

APT 2.4.13 defines the binary package target meta-key as:

```text
$(COMPONENT)/binary-$(ARCHITECTURE)/Packages
```

`debReleaseIndex` constructs the target URI as the release base URI plus that meta-key. `pkgIndexFile::Option(FILENAME)` resolves the corresponding local file as:

```text
Dir::State::lists + URItoFileName(targetUri)
```

`URItoFileName` removes credentials and the URI access/scheme, quotes unsafe characters, replaces `/` with `_`, and preserves the host/path identity. `pkgIndexFile::Option(FILENAME)` is the extensionless base path. APT 2.4.13 `getCompressionTypes()` always appends the special `uncompressed` type when its configured uncompressed handler is empty or exists, so an uncompressed candidate uses that base path without relying on an unmeasured `Acquire::GzipIndexes` value. Therefore the static candidate uncompressed list filenames for the bound snapshot are:

| Suite | Component | Candidate target URI | Candidate uncompressed list filename |
| --- | --- | --- | --- |
| `jammy` | `main` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/main/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_main_binary-amd64_Packages` |
| `jammy` | `restricted` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/restricted/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_restricted_binary-amd64_Packages` |
| `jammy` | `universe` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/universe/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_universe_binary-amd64_Packages` |
| `jammy` | `multiverse` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy/multiverse/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_multiverse_binary-amd64_Packages` |
| `jammy-updates` | `main` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/main/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_main_binary-amd64_Packages` |
| `jammy-updates` | `restricted` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/restricted/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_restricted_binary-amd64_Packages` |
| `jammy-updates` | `universe` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/universe/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_universe_binary-amd64_Packages` |
| `jammy-updates` | `multiverse` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-updates/multiverse/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_multiverse_binary-amd64_Packages` |
| `jammy-security` | `main` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/main/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_main_binary-amd64_Packages` |
| `jammy-security` | `restricted` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/restricted/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_restricted_binary-amd64_Packages` |
| `jammy-security` | `universe` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/universe/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_universe_binary-amd64_Packages` |
| `jammy-security` | `multiverse` | `https://snapshot.ubuntu.com/ubuntu/20260909T180000Z/dists/jammy-security/multiverse/binary-amd64/Packages` | `snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_multiverse_binary-amd64_Packages` |

These names are a static naming result only. They are **not** evidence that the current AQ argv discovers or consumes the files.

## 6. Static Packages.xz-to-list transform contract

A later separately authorized materializer may only transform one of the twelve bound objects under this fail-closed algorithm:

1. accept an input only when `suite`, `component`, `architecture`, compressed byte length, and compressed SHA-256 exactly match the canonical 004C1AG table;
2. require the input filename identity to be `dists/<suite>/<component>/binary-amd64/Packages.xz` relative to the exact snapshot base;
3. decompress with an XZ implementation whose executable/library identity is separately bound before use;
4. reject trailing bytes, concatenated unbound members, decompression errors, or resource-limit violations;
5. write the decompressed bytes only to a fresh external staging path;
6. compute and record decompressed byte length and SHA-256 before any final placement;
7. derive the final basename exclusively from APT 2.4.13 `URItoFileName` semantics applied to the canonical uncompressed target URI above;
8. require the final basename to equal the table in section 5 byte-for-byte;
9. require regular-file mode `0644`, uid `0`, gid `0` in the future isolated container-visible list root unless a later execution-substrate qualification proves a different required ownership contract;
10. atomically place the file only after every identity check passes;
11. sort manifest records lexicographically by `targetId = <suite>/<component>/binary-amd64/Packages`;
12. reject duplicate target IDs, duplicate final paths, symlinks, hard links to pre-existing files, path traversal, host-list reuse, image-default-list reuse, or any unbound file.

Because materialization is not authorized here, no decompressed byte length or SHA-256 is claimed by 004C1AR.

## 7. Release/InRelease role

APT 2.4.13 `debReleaseIndex::MetaIndexFile()` uses the same `Dir::State::lists + URItoFileName(...)` mapping for release metadata. `ReleaseFileName()` checks `InRelease` first and falls back to `Release`. When present, `debReleaseIndex::Merge()` reads that file and stores release properties including `Suite`, `Version`, `Origin`, `Codename`, `Label`, `NotAutomatic`, and `ButAutomaticUpgrades` into the package cache.

For the already-qualified clear-signed snapshot metadata, the candidate `InRelease` list basenames are:

```text
snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy_InRelease
snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-updates_InRelease
snapshot.ubuntu.com_ubuntu_20260909T180000Z_dists_jammy-security_InRelease
```

A detached `Release`/`Release.gpg` pair is not required by this candidate layout because the exact canonical `InRelease` bytes are already bound. However, this release-metadata layout is still non-consumable under the current AQ source-discovery posture for the same reason as the package indexes: no corresponding `debReleaseIndex` is constructed when the source list is empty.

## 8. Decisive source-discovery finding

The exact APT 2.4.13 source establishes the following chain:

1. `pkgCacheFile::BuildCaches()` calls `BuildSourceList()` before `pkgCacheGenerator::MakeStatusCache()`.
2. `BuildSourceList()` creates a new `pkgSourceList` and calls `ReadMainList()`.
3. `pkgSourceList::ReadMainList()` resets the list, then reads only the configured main source list when it is a real file, the configured source-parts directory when it is a real directory, and entries supplied through `APT::Sources::With`.
4. Under canonical AQ, `Dir::Etc::sourcelist=/dev/null`, `Dir::Etc::sourceparts=-`, and no `APT::Sources::With` is present in the frozen argv. Therefore no snapshot `debReleaseIndex` is constructed by the AQ contract.
5. `MakeStatusCache()` passes that `pkgSourceList` into `BuildCache()`.
6. `BuildCache()` discovers package index files by iterating the source list and calling each source's `GetIndexFiles()`. It does not scan `Dir::State::lists` for arbitrary `Packages` files.
7. The remaining non-source inputs are system status files and explicitly registered volatile files. Canonical AQ does not register the twelve snapshot indexes as volatile files.

Therefore:

```text
AQ_SOURCE_LIST_ENTRY_COUNT_FOR_BOUND_SNAPSHOT = 0 / BY_STATIC_CONTRACT
AQ_APT_SOURCES_WITH_SNAPSHOT_INDEX_REGISTRATION = ABSENT
AQ_PREBUILT_PACKAGE_CACHE_IDENTITY = ABSENT
AR_STATIC_FILENAME_TRANSFORM = ESTABLISHED
AR_RELEASE_METADATA_FILENAME_TRANSFORM = ESTABLISHED
AR_APT_DISCOVERY_OF_PREMATERIALIZED_SNAPSHOT_INDEXES = NOT_ESTABLISHED
AR_APT_CONSUMPTION_OF_PREMATERIALIZED_SNAPSHOT_INDEXES = NOT_ESTABLISHED
AR_MATERIALIZATION_CONTRACT_QUALIFIED_FOR_AQ_ARGV = FALSE
APT_SIMULATION_ELIGIBLE_AFTER_AR = FALSE
```

Copying correctly named `Packages` or `InRelease` bytes into `/tmp/signthos-apt/lists/` would not, by itself, make them solver inputs under the frozen AQ argv. Claiming otherwise would infer an APT directory-scanning behavior that the exact source does not implement.

## 9. Fail-closed isolation requirements retained for the repair successor

Any repair successor must preserve these prohibitions:

```text
HOST_APT_LISTS = PROHIBITED
IMAGE_DEFAULT_APT_LISTS = PROHIBITED
LIVE_ARCHIVE_UBUNTU_COM = PROHIBITED
LIVE_SECURITY_UBUNTU_COM = PROHIBITED
UNCONSTRAINED_SNAPSHOT = PROHIBITED
UNBOUND_SOURCE_ENTRY = PROHIBITED
UNBOUND_LIST_FILE = PROHIBITED
UNBOUND_RELEASE_FILE = PROHIBITED
PATH_TRAVERSAL = PROHIBITED
DUPLICATE_TARGET_ID = PROHIBITED
DUPLICATE_FINAL_PATH = PROHIBITED
ARCHITECTURE_SUBSTITUTION = PROHIBITED
SUITE_SUBSTITUTION = PROHIBITED
COMPONENT_SUBSTITUTION = PROHIBITED
NETWORK_DURING_SIMULATION = PROHIBITED
```

A future source-discovery repair must bind the exact source descriptor or other APT-supported index-registration mechanism as data, keep network disabled for solver execution, and prove that every enumerated package index maps only to the twelve canonical 004C1AG identities.

## 10. Deterministic future materialization manifest schema

The static manifest schema is defined now so a later separately authorized materialization unit cannot silently broaden evidence:

```text
signthos.004c1ar.apt-list-materialization-manifest.v1 {
  canonicalBase
  ubuntuSnapshotId
  aptSourceCommit
  aptSourceTree
  aptVersion
  listRoot
  sourceDiscoveryContractSha256
  records[] {
    targetId
    objectRole
    suite
    component
    targetArchitecture
    sourceRelativePath
    sourceBytes
    sourceSha256
    canonicalTargetUri
    finalBasename
    outputCompression
    outputBytes
    outputSha256
    mode
    uid
    gid
  }
  rejectionChecks[]
  serialization
}
```

Serialization is UTF-8 JSON with `sort_keys=true`, separators `(',', ':')`, `ensure_ascii=false`, arrays preserved in the canonical order defined by the contract, and exactly one trailing LF. The manifest SHA-256 is computed over those exact bytes. A later run must record both the manifest byte length and SHA-256.

For package records:

```text
objectRole = Packages
outputCompression = uncompressed
mode = 0644
uid = 0
gid = 0
```

For release records, a repair successor must decide whether the selected APT-supported source-discovery mechanism requires the three exact `InRelease` files to be materialized. 004C1AR establishes their role and candidate names but does not authorize or perform their placement.

The field `sourceDiscoveryContractSha256` is intentionally unresolved in this grain. A manifest with an empty, omitted, placeholder, or unqualified value is nonqualifying.

## 11. Qualification result

004C1AR closes the static list-naming and transform questions but fails closed on the central consumption prerequisite.

```text
APT_2_4_13_STATIC_SOURCE_IDENTITY = PASS
CANONICAL_SNAPSHOT_IDENTITY_BINDING = PASS
PACKAGES_TARGET_NAMING_RULE = PASS
INRELEASE_TARGET_NAMING_RULE = PASS
STATIC_DECOMPRESSION_AND_HASH_ACCOUNTING_CONTRACT = PASS
FAIL_CLOSED_ISOLATION_RULES = PASS
DETERMINISTIC_MANIFEST_SCHEMA = PASS
AQ_SOURCE_DISCOVERY_COMPATIBILITY = FAIL
AQ_PREMATERIALIZED_LIST_CONSUMPTION = NOT_QUALIFIED
APT_SNAPSHOT_LIST_MATERIALIZATION = 0
APT_GET_EXECUTION = 0
APT_CACHE_EXECUTION = 0
DPKG_EXECUTION = 0
APT_SIMULATION_EXECUTION = 0
PACKAGE_DOWNLOAD_INSTALL_UNPACK_CONFIGURE = 0
```

The failure is contractual, not a runtime failure: exact APT source inspection shows that the frozen AQ argv does not enumerate the canonical snapshot as a source and does not register its package indexes as volatile inputs.

## 12. Required successor boundary

004C1AR does not authorize its own repair. The next repository unit must be separately authorized through Issue #7 reconciliation and should be limited to an APT source-discovery/static-argv repair qualification. A qualifying successor must choose and bind exactly one APT-supported mechanism that causes the twelve canonical package indexes to be enumerated without live-network dependence, then derive a repaired static argv/configuration identity before any list materialization or solver execution is considered.

Until that successor is canonical and all later execution gates are separately satisfied:

```text
APT_SNAPSHOT_LIST_MATERIALIZATION = NOT_AUTHORIZED
WRITABLE_APT_STATE_PREPARATION = NOT_AUTHORIZED
APT_SIMULATION_EXECUTION = NOT_AUTHORIZED
APT_GET_EXECUTION = NOT_AUTHORIZED
APT_CACHE_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```
