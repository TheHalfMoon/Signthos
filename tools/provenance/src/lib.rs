mod alignment;
mod claims;
mod component_review_alignment;
mod validation;

use std::io::Read;

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
    }
    sort_report(&mut report);
    report
}

pub fn validate_paths(paths: &[String]) -> Result<ValidationReport, String> {
    let mut canonical_paths = paths.to_vec();
    canonical_paths.sort();

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

fn read_record_bounded(path: &str) -> Result<Vec<u8>, String> {
    let metadata = std::fs::symlink_metadata(path)
        .map_err(|error| format!("IO_METADATA: {path}: {error}"))?;
    if metadata.file_type().is_symlink() {
        return Err(format!(
            "IO_SYMLINK: {path}: canonical validation does not follow symlinks"
        ));
    }
    if !metadata.is_file() {
        return Err(format!("IO_NOT_FILE: {path}"));
    }

    #[cfg(target_os = "linux")]
    let file = {
        use std::fs::OpenOptions;
        use std::os::unix::fs::OpenOptionsExt;

        // Linux O_NOFOLLOW closes the symlink-swap window between the metadata
        // check above and the actual open. A raced symlink therefore fails
        // closed instead of being followed.
        const O_NOFOLLOW: i32 = 0o400000;
        OpenOptions::new()
            .read(true)
            .custom_flags(O_NOFOLLOW)
            .open(path)
            .map_err(|error| format!("IO_OPEN: {path}: {error}"))?
    };

    #[cfg(not(target_os = "linux"))]
    let file = std::fs::File::open(path).map_err(|error| format!("IO_OPEN: {path}: {error}"))?;

    let mut bytes = Vec::new();
    file.take(MAX_RECORD_BYTES + 1)
        .read_to_end(&mut bytes)
        .map_err(|error| format!("IO_READ: {path}: {error}"))?;
    Ok(bytes)
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
            collect_json_files(&path.to_string_lossy(), paths)?;
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
    use std::path::PathBuf;
    use std::time::{SystemTime, UNIX_EPOCH};

    fn temp_root(label: &str) -> PathBuf {
        let nonce = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("system clock must be after Unix epoch")
            .as_nanos();
        std::env::temp_dir().join(format!(
            "signthos-{label}-{}-{nonce}",
            std::process::id()
        ))
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
    fn explicit_duplicate_path_order_is_deterministic() {
        let fixtures = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
            .join("../../provenance/fixtures/multi");
        let first = fixtures
            .join("duplicate-destination-a.json")
            .to_string_lossy()
            .into_owned();
        let second = fixtures
            .join("duplicate-destination-b.json")
            .to_string_lossy()
            .into_owned();

        let forward = validate_paths(&[first.clone(), second.clone()]).unwrap();
        let reverse = validate_paths(&[second, first]).unwrap();
        assert_eq!(forward, reverse);
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
            paths.push(path.to_string_lossy().into_owned());
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
}
