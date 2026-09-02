use crate::ValidationReport;
use serde_json::{Map, Value};

pub(crate) fn reconcile_bytes(path: &str, bytes: &[u8], report: &mut ValidationReport) {
    let Ok(Value::Object(record)) = serde_json::from_slice::<Value>(bytes) else {
        return;
    };

    match record.get("kind").and_then(Value::as_str) {
        Some("source_import") => reconcile_source_import(path, &record, report),
        Some("policy") => reconcile_policy(path, &record, report),
        _ => {}
    }
}

fn reconcile_source_import(path: &str, record: &Map<String, Value>, report: &mut ValidationReport) {
    if let Some(upstream) = record.get("upstream").and_then(Value::as_object) {
        reconcile_field(path, upstream, "path", "$.upstream.path", report);
    }
    if let Some(import) = record.get("import").and_then(Value::as_object) {
        reconcile_field(
            path,
            import,
            "destination",
            "$.import.destination",
            report,
        );
    }
}

fn reconcile_policy(path: &str, record: &Map<String, Value>, report: &mut ValidationReport) {
    let Some(rules) = record.get("rules").and_then(Value::as_array) else {
        return;
    };
    for (index, rule) in rules.iter().enumerate() {
        let Some(rule) = rule.as_object() else {
            continue;
        };
        reconcile_field(
            path,
            rule,
            "path_prefix",
            &format!("$.rules[{index}].path_prefix"),
            report,
        );
    }
}

fn reconcile_field(
    path: &str,
    record: &Map<String, Value>,
    key: &str,
    field: &str,
    report: &mut ValidationReport,
) {
    let Some(Value::String(value)) = record.get(key) else {
        return;
    };
    if !schema_relative_path(value) {
        return;
    }

    report.diagnostics.retain(|diagnostic| {
        !(diagnostic.path == path
            && diagnostic.code == "PATH_INVALID"
            && diagnostic.field == field
            && diagnostic.message == "expected normalized relative POSIX path")
    });
}

fn schema_relative_path(value: &str) -> bool {
    if value.is_empty()
        || value.starts_with('/')
        || value.ends_with('/')
        || value.contains('\\')
        || value
            .chars()
            .any(|character| matches!(character, '\n' | '\r' | '\u{2028}' | '\u{2029}'))
        || drive_qualified(value)
    {
        return false;
    }
    value
        .split('/')
        .all(|segment| !segment.is_empty() && segment != "." && segment != "..")
}

fn drive_qualified(value: &str) -> bool {
    let bytes = value.as_bytes();
    bytes.len() >= 3
        && bytes[0].is_ascii_alphabetic()
        && bytes[1] == b':'
        && bytes[2] == b'/'
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::Diagnostic;
    use serde_json::json;

    #[test]
    fn utf8_schema_path_removes_only_legacy_ascii_diagnostic() {
        let value = json!({
            "kind": "source_import",
            "upstream": {"path": "src/ملف.rs"}
        });
        let mut report = ValidationReport {
            diagnostics: vec![Diagnostic {
                path: "fixture.json".to_owned(),
                code: "PATH_INVALID",
                field: "$.upstream.path".to_owned(),
                message: "expected normalized relative POSIX path".to_owned(),
            }],
        };
        reconcile_bytes(
            "fixture.json",
            &serde_json::to_vec(&value).unwrap(),
            &mut report,
        );
        assert!(report.diagnostics.is_empty());
    }

    #[test]
    fn traversal_and_line_terminators_remain_invalid() {
        for value in [
            "src/../ملف.rs",
            "C:/ملف.rs",
            "/src/ملف.rs",
            "src/\nrecord.rs",
            "src/\rrecord.rs",
            "src/\u{2028}record.rs",
            "src/\u{2029}record.rs",
        ] {
            assert!(!schema_relative_path(value), "{value:?}");
        }
    }
}
