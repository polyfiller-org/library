import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypePop} from "../../../array/prototype/pop";

export function patchArrayPrototypePop(): void {
	// Array.prototype.pop
	OrdinaryDefineOwnProperty(Array.prototype, "pop", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypePop
	});
}
