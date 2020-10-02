import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypePush} from "../../../array/prototype/push";

export function patchArrayPrototypePush(): void {
	// Array.prototype.push
	OrdinaryDefineOwnProperty(Array.prototype, "push", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypePush
	});
}
