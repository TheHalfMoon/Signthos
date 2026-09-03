use serde_json::{Map, Value};
use std::collections::HashSet;
use std::fmt::Write as _;

pub const MAX_RECORD_BYTES: u64 = 1_048_576;
pub const MAX_TOTAL_BYTES: u64 = 4_194_304;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Diagnostic {
    pub path: String,
    pub code: &'static str,
    pub field: String,
    pub message: String,
}

impl Diagnostic {
    fn new(
        path: &str,
        code: &'static str,
        field: impl Into<String>,
        message: impl Into<String>,
    ) -> Self {
        Self {
            path: path.into(),
            code,
            field: field.into(),
            message: message.into(),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ValidationReport {
    pub diagnostics: Vec<Diagnostic>,
}

impl ValidationReport {
    pub fn is_valid(&self) -> bool {
        self.diagnostics.is_empty()
    }

    pub fn render_text(&self) -> String {
        let mut rendered = String::new();
        for diagnostic in &self.diagnostics {
            writeln!(
                rendered,
                "{}: {} [{}]: {}",
                diagnostic.path, diagnostic.code, diagnostic.field, diagnostic.message
            )
            .expect("writing diagnostics to String cannot fail");
        }
        rendered
    }

    pub fn render_json(&self) -> String {
        let diagnostics: Vec<Value> = self
            .diagnostics
            .iter()
            .map(|diagnostic| {
                serde_json::json!({
                    "path": diagnostic.path,
                    "code": diagnostic.code,
                    "field": diagnostic.field,
                    "message": diagnostic.message
                })
            })
            .collect();
        serde_json::to_string(&serde_json::json!({
            "valid": self.is_valid(),
            "diagnostics": diagnostics
        }))
        .expect("diagnostics serialize")
            + "\n"
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct SourceImportRecord {
    pub id: String,
    pub destination: String,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ComponentRegistryRecord {
    pub ids: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PolicyRecord {
    pub id: String,
    pub policy_type: String,
    pub policy_version: u64,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum CanonicalRecord {
    SourceImport(SourceImportRecord),
    ComponentRegistry(ComponentRegistryRecord),
    Policy(PolicyRecord),
}

pub fn validate_bytes(path: &str, bytes: &[u8]) -> ValidationReport {
    let mut diagnostics = if bytes.len() as u64 > MAX_RECORD_BYTES {
        vec![Diagnostic::new(
            path,
            "SIZE_RECORD",
            "$",
            "record exceeds byte limit",
        )]
    } else {
        match parse_record(path, bytes) {
            Ok(_) => Vec::new(),
            Err(found) => found,
        }
    };
    sort(&mut diagnostics);
    ValidationReport { diagnostics }
}

fn parse_record(path: &str, bytes: &[u8]) -> Result<CanonicalRecord, Vec<Diagnostic>> {
    let value: Value = serde_json::from_slice(bytes)
        .map_err(|error| vec![Diagnostic::new(path, "JSON_SYNTAX", "$", error.to_string())])?;
    let object = value.as_object().ok_or_else(|| {
        vec![Diagnostic::new(
            path,
            "SCHEMA_TYPE",
            "$",
            "record must be an object",
        )]
    })?;

    match object.get("kind").and_then(Value::as_str) {
        Some("source_import") => source_import(path, object).map(CanonicalRecord::SourceImport),
        Some("component_registry") => {
            component_registry(path, object).map(CanonicalRecord::ComponentRegistry)
        }
        Some("policy") => policy(path, object).map(CanonicalRecord::Policy),
        Some(kind) => Err(vec![Diagnostic::new(
            path,
            "SCHEMA_KIND",
            "$.kind",
            format!("unsupported kind `{kind}`"),
        )]),
        None => Err(vec![Diagnostic::new(
            path,
            "SCHEMA_REQUIRED",
            "$.kind",
            "kind is required",
        )]),
    }
}

fn source_import(
    path: &str,
    record: &Map<String, Value>,
) -> Result<SourceImportRecord, Vec<Diagnostic>> {
    let mut diagnostics = Vec::new();
    keys(
        path,
        record,
        &[
            "schema_version",
            "kind",
            "id",
            "classification",
            "upstream",
            "license",
            "permission",
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
            "import",
            "transformation",
            "review",
        ],
        "$",
        &mut diagnostics,
    );
    version(path, record, "$", &mut diagnostics);
    constant(
        path,
        record,
        "kind",
        "source_import",
        "$.kind",
        &mut diagnostics,
    );

    let id = text(path, record, "id", "$.id", &mut diagnostics).unwrap_or_default();
    if !id.is_empty() && !record_id(&id, false) {
        diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_ID",
            "$.id",
            "invalid canonical id",
        ));
    }
    enum_text(
        path,
        record,
        "classification",
        &[
            "oss_permitted",
            "separate_permission_required",
            "restricted",
            "unknown",
        ],
        "$.classification",
        &mut diagnostics,
    );

    if let Some(upstream) = object(path, record, "upstream", "$.upstream", &mut diagnostics) {
        keys(
            path,
            upstream,
            &["repository", "commit", "path", "sha256", "copyright_holder"],
            &["repository", "commit", "path", "sha256", "copyright_holder"],
            "$.upstream",
            &mut diagnostics,
        );
        match text(
            path,
            upstream,
            "repository",
            "$.upstream.repository",
            &mut diagnostics,
        ) {
            Some(value) if !repo_id(&value) => diagnostics.push(Diagnostic::new(
                path,
                "SOURCE_REPOSITORY",
                "$.upstream.repository",
                "expected owner/repository",
            )),
            _ => {}
        }
        match text(
            path,
            upstream,
            "commit",
            "$.upstream.commit",
            &mut diagnostics,
        ) {
            Some(value) if !hex(&value, 40) => diagnostics.push(Diagnostic::new(
                path,
                "SOURCE_COMMIT",
                "$.upstream.commit",
                "expected 40 lowercase hex",
            )),
            _ => {}
        }
        match text(path, upstream, "path", "$.upstream.path", &mut diagnostics) {
            Some(value) if !rel_path(&value) => diagnostics.push(Diagnostic::new(
                path,
                "PATH_INVALID",
                "$.upstream.path",
                "expected normalized relative POSIX path",
            )),
            _ => {}
        }
        digest(
            path,
            upstream,
            "sha256",
            "$.upstream.sha256",
            &mut diagnostics,
        );
        nonempty(
            path,
            upstream,
            "copyright_holder",
            "$.upstream.copyright_holder",
            &mut diagnostics,
        );
    }

    if let Some(license) = object(path, record, "license", "$.license", &mut diagnostics) {
        keys(
            path,
            license,
            &["spdx", "evidence"],
            &["spdx", "evidence"],
            "$.license",
            &mut diagnostics,
        );
        nonempty(path, license, "spdx", "$.license.spdx", &mut diagnostics);
        nonempty_strings(
            path,
            license,
            "evidence",
            "$.license.evidence",
            &mut diagnostics,
        );
    }

    match record.get("permission") {
        Some(Value::Null) => {}
        Some(Value::Object(permission)) => {
            keys(
                path,
                permission,
                &["artifact", "scope"],
                &["artifact", "scope"],
                "$.permission",
                &mut diagnostics,
            );
            nonempty(
                path,
                permission,
                "artifact",
                "$.permission.artifact",
                &mut diagnostics,
            );
            enum_strings(
                path,
                permission,
                "scope",
                &[
                    "copy",
                    "modify",
                    "create_derivative",
                    "redistribute",
                    "publish_source",
                    "sublicense",
                    "relicense",
                    "commercial_use",
                ],
                "$.permission.scope",
                true,
                &mut diagnostics,
            );
        }
        Some(_) => diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_TYPE",
            "$.permission",
            "permission must be null or object",
        )),
        None => diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_REQUIRED",
            "$.permission",
            "permission is required",
        )),
    }

    let mut destination = String::new();
    if let Some(import) = object(path, record, "import", "$.import", &mut diagnostics) {
        keys(
            path,
            import,
            &["destination", "sha256", "date"],
            &["destination", "sha256", "date"],
            "$.import",
            &mut diagnostics,
        );
        if let Some(value) = text(
            path,
            import,
            "destination",
            "$.import.destination",
            &mut diagnostics,
        ) {
            destination = value;
            if !rel_path(&destination) {
                diagnostics.push(Diagnostic::new(
                    path,
                    "PATH_INVALID",
                    "$.import.destination",
                    "expected normalized relative POSIX path",
                ));
            }
        }
        digest(path, import, "sha256", "$.import.sha256", &mut diagnostics);
        match text(path, import, "date", "$.import.date", &mut diagnostics) {
            Some(value) if !date(&value) => diagnostics.push(Diagnostic::new(
                path,
                "DATE_INVALID",
                "$.import.date",
                "expected real ASCII Gregorian YYYY-MM-DD",
            )),
            _ => {}
        }
    }

    if let Some(transformation) = object(
        path,
        record,
        "transformation",
        "$.transformation",
        &mut diagnostics,
    ) {
        keys(
            path,
            transformation,
            &["kind", "notes", "derives_from"],
            &["kind", "notes", "derives_from"],
            "$.transformation",
            &mut diagnostics,
        );
        enum_text(
            path,
            transformation,
            "kind",
            &[
                "copied",
                "adapted",
                "rewritten_with_source_reference",
                "generated_from_upstream",
            ],
            "$.transformation.kind",
            &mut diagnostics,
        );
        let _ = text(
            path,
            transformation,
            "notes",
            "$.transformation.notes",
            &mut diagnostics,
        );
        strings(
            path,
            transformation,
            "derives_from",
            "$.transformation.derives_from",
            &mut diagnostics,
        );
    }

    if let Some(review) = object(path, record, "review", "$.review", &mut diagnostics) {
        keys(
            path,
            review,
            &["status", "pull_request", "evidence"],
            &["status", "pull_request", "evidence"],
            "$.review",
            &mut diagnostics,
        );
        match review.get("status").and_then(Value::as_str) {
            Some("qualified_exact_head") => {}
            Some("pending") => diagnostics.push(Diagnostic::new(
                path,
                "REVIEW_STATUS",
                "$.review.status",
                "pending is not import-ready",
            )),
            Some("rejected") => diagnostics.push(Diagnostic::new(
                path,
                "REVIEW_STATUS",
                "$.review.status",
                "rejected is not import-ready",
            )),
            Some(value) => diagnostics.push(Diagnostic::new(
                path,
                "REVIEW_STATUS",
                "$.review.status",
                format!("unknown status `{value}`"),
            )),
            None => diagnostics.push(Diagnostic::new(
                path,
                "REVIEW_STATUS",
                "$.review.status",
                "status is required",
            )),
        }
        match review.get("pull_request") {
            Some(Value::Number(number)) if number.as_u64().is_some_and(|value| value > 0) => {}
            _ => diagnostics.push(Diagnostic::new(
                path,
                "REVIEW_PR",
                "$.review.pull_request",
                "expected positive integer PR id",
            )),
        }
        match string_values(review.get("evidence")) {
            Some(values) if !values.is_empty() => {
                for (index, value) in values.iter().enumerate() {
                    if !review_ref(value) {
                        diagnostics.push(Diagnostic::new(
                            path,
                            "REVIEW_EVIDENCE",
                            format!("$.review.evidence[{index}]"),
                            "invalid immutable review evidence reference",
                        ));
                    }
                }
            }
            _ => diagnostics.push(Diagnostic::new(
                path,
                "REVIEW_EVIDENCE",
                "$.review.evidence",
                "canonical review evidence is required",
            )),
        }
    }

    if diagnostics.is_empty() {
        Ok(SourceImportRecord { id, destination })
    } else {
        Err(diagnostics)
    }
}

fn component_registry(
    path: &str,
    record: &Map<String, Value>,
) -> Result<ComponentRegistryRecord, Vec<Diagnostic>> {
    let mut diagnostics = Vec::new();
    keys(
        path,
        record,
        &["schema_version", "kind", "components"],
        &["schema_version", "kind", "components"],
        "$",
        &mut diagnostics,
    );
    version(path, record, "$", &mut diagnostics);
    constant(
        path,
        record,
        "kind",
        "component_registry",
        "$.kind",
        &mut diagnostics,
    );

    let mut ids = Vec::new();
    match record.get("components") {
        Some(Value::Array(items)) if !items.is_empty() => {
            for (index, item) in items.iter().enumerate() {
                let field = format!("$.components[{index}]");
                let Some(component) = item.as_object() else {
                    diagnostics.push(Diagnostic::new(
                        path,
                        "SCHEMA_TYPE",
                        field,
                        "component must be object",
                    ));
                    continue;
                };
                keys(
                    path,
                    component,
                    &[
                        "schema_version",
                        "kind",
                        "id",
                        "ecosystem",
                        "component_type",
                        "name",
                        "version",
                        "source",
                        "package_checksum",
                        "license",
                        "artifact_form",
                        "distribution_surfaces",
                        "notice_requirement",
                        "derives_from",
                        "distribution_review",
                    ],
                    &[
                        "schema_version",
                        "kind",
                        "id",
                        "ecosystem",
                        "component_type",
                        "name",
                        "version",
                        "source",
                        "package_checksum",
                        "license",
                        "artifact_form",
                        "distribution_surfaces",
                        "notice_requirement",
                        "derives_from",
                        "distribution_review",
                    ],
                    &field,
                    &mut diagnostics,
                );
                version(path, component, &field, &mut diagnostics);
                constant(
                    path,
                    component,
                    "kind",
                    "component",
                    &format!("{field}.kind"),
                    &mut diagnostics,
                );

                if let Some(id) = text(
                    path,
                    component,
                    "id",
                    &format!("{field}.id"),
                    &mut diagnostics,
                ) {
                    if !record_id(&id, true) {
                        diagnostics.push(Diagnostic::new(
                            path,
                            "COMPONENT_ID",
                            format!("{field}.id"),
                            "invalid component id",
                        ));
                    }
                    ids.push(id);
                }

                enum_text(
                    path,
                    component,
                    "ecosystem",
                    &["cargo"],
                    &format!("{field}.ecosystem"),
                    &mut diagnostics,
                );
                enum_text(
                    path,
                    component,
                    "component_type",
                    &["library", "binary", "tool"],
                    &format!("{field}.component_type"),
                    &mut diagnostics,
                );
                nonempty(
                    path,
                    component,
                    "name",
                    &format!("{field}.name"),
                    &mut diagnostics,
                );
                nonempty(
                    path,
                    component,
                    "version",
                    &format!("{field}.version"),
                    &mut diagnostics,
                );

                if let Some(source) = object(
                    path,
                    component,
                    "source",
                    &format!("{field}.source"),
                    &mut diagnostics,
                ) {
                    keys(
                        path,
                        source,
                        &["repository", "revision"],
                        &["repository", "revision"],
                        &format!("{field}.source"),
                        &mut diagnostics,
                    );
                    match text(
                        path,
                        source,
                        "repository",
                        &format!("{field}.source.repository"),
                        &mut diagnostics,
                    ) {
                        Some(value) if !github_repo(&value) => diagnostics.push(Diagnostic::new(
                            path,
                            "COMPONENT_SOURCE",
                            format!("{field}.source.repository"),
                            "expected canonical GitHub URL",
                        )),
                        _ => {}
                    }
                    match text(
                        path,
                        source,
                        "revision",
                        &format!("{field}.source.revision"),
                        &mut diagnostics,
                    ) {
                        Some(value) if !hex(&value, 40) => diagnostics.push(Diagnostic::new(
                            path,
                            "COMPONENT_SOURCE",
                            format!("{field}.source.revision"),
                            "expected 40 lowercase hex",
                        )),
                        _ => {}
                    }
                }

                digest(
                    path,
                    component,
                    "package_checksum",
                    &format!("{field}.package_checksum"),
                    &mut diagnostics,
                );

                if let Some(license) = object(
                    path,
                    component,
                    "license",
                    &format!("{field}.license"),
                    &mut diagnostics,
                ) {
                    keys(
                        path,
                        license,
                        &["classification", "spdx", "evidence"],
                        &["classification", "evidence"],
                        &format!("{field}.license"),
                        &mut diagnostics,
                    );
                    let classification = text(
                        path,
                        license,
                        "classification",
                        &format!("{field}.license.classification"),
                        &mut diagnostics,
                    );
                    match classification.as_deref() {
                        Some("spdx") => nonempty(
                            path,
                            license,
                            "spdx",
                            &format!("{field}.license.spdx"),
                            &mut diagnostics,
                        ),
                        Some("restricted" | "custom" | "unknown") => {
                            if license.contains_key("spdx") {
                                diagnostics.push(Diagnostic::new(
                                    path,
                                    "COMPONENT_LICENSE",
                                    format!("{field}.license.spdx"),
                                    "spdx forbidden for non-SPDX classification",
                                ));
                            }
                        }
                        Some(_) => diagnostics.push(Diagnostic::new(
                            path,
                            "COMPONENT_LICENSE",
                            format!("{field}.license.classification"),
                            "unknown classification",
                        )),
                        None => {}
                    }
                    nonempty_strings(
                        path,
                        license,
                        "evidence",
                        &format!("{field}.license.evidence"),
                        &mut diagnostics,
                    );
                }

                enum_text(
                    path,
                    component,
                    "artifact_form",
                    &[
                        "source",
                        "static_library",
                        "dynamic_library",
                        "binary",
                        "wasm",
                        "other",
                    ],
                    &format!("{field}.artifact_form"),
                    &mut diagnostics,
                );
                enum_strings(
                    path,
                    component,
                    "distribution_surfaces",
                    &[
                        "server",
                        "web",
                        "desktop_direct",
                        "desktop_store",
                        "ios_app_store",
                        "android_play",
                        "sdk",
                        "embed",
                        "cli",
                        "worker",
                    ],
                    &format!("{field}.distribution_surfaces"),
                    true,
                    &mut diagnostics,
                );
                enum_text(
                    path,
                    component,
                    "notice_requirement",
                    &["required", "not_required", "pending"],
                    &format!("{field}.notice_requirement"),
                    &mut diagnostics,
                );
                strings(
                    path,
                    component,
                    "derives_from",
                    &format!("{field}.derives_from"),
                    &mut diagnostics,
                );

                if let Some(review) = object(
                    path,
                    component,
                    "distribution_review",
                    &format!("{field}.distribution_review"),
                    &mut diagnostics,
                ) {
                    keys(
                        path,
                        review,
                        &["state", "evidence"],
                        &["state", "evidence"],
                        &format!("{field}.distribution_review"),
                        &mut diagnostics,
                    );
                    enum_text(
                        path,
                        review,
                        "state",
                        &[
                            "not_applicable",
                            "pending",
                            "approved_with_evidence",
                            "blocked",
                        ],
                        &format!("{field}.distribution_review.state"),
                        &mut diagnostics,
                    );
                    strings(
                        path,
                        review,
                        "evidence",
                        &format!("{field}.distribution_review.evidence"),
                        &mut diagnostics,
                    );
                }
            }
        }
        _ => diagnostics.push(Diagnostic::new(
            path,
            "COMPONENT_LIST",
            "$.components",
            "components must be non-empty array",
        )),
    }

    let mut seen = HashSet::new();
    for id in &ids {
        if !seen.insert(id) {
            diagnostics.push(Diagnostic::new(
                path,
                "COMPONENT_DUPLICATE",
                "$.components",
                format!("duplicate `{id}`"),
            ));
        }
    }

    if diagnostics.is_empty() {
        Ok(ComponentRegistryRecord { ids })
    } else {
        Err(diagnostics)
    }
}

fn policy(path: &str, record: &Map<String, Value>) -> Result<PolicyRecord, Vec<Diagnostic>> {
    let mut diagnostics = Vec::new();
    keys(
        path,
        record,
        &[
            "schema_version",
            "kind",
            "id",
            "policy_type",
            "policy_version",
            "rules",
        ],
        &[
            "schema_version",
            "kind",
            "id",
            "policy_type",
            "policy_version",
            "rules",
        ],
        "$",
        &mut diagnostics,
    );
    version(path, record, "$", &mut diagnostics);
    constant(path, record, "kind", "policy", "$.kind", &mut diagnostics);

    let id = text(path, record, "id", "$.id", &mut diagnostics).unwrap_or_default();
    if !id.is_empty() && !record_id(&id, true) {
        diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_ID",
            "$.id",
            "invalid policy id",
        ));
    }

