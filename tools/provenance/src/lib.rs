mod alignment;
mod claims;
mod component_review_alignment;
mod notice;
mod repository_alignment;
mod restricted_policy;
mod secure_io;
mod sha256;
mod spdx_policy;
mod validation;
mod verify_source;

use serde_json::{Map, Value};
use std::collections::HashSet;
use std::path::{Component, Path};

pub use validation::{
    CanonicalRecord, ComponentRegistryRecord, Diagnostic, MAX_RECORD_BYTES, MAX_TOTAL_BYTES,
    PolicyRecord, SourceImportRecord, ValidationReport,
};

pub const EXIT_SUCCESS: u8 = 0;
pub const EXIT_VALIDATION_FAILURE: u8 = 1;
pub const EXIT_USAGE_ERROR: u8 = 2;
pub const EXIT_LOCAL_IO_UNAVAILABLE: u8 = 3;
pub const EXIT_INTERNAL_INVARIANT: u8 = 4;

pub const HELP: &str = "Usage: signthos-provenance <COMMAND>\n\nCommands:\n  validate [--json] [PATH ...]                 Validate canonical provenance records\n  verify-source --record <id> --source-root <path>  Verify source facts against a caller-supplied local checkout\n  notice [--check]                             Generate or byte-check deterministic NOTICE output\n  explain                                      Explain a canonical provenance record\n\nGrain H implements offline local source verification without fetch or clone. The explain command remains reserved for a later owning grain.\n";

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CliResult {
    pub code: u8,
    pub stdout: String,
    pub stderr: String,
}

pub fn dependency_sanity() -> bool {
    spdx::Expression::parse("MIT OR Apache-2.0").is_ok()
        && serde_json::from_str::<serde_json::Value>(r#"{"ok":true}"#).is_ok()
}

pub fn validate_bytes(path: &str, bytes: &[u8]) -> ValidationReport {
    let mut report = if bytes.len() as u64 <= MAX_RECORD_BYTES && is_v2_source_import(bytes) {
        validate_v2_source_import(path, bytes)
    } else {
        validation::validate_bytes(path, bytes)
    };
    if bytes.len() as u64 <= MAX_RECORD_BYTES {
        alignment::augment_bytes(path, bytes, &mut report);
        component_review_alignment::augment_bytes(path, bytes, &mut report);
        repository_alignment::augment_bytes(path, bytes, &mut report);
        spdx_policy::augment_bytes(path, bytes, &mut report);
        restricted_policy::augment_bytes(path, bytes, &mut report);
    }
    sort_report(&mut report);
    report
}

fn is_v2_source_import(bytes: &[u8]) -> bool {
    let Ok(Value::Object(record)) = serde_json::from_slice::<Value>(bytes) else {
        return false;
    };
    record.get("kind").and_then(Value::as_str) == Some("source_import")
        && record.get("schema_version").and_then(Value::as_u64) == Some(2)
}

fn validate_v2_source_import(path: &str, bytes: &[u8]) -> ValidationReport {
    let value: Value = match serde_json::from_slice(bytes) {
        Ok(value) => value,
        Err(error) => {
            return ValidationReport {
                diagnostics: vec![Diagnostic {
                    path: path.to_owned(),
                    code: "JSON_SYNTAX",
                    field: "$".to_owned(),
                    message: error.to_string(),
                }],
            };
        }
    };
    let Some(record) = value.as_object() else {
        return ValidationReport {
            diagnostics: vec![Diagnostic {
                path: path.to_owned(),
                code: "SCHEMA_TYPE",
                field: "$".to_owned(),
                message: "record must be an object".to_owned(),
            }],
        };
    };

    let mut validator = V2Validator {
        path,
        diagnostics: Vec::new(),
    };
    validator.source_import(record);
    let mut report = ValidationReport {
        diagnostics: validator.diagnostics,
    };
    sort_report(&mut report);
    report
}

struct V2Validator<'a> {
    path: &'a str,
    diagnostics: Vec<Diagnostic>,
}

