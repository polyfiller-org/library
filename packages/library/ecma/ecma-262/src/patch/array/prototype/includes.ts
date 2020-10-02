import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeIncludes} from "../../../array/prototype/includes";

export function patchArrayPrototypeIncludes(): void {
	// Array.prototype.includes
	OrdinaryDefineOwnProperty(Array.prototype, "includes", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeIncludes
	});
}