    let policy_type = text(
        path,
        record,
        "policy_type",
        "$.policy_type",
        &mut diagnostics,
    )
    .unwrap_or_default();
    if !matches!(policy_type.as_str(), "license" | "restricted_paths") {
        diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_POLICY",
            "$.policy_type",
            "expected license or restricted_paths",
        ));
    }

    let policy_version = match record.get("policy_version") {
        Some(Value::Number(number)) if number.as_u64().is_some_and(|value| value > 0) => {
            number.as_u64().unwrap_or_default()
        }
        _ => {
            diagnostics.push(Diagnostic::new(
                path,
                "SCHEMA_POLICY",
                "$.policy_version",
                "expected positive integer",
            ));
            0
        }
    };

    match record.get("rules") {
        Some(Value::Array(rules)) => {
            for (index, rule) in rules.iter().enumerate() {
                let field = format!("$.rules[{index}]");
                let Some(rule) = rule.as_object() else {
                    diagnostics.push(Diagnostic::new(
                        path,
                        "SCHEMA_TYPE",
                        field,
                        "rule must be object",
                    ));
                    continue;
                };
                keys(
                    path,
                    rule,
                    &[
                        "id",
                        "effect",
                        "repository",
                        "path_prefix",
                        "expression",
                        "permission_scopes",
                    ],
                    &["id", "effect"],
                    &field,
                    &mut diagnostics,
                );
                nonempty(path, rule, "id", &format!("{field}.id"), &mut diagnostics);
                enum_text(
                    path,
                    rule,
                    "effect",
                    &["allow", "deny", "require_permission", "reject_expression"],
                    &format!("{field}.effect"),
                    &mut diagnostics,
                );

                match rule.get("repository") {
                    Some(Value::String(value)) if !repo_id(value) => {
                        diagnostics.push(Diagnostic::new(
                            path,
                            "SOURCE_REPOSITORY",
                            format!("{field}.repository"),
                            "invalid repository",
                        ))
                    }
                    _ => {}
                }
                match rule.get("path_prefix") {
                    Some(Value::String(value)) if !rel_path(value) => {
                        diagnostics.push(Diagnostic::new(
                            path,
                            "PATH_INVALID",
                            format!("{field}.path_prefix"),
                            "invalid path prefix",
                        ))
                    }
                    _ => {}
                }
                match rule.get("expression") {
                    Some(Value::String(value)) if !value.is_empty() => {}
                    Some(_) => diagnostics.push(Diagnostic::new(
                        path,
                        "SCHEMA_POLICY",
                        format!("{field}.expression"),
                        "expression must be non-empty string",
                    )),
                    None => {}
                }
                if rule.contains_key("permission_scopes") {
                    enum_strings(
                        path,
                        rule,
                        "permission_scopes",
                        &[
                            "copy",
                            "modify",
                            "create_derivative",
                            "redistribute",
                            "publish_source",
                            "sublicense",
                            "relicense",
                            "commercial_use",
                        ],
                        &format!("{field}.permission_scopes"),
                        true,
                        &mut diagnostics,
                    );
                }
            }
        }
        _ => diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_POLICY",
            "$.rules",
            "rules must be array",
        )),
    }

    if diagnostics.is_empty() {
        Ok(PolicyRecord {
            id,
            policy_type,
            policy_version,
        })
    } else {
        Err(diagnostics)
    }
}

