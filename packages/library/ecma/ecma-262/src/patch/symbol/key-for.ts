import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {symbolKeyFor} from "../../symbol/key-for";

export function patchSymbolKeyFor(): void {
	// Symbol.keyFor
	OrdinaryDefineOwnProperty(Symbol, "keyFor", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": symbolKeyFor
	});
}
