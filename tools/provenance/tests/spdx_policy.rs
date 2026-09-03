use signthos_provenance::validate_bytes;
use std::fs;
use std::path::{Path, PathBuf};

fn repo_path(relative: &str) -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("../..")
        .join(relative)
}

fn read(relative: &str) -> Vec<u8> {
    fs::read(repo_path(relative)).expect("canonical Grain D fixture must be readable")
}

fn assert_code(relative: &str, code: &str, field: &str) {
    let bytes = read(relative);
    let report = validate_bytes(relative, &bytes);
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
fn canonical_license_policy_passes() {
    let relative = "provenance/policy/license-policy.json";
    let report = validate_bytes(relative, &read(relative));
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn bootstrap_component_registry_passes_spdx_policy() {
    let relative = "provenance/components/registry.json";
    let report = validate_bytes(relative, &read(relative));
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn explicit_agpl_semantics_pass() {
    let relative = "provenance/fixtures/grain-d/source-import-agpl-3.0-only.json";
    let report = validate_bytes(relative, &read(relative));
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn invalid_and_unknown_expression_fails_closed() {
    assert_code(
        "provenance/fixtures/grain-d/source-import-unknown-spdx.json",
        "SPDX_PARSE",
        "$.license.spdx",
    );
}

#[test]
fn canonical_policy_rejects_bare_gnu_shorthand() {
    assert_code(
        "provenance/fixtures/grain-d/source-import-bare-agpl.json",
        "SPDX_POLICY",
        "$.license.spdx",
    );
}

#[test]
fn deprecated_identifiers_fail_closed_even_when_not_explicitly_listed() {
    assert_code(
        "provenance/fixtures/grain-d/source-import-deprecated-spdx.json",
        "SPDX_DEPRECATED",
        "$.license.spdx",
    );
}

#[test]
fn license_ref_cannot_authorize_source_import() {
    assert_code(
        "provenance/fixtures/grain-d/source-import-license-ref.json",
        "SPDX_CUSTOM_REFERENCE",
        "$.license.spdx",
    );
}

#[test]
fn spdx_diagnostics_are_deterministic() {
    let relative = "provenance/fixtures/grain-d/source-import-unknown-spdx.json";
    let bytes = read(relative);
    let first = validate_bytes(relative, &bytes);
    let second = validate_bytes(relative, &bytes);
    assert_eq!(first, second);
    assert_eq!(first.render_text(), second.render_text());
    assert_eq!(first.render_json(), second.render_json());
}
