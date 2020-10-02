import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SymbolConstructor} from "../../symbol/symbol";
import {SYMBOL_DESCRIPTORS} from "../descriptors";
import {symbolSearch} from "../../symbol/search";

export function patchSymbolSearch (): void {

	// Symbol.search
	OrdinaryDefineOwnProperty(SymbolConstructor, "search", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolSearch()
	});
}