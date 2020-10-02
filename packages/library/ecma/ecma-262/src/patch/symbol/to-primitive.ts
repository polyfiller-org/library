import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SymbolConstructor} from "../../symbol/symbol";
import {SYMBOL_DESCRIPTORS} from "../descriptors";
import {symbolToPrimitive} from "../../symbol/to-primitive";

export function patchSymbolToPrimitive(): void {
	// Symbol.toPrimitive
	OrdinaryDefineOwnProperty(SymbolConstructor, "toPrimitive", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolToPrimitive()
	});
}
