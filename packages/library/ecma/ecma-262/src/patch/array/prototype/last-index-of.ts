import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeLastIndexOf} from "../../../array/prototype/last-index-of";

export function patchArrayPrototypeLastIndexOf(): void {
	// Array.prototype.lastIndexOf
	OrdinaryDefineOwnProperty(Array.prototype, "lastIndexOf", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeLastIndexOf
	});
}
