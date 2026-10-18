mod commands;

pub use commands::AppState;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_process::init())
        .manage(AppState::new())
        .invoke_handler(tauri::generate_handler![
            commands::list_notes,
            commands::save_note,
            commands::delete_note,
            commands::get_ambient_config,
            commands::save_ambient_config,
            commands::get_app_version
        ]);

    builder
        .run(tauri::generate_context!())
        .expect("error while running CABook application");
}
