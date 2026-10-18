use crate::error::CabookError;
use crate::media::MediaItem;
use crate::paths::app_data_dir;
use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::sync::Mutex;

/// A hierarchical section (Bab/Modul) that can be nested up to 3 levels
/// deep inside a playlist (PRD §F4).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Section {
    pub id: String,
    pub name: String,
    pub parent_id: Option<String>,
    pub depth: u8,
}

/// A top-level playlist (Silabus) containing sections and media items.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Playlist {
    pub id: String,
    pub title: String,
    pub description: String,
    pub sections: Vec<Section>,
    pub items: Vec<MediaItem>,
    /// Optional deadline timestamp in ISO 8601 (materiai wajib).
    pub deadline: Option<String>,
}

/// Snapshot of a user's progress across all items in a playlist.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct ProgressSnapshot {
    pub playlist_id: String,
    pub completed_items: u32,
    pub total_items: u32,
    /// 0.0 ..= 1.0
    pub fraction: f64,
}

pub struct ProgressTracker {
    conn: Mutex<Connection>,
}

impl ProgressTracker {
    pub fn open() -> Result<Self, CabookError> {
        let dir = app_data_dir()?;
        let path = dir.join("progress.db");
        let conn = Connection::open(&path).map_err(|e| CabookError::Db(e.to_string()))?;
        conn.execute_batch(
            r#"
            CREATE TABLE IF NOT EXISTS progress (
                playlist_id TEXT NOT NULL,
                item_id     TEXT NOT NULL,
                completed   INTEGER NOT NULL DEFAULT 0,
                last_seen   INTEGER NOT NULL DEFAULT 0,
                PRIMARY KEY (playlist_id, item_id)
            );
            "#,
        )
        .map_err(|e| CabookError::Db(e.to_string()))?;

        Ok(Self {
            conn: Mutex::new(conn),
        })
    }

    pub fn mark_complete(&self, playlist_id: &str, item_id: &str) -> Result<(), CabookError> {
        let conn = self.conn.lock().map_err(|e| CabookError::Db(e.to_string()))?;
        let now = chrono::Utc::now().timestamp();
        conn.execute(
            r#"
            INSERT INTO progress (playlist_id, item_id, completed, last_seen)
            VALUES (?1, ?2, 1, ?3)
            ON CONFLICT(playlist_id, item_id) DO UPDATE SET
                completed = 1,
                last_seen = excluded.last_seen;
            "#,
            params![playlist_id, item_id, now],
        )
        .map_err(|e| CabookError::Db(e.to_string()))?;
        Ok(())
    }

    pub fn snapshot(
        &self,
        playlist: &Playlist,
    ) -> Result<ProgressSnapshot, CabookError> {
        let conn = self.conn.lock().map_err(|e| CabookError::Db(e.to_string()))?;
        let total = playlist.items.len() as u32;
        let mut completed: u32 = 0;

        for item in &playlist.items {
            let n: i64 = conn
                .query_row(
                    "SELECT COUNT(*) FROM progress WHERE playlist_id = ?1 AND item_id = ?2 AND completed = 1",
                    params![playlist.id, item.id],
                    |r| r.get(0),
                )
                .unwrap_or(0);
            completed += n as u32;
        }

        let fraction = if total == 0 {
            0.0
        } else {
            completed as f64 / total as f64
        };

        Ok(ProgressSnapshot {
            playlist_id: playlist.id.clone(),
            completed_items: completed,
            total_items: total,
            fraction,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::media::MediaKind;

    #[test]
    fn progress_snapshot_computes_fraction() {
        let tmp = std::env::temp_dir().join(format!("cabook-test-{}", uuid::Uuid::now_v7()));
        std::fs::create_dir_all(&tmp).unwrap();
        unsafe { std::env::set_var("CABOOK_DATA_DIR", &tmp) };

        let tracker = ProgressTracker::open().unwrap();
        let item = |id: &str| MediaItem {
            id: id.into(),
            title: id.into(),
            kind: MediaKind::Pdf,
            source: format!("/tmp/{id}.pdf"),
            description: String::new(),
        };

        let pl = Playlist {
            id: "pl-1".into(),
            title: "Test".into(),
            description: String::new(),
            sections: vec![],
            items: vec![item("i1"), item("i2"), item("i3")],
            deadline: None,
        };

        assert_eq!(tracker.snapshot(&pl).unwrap().completed_items, 0);

        tracker.mark_complete("pl-1", "i1").unwrap();
        tracker.mark_complete("pl-1", "i2").unwrap();

        let snap = tracker.snapshot(&pl).unwrap();
        assert_eq!(snap.completed_items, 2);
        assert_eq!(snap.total_items, 3);
        assert!((snap.fraction - 2.0 / 3.0).abs() < 1e-6);
    }
}
