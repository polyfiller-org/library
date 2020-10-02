import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeSome} from "../../../array/prototype/some";

export function patchArrayPrototypeSome(): void {
	// Array.prototype.slice
	OrdinaryDefineOwnProperty(Array.prototype, "some", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeSome
	});
}
