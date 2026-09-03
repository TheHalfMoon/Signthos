use crate::{Diagnostic, ValidationReport};
use serde_json::{Map, Value};
use std::collections::BTreeSet;

const PERMISSION_ARTIFACT_PREFIX: &str = "permission-artifact:";
const RELICENSE_SCOPE_SUFFIX: &str = "#scope=relicense";

pub(crate) fn augment_bytes(path: &str, bytes: &[u8], report: &mut ValidationReport) {
    let Ok(Value::Object(record)) = serde_json::from_slice::<Value>(bytes) else {
        return;
    };

    match record.get("kind").and_then(Value::as_str) {
        Some("source_import") => source_import(path, &record, report),
        Some("component_registry") => component_registry(path, &record, report),
        _ => {}
    }
}

fn source_import(path: &str, record: &Map<String, Value>, report: &mut ValidationReport) {
    let Some(transformation) = record.get("transformation").and_then(Value::as_object) else {
        return;
    };
    let Some(derives_from) = transformation.get("derives_from").and_then(Value::as_array) else {
        return;
    };
    let id = record.get("id").and_then(Value::as_str);

    validate_relationships(
        path,
        derives_from,
        id,
        "$.transformation.derives_from",
        report,
    );

    if !derives_from.is_empty() && source_is_clearly_permissive(record) {
        validate_source_relicense(path, record, transformation, report);
    }
}

fn component_registry(path: &str, record: &Map<String, Value>, report: &mut ValidationReport) {
    let Some(components) = record.get("components").and_then(Value::as_array) else {
        return;
    };

    for (index, component) in components.iter().enumerate() {
        let Some(component) = component.as_object() else {
            continue;
        };
        let id = component.get("id").and_then(Value::as_str);
        let derives_field = format!("$.components[{index}].derives_from");
        if let Some(derives_from) = component.get("derives_from").and_then(Value::as_array) {
            validate_relationships(path, derives_from, id, &derives_field, report);
            if !derives_from.is_empty()
                && component_is_clearly_permissive(component)
                && !component_has_relicense_evidence(component)
            {
                push(
                    report,
                    path,
                    "DERIVATION_RELICENSE_REQUIRED",
                    &format!("$.components[{index}].license.evidence"),
                    "a permissively classified derived component requires explicit scoped relicensing evidence",
                );
            }
        }

        validate_distribution(path, component, index, report);
    }
}

fn validate_relationships(
    path: &str,
    derives_from: &[Value],
    id: Option<&str>,
    field: &str,
    report: &mut ValidationReport,
) {
    for (index, relation) in derives_from.iter().enumerate() {
        let Some(relation) = relation.as_str() else {
            continue;
        };
        if !canonical_relation_id(relation) {
            push(
                report,
                path,
                "DERIVATION_ID",
                &format!("{field}[{index}]"),
                "derivation relationship must use a canonical provenance id",
            );
        }
        if id == Some(relation) {
            push(
                report,
                path,
                "DERIVATION_SELF_REFERENCE",
                &format!("{field}[{index}]"),
                "a provenance record cannot derive from itself",
            );
        }
    }
}

fn source_is_clearly_permissive(record: &Map<String, Value>) -> bool {
    if matches!(
        record.get("classification").and_then(Value::as_str),
        Some("restricted" | "unknown")
    ) {
        return false;
    }
    record
        .get("license")
        .and_then(Value::as_object)
        .and_then(|license| license.get("spdx"))
        .and_then(Value::as_str)
        .is_some_and(clearly_permissive_spdx)
}

fn component_is_clearly_permissive(component: &Map<String, Value>) -> bool {
    let Some(license) = component.get("license").and_then(Value::as_object) else {
        return false;
    };
    license.get("classification").and_then(Value::as_str) == Some("spdx")
        && license
            .get("spdx")
            .and_then(Value::as_str)
            .is_some_and(clearly_permissive_spdx)
}

