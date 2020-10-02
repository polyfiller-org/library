import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeFlatMap} from "../../../array/prototype/flat-map";

export function patchArrayPrototypeFlatMap(): void {
	// Array.prototype.flatMap
	OrdinaryDefineOwnProperty(Array.prototype, "flatMap", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeFlatMap
	});
}
