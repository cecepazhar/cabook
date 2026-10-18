use thiserror::Error;

#[derive(Debug, Error)]
pub enum CabookError {
    #[error("I/O error: {0}")]
    Io(String),

    #[error("Database error: {0}")]
    Db(String),

    #[error("Playlist not found: {0}")]
    PlaylistNotFound(String),

    #[error("Media decoding/format error: {0}")]
    MediaUnsupported(String),

    #[error("Serialization error: {0}")]
    Serialization(String),

    #[error(".cabook package validation error: {0}")]
    PackageInvalid(String),
}
