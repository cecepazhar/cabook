import { S as escape_html, a as attr_class, d as ensure_array_like } from "../../../chunks/index-server.js";
import { C as Badge, S as Card, h as Breadcrumb, r as PageContainer, t as PageHeader, w as Button } from "../../../chunks/dist.js";
//#region src/routes/changelog/+page.svelte
function _page($$renderer) {
	const releases = [
		{
			version: "v1.3.0",
			date: "October 16, 2026",
			isLatest: true,
			codename: "Platinum Sovereign",
			changes: [
				{
					type: "added",
					description: "19 new sovereign UI components in @cecepazhar/caui (EmptyState, LoadingState, ErrorState, TitleBar, WindowControls, PaneHeader, GlobalSplitControls, DualSplitViewport, TabGroupStrip, WorkspaceMenu, etc.)."
				},
				{
					type: "added",
					description: "5 Core Archetype screens for future apps: Table, Form, Cards, Analytics/Bars, and Dashboard."
				},
				{
					type: "added",
					description: "Web & Documentation portal routes: Landing, Blog, Changelog, and Docs."
				},
				{
					type: "changed",
					description: "Full 1:1 component synchronization between CAFramework and CAUI design system."
				},
				{
					type: "security",
					description: "Hardened zero-knowledge lock screen with 5-minute lockout on 5 consecutive failed attempts."
				}
			]
		},
		{
			version: "v1.2.0",
			date: "October 11, 2026",
			codename: "CAUI Bridge",
			changes: [
				{
					type: "added",
					description: "Mobile bottom navigation & all-menus overlay sheet."
				},
				{
					type: "added",
					description: "Feedback modal and about dialog primitives."
				},
				{
					type: "changed",
					description: "Unified CSS color tokens across 17 apps in the CA family."
				},
				{
					type: "fixed",
					description: "Focus-visible ring outline styling in input controls."
				}
			]
		},
		{
			version: "v1.1.0",
			date: "October 5, 2026",
			codename: "Runes Awakening",
			changes: [
				{
					type: "added",
					description: "Svelte 5 runes migration ($state, $derived, $effect) across all core widgets."
				},
				{
					type: "added",
					description: "Dual split viewport with in-pane and global layout modes."
				},
				{
					type: "security",
					description: "Argon2id password hashing upgrade for AES-256-GCM vault."
				}
			]
		}
	];
	function badgeVariant(type) {
		switch (type) {
			case "added": return "success";
			case "changed": return "primary";
			case "fixed": return "warning";
			case "security": return "danger";
			default: return "primary";
		}
	}
	PageContainer($$renderer, {
		class: "p-6 space-y-6 max-w-4xl mx-auto",
		children: ($$renderer) => {
			{
				function action($$renderer) {
					Button($$renderer, {
						variant: "outline",
						size: "sm",
						href: "https://github.com/cecepazhar",
						target: "_blank",
						children: ($$renderer) => {
							$$renderer.push(`<!---->GitHub Releases ↗`);
						},
						$$slots: { default: true }
					});
				}
				PageHeader($$renderer, {
					title: "Changelog & Release Notes",
					subtitle: "Chronological audit of new features, performance enhancements, and security updates.",
					accent: "indigo",
					action,
					$$slots: { action: true }
				});
			}
			$$renderer.push(`<!----> `);
			Breadcrumb($$renderer, { items: ["Home", "Changelog"] });
			$$renderer.push(`<!----> <div class="relative pl-6 space-y-8 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-[var(--ca-border)]"><!--[-->`);
			const each_array = ensure_array_like(releases);
			for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
				let rel = each_array[$$index_1];
				$$renderer.push(`<div class="relative space-y-3"><span${attr_class(`absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--ca-surface-base)] ${rel.isLatest ? "bg-[var(--ca-brand)] ring-4 ring-indigo-500/20" : "bg-[var(--ca-border)]"}`)}></span> <div class="flex items-center gap-3"><h3 class="text-xl font-black font-mono tracking-tight text-[var(--ca-text-primary)]">${escape_html(rel.version)}</h3> `);
				if (rel.isLatest) {
					$$renderer.push("<!--[0-->");
					Badge($$renderer, {
						variant: "primary",
						class: "font-mono text-[10px]",
						children: ($$renderer) => {
							$$renderer.push(`<!---->LATEST`);
						},
						$$slots: { default: true }
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (rel.codename) $$renderer.push(`<!--[0--><span class="text-xs text-[var(--ca-brand)] font-medium">"${escape_html(rel.codename)}"</span>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <span class="text-xs text-[var(--ca-text-muted)] ml-auto font-mono">${escape_html(rel.date)}</span></div> `);
				Card($$renderer, {
					class: "p-5 space-y-3",
					children: ($$renderer) => {
						$$renderer.push(`<ul class="space-y-2.5"><!--[-->`);
						const each_array_1 = ensure_array_like(rel.changes);
						for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
							let change = each_array_1[$$index];
							$$renderer.push(`<li class="flex items-start gap-2.5 text-xs text-[var(--ca-text-secondary)]">`);
							Badge($$renderer, {
								variant: badgeVariant(change.type),
								class: "text-[9px] font-mono uppercase mt-0.5 shrink-0 w-16 text-center justify-center",
								children: ($$renderer) => {
									$$renderer.push(`<!---->${escape_html(change.type)}`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----> <span class="leading-relaxed flex-1">${escape_html(change.description)}</span></li>`);
						}
						$$renderer.push(`<!--]--></ul>`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		},
		$$slots: { default: true }
	});
}
//#endregion
export { _page as default };
