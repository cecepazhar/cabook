import { a as _assertClassBrand, i as _classPrivateFieldSet2, o as _classPrivateFieldInitSpec, r as _classPrivateFieldGet2, s as _checkPrivateRedeclaration } from "./wrapAsyncGenerator.js";
import * as devalue from "devalue";
import { clsx } from "clsx";
//#region ../../caframework/frontend/node_modules/svelte/src/internal/shared/utils.js
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var includes = Array.prototype.includes;
var array_from = Array.from;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
var has_own_property = Object.prototype.hasOwnProperty;
var noop = () => {};
/** @param {Function} fn */
function run(fn) {
	return fn();
}
/** @param {Array<() => void>} arr */
function run_all(arr) {
	for (var i = 0; i < arr.length; i++) arr[i]();
}
/**
* TODO replace with Promise.withResolvers once supported widely enough
* @template [T=void]
*/
function deferred() {
	/** @type {(value: T) => void} */
	var resolve;
	/** @type {(reason: any) => void} */
	var reject;
	return {
		promise: new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve,
		reject
	};
}
/**
* @template V
* @param {V} value
* @param {V | (() => V)} fallback
* @param {boolean} [lazy]
* @returns {V}
*/
function fallback(value, fallback, lazy = false) {
	return value === void 0 ? lazy ? fallback() : fallback : value;
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/reactivity/equality.js
/** @import { Equals } from '#client' */
/** @type {Equals} */
function equals(value) {
	return value === this.v;
}
/**
* @param {unknown} a
* @param {unknown} b
* @returns {boolean}
*/
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
/** @type {Equals} */
function safe_equals(value) {
	return !safe_not_equal(value, this.v);
}
//#endregion
//#region \0@oxc-project+runtime@0.150.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.150.0/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.150.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.150.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/constants.js
var _globalThis$document;
var CLEAN = 1024;
var DIRTY = 2048;
var MAYBE_DIRTY = 4096;
var INERT = 8192;
var DESTROYED = 16384;
/** Set once a reaction has run for the first time */
var REACTION_RAN = 32768;
/** Effect is in the process of getting destroyed. Can be observed in child teardown functions */
var DESTROYING = 1 << 25;
/**
* 'Transparent' effects do not create a transition boundary.
* This is on a block effect 99% of the time but may also be on a branch effect if its parent block effect was pruned
*/
var EFFECT_TRANSPARENT = 65536;
var EFFECT_PRESERVED = 1 << 19;
var USER_EFFECT = 1 << 20;
/**
* Tells that we marked this derived and its reactions as visited during the "mark as (maybe) dirty"-phase.
* Will be lifted during execution of the derived and during checking its dirty state (both are necessary
* because a derived might be checked but not executed). This is a pure performance optimization flag and
* should not be used for any other purpose!
*/
var WAS_MARKED = 65536;
var REACTION_IS_UPDATING = 1 << 21;
var ERROR_VALUE = 1 << 23;
var STATE_SYMBOL = Symbol("$state");
/** Marks component export objects, so that `proxy(...)` leaves them untouched */
var COMPONENT_SYMBOL = Symbol("component");
var LEGACY_PROPS = Symbol("legacy props");
var PROXY_PATH_SYMBOL = Symbol("proxy path");
var ATTRIBUTES_CACHE = Symbol("attributes");
var CLASS_CACHE = Symbol("class");
var STYLE_CACHE = Symbol("style");
var TEXT_CACHE = Symbol("text");
/** allow users to ignore aborted signal errors if `reason.name === 'StaleReactionError` */
var STALE_REACTION = new class StaleReactionError extends Error {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "StaleReactionError");
		_defineProperty(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
	}
}();
(_globalThis$document = globalThis.document) !== null && _globalThis$document !== void 0 && _globalThis$document.contentType;
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/constants.js
var HYDRATION_ERROR = {};
var UNINITIALIZED = Symbol("uninitialized");
/**
* Reading a derived belonging to a now-destroyed effect may result in stale values
*/
function derived_inert() {
	console.warn(`https://svelte.dev/e/derived_inert`);
}
/**
* Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near %location%
* @param {string | undefined | null} [location]
*/
function hydration_mismatch(location) {
	console.warn(`https://svelte.dev/e/hydration_mismatch`);
}
/**
* Tried to unmount a component that was not mounted
*/
function lifecycle_double_unmount() {
	console.warn(`https://svelte.dev/e/lifecycle_double_unmount`);
}
/**
* A `<svelte:boundary>` `reset` function only resets the boundary the first time it is called
*/
function svelte_boundary_reset_noop() {
	console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/dom/hydration.js
/** @import { TemplateNode } from '#client' */
/**
* Use this variable to guard everything related to hydration code so it can be treeshaken out
* if the user doesn't use the `hydrate` method and these code paths are therefore not needed.
*/
var hydrating = false;
/** @param {boolean} value */
function set_hydrating(value) {
	hydrating = value;
}
/**
* The node that is currently being hydrated. This starts out as the first node inside the opening
* <!--[--> comment, and updates each time a component calls `$.child(...)` or `$.sibling(...)`.
* When entering a block (e.g. `{#if ...}`), `hydrate_node` is the block opening comment; by the
* time we leave the block it is the closing comment, which serves as the block's anchor.
* @type {TemplateNode}
*/
var hydrate_node;
/** @param {TemplateNode | null} node */
function set_hydrate_node(node) {
	if (node === null) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	return hydrate_node = node;
}
function hydrate_next() {
	return set_hydrate_node(/* @__PURE__ */ get_next_sibling(hydrate_node));
}
function next(count = 1) {
	if (hydrating) {
		var i = count;
		var node = hydrate_node;
		while (i--) node = /* @__PURE__ */ get_next_sibling(node);
		hydrate_node = node;
	}
}
/**
* Skips or removes (depending on {@link remove}) all nodes starting at `hydrate_node` up until the next hydration end comment
* @param {boolean} remove
*/
function skip_nodes(remove = true) {
	var depth = 0;
	var node = hydrate_node;
	while (true) {
		if (node.nodeType === 8) {
			var data = node.data;
			if (data === "]") {
				if (depth === 0) return node;
				depth -= 1;
			} else if (data === "[" || data === "[!" || data[0] === "[" && !isNaN(Number(data.slice(1)))) depth += 1;
		}
		var next = /* @__PURE__ */ get_next_sibling(node);
		if (remove) node.remove();
		node = next;
	}
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/shared/errors.js
/**
* Cannot use `%name%(...)` unless the `experimental.async` compiler option is `true`
* @param {string} name
* @returns {never}
*/
function experimental_async_required(name) {
	throw new Error(`https://svelte.dev/e/experimental_async_required`);
}
/**
* `%name%(...)` can only be used during component initialisation
* @param {string} name
* @returns {never}
*/
function lifecycle_outside_component(name) {
	throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
}
/**
* Context was not set in the current component or any of its ancestors
* @returns {never}
*/
function missing_context() {
	throw new Error(`https://svelte.dev/e/missing_context`);
}
/**
* Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
* @returns {never}
*/
function effect_update_depth_exceeded() {
	throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
}
/**
* Failed to hydrate the application
* @returns {never}
*/
function hydration_failed() {
	throw new Error(`https://svelte.dev/e/hydration_failed`);
}
/**
* Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
* @returns {never}
*/
function state_descriptors_fixed() {
	throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
}
/**
* Cannot set prototype of `$state` object
* @returns {never}
*/
function state_prototype_fixed() {
	throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
}
/**
* Updating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
* @returns {never}
*/
function state_unsafe_mutation() {
	throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
}
/**
* A `<svelte:boundary>` `reset` function cannot be called while an error is still being handled
* @returns {never}
*/
function svelte_boundary_reset_onerror() {
	throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/flags/index.js
/** True if experimental.async=true */
var async_mode_flag = false;
/** True if we're not certain that we only have Svelte 5 code in the compilation */
var legacy_mode_flag = false;
/**
* @param {Value} source
* @param {string} label
*/
function tag(source, label) {
	source.label = label;
	tag_proxy(source.v, label);
	return source;
}
/**
* @param {unknown} value
* @param {string} label
*/
function tag_proxy(value, label) {
	var _value$PROXY_PATH_SYM;
	value === null || value === void 0 || (_value$PROXY_PATH_SYM = value[PROXY_PATH_SYMBOL]) === null || _value$PROXY_PATH_SYM === void 0 || _value$PROXY_PATH_SYM.call(value, label);
	return value;
}
/**
* @returns {string[]}
*/
function get_stack() {
	const limit = Error.stackTraceLimit;
	Error.stackTraceLimit = Infinity;
	const stack = (/* @__PURE__ */ new Error()).stack;
	Error.stackTraceLimit = limit;
	if (!stack) return [];
	const lines = stack.split("\n");
	const new_lines = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const posixified = line.replaceAll("\\", "/");
		if (line.trim() === "Error") continue;
		if (line.includes("validate_each_keys")) return [];
		if (posixified.includes("svelte/src/internal") || posixified.includes("node_modules/.vite")) continue;
		new_lines.push(line);
	}
	return new_lines;
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/shared/context.js
/**
* @template T
* @param {(key: object) => T} get_context
* @param {(key: object, context: T) => T} set_context
* @param {(key: object) => boolean} has_context
* @returns {[() => T, (context: T) => T, () => boolean]}
*/
function create_context(get_context, set_context, has_context) {
	const key = {};
	return [
		() => {
			if (!has_context(key)) missing_context();
			return get_context(key);
		},
		(context) => set_context(key, context),
		() => has_context(key)
	];
}
/**
* @typedef {{ p: Context | null, c: Map<unknown, unknown> | null }} Context
*/
/**
* @param {Context} context
* @returns {Map<unknown, unknown> | null}
*/
function get_parent_context(context) {
	var _parent$c;
	let parent = context.p;
	while (parent !== null && parent.c === null) parent = parent.p;
	return (_parent$c = parent === null || parent === void 0 ? void 0 : parent.c) !== null && _parent$c !== void 0 ? _parent$c : null;
}
/**
* @param {Context | null} context
* @param {string} name
* @returns {Map<unknown, unknown>}
*/
function get_or_init_context_map(context, name) {
	var _context$c;
	if (context === null) lifecycle_outside_component(name);
	return (_context$c = context.c) !== null && _context$c !== void 0 ? _context$c : context.c = new Map(get_parent_context(context) || void 0);
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/context.js
/** @import { ComponentContext, DevStackEntry, Effect } from '#client' */
/** @type {ComponentContext | null} */
var component_context = null;
/** @param {ComponentContext | null} context */
function set_component_context(context) {
	component_context = context;
}
/**
* @param {Record<string, unknown>} props
* @param {any} runes
* @param {Function} [fn]
* @returns {void}
*/
function push$1(props, runes = false, fn) {
	component_context = {
		p: component_context,
		i: false,
		c: null,
		e: null,
		s: props,
		x: null,
		r: active_effect,
		l: legacy_mode_flag && !runes ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
/**
* @template {Record<string, any>} T
* @param {T} [component]
* @returns {T}
*/
function pop$1(component) {
	var context = component_context;
	var effects = context.e;
	if (effects !== null) {
		context.e = null;
		for (var fn of effects) create_user_effect(fn);
	}
	if (component !== void 0) context.x = component;
	context.i = true;
	component_context = context.p;
	return mark_as_component(component);
}
/**
* Add a symbol to the object (or create one if undefined) to mark it as a component so it isn't proxified.
* @param {any} component
*/
function mark_as_component(component = {}) {
	define_property(component, COMPONENT_SYMBOL, { value: true });
	return component;
}
/** @returns {boolean} */
function is_runes() {
	return !legacy_mode_flag || component_context !== null && component_context.l === null;
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/dom/task.js
/** @type {Array<() => void>} */
var micro_tasks = [];
function run_micro_tasks() {
	var tasks = micro_tasks;
	micro_tasks = [];
	run_all(tasks);
}
/**
* @param {() => void} fn
*/
function queue_micro_task(fn) {
	if (micro_tasks.length === 0 && !is_flushing_sync) {
		var tasks = micro_tasks;
		queueMicrotask(() => {
			if (tasks === micro_tasks) run_micro_tasks();
		});
	}
	micro_tasks.push(fn);
}
/**
* Synchronously run any queued tasks.
*/
function flush_tasks() {
	while (micro_tasks.length > 0) run_micro_tasks();
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/reactivity/status.js
/** @import { Derived, Signal } from '#client' */
var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
/**
* @param {Signal} signal
* @param {number} status
*/
function set_signal_status(signal, status) {
	signal.f = signal.f & STATUS_MASK | status;
}
/**
* Set a derived's status to CLEAN or MAYBE_DIRTY based on its connection state.
* @param {Derived} derived
*/
function update_derived_status(derived) {
	if ((derived.f & 512) !== 0 || derived.deps === null) set_signal_status(derived, CLEAN);
	else set_signal_status(derived, MAYBE_DIRTY);
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/reactivity/utils.js
/** @import { Derived, Effect, Value } from '#client' */
/**
* @param {Value[] | null} deps
*/
function clear_marked(deps) {
	if (deps === null) return;
	for (const dep of deps) {
		if ((dep.f & 2) === 0 || (dep.f & 65536) === 0) continue;
		dep.f ^= WAS_MARKED;
		clear_marked(
			/** @type {Derived} */
			dep.deps
		);
	}
}
/**
* @param {Effect} effect
* @param {Set<Effect>} dirty_effects
* @param {Set<Effect>} maybe_dirty_effects
*/
function defer_effect(effect, dirty_effects, maybe_dirty_effects) {
	if ((effect.f & 2048) !== 0) dirty_effects.add(effect);
	else if ((effect.f & 4096) !== 0) maybe_dirty_effects.add(effect);
	clear_marked(effect.deps);
	set_signal_status(effect, CLEAN);
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/reactivity/store.js
/**
* We set this to `true` when updating a store so that we correctly
* schedule effects if the update takes place inside a `$:` effect
*/
var legacy_is_updating_store = false;
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
/**
* @template T
* @param {() => T} fn
*/
function without_reactive_context(fn) {
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		return fn();
	} finally {
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
var OBSOLETE = Symbol("obsolete");
/**
* @param {Derived} derived
* @returns {void}
*/
function destroy_derived_effects(derived) {
	var effects = derived.effects;
	if (effects !== null) {
		derived.effects = null;
		for (var i = 0; i < effects.length; i += 1) destroy_effect(effects[i]);
	}
}
/**
* @template T
* @param {Derived} derived
* @returns {T}
*/
function execute_derived(derived) {
	var value;
	var prev_active_effect = active_effect;
	var parent = derived.parent;
	if (!is_destroying_effect && parent !== null && derived.v !== UNINITIALIZED && (parent.f & 24576) !== 0) {
		derived_inert();
		return derived.v;
	}
	set_active_effect(parent);
	try {
		derived.f &= ~WAS_MARKED;
		destroy_derived_effects(derived);
		value = update_reaction(derived);
	} finally {
		set_active_effect(prev_active_effect);
	}
	return value;
}
/**
* @param {Derived} derived
* @returns {void}
*/
function update_derived(derived) {
	var value = execute_derived(derived);
	if (!derived.equals(value)) {
		derived.wv = increment_write_version();
		if (!(current_batch === null || current_batch === void 0 ? void 0 : current_batch.is_fork) || derived.deps === null) {
			if (current_batch !== null) {
				current_batch.capture(derived, value, true);
				previous_batch === null || previous_batch === void 0 || previous_batch.capture(derived, value, true);
			} else derived.v = value;
			if (derived.deps === null) {
				set_signal_status(derived, CLEAN);
				return;
			}
		}
	}
	if (is_destroying_effect) return;
	if (batch_values !== null) {
		if (effect_tracking() || (current_batch === null || current_batch === void 0 ? void 0 : current_batch.is_fork)) batch_values.set(derived, value);
	} else update_derived_status(derived);
}
/**
* @param {Derived} derived
*/
function freeze_derived_effects(derived) {
	if (derived.effects === null) return;
	for (const e of derived.effects) if (e.teardown || e.ac) {
		var _e$teardown;
		(_e$teardown = e.teardown) === null || _e$teardown === void 0 || _e$teardown.call(e);
		if (e.ac !== null) without_reactive_context(() => {
			/** @type {AbortController} */ e.ac.abort(STALE_REACTION);
			e.ac = null;
		});
		if (e.fn !== null) e.teardown = noop;
		remove_reactions(e, 0);
		destroy_effect_children(e);
	}
}
/**
* @param {Derived} derived
*/
function unfreeze_derived_effects(derived) {
	if (derived.effects === null) return;
	for (const e of derived.effects) if (e.teardown && e.fn !== null) update_effect(e);
}
//#endregion
//#region \0@oxc-project+runtime@0.150.0/helpers/esm/classPrivateMethodInitSpec.js
function _classPrivateMethodInitSpec(e, a) {
	_checkPrivateRedeclaration(e, a), a.add(e);
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/reactivity/batch.js
/** @import { Fork } from 'svelte' */
/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
var _Batch;
/** @type {Batch | null} */
var first_batch = null;
/** @type {Batch | null} */
var last_batch = null;
/** @type {Batch | null} */
var current_batch = null;
/**
* This is needed to avoid overwriting inputs
* @type {Batch | null}
*/
var previous_batch = null;
/**
* When time travelling (i.e. working in one batch, while other batches
* still have ongoing work), we ignore the real values of affected
* signals in favour of their values within the batch
* @type {Map<Value, any> | null}
*/
var batch_values = null;
/** @type {Effect | null} */
var last_scheduled_effect = null;
var is_flushing_sync = false;
var is_processing = false;
/**
* During traversal, this is an array. Newly created effects are (if not immediately
* executed) pushed to this array, rather than going through the scheduling
* rigamarole that would cause another turn of the flush loop.
* @type {Effect[] | null}
*/
var collected_effects = null;
/**
* An array of effects that are marked during traversal as a result of a `set`
* (not `internal_set`) call. These will be added to the next batch and
* trigger another `batch.process()`
* @type {Effect[] | null}
* @deprecated when we get rid of legacy mode and stores, we can get rid of this
*/
var legacy_updates = null;
var flush_count = 0;
var uid = 1;
var _started = /* @__PURE__ */ new WeakMap();
var _prev = /* @__PURE__ */ new WeakMap();
var _next = /* @__PURE__ */ new WeakMap();
var _commit_callbacks = /* @__PURE__ */ new WeakMap();
var _discard_callbacks = /* @__PURE__ */ new WeakMap();
var _pending$1 = /* @__PURE__ */ new WeakMap();
var _blocking_pending = /* @__PURE__ */ new WeakMap();
var _deferred = /* @__PURE__ */ new WeakMap();
var _roots = /* @__PURE__ */ new WeakMap();
var _new_effects = /* @__PURE__ */ new WeakMap();
var _dirty_effects = /* @__PURE__ */ new WeakMap();
var _maybe_dirty_effects = /* @__PURE__ */ new WeakMap();
var _skipped_branches = /* @__PURE__ */ new WeakMap();
var _unskipped_branches = /* @__PURE__ */ new WeakMap();
var _decrement_queued = /* @__PURE__ */ new WeakMap();
var _Batch_brand = /* @__PURE__ */ new WeakSet();
var Batch = class Batch {
	constructor() {
		_classPrivateMethodInitSpec(this, _Batch_brand);
		_defineProperty(this, "id", uid++);
		_classPrivateFieldInitSpec(this, _started, false);
		_defineProperty(this, "linked", true);
		_classPrivateFieldInitSpec(this, _prev, null);
		_classPrivateFieldInitSpec(this, _next, null);
		_defineProperty(
			this,
			/** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
			"async_deriveds",
			/* @__PURE__ */ new Map()
		);
		_defineProperty(
			this,
			/**
			* The current values of any signals that are updated in this batch.
			* Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
			* They keys of this map are identical to `this.#previous`
			* @type {Map<Value, [any, boolean]>}
			*/
			"current",
			/* @__PURE__ */ new Map()
		);
		_defineProperty(
			this,
			/**
			* The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
			* They keys of this map are identical to `this.#current`
			* @type {Map<Value, any>}
			*/
			"previous",
			/* @__PURE__ */ new Map()
		);
		_classPrivateFieldInitSpec(this, _commit_callbacks, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _discard_callbacks, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _pending$1, 0);
		_classPrivateFieldInitSpec(this, _blocking_pending, /* @__PURE__ */ new Map());
		_classPrivateFieldInitSpec(this, _deferred, null);
		_classPrivateFieldInitSpec(this, _roots, []);
		_classPrivateFieldInitSpec(this, _new_effects, []);
		_classPrivateFieldInitSpec(this, _dirty_effects, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _maybe_dirty_effects, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _skipped_branches, /* @__PURE__ */ new Map());
		_classPrivateFieldInitSpec(this, _unskipped_branches, /* @__PURE__ */ new Set());
		_defineProperty(this, "is_fork", false);
		_classPrivateFieldInitSpec(this, _decrement_queued, false);
		if (last_batch === null) first_batch = last_batch = this;
		else {
			_classPrivateFieldSet2(_next, last_batch, this);
			_classPrivateFieldSet2(_prev, this, last_batch);
		}
		last_batch = this;
	}
	/**
	* Add an effect to the #skipped_branches map and reset its children
	* @param {Effect} effect
	*/
	skip_effect(effect) {
		if (!_classPrivateFieldGet2(_skipped_branches, this).has(effect)) _classPrivateFieldGet2(_skipped_branches, this).set(effect, {
			d: [],
			m: []
		});
		_classPrivateFieldGet2(_unskipped_branches, this).delete(effect);
	}
	/**
	* Remove an effect from the #skipped_branches map and reschedule
	* any tracked dirty/maybe_dirty child effects
	* @param {Effect} effect
	* @param {(e: Effect) => void} callback
	*/
	unskip_effect(effect, callback = (e) => this.schedule(e)) {
		var tracked = _classPrivateFieldGet2(_skipped_branches, this).get(effect);
		if (tracked) {
			_classPrivateFieldGet2(_skipped_branches, this).delete(effect);
			for (var e of tracked.d) {
				set_signal_status(e, DIRTY);
				callback(e);
			}
			for (e of tracked.m) {
				set_signal_status(e, MAYBE_DIRTY);
				callback(e);
			}
		}
		_classPrivateFieldGet2(_unskipped_branches, this).add(effect);
	}
	/**
	* Associate a change to a given source with the current
	* batch, noting its previous and current values
	* @param {Value} source
	* @param {any} value
	* @param {boolean} [is_derived]
	*/
	capture(source, value, is_derived = false) {
		if (source.v !== UNINITIALIZED && !this.previous.has(source)) this.previous.set(source, source.v);
		if ((source.f & 8388608) === 0) {
			this.current.set(source, [value, is_derived]);
			batch_values === null || batch_values === void 0 || batch_values.set(source, value);
		}
		if (!this.is_fork) source.v = value;
	}
	activate() {
		current_batch = this;
	}
	deactivate() {
		current_batch = null;
		batch_values = null;
	}
	flush() {
		try {
			is_processing = true;
			current_batch = this;
			_assertClassBrand(_Batch_brand, this, _process).call(this);
		} finally {
			flush_count = 0;
			last_scheduled_effect = null;
			collected_effects = null;
			legacy_updates = null;
			is_processing = false;
			current_batch = null;
			batch_values = null;
			old_values.clear();
		}
	}
	discard() {
		var _classPrivateFieldGet3;
		for (const fn of _classPrivateFieldGet2(_discard_callbacks, this)) fn(this);
		_classPrivateFieldGet2(_discard_callbacks, this).clear();
		for (const deferred of this.async_deriveds.values()) deferred.reject(OBSOLETE);
		_assertClassBrand(_Batch_brand, this, _unlink).call(this);
		(_classPrivateFieldGet3 = _classPrivateFieldGet2(_deferred, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.resolve();
	}
	/**
	* @param {Effect} effect
	*/
	register_created_effect(effect) {
		_classPrivateFieldGet2(_new_effects, this).push(effect);
	}
	/**
	* @param {boolean} blocking
	* @param {Effect} effect
	*/
	increment(blocking, effect) {
		_classPrivateFieldSet2(_pending$1, this, _classPrivateFieldGet2(_pending$1, this) + 1);
		if (blocking) {
			var _this$blocking_pendin;
			let blocking_pending_count = (_this$blocking_pendin = _classPrivateFieldGet2(_blocking_pending, this).get(effect)) !== null && _this$blocking_pendin !== void 0 ? _this$blocking_pendin : 0;
			_classPrivateFieldGet2(_blocking_pending, this).set(effect, blocking_pending_count + 1);
		}
	}
	/**
	* @param {boolean} blocking
	* @param {Effect} effect
	*/
	decrement(blocking, effect) {
		_classPrivateFieldSet2(_pending$1, this, _classPrivateFieldGet2(_pending$1, this) - 1);
		if (blocking) {
			var _this$blocking_pendin2;
			let blocking_pending_count = (_this$blocking_pendin2 = _classPrivateFieldGet2(_blocking_pending, this).get(effect)) !== null && _this$blocking_pendin2 !== void 0 ? _this$blocking_pendin2 : 0;
			if (blocking_pending_count === 1) _classPrivateFieldGet2(_blocking_pending, this).delete(effect);
			else _classPrivateFieldGet2(_blocking_pending, this).set(effect, blocking_pending_count - 1);
		}
		if (_classPrivateFieldGet2(_decrement_queued, this)) return;
		_classPrivateFieldSet2(_decrement_queued, this, true);
		queue_micro_task(() => {
			_classPrivateFieldSet2(_decrement_queued, this, false);
			if (this.linked) this.flush();
		});
	}
	/**
	* @param {Set<Effect>} dirty_effects
	* @param {Set<Effect>} maybe_dirty_effects
	*/
	transfer_effects(dirty_effects, maybe_dirty_effects) {
		for (const e of dirty_effects) _classPrivateFieldGet2(_dirty_effects, this).add(e);
		for (const e of maybe_dirty_effects) _classPrivateFieldGet2(_maybe_dirty_effects, this).add(e);
		dirty_effects.clear();
		maybe_dirty_effects.clear();
	}
	/** @param {(batch: Batch) => void} fn */
	oncommit(fn) {
		_classPrivateFieldGet2(_commit_callbacks, this).add(fn);
	}
	/** @param {(batch: Batch) => void} fn */
	ondiscard(fn) {
		_classPrivateFieldGet2(_discard_callbacks, this).add(fn);
	}
	settled() {
		var _classPrivateFieldGet4;
		return ((_classPrivateFieldGet4 = _classPrivateFieldGet2(_deferred, this)) !== null && _classPrivateFieldGet4 !== void 0 ? _classPrivateFieldGet4 : _classPrivateFieldSet2(_deferred, this, deferred())).promise;
	}
	static ensure() {
		if (current_batch === null) {
			const batch = current_batch = new Batch();
			if (!is_processing && !is_flushing_sync) queue_micro_task(() => {
				if (!_classPrivateFieldGet2(_started, batch)) batch.flush();
			});
		}
		return current_batch;
	}
	apply() {
		if (!async_mode_flag || !this.is_fork && _classPrivateFieldGet2(_prev, this) === null && _classPrivateFieldGet2(_next, this) === null) {
			batch_values = null;
			return;
		}
		batch_values = /* @__PURE__ */ new Map();
		for (const [source, [value]] of this.current) batch_values.set(source, value);
		for (let batch = first_batch; batch !== null; batch = _classPrivateFieldGet2(_next, batch)) {
			if (batch === this || batch.is_fork) continue;
			var intersects = false;
			if (batch.id < this.id) for (const [source, [, is_derived]] of batch.current) {
				if (is_derived) continue;
				if (this.current.has(source)) {
					intersects = true;
					break;
				}
			}
			if (!intersects) {
				for (const [source, previous] of batch.previous) if (!batch_values.has(source)) batch_values.set(source, previous);
			}
		}
	}
	/**
	*
	* @param {Effect} effect
	*/
	schedule(effect) {
		var _effect$b;
		last_scheduled_effect = effect;
		if (((_effect$b = effect.b) === null || _effect$b === void 0 ? void 0 : _effect$b.is_pending) && (effect.f & 16777228) !== 0 && (effect.f & 32768) === 0) {
			effect.b.defer_effect(effect);
			return;
		}
		var e = effect;
		while (e.parent !== null) {
			e = e.parent;
			var flags = e.f;
			if (collected_effects !== null && e === active_effect) {
				if (async_mode_flag) return;
				if ((active_reaction === null || (active_reaction.f & 2) === 0) && !legacy_is_updating_store) return;
			}
			if ((flags & 96) !== 0) {
				if ((flags & 1024) === 0) return;
				e.f ^= CLEAN;
			}
		}
		_classPrivateFieldGet2(_roots, this).push(e);
	}
};
_Batch = Batch;
function _is_deferred() {
	if (this.is_fork) return true;
	for (const effect of _classPrivateFieldGet2(_blocking_pending, this).keys()) {
		var e = effect;
		var skipped = false;
		while (e.parent !== null) {
			if (_classPrivateFieldGet2(_skipped_branches, this).has(e)) {
				skipped = true;
				break;
			}
			e = e.parent;
		}
		if (!skipped) return true;
	}
	return false;
}
function _process() {
	var _classPrivateFieldGet2$2;
	_classPrivateFieldSet2(_started, this, true);
	if (flush_count++ > 1e3) {
		_assertClassBrand(_Batch_brand, this, _unlink).call(this);
		infinite_loop_guard();
	}
	for (const e of _classPrivateFieldGet2(_dirty_effects, this)) {
		_classPrivateFieldGet2(_maybe_dirty_effects, this).delete(e);
		set_signal_status(e, DIRTY);
		this.schedule(e);
	}
	for (const e of _classPrivateFieldGet2(_maybe_dirty_effects, this)) {
		set_signal_status(e, MAYBE_DIRTY);
		this.schedule(e);
	}
	const roots = _classPrivateFieldGet2(_roots, this);
	_classPrivateFieldSet2(_roots, this, []);
	this.apply();
	/** @type {Effect[]} */
	var effects = collected_effects = [];
	/** @type {Effect[]} */
	var render_effects = [];
	/**
	* @type {Effect[]}
	* @deprecated when we get rid of legacy mode and stores, we can get rid of this
	*/
	var updates = legacy_updates = [];
	for (const root of roots) try {
		_assertClassBrand(_Batch_brand, this, _traverse).call(this, root, effects, render_effects);
	} catch (e) {
		reset_all(root);
		if (!_assertClassBrand(_Batch_brand, this, _is_deferred).call(this)) this.discard();
		throw e;
	}
	current_batch = null;
	if (updates.length > 0) {
		var batch = _Batch.ensure();
		for (const e of updates) batch.schedule(e);
	}
	collected_effects = null;
	legacy_updates = null;
	if (_assertClassBrand(_Batch_brand, this, _is_deferred).call(this)) {
		_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, render_effects);
		_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, effects);
		for (const [e, t] of _classPrivateFieldGet2(_skipped_branches, this)) reset_branch(e, t);
		if (updates.length > 0)
 /** @type {Batch} */ _assertClassBrand(_Batch_brand, current_batch, _process).call(current_batch);
		return;
	}
	const earlier_batch = _assertClassBrand(_Batch_brand, this, _find_earlier_batch).call(this);
	if (earlier_batch) {
		_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, render_effects);
		_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, effects);
		_assertClassBrand(_Batch_brand, earlier_batch, _merge).call(earlier_batch, this);
		return;
	}
	_classPrivateFieldGet2(_dirty_effects, this).clear();
	_classPrivateFieldGet2(_maybe_dirty_effects, this).clear();
	for (const fn of _classPrivateFieldGet2(_commit_callbacks, this)) fn(this);
	_classPrivateFieldGet2(_commit_callbacks, this).clear();
	previous_batch = this;
	flush_queued_effects(render_effects);
	flush_queued_effects(effects);
	previous_batch = null;
	(_classPrivateFieldGet2$2 = _classPrivateFieldGet2(_deferred, this)) === null || _classPrivateFieldGet2$2 === void 0 || _classPrivateFieldGet2$2.resolve();
	var next_batch = current_batch;
	if (_classPrivateFieldGet2(_pending$1, this) === 0 && (_classPrivateFieldGet2(_roots, this).length === 0 || next_batch !== null)) {
		_assertClassBrand(_Batch_brand, this, _unlink).call(this);
		if (async_mode_flag) {
			_assertClassBrand(_Batch_brand, this, _commit).call(this);
			current_batch = next_batch;
		}
	}
	if (_classPrivateFieldGet2(_roots, this).length > 0) {
		if (next_batch !== null) {
			const batch = next_batch;
			_classPrivateFieldGet2(_roots, batch).push(..._classPrivateFieldGet2(_roots, this).filter((r) => !_classPrivateFieldGet2(_roots, batch).includes(r)));
		} else next_batch = this;
	}
	if (next_batch !== null) {
		old_values.clear();
		_assertClassBrand(_Batch_brand, next_batch, _process).call(next_batch);
	}
}
/**
* Traverse the effect tree, executing effects or stashing
* them for later execution as appropriate
* @param {Effect} root
* @param {Effect[]} effects
* @param {Effect[]} render_effects
*/
function _traverse(root, effects, render_effects) {
	root.f ^= CLEAN;
	var effect = root.first;
	while (effect !== null) {
		var flags = effect.f;
		var is_branch = (flags & 96) !== 0;
		if (!(is_branch && (flags & 1024) !== 0 || (flags & 8192) !== 0 || _classPrivateFieldGet2(_skipped_branches, this).has(effect)) && effect.fn !== null) {
			if (is_branch) effect.f ^= CLEAN;
			else if ((flags & 4) !== 0) effects.push(effect);
			else if (async_mode_flag && (flags & 16777224) !== 0) render_effects.push(effect);
			else if (is_dirty(effect)) {
				if ((flags & 16) !== 0) _classPrivateFieldGet2(_maybe_dirty_effects, this).add(effect);
				update_effect(effect);
			}
			var child = effect.first;
			if (child !== null) {
				effect = child;
				continue;
			}
		}
		while (effect !== null) {
			var next = effect.next;
			if (next !== null) {
				effect = next;
				break;
			}
			effect = effect.parent;
		}
	}
}
function _find_earlier_batch() {
	var batch = _classPrivateFieldGet2(_prev, this);
	while (batch !== null) {
		if (!batch.is_fork) {
			for (const [value, [, is_derived]] of this.current) if (batch.current.has(value) && !is_derived) return batch;
		}
		batch = _classPrivateFieldGet2(_prev, batch);
	}
	return null;
}
/**
* @param {Batch} batch
*/
function _merge(batch) {
	for (const [source, value] of batch.current) {
		if (!this.previous.has(source) && batch.previous.has(source)) this.previous.set(source, batch.previous.get(source));
		this.current.set(source, value);
	}
	for (const [effect, deferred] of batch.async_deriveds) {
		const d = this.async_deriveds.get(effect);
		if (d) deferred.promise.then(d.resolve).catch(d.reject);
	}
	batch.async_deriveds.clear();
	this.transfer_effects(_classPrivateFieldGet2(_dirty_effects, batch), _classPrivateFieldGet2(_maybe_dirty_effects, batch));
	/**
	* mark all effects that depend on `batch.current`, except the
	* async effects that we just resolved (TODO unless they depend
	* on values in this batch that are NOT in the later batch?).
	* Through this we also will populate the correct #skipped_branches,
	* oncommit callbacks etc, so we don't need to merge them separately.
	* @param {Value} value
	*/
	const mark = (value) => {
		var reactions = value.reactions;
		if (reactions === null) return;
		if ((value.f & 2) !== 0 && (value.f & 6144) === 0) return;
		for (const reaction of reactions) {
			var flags = reaction.f;
			if ((flags & 2) !== 0) mark(reaction);
			else {
				var effect = reaction;
				if (flags & 4194320 && !this.async_deriveds.has(effect)) {
					_classPrivateFieldGet2(_maybe_dirty_effects, this).delete(effect);
					set_signal_status(effect, DIRTY);
					this.schedule(effect);
				}
			}
		}
	};
	for (const source of this.current.keys()) mark(source);
	this.oncommit(() => batch.discard());
	_assertClassBrand(_Batch_brand, batch, _unlink).call(batch);
	current_batch = this;
	_assertClassBrand(_Batch_brand, this, _process).call(this);
}
/**
* @param {Effect[]} effects
*/
function _defer_effects(effects) {
	for (var i = 0; i < effects.length; i += 1) defer_effect(effects[i], _classPrivateFieldGet2(_dirty_effects, this), _classPrivateFieldGet2(_maybe_dirty_effects, this));
}
function _commit() {
	for (let batch = first_batch; batch !== null; batch = _classPrivateFieldGet2(_next, batch)) {
		var is_earlier = batch.id < this.id;
		/** @type {Source[]} */
		var sources = [];
		for (const [source, [value, is_derived]] of this.current) {
			if (batch.current.has(source)) {
				var batch_value = batch.current.get(source)[0];
				if (is_earlier && value !== batch_value) batch.current.set(source, [value, is_derived]);
				else continue;
			}
			sources.push(source);
		}
		if (is_earlier) for (const [effect, deferred] of this.async_deriveds) {
			const d = batch.async_deriveds.get(effect);
			if (d) deferred.promise.then(d.resolve).catch(d.reject);
		}
		var current = [...batch.current.keys()].filter((source) => !batch.current.get(source)[1]);
		if (!_classPrivateFieldGet2(_started, batch) || current.length === 0) continue;
		var others = current.filter((source) => !this.current.has(source));
		if (others.length === 0) {
			if (is_earlier) batch.discard();
		} else if (sources.length > 0) {
			if (is_earlier) for (const unskipped of _classPrivateFieldGet2(_unskipped_branches, this)) batch.unskip_effect(unskipped, (e) => {
				if ((e.f & 4194320) !== 0) batch.schedule(e);
				else _assertClassBrand(_Batch_brand, batch, _defer_effects).call(batch, [e]);
			});
			batch.activate();
			/** @type {Set<Value>} */
			var marked = /* @__PURE__ */ new Set();
			/** @type {Map<Reaction, boolean>} */
			var checked = /* @__PURE__ */ new Map();
			for (var source of sources) mark_effects(source, others, marked, checked);
			checked = /* @__PURE__ */ new Map();
			var current_unequal = [...batch.current].filter(([c, v1]) => {
				const v2 = this.current.get(c);
				if (!v2) return true;
				return v2[0] !== v1[0] || v2[1] !== v1[1];
			}).map(([c]) => c);
			if (current_unequal.length > 0) {
				for (const effect of _classPrivateFieldGet2(_new_effects, this)) if ((effect.f & 155648) === 0 && depends_on(effect, current_unequal, checked)) {
					if ((effect.f & 4194320) !== 0) {
						set_signal_status(effect, DIRTY);
						batch.schedule(effect);
					} else _classPrivateFieldGet2(_dirty_effects, batch).add(effect);
				}
			}
			if (_classPrivateFieldGet2(_roots, batch).length > 0 && !_classPrivateFieldGet2(_decrement_queued, batch)) {
				batch.apply();
				for (var root of _classPrivateFieldGet2(_roots, batch)) _assertClassBrand(_Batch_brand, batch, _traverse).call(batch, root, [], []);
				_classPrivateFieldSet2(_roots, batch, []);
			}
			batch.deactivate();
		}
	}
}
function _unlink() {
	if (!this.linked) return;
	var prev = _classPrivateFieldGet2(_prev, this);
	var next = _classPrivateFieldGet2(_next, this);
	if (prev === null) first_batch = next;
	else _classPrivateFieldSet2(_next, prev, next);
	if (next === null) last_batch = prev;
	else _classPrivateFieldSet2(_prev, next, prev);
	this.linked = false;
}
/**
* Synchronously flush any pending updates.
* Returns void if no callback is provided, otherwise returns the result of calling the callback.
* @template [T=void]
* @param {(() => T) | undefined} [fn]
* @returns {T}
*/
function flushSync(fn) {
	var was_flushing_sync = is_flushing_sync;
	is_flushing_sync = true;
	try {
		var result;
		if (fn) {
			if (current_batch !== null && !current_batch.is_fork) current_batch.flush();
			result = fn();
		}
		while (true) {
			flush_tasks();
			if (current_batch === null) return result;
			current_batch.flush();
		}
	} finally {
		is_flushing_sync = was_flushing_sync;
	}
}
function infinite_loop_guard() {
	try {
		effect_update_depth_exceeded();
	} catch (error) {
		invoke_error_boundary(error, last_scheduled_effect);
	}
}
/** @type {Set<Effect> | null} */
var eager_block_effects = null;
/**
* @param {Array<Effect>} effects
* @returns {void}
*/
function flush_queued_effects(effects) {
	var length = effects.length;
	if (length === 0) return;
	var i = 0;
	while (i < length) {
		var effect = effects[i++];
		if ((effect.f & 24576) === 0 && is_dirty(effect)) {
			eager_block_effects = /* @__PURE__ */ new Set();
			update_effect(effect);
			if (effect.deps === null && effect.first === null && effect.nodes === null && effect.teardown === null && effect.ac === null) unlink_effect(effect);
			if ((eager_block_effects === null || eager_block_effects === void 0 ? void 0 : eager_block_effects.size) > 0) {
				old_values.clear();
				for (const e of eager_block_effects) {
					if ((e.f & 24576) !== 0) continue;
					/** @type {Effect[]} */
					const ordered_effects = [e];
					let ancestor = e.parent;
					while (ancestor !== null) {
						if (eager_block_effects.has(ancestor)) {
							eager_block_effects.delete(ancestor);
							ordered_effects.push(ancestor);
						}
						ancestor = ancestor.parent;
					}
					for (let j = ordered_effects.length - 1; j >= 0; j--) {
						const e = ordered_effects[j];
						if ((e.f & 24576) !== 0) continue;
						update_effect(e);
					}
				}
				eager_block_effects.clear();
			}
		}
	}
	eager_block_effects = null;
}
/**
* This is similar to `mark_reactions`, but it only marks async/block effects
* depending on `value` and at least one of the other `sources`, so that
* these effects can re-run after another batch has been committed
* @param {Value} value
* @param {Source[]} sources
* @param {Set<Value>} marked
* @param {Map<Reaction, boolean>} checked
*/
function mark_effects(value, sources, marked, checked) {
	if (marked.has(value)) return;
	marked.add(value);
	if (value.reactions !== null) for (const reaction of value.reactions) {
		const flags = reaction.f;
		if ((flags & 2) !== 0) mark_effects(reaction, sources, marked, checked);
		else if ((flags & 4194320) !== 0 && (flags & 2048) === 0 && depends_on(reaction, sources, checked)) {
			set_signal_status(reaction, DIRTY);
			schedule_effect(reaction);
		}
	}
}
/**
* @param {Reaction} reaction
* @param {Source[]} sources
* @param {Map<Reaction, boolean>} checked
*/
function depends_on(reaction, sources, checked) {
	const depends = checked.get(reaction);
	if (depends !== void 0) return depends;
	if (reaction.deps !== null) for (const dep of reaction.deps) {
		if (includes.call(sources, dep)) return true;
		if ((dep.f & 2) !== 0 && depends_on(dep, sources, checked)) {
			checked.set(dep, true);
			return true;
		}
	}
	checked.set(reaction, false);
	return false;
}
/**
* @param {Effect} effect
* @returns {void}
*/
function schedule_effect(effect) {
	/** @type {Batch} */ current_batch.schedule(effect);
}
/**
* Mark all the effects inside a skipped branch CLEAN, so that
* they can be correctly rescheduled later. Tracks dirty and maybe_dirty
* effects so they can be rescheduled if the branch survives.
* @param {Effect} effect
* @param {{ d: Effect[], m: Effect[] }} tracked
*/
function reset_branch(effect, tracked) {
	if ((effect.f & 32) !== 0 && (effect.f & 1024) !== 0) return;
	if ((effect.f & 2048) !== 0) tracked.d.push(effect);
	else if ((effect.f & 4096) !== 0) tracked.m.push(effect);
	set_signal_status(effect, CLEAN);
	var e = effect.first;
	while (e !== null) {
		reset_branch(e, tracked);
		e = e.next;
	}
}
/**
* Mark an entire effect tree clean following an error
* @param {Effect} effect
*/
function reset_all(effect) {
	set_signal_status(effect, CLEAN);
	var e = effect.first;
	while (e !== null) {
		reset_all(e);
		e = e.next;
	}
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/reactivity/sources.js
/** @import { Derived, Effect, Source, Value } from '#client' */
/** @type {Set<Effect>} */
var eager_effects = /* @__PURE__ */ new Set();
/** @type {Map<Source, any>} */
var old_values = /* @__PURE__ */ new Map();
var eager_effects_deferred = false;
/**
* @template V
* @param {V} v
* @param {Error | null} [stack]
* @returns {Source<V>}
*/
function source(v, stack) {
	return {
		f: 0,
		v,
		reactions: null,
		equals,
		rv: 0,
		wv: 0
	};
}
/**
* @template V
* @param {V} v
* @param {Error | null} [stack]
*/
/*#__NO_SIDE_EFFECTS__*/
function state(v, stack) {
	const s = source(v, stack);
	push_reaction_value(s);
	return s;
}
/**
* @template V
* @param {V} initial_value
* @param {boolean} [immutable]
* @returns {Source<V>}
*/
/*#__NO_SIDE_EFFECTS__*/
function mutable_source(initial_value, immutable = false, trackable = true) {
	const s = source(initial_value);
	if (!immutable) s.equals = safe_equals;
	if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
		var _component_context$l, _component_context$l$;
		((_component_context$l$ = (_component_context$l = component_context.l).s) !== null && _component_context$l$ !== void 0 ? _component_context$l$ : _component_context$l.s = []).push(s);
	}
	return s;
}
/**
* @template V
* @param {Source<V>} source
* @param {V} value
* @param {boolean} [should_proxy]
* @returns {V}
*/
function set(source, value, should_proxy = false) {
	if (active_reaction !== null && (!untracking || (active_reaction.f & 131072) !== 0) && is_runes() && (active_reaction.f & 4325394) !== 0 && (current_sources === null || !current_sources.has(source))) state_unsafe_mutation();
	return internal_set(source, should_proxy ? proxy(value) : value, legacy_updates);
}
/**
* @template V
* @param {Source<V>} source
* @param {V} value
* @param {Effect[] | null} [updated_during_traversal]
* @returns {V}
*/
function internal_set(source, value, updated_during_traversal = null) {
	if (!source.equals(value)) {
		if (is_destroying_effect) old_values.set(source, value);
		else if (!old_values.has(source)) old_values.set(source, source.v);
		var batch = Batch.ensure();
		batch.capture(source, value);
		if ((source.f & 2) !== 0) {
			const derived = source;
			if ((source.f & 2048) !== 0) execute_derived(derived);
			if (batch_values === null) update_derived_status(derived);
		}
		source.wv = increment_write_version();
		mark_reactions(source, DIRTY, updated_during_traversal);
		if (is_runes() && active_effect !== null && (active_effect.f & 1024) !== 0 && (active_effect.f & 96) === 0) {
			if (untracked_writes === null) set_untracked_writes([source]);
			else untracked_writes.push(source);
		}
		if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) flush_eager_effects();
	}
	return value;
}
function flush_eager_effects() {
	eager_effects_deferred = false;
	for (const effect of eager_effects) {
		if ((effect.f & 1024) !== 0) set_signal_status(effect, MAYBE_DIRTY);
		let dirty;
		try {
			dirty = is_dirty(effect);
		} catch (_unused) {
			dirty = true;
		}
		if (dirty) update_effect(effect);
	}
	eager_effects.clear();
}
/**
* Silently (without using `get`) increment a source
* @param {Source<number>} source
*/
function increment(source) {
	set(source, source.v + 1);
}
/**
* @param {Value} signal
* @param {number} status should be DIRTY or MAYBE_DIRTY
* @param {Effect[] | null} updated_during_traversal
* @returns {void}
*/
function mark_reactions(signal, status, updated_during_traversal) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	var runes = is_runes();
	var length = reactions.length;
	for (var i = 0; i < length; i++) {
		var reaction = reactions[i];
		var flags = reaction.f;
		if (!runes && reaction === active_effect) continue;
		var not_dirty = (flags & DIRTY) === 0;
		if (not_dirty) set_signal_status(reaction, status);
		if ((flags & 131072) !== 0) eager_effects.add(reaction);
		else if ((flags & 2) !== 0) {
			var derived = reaction;
			batch_values === null || batch_values === void 0 || batch_values.delete(derived);
			if ((flags & 65536) === 0) {
				if (flags & 512 && (active_effect === null || (active_effect.f & 2097152) === 0)) reaction.f |= WAS_MARKED;
				mark_reactions(derived, MAYBE_DIRTY, updated_during_traversal);
			}
		} else if (not_dirty) {
			var effect = reaction;
			if ((flags & 16) !== 0 && eager_block_effects !== null) eager_block_effects.add(effect);
			if (updated_during_traversal !== null) updated_during_traversal.push(effect);
			else schedule_effect(effect);
		}
	}
}
/**
* @template T
* @param {T} value
* @returns {T}
*/
function proxy(value) {
	if (typeof value !== "object" || value === null || STATE_SYMBOL in value || COMPONENT_SYMBOL in value) return value;
	const prototype = get_prototype_of(value);
	if (prototype !== object_prototype && prototype !== array_prototype) return value;
	/** @type {Map<any, Source<any>>} */
	var sources = /* @__PURE__ */ new Map();
	var is_proxied_array = is_array(value);
	var version = /* @__PURE__ */ state(0);
	var stack = null;
	var parent_version = update_version;
	/**
	* Executes the proxy in the context of the reaction it was originally created in, if any
	* @template T
	* @param {() => T} fn
	*/
	var with_parent = (fn) => {
		if (update_version === parent_version) return fn();
		var reaction = active_reaction;
		var version = update_version;
		set_active_reaction(null);
		set_update_version(parent_version);
		var result = fn();
		set_active_reaction(reaction);
		set_update_version(version);
		return result;
	};
	if (is_proxied_array) sources.set("length", /* @__PURE__ */ state(
		/** @type {any[]} */
		value.length,
		stack
	));
	return new Proxy(value, {
		defineProperty(_, prop, descriptor) {
			if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) state_descriptors_fixed();
			var s = sources.get(prop);
			if (s === void 0) with_parent(() => {
				var s = /* @__PURE__ */ state(descriptor.value, stack);
				sources.set(prop, s);
				return s;
			});
			else set(s, descriptor.value, true);
			return true;
		},
		deleteProperty(target, prop) {
			var s = sources.get(prop);
			if (s === void 0) {
				if (prop in target) {
					const s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
					sources.set(prop, s);
					increment(version);
				}
			} else {
				set(s, UNINITIALIZED);
				increment(version);
			}
			return true;
		},
		get(target, prop, receiver) {
			var _get_descriptor;
			if (prop === STATE_SYMBOL) return value;
			var s = sources.get(prop);
			var exists = prop in target;
			if (s === void 0 && (!exists || ((_get_descriptor = get_descriptor(target, prop)) === null || _get_descriptor === void 0 ? void 0 : _get_descriptor.writable))) {
				s = with_parent(() => {
					return /* @__PURE__ */ state(proxy(exists ? target[prop] : UNINITIALIZED), stack);
				});
				sources.set(prop, s);
			}
			if (s !== void 0) {
				var v = get(s);
				return v === UNINITIALIZED ? void 0 : v;
			}
			return Reflect.get(target, prop, receiver);
		},
		getOwnPropertyDescriptor(target, prop) {
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			if (descriptor && "value" in descriptor) {
				var s = sources.get(prop);
				if (s) descriptor.value = get(s);
			} else if (descriptor === void 0) {
				var source = sources.get(prop);
				var value = source === null || source === void 0 ? void 0 : source.v;
				if (source !== void 0 && value !== UNINITIALIZED) return {
					enumerable: true,
					configurable: true,
					value,
					writable: true
				};
			}
			return descriptor;
		},
		has(target, prop) {
			var _get_descriptor2;
			if (prop === STATE_SYMBOL) return true;
			var s = sources.get(prop);
			var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
			if (s !== void 0 || active_effect !== null && (!has || ((_get_descriptor2 = get_descriptor(target, prop)) === null || _get_descriptor2 === void 0 ? void 0 : _get_descriptor2.writable))) {
				if (s === void 0) {
					s = with_parent(() => {
						return /* @__PURE__ */ state(has ? proxy(target[prop]) : UNINITIALIZED, stack);
					});
					sources.set(prop, s);
				}
				if (get(s) === UNINITIALIZED) return false;
			}
			return has;
		},
		set(target, prop, value, receiver) {
			var s = sources.get(prop);
			var has = prop in target;
			if (is_proxied_array && prop === "length") for (var i = value; i < s.v; i += 1) {
				var other_s = sources.get(i + "");
				if (other_s !== void 0) set(other_s, UNINITIALIZED);
				else if (i in target) {
					other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
					sources.set(i + "", other_s);
				}
			}
			if (s === void 0) {
				var _get_descriptor3;
				if (!has || ((_get_descriptor3 = get_descriptor(target, prop)) === null || _get_descriptor3 === void 0 ? void 0 : _get_descriptor3.writable)) {
					s = with_parent(() => /* @__PURE__ */ state(void 0, stack));
					set(s, proxy(value));
					sources.set(prop, s);
				}
			} else {
				has = s.v !== UNINITIALIZED;
				var p = with_parent(() => proxy(value));
				set(s, p);
			}
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			if (descriptor === null || descriptor === void 0 ? void 0 : descriptor.set) descriptor.set.call(receiver, value);
			if (!has) {
				if (is_proxied_array && typeof prop === "string") {
					var ls = sources.get("length");
					var n = Number(prop);
					if (Number.isInteger(n) && n >= ls.v) set(ls, n + 1);
				}
				increment(version);
			}
			return true;
		},
		ownKeys(target) {
			get(version);
			var own_keys = Reflect.ownKeys(target).filter((key) => {
				var source = sources.get(key);
				return source === void 0 || source.v !== UNINITIALIZED;
			});
			for (var [key, source] of sources) if (source.v !== UNINITIALIZED && !(key in target)) own_keys.push(key);
			return own_keys;
		},
		setPrototypeOf() {
			state_prototype_fixed();
		}
	});
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/dom/operations.js
/** @type {Window} */
var $window;
/** @type {() => Node | null} */
var first_child_getter;
/** @type {() => Node | null} */
var next_sibling_getter;
/**
* Initialize these lazily to avoid issues when using the runtime in a server context
* where these globals are not available while avoiding a separate server entry point
*/
function init_operations() {
	if ($window !== void 0) return;
	$window = window;
	/Firefox/.test(navigator.userAgent);
	var element_prototype = Element.prototype;
	var node_prototype = Node.prototype;
	var text_prototype = Text.prototype;
	first_child_getter = get_descriptor(node_prototype, "firstChild").get;
	next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
	if (is_extensible(element_prototype)) {
		/** @type {any} */ element_prototype[CLASS_CACHE] = void 0;
		/** @type {any} */ element_prototype[ATTRIBUTES_CACHE] = null;
		/** @type {any} */ element_prototype[STYLE_CACHE] = void 0;
		element_prototype.__e = void 0;
	}
	if (is_extensible(text_prototype))
 /** @type {any} */ text_prototype[TEXT_CACHE] = void 0;
}
/**
* @param {string} value
* @returns {Text}
*/
function create_text(value = "") {
	return document.createTextNode(value);
}
/**
* @template {Node} N
* @param {N} node
*/
/*@__NO_SIDE_EFFECTS__*/
function get_first_child(node) {
	return first_child_getter.call(node);
}
/**
* @template {Node} N
* @param {N} node
*/
/*@__NO_SIDE_EFFECTS__*/
function get_next_sibling(node) {
	return next_sibling_getter.call(node);
}
/**
* @template {Node} N
* @param {N} node
* @returns {void}
*/
function clear_text_content(node) {
	node.textContent = "";
}
/**
* @param {unknown} error
*/
function handle_error(error) {
	var effect = active_effect;
	if (effect === null) {
		/** @type {Derived} */ active_reaction.f |= ERROR_VALUE;
		return error;
	}
	if ((effect.f & 32768) === 0 && (effect.f & 4) === 0) throw error;
	invoke_error_boundary(error, effect);
}
/**
* @param {unknown} error
* @param {Effect | null} effect
*/
function invoke_error_boundary(error, effect) {
	if (effect !== null && (effect.f & 16384) !== 0) return;
	while (effect !== null) {
		if ((effect.f & 128) !== 0 && (effect.f & 33570816) === 0) {
			if ((effect.f & 32768) === 0) throw error;
			try {
				/** @type {Boundary} */ effect.b.error(error);
				return;
			} catch (e) {
				error = e;
			}
		}
		effect = effect.parent;
	}
	throw error;
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/reactivity/effects.js
/** @import { Blocker, ComponentContext, ComponentContextLegacy, Derived, Effect, TemplateNode, TransitionManager } from '#client' */
/**
* @param {Effect} effect
* @param {Effect} parent_effect
*/
function push_effect(effect, parent_effect) {
	var parent_last = parent_effect.last;
	if (parent_last === null) parent_effect.last = parent_effect.first = effect;
	else {
		parent_last.next = effect;
		effect.prev = parent_last;
		parent_effect.last = effect;
	}
}
/**
* @param {number} type
* @param {null | (() => void | (() => void))} fn
* @returns {Effect}
*/
function create_effect(type, fn) {
	var parent = active_effect;
	if (parent !== null && (parent.f & 8192) !== 0) type |= INERT;
	/** @type {Effect} */
	var effect = {
		ctx: component_context,
		deps: null,
		nodes: null,
		f: type | DIRTY | 512,
		first: null,
		fn,
		last: null,
		next: null,
		parent,
		b: parent && parent.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	current_batch === null || current_batch === void 0 || current_batch.register_created_effect(effect);
	/** @type {Effect | null} */
	var e = effect;
	if ((type & 4) !== 0) {
		if (collected_effects !== null) collected_effects.push(effect);
		else Batch.ensure().schedule(effect);
	} else if (fn !== null) {
		try {
			update_effect(effect);
		} catch (e) {
			destroy_effect(effect);
			throw e;
		}
		if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && (e.f & 524288) === 0) {
			e = e.first;
			if ((type & 16) !== 0 && (type & 65536) !== 0 && e !== null) e.f |= EFFECT_TRANSPARENT;
		}
	}
	if (e !== null) {
		e.parent = parent;
		if (parent !== null) push_effect(e, parent);
		if (active_reaction !== null && (active_reaction.f & 2) !== 0 && (type & 64) === 0) {
			var _derived$effects;
			var derived = active_reaction;
			((_derived$effects = derived.effects) !== null && _derived$effects !== void 0 ? _derived$effects : derived.effects = []).push(e);
		}
	}
	return effect;
}
/**
* Internal representation of `$effect.tracking()`
* @returns {boolean}
*/
function effect_tracking() {
	return active_reaction !== null && !untracking;
}
/**
* @param {() => void | (() => void)} fn
*/
function create_user_effect(fn) {
	return create_effect(4 | USER_EFFECT, fn);
}
/**
* An effect root whose children can transition out
* @param {() => void} fn
* @returns {(options?: { outro?: boolean }) => Promise<void>}
*/
function component_root(fn) {
	Batch.ensure();
	const effect = create_effect(64 | EFFECT_PRESERVED, fn);
	return (options = {}) => {
		return new Promise((fulfil) => {
			if (options.outro) pause_effect(effect, () => {
				destroy_effect(effect);
				fulfil(void 0);
			});
			else {
				destroy_effect(effect);
				fulfil(void 0);
			}
		});
	};
}
/**
* @param {() => void | (() => void)} fn
* @returns {Effect}
*/
function render_effect(fn, flags = 0) {
	return create_effect(8 | flags, fn);
}
/**
* @param {(() => void)} fn
* @param {number} flags
*/
function block(fn, flags = 0) {
	return create_effect(16 | flags, fn);
}
/**
* @param {(() => void)} fn
*/
function branch(fn) {
	return create_effect(32 | EFFECT_PRESERVED, fn);
}
/**
* @param {Effect} effect
*/
function execute_effect_teardown(effect) {
	var teardown = effect.teardown;
	if (teardown !== null) {
		const previously_destroying_effect = is_destroying_effect;
		const previous_reaction = active_reaction;
		set_is_destroying_effect(true);
		set_active_reaction(null);
		try {
			teardown.call(null);
		} catch (error) {
			invoke_error_boundary(error, effect.parent);
		} finally {
			set_is_destroying_effect(previously_destroying_effect);
			set_active_reaction(previous_reaction);
		}
	}
}
/**
* @param {Effect} signal
* @param {boolean} remove_dom
* @returns {void}
*/
function destroy_effect_children(signal, remove_dom = false) {
	var effect = signal.first;
	signal.first = signal.last = null;
	while (effect !== null) {
		const controller = effect.ac;
		if (controller !== null) without_reactive_context(() => {
			controller.abort(STALE_REACTION);
		});
		var next = effect.next;
		if ((effect.f & 64) !== 0) effect.parent = null;
		else destroy_effect(effect, remove_dom);
		effect = next;
	}
}
/**
* @param {Effect} signal
* @returns {void}
*/
function destroy_block_effect_children(signal) {
	var effect = signal.first;
	while (effect !== null) {
		var next = effect.next;
		if ((effect.f & 32) === 0) destroy_effect(effect);
		effect = next;
	}
}
/**
* @param {Effect} effect
* @param {boolean} [remove_dom]
* @returns {void}
*/
function destroy_effect(effect, remove_dom = true) {
	var removed = false;
	if ((remove_dom || (effect.f & 262144) !== 0) && effect.nodes !== null && effect.nodes.end !== null) {
		remove_effect_dom(effect.nodes.start, effect.nodes.end);
		removed = true;
	}
	effect.f |= DESTROYING;
	destroy_effect_children(effect, remove_dom && !removed);
	remove_reactions(effect, 0);
	var transitions = effect.nodes && effect.nodes.t;
	if (transitions !== null) for (const transition of transitions) transition.stop();
	execute_effect_teardown(effect);
	effect.f ^= DESTROYING;
	effect.f |= DESTROYED;
	var parent = effect.parent;
	if (parent !== null && parent.first !== null) unlink_effect(effect);
	effect.next = effect.prev = effect.teardown = effect.ctx = effect.deps = effect.fn = effect.nodes = effect.ac = effect.b = null;
}
/**
*
* @param {TemplateNode | null} node
* @param {TemplateNode} end
*/
function remove_effect_dom(node, end) {
	while (node !== null) {
		/** @type {TemplateNode | null} */
		var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
		node.remove();
		node = next;
	}
}
/**
* Detach an effect from the effect tree, freeing up memory and
* reducing the amount of work that happens on subsequent traversals
* @param {Effect} effect
*/
function unlink_effect(effect) {
	var parent = effect.parent;
	var prev = effect.prev;
	var next = effect.next;
	if (prev !== null) prev.next = next;
	if (next !== null) next.prev = prev;
	if (parent !== null) {
		if (parent.first === effect) parent.first = next;
		if (parent.last === effect) parent.last = prev;
	}
}
/**
* When a block effect is removed, we don't immediately destroy it or yank it
* out of the DOM, because it might have transitions. Instead, we 'pause' it.
* It stays around (in memory, and in the DOM) until outro transitions have
* completed, and if the state change is reversed then we _resume_ it.
* A paused effect does not update, and the DOM subtree becomes inert.
* @param {Effect} effect
* @param {() => void} [callback]
* @param {boolean} [destroy]
*/
function pause_effect(effect, callback, destroy = true) {
	/** @type {TransitionManager[]} */
	var transitions = [];
	effect.f |= 256;
	pause_children(effect, transitions, true);
	var fn = () => {
		if (destroy) destroy_effect(effect);
		if (callback) callback();
	};
	var remaining = transitions.length;
	if (remaining > 0) {
		var check = () => --remaining || fn();
		for (var transition of transitions) transition.out(check);
	} else fn();
}
/**
* @param {Effect} effect
* @param {TransitionManager[]} transitions
* @param {boolean} local
*/
function pause_children(effect, transitions, local) {
	if ((effect.f & 8192) !== 0) return;
	effect.f ^= INERT;
	var t = effect.nodes && effect.nodes.t;
	if (t !== null) {
		for (const transition of t) if (transition.is_global || local) transitions.push(transition);
	}
	var child = effect.first;
	while (child !== null) {
		var sibling = child.next;
		if ((child.f & 64) === 0) {
			var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0 && (effect.f & 16) !== 0;
			pause_children(child, transitions, transparent ? local : false);
		}
		child = sibling;
	}
}
/**
* @param {Effect} effect
* @param {DocumentFragment} fragment
*/
function move_effect(effect, fragment) {
	if (!effect.nodes) return;
	/** @type {TemplateNode | null} */
	var node = effect.nodes.start;
	var end = effect.nodes.end;
	while (node !== null) {
		/** @type {TemplateNode | null} */
		var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
		fragment.append(node);
		node = next;
	}
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/legacy.js
/**
* @type {Set<Value> | null}
* @deprecated
*/
var captured_signals = null;
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/runtime.js
/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
/**
* True if updating in an effect context that is reactive (i.e. not branch/root effects)
*/
var is_updating_effect = false;
var is_destroying_effect = false;
/** @param {boolean} value */
function set_is_destroying_effect(value) {
	is_destroying_effect = value;
}
/** @type {null | Reaction} */
var active_reaction = null;
var untracking = false;
/** @param {null | Reaction} reaction */
function set_active_reaction(reaction) {
	active_reaction = reaction;
}
/** @type {null | Effect} */
var active_effect = null;
/** @param {null | Effect} effect */
function set_active_effect(effect) {
	active_effect = effect;
}
/**
* When sources are created within a reaction, reading and writing
* them within that reaction should not cause a re-run
* @type {null | Set<Source>}
*/
var current_sources = null;
/** @param {Value} value */
function push_reaction_value(value) {
	if (active_reaction !== null && (!async_mode_flag || (active_reaction.f & 2) !== 0)) {
		var _current_sources;
		((_current_sources = current_sources) !== null && _current_sources !== void 0 ? _current_sources : current_sources = /* @__PURE__ */ new Set()).add(value);
	}
}
/**
* The dependencies of the reaction that is currently being executed. In many cases,
* the dependencies are unchanged between runs, and so this will be `null` unless
* and until a new dependency is accessed — we track this via `skipped_deps`
* @type {null | Value[]}
*/
var new_deps = null;
var skipped_deps = 0;
/**
* Tracks writes that the effect it's executed in doesn't listen to yet,
* so that the dependency can be added to the effect later on if it then reads it
* @type {null | Source[]}
*/
var untracked_writes = null;
/** @param {null | Source[]} value */
function set_untracked_writes(value) {
	untracked_writes = value;
}
/**
* @type {number} Used by sources and deriveds for handling updates.
* Version starts from 1 so that unowned deriveds differentiate between a created effect and a run one for tracing
**/
var write_version = 1;
/** @type {number} Used to version each read of a source of derived to avoid duplicating dependencies inside a reaction */
var read_version = 0;
var update_version = read_version;
/** @param {number} value */
function set_update_version(value) {
	update_version = value;
}
function increment_write_version() {
	return ++write_version;
}
/**
* Determines whether a derived or effect is dirty.
* If it is MAYBE_DIRTY, will set the status to CLEAN
* @param {Reaction} reaction
* @returns {boolean}
*/
function is_dirty(reaction) {
	var flags = reaction.f;
	if ((flags & 2048) !== 0) return true;
	if (flags & 2) reaction.f &= ~WAS_MARKED;
	if ((flags & 4096) !== 0) {
		var dependencies = reaction.deps;
		var length = dependencies.length;
		for (var i = 0; i < length; i++) {
			var dependency = dependencies[i];
			if (is_dirty(dependency)) update_derived(dependency);
			if (dependency.wv > reaction.wv) return true;
		}
		if ((flags & 512) !== 0 && batch_values === null) set_signal_status(reaction, CLEAN);
	}
	return false;
}
/**
* @param {Value} signal
* @param {Effect} effect
* @param {boolean} [root]
*/
function schedule_possible_effect_self_invalidation(signal, effect, root = true) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	if (!async_mode_flag && current_sources !== null && current_sources.has(signal)) return;
	for (var i = 0; i < reactions.length; i++) {
		var reaction = reactions[i];
		if ((reaction.f & 2) !== 0) schedule_possible_effect_self_invalidation(reaction, effect, false);
		else if (effect === reaction) {
			if (root) set_signal_status(reaction, DIRTY);
			else if ((reaction.f & 1024) !== 0) set_signal_status(reaction, MAYBE_DIRTY);
			schedule_effect(reaction);
		}
	}
}
/** @param {Reaction} reaction */
function update_reaction(reaction) {
	var previous_deps = new_deps;
	var previous_skipped_deps = skipped_deps;
	var previous_untracked_writes = untracked_writes;
	var previous_reaction = active_reaction;
	var previous_sources = current_sources;
	var previous_component_context = component_context;
	var previous_untracking = untracking;
	var previous_update_version = update_version;
	var flags = reaction.f;
	new_deps = null;
	skipped_deps = 0;
	untracked_writes = null;
	active_reaction = (flags & 96) === 0 ? reaction : null;
	current_sources = null;
	set_component_context(reaction.ctx);
	untracking = false;
	update_version = ++read_version;
	if (reaction.ac !== null) {
		without_reactive_context(() => {
			/** @type {AbortController} */ reaction.ac.abort(STALE_REACTION);
		});
		reaction.ac = null;
	}
	try {
		reaction.f |= REACTION_IS_UPDATING;
		var fn = reaction.fn;
		var result = fn();
		reaction.f |= REACTION_RAN;
		var deps = update_dependencies(reaction);
		if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & 6146) === 0) for (var i = 0; i < untracked_writes.length; i++) schedule_possible_effect_self_invalidation(untracked_writes[i], reaction);
		if (previous_reaction !== null && previous_reaction !== reaction) {
			read_version++;
			if (previous_reaction.deps !== null) for (let i = 0; i < previous_skipped_deps; i += 1) previous_reaction.deps[i].rv = read_version;
			if (previous_deps !== null) for (const dep of previous_deps) dep.rv = read_version;
			if (untracked_writes !== null) {
				if (previous_untracked_writes === null) previous_untracked_writes = untracked_writes;
				else previous_untracked_writes.push(...untracked_writes);
			}
		}
		if ((reaction.f & 8388608) !== 0) reaction.f ^= ERROR_VALUE;
		return result;
	} catch (error) {
		update_dependencies(reaction);
		return handle_error(error);
	} finally {
		reaction.f ^= REACTION_IS_UPDATING;
		new_deps = previous_deps;
		skipped_deps = previous_skipped_deps;
		untracked_writes = previous_untracked_writes;
		active_reaction = previous_reaction;
		current_sources = previous_sources;
		set_component_context(previous_component_context);
		untracking = previous_untracking;
		update_version = previous_update_version;
	}
}
/**
* @param {Reaction} reaction
*/
function update_dependencies(reaction) {
	var deps = reaction.deps;
	var is_fork = current_batch === null || current_batch === void 0 ? void 0 : current_batch.is_fork;
	if (new_deps !== null) {
		var i;
		if (!is_fork) remove_reactions(reaction, skipped_deps);
		if (deps !== null && skipped_deps > 0) {
			deps.length = skipped_deps + new_deps.length;
			for (i = 0; i < new_deps.length; i++) deps[skipped_deps + i] = new_deps[i];
		} else reaction.deps = deps = new_deps;
		if (effect_tracking() && (reaction.f & 512) !== 0) for (i = skipped_deps; i < deps.length; i++) {
			var _deps$i, _deps$i$reactions;
			((_deps$i$reactions = (_deps$i = deps[i]).reactions) !== null && _deps$i$reactions !== void 0 ? _deps$i$reactions : _deps$i.reactions = []).push(reaction);
		}
	} else if (!is_fork && deps !== null && skipped_deps < deps.length) {
		remove_reactions(reaction, skipped_deps);
		deps.length = skipped_deps;
	}
	return deps;
}
/**
* @template V
* @param {Reaction} signal
* @param {Value<V>} dependency
* @returns {void}
*/
function remove_reaction(signal, dependency) {
	let reactions = dependency.reactions;
	if (reactions !== null) {
		var index = index_of.call(reactions, signal);
		if (index !== -1) {
			var new_length = reactions.length - 1;
			if (new_length === 0) reactions = dependency.reactions = null;
			else {
				reactions[index] = reactions[new_length];
				reactions.pop();
			}
		}
	}
	if (reactions === null && (dependency.f & 2) !== 0 && (new_deps === null || !includes.call(new_deps, dependency))) {
		var derived = dependency;
		if ((derived.f & 512) !== 0) {
			derived.f ^= 512;
			derived.f &= ~WAS_MARKED;
		}
		if (derived.v !== UNINITIALIZED) update_derived_status(derived);
		if (derived.ac !== null) without_reactive_context(() => {
			/** @type {AbortController} */ derived.ac.abort(STALE_REACTION);
			derived.ac = null;
			set_signal_status(derived, DIRTY);
		});
		freeze_derived_effects(derived);
		remove_reactions(derived, 0);
	}
}
/**
* @param {Reaction} signal
* @param {number} start_index
* @returns {void}
*/
function remove_reactions(signal, start_index) {
	var dependencies = signal.deps;
	if (dependencies === null) return;
	for (var i = start_index; i < dependencies.length; i++) remove_reaction(signal, dependencies[i]);
}
/**
* @param {Effect} effect
* @returns {void}
*/
function update_effect(effect) {
	var flags = effect.f;
	if ((flags & 16384) !== 0) return;
	set_signal_status(effect, CLEAN);
	var previous_effect = active_effect;
	var was_updating_effect = is_updating_effect;
	active_effect = effect;
	is_updating_effect = (flags & 96) === 0;
	try {
		if ((flags & 16777232) !== 0) destroy_block_effect_children(effect);
		else destroy_effect_children(effect);
		execute_effect_teardown(effect);
		var teardown = update_reaction(effect);
		effect.teardown = typeof teardown === "function" ? teardown : null;
		effect.wv = write_version;
	} finally {
		is_updating_effect = was_updating_effect;
		active_effect = previous_effect;
	}
}
/**
* @template V
* @param {Value<V>} signal
* @returns {V}
*/
function get(signal) {
	var is_derived = (signal.f & 2) !== 0;
	captured_signals === null || captured_signals === void 0 || captured_signals.add(signal);
	if (active_reaction !== null && !untracking) {
		if (!(active_effect !== null && (active_effect.f & 16384) !== 0) && (current_sources === null || !current_sources.has(signal))) {
			var deps = active_reaction.deps;
			if ((active_reaction.f & 2097152) !== 0) {
				if (signal.rv < read_version) {
					signal.rv = read_version;
					if (new_deps === null && deps !== null && deps[skipped_deps] === signal) skipped_deps++;
					else if (new_deps === null) new_deps = [signal];
					else new_deps.push(signal);
				}
			} else {
				var _active_reaction, _active_reaction$deps;
				(_active_reaction$deps = (_active_reaction = active_reaction).deps) !== null && _active_reaction$deps !== void 0 || (_active_reaction.deps = []);
				if (!includes.call(active_reaction.deps, signal)) active_reaction.deps.push(signal);
				var reactions = signal.reactions;
				if (reactions === null) signal.reactions = [active_reaction];
				else if (!includes.call(reactions, active_reaction)) reactions.push(active_reaction);
			}
		}
	}
	if (is_destroying_effect && old_values.has(signal)) return old_values.get(signal);
	if (is_derived) {
		var derived = signal;
		if (is_destroying_effect) {
			var value = derived.v;
			if ((derived.f & 1024) === 0 && derived.reactions !== null || depends_on_old_values(derived)) value = execute_derived(derived);
			old_values.set(derived, value);
			return value;
		}
		var should_connect = (derived.f & 512) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & 512) !== 0);
		var is_new = (derived.f & REACTION_RAN) === 0;
		if (is_dirty(derived)) {
			if (should_connect) derived.f |= 512;
			update_derived(derived);
		}
		if (should_connect && !is_new) {
			unfreeze_derived_effects(derived);
			reconnect(derived);
		}
	}
	if (batch_values === null || batch_values === void 0 ? void 0 : batch_values.has(signal)) return batch_values.get(signal);
	if ((signal.f & 8388608) !== 0) throw signal.v;
	return signal.v;
}
/**
* (Re)connect a disconnected derived, so that it is notified
* of changes in `mark_reactions`
* @param {Derived} derived
*/
function reconnect(derived) {
	derived.f |= 512;
	if (derived.deps === null) return;
	for (const dep of derived.deps) {
		var _dep$reactions;
		((_dep$reactions = dep.reactions) !== null && _dep$reactions !== void 0 ? _dep$reactions : dep.reactions = []).push(derived);
		if ((dep.f & 2) !== 0 && (dep.f & 512) === 0) {
			unfreeze_derived_effects(dep);
			reconnect(dep);
		}
	}
}
/** @param {Derived} derived */
function depends_on_old_values(derived) {
	if (derived.v === UNINITIALIZED) return true;
	if (derived.deps === null) return false;
	for (const dep of derived.deps) {
		if (old_values.has(dep)) return true;
		if ((dep.f & 2) !== 0 && depends_on_old_values(dep)) return true;
	}
	return false;
}
/**
* When used inside a [`$derived`](https://svelte.dev/docs/svelte/$derived) or [`$effect`](https://svelte.dev/docs/svelte/$effect),
* any state read inside `fn` will not be treated as a dependency.
*
* ```ts
* $effect(() => {
*   // this will run when `data` changes, but not when `time` changes
*   save(data, {
*     timestamp: untrack(() => time)
*   });
* });
* ```
* @template T
* @param {() => T} fn
* @returns {T}
*/
function untrack(fn) {
	var previous_untracking = untracking;
	try {
		untracking = true;
		return fn();
	} finally {
		untracking = previous_untracking;
	}
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/store/shared/index.js
/** @import { Readable, StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from '../public.js' */
/** @import { Stores, StoresValues, SubscribeInvalidateTuple } from '../private.js' */
/**
* @type {Array<SubscribeInvalidateTuple<any> | any>}
*/
var subscriber_queue = [];
/**
* Creates a `Readable` store that allows reading by subscription.
*
* @template T
* @param {T} [value] initial value
* @param {StartStopNotifier<T>} [start]
* @returns {Readable<T>}
*/
function readable(value, start) {
	return { subscribe: writable(value, start).subscribe };
}
/**
* Create a `Writable` store that allows both updating and reading by subscription.
*
* @template T
* @param {T} [value] initial value
* @param {StartStopNotifier<T>} [start]
* @returns {Writable<T>}
*/
function writable(value, start = noop) {
	/** @type {Unsubscriber | null} */
	let stop = null;
	/** @type {Set<SubscribeInvalidateTuple<T>>} */
	const subscribers = /* @__PURE__ */ new Set();
	/**
	* @param {T} new_value
	* @returns {void}
	*/
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) subscriber_queue[i][0](subscriber_queue[i + 1]);
					subscriber_queue.length = 0;
				}
			}
		}
	}
	/**
	* @param {Updater<T>} fn
	* @returns {void}
	*/
	function update(fn) {
		set(fn(value));
	}
	/**
	* @param {Subscriber<T>} run
	* @param {() => void} [invalidate]
	* @returns {Unsubscriber}
	*/
	function subscribe(run, invalidate = noop) {
		/** @type {SubscribeInvalidateTuple<T>} */
		const subscriber = [run, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) stop = start(set, update) || noop;
		run(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return {
		set,
		update,
		subscribe
	};
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/utils.js
/**
* Attributes that are boolean, i.e. they are present or not present.
*/
var DOM_BOOLEAN_ATTRIBUTES = [
	"allowfullscreen",
	"async",
	"autofocus",
	"autoplay",
	"checked",
	"controls",
	"default",
	"disabled",
	"formnovalidate",
	"indeterminate",
	"inert",
	"ismap",
	"loop",
	"multiple",
	"muted",
	"nomodule",
	"novalidate",
	"open",
	"playsinline",
	"readonly",
	"required",
	"reversed",
	"seamless",
	"selected",
	"webkitdirectory",
	"defer",
	"disablepictureinpicture",
	"disableremoteplayback"
];
/**
* Returns `true` if `name` is a boolean attribute
* @param {string} name
*/
function is_boolean_attribute(name) {
	return DOM_BOOLEAN_ATTRIBUTES.includes(name);
}
[...DOM_BOOLEAN_ATTRIBUTES];
/**
* Subset of delegated events which should be passive by default.
* These two are already passive via browser defaults on window, document and body.
* But since
* - we're delegating them
* - they happen often
* - they apply to mobile which is generally less performant
* we're marking them as passive by default for other elements, too.
*/
var PASSIVE_EVENTS = ["touchstart", "touchmove"];
/**
* Returns `true` if `name` is a passive event
* @param {string} name
*/
function is_passive_event(name) {
	return PASSIVE_EVENTS.includes(name);
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/escaping.js
var ATTR_REGEX = /[&"<]/g;
var CONTENT_REGEX = /[&<]/g;
/**
* @template V
* @param {V} value
* @param {boolean} [is_attr]
*/
function escape_html(value, is_attr) {
	const str = String(value !== null && value !== void 0 ? value : "");
	const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;
	let escaped = "";
	let last = 0;
	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === "\"" ? "&quot;" : "&lt;");
		last = i + 1;
	}
	return escaped + str.substring(last);
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/shared/attributes.js
/**
* `<div translate={false}>` should be rendered as `<div translate="no">` and _not_
* `<div translate="false">`, which is equivalent to `<div translate="yes">`. There
* may be other odd cases that need to be added to this list in future
* @type {Record<string, Map<any, string>>}
*/
var replacements = { translate: /* @__PURE__ */ new Map([[true, "yes"], [false, "no"]]) };
/**
* @template V
* @param {string} name
* @param {V} value
* @param {boolean} [is_boolean]
* @returns {string}
*/
function attr(name, value, is_boolean = false) {
	if (name === "hidden" && value !== "until-found") is_boolean = true;
	if (value == null || is_boolean && !value && value !== "") return "";
	const normalized = has_own_property.call(replacements, name) && replacements[name].get(value) || value;
	return ` ${name}${is_boolean ? `=""` : `="${escape_html(normalized, true)}"`}`;
}
/**
* Small wrapper around clsx to preserve Svelte's (weird) handling of falsy values.
* TODO Svelte 6 revisit this, and likely turn all falsy values into the empty string (what clsx also does)
* @param  {any} value
*/
function clsx$1(value) {
	if (typeof value === "object") return clsx(value);
	else return value !== null && value !== void 0 ? value : "";
}
var whitespace = [..." 	\n\r\f\xA0\v﻿"];
/**
* @param {any} value
* @param {string | null} [hash]
* @param {Record<string, boolean>} [directives]
* @returns {string | null}
*/
function to_class(value, hash, directives) {
	var classname = value == null ? "" : "" + value;
	if (hash) classname = classname ? classname + " " + hash : hash;
	if (directives) {
		for (var key of Object.keys(directives)) if (directives[key]) classname = classname ? classname + " " + key : key;
		else if (classname.length) {
			var len = key.length;
			var a = 0;
			while ((a = classname.indexOf(key, a)) >= 0) {
				var b = a + len;
				if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
				else a = b;
			}
		}
	}
	return classname === "" ? null : classname;
}
/**
*
* @param {Record<string,any>} styles
* @param {boolean} important
*/
function append_styles(styles, important = false) {
	var separator = important ? " !important;" : ";";
	var css = "";
	for (var key of Object.keys(styles)) {
		var value = styles[key];
		if (value != null && value !== "") css += " " + key + ": " + value + separator;
	}
	return css;
}
/**
* @param {string} name
* @returns {string}
*/
function to_css_name(name) {
	if (name[0] !== "-" || name[1] !== "-") return name.toLowerCase();
	return name;
}
/**
* @param {any} value
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [styles]
* @returns {string | null}
*/
function to_style(value, styles) {
	if (styles) {
		var new_style = "";
		/** @type {Record<string,any> | undefined} */
		var normal_styles;
		/** @type {Record<string,any> | undefined} */
		var important_styles;
		if (Array.isArray(styles)) {
			normal_styles = styles[0];
			important_styles = styles[1];
		} else normal_styles = styles;
		if (value) {
			value = String(value).replaceAll(/\/\*.*?\*\//g, "").trim();
			/** @type {boolean | '"' | "'"} */
			var in_str = false;
			var in_apo = 0;
			var in_comment = false;
			var reserved_names = [];
			if (normal_styles) reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
			if (important_styles) reserved_names.push(...Object.keys(important_styles).map(to_css_name));
			var start_index = 0;
			var name_index = -1;
			const len = value.length;
			for (var i = 0; i < len; i++) {
				var c = value[i];
				if (in_comment) {
					if (c === "/" && value[i - 1] === "*") in_comment = false;
				} else if (in_str) {
					if (in_str === c) in_str = false;
				} else if (c === "/" && value[i + 1] === "*") in_comment = true;
				else if (c === "\"" || c === "'") in_str = c;
				else if (c === "(") in_apo++;
				else if (c === ")") in_apo--;
				if (!in_comment && in_str === false && in_apo === 0) {
					if (c === ":" && name_index === -1) name_index = i;
					else if (c === ";" || i === len - 1) {
						if (name_index !== -1) {
							var name = to_css_name(value.substring(start_index, name_index).trim());
							if (!reserved_names.includes(name)) {
								if (c !== ";") i++;
								var property = value.substring(start_index, i).trim();
								new_style += " " + property + ";";
							}
						}
						start_index = i + 1;
						name_index = -1;
					}
				}
			}
		}
		if (normal_styles) new_style += append_styles(normal_styles);
		if (important_styles) new_style += append_styles(important_styles, true);
		new_style = new_style.trim();
		return new_style === "" ? null : new_style;
	}
	return value == null ? null : String(value);
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/server/hydration.js
var BLOCK_OPEN = `<!--[-->`;
var BLOCK_CLOSE = `<!--]-->`;
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/server/context.js
/** @import { SSRContext } from '#server' */
/** @type {SSRContext | null} */
var ssr_context = null;
/** @param {SSRContext | null} v */
function set_ssr_context(v) {
	ssr_context = v;
}
/**
* @template T
* @returns {[() => T, (context: T) => T, () => boolean]}
* @since 5.40.0
*/
function createContext() {
	return create_context(getContext, setContext, hasContext);
}
/**
* @template T
* @param {any} key
* @returns {T}
*/
function getContext(key) {
	return get_or_init_context_map(ssr_context, "getContext").get(key);
}
/**
* @template T
* @param {any} key
* @param {T} context
* @returns {T}
*/
function setContext(key, context) {
	get_or_init_context_map(ssr_context, "setContext").set(key, context);
	return context;
}
/**
* @param {any} key
* @returns {boolean}
*/
function hasContext(key) {
	return get_or_init_context_map(ssr_context, "hasContext").has(key);
}
/** @returns {Map<any, any>} */
function getAllContexts() {
	return get_or_init_context_map(ssr_context, "getAllContexts");
}
/**
* @param {Function} [fn]
*/
function push(fn) {
	ssr_context = {
		p: ssr_context,
		c: null,
		r: null
	};
}
function pop() {
	ssr_context = ssr_context.p;
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/server/errors.js
/**
* The node API `AsyncLocalStorage` is not available, but is required to use async server rendering.
* @returns {never}
*/
function async_local_storage_unavailable() {
	const error = /* @__PURE__ */ new Error(`async_local_storage_unavailable\nThe node API \`AsyncLocalStorage\` is not available, but is required to use async server rendering.\nhttps://svelte.dev/e/async_local_storage_unavailable`);
	error.name = "Svelte error";
	throw error;
}
/**
* Encountered asynchronous work while rendering synchronously.
* @returns {never}
*/
function await_invalid() {
	const error = /* @__PURE__ */ new Error(`await_invalid\nEncountered asynchronous work while rendering synchronously.\nhttps://svelte.dev/e/await_invalid`);
	error.name = "Svelte error";
	throw error;
}
/**
* The `html` property of server render results has been deprecated. Use `body` instead.
* @returns {never}
*/
function html_deprecated() {
	const error = /* @__PURE__ */ new Error(`html_deprecated\nThe \`html\` property of server render results has been deprecated. Use \`body\` instead.\nhttps://svelte.dev/e/html_deprecated`);
	error.name = "Svelte error";
	throw error;
}
/**
* Attempted to set `hydratable` with key `%key%` twice with different values.
* 
* %stack%
* @param {string} key
* @param {string} stack
* @returns {never}
*/
function hydratable_clobbering(key, stack) {
	const error = /* @__PURE__ */ new Error(`hydratable_clobbering\nAttempted to set \`hydratable\` with key \`${key}\` twice with different values.

${stack}\nhttps://svelte.dev/e/hydratable_clobbering`);
	error.name = "Svelte error";
	throw error;
}
/**
* Failed to serialize `hydratable` data for key `%key%`.
* 
* `hydratable` can serialize anything [`uneval` from `devalue`](https://npmjs.com/package/uneval) can, plus Promises.
* 
* Cause:
* %stack%
* @param {string} key
* @param {string} stack
* @returns {never}
*/
function hydratable_serialization_failed(key, stack) {
	const error = /* @__PURE__ */ new Error(`hydratable_serialization_failed\nFailed to serialize \`hydratable\` data for key \`${key}\`.

\`hydratable\` can serialize anything [\`uneval\` from \`devalue\`](https://npmjs.com/package/uneval) can, plus Promises.

Cause:
${stack}\nhttps://svelte.dev/e/hydratable_serialization_failed`);
	error.name = "Svelte error";
	throw error;
}
/**
* `csp.nonce` was set while `csp.hash` was `true`. These options cannot be used simultaneously.
* @returns {never}
*/
function invalid_csp() {
	const error = /* @__PURE__ */ new Error(`invalid_csp\n\`csp.nonce\` was set while \`csp.hash\` was \`true\`. These options cannot be used simultaneously.\nhttps://svelte.dev/e/invalid_csp`);
	error.name = "Svelte error";
	throw error;
}
/**
* The `idPrefix` option cannot include `--`.
* @returns {never}
*/
function invalid_id_prefix() {
	const error = /* @__PURE__ */ new Error(`invalid_id_prefix\nThe \`idPrefix\` option cannot include \`--\`.\nhttps://svelte.dev/e/invalid_id_prefix`);
	error.name = "Svelte error";
	throw error;
}
/**
* `%name%(...)` is not available on the server
* @param {string} name
* @returns {never}
*/
function lifecycle_function_unavailable(name) {
	const error = /* @__PURE__ */ new Error(`lifecycle_function_unavailable\n\`${name}(...)\` is not available on the server\nhttps://svelte.dev/e/lifecycle_function_unavailable`);
	error.name = "Svelte error";
	throw error;
}
/**
* Could not resolve `render` context.
* @returns {never}
*/
function server_context_required() {
	const error = /* @__PURE__ */ new Error(`server_context_required\nCould not resolve \`render\` context.\nhttps://svelte.dev/e/server_context_required`);
	error.name = "Svelte error";
	throw error;
}
/**
* A `hydratable` value with key `%key%` was created, but at least part of it was not used during the render.
* 
* The `hydratable` was initialized in:
* %stack%
* @param {string} key
* @param {string} stack
*/
function unresolved_hydratable(key, stack) {
	console.warn(`https://svelte.dev/e/unresolved_hydratable`);
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/server/render-context.js
/** @import { AsyncLocalStorage } from 'node:async_hooks' */
/** @import { RenderContext } from '#server' */
/** @type {Promise<void> | null} */
var current_render = null;
/** @type {RenderContext | null} */
var context = null;
/** @returns {RenderContext} */
function get_render_context() {
	var _context;
	const store = (_context = context) !== null && _context !== void 0 ? _context : als === null || als === void 0 ? void 0 : als.getStore();
	if (!store) server_context_required();
	return store;
}
/**
* @template T
* @param {() => Promise<T>} fn
* @returns {Promise<T>}
*/
async function with_render_context(fn) {
	context = { hydratable: {
		lookup: /* @__PURE__ */ new Map(),
		comparisons: [],
		unresolved_promises: /* @__PURE__ */ new Map()
	} };
	if (in_webcontainer()) {
		const { promise, resolve } = deferred();
		const previous_render = current_render;
		current_render = promise;
		await previous_render;
		return fn().finally(resolve);
	}
	try {
		if (als === null) async_local_storage_unavailable();
		return als.run(context, fn);
	} finally {
		context = null;
	}
}
/** @type {AsyncLocalStorage<RenderContext | null> | null} */
var als = null;
/** @type {Promise<void> | null} */
var als_import = null;
/**
*
* @returns {Promise<void>}
*/
function init_render_context() {
	var _als_import;
	(_als_import = als_import) !== null && _als_import !== void 0 || (als_import = import("node:async_hooks").then((hooks) => {
		als = new hooks.AsyncLocalStorage();
	}).then(noop, noop));
	return als_import;
}
function in_webcontainer() {
	var _globalThis$process;
	return !!((_globalThis$process = globalThis.process) === null || _globalThis$process === void 0 || (_globalThis$process = _globalThis$process.versions) === null || _globalThis$process === void 0 ? void 0 : _globalThis$process.webcontainer);
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/server/crypto.js
var text_encoder;
var crypto;
/** @param {string} module_name */
var obfuscated_import = (module_name) => import(
	/* @vite-ignore */
	module_name
);
/** @param {string} data */
async function sha256(data) {
	var _text_encoder, _crypto, _globalThis$crypto;
	(_text_encoder = text_encoder) !== null && _text_encoder !== void 0 || (text_encoder = new TextEncoder());
	(_crypto = crypto) !== null && _crypto !== void 0 || (crypto = ((_globalThis$crypto = globalThis.crypto) === null || _globalThis$crypto === void 0 || (_globalThis$crypto = _globalThis$crypto.subtle) === null || _globalThis$crypto === void 0 ? void 0 : _globalThis$crypto.digest) ? globalThis.crypto : (await obfuscated_import("node:crypto")).webcrypto);
	return base64_encode(await crypto.subtle.digest("SHA-256", text_encoder.encode(data)));
}
/**
* @param {Uint8Array} bytes
* @returns {string}
*/
function base64_encode(bytes) {
	if (globalThis.Buffer) return globalThis.Buffer.from(bytes).toString("base64");
	let binary = "";
	for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
	return btoa(binary);
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/server/renderer.js
/** @import { Component } from 'svelte' */
/** @import { HydratableContext, SSRContext } from './types.js' */
/** @import { Csp, RenderOutput, SyncRenderOutput, Sha256Source } from '../../server/public.js' */
/** @import { MaybePromise } from '#shared' */
var _Renderer;
var _out = /* @__PURE__ */ new WeakMap();
var _on_destroy = /* @__PURE__ */ new WeakMap();
var _is_component_body = /* @__PURE__ */ new WeakMap();
var _boundary = /* @__PURE__ */ new WeakMap();
var _parent = /* @__PURE__ */ new WeakMap();
var _Renderer_brand = /* @__PURE__ */ new WeakSet();
/** @typedef {'head' | 'body'} RendererType */
/** @typedef {{ [key in RendererType]: string }} AccumulatedContent */
/**
* @typedef {string | Renderer} RendererItem
*/
/**
* Renderers are basically a tree of `string | Renderer`s, where each `Renderer` in the tree represents
* work that may or may not have completed. A renderer can be {@link collect}ed to aggregate the
* content from itself and all of its children, but this will throw if any of the children are
* performing asynchronous work. To asynchronously collect a renderer, just `await` it.
*
* The `string` values within a renderer are always associated with the {@link type} of that renderer. To switch types,
* call {@link child} with a different `type` argument.
*/
var Renderer = class Renderer {
	/**
	* @param {SSRState} global
	* @param {Renderer | undefined} [parent]
	*/
	constructor(global, parent) {
		_classPrivateMethodInitSpec(this, _Renderer_brand);
		_classPrivateFieldInitSpec(this, _out, []);
		_classPrivateFieldInitSpec(this, _on_destroy, void 0);
		_classPrivateFieldInitSpec(this, _is_component_body, false);
		_classPrivateFieldInitSpec(this, _boundary, null);
		_defineProperty(
			this,
			/**
			* The type of string content that this renderer is accumulating.
			* @type {RendererType}
			*/
			"type",
			void 0
		);
		_classPrivateFieldInitSpec(this, _parent, void 0);
		_defineProperty(
			this,
			/**
			* Asynchronous work associated with this renderer
			* @type {Promise<void> | undefined}
			*/
			"promise",
			void 0
		);
		_defineProperty(
			this,
			/**
			* State which is associated with the content tree as a whole.
			* It will be re-exposed, uncopied, on all children.
			* @type {SSRState}
			* @readonly
			*/
			"global",
			void 0
		);
		_defineProperty(
			this,
			/**
			* State that is local to the branch it is declared in.
			* It will be shallow-copied to all children.
			*
			* @type {{ select_value: any, multiple: boolean }}
			*/
			"local",
			void 0
		);
		_classPrivateFieldSet2(_parent, this, parent);
		this.global = global;
		this.local = parent ? { ...parent.local } : {
			select_value: void 0,
			multiple: false
		};
		this.type = parent ? parent.type : "body";
	}
	/**
	* @param {(renderer: Renderer) => void} fn
	*/
	head(fn) {
		const head = new Renderer(this.global, this);
		head.type = "head";
		_classPrivateFieldGet2(_out, this).push(head);
		head.child(fn);
	}
	/**
	* @param {Array<Promise<void>>} blockers
	* @param {(renderer: Renderer) => void} fn
	*/
	async_block(blockers, fn) {
		_classPrivateFieldGet2(_out, this).push(BLOCK_OPEN);
		this.async(blockers, fn);
		_classPrivateFieldGet2(_out, this).push(BLOCK_CLOSE);
	}
	/**
	* @param {Array<Promise<void>>} blockers
	* @param {(renderer: Renderer) => void} fn
	*/
	async(blockers, fn) {
		let callback = fn;
		if (blockers.length > 0) {
			const context = ssr_context;
			callback = (renderer) => {
				return Promise.all(blockers).then(() => {
					const previous_context = ssr_context;
					try {
						set_ssr_context(context);
						return fn(renderer);
					} finally {
						set_ssr_context(previous_context);
					}
				});
			};
		}
		this.child(callback);
	}
	/**
	* @param {Array<() => void>} thunks
	*/
	run(thunks) {
		const context = ssr_context;
		let promise = Promise.resolve(thunks[0]());
		const promises = [promise];
		for (const fn of thunks.slice(1)) {
			promise = promise.then(() => {
				const previous_context = ssr_context;
				set_ssr_context(context);
				try {
					return fn();
				} finally {
					set_ssr_context(previous_context);
				}
			});
			promises.push(promise);
		}
		promise.catch(noop);
		this.promise = this.global.track(promise);
		return promises;
	}
	/**
	* @param {(renderer: Renderer) => MaybePromise<void>} fn
	*/
	child_block(fn) {
		_classPrivateFieldGet2(_out, this).push(BLOCK_OPEN);
		this.child(fn);
		_classPrivateFieldGet2(_out, this).push(BLOCK_CLOSE);
	}
	/**
	* Create a child renderer. The child renderer inherits the state from the parent,
	* but has its own content.
	* @param {(renderer: Renderer) => MaybePromise<void>} fn
	*/
	child(fn) {
		const child = new Renderer(this.global, this);
		_classPrivateFieldGet2(_out, this).push(child);
		const parent = ssr_context;
		set_ssr_context({
			...ssr_context,
			p: parent,
			c: null,
			r: child
		});
		const result = fn(child);
		set_ssr_context(parent);
		if (result instanceof Promise) {
			result.catch(noop);
			result.finally(() => set_ssr_context(null)).catch(noop);
			if (child.global.mode === "sync") await_invalid();
			child.promise = child.global.track(result);
		}
		return child;
	}
	/**
	* Render children inside an error boundary. If the children throw and the API-level
	* `transformError` transform handles the error (doesn't re-throw), the `failed` snippet is
	* rendered instead. Otherwise the error propagates.
	*
	* @param {{ failed?: (renderer: Renderer, error: unknown, reset: () => void) => void }} props
	* @param {(renderer: Renderer) => MaybePromise<void>} children_fn
	*/
	boundary(props, children_fn) {
		const child = new Renderer(this.global, this);
		_classPrivateFieldGet2(_out, this).push(child);
		const parent_context = ssr_context;
		if (props.failed) _classPrivateFieldSet2(_boundary, child, {
			failed: props.failed,
			transformError: this.global.transformError,
			context: parent_context
		});
		set_ssr_context({
			...ssr_context,
			p: parent_context,
			c: null,
			r: child
		});
		try {
			const result = children_fn(child);
			set_ssr_context(parent_context);
			if (result instanceof Promise) {
				if (child.global.mode === "sync") await_invalid();
				result.catch(noop);
				child.promise = child.global.track(result);
			}
		} catch (error) {
			set_ssr_context(parent_context);
			const failed_snippet = props.failed;
			if (!failed_snippet) throw error;
			const result = this.global.transformError(error);
			_classPrivateFieldGet2(_out, child).length = 0;
			_classPrivateFieldSet2(_boundary, child, null);
			if (result instanceof Promise) {
				if (this.global.mode === "sync") await_invalid();
				child.promise = child.global.track(
					/** @type {Promise<unknown>} */
					result.then((transformed) => {
						set_ssr_context(parent_context);
						_classPrivateFieldGet2(_out, child).push(_serialize_failed_boundary.call(Renderer, transformed));
						failed_snippet(child, transformed, noop);
						_classPrivateFieldGet2(_out, child).push(BLOCK_CLOSE);
					})
				);
				child.promise.catch(noop);
			} else {
				_classPrivateFieldGet2(_out, child).push(_serialize_failed_boundary.call(Renderer, result));
				failed_snippet(child, result, noop);
				_classPrivateFieldGet2(_out, child).push(BLOCK_CLOSE);
			}
		}
	}
	/**
	* Create a component renderer. The component renderer inherits the state from the parent,
	* but has its own content. It is treated as an ordering boundary for ondestroy callbacks.
	* @param {(renderer: Renderer) => MaybePromise<void>} fn
	* @param {Function} [component_fn]
	* @returns {void}
	*/
	component(fn, component_fn) {
		push(component_fn);
		this.child((renderer) => {
			_classPrivateFieldSet2(_is_component_body, renderer, true);
			return fn(renderer);
		});
		pop();
	}
	/**
	* @param {Record<string, any>} attrs
	* @param {(renderer: Renderer) => void} fn
	* @param {string | undefined} [css_hash]
	* @param {Record<string, boolean> | undefined} [classes]
	* @param {Record<string, string> | undefined} [styles]
	* @param {number | undefined} [flags]
	* @param {boolean | undefined} [is_rich]
	* @returns {void}
	*/
	select(attrs, fn, css_hash, classes, styles, flags, is_rich) {
		const { value, defaultValue, ...select_attrs } = attrs;
		if (select_attrs.multiple === "") select_attrs.multiple = true;
		this.push(`<select${attributes(select_attrs, css_hash, classes, styles, flags)}>`);
		this.child((renderer) => {
			renderer.local.select_value = value === void 0 ? defaultValue : value;
			renderer.local.multiple = !!select_attrs.multiple;
			fn(renderer);
		});
		this.push(`${is_rich ? "<!>" : ""}</select>`);
	}
	/**
	* @param {Record<string, any>} attrs
	* @param {string | number | boolean | ((renderer: Renderer) => void)} body
	* @param {string | undefined} [css_hash]
	* @param {Record<string, boolean> | undefined} [classes]
	* @param {Record<string, string> | undefined} [styles]
	* @param {number | undefined} [flags]
	* @param {boolean | undefined} [is_rich]
	*/
	option(attrs, body, css_hash, classes, styles, flags, is_rich) {
		_classPrivateFieldGet2(_out, this).push(`<option${attributes(attrs, css_hash, classes, styles, flags)}`);
		/**
		* @param {Renderer} renderer
		* @param {any} value
		* @param {{ head?: string, body: any }} content
		*/
		const close = (renderer, value, { head, body }) => {
			if (has_own_property.call(attrs, "value")) value = attrs.value;
			var select_value = this.local.select_value;
			if (this.local.multiple && is_array(select_value) ? select_value.includes(value) : value === select_value) _classPrivateFieldGet2(_out, renderer).push(" selected=\"\"");
			_classPrivateFieldGet2(_out, renderer).push(`>${body}${is_rich ? "<!>" : ""}</option>`);
			if (head) renderer.head((child) => child.push(head));
		};
		if (typeof body === "function") this.child((renderer) => {
			const r = new Renderer(this.global, this);
			body(r);
			if (this.global.mode === "async") return _assertClassBrand(_Renderer_brand, r, _collect_content_async).call(r).then((content) => {
				close(renderer, content.body.replaceAll("<!---->", ""), content);
			});
			else {
				const content = _assertClassBrand(_Renderer_brand, r, _collect_content).call(r);
				close(renderer, content.body.replaceAll("<!---->", ""), content);
			}
		});
		else close(this, body, { body: escape_html(body) });
	}
	/**
	* @param {(renderer: Renderer) => void} fn
	*/
	title(fn) {
		const path = this.get_path();
		/** @param {string} head */
		const close = (head) => {
			this.global.set_title(head, path);
		};
		this.child((renderer) => {
			const r = new Renderer(renderer.global, renderer);
			fn(r);
			if (renderer.global.mode === "async") return _assertClassBrand(_Renderer_brand, r, _collect_content_async).call(r).then((content) => {
				close(content.head);
			});
			else {
				const content = _assertClassBrand(_Renderer_brand, r, _collect_content).call(r);
				close(content.head);
			}
		});
	}
	/**
	* @param {string | (() => Promise<string>)} content
	*/
	push(content) {
		if (typeof content === "function") this.child(async (renderer) => renderer.push(await content()));
		else _classPrivateFieldGet2(_out, this).push(content);
	}
	/**
	* @param {() => void} fn
	*/
	on_destroy(fn) {
		var _classPrivateFieldGet2$1;
		((_classPrivateFieldGet2$1 = _classPrivateFieldGet2(_on_destroy, this)) !== null && _classPrivateFieldGet2$1 !== void 0 ? _classPrivateFieldGet2$1 : _classPrivateFieldSet2(_on_destroy, this, [])).push(fn);
	}
	/**
	* @returns {number[]}
	*/
	get_path() {
		return _classPrivateFieldGet2(_parent, this) ? [..._classPrivateFieldGet2(_parent, this).get_path(), _classPrivateFieldGet2(_out, _classPrivateFieldGet2(_parent, this)).indexOf(this)] : [];
	}
	/**
	* @deprecated this is needed for legacy component bindings
	*/
	copy() {
		const copy = new Renderer(this.global, _classPrivateFieldGet2(_parent, this));
		copy.type = this.type;
		_classPrivateFieldSet2(_out, copy, _classPrivateFieldGet2(_out, this).map((item) => item instanceof Renderer ? item.copy() : item));
		copy.promise = this.promise;
		return copy;
	}
	/**
	* @param {Renderer} other
	* @deprecated this is needed for legacy component bindings
	*/
	subsume(other) {
		if (this.global.mode !== other.global.mode) throw new Error("invariant: A renderer cannot switch modes. If you're seeing this, there's a compiler bug. File an issue!");
		this.local = other.local;
		_classPrivateFieldSet2(_out, this, _classPrivateFieldGet2(_out, other).map((item, i) => {
			const current = _classPrivateFieldGet2(_out, this)[i];
			if (current instanceof Renderer && item instanceof Renderer) {
				current.subsume(item);
				return current;
			}
			return item;
		}));
		this.promise = other.promise;
		this.type = other.type;
	}
	get length() {
		return _classPrivateFieldGet2(_out, this).length;
	}
	/**
	* Only available on the server and when compiling with the `server` option.
	* Takes a component and returns an object with `body` and `head` properties on it, which you can use to populate the HTML when server-rendering your app.
	* @template {Record<string, any>} Props
	* @param {Component<Props>} component
	* @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp }} [options]
	* @returns {RenderOutput}
	*/
	static render(component, options = {}) {
		/** @type {AccumulatedContent | undefined} */
		let sync;
		/** @type {Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }> | undefined} */
		let async;
		const result = {};
		Object.defineProperties(result, {
			html: { get: () => {
				var _sync;
				return ((_sync = sync) !== null && _sync !== void 0 ? _sync : sync = _render.call(Renderer, component, options)).body;
			} },
			head: { get: () => {
				var _sync2;
				return ((_sync2 = sync) !== null && _sync2 !== void 0 ? _sync2 : sync = _render.call(Renderer, component, options)).head;
			} },
			body: { get: () => {
				var _sync3;
				return ((_sync3 = sync) !== null && _sync3 !== void 0 ? _sync3 : sync = _render.call(Renderer, component, options)).body;
			} },
			hashes: { value: { script: "" } },
			then: { value: 
			/**
			* this is not type-safe, but honestly it's the best I can do right now, and it's a straightforward function.
			*
			* @template TResult1
			* @template [TResult2=never]
			* @param { (value: SyncRenderOutput) => TResult1 } onfulfilled
			* @param { (reason: unknown) => TResult2 } onrejected
			*/
			(onfulfilled, onrejected) => {
				var _async;
				if (!async_mode_flag) {
					var _sync4;
					const result = (_sync4 = sync) !== null && _sync4 !== void 0 ? _sync4 : sync = _render.call(Renderer, component, options);
					const user_result = onfulfilled({
						head: result.head,
						body: result.body,
						html: result.body,
						hashes: { script: [] }
					});
					return Promise.resolve(user_result);
				}
				(_async = async) !== null && _async !== void 0 || (async = init_render_context().then(() => with_render_context(() => _render_async.call(Renderer, component, options))));
				return async.then((result) => {
					Object.defineProperty(result, "html", { get: () => {
						html_deprecated();
					} });
					return onfulfilled(result);
				}, onrejected);
			} }
		});
		return result;
	}
};
_Renderer = Renderer;
/**
* Creates the hydration comment that marks the start of a failed boundary.
* The error is JSON-serialized and embedded inside an HTML comment for the client
* to parse during hydration. The JSON is escaped to prevent `-->` or `<!--` sequences
* from breaking out of the comment (XSS). Uses unicode escapes which `JSON.parse()`
* handles transparently.
* @param {unknown} error
* @returns {string}
*/
function _serialize_failed_boundary(error) {
	return `<!--[?${JSON.stringify(error).replace(/>/g, "\\u003e").replace(/</g, "\\u003c")}-->`;
}
/**
* Collect all of the `onDestroy` callbacks registered during rendering. In an async context, this is only safe to call
* after awaiting `collect_async`.
*
* Child renderers are "porous" and don't affect execution order, but component body renderers
* create ordering boundaries. Within a renderer, callbacks run in order until hitting a component boundary.
* @returns {Iterable<() => void>}
*/
function* _collect_on_destroy() {
	for (const component of _assertClassBrand(_Renderer_brand, this, _traverse_components).call(this)) yield* _assertClassBrand(_Renderer_brand, component, _collect_ondestroy).call(component);
}
/**
* Performs a depth-first search of renderers, yielding the deepest components first, then additional components as we backtrack up the tree.
* @returns {Iterable<Renderer>}
*/
function* _traverse_components() {
	for (const child of _classPrivateFieldGet2(_out, this)) if (typeof child !== "string") yield* _assertClassBrand(_Renderer_brand, child, _traverse_components).call(child);
	if (_classPrivateFieldGet2(_is_component_body, this)) yield this;
}
/**
* @returns {Iterable<() => void>}
*/
function* _collect_ondestroy() {
	if (_classPrivateFieldGet2(_on_destroy, this)) for (const fn of _classPrivateFieldGet2(_on_destroy, this)) yield fn;
	for (const child of _classPrivateFieldGet2(_out, this)) if (child instanceof _Renderer && !_classPrivateFieldGet2(_is_component_body, child)) yield* _assertClassBrand(_Renderer_brand, child, _collect_ondestroy).call(child);
}
/**
* Runs every `onDestroy` callback in this renderer tree. On a failed render,
* cleanup errors are suppressed so they do not mask the render error.
* @param {boolean} suppress_errors
*/
function _run_on_destroy(suppress_errors) {
	let first_error;
	let has_error = false;
	for (const cleanup of _assertClassBrand(_Renderer_brand, this, _collect_on_destroy).call(this)) try {
		cleanup();
	} catch (error) {
		if (!suppress_errors && !has_error) {
			first_error = error;
			has_error = true;
		}
	}
	if (has_error) throw first_error;
}
/**
* @param {'sync' | 'async'} mode
* @param {{ idPrefix?: string; csp?: Csp; transformError?: (error: unknown) => unknown }} options
* @returns {Renderer}
*/
function _create(mode, options) {
	var _options$idPrefix;
	if ((_options$idPrefix = options.idPrefix) === null || _options$idPrefix === void 0 ? void 0 : _options$idPrefix.includes("--")) invalid_id_prefix();
	return new _Renderer(new SSRState(mode, options.idPrefix ? options.idPrefix + "-" : "", options.csp, options.transformError));
}
/**
* Render a component. Throws if any of the children are performing asynchronous work.
*
* @template {Record<string, any>} Props
* @param {Component<Props>} component
* @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string }} options
* @returns {AccumulatedContent}
*/
function _render(component, options) {
	var previous_context = ssr_context;
	const renderer = _create.call(_Renderer, "sync", options);
	/** @type {AccumulatedContent | undefined} */
	let result;
	let render_error;
	let failed = false;
	try {
		try {
			_open_render.call(_Renderer, renderer, component, options);
			result = _close_render.call(_Renderer, _assertClassBrand(_Renderer_brand, renderer, _collect_content).call(renderer), renderer);
		} catch (error) {
			render_error = error;
			failed = true;
		}
		_assertClassBrand(_Renderer_brand, renderer, _run_on_destroy).call(renderer, failed);
		if (failed) throw render_error;
		return result;
	} finally {
		renderer.global.abort();
		set_ssr_context(previous_context);
	}
}
/**
* Render a component.
*
* @template {Record<string, any>} Props
* @param {Component<Props>} component
* @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp }} options
* @returns {Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }>}
*/
async function _render_async(component, options) {
	const previous_context = ssr_context;
	const renderer = _create.call(_Renderer, "async", options);
	/** @type {(AccumulatedContent & { hashes: { script: Sha256Source[] } }) | undefined} */
	let result;
	let render_error;
	let failed = false;
	try {
		try {
			_open_render.call(_Renderer, renderer, component, options);
			const content = await _assertClassBrand(_Renderer_brand, renderer, _collect_content_async).call(renderer);
			const hydratables = await _assertClassBrand(_Renderer_brand, renderer, _collect_hydratables).call(renderer);
			if (hydratables !== null) content.head = hydratables + content.head;
			result = _close_render.call(_Renderer, content, renderer);
		} catch (error) {
			render_error = error;
			failed = true;
			renderer.global.abort();
			await renderer.global.settle();
		}
		_assertClassBrand(_Renderer_brand, renderer, _run_on_destroy).call(renderer, failed);
		if (failed) throw render_error;
		return result;
	} finally {
		set_ssr_context(previous_context);
		renderer.global.abort();
	}
}
/**
* Collect all of the code from the `out` array and return it as a string, or a promise resolving to a string.
* @param {AccumulatedContent} content
* @returns {AccumulatedContent}
*/
function _collect_content(content = {
	head: "",
	body: ""
}) {
	for (const item of _classPrivateFieldGet2(_out, this)) if (typeof item === "string") content[this.type] += item;
	else if (item instanceof _Renderer) _assertClassBrand(_Renderer_brand, item, _collect_content).call(item, content);
	return content;
}
/**
* Collect all of the code from the `out` array and return it as a string.
* @param {AccumulatedContent} content
* @returns {Promise<AccumulatedContent>}
*/
async function _collect_content_async(content = {
	head: "",
	body: ""
}) {
	await this.promise;
	for (const item of _classPrivateFieldGet2(_out, this)) if (typeof item === "string") content[this.type] += item;
	else if (item instanceof _Renderer) {
		if (_classPrivateFieldGet2(_boundary, item)) {
			/** @type {AccumulatedContent} */
			const boundary_content = {
				head: "",
				body: ""
			};
			try {
				await _assertClassBrand(_Renderer_brand, item, _collect_content_async).call(item, boundary_content);
				content.head += boundary_content.head;
				content.body += boundary_content.body;
			} catch (error) {
				const { context, failed, transformError } = _classPrivateFieldGet2(_boundary, item);
				set_ssr_context(context);
				let promise = transformError(error);
				set_ssr_context(null);
				let transformed = await promise;
				set_ssr_context(context);
				const failed_renderer = new _Renderer(item.global, item);
				failed_renderer.type = item.type;
				_classPrivateFieldGet2(_out, failed_renderer).push(_serialize_failed_boundary.call(_Renderer, transformed));
				failed(failed_renderer, transformed, noop);
				_classPrivateFieldGet2(_out, failed_renderer).push(BLOCK_CLOSE);
				await _assertClassBrand(_Renderer_brand, failed_renderer, _collect_content_async).call(failed_renderer, content);
			}
		} else await _assertClassBrand(_Renderer_brand, item, _collect_content_async).call(item, content);
	}
	return content;
}
async function _collect_hydratables() {
	const ctx = get_render_context().hydratable;
	for (const [_, key] of ctx.unresolved_promises) {
		var _ctx$lookup$get$stack, _ctx$lookup$get;
		unresolved_hydratable(key, (_ctx$lookup$get$stack = (_ctx$lookup$get = ctx.lookup.get(key)) === null || _ctx$lookup$get === void 0 ? void 0 : _ctx$lookup$get.stack) !== null && _ctx$lookup$get$stack !== void 0 ? _ctx$lookup$get$stack : "<missing stack trace>");
	}
	for (const comparison of ctx.comparisons) await comparison;
	return await _assertClassBrand(_Renderer_brand, this, _hydratable_block).call(this, ctx);
}
/**
* @template {Record<string, any>} Props
* @param {Renderer} renderer
* @param {import('svelte').Component<Props>} component
* @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp; transformError?: (error: unknown) => unknown }} options
* @returns {void}
*/
function _open_render(renderer, component, options) {
	var previous_context = ssr_context;
	try {
		var _options$context, _options$props;
		set_ssr_context({
			p: null,
			c: (_options$context = options.context) !== null && _options$context !== void 0 ? _options$context : null,
			r: renderer
		});
		renderer.push(BLOCK_OPEN);
		component(renderer, (_options$props = options.props) !== null && _options$props !== void 0 ? _options$props : {});
		renderer.push(BLOCK_CLOSE);
	} finally {
		set_ssr_context(previous_context);
	}
}
/**
* @param {AccumulatedContent} content
* @param {Renderer} renderer
* @returns {AccumulatedContent & { hashes: { script: Sha256Source[] } }}
*/
function _close_render(content, renderer) {
	let head = content.head + renderer.global.get_title();
	let body = content.body;
	for (const { hash, code } of renderer.global.css) head += `<style id="${hash}">${code}</style>`;
	return {
		head,
		body,
		hashes: { script: renderer.global.csp.script_hashes }
	};
}
/**
* @param {HydratableContext} ctx
*/
async function _hydratable_block(ctx) {
	if (ctx.lookup.size === 0) return null;
	let entries = [];
	let has_promises = false;
	for (const [k, v] of ctx.lookup) {
		if (v.promises) {
			has_promises = true;
			for (const p of v.promises) await p;
		}
		entries.push(`[${devalue.uneval(k)},${v.serialized}]`);
	}
	let prelude = `const h = (window.__svelte ??= {}).h ??= new Map();`;
	if (has_promises) prelude = `const r = (v) => Promise.resolve(v);
				${prelude}`;
	const body = `
			{
				${prelude}

				for (const [k, v] of [
					${entries.join(",\n					")}
				]) {
					h.set(k, v);
				}
			}
		`;
	let csp_attr = "";
	if (this.global.csp.nonce) csp_attr = ` nonce="${this.global.csp.nonce}"`;
	else if (this.global.csp.hash) {
		const hash = await sha256(body);
		this.global.csp.script_hashes.push(`sha256-${hash}`);
	}
	return `\n\t\t<script${csp_attr}>${body}<\/script>`;
}
var _pending = /* @__PURE__ */ new WeakMap();
var _controller = /* @__PURE__ */ new WeakMap();
var _aborted = /* @__PURE__ */ new WeakMap();
var _title = /* @__PURE__ */ new WeakMap();
var SSRState = class {
	/**
	* @param {'sync' | 'async'} mode
	* @param {string} id_prefix
	* @param {Csp} csp
	* @param {((error: unknown) => unknown) | undefined} [transformError]
	*/
	constructor(mode, id_prefix = "", csp = { hash: false }, transformError) {
		_defineProperty(
			this,
			/** @readonly @type {Csp & { script_hashes: Sha256Source[] }} */
			"csp",
			void 0
		);
		_defineProperty(
			this,
			/** @readonly @type {'sync' | 'async'} */
			"mode",
			void 0
		);
		_defineProperty(
			this,
			/** @readonly @type {() => string} */
			"uid",
			void 0
		);
		_defineProperty(
			this,
			/** @readonly @type {Set<{ hash: string; code: string }>} */
			"css",
			/* @__PURE__ */ new Set()
		);
		_classPrivateFieldInitSpec(this, _pending, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _controller, null);
		_classPrivateFieldInitSpec(this, _aborted, false);
		_defineProperty(
			this,
			/**
			* `transformError` passed to `render`. Called when an error boundary catches an error.
			* Throws by default if unset in `render`.
			* @type {(error: unknown) => unknown}
			*/
			"transformError",
			void 0
		);
		_classPrivateFieldInitSpec(this, _title, {
			path: [],
			value: ""
		});
		this.mode = mode;
		this.csp = {
			...csp,
			script_hashes: []
		};
		this.transformError = transformError !== null && transformError !== void 0 ? transformError : ((error) => {
			throw error;
		});
		let uid = 1;
		this.uid = () => `${id_prefix}s${uid++}`;
	}
	/**
	* @template T
	* @param {Promise<T>} promise
	* @returns {Promise<T>}
	*/
	track(promise) {
		_classPrivateFieldGet2(_pending, this).add(promise);
		promise.then(() => _classPrivateFieldGet2(_pending, this).delete(promise), () => _classPrivateFieldGet2(_pending, this).delete(promise));
		return promise;
	}
	async settle() {
		while (_classPrivateFieldGet2(_pending, this).size > 0) await Promise.allSettled([..._classPrivateFieldGet2(_pending, this)]);
	}
	abort() {
		var _classPrivateFieldGet3;
		if (_classPrivateFieldGet2(_aborted, this)) return;
		_classPrivateFieldSet2(_aborted, this, true);
		(_classPrivateFieldGet3 = _classPrivateFieldGet2(_controller, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.abort(STALE_REACTION);
	}
	get_abort_signal() {
		var _classPrivateFieldGet4;
		const controller = (_classPrivateFieldGet4 = _classPrivateFieldGet2(_controller, this)) !== null && _classPrivateFieldGet4 !== void 0 ? _classPrivateFieldGet4 : _classPrivateFieldSet2(_controller, this, new AbortController());
		if (_classPrivateFieldGet2(_aborted, this)) controller.abort(STALE_REACTION);
		return controller.signal;
	}
	get_title() {
		return _classPrivateFieldGet2(_title, this).value;
	}
	/**
	* Performs a depth-first (lexicographic) comparison using the path. Rejects sets
	* from earlier than or equal to the current value.
	* @param {string} value
	* @param {number[]} path
	*/
	set_title(value, path) {
		const current = _classPrivateFieldGet2(_title, this).path;
		let i = 0;
		let l = Math.min(path.length, current.length);
		while (i < l && path[i] === current[i]) i += 1;
		if (path[i] === void 0) return;
		if (current[i] === void 0 || path[i] > current[i]) {
			_classPrivateFieldGet2(_title, this).path = path;
			_classPrivateFieldGet2(_title, this).value = value;
		}
	}
};
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/server/dev.js
function get_user_code_location() {
	return get_stack().filter((line) => line.trim().startsWith("at ")).map((line) => line.replace(/\((.*):\d+:\d+\)$/, (_, file) => `(${file})`)).join("\n");
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/server/index.js
var INVALID_ATTR_NAME_CHAR_REGEX = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
/**
* Only available on the server and when compiling with the `server` option.
* Takes a component and returns an object with `body` and `head` properties on it, which you can use to populate the HTML when server-rendering your app.
* @template {Record<string, any>} Props
* @param {Component<Props> | ComponentType<SvelteComponent<Props>>} component
* @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp; transformError?: (error: unknown) => unknown }} [options]
* @returns {RenderOutput}
*/
function render(component, options = {}) {
	var _options$csp;
	if (((_options$csp = options.csp) === null || _options$csp === void 0 ? void 0 : _options$csp.hash) && options.csp.nonce) invalid_csp();
	return Renderer.render(component, options);
}
/**
* @param {Record<string, unknown>} attrs
* @param {string} [css_hash]
* @param {Record<string, boolean>} [classes]
* @param {Record<string, string>} [styles]
* @param {number} [flags]
* @returns {string}
*/
function attributes(attrs, css_hash, classes, styles, flags = 0) {
	if (styles) attrs.style = to_style(attrs.style, styles);
	if (attrs.class) attrs.class = clsx$1(attrs.class);
	if (css_hash || classes) attrs.class = to_class(attrs.class, css_hash, classes);
	let attr_str = "";
	let name;
	const is_html = (flags & 1) === 0;
	const lowercase = (flags & 2) === 0;
	const is_input = (flags & 4) !== 0;
	for (name of Object.keys(attrs)) {
		if (typeof attrs[name] === "function") continue;
		if (name[0] === "$" && name[1] === "$") continue;
		if (name === "" || INVALID_ATTR_NAME_CHAR_REGEX.test(name)) continue;
		var value = attrs[name];
		var lower = name.toLowerCase();
		if (lowercase) name = lower;
		if (lower.length > 2 && lower.startsWith("on")) continue;
		if (is_input) {
			if (name === "defaultvalue" || name === "defaultchecked") {
				name = name === "defaultvalue" ? "value" : "checked";
				if (attrs[name]) continue;
			}
		}
		attr_str += attr(name, value, is_html && is_boolean_attribute(name));
	}
	return attr_str;
}
/**
* @param {unknown} value
* @returns {string}
*/
function stringify(value) {
	return typeof value === "string" ? value : value == null ? "" : value + "";
}
/**
* @param {any} value
* @param {string | undefined} [hash]
* @param {Record<string, boolean>} [directives]
*/
function attr_class(value, hash, directives) {
	var result = to_class(value, hash, directives);
	return result ? ` class="${escape_html(result, true)}"` : "";
}
/**
* @param {any} value
* @param {Record<string,any>|[Record<string,any>,Record<string,any>]} [directives]
*/
function attr_style(value, directives) {
	var result = to_style(value, directives);
	return result ? ` style="${escape_html(result, true)}"` : "";
}
/**
* Legacy mode: If the prop has a fallback and is bound in the
* parent component, propagate the fallback value upwards.
* @param {Record<string, unknown>} props_parent
* @param {Record<string, unknown>} props_now
*/
function bind_props(props_parent, props_now) {
	for (const key of Object.keys(props_now)) {
		var _Object$getOwnPropert;
		const initial_value = props_parent[key];
		const value = props_now[key];
		if (initial_value === void 0 && value !== void 0 && ((_Object$getOwnPropert = Object.getOwnPropertyDescriptor(props_parent, key)) === null || _Object$getOwnPropert === void 0 ? void 0 : _Object$getOwnPropert.set)) props_parent[key] = value;
	}
}
/** @param {any} array_like_or_iterator */
function ensure_array_like(array_like_or_iterator) {
	if (array_like_or_iterator) return array_like_or_iterator.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
	return [];
}
/**
* @template V
* @param {() => V} get_value
*/
function once(get_value) {
	let value = UNINITIALIZED;
	return () => {
		if (value === UNINITIALIZED) value = get_value();
		return value;
	};
}
/**
* @template T
* @param {()=>T} fn
* @returns {(new_value?: T) => (T | void)}
*/
function derived(fn) {
	const get_value = ssr_context === null ? fn : once(fn);
	/** @type {T | undefined} */
	let updated_value;
	return function(new_value) {
		if (arguments.length === 0) {
			var _updated_value;
			return (_updated_value = updated_value) !== null && _updated_value !== void 0 ? _updated_value : get_value();
		}
		updated_value = new_value;
		return updated_value;
	};
}
//#endregion
export { _classPrivateMethodInitSpec as $, untrack as A, noop as At, clear_text_content as B, readable as C, EFFECT_PRESERVED as Ct, get as D, array_from as Dt, active_reaction as E, _defineProperty as Et, effect_tracking as F, increment as G, get_first_child as H, move_effect as I, set as J, internal_set as K, pause_effect as L, branch as M, component_root as N, set_active_effect as O, define_property as Ot, destroy_effect as P, flushSync as Q, render_effect as R, is_passive_event as S, HYDRATION_ERROR as St, active_effect as T, LEGACY_PROPS as Tt, get_next_sibling as U, create_text as V, init_operations as W, Batch as X, source as Y, current_batch as Z, setContext as _, set_hydrating as _t, ensure_array_like as a, push$1 as at, clsx$1 as b, lifecycle_double_unmount as bt, get_user_code_location as c, async_mode_flag as ct, hydratable_serialization_failed as d, experimental_async_required as dt, defer_effect as et, lifecycle_function_unavailable as f, hydrate_next as ft, hasContext as g, set_hydrate_node as gt, getContext as h, next as ht, derived as i, pop$1 as it, block as j, run as jt, set_active_reaction as k, fallback as kt, get_render_context as l, hydration_failed as lt, getAllContexts as m, hydrating as mt, attr_style as n, component_context as nt, render as o, set_component_context as ot, createContext as p, hydrate_node as pt, mutable_source as q, bind_props as r, mark_as_component as rt, stringify as s, tag as st, attr_class as t, queue_micro_task as tt, hydratable_clobbering as u, svelte_boundary_reset_onerror as ut, ssr_context as v, skip_nodes as vt, writable as w, EFFECT_TRANSPARENT as wt, escape_html as x, svelte_boundary_reset_noop as xt, attr as y, hydration_mismatch as yt, invoke_error_boundary as z };
