use crate::{secure_io, sha256};
use serde_json::Value;
use std::ffi::OsString;
use std::io::Read as _;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};

const IMPORT_DIRECTORY: &str = "provenance/imports";
const SMALL_GIT_OUTPUT_LIMIT: u64 = 8 * 1024;

#[derive(Debug, Clone, PartialEq, Eq)]
pub(crate) enum VerifySourceError {
    Verification(String),
    Io(String),
}

#[derive(Debug, Clone, PartialEq, Eq)]
struct SourceFacts {
    id: String,
    repository: String,
    commit: String,
    path: String,
    sha256: String,
}

pub(crate) fn verify_source(
    record_id: &str,
    source_root: &str,
) -> Result<String, VerifySourceError> {
    if !canonical_record_id(record_id) {
        return Err(VerifySourceError::Verification(
            "SOURCE_RECORD_ID: record id is not canonical".to_owned(),
        ));
    }

    let facts = find_source_record(record_id)?;
    let root = SourceRoot::open(source_root)?;
    let git = GitAdapter::new(root.command_directory());

    git.ensure_repository_root()?;
    let head = git.head()?;
    if head != facts.commit {
        return Err(VerifySourceError::Verification(format!(
            "SOURCE_COMMIT_MISMATCH: record `{}` does not match local HEAD",
            facts.id
        )));
    }

    let remote = git.origin_repository()?;
    if remote != facts.repository {
        return Err(VerifySourceError::Verification(format!(
            "SOURCE_REPOSITORY_MISMATCH: record `{}` does not match local origin",
            facts.id
        )));
    }

    let tree_entry = git.tree_entry(&facts.commit, &facts.path)?;
    match tree_entry.mode.as_str() {
        "120000" => {
            return Err(VerifySourceError::Verification(format!(
                "SOURCE_PATH_SYMLINK: record `{}` upstream path is a symlink",
                facts.id
            )));
        }
        "100644" | "100755" if tree_entry.kind == "blob" => {}
        _ => {
            return Err(VerifySourceError::Verification(format!(
                "SOURCE_PATH_TYPE: record `{}` upstream path is not a regular blob",
                facts.id
            )));
        }
    }

    let digest = git.blob_sha256(&tree_entry.object)?;
    if digest != facts.sha256 {
        return Err(VerifySourceError::Verification(format!(
            "SOURCE_DIGEST_MISMATCH: record `{}` source digest differs from manifest",
            facts.id
        )));
    }

    Ok(format!(
        "SOURCE_VERIFIED {}: source facts match local checkout; import authorization not evaluated\n",
        facts.id
    ))
}

fn find_source_record(record_id: &str) -> Result<SourceFacts, VerifySourceError> {
    let metadata = match std::fs::symlink_metadata(IMPORT_DIRECTORY) {
        Ok(metadata) => metadata,
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => {
            return Err(VerifySourceError::Verification(format!(
                "SOURCE_RECORD_NOT_FOUND: record `{record_id}` was not found"
            )));
        }
        Err(_) => {
            return Err(VerifySourceError::Io(
                "SOURCE_RECORD_IO: canonical import directory is unavailable".to_owned(),
            ));
        }
    };
    if metadata.file_type().is_symlink() || !metadata.is_dir() {
        return Err(VerifySourceError::Io(
            "SOURCE_RECORD_IO: canonical import directory is not a regular directory".to_owned(),
        ));
    }

    let mut paths = Vec::new();
    secure_io::collect_json_files(IMPORT_DIRECTORY, &mut paths).map_err(|_| {
        VerifySourceError::Io("SOURCE_RECORD_IO: import records are unreadable".to_owned())
    })?;
    paths.sort();

    let mut found = None;
    for path in paths {
        let bytes = secure_io::read_record_bounded(&path).map_err(|_| {
            VerifySourceError::Io("SOURCE_RECORD_IO: import record is unreadable".to_owned())
        })?;
        let value: Value = serde_json::from_slice(&bytes).map_err(|_| {
            VerifySourceError::Verification(format!(
                "SOURCE_RECORD_JSON: canonical import record `{path}` is invalid JSON"
            ))
        })?;
        let Some(record) = value.as_object() else {
            return Err(VerifySourceError::Verification(format!(
                "SOURCE_RECORD_JSON: canonical import record `{path}` is not an object"
            )));
        };
        if record.get("kind").and_then(Value::as_str) != Some("source_import") {
            continue;
        }
        if record.get("id").and_then(Value::as_str) != Some(record_id) {
            continue;
        }
        if found.is_some() {
            return Err(VerifySourceError::Verification(format!(
                "SOURCE_RECORD_DUPLICATE: record `{record_id}` is declared more than once"
            )));
        }
        found = Some(source_facts(record_id, record)?);
    }

    found.ok_or_else(|| {
        VerifySourceError::Verification(format!(
            "SOURCE_RECORD_NOT_FOUND: record `{record_id}` was not found"
        ))
    })
}

