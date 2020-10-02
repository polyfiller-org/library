import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeConcat} from "../../../array/prototype/concat";

export function patchArrayPrototypeConcat(): void {
	// Array.prototype.concat
	OrdinaryDefineOwnProperty(Array.prototype, "concat", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeConcat
	});
}