fn clearly_permissive_spdx(expression: &str) -> bool {
    let normalized = expression.replace(['(', ')'], " ");
    let mut saw_license = false;
    for token in normalized.split_whitespace() {
        if matches!(token, "AND" | "OR") {
            continue;
        }
        if token == "WITH" {
            return false;
        }
        saw_license = true;
        if !matches!(
            token,
            "0BSD"
                | "Apache-2.0"
                | "BSD-2-Clause"
                | "BSD-3-Clause"
                | "BSL-1.0"
                | "ISC"
                | "MIT"
                | "Unlicense"
                | "Zlib"
        ) {
            return false;
        }
    }
    saw_license
}

fn validate_source_relicense(
    path: &str,
    record: &Map<String, Value>,
    transformation: &Map<String, Value>,
    report: &mut ValidationReport,
) {
    let Some(permission) = record.get("permission").and_then(Value::as_object) else {
        push(
            report,
            path,
            "DERIVATION_RELICENSE_REQUIRED",
            "$.permission",
            "a permissively classified derived source record requires explicit relicensing permission",
        );
        return;
    };

    if !permission
        .get("artifact")
        .and_then(Value::as_str)
        .is_some_and(permission_artifact_ref)
    {
        push(
            report,
            path,
            "DERIVATION_RELICENSE_EVIDENCE",
            "$.permission.artifact",
            "relicensing permission must use a canonical non-secret permission-artifact reference",
        );
    }

    let granted = permission
        .get("scope")
        .and_then(Value::as_array)
        .map(|values| {
            values
                .iter()
                .filter_map(Value::as_str)
                .collect::<BTreeSet<_>>()
        })
        .unwrap_or_default();

    let mut required = BTreeSet::from(["relicense"]);
    match transformation.get("kind").and_then(Value::as_str) {
        Some("copied") => {
            required.insert("copy");
        }
        Some("adapted") => {
            required.extend(["copy", "modify", "create_derivative"]);
        }
        Some("rewritten_with_source_reference") => {
            required.insert("create_derivative");
        }
        Some("generated_from_upstream") => {
            required.extend(["copy", "create_derivative"]);
        }
        _ => {}
    }

    for scope in required {
        if !granted.contains(scope) {
            push(
                report,
                path,
                "DERIVATION_RELICENSE_SCOPE",
                "$.permission.scope",
                &format!("derived permissive treatment requires permission scope `{scope}`"),
            );
        }
    }
}

fn component_has_relicense_evidence(component: &Map<String, Value>) -> bool {
    component
        .get("license")
        .and_then(Value::as_object)
        .and_then(|license| license.get("evidence"))
        .and_then(Value::as_array)
        .is_some_and(|evidence| {
            evidence.iter().filter_map(Value::as_str).any(|item| {
                item.strip_prefix(PERMISSION_ARTIFACT_PREFIX)
                    .and_then(|rest| rest.strip_suffix(RELICENSE_SCOPE_SUFFIX))
                    .is_some_and(canonical_artifact_id)
            })
        })
}

