import "../../../../chunks/index-server.js";
import { x as escape_html } from "../../../../chunks/server.js";
import "../../../../chunks/uiNotifications.svelte.js";
import "../../../../chunks/errors.js";
import { t as PageHeader } from "../../../../chunks/PageHeader.js";
import { o as AiNavTabs } from "../../../../chunks/aiRouting.js";
//#region src/routes/settings/ai-skills/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let skills = [];
		$$renderer.push(`<div class="p-6 max-w-6xl mx-auto space-y-6">`);
		PageHeader($$renderer, {
			title: "Custom Skills Catalog (@skills)",
			subtitle: "Skill modular yang disuntikkan secara otomatis ke Master AI Router saat trigger dipanggil dalam terminal atau floating chat."
		});
		$$renderer.push(`<!----> `);
		AiNavTabs($$renderer, { active: "skills" });
		$$renderer.push(`<!----> <div class="flex items-center justify-between"><div><h3 class="text-sm font-bold text-neutral-900 dark:text-white">Active Skills (${escape_html(skills.length)})</h3> <p class="text-xs text-neutral-500">Panggil skill langsung dengan mengetik prefix <code class="text-sky-500 font-mono">@nama-skill</code>.</p></div> <button class="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-1.5"><span>+ Tambah Skill Baru</span></button></div> `);
		$$renderer.push(`<!--[0--><div class="p-12 text-center text-xs text-neutral-400">Memuat katalog skills...</div>`);
		$$renderer.push(`<!--]--></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
