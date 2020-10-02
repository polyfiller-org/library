import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeEvery} from "../../../array/prototype/every";

export function patchArrayPrototypeEvery(): void {
	// Array.prototype.every
	OrdinaryDefineOwnProperty(Array.prototype, "every", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeEvery
	});
}
