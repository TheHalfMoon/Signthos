use std::io::{self, Write as _};
use std::path::Path;
use std::process::ExitCode;

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
    if has_absolute_validate_path(&args) {
        eprintln!("CLI_USAGE: validate paths must be repository-relative");
        let _ = io::stderr().flush();
        return ExitCode::from(signthos_provenance::EXIT_USAGE_ERROR);
    }

    let args: Vec<&str> = args.iter().map(String::as_str).collect();
    let result = signthos_provenance::run(&args);

    if !result.stdout.is_empty() {
        print!("{}", result.stdout);
    }
    if !result.stderr.is_empty() {
        eprint!("{}", result.stderr);
    }

    let _ = io::stdout().flush();
    let _ = io::stderr().flush();
    ExitCode::from(result.code)
}

fn has_absolute_validate_path(args: &[String]) -> bool {
    matches!(args.first().map(String::as_str), Some("validate"))
        && args.iter().skip(1).any(|arg| {
            !arg.starts_with('-')
                && (Path::new(arg).is_absolute() || drive_absolute(arg) || arg.starts_with("\\\\"))
        })
}

fn drive_absolute(value: &str) -> bool {
    let bytes = value.as_bytes();
    bytes.len() >= 3
        && bytes[0].is_ascii_alphabetic()
        && bytes[1] == b':'
        && matches!(bytes[2], b'/' | b'\\')
}
