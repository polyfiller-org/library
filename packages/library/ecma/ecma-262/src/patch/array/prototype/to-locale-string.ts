import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeToLocaleString} from "../../../array/prototype/to-locale-string";

export function patchArrayPrototypeToLocaleString(): void {
	// Array.prototype.toLocaleString
	OrdinaryDefineOwnProperty(Array.prototype, "toLocaleString", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeToLocaleString
	});
}
