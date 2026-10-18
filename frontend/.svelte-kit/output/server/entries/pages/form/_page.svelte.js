import { S as escape_html, _ as stringify, o as attr_style } from "../../../chunks/index-server.js";
import { C as Badge, S as Card, _ as RangeSlider, b as Alert, c as NumberInput, d as PinInput, l as ColorPicker, r as PageContainer, s as Stepper, t as PageHeader, u as Textarea, v as Switch, w as Button, x as Input } from "../../../chunks/dist.js";
//#region src/routes/form/+page.svelte
function _page($$renderer) {
	let currentStep = 0;
	const steps = [
		{
			label: "Basic Info",
			description: "Application naming & slug"
		},
		{
			label: "Security & Auth",
			description: "PIN, Master Key & RBAC"
		},
		{
			label: "Customization",
			description: "Branding accent & lighting"
		},
		{
			label: "Review",
			description: "Confirm deployment slice"
		}
	];
	let appName = "My Custom Node";
	let appSlug = "my-custom-node";
	let description = "High-performance automated node running with CAFramework runtime.";
	let pinCode = "";
	let e2eeEnabled = true;
	let rateLimit = 120;
	let accentColor = "#6366f1";
	let ambientUnderglow = true;
	let memoryThreshold = [20, 80];
	let isSubmitting = false;
	let submitSuccess = false;
	function handleNext() {
		if (currentStep < steps.length - 1) currentStep += 1;
		else {
			isSubmitting = true;
			setTimeout(() => {
				isSubmitting = false;
				submitSuccess = true;
			}, 1e3);
		}
	}
	function handleBack() {
		if (currentStep > 0) currentStep -= 1;
	}
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		PageContainer($$renderer, {
			class: "p-6 space-y-6 max-w-4xl mx-auto",
			children: ($$renderer) => {
				PageHeader($$renderer, {
					title: "Form Archetype",
					subtitle: "Comprehensive form system featuring multi-step Stepper, PIN input, ColorPicker, Sliders, and validation.",
					accent: "indigo"
				});
				$$renderer.push(`<!----> `);
				if (submitSuccess) {
					$$renderer.push("<!--[0-->");
					Alert($$renderer, {
						variant: "success",
						title: "Slice Configured Successfully!",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Configuration has been verified and saved to the local encrypted SQLite datastore.`);
						},
						$$slots: { default: true }
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				Card($$renderer, {
					class: "p-5",
					children: ($$renderer) => {
						Stepper($$renderer, {
							steps,
							activeIndex: currentStep,
							onstepclick: (idx) => currentStep = idx
						});
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Card($$renderer, {
					class: "p-6 space-y-6",
					children: ($$renderer) => {
						if (currentStep === 0) {
							$$renderer.push(`<!--[0--><div class="space-y-4"><h3 class="text-sm font-bold text-[var(--ca-text-primary)]">Step 1: Application Identity</h3> <p class="text-xs text-[var(--ca-text-muted)]">Define unique manifest parameters for this vertical slice.</p> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="step1-app-name" class="block text-xs font-semibold text-[var(--ca-text-secondary)] mb-1">Application Name</label> `);
							Input($$renderer, {
								id: "step1-app-name",
								placeholder: "e.g. CATerminal",
								get value() {
									return appName;
								},
								set value($$value) {
									appName = $$value;
									$$settled = false;
								}
							});
							$$renderer.push(`<!----></div> <div><label for="step1-app-slug" class="block text-xs font-semibold text-[var(--ca-text-secondary)] mb-1">Bundle Slug</label> `);
							Input($$renderer, {
								id: "step1-app-slug",
								placeholder: "com.fathforce.caterm",
								get value() {
									return appSlug;
								},
								set value($$value) {
									appSlug = $$value;
									$$settled = false;
								}
							});
							$$renderer.push(`<!----></div></div> <div><label for="step1-app-desc" class="block text-xs font-semibold text-[var(--ca-text-secondary)] mb-1">Description</label> `);
							Textarea($$renderer, {
								id: "step1-app-desc",
								rows: 3,
								placeholder: "Describe the purpose of this slice...",
								get value() {
									return description;
								},
								set value($$value) {
									description = $$value;
									$$settled = false;
								}
							});
							$$renderer.push(`<!----></div></div>`);
						} else if (currentStep === 1) {
							$$renderer.push(`<!--[1--><div class="space-y-4"><h3 class="text-sm font-bold text-[var(--ca-text-primary)]">Step 2: Security &amp; Authentication</h3> <p class="text-xs text-[var(--ca-text-muted)]">Configure zero-knowledge access controls and limits.</p> <div><label for="step2-pin" class="block text-xs font-semibold text-[var(--ca-text-secondary)] mb-2">6-Digit Profile PIN</label> `);
							PinInput($$renderer, {
								length: 6,
								get value() {
									return pinCode;
								},
								set value($$value) {
									pinCode = $$value;
									$$settled = false;
								}
							});
							$$renderer.push(`<!----></div> <div class="pt-2">`);
							Switch($$renderer, {
								label: "Enable End-to-End Vault Encryption",
								get checked() {
									return e2eeEnabled;
								},
								set checked($$value) {
									e2eeEnabled = $$value;
									$$settled = false;
								}
							});
							$$renderer.push(`<!----></div> <div><label for="step2-ratelimit" class="block text-xs font-semibold text-[var(--ca-text-secondary)] mb-1">Request Rate Limit (req/min)</label> `);
							NumberInput($$renderer, {
								id: "step2-ratelimit",
								min: 10,
								max: 1e3,
								step: 10,
								get value() {
									return rateLimit;
								},
								set value($$value) {
									rateLimit = $$value;
									$$settled = false;
								}
							});
							$$renderer.push(`<!----></div></div>`);
						} else if (currentStep === 2) {
							$$renderer.push(`<!--[2--><div class="space-y-5"><h3 class="text-sm font-bold text-[var(--ca-text-primary)]">Step 3: Customization &amp; Branding</h3> <p class="text-xs text-[var(--ca-text-muted)]">Fine-tune the design system accent and hardware rim lighting.</p> <div><label for="step3-accent" class="block text-xs font-semibold text-[var(--ca-text-secondary)] mb-2">Primary Accent Color</label> <div class="flex items-center gap-3">`);
							ColorPicker($$renderer, {
								get value() {
									return accentColor;
								},
								set value($$value) {
									accentColor = $$value;
									$$settled = false;
								}
							});
							$$renderer.push(`<!----> <span class="font-mono text-xs">${escape_html(accentColor)}</span></div></div> <div class="pt-2">`);
							Switch($$renderer, {
								label: "Enable Ambient GPU Rim Lighting",
								get checked() {
									return ambientUnderglow;
								},
								set checked($$value) {
									ambientUnderglow = $$value;
									$$settled = false;
								}
							});
							$$renderer.push(`<!----></div> <div><div class="flex justify-between text-xs mb-1"><span class="text-[var(--ca-text-secondary)] font-medium">Memory Cache Range (% RAM)</span> <span class="font-mono text-[var(--ca-text-muted)]">${escape_html(memoryThreshold[0])}% — ${escape_html(memoryThreshold[1])}%</span></div> `);
							RangeSlider($$renderer, {
								min: 0,
								max: 100,
								step: 5,
								get values() {
									return memoryThreshold;
								},
								set values($$value) {
									memoryThreshold = $$value;
									$$settled = false;
								}
							});
							$$renderer.push(`<!----></div></div>`);
						} else {
							$$renderer.push(`<!--[-1--><div class="space-y-4"><h3 class="text-sm font-bold text-[var(--ca-text-primary)]">Step 4: Review Configuration</h3> <p class="text-xs text-[var(--ca-text-muted)]">Verify your settings before finalizing this application slice.</p> <div class="divide-y divide-[var(--ca-border)] rounded-xl border border-[var(--ca-border)] p-4 bg-[var(--ca-surface-subtle)] space-y-2 text-xs"><div class="flex justify-between py-1.5"><span class="text-[var(--ca-text-muted)]">Application Name</span> <span class="font-semibold">${escape_html(appName)}</span></div> <div class="flex justify-between py-1.5"><span class="text-[var(--ca-text-muted)]">Bundle Slug</span> <span class="font-mono text-[var(--ca-brand)]">${escape_html(appSlug)}</span></div> <div class="flex justify-between py-1.5"><span class="text-[var(--ca-text-muted)]">E2EE Security</span> `);
							Badge($$renderer, {
								variant: e2eeEnabled ? "success" : "neutral",
								children: ($$renderer) => {
									$$renderer.push(`<!---->${escape_html(e2eeEnabled ? "Active" : "Disabled")}`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----></div> <div class="flex justify-between py-1.5"><span class="text-[var(--ca-text-muted)]">Brand Accent</span> <div class="flex items-center gap-1.5 font-mono"><span class="w-3 h-3 rounded-full"${attr_style(`background-color: ${stringify(accentColor)}`)}></span> ${escape_html(accentColor)}</div></div></div></div>`);
						}
						$$renderer.push(`<!--]--> <div class="flex items-center justify-between pt-4 border-t border-[var(--ca-border)]">`);
						Button($$renderer, {
							variant: "ghost",
							size: "md",
							disabled: currentStep === 0,
							onclick: handleBack,
							children: ($$renderer) => {
								$$renderer.push(`<!---->Back`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> `);
						Button($$renderer, {
							variant: "primary",
							size: "md",
							disabled: isSubmitting,
							onclick: handleNext,
							children: ($$renderer) => {
								if (isSubmitting) $$renderer.push(`<!--[0-->Saving...`);
								else if (currentStep === steps.length - 1) $$renderer.push(`<!--[1-->Confirm &amp; Save`);
								else $$renderer.push(`<!--[-1-->Next Step →`);
								$$renderer.push(`<!--]-->`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----></div>`);
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
