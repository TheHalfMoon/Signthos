#![cfg(unix)]

use serde_json::json;
use std::fs;
use std::os::unix::fs::{PermissionsExt as _, symlink};
use std::path::{Path, PathBuf};
use std::process::{Command, Output};
use std::time::{SystemTime, UNIX_EPOCH};

const RECORD_ID: &str = "fixture-source-001";
const CONTENT: &[u8] = b"hello\n";
const CONTENT_SHA256: &str = "5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03";

fn binary() -> &'static str {
    env!("CARGO_BIN_EXE_signthos-provenance")
}

fn temp_root(label: &str) -> PathBuf {
    let nonce = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("system clock must be after Unix epoch")
        .as_nanos();
    std::env::temp_dir().join(format!(
        "signthos-grain-h-{label}-{}-{nonce}",
        std::process::id()
    ))
}

fn git(root: &Path, args: &[&str]) -> Output {
    let output = Command::new("git")
        .current_dir(root)
        .args(args)
        .output()
        .expect("local git must execute on the qualification host");
    assert!(
        output.status.success(),
        "git {:?} failed: {}",
        args,
        String::from_utf8_lossy(&output.stderr)
    );
    output
}

fn init_repo(root: &Path) {
    fs::create_dir_all(root).expect("source repository directory is created");
    git(root, &["init", "-q"]);
    git(root, &["config", "user.name", "Synthetic Signthos Fixture"]);
    git(root, &["config", "user.email", "fixture@example.invalid"]);
    git(
        root,
        &[
            "remote",
            "add",
            "origin",
            "https://github.com/example/signthos-fixture.git",
        ],
    );
}

fn commit_file(root: &Path, path: &str, bytes: &[u8], message: &str) -> String {
    let file = root.join(path);
    fs::create_dir_all(file.parent().expect("fixture path has parent"))
        .expect("fixture parent directory is created");
    fs::write(&file, bytes).expect("source fixture is written");
    git(root, &["add", "--", path]);
    git(root, &["commit", "-q", "-m", message]);
    String::from_utf8(git(root, &["rev-parse", "HEAD"]).stdout)
        .expect("HEAD is UTF-8")
        .trim()
        .to_owned()
}

fn write_record(workspace: &Path, repository: &str, commit: &str, path: &str, source_sha256: &str) {
    let imports = workspace.join("provenance/imports");
    fs::create_dir_all(&imports).expect("import record directory is created");
    let record = json!({
        "schema_version": 1,
        "kind": "source_import",
        "id": RECORD_ID,
        "classification": "oss_permitted",
        "upstream": {
            "repository": repository,
            "commit": commit,
            "path": path,
            "sha256": source_sha256,
            "copyright_holder": "Synthetic Fixture"
        },
        "license": {
            "spdx": "MIT",
            "evidence": ["fixture:license:mit"]
        },
        "permission": null,
        "import": {
            "destination": "fixtures/output.txt",
            "sha256": "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
            "date": "2026-09-03"
        },
        "transformation": {
            "kind": "copied",
            "notes": "Synthetic Grain H local checkout fixture",
            "derives_from": []
        },
        "review": {
            "status": "pending",
            "pull_request": 1,
            "evidence": ["github:issue-comment:1"]
        }
    });
    fs::write(
        imports.join("record.json"),
        serde_json::to_vec_pretty(&record).expect("record serializes"),
    )
    .expect("record fixture is written");
}

struct Fixture {
    workspace: PathBuf,
    source: PathBuf,
    commit: String,
}

impl Fixture {
    fn new() -> Self {
        let root = temp_root("fixture");
        let workspace = root.join("workspace");
        let source = root.join("source");
        fs::create_dir_all(&workspace).expect("workspace is created");
        init_repo(&source);
        let commit = commit_file(&source, "src/example.txt", CONTENT, "initial fixture");
        write_record(
            &workspace,
            "example/signthos-fixture",
            &commit,
            "src/example.txt",
            CONTENT_SHA256,
        );
        Self {
            workspace,
            source,
            commit,
        }
    }

    fn invoke(&self, args: &[&str]) -> Output {
        Command::new(binary())
            .current_dir(&self.workspace)
            .args(args)
            .output()
            .expect("provenance binary executes")
    }

    fn verify(&self) -> Output {
        let source = self.source.to_string_lossy().into_owned();
        self.invoke(&[
            "verify-source",
            "--record",
            RECORD_ID,
            "--source-root",
            &source,
        ])
    }

    fn rewrite_record(&self, repository: &str, path: &str, digest: &str) {
        write_record(&self.workspace, repository, &self.commit, path, digest);
    }
}

impl Drop for Fixture {
    fn drop(&mut self) {
        if let Some(root) = self.workspace.parent() {
            let _ = fs::remove_dir_all(root);
        }
    }
}

#[test]
fn verifies_exact_local_source_without_authorizing_import() {
    let fixture = Fixture::new();
    let output = fixture.verify();
    assert_eq!(output.status.code(), Some(0));
    assert!(output.stderr.is_empty());
    let stdout = String::from_utf8(output.stdout).expect("stdout is UTF-8");
    assert!(stdout.contains("SOURCE_VERIFIED fixture-source-001"));
    assert!(stdout.contains("import authorization not evaluated"));

    let validation = fixture.invoke(&["validate", "provenance/imports/record.json"]);
    assert_eq!(validation.status.code(), Some(1));
    assert!(String::from_utf8_lossy(&validation.stderr).contains("REVIEW_STATUS"));
}

