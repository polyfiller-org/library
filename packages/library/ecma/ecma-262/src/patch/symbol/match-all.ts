import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SymbolConstructor} from "../../symbol/symbol";
import {symbolMatchAll} from "../../symbol/match-all";
import {SYMBOL_DESCRIPTORS} from "../descriptors";

export function patchSymbolMatchAll (): void {

	// Symbol.matchAll
	OrdinaryDefineOwnProperty(SymbolConstructor, "matchAll", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolMatchAll()
	});
}