fn keys(
    path: &str,
    object: &Map<String, Value>,
    allowed: &[&str],
    required: &[&str],
    field: &str,
    diagnostics: &mut Vec<Diagnostic>,
) {
    for key in object.keys() {
        if !allowed.contains(&key.as_str()) {
            diagnostics.push(Diagnostic::new(
                path,
                "SCHEMA_UNKNOWN_FIELD",
                format!("{field}.{key}"),
                "unknown field",
            ));
        }
    }
    for key in required {
        if !object.contains_key(*key) {
            diagnostics.push(Diagnostic::new(
                path,
                "SCHEMA_REQUIRED",
                format!("{field}.{key}"),
                "required field missing",
            ));
        }
    }
}

fn version(
    path: &str,
    object: &Map<String, Value>,
    field: &str,
    diagnostics: &mut Vec<Diagnostic>,
) {
    if !matches!(object.get("schema_version"), Some(Value::Number(number)) if number.as_u64() == Some(1))
    {
        diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_VERSION",
            format!("{field}.schema_version"),
            "expected integer 1",
        ));
    }
}

fn constant(
    path: &str,
    object: &Map<String, Value>,
    key: &str,
    wanted: &str,
    field: &str,
    diagnostics: &mut Vec<Diagnostic>,
) {
    if !matches!(object.get(key), Some(Value::String(value)) if value == wanted) {
        diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_VALUE",
            field,
            format!("expected `{wanted}`"),
        ));
    }
}