impl V2Validator<'_> {
    fn source_import(&mut self, record: &Map<String, Value>) {
        self.keys(
            record,
            &[
                "schema_version",
                "kind",
                "id",
                "classification",
                "upstream",
                "license",
                "permission",
                "distribution",
                "import",
                "transformation",
                "review",
            ],
            &[
                "schema_version",
                "kind",
                "id",
                "classification",
                "upstream",
                "license",
                "permission",
                "distribution",
                "import",
                "transformation",
                "review",
            ],
            "$",
        );
        if !matches!(record.get("schema_version"), Some(Value::Number(number)) if number.as_u64() == Some(2))
        {
            self.push(
                "SCHEMA_VERSION",
                "$.schema_version",
                "expected integer 2",
            );
        }
        if record.get("kind").and_then(Value::as_str) != Some("source_import") {
            self.push("SCHEMA_VALUE", "$.kind", "expected `source_import`");
        }

        if let Some(id) = self.text(record, "id", "$.id") {
            if !v2_record_id(id) {
                self.push("SCHEMA_ID", "$.id", "invalid canonical id");
            }
        }

        let classification = self
            .text(record, "classification", "$.classification")
            .map(str::to_owned);
        if classification.as_deref().is_some_and(|value| {
            !matches!(
                value,
                "oss_permitted" | "separate_permission_required" | "restricted" | "unknown"
            )
        }) {
            self.push(
                "SCHEMA_VALUE",
                "$.classification",
                "unsupported source classification",
            );
        }

        self.upstream(record);
        let unresolved_license = self.license(record);
        self.permission(record);
        self.distribution(record);
        self.import(record);
        self.transformation(record);
        self.review(record);

        if unresolved_license
            && classification.as_deref() != Some("separate_permission_required")
        {
            self.push(
                "LICENSE_RIGHTS_BASIS",
                "$.classification",
                "unresolved public license evidence is import-ready only with a separate permission rights basis",
            );
        }
    }

    fn upstream(&mut self, record: &Map<String, Value>) {
        let Some(upstream) = self.object(record, "upstream", "$.upstream") else {
            return;
        };
        self.keys(
            upstream,
            &["repository", "commit", "path", "sha256", "copyright_holder"],
            &["repository", "commit", "path", "sha256", "copyright_holder"],
            "$.upstream",
        );
        if let Some(repository) = self.text(upstream, "repository", "$.upstream.repository") {
            if !v2_repo_id(repository) {
                self.push(
                    "SOURCE_REPOSITORY",
                    "$.upstream.repository",
                    "expected owner/repository",
                );
            }
        }
        if let Some(commit) = self.text(upstream, "commit", "$.upstream.commit") {
            if !v2_hex(commit, 40) {
                self.push(
                    "SOURCE_COMMIT",
                    "$.upstream.commit",
                    "expected 40 lowercase hex",
                );
            }
        }
        if let Some(source_path) = self.text(upstream, "path", "$.upstream.path") {
            if !v2_rel_path(source_path) {
                self.push(
                    "PATH_INVALID",
                    "$.upstream.path",
                    "expected normalized relative POSIX path",
                );
            }
        }
        if let Some(digest) = self.text(upstream, "sha256", "$.upstream.sha256") {
            if !v2_hex(digest, 64) {
                self.push(
                    "DIGEST_INVALID",
                    "$.upstream.sha256",
                    "expected 64 lowercase hex",
                );
            }
        }
        if let Some(holder) = self.text(
            upstream,
            "copyright_holder",
            "$.upstream.copyright_holder",
        ) {
            let length = holder.chars().count();
            if !(1..=512).contains(&length) {
                self.push(
                    "SCHEMA_LENGTH",
                    "$.upstream.copyright_holder",
                    "string length must be in 1..=512",
                );
            }
        }
    }

    fn license(&mut self, record: &Map<String, Value>) -> bool {
        let Some(license) = self.object(record, "license", "$.license") else {
            return false;
        };
        let classification = self
            .text(license, "classification", "$.license.classification")
            .map(str::to_owned);
        match classification.as_deref() {
            Some("spdx") => {
                self.keys(
                    license,
                    &["classification", "spdx", "evidence"],
                    &["classification", "spdx", "evidence"],
                    "$.license",
                );
                if let Some(spdx) = self.text(license, "spdx", "$.license.spdx") {
                    let length = spdx.chars().count();
                    if !(1..=256).contains(&length) {
                        self.push(
                            "SCHEMA_LENGTH",
                            "$.license.spdx",
                            "string length must be in 1..=256",
                        );
                    }
                }
                self.string_array(license, "evidence", "$.license.evidence", 1, Some(512));
                false
            }
            Some("unresolved_conflict") => {
                self.keys(
                    license,
                    &["classification", "evidence"],
                    &["classification", "evidence"],
                    "$.license",
                );
                self.string_array(license, "evidence", "$.license.evidence", 2, Some(512));
                true
            }
            Some("unresolved_unknown") => {
                self.keys(
                    license,
                    &["classification", "evidence"],
                    &["classification", "evidence"],
                    "$.license",
                );
                self.string_array(license, "evidence", "$.license.evidence", 1, Some(512));
                true
            }
            Some(_) => {
                self.keys(
                    license,
                    &["classification", "spdx", "evidence"],
                    &["classification", "evidence"],
                    "$.license",
                );
                self.push(
                    "LICENSE_CLASSIFICATION",
                    "$.license.classification",
                    "expected spdx, unresolved_conflict, or unresolved_unknown",
                );
                false
            }
            None => {
                self.keys(
                    license,
                    &["classification", "spdx", "evidence"],
                    &["classification", "evidence"],
                    "$.license",
                );
                false
            }
        }
    }

    fn permission(&mut self, record: &Map<String, Value>) {
        match record.get("permission") {
            Some(Value::Null) | None => {}
            Some(Value::Object(permission)) => {
                self.keys(
                    permission,
                    &["artifact", "scope"],
                    &["artifact", "scope"],
                    "$.permission",
                );
                if let Some(artifact) =
                    self.text(permission, "artifact", "$.permission.artifact")
                {
                    if artifact.chars().count() > 512 || !v2_permission_artifact_ref(artifact) {
                        self.push(
                            "PERMISSION_ARTIFACT",
                            "$.permission.artifact",
                            "expected canonical non-secret permission-artifact reference",
                        );
                    }
                }
                let scopes = self.string_array(
                    permission,
                    "scope",
                    "$.permission.scope",
                    1,
                    None,
                );
                if let Some(scopes) = scopes {
                    for (index, scope) in scopes.iter().enumerate() {
                        if !matches!(
                            *scope,
                            "copy"
                                | "modify"
                                | "create_derivative"
                                | "redistribute"
                                | "publish_source"
                                | "sublicense"
                                | "relicense"
                                | "commercial_use"
                        ) {
                            self.push(
                                "SCHEMA_VALUE",
                                format!("$.permission.scope[{index}]"),
                                "unsupported permission scope",
                            );
                        }
                    }
                }
            }
            Some(_) => self.push(
                "SCHEMA_TYPE",
                "$.permission",
                "permission must be null or object",
            ),
        }
    }

    fn distribution(&mut self, record: &Map<String, Value>) {
        let Some(distribution) = self.object(record, "distribution", "$.distribution") else {
            return;
        };
        self.keys(
            distribution,
            &["state", "evidence", "required_artifacts", "actions"],
            &["state", "evidence", "required_artifacts", "actions"],
            "$.distribution",
        );
        match self.text(distribution, "state", "$.distribution.state") {
            Some("resolved") | None => {}
            Some("unresolved" | "contradictory") => self.push(
                "DISTRIBUTION_STATUS",
                "$.distribution.state",
                "distribution and notice obligations must be resolved before import-ready state",
            ),
            Some(_) => self.push(
                "SCHEMA_VALUE",
                "$.distribution.state",
                "expected resolved, unresolved, or contradictory",
            ),
        }
        self.string_array(
            distribution,
            "evidence",
            "$.distribution.evidence",
            1,
            Some(512),
        );
        if let Some(artifacts) = self.string_array(
            distribution,
            "required_artifacts",
            "$.distribution.required_artifacts",
            0,
            Some(512),
        ) {
            for (index, artifact) in artifacts.iter().enumerate() {
                if !v2_rel_path(artifact) {
                    self.push(
                        "PATH_INVALID",
                        format!("$.distribution.required_artifacts[{index}]"),
                        "expected normalized relative POSIX path",
                    );
                }
            }
        }
        if let Some(actions) = self.string_array(
            distribution,
            "actions",
            "$.distribution.actions",
            1,
            None,
        ) {
            for (index, action) in actions.iter().enumerate() {
                if !matches!(*action, "redistribute" | "publish_source" | "commercial_use") {
                    self.push(
                        "SCHEMA_VALUE",
                        format!("$.distribution.actions[{index}]"),
                        "unsupported distribution action",
                    );
                }
            }
        }
    }

    fn import(&mut self, record: &Map<String, Value>) {
        let Some(import) = self.object(record, "import", "$.import") else {
            return;
        };
        self.keys(
            import,
            &["destination", "sha256", "date"],
            &["destination", "sha256", "date"],
            "$.import",
        );
        if let Some(destination) = self.text(import, "destination", "$.import.destination") {
            if !v2_rel_path(destination) {
                self.push(
                    "PATH_INVALID",
                    "$.import.destination",
                    "expected normalized relative POSIX path",
                );
            }
        }
        if let Some(digest) = self.text(import, "sha256", "$.import.sha256") {
            if !v2_hex(digest, 64) {
                self.push(
                    "DIGEST_INVALID",
                    "$.import.sha256",
                    "expected 64 lowercase hex",
                );
            }
        }
        if let Some(date) = self.text(import, "date", "$.import.date") {
            if !v2_date(date) {
                self.push(
                    "DATE_INVALID",
                    "$.import.date",
                    "expected real ASCII Gregorian YYYY-MM-DD",
                );
            }
        }
    }

    fn transformation(&mut self, record: &Map<String, Value>) {
        let Some(transformation) =
            self.object(record, "transformation", "$.transformation")
        else {
            return;
        };
        self.keys(
            transformation,
            &["kind", "notes", "derives_from"],
            &["kind", "notes", "derives_from"],
            "$.transformation",
        );
        if self
            .text(transformation, "kind", "$.transformation.kind")
            .is_some_and(|kind| {
                !matches!(
                    kind,
                    "copied"
                        | "adapted"
                        | "rewritten_with_source_reference"
                        | "generated_from_upstream"
                )
            })
        {
            self.push(
                "SCHEMA_VALUE",
                "$.transformation.kind",
                "unsupported transformation kind",
            );
        }
        if let Some(notes) = self.text(transformation, "notes", "$.transformation.notes") {
            if notes.chars().count() > 2048 {
                self.push(
                    "SCHEMA_LENGTH",
                    "$.transformation.notes",
                    "string length must be at most 2048",
                );
            }
        }
        if let Some(relations) = self.string_array(
            transformation,
            "derives_from",
            "$.transformation.derives_from",
            0,
            None,
        ) {
            for (index, relation) in relations.iter().enumerate() {
                if !v2_record_id(relation) {
                    self.push(
                        "SCHEMA_ID",
                        format!("$.transformation.derives_from[{index}]"),
                        "invalid canonical referenced id",
                    );
                }
            }
        }
    }

    fn review(&mut self, record: &Map<String, Value>) {
        let Some(review) = self.object(record, "review", "$.review") else {
            return;
        };
        self.keys(
            review,
            &["status", "pull_request", "evidence"],
            &["status", "pull_request", "evidence"],
            "$.review",
        );
        match self.text(review, "status", "$.review.status") {
            Some("qualified_exact_head") | None => {}
            Some("pending") => self.push(
                "REVIEW_STATUS",
                "$.review.status",
                "pending is not import-ready",
            ),
            Some("rejected") => self.push(
                "REVIEW_STATUS",
                "$.review.status",
                "rejected is not import-ready",
            ),
            Some(_) => self.push(
                "REVIEW_STATUS",
                "$.review.status",
                "unknown review status",
            ),
        }
        if !matches!(review.get("pull_request"), Some(Value::Number(number)) if number.as_u64().is_some_and(|value| value > 0))
        {
            self.push(
                "REVIEW_PR",
                "$.review.pull_request",
                "expected positive integer PR id",
            );
        }
        if let Some(evidence) =
            self.string_array(review, "evidence", "$.review.evidence", 1, None)
        {
            for (index, reference) in evidence.iter().enumerate() {
                if !v2_review_ref(reference) {
                    self.push(
                        "REVIEW_EVIDENCE",
                        format!("$.review.evidence[{index}]"),
                        "invalid immutable review evidence reference",
                    );
                }
            }
        }
    }

    fn keys(
        &mut self,
        object: &Map<String, Value>,
        allowed: &[&str],
        required: &[&str],
        field: &str,
    ) {
        for key in object.keys() {
            if !allowed.contains(&key.as_str()) {
                self.push(
                    "SCHEMA_UNKNOWN_FIELD",
                    format!("{field}.{key}"),
                    "unknown field",
                );
            }
        }
        for key in required {
            if !object.contains_key(*key) {
                self.push(
                    "SCHEMA_REQUIRED",
                    format!("{field}.{key}"),
                    "required field missing",
                );
            }
        }
    }

    fn object<'a>(
        &mut self,
        object: &'a Map<String, Value>,
        key: &str,
        field: &str,
    ) -> Option<&'a Map<String, Value>> {
        match object.get(key) {
            Some(Value::Object(value)) => Some(value),
            Some(_) => {
                self.push("SCHEMA_TYPE", field, "expected object");
                None
            }
            None => None,
        }
    }

    fn text<'a>(
        &mut self,
        object: &'a Map<String, Value>,
        key: &str,
        field: &str,
    ) -> Option<&'a str> {
        match object.get(key) {
            Some(Value::String(value)) => Some(value),
            Some(_) => {
                self.push("SCHEMA_TYPE", field, "expected string");
                None
            }
            None => None,
        }
    }

    fn string_array<'a>(
        &mut self,
        object: &'a Map<String, Value>,
        key: &str,
        field: &str,
        min_items: usize,
        max_item_length: Option<usize>,
    ) -> Option<Vec<&'a str>> {
        let Some(Value::Array(values)) = object.get(key) else {
            if object.contains_key(key) {
                self.push("SCHEMA_TYPE", field, "expected string array");
            }
            return None;
        };
        if values.len() < min_items {
            self.push(
                "SCHEMA_LENGTH",
                field,
                format!("array requires at least {min_items} item(s)"),
            );
        }
        let mut seen = HashSet::new();
        let mut output = Vec::with_capacity(values.len());
        for (index, value) in values.iter().enumerate() {
            let Some(value) = value.as_str() else {
                self.push(
                    "SCHEMA_TYPE",
                    format!("{field}[{index}]"),
                    "expected string",
                );
                continue;
            };
            if value.is_empty() {
                self.push(
                    "SCHEMA_EMPTY",
                    format!("{field}[{index}]"),
                    "must not be empty",
                );
            }
            if max_item_length.is_some_and(|maximum| value.chars().count() > maximum) {
                self.push(
                    "SCHEMA_LENGTH",
                    format!("{field}[{index}]"),
                    "string item exceeds maximum length",
                );
            }
            if !seen.insert(value) {
                self.push("SCHEMA_UNIQUE", field, "array items must be unique");
            }
            output.push(value);
        }
        Some(output)
    }

    fn push(
        &mut self,
        code: &'static str,
        field: impl Into<String>,
        message: impl Into<String>,
    ) {
        self.diagnostics.push(Diagnostic {
            path: self.path.to_owned(),
            code,
            field: field.into(),
            message: message.into(),
        });
    }
}

