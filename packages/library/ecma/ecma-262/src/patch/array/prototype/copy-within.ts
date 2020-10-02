import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeCopyWithin} from "../../../array/prototype/copy-within";

export function patchArrayPrototypeCopyWithin(): void {
	// Array.prototype.copyWithin
	OrdinaryDefineOwnProperty(Array.prototype, "copyWithin", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeCopyWithin
	});
}
