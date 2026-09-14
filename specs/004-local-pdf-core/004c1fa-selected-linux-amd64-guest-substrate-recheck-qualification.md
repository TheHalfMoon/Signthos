# 004C1FA Selected linux/amd64 Guest Substrate Recheck Qualification
Status: `QUALIFICATION_CANDIDATE / CLEAN_PREFLIGHT_FINAL_REPAIR_PAIR_PASS / FROZEN`
Issue: #7
Authority: `github:issue-comment:5657279873`

## Authority boundary

```text
CANONICAL_BASE = 4988f1271c87333c687d399cc58f67e51a74d43e
CANONICAL_BASE_TREE = 2c719588833d1ad862fe1d6b6420b680497a3576
SELECTED_IMAGE = docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
TARGET_PLATFORM = linux/amd64
NETWORK_MODE = none
PROJECT_OR_REPOSITORY_MOUNTS = 0
ACTUAL_FRESH_REPAIR_REPLAYS = 2
MAX_FRESH_REPAIR_REPLAYS = 2
AUTHORIZED_PATH = specs/004-local-pdf-core/004c1fa-selected-linux-amd64-guest-substrate-recheck-qualification.md
MAX_CHANGED_FILES = 1
```

PR #234 and every earlier 004C1FA candidate and evidence root remain permanently nonqualifying and immutable.

## Clean isolated preflight

The final repair used a fresh isolated detached worktree exactly pinned to canonical main. The exact preflight status contains only branch metadata and no tracked, untracked, deleted, modified, or staged entry. The same byte-identical status was captured again after both replays.

### `canonical-main.txt`

```text
BYTE_LENGTH = 92
SHA256 = fc2e6e92dcf3ab91c57ddbab2cad135b5efa919689680a499a53620024c24be3
```

```text
HEAD=4988f1271c87333c687d399cc58f67e51a74d43e
TREE=2c719588833d1ad862fe1d6b6420b680497a3576
```

### `isolated-worktree-status.txt`

```text
BYTE_LENGTH = 79
SHA256 = e3a3eb00f02c903c95a16cbff2966d9a13f2eb6e88d30c4e6ceeb6f254383bd8
```

```text
# branch.oid 4988f1271c87333c687d399cc58f67e51a74d43e
# branch.head (detached)
```

### `post-replay-isolated-worktree-status.txt`

```text
BYTE_LENGTH = 79
SHA256 = e3a3eb00f02c903c95a16cbff2966d9a13f2eb6e88d30c4e6ceeb6f254383bd8
```

```text
# branch.oid 4988f1271c87333c687d399cc58f67e51a74d43e
# branch.head (detached)
```

## Open-pull-request preflight

### `open-pr-query.txt`

```text
BYTE_LENGTH = 62
SHA256 = 7e743136793d1b42f0c64d5db4eeb999b23e7ab725a8eaaf5ef16c7b4a098c92
```

```text
GET /repos/TheHalfMoon/Signthos/pulls?state=open&per_page=100
```

### `open-pr-capture-time.txt`

```text
BYTE_LENGTH = 33
SHA256 = 2bef848defb328871b0f1475154f47e0f1dfedd02d49eebe7a6844a6a84091bb
```

```text
CAPTURE_UTC=2026-09-14T00:13:31Z
```

The exact `gh api --include` response is encoded below as base64 so its original line endings and separator bytes are independently reconstructable rather than inferred from Markdown.

### `open-pr-response.http`

```text
BYTE_LENGTH = 1414
SHA256 = 4efd175c35de039cd5bece06419876c016ecbd214b9a26e7932ebcd4d4bf7e6c
ENCODING = base64(RAW_BYTES)
```

