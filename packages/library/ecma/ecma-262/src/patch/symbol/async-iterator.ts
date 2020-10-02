import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SymbolConstructor} from "../../symbol/symbol";
import {symbolAsyncIterator} from "../../symbol/async-iterator";
import {SYMBOL_DESCRIPTORS} from "../descriptors";

export function patchSymbolAsyncIterator (): void {

	// Symbol.asyncIterator
	OrdinaryDefineOwnProperty(SymbolConstructor, "asyncIterator", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolAsyncIterator()
	});
}