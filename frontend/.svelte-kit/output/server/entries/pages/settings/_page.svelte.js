import { S as escape_html, _ as stringify, a as attr_class, b as attr, d as ensure_array_like, l as derived, o as attr_style, x as clsx } from "../../../chunks/index-server.js";
import { o as cmdSetPerformancePrefs } from "../../../chunks/commands.js";
import { C as getAppearance, _ as getProfile, b as syncPro, c as KOFI_URL, d as releaseNotesUrl, f as AvatarPicker, h as getAmbientStore, i as ProLoginForm, m as ProfileAvatar, o as APP_VERSION, r as getUpdater, v as getPro, x as proErrorCode, y as refreshProStatus } from "../../../chunks/ai.js";
import { c as t, i as showToast, s as intlLocale, t as confirmModal } from "../../../chunks/uiNotifications.svelte.js";
import { t as errorText } from "../../../chunks/errors.js";
import { t as page } from "../../../chunks/state.js";
import { t as PageHeader } from "../../../chunks/PageHeader.js";
import "@tauri-apps/api/core";
import { relaunch } from "@tauri-apps/plugin-process";
//#region src/lib/components/AiSettingsForm.svelte
function AiSettingsForm($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { onSaved } = $$props;
		let settings = {
			provider: "custom",
			base_url: "http://100.76.150.46:3007/v1",
			api_key: "",
			model: "claude-3-5-sonnet"
		};
		let isLoading = true;
		$$renderer.push(`<form class="space-y-4"><div><label for="ai-provider-select" class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">${escape_html(t("aiSettings.provider"))}</label> `);
		$$renderer.select({
			id: "ai-provider-select",
			value: settings.provider,
			disabled: isLoading,
			class: "w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-violet-500 transition-colors"
		}, ($$renderer) => {
			$$renderer.option({ value: "custom" }, ($$renderer) => {
				$$renderer.push(`${escape_html(t("aiSettings.providerCustom"))}`);
			});
			$$renderer.option({ value: "openai" }, ($$renderer) => {
				$$renderer.push(`${escape_html(t("aiSettings.providerOpenai"))}`);
			});
			$$renderer.option({ value: "ollama" }, ($$renderer) => {
				$$renderer.push(`${escape_html(t("aiSettings.providerOllama"))}`);
			});
			$$renderer.option({ value: "anthropic" }, ($$renderer) => {
				$$renderer.push(`${escape_html(t("aiSettings.providerAnthropic"))}`);
			});
		});
		$$renderer.push(`</div> <div><label for="ai-base-url-input" class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">${escape_html(t("aiSettings.baseUrl"))}</label> <input id="ai-base-url-input" type="text"${attr("value", settings.base_url)}${attr("disabled", isLoading, true)} placeholder="http://100.76.150.46:3007/v1" class="w-full font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs md:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-violet-500 transition-colors"/> <p class="text-[11px] text-neutral-500 mt-1">${escape_html(t("aiSettings.baseUrlHintBefore"))} <span class="font-mono">/chat/completions</span>.</p></div> <div><label for="ai-api-key-input" class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">${escape_html(t("aiSettings.apiKey"))}</label> <div class="relative"><input id="ai-api-key-input"${attr("type", "password")}${attr("value", settings.api_key)}${attr("disabled", isLoading, true)} placeholder="sk-..." class="w-full font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs md:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-violet-500 transition-colors pr-10"/> <button type="button" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"${attr("aria-label", t("aiSettings.showApiKey"))}>`);
		$$renderer.push(`<!--[-1--><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`);
		$$renderer.push(`<!--]--></button></div> <p class="text-[11px] text-neutral-500 mt-1">${escape_html(t("aiSettings.apiKeyHint"))}</p></div> <div><label for="ai-model-input" class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">${escape_html(t("aiSettings.model"))}</label> <input id="ai-model-input" type="text"${attr("value", settings.model)}${attr("disabled", isLoading, true)} placeholder="claude-3-5-sonnet" class="w-full font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs md:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-violet-500 transition-colors"/></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800 gap-2"><button type="button" class="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors shrink-0">${escape_html(t("aiSettings.resetDefault"))}</button> <div class="flex items-center gap-2"><button type="button"${attr("disabled", isLoading, true)} class="px-4 py-2 rounded-lg text-xs font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 transition-colors">${escape_html(t("aiSettings.testConnection"))}</button> <button type="submit"${attr("disabled", isLoading, true)} class="px-5 py-2 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white shadow transition-colors">${escape_html(t("aiSettings.saveSettings"))}</button></div></div></form>`);
	});
}
//#endregion
//#region src/lib/pro/pricing.ts
var PRO_PRICING = {
	monthly: {
		list: 10,
		intro: 6
	},
	yearly: {
		list: 108,
		intro: 64.8
	},
	/** Extra discount for the first 12 months / first yearly cycle of a new customer. */
	introDiscountPercent: 40,
	introMonths: 12,
	/** Permanent discount of yearly vs 12× monthly. */
	yearlyDiscountPercent: 10,
	trialDays: 7,
	/** One account covers up to this many people (owner + 6), at no extra cost. */
	maxMembers: 7,
	syncDevices: 5,
	aiRequestsPerMonth: 300
};
/** `$6`, `$64.80` — whole dollars without decimals, cents with exactly two. */
function formatUsd(amount) {
	return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}
