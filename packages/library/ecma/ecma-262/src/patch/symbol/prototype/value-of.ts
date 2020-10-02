import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {symbolPrototypeValueOf} from "../../../symbol/prototype/value-of";

export function patchSymbolPrototypeValueOf(): void {
	// Symbol.prototype.valueOf
	OrdinaryDefineOwnProperty(Symbol.prototype, "valueOf", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": symbolPrototypeValueOf
	});
}
