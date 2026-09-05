use serde_json::{Value, json};
use signthos_provenance::{ValidationReport, validate_bytes, validate_paths};
use std::fs;
use std::path::{Path, PathBuf};
use std::process::{Command, Output};
use std::time::{SystemTime, UNIX_EPOCH};

const CONTENT: &[u8] = b"hello\n";
const CONTENT_SHA256: &str = "5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03";

fn binary() -> &'static str {
    env!("CARGO_BIN_EXE_signthos-provenance")
}

fn base_v2() -> Value {
    json!({
        "schema_version": 2,
        "kind": "source_import",
        "id": "fixture-v2-private-001",
        "classification": "separate_permission_required",
        "upstream": {
            "repository": "example/signthos-fixture",
            "commit": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "path": "src/example.txt",
            "sha256": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "copyright_holder": "Synthetic Fixture"
        },
        "license": {
            "classification": "unresolved_conflict",
            "evidence": [
                "fixture:license:repository-agpl",
                "fixture:license:package-mit"
            ]
        },
        "permission": {
            "artifact": "permission-artifact:fixture-owner-grant",
            "scope": ["copy", "redistribute", "publish_source"]
        },
        "distribution": {
            "state": "resolved",
            "evidence": ["fixture:distribution:resolved"],
            "required_artifacts": ["LICENSES/upstream-notice.txt"],
            "actions": ["redistribute", "publish_source"]
        },
        "import": {
            "destination": "fixtures/v2-private.txt",
            "sha256": "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
            "date": "2026-09-05"
        },
        "transformation": {
            "kind": "copied",
            "notes": "Synthetic v2 private-permission fixture",
            "derives_from": []
        },
        "review": {
            "status": "qualified_exact_head",
            "pull_request": 1,
            "evidence": ["github:issue-comment:1"]
        }
    })
}

fn base_v2_spdx() -> Value {
    let mut value = base_v2();
    value["classification"] = json!("oss_permitted");
    value["license"] = json!({
        "classification": "spdx",
        "spdx": "MIT",
        "evidence": ["spdx-expression:MIT"]
    });
    value["permission"] = Value::Null;
    value["distribution"]["actions"] = json!(["redistribute"]);
    value
}

fn report(value: &Value) -> ValidationReport {
    validate_bytes(
        "v2.json",
        &serde_json::to_vec(value).expect("synthetic v2 record serializes"),
    )
}

fn assert_diagnostic(value: &Value, code: &str) {
    let report = report(value);
    assert!(
        report
            .diagnostics
            .iter()
            .any(|diagnostic| diagnostic.code == code),
        "expected {code}; got:\n{}",
        report.render_text()
    );
}

fn temp_root(label: &str) -> PathBuf {
    let nonce = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("system clock must be after Unix epoch")
        .as_nanos();
    std::env::temp_dir().join(format!(
        "signthos-v2-{label}-{}-{nonce}",
        std::process::id()
    ))
}

fn relative_temp_root(label: &str) -> PathBuf {
    let nonce = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("system clock must be after Unix epoch")
        .as_nanos();
    PathBuf::from(format!(
        ".signthos-v2-{label}-{}-{nonce}",
        std::process::id()
    ))
}