fn source_facts(
    record_id: &str,
    record: &serde_json::Map<String, Value>,
) -> Result<SourceFacts, VerifySourceError> {
    let upstream = record
        .get("upstream")
        .and_then(Value::as_object)
        .ok_or_else(|| record_field_error(record_id, "upstream"))?;
    let repository = field(upstream, "repository")?;
    let commit = field(upstream, "commit")?;
    let path = field(upstream, "path")?;
    let sha256 = field(upstream, "sha256")?;

    if !canonical_repository(&repository) {
        return Err(record_field_error(record_id, "upstream.repository"));
    }
    if !lower_hex(&commit, 40) {
        return Err(record_field_error(record_id, "upstream.commit"));
    }
    if !canonical_relative_path(&path) {
        return Err(record_field_error(record_id, "upstream.path"));
    }
    if !lower_hex(&sha256, 64) {
        return Err(record_field_error(record_id, "upstream.sha256"));
    }

    Ok(SourceFacts {
        id: record_id.to_owned(),
        repository,
        commit,
        path,
        sha256,
    })
}

fn field(object: &serde_json::Map<String, Value>, key: &str) -> Result<String, VerifySourceError> {
    object
        .get(key)
        .and_then(Value::as_str)
        .filter(|value| !value.is_empty())
        .map(str::to_owned)
        .ok_or_else(|| {
            VerifySourceError::Verification(format!("SOURCE_RECORD_FIELD: missing `{key}`"))
        })
}

fn record_field_error(record_id: &str, field: &str) -> VerifySourceError {
    VerifySourceError::Verification(format!(
        "SOURCE_RECORD_FIELD: record `{record_id}` has invalid `{field}`"
    ))
}

struct SourceRoot {
    command_directory: PathBuf,
    #[cfg(target_os = "linux")]
    _directory: std::fs::File,
}

impl SourceRoot {
    fn open(source_root: &str) -> Result<Self, VerifySourceError> {
        if source_root.is_empty() {
            return Err(VerifySourceError::Io(
                "SOURCE_ROOT_IO: source root is unavailable".to_owned(),
            ));
        }
        let path = Path::new(source_root);
        let metadata = std::fs::symlink_metadata(path).map_err(|_| {
            VerifySourceError::Io("SOURCE_ROOT_IO: source root is unavailable".to_owned())
        })?;
        if metadata.file_type().is_symlink() {
            return Err(VerifySourceError::Verification(
                "SOURCE_ROOT_SYMLINK: source root must not be a symlink".to_owned(),
            ));
        }
        if !metadata.is_dir() {
            return Err(VerifySourceError::Verification(
                "SOURCE_ROOT_NOT_DIRECTORY: source root must be a directory".to_owned(),
            ));
        }
        Self::open_platform(path)
    }

    #[cfg(target_os = "linux")]
    fn open_platform(path: &Path) -> Result<Self, VerifySourceError> {
        use std::fs::OpenOptions;
        use std::os::fd::AsRawFd as _;
        use std::os::unix::fs::OpenOptionsExt as _;

        const O_DIRECTORY: i32 = 0o200000;
        const O_NOFOLLOW: i32 = 0o400000;

        let directory = OpenOptions::new()
            .read(true)
            .custom_flags(O_DIRECTORY | O_NOFOLLOW)
            .open(path)
            .map_err(|_| {
                VerifySourceError::Io(
                    "SOURCE_ROOT_IO: source root could not be opened without following symlinks"
                        .to_owned(),
                )
            })?;
        let metadata = directory.metadata().map_err(|_| {
            VerifySourceError::Io("SOURCE_ROOT_IO: source root metadata is unavailable".to_owned())
        })?;
        if !metadata.is_dir() {
            return Err(VerifySourceError::Verification(
                "SOURCE_ROOT_NOT_DIRECTORY: source root must be a directory".to_owned(),
            ));
        }
        let command_directory = PathBuf::from(format!("/proc/self/fd/{}", directory.as_raw_fd()));
        Ok(Self {
            command_directory,
            _directory: directory,
        })
    }

