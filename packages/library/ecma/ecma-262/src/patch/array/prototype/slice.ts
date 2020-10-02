import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeSlice} from "../../../array/prototype/slice";

export function patchArrayPrototypeSlice(): void {
	// Array.prototype.slice
	OrdinaryDefineOwnProperty(Array.prototype, "slice", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeSlice
	});
}