#[test]
fn rejects_local_head_drift() {
    let fixture = Fixture::new();
    commit_file(
        &fixture.source,
        "src/other.txt",
        b"drift\n",
        "drift fixture",
    );
    let output = fixture.verify();
    assert_eq!(output.status.code(), Some(1));
    assert!(String::from_utf8_lossy(&output.stderr).contains("SOURCE_COMMIT_MISMATCH"));
}

#[test]
fn rejects_missing_pinned_path() {
    let fixture = Fixture::new();
    fixture.rewrite_record(
        "example/signthos-fixture",
        "src/missing.txt",
        CONTENT_SHA256,
    );
    let output = fixture.verify();
    assert_eq!(output.status.code(), Some(1));
    assert!(String::from_utf8_lossy(&output.stderr).contains("SOURCE_PATH_MISSING"));
}

#[test]
fn rejects_source_digest_mismatch() {
    let fixture = Fixture::new();
    fixture.rewrite_record(
        "example/signthos-fixture",
        "src/example.txt",
        &"0".repeat(64),
    );
    let output = fixture.verify();
    assert_eq!(output.status.code(), Some(1));
    assert!(String::from_utf8_lossy(&output.stderr).contains("SOURCE_DIGEST_MISMATCH"));
}

#[test]
fn rejects_repository_identity_mismatch() {
    let fixture = Fixture::new();
    fixture.rewrite_record(
        "example/other-repository",
        "src/example.txt",
        CONTENT_SHA256,
    );
    let output = fixture.verify();
    assert_eq!(output.status.code(), Some(1));
    assert!(String::from_utf8_lossy(&output.stderr).contains("SOURCE_REPOSITORY_MISMATCH"));
}

#[test]
fn rejects_symlink_at_pinned_revision() {
    let root = temp_root("symlink");
    let workspace = root.join("workspace");
    let source = root.join("source");
    fs::create_dir_all(&workspace).expect("workspace is created");
    init_repo(&source);
    fs::create_dir_all(source.join("src")).expect("source directory is created");
    fs::write(source.join("src/target.txt"), CONTENT).expect("symlink target is written");
    symlink("target.txt", source.join("src/link.txt")).expect("source symlink is created");
    git(&source, &["add", "--", "src/target.txt", "src/link.txt"]);
    git(&source, &["commit", "-q", "-m", "symlink fixture"]);
    let commit = String::from_utf8(git(&source, &["rev-parse", "HEAD"]).stdout)
        .expect("HEAD is UTF-8")
        .trim()
        .to_owned();
    write_record(
        &workspace,
        "example/signthos-fixture",
        &commit,
        "src/link.txt",
        CONTENT_SHA256,
    );
    let source_arg = source.to_string_lossy().into_owned();
    let output = Command::new(binary())
        .current_dir(&workspace)
        .args([
            "verify-source",
            "--record",
            RECORD_ID,
            "--source-root",
            &source_arg,
        ])
        .output()
        .expect("provenance binary executes");
    let _ = fs::remove_dir_all(&root);
    assert_eq!(output.status.code(), Some(1));
    assert!(String::from_utf8_lossy(&output.stderr).contains("SOURCE_PATH_SYMLINK"));
}

#[test]
fn missing_source_root_is_local_io_failure() {
    let fixture = Fixture::new();
    let missing = fixture
        .workspace
        .join("definitely-missing-source-root")
        .to_string_lossy()
        .into_owned();
    let output = fixture.invoke(&[
        "verify-source",
        "--record",
        RECORD_ID,
        "--source-root",
        &missing,
    ]);
    assert_eq!(output.status.code(), Some(3));
    assert!(String::from_utf8_lossy(&output.stderr).contains("SOURCE_ROOT_IO"));
}

#[test]
fn source_root_symlink_fails_closed() {
    let fixture = Fixture::new();
    let link = fixture.workspace.join("source-link");
    symlink(&fixture.source, &link).expect("source-root symlink is created");
    let link_arg = link.to_string_lossy().into_owned();
    let output = fixture.invoke(&[
        "verify-source",
        "--record",
        RECORD_ID,
        "--source-root",
        &link_arg,
    ]);
    assert_eq!(output.status.code(), Some(1));
    assert!(String::from_utf8_lossy(&output.stderr).contains("SOURCE_ROOT_SYMLINK"));
}

#[test]
fn canonical_validate_does_not_invoke_local_git() {
    let fixture = Fixture::new();
    let fake_bin = fixture.workspace.join("fake-bin");
    let sentinel = fixture.workspace.join("git-invoked");
    fs::create_dir_all(&fake_bin).expect("fake bin is created");
    let fake_git = fake_bin.join("git");
    fs::write(
        &fake_git,
        format!("#!/bin/sh\ntouch '{}'\nexit 99\n", sentinel.display()),
    )
    .expect("fake git is written");
    let mut permissions = fs::metadata(&fake_git)
        .expect("fake git metadata exists")
        .permissions();
    permissions.set_mode(0o755);
    fs::set_permissions(&fake_git, permissions).expect("fake git becomes executable");

    let output = Command::new(binary())
        .current_dir(&fixture.workspace)
        .env("PATH", &fake_bin)
        .args(["validate", "provenance/imports/record.json"])
        .output()
        .expect("provenance binary executes without PATH git");
    assert_eq!(output.status.code(), Some(1));
    assert!(String::from_utf8_lossy(&output.stderr).contains("REVIEW_STATUS"));
    assert!(!sentinel.exists(), "canonical validate must not invoke git");
}
