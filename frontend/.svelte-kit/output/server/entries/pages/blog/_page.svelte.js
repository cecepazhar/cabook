import { S as escape_html, a as attr_class, d as ensure_array_like, l as derived } from "../../../chunks/index-server.js";
import { C as Badge, S as Card, h as Breadcrumb, o as SearchInput, r as PageContainer, t as PageHeader, w as Button } from "../../../chunks/dist.js";
//#region src/routes/blog/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const posts = [
			{
				id: "1",
				slug: "zero-knowledge-vault-guide",
				title: "Deep Dive: Building a Zero-Knowledge Encrypted Vault",
				excerpt: "How CAFramework secures your credentials locally using Argon2id key stretching and AES-256-GCM authenticated encryption without relying on a centralized key management server.",
				author: "Cecep Saeful Azhar",
				authorInitial: "C",
				date: "2026-10-15",
				category: "Security",
				readTime: "6 min read",
				isFeatured: true
			},
			{
				id: "2",
				slug: "svelte-5-runes-guide",
				title: "Svelte 5 Runes: State Management, $state & $derived",
				excerpt: "Moving away from legacy Svelte 3/4 stores into the reactivity primitives of Svelte 5. A practical comparison on building desktop-first application states.",
				author: "Cecep Saeful Azhar",
				authorInitial: "C",
				date: "2026-10-12",
				category: "Architecture",
				readTime: "4 min read"
			},
			{
				id: "3",
				slug: "rust-tauri-v2-security",
				title: "Sovereign Desktop Apps with Rust & Tauri v2",
				excerpt: "Why we moved our entire CA family stack from Electron to Tauri v2, achieving 15% faster binary payloads and seamless Linux/Android multi-platform support.",
				author: "Fathforce Studio",
				authorInitial: "F",
				date: "2026-10-08",
				category: "Development",
				readTime: "5 min read"
			},
			{
				id: "4",
				slug: "design-tokens-unified-system",
				title: "CAUI: Building a Single Source of Truth for 10+ Apps",
				excerpt: "How we consolidated 163 component duplications across 6 desktop applications into a single 80+ component design system with CSS variables and Tailwind tokens.",
				author: "Cecep Saeful Azhar",
				authorInitial: "C",
				date: "2026-10-02",
				category: "Design System",
				readTime: "7 min read"
			}
		];
		let searchQuery = "";
		let selectedCat = "All";
		let filtered = derived(() => posts.filter((p) => {
			return !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
		}));
		const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			PageContainer($$renderer, {
				class: "p-6 space-y-6 max-w-5xl mx-auto",
				children: ($$renderer) => {
					PageHeader($$renderer, {
						title: "CA Framework Blog & Updates",
						subtitle: "Engineering deep dives, architectural patterns, and release announcements.",
						accent: "indigo"
					});
					$$renderer.push(`<!----> `);
					Breadcrumb($$renderer, { items: ["Home", "Blog"] });
					$$renderer.push(`<!----> <div class="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center"><div class="flex-1 max-w-md">`);
					SearchInput($$renderer, {
						placeholder: "Search articles by keyword...",
						get value() {
							return searchQuery;
						},
						set value($$value) {
							searchQuery = $$value;
							$$settled = false;
						}
					});
					$$renderer.push(`<!----></div> <div class="flex flex-wrap gap-2"><!--[-->`);
					const each_array = ensure_array_like(categories);
					for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
						let cat = each_array[$$index];
						$$renderer.push(`<button type="button"${attr_class(`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${selectedCat === cat ? "bg-[var(--ca-brand)] text-white shadow-xs" : "bg-[var(--ca-surface-subtle)] text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)]"}`)}>${escape_html(cat)}</button>`);
					}
					$$renderer.push(`<!--]--></div></div> `);
					if (filtered().find((p) => p.isFeatured) && !searchQuery) {
						$$renderer.push("<!--[0-->");
						const featured = filtered().find((p) => p.isFeatured);
						Card($$renderer, {
							variant: "primary",
							class: "p-6 md:p-8 space-y-4 border-[var(--ca-brand)] shadow-xl relative overflow-hidden",
							children: ($$renderer) => {
								$$renderer.push(`<div class="absolute top-0 right-0 p-4">`);
								Badge($$renderer, {
									variant: "primary",
									class: "text-[10px] font-bold",
									children: ($$renderer) => {
										$$renderer.push(`<!---->FEATURED`);
									},
									$$slots: { default: true }
								});
								$$renderer.push(`<!----></div> <h3 class="text-2xl font-black tracking-tight text-[var(--ca-text-primary)] pr-16 leading-snug">${escape_html(featured.title)}</h3> <p class="text-xs text-[var(--ca-text-muted)] leading-relaxed max-w-2xl">${escape_html(featured.excerpt)}</p> <div class="flex items-center justify-between pt-2"><div class="flex items-center gap-2.5"><div class="w-8 h-8 rounded-full bg-[var(--ca-brand)]/15 text-[var(--ca-brand)] flex items-center justify-center font-bold text-xs">${escape_html(featured.authorInitial)}</div> <div><span class="text-xs font-semibold text-[var(--ca-text-secondary)] block">${escape_html(featured.author)}</span> <span class="text-[10px] text-[var(--ca-text-muted)] font-mono">${escape_html(featured.date)} · ${escape_html(featured.readTime)}</span></div></div> `);
								Button($$renderer, {
									variant: "primary",
									size: "sm",
									children: ($$renderer) => {
										$$renderer.push(`<!---->Read Article →`);
									},
									$$slots: { default: true }
								});
								$$renderer.push(`<!----></div>`);
							},
							$$slots: { default: true }
						});
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 gap-5"><!--[-->`);
					const each_array_1 = ensure_array_like(filtered());
					for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
						let post = each_array_1[$$index_1];
						if (post.isFeatured && !searchQuery) $$renderer.push("<!--[0-->");
						else {
							$$renderer.push("<!--[-1-->");
							Card($$renderer, {
								class: "p-5 flex flex-col justify-between space-y-4 hover:translate-y-0.5 hover:shadow-md transition-all",
								children: ($$renderer) => {
									$$renderer.push(`<div class="space-y-3">`);
									Badge($$renderer, {
										variant: "outline",
										class: "text-[10px] font-mono uppercase",
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(post.category)}`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----> <h4 class="text-sm font-bold text-[var(--ca-text-primary)] leading-snug line-clamp-2">${escape_html(post.title)}</h4> <p class="text-xs text-[var(--ca-text-muted)] leading-relaxed line-clamp-2">${escape_html(post.excerpt)}</p></div> <div class="flex items-center justify-between pt-3 border-t border-[var(--ca-border)]"><div class="text-[10px] text-[var(--ca-text-muted)] font-mono space-y-0.5"><span class="block">${escape_html(post.date)}</span> <span class="block">${escape_html(post.readTime)}</span></div> `);
									Button($$renderer, {
										variant: "ghost",
										size: "sm",
										class: "text-xs",
										children: ($$renderer) => {
											$$renderer.push(`<!---->View Details`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----></div>`);
								},
								$$slots: { default: true }
							});
						}
						$$renderer.push(`<!--]-->`);
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
