import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {symbolPrototypeToString} from "../../../symbol/prototype/to-string";

export function patchSymbolPrototypeToString (): void {

	// Symbol.prototype.toString
	OrdinaryDefineOwnProperty(Symbol.prototype, "toString", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": symbolPrototypeToString
	});
}