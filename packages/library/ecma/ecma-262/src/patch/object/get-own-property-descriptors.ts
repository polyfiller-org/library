import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectGetOwnPropertyDescriptors} from "../../object/get-own-property-descriptors";

export function patchObjectGetOwnPropertyDescriptors(): void {
	// Object.getOwnPropertyDescriptors
	OrdinaryDefineOwnProperty(Object, "getOwnPropertyDescriptors", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectGetOwnPropertyDescriptors
	});
}
