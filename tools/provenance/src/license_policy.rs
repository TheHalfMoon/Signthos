use std::collections::{BTreeMap, BTreeSet};

use serde_json::Value;

use crate::{Diagnostic, ValidationReport};

const CANONICAL_LICENSE_POLICY: &str =
    include_str!("../../../provenance/policy/license-policy.json");

pub(crate) fn augment_bytes(path: &str, bytes: &[u8], report: &mut ValidationReport) {
    let Ok(value) = serde_json::from_slice::<Value>(bytes) else {
        return;
    };
    let Some(kind) = value.get("kind").and_then(Value::as_str) else {
        return;
    };

    match kind {
        "source_import" => validate_license_object(
            path,
            value.get("license"),
            true,
            "$.license",
            report,
        ),
        "component" => validate_license_object(
            path,
            value.get("license"),
            false,
            "$.license",
            report,
        ),
        "component_registry" => {
            if let Some(components) = value.get("components").and_then(Value::as_array) {
                for (index, component) in components.iter().enumerate() {
                    validate_license_object(
                        path,
                        component.get("license"),
                        false,
                        &format!("$.components[{index}].license"),
                        report,
                    );
                }
            }
        }
        "policy" if value.get("policy_type").and_then(Value::as_str) == Some("license") => {
            validate_license_policy(path, &value, report);
        }
        _ => {}
    }
}

fn validate_license_object(
    path: &str,
    license: Option<&Value>,
    source_import: bool,
    field: &str,
    report: &mut ValidationReport,
) {
    let Some(license) = license.and_then(Value::as_object) else {
        return;
    };
    let Some(expression) = license.get("spdx").and_then(Value::as_str) else {
        return;
    };

    validate_expression(path, expression, source_import, field, report);

    if !source_import
        && license
            .get("classification")
            .and_then(Value::as_str)
            .is_some_and(|value| value != "spdx")
    {
        report.diagnostics.push(Diagnostic {
            path: path.to_owned(),
            code: "SPDX_EVIDENCE_CONFLICT",
            field: format!("{field}.classification"),
            message: "a component SPDX expression conflicts with a non-SPDX license classification"
                .to_owned(),
        });
    }
}

fn validate_expression(
    path: &str,
    expression: &str,
    source_import: bool,
    field: &str,
    report: &mut ValidationReport,
) {
    match canonical_rejected_expressions() {
        Ok(expressions) => {
            if expressions
                .iter()
                .any(|rejected_expression| contains_expression_token(expression, rejected_expression))
            {
                report.diagnostics.push(Diagnostic {
                    path: path.to_owned(),
                    code: "SPDX_REJECTED_EXPRESSION",
                    field: format!("{field}.spdx"),
                    message: "license expression contains a policy-rejected ambiguous or deprecated identifier"
                        .to_owned(),
                });
            }
        }
        Err(()) => report.diagnostics.push(Diagnostic {
            path: path.to_owned(),
            code: "SPDX_POLICY_INVALID",
            field: "$.policy".to_owned(),
            message: "canonical embedded license policy is invalid".to_owned(),
        }),
    }

    if spdx::Expression::parse(expression).is_err() {
        report.diagnostics.push(Diagnostic {
            path: path.to_owned(),
            code: "SPDX_INVALID_EXPRESSION",
            field: format!("{field}.spdx"),
            message: "license expression is not valid SPDX syntax with known identifiers".to_owned(),
        });
    }

    if source_import && expression.contains("LicenseRef-") {
        report.diagnostics.push(Diagnostic {
            path: path.to_owned(),
            code: "SPDX_LICENSE_REF_SOURCE_IMPORT",
            field: format!("{field}.spdx"),
            message: "LicenseRef expressions cannot independently authorize a v1 source import"
                .to_owned(),
        });
    }
}

fn canonical_rejected_expressions() -> Result<Vec<String>, ()> {
    let value = serde_json::from_str::<Value>(CANONICAL_LICENSE_POLICY).map_err(|_| ())?;
    if value.get("schema_version").and_then(Value::as_u64) != Some(1)
        || value.get("kind").and_then(Value::as_str) != Some("policy")
        || value.get("policy_type").and_then(Value::as_str) != Some("license")
        || value.get("policy_version").and_then(Value::as_u64) != Some(1)
    {
        return Err(());
    }

    let rules = value.get("rules").and_then(Value::as_array).ok_or(())?;
    let mut rejected = Vec::new();
    for rule in rules {
        if rule.get("effect").and_then(Value::as_str) == Some("reject_expression") {
            let expression = rule.get("expression").and_then(Value::as_str).ok_or(())?;
            if expression.is_empty() {
                return Err(());
            }
            rejected.push(expression.to_owned());
        }
    }
    if rejected.is_empty() {
        return Err(());
    }
    rejected.sort();
    rejected.dedup();
    Ok(rejected)
}