#[test]
fn resolved_spdx_v2_is_valid() {
    let report = report(&base_v2_spdx());
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn private_permission_with_unresolved_public_license_is_representable() {
    let report = report(&base_v2());
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn unresolved_public_license_requires_separate_permission_classification() {
    let mut value = base_v2();
    value["classification"] = json!("oss_permitted");
    assert_diagnostic(&value, "LICENSE_RIGHTS_BASIS");
}

#[test]
fn unresolved_distribution_is_not_import_ready() {
    for state in ["unresolved", "contradictory"] {
        let mut value = base_v2();
        value["distribution"]["state"] = json!(state);
        assert_diagnostic(&value, "DISTRIBUTION_STATUS");
    }
}

#[test]
fn unresolved_license_without_permission_fails_closed() {
    let mut value = base_v2();
    value["permission"] = Value::Null;
    assert_diagnostic(&value, "PERMISSION_REQUIRED");
}

#[test]
fn unresolved_license_cannot_smuggle_spdx() {
    let mut value = base_v2();
    value["license"]["spdx"] = json!("MIT");
    let report = report(&value);
    assert!(report.diagnostics.iter().any(|diagnostic| {
        diagnostic.code == "SCHEMA_UNKNOWN_FIELD" && diagnostic.field == "$.license.spdx"
    }));
}

#[test]
fn resolved_license_requires_spdx() {
    let mut value = base_v2_spdx();
    value["license"].as_object_mut().unwrap().remove("spdx");
    let report = report(&value);
    assert!(report.diagnostics.iter().any(|diagnostic| {
        diagnostic.code == "SCHEMA_REQUIRED" && diagnostic.field == "$.license.spdx"
    }));
}

#[test]
fn resolved_spdx_evidence_conflict_is_rejected() {
    let mut value = base_v2_spdx();
    value["license"]["evidence"] = json!(["spdx-expression:Apache-2.0"]);
    assert_diagnostic(&value, "SPDX_CONFLICT");
}

#[test]
fn unresolved_and_noncanonical_spdx_forms_remain_fail_closed() {
    for (expression, expected) in [
        ("NONE", "SPDX_UNRESOLVED"),
        ("NOASSERTION", "SPDX_UNRESOLVED"),
        ("LicenseRef-Private", "SPDX_CUSTOM_REFERENCE"),
        ("GPL-2.0", "SPDX_POLICY"),
        ("AGPL-3.0", "SPDX_POLICY"),
    ] {
        let mut value = base_v2_spdx();
        value["license"]["spdx"] = json!(expression);
        value["license"]["evidence"] = json!([format!("spdx-expression:{expression}")]);
        assert_diagnostic(&value, expected);
    }
}

#[test]
fn permission_artifact_and_distribution_scopes_are_enforced() {
    let mut malformed = base_v2();
    malformed["permission"]["artifact"] = json!("private-chat-message");
    assert_diagnostic(&malformed, "PERMISSION_ARTIFACT");

    let mut insufficient = base_v2();
    insufficient["permission"]["scope"] = json!(["copy", "redistribute"]);
    assert_diagnostic(&insufficient, "PERMISSION_SCOPE");
}

#[test]
fn required_distribution_artifacts_use_canonical_paths() {
    let mut value = base_v2();
    value["distribution"]["required_artifacts"] = json!(["../NOTICE"]);
    assert_diagnostic(&value, "PATH_INVALID");
}

#[test]
fn denied_restricted_path_remains_denied_in_v2() {
    let mut value = base_v2();
    value["upstream"]["repository"] = json!("Stirling-Tools/Stirling-PDF");
    value["upstream"]["path"] = json!("app/proprietary/secret.rs");
    assert_diagnostic(&value, "RESTRICTED_PATH_DENY");
}

#[test]
fn unknown_version_and_downgrade_attempts_fail_closed() {
    let mut unknown = base_v2();
    unknown["schema_version"] = json!(3);
    assert_diagnostic(&unknown, "SCHEMA_VERSION");

    let mut downgrade = base_v2();
    downgrade["schema_version"] = json!(1);
    let report = report(&downgrade);
    assert!(!report.is_valid());
    assert!(report.diagnostics.iter().any(|diagnostic| {
        diagnostic.code == "SCHEMA_UNKNOWN_FIELD" && diagnostic.field == "$.distribution"
    }));
}

#[cfg(target_os = "linux")]
#[test]
fn mixed_version_duplicate_claims_fail_closed() {
    let root = relative_temp_root("duplicates");
    fs::create_dir_all(&root).expect("temporary directory is created");

    let v1_path = root.join("v1.json");
    let v2_path = root.join("v2.json");
    fs::write(
        &v1_path,
        include_bytes!("../../../provenance/fixtures/valid/source-import.json"),
    )
    .expect("v1 fixture is written");

    let v1: Value = serde_json::from_slice(include_bytes!(
        "../../../provenance/fixtures/valid/source-import.json"
    ))
    .expect("v1 fixture parses");
    let mut v2 = base_v2();
    v2["id"] = v1["id"].clone();
    v2["import"]["destination"] = v1["import"]["destination"].clone();
    fs::write(
        &v2_path,
        serde_json::to_vec_pretty(&v2).expect("v2 fixture serializes"),
    )
    .expect("v2 fixture is written");

    let paths = vec![
        v1_path.to_string_lossy().replace('\\', "/"),
        v2_path.to_string_lossy().replace('\\', "/"),
    ];
    let report = validate_paths(&paths).expect("mixed-version fixtures are readable");
    let _ = fs::remove_dir_all(&root);

    assert!(
        report
            .diagnostics
            .iter()
            .any(|diagnostic| diagnostic.code == "SCHEMA_DUPLICATE_ID")
    );
    assert!(
        report
            .diagnostics
            .iter()
            .any(|diagnostic| diagnostic.code == "PATH_DUPLICATE_DESTINATION")
    );
}

#[test]
fn notice_projects_v1_and_v2_without_permission_secrets() {
    let root = temp_root("notice");
    fs::create_dir_all(root.join("provenance/components"))
        .expect("components directory is created");
    fs::create_dir_all(root.join("provenance/imports")).expect("imports directory is created");
    fs::write(
        root.join("provenance/components/registry.json"),
        include_bytes!("../../../provenance/components/registry.json"),
    )
    .expect("component registry is written");
    fs::write(
        root.join("provenance/imports/v1.json"),
        include_bytes!("../../../provenance/fixtures/valid/source-import.json"),
    )
    .expect("v1 import is written");
    fs::write(
        root.join("provenance/imports/v2.json"),
        serde_json::to_vec_pretty(&base_v2()).expect("v2 import serializes"),
    )
    .expect("v2 import is written");

    let first = Command::new(binary())
        .arg("notice")
        .current_dir(&root)
        .output()
        .expect("notice command executes");
    let second = Command::new(binary())
        .arg("notice")
        .current_dir(&root)
        .output()
        .expect("notice command repeats");
    let _ = fs::remove_dir_all(&root);

    assert!(
        first.status.success(),
        "{}",
        String::from_utf8_lossy(&first.stderr)
    );
    assert_eq!(first.stdout, second.stdout);
    let output = String::from_utf8(first.stdout).expect("NOTICE is UTF-8");
    assert!(output.contains("fixture-v2-private-001"));
    assert!(output.contains("classification: unresolved_conflict"));
    assert!(!output.contains("permission-artifact:fixture-owner-grant"));
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

fn commit_file(root: &Path) -> String {
    fs::create_dir_all(root.join("src")).expect("source directory is created");
    fs::write(root.join("src/example.txt"), CONTENT).expect("source fixture is written");
    git(root, &["add", "--", "src/example.txt"]);
    git(root, &["commit", "-q", "-m", "v2 source fixture"]);
    String::from_utf8(git(root, &["rev-parse", "HEAD"]).stdout)
        .expect("HEAD is UTF-8")
        .trim()
        .to_owned()
}

#[test]
fn verify_source_accepts_v2_exact_source_facts_without_authorizing_import() {
    let root = temp_root("verify-source");
    let workspace = root.join("workspace");
    let source = root.join("source");
    fs::create_dir_all(workspace.join("provenance/imports"))
        .expect("workspace imports directory is created");
    init_repo(&source);
    let commit = commit_file(&source);

    let mut record = base_v2();
    record["upstream"]["commit"] = json!(commit);
    record["upstream"]["sha256"] = json!(CONTENT_SHA256);
    fs::write(
        workspace.join("provenance/imports/v2.json"),
        serde_json::to_vec_pretty(&record).expect("v2 source record serializes"),
    )
    .expect("v2 source record is written");

    let source_arg = source.to_string_lossy().into_owned();
    let output = Command::new(binary())
        .current_dir(&workspace)
        .args([
            "verify-source",
            "--record",
            "fixture-v2-private-001",
            "--source-root",
            &source_arg,
        ])
        .output()
        .expect("verify-source executes");
    let _ = fs::remove_dir_all(&root);

    assert_eq!(output.status.code(), Some(0));
    assert!(output.stderr.is_empty());
    let stdout = String::from_utf8(output.stdout).expect("stdout is UTF-8");
    assert!(stdout.contains("SOURCE_VERIFIED fixture-v2-private-001"));
    assert!(stdout.contains("import authorization not evaluated"));
}
