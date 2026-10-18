import { S as escape_html, _ as stringify, a as attr_class, b as attr, c as bind_props, d as ensure_array_like, kt as fallback, l as derived, n as onDestroy, o as attr_style } from "../../chunks/index-server.js";
import "../../chunks/commands.js";
import { C as getAppearance, T as lockVault, _ as getProfile, a as APP_NAME, d as releaseNotesUrl, h as getAmbientStore, i as ProLoginForm, l as REPO_URL, m as ProfileAvatar, o as APP_VERSION, p as AVATARS, r as getUpdater, s as AUTHOR_URL, u as WEBSITE_URL, v as getPro } from "../../chunks/ai.js";
import { a as LOCALES, c as t, n as getConfirmDialog, o as getLocale, r as getToasts } from "../../chunks/uiNotifications.svelte.js";
import { n as goto, t as page } from "../../chunks/state.js";
import "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
//#region src/lib/components/Logo.svelte
function Logo($$renderer, $$props) {
	let size = fallback($$props["size"], 28);
	let mode = fallback($$props["mode"], "brand");
	let className = fallback($$props["className"], "");
	$$renderer.push(`<svg${attr("width", size)}${attr("height", size)} viewBox="0 0 512 512"${attr_class(`shrink-0 ${stringify(className)}`)} xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cafLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#06B6D4"></stop><stop offset="100%" stop-color="#6366F1"></stop></linearGradient></defs><g fill="none"><path d="M256 104 L386 179 L386 329 L256 404 L126 329 L126 179 Z"${attr("stroke", mode === "white" ? "#FFFFFF" : mode === "light" ? "#0A0A0C" : "url(#cafLogoGrad)")} stroke-width="28" stroke-linejoin="round" stroke-linecap="round"></path><path d="M256 254 L256 104"${attr("stroke", mode === "white" ? "#FFFFFF" : mode === "light" ? "#0A0A0C" : "#06B6D4")} stroke-width="28" stroke-linecap="round"></path><path d="M256 254 L386 329"${attr("stroke", mode === "white" ? "#FFFFFF" : mode === "light" ? "#0A0A0C" : "#6366F1")} stroke-width="28" stroke-linecap="round"></path><path d="M256 254 L126 329"${attr("stroke", mode === "white" ? "#FFFFFF" : mode === "light" ? "#0A0A0C" : "#06B6D4")} stroke-width="28" stroke-linecap="round"></path></g></svg>`);
	bind_props($$props, {
		size,
		mode,
		className
	});
}
//#endregion
//#region src/lib/components/GridFlowBackground.svelte
function GridFlowBackground($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const appearance = getAppearance();
		let { targetX = 64, targetY = 64, count = 5 } = $$props;
		onDestroy(() => {});
		if (appearance.reduceMotion) $$renderer.push(`<!--[0--><div class="absolute inset-0 pointer-events-none w-full h-full z-0"${attr_style(`background: radial-gradient(circle at ${stringify(targetX)}px ${stringify(targetY)}px, rgba(56,189,248,0.12), transparent 55%)`)} aria-hidden="true"></div>`);
		else $$renderer.push(`<!--[-1--><canvas class="absolute inset-0 pointer-events-none w-full h-full z-0" aria-hidden="true"></canvas>`);
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/components/LanguageSwitcher.svelte
function LanguageSwitcher($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const current = derived(getLocale);
		$$renderer.push(`<div class="flex items-center p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-800" role="group"${attr("aria-label", t("language.label"))}><!--[-->`);
		const each_array = ensure_array_like(LOCALES);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let loc = each_array[$$index];
			$$renderer.push(`<button${attr("aria-pressed", current() === loc.code)}${attr_class(`px-1.5 py-1 rounded-md text-[10px] font-bold tracking-wide transition-colors ${current() === loc.code ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`)}${attr("title", t(`language.${loc.code}`))}${attr("aria-label", t(`language.${loc.code}`))}>${escape_html(loc.code.toUpperCase())}</button>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
var state$1 = { name: "dark" };
function getTheme() {
	return state$1;
}
//#endregion
//#region src/lib/components/LockScreen.svelte
function LockScreen($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { onUnlocked } = $$props;
		const theme = getTheme();
		let password = "";
		let lockoutRemainingSeconds = 0;
		const isLockedOut = derived(() => false);
		function formatTime(seconds) {
			const m = Math.floor(seconds / 60);
			const s = seconds % 60;
			return `${m}:${s < 10 ? "0" : ""}${s}`;
		}
		let loginMode = "vault";
		let proAccount = null;
		function handleProSignedIn(account) {
			proAccount = account;
			loginMode = "vault";
		}
		const profile = getProfile();
		const isProUser = derived(() => {
			var _AVATARS$find;
			return profile.plan === "pro" || Boolean((_AVATARS$find = AVATARS.find((a) => a.id === profile.avatar)) === null || _AVATARS$find === void 0 ? void 0 : _AVATARS$find.pro) || Boolean(proAccount) || profile.name.toLowerCase().includes("cecep");
		});
		typeof window !== "undefined" && Boolean(window.__TAURI_INTERNALS__ || window.__TAURI__) && getCurrentWindow();
		let currentQuote = [
			{
				key: "torvalds",
				author: "Linus Torvalds"
			},
			{
				key: "jobs",
				author: "Steve Jobs"
			},
			{
				key: "hopper",
				author: "Grace Hopper"
			},
			{
				key: "dijkstra",
				author: "Edsger W. Dijkstra"
			},
			{
				key: "beck",
				author: "Kent Beck"
			}
		][0];
		onDestroy(() => {});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div data-tauri-drag-region="" class="fixed inset-0 z-50 flex bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-white select-none cursor-default"><div class="absolute top-0 right-0 z-20 flex items-center gap-1.5 p-3 sm:p-4 no-drag">`);
			LanguageSwitcher($$renderer, {});
			$$renderer.push(`<!----> <div class="flex items-center p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-800" role="group"${attr("aria-label", t("shell.theme"))}><button${attr("aria-pressed", theme.name !== "dark")}${attr_class(`p-1 rounded-md transition-colors ${theme.name !== "dark" ? "bg-white text-amber-500 shadow-sm" : "hover:text-neutral-900 dark:hover:text-white"}`)}${attr("title", t("shell.lightTheme"))}${attr("aria-label", t("shell.lightTheme"))}><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></button> <button${attr("aria-pressed", theme.name === "dark")}${attr_class(`p-1 rounded-md transition-colors ${theme.name === "dark" ? "bg-neutral-800 text-white" : "hover:text-neutral-900"}`)}${attr("title", t("shell.darkTheme"))}${attr("aria-label", t("shell.darkTheme"))}><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg></button></div> <div class="flex items-center gap-0.5 ml-1 border-l border-neutral-200 dark:border-neutral-800 pl-2"><button class="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer rounded"${attr("title", t("lock.minimize"))}${attr("aria-label", t("lock.minimize"))}><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></button> <button class="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer rounded"${attr("title", t("lock.maximize"))}${attr("aria-label", t("lock.maximize"))}><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2"></rect></svg></button> <button class="p-1.5 hover:bg-rose-600 hover:text-white text-neutral-500 dark:text-neutral-400 transition-colors cursor-pointer rounded"${attr("title", t("lock.close"))}${attr("aria-label", t("lock.close"))}><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div> <div data-tauri-drag-region="" class="hidden lg:flex w-2/3 flex-col justify-between p-12 lg:p-16 xl:p-20 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800/60 relative overflow-hidden shrink-0">`);
			GridFlowBackground($$renderer, {
				targetX: 64,
				targetY: 64,
				count: 5
			});
			$$renderer.push(`<!----> <div class="relative z-10 flex items-center gap-3">`);
			Logo($$renderer, {
				size: 40,
				mode: "brand"
			});
			$$renderer.push(`<!----> <div><h1 class="text-xl font-bold tracking-wider text-neutral-900 dark:text-white">CATerm <span class="text-xs px-2 py-0.5 rounded bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-400 border border-sky-500/30">v${escape_html(APP_VERSION)}</span></h1> <p class="text-xs text-neutral-500 dark:text-neutral-400">${escape_html(t("lock.tagline"))}</p></div></div> <div class="relative z-10 my-auto max-w-2xl xl:max-w-3xl"><div class="mb-4 text-sky-500 dark:text-sky-400"><svg class="w-8 h-8 opacity-60" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path></svg></div> <blockquote class="text-2xl xl:text-3xl font-light text-neutral-700 dark:text-neutral-200 leading-relaxed italic">"${escape_html(t(`lock.quotes.${currentQuote.key}`))}"</blockquote> <p class="mt-4 text-sm font-semibold text-sky-600 dark:text-sky-400">— ${escape_html(currentQuote.author)}</p> <div class="mt-8 p-5 rounded-xl bg-neutral-50/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-2"><div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium"><svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> ${escape_html(t("lock.zkTitle"))}</div> <p>${escape_html(t("lock.zkBody"))}</p></div></div> <div class="relative z-10 flex items-center justify-between text-xs text-neutral-500"><span>${escape_html(t("lock.zkIdentity"))}</span> <span class="font-mono text-neutral-400 dark:text-neutral-600">v${escape_html(APP_VERSION)}</span></div></div> <div data-tauri-drag-region="" class="w-full lg:w-1/3 flex flex-col justify-center items-center p-6 sm:p-10 xl:p-12 bg-neutral-50 dark:bg-[#0a0a0a] relative z-10 shrink-0"><div class="w-full max-w-sm space-y-8 no-drag"><div class="text-center">`);
			$$renderer.push(`<!--[-1--><div class="flex justify-center mb-4">`);
			ProfileAvatar($$renderer, {
				avatar: profile.avatar,
				name: profile.name,
				size: 68,
				pro: isProUser()
			});
			$$renderer.push(`<!----></div> <div class="flex items-center justify-center gap-2"><h2 class="text-2xl font-bold text-neutral-900 dark:text-white">${escape_html(t("lock.welcomeBack", { name: profile.name }))}</h2> `);
			if (isProUser()) $$renderer.push(`<!--[0--><span class="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider bg-amber-400 dark:bg-amber-500 text-neutral-950 shadow-xs border border-white dark:border-neutral-900">PRO</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
			$$renderer.push(`<!--]--> <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">`);
			if (isProUser()) $$renderer.push(`<!--[0--><span class="text-sky-600 dark:text-sky-400 font-semibold">Founder Lifetime Edition</span> ·`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> ${escape_html(t("lock.localIdentity"))} <span class="text-emerald-600 dark:text-emerald-400 font-mono">${escape_html(t("lock.encrypted"))}</span></p></div> <div class="grid grid-cols-2 p-1 rounded-lg bg-neutral-200/60 dark:bg-neutral-900 text-xs font-semibold" role="tablist"><button type="button" role="tab"${attr("aria-selected", loginMode === "vault")}${attr_class(`py-1.5 rounded-md transition-colors ${loginMode === "vault" ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`)}>${escape_html(t("pro.lock.vaultTab"))}</button> <button type="button" role="tab"${attr("aria-selected", loginMode === "pro")}${attr_class(`py-1.5 rounded-md transition-colors ${loginMode === "pro" ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`)}>${escape_html(t("pro.lock.proTab"))}</button></div> `);
			if (proAccount && loginMode === "vault") $$renderer.push(`<!--[0--><div class="p-3 text-xs rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-800 dark:text-sky-300 text-center">${escape_html(t("pro.lock.signedInAs", { email: proAccount.email }))}</div>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (loginMode === "vault") {
				$$renderer.push("<!--[0-->");
				if (isLockedOut()) $$renderer.push(`<!--[0--><div class="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-3 animate-in fade-in zoom-in-95 duration-200 shadow-xl"><div class="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div> <div><h3 class="text-base font-bold text-rose-600 dark:text-rose-400">${escape_html(t("lock.tooManyAttemptsTitle"))}</h3> <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-1">${escape_html(t("lock.tooManyAttemptsBody"))}</p></div> <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-300 font-mono text-xl font-bold tracking-widest shadow-inner"><svg class="w-4 h-4 animate-spin text-rose-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> <span>${escape_html(formatTime(lockoutRemainingSeconds))}</span></div></div>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="space-y-4">`);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div><label for="master-password" class="block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">${escape_html(t("lock.masterPassword"))}</label> <div class="relative"><input id="master-password"${attr("type", "password")}${attr("value", password)}${attr("disabled", isLockedOut(), true)} placeholder="••••••••••••" class="w-full pl-4 pr-11 py-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"/> <button type="button"${attr("disabled", isLockedOut(), true)} class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors p-1 disabled:opacity-30"${attr("aria-label", t("lock.showPassword"))}${attr("title", t("lock.showPassword"))}>`);
				$$renderer.push(`<!--[-1--><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`);
				$$renderer.push(`<!--]--></button></div></div> <button${attr("disabled", isLockedOut(), true)} class="w-full py-3 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer">`);
				if (isLockedOut()) $$renderer.push(`<!--[1-->${escape_html(formatTime(lockoutRemainingSeconds))}`);
				else $$renderer.push(`<!--[-1-->${escape_html(t("lock.unlockVault"))}`);
				$$renderer.push(`<!--]--></button></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				ProLoginForm($$renderer, { onSignedIn: handleProSignedIn });
			}
			$$renderer.push(`<!--]--> <div class="flex items-center justify-between text-xs text-neutral-500 pt-4 border-t border-neutral-200 dark:border-neutral-900">`);
			$$renderer.push(`<!--[0--><button class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer">${escape_html(t("lock.resetVault"))}</button>`);
			$$renderer.push(`<!--]--> <span>${escape_html(t("lock.vaultEncrypted"))}</span></div></div></div></div>`);
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
//#region src/lib/components/UpdateToast.svelte
function UpdateToast($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const updater = getUpdater();
		const percent = derived(() => updater.progress.total ? Math.min(100, Math.round(updater.progress.downloaded / updater.progress.total * 100)) : null);
		if (updater.showToast) {
			$$renderer.push(`<!--[0--><div role="status" class="no-drag pointer-events-auto w-[340px] max-w-[calc(100vw-2.5rem)] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md shadow-2xl p-3.5"><div class="flex items-start gap-3"><svg class="w-5 h-5 mt-0.5 shrink-0 text-neutral-900 dark:text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 9a1 1 0 112 0v5a1 1 0 11-2 0v-5zm1-4a1.25 1.25 0 100 2.5A1.25 1.25 0 0012 7z" clip-rule="evenodd"></path></svg> <div class="flex-1 min-w-0"><p class="text-sm font-semibold text-neutral-900 dark:text-white">${escape_html(t("updater.available", { version: updater.version }))}</p> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">${escape_html(t("updater.readyBody", { version: updater.version }))} <a${attr("href", releaseNotesUrl(updater.version))} class="underline underline-offset-2 hover:text-neutral-900 dark:hover:text-white">${escape_html(t("updater.changelog"))}</a></p></div> `);
			if (updater.status !== "downloading") $$renderer.push(`<!--[0--><button type="button" class="p-1 -mt-1 -mr-1 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"${attr("aria-label", t("updater.dismiss"))}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="mt-3 flex items-center justify-end gap-2">`);
			if (updater.status === "downloading") $$renderer.push(`<!--[0--><div class="flex-1 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden"><div${attr_class(`h-full bg-sky-500 transition-all ${percent() === null ? "w-1/3 animate-pulse" : ""}`)}${attr_style(percent() === null ? "" : `width: ${percent()}%`)}></div></div> <span class="text-[11px] font-mono text-neutral-500 w-10 text-right">${escape_html(percent() === null ? "…" : `${percent()}%`)}</span>`);
			else $$renderer.push(`<!--[-1--><button type="button" class="px-3 py-1.5 rounded-md text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors">${escape_html(t("updater.installRestart"))}</button>`);
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/components/NotificationCenter.svelte
function NotificationCenter($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const toasts = derived(getToasts);
		const confirm = derived(getConfirmDialog);
		$$renderer.push(`<div class="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none"><!--[-->`);
		const each_array = ensure_array_like(toasts());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let toast = each_array[$$index];
			$$renderer.push(`<div${attr_class(`pointer-events-auto p-4 rounded-xl shadow-2xl border text-sm flex items-start gap-3 backdrop-blur-md transition-all duration-300 transform translate-y-0 ${toast.type === "success" ? "bg-white/95 dark:bg-neutral-900/95 border-emerald-500/40" : toast.type === "error" ? "bg-white/95 dark:bg-neutral-900/95 border-rose-500/40" : "bg-white/95 dark:bg-neutral-900/95 border-sky-500/40"}`)}><div class="shrink-0 mt-0.5">`);
			if (toast.type === "success") $$renderer.push(`<!--[0--><svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`);
			else if (toast.type === "error") $$renderer.push(`<!--[1--><svg class="w-4 h-4 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
			else $$renderer.push(`<!--[-1--><svg class="w-4 h-4 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
			$$renderer.push(`<!--]--></div> <div class="flex-1 text-xs leading-relaxed text-neutral-700 dark:text-neutral-200">${escape_html(toast.message)}</div> <button class="shrink-0 text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300 p-0.5 rounded transition-colors"${attr("aria-label", t("notify.closeNotification"))}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
		}
		$$renderer.push(`<!--]--> `);
		UpdateToast($$renderer, {});
		$$renderer.push(`<!----></div> `);
		if (confirm().isOpen) {
			$$renderer.push(`<!--[0--><div class="fixed inset-0 z-[99999] bg-black/40 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"><div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"><div class="flex items-center gap-3"><div${attr_class(`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${confirm().danger ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20" : "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20"}`)}>`);
			if (confirm().danger) $$renderer.push(`<!--[0--><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`);
			else $$renderer.push(`<!--[-1--><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
			$$renderer.push(`<!--]--></div> <div><h3 class="font-bold text-neutral-900 dark:text-white text-base">${escape_html(confirm().title)}</h3></div></div> <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pl-13">${escape_html(confirm().message)}</p> <div class="flex justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800"><button class="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-medium transition-colors">${escape_html(confirm().cancelText)}</button> <button${attr_class(`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${confirm().danger ? "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20" : "bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20"}`)}>${escape_html(confirm().confirmText)}</button></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/components/AiChatPanel.svelte
function AiChatPanel($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { onClose } = $$props;
		let messages = [{
			role: "assistant",
			content: "Halo! Saya asisten AI CAFramework. Ada yang bisa saya bantu dengan aplikasi, navigasi, atau konfigurasi data Anda?"
		}];
		let draft = "";
		let proposedSteps = [];
		let acceptedSteps = [];
		let runs = [];
		let isExecuting = false;
		function cleanMessageContent(content) {
			return content.replace(/\n?\[Active UI Context:[^\]]*\]/g, "").trim();
		}
		{
			$$renderer.push(`<!--[-1--><aside${attr_class(`fixed z-50 flex flex-col bg-neutral-900/95 backdrop-blur-xl border border-neutral-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden transition-all duration-200 bottom-4 right-4 w-[390px] h-[520px] max-h-[calc(100vh-4.5rem-env(safe-area-inset-top,0px))]`)} aria-label="Asisten AI CAFramework"><header class="px-4 py-3 border-b border-neutral-800/80 bg-neutral-950/60 flex items-center justify-between select-none shrink-0"><div class="flex items-center gap-2 min-w-0"><div class="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50 shrink-0"></div> <div class="min-w-0"><h3 class="text-xs font-bold text-white tracking-wide truncate">Asisten AI Copilot</h3></div></div> <div class="flex items-center gap-1 shrink-0"><button type="button" class="p-1 text-neutral-400 hover:text-amber-400 rounded-lg hover:bg-neutral-800 transition-colors" title="Bersihkan riwayat percakapan" aria-label="Bersihkan Chat"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button> <button type="button" class="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors" title="Kecilkan ke pojok" aria-label="Kecilkan"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg></button> <button type="button" class="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"${attr("title", "Mode Layar Penuh")} aria-label="Ubah Ukuran"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">`);
			$$renderer.push(`<!--[-1--><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"></path>`);
			$$renderer.push(`<!--]--></svg></button> <button type="button" class="p-1 text-neutral-400 hover:text-rose-400 rounded-lg hover:bg-neutral-800 transition-colors" title="Tutup Panel AI" aria-label="Tutup"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></header> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed"><!--[-->`);
			const each_array = ensure_array_like(messages);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let msg = each_array[$$index];
				$$renderer.push(`<div${attr_class(`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`)}><div${attr_class(`max-w-[88%] rounded-2xl px-3.5 py-2.5 ${msg.role === "user" ? "bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20" : "bg-neutral-800/90 text-neutral-200 rounded-bl-none border border-neutral-700/60"}`)}>${escape_html(cleanMessageContent(msg.content))}</div></div>`);
			}
			$$renderer.push(`<!--]--> `);
			if (proposedSteps.length > 0) {
				$$renderer.push(`<!--[0--><div class="p-3 bg-neutral-950/80 border border-neutral-700/80 rounded-xl space-y-2 mt-2"><div class="flex items-center justify-between text-[11px] font-semibold text-neutral-300"><span>Rencana Tindakan (${escape_html(proposedSteps.length)} langkah)</span> <button${attr("disabled", isExecuting, true)} class="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm">${escape_html("Jalankan Semua")}</button></div> <div class="space-y-1.5"><!--[-->`);
				const each_array_1 = ensure_array_like(proposedSteps);
				for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
					var _runs$i;
					let step = each_array_1[i];
					$$renderer.push(`<div class="flex items-start gap-2 p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px]"><input type="checkbox"${attr("checked", acceptedSteps[i], true)} class="mt-0.5 rounded border-neutral-700 text-indigo-600 focus:ring-0"/> <div class="flex-1 min-w-0"><div class="font-medium text-neutral-200">${escape_html(step.title)}</div> `);
					if (step.description) $$renderer.push(`<!--[0--><div class="text-neutral-400 text-[10px]">${escape_html(step.description)}</div>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> `);
					if ((_runs$i = runs[i]) === null || _runs$i === void 0 ? void 0 : _runs$i.output) $$renderer.push(`<!--[0--><div class="mt-1 text-[10px] text-emerald-400 font-mono bg-neutral-950 p-1 rounded">${escape_html(runs[i].output)}</div>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div></div>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="p-3 border-t border-neutral-800/80 bg-neutral-950/80 shrink-0"><form class="flex gap-2"><input type="text"${attr("value", draft)} placeholder="Tanyakan sesuatu atau berikan perintah..." class="flex-1 px-3.5 py-2 bg-neutral-900 border border-neutral-700/70 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"/> <button type="submit"${attr("disabled", !draft.trim(), true)} class="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/20 shrink-0">Kirim</button></form></div></aside>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/stores/aiChat.svelte.ts
var state = { open: false };
function getAiChatState() {
	return state;
}
function toggleAiChat() {
	state.open = !state.open;
}
function closeAiChat() {
	state.open = false;
}
//#endregion
//#region src/lib/components/FeedbackModal.svelte
function FeedbackModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { onClose, onSubmitted } = $$props;
		let rating = 5;
		let name = "";
		let profession = "";
		let content = "";
		let isSubmitting = false;
		function ratingLabel(stars) {
			return stars >= 1 && stars <= 5 ? t(`feedback.rating.${stars}`) : "";
		}
		$$renderer.push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4"><button type="button" class="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm cursor-default"${attr("aria-label", t("feedback.closeDialog"))}></button> <div role="dialog" aria-modal="true" aria-labelledby="feedback-dialog-title" class="no-drag relative w-full max-w-lg rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] shadow-2xl p-6 text-left space-y-4 text-neutral-900 dark:text-neutral-100"><button type="button" class="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"${attr("aria-label", t("common.close"))}${attr("title", t("common.close"))}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button> <div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg></div> <div><h2 id="feedback-dialog-title" class="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">${escape_html(t("feedback.title"))}</h2> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">${escape_html(t("feedback.subtitle"))}</p></div></div> `);
		{
			$$renderer.push(`<!--[-1--><form class="space-y-4 pt-1"><div class="space-y-1.5"><label for="feedback-stars-modal" class="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">${escape_html(t("feedback.ratingLabel"))}</label> <div id="feedback-stars-modal" class="flex items-center gap-2"><div class="flex items-center gap-1" role="radiogroup"${attr("aria-label", t("feedback.starRating"))}><!--[-->`);
			const each_array = ensure_array_like([
				1,
				2,
				3,
				4,
				5
			]);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let star = each_array[$$index];
				$$renderer.push(`<button type="button" role="radio"${attr("aria-checked", rating === star)}${attr("aria-label", t("feedback.starsOutOf", { count: star }))} class="p-1 text-neutral-300 dark:text-neutral-700 hover:scale-110 transition-transform focus:outline-none focus:ring-1 focus:ring-sky-500 rounded cursor-pointer"><svg${attr_class(`w-7 h-7 transition-colors ${rating >= star ? "text-amber-400 fill-amber-400" : "text-neutral-300 dark:text-neutral-700"}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg></button>`);
			}
			$$renderer.push(`<!--]--></div> <span class="text-xs font-medium text-neutral-600 dark:text-neutral-400 ml-2">${escape_html(ratingLabel(rating))}</span></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><div class="space-y-1.5"><label for="feedback-name-modal" class="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">${escape_html(t("feedback.nameLabel"))} <span class="text-neutral-400 font-normal normal-case">${escape_html(t("feedback.optional"))}</span></label> <input id="feedback-name-modal" type="text"${attr("value", name)} maxlength="100"${attr("placeholder", t("feedback.namePlaceholder"))} class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-sky-500"/></div> <div class="space-y-1.5"><label for="feedback-profession-modal" class="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">${escape_html(t("feedback.activityLabel"))} <span class="text-neutral-400 font-normal normal-case">${escape_html(t("feedback.optional"))}</span></label> <input id="feedback-profession-modal" type="text"${attr("value", profession)} maxlength="100"${attr("placeholder", t("feedback.activityPlaceholder"))} class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-sky-500"/></div></div> <div class="space-y-1.5"><label for="feedback-content-modal" class="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">${escape_html(t("feedback.messageLabel"))} <span class="text-neutral-400 font-normal normal-case">${escape_html(t("feedback.optional"))}</span></label> <textarea id="feedback-content-modal" rows="4" maxlength="2000"${attr("placeholder", t("feedback.messagePlaceholder"))} class="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-sky-500 resize-y">`);
			const $$body = escape_html(content);
			if ($$body) $$renderer.push(`${$$body}`);
			$$renderer.push(`</textarea> <div class="flex justify-between items-center text-[11px] text-neutral-500 dark:text-neutral-400"><span>${escape_html(t("feedback.maxChars"))}</span> <span>${escape_html(0)} / 2000</span></div></div> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="p-2.5 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-lg text-[11px] text-neutral-500 dark:text-neutral-400 flex items-start gap-2"><svg class="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <p>${escape_html(t("feedback.moderationNote"))}</p></div> <div class="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800"><button type="button" class="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer">${escape_html(t("common.cancel"))}</button> <button type="submit"${attr("disabled", isSubmitting, true)} class="px-5 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-sm">`);
			$$renderer.push(`<!--[-1--><span>${escape_html(t("feedback.send"))}</span>`);
			$$renderer.push(`<!--]--></button></div></form>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
//#region src/lib/components/CrashReportModal.svelte
function CrashReportModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { report, onClose } = $$props;
		let neverAgain = false;
		let isDeleting = false;
		let sent = false;
		$$renderer.push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4"><button type="button" class="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm cursor-default"${attr("aria-label", t("crash.closeDialog"))}></button> <div role="dialog" aria-modal="true" aria-labelledby="crash-dialog-title" class="no-drag relative w-full max-w-lg rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] shadow-2xl p-6 text-left space-y-4 text-neutral-900 dark:text-neutral-100"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div> <div><h2 id="crash-dialog-title" class="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">${escape_html(t("crash.title"))}</h2> <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">${escape_html(t("crash.subtitle"))}</p></div></div> <div class="p-3 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-lg space-y-1"><p class="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">${escape_html(t("crash.whatHappened"))}</p> <p class="text-sm text-neutral-800 dark:text-neutral-200 break-words">${escape_html(report.message)}</p> `);
		if (report.location) $$renderer.push(`<!--[0--><p class="text-xs text-neutral-500 dark:text-neutral-400">${escape_html(t("crash.location", { location: report.location }))}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div><button type="button" class="text-xs text-sky-600 dark:text-sky-400 hover:underline font-medium transition-colors cursor-pointer">${escape_html(t("crash.viewDetails"))}</button> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <label class="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer"><input type="checkbox"${attr("checked", neverAgain, true)} class="rounded border-neutral-300 dark:border-neutral-700"/> ${escape_html(t("crash.neverAskAgain"))}</label> <div class="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800"><button type="button"${attr("disabled", isDeleting, true)} class="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed">${escape_html(t("crash.deleteAndClose"))}</button> <button type="button"${attr("disabled", sent, true)} class="px-5 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-sm">`);
		$$renderer.push(`<!--[-1--><span>${escape_html(t("crash.send"))}</span>`);
		$$renderer.push(`<!--]--></button></div></div></div>`);
	});
}
//#endregion
//#region src/lib/components/AboutModal.svelte
function AboutModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { onClose } = $$props;
		$$renderer.push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4"><button type="button" class="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"${attr("aria-label", t("about.closeDialog"))}></button> <div role="dialog" aria-modal="true" aria-labelledby="about-title" class="no-drag relative w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] shadow-2xl p-6 text-center"><button type="button" class="absolute top-3 right-3 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"${attr("aria-label", t("common.close"))}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button> <div class="flex justify-center mb-3">`);
		Logo($$renderer, {
			size: 48,
			mode: "brand"
		});
		$$renderer.push(`<!----></div> <h2 id="about-title" class="text-lg font-bold text-neutral-900 dark:text-white">CATerm</h2> <p class="mt-1 text-xs font-mono text-sky-600 dark:text-sky-400">v${escape_html(APP_VERSION)}</p> <p class="mt-3 text-sm text-neutral-500 dark:text-neutral-400">${escape_html(t("about.tagline"))}</p> <dl class="mt-5 text-xs text-left divide-y divide-neutral-100 dark:divide-neutral-800 border-y border-neutral-100 dark:border-neutral-800"><div class="flex justify-between py-2"><dt class="text-neutral-500">${escape_html(t("about.license"))}</dt> <dd class="text-neutral-900 dark:text-neutral-200 font-medium">MIT</dd></div> <div class="flex justify-between py-2"><dt class="text-neutral-500">${escape_html(t("about.website"))}</dt> <dd><a${attr("href", WEBSITE_URL)} target="_blank" rel="noreferrer" class="text-sky-600 dark:text-sky-400 hover:underline font-mono">caterm.fathforce.com</a></dd></div> <div class="flex justify-between py-2"><dt class="text-neutral-500">${escape_html(t("about.source"))}</dt> <dd><a${attr("href", REPO_URL)} target="_blank" rel="noreferrer" class="text-sky-600 dark:text-sky-400 hover:underline font-mono">cecepazhar/caterm</a></dd></div> <div class="flex justify-between py-2"><dt class="text-neutral-500">${escape_html(t("about.builtBy"))}</dt> <dd><a${attr("href", AUTHOR_URL)} target="_blank" rel="noreferrer" class="text-sky-600 dark:text-sky-400 hover:underline font-medium">Cecep Azhar</a></dd></div></dl> <div class="mt-4 p-3 rounded-xl bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/20 dark:border-sky-500/30 text-left"><div class="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1"><svg class="w-3 h-3 text-sky-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg> <span>${escape_html(t("about.dedication"))}</span></div> <p class="text-xs text-neutral-600 dark:text-neutral-300 italic leading-relaxed">${escape_html(t("about.dedicationText"))}</p></div> <div class="mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 flex flex-col items-center justify-center gap-1"><div>${escape_html(t("about.copyright"))} <a${attr("href", AUTHOR_URL)} target="_blank" rel="noreferrer" class="text-neutral-700 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 hover:underline font-medium">Cecep Azhar</a></div> <div class="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500"><span>${escape_html(t("about.builtWithLove"))}</span> <svg class="w-3 h-3 text-rose-500 fill-rose-500 inline-block shrink-0" viewBox="0 0 24 24"${attr("aria-label", t("about.love"))}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg> <span>${escape_html(t("about.fromIndonesia"))}</span> <span class="inline-flex items-center justify-center overflow-hidden rounded-sm border border-neutral-300 dark:border-neutral-700 w-4 h-2.5 shrink-0" title="Indonesia"><svg viewBox="0 0 3 2" class="w-full h-full"><rect width="3" height="1" fill="#e70011"></rect><rect y="1" width="3" height="1" fill="#ffffff"></rect></svg></span></div></div></div></div>`);
	});
}
//#endregion
//#region src/lib/stores/feedbackStore.svelte.ts
var STORAGE_PREFIX = "caframework_feedback_v2";
var showPrompt = false;
function getFeedbackPromptState() {
	return {
		get show() {
			return showPrompt;
		},
		/** Opened on request (profile menu > Report bug), not by the 3rd-session trigger. */
		open() {
			showPrompt = true;
		},
		close() {
			showPrompt = false;
			if (typeof localStorage !== "undefined") {
				localStorage.setItem(`${STORAGE_PREFIX}_shown`, "true");
				localStorage.setItem(`${STORAGE_PREFIX}_dismissed`, "true");
			}
		},
		markSubmitted() {
			showPrompt = false;
			if (typeof localStorage !== "undefined") localStorage.setItem(`${STORAGE_PREFIX}_submitted`, "true");
		}
	};
}
//#endregion
//#region src/lib/components/ProfileMenu.svelte
function ProfileMenu($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { collapsed = false, onLock, onSignOut, onNavigate } = $$props;
		const profile = getProfile();
		let open = false;
		let showAbout = false;
		const planLabel = derived(() => profile.plan === "free" ? t("profileMenu.planFree") : t("profileMenu.planPro"));
		$$renderer.push(`<div class="relative no-drag">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <button type="button" aria-haspopup="menu"${attr("aria-expanded", open)}${attr("title", collapsed ? `${profile.name} · ${planLabel()}` : t("profileMenu.accountMenu"))}${attr_class(`w-full flex items-center rounded-xl border transition-colors ${collapsed ? "justify-center p-1.5 border-transparent" : "gap-2.5 p-2 border-neutral-200 dark:border-neutral-800"} hover:bg-neutral-100 dark:hover:bg-neutral-900`)}><span class="relative shrink-0">`);
		ProfileAvatar($$renderer, {
			avatar: profile.avatar,
			name: profile.name,
			size: collapsed ? 30 : 34,
			pro: profile.plan === "pro"
		});
		$$renderer.push(`<!----> <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0e0e0e]"></span></span> `);
		if (!collapsed) $$renderer.push(`<!--[0--><span class="min-w-0 flex-1 text-left"><span class="flex items-center gap-1.5"><span class="text-[13px] font-semibold text-neutral-900 dark:text-white truncate">${escape_html(profile.name)}</span> <span class="shrink-0 px-1.5 py-px rounded border border-neutral-300 dark:border-neutral-700 text-[9px] font-semibold tracking-wider text-neutral-500 dark:text-neutral-400">${escape_html(planLabel().toUpperCase())}</span></span> <span class="block text-[11px] font-mono text-neutral-500 dark:text-neutral-400 truncate">Local Encryption</span></span> <svg${attr_class(`w-4 h-4 shrink-0 text-neutral-400 transition-transform `)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></button></div> `);
		if (showAbout) {
			$$renderer.push("<!--[0-->");
			AboutModal($$renderer, { onClose: () => showAbout = false });
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/components/HeaderQuickControls.svelte
function HeaderQuickControls($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { layout, showFiles, aiOpen, sessionCount, splitOptions, onSetLayout, onToggleFiles, onToggleAi } = $$props;
		let isOpen = false;
		const theme = getTheme();
		derived(() => theme.name === "dark");
		$$renderer.push(`<div class="relative no-drag"><button type="button"${attr_class(`p-1.5 rounded-md transition-colors flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-neutral-800`)}${attr("title", t("shell.preferencesTitle") || "Preferences & Display Options")} aria-label="Preferences &amp; Display Options"${attr("aria-expanded", isOpen)}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg></button> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/lib/components/WindowControls.svelte
function WindowControls($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div class="flex items-center gap-0.5 no-drag select-none"><button type="button" class="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"${attr("title", t("lock.minimize") || "Minimize")}${attr("aria-label", t("lock.minimize") || "Minimize")}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></button> <button type="button" class="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"${attr("title", t("lock.maximize") || "Maximize")}${attr("aria-label", t("lock.maximize") || "Maximize")}>`);
		$$renderer.push(`<!--[-1--><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2"></rect></svg>`);
		$$renderer.push(`<!--]--></button> <button type="button" class="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-rose-600 transition-colors cursor-pointer"${attr("title", t("lock.close") || "Close")}${attr("aria-label", t("lock.close") || "Close")}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
	});
}
//#endregion
//#region src/lib/components/WorkspaceMenu.svelte
function WorkspaceMenu($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let workspaces = [
			{
				id: "ws-default",
				name: "Default Workspace",
				description: "Primary working area",
				color: "#10b981"
			},
			{
				id: "ws-research",
				name: "Research & Labs",
				description: "Experimental sandbox",
				color: "#06b6d4"
			},
			{
				id: "ws-prod",
				name: "Production Fleet",
				description: "Critical deployments",
				color: "#8b5cf6"
			}
		];
		let activeId = "ws-default";
		const activeWorkspace = derived(() => workspaces.find((w) => w.id === activeId) || workspaces[0]);
		$$renderer.push(`<div class="relative inline-flex items-center no-drag"><button type="button"${attr_class(`p-1.5 rounded-lg border transition-colors flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60`)}${attr("title", `Workspaces: ${activeWorkspace().name}`)}${attr("aria-label", `Workspaces: ${activeWorkspace().name}`)}><svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg></button> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/lib/generated/navItems.generated.ts
var GENERATED_NAV_ITEMS = [
	{
		key: "dashboard",
		label: "Dashboard",
		href: "/dashboard",
		icon: "dashboard",
		description: "Overview metrics, quick actions & executive summary",
		path: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
	},
	{
		key: "notes",
		label: "Notes",
		href: "/",
		icon: "notes",
		description: "Encrypted personal notes vertical slice",
		path: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
	},
	{
		key: "table",
		label: "Table",
		href: "/table",
		icon: "table",
		description: "High-performance data grid, sorting & pagination",
		path: "M3 10h18M3 14h18m-9-4v8m-7 4h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
	},
	{
		key: "form",
		label: "Form",
		href: "/form",
		icon: "form",
		description: "Multi-step data entry, validation & rich input controls",
		path: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
	},
	{
		key: "cards",
		label: "Cards",
		href: "/cards",
		icon: "cards",
		description: "Entity catalog, badge statuses & card views",
		path: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
	},
	{
		key: "analytics",
		label: "Analytics",
		href: "/analytics",
		icon: "analytics",
		description: "Progress bars, telemetry stats & visual indicators",
		path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
	},
	{
		key: "landing",
		label: "Landing",
		href: "/landing",
		icon: "landing",
		description: "Public landing page presentation & features",
		path: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
	},
	{
		key: "blog",
		label: "Blog",
		href: "/blog",
		icon: "blog",
		description: "Technical articles, guides & release announcements",
		path: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
	},
	{
		key: "changelog",
		label: "Changelog",
		href: "/changelog",
		icon: "changelog",
		description: "Release history, roadmap & update notes",
		path: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
	},
	{
		key: "docs",
		label: "Docs",
		href: "/docs",
		icon: "docs",
		description: "Framework & developer documentation",
		path: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
	}
];
//#endregion
//#region src/lib/navItems.ts
function navItems() {
	return GENERATED_NAV_ITEMS.map((item) => ({
		key: item.key,
		href: item.href,
		label: t(`nav.${item.key}`),
		path: item.path
	}));
}
function settingsNavItem() {
	return {
		key: "settings",
		href: "/settings",
		label: t("nav.settings"),
		path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 001.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
	};
}
//#endregion
//#region src/lib/stores/commandPalette.svelte.ts
var palette = {
	open: false,
	mode: "all"
};
function getPalette() {
	return palette;
}
function closePalette() {
	palette.open = false;
}
//#endregion
//#region src/lib/components/CommandPalette.svelte
function CommandPalette($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const palette = getPalette();
		let query = "";
		let selectedIndex = 0;
		const staticCommands = [{
			id: "nav-notes",
			title: "Go to Notes",
			category: "Navigation",
			action: () => {
				goto("/");
				closePalette();
			}
		}, {
			id: "nav-settings",
			title: "Go to Settings",
			category: "Navigation",
			action: () => {
				goto("/settings");
				closePalette();
			}
		}];
		const commands = derived(() => query.trim() === "" ? staticCommands : staticCommands.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase())));
		if (palette.open) {
			$$renderer.push(`<!--[0--><div class="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true" tabindex="-1"><div class="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"><div class="flex items-center px-4 border-b border-neutral-800"><svg class="w-5 h-5 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <input type="text"${attr("value", query)} placeholder="Type a command or search..." class="w-full px-4 py-3.5 bg-transparent text-white placeholder-neutral-500 focus:outline-none text-sm"/></div> <div class="max-h-80 overflow-y-auto p-2">`);
			if (commands().length === 0) $$renderer.push(`<!--[0--><div class="p-4 text-center text-sm text-neutral-500">No matching commands found.</div>`);
			else {
				$$renderer.push(`<!--[-1--><!--[-->`);
				const each_array = ensure_array_like(commands());
				for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
					let cmd = each_array[idx];
					$$renderer.push(`<button${attr_class(`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-colors ${selectedIndex === idx ? "bg-indigo-600 text-white" : "text-neutral-300 hover:bg-neutral-800"}`)}><span>${escape_html(cmd.title)}</span> <span${attr_class(`text-xs px-2 py-0.5 rounded font-mono ${selectedIndex === idx ? "bg-indigo-700 text-indigo-200" : "bg-neutral-800 text-neutral-500"}`)}>${escape_html(cmd.category)}</span></button>`);
				}
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/components/AmbientGlow.svelte
function AmbientGlow($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { defaultAccent = "#64748b" } = $$props;
		const ambient = getAmbientStore();
		const pro = getPro();
		const activeColor = derived(() => {
			if (ambient.config.mode === "app-accent") return defaultAccent;
			if (ambient.config.mode === "solid") return ambient.config.customColor;
			return defaultAccent;
		});
		const isGradientMode = derived(() => ambient.config.mode === "rgb-cycle" || ambient.config.mode === "aurora");
		const glowBoxShadow = derived(() => {
			if (!ambient.config.enabled || !ambient.config.cardGlowEnabled || !pro.isPro) return "none";
			if (isGradientMode()) return "none";
			const blur = ambient.config.blurRadius;
			const spread = Math.round(blur / 4);
			const color = activeColor();
			if (ambient.config.cardGlowStyle === "neon-border") return `-1px -1px 0px 1px ${color}, 0 0 ${Math.max(6, Math.round(blur * .4))}px 1px ${color}, -2px -2px ${blur}px 2px ${color}`;
			return `0 0 ${blur}px ${spread}px ${color}, -3px -3px ${blur * 1.4}px ${spread}px ${color}`;
		});
		const animationDuration = derived(() => `${ambient.config.speedSec}s`);
		if (ambient.config.enabled && ambient.config.cardGlowEnabled && pro.isPro) {
			$$renderer.push(`<!--[0--><div class="pointer-events-none absolute -inset-[2px] rounded-2xl md:rounded-none md:rounded-tl-xl z-0 overflow-visible transition-opacity duration-300 will-change-[filter,opacity] svelte-10g7xrt" aria-hidden="true"${attr_style("", { opacity: ambient.config.intensity })}>`);
			if (ambient.config.cardGlowStyle === "chroma-beam") $$renderer.push(`<!--[0--><div class="relative w-full h-full rounded-2xl md:rounded-none md:rounded-tl-xl overflow-hidden p-[1.5px] svelte-10g7xrt"><div class="absolute -inset-[100%] card-glow-spin svelte-10g7xrt"${attr_style("", {
				"animation-duration": animationDuration(),
				background: isGradientMode() ? "conic-gradient(from 0deg, transparent 0deg, transparent 200deg, #ff0055 240deg, #33cc33 280deg, #0099ff 320deg, #cc00ff 360deg)" : `conic-gradient(from 0deg, transparent 0deg, transparent 240deg, ${activeColor()}88 300deg, ${activeColor()} 360deg)`
			})}></div> <div class="w-full h-full rounded-2xl md:rounded-none md:rounded-tl-xl bg-transparent svelte-10g7xrt"></div></div>`);
			else if (isGradientMode()) $$renderer.push(`<!--[1--><div${attr_class(`w-full h-full rounded-2xl md:rounded-none md:rounded-tl-xl will-change-[filter,transform] ${ambient.config.mode === "rgb-cycle" ? "ambient-rgb-cycle" : "ambient-aurora-wave"} ${ambient.config.effect === "breathing" ? "ambient-breathe" : ""}`, "svelte-10g7xrt")}${attr_style("", {
				filter: `blur(${stringify(ambient.config.cardGlowStyle === "neon-border" ? Math.round(ambient.config.blurRadius * .35) : ambient.config.blurRadius)}px)`,
				"animation-duration": animationDuration()
			})}></div>`);
			else $$renderer.push(`<!--[-1--><div${attr_class(`w-full h-full rounded-2xl md:rounded-none md:rounded-tl-xl will-change-[filter,opacity] ${ambient.config.effect === "breathing" ? "ambient-breathe" : ""} ${ambient.config.effect === "wave" ? "ambient-pulse-slow" : ""}`, "svelte-10g7xrt")}${attr_style("", {
				"box-shadow": glowBoxShadow(),
				"animation-duration": animationDuration()
			})}></div>`);
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/components/BottomNav.svelte
function BottomNav($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { onOpenAll } = $$props;
		const navItems$2 = derived(navItems);
		const primaryItem = derived(() => navItems$2()[0] || {
			key: "notes",
			label: "Notes",
			href: "/",
			path: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
		});
		function isActive(href) {
			if (href === "/") return page.url.pathname === "/";
			return page.url.pathname.startsWith(href);
		}
		$$renderer.push(`<nav${attr("aria-label", t("shell.bottomNav") || "Navigasi Bawah")} class="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 pb-[env(safe-area-inset-bottom,0px)] transition-colors select-none"><div class="h-14 grid grid-cols-5 items-stretch px-1"><a${attr("href", primaryItem().href)}${attr_class(`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${isActive(primaryItem().href) ? "text-sky-600 dark:text-sky-400 font-semibold" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"}`)}><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"${attr("d", primaryItem().path)}></path></svg> <span class="truncate max-w-[56px] leading-none">${escape_html(primaryItem().label)}</span></a> <a href="/settings?tab=security"${attr_class(`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${page.url.pathname === "/settings" && page.url.searchParams.get("tab") === "security" ? "text-sky-600 dark:text-sky-400 font-semibold" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"}`)}><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> <span class="truncate max-w-[56px] leading-none">${escape_html(t("settings.security.title") || "Keamanan")}</span></a> <a href="/settings?tab=ai"${attr_class(`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${page.url.pathname === "/settings" && page.url.searchParams.get("tab") === "ai" ? "text-sky-600 dark:text-sky-400 font-semibold" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"}`)}><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path></svg> <span class="truncate max-w-[56px] leading-none">Hana AI</span></a> <a href="/settings"${attr_class(`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${page.url.pathname === "/settings" && (!page.url.searchParams.get("tab") || page.url.searchParams.get("tab") === "profile") ? "text-sky-600 dark:text-sky-400 font-semibold" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"}`)}><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> <span class="truncate max-w-[56px] leading-none">${escape_html(t("nav.settings") || "Pengaturan")}</span></a> <button type="button" class="flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"${attr("aria-label", t("shell.allMenus") || "Buka Semua Menu")}><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> <span class="truncate max-w-[56px] leading-none">${escape_html(t("shell.allMenus") || "Semua")}</span></button></div></nav>`);
	});
}
//#endregion
//#region src/lib/components/AllMenusSheet.svelte
function AllMenusSheet($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open = false, onClose } = $$props;
		let searchQuery = "";
		const generatedNav = derived(navItems);
		const defaultModules = [
			{
				id: "profile",
				label: "Profil",
				href: "/settings?tab=profile",
				icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
				color: "text-rose-500 bg-rose-500/10"
			},
			{
				id: "security",
				label: "Keamanan Vault",
				href: "/settings?tab=security",
				icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
				color: "text-amber-500 bg-amber-500/10"
			},
			{
				id: "ai",
				label: "Hana AI Copilot",
				href: "/settings?tab=ai",
				icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
				color: "text-purple-500 bg-purple-500/10"
			},
			{
				id: "backup",
				label: "Backup & Pulihkan",
				href: "/settings?tab=backup",
				icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
				color: "text-sky-500 bg-sky-500/10"
			},
			{
				id: "updates",
				label: "Pembaruan",
				href: "/settings?tab=updates",
				icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
				color: "text-emerald-500 bg-emerald-500/10"
			},
			{
				id: "performance",
				label: "Performa",
				href: "/settings?tab=performance",
				icon: "M13 10V3L4 14h7v7l9-11h-7z",
				color: "text-yellow-500 bg-yellow-500/10"
			},
			{
				id: "shortcuts",
				label: "Pintasan Keyboard",
				href: "/settings?tab=shortcuts",
				icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
				color: "text-indigo-500 bg-indigo-500/10"
			},
			{
				id: "ambient",
				label: "Ambient Lighting",
				href: "/settings?tab=profile",
				icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
				color: "text-fuchsia-500 bg-fuchsia-500/10"
			},
			{
				id: "settings",
				label: "Semua Pengaturan",
				href: "/settings",
				icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
				color: "text-zinc-500 bg-zinc-500/10"
			}
		];
		const allModules = derived(() => [...generatedNav().map((n) => ({
			id: n.key,
			label: n.label,
			href: n.href,
			icon: n.path,
			color: "text-cyan-500 bg-cyan-500/10"
		})), ...defaultModules]);
		const filteredModules = derived(() => searchQuery.trim() === "" ? allModules() : allModules().filter((m) => m.label.toLowerCase().includes(searchQuery.trim().toLowerCase())));
		if (open) {
			$$renderer.push(`<!--[0--><div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity md:hidden" tabindex="-1" role="button"${attr("aria-label", t("common.close") || "Tutup")}></div> <div class="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] bg-white dark:bg-[#141414] border-t border-neutral-200 dark:border-neutral-800 rounded-t-3xl shadow-2xl flex flex-col md:hidden pb-[max(1rem,env(safe-area-inset-bottom,0px))] transition-transform transform duration-200 ease-out" role="dialog" aria-modal="true"${attr("aria-label", t("shell.allMenus") || "Semua Menu Modul")}><div class="w-full flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"><div class="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700"></div></div> <div class="px-5 pb-3 pt-1 space-y-3 shrink-0"><div class="flex items-center justify-between"><h2 class="text-base font-bold text-neutral-900 dark:text-white tracking-tight">Semua Menu Modul</h2> <button type="button" class="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"${attr("aria-label", t("common.close") || "Tutup")}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div> <input type="text"${attr("value", searchQuery)}${attr("placeholder", t("common.search") || "Cari modul atau menu...")} class="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-neutral-100 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"/> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div> <div class="px-5 py-2 overflow-y-auto scrollbar-none flex-1 min-h-0">`);
			if (filteredModules().length === 0) $$renderer.push(`<!--[0--><div class="py-10 text-center text-xs text-neutral-500">Modul tidak ditemukan untuk "${escape_html(searchQuery)}"</div>`);
			else {
				$$renderer.push(`<!--[-1--><div class="grid grid-cols-4 gap-3 py-1"><!--[-->`);
				const each_array = ensure_array_like(filteredModules());
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let item = each_array[$$index];
					$$renderer.push(`<button type="button" class="flex flex-col items-center justify-center p-2.5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 active:scale-95 transition-all text-center cursor-pointer group"><div${attr_class(`w-11 h-11 rounded-2xl flex items-center justify-center mb-1.5 shadow-sm ${stringify(item.color)} group-hover:scale-105 transition-transform`)}><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"${attr("d", item.icon)}></path></svg></div> <span class="text-[11px] font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white line-clamp-1 break-all">${escape_html(item.label)}</span></button>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { open });
	});
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let isCollapsed = false;
		let isVaultUnlocked = false;
		let allMenusSheetOpen = false;
		let pendingCrashReport = null;
		const aiChat = getAiChatState();
		const feedbackPrompt = getFeedbackPromptState();
		derived(getToasts);
		const ambient = getAmbientStore();
		const pro = getPro();
		const cardBorderClass = derived(() => {
			if (!ambient.config.enabled || !ambient.config.cardGlowEnabled || !pro.isPro) return "border border-neutral-200 dark:border-neutral-800 md:border-b-0 md:border-r-0";
			if (ambient.config.cardGlowStyle === "neon-border") return "border border-sky-400 dark:border-sky-400 md:border-b-0 md:border-r-0 shadow-[inset_0_0_8px_rgba(56,189,248,0.15)]";
			if (ambient.config.cardGlowStyle === "chroma-beam") return "border border-sky-400/50 dark:border-sky-400/40 md:border-b-0 md:border-r-0";
			return "border border-sky-400/30 dark:border-sky-400/25 md:border-b-0 md:border-r-0";
		});
		const navItems$1 = derived(navItems);
		const settingsItem = derived(settingsNavItem);
		function isActive(href) {
			if (href === "/") return page.url.pathname === "/";
			return page.url.pathname.startsWith(href);
		}
		const currentSection = derived(() => {
			var _find;
			return (_find = [...navItems$1(), settingsItem()].find((item) => isActive(item.href))) !== null && _find !== void 0 ? _find : navItems$1()[0];
		});
		async function handleLock() {
			await lockVault();
			isVaultUnlocked = false;
		}
		function handleAiToggle() {
			toggleAiChat();
		}
		let { children } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			NotificationCenter($$renderer, {});
			$$renderer.push(`<!----> `);
			if (isVaultUnlocked) {
				$$renderer.push("<!--[0-->");
				CommandPalette($$renderer, { onLock: handleLock });
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (!isVaultUnlocked) {
				$$renderer.push("<!--[0-->");
				LockScreen($$renderer, { onUnlocked: () => isVaultUnlocked = true });
			} else {
				$$renderer.push(`<!--[-1--><div class="flex flex-col h-screen bg-neutral-100 dark:bg-[#0e0e0e] text-neutral-800 dark:text-neutral-300 font-sans transition-colors duration-150 pb-[env(safe-area-inset-bottom,0px)] select-none"><header class="min-h-[3rem] h-[calc(3rem+env(safe-area-inset-top,0px))] pt-[env(safe-area-inset-top,0px)] flex items-center gap-1 md:gap-2 pl-2 pr-1 md:pl-3 shrink-0 select-none cursor-default" data-tauri-drag-region=""><div class="flex items-center gap-1 min-w-0 flex-1" data-tauri-drag-region=""><button type="button" class="md:hidden p-1 rounded text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-neutral-800 transition-colors shrink-0" title="Buka Navigasi" aria-label="Buka Navigasi"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button> <div class="flex gap-1 text-xs items-center overflow-x-auto scrollbar-none min-w-0 flex-1" data-tauri-drag-region=""><span class="px-2 py-1 text-xs font-semibold shrink-0 hidden sm:flex items-center gap-1.5 text-neutral-900 dark:text-white" data-tauri-drag-region=""><svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${attr("d", currentSection().path)}></path></svg> ${escape_html(currentSection().label)}</span></div></div> <div class="flex-1 h-full min-w-[20px]" data-tauri-drag-region=""></div> <div class="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 shrink-0" data-tauri-drag-region=""><div class="hidden sm:flex items-center px-1 py-1 shrink-0" title="Zero-Knowledge Encrypted Vault Active"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span></div> `);
				WorkspaceMenu($$renderer, {});
				$$renderer.push(`<!----> `);
				HeaderQuickControls($$renderer, {
					layout: "single",
					showFiles: false,
					aiOpen: aiChat.open,
					sessionCount: 1,
					splitOptions: [],
					onSetLayout: () => {},
					onToggleFiles: () => {},
					onToggleAi: handleAiToggle
				});
				$$renderer.push(`<!----> <button type="button" class="p-1.5 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-neutral-800 rounded-md transition-colors relative" title="Notifikasi" aria-label="Notifikasi"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button> <div class="pl-1 border-l border-neutral-200 dark:border-neutral-800">`);
				WindowControls($$renderer, {});
				$$renderer.push(`<!----></div></div></header> <div class="flex-1 flex overflow-hidden"><aside${attr_class(`hidden md:flex flex-col shrink-0 will-change-[width] w-60`)} aria-label="Sidebar Navigasi"><div${attr_class(`h-14 flex items-center shrink-0 justify-between pl-4 pr-3`)}>`);
				$$renderer.push(`<!--[-1--><div class="flex items-center gap-2 min-w-0">`);
				Logo($$renderer, {
					size: 22,
					mode: "brand"
				});
				$$renderer.push(`<!----> <span class="font-bold text-neutral-900 dark:text-white text-lg tracking-tight truncate">${escape_html(APP_NAME)}</span> <span class="text-[10px] px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 font-mono shrink-0">v${escape_html(APP_VERSION)}</span></div> <button type="button" title="Ciutkan Sidebar" aria-label="Ciutkan Sidebar" class="p-1 rounded-md hover:bg-neutral-200/70 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg></button>`);
				$$renderer.push(`<!--]--></div> <nav class="flex-1 min-h-0 overflow-y-auto scrollbar-none px-2 space-y-0.5 text-sm pt-1"><!--[-->`);
				const each_array = ensure_array_like(navItems$1());
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let item = each_array[$$index];
					$$renderer.push(`<a${attr("href", item.href)}${attr("title", "")}${attr("aria-current", isActive(item.href) ? "page" : void 0)}${attr_class(`relative px-2.5 py-2 rounded-lg flex items-center gap-3 transition-colors overflow-hidden ${isActive(item.href) ? "bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-900 dark:text-white font-medium" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/40 hover:text-neutral-900 dark:hover:text-white"}`)}>`);
					if (isActive(item.href)) $$renderer.push(`<!--[0--><span class="absolute -left-2 top-1.5 bottom-1.5 w-[3px] rounded-r bg-neutral-900 dark:bg-white" aria-hidden="true"></span>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> <div class="w-[20px] h-[20px] flex items-center justify-center shrink-0"><svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"${attr("d", item.path)}></path></svg></div> <span${attr_class(`truncate whitespace-nowrap transition-all duration-150 opacity-100 min-w-0`)}>${escape_html(item.label)}</span></a>`);
				}
				$$renderer.push(`<!--]--></nav> <div class="p-2 space-y-1">`);
				ProfileMenu($$renderer, {
					collapsed: isCollapsed,
					onLock: handleLock,
					onSignOut: () => {}
				});
				$$renderer.push(`<!----></div></aside> <div class="flex-1 min-w-0 flex relative overflow-visible p-2 md:p-0">`);
				AmbientGlow($$renderer, { defaultAccent: "#64748b" });
				$$renderer.push(`<!----> <main${attr_class(`flex-1 min-w-0 flex overflow-hidden relative z-10 bg-white dark:bg-[#161616] ${stringify(cardBorderClass())} rounded-2xl md:rounded-none md:rounded-tl-xl transition-colors duration-150`)}><div class="flex-1 min-w-0 overflow-auto text-neutral-900 dark:text-neutral-100 relative px-4 py-6 md:px-10 md:py-10 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:56px_56px]">`);
				children($$renderer);
				$$renderer.push(`<!----></div> `);
				if (aiChat.open) {
					$$renderer.push("<!--[0-->");
					AiChatPanel($$renderer, { onClose: closeAiChat });
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></main></div></div> `);
				if (!aiChat.open) $$renderer.push(`<!--[0--><button type="button" class="fixed bottom-20 right-4 md:bottom-5 md:right-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 border border-neutral-700/80 shadow-2xl shadow-black/60 hover:scale-105 active:scale-95 transition-all text-xs font-semibold cursor-pointer group" title="Hana AI (CAFramework Assistant)" aria-label="Open Hana AI"><svg class="w-4 h-4 text-rose-500 group-hover:rotate-12 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path></svg> <span>Hana AI</span> <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span></button>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				BottomNav($$renderer, { onOpenAll: () => allMenusSheetOpen = true });
				$$renderer.push(`<!----> `);
				AllMenusSheet($$renderer, {
					onClose: () => allMenusSheetOpen = false,
					get open() {
						return allMenusSheetOpen;
					},
					set open($$value) {
						allMenusSheetOpen = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				if (pendingCrashReport) {
					$$renderer.push("<!--[0-->");
					CrashReportModal($$renderer, {
						report: pendingCrashReport,
						onClose: () => pendingCrashReport = null
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (feedbackPrompt.show) {
					$$renderer.push("<!--[0-->");
					FeedbackModal($$renderer, {
						onClose: () => feedbackPrompt.close(),
						onSubmitted: () => feedbackPrompt.markSubmitted()
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]-->`);
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
export { _layout as default };
