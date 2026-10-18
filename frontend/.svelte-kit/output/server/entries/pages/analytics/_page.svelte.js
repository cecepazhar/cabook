import { S as escape_html, d as ensure_array_like } from "../../../chunks/index-server.js";
import { C as Badge, S as Card, f as Skeleton, m as ProgressBar, p as CircularProgress, r as PageContainer, t as PageHeader, w as Button } from "../../../chunks/dist.js";
//#region src/routes/analytics/+page.svelte
function _page($$renderer) {
	const barData = [
		{
			label: "SGP-1 Cloudflare Edge",
			value: 94,
			max: 100,
			variant: "primary"
		},
		{
			label: "Jakarta YPC Dokploy Runner",
			value: 72,
			max: 100,
			variant: "secondary"
		},
		{
			label: "9Router AI Gateway (Local :20128)",
			value: 85,
			max: 100,
			variant: "primary"
		},
		{
			label: "Hana AI Prompt Studio",
			value: 61,
			max: 100,
			variant: "success"
		},
		{
			label: "Postgres STRICT Vault Node",
			value: 12,
			max: 100,
			variant: "danger"
		},
		{
			label: "OBSIDIAN Fathforce Local Mirror",
			value: 100,
			max: 100,
			variant: "primary"
		}
	];
	const donutData = [
		{
			label: "Compute",
			value: 72
		},
		{
			label: "Memory",
			value: 45
		},
		{
			label: "Storage",
			value: 28
		}
	];
	PageContainer($$renderer, {
		class: "p-6 space-y-6 max-w-7xl mx-auto",
		children: ($$renderer) => {
			{
				function action($$renderer) {
					Button($$renderer, {
						variant: "outline",
						size: "sm",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Export Dashboard CSV`);
						},
						$$slots: { default: true }
					});
				}
				PageHeader($$renderer, {
					title: "Visual Metrics & Analytics Archetype",
					subtitle: "High-fidelity data visualization built using CAUI progress bars, ring gauges, and skeleton loaders.",
					accent: "indigo",
					action,
					$$slots: { action: true }
				});
			}
			$$renderer.push(`<!----> `);
			Card($$renderer, {
				class: "p-6 space-y-6",
				children: ($$renderer) => {
					$$renderer.push(`<div><h3 class="font-bold text-sm text-[var(--ca-text-primary)]">Node Cluster Throughput</h3> <p class="text-xs text-[var(--ca-text-muted)]">Aggregated request throughput per cluster over the last 5 minutes.</p></div> <div class="space-y-4"><!--[-->`);
					const each_array = ensure_array_like(barData);
					for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
						let bar = each_array[$$index];
						$$renderer.push(`<div><div class="flex items-center justify-between mb-1.5 text-xs"><div class="flex items-center gap-2"><span class="font-medium text-[var(--ca-text-secondary)]">${escape_html(bar.label)}</span> `);
						if (bar.value === 100) {
							$$renderer.push("<!--[0-->");
							Badge($$renderer, {
								variant: "success",
								class: "text-[9px] font-mono",
								children: ($$renderer) => {
									$$renderer.push(`<!---->MAX`);
								},
								$$slots: { default: true }
							});
						} else if (bar.value < 20) {
							$$renderer.push("<!--[1-->");
							Badge($$renderer, {
								variant: "danger",
								class: "text-[9px] font-mono",
								children: ($$renderer) => {
									$$renderer.push(`<!---->LOW BAND`);
								},
								$$slots: { default: true }
							});
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--></div> <span class="font-mono font-semibold text-[var(--ca-text-primary)]">${escape_html(bar.value)}%</span></div> `);
						ProgressBar($$renderer, {
							value,
							max: bar.max,
							variant,
							size: "md"
						});
						$$renderer.push(`<!----></div>`);
					}
					$$renderer.push(`<!--]--></div>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Card($$renderer, {
				class: "p-6 space-y-6",
				children: ($$renderer) => {
					$$renderer.push(`<div><h3 class="font-bold text-sm text-[var(--ca-text-primary)]">Global Ecosystem Health</h3> <p class="text-xs text-[var(--ca-text-muted)]">Real-time CPU, RAM, and disk allocation monitored by CAFramework telemetry agent.</p></div> <div class="grid grid-cols-1 sm:grid-cols-3 gap-6"><!--[-->`);
					const each_array_1 = ensure_array_like(donutData);
					for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
						let d = each_array_1[$$index_1];
						$$renderer.push(`<div class="flex flex-col items-center text-center space-y-3"><div class="relative">`);
						CircularProgress($$renderer, {
							value: d.value,
							max: 100,
							size: 100,
							strokeWidth: 10
						});
						$$renderer.push(`<!----> <span class="absolute inset-0 flex items-center justify-center text-lg font-mono font-bold text-[var(--ca-text-primary)]">${escape_html(d.value)}%</span></div> <div><span class="text-xs font-semibold text-[var(--ca-text-secondary)] block">${escape_html(d.label)}</span> <span class="text-[10px] text-[var(--ca-text-muted)] font-mono">${escape_html(d.value)}/100 Units</span></div></div>`);
					}
					$$renderer.push(`<!--]--></div>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Card($$renderer, {
				class: "p-6 space-y-6",
				children: ($$renderer) => {
					$$renderer.push(`<div class="flex items-center justify-between"><div><h3 class="font-bold text-sm text-[var(--ca-text-primary)]">Live Telemetry Stream</h3> <p class="text-xs text-[var(--ca-text-muted)]">Placeholder data while the local telemetry engine is booting up.</p></div> `);
					Badge($$renderer, {
						variant: "outline",
						class: "font-mono text-xs border-dashed animate-pulse",
						children: ($$renderer) => {
							$$renderer.push(`<!---->SYNCING...`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div> <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">`);
					Skeleton($$renderer, { className: "h-20 rounded-xl" });
					$$renderer.push(`<!----> `);
					Skeleton($$renderer, { className: "h-20 rounded-xl" });
					$$renderer.push(`<!----> `);
					Skeleton($$renderer, { className: "h-20 rounded-xl" });
					$$renderer.push(`<!----> <div class="sm:col-span-3 w-full space-y-3">`);
					Skeleton($$renderer, { className: "h-6 w-full" });
					$$renderer.push(`<!----> `);
					Skeleton($$renderer, { className: "h-6 w-4/5" });
					$$renderer.push(`<!----></div></div>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!---->`);
		},
		$$slots: { default: true }
	});
}
//#endregion
export { _page as default };
