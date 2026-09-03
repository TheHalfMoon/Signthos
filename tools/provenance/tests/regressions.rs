use serde_json::{Value, json};
use signthos_provenance::{validate_bytes, validate_paths};
use std::fs;
use std::path::{Path, PathBuf};
use std::time::{SystemTime, UNIX_EPOCH};

fn temp_root(label: &str) -> PathBuf {
    let nonce = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("system clock must be after Unix epoch")
        .as_nanos();
    PathBuf::from(format!(
        ".signthos-grain-c-{label}-{}-{nonce}",
        std::process::id()
    ))
}

fn source_import(id: &str, destination: &str, date: &str) -> Value {
    json!({
        "schema_version": 1,
        "kind": "source_import",
        "id": id,
        "classification": "oss_permitted",
        "upstream": {
            "repository": "example/upstream",
            "commit": "0123456789abcdef0123456789abcdef01234567",
            "path": "src/lib.rs",
            "sha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
            "copyright_holder": "Example"
        },
        "license": {
            "spdx": "MIT",
            "evidence": ["LICENSE"]
        },
        "permission": null,
        "import": {
            "destination": destination,
            "sha256": "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
            "date": date
        },
        "transformation": {
            "kind": "copied",
            "notes": "",
            "derives_from": []
        },
        "review": {
            "status": "qualified_exact_head",
            "pull_request": 27,
            "evidence": ["github:issue-comment:1"]
        }
    })
}

fn write_json(path: &Path, value: &Value) {
    fs::write(
        path,
        serde_json::to_vec_pretty(value).expect("JSON serializes"),
    )
    .expect("temporary fixture writes");
}

fn relative(path: &Path) -> String {
    path.to_string_lossy().replace('\\', "/")
}

#[test]
fn duplicate_claim_is_reported_even_when_another_record_is_invalid() {
    let root = temp_root("duplicate-with-invalid");
    fs::create_dir_all(&root).expect("temporary fixture directory");

    let invalid = root.join("invalid.json");
    let first = root.join("first.json");
    let second = root.join("second.json");
    write_json(
        &invalid,
        &source_import("unique-invalid", "src/invalid.rs", "2025-02-29"),
    );
    write_json(
        &first,
        &source_import("shared-id", "src/first.rs", "2024-02-29"),
    );
    write_json(
        &second,
        &source_import("shared-id", "src/second.rs", "2024-02-29"),
    );

    let paths = [&invalid, &first, &second]
        .iter()
        .map(|path| relative(path))
        .collect::<Vec<_>>();
    let report = validate_paths(&paths).expect("temporary fixtures are readable");
    let _ = fs::remove_dir_all(&root);

    assert!(report.diagnostics.iter().any(|diagnostic| {
        diagnostic.code == "DATE_INVALID" && diagnostic.field == "$.import.date"
    }));
    assert!(report.diagnostics.iter().any(|diagnostic| {
        diagnostic.code == "SCHEMA_DUPLICATE_ID" && diagnostic.field == "$.id"
    }));
}

#[test]
fn utf8_relative_posix_path_is_schema_aligned() {
    let mut record = source_import("utf8-path", "src/ملف.rs", "2024-02-29");
    record["upstream"]["path"] = Value::String("مصدر/lib.rs".to_owned());

    let bytes = serde_json::to_vec(&record).expect("JSON serializes");
    let report = validate_bytes("utf8.json", &bytes);
    assert!(
        report.is_valid(),
        "schema-valid UTF-8 relative POSIX paths must not retain legacy PATH_INVALID: {}",
        report.render_text()
    );
}

#[test]
fn trailing_slash_path_remains_invalid() {
    let record = source_import("trailing-slash", "src/", "2024-02-29");
    let bytes = serde_json::to_vec(&record).expect("JSON serializes");
    let report = validate_bytes("trailing.json", &bytes);
    assert!(report.diagnostics.iter().any(|diagnostic| {
        diagnostic.code == "PATH_INVALID" && diagnostic.field == "$.import.destination"
    }));
}

#[test]
fn source_import_repository_dot_segments_are_rejected() {
    for repository in ["../bad", "./bad", "owner/.", "owner/.."] {
        let mut record = source_import("repository-dot", "src/repository.rs", "2024-02-29");
        record["upstream"]["repository"] = Value::String(repository.to_owned());
        let bytes = serde_json::to_vec(&record).expect("JSON serializes");
        let report = validate_bytes("repository-dot.json", &bytes);
        assert!(
            report.diagnostics.iter().any(|diagnostic| {
                diagnostic.code == "SOURCE_REPOSITORY"
                    && diagnostic.field == "$.upstream.repository"
            }),
            "{repository}: {}",
            report.render_text()
        );
    }
}

