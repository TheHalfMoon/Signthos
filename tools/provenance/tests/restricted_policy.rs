use serde_json::Value;
use signthos_provenance::validate_bytes;
use std::fs;
use std::path::{Path, PathBuf};

fn repo_path(relative: &str) -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("../..")
        .join(relative)
}

fn read(relative: &str) -> Vec<u8> {
    fs::read(repo_path(relative)).expect("canonical Grain E fixture must be readable")
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
fn canonical_restricted_path_policy_passes() {
    let relative = "provenance/policy/restricted-paths.json";
    let report = validate_bytes(relative, &read(relative));
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn canonical_policy_contains_foundation_boundaries() {
    let policy: Value = serde_json::from_slice(&read("provenance/policy/restricted-paths.json"))
        .expect("canonical restricted-path policy parses");
    let rules = policy["rules"].as_array().expect("rules array");
    let expected = [
        ("documenso/documenso", "packages/ee", "require_permission"),
        ("Stirling-Tools/Stirling-PDF", "app/proprietary", "deny"),
        ("Stirling-Tools/Stirling-PDF", "app/saas", "deny"),
        ("Stirling-Tools/Stirling-PDF", "engine", "deny"),
        (
            "Stirling-Tools/Stirling-PDF",
            "frontend/editor/src/proprietary",
            "deny",
        ),
        (
            "Stirling-Tools/Stirling-PDF",
            "frontend/editor/src/desktop",
            "deny",
        ),
        (
            "Stirling-Tools/Stirling-PDF",
            "frontend/editor/src/saas",
            "deny",
        ),
        (
            "Stirling-Tools/Stirling-PDF",
            "frontend/editor/src/cloud",
            "deny",
        ),
        (
            "Stirling-Tools/Stirling-PDF",
            "frontend/editor/src/prototypes",
            "deny",
        ),
        (
            "Stirling-Tools/Stirling-PDF",
            "frontend/editor/src/portal",
            "deny",
        ),
        (
            "Stirling-Tools/Stirling-PDF",
            "frontend/editor/src/portal-saas",
            "deny",
        ),
    ];

    for (repository, prefix, effect) in expected {
        assert!(
            rules.iter().any(|rule| {
                rule["repository"] == repository
                    && rule["path_prefix"] == prefix
                    && rule["effect"] == effect
            }),
            "missing canonical boundary {repository}:{prefix}:{effect}"
        );
    }
}

#[test]
fn documenso_community_metadata_passes_without_permission() {
    let relative = "provenance/fixtures/grain-e/documenso-community.json";
    let report = validate_bytes(relative, &read(relative));
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn documenso_ee_requires_permission() {
    assert_code(
        "provenance/fixtures/grain-e/documenso-ee-missing-permission.json",
        "PERMISSION_REQUIRED",
        "$.permission",
    );
}

#[test]
fn documenso_ee_accepts_complete_controlled_permission_metadata() {
    let relative = "provenance/fixtures/grain-e/documenso-ee-valid-permission.json";
    let report = validate_bytes(relative, &read(relative));
    assert!(report.is_valid(), "{}", report.render_text());
}

#[test]
fn documenso_ee_rejects_missing_required_scope() {
    assert_code(
        "provenance/fixtures/grain-e/documenso-ee-insufficient-scope.json",
        "PERMISSION_SCOPE",
        "$.permission.scope",
    );
}

#[test]
fn permission_artifact_reference_is_public_safe_and_canonical() {
    assert_code(
        "provenance/fixtures/grain-e/documenso-ee-invalid-artifact.json",
        "PERMISSION_ARTIFACT",
        "$.permission.artifact",
    );
}

#[test]
fn more_specific_stirling_deny_beats_broad_allow() {
    assert_code(
        "provenance/fixtures/grain-e/stirling-desktop-denied.json",
        "RESTRICTED_PATH_DENY",
        "$.upstream.path",
    );
}

#[test]
fn restricted_and_unknown_classifications_fail_closed() {
    for relative in [
        "provenance/fixtures/grain-e/restricted-classification.json",
        "provenance/fixtures/grain-e/unknown-classification.json",
    ] {
        assert_code(
            relative,
            "RESTRICTED_PATH_CLASSIFICATION",
            "$.classification",
        );
    }
}

#[test]
fn grain_e_diagnostics_are_deterministic() {
    let relative = "provenance/fixtures/grain-e/documenso-ee-insufficient-scope.json";
    let bytes = read(relative);
    let first = validate_bytes(relative, &bytes);
    let second = validate_bytes(relative, &bytes);
    assert_eq!(first, second);
    assert_eq!(first.render_text(), second.render_text());
    assert_eq!(first.render_json(), second.render_json());
}