    #[cfg(not(target_os = "linux"))]
    fn open_platform(path: &Path) -> Result<Self, VerifySourceError> {
        let command_directory = std::fs::canonicalize(path).map_err(|_| {
            VerifySourceError::Io("SOURCE_ROOT_IO: source root is unavailable".to_owned())
        })?;
        let metadata = std::fs::symlink_metadata(&command_directory).map_err(|_| {
            VerifySourceError::Io("SOURCE_ROOT_IO: source root metadata is unavailable".to_owned())
        })?;
        if metadata.file_type().is_symlink() || !metadata.is_dir() {
            return Err(VerifySourceError::Verification(
                "SOURCE_ROOT_NOT_DIRECTORY: source root must resolve to a regular directory"
                    .to_owned(),
            ));
        }
        Ok(Self { command_directory })
    }

    fn command_directory(&self) -> &Path {
        &self.command_directory
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
struct TreeEntry {
    mode: String,
    kind: String,
    object: String,
}

#[derive(Debug, Clone)]
struct GitAdapter {
    executable: OsString,
    root: PathBuf,
}

impl GitAdapter {
    fn new(root: &Path) -> Self {
        Self {
            executable: OsString::from("git"),
            root: root.to_owned(),
        }
    }

    #[cfg(test)]
    fn with_executable(root: &Path, executable: impl Into<OsString>) -> Self {
        Self {
            executable: executable.into(),
            root: root.to_owned(),
        }
    }

    fn ensure_repository_root(&self) -> Result<(), VerifySourceError> {
        let output = self.capture(GitOperation::RepositoryPrefix, "SOURCE_GIT_ROOT")?;
        if output.is_empty() || output == b"\n" {
            return Ok(());
        }
        Err(VerifySourceError::Verification(
            "SOURCE_ROOT_NOT_REPOSITORY_ROOT: source root must be the local Git checkout root"
                .to_owned(),
        ))
    }

    fn head(&self) -> Result<String, VerifySourceError> {
        let output = self.capture(GitOperation::Head, "SOURCE_GIT_HEAD")?;
        let head = canonical_single_line(&output, "SOURCE_GIT_HEAD")?;
        if !lower_hex(&head, 40) {
            return Err(VerifySourceError::Verification(
                "SOURCE_GIT_HEAD: local HEAD is not a canonical 40-character commit id".to_owned(),
            ));
        }
        Ok(head)
    }

    fn origin_repository(&self) -> Result<String, VerifySourceError> {
        let output = self.capture(GitOperation::OriginUrl, "SOURCE_GIT_REMOTE")?;
        let remote = canonical_single_line(&output, "SOURCE_GIT_REMOTE")?;
        normalize_repository_url(&remote).ok_or_else(|| {
            VerifySourceError::Verification(
                "SOURCE_REPOSITORY_REMOTE: local origin is not a supported canonical GitHub repository URL"
                    .to_owned(),
            )
        })
    }

    fn tree_entry(&self, commit: &str, path: &str) -> Result<TreeEntry, VerifySourceError> {
        let output = self.capture(
            GitOperation::TreeEntry {
                commit: commit.to_owned(),
                path: path.to_owned(),
            },
            "SOURCE_GIT_TREE",
        )?;
        if output.is_empty() {
            return Err(VerifySourceError::Verification(
                "SOURCE_PATH_MISSING: upstream path does not exist at pinned revision".to_owned(),
            ));
        }
        let mut records = output
            .split(|byte| *byte == 0)
            .filter(|record| !record.is_empty());
        let record = records.next().ok_or_else(|| {
            VerifySourceError::Verification(
                "SOURCE_GIT_TREE: local Git returned an invalid tree entry".to_owned(),
            )
        })?;
        if records.next().is_some() {
            return Err(VerifySourceError::Verification(
                "SOURCE_GIT_TREE: local Git returned multiple exact-path entries".to_owned(),
            ));
        }
        parse_tree_entry(record, path)
    }

    fn blob_sha256(&self, object: &str) -> Result<String, VerifySourceError> {
        if !lower_hex(object, 40) && !lower_hex(object, 64) {
            return Err(VerifySourceError::Verification(
                "SOURCE_BLOB_OBJECT: local Git returned a non-canonical blob id".to_owned(),
            ));
        }
        let mut child = self
            .command(GitOperation::CatBlob(object.to_owned()))
            .stdout(Stdio::piped())
            .stderr(Stdio::null())
            .spawn()
            .map_err(map_git_spawn_error)?;
        let stdout = child.stdout.take().ok_or_else(|| {
            VerifySourceError::Io("SOURCE_BLOB_READ: local Git stdout is unavailable".to_owned())
        })?;
        let digest = match sha256::digest_reader(stdout) {
            Ok(digest) => digest,
            Err(_) => {
                let _ = child.kill();
                let _ = child.wait();
                return Err(VerifySourceError::Io(
                    "SOURCE_BLOB_READ: local Git blob output is unreadable".to_owned(),
                ));
            }
        };
        let status = child.wait().map_err(|_| {
            VerifySourceError::Io(
                "SOURCE_BLOB_READ: local Git process could not be joined".to_owned(),
            )
        })?;
        if !status.success() {
            return Err(VerifySourceError::Verification(
                "SOURCE_BLOB_READ: local Git could not read the pinned blob".to_owned(),
            ));
        }
        Ok(digest)
    }

    fn capture(
        &self,
        operation: GitOperation,
        failure_code: &'static str,
    ) -> Result<Vec<u8>, VerifySourceError> {
        let mut child = self
            .command(operation)
            .stdout(Stdio::piped())
            .stderr(Stdio::null())
            .spawn()
            .map_err(map_git_spawn_error)?;
        let mut stdout = child.stdout.take().ok_or_else(|| {
            VerifySourceError::Io(format!("{failure_code}: local Git stdout is unavailable"))
        })?;
        let mut output = Vec::new();
        stdout
            .by_ref()
            .take(SMALL_GIT_OUTPUT_LIMIT + 1)
            .read_to_end(&mut output)
            .map_err(|_| {
                VerifySourceError::Io(format!("{failure_code}: local Git output is unreadable"))
            })?;
        if output.len() as u64 > SMALL_GIT_OUTPUT_LIMIT {
            let _ = child.kill();
            let _ = child.wait();
            return Err(VerifySourceError::Verification(format!(
                "{failure_code}: local Git output exceeded the bounded limit"
            )));
        }
        let status = child.wait().map_err(|_| {
            VerifySourceError::Io(format!(
                "{failure_code}: local Git process could not be joined"
            ))
        })?;
        if !status.success() {
            return Err(VerifySourceError::Verification(format!(
                "{failure_code}: local Git command failed"
            )));
        }
        Ok(output)
    }

    fn command(&self, operation: GitOperation) -> Command {
        let mut command = Command::new(&self.executable);
        for (key, _) in std::env::vars_os() {
            if git_environment_key(&key) {
                command.env_remove(key);
            }
        }
        command
            .current_dir(&self.root)
            .env("GIT_TERMINAL_PROMPT", "0")
            .env("GIT_OPTIONAL_LOCKS", "0")
            .env("GIT_CONFIG_NOSYSTEM", "1")
            .args(operation.args());
        command
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
enum GitOperation {
    RepositoryPrefix,
    Head,
    OriginUrl,
    TreeEntry { commit: String, path: String },
    CatBlob(String),
}

impl GitOperation {
    fn args(&self) -> Vec<OsString> {
        match self {
            Self::RepositoryPrefix => vec!["rev-parse".into(), "--show-prefix".into()],
            Self::Head => vec![
                "rev-parse".into(),
                "--verify".into(),
                "HEAD^{commit}".into(),
            ],
            Self::OriginUrl => vec![
                "config".into(),
                "--local".into(),
                "--get".into(),
                "remote.origin.url".into(),
            ],
            Self::TreeEntry { commit, path } => vec![
                "ls-tree".into(),
                "-z".into(),
                "--full-tree".into(),
                commit.as_str().into(),
                "--".into(),
                format!(":(top,literal){path}").into(),
            ],
            Self::CatBlob(object) => {
                vec!["cat-file".into(), "blob".into(), object.as_str().into()]
            }
        }
    }
}

fn git_environment_key(key: &std::ffi::OsStr) -> bool {
    key.to_string_lossy()
        .get(..4)
        .is_some_and(|prefix| prefix.eq_ignore_ascii_case("GIT_"))
}

fn map_git_spawn_error(error: std::io::Error) -> VerifySourceError {
    if error.kind() == std::io::ErrorKind::NotFound {
        VerifySourceError::Io(
            "SOURCE_GIT_UNAVAILABLE: local git executable is unavailable".to_owned(),
        )
    } else {
        VerifySourceError::Io("SOURCE_GIT_IO: local git process could not be started".to_owned())
    }
}

fn canonical_single_line(bytes: &[u8], code: &'static str) -> Result<String, VerifySourceError> {
    let text = std::str::from_utf8(bytes).map_err(|_| {
        VerifySourceError::Verification(format!("{code}: local Git output is not UTF-8"))
    })?;
    let line = text.strip_suffix('\n').unwrap_or(text);
    if line.is_empty()
        || line
            .chars()
            .any(|character| matches!(character, '\n' | '\r' | '\0'))
    {
        return Err(VerifySourceError::Verification(format!(
            "{code}: local Git output is not one canonical line"
        )));
    }
    Ok(line.to_owned())
}

fn parse_tree_entry(record: &[u8], expected_path: &str) -> Result<TreeEntry, VerifySourceError> {
    let tab = record
        .iter()
        .position(|byte| *byte == b'\t')
        .ok_or_else(|| {
            VerifySourceError::Verification(
                "SOURCE_GIT_TREE: local Git returned an invalid tree entry".to_owned(),
            )
        })?;
    let header = std::str::from_utf8(&record[..tab]).map_err(|_| {
        VerifySourceError::Verification(
            "SOURCE_GIT_TREE: local Git returned a non-UTF-8 tree header".to_owned(),
        )
    })?;
    if &record[tab + 1..] != expected_path.as_bytes() {
        return Err(VerifySourceError::Verification(
            "SOURCE_GIT_TREE: local Git returned a non-exact path".to_owned(),
        ));
    }
    let mut fields = header.split(' ');
    let (Some(mode), Some(kind), Some(object), None) =
        (fields.next(), fields.next(), fields.next(), fields.next())
    else {
        return Err(VerifySourceError::Verification(
            "SOURCE_GIT_TREE: local Git returned an invalid tree header".to_owned(),
        ));
    };
    Ok(TreeEntry {
        mode: mode.to_owned(),
        kind: kind.to_owned(),
        object: object.to_owned(),
    })
}

fn normalize_repository_url(value: &str) -> Option<String> {
    let candidate = if canonical_repository(value) {
        value
    } else if let Some(value) = value.strip_prefix("https://github.com/") {
        value.strip_suffix(".git").unwrap_or(value)
    } else if let Some(value) = value.strip_prefix("git@github.com:") {
        value.strip_suffix(".git").unwrap_or(value)
    } else if let Some(value) = value.strip_prefix("ssh://git@github.com/") {
        value.strip_suffix(".git").unwrap_or(value)
    } else {
        return None;
    };
    canonical_repository(candidate).then(|| candidate.to_owned())
}

fn canonical_repository(value: &str) -> bool {
    if !value.is_ascii() || value.contains('\\') {
        return false;
    }
    let mut parts = value.split('/');
    matches!(
        (parts.next(), parts.next(), parts.next()),
        (Some(owner), Some(repository), None)
            if repository_segment(owner) && repository_segment(repository)
    )
}

fn repository_segment(value: &str) -> bool {
    !value.is_empty()
        && !matches!(value, "." | "..")
        && value
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'.' | b'_' | b'-'))
}

fn canonical_record_id(value: &str) -> bool {
    (3..=128).contains(&value.len())
        && value.is_ascii()
        && value
            .bytes()
            .next()
            .is_some_and(|byte| byte.is_ascii_alphanumeric())
        && value
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'.' | b'_' | b'-'))
}

