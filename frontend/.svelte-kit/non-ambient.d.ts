
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/analytics" | "/blog" | "/cards" | "/changelog" | "/dashboard" | "/docs" | "/form" | "/landing" | "/settings" | "/settings/ai-habits" | "/settings/ai-personas" | "/settings/ai-routing" | "/settings/ai-skills" | "/table";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/analytics": Record<string, never>;
			"/blog": Record<string, never>;
			"/cards": Record<string, never>;
			"/changelog": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/docs": Record<string, never>;
			"/form": Record<string, never>;
			"/landing": Record<string, never>;
			"/settings": Record<string, never>;
			"/settings/ai-habits": Record<string, never>;
			"/settings/ai-personas": Record<string, never>;
			"/settings/ai-routing": Record<string, never>;
			"/settings/ai-skills": Record<string, never>;
			"/table": Record<string, never>
		};
		Pathname(): "/" | "/analytics" | "/blog" | "/cards" | "/changelog" | "/dashboard" | "/docs" | "/form" | "/landing" | "/settings" | "/settings/ai-habits" | "/settings/ai-personas" | "/settings/ai-routing" | "/settings/ai-skills" | "/table";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.png" | "/hostinger-logo.jpg" | "/logo.png" | string & {};
	}
}