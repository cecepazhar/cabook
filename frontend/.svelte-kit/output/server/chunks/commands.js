import { invoke } from "@tauri-apps/api/core";
//#region src/lib/generated/commands.ts
async function cmdIsVaultInitialized() {
	return await invoke("is_vault_initialized");
}
async function cmdLockVault() {
	return await invoke("lock_vault");
}
async function cmdListNotes(args) {
	return await invoke("list_notes", args);
}
async function cmdGetPendingCrashReport() {
	return await invoke("get_pending_crash_report");
}
async function cmdGetPerformancePrefs() {
	return await invoke("get_performance_prefs");
}
async function cmdSetPerformancePrefs(args) {
	return await invoke("set_performance_prefs", args);
}
//#endregion
export { cmdLockVault as a, cmdListNotes as i, cmdGetPerformancePrefs as n, cmdSetPerformancePrefs as o, cmdIsVaultInitialized as r, cmdGetPendingCrashReport as t };
