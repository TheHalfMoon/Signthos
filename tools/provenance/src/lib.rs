mod alignment;
mod claims;
mod component_review_alignment;
mod repository_alignment;
mod validation;

use std::io::Read;
use std::path::{Component, Path, PathBuf};

pub use validation::{
    CanonicalRecord, ComponentRegistryRecord, Diagnostic, MAX_RECORD_BYTES, MAX_TOTAL_BYTES,
    PolicyRecord, SourceImportRecord, ValidationReport,
};

pub const EXIT_SUCCESS: u8 = 0;
pub const EXIT_VALIDATION_FAILURE: u8 = 1;
pub const EXIT_USAGE_ERROR: u8 = 2;
pub const EXIT_LOCAL_IO_UNAVAILABLE: u8 = 3;
pub const EXIT_INTERNAL_INVARIANT: u8 = 4;

pub const HELP: &str = "Usage: signthos-provenance <COMMAND>\n\nCommands:\n  validate [--json] [PATH ...]  Validate canonical provenance records\n  verify-source                 Verify a record against a caller-supplied local checkout\n  notice                        Generate or check deterministic NOTICE output\n  explain                       Explain a canonical provenance record\n\nGrain C implements canonical record validation. Other commands arrive in their owning Spec 001 grains.\n";

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
    let mut report = validation::validate_bytes(path, bytes);
    if bytes.len() as u64 <= MAX_RECORD_BYTES {
        alignment::augment_bytes(path, bytes, &mut report);
        component_review_alignment::augment_bytes(path, bytes, &mut report);
        repository_alignment::augment_bytes(path, bytes, &mut report);
    }
    sort_report(&mut report);
    report
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
        let bytes = read_record_bounded(path)?;
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

fn ensure_no_symlink_components(path: &str) -> Result<(), String> {
    let components: Vec<_> = Path::new(path).components().collect();
    let mut current = PathBuf::new();

    for (index, component) in components.iter().enumerate() {
        let Component::Normal(segment) = component else {
            return Err(format!("IO_PATH: {path}: non-normal path component"));
        };
        current.push(segment);
        let metadata = std::fs::symlink_metadata(&current)
            .map_err(|error| format!("IO_METADATA: {}: {error}", current.display()))?;
        if metadata.file_type().is_symlink() {
            return Err(format!(
                "IO_SYMLINK: {}: canonical validation does not follow symlinks",
                current.display()
            ));
        }
        if index + 1 < components.len() && !metadata.is_dir() {
            return Err(format!("IO_NOT_DIR: {}", current.display()));
        }
    }

    Ok(())
}

fn ensure_repository_containment(path: &str) -> Result<(), String> {
    let repository_root = std::fs::canonicalize(".")
        .map_err(|error| format!("IO_CANONICALIZE: .: {error}"))?;
    let resolved = std::fs::canonicalize(path)
        .map_err(|error| format!("IO_CANONICALIZE: {path}: {error}"))?;
    if !resolved.starts_with(&repository_root) {
        return Err(format!(
            "IO_PATH_ESCAPE: {path}: resolved path leaves the repository root"
        ));
    }
    Ok(())
}

fn read_record_bounded(path: &str) -> Result<Vec<u8>, String> {
    validate_repository_relative_path(path)?;
    ensure_no_symlink_components(path)?;
    ensure_repository_containment(path)?;

    let metadata =
        std::fs::symlink_metadata(path).map_err(|error| format!("IO_METADATA: {path}: {error}"))?;
    if metadata.file_type().is_symlink() {
        return Err(format!(
            "IO_SYMLINK: {path}: canonical validation does not follow symlinks"
        ));
    }
    if !metadata.is_file() {
        return Err(format!("IO_NOT_FILE: {path}"));
    }

    let file = open_record_nofollow(path)?;
    let opened_metadata = file
        .metadata()
        .map_err(|error| format!("IO_METADATA: {path}: {error}"))?;
    if !opened_metadata.is_file() {
        return Err(format!("IO_NOT_FILE: {path}"));
    }

    let mut bytes = Vec::new();
    file.take(MAX_RECORD_BYTES + 1)
        .read_to_end(&mut bytes)
        .map_err(|error| format!("IO_READ: {path}: {error}"))?;
    Ok(bytes)
}

#[cfg(target_os = "linux")]
fn open_record_nofollow(path: &str) -> Result<std::fs::File, String> {
    use std::fs::OpenOptions;
    use std::os::unix::fs::OpenOptionsExt;

    const O_NOFOLLOW: i32 = 0o400000;
    OpenOptions::new()
        .read(true)
        .custom_flags(O_NOFOLLOW)
        .open(path)
        .map_err(|error| format!("IO_OPEN: {path}: {error}"))
}

