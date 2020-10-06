import * as patchers from "./index";

export function patchAll(): void {
	for (const patcher in patchers) {
		patchers[patcher as keyof typeof patchers]();
	}
}