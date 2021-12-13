export function createGlobalObject(): typeof globalThis {
	if (typeof document !== "undefined" && typeof document.createElement !== "undefined") {
		const iframe = document.createElement("iframe");
		iframe.style.display = "hidden";
		document.body.appendChild(iframe);
		const obj = iframe.contentWindow!;
		document.body.removeChild(iframe);
		return obj as unknown as typeof globalThis;
	} else {
		try {
			// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
			return require("vm").runInNewContext("this") as typeof globalThis;
		} catch {
			throw new TypeError(`Could not generate a new Global Object`);
		}
	}
}
