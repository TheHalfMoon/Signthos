use serde_json::{Value, json};
use signthos_provenance::{MAX_RECORD_BYTES, MAX_TOTAL_BYTES, validate_bytes, validate_paths};
use std::fs;
use std::path::{Path, PathBuf};

fn repo_fixture(relative: &str) -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("../..")
        .join("provenance/fixtures")
        .join(relative)
}

fn read(relative: &str) -> Vec<u8> {
    fs::read(repo_fixture(relative)).expect("fixture must be readable")
}

fn valid_source_import() -> Value {
    json!({
        "schema_version": 1,
        "kind": "source_import",
        "id": "fixture-import-valid-isolated",
        "classification": "oss_permitted",
        "upstream": {
            "repository": "example/signthos-fixture",
            "commit": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "path": "src/example.txt",
            "sha256": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "copyright_holder": "Synthetic Fixture"
        },
        "license": {"spdx": "MIT", "evidence": ["fixture:license:mit"]},
        "permission": null,
        "import": {
            "destination": "fixtures/output-isolated.txt",
            "sha256": "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
            "date": "2024-02-29"
        },
        "transformation": {
            "kind": "copied",
            "notes": "Synthetic fixture only",
            "derives_from": []
        },
        "review": {
            "status": "qualified_exact_head",
            "pull_request": 1,
            "evidence": ["github:issue-comment:1"]
        }
    })
}

fn report(value: &Value) -> signthos_provenance::ValidationReport {
    let bytes = serde_json::to_vec(value).expect("synthetic fixture must serialize");
    validate_bytes("isolated.json", &bytes)
}

fn assert_diagnostic(value: &Value, code: &str, field: &str) {
    let report = report(value);
    assert!(
        report
            .diagnostics
            .iter()
            .any(|diagnostic| diagnostic.code == code && diagnostic.field == field),
        "expected {code} at {field}; got:\n{}",
        report.render_text()
    );
}

