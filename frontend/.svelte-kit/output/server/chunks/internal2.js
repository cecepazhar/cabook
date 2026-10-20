import "./index-server.js";
import "./internal.js";
import { a as _assertClassBrand, i as _classPrivateFieldSet2, o as _classPrivateFieldInitSpec, r as _classPrivateFieldGet2 } from "./wrapAsyncGenerator.js";
import { $ as _classPrivateMethodInitSpec, A as untrack, B as clear_text_content, Ct as EFFECT_PRESERVED, D as get, Dt as array_from, E as active_reaction, Et as _defineProperty, F as effect_tracking, G as increment, H as get_first_child, I as move_effect, J as set, K as internal_set, L as pause_effect, M as branch, N as component_root, O as set_active_effect, Ot as define_property, P as destroy_effect, Q as flushSync, R as render_effect, S as is_passive_event, St as HYDRATION_ERROR, T as active_effect, Tt as LEGACY_PROPS, U as get_next_sibling, V as create_text, W as init_operations, X as Batch, Y as source, Z as current_batch, _ as setContext, _t as set_hydrating, at as push, ct as async_mode_flag, et as defer_effect, ft as hydrate_next, gt as set_hydrate_node, ht as next, i as derived, it as pop, j as block, k as set_active_reaction, lt as hydration_failed, mt as hydrating, nt as component_context, o as render, ot as set_component_context, pt as hydrate_node, q as mutable_source, rt as mark_as_component, tt as queue_micro_task, ut as svelte_boundary_reset_onerror, vt as skip_nodes, wt as EFFECT_TRANSPARENT, xt as svelte_boundary_reset_noop, yt as hydration_mismatch, z as invoke_error_boundary } from "./server.js";
/**
* `$env/dynamic/public`
* @type {Record<string, string>}
*/
var public_env = {};
/** @type {(environment: Record<string, string>) => void} */
function set_private_env(environment) {}
/** @type {(environment: Record<string, string>) => void} */
function set_public_env(environment) {
	public_env = environment;
}
//#endregion
//#region \0virtual:__sveltekit/server
var read_implementation = null;
function set_read_implementation(fn) {
	read_implementation = fn;
}
function set_manifest(_) {}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/dom/elements/events.js
/**
* Used on elements, as a map of event type -> event handler,
* and on events themselves to track which element handled an event
*/
var event_symbol = Symbol("events");
/** @type {Set<string>} */
var all_registered_events = /* @__PURE__ */ new Set();
/** @type {Set<(events: Array<string>) => void>} */
var root_event_handles = /* @__PURE__ */ new Set();
var last_propagated_event = null;
var last_propagated_event_clear_scheduled = false;
/**
* @this {EventTarget}
* @param {Event} event
* @returns {void}
*/
function handle_event_propagation(event) {
	var _event$composedPath;
	var handler_element = this;
	var owner_document = handler_element.ownerDocument;
	var event_name = event.type;
	var path = ((_event$composedPath = event.composedPath) === null || _event$composedPath === void 0 ? void 0 : _event$composedPath.call(event)) || [];
	var current_target = path[0] || event.target;
	last_propagated_event = event;
	if (!last_propagated_event_clear_scheduled) {
		last_propagated_event_clear_scheduled = true;
		setTimeout(() => {
			last_propagated_event_clear_scheduled = false;
			last_propagated_event = null;
		});
	}
	var path_idx = 0;
	var handled_at = last_propagated_event === event && event[event_symbol];
	if (handled_at) {
		var at_idx = path.indexOf(handled_at);
		if (at_idx !== -1 && (handler_element === document || handler_element === window)) {
			event[event_symbol] = handler_element;
			return;
		}
		var handler_idx = path.indexOf(handler_element);
		if (handler_idx === -1) return;
		if (at_idx <= handler_idx) path_idx = at_idx;
	}
	current_target = path[path_idx] || event.target;
	if (current_target === handler_element) return;
	define_property(event, "currentTarget", {
		configurable: true,
		get() {
			return current_target || owner_document;
		}
	});
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		/**
		* @type {unknown}
		*/
		var throw_error;
		/**
		* @type {unknown[]}
		*/
		var other_errors = [];
		while (current_target !== null) {
			if (current_target === handler_element) break;
			try {
				var _current_target$event;
				var delegated = (_current_target$event = current_target[event_symbol]) === null || _current_target$event === void 0 ? void 0 : _current_target$event[event_name];
				if (delegated != null && (!current_target.disabled || event.target === current_target)) delegated.call(current_target, event);
			} catch (error) {
				if (throw_error) other_errors.push(error);
				else throw_error = error;
			}
			if (event.cancelBubble) break;
			path_idx++;
			current_target = path_idx < path.length ? path[path_idx] : null;
		}
		if (throw_error) {
			for (let error of other_errors) queueMicrotask(() => {
				throw error;
			});
			throw throw_error;
		}
	} finally {
		event[event_symbol] = handler_element;
		delete event.currentTarget;
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/dom/reconciler.js
var _globalThis;
(_globalThis = globalThis) !== null && _globalThis !== void 0 && (_globalThis = _globalThis.window) !== null && _globalThis !== void 0 && _globalThis.trustedTypes;
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/dom/template.js
/**
* @param {TemplateNode} start
* @param {TemplateNode | null} end
*/
function assign_nodes(start, end) {
	var effect = active_effect;
	if (effect.nodes === null) effect.nodes = {
		start,
		end,
		a: null,
		t: null
	};
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/reactivity/create-subscriber.js
/**
* Returns a `subscribe` function that integrates external event-based systems with Svelte's reactivity.
* It's particularly useful for integrating with web APIs like `MediaQuery`, `IntersectionObserver`, or `WebSocket`.
*
* If `subscribe` is called inside an effect (including indirectly, for example inside a getter),
* the `start` callback will be called with an `update` function. Whenever `update` is called, the effect re-runs.
*
* If `start` returns a cleanup function, it will be called when the effect is destroyed.
*
* If `subscribe` is called in multiple effects, `start` will only be called once as long as the effects
* are active, and the returned teardown function will only be called when all effects are destroyed.
*
* It's best understood with an example. Here's an implementation of [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery):
*
* ```js
* import { createSubscriber } from 'svelte/reactivity';
* import { on } from 'svelte/events';
*
* export class MediaQuery {
* 	#query;
* 	#subscribe;
*
* 	constructor(query) {
* 		this.#query = window.matchMedia(`(${query})`);
*
* 		this.#subscribe = createSubscriber((update) => {
* 			// when the `change` event occurs, re-run any effects that read `this.current`
* 			const off = on(this.#query, 'change', update);
*
* 			// stop listening when all the effects are destroyed
* 			return () => off();
* 		});
* 	}
*
* 	get current() {
* 		// This makes the getter reactive, if read in an effect
* 		this.#subscribe();
*
* 		// Return the current state of the query, whether or not we're in an effect
* 		return this.#query.matches;
* 	}
* }
* ```
* @param {(update: () => void) => (() => void) | void} start
* @since 5.7.0
*/
function createSubscriber(start) {
	let subscribers = 0;
	let version = source(0);
	/** @type {(() => void) | void} */
	let stop;
	return () => {
		if (effect_tracking()) {
			get(version);
			render_effect(() => {
				if (subscribers === 0) stop = untrack(() => start(() => increment(version)));
				subscribers += 1;
				return () => {
					queue_micro_task(() => {
						subscribers -= 1;
						if (subscribers === 0) {
							stop === null || stop === void 0 || stop();
							stop = void 0;
							increment(version);
						}
					});
				};
			});
		}
	};
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/internal/client/dom/blocks/boundary.js
/** @import { Effect, Source, TemplateNode, } from '#client' */
/**
* @typedef {{
* 	 onerror?: ((error: unknown, reset: () => void) => void) | null;
*   failed?: ((anchor: Node, error: () => unknown, reset: () => () => void) => void) | null;
*   pending?: ((anchor: Node) => void) | null;
* }} BoundaryProps
*/
var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
/**
* @param {TemplateNode} node
* @param {BoundaryProps} props
* @param {((anchor: Node) => void)} children
* @param {((error: unknown) => unknown) | undefined} [transform_error]
* @returns {void}
*/
function boundary(node, props, children, transform_error) {
	new Boundary(node, props, children, transform_error);
}
var _anchor = /* @__PURE__ */ new WeakMap();
var _hydrate_open = /* @__PURE__ */ new WeakMap();
var _props = /* @__PURE__ */ new WeakMap();
var _children = /* @__PURE__ */ new WeakMap();
var _effect = /* @__PURE__ */ new WeakMap();
var _main_effect = /* @__PURE__ */ new WeakMap();
var _pending_effect = /* @__PURE__ */ new WeakMap();
var _failed_effect = /* @__PURE__ */ new WeakMap();
var _offscreen_fragment = /* @__PURE__ */ new WeakMap();
var _local_pending_count = /* @__PURE__ */ new WeakMap();
var _pending_count = /* @__PURE__ */ new WeakMap();
var _pending_count_update_queued = /* @__PURE__ */ new WeakMap();
var _dirty_effects = /* @__PURE__ */ new WeakMap();
var _maybe_dirty_effects = /* @__PURE__ */ new WeakMap();
var _effect_pending = /* @__PURE__ */ new WeakMap();
var _effect_pending_subscriber = /* @__PURE__ */ new WeakMap();
var _Boundary_brand = /* @__PURE__ */ new WeakSet();
var Boundary = class {
	/**
	* @param {TemplateNode} node
	* @param {BoundaryProps} props
	* @param {((anchor: Node) => void)} children
	* @param {((error: unknown) => unknown) | undefined} [transform_error]
	*/
	constructor(node, props, children, transform_error) {
		var _ref, _this$parent;
		_classPrivateMethodInitSpec(this, _Boundary_brand);
		_defineProperty(
			this,
			/** @type {Boundary | null} */
			"parent",
			void 0
		);
		_defineProperty(this, "is_pending", false);
		_defineProperty(
			this,
			/**
			* API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
			* Inherited from parent boundary, or defaults to identity.
			* @type {(error: unknown) => unknown}
			*/
			"transform_error",
			void 0
		);
		_classPrivateFieldInitSpec(this, _anchor, void 0);
		_classPrivateFieldInitSpec(this, _hydrate_open, hydrating ? hydrate_node : null);
		_classPrivateFieldInitSpec(this, _props, void 0);
		_classPrivateFieldInitSpec(this, _children, void 0);
		_classPrivateFieldInitSpec(this, _effect, void 0);
		_classPrivateFieldInitSpec(this, _main_effect, null);
		_classPrivateFieldInitSpec(this, _pending_effect, null);
		_classPrivateFieldInitSpec(this, _failed_effect, null);
		_classPrivateFieldInitSpec(this, _offscreen_fragment, null);
		_classPrivateFieldInitSpec(this, _local_pending_count, 0);
		_classPrivateFieldInitSpec(this, _pending_count, 0);
		_classPrivateFieldInitSpec(this, _pending_count_update_queued, false);
		_classPrivateFieldInitSpec(this, _dirty_effects, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _maybe_dirty_effects, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _effect_pending, null);
		_classPrivateFieldInitSpec(this, _effect_pending_subscriber, createSubscriber(() => {
			_classPrivateFieldSet2(_effect_pending, this, source(_classPrivateFieldGet2(_local_pending_count, this)));
			return () => {
				_classPrivateFieldSet2(_effect_pending, this, null);
			};
		}));
		_classPrivateFieldSet2(_anchor, this, node);
		_classPrivateFieldSet2(_props, this, props);
		_classPrivateFieldSet2(_children, this, (anchor) => {
			var effect = active_effect;
			effect.b = this;
			effect.f |= 128;
			children(anchor);
		});
		this.parent = active_effect.b;
		this.transform_error = (_ref = transform_error !== null && transform_error !== void 0 ? transform_error : (_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.transform_error) !== null && _ref !== void 0 ? _ref : ((e) => e);
		_classPrivateFieldSet2(_effect, this, block(() => {
			if (hydrating) {
				const comment = _classPrivateFieldGet2(_hydrate_open, this);
				hydrate_next();
				const server_rendered_pending = comment.data === "[!";
				if (comment.data.startsWith("[?")) {
					const serialized_error = JSON.parse(comment.data.slice(2));
					_assertClassBrand(_Boundary_brand, this, _hydrate_failed_content).call(this, serialized_error);
				} else if (server_rendered_pending) _assertClassBrand(_Boundary_brand, this, _hydrate_pending_content).call(this);
				else _assertClassBrand(_Boundary_brand, this, _hydrate_resolved_content).call(this);
			} else _assertClassBrand(_Boundary_brand, this, _render).call(this);
		}, flags));
		if (hydrating) _classPrivateFieldSet2(_anchor, this, hydrate_node);
	}
	/**
	* Defer an effect inside a pending boundary until the boundary resolves
	* @param {Effect} effect
	*/
	defer_effect(effect) {
		defer_effect(effect, _classPrivateFieldGet2(_dirty_effects, this), _classPrivateFieldGet2(_maybe_dirty_effects, this));
	}
	/**
	* Returns `false` if the effect exists inside a boundary whose pending snippet is shown
	* @returns {boolean}
	*/
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!_classPrivateFieldGet2(_props, this).pending;
	}
	/**
	* Update the source that powers `$effect.pending()` inside this boundary,
	* and controls when the current `pending` snippet (if any) is removed.
	* Do not call from inside the class
	* @param {1 | -1} d
	* @param {Batch} batch
	*/
	update_pending_count(d, batch) {
		_assertClassBrand(_Boundary_brand, this, _update_pending_count).call(this, d, batch);
		_classPrivateFieldSet2(_local_pending_count, this, _classPrivateFieldGet2(_local_pending_count, this) + d);
		if (!_classPrivateFieldGet2(_effect_pending, this) || _classPrivateFieldGet2(_pending_count_update_queued, this)) return;
		_classPrivateFieldSet2(_pending_count_update_queued, this, true);
		queue_micro_task(() => {
			_classPrivateFieldSet2(_pending_count_update_queued, this, false);
			if (_classPrivateFieldGet2(_effect_pending, this)) internal_set(_classPrivateFieldGet2(_effect_pending, this), _classPrivateFieldGet2(_local_pending_count, this));
		});
	}
	get_effect_pending() {
		_classPrivateFieldGet2(_effect_pending_subscriber, this).call(this);
		return get(_classPrivateFieldGet2(_effect_pending, this));
	}
	/** @param {unknown} error */
	error(error) {
		if (!_classPrivateFieldGet2(_props, this).onerror && !_classPrivateFieldGet2(_props, this).failed) throw error;
		if (current_batch === null || current_batch === void 0 ? void 0 : current_batch.is_fork) {
			if (_classPrivateFieldGet2(_main_effect, this)) current_batch.skip_effect(_classPrivateFieldGet2(_main_effect, this));
			if (_classPrivateFieldGet2(_pending_effect, this)) current_batch.skip_effect(_classPrivateFieldGet2(_pending_effect, this));
			if (_classPrivateFieldGet2(_failed_effect, this)) current_batch.skip_effect(_classPrivateFieldGet2(_failed_effect, this));
			current_batch.oncommit(() => {
				_assertClassBrand(_Boundary_brand, this, _handle_error).call(this, error);
			});
		} else _assertClassBrand(_Boundary_brand, this, _handle_error).call(this, error);
	}
};
function _hydrate_resolved_content() {
	try {
		_classPrivateFieldSet2(_main_effect, this, branch(() => _classPrivateFieldGet2(_children, this).call(this, _classPrivateFieldGet2(_anchor, this))));
	} catch (error) {
		this.error(error);
	}
}
/**
* @param {unknown} error The deserialized error from the server's hydration comment
*/
function _hydrate_failed_content(error) {
	const failed = _classPrivateFieldGet2(_props, this).failed;
	const { reset, invoke_onerror } = _assertClassBrand(_Boundary_brand, this, _create_reset).call(this, error);
	queue_micro_task(invoke_onerror);
	if (!failed) return;
	_classPrivateFieldSet2(_failed_effect, this, branch(() => {
		failed(_classPrivateFieldGet2(_anchor, this), () => error, () => reset);
	}));
}
/**
* Creates the `reset` function for a failed boundary, along with a function
* that invokes `onerror` with it (if provided)
* @param {unknown} error
* @returns {{ reset: () => void, invoke_onerror: () => void }}
*/
function _create_reset(error) {
	var did_reset = false;
	var calling_on_error = false;
	const reset = () => {
		if (did_reset) {
			svelte_boundary_reset_noop();
			return;
		}
		did_reset = true;
		if (calling_on_error) svelte_boundary_reset_onerror();
		if (_classPrivateFieldGet2(_failed_effect, this) !== null) pause_effect(_classPrivateFieldGet2(_failed_effect, this), () => {
			_classPrivateFieldSet2(_failed_effect, this, null);
		});
		_assertClassBrand(_Boundary_brand, this, _run).call(this, () => {
			_assertClassBrand(_Boundary_brand, this, _render).call(this);
		});
	};
	const invoke_onerror = () => {
		try {
			var _classPrivateFieldGet2$1, _classPrivateFieldGet3;
			calling_on_error = true;
			(_classPrivateFieldGet2$1 = (_classPrivateFieldGet3 = _classPrivateFieldGet2(_props, this)).onerror) === null || _classPrivateFieldGet2$1 === void 0 || _classPrivateFieldGet2$1.call(_classPrivateFieldGet3, error, reset);
			calling_on_error = false;
		} catch (err) {
			invoke_error_boundary(err, _classPrivateFieldGet2(_effect, this) && _classPrivateFieldGet2(_effect, this).parent);
		}
	};
	return {
		reset,
		invoke_onerror
	};
}
function _hydrate_pending_content() {
	const pending = _classPrivateFieldGet2(_props, this).pending;
	if (!pending) return;
	this.is_pending = true;
	_classPrivateFieldSet2(_pending_effect, this, branch(() => pending(_classPrivateFieldGet2(_anchor, this))));
	queue_micro_task(() => {
		var fragment = _classPrivateFieldSet2(_offscreen_fragment, this, document.createDocumentFragment());
		var anchor = create_text();
		var handled = false;
		fragment.append(anchor);
		_classPrivateFieldSet2(_main_effect, this, _assertClassBrand(_Boundary_brand, this, _run).call(this, () => {
			try {
				return branch(() => _classPrivateFieldGet2(_children, this).call(this, anchor));
			} catch (error) {
				try {
					this.error(error);
					handled = true;
				} catch (error) {
					invoke_error_boundary(error, _classPrivateFieldGet2(_effect, this).parent);
				}
				return null;
			}
		}));
		if (_classPrivateFieldGet2(_main_effect, this) === null) {
			_classPrivateFieldSet2(_offscreen_fragment, this, null);
			if (handled) _assertClassBrand(_Boundary_brand, this, _resolve).call(this, current_batch);
			return;
		}
		if (_classPrivateFieldGet2(_pending_count, this) === 0) {
			_classPrivateFieldGet2(_anchor, this).before(fragment);
			_classPrivateFieldSet2(_offscreen_fragment, this, null);
			pause_effect(_classPrivateFieldGet2(_pending_effect, this), () => {
				_classPrivateFieldSet2(_pending_effect, this, null);
			});
			_assertClassBrand(_Boundary_brand, this, _resolve).call(this, current_batch);
		}
	});
}
function _render() {
	try {
		this.is_pending = this.has_pending_snippet();
		_classPrivateFieldSet2(_pending_count, this, 0);
		_classPrivateFieldSet2(_local_pending_count, this, 0);
		_classPrivateFieldSet2(_main_effect, this, branch(() => {
			_classPrivateFieldGet2(_children, this).call(this, _classPrivateFieldGet2(_anchor, this));
		}));
		if (_classPrivateFieldGet2(_pending_count, this) > 0) {
			var fragment = _classPrivateFieldSet2(_offscreen_fragment, this, document.createDocumentFragment());
			move_effect(_classPrivateFieldGet2(_main_effect, this), fragment);
			const pending = _classPrivateFieldGet2(_props, this).pending;
			_classPrivateFieldSet2(_pending_effect, this, branch(() => pending(_classPrivateFieldGet2(_anchor, this))));
		} else _assertClassBrand(_Boundary_brand, this, _resolve).call(this, current_batch);
	} catch (error) {
		this.error(error);
	}
}
/**
* @param {Batch} batch
*/
function _resolve(batch) {
	this.is_pending = false;
	batch.transfer_effects(_classPrivateFieldGet2(_dirty_effects, this), _classPrivateFieldGet2(_maybe_dirty_effects, this));
}
/**
* @template T
* @param {() => T} fn
*/
function _run(fn) {
	var previous_effect = active_effect;
	var previous_reaction = active_reaction;
	var previous_ctx = component_context;
	set_active_effect(_classPrivateFieldGet2(_effect, this));
	set_active_reaction(_classPrivateFieldGet2(_effect, this));
	set_component_context(_classPrivateFieldGet2(_effect, this).ctx);
	try {
		Batch.ensure();
		return fn();
	} finally {
		set_active_effect(previous_effect);
		set_active_reaction(previous_reaction);
		set_component_context(previous_ctx);
	}
}
/**
* Updates the pending count associated with the currently visible pending snippet,
* if any, such that we can replace the snippet with content once work is done
* @param {1 | -1} d
* @param {Batch} batch
*/
function _update_pending_count(d, batch) {
	if (!this.has_pending_snippet()) {
		if (this.parent) {
			var _this$parent2;
			_assertClassBrand(_Boundary_brand, _this$parent2 = this.parent, _update_pending_count).call(_this$parent2, d, batch);
		}
		return;
	}
	_classPrivateFieldSet2(_pending_count, this, _classPrivateFieldGet2(_pending_count, this) + d);
	if (_classPrivateFieldGet2(_pending_count, this) === 0) {
		_assertClassBrand(_Boundary_brand, this, _resolve).call(this, batch);
		if (_classPrivateFieldGet2(_pending_effect, this)) pause_effect(_classPrivateFieldGet2(_pending_effect, this), () => {
			_classPrivateFieldSet2(_pending_effect, this, null);
		});
		if (_classPrivateFieldGet2(_offscreen_fragment, this)) {
			_classPrivateFieldGet2(_anchor, this).before(_classPrivateFieldGet2(_offscreen_fragment, this));
			_classPrivateFieldSet2(_offscreen_fragment, this, null);
		}
	}
}
/**
* @param {unknown} error
*/
function _handle_error(error) {
	if (_classPrivateFieldGet2(_main_effect, this)) {
		destroy_effect(_classPrivateFieldGet2(_main_effect, this));
		_classPrivateFieldSet2(_main_effect, this, null);
	}
	if (_classPrivateFieldGet2(_pending_effect, this)) {
		destroy_effect(_classPrivateFieldGet2(_pending_effect, this));
		_classPrivateFieldSet2(_pending_effect, this, null);
	}
	if (_classPrivateFieldGet2(_failed_effect, this)) {
		destroy_effect(_classPrivateFieldGet2(_failed_effect, this));
		_classPrivateFieldSet2(_failed_effect, this, null);
	}
	if (hydrating) {
		set_hydrate_node(_classPrivateFieldGet2(_hydrate_open, this));
		next();
		set_hydrate_node(skip_nodes());
	}
	let failed = _classPrivateFieldGet2(_props, this).failed;
	/** @param {unknown} transformed_error */
	const handle_error_result = (transformed_error) => {
		const { reset, invoke_onerror } = _assertClassBrand(_Boundary_brand, this, _create_reset).call(this, transformed_error);
		invoke_onerror();
		if (failed) _classPrivateFieldSet2(_failed_effect, this, _assertClassBrand(_Boundary_brand, this, _run).call(this, () => {
			try {
				return branch(() => {
					var effect = active_effect;
					effect.b = this;
					effect.f |= 128;
					failed(_classPrivateFieldGet2(_anchor, this), () => transformed_error, () => reset);
				});
			} catch (error) {
				invoke_error_boundary(error, _classPrivateFieldGet2(_effect, this).parent);
				return null;
			}
		}));
	};
	queue_micro_task(() => {
		/** @type {unknown} */
		var result;
		try {
			result = this.transform_error(error);
		} catch (e) {
			invoke_error_boundary(e, _classPrivateFieldGet2(_effect, this) && _classPrivateFieldGet2(_effect, this).parent);
			return;
		}
		if (result !== null && typeof result === "object" && typeof result.then === "function")
 /** @type {any} */ result.then(
			handle_error_result,
			/** @param {unknown} e */
			(e) => invoke_error_boundary(e, _classPrivateFieldGet2(_effect, this) && _classPrivateFieldGet2(_effect, this).parent)
		);
		else handle_error_result(result);
	});
}
/**
* Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component.
* Transitions will play during the initial render unless the `intro` option is set to `false`.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
* @param {MountOptions<Props>} options
* @returns {Exports}
*/
function mount(component, options) {
	return _mount(component, options);
}
/**
* Hydrates a component on the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
* @param {{} extends Props ? {
* 		target: Document | Element | ShadowRoot;
* 		props?: Props;
* 		events?: Record<string, (e: any) => any>;
*  	context?: Map<any, any>;
* 		intro?: boolean;
* 		recover?: boolean;
*		transformError?: (error: unknown) => unknown;
* 	} : {
* 		target: Document | Element | ShadowRoot;
* 		props: Props;
* 		events?: Record<string, (e: any) => any>;
*  	context?: Map<any, any>;
* 		intro?: boolean;
* 		recover?: boolean;
*		transformError?: (error: unknown) => unknown;
* 	}} options
* @returns {Exports}
*/
function hydrate(component, options) {
	var _options$intro;
	init_operations();
	options.intro = (_options$intro = options.intro) !== null && _options$intro !== void 0 ? _options$intro : false;
	const target = options.target;
	const was_hydrating = hydrating;
	const previous_hydrate_node = hydrate_node;
	try {
		var anchor = /* @__PURE__ */ get_first_child(target);
		while (anchor && (anchor.nodeType !== 8 || anchor.data !== "[")) anchor = /* @__PURE__ */ get_next_sibling(anchor);
		if (!anchor) throw HYDRATION_ERROR;
		set_hydrating(true);
		set_hydrate_node(anchor);
		const instance = _mount(component, {
			...options,
			anchor
		});
		set_hydrating(false);
		return instance;
	} catch (error) {
		if (error instanceof Error && error.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) throw error;
		if (error !== HYDRATION_ERROR) console.warn("Failed to hydrate: ", error);
		if (options.recover === false) hydration_failed();
		init_operations();
		clear_text_content(target);
		set_hydrating(false);
		return mount(component, options);
	} finally {
		set_hydrating(was_hydrating);
		set_hydrate_node(previous_hydrate_node);
	}
}
/** @type {Map<EventTarget, Map<string, number>>} */
var listeners = /* @__PURE__ */ new Map();
/**
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
* @param {MountOptions} options
* @returns {Exports}
*/
function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
	init_operations();
	/** @type {Exports} */
	var component = void 0;
	var unmount = component_root(() => {
		var anchor_node = anchor !== null && anchor !== void 0 ? anchor : target.appendChild(create_text());
		boundary(anchor_node, { pending: () => {} }, (anchor_node) => {
			push({});
			var ctx = component_context;
			if (context) ctx.c = context;
			if (events)
 /** @type {any} */ props.$$events = events;
			if (hydrating) assign_nodes(anchor_node, null);
			component = Component(anchor_node, props) || mark_as_component();
			if (hydrating) {
				/** @type {Effect & { nodes: EffectNodes }} */ active_effect.nodes.end = hydrate_node;
				if (hydrate_node === null || hydrate_node.nodeType !== 8 || hydrate_node.data !== "]") {
					hydration_mismatch();
					throw HYDRATION_ERROR;
				}
			}
			pop();
		}, transformError);
		/** @type {Set<string>} */
		var registered_events = /* @__PURE__ */ new Set();
		/** @param {Array<string>} events */
		var event_handle = (events) => {
			for (var i = 0; i < events.length; i++) {
				var event_name = events[i];
				if (registered_events.has(event_name)) continue;
				registered_events.add(event_name);
				var passive = is_passive_event(event_name);
				for (const node of [target, document]) {
					var counts = listeners.get(node);
					if (counts === void 0) {
						counts = /* @__PURE__ */ new Map();
						listeners.set(node, counts);
					}
					var count = counts.get(event_name);
					if (count === void 0) {
						node.addEventListener(event_name, handle_event_propagation, { passive });
						counts.set(event_name, 1);
					} else counts.set(event_name, count + 1);
				}
			}
		};
		event_handle(array_from(all_registered_events));
		root_event_handles.add(event_handle);
		return () => {
			for (var event_name of registered_events) for (const node of [target, document]) {
				var counts = listeners.get(node);
				var count = counts.get(event_name);
				if (--count == 0) {
					node.removeEventListener(event_name, handle_event_propagation);
					counts.delete(event_name);
					if (counts.size === 0) listeners.delete(node);
				} else counts.set(event_name, count);
			}
			root_event_handles.delete(event_handle);
			if (anchor_node !== anchor) {
				var _anchor_node$parentNo;
				(_anchor_node$parentNo = anchor_node.parentNode) === null || _anchor_node$parentNo === void 0 || _anchor_node$parentNo.removeChild(anchor_node);
			}
		};
	});
	mounted_components.set(component, unmount);
	return component;
}
/**
* References of the components that were mounted or hydrated.
* Uses a `WeakMap` to avoid memory leaks.
*/
var mounted_components = /* @__PURE__ */ new WeakMap();
/**
* Unmounts a component that was previously mounted using `mount` or `hydrate`.
*
* Since 5.13.0, if `options.outro` is `true`, [transitions](https://svelte.dev/docs/svelte/transition) will play before the component is removed from the DOM.
*
* Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise (prior to 5.13.0, returns `void`).
*
* ```js
* import { mount, unmount } from 'svelte';
* import App from './App.svelte';
*
* const app = mount(App, { target: document.body });
*
* // later...
* unmount(app, { outro: true });
* ```
* @param {Record<string, any>} component
* @param {{ outro?: boolean }} [options]
* @returns {Promise<void>}
*/
function unmount(component, options) {
	const fn = mounted_components.get(component);
	if (fn) {
		mounted_components.delete(component);
		return fn(options);
	}
	return Promise.resolve();
}
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/legacy/legacy-client.js
/** @import { ComponentConstructorOptions, ComponentType, SvelteComponent, Component } from 'svelte' */
/**
* Takes the component function and returns a Svelte 4 compatible component constructor.
*
* @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @template {Record<string, any>} Events
* @template {Record<string, any>} Slots
*
* @param {SvelteComponent<Props, Events, Slots> | Component<Props>} component
* @returns {ComponentType<SvelteComponent<Props, Events, Slots> & Exports>}
*/
function asClassComponent$1(component) {
	return class extends Svelte4Component {
		/** @param {any} options */
		constructor(options) {
			super({
				component,
				...options
			});
		}
	};
}
var _events = /* @__PURE__ */ new WeakMap();
var _instance = /* @__PURE__ */ new WeakMap();
/**
* Support using the component as both a class and function during the transition period
* @typedef  {{new (o: ComponentConstructorOptions): SvelteComponent;(...args: Parameters<Component<Record<string, any>>>): ReturnType<Component<Record<string, any>, Record<string, any>>>;}} LegacyComponentType
*/
var Svelte4Component = class {
	/**
	* @param {ComponentConstructorOptions & {
	*  component: any;
	* }} options
	*/
	constructor(options) {
		var _options$intro, _options$props;
		_classPrivateFieldInitSpec(this, _events, void 0);
		_classPrivateFieldInitSpec(this, _instance, void 0);
		var sources = /* @__PURE__ */ new Map();
		/**
		* @param {string | symbol} key
		* @param {unknown} value
		*/
		var add_source = (key, value) => {
			var s = /* @__PURE__ */ mutable_source(value, false, false);
			sources.set(key, s);
			return s;
		};
		const props = new Proxy({
			...options.props || {},
			$$events: {}
		}, {
			get(target, prop) {
				var _sources$get;
				return get((_sources$get = sources.get(prop)) !== null && _sources$get !== void 0 ? _sources$get : add_source(prop, Reflect.get(target, prop)));
			},
			has(target, prop) {
				var _sources$get2;
				if (prop === LEGACY_PROPS) return true;
				get((_sources$get2 = sources.get(prop)) !== null && _sources$get2 !== void 0 ? _sources$get2 : add_source(prop, Reflect.get(target, prop)));
				return Reflect.has(target, prop);
			},
			set(target, prop, value) {
				var _sources$get3;
				set((_sources$get3 = sources.get(prop)) !== null && _sources$get3 !== void 0 ? _sources$get3 : add_source(prop, value), value);
				return Reflect.set(target, prop, value);
			}
		});
		_classPrivateFieldSet2(_instance, this, (options.hydrate ? hydrate : mount)(options.component, {
			target: options.target,
			anchor: options.anchor,
			props,
			context: options.context,
			intro: (_options$intro = options.intro) !== null && _options$intro !== void 0 ? _options$intro : false,
			recover: options.recover,
			transformError: options.transformError
		}));
		if (!async_mode_flag && (!(options === null || options === void 0 || (_options$props = options.props) === null || _options$props === void 0 ? void 0 : _options$props.$$host) || options.sync === false)) flushSync();
		_classPrivateFieldSet2(_events, this, props.$$events);
		for (const key of Object.keys(_classPrivateFieldGet2(_instance, this))) {
			if (key === "$set" || key === "$destroy" || key === "$on") continue;
			define_property(this, key, {
				get() {
					return _classPrivateFieldGet2(_instance, this)[key];
				},
				/** @param {any} value */
				set(value) {
					_classPrivateFieldGet2(_instance, this)[key] = value;
				},
				enumerable: true
			});
		}
		_classPrivateFieldGet2(_instance, this).$set = (next) => {
			Object.assign(props, next);
		};
		_classPrivateFieldGet2(_instance, this).$destroy = () => {
			unmount(_classPrivateFieldGet2(_instance, this));
		};
	}
	/** @param {Record<string, any>} props */
	$set(props) {
		_classPrivateFieldGet2(_instance, this).$set(props);
	}
	/**
	* @param {string} event
	* @param {(...args: any[]) => any} callback
	* @returns {any}
	*/
	$on(event, callback) {
		_classPrivateFieldGet2(_events, this)[event] = _classPrivateFieldGet2(_events, this)[event] || [];
		/** @param {any[]} args */
		const cb = (...args) => callback.call(this, ...args);
		_classPrivateFieldGet2(_events, this)[event].push(cb);
		return () => {
			_classPrivateFieldGet2(_events, this)[event] = _classPrivateFieldGet2(_events, this)[event].filter(
				/** @param {any} fn */
				(fn) => fn !== cb
			);
		};
	}
	$destroy() {
		_classPrivateFieldGet2(_instance, this).$destroy();
	}
};
//#endregion
//#region ../../caframework/frontend/node_modules/svelte/src/legacy/legacy-server.js
/** @import { SvelteComponent } from '../index.js' */
/** @import { Csp } from '../server/public.js' */
/** @typedef {{ head: string, html: string, css: { code: string, map: null }; hashes?: { script: `sha256-${string}`[] } }} LegacyRenderResult */
/**
* Takes a Svelte 5 component and returns a Svelte 4 compatible component constructor.
*
* @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @template {Record<string, any>} Events
* @template {Record<string, any>} Slots
*
* @param {SvelteComponent<Props, Events, Slots>} component
* @returns {typeof SvelteComponent<Props, Events, Slots> & Exports}
*/
function asClassComponent(component) {
	const component_constructor = asClassComponent$1(component);
	/** @type {(props?: {}, opts?: { $$slots?: {}; context?: Map<any, any>; csp?: Csp; transformError?: (error: unknown) => unknown }) => LegacyRenderResult & PromiseLike<LegacyRenderResult> } */
	const _render = (props, { context, csp, transformError } = {}) => {
		const result = render(component, {
			props,
			context,
			csp,
			transformError
		});
		const munged = Object.defineProperties({}, {
			css: { value: {
				code: "",
				map: null
			} },
			head: { get: () => result.head },
			html: { get: () => result.body },
			then: { 
			/**
			* this is not type-safe, but honestly it's the best I can do right now, and it's a straightforward function.
			*
			* @template TResult1
			* @template [TResult2=never]
			* @param { (value: LegacyRenderResult) => TResult1 } onfulfilled
			* @param { (reason: unknown) => TResult2 } onrejected
			*/
value: (onfulfilled, onrejected) => {
				if (!async_mode_flag) {
					const user_result = onfulfilled({
						css: munged.css,
						head: munged.head,
						html: munged.html
					});
					return Promise.resolve(user_result);
				}
				return result.then((result) => {
					return onfulfilled({
						css: munged.css,
						head: result.head,
						html: result.body,
						hashes: result.hashes
					});
				}, onrejected);
			} }
		});
		return munged;
	};
	component_constructor.render = _render;
	return component_constructor;
}
//#endregion
//#region .svelte-kit/generated/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { stores, page, constructors, components = [], form, data_0 = null, data_1 = null } = $$props;
		setContext("__svelte__", stores);
		stores.page.set(page);
		const Pyramid_1 = derived(() => constructors[1]);
		if (constructors[1]) {
			$$renderer.push("<!--[0-->");
			const Pyramid_0 = constructors[0];
			if (Pyramid_0) {
				$$renderer.push("<!--[-->");
				Pyramid_0($$renderer, {
					data: data_0,
					form,
					params: page.params,
					children: ($$renderer) => {
						if (Pyramid_1()) {
							$$renderer.push("<!--[-->");
							Pyramid_1()($$renderer, {
								data: data_1,
								form,
								params: page.params
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		} else {
			$$renderer.push("<!--[-1-->");
			const Pyramid_0 = constructors[0];
			if (Pyramid_0) {
				$$renderer.push("<!--[-->");
				Pyramid_0($$renderer, {
					data: data_0,
					form,
					params: page.params
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region .svelte-kit/generated/root.js
var root_default = asClassComponent(Root);
//#endregion
//#region .svelte-kit/generated/shared/error-template.js
var error_template_default = ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n	<head>\n		<meta charset=\"utf-8\" />\n		<title>" + message + "</title>\n\n		<style>\n			body {\n				--bg: white;\n				--fg: #222;\n				--divider: #ccc;\n				background: var(--bg);\n				color: var(--fg);\n				font-family:\n					system-ui,\n					-apple-system,\n					BlinkMacSystemFont,\n					'Segoe UI',\n					Roboto,\n					Oxygen,\n					Ubuntu,\n					Cantarell,\n					'Open Sans',\n					'Helvetica Neue',\n					sans-serif;\n				display: flex;\n				align-items: center;\n				justify-content: center;\n				height: 100vh;\n				margin: 0;\n			}\n\n			.error {\n				display: flex;\n				align-items: center;\n				max-width: 32rem;\n				margin: 0 1rem;\n			}\n\n			.status {\n				font-weight: 200;\n				font-size: 3rem;\n				line-height: 1;\n				position: relative;\n				top: -0.05rem;\n			}\n\n			.message {\n				border-left: 1px solid var(--divider);\n				padding: 0 0 0 1rem;\n				margin: 0 0 0 1rem;\n				min-height: 2.5rem;\n				display: flex;\n				align-items: center;\n			}\n\n			.message h1 {\n				font-weight: 400;\n				font-size: 1em;\n				margin: 0;\n			}\n\n			@media (prefers-color-scheme: dark) {\n				body {\n					--bg: #222;\n					--fg: #ddd;\n					--divider: #666;\n				}\n			}\n		</style>\n	</head>\n	<body>\n		<div class=\"error\">\n			<span class=\"status\">" + status + "</span>\n			<div class=\"message\">\n				<h1>" + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n";
//#endregion
//#region .svelte-kit/generated/server/internal.js
var options = {
	app_template_contains_nonce: false,
	async: false,
	csp: {
		"mode": "auto",
		"directives": {
			"upgrade-insecure-requests": false,
			"block-all-mixed-content": false
		},
		"reportOnly": {
			"upgrade-insecure-requests": false,
			"block-all-mixed-content": false
		}
	},
	csrf_check_origin: true,
	csrf_trusted_origins: [],
	embedded: false,
	env_public_prefix: "PUBLIC_",
	env_private_prefix: "",
	hash_routing: false,
	hooks: null,
	preload_strategy: "modulepreload",
	root: root_default,
	service_worker: false,
	service_worker_options: void 0,
	server_error_boundaries: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n<html lang=\"en\" class=\"dark\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <link rel=\"icon\" href=\"" + assets + "/favicon.png\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\" />\n    <title>CAFramework</title>\n    <script>\n      try {\n        const theme = localStorage.getItem('caframework-theme');\n        if (theme === 'light') {\n          document.documentElement.classList.remove('dark');\n        } else {\n          document.documentElement.classList.add('dark');\n        }\n      } catch (e) {}\n    <\/script>\n    " + head + "\n  </head>\n  <body data-sveltekit-preload-data=\"hover\">\n    <div style=\"display: contents\">" + body + "</div>\n  </body>\n</html>\n",
		error: error_template_default
	},
	version_hash: "e17wd9"
};
async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let handleValidationError;
	let init;
	let reroute;
	let transport;
	return {
		handle,
		handleFetch,
		handleError,
		handleValidationError,
		init,
		reroute,
		transport
	};
}
//#endregion
export { set_read_implementation as a, set_public_env as c, set_manifest as i, options as n, public_env as o, read_implementation as r, set_private_env as s, get_hooks as t };
