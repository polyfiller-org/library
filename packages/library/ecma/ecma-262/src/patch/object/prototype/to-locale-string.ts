import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {objectPrototypeToLocaleString} from "../../../object/prototype/to-locale-string";

export function patchObjectPrototypeToLocaleString(): void {
	// Object.prototype.toLocaleString
	OrdinaryDefineOwnProperty(Object.prototype, "toLocaleString", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectPrototypeToLocaleString
	});
}
