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
    let mut report = validation::validate_bytes(path, bytes);
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
