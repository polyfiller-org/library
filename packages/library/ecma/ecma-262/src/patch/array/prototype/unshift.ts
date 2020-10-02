import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeUnshift} from "../../../array/prototype/unshift";

export function patchArrayPrototypeUnshift(): void {
	// Array.prototype.unshift
	OrdinaryDefineOwnProperty(Array.prototype, "unshift", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeUnshift
	});
}