fn v2_record_id(value: &str) -> bool {
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

fn v2_repo_id(value: &str) -> bool {
    if !value.is_ascii() || value.contains('\\') {
        return false;
    }
    let mut parts = value.split('/');
    matches!(
        (parts.next(), parts.next(), parts.next()),
        (Some(owner), Some(repository), None)
            if v2_repo_segment(owner) && v2_repo_segment(repository)
    )
}

fn v2_repo_segment(value: &str) -> bool {
    !value.is_empty()
        && !matches!(value, "." | "..")
        && value
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'.' | b'_' | b'-'))
}

fn v2_hex(value: &str, length: usize) -> bool {
    value.len() == length
        && value
            .bytes()
            .all(|byte| byte.is_ascii_digit() || (b'a'..=b'f').contains(&byte))
}

fn v2_rel_path(value: &str) -> bool {
    if value.is_empty()
        || value.starts_with('/')
        || value.ends_with('/')
        || value.contains('\\')
        || value
            .chars()
            .any(|character| matches!(character, '\n' | '\r' | '\u{2028}' | '\u{2029}'))
        || has_windows_drive_prefix(value)
    {
        return false;
    }
    value
        .split('/')
        .all(|segment| !segment.is_empty() && segment != "." && segment != "..")
}

fn v2_permission_artifact_ref(value: &str) -> bool {
    let Some(id) = value.strip_prefix("permission-artifact:") else {
        return false;
    };
    if id.is_empty() || id.len() > 96 {
        return false;
    }
    let bytes = id.as_bytes();
    bytes.first().is_some_and(u8::is_ascii_alphanumeric)
        && bytes.last().is_some_and(u8::is_ascii_alphanumeric)
        && bytes.iter().all(|byte| {
            byte.is_ascii_lowercase()
                || byte.is_ascii_digit()
                || matches!(byte, b'.' | b'_' | b'-')
        })
}

