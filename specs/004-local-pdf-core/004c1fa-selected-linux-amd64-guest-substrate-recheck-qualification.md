# 004C1FA Selected linux/amd64 Guest Substrate Recheck Qualification

Status: `QUALIFICATION_CANDIDATE / EVIDENCE_COMPLETE_REPAIR_PAIR_PASS / FROZEN`
Issue: #7
Authority: `github:issue-comment:5656911691`

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

PR #233 and every earlier 004C1FA candidate remain permanently nonqualifying.

## Preflight captured before Replay A

Exact query:
```text
GET /repos/TheHalfMoon/Signthos/pulls?state=open&per_page=100
```

Exact GitHub HTTP response, including GitHub server headers and the empty JSON body:
```http
HTTP/2.0 200 OK
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset, Warning
Cache-Control: private, max-age=60, s-maxage=60
Content-Length: 2
Content-Security-Policy: default-src 'none'
Content-Type: application/json; charset=utf-8
Date: Sun, 13 Sep 2026 23:16:08 GMT
Etag: "c522f7d8572759f3f587038e1d81def065ea8130c68343910f5bd314f3db49c4"
Referrer-Policy: origin-when-cross-origin, strict-origin-when-cross-origin
Server: github.com
Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
Vary: Accept, Authorization, Cookie, X-GitHub-OTP,Accept-Encoding, Accept, X-Requested-With
X-Accepted-Oauth-Scopes: 
X-Content-Type-Options: nosniff
X-Frame-Options: deny
X-Github-Api-Version-Selected: 2022-11-28
X-Github-Edge-Region: uaenorth
X-Github-Media-Type: github.v3; format=json
X-Github-Request-Id: EDF5:30A988:EDD39F:14CBF1D:6AA72EB8
X-Oauth-Client-Id: 178c6fc778ccc68e1d6a
X-Oauth-Scopes: gist, read:org, repo, workflow
X-Ratelimit-Limit: 5000
X-Ratelimit-Remaining: 4986
X-Ratelimit-Reset: 1789344504
X-Ratelimit-Resource: core
X-Ratelimit-Used: 14
X-Xss-Protection: 0

[]
```

```text
OPEN_PULL_REQUESTS_REQUIRED = []
OPEN_PULL_REQUESTS_AT_PREFLIGHT = []
OPEN_PR_RESPONSE_HTTP_SHA256 = 18b4be54a390c6056b62a4676ba6ab22796e32e096675b442d274fdb275caf4d
CANONICAL_MAIN_JSON_SHA256 = 1d836c9a42df49611fe32e4f7fa8e06f67dfa3490ac69da9033f1b1ca830b3bf
SELECTED_IMAGE_INSPECT_SHA256 = c56877cbdd96c5caa04b4f2b8613e1ed01f65771c9ba3d11645b9d9dc1e2f4a7
```

## Exact replay commands

Replay A:
```shell
docker run --name signthos-004c1fa-ec-a --platform linux/amd64 --network none 'docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3' sh -lc 'printf "GUEST_KERNEL=%s\\n" "$(uname -r)"; printf "GUEST_MACHINE=%s\\n" "$(uname -m)"; printf "GUEST_LIBC=%s\\n" "$(ldd --version 2>&1 | head -n1)"; if [ -e /proc/sys/fs/binfmt_misc/rosetta ]; then echo ROSETTA_VISIBLE=YES; else echo ROSETTA_VISIBLE=NO; fi'
```
Replay B:
```shell
docker run --name signthos-004c1fa-ec-b --platform linux/amd64 --network none 'docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3' sh -lc 'printf "GUEST_KERNEL=%s\\n" "$(uname -r)"; printf "GUEST_MACHINE=%s\\n" "$(uname -m)"; printf "GUEST_LIBC=%s\\n" "$(ldd --version 2>&1 | head -n1)"; if [ -e /proc/sys/fs/binfmt_misc/rosetta ]; then echo ROSETTA_VISIBLE=YES; else echo ROSETTA_VISIBLE=NO; fi'
```

The commands contain no mount option and explicitly select `linux/amd64`, `--network none`, and the immutable selected-image digest.

## Replay A gate

