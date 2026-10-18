import { S as escape_html, _ as stringify, a as attr_class, b as attr, d as ensure_array_like, l as derived, o as attr_style } from "../../../chunks/index-server.js";
import { C as Badge, S as Card, a as TotpBadge, o as SearchInput, r as PageContainer, t as PageHeader, w as Button } from "../../../chunks/dist.js";
//#region src/routes/cards/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const projects = [
			{
				id: "proj-caterm",
				title: "CATerm",
				description: "Sovereign SSH/SFTP terminal client with zero-knowledge encrypted vault and Hana AI.",
				category: "Terminal",
				status: "STABLE",
				accent: "#ef4444",
				stars: 48,
				members: [
					{ name: "Cecep" },
					{ name: "Harun" },
					{ name: "Fatih" }
				],
				totpCode: "492 108"
			},
			{
				id: "proj-camark",
				title: "CAMark",
				description: "Distraction-free markdown editor & personal knowledge base with bi-directional wikilinks.",
				category: "Productivity",
				status: "ACTIVE",
				accent: "#06b6d4",
				stars: 29,
				members: [{ name: "Cecep" }, { name: "Rini" }]
			},
			{
				id: "proj-catable",
				title: "CATable",
				description: "Modern offline-first spreadsheet and reactive database client with formula computation.",
				category: "Data",
				status: "BUILDING",
				accent: "#3b82f6",
				stars: 14,
				members: [{ name: "Cecep" }, { name: "Ibrahim" }]
			},
			{
				id: "proj-cagames",
				title: "CAGames",
				description: "Retro game engine & emulator launcher built with WebAssembly and local ROM library.",
				category: "Entertainment",
				status: "BUILDING",
				accent: "#10b981",
				stars: 9,
				members: [{ name: "Fatih" }, { name: "Harun" }]
			},
			{
				id: "proj-cabook",
				title: "CABook",
				description: "Digital reading companion, PDF annotator, and EPUB synchronizer with local TTS.",
				category: "Reader",
				status: "ACTIVE",
				accent: "#f59e0b",
				stars: 33,
				members: [{ name: "Cecep" }, { name: "Khadijah" }]
			},
			{
				id: "proj-caui",
				title: "CAUI Design System",
				description: "Unified Svelte 5 component suite, iconography, and design tokens for the entire CA ecosystem.",
				category: "Foundation",
				status: "STABLE",
				accent: "#6366f1",
				stars: 120,
				members: [
					{ name: "Cecep" },
					{ name: "Abdul Hamid" },
					{ name: "Coach Tom" }
				]
			}
		];
		let selectedCategory = "ALL";
		let searchQuery = "";
		let filtered = derived(() => projects.filter((p) => {
			return !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
		}));
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			PageContainer($$renderer, {
				class: "p-6 space-y-6 max-w-7xl mx-auto",
				children: ($$renderer) => {
					{
						function action($$renderer) {
							Button($$renderer, {
								variant: "primary",
								size: "sm",
								children: ($$renderer) => {
									$$renderer.push(`<!---->+ New Project`);
								},
								$$slots: { default: true }
							});
						}
						PageHeader($$renderer, {
							title: "Cards & Catalog Archetype",
							subtitle: "Entity cards grid featuring badge status, avatar stacks, category filters, and quick action buttons.",
							accent: "indigo",
							action,
							$$slots: { action: true }
						});
					}
					$$renderer.push(`<!----> <div class="flex flex-col sm:flex-row gap-3 justify-between items-center"><div class="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0"><!--[-->`);
					const each_array = ensure_array_like([
						"ALL",
						"TERMINAL",
						"PRODUCTIVITY",
						"DATA",
						"FOUNDATION"
					]);
					for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
						let cat = each_array[$$index];
						$$renderer.push(`<button type="button"${attr_class(`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${selectedCategory === cat ? "bg-[var(--ca-brand)] text-white shadow-xs" : "bg-[var(--ca-surface-subtle)] text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)]"}`)}>${escape_html(cat)}</button>`);
					}
					$$renderer.push(`<!--]--></div> <div class="w-full sm:w-64">`);
					SearchInput($$renderer, {
						placeholder: "Search projects...",
						get value() {
							return searchQuery;
						},
						set value($$value) {
							searchQuery = $$value;
							$$settled = false;
						}
					});
					$$renderer.push(`<!----></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"><!--[-->`);
					const each_array_1 = ensure_array_like(filtered());
					for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
						let card = each_array_1[$$index_2];
						Card($$renderer, {
							class: "p-5 flex flex-col justify-between space-y-4 hover:border-[var(--ca-border-strong)] transition-all group",
							children: ($$renderer) => {
								$$renderer.push(`<div class="space-y-3"><div class="flex items-start justify-between gap-3"><div class="flex items-center gap-2.5"><span class="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"${attr_style(`background-color: ${stringify(card.accent)}`)}></span> <h3 class="font-bold text-sm text-[var(--ca-text-primary)] group-hover:text-[var(--ca-brand)] transition-colors">${escape_html(card.title)}</h3></div> `);
								Badge($$renderer, {
									variant: card.status === "STABLE" ? "success" : card.status === "ACTIVE" ? "primary" : "neutral",
									class: "text-[10px] font-mono",
									children: ($$renderer) => {
										$$renderer.push(`<!---->${escape_html(card.status)}`);
									},
									$$slots: { default: true }
								});
								$$renderer.push(`<!----></div> <p class="text-xs text-[var(--ca-text-muted)] line-clamp-2 leading-relaxed">${escape_html(card.description)}</p> `);
								if (card.totpCode) {
									$$renderer.push(`<!--[0--><div class="pt-1">`);
									TotpBadge($$renderer, {
										code: card.totpCode,
										label: "2FA Auth Key",
										secondsRemaining: 24
									});
									$$renderer.push(`<!----></div>`);
								} else $$renderer.push("<!--[-1-->");
								$$renderer.push(`<!--]--></div> <div class="pt-3 border-t border-[var(--ca-border)] flex items-center justify-between"><div class="flex -space-x-1.5 overflow-hidden"><!--[-->`);
								const each_array_2 = ensure_array_like(card.members);
								for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
									let member = each_array_2[$$index_1];
									$$renderer.push(`<div class="w-6 h-6 rounded-full bg-[var(--ca-surface-subtle)] border border-[var(--ca-surface)] flex items-center justify-center text-[10px] font-bold text-[var(--ca-text-secondary)]"${attr("title", member.name)}>${escape_html(member.name.slice(0, 1))}</div>`);
								}
								$$renderer.push(`<!--]--></div> <div class="flex items-center gap-2"><span class="text-xs font-mono text-[var(--ca-text-muted)]">★ ${escape_html(card.stars)}</span> `);
								Button($$renderer, {
									variant: "ghost",
									size: "sm",
									class: "text-xs",
									children: ($$renderer) => {
										$$renderer.push(`<!---->Manage →`);
									},
									$$slots: { default: true }
								});
								$$renderer.push(`<!----></div></div>`);
							},
							$$slots: { default: true }
						});
					}
					$$renderer.push(`<!--]--></div>`);
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
