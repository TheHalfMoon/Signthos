use std::io::{self, Write as _};
use std::process::ExitCode;

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
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