```text
GUEST_KERNEL=7.0.12-linuxkit
GUEST_MACHINE=x86_64
GUEST_LIBC=ldd (Ubuntu GLIBC 2.35-0ubuntu3.8) 2.35
ROSETTA_VISIBLE=NO
REPLAY_A_EXIT=0
REPLAY_A_STDOUT_SHA256=0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9
REPLAY_A_STDERR_SHA256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
REPLAY_A_CONTAINER_INSPECT_SHA256=242744a618b9983b47c5726b933bca5c949d4cf5824ac22cd1e25a60bc8a776f
REPLAY_A_GATE_MANIFEST_SHA256=e2cfc4d0237513a21fbdeef3e1e40a8d8e28c49f10657e669ba18629365740e2
```

Frozen Replay A container-inspect review fields:
```json
{"Config": {"Cmd": ["sh", "-lc", "printf \"GUEST_KERNEL=%s\\\\n\" \"$(uname -r)\"; printf \"GUEST_MACHINE=%s\\\\n\" \"$(uname -m)\"; printf \"GUEST_LIBC=%s\\\\n\" \"$(ldd --version 2>&1 | head -n1)\"; if [ -e /proc/sys/fs/binfmt_misc/rosetta ]; then echo ROSETTA_VISIBLE=YES; else echo ROSETTA_VISIBLE=NO; fi"], "Image": "docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3"}, "HostConfig": {"Binds": null, "NetworkMode": "none"}, "Id": "f331ccfe6f3f773ebbc01bfba0f99a5b58af317a6ca644806db9fd6eea338fe5", "Image": "sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3", "Mounts": [], "Platform": "linux"}
```

The gate manifest was frozen after Replay A evidence and predicate validation and before Replay B:
```text
e67982307ffde4d9ef6cad6158fd68aa715c4c1f33894901eb21768e37fc6163  replay-A.command.txt
0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9  replay-A.stdout.txt
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  replay-A.stderr.txt
9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa  replay-A.exit.txt
242744a618b9983b47c5726b933bca5c949d4cf5824ac22cd1e25a60bc8a776f  replay-A.container-inspect.json
dacb9f4ad7bf0f392b1448081f8f3bd823e061800e44cbe2c6d24bd5ae71d497  replay-A.stat.txt
1ec6f46896a80141588a0e3e39633b919ee73fec3a9636306a774ec588f0a714  replay-A-gate-time.txt
```

## Independent Docker lifecycle ordering

The frozen Docker Desktop lifecycle log gives nanosecond-resolution ordering. Replay A attach/wait completes before Replay B container creation begins, and both network joins are `net=none`.