```base64
SFRUUC8yLjAgMjAwIE9LCkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbjogKg0KQWNjZXNzLUNvbnRyb2wtRXhwb3NlLUhlYWRlcnM6IEVUYWcsIExpbmssIExvY2F0aW9uLCBSZXRyeS1BZnRlciwgWC1HaXRIdWItT1RQLCBYLVJhdGVMaW1pdC1MaW1pdCwgWC1SYXRlTGltaXQtUmVtYWluaW5nLCBYLVJhdGVMaW1pdC1Vc2VkLCBYLVJhdGVMaW1pdC1SZXNvdXJjZSwgWC1SYXRlTGltaXQtUmVzZXQsIFgtT0F1dGgtU2NvcGVzLCBYLUFjY2VwdGVkLU9BdXRoLVNjb3BlcywgWC1Qb2xsLUludGVydmFsLCBYLUdpdEh1Yi1NZWRpYS1UeXBlLCBYLUdpdEh1Yi1TU08sIFgtR2l0SHViLVJlcXVlc3QtSWQsIERlcHJlY2F0aW9uLCBTdW5zZXQsIFdhcm5pbmcNCkNhY2hlLUNvbnRyb2w6IHByaXZhdGUsIG1heC1hZ2U9NjAsIHMtbWF4YWdlPTYwDQpDb250ZW50LUxlbmd0aDogMg0KQ29udGVudC1TZWN1cml0eS1Qb2xpY3k6IGRlZmF1bHQtc3JjICdub25lJw0KQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04DQpEYXRlOiBNb24sIDE0IFNlcCAyMDI2IDAwOjEzOjMyIEdNVA0KRXRhZzogIjU3NzQ5NmZkMDVlNjA5ZjQ3M2YyODA3ODhjNWMxY2M2YmEwZDI1OGY2YzFjMWRlM2E0MmM3NzAyYjViMWYyNjMiDQpSZWZlcnJlci1Qb2xpY3k6IG9yaWdpbi13aGVuLWNyb3NzLW9yaWdpbiwgc3RyaWN0LW9yaWdpbi13aGVuLWNyb3NzLW9yaWdpbg0KU2VydmVyOiBnaXRodWIuY29tDQpTdHJpY3QtVHJhbnNwb3J0LVNlY3VyaXR5OiBtYXgtYWdlPTMxNTM2MDAwOyBpbmNsdWRlU3ViZG9tYWluczsgcHJlbG9hZA0KVmFyeTogQWNjZXB0LCBBdXRob3JpemF0aW9uLCBDb29raWUsIFgtR2l0SHViLU9UUCxBY2NlcHQtRW5jb2RpbmcsIEFjY2VwdCwgWC1SZXF1ZXN0ZWQtV2l0aA0KWC1BY2NlcHRlZC1PYXV0aC1TY29wZXM6IA0KWC1Db250ZW50LVR5cGUtT3B0aW9uczogbm9zbmlmZg0KWC1GcmFtZS1PcHRpb25zOiBkZW55DQpYLUdpdGh1Yi1BcGktVmVyc2lvbi1TZWxlY3RlZDogMjAyMi0xMS0yOA0KWC1HaXRodWItRWRnZS1SZWdpb246IHVhZW5vcnRoDQpYLUdpdGh1Yi1NZWRpYS1UeXBlOiBnaXRodWIudjM7IGZvcm1hdD1qc29uDQpYLUdpdGh1Yi1SZXF1ZXN0LUlkOiBGMDgwOjkwREEwOkYxQjEwMjoxNTI0RTRGOjZBQTczQzJDDQpYLU9hdXRoLUNsaWVudC1JZDogMTc4YzZmYzc3OGNjYzY4ZTFkNmENClgtT2F1dGgtU2NvcGVzOiBnaXN0LCByZWFkOm9yZywgcmVwbywgd29ya2Zsb3cNClgtUmF0ZWxpbWl0LUxpbWl0OiA1MDAwDQpYLVJhdGVsaW1pdC1SZW1haW5pbmc6IDQ5OTkNClgtUmF0ZWxpbWl0LVJlc2V0OiAxNzg5MzQ4NDEyDQpYLVJhdGVsaW1pdC1SZXNvdXJjZTogY29yZQ0KWC1SYXRlbGltaXQtVXNlZDogMQ0KWC1Yc3MtUHJvdGVjdGlvbjogMA0KDQpbXQ==
```

