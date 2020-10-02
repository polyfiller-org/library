import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {arrayFrom} from "../../array/from";

export function patchArrayFrom(): void {
	// Array.from
	OrdinaryDefineOwnProperty(Array, "from", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayFrom
	});
}
