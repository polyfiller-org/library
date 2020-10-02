import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeSplice} from "../../../array/prototype/splice";

export function patchArrayPrototypeSplice(): void {
	// Array.prototype.splice
	OrdinaryDefineOwnProperty(Array.prototype, "splice", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeSplice
	});
}
