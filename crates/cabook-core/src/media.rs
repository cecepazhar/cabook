use serde::{Deserialize, Serialize};

/// Type of media an item points to.  The player picks the right renderer
/// based on this value (PRD §F2 Universal Media Shell).
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum MediaKind {
    Pdf,
    Video,
    Audio,
    YouTube,
    GoogleDrive,
    LocalFile,
}

/// A single media item inside a playlist.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MediaItem {
    pub id: String,
    pub title: String,
    pub kind: MediaKind,
    /// For YouTube: video or playlist URL.
    /// For local files: absolute path.
    /// For GDrive: file ID or public link.
    pub source: String,
    pub description: String,
}

impl MediaItem {
    /// Returns a short human-readable label based on the kind, used by the
    /// UI mini-player badge.
    pub fn kind_label(&self) -> &'static str {
        match self.kind {
            MediaKind::Pdf => "PDF",
            MediaKind::Video => "Video",
            MediaKind::Audio => "Audio",
            MediaKind::YouTube => "YouTube",
            MediaKind::GoogleDrive => "GDrive",
            MediaKind::LocalFile => "File",
        }
    }

    /// YouTube and Google Drive items are always links (PRD §D13 / §F5),
    /// never embedded in a `full`-mode `.cabook` export.
    pub fn is_link_only(&self) -> bool {
        matches!(
            self.kind,
            MediaKind::YouTube | MediaKind::GoogleDrive
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn youtube_items_are_link_only() {
        let item = MediaItem {
            id: "y1".into(),
            title: "Crash Course".into(),
            kind: MediaKind::YouTube,
            source: "https://youtube.com/watch?v=abc".into(),
            description: "Lecture 1".into(),
        };
        assert!(item.is_link_only());

        let pdf = MediaItem {
            id: "p1".into(),
            title: "Book.pdf".into(),
            kind: MediaKind::Pdf,
            source: "/home/user/study/book.pdf".into(),
            description: "".into(),
        };
        assert!(!pdf.is_link_only());
    }
}