fn object<'a>(
    path: &str,
    object: &'a Map<String, Value>,
    key: &str,
    field: &str,
    diagnostics: &mut Vec<Diagnostic>,
) -> Option<&'a Map<String, Value>> {
    match object.get(key) {
        Some(Value::Object(value)) => Some(value),
        Some(_) => {
            diagnostics.push(Diagnostic::new(
                path,
                "SCHEMA_TYPE",
                field,
                "expected object",
            ));
            None
        }
        None => None,
    }
}

fn text(
    path: &str,
    object: &Map<String, Value>,
    key: &str,
    field: &str,
    diagnostics: &mut Vec<Diagnostic>,
) -> Option<String> {
    match object.get(key) {
        Some(Value::String(value)) => Some(value.clone()),
        Some(_) => {
            diagnostics.push(Diagnostic::new(
                path,
                "SCHEMA_TYPE",
                field,
                "expected string",
            ));
            None
        }
        None => None,
    }
}

fn nonempty(
    path: &str,
    object: &Map<String, Value>,
    key: &str,
    field: &str,
    diagnostics: &mut Vec<Diagnostic>,
) {
    if text(path, object, key, field, diagnostics).is_some_and(|value| value.is_empty()) {
        diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_EMPTY",
            field,
            "must not be empty",
        ));
    }
}

