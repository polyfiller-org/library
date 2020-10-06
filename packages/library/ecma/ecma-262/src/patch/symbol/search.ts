import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SYMBOL_DESCRIPTORS} from "../descriptors";
import {symbolSearch} from "../../symbol/search";

export function patchSymbolSearch(): void {
	// Symbol.search
	OrdinaryDefineOwnProperty(Symbol, "search", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolSearch()
	});
}
