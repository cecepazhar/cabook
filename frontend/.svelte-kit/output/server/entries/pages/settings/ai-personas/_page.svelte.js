import "../../../../chunks/index-server.js";
import "../../../../chunks/server.js";
import "../../../../chunks/uiNotifications.svelte.js";
import { t as PageHeader } from "../../../../chunks/PageHeader.js";
import { o as AiNavTabs } from "../../../../chunks/aiRouting.js";
//#region src/routes/settings/ai-personas/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div class="max-w-6xl mx-auto space-y-6">`);
		PageHeader($$renderer, {
			icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
			accent: "indigo",
			title: "System Personas & Prompt Engineering",
			badge: "Custom Context Engine",
			subtitle: "Configure role definitions, safety constraints, and automated environment rule injection."
		});
		$$renderer.push(`<!----> `);
		AiNavTabs($$renderer, { active: "personas" });
		$$renderer.push(`<!----> `);
		$$renderer.push(`<!--[0--><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm dark:shadow-none text-neutral-900 dark:text-white flex items-center justify-center py-12 text-sm text-neutral-500 dark:text-neutral-400"><svg class="w-5 h-5 animate-spin mr-3 text-sky-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Loading Personas...</div>`);
		$$renderer.push(`<!--]--></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
