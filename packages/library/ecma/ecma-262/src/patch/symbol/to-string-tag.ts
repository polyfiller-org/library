import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SYMBOL_DESCRIPTORS} from "../descriptors";
import {symbolToStringTag} from "../../symbol/to-string-tag";

export function patchSymbolToStringTag(): void {
	// Symbol.toStringTag
	OrdinaryDefineOwnProperty(Symbol, "toStringTag", {
		...SYMBOL_DESCRIPTORS,
		"[[Value]]": symbolToStringTag()
	});
}