fn validate_distribution(
    path: &str,
    component: &Map<String, Value>,
    index: usize,
    report: &mut ValidationReport,
) {
    let Some(review) = component
        .get("distribution_review")
        .and_then(Value::as_object)
    else {
        return;
    };
    let state = review.get("state").and_then(Value::as_str);
    let evidence = review.get("evidence").and_then(Value::as_array);
    let evidence_field = format!("$.components[{index}].distribution_review.evidence");
    let state_field = format!("$.components[{index}].distribution_review.state");

    if state == Some("approved_with_evidence") {
        match evidence {
            Some(items) if !items.is_empty() => {
                for (evidence_index, item) in items.iter().enumerate() {
                    if !item.as_str().is_some_and(review_ref) {
                        push(
                            report,
                            path,
                            "DISTRIBUTION_EVIDENCE",
                            &format!("{evidence_field}[{evidence_index}]"),
                            "approved distribution review requires immutable canonical GitHub review evidence",
                        );
                    }
                }
            }
            _ => push(
                report,
                path,
                "DISTRIBUTION_EVIDENCE",
                &evidence_field,
                "approved distribution review requires at least one immutable evidence reference",
            ),
        }
    }

    let store_or_mobile = component
        .get("distribution_surfaces")
        .and_then(Value::as_array)
        .is_some_and(|surfaces| {
            surfaces.iter().filter_map(Value::as_str).any(|surface| {
                matches!(surface, "desktop_store" | "ios_app_store" | "android_play")
            })
        });

    if state == Some("blocked") {
        push(
            report,
            path,
            "DISTRIBUTION_BLOCKED",
            &state_field,
            "component distribution review is explicitly blocked",
        );
    } else if store_or_mobile {
        match state {
            Some("pending") => push(
                report,
                path,
                "DISTRIBUTION_PENDING",
                &state_field,
                "store/mobile distribution requires completed evidence-backed review",
            ),
            Some("not_applicable") => push(
                report,
                path,
                "DISTRIBUTION_REVIEW_REQUIRED",
                &state_field,
                "store/mobile distribution cannot be marked not_applicable",
            ),
            _ => {}
        }
    }
}

fn canonical_relation_id(value: &str) -> bool {
    (3..=128).contains(&value.len())
        && value.is_ascii()
        && value
            .bytes()
            .next()
            .is_some_and(|byte| byte.is_ascii_alphanumeric())
        && value
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'.' | b'_' | b'-'))
}

fn permission_artifact_ref(value: &str) -> bool {
    value
        .strip_prefix(PERMISSION_ARTIFACT_PREFIX)
        .is_some_and(canonical_artifact_id)
}

fn canonical_artifact_id(id: &str) -> bool {
    if id.is_empty() || id.len() > 96 {
        return false;
    }
    let bytes = id.as_bytes();
    bytes.first().is_some_and(u8::is_ascii_alphanumeric)
        && bytes.last().is_some_and(u8::is_ascii_alphanumeric)
        && bytes.iter().all(|byte| {
            byte.is_ascii_lowercase() || byte.is_ascii_digit() || matches!(byte, b'.' | b'_' | b'-')
        })
}

fn review_ref(value: &str) -> bool {
    if !value.is_ascii() {
        return false;
    }
    let id = [
        "github:issue-comment:",
        "github:pull-request-review:",
        "github:pull-request-review-comment:",
    ]
    .iter()
    .find_map(|prefix| value.strip_prefix(prefix));
    matches!(
        id,
        Some(id)
            if !id.is_empty()
                && !id.starts_with('0')
                && id.bytes().all(|byte| byte.is_ascii_digit())
    )
}

fn push(report: &mut ValidationReport, path: &str, code: &'static str, field: &str, message: &str) {
    report.diagnostics.push(Diagnostic {
        path: path.to_owned(),
        code,
        field: field.to_owned(),
        message: message.to_owned(),
    });
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn permissive_expression_classifier_is_conservative() {
        for expression in ["MIT", "Apache-2.0", "MIT OR Apache-2.0", "Unlicense OR MIT"] {
            assert!(clearly_permissive_spdx(expression), "{expression}");
        }
        for expression in ["AGPL-3.0-only", "MPL-2.0", "MIT WITH LLVM-exception"] {
            assert!(!clearly_permissive_spdx(expression), "{expression}");
        }
    }

    #[test]
    fn immutable_review_reference_grammar_is_strict() {
        assert!(review_ref("github:issue-comment:123"));
        for value in [
            "github:issue-comment:0",
            "github:issue-comment:001",
            "github:issue-comment:latest",
            "https://github.com/example/repo/issues/1",
        ] {
            assert!(!review_ref(value), "{value}");
        }
    }

    #[test]
    fn component_scoped_relicense_claim_is_explicit() {
        let component = json!({
            "license": {
                "evidence": ["permission-artifact:synthetic-v1#scope=relicense"]
            }
        });
        assert!(component_has_relicense_evidence(
            component.as_object().expect("component object")
        ));
    }
}