fn v2_review_ref(value: &str) -> bool {
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

fn v2_date(value: &str) -> bool {
    let bytes = value.as_bytes();
    if bytes.len() != 10
        || bytes[4] != b'-'
        || bytes[7] != b'-'
        || !bytes
            .iter()
            .enumerate()
            .all(|(index, byte)| matches!(index, 4 | 7) || byte.is_ascii_digit())
    {
        return false;
    }

    let number = |slice: &[u8]| {
        slice
            .iter()
            .fold(0_u32, |value, byte| value * 10 + u32::from(*byte - b'0'))
    };
    let year = number(&bytes[..4]);
    let month = number(&bytes[5..7]);
    let day = number(&bytes[8..]);
    if !(1..=9999).contains(&year) || !(1..=12).contains(&month) {
        return false;
    }
    let leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    let maximum_day = match month {
        1 | 3 | 5 | 7 | 8 | 10 | 12 => 31,
        4 | 6 | 9 | 11 => 30,
        2 if leap => 29,
        2 => 28,
        _ => return false,
    };
    (1..=maximum_day).contains(&day)
}

pub fn validate_paths(paths: &[String]) -> Result<ValidationReport, String> {
    for path in paths {
        validate_repository_relative_path(path)?;
    }

    let mut canonical_paths = paths.to_vec();
    canonical_paths.sort();
    canonical_paths.dedup();

    let mut report = ValidationReport {
        diagnostics: Vec::new(),
    };
    let mut total = 0_u64;
    let mut claim_tracker = claims::ClaimTracker::default();

    for path in &canonical_paths {
        let bytes = secure_io::read_record_bounded(path)?;
        let size = bytes.len() as u64;
        total = total.saturating_add(size);

        if size > MAX_RECORD_BYTES {
            report.diagnostics.push(Diagnostic {
                path: path.to_owned(),
                code: "SIZE_RECORD",
                field: "$".to_owned(),
                message: format!("record exceeds {MAX_RECORD_BYTES} byte limit"),
            });
        }

        if total > MAX_TOTAL_BYTES {
            report.diagnostics.push(Diagnostic {
                path: path.to_owned(),
                code: "SIZE_TOTAL",
                field: "$".to_owned(),
                message: format!("run exceeds {MAX_TOTAL_BYTES} bytes"),
            });
            break;
        }

        if size > MAX_RECORD_BYTES {
            continue;
        }

        let mut current = validate_bytes(path, &bytes);
        report.diagnostics.append(&mut current.diagnostics);
        claim_tracker.observe(path, &bytes, &mut report);
    }

    sort_report(&mut report);
    Ok(report)
}

fn validate_repository_relative_path(path: &str) -> Result<(), String> {
    if path.is_empty()
        || Path::new(path).is_absolute()
        || path.starts_with('\\')
        || has_windows_drive_prefix(path)
        || path.contains('\\')
        || path
            .split('/')
            .any(|segment| segment.is_empty() || segment == "." || segment == "..")
        || Path::new(path)
            .components()
            .any(|component| !matches!(component, Component::Normal(_)))
    {
        return Err(format!(
            "IO_PATH: {path}: canonical validation requires a normalized repository-relative POSIX path"
        ));
    }
    Ok(())
}

fn has_windows_drive_prefix(path: &str) -> bool {
    let bytes = path.as_bytes();
    bytes.len() >= 2 && bytes[0].is_ascii_alphabetic() && bytes[1] == b':'
}

pub fn run(args: &[&str]) -> CliResult {
    match args {
        ["-h"] | ["--help"] => success(HELP),
        ["-V"] | ["--version"] => success(&format!(
            "{} {}\n",
            env!("CARGO_PKG_NAME"),
            env!("CARGO_PKG_VERSION")
        )),
        [] => usage("CLI_USAGE: a command is required; use --help\n"),
        ["validate", rest @ ..] => run_validate(rest),
        ["verify-source", rest @ ..] => run_verify_source(rest),
        ["notice", rest @ ..] => run_notice(rest),
        ["explain", ..] => usage(
            "CLI_BOOTSTRAP_UNAVAILABLE: command is reserved but not implemented in this grain\n",
        ),
        _ => usage("CLI_USAGE: unknown command or arguments; use --help\n"),
    }
}

fn run_verify_source(args: &[&str]) -> CliResult {
    let (record_id, source_root) = match args {
        ["--record", record_id, "--source-root", source_root] => (*record_id, *source_root),
        _ => {
            return usage("CLI_USAGE: verify-source requires --record <id> --source-root <path>\n");
        }
    };

    match verify_source::verify_source(record_id, source_root) {
        Ok(message) => success(&message),
        Err(verify_source::VerifySourceError::Verification(message)) => CliResult {
            code: EXIT_VALIDATION_FAILURE,
            stdout: String::new(),
            stderr: format!("{message}\n"),
        },
        Err(verify_source::VerifySourceError::Io(message)) => io_error(&format!("{message}\n")),
    }
}

fn run_notice(args: &[&str]) -> CliResult {
    let check = match args {
        [] => false,
        ["--check"] => true,
        _ => return usage("CLI_USAGE: notice accepts only optional --check\n"),
    };

    let expected = match notice::generate_canonical_notice() {
        Ok(expected) => expected,
        Err(notice::NoticeError::Validation(report)) => {
            return CliResult {
                code: EXIT_VALIDATION_FAILURE,
                stdout: String::new(),
                stderr: report.render_text(),
            };
        }
        Err(notice::NoticeError::Io(message)) => return io_error(&format!("{message}\n")),
    };

    if !check {
        return success(&expected);
    }

    match notice::notice_is_current(&expected) {
        Ok(true) => success("NOTICE_CURRENT\n"),
        Ok(false) => CliResult {
            code: EXIT_VALIDATION_FAILURE,
            stdout: String::new(),
            stderr: "NOTICE_DRIFT: NOTICE differs from deterministic canonical projection\n"
                .to_owned(),
        },
        Err(message) => io_error(&format!("{message}\n")),
    }
}

fn run_validate(args: &[&str]) -> CliResult {
    let mut json = false;
    let mut paths = Vec::new();
    for arg in args {
        match *arg {
            "--json" if !json => json = true,
            "--json" => return usage("CLI_USAGE: --json may be specified only once\n"),
            value if value.starts_with('-') => {
                return usage("CLI_USAGE: unsupported validate option\n");
            }
            value => paths.push(value.to_owned()),
        }
    }

    let paths = if paths.is_empty() {
        match default_validation_paths() {
            Ok(paths) => paths,
            Err(message) => return io_error(&message),
        }
    } else {
        paths
    };

    match validate_paths(&paths) {
        Ok(report) if report.is_valid() => CliResult {
            code: EXIT_SUCCESS,
            stdout: if json {
                report.render_json()
            } else {
                "VALID\n".to_owned()
            },
            stderr: String::new(),
        },
        Ok(report) => CliResult {
            code: EXIT_VALIDATION_FAILURE,
            stdout: if json {
                report.render_json()
            } else {
                String::new()
            },
            stderr: if json {
                String::new()
            } else {
                report.render_text()
            },
        },
        Err(message) => io_error(&format!("{message}\n")),
    }
}

fn default_validation_paths() -> Result<Vec<String>, String> {
    let candidates = [
        "provenance/components/registry.json",
        "provenance/imports",
        "provenance/policy",
    ];
    let mut paths = Vec::new();

    for candidate in candidates {
        validate_repository_relative_path(candidate)?;
        let metadata = match std::fs::symlink_metadata(candidate) {
            Ok(metadata) => metadata,
            Err(error) if error.kind() == std::io::ErrorKind::NotFound => continue,
            Err(error) => return Err(format!("IO_METADATA: {candidate}: {error}")),
        };
        if metadata.file_type().is_symlink() {
            return Err(format!(
                "IO_SYMLINK: {candidate}: canonical validation does not follow symlinks"
            ));
        }
        if metadata.is_file() {
            paths.push(candidate.to_owned());
        } else if metadata.is_dir() {
            collect_json_files(candidate, &mut paths)?;
        }
    }

    paths.sort();
    if paths.is_empty() {
        Err("IO_INPUTS: no canonical provenance records found".to_owned())
    } else {
        Ok(paths)
    }
}

fn collect_json_files(directory: &str, paths: &mut Vec<String>) -> Result<(), String> {
    validate_repository_relative_path(directory)?;
    secure_io::collect_json_files(directory, paths)
}

fn sort_report(report: &mut ValidationReport) {
    report.diagnostics.sort_by(|left, right| {
        (&left.path, left.code, &left.field, &left.message).cmp(&(
            &right.path,
            right.code,
            &right.field,
            &right.message,
        ))
    });
    report.diagnostics.dedup();
}

fn success(message: &str) -> CliResult {
    CliResult {
        code: EXIT_SUCCESS,
        stdout: message.to_owned(),
        stderr: String::new(),
    }
}

fn usage(message: &str) -> CliResult {
    CliResult {
        code: EXIT_USAGE_ERROR,
        stdout: String::new(),
        stderr: message.to_owned(),
    }
}

fn io_error(message: &str) -> CliResult {
    CliResult {
        code: EXIT_LOCAL_IO_UNAVAILABLE,
        stdout: String::new(),
        stderr: message.to_owned(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use std::path::PathBuf;
    use std::time::{SystemTime, UNIX_EPOCH};

    fn temp_root(label: &str) -> PathBuf {
        let nonce = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("system clock must be after Unix epoch")
            .as_nanos();
        PathBuf::from(format!(
            ".signthos-test-{label}-{}-{nonce}",
            std::process::id()
        ))
    }

    fn write_fixture(root: &Path, name: &str, bytes: &[u8]) -> String {
        fs::create_dir_all(root).expect("temporary directory is created");
        let path = root.join(name);
        fs::write(&path, bytes).expect("temporary fixture is written");
        path.to_string_lossy().replace('\\', "/")
    }

    #[test]
    fn exit_code_contract_is_stable() {
        assert_eq!(EXIT_SUCCESS, 0);
        assert_eq!(EXIT_VALIDATION_FAILURE, 1);
        assert_eq!(EXIT_USAGE_ERROR, 2);
        assert_eq!(EXIT_LOCAL_IO_UNAVAILABLE, 3);
        assert_eq!(EXIT_INTERNAL_INVARIANT, 4);
    }

    #[test]
    fn pinned_dependencies_are_callable() {
        assert!(dependency_sanity());
    }

    #[test]
    fn help_is_successful() {
        let result = run(&["--help"]);
        assert_eq!(result.code, EXIT_SUCCESS);
        assert!(result.stdout.contains("validate"));
        assert!(
            result
                .stdout
                .contains("verify-source --record <id> --source-root <path>")
        );
        assert!(result.stdout.contains("notice [--check]"));
    }

    #[test]
    fn verify_source_requires_exact_arguments() {
        for args in [
            vec!["verify-source"],
            vec!["verify-source", "--record", "record"],
            vec!["verify-source", "--source-root", ".", "--record", "record"],
        ] {
            let result = run(&args);
            assert_eq!(result.code, EXIT_USAGE_ERROR);
            assert!(result.stderr.contains("verify-source requires"));
        }
    }

    #[test]
    fn notice_rejects_unknown_arguments() {
        let result = run(&["notice", "--write"]);
        assert_eq!(result.code, EXIT_USAGE_ERROR);
        assert!(
            result
                .stderr
                .contains("notice accepts only optional --check")
        );
    }

    #[test]
    fn validate_paths_rejects_non_relative_or_noncanonical_paths_before_io() {
        for path in [
            "/record.json",
            "C:/record.json",
            "C:record.json",
            "\\record.json",
            "dir\\record.json",
            "../record.json",
            "dir/../record.json",
            "./record.json",
            "dir//record.json",
        ] {
            let error = validate_paths(&[path.to_owned()]).unwrap_err();
            assert!(error.starts_with("IO_PATH:"), "{path}: {error}");
        }
    }

    #[cfg(target_os = "linux")]
    #[test]
    fn explicit_duplicate_path_order_is_deterministic() {
        let root = temp_root("duplicate-order");
        let first = write_fixture(
            &root,
            "a.json",
            include_bytes!("../../../provenance/fixtures/multi/duplicate-destination-a.json"),
        );
        let second = write_fixture(
            &root,
            "b.json",
            include_bytes!("../../../provenance/fixtures/multi/duplicate-destination-b.json"),
        );

        let forward = validate_paths(&[first.clone(), second.clone()]).unwrap();
        let reverse = validate_paths(&[second, first]).unwrap();
        let _ = fs::remove_dir_all(&root);
        assert_eq!(forward, reverse);
    }

    #[cfg(target_os = "linux")]
    #[test]
    fn repeated_explicit_path_is_idempotent() {
        let root = temp_root("repeat");
        let fixture = write_fixture(
            &root,
            "record.json",
            include_bytes!("../../../provenance/fixtures/valid/source-import.json"),
        );

        let once = validate_paths(std::slice::from_ref(&fixture)).unwrap();
        let repeated = validate_paths(&[fixture.clone(), fixture]).unwrap();
        let _ = fs::remove_dir_all(&root);
        assert_eq!(once, repeated);
        assert!(repeated.is_valid(), "{}", repeated.render_text());
    }

    #[cfg(target_os = "linux")]
    #[test]
    fn oversized_records_contribute_to_total_limit() {
        let root = temp_root("oversized-total");
        fs::create_dir_all(&root).expect("temporary directory is created");
        let bytes = vec![b'x'; (MAX_RECORD_BYTES + 1) as usize];
        let mut paths = Vec::new();
        for index in 0..4 {
            let path = root.join(format!("oversized-{index}.json"));
            fs::write(&path, &bytes).expect("temporary oversized fixture is written");
            paths.push(path.to_string_lossy().replace('\\', "/"));
        }

        let report = validate_paths(&paths).expect("temporary fixtures are readable");
        let _ = fs::remove_dir_all(&root);

        assert_eq!(
            report
                .diagnostics
                .iter()
                .filter(|diagnostic| diagnostic.code == "SIZE_RECORD")
                .count(),
            4
        );
        assert!(
            report
                .diagnostics
                .iter()
                .any(|diagnostic| diagnostic.code == "SIZE_TOTAL")
        );
    }

    #[cfg(target_os = "linux")]
    #[test]
    fn explicit_parent_symlink_is_rejected() {
        use std::os::unix::fs::symlink;

        let root = temp_root("parent-symlink");
        let external = temp_root("external");
        fs::create_dir_all(&root).expect("temporary directory is created");
        fs::create_dir_all(&external).expect("external directory is created");
        fs::write(external.join("record.json"), b"{}").expect("external fixture is written");
        symlink(&external, root.join("linked")).expect("directory symlink is created");

        let path = root
            .join("linked/record.json")
            .to_string_lossy()
            .replace('\\', "/");
        let error = validate_paths(&[path]).unwrap_err();
        let _ = fs::remove_dir_all(&root);
        let _ = fs::remove_dir_all(&external);
        assert!(error.starts_with("IO_SECURE_TRAVERSAL:"));
    }
}
