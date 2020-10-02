import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeValues} from "../../../array/prototype/values";

export function patchArrayPrototypeValues(): void {
	// Array.prototype.values
	OrdinaryDefineOwnProperty(Array.prototype, "values", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeValues
	});
}
