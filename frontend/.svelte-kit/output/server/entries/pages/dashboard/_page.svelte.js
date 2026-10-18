import { S as escape_html, d as ensure_array_like } from "../../../chunks/index-server.js";
import { C as Badge, S as Card, m as ProgressBar, p as CircularProgress, r as PageContainer, t as PageHeader, w as Button } from "../../../chunks/dist.js";
//#region src/routes/dashboard/+page.svelte
function _page($$renderer) {
	const kpis = [
		{
			title: "Total Deployments",
			value: "1,429",
			change: "+12.4%",
			isUp: true,
			icon: "server"
		},
		{
			title: "Active Daemons",
			value: "38",
			change: "+3 new",
			isUp: true,
			icon: "cpu"
		},
		{
			title: "Vault Envelopes",
			value: "256",
			change: "E2EE Synced",
			isUp: true,
			icon: "shield"
		},
		{
			title: "System Health",
			value: "99.98%",
			change: "Normal",
			isUp: true,
			icon: "activity"
		}
	];
	let tableData = [
		{
			id: "DEP-901",
			name: "Prod API Gateway",
			status: "Healthy",
			latency: "24ms",
			region: "sgp-1",
			uptime: "99.9%"
		},
		{
			id: "DEP-902",
			name: "YPC S3 Mirror Fleet",
			status: "Healthy",
			latency: "42ms",
			region: "jkt-1",
			uptime: "100%"
		},
		{
			id: "DEP-903",
			name: "Dokploy Runner Service",
			status: "Syncing",
			latency: "110ms",
			region: "sgp-1",
			uptime: "98.5%"
		},
		{
			id: "DEP-904",
			name: "Hana AI Prompt Studio",
			status: "Healthy",
			latency: "35ms",
			region: "local",
			uptime: "99.9%"
		},
		{
			id: "DEP-905",
			name: "Postgres STRICT Node",
			status: "Healthy",
			latency: "12ms",
			region: "jkt-1",
			uptime: "100%"
		}
	];
	let systemLoad = 68;
	let memoryUsage = 45;
	PageContainer($$renderer, {
		class: "p-6 space-y-6 max-w-7xl mx-auto",
		children: ($$renderer) => {
			{
				function action($$renderer) {
					$$renderer.push(`<div class="flex items-center gap-2">`);
					Button($$renderer, {
						variant: "outline",
						size: "sm",
						onclick: () => systemLoad = Math.floor(Math.random() * 30) + 50,
						children: ($$renderer) => {
							$$renderer.push(`<!---->Refresh Fleet`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Button($$renderer, {
						variant: "primary",
						size: "sm",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Deploy Slice`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div>`);
				}
				PageHeader($$renderer, {
					title: "Executive Dashboard",
					subtitle: "Ecosystem overview, operational telemetries, and node fleet status.",
					accent: "indigo",
					action,
					$$slots: { action: true }
				});
			}
			$$renderer.push(`<!----> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><!--[-->`);
			const each_array = ensure_array_like(kpis);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let kpi = each_array[$$index];
				Card($$renderer, {
					class: "p-4 flex items-center justify-between shadow-2xs hover:border-[var(--ca-brand)] transition-colors",
					children: ($$renderer) => {
						$$renderer.push(`<div class="space-y-1"><p class="text-xs text-[var(--ca-text-muted)] font-medium">${escape_html(kpi.title)}</p> <p class="text-2xl font-bold font-mono tracking-tight text-[var(--ca-text-primary)]">${escape_html(kpi.value)}</p> <div class="flex items-center gap-1.5 pt-0.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> <span class="text-[11px] font-medium text-emerald-500">${escape_html(kpi.change)}</span></div></div> <div class="w-10 h-10 rounded-xl bg-[var(--ca-brand)]/10 text-[var(--ca-brand)] flex items-center justify-center font-bold">★</div>`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">`);
			Card($$renderer, {
				class: "p-5 space-y-4",
				children: ($$renderer) => {
					$$renderer.push(`<div class="flex items-center justify-between"><h4 class="font-bold text-xs uppercase tracking-wider text-[var(--ca-text-secondary)]">Resource Allocation</h4> `);
					Badge($$renderer, {
						variant: "outline",
						class: "font-mono text-[10px]",
						children: ($$renderer) => {
							$$renderer.push(`<!---->6.19.10-300.fc44`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div> <div class="space-y-3"><div><div class="flex justify-between text-xs mb-1"><span class="text-[var(--ca-text-muted)]">CPU Core Load</span> <span class="font-mono font-semibold">${escape_html(systemLoad)}%</span></div> `);
					ProgressBar($$renderer, {
						value: systemLoad,
						max: 100,
						variant: "primary",
						size: "sm"
					});
					$$renderer.push(`<!----></div> <div><div class="flex justify-between text-xs mb-1"><span class="text-[var(--ca-text-muted)]">RAM Utilization</span> <span class="font-mono font-semibold">45%</span></div> `);
					ProgressBar($$renderer, {
						value: memoryUsage,
						max: 100,
						variant: "secondary",
						size: "sm"
					});
					$$renderer.push(`<!----></div></div>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Card($$renderer, {
				class: "p-5 flex items-center justify-between",
				children: ($$renderer) => {
					$$renderer.push(`<div class="space-y-1"><h4 class="font-bold text-xs uppercase tracking-wider text-[var(--ca-text-secondary)]">Service Availability</h4> <p class="text-xs text-[var(--ca-text-muted)]">Calculated over last 30 days</p> <div class="pt-2">`);
					Badge($$renderer, {
						variant: "success",
						class: "text-xs font-mono",
						children: ($$renderer) => {
							$$renderer.push(`<!---->ALL SYSTEMS NOMINAL`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div></div> <div class="flex flex-col items-center">`);
					CircularProgress($$renderer, {
						value: 99.9,
						max: 100,
						size: 70,
						strokeWidth: 6
					});
					$$renderer.push(`<!----></div>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Card($$renderer, {
				class: "p-5 flex flex-col justify-between space-y-3",
				children: ($$renderer) => {
					$$renderer.push(`<div><h4 class="font-bold text-xs uppercase tracking-wider text-[var(--ca-text-secondary)]">Sovereign Cloud Gate</h4> <p class="text-xs text-[var(--ca-text-muted)] mt-1">Zero-Knowledge envelope sync and Dokploy automation cluster.</p></div> <div class="flex items-center gap-2">`);
					Button($$renderer, {
						variant: "secondary",
						size: "sm",
						class: "flex-1",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Audit Logs`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Button($$renderer, {
						variant: "primary",
						size: "sm",
						class: "flex-1",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Sync Peers`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> `);
			Card($$renderer, {
				class: "p-5 space-y-4",
				children: ($$renderer) => {
					$$renderer.push(`<div class="flex items-center justify-between"><div><h3 class="font-bold text-sm text-[var(--ca-text-primary)]">Connected Services &amp; Nodes</h3> <p class="text-xs text-[var(--ca-text-muted)]">Active daemons running within the CAFramework mesh.</p></div> `);
					Badge($$renderer, {
						variant: "outline",
						class: "font-mono text-xs",
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(tableData.length)} Active`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div> <div class="overflow-x-auto"><table class="w-full text-left text-xs border-collapse"><thead><tr class="border-b border-[var(--ca-border)] text-[var(--ca-text-muted)] uppercase tracking-wider text-[10px]"><th class="py-2.5 px-3 font-semibold">Service ID</th><th class="py-2.5 px-3 font-semibold">Daemon Name</th><th class="py-2.5 px-3 font-semibold">Status</th><th class="py-2.5 px-3 font-semibold">Latency</th><th class="py-2.5 px-3 font-semibold">Region</th><th class="py-2.5 px-3 font-semibold text-right">Uptime</th></tr></thead><tbody class="divide-y divide-[var(--ca-border)]"><!--[-->`);
					const each_array_1 = ensure_array_like(tableData);
					for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
						let row = each_array_1[$$index_1];
						$$renderer.push(`<tr class="hover:bg-[var(--ca-surface-subtle)] transition-colors"><td class="py-3 px-3 font-mono text-[var(--ca-brand)] font-semibold">${escape_html(row.id)}</td><td class="py-3 px-3 font-medium text-[var(--ca-text-primary)]">${escape_html(row.name)}</td><td class="py-3 px-3">`);
						Badge($$renderer, {
							variant: row.status === "Healthy" ? "success" : "warning",
							class: "text-[10px]",
							children: ($$renderer) => {
								$$renderer.push(`<!---->${escape_html(row.status)}`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----></td><td class="py-3 px-3 font-mono text-[var(--ca-text-muted)]">${escape_html(row.latency)}</td><td class="py-3 px-3 font-mono uppercase text-[var(--ca-text-secondary)]">${escape_html(row.region)}</td><td class="py-3 px-3 font-mono text-right text-emerald-500 font-semibold">${escape_html(row.uptime)}</td></tr>`);
					}
					$$renderer.push(`<!--]--></tbody></table></div>`);
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
