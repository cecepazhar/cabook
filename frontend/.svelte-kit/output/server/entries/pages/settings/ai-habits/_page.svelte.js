import { l as derived } from "../../../../chunks/index-server.js";
import "../../../../chunks/uiNotifications.svelte.js";
import { t as PageHeader } from "../../../../chunks/PageHeader.js";
import { o as AiNavTabs } from "../../../../chunks/aiRouting.js";
//#region src/routes/settings/ai-habits/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let habits = [];
		derived(() => habits.filter((h) => h.is_pinned).length);
		$$renderer.push(`<div class="max-w-6xl mx-auto space-y-6">`);
		PageHeader($$renderer, {
			icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
			accent: "teal",
			title: "Persistent Habit Memory (FTS5)",
			badge: "Zero-Knowledge Local Storage",
			subtitle: "Passive heuristic learning of your shell commands, container runtimes, and developer conventions."
		});
		$$renderer.push(`<!----> `);
		AiNavTabs($$renderer, { active: "habits" });
		$$renderer.push(`<!----> <div class="p-4 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-start gap-3 text-teal-800 dark:text-teal-200 text-xs"><svg class="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> <div class="space-y-1"><div class="font-semibold text-teal-900 dark:text-teal-100">100% On-Device Zero-Knowledge Architecture</div> <p>Learned habits are indexed locally using SQLite FTS5 with Porter tokenization inside your encrypted SQLCipher database. They are dynamically injected at Stage 3 of prompt assembly when relevant to your prompt, and <strong>never synced to external telemetry</strong>.</p></div></div> `);
		$$renderer.push(`<!--[0--><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm dark:shadow-none text-neutral-900 dark:text-white flex items-center justify-center py-12 text-sm text-neutral-500 dark:text-neutral-400"><svg class="w-5 h-5 animate-spin mr-3 text-sky-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Loading Habit Memories...</div>`);
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
export { _page as default };
