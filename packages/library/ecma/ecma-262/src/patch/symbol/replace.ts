import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SYMBOL_DESCRIPTORS} from "../descriptors";
import {symbolReplace} from "../../symbol/replace";

export function patchSymbolReplace(): void {
	// Symbol.replace
	OrdinaryDefineOwnProperty(Symbol, "replace", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolReplace()
	});
}
