use crate::{ValidationReport, secure_io, validate_paths};
use serde_json::Value;
use std::fmt::Write as _;

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
    let report = validate_paths(&paths).map_err(NoticeError::Io)?;
    if !report.is_valid() {
        return Err(NoticeError::Validation(report));
    }

    let mut entries = Vec::new();
    for path in paths {
        let bytes = secure_io::read_record_bounded(&path).map_err(NoticeError::Io)?;
        project_record(&path, &bytes, &mut entries).map_err(NoticeError::Io)?;
    }
    entries.sort();
    entries.dedup();
    Ok(render(&entries))
}

pub(crate) fn notice_is_current(expected: &str) -> Result<bool, String> {
    let metadata = match std::fs::symlink_metadata(NOTICE_PATH) {
        Ok(metadata) => metadata,
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => return Ok(false),
        Err(error) => return Err(format!("IO_NOTICE_METADATA: {NOTICE_PATH}: {error}")),
    };
    if metadata.file_type().is_symlink() {
        return Err(format!(
            "IO_NOTICE_SYMLINK: {NOTICE_PATH}: canonical NOTICE must not be a symlink"
        ));
    }
    if !metadata.is_file() {
        return Err(format!("IO_NOTICE_NOT_FILE: {NOTICE_PATH}"));
    }
    let actual = std::fs::read(NOTICE_PATH)
        .map_err(|error| format!("IO_NOTICE_READ: {NOTICE_PATH}: {error}"))?;
    Ok(actual == expected.as_bytes())
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
    value
        .replace('\\', "\\\\")
        .replace('\r', "\\r")
        .replace('\n', "\\n")
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
        assert_eq!(one_line("a\r\nb\\c"), "a\\r\\nb\\\\c");
    }
}