fn canonical_relative_path(value: &str) -> bool {
    if value.is_empty()
        || value.starts_with('/')
        || value.ends_with('/')
        || value.contains('\\')
        || value
            .chars()
            .any(|character| matches!(character, '\n' | '\r' | '\u{2028}' | '\u{2029}'))
        || drive_qualified(value)
    {
        return false;
    }
    value
        .split('/')
        .all(|segment| !segment.is_empty() && segment != "." && segment != "..")
}

fn drive_qualified(value: &str) -> bool {
    let bytes = value.as_bytes();
    bytes.len() >= 3 && bytes[0].is_ascii_alphabetic() && bytes[1] == b':' && bytes[2] == b'/'
}

fn lower_hex(value: &str, length: usize) -> bool {
    value.len() == length
        && value
            .bytes()
            .all(|byte| byte.is_ascii_digit() || (b'a'..=b'f').contains(&byte))
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::ffi::OsStr;

    #[test]
    fn git_operation_surface_has_no_network_mutating_verbs() {
        let operations = [
            GitOperation::RepositoryPrefix,
            GitOperation::Head,
            GitOperation::OriginUrl,
            GitOperation::TreeEntry {
                commit: "a".repeat(40),
                path: "src/example.txt".to_owned(),
            },
            GitOperation::CatBlob("b".repeat(40)),
        ];
        for operation in operations {
            let args = operation.args();
            let rendered: Vec<String> = args
                .iter()
                .map(|arg| arg.to_string_lossy().into_owned())
                .collect();
            assert!(!rendered.iter().any(|arg| arg == "fetch" || arg == "clone"));
            assert!(matches!(
                rendered.first().map(String::as_str),
                Some("rev-parse" | "config" | "ls-tree" | "cat-file")
            ));
        }
    }

    #[test]
    fn git_environment_filter_is_case_insensitive() {
        for key in ["GIT_DIR", "git_common_dir", "Git_Config_Count"] {
            assert!(git_environment_key(OsStr::new(key)), "{key}");
        }
        for key in ["PATH", "HOME", "SIGNTHOS_GIT_TEST"] {
            assert!(!git_environment_key(OsStr::new(key)), "{key}");
        }
    }

    #[test]
    fn remote_urls_normalize_only_supported_github_forms() {
        for value in [
            "example/repository",
            "https://github.com/example/repository.git",
            "git@github.com:example/repository.git",
            "ssh://git@github.com/example/repository.git",
        ] {
            assert_eq!(
                normalize_repository_url(value).as_deref(),
                Some("example/repository")
            );
        }
        for value in [
            "https://example.com/example/repository.git",
            "file:///tmp/repository",
            "../repository",
            "https://github.com/example/repository/extra",
        ] {
            assert_eq!(normalize_repository_url(value), None, "{value}");
        }
    }

    #[test]
    fn tree_entry_parser_preserves_mode_kind_and_object() {
        let object = "b".repeat(40);
        let record = format!("100644 blob {object}\tsrc/example.txt");
        let entry = parse_tree_entry(record.as_bytes(), "src/example.txt").unwrap();
        assert_eq!(entry.mode, "100644");
        assert_eq!(entry.kind, "blob");
        assert_eq!(entry.object, object);
    }

    #[test]
    fn tree_entry_parser_rejects_non_exact_path() {
        let object = "b".repeat(40);
        let record = format!("100644 blob {object}\tsrc/other.txt");
        let error = parse_tree_entry(record.as_bytes(), "src/example.txt").unwrap_err();
        assert!(matches!(error, VerifySourceError::Verification(_)));
    }

    #[test]
    fn missing_git_is_reported_as_local_io_unavailable() {
        let adapter = GitAdapter::with_executable(
            Path::new("."),
            OsStr::new("definitely-not-a-real-signthos-git-executable"),
        );
        let error = adapter.head().unwrap_err();
        match error {
            VerifySourceError::Io(message) => {
                assert!(message.starts_with("SOURCE_GIT_UNAVAILABLE:"));
            }
            VerifySourceError::Verification(message) => {
                panic!("missing git must be I/O failure, got {message}");
            }
        }
    }
}