```jsonl
{"component":"apiproxy","level":"info","msg":">> DELETE /v1.54/containers/signthos-004c1fa-ec-b?force=1","time":"2026-09-13T23:16:11.515297083Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":">> DELETE /v1.54/containers/signthos-004c1fa-ec-a?force=1","time":"2026-09-13T23:16:11.515297083Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":"<< DELETE /v1.54/containers/signthos-004c1fa-ec-b?force=1","time":"2026-09-13T23:16:11.515663417Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":"<< DELETE /v1.54/containers/signthos-004c1fa-ec-a?force=1","time":"2026-09-13T23:16:11.515773833Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":">> POST /v1.54/containers/create?name=signthos-004c1fa-ec-a&platform=linux%2Famd64","time":"2026-09-13T23:16:11.550923833Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":"<< POST /v1.54/containers/create?name=signthos-004c1fa-ec-a&platform=linux%2Famd64","time":"2026-09-13T23:16:11.574041750Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":">> POST /v1.54/containers/f331ccfe6f3f773ebbc01bfba0f99a5b58af317a6ca644806db9fd6eea338fe5/attach?stderr=1&stdout=1&stream=1","time":"2026-09-13T23:16:11.575952167Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":">> POST /v1.54/containers/f331ccfe6f3f773ebbc01bfba0f99a5b58af317a6ca644806db9fd6eea338fe5/wait?condition=next-exit","time":"2026-09-13T23:16:11.577628500Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":">> POST /v1.54/containers/f331ccfe6f3f773ebbc01bfba0f99a5b58af317a6ca644806db9fd6eea338fe5/start","time":"2026-09-13T23:16:11.583020625Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"command","eid":"eb76f4671233","ep":"signthos-004c1fa-ec-a","level":"info","msg":"sbJoin: gwep4 ''->'', gwep6 ''->''","net":"none","nid":"d83cf9d60f78","time":"2026-09-13T23:16:11.638890917Z"}
{"component":"apiproxy","level":"info","msg":"<< POST /v1.54/containers/f331ccfe6f3f773ebbc01bfba0f99a5b58af317a6ca644806db9fd6eea338fe5/start","time":"2026-09-13T23:16:11.651081292Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":"<< POST /v1.54/containers/f331ccfe6f3f773ebbc01bfba0f99a5b58af317a6ca644806db9fd6eea338fe5/attach?stderr=1&stdout=1&stream=1","time":"2026-09-13T23:16:12.175307709Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":"<< POST /v1.54/containers/f331ccfe6f3f773ebbc01bfba0f99a5b58af317a6ca644806db9fd6eea338fe5/wait?condition=next-exit","time":"2026-09-13T23:16:12.180404917Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":">> GET /v1.54/containers/signthos-004c1fa-ec-a/json","time":"2026-09-13T23:16:12.240057417Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":"<< GET /v1.54/containers/signthos-004c1fa-ec-a/json","time":"2026-09-13T23:16:12.240353084Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":">> POST /v1.54/containers/create?name=signthos-004c1fa-ec-b&platform=linux%2Famd64","time":"2026-09-13T23:16:12.319081250Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":"<< POST /v1.54/containers/create?name=signthos-004c1fa-ec-b&platform=linux%2Famd64","time":"2026-09-13T23:16:12.336071875Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":">> POST /v1.54/containers/4529e087bdcfab2643c1def5f60a19b15abf1b02248b236a1b2df4f7c5fa8502/attach?stderr=1&stdout=1&stream=1","time":"2026-09-13T23:16:12.337897459Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":">> POST /v1.54/containers/4529e087bdcfab2643c1def5f60a19b15abf1b02248b236a1b2df4f7c5fa8502/wait?condition=next-exit","time":"2026-09-13T23:16:12.339994459Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":">> POST /v1.54/containers/4529e087bdcfab2643c1def5f60a19b15abf1b02248b236a1b2df4f7c5fa8502/start","time":"2026-09-13T23:16:12.344355000Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"command","eid":"d3bdf75b71b0","ep":"signthos-004c1fa-ec-b","level":"info","msg":"sbJoin: gwep4 ''->'', gwep6 ''->''","net":"none","nid":"d83cf9d60f78","time":"2026-09-13T23:16:12.382006750Z"}
{"component":"apiproxy","level":"info","msg":"<< POST /v1.54/containers/4529e087bdcfab2643c1def5f60a19b15abf1b02248b236a1b2df4f7c5fa8502/start","time":"2026-09-13T23:16:12.391741084Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":"<< POST /v1.54/containers/4529e087bdcfab2643c1def5f60a19b15abf1b02248b236a1b2df4f7c5fa8502/attach?stderr=1&stdout=1&stream=1","time":"2026-09-13T23:16:12.788779667Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":"<< POST /v1.54/containers/4529e087bdcfab2643c1def5f60a19b15abf1b02248b236a1b2df4f7c5fa8502/wait?condition=next-exit","time":"2026-09-13T23:16:12.793886167Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":">> GET /v1.54/containers/signthos-004c1fa-ec-b/json","time":"2026-09-13T23:16:12.831075167Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
{"component":"apiproxy","level":"info","msg":"<< GET /v1.54/containers/signthos-004c1fa-ec-b/json","time":"2026-09-13T23:16:12.831362042Z","user_agent":"Docker-Client/29.5.1 (darwin)"}
```

```text
REPLAY_A_GATE_BEFORE_REPLAY_B_CREATE = PASS
REPLAY_A_MACHINE = x86_64
REPLAY_A_GLIBC = GLIBC_2.35
REPLAY_A_ROSETTA_VISIBLE = NO
```

## Replay B and equality

```text
GUEST_KERNEL=7.0.12-linuxkit
GUEST_MACHINE=x86_64
GUEST_LIBC=ldd (Ubuntu GLIBC 2.35-0ubuntu3.8) 2.35
ROSETTA_VISIBLE=NO
REPLAY_B_EXIT=0
REPLAY_B_STDOUT_SHA256=0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9
REPLAY_B_STDERR_SHA256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
REPLAY_B_CONTAINER_INSPECT_SHA256=c10a2ed40adcfdedd2040c8fcf6c09fedbf615cf6dd8c3bf00a670448b428dd9
REPLAY_STDOUT_BYTE_IDENTICAL=PASS
REPLAY_EQUALITY_EXIT=0
```

