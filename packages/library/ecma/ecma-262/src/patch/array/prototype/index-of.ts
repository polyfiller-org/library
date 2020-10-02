import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeIndexOf} from "../../../array/prototype/index-of";

export function patchArrayPrototypeIndexOf(): void {
	// Array.prototype.indexOf
	OrdinaryDefineOwnProperty(Array.prototype, "indexOf", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeIndexOf
	});
}
