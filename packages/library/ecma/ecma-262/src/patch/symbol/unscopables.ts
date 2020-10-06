import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SYMBOL_DESCRIPTORS} from "../descriptors";
import {symbolUnscopables} from "../../symbol/unscopables";

export function patchSymbolUnscopables(): void {
	// Symbol.unscopables
	OrdinaryDefineOwnProperty(Symbol, "unscopables", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolUnscopables()
	});
}