fn string_values(value: Option<&Value>) -> Option<Vec<String>> {
    let Value::Array(items) = value? else {
        return None;
    };
    let mut output = Vec::new();
    for item in items {
        let Value::String(value) = item else {
            return None;
        };
        output.push(value.clone());
    }
    Some(output)
}

fn strings(
    path: &str,
    object: &Map<String, Value>,
    key: &str,
    field: &str,
    diagnostics: &mut Vec<Diagnostic>,
) {
    if string_values(object.get(key)).is_none() {
        diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_TYPE",
            field,
            "expected string array",
        ));
    }
}

fn nonempty_strings(
    path: &str,
    object: &Map<String, Value>,
    key: &str,
    field: &str,
    diagnostics: &mut Vec<Diagnostic>,
) {
    match string_values(object.get(key)) {
        Some(values) if !values.is_empty() && values.iter().all(|value| !value.is_empty()) => {}
        _ => diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_TYPE",
            field,
            "expected non-empty string array",
        )),
    }
}

fn enum_text(
    path: &str,
    object: &Map<String, Value>,
    key: &str,
    allowed: &[&str],
    field: &str,
    diagnostics: &mut Vec<Diagnostic>,
) {
    match text(path, object, key, field, diagnostics) {
        Some(value) if !allowed.contains(&value.as_str()) => diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_VALUE",
            field,
            format!("unsupported `{value}`"),
        )),
        _ => {}
    }
}

