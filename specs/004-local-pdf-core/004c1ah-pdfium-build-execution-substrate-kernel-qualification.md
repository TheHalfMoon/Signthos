# 004C1AH — PDFium Build Execution-Substrate Kernel Qualification

Status: `QUALIFICATION_CANDIDATE / BOUNDED_MEASURED_DOCKER_SUBSTRATE_AND_KERNEL_ONLY / ZERO_BUILDER_ACQUISITION`
Issue: #7
Owning specification: `004-local-pdf-core`
Canonical base: `6f20896ecd20b7c829db5449e3c664168421526c`
Canonical base tree: `4261c692df3faf92e1926afd6f39b63e30032ba4`
Authority source: `github:issue-comment:5607860381`

## 1. Purpose and exact authority

Canonical 004C1AG closed exact Ubuntu/Jammy package metadata identity but deliberately left Chromium's `uname -r`-derived pinned `linux-libc-dev` branch unresolved until the future PDFium builder execution substrate is measured. This grain binds only that substrate/kernel predicate. It does not acquire the selected Emscripten image, Ubuntu package archives, source/toolchain bytes, or execute any build/runtime provider.

```text
004C1AH_AUTHORITY = BOUNDED_MEASURED_DOCKER_SUBSTRATE_AND_KERNEL_QUALIFICATION_ONLY
004C1AH_ALLOWED_REPOSITORY_PATH = specs/004-local-pdf-core/004c1ah-pdfium-build-execution-substrate-kernel-qualification.md
004C1AH_MAX_CHANGED_REPOSITORY_FILES = 1
DOCKER_VERSION_INFO_READ = AUTHORIZED
DOCKER_SERVER_INFO_READ = AUTHORIZED
LOCAL_IMAGE_METADATA_INSPECTION = AUTHORIZED_READ_ONLY
BOUNDED_LOCAL_SUBSTRATE_PROBE = AUTHORIZED_ONLY_WITH_PULL_NEVER
BOUNDED_LOCAL_SUBSTRATE_PROBE_NETWORK = NONE
BOUNDED_LOCAL_SUBSTRATE_PROBE_FILESYSTEM = READ_ONLY
BOUNDED_LOCAL_SUBSTRATE_PROBE_CAPABILITIES = DROP_ALL
BOUNDED_LOCAL_SUBSTRATE_PROBE_NO_NEW_PRIVILEGES = REQUIRED
BOUNDED_LOCAL_SUBSTRATE_PROBE_PLATFORM = linux/amd64
DOCKER_IMAGE_PULL = NOT_AUTHORIZED
DOCKER_IMAGE_BUILD = NOT_AUTHORIZED
SELECTED_EMSDK_IMAGE_ACQUISITION = NOT_AUTHORIZED
CONTAINER_NETWORK_ACCESS = NOT_AUTHORIZED
HOST_OR_REPOSITORY_MOUNT = NOT_AUTHORIZED
APT_OR_DPKG_EXECUTION = NOT_AUTHORIZED
PACKAGE_ARCHIVE_ACQUISITION = NOT_AUTHORIZED
PACKAGE_INSTALLATION = NOT_AUTHORIZED
NODE_OR_TOOLCHAIN_EXECUTION = NOT_AUTHORIZED
GCLIENT_GN_NINJA_OR_PDFIUM_BUILD_EXECUTION = NOT_AUTHORIZED
PROVIDER_OR_PDF_RUNTIME_EXECUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

## 2. Canonical predecessor constraint

004C1AG records:

```text
RODETE_PINNED_LINUX_LIBC_WORKAROUND = NOT_ESTABLISHED_UNTIL_EXECUTION_SUBSTRATE_QUALIFICATION
```

The exact Chromium predicate at canonical `CHROMIUM_BUILD_REVISION = 06d247cb917bb5fac3103b1b7dccb75368a553ce` is:

```python
name.startswith('6.12.') and name.endswith('rodete1-amd64')
```

If true, Chromium appends:

```text
linux-libc-dev=5.8.14-1
```

004C1AH must therefore evaluate this exact predicate from the measured guest kernel release rather than infer it from Ubuntu/Jammy metadata.

## 3. Prior 004C1ABP substrate is not generalized

Canonical `004c1abp-platform-atomic-lockfile-qualification.md` measured a prior Docker Desktop route but explicitly limited it to `004C1AB resolver evidence only` and required requalification after material Docker/substrate change.

The prior record included:

```text
PRIOR_DOCKER_SERVER_KERNEL = 6.12.76-linuxkit
PRIOR_EFFECTIVE_GUEST_ARCH = x86_64
PRIOR_EFFECTIVE_GUEST_LIBC = glibc 2.36
PRIOR_TRANSLATION_OBSERVATION = /run/rosetta/rosetta
```

The current Docker server is materially different. No prior kernel or Rosetta observation is reused as current PDFium-builder evidence.

## 4. Fresh physical-host and Docker server measurement

Fresh read-only platform observations produced:

```text
PHYSICAL_HOST_OS = macOS 26.6.2
PHYSICAL_HOST_BUILD = 25G83
PHYSICAL_HOST_ARCH = arm64
DOCKER_CLIENT_VERSION = 29.5.1
DOCKER_CLIENT_OS = darwin
DOCKER_CLIENT_ARCH = arm64
DOCKER_SERVER_VERSION = 29.7.2
DOCKER_SERVER_OS = linux
DOCKER_SERVER_ARCH = arm64
DOCKER_SERVER_OPERATING_SYSTEM = Docker Desktop
DOCKER_SERVER_NAME = docker-desktop
DOCKER_SERVER_KERNEL = 7.0.12-linuxkit
DOCKER_SERVER_SECURITY_OPTIONS = [seccomp builtin, cgroupns]
```

The server kernel differs from the prior 004C1ABP kernel. This independently confirms that stale substrate evidence could not be reused.

## 5. Exact local probe-image availability

Authority allowed only the preexisting canonical 004C1ABP Debian reference, with no pull:

```text
PROBE_REPOSITORY_DIGEST = debian@sha256:88200866dfff7ea7f5cbcb6ec7c8a701889efe6fe859fe64d6990e4b07ea4171
```

Local image metadata inspection established that both platform variants are already present in the local Docker content store under that exact repository digest:

```text
LOCAL_LINUX_AMD64_VARIANT = PRESENT
LOCAL_LINUX_AMD64_IMAGE_ID = sha256:5ae3c39ebd15e229dcedd5cee596b2497182493d41ff162e824ba13fc1b2b867
LOCAL_LINUX_ARM64_VARIANT = PRESENT
LOCAL_LINUX_ARM64_IMAGE_ID = sha256:6bd27d44e6c32a66bbd72d7cb2b76a8ae3497ec2e5274a81abd1b37f6013fa1f
DOCKER_IMAGE_PULL = 0
```

A non-platform-qualified `docker image inspect` observation initially displayed the arm64 variant because the physical Docker server is arm64. The qualification does not use that default as the linux/amd64 probe identity. The explicit `--platform linux/amd64` local inspection binds the amd64 image ID above.

## 6. Bounded probe controls

Each probe used the exact local repository digest and the following hard controls:

```text
--pull=never
--platform linux/amd64
--network none
--read-only
--cap-drop ALL
--security-opt no-new-privileges
--pids-limit 64
--rm
HOST_MOUNTS = 0
REPOSITORY_MOUNTS = 0
NETWORK = NONE
IMAGE_PULL = PROHIBITED_BY_PULL_NEVER
```

The only probe outputs were:

```text
uname -r
uname -m
ldd --version first line
/run/rosetta/rosetta executable-presence test
```

No package manager, installer, Node runtime, compiler, build system, PDFium code, provider code, or repository file was executed inside the probe.

## 7. Fresh Probe A and Probe B

Probe A:

```text
GUEST_KERNEL = 7.0.12-linuxkit
GUEST_MACHINE = x86_64
GUEST_LIBC = ldd (Debian GLIBC 2.36-9+deb12u14) 2.36
ROSETTA_VISIBLE = NO
```

Probe B independently repeated the same bounded invocation:

```text
GUEST_KERNEL = 7.0.12-linuxkit
GUEST_MACHINE = x86_64
GUEST_LIBC = ldd (Debian GLIBC 2.36-9+deb12u14) 2.36
ROSETTA_VISIBLE = NO
PROBE_OUTPUT_EQUAL = PASS
```

## 8. Exact Chromium predicate evaluation

Measured input:

```text
name = 7.0.12-linuxkit
```

Exact predicate evaluation:

```text
name.startswith('6.12.') = FALSE
name.endswith('rodete1-amd64') = FALSE
CHROMIUM_REQUIRES_PINNED_LINUX_LIBC = FALSE
```

Therefore, for this exact measured Docker Desktop substrate only:

```text
RODETE_PINNED_LINUX_LIBC_WORKAROUND = FALSE_FOR_THIS_EXACT_MEASURED_SUBSTRATE
004C1AG_METADATA_CLOSURE_RODETE_BRANCH_COMPATIBILITY = PASS
```

This does not assert that all LinuxKit kernels, future Docker Desktop versions, native Linux hosts, CI workers, or other container runtimes have the same predicate result.

## 9. Architecture and translation disclosure

```text
PHYSICAL_HOST_ARCH = arm64
DOCKER_SERVER_ARCH = arm64
PROBE_IMAGE_PLATFORM = linux/amd64
EFFECTIVE_GUEST_MACHINE = x86_64
NATIVE_X86_64_HARDWARE_CLAIM = PROHIBITED
ROSETTA_VISIBLE_INSIDE_PROBE = NO
TRANSLATION_IMPLEMENTATION = NOT_ESTABLISHED_BY_004C1AH
```

The effective guest ABI is x86_64 on an arm64 physical/server substrate. 004C1AH does not infer the current translation implementation merely from the absence of `/run/rosetta/rosetta`; it records only that the path is not visible inside this bounded probe. No performance, native-hardware, or general platform-support conclusion is permitted.

## 10. Mandatory freshness gate for later provisioning

This qualification is valid only for the exact measured substrate facts above. Immediately before any separately authorized provisioning execution, the implementation must re-read at minimum:

```text
Docker server version
Docker server kernel
Docker server architecture
exact linux/amd64 probe-image identity
bounded guest uname -r
bounded guest uname -m
```

If any value changes materially, or if the exact guest kernel release satisfies Chromium's Rodete predicate, 004C1AH is stale and provisioning must fail closed pending fresh qualification and, if necessary, a corrected OS-package metadata closure.

## 11. Qualification result and remaining boundary

```text
004C1AH_RESULT = QUALIFIED_EXACT_MEASURED_EXECUTION_SUBSTRATE_KERNEL_PREDICATE
CURRENT_DOCKER_SERVER_KERNEL = 7.0.12-linuxkit
CURRENT_EFFECTIVE_GUEST_MACHINE = x86_64
CURRENT_GUEST_LIBC = glibc 2.36
CURRENT_RODETE_PREDICATE = FALSE
RODETE_PINNED_LINUX_LIBC_WORKAROUND = FALSE_FOR_THIS_EXACT_MEASURED_SUBSTRATE
SUBSTRATE_RECHECK_BEFORE_PROVISIONING = REQUIRED
BASE_IMAGE_FILESYSTEM_INVENTORY = NOT_ESTABLISHED
EFFECTIVE_PACKAGE_DOWNLOAD_SET = NOT_ESTABLISHED
EFFECTIVE_INSTALL_UPGRADE_REMOVE_TRANSACTION = NOT_ESTABLISHED
NODE_EXECUTABLE_BYTE_HASH = NOT_ESTABLISHED
GN_NINJA_CLANG_ACQUIRED_BYTE_IDENTITIES = NOT_ESTABLISHED
SELECTED_EMSDK_IMAGE_ACQUISITION = NOT_PERFORMED / NOT_AUTHORIZED
PACKAGE_ARCHIVE_ACQUISITION = NOT_PERFORMED / NOT_AUTHORIZED
PACKAGE_INSTALLATION = NOT_PERFORMED / NOT_AUTHORIZED
PDFIUM_BUILD_EXECUTION_AUTHORITY = ABSENT
PDFIUM_COMPONENT_NOTICE_COMPLETENESS = PARTIAL
DISTRIBUTION_ADOPTION_GATE = FAIL_CLOSED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
```

A fresh successor reconciliation must determine the smallest remaining prerequisite. 004C1AH itself does not authorize base-image layer acquisition, package-archive acquisition, provisioning, build/link execution, provider runtime, or downstream specification work.

## 12. Candidate acceptance gates

The candidate is eligible for canonical merge only if:

1. canonical base remains `6f20896ecd20b7c829db5449e3c664168421526c` / tree `4261c692df3faf92e1926afd6f39b63e30032ba4`;
2. exactly this one Signthos-authored qualification file changes;
3. current physical host and Docker server facts are recorded without substituting prior 004C1ABP measurements;
4. the exact prior Debian repository digest is already local and no image pull occurs;
5. the explicit linux/amd64 local image ID is recorded;
6. Probe A and B use `--pull=never`, network none, read-only filesystem, all capabilities dropped, no-new-privileges, no host/repository mounts, and the exact authorized output surface;
7. Probe A and B agree byte-for-byte on the four output records;
8. Chromium's exact Rodete predicate is evaluated only from the measured guest kernel release;
9. native-x86_64 hardware and current Rosetta-mechanism claims remain prohibited;
10. later provisioning requires a fresh substrate/kernel recheck;
11. no builder image, package archive, source/toolchain byte, generated build output, runtime/provider artifact, package manifest, lockfile, workflow, fixture, container definition, or database mutation enters the candidate;
12. exact-head Actions/check/provider state is accounted truthfully;
13. fresh independent substantive exact-head review reports no unresolved material finding;
14. any repair is forward-only and triggers fresh exact-head review;
15. unresolved material review threads are zero;
16. immediate premerge base/head/race proof passes;
17. guarded normal merge uses exact `expected_head_sha`;
18. mechanical post-merge SHA/tree/parent/signature/surface verification passes;
19. fresh Issue #7 successor reconciliation occurs before any additional acquisition or execution authority is inferred.
