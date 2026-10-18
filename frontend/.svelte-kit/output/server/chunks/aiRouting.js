import { a as attr_class, b as attr } from "./index-server.js";
import { invoke } from "@tauri-apps/api/core";
//#region src/lib/components/AiNavTabs.svelte
function AiNavTabs($$renderer, $$props) {
	let { active } = $$props;
	$$renderer.push(`<div class="border-b border-neutral-200 dark:border-neutral-800 flex gap-4 overflow-x-auto text-sm font-medium" role="tablist"><a href="/settings/ai-routing" role="tab"${attr("aria-selected", active === "routing")}${attr_class(`pb-3 whitespace-nowrap transition-colors border-b-2 ${active === "routing" ? "border-sky-500 text-neutral-900 dark:text-white font-semibold" : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"}`)}>Providers &amp; Routing Matrix</a> <a href="/settings/ai-skills" role="tab"${attr("aria-selected", active === "skills")}${attr_class(`pb-3 whitespace-nowrap transition-colors border-b-2 ${active === "skills" ? "border-sky-500 text-neutral-900 dark:text-white font-semibold" : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"}`)}>Custom Skills (@skills)</a> <a href="/settings/ai-personas" role="tab"${attr("aria-selected", active === "personas")}${attr_class(`pb-3 whitespace-nowrap transition-colors border-b-2 ${active === "personas" ? "border-sky-500 text-neutral-900 dark:text-white font-semibold" : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"}`)}>Personas &amp; Prompt Rules</a> <a href="/settings/ai-habits" role="tab"${attr("aria-selected", active === "habits")}${attr_class(`pb-3 whitespace-nowrap transition-colors border-b-2 ${active === "habits" ? "border-sky-500 text-neutral-900 dark:text-white font-semibold" : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"}`)}>Persistent Habit Memory (FTS5)</a> <a href="/settings?tab=ai" role="tab"${attr("aria-selected", active === "quick")}${attr_class(`pb-3 whitespace-nowrap transition-colors border-b-2 ${active === "quick" ? "border-sky-500 text-neutral-900 dark:text-white font-semibold" : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"}`)}>Quick AI Config</a></div>`);
}
//#endregion
//#region src/lib/api/aiRouting.ts
async function aiGetProviders() {
	return invoke("ai_get_providers");
}
async function aiGetRoutingMatrix() {
	return invoke("ai_get_routing_matrix");
}
async function aiGetPersonas() {
	return invoke("ai_get_personas");
}
async function aiGetHabits() {
	return invoke("ai_get_habits");
}
async function aiGetSkills() {
	return invoke("ai_get_skills");
}
//#endregion
export { aiGetSkills as a, aiGetRoutingMatrix as i, aiGetPersonas as n, AiNavTabs as o, aiGetProviders as r, aiGetHabits as t };
