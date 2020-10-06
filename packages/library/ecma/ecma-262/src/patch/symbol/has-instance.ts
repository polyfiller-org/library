import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {symbolHasInstance} from "../../symbol/has-instance";
import {SYMBOL_DESCRIPTORS} from "../descriptors";

export function patchSymbolHasInstance(): void {
	// Symbol.hasInstance
	OrdinaryDefineOwnProperty(Symbol, "hasInstance", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolHasInstance()
	});
}
