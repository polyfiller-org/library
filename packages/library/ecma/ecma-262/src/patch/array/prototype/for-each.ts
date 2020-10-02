import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeForEach} from "../../../array/prototype/for-each";

export function patchArrayPrototypeForEach(): void {
	// Array.prototype.forEach
	OrdinaryDefineOwnProperty(Array.prototype, "forEach", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeForEach
	});
}
