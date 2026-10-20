import "../../../../chunks/index-server.js";
import "../../../../chunks/server.js";
import "../../../../chunks/uiNotifications.svelte.js";
import { t as PageHeader } from "../../../../chunks/PageHeader.js";
import { o as AiNavTabs } from "../../../../chunks/aiRouting.js";
//#region src/routes/settings/ai-routing/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div class="max-w-6xl mx-auto space-y-6">`);
		PageHeader($$renderer, {
			icon: "M13 10V3L4 14h7v7l9-11h-7z",
			accent: "sky",
			title: "AI Routing & Fallback Matrix",
			badge: "Multi-Provider Engine",
			subtitle: "Zero-knowledge encrypted model routing with automatic failover and local privacy boundaries."
		});
		$$renderer.push(`<!----> `);
		AiNavTabs($$renderer, { active: "routing" });
		$$renderer.push(`<!----> `);
		$$renderer.push(`<!--[0--><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm dark:shadow-none text-neutral-900 dark:text-white flex items-center justify-center py-12 text-sm text-neutral-500 dark:text-neutral-400"><svg class="w-5 h-5 animate-spin mr-3 text-sky-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Loading AI Provider &amp; Routing matrix...</div>`);
		$$renderer.push(`<!--]--></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