#[test]
fn valid_source_import_fixture_passes() {
    let report = validate_bytes(
        "valid/source-import.json",
        &read("valid/source-import.json"),
    );
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn each_canonical_review_evidence_kind_passes_locally() {
    for reference in [
        "github:issue-comment:1",
        "github:pull-request-review:2",
        "github:pull-request-review-comment:3",
    ] {
        let mut value = valid_source_import();
        value["review"]["evidence"] = json!([reference]);
        let report = report(&value);
        assert!(report.is_valid(), "{reference}: {}", report.render_text());
    }
}

#[test]
fn invalid_review_evidence_forms_are_isolated() {
    for reference in [
        "approved",
        "https://github.com/TheHalfMoon/Signthos/pull/27",
        "github:issue:27",
        "github:issue-comment:0",
        "github:issue-comment:-1",
        "github:issue-comment:+1",
        "github:issue-comment:001",
        "github:issue-comment:latest",
        "github:unknown:123",
        "github:issue-comment:１２３",
    ] {
        let mut value = valid_source_import();
        value["review"]["evidence"] = json!([reference]);
        assert_diagnostic(&value, "REVIEW_EVIDENCE", "$.review.evidence[0]");
    }
}

#[test]
fn missing_and_empty_review_evidence_fail_closed() {
    let mut missing = valid_source_import();
    missing["review"]
        .as_object_mut()
        .expect("review object")
        .remove("evidence");
    assert_diagnostic(&missing, "REVIEW_EVIDENCE", "$.review.evidence");

    let mut empty = valid_source_import();
    empty["review"]["evidence"] = json!([]);
    assert_diagnostic(&empty, "REVIEW_EVIDENCE", "$.review.evidence");
}

#[test]
fn missing_and_non_positive_pr_identity_fail_closed() {
    let mut missing = valid_source_import();
    missing["review"]
        .as_object_mut()
        .expect("review object")
        .remove("pull_request");
    assert_diagnostic(&missing, "REVIEW_PR", "$.review.pull_request");

    for pr in [json!(0), json!(-1)] {
        let mut value = valid_source_import();
        value["review"]["pull_request"] = pr;
        assert_diagnostic(&value, "REVIEW_PR", "$.review.pull_request");
    }
}

#[test]
fn review_states_are_isolated() {
    for (status, should_pass) in [
        ("qualified_exact_head", true),
        ("pending", false),
        ("rejected", false),
        ("approved", false),
    ] {
        let mut value = valid_source_import();
        value["review"]["status"] = json!(status);
        let report = report(&value);
        if should_pass {
            assert!(report.is_valid(), "{}", report.render_text());
        } else {
            assert!(
                report.diagnostics.iter().any(|diagnostic| {
                    diagnostic.code == "REVIEW_STATUS" && diagnostic.field == "$.review.status"
                }),
                "{status}: {}",
                report.render_text()
            );
        }
    }
}

#[test]
fn date_failures_are_isolated_from_review_failures() {
    for date in ["2025-02-29", "2026-2-01"] {
        let mut value = valid_source_import();
        value["import"]["date"] = json!(date);
        assert_diagnostic(&value, "DATE_INVALID", "$.import.date");
    }
}

#[test]
fn structural_fixture_reports_expected_families() {
    let report = validate_bytes(
        "invalid/source-import-structural.json",
        &read("invalid/source-import-structural.json"),
    );
    for code in [
        "SCHEMA_UNKNOWN_FIELD",
        "SCHEMA_ID",
        "SOURCE_REPOSITORY",
        "SOURCE_COMMIT",
        "PATH_INVALID",
        "DIGEST_INVALID",
    ] {
        assert!(
            report
                .diagnostics
                .iter()
                .any(|diagnostic| diagnostic.code == code),
            "missing {code}: {}",
            report.render_text()
        );
    }
}

#[test]
fn legacy_combined_invalid_fixtures_remain_fail_closed() {
    for relative in [
        "invalid/source-import-date-review.json",
        "invalid/source-import-rejected.json",
        "invalid/source-import-unknown-review.json",
        "invalid/source-import-structural.json",
        "invalid/source-import-missing-review-fields.json",
    ] {
        let report = validate_bytes(relative, &read(relative));
        assert!(!report.is_valid(), "{relative} unexpectedly passed");
    }
}

#[test]
fn duplicate_destination_is_detected_across_records() {
    let paths = [
        repo_fixture("multi/duplicate-destination-a.json"),
        repo_fixture("multi/duplicate-destination-b.json"),
    ];
    let paths: Vec<String> = paths
        .iter()
        .map(|path| path.to_string_lossy().into_owned())
        .collect();
    let report = validate_paths(&paths).expect("fixture files must be readable");
    assert!(
        report
            .diagnostics
            .iter()
            .any(|diagnostic| diagnostic.code == "PATH_DUPLICATE_DESTINATION"),
        "{}",
        report.render_text()
    );
}

#[test]
fn per_record_limit_is_enforced_before_json_parsing() {
    let oversized = vec![b' '; MAX_RECORD_BYTES as usize + 1];
    let report = validate_bytes("oversized.json", &oversized);
    assert_eq!(report.diagnostics.len(), 1);
    assert_eq!(report.diagnostics[0].code, "SIZE_RECORD");
}

#[test]
fn total_run_limit_is_enforced() {
    let unique = format!("signthos-provenance-size-{}", std::process::id());
    let root = std::env::temp_dir().join(unique);
    fs::create_dir_all(&root).expect("temp fixture dir");
    let payload = vec![b' '; MAX_RECORD_BYTES as usize];
    let mut paths = Vec::new();
    let file_count = (MAX_TOTAL_BYTES / MAX_RECORD_BYTES + 1) as usize;
    for index in 0..file_count {
        let path = root.join(format!("{index}.json"));
        fs::write(&path, &payload).expect("write temp fixture");
        paths.push(path.to_string_lossy().into_owned());
    }
    let report = validate_paths(&paths).expect("temp fixture paths are readable");
    let _ = fs::remove_dir_all(&root);
    assert!(
        report
            .diagnostics
            .iter()
            .any(|diagnostic| diagnostic.code == "SIZE_TOTAL")
    );
}