fn enum_strings(
    path: &str,
    object: &Map<String, Value>,
    key: &str,
    allowed: &[&str],
    field: &str,
    nonempty: bool,
    diagnostics: &mut Vec<Diagnostic>,
) {
    match string_values(object.get(key)) {
        Some(values)
            if (!nonempty || !values.is_empty())
                && values.iter().all(|value| allowed.contains(&value.as_str())) => {}
        _ => diagnostics.push(Diagnostic::new(
            path,
            "SCHEMA_VALUE",
            field,
            "invalid string array",
        )),
    }
}

fn digest(
    path: &str,
    object: &Map<String, Value>,
    key: &str,
    field: &str,
    diagnostics: &mut Vec<Diagnostic>,
) {
    match text(path, object, key, field, diagnostics) {
        Some(value) if !hex(&value, 64) => diagnostics.push(Diagnostic::new(
            path,
            "DIGEST_INVALID",
            field,
            "expected 64 lowercase hex",
        )),
        _ => {}
    }
}

fn record_id(value: &str, lowercase: bool) -> bool {
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

fn repo_id(value: &str) -> bool {
    if !value.is_ascii() || value.contains('\\') {
        return false;
    }
    let mut parts = value.split('/');
    matches!(
        (parts.next(), parts.next(), parts.next()),
        (Some(owner), Some(repository), None) if segment(owner) && segment(repository)
    )
}

fn segment(value: &str) -> bool {
    !value.is_empty()
        && value
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'.' | b'_' | b'-'))
}

