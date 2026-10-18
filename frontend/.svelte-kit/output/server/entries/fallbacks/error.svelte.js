import { S as escape_html } from "../../chunks/index-server.js";
import { t as page } from "../../chunks/state.js";
//#region ../../caframework/frontend/node_modules/@sveltejs/kit/src/runtime/components/svelte-5/error.svelte
function Error($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var _page$error;
		$$renderer.push(`<h1>${escape_html(page.status)}</h1> <p>${escape_html((_page$error = page.error) === null || _page$error === void 0 ? void 0 : _page$error.message)}</p>`);
	});
}
//#endregion
export { Error as default };
