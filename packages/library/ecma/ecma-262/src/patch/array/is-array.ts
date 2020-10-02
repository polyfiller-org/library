import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {arrayIsArray} from "../../array/is-array";

export function patchArrayIsArray(): void {
	// Array.isArray
	OrdinaryDefineOwnProperty(Array, "isArray", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayIsArray
	});
}
