import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeJoin} from "../../../array/prototype/join";

export function patchArrayPrototypeJoin(): void {
	// Array.prototype.join
	OrdinaryDefineOwnProperty(Array.prototype, "join", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeJoin
	});
}
