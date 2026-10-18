use crate::error::CabookError;
use crate::notes::NoteEntry;
use crate::playlist::Playlist;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum CabookExportMode {
    Lite,
    Full,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ManifestFileEntry {
    pub path: String,
    pub sha256: String,
    pub size_bytes: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CabookManifest {
    pub format_version: String,
    pub app_version: String,
    pub mode: CabookExportMode,
    pub playlist: Playlist,
    pub notes: Vec<NoteEntry>,
    pub files: Vec<ManifestFileEntry>,
}

impl CabookManifest {
    pub fn new(mode: CabookExportMode, playlist: Playlist, notes: Vec<NoteEntry>) -> Self {
        Self {
            format_version: "1.0".into(),
            app_version: env!("CARGO_PKG_VERSION").into(),
            mode,
            playlist,
            notes,
            files: vec![],
        }
    }

    /// Validates all files for path traversal vulnerabilities (PRD §F5).
    pub fn validate_file_paths(&self) -> Result<(), CabookError> {
        for file in &self.files {
            if file.path.contains("..") || file.path.starts_with('/') || file.path.starts_with('\\') {
                return Err(CabookError::PackageInvalid(format!(
                    "Path traversal detected in package: {}",
                    file.path
                )));
            }
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rejects_path_traversal() {
        let mut manifest = CabookManifest::new(
            CabookExportMode::Full,
            Playlist {
                id: "1".into(),
                title: "Test".into(),
                description: String::new(),
                sections: vec![],
                items: vec![],
                deadline: None,
            },
            vec![],
        );

        manifest.files.push(ManifestFileEntry {
            path: "../etc/passwd".into(),
            sha256: "deadbeef".into(),
            size_bytes: 123,
        });

        assert!(manifest.validate_file_paths().is_err());
    }
}
