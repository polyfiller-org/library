import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeFlat} from "../../../array/prototype/flat";

export function patchArrayPrototypeFlat(): void {
	// Array.prototype.flat
	OrdinaryDefineOwnProperty(Array.prototype, "flat", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeFlat
	});
}
