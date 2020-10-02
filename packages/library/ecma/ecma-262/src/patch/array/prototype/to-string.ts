import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeToString} from "../../../array/prototype/to-string";

export function patchArrayPrototypeToString(): void {
	// Array.prototype.toString
	OrdinaryDefineOwnProperty(Array.prototype, "toString", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeToString
	});
}
