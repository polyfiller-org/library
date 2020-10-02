import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeReduce} from "../../../array/prototype/reduce";

export function patchArrayPrototypeReduce(): void {
	// Array.prototype.reduce
	OrdinaryDefineOwnProperty(Array.prototype, "reduce", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeReduce
	});
}
