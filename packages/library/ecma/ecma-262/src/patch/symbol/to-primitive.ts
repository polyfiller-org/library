import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SYMBOL_DESCRIPTORS} from "../descriptors";
import {symbolToPrimitive} from "../../symbol/to-primitive";

export function patchSymbolToPrimitive(): void {
	// Symbol.toPrimitive
	OrdinaryDefineOwnProperty(Symbol, "toPrimitive", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolToPrimitive()
	});
}
