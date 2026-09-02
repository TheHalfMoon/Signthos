use std::path::PathBuf;
use std::process::{Command, Output};

fn invoke(args: &[&str]) -> Output {
    Command::new(env!("CARGO_BIN_EXE_signthos-provenance"))
        .args(args)
        .output()
        .expect("provenance CLI must execute")
}

fn fixture(relative: &str) -> String {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("../../provenance/fixtures/grain-c")
        .join(relative)
        .to_string_lossy()
        .into_owned()
}

#[test]
fn help_exits_zero() {
    let output = invoke(&["--help"]);
    assert_eq!(output.status.code(), Some(0));
    let stdout = String::from_utf8(output.stdout).expect("stdout must be UTF-8");
    assert!(stdout.contains("Usage: signthos-provenance"));
}

#[test]
fn missing_command_is_usage_error() {
    let output = invoke(&[]);
    assert_eq!(output.status.code(), Some(2));
    let stderr = String::from_utf8(output.stderr).expect("stderr must be UTF-8");
    assert!(stderr.contains("CLI_USAGE"));
}

#[test]
fn unknown_command_is_usage_error() {
    let output = invoke(&["unknown"]);
    assert_eq!(output.status.code(), Some(2));
    let stderr = String::from_utf8(output.stderr).expect("stderr must be UTF-8");
    assert!(stderr.contains("CLI_USAGE"));
}

#[test]
fn future_command_stays_fail_closed() {
    let output = invoke(&["verify-source"]);
    assert_eq!(output.status.code(), Some(2));
    let stderr = String::from_utf8(output.stderr).expect("stderr must be UTF-8");
    assert!(stderr.contains("CLI_BOOTSTRAP_UNAVAILABLE"));
}

#[test]
fn validate_accepts_canonical_fixture() {
    let path = fixture("valid/source-import-leap-day.json");
    let output = invoke(&["validate", &path]);
    assert_eq!(output.status.code(), Some(0));
    assert_eq!(String::from_utf8(output.stdout).unwrap(), "VALID\n");
    assert!(output.stderr.is_empty());
}

#[test]
fn validate_rejects_record_local_review_failure() {
    let path = fixture("invalid/review-evidence-leading-zero.json");
    let output = invoke(&["validate", &path]);
    assert_eq!(output.status.code(), Some(1));
    let stderr = String::from_utf8(output.stderr).unwrap();
    assert!(stderr.contains("REVIEW_EVIDENCE"));
}

#[test]
fn validate_json_is_machine_readable_and_uses_stdout() {
    let path = fixture("invalid/date-impossible.json");
    let output = invoke(&["validate", "--json", &path]);
    assert_eq!(output.status.code(), Some(1));
    assert!(output.stderr.is_empty());
    let value: serde_json::Value = serde_json::from_slice(&output.stdout).unwrap();
    assert_eq!(value["valid"], false);
    assert!(value["diagnostics"].as_array().unwrap().iter().any(|item| item["code"] == "DATE_INVALID"));
}

#[test]
fn missing_input_is_local_io_unavailable() {
    let output = invoke(&["validate", "definitely-not-a-record.json"]);
    assert_eq!(output.status.code(), Some(3));
    let stderr = String::from_utf8(output.stderr).unwrap();
    assert!(stderr.contains("IO_METADATA"));
}
