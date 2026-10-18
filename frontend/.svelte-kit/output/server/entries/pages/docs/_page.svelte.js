import "../../../chunks/index-server.js";
import { C as Badge, S as Card, g as Accordion, h as Breadcrumb, r as PageContainer, t as PageHeader, w as Button, y as Tabs } from "../../../chunks/dist.js";
//#region src/routes/docs/+page.svelte
function _page($$renderer) {
	let activeTab = "getting-started";
	const faqItems = [
		{
			title: "How do I add a new menu item?",
			content: "Add a [[menus]] block to your `app.toml`, then run `cargo run --package caf-xtask -- codegen`. This auto-generates both the TypeScript nav items and Rust IPC command bindings."
		},
		{
			title: "Where are the UI components?",
			content: "All shared design components are imported from `@cecepazhar/caui`. You can also override or extend them in `frontend/src/lib/components`."
		},
		{
			title: "Does the app work on Android?",
			content: "Yes. The Tauri v2 mobile setup is configured in `caf-app/gen/android`, producing both aarch64 and armv7 universal APK builds."
		}
	];
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		PageContainer($$renderer, {
			class: "p-6 space-y-6 max-w-4xl mx-auto",
			children: ($$renderer) => {
				PageHeader($$renderer, {
					title: "Developer Documentation",
					subtitle: "API reference, installation guides, and architectural principles of CAFramework.",
					accent: "indigo"
				});
				$$renderer.push(`<!----> `);
				Breadcrumb($$renderer, { items: ["Home", "Docs"] });
				$$renderer.push(`<!----> `);
				Card($$renderer, {
					class: "p-0 overflow-hidden",
					children: ($$renderer) => {
						$$renderer.push(`<div class="p-5 space-y-8">`);
						Tabs($$renderer, {
							tabs,
							get activeTab() {
								return activeTab;
							},
							set activeTab($$value) {
								activeTab = $$value;
								$$settled = false;
							}
						});
						$$renderer.push(`<!----> `);
						if (activeTab === "getting-started") {
							$$renderer.push(`<!--[0--><div class="space-y-4"><h3 class="text-sm font-bold text-[var(--ca-text-primary)]">Installation &amp; Initialization</h3> <p class="text-xs text-[var(--ca-text-muted)] leading-relaxed">To set up the CAFramework environment locally, you will need the Rust toolchain (with Tauri v2 targets) and a modern Node.js runtime (v20+) with pnpm.</p> <div class="rounded-xl border border-[var(--ca-border)] bg-[var(--ca-surface-subtle)] p-4 font-mono text-xs space-y-2 overflow-x-auto"><div class="flex items-center gap-2 mb-2"><span class="w-2 h-2 rounded-full bg-rose-500"></span> <span class="w-2 h-2 rounded-full bg-amber-500"></span> <span class="w-2 h-2 rounded-full bg-emerald-500"></span> <span class="ml-2 text-[10px] text-[var(--ca-text-muted)] uppercase tracking-wider font-bold">Terminal</span></div> <pre class="whitespace-pre-wrap text-[var(--ca-text-secondary)] leading-relaxed"># 1. Install prerequisites (Rust &amp; Node.js)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
npm install -g pnpm

# 2. Clone the framework
git clone https://github.com/cecepazhar/caframework.git
cd caframework

# 3. Generate a new application slice
cargo run --package caf-xtask -- new-app --name "MYAPP"

# 4. Run development environment (Tauri + Vite)
npm run tauri dev</pre> `);
							Button($$renderer, {
								variant: "ghost",
								size: "sm",
								class: "text-xs",
								children: ($$renderer) => {
									$$renderer.push(`<!---->Copy to clipboard`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----></div></div>`);
						} else if (activeTab === "architecture") {
							$$renderer.push(`<!--[1--><div class="space-y-4"><h3 class="text-sm font-bold text-[var(--ca-text-primary)]">System Topology</h3> <p class="text-xs text-[var(--ca-text-muted)] leading-relaxed">CAFramework is architected around the "Vertical Slice" pattern. Each module contains a Rust backend logic unit, a Tauri IPC command, and a Svelte route that is strictly decoupled from one another.</p> <div class="flex items-center gap-2">`);
							Badge($$renderer, {
								variant: "neutral",
								children: ($$renderer) => {
									$$renderer.push(`<!---->Rust Tauri Backend`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----> <span class="text-[var(--ca-text-muted)]">IPC →</span> `);
							Badge($$renderer, {
								variant: "neutral",
								children: ($$renderer) => {
									$$renderer.push(`<!---->CAUI Design System`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----> <span class="text-[var(--ca-text-muted)]">UI →</span> `);
							Badge($$renderer, {
								variant: "primary",
								children: ($$renderer) => {
									$$renderer.push(`<!---->Encrypted Local DB`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----></div></div>`);
						} else {
							$$renderer.push(`<!--[-1--><div class="space-y-4"><h3 class="text-sm font-bold text-[var(--ca-text-primary)]">Frequently Asked Questions</h3> `);
							Accordion($$renderer, { items: faqItems });
							$$renderer.push(`<!----></div>`);
						}
						$$renderer.push(`<!--]--></div>`);
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
}
//#endregion
export { _page as default };
