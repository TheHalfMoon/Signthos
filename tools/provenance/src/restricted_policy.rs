use crate::{Diagnostic, ValidationReport};
use serde_json::{Map, Value};
use std::collections::{BTreeSet, HashSet};

const RESTRICTED_POLICY_JSON: &str =
    include_str!("../../../provenance/policy/restricted-paths.json");
const PERMISSION_ARTIFACT_PREFIX: &str = "permission-artifact:";

#[derive(Debug, Clone, PartialEq, Eq)]
struct Rule {
    id: String,
    effect: String,
    repository: String,
    path_prefix: String,
    permission_scopes: Vec<String>,
}

pub(crate) fn augment_bytes(path: &str, bytes: &[u8], report: &mut ValidationReport) {
    let Ok(Value::Object(record)) = serde_json::from_slice::<Value>(bytes) else {
        return;
    };

    match record.get("kind").and_then(Value::as_str) {
        Some("source_import") => source_import(path, &record, report),
        Some("policy")
            if record.get("policy_type").and_then(Value::as_str) == Some("restricted_paths") =>
        {
            restricted_policy(path, &record, report)
        }
        _ => {}
    }
}

fn source_import(path: &str, record: &Map<String, Value>, report: &mut ValidationReport) {
    let Some(classification) = record.get("classification").and_then(Value::as_str) else {
        return;
    };
    let Some(upstream) = record.get("upstream").and_then(Value::as_object) else {
        return;
    };
    let (Some(repository), Some(upstream_path)) = (
        upstream.get("repository").and_then(Value::as_str),
        upstream.get("path").and_then(Value::as_str),
    ) else {
        return;
    };

    if matches!(classification, "restricted" | "unknown") {
        push(
            report,
            path,
            "RESTRICTED_PATH_CLASSIFICATION",
            "$.classification",
            "restricted and unknown source classifications are not import-ready",
        );
        return;
    }

    let rules = match load_rules() {
        Ok(rules) => rules,
        Err(message) => {
            push(
                report,
                path,
                "RESTRICTED_PATH_POLICY_CONFIG",
                "$",
                message,
            );
            return;
        }
    };

    let selected = select_rule(repository, upstream_path, &rules);
    if selected.is_some_and(|rule| rule.effect == "deny") {
        push(
            report,
            path,
            "RESTRICTED_PATH_DENY",
            "$.upstream.path",
            "upstream path is denied by the canonical restricted-path policy",
        );
        return;
    }

    let mut required_scopes = BTreeSet::new();
    let mut permission_required = classification == "separate_permission_required";

    if let Some(rule) = selected {
        if rule.effect == "require_permission" {
            permission_required = true;
            required_scopes.extend(rule.permission_scopes.iter().map(String::as_str));
        }
    }

    if !permission_required {
        return;
    }

    required_scopes.extend(transformation_scopes(record));
    validate_permission(path, record, &required_scopes, report);
}

fn restricted_policy(path: &str, record: &Map<String, Value>, report: &mut ValidationReport) {
    let Some(rules) = record.get("rules").and_then(Value::as_array) else {
        return;
    };
    let mut ids = HashSet::new();

    for (index, value) in rules.iter().enumerate() {
        let Some(rule) = value.as_object() else {
            continue;
        };
        let field = format!("$.rules[{index}]");
        let id = rule.get("id").and_then(Value::as_str).unwrap_or_default();
        if !id.is_empty() && !ids.insert(id) {
            push(
                report,
                path,
                "RESTRICTED_PATH_POLICY",
                &format!("{field}.id"),
                "duplicate restricted-path policy rule id",
            );
        }

        let effect = rule.get("effect").and_then(Value::as_str).unwrap_or_default();
        if !matches!(effect, "allow" | "deny" | "require_permission") {
            push(
                report,
                path,
                "RESTRICTED_PATH_POLICY",
                &format!("{field}.effect"),
                "restricted-path rules must use allow, deny, or require_permission",
            );
        }

        for key in ["repository", "path_prefix"] {
            if rule.get(key).and_then(Value::as_str).is_none() {
                push(
                    report,
                    path,
                    "RESTRICTED_PATH_POLICY",
                    &format!("{field}.{key}"),
                    "restricted-path rules require repository and path_prefix",
                );
            }
        }

        let scopes = rule.get("permission_scopes").and_then(Value::as_array);
        match effect {
            "require_permission" if scopes.is_none_or(Vec::is_empty) => push(
                report,
                path,
                "PERMISSION_POLICY",
                &format!("{field}.permission_scopes"),
                "require_permission rules require at least one permission scope",
            ),
            "allow" | "deny" if scopes.is_some() => push(
                report,
                path,
                "PERMISSION_POLICY",
                &format!("{field}.permission_scopes"),
                "only require_permission rules may declare permission scopes",
            ),
            _ => {}
        }
    }
}

