import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {symbolMatchAll} from "../../symbol/match-all";
import {SYMBOL_DESCRIPTORS} from "../descriptors";

export function patchSymbolMatchAll(): void {
	// Symbol.matchAll
	OrdinaryDefineOwnProperty(Symbol, "matchAll", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolMatchAll()
	});
}
