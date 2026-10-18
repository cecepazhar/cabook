//#region \0@oxc-project+runtime@0.150.0/helpers/esm/checkPrivateRedeclaration.js
function _checkPrivateRedeclaration(e, t) {
	if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
//#endregion
//#region \0@oxc-project+runtime@0.150.0/helpers/esm/classPrivateFieldInitSpec.js
function _classPrivateFieldInitSpec(e, t, a) {
	_checkPrivateRedeclaration(e, t), t.set(e, a);
}
//#endregion
//#region \0@oxc-project+runtime@0.150.0/helpers/esm/assertClassBrand.js
function _assertClassBrand(e, t, n) {
	if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw new TypeError("Private element is not present on this object");
}
//#endregion
//#region \0@oxc-project+runtime@0.150.0/helpers/esm/classPrivateFieldSet2.js
function _classPrivateFieldSet2(s, a, r) {
	return s.set(_assertClassBrand(s, a), r), r;
}
//#endregion
//#region \0@oxc-project+runtime@0.150.0/helpers/esm/classPrivateFieldGet2.js
function _classPrivateFieldGet2(s, a) {
	return s.get(_assertClassBrand(s, a));
}
//#endregion
//#region \0@oxc-project+runtime@0.150.0/helpers/esm/OverloadYield.js
function _OverloadYield(e, d) {
	this.v = e, this.k = d;
}
//#endregion
//#region \0@oxc-project+runtime@0.150.0/helpers/esm/wrapAsyncGenerator.js
function _wrapAsyncGenerator(e) {
	return function() {
		return new AsyncGenerator(e.apply(this, arguments));
	};
}
function AsyncGenerator(e) {
	var r, t;
	function resume(r, t) {
		try {
			var n = e[r](t), o = n.value, u = o instanceof _OverloadYield;
			Promise.resolve(u ? o.v : o).then(function(t) {
				if (u) {
					var i = "return" === r ? "return" : "next";
					if (!o.k || t.done) return resume(i, t);
					t = e[i](t).value;
				}
				settle(n.done ? "return" : "normal", t);
			}, function(e) {
				resume("throw", e);
			});
		} catch (e) {
			settle("throw", e);
		}
	}
	function settle(e, n) {
		switch (e) {
			case "return":
				r.resolve({
					value: n,
					done: !0
				});
				break;
			case "throw":
				r.reject(n);
				break;
			default: r.resolve({
				value: n,
				done: !1
			});
		}
		(r = r.next) ? resume(r.key, r.arg) : t = null;
	}
	this._invoke = function(e, n) {
		return new Promise(function(o, u) {
			var i = {
				key: e,
				arg: n,
				resolve: o,
				reject: u,
				next: null
			};
			t ? t = t.next = i : (r = t = i, resume(e, n));
		});
	}, "function" != typeof e["return"] && (this["return"] = void 0);
}
AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, AsyncGenerator.prototype.next = function(e) {
	return this._invoke("next", e);
}, AsyncGenerator.prototype["throw"] = function(e) {
	return this._invoke("throw", e);
}, AsyncGenerator.prototype["return"] = function(e) {
	return this._invoke("return", e);
};
//#endregion
export { _assertClassBrand as a, _classPrivateFieldSet2 as i, _OverloadYield as n, _classPrivateFieldInitSpec as o, _classPrivateFieldGet2 as r, _checkPrivateRedeclaration as s, _wrapAsyncGenerator as t };