#[cfg(target_os = "macos")]
fn open_record_nofollow(path: &str) -> Result<std::fs::File, String> {
    use std::fs::OpenOptions;
    use std::os::unix::fs::OpenOptionsExt;

    const O_NOFOLLOW: i32 = 0x0000_0100;
    OpenOptions::new()
        .read(true)
        .custom_flags(O_NOFOLLOW)
        .open(path)
        .map_err(|error| format!("IO_OPEN: {path}: {error}"))
}

#[cfg(target_os = "windows")]
fn open_record_nofollow(path: &str) -> Result<std::fs::File, String> {
    use std::fs::OpenOptions;
    use std::os::windows::fs::{MetadataExt, OpenOptionsExt};

    const FILE_FLAG_OPEN_REPARSE_POINT: u32 = 0x0020_0000;
    const FILE_ATTRIBUTE_REPARSE_POINT: u32 = 0x0000_0400;

    let file = OpenOptions::new()
        .read(true)
        .custom_flags(FILE_FLAG_OPEN_REPARSE_POINT)
        .open(path)
        .map_err(|error| format!("IO_OPEN: {path}: {error}"))?;
    let metadata = file
        .metadata()
        .map_err(|error| format!("IO_METADATA: {path}: {error}"))?;
    if metadata.file_attributes() & FILE_ATTRIBUTE_REPARSE_POINT != 0 {
        return Err(format!(
            "IO_SYMLINK: {path}: canonical validation does not follow reparse points"
        ));
    }
    Ok(file)
}

#[cfg(not(any(target_os = "linux", target_os = "macos", target_os = "windows")))]
fn open_record_nofollow(path: &str) -> Result<std::fs::File, String> {
    Err(format!(
        "IO_SECURE_OPEN_UNAVAILABLE: {path}: platform lacks an approved no-follow open implementation"
    ))
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
        ["verify-source", ..] | ["notice", ..] | ["explain", ..] => usage(
            "CLI_BOOTSTRAP_UNAVAILABLE: command is reserved but not implemented in this grain\n",
        ),
        _ => usage("CLI_USAGE: unknown command or arguments; use --help\n"),
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
    ensure_no_symlink_components(directory)?;
    ensure_repository_containment(directory)?;

    let entries = std::fs::read_dir(directory)
        .map_err(|error| format!("IO_READ_DIR: {directory}: {error}"))?;
    for entry in entries {
        let entry = entry.map_err(|error| format!("IO_READ_DIR: {directory}: {error}"))?;
        let file_type = entry
            .file_type()
            .map_err(|error| format!("IO_FILE_TYPE: {}: {error}", entry.path().display()))?;
        let path = entry.path();
        if file_type.is_symlink() {
            return Err(format!(
                "IO_SYMLINK: {}: canonical validation does not follow symlinks",
                path.display()
            ));
        }
        if file_type.is_dir() {
            collect_json_files(&path.to_string_lossy().replace('\\', "/"), paths)?;
        } else if file_type.is_file()
            && path
                .extension()
                .is_some_and(|extension| extension == "json")
        {
            paths.push(path.to_string_lossy().replace('\\', "/"));
        }
    }
    Ok(())
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
    }

    #[test]
    fn future_command_is_fail_closed() {
        let result = run(&["verify-source"]);
        assert_eq!(result.code, EXIT_USAGE_ERROR);
        assert!(result.stderr.contains("CLI_BOOTSTRAP_UNAVAILABLE"));
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

    #[cfg(unix)]
    #[test]
    fn explicit_parent_symlink_is_rejected() {
        use std::os::unix::fs::symlink;

        let root = temp_root("parent-symlink");
        let external = temp_root("external");
        fs::create_dir_all(&root).expect("temporary directory is created");
        fs::create_dir_all(&external).expect("external directory is created");
        fs::write(external.join("record.json"), b"{}")
            .expect("external fixture is written");
        symlink(&external, root.join("linked"))
            .expect("directory symlink is created");

        let path = root.join("linked/record.json").to_string_lossy().replace('\\', "/");
        let error = validate_paths(&[path]).unwrap_err();
        let _ = fs::remove_dir_all(&root);
        let _ = fs::remove_dir_all(&external);
        assert!(error.starts_with("IO_SYMLINK:"));
    }
}
