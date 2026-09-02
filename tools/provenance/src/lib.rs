pub const EXIT_SUCCESS: u8 = 0;
pub const EXIT_VALIDATION_FAILURE: u8 = 1;
pub const EXIT_USAGE_ERROR: u8 = 2;
pub const EXIT_LOCAL_IO_UNAVAILABLE: u8 = 3;
pub const EXIT_INTERNAL_INVARIANT: u8 = 4;

pub const HELP: &str = "Usage: signthos-provenance <COMMAND>\n\nCommands:\n  validate       Validate canonical provenance records\n  verify-source  Verify a record against a caller-supplied local checkout\n  notice         Generate or check deterministic NOTICE output\n  explain        Explain a canonical provenance record\n\nBootstrap note: command implementations arrive in their owning Spec 001 grains.\n";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct CliResult {
    pub code: u8,
    pub stdout: &'static str,
    pub stderr: &'static str,
}

pub fn dependency_sanity() -> bool {
    spdx::Expression::parse("MIT OR Apache-2.0").is_ok()
}

pub fn run(args: &[&str]) -> CliResult {
    match args {
        ["-h"] | ["--help"] => CliResult {
            code: EXIT_SUCCESS,
            stdout: HELP,
            stderr: "",
        },
        ["-V"] | ["--version"] => CliResult {
            code: EXIT_SUCCESS,
            stdout: concat!(env!("CARGO_PKG_NAME"), " ", env!("CARGO_PKG_VERSION"), "\n"),
            stderr: "",
        },
        [] => CliResult {
            code: EXIT_USAGE_ERROR,
            stdout: "",
            stderr: "CLI_USAGE: a command is required; use --help\n",
        },
        ["validate"] | ["verify-source"] | ["notice"] | ["explain"] => CliResult {
            code: EXIT_USAGE_ERROR,
            stdout: "",
            stderr: "CLI_BOOTSTRAP_UNAVAILABLE: command is reserved but not implemented in Grain B\n",
        },
        _ => CliResult {
            code: EXIT_USAGE_ERROR,
            stdout: "",
            stderr: "CLI_USAGE: unknown command or arguments; use --help\n",
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn exit_code_contract_is_stable() {
        assert_eq!(EXIT_SUCCESS, 0);
        assert_eq!(EXIT_VALIDATION_FAILURE, 1);
        assert_eq!(EXIT_USAGE_ERROR, 2);
        assert_eq!(EXIT_LOCAL_IO_UNAVAILABLE, 3);
        assert_eq!(EXIT_INTERNAL_INVARIANT, 4);
    }

    #[test]
    fn pinned_spdx_parser_is_callable() {
        assert!(dependency_sanity());
    }

    #[test]
    fn help_is_successful() {
        let result = run(&["--help"]);
        assert_eq!(result.code, EXIT_SUCCESS);
        assert!(result.stdout.contains("validate"));
    }

    #[test]
    fn known_future_command_is_fail_closed_during_bootstrap() {
        let result = run(&["validate"]);
        assert_eq!(result.code, EXIT_USAGE_ERROR);
        assert!(result.stderr.contains("CLI_BOOTSTRAP_UNAVAILABLE"));
    }
}