Frozen Replay B container-inspect review fields:
```json
{"Config": {"Cmd": ["sh", "-lc", "printf \"GUEST_KERNEL=%s\\\\n\" \"$(uname -r)\"; printf \"GUEST_MACHINE=%s\\\\n\" \"$(uname -m)\"; printf \"GUEST_LIBC=%s\\\\n\" \"$(ldd --version 2>&1 | head -n1)\"; if [ -e /proc/sys/fs/binfmt_misc/rosetta ]; then echo ROSETTA_VISIBLE=YES; else echo ROSETTA_VISIBLE=NO; fi"], "Image": "docker.io/emscripten/emsdk@sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3"}, "HostConfig": {"Binds": null, "NetworkMode": "none"}, "Id": "4529e087bdcfab2643c1def5f60a19b15abf1b02248b236a1b2df4f7c5fa8502", "Image": "sha256:c64f3cadcdff49ae65eadd815a425680a3f4c038b8fd49fe639c12e651d9c0a3", "Mounts": [], "Platform": "linux"}
```

## Frozen evidence manifest

`EVIDENCE_ROOT_LABEL = 004c1fa-evidence-complete-repair-20260913T231608Z`

`EVIDENCE_MANIFEST_TSV_SHA256 = 5dd56f9a25d9f1003d47c68aa764c90f64d9aee8a445465287e4131b73520688`

```text
6e59622db69f7abec0b21e1c56413366a33f704d74ab6c0c614107c1f04b5515  ./authority.txt
1d836c9a42df49611fe32e4f7fa8e06f67dfa3490ac69da9033f1b1ca830b3bf  ./canonical-main.json
952f5d270c7b06b1fa08490d9acb6dae3b8952c51e122ce4f69c5589b5dc41ba  ./docker-lifecycle.raw.txt
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  ./driver.stderr.txt
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  ./driver.stdout.txt
f05af55d22983f6420ba64fa1968de6223b04fda87587ead66e768f7dbabf497  ./local-worktree-status.txt
7e743136793d1b42f0c64d5db4eeb999b23e7ab725a8eaaf5ef16c7b4a098c92  ./open-pr-query.txt
18b4be54a390c6056b62a4676ba6ab22796e32e096675b442d274fdb275caf4d  ./open-pr-response.http
e2cfc4d0237513a21fbdeef3e1e40a8d8e28c49f10657e669ba18629365740e2  ./replay-A-gate-manifest.sha256
1ec6f46896a80141588a0e3e39633b919ee73fec3a9636306a774ec588f0a714  ./replay-A-gate-time.txt
e67982307ffde4d9ef6cad6158fd68aa715c4c1f33894901eb21768e37fc6163  ./replay-A.command.txt
242744a618b9983b47c5726b933bca5c949d4cf5824ac22cd1e25a60bc8a776f  ./replay-A.container-inspect.json
9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa  ./replay-A.exit.txt
dacb9f4ad7bf0f392b1448081f8f3bd823e061800e44cbe2c6d24bd5ae71d497  ./replay-A.stat.txt
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  ./replay-A.stderr.txt
0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9  ./replay-A.stdout.txt
670ceb371f9b75693e24c091d59eca419406a37989f4d770449540ea439e2441  ./replay-B-start-time.txt
dd5bf2f9148004ed79eea25f69c2b9efb9f718cfcf1da49729c23ffdd9197f79  ./replay-B.command.txt
c10a2ed40adcfdedd2040c8fcf6c09fedbf615cf6dd8c3bf00a670448b428dd9  ./replay-B.container-inspect.json
9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa  ./replay-B.exit.txt
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  ./replay-B.stderr.txt
0360104108e6ff8d51dd70074f7cc8b14a9c22d88fd27c59a1a31c6903e6bad9  ./replay-B.stdout.txt
9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa  ./replay-equality.exit.txt
c56877cbdd96c5caa04b4f2b8613e1ed01f65771c9ba3d11645b9d9dc1e2f4a7  ./selected-image-inspect.json
44b3f90078f7a98afe2fa315c562d1d628a6d4bb24a15a72c0d197fd0d430c5a  ./selected-image.txt
```

The local evidence root remains outside the repository and frozen. This candidate reproduces the raw preflight HTTP response, exact command bytes, replay outputs, Replay A gate manifest, and Docker lifecycle audit required to review the authority predicates without local-root access. Full frozen JSON objects are content-addressed by the manifest; the relevant immutable fields are reproduced above.

## Repository mutation boundary

The evidence-complete pair completed only after PR #233 was closed without merge and before this replacement candidate commit or PR existed. No remote replacement-candidate repository mutation occurred before qualifying evidence completed. This bounded statement does not relabel any earlier worktree or candidate as qualifying evidence.

## Result

```text
004C1FA_EVIDENCE_COMPLETE_REPAIR_PAIR = PASS_CANDIDATE
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
