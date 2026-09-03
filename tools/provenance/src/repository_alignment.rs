use crate::{Diagnostic, ValidationReport};
use serde_json::Value;

pub(crate) fn augment_bytes(path: &str, bytes: &[u8], report: &mut ValidationReport) {
    let Ok(Value::Object(record)) = serde_json::from_slice::<Value>(bytes) else {
        return;
    };

    match record.get("kind").and_then(Value::as_str) {
        Some("source_import") => {
            if let Some(repository) = record
                .get("upstream")
                .and_then(Value::as_object)
                .and_then(|upstream| upstream.get("repository"))
                .and_then(Value::as_str)
            {
                if !repository_id(repository) {
                    push(
                        report,
                        path,
                        "SOURCE_REPOSITORY",
                        "$.upstream.repository",
                        "expected canonical owner/repository",
                    );
                }
            }
        }
        Some("component_registry") => {
            let Some(components) = record.get("components").and_then(Value::as_array) else {
                return;
            };
            for (index, component) in components.iter().enumerate() {
                let Some(repository) = component
                    .get("source")
                    .and_then(Value::as_object)
                    .and_then(|source| source.get("repository"))
                    .and_then(Value::as_str)
                else {
                    continue;
                };
                if !github_repository_id(repository) {
                    push(
                        report,
                        path,
                        "COMPONENT_SOURCE",
                        &format!("$.components[{index}].source.repository"),
                        "expected canonical GitHub repository URL",
                    );
                }
            }
        }
        Some("policy") => {
            let Some(rules) = record.get("rules").and_then(Value::as_array) else {
                return;
            };
            for (index, rule) in rules.iter().enumerate() {
                let Some(repository) = rule.get("repository").and_then(Value::as_str) else {
                    continue;
                };
                if !repository_id(repository) {
                    push(
                        report,
                        path,
                        "SOURCE_REPOSITORY",
                        &format!("$.rules[{index}].repository"),
                        "invalid canonical repository",
                    );
                }
            }
        }
        _ => {}
    }
}

fn github_repository_id(value: &str) -> bool {
    value
        .strip_prefix("https://github.com/")
        .is_some_and(repository_id)
}

fn repository_id(value: &str) -> bool {
    if !value.is_ascii() || value.contains('\\') {
        return false;
    }
    let mut parts = value.split('/');
    matches!(
        (parts.next(), parts.next(), parts.next()),
        (Some(owner), Some(repository), None)
            if repository_segment(owner) && repository_segment(repository)
    )
}

fn repository_segment(value: &str) -> bool {
    !value.is_empty()
        && !matches!(value, "." | "..")
        && value
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'.' | b'_' | b'-'))
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

    fn report(value: Value) -> ValidationReport {
        let mut report = ValidationReport {
            diagnostics: Vec::new(),
        };
        augment_bytes(
            "fixture.json",
            &serde_json::to_vec(&value).unwrap(),
            &mut report,
        );
        report
    }

    #[test]
    fn repository_segments_reject_dot_aliases() {
        for value in ["../bad", "owner/.", "./.", "owner/.."] {
            assert!(!repository_id(value), "{value}");
        }
        assert!(repository_id("owner/repository"));
    }

    #[test]
    fn source_import_dot_repository_is_rejected() {
        let report = report(json!({
            "kind": "source_import",
            "upstream": { "repository": "owner/." }
        }));
        assert!(report.diagnostics.iter().any(|diagnostic| {
            diagnostic.code == "SOURCE_REPOSITORY" && diagnostic.field == "$.upstream.repository"
        }));
    }

    #[test]
    fn policy_dot_repository_is_rejected() {
        let report = report(json!({
            "kind": "policy",
            "rules": [{ "repository": "./repo" }]
        }));
        assert!(report.diagnostics.iter().any(|diagnostic| {
            diagnostic.code == "SOURCE_REPOSITORY" && diagnostic.field == "$.rules[0].repository"
        }));
    }

    #[test]
    fn component_dot_repository_is_rejected() {
        let report = report(json!({
            "kind": "component_registry",
            "components": [{
                "source": { "repository": "https://github.com/owner/.." }
            }]
        }));
        assert!(report.diagnostics.iter().any(|diagnostic| {
            diagnostic.code == "COMPONENT_SOURCE"
                && diagnostic.field == "$.components[0].source.repository"
        }));
    }
}
