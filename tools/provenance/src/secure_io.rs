use std::io::Read as _;
use std::path::{Component, Path, PathBuf};

use crate::MAX_RECORD_BYTES;

pub(crate) fn read_record_bounded(path: &str) -> Result<Vec<u8>, String> {
    validate_relative_components(path)?;
    let mut file = open_record_beneath_repository(path)?;
    let metadata = file
        .metadata()
        .map_err(|error| format!("IO_METADATA: {path}: {error}"))?;
    if !metadata.is_file() {
        return Err(format!("IO_NOT_FILE: {path}"));
    }

    let mut bytes = Vec::new();
    file.take(MAX_RECORD_BYTES + 1)
        .read_to_end(&mut bytes)
        .map_err(|error| format!("IO_READ: {path}: {error}"))?;
    Ok(bytes)
}

pub(crate) fn collect_json_files(directory: &str, paths: &mut Vec<String>) -> Result<(), String> {
    validate_relative_components(directory)?;
    collect_json_files_beneath_repository(directory, paths)
}

fn validate_relative_components(path: &str) -> Result<(), String> {
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

#[cfg(target_os = "linux")]
fn open_record_beneath_repository(path: &str) -> Result<std::fs::File, String> {
    let components = normal_segments(path)?;
    let (last, parents) = components
        .split_last()
        .ok_or_else(|| format!("IO_PATH: {path}: path has no file component"))?;

    let mut directory = open_repository_root()?;
    for segment in parents {
        directory = open_child_directory(&directory, segment, path)?;
    }
    open_child_file(&directory, last, path)
}

#[cfg(target_os = "linux")]
fn collect_json_files_beneath_repository(
    directory: &str,
    paths: &mut Vec<String>,
) -> Result<(), String> {
    let components = normal_segments(directory)?;
    let mut handle = open_repository_root()?;
    for segment in &components {
        handle = open_child_directory(&handle, segment, directory)?;
    }
    collect_json_files_from_handle(directory, &handle, paths)
}

#[cfg(target_os = "linux")]
fn normal_segments(path: &str) -> Result<Vec<std::ffi::OsString>, String> {
    Path::new(path)
        .components()
        .map(|component| match component {
            Component::Normal(segment) => Ok(segment.to_os_string()),
            _ => Err(format!("IO_PATH: {path}: non-normal path component")),
        })
        .collect()
}

#[cfg(target_os = "linux")]
fn open_repository_root() -> Result<std::fs::File, String> {
    use std::fs::OpenOptions;
    use std::os::unix::fs::OpenOptionsExt as _;

    const O_DIRECTORY: i32 = 0o200000;
    const O_NOFOLLOW: i32 = 0o400000;

    OpenOptions::new()
        .read(true)
        .custom_flags(O_DIRECTORY | O_NOFOLLOW)
        .open(".")
        .map_err(|error| format!("IO_SECURE_ROOT: .: {error}"))
}

#[cfg(target_os = "linux")]
fn proc_fd_child(parent: &std::fs::File, child: &std::ffi::OsStr) -> PathBuf {
    use std::os::fd::AsRawFd as _;

    PathBuf::from(format!("/proc/self/fd/{}", parent.as_raw_fd())).join(child)
}

#[cfg(target_os = "linux")]
fn secure_open_error(code: &str, path: &str, error: std::io::Error) -> String {
    if error.raw_os_error() == Some(40) {
        format!("IO_SYMLINK: {path}: canonical validation does not follow symlinks")
    } else {
        format!("{code}: {path}: {error}")
    }
}

#[cfg(target_os = "linux")]
fn open_child_directory(
    parent: &std::fs::File,
    child: &std::ffi::OsStr,
    display_path: &str,
) -> Result<std::fs::File, String> {
    use std::fs::OpenOptions;
    use std::os::unix::fs::OpenOptionsExt as _;

    const O_DIRECTORY: i32 = 0o200000;
    const O_NOFOLLOW: i32 = 0o400000;

    OpenOptions::new()
        .read(true)
        .custom_flags(O_DIRECTORY | O_NOFOLLOW)
        .open(proc_fd_child(parent, child))
        .map_err(|error| secure_open_error("IO_SECURE_TRAVERSAL", display_path, error))
}

#[cfg(target_os = "linux")]
fn open_child_file(
    parent: &std::fs::File,
    child: &std::ffi::OsStr,
    display_path: &str,
) -> Result<std::fs::File, String> {
    use std::fs::OpenOptions;
    use std::os::unix::fs::OpenOptionsExt as _;

    const O_NOFOLLOW: i32 = 0o400000;

    OpenOptions::new()
        .read(true)
        .custom_flags(O_NOFOLLOW)
        .open(proc_fd_child(parent, child))
        .map_err(|error| secure_open_error("IO_SECURE_OPEN", display_path, error))
}

#[cfg(target_os = "linux")]
fn collect_json_files_from_handle(
    directory: &str,
    handle: &std::fs::File,
    paths: &mut Vec<String>,
) -> Result<(), String> {
    use std::os::fd::AsRawFd as _;

    let proc_directory = PathBuf::from(format!("/proc/self/fd/{}", handle.as_raw_fd()));
    let entries = std::fs::read_dir(&proc_directory)
        .map_err(|error| format!("IO_READ_DIR: {directory}: {error}"))?;

    for entry in entries {
        let entry = entry.map_err(|error| format!("IO_READ_DIR: {directory}: {error}"))?;
        let name = entry.file_name();
        let name_text = name.to_str().ok_or_else(|| {
            format!("IO_PATH_ENCODING: {directory}: directory entry is not valid UTF-8")
        })?;
        if name_text == "."
            || name_text == ".."
            || name_text.contains('/')
            || name_text.contains('\\')
        {
            return Err(format!("IO_PATH: {directory}: invalid directory entry"));
        }

        let relative = format!("{directory}/{name_text}");
        let file_type = entry
            .file_type()
            .map_err(|error| format!("IO_FILE_TYPE: {relative}: {error}"))?;
        if file_type.is_symlink() {
            return Err(format!(
                "IO_SYMLINK: {relative}: canonical validation does not follow symlinks"
            ));
        }
        if file_type.is_dir() {
            let child = open_child_directory(handle, &name, &relative)?;
            collect_json_files_from_handle(&relative, &child, paths)?;
        } else if file_type.is_file()
            && Path::new(name_text)
                .extension()
                .is_some_and(|extension| extension == "json")
        {
            paths.push(relative);
        }
    }
    Ok(())
}

#[cfg(not(target_os = "linux"))]
fn open_record_beneath_repository(path: &str) -> Result<std::fs::File, String> {
    Err(format!(
        "IO_SECURE_OPEN_UNAVAILABLE: {path}: this platform lacks the approved descriptor-relative no-follow traversal"
    ))
}

#[cfg(not(target_os = "linux"))]
fn collect_json_files_beneath_repository(
    directory: &str,
    _paths: &mut Vec<String>,
) -> Result<(), String> {
    Err(format!(
        "IO_SECURE_OPEN_UNAVAILABLE: {directory}: this platform lacks the approved descriptor-relative no-follow traversal"
    ))
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use std::io::Read as _;
    use std::time::{SystemTime, UNIX_EPOCH};

    fn temp_root(label: &str) -> PathBuf {
        let nonce = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("system clock must be after Unix epoch")
            .as_nanos();
        PathBuf::from(format!(
            ".signthos-secure-io-{label}-{}-{nonce}",
            std::process::id()
        ))
    }

    #[cfg(target_os = "linux")]
    #[test]
    fn retained_parent_handle_does_not_follow_replaced_intermediate_directory() {
        use std::os::unix::fs::symlink;

        let root = temp_root("replacement");
        let original = root.join("original");
        let moved = root.join("moved");
        let external = temp_root("external");
        fs::create_dir_all(&original).expect("original directory is created");
        fs::create_dir_all(&external).expect("external directory is created");
        fs::write(original.join("record.json"), b"inside").expect("inside fixture is written");
        fs::write(external.join("record.json"), b"outside").expect("outside fixture is written");

        let root_text = root.to_string_lossy().replace('\\', "/");
        let root_handle = open_record_parent_for_test(&root_text, "original");
        fs::rename(&original, &moved).expect("checked directory is moved");
        let external_abs = fs::canonicalize(&external).expect("external directory canonicalizes");
        symlink(external_abs, &original).expect("replacement symlink is created");

        let mut file = open_child_file(
            &root_handle,
            std::ffi::OsStr::new("record.json"),
            "record.json",
        )
        .expect("retained directory handle remains usable");
        let mut bytes = Vec::new();
        file.read_to_end(&mut bytes)
            .expect("retained file is readable");

        let _ = fs::remove_file(&original);
        let _ = fs::remove_dir_all(&root);
        let _ = fs::remove_dir_all(&external);
        assert_eq!(bytes, b"inside");
    }

    #[cfg(target_os = "linux")]
    fn open_record_parent_for_test(root: &str, child: &str) -> std::fs::File {
        let components = normal_segments(root).expect("test root is canonical relative path");
        let mut handle = open_repository_root().expect("repository root opens");
        for segment in &components {
            handle =
                open_child_directory(&handle, segment, root).expect("test root opens securely");
        }
        open_child_directory(&handle, std::ffi::OsStr::new(child), child)
            .expect("test parent opens securely")
    }

    #[cfg(not(target_os = "linux"))]
    #[test]
    fn unsupported_platform_fails_closed() {
        let error = read_record_bounded("provenance/components/registry.json").unwrap_err();
        assert!(error.starts_with("IO_SECURE_OPEN_UNAVAILABLE:"));
    }
}
