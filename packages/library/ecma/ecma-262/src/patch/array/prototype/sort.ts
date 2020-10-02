import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeSort} from "../../../array/prototype/sort";

export function patchArrayPrototypeSort(): void {
	// Array.prototype.sort
	OrdinaryDefineOwnProperty(Array.prototype, "sort", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeSort
	});
}
