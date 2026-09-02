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

#[test]
fn valid_source_import_fixture_passes() {
    let report = validate_bytes("valid/source-import.json", &read("valid/source-import.json"));
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn invalid_source_import_fixtures_fail_closed() {
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
    let paths: Vec<String> = paths.iter().map(|p| p.to_string_lossy().into_owned()).collect();
    let report = validate_paths(&paths).expect("fixture files must be readable");
    assert!(
        report.diagnostics.iter().any(|d| d.code == "PATH_DUPLICATE_DESTINATION"),
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
    assert!(report.diagnostics.iter().any(|d| d.code == "SIZE_TOTAL"));
}
