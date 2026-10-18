use crate::error::CabookError;
use crate::paths::app_data_dir;
use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::sync::Mutex;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum NoteType {
    Note,
    Bookmark,
    Highlight,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NoteEntry {
    pub id: String,
    pub playlist_id: String,
    pub item_id: String,
    pub note_type: NoteType,
    pub body: String,
    /// Milliseconds into media for video/audio/YouTube; page number for PDF.
    pub anchor_ms_or_page: u64,
    pub created_at: i64,
}

pub struct NoteStore {
    conn: Mutex<Connection>,
}

impl NoteStore {
    pub fn open() -> Result<Self, CabookError> {
        let dir = app_data_dir()?;
        let path = dir.join("notes.db");
        let conn = Connection::open(&path).map_err(|e| CabookError::Db(e.to_string()))?;

        conn.pragma_update(None, "journal_mode", "WAL")
            .map_err(|e| CabookError::Db(e.to_string()))?;

        conn.execute_batch(
            r#"
            CREATE TABLE IF NOT EXISTS notes (
                id               TEXT PRIMARY KEY,
                playlist_id      TEXT NOT NULL,
                item_id          TEXT NOT NULL,
                note_type        TEXT NOT NULL,
                body             TEXT NOT NULL,
                anchor_ms_or_page INTEGER NOT NULL DEFAULT 0,
                created_at       INTEGER NOT NULL
            );
            CREATE INDEX IF NOT EXISTS idx_notes_playlist ON notes(playlist_id);
            "#,
        )
        .map_err(|e| CabookError::Db(e.to_string()))?;

        Ok(Self {
            conn: Mutex::new(conn),
        })
    }

    pub fn insert(&self, entry: &NoteEntry) -> Result<(), CabookError> {
        let conn = self.conn.lock().map_err(|e| CabookError::Db(e.to_string()))?;
        let note_type_str = serde_json::to_string(&entry.note_type)
            .map_err(|e| CabookError::Serialization(e.to_string()))?
            .trim_matches('"')
            .to_string();

        conn.execute(
            r#"
            INSERT INTO notes (id, playlist_id, item_id, note_type, body, anchor_ms_or_page, created_at)
            VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
            "#,
            params![
                entry.id,
                entry.playlist_id,
                entry.item_id,
                note_type_str,
                entry.body,
                entry.anchor_ms_or_page,
                entry.created_at,
            ],
        )
        .map_err(|e| CabookError::Db(e.to_string()))?;
        Ok(())
    }

    pub fn list_for_playlist(&self, playlist_id: &str) -> Result<Vec<NoteEntry>, CabookError> {
        let conn = self.conn.lock().map_err(|e| CabookError::Db(e.to_string()))?;
        let mut stmt = conn
            .prepare("SELECT id, playlist_id, item_id, note_type, body, anchor_ms_or_page, created_at FROM notes WHERE playlist_id = ?1 ORDER BY created_at ASC")
            .map_err(|e| CabookError::Db(e.to_string()))?;

        let rows = stmt
            .query_map(params![playlist_id], |r| {
                let note_type_str: String = r.get(3)?;
                let note_type: NoteType = serde_json::from_str(&format!("\"{note_type_str}\""))
                    .unwrap_or(NoteType::Note);
                Ok(NoteEntry {
                    id: r.get(0)?,
                    playlist_id: r.get(1)?,
                    item_id: r.get(2)?,
                    note_type,
                    body: r.get(4)?,
                    anchor_ms_or_page: r.get(5)?,
                    created_at: r.get(6)?,
                })
            })
            .map_err(|e| CabookError::Db(e.to_string()))?;

        let mut out = Vec::new();
        for r in rows {
            out.push(r.map_err(|e| CabookError::Db(e.to_string()))?);
        }
        Ok(out)
    }

    pub fn delete(&self, id: &str) -> Result<(), CabookError> {
        let conn = self.conn.lock().map_err(|e| CabookError::Db(e.to_string()))?;
        conn.execute("DELETE FROM notes WHERE id = ?1", params![id])
            .map_err(|e| CabookError::Db(e.to_string()))?;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn note_roundtrip() {
        let tmp = std::env::temp_dir().join(format!("cabook-notes-test-{}", uuid::Uuid::now_v7()));
        std::fs::create_dir_all(&tmp).unwrap();
        unsafe { std::env::set_var("CABOOK_DATA_DIR", &tmp) };

        let store = NoteStore::open().unwrap();
        let entry = NoteEntry {
            id: "n1".into(),
            playlist_id: "pl".into(),
            item_id: "i1".into(),
            note_type: NoteType::Highlight,
            body: "Key formula".into(),
            anchor_ms_or_page: 42,
            created_at: chrono::Utc::now().timestamp(),
        };

        store.insert(&entry).unwrap();
        let list = store.list_for_playlist("pl").unwrap();
        assert_eq!(list.len(), 1);
        assert_eq!(list[0].body, "Key formula");

        store.delete("n1").unwrap();
        assert_eq!(store.list_for_playlist("pl").unwrap().len(), 0);
    }
}
