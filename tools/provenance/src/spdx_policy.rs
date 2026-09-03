use crate::{Diagnostic, ValidationReport};
use serde_json::{Map, Value};
use spdx::{Expression, LicenseItem, ParseMode};

const LICENSE_POLICY_JSON: &str = include_str!("../../../provenance/policy/license-policy.json");
const LICENSE_EVIDENCE_CLAIM_PREFIX: &str = "spdx-expression:";

pub(crate) fn augment_bytes(path: &str, bytes: &[u8], report: &mut ValidationReport) {
    let Ok(Value::Object(record)) = serde_json::from_slice::<Value>(bytes) else {
        return;
    };

    match record.get("kind").and_then(Value::as_str) {
        Some("source_import") => source_import(path, &record, report),
        Some("component_registry") => component_registry(path, &record, report),
        Some("policy") if record.get("policy_type").and_then(Value::as_str) == Some("license") => {
            license_policy(path, &record, report)
        }
        _ => {}
    }
}

fn source_import(path: &str, record: &Map<String, Value>, report: &mut ValidationReport) {
    let Some(license) = record.get("license").and_then(Value::as_object) else {
        return;
    };
    let Some(expression) = license.get("spdx").and_then(Value::as_str) else {
        return;
    };

    validate_expression(path, expression, "$.license.spdx", true, report);
    validate_evidence_claims(path, license, expression, "$.license.evidence", report);
}

fn component_registry(path: &str, record: &Map<String, Value>, report: &mut ValidationReport) {
    let Some(components) = record.get("components").and_then(Value::as_array) else {
        return;
    };

    for (index, component) in components.iter().enumerate() {
        let Some(component) = component.as_object() else {
            continue;
        };
        let Some(license) = component.get("license").and_then(Value::as_object) else {
            continue;
        };
        if license.get("classification").and_then(Value::as_str) != Some("spdx") {
            continue;
        }
        let Some(expression) = license.get("spdx").and_then(Value::as_str) else {
            continue;
        };

        let spdx_field = format!("$.components[{index}].license.spdx");
        let evidence_field = format!("$.components[{index}].license.evidence");
        validate_expression(path, expression, &spdx_field, true, report);
        validate_evidence_claims(path, license, expression, &evidence_field, report);
    }
}

fn validate_evidence_claims(
    path: &str,
    license: &Map<String, Value>,
    expression: &str,
    field: &str,
    report: &mut ValidationReport,
) {
    let Some(evidence) = license.get("evidence").and_then(Value::as_array) else {
        return;
    };

    for (index, item) in evidence.iter().enumerate() {
        let Some(item) = item.as_str() else {
            continue;
        };
        let Some(claimed_expression) = item.strip_prefix(LICENSE_EVIDENCE_CLAIM_PREFIX) else {
            continue;
        };
        if claimed_expression != expression {
            push(
                report,
                path,
                "SPDX_CONFLICT",
                &format!("{field}[{index}]"),
                "evidence SPDX claim conflicts with canonical license expression",
            );
        }
    }
}

fn license_policy(path: &str, record: &Map<String, Value>, report: &mut ValidationReport) {
    let Some(rules) = record.get("rules").and_then(Value::as_array) else {
        return;
    };
    let mut rejects_bare_agpl = false;

    for (index, rule) in rules.iter().enumerate() {
        let Some(rule) = rule.as_object() else {
            continue;
        };
        if rule.get("effect").and_then(Value::as_str) != Some("reject_expression") {
            continue;
        }
        let Some(expression) = rule.get("expression").and_then(Value::as_str) else {
            continue;
        };
        if expression == "AGPL-3.0" {
            rejects_bare_agpl = true;
        }
        if Expression::parse(expression).is_err() && parse_allow_deprecated(expression).is_err() {
            push(
                report,
                path,
                "SPDX_POLICY_RULE",
                &format!("$.rules[{index}].expression"),
                "reject_expression rule must name a recognized SPDX expression",
            );
        }
    }

    if !rejects_bare_agpl {
        push(
            report,
            path,
            "SPDX_POLICY_REQUIRED",
            "$.rules",
            "license policy must reject bare AGPL-3.0",
        );
    }
}

fn validate_expression(
    path: &str,
    expression: &str,
    field: &str,
    reject_custom_references: bool,
    report: &mut ValidationReport,
) {
    if matches!(expression, "NONE" | "NOASSERTION") {
        push(
            report,
            path,
            "SPDX_UNRESOLVED",
            field,
            "canonical license evidence must resolve to an SPDX expression",
        );
        return;
    }

    match policy_rejects(expression) {
        Ok(true) => {
            push(
                report,
                path,
                "SPDX_POLICY",
                field,
                "license expression is rejected by canonical Signthos policy",
            );
            return;
        }
        Ok(false) => {}
        Err(message) => {
            push(report, path, "SPDX_POLICY_CONFIG", field, message);
            return;
        }
    }

    let parsed = match Expression::parse(expression) {
        Ok(parsed) => parsed,
        Err(_) => match parse_allow_deprecated(expression) {
            Ok(parsed) if has_deprecated_identifier(&parsed) => {
                push(
                    report,
                    path,
                    "SPDX_DEPRECATED",
                    field,
                    "deprecated SPDX shorthand is prohibited; use explicit current semantics",
                );
                return;
            }
            _ => {
                push(
                    report,
                    path,
                    "SPDX_PARSE",
                    field,
                    "invalid syntax or unknown SPDX identifier",
                );
                return;
            }
        },
    };

    for requirement in parsed.requirements() {
        match &requirement.req.license {
            LicenseItem::Spdx { id, .. } if id.is_deprecated() => {
                push(
                    report,
                    path,
                    "SPDX_DEPRECATED",
                    field,
                    "deprecated SPDX shorthand is prohibited; use explicit current semantics",
                );
                return;
            }
            LicenseItem::Other { .. } if reject_custom_references => {
                push(
                    report,
                    path,
                    "SPDX_CUSTOM_REFERENCE",
                    field,
                    "LicenseRef-* cannot independently authorize canonical source or SPDX-classified component evidence",
                );
                return;
            }
            _ => {}
        }
    }
}

fn parse_allow_deprecated(expression: &str) -> Result<Expression, spdx::ParseError> {
    Expression::parse_mode(
        expression,
        ParseMode {
            allow_deprecated: true,
            ..ParseMode::STRICT
        },
    )
}

fn has_deprecated_identifier(expression: &Expression) -> bool {
    expression.requirements().any(|requirement| {
        matches!(
            &requirement.req.license,
            LicenseItem::Spdx { id, .. } if id.is_deprecated()
        )
    })
}

fn policy_rejects(expression: &str) -> Result<bool, &'static str> {
    let policy: Value = serde_json::from_str(LICENSE_POLICY_JSON)
        .map_err(|_| "embedded canonical license policy is invalid JSON")?;
    let rules = policy
        .get("rules")
        .and_then(Value::as_array)
        .ok_or("embedded canonical license policy has no rules array")?;

    Ok(rules.iter().any(|rule| {
        rule.get("effect").and_then(Value::as_str) == Some("reject_expression")
            && rule.get("expression").and_then(Value::as_str) == Some(expression)
    }))
}

fn push(report: &mut ValidationReport, path: &str, code: &'static str, field: &str, message: &str) {
    report.diagnostics.push(Diagnostic {
        path: path.to_owned(),
        code,
        field: field.to_owned(),
        message: message.to_owned(),
    });
}
