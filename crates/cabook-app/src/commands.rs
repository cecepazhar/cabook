use cabook_core::{
    AmbientConfig, CabookError, MediaItem, NoteEntry, NoteStore, Playlist, ProgressSnapshot,
};
use parking_lot::Mutex;
use serde::{Deserialize, Serialize};

pub struct AppState {
    pub note_store: Result<NoteStore, String>,
    pub ambient_config: Mutex<AmbientConfig>,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            note_store: NoteStore::open().map_err(|e| e.to_string()),
            ambient_config: Mutex::new(AmbientConfig::default()),
        }
    }
}

impl Default for AppState {
    fn default() -> Self {
        Self::new()
    }
}

#[tauri::command]
pub fn list_notes(
    state: tauri::State<'_, AppState>,
    playlist_id: String,
) -> Result<Vec<NoteEntry>, String> {
    let store = state.note_store.as_ref().map_err(|e| e.clone())?;
    store.list_for_playlist(&playlist_id).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn save_note(state: tauri::State<'_, AppState>, entry: NoteEntry) -> Result<(), String> {
    let store = state.note_store.as_ref().map_err(|e| e.clone())?;
    store.insert(&entry).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn delete_note(state: tauri::State<'_, AppState>, id: String) -> Result<(), String> {
    let store = state.note_store.as_ref().map_err(|e| e.clone())?;
    store.delete(&id).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_ambient_config(state: tauri::State<'_, AppState>) -> AmbientConfig {
    state.ambient_config.lock().clone()
}

#[tauri::command]
pub fn save_ambient_config(
    state: tauri::State<'_, AppState>,
    config: AmbientConfig,
) -> Result<(), String> {
    *state.ambient_config.lock() = config;
    Ok(())
}

#[tauri::command]
pub fn get_app_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}
