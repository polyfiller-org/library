import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SymbolConstructor} from "../../symbol/symbol";
import {symbolIterator} from "../../symbol/iterator";
import {SYMBOL_DESCRIPTORS} from "../descriptors";

export function patchSymbolIterator(): void {
	// Symbol.iterator
	OrdinaryDefineOwnProperty(SymbolConstructor, "iterator", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolIterator()
	});
}
