use crate::{Diagnostic, ValidationReport};
use serde_json::Value;

pub(crate) fn augment_bytes(path: &str, bytes: &[u8], report: &mut ValidationReport) {
    let Ok(Value::Object(record)) = serde_json::from_slice::<Value>(bytes) else {
        return;
    };
    if record.get("kind").and_then(Value::as_str) != Some("component_registry") {
        return;
    }
    let Some(components) = record.get("components").and_then(Value::as_array) else {
        return;
    };

    for (component_index, component) in components.iter().enumerate() {
        let Some(evidence) = component
            .as_object()
            .and_then(|component| component.get("distribution_review"))
            .and_then(Value::as_object)
            .and_then(|review| review.get("evidence"))
            .and_then(Value::as_array)
        else {
            continue;
        };

        for (evidence_index, item) in evidence.iter().enumerate() {
            if item.as_str() == Some("") {
                report.diagnostics.push(Diagnostic {
                    path: path.to_owned(),
                    code: "SCHEMA_LENGTH",
                    field: format!(
                        "$.components[{component_index}].distribution_review.evidence[{evidence_index}]"
                    ),
                    message: "string item must not be empty".to_owned(),
                });
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn empty_distribution_review_evidence_is_rejected() {
        let value = json!({
            "kind": "component_registry",
            "components": [{
                "distribution_review": {"evidence": [""]}
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
            diagnostic.code == "SCHEMA_LENGTH"
                && diagnostic.field == "$.components[0].distribution_review.evidence[0]"
        }));
    }
}
