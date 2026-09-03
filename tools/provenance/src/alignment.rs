use crate::{Diagnostic, ValidationReport};
use serde_json::{Map, Value};
use std::collections::HashSet;

pub(crate) fn augment_bytes(path: &str, bytes: &[u8], report: &mut ValidationReport) {
    let Ok(Value::Object(record)) = serde_json::from_slice::<Value>(bytes) else {
        return;
    };

    match record.get("kind").and_then(Value::as_str) {
        Some("source_import") => source_import(path, &record, report),
        Some("component_registry") => component_registry(path, &record, report),
        Some("policy") => policy(path, &record, report),
        _ => {}
    }
}

fn source_import(path: &str, record: &Map<String, Value>, report: &mut ValidationReport) {
    if let Some(upstream) = object(record, "upstream") {
        match upstream.get("repository") {
            Some(Value::String(repository)) if !repository_id(repository) => push(
                report,
                path,
                "SOURCE_REPOSITORY",
                "$.upstream.repository",
                "expected owner/repository",
            ),
            _ => {}
        }
        bounded_string(
            path,
            upstream,
            "copyright_holder",
            "$.upstream.copyright_holder",
            1,
            512,
            report,
        );
        relative_path(path, upstream, "path", "$.upstream.path", report);
    }

    if let Some(license) = object(record, "license") {
        bounded_string(path, license, "spdx", "$.license.spdx", 1, 256, report);
        unique_string_array(
            path,
            license,
            "evidence",
            "$.license.evidence",
            Some(512),
            report,
        );
    }

    if let Some(permission) = object(record, "permission") {
        bounded_string(
            path,
            permission,
            "artifact",
            "$.permission.artifact",
            1,
            512,
            report,
        );
        unique_string_array(
            path,
            permission,
            "scope",
            "$.permission.scope",
            None,
            report,
        );
    }

    if let Some(import) = object(record, "import") {
        relative_path(path, import, "destination", "$.import.destination", report);
    }

    if let Some(transformation) = object(record, "transformation") {
        bounded_string(
            path,
            transformation,
            "notes",
            "$.transformation.notes",
            0,
            2048,
            report,
        );
        canonical_id_array(
            path,
            transformation,
            "derives_from",
            "$.transformation.derives_from",
            false,
            report,
        );
    }

    if let Some(review) = object(record, "review") {
        unique_string_array(path, review, "evidence", "$.review.evidence", None, report);
    }
}

fn component_registry(path: &str, record: &Map<String, Value>, report: &mut ValidationReport) {
    let Some(Value::Array(components)) = record.get("components") else {
        return;
    };

    for (index, component) in components.iter().enumerate() {
        let Some(component) = component.as_object() else {
            continue;
        };
        let base = format!("$.components[{index}]");

        bounded_string(
            path,
            component,
            "name",
            &format!("{base}.name"),
            1,
            128,
            report,
        );
        bounded_string(
            path,
            component,
            "version",
            &format!("{base}.version"),
            1,
            64,
            report,
        );

        if let Some(source) = object(component, "source") {
            match source.get("repository") {
                Some(Value::String(repository)) if !github_repository(repository) => push(
                    report,
                    path,
                    "COMPONENT_SOURCE",
                    &format!("{base}.source.repository"),
                    "expected canonical GitHub URL",
                ),
                _ => {}
            }
        }

        if let Some(license) = object(component, "license") {
            if let Some("spdx") = license.get("classification").and_then(Value::as_str) {
                bounded_string(
                    path,
                    license,
                    "spdx",
                    &format!("{base}.license.spdx"),
                    1,
                    256,
                    report,
                );
            }
            unique_string_array(
                path,
                license,
                "evidence",
                &format!("{base}.license.evidence"),
                Some(512),
                report,
            );
        }

        unique_string_array(
            path,
            component,
            "distribution_surfaces",
            &format!("{base}.distribution_surfaces"),
            None,
            report,
        );
        canonical_id_array(
            path,
            component,
            "derives_from",
            &format!("{base}.derives_from"),
            true,
            report,
        );

        if let Some(distribution_review) = object(component, "distribution_review") {
            unique_string_array(
                path,
                distribution_review,
                "evidence",
                &format!("{base}.distribution_review.evidence"),
                Some(512),
                report,
            );
        }
    }
}

