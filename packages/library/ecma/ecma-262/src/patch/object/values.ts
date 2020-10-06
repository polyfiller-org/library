import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectValues} from "../../object/values";

export function patchObjectValues(): void {
	// Object.values
	OrdinaryDefineOwnProperty(Object, "values", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectValues
	});
}