Decoded response terminates in the JSON body `[]`, establishing zero open pull requests at preflight.

## Selected immutable image

### `selected-image.txt`

```text
BYTE_LENGTH = 99
SHA256 = 44b3f90078f7a98afe2fa315c562d1d628a6d4bb24a15a72c0d197fd0d430c5a
```

```text
docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3
```

### `selected-image-inspect.json`

```text
BYTE_LENGTH = 2572
SHA256 = c56877cbdd96c5caa04b4f2b8613e1ed01f65771c9ba3d11645b9d9dc1e2f4a7
```

```json
[
    {
        "Id": "sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3",
        "RepoTags": [
            "emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3"
        ],
        "RepoDigests": [
            "emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3"
        ],
        "Comment": "buildkit.dockerfile.v0",
        "Created": "2024-10-25T02:01:37.555008906Z",
        "Config": {
            "Env": [
                "PATH=/emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "EMSDK=/emsdk"
            ],
            "Entrypoint": [
                "/emsdk/docker/entrypoint.sh"
            ],
            "WorkingDir": "/src",
            "Labels": {
                "maintainer": "kontakt@trzeci.eu",
                "org.label-schema.description": "The official container with Emscripten SDK",
                "org.label-schema.docker.dockerfile": "/docker/Dockerfile",
                "org.label-schema.name": "emscripten",
                "org.label-schema.url": "https://emscripten.org",
                "org.label-schema.vcs-url": "https://github.com/emscripten-core/emsdk",
                "org.opencontainers.image.ref.name": "ubuntu",
                "org.opencontainers.image.version": "22.04"
            }
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 720592460,
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:2573e0d8158209ed54ab25c87bcdcb00bd3d2539246960a3d592a1c599d70465",
                "sha256:cda677916487ddbbb6e47b65bf860d988cfcd69d53f32260b55cec6f2c4e5086",
                "sha256:a89cd2ce10250e9e4ff6955c798ff27a1051eacd4b443bc81051a38e779a7733",
                "sha256:af363988ef20e590c4995923f6566ca5012887bc8c42d9c64cab1e55b58eabe9",
                "sha256:fdfce864fd5f062670cc90a37f9eea85b13ecc4d9fa7caf940f8a27d1dfa413c"
            ]
        },
        "Metadata": {
            "LastTagTime": "2026-09-13T19:36:06.35612643Z"
        },
        "Descriptor": {
            "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
            "digest": "sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3",
            "size": 1369
        },
        "Identity": {
            "Pull": [
                {
                    "Repository": "docker.io/emscripten/emsdk"
                }
            ]
        }
    }
]
```

## Exact replay commands

### `replay-A.command.txt`

```text
BYTE_LENGTH = 526
SHA256 = 96a310a8349b0e6a886f55fbdfad62c2d96ad05c033a8113edd875fd93b8dcba
```

```shell
docker run --name signthos-004c1fa-final-a-20260914t001330z --platform linux/amd64 --network none docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3 sh -lc printf\ \"GUEST_KERNEL=%s\\\\n\"\ \"\$\(uname\ -r\)\"\;\ printf\ \"GUEST_MACHINE=%s\\\\n\"\ \"\$\(uname\ -m\)\"\;\ printf\ \"GUEST_LIBC=%s\\\\n\"\ \"\$\(ldd\ --version\ 2\>\&1\ \|\ head\ -n1\)\"\;\ if\ \[\ -e\ /proc/sys/fs/binfmt_misc/rosetta\ \]\;\ then\ echo\ ROSETTA_VISIBLE=YES\;\ else\ echo\ ROSETTA_VISIBLE=NO\;\ fi
```

### `replay-B.command.txt`

