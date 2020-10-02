import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SymbolConstructor} from "../../symbol/symbol";
import {SYMBOL_DESCRIPTORS} from "../descriptors";
import {symbolUnscopables} from "../../symbol/unscopables";

export function patchSymbolUnscopables(): void {
	// Symbol.unscopables
	OrdinaryDefineOwnProperty(SymbolConstructor, "unscopables", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolUnscopables()
	});
}
