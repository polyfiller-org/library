import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectGetOwnPropertyDescriptor} from "../../object/get-own-property-descriptor";

export function patchObjectGetOwnPropertyDescriptor(): void {
	// Object.getOwnPropertyDescriptor
	OrdinaryDefineOwnProperty(Object, "getOwnPropertyDescriptor", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectGetOwnPropertyDescriptor
	});
}
