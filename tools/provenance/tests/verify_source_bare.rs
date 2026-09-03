#![cfg(unix)]

use serde_json::json;
use std::fs;
use std::path::PathBuf;
use std::process::Command;
use std::time::{SystemTime, UNIX_EPOCH};

const RECORD_ID: &str = "bare-source-001";

fn temp_root() -> PathBuf {
    let nonce = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("system clock must be after Unix epoch")
        .as_nanos();
    std::env::temp_dir().join(format!(
        "signthos-grain-h-bare-{}-{nonce}",
        std::process::id()
    ))
}

#[test]
fn bare_repository_fails_closed_before_source_fact_verification() {
    let root = temp_root();
    let workspace = root.join("workspace");
    let imports = workspace.join("provenance/imports");
    let bare = root.join("source.git");
    fs::create_dir_all(&imports).expect("import record directory is created");

    let git = Command::new("git")
        .args(["init", "--bare", "-q"])
        .arg(&bare)
        .output()
        .expect("local git must execute on the qualification host");
    assert!(
        git.status.success(),
        "git init --bare failed: {}",
        String::from_utf8_lossy(&git.stderr)
    );

    let record = json!({
        "kind": "source_import",
        "id": RECORD_ID,
        "upstream": {
            "repository": "example/repository",
            "commit": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "path": "src/example.txt",
            "sha256": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
        }
    });
    fs::write(
        imports.join("record.json"),
        serde_json::to_vec_pretty(&record).expect("record serializes"),
    )
    .expect("record fixture is written");

    let bare_arg = bare.to_string_lossy().into_owned();
    let output = Command::new(env!("CARGO_BIN_EXE_signthos-provenance"))
        .current_dir(&workspace)
        .args([
            "verify-source",
            "--record",
            RECORD_ID,
            "--source-root",
            &bare_arg,
        ])
        .output()
        .expect("provenance binary executes");

    let _ = fs::remove_dir_all(&root);
    assert_eq!(output.status.code(), Some(1));
    assert!(output.stdout.is_empty());
    assert!(String::from_utf8_lossy(&output.stderr).contains("SOURCE_ROOT_BARE_REPOSITORY"));
}
