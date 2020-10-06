import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {symbolFor} from "../../symbol/for";

export function patchSymbolFor(): void {
	// Symbol.for
	OrdinaryDefineOwnProperty(Symbol, "for", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": symbolFor
	});
}
