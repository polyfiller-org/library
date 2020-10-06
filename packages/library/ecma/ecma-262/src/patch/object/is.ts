import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectIs} from "../../object/is";

export function patchObjectIs(): void {
	// Object.is
	OrdinaryDefineOwnProperty(Object, "is", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectIs
	});
}
