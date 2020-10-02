import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SymbolConstructor} from "../../symbol/symbol";
import {symbolHasInstance} from "../../symbol/has-instance";
import {SYMBOL_DESCRIPTORS} from "../descriptors";

export function patchSymbolHasInstance (): void {

	// Symbol.hasInstance
	OrdinaryDefineOwnProperty(SymbolConstructor, "hasInstance", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolHasInstance()
	});
}