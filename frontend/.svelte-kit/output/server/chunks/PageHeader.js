import { S as escape_html, _ as stringify, a as attr_class, b as attr, d as ensure_array_like, l as derived } from "./index-server.js";
//#region src/lib/components/PageHeader.svelte
var ACCENTS = {
	violet: "bg-violet-500/10 dark:bg-violet-500/20 border-violet-500/30 text-violet-600 dark:text-violet-400",
	sky: "bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/30 text-sky-600 dark:text-sky-400",
	emerald: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
	amber: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400",
	rose: "bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/30 text-rose-600 dark:text-rose-400",
	cyan: "bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/30 text-cyan-600 dark:text-cyan-400",
	indigo: "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/30 text-indigo-600 dark:text-indigo-400",
	teal: "bg-teal-500/10 dark:bg-teal-500/20 border-teal-500/30 text-teal-600 dark:text-teal-400",
	orange: "bg-orange-500/10 dark:bg-orange-500/20 border-orange-500/30 text-orange-600 dark:text-orange-400",
	pink: "bg-pink-500/10 dark:bg-pink-500/20 border-pink-500/30 text-pink-600 dark:text-pink-400"
};
function PageHeader($$renderer, $$props) {
	let { icon, accent = "sky", title, badge, subtitle, actions } = $$props;
	const paths = derived(() => Array.isArray(icon) ? icon : [icon]);
	const accentClass = derived(() => ACCENTS[accent]);
	$$renderer.push(`<header class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800/80"><div class="flex items-center gap-3 min-w-0"><div${attr_class(`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${stringify(accentClass())}`)}><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><!--[-->`);
	const each_array = ensure_array_like(paths());
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let d = each_array[$$index];
		$$renderer.push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${attr("d", d)}></path>`);
	}
	$$renderer.push(`<!--]--></svg></div> <div class="min-w-0"><div class="flex items-center gap-2 flex-wrap"><h1 class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">${escape_html(title)}</h1> `);
	if (badge) $$renderer.push(`<!--[0--><span${attr_class(`text-xs px-2 py-0.5 rounded-full font-semibold border ${stringify(accentClass())}`)}>${escape_html(badge)}</span>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div> `);
	if (subtitle) $$renderer.push(`<!--[0--><p class="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">${escape_html(subtitle)}</p>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div></div> `);
	if (actions) {
		$$renderer.push(`<!--[0--><div class="flex items-center gap-3 shrink-0">`);
		actions($$renderer);
		$$renderer.push(`<!----></div>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></header>`);
}
//#endregion
export { PageHeader as t };