```text
BYTE_LENGTH = 526
SHA256 = 12416ace2c7e1ffd36d6601d0fc2e902fe7970dbfea69b35d093c04e3fd1ce09
```

```shell
docker run --name signthos-004c1fa-final-b-20260914t001330z --platform linux/amd64 --network none docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3 sh -lc printf\ \"GUEST_KERNEL=%s\\\\n\"\ \"\$\(uname\ -r\)\"\;\ printf\ \"GUEST_MACHINE=%s\\\\n\"\ \"\$\(uname\ -m\)\"\;\ printf\ \"GUEST_LIBC=%s\\\\n\"\ \"\$\(ldd\ --version\ 2\>\&1\ \|\ head\ -n1\)\"\;\ if\ \[\ -e\ /proc/sys/fs/binfmt_misc/rosetta\ \]\;\ then\ echo\ ROSETTA_VISIBLE=YES\;\ else\ echo\ ROSETTA_VISIBLE=NO\;\ fi
```

The commands contain no mount option and explicitly select `linux/amd64`, `--network none`, and the immutable selected-image digest.

## Replay A gate

### `replay-A-start-time.txt`

```text
BYTE_LENGTH = 66
SHA256 = fbbff09f8034d17775075070b6078c06f23206121b4dd1380b78cfb22d2189f2
```

```text
EPOCH_NS=1789344814627281000
UTC=2026-09-14T00:13:34.627281+00:00
```

### `replay-A.stdout.txt`

```text
BYTE_LENGTH = 120
SHA256 = 0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9
```

```text
GUEST_KERNEL=7.0.12-linuxkit
GUEST_MACHINE=x86_64
GUEST_LIBC=ldd (Ubuntu GLIBC 2.35-0ubuntu3.8) 2.35
ROSETTA_VISIBLE=NO
```

### `replay-A.stderr.txt`

```text
BYTE_LENGTH = 0
SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

```text