fn policy(path: &str, record: &Map<String, Value>, report: &mut ValidationReport) {
    let Some(Value::Array(rules)) = record.get("rules") else {
        return;
    };

    for (index, rule) in rules.iter().enumerate() {
        let Some(rule) = rule.as_object() else {
            continue;
        };
        let base = format!("$.rules[{index}]");

        match rule.get("id") {
            Some(Value::String(id)) if !canonical_id(id, true) => push(
                report,
                path,
                "SCHEMA_ID",
                &format!("{base}.id"),
                "invalid canonical policy-rule id",
            ),
            _ => {}
        }

        optional_string_type(
            path,
            rule,
            "repository",
            &format!("{base}.repository"),
            report,
        );
        optional_string_type(
            path,
            rule,
            "path_prefix",
            &format!("{base}.path_prefix"),
            report,
        );

        match rule.get("repository") {
            Some(Value::String(repository)) if !repository_id(repository) => push(
                report,
                path,
                "SOURCE_REPOSITORY",
                &format!("{base}.repository"),
                "invalid repository",
            ),
            _ => {}
        }

        if rule.contains_key("expression") {
            bounded_string(
                path,
                rule,
                "expression",
                &format!("{base}.expression"),
                1,
                256,
                report,
            );
        }
        if rule.contains_key("path_prefix") {
            relative_path(
                path,
                rule,
                "path_prefix",
                &format!("{base}.path_prefix"),
                report,
            );
        }
        if rule.contains_key("permission_scopes") {
            unique_string_array(
                path,
                rule,
                "permission_scopes",
                &format!("{base}.permission_scopes"),
                None,
                report,
            );
        }
    }
}

fn object<'a>(record: &'a Map<String, Value>, key: &str) -> Option<&'a Map<String, Value>> {
    record.get(key).and_then(Value::as_object)
}

fn optional_string_type(
    path: &str,
    record: &Map<String, Value>,
    key: &str,
    field: &str,
    report: &mut ValidationReport,
) {
    if record.contains_key(key) && !matches!(record.get(key), Some(Value::String(_))) {
        push(report, path, "SCHEMA_TYPE", field, "expected string");
    }
}

fn bounded_string(
    path: &str,
    record: &Map<String, Value>,
    key: &str,
    field: &str,
    min: usize,
    max: usize,
    report: &mut ValidationReport,
) {
    let Some(Value::String(value)) = record.get(key) else {
        return;
    };
    let len = value.chars().count();
    if !(min..=max).contains(&len) {
        push(
            report,
            path,
            "SCHEMA_LENGTH",
            field,
            &format!("string length must be in {min}..={max}"),
        );
    }
}

fn unique_string_array(
    path: &str,
    record: &Map<String, Value>,
    key: &str,
    field: &str,
    max_item_len: Option<usize>,
    report: &mut ValidationReport,
) {
    let Some(Value::Array(values)) = record.get(key) else {
        return;
    };
    let mut seen = HashSet::new();
    for (index, value) in values.iter().enumerate() {
        let Some(value) = value.as_str() else {
            continue;
        };
        if !seen.insert(value) {
            push(
                report,
                path,
                "SCHEMA_UNIQUE",
                field,
                "array items must be unique",
            );
        }
        if max_item_len.is_some_and(|max| value.chars().count() > max) {
            push(
                report,
                path,
                "SCHEMA_LENGTH",
                &format!("{field}[{index}]"),
                "string item exceeds maximum length",
            );
        }
    }
}