fn contains_expression_token(expression: &str, needle: &str) -> bool {
    expression
        .split_ascii_whitespace()
        .map(|token| token.trim_matches(|character| matches!(character, '(' | ')')))
        .any(|token| token == needle)
}

fn validate_license_policy(path: &str, value: &Value, report: &mut ValidationReport) {
    let Some(rules) = value.get("rules").and_then(Value::as_array) else {
        return;
    };
    let mut effects_by_expression: BTreeMap<String, BTreeSet<String>> = BTreeMap::new();

    for (index, rule) in rules.iter().enumerate() {
        let Some(expression) = rule.get("expression").and_then(Value::as_str) else {
            continue;
        };
        let Some(effect) = rule.get("effect").and_then(Value::as_str) else {
            continue;
        };

        if spdx::Expression::parse(expression).is_err() {
            report.diagnostics.push(Diagnostic {
                path: path.to_owned(),
                code: "SPDX_POLICY_EXPRESSION_INVALID",
                field: format!("$.rules[{index}].expression"),
                message: "license policy rule expression is not valid SPDX syntax with known identifiers"
                    .to_owned(),
            });
        }

        effects_by_expression
            .entry(expression.to_owned())
            .or_default()
            .insert(effect.to_owned());
    }

    for (expression, effects) in effects_by_expression {
        if effects.contains("reject_expression") && effects.len() > 1 {
            report.diagnostics.push(Diagnostic {
                path: path.to_owned(),
                code: "SPDX_POLICY_CONFLICT",
                field: "$.rules".to_owned(),
                message: format!(
                    "license policy assigns conflicting effects to expression {expression}"
                ),
            });
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn report_for(value: &str) -> ValidationReport {
        let mut report = ValidationReport {
            diagnostics: Vec::new(),
        };
        augment_bytes("fixture.json", value.as_bytes(), &mut report);
        report
    }

    fn source_import(expression: &str) -> String {
        format!(
            r#"{{"kind":"source_import","license":{{"spdx":"{expression}","evidence":["fixture"]}}}}"#
        )
    }

    #[test]
    fn maintained_spdx_parser_accepts_known_expression() {
        let report = report_for(&source_import("MIT OR Apache-2.0"));
        assert!(report.diagnostics.is_empty());
    }

    #[test]
    fn unknown_or_invalid_expression_fails_closed() {
        let report = report_for(&source_import("Definitely-Not-An-SPDX-License"));
        assert!(
            report
                .diagnostics
                .iter()
                .any(|diagnostic| diagnostic.code == "SPDX_INVALID_EXPRESSION")
        );
    }

    #[test]
    fn bare_agpl_3_0_is_rejected_but_explicit_variant_is_not_policy_rejected() {
        let rejected = report_for(&source_import("AGPL-3.0"));
        assert!(
            rejected
                .diagnostics
                .iter()
                .any(|diagnostic| diagnostic.code == "SPDX_REJECTED_EXPRESSION")
        );

        let explicit = report_for(&source_import("AGPL-3.0-only"));
        assert!(
            explicit
                .diagnostics
                .iter()
                .all(|diagnostic| diagnostic.code != "SPDX_REJECTED_EXPRESSION")
        );
    }

    #[test]
    fn license_ref_cannot_authorize_source_import() {
        let report = report_for(&source_import("LicenseRef-Synthetic"));
        assert!(
            report
                .diagnostics
                .iter()
                .any(|diagnostic| diagnostic.code == "SPDX_LICENSE_REF_SOURCE_IMPORT")
        );
    }

    #[test]
    fn component_classification_conflict_is_rejected() {
        let report = report_for(
            r#"{"kind":"component","license":{"classification":"unknown","spdx":"MIT","evidence":["fixture"]}}"#,
        );
        assert!(
            report
                .diagnostics
                .iter()
                .any(|diagnostic| diagnostic.code == "SPDX_EVIDENCE_CONFLICT")
        );
    }

    #[test]
    fn contradictory_policy_effects_are_rejected() {
        let report = report_for(
            r#"{"kind":"policy","policy_type":"license","rules":[{"id":"a","effect":"allow","expression":"MIT"},{"id":"b","effect":"reject_expression","expression":"MIT"}]}"#,
        );
        assert!(
            report
                .diagnostics
                .iter()
                .any(|diagnostic| diagnostic.code == "SPDX_POLICY_CONFLICT")
        );
    }
}
