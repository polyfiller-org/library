import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectAssign} from "../../object/assign";

export function patchObjectAssign(): void {
	// Object.assign
	OrdinaryDefineOwnProperty(Object, "assign", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectAssign
	});
}