fn github_repo(value: &str) -> bool {
    value
        .strip_prefix("https://github.com/")
        .is_some_and(repo_id)
}

fn hex(value: &str, length: usize) -> bool {
    value.len() == length
        && value
            .bytes()
            .all(|byte| byte.is_ascii_digit() || (b'a'..=b'f').contains(&byte))
}

fn rel_path(value: &str) -> bool {
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
    bytes.len() >= 3 && bytes[0].is_ascii_alphabetic() && bytes[1] == b':' && bytes[2] == b'/'
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

fn date(value: &str) -> bool {
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

fn sort(diagnostics: &mut [Diagnostic]) {
    diagnostics.sort_by(|left, right| {
        (&left.path, left.code, &left.field, &left.message).cmp(&(
            &right.path,
            right.code,
            &right.field,
            &right.message,
        ))
    });
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn date_is_semantic() {
        assert!(date("2024-02-29"));
        for value in ["2025-02-29", "2026-2-01", "0000-01-01", "2026-13-01"] {
            assert!(!date(value), "{value}");
        }
    }

    #[test]
    fn review_reference_is_canonical() {
        for value in [
            "github:issue-comment:1",
            "github:pull-request-review:2",
            "github:pull-request-review-comment:3",
        ] {
            assert!(review_ref(value));
        }
        for value in [
            "approved",
            "https://github.com/x",
            "github:issue-comment:0",
            "github:issue-comment:01",
            "github:issue-comment:-1",
            "github:issue-comment:+1",
            "github:issue-comment:１２",
        ] {
            assert!(!review_ref(value), "{value}");
        }
    }

    #[test]
    fn paths_are_normalized() {
        assert!(rel_path("a/b"));
        assert!(rel_path("مصدر/ملف.rs"));
        for value in [
            "/a",
            "../a",
            "a/../b",
            "a\\b",
            "a//b",
            "a/./b",
            "a/",
            "C:/a",
            "a/\nrecord",
            "a/\rrecord",
            "a/\u{2028}record",
            "a/\u{2029}record",
        ] {
            assert!(!rel_path(value), "{value:?}");
        }
    }
}
