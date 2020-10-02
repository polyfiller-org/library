import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SymbolConstructor} from "../../symbol/symbol";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {symbolKeyFor} from "../../symbol/key-for";

export function patchSymbolKeyFor(): void {
	// Symbol.keyFor
	OrdinaryDefineOwnProperty(SymbolConstructor, "keyFor", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": symbolKeyFor
	});
}
