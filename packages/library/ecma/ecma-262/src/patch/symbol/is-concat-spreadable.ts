import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {symbolIsConcatSpreadable} from "../../symbol/is-concat-spreadable";
import {SYMBOL_DESCRIPTORS} from "../descriptors";

export function patchSymbolIsConcatSpreadable(): void {
	// Symbol.isConcatSpreadable
	OrdinaryDefineOwnProperty(Symbol, "isConcatSpreadable", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolIsConcatSpreadable()
	});
}
