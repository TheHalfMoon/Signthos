use signthos_provenance::validate_bytes;
use std::fs;
use std::path::{Path, PathBuf};

fn repo_path(relative: &str) -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("../..")
        .join(relative)
}

fn read(relative: &str) -> Vec<u8> {
    fs::read(repo_path(relative)).expect("canonical Grain F fixture must be readable")
}

fn assert_code(relative: &str, code: &str, field: &str) {
    let report = validate_bytes(relative, &read(relative));
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
fn permissive_derived_source_requires_relicensing_permission() {
    assert_code(
        "provenance/fixtures/grain-f/source-permissive-derived-no-relicense.json",
        "DERIVATION_RELICENSE_REQUIRED",
        "$.permission",
    );
}

#[test]
fn permissive_derived_source_accepts_scoped_relicensing_permission() {
    let relative = "provenance/fixtures/grain-f/source-permissive-derived-with-relicense.json";
    let report = validate_bytes(relative, &read(relative));
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn invalid_derivation_relationship_id_fails_closed() {
    assert_code(
        "provenance/fixtures/grain-f/source-invalid-derivation-id.json",
        "DERIVATION_ID",
        "$.transformation.derives_from[0]",
    );
}

#[test]
fn store_distribution_pending_is_not_approved() {
    assert_code(
        "provenance/fixtures/grain-f/component-store-pending.json",
        "DISTRIBUTION_PENDING",
        "$.components[0].distribution_review.state",
    );
}

#[test]
fn spdx_evidence_cannot_auto_approve_store_distribution() {
    assert_code(
        "provenance/fixtures/grain-f/component-store-approved-spdx-only.json",
        "DISTRIBUTION_EVIDENCE",
        "$.components[0].distribution_review.evidence[0]",
    );
}

#[test]
fn store_distribution_accepts_immutable_review_evidence() {
    let relative = "provenance/fixtures/grain-f/component-store-approved-evidence.json";
    let report = validate_bytes(relative, &read(relative));
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn permissive_derived_component_requires_scoped_relicense_claim() {
    assert_code(
        "provenance/fixtures/grain-f/component-derived-permissive-no-relicense.json",
        "DERIVATION_RELICENSE_REQUIRED",
        "$.components[0].license.evidence",
    );
}

#[test]
fn permissive_derived_component_accepts_scoped_relicense_claim() {
    let relative = "provenance/fixtures/grain-f/component-derived-permissive-with-relicense.json";
    let report = validate_bytes(relative, &read(relative));
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn grain_f_diagnostics_are_deterministic() {
    let relative = "provenance/fixtures/grain-f/component-store-pending.json";
    let bytes = read(relative);
    let first = validate_bytes(relative, &bytes);
    let second = validate_bytes(relative, &bytes);
    assert_eq!(first, second);
    assert_eq!(first.render_text(), second.render_text());
    assert_eq!(first.render_json(), second.render_json());
}
