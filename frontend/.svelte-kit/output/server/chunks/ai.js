import { Et as _defineProperty, S as escape_html, _ as stringify, a as attr_class, b as attr, c as bind_props, l as derived, o as attr_style, x as clsx } from "./index-server.js";
import { a as cmdLockVault, r as cmdIsVaultInitialized } from "./commands.js";
import { c as t } from "./uiNotifications.svelte.js";
import { t as errorText } from "./errors.js";
import { invoke } from "@tauri-apps/api/core";
import { check } from "@tauri-apps/plugin-updater";
import "@tauri-apps/plugin-process";
//#region src/lib/api/vault.ts
function isVaultInitialized() {
	return cmdIsVaultInitialized();
}
/** Zeroizes the in-memory vault key and stops tunnels. The next unlock re-derives it. */
function lockVault() {
	return cmdLockVault();
}
//#endregion
//#region src/lib/stores/appearance.svelte.ts
var _initial$reduceMotion;
var STORAGE_KEY$2 = "caf_appearance_v1";
function load$1() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY$2);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (typeof parsed.reduceMotion !== "boolean") return null;
		return { reduceMotion: parsed.reduceMotion };
	} catch (_unused) {
		return null;
	}
}
var initial$1 = typeof localStorage === "undefined" ? null : load$1();
var reduceMotion = (_initial$reduceMotion = initial$1 === null || initial$1 === void 0 ? void 0 : initial$1.reduceMotion) !== null && _initial$reduceMotion !== void 0 ? _initial$reduceMotion : false;
function getAppearance() {
	return { get reduceMotion() {
		return reduceMotion;
	} };
}
//#endregion
//#region src/lib/api/pro.ts
var proStatus = () => invoke("pro_status");
var proSync = () => invoke("pro_sync");
var proTeam = () => invoke("pro_team");
/**
* The server's stable error code for a failed Pro call (`INVALID_CREDENTIALS`, `NETWORK`, ...),
* or null for anything else. The backend sends it as the message of a `CAT-PRO-000` error.
*/
function proErrorCode(err) {
	if (!err || typeof err !== "object") return null;
	const record = err;
	if (record.code !== "CAT-PRO-000" || typeof record.message !== "string") return null;
	const code = record.message.replace(/^pro:\s*/, "").split(":")[0].trim();
	return /^[A-Z0-9_]+$/.test(code) ? code : null;
}
//#endregion
//#region src/lib/stores/pro.svelte.ts
var status$1 = null;
var serverAvailable = null;
var syncing = false;
function getPro() {
	return {
		get status() {
			return status$1;
		},
		/** This account's own Pro plan or trial is valid on this device. */
		get isPro() {
			const ent = status$1 === null || status$1 === void 0 ? void 0 : status$1.entitlement;
			return (ent === null || ent === void 0 ? void 0 : ent.state) === "valid" && ent.features.includes("cloud_sync");
		},
		/** Access through someone else's team only (free account in an entitled team). */
		get isTeamMember() {
			const ent = status$1 === null || status$1 === void 0 ? void 0 : status$1.entitlement;
			return (ent === null || ent === void 0 ? void 0 : ent.state) === "valid" && ent.tier === "team";
		},
		/** null while unknown (not checked yet / browser preview). */
		get serverAvailable() {
			return serverAvailable;
		},
		get syncing() {
			return syncing;
		}
	};
}
async function refreshProStatus() {
	try {
		status$1 = await proStatus();
	} catch (_unused) {}
}
/** Heartbeat. Throws on failure so callers can show why; the status is refreshed either way. */
async function syncPro() {
	if (syncing) return null;
	syncing = true;
	try {
		const outcome = await proSync();
		status$1 = outcome.status;
		return outcome;
	} catch (err) {
		if (proErrorCode(err) === "SESSION_EXPIRED") await refreshProStatus();
		throw err;
	} finally {
		syncing = false;
	}
}
//#endregion
//#region src/lib/stores/profile.svelte.ts
var STORAGE_KEY$1 = "caframework_profile_v1";
var DEFAULT_AVATAR = "rocket";
function load() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY$1);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (typeof parsed.name !== "string") return null;
		return {
			name: parsed.name,
			avatar: typeof parsed.avatar === "string" ? parsed.avatar : DEFAULT_AVATAR
		};
	} catch (_unused) {
		return null;
	}
}
var initial = typeof localStorage === "undefined" ? null : load();
var name = (initial === null || initial === void 0 ? void 0 : initial.name) || "CAFramework User";
var avatar = (initial === null || initial === void 0 ? void 0 : initial.avatar) || "rocket";
function getProfile() {
	return {
		get name() {
			return name;
		},
		get avatar() {
			return avatar;
		},
		get plan() {
			return getPro().isPro ? "pro" : "free";
		}
	};
}
function initialsOf(fullName) {
	var _parts$0$, _parts$, _parts$1$, _parts$2;
	const parts = fullName.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	return (((_parts$0$ = (_parts$ = parts[0]) === null || _parts$ === void 0 ? void 0 : _parts$[0]) !== null && _parts$0$ !== void 0 ? _parts$0$ : "") + (parts.length > 1 ? (_parts$1$ = (_parts$2 = parts[1]) === null || _parts$2 === void 0 ? void 0 : _parts$2[0]) !== null && _parts$1$ !== void 0 ? _parts$1$ : "" : "")).toUpperCase();
}
//#endregion
//#region src/lib/stores/ambient.svelte.ts
var STORAGE_KEY = "caf-ambient-lighting-v1";
var DEFAULT_CONFIG = {
	enabled: true,
	mode: "app-accent",
	customColor: "#64748b",
	effect: "breathing",
	intensity: .65,
	blurRadius: 20,
	speedSec: 4,
	avatarGlowEnabled: true,
	avatarGlowEffect: "comet-beam",
	cardGlowEnabled: true,
	cardGlowStyle: "diffused-halo"
};
function loadStoredConfig() {
	if (typeof localStorage === "undefined") return { ...DEFAULT_CONFIG };
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return { ...DEFAULT_CONFIG };
		return {
			...DEFAULT_CONFIG,
			...JSON.parse(raw)
		};
	} catch (_unused) {
		return { ...DEFAULT_CONFIG };
	}
}
var AmbientStore = class {
	constructor() {
		_defineProperty(this, "config", loadStoredConfig());
	}
	save() {
		if (typeof localStorage !== "undefined") try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
		} catch (_unused2) {}
	}
	setEnabled(val) {
		this.config.enabled = val;
		this.save();
	}
	setMode(val) {
		this.config.mode = val;
		this.save();
	}
	setCustomColor(val) {
		this.config.customColor = val;
		this.save();
	}
	setEffect(val) {
		this.config.effect = val;
		this.save();
	}
	setIntensity(val) {
		this.config.intensity = Math.max(.1, Math.min(1, val));
		this.save();
	}
	setBlurRadius(val) {
		this.config.blurRadius = Math.max(6, Math.min(50, val));
		this.save();
	}
	setSpeedSec(val) {
		this.config.speedSec = Math.max(1, Math.min(20, val));
		this.save();
	}
	setAvatarGlowEnabled(val) {
		this.config.avatarGlowEnabled = val;
		this.save();
	}
	setAvatarGlowEffect(val) {
		this.config.avatarGlowEffect = val;
		this.save();
	}
	setCardGlowEnabled(val) {
		this.config.cardGlowEnabled = val;
		this.save();
	}
	setCardGlowStyle(val) {
		this.config.cardGlowStyle = val;
		this.save();
	}
	reset() {
		this.config = { ...DEFAULT_CONFIG };
		this.save();
	}
};
var instance = null;
function getAmbientStore() {
	if (!instance) instance = new AmbientStore();
	return instance;
}
//#endregion
//#region src/lib/components/ProfileAvatar.svelte
var AVATARS = [
	{
		id: "cat",
		label: "Cat",
		from: "#f59e0b",
		to: "#ea580c",
		pro: false
	},
	{
		id: "fox",
		label: "Fox",
		from: "#fb923c",
		to: "#c2410c",
		pro: false
	},
	{
		id: "mountain",
		label: "Mountain",
		from: "#38bdf8",
		to: "#4f46e5",
		pro: false
	},
	{
		id: "tree",
		label: "Forest",
		from: "#34d399",
		to: "#047857",
		pro: false
	},
	{
		id: "rocket",
		label: "Rocket",
		from: "#0ea5e9",
		to: "#1e3a8a",
		pro: false
	},
	{
		id: "code",
		label: "Code",
		from: "#a78bfa",
		to: "#6d28d9",
		pro: false
	},
	{
		id: "terminal",
		label: "Terminal",
		from: "#525252",
		to: "#171717",
		pro: false
	},
	{
		id: "bolt",
		label: "Lightning",
		from: "#facc15",
		to: "#d97706",
		pro: false
	},
	{
		id: "home",
		label: "Home",
		from: "#f472b6",
		to: "#be185d",
		pro: false
	},
	{
		id: "family",
		label: "Family",
		from: "#2dd4bf",
		to: "#0f766e",
		pro: false
	},
	{
		id: "crown",
		label: "Crown",
		from: "#fbbf24",
		to: "#b45309",
		pro: true
	},
	{
		id: "diamond",
		label: "Diamond",
		from: "#38bdf8",
		to: "#0284c7",
		pro: true
	},
	{
		id: "shield",
		label: "Shield",
		from: "#10b981",
		to: "#047857",
		pro: true
	},
	{
		id: "zap",
		label: "Energy",
		from: "#f59e0b",
		to: "#dc2626",
		pro: true
	},
	{
		id: "cpu",
		label: "Processor",
		from: "#8b5cf6",
		to: "#4c1d95",
		pro: true
	},
	{
		id: "brain",
		label: "Neural AI",
		from: "#6366f1",
		to: "#312e81",
		pro: true
	},
	{
		id: "orbit",
		label: "Orbit",
		from: "#06b6d4",
		to: "#0e7490",
		pro: true
	},
	{
		id: "fire",
		label: "Flame",
		from: "#f43f5e",
		to: "#9f1239",
		pro: true
	},
	{
		id: "star",
		label: "Star",
		from: "#eab308",
		to: "#a16207",
		pro: true
	},
	{
		id: "heart",
		label: "Heart",
		from: "#ec4899",
		to: "#9d174d",
		pro: true
	},
	{
		id: "sparkles",
		label: "Sparkles",
		from: "#c084fc",
		to: "#7e22ce",
		pro: true
	},
	{
		id: "cube",
		label: "Matrix Cube",
		from: "#64748b",
		to: "#1e293b",
		pro: true
	},
	{
		id: "compass",
		label: "Compass",
		from: "#14b8a6",
		to: "#0f766e",
		pro: true
	},
	{
		id: "feather",
		label: "Feather",
		from: "#2dd4bf",
		to: "#059669",
		pro: true
	},
	{
		id: "key",
		label: "Master Key",
		from: "#d97706",
		to: "#78350f",
		pro: true
	},
	{
		id: "atom",
		label: "Atom",
		from: "#3b82f6",
		to: "#1d4ed8",
		pro: true
	},
	{
		id: "ghost",
		label: "Cyber Ghost",
		from: "#a855f7",
		to: "#581c87",
		pro: true
	},
	{
		id: "globe",
		label: "Global Mesh",
		from: "#10b981",
		to: "#065f46",
		pro: true
	},
	{
		id: "eye",
		label: "Cyber Eye",
		from: "#d946ef",
		to: "#701a75",
		pro: true
	},
	{
		id: "target",
		label: "Radar Target",
		from: "#ef4444",
		to: "#991b1b",
		pro: true
	}
];
function ProfileAvatar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var _preset$from, _preset, _preset$to, _preset2;
		let { avatar, name = "", size = 32, pro = false, class: className = "" } = $$props;
		const preset = derived(() => AVATARS.find((a) => a.id === avatar));
		const ambient = getAmbientStore();
		const isHaloActive = derived(() => pro && ambient.config.avatarGlowEnabled);
		const haloEffect = derived(() => ambient.config.avatarGlowEffect || "comet-beam");
		const speed = derived(() => ambient.config.speedSec || 4);
		const intensity = derived(() => {
			var _ambient$config$inten;
			return (_ambient$config$inten = ambient.config.intensity) !== null && _ambient$config$inten !== void 0 ? _ambient$config$inten : .65;
		});
		const activeColor = derived(() => {
			if (ambient.config.mode === "solid") return ambient.config.customColor || "#ef4444";
			if (ambient.config.mode === "app-accent") return ambient.config.customColor || "#38bdf8";
			return "#38bdf8";
		});
		$$renderer.push(`<span class="relative inline-flex items-center justify-center shrink-0 svelte-19zpci8"${attr_style(`width: ${stringify(size)}px; height: ${stringify(size)}px; --halo-speed: ${stringify(speed())}s; --halo-opacity: ${stringify(intensity())}; --halo-color: ${stringify(activeColor())};`)}>`);
		if (isHaloActive()) {
			$$renderer.push("<!--[0-->");
			if (haloEffect() === "comet-beam") $$renderer.push(`<!--[0--><span class="avatar-halo-layer comet-beam-halo svelte-19zpci8" aria-hidden="true"><span class="comet-sweep svelte-19zpci8"${attr_style(`--meteor-stroke: ${stringify(Math.max(2, Math.round(size * .08)))}px;`)}></span> <span class="comet-core-glow svelte-19zpci8"></span></span>`);
			else if (haloEffect() === "dual-photons") $$renderer.push(`<!--[1--><span class="avatar-halo-layer dual-photons-halo svelte-19zpci8" aria-hidden="true"><span class="photon-ring svelte-19zpci8"${attr_style(`--meteor-stroke: ${stringify(Math.max(2, Math.round(size * .08)))}px;`)}></span> <span class="dual-core-pulse svelte-19zpci8"></span></span>`);
			else if (haloEffect() === "chroma-ring") $$renderer.push(`<!--[2--><span class="avatar-halo-layer chroma-ring-halo svelte-19zpci8" aria-hidden="true"><span${attr_class(`chroma-spin ${stringify(ambient.config.mode)}`, "svelte-19zpci8")}></span> <span${attr_class(`chroma-blur ${stringify(ambient.config.mode)}`, "svelte-19zpci8")}></span></span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <span${attr_class(`relative z-10 inline-flex items-center justify-center rounded-full shrink-0 overflow-hidden select-none ${stringify(className)}`, "svelte-19zpci8")}${attr_style(`width: ${stringify(size)}px; height: ${stringify(size)}px; background: linear-gradient(135deg, ${stringify((_preset$from = (_preset = preset()) === null || _preset === void 0 ? void 0 : _preset.from) !== null && _preset$from !== void 0 ? _preset$from : "#0ea5e9")}, ${stringify((_preset$to = (_preset2 = preset()) === null || _preset2 === void 0 ? void 0 : _preset2.to) !== null && _preset$to !== void 0 ? _preset$to : "#10b981")});`)} aria-hidden="true">`);
		if (preset()) {
			$$renderer.push(`<!--[0--><svg viewBox="0 0 24 24"${attr("width", Math.round(size * .6))}${attr("height", Math.round(size * .6))} fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="svelte-19zpci8">`);
			if (preset().id === "cat") $$renderer.push(`<!--[0--><path d="M6 10V4.5l3.5 3h5L18 4.5V10a6 6 0 0 1-12 0z" class="svelte-19zpci8"></path><circle cx="9.5" cy="11" r="0.9" fill="white" stroke="none" class="svelte-19zpci8"></circle><circle cx="14.5" cy="11" r="0.9" fill="white" stroke="none" class="svelte-19zpci8"></circle><path d="M11 13.8h2l-1 1.2z M12 15v1.2" class="svelte-19zpci8"></path>`);
			else if (preset().id === "fox") $$renderer.push(`<!--[1--><path d="M4 5l4 4h8l4-4v6l-8 9-8-9z" class="svelte-19zpci8"></path><circle cx="9" cy="12" r="0.9" fill="white" stroke="none" class="svelte-19zpci8"></circle><circle cx="15" cy="12" r="0.9" fill="white" stroke="none" class="svelte-19zpci8"></circle><circle cx="12" cy="16.5" r="0.9" fill="white" stroke="none" class="svelte-19zpci8"></circle>`);
			else if (preset().id === "mountain") $$renderer.push(`<!--[2--><path d="M3 19l6-9 4 5 2-3 6 7z" class="svelte-19zpci8"></path><circle cx="17" cy="6.5" r="2" class="svelte-19zpci8"></circle>`);
			else if (preset().id === "tree") $$renderer.push(`<!--[3--><path d="M12 3l6 8h-3l4 5H5l4-5H6z" class="svelte-19zpci8"></path><path d="M12 16v5" class="svelte-19zpci8"></path>`);
			else if (preset().id === "rocket") $$renderer.push(`<!--[4--><path d="M12 3c3 2.5 4.5 6 4.5 10l-2 3h-5l-2-3c0-4 1.5-7.5 4.5-10z" class="svelte-19zpci8"></path><circle cx="12" cy="10" r="1.6" class="svelte-19zpci8"></circle><path d="M9.5 16l-2 3.5M14.5 16l2 3.5M12 17v4" class="svelte-19zpci8"></path>`);
			else if (preset().id === "code") $$renderer.push(`<!--[5--><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" class="svelte-19zpci8"></path>`);
			else if (preset().id === "terminal") $$renderer.push(`<!--[6--><rect x="3" y="5" width="18" height="14" rx="2" class="svelte-19zpci8"></rect><path d="M7 10l3 2-3 2M12 15h5" class="svelte-19zpci8"></path>`);
			else if (preset().id === "bolt") $$renderer.push(`<!--[7--><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="white" class="svelte-19zpci8"></path>`);
			else if (preset().id === "home") $$renderer.push(`<!--[8--><path d="M3 11l9-7 9 7" class="svelte-19zpci8"></path><path d="M5 10v10h14V10" class="svelte-19zpci8"></path><path d="M10 20v-5h4v5" class="svelte-19zpci8"></path>`);
			else if (preset().id === "family") $$renderer.push(`<!--[9--><circle cx="7" cy="8" r="2.2" class="svelte-19zpci8"></circle><circle cx="17" cy="8" r="2.2" class="svelte-19zpci8"></circle><circle cx="12" cy="12.5" r="1.8" class="svelte-19zpci8"></circle><path d="M3 20v-1.5A4 4 0 0 1 7 14.5a4 4 0 0 1 2.6 1M21 20v-1.5a4 4 0 0 0-4-4 4 4 0 0 0-2.6 1M9 20v-.5a3 3 0 0 1 6 0v.5" class="svelte-19zpci8"></path>`);
			else if (preset().id === "crown") $$renderer.push(`<!--[10--><path d="M5 18h14l1-11-4.5 4.5L12 4l-4.5 7.5L3 7z" fill="white" class="svelte-19zpci8"></path><circle cx="12" cy="3" r="1" fill="white" class="svelte-19zpci8"></circle><circle cx="3" cy="6" r="1" fill="white" class="svelte-19zpci8"></circle><circle cx="21" cy="6" r="1" fill="white" class="svelte-19zpci8"></circle>`);
			else if (preset().id === "diamond") $$renderer.push(`<!--[11--><path d="M6 3h12l4 6-10 12L2 9z" class="svelte-19zpci8"></path><path d="M2 9h20M12 21L8 9M12 21l4-12M6 3l2 6M18 3l-2 6" class="svelte-19zpci8"></path>`);
			else if (preset().id === "shield") $$renderer.push(`<!--[12--><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" class="svelte-19zpci8"></path><path d="M9 12l2 2 4-4" class="svelte-19zpci8"></path>`);
			else if (preset().id === "zap") $$renderer.push(`<!--[13--><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" class="svelte-19zpci8"></path>`);
			else if (preset().id === "cpu") $$renderer.push(`<!--[14--><rect x="4" y="4" width="16" height="16" rx="2" class="svelte-19zpci8"></rect><rect x="9" y="9" width="6" height="6" class="svelte-19zpci8"></rect><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" class="svelte-19zpci8"></path>`);
			else if (preset().id === "brain") $$renderer.push(`<!--[15--><path d="M9.5 2A4.5 4.5 0 0 0 5 6.5c0 1.2.5 2.3 1.3 3.1A4.5 4.5 0 0 0 5 13.5 4.5 4.5 0 0 0 9.5 18c.2 0 .3 0 .5-.03V2z" class="svelte-19zpci8"></path><path d="M14.5 2A4.5 4.5 0 0 1 19 6.5c0 1.2-.5 2.3-1.3 3.1A4.5 4.5 0 0 1 19 13.5 4.5 4.5 0 0 1 14.5 18c-.2 0-.3 0-.5-.03V2z" class="svelte-19zpci8"></path>`);
			else if (preset().id === "orbit") $$renderer.push(`<!--[16--><circle cx="12" cy="12" r="3" fill="white" class="svelte-19zpci8"></circle><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" class="svelte-19zpci8"></ellipse><circle cx="20" cy="8" r="1.5" fill="white" class="svelte-19zpci8"></circle>`);
			else if (preset().id === "fire") $$renderer.push(`<!--[17--><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" fill="white" class="svelte-19zpci8"></path>`);
			else if (preset().id === "star") $$renderer.push(`<!--[18--><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="white" class="svelte-19zpci8"></polygon>`);
			else if (preset().id === "heart") $$renderer.push(`<!--[19--><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="white" class="svelte-19zpci8"></path>`);
			else if (preset().id === "sparkles") $$renderer.push(`<!--[20--><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" fill="white" class="svelte-19zpci8"></path><path d="M18 15l1 2.5L21.5 18.5 19 19.5 18 22l-1-2.5-2.5-1 2.5-1z" fill="white" class="svelte-19zpci8"></path><path d="M5 16l.8 1.7L7.5 18.5 5.8 19.3 5 21l-.8-1.7L2.5 18.5 4.2 17.7z" fill="white" class="svelte-19zpci8"></path>`);
			else if (preset().id === "cube") $$renderer.push(`<!--[21--><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" class="svelte-19zpci8"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" class="svelte-19zpci8"></polyline><line x1="12" y1="22.08" x2="12" y2="12" class="svelte-19zpci8"></line>`);
			else if (preset().id === "compass") $$renderer.push(`<!--[22--><circle cx="12" cy="12" r="10" class="svelte-19zpci8"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="white" class="svelte-19zpci8"></polygon>`);
			else if (preset().id === "feather") $$renderer.push(`<!--[23--><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" class="svelte-19zpci8"></path><line x1="16" y1="8" x2="2" y2="22" class="svelte-19zpci8"></line><line x1="17.5" y1="15" x2="9" y2="15" class="svelte-19zpci8"></line>`);
			else if (preset().id === "key") $$renderer.push(`<!--[24--><path d="M21 2l-2 2m-1.5 1.5L14 9a5 5 0 1 0-7 7 5 5 0 0 0 7-7l3.5-3.5L19 4l2-2z" class="svelte-19zpci8"></path><circle cx="7.5" cy="16.5" r="1.5" class="svelte-19zpci8"></circle>`);
			else if (preset().id === "atom") $$renderer.push(`<!--[25--><circle cx="12" cy="12" r="2" fill="white" class="svelte-19zpci8"></circle><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" class="svelte-19zpci8"></ellipse><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-30 12 12)" class="svelte-19zpci8"></ellipse><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" class="svelte-19zpci8"></ellipse>`);
			else if (preset().id === "ghost") $$renderer.push(`<!--[26--><path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" class="svelte-19zpci8"></path>`);
			else if (preset().id === "globe") $$renderer.push(`<!--[27--><circle cx="12" cy="12" r="10" class="svelte-19zpci8"></circle><line x1="2" y1="12" x2="22" y2="12" class="svelte-19zpci8"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" class="svelte-19zpci8"></path>`);
			else if (preset().id === "eye") $$renderer.push(`<!--[28--><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" class="svelte-19zpci8"></path><circle cx="12" cy="12" r="3" fill="white" class="svelte-19zpci8"></circle>`);
			else if (preset().id === "target") $$renderer.push(`<!--[29--><circle cx="12" cy="12" r="10" class="svelte-19zpci8"></circle><circle cx="12" cy="12" r="6" class="svelte-19zpci8"></circle><circle cx="12" cy="12" r="2" fill="white" class="svelte-19zpci8"></circle>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></svg>`);
		} else $$renderer.push(`<!--[-1--><span class="font-semibold text-white svelte-19zpci8"${attr_style(`font-size: ${stringify(Math.round(size * .4))}px;`)}>${escape_html(initialsOf(name))}</span>`);
		$$renderer.push(`<!--]--></span></span>`);
	});
}
//#endregion
//#region src/lib/components/AvatarPicker.svelte
function AvatarPicker($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = "rocket", size = 48, centered = true } = $$props;
		$$renderer.push(`<div${attr_class(`relative inline-flex flex-col ${centered ? "items-center justify-center" : "items-start"} no-drag`)}><button type="button" aria-haspopup="dialog"${attr("aria-expanded", false)}${attr("aria-label", t("avatars.pickerLabel"))}${attr("title", t("avatars.pickerLabel"))} class="relative group rounded-full p-1 ring-2 ring-transparent hover:ring-sky-500/50 dark:hover:ring-sky-400/50 focus:outline-none focus:ring-sky-500 transition-all duration-200 cursor-pointer"><div class="relative flex items-center justify-center">`);
		ProfileAvatar($$renderer, {
			avatar: value,
			size
		});
		$$renderer.push(`<!----> <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-md border-2 border-white dark:border-neutral-900 group-hover:scale-110 group-hover:bg-sky-400 transition-transform" aria-hidden="true"><svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></div></div></button> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region src/lib/appInfo.ts
var APP_VERSION = "0.1.1";
var APP_NAME = "CAFramework";
var REPO_URL = "https://github.com/cecepazhar/caterm";
var WEBSITE_URL = "https://caterm.fathforce.com";
var AUTHOR_URL = "https://cecepazhar.com";
`${WEBSITE_URL}`;
/** Primary donation / sponsor-tier channel (Silver $5, Gold $25, Platinum $100 per month). */
var KOFI_URL = "https://ko-fi.com/cecepazhar";
function releaseNotesUrl(ver) {
	return `${REPO_URL}/releases/tag/v${ver.replace(/^v/, "")}`;
}
//#endregion
//#region src/lib/components/ProLoginForm.svelte
function ProLoginForm($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { onSignedIn } = $$props;
		let email = "";
		let password = "";
		let busy = false;
		const INPUT = "w-full px-3 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-sky-500 transition-colors";
		const LABEL = "block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5";
		const LINK = "text-sky-600 dark:text-sky-400 hover:underline font-medium";
		$$renderer.push(`<div class="space-y-4"><div class="text-center space-y-1"><h3 class="text-base font-bold text-neutral-900 dark:text-white">${escape_html(t("pro.login.title"))}</h3> <p class="text-xs text-neutral-500 dark:text-neutral-400">${escape_html(t("pro.login.separateNote"))}</p></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push(`<!--[-1--><form class="space-y-3">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div><label for="pro-email"${attr_class(clsx(LABEL))}>${escape_html(t("pro.login.email"))}</label> <input id="pro-email" type="email"${attr("value", email)} required="" autocomplete="email"${attr_class(clsx(INPUT))}/></div> `);
		$$renderer.push(`<!--[0--><div><label for="pro-password"${attr_class(clsx(LABEL))}>${escape_html(t("pro.login.password"))}</label> <input id="pro-password" type="password"${attr("value", password)} required="" minlength="8"${attr("autocomplete", "current-password")}${attr_class(clsx(INPUT))}/></div>`);
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <button type="submit"${attr("disabled", busy, true)} class="w-full py-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-medium rounded-lg shadow-sm transition-colors text-sm">`);
		$$renderer.push(`<!--[-1-->${escape_html(t("pro.login.signIn"))}`);
		$$renderer.push(`<!--]--></button></form> <div class="flex items-center justify-between text-xs">`);
		$$renderer.push(`<!--[0--><button type="button"${attr_class(clsx(LINK))}>${escape_html(t("pro.login.noAccount"))}</button> <button type="button"${attr_class(clsx(LINK))}>${escape_html(t("pro.login.forgot"))}</button>`);
		$$renderer.push(`<!--]--></div>`);
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/lib/api/updater.ts
function isTauriRuntime() {
	return typeof window !== "undefined" && Boolean(window.__TAURI_INTERNALS__);
}
/** Resolves to the pending update, or null when this build is already the latest. */
async function checkForAppUpdate() {
	if (!isTauriRuntime()) throw new Error("Updates are only available in the desktop app.");
	return check();
}
//#endregion
//#region src/lib/stores/updater.svelte.ts
var status = "idle";
var update = null;
var errorMessage = "";
var progress = {
	downloaded: 0,
	total: null
};
var toastDismissed = false;
function getUpdater() {
	return {
		get status() {
			return status;
		},
		get version() {
			var _update$version;
			return (_update$version = update === null || update === void 0 ? void 0 : update.version) !== null && _update$version !== void 0 ? _update$version : "";
		},
		get error() {
			return errorMessage;
		},
		get progress() {
			return progress;
		},
		/** The floating toast shows only for an update the user hasn't waved away this session. */
		get showToast() {
			return (status === "available" || status === "downloading") && !toastDismissed;
		}
	};
}
/**
* `silent` is the startup background check: failures (offline, no release published yet,
* `tauri dev` in a browser tab) leave the state idle instead of surfacing an error.
*/
async function checkForUpdates({ silent = false } = {}) {
	if (status === "checking" || status === "downloading") return;
	if (silent && !isTauriRuntime()) return;
	status = "checking";
	errorMessage = "";
	try {
		update = await checkForAppUpdate();
		status = update ? "available" : "up-to-date";
		if (update) toastDismissed = false;
	} catch (err) {
		update = null;
		if (silent) {
			console.warn("Background update check failed:", err);
			status = "idle";
		} else {
			errorMessage = errorText(err);
			status = "error";
		}
	}
}
//#endregion
//#region src/lib/api/ai.ts
async function getAiSettings() {
	return invoke("get_ai_settings");
}
//#endregion
export { getAppearance as C, proTeam as S, lockVault as T, getProfile as _, APP_NAME as a, syncPro as b, KOFI_URL as c, releaseNotesUrl as d, AvatarPicker as f, DEFAULT_AVATAR as g, getAmbientStore as h, ProLoginForm as i, REPO_URL as l, ProfileAvatar as m, checkForUpdates as n, APP_VERSION as o, AVATARS as p, getUpdater as r, AUTHOR_URL as s, getAiSettings as t, WEBSITE_URL as u, getPro as v, isVaultInitialized as w, proErrorCode as x, refreshProStatus as y };
