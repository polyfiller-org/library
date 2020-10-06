import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {symbolIterator} from "../../symbol/iterator";
import {SYMBOL_DESCRIPTORS} from "../descriptors";

export function patchSymbolIterator(): void {
	// Symbol.iterator
	OrdinaryDefineOwnProperty(Symbol, "iterator", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolIterator()
	});
}
