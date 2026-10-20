import "../../../chunks/index-server.js";
import { a as ensure_array_like, x as escape_html, y as attr } from "../../../chunks/server.js";
import "../../../chunks/uiNotifications.svelte.js";
import "@tauri-apps/api/core";
//#region src/routes/notes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let notes = [{
			id: "note-1",
			playlist_id: "default",
			item_id: "book-1",
			note_type: "highlight",
			page_number: 14,
			content: "Kunci enkripsi zero-knowledge harus selalu diturunkan pada perangkat lokal (Argon2id KDF).",
			created_at: Date.now() - 36e5
		}, {
			id: "note-2",
			playlist_id: "default",
			item_id: "book-2",
			note_type: "note",
			timestamp_ms: 145e3,
			content: "Penting untuk ujian: pelajari perbedaan arsitektur Monolitik vs Microservices terdistribusi.",
			created_at: Date.now() - 72e5
		}];
		$$renderer.push(`<div class="flex flex-col h-full overflow-y-auto px-6 py-5 space-y-4 max-w-7xl mx-auto w-full"><div class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 font-mono font-bold text-xs shadow-2xs"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625A2.25 2.25 0 0 0 3.375 3.375v17.25A2.25 2.25 0 0 0 5.625 22.875h7.125"></path></svg></div> <div><h1 class="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">Time-Synced &amp; Page Notes</h1> <p class="text-[11px] text-neutral-500 dark:text-neutral-400">Catatan terikat nomor halaman atau detik video untuk lompat cepat</p></div></div> <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-sm transition-colors cursor-pointer">+ Tambah Catatan</button></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1"><!--[-->`);
		const each_array = ensure_array_like(notes);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let note = each_array[$$index];
			$$renderer.push(`<div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-2xs space-y-3 flex flex-col justify-between"><div class="space-y-2"><div class="flex items-center justify-between text-[10px] font-mono"><span class="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-semibold uppercase">${escape_html(note.note_type)}</span> <span class="text-neutral-400">${escape_html(note.page_number ? `Halaman ${note.page_number}` : `${Math.floor((note.timestamp_ms || 0) / 1e3)} detik`)}</span></div> <p class="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">${escape_html(note.content)}</p></div> <div class="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between"><a${attr("href", `/player?page=${note.page_number || 1}`)} class="text-amber-600 dark:text-amber-400 hover:underline text-xs font-semibold">Lompat ke Lokasi →</a> <button class="text-neutral-400 hover:text-rose-500 text-xs transition-colors">Hapus</button></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
