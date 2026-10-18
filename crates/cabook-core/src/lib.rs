//! CABook core — ambient focus mixer, multi-modal playlist manager,
//! time-synced notes store, and `.cabook` package serialization.
//!
//! Design notes (PRD §F1, §F4, §F5):
//! - Ambient mixer supports up to 6 simultaneous layers with independent
//!   gain, mute, and ducking (−12 dB ramp when the media player is
//!   `playing`).
//! - Playlists are hierarchical: Playlist → Section (max 3 levels) → Item.
//! - Notes are bound to either a `timestamp_ms` or a `page_number` so the
//!   player can seek / jump on click.
//! - `.cabook` export supports two modes: **lite** (metadata + links only,
//!   KBs) and **full** (includes local media files with SHA-256 checksums).
//!   YouTube and Google Drive items are always links.

mod ambient;
mod cabook_pkg;
mod error;
mod media;
mod notes;
mod paths;
mod playlist;

pub use ambient::{AmbientConfig, DuckingMode, AmbientMixer, PresetConfig};
pub use cabook_pkg::{CabookExportMode, CabookManifest};
pub use error::CabookError;
pub use media::MediaItem;
pub use notes::{NoteEntry, NoteStore, NoteType};
pub use playlist::{Playlist, Section, ProgressSnapshot};
