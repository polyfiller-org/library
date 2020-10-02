import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SymbolConstructor} from "../../symbol/symbol";
import {symbolMatch} from "../../symbol/match";
import {SYMBOL_DESCRIPTORS} from "../descriptors";

export function patchSymbolMatch (): void {

	// Symbol.match
	OrdinaryDefineOwnProperty(SymbolConstructor, "match", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolMatch()
	});
}