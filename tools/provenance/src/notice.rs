use crate::{
    Diagnostic, MAX_RECORD_BYTES, MAX_TOTAL_BYTES, ValidationReport, claims, secure_io,
    validate_bytes,
};
use serde_json::Value;
use std::fmt::Write as _;
use std::io::Read as _;

const COMPONENT_REGISTRY: &str = "provenance/components/registry.json";
const IMPORT_DIRECTORY: &str = "provenance/imports";
pub(crate) const NOTICE_PATH: &str = "NOTICE";

#[derive(Debug, Clone, PartialEq, Eq)]
pub(crate) enum NoticeError {
    Validation(ValidationReport),
    Io(String),
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
struct NoticeEntry {
    kind: &'static str,
    id: String,
    detail: String,
}

pub(crate) fn generate_canonical_notice() -> Result<String, NoticeError> {
    let paths = canonical_projection_paths().map_err(NoticeError::Io)?;
    let snapshots = snapshot_records(&paths)?;
    generate_from_snapshots(&snapshots)
}

fn generate_from_snapshots(snapshots: &[(String, Vec<u8>)]) -> Result<String, NoticeError> {
    let report = validate_snapshots(snapshots);
    if !report.is_valid() {
        return Err(NoticeError::Validation(report));
    }

    let mut entries = Vec::new();
    for (path, bytes) in snapshots {
        project_record(path, bytes, &mut entries).map_err(NoticeError::Io)?;
    }
    entries.sort();
    entries.dedup();
    Ok(render(&entries))
}

fn snapshot_records(paths: &[String]) -> Result<Vec<(String, Vec<u8>)>, NoticeError> {
    let mut snapshots = Vec::with_capacity(paths.len());
    let mut total = 0_u64;

    for path in paths {
        let bytes = secure_io::read_record_bounded(path).map_err(NoticeError::Io)?;
        total = checked_snapshot_total(total, bytes.len() as u64, path)?;
        snapshots.push((path.to_owned(), bytes));
    }

    Ok(snapshots)
}

fn checked_snapshot_total(total: u64, size: u64, path: &str) -> Result<u64, NoticeError> {
    let next = total.saturating_add(size);
    if next > MAX_TOTAL_BYTES {
        return Err(NoticeError::Validation(ValidationReport {
            diagnostics: vec![Diagnostic {
                path: path.to_owned(),
                code: "SIZE_TOTAL",
                field: "$".to_owned(),
                message: format!("run exceeds {MAX_TOTAL_BYTES} bytes"),
            }],
        }));
    }
    Ok(next)
}

fn validate_snapshots(snapshots: &[(String, Vec<u8>)]) -> ValidationReport {
    let mut report = ValidationReport {
        diagnostics: Vec::new(),
    };
    let mut total = 0_u64;
    let mut claim_tracker = claims::ClaimTracker::default();

    for (path, bytes) in snapshots {
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

        let mut current = validate_bytes(path, bytes);
        report.diagnostics.append(&mut current.diagnostics);
        claim_tracker.observe(path, bytes, &mut report);
    }

    report.diagnostics.sort_by(|left, right| {
        (&left.path, left.code, &left.field, &left.message).cmp(&(
            &right.path,
            right.code,
            &right.field,
            &right.message,
        ))
    });
    report.diagnostics.dedup();
    report
}

pub(crate) fn notice_is_current(expected: &str) -> Result<bool, String> {
    file_matches_expected_bounded(NOTICE_PATH, expected.as_bytes())
}

fn file_matches_expected_bounded(path: &str, expected: &[u8]) -> Result<bool, String> {
    let metadata = match std::fs::symlink_metadata(path) {
        Ok(metadata) => metadata,
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => return Ok(false),
        Err(error) => return Err(format!("IO_NOTICE_METADATA: {path}: {error}")),
    };
    if metadata.file_type().is_symlink() {
        return Err(format!(
            "IO_NOTICE_SYMLINK: {path}: canonical NOTICE must not be a symlink"
        ));
    }
    if !metadata.is_file() {
        return Err(format!("IO_NOTICE_NOT_FILE: {path}"));
    }

    let expected_len = u64::try_from(expected.len()).map_err(|_| {
        format!("IO_NOTICE_SIZE: {path}: expected NOTICE length is not representable")
    })?;
    if metadata.len() != expected_len {
        return Ok(false);
    }

    let file =
        std::fs::File::open(path).map_err(|error| format!("IO_NOTICE_READ: {path}: {error}"))?;
    let mut actual = Vec::with_capacity(expected.len());
    file.take(expected_len.saturating_add(1))
        .read_to_end(&mut actual)
        .map_err(|error| format!("IO_NOTICE_READ: {path}: {error}"))?;
    Ok(actual == expected)
}

fn canonical_projection_paths() -> Result<Vec<String>, String> {
    let mut paths = Vec::new();

    match std::fs::symlink_metadata(COMPONENT_REGISTRY) {
        Ok(metadata) if metadata.file_type().is_symlink() => {
            return Err(format!(
                "IO_SYMLINK: {COMPONENT_REGISTRY}: canonical validation does not follow symlinks"
            ));
        }
        Ok(metadata) if metadata.is_file() => paths.push(COMPONENT_REGISTRY.to_owned()),
        Ok(_) => return Err(format!("IO_NOT_FILE: {COMPONENT_REGISTRY}")),
        Err(error) => return Err(format!("IO_METADATA: {COMPONENT_REGISTRY}: {error}")),
    }

    match std::fs::symlink_metadata(IMPORT_DIRECTORY) {
        Ok(metadata) if metadata.file_type().is_symlink() => {
            return Err(format!(
                "IO_SYMLINK: {IMPORT_DIRECTORY}: canonical validation does not follow symlinks"
            ));
        }
        Ok(metadata) if metadata.is_dir() => {
            secure_io::collect_json_files(IMPORT_DIRECTORY, &mut paths)?;
        }
        Ok(_) => return Err(format!("IO_NOT_DIRECTORY: {IMPORT_DIRECTORY}")),
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => {}
        Err(error) => return Err(format!("IO_METADATA: {IMPORT_DIRECTORY}: {error}")),
    }

    paths.sort();
    paths.dedup();
    Ok(paths)
}

fn project_record(path: &str, bytes: &[u8], entries: &mut Vec<NoticeEntry>) -> Result<(), String> {
    let value: Value =
        serde_json::from_slice(bytes).map_err(|error| format!("NOTICE_JSON: {path}: {error}"))?;
    let record = value
        .as_object()
        .ok_or_else(|| format!("NOTICE_RECORD: {path}: expected object"))?;

    match record.get("kind").and_then(Value::as_str) {
        Some("component_registry") => project_components(path, record, entries),
        Some("source_import") => project_source_import(path, record, entries),
        Some(kind) => Err(format!(
            "NOTICE_KIND: {path}: unsupported projection kind `{kind}`"
        )),
        None => Err(format!("NOTICE_KIND: {path}: missing kind")),
    }
}

fn project_components(
    path: &str,
    record: &serde_json::Map<String, Value>,
    entries: &mut Vec<NoticeEntry>,
) -> Result<(), String> {
    let components = record
        .get("components")
        .and_then(Value::as_array)
        .ok_or_else(|| format!("NOTICE_COMPONENTS: {path}: missing components"))?;

    for component in components {
        let component = component
            .as_object()
            .ok_or_else(|| format!("NOTICE_COMPONENT: {path}: expected object"))?;
        let id = required_text(path, component, "id")?;
        let name = required_text(path, component, "name")?;
        let version = required_text(path, component, "version")?;
        let license = component
            .get("license")
            .and_then(Value::as_object)
            .ok_or_else(|| format!("NOTICE_LICENSE: {path}: component `{id}` missing license"))?;
        let license = license_label(path, license)?;
        entries.push(NoticeEntry {
            kind: "component",
            id,
            detail: format!("{name} {version} | {license}"),
        });
    }
    Ok(())
}

fn project_source_import(
    path: &str,
    record: &serde_json::Map<String, Value>,
    entries: &mut Vec<NoticeEntry>,
) -> Result<(), String> {
    let id = required_text(path, record, "id")?;
    let destination = record
        .get("import")
        .and_then(Value::as_object)
        .and_then(|value| value.get("destination"))
        .and_then(Value::as_str)
        .ok_or_else(|| format!("NOTICE_IMPORT: {path}: `{id}` missing destination"))?;
    let upstream = record
        .get("upstream")
        .and_then(Value::as_object)
        .ok_or_else(|| format!("NOTICE_UPSTREAM: {path}: `{id}` missing upstream"))?;
    let repository = upstream
        .get("repository")
        .and_then(Value::as_str)
        .ok_or_else(|| format!("NOTICE_UPSTREAM: {path}: `{id}` missing repository"))?;
    let commit = upstream
        .get("commit")
        .and_then(Value::as_str)
        .ok_or_else(|| format!("NOTICE_UPSTREAM: {path}: `{id}` missing commit"))?;
    let source_path = upstream
        .get("path")
        .and_then(Value::as_str)
        .ok_or_else(|| format!("NOTICE_UPSTREAM: {path}: `{id}` missing path"))?;
    let license = record
        .get("license")
        .and_then(Value::as_object)
        .ok_or_else(|| format!("NOTICE_LICENSE: {path}: `{id}` missing license"))?;
    let license = license_label(path, license)?;

    entries.push(NoticeEntry {
        kind: "source-import",
        id,
        detail: format!(
            "destination {} | source {}@{}:{} | {}",
            one_line(destination),
            one_line(repository),
            one_line(commit),
            one_line(source_path),
            license
        ),
    });
    Ok(())
}

fn required_text(
    path: &str,
    object: &serde_json::Map<String, Value>,
    field: &str,
) -> Result<String, String> {
    object
        .get(field)
        .and_then(Value::as_str)
        .map(one_line)
        .ok_or_else(|| format!("NOTICE_FIELD: {path}: missing `{field}`"))
}

fn license_label(path: &str, license: &serde_json::Map<String, Value>) -> Result<String, String> {
    if let Some(spdx) = license.get("spdx").and_then(Value::as_str) {
        return Ok(format!("SPDX: {}", one_line(spdx)));
    }
    license
        .get("classification")
        .and_then(Value::as_str)
        .map(|classification| format!("classification: {}", one_line(classification)))
        .ok_or_else(|| format!("NOTICE_LICENSE: {path}: missing SPDX/classification"))
}

fn one_line(value: &str) -> String {
    let mut escaped = String::with_capacity(value.len());
    for character in value.chars() {
        match character {
            '\\' => escaped.push_str("\\\\"),
            '\r' => escaped.push_str("\\r"),
            '\n' => escaped.push_str("\\n"),
            '\u{2028}' => escaped.push_str("\\u{2028}"),
            '\u{2029}' => escaped.push_str("\\u{2029}"),
            character if character.is_control() => {
                write!(escaped, "\\u{{{:04X}}}", character as u32)
                    .expect("writing escaped control character to String cannot fail");
            }
            character => escaped.push(character),
        }
    }
    escaped
}

fn render(entries: &[NoticeEntry]) -> String {
    let mut out = String::new();
    out.push_str("Signthos NOTICE\n\n");
    out.push_str("Generated deterministically from validated canonical provenance records.\n");
    out.push_str("This inventory summary does not replace required full license texts, copyright notices, attribution artifacts, or other distribution obligations.\n\n");

    out.push_str("Components\n----------\n");
    let mut component_count = 0usize;
    for entry in entries.iter().filter(|entry| entry.kind == "component") {
        component_count += 1;
        writeln!(out, "- {} | {}", entry.id, entry.detail)
            .expect("writing NOTICE to String cannot fail");
    }
    if component_count == 0 {
        out.push_str("(none)\n");
    }

    out.push_str("\nSource imports\n--------------\n");
    let mut import_count = 0usize;
    for entry in entries.iter().filter(|entry| entry.kind == "source-import") {
        import_count += 1;
        writeln!(out, "- {} | {}", entry.id, entry.detail)
            .expect("writing NOTICE to String cannot fail");
    }
    if import_count == 0 {
        out.push_str("(none)\n");
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;
    use std::time::{SystemTime, UNIX_EPOCH};

    fn render_from(values: &[Value]) -> String {
        let mut entries = Vec::new();
        for (index, value) in values.iter().enumerate() {
            project_record(
                &format!("fixture-{index}.json"),
                &serde_json::to_vec(value).unwrap(),
                &mut entries,
            )
            .unwrap();
        }
        entries.sort();
        entries.dedup();
        render(&entries)
    }

    fn temp_notice_path(label: &str) -> String {
        let nonce = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("system clock must be after Unix epoch")
            .as_nanos();
        format!(".signthos-notice-{label}-{}-{nonce}", std::process::id())
    }

    #[test]
    fn projection_is_byte_deterministic_and_sorted() {
        let registry = json!({
            "kind": "component_registry",
            "components": [
                {"id":"z","name":"zeta","version":"2","license":{"spdx":"MIT"}},
                {"id":"a","name":"alpha","version":"1","license":{"spdx":"Apache-2.0"}}
            ]
        });
        let forward = render_from(std::slice::from_ref(&registry));
        let reverse = render_from(&[json!({
            "kind": "component_registry",
            "components": [
                {"id":"a","name":"alpha","version":"1","license":{"spdx":"Apache-2.0"}},
                {"id":"z","name":"zeta","version":"2","license":{"spdx":"MIT"}}
            ]
        })]);
        assert_eq!(forward.as_bytes(), reverse.as_bytes());
        assert!(forward.find("- a |").unwrap() < forward.find("- z |").unwrap());
    }

    #[test]
    fn notice_has_no_runtime_or_host_specific_fields() {
        let output = render(&[]);
        for forbidden in ["timestamp", "generated at", "hostname", "current_dir"] {
            assert!(!output.to_ascii_lowercase().contains(forbidden));
        }
        assert!(output.ends_with("(none)\n"));
    }

    #[test]
    fn notice_disclaimer_preserves_full_license_obligations() {
        let output = render(&[]);
        assert!(output.contains("does not replace required full license texts"));
        assert!(output.contains("attribution artifacts"));
    }

    #[test]
    fn control_characters_are_escaped_into_single_lines() {
        assert_eq!(
            one_line("a\r\nb\\c\u{2028}d\u{2029}e\u{0085}f\u{000B}g"),
            "a\\r\\nb\\\\c\\u{2028}d\\u{2029}e\\u{0085}f\\u{000B}g"
        );
    }

    #[test]
    fn snapshot_total_fails_before_exceeding_run_limit() {
        assert_eq!(
            checked_snapshot_total(MAX_TOTAL_BYTES - 1, 1, "last.json").unwrap(),
            MAX_TOTAL_BYTES
        );
        let error = checked_snapshot_total(MAX_TOTAL_BYTES, 1, "overflow.json").unwrap_err();
        let NoticeError::Validation(report) = error else {
            panic!("total overflow must be a validation failure");
        };
        assert_eq!(report.diagnostics.len(), 1);
        assert_eq!(report.diagnostics[0].code, "SIZE_TOTAL");
        assert_eq!(report.diagnostics[0].path, "overflow.json");
    }

    #[test]
    fn drift_check_is_length_bounded_and_exact() {
        let path = temp_notice_path("bounded");
        std::fs::write(&path, b"abcdef").expect("temporary NOTICE fixture is written");
        assert!(!file_matches_expected_bounded(&path, b"abc").unwrap());
        assert!(file_matches_expected_bounded(&path, b"abcdef").unwrap());
        std::fs::write(&path, b"abcdeg").expect("temporary NOTICE fixture is replaced");
        assert!(!file_matches_expected_bounded(&path, b"abcdef").unwrap());
        std::fs::remove_file(&path).expect("temporary NOTICE fixture is removed");
    }

    #[test]
    fn canonical_registry_snapshot_is_validated_and_projected_without_reread() {
        let snapshots = vec![(
            COMPONENT_REGISTRY.to_owned(),
            include_bytes!("../../../provenance/components/registry.json").to_vec(),
        )];
        let output = generate_from_snapshots(&snapshots).expect("canonical snapshot must render");
        assert!(output.contains("cargo-spdx-0.13.5"));
        assert!(output.ends_with("(none)\n"));
    }
}
