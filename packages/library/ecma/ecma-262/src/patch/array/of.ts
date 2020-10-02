import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {arrayOf} from "../../array/of";

export function patchArrayOf(): void {
	// Array.of
	OrdinaryDefineOwnProperty(Array, "of", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayOf
	});
}
