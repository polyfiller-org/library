import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeShift} from "../../../array/prototype/shift";

export function patchArrayPrototypeShift(): void {
	// Array.prototype.shift
	OrdinaryDefineOwnProperty(Array.prototype, "shift", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeShift
	});
}
