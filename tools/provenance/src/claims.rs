use crate::{Diagnostic, ValidationReport};
use serde_json::Value;
use std::collections::{BTreeMap, BTreeSet};

#[derive(Debug, Default)]
pub(crate) struct ClaimTracker {
    ids: BTreeMap<String, String>,
    destinations: BTreeMap<String, String>,
}

impl ClaimTracker {
    pub(crate) fn observe(&mut self, path: &str, bytes: &[u8], report: &mut ValidationReport) {
        let Ok(Value::Object(record)) = serde_json::from_slice::<Value>(bytes) else {
            return;
        };

        match record.get("kind").and_then(Value::as_str) {
            Some("source_import") => self.observe_source_import(path, &record, report),
            Some("component_registry") => self.observe_component_registry(path, &record, report),
            Some("policy") => self.observe_policy(path, &record, report),
            _ => {}
        }
    }

    fn observe_source_import(
        &mut self,
        path: &str,
        record: &serde_json::Map<String, Value>,
        report: &mut ValidationReport,
    ) {
        if let Some(id) = record.get("id").and_then(Value::as_str) {
            if canonical_id(id, false) {
                self.observe_id(path, "$.id", id, report);
            }
        }

        if let Some(destination) = record
            .get("import")
            .and_then(Value::as_object)
            .and_then(|import| import.get("destination"))
            .and_then(Value::as_str)
        {
            if canonical_relative_path(destination) {
                self.observe_destination(path, destination, report);
            }
        }
    }

    fn observe_component_registry(
        &mut self,
        path: &str,
        record: &serde_json::Map<String, Value>,
        report: &mut ValidationReport,
    ) {
        let Some(components) = record.get("components").and_then(Value::as_array) else {
            return;
        };
        let mut local_ids = BTreeSet::new();
        for component in components {
            let Some(id) = component
                .as_object()
                .and_then(|component| component.get("id"))
                .and_then(Value::as_str)
            else {
                continue;
            };
            if canonical_id(id, true) && local_ids.insert(id) {
                self.observe_id(path, "$.components", id, report);
            }
        }
    }

    fn observe_policy(
        &mut self,
        path: &str,
        record: &serde_json::Map<String, Value>,
        report: &mut ValidationReport,
    ) {
        if let Some(id) = record.get("id").and_then(Value::as_str) {
            if canonical_id(id, true) {
                self.observe_id(path, "$.id", id, report);
            }
        }
    }

    fn observe_id(
        &mut self,
        path: &str,
        field: &str,
        id: &str,
        report: &mut ValidationReport,
    ) {
        if self.ids.insert(id.to_owned(), path.to_owned()).is_some() {
            push_once(
                report,
                Diagnostic {
                    path: path.to_owned(),
                    code: "SCHEMA_DUPLICATE_ID",
                    field: field.to_owned(),
                    message: format!("duplicate `{id}`"),
                },
            );
        }
    }

    fn observe_destination(
        &mut self,
        path: &str,
        destination: &str,
        report: &mut ValidationReport,
    ) {
        if self
            .destinations
            .insert(destination.to_owned(), path.to_owned())
            .is_some()
        {
            push_once(
                report,
                Diagnostic {
                    path: path.to_owned(),
                    code: "PATH_DUPLICATE_DESTINATION",
                    field: "$.import.destination".to_owned(),
                    message: format!("duplicate `{destination}`"),
                },
            );
        }
    }
}

fn push_once(report: &mut ValidationReport, diagnostic: Diagnostic) {
    if !report.diagnostics.iter().any(|existing| existing == &diagnostic) {
        report.diagnostics.push(diagnostic);
    }
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

fn canonical_relative_path(value: &str) -> bool {
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
    use serde_json::json;

    #[test]
    fn invalid_record_can_still_contribute_valid_semantic_claims() {
        let first = json!({
            "kind": "source_import",
            "id": "shared-id",
            "import": {"destination": "src/shared.rs"}
        });
        let second = json!({
            "kind": "source_import",
            "id": "shared-id",
            "import": {"destination": "src/other.rs"}
        });
        let mut tracker = ClaimTracker::default();
        let mut report = ValidationReport {
            diagnostics: Vec::new(),
        };
        tracker.observe(
            "a.json",
            &serde_json::to_vec(&first).unwrap(),
            &mut report,
        );
        tracker.observe(
            "b.json",
            &serde_json::to_vec(&second).unwrap(),
            &mut report,
        );
        assert!(
            report
                .diagnostics
                .iter()
                .any(|diagnostic| diagnostic.code == "SCHEMA_DUPLICATE_ID")
        );
    }

    #[test]
    fn utf8_relative_paths_are_canonical_claims() {
        assert!(canonical_relative_path("src/ملف.rs"));
        for value in [
            "../ملف.rs",
            "src/\nrecord.rs",
            "src/\rrecord.rs",
            "src/\u{2028}record.rs",
            "src/\u{2029}record.rs",
        ] {
            assert!(!canonical_relative_path(value), "{value:?}");
        }
    }
}
