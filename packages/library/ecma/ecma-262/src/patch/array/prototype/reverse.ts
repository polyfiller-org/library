import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeReverse} from "../../../array/prototype/reverse";

export function patchArrayPrototypeReverse(): void {
	// Array.prototype.reverse
	OrdinaryDefineOwnProperty(Array.prototype, "reverse", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeReverse
	});
}
