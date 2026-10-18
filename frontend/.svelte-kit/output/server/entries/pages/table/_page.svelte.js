import { S as escape_html, a as attr_class, b as attr, d as ensure_array_like, l as derived } from "../../../chunks/index-server.js";
import { C as Badge, S as Card, i as Pagination, n as EmptyState, o as SearchInput, r as PageContainer, t as PageHeader, w as Button } from "../../../chunks/dist.js";
//#region src/routes/table/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const allRecords = [
			{
				id: "TX-1001",
				customer: "Cecep Saeful Azhar",
				email: "cecep@fathforce.com",
				plan: "ENTERPRISE",
				amount: "Rp 2.450.000",
				status: "paid",
				date: "2026-10-15"
			},
			{
				id: "TX-1002",
				customer: "Coach Tom",
				email: "finance@rollerskool.com",
				plan: "PRO",
				amount: "Rp 149.000",
				status: "paid",
				date: "2026-10-14"
			},
			{
				id: "TX-1003",
				customer: "RBS Automations",
				email: "rbs@fathforce.com",
				plan: "PRO",
				amount: "Rp 149.000",
				status: "paid",
				date: "2026-10-14"
			},
			{
				id: "TX-1004",
				customer: "Gerlink Medical",
				email: "dev@gerlink.id",
				plan: "ENTERPRISE",
				amount: "Rp 5.200.000",
				status: "paid",
				date: "2026-10-12"
			},
			{
				id: "TX-1005",
				customer: "Fathforce Studio",
				email: "team@fathforce.com",
				plan: "STARTER",
				amount: "Rp 79.000",
				status: "pending",
				date: "2026-10-11"
			},
			{
				id: "TX-1006",
				customer: "Abdul Hamid III",
				email: "hamid@fathforce.com",
				plan: "PRO",
				amount: "Rp 149.000",
				status: "paid",
				date: "2026-10-10"
			},
			{
				id: "TX-1007",
				customer: "Sovereign Lab Node",
				email: "ops@cecepazhar.com",
				plan: "PRO",
				amount: "Rp 149.000",
				status: "failed",
				date: "2026-10-09"
			},
			{
				id: "TX-1008",
				customer: "PT Digital Solusi",
				email: "billing@digitalsolusi.co.id",
				plan: "ENTERPRISE",
				amount: "Rp 3.800.000",
				status: "paid",
				date: "2026-10-08"
			}
		];
		let searchQuery = "";
		let filterPlan = "all";
		let filterStatus = "all";
		let selectedIds = [];
		let currentPage = 1;
		const pageSize = 5;
		let filtered = derived(() => allRecords.filter((r) => {
			const q = searchQuery.toLowerCase().trim();
			return (!q || r.customer.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)) && true;
		}));
		let paginated = derived(() => filtered().slice((currentPage - 1) * pageSize, currentPage * pageSize));
		let isAllSelected = derived(() => paginated().length > 0 && paginated().every((r) => selectedIds.includes(r.id)));
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			PageContainer($$renderer, {
				class: "p-6 space-y-6 max-w-7xl mx-auto",
				children: ($$renderer) => {
					{
						function action($$renderer) {
							$$renderer.push(`<div class="flex items-center gap-2">`);
							Button($$renderer, {
								variant: "outline",
								size: "sm",
								children: ($$renderer) => {
									$$renderer.push(`<!---->Export CSV`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----> `);
							Button($$renderer, {
								variant: "primary",
								size: "sm",
								children: ($$renderer) => {
									$$renderer.push(`<!---->+ New Transaction`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----></div>`);
						}
						PageHeader($$renderer, {
							title: "Data Table Archetype",
							subtitle: "Enterprise data grid pattern featuring fuzzy search, column filters, bulk row selection, and pagination.",
							accent: "indigo",
							action,
							$$slots: { action: true }
						});
					}
					$$renderer.push(`<!----> `);
					Card($$renderer, {
						class: "p-5 space-y-4",
						children: ($$renderer) => {
							$$renderer.push(`<div class="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center"><div class="flex flex-1 items-center gap-2 max-w-md">`);
							SearchInput($$renderer, {
								placeholder: "Search by customer, email or transaction ID...",
								class: "w-full",
								get value() {
									return searchQuery;
								},
								set value($$value) {
									searchQuery = $$value;
									$$settled = false;
								}
							});
							$$renderer.push(`<!----></div> <div class="flex items-center gap-2 shrink-0">`);
							$$renderer.select({
								value: filterPlan,
								class: "px-3 py-1.5 rounded-lg border border-[var(--ca-border)] bg-[var(--ca-surface-subtle)] text-xs text-[var(--ca-text-primary)] focus:outline-none"
							}, ($$renderer) => {
								$$renderer.option({ value: "all" }, ($$renderer) => {
									$$renderer.push(`All Plans`);
								});
								$$renderer.option({ value: "ENTERPRISE" }, ($$renderer) => {
									$$renderer.push(`Enterprise`);
								});
								$$renderer.option({ value: "PRO" }, ($$renderer) => {
									$$renderer.push(`Pro Lifetime`);
								});
								$$renderer.option({ value: "STARTER" }, ($$renderer) => {
									$$renderer.push(`Starter`);
								});
							});
							$$renderer.push(` `);
							$$renderer.select({
								value: filterStatus,
								class: "px-3 py-1.5 rounded-lg border border-[var(--ca-border)] bg-[var(--ca-surface-subtle)] text-xs text-[var(--ca-text-primary)] focus:outline-none"
							}, ($$renderer) => {
								$$renderer.option({ value: "all" }, ($$renderer) => {
									$$renderer.push(`All Status`);
								});
								$$renderer.option({ value: "paid" }, ($$renderer) => {
									$$renderer.push(`Paid`);
								});
								$$renderer.option({ value: "pending" }, ($$renderer) => {
									$$renderer.push(`Pending`);
								});
								$$renderer.option({ value: "failed" }, ($$renderer) => {
									$$renderer.push(`Failed`);
								});
							});
							$$renderer.push(` `);
							if (selectedIds.length > 0) {
								$$renderer.push("<!--[0-->");
								Badge($$renderer, {
									variant: "primary",
									class: "font-mono text-xs",
									children: ($$renderer) => {
										$$renderer.push(`<!---->${escape_html(selectedIds.length)} Selected`);
									},
									$$slots: { default: true }
								});
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--></div></div> `);
							if (paginated().length === 0) {
								$$renderer.push("<!--[0-->");
								EmptyState($$renderer, {
									title: "No matching transactions",
									description: "Try adjusting your filter or search query.",
									icon: "search"
								});
							} else {
								$$renderer.push(`<!--[-1--><div class="overflow-x-auto border border-[var(--ca-border)] rounded-xl"><table class="w-full text-left text-xs border-collapse"><thead class="bg-[var(--ca-surface-subtle)] text-[var(--ca-text-muted)] uppercase text-[10px] tracking-wider border-b border-[var(--ca-border)]"><tr><th class="py-3 px-3 w-8"><input type="checkbox"${attr("checked", isAllSelected(), true)} class="rounded border-[var(--ca-border)] bg-[var(--ca-surface)] text-[var(--ca-brand)]" aria-label="Select all rows"/></th><th class="py-3 px-3 font-semibold">Transaction ID</th><th class="py-3 px-3 font-semibold">Customer</th><th class="py-3 px-3 font-semibold">Plan</th><th class="py-3 px-3 font-semibold">Amount</th><th class="py-3 px-3 font-semibold">Status</th><th class="py-3 px-3 font-semibold">Date</th><th class="py-3 px-3 font-semibold text-right">Actions</th></tr></thead><tbody class="divide-y divide-[var(--ca-border)]"><!--[-->`);
								const each_array = ensure_array_like(paginated());
								for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
									let item = each_array[$$index];
									const isSelected = selectedIds.includes(item.id);
									$$renderer.push(`<tr${attr_class(`hover:bg-[var(--ca-surface-subtle)] transition-colors ${isSelected ? "bg-[var(--ca-brand)]/5" : ""}`)}><td class="py-3 px-3"><input type="checkbox"${attr("checked", isSelected, true)} class="rounded border-[var(--ca-border)] bg-[var(--ca-surface)] text-[var(--ca-brand)]"${attr("aria-label", `Select row ${item.id}`)}/></td><td class="py-3 px-3 font-mono font-semibold text-[var(--ca-brand)]">${escape_html(item.id)}</td><td class="py-3 px-3"><span class="block font-medium text-[var(--ca-text-primary)]">${escape_html(item.customer)}</span> <span class="block text-[10px] text-[var(--ca-text-muted)] font-mono">${escape_html(item.email)}</span></td><td class="py-3 px-3 font-mono text-[10px]">`);
									Badge($$renderer, {
										variant: "outline",
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(item.plan)}`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----></td><td class="py-3 px-3 font-mono font-semibold text-[var(--ca-text-primary)]">${escape_html(item.amount)}</td><td class="py-3 px-3">`);
									Badge($$renderer, {
										variant: item.status === "paid" ? "success" : item.status === "pending" ? "warning" : "danger",
										class: "capitalize text-[10px]",
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(item.status)}`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----></td><td class="py-3 px-3 font-mono text-[var(--ca-text-muted)]">${escape_html(item.date)}</td><td class="py-3 px-3 text-right">`);
									Button($$renderer, {
										variant: "ghost",
										size: "sm",
										class: "text-xs",
										children: ($$renderer) => {
											$$renderer.push(`<!---->Details`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----></td></tr>`);
								}
								$$renderer.push(`<!--]--></tbody></table></div> <div class="flex items-center justify-between pt-2"><p class="text-xs text-[var(--ca-text-muted)]">Showing ${escape_html(paginated().length)} of ${escape_html(filtered().length)} entries</p> `);
								Pagination($$renderer, {
									total: filtered().length,
									perPage: pageSize,
									page: currentPage,
									onchange: (p) => currentPage = p
								});
								$$renderer.push(`<!----></div>`);
							}
							$$renderer.push(`<!--]-->`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!---->`);
				},
				$$slots: { default: true }
			});
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
export { _page as default };
