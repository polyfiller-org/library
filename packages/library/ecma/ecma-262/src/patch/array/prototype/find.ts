import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeFind} from "../../../array/prototype/find";

export function patchArrayPrototypeFind(): void {
	// Array.prototype.find
	OrdinaryDefineOwnProperty(Array.prototype, "find", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeFind
	});
}
