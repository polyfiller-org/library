import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {symbolMatch} from "../../symbol/match";
import {SYMBOL_DESCRIPTORS} from "../descriptors";

export function patchSymbolMatch(): void {
	// Symbol.match
	OrdinaryDefineOwnProperty(Symbol, "match", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolMatch()
	});
}