fn canonical_id_array(
    path: &str,
    record: &Map<String, Value>,
    key: &str,
    field: &str,
    lowercase: bool,
    report: &mut ValidationReport,
) {
    unique_string_array(path, record, key, field, None, report);
    let Some(Value::Array(values)) = record.get(key) else {
        return;
    };
    for (index, value) in values.iter().enumerate() {
        let Some(value) = value.as_str() else {
            continue;
        };
        if !canonical_id(value, lowercase) {
            push(
                report,
                path,
                "SCHEMA_ID",
                &format!("{field}[{index}]"),
                "invalid canonical referenced id",
            );
        }
    }
}

fn relative_path(
    path: &str,
    record: &Map<String, Value>,
    key: &str,
    field: &str,
    report: &mut ValidationReport,
) {
    let Some(Value::String(value)) = record.get(key) else {
        return;
    };
    if drive_qualified(value) {
        push(
            report,
            path,
            "PATH_INVALID",
            field,
            "drive-qualified paths are not canonical relative POSIX paths",
        );
    }
}

fn drive_qualified(value: &str) -> bool {
    let bytes = value.as_bytes();
    bytes.len() >= 3 && bytes[0].is_ascii_alphabetic() && bytes[1] == b':' && bytes[2] == b'/'
}

fn canonical_id(value: &str, lowercase: bool) -> bool {
    (3..=128).contains(&value.len())
        && value.is_ascii()
        && value
            .bytes()
            .next()
            .is_some_and(|byte| byte.is_ascii_alphanumeric())
        && value
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'.' | b'_' | b'-'))
        && (!lowercase || value.bytes().all(|byte| !byte.is_ascii_uppercase()))
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

fn github_repository(value: &str) -> bool {
    value
        .strip_prefix("https://github.com/")
        .is_some_and(repository_id)
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
    fn drive_paths_are_detected() {
        assert!(drive_qualified("C:/repo/file"));
        assert!(drive_qualified("z:/repo/file"));
        assert!(!drive_qualified("c:repo/file"));
        assert!(!drive_qualified("repo/file"));
    }

    #[test]
    fn repository_dot_segments_are_rejected() {
        for repository in ["../bad", "./bad", "owner/.", "owner/..", "./."] {
            assert!(!repository_id(repository), "{repository}");
        }
        assert!(repository_id("owner/repository"));
        assert!(github_repository("https://github.com/owner/repository"));
        assert!(!github_repository("https://github.com/owner/.."));
    }

    #[test]
    fn duplicate_review_evidence_is_rejected() {
        let value = json!({
            "kind": "source_import",
            "review": {
                "evidence": ["github:issue-comment:1", "github:issue-comment:1"]
            }
        });
        let mut report = ValidationReport {
            diagnostics: Vec::new(),
        };
        augment_bytes(
            "fixture.json",
            &serde_json::to_vec(&value).unwrap(),
            &mut report,
        );
        assert!(
            report
                .diagnostics
                .iter()
                .any(|diagnostic| diagnostic.code == "SCHEMA_UNIQUE")
        );
    }

    #[test]
    fn policy_optional_path_fields_require_strings() {
        let value = json!({
            "kind": "policy",
            "rules": [{
                "id": "rule-one",
                "repository": 7,
                "path_prefix": false
            }]
        });
        let mut report = ValidationReport {
            diagnostics: Vec::new(),
        };
        augment_bytes(
            "fixture.json",
            &serde_json::to_vec(&value).unwrap(),
            &mut report,
        );
        assert!(report.diagnostics.iter().any(|diagnostic| {
            diagnostic.code == "SCHEMA_TYPE" && diagnostic.field == "$.rules[0].repository"
        }));
        assert!(report.diagnostics.iter().any(|diagnostic| {
            diagnostic.code == "SCHEMA_TYPE" && diagnostic.field == "$.rules[0].path_prefix"
        }));
    }
}
