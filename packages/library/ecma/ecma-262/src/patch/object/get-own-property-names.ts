import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectGetOwnPropertyNames} from "../../object/get-own-property-names";

export function patchObjectGetOwnPropertyNames(): void {
	// Object.getOwnPropertyNames
	OrdinaryDefineOwnProperty(Object, "getOwnPropertyNames", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectGetOwnPropertyNames
	});
}