fn load_rules() -> Result<Vec<Rule>, &'static str> {
    let policy: Value = serde_json::from_str(RESTRICTED_POLICY_JSON)
        .map_err(|_| "embedded restricted-path policy is invalid JSON")?;
    let rules = policy
        .get("rules")
        .and_then(Value::as_array)
        .ok_or("embedded restricted-path policy has no rules array")?;

    let mut parsed = Vec::with_capacity(rules.len());
    for value in rules {
        let rule = value
            .as_object()
            .ok_or("embedded restricted-path policy contains a non-object rule")?;
        let id = required_string(rule, "id")?;
        let effect = required_string(rule, "effect")?;
        let repository = required_string(rule, "repository")?;
        let path_prefix = required_string(rule, "path_prefix")?;
        let permission_scopes = match rule.get("permission_scopes") {
            Some(Value::Array(values)) => values
                .iter()
                .map(|value| {
                    value
                        .as_str()
                        .map(str::to_owned)
                        .ok_or("embedded permission scope must be a string")
                })
                .collect::<Result<Vec<_>, _>>()?,
            None => Vec::new(),
            Some(_) => return Err("embedded permission scopes must be an array"),
        };
        parsed.push(Rule {
            id,
            effect,
            repository,
            path_prefix,
            permission_scopes,
        });
    }
    Ok(parsed)
}

fn required_string(object: &Map<String, Value>, key: &str) -> Result<String, &'static str> {
    object
        .get(key)
        .and_then(Value::as_str)
        .filter(|value| !value.is_empty())
        .map(str::to_owned)
        .ok_or("embedded restricted-path rule is missing a required string")
}

fn select_rule<'a>(repository: &str, path: &str, rules: &'a [Rule]) -> Option<&'a Rule> {
    rules
        .iter()
        .filter(|rule| rule.repository == repository && path_matches(&rule.path_prefix, path))
        .max_by_key(|rule| (specificity(&rule.path_prefix), effect_rank(&rule.effect)))
}

fn path_matches(prefix: &str, path: &str) -> bool {
    path == prefix
        || path
            .strip_prefix(prefix)
            .is_some_and(|remainder| remainder.starts_with('/'))
}

fn specificity(prefix: &str) -> usize {
    prefix.split('/').count()
}

fn effect_rank(effect: &str) -> u8 {
    match effect {
        "deny" => 3,
        "require_permission" => 2,
        "allow" => 1,
        _ => 0,
    }
}

fn transformation_scopes(record: &Map<String, Value>) -> BTreeSet<&'static str> {
    let mut scopes = BTreeSet::new();
    let kind = record
        .get("transformation")
        .and_then(Value::as_object)
        .and_then(|value| value.get("kind"))
        .and_then(Value::as_str);

    match kind {
        Some("copied") => {
            scopes.insert("copy");
        }
        Some("adapted") => {
            scopes.extend(["copy", "modify", "create_derivative"]);
        }
        Some("rewritten_with_source_reference") => {
            scopes.insert("create_derivative");
        }
        Some("generated_from_upstream") => {
            scopes.extend(["copy", "create_derivative"]);
        }
        _ => {}
    }
    scopes
}

fn validate_permission(
    path: &str,
    record: &Map<String, Value>,
    required_scopes: &BTreeSet<&str>,
    report: &mut ValidationReport,
) {
    let Some(permission) = record.get("permission").and_then(Value::as_object) else {
        push(
            report,
            path,
            "PERMISSION_REQUIRED",
            "$.permission",
            "this source import requires a permission artifact and minimum scopes",
        );
        return;
    };

    match permission.get("artifact").and_then(Value::as_str) {
        Some(value) if permission_artifact_ref(value) => {}
        _ => push(
            report,
            path,
            "PERMISSION_ARTIFACT",
            "$.permission.artifact",
            "expected canonical non-secret permission-artifact reference",
        ),
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

    for required in required_scopes {
        if !granted.contains(required) {
            push(
                report,
                path,
                "PERMISSION_SCOPE",
                "$.permission.scope",
                &format!("missing required permission scope `{required}`"),
            );
        }
    }
}

fn permission_artifact_ref(value: &str) -> bool {
    let Some(id) = value.strip_prefix(PERMISSION_ARTIFACT_PREFIX) else {
        return false;
    };
    if id.is_empty() || id.len() > 96 {
        return false;
    }
    let bytes = id.as_bytes();
    if !bytes.first().is_some_and(u8::is_ascii_alphanumeric)
        || !bytes.last().is_some_and(u8::is_ascii_alphanumeric)
    {
        return false;
    }
    bytes.iter().all(|byte| {
        byte.is_ascii_lowercase() || byte.is_ascii_digit() || matches!(byte, b'.' | b'_' | b'-')
    })
}

fn push(
    report: &mut ValidationReport,
    path: &str,
    code: &'static str,
    field: &str,
    message: &str,
) {
    report.diagnostics.push(Diagnostic {
        path: path.to_owned(),
        code,
        field: field.to_owned(),
        message: message.to_owned(),
    });
}
