use std::process::{Command, Output};

fn invoke(args: &[&str]) -> Output {
    Command::new(env!("CARGO_BIN_EXE_signthos-provenance"))
        .args(args)
        .output()
        .expect("bootstrap CLI must execute")
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
fn reserved_command_fails_closed_until_its_owning_grain() {
    let output = invoke(&["validate"]);
    assert_eq!(output.status.code(), Some(2));
    let stderr = String::from_utf8(output.stderr).expect("stderr must be UTF-8");
    assert!(stderr.contains("CLI_BOOTSTRAP_UNAVAILABLE"));
}
