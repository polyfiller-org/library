import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectDefineProperties} from "../../object/define-properties";

export function patchObjectDefineProperties(): void {
	// Object.defineProperties
	OrdinaryDefineOwnProperty(Object, "defineProperties", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectDefineProperties
	});
}
