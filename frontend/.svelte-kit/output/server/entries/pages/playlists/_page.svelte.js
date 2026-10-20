import { a as ensure_array_like, t as attr_class, x as escape_html, y as attr } from "../../../chunks/server.js";
import "../../../chunks/uiNotifications.svelte.js";
//#region src/routes/playlists/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let sections = [{
			id: "sec-1",
			title: "Bab 1: Fondasi Pembelajaran & Teori Dasar",
			items: [
				{
					id: "item-1",
					title: "Pengenalan Silabus Pembelajaran",
					type: "video",
					duration: "12:45",
					completed: true
				},
				{
					id: "item-2",
					title: "Slide Presentasi Arsitektur Sistem (PDF)",
					type: "pdf",
					duration: "24 Hal.",
					completed: true
				},
				{
					id: "item-3",
					title: "Kuliah Tamu: Konsep Dasar di YouTube",
					type: "youtube",
					duration: "45:10",
					completed: false
				}
			]
		}, {
			id: "sec-2",
			title: "Bab 2: Praktikum & Bedah Kasus Lapangan",
			items: [{
				id: "item-4",
				title: "Rekaman Diskusi Audio & Tanya Jawab",
				type: "audio",
				duration: "34:20",
				completed: false
			}, {
				id: "item-5",
				title: "Buku Panduan Instalasi & Konfigurasi (EPUB)",
				type: "pdf",
				duration: "56 Hal.",
				completed: false
			}]
		}];
		$$renderer.push(`<div class="flex flex-col h-full overflow-y-auto px-6 py-5 space-y-4 max-w-7xl mx-auto w-full"><div class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 font-mono font-bold text-xs shadow-2xs"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg></div> <div><h1 class="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">Learning Playlists</h1> <p class="text-[11px] text-neutral-500 dark:text-neutral-400">Silabus belajar multimodal: Video, Audio, Dokumen &amp; YouTube terpadu</p></div></div> <button class="px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-sm transition-colors cursor-pointer">+ Tambah Playlist</button></div> <div class="space-y-4 pt-2"><!--[-->`);
		const each_array = ensure_array_like(sections);
		for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
			let sec = each_array[$$index_1];
			$$renderer.push(`<div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-2xs space-y-3"><h3 class="font-bold text-sm text-neutral-900 dark:text-white flex items-center justify-between"><span>${escape_html(sec.title)}</span> <span class="text-xs font-mono text-neutral-400 font-normal">${escape_html(sec.items.length)} materi</span></h3> <div class="divide-y divide-neutral-100 dark:divide-neutral-800/80 border border-neutral-100 dark:border-neutral-800 rounded-xl overflow-hidden"><!--[-->`);
			const each_array_1 = ensure_array_like(sec.items);
			for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
				let item = each_array_1[$$index];
				$$renderer.push(`<div class="p-3 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"><div class="flex items-center gap-3"><input type="checkbox"${attr("checked", item.completed, true)} class="rounded text-amber-500 focus:ring-amber-500 border-neutral-300 dark:border-neutral-700"/> <div><div${attr_class(`text-xs font-medium ${item.completed ? "line-through text-neutral-400" : "text-neutral-800 dark:text-neutral-200"}`)}>${escape_html(item.title)}</div> <div class="text-[10px] font-mono text-neutral-400 uppercase mt-0.5">${escape_html(item.type)} · ${escape_html(item.duration)}</div></div></div> <a${attr("href", `/player?id=${item.id}`)} class="px-2.5 py-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg transition-colors">Putar / Buka →</a></div>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
export { _page as default };