```

### `replay-A.exit.txt`

```text
BYTE_LENGTH = 2
SHA256 = 9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa
```

```text
0
```

### `replay-A.container-inspect.json`

```text
BYTE_LENGTH = 7913
SHA256 = daefffa4a20ee3334a02df854b5135f7dfd794087633451fc3af524c902bab8c
```

```json
[
    {
        "Id": "e39e5bce3eb4b09fd8057bae797b9e223b0fd07ccc38ab4b304d078d67a83a05",
        "Created": "2026-09-14T00:13:34.670341Z",
        "Path": "/emsdk/docker/entrypoint.sh",
        "Args": [
            "sh",
            "-lc",
            "printf \"GUEST_KERNEL=%s\\\\n\" \"$(uname -r)\"; printf \"GUEST_MACHINE=%s\\\\n\" \"$(uname -m)\"; printf \"GUEST_LIBC=%s\\\\n\" \"$(ldd --version 2\u003e\u00261 | head -n1)\"; if [ -e /proc/sys/fs/binfmt_misc/rosetta ]; then echo ROSETTA_VISIBLE=YES; else echo ROSETTA_VISIBLE=NO; fi"
        ],
        "State": {
            "Status": "exited",
            "Running": false,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 0,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2026-09-14T00:13:34.721113875Z",
            "FinishedAt": "2026-09-14T00:13:35.22664675Z"
        },
        "Image": "sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3",
        "ResolvConfPath": "/var/lib/docker/containers/e39e5bce3eb4b09fd8057bae797b9e223b0fd07ccc38ab4b304d078d67a83a05/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/e39e5bce3eb4b09fd8057bae797b9e223b0fd07ccc38ab4b304d078d67a83a05/hostname",
        "HostsPath": "/var/lib/docker/containers/e39e5bce3eb4b09fd8057bae797b9e223b0fd07ccc38ab4b304d078d67a83a05/hosts",
        "LogPath": "/var/lib/docker/containers/e39e5bce3eb4b09fd8057bae797b9e223b0fd07ccc38ab4b304d078d67a83a05/e39e5bce3eb4b09fd8057bae797b9e223b0fd07ccc38ab4b304d078d67a83a05-json.log",
        "Name": "/signthos-004c1fa-final-a-20260914t001330z",
        "RestartCount": 0,
        "Driver": "overlayfs",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "none",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                0,
                0
            ],
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "private",
            "Dns": null,
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": [],
            "BlkioDeviceWriteBps": [],
            "BlkioDeviceReadIOps": [],
            "BlkioDeviceWriteIOps": [],
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": null,
            "PidsLimit": null,
            "Ulimits": [],
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/acpi",
                "/proc/asound",
                "/proc/interrupts",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/sys/devices/virtual/powercap",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "Storage": {
            "RootFS": {
                "Snapshot": {
                    "Name": "overlayfs"
                }
            }
        },
        "Mounts": [],
        "Config": {
            "Hostname": "e39e5bce3eb4",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": true,
            "AttachStderr": true,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "EMSDK=/emsdk"
            ],
            "Cmd": [
                "sh",
                "-lc",
                "printf \"GUEST_KERNEL=%s\\\\n\" \"$(uname -r)\"; printf \"GUEST_MACHINE=%s\\\\n\" \"$(uname -m)\"; printf \"GUEST_LIBC=%s\\\\n\" \"$(ldd --version 2\u003e\u00261 | head -n1)\"; if [ -e /proc/sys/fs/binfmt_misc/rosetta ]; then echo ROSETTA_VISIBLE=YES; else echo ROSETTA_VISIBLE=NO; fi"
            ],
            "Image": "docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3",
            "Volumes": null,
            "WorkingDir": "/src",
            "Entrypoint": [
                "/emsdk/docker/entrypoint.sh"
            ],
            "Labels": {
                "maintainer": "kontakt@trzeci.eu",
                "org.label-schema.description": "The official container with Emscripten SDK",
                "org.label-schema.docker.dockerfile": "/docker/Dockerfile",
                "org.label-schema.name": "emscripten",
                "org.label-schema.url": "https://emscripten.org",
                "org.label-schema.vcs-url": "https://github.com/emscripten-core/emsdk",
                "org.opencontainers.image.ref.name": "ubuntu",
                "org.opencontainers.image.version": "22.04"
            }
        },
        "NetworkSettings": {
            "SandboxID": "",
            "SandboxKey": "",
            "Ports": {},
            "Networks": {
                "none": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "DriverOpts": null,
                    "GwPriority": 0,
                    "NetworkID": "d83cf9d60f78e84b096b24a0fa8b0ffb6a9743e467046f8c879fd65a5559016f",
                    "EndpointID": "",
                    "Gateway": "",
                    "IPAddress": "",
                    "MacAddress": "",
                    "IPPrefixLen": 0,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DNSNames": null
                }
            }
        },
        "ImageManifestDescriptor": {
            "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
            "digest": "sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3",
            "size": 1369,
            "platform": {
                "architecture": "amd64",
                "os": "linux"
            }
        }
    }
]
```

### `replay-A-gate-manifest.sha256`

```text
BYTE_LENGTH = 441
SHA256 = 1fba56e8ee5ce591a7dc9264eaeb6f66022b4f50c804599fcd4e799cc5d8620b
```

```text
96a310a8349b0e6a886f55fbdfad62c2d96ad05c033a8113edd875fd93b8dcba  replay-A.command.txt
0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9  replay-A.stdout.txt
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  replay-A.stderr.txt
9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa  replay-A.exit.txt
daefffa4a20ee3334a02df854b5135f7dfd794087633451fc3af524c902bab8c  replay-A.container-inspect.json
```

### `replay-A-gate-time.txt`

```text
BYTE_LENGTH = 66
SHA256 = ee543de2b41ca71ac5a04f0e0d15ac2b153719ab63bb2b0b23109c30d42df98a
```

```text
EPOCH_NS=1789344815603571000
UTC=2026-09-14T00:13:35.603571+00:00
```

The Replay A gate was frozen only after exit `0`, `GUEST_MACHINE=x86_64`, GLIBC 2.35, and `ROSETTA_VISIBLE=NO` were verified.

## Replay B and deterministic equality

### `replay-B-start-time.txt`

```text
BYTE_LENGTH = 66
SHA256 = 1a1ddefb8436fdb6ebb7fc2f3c04a112b5b9af5cfc17c1adc8846a5b916c3042
```

```text
EPOCH_NS=1789344815637649000
UTC=2026-09-14T00:13:35.637649+00:00
```

### `replay-B.stdout.txt`

```text
BYTE_LENGTH = 120
SHA256 = 0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9
```

```text
GUEST_KERNEL=7.0.12-linuxkit
GUEST_MACHINE=x86_64
GUEST_LIBC=ldd (Ubuntu GLIBC 2.35-0ubuntu3.8) 2.35
ROSETTA_VISIBLE=NO
```

### `replay-B.stderr.txt`

```text
BYTE_LENGTH = 0
SHA256 = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

