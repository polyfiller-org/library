import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeFindIndex} from "../../../array/prototype/find-index";

export function patchArrayPrototypeFindIndex(): void {
	// Array.prototype.findIndex
	OrdinaryDefineOwnProperty(Array.prototype, "findIndex", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeFindIndex
	});
}
