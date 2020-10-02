import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SymbolConstructor} from "../../symbol/symbol";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {symbolFor} from "../../symbol/for";

export function patchSymbolFor (): void {

	// Symbol.for
	OrdinaryDefineOwnProperty(SymbolConstructor, "for", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": symbolFor
	});
}