import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SymbolConstructor} from "../../symbol/symbol";
import {SYMBOL_DESCRIPTORS} from "../descriptors";
import {symbolSplit} from "../../symbol/split";

export function patchSymbolSplit (): void {

	// Symbol.split
	OrdinaryDefineOwnProperty(SymbolConstructor, "split", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolSplit()
	});
}