#[test]
fn policy_repository_dot_segments_are_rejected() {
    for repository in ["../bad", "owner/.", "./repo", "owner/.."] {
        let record = json!({
            "schema_version": 1,
            "kind": "policy",
            "id": "policy-one",
            "policy_type": "restricted_paths",
            "policy_version": 1,
            "rules": [{
                "id": "rule-one",
                "effect": "deny",
                "repository": repository
            }]
        });
        let bytes = serde_json::to_vec(&record).expect("JSON serializes");
        let report = validate_bytes("policy-dot.json", &bytes);
        assert!(
            report.diagnostics.iter().any(|diagnostic| {
                diagnostic.code == "SOURCE_REPOSITORY"
                    && diagnostic.field == "$.rules[0].repository"
            }),
            "{repository}: {}",
            report.render_text()
        );
    }
}

#[test]
fn component_repository_dot_segments_are_rejected() {
    for repository in [
        "https://github.com/../bad",
        "https://github.com/owner/.",
        "https://github.com/./repo",
        "https://github.com/owner/..",
    ] {
        let record = json!({
            "schema_version": 1,
            "kind": "component_registry",
            "components": [{
                "schema_version": 1,
                "kind": "component",
                "id": "component-one",
                "ecosystem": "cargo",
                "component_type": "library",
                "name": "example",
                "version": "1.0.0",
                "source": {
                    "repository": repository,
                    "revision": "0123456789abcdef0123456789abcdef01234567"
                },
                "package_checksum": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
                "license": {
                    "classification": "spdx",
                    "spdx": "MIT",
                    "evidence": ["LICENSE"]
                },
                "artifact_form": "source",
                "distribution_surfaces": ["server"],
                "notice_requirement": "not_required",
                "derives_from": [],
                "distribution_review": {
                    "state": "not_applicable",
                    "evidence": []
                }
            }]
        });
        let bytes = serde_json::to_vec(&record).expect("JSON serializes");
        let report = validate_bytes("component-dot.json", &bytes);
        assert!(
            report.diagnostics.iter().any(|diagnostic| {
                diagnostic.code == "COMPONENT_SOURCE"
                    && diagnostic.field == "$.components[0].source.repository"
            }),
            "{repository}: {}",
            report.render_text()
        );
    }
}

#[test]
fn empty_component_distribution_review_evidence_item_is_rejected() {
    let record = json!({
        "schema_version": 1,
        "kind": "component_registry",
        "components": [{
            "schema_version": 1,
            "kind": "component",
            "id": "component-one",
            "ecosystem": "cargo",
            "component_type": "library",
            "name": "example",
            "version": "1.0.0",
            "source": {
                "repository": "https://github.com/example/example",
                "revision": "0123456789abcdef0123456789abcdef01234567"
            },
            "package_checksum": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
            "license": {
                "classification": "spdx",
                "spdx": "MIT",
                "evidence": ["LICENSE"]
            },
            "artifact_form": "source",
            "distribution_surfaces": ["server"],
            "notice_requirement": "not_required",
            "derives_from": [],
            "distribution_review": {
                "state": "not_applicable",
                "evidence": [""]
            }
        }]
    });

    let bytes = serde_json::to_vec(&record).expect("JSON serializes");
    let report = validate_bytes("component.json", &bytes);
    assert!(report.diagnostics.iter().any(|diagnostic| {
        diagnostic.code == "SCHEMA_LENGTH"
            && diagnostic.field == "$.components[0].distribution_review.evidence[0]"
    }));
}

#[cfg(unix)]
#[test]
fn explicit_file_symlink_is_rejected() {
    use std::os::unix::fs::symlink;

    let root = temp_root("direct-symlink");
    fs::create_dir_all(&root).expect("temporary fixture directory");
    let target = root.join("target.json");
    let link = root.join("link.json");
    write_json(
        &target,
        &source_import("direct-symlink", "src/direct.rs", "2024-02-29"),
    );
    let target = fs::canonicalize(&target).expect("target canonicalizes");
    symlink(&target, &link).expect("create symlink");

    let result = validate_paths(&[relative(&link)]);
    let _ = fs::remove_dir_all(&root);
    assert!(result.is_err());
    assert!(result.unwrap_err().contains("IO_SYMLINK"));
}

#[cfg(unix)]
#[test]
fn recursive_default_discovery_rejects_symlink() {
    use std::os::unix::fs::symlink;
    use std::process::Command;

    let root = temp_root("recursive-symlink");
    let imports = root.join("provenance/imports");
    fs::create_dir_all(&imports).expect("temporary imports directory");
    let target = root.join("target.json");
    let link = imports.join("link.json");
    write_json(
        &target,
        &source_import("recursive-symlink", "src/recursive.rs", "2024-02-29"),
    );
    let target = fs::canonicalize(&target).expect("target canonicalizes");
    symlink(&target, &link).expect("create symlink");

    let output = Command::new(env!("CARGO_BIN_EXE_signthos-provenance"))
        .arg("validate")
        .current_dir(&root)
        .output()
        .expect("provenance CLI executes");
    let _ = fs::remove_dir_all(&root);

    assert_eq!(output.status.code(), Some(3));
    let stderr = String::from_utf8(output.stderr).expect("stderr is UTF-8");
    assert!(stderr.contains("IO_SYMLINK"));
}
