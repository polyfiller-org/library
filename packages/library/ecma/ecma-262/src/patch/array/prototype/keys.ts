import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeKeys} from "../../../array/prototype/keys";

export function patchArrayPrototypeKeys(): void {
	// Array.prototype.keys
	OrdinaryDefineOwnProperty(Array.prototype, "keys", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeKeys
	});
}
