use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::time::{SystemTime, UNIX_EPOCH};

fn binary() -> &'static str {
    env!("CARGO_BIN_EXE_signthos-provenance")
}

fn repository_root() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("../..")
        .canonicalize()
        .expect("repository root is available")
}

fn temp_root(label: &str) -> PathBuf {
    let nonce = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("system clock must be after Unix epoch")
        .as_nanos();
    std::env::temp_dir().join(format!(
        "signthos-notice-{label}-{}-{nonce}",
        std::process::id()
    ))
}

#[test]
fn canonical_notice_is_byte_current_and_repeatable() {
    let root = repository_root();
    let first = Command::new(binary())
        .arg("notice")
        .current_dir(&root)
        .output()
        .expect("notice command executes");
    let second = Command::new(binary())
        .arg("notice")
        .current_dir(&root)
        .output()
        .expect("notice command repeats");

    assert!(first.status.success(), "{}", String::from_utf8_lossy(&first.stderr));
    assert!(second.status.success(), "{}", String::from_utf8_lossy(&second.stderr));
    assert_eq!(first.stdout, second.stdout);
    assert_eq!(first.stdout, include_bytes!("../../../NOTICE"));
    assert!(!first.stdout.contains(&b'\r'));
}

#[test]
fn notice_check_accepts_canonical_bytes() {
    let output = Command::new(binary())
        .args(["notice", "--check"])
        .current_dir(repository_root())
        .output()
        .expect("notice check executes");

    assert!(output.status.success(), "{}", String::from_utf8_lossy(&output.stderr));
    assert_eq!(output.stdout, b"NOTICE_CURRENT\n");
    assert!(output.stderr.is_empty());
}

#[test]
fn notice_check_detects_byte_drift_without_mutating_notice() {
    let root = temp_root("drift");
    fs::create_dir_all(root.join("provenance/components")).expect("fixture directory is created");
    fs::write(
        root.join("provenance/components/registry.json"),
        include_bytes!("../../../provenance/components/registry.json"),
    )
    .expect("component registry fixture is written");
    fs::write(root.join("NOTICE"), b"drift\n").expect("drifted NOTICE is written");

    let before = fs::read(root.join("NOTICE")).expect("NOTICE is readable");
    let output = Command::new(binary())
        .args(["notice", "--check"])
        .current_dir(&root)
        .output()
        .expect("notice check executes");
    let after = fs::read(root.join("NOTICE")).expect("NOTICE remains readable");
    let _ = fs::remove_dir_all(&root);

    assert_eq!(output.status.code(), Some(1));
    assert!(output.stdout.is_empty());
    assert!(String::from_utf8_lossy(&output.stderr).contains("NOTICE_DRIFT"));
    assert_eq!(before, after);
}

#[test]
fn notice_usage_rejects_mutating_options() {
    let output = Command::new(binary())
        .args(["notice", "--write"])
        .current_dir(repository_root())
        .output()
        .expect("notice usage executes");

    assert_eq!(output.status.code(), Some(2));
    assert!(String::from_utf8_lossy(&output.stderr).contains("optional --check"));
}
