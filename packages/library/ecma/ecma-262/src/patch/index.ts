import {patchSymbol} from "./symbol";
import {patchArray} from "./array";

export function patch(): void {
	patchSymbol();
	patchArray();
}