function setPerformancePrefs(prefs) {
	return cmdSetPerformancePrefs({ prefs });
}
//#endregion
//#region src/lib/pro/errors.ts
/** A translated message for a failed Pro call: `pro.errors.<CODE>` when known, else the generic text. */
function proErrorMessage(err) {
	const code = proErrorCode(err);
	const key = code ? `pro.errors.${code}` : "";
	const text = key ? t(key) : "";
	return text && text !== key ? text : errorText(err);
}
//#endregion
//#region src/lib/components/ProTeamPanel.svelte
function ProTeamPanel($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** Receives the heartbeat after joining/leaving, so the page can show the device-limit dialog. */
		let { onOutcome } = $$props;
		getPro();
		let busy = false;
		const SMALL_BUTTON = "px-3 py-1.5 text-xs font-medium rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 transition-colors";
		derived(() => 0);
		derived(() => false);
		$$renderer.push(`<div class="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-neutral-50 dark:bg-neutral-950 space-y-4"><div class="flex items-start justify-between gap-3"><div><p class="text-sm font-semibold text-neutral-900 dark:text-white">${escape_html(t("pro.team.title"))}</p> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">${escape_html(t("pro.team.subtitle", { count: PRO_PRICING.maxMembers - 1 }))}</p></div> <button type="button"${attr("disabled", busy, true)}${attr_class(clsx(SMALL_BUTTON))}>${escape_html(t("pro.team.refresh"))}</button></div> `);
		$$renderer.push(`<!--[1--><p class="text-xs text-neutral-500 dark:text-neutral-400">${escape_html(t("pro.team.loading"))}</p>`);
		$$renderer.push(`<!--]--></div>`);
	});
}
var MOD = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl";
var SHORTCUT_GROUPS = [
	{
		title: "global",
		items: [
			{
				label: "commandPalette",
				keys: [[MOD, "K"], [
					MOD,
					"Shift",
					"P"
				]]
			},
			{
				label: "openSettings",
				keys: [[MOD, ","]]
			},
			{
				label: "lockVault",
				keys: [[
					MOD,
					"Shift",
					"L"
				]]
			}
		]
	},
	{
		title: "sessions",
		items: [
			{
				label: "newSession",
				keys: [[
					MOD,
					"Shift",
					"T"
				]]
			},
			{
				label: "switchToTabRange",
				keys: [[MOD, "1…8"]]
			},
			{
				label: "lastTab",
				keys: [[MOD, "9"]]
			},
			{
				label: "nextTab",
				keys: [["Ctrl", "Tab"]]
			},
			{
				label: "previousTab",
				keys: [[
					"Ctrl",
					"Shift",
					"Tab"
				]]
			},
			{
				label: "closeTab",
				keys: [[
					MOD,
					"Shift",
					"W"
				]]
			}
		]
	},
	{
		title: "terminal",
		items: [
			{
				label: "copySelection",
				keys: [[
					MOD,
					"Shift",
					"C"
				], [MOD, "C"]]
			},
			{
				label: "paste",
				keys: [[MOD, "V"], [
					MOD,
					"Shift",
					"V"
				]]
			},
			{
				label: "fontBigger",
				keys: [[MOD, "+"]]
			},
			{
				label: "fontSmaller",
				keys: [[MOD, "−"]]
			},
			{
				label: "fontReset",
				keys: [[MOD, "0"]]
			},
			{
				label: "autocompleteAccept",
				keys: [["Tab"]]
			}
		]
	},
	{
		title: "sftp",
		items: [
			{
				label: "sftpCopy",
				keys: [["F5"]]
			},
			{
				label: "sftpNewFolder",
				keys: [["F7"]]
			},
			{
				label: "sftpDelete",
				keys: [["F8"], ["Delete"]]
			},
			{
				label: "sftpRename",
				keys: [["F2"]]
			},
			{
				label: "sftpEdit",
				keys: [["F4"]]
			}
		]
	}
];
//#endregion
//#region src/lib/components/AmbientSettingsCard.svelte
function AmbientSettingsCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { defaultAccent = "#64748b", appName = "CAFramework" } = $$props;
		const ambient = getAmbientStore();
		const pro = getPro();
		const PRESET_COLORS = [
			{
				name: "Crimson Red",
				hex: "#ef4444"
			},
			{
				name: "Cyan Blue",
				hex: "#06b6d4"
			},
			{
				name: "Emerald Green",
				hex: "#10b981"
			},
			{
				name: "Royal Indigo",
				hex: "#6366f1"
			},
			{
				name: "Amber Gold",
				hex: "#f59e0b"
			},
			{
				name: "Neon Purple",
				hex: "#a855f7"
			},
			{
				name: "Rose Pink",
				hex: "#f43f5e"
			},
			{
				name: "Slate Silver",
				hex: "#64748b"
			}
		];
		$$renderer.push(`<div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm text-neutral-900 dark:text-white space-y-6"><div class="flex items-start justify-between gap-4"><div class="space-y-1"><div class="flex items-center gap-2"><h3 class="text-base font-semibold tracking-tight">Ambient Underglow &amp; RGB Lighting</h3> `);
		if (pro.isPro) $$renderer.push(`<!--[0--><span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 uppercase tracking-wide">PRO Founder</span>`);
		else $$renderer.push(`<!--[-1--><span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">PRO Feature</span>`);
		$$renderer.push(`<!--]--></div> <p class="text-xs text-neutral-500 dark:text-neutral-400 max-w-xl">Pencahayaan halo luar di sekeliling area kerja dengan akselerasi GPU. Mendukung mode warna solid, aksen brand, dan spektrum RGB dinamis ala keyboard mekanik.</p></div> <div class="flex items-center gap-3"><span class="text-xs font-medium text-neutral-500 dark:text-neutral-400">${escape_html(ambient.config.enabled && pro.isPro ? "Aktif" : "Nonaktif")}</span> <button type="button" role="switch"${attr("aria-checked", ambient.config.enabled)}${attr("disabled", !pro.isPro, true)}${attr_class(`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed ${ambient.config.enabled && pro.isPro ? "bg-sky-600" : "bg-neutral-300 dark:bg-neutral-700"}`)}><span${attr_class(`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${ambient.config.enabled && pro.isPro ? "translate-x-5" : "translate-x-0"}`)}></span></button></div></div> `);
		if (!pro.isPro) $$renderer.push(`<!--[0--><div class="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-3"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> <span>Fitur kustomisasi Ambient Lighting eksklusif untuk lisensi <strong>PRO Founder Edition</strong>. Masuk dengan akun Pro untuk mengaktifkannya.</span></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (ambient.config.enabled && pro.isPro) {
			$$renderer.push(`<!--[0--><div class="space-y-6 pt-2 border-t border-neutral-200 dark:border-neutral-800"><div class="space-y-2.5"><label class="block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Mode Warna (Color Mode)</label> <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5"><button type="button"${attr_class(`p-3 rounded-xl border text-left transition-all ${ambient.config.mode === "app-accent" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="flex items-center gap-2 mb-1"><span class="w-3 h-3 rounded-full border border-black/20"${attr_style("", { "background-color": defaultAccent })}></span> <span class="text-xs font-semibold">Tema ${escape_html(appName)}</span></div> <p class="text-[10px] text-neutral-500 dark:text-neutral-400">Bawaan warna aplikasi</p></button> <button type="button"${attr_class(`p-3 rounded-xl border text-left transition-all ${ambient.config.mode === "solid" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="flex items-center gap-2 mb-1"><span class="w-3 h-3 rounded-full border border-black/20"${attr_style("", { "background-color": ambient.config.customColor })}></span> <span class="text-xs font-semibold">Warna Solid</span></div> <p class="text-[10px] text-neutral-500 dark:text-neutral-400">Pilih warna bebas</p></button> <button type="button"${attr_class(`p-3 rounded-xl border text-left transition-all ${ambient.config.mode === "rgb-cycle" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="flex items-center gap-2 mb-1"><span class="w-3 h-3 rounded-full bg-[linear-gradient(135deg,#ff0055,#33cc33,#0099ff)]"></span> <span class="text-xs font-semibold">RGB Chroma</span></div> <p class="text-[10px] text-neutral-500 dark:text-neutral-400">Keyboard mechanical cycle</p></button> <button type="button"${attr_class(`p-3 rounded-xl border text-left transition-all ${ambient.config.mode === "aurora" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="flex items-center gap-2 mb-1"><span class="w-3 h-3 rounded-full bg-[radial-gradient(circle,#06b6d4,#8b5cf6)]"></span> <span class="text-xs font-semibold">Aurora Drift</span></div> <p class="text-[10px] text-neutral-500 dark:text-neutral-400">Gelombang cahaya halus</p></button></div></div> `);
			if (ambient.config.mode === "solid") {
				$$renderer.push(`<!--[0--><div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-3"><label class="block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Palet Warna Kustom</label> <div class="flex flex-wrap items-center gap-2"><!--[-->`);
				const each_array = ensure_array_like(PRESET_COLORS);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let preset = each_array[$$index];
					$$renderer.push(`<button type="button"${attr("title", preset.name)}${attr_class(`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${ambient.config.customColor === preset.hex ? "border-white ring-2 ring-sky-500 scale-110" : "border-black/20"}`)}${attr_style("", { "background-color": preset.hex })}>`);
					if (ambient.config.customColor === preset.hex) $$renderer.push(`<!--[0--><svg class="w-3.5 h-3.5 text-white drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></button>`);
				}
				$$renderer.push(`<!--]--> <div class="flex items-center gap-2 ml-auto"><span class="text-xs text-neutral-400 font-mono">Hex:</span> <input type="color"${attr("value", ambient.config.customColor)} class="w-8 h-8 rounded-lg border border-neutral-300 dark:border-neutral-700 cursor-pointer bg-transparent"/> <span class="text-xs font-mono px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-800">${escape_html(ambient.config.customColor)}</span></div></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="space-y-2.5"><label class="block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Efek Animasi (Animation Effect)</label> <div class="grid grid-cols-3 gap-2.5"><button type="button"${attr_class(`p-3 rounded-xl border text-center transition-all ${ambient.config.effect === "static" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300 font-semibold" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="text-xs">Statis (Steady)</div> <div class="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">Cahaya konstan</div></button> <button type="button"${attr_class(`p-3 rounded-xl border text-center transition-all ${ambient.config.effect === "breathing" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300 font-semibold" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="text-xs">Bernafas (Pulse)</div> <div class="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">Siklus redup &amp; terang</div></button> <button type="button"${attr_class(`p-3 rounded-xl border text-center transition-all ${ambient.config.effect === "wave" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300 font-semibold" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="text-xs">Gelombang (Wave)</div> <div class="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">Aliran dinamis</div></button></div></div> <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2"><div class="space-y-1.5"><div class="flex justify-between text-xs"><span class="text-neutral-500 dark:text-neutral-400">Kecerahan</span> <span class="font-mono font-semibold">${escape_html(Math.round(ambient.config.intensity * 100))}%</span></div> <input type="range" min="0.1" max="1.0" step="0.05"${attr("value", ambient.config.intensity)} class="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-sky-500"/></div> <div class="space-y-1.5"><div class="flex justify-between text-xs"><span class="text-neutral-500 dark:text-neutral-400">Jangkauan Pendar</span> <span class="font-mono font-semibold">${escape_html(ambient.config.blurRadius)}px</span></div> <input type="range" min="8" max="45" step="1"${attr("value", ambient.config.blurRadius)} class="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-sky-500"/></div> <div class="space-y-1.5"><div class="flex justify-between text-xs"><span class="text-neutral-500 dark:text-neutral-400">Kecepatan Animasi</span> <span class="font-mono font-semibold">${escape_html(ambient.config.speedSec)}s</span></div> <input type="range" min="1" max="15" step="0.5"${attr("value", ambient.config.speedSec)} class="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-sky-500"/></div></div> <div class="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800"><div class="flex items-center justify-between"><div class="space-y-0.5"><div class="flex items-center gap-2"><span class="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Avatar Profile Halo Effect (PRO)</span> <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-500 border border-sky-500/20 uppercase">Aura GPU</span></div> <p class="text-[11px] text-neutral-500 dark:text-neutral-400">Pancaran halo mikro reaktif pada avatar profil di LockScreen, Menu, dan Pengaturan.</p></div> <div class="flex items-center gap-2"><span class="text-xs text-neutral-500 dark:text-neutral-400">${escape_html(ambient.config.avatarGlowEnabled ? "Aktif" : "Nonaktif")}</span> <button type="button" role="switch" aria-label="Toggle Avatar Glow Effect"${attr("aria-checked", ambient.config.avatarGlowEnabled)}${attr_class(`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${ambient.config.avatarGlowEnabled ? "bg-sky-600" : "bg-neutral-300 dark:bg-neutral-700"}`)}><span${attr_class(`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${ambient.config.avatarGlowEnabled ? "translate-x-4" : "translate-x-0"}`)}></span></button></div></div> `);
			if (ambient.config.avatarGlowEnabled) $$renderer.push(`<!--[0--><div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1"><button type="button"${attr_class(`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-3 ${ambient.config.avatarGlowEffect === "comet-beam" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-1 ring-sky-500/50" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="flex items-center justify-between"><span class="text-xs font-semibold">Conic Comet Beam</span> <div class="relative w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 overflow-visible"><div class="absolute -inset-1 rounded-full animate-spin [animation-duration:3s] [background:conic-gradient(from_0deg,transparent_0deg,transparent_240deg,#38bdf8_360deg)] [mask:radial-gradient(closest-side,transparent_65%,black_70%)] [-webkit-mask:radial-gradient(closest-side,transparent_65%,black_70%)]"></div> <div class="w-4 h-4 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[8px] font-bold">1</div></div></div> <p class="text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed">Default: Berkas laser komet berputar 120° mengelilingi cincin avatar.</p></button> <button type="button"${attr_class(`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-3 ${ambient.config.avatarGlowEffect === "dual-photons" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-1 ring-sky-500/50" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="flex items-center justify-between"><span class="text-xs font-semibold">Dual Photons</span> <div class="relative w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 overflow-visible"><div class="absolute -inset-1 rounded-full animate-spin [animation-duration:2.5s] [background:conic-gradient(from_0deg,transparent_0deg,transparent_140deg,#38bdf8_180deg,transparent_180deg,transparent_320deg,#c084fc_360deg)] [mask:radial-gradient(closest-side,transparent_65%,black_70%)] [-webkit-mask:radial-gradient(closest-side,transparent_65%,black_70%)]"></div> <div class="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[8px] font-bold">2</div></div></div> <p class="text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed">2 partikel foton satelit berkejaran 180° dengan pendar ganda.</p></button> <button type="button"${attr_class(`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-3 ${ambient.config.avatarGlowEffect === "chroma-ring" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-1 ring-sky-500/50" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="flex items-center justify-between"><span class="text-xs font-semibold">Reactive Chroma</span> <div class="relative w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 overflow-visible"><div class="absolute -inset-1 rounded-full animate-spin [animation-duration:4s] [background:conic-gradient(from_0deg,#ff0055,#33cc33,#0099ff,#ff0055)] blur-[1px]"></div> <div class="w-4 h-4 rounded-full bg-neutral-900 z-10 flex items-center justify-center text-[8px] font-bold text-neutral-300">3</div></div></div> <p class="text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed">Aura reaktif mengikuti spektrum warna &amp; kecepatan ambient terpilih.</p></button></div>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800"><div class="flex items-center justify-between"><div class="space-y-0.5"><div class="flex items-center gap-2"><span class="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Work Area Card Outer Glow (PRO)</span> <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-500 border border-sky-500/20 uppercase">Card Aura</span></div> <p class="text-[11px] text-neutral-500 dark:text-neutral-400">Pendaran cahaya luar pada kartu area kerja (&lt;main>) menyusuri sudut siku rounded-tl-xl ke kanvas luar.</p></div> <div class="flex items-center gap-2"><span class="text-xs text-neutral-500 dark:text-neutral-400">${escape_html(ambient.config.cardGlowEnabled ? "Aktif" : "Nonaktif")}</span> <button type="button" role="switch" aria-label="Toggle Card Glow Effect"${attr("aria-checked", ambient.config.cardGlowEnabled)}${attr_class(`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${ambient.config.cardGlowEnabled ? "bg-sky-600" : "bg-neutral-300 dark:bg-neutral-700"}`)}><span${attr_class(`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${ambient.config.cardGlowEnabled ? "translate-x-4" : "translate-x-0"}`)}></span></button></div></div> `);
			if (ambient.config.cardGlowEnabled) $$renderer.push(`<!--[0--><div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1"><button type="button"${attr_class(`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-3 ${ambient.config.cardGlowStyle === "diffused-halo" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-1 ring-sky-500/50" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="flex items-center justify-between"><span class="text-xs font-semibold">Diffused Halo</span> <div class="relative w-10 h-7 bg-neutral-900 border border-neutral-800 rounded-br-sm overflow-visible flex items-end justify-end p-1"><div class="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-tl-lg bg-sky-400/40 blur-[4px]"></div> <div class="w-full h-full rounded-tl-md border-t border-l border-sky-400/60 bg-neutral-800/80"></div></div></div> <p class="text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed">Pendaran cahaya ambient lembut memancar keluar ke kanvas dan sekeliling sudut siku.</p></button> <button type="button"${attr_class(`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-3 ${ambient.config.cardGlowStyle === "neon-border" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-1 ring-sky-500/50" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="flex items-center justify-between"><span class="text-xs font-semibold">Neon Hairline</span> <div class="relative w-10 h-7 bg-neutral-900 border border-neutral-800 rounded-br-sm overflow-visible flex items-end justify-end p-1"><div class="w-full h-full rounded-tl-md border-t-2 border-l-2 border-sky-400 shadow-[0_0_8px_#38bdf8] bg-neutral-800/80"></div></div></div> <p class="text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed">Garis tepi siku atas &amp; kiri menyala tegas dengan pendaran neon berpresisi tinggi.</p></button> <button type="button"${attr_class(`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-3 ${ambient.config.cardGlowStyle === "chroma-beam" ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-1 ring-sky-500/50" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`)}><div class="flex items-center justify-between"><span class="text-xs font-semibold">Chroma Border Beam</span> <div class="relative w-10 h-7 bg-neutral-900 border border-neutral-800 rounded-br-sm overflow-hidden flex items-end justify-end p-1"><div class="absolute -inset-2 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_220deg,#38bdf8_360deg)] animate-spin [animation-duration:3s]"></div> <div class="relative w-full h-full rounded-tl-md bg-neutral-900 border-t border-l border-sky-400/40"></div></div></div> <p class="text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed">Sinar berkas laser mengalir dinamis mengitari lengkungan siku rounded.</p></button></div>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/routes/settings/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var _page$url$searchParam;
		const pro = getPro();
		let showProLogin = false;
		let deviceLimit = null;
		let proBusy = false;
		const TONE = {
			sky: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
			emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
			amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
			rose: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
			neutral: "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700"
		};
		const SMALL_BUTTON = "px-3 py-1.5 text-xs font-medium rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 transition-colors";
		function formatProDate(ts) {
			return ts ? (/* @__PURE__ */ new Date(ts * 1e3)).toLocaleDateString(intlLocale(), {
				day: "numeric",
				month: "long",
				year: "numeric"
			}) : "";
		}
		function formatProTime(ts) {
			return ts ? (/* @__PURE__ */ new Date(ts * 1e3)).toLocaleString(intlLocale(), {
				dateStyle: "medium",
				timeStyle: "short"
			}) : "";
		}
		const proState = derived(() => {
			const status = pro.status;
			if (!(status === null || status === void 0 ? void 0 : status.signedIn)) return null;
			const ent = status.entitlement;
			const lic = status.license;
			if (!status.keyConfigured) return {
				tone: "amber",
				text: t("pro.account.stateKeyMissing")
			};
			if (ent.state === "valid") {
				if (ent.tier === "team") return {
					tone: "sky",
					text: t("pro.account.stateTeamMember")
				};
				if ((lic === null || lic === void 0 ? void 0 : lic.status) === "trialing") {
					var _lic$trialEndsAt;
					const end = (_lic$trialEndsAt = lic.trialEndsAt) !== null && _lic$trialEndsAt !== void 0 ? _lic$trialEndsAt : ent.expiresAt;
					const count = Math.max(0, Math.ceil((end - Date.now() / 1e3) / 86400));
					return {
						tone: "sky",
						text: t("pro.account.stateTrial", { count })
					};
				}
				if ((lic === null || lic === void 0 ? void 0 : lic.status) === "cancelled") return {
					tone: "amber",
					text: t("pro.account.stateCancelled", { date: formatProDate(lic.currentPeriodEnd) })
				};
				if ((lic === null || lic === void 0 ? void 0 : lic.status) === "past_due") return {
					tone: "amber",
					text: t("pro.account.statePastDue")
				};
				return (lic === null || lic === void 0 ? void 0 : lic.currentPeriodEnd) ? {
					tone: "emerald",
					text: t("pro.account.stateActive", { date: formatProDate(lic.currentPeriodEnd) })
				} : {
					tone: "emerald",
					text: t("pro.account.stateActiveNoDate")
				};
			}
			if (ent.state === "expired" || lic && !lic.entitled) return {
				tone: "rose",
				text: t("pro.account.stateExpired")
			};
			if (ent.state === "revalidationRequired" || ent.state === "invalid" || lic) return {
				tone: "amber",
				text: t("pro.account.stateNeedsSync")
			};
			return {
				tone: "neutral",
				text: t("pro.account.stateNoPlan")
			};
		});
		function handleOutcome(outcome, successText) {
			if (!outcome) return;
			if (outcome.deviceLimit) deviceLimit = outcome.deviceLimit;
			else showToast(successText, "success");
		}
		async function runProSync() {
			proBusy = true;
			try {
				handleOutcome(await syncPro(), t("pro.account.synced"));
			} catch (err) {
				showToast(proErrorMessage(err), "error");
			} finally {
				proBusy = false;
			}
		}
		async function handleProSignedIn() {
			showProLogin = false;
			await refreshProStatus();
			await runProSync();
		}
		const LABEL = `block text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase mb-1`;
		const INPUT = "w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-sky-500";
		const EYE_BUTTON = "absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors p-1";
		let billing = "monthly";
		const proFeatures = derived(() => [
			t("settings.subscription.featureSync", { devices: PRO_PRICING.syncDevices }),
			t("settings.subscription.featureAi", { requests: PRO_PRICING.aiRequestsPerMonth }),
			t("settings.subscription.featureTeam", {
				extra: PRO_PRICING.maxMembers - 1,
				members: PRO_PRICING.maxMembers
			}),
			t("settings.subscription.featureLogs"),
			t("settings.subscription.featureCommunity")
		]);
		const TABS = [
			"profile",
			"updates",
			"ai",
			"subscription",
			"security",
			"backup",
			"performance",
			"shortcuts"
		];
		const requestedTab = (_page$url$searchParam = page.url.searchParams.get("tab")) !== null && _page$url$searchParam !== void 0 ? _page$url$searchParam : "";
		let activeTab = TABS.includes(requestedTab) ? requestedTab : "profile";
		const visibleTabs = derived(() => TABS.filter((tab) => {
			var _pro$status2;
			return tab !== "subscription" || ((_pro$status2 = pro.status) === null || _pro$status2 === void 0 ? void 0 : _pro$status2.signedIn);
		}));
		const updater = getUpdater();
		const downloadPercent = derived(() => updater.progress.total ? Math.round(updater.progress.downloaded / updater.progress.total * 100) : null);
		const profile = getProfile();
		const appearance = getAppearance();
		let profileName = profile.name;
		let profileAvatar = profile.avatar;
		const profileDirty = derived(() => profileName.trim() !== profile.name || profileAvatar !== profile.avatar);
		let currentPassword = "";
		let newPassword = "";
		let confirmPassword = "";
		let showPasswords = false;
		let isChangingPassword = false;
		let maxAuditRecords = 1e3;
		let gpuAcceleration = false;
		let backgroundMemorySaving = true;
		let scrollbackLines = 5e3;
		let inactiveSessionSleep = true;
		let lowPowerMode = false;
		let isSavingPerformance = false;
		async function saveAllPerformancePrefs(partial, isGpuChange = false) {
			var _partial$gpuAccelerat, _partial$backgroundMe, _partial$scrollbackLi, _partial$inactiveSess, _partial$lowPowerMode;
			isSavingPerformance = true;
			const updated = {
				gpuAcceleration: (_partial$gpuAccelerat = partial.gpuAcceleration) !== null && _partial$gpuAccelerat !== void 0 ? _partial$gpuAccelerat : gpuAcceleration,
				backgroundMemorySaving: (_partial$backgroundMe = partial.backgroundMemorySaving) !== null && _partial$backgroundMe !== void 0 ? _partial$backgroundMe : backgroundMemorySaving,
				scrollbackLines: (_partial$scrollbackLi = partial.scrollbackLines) !== null && _partial$scrollbackLi !== void 0 ? _partial$scrollbackLi : scrollbackLines,
				inactiveSessionSleep: (_partial$inactiveSess = partial.inactiveSessionSleep) !== null && _partial$inactiveSess !== void 0 ? _partial$inactiveSess : inactiveSessionSleep,
				lowPowerMode: (_partial$lowPowerMode = partial.lowPowerMode) !== null && _partial$lowPowerMode !== void 0 ? _partial$lowPowerMode : lowPowerMode
			};
			try {
				await setPerformancePrefs(updated);
				gpuAcceleration = updated.gpuAcceleration;
				backgroundMemorySaving = updated.backgroundMemorySaving;
				scrollbackLines = updated.scrollbackLines;
				inactiveSessionSleep = updated.inactiveSessionSleep;
				lowPowerMode = updated.lowPowerMode;
				if (!isGpuChange) showToast(t("settings.performance.saved"), "success");
			} catch (err) {
				showToast(t("settings.performance.saveFailed", { error: errorText(err) }), "error");
				return;
			} finally {
				isSavingPerformance = false;
			}
			if (isGpuChange) {
				if (await confirmModal(t("settings.performance.restartBody"), t("settings.performance.restartTitle"), false, t("settings.performance.restartNow"), t("settings.performance.later"))) await relaunch();
			}
		}
		let backupPassphrase = "";
		let restorePassphrase = "";
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="max-w-5xl mx-auto space-y-6">`);
			PageHeader($$renderer, {
				icon: ["M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"],
				accent: "cyan",
				title: t("settings.title"),
				subtitle: t("settings.subtitle")
			});
			$$renderer.push(`<!----> <div class="border-b border-neutral-200 dark:border-neutral-800 flex gap-4 overflow-x-auto" role="tablist"><!--[-->`);
			const each_array = ensure_array_like(visibleTabs());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let tab = each_array[$$index];
				$$renderer.push(`<button role="tab"${attr("aria-selected", activeTab === tab)}${attr_class(`pb-3 whitespace-nowrap text-sm font-medium transition-colors border-b-2 ${activeTab === tab ? "border-sky-500 text-neutral-900 dark:text-white font-semibold" : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"}`)}>${escape_html(t(`settings.tabs.${tab}`))}</button>`);
			}
			$$renderer.push(`<!--]--></div> `);
			if (activeTab === "profile") {
				$$renderer.push(`<!--[0--><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm dark:shadow-none text-neutral-900 dark:text-white space-y-6"><div class="flex items-center gap-4">`);
				ProfileAvatar($$renderer, {
					avatar: profileAvatar,
					name: profileName,
					size: 56,
					pro: profile.plan === "pro"
				});
				$$renderer.push(`<!----> <div class="min-w-0"><div class="flex items-center gap-2"><h2 class="text-lg font-semibold text-neutral-900 dark:text-white truncate">${escape_html(profileName.trim() || profile.name)}</h2> <span class="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 uppercase">${escape_html(profile.plan === "pro" ? t("profileMenu.planPro") : t("profileMenu.planFree"))}</span></div> <p class="text-neutral-500 dark:text-neutral-400 text-sm">${escape_html(t("settings.profile.localNote"))}</p></div></div> <form class="space-y-5 max-w-md"><div><label for="profile-name"${attr_class(clsx(LABEL))}>${escape_html(t("settings.profile.displayName"))}</label> <input id="profile-name" type="text" maxlength="48"${attr("value", profileName)} placeholder="User"${attr_class(clsx(INPUT))}/></div> <div><span class="block text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase mb-2">${escape_html(t("settings.profile.picture"))}</span> `);
				AvatarPicker($$renderer, {
					size: 40,
					get value() {
						return profileAvatar;
					},
					set value($$value) {
						profileAvatar = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div> <button type="submit"${attr("disabled", !profileDirty(), true)} class="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:hover:bg-sky-600 text-white text-sm font-medium rounded-md transition-colors shadow-sm">${escape_html(t("settings.profile.save"))}</button></form> <div class="pt-5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4"><div><p class="text-sm font-medium text-neutral-900 dark:text-white">${escape_html(t("settings.profile.masterPassword"))}</p> <p class="text-xs text-neutral-500 dark:text-neutral-400">${escape_html(t("settings.profile.masterPasswordBody"))}</p></div> <button class="px-3 py-1.5 text-xs font-medium rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">${escape_html(t("settings.profile.changeMasterPassword"))}</button></div></div> `);
				AmbientSettingsCard($$renderer, {
					defaultAccent: "#64748b",
					appName: "CAFramework"
				});
				$$renderer.push(`<!---->`);
			} else if (activeTab === "updates") {
				$$renderer.push(`<!--[1--><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm dark:shadow-none text-neutral-900 dark:text-white space-y-4"><div class="flex flex-wrap justify-between items-center gap-4"><div><h2 class="text-lg font-semibold text-neutral-900 dark:text-white">${escape_html(t("settings.updates.title"))}</h2> <p class="text-neutral-500 dark:text-neutral-400 text-sm">${escape_html(t("settings.updates.current"))} <span class="font-mono text-sky-600 dark:text-sky-400">v${escape_html(APP_VERSION)}</span></p></div> `);
				if (updater.status === "available") $$renderer.push(`<!--[0--><button class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-md transition-colors shadow-sm">${escape_html(t("settings.updates.install"))}</button>`);
				else {
					$$renderer.push(`<!--[-1--><button${attr("disabled", updater.status === "checking" || updater.status === "downloading", true)} class="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-white text-sm font-medium rounded-md transition-colors flex items-center gap-2 shadow-sm">`);
					if (updater.status === "checking") $$renderer.push(`<!--[0--><svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>${escape_html(t("settings.updates.checking"))}`);
					else $$renderer.push(`<!--[-1-->${escape_html(t("settings.updates.check"))}`);
					$$renderer.push(`<!--]--></button>`);
				}
				$$renderer.push(`<!--]--></div> `);
				if (updater.status === "up-to-date") $$renderer.push(`<!--[0--><div class="flex items-center gap-2 p-3 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-sm"><svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${escape_html(t("settings.updates.latest", { version: APP_VERSION }))}</div>`);
				else if (updater.status === "available") $$renderer.push(`<!--[1--><div class="p-3 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-sm">${escape_html(t("settings.updates.available", { version: updater.version }))} <a${attr("href", releaseNotesUrl(updater.version))} class="underline underline-offset-2 hover:text-sky-900 dark:hover:text-white">${escape_html(t("settings.updates.readChangelog"))}</a></div>`);
				else if (updater.status === "downloading") $$renderer.push(`<!--[2--><div class="p-3 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-sm">${escape_html(t("settings.updates.downloading", {
					version: updater.version,
					progress: downloadPercent() === null ? "..." : ` (${downloadPercent()}%)`
				}))}</div>`);
				else if (updater.status === "error") $$renderer.push(`<!--[3--><div class="p-3 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-sm">${escape_html(updater.error)}</div>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			} else if (activeTab === "ai") {
				$$renderer.push(`<!--[2--><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm dark:shadow-none text-neutral-900 dark:text-white space-y-4"><div><h2 class="text-lg font-semibold text-neutral-900 dark:text-white">${escape_html(t("settings.ai.title"))}</h2> <p class="text-neutral-500 dark:text-neutral-400 text-sm">${escape_html(t("settings.ai.subtitle"))}</p></div> `);
				AiSettingsForm($$renderer, {});
				$$renderer.push(`<!----></div>`);
			} else if (activeTab === "subscription") {
				var _pro$status3, _pro$status4;
				$$renderer.push(`<!--[3--><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm dark:shadow-none text-neutral-900 dark:text-white space-y-6"><div><h2 class="text-lg font-semibold text-neutral-900 dark:text-white">${escape_html(t("settings.subscription.title"))}</h2> <p class="text-neutral-500 dark:text-neutral-400 text-sm mt-1">${escape_html(t("settings.subscription.subtitle"))}</p></div> <div class="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-neutral-50 dark:bg-neutral-950 space-y-3">`);
				if (!((_pro$status3 = pro.status) === null || _pro$status3 === void 0 ? void 0 : _pro$status3.signedIn)) $$renderer.push(`<!--[0--><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><p class="text-sm font-semibold text-neutral-900 dark:text-white">${escape_html(t("pro.account.title"))}</p> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">${escape_html(t("pro.account.signedOutBody"))}</p></div> <button type="button" class="px-4 py-2 rounded-md text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition-colors shrink-0">${escape_html(t("pro.account.signInOrRegister"))}</button></div>`);
				else {
					var _pro$status$account, _pro$status$account2, _pro$status$account3;
					$$renderer.push(`<!--[-1--><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div class="min-w-0"><p class="text-sm font-semibold text-neutral-900 dark:text-white truncate">${escape_html(((_pro$status$account = pro.status.account) === null || _pro$status$account === void 0 ? void 0 : _pro$status$account.name) || ((_pro$status$account2 = pro.status.account) === null || _pro$status$account2 === void 0 ? void 0 : _pro$status$account2.email))}</p> <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">${escape_html((_pro$status$account3 = pro.status.account) === null || _pro$status$account3 === void 0 ? void 0 : _pro$status$account3.email)}</p> `);
					if (proState()) $$renderer.push(`<!--[0--><span${attr_class(`inline-block mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${stringify(TONE[proState().tone])}`)}>${escape_html(proState().text)}</span>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2 shrink-0"><button type="button"${attr("disabled", proBusy || pro.syncing, true)}${attr_class(clsx(SMALL_BUTTON))}>${escape_html(pro.syncing ? t("pro.account.syncing") : t("pro.account.sync"))}</button> <button type="button"${attr_class(clsx(SMALL_BUTTON))}>${escape_html(t("pro.account.devices"))}</button> <button type="button" class="px-3 py-1.5 text-xs font-medium rounded-md border border-rose-300 dark:border-rose-900 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors">${escape_html(t("pro.account.signOut"))}</button></div></div> `);
					if (pro.status.lastSyncAt) $$renderer.push(`<!--[0--><p class="text-[11px] text-neutral-500">${escape_html(t("pro.account.lastSync", { time: formatProTime(pro.status.lastSyncAt) }))}</p>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> `);
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]-->`);
				}
				$$renderer.push(`<!--]--></div> `);
				if (((_pro$status4 = pro.status) === null || _pro$status4 === void 0 ? void 0 : _pro$status4.signedIn) && !pro.status.pending) {
					$$renderer.push("<!--[0-->");
					ProTeamPanel($$renderer, { onOutcome: handleOutcome });
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (pro.isPro) {
					var _pro$status5, _pro$status6, _pro$status7, _pro$status8;
					$$renderer.push(`<!--[0--><div class="rounded-xl border border-sky-500/40 bg-linear-to-br from-sky-500/10 via-neutral-50 dark:via-neutral-900/60 to-transparent p-6 space-y-5"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800"><div><div class="flex items-center gap-2"><span class="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">Current Plan</span> <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">ACTIVE</span></div> <h3 class="text-xl font-bold text-neutral-900 dark:text-white mt-1">${escape_html(((_pro$status5 = pro.status) === null || _pro$status5 === void 0 || (_pro$status5 = _pro$status5.license) === null || _pro$status5 === void 0 || (_pro$status5 = _pro$status5.plan) === null || _pro$status5 === void 0 ? void 0 : _pro$status5.toUpperCase()) === "LIFETIME" ? "CATerm Pro — Founder Lifetime" : "CATerm Pro Edition")}</h3> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Zero-knowledge encrypted cloud synchronization &amp; AI Copilot active.</p></div> <div class="text-right sm:text-right shrink-0"><span class="text-2xl font-black text-neutral-900 dark:text-white">${escape_html(((_pro$status6 = pro.status) === null || _pro$status6 === void 0 || (_pro$status6 = _pro$status6.license) === null || _pro$status6 === void 0 || (_pro$status6 = _pro$status6.plan) === null || _pro$status6 === void 0 ? void 0 : _pro$status6.toUpperCase()) === "LIFETIME" ? "Lifetime Access" : "$6.00 / mo")}</span> <p class="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">${escape_html(((_pro$status7 = pro.status) === null || _pro$status7 === void 0 || (_pro$status7 = _pro$status7.license) === null || _pro$status7 === void 0 || (_pro$status7 = _pro$status7.plan) === null || _pro$status7 === void 0 ? void 0 : _pro$status7.toUpperCase()) === "LIFETIME" ? "Never Expires · VIP Founder Tier" : "Next billing cycle synced")}</p></div></div> <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"><div class="bg-white/60 dark:bg-neutral-950/60 rounded-lg p-3 border border-neutral-200 dark:border-neutral-800/80"><span class="text-neutral-500 dark:text-neutral-400 block text-[11px]">Customer Account</span> <span class="font-semibold text-neutral-900 dark:text-white block mt-0.5 truncate">${escape_html(((_pro$status8 = pro.status) === null || _pro$status8 === void 0 || (_pro$status8 = _pro$status8.account) === null || _pro$status8 === void 0 ? void 0 : _pro$status8.email) || "Registered User")}</span></div> <div class="bg-white/60 dark:bg-neutral-950/60 rounded-lg p-3 border border-neutral-200 dark:border-neutral-800/80"><span class="text-neutral-500 dark:text-neutral-400 block text-[11px]">Device Seats</span> <span class="font-semibold text-neutral-900 dark:text-white block mt-0.5">${escape_html(1)} / ${escape_html(5)} Devices Used</span></div> <div class="bg-white/60 dark:bg-neutral-950/60 rounded-lg p-3 border border-neutral-200 dark:border-neutral-800/80"><span class="text-neutral-500 dark:text-neutral-400 block text-[11px]">License Signature</span> <span class="font-mono text-neutral-900 dark:text-white block mt-0.5 truncate">Ed25519 v1 (Verified Offline)</span></div></div> <div class="pt-2"><p class="text-xs font-semibold text-neutral-900 dark:text-white mb-2">Entitlements &amp; Included Features:</p> <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 dark:text-neutral-300"><div class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>End-to-end encrypted cloud sync</span></div> <div class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>AI Ops Copilot &amp; Prompt Studio</span></div> <div class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>Team Session &amp; Tag Sharing</span></div> <div class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>Multi-Platform License (Desktop &amp; Android)</span></div></div></div></div>`);
				} else {
					var _pro$status9, _pro$status10;
					$$renderer.push(`<!--[-1--><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start"><div class="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-neutral-50 dark:bg-neutral-950 space-y-2"><div class="flex items-center gap-2"><span class="font-semibold text-neutral-900 dark:text-white">${escape_html(t("settings.subscription.freePlan"))}</span> <span class="text-xs bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded">${escape_html(t("settings.subscription.current"))}</span></div> <div class="text-2xl font-bold text-neutral-900 dark:text-white">$0</div> <p class="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">${escape_html(t("settings.subscription.freeBody"))}</p></div> <div class="rounded-lg border-2 border-sky-500/50 bg-sky-50/60 dark:bg-sky-950/20 p-5 space-y-4"><div class="flex items-center justify-between gap-2 flex-wrap"><span class="font-semibold text-neutral-900 dark:text-white">${escape_html(t("settings.subscription.proPlan"))}</span> <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">${escape_html(t("settings.subscription.introBadge", {
						percent: PRO_PRICING.introDiscountPercent,
						months: PRO_PRICING.introMonths
					}))}</span></div> <div class="inline-flex p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs" role="group"><!--[-->`);
					const each_array_2 = ensure_array_like(["monthly", "yearly"]);
					for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
						let interval = each_array_2[$$index_2];
						$$renderer.push(`<button type="button"${attr("aria-pressed", billing === interval)}${attr_class(`px-3 py-1 rounded-md font-medium transition-colors ${billing === interval ? "bg-sky-600 text-white" : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"}`)}>${escape_html(t(`settings.subscription.${interval}`))} `);
						if (interval === "yearly") $$renderer.push(`<!--[0--><span${attr_class(`ml-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400`)}>${escape_html(t("settings.subscription.saveYearly", { percent: PRO_PRICING.yearlyDiscountPercent }))}</span>`);
						else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--></button>`);
					}
					$$renderer.push(`<!--]--></div> <div><div class="flex items-baseline gap-2"><span class="text-sm text-neutral-400 line-through">${escape_html(formatUsd(PRO_PRICING[billing].list))}</span> <span class="text-3xl font-bold text-neutral-900 dark:text-white">${escape_html(formatUsd(PRO_PRICING[billing].intro))}</span> <span class="text-sm text-neutral-500">${escape_html(t("settings.subscription.perMonth"))}</span></div> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">`);
					$$renderer.push(`<!--[0-->${escape_html(t("settings.subscription.monthlyThen", {
						months: PRO_PRICING.introMonths,
						price: formatUsd(PRO_PRICING.monthly.list)
					}))}`);
					$$renderer.push(`<!--]--></p></div> <ul class="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300"><!--[-->`);
					const each_array_3 = ensure_array_like(proFeatures());
					for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
						let feature = each_array_3[$$index_3];
						$$renderer.push(`<li class="flex items-start gap-2"><svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>${escape_html(feature)}</span></li>`);
					}
					$$renderer.push(`<!--]--></ul> <div class="flex flex-col sm:flex-row gap-2">`);
					if (pro.serverAvailable === false) $$renderer.push(`<!--[0--><button disabled="" class="flex-1 px-4 py-2 rounded-md text-sm font-semibold border border-sky-500/40 text-sky-700/70 dark:text-sky-300/70 cursor-not-allowed"${attr("title", t("settings.subscription.comingSoon"))}>${escape_html(t("settings.subscription.startTrial", { days: PRO_PRICING.trialDays }))} <span class="block text-[10px] font-normal">${escape_html(t("settings.subscription.comingSoon"))}</span></button>`);
					else if (!((_pro$status9 = pro.status) === null || _pro$status9 === void 0 ? void 0 : _pro$status9.license)) $$renderer.push(`<!--[1--><button type="button"${attr("disabled", proBusy, true)} class="flex-1 px-4 py-2 rounded-md text-sm font-semibold border border-sky-500/60 text-sky-700 dark:text-sky-300 hover:bg-sky-500/10 disabled:opacity-50 transition-colors">${escape_html(t("settings.subscription.startTrial", { days: PRO_PRICING.trialDays }))}</button>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> <button type="button" class="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition-colors">${escape_html(t("settings.subscription.subscribe"))} <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></button></div> <p class="text-[11px] text-neutral-500">${escape_html(t("settings.subscription.trialNote"))}</p> `);
					if ((_pro$status10 = pro.status) === null || _pro$status10 === void 0 ? void 0 : _pro$status10.signedIn) $$renderer.push(`<!--[0--><p class="text-[11px] text-neutral-500">${escape_html(t("pro.account.checkoutHint"))}</p>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div></div>`);
				}
				$$renderer.push(`<!--]--> <div class="pt-4 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between gap-4"><div><p class="text-xs text-neutral-800 dark:text-neutral-300 font-medium">${escape_html(t("settings.subscription.supportTitle"))}</p> <p class="text-[11px] text-neutral-500">${escape_html(t("settings.subscription.supportBody"))}</p></div> <a${attr("href", KOFI_URL)} target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2 bg-[#ff5e5b] hover:bg-[#e54d4a] text-white text-xs font-semibold rounded-lg transition-colors shrink-0"><span>${escape_html(t("contribution.donateVia"))}</span></a></div></div>`);
			} else if (activeTab === "security") $$renderer.push(`<!--[4--><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm dark:shadow-none text-neutral-900 dark:text-white space-y-4"><h2 class="text-lg font-semibold text-neutral-900 dark:text-white">${escape_html(t("settings.security.title"))}</h2> <p class="text-neutral-500 dark:text-neutral-400 text-sm">${escape_html(t("settings.security.subtitle"))}</p> <form class="max-w-md space-y-4 pt-2"><p class="text-xs text-neutral-500 dark:text-neutral-400">${escape_html(t("settings.security.rekeyNote"))}</p> <div><label for="current-pass"${attr_class(clsx(LABEL))}>${escape_html(t("settings.security.current"))}</label> <input id="current-pass"${attr("type", "password")} required="" autocomplete="current-password"${attr("value", currentPassword)}${attr_class(clsx(INPUT))}/></div> <div><label for="new-pass"${attr_class(clsx(LABEL))}>${escape_html(t("settings.security.new", { min: 8 }))}</label> <input id="new-pass"${attr("type", "password")} required=""${attr("minlength", 8)} autocomplete="new-password"${attr("value", newPassword)}${attr_class(clsx(INPUT))}/></div> <div><label for="confirm-pass"${attr_class(clsx(LABEL))}>${escape_html(t("settings.security.confirm"))}</label> <input id="confirm-pass"${attr("type", "password")} required=""${attr("minlength", 8)} autocomplete="new-password"${attr("value", confirmPassword)}${attr_class(clsx(INPUT))}/></div> <label class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400"><input type="checkbox"${attr("checked", showPasswords, true)} class="rounded"/> ${escape_html(t("settings.security.showPasswords"))}</label> <button type="submit"${attr("disabled", isChangingPassword, true)} class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white text-sm font-medium rounded-md transition-colors">${escape_html(t("settings.security.change"))}</button></form> <div class="border-t border-neutral-200 dark:border-neutral-800 pt-6 space-y-3"><div><h3 class="text-base font-semibold text-neutral-900 dark:text-white">${escape_html(t("settings.audit.title"))}</h3> <p class="text-neutral-500 dark:text-neutral-400 text-xs mt-1">${escape_html(t("settings.audit.body"))}</p></div> <form class="flex items-end gap-4 max-w-sm"><div class="flex-1"><label for="max-audit"${attr_class(clsx(LABEL))}>${escape_html(t("settings.audit.maxRecords"))}</label> <input id="max-audit" type="number" min="100" max="50000" step="100"${attr("value", maxAuditRecords)}${attr_class(clsx(INPUT))}/></div> <button type="submit" class="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium rounded-md transition-colors whitespace-nowrap">${escape_html(t("common.save"))}</button></form></div></div>`);
			else if (activeTab === "backup") {
				$$renderer.push(`<!--[5--><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm dark:shadow-none text-neutral-900 dark:text-white space-y-8"><div><h2 class="text-lg font-semibold text-neutral-900 dark:text-white">${escape_html(t("settings.backup.title"))}</h2> <p class="text-neutral-500 dark:text-neutral-400 text-sm mt-1">${escape_html(t("settings.backup.subtitle"))}</p></div> <div class="space-y-4"><h3 class="text-base font-semibold text-neutral-900 dark:text-white">${escape_html(t("settings.backup.exportTitle"))}</h3> <p class="text-xs text-neutral-500 dark:text-neutral-400">${escape_html(t("settings.backup.exportBody"))}</p> <form class="max-w-md space-y-4 pt-2"><div><label for="backup-pass"${attr_class(clsx(LABEL))}>${escape_html(t("settings.backup.exportPassphrase"))}</label> <div class="relative"><input id="backup-pass"${attr("type", "password")} minlength="8" required=""${attr("value", backupPassphrase)} class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-sky-500 pr-10"/> <button type="button"${attr_class(clsx(EYE_BUTTON))}${attr("aria-label", t("settings.backup.showPassphrase"))}${attr("title", t("settings.backup.showPassphrase"))}>`);
				$$renderer.push(`<!--[-1--><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`);
				$$renderer.push(`<!--]--></button></div></div> `);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <button type="submit" class="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium rounded-md transition-colors">${escape_html(t("settings.backup.exportButton"))}</button></form></div> <hr class="border-neutral-200 dark:border-neutral-800"/> <div class="space-y-4"><h3 class="text-base font-semibold text-neutral-900 dark:text-white">${escape_html(t("settings.backup.restoreTitle"))}</h3> <p class="text-xs text-neutral-500 dark:text-neutral-400">${escape_html(t("settings.backup.restoreBody"))}</p> <form class="max-w-md space-y-4 pt-2"><div><label for="restore-pass"${attr_class(clsx(LABEL))}>${escape_html(t("settings.backup.restorePassphrase"))}</label> <div class="relative"><input id="restore-pass"${attr("type", "password")} required=""${attr("value", restorePassphrase)} class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-sky-500 pr-10"/> <button type="button"${attr_class(clsx(EYE_BUTTON))}${attr("aria-label", t("settings.backup.showPassphrase"))}${attr("title", t("settings.backup.showPassphrase"))}>`);
				$$renderer.push(`<!--[-1--><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`);
				$$renderer.push(`<!--]--></button></div></div> `);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <button type="submit" class="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-md transition-colors">${escape_html(t("settings.backup.restoreButton"))}</button></form></div></div>`);
			} else if (activeTab === "performance") {
				$$renderer.push(`<!--[6--><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm dark:shadow-none text-neutral-900 dark:text-white space-y-6"><div><h2 class="text-lg font-semibold text-neutral-900 dark:text-white">${escape_html(t("settings.performance.title"))}</h2> <p class="text-neutral-500 dark:text-neutral-400 text-sm mt-1">${escape_html(t("settings.performance.subtitle"))}</p></div> <div class="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-neutral-50 dark:bg-neutral-950 flex items-start justify-between gap-4"><div class="min-w-0"><p class="text-sm font-medium text-neutral-900 dark:text-white">${escape_html(t("settings.performance.backgroundTitle"))}</p> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">${escape_html(t("settings.performance.backgroundBody"))}</p> <p class="text-[11px] text-neutral-500 mt-2">${escape_html(t("settings.performance.recommended"))}</p></div> <button type="button" role="switch"${attr("aria-checked", backgroundMemorySaving)}${attr("aria-label", t("settings.performance.backgroundTitle"))}${attr("disabled", isSavingPerformance, true)}${attr_class(`relative shrink-0 w-11 h-6 rounded-full transition-colors disabled:opacity-50 ${backgroundMemorySaving ? "bg-sky-600" : "bg-neutral-300 dark:bg-neutral-700"} cursor-pointer`)}><span${attr_class(`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${backgroundMemorySaving ? "translate-x-5" : ""}`)}></span></button></div> <div class="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-neutral-50 dark:bg-neutral-950 flex items-start justify-between gap-4"><div class="min-w-0"><p class="text-sm font-medium text-neutral-900 dark:text-white">${escape_html(t("settings.performance.gpuTitle"))}</p> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">${escape_html(t("settings.performance.gpuBody"))}</p> <p class="text-[11px] text-neutral-500 mt-2">${escape_html(t("settings.performance.recommendedGpuOff"))} · ${escape_html(t("settings.performance.restartNote"))}</p></div> <button type="button" role="switch"${attr("aria-checked", gpuAcceleration)}${attr("aria-label", t("settings.performance.gpuTitle"))}${attr("disabled", isSavingPerformance, true)}${attr_class(`relative shrink-0 w-11 h-6 rounded-full transition-colors disabled:opacity-50 ${gpuAcceleration ? "bg-sky-600" : "bg-neutral-300 dark:bg-neutral-700"} cursor-pointer`)}><span${attr_class(`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${gpuAcceleration ? "translate-x-5" : ""}`)}></span></button></div> <div class="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-neutral-50 dark:bg-neutral-950 flex items-start justify-between gap-4"><div class="min-w-0"><p class="text-sm font-medium text-neutral-900 dark:text-white">${escape_html(t("settings.performance.scrollbackTitle"))}</p> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">${escape_html(t("settings.performance.scrollbackBody"))}</p></div> `);
				$$renderer.select({
					value: scrollbackLines,
					disabled: isSavingPerformance,
					onchange: (e) => saveAllPerformancePrefs({ scrollbackLines: parseInt(e.currentTarget.value, 10) }),
					class: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-sky-500 shrink-0 cursor-pointer"
				}, ($$renderer) => {
					$$renderer.option({ value: 1e3 }, ($$renderer) => {
						$$renderer.push(`${escape_html(t("settings.performance.scrollback1k"))}`);
					});
					$$renderer.option({ value: 5e3 }, ($$renderer) => {
						$$renderer.push(`${escape_html(t("settings.performance.scrollback5k"))}`);
					});
					$$renderer.option({ value: 1e4 }, ($$renderer) => {
						$$renderer.push(`${escape_html(t("settings.performance.scrollback10k"))}`);
					});
					$$renderer.option({ value: 5e4 }, ($$renderer) => {
						$$renderer.push(`${escape_html(t("settings.performance.scrollback50k"))}`);
					});
				});
				$$renderer.push(`</div> <div class="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-neutral-50 dark:bg-neutral-950 flex items-start justify-between gap-4"><div class="min-w-0"><p class="text-sm font-medium text-neutral-900 dark:text-white">${escape_html(t("settings.performance.sleepTitle"))}</p> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">${escape_html(t("settings.performance.sleepBody"))}</p> <p class="text-[11px] text-neutral-500 mt-2">${escape_html(t("settings.performance.recommended"))}</p></div> <button type="button" role="switch"${attr("aria-checked", inactiveSessionSleep)}${attr("aria-label", t("settings.performance.sleepTitle"))}${attr("disabled", isSavingPerformance, true)}${attr_class(`relative shrink-0 w-11 h-6 rounded-full transition-colors disabled:opacity-50 ${inactiveSessionSleep ? "bg-sky-600" : "bg-neutral-300 dark:bg-neutral-700"} cursor-pointer`)}><span${attr_class(`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${inactiveSessionSleep ? "translate-x-5" : ""}`)}></span></button></div> <div class="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-neutral-50 dark:bg-neutral-950 flex items-start justify-between gap-4"><div class="min-w-0"><p class="text-sm font-medium text-neutral-900 dark:text-white">${escape_html(t("settings.performance.lowPowerTitle"))}</p> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">${escape_html(t("settings.performance.lowPowerBody"))}</p></div> <button type="button" role="switch"${attr("aria-checked", lowPowerMode)}${attr("aria-label", t("settings.performance.lowPowerTitle"))}${attr("disabled", isSavingPerformance, true)}${attr_class(`relative shrink-0 w-11 h-6 rounded-full transition-colors disabled:opacity-50 ${lowPowerMode ? "bg-sky-600" : "bg-neutral-300 dark:bg-neutral-700"} cursor-pointer`)}><span${attr_class(`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${lowPowerMode ? "translate-x-5" : ""}`)}></span></button></div> <div class="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-neutral-50 dark:bg-neutral-950 flex items-start justify-between gap-4"><div class="min-w-0"><p class="text-sm font-medium text-neutral-900 dark:text-white">${escape_html(t("settings.performance.lockAnimationTitle"))}</p> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">${escape_html(t("settings.performance.lockAnimationBody"))}</p></div> <button type="button" role="switch"${attr("aria-checked", !appearance.reduceMotion)}${attr("aria-label", t("settings.performance.lockAnimationTitle"))}${attr_class(`relative shrink-0 w-11 h-6 rounded-full transition-colors ${!appearance.reduceMotion ? "bg-sky-600" : "bg-neutral-300 dark:bg-neutral-700"} cursor-pointer`)}><span${attr_class(`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${!appearance.reduceMotion ? "translate-x-5" : ""}`)}></span></button></div></div>`);
			} else if (activeTab === "shortcuts") {
				$$renderer.push(`<!--[7--><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm dark:shadow-none text-neutral-900 dark:text-white space-y-6"><div><h2 class="text-lg font-semibold text-neutral-900 dark:text-white">${escape_html(t("settings.shortcuts.title"))}</h2> <p class="text-neutral-500 dark:text-neutral-400 text-sm mt-1">${escape_html(t("settings.shortcuts.subtitle"))}</p></div> <div class="space-y-4"><!--[-->`);
				const each_array_4 = ensure_array_like(SHORTCUT_GROUPS);
				for (let gi = 0, $$length = each_array_4.length; gi < $$length; gi++) {
					let group = each_array_4[gi];
					$$renderer.push(`<h3${attr_class(`text-sm font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider ${gi > 0 ? "pt-2" : ""}`)}>${escape_html(t(`settings.shortcuts.${group.title}`))}</h3> <div class="space-y-2"><!--[-->`);
					const each_array_5 = ensure_array_like(group.items);
					for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
						let item = each_array_5[$$index_5];
						$$renderer.push(`<div class="flex justify-between items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md"><span class="text-sm text-neutral-800 dark:text-neutral-200">${escape_html(t(`settings.shortcuts.${item.label}`, item.vars))}</span> <span class="flex flex-wrap justify-end items-center gap-1.5 text-xs text-neutral-500"><!--[-->`);
						const each_array_6 = ensure_array_like(item.keys);
						for (let ci = 0, $$length = each_array_6.length; ci < $$length; ci++) {
							let combo = each_array_6[ci];
							if (ci > 0) $$renderer.push(`<!--[0--><span>${escape_html(t("settings.shortcuts.or"))}</span>`);
							else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--> <kbd class="px-2 py-1 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded font-mono whitespace-nowrap">${escape_html(combo.join(" + "))}</kbd>`);
						}
						$$renderer.push(`<!--]--></span></div>`);
					}
					$$renderer.push(`<!--]--></div>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (showProLogin) {
				$$renderer.push(`<!--[0--><div class="fixed inset-0 z-[100] bg-black/40 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"><div class="relative bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"><button type="button" class="absolute top-3 right-3 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"${attr("aria-label", t("common.close"))}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button> `);
				ProLoginForm($$renderer, { onSignedIn: handleProSignedIn });
				$$renderer.push(`<!----></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (deviceLimit) {
				$$renderer.push(`<!--[0--><div class="fixed inset-0 z-[100] bg-black/40 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4"><div><h3 class="text-base font-bold text-neutral-900 dark:text-white">${escape_html(t("pro.devices.limitTitle"))}</h3> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">${escape_html(t("pro.devices.limitBody", { count: deviceLimit.limit }))}</p> `);
				if (deviceLimit.limit < PRO_PRICING.syncDevices) $$renderer.push(`<!--[0--><p class="text-xs text-sky-700 dark:text-sky-300 mt-2">${escape_html(t("pro.devices.limitUpsell", { count: PRO_PRICING.syncDevices }))} <button type="button" class="font-semibold underline">${escape_html(t("pro.devices.seePlans"))}</button></p>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <ul class="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-md"><!--[-->`);
				const each_array_7 = ensure_array_like(deviceLimit.devices);
				for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
					let device = each_array_7[$$index_7];
					$$renderer.push(`<li class="flex items-center justify-between gap-3 px-3 py-2 text-xs"><div class="min-w-0"><p class="font-medium text-neutral-900 dark:text-white truncate">${escape_html(device.name)}</p> <p class="text-neutral-500 truncate">${escape_html(device.os)} · ${escape_html(t("pro.devices.lastSeen", { time: formatProTime(device.lastSeenAt) }))}</p></div> <button type="button" class="text-rose-600 dark:text-rose-400 hover:underline shrink-0">${escape_html(t("pro.devices.remove"))}</button></li>`);
				}
				$$renderer.push(`<!--]--></ul> <div class="flex justify-end"><button type="button"${attr_class(clsx(SMALL_BUTTON))}>${escape_html(t("common.close"))}</button></div></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
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
