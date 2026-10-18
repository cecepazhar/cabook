//#region src/lib/errors.ts
/**
* Readable text for anything thrown across the Tauri boundary.
*
* A failing `#[tauri::command]` rejects with the serialized `CafError` — a plain object of
* `{ code, message, domain }`, not an `Error`. Code that reached for `String(err)` printed
* `[object Object]`, which is how a perfectly descriptive backend message ("Respons AI tidak
* sesuai format...") reached the user as no information at all.
*/
function errorText(err) {
	if (typeof err === "string") return err;
	if (err instanceof Error) return err.message;
	if (err && typeof err === "object") {
		var _ref, _record$message;
		const record = err;
		const message = (_ref = (_record$message = record.message) !== null && _record$message !== void 0 ? _record$message : record.error) !== null && _ref !== void 0 ? _ref : record.reason;
		if (typeof message === "string" && message.length > 0) {
			const code = typeof record.code === "string" ? record.code : void 0;
			return code ? `${message} (${code})` : message;
		}
		try {
			return JSON.stringify(err);
		} catch (_unused) {}
	}
	return String(err);
}
//#endregion
export { errorText as t };
