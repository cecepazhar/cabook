import { Et as _defineProperty, S as escape_html, _ as stringify, a as attr_class, b as attr, c as bind_props, d as ensure_array_like, g as spread_props, h as slot, kt as fallback, l as derived, m as sanitize_props, o as attr_style, p as rest_props, s as attributes, u as element, x as clsx } from "./index-server.js";
//#region ../../caui/dist/components/ui/Button.svelte
function Button($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** Required when size="icon" for accessibility. */
		let { variant = "primary", size = "md", disabled = false, loading = false, type = "button", title, "aria-label": ariaLabel, class: customClass = "", onclick, children, $$slots, $$events, ...restProps } = $$props;
		const variantClasses = {
			primary: "bg-neutral-900 text-white font-semibold hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 border border-neutral-900 dark:border-white shadow-sm",
			secondary: "bg-[var(--ca-surface-subtle)] border border-[var(--ca-border)] text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-elevated)]",
			outline: "bg-transparent border border-[var(--ca-border)] text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)]",
			ghost: "bg-transparent text-[var(--ca-text-secondary)] hover:bg-[var(--ca-surface-subtle)] hover:text-[var(--ca-text-primary)]",
			danger: "bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50",
			brand: "bg-[var(--ca-brand)]/10 border border-[var(--ca-brand)]/40 text-[var(--ca-brand)] hover:bg-[var(--ca-brand)]/20 hover:border-[var(--ca-brand)]/60 shadow-xs",
			neutral: "bg-[var(--ca-surface-subtle)] text-[var(--ca-text-secondary)] hover:text-[var(--ca-text-primary)] border border-[var(--ca-border)]",
			info: "bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 hover:border-sky-500/50",
			success: "bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50",
			warning: "bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50"
		};
		const sizeClasses = {
			sm: "px-2.5 py-1 text-xs rounded-lg gap-1.5",
			md: "px-3.5 py-1.5 text-xs font-semibold rounded-lg gap-2",
			lg: "px-4 py-2 text-sm font-bold rounded-xl gap-2.5",
			icon: "p-1.5 rounded-lg justify-center"
		};
		$$renderer.push(`<button${attributes({
			type,
			title,
			disabled: disabled || loading,
			"aria-busy": loading || void 0,
			"aria-label": size === "icon" ? ariaLabel || restProps["aria-label"] : void 0,
			...restProps,
			class: `inline-flex items-center justify-center font-sans select-none transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] ${stringify(variantClasses[variant])} ${stringify(sizeClasses[size])} ${stringify(customClass)}`
		})}>`);
		if (loading) $$renderer.push(`<!--[0--><svg class="animate-spin -ml-0.5 mr-1.5 h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		children === null || children === void 0 || children($$renderer);
		$$renderer.push(`<!----></button>`);
	});
}
//#endregion
//#region ../../caui/dist/components/ui/Badge.svelte
function Badge($$renderer, $$props) {
	/** Full ComponentVariant vocabulary + neutral (neutral is already in ComponentVariant). */
	/** Accessible label for screen readers. */
	let { variant = "neutral", size = "sm", ariaLabel, class: customClass = "", children } = $$props;
	$$renderer.push(`<span role="status"${attr("aria-label", ariaLabel)}${attr_class(`inline-flex items-center justify-center select-none tracking-tight ${stringify({
		primary: "bg-[var(--ca-brand)]/15 text-[var(--ca-brand)] border border-[var(--ca-brand)]/35",
		secondary: "bg-[var(--ca-surface-subtle)] text-[var(--ca-text-secondary)] border border-[var(--ca-border)]",
		outline: "bg-transparent text-[var(--ca-text-primary)] border border-[var(--ca-border)]",
		ghost: "bg-transparent text-[var(--ca-text-secondary)]",
		brand: "bg-[var(--ca-brand)]/15 text-[var(--ca-brand)] border border-[var(--ca-brand)]/35",
		neutral: "bg-[var(--ca-surface-subtle)] text-[var(--ca-text-secondary)] border border-[var(--ca-border)]",
		info: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30",
		success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
		warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30",
		danger: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30"
	}[variant])} ${stringify({
		xs: "text-[10px] px-1.5 py-0.5 rounded-md font-mono font-medium gap-1",
		sm: "text-xs px-2 py-0.5 rounded-lg font-medium gap-1.5",
		md: "text-sm px-2.5 py-1 rounded-lg font-medium gap-2"
	}[size])} ${stringify(customClass)}`)}>`);
	children === null || children === void 0 || children($$renderer);
	$$renderer.push(`<!----></span>`);
}
[
	"a[href]",
	"button:not([disabled])",
	"textarea:not([disabled])",
	"input:not([disabled]):not([type=\"hidden\"])",
	"select:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(",");
var idCounter = 0;
/** Stable DOM id generator for aria-controls / aria-labelledby wiring. */
function uid(prefix = "ca") {
	idCounter += 1;
	return `${prefix}-${idCounter}`;
}
//#endregion
//#region ../../caui/dist/components/ui/Card.svelte
function Card($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** Heading level (1–6). Default: 3. */
		let { variant = "primary", size = "md", level = 3, title, description, class: customClass = "", headerAction, children } = $$props;
		const headingId = uid("card-heading");
		$$renderer.push(`<div${attr("role", title ? "region" : void 0)}${attr("aria-labelledby", title ? headingId : void 0)}${attr_class(`transition-colors ${stringify({
			primary: "bg-[var(--ca-surface)] border border-[var(--ca-border)]",
			secondary: "bg-[var(--ca-surface-subtle)] border border-[var(--ca-border)]",
			outline: "bg-transparent border border-[var(--ca-border)]",
			ghost: "bg-transparent"
		}[variant])} ${stringify({
			sm: "p-3 rounded-lg",
			md: "p-5 rounded-xl",
			lg: "p-7 rounded-2xl"
		}[size])} ${stringify(customClass)}`)}>`);
		if (title || headerAction) {
			$$renderer.push(`<!--[0--><div class="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-[var(--ca-border)]"><div>`);
			if (title) {
				$$renderer.push("<!--[0-->");
				element($$renderer, "h" + level, () => {
					$$renderer.push(`${attr("id", headingId)} class="font-bold text-[var(--ca-text-primary)] text-xs sm:text-sm tracking-tight"`);
				}, () => {
					$$renderer.push(`${escape_html(title)}`);
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (description) $$renderer.push(`<!--[0--><p class="text-[11px] text-[var(--ca-text-muted)] mt-0.5 leading-relaxed">${escape_html(description)}</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (headerAction) {
				$$renderer.push(`<!--[0--><div class="shrink-0 flex items-center gap-2">`);
				headerAction($$renderer);
				$$renderer.push(`<!----></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		children === null || children === void 0 || children($$renderer);
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
//#region ../../caui/dist/components/ui/Input.svelte
function Input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** Error message — sets `aria-invalid` and links via `aria-describedby`. */
		/** Shows success styling when true. */
		let { variant = "primary", size = "md", value = "", type = "text", placeholder = "", disabled = false, readonly = false, required = false, id, label = "", error = "", success = false, class: customClass = "", leadingIcon, trailingAction, oninput, onkeydown, autofocus = false, ariaLabel, ref = void 0 } = $$props;
		const errorId = uid("input-error");
		const variantClasses = {
			primary: "bg-[var(--ca-surface)] border border-[var(--ca-border)] text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] focus:border-neutral-900 dark:focus:border-white",
			outline: "bg-transparent border border-[var(--ca-border)] text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] focus:border-neutral-900 dark:focus:border-white",
			ghost: "bg-transparent border border-transparent text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] hover:border-[var(--ca-border)] focus:border-neutral-900 dark:focus:border-white"
		};
		const sizeClasses = {
			sm: "py-1.5 text-xs",
			md: "py-2 text-xs",
			lg: "py-2.5 text-sm"
		};
		$$renderer.push(`<div${attr_class(`flex flex-col gap-1.5 w-full ${stringify(customClass)}`)}>`);
		if (label) $$renderer.push(`<!--[0--><label${attr("for", id)} class="text-xs font-medium text-[var(--ca-text-secondary)]">${escape_html(label)}</label>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="relative flex items-center w-full">`);
		if (leadingIcon) {
			$$renderer.push(`<!--[0--><div class="absolute left-3.5 flex items-center pointer-events-none text-[var(--ca-text-muted)]">`);
			leadingIcon($$renderer);
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <input${attr("id", id)}${attr("type", type)}${attr("placeholder", placeholder)}${attr("disabled", disabled, true)}${attr("readonly", readonly, true)}${attr("required", required, true)}${attr("autofocus", autofocus, true)}${attr("value", value)}${attr("aria-label", ariaLabel || label || void 0)}${attr("aria-invalid", !!error || void 0)}${attr("aria-describedby", error ? errorId : void 0)}${attr_class(`w-full rounded-lg ${stringify(variantClasses[variant])} ${stringify(sizeClasses[size])} ${leadingIcon ? "pl-10" : "pl-3"} ${trailingAction ? "pr-10" : "pr-3"} transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 dark:focus-visible:ring-white ${error ? "border-rose-500 focus:border-rose-500" : ""} ${success ? "border-emerald-500" : ""}`)}/> `);
		if (trailingAction) {
			$$renderer.push(`<!--[0--><div class="absolute right-2 flex items-center">`);
			trailingAction($$renderer);
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (error) $$renderer.push(`<!--[0--><span${attr("id", errorId)} class="text-[11px] text-rose-400">${escape_html(error)}</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, {
			value,
			ref
		});
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/lucide-svelte@0.474.0_svelte@5.57.2_@typescript-eslint+types@8.71.1_/node_modules/lucide-svelte/dist/defaultAttributes.js
/**
* @license lucide-svelte v0.474.0 - ISC
*
* ISC License
* 
* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
* 
* Permission to use, copy, modify, and/or distribute this software for any
* purpose with or without fee is hereby granted, provided that the above
* copyright notice and this permission notice appear in all copies.
* 
* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
* 
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
//#endregion
//#region ../../../node_modules/.pnpm/lucide-svelte@0.474.0_svelte@5.57.2_@typescript-eslint+types@8.71.1_/node_modules/lucide-svelte/dist/Icon.svelte
function Icon($$renderer, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	const $$restProps = rest_props($$sanitized_props, [
		"name",
		"color",
		"size",
		"strokeWidth",
		"absoluteStrokeWidth",
		"iconNode"
	]);
	$$renderer.component(($$renderer) => {
		let name = fallback($$props["name"], void 0);
		let color = fallback($$props["color"], "currentColor");
		let size = fallback($$props["size"], 24);
		let strokeWidth = fallback($$props["strokeWidth"], 2);
		let absoluteStrokeWidth = fallback($$props["absoluteStrokeWidth"], false);
		let iconNode = fallback($$props["iconNode"], () => [], true);
		const mergeClasses = (...classes) => classes.filter((className, index, array) => {
			return Boolean(className) && array.indexOf(className) === index;
		}).join(" ");
		$$renderer.push(`<svg${attributes({
			...defaultAttributes,
			...$$restProps,
			width: size,
			height: size,
			stroke: color,
			"stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
			class: clsx(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class))
		}, void 0, void 0, void 0, 3)}><!--[-->`);
		const each_array = ensure_array_like(iconNode);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let [tag, attrs] = each_array[$$index];
			element($$renderer, tag, () => {
				$$renderer.push(`${attributes({ ...attrs }, void 0, void 0, void 0, 3)}`);
			});
		}
		$$renderer.push(`<!--]--><!--[-->`);
		slot($$renderer, $$props, "default", {}, null);
		$$renderer.push(`<!--]--></svg>`);
		bind_props($$props, {
			name,
			color,
			size,
			strokeWidth,
			absoluteStrokeWidth,
			iconNode
		});
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/lucide-svelte@0.474.0_svelte@5.57.2_@typescript-eslint+types@8.71.1_/node_modules/lucide-svelte/dist/icons/check.svelte
function Check($$renderer, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	/**
	* @license lucide-svelte v0.474.0 - ISC
	*
	* ISC License
	*
	* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
	*
	* Permission to use, copy, modify, and/or distribute this software for any
	* purpose with or without fee is hereby granted, provided that the above
	* copyright notice and this permission notice appear in all copies.
	*
	* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	*
	*/
	Icon($$renderer, spread_props([
		{ name: "check" },
		$$sanitized_props,
		{
			/**
			* @component @name Check
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgNiA5IDE3bC01LTUiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/check
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M20 6 9 17l-5-5" }]],
			children: ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				slot($$renderer, $$props, "default", {}, null);
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		}
	]));
}
//#endregion
//#region ../../../node_modules/.pnpm/lucide-svelte@0.474.0_svelte@5.57.2_@typescript-eslint+types@8.71.1_/node_modules/lucide-svelte/dist/icons/chevron-left.svelte
function Chevron_left($$renderer, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	/**
	* @license lucide-svelte v0.474.0 - ISC
	*
	* ISC License
	*
	* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
	*
	* Permission to use, copy, modify, and/or distribute this software for any
	* purpose with or without fee is hereby granted, provided that the above
	* copyright notice and this permission notice appear in all copies.
	*
	* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	*
	*/
	Icon($$renderer, spread_props([
		{ name: "chevron-left" },
		$$sanitized_props,
		{
			/**
			* @component @name ChevronLeft
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTUgMTgtNi02IDYtNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/chevron-left
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "m15 18-6-6 6-6" }]],
			children: ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				slot($$renderer, $$props, "default", {}, null);
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		}
	]));
}
//#endregion
//#region ../../../node_modules/.pnpm/lucide-svelte@0.474.0_svelte@5.57.2_@typescript-eslint+types@8.71.1_/node_modules/lucide-svelte/dist/icons/chevron-right.svelte
function Chevron_right($$renderer, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	/**
	* @license lucide-svelte v0.474.0 - ISC
	*
	* ISC License
	*
	* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
	*
	* Permission to use, copy, modify, and/or distribute this software for any
	* purpose with or without fee is hereby granted, provided that the above
	* copyright notice and this permission notice appear in all copies.
	*
	* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	*
	*/
	Icon($$renderer, spread_props([
		{ name: "chevron-right" },
		$$sanitized_props,
		{
			/**
			* @component @name ChevronRight
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtOSAxOCA2LTYtNi02IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/chevron-right
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "m9 18 6-6-6-6" }]],
			children: ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				slot($$renderer, $$props, "default", {}, null);
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		}
	]));
}
//#endregion
//#region ../../../node_modules/.pnpm/lucide-svelte@0.474.0_svelte@5.57.2_@typescript-eslint+types@8.71.1_/node_modules/lucide-svelte/dist/icons/minus.svelte
function Minus($$renderer, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	/**
	* @license lucide-svelte v0.474.0 - ISC
	*
	* ISC License
	*
	* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
	*
	* Permission to use, copy, modify, and/or distribute this software for any
	* purpose with or without fee is hereby granted, provided that the above
	* copyright notice and this permission notice appear in all copies.
	*
	* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	*
	*/
	Icon($$renderer, spread_props([
		{ name: "minus" },
		$$sanitized_props,
		{
			/**
			* @component @name Minus
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAxMmgxNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/minus
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M5 12h14" }]],
			children: ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				slot($$renderer, $$props, "default", {}, null);
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		}
	]));
}
//#endregion
//#region ../../../node_modules/.pnpm/lucide-svelte@0.474.0_svelte@5.57.2_@typescript-eslint+types@8.71.1_/node_modules/lucide-svelte/dist/icons/plus.svelte
function Plus($$renderer, $$props) {
	const $$sanitized_props = sanitize_props($$props);
	/**
	* @license lucide-svelte v0.474.0 - ISC
	*
	* ISC License
	*
	* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
	*
	* Permission to use, copy, modify, and/or distribute this software for any
	* purpose with or without fee is hereby granted, provided that the above
	* copyright notice and this permission notice appear in all copies.
	*
	* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	*
	*/
	Icon($$renderer, spread_props([
		{ name: "plus" },
		$$sanitized_props,
		{
			/**
			* @component @name Plus
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAxMmgxNCIgLz4KICA8cGF0aCBkPSJNMTIgNXYxNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/plus
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]],
			children: ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				slot($$renderer, $$props, "default", {}, null);
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		}
	]));
}
//#endregion
//#region ../../caui/dist/components/ui/Alert.svelte
function Alert($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** @deprecated Use 'danger' instead. Kept for CATerm backward compatibility. */
		let { variant = "info", size = "md", title = "", description = "", dismissible = false, class: customClass = "", ondismiss, children, action } = $$props;
		/** Resolve deprecated 'error' alias to 'danger'. */
		const resolvedVariant = derived(() => variant === "error" ? "danger" : variant);
		const variantStyles = {
			neutral: {
				bg: "bg-[var(--ca-surface-subtle)]",
				border: "border-[var(--ca-border)]",
				text: "text-[var(--ca-text-primary)]",
				iconColor: "text-[var(--ca-text-muted)]",
				path: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			},
			info: {
				bg: "bg-sky-500/10 dark:bg-sky-500/10",
				border: "border-sky-500/30",
				text: "text-sky-800 dark:text-sky-300",
				iconColor: "text-sky-500",
				path: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			},
			success: {
				bg: "bg-emerald-500/10 dark:bg-emerald-500/10",
				border: "border-emerald-500/30",
				text: "text-emerald-800 dark:text-emerald-300",
				iconColor: "text-emerald-500",
				path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			},
			warning: {
				bg: "bg-amber-500/10 dark:bg-amber-500/10",
				border: "border-amber-500/30",
				text: "text-amber-800 dark:text-amber-300",
				iconColor: "text-amber-500",
				path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
			},
			danger: {
				bg: "bg-rose-500/10 dark:bg-rose-500/10",
				border: "border-rose-500/30",
				text: "text-rose-800 dark:text-rose-300",
				iconColor: "text-rose-500",
				path: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			}
		};
		const sizeClasses = {
			sm: "p-2.5 text-[11px] gap-2",
			md: "p-3.5 text-xs gap-3",
			lg: "p-4 text-sm gap-3.5"
		};
		const current = derived(() => variantStyles[resolvedVariant()]);
		$$renderer.push(`<!--[0--><div${attr_class(`flex items-start rounded-xl border font-sans transition-all ${stringify(current().bg)} ${stringify(current().border)} ${stringify(sizeClasses[size])} ${stringify(customClass)}`)} role="alert"${attr("aria-live", resolvedVariant() === "danger" ? "assertive" : "polite")}><div${attr_class(`shrink-0 mt-0.5 ${stringify(current().iconColor)}`)}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${attr("d", current().path)}></path></svg></div> <div class="flex-1 min-w-0">`);
		if (title) $$renderer.push(`<!--[0--><h4${attr_class(`font-semibold mb-0.5 ${stringify(current().text)}`)}>${escape_html(title)}</h4>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (description) $$renderer.push(`<!--[0--><p${attr_class(`opacity-90 leading-relaxed ${stringify(current().text)}`)}>${escape_html(description)}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		children === null || children === void 0 || children($$renderer);
		$$renderer.push(`<!----></div> `);
		if (action) {
			$$renderer.push(`<!--[0--><div class="shrink-0 ml-2">`);
			action($$renderer);
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (dismissible) $$renderer.push(`<!--[0--><button type="button" class="shrink-0 p-1 rounded-md opacity-60 hover:opacity-100 transition cursor-pointer text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]" aria-label="Dismiss alert"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region ../../caui/dist/i18n.svelte.js
var I18nState = class {
	constructor() {
		_defineProperty(this, "currentLocale", "en");
	}
};
new I18nState();
//#endregion
//#region ../../caui/dist/tokens/palettes.js
/**
* CAUI color palette DATA (not theme tokens).
* Used by ColorPicker presets & ThemeSwitcher accents.
*/
/** Default color picker presets (moved from ColorPicker.svelte). */
var DEFAULT_COLOR_PRESETS = [
	{
		name: "Gray",
		hex: "#71717a"
	},
	{
		name: "Red",
		hex: "#ef4444"
	},
	{
		name: "Cyan",
		hex: "#06b6d4"
	},
	{
		name: "Green",
		hex: "#10b981"
	},
	{
		name: "Purple",
		hex: "#8b5cf6"
	},
	{
		name: "Yellow",
		hex: "#eab308"
	},
	{
		name: "Blue",
		hex: "#3b82f6"
	}
];
//#endregion
//#region ../../caui/dist/components/ui/Tabs.svelte
function Tabs($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var _items$;
		let { items = [], value = ((_items$ = items[0]) === null || _items$ === void 0 ? void 0 : _items$.id) || "", variant = "underline", size = "md", class: customClass = "", children } = $$props;
		const sizeClasses = {
			sm: "text-[11px] px-2 py-1",
			md: "text-xs px-3 py-1.5",
			lg: "text-sm px-4 py-2"
		};
		const variantStyles = {
			underline: "border-b border-[var(--ca-border)] gap-6",
			pills: "gap-2 bg-transparent",
			segmented: "p-1 bg-[var(--ca-surface-subtle)] border border-[var(--ca-border)] rounded-lg gap-1"
		};
		const itemStyles = {
			underline: (active, sizeClass) => `pb-2.5 font-medium transition-all relative ${sizeClass} ${active ? "text-[var(--ca-text-primary)] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--ca-brand)]" : "text-[var(--ca-text-muted)] hover:text-[var(--ca-text-secondary)]"}`,
			pills: (active, sizeClass) => `font-medium rounded-lg transition-all ${sizeClass} ${active ? "bg-[var(--ca-surface-subtle)] text-[var(--ca-text-primary)] shadow-sm" : "text-[var(--ca-text-muted)] hover:text-[var(--ca-text-secondary)] hover:bg-[var(--ca-surface-subtle)]"}`,
			segmented: (active, sizeClass) => `font-medium rounded-md transition-all flex-1 text-center ${sizeClass} ${active ? "bg-[var(--ca-surface-subtle)] text-[var(--ca-text-primary)] shadow-sm font-semibold" : "text-[var(--ca-text-muted)] hover:text-[var(--ca-text-secondary)]"}`
		};
		$$renderer.push(`<div${attr_class(`w-full flex flex-col ${stringify(customClass)}`)}><div role="tablist"${attr_class(`flex items-center ${stringify(variantStyles[variant])}`)}><!--[-->`);
		const each_array = ensure_array_like(items);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let item = each_array[i];
			$$renderer.push(`<button${attr("id", `tab-${stringify(item.id)}`)} type="button" role="tab"${attr("aria-selected", value === item.id)}${attr("aria-controls", `tabpanel-${stringify(item.id)}`)}${attr("tabindex", value === item.id ? 0 : -1)}${attr("disabled", item.disabled, true)}${attr_class(`inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] ${stringify(itemStyles[variant](value === item.id, sizeClasses[size]))}`)}>`);
			if (item.icon) {
				$$renderer.push("<!--[0-->");
				item.icon($$renderer);
				$$renderer.push(`<!---->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span>${escape_html(item.label)}</span> `);
			if (item.badge !== void 0) $$renderer.push(`<!--[0--><span class="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-[var(--ca-surface-subtle)] text-[var(--ca-text-secondary)]">${escape_html(item.badge)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></button>`);
		}
		$$renderer.push(`<!--]--></div> `);
		if (children) {
			$$renderer.push(`<!--[0--><div${attr("id", `tabpanel-${stringify(value)}`)} role="tabpanel"${attr("aria-labelledby", `tab-${stringify(value)}`)} class="mt-4">`);
			children($$renderer);
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region ../../caui/dist/components/ui/Switch.svelte
function Switch($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** Explicit aria-label when no visible label is provided. */
		let { variant: _variant = "primary", size = "md", checked = false, disabled = false, label = "", description = "", "aria-label": ariaLabel, class: customClass = "", onchange } = $$props;
		const labelId = uid("switch-label");
		$$renderer.push(`<label${attr_class(`inline-flex items-start gap-3 select-none cursor-pointer ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${stringify(customClass)}`)}><button type="button" role="switch"${attr("aria-checked", checked)}${attr("aria-labelledby", label ? labelId : void 0)}${attr("aria-label", label ? void 0 : ariaLabel)}${attr("disabled", disabled, true)}${attr_class(`relative inline-flex shrink-0 items-center rounded-full p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] ${stringify({
			sm: "w-7 h-4",
			md: "w-9 h-5",
			lg: "w-11 h-6"
		}[size])} ${checked ? "bg-[var(--ca-brand)]" : "bg-[var(--ca-surface-subtle)] border border-[var(--ca-border)]"}`)}><span${attr_class(`pointer-events-none inline-block rounded-full bg-[var(--ca-surface)] shadow transform transition-transform ${stringify({
			sm: "w-3 h-3",
			md: "w-4 h-4",
			lg: "w-5 h-5"
		}[size])} ${stringify(checked ? {
			sm: "translate-x-3",
			md: "translate-x-4",
			lg: "translate-x-5"
		}[size] : "translate-x-0")}`)}></span></button> `);
		if (label || description) {
			$$renderer.push(`<!--[0--><div class="flex flex-col text-left">`);
			if (label) $$renderer.push(`<!--[0--><span${attr("id", labelId)} class="text-xs font-medium text-[var(--ca-text-primary)]">${escape_html(label)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (description) $$renderer.push(`<!--[0--><span class="text-[11px] text-[var(--ca-text-muted)] mt-0.5">${escape_html(description)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></label>`);
		bind_props($$props, { checked });
	});
}
//#endregion
//#region ../../caui/dist/components/ui/RangeSlider.svelte
function RangeSlider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { min = 0, max = 100, step = 1, minVal = 20, maxVal = 80, disabled = false, variant: _variant = "primary", size = "md", class: customClass = "" } = $$props;
		const sizeClasses = {
			sm: "h-1",
			md: "h-1.5",
			lg: "h-2"
		};
		$$renderer.push(`<div${attr_class(`flex flex-col gap-2 w-full ${stringify(customClass)}`)}><div class="flex items-center justify-between text-xs font-mono text-[var(--ca-text-muted)]"><span>${escape_html(minVal)}</span> <span>${escape_html(maxVal)}</span></div> <div class="relative flex items-center gap-2"><input type="range"${attr("min", min)}${attr("max", max)}${attr("step", step)}${attr("disabled", disabled, true)} aria-label="Minimum value"${attr("value", minVal)}${attr_class(`w-full ${stringify(sizeClasses[size])} bg-[var(--ca-surface-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--ca-brand)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]`)}/> <input type="range"${attr("min", min)}${attr("max", max)}${attr("step", step)}${attr("disabled", disabled, true)} aria-label="Maximum value"${attr("value", maxVal)}${attr_class(`w-full ${stringify(sizeClasses[size])} bg-[var(--ca-surface-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--ca-brand)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]`)}/></div></div>`);
		bind_props($$props, {
			minVal,
			maxVal
		});
	});
}
//#endregion
//#region ../../caui/dist/components/ui/Accordion.svelte
function Accordion($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var _items$;
		let { items = [], allowMultiple = false, variant = "primary", size = "md", class: customClass = "", itemContent } = $$props;
		let openIds = [((_items$ = items[0]) === null || _items$ === void 0 ? void 0 : _items$.id) || ""];
		const panelIds = derived(() => items.map(() => uid("accordion-panel")));
		const triggerIds = derived(() => items.map(() => uid("accordion-trigger")));
		const variantClasses = {
			primary: "border-[var(--ca-border)] bg-[var(--ca-surface-elevated)]",
			outline: "border-[var(--ca-border)] bg-transparent",
			ghost: "border-transparent bg-transparent"
		};
		const sizeClasses = {
			sm: "text-[11px]",
			md: "text-xs",
			lg: "text-sm"
		};
		$$renderer.push(`<div${attr_class(`flex flex-col gap-2 w-full ${stringify(customClass)}`)}><!--[-->`);
		const each_array = ensure_array_like(items);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let item = each_array[i];
			const isOpen = openIds.includes(item.id);
			$$renderer.push(`<div${attr_class(`rounded-lg border overflow-hidden ${stringify(variantClasses[variant])}`)}><button${attr("id", triggerIds()[i])} type="button" data-accordion-trigger=""${attr("aria-expanded", isOpen)}${attr("aria-controls", panelIds()[i])}${attr_class(`w-full px-4 py-3 flex items-center justify-between text-left font-medium text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] ${stringify(sizeClasses[size])}`)}><span>${escape_html(item.title)}</span> <svg${attr_class(`w-4 h-4 text-[var(--ca-text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
			if (isOpen) {
				$$renderer.push(`<!--[0--><div${attr("id", panelIds()[i])} role="region"${attr("aria-labelledby", triggerIds()[i])}${attr_class(`px-4 py-3 border-t border-[var(--ca-border)] text-[var(--ca-text-secondary)] ${stringify(sizeClasses[size])}`)}>`);
				if (itemContent) {
					$$renderer.push("<!--[0-->");
					itemContent($$renderer, item);
					$$renderer.push(`<!---->`);
				} else $$renderer.push(`<!--[-1--><p>${escape_html(item.content || "")}</p>`);
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region ../../caui/dist/components/ui/Breadcrumb.svelte
function Breadcrumb($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { items = [], separator = "/", variant = "primary", size = "sm", class: customClass = "" } = $$props;
		$$renderer.push(`<nav aria-label="Breadcrumb"${attr_class(`${stringify({
			primary: "text-neutral-400",
			ghost: "text-neutral-500"
		}[variant])} ${stringify({
			sm: "text-xs",
			md: "text-sm"
		}[size])} ${stringify(customClass)}`)}><ol class="flex items-center gap-2"><!--[-->`);
		const each_array = ensure_array_like(items);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let item = each_array[index];
			if (index > 0) $$renderer.push(`<!--[0--><li aria-hidden="true" class="text-neutral-600 select-none">${escape_html(separator)}</li>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <li>`);
			if (index === items.length - 1) $$renderer.push(`<!--[0--><span aria-current="page" class="text-neutral-100 font-medium">${escape_html(item.label)}</span>`);
			else if (item.href) $$renderer.push(`<!--[1--><a${attr("href", item.href)} class="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] rounded">${escape_html(item.label)}</a>`);
			else $$renderer.push(`<!--[-1--><span>${escape_html(item.label)}</span>`);
			$$renderer.push(`<!--]--></li>`);
		}
		$$renderer.push(`<!--]--></ol></nav>`);
	});
}
//#endregion
//#region ../../caui/dist/components/ui/ProgressBar.svelte
function ProgressBar($$renderer, $$props) {
	let { value = 0, max = 100, showLabel = false, label = "Progress", variant = "brand", size = "md", class: customClass = "" } = $$props;
	const percent = derived(() => Math.min(100, Math.max(0, Math.round(value / max * 100))));
	const sizeClasses = {
		sm: "h-1",
		md: "h-2",
		lg: "h-3"
	};
	const variantClasses = {
		primary: "bg-[var(--ca-brand)]",
		secondary: "bg-[var(--ca-text-secondary)]",
		outline: "bg-[var(--ca-border)]",
		ghost: "bg-[var(--ca-surface-subtle)]",
		brand: "bg-[var(--ca-brand)]",
		neutral: "bg-[var(--ca-text-muted)]",
		info: "bg-[var(--ca-info)]",
		success: "bg-[var(--ca-success)]",
		warning: "bg-[var(--ca-warning)]",
		danger: "bg-[var(--ca-danger)]"
	};
	$$renderer.push(`<div role="progressbar"${attr("aria-valuenow", value)}${attr("aria-valuemin", 0)}${attr("aria-valuemax", max)}${attr("aria-label", label)}${attr_class(`flex flex-col gap-1 w-full ${stringify(customClass)}`)}>`);
	if (showLabel) $$renderer.push(`<!--[0--><div class="flex justify-between text-[11px] font-mono text-[var(--ca-text-muted)]"><span>${escape_html(label)}</span> <span>${escape_html(percent())}%</span></div>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> <div${attr_class(`w-full overflow-hidden rounded-full bg-[var(--ca-surface-subtle)] ${stringify(sizeClasses[size])}`)}><div${attr_class(`h-full ${stringify(variantClasses[variant])} transition-all duration-300`)}${attr_style(`width: ${stringify(percent())}%`)}></div></div></div>`);
}
//#endregion
//#region ../../caui/dist/components/ui/CircularProgress.svelte
function CircularProgress($$renderer, $$props) {
	let { value = 0, size = 40, strokeWidth = 3.5, variant = "brand", class: customClass = "" } = $$props;
	const radius = derived(() => (size - strokeWidth) / 2);
	const circumference = derived(() => 2 * Math.PI * radius());
	const strokeDashoffset = derived(() => circumference() - Math.min(100, Math.max(0, value)) / 100 * circumference());
	$$renderer.push(`<div role="progressbar"${attr("aria-valuenow", value)}${attr("aria-valuemin", 0)}${attr("aria-valuemax", 100)} aria-label="Progress"${attr_class(`relative inline-flex items-center justify-center ${stringify(customClass)}`)}${attr_style(`width: ${stringify(size)}px; height: ${stringify(size)}px;`)}><svg class="transform -rotate-90"${attr("width", size)}${attr("height", size)}><circle${attr("cx", size / 2)}${attr("cy", size / 2)}${attr("r", radius())} stroke="currentColor"${attr("stroke-width", strokeWidth)} fill="transparent" class="text-[var(--ca-surface-subtle)]"></circle><circle${attr("cx", size / 2)}${attr("cy", size / 2)}${attr("r", radius())}${attr("stroke", {
		primary: "var(--ca-brand)",
		secondary: "var(--ca-text-secondary)",
		outline: "var(--ca-border)",
		ghost: "var(--ca-surface-subtle)",
		brand: "var(--ca-brand)",
		neutral: "var(--ca-text-muted)",
		info: "var(--ca-info)",
		success: "var(--ca-success)",
		warning: "var(--ca-warning)",
		danger: "var(--ca-danger)"
	}[variant])}${attr("stroke-width", strokeWidth)} fill="transparent"${attr("stroke-dasharray", circumference())}${attr("stroke-dashoffset", strokeDashoffset())} stroke-linecap="round" class="transition-all duration-300"></circle></svg> <span class="absolute font-mono text-[10px] text-[var(--ca-text-secondary)] font-semibold">${escape_html(Math.round(value))}%</span></div>`);
}
//#endregion
//#region ../../caui/dist/components/ui/Skeleton.svelte
function Skeleton($$renderer, $$props) {
	let { variant = "text", size = "md", class: customClass = "" } = $$props;
	$$renderer.push(`<div role="status" aria-busy="true" aria-label="Loading"${attr_class(`animate-pulse ${stringify({
		text: "rounded-md",
		circular: "rounded-full",
		rectangular: "rounded-sm"
	}[variant])} ${stringify({
		text: {
			sm: "h-3",
			md: "h-4",
			lg: "h-5"
		},
		circular: {
			sm: "w-8 h-8",
			md: "w-10 h-10",
			lg: "w-14 h-14"
		},
		rectangular: {
			sm: "h-16 w-full",
			md: "h-24 w-full",
			lg: "h-32 w-full"
		}
	}[variant][size])} bg-neutral-800/80 ${stringify(customClass)}`)}></div>`);
}
//#endregion
//#region ../../caui/dist/components/ui/toast.svelte.js
var ToastStore = class {
	constructor() {
		_defineProperty(this, "toasts", []);
		_defineProperty(this, "pending", /* @__PURE__ */ new Map());
	}
	show(data) {
		var _data$duration;
		const id = Math.random().toString(36).substring(2, 9);
		const item = {
			...data,
			id
		};
		this.toasts = [...this.toasts, item];
		const dur = (_data$duration = data.duration) !== null && _data$duration !== void 0 ? _data$duration : 4e3;
		if (dur > 0) this.startTimer(id, dur);
	}
	startTimer(id, duration) {
		const timeoutId = setTimeout(() => {
			this.pending.delete(id);
			this.remove(id);
		}, duration);
		this.pending.set(id, {
			timeoutId,
			remaining: duration,
			startedAt: Date.now()
		});
	}
	pause(id) {
		const p = this.pending.get(id);
		if (!p) return;
		clearTimeout(p.timeoutId);
		p.remaining -= Date.now() - p.startedAt;
	}
	resume(id) {
		const p = this.pending.get(id);
		if (!p || p.remaining <= 0) return;
		const remaining = p.remaining;
		this.pending.delete(id);
		this.startTimer(id, remaining);
	}
	success(title, description) {
		this.show({
			title,
			description,
			type: "success"
		});
	}
	error(title, description) {
		this.show({
			title,
			description,
			type: "error"
		});
	}
	info(title, description) {
		this.show({
			title,
			description,
			type: "info"
		});
	}
	warning(title, description) {
		this.show({
			title,
			description,
			type: "warning"
		});
	}
	remove(id) {
		this.toasts = this.toasts.filter((t) => t.id !== id);
		const p = this.pending.get(id);
		if (p) {
			clearTimeout(p.timeoutId);
			this.pending.delete(id);
		}
	}
};
new ToastStore();
//#endregion
//#region ../../caui/dist/components/ui/PinInput.svelte
function PinInput($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { length = 6, value = "", disabled = false, invalid = false, variant = "primary", size = "md", class: customClass = "", oncomplete } = $$props;
		let digits = Array(length).fill("");
		const sizeClasses = {
			sm: "w-8 h-10 text-sm",
			md: "w-10 h-12 text-lg",
			lg: "w-12 h-14 text-xl"
		};
		const variantClasses = {
			primary: "border-[var(--ca-border)] bg-[var(--ca-surface-subtle)]",
			outline: "border-[var(--ca-border)] bg-transparent",
			ghost: "border-transparent bg-transparent"
		};
		$$renderer.push(`<div${attr_class(`flex items-center gap-2 ${stringify(customClass)}`)}><!--[-->`);
		const each_array = ensure_array_like(Array(length));
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			each_array[i];
			$$renderer.push(`<input type="text" inputmode="numeric" maxlength="1"${attr("disabled", disabled, true)}${attr("aria-label", `Digit ${stringify(i + 1)} of ${stringify(length)}`)}${attr("aria-invalid", invalid || void 0)}${attr("autocomplete", i === 0 ? "one-time-code" : void 0)}${attr("value", digits[i])}${attr_class(`text-center font-mono font-bold rounded-lg border transition-all disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] ${stringify(sizeClasses[size])} ${stringify(variantClasses[variant])} ${invalid ? "border-[var(--ca-danger)]" : ""}`)}/>`);
		}
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region ../../caui/dist/components/ui/Textarea.svelte
function Textarea($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { variant = "primary", size = "md", value = "", placeholder = "", rows = 4, disabled = false, readonly = false, required = false, id, label = "", error = "", success = false, class: customClass = "" } = $$props;
		const errorId = uid("textarea-error");
		const variantClasses = {
			primary: "bg-[var(--ca-surface)] border border-[var(--ca-border)] text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] focus:border-[var(--ca-brand)]",
			outline: "bg-transparent border border-[var(--ca-border)] text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] focus:border-[var(--ca-brand)]",
			ghost: "bg-transparent border border-transparent text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] hover:border-[var(--ca-border)] focus:border-[var(--ca-brand)]"
		};
		const sizeClasses = {
			sm: "px-2.5 py-1.5 text-xs",
			md: "px-3 py-2 text-xs",
			lg: "px-3.5 py-2.5 text-sm"
		};
		$$renderer.push(`<div${attr_class(`flex flex-col gap-1.5 w-full text-left ${stringify(customClass)}`)}>`);
		if (label) $$renderer.push(`<!--[0--><label${attr("for", id)} class="text-xs font-medium text-[var(--ca-text-secondary)]">${escape_html(label)}</label>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <textarea${attr("id", id)}${attr("placeholder", placeholder)}${attr("rows", rows)}${attr("disabled", disabled, true)}${attr("readonly", readonly, true)}${attr("required", required, true)}${attr("aria-invalid", !!error || void 0)}${attr("aria-describedby", error ? errorId : void 0)}${attr_class(`w-full rounded-lg ${stringify(variantClasses[variant])} ${stringify(sizeClasses[size])} transition-all disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] ${error ? "border-rose-500 focus:border-rose-500 focus-visible:ring-rose-500" : ""} ${success ? "border-emerald-500" : ""}`)}>`);
		const $$body = escape_html(value);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea> `);
		if (error) $$renderer.push(`<!--[0--><span${attr("id", errorId)} class="text-[11px] text-rose-400">${escape_html(error)}</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region ../../caui/dist/components/ui/ColorPicker.svelte
function ColorPicker($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = DEFAULT_COLOR_PRESETS[2].hex, label = "", presets = DEFAULT_COLOR_PRESETS, variant = "primary", size = "md", class: customClass = "" } = $$props;
		const variantBorderClasses = {
			primary: "border-[var(--ca-border)]",
			outline: "border-[var(--ca-border)]"
		};
		const sizeClasses = {
			sm: "gap-1.5",
			md: "gap-2",
			lg: "gap-3"
		};
		const swatchSizeClasses = {
			sm: "h-4 w-4",
			md: "h-5 w-5",
			lg: "h-6 w-6"
		};
		$$renderer.push(`<div${attr_class(`flex flex-col text-left ${stringify(sizeClasses[size])} ${stringify(customClass)}`)}>`);
		if (label) $$renderer.push(`<!--[0--><label class="text-xs font-medium text-[var(--ca-text-secondary)]">${escape_html(label)}</label>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex items-center gap-3"><div class="relative"><input type="color"${attr("value", value)}${attr_class(`h-8 w-8 rounded cursor-pointer border ${stringify(variantBorderClasses[variant])} bg-[var(--ca-surface-elevated)] p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]`)}/></div> <span class="font-mono text-xs text-[var(--ca-text-secondary)] bg-[var(--ca-surface-elevated)] border border-[var(--ca-border)] px-2 py-1 rounded">${escape_html(value)}</span></div> <div class="flex items-center gap-1.5 pt-1"><!--[-->`);
		const each_array = ensure_array_like(presets);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let preset = each_array[$$index];
			$$renderer.push(`<button type="button"${attr_class(`${stringify(swatchSizeClasses[size])} rounded-full border border-white/20 transition-transform hover:scale-110 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] ${value === preset.hex ? "ring-2 ring-white ring-offset-2 ring-offset-[var(--ca-surface-elevated)]" : ""}`)}${attr_style(`background-color: ${stringify(preset.hex)};`)}${attr("aria-label", `Preset color ${stringify(preset.name)}`)}></button>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
		bind_props($$props, { value });
	});
}
globalThis.Date;
globalThis.Set;
globalThis.Map;
globalThis.URL;
globalThis.URLSearchParams;
//#endregion
//#region ../../caui/dist/components/ui/NumberInput.svelte
function NumberInput($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = 0, min, max, step = 1, disabled = false, readonly = false, placeholder = "", label = "", error = "", id, variant = "primary", size = "md", class: customClass = "", onchange } = $$props;
		const inputId = derived(() => id !== null && id !== void 0 ? id : uid("number-input"));
		const errorId = derived(() => `${inputId()}-error`);
		derived(() => () => {
			let v = value;
			if (min !== void 0) v = Math.max(min, v);
			if (max !== void 0) v = Math.min(max, v);
			return v;
		});
		derived(() => min !== void 0 && value <= min);
		derived(() => max !== void 0 && value >= max);
		const variantClasses = {
			primary: "bg-[var(--ca-surface)] border-[var(--ca-border)] text-[var(--ca-text-primary)]",
			outline: "bg-transparent border-[var(--ca-border)] text-[var(--ca-text-primary)]",
			ghost: "bg-transparent border-transparent text-[var(--ca-text-primary)] hover:border-[var(--ca-border)]"
		};
		const sizeClasses = {
			sm: {
				input: "text-xs px-2",
				button: "h-6 w-6",
				icon: "h-3 w-3"
			},
			md: {
				input: "text-xs px-3",
				button: "h-8 w-8",
				icon: "h-3.5 w-3.5"
			},
			lg: {
				input: "text-sm px-3",
				button: "h-9 w-9",
				icon: "h-4 w-4"
			}
		};
		$$renderer.push(`<div${attr_class(`flex flex-col gap-1.5 w-full ${stringify(customClass)}`)}>`);
		if (label) $$renderer.push(`<!--[0--><label${attr("for", inputId())} class="text-xs font-medium text-[var(--ca-text-secondary)]">${escape_html(label)}</label>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div${attr_class(`flex items-center rounded-lg border transition-colors ${stringify(variantClasses[variant])} ${error ? "border-rose-500" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`)}><button type="button" aria-label="Decrease"${attr("disabled", disabled, true)}${attr_class(`flex items-center justify-center shrink-0 ${stringify(sizeClasses[size].button)} text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-inset`)}>`);
		Minus($$renderer, { class: sizeClasses[size].icon });
		$$renderer.push(`<!----></button> <input type="number"${attr("id", inputId())}${attr("placeholder", placeholder)}${attr("disabled", disabled, true)}${attr("readonly", readonly, true)}${attr("min", min)}${attr("max", max)}${attr("step", step)}${attr("value", value)} role="spinbutton"${attr("aria-valuenow", value)}${attr("aria-valuemin", min)}${attr("aria-valuemax", max)}${attr("aria-invalid", !!error || void 0)}${attr("aria-describedby", error ? errorId() : void 0)}${attr_class(`w-full min-w-0 text-center bg-transparent border-x border-[var(--ca-border)] ${stringify(sizeClasses[size].input)} focus-visible:outline-none disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)]`)}/> <button type="button" aria-label="Increase"${attr("disabled", disabled, true)}${attr_class(`flex items-center justify-center shrink-0 ${stringify(sizeClasses[size].button)} text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-inset`)}>`);
		Plus($$renderer, { class: sizeClasses[size].icon });
		$$renderer.push(`<!----></button></div> `);
		if (error) $$renderer.push(`<!--[0--><span${attr("id", errorId())} class="text-[11px] text-rose-400">${escape_html(error)}</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { value });
	});
}
//#endregion
//#region ../../caui/dist/components/ui/Stepper.svelte
function Stepper($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { steps, current = "", orientation = "horizontal", variant = "primary", size = "md", class: customClass = "", onstepclick } = $$props;
		function getStepStatus(step, index) {
			if (step.status) return step.status;
			const currentIndex = steps.findIndex((s) => s.id === current);
			if (currentIndex < 0) return index === 0 ? "current" : "upcoming";
			if (index < currentIndex) return "complete";
			if (index === currentIndex) return "current";
			return "upcoming";
		}
		const isHorizontal = derived(() => orientation === "horizontal");
		const sizeClasses = {
			sm: {
				circle: "h-6 w-6 text-[10px]",
				text: "text-[11px]",
				desc: "text-[10px]"
			},
			md: {
				circle: "h-8 w-8 text-xs",
				text: "text-xs",
				desc: "text-[11px]"
			},
			lg: {
				circle: "h-10 w-10 text-sm",
				text: "text-sm",
				desc: "text-xs"
			}
		};
		const connectorTop = {
			sm: "12px",
			md: "16px",
			lg: "20px"
		};
		const verticalConnectorMargin = {
			sm: "0.75rem",
			md: "1rem",
			lg: "1.25rem"
		};
		const connectorClasses = {
			primary: "bg-[var(--ca-border)]",
			ghost: "bg-[var(--ca-surface-subtle)]"
		};
		$$renderer.push(`<nav aria-label="Progress"${attr_class(`${isHorizontal() ? "w-full" : ""} ${stringify(customClass)}`)}><ol${attr_class(`flex ${isHorizontal() ? "flex-row items-start" : "flex-col items-start"} gap-0`)} role="list"><!--[-->`);
		const each_array = ensure_array_like(steps);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let step = each_array[index];
			const status = getStepStatus(step, index);
			const isFirst = index === 0;
			const isLast = index === steps.length - 1;
			$$renderer.push(`<li${attr_class(`flex ${isHorizontal() ? "flex-col items-center flex-1" : "flex-row items-start"} relative`)} role="listitem">`);
			if (!isFirst) {
				$$renderer.push("<!--[0-->");
				if (isHorizontal()) $$renderer.push(`<!--[0--><div${attr_class(`absolute left-0 right-1/2 h-0.5 -translate-y-1/2 ${stringify(status === "complete" ? "bg-[var(--ca-success)]" : connectorClasses[variant])}`)}${attr_style(`top: ${stringify(connectorTop[size])}`)} aria-hidden="true"></div> <div${attr_class(`absolute left-1/2 right-0 h-0.5 -translate-y-1/2 ${stringify(status === "complete" ? "bg-[var(--ca-success)]" : connectorClasses[variant])}`)}${attr_style(`top: ${stringify(connectorTop[size])}`)} aria-hidden="true"></div>`);
				else $$renderer.push(`<!--[-1--><div class="flex flex-col items-center"><div${attr_class(`w-0.5 h-4 ${stringify(status === "complete" ? "bg-[var(--ca-success)]" : connectorClasses[variant])}`)} aria-hidden="true"></div></div>`);
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <button type="button"${attr("aria-current", status === "current" ? "step" : void 0)}${attr("aria-label", `${stringify(step.label)}${status === "complete" ? " — complete" : ""}`)}${attr("disabled", status === "upcoming", true)}${attr_class(`relative z-10 flex ${isHorizontal() ? "flex-col items-center" : "flex-row items-start gap-3"} cursor-pointer disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] rounded-lg`)}><div${attr_class(`flex items-center justify-center rounded-full shrink-0 transition-colors ${stringify(sizeClasses[size].circle)} ${status === "complete" ? "bg-[var(--ca-success)] text-white" : status === "current" ? "bg-[var(--ca-brand)] text-white ring-2 ring-[var(--ca-brand)] ring-offset-2 ring-offset-[var(--ca-surface)]" : "bg-[var(--ca-surface-subtle)] text-[var(--ca-text-muted)] border border-[var(--ca-border)]"}`)}>`);
			if (status === "complete") {
				$$renderer.push("<!--[0-->");
				Check($$renderer, { class: "h-3/5 w-3/5" });
			} else $$renderer.push(`<!--[-1--><span class="font-semibold">${escape_html(index + 1)}</span>`);
			$$renderer.push(`<!--]--></div> <div${attr_class(`${isHorizontal() ? "mt-2 text-center" : "pt-1"} ${isHorizontal() ? "max-w-[120px]" : ""}`)}><span${attr_class(`block font-medium leading-tight ${stringify(sizeClasses[size].text)} ${status === "current" ? "text-[var(--ca-text-primary)]" : status === "complete" ? "text-[var(--ca-text-primary)]" : "text-[var(--ca-text-muted)]"}`)}>${escape_html(step.label)}</span> `);
			if (step.description) $$renderer.push(`<!--[0--><span${attr_class(`block mt-0.5 leading-tight ${stringify(sizeClasses[size].desc)} text-[var(--ca-text-muted)]`)}>${escape_html(step.description)}</span>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></button> `);
			if (!isLast && !isHorizontal()) $$renderer.push(`<!--[0--><div class="flex flex-col items-center"${attr_style(`margin-left: ${stringify(verticalConnectorMargin[size])}`)}><div${attr_class(`w-0.5 h-6 ${stringify(status === "complete" ? "bg-[var(--ca-success)]" : connectorClasses[variant])}`)} aria-hidden="true"></div></div>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></li>`);
		}
		$$renderer.push(`<!--]--></ol></nav>`);
		bind_props($$props, { current });
	});
}
//#endregion
//#region ../../caui/dist/components/ui/SearchInput.svelte
function SearchInput($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** Custom search icon override */
		let { size = "md", value = "", placeholder = "Search...", disabled = false, id, label = "", shortcutHint = "", class: customClass = "", oninput, onkeydown, autofocus = false, ref = void 0, searchIcon } = $$props;
		let iconId = derived(() => uid("search-icon"));
		const sizeClasses = {
			sm: "h-8 py-1 text-xs",
			md: "h-9 py-1.5 text-xs",
			lg: "h-10 py-2 text-sm"
		};
		$$renderer.push(`<div${attr_class(`flex flex-col gap-1.5 w-full ${stringify(customClass)}`)}>`);
		if (label) $$renderer.push(`<!--[0--><label${attr("for", id)} class="text-xs font-medium text-[var(--ca-text-secondary)]">${escape_html(label)}</label>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="relative flex items-center w-full"><div class="absolute left-3.5 flex items-center justify-center pointer-events-none text-[var(--ca-text-muted)]"${attr("id", iconId())}>`);
		if (searchIcon) {
			$$renderer.push("<!--[0-->");
			searchIcon($$renderer);
			$$renderer.push(`<!---->`);
		} else $$renderer.push(`<!--[-1--><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`);
		$$renderer.push(`<!--]--></div> <input${attr("id", id)} type="text"${attr("placeholder", placeholder)}${attr("disabled", disabled, true)}${attr("autofocus", autofocus, true)}${attr("value", value)}${attr("aria-label", label || placeholder)}${attr_class(`w-full rounded-lg bg-[var(--ca-surface)] border border-[var(--ca-border)] text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] ${stringify(sizeClasses[size])} pl-10 pr-9 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:border-neutral-900 dark:focus-visible:border-white`)}/> `);
		if (value) $$renderer.push(`<!--[0--><button type="button" class="absolute right-3 text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)] p-1 cursor-pointer transition-colors" aria-label="Clear search"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
		else if (shortcutHint) $$renderer.push(`<!--[1--><span class="absolute right-3 text-[10px] font-mono font-medium text-[var(--ca-text-muted)] border border-[var(--ca-border)] rounded px-1 py-0.5 pointer-events-none">${escape_html(shortcutHint)}</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
		bind_props($$props, {
			value,
			ref
		});
	});
}
//#endregion
//#region ../../caui/dist/components/ui/TotpBadge.svelte
function TotpBadge($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** Stable identifier for the token entry. @default '' */
		/** Raw TOTP code value (may contain spaces). @default '000000' */
		/** Seconds remaining in the current TOTP period. @default 30 */
		/** Total TOTP period length in seconds. @default 30 */
		/** Display name / label for this token. @default 'Authenticator Token' */
		/** Issuer / service name shown as a pill badge. @default '' */
		/** Called when the copy button is activated (after copy succeeds). */
		/** Called when the edit button is clicked (only rendered when provided). */
		/** Called when the delete button is clicked (only rendered when provided). */
		/** Footer note, e.g. encryption / algorithm details. @default 'Zero-Knowledge AES-256-GCM · RFC 6238 TOTP' */
		/**
		* Custom label for the copy button.
		* @default 'Copy Code'
		*/
		/**
		* Label shown on the copy button for a brief moment after copying.
		* @default 'Copied!'
		*/
		/**
		* When true the component will not call any external toast system;
		* callers are expected to use the `onCopy` callback for feedback.
		*/
		let { id = "", token = "000000", remainingSeconds = 30, totalPeriod = 30, label = "", issuer = "", onCopy, onEdit, onDelete, footerNote = "Zero-Knowledge AES-256-GCM · RFC 6238 TOTP", copyLabel = "Copy Code", copiedLabel = "Copied!", silentCopy = true, class: customClass = "" } = $$props;
		const formattedToken = derived(() => {
			const clean = token.replace(/\s+/g, "");
			if (clean.length === 6) return `${clean.slice(0, 3)} ${clean.slice(3)}`;
			return token;
		});
		const displayToken = derived(() => formattedToken());
		const progressPercent = derived(() => Math.max(0, Math.min(100, remainingSeconds / totalPeriod * 100)));
		const strokeDashoffset = derived(() => 100 - progressPercent());
		const timerColor = derived(() => remainingSeconds <= 5 ? "text-rose-500" : remainingSeconds <= 10 ? "text-amber-500" : "text-sky-500 dark:text-sky-400");
		$$renderer.push(`<div${attr_class(`group rounded-xl border p-4 transition-colors bg-white dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 flex flex-col justify-between ${stringify(customClass)}`)} data-caui="totp-badge"${attr("data-id", id || void 0)}><div class="flex items-start gap-3"><span class="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></span> <div class="min-w-0 flex-1"><div class="flex items-center gap-2"><p class="font-semibold text-neutral-900 dark:text-white truncate text-sm">${escape_html(label || "Authenticator Token")}</p> `);
		if (issuer) $$renderer.push(`<!--[0--><span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30 shrink-0">${escape_html(issuer)}</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="flex items-center gap-2 min-w-0 mt-1"><span class="font-mono text-xl sm:text-2xl font-bold tracking-wider text-neutral-900 dark:text-white select-all">${escape_html(displayToken())}</span> <button type="button" class="p-0.5 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"${attr("title", "Hide 2FA Code")}${attr("aria-label", "Hide 2FA Code")}>`);
		$$renderer.push(`<!--[0--><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"></path></svg>`);
		$$renderer.push(`<!--]--></button></div></div> <div class="relative w-9 h-9 flex items-center justify-center shrink-0"><svg class="w-9 h-9 -rotate-90 transform" viewBox="0 0 36 36"><path class="text-neutral-200 dark:text-neutral-800" stroke="currentColor" stroke-width="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path><path${attr_class(`${timerColor()} transition-all duration-1000 ease-linear`)} stroke="currentColor" stroke-width="3" stroke-dasharray="100, 100"${attr("stroke-dashoffset", strokeDashoffset())} stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path></svg> <span${attr_class(`absolute text-[11px] font-mono font-bold ${timerColor()}`)}>${escape_html(remainingSeconds)}</span></div></div> <div class="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-1.5"><span class="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">${escape_html(footerNote)}</span> `);
		if (onEdit) $$renderer.push(`<!--[0--><button type="button" class="ml-auto w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" title="Edit 2FA Key" aria-label="Edit 2FA Key"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16.9 4.1a2.1 2.1 0 013 3L8.5 18.5 4 20l1.5-4.5z"></path></svg></button>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (onDelete) $$renderer.push(`<!--[0--><button type="button" class="w-8 h-8 flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors" title="Delete 2FA Key" aria-label="Delete 2FA Key"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <button type="button" class="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors" title="Copy 2FA Code" aria-label="Copy 2FA Code">`);
		$$renderer.push(`<!--[-1--><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> <span>${escape_html(copyLabel)}</span>`);
		$$renderer.push(`<!--]--></button></div></div>`);
	});
}
//#endregion
//#region ../../caui/dist/components/ui/Pagination.svelte
function Pagination($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { page, pageSize, total, pageSizeOptions = [
			10,
			25,
			50,
			100
		], size = "md", onPageChange, onPageSizeChange, class: customClass = "" } = $$props;
		const pageCount = derived(() => Math.max(1, Math.ceil(total / pageSize)));
		const from = derived(() => total === 0 ? 0 : (page - 1) * pageSize + 1);
		const to = derived(() => Math.min(page * pageSize, total));
		const sizeCls = {
			sm: "text-xs h-7 px-2",
			md: "text-sm h-8 px-2.5",
			lg: "text-base h-10 px-3"
		};
		$$renderer.push(`<nav aria-label="Pagination"${attr_class(`flex items-center justify-between gap-3 flex-wrap text-[var(--ca-text-secondary)] ${stringify(customClass)}`)}><p class="text-xs tabular-nums" aria-live="polite">${escape_html(from())}–${escape_html(to())} of ${escape_html(total)}</p> <div class="flex items-center gap-1.5">`);
		if (onPageSizeChange) {
			$$renderer.push(`<!--[0--><label class="flex items-center gap-1.5 text-xs"><span class="sr-only sm:not-sr-only">Per page</span> `);
			$$renderer.select({
				value: pageSize,
				onchange: (e) => onPageSizeChange(Number(e.currentTarget.value)),
				class: `rounded-md bg-[var(--ca-surface)] border border-[var(--ca-border)] text-[var(--ca-text-primary)] ${stringify(sizeCls[size])} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]`
			}, ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				const each_array = ensure_array_like(pageSizeOptions);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let opt = each_array[$$index];
					$$renderer.option({ value: opt }, ($$renderer) => {
						$$renderer.push(`${escape_html(opt)}`);
					});
				}
				$$renderer.push(`<!--]-->`);
			});
			$$renderer.push(`</label>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <button type="button" aria-label="Previous page"${attr("disabled", page <= 1, true)}${attr_class(`inline-flex items-center justify-center rounded-md border border-[var(--ca-border)] hover:bg-[var(--ca-surface-subtle)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors duration-[var(--ca-motion-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] ${stringify(sizeCls[size])}`)}>`);
		Chevron_left($$renderer, {
			class: "w-4 h-4",
			"aria-hidden": "true"
		});
		$$renderer.push(`<!----></button> <span class="px-2 text-xs tabular-nums">Page ${escape_html(page)} / ${escape_html(pageCount())}</span> <button type="button" aria-label="Next page"${attr("disabled", page >= pageCount(), true)}${attr_class(`inline-flex items-center justify-center rounded-md border border-[var(--ca-border)] hover:bg-[var(--ca-surface-subtle)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors duration-[var(--ca-motion-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] ${stringify(sizeCls[size])}`)}>`);
		Chevron_right($$renderer, {
			class: "w-4 h-4",
			"aria-hidden": "true"
		});
		$$renderer.push(`<!----></button></div></nav>`);
	});
}
//#endregion
//#region ../../caui/dist/components/ui/PageContainer.svelte
function PageContainer($$renderer, $$props) {
	let { children, class: customClass = "" } = $$props;
	$$renderer.push(`<div role="main"${attr_class(`min-h-screen bg-[var(--ca-canvas)] ${stringify(customClass)}`)}>`);
	children === null || children === void 0 || children($$renderer);
	$$renderer.push(`<!----></div>`);
}
//#endregion
//#region ../../caui/dist/components/ui/EmptyState.svelte
function EmptyState($$renderer, $$props) {
	let { title = "No items found", description = "Get started by creating a new item.", icon = "inbox", actionLabel, onaction, class: customClass = "", children, action } = $$props;
	$$renderer.push(`<div${attr_class(`flex flex-col items-center justify-center py-16 px-4 text-center ${stringify(customClass)}`)} role="region"${attr("aria-label", title)}><div class="w-16 h-16 rounded-2xl bg-[var(--ca-surface-subtle,#27272a)] border border-[var(--ca-border,#3f3f46)] flex items-center justify-center text-[var(--ca-text-muted,#a1a1aa)] mb-4 shadow-inner">`);
	if (icon === "inbox") $$renderer.push(`<!--[0--><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>`);
	else if (icon === "notes" || icon === "document") $$renderer.push(`<!--[1--><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`);
	else if (icon === "search") $$renderer.push(`<!--[2--><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`);
	else if (icon === "folder") $$renderer.push(`<!--[3--><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>`);
	else $$renderer.push(`<!--[-1--><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
	$$renderer.push(`<!--]--></div> <h3 class="text-base font-semibold text-[var(--ca-text-primary,#fafafa)]">${escape_html(title)}</h3> <p class="text-xs text-[var(--ca-text-muted,#a1a1aa)] mt-1 max-w-sm leading-relaxed">${escape_html(description)}</p> `);
	if (action) {
		$$renderer.push(`<!--[0--><div class="mt-5">`);
		action($$renderer);
		$$renderer.push(`<!----></div>`);
	} else if (actionLabel && onaction) $$renderer.push(`<!--[1--><button type="button" class="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-[var(--ca-brand,#6366f1)] hover:opacity-90 text-white rounded-lg text-xs font-semibold transition-all shadow-sm cursor-pointer"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> ${escape_html(actionLabel)}</button>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> `);
	children === null || children === void 0 || children($$renderer);
	$$renderer.push(`<!----></div>`);
}
//#endregion
//#region ../../caui/dist/components/PageHeader.svelte
var ACCENTS = {
	violet: "bg-violet-500/10 dark:bg-violet-500/20 border-violet-500/30 text-violet-600 dark:text-violet-400",
	sky: "bg-sky-500/10 dark:bg-sky-500/20 border-sky-500/30 text-sky-600 dark:text-sky-400",
	emerald: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
	amber: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400",
	rose: "bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/30 text-rose-600 dark:text-rose-400",
	cyan: "bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/30 text-cyan-600 dark:text-cyan-400",
	indigo: "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/30 text-indigo-600 dark:text-indigo-400",
	teal: "bg-teal-500/10 dark:bg-teal-500/20 border-teal-500/30 text-teal-600 dark:text-teal-400",
	orange: "bg-orange-500/10 dark:bg-orange-500/20 border-orange-500/30 text-orange-600 dark:text-orange-400",
	pink: "bg-pink-500/10 dark:bg-pink-500/20 border-pink-500/30 text-pink-600 dark:text-pink-400",
	neutral: "bg-neutral-100 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200",
	monochrome: "bg-neutral-100 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200"
};
function PageHeader($$renderer, $$props) {
	let { icon, accent = "sky", title, badge, subtitle, description, actions } = $$props;
	const defaultIcon = "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10";
	const rawIcon = derived(() => icon !== null && icon !== void 0 ? icon : defaultIcon);
	const paths = derived(() => Array.isArray(rawIcon()) ? rawIcon() : [rawIcon()]);
	const accentClass = derived(() => ACCENTS[accent]);
	const displaySubtitle = derived(() => subtitle || description);
	$$renderer.push(`<header class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800/80"><div class="flex items-center gap-3 min-w-0"><div${attr_class(`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${stringify(accentClass())}`)}><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><!--[-->`);
	const each_array = ensure_array_like(paths());
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let d = each_array[$$index];
		$$renderer.push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${attr("d", d)}></path>`);
	}
	$$renderer.push(`<!--]--></svg></div> <div class="min-w-0"><div class="flex items-center gap-2 flex-wrap"><h1 class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">${escape_html(title)}</h1> `);
	if (badge) $$renderer.push(`<!--[0--><span${attr_class(`text-xs px-2 py-0.5 rounded-full font-semibold border ${stringify(accentClass())}`)}>${escape_html(badge)}</span>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div> `);
	if (displaySubtitle()) $$renderer.push(`<!--[0--><p class="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">${escape_html(displaySubtitle())}</p>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div></div> `);
	if (actions) {
		$$renderer.push(`<!--[0--><div class="flex items-center gap-3 shrink-0">`);
		actions($$renderer);
		$$renderer.push(`<!----></div>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></header>`);
}
//#endregion
export { Badge as C, Card as S, RangeSlider as _, TotpBadge as a, Alert as b, NumberInput as c, PinInput as d, Skeleton as f, Accordion as g, Breadcrumb as h, Pagination as i, ColorPicker as l, ProgressBar as m, EmptyState as n, SearchInput as o, CircularProgress as p, PageContainer as r, Stepper as s, PageHeader as t, Textarea as u, Switch as v, Button as w, Input as x, Tabs as y };
