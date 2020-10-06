import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SYMBOL_DESCRIPTORS} from "../descriptors";
import {symbolSplit} from "../../symbol/split";

export function patchSymbolSplit(): void {
	// Symbol.split
	OrdinaryDefineOwnProperty(Symbol, "split", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolSplit()
	});
}