```text

```

### `replay-B.exit.txt`

```text
BYTE_LENGTH = 2
SHA256 = 9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa
```

```text
0
```

### `replay-B.container-inspect.json`

```text
BYTE_LENGTH = 7917
SHA256 = c854458c5a8662eff95a4ee352ec73ce662d24ca3692e261842a2b89a00afd85
```

```json
[
    {
        "Id": "4c50dfcc8d6f6a6b7d73e620192f0169b83bef6e87694b4f53cc64431e6b18f7",
        "Created": "2026-09-14T00:13:35.668039375Z",
        "Path": "/emsdk/docker/entrypoint.sh",
        "Args": [
            "sh",
            "-lc",
            "printf \"GUEST_KERNEL=%s\\\\n\" \"$(uname -r)\"; printf \"GUEST_MACHINE=%s\\\\n\" \"$(uname -m)\"; printf \"GUEST_LIBC=%s\\\\n\" \"$(ldd --version 2\u003e\u00261 | head -n1)\"; if [ -e /proc/sys/fs/binfmt_misc/rosetta ]; then echo ROSETTA_VISIBLE=YES; else echo ROSETTA_VISIBLE=NO; fi"
        ],
        "State": {
            "Status": "exited",
            "Running": false,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 0,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2026-09-14T00:13:35.704944417Z",
            "FinishedAt": "2026-09-14T00:13:36.164750251Z"
        },
        "Image": "sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3",
        "ResolvConfPath": "/var/lib/docker/containers/4c50dfcc8d6f6a6b7d73e620192f0169b83bef6e87694b4f53cc64431e6b18f7/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/4c50dfcc8d6f6a6b7d73e620192f0169b83bef6e87694b4f53cc64431e6b18f7/hostname",
        "HostsPath": "/var/lib/docker/containers/4c50dfcc8d6f6a6b7d73e620192f0169b83bef6e87694b4f53cc64431e6b18f7/hosts",
        "LogPath": "/var/lib/docker/containers/4c50dfcc8d6f6a6b7d73e620192f0169b83bef6e87694b4f53cc64431e6b18f7/4c50dfcc8d6f6a6b7d73e620192f0169b83bef6e87694b4f53cc64431e6b18f7-json.log",
        "Name": "/signthos-004c1fa-final-b-20260914t001330z",
        "RestartCount": 0,
        "Driver": "overlayfs",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "none",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                0,
                0
            ],
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "private",
            "Dns": null,
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": [],
            "BlkioDeviceWriteBps": [],
            "BlkioDeviceReadIOps": [],
            "BlkioDeviceWriteIOps": [],
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": null,
            "PidsLimit": null,
            "Ulimits": [],
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/acpi",
                "/proc/asound",
                "/proc/interrupts",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/sys/devices/virtual/powercap",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "Storage": {
            "RootFS": {
                "Snapshot": {
                    "Name": "overlayfs"
                }
            }
        },
        "Mounts": [],
        "Config": {
            "Hostname": "4c50dfcc8d6f",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": true,
            "AttachStderr": true,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/emsdk:/emsdk/upstream/emscripten:/emsdk/node/20.18.0_64bit/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "EMSDK=/emsdk"
            ],
            "Cmd": [
                "sh",
                "-lc",
                "printf \"GUEST_KERNEL=%s\\\\n\" \"$(uname -r)\"; printf \"GUEST_MACHINE=%s\\\\n\" \"$(uname -m)\"; printf \"GUEST_LIBC=%s\\\\n\" \"$(ldd --version 2\u003e\u00261 | head -n1)\"; if [ -e /proc/sys/fs/binfmt_misc/rosetta ]; then echo ROSETTA_VISIBLE=YES; else echo ROSETTA_VISIBLE=NO; fi"
            ],
            "Image": "docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3",
            "Volumes": null,
            "WorkingDir": "/src",
            "Entrypoint": [
                "/emsdk/docker/entrypoint.sh"
            ],
            "Labels": {
                "maintainer": "kontakt@trzeci.eu",
                "org.label-schema.description": "The official container with Emscripten SDK",
                "org.label-schema.docker.dockerfile": "/docker/Dockerfile",
                "org.label-schema.name": "emscripten",
                "org.label-schema.url": "https://emscripten.org",
                "org.label-schema.vcs-url": "https://github.com/emscripten-core/emsdk",
                "org.opencontainers.image.ref.name": "ubuntu",
                "org.opencontainers.image.version": "22.04"
            }
        },
        "NetworkSettings": {
            "SandboxID": "",
            "SandboxKey": "",
            "Ports": {},
            "Networks": {
                "none": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "DriverOpts": null,
                    "GwPriority": 0,
                    "NetworkID": "d83cf9d60f78e84b096b24a0fa8b0ffb6a9743e467046f8c879fd65a5559016f",
                    "EndpointID": "",
                    "Gateway": "",
                    "IPAddress": "",
                    "MacAddress": "",
                    "IPPrefixLen": 0,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DNSNames": null
                }
            }
        },
        "ImageManifestDescriptor": {
            "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
            "digest": "sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3",
            "size": 1369,
            "platform": {
                "architecture": "amd64",
                "os": "linux"
            }
        }
    }
]
```

### `replay-equality.exit.txt`

```text
BYTE_LENGTH = 2
SHA256 = 9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa
```

```text
0
```

Replay A and Replay B stdout bytes are identical. Both stderr objects are empty and both exits are `0`.

## High-resolution lifecycle ordering and execution envelope

### `docker-lifecycle-order.txt`

```text
BYTE_LENGTH = 367
SHA256 = 746d841e24f2261ab8575989aa24aa3f258ae746a7219ceef9d83a70e7d1a81c
```

```text
A_CREATED=2026-09-14T00:13:34.670341Z
A_STARTED=2026-09-14T00:13:34.721113875Z
A_FINISHED=2026-09-14T00:13:35.22664675Z
B_CREATED=2026-09-14T00:13:35.668039375Z
B_STARTED=2026-09-14T00:13:35.704944417Z
B_FINISHED=2026-09-14T00:13:36.164750251Z
A_NETWORK_MODE=none
B_NETWORK_MODE=none
A_BINDS=None
B_BINDS=None
A_MOUNTS=[]
B_MOUNTS=[]
A_FINISHED_BEFORE_B_CREATED=PASS
```

The frozen container objects independently establish the same execution envelope: `NetworkMode=none`, `Binds=null`, `Mounts=[]`, immutable image digest, and no repository/project mount. Replay A `State.FinishedAt` precedes Replay B `Created` at nanosecond-resolution Docker timestamps.

## Frozen deterministic evidence manifest

```text
EVIDENCE_MANIFEST_TSV_SHA256 = 6a65a95372ce1fa9c49a861d0ccb23b967c63e56a9dd0ce5258b7e385bc6e647
```

```text
fc2e6e92dcf3ab91c57ddbab2cad135b5efa919689680a499a53620024c24be3	canonical-main.txt
746d841e24f2261ab8575989aa24aa3f258ae746a7219ceef9d83a70e7d1a81c	docker-lifecycle-order.txt
e3a3eb00f02c903c95a16cbff2966d9a13f2eb6e88d30c4e6ceeb6f254383bd8	isolated-worktree-status.txt
2bef848defb328871b0f1475154f47e0f1dfedd02d49eebe7a6844a6a84091bb	open-pr-capture-time.txt
7e743136793d1b42f0c64d5db4eeb999b23e7ab725a8eaaf5ef16c7b4a098c92	open-pr-query.txt
4efd175c35de039cd5bece06419876c016ecbd214b9a26e7932ebcd4d4bf7e6c	open-pr-response.http
e3a3eb00f02c903c95a16cbff2966d9a13f2eb6e88d30c4e6ceeb6f254383bd8	post-replay-isolated-worktree-status.txt
1fba56e8ee5ce591a7dc9264eaeb6f66022b4f50c804599fcd4e799cc5d8620b	replay-A-gate-manifest.sha256
ee543de2b41ca71ac5a04f0e0d15ac2b153719ab63bb2b0b23109c30d42df98a	replay-A-gate-time.txt
fbbff09f8034d17775075070b6078c06f23206121b4dd1380b78cfb22d2189f2	replay-A-start-time.txt
96a310a8349b0e6a886f55fbdfad62c2d96ad05c033a8113edd875fd93b8dcba	replay-A.command.txt
daefffa4a20ee3334a02df854b5135f7dfd794087633451fc3af524c902bab8c	replay-A.container-inspect.json
9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa	replay-A.exit.txt
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	replay-A.stderr.txt
0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9	replay-A.stdout.txt
1a1ddefb8436fdb6ebb7fc2f3c04a112b5b9af5cfc17c1adc8846a5b916c3042	replay-B-start-time.txt
12416ace2c7e1ffd36d6601d0fc2e902fe7970dbfea69b35d093c04e3fd1ce09	replay-B.command.txt
c854458c5a8662eff95a4ee352ec73ce662d24ca3692e261842a2b89a00afd85	replay-B.container-inspect.json
9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa	replay-B.exit.txt
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	replay-B.stderr.txt
0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9	replay-B.stdout.txt
9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa	replay-equality.exit.txt
c56877cbdd96c5caa04b4f2b8613e1ed01f65771c9ba3d11645b9d9dc1e2f4a7	selected-image-inspect.json
44b3f90078f7a98afe2fa315c562d1d628a6d4bb24a15a72c0d197fd0d430c5a	selected-image.txt
```
## Result

```text
004C1FA_CLEAN_PREFLIGHT_FINAL_REPAIR_PAIR = PASS_CANDIDATE
INDEPENDENT_SUBSTANTIVE_EXACT_HEAD_REVIEW = REQUIRED
MERGE_AUTHORITY = ABSENT_UNTIL_REVIEW_GATE
DEPENDENCY_MATERIALIZATION = NOT_AUTHORIZED
PACKAGE_MANAGER_EXECUTION = NOT_AUTHORIZED
PROJECT_RUNTIME = NOT_AUTHORIZED
SOURCE_IMPORT = NOT_AUTHORIZED
DISTRIBUTION = NOT_AUTHORIZED
004C2 = NOT_AUTHORIZED
004D = NOT_AUTHORIZED
SPECIFICATION_005 = NOT_AUTHORIZED
RELEASE = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PROJECT_COMPLETE = false
```

Any material review finding requires fail-closed forward-only reconciliation. Only a fresh independent substantive exact-head review with no material findings may permit premerge race proof and guarded normal merge with `expected_head_sha`. No successor authority is implied